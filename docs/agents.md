# Agents

Orchium ships with two built-in agents you can switch between with the
`Tab` key, plus a general subagent used internally for complex searches
and multistep tasks.

## Built-in agents

- **build** — the default agent. Full-access agent for development work.
- **plan** — read-only agent for analysis and code exploration.
  - Denies file edits by default
  - Asks permission before running bash commands
  - Ideal for exploring unfamiliar codebases or planning changes
- **general** — subagent for complex searches and multistep tasks. Used
  internally and can be invoked with `@general` in messages.

## Custom agents

Agents are configured in `orchium.json` under the `agent` key. Each
agent accepts these settings:

| Key           | Type     | Description                                        |
| ------------- | -------- | -------------------------------------------------- |
| `model`       | string   | Model to use, overrides default                    |
| `variant`     | string   | Model variant                                      |
| `request`     | object   | Provider request options                           |
| `system`      | string   | Custom system prompt                               |
| `description` | string   | Shown to the user when selecting the agent         |
| `mode`        | string   | `subagent`, `primary`, or `all`                    |
| `hidden`      | boolean  | Hide the agent from selection                      |
| `color`       | string   | `#rrggbb` or `primary`/`secondary`/`accent`/etc.   |
| `steps`       | number   | Max agent steps (positive integer)                 |
| `disabled`    | boolean  | Disable the agent                                  |
| `permissions` | object   | Permission ruleset for this agent                  |

Example:

```json
{
  "agent": {
    "reviewer": {
      "description": "Read-only code reviewer",
      "mode": "subagent",
      "permissions": {
        "edit": false,
        "bash": {
          "ask": true
        }
      }
    }
  }
}
```

> [!NOTE]
> The `permissions` shape above is illustrative. See the agent config
> schema (`packages/schema/src/config/agent.ts`) and the permission
> ruleset (`packages/schema/src/permission.ts`) for the authoritative
> field definitions.