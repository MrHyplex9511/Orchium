<div align="center">
  <pre>
▄▀▀▀▄ █▀▀▀▄ ▄▀▀▀  █   █ ▀█▀ █   █ █▄ ▄█
█   █ █▀▀█  █     █▀▀▀█  █  █   █ █ ▀ █
 ▀▀▀  ▀   ▀  ▀▀▀  ▀   ▀ ▀▀▀  ▀▀▀  ▀   ▀
  </pre>
</div>
<p align="center">AI-kodeagent med åpen kildekode.</p>
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
> **Orchium** er en uavhengig fork av
> [OpenCode](https://github.com/anomalyco/opencode), lisensiert under
> [MIT-lisensen](./LICENSE). Opphavsretten tilhører OpenCode-forfatterne.
> Dette prosjektet er **ikke tilknyttet eller godkjent av** det opprinnelige prosjektet.

---

### Installasjon

```bash
# Pakkehåndterere
npm i -g orchium@latest        # eller bun/pnpm/yarn
scoop install orchium             # Windows
choco install orchium             # Windows
brew install anomalyco/tap/orchium # macOS og Linux (anbefalt, alltid oppdatert)
brew install orchium              # macOS og Linux (offisiell brew-formel, oppdateres sjeldnere)
sudo pacman -S orchium            # Arch Linux (Stable)
paru -S orchium-bin               # Arch Linux (Latest from AUR)
mise use -g orchium               # alle OS
nix run nixpkgs#orchium           # eller github:MrHyplex9511/Orchium for nyeste dev-branch
```

> [!TIP]
> Fjern versjoner eldre enn 0.1.x før du installerer.

### Desktop-app (BETA)

Orchium er også tilgjengelig som en desktop-app. Last ned direkte fra [releases-siden](https://github.com/MrHyplex9511/Orchium/releases).

| Plattform             | Nedlasting                         |
| --------------------- | ---------------------------------- |
| macOS (Apple Silicon) | `orchium-desktop-mac-arm64.dmg`   |
| macOS (Intel)         | `orchium-desktop-mac-x64.dmg`     |
| Windows               | `orchium-desktop-windows-x64.exe` |
| Linux                 | `.deb`, `.rpm` eller AppImage      |

```bash
# macOS (Homebrew)
brew install --cask orchium-desktop
# Windows (Scoop)
scoop bucket add extras; scoop install extras/orchium-desktop
```

#### Installasjonsmappe

Når det installeres via en pakkehåndterer, administreres binæren av den pakkehåndtereren.
Egendefinerte installasjonsmapper gjelder for manuelle installasjoner; se dokumentasjonen for din pakkehåndterer.

### Agents

Orchium har to innebygde agents du kan bytte mellom med `Tab`-tasten.

- **build** - Standard, agent med full tilgang for utviklingsarbeid
- **plan** - Skrivebeskyttet agent for analyse og kodeutforsking
  - Nekter filendringer som standard
  - Spør om tillatelse før bash-kommandoer
  - Ideell for å utforske ukjente kodebaser eller planlegge endringer

Det finnes også en **general**-subagent for komplekse søk og flertrinnsoppgaver.
Den brukes internt og kan kalles via `@general` i meldinger.

Les mer om [agents](docs/agents.md).

### Dokumentasjon

For mer info om hvordan du konfigurerer Orchium, [**se dokumentasjonen**](docs/README.md).

### Leverandørtilgang

Orchium støtter BYOK (Bring Your Own Key) for alle leverandører.
OpenCodes gratisnivå (uten nøkkel) er begrenset til den offisielle OpenCode-klienten
og vil returnere en feil når den brukes fra Orchium. For å bruke gratis modeller kan du enten:
- Oppgi en ekte API-nøkkel for en OpenCode-konto, eller
- Bruke et gratisnivå fra Gemini, Groq eller en lokal modell (Ollama).

### Bidra

Hvis du vil bidra til Orchium, les [contributing docs](./CONTRIBUTING.md) før du sender en pull request.

### Bygge på Orchium

Hvis du jobber med et prosjekt som er relatert til Orchium og bruker "orchium" som en del av navnet; for eksempel "orchium-dashboard" eller "orchium-mobile", legg inn en merknad i README som presiserer at det ikke er bygget av Orchium-teamet og ikke er tilknyttet oss på noen måte.

---

**Bli med i fellesskapet** [Discord](https://discord.gg/SDyAKPEhN8)