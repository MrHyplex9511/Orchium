const stage = process.env.SST_STAGE || "dev"

export default {
  url: "https://github.com/MrHyplex9511/Orchium",
  console: stage === "production" ? "https://opencode.ai/auth" : `https://${stage}.opencode.ai/auth`,
  email: "help@anoma.ly",
  socialCard: "https://social-cards.sst.dev",
  github: "https://github.com/MrHyplex9511/Orchium",
  discord: "https://discord.gg/SDyAKPEhN8",
  headerLinks: [
    { name: "app.header.home", url: "/" },
    { name: "app.header.docs", url: "/docs/" },
  ],
}
