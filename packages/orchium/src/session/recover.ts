export * as SessionRecover from "./recover"

import { sql } from "drizzle-orm"
import { Effect, Layer } from "effect"
import { Database } from "@orchium/core/database/database"
import { MessageTable } from "@orchium/core/session/sql"

/**
 * A one-time, DB-only startup pass that repairs assistant messages which were
 * interrupted before completion (e.g. by a crash while a session was still
 * streaming) so sessions stop showing "Thinking…" forever.
 *
 * Deliberately no network and no provider retries: recovery only consults the
 * local session database and mutates rows that are already stuck.
 *
 * Scope note (V1/V2 engine): the CLI/TUI reads and writes the `message` table
 * today — `MessageV2` in `session/message-v2.ts` projects visible messages
 * from `MessageTable` rows, sessions are listed from `SessionTable`, and there
 * is no V1/V2 storage-selection flag exposed anywhere. This pass therefore
 * targets the `message` table unconditionally.
 *
 * Threshold rationale: a healthy provider turn can legitimately take several
 * minutes, so a tight timeout would false-abort slow-but-live turns. 10
 * minutes only catches turns that are effectively abandoned; the cost of
 * leaving a truly stuck turn alone (a stale "Thinking…" row) is lower than
 * killing a slow turn, so we err on the side of delay.
 */
export const STUCK_THRESHOLD_MS = 10 * 60_000

type StuckMessageData = {
  role: string
  time: { created: number; completed?: number }
  [key: string]: unknown
}

function markFailed(data: unknown, now: number): string {
  // `data` is the `Message.Info` JSON minus `id`/`sessionID` (see
  // `V1MessageData` in `@orchium/core/session/sql`), so `role` and `time` sit
  // at the top level. Same terminal shape as `NamedError.toObject` for an
  // abort: `{ name: "MessageAbortedError", data: { message } }`.
  const info = data as StuckMessageData
  return JSON.stringify({
    ...info,
    time: { ...info.time, completed: now },
    error: { name: "MessageAbortedError", data: { message: "Interrupted before completion; marked as failed by session recovery" } },
  })
}

export const recoverStuck = Effect.fn("Session.recoverStuck")(function* () {
  const { db } = yield* Database.Service
  const now = Date.now()
  const cutoff = now - STUCK_THRESHOLD_MS

  const stuck = yield* db
    .all<{ id: string; data: string }>(sql`
    SELECT id, data FROM ${MessageTable}
    WHERE json_extract(data, '$.role') = 'assistant'
      AND json_extract(data, '$.time.completed') IS NULL
      AND json_extract(data, '$.time.created') < ${cutoff}
  `)
    .pipe(Effect.orDie)

  if (stuck.length === 0) return 0

  yield* Effect.forEach(stuck, (row) =>
    db.run(sql`
      UPDATE ${MessageTable} SET data = ${markFailed(JSON.parse(row.data), now)} WHERE id = ${row.id}
    `).pipe(Effect.orDie),
  )

  yield* Effect.logInfo(`Session recovery: marked ${stuck.length} stuck assistant message(s) as failed`)
  return stuck.length
})

export const startupLayer = Layer.effectDiscard(recoverStuck().pipe(Effect.asVoid))