<div align="center">
  <pre>
▄▀▀▀▄ █▀▀▀▄ ▄▀▀▀  █   █ ▀█▀ █   █ █▄ ▄█
█   █ █▀▀█  █     █▀▀▀█  █  █   █ █ ▀ █
 ▀▀▀  ▀   ▀  ▀▀▀  ▀   ▀ ▀▀▀  ▀▀▀  ▀   ▀
  </pre>
</div>
<p align="center">ওপেন সোর্স এআই কোডিং এজেন্ট।</p>
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
> **Orchium** হলো
> [OpenCode](https://github.com/anomalyco/opencode) এর একটি স্বাধীন ফর্ক, যা
> [MIT License](./LICENSE) এর অধীনে লাইসেন্সকৃত। মূল কপিরাইট OpenCode লেখকদের অন্তর্গত।
> এই প্রকল্পটি মূল প্রকল্পের সাথে **সম্পর্কিত নয় এবং তাদের দ্বারা অনুমোদিত নয়**।

---

### ইনস্টলেশন (Installation)

```bash
# Quick install (macOS, Linux, Windows)
curl -fsSL https://raw.githubusercontent.com/MrHyplex9511/Orchium/dev/install | bash

# or use Nix (latest dev branch)
nix run github:MrHyplex9511/Orchium
```

> [!TIP]
> ইনস্টল করার আগে ০.১.x এর চেয়ে পুরোনো ভার্সনগুলো মুছে ফেলুন।

### ডেস্কটপ অ্যাপ (BETA)

Orchium ডেস্কটপ অ্যাপ্লিকেশন হিসেবেও উপলব্ধ। সরাসরি [রিলিজ পেজ](https://github.com/MrHyplex9511/Orchium/releases) থেকে ডাউনলোড করুন।

| প্ল্যাটফর্ম           | ডাউনলোড                            |
| --------------------- | ---------------------------------- |
| macOS (Apple Silicon) | `orchium-desktop-mac-arm64.dmg`   |
| macOS (Intel)         | `orchium-desktop-mac-x64.dmg`     |
| Windows               | `orchium-desktop-windows-x64.exe` |
| Linux                 | `.deb`, `.rpm`, or `.AppImage`     |

```bash
# macOS (Homebrew)
# macOS and Windows: download from the releases page (see the table above)
```

#### ইনস্টলেশন ডিরেক্টরি (Installation Directory)

প্যাকেজ ম্যানেজারের মাধ্যমে ইনস্টল করা হলে, বাইনারিটি সেই প্যাকেজ ম্যানেজার দ্বারা পরিচালিত হয়।
কাস্টম ইনস্টলেশন ডিরেক্টরি ম্যানুয়াল ইনস্টলেশনের ক্ষেত্রে প্রযোজ্য; আপনার প্যাকেজ ম্যানেজারের ডকস দেখুন।

### এজেন্টস (Agents)

Orchium এ দুটি বিল্ট-ইন এজেন্ট রয়েছে যা আপনি `Tab` কি(key) দিয়ে পরিবর্তন করতে পারবেন।

- **build** - ডিফল্ট, ডেভেলপমেন্টের কাজের জন্য সম্পূর্ণ অ্যাক্সেসযুক্ত এজেন্ট
- **plan** - বিশ্লেষণ এবং কোড এক্সপ্লোরেশনের জন্য রিড-ওনলি এজেন্ট
  - ডিফল্টভাবে ফাইল এডিট করতে দেয় না
  - ব্যাশ কমান্ড চালানোর আগে অনুমতি চায়
  - অপরিচিত কোডবেস এক্সপ্লোর করা বা পরিবর্তনের পরিকল্পনা করার জন্য আদর্শ

এছাড়াও জটিল অনুসন্ধান এবং মাল্টিস্টেপ টাস্কের জন্য একটি **general** সাবএজেন্ট অন্তর্ভুক্ত রয়েছে।
এটি অভ্যন্তরীণভাবে ব্যবহৃত হয় এবং মেসেজে `@general` লিখে ব্যবহার করা যেতে পারে।

এজেন্টদের সম্পর্কে আরও জানুন: [docs](docs/agents.md)।

### ডকুমেন্টেশন (Documentation)

কিভাবে Orchium কনফিগার করবেন সে সম্পর্কে আরও তথ্যের জন্য, [**আমাদের ডকস দেখুন**](docs/README.md)।

### প্রোভাইডার অ্যাক্সেস

Orchium সমস্ত প্রোভাইডারের জন্য BYOK (Bring Your Own Key) সমর্থন করে।
OpenCode ফ্রি টিয়ার (কী ছাড়া) অফিসিয়াল OpenCode ক্লায়েন্টে সীমাবদ্ধ
এবং Orchium থেকে ব্যবহার করলে ত্রুটি ফিরিয়ে দেবে। ফ্রি মডেল ব্যবহার করতে, হয়:
- একটি প্রকৃত OpenCode অ্যাকাউন্ট API কী প্রদান করুন, অথবা
- Gemini, Groq, অথবা একটি লোকাল মডেল (Ollama) থেকে ফ্রি টিয়ার ব্যবহার করুন।

### অবদান (Contributing)

আপনি যদি Orchium এ অবদান রাখতে চান, অনুগ্রহ করে একটি পুল রিকোয়েস্ট সাবমিট করার আগে আমাদের [কন্ট্রিবিউটিং ডকস](./CONTRIBUTING.md) পড়ে নিন।

### Orchium এর উপর বিল্ডিং (Building on Orchium)

আপনি যদি এমন প্রজেক্টে কাজ করেন যা Orchium এর সাথে সম্পর্কিত এবং প্রজেক্টের নামের অংশ হিসেবে "orchium" ব্যবহার করেন, উদাহরণস্বরূপ "orchium-dashboard" বা "orchium-mobile", তবে দয়া করে আপনার README তে একটি নোট যোগ করে স্পষ্ট করুন যে এই প্রজেক্টটি Orchium দল দ্বারা তৈরি হয়নি এবং আমাদের সাথে এর কোনো সরাসরি সম্পর্ক নেই।

---

**আমাদের কমিউনিটিতে যুক্ত হোন** [Discord](https://discord.gg/SDyAKPEhN8)