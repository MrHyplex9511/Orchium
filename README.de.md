<div align="center">
  <pre>
▄▀▀▀▄ █▀▀▀▄ ▄▀▀▀  █   █ ▀█▀ █   █ █▄ ▄█
█   █ █▀▀█  █     █▀▀▀█  █  █   █ █ ▀ █
 ▀▀▀  ▀   ▀  ▀▀▀  ▀   ▀ ▀▀▀  ▀▀▀  ▀   ▀
  </pre>
</div>
<p align="center">Der Open-Source KI-Coding-Agent.</p>
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
> **Orchium** ist ein unabhängiger Fork von
> [OpenCode](https://github.com/anomalyco/opencode), lizenziert unter der
> [MIT-Lizenz](./LICENSE). Das ursprüngliche Urheberrecht gehört den OpenCode-Autoren.
> Dieses Projekt ist **nicht mit dem ursprünglichen Projekt verbunden oder von ihm unterstützt**.

---

### Installation

```bash
# Paketmanager
npm i -g orchium@latest        # oder bun/pnpm/yarn
scoop install orchium             # Windows
choco install orchium             # Windows
brew install anomalyco/tap/orchium # macOS und Linux (empfohlen, immer aktuell)
brew install orchium              # macOS und Linux (offizielle Brew-Formula, seltener aktualisiert)
sudo pacman -S orchium            # Arch Linux (Stable)
paru -S orchium-bin               # Arch Linux (Latest from AUR)
mise use -g orchium               # jedes Betriebssystem
nix run nixpkgs#orchium           # oder github:MrHyplex9511/Orchium für den neuesten dev-Branch
```

> [!TIP]
> Entferne Versionen älter als 0.1.x vor der Installation.

### Desktop-App (BETA)

Orchium ist auch als Desktop-Anwendung verfügbar. Lade sie direkt von der [Releases-Seite](https://github.com/MrHyplex9511/Orchium/releases) herunter.

| Plattform             | Download                           |
| --------------------- | ---------------------------------- |
| macOS (Apple Silicon) | `orchium-desktop-mac-arm64.dmg`   |
| macOS (Intel)         | `orchium-desktop-mac-x64.dmg`     |
| Windows               | `orchium-desktop-windows-x64.exe` |
| Linux                 | `.deb`, `.rpm` oder AppImage       |

```bash
# macOS (Homebrew)
brew install --cask orchium-desktop
# Windows (Scoop)
scoop bucket add extras; scoop install extras/orchium-desktop
```

#### Installationsverzeichnis

Wenn die Installation über einen Paketmanager erfolgt, wird die Binärdatei von diesem Paketmanager verwaltet.
Benutzerdefinierte Installationsverzeichnisse gelten für manuelle Installationen; siehe die Dokumentation deines Paketmanagers.

### Agents

Orchium enthält zwei eingebaute Agents, zwischen denen du mit der `Tab`-Taste wechseln kannst.

- **build** - Standard-Agent mit vollem Zugriff für Entwicklungsarbeit
- **plan** - Nur-Lese-Agent für Analyse und Code-Exploration
  - Verweigert Datei-Edits standardmäßig
  - Fragt vor dem Ausführen von bash-Befehlen nach
  - Ideal zum Erkunden unbekannter Codebases oder zum Planen von Änderungen

Außerdem ist ein **general**-Subagent für komplexe Suchen und mehrstufige Aufgaben enthalten.
Dieser wird intern genutzt und kann in Nachrichten mit `@general` aufgerufen werden.

Mehr dazu unter [Agents](docs/agents.md).

### Dokumentation

Mehr Infos zur Konfiguration von Orchium findest du in unseren [**Docs**](docs/README.md).

### Provider-Zugriff

Orchium unterstützt BYOK (Bring Your Own Key) für alle Provider.
Der kostenlose OpenCode-Tarif (ohne Schlüssel) ist auf den offiziellen OpenCode-Client beschränkt
und gibt einen Fehler zurück, wenn er von Orchium aus verwendet wird. Um kostenlose Modelle zu nutzen, entweder:
- Stelle einen echten OpenCode-Konto-API-Schlüssel bereit, oder
- Nutze ein kostenloses Angebot von Gemini, Groq oder einem lokalen Modell (Ollama).

### Beitragen

Wenn du zu Orchium beitragen möchtest, lies bitte unsere [Contributing Docs](./CONTRIBUTING.md), bevor du einen Pull Request einreichst.

### Auf Orchium aufbauen

Wenn du an einem Projekt arbeitest, das mit Orchium zusammenhängt und "orchium" als Teil seines Namens verwendet (z.B. "orchium-dashboard" oder "orchium-mobile"), füge bitte einen Hinweis in deine README ein, dass es nicht vom Orchium-Team gebaut wird und nicht in irgendeiner Weise mit uns verbunden ist.

---

**Tritt unserer Community bei** [Discord](https://discord.gg/SDyAKPEhN8)