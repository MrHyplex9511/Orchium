import path from "path"
import fs from "fs/promises"
import { describe, expect } from "bun:test"
import { Effect, Layer, Schema } from "effect"
import { Database } from "@orchium/core/database/database"
import { AppNodeBuilder } from "@orchium/core/effect/app-node-builder"
import { LayerNode } from "@orchium/core/effect/layer-node"
import { EventV2 } from "@orchium/core/event"
import { EventTable } from "@orchium/core/event/sql"
import { EventMaintain } from "@orchium/core/event/maintain"
import { EventCodec } from "@orchium/core/event/codec"
import { Global } from "@orchium/core/global"
import { FSUtil } from "@orchium/core/fs-util"
import { eq } from "drizzle-orm"
import { testEffect } from "./lib/effect"
import { tmpdir } from "./fixture/tmpdir"

const DAY = 86_400_000

const ProbeEvent = EventV2.define({
  type: "maintain.probe",
  durable: { version: 1, aggregate: "id" },
  schema: {
    id: Schema.String,
    timestamp: Schema.Number,
    note: Schema.String,
  },
})

const NoTimestampEvent = EventV2.define({
  type: "maintain.probe-notimestamp",
  durable: { version: 1, aggregate: "id" },
  schema: {
    id: Schema.String,
    note: Schema.String,
  },
})

const it = testEffect(Layer.empty)

const withMaintain =
  <A, E, R>(
    body: (input: { root: string; db: Database.Interface["db"]; events: EventV2.Interface }) => Effect.Effect<A, E, R>,
  ) =>
  Effect.acquireUseRelease(
    Effect.promise(() => tmpdir()),
    (tmp) => {
      const global = Global.layerWith({ config: tmp.path })
      const layer = AppNodeBuilder.build(LayerNode.group([Database.node, EventV2.node, FSUtil.node]), [
        [Global.node, global],
      ])
      return Effect.gen(function* () {
        const { db } = yield* Database.Service
        const events = yield* EventV2.Service
        return yield* body({ root: tmp.path, db, events })
      }).pipe(Effect.provide(global), Effect.provide(layer))
    },
    (tmp) => Effect.promise(() => tmp[Symbol.asyncDispose]()),
  )

const publishProbe = (events: EventV2.Interface, aggregate: string, timestamp: number) =>
  events.publish(ProbeEvent, { id: aggregate, timestamp, note: aggregate }, { id: EventV2.ID.make(`evt_${aggregate}`) })

const publishBare = (events: EventV2.Interface, aggregate: string) =>
  events.publish(NoTimestampEvent, { id: aggregate, note: aggregate }, { id: EventV2.ID.make(`evt_${aggregate}`) })

const rowById = (db: Database.Interface["db"], id: string) =>
  db.select().from(EventTable).where(eq(EventTable.id, EventV2.ID.make(id))).get().pipe(Effect.orDie)

describe("EventMaintain", () => {
  it.effect("compresses old payloads below the default cutoff and leaves recent events untouched", () =>
    withMaintain(({ db, events }) =>
      Effect.gen(function* () {
        const oldAggregate = "agg_old"
        const freshAggregate = "agg_fresh"
        const oldTimestamp = Date.now() - 200 * DAY
        const freshTimestamp = Date.now()
        yield* publishProbe(events, oldAggregate, oldTimestamp)
        yield* publishProbe(events, freshAggregate, freshTimestamp)

        yield* EventMaintain.maintain()

        const oldRow = yield* rowById(db, `evt_${oldAggregate}`)
        const freshRow = yield* rowById(db, `evt_${freshAggregate}`)

        // Default retention is off, so the old row is compressed, not deleted.
        expect(oldRow).toBeDefined()
        expect(EventCodec.isCompressed(oldRow!.data)).toBe(true)
        expect(EventCodec.decode(oldRow!.data)).toEqual({ id: oldAggregate, timestamp: oldTimestamp, note: oldAggregate })

        expect(EventCodec.isCompressed(freshRow!.data)).toBe(false)
        expect(EventCodec.decode(freshRow!.data)).toEqual({
          id: freshAggregate,
          timestamp: freshTimestamp,
          note: freshAggregate,
        })
      }),
    ),
  )

  it.effect("prunes rows older than retention while keeping recent and timestamp-less rows", () =>
    withMaintain(({ root, db, events }) =>
      Effect.gen(function* () {
        const deletedOld = "agg_deleted"
        const deletedMid = "agg_deleted_mid"
        const fresh = "agg_kept_fresh"
        const bare = "agg_kept_bare"

        yield* publishProbe(events, deletedOld, Date.now() - 200 * DAY)
        yield* publishProbe(events, deletedMid, Date.now() - 45 * DAY)
        yield* publishProbe(events, fresh, Date.now() - DAY)
        yield* publishBare(events, bare)

        yield* Effect.promise(() =>
          fs.writeFile(path.join(root, "orchium.json"), JSON.stringify({ event: { retention_days: 30 } })),
        )

        yield* EventMaintain.maintain()

        expect(yield* rowById(db, `evt_${deletedOld}`)).toBeUndefined()
        expect(yield* rowById(db, `evt_${deletedMid}`)).toBeUndefined()

        const keptFresh = yield* rowById(db, `evt_${fresh}`)
        expect(keptFresh).toBeDefined()
        expect(EventCodec.isCompressed(keptFresh!.data)).toBe(false)

        // Timestamp-less rows are compressed (treated as old) but never pruned.
        const keptBare = yield* rowById(db, `evt_${bare}`)
        expect(keptBare).toBeDefined()
        expect(EventCodec.isCompressed(keptBare!.data)).toBe(true)
      }),
    ),
  )

  it.effect("prunes rows that an earlier run already compressed", () =>
    withMaintain(({ root, db, events }) =>
      Effect.gen(function* () {
        yield* publishProbe(events, "agg_two_phase", Date.now() - 200 * DAY)

        // First run: default settings compress the old row but keep it (retention off).
        yield* EventMaintain.maintain()
        expect(EventCodec.isCompressed((yield* rowById(db, "evt_agg_two_phase"))!.data)).toBe(true)

        // Second run with retention enabled: the compressed body is opaque to
        // json_extract, so pruning must decode it to delete the row.
        yield* Effect.promise(() =>
          fs.writeFile(path.join(root, "orchium.json"), JSON.stringify({ event: { retention_days: 30 } })),
        )
        yield* EventMaintain.maintain()

        expect(yield* rowById(db, "evt_agg_two_phase")).toBeUndefined()
      }),
    ),
  )
})