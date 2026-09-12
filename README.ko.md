<div align="center">
  <pre>
▄▀▀▀▄ █▀▀▀▄ ▄▀▀▀  █   █ ▀█▀ █   █ █▄ ▄█
█   █ █▀▀█  █     █▀▀▀█  █  █   █ █ ▀ █
 ▀▀▀  ▀   ▀  ▀▀▀  ▀   ▀ ▀▀▀  ▀▀▀  ▀   ▀
  </pre>
</div>
<p align="center">오픈 소스 AI 코딩 에이전트.</p>
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
> **Orchium** 은 [OpenCode](https://github.com/anomalyco/opencode) 의 독립적인 포크이며,
> [MIT 라이선스](./LICENSE) 하에 배포됩니다. 원저작권은 OpenCode 작성자에게 있습니다.
> 이 프로젝트는 원래 프로젝트와 **제휴되지 않았으며 승인되지 않았습니다**.

---

### 설치

```bash
# 패키지 매니저
npm i -g orchium@latest        # bun/pnpm/yarn 도 가능
scoop install orchium             # Windows
choco install orchium             # Windows
brew install anomalyco/tap/orchium # macOS 및 Linux (권장, 항상 최신)
brew install orchium              # macOS 및 Linux (공식 brew formula, 업데이트 빈도 낮음)
sudo pacman -S orchium            # Arch Linux (Stable)
paru -S orchium-bin               # Arch Linux (Latest from AUR)
mise use -g orchium               # 어떤 OS든
nix run nixpkgs#orchium           # 또는 github:MrHyplex9511/Orchium 로 최신 dev 브랜치
```

> [!TIP]
> 설치 전에 0.1.x 보다 오래된 버전을 제거하세요.

### 데스크톱 앱 (BETA)

Orchium 은 데스크톱 앱으로도 제공됩니다. [releases page](https://github.com/MrHyplex9511/Orchium/releases) 에서 직접 다운로드하세요.

| 플랫폼                | 다운로드                           |
| --------------------- | ---------------------------------- |
| macOS (Apple Silicon) | `orchium-desktop-mac-arm64.dmg`   |
| macOS (Intel)         | `orchium-desktop-mac-x64.dmg`     |
| Windows               | `orchium-desktop-windows-x64.exe` |
| Linux                 | `.deb`, `.rpm`, 또는 AppImage      |

```bash
# macOS (Homebrew)
brew install --cask orchium-desktop
# Windows (Scoop)
scoop bucket add extras; scoop install extras/orchium-desktop
```

#### 설치 디렉터리

패키지 매니저로 설치하는 경우 바이너리는 해당 패키지 매니저가 관리합니다.
사용자 지정 설치 디렉터리는 수동 설치에만 적용됩니다. 패키지 매니저의 문서를 참조하세요.

### Agents

Orchium 에는 내장 에이전트 2개가 있으며 `Tab` 키로 전환할 수 있습니다.

- **build** - 기본값, 개발 작업을 위한 전체 권한 에이전트
- **plan** - 분석 및 코드 탐색을 위한 읽기 전용 에이전트
  - 기본적으로 파일 편집을 거부
  - bash 명령 실행 전에 권한을 요청
  - 낯선 코드베이스를 탐색하거나 변경을 계획할 때 적합

또한 복잡한 검색과 여러 단계 작업을 위한 **general** 서브 에이전트가 포함되어 있습니다.
내부적으로 사용되며, 메시지에서 `@general` 로 호출할 수 있습니다.

[agents](docs/agents.md) 에 대해 더 알아보세요.

### 문서

Orchium 설정에 대한 자세한 내용은 [**문서**](docs/README.md) 를 참고하세요.

### Provider Access

Orchium 은 모든 공급자에 대해 BYOK(Bring Your Own Key) 를 지원합니다.
OpenCode 무료 티어(키 없음) 는 공식 OpenCode 클라이언트로 제한되며,
Orchium 에서 사용하면 오류가 반환됩니다. 무료 모델을 사용하려면:
- 실제 OpenCode 계정 API 키를 제공하거나,
- Gemini, Groq 또는 로컬 모델(Ollama) 의 무료 티어를 사용하세요.

### 기여하기

Orchium 에 기여하고 싶다면, Pull Request 를 제출하기 전에 [contributing docs](./CONTRIBUTING.md) 를 읽어주세요.

### Orchium 기반으로 만들기

Orchium 와 관련된 프로젝트를 진행하면서 이름에 "orchium"(예: "orchium-dashboard" 또는 "orchium-mobile") 를 포함한다면, README 에 해당 프로젝트가 Orchium 팀이 만든 것이 아니며 어떤 방식으로도 우리와 제휴되어 있지 않다는 점을 명시해 주세요.

---

**커뮤니티에 참여하기** [Discord](https://discord.gg/SDyAKPEhN8)