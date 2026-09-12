<div align="center">
  <pre>
▄▀▀▀▄ █▀▀▀▄ ▄▀▀▀  █   █ ▀█▀ █   █ █▄ ▄█
█   █ █▀▀█  █     █▀▀▀█  █  █   █ █ ▀ █
 ▀▀▀  ▀   ▀  ▀▀▀  ▀   ▀ ▀▀▀  ▀▀▀  ▀   ▀
  </pre>
</div>
<p align="center">開源的 AI Coding Agent。</p>
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
> **Orchium** 是 [OpenCode](https://github.com/anomalyco/opencode) 的獨立分支，基於
> [MIT 授權條款](./LICENSE)。原始版權歸 OpenCode 作者所有。
> 本專案**與原專案無任何關聯，也未獲得其認可**。

---

### 安裝

```bash
# 套件管理員
npm i -g orchium@latest        # 也可使用 bun/pnpm/yarn
scoop install orchium             # Windows
choco install orchium             # Windows
brew install anomalyco/tap/orchium # macOS 與 Linux（推薦，始終保持最新）
brew install orchium              # macOS 與 Linux（官方 brew formula，更新頻率較低）
sudo pacman -S orchium            # Arch Linux (Stable)
paru -S orchium-bin               # Arch Linux (Latest from AUR)
mise use -g orchium               # 任何作業系統
nix run nixpkgs#orchium           # 或使用 github:MrHyplex9511/Orchium 以取得最新開發分支
```

> [!TIP]
> 安裝前請先移除 0.1.x 以前的舊版本。

### 桌面應用程式 (BETA)

Orchium 也提供桌面版應用程式。您可以直接從 [發佈頁面 (releases page)](https://github.com/MrHyplex9511/Orchium/releases) 下載。

| 平台                  | 下載連結                           |
| --------------------- | ---------------------------------- |
| macOS (Apple Silicon) | `orchium-desktop-mac-arm64.dmg`   |
| macOS (Intel)         | `orchium-desktop-mac-x64.dmg`     |
| Windows               | `orchium-desktop-windows-x64.exe` |
| Linux                 | `.deb`, `.rpm`, 或 AppImage        |

```bash
# macOS (Homebrew Cask)
brew install --cask orchium-desktop
# Windows (Scoop)
scoop bucket add extras; scoop install extras/orchium-desktop
```

#### 安裝目錄

透過軟體套件管理員安裝時，二進位檔案由該軟體套件管理員管理。
自訂安裝目錄僅適用於手動安裝；請參閱軟體套件管理員的文件。

### Agents

Orchium 內建了兩種 Agent，您可以使用 `Tab` 鍵快速切換。

- **build** - 預設模式，具備完整權限的 Agent，適用於開發工作。
- **plan** - 唯讀模式，適用於程式碼分析與探索。
  - 預設禁止修改檔案。
  - 執行 bash 指令前會詢問權限。
  - 非常適合用來探索陌生的程式碼庫或規劃變更。

此外，Orchium 還包含一個 **general** 子 Agent，用於處理複雜搜尋與多步驟任務。此 Agent 供系統內部使用，亦可透過在訊息中輸入 `@general` 來呼叫。

了解更多關於 [Agents](docs/agents.md) 的資訊。

### 線上文件

關於如何設定 Orchium 的詳細資訊，請參閱我們的 [**官方文件**](docs/README.md)。

### Provider Access

Orchium 支援所有提供者的 BYOK（自帶金鑰，Bring Your Own Key）。
OpenCode 的免費層（無金鑰）僅限官方 OpenCode 用戶端使用，
從 Orchium 呼叫時將返回錯誤。若要使用免費模型，您可以：
- 提供真實的 OpenCode 帳戶 API 金鑰，或
- 使用 Gemini、Groq 或本機模型（Ollama）的免費層。

### 參與貢獻

如果您有興趣參與 Orchium 的開發，請在提交 Pull Request 前先閱讀我們的 [貢獻指南 (Contributing Docs)](./CONTRIBUTING.md)。

### 基於 Orchium 進行開發

如果您正在開發與 Orchium 相關的專案，並在名稱中使用了 "orchium"（例如 "orchium-dashboard" 或 "orchium-mobile"），請在您的 README 中加入聲明，說明該專案並非由 Orchium 團隊開發，且與我們沒有任何隸屬關係。

---

**加入我們的社群** [Discord](https://discord.gg/SDyAKPEhN8)