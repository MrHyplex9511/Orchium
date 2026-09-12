<div align="center">
  <pre>
▄▀▀▀▄ █▀▀▀▄ ▄▀▀▀  █   █ ▀█▀ █   █ █▄ ▄█
█   █ █▀▀█  █     █▀▀▀█  █  █   █ █ ▀ █
 ▀▀▀  ▀   ▀  ▀▀▀  ▀   ▀ ▀▀▀  ▀▀▀  ▀   ▀
  </pre>
</div>
<p align="center">开源的 AI Coding Agent。</p>
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
> **Orchium** 是 [OpenCode](https://github.com/anomalyco/opencode) 的独立分支，基于
> [MIT 许可证](./LICENSE)。原始版权归 OpenCode 作者所有。
> 本项目**与原项目无任何关联，也未获得其认可**。

---

### 安装

```bash
# 软件包管理器
npm i -g orchium@latest        # 也可使用 bun/pnpm/yarn
scoop install orchium             # Windows
choco install orchium             # Windows
brew install anomalyco/tap/orchium # macOS 和 Linux（推荐，始终保持最新）
brew install orchium              # macOS 和 Linux（官方 brew formula，更新频率较低）
sudo pacman -S orchium            # Arch Linux (Stable)
paru -S orchium-bin               # Arch Linux (Latest from AUR)
mise use -g orchium               # 任意系统
nix run nixpkgs#orchium           # 或用 github:MrHyplex9511/Orchium 获取最新 dev 分支
```

> [!TIP]
> 安装前请先移除 0.1.x 之前的旧版本。

### 桌面应用程序 (BETA)

Orchium 也提供桌面版应用。可直接从 [发布页 (releases page)](https://github.com/MrHyplex9511/Orchium/releases) 下载。

| 平台                  | 下载文件                           |
| --------------------- | ---------------------------------- |
| macOS (Apple Silicon) | `orchium-desktop-mac-arm64.dmg`   |
| macOS (Intel)         | `orchium-desktop-mac-x64.dmg`     |
| Windows               | `orchium-desktop-windows-x64.exe` |
| Linux                 | `.deb`、`.rpm` 或 AppImage         |

```bash
# macOS (Homebrew Cask)
brew install --cask orchium-desktop
# Windows (Scoop)
scoop bucket add extras; scoop install extras/orchium-desktop
```

#### 安装目录

通过软件包管理器安装时，二进制文件由该软件包管理器管理。
自定义安装目录仅适用于手动安装；请参阅软件包管理器的文档。

### Agents

Orchium 内置两种 Agent，可用 `Tab` 键快速切换：

- **build** - 默认模式，具备完整权限，适合开发工作
- **plan** - 只读模式，适合代码分析与探索
  - 默认拒绝修改文件
  - 运行 bash 命令前会询问
  - 便于探索未知代码库或规划改动

另外还包含一个 **general** 子 Agent，用于复杂搜索和多步任务，内部使用，也可在消息中输入 `@general` 调用。

了解更多 [Agents](docs/agents.md) 相关信息。

### 文档

更多配置说明请查看我们的 [**官方文档**](docs/README.md)。

### Provider Access

Orchium 支持所有提供商的 BYOK（自带密钥，Bring Your Own Key）。
OpenCode 的免费层（无密钥）仅限于官方 OpenCode 客户端使用，
从 Orchium 使用时将会返回错误。若要使用免费模型，可以选择：
- 提供真实的 OpenCode 账户 API 密钥，或
- 使用 Gemini、Groq 或本地模型（Ollama）的免费层。

### 参与贡献

如有兴趣贡献代码，请在提交 PR 前阅读 [贡献指南 (Contributing Docs)](./CONTRIBUTING.md)。

### 基于 Orchium 进行开发

如果你在项目名中使用了 “orchium”（如 “orchium-dashboard” 或 “orchium-mobile”），请在 README 里注明该项目不是 Orchium 团队官方开发，且不存在隶属关系。

---

**加入我们的社区** [Discord](https://discord.gg/SDyAKPEhN8)