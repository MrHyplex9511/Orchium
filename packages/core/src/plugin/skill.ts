/// <reference path="../markdown.d.ts" />

export * as SkillPlugin from "./skill"

import { define } from "./internal"
import { Effect } from "effect"
import { AbsolutePath } from "../schema"
import { SkillV2 } from "../skill"
import customizeOrchiumContent from "./skill/customize-orchium.md" with { type: "text" }

export const CustomizeOrchiumContent = customizeOrchiumContent

export const Plugin = define({
  id: "skill",
  effect: Effect.fn(function* (ctx) {
    yield* ctx.skill.transform((draft) => {
      draft.source(
        SkillV2.EmbeddedSource.make({
          type: "embedded",
          skill: SkillV2.Info.make({
            name: "customize-orchium",
            description:
              "Use ONLY when the user is editing or creating orchium's own configuration: orchium.json, orchium.jsonc, files under .orchium/, or files under ~/.config/orchium/. Also use when creating or fixing orchium agents, subagents, commands, skills, plugins, MCP servers, or permission rules. Do not use for the user's own application code, or for any project that is not configuring orchium itself.",
            location: AbsolutePath.make("/builtin/customize-orchium.md"),
            content: CustomizeOrchiumContent,
          }),
        }),
      )
    })
  }),
})
