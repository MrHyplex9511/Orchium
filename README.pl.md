<div align="center">
  <pre>
▄▀▀▀▄ █▀▀▀▄ ▄▀▀▀  █   █ ▀█▀ █   █ █▄ ▄█
█   █ █▀▀█  █     █▀▀▀█  █  █   █ █ ▀ █
 ▀▀▀  ▀   ▀  ▀▀▀  ▀   ▀ ▀▀▀  ▀▀▀  ▀   ▀
  </pre>
</div>
<p align="center">Otwartoźródłowy agent kodujący AI.</p>
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
> **Orchium** to niezależny fork
> [OpenCode](https://github.com/anomalyco/opencode), na licencji
> [MIT License](./LICENSE). Oryginalne prawa autorskie należą do autorów OpenCode.
> Ten projekt **nie jest powiązany z oryginalnym projektem ani przez niego wspierany**.

---

### Instalacja

```bash
# Quick install (macOS, Linux, Windows)
curl -fsSL https://raw.githubusercontent.com/MrHyplex9511/Orchium/dev/install | bash

# or use Nix (latest dev branch)
nix run github:MrHyplex9511/Orchium
```

> [!TIP]
> Przed instalacją usuń wersje starsze niż 0.1.x.

### Aplikacja desktopowa (BETA)

Orchium jest także dostępny jako aplikacja desktopowa. Pobierz ją bezpośrednio ze strony [releases](https://github.com/MrHyplex9511/Orchium/releases).

| Platforma             | Pobieranie                         |
| --------------------- | ---------------------------------- |
| macOS (Apple Silicon) | `orchium-desktop-mac-arm64.dmg`   |
| macOS (Intel)         | `orchium-desktop-mac-x64.dmg`     |
| Windows               | `orchium-desktop-windows-x64.exe` |
| Linux                 | `.deb`, `.rpm` lub AppImage        |

```bash
# macOS (Homebrew)
# macOS and Windows: download from the releases page (see the table above)
```

#### Katalog instalacji

Gdy instalacja odbywa się przez menedżer pakietów, plik binarny jest zarządzany przez ten menedżer pakietów.
Własne katalogi instalacji dotyczą instalacji ręcznych; zapoznaj się z dokumentacją swojego menedżera pakietów.

### Agents

Orchium zawiera dwóch wbudowanych agentów, między którymi możesz przełączać się klawiszem `Tab`.

- **build** - Domyślny agent z pełnym dostępem do pracy developerskiej
- **plan** - Agent tylko do odczytu do analizy i eksploracji kodu
  - Domyślnie odmawia edycji plików
  - Pyta o zgodę przed uruchomieniem komend bash
  - Idealny do poznawania nieznanych baz kodu lub planowania zmian

Dodatkowo jest subagent **general** do złożonych wyszukiwań i wieloetapowych zadań.
Jest używany wewnętrznie i można go wywołać w wiadomościach przez `@general`.

Dowiedz się więcej o [agents](docs/agents.md).

### Dokumentacja

Więcej informacji o konfiguracji Orchium znajdziesz w [**dokumentacji**](docs/README.md).

### Dostęp do dostawców

Orchium obsługuje BYOK (Bring Your Own Key) dla wszystkich dostawców.
Darmowy poziom OpenCode (bez klucza) jest ograniczony do oficjalnego klienta OpenCode
i zwróci błąd podczas użycia z Orchium. Aby korzystać z darmowych modeli, możesz:
- Podaj prawdziwy klucz API konta OpenCode, albo
- Skorzystaj z darmowego poziomu Gemini, Groq lub lokalnego modelu (Ollama).

### Współtworzenie

Jeśli chcesz współtworzyć Orchium, przeczytaj [contributing docs](./CONTRIBUTING.md) przed wysłaniem pull requesta.

### Budowanie na Orchium

Jeśli pracujesz nad projektem związanym z Orchium i używasz "orchium" jako części nazwy (na przykład "orchium-dashboard" lub "orchium-mobile"), dodaj proszę notatkę do swojego README, aby wyjaśnić, że projekt nie jest tworzony przez zespół Orchium i nie jest z nami w żaden sposób powiązany.

---

**Dołącz do naszej społeczności** [Discord](https://discord.gg/SDyAKPEhN8)