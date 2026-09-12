<div align="center">
  <pre>
▄▀▀▀▄ █▀▀▀▄ ▄▀▀▀  █   █ ▀█▀ █   █ █▄ ▄█
█   █ █▀▀█  █     █▀▀▀█  █  █   █ █ ▀ █
 ▀▀▀  ▀   ▀  ▀▀▀  ▀   ▀ ▀▀▀  ▀▀▀  ▀   ▀
  </pre>
</div>
<p align="center">L'agent de codage IA open source.</p>
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
> **Orchium** est un fork indépendant de
> [OpenCode](https://github.com/anomalyco/opencode), sous licence
> [MIT License](./LICENSE). Le copyright original appartient aux auteurs d'OpenCode.
> Ce projet **n'est pas affilié ni approuvé par** le projet d'origine.

---

### Installation

```bash
# Quick install (macOS, Linux, Windows)
curl -fsSL https://raw.githubusercontent.com/MrHyplex9511/Orchium/dev/install | bash

# or use Nix (latest dev branch)
nix run github:MrHyplex9511/Orchium
```

> [!TIP]
> Supprimez les versions antérieures à 0.1.x avant d'installer.

### Application de bureau (BETA)

Orchium est aussi disponible en application de bureau. Téléchargez-la directement depuis la [page des releases](https://github.com/MrHyplex9511/Orchium/releases).

| Plateforme            | Téléchargement                     |
| --------------------- | ---------------------------------- |
| macOS (Apple Silicon) | `orchium-desktop-mac-arm64.dmg`   |
| macOS (Intel)         | `orchium-desktop-mac-x64.dmg`     |
| Windows               | `orchium-desktop-windows-x64.exe` |
| Linux                 | `.deb`, `.rpm`, ou AppImage        |

```bash
# macOS (Homebrew)
# macOS and Windows: download from the releases page (see the table above)
```

#### Répertoire d'installation

Lorsqu'il est installé via un gestionnaire de paquets, le binaire est géré par ce gestionnaire de paquets.
Les répertoires d'installation personnalisés s'appliquent aux installations manuelles ; consultez la documentation de votre gestionnaire de paquets.

### Agents

Orchium inclut deux agents intégrés que vous pouvez basculer avec la touche `Tab`.

- **build** - Par défaut, agent avec accès complet pour le travail de développement
- **plan** - Agent en lecture seule pour l'analyse et l'exploration du code
  - Refuse les modifications de fichiers par défaut
  - Demande l'autorisation avant d'exécuter des commandes bash
  - Idéal pour explorer une base de code inconnue ou planifier des changements

Un sous-agent **general** est aussi inclus pour les recherches complexes et les tâches en plusieurs étapes.
Il est utilisé en interne et peut être invoqué via `@general` dans les messages.

En savoir plus sur les [agents](docs/agents.md).

### Documentation

Pour plus d'informations sur la configuration d'Orchium, [**consultez notre documentation**](docs/README.md).

### Accès aux fournisseurs

Orchium prend en charge le BYOK (Bring Your Own Key) pour tous les fournisseurs.
Le niveau gratuit d'OpenCode (sans clé) est limité au client officiel d'OpenCode
et renverra une erreur lorsqu'il est utilisé depuis Orchium. Pour utiliser les modèles gratuits, soit :
- Fournissez une vraie clé API de compte OpenCode, soit
- Utilisez un niveau gratuit de Gemini, Groq ou un modèle local (Ollama).

### Contribuer

Si vous souhaitez contribuer à Orchium, lisez nos [docs de contribution](./CONTRIBUTING.md) avant de soumettre une pull request.

### Construire avec Orchium

Si vous travaillez sur un projet lié à Orchium et que vous utilisez "orchium" dans le nom du projet (par exemple, "orchium-dashboard" ou "orchium-mobile"), ajoutez une note dans votre README pour préciser qu'il n'est pas construit par l'équipe Orchium et qu'il n'est pas affilié à nous.

---

**Rejoignez notre communauté** [Discord](https://discord.gg/SDyAKPEhN8)