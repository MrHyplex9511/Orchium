<div align="center">
  <pre>
▄▀▀▀▄ █▀▀▀▄ ▄▀▀▀  █   █ ▀█▀ █   █ █▄ ▄█
█   █ █▀▀█  █     █▀▀▀█  █  █   █ █ ▀ █
 ▀▀▀  ▀   ▀  ▀▀▀  ▀   ▀ ▀▀▀  ▀▀▀  ▀   ▀
  </pre>
</div>
<p align="center">Открытый AI-агент для программирования.</p>
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
> **Orchium** — это независимый форк
> [OpenCode](https://github.com/anomalyco/opencode), распространяемый под
> [MIT License](./LICENSE). Авторские права принадлежат авторам OpenCode.
> Этот проект **не связан с оригинальным проектом и не поддерживается им**.

---

### Установка

```bash
# Менеджеры пакетов
npm i -g orchium@latest        # или bun/pnpm/yarn
scoop install orchium             # Windows
choco install orchium             # Windows
brew install anomalyco/tap/orchium # macOS и Linux (рекомендуем, всегда актуально)
brew install orchium              # macOS и Linux (официальная формула brew, обновляется реже)
sudo pacman -S orchium            # Arch Linux (Stable)
paru -S orchium-bin               # Arch Linux (Latest from AUR)
mise use -g orchium               # любая ОС
nix run nixpkgs#orchium           # или github:MrHyplex9511/Orchium для самой свежей ветки dev
```

> [!TIP]
> Перед установкой удалите версии старше 0.1.x.

### Десктопное приложение (BETA)

Orchium также доступен как десктопное приложение. Скачайте его со [страницы релизов](https://github.com/MrHyplex9511/Orchium/releases).

| Платформа             | Загрузка                           |
| --------------------- | ---------------------------------- |
| macOS (Apple Silicon) | `orchium-desktop-mac-arm64.dmg`   |
| macOS (Intel)         | `orchium-desktop-mac-x64.dmg`     |
| Windows               | `orchium-desktop-windows-x64.exe` |
| Linux                 | `.deb`, `.rpm` или AppImage        |

```bash
# macOS (Homebrew)
brew install --cask orchium-desktop
# Windows (Scoop)
scoop bucket add extras; scoop install extras/orchium-desktop
```

#### Каталог установки

При установке через менеджер пакетов бинарный файл управляется этим менеджером пакетов.
Пользовательские каталоги установки применяются к ручной установке; см. документацию вашего менеджера пакетов.

### Agents

В Orchium есть два встроенных агента, между которыми можно переключаться клавишей `Tab`.

- **build** - По умолчанию, агент с полным доступом для разработки
- **plan** - Агент только для чтения для анализа и изучения кода
  - По умолчанию запрещает редактирование файлов
  - Запрашивает разрешение перед выполнением bash-команд
  - Идеален для изучения незнакомых кодовых баз или планирования изменений

Также включен сабагент **general** для сложных поисков и многошаговых задач.
Он используется внутренне и может быть вызван в сообщениях через `@general`.

Подробнее об [agents](docs/agents.md).

### Документация

Больше информации о том, как настроить Orchium: [**наши docs**](docs/README.md).

### Доступ к провайдерам

Orchium поддерживает BYOK (Bring Your Own Key) для всех провайдеров.
Бесплатный тариф OpenCode (без ключа) ограничен официальным клиентом OpenCode
и вернёт ошибку при использовании из Orchium. Чтобы использовать бесплатные модели:
- Укажите реальный API-ключ аккаунта OpenCode, или
- Используйте бесплатный тариф Gemini, Groq или локальную модель (Ollama).

### Вклад

Если вы хотите внести вклад в Orchium, прочитайте [contributing docs](./CONTRIBUTING.md) перед тем, как отправлять pull request.

### Разработка на базе Orchium

Если вы делаете проект, связанный с Orchium, и используете "orchium" как часть имени (например, "orchium-dashboard" или "orchium-mobile"), добавьте примечание в README, чтобы уточнить, что проект не создан командой Orchium и не аффилирован с нами.

---

**Присоединяйтесь к нашему сообществу** [Discord](https://discord.gg/SDyAKPEhN8)
