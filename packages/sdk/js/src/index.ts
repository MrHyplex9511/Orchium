export * from "./client.js"
export * from "./server.js"

import { createOrchiumClient } from "./client.js"
import { createOrchiumServer } from "./server.js"
import type { ServerOptions } from "./server.js"

export async function createOrchium(options?: ServerOptions) {
  const server = await createOrchiumServer({
    ...options,
  })

  const client = createOrchiumClient({
    baseUrl: server.url,
  })

  return {
    client,
    server,
  }
}
