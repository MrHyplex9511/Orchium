import { describe, expect, test } from "bun:test"
import { EventCodec } from "@orchium/core/event/codec"

describe("EventCodec", () => {
  test("encode produces plain JSON that decode restores", () => {
    const data = { text: "hello", n: 42, nested: { list: [1, 2, 3] } }
    const stored = EventCodec.encode(data)
    expect(EventCodec.isCompressed(stored)).toBe(false)
    expect(stored).toBe(JSON.stringify(data))
    expect(EventCodec.decode(stored)).toEqual(data)
  })

  test("compressJson gzips the raw JSON with a gz: prefix and decode restores it", () => {
    const data = { text: "compress me", list: Array.from({ length: 100 }, (_, i) => i) }
    const stored = EventCodec.compressJson(JSON.stringify(data))
    expect(EventCodec.isCompressed(stored)).toBe(true)
    expect(stored.startsWith("gz:")).toBe(true)
    expect(EventCodec.decode(stored)).toEqual(data)
    // Compression must actually shrink repetitive plain text.
    expect(stored.length).toBeLessThan(JSON.stringify(data).length)
  })

  test("decode falls back to plain JSON for non-prefixed payloads", () => {
    expect(EventCodec.decode(JSON.stringify({ a: 1 }))).toEqual({ a: 1 })
  })

  test("decode propagates malformed JSON errors", () => {
    expect(() => EventCodec.decode("not json")).toThrow()
  })

  test("empty object roundtrips", () => {
    const stored = EventCodec.encode({})
    expect(EventCodec.decode(stored)).toEqual({})
  })
})