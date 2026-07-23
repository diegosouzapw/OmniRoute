# Aturan Keamanan dan Kebersihan untuk Asisten AI (Bahasa Indonesia)

🌐 **Languages:** 🇺🇸 [English](../../../GEMINI.md) · 🇸🇦 [ar](../ar/GEMINI.md) · 🇧🇬 [bg](../bg/GEMINI.md) · 🇧🇩 [bn](../bn/GEMINI.md) · 🇨🇿 [cs](../cs/GEMINI.md) · 🇩🇰 [da](../da/GEMINI.md) · 🇩🇪 [de](../de/GEMINI.md) · 🇪🇸 [es](../es/GEMINI.md) · 🇮🇷 [fa](../fa/GEMINI.md) · 🇫🇮 [fi](../fi/GEMINI.md) · 🇫🇷 [fr](../fr/GEMINI.md) · 🇮🇳 [gu](../gu/GEMINI.md) · 🇮🇱 [he](../he/GEMINI.md) · 🇮🇳 [hi](../hi/GEMINI.md) · 🇭🇺 [hu](../hu/GEMINI.md) · 🇮🇩 [id](../id/GEMINI.md) · 🇮🇹 [it](../it/GEMINI.md) · 🇯🇵 [ja](../ja/GEMINI.md) · 🇰🇷 [ko](../ko/GEMINI.md) · 🇮🇳 [mr](../mr/GEMINI.md) · 🇲🇾 [ms](../ms/GEMINI.md) · 🇳🇱 [nl](../nl/GEMINI.md) · 🇳🇴 [no](../no/GEMINI.md) · 🇵🇭 [phi](../phi/GEMINI.md) · 🇵🇱 [pl](../pl/GEMINI.md) · 🇵🇹 [pt](../pt/GEMINI.md) · 🇧🇷 [pt-BR](../pt-BR/GEMINI.md) · 🇷🇴 [ro](../ro/GEMINI.md) · 🇷🇺 [ru](../ru/GEMINI.md) · 🇸🇰 [sk](../sk/GEMINI.md) · 🇸🇪 [sv](../sv/GEMINI.md) · 🇰🇪 [sw](../sw/GEMINI.md) · 🇮🇳 [ta](../ta/GEMINI.md) · 🇮🇳 [te](../te/GEMINI.md) · 🇹🇭 [th](../th/GEMINI.md) · 🇹🇷 [tr](../tr/GEMINI.md) · 🇺🇦 [uk-UA](../uk-UA/GEMINI.md) · 🇵🇰 [ur](../ur/GEMINI.md) · 🇻🇳 [vi](../vi/GEMINI.md) · 🇨🇳 [zh-CN](../zh-CN/GEMINI.md)

---

## 1. Penempatan & Organisasi File

- **File Tes**: SEMUA uji unit, uji integrasi, uji ekosistem, atau file Vitest HARUS ditempatkan secara ketat di dalam direktori `tests/` (mis., `tests/unit/`, `tests/integration/`). JANGAN PERNAH membuat file tes di root proyek (`/`).
- **Skrip dan Utilitas**: SEMUA skrip pemeliharaan, debugging, pembuatan, atau eksperimental (`.cjs`, `.mjs`, `.js`, `.ts`) HARUS ditempatkan secara ketat di dalam direktori `scripts/` atau `scripts/scratch/` untuk keperluan sementara. JANGAN PERNAH membuang skrip bebas di root proyek (`/`).

**Root Proyek HANYA BOLEH BERISI:**

- File konfigurasi (`vitest.config.ts`, `next.config.mjs`, `eslint.config.mjs`, dll.)
- File dependensi (`package.json`, `package-lock.json`)
- File dokumentasi (`README.md`, `CHANGELOG.md`, `AGENTS.md`)
- File CI/CD dan definisi pengabaian (`.gitignore`, `.dockerignore`)

Saat membuat _tes validasi_ atau skrip logika sekali pakai, default ke penggunaan `scripts/scratch/` atau direktori `tests/unit/` sesuai tujuan Anda. Jangan mencemari konteks root `/`.

## 2. Kredensial Dashboard VPS

| Lingkungan | URL                       | Kata Sandi |
| ---------- | ------------------------- | ---------- |
| VPS Lokal  | http://192.168.0.15:20128 | 123456     |
