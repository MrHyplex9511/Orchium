import { Config } from "effect"

export function truthy(key: string) {
  const value = process.env[key]?.toLowerCase()
  return value === "true" || value === "1"
}

const copy = process.env["ORCHIUM_EXPERIMENTAL_DISABLE_COPY_ON_SELECT"]
const fff = process.env["ORCHIUM_DISABLE_FFF"]

function enabledByExperimental(key: string) {
  return process.env[key] === undefined ? truthy("ORCHIUM_EXPERIMENTAL") : truthy(key)
}

export const Flag = {
  OTEL_EXPORTER_OTLP_ENDPOINT: process.env["OTEL_EXPORTER_OTLP_ENDPOINT"],
  OTEL_EXPORTER_OTLP_HEADERS: process.env["OTEL_EXPORTER_OTLP_HEADERS"],

  ORCHIUM_AUTO_HEAP_SNAPSHOT: truthy("ORCHIUM_AUTO_HEAP_SNAPSHOT"),
  ORCHIUM_GIT_BASH_PATH: process.env["ORCHIUM_GIT_BASH_PATH"],
  ORCHIUM_CONFIG: process.env["ORCHIUM_CONFIG"],
  ORCHIUM_CONFIG_CONTENT: process.env["ORCHIUM_CONFIG_CONTENT"],
  ORCHIUM_DISABLE_AUTOUPDATE: truthy("ORCHIUM_DISABLE_AUTOUPDATE"),
  ORCHIUM_ALWAYS_NOTIFY_UPDATE: truthy("ORCHIUM_ALWAYS_NOTIFY_UPDATE"),
  ORCHIUM_DISABLE_PRUNE: truthy("ORCHIUM_DISABLE_PRUNE"),
  ORCHIUM_DISABLE_TERMINAL_TITLE: truthy("ORCHIUM_DISABLE_TERMINAL_TITLE"),
  ORCHIUM_SHOW_TTFD: truthy("ORCHIUM_SHOW_TTFD"),
  ORCHIUM_DISABLE_AUTOCOMPACT: truthy("ORCHIUM_DISABLE_AUTOCOMPACT"),
  ORCHIUM_DISABLE_MODELS_FETCH: truthy("ORCHIUM_DISABLE_MODELS_FETCH"),
  ORCHIUM_DISABLE_MOUSE: truthy("ORCHIUM_DISABLE_MOUSE"),
  ORCHIUM_FAKE_VCS: process.env["ORCHIUM_FAKE_VCS"],
  ORCHIUM_SERVER_PASSWORD: process.env["ORCHIUM_SERVER_PASSWORD"],
  ORCHIUM_SERVER_USERNAME: process.env["ORCHIUM_SERVER_USERNAME"],
  ORCHIUM_DISABLE_FFF: fff === undefined ? process.platform === "win32" : truthy("ORCHIUM_DISABLE_FFF"),

  // Experimental
  ORCHIUM_EXPERIMENTAL_FILEWATCHER: Config.boolean("ORCHIUM_EXPERIMENTAL_FILEWATCHER").pipe(
    Config.withDefault(false),
  ),
  ORCHIUM_EXPERIMENTAL_DISABLE_FILEWATCHER: Config.boolean("ORCHIUM_EXPERIMENTAL_DISABLE_FILEWATCHER").pipe(
    Config.withDefault(false),
  ),
  ORCHIUM_EXPERIMENTAL_DISABLE_COPY_ON_SELECT:
    copy === undefined ? process.platform === "win32" : truthy("ORCHIUM_EXPERIMENTAL_DISABLE_COPY_ON_SELECT"),
  ORCHIUM_MODELS_URL: process.env["ORCHIUM_MODELS_URL"],
  ORCHIUM_MODELS_PATH: process.env["ORCHIUM_MODELS_PATH"],
  ORCHIUM_DB: process.env["ORCHIUM_DB"],

  ORCHIUM_WORKSPACE_ID: process.env["ORCHIUM_WORKSPACE_ID"],
  ORCHIUM_EXPERIMENTAL_WORKSPACES: enabledByExperimental("ORCHIUM_EXPERIMENTAL_WORKSPACES"),

  // Evaluated at access time (not module load) because tests, the CLI, and
  // external tooling set these env vars at runtime.
  get ORCHIUM_DISABLE_PROJECT_CONFIG() {
    return truthy("ORCHIUM_DISABLE_PROJECT_CONFIG")
  },
  get ORCHIUM_EXPERIMENTAL_REFERENCES() {
    return enabledByExperimental("ORCHIUM_EXPERIMENTAL_REFERENCES")
  },
  get ORCHIUM_TUI_CONFIG() {
    return process.env["ORCHIUM_TUI_CONFIG"]
  },
  get ORCHIUM_CONFIG_DIR() {
    return process.env["ORCHIUM_CONFIG_DIR"]
  },
  get ORCHIUM_PURE() {
    return truthy("ORCHIUM_PURE")
  },
  get ORCHIUM_PERMISSION() {
    return process.env["ORCHIUM_PERMISSION"]
  },
  get ORCHIUM_PLUGIN_META_FILE() {
    return process.env["ORCHIUM_PLUGIN_META_FILE"]
  },
  get ORCHIUM_CLIENT() {
    return process.env["ORCHIUM_CLIENT"] ?? "cli"
  },
}
