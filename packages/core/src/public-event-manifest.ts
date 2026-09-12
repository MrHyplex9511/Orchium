export * as PublicEventManifest from "./public-event-manifest"

import { Event } from "@orchium/schema/event"
import { EventManifest } from "@orchium/schema/event-manifest"

export const Definitions = EventManifest.ServerDefinitions
export const Latest = Event.latest(Definitions)
