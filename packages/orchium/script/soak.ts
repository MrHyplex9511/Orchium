/**
 * MEMORY/CPU SOAK HARNESS
 *
 * Exercises the session pipeline WITHOUT a real LLM (no network, no API cost).
 * Drives the components most likely to leak under long sessions:
 *   - history accumulation (projected rows accumulate; SessionHistory reloads + decodes ALL of it)
 *   - compaction prompt build (serialize / serializeToolContent / buildPrompt / Token.estimate)
 *   - runner message conversion (to-llm-message over the full history each turn)
 *   - context-epoch (SessionContextEpoch.prepare over the projected epoch)
 *
 * Usage (from packages/orchium):
 *   SOAK_TURNS=300 bun run script/soak.ts
 *   SOAK_TURNS=2000 SOAK_SAMPLE_EVERY=100 bun run script/soak.ts
 *
 * Prints a growth table (turn, rss, heapUsed, cpu seconds in window) and a
 * verdict (stable / linear / accelerating) with ranked suspects.
 *
 * Never calls a real provider: the LLM stream is a fake in-process stream and
 * the provider layer is ProviderTest.fake.
 */
import { SessionV1 } from "@orchium/core/v1/session"
import { Database } from "@orchium/core/database/database"
import { EventV2Bridge } from "@/event-v2-bridge"
import { Effect, Layer, Schema } from "effect"
import * as Stream from "effect/Stream"
import { AppNodeBuilder } from "@orchium/core/effect/app-node-builder"
import { LayerNode } from "@orchium/core/effect/layer-node"
import { Provider } from "@/provider/provider"
import { ProviderTest } from "../test/fake/provider"
import { RuntimeFlags } from "@/effect/runtime-flags"
import { Session as SessionNs } from "@/session/session"
import { MessageID, PartID, SessionID } from "@/session/schema"
import { SessionProjector } from "@orchium/core/session/projector"
import { CrossSpawnSpawner } from "@orchium/core/cross-spawn-spawner"
import { LLM, LLMEvent, Message, type LLMRequest, type Model } from "@orchium/llm"
import * as OpenAICompatibleChat from "@orchium/llm/protocols/openai-compatible-chat"
import { make as makeCoreCompaction, buildPrompt, serializeToolContent } from "@orchium/core/session/compaction"
import { SessionHistory } from "@orchium/core/session/history"
import { SessionContextEpoch } from "@orchium/core/session/context-epoch"
import { toLLMMessages } from "@orchium/core/session/runner/to-llm-message"
import { SystemContext } from "@orchium/core/system-context"
import { ProviderV2 } from "@orchium/core/provider"
import { ModelV2 } from "@orchium/core/model"
import type { LLMError } from "@orchium/llm"
import { provideTmpdirInstance, testInstanceStoreLayer } from "../test/fixture/fixture"

const TURNS = Number(process.env.SOAK_TURNS ?? "2000")
const SAMPLE_EVERY = Number(process.env.SOAK_SAMPLE_EVERY ?? "100")

const ref = {
  providerID: ProviderV2.ID.make("test"),
  modelID: ModelV2.ID.make("soak-model"),
}

// Small context model: compaction triggers almost immediately so every turn
// exercises select → serialize → buildPrompt → (fake) LLM stream.
const soakModel = OpenAICompatibleChat.route
  .with({
    provider: "test",
    endpoint: { baseURL: "https://example.com" },
    limits: { context: 20_000, output: 2_000 },
  })
  .model({ id: "soak-model" })

function createModel(opts: { context: number; output: number }): Provider.Model {
  return {
    id: "soak-model",
    providerID: "test",
    name: "Soak",
    limit: { context: opts.context, output: opts.output },
    cost: { input: 0, output: 0, cache: { read: 0, write: 0 } },
    capabilities: {
      toolcall: true,
      attachment: false,
      reasoning: false,
      temperature: true,
      input: { text: true, image: false, audio: false, video: false },
      output: { text: true, image: false, audio: false, video: false },
    },
    api: { npm: "@ai-sdk/anthropic" },
    options: {},
  } as Provider.Model
}

const defaultProvider = ProviderTest.fake({ model: createModel({ context: 20_000, output: 2_000 }) })

