<div align="center">
  <pre>
▄▀▀▀▄ █▀▀▀▄ ▄▀▀▀  █   █ ▀█▀ █   █ █▄ ▄█
█   █ █▀▀█  █     █▀▀▀█  █  █   █ █ ▀ █
 ▀▀▀  ▀   ▀  ▀▀▀  ▀   ▀ ▀▀▀  ▀▀▀  ▀   ▀
  </pre>
</div>
<p align="center">Den open source AI-kodeagent.</p>
<p align="center">
  <a href="https://discord.gg/SDyAKPEhN8"><img alt="Discord" src="https://img.shields.io/badge/Discord-Orchium-5865F2?style=flat-square&logo=discord" /></a>
  <a href="https://www.npmjs.com/package/orchium"><img alt="npm" src="https://img.shields.io/npm/v/orchium?style=flat-square" /></a>
  <a href="https://github.com/MrHyplex9511/Orchium/actions/workflows/publish.yml"><img alt="Build status" src="https://img.shields.io/github/actions/workflow/status/MrHyplex9511/Orchium/publish.yml?style=flat-square&branch=dev" /></a>
</p>

<p align="center">
  <a href="README.md">English</a> |
  <a href="README.zh.md">简体中文</a> |
  <a href="README.zht.md">繁體中文</a> |
  <a href="README.ko.md">한국어</a> |
  <a href="README.de.md">Deutsch</a> |
  <a href="README.es.md">Español</a> |
  <a href="README.fr.md">Français</a> |
  <a href="README.it.md">Italiano</a> |
  <a href="README.da.md">Dansk</a> |
  <a href="README.ja.md">日本語</a> |
  <a href="README.pl.md">Polski</a> |
  <a href="README.ru.md">Русский</a> |
  <a href="README.bs.md">Bosanski</a> |
  <a href="README.ar.md">العربية</a> |
  <a href="README.no.md">Norsk</a> |
  <a href="README.br.md">Português (Brasil)</a> |
  <a href="README.th.md">ไทย</a> |
  <a href="README.tr.md">Türkçe</a> |
  <a href="README.uk.md">Українська</a> |
  <a href="README.bn.md">বাংলা</a> |
  <a href="README.gr.md">Ελληνικά</a> |
  <a href="README.vi.md">Tiếng Việt</a>
</p>



> [!IMPORTANT]
> **Orchium** er en uafhængig fork af
> [OpenCode](https://github.com/anomalyco/opencode), udgivet under
> [MIT-licensen](./LICENSE). Den oprindelige ophavsret tilhører OpenCode-forfatterne.
> Dette projekt er **ikke tilknyttet eller godkendt af** det oprindelige projekt.

---

### Installation

```bash
# Pakkehåndteringer
npm i -g orchium@latest        # eller bun/pnpm/yarn
scoop install orchium             # Windows
choco install orchium             # Windows
brew install anomalyco/tap/orchium # macOS og Linux (anbefalet, altid up to date)
brew install orchium              # macOS og Linux (officiel brew formula, opdateres sjældnere)
sudo pacman -S orchium            # Arch Linux (Stable)
paru -S orchium-bin               # Arch Linux (Latest from AUR)
mise use -g orchium               # alle OS
nix run nixpkgs#orchium           # eller github:MrHyplex9511/Orchium for nyeste dev-branch
```

> [!TIP]
> Fjern versioner ældre end 0.1.x før installation.

### Desktop-app (BETA)

Orchium findes også som desktop-app. Download direkte fra [releases-siden](https://github.com/MrHyplex9511/Orchium/releases).

| Platform              | Download                           |
| --------------------- | ---------------------------------- |
| macOS (Apple Silicon) | `orchium-desktop-mac-arm64.dmg`   |
| macOS (Intel)         | `orchium-desktop-mac-x64.dmg`     |
| Windows               | `orchium-desktop-windows-x64.exe` |
| Linux                 | `.deb`, `.rpm`, eller AppImage     |

```bash
# macOS (Homebrew)
brew install --cask orchium-desktop
# Windows (Scoop)
scoop bucket add extras; scoop install extras/orchium-desktop
```

#### Installationsmappe

Når det installeres via en pakkehåndtering, administreres binæren af den pågældende pakkehåndtering.
Brugerdefinerede installationsmapper gælder kun for manuelle installationer; se din pakkehåndterings dokumentation.

### Agents

Orchium har to indbyggede agents, som du kan skifte mellem med `Tab`-tasten.

- **build** - Standard, agent med fuld adgang til udviklingsarbejde
- **plan** - Skrivebeskyttet agent til analyse og kodeudforskning
  - Afviser filredigering som standard
  - Spørger om tilladelse før bash-kommandoer
  - Ideel til at udforske ukendte kodebaser eller planlægge ændringer

Derudover findes der en **general**-subagent til komplekse søgninger og flertrinsopgaver.
Den bruges internt og kan kaldes via `@general` i beskeder.

Læs mere om [agents](docs/agents.md).

### Dokumentation

For mere info om konfiguration af Orchium, [**se vores docs**](docs/README.md).

### Provideradgang

Orchium understøtter BYOK (Bring Your Own Key) for alle providere.
OpenCodes gratisniveau (uden nøgle) er begrænset til den officielle OpenCode-klient
og returnerer en fejl, når det bruges fra Orchium. For at bruge gratis modeller kan du enten:
- Angive en rigtig API-nøgle til en OpenCode-konto, eller
- Bruge et gratisniveau fra Gemini, Groq eller en lokal model (Ollama).

### Bidrag

Hvis du vil bidrage til Orchium, så læs vores [contributing docs](./CONTRIBUTING.md) før du sender en pull request.

### Bygget på Orchium

Hvis du arbejder på et projekt der er relateret til Orchium og bruger "orchium" som en del af navnet; f.eks. "orchium-dashboard" eller "orchium-mobile", så tilføj en note i din README, der tydeliggør at projektet ikke er bygget af Orchium-teamet og ikke er tilknyttet os på nogen måde.

---

**Bliv en del af vores community** [Discord](https://discord.gg/SDyAKPEhN8)