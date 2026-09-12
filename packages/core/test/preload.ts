import path from "path"

process.env.ORCHIUM_DB = ":memory:"
process.env.NPM_CONFIG_AUDIT = "false"
process.env.ORCHIUM_MODELS_PATH = path.join(import.meta.dir, "plugin", "fixtures", "models-dev.json")
process.env.ORCHIUM_DISABLE_MODELS_FETCH = "true"
