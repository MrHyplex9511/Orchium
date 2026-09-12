import { Session } from "@/session/session"
import { SessionV1 } from "@orchium/core/v1/session"
import { MessageV2 } from "../../session/message-v2"
import { SessionID } from "../../session/schema"
import { effectCmd, fail } from "../effect-cmd"
import { UI } from "../ui"
import * as prompts from "@clack/prompts"
import { EOL } from "os"
import fs from "fs/promises"
import path from "path"
import { Cause, Effect } from "effect"

function redact(kind: string, id: string, value: string) {
  return value.trim() ? `[redacted:${kind}:${id}]` : value
}

function data(kind: string, id: string, value: Record<string, unknown> | undefined) {
  if (!value) return value
  return Object.keys(value).length ? { redacted: `${kind}:${id}` } : value
}

function span(id: string, value: { value: string; start: number; end: number }) {
  return {
    ...value,
    value: redact("file-text", id, value.value),
  }
}

function diff(kind: string, diffs: { file?: string; patch?: string }[] | undefined) {
  return diffs?.map((item, i) => ({
    ...item,
    file: item.file === undefined ? undefined : redact(`${kind}-file`, String(i), item.file),
    patch: item.patch === undefined ? undefined : redact(`${kind}-patch`, String(i), item.patch),
  }))
}

function source(part: SessionV1.FilePart) {
  if (!part.source) return part.source
  if (part.source.type === "symbol") {
    return {
      ...part.source,
      path: redact("file-path", part.id, part.source.path),
      name: redact("file-symbol", part.id, part.source.name),
      text: span(part.id, part.source.text),
    }
  }
  if (part.source.type === "resource") {
    return {
      ...part.source,
      clientName: redact("file-client", part.id, part.source.clientName),
      uri: redact("file-uri", part.id, part.source.uri),
      text: span(part.id, part.source.text),
    }
  }
  return {
    ...part.source,
    path: redact("file-path", part.id, part.source.path),
    text: span(part.id, part.source.text),
  }
}

function filepart(part: SessionV1.FilePart): SessionV1.FilePart {
  return {
    ...part,
    url: redact("file-url", part.id, part.url),
    filename: part.filename === undefined ? undefined : redact("file-name", part.id, part.filename),
    source: source(part),
  }
}

function part(part: SessionV1.Part): SessionV1.Part {
  switch (part.type) {
    case "text":
      return {
        ...part,
        text: redact("text", part.id, part.text),
        metadata: data("text-metadata", part.id, part.metadata),
      }
    case "reasoning":
      return {
        ...part,
        text: redact("reasoning", part.id, part.text),
        metadata: data("reasoning-metadata", part.id, part.metadata),
      }
    case "file":
      return filepart(part)
    case "subtask":
      return {
        ...part,
        prompt: redact("subtask-prompt", part.id, part.prompt),
        description: redact("subtask-description", part.id, part.description),
        command: part.command === undefined ? undefined : redact("subtask-command", part.id, part.command),
      }
    case "tool":
      return {
        ...part,
        metadata: data("tool-metadata", part.id, part.metadata),
        state:
          part.state.status === "pending"
            ? {
                ...part.state,
                input: data("tool-input", part.id, part.state.input) ?? part.state.input,
                raw: redact("tool-raw", part.id, part.state.raw),
              }
            : part.state.status === "running"
              ? {
                  ...part.state,
                  input: data("tool-input", part.id, part.state.input) ?? part.state.input,
                  title: part.state.title === undefined ? undefined : redact("tool-title", part.id, part.state.title),
                  metadata: data("tool-state-metadata", part.id, part.state.metadata),
                }
              : part.state.status === "completed"
                ? {
                    ...part.state,
                    input: data("tool-input", part.id, part.state.input) ?? part.state.input,
                    output: redact("tool-output", part.id, part.state.output),
                    title: redact("tool-title", part.id, part.state.title),
                    metadata: data("tool-state-metadata", part.id, part.state.metadata) ?? part.state.metadata,
                    attachments: part.state.attachments?.map(filepart),
                  }
                : {
                    ...part.state,
                    input: data("tool-input", part.id, part.state.input) ?? part.state.input,
                    metadata: data("tool-state-metadata", part.id, part.state.metadata),
                  },
      }
    case "patch":
      return {
        ...part,
        hash: redact("patch", part.id, part.hash),
        files: part.files.map((item: string, i: number) => redact("patch-file", `${part.id}-${i}`, item)),
      }
    case "snapshot":
      return {
        ...part,
        snapshot: redact("snapshot", part.id, part.snapshot),
      }
    case "step-start":
      return {
        ...part,
        snapshot: part.snapshot === undefined ? undefined : redact("snapshot", part.id, part.snapshot),
      }
    case "step-finish":
      return {
        ...part,
        snapshot: part.snapshot === undefined ? undefined : redact("snapshot", part.id, part.snapshot),
      }
    case "agent":
      return {
        ...part,
        source: !part.source
          ? part.source
          : {
              ...part.source,
              value: redact("agent-source", part.id, part.source.value),
            },
      }
    default:
      return part
  }
}

