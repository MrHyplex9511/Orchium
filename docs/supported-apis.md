# Supported HTTP APIs

All endpoints are prefixed with the Orchium server base URL (default `http://localhost:42069`).
Responses use JSON unless otherwise noted. SSE and WebSocket endpoints are marked.

## Common Query Parameters

Most endpoint groups accept an optional **location** query for workspace scoping:

```
?location[directory]=/path/to/project&location[workspace]=my-workspace
```

When omitted the server resolves its default location.

---

## Health

Health check.

| Method | Path | Description |
|--------|------|-------------|
| `GET`  | `/api/health` | Server health — returns `{ healthy: true }` |

---

## Location

Resolve the effective location for a request.

| Method | Path | Description |
|--------|------|-------------|
| `GET`  | `/api/location` | Resolve requested or default location |

---

## Agent

Agent registry.

| Method | Path | Description |
|--------|------|-------------|
| `GET`  | `/api/agent` | List registered agents |

---

## Session

Session lifecycle, prompting, revert, and history. The richest group (17 endpoints).

| Method | Path | Description |
|--------|------|-------------|
| `GET`  | `/api/session` | List sessions (paginated, cursor-based) |
| `POST` | `/api/session` | Create a new session |
| `GET`  | `/api/session/active` | List sessions with an active drain in this process |
| `GET`  | `/api/session/:sessionID` | Get a single session |
| `POST` | `/api/session/:sessionID/agent` | Switch the agent for a session |
| `POST` | `/api/session/:sessionID/model` | Switch the model for a session |
| `POST` | `/api/session/:sessionID/prompt` | Durable admit a user message and schedule the agent loop |
| `POST` | `/api/session/:sessionID/compact` | Compact a session conversation |
| `POST` | `/api/session/:sessionID/wait` | Block until the agent loop is idle |
| `POST` | `/api/session/:sessionID/revert/stage` | Stage a reversible boundary (optionally apply file changes) |
| `POST` | `/api/session/:sessionID/revert/clear` | Clear a staged revert |
| `POST` | `/api/session/:sessionID/revert/commit` | Commit a staged revert |
| `GET`  | `/api/session/:sessionID/context` | Get active context messages (post-compaction) |
| `GET`  | `/api/session/:sessionID/history` | Read one page of durable session events |
| `GET`  | `/api/session/:sessionID/event` | **SSE** — subscribe to durable session events |
| `POST` | `/api/session/:sessionID/interrupt` | Interrupt active execution (no-op if idle) |
| `GET`  | `/api/session/:sessionID/message/:messageID` | Get one projected message |

### Pagination

List and history endpoints use opaque cursor strings. Pass the returned
`cursor.next` or `cursor.previous` value on the next request. The `order`
parameter (`asc` / `desc`) is respected on the first page only; cursors
preserve the original sort.

---

## Message

Paginated message retrieval scoped to a session.

| Method | Path | Description |
|--------|------|-------------|
| `GET`  | `/api/session/:sessionID/message` | List messages (cursor-based) |

---

## Model

Model catalog for the current provider landscape.

| Method | Path | Description |
|--------|------|-------------|
| `GET`  | `/api/model` | List available models (ordered by release date) |

---

## Provider

AI provider registry.

| Method | Path | Description |
|--------|------|-------------|
| `GET`  | `/api/provider` | List active providers |
| `GET`  | `/api/provider/:providerID` | Get one provider |

---

## Integration

Integration discovery and OAuth/key-based connection flows.

| Method | Path | Description |
|--------|------|-------------|
| `GET`  | `/api/integration` | List available integrations |
| `GET`  | `/api/integration/:integrationID` | Get one integration |
| `POST` | `/api/integration/:integrationID/connect/key` | Connect with an API key |
| `POST` | `/api/integration/:integrationID/connect/oauth` | Begin an OAuth attempt |
| `GET`  | `/api/integration/attempt/:attemptID` | Poll OAuth attempt status |
| `POST` | `/api/integration/attempt/:attemptID/complete` | Complete an OAuth attempt (code exchange) |
| `DELETE` | `/api/integration/attempt/:attemptID` | Cancel an OAuth attempt |

---

## Credential

Stored integration credentials.

| Method | Path | Description |
|--------|------|-------------|
| `PATCH` | `/api/credential/:credentialID` | Update a credential label |
| `DELETE` | `/api/credential/:credentialID` | Remove a credential |

---

## Permission

Permission request / approval workflow.

### Global

