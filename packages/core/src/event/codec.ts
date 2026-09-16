export * as EventCodec from "./codec"

const PREFIX = "gz:"

export function isCompressed(stored: string): boolean {
  return stored.startsWith(PREFIX)
}

export function encode(data: Record<string, unknown>): string {
  return JSON.stringify(data)
}

export function compressJson(json: string): string {
  return PREFIX + Buffer.from(Bun.gzipSync(json)).toString("base64")
}

export function decode(stored: string): Record<string, unknown> {
  if (isCompressed(stored)) {
    const json = new TextDecoder("utf-8", { fatal: true }).decode(
      Bun.gunzipSync(Uint8Array.from(Buffer.from(stored.slice(PREFIX.length), "base64"))),
    )
    return JSON.parse(json) as Record<string, unknown>
  }
  return JSON.parse(stored) as Record<string, unknown>
}