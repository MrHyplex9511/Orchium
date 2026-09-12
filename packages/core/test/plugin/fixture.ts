import { AgentV2 } from "@orchium/core/agent"
import { AISDK } from "@orchium/core/aisdk"
import { Catalog } from "@orchium/core/catalog"
import { CommandV2 } from "@orchium/core/command"
import { Credential } from "@orchium/core/credential"
import { AppNodeBuilder } from "@orchium/core/effect/app-node-builder"
import { LayerNodePlatform } from "@orchium/core/effect/app-node-platform"
import { LayerNode } from "@orchium/core/effect/layer-node"
import { EventV2 } from "@orchium/core/event"
import { FileSystem } from "@orchium/core/filesystem"
import { FSUtil } from "@orchium/core/fs-util"
import { Integration } from "@orchium/core/integration"
import { Location } from "@orchium/core/location"
import { Npm } from "@orchium/core/npm"
import { PluginV2 } from "@orchium/core/plugin"
import { Reference } from "@orchium/core/reference"
import { SkillV2 } from "@orchium/core/skill"
import { Effect, Layer } from "effect"
import { tempLocationLayer } from "../fixture/location"

const npmLayer = Layer.succeed(
  Npm.Service,
  Npm.Service.of({
    add: () => Effect.succeed({ directory: "", entrypoint: undefined }),
    install: () => Effect.void,
    which: () => Effect.succeed(undefined),
  }),
)

export const PluginTestLayer = AppNodeBuilder.build(
  LayerNode.group([
    FileSystem.node,
    FSUtil.node,
    Location.node,
    Npm.node,
    Credential.node,
    EventV2.node,
    LayerNodePlatform.httpClient,
    PluginV2.node,
    AgentV2.node,
    AISDK.node,
    Catalog.node,
    CommandV2.node,
    Integration.node,
    Reference.node,
    SkillV2.node,
  ]),
  [
    [Location.node, tempLocationLayer],
    [Npm.node, npmLayer],
  ],
)
