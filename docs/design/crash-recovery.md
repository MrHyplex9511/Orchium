# Crash-Recovery Continuation (Pack 1.4)

Fixes the **"Thinking…" loop of death**: a process dies mid-provider-turn, the admitted
prompt never becomes a visible message, and the reopened session renders a half-built
assistant row as streaming forever. Explicit design required by AGENTS.md ("V2 Session
Core") before any post-crash provider retry may exist.

Scope: **local, single-process reconciliation over durable rows** — no auto-retry, no cross-node continuation, no durable drain identity; clustering deferred (Phase 2).

## 1. Problem + failure modes

Durable write order per prompt: admit `session_input` → `Prompted` (visible user row)
→ `Step.Started` (assistant row, `time.completed` unset) → stream →
`Step.Ended`/`Step.Failed` (terminal). A crash lands between steps:

| # | Crash point | DB state | Consequence |
|---|---|---|---|
| F0 | Before admit | Nothing durable | No recovery needed. |
| F1 | After admit, before promote/stream | `session_input.promoted_seq IS NULL`; no user or assistant row | Prompt invisible; provider **not** billed. Safe to promote. |
| F2 | Mid-stream (billed) | input promoted; user row exists; assistant row open (`time.completed` unset, partial parts) | **The target bug.** TUI renders "Thinking…" forever. |
| F3 | After completion, before `Step.Ended` persists | As F2 but content complete, `finish`/cost absent | Same recovery; usage events already durable, spend accounted. |

## 2. Current invariants & gaps

Already true:
- **Admission is idempotent.** `SessionInput.admit` returns the existing row for a
  reused message ID; promotion helpers are conflict-checked (AGENTS.md exact-retry rule).
- **The serialized runner owns promotion** (boundaries only); **`Step.Started`
  supersedes stale assistants** (closes the prior open assistant).
- **Process-local drains.** A dead process leaves no fiber; restart-held `interrupt`
  is a no-op. Nothing to kill — only state to close out.

Missing:
- No durable terminal marker for "process died mid-turn".
- No reconciliation of `promoted_seq IS NULL` inputs (F1).
- No retry that reuses the original input ID — retyping admits a **second** input.
- Nothing may retry provider work after a crash; this design fills that gap, and only
  via explicit user action (§3.2).

## 3. Proposed design

### 3.1 `SessionRecovery.recover` — reconcile durable rows, never run the provider

```
recover(sessionID):
  last = latest session_message; interrupted = last is an open assistant
  if interrupted: publish Turn.Interrupted { sessionID, assistantMessageID, timestamp }
  promote pending steers to cutoff, then one queued input   # F1 repair
  # mark FIRST, then promote: repaired user messages land after the closed-out
  # turn, matching "promote at next safe boundary"
```

- `Turn.Interrupted` (`session.next.turn.interrupted`) mirrors `Step.Failed`'s
  projection: `time.completed`, `finish = "interrupted"`, pending/running tools failed
  (generalizing `failInterruptedTools`, llm.ts:397). `Step.Failed` reuse rejected —
  `finish` would read `"error"`; a crash isn't a failure.
- **Trigger:** idempotent, runs on every session open (marker durable before render)
  and via explicit `/recover`. No global startup sweep in phase 0.

### 3.2 Explicit retry — reuse the same input ID

`/recover` (or "Retry last prompt") re-issues the session's last admitted prompt via
`SessionV2.prompt(...)` **with its original message ID**:

1. `SessionInput.admit` returns the existing row — no duplicate admission.
2. Promotion no-ops (matching `promoted_seq`).
3. `SessionExecution` starts a fresh drain; new `Step.Started` supersedes the marker.
4. One fresh `llm.stream(request)` turn over full projected history.

**Billing semantics:** idempotency prevents *accidental* double billing (no duplicate
admission or stream). A retry is a deliberate, user-triggered new provider call; the
first attempt is closed out, never replayed. Only provider work in the design.

### 3.3 Interaction with existing machinery

- **`SessionRunCoordinator`:** state is in-memory; post-restart a retry is a fresh
  `run(key, force)`. Recovery never runs inside a drain — it reconciles rows the drain
  later reads; join/coalesce unchanged.
- **EventV2 replay claims:** claims track reader position only; recovery appends
  `Turn.Interrupted` like any event. Replay ownership stays separate from drain
  ownership (AGENTS.md); a dead drain holds no claim.
- **Revert:** `RevertEvent.Committed` already deletes messages *and* input rows beyond
  the boundary, so a reverted interrupted turn removes its input cleanly; recovery
  after revert no-ops.

### 3.4 Node ownership caveat

Two processes on one store could both publish the marker; benign (idempotent
projection) while installs are single-process. No per-session claim in phases 0–1;
phase 2 makes recovery claim-aware.

## 4. Edge cases + explicitly NOT done

- **No auto-retry** — startup, open, and advisory wakes mark/reconcile only; provider
  work exists solely via explicit user retry.
- **No cross-node continuation / durable drain identity** — a dead drain is never
  resumed; it is closed out, then re-started on retry. The marker is the tombstone.
- **Partial content preserved, not replayed** — the interrupted row stays marked in
  the transcript; retry appends a new turn.
- **Queued inputs / unreopened sessions:** at most one queued input promoted per
  recovery; never-opened sessions get no reconciliation (lazy); `/recent` badge is phase 1.
- **No un-billing** — provider spend is already recorded; not reverted.
- **Concurrent same-store processes** may double-publish the marker; benign (§3.4).

## 5. Phased implementation

**Phase 0 — detection + marker + manual resume (core).**
1. `session.next.turn.interrupted` event + schema + message-updater/projector branch.
2. `SessionRecovery.recover` (predicate, marker publish, steer/queue promote).
3. Hook on session open so the marker exists before render.
4. Retry path: `SessionV2.prompt` accepts an existing input ID without re-admission.
5. Tests: crash-sim fixture (admit → promote → open assistant → recover → assert
   marker + repair + no duplicate input).

**Phase 1 — TUI UX:** `/recover` command; "interrupted / retry last message" banner
affordance; `/recent` badge for sessions with an interrupted last turn.

**Phase 2 — clustering (deferred):** durable drain identity + node claims;
claim-aware recovery; cross-node continuation; optional global startup sweep.