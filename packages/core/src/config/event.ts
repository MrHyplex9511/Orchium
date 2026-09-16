export * as ConfigEvent from "./event"

import { Schema } from "effect"
import { NonNegativeInt } from "../schema"

export class Info extends Schema.Class<Info>("ConfigV2.Event")({
  compress_after_days: NonNegativeInt.pipe(Schema.optional),
  retention_days: NonNegativeInt.pipe(Schema.optional),
}) {}