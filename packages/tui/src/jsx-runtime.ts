import { createComponent, createElement, spread } from "@opentui/solid"

// Local JSX runtime for the TUI. bun's automatic JSX transform passes children
// as eager values, so nested components compile to innermost-first calls: a
// leaf like <App /> would run before the surrounding providers establish
// context, and any useTuiX() at the top of a component body would throw
// "<X>Provider is missing". Wrapping function components in a deferred call
// keeps evaluation top-down: each provider mounts and sets its context before
// its children are evaluated.

import type { JSX as SolidJSX } from "solid-js"
import type { JSX as OpentuiJSX } from "@opentui/solid/jsx-runtime"

export namespace JSX {
  export type Element = OpentuiJSX.Element
  export type ElementChildrenAttribute = OpentuiJSX.ElementChildrenAttribute
  export type IntrinsicElements = OpentuiJSX.IntrinsicElements
}

export type JsxComponent = (props: Record<string, unknown>) => unknown

function normalizeProps(props: Record<string, unknown> | null | undefined) {
  if (!props) return {}
  if (!("key" in props)) return props
  const { key: _key, ...rest } = props
  return rest
}

function createIntrinsicElement(type: string, props: Record<string, unknown>) {
  const element = createElement(type)
  spread(element, props)
  return element
}

export function jsx(type: string | JsxComponent, props?: Record<string, unknown> | null): JSX.Element {
  const normalizedProps = normalizeProps(props)
  if (typeof type === "function") {
    const component = type as unknown as Parameters<typeof createComponent>[0]
    return (() => createComponent(component, normalizedProps)) as unknown as JSX.Element
  }
  return createIntrinsicElement(type, normalizedProps) as unknown as JSX.Element
}

export const jsxs = jsx

export function jsxDEV(type: string | JsxComponent, props?: Record<string, unknown> | null): SolidJSX.Element {
  return jsx(type, props)
}

export function Fragment(props: { children?: unknown }) {
  return props.children ?? null
}