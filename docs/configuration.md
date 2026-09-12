# Configuration

Orchium is configured with a JSON (or JSONC) file named `orchium.json`.

## Config file locations

| Location        | Path                                             |
| --------------- | ------------------------------------------------ |
| Project config  | `./orchium.json`, `./orchium.jsonc`, or `.orchium/orchium.json` (walks up from the cwd to the worktree root) |
| Global config   | `~/.config/orchium/orchium.json` or `~/.config/orchium/orchium.jsonc` |

Set `ORCHIUM_DISABLE_PROJECT_CONFIG=1` to skip the project's local
`orchium.json`.

## Config sections

The schema defines these top-level modules:

| Module          | Purpose                                           |
| --------------- | ------------------------------------------------- |
| `agent`         | Agent definitions (see [Agents](./agents.md))     |
| `attachments`   | Attachment handling                               |
| `command`       | Custom commands                                   |
| `compaction`    | Context compaction behavior                       |
| `experimental`  | Experimental features                             |
| `formatter`     | Formatting options                                |
| `lsp`           | Language server configuration                     |
| `markdown`      | Markdown rendering options                        |
| `mcp`           | MCP server configuration                          |
| `plugin`        | Plugin loading                                    |
| `provider`      | Provider configuration (models, requests)         |
| `reference`     | File/reference handling                           |
| `tool-output`   | Tool output behavior                              |
| `watcher`       | File watcher configuration                        |

Unknown top-level keys in `orchium.json` are rejected with
`ConfigInvalidError` — the schema is strict.

Source of truth: `packages/schema/src/config/` (each module's schema
class defines its accepted fields).

## Providers

Orchium supports BYOK (Bring Your Own Key) for all providers.
The OpenCode free tier (keyless) is restricted to the official OpenCode
client and will return an error when used from Orchium. To use free
models, provide a real OpenCode account API key, or configure your own
provider credentials in the `provider` section.

## Related

- **[Agents](./agents.md)** — built-in and custom agents
- **[README](../README.md)** — install and quickstart