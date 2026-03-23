<div align="center">
  <img src="./docs/screenshots/MainOmniRoute.png" alt="OmniRoute Dashboard" width="800"/>
  
  # 🚀 OmniRoute — Gerbang AI Percuma

### Jangan sekali-kali berhenti mengekod. Penghalaan pintar ke **model AI PERCUMA & kos rendah** dengan sandaran automatik.

_Proksi API universal anda — satu titik akhir, 36+ pembekal, masa henti sifar._

**Penyelesaian Sembang • Pembenaman • Penjanaan Imej • Audio • Kedudukan Semula • 100% TypeScript**

---

### 🆕 What's New in v2.7.0

- **Pluggable RouterStrategy** — rules, cost, and latency routing strategies
- **Multilingual intent detection** — routing scoring in 30+ languages
- **Request deduplication** — prevent duplicate API calls via content hash
- **New providers:** Grok-4 Fast (xAI), GLM-5 / Z.AI, MiniMax M2.5, Kimi K2.5
- **Updated pricing:** Grok-4 Fast $0.20/$0.50/M, GLM-5 $0.50/M, MiniMax M2.5 $0.30/M

---

### 🚀 New in v2.0.9+ — Playground, CLI Fingerprints & ACP

| Feature                                    | What It Does                                                                                                                                  |
| ------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------- |
| 🎮 **Model Playground**                    | Dashboard page to test any model directly — provider/model/endpoint selectors, Monaco Editor, streaming, abort, timing                        |
| 🔏 **CLI Fingerprint Matching**            | Per-provider header/body ordering to match native CLI signatures — toggle per provider in Settings > Security. **Your proxy IP is preserved** |
| 🤝 **ACP Support (Agent Client Protocol)** | CLI agent discovery (Codex, Claude, Goose, Gemini CLI, OpenClaw), process spawner, `/api/acp/agents` endpoint                                 |
| 🤖 **ACP Agents Dashboard**                | Debug > Agents page — grid of 14 agents with install status, version, custom agent form for any CLI tool                                      |
| 🔧 **Custom Model `apiFormat` Routing**    | Custom models with `apiFormat: "responses"` now correctly route to the Responses API translator                                               |
| 🏢 **Codex Workspace Isolation**           | Multiple Codex workspaces per email — OAuth correctly separates connections by workspace ID                                                   |
| 🔄 **Electron Auto-Update**                | Desktop app checks for updates + auto-install on restart                                                                                      |

### 🤖 Pembekal AI percuma untuk ejen pengekodan kegemaran anda

_Sambungkan mana-mana alat IDE atau CLI berkuasa AI melalui OmniRoute — get laluan API percuma untuk pengekodan tanpa had._

  <table>
    <tr>
      <td align="center" width="110">
        <a href="https://github.com/cline/cline">
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

<sub>📡 Semua ejen menyambung melalui <code>http://localhost:20128/v1</code> atau <code>http://cloud.omniroute.online/v1</code> atau model <code>http://cloud.omniroute.online/v1 —i_24_TOKEN dan satu —i_konfigurasi kuota</sub>

---