const partFn = part

function sanitize(data: { info: Session.Info; messages: SessionV1.WithParts[] }) {
  return {
    info: {
      ...data.info,
      title: redact("session-title", data.info.id, data.info.title),
      directory: redact("session-directory", data.info.id, data.info.directory),
      summary: !data.info.summary
        ? data.info.summary
        : {
            ...data.info.summary,
            diffs: diff("session-diff", data.info.summary.diffs),
          },
      revert: !data.info.revert
        ? data.info.revert
        : {
            ...data.info.revert,
            snapshot:
              data.info.revert.snapshot === undefined
                ? undefined
                : redact("revert-snapshot", data.info.id, data.info.revert.snapshot),
            diff:
              data.info.revert.diff === undefined
                ? undefined
                : redact("revert-diff", data.info.id, data.info.revert.diff),
          },
    },
    messages: data.messages.map((msg) => ({
      info:
        msg.info.role === "user"
          ? {
              ...msg.info,
              system: msg.info.system === undefined ? undefined : redact("system", msg.info.id, msg.info.system),
              summary: !msg.info.summary
                ? msg.info.summary
                : {
                    ...msg.info.summary,
                    title:
                      msg.info.summary.title === undefined
                        ? undefined
                        : redact("summary-title", msg.info.id, msg.info.summary.title),
                    body:
                      msg.info.summary.body === undefined
                        ? undefined
                        : redact("summary-body", msg.info.id, msg.info.summary.body),
                    diffs: diff("message-diff", msg.info.summary.diffs),
                  },
            }
          : {
              ...msg.info,
              path: {
                cwd: redact("cwd", msg.info.id, msg.info.path.cwd),
                root: redact("root", msg.info.id, msg.info.path.root),
              },
            },
      parts: msg.parts.map(partFn),
    })),
  }
}

function dateStamp() {
  return new Date().toISOString().slice(0, 10)
}

function truncate(text: string, max = 200) {
  if (text.length <= max) return text
  return `${text.slice(0, max).trimEnd()}…`
}

function markdownPart(part: SessionV1.Part): string | undefined {
  switch (part.type) {
    case "text":
      return part.text
    case "reasoning":
      return part.text.trim() ? part.text.split("\n").map((line) => `> ${line}`).join("\n") : undefined
    case "tool": {
      const label = `\`${part.tool}\``
      const state = part.state
      if (state.status === "completed") {
        const output = truncate(state.output.replace(/\s+/g, " ").trim())
        const title = state.title ? `: ${state.title}` : ""
        return output ? `${label} (completed)${title}\n\n\`\`\`\n${output}\n\`\`\`` : `${label} (completed)${title}`
      }
      if (state.status === "error") return `${label} (error): ${truncate(state.error)}`
      return `${label} (${state.status})`
    }
    case "file":
      return `file: ${part.filename ?? part.url}`
    case "patch":
      return `patch: ${part.files.length} file${part.files.length === 1 ? "" : "s"}`
    case "subtask":
      return `subtask: ${part.description}`
    case "snapshot":
      return `snapshot`
    case "step-start":
      return `step-start`
    case "step-finish":
      return `step-finish`
    case "agent":
      return `agent: ${part.name}`
    case "retry":
      return `retry: attempt ${part.attempt}`
    case "compaction":
      return `compaction${part.auto ? "" : " (manual)"}`
    default:
      return undefined
  }
}

