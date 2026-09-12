import { Config, ConfigProvider, Context, Effect, Layer, Option } from "effect"
import { ConfigService } from "@/effect/config-service"

const bool = (name: string) => Config.boolean(name).pipe(Config.withDefault(false))
const positiveInteger = (name: string) =>
  Config.number(name).pipe(
    Config.map((value) => (Number.isInteger(value) && value > 0 ? value : undefined)),
    Config.orElse(() => Config.succeed(undefined)),
  )
const experimental = bool("ORCHIUM_EXPERIMENTAL")
const enabledByExperimental = (name: string) =>
  Config.all({ experimental, enabled: Config.boolean(name).pipe(Config.option) }).pipe(
    Config.map((flags) => Option.getOrElse(flags.enabled, () => flags.experimental)),
  )

export class Service extends ConfigService.Service<Service>()("@orchium/RuntimeFlags", {
  autoShare: bool("ORCHIUM_AUTO_SHARE"),
  pure: bool("ORCHIUM_PURE"),
  disableDefaultPlugins: bool("ORCHIUM_DISABLE_DEFAULT_PLUGINS"),
  disableEmbeddedWebUi: bool("ORCHIUM_DISABLE_EMBEDDED_WEB_UI"),
  disableExternalSkills: bool("ORCHIUM_DISABLE_EXTERNAL_SKILLS"),
  disableLspDownload: bool("ORCHIUM_DISABLE_LSP_DOWNLOAD"),
  disableClaudeCodePrompt: Config.all({
    broad: bool("ORCHIUM_DISABLE_CLAUDE_CODE"),
    direct: bool("ORCHIUM_DISABLE_CLAUDE_CODE_PROMPT"),
  }).pipe(Config.map((flags) => flags.broad || flags.direct)),
  disableClaudeCodeSkills: Config.all({
    broad: bool("ORCHIUM_DISABLE_CLAUDE_CODE"),
    direct: bool("ORCHIUM_DISABLE_CLAUDE_CODE_SKILLS"),
  }).pipe(Config.map((flags) => flags.broad || flags.direct)),
  enableExa: Config.all({
    experimental,
    enabled: bool("ORCHIUM_ENABLE_EXA"),
    legacy: bool("ORCHIUM_EXPERIMENTAL_EXA"),
  }).pipe(Config.map((flags) => flags.experimental || flags.enabled || flags.legacy)),
  enableParallel: Config.all({
    enabled: bool("ORCHIUM_ENABLE_PARALLEL"),
    legacy: bool("ORCHIUM_EXPERIMENTAL_PARALLEL"),
  }).pipe(Config.map((flags) => flags.enabled || flags.legacy)),
  enableExperimentalModels: bool("ORCHIUM_ENABLE_EXPERIMENTAL_MODELS"),
  enableQuestionTool: bool("ORCHIUM_ENABLE_QUESTION_TOOL"),
  experimentalReferences: enabledByExperimental("ORCHIUM_EXPERIMENTAL_REFERENCES"),
  experimentalBackgroundSubagents: enabledByExperimental("ORCHIUM_EXPERIMENTAL_BACKGROUND_SUBAGENTS"),
  experimentalLspTy: bool("ORCHIUM_EXPERIMENTAL_LSP_TY"),
  experimentalLspTool: enabledByExperimental("ORCHIUM_EXPERIMENTAL_LSP_TOOL"),
  experimentalOxfmt: enabledByExperimental("ORCHIUM_EXPERIMENTAL_OXFMT"),
  experimentalPlanMode: enabledByExperimental("ORCHIUM_EXPERIMENTAL_PLAN_MODE"),
  experimentalCodeMode: enabledByExperimental("ORCHIUM_EXPERIMENTAL_CODE_MODE"),
  experimentalEventSystem: enabledByExperimental("ORCHIUM_EXPERIMENTAL_EVENT_SYSTEM"),
  experimentalWorkspaces: enabledByExperimental("ORCHIUM_EXPERIMENTAL_WORKSPACES"),
  experimentalIconDiscovery: enabledByExperimental("ORCHIUM_EXPERIMENTAL_ICON_DISCOVERY"),
  outputTokenMax: positiveInteger("ORCHIUM_EXPERIMENTAL_OUTPUT_TOKEN_MAX"),
  bashDefaultTimeoutMs: positiveInteger("ORCHIUM_EXPERIMENTAL_BASH_DEFAULT_TIMEOUT_MS"),
  experimentalNativeLlm: bool("ORCHIUM_EXPERIMENTAL_NATIVE_LLM"),
  experimentalWebSockets: bool("ORCHIUM_EXPERIMENTAL_WEBSOCKETS"),
  client: Config.string("ORCHIUM_CLIENT").pipe(Config.withDefault("cli")),
}) {}

export type Info = Context.Service.Shape<typeof Service>

const emptyConfigLayer = Service.layer.pipe(
  Layer.provide(ConfigProvider.layer(ConfigProvider.fromUnknown({}))),
  Layer.orDie,
)

export const layer = (overrides: Partial<Info> = {}) =>
  Layer.effect(
    Service,
    Effect.gen(function* () {
      const flags = yield* Service
      return Service.of({ ...flags, ...overrides })
    }),
  ).pipe(Layer.provide(emptyConfigLayer))

export const node = LayerNode.make({ service: Service, layer: Service.layer.pipe(Layer.orDie), deps: [] })

export * as RuntimeFlags from "./runtime-flags"
import { LayerNode } from "@orchium/core/effect/layer-node"
