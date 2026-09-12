<div align="center">
  <pre>
▄▀▀▀▄ █▀▀▀▄ ▄▀▀▀  █   █ ▀█▀ █   █ █▄ ▄█
█   █ █▀▀█  █     █▀▀▀█  █  █   █ █ ▀ █
 ▀▀▀  ▀   ▀  ▀▀▀  ▀   ▀ ▀▀▀  ▀▀▀  ▀   ▀
  </pre>
</div>
<p align="center">เอเจนต์การเขียนโค้ดด้วย AI แบบโอเพนซอร์ส</p>
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
> **Orchium** เป็นฟอร์กอิสระของ [OpenCode](https://github.com/anomalyco/opencode)
> เผยแพร่ภายใต้ [สัญญาอนุญาต MIT](./LICENSE) ลิขสิทธิ์ต้นฉบับเป็นของผู้เขียน OpenCode
> โปรเจกต์นี้**ไม่มีความเกี่ยวข้องหรือการรับรองใดๆ** จากโปรเจกต์ต้นฉบับ

---

### การติดตั้ง

```bash
# ตัวจัดการแพ็กเกจ
npm i -g orchium@latest        # หรือ bun/pnpm/yarn
scoop install orchium             # Windows
choco install orchium             # Windows
brew install anomalyco/tap/orchium # macOS และ Linux (แนะนำ อัปเดตเสมอ)
brew install orchium              # macOS และ Linux (brew formula อย่างเป็นทางการ อัปเดตน้อยกว่า)
sudo pacman -S orchium            # Arch Linux (Stable)
paru -S orchium-bin               # Arch Linux (Latest from AUR)
mise use -g orchium               # ระบบปฏิบัติการใดก็ได้
nix run nixpkgs#orchium           # หรือ github:MrHyplex9511/Orchium สำหรับสาขาพัฒนาล่าสุด
```

> [!TIP]
> ลบเวอร์ชันที่เก่ากว่า 0.1.x ก่อนติดตั้ง

### แอปพลิเคชันเดสก์ท็อป (เบต้า)

Orchium มีให้ใช้งานเป็นแอปพลิเคชันเดสก์ท็อป ดาวน์โหลดโดยตรงจาก [หน้ารุ่น](https://github.com/MrHyplex9511/Orchium/releases)

| แพลตฟอร์ม             | ดาวน์โหลด                          |
| --------------------- | ---------------------------------- |
| macOS (Apple Silicon) | `orchium-desktop-mac-arm64.dmg`   |
| macOS (Intel)         | `orchium-desktop-mac-x64.dmg`     |
| Windows               | `orchium-desktop-windows-x64.exe` |
| Linux                 | `.deb`, `.rpm`, หรือ AppImage      |

```bash
# macOS (Homebrew)
brew install --cask orchium-desktop
# Windows (Scoop)
scoop bucket add extras; scoop install extras/orchium-desktop
```

#### ไดเรกทอรีการติดตั้ง

เมื่อติดตั้งผ่านตัวจัดการแพ็กเกจ ไบนารีจะถูกจัดการโดยตัวจัดการแพ็กเกจนั้น
ไดเรกทอรีการติดตั้งที่กำหนดเองใช้ได้กับการติดตั้งด้วยตนเองเท่านั้น โปรดดูเอกสารของตัวจัดการแพ็กเกจของคุณ

### เอเจนต์

Orchium รวมเอเจนต์ในตัวสองตัวที่คุณสามารถสลับได้ด้วยปุ่ม `Tab`

- **build** - เอเจนต์เริ่มต้น มีสิทธิ์เข้าถึงแบบเต็มสำหรับงานพัฒนา
- **plan** - เอเจนต์อ่านอย่างเดียวสำหรับการวิเคราะห์และการสำรวจโค้ด
  - ปฏิเสธการแก้ไขไฟล์โดยค่าเริ่มต้น
  - ขอสิทธิ์ก่อนเรียกใช้คำสั่ง bash
  - เหมาะสำหรับสำรวจโค้ดเบสที่ไม่คุ้นเคยหรือวางแผนการเปลี่ยนแปลง

นอกจากนี้ยังมีเอเจนต์ย่อย **general** สำหรับการค้นหาที่ซับซ้อนและงานหลายขั้นตอน
ใช้ภายในและสามารถเรียกใช้ได้โดยใช้ `@general` ในข้อความ

เรียนรู้เพิ่มเติมเกี่ยวกับ [เอเจนต์](docs/agents.md)

### เอกสารประกอบ

สำหรับข้อมูลเพิ่มเติมเกี่ยวกับวิธีกำหนดค่า Orchium [**ไปที่เอกสารของเรา**](docs/README.md)

### Provider Access

Orchium รองรับ BYOK (Bring Your Own Key) สำหรับผู้ให้บริการทั้งหมด
OpenCode ฟรีเทียร์ (ไม่ต้องใช้คีย์) จำกัดเฉพาะไคลเอนต์ OpenCode อย่างเป็นทางการ
และจะคืนค่าข้อผิดพลาดเมื่อใช้งานจาก Orchium หากต้องการใช้โมเดลฟรี:
- ระบุคีย์ API บัญชี OpenCode จริง หรือ
- ใช้ฟรีเทียร์จาก Gemini, Groq หรือโมเดลท้องถิ่น (Ollama)

### การมีส่วนร่วม

หากคุณสนใจที่จะมีส่วนร่วมใน Orchium โปรดอ่าน [เอกสารการมีส่วนร่วม](./CONTRIBUTING.md) ก่อนส่ง Pull Request

### การสร้างบน Orchium

หากคุณทำงานในโปรเจกต์ที่เกี่ยวข้องกับ Orchium และใช้ "orchium" เป็นส่วนหนึ่งของชื่อ เช่น "orchium-dashboard" หรือ "orchium-mobile" โปรดเพิ่มหมายเหตุใน README ของคุณเพื่อชี้แจงว่าไม่ได้สร้างโดยทีม Orchium และไม่ได้เกี่ยวข้องกับเราในทางใด

---

**ร่วมชุมชนของเรา** [Discord](https://discord.gg/SDyAKPEhN8)