| Method | Path | Description |
|--------|------|-------------|
| `GET` | `/api/permission/request` | List pending permission requests for a location |
| `GET` | `/api/permission/saved` | List saved (auto-approved) permissions |
| `DELETE` | `/api/permission/saved/:id` | Remove a saved permission |

### Session-scoped

| Method | Path | Description |
|--------|------|-------------|
| `POST` | `/api/session/:sessionID/permission` | Create a permission request |
| `GET` | `/api/session/:sessionID/permission` | List pending requests for a session |
| `GET` | `/api/session/:sessionID/permission/:requestID` | Get one pending request |
| `POST` | `/api/session/:sessionID/permission/:requestID/reply` | Approve or deny a request |

---

## File System

Location-scoped filesystem operations.

| Method | Path | Description |
|--------|------|-------------|
| `GET` | `/api/fs/read/*` | Read a file (binary, relative to location) |
| `GET` | `/api/fs/list` | List directory contents |
| `GET` | `/api/fs/find` | Recursively search for files |

---

## Command

Registered slash commands.

| Method | Path | Description |
|--------|------|-------------|
| `GET` | `/api/command` | List registered commands |

---

## Skill

Registered skills.

| Method | Path | Description |
|--------|------|-------------|
| `GET` | `/api/skill` | List registered skills |

---

## Event

Server-wide event stream.

| Method | Path | Description |
|--------|------|-------------|
| `GET` | `/api/event` | **SSE** — subscribe to server events |

Events include a `server.connected` handshake on connect plus any
application-defined event types from the event manifest.

---

## PTY

Pseudo-terminal sessions. Includes a WebSocket connect path.

| Method | Path | Description |
|--------|------|-------------|
| `GET`    | `/api/pty` | List PTY sessions |
| `POST`   | `/api/pty` | Create a PTY session |
| `GET`    | `/api/pty/:ptyID` | Get one PTY session |
| `PUT`    | `/api/pty/:ptyID` | Update title or viewport size |
| `DELETE` | `/api/pty/:ptyID` | Terminate and remove a PTY session |
| `POST`   | `/api/pty/:ptyID/connect-token` | Create a single-use WebSocket ticket |
| `GET`    | `/api/pty/:ptyID/connect` | **WebSocket** — stream terminal I/O |

The WebSocket connect endpoint requires a valid `ticket` query parameter
obtained from the `connect-token` endpoint.

---

## Question

User-facing question prompts tied to a session.

### Global

| Method | Path | Description |
|--------|------|-------------|
| `GET` | `/api/question/request` | List pending questions for a location |

### Session-scoped

| Method | Path | Description |
|--------|------|-------------|
| `GET`  | `/api/session/:sessionID/question` | List pending questions for a session |
| `POST` | `/api/session/:sessionID/question/:requestID/reply` | Answer a question |
| `POST` | `/api/session/:sessionID/question/:requestID/reject` | Reject (skip) a question |

---

## Reference

Location-scoped project references.

| Method | Path | Description |
|--------|------|-------------|
| `GET` | `/api/reference` | List available references |

---

## Project Copy

Project copy management (experimental).

| Method | Path | Description |
|--------|------|-------------|
| `POST`   | `/experimental/project/:projectID/copy` | Create a project copy |
| `DELETE` | `/experimental/project/:projectID/copy` | Remove a project copy |
| `POST`   | `/experimental/project/:projectID/copy/refresh` | Refresh a project copy |

---

## Error Shapes

All endpoints use structured JSON errors declared via `Schema.ErrorClass`.
Common errors:

- `SessionNotFoundError` — referenced session does not exist
- `MessageNotFoundError` — referenced message does not exist
- `ProviderNotFoundError` — referenced provider does not exist
- `ServiceUnavailableError` — provider catalog not yet available
- `InvalidRequestError` — payload/schema validation failed
- `ConflictError` — state conflict (e.g. duplicate prompt ID)
- `InvalidCursorError` — malformed or expired pagination cursor
- `PtyNotFoundError` — referenced PTY session does not exist
- `ForbiddenError` — missing or invalid PTY ticket
- `PermissionNotFoundError` — referenced permission request does not exist
- `QuestionNotFoundError` — referenced question request does not exist
- `UnknownError` — unexpected internal failure

---

## OpenAPI Metadata

Every endpoint carries OpenAPI annotations (`identifier`, `summary`,
`description`) suitable for code generation. The server exposes its
generated OpenAPI document at the standard `/docs` path when
`openapi.json` metadata is enabled.
