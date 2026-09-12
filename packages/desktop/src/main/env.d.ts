interface ImportMetaEnv {
  readonly ORCHIUM_CHANNEL: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

declare module "virtual:orchium-server" {
  export namespace Server {
    export const listen: typeof import("../../../orchium/dist/types/src/node").Server.listen
    export type Listener = import("../../../orchium/dist/types/src/node").Server.Listener
  }
  export namespace Config {
    export const get: typeof import("../../../orchium/dist/types/src/node").Config.get
    export type Info = import("../../../orchium/dist/types/src/node").Config.Info
  }
  export const bootstrap: typeof import("../../../orchium/dist/types/src/node").bootstrap
}
