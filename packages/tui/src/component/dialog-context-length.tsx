import { createMemo } from "solid-js"
import { DialogModel } from "./dialog-model"
import { useSync } from "../context/sync"
import { DialogSelect } from "../ui/dialog-select"
import { useDialog } from "../ui/dialog"
import { useSDK } from "../context/sdk"
import { useToast } from "../ui/toast"

const presets = [
  { title: "Default", value: undefined as number | undefined },
  { title: "200k", value: 200_000 },
  { title: "256k", value: 256_000 },
  { title: "512k", value: 512_000 },
  { title: "1M", value: 1_000_000 },
]

export function DialogContextLength(props: { providerID: string; modelID: string }) {
  const sdk = useSDK()
  const sync = useSync()
  const dialog = useDialog()
  const toast = useToast()

  const reported = createMemo(() => {
    const provider = sync.data.provider.find((provider) => provider.id === props.providerID)
    const limit = provider?.models[props.modelID]?.limit
    return limit?.context && limit.context > 0 ? limit.context : undefined
  })

  const configured = createMemo(() => {
    const provider = sync.data.config.provider?.[props.providerID]
    const limit = provider?.models?.[props.modelID]?.limit
    return limit?.context && limit.context > 0 ? limit.context : undefined
  })

  const current = createMemo(() => configured() ?? reported())

  function write(context: number) {
    const provider = sync.data.provider.find((provider) => provider.id === props.providerID)
    const configuredLimit = sync.data.config.provider?.[props.providerID]?.models?.[props.modelID]?.limit
    const model = provider?.models[props.modelID]
    return sdk.client.config.update({
      config: {
        provider: {
          [props.providerID]: {
            models: {
              [props.modelID]: {
                limit: {
                  context,
                  output: configuredLimit?.output ?? model?.limit?.output ?? 0,
                  input: configuredLimit?.input,
                },
              },
            },
          },
        },
      },
    })
  }

  const options = createMemo(() =>
    presets.map((preset) => ({
      value: preset.value,
      title: preset.title,
      onSelect: () => {
        dialog.clear()
        void (async () => {
          try {
            await write(preset.value ?? reported() ?? 0)
            await sync.bootstrap()
            dialog.replace(() => <DialogModel providerID={props.providerID} />)
          } catch (error) {
            dialog.clear()
            toast.show({ message: String(error), variant: "error" })
          }
        })()
      },
    })),
  )

  return (
    <DialogSelect<number | undefined>
      options={options()}
      title={`Context length — ${props.modelID}`}
      current={current()}
      flat={true}
    />
  )
}
