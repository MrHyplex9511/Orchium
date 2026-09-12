<div align="center">
  <pre>
▄▀▀▀▄ █▀▀▀▄ ▄▀▀▀  █   █ ▀█▀ █   █ █▄ ▄█
█   █ █▀▀█  █     █▀▀▀█  █  █   █ █ ▀ █
 ▀▀▀  ▀   ▀  ▀▀▀  ▀   ▀ ▀▀▀  ▀▀▀  ▀   ▀
  </pre>
</div>
<p align="center">O agente de programação com IA de código aberto.</p>
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
> O **Orchium** é um fork independente do
> [OpenCode](https://github.com/anomalyco/opencode), licenciado sob a
> [Licença MIT](./LICENSE). Os direitos autorais originais pertencem aos autores
> do OpenCode. Este projeto **não é afiliado nem endossado** pelo projeto
> original.

---

### Instalação

```bash
# Quick install (macOS, Linux, Windows)
curl -fsSL https://raw.githubusercontent.com/MrHyplex9511/Orchium/dev/install | bash

# or use Nix (latest dev branch)
nix run github:MrHyplex9511/Orchium
```

> [!TIP]
> Remova versões anteriores a 0.1.x antes de instalar.

### App desktop (BETA)

O Orchium também está disponível como aplicativo desktop. Baixe diretamente pela [página de releases](https://github.com/MrHyplex9511/Orchium/releases).

| Plataforma            | Download                           |
| --------------------- | ---------------------------------- |
| macOS (Apple Silicon) | `orchium-desktop-mac-arm64.dmg`   |
| macOS (Intel)         | `orchium-desktop-mac-x64.dmg`     |
| Windows               | `orchium-desktop-windows-x64.exe` |
| Linux                 | `.deb`, `.rpm` ou AppImage         |

```bash
# macOS (Homebrew)
# macOS and Windows: download from the releases page (see the table above)
```

#### Diretório de instalação

Quando instalado por meio de um gerenciador de pacotes, o binário é gerenciado por esse gerenciador.
Diretórios de instalação personalizados se aplicam a instalações manuais; consulte a documentação do seu gerenciador de pacotes.

### Agents

O Orchium inclui dois agents integrados, que você pode alternar com a tecla `Tab`.

- **build** - Padrão, agent com acesso total para trabalho de desenvolvimento
- **plan** - Agent somente leitura para análise e exploração de código
  - Nega edições de arquivos por padrão
  - Pede permissão antes de executar comandos bash
  - Ideal para explorar codebases desconhecidas ou planejar mudanças

Também há um subagent **general** para buscas complexas e tarefas em várias etapas.
Ele é usado internamente e pode ser invocado com `@general` nas mensagens.

Saiba mais sobre [agents](docs/agents.md).

### Documentação

Para mais informações sobre como configurar o Orchium, [**veja nossa documentação**](docs/README.md).

### Acesso ao provedor

O Orchium oferece suporte a BYOK (Bring Your Own Key) para todos os provedores.
O nível gratuito do OpenCode (sem chave) é restrito ao cliente oficial do OpenCode
e retornará um erro quando usado a partir do Orchium. Para usar modelos gratuitos, você pode:
- Fornecer uma chave de API real de uma conta OpenCode, ou
- Usar um nível gratuito do Gemini, Groq ou um modelo local (Ollama).

### Contribuir

Se você tem interesse em contribuir com o Orchium, leia os [contributing docs](./CONTRIBUTING.md) antes de enviar um pull request.

### Construindo com Orchium

Se você estiver trabalhando em um projeto relacionado ao Orchium e estiver usando "orchium" como parte do nome (por exemplo, "orchium-dashboard" ou "orchium-mobile"), adicione uma nota no README para deixar claro que não foi construído pela equipe do Orchium e não é afiliado a nós de nenhuma forma.

---

**Junte-se à nossa comunidade** [Discord](https://discord.gg/SDyAKPEhN8)