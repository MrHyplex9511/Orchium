export * as EventMaintain from "./maintain"

import { Effect, Layer, Option, Schema, Duration, Schedule } from "effect"
import { and, eq, inArray, like, lt, notLike, or, sql } from "drizzle-orm"
import { type ParseError, parse } from "jsonc-parser"
import path from "path"
import { Database } from "../database/database"
import { EventTable } from "./sql"
import { EventCodec } from "./codec"
import { ConfigEvent } from "../config/event"
import { Global } from "../global"
import { FSUtil } from "../fs-util"
import { makeGlobalNode } from "../effect/app-node"

const DAY_MS = 86_400_000
const CHUNK = 500
const DEFAULT_COMPRESS_AFTER_DAYS = 90

interface EventSettings {
  readonly compress_after_days: number
  readonly retention_days?: number
}

const decodeOptions = { errors: "all", onExcessProperty: "ignore", propertyOrder: "original" } as const
const decodeEventSettings = Schema.decodeUnknownOption(
  Schema.Struct({ event: ConfigEvent.Info.pipe(Schema.optional) }),
  decodeOptions,
)

const readSettings = Effect.fn("EventV2.maintain.readSettings")(function* () {
  const fs = yield* FSUtil.Service
  const global = yield* Global.Service
  for (const name of ["orchium.json", "orchium.jsonc"]) {
    const text = yield* fs.readFileStringSafe(path.join(global.config, name))
    if (!text) continue
    const errors: ParseError[] = []
    const input: unknown = parse(text, errors, { allowTrailingComma: true })
    if (errors.length) continue
    const info = Option.getOrUndefined(decodeEventSettings(input))
    if (!info) continue
    return {
      compress_after_days: info.event?.compress_after_days ?? DEFAULT_COMPRESS_AFTER_DAYS,
      retention_days: info.event?.retention_days,
    }
  }
  return { compress_after_days: DEFAULT_COMPRESS_AFTER_DAYS, retention_days: undefined }
})

/**
 * Compression must run after pruning: a compressed payload is opaque to
 * `json_extract`, so pruning before compression keeps old rows deletable by
 * retention while still guaranteeing rows lacking a timestamp are never
 * pruned (their `json_extract` value is NULL either way).
 */
const compressOld = Effect.fn("EventV2.maintain.compress")(function* (cut: number) {
  const { db } = yield* Database.Service
  let count = 0
  while (true) {
    const rows = yield* db
      .select({ id: EventTable.id, data: EventTable.data })
      .from(EventTable)
      .where(
        and(
          notLike(EventTable.data, "gz:%"),
          or(sql`json_extract(${EventTable.data}, '$.timestamp') IS NULL`, lt(sql`json_extract(${EventTable.data}, '$.timestamp')`, cut)),
        ),
      )
      .limit(CHUNK)
      .all()
      .pipe(Effect.orDie)
    if (rows.length === 0) break
    count += rows.length
    yield* Effect.forEach(rows, (row) =>
      db
        .update(EventTable)
        .set({ data: EventCodec.compressJson(row.data) })
        .where(eq(EventTable.id, row.id))
        .run()
        .pipe(Effect.orDie),
    )
  }
  return count
})

/**
 * Rows are compressed before they could be pruned on a later run, so retention
 * cannot rely on `json_extract` alone: a `gz:` payload is opaque to SQL. Select
 * plainly-old rows plus every compressed row, then decide in JS after decoding.
 * Timestamp-less rows (decode yields no timestamp) are never pruned.
 */
const pruneOld = Effect.fn("EventV2.maintain.prune")(function* (cut: number) {
  const { db } = yield* Database.Service
  let count = 0
  while (true) {
    const candidates = yield* db
      .select({ id: EventTable.id, data: EventTable.data })
      .from(EventTable)
      .where(
        or(
          and(sql`json_valid(${EventTable.data})`, lt(sql`json_extract(${EventTable.data}, '$.timestamp')`, cut)),
          like(EventTable.data, "gz:%"),
        ),
      )
      .limit(CHUNK)
      .all()
      .pipe(Effect.orDie)
    if (candidates.length === 0) break
    const stale = candidates.flatMap((row) => {
      const timestamp = EventCodec.decode(row.data).timestamp
      return typeof timestamp === "number" && timestamp < cut ? [row.id] : []
    })
    if (stale.length > 0) {
      yield* db
        .delete(EventTable)
        .where(inArray(EventTable.id, stale))
        .run()
        .pipe(Effect.orDie)
    }
    count += stale.length
  }
  return count
})

const reclaim = Effect.fn("EventV2.maintain.reclaim")(function* (pruned: number) {
  const { db } = yield* Database.Service
  yield* db.run("PRAGMA wal_checkpoint(TRUNCATE)").pipe(Effect.orDie)
  if (pruned > 0) yield* db.run("VACUUM").pipe(Effect.orDie)
})

export const maintain = Effect.fn("EventV2.maintain")(function* () {
  const settings = yield* readSettings()
  const now = Date.now()
  const pruned = settings.retention_days == null ? 0 : yield* pruneOld(now - settings.retention_days * DAY_MS)
  const compressed = yield* compressOld(now - settings.compress_after_days * DAY_MS)
  yield* reclaim(pruned)
  if (compressed > 0 || pruned > 0) {
    yield* Effect.logInfo("event maintenance done", { compressed, pruned })
  }
})

export const maintainLayer = Layer.effectDiscard(
  Effect.gen(function* () {
    yield* maintain().pipe(Effect.repeat(Schedule.spaced(Duration.hours(1))), Effect.forkScoped)
  }),
)

export const maintainNode = makeGlobalNode({
  name: "event-maintenance",
  layer: maintainLayer,
  deps: [Database.node, Global.node, FSUtil.node],
})