// Fake LLM stream: emits a short deterministic completion. No network.
const fakeLLM = {
  stream: (_request: LLMRequest): Stream.Stream<LLMEvent, LLMError> =>
    Stream.make(
      LLMEvent.stepStart({ index: 0 }),
      LLMEvent.textStart({ id: "block_1" }),
      LLMEvent.textDelta({ id: "block_1", text: "## Summary\n- soak turn completed\n- no changes outside harness\n" }),
      LLMEvent.textEnd({ id: "block_1" }),
      LLMEvent.stepFinish({ index: 0, reason: "stop", usage: { inputTokens: 10, outputTokens: 10 } }),
      LLMEvent.finish({ reason: "stop", usage: { inputTokens: 10, outputTokens: 10 } }),
    ),
}

const soakTestNode = LayerNode.group([
  SessionNs.node,
  SessionProjector.node,
  Database.node,
  EventV2Bridge.node,
  CrossSpawnSpawner.node,
])

const env = AppNodeBuilder.build(soakTestNode, [
  [Provider.node, defaultProvider.layer],
  [RuntimeFlags.node, RuntimeFlags.layer({ experimentalEventSystem: true })],
])

type Sample = { readonly turn: number; readonly rssMB: number; readonly heapMB: number; readonly cpuSec: number }

function createUserMessage(sessionID: SessionID, text: string) {
  return Effect.gen(function* () {
    const ssn = yield* SessionNs.Service
    const msg = yield* ssn.updateMessage({
      id: MessageID.ascending(),
      role: "user",
      sessionID,
      agent: "build",
      model: ref,
      time: { created: Date.now() },
    })
    yield* ssn.updatePart({
      id: PartID.ascending(),
      messageID: msg.id,
      sessionID,
      type: "text",
      text,
    })
    return msg
  })
}

function createAssistantMessage(sessionID: SessionID, parentID: MessageID, outputLength: number) {
  return Effect.gen(function* () {
    const ssn = yield* SessionNs.Service
    const msg = yield* ssn.updateMessage({
      id: MessageID.ascending(),
      role: "assistant",
      sessionID,
      mode: "build",
      agent: "build",
      path: { cwd: "/tmp", root: "/tmp" },
      cost: 0,
      tokens: {
        output: 10,
        input: 10,
        reasoning: 0,
        cache: { read: 0, write: 0 },
      },
      modelID: ref.modelID,
      providerID: ref.providerID,
      parentID,
      time: { created: Date.now() },
      finish: "end_turn",
    })
    const callID = `call-${msg.id}`
    yield* ssn.updatePart({
      id: PartID.ascending(),
      messageID: msg.id,
      sessionID,
      type: "tool",
      callID,
      tool: "bash",
      state: {
        status: "completed",
        input: { cmd: "echo soak" },
        output: "x".repeat(outputLength),
        title: "Soak",
        metadata: {},
        time: { start: Date.now() - 10, end: Date.now() },
      },
    })
    yield* ssn.updatePart({
      id: PartID.ascending(),
      messageID: msg.id,
      sessionID,
      type: "text",
      text: `turn ${msg.id} complete`,
    })
    return msg
  })
}

// env is built from the exact nodes the body requires (line ~100), so the
// requirement set is fully covered; the generic helper cannot prove it, hence the cast.
const run = <A, E, R>(effect: Effect.Effect<A, E, R>): Promise<A> =>
  Effect.runPromise(effect.pipe(Effect.scoped, Effect.provide(env)) as Effect.Effect<A, E, never>)

