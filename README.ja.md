<div align="center">
  <pre>
▄▀▀▀▄ █▀▀▀▄ ▄▀▀▀  █   █ ▀█▀ █   █ █▄ ▄█
█   █ █▀▀█  █     █▀▀▀█  █  █   █ █ ▀ █
 ▀▀▀  ▀   ▀  ▀▀▀  ▀   ▀ ▀▀▀  ▀▀▀  ▀   ▀
  </pre>
</div>
<p align="center">オープンソースのAIコーディングエージェント。</p>
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
> **Orchium** は [OpenCode](https://github.com/anomalyco/opencode) の独立フォークであり、
> [MIT ライセンス](./LICENSE) の下で公開されています。
> 元の著作権は OpenCode の作者に帰属します。
> 本プロジェクトは元のプロジェクトとは**一切関係がなく、承認も受けていません**。

---

### インストール

```bash
# Quick install (macOS, Linux, Windows)
curl -fsSL https://raw.githubusercontent.com/MrHyplex9511/Orchium/dev/install | bash

# or use Nix (latest dev branch)
nix run github:MrHyplex9511/Orchium
```

> [!TIP]
> インストール前に 0.1.x より古いバージョンを削除してください。

### デスクトップアプリ (BETA)

Orchium はデスクトップアプリとしても利用できます。[releases page](https://github.com/MrHyplex9511/Orchium/releases) から直接ダウンロードしてください。

| プラットフォーム      | ダウンロード                       |
| --------------------- | ---------------------------------- |
| macOS (Apple Silicon) | `orchium-desktop-mac-arm64.dmg`   |
| macOS (Intel)         | `orchium-desktop-mac-x64.dmg`     |
| Windows               | `orchium-desktop-windows-x64.exe` |
| Linux                 | `.deb`、`.rpm`、または AppImage    |

```bash
# macOS (Homebrew)
# macOS and Windows: download from the releases page (see the table above)
```

#### インストールディレクトリ

パッケージマネージャーでインストールした場合、バイナリはそのパッケージマネージャーによって管理されます。
カスタムのインストールディレクトリは手動インストールにのみ適用されます。パッケージマネージャーのドキュメントを参照してください。

### Agents

Orchium には組み込みの Agent が2つあり、`Tab` キーで切り替えられます。

- **build** - デフォルト。開発向けのフルアクセス Agent
- **plan** - 分析とコード探索向けの読み取り専用 Agent
  - デフォルトでファイル編集を拒否
  - bash コマンド実行前に確認
  - 未知のコードベース探索や変更計画に最適

また、複雑な検索やマルチステップのタスク向けに **general** サブ Agent も含まれています。
内部的に使用されており、メッセージで `@general` と入力して呼び出せます。

[agents](docs/agents.md) の詳細はこちら。

### ドキュメント

Orchium の設定については [**ドキュメント**](docs/README.md) を参照してください。

### Provider Access

Orchium はすべてのプロバイダーで BYOK（Bring Your Own Key、自身のキーを持ち込む）に対応しています。
OpenCode の無料枠（キーなし）は公式 OpenCode クライアントのみを対象としており、
Orchium から使用するとエラーが返されます。無料モデルを使用するには、次のいずれかを行ってください:
- 実際の OpenCode アカウントの API キーを提供する、または
- Gemini、Groq、またはローカルモデル（Ollama）の無料枠を使用する。

### コントリビュート

Orchium に貢献したい場合は、Pull Request を送る前に [contributing docs](./CONTRIBUTING.md) を読んでください。

### Orchium の上に構築する

Orchium に関連するプロジェクトで、名前に "orchium"（例: "orchium-dashboard" や "orchium-mobile"）を含める場合は、そのプロジェクトが Orchium チームによって作られたものではなく、いかなる形でも関係がないことを README に明記してください。

---

**コミュニティに参加** [Discord](https://discord.gg/SDyAKPEhN8)