[![npm version](https://img.shields.io/npm/v/omniroute?color=cb3837&logo=npm)](https://www.npmjs.com/package/omniroute)
[![Docker Hub](https://img.shields.io/docker/v/diegosouzapw/omniroute?label=Docker%20Hub&logo=docker&color=2496ED)](https://hub.docker.com/r/diegosouzapw/omniroute)
[![License](https://img.shields.io/github/license/diegosouzapw/OmniRoute)](https://github.com/diegosouzapw/OmniRoute/blob/main/LICENSE)
[![Website](https://img.shields.io/badge/Website-omniroute.online-blue?logo=google-chrome&logoColor=white)](https://omniroute.online)
[![WhatsApp](https://img.shields.io/badge/WhatsApp-Community-25D366?logo=whatsapp&logoColor=white)](https://chat.whatsapp.com/JI7cDQ1GyaiDHhVBpLxf8b?mode=gi_t)

[🌐 Website](https://omniroute.online) • [🚀 Quick Start](#-quick-start) • [💡 Features](#-key-features) • [📖 Docs](#-documentation) • [💰 Pricing](#-pricing-at-a-glance) • [💬 WhatsApp](https://chat.whatsapp.com/JI7cDQ1GyaiDHhVBpLxf8b?mode=gi_t)

🌐 **Available in:** 🇺🇸 [English](../../README.md) | 🇧🇷 [Português (Brasil)](../pt-BR/README.md) | 🇪🇸 [Español](../es/README.md) | 🇫🇷 [Français](../fr/README.md) | 🇮🇹 [Italiano](../it/README.md) | 🇷🇺 [Русский](../ru/README.md) | 🇨🇳 [中文 (简体)](../zh-CN/README.md) | 🇩🇪 [Deutsch](../de/README.md) | 🇮🇳 [हिन्दी](../in/README.md) | 🇹🇭 [ไทย](../th/README.md) | 🇺🇦 [Українська](../uk-UA/README.md) | 🇸🇦 [العربية](../ar/README.md) | 🇯🇵 [日本語](../ja/README.md) | 🇻🇳 [Tiếng Việt](../vi/README.md) | 🇧🇬 [Български](../bg/README.md) | 🇩🇰 [Dansk](../da/README.md) | 🇫🇮 [Suomi](../fi/README.md) | 🇮🇱 [עברית](../he/README.md) | 🇭🇺 [Magyar](../hu/README.md) | 🇮🇩 [Bahasa Indonesia](../id/README.md) | 🇰🇷 [한국어](../ko/README.md) | 🇲🇾 [Bahasa Melayu](../ms/README.md) | 🇳🇱 [Nederlands](../nl/README.md) | 🇳🇴 [Norsk](../no/README.md) | 🇵🇹 [Português (Portugal)](../pt/README.md) | 🇷🇴 [Română](../ro/README.md) | 🇵🇱 [Polski](../pl/README.md) | 🇸🇰 [Slovenčina](../sk/README.md) | 🇸🇪 [Svenska](../sv/README.md) | 🇵🇭 [Filipino](../phi/README.md)

</div>

---

## 🖼️

<div align="center">
  <img src="./docs/screenshots/MainOmniRoute.png" alt="OmniRoute" width="800"/>
</div>

---

## 📸

<details>
<summary><b>...</b></summary>

| #     | #                                        |
| ----- | ---------------------------------------- |
| **1** | ![1](docs/screenshots/01-providers.png)  |
| **2** | ![2](docs/screenshots/02-combos.png)     |
| **3** | ![3](docs/screenshots/03-analytics.png)  |
| **4** | ![4](docs/screenshots/04-health.png)     |
| **5** | ![5](docs/screenshots/05-translator.png) |
| **6** | ![6](docs/screenshots/06-settings.png)   |
| **7** | ![7](docs/screenshots/07-cli-tools.png)  |
| **8** | ![8](docs/screenshots/08-usage.png)      |
| **9** | ![9](docs/screenshots/09-endpoint.png)   |

</details>

---

## 🤔 Mengapa OmniRoute?

**Berhenti membazir wang dan mencapai had:**

- <img src="https://img.shields.io/badge/✗-e74c3c?style=flat-square" height="16"/> Kuota langganan tamat tempoh tidak digunakan setiap bulan
- <img src="https://img.shields.io/badge/✗-e74c3c?style=flat-square" height="16"/> Had kadar menghalang anda pertengahan pengekodan
- <img src="https://img.shields.io/badge/✗-e74c3c?style=flat-square" height="16"/> API Mahal ($20-50/bulan bagi setiap pembekal)
- <img src="https://img.shields.io/badge/✗-e74c3c?style=flat-square" height="16"/> Pertukaran manual antara pembekal

**OmniRoute menyelesaikan ini:**

- ✅ **Maksimumkan langganan** - Jejaki kuota, gunakan setiap bit sebelum ditetapkan semula
- ✅ **Auto sandaran** - Langganan → Kunci API → Murah → Percuma, masa henti sifar
- ✅ **Berbilang akaun** - Round-robin antara akaun bagi setiap pembekal
- ✅ **Universal** - Berfungsi dengan Kod Claude, Codex, Gemini CLI, Kursor, Cline, OpenClaw, sebarang alat CLI

---

## 📧 Sokongan

> 💬 **Sertai komuniti kami!** [WhatsApp Group](https://chat.whatsapp.com/JI7cDQ1GyaiDHhVBpLxf8b?mode=gi_t) — Dapatkan bantuan, kongsi petua dan kekal kemas kini.

- **Laman web**: [omniroute.online](https://omniroute.online)
- **GitHub**: [github.com/diegosouzapw/OmniRoute](https://github.com/diegosouzapw/OmniRoute)
- **Isu**: [github.com/diegosouzapw/OmniRoute/issues](https://github.com/diegosouzapw/OmniRoute/issues)
- **WhatsApp**: [Community Group](https://chat.whatsapp.com/JI7cDQ1GyaiDHhVBpLxf8b?mode=gi_t)
- **Projek Asal**: [9router by decolua](https://github.com/decolua/9router)

---

## 🔄 Cara Ia Berfungsi

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

## 🎯 Perkara yang Selesaikan OmniRoute — 30 Titik Sakit Nyata & Kes Penggunaan

> **Setiap pembangun yang menggunakan alatan AI menghadapi masalah ini setiap hari.** OmniRoute dibina untuk menyelesaikan kesemuanya — daripada lebihan kos kepada blok serantau, daripada aliran OAuth yang rosak kepada operasi protokol dan kebolehmerhatian perusahaan.

<details>
<summary><b>💸 1. "Saya membayar untuk langganan yang mahal tetapi masih terganggu oleh had"</b></summary>

Pembangun membayar $20–200/bulan untuk Claude Pro, Codex Pro atau GitHub Copilot. Walaupun membayar, kuota mempunyai siling — 5j penggunaan, had mingguan atau had kadar seminit. Sesi pertengahan pengekodan, pembekal berhenti bertindak balas dan pembangun kehilangan aliran dan produktiviti.

**Cara OmniRoute menyelesaikannya:**

- **Smart 4-Tier Fallback** — Jika kuota langganan habis, diubah hala secara automatik ke API Key → Murah → Percuma tanpa campur tangan manual
- **Penjejakan Kuota Masa Nyata** — Menunjukkan penggunaan token dalam masa nyata dengan kira detik tetapan semula (5j, harian, mingguan)
- **Sokongan Berbilang Akaun** — Berbilang akaun bagi setiap pembekal dengan auto round-robin — apabila satu kehabisan, beralih kepada yang seterusnya
- **Kombo Tersuai** — Rantaian sandaran yang boleh disesuaikan dengan 6 strategi pengimbangan (isi dahulu, round-robin, P2C, rawak, paling kurang digunakan, dioptimumkan kos)
- **Kuota Perniagaan Codex** — Pemantauan kuota ruang kerja Perniagaan/Pasukan terus dalam papan pemuka

</details>

<details>
<summary><b>🔌 2. "Saya perlu menggunakan berbilang penyedia tetapi setiap satu mempunyai API yang berbeza"</b></summary>

OpenAI menggunakan satu format, Claude (Anthropic) menggunakan satu lagi, Gemini satu lagi. Jika pembangun ingin menguji model daripada pembekal yang berbeza atau sandaran antara mereka, mereka perlu mengkonfigurasi semula SDK, menukar titik akhir, menangani format yang tidak serasi. Pembekal tersuai (FriendLI, NIM) mempunyai titik akhir model bukan standard.

**Cara OmniRoute menyelesaikannya:**

- **Titik Akhir Disatukan** — Satu `http://localhost:20128/v1` berfungsi sebagai proksi untuk kesemua 36+ pembekal
- **Format Terjemahan** — Automatik dan telus: OpenAI ↔ Claude ↔ Gemini ↔ Responses API
- **Pembersihan Tindak Balas** — Mengosongkan medan bukan standard (`x_groq`, `usage_breakdown`, `service_tier`) yang memecahkan OpenAI SDK v1.83+
- **Penormalan Peranan** — Menukar `developer` → `system` untuk penyedia bukan OpenAI; `system` → `user` untuk GLM/ERNIE
- **Think Tag Extraction** — Mengekstrak blok `<think>` daripada model seperti DeepSeek R1 ke dalam `reasoning_content` standard
- **Output Berstruktur untuk Gemini** — `json_schema` → `responseMimeType`/`responseSchema` penukaran automatik
- **`stream` lalai kepada `false`** — Menjajarkan dengan spesifikasi OpenAI, mengelakkan SSE yang tidak dijangka dalam Python/Rust/Go SDK

</details>

<details>
<summary><b>🌐 3. "Pembekal AI saya menyekat wilayah/negara saya"</b></summary>

Penyedia seperti OpenAI/Codex menyekat akses daripada kawasan geografi tertentu. Pengguna mendapat ralat seperti `unsupported_country_region_territory` semasa sambungan OAuth dan API. Ini amat mengecewakan bagi pemaju dari negara membangun.

**Cara OmniRoute menyelesaikannya:**

- **Konfigurasi Proksi 3 Tahap** — Proksi boleh dikonfigurasikan pada 3 peringkat: global (semua trafik), setiap pembekal (satu pembekal sahaja) dan setiap sambungan/kunci
- **Lencana Proksi Berkod Warna** — Penunjuk visual: 🟢 proksi global, 🟡 proksi pembekal, 🔵 proksi sambungan, sentiasa menunjukkan IP
- **Pertukaran Token OAuth Melalui Proksi** — Aliran OAuth juga melalui proksi, menyelesaikan `unsupported_country_region_territory`
- **Ujian Sambungan melalui Proksi** — Ujian sambungan menggunakan proksi yang dikonfigurasikan (tiada lagi pintasan langsung)
- **Sokongan SOCKS5** — Sokongan proksi SOCKS5 penuh untuk penghalaan keluar
- **TLS Fingerprint Spoofing** — Cap jari TLS seperti pelayar melalui `wreq-js` untuk memintas pengesanan bot

</details>

<details>
<summary><b>🆓 4. "Saya mahu menggunakan AI untuk pengekodan tetapi saya tidak mempunyai wang"</b></summary>

Tidak semua orang boleh membayar $20–200/bulan untuk langganan AI. Pelajar, pembangun dari negara baru muncul, penggemar dan pekerja bebas memerlukan akses kepada model berkualiti pada kos sifar.

**Cara OmniRoute menyelesaikannya:**

- **Pembekal Peringkat Percuma Terbina dalam** — Sokongan asli untuk 100% pembekal percuma: iFlow (8 model tanpa had), Qwen (3 model tanpa had), Kiro (Claude secara percuma), Gemini CLI (180K/bulan percuma)
- **Ollama Cloud** — Cloud-hosted Ollama models at `api.ollama.com` with free "Light usage" tier; use `ollamacloud/<model>` prefix
- **Kombo Percuma Sahaja** — Rantaian `gc/gemini-3-flash → if/kimi-k2-thinking → qw/qwen3-coder-plus` = $0/bulan dengan masa henti sifar
- **Kredit Percuma NVIDIA NIM** — 1000 kredit percuma disepadukan
- **Strategi Dioptimumkan Kos** — Strategi penghalaan yang secara automatik memilih pembekal yang tersedia paling murah

</details>

<details>
<summary><b>🔒 5. "Saya perlu melindungi gerbang AI saya daripada akses tanpa kebenaran"</b></summary>

Apabila mendedahkan get laluan AI kepada rangkaian (LAN, VPS, Docker), sesiapa sahaja yang mempunyai alamat boleh menggunakan token/kuota pembangun. Tanpa perlindungan, API terdedah kepada penyalahgunaan, suntikan segera dan penyalahgunaan.

**Cara OmniRoute menyelesaikannya:**

- **Pengurusan Kunci API** — Penjanaan, penggiliran dan skop setiap pembekal dengan halaman `/dashboard/api-manager` khusus
- **Kebenaran Tahap Model** — Hadkan kunci API kepada model tertentu (`openai/*`, corak kad bebas), dengan Togol Benarkan Semua/Sekat
- **Perlindungan Titik Akhir API** — Memerlukan kunci untuk `/v1/models` dan menyekat penyedia tertentu daripada penyenaraian
- **Auth Guard + CSRF Protection** — Semua laluan papan pemuka dilindungi dengan `withAuth` middleware + token CSRF
- **Penghad Kadar** — Pengehadan kadar Per-IP dengan tetingkap boleh dikonfigurasikan
- **Penapisan IP** — Senarai Benar/senarai sekat untuk kawalan akses
- **Pengawal Suntikan Segera** — Pensanitasi terhadap corak segera yang berniat jahat
- **Penyulitan AES-256-GCM** — Bukti kelayakan disulitkan semasa rehat

</details>

<details>
<summary><b>🛑 6. "Pembekal saya gagal dan saya kehilangan aliran pengekodan saya"</b></summary>

Pembekal AI boleh menjadi tidak stabil, mengembalikan ralat 5xx atau mencapai had kadar sementara. Jika pembangun bergantung pada penyedia tunggal, mereka akan terganggu. Tanpa pemutus litar, percubaan semula berulang boleh ranap aplikasi.

**Cara OmniRoute menyelesaikannya:**

- **Pemutus Litar bagi setiap pembekal** — Auto buka/tutup dengan ambang boleh dikonfigurasikan dan cooldown (Ditutup/Buka/Separuh Terbuka)
- **Penyingkiran Eksponen** — Kelewatan percubaan semula progresif
- **Kawanan Anti Gemuruh** — Mutex + perlindungan semafor terhadap ribut percubaan semula serentak
- **Kombo Rantai Sandar** — Jika pembekal utama gagal, secara automatik jatuh melalui rantaian tanpa campur tangan
- **Pemutus Litar Kombo** — Lumpuhkan automatik pembekal yang gagal dalam rantaian kombo
- **Papan Pemuka Kesihatan** — Pemantauan masa aktif, keadaan pemutus litar, penguncian, statistik cache, kependaman p50/p95/p99

</details>

<details>
<summary><b>🔧 7. "Mengkonfigurasi setiap alat AI adalah membosankan dan berulang"</b></summary>

Pembangun menggunakan Kursor, Kod Claude, Codex CLI, OpenClaw, Gemini CLI, Kod Kilo... Setiap alat memerlukan konfigurasi yang berbeza (titik akhir API, kunci, model). Mengkonfigurasi semula apabila menukar pembekal atau model adalah membuang masa.

**Cara OmniRoute menyelesaikannya:**

- **Papan Pemuka Alat CLI** — Halaman khusus dengan persediaan satu klik untuk Claude Code, Codex CLI, OpenClaw, Kilo Code, Antigravity, Cline
- **GitHub Copilot Config Generator** — Menghasilkan `chatLanguageModels.json` untuk Kod VS dengan pemilihan model pukal
- **Onboarding Wizard** — Persediaan 4 langkah berpandu untuk pengguna kali pertama
- **Satu titik akhir, semua model** — Konfigurasikan `http://localhost:20128/v1` sekali, akses 36+ pembekal

</details>

<details>
<summary><b>🔑 8. "Menguruskan token OAuth daripada berbilang penyedia adalah neraka"</b></summary>

Kod Claude, Codex, Gemini CLI, Copilot — semuanya menggunakan OAuth 2.0 dengan token tamat tempoh. Pembangun perlu sentiasa mengesahkan semula, menangani `client_secret is missing`, `redirect_uri_mismatch` dan kegagalan pada pelayan jauh. OAuth pada LAN/VPS amat bermasalah.

**Cara OmniRoute menyelesaikannya:**

- **Muat Semula Token Auto** — Token OAuth dimuat semula di latar belakang sebelum tamat tempoh
- **OAuth 2.0 (PKCE) Terbina dalam** — Aliran automatik untuk Kod Claude, Codex, Gemini CLI, Copilot, Kiro, Qwen, iFlow
- **OAuth Berbilang Akaun** — Berbilang akaun bagi setiap pembekal melalui pengekstrakan token JWT/ID
- **OAuth LAN/Remote Fix** — Pengesanan IP peribadi untuk `redirect_uri` + mod URL manual untuk pelayan jauh
- **OAuth Behind Nginx** — Menggunakan `window.location.origin` untuk keserasian proksi terbalik
- **Panduan OAuth Jauh** — Panduan langkah demi langkah untuk kelayakan Google Cloud pada VPS/Docker

</details>

<details>
<summary><b>📊 9. "Saya tidak tahu berapa banyak yang saya belanjakan atau di mana"</b></summary>

Pembangun menggunakan berbilang penyedia berbayar tetapi tidak mempunyai pandangan bersatu tentang perbelanjaan. Setiap pembekal mempunyai papan pemuka pengebilan sendiri, tetapi tiada paparan disatukan. Kos yang tidak dijangka boleh bertimbun.

**Cara OmniRoute menyelesaikannya:**

- **Papan Pemuka Analitis Kos** — Penjejakan kos per-token dan pengurusan belanjawan bagi setiap pembekal
- **Had Belanjawan setiap Peringkat** — Siling perbelanjaan setiap peringkat yang mencetuskan sandaran automatik
- **Konfigurasi Harga Per-Model** — Harga boleh dikonfigurasikan bagi setiap model
- **Statistik Penggunaan Setiap Kunci API** — Kiraan permintaan dan cap masa yang terakhir digunakan setiap kunci
- **Papan Pemuka Analitik** — Kad statistik, carta penggunaan model, jadual pembekal dengan kadar kejayaan dan kependaman

</details>

<details>
<summary><b>🐛 10. "Saya tidak dapat mendiagnosis ralat dan masalah dalam panggilan AI"</b></summary>

Apabila panggilan gagal, pembangun tidak tahu sama ada ia adalah had kadar, token tamat tempoh, format yang salah atau ralat pembekal. Log berpecah-belah merentasi terminal yang berbeza. Tanpa pemerhatian, penyahpepijatan adalah percubaan-dan-ralat.

**Cara OmniRoute menyelesaikannya:**

- **Papan Pemuka Log Bersatu** — 4 tab: Log Permintaan, Log Proksi, Log Audit, Konsol
- **Pemapar Log Konsol** — Pemapar gaya terminal masa nyata dengan tahap berkod warna, tatal automatik, carian, penapis
- **Log Proksi SQLite** — Log berterusan yang bertahan dimulakan semula
- **Taman Permainan Penterjemah** — 4 mod nyahpepijat: Taman Permainan (terjemahan format), Penguji Sembang (perjalanan pergi balik), Bangku Ujian (batch), Monitor Langsung (masa nyata)
- **Permintaan Telemetri** — kependaman p50/p95/p99 + pengesanan X-Request-Id
- **Pengelogan Berasaskan Fail dengan Putaran** — Pemintas konsol menangkap segala-galanya ke log JSON dengan putaran berasaskan saiz

</details>

<details>
<summary><b>🏗️ 11. "Menyedia dan menyelenggara gerbang adalah rumit"</b></summary>

Memasang, mengkonfigurasi dan menyelenggara proksi AI merentas persekitaran yang berbeza (tempatan, VPS, Docker, awan) adalah intensif buruh. Masalah seperti laluan berkod keras, `EACCES` pada direktori, konflik port dan binaan merentas platform menambah geseran.

**Cara OmniRoute menyelesaikannya:**

- **pemasangan global npm** — `npm install -g omniroute && omniroute` — selesai
- **Docker Multi-Platform** — AMD64 + ARM64 asli (Apple Silicon, AWS Graviton, Raspberry Pi)
- **Profil Karang Docker** — `base` (tiada alat CLI) dan `cli` (dengan Kod Claude, Codex, OpenClaw)
- **Apl Desktop Elektron** — Apl asli untuk Windows/macOS/Linux dengan dulang sistem, auto mula, mod luar talian
- **Mod Split-Port** — API dan Papan Pemuka pada port berasingan untuk senario lanjutan (proksi terbalik, rangkaian kontena)
- **Cloud Sync** — Konfigurasikan penyegerakan merentas peranti melalui Cloudflare Workers
- **Sandaran DB** — Sandaran automatik, pulihkan, eksport dan import semua tetapan

</details>

<details>
<summary><b>🌍 12. "Antara muka adalah bahasa Inggeris sahaja dan pasukan saya tidak berbahasa Inggeris"</b></summary>

Pasukan di negara bukan berbahasa Inggeris, terutamanya di Amerika Latin, Asia dan Eropah, bergelut dengan antara muka bahasa Inggeris sahaja. Halangan bahasa mengurangkan penggunaan dan meningkatkan ralat konfigurasi.

**Cara OmniRoute menyelesaikannya:**

- **Papan pemuka i18n — 30 Bahasa** — Semua 500+ kunci diterjemahkan termasuk bahasa Arab, Bulgaria, Denmark, Jerman, Sepanyol, Finland, Perancis, Ibrani, Hindi, Hungary, Indonesia, Itali, Jepun, Korea, Melayu, Belanda, Norway, Poland, Portugis (PT/BR), Romania, Rusia, Slovak, Sweden, Thai, Ukraine, Vietnam, Cina
- **Sokongan RTL** — Sokongan kanan ke kiri untuk bahasa Arab dan Ibrani
- **README Berbilang Bahasa** — 30 terjemahan dokumentasi lengkap
- **Pemilih Bahasa** — Ikon Glob dalam pengepala untuk penukaran masa nyata

</details>

<details>
<summary><b>🔄 13. "Saya perlukan lebih daripada sembang — saya perlukan benam, imej, audio"</b></summary>

AI bukan sekadar penyelesaian sembang. Pembangun perlu menjana imej, menyalin audio, membuat pembenaman untuk RAG, menyusun semula dokumen dan kandungan sederhana. Setiap API mempunyai titik akhir dan format yang berbeza.

**Cara OmniRoute menyelesaikannya:**

- **Pembenaman** — `/v1/embeddings` dengan 6 pembekal dan 9+ model
- **Penjanaan Imej** — `/v1/images/generations` dengan 10 pembekal dan 20+ model (OpenAI, xAI, Together, Bunga Api, Nebius, Hiperbolik, NanoBanana, Antigraviti, SD WebUI, ComfyUI)
- **Teks-ke-Video** — `/v1/videos/generations` — ComfyUI (AnimateDiff, SVD) dan SD WebUI
- **Teks-ke-Muzik** — `/v1/music/generations` — ComfyUI (Audio Terbuka, MusicGen)
- **Transkripsi Audio** — `/v1/audio/transcriptions` — Whisper + Nvidia NIM, HuggingFace, Qwen3
- **Teks-ke-Ucapan** — `/v1/audio/speech` — ElevenLabs, Nvidia NIM, HuggingFace, Coqui, Tortoise, Qwen3, Inworld, Cartesia, PlayHT, + pembekal sedia ada
- **Moderasi** — `/v1/moderations` — Pemeriksaan keselamatan kandungan
- **Penyusunan semula** — `/v1/rerank` — Penyusunan semula perkaitan dokumen
- **Respons API** — Sokongan penuh `/v1/responses` untuk Codex

</details>

<details>
<summary><b>🧪 14. "Saya tiada cara untuk menguji dan membandingkan kualiti merentas model"</b></summary>

Pembangun ingin mengetahui model mana yang terbaik untuk kes penggunaan mereka — kod, terjemahan, penaakulan — tetapi membandingkan secara manual adalah perlahan. Tiada alat eval bersepadu wujud.

**Cara OmniRoute menyelesaikannya:**

- **LLM Evaluations** — Ujian set emas dengan 10 kes pra-muat meliputi salam, matematik, geografi, penjanaan kod, pematuhan JSON, terjemahan, penurunan harga, penolakan keselamatan
- **4 Strategi Padanan** — `exact`, `contains`, `regex`, `custom` (fungsi JS)
- **Bangku Ujian Taman Permainan Penterjemah** — Ujian kelompok dengan berbilang input dan output yang dijangka, perbandingan merentas pembekal
- **Penguji Sembang** — Perjalanan pergi balik penuh dengan pemaparan respons visual
- **Pantau Langsung** — Strim masa nyata semua permintaan yang mengalir melalui proksi

</details>

<details>
<summary><b>📈 15. "Saya perlu skala tanpa kehilangan prestasi"</b></summary>

Apabila volum permintaan bertambah, tanpa menyimpan cache soalan yang sama menjana kos pendua. Tanpa idempotensi, pendua meminta pemprosesan sisa. Had kadar setiap pembekal mesti dipatuhi.

**Cara OmniRoute menyelesaikannya:**

- **Cache Semantik** — Cache dua peringkat (tandatangan + semantik) mengurangkan kos dan kependaman
- **Request Idempotency** — tetingkap penyahduplikasi 5s untuk permintaan yang sama
- **Pengesanan Had Kadar** — RPM setiap pembekal, jurang min dan penjejakan serentak maks
- **Had Kadar Boleh Diedit** — Lalai boleh dikonfigurasikan dalam Tetapan → Ketahanan dengan kegigihan
- **Cache Pengesahan Kunci API** — Cache 3 peringkat untuk prestasi pengeluaran
- **Papan Pemuka Kesihatan dengan Telemetri** — kependaman p50/p95/p99, statistik cache, masa beroperasi

</details>

<details>
<summary><b>🤖 16. "Saya mahu mengawal tingkah laku model secara global"</b></summary>

Pembangun yang mahukan semua respons dalam bahasa tertentu, dengan nada tertentu atau ingin mengehadkan token penaakulan. Mengkonfigurasi ini dalam setiap alat/permintaan adalah tidak praktikal.

**Cara OmniRoute menyelesaikannya:**

- **System Prompt Injection** — Gesaan global digunakan untuk semua permintaan
- **Pengesahan Belanjawan Berfikir** — Kawalan peruntukan token penaakulan setiap permintaan (laluan, auto, tersuai, adaptif)
- **6 Strategi Penghalaan** — Strategi global yang menentukan cara permintaan diedarkan
- **Penghala Wildcard** — Corak `provider/*` halakan secara dinamik kepada mana-mana pembekal
- **Kombo Dayakan/Lumpuhkan Togol** — Togol kombo terus dari papan pemuka
- **Togol Pembekal** — Dayakan/lumpuhkan semua sambungan untuk pembekal dengan satu klik
- **Pembekal Disekat** — Kecualikan pembekal khusus daripada penyenaraian `/v1/models`

</details>

<details>
<summary><b>🧰 17. "Saya memerlukan alatan MCP sebagai keupayaan produk kelas pertama"</b></summary>

Banyak get laluan AI mendedahkan MCP hanya sebagai butiran pelaksanaan tersembunyi. Pasukan memerlukan lapisan operasi yang boleh dilihat dan boleh diurus.

**Cara OmniRoute menyelesaikannya:**

- MCP muncul dalam navigasi papan pemuka dan tab protokol titik akhir
- Halaman pengurusan MCP khusus dengan proses, alatan, skop dan audit
- Permulaan pantas terbina dalam untuk `omniroute --mcp` dan onboarding pelanggan

</details>

<details>
<summary><b>🧠 18. "Saya memerlukan orkestrasi A2A dengan laluan tugas penyegerakan + aliran"</b></summary>

Aliran kerja ejen memerlukan balasan langsung dan pelaksanaan strim jangka panjang dengan kawalan kitaran hayat.

**Cara OmniRoute menyelesaikannya:**

- Titik akhir A2A JSON-RPC (`POST /a2a`) dengan `message/send` dan `message/stream`
- Penstriman SSE dengan penyebaran keadaan terminal
- API kitaran hayat tugas untuk `tasks/get` dan `tasks/cancel`

</details>

<details>
<summary><b>🛰️ 19. "Saya memerlukan kesihatan proses MCP sebenar, bukan status yang diduga"</b></summary>

Pasukan operasi perlu mengetahui sama ada MCP sebenarnya masih hidup, bukan hanya sama ada API boleh dicapai.

**Cara OmniRoute menyelesaikannya:**

- Fail degupan jantung masa jalan dengan PID, cap masa, pengangkutan, kiraan alat dan mod skop
- API status MCP yang menggabungkan degupan jantung + aktiviti terkini
- Kad status UI untuk kesegaran proses/masa hidup/degupan jantung

</details>

<details>
<summary><b>📋 20. "Saya memerlukan pelaksanaan alat MCP yang boleh diaudit"</b></summary>

Apabila alat mengubah konfigurasi atau mencetuskan tindakan ops, pasukan memerlukan kebolehkesanan forensik.

**Cara OmniRoute menyelesaikannya:**

- Pengelogan audit yang disokong SQLite untuk panggilan alat MCP
- Tapis mengikut alat, kejayaan/kegagalan, kunci API dan penomboran
- Jadual audit papan pemuka + titik akhir statistik untuk automasi

</details>

<details>
<summary><b>🔐 21. "Saya memerlukan keizinan MCP berskop bagi setiap penyepaduan"</b></summary>

Pelanggan yang berbeza harus mempunyai akses paling tidak istimewa kepada kategori alat.

**Cara OmniRoute menyelesaikannya:**

- 9 skop MCP berbutir untuk akses alat terkawal
- Penguatkuasaan skop dan keterlihatan dalam UI pengurusan MCP
- Postur lalai yang selamat untuk perkakas operasi

</details>

<details>
<summary><b>⚙️ 22. "Saya memerlukan kawalan operasi tanpa mengatur semula"</b></summary>

Pasukan memerlukan perubahan masa jalan yang cepat semasa insiden atau peristiwa kos.

**Cara OmniRoute menyelesaikannya:**

- Tukar pengaktifan kombo terus dari papan pemuka MCP
- Gunakan profil daya tahan daripada pek dasar yang telah ditetapkan
- Tetapkan semula keadaan pemutus litar daripada panel operasi yang sama

</details>

<details>
<summary><b>🔄 23. "Saya memerlukan keterlihatan dan pembatalan kitaran hayat tugas A2A secara langsung"</b></summary>

Tanpa keterlihatan kitaran hayat, insiden tugasan menjadi sukar untuk dicuba.

**Cara OmniRoute menyelesaikannya:**

- Penyenaraian tugas/penapisan mengikut keadaan/kemahiran dengan penomboran
- Latih tubi tentang metadata tugas, peristiwa dan artifak
- Titik akhir pembatalan tugas dan tindakan UI dengan pengesahan

</details>

<details>
<summary><b>🌊 24. "Saya memerlukan metrik strim aktif untuk beban A2A"</b></summary>

Aliran kerja penstriman memerlukan cerapan operasi tentang konkurensi dan sambungan langsung.

**Cara OmniRoute menyelesaikannya:**

- Kaunter aliran aktif disepadukan ke dalam status A2A
- Cap masa tugas terakhir dan kiraan setiap negeri
- Kad papan pemuka A2A untuk pemantauan operasi masa nyata

</details>

<details>
<summary><b>🪪 25. "Saya memerlukan penemuan ejen standard untuk pelanggan"</b></summary>

Pelanggan dan orkestra luar memerlukan metadata yang boleh dibaca mesin untuk onboarding.

**Cara OmniRoute menyelesaikannya:**

- Kad Agen terdedah pada `/.well-known/agent.json`
- Keupayaan dan kemahiran ditunjukkan dalam UI pengurusan
- API status A2A termasuk metadata penemuan untuk automasi

</details>

<details>
<summary><b>🧭 26. "Saya memerlukan kebolehtemuan protokol dalam produk UX"</b></summary>

Jika pengguna tidak dapat menemui permukaan protokol, penggunaan dan kualiti sokongan akan menurun.

**Cara OmniRoute menyelesaikannya:**

- Entri bar sisi untuk MCP dan A2A
- Tab Protokol halaman titik akhir dengan permulaan pantas dan status
- Pautan dari gambaran keseluruhan ke papan pemuka pengurusan khusus

</details>

<details>
<summary><b>🧪 27. "Saya memerlukan pengesahan protokol hujung ke hujung dengan pelanggan sebenar"</b></summary>

Ujian olok-olok tidak mencukupi untuk mengesahkan keserasian protokol sebelum dikeluarkan.

**Cara OmniRoute menyelesaikannya:**

- Suite E2E yang but apl dan menggunakan pengangkutan pelanggan MCP SDK sebenar
- Ujian pelanggan A2A untuk penemuan, menghantar, menstrim, mendapatkan dan membatalkan aliran
- Periksa silang dakwaan terhadap audit MCP dan API tugasan A2A

</details>

<details>
<summary><b>📡 28. "Saya memerlukan pemerhatian bersatu merentas semua antara muka"</b></summary>

Memisahkan kebolehmerhatian mengikut protokol mewujudkan titik buta dan MTTR yang lebih panjang.

**Cara OmniRoute menyelesaikannya:**

- Papan pemuka/log/analisis bersatu dalam satu produk
- Kesihatan + audit + telemetri permintaan merentas lapisan OpenAI, MCP dan A2A
- API Operasi untuk status dan automasi

</details>

<details>
<summary><b>💼 29. "Saya memerlukan satu masa jalan untuk proksi + alatan + orkestrasi ejen"</b></summary>

Menjalankan banyak perkhidmatan berasingan meningkatkan kos operasi dan mod kegagalan.

**Cara OmniRoute menyelesaikannya:**

- Proksi serasi OpenAI, pelayan MCP dan pelayan A2A dalam satu tindanan
- Kebenaran dikongsi, daya tahan, stor data dan kebolehmerhatian
- Model dasar yang konsisten merentas semua permukaan interaksi

</details>

<details>
<summary><b>🚀 30. "Saya perlu menghantar aliran kerja ejentik tanpa sebaran kod gam"</b></summary>

Pasukan kehilangan halaju apabila mencantumkan berbilang perkhidmatan dan skrip ad-hoc.

**Cara OmniRoute menyelesaikannya:**

- Strategi titik akhir bersatu untuk pelanggan dan ejen
- UI pengurusan protokol terbina dalam dan laluan pengesahan asap
- Asas sedia pengeluaran (keselamatan, pembalakan, daya tahan, sandaran)

</details>

### Contoh Buku Main (Kes Penggunaan Bersepadu)

**Playbook A: Maksimumkan langganan berbayar + sandaran murah**

```txt
Combo: "maximize-claude"
  1. cc/claude-opus-4-6
  2. glm/glm-4.7
  3. if/kimi-k2-thinking

Monthly cost: $20 + small backup spend
Outcome: higher quality, near-zero interruption
```

**Playbook B: Timbunan pengekodan kos sifar**

```txt
Combo: "free-forever"
  1. gc/gemini-3-flash
  2. if/kimi-k2-thinking
  3. qw/qwen3-coder-plus

Monthly cost: $0
Outcome: stable free coding workflow
```

**Playbook C: 24/7 rantai sandaran sentiasa hidup**

```txt
Combo: "always-on"
  1. cc/claude-opus-4-6
  2. cx/gpt-5.2-codex
  3. glm/glm-4.7
  4. minimax/MiniMax-M2.1
  5. if/kimi-k2-thinking

Outcome: deep fallback depth for deadline-critical workloads
```

**Playbook D: Operasi ejen dengan MCP + A2A**

```txt
1) Start MCP transport (`omniroute --mcp`) for tool-driven operations
2) Run A2A tasks via `message/send` and `message/stream`
3) Observe via /dashboard/mcp and /dashboard/a2a
4) Control incidents with resilience profile + task cancellation
```

---

## ⚡ Mula Pantas

**1. Pasang secara global:**

```bash
npm install -g omniroute
omniroute
```

🎉 Papan pemuka dibuka pada `http://localhost:20128`

| Perintah                | Penerangan                         |
| ----------------------- | ---------------------------------- |
| `omniroute`             | Mulakan pelayan (port lalai 20128) |
| `omniroute --port 3000` | Gunakan port tersuai               |
| `omniroute --no-open`   | Jangan auto buka penyemak imbas    |
| `omniroute --help`      | Tunjukkan bantuan                  |

**2. Sambungkan pembekal PERCUMA:**

Papan pemuka → Pembekal → Sambung **Kod Claude** atau **Antigraviti** → Log masuk OAuth → Selesai!

**3. Gunakan dalam alat CLI anda:**

```
Claude Code/Codex/Gemini CLI/OpenClaw/Cursor/Cline Settings:
  Endpoint: http://localhost:20128/v1
  API Key: [copy from dashboard]
  Model: if/kimi-k2-thinking
```

**Itu sahaja!** Mulakan pengekodan dengan model AI PERCUMA.

**Alternatif — dijalankan dari sumber:**

```bash
cp .env.example .env
npm install
PORT=20128 NEXT_PUBLIC_BASE_URL=http://localhost:20128 npm run dev
```

---

## 🐳 Docker

OmniRoute tersedia sebagai imej Docker awam pada [Docker Hub](https://hub.docker.com/r/diegosouzapw/omniroute).

**Larian pantas:**

```bash
docker run -d \
  --name omniroute \
  --restart unless-stopped \
  -p 20128:20128 \
  -v omniroute-data:/app/data \
  diegosouzapw/omniroute:latest
```

**Dengan fail persekitaran:**

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

**Menggunakan Docker Compose:**

```bash
# Base profile (no CLI tools)
docker compose --profile base up -d

# CLI profile (Claude Code, Codex, OpenClaw built-in)
docker compose --profile cli up -d
```

| Imej                     | Tag      | Saiz   | Penerangan              |
| ------------------------ | -------- | ------ | ----------------------- |
| `diegosouzapw/omniroute` | `latest` | ~250MB | Keluaran stabil terkini |
| `diegosouzapw/omniroute` | `1.0.3`  | ~250MB | Versi semasa            |

---

---

## 🖥️

> 🆕 **NEW!** OmniRoute is now available as a **native desktop application** for Windows, macOS, and Linux.

- 🖥️ **Native Window** — Dedicated app window with system tray integration
- 🔄 **Auto-Start** — Launch OmniRoute on system login
- 🔔 **Native Notifications** — Get alerts for quota exhaustion or provider issues
- ⚡ **One-Click Install** — NSIS (Windows), DMG (macOS), AppImage (Linux)
- 🌐 **Offline Mode** — Works fully offline with bundled server

```bash
npm run electron:dev           # Development mode
npm run electron:build         # Current platform
npm run electron:build:win     # Windows (.exe)
npm run electron:build:mac     # macOS (.dmg)
npm run electron:build:linux   # Linux (.AppImage)
```

📖 Full documentation: [`electron/README.md`](electron/README.md)

---

## 💰 Sekilas Pandang Harga

| Peringkat        | Pembekal         | Kos                          | Set Semula Kuota   | Terbaik Untuk           |
| ---------------- | ---------------- | ---------------------------- | ------------------ | ----------------------- |
| **💳 LANGGANAN** | Kod Claude (Pro) | $20/bln                      | 5j + mingguan      | Sudah melanggan         |
|                  | Codex (Plus/Pro) | $20-200/bln                  | 5j + mingguan      | Pengguna OpenAI         |
|                  | Gemini CLI       | **PERCUMA**                  | 180K/bln + 1K/hari | Semua orang!            |
|                  | GitHub Copilot   | $10-19/bln                   | Bulanan            | Pengguna GitHub         |
| **🔑 KUNCI API** | NVIDIA NIM       | **PERCUMA** (1000 kredit)    | Satu kali          | Ujian peringkat percuma |
|                  | DeepSeek         | Bayar setiap penggunaan      | Tiada              | Harga/kualiti terbaik   |
|                  | Groq             | Peringkat percuma + berbayar | Kadar terhad       | Inferens sangat pantas  |
|                  | xAI (Grok)       | Bayar setiap penggunaan      | Tiada              | Model Grok              |
|                  | Mistral          | Peringkat percuma + berbayar | Kadar terhad       | AI Eropah               |
|                  | OpenRouter       | Bayar setiap penggunaan      | Tiada              | 100+ model              |
| **💰 MURAH**     | GLM-4.7          | $0.6/1J                      | Setiap hari 10AM   | Sandaran belanjawan     |
|                  | MiniMax M2.1     | $0.2/1J                      | 5 jam bergolek     | Pilihan termurah        |
|                  | Kimi K2          | $9/bln flat                  | 10 juta token/bln  | Kos yang boleh diramal  |
| **🆓 PERCUMA**   | iFlow            | $0                           | tanpa had          | 8 model percuma         |
|                  | Qwen             | $0                           | tanpa had          | 3 model percuma         |
|                  | Kiro             | $0                           | tanpa had          | Claude percuma          |

**💡 Petua Pro:** Mulakan dengan Gemini CLI (180K percuma/bulan) + iFlow (percuma tanpa had) kombo = $0 kos!

---

## 💡 Ciri Utama

### 🧠 Penghalaan Teras & Kepintaran

| Ciri                               | Apa yang Dilakukan                                                                            |
| ---------------------------------- | --------------------------------------------------------------------------------------------- |
| 🎯 **Smart 4-Tier Fallback**       | Laluan automatik: Langganan → Kunci API → Murah → Percuma                                     |
| 📊 **Penjejakan Kuota Masa Nyata** | Kiraan token langsung + tetapan semula kira detik setiap pembekal                             |
| 🔄 **Terjemahan Format**           | OpenAI ↔ Claude ↔ Gemini ↔ Kursor ↔ Kiro lancar + pembersihan tindak balas                    |
| 👥 **Sokongan Berbilang Akaun**    | Berbilang akaun bagi setiap pembekal dengan pemilihan pintar                                  |
| 🔄 **Muat Semula Token Auto**      | Token OAuth dimuat semula secara automatik dengan cuba semula                                 |
| 🎨 **Kombo Tersuai**               | 6 strategi: isikan dahulu, round-robin, p2c, rawak, paling kurang digunakan, dioptimumkan kos |
| 🧩 **Model Tersuai**               | Tambahkan sebarang ID model pada mana-mana pembekal                                           |
| 🌐 **Penghala Wildcard**           | Halakan corak `provider/*` kepada mana-mana pembekal secara dinamik                           |
| 🧠 **Anggaran Berfikir**           | Mod laluan, auto, tersuai dan adaptif untuk model penaakulan                                  |
| 🔀 **Model Aliases**               | Auto-forward deprecated model IDs to current replacements (built-in + custom)                 |
| ⚡ **Background Degradation**      | Auto-route background tasks (titles, summaries) to cheaper models                             |
| 💬 **System Prompt Suntikan**      | Gesaan sistem global digunakan merentas semua permintaan                                      |
| 📄 **API Respons**                 | Sokongan OpenAI Responses API (`/v1/responses`) penuh untuk Codex                             |

### 🎵 API Berbilang Modal

| Ciri                     | Apa yang Dilakukan                                                                                                                                                         |
| ------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 🖼️ **Penjanaan Imej**    | `/v1/images/generations` — 4 pembekal, 9+ model                                                                                                                            |
| 📐 **Pembenaman**        | `/v1/embeddings` — 6 pembekal, 9+ model                                                                                                                                    |
| 🎤 **Transkripsi Audio** | `/v1/audio/transcriptions` — 7 providers (Deepgram Nova 3, AssemblyAI, Groq Whisper, HuggingFace, ElevenLabs, OpenAI, Azure), auto-language detection, MP4/MP3/WAV support |
| 🔊 **Teks-ke-Ucapan**    | `/v1/audio/speech` — 10 providers (ElevenLabs, OpenAI, Deepgram, Cartesia, PlayHT, HuggingFace, Nvidia NIM, Inworld, Coqui, Tortoise)                                      |
| 🛡️ **Kesederhanaan**     | `/v1/moderations` — Pemeriksaan keselamatan kandungan                                                                                                                      |
| 🔀 **Penyusunan semula** | `/v1/rerank` — Penarafan semula perkaitan dokumen                                                                                                                          |

### 🛡️ Ketahanan & Keselamatan

| Ciri                                | Apa yang Dilakukan                                                                     |
| ----------------------------------- | -------------------------------------------------------------------------------------- |
| 🔌 **Pemutus Litar**                | Auto buka/tutup setiap pembekal dengan ambang boleh dikonfigurasikan                   |
| 🛡️ **Kawanan Anti Guruh**           | Had kadar Mutex + semaphore untuk pembekal kunci API                                   |
| 🧠 **Cache Semantik**               | Cache dua peringkat (tandatangan + semantik) mengurangkan kos & kependaman             |
| ⚡ **Minta Idepotency**             | Tetingkap pendua 5s untuk permintaan pendua                                            |
| 🔒 **TLS Fingerprint Spoofing**     | Pintas pengesanan bot berasaskan TLS melalui wreq-js                                   |
| 🔏 **CLI Fingerprint Matching**     | Matches native CLI request signatures — **reduces ban risk while preserving proxy IP** |
| 🌐 **Penapisan IP**                 | Senarai kebenaran/senarai sekat untuk kawalan akses API                                |
| 📊 **Had Kadar Boleh Diedit**       | RPM boleh dikonfigurasikan, jurang min dan serentak maksimum pada tahap sistem         |
| 💾 **Rate Limit Persistence**       | Learned limits survive restarts via SQLite with 60s debounce + 24h staleness           |
| 🔄 **Token Refresh Resilience**     | Per-provider circuit breaker (5 fails→30min) + 30s timeout per attempt                 |
| 🛡 **Perlindungan Titik Akhir API** | Gating pengesahan + penyekatan penyedia untuk titik akhir `/models`                    |
| 🔒 **Keterlihatan Proksi**          | Lencana berkod warna: 🟢 global, 🟡 pembekal, 🔵 setiap sambungan dengan paparan IP    |
| 🌐 **Konfigurasi Proksi 3 Tahap**   | Konfigurasikan proksi pada peringkat global, setiap pembekal atau setiap sambungan     |

### 📊 Kebolehlihatan & Analitis

| Ciri                              | Apa yang Dilakukan                                                             |
| --------------------------------- | ------------------------------------------------------------------------------ |
| 📝 **Minta Pembalakan**           | Mod nyahpepijat dengan log permintaan/tindak balas penuh                       |
| 💾 **Log Proksi SQLite**          | Log proksi berterusan bertahan dimulakan semula pelayan                        |
| 📊 **Papan Pemuka Analitik**      | Dikuasakan semula: kad statistik, carta penggunaan model, jadual pembekal      |
| 📈 **Penjejakan Kemajuan**        | Ikut serta acara kemajuan SSE untuk penstriman                                 |
| 🧪 **Penilaian LLM**              | Ujian set emas dengan 4 strategi perlawanan                                    |
| 🔍 **Minta Telemetri**            | p50/p95/p99 pengagregatan kependaman + pengesanan X-Request-Id                 |
| 📋 **Papan Pemuka Log**           | Halaman 4 tab bersatu: Log Permintaan, Log Proksi, Log Audit, Konsol           |
| 🖥️ **Pemapar Log Konsol**         | Pemapar gaya terminal masa nyata dengan penapis tahap, carian, tatal automatik |
| 📑 **Pengelogan Berasaskan Fail** | Pemintas konsol menangkap semua output ke fail log JSON dengan putaran         |
| 🏥 **Papan Pemuka Kesihatan**     | Masa beroperasi sistem, keadaan pemutus litar, sekatan keluar, statistik cache |
| 💰 **Penjejakan Kos**             | Pengurusan belanjawan + konfigurasi harga setiap model                         |

### ☁️ Penyerahan & Penyegerakan

| Ciri                          | Apa yang Dilakukan                                                      |
| ----------------------------- | ----------------------------------------------------------------------- |
| 💾 **Penyegerakan Awan**      | Segerakkan konfigurasi merentas peranti melalui Cloudflare Workers      |
| 🌐 **Kerahkan Di Mana-mana**  | Localhost, VPS, Docker, Pekerja Cloudflare                              |
| 🔑 **Pengurusan Kunci API**   | Jana, putar dan skop kunci API bagi setiap pembekal                     |
| 🧙 **Onboarding Wizard**      | Persediaan berpandu 4 langkah untuk pengguna kali pertama               |
| 🔧 **Papan Pemuka Alat CLI**  | Konfigurasi satu klik Claude, Codex, Cline, OpenClaw, Kilo, Antigravity |
| 🔄 **Sandaran DB**            | Sandaran automatik, pulihkan, eksport & import untuk semua tetapan      |
| 🌐 **Pengantarabangsaan**     | i18n penuh dengan next-intl — sokongan Inggeris + Portugis (Brazil)     |
| 🌍 **Pemilih Bahasa**         | Ikon glob dalam pengepala untuk penukaran bahasa masa nyata (🇺🇸/🇧🇷)     |
| 📂 **Direktori Data Tersuai** | `DATA_DIR` env var untuk mengatasi laluan storan lalai `~/.omniroute`   |

<details>
<summary><b>📖 Butiran Ciri</b></summary>

### 🎯 Kemunduran 4 Peringkat Pintar

Cipta gabungan dengan sandaran automatik:

```
Combo: "my-coding-stack"
  1. cc/claude-opus-4-6        (your subscription)
  2. nvidia/llama-3.3-70b      (free NVIDIA API)
  3. glm/glm-4.7               (cheap backup, $0.6/1M)
  4. if/kimi-k2-thinking       (free fallback)

→ Auto switches when quota runs out or errors occur
```

### 📊 Penjejakan Kuota Masa Nyata

- Penggunaan token setiap pembekal
- Tetapkan semula kira detik (5 jam, harian, mingguan)
- Anggaran kos untuk peringkat berbayar
- Laporan perbelanjaan bulanan

### 🔄 Terjemahan Format

Terjemahan lancar antara format:

- **OpenAI** ↔ **Claude** ↔ **Gemini** ↔ **Respons OpenAI**
- Alat CLI anda menghantar format OpenAI → OmniRoute menterjemah → Pembekal menerima format asli
- Berfungsi dengan mana-mana alat yang menyokong titik akhir OpenAI tersuai
- **Pembersihan tindak balas** — Menghapuskan medan bukan standard untuk keserasian OpenAI SDK yang ketat
- **Penormalan peranan** — `developer` → `system` untuk bukan OpenAI; `system` → `user` untuk model GLM/ERNIE
- **Pengekstrakan teg Think** — `<think>` blok → `reasoning_content` untuk model pemikiran
- **Output berstruktur** — `json_schema` → Gemini's `responseMimeType`/`responseSchema`

### 👥 Sokongan Berbilang Akaun

- Tambah berbilang akaun bagi setiap pembekal
- Auto round-robin atau penghalaan berasaskan keutamaan
- Berundur ke akaun seterusnya apabila seseorang mencapai kuota

### 🔄 Muat Semula Token Auto

- Token OAuth dimuat semula secara automatik sebelum tamat tempoh
- Tiada pengesahan semula manual diperlukan
- Pengalaman lancar merentas semua pembekal

### 🎨 Kombo Tersuai

- Buat kombinasi model tanpa had
- 6 strategi: isikan dahulu, round-robin, kuasa dua pilihan, rawak, paling kurang digunakan, dioptimumkan kos
- Kongsi gabungan merentas peranti dengan Cloud Sync

### 🏥 Papan Pemuka Kesihatan

- Status sistem (masa hidup, versi, penggunaan memori)
- Keadaan pemutus litar bagi setiap pembekal (Tertutup/Terbuka/Separuh Terbuka)
- Status had kadar dan sekatan aktif
- Statistik cache tandatangan
- Telemetri kependaman (p50/p95/p99) + cache segera
- Tetapkan semula status kesihatan dengan satu klik

### 🔧 Taman Permainan Penterjemah

OmniRoute termasuk Taman Permainan Penterjemah terbina dalam yang berkuasa dengan **4 mod** untuk penyahpepijatan, ujian dan pemantauan terjemahan API:

| Mod                      | Penerangan                                                                                                                                                                                                                                            |
| ------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **💻 Taman permainan**   | Terjemahan format langsung — tampal mana-mana badan permintaan API dan lihat serta-merta cara OmniRoute menterjemahkannya antara format pembekal (OpenAI ↔ Claude ↔ Gemini ↔ Responses API). Termasuk templat contoh dan pengesanan automatik format. |
| **💬 Penguji Sembang**   | Hantar permintaan sembang sebenar melalui OmniRoute dan lihat perjalanan pergi balik penuh: input anda, permintaan yang diterjemahkan, respons pembekal dan balasan yang diterjemahkan kembali. Tidak ternilai untuk mengesahkan penghalaan kombo.    |
| **🧪 Bangku Ujian**      | Mod ujian kelompok — tentukan berbilang kes ujian dengan input dan output yang dijangkakan berbeza, jalankan semuanya sekali gus dan bandingkan hasil merentas pembekal dan model.                                                                    |
| **📱 Pemantau Langsung** | Pemantauan permintaan masa nyata — tonton permintaan masuk semasa ia mengalir melalui OmniRoute, lihat terjemahan format berlaku secara langsung dan kenal pasti isu serta-merta.                                                                     |

**Akses:** Papan Pemuka → Penterjemah (bar sisi)

### 💾 Penyegerakan Awan

- Penyegerakan penyedia, gabungan dan tetapan merentas peranti
- Penyegerakan latar belakang automatik
- Storan yang disulitkan selamat

</details>

## 🧪 Penilaian (Evals)

OmniRoute termasuk rangka kerja penilaian terbina dalam untuk menguji kualiti tindak balas LLM terhadap set emas. Aksesnya melalui **Analytics → Evals** dalam papan pemuka.

### Set Emas Terbina dalam

"Set Emas OmniRoute" pra-muat mengandungi 10 kes ujian yang meliputi:

- Salam, matematik, geografi, penjanaan kod
- Pematuhan format JSON, terjemahan, penurunan harga
- Penolakan keselamatan (kandungan berbahaya), pengiraan, logik boolean

### Strategi Penilaian

| Strategi   | Penerangan                                                            | Contoh                           |
| ---------- | --------------------------------------------------------------------- | -------------------------------- |
| `exact`    | Output mesti sepadan dengan tepat                                     | `"4"`                            |
| `contains` | Output mesti mengandungi subrentetan (tidak peka huruf besar-besaran) | `"Paris"`                        |
| `regex`    | Output mesti sepadan dengan corak regex                               | `"1.*2.*3"`                      |
| `custom`   | Fungsi JS tersuai mengembalikan benar/salah                           | `(output) => output.length > 10` |

---

## 📖 Panduan Persediaan

<details>
<summary><b>💳 Pembekal Langganan</b></summary>

### Kod Claude (Pro/Max)

```bash
Dashboard → Providers → Connect Claude Code
→ OAuth login → Auto token refresh
→ 5-hour + weekly quota tracking

Models:
  cc/claude-opus-4-6
  cc/claude-sonnet-4-5-20250929
  cc/claude-haiku-4-5-20251001
```

**Petua Pro:** Gunakan Opus untuk tugas yang rumit, Sonnet untuk kelajuan. OmniRoute menjejaki kuota setiap model!

### OpenAI Codex (Plus/Pro)

```bash
Dashboard → Providers → Connect Codex
→ OAuth login (port 1455)
→ 5-hour + weekly reset

Models:
  cx/gpt-5.2-codex
  cx/gpt-5.1-codex-max
```

### Gemini CLI (PERCUMA 180K/bulan!)

```bash
Dashboard → Providers → Connect Gemini CLI
→ Google OAuth
→ 180K completions/month + 1K/day

Models:
  gc/gemini-3-flash-preview
  gc/gemini-2.5-pro
```

**Nilai Terbaik:** Peringkat percuma yang besar! Gunakan ini sebelum peringkat berbayar.

### Copilot GitHub

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
<summary><b>🔑 Pembekal Kunci API</b></summary>

### NVIDIA NIM (PERCUMA 1000 kredit!)

1. Daftar: [build.nvidia.com](https://build.nvidia.com)
2. Dapatkan kunci API percuma (1000 kredit inferens disertakan)
3. Papan Pemuka → Tambah Pembekal → NVIDIA NIM:
   - Kunci API: `nvapi-your-key`

**Model:** `nvidia/llama-3.3-70b-instruct`, `nvidia/mistral-7b-instruct` dan 50+ lagi

**Petua Pro:** API serasi OpenAI — berfungsi dengan lancar dengan terjemahan format OmniRoute!

### DeepSeek

1. Daftar: [platform.deepseek.com](https://platform.deepseek.com)
2. Dapatkan kunci API
3. Papan Pemuka → Tambah Pembekal → DeepSeek

**Model:** `deepseek/deepseek-chat`, `deepseek/deepseek-coder`

### Groq (Tier Percuma Tersedia!)

1. Daftar: [console.groq.com](https://console.groq.com)
2. Dapatkan kunci API (termasuk peringkat percuma)
3. Papan Pemuka → Tambah Pembekal → Groq

**Model:** `groq/llama-3.3-70b`, `groq/mixtral-8x7b`

**Petua Pro:** Inferens sangat pantas — terbaik untuk pengekodan masa nyata!

### OpenRouter (100+ Model)

1. Daftar: [openrouter.ai](https://openrouter.ai)
2. Dapatkan kunci API
3. Papan Pemuka → Tambah Pembekal → OpenRouter

**Model:** Akses 100+ model daripada semua pembekal utama melalui kunci API tunggal.

</details>

<details>
<summary><b>💰 Penyedia Murah (Sandaran)</b></summary>

### GLM-4.7 (Tetapan semula harian, $0.6/1J)

1. Daftar: [Zhipu AI](https://open.bigmodel.cn/)
2. Dapatkan kunci API daripada Pelan Pengekodan
3. Papan Pemuka → Tambah Kunci API:
   - Pembekal: `glm`
   - Kunci API: `your-key`

**Gunakan:** `glm/glm-4.7`

**Petua Pro:** Pelan Pengekodan menawarkan kuota 3× pada kos 1/7! Tetapkan semula setiap hari 10:00 AM.

### MiniMax M2.1 (tetapan semula 5j, $0.20/1J)

1. Daftar: [MiniMax](https://www.minimax.io/)
2. Dapatkan kunci API
3. Papan Pemuka → Tambah Kunci API

**Gunakan:** `minimax/MiniMax-M2.1`

**Petua Pro:** Pilihan termurah untuk konteks panjang (token 1M)!

### Kimi K2 ($9/bulan rata)

1. Langgan: [Moonshot AI](https://platform.moonshot.ai/)
2. Dapatkan kunci API
3. Papan Pemuka → Tambah Kunci API

**Gunakan:** `kimi/kimi-latest`

**Petua Pro:** Tetap $9/bulan untuk 10J token = $0.90/1J kos efektif!

</details>

<details>
<summary><b>🆓 Pembekal PERCUMA (Sandaran Kecemasan)</b></summary>

### iFlow (8 model PERCUMA)

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

### Qwen (3 model PERCUMA)

```bash
Dashboard → Connect Qwen
→ Device code authorization
→ Unlimited usage

Models:
  qw/qwen3-coder-plus
  qw/qwen3-coder-flash
```

### Kiro (Claude PERCUMA)

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
<summary><b>🎨 Cipta Kombo</b></summary>

### Contoh 1: Maksimumkan Langganan → Sandaran Murah

```
Dashboard → Combos → Create New

Name: premium-coding
Models:
  1. cc/claude-opus-4-6 (Subscription primary)
  2. glm/glm-4.7 (Cheap backup, $0.6/1M)
  3. minimax/MiniMax-M2.1 (Cheapest fallback, $0.20/1M)

Use in CLI: premium-coding
```

### Contoh 2: Percuma-Sahaja (Kos Sifar)

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
<summary><b>🔧 CLI Integrasi</b></summary>

### IDE Kursor

```
Settings → Models → Advanced:
  OpenAI API Base URL: http://localhost:20128/v1
  OpenAI API Key: [from OmniRoute dashboard]
  Model: cc/claude-opus-4-6
```

### Kod Claude

Gunakan halaman **Alat CLI** dalam papan pemuka untuk konfigurasi satu klik atau edit `~/.claude/settings.json` secara manual.

### Codex CLI

```bash
export OPENAI_BASE_URL="http://localhost:20128"
export OPENAI_API_KEY="your-omniroute-api-key"

codex "your prompt"
```

### OpenClaw

**Pilihan 1 — Papan Pemuka (disyorkan):**

```
Dashboard → CLI Tools → OpenClaw → Select Model → Apply
```

**Pilihan 2 — Manual:** Edit `~/.openclaw/openclaw.json`:

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

> **Nota:** OpenClaw hanya berfungsi dengan OmniRoute tempatan. Gunakan `127.0.0.1` dan bukannya `localhost` untuk mengelakkan isu resolusi IPv6.

### Cline / Teruskan / RooCode

```
Settings → API Configuration:
  Provider: OpenAI Compatible
  Base URL: http://localhost:20128/v1
  API Key: [from OmniRoute dashboard]
  Model: if/kimi-k2-thinking
```

</details>

---

## 🐛 Menyelesaikan masalah

<details>
<summary><b>Klik untuk mengembangkan panduan penyelesaian masalah</b></summary>

**"Model bahasa tidak memberikan mesej"**

- Kuota pembekal habis → Semak penjejak kuota papan pemuka
- Penyelesaian: Gunakan sandaran kombo atau tukar kepada peringkat yang lebih murah

**Penghadan kadar**

- Kuota langganan habis → Sandar kepada GLM/MiniMax
- Tambah kombo: `cc/claude-opus-4-6 → glm/glm-4.7 → if/kimi-k2-thinking`

**Token OAuth tamat tempoh**

- Dikemas semula secara automatik oleh OmniRoute
- Jika isu berterusan: Papan Pemuka → Pembekal → Sambung semula

**Kos tinggi**

- Semak statistik penggunaan dalam Papan Pemuka → Kos
- Tukar model utama kepada GLM/MiniMax
- Gunakan peringkat percuma (Gemini CLI, iFlow) untuk tugasan yang tidak kritikal

**Papan pemuka dibuka pada port yang salah**

- Tetapkan `PORT=20128` dan `NEXT_PUBLIC_BASE_URL=http://localhost:20128`

**Ralat penyegerakan awan**

- Sahkan `BASE_URL` mata pada contoh larian anda
- Sahkan `CLOUD_URL` mata ke titik akhir awan anda yang dijangkakan
- Pastikan nilai `NEXT_PUBLIC_*` sejajar dengan nilai sebelah pelayan

**Log masuk pertama tidak berfungsi**

- Semak `INITIAL_PASSWORD` dalam `.env`
- Jika tidak ditetapkan, kata laluan sandaran ialah `123456`

**Tiada log permintaan**

- Tetapkan `ENABLE_REQUEST_LOGS=true` dalam `.env`

**Ujian sambungan menunjukkan "Tidak sah" untuk pembekal yang serasi dengan OpenAI**

- Banyak pembekal tidak mendedahkan titik akhir `/models`
- OmniRoute v1.0.6+ termasuk pengesahan sandaran melalui pelengkapan sembang
- Pastikan URL asas mengandungi akhiran `/v1`

### 🔐 OAuth

<a name="oauth-em-servidor-remoto"></a>

> **⚠️ PENTING untuk biasa menggunakan OmniRoute em VPS/Docker/servidor remoto**

### Adakah OAuth melakukan Antigraviti / Gemini CLI tidak menggunakan perkhidmatan anda?

Ia membuktikan **Antigraviti** dan **Gemini CLI** menggunakan **Google OAuth 2.0** untuk autenticação. O Google exige que a `redirect_uri` gunakan tiada fluks OAuth seja **exatamente** uma das URIs sebelum kadastrada tiada Google Cloud Console untuk aplicativo.

Sebagai credenciais OAuth embutidas no OmniRoute estão cadastradas **apenas untuk `localhost`**. Quando você acessa o OmniRoute em um servidor remoto (cth: `https://omniroute.meuservidor.com`), o Google rejeita a autenticação com:

```
Error 400: redirect_uri_mismatch
```

### Penyelesaian: Konfigurasikan suas próprias credenciais OAuth

Você precisa criar um **OAuth 2.0 Client ID** no Google Cloud Console com a URI do seu servidor.

#### Passo a passo

**1. Akses ke Konsol Awan Google**

Abra: [https://console.cloud.google.com/apis/credentials](https://console.cloud.google.com/apis/credentials)

**2. Crie um novo ID Pelanggan OAuth 2.0**

- Klik em **"+ Cipta Bukti Kelayakan"** → **"ID klien OAuth"**
- Tipo de aplicativo: **"Aplikasi web"**
- Nama: escolha qualquer nome (cth: `OmniRoute Remote`)

**3. Tambah sebagai URI Ubah Hala Dibenarkan**

Tiada **"URI ubah hala yang dibenarkan"**, tambahan:

```
https://seu-servidor.com/callback
```

> Gantikan `seu-servidor.com` pelo domínio ou IP do seu servidor (termasuk porta se necessário, cth: `http://45.33.32.156:20128/callback`).

**4. Simpan dan salin sebagai kredensia**

Após criar, o Google mostrará o **ID Pelanggan** e o **Rahsia Pelanggan**.

**5. Konfigurasikan sebagai variáveis de ambiente**

No seu `.env` (ou nas variáveis de ambiente do Docker):

```bash
# Para Antigravity:
ANTIGRAVITY_OAUTH_CLIENT_ID=seu-client-id.apps.googleusercontent.com
ANTIGRAVITY_OAUTH_CLIENT_SECRET=GOCSPX-seu-secret

# Para Gemini CLI:
GEMINI_OAUTH_CLIENT_ID=seu-client-id.apps.googleusercontent.com
GEMINI_OAUTH_CLIENT_SECRET=GOCSPX-seu-secret
GEMINI_CLI_OAUTH_CLIENT_SECRET=GOCSPX-seu-secret
```

**6. Reinicie o OmniRoute**

```bash
# Se usando npm:
npm run dev

# Se usando Docker:
docker restart omniroute
```

**7. Tente conectar novamente**

Papan pemuka → Pembekal → Antigraviti (ou Gemini CLI) → OAuth

Agora o Google redirectionará corretamente untuk `https://seu-servidor.com/callback` dan a autenticação funcionará.

---

### Penyelesaian sementara (sem configurar credenciais próprias)

Jika anda ingin mendapatkan credenciais próprias agora, ada kemungkinan penggunaan atau fluks **manual de URL**:

1. OmniRoute abrirá a URL de authorização do Google
2. Após você authorizar, o Google tentará redirectionar para `localhost` (que falha no servidor remoto)
3. **Salin URL lengkap** pada penyemak imbas barra de endereço do seu (mesmo que a página não carregue)
4. Cole essa URL no campo que aparece no modal de conexão do OmniRoute
5. Klik em **"Sambung"**

> Penyelesaian ini berfungsi sebagai kodigo de autorização na URL adalah bebas untuk mengubah hala mengikut arahan atau tidak.

</details>

---

## 🛠️

- **Waktu Jalan**: Node.js 18–22 LTS (⚠️ Node.js 24+ **tidak disokong** — `better-sqlite3` binari asli tidak serasi)
- **Bahasa**: TypeScript 5.9 — **100% TypeScript** merentas `src/` dan `open-sse/` (v1.0.6)
- **Kerangka**: Next.js 16 + React 19 + Tailwind CSS 4
- **Pangkalan Data**: LowDB (JSON) + SQLite (keadaan domain + log proksi)
- **Penstriman**: Acara Dihantar Pelayan (SSE)
- **Auth**: OAuth 2.0 (PKCE) + JWT + Kunci API
- **Ujian**: Pelari ujian Node.js (368+ ujian unit)
- **CI/CD**: GitHub Actions (auto npm publish + Docker Hub pada keluaran)
- **Laman web**: [omniroute.online](https://omniroute.online)
- **Pakej**: [npmjs.com/package/omniroute](https://www.npmjs.com/package/omniroute)
- **Docker**: [hub.docker.com/r/diegosouzapw/omniroute](https://hub.docker.com/r/diegosouzapw/omniroute)
- **Ketahanan**: Pemutus litar, mundur eksponen, kumpulan anti gemuruh, penipuan TLS

---

## 📖 Dokumentasi

| Dokumen                                      | Penerangan                                          |
| -------------------------------------------- | --------------------------------------------------- |
| [User Guide](docs/USER_GUIDE.md)             | Pembekal, kombo, penyepaduan CLI, penggunaan        |
| [API Reference](docs/API_REFERENCE.md)       | Semua titik akhir dengan contoh                     |
| [Troubleshooting](docs/TROUBLESHOOTING.md)   | Masalah dan penyelesaian biasa                      |
| [Architecture](docs/ARCHITECTURE.md)         | Seni bina sistem dan dalaman                        |
| [Contributing](CONTRIBUTING.md)              | Persediaan pembangunan dan garis panduan            |
| [OpenAPI Spec](docs/openapi.yaml)            | Spesifikasi OpenAPI 3.0                             |
| [Security Policy](SECURITY.md)               | Pelaporan kerentanan dan amalan keselamatan         |
| [VM Deployment](docs/VM_DEPLOYMENT_GUIDE.md) | Panduan lengkap: Persediaan VM + nginx + Cloudflare |
| [Features Gallery](docs/FEATURES.md)         | Lawatan papan pemuka visual dengan tangkapan skrin  |

### 📸 Pratonton Papan Pemuka

<details>
<summary><b>Klik untuk melihat tangkapan skrin papan pemuka</b></summary>

| Halaman            | Tangkapan skrin                                   |
| ------------------ | ------------------------------------------------- |
| **Pembekal**       | ![Providers](docs/screenshots/01-providers.png)   |
| **Kombo**          | ![Combos](docs/screenshots/02-combos.png)         |
| **Analisis**       | ![Analytics](docs/screenshots/03-analytics.png)   |
| **Kesihatan**      | ![Health](docs/screenshots/04-health.png)         |
| **Penterjemah**    | ![Translator](docs/screenshots/05-translator.png) |
| **Tetapan**        | ![Settings](docs/screenshots/06-settings.png)     |
| **Alat CLI**       | ![CLI Tools](docs/screenshots/07-cli-tools.png)   |
| **Log Penggunaan** | ![Usage](docs/screenshots/08-usage.png)           |
| **Titik Akhir**    | ![Endpoint](docs/screenshots/09-endpoint.png)     |

</details>

---

## 🗺️

OmniRoute mempunyai **210+ ciri yang dirancang** merentas berbilang fasa pembangunan. Berikut adalah bidang utama:

| Kategori                       | Ciri Terancang                                         | Sorotan                                                                                              |
| ------------------------------ | ------------------------------------------------------ | ---------------------------------------------------------------------------------------------------- |
| 🎯 **Endpoint-Aware Models**   | Custom models declare supported endpoints + API format |
| 🧠 **Penghalaan & Perisikan**  | 25+                                                    | Penghalaan kependaman terendah, penghalaan berasaskan teg, kuota prapenerbangan, pemilihan akaun P2C |
| 🔒 **Keselamatan & Pematuhan** | 20+                                                    | Pengerasan SSRF, penyelubungan kelayakan, had kadar setiap titik akhir, skop kunci pengurusan        |
| 📊 **Kebolehlihatan**          | 15+                                                    | Penyepaduan OpenTelemetry, pemantauan kuota masa nyata, penjejakan kos setiap model                  |
| 🔄 **Integrasi Pembekal**      | 20+                                                    | Pendaftaran model dinamik, penyejukan pembekal, Codex berbilang akaun, penghuraian kuota Copilot     |
| ⚡ **Prestasi**                | 15+                                                    | Lapisan cache dwi, ​​cache gesaan, cache respons, penstriman keepalive, API kelompok                 |
| 🌐 **Ekosistem**               | 10+                                                    | API WebSocket, konfigurasi hot-reload, kedai konfigurasi teragih, mod komersial                      |

### 🔜 Akan Datang

- 🔗 **OpenCode Integration** — Sokongan pembekal asli untuk IDE pengekodan AI OpenCode
- 🔗 **Pengintegrasian TRAE** — Sokongan penuh untuk rangka kerja pembangunan TRAE AI
- 📦 **API Kelompok** — Pemprosesan kelompok tak segerak untuk permintaan pukal
- 🎯 **Penghalaan Berasaskan Teg** — Permintaan laluan berdasarkan teg tersuai dan metadata
- 💰 **Strategi Kos Terendah** — Pilih pembekal yang tersedia paling murah secara automatik

> 📝 Spesifikasi ciri penuh tersedia dalam [link](docs/new-features/) (217 spesifikasi terperinci)

---

## 👥 Penyumbang

[![Contributors](https://contrib.rocks/image?repo=diegosouzapw/OmniRoute&max=100&columns=20&anon=1)](https://github.com/diegosouzapw/OmniRoute/graphs/contributors)

### Cara Menyumbang

1. Garpu repositori
2. Buat cawangan ciri anda (`git checkout -b feature/amazing-feature`)
3. Serahkan perubahan anda (`git commit -m 'Add amazing feature'`)
4. Tolak ke cawangan (`git push origin feature/amazing-feature`)
5. Buka Permintaan Tarik

Lihat [CONTRIBUTING.md](CONTRIBUTING.md) untuk garis panduan terperinci.

### Mengeluarkan Versi Baharu

```bash
# Create a release — npm publish happens automatically
gh release create v1.0.6 --title "v1.0.6" --generate-notes
```

---

## 📊 Sejarah Bintang

## Stargazers over time

## [![Stargazers over time](https://starchart.cc/diegosouzapw/OmniRoute.svg?variant=adaptive)](https://starchart.cc/diegosouzapw/OmniRoute)

## 🙏 Ucapan terima kasih

Terima kasih khas kepada **[9router](https://github.com/decolua/9router)** oleh **[decolua](https://github.com/decolua)** — projek asal yang mengilhamkan garpu ini. OmniRoute membina asas yang luar biasa itu dengan ciri tambahan, API berbilang modal dan penulisan semula TypeScript penuh.

Terima kasih khas kepada **[CLIProxyAPI](https://github.com/router-for-me/CLIProxyAPI)** — pelaksanaan Go asal yang mengilhamkan port JavaScript ini.

---

## 📄 Lesen

Lesen MIT - lihat [LICENSE](LICENSE) untuk butiran.

---

<div align="center">
  <sub>Dibina dengan ❤️ untuk pembangun yang kod 24/7</sub>
  <br/>
  <sub><a href="https://omniroute.online">omniroute.online</a></sub>
</div>
