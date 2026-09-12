declare global {
  const ORCHIUM_VERSION: string
  const ORCHIUM_CHANNEL: string
}

export const InstallationVersion = typeof ORCHIUM_VERSION === "string" ? ORCHIUM_VERSION : "local"
export const InstallationChannel = typeof ORCHIUM_CHANNEL === "string" ? ORCHIUM_CHANNEL : "local"
export const InstallationLocal = InstallationChannel === "local"
