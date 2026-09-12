import { run as runTui, type TuiInput } from "@orchium/tui"
import { Global } from "@orchium/core/global"
import { AppNodeBuilder } from "@orchium/core/effect/app-node-builder"
import { Effect } from "effect"

export function run(input: TuiInput) {
  return runTui(input).pipe(Effect.provide(AppNodeBuilder.build(Global.node)))
}
