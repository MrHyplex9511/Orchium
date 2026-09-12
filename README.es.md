<div align="center">
  <pre>
▄▀▀▀▄ █▀▀▀▄ ▄▀▀▀  █   █ ▀█▀ █   █ █▄ ▄█
█   █ █▀▀█  █     █▀▀▀█  █  █   █ █ ▀ █
 ▀▀▀  ▀   ▀  ▀▀▀  ▀   ▀ ▀▀▀  ▀▀▀  ▀   ▀
  </pre>
</div>
<p align="center">El agente de programación con IA de código abierto.</p>
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
> **Orchium** es un fork independiente de
> [OpenCode](https://github.com/anomalyco/opencode), bajo la
> [Licencia MIT](./LICENSE). Los derechos de autor originales pertenecen a los autores de OpenCode.
> Este proyecto **no está afiliado ni respaldado por** el proyecto original.

---

### Instalación

```bash
# Gestores de paquetes
npm i -g orchium@latest        # o bun/pnpm/yarn
scoop install orchium             # Windows
choco install orchium             # Windows
brew install anomalyco/tap/orchium # macOS y Linux (recomendado, siempre al día)
brew install orchium              # macOS y Linux (fórmula oficial de brew, se actualiza menos)
sudo pacman -S orchium            # Arch Linux (Stable)
paru -S orchium-bin               # Arch Linux (Latest from AUR)
mise use -g orchium               # cualquier sistema
nix run nixpkgs#orchium           # o github:MrHyplex9511/Orchium para la rama dev más reciente
```

> [!TIP]
> Elimina versiones anteriores a 0.1.x antes de instalar.

### App de escritorio (BETA)

Orchium también está disponible como aplicación de escritorio. Descárgala directamente desde la [página de releases](https://github.com/MrHyplex9511/Orchium/releases).

| Plataforma            | Descarga                           |
| --------------------- | ---------------------------------- |
| macOS (Apple Silicon) | `orchium-desktop-mac-arm64.dmg`   |
| macOS (Intel)         | `orchium-desktop-mac-x64.dmg`     |
| Windows               | `orchium-desktop-windows-x64.exe` |
| Linux                 | `.deb`, `.rpm`, o AppImage         |

```bash
# macOS (Homebrew)
brew install --cask orchium-desktop
# Windows (Scoop)
scoop bucket add extras; scoop install extras/orchium-desktop
```

#### Directorio de instalación

Cuando se instala mediante un gestor de paquetes, el binario lo gestiona ese gestor de paquetes.
Los directorios de instalación personalizados se aplican a las instalaciones manuales; consulta la documentación de tu gestor de paquetes.

### Agentes

Orchium incluye dos agentes integrados que puedes alternar con la tecla `Tab`.

- **build** - Por defecto, agente con acceso completo para tareas de desarrollo
- **plan** - Agente de solo lectura para análisis y exploración de código
  - Deniega ediciones de archivos por defecto
  - Pide permiso antes de ejecutar comandos bash
  - Ideal para explorar codebases desconocidas o planificar cambios

Además, incluye un subagente **general** para búsquedas complejas y tareas de varios pasos.
Se usa internamente y se puede invocar con `@general` en los mensajes.

Más información sobre [agentes](docs/agents.md).

### Documentación

Para más información sobre cómo configurar Orchium, [**ve a nuestra documentación**](docs/README.md).

### Acceso a proveedores

Orchium admite BYOK (Bring Your Own Key) para todos los proveedores.
El nivel gratuito de OpenCode (sin clave) está restringido al cliente oficial de OpenCode
y devolverá un error cuando se use desde Orchium. Para usar modelos gratuitos, tienes dos opciones:
- Proporciona una clave API real de una cuenta de OpenCode, o
- Usa el nivel gratuito de Gemini, Groq o un modelo local (Ollama).

### Contribuir

Si te interesa contribuir a Orchium, lee nuestras [docs de contribución](./CONTRIBUTING.md) antes de enviar un pull request.

### Proyectos basados en Orchium

Si estás trabajando en un proyecto basado en Orchium y usas "orchium" como parte del nombre, por ejemplo, "orchium-dashboard" u "orchium-mobile", agrega una nota en tu README para aclarar que no está hecho por el equipo de Orchium y que no está afiliado con nosotros de ninguna manera.

---

**Únete a nuestra comunidad** [Discord](https://discord.gg/SDyAKPEhN8)