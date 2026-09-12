<div align="center">
  <pre>
▄▀▀▀▄ █▀▀▀▄ ▄▀▀▀  █   █ ▀█▀ █   █ █▄ ▄█
█   █ █▀▀█  █     █▀▀▀█  █  █   █ █ ▀ █
 ▀▀▀  ▀   ▀  ▀▀▀  ▀   ▀ ▀▀▀  ▀▀▀  ▀   ▀
  </pre>
</div>
<p align="center">The open source AI coding agent.</p>
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
> **Orchium** is an independent fork of
> [OpenCode](https://github.com/anomalyco/opencode), licensed under the
> [MIT License](./LICENSE). Original copyright belongs to the OpenCode authors.
> This project is **not affiliated with or endorsed by** the original project.

---

### Installation

```bash
# Quick install (macOS, Linux, Windows)
curl -fsSL https://raw.githubusercontent.com/MrHyplex9511/Orchium/dev/install | bash

# or use Nix (latest dev branch)
nix run github:MrHyplex9511/Orchium
```

> [!TIP]
> Remove versions older than 0.1.x before installing.

### Desktop App (BETA)

Orchium is also available as a desktop application. Download directly from the [releases page](https://github.com/MrHyplex9511/Orchium/releases).

| Platform              | Download                           |
| --------------------- | ---------------------------------- |
| macOS (Apple Silicon) | `orchium-desktop-mac-arm64.dmg`   |
| macOS (Intel)         | `orchium-desktop-mac-x64.dmg`     |
| Windows               | `orchium-desktop-windows-x64.exe` |
| Linux                 | `.deb`, `.rpm`, or `.AppImage`     |

```bash
# macOS (Homebrew)
# macOS and Windows: download from the releases page (see the table above)
```

#### Installation Directory

When installed via a package manager, the binary is managed by that package manager.
Custom installation directories apply to manual installs; see your package manager's docs.

### Agents

Orchium includes two built-in agents you can switch between with the `Tab` key.

- **build** - Default, full-access agent for development work
- **plan** - Read-only agent for analysis and code exploration
  - Denies file edits by default
  - Asks permission before running bash commands
  - Ideal for exploring unfamiliar codebases or planning changes

Also included is a **general** subagent for complex searches and multistep tasks.
This is used internally and can be invoked using `@general` in messages.

Learn more about [agents](docs/agents.md).

### Documentation

For more info on how to configure Orchium, [**head over to our docs**](docs/README.md).

### Provider Access

Orchium supports BYOK (Bring Your Own Key) for all providers.
The OpenCode free tier (keyless) is restricted to the official OpenCode client
and will return an error when used from Orchium. To use free models, either:
- Provide a real OpenCode account API key, or
- Use a free tier from Gemini, Groq, or a local model (Ollama).

### Contributing

If you're interested in contributing to Orchium, please read our [contributing docs](./CONTRIBUTING.md) before submitting a pull request.

### Building on Orchium

If you are working on a project that's related to Orchium and is using "orchium" as part of its name, for example "orchium-dashboard" or "orchium-mobile", please add a note to your README to clarify that it is not built by the Orchium team and is not affiliated with us in any way.

---

**Join our community** [Discord](https://discord.gg/SDyAKPEhN8)
