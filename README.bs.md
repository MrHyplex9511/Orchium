<div align="center">
  <pre>
▄▀▀▀▄ █▀▀▀▄ ▄▀▀▀  █   █ ▀█▀ █   █ █▄ ▄█
█   █ █▀▀█  █     █▀▀▀█  █  █   █ █ ▀ █
 ▀▀▀  ▀   ▀  ▀▀▀  ▀   ▀ ▀▀▀  ▀▀▀  ▀   ▀
  </pre>
</div>
<p align="center">Orchium je open source AI agent za programiranje.</p>
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
> **Orchium** je nezavisni fork projekta
> [OpenCode](https://github.com/anomalyco/opencode), licenciran pod
> [MIT licencom](./LICENSE). Originalna autorska prava pripadaju autorima OpenCode-a.
> Ovaj projekat **nije povezan niti podržan od strane** originalnog projekta.

---

### Instalacija

```bash
# Package manageri
npm i -g orchium@latest        # ili bun/pnpm/yarn
scoop install orchium             # Windows
choco install orchium             # Windows
brew install anomalyco/tap/orchium # macOS i Linux (preporučeno, uvijek ažurno)
brew install orchium              # macOS i Linux (zvanična brew formula, rjeđe se ažurira)
sudo pacman -S orchium            # Arch Linux (Stable)
paru -S orchium-bin               # Arch Linux (Latest from AUR)
mise use -g orchium               # Bilo koji OS
nix run nixpkgs#orchium           # ili github:MrHyplex9511/Orchium za najnoviji dev branch
```

> [!TIP]
> Ukloni verzije starije od 0.1.x prije instalacije.

### Desktop aplikacija (BETA)

Orchium je dostupan i kao desktop aplikacija. Preuzmi je direktno sa [stranice izdanja](https://github.com/MrHyplex9511/Orchium/releases).

| Platforma             | Preuzimanje                        |
| --------------------- | ---------------------------------- |
| macOS (Apple Silicon) | `orchium-desktop-mac-arm64.dmg`   |
| macOS (Intel)         | `orchium-desktop-mac-x64.dmg`     |
| Windows               | `orchium-desktop-windows-x64.exe` |
| Linux                 | `.deb`, `.rpm`, ili AppImage       |

```bash
# macOS (Homebrew)
brew install --cask orchium-desktop
# Windows (Scoop)
scoop bucket add extras; scoop install extras/orchium-desktop
```

#### Instalacijski direktorij

Kada se instalira putem package managera, binarnu datoteku upravlja taj package manager.
Prilagođeni instalacijski direktoriji odnose se na ručne instalacije; pogledaj dokumentaciju svog package managera.

### Agenti

Orchium uključuje dva ugrađena agenta između kojih možeš prebacivati tasterom `Tab`.

- **build** - Podrazumijevani agent sa punim pristupom za razvoj
- **plan** - Agent samo za čitanje za analizu i istraživanje koda
  - Podrazumijevano zabranjuje izmjene datoteka
  - Traži dozvolu prije pokretanja bash komandi
  - Idealan za istraživanje nepoznatih codebase-ova ili planiranje izmjena

Uključen je i **general** pod-agent za složene pretrage i višekoračne zadatke.
Koristi se interno i može se pozvati pomoću `@general` u porukama.

Saznaj više o [agentima](docs/agents.md).

### Dokumentacija

Za više informacija o konfiguraciji Orchiuma, [**pogledaj dokumentaciju**](docs/README.md).

### Pristup provajderu

Orchium podržava BYOK (Bring Your Own Key) za sve provajdere.
OpenCode besplatni nivo (bez ključa) ograničen je na službenog OpenCode klijenta
i vratit će grešku kada se koristi iz Orchiuma. Da biste koristili besplatne modele, možete:
- Navesti pravi API ključ OpenCode računa, ili
- Koristiti besplatni nivo od Geminija, Groqa ili lokalnog modela (Ollama).

### Doprinosi

Ako želiš doprinositi Orchiumu, pročitaj [upute za doprinošenje](./CONTRIBUTING.md) prije slanja pull requesta.

### Gradnja na Orchiumu

Ako radiš na projektu koji je povezan s Orchiumom i koristi "orchium" kao dio naziva, npr. "orchium-dashboard" ili "orchium-mobile", dodaj napomenu u svoj README da projekat nije napravio Orchium tim i da nije povezan s nama.

---

**Pridruži se našoj zajednici** [Discord](https://discord.gg/SDyAKPEhN8)