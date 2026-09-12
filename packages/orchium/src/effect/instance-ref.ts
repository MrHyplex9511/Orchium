import { Context } from "effect"
import type { InstanceContext } from "@/project/instance-context"
import type { WorkspaceV2 } from "@orchium/core/workspace"

export const InstanceRef = Context.Reference<InstanceContext | undefined>("~orchium/InstanceRef", {
  defaultValue: () => undefined,
})

export const WorkspaceRef = Context.Reference<WorkspaceV2.ID | undefined>("~orchium/WorkspaceRef", {
  defaultValue: () => undefined,
})
