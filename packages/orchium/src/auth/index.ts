import { LayerNode } from "@orchium/core/effect/layer-node"
import path from "path"
import { Effect, Layer, Record, Result, Schema, Context } from "effect"
import { NonNegativeInt } from "@orchium/core/schema"
import { Global } from "@orchium/core/global"
import { FSUtil } from "@orchium/core/fs-util"
import { EffectFlock } from "@orchium/core/util/effect-flock"

export const OAUTH_DUMMY_KEY = "orchium-oauth-dummy-key"

const file = path.join(Global.Path.data, "auth.json")

// Shared across every running instance on the machine (TUI, server, CLIs). The
// read-modify-write in set/remove must be serialized across processes or a
// concurrent login can clobber another instance's credential entry.
const lockKey = `auth:${file}`

const fail = (message: string) => (cause: unknown) => new AuthError({ message, cause })

export class Oauth extends Schema.Class<Oauth>("OAuth")({
  type: Schema.Literal("oauth"),
  refresh: Schema.String,
  access: Schema.String,
  expires: NonNegativeInt,
  accountId: Schema.optional(Schema.String),
  enterpriseUrl: Schema.optional(Schema.String),
}) {}

export class Api extends Schema.Class<Api>("ApiAuth")({
  type: Schema.Literal("api"),
  key: Schema.String,
  metadata: Schema.optional(Schema.Record(Schema.String, Schema.String)),
}) {}

export class WellKnown extends Schema.Class<WellKnown>("WellKnownAuth")({
  type: Schema.Literal("wellknown"),
  key: Schema.String,
  token: Schema.String,
}) {}

export const Info = Schema.Union([Oauth, Api, WellKnown]).annotate({ discriminator: "type", identifier: "Auth" })
export type Info = Schema.Schema.Type<typeof Info>

export class AuthError extends Schema.TaggedErrorClass<AuthError>()("AuthError", {
  message: Schema.String,
  cause: Schema.optional(Schema.Defect()),
}) {}

export interface Interface {
  readonly get: (providerID: string) => Effect.Effect<Info | undefined, AuthError>
  readonly all: () => Effect.Effect<Record<string, Info>, AuthError>
  readonly set: (key: string, info: Info) => Effect.Effect<void, AuthError>
  readonly remove: (key: string) => Effect.Effect<void, AuthError>
}

export class Service extends Context.Service<Service, Interface>()("@orchium/Auth") {}

const layer = Layer.effect(
  Service,
  Effect.gen(function* () {
    const fsys = yield* FSUtil.Service
    const flock = yield* EffectFlock.Service
    const decode = Schema.decodeUnknownOption(Info)

    const all = Effect.fn("Auth.all")(function* () {
      if (process.env.ORCHIUM_AUTH_CONTENT) {
        try {
          return JSON.parse(process.env.ORCHIUM_AUTH_CONTENT)
        } catch (err) {}
      }

      const data = (yield* fsys.readJson(file).pipe(Effect.orElseSucceed(() => ({})))) as Record<string, unknown>
      return Record.filterMap(data, (value) => Result.fromOption(decode(value), () => undefined))
    })

    const get = Effect.fn("Auth.get")(function* (providerID: string) {
      return (yield* all())[providerID]
    })

    const mutate = Effect.fn("Auth.mutate")(function* (
      update: (data: Record<string, unknown>) => Record<string, unknown> | undefined,
    ) {
      yield* Effect.gen(function* () {
        const next = update(yield* all())
        if (!next) return
        yield* fsys.writeJson(file, next, 0o600).pipe(Effect.mapError(fail("Failed to write auth data")))
      }).pipe(
        flock.withLock(lockKey),
        // Lock failures are defects: retrying the login is the caller's concern,
        // and callers already orDie these flows.
        Effect.catchTag("LockTimeoutError", (e) => Effect.die(e)),
        Effect.catchTag("LockCompromisedError", (e) => Effect.die(e)),
      )
    })

    const set = Effect.fn("Auth.set")(function* (key: string, info: Info) {
      yield* mutate((data) => {
        const norm = key.replace(/\/+$/, "")
        const next = { ...data }
        if (norm !== key) delete next[key]
        delete next[norm + "/"]
        next[norm] = info
        return next
      })
    })

    const remove = Effect.fn("Auth.remove")(function* (key: string) {
      yield* mutate((data) => {
        const norm = key.replace(/\/+$/, "")
        const next = { ...data }
        delete next[key]
        delete next[norm]
        return next
      })
    })

    return Service.of({ get, all, set, remove })
  }),
)

export const node = LayerNode.make({ service: Service, layer: layer, deps: [FSUtil.node, EffectFlock.node] })

export * as Auth from "."