// Structural view of an exported session that both raw and sanitized data satisfy.
type MarkdownSession = {
  info: {
    title: string
    id: string
    directory: string
    agent?: string
    model?: { id: string }
    time: { created: number; updated: number }
  }
  messages: { info: { role: string; time: { created: number } }; parts: SessionV1.Part[] }[]
}

function renderMarkdown(data: MarkdownSession) {
  const info = data.info
  const lines = [
    `# ${info.title}`,
    "",
    `- **id**: \`${info.id}\``,
    `- **directory**: \`${info.directory}\``,
    `- **created**: ${new Date(info.time.created).toISOString()}`,
    `- **updated**: ${new Date(info.time.updated).toISOString()}`,
  ]
  if (info.agent) lines.push(`- **agent**: ${info.agent}`)
  if (info.model) lines.push(`- **model**: ${info.model.id}`)
  lines.push("", "## Messages", "")
  for (const msg of data.messages) {
    lines.push(`### ${msg.info.role} — ${new Date(msg.info.time.created).toISOString()}`, "")
    for (const part of msg.parts) {
      const body = markdownPart(part)
      if (body) {
        lines.push(body, "")
      }
    }
  }
  return lines.join(EOL)
}

type Exported = { id: string; title: string; updated: number; directory: string; file: string }
type Failed = { id: string; error: string }

function renderIndexJson(exported: Exported[], format: string) {
  return {
    exportedAt: new Date().toISOString(),
    format,
    count: exported.length,
    sessions: exported.map((entry) => ({ ...entry })),
  }
}

function renderIndexMarkdown(exported: Exported[], outputDir: string) {
  const lines = [
    "# Orchium Session Export",
    "",
    `Exported ${exported.length} session${exported.length === 1 ? "" : "s"} on ${dateStamp()} into \`${outputDir}\`.`,
    "",
  ]
  if (exported.length === 0) lines.push("No sessions found.")
  for (const [i, entry] of exported.entries()) {
    lines.push(`${i + 1}. **${entry.title}** (\`${entry.id}\`)`)
    lines.push(`   - directory: \`${entry.directory}\``)
    lines.push(`   - updated: ${new Date(entry.updated).toISOString()}`)
    lines.push(`   - file: \`${entry.file}\``)
    lines.push("")
  }
  return lines.join(EOL)
}

type ExportArgs = {
  sessionID?: string
  sanitize?: boolean
  all?: boolean
  format?: "json" | "markdown"
  output?: string
}

export const ExportCommand = effectCmd({
  command: "export [sessionID]",
  describe: "export session data as JSON or Markdown",
  builder: (yargs) =>
    yargs
      .positional("sessionID", {
        describe: "session id to export",
        type: "string",
      })
      .option("all", {
        describe: "export every session into per-session files in a directory",
        type: "boolean",
      })
      .option("format", {
        describe: "output format",
        choices: ["json", "markdown"],
        default: "json",
      })
      .option("output", {
        describe: "directory to write --all exports (default ./orchium-export-<date>)",
        type: "string",
      })
      .option("sanitize", {
        describe: "redact sensitive transcript and file data",
        type: "boolean",
      }),
  handler: Effect.fn("Cli.export")(function* (args) {
    return yield* run(args)
  }),
})

