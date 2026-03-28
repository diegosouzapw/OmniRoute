# 🚀 OmniRoute — Gerbang AI Gratis

### Jangan pernah berhenti membuat kode. Perutean cerdas ke **model AI GRATIS & berbiaya rendah** dengan fallback otomatis.

_Proksi API universal Anda — satu titik akhir, 67+ penyedia, tanpa waktu henti. Sekarang dengan orkestrasi agen **MCP & A2A**._

**Penyelesaian Obrolan • Penyematan • Pembuatan Gambar • Video • Musik • Audio • Pemeringkatan Ulang • **Penelusuran Web** • Server MCP • Protokol A2A • 100% TypeScript**

---

<div align="center">

[![npm version](https://img.shields.io/npm/v/omniroute?color=cb3837&logo=npm)](https://www.npmjs.com/package/omniroute)
[![npm downloads](https://img.shields.io/npm/dm/omniroute?color=cb3837&logo=npm&label=npm%20downloads)](https://www.npmjs.com/package/omniroute)
[![Docker Hub](https://img.shields.io/docker/v/diegosouzapw/omniroute?label=Docker%20Hub&logo=docker&color=2496ED)](https://hub.docker.com/r/diegosouzapw/omniroute)
[![Docker Pulls](https://img.shields.io/docker/pulls/diegosouzapw/omniroute?logo=docker&color=2496ED&label=docker%20pulls)](https://hub.docker.com/r/diegosouzapw/omniroute)
[![License](https://img.shields.io/github/license/diegosouzapw/OmniRoute)](https://github.com/diegosouzapw/OmniRoute/blob/main/LICENSE)
[![Website](https://img.shields.io/badge/Website-omniroute.online-blue?logo=google-chrome&logoColor=white)](https://omniroute.online)
[![WhatsApp](https://img.shields.io/badge/WhatsApp-Community-25D366?logo=whatsapp&logoColor=white)](https://chat.whatsapp.com/JI7cDQ1GyaiDHhVBpLxf8b?mode=gi_t)

[🌐 Website](https://omniroute.online) • [🚀 Quick Start](#-quick-start) • [💡 Features](#-key-features) • [📖 Docs](#-documentation) • [💰 Pricing](#-pricing-at-a-glance) • [💬 WhatsApp](https://chat.whatsapp.com/JI7cDQ1GyaiDHhVBpLxf8b?mode=gi_t)

</div>

🌐 **Tersedia di:** 🇮🇩 [English](README.md) | 🇧🇷 [Português (Brasil)](docs/i18n/pt-BR/README.md) | 🇪🇪 [Español](docs/i18n/es/README.md) | 🇫🇷 [Français](docs/i18n/fr/README.md) | 🇮🇹 [Italiano](docs/i18n/it/README.md) | 🇷🇮 [Русский](docs/i18n/ru/README.md) | CNY [中文 (简体)](docs/i18n/zh-CN/README.md) | 🇩🇪 [Deutsch](docs/i18n/de/README.md) | 🇮nai [हिन्दी](docs/i18n/in/README.md) | 🇹kh [ไทย](docs/i18n/th/README.md) | 🇮🇩 [Українська](docs/i18n/uk-UA/README.md) | ``OMNI_TOKEN_370\_\_ | 🇯ppa [日本語](docs/i18n/ja/README.md) | 🇻€ [Tiếng Việt](docs/i18n/vi/README.md) | 🇧🇮 [Български](docs/i18n/bg/README.md) | 🇩 [Dansk](docs/i18n/da/README.md) | 🇫🇮 [Suomi](docs/i18n/fi/README.md) | 🇮🇱 [עברית](docs/i18n/he/README.md) | ❤ [Magyar](docs/i18n/hu/README.md) | 🇮🇩 [Bahasa Indonesia](docs/i18n/id/README.md) | Korea Selatan [한국어](docs/i18n/ko/README.md) | 🇲🇾 [Bahasa Melayu](docs/i18n/ms/README.md) | €🇱 [Nederlands](docs/i18n/nl/README.md) | €🇴 [Norsk](docs/i18n/no/README.md) | ‏ [Português (Portugal)](docs/i18n/pt/README.md) | 🇷🇴 [Română](docs/i18n/ro/README.md) | 🇱 [Polski](docs/i18n/pl/README.md) | ✔️ [Slovenčina](docs/i18n/sk/README.md) | 🇲🇾 [Svenska](docs/i18n/sv/README.md) | ه و [Filipino](docs/i18n/phi/README.md) | Cheska [Čeština](docs/i18n/cs/README.md)

---

## 🆕 Yang Baru di v3.0.0

> **Meningkatkan dari v2.9.5?** — Lihat [full CHANGELOG](CHANGELOG.md#300--2026-03-22-release-candidate--not-yet-merged-to-main) untuk semua perubahan.

| Daerah                                      | Ubah                                                                                                                                                                                   |
| ------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 🔒 **Keamanan CodeQL**                      | Memperbaiki 10+ peringatan CodeQL: pengulangan polinomial, keacakan tidak aman, remediasi injeksi shell                                                                                |
| ✅ **Validasi Rute**                        | Semua 176 rute API sekarang divalidasi dengan skema Zod + `validateBody()` — tiket CI `check:route-validation:t06`                                                                     |
| 🐛 **Kebocoran Tag omniModel**              | Tag `<omniModel>` internal tidak lagi bocor ke klien dalam respons streaming SSE (#585)                                                                                                |
| 🔑 **API Kunci Terdaftar**                  | Kunci API penyediaan otomatis melalui `POST /api/v1/registered-keys` dengan penerapan kuota per penyedia/akun, idempotensi, penyimpanan SHA-256, dan pelaporan masalah GitHub opsional |
| 🎨 **Ikon Penyedia**                        | 130+ logo penyedia melalui `@lobehub/icons` (SVG) dengan PNG → rantai fallback umum                                                                                                    |
| 🔄 **Sinkronisasi Otomatis Model**          | Penjadwal 24 jam dan UI manual beralih untuk menyinkronkan daftar model untuk penyedia bawaan dan kustom yang kompatibel dengan OpenAI                                                 |
| 🌐 **OpenCode Zen/Go**                      | Dua penyedia baru dari @kang-heewon melalui PR #530: tingkat gratis + tingkat berlangganan melalui `OpencodeExecutor`                                                                  |
| 🐛 **Gemini CLI OAuth**                     | Kesalahan yang dapat ditindaklanjuti ketika `GEMINI_OAUTH_CLIENT_SECRET` hilang di Docker (adalah kesalahan Google yang samar)                                                         |
| 🐛 **Konfigurasi OpenCode**                 | `saveOpenCodeConfig()` sekarang menulis TOML dengan benar ke `XDG_CONFIG_HOME`                                                                                                         |
| 🐛 **Penggantian model yang dipasangi pin** | `body.model` disetel dengan benar ke `pinnedModel` pada perlindungan cache konteks                                                                                                     |
| 🐛 **Perulangan Kodeks/Claude**             | `tool_result` blok sekarang diubah menjadi teks untuk menghentikan loop tak terbatas                                                                                                   |
| 🐛 **Pengalihan masuk**                     | Login tidak lagi macet setelah melewatkan pengaturan kata sandi                                                                                                                        |
| 🐛 **Jalur Windows**                        | Jalur MSYS2/Git-Bash (`/c/...`) dinormalisasi menjadi `C:\...` secara otomatis                                                                                                         |

---

## 🖼️ Dasbor Utama

<div align="center">
  <img src="./docs/screenshots/MainOmniRoute.png" alt="OmniRoute Dashboard" width="800"/>
</div>

---

## 📸 Pratinjau Dasbor

<details>
<summary><b>Klik untuk melihat tangkapan layar dasbor</b></summary>

| Halaman            | Tangkapan layar                                   |
| ------------------ | ------------------------------------------------- |
| **Penyedia**       | ![Providers](docs/screenshots/01-providers.png)   |
| **Kombo**          | ![Combos](docs/screenshots/02-combos.png)         |
| **Analitik**       | ![Analytics](docs/screenshots/03-analytics.png)   |
| **Kesehatan**      | ![Health](docs/screenshots/04-health.png)         |
| **Penerjemah**     | ![Translator](docs/screenshots/05-translator.png) |
| **Pengaturan**     | ![Settings](docs/screenshots/06-settings.png)     |
| **Alat CLI**       | ![CLI Tools](docs/screenshots/07-cli-tools.png)   |
| **Log Penggunaan** | ![Usage](docs/screenshots/08-usage.png)           |
| **Titik Akhir**    | ![Endpoints](docs/screenshots/09-endpoint.png)    |

</details>

---

### 🤖 Penyedia AI gratis untuk agen coding favorit Anda

_Hubungkan alat IDE atau CLI apa pun yang didukung AI melalui OmniRoute — gerbang API gratis untuk pengkodean tanpa batas._

  <table>
    <tr>
      <td align="center" width="110">
        <a href="https://github.com/openclaw/openclaw">
          <img src="./public/providers/openclaw.png" alt="OpenClaw" width="48"/><br/>
          <b>OpenClaw</b>
        </a><br/>
        <sub>⭐ 205K</sub>
      </td>
      <td align="center" width="110">
        <a href="https://github.com/HKUDS/nanobot">
          <img src="./public/providers/nanobot.png" alt="NanoBot" width="48"/><br/>
          <b>NanoBot</b>
        </a><br/>
        <sub>⭐ 20.9K</sub>
      </td>
      <td align="center" width="110">
        <a href="https://github.com/sipeed/picoclaw">
          <img src="./public/providers/picoclaw.jpg" alt="PicoClaw" width="48"/><br/>
          <b>PicoClaw</b>
        </a><br/>
        <sub>⭐ 14.6K</sub>
      </td>
      <td align="center" width="110">
        <a href="https://github.com/zeroclaw-labs/zeroclaw">
          <img src="./public/providers/zeroclaw.png" alt="ZeroClaw" width="48"/><br/>
          <b>ZeroClaw</b>
        </a><br/>
        <sub>⭐ 9.9K</sub>
      </td>
      <td align="center" width="110">
        <a href="https://github.com/nearai/ironclaw">
          <img src="./public/providers/ironclaw.png" alt="IronClaw" width="48"/><br/>
          <b>IronClaw</b>
        </a><br/>
        <sub>⭐ 2.1K</sub>
      </td>
    </tr>
    <tr>
      <td align="center" width="110">
        <a href="https://github.com/anomalyco/opencode">
          <img src="./public/providers/opencode.svg" alt="OpenCode" width="48"/><br/>
          <b>OpenCode</b>
        </a><br/>
        <sub>⭐ 106K</sub>
      </td>
      <td align="center" width="110">
        <a href="https://github.com/openai/codex">
          <img src="./public/providers/codex.png" alt="Codex CLI" width="48"/><br/>
          <b>Codex CLI</b>
        </a><br/>
        <sub>⭐ 60.8K</sub>
      </td>
      <td align="center" width="110">
        <a href="https://github.com/anthropics/claude-code">
          <img src="./public/providers/claude.png" alt="Claude Code" width="48"/><br/>
          <b>Claude Code</b>
        </a><br/>
        <sub>⭐ 67.3K</sub>
      </td>
      <td align="center" width="110">
        <a href="https://github.com/google-gemini/gemini-cli">
          <img src="./public/providers/gemini-cli.png" alt="Gemini CLI" width="48"/><br/>
          <b>Gemini CLI</b>
        </a><br/>
        <sub>⭐ 94.7K</sub>
      </td>
      <td align="center" width="110">
        <a href="https://github.com/Kilo-Org/kilocode">
          <img src="./public/providers/kilocode.png" alt="Kilo Code" width="48"/><br/>
          <b>Kilo Code</b>
        </a><br/>
        <sub>⭐ 15.5K</sub>
      </td>
    </tr>
  </table>

<sub>📡 Semua agen terhubung melalui <code>http://localhost:20128/v1</code> atau <code>http://cloud.omniroute.online/v1</code> — satu konfigurasi, model tak terbatas, dan kuota</sub>

---

## 🤔 Mengapa OmniRoute?

**Berhenti membuang-buang uang dan mencapai batas:**

- <img src="https://img.shields.io/badge/✗-e74c3c?style=flat-square" height="16"/> Kuota berlangganan habis tanpa terpakai setiap bulannya
- <img src="https://img.shields.io/badge/✗-e74c3c?style=flat-square" height="16"/> Batas kecepatan menghentikan Anda di tengah coding
- <img src="https://img.shields.io/badge/✗-e74c3c?style=flat-square" height="16"/> API mahal ($20-50/bulan per penyedia)
- <img src="https://img.shields.io/badge/✗-e74c3c?style=flat-square" height="16"/> Peralihan antar penyedia secara manual

**OmniRoute memecahkan masalah ini:**

- ✅ **Maksimalkan langganan** - Lacak kuota, gunakan setiap bit sebelum menyetel ulang
- ✅ **Pengembalian otomatis** - Berlangganan → Kunci API → Murah → Gratis, tanpa downtime
- ✅ **Multi-akun** - Round-robin antar akun per penyedia
- ✅ **Universal** - Bekerja dengan Claude Code, Codex, Gemini CLI, Cursor, Cline, OpenClaw, alat CLI apa pun

---

## 📧 Dukungan

> 💬 **Bergabunglah dengan komunitas kami!** [WhatsApp Group](https://chat.whatsapp.com/JI7cDQ1GyaiDHhVBpLxf8b?mode=gi_t) — Dapatkan bantuan, berbagi kiat, dan dapatkan informasi terbaru.

- **Situs Web**: [omniroute.online](https://omniroute.online)
- **GitHub**: [github.com/diegosouzapw/OmniRoute](https://github.com/diegosouzapw/OmniRoute)
- **Masalah**: [github.com/diegosouzapw/OmniRoute/issues](https://github.com/diegosouzapw/OmniRoute/issues)
- **WhatsApp**: [Community Group](https://chat.whatsapp.com/JI7cDQ1GyaiDHhVBpLxf8b?mode=gi_t)
- **Berkontribusi**: Lihat [CONTRIBUTING.md](CONTRIBUTING.md), buka PR, atau pilih `good first issue`
- **Proyek Asli**: [9router by decolua](https://github.com/decolua/9router)

### 🐛 Melaporkan Bug?

Saat membuka masalah, jalankan perintah info sistem dan lampirkan file yang dihasilkan:

```bash
npm run system-info
```

Ini menghasilkan `system-info.txt` dengan versi Node.js, versi OmniRoute, detail OS, alat CLI yang diinstal (iflow, gemini, claude, codex, antigravity, droid, dll.), status Docker/PM2, dan paket sistem — semua yang kami perlukan untuk mereproduksi masalah Anda dengan cepat. Lampirkan file langsung ke masalah GitHub Anda.

---

## 🔄 Cara Kerjanya

```
┌─────────────┐
│  Your CLI   │  (Claude Code, Codex, Gemini CLI, OpenClaw, Cursor, Cline...)
│   Tool      │
└──────┬──────┘
       │ http://localhost:20128/v1
       ↓
┌─────────────────────────────────────────┐
│           OmniRoute (Smart Router)        │
│  • Format translation (OpenAI ↔ Claude) │
│  • Quota tracking + Embeddings + Images │
│  • Auto token refresh                   │
└──────┬──────────────────────────────────┘
       │
       ├─→ [Tier 1: SUBSCRIPTION] Claude Code, Codex, Gemini CLI
       │   ↓ quota exhausted
       ├─→ [Tier 2: API KEY] DeepSeek, Groq, xAI, Mistral, NVIDIA NIM, etc.
       │   ↓ budget limit
       ├─→ [Tier 3: CHEAP] GLM ($0.6/1M), MiniMax ($0.2/1M)
       │   ↓ budget limit
       └─→ [Tier 4: FREE] iFlow, Qwen, Kiro (unlimited)

Result: Never stop coding, minimal cost
```

---

## 🎯 Apa yang Dipecahkan OmniRoute — 30 Masalah Nyata & Kasus Penggunaan

> **Setiap pengembang yang menggunakan alat AI menghadapi masalah ini setiap hari.** OmniRoute dibuat untuk menyelesaikan semuanya — mulai dari pembengkakan biaya hingga pemblokiran regional, mulai dari aliran OAuth yang rusak hingga operasi protokol dan kemampuan observasi perusahaan.

<details>
<summary><b>💸 1. "Saya membayar langganan yang mahal tetapi masih terganggu oleh batasan"</b></summary>

Pengembang membayar $20–200/bulan untuk Claude Pro, Codex Pro, atau GitHub Copilot. Bahkan saat membayar, kuota memiliki batas tertinggi — penggunaan 5 jam, batas mingguan, atau batas tarif per menit. Di tengah sesi pengkodean, penyedia berhenti merespons dan pengembang kehilangan aliran dan produktivitas.

**Bagaimana OmniRoute menyelesaikannya:**

- **Smart 4-Tier Fallback** — Jika kuota berlangganan habis, otomatis dialihkan ke Kunci API → Murah → Gratis tanpa intervensi manual
- **Pelacakan Kuota Real-Time** — Menampilkan konsumsi token secara real-time dengan hitungan mundur reset (5 jam, harian, mingguan)
- **Dukungan Multi-Akun** — Beberapa akun per penyedia dengan sistem round-robin otomatis — jika satu akun habis, beralih ke akun berikutnya
- **Kombo Khusus** — Rantai cadangan yang dapat disesuaikan dengan 6 strategi penyeimbangan (isi terlebih dahulu, round-robin, P2C, acak, paling jarang digunakan, hemat biaya)
- **Codex Business Quotas** — Pemantauan kuota ruang kerja Bisnis/Tim langsung di dasbor

</details>

<details>
<summary><b>🔌 2. "Saya perlu menggunakan beberapa penyedia tetapi masing-masing memiliki API yang berbeda"</b></summary>

OpenAI menggunakan satu format, Claude (Anthropic) menggunakan format lain, Gemini menggunakan format lain. Jika pengembang ingin menguji model dari penyedia yang berbeda atau melakukan fallback di antara penyedia tersebut, mereka perlu mengonfigurasi ulang SDK, mengubah titik akhir, menangani format yang tidak kompatibel. Penyedia khusus (FriendLI, NIM) memiliki titik akhir model non-standar.

**Bagaimana OmniRoute menyelesaikannya:**

- **Titik Akhir Terpadu** — Satu `http://localhost:20128/v1` berfungsi sebagai proxy untuk 67+ penyedia
- **Terjemahan Format** — Otomatis dan transparan: OpenAI ↔ Claude ↔ Gemini ↔ Responses API
- **Sanitasi Respons** — Menghapus kolom non-standar (`x_groq`, `usage_breakdown`, `service_tier`) yang merusak OpenAI SDK v1.83+
- **Normalisasi Peran** — Mengonversi `developer` → `system` untuk penyedia non-OpenAI; `system` → `user` untuk GLM/ERNIE
- **Think Tag Extraction** — Mengekstrak `<think>` blok dari model seperti DeepSeek R1 ke dalam `reasoning_content` standar
- **Output Terstruktur untuk Gemini** — `json_schema` → `responseMimeType`/`responseSchema` konversi otomatis
- **`stream` defaultnya adalah `false`** — Sesuai dengan spesifikasi OpenAI, menghindari SSE yang tidak terduga di SDK Python/Rust/Go

</details>

<details>
<summary><b>🌐 3. "Penyedia AI saya memblokir wilayah/negara saya"</b></summary>

Penyedia seperti OpenAI/Codex memblokir akses dari wilayah geografis tertentu. Pengguna mendapatkan kesalahan seperti `unsupported_country_region_territory` selama koneksi OAuth dan API. Hal ini sangat membuat frustasi bagi pengembang dari negara-negara berkembang.

**Bagaimana OmniRoute menyelesaikannya:**

- **Konfigurasi Proksi 3 Tingkat** — Proksi yang dapat dikonfigurasi pada 3 tingkat: global (semua lalu lintas), per penyedia (hanya satu penyedia), dan per koneksi/kunci
- **Lencana Proksi Berkode Warna** — Indikator visual: 🟢 proksi global, 🟡 proksi penyedia, 🔵 proksi koneksi, selalu menampilkan IP
- **OAuth Token Exchange Through Proxy** — Aliran OAuth juga melewati proxy, menyelesaikan `unsupported_country_region_territory`
- **Tes Koneksi melalui Proxy** — Tes koneksi menggunakan proxy yang dikonfigurasi (tidak ada lagi bypass langsung)
- **Dukungan SOCKS5** — Dukungan proksi SOCKS5 penuh untuk perutean keluar
- **TLS Fingerprint Spoofing** — Sidik jari TLS mirip browser melalui `wreq-js` untuk melewati deteksi bot
- **🔏 Pencocokan Sidik Jari CLI** — Menyusun ulang header dan kolom isi agar cocok dengan tanda tangan biner CLI asli, sehingga secara drastis mengurangi risiko penandaan akun. IP proxy dipertahankan — Anda mendapatkan **dan** penyembunyian IP secara bersamaan

</details>

<details>
<summary><b>🆓 4. "Saya ingin menggunakan AI untuk coding tetapi saya tidak punya uang"</b></summary>

Tidak semua orang mampu membayar $20–200/bulan untuk berlangganan AI. Pelajar, pengembang dari negara-negara berkembang, penghobi, dan pekerja lepas memerlukan akses ke model berkualitas tanpa biaya.

**Bagaimana OmniRoute menyelesaikannya:**

- **Penyedia Tingkat Gratis Bawaan** — Dukungan asli untuk 100% penyedia gratis: iFlow (5 model tak terbatas melalui OAuth: kimi-k2-thinking, qwen3-coder-plus, deepseek-r1, minimax-m2, kimi-k2), Qwen (4 model tak terbatas: qwen3-coder-plus, qwen3-coder-flash, qwen3-coder-next, vision-model), Kiro (Claude + AWS Builder ID gratis), Gemini CLI (gratis 180 ribu token/bulan)
- **Ollama Cloud** — Model Ollama yang dihosting cloud di `api.ollama.com` dengan tingkat "Penggunaan ringan" gratis; gunakan awalan `ollamacloud/<model>`
- **Kombo Khusus Gratis** — Rantai `gc/gemini-3-flash → if/kimi-k2-thinking → qw/qwen3-coder-plus` = $0/bulan tanpa downtime
- **Akses Gratis NVIDIA NIM** — akses gratis dev-selamanya ~40 RPM ke 70+ model di build.nvidia.com (beralih dari kredit ke batas tarif murni)
- **Strategi Pengoptimalan Biaya** — Strategi perutean yang secara otomatis memilih penyedia termurah yang tersedia

</details>

<details>
<summary><b>🔒 5. "Saya perlu melindungi gateway AI saya dari akses tidak sah"</b></summary>

Saat mengekspos gateway AI ke jaringan (LAN, VPS, Docker), siapa pun yang memiliki alamat tersebut dapat menggunakan token/kuota pengembang. Tanpa perlindungan, API rentan terhadap penyalahgunaan, injeksi cepat, dan penyalahgunaan.

**Bagaimana OmniRoute menyelesaikannya:**

- **Manajemen Kunci API** — Pembuatan, rotasi, dan pelingkupan per penyedia dengan halaman `/dashboard/api-manager` khusus
- **Izin Tingkat Model** — Membatasi kunci API untuk model tertentu (`openai/*`, pola karakter pengganti), dengan tombol Izinkan Semua/Batasi
- **Perlindungan Titik Akhir API** — Memerlukan kunci untuk `/v1/models` dan memblokir penyedia tertentu dari daftar
- **Auth Guard + Perlindungan CSRF** — Semua rute dasbor dilindungi dengan middleware `withAuth` + token CSRF
- **Pembatas Kecepatan** — Pembatasan kecepatan per-IP dengan jendela yang dapat dikonfigurasi
- **Pemfilteran IP** — Daftar yang diizinkan/daftar blokir untuk kontrol akses
- **Prompt Injection Guard** — Sanitasi terhadap pola prompt berbahaya
- **Enkripsi AES-256-GCM** — Kredensial dienkripsi saat disimpan

</details>

<details>
<summary><b>🛑 6. "Penyedia saya down dan saya kehilangan alur pengkodean"</b></summary>

Penyedia AI bisa menjadi tidak stabil, menampilkan kesalahan 5xx, atau mencapai batas kapasitas sementara. Jika pengembang bergantung pada satu penyedia, mereka akan terganggu. Tanpa pemutus sirkuit, percobaan ulang yang berulang-ulang dapat membuat aplikasi crash.

**Bagaimana OmniRoute menyelesaikannya:**

- **Pemutus Sirkuit per model** — Buka/tutup otomatis dengan ambang batas dan cooldown yang dapat dikonfigurasi (Tertutup/Terbuka/Setengah Terbuka), tercakup per model untuk menghindari blok berjenjang
- **Kemunduran Eksponensial** — Penundaan percobaan ulang yang progresif
- **Kawanan Anti-Guntur** — Perlindungan mutex + semaphore terhadap badai percobaan ulang secara bersamaan
- **Combo Fallback Chains** — Jika penyedia utama gagal, otomatis gagal dalam rantai tanpa intervensi
- **Combo Circuit Breaker** — Menonaktifkan secara otomatis penyedia yang gagal dalam rantai kombo
- **Dasbor Kesehatan** — Pemantauan waktu aktif, status pemutus sirkuit, penguncian, statistik cache, latensi p50/p95/p99

</details>

<details>
<summary><b>🔧 7. "Mengonfigurasi setiap alat AI itu membosankan dan berulang-ulang"</b></summary>

Pengembang menggunakan Cursor, Claude Code, Codex CLI, OpenClaw, Gemini CLI, Kilo Code... Setiap alat memerlukan konfigurasi yang berbeda (titik akhir API, kunci, model). Mengonfigurasi ulang saat berpindah penyedia atau model hanya membuang-buang waktu.

**Bagaimana OmniRoute menyelesaikannya:**

- **Dasbor Alat CLI** — Halaman khusus dengan pengaturan sekali klik untuk Claude Code, Codex CLI, OpenClaw, Kilo Code, Antigravity, Cline
- **GitHub Copilot Config Generator** — Menghasilkan `chatLanguageModels.json` untuk VS Code dengan pemilihan model massal
- **Onboarding Wizard** — Panduan penyiapan 4 langkah untuk pengguna pertama kali
- **Satu titik akhir, semua model** — Konfigurasikan `http://localhost:20128/v1` sekali, akses 67+ penyedia

</details>

<details>
<summary><b>🔑 8. "Mengelola token OAuth dari banyak penyedia adalah neraka"</b></summary>

Claude Code, Codex, Gemini CLI, Copilot — semuanya menggunakan OAuth 2.0 dengan token yang kedaluwarsa. Pengembang perlu terus mengautentikasi ulang, menangani `client_secret is missing`, `redirect_uri_mismatch`, dan kegagalan pada server jarak jauh. OAuth pada LAN/VPS sangat bermasalah.

**Bagaimana OmniRoute menyelesaikannya:**

- **Penyegaran Token Otomatis** — Penyegaran token OAuth di latar belakang sebelum masa berlakunya habis
- **OAuth 2.0 (PKCE) Bawaan** — Aliran otomatis untuk Claude Code, Codex, Gemini CLI, Copilot, Kiro, Qwen, iFlow
- **OAuth Multi-Akun** — Beberapa akun per penyedia melalui ekstraksi token JWT/ID
- **OAuth LAN/Remote Fix** — Deteksi IP pribadi untuk `redirect_uri` + mode URL manual untuk server jarak jauh
- **OAuth Dibalik Nginx** — Menggunakan `window.location.origin` untuk kompatibilitas proxy terbalik
- **Panduan OAuth Jarak Jauh** — Panduan langkah demi langkah untuk kredensial Google Cloud di VPS/Docker

</details>

<details>
<summary><b>📊 9. "Saya tidak tahu berapa banyak yang saya belanjakan atau di mana"</b></summary>

Pengembang menggunakan beberapa penyedia berbayar tetapi tidak memiliki pandangan terpadu mengenai pembelanjaan. Setiap penyedia memiliki dasbor penagihannya sendiri, namun tidak ada tampilan gabungan. Biaya tak terduga bisa menumpuk.

**Bagaimana OmniRoute menyelesaikannya:**

- **Dasbor Analisis Biaya** — Pelacakan biaya per token dan pengelolaan anggaran per penyedia
- **Batas Anggaran per Tingkat** — Batas pembelanjaan per tingkat yang memicu penggantian otomatis
- **Konfigurasi Harga Per Model** — Harga per model yang dapat dikonfigurasi
- **Statistik Penggunaan Per Kunci API** — Jumlah permintaan dan stempel waktu terakhir digunakan per kunci
- **Dasbor Analytics** — Kartu statistik, diagram penggunaan model, tabel penyedia dengan tingkat keberhasilan dan latensi

</details>

<details>
<summary><b>🐛 10. "Saya tidak dapat mendiagnosis kesalahan dan masalah dalam panggilan AI"</b></summary>

Saat panggilan gagal, pengembang tidak mengetahui apakah itu batas kecepatan, token kedaluwarsa, format salah, atau kesalahan penyedia. Log terfragmentasi di terminal yang berbeda. Tanpa observabilitas, debugging adalah trial-and-error.

**Bagaimana OmniRoute menyelesaikannya:**

- **Dasbor Log Terpadu** — 4 tab: Log Permintaan, Log Proksi, Log Audit, Konsol
- **Penampil Log Konsol** — Penampil gaya terminal real-time dengan level kode warna, gulir otomatis, pencarian, filter
- **Log Proxy SQLite** — Log persisten yang bertahan saat server dimulai ulang
- **Translator Playground** — 4 mode debugging: Playground (terjemahan format), Chat Tester (pulang pergi), Test Bench (batch), Live Monitor (real-time)
- **Telemetri Permintaan** — latensi p50/p95/p99 + penelusuran X-Request-Id
- **Logging Berbasis File dengan Rotasi** — Pencegat konsol menangkap semuanya ke log JSON dengan rotasi berbasis ukuran
- **Laporan Info Sistem** — `npm run system-info` menghasilkan `system-info.txt` dengan lingkungan lengkap Anda (versi Node, versi OmniRoute, OS, alat CLI, status Docker/PM2). Lampirkan saat melaporkan masalah untuk triase instan.

</details>

<details>
<summary><b>🏗️ 11. "Menyebarkan dan memelihara gateway itu rumit"</b></summary>

Menginstal, mengonfigurasi, dan memelihara proksi AI di berbagai lingkungan (lokal, VPS, Docker, cloud) membutuhkan banyak tenaga. Masalah seperti jalur hardcode, `EACCES` pada direktori, konflik port, dan pembangunan lintas platform menambah gesekan.

**Bagaimana OmniRoute menyelesaikannya:**

- **instal global npm** — `npm install -g omniroute && omniroute` — selesai
- **Docker Multi-Platform** — asli AMD64 + ARM64 (Apple Silicon, AWS Graviton, Raspberry Pi)
- **Docker Compose Profiles** — `base` (tanpa alat CLI) dan `cli` (dengan Claude Code, Codex, OpenClaw)
- **Aplikasi Desktop Electron** — Aplikasi asli untuk Windows/macOS/Linux dengan baki sistem, mulai otomatis, mode offline
- **Mode Port Terpisah** — API dan Dasbor pada port terpisah untuk skenario tingkat lanjut (proksi terbalik, jaringan kontainer)
- **Cloud Sync** — Konfigurasi sinkronisasi antar perangkat melalui Cloudflare Workers
- **DB Backups** — Pencadangan otomatis, pemulihan, ekspor dan impor semua pengaturan

</details>

<details>
<summary><b>🌍 12. "Antarmuka hanya berbahasa Inggris dan tim saya tidak bisa berbahasa Inggris"</b></summary>

Tim di negara-negara yang tidak berbahasa Inggris, khususnya di Amerika Latin, Asia, dan Eropa, kesulitan dengan antarmuka yang hanya berbahasa Inggris. Hambatan bahasa mengurangi adopsi dan meningkatkan kesalahan konfigurasi.

**Bagaimana OmniRoute menyelesaikannya:**

- **Dasbor i18n — 30 Bahasa** — 500+ tombol diterjemahkan termasuk Arab, Bulgaria, Denmark, Jerman, Spanyol, Finlandia, Prancis, Ibrani, Hindi, Hungaria, Indonesia, Italia, Jepang, Korea, Melayu, Belanda, Norwegia, Polandia, Portugis (PT/BR), Rumania, Rusia, Slovakia, Swedia, Thailand, Ukraina, Vietnam, China, Filipina, Inggris
- **Dukungan RTL** — Dukungan kanan ke kiri untuk bahasa Arab dan Ibrani
- **README Multi-Bahasa** — 30 terjemahan dokumentasi lengkap
- **Pemilih Bahasa** — Ikon bola dunia di header untuk peralihan waktu nyata

</details>

<details>
<summary><b>🔄 13. "Saya memerlukan lebih dari sekedar chat — saya memerlukan embeddings, gambar, audio"</b></summary>

AI bukan hanya penyelesaian obrolan. Pengembang perlu membuat gambar, mentranskripsikan audio, membuat penyematan untuk RAG, mengubah peringkat dokumen, dan memoderasi konten. Setiap API memiliki titik akhir dan format yang berbeda.

**Bagaimana OmniRoute menyelesaikannya:**

- **Sematan** — `/v1/embeddings` dengan 6 penyedia dan 9+ model
- **Pembuatan Gambar** — `/v1/images/generations` dengan 10 penyedia dan 20+ model (OpenAI, xAI, Together, Fireworks, Nebius, Hyperbolic, NanoBanana, Antigravity, SD WebUI, ComfyUI)
- **Teks-ke-Video** — `/v1/videos/generations` — ComfyUI (AnimateDiff, SVD) dan SD WebUI
- **Teks-ke-Musik** — `/v1/music/generations` — ComfyUI (Audio Terbuka Stabil, MusicGen)
- **Transkripsi Audio** — `/v1/audio/transcriptions` — Whisper + Nvidia NIM, HuggingFace, Qwen3
- **Text-to-Speech** — `/v1/audio/speech` — ElevenLabs, Nvidia NIM, HuggingFace, Coqui, Tortoise, Qwen3, **Inworld**, **Cartesia**, **PlayHT**, + penyedia yang ada
- **Moderasi** — `/v1/moderations` — Pemeriksaan keamanan konten
- **Pemeringkatan ulang** — `/v1/rerank` — Pemeringkatan ulang relevansi dokumen
- **Respon API** — Dukungan penuh `/v1/responses` untuk Codex

</details>

<details>
<summary><b>🧪 14. "Saya tidak punya cara untuk menguji dan membandingkan kualitas antar model"</b></summary>

Pengembang ingin mengetahui model mana yang terbaik untuk kasus penggunaan mereka — kode, terjemahan, penalaran — tetapi membandingkan secara manual itu lambat. Tidak ada alat evaluasi terintegrasi.

**Bagaimana OmniRoute menyelesaikannya:**

- **Evaluasi LLM** — Pengujian set emas dengan 10 kasus yang dimuat sebelumnya yang mencakup salam, matematika, geografi, pembuatan kode, kepatuhan JSON, terjemahan, penurunan harga, penolakan keamanan
- **4 Strategi Pertandingan** — `exact`, `contains`, `regex`, `custom` (fungsi JS)
- **Bangku Tes Taman Bermain Penerjemah** — Pengujian batch dengan banyak masukan dan keluaran yang diharapkan, perbandingan lintas penyedia
- **Penguji Obrolan** — Perjalanan bolak-balik penuh dengan rendering respons visual
- **Monitor Langsung** — Aliran real-time dari semua permintaan yang mengalir melalui proxy

</details>

<details>
<summary><b>📈 15. "Saya perlu meningkatkan skala tanpa kehilangan performa"</b></summary>

Seiring bertambahnya volume permintaan, tanpa menyimpan pertanyaan yang sama akan menghasilkan biaya duplikat. Tanpa idempotensi, permintaan duplikat akan membuang-buang pemrosesan. Batasan tarif per penyedia harus dipatuhi.

**Bagaimana OmniRoute menyelesaikannya:**

- **Cache Semantik** — Cache dua tingkat (tanda tangan + semantik) mengurangi biaya dan latensi
- **Request Idempoency** — Jendela deduplikasi 5 detik untuk permintaan yang identik
- **Deteksi Batas Tarif** — RPM per penyedia, selisih minimum, dan pelacakan serentak maks
- **Batas Nilai yang Dapat Diedit** — Default yang dapat dikonfigurasi di Pengaturan → Ketahanan dengan persistensi
- **Cache Validasi Kunci API** — cache 3 tingkat untuk kinerja produksi
- **Dasbor Kesehatan dengan Telemetri** — latensi p50/p95/p99, statistik cache, waktu aktif

</details>

<details>
<summary><b>🤖 16. "Saya ingin mengontrol perilaku model secara global"</b></summary>

Pengembang yang menginginkan semua respons dalam bahasa tertentu, dengan nada tertentu, atau ingin membatasi token penalaran. Mengonfigurasi ini di setiap alat/permintaan tidak praktis.

**Bagaimana OmniRoute menyelesaikannya:**

- **Injeksi Perintah Sistem** — Perintah global diterapkan ke semua permintaan
- **Validasi Anggaran Berpikir** — Kontrol alokasi token penalaran per permintaan (passthrough, otomatis, kustom, adaptif)
- **6 Strategi Perutean** — Strategi global yang menentukan cara permintaan didistribusikan
- **Wildcard Router** — pola `provider/*` merutekan secara dinamis ke penyedia mana pun
- **Combo Aktifkan/Nonaktifkan Toggle** — Beralih kombo langsung dari dasbor
- **Toggle Penyedia** — Mengaktifkan/menonaktifkan semua koneksi untuk penyedia dengan satu klik
- **Penyedia yang Diblokir** — Kecualikan penyedia tertentu dari daftar `/v1/models`

</details>

<details>
<summary><b>🧰 17. "Saya membutuhkan alat MCP sebagai kemampuan produk kelas satu"</b></summary>

Banyak gateway AI yang mengekspos MCP hanya sebagai detail implementasi yang tersembunyi. Tim memerlukan lapisan operasi yang terlihat dan dapat dikelola.

**Bagaimana OmniRoute menyelesaikannya:**

- MCP muncul di navigasi dasbor dan tab protokol titik akhir
- Halaman manajemen MCP khusus dengan proses, alat, cakupan, dan audit
- Mulai cepat bawaan untuk `omniroute --mcp` dan orientasi klien

</details>

<details>
<summary><b>🧠 18. "Saya memerlukan orkestrasi A2A dengan jalur tugas sinkronisasi + aliran"</b></summary>

Alur kerja agen memerlukan balasan langsung dan eksekusi streaming jangka panjang dengan kontrol siklus hidup.

**Bagaimana OmniRoute menyelesaikannya:**

- Titik akhir A2A JSON-RPC (`POST /a2a`) dengan `message/send` dan `message/stream`
- Streaming SSE dengan propagasi status terminal
- API siklus hidup tugas untuk `tasks/get` dan `tasks/cancel`

</details>

<details>
<summary><b>🛰️ 19. "Saya membutuhkan kesehatan proses MCP yang nyata, bukan status yang dapat ditebak"</b></summary>

Tim operasional perlu mengetahui apakah MCP benar-benar aktif, bukan hanya apakah API dapat dijangkau.

**Bagaimana OmniRoute menyelesaikannya:**

- File detak jantung runtime dengan PID, stempel waktu, transportasi, jumlah alat, dan mode cakupan
- API status MCP menggabungkan detak jantung + aktivitas terkini
- Kartu status UI untuk kesegaran proses/waktu aktif/detak jantung

</details>

<details>
<summary><b>📋 20. "Saya memerlukan eksekusi alat MCP yang dapat diaudit"</b></summary>

Saat alat mengubah konfigurasi atau memicu tindakan operasi, tim memerlukan kemampuan penelusuran forensik.

**Bagaimana OmniRoute menyelesaikannya:**

- Pencatatan audit yang didukung SQLite untuk panggilan alat MCP
- Filter berdasarkan alat, keberhasilan/kegagalan, kunci API, dan penomoran halaman
- Tabel audit dasbor + titik akhir statistik untuk otomatisasi

</details>

<details>
<summary><b>🔐 21. "Saya memerlukan izin MCP terbatas per integrasi"</b></summary>

Klien yang berbeda harus memiliki akses dengan hak istimewa paling rendah ke kategori alat.

**Bagaimana OmniRoute menyelesaikannya:**

- 9 cakupan MCP granular untuk akses alat terkontrol
- Penegakan cakupan dan visibilitas di UI manajemen MCP
- Postur default yang aman untuk perkakas operasional

</details>

<details>
<summary><b>⚙️ 22. "Saya memerlukan kontrol operasional tanpa memindahkan"</b></summary>

Tim memerlukan perubahan runtime yang cepat selama insiden atau peristiwa biaya.

**Bagaimana OmniRoute menyelesaikannya:**

- Beralih aktivasi kombo langsung dari dasbor MCP
- Menerapkan profil ketahanan dari paket kebijakan yang telah ditentukan sebelumnya
- Reset status pemutus sirkuit dari panel operasi yang sama

</details>

<details>
<summary><b>🔄 23. "Saya memerlukan visibilitas dan pembatalan siklus hidup tugas A2A langsung"</b></summary>

Tanpa visibilitas siklus hidup, insiden tugas menjadi sulit untuk diprioritaskan.

**Bagaimana OmniRoute menyelesaikannya:**

- Daftar tugas/pemfilteran berdasarkan status/keterampilan dengan penomoran halaman
- Telusuri metadata tugas, peristiwa, dan artefak
- Titik akhir pembatalan tugas dan tindakan UI dengan konfirmasi

</details>

<details>
<summary><b>🌊 24. "Saya memerlukan metrik aliran aktif untuk memuat A2A"</b></summary>

Alur kerja streaming memerlukan wawasan operasional tentang konkurensi dan koneksi langsung.

**Bagaimana OmniRoute menyelesaikannya:**

- Penghitung aliran aktif terintegrasi ke dalam status A2A
- Stempel waktu tugas terakhir dan jumlah per negara bagian
- Kartu dasbor A2A untuk pemantauan operasi waktu nyata

</details>

<details>
<summary><b>🪪 25. "Saya memerlukan penemuan agen standar untuk klien"</b></summary>

Klien dan orkestra eksternal memerlukan metadata yang dapat dibaca mesin untuk orientasi.

**Bagaimana OmniRoute menyelesaikannya:**

- Kartu Agen terungkap di `/.well-known/agent.json`
- Kemampuan dan keterampilan yang ditunjukkan dalam manajemen UI
- API status A2A mencakup metadata penemuan untuk otomatisasi

</details>

<details>
<summary><b>🧭 26. "Saya memerlukan protokol yang dapat ditemukan di UX produk"</b></summary>

Jika pengguna tidak dapat menemukan permukaan protokol, kualitas adopsi dan dukungan akan menurun.

**Bagaimana OmniRoute menyelesaikannya:**

- Halaman **Endpoint** terkonsolidasi dengan tab untuk Proxy, MCP, A2A, dan API Endpoints
- Pengalih status layanan inline (Online/Offline) untuk MCP dan A2A
- Tautan dari ikhtisar ke tab manajemen khusus

</details>

<details>
<summary><b>🧪 27. "Saya memerlukan validasi protokol end-to-end dengan klien nyata"</b></summary>

Tes tiruan tidak cukup untuk memvalidasi kompatibilitas protokol sebelum rilis.

**Bagaimana OmniRoute menyelesaikannya:**

- Suite E2E yang mem-boot aplikasi dan menggunakan transportasi klien MCP SDK yang sebenarnya
- Klien A2A menguji penemuan, pengiriman, streaming, dapatkan, dan pembatalan aliran
- Periksa silang pernyataan terhadap audit MCP dan API tugas A2A

</details>

<details>
<summary><b>📡 28. "Saya memerlukan observabilitas terpadu di semua antarmuka"</b></summary>

Memisahkan observabilitas berdasarkan protokol menciptakan titik buta dan MTTR yang lebih panjang.

**Bagaimana OmniRoute menyelesaikannya:**

- Dasbor/log/analitik terpadu dalam satu produk
- Kesehatan + audit + permintaan telemetri di seluruh lapisan OpenAI, MCP, dan A2A
- API Operasional untuk status dan otomatisasi

</details>

<details>
<summary><b>💼 29. "Saya memerlukan satu runtime untuk proxy + alat + orkestrasi agen"</b></summary>

Menjalankan banyak layanan terpisah akan meningkatkan biaya operasional dan mode kegagalan.

**Bagaimana OmniRoute menyelesaikannya:**

- Proksi yang kompatibel dengan OpenAI, server MCP, dan server A2A dalam satu tumpukan
- Otentikasi bersama, ketahanan, penyimpanan data, dan kemampuan observasi
- Model kebijakan yang konsisten di seluruh platform interaksi

</details>

<details>
<summary><b>🚀 30. "Saya perlu mengirimkan alur kerja agen tanpa gepeng kode lem"</b></summary>

Tim kehilangan kecepatan saat menggabungkan beberapa layanan dan skrip ad-hoc.

**Bagaimana OmniRoute menyelesaikannya:**

- Strategi titik akhir terpadu untuk klien dan agen
- UI manajemen protokol bawaan dan jalur validasi asap
- Fondasi siap produksi (keamanan, logging, ketahanan, cadangan)

</details>

### Contoh Playbook (Kasus Penggunaan Terintegrasi)

**Playbook A: Maksimalkan langganan berbayar + cadangan murah**

```txt
Combo: "maximize-claude"
  1. cc/claude-opus-4-6
  2. glm/glm-4.7
  3. if/kimi-k2-thinking

Monthly cost: $20 + small backup spend
Outcome: higher quality, near-zero interruption
```

**Playbook B: Tumpukan coding tanpa biaya**

```txt
Combo: "free-forever"
  1. gc/gemini-3-flash
  2. if/kimi-k2-thinking
  3. qw/qwen3-coder-plus

Monthly cost: $0
Outcome: stable free coding workflow
```

**Playbook C: Rantai fallback yang selalu aktif 24/7**

```txt
Combo: "always-on"
  1. cc/claude-opus-4-6
  2. cx/gpt-5.2-codex
  3. glm/glm-4.7
  4. minimax/MiniMax-M2.1
  5. if/kimi-k2-thinking

Outcome: deep fallback depth for deadline-critical workloads
```

**Playbook D: Operasi agen dengan MCP + A2A**

```txt
1) Start MCP transport (`omniroute --mcp`) for tool-driven operations
2) Run A2A tasks via `message/send` and `message/stream`
3) Observe via /dashboard/endpoint (MCP and A2A tabs)
4) Toggle services via inline status controls
```

---

## 🆓 Mulai Gratis — Tanpa Biaya Konfigurasi

> Siapkan pengkodean AI dalam hitungan menit di **$0/bulan**. Hubungkan akun gratis ini dan gunakan kombo **Free Stack** bawaan.

| Langkah | Aksi                                                   | Penyedia Tidak Terkunci                                                  |
| ------- | ------------------------------------------------------ | ------------------------------------------------------------------------ |
| 1       | Hubungkan **Kiro** (AWS Builder ID OAuth)              | Claude Sonnet 4.5, Haiku 4.5 — **tidak terbatas**                        |
| 2       | Hubungkan **iFlow** (Google OAuth)                     | pemikiran kimi-k2, qwen3-coder-plus, deepseek-r1... — **tidak terbatas** |
| 3       | Hubungkan **Qwen** (Kode Perangkat)                    | qwen3-coder-plus, qwen3-coder-flash... — **tidak terbatas**              |
| 4       | Hubungkan **Gemini CLI** (Google OAuth)                | gemini-3-flash, gemini-2.5-pro — **180K/bln gratis**                     |
| 5       | `/dashboard/combos` → **Templat Tumpukan Gratis ($0)** | Round-robin semua penyedia gratis secara otomatis                        |

**Arahkan IDE/CLI apa pun ke:** `http://localhost:20128/v1` · Kunci API: `any-string` · Selesai.

> **Cakupan ekstra opsional (juga gratis):** Kunci API Groq (gratis 30 RPM), NVIDIA NIM (gratis 40 RPM, 70+ model), Cerebras (1 juta tok/hari), kunci API LongCat (50 juta token/hari!), Cloudflare Workers AI (10 ribu neuron/hari, 50+ model).

## ⚡ Mulai Cepat

### 1) Instal dan jalankan

```bash
npm install -g omniroute
omniroute
```

> **pengguna pnpm:** Jalankan `pnpm approve-builds -g` setelah instalasi untuk mengaktifkan skrip build asli yang diperlukan oleh `better-sqlite3` dan `@swc/core`:
>
> ```bash
> pnpm install -g omniroute
> pnpm approve-builds -g   # Select all packages → approve
> omniroute
> ```

Dasbor terbuka di `http://localhost:20128` dan URL dasar API adalah `http://localhost:20128/v1`.

| Perintah                | Deskripsi                                                       |
| ----------------------- | --------------------------------------------------------------- |
| `omniroute`             | Mulai server (`PORT=20128`, API dan dasbor pada port yang sama) |
| `omniroute --port 3000` | Setel port kanonik/API ke 3000                                  |
| `omniroute --mcp`       | Mulai server MCP (stdio transport)                              |
| `omniroute --no-open`   | Jangan buka otomatis browser                                    |
| `omniroute --help`      | Tampilkan bantuan                                               |

Mode port terpisah opsional:

```bash
PORT=20128 DASHBOARD_PORT=20129 omniroute
# API:       http://localhost:20128/v1
# Dashboard: http://localhost:20129
```

### 2) Hubungkan penyedia dan buat kunci API Anda

1. Buka Dasbor → `Providers` dan sambungkan setidaknya satu penyedia (OAuth atau kunci API).
2. Buka Dasbor → `Endpoints` dan buat kunci API.
3. (Opsional) Buka Dasbor → `Combos` dan atur rantai cadangan Anda.

### 3) Arahkan alat pengkodean Anda ke OmniRoute

```txt
Base URL: http://localhost:20128/v1
API Key:  [copy from Endpoint page]
Model:    if/kimi-k2-thinking (or any provider/model prefix)
```

Bekerja dengan Claude Code, Codex CLI, Gemini CLI, Cursor, Cline, OpenClaw, OpenCode, dan SDK yang kompatibel dengan OpenAI.

### 4) Mengaktifkan dan memvalidasi protokol (v2.0)

**MCP (untuk operasi yang digerakkan oleh alat):**

```bash
omniroute --mcp
```

Kemudian sambungkan klien MCP Anda melalui `stdio` dan uji alat seperti:

- `omniroute_get_health`
- `omniroute_list_combos`

**A2A (untuk alur kerja agen-ke-agen):**

```bash
curl http://localhost:20128/.well-known/agent.json
```

```bash
curl -X POST http://localhost:20128/a2a \
  -H 'content-type: application/json' \
  -d '{"jsonrpc":"2.0","id":"quickstart","method":"message/send","params":{"skill":"quota-management","messages":[{"role":"user","content":"Give me a short quota summary."}]}}'
```

### 5) Validasi semuanya secara end-to-end (disarankan)

```bash
npm run test:protocols:e2e
```

Suite ini memvalidasi alur klien MCP dan A2A yang sebenarnya terhadap aplikasi yang sedang berjalan.

### Alternatif: dijalankan dari sumber

```bash
cp .env.example .env
npm install
PORT=20128 DASHBOARD_PORT=20129 NEXT_PUBLIC_BASE_URL=http://localhost:20129 npm run dev
```

---

## 🐳 buruh pelabuhan

OmniRoute tersedia sebagai image Docker publik di [Docker Hub](https://hub.docker.com/r/diegosouzapw/omniroute).

**Lari cepat:**

```bash
docker run -d \
  --name omniroute \
  --restart unless-stopped \
  -p 20128:20128 \
  -v omniroute-data:/app/data \
  diegosouzapw/omniroute:latest
```

**Dengan file lingkungan:**

```bash
# Copy and edit .env first
cp .env.example .env

docker run -d \
  --name omniroute \
  --restart unless-stopped \
  --env-file .env \
  -p 20128:20128 \
  -v omniroute-data:/app/data \
  diegosouzapw/omniroute:latest
```

**Menggunakan Docker Tulis:**

```bash
# Base profile (no CLI tools)
docker compose --profile base up -d

# CLI profile (Claude Code, Codex, OpenClaw built-in)
docker compose --profile cli up -d
```

| Gambar                   | Tandai   | Ukuran  | Deskripsi            |
| ------------------------ | -------- | ------- | -------------------- |
| `diegosouzapw/omniroute` | `latest` | ~250MB  | Rilis stabil terbaru |
| `diegosouzapw/omniroute` | `1.0.3`  | ~250 MB | Versi saat ini       |

---

## 🖥️ Aplikasi Desktop — Offline & Selalu Aktif

> 🆕 **BARU!** OmniRoute kini tersedia sebagai **aplikasi desktop asli** untuk Windows, macOS, dan Linux.

Jalankan OmniRoute sebagai aplikasi desktop mandiri — tanpa terminal, tanpa browser, tanpa internet untuk model lokal. Aplikasi berbasis Electron meliputi:

- 🖥️ **Jendela Asli** — Jendela aplikasi khusus dengan integrasi baki sistem
- 🔄 **Mulai Otomatis** — Luncurkan OmniRoute saat login sistem
- 🔔 **Pemberitahuan Asli** — Dapatkan peringatan jika kuota habis atau masalah penyedia
- ⚡ **Instal Sekali Klik** — NSIS (Windows), DMG (macOS), AppImage (Linux)
- 🌐 **Mode Offline** — Bekerja sepenuhnya offline dengan server yang dibundel

### Mulai Cepat

```bash
# Development mode
npm run electron:dev

# Build for your platform
npm run electron:build         # Current platform
npm run electron:build:win     # Windows (.exe)
npm run electron:build:mac     # macOS (.dmg) — x64 & arm64
npm run electron:build:linux   # Linux (.AppImage)
```

### Baki Sistem

Saat diminimalkan, OmniRoute ada di baki sistem Anda dengan tindakan cepat:

- Buka dasbor
- Ubah port server
- Keluar dari aplikasi

📖 Dokumentasi lengkap: [**OMNI_TOKEN_153**](electron/README.md)

---

## 💰 Sekilas tentang Harga

| Tingkat             | Penyedia                    | Biaya                               | Reset Kuota               | Terbaik Untuk                            |
| ------------------- | --------------------------- | ----------------------------------- | ------------------------- | ---------------------------------------- |
| **💳 BERLANGGANAN** | Kode Claude (Pro)           | $20/bln                             | 5 jam + mingguan          | Sudah berlangganan                       |
|                     | Kodeks (Plus/Pro)           | $20-200/bln                         | 5 jam + mingguan          | Pengguna OpenAI                          |
|                     | CLI Gemini                  | **GRATIS**                          | 180K/bln + 1K/hari        | Setiap orang!                            |
|                     | Kopilot GitHub              | $10-19/bln                          | Bulanan                   | Pengguna GitHub                          |
| **🔑 KUNCI API**    | NVIDIA NIM                  | **GRATIS** (pengembangan selamanya) | ~40 RPM                   | 70+ model terbuka                        |
|                     | Otak                        | **GRATIS** (1 juta tok/hari)        | 60K TPM / 30 RPM          | Tercepat di dunia                        |
|                     | Bagus                       | **GRATIS** (30 RPM)                 | RPD 14,4K                 | Llama/Gemma ultra-cepat                  |
|                     | DeepSeek V3.2               | $0,27/$1,10 per 1 juta              | Tidak ada                 | Alasan harga/kualitas terbaik            |
|                     | xAI Grok-4 Cepat            | **$0,20/$0,50 per 1 juta** 🆕       | Tidak ada                 | Panggilan alat + tercepat, sangat rendah |
|                     | xAI Grok-4 (standar)        | $0,20/$1,50 per 1 juta 🆕           | Tidak ada                 | Penalaran andalan dari xAI               |
|                     | Mistral                     | Uji coba gratis + berbayar          | Tarif terbatas            | AI Eropa                                 |
|                     | BukaRouter                  | Bayar per penggunaan                | Tidak ada                 | 100+ model agr.                          |
| **💰 MURAH**        | GLM-5 (melalui Z.AI) 🆕     | $0,5/1 juta                         | Setiap hari pukul 10 pagi | Output 128K, andalan terbaru             |
|                     | GLM-4.7                     | $0,6/1 juta                         | Setiap hari pukul 10 pagi | Cadangan anggaran                        |
|                     | MiniMax M2.5 🆕             | masukan $0,3/1 juta                 | 5 jam bergulir            | Penalaran + tugas agen                   |
|                     | MiniMax M2.1                | $0,2/1 juta                         | 5 jam bergulir            | Pilihan termurah                         |
|                     | Kimi K2.5 (API Moonshot) 🆕 | Bayar per penggunaan                | Tidak ada                 | Akses langsung Moonshot API              |
|                     | Kimi K2                     | $9/bln tetap                        | 10 juta token/bln         | Biaya yang dapat diprediksi              |
| **🆓 GRATIS**       | iFlow                       | **$0**                              | Tidak terbatas            | 5 model tidak terbatas                   |
|                     | Qwen                        | **$0**                              | Tidak terbatas            | 4 model tidak terbatas                   |
|                     | Kiro                        | **$0**                              | Tidak terbatas            | Claude Soneta/Haiku (Pembuat AWS)        |
|                     | LongCat Flash-Lite 🆕       | **$0** (50 juta tok/hari 🔥)        | 1RPS                      | Kuota gratis terbesar di dunia           |
|                     | Penyerbukan AI 🆕           | **$0** (tidak perlu kunci)          | 1 permintaan/15 detik     | GPT-5, Claude, DeepSeek, Llama 4         |
|                     | AI Pekerja Cloudflare 🆕    | **$0** (10K Neuron/hari)            | ~150 repetisi/hari        | 50+ model, keunggulan global             |
|                     | Scaleway AI 🆕              | **$0** (total 1 juta token)         | Tarif terbatas            | UE/GDPR, Qwen3 235B, Llama 70B           |

> 🆕 **Model baru ditambahkan (Mar 2026):** Keluarga Grok-4 Fast seharga $0,20/$0,50/M (dibandingkan pada 1143ms — 30% lebih cepat dari Gemini 2.5 Flash), GLM-5 melalui Z.AI dengan output 128K, penalaran MiniMax M2.5, harga DeepSeek V3.2 yang diperbarui, Kimi K2.5 melalui API langsung Moonshot.

**💡 Tumpukan Kombo $0 — Penyiapan Gratis Lengkap:**

```
# 🆓 Ultimate Free Stack 2026 — 11 Providers, $0 Forever
Kiro (kr/)             → Claude Sonnet/Haiku UNLIMITED
iFlow (if/)            → kimi-k2-thinking, qwen3-coder-plus, deepseek-r1 UNLIMITED
LongCat Lite (lc/)     → LongCat-Flash-Lite — 50M tokens/day 🔥
Pollinations (pol/)    → GPT-5, Claude, DeepSeek, Llama 4 — no key needed
Qwen (qw/)             → qwen3-coder-plus, qwen3-coder-flash, qwen3-coder-next UNLIMITED
Gemini (gemini/)       → Gemini 2.5 Flash — 1,500 req/day free API key
Cloudflare AI (cf/)    → Llama 70B, Gemma 3, Mistral — 10K Neurons/day
Scaleway (scw/)        → Qwen3 235B, Llama 70B — 1M free tokens (EU)
Groq (groq/)           → Llama/Gemma ultra-fast — 14.4K req/day
NVIDIA NIM (nvidia/)   → 70+ open models — 40 RPM forever
Cerebras (cerebras/)   → Llama/Qwen world-fastest — 1M tok/day
```

**Tanpa biaya. Jangan pernah berhenti melakukan pengkodean.** Konfigurasikan ini sebagai satu kombo OmniRoute dan semua fallback terjadi secara otomatis — tidak pernah ada peralihan manual.

---

---

## 🆓 Model Gratis — Apa yang Sebenarnya Anda Dapatkan

> Semua model di bawah **100% gratis tanpa memerlukan kartu kredit**. OmniRoute melakukan rute otomatis di antara keduanya ketika satu kuota habis — gabungkan semuanya untuk kombo $0 yang tidak dapat dipecahkan.

### 🔵 MODEL CLAUDE (melalui Kiro — ID AWS Builder)

| Model               | Awalan | Batasi             | Batas Tarif                            |
| ------------------- | ------ | ------------------ | -------------------------------------- |
| `claude-sonnet-4.5` | `kr/`  | **Tidak terbatas** | Tidak ada batas harian yang dilaporkan |
| `claude-haiku-4.5`  | `kr/`  | **Tidak terbatas** | Tidak ada batas harian yang dilaporkan |
| `claude-opus-4.6`   | `kr/`  | **Tidak terbatas** | Opus Terbaru melalui Kiro              |

### 🟢 MODEL IFLOW (OAuth Gratis — Tanpa Kartu Kredit)

| Model              | Awalan | Batasi             | Batas Tarif                     |
| ------------------ | ------ | ------------------ | ------------------------------- |
| `kimi-k2-thinking` | `if/`  | **Tidak terbatas** | Tidak ada batas yang dilaporkan |
| `qwen3-coder-plus` | `if/`  | **Tidak terbatas** | Tidak ada batas yang dilaporkan |
| `deepseek-r1`      | `if/`  | **Tidak terbatas** | Tidak ada batas yang dilaporkan |
| `minimax-m2.1`     | `if/`  | **Tidak terbatas** | Tidak ada batas yang dilaporkan |
| `kimi-k2`          | `if/`  | **Tidak terbatas** | Tidak ada batas yang dilaporkan |

### 🟡 MODEL QWEN (Otentikasi Kode Perangkat)

| Model               | Awalan | Batasi             | Batas Tarif                     |
| ------------------- | ------ | ------------------ | ------------------------------- |
| `qwen3-coder-plus`  | `qw/`  | **Tidak terbatas** | Tidak ada batas yang dilaporkan |
| `qwen3-coder-flash` | `qw/`  | **Tidak terbatas** | Tidak ada batas yang dilaporkan |
| `qwen3-coder-next`  | `qw/`  | **Tidak terbatas** | Tidak ada batas yang dilaporkan |
| `vision-model`      | `qw/`  | **Tidak terbatas** | Multimodal (gambar)             |

### 🟣 GEMINI CLI (Google OAuth)

| Model                    | Awalan | Batasi                         | Batas Tarif     |
| ------------------------ | ------ | ------------------------------ | --------------- |
| `gemini-3-flash-preview` | `gc/`  | **180rb tok/bulan** + 1rb/hari | Reset bulanan   |
| `gemini-2.5-pro`         | `gc/`  | 180K/bulan (kolam bersama)     | Kualitas tinggi |

### ⚫ NVIDIA NIM (Kunci API Gratis — build.nvidia.com)

| Tingkat               | Batas Harian            | Batas Tarif | Catatan                                                              |
| --------------------- | ----------------------- | ----------- | -------------------------------------------------------------------- |
| Gratis (Pengembangan) | Tidak ada batasan token | **~40 RPM** | 70+ model; transisi ke batas tarif murni pada pertengahan tahun 2025 |

Model gratis populer: `moonshotai/kimi-k2.5` (Kimi K2.5), `z-ai/glm4.7` (GLM 4.7), `deepseek-ai/deepseek-v3.2` (DeepSeek V3.2), `nvidia/llama-3.3-70b-instruct`, `deepseek/deepseek-r1`

### ⚪ CEREBRAS (Kunci API Gratis — inference.cerebras.ai)

| Tingkat | Batas Harian          | Batas Tarif      | Catatan                                                    |
| ------- | --------------------- | ---------------- | ---------------------------------------------------------- |
| Gratis  | **1 juta token/hari** | 60K TPM / 30 RPM | Inferensi LLM tercepat di dunia; disetel ulang setiap hari |

Tersedia gratis: `llama-3.3-70b`, `llama-3.1-8b`, `deepseek-r1-distill-llama-70b`

### 🔴 GROQ (Kunci API Gratis — console.groq.com)

| Tingkat | Batas Harian  | Batas Tarif      | Catatan                                                       |
| ------- | ------------- | ---------------- | ------------------------------------------------------------- |
| Gratis  | **RPD 14,4K** | 30 RPM per model | Tidak ada kartu kredit; 429 pada batas, tidak dikenakan biaya |

Tersedia gratis: `llama-3.3-70b-versatile`, `gemma2-9b-it`, `mixtral-8x7b`, `whisper-large-v3`

### 🔴 LONGCAT AI (Kunci API Gratis — longcat.chat) 🆕

| Model                         | Awalan | Kuota Gratis Harian  | Catatan                               |
| ----------------------------- | ------ | -------------------- | ------------------------------------- |
| `LongCat-Flash-Lite`          | `lc/`  | **50 juta token** 💥 | Kuota gratis terbesar yang pernah ada |
| `LongCat-Flash-Chat`          | `lc/`  | 500 ribu token       | Obrolan multi-putaran                 |
| `LongCat-Flash-Thinking`      | `lc/`  | 500 ribu token       | Penalaran / CoT                       |
| `LongCat-Flash-Thinking-2601` | `lc/`  | 500 ribu token       | Versi Jan 2026                        |
| `LongCat-Flash-Omni-2603`     | `lc/`  | 500 ribu token       | Multimoda                             |

> 100% gratis saat dalam versi beta publik. Daftar di [longcat.chat](https://longcat.chat) dengan email atau telepon. Reset setiap hari pukul 00:00 UTC.

### 🟢 POLLINASI AI (Tidak Perlu Kunci API) 🆕

| Model      | Awalan | Batas Tarif           | Penyedia Dibalik     |
| ---------- | ------ | --------------------- | -------------------- |
| `openai`   | `pol/` | 1 permintaan/15 detik | GPT-5                |
| `claude`   | `pol/` | 1 permintaan/15 detik | Claude Antropik      |
| `gemini`   | `pol/` | 1 permintaan/15 detik | Google Gemini        |
| `deepseek` | `pol/` | 1 permintaan/15 detik | Pencarian Dalam V3   |
| `llama`    | `pol/` | 1 permintaan/15 detik | Meta Llama 4 Pramuka |
| `mistral`  | `pol/` | 1 permintaan/15 detik | AI Mistral           |

> ✨ **Tanpa gesekan:** Tanpa pendaftaran, tanpa kunci API. Tambahkan penyedia Penyerbukan dengan bidang kunci kosong dan itu langsung berfungsi.

### 🟠 AI CLOUDFLARE WORKERS (Kunci API Gratis — cloudflare.com) 🆕

| Tingkat | Neuron Harian | Penggunaan Setara                                   | Catatan                      |
| ------- | ------------- | --------------------------------------------------- | ---------------------------- |
| Gratis  | **10.000**    | ~150 respons LLM / audio 500 detik / penyematan 15K | Keunggulan global, 50+ model |

Model gratis populer: `@cf/meta/llama-3.3-70b-instruct`, `@cf/google/gemma-3-12b-it`, `@cf/openai/whisper-large-v3-turbo` (audio gratis!), `@cf/qwen/qwen2.5-coder-15b-instruct`

> Membutuhkan Token API + ID Akun dari [dash.cloudflare.com](https://dash.cloudflare.com). Simpan ID Akun di pengaturan penyedia.

### 🟣 SCALEWAY AI (1 Juta Token Gratis — scaleway.com) 🆕

| Tingkat | Kuota Gratis     | Lokasi       | Catatan                                     |
| ------- | ---------------- | ------------ | ------------------------------------------- |
| Gratis  | **1 juta token** | 🇫🇷 Paris, UE | Tidak diperlukan kartu kredit dalam batasan |

Tersedia gratis: `qwen3-235b-a22b-instruct-2507` (Qwen3 235B!), `llama-3.1-70b-instruct`, `mistral-small-3.2-24b-instruct-2506`, `deepseek-v3-0324`

> Sesuai dengan UE/GDPR. Dapatkan kunci API di [console.scaleway.com](https://console.scaleway.com).

> **💡 Tumpukan Gratis Terbaik (11 Penyedia, $0 Selamanya):**
>
> ```
> Kiro (kr/)             → Claude Sonnet/Haiku UNLIMITED
> iFlow (if/)            → kimi-k2-thinking, qwen3-coder-plus, deepseek-r1 UNLIMITED
> LongCat Lite (lc/)     → LongCat-Flash-Lite — 50M tokens/day 🔥
> Pollinations (pol/)    → GPT-5, Claude, DeepSeek, Llama 4 — no key needed
> Qwen (qw/)             → qwen3-coder models UNLIMITED
> Gemini (gemini/)       → Gemini 2.5 Flash — 1,500 req/day free
> Cloudflare AI (cf/)    → 50+ models — 10K Neurons/day
> Scaleway (scw/)        → Qwen3 235B, Llama 70B — 1M free tokens (EU)
> Groq (groq/)           → Llama/Gemma — 14.4K req/day ultra-fast
> NVIDIA NIM (nvidia/)   → 70+ open models — 40 RPM forever
> Cerebras (cerebras/)   → Llama/Qwen world-fastest — 1M tok/day
> ```

## 🎙️ Kombo Transkripsi Gratis

> Transkripsikan audio/video apa pun seharga **$0** — Deepgram memimpin dengan $200 gratis, penggantian AssemblyAI $50, Groq Whisper sebagai cadangan darurat tanpa batas.

| Penyedia           | Kredit Gratis               | Model Terbaik                          | Batas Tarif                              |
| ------------------ | --------------------------- | -------------------------------------- | ---------------------------------------- |
| 🟢 **Deepgram**    | **$200 gratis** (mendaftar) | `nova-3` — akurasi terbaik, 30+ bahasa | Tidak ada batasan RPM pada kredit gratis |
| 🔵 **PerakitanAI** | **$50 gratis** (mendaftar)  | `universal-3-pro` — bab, sentimen, PII | Tidak ada batasan RPM pada kredit gratis |
| 🔴 **Groq**        | **Gratis selamanya**        | `whisper-large-v3` — Bisikan OpenAI    | 30 RPM (tarif terbatas)                  |

**Kombo yang disarankan di `/dashboard/combos`:**

```
Name: free-transcription
Strategy: Priority
Nodes:
  [1] deepgram/nova-3          → uses $200 free first
  [2] assemblyai/universal-3-pro → fallback when Deepgram credits run out
  [3] groq/whisper-large-v3    → free forever, emergency fallback
```

Kemudian di tab `/dashboard/media` → **Transkripsi**: unggah file audio atau video apa pun → pilih titik akhir kombo Anda → dapatkan transkripsi dalam format yang didukung.

## 💡 Fitur Utama

OmniRoute v2.0 dibangun sebagai platform operasional, bukan hanya proxy relai.

### 🆕 Baru — Peningkatan yang Terinspirasi ClawRouter (Mar 2026)

| Fitur                                   | Apa Fungsinya                                                                                               |
| --------------------------------------- | ----------------------------------------------------------------------------------------------------------- |
| ⚡ **Keluarga Cepat Grok-4**            | model xAI seharga $0,20/$0,50/M — dengan benchmark 1143ms (30% lebih cepat dari Gemini 2.5 Flash)           |
| 🧠 **GLM-5 melalui Z.AI**               | Konteks keluaran 128 ribu, $0,5/1 juta — andalan terbaru dari keluarga GLM                                  |
| 🔮 **MiniMax M2.5**                     | Penalaran + tugas agen seharga $0,30/1 juta — peningkatan signifikan dari M2.1                              |
| 🎯 **alat Memanggil Bendera per Model** | Per model `toolCalling: true/false` di registri — AutoCombo melewatkan model yang tidak mendukung alat      |
| 🌍 **Deteksi Niat Multibahasa**         | Kata kunci PT/ZH/ES/AR dalam penilaian AutoCombo — pemilihan model yang lebih baik untuk konten non-Inggris |
| 📊 **Fallback Berdasarkan Tolok Ukur**  | Latensi p95 nyata dari penilaian kombo umpan permintaan langsung — AutoCombo belajar dari data aktual       |
| 🔁 **Minta Deduplikasi**                | Jendela dedup berbasis hash konten — aman untuk multi-agen, mencegah biaya duplikat                         |
| 🔌 **Strategi Router Pluggable**        | Antarmuka `RouterStrategy` yang dapat diperluas — tambahkan logika perutean khusus sebagai plugin           |

### 🚀 Sebelumnya v2.0.9+ — Taman bermain, Sidik Jari CLI & ACP

| Fitur                                     | Apa Fungsinya                                                                                                                                                                                                                                                               |
| ----------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 🎮 **Model Taman Bermain**                | Halaman dasbor untuk menguji model apa pun secara langsung — pemilih penyedia/model/titik akhir, Editor Monaco, streaming, batalkan, pengaturan waktu                                                                                                                       |
| 🔏 **Pencocokan Sidik Jari CLI**          | Pengurutan header/isi per penyedia agar sesuai dengan tanda tangan CLI asli — alihkan per penyedia di Pengaturan > Keamanan. **IP proxy Anda dipertahankan**                                                                                                                |
| 🤝 **Dukungan ACP (Protokol Klien Agen)** | Penemuan agen CLI (Codex, Claude, Goose, Gemini CLI, OpenClaw + 9 lainnya), pemijahan proses, titik akhir `/api/acp/agents`                                                                                                                                                 |
| 🤖 **Dasbor Agen ACP**                    | Debug › Halaman agen — kisi 14 agen dengan status pemasangan, versi, formulir agen khusus untuk alat CLI apa pun. Pengguna **OpenCode** mendapatkan tombol "Unduh opencode.json" yang secara otomatis menghasilkan konfigurasi siap pakai dengan semua model yang tersedia. |
| 🔧 **Perutean Model Khusus `apiFormat`**  | Model khusus dengan `apiFormat: "responses"` sekarang dirutekan dengan benar ke penerjemah Responses API                                                                                                                                                                    |
| 🏢 **Isolasi Ruang Kerja Codex**          | Beberapa ruang kerja Codex per email — OAuth memisahkan koneksi dengan benar berdasarkan ID ruang kerja                                                                                                                                                                     |
| 🔄 **Pembaruan Otomatis Elektron**        | Aplikasi desktop memeriksa pembaruan + instal otomatis saat restart                                                                                                                                                                                                         |

### 🤖 Operasi Agen & Protokol (v2.0)

| Fitur                                      | Apa Fungsinya                                                                                                 |
| ------------------------------------------ | ------------------------------------------------------------------------------------------------------------- |
| 🔧 **Server MCP (16 alat)**                | Alat IDE/agen melalui 3 transport: stdio, SSE (`/api/mcp/sse`), HTTP yang Dapat Dialirkan (`/api/mcp/stream`) |
| 🤝 **Server A2A (JSON-RPC + SSE)**         | Eksekusi tugas agen-ke-agen dengan aliran sinkronisasi dan streaming                                          |
| 🧭 **Halaman Titik Akhir Konsolidasi**     | Halaman manajemen bertab dengan tab Endpoint Proxy, MCP, A2A, dan API Endpoints                               |
| 🎚️ **Tombol Aktifkan/Nonaktifkan Layanan** | Sakelar ON/OFF untuk MCP dan A2A dengan pengaturan persistensi (default: OFF)                                 |
| 🛰️ **Detak Jantung Waktu Proses MCP**      | Status proses nyata (pid, uptime, usia detak jantung, transportasi, mode cakupan)                             |
| 📋 **Jejak Audit MCP**                     | Log audit yang dapat difilter dengan keberhasilan/kegagalan dan atribusi kunci                                |
| 🔐 **Penegakan Lingkup MCP**               | 9 izin cakupan terperinci untuk akses alat terkontrol                                                         |
| 📡 **Manajemen Siklus Hidup Tugas A2A**    | Daftar/filter tugas, periksa peristiwa/artefak, batalkan tugas yang sedang berjalan                           |
| 📋 **Penemuan Kartu Agen**                 | `/.well-known/agent.json` untuk penemuan otomatis klien                                                       |
| 🧪 **Memanfaatkan Uji Protokol E2E**       | Aliran klien MCP SDK + A2A nyata di `test:protocols:e2e`                                                      |
| ⚙️ **Kontrol Operasional**                 | Ganti kombo, terapkan profil ketahanan, setel ulang pemutus dari satu permukaan kontrol                       |

### 🧠 Perutean & Kecerdasan

| Fitur                                | Apa Fungsinya                                                                             |
| ------------------------------------ | ----------------------------------------------------------------------------------------- |
| 🎯 **Pengembalian 4 Tingkat Cerdas** | Rute otomatis: Berlangganan → Kunci API → Murah → Gratis                                  |
| 📊 **Pelacakan Kuota Waktu Nyata**   | Jumlah token langsung + setel ulang hitungan mundur per penyedia                          |
| 🔄 **Terjemahan Format**             | OpenAI ↔ Claude ↔ Gemini ↔ Respons dengan konversi aman skema                             |
| 👥 **Dukungan Multi-Akun**           | Banyak akun per penyedia dengan pilihan cerdas                                            |
| 🔄 **Penyegaran Token Otomatis**     | Token OAuth disegarkan secara otomatis dengan coba lagi                                   |
| 🎨 **Kombo Khusus**                  | 6 strategi penyeimbangan + kontrol rantai mundur                                          |
| 🌐 **Router Wildcard**               | `provider/*` perutean dinamis                                                             |
| 🧠 **Memikirkan Kontrol Anggaran**   | Batas penalaran passthrough, otomatis, kustom, dan adaptif                                |
| 🔀 **Model Alias**                   | Aliasing model kustom + bawaan dan keamanan migrasi                                       |
| ⚡ **Degradasi Latar Belakang**      | Arahkan tugas latar belakang berprioritas rendah ke model yang lebih murah                |
| 🧪 **Perutean Cerdas Sadar Tugas**   | Pilih model secara otomatis berdasarkan jenis konten (pengkodean/visi/analisis/ringkasan) |
| 💬 **Injeksi Perintah Sistem**       | Pengendalian perilaku global diterapkan secara konsisten                                  |
| 📄 **Kompatibilitas API Respons**    | Dukungan penuh `/v1/responses` untuk Codex dan alur kerja agen tingkat lanjut             |

### 🎵 API Multi-Modal

| Fitur                      | Apa Fungsinya                                                                                                                                                              |
| -------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 🖼️ **Pembuatan Gambar**    | `/v1/images/generations` dengan cloud dan backend lokal                                                                                                                    |
| 📐 **Sematan**             | `/v1/embeddings` untuk saluran pencarian dan RAG                                                                                                                           |
| 🎤 **Transkripsi Audio**   | `/v1/audio/transcriptions` — 7 penyedia (Deepgram Nova 3, AssemblyAI, Groq Whisper, HuggingFace, ElevenLabs, OpenAI, Azure), deteksi bahasa otomatis, dukungan MP4/MP3/WAV |
| 🔊 **Teks-ke-Ucapan**      | `/v1/audio/speech` — 10 penyedia (ElevenLabs, OpenAI, Deepgram, Cartesia, PlayHT, HuggingFace, Nvidia NIM, Inworld, Coqui, Tortoise) dengan pesan kesalahan yang benar     |
| 🎬 **Pembuatan Video**     | `/v1/videos/generations` (Alur kerja WebUI Nyaman + SD)                                                                                                                    |
| 🎵 **Generasi Musik**      | `/v1/music/generations` (Alur kerja UI yang Nyaman)                                                                                                                        |
| 🛡️ **Moderasi**            | `/v1/moderations` pemeriksaan keamanan                                                                                                                                     |
| 🔀 **Pemeringkatan Ulang** | `/v1/rerank` untuk penilaian relevansi                                                                                                                                     |
| 🔍 **Penelusuran Web** 🆕  | `/v1/search` — 5 penyedia (Serper, Brave, Perplexity, Exa, Tavily), 6.500+ gratis/bulan, failover otomatis, cache                                                          |

### 🛡️ Ketahanan, Keamanan & Tata Kelola

| Fitur                                    | Apa Fungsinya                                                                                                    |
| ---------------------------------------- | ---------------------------------------------------------------------------------------------------------------- |
| 🔌 **Pemutus Arus**                      | Perjalanan/pemulihan per model dengan kontrol ambang batas                                                       |
| 🎯 **Model Sadar Titik Akhir**           | Model khusus mendeklarasikan titik akhir yang didukung + format API                                              |
| 🛡️ **Kawanan Anti Guntur**               | Perlindungan mutex + semaphore pada acara coba ulang/nilai                                                       |
| 🧠 **Semantik + Cache Tanda Tangan**     | Pengurangan biaya/latensi dengan dua lapisan cache                                                               |
| ⚡ **Minta Idempotensi**                 | Jendela perlindungan duplikat                                                                                    |
| 🔒 **Spoofing Sidik Jari TLS**           | Sidik jari TLS seperti browser — **mengurangi deteksi bot dan penandaan akun**                                   |
| 🔏 **Pencocokan Sidik Jari CLI**         | Cocok dengan tanda tangan permintaan CLI asli — **mengurangi risiko larangan sekaligus mempertahankan IP proxy** |
| 🌐 **Pemfilteran IP**                    | Kontrol daftar yang diizinkan/daftar blokir untuk penerapan yang terbuka                                         |
| 📊 **Batas Tarif yang Dapat Diedit**     | Batas tingkat global/penyedia yang dapat dikonfigurasi dengan persistensi                                        |
| 🔑 **Manajemen Kunci API + Pelingkupan** | Mengamankan penerbitan/rotasi kunci dan kontrol model/penyedia                                                   |
| 🛡️ **Dilindungi `/models`**              | Gerbang autentikasi opsional dan penyembunyian penyedia untuk katalog model                                      |

### 📊 Observabilitas & Analisis

| Fitur                                 | Apa Fungsinya                                                          |
| ------------------------------------- | ---------------------------------------------------------------------- |
| 📝 **Permintaan + Pencatatan Proksi** | Permintaan/tanggapan lengkap dan pencatatan proksi                     |
| 📋 **Dasbor Log Terpadu**             | Tampilan permintaan, proksi, audit, dan konsol dalam satu halaman      |
| 🔍 **Permintaan Telemetri**           | latensi p50/p95/p99 dan penelusuran permintaan                         |
| 🏥 **Dasbor Kesehatan**               | Waktu aktif, status pemutus, penguncian, statistik cache               |
| 💰 **Pelacakan Biaya**                | Kontrol anggaran dan visibilitas harga per model                       |
| 📈 **Visualisasi Analisis**           | Wawasan penggunaan model/penyedia dan tampilan tren                    |
| 🧪 **Kerangka Evaluasi**              | Pengujian set emas dengan strategi pencocokan yang dapat dikonfigurasi |

### ☁️ Penerapan & Platform

| Fitur                        | Apa Fungsinya                                               |
| ---------------------------- | ----------------------------------------------------------- |
| 🌐 **Terapkan Di Mana Saja** | Localhost, VPS, Docker, Lingkungan Cloud                    |
| 💾 **Sinkronisasi Cloud**    | Sinkronisasi konfigurasi melalui pekerja cloud              |
| 🔄 **Cadangan/Pemulihan**    | Arus ekspor/impor dan pemulihan bencana                     |
| 🧙 **Wizard Orientasi**      | Penyiapan terpandu yang dijalankan pertama kali             |
| 🔧 **Dasbor Alat CLI**       | Pengaturan sekali klik untuk alat pengkodean populer        |
| 🎮 **Model Taman Bermain**   | Uji penyedia/model/titik akhir apa pun dari dasbor          |
| 🔏 **Tolak Sidik Jari CLI**  | Pencocokan sidik jari per penyedia di Pengaturan > Keamanan |
| 🌐 **i18n (30 bahasa)**      | Dasbor lengkap + dukungan bahasa dokumen dengan cakupan RTL |
| 🧹 **Hapus Semua Model**     | Pembersihan daftar model sekali klik di detail penyedia     |
| 📋 **Template Masalah**      | Templat GitHub standar untuk bug dan fitur                  |
| 📂 **Direktori Data Khusus** | `DATA_DIR` penggantian untuk lokasi penyimpanan             |

### Fitur Penyelaman Mendalam

#### Penggantian cerdas dengan pengendalian biaya praktis

```txt
Combo: "my-coding-stack"
  1. cc/claude-opus-4-6
  2. nvidia/llama-3.3-70b
  3. glm/glm-4.7
  4. if/kimi-k2-thinking
```

Ketika kuota, tarif, atau kesehatan gagal, OmniRoute secara otomatis berpindah ke kandidat berikutnya tanpa peralihan manual.

#### Manajemen protokol yang terlihat dan dapat dioperasikan

- MCP + A2A dapat ditemukan di UI dan dokumen (tidak disembunyikan)
- API status protokol memaparkan data operasional langsung (`/api/mcp/*`, `/api/a2a/*`)
- Dasbor mencakup tindakan untuk operasi hari ke-2 (pengalihan kombo, pengaturan ulang pemutus, pembatalan tugas)

#### Penerjemah + alur kerja validasi

Area Penerjemah meliputi:

- **Taman Bermain**: meminta pemeriksaan transformasi
- **Penguji Obrolan**: permintaan/respons penuh pulang pergi
- **Test Bench**: beberapa kasus sekaligus
- **Monitor Langsung**: tampilan lalu lintas waktu nyata

Ditambah validasi protokol dengan klien nyata melalui `npm run test:protocols:e2e`.

> 📖 **[MCP Server README](open-sse/mcp-server/README.md)** — Referensi alat, konfigurasi IDE, dan contoh klien
>
> 📖 **[A2A Server README](src/lib/a2a/README.md)** — Keterampilan, metode JSON-RPC, streaming, dan siklus hidup tugas

## 🧪 Evaluasi (Eval)

OmniRoute menyertakan kerangka evaluasi bawaan untuk menguji kualitas respons LLM terhadap rangkaian emas. Akses melalui **Analytics → Evals** di dasbor.

### Set Emas Bawaan

"OmniRoute Golden Set" yang dimuat sebelumnya berisi kasus uji untuk:

- Salam, matematika, geografi, pembuatan kode
- Kepatuhan format JSON, terjemahan, pembuatan penurunan harga
- Penolakan keamanan (konten berbahaya), penghitungan, logika boolean

### Strategi Evaluasi

| Strategi   | Deskripsi                                                    | Contoh                           |
| ---------- | ------------------------------------------------------------ | -------------------------------- |
| `exact`    | Output harus sama persis                                     | `"4"`                            |
| `contains` | Output harus berisi substring (tidak peka huruf besar-kecil) | `"Paris"`                        |
| `regex`    | Output harus sesuai dengan pola regex                        | `"1.*2.*3"`                      |
| `custom`   | Fungsi JS khusus mengembalikan benar/salah                   | `(output) => output.length > 10` |

---

## 📖 Panduan Pengaturan

### Pengaturan Protokol (MCP + A2A)

<details>
<summary><b>🧩 Penyiapan MCP (Protokol Konteks Model)</b></summary>

Mulai transportasi MCP dalam mode stdio:

```bash
omniroute --mcp
```

Alur validasi yang disarankan:

1. Hubungkan klien MCP Anda melalui stdio.
2. Jalankan `omniroute_get_health`.
3. Jalankan `omniroute_list_combos`.
4. Buka `/dashboard/mcp` untuk mengonfirmasi detak jantung, aktivitas, dan audit.

API yang berguna untuk otomatisasi:

- `GET /api/mcp/status`
- `GET /api/mcp/tools`
- `GET /api/mcp/audit`
- `GET /api/mcp/audit/stats`

</details>

<details>
<summary><b>🤝 Pengaturan A2A (Agen2Agen)</b></summary>

Temukan agennya:

```bash
curl http://localhost:20128/.well-known/agent.json
```

Kirim tugas:

```bash
curl -X POST http://localhost:20128/a2a \
  -H 'content-type: application/json' \
  -d '{"jsonrpc":"2.0","id":"setup-a2a","method":"message/send","params":{"skill":"quota-management","messages":[{"role":"user","content":"Summarize quota status."}]}}'
```

Kelola siklus hidup:

- `GET /api/a2a/status`
- `GET /api/a2a/tasks`
- `GET /api/a2a/tasks/:id`
- `POST /api/a2a/tasks/:id/cancel`

UI Operasional:

- `/dashboard/a2a` untuk observasi tugas/status/aliran dan tindakan asap

</details>

<details>
<summary><b>🧪 Validasi protokol menyeluruh</b></summary>

Validasi kedua protokol dengan klien nyata:

```bash
npm run test:protocols:e2e
```

Ini memverifikasi:

- Koneksi/daftar/panggilan klien MCP SDK
- Penemuan A2A/kirim/aliran/dapatkan/batalkan
- Periksa silang data dalam audit MCP dan API manajemen tugas A2A

</details>

<details>
<summary><b>💳 Penyedia Langganan</b></summary>

### Kode Claude (Pro/Maks)

```bash
Dashboard → Providers → Connect Claude Code
→ OAuth login → Auto token refresh
→ 5-hour + weekly quota tracking

Models:
  cc/claude-opus-4-6
  cc/claude-sonnet-4-5-20250929
  cc/claude-haiku-4-5-20251001
```

**Kiat Pro:** Gunakan Opus untuk tugas kompleks, Soneta untuk kecepatan. OmniRoute melacak kuota per model!

### Kodeks OpenAI (Plus/Pro)

```bash
Dashboard → Providers → Connect Codex
→ OAuth login (port 1455)
→ 5-hour + weekly reset

Models:
  cx/gpt-5.2-codex
  cx/gpt-5.1-codex-max
```

#### Manajemen Batas Akun Codex (5 jam + Mingguan)

Setiap akun Codex sekarang memiliki tombol kebijakan di `Dashboard -> Providers`:

- `5h` (ON/OFF): menerapkan kebijakan ambang jendela 5 jam.
- `Weekly` (ON/OFF): menerapkan kebijakan ambang jendela mingguan.
- Perilaku ambang batas: ketika jendela yang diaktifkan mencapai >=90% penggunaan, akun tersebut dilewati.
- Perilaku rotasi: OmniRoute merutekan ke akun Codex berikutnya yang memenuhi syarat secara otomatis.
- Perilaku reset: ketika waktu `resetAt` penyedia berlalu, akun menjadi memenuhi syarat lagi secara otomatis.

Skenario:

- `5h ON` + `Weekly ON`: akun dilewati ketika salah satu jendela mencapai ambang batas.
- `5h OFF` + `Weekly ON` : hanya penggunaan mingguan yang dapat memblokir akun.
- `5h ON` + `Weekly OFF` : penggunaan 5 jam saja dapat memblokir akun.
- `resetAt` lolos: akun masuk kembali ke rotasi secara otomatis (tidak ada pengaktifan ulang secara manual).

### Gemini CLI (GRATIS 180K/bulan!)

```bash
Dashboard → Providers → Connect Gemini CLI
→ Google OAuth
→ 180K completions/month + 1K/day

Models:
  gc/gemini-3-flash-preview
  gc/gemini-2.5-pro
```

**Nilai Terbaik:** Tingkat gratis yang sangat besar! Gunakan ini sebelum tingkatan berbayar.

### Kopilot GitHub

```bash
Dashboard → Providers → Connect GitHub
→ OAuth via GitHub
→ Monthly reset (1st of month)

Models:
  gh/gpt-5
  gh/claude-4.5-sonnet
  gh/gemini-3-pro
```

</details>

<details>
<summary><b>🔑 Penyedia Kunci API</b></summary>

### NVIDIA NIM (akses pengembang GRATIS — 70+ model)

1. Daftar: [build.nvidia.com](https://build.nvidia.com)
2. Dapatkan kunci API gratis (termasuk 1000 kredit inferensi)
3. Dasbor → Tambah Penyedia → NVIDIA NIM:
   - Kunci API: `nvapi-your-key`

**Model:** `nvidia/llama-3.3-70b-instruct`, `nvidia/mistral-7b-instruct`, dan 50+ lainnya

**Kiat Pro:** API yang kompatibel dengan OpenAI — bekerja secara lancar dengan terjemahan format OmniRoute!

### Pencarian Dalam

1. Daftar: [platform.deepseek.com](https://platform.deepseek.com)
2. Dapatkan kunci API
3. Dasbor → Tambah Penyedia → DeepSeek

**Model:** `deepseek/deepseek-chat`, `deepseek/deepseek-coder`

### Groq (Tersedia Tingkat Gratis!)

1. Daftar: [console.groq.com](https://console.groq.com)
2. Dapatkan kunci API (termasuk tingkat gratis)
3. Dasbor → Tambah Penyedia → Groq

**Model:** `groq/llama-3.3-70b`, `groq/mixtral-8x7b`

**Kiat Pro:** Inferensi ultra-cepat — terbaik untuk pengkodean waktu nyata!

### OpenRouter (100+ Model)

1. Daftar: [openrouter.ai](https://openrouter.ai)
2. Dapatkan kunci API
3. Dasbor → Tambah Penyedia → OpenRouter

**Model:** Akses 100+ model dari semua penyedia utama melalui satu kunci API.

</details>

<details>
<summary><b>💰 Penyedia Murah (Cadangan)</b></summary>

### GLM-4.7 (Reset harian, $0,6/1 juta)

1. Daftar: [Zhipu AI](https://open.bigmodel.cn/)
2. Dapatkan kunci API dari Coding Plan
3. Dasbor → Tambahkan Kunci API:
   - Penyedia: `glm`
   - Kunci API: `your-key`

**Gunakan:** `glm/glm-4.7`

**Tips Pro:** Paket Coding menawarkan 3× kuota dengan biaya 1/7! Reset setiap hari pukul 10.00.

### MiniMax M2.1 (reset 5 jam, $0,20/1 juta)

1. Daftar: [MiniMax](https://www.minimax.io/)
2. Dapatkan kunci API
3. Dasbor → Tambahkan Kunci API

**Gunakan:** `minimax/MiniMax-M2.1`

**Kiat Pro:** Opsi termurah untuk konteks panjang (1 juta token)!

### Kimi K2 ($9/bulan tetap)

1. Berlangganan: [Moonshot AI](https://platform.moonshot.ai/)
2. Dapatkan kunci API
3. Dasbor → Tambahkan Kunci API

**Gunakan:** `kimi/kimi-latest`

**Kiat Pro:** Memperbaiki $9/bulan untuk 10 juta token = biaya efektif $0,90/1 juta!

</details>

<details>
<summary><b>🆓 Penyedia GRATIS (Cadangan Darurat)</b></summary>

### iFlow (5 model GRATIS melalui OAuth)

```bash
Dashboard → Connect iFlow
→ iFlow OAuth login
→ Unlimited usage

Models:
  if/kimi-k2-thinking
  if/qwen3-coder-plus
  if/glm-4.7
  if/minimax-m2
  if/deepseek-r1
```

### Qwen (4 model GRATIS melalui Kode Perangkat)

```bash
Dashboard → Connect Qwen
→ Device code authorization
→ Unlimited usage

Models:
  qw/qwen3-coder-plus
  qw/qwen3-coder-flash
```

### Kiro (Claude GRATIS)

```bash
Dashboard → Connect Kiro
→ AWS Builder ID or Google/GitHub
→ Unlimited usage

Models:
  kr/claude-sonnet-4.5
  kr/claude-haiku-4.5
```

</details>

<details>
<summary><b>🎨 Buat Kombo</b></summary>

### Contoh 1: Maksimalkan Langganan → Cadangan Murah

```
Dashboard → Combos → Create New

Name: premium-coding
Models:
  1. cc/claude-opus-4-6 (Subscription primary)
  2. glm/glm-4.7 (Cheap backup, $0.6/1M)
  3. minimax/MiniMax-M2.1 (Cheapest fallback, $0.20/1M)

Use in CLI: premium-coding
```

### Contoh 2: Gratis Saja (Tanpa Biaya)

```
Name: free-combo
Models:
  1. gc/gemini-3-flash-preview (180K free/month)
  2. if/kimi-k2-thinking (unlimited)
  3. qw/qwen3-coder-plus (unlimited)

Cost: $0 forever!
```

</details>

<details>
<summary><b>🔧 Integrasi CLI</b></summary>

### IDE Kursor

```
Settings → Models → Advanced:
  OpenAI API Base URL: http://localhost:20128/v1
  OpenAI API Key: [from OmniRoute dashboard]
  Model: cc/claude-opus-4-6
```

### Kode Claude

Gunakan halaman **Alat CLI** di dasbor untuk konfigurasi sekali klik, atau edit `~/.claude/settings.json` secara manual.

### Kodeks CLI

```bash
export OPENAI_BASE_URL="http://localhost:20128"
export OPENAI_API_KEY="your-omniroute-api-key"

codex "your prompt"
```

### Buka Cakar

**Opsi 1 — Dasbor (disarankan):**

```
Dashboard → CLI Tools → OpenClaw → Select Model → Apply
```

**Opsi 2 — Panduan:** Sunting `~/.openclaw/openclaw.json`:

```json
{
  "models": {
    "providers": {
      "omniroute": {
        "baseUrl": "http://127.0.0.1:20128/v1",
        "apiKey": "sk_omniroute",
        "api": "openai-completions"
      }
    }
  }
}
```

> **Catatan:** OpenClaw hanya berfungsi dengan OmniRoute lokal. Gunakan `127.0.0.1` alih-alih `localhost` untuk menghindari masalah resolusi IPv6.

### Cline / Lanjutkan / RooCode

```
Settings → API Configuration:
  Provider: OpenAI Compatible
  Base URL: http://localhost:20128/v1
  API Key: [from OmniRoute dashboard]
  Model: if/kimi-k2-thinking
```

### Kode Terbuka

**Langkah 1:** Tambahkan OmniRoute sebagai penyedia khusus:

```bash
opencode
/connect
# Select "Other" → Enter ID: "omniroute" → Enter your OmniRoute API key
```

**Langkah 2:** Buat/edit `opencode.json` di root proyek Anda:

```json
{
  "$schema": "https://opencode.ai/config.json",
  "provider": {
    "omniroute": {
      "npm": "@ai-sdk/openai-compatible",
      "name": "OmniRoute",
      "options": {
        "baseURL": "http://localhost:20128/v1"
      },
      "models": {
        "cc/claude-sonnet-4-20250514": { "name": "Claude Sonnet 4" },
        "gg/gemini-2.5-pro": { "name": "Gemini 2.5 Pro" },
        "if/kimi-k2-thinking": { "name": "Kimi K2 (Free)" }
      }
    }
  }
}
```

**Langkah 3:** Pilih model di OpenCode:

```bash
/models
# Select any OmniRoute model from the list
```

> **Tips:** Tambahkan model apa pun yang tersedia di titik akhir OmniRoute `/v1/models` Anda ke bagian `models`. Gunakan format `provider/model-id` dari dasbor OmniRoute Anda.

</details>

---

## 🐛 Pemecahan masalah

<details>
<summary><b>Klik untuk memperluas panduan pemecahan masalah</b></summary>

**"Model bahasa tidak memberikan pesan"**

- Kuota penyedia habis → Periksa dashboard pelacak kuota
- Solusi: Gunakan combo fallback atau beralih ke tier yang lebih murah

**Pembatasan tarif**

- Kuota berlangganan habis → Penggantian ke GLM/MiniMax
- Tambahkan kombo: `cc/claude-opus-4-6 → glm/glm-4.7 → if/kimi-k2-thinking`

**Token OAuth kedaluwarsa**

- Disegarkan secara otomatis oleh OmniRoute
- Jika masalah terus berlanjut: Dasbor → Penyedia → Sambungkan kembali

**Biaya tinggi**

- Periksa statistik penggunaan di Dashboard → Biaya
- Ganti model utama ke GLM/MiniMax
- Gunakan tingkat gratis (Gemini CLI, iFlow) untuk tugas-tugas yang tidak penting

**Port dasbor/API salah**

- `PORT` adalah port dasar kanonik (dan port API secara default)
- `API_PORT` hanya menimpa pendengar API yang kompatibel dengan OpenAI
- `DASHBOARD_PORT` hanya menimpa dashboard/pendengar Next.js
- Setel `NEXT_PUBLIC_BASE_URL` ke dasbor/URL publik Anda (untuk panggilan balik OAuth)

**Kesalahan sinkronisasi cloud**

- Verifikasi `BASE_URL` poin ke instance Anda yang sedang berjalan
- Verifikasi `CLOUD_URL` poin ke titik akhir cloud yang Anda harapkan
- Jaga agar nilai `NEXT_PUBLIC_*` selaras dengan nilai sisi server

**Login pertama tidak berfungsi**

- Periksa `INITIAL_PASSWORD` di `.env`
- Jika tidak disetel, kata sandi cadangan adalah `123456`

**Tidak ada log permintaan**

- Tetapkan `ENABLE_REQUEST_LOGS=true` di `.env`

**Tes koneksi menunjukkan "Tidak Valid" untuk penyedia yang kompatibel dengan OpenAI**

- Banyak penyedia tidak mengekspos titik akhir `/models`
- OmniRoute v1.0.6+ menyertakan validasi fallback melalui penyelesaian obrolan
- Pastikan URL dasar menyertakan akhiran `/v1`

### 🔐 OAuth di Server Jarak Jauh

<a name="oauth-on-a-remote-server"></a>
<a name="oauth-em-servidor-remoto"></a>

> **⚠️ Penting bagi pengguna yang menjalankan OmniRoute di VPS, Docker, atau server jarak jauh mana pun**

#### Mengapa Antigravity / Gemini CLI OAuth gagal di server jarak jauh?

Penyedia **Antigravitasi** dan **Gemini CLI** menggunakan **Google OAuth 2.0**. Google mewajibkan `redirect_uri` dalam alur OAuth agar sama persis dengan salah satu URI yang telah didaftarkan sebelumnya di Google Cloud Console aplikasi.

Kredensial OAuth yang disertakan dalam OmniRoute didaftarkan **hanya untuk `localhost`**. Saat Anda mengakses OmniRoute di server jarak jauh (misalnya `https://omniroute.myserver.com`), Google menolak autentikasi dengan:

```
Error 400: redirect_uri_mismatch
```

#### Solusi: Konfigurasikan kredensial OAuth Anda sendiri

Anda perlu membuat **ID Klien OAuth 2.0** di Google Cloud Console dengan URI server Anda.

#### Langkah demi langkah

**1. Buka Google Cloud Console**

Kunjungi: [https://console.cloud.google.com/apis/credentials](https://console.cloud.google.com/apis/credentials)

**2. Buat ID Klien OAuth 2.0 baru**

- Klik **"+ Buat Kredensial"** → **"ID klien OAuth"**
- Jenis aplikasi: **"Aplikasi web"**
- Nama: apa pun yang Anda suka (mis. `OmniRoute Remote`)

**3. Tambahkan URI Pengalihan Resmi**

Di kolom **"URI pengalihan resmi"**, tambahkan:

```
https://your-server.com/callback
```

> Ganti `your-server.com` dengan domain atau IP server Anda (sertakan port jika diperlukan, misalnya `http://45.33.32.156:20128/callback`).

**4. Simpan dan salin kredensial**

Setelah pembuatan, Google akan menampilkan **ID Klien** dan **Rahasia Klien**.

**5. Tetapkan variabel lingkungan**

Di `.env` Anda (atau variabel lingkungan Docker):

```bash
# For Antigravity:
ANTIGRAVITY_OAUTH_CLIENT_ID=your-client-id.apps.googleusercontent.com
ANTIGRAVITY_OAUTH_CLIENT_SECRET=GOCSPX-your-secret

# For Gemini CLI:
GEMINI_OAUTH_CLIENT_ID=your-client-id.apps.googleusercontent.com
GEMINI_OAUTH_CLIENT_SECRET=GOCSPX-your-secret
GEMINI_CLI_OAUTH_CLIENT_SECRET=GOCSPX-your-secret
```

**6. Mulai ulang OmniRoute**

```bash
# npm:
npm run dev

# Docker:
docker restart omniroute
```

**7. Coba sambungkan lagi**

Dasbor → Penyedia → Antigravitasi (atau Gemini CLI) → OAuth

Google sekarang akan mengalihkan dengan benar ke `https://your-server.com/callback`.

---

#### Solusi sementara (tanpa kredensial khusus)

Jika Anda tidak ingin menyiapkan kredensial Anda sendiri saat ini, Anda masih dapat menggunakan **alur URL manual**:

1. OmniRoute membuka URL otorisasi Google
2. Setelah otorisasi, Google mencoba mengalihkan ke `localhost` (yang gagal di server jauh)
3. **Salin URL lengkap** dari bilah alamat browser Anda (meskipun halaman tidak dimuat)
4. Tempelkan URL tersebut ke bidang yang ditampilkan di modal koneksi OmniRoute
5. Klik **"Hubungkan"**

> Ini berfungsi karena kode otorisasi di URL valid terlepas dari apakah halaman pengalihan dimuat.

---

<details>
<summary><b>🇧🇷 Versão em Português</b></summary>

#### Mengapa OAuth melakukan Antigravity / Gemini CLI gagal dalam layanan jarak jauh?

Pembuktiannya **Antigravitasi** dan **Gemini CLI** digunakan **Google OAuth 2.0** untuk autentikasi. Google meminta agar `redirect_uri` menggunakan OAuth yang terus berubah, jadi **exatamente** adalah URI yang sudah ada sebelumnya di Google Cloud Console yang dapat diterapkan.

Karena kredensial OAuth yang diberikan pada OmniRoute adalah kadastrada **apenas untuk `localhost`**. Ketika Anda mengakses OmniRoute dari server jarak jauh (misal: `https://omniroute.meuservidor.com`), atau Google meminta autenticação com:

```
Error 400: redirect_uri_mismatch
```

#### Solusi: Konfigurasikan akun OAuth Anda

Anda perlu membuat **ID Klien OAuth 2.0** di Google Cloud Console dengan URI di server Anda.

#### Lewati dulu

**1. Mengakses Google Cloud Console**

Abra: [https://console.cloud.google.com/apis/credentials](https://console.cloud.google.com/apis/credentials)

**2. Inilah ID Klien OAuth 2.0 yang baru**

- Klik pada **"+ Buat Kredensial"** → **"ID klien OAuth"**
- Tip aplikasi: **"Aplikasi web"**
- Nama: nama escolha qualquer (misal: `OmniRoute Remote`)

**3. Tambahan sebagai URI Pengalihan Resmi**

Selain itu **"URI pengalihan resmi"**, tambahan:

```
https://seu-servidor.com/callback
```

> Pengganti `seu-servidor.com` pelo domínio atau IP ke server Anda (termasuk port yang diperlukan, misal: `http://45.33.32.156:20128/callback`).

**4. Salep dan salin sebagai kredensial**

Kemudian, Google menampilkan **ID Klien** dan **Rahasia Klien**.

**5. Konfigurasikan sebagai variáveis de ambiente**

Di `.env` Anda (atau berbagai lingkungan di Docker):

```bash
# Para Antigravity:
ANTIGRAVITY_OAUTH_CLIENT_ID=seu-client-id.apps.googleusercontent.com
ANTIGRAVITY_OAUTH_CLIENT_SECRET=GOCSPX-seu-secret

# Para Gemini CLI:
GEMINI_OAUTH_CLIENT_ID=seu-client-id.apps.googleusercontent.com
GEMINI_OAUTH_CLIENT_SECRET=GOCSPX-seu-secret
GEMINI_CLI_OAUTH_CLIENT_SECRET=GOCSPX-seu-secret
```

**6. Memulai kembali OmniRoute**

```bash
# Se usando npm:
npm run dev

# Se usando Docker:
docker restart omniroute
```

**7. Mari kita sambungkan lagi**

Dasbor → Penyedia → Antigravitasi (atau Gemini CLI) → OAuth

Sekarang o Google dialihkan langsung ke `https://seu-servidor.com/callback` dan autentikasi berfungsi.

---

#### Solusi sementara (sem configurar credenciais próprias)

Jika Anda tidak ingin membuat kredensial pribadi sekarang, Anda mungkin dapat menggunakan fluks **panduan URL**:

1. O OmniRoute membuka URL autoriza dari Google
2. Setelah Anda autorizar, Google mengarahkan pengalihan ke `localhost` (yang gagal pada server jarak jauh)
3. **Salin URL lengkap** dari bilah akhir browser Anda (meskipun halaman tidak dimuat)
4. Gunakan URL ini karena tidak ada modal koneksi ke OmniRoute
5. Klik pada **"Hubungkan"**

> Solusi ini berfungsi karena kode otorisasi pada URL valid secara independen untuk mengarahkan ulang ke akun atau tidak.

</details>

---

</details>

## 🛠️ Tumpukan Teknologi

<details>
<summary><b>Klik untuk memperluas detail tumpukan teknologi</b></summary>

- **Runtime**: Node.js 18–22 LTS (⚠️ Node.js 24+ **tidak didukung** — `better-sqlite3` biner asli tidak kompatibel)
- **Bahasa**: TypeScript 5.9 — **100% TypeScript** di `src/` dan `open-sse/` (nol `any` dalam modul inti sejak v2.0)
- **Kerangka Kerja**: Next.js 16 + React 19 + Tailwind CSS 4
- **Database**: LowDB (JSON) + SQLite (status domain + log proksi + audit MCP + keputusan perutean)
- **Skema**: Zod (validasi I/O alat MCP, kontrak API)
- **Protokol**: MCP (stdio/HTTP) + A2A v0.3 (JSON-RPC 2.0 + SSE)
- **Streaming**: Peristiwa Terkirim Server (SSE)
- **Auth**: OAuth 2.0 (PKCE) + JWT + Kunci API + Otorisasi Cakupan MCP
- **Pengujian**: Pelari pengujian Node.js + Vitest (900+ pengujian termasuk unit, integrasi, E2E)
- **CI/CD**: Tindakan GitHub (publikasi npm otomatis + Docker Hub saat dirilis)
- **Situs Web**: [omniroute.online](https://omniroute.online)
- **Paket**: [npmjs.com/package/omniroute](https://www.npmjs.com/package/omniroute)
- **Pekerja Pelabuhan**: [hub.docker.com/r/diegosouzapw/omniroute](https://hub.docker.com/r/diegosouzapw/omniroute)
- **Ketahanan**: Pemutus arus, backoff eksponensial, kawanan anti-thundering, spoofing TLS, penyembuhan diri kombo otomatis

</details>

---

## 📖 Dokumentasi

| Dokumen                                        | Deskripsi                                                       |
| ---------------------------------------------- | --------------------------------------------------------------- |
| [User Guide](docs/USER_GUIDE.md)               | Penyedia, kombo, integrasi CLI, penerapan                       |
| [API Reference](docs/API_REFERENCE.md)         | Semua titik akhir dengan contoh                                 |
| [MCP Server](open-sse/mcp-server/README.md)    | 16 alat MCP, konfigurasi IDE, klien Python/TS/Go                |
| [A2A Server](src/lib/a2a/README.md)            | Protokol JSON-RPC 2.0, keterampilan, streaming, manajemen tugas |
| [Auto-Combo Engine](docs/auto-combo.md)        | Penilaian 6 faktor, paket mode, penyembuhan diri                |
| [Troubleshooting](docs/TROUBLESHOOTING.md)     | Masalah umum dan solusinya                                      |
| [Architecture](docs/ARCHITECTURE.md)           | Arsitektur sistem dan internal                                  |
| [Contributing](CONTRIBUTING.md)                | Pengaturan dan pedoman pengembangan                             |
| [OpenAPI Spec](docs/openapi.yaml)              | Spesifikasi OpenAPI 3.0                                         |
| [Security Policy](SECURITY.md)                 | Pelaporan kerentanan dan praktik keamanan                       |
| [VM Deployment](docs/VM_DEPLOYMENT_GUIDE.md)   | Panduan lengkap: VM + nginx + Pengaturan Cloudflare             |
| [Features Gallery](docs/FEATURES.md)           | Tur dasbor visual dengan tangkapan layar                        |
| [Release Checklist](docs/RELEASE_CHECKLIST.md) | Langkah validasi pra-rilis                                      |

---

## 🗺️ Peta Jalan

OmniRoute memiliki **210+ fitur yang direncanakan** di berbagai fase pengembangan. Berikut adalah bidang-bidang utamanya:

| Kategori                     | Fitur yang Direncanakan | Sorotan                                                                                             |
| ---------------------------- | ----------------------- | --------------------------------------------------------------------------------------------------- |
| 🧠 **Perutean & Kecerdasan** | 25+                     | Perutean latensi terendah, perutean berbasis tag, preflight kuota, pemilihan akun P2C               |
| 🔒 **Keamanan & Kepatuhan**  | 20+                     | Pengerasan SSRF, penyelubungan kredensial, batas tarif per titik akhir, pelingkupan kunci manajemen |
| 📊 **Kemampuan Observasi**   | 15+                     | Integrasi OpenTelemetry, pemantauan kuota waktu nyata, pelacakan biaya per model                    |
| 🔄 **Integrasi Penyedia**    | 20+                     | Registri model dinamis, cooldown penyedia, Codex multi-akun, penguraian kuota Salinan               |
| ⚡ **Kinerja**               | 15+                     | Lapisan cache ganda, cache cepat, cache respons, streaming keepalive, API batch                     |
| 🌐 **Ekosistem**             | 10+                     | WebSocket API, konfigurasi hot-reload, penyimpanan konfigurasi terdistribusi, mode komersial        |

### 🔜 Segera Hadir

- 🔗 **Integrasi OpenCode** — Dukungan penyedia asli untuk IDE pengkodean AI OpenCode
- 🔗 **Integrasi TRAE** — Dukungan penuh untuk kerangka pengembangan AI TRAE
- 📦 **Batch API** — Pemrosesan batch asinkron untuk permintaan massal
- 🎯 **Perutean Berbasis Tag** — Merutekan permintaan berdasarkan tag dan metadata khusus
- 💰 **Strategi Biaya Terendah** — Secara otomatis memilih penyedia termurah yang tersedia

> 📝 Spesifikasi fitur lengkap tersedia di [**OMNI_TOKEN_342**](docs/new-features/) (217 spesifikasi detail)

---

## 👥 Kontributor

[![Contributors](https://contrib.rocks/image?repo=diegosouzapw/OmniRoute&max=100&columns=20&anon=1)](https://github.com/diegosouzapw/OmniRoute/graphs/contributors)

### Cara Berkontribusi

1. Cabangkan repositori
2. Buat cabang fitur Anda (`git checkout -b feature/amazing-feature`)
3. Komit perubahan Anda (`git commit -m 'Add amazing feature'`)
4. Dorong ke cabang (`git push origin feature/amazing-feature`)
5. Buka Permintaan Tarik

Lihat [CONTRIBUTING.md](CONTRIBUTING.md) untuk panduan detailnya.

### Merilis Versi Baru

```bash
# Create a release — npm publish happens automatically
gh release create v2.0.0 --title "v2.0.0" --generate-notes
```

---

## 📊 Sejarah Bintang

## Pengamat bintang dari waktu ke waktu

## [![Stargazers over time](https://starchart.cc/diegosouzapw/OmniRoute.svg?variant=adaptive)](https://starchart.cc/diegosouzapw/OmniRoute)

## 🙏 Ucapan Terima Kasih

Terima kasih khusus kepada **[9router](https://github.com/decolua/9router)** oleh **[decolua](https://github.com/decolua)** — proyek asli yang menginspirasi fork ini. OmniRoute dibangun di atas fondasi luar biasa tersebut dengan fitur tambahan, API multi-modal, dan penulisan ulang TypeScript lengkap.

Terima kasih khusus kepada **[CLIProxyAPI](https://github.com/router-for-me/CLIProxyAPI)** — implementasi Go asli yang menginspirasi port JavaScript ini.

---

## 📄 Lisensi

Lisensi MIT - lihat [LICENSE](LICENSE) untuk detailnya.

---

<div align="center">
  <sub>Dibangun dengan ❤️ untuk pengembang yang membuat kode 24/7</sub>
  <br/>
  <sub><a href="https://omniroute.online">omniroute.online</a></sub>
</div>
<!-- Diskusi GitHub diaktifkan untuk Tanya Jawab komunitas -->
