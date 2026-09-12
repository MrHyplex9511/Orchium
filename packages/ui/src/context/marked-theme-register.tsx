import { registerCustomTheme } from "@pierre/diffs"
import { OrchiumTheme } from "./marked-theme"

let registered = false

export function registerOrchiumTheme() {
  if (registered) return
  registered = true
  registerCustomTheme("Orchium", () => Promise.resolve(OrchiumTheme))
}