export const exportAll = Effect.fn("Cli.export.all")(function* (args: ExportArgs) {
  const svc = yield* Session.Service
  const format = args.format ?? "json"
  const outputDir = args.output ?? `./orchium-export-${dateStamp()}`
  const ext = format === "markdown" ? "md" : "json"

  process.stderr.write(`Exporting all sessions to ${outputDir} (${format})\n`)

  const sessions = yield* svc
    .list()
    .pipe(Effect.catchCause((cause) => fail(`Failed to list sessions: ${Cause.pretty(cause)}`)))
  sessions.sort((a, b) => b.time.updated - a.time.updated)

  if (sessions.length === 0) {
    process.stderr.write("No sessions found\n")
  }

  yield* Effect.promise(() => fs.mkdir(outputDir, { recursive: true })).pipe(
    Effect.catchCause((cause) =>
      fail(`Failed to create export directory ${outputDir}: ${Cause.pretty(cause)}`),
    ),
  )

  const exported: Exported[] = []
  const failed: Failed[] = []

  for (const session of sessions) {
    const outcome = yield* Effect.gen(function* () {
      const info = yield* svc.get(session.id)
      const messages = yield* svc.messages({ sessionID: session.id })
      const exportData = { info, messages }
      const applied = args.sanitize ? sanitize(exportData) : exportData
      const body = format === "markdown" ? renderMarkdown(applied) : JSON.stringify(applied, null, 2)
      const file = `${session.id}.${ext}`
      yield* Effect.promise(() => Bun.write(path.join(outputDir, file), body + EOL))
      return {
        id: session.id,
        title: args.sanitize ? redact("session-title", session.id, info.title) : info.title,
        directory: args.sanitize ? redact("session-directory", session.id, info.directory) : info.directory,
        updated: info.time.updated,
        file,
      }
    }).pipe(
      Effect.catchCause((cause) => Effect.succeed({ id: session.id, error: Cause.pretty(cause) })),
    )

    if ("error" in outcome) {
      failed.push(outcome)
      process.stderr.write(`Failed to export ${outcome.id}: ${outcome.error}\n`)
    } else {
      exported.push(outcome)
      process.stderr.write(`Exported ${outcome.id} (${outcome.title})\n`)
    }
  }

  const indexBody =
    format === "markdown"
      ? renderIndexMarkdown(exported, outputDir)
      : JSON.stringify(renderIndexJson(exported, format), null, 2)
  yield* Effect.promise(() => Bun.write(path.join(outputDir, `index.${ext}`), indexBody + EOL))

  if (failed.length > 0) {
    process.stderr.write(`Export finished: ${exported.length} exported, ${failed.length} failed\n`)
  }

  if (failed.length === sessions.length && sessions.length > 0) {
    return yield* fail(`All ${sessions.length} sessions failed to export`)
  }
})

const run = Effect.fn("Cli.export.body")(function* (args: ExportArgs) {
  if (args.all) {
    return yield* exportAll(args)
  }

  const svc = yield* Session.Service
  let sessionID = args.sessionID ? SessionID.make(args.sessionID) : undefined
  process.stderr.write(`Exporting session: ${sessionID ?? "latest"}\n`)

  if (!sessionID) {
    UI.empty()
    prompts.intro("Export session", { output: process.stderr })

    const sessions = yield* svc.list()

    if (sessions.length === 0) {
      prompts.log.error("No sessions found", { output: process.stderr })
      prompts.outro("Done", { output: process.stderr })
      return
    }

    sessions.sort((a, b) => b.time.updated - a.time.updated)

    const selectedSession = yield* Effect.promise(() =>
      prompts.autocomplete({
        message: "Select session to export",
        maxItems: 10,
        options: sessions.map((session) => ({
          label: session.title,
          value: session.id,
          hint: `${new Date(session.time.updated).toLocaleString()} • ${session.id.slice(-8)}`,
        })),
        output: process.stderr,
      }),
    )

    if (prompts.isCancel(selectedSession)) {
      return yield* Effect.die(new UI.CancelledError())
    }

    sessionID = selectedSession

    prompts.outro("Exporting session...", { output: process.stderr })
  }

  // Match legacy try/catch — catches both typed failures and defects
  // (Session.Service.get throws NotFoundError as a defect, not a typed E).
  return yield* Effect.gen(function* () {
    const sessionInfo = yield* svc.get(sessionID!)
    const messages = yield* svc.messages({ sessionID: sessionInfo.id })

    const exportData = { info: sessionInfo, messages }
    const applied = args.sanitize ? sanitize(exportData) : exportData
    const body = args.format === "markdown" ? renderMarkdown(applied) : JSON.stringify(applied, null, 2)

    process.stdout.write(body)
    process.stdout.write(EOL)
  }).pipe(Effect.catchCause(() => fail(`Session not found: ${sessionID!}`)))
})