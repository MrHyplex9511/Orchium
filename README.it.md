<div align="center">
  <pre>
▄▀▀▀▄ █▀▀▀▄ ▄▀▀▀  █   █ ▀█▀ █   █ █▄ ▄█
█   █ █▀▀█  █     █▀▀▀█  █  █   █ █ ▀ █
 ▀▀▀  ▀   ▀  ▀▀▀  ▀   ▀ ▀▀▀  ▀▀▀  ▀   ▀
  </pre>
</div>
<p align="center">L’agente di coding AI open source.</p>
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
> **Orchium** è un fork indipendente di
> [OpenCode](https://github.com/anomalyco/opencode), concesso in licenza secondo i termini della
> [Licenza MIT](./LICENSE). Il copyright originale appartiene agli autori di OpenCode.
> Questo progetto **non è affiliato né approvato dal** progetto originale.

---

### Installazione

```bash
# Package manager
npm i -g orchium@latest        # oppure bun/pnpm/yarn
scoop install orchium             # Windows
choco install orchium             # Windows
brew install anomalyco/tap/orchium # macOS e Linux (consigliato, sempre aggiornato)
brew install orchium              # macOS e Linux (formula brew ufficiale, aggiornata meno spesso)
sudo pacman -S orchium            # Arch Linux (Stable)
paru -S orchium-bin               # Arch Linux (Latest from AUR)
mise use -g orchium               # Qualsiasi OS
nix run nixpkgs#orchium           # oppure github:MrHyplex9511/Orchium per l’ultima branch di sviluppo
```

> [!TIP]
> Rimuovi le versioni precedenti alla 0.1.x prima di installare.

### App Desktop (BETA)

Orchium è disponibile anche come applicazione desktop. Puoi scaricarla direttamente dalla [pagina delle release](https://github.com/MrHyplex9511/Orchium/releases).

| Piattaforma           | Download                           |
| --------------------- | ---------------------------------- |
| macOS (Apple Silicon) | `orchium-desktop-mac-arm64.dmg`   |
| macOS (Intel)         | `orchium-desktop-mac-x64.dmg`     |
| Windows               | `orchium-desktop-windows-x64.exe` |
| Linux                 | `.deb`, `.rpm`, oppure AppImage    |

```bash
# macOS (Homebrew)
brew install --cask orchium-desktop
# Windows (Scoop)
scoop bucket add extras; scoop install extras/orchium-desktop
```

#### Directory di installazione

Quando viene installato tramite un gestore di pacchetti, il binario è gestito da quel gestore di pacchetti.
Le directory di installazione personalizzate si applicano alle installazioni manuali; consulta la documentazione del tuo gestore di pacchetti.

### Agenti

Orchium include due agenti integrati tra cui puoi passare usando il tasto `Tab`.

- **build** – Predefinito, agente con accesso completo per il lavoro di sviluppo
- **plan** – Agente in sola lettura per analisi ed esplorazione del codice
  - Nega le modifiche ai file per impostazione predefinita
  - Chiede il permesso prima di eseguire comandi bash
  - Ideale per esplorare codebase sconosciute o pianificare modifiche

È inoltre incluso un sotto-agente **general** per ricerche complesse e attività multi-step.
Viene utilizzato internamente e può essere invocato usando `@general` nei messaggi.

Scopri di più sugli [agenti](docs/agents.md).

### Documentazione

Per maggiori informazioni su come configurare Orchium, [**consulta la nostra documentazione**](docs/README.md).

### Accesso ai provider

Orchium supporta il BYOK (Bring Your Own Key) per tutti i provider.
Il piano gratuito di OpenCode (senza chiave) è limitato al client ufficiale di OpenCode
e restituirà un errore quando viene utilizzato da Orchium. Per usare i modelli gratuiti, puoi:
- Fornire una vera chiave API dell'account OpenCode, oppure
- Usare un piano gratuito di Gemini, Groq o un modello locale (Ollama).

### Contribuire

Se sei interessato a contribuire a Orchium, leggi la nostra [guida alla contribuzione](./CONTRIBUTING.md) prima di inviare una pull request.

### Costruire su Orchium

Se stai lavorando a un progetto correlato a Orchium e che utilizza "orchium" come parte del nome (ad esempio "orchium-dashboard" o "orchium-mobile"), aggiungi una nota nel tuo README per chiarire che non è sviluppato dal team Orchium e che non è affiliato in alcun modo con noi.

---

**Unisciti alla nostra community** [Discord](https://discord.gg/SDyAKPEhN8)