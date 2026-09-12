import { $ } from "bun"
import { downloadCliToResources } from "./utils"

await $`bun run install-electron`

await $`bun ./scripts/copy-icons.ts ${process.env.ORCHIUM_CHANNEL ?? "dev"}`

await $`cd ../orchium && bun script/build-node.ts`
await downloadCliToResources()
