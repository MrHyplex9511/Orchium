# Orchium Roadmap

Orchium is the **stable, reliable, and developer-friendly alternative to OpenCode** — built on the same great core, fixing the pain points its community is most vocal about.

This document is the product plan derived from a community pain-point audit (GitHub issues, Reddit, forums). Every item below is **verified against this codebase** — nothing is speculative wishlist.

**Status legend**
- ✅ **SHIPPED** — exists in code today (file pointer included)
- 🚧 **PARTIAL** — works but missing the full ask
- ⬜ **PLANNED** — the gap to build; these are the actual roadmap items

---

## Positioning

> **For developers:** Orchium fixes the memory leaks, agent reliability, and broken session management that make OpenCode unusable in long sessions.
> **For teams/companies:** Orchium offers stability, cost visibility, and a first-class plugin platform for internal tooling.

Our differentiators are already partially built (`/recent` global session view, compaction, PTY, plan-mode, revert). The roadmap below turns the remaining complaints into shipped features.

---

## Pack 1 — Stability & Performance (HIGHEST PRIORITY)

The #1 complaint cluster. If Orchium fixes this, we win.

| # | Community pain | Current state | Work item |
|---|---|---|---|
| 1.1 | **Catastrophic memory leaks** (29–50GB+ RAM, system freezes) | ⬜ No dedicated investigation. Core is Bun; `packages/core/src/session/compaction.ts` and `packages/orchium/src/session/compaction.ts` exist but no leak harness. | **Memory-leak investigation & fix.** Build a soak/profiling harness (long synthetic session loop under `bun --smol` + heap snapshots), isolate leak sources, fix, add regression guard. Ship "stable mode" toggle if fix is large. |
| 1.2 | **Extreme slowness / 99–100% CPU** during long sessions & streaming | ⬜ No perf budget tests. TUI has a pre-existing Bun segfault at `packages/core/src/util/flock.ts:345` (upstream Bun bug, documented). | **Perf profiling pass.** Profile TUI render loop + streaming path (`packages/tui/src/`), add CPU budget tests, fix hot paths. Track as separate workstream from the Bun segfault (not ours to fix). |
| 1.3 | **Random crashes & freezes** (startup, Docker) | 🚧 Session sleep/recovery paths exist (`/recent`, compaction). Startup crash repros unknown. | **Startup/Docker stability.** Reproduce black-screen-on-startup scenarios, add smoke tests for headless/Docker entrypoints (`packages/orchium/src/cli/cmd/tui.ts`, `serve.ts`). |
| 1.4 | **"Thinking…" loop of death** after mid-generation crash | 🚧 Session recovery + compaction are shipped; V2 Session Core notes explicitly defer *automated post-crash provider retry* ("requires a separate explicit design"). | **Crash-recovery continuation.** Design + ship durable resume after process crash: mark interrupted session state, enable explicit recovery command. (See AGENTS.md V2 Session Core notes.) |

**Definition of done for Pack 1:** soak test runs >6h under a fixed memory ceiling; CPU stays bounded; crash-recovery resume works end-to-end.

---

## Pack 2 — Unified Workspace (build on what ships)

We already lead on global session management; close the remaining gaps.

| # | Community pain | Current state | Work item |
|---|---|---|---|
| 2.1 | **No global session view** | ✅ **SHIPPED** — `/recent` (`packages/tui/src/routes/recent.tsx`) shows all sessions across projects. | *(Keep. Differentiator.)* |
| 2.2 | **Session context broken — cwd doesn't change on switch** | ✅ **SHIPPED** — directory restore on session switch in `packages/tui/src/routes/session/index.tsx`. | *(Keep. Verify against the "wrong project" repros.)* |
| 2.3 | **Pinned sessions get lost with concurrent instances (no file locking)** | ⬜ No locking on session state files. Multiple instances overwrite each other. | **Session-state file locking.** Add lock on session store writes (`packages/core/src/session/`), prevent cross-instance clobbering; surface "session open elsewhere" in TUI. |
| 2.4 | **No bulk session export** | 🚧 Single-session JSON export exists: `export [sessionID]` (`packages/orchium/src/cli/cmd/export.ts`). | **Bulk export command.** Add `export --all` (`--format json|markdown`), backup/analysis/migration use case. |
| 2.5 | **Async/background processes fail (sync bash tool)** | ✅ **SHIPPED** — PTY support: `packages/orchium/src/server/routes/instance/httpapi/groups/pty.ts`. | *(Keep. Verify interactive + background flows end-to-end.)* |

---

## Pack 3 — Developer's Plugin Platform

Make Orchium *the* platform for building OpenCode plugins.

| # | Community pain | Current state | Work item |
|---|---|---|---|
| 3.1 | **Limited & outdated plugin API** | 🚧 Plugin **v2 design exists**: `packages/plugin/src/v2/effect/PLAN.md`. Not shipped. | **Ship plugin v2 API** per the PLAN: structured return data, modern tool/integration surface. |
| 3.2 | **Poor DX — no hot-reload, no test fixtures** | ⬜ No PDK. Plugin dev requires full restarts. | **Plugin Development Kit (PDK).** Scaffold CLI (`plug` exists at `packages/orchium/src/cli/cmd/plug.ts`), hot-reload watcher, example plugin + test fixtures. |
| 3.3 | **Silent plugin failures/regressions on updates** | 🚧 Solid ACP/session test suite exists (`packages/orchium/test/acp/`, `test/session/`). No plugin-regression gate. | **Plugin regression suite.** Contract tests pinning plugin API behavior; CI gate so shipped plugin API can't silently break (the v1.14.32-class outage). |
| 3.4 | **No standard `mcpServers` config support** | 🚧 Runtime/ACP already uses `mcpServers` naming (`packages/orchium/src/acp/session.ts`), but **user config key is `mcp`** (`cli/cmd/mcp.ts:185` — `config.mcp ?? {}`). | **Config rename to `mcpServers`.** Accept standard `mcpServers` key (Claude Code / Cursor compatible), keep `mcp` as deprecated alias with migration warning + JSON schema update (`packages/core/src/config.ts`, `packages/core/src/config/mcp.ts`). |
| 3.5 | **Plugin type drift (package types out of sync with core)** | ✅ **SHIPPED** — types are code-generated from source: `bun run generate` in `packages/client` (see AGENTS.md). `@opencode-ai/plugin` alias retained for back-compat (`package.json` line 141). | *(Keep. Ensure the generated types flow into the plugin package on release.)* |

**Definition of done for Pack 3:** a third-party plugin can be written, hot-reloaded, and regress-tested without restarting the app or reading core source.

---

## Pack 4 — Smart Agent (harness-level reliability)

Direct fixes to agent behavior — the reliability that is the core value proposition.

| # | Community pain | Current state | Work item |
|---|---|---|---|
| 4.1 | **Intent-narration loop** ("Now I will open X" → no tool call) | ⬜ No harness gate. | **Narration-validation gate.** Reject/nudge turns that announce a tool call without invoking one; track loop counters in `packages/orchium/src/agent/agent.ts`. |
| 4.2 | **Only reads parts of files → bad edits** | ⬜ File-read context policy is permissive. | **Full-file read policy.** Prefer full-file context before edits, configurable `maxReadContext` cap; feed the big picture to the model (`packages/orchium/src/session/prompt.ts`). |
| 4.3 | **Plan mode is useless (4-line plans)** | 🚧 Plan mode exists: `packages/orchium/src/session/prompt/plan-mode.txt`. Quality is the complaint. | **Plan-mode prompt overhaul.** Rework system prompt to produce detailed, actionable plans; add plan-quality fixture tests. |
| 4.4 | **Context fills too fast** | ✅ **SHIPPED** — compaction: `packages/orchium/src/session/compaction.ts` + `/compact`. | *(Keep.)* |
| 4.5 | **No `/rewind` to recover from bad turns** | ⬜ Revert core exists but no interactive `/rewind` UX. | **Ship `/rewind` UX.** Interactive rewind to a prior turn (leverage `packages/orchium/src/session/revert.ts` + session timeline `packages/tui/src/routes/session/dialog-timeline.tsx`). |

---

## Pack 5 — Cost & Insight (sponsor magnet)

Companies will pay for visibility into AI spend.

| # | Community pain | Current state | Work item |
|---|---|---|---|
| 5.1 | **No cost/token visibility** | 🚧 `packages/stats/` tracks server-side global usage; not a user-facing per-session dashboard. | **Cost & token dashboard.** Per-session + per-project cost/token breakdowns, model-level drill-down, `/stats` TUI view + CLI. Renders to "companies sponsor this" feature. |
| 5.2 | **No privacy policy / telemetry trust** | ✅ **No third-party telemetry** — verified: zero posthog/sentry/segment/mixpanel/amplitude runtime refs; only OPT-in OpenTelemetry (`packages/core/src/observability/otlp.ts`); Electron `telemetry: false` (`packages/desktop/electron.vite.config.ts`). | **Publish `PRIVACY.md`.** State the telemetry facts plainly (opt-in OTel only); add link in repo + app. Trust is a differentiator. |
| 5.3 | **Desktop app slow after long chats** | 🚧 `ResizeObserver` storm complaint is **already fixed** (zero matches in `packages/desktop/`). Slowness at scale unverified. | **Desktop perf pass.** Long-chat soak in `packages/desktop/`, memory profile, fix remaining hot spots. |
| 5.4 | **Dark theme brightness** | ⬜ Cosmetic. | **Theme polish** for the desktop client. |

---

## Suggested build order

| Phase | Scope | Why now |
|---|---|---|
| **Phase 0 (this month)** | 1.1 memory-leak investigation + 4.1 narration gate + 3.4 `mcpServers` rename | Largest complaints, smallest surface |
| **Phase 1** | 1.4 crash recovery + 2.3 session locking + 2.4 bulk export + 4.5 `/rewind` | Completes stability + workflow story |
| **Phase 2** | 3.1 ship plugin v2 + 3.2 PDK + 3.3 regression suite | Community magnet |
| **Phase 3** | 5.1 cost dashboard + 4.3 plan overhaul + 5.2 PRIVACY.md + polish | Sponsor + trust |

## Measurement

- Pack 1: soak harness (memory ceiling, CPU bound, crash-recovery resume) green for 6h+
- Pack 2: bulk export + locking covered by tests
- Pack 3: sample plugin written via PDK, hot-reloaded, contract-tested in CI
- Pack 4: zero narration-loop stalls in fixture sessions; plan-quality fixtures pass
- Pack 5: cost dashboard live; PRIVACY.md linked; desktop soak green

---

*Status verified 2026-09-12 against `7a8db55` (dev). Items marked PLANNED are the build backlog.*