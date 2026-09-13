export async function GET() {
  const response = await fetch(
    "https://raw.githubusercontent.com/MrHyplex9511/Orchium/refs/heads/dev/packages/sdk/openapi.json",
  )
  const json = await response.json()
  return json
}
