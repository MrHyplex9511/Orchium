<div align="center">
  <pre>
▄▀▀▀▄ █▀▀▀▄ ▄▀▀▀  █   █ ▀█▀ █   █ █▄ ▄█
█   █ █▀▀█  █     █▀▀▀█  █  █   █ █ ▀ █
 ▀▀▀  ▀   ▀  ▀▀▀  ▀   ▀ ▀▀▀  ▀▀▀  ▀   ▀
  </pre>
</div>
<p align="center">Trợ lý lập trình AI mã nguồn mở.</p>
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
> **Orchium** là một fork độc lập của
> [OpenCode](https://github.com/anomalyco/opencode), được cấp phép theo
> [Giấy phép MIT](./LICENSE). Bản quyền gốc thuộc về các tác giả của OpenCode.
> Dự án này **không liên kết với và không được xác nhận bởi** dự án gốc.

---

### Cài đặt

```bash
# Quick install (macOS, Linux, Windows)
curl -fsSL https://raw.githubusercontent.com/MrHyplex9511/Orchium/dev/install | bash

# or use Nix (latest dev branch)
nix run github:MrHyplex9511/Orchium
```

> [!TIP]
> Hãy xóa các phiên bản cũ hơn 0.1.x trước khi cài đặt.

### Ứng dụng Desktop (BETA)

Orchium cũng có sẵn dưới dạng ứng dụng desktop. Tải trực tiếp từ [trang releases](https://github.com/MrHyplex9511/Orchium/releases).

| Nền tảng              | Tải xuống                          |
| --------------------- | ---------------------------------- |
| macOS (Apple Silicon) | `orchium-desktop-mac-arm64.dmg`   |
| macOS (Intel)         | `orchium-desktop-mac-x64.dmg`     |
| Windows               | `orchium-desktop-windows-x64.exe` |
| Linux                 | `.deb`, `.rpm`, hoặc AppImage      |

```bash
# macOS (Homebrew)
# macOS and Windows: download from the releases page (see the table above)
```

#### Thư mục cài đặt

Khi được cài đặt qua trình quản lý gói, tệp thực thi sẽ được quản lý bởi trình quản lý gói đó.
Thư mục cài đặt tùy chỉnh chỉ áp dụng cho cài đặt thủ công; hãy xem tài liệu của trình quản lý gói của bạn.

### Agents (Đại diện)

Orchium bao gồm hai agent được tích hợp sẵn mà bạn có thể chuyển đổi bằng phím `Tab`.

- **build** - Agent mặc định, có toàn quyền truy cập cho công việc lập trình
- **plan** - Agent chỉ đọc dùng để phân tích và khám phá mã nguồn
  - Mặc định từ chối việc chỉnh sửa tệp
  - Hỏi quyền trước khi chạy các lệnh bash
  - Lý tưởng để khám phá các codebase lạ hoặc lên kế hoạch thay đổi

Ngoài ra còn có một subagent **general** dùng cho các tìm kiếm phức tạp và tác vụ nhiều bước.
Agent này được sử dụng nội bộ và có thể gọi bằng cách dùng `@general` trong tin nhắn.

Tìm hiểu thêm về [agents](docs/agents.md).

### Tài liệu

Để biết thêm thông tin về cách cấu hình Orchium, [**hãy truy cập tài liệu của chúng tôi**](docs/README.md).

### Truy cập Nhà cung cấp

Orchium hỗ trợ BYOK (Bring Your Own Key - Mang khóa của bạn) cho tất cả các nhà cung cấp.
Bậc miễn phí của OpenCode (không cần khóa) bị giới hạn cho máy khách OpenCode chính thức
và sẽ trả về lỗi khi được sử dụng từ Orchium. Để sử dụng các mô hình miễn phí, bạn có thể:
- Cung cấp khóa API thực của tài khoản OpenCode, hoặc
- Sử dụng bậc miễn phí từ Gemini, Groq hoặc mô hình cục bộ (Ollama).

### Đóng góp

Nếu bạn muốn đóng góp cho Orchium, vui lòng đọc [tài liệu hướng dẫn đóng góp](./CONTRIBUTING.md) trước khi gửi pull request.

### Xây dựng trên nền tảng Orchium

Nếu bạn đang làm việc trên một dự án liên quan đến Orchium và sử dụng "orchium" như một phần của tên dự án, ví dụ "orchium-dashboard" hoặc "orchium-mobile", vui lòng thêm một ghi chú vào README của bạn để làm rõ rằng dự án đó không được xây dựng bởi đội ngũ Orchium và không liên kết với chúng tôi dưới bất kỳ hình thức nào.

---

**Tham gia cộng đồng của chúng tôi** [Discord](https://discord.gg/SDyAKPEhN8)