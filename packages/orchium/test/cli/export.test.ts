import { expect } from "bun:test"
import { ProjectV2 } from "@orchium/core/project"
import { Effect, Layer } from "effect"
import fs from "fs/promises"
import os from "os"
import path from "path"
import { Session } from "@/session/session"
import { SessionID } from "@/session/schema"
import { exportAll } from "../../src/cli/cmd/export"
import { testEffect } from "../lib/effect"

const infoOlder: Session.Info = {
  id: SessionID.make("ses_older"),
  slug: "older",
  projectID: ProjectV2.ID.make("proj"),
  directory: "/tmp/older",
  title: "Older Session",
  version: "1",
  time: { created: 1000, updated: 2000 },
}

const infoNewer: Session.Info = {
  id: SessionID.make("ses_newer"),
  slug: "newer",
  projectID: ProjectV2.ID.make("proj"),
  directory: "/tmp/newer",
  title: "Newer Session",
  version: "1",
  time: { created: 3000, updated: 4000 },
}

const infoFailing: Session.Info = {
  id: SessionID.make("ses_fail"),
  slug: "failing",
  projectID: ProjectV2.ID.make("proj"),
  directory: "/tmp/failing",
  title: "Failing Session",
  version: "1",
  time: { created: 500, updated: 5000 },
}

const populated = Layer.mock(Session.Service, {
  // Deliberately unsorted so the export must sort newest-first itself.
  list: () => Effect.succeed([infoOlder, infoNewer, infoFailing]),
  get: (id) => {
    if (id === infoFailing.id) return Effect.die(new Error("session not found"))
    if (id === infoNewer.id) return Effect.succeed(infoNewer)
    return Effect.succeed(infoOlder)
  },
  messages: () => Effect.succeed([]),
})

const it = testEffect(populated)

const withOutputDir = <A, E, R>(body: (outputDir: string) => Effect.Effect<A, E, R>) =>
  Effect.gen(function* () {
    const outputDir = path.join(os.tmpdir(), `orchium-export-test-${Math.random().toString(36).slice(2)}`)
    yield* Effect.addFinalizer(() => Effect.promise(() => fs.rm(outputDir, { recursive: true, force: true })))
    return yield* body(outputDir)
  })

it.live("export --all writes per-session json files and a newest-first index", () =>
  withOutputDir((outputDir) =>
    Effect.gen(function* () {
      yield* exportAll({ all: true, format: "json", output: outputDir })

      const index = (yield* Effect.promise(() => Bun.file(path.join(outputDir, "index.json")).json())) as {
        count: number
        sessions: { id: string; title: string; updated: number; file: string }[]
      }
      expect(index.count).toBe(2)
      expect(index.sessions.map((session) => session.id)).toEqual([infoNewer.id, infoOlder.id])
      expect(index.sessions[0]?.file).toBe(`${infoNewer.id}.json`)

      const sessionJSON = (yield* Effect.promise(() =>
        Bun.file(path.join(outputDir, `${infoNewer.id}.json`)).json(),
      )) as { info: { title: string } }
      expect(sessionJSON.info.title).toBe(infoNewer.title)

      const missing = yield* Effect.promise(() => Bun.file(path.join(outputDir, `${infoFailing.id}.json`)).exists())
      expect(missing).toBe(false)
    }),
  ),
)

it.live("export --all --format markdown writes .md files and a markdown index", () =>
  withOutputDir((outputDir) =>
    Effect.gen(function* () {
      yield* exportAll({ all: true, format: "markdown", output: outputDir })

      const sessionMD = yield* Effect.promise(() => Bun.file(path.join(outputDir, `${infoNewer.id}.md`)).text())
      expect(sessionMD).toContain(`# ${infoNewer.title}`)
      expect(sessionMD).toContain(`**id**: \`${infoNewer.id}\``)

      const indexMD = yield* Effect.promise(() => Bun.file(path.join(outputDir, "index.md")).text())
      expect(indexMD).toContain(infoNewer.title)
      expect(indexMD).toContain(`\`${infoNewer.id}\``)
    }),
  ),
)

const emptyIt = testEffect(Layer.mock(Session.Service, { list: () => Effect.succeed([]) }))

emptyIt.live("export --all with no sessions still writes an empty index", () =>
  withOutputDir((outputDir) =>
    Effect.gen(function* () {
      yield* exportAll({ all: true, format: "json", output: outputDir })

      const index = (yield* Effect.promise(() => Bun.file(path.join(outputDir, "index.json")).json())) as {
        count: number
        sessions: unknown[]
      }
      expect(index.count).toBe(0)
      expect(index.sessions).toEqual([])
    }),
  ),
)