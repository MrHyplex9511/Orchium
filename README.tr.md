<div align="center">
  <pre>
▄▀▀▀▄ █▀▀▀▄ ▄▀▀▀  █   █ ▀█▀ █   █ █▄ ▄█
█   █ █▀▀█  █     █▀▀▀█  █  █   █ █ ▀ █
 ▀▀▀  ▀   ▀  ▀▀▀  ▀   ▀ ▀▀▀  ▀▀▀  ▀   ▀
  </pre>
</div>
<p align="center">Açık kaynaklı yapay zeka kodlama asistanı.</p>
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
> **Orchium**, [MIT Lisansı](./LICENSE) altında lisanslanan
> [OpenCode](https://github.com/anomalyco/opencode)'un bağımsız bir fork'udur.
> Orijinal telif hakkı OpenCode yazarlarına aittir. Bu proje orijinal projeyle
> **bağlantılı değildir ve orijinal proje tarafından onaylanmamıştır**.

---

### Kurulum

```bash
# Paket yöneticileri
npm i -g orchium@latest        # veya bun/pnpm/yarn
scoop install orchium             # Windows
choco install orchium             # Windows
brew install anomalyco/tap/orchium # macOS ve Linux (önerilir, her zaman güncel)
brew install orchium              # macOS ve Linux (resmi brew formülü, daha az güncellenir)
sudo pacman -S orchium            # Arch Linux (Stable)
paru -S orchium-bin               # Arch Linux (Latest from AUR)
mise use -g orchium               # Tüm işletim sistemleri
nix run nixpkgs#orchium           # veya en güncel geliştirme dalı için github:MrHyplex9511/Orchium
```

> [!TIP]
> Kurulumdan önce 0.1.x'ten eski sürümleri kaldırın.

### Masaüstü Uygulaması (BETA)

Orchium ayrıca masaüstü uygulaması olarak da mevcuttur. Doğrudan [sürüm sayfasından](https://github.com/MrHyplex9511/Orchium/releases) indirebilirsiniz.

| Platform              | İndirme                            |
| --------------------- | ---------------------------------- |
| macOS (Apple Silicon) | `orchium-desktop-mac-arm64.dmg`   |
| macOS (Intel)         | `orchium-desktop-mac-x64.dmg`     |
| Windows               | `orchium-desktop-windows-x64.exe` |
| Linux                 | `.deb`, `.rpm` veya AppImage       |

```bash
# macOS (Homebrew)
brew install --cask orchium-desktop
# Windows (Scoop)
scoop bucket add extras; scoop install extras/orchium-desktop
```

#### Kurulum Dizini

Bir paket yöneticisi aracılığıyla kurulduğunda, ikili dosya (binary) o paket yöneticisi tarafından yönetilir.
Özel kurulum dizinleri yalnızca manuel kurulumlar için geçerlidir; paket yöneticinizin dokümantasyonuna bakın.

### Ajanlar

Orchium, `Tab` tuşuyla aralarında geçiş yapabileceğiniz iki yerleşik (built-in) ajan içerir.

- **build** - Varsayılan, geliştirme çalışmaları için tam erişimli ajan
- **plan** - Analiz ve kod keşfi için salt okunur ajan
  - Varsayılan olarak dosya düzenlemelerini reddeder
  - Bash komutlarını çalıştırmadan önce izin ister
  - Tanımadığınız kod tabanlarını keşfetmek veya değişiklikleri planlamak için ideal

Ayrıca, karmaşık aramalar ve çok adımlı görevler için bir **genel** alt ajan bulunmaktadır.
Bu dahili olarak kullanılır ve mesajlarda `@general` ile çağrılabilir.

[Ajanlar](docs/agents.md) hakkında daha fazla bilgi edinin.

### Dokümantasyon

Orchium'u nasıl yapılandıracağınız hakkında daha fazla bilgi için [**dokümantasyonumuza göz atın**](docs/README.md).

### Sağlayıcı Erişimi

Orchium, tüm sağlayıcılar için BYOK'u (Bring Your Own Key / Kendi Anahtarını Getir) destekler.
OpenCode ücretsiz katmanı (anahtarsız) yalnızca resmi OpenCode istemcisine özeldir
ve Orchium'dan kullanıldığında hata döndürür. Ücretsiz modelleri kullanmak için şunlardan birini yapın:
- Gerçek bir OpenCode hesap API anahtarı sağlayın, veya
- Gemini, Groq veya yerel bir modelden (Ollama) ücretsiz bir katman kullanın.

### Katkıda Bulunma

Orchium'a katkıda bulunmak istiyorsanız, lütfen bir pull request göndermeden önce [katkıda bulunma dokümanlarımızı](./CONTRIBUTING.md) okuyun.

### Orchium Üzerine Geliştirme

Orchium ile ilgili bir proje üzerinde çalışıyorsanız ve projenizin adının bir parçası olarak "orchium" kullanıyorsanız (örneğin, "orchium-dashboard" veya "orchium-mobile"), lütfen README dosyanıza projenin Orchium ekibi tarafından geliştirilmediğini ve bizimle hiçbir şekilde bağlantılı olmadığını belirten bir not ekleyin.

---

**Topluluğumuza katılın** [Discord](https://discord.gg/SDyAKPEhN8)