import { describe, expect } from "bun:test"
import { LayerNode } from "@orchium/core/effect/layer-node"
import { SessionProjector } from "@orchium/core/session/projector"
import { Effect } from "effect"
import { sql } from "drizzle-orm"
import { Database } from "@orchium/core/database/database"
import { CrossSpawnSpawner } from "@orchium/core/cross-spawn-spawner"
import { Project } from "@/project/project"
import { Session as SessionNs } from "@/session/session"
import { SessionRecover } from "@/session/recover"
import { testEffect } from "../lib/effect"

// `Database.node` is part of the group so the body can seed MessageTable rows
// directly. The projector writes `data` as `SessionV1.Info` minus `id` and
// `sessionID` (see `messageData` in core/session/projector.ts), so `role` and
// `time` sit at the top level of the stored JSON — not under `metadata`.
const it = testEffect(
  LayerNode.compile(
    LayerNode.group([Database.node, SessionNs.node, SessionProjector.node, Project.node, CrossSpawnSpawner.node]),
  ),
)

const withSession = (input?: Parameters<SessionNs.Interface["create"]>[0]) =>
  Effect.acquireRelease(SessionNs.use.create(input), (created) =>
    SessionNs.Service.use((session) => session.remove(created.id).pipe(Effect.ignore)),
  )

// Seeds a MessageTable row with `data` shaped like the projector's stored
// `V1MessageData`. `completed` is optional — omit it to simulate a message
// that never finished streaming.
const insertMessage = (id: string, sessionID: string, role: string, timeCreated: number, completed?: number) =>
  Database.Service.use(({ db }) =>
    db.run(sql`INSERT INTO message (id, session_id, time_created, time_updated, data)
      VALUES (${id}, ${sessionID}, ${timeCreated}, ${timeCreated}, ${JSON.stringify({
        role,
        time: { created: timeCreated, ...(completed === undefined ? {} : { completed }) },
        parts: [],
      })})`),
  ).pipe(Effect.orDie)

const readData = (id: string) =>
  Database.Service.use(({ db }) => db.get<{ data: string }>(sql`SELECT data FROM message WHERE id = ${id}`)).pipe(
    Effect.orDie,
    Effect.map((row) => JSON.parse(row?.data ?? "null") as Record<string, unknown>),
  )

const role = (data: Record<string, unknown>) => data.role
const completedOf = (data: Record<string, unknown>) => (data.time as { completed?: number } | undefined)?.completed
const errorOf = (data: Record<string, unknown>) => data.error as { name?: string; data?: { message?: string } } | undefined

describe("SessionRecover.recoverStuck", () => {
  it.instance(
    "marks only stale assistant messages as failed at startup",
    () =>
      Effect.gen(function* () {
        const created = yield* withSession({ title: "recover-target" })
        const sessionID = created.id
        const OLD = 1_700_000_000_000
        const fresh = Date.now()

        yield* insertMessage("stuck-old", sessionID, "assistant", OLD)
        yield* insertMessage("fresh", sessionID, "assistant", fresh)
        yield* insertMessage("completed", sessionID, "assistant", OLD, OLD + 100)
        yield* insertMessage("user", sessionID, "user", OLD)

        const count = yield* SessionRecover.recoverStuck()
        expect(count).toBe(1)

        const recovered = yield* readData("stuck-old")
        const freshRow = yield* readData("fresh")
        const completedRow = yield* readData("completed")
        const userRow = yield* readData("user")

        // The stuck assistant message gained a completion time and an abort error.
        expect(role(recovered)).toBe("assistant")
        expect(completedOf(recovered)).toBeGreaterThanOrEqual(OLD)
        expect(errorOf(recovered)?.name).toBe("MessageAbortedError")
        expect(errorOf(recovered)?.data?.message).toContain("session recovery")

        // Everything else is untouched: no completion, no error.
        expect(completedOf(freshRow)).toBeUndefined()
        expect(errorOf(freshRow)).toBeUndefined()
        expect(completedOf(completedRow)).toBe(OLD + 100)
        expect(errorOf(completedRow)).toBeUndefined()
        expect(role(userRow)).toBe("user")
        expect(completedOf(userRow)).toBeUndefined()
        expect(errorOf(userRow)).toBeUndefined()
      }),
    { git: true },
  )

  it.instance(
    "is a no-op when no message is stuck",
    () =>
      Effect.gen(function* () {
        const created = yield* withSession({ title: "recover-noop" })
        const sessionID = created.id
        const now = Date.now()

        yield* insertMessage("fresh-only", sessionID, "assistant", now)

        const count = yield* SessionRecover.recoverStuck()
        expect(count).toBe(0)

        const row = yield* readData("fresh-only")
        expect(completedOf(row)).toBeUndefined()
        expect(errorOf(row)).toBeUndefined()
      }),
    { git: true },
  )
})