import { createEffect, createMemo, createResource, createSignal, For, onCleanup, onMount, Show } from "solid-js"
import { ScrollBoxRenderable } from "@opentui/core"
import { Spinner } from "../component/spinner"
import { useRoute } from "../context/route"
import { useSDK } from "../context/sdk"
import { useTheme } from "../context/theme"
import { useBindings, useOrchiumModeStack } from "../keymap"
import { Locale } from "../util/locale"

const RECENT_MODE = "recent"
const RECENT_LIMIT = 200

function formatUpdated(updated: number): string {
  const minutes = Math.floor((Date.now() - updated) / 60_000)
  if (minutes < 1) return "just now"
  if (minutes < 60) return `${minutes}m ago`
  const hours = Math.floor(minutes / 60)
  if (hours < 24) return `${hours}h ago`
  const days = Math.floor(hours / 24)
  if (days < 7) return `${days}d ago`
  return new Date(updated).toLocaleDateString()
}

function formatDiff(summary: { additions?: number; deletions?: number; files?: number } | undefined): string {
  if (!summary || (summary.additions ?? 0) === 0 && (summary.deletions ?? 0) === 0 && (summary.files ?? 0) === 0)
    return "—"
  const files = summary.files ?? 0
  return `+${summary.additions ?? 0} / -${summary.deletions ?? 0} (${files} ${files === 1 ? "file" : "files"})`
}

export function RecentSessions() {
  const route = useRoute()
  const sdk = useSDK()
  const { theme } = useTheme()
  const modeStack = useOrchiumModeStack()

  const [loaded] = createResource(async () => {
    const result = await sdk.client.experimental.session.list(
      { roots: true, limit: RECENT_LIMIT },
      { throwOnError: true },
    )
    return result.data ?? []
  })

  const sessions = createMemo(() => loaded() ?? [])
  const [selected, setSelected] = createSignal(0)

  createEffect(() => {
    const count = sessions().length
    const index = Math.min(selected(), Math.max(0, count - 1))
    if (index !== selected()) setSelected(index)
  })

  let scroll: ScrollBoxRenderable | undefined

  createEffect(() => {
    const index = selected()
    const box = scroll
    if (!box) return
    const child = box.getChildren()[index]
    if (!child) return
    if (child.y < box.y) box.scrollBy(child.y - box.y)
    else if (child.y + (child.height ?? 1) > box.y + box.height)
      box.scrollBy(child.y + (child.height ?? 1) - (box.y + box.height))
  })

  const openSelected = () => {
    const session = sessions()[selected()]
    if (!session) return
    route.navigate({ type: "session", sessionID: session.id })
  }

  onMount(() => {
    const popMode = modeStack.push(RECENT_MODE)
    onCleanup(popMode)
  })

  useBindings(() => ({
    mode: RECENT_MODE,
    enabled: true,
    bindings: [
      { key: "up", desc: "Previous session", group: "Recent", cmd: () => setSelected((i) => Math.max(0, i - 1)) },
      { key: "down", desc: "Next session", group: "Recent", cmd: () => setSelected((i) => Math.min(sessions().length - 1, i + 1)) },
      { key: "pageup", desc: "Page up", group: "Recent", cmd: () => setSelected((i) => Math.max(0, i - 10)) },
      { key: "pagedown", desc: "Page down", group: "Recent", cmd: () => setSelected((i) => Math.min(sessions().length - 1, i + 10)) },
      { key: "return", desc: "Open session", group: "Recent", cmd: () => openSelected() },
      { key: "escape", desc: "Back to home", group: "Recent", cmd: () => route.navigate({ type: "home" }) },
    ],
  }))

  return (
    <box flexDirection="column" flexGrow={1} minHeight={0} paddingLeft={2} paddingRight={2} paddingTop={1} gap={1}>
      <text fg={theme.accent}>
        Recent sessions (all projects)
      </text>
      <Show when={loaded.loading && sessions().length === 0}>
        <box>
          <Spinner />
        </box>
      </Show>
      <Show when={loaded.error && sessions().length === 0}>
        <text fg={theme.error}>Failed to load sessions.</text>
      </Show>
      <Show when={!loaded.loading && !loaded.error && sessions().length === 0}>
        <text fg={theme.border}>No sessions found across projects.</text>
      </Show>
      <scrollbox
        ref={(r) => (scroll = r)}
        flexGrow={1}
        minHeight={0}
        viewportOptions={{
          paddingRight: 1,
        }}
        verticalScrollbarOptions={{
          paddingLeft: 1,
          visible: true,
          trackOptions: {
            backgroundColor: theme.backgroundElement,
            foregroundColor: theme.border,
          },
        }}
      >
        <box flexDirection="column" gap={0}>
          <For each={sessions()}>
            {(session, i) => (
              <box flexDirection="column">
                <box flexDirection="row" justifyContent="space-between" gap={2}>
                  <box flexDirection="row" gap={2} flexGrow={1} flexShrink={1}>
                    <text fg={i() === selected() ? theme.accent : undefined}>
                      {Locale.truncate(session.title || "Untitled", 60)}
                    </text>
                    <text fg={theme.border}>{formatDiff(session.summary)}</text>
                  </box>
                  <text fg={theme.border}>{formatUpdated(session.time.updated)}</text>
                </box>
                <text fg={theme.border}>
                  {Locale.truncate(
                    session.project?.name
                      ? `${session.project.name} — ${session.directory}`
                      : session.directory,
                    100,
                  )}
                </text>
              </box>
            )}
          </For>
        </box>
      </scrollbox>
    </box>
  )
}