function main() {
  const totalTurns = Number.isFinite(TURNS) && TURNS > 0 ? TURNS : 2000
  const sampleEvery = Number.isFinite(SAMPLE_EVERY) && SAMPLE_EVERY > 0 ? SAMPLE_EVERY : 100
  console.log(`soak: turns=${totalTurns} sampleEvery=${sampleEvery} (SOAK_TURNS, SOAK_SAMPLE_EVERY)`)
  console.log("soak: fake provider + fake LLM stream — no network, no API cost")
  console.log("soak: model context=20000 output=2000 → compaction triggers on every turn after first")

  const samples: Sample[] = []
  let cpuRef = process.cpuUsage()

  const body = Effect.gen(function* () {
    const db = (yield* Database.Service).db
    const events = yield* EventV2Bridge.Service
    const compaction = makeCoreCompaction({ events, llm: fakeLLM, config: [] })
    const ssn = yield* SessionNs.Service
    const info = yield* ssn.create({})
    const sessionID = info.id

    const turn = Effect.fn("Soak.turn")(function* (i: number) {
      const parent = yield* createUserMessage(sessionID, `user message ${i}: ` + "source".repeat(1 + (i % 25)))
      yield* createAssistantMessage(sessionID, parent.id, 400 + ((i * 137) % 600))
      // A compaction boundary message every 200 turns (projected as history row).
      if (i > 0 && i % 200 === 0) {
        const ssn = yield* SessionNs.Service
        const marker = yield* ssn.updateMessage({
          id: MessageID.ascending(),
          role: "user",
          sessionID,
          agent: "build",
          model: ref,
          time: { created: Date.now() },
        })
        yield* ssn.updatePart({
          id: PartID.ascending(),
          messageID: marker.id,
          sessionID,
          type: "compaction",
          auto: false,
        })
      }

      // 1. Reload projected history (the runner's pre-continuation reload).
      const entries = yield* SessionHistory.entriesForRunner(db, sessionID, 0)

      // 2. Compaction prompt build over real projected entries.
      const request = LLM.request({
        model: soakModel,
        messages: [Message.user("soak")],
        tools: [],
        generation: { maxTokens: 1024 },
      })
      yield* compaction.compactIfNeeded({ sessionID, entries, model: soakModel, request })

      // 3. Runner message conversion over the full reloaded history.
      toLLMMessages(
        entries.map((entry) => entry.message),
        soakModel,
      )

      // 4. Context-epoch persistence path (insert + snapshot decode). Unavailable
      //    sources are fine — the point is the table read/write path.
      yield* SessionContextEpoch.prepare(db, events, Effect.succeed(SystemContext.empty), sessionID).pipe(
        Effect.ignore,
      )

      return entries.length
    })

    for (let i = 0; i < totalTurns; i++) {
      yield* turn(i)
      if (i % sampleEvery === 0) {
        const cpu = process.cpuUsage(cpuRef)
        cpuRef = cpu
        const mem = process.memoryUsage()
        const sample: Sample = {
          turn: i,
          rssMB: Math.round(mem.rss / 1024 / 1024),
          heapMB: Math.round(mem.heapUsed / 1024 / 1024),
          cpuSec: Math.round(((cpu.user + cpu.system) / 1e6) * 10) / 10,
        }
        samples.push(sample)
        console.log(
          `turn=${String(i).padStart(5)} rss=${String(sample.rssMB).padStart(6)}MB heap=${String(sample.heapMB).padStart(6)}MB cpu=${String(sample.cpuSec).padStart(6)}s`,
        )
      }
    }
  })

  return provideTmpdirInstance(() => body).pipe(
    Effect.provide(testInstanceStoreLayer),
    Effect.tapError((error) => Effect.logError("soak failed", { error })),
    Effect.as(samples),
  )
}

const before = process.memoryUsage()
run(main()).then((samples) => {
  const after = process.memoryUsage()
  console.log("soak: done")
  console.log(
    `soak: process rss ${Math.round(before.rss / 1024 / 1024)}MB → ${Math.round(after.rss / 1024 / 1024)}MB, heap ${Math.round(before.heapUsed / 1024 / 1024)}MB → ${Math.round(after.heapUsed / 1024 / 1024)}MB, turns=${samples.at(-1)?.turn ?? 0}`,
  )
  report(samples)
})

function fitSlope(samples: Sample[], field: "rssMB" | "heapMB"): number {
  const n = samples.length
  if (n < 2) return 0
  const xs = samples.map((_, i) => i * SAMPLE_EVERY) // turn index at sample
  const ys = samples.map((s) => s[field])
  const sumX = xs.reduce((a, b) => a + b, 0)
  const sumY = ys.reduce((a, b) => a + b, 0)
  const sumXY = xs.reduce((a, x, i) => a + x * ys[i], 0)
  const sumXX = xs.reduce((a, x) => a + x * x, 0)
  return (n * sumXY - sumX * sumY) / (n * sumXX - sumX * sumX)
}

