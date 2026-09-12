// @ts-nocheck

import { Orchium } from "@orchium/core"
import { ReadTool } from "@orchium/core/tools"

const orchium = Orchium.make({})

orchium.tool.add(ReadTool)

orchium.tool.add({
  name: "bash",
  schema: {
    type: "object",
    properties: {
      command: {
        type: "string",
        description: "The command to run.",
      },
    },
    required: ["command"],
  },
  execute(input, ctx) {},
})

orchium.auth.add({
  provider: "openai",
  type: "api",
  value: process.env.OPENAI_API_KEY,
})

orchium.agent.add({
  name: "build",
  permissions: [],
  model: {
    id: "gpt-5-5",
    provider: "openai",
    variant: "xhigh",
  },
})

const sessionID = await orchium.session.create({
  agent: "build",
})

orchium.subscribe((event) => {
  console.log(event)
})

await orchium.session.prompt({
  sessionID,
  text: "hey what is up",
})

await orchium.session.prompt({
  sessionID,
  text: "what is up with this",
  files: [
    {
      mime: "image/png",
      uri: "data:image/png;base64,xxxx",
    },
  ],
})

await orchium.session.wait()

console.log(await orchium.session.messages(sessionID))