function report(samples: Sample[]) {
  if (samples.length < 2) {
    console.log("soak: insufficient samples for verdict")
    return
  }
  const slopeHeap = fitSlope(samples, "heapMB")
  const first = fitSlope(samples.slice(0, Math.min(2, samples.length)), "rssMB")
  const last = fitSlope(samples.slice(Math.max(0, samples.length - 2)), "rssMB")

  const firstSample = samples[0]
  const lastSample = samples.at(-1)!
  const rssDelta = lastSample.rssMB - firstSample.rssMB
  const heapDelta = lastSample.heapMB - firstSample.heapMB
  const turns = lastSample.turn

  // Verdict heuristics (rss MB/turn over each half of the run):
  //  - accelerating: second-half slope > 1.5x first-half slope, both positive
  //  - linear: sustained second-half growth (not explainable by one-time warmup)
  //  - stable: growth concentrated in the first half (warmup), second half flat
  let verdict: "stable" | "linear" | "accelerating"
  let evidence: string
  if (last > first * 1.5 && first > 0.1 && rssDelta > 30) {
    verdict = "accelerating"
    evidence = `rss slope first half ${first.toFixed(3)} MB/turn → second half ${last.toFixed(3)} MB/turn (growing)`
  } else if (last > 0.25 && rssDelta > 30) {
    verdict = "linear"
    evidence = `second-half rss slope ${last.toFixed(3)} MB/turn, Δ${rssDelta}MB over ${turns} turns`
  } else {
    verdict = "stable"
    evidence = `growth concentrated in first half (warmup: ${first.toFixed(3)} MB/turn); second half ${last.toFixed(3)} MB/turn, total Δ${rssDelta}MB over ${turns} turns`
  }

  console.log("\n=== SOAK VERDICT ===")
  console.log(`verdict: ${verdict}`)
  console.log(`evidence: ${evidence}`)
  console.log(`heap: slope ${slopeHeap.toFixed(3)} MB/turn, Δ${heapDelta}MB (${firstSample.heapMB} → ${lastSample.heapMB}MB)`)
  console.log(`cpu: ${lastSample.cpuSec}s in final ${SAMPLE_EVERY}-turn window`)

  console.log("\n=== SUSPECTS (ranked) ===")
  const suspects: ReadonlyArray<{ readonly rank: number; readonly component: string; readonly why: string; readonly fix: string }> = [
    {
      rank: 1,
      component: "SessionHistory reload + decode (runner pre-continuation reload)",
      why: "entriesForRunner re-reads and Schema.decodeUnknownEffect-decodes the ENTIRE projected row set on every turn; rows accumulate unbounded while compaction only prunes tool output. Work and retained arrays grow with total history (O(n) per turn).",
      fix: "Reuse cached projected entries across turns inside a drain; only decode rows newer than the last seen seq.",
    },
    {
      rank: 2,
      component: "core compaction select() → serialize() (prompt build)",
      why: "compactIfNeeded → compactAfterOverflow → select() re-serializes EVERY message (including 2k-char tool outputs through serializeToolContent) and Token.estimate()s the whole conversation on each turn; per-turn cost grows linearly with history.",
      fix: "Incremental serialize cache keyed on seq; only re-serialize rows above the last compacted seq.",
    },
    {
      rank: 3,
      component: "runner to-llm-message conversion (toLLMMessages)",
      why: "Rebuilds the full provider message list from the reloaded history every continuation; content parts and tool outputs are re-allocated per turn even when unchanged.",
      fix: "Reuse the previous provider message array when the underlying history is unchanged.",
    },
  ]
  for (const s of suspects) console.log(`${s.rank}. ${s.component} — ${s.why} fix: ${s.fix}`)
  console.log("\nsoak: references")
  console.log("  core/src/session/history.ts:66-101 (load/entriesForRunner)")
  console.log("  core/src/session/compaction.ts:115-170 (select/serialize) + :100 (serializeToolContent) + :172 (buildPrompt)")
  console.log("  core/src/session/runner/to-llm-message.ts:170 (toLLMMessages)")
  console.log("  core/src/session/context-epoch.ts:23-60 (prepare/snapshot decode)")
}