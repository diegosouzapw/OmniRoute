# Panduan Pengguna

🌐 **Languages:** 🇺🇸 [English](../../USER_GUIDE.md) | 🇧🇷 [Português (Brasil)](../pt-BR/USER_GUIDE.md) | 🇪🇸 [Español](../es/USER_GUIDE.md) | 🇫🇷 [Français](../fr/USER_GUIDE.md) | 🇮🇹 [Italiano](../it/USER_GUIDE.md) | 🇷🇺 [Русский](../ru/USER_GUIDE.md) | 🇨🇳 [中文 (简体)](../zh-CN/USER_GUIDE.md) | 🇩🇪 [Deutsch](../de/USER_GUIDE.md) | 🇮🇳 [हिन्दी](../in/USER_GUIDE.md) | 🇹🇭 [ไทย](../th/USER_GUIDE.md) | 🇺🇦 [Українська](../uk-UA/USER_GUIDE.md) | 🇸🇦 [العربية](../ar/USER_GUIDE.md) | 🇯🇵 [日本語](../ja/USER_GUIDE.md) | 🇻🇳 [Tiếng Việt](../vi/USER_GUIDE.md) | 🇧🇬 [Български](../bg/USER_GUIDE.md) | 🇩🇰 [Dansk](../da/USER_GUIDE.md) | 🇫🇮 [Suomi](../fi/USER_GUIDE.md) | 🇮🇱 [עברית](../he/USER_GUIDE.md) | 🇭🇺 [Magyar](../hu/USER_GUIDE.md) | 🇮🇩 [Bahasa Indonesia](../id/USER_GUIDE.md) | 🇰🇷 [한국어](../ko/USER_GUIDE.md) | 🇲🇾 [Bahasa Melayu](../ms/USER_GUIDE.md) | 🇳🇱 [Nederlands](../nl/USER_GUIDE.md) | 🇳🇴 [Norsk](../no/USER_GUIDE.md) | 🇵🇹 [Português (Portugal)](../pt/USER_GUIDE.md) | 🇷🇴 [Română](../ro/USER_GUIDE.md) | 🇵🇱 [Polski](../pl/USER_GUIDE.md) | 🇸🇰 [Slovenčina](../sk/USER_GUIDE.md) | 🇸🇪 [Svenska](../sv/USER_GUIDE.md) | 🇵🇭 [Filipino](../phi/USER_GUIDE.md)

Panduan lengkap untuk mengonfigurasi penyedia, membuat kombo, mengintegrasikan alat CLI, dan menerapkan OmniRoute.

---

## Daftar Isi

- [Pricing at a Glance](#-pricing-at-a-glance)
- [Use Cases](#-use-cases)
- [Provider Setup](#-provider-setup)
- [CLI Integration](#-cli-integration)
- [Deployment](#-deployment)
- [Available Models](#-available-models)
- [Advanced Features](#-advanced-features)

---

## 💰 Sekilas tentang Harga

| Tingkat             | Penyedia          | Biaya                | Reset Kuota               | Terbaik Untuk               |
| ------------------- | ----------------- | -------------------- | ------------------------- | --------------------------- |
| **💳 BERLANGGANAN** | Kode Claude (Pro) | $20/bln              | 5 jam + mingguan          | Sudah berlangganan          |
|                     | Kodeks (Plus/Pro) | $20-200/bln          | 5 jam + mingguan          | Pengguna OpenAI             |
|                     | CLI Gemini        | **GRATIS**           | 180K/bln + 1K/hari        | Setiap orang!               |
|                     | Kopilot GitHub    | $10-19/bln           | Bulanan                   | Pengguna GitHub             |
| **🔑 KUNCI API**    | Pencarian Dalam   | Bayar per penggunaan | Tidak ada                 | Alasan murah                |
|                     | Bagus             | Bayar per penggunaan | Tidak ada                 | Inferensi ultra-cepat       |
|                     | xAI (Grok)        | Bayar per penggunaan | Tidak ada                 | Alasan Grok 4               |
|                     | Mistral           | Bayar per penggunaan | Tidak ada                 | Model yang dihosting di UE  |
|                     | Kebingungan       | Bayar per penggunaan | Tidak ada                 | Ditambah pencarian          |
|                     | Bersama AI        | Bayar per penggunaan | Tidak ada                 | Model sumber terbuka        |
|                     | AI kembang api    | Bayar per penggunaan | Tidak ada                 | Gambar FLUX Cepat           |
|                     | Otak              | Bayar per penggunaan | Tidak ada                 | Kecepatan skala wafer       |
|                     | menyatu           | Bayar per penggunaan | Tidak ada                 | Perintah R+ RAG             |
|                     | NVIDIA NIM        | Bayar per penggunaan | Tidak ada                 | Model perusahaan            |
| **💰 MURAH**        | GLM-4.7           | $0,6/1 juta          | Setiap hari pukul 10 pagi | Cadangan anggaran           |
|                     | MiniMax M2.1      | $0,2/1 juta          | 5 jam bergulir            | Pilihan termurah            |
|                     | Kimi K2           | $9/bln tetap         | 10 juta token/bln         | Biaya yang dapat diprediksi |
| **🆓 GRATIS**       | iFlow             | $0                   | Tidak terbatas            | 8 model gratis              |
|                     | Qwen              | $0                   | Tidak terbatas            | 3 model gratis              |
|                     | Kiro              | $0                   | Tidak terbatas            | Claude gratis               |

**💡 Kiat Pro:** Mulai dengan Gemini CLI (gratis 180 ribu/bulan) + kombo iFlow (gratis tanpa batas) = ​​biaya $0!

---

## 🎯 Kasus Penggunaan

### Kasus 1: "Saya berlangganan Claude Pro"

**Masalah:** Kuota habis tanpa terpakai, batas kecepatan selama coding berat

```
Combo: "maximize-claude"
  1. cc/claude-opus-4-6        (use subscription fully)
  2. glm/glm-4.7               (cheap backup when quota out)
  3. if/kimi-k2-thinking       (free emergency fallback)

Monthly cost: $20 (subscription) + ~$5 (backup) = $25 total
vs. $20 + hitting limits = frustration
```

### Kasus 2: "Saya ingin tanpa biaya"

**Masalah:** Tidak mampu berlangganan, memerlukan pengkodean AI yang andal

```
Combo: "free-forever"
  1. gc/gemini-3-flash         (180K free/month)
  2. if/kimi-k2-thinking       (unlimited free)
  3. qw/qwen3-coder-plus       (unlimited free)

Monthly cost: $0
Quality: Production-ready models
```

### Kasus 3: "Saya memerlukan pengkodean 24/7, tanpa gangguan"

**Masalah:** Tenggat waktu, tidak mampu membayar downtime

```
Combo: "always-on"
  1. cc/claude-opus-4-6        (best quality)
  2. cx/gpt-5.2-codex          (second subscription)
  3. glm/glm-4.7               (cheap, resets daily)
  4. minimax/MiniMax-M2.1      (cheapest, 5h reset)
  5. if/kimi-k2-thinking       (free unlimited)

Result: 5 layers of fallback = zero downtime
Monthly cost: $20-200 (subscriptions) + $10-20 (backup)
```

### Kasus 4: "Saya ingin AI GRATIS di OpenClaw"

**Masalah:** Membutuhkan asisten AI dalam aplikasi perpesanan, sepenuhnya gratis

```
Combo: "openclaw-free"
  1. if/glm-4.7                (unlimited free)
  2. if/minimax-m2.1           (unlimited free)
  3. if/kimi-k2-thinking       (unlimited free)

Monthly cost: $0
Access via: WhatsApp, Telegram, Slack, Discord, iMessage, Signal...
```

---

## 📖 Pengaturan Penyedia

### 🔐 Penyedia Langganan

#### Kode Claude (Pro/Maks)

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

#### Kodeks OpenAI (Plus/Pro)

```bash
Dashboard → Providers → Connect Codex
→ OAuth login (port 1455)
→ 5-hour + weekly reset

Models:
  cx/gpt-5.2-codex
  cx/gpt-5.1-codex-max
```

#### Gemini CLI (GRATIS 180K/bulan!)

```bash
Dashboard → Providers → Connect Gemini CLI
→ Google OAuth
→ 180K completions/month + 1K/day

Models:
  gc/gemini-3-flash-preview
  gc/gemini-2.5-pro
```

**Nilai Terbaik:** Tingkat gratis yang sangat besar! Gunakan ini sebelum tingkatan berbayar.

#### Kopilot GitHub

```bash
Dashboard → Providers → Connect GitHub
→ OAuth via GitHub
→ Monthly reset (1st of month)

Models:
  gh/gpt-5
  gh/claude-4.5-sonnet
  gh/gemini-3-pro
```

### 💰 Penyedia Murah

#### GLM-4.7 (Reset harian, $0,6/1 juta)

1. Daftar: [Zhipu AI](https://open.bigmodel.cn/)
2. Dapatkan kunci API dari Coding Plan
3. Dasbor → Tambahkan Kunci API: Penyedia: `glm`, Kunci API: `your-key`

**Gunakan:** `glm/glm-4.7` — **Tips Pro:** Paket Coding menawarkan 3× kuota dengan biaya 1/7! Reset setiap hari pukul 10.00.

#### MiniMax M2.1 (reset 5 jam, $0,20/1 juta)

1. Daftar: [MiniMax](https://www.minimax.io/)
2. Dapatkan kunci API → Dasbor → Tambahkan Kunci API

**Gunakan:** `minimax/MiniMax-M2.1` — **Tips Pro:** Opsi termurah untuk konteks panjang (1 juta token)!

#### Kimi K2 ($9/bulan tetap)

1. Berlangganan: [Moonshot AI](https://platform.moonshot.ai/)
2. Dapatkan kunci API → Dasbor → Tambahkan Kunci API

**Penggunaan:** `kimi/kimi-latest` — **Tips Pro:** Memperbaiki $9/bulan untuk 10 juta token = biaya efektif $0,90/1 juta!

### 🆓 Penyedia GRATIS

#### iFlow (8 model GRATIS)

```bash
Dashboard → Connect iFlow → OAuth login → Unlimited usage

Models: if/kimi-k2-thinking, if/qwen3-coder-plus, if/glm-4.7, if/minimax-m2, if/deepseek-r1
```

#### Qwen (3 model GRATIS)

```bash
Dashboard → Connect Qwen → Device code auth → Unlimited usage

Models: qw/qwen3-coder-plus, qw/qwen3-coder-flash
```

#### Kiro (Claude GRATIS)

```bash
Dashboard → Connect Kiro → AWS Builder ID or Google/GitHub → Unlimited

Models: kr/claude-sonnet-4.5, kr/claude-haiku-4.5
```

---

## 🎨 Kombo

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

---

## 🔧 Integrasi CLI

### IDE Kursor

```
Settings → Models → Advanced:
  OpenAI API Base URL: http://localhost:20128/v1
  OpenAI API Key: [from omniroute dashboard]
  Model: cc/claude-opus-4-6
```

### Kode Claude

Sunting `~/.claude/config.json`:

```json
{
  "anthropic_api_base": "http://localhost:20128/v1",
  "anthropic_api_key": "your-omniroute-api-key"
}
```

### Kodeks CLI

```bash
export OPENAI_BASE_URL="http://localhost:20128"
export OPENAI_API_KEY="your-omniroute-api-key"
codex "your prompt"
```

### Buka Cakar

Sunting `~/.openclaw/openclaw.json`:

```json
{
  "agents": {
    "defaults": {
      "model": { "primary": "omniroute/if/glm-4.7" }
    }
  },
  "models": {
    "providers": {
      "omniroute": {
        "baseUrl": "http://localhost:20128/v1",
        "apiKey": "your-omniroute-api-key",
        "api": "openai-completions",
        "models": [{ "id": "if/glm-4.7", "name": "glm-4.7" }]
      }
    }
  }
}
```

**Atau gunakan Dasbor:** Alat CLI → OpenClaw → Konfigurasi otomatis

### Cline / Lanjutkan / RooCode

```
Provider: OpenAI Compatible
Base URL: http://localhost:20128/v1
API Key: [from dashboard]
Model: cc/claude-opus-4-6
```

---

## 🚀 Penerapan

### Penerapan VPS

```bash
git clone https://github.com/diegosouzapw/OmniRoute.git
cd OmniRoute && npm install && npm run build

export JWT_SECRET="your-secure-secret-change-this"
export INITIAL_PASSWORD="your-password"
export DATA_DIR="/var/lib/omniroute"
export PORT="20128"
export HOSTNAME="0.0.0.0"
export NODE_ENV="production"
export NEXT_PUBLIC_BASE_URL="http://localhost:20128"
export API_KEY_SECRET="endpoint-proxy-api-key-secret"

npm run start
# Or: pm2 start npm --name omniroute -- start
```

### buruh pelabuhan

```bash
# Build image (default = runner-cli with codex/claude/droid preinstalled)
docker build -t omniroute:cli .

# Portable mode (recommended)
docker run -d --name omniroute -p 20128:20128 --env-file ./.env -v omniroute-data:/app/data omniroute:cli
```

Untuk mode terintegrasi host dengan biner CLI, lihat bagian Docker di dokumen utama.

### Variabel Lingkungan

| Variabel              | Bawaan                               | Deskripsi                                                             |
| --------------------- | ------------------------------------ | --------------------------------------------------------------------- |
| `JWT_SECRET`          | `omniroute-default-secret-change-me` | Rahasia penandatanganan JWT (**perubahan produksi**)                  |
| `INITIAL_PASSWORD`    | `123456`                             | Kata sandi masuk pertama                                              |
| `DATA_DIR`            | `~/.omniroute`                       | Direktori data (db, penggunaan, log)                                  |
| `PORT`                | kerangka default                     | Port layanan (`20128` dalam contoh)                                   |
| `HOSTNAME`            | kerangka default                     | Ikat host (Docker defaultnya adalah `0.0.0.0`)                        |
| `NODE_ENV`            | default waktu proses                 | Tetapkan `production` untuk diterapkan                                |
| `BASE_URL`            | `http://localhost:20128`             | URL dasar internal sisi server                                        |
| `CLOUD_URL`           | `https://omniroute.dev`              | URL dasar titik akhir sinkronisasi cloud                              |
| `API_KEY_SECRET`      | `endpoint-proxy-api-key-secret`      | Rahasia HMAC untuk kunci API yang dihasilkan                          |
| `REQUIRE_API_KEY`     | `false`                              | Terapkan kunci API Pembawa di `/v1/*`                                 |
| `ENABLE_REQUEST_LOGS` | `false`                              | Mengaktifkan log permintaan/respons                                   |
| `AUTH_COOKIE_SECURE`  | `false`                              | Paksa cookie autentikasi `Secure` (di belakang proksi terbalik HTTPS) |

Untuk referensi variabel lingkungan selengkapnya, lihat [README](../README.md).

---

## 📊 Model yang Tersedia

<details>
<summary><b>Lihat semua model yang tersedia</b></summary>

**Kode Claude (`cc/`)** — Pro/Maks: `cc/claude-opus-4-6`, `cc/claude-sonnet-4-5-20250929`, `cc/claude-haiku-4-5-20251001`

**Kodeks (`cx/`)** — Plus/Pro: `cx/gpt-5.2-codex`, `cx/gpt-5.1-codex-max`

**Gemini CLI (`gc/`)** — GRATIS: `gc/gemini-3-flash-preview`, `gc/gemini-2.5-pro`

**Copilot GitHub (`gh/`)**: `gh/gpt-5`, `gh/claude-4.5-sonnet`

**GLM (`glm/`)** — $0,6/1 juta: `glm/glm-4.7`

**MiniMax (`minimax/`)** — $0,2/1 juta: `minimax/MiniMax-M2.1`

**iFlow (`if/`)** — GRATIS: `if/kimi-k2-thinking`, `if/qwen3-coder-plus`, `if/deepseek-r1`

**Qwen (`qw/`)** — GRATIS: `qw/qwen3-coder-plus`, `qw/qwen3-coder-flash`

**Kiro (`kr/`)** — GRATIS: `kr/claude-sonnet-4.5`, `kr/claude-haiku-4.5`

**DeepSeek (`ds/`)**: `ds/deepseek-chat`, `ds/deepseek-reasoner`

**Groq (`groq/`)**: `groq/llama-3.3-70b-versatile`, `groq/llama-4-maverick-17b-128e-instruct`

**xAI (`xai/`)**: `xai/grok-4`, `xai/grok-4-0709-fast-reasoning`, `xai/grok-code-mini`

**Mistral (`mistral/`)**: `mistral/mistral-large-2501`, `mistral/codestral-2501`

**Kebingungan (`pplx/`)**: `pplx/sonar-pro`, `pplx/sonar`

**Bersama AI (`together/`)**: `together/meta-llama/Llama-3.3-70B-Instruct-Turbo`

**AI Kembang Api (`fireworks/`)**: `fireworks/accounts/fireworks/models/deepseek-v3p1`

**Otak Otak (`cerebras/`)**: `cerebras/llama-3.3-70b`

**Di sini (`cohere/`)**: `cohere/command-r-plus-08-2024`

**NVIDIA NIM (`nvidia/`)**: `nvidia/nvidia/llama-3.3-70b-instruct`

</details>

---

## 🧩 Fitur Lanjutan

### Model Khusus

Tambahkan ID model apa pun ke penyedia mana pun tanpa menunggu pembaruan aplikasi:

```bash
# Via API
curl -X POST http://localhost:20128/api/provider-models \
  -H "Content-Type: application/json" \
  -d '{"provider": "openai", "modelId": "gpt-4.5-preview", "modelName": "GPT-4.5 Preview"}'

# List: curl http://localhost:20128/api/provider-models?provider=openai
# Remove: curl -X DELETE "http://localhost:20128/api/provider-models?provider=openai&model=gpt-4.5-preview"
```

Atau gunakan Dasbor: **Penyedia → [Penyedia] → Model Khusus**.

### Rute Penyedia Khusus

Rutekan permintaan langsung ke penyedia tertentu dengan validasi model:

```bash
POST http://localhost:20128/v1/providers/openai/chat/completions
POST http://localhost:20128/v1/providers/openai/embeddings
POST http://localhost:20128/v1/providers/fireworks/images/generations
```

Awalan penyedia ditambahkan secara otomatis jika tidak ada. Model yang tidak cocok menampilkan `400`.

### Konfigurasi Proksi Jaringan

```bash
# Set global proxy
curl -X PUT http://localhost:20128/api/settings/proxy \
  -d '{"global": {"type":"http","host":"proxy.example.com","port":"8080"}}'

# Per-provider proxy
curl -X PUT http://localhost:20128/api/settings/proxy \
  -d '{"providers": {"openai": {"type":"socks5","host":"proxy.example.com","port":"1080"}}}'

# Test proxy
curl -X POST http://localhost:20128/api/settings/proxy/test \
  -d '{"proxy":{"type":"socks5","host":"proxy.example.com","port":"1080"}}'
```

**Prioritas:** Khusus kunci → Khusus kombo → Khusus penyedia → Global → Lingkungan.

### API Katalog Model

```bash
curl http://localhost:20128/api/models/catalog
```

Mengembalikan model yang dikelompokkan berdasarkan penyedia dengan tipe (`chat`, `embedding`, `image`).

### Sinkronisasi Awan

- Sinkronisasi penyedia, kombo, dan pengaturan di seluruh perangkat
- Sinkronisasi latar belakang otomatis dengan batas waktu + cepat gagal
- Lebih memilih `BASE_URL`/`CLOUD_URL` sisi server dalam produksi

### LLM Gateway Intelligence (Fase 9)

- **Cache Semantik** — Cache otomatis non-streaming, suhu=0 tanggapan (bypass dengan `X-OmniRoute-No-Cache: true`)
- **Idempotency Permintaan** — Menghapus duplikat permintaan dalam waktu 5 detik melalui header `Idempotency-Key` atau `X-Request-Id`
- **Pelacakan Kemajuan** — Ikut serta dalam acara SSE `event: progress` melalui header `X-OmniRoute-Progress: true`

---

### Taman Bermain Penerjemah

Akses melalui **Dasbor → Penerjemah**. Debug dan visualisasikan bagaimana OmniRoute menerjemahkan permintaan API antar penyedia.

| Modus                | Tujuan                                                                                           |
| -------------------- | ------------------------------------------------------------------------------------------------ |
| **Taman bermain**    | Pilih format sumber/target, tempelkan permintaan, dan lihat keluaran terjemahan secara instan    |
| **Penguji Obrolan**  | Kirim pesan obrolan langsung melalui proxy dan periksa siklus permintaan/respons lengkap         |
| **Bangku Tes**       | Jalankan pengujian batch pada berbagai kombinasi format untuk memverifikasi kebenaran terjemahan |
| **Monitor Langsung** | Tonton terjemahan real-time saat permintaan mengalir melalui proxy                               |

**Kasus penggunaan:**

- Debug mengapa kombinasi klien/penyedia tertentu gagal
- Verifikasi bahwa tag pemikiran, panggilan alat, dan perintah sistem diterjemahkan dengan benar
- Bandingkan perbedaan format antara format OpenAI, Claude, Gemini, dan Responses API

---

### Strategi Perutean

Konfigurasikan melalui **Dasbor → Pengaturan → Perutean**.

| Strategi                       | Deskripsi                                                                                                  |
| ------------------------------ | ---------------------------------------------------------------------------------------------------------- |
| **Isi Dulu**                   | Menggunakan akun dalam urutan prioritas — akun utama menangani semua permintaan hingga tidak tersedia      |
| **Robin Bulat**                | Menggilir semua akun dengan batas melekat yang dapat dikonfigurasi (default: 3 panggilan per akun)         |
| **P2C (Kekuatan Dua Pilihan)** | Pilih 2 akun acak dan rute ke akun yang lebih sehat — menyeimbangkan beban dengan kesadaran akan kesehatan |
| **Acak**                       | Memilih akun secara acak untuk setiap permintaan menggunakan Fisher-Yates shuffle                          |
| **Jarang Digunakan**           | Merutekan ke akun dengan stempel waktu `lastUsedAt` terlama, mendistribusikan lalu lintas secara merata    |
| **Pengoptimalan Biaya**        | Merutekan ke akun dengan nilai prioritas terendah, mengoptimalkan penyedia berbiaya terendah               |

#### Alias Model Wildcard

Buat pola wildcard untuk memetakan ulang nama model:

```
Pattern: claude-sonnet-*     →  Target: cc/claude-sonnet-4-5-20250929
Pattern: gpt-*               →  Target: gh/gpt-5.1-codex
```

Wildcard mendukung `*` (karakter apa saja) dan `?` (karakter tunggal).

#### Rantai Pengganti

Tentukan rantai fallback global yang berlaku di semua permintaan:

```
Chain: production-fallback
  1. cc/claude-opus-4-6
  2. gh/gpt-5.1-codex
  3. glm/glm-4.7
```

---

### Ketahanan & Pemutus Sirkuit

Konfigurasikan melalui **Dasbor → Pengaturan → Ketahanan**.

OmniRoute mengimplementasikan ketahanan tingkat penyedia dengan empat komponen:

1. **Profil Penyedia** — Konfigurasi per penyedia untuk:
   - Ambang batas kegagalan (berapa banyak kegagalan sebelum dibuka)
   - Durasi pendinginan
   - Sensitivitas deteksi batas kecepatan
   - Parameter backoff eksponensial

2. **Batas Tarif yang Dapat Diedit** — Default tingkat sistem dapat dikonfigurasi di dasbor:
   - **Permintaan Per Menit (RPM)** — Permintaan maksimum per menit per akun
   - **Waktu Minimum Antar Permintaan** — Kesenjangan minimum dalam milidetik antar permintaan
   - **Permintaan Bersamaan Maksimum** — Permintaan simultan maksimum per akun
   - Klik **Edit** untuk mengubah, lalu **Simpan** atau **Batal**. Nilai-nilai bertahan melalui API ketahanan.

3. **Pemutus Sirkuit** — Melacak kegagalan per penyedia dan secara otomatis membuka sirkuit ketika ambang batas tercapai:
   - **TUTUP** (Sehat) — Permintaan mengalir normal
   - **BUKA** — Penyedia diblokir sementara setelah kegagalan berulang kali
   - **HALF_OPEN** — Menguji apakah penyedia telah pulih

4. **Kebijakan & Pengidentifikasi Terkunci** — Menampilkan status pemutus sirkuit dan pengidentifikasi terkunci dengan kemampuan buka paksa.

5. **Deteksi Otomatis Batas Tarif** — Memantau header `429` dan `Retry-After` untuk secara proaktif menghindari batas tarif penyedia.

**Kiat Pro:** Gunakan tombol **Reset Semua** untuk menghapus semua pemutus sirkuit dan cooldown saat penyedia pulih dari pemadaman listrik.

---

### Ekspor/Impor Basis Data

Kelola cadangan basis data di **Dasbor → Pengaturan → Sistem & Penyimpanan**.

| Aksi                       | Deskripsi                                                                                                                         |
| -------------------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| **Ekspor Basis Data**      | Mengunduh database SQLite saat ini sebagai file `.sqlite`                                                                         |
| **Ekspor Semua (.tar.gz)** | Mengunduh arsip cadangan lengkap termasuk: basis data, pengaturan, kombo, koneksi penyedia (tanpa kredensial), metadata kunci API |
| **Impor Basis Data**       | Unggah file `.sqlite` untuk menggantikan database saat ini. Cadangan pra-impor dibuat secara otomatis                             |

```bash
# API: Export database
curl -o backup.sqlite http://localhost:20128/api/db-backups/export

# API: Export all (full archive)
curl -o backup.tar.gz http://localhost:20128/api/db-backups/exportAll

# API: Import database
curl -X POST http://localhost:20128/api/db-backups/import \
  -F "file=@backup.sqlite"
```

**Validasi Impor:** File yang diimpor divalidasi integritasnya (pemeriksaan pragma SQLite), tabel yang diperlukan (`provider_connections`, `provider_nodes`, `combos`, `api_keys`), dan ukuran (maks 100MB).

**Kasus Penggunaan:**

- Migrasi OmniRoute antar mesin
- Buat cadangan eksternal untuk pemulihan bencana
- Bagikan konfigurasi antar anggota tim (ekspor semua → bagikan arsip)

---

### Pengaturan Dasbor

Halaman pengaturan disusun menjadi 5 tab untuk memudahkan navigasi:

| Tab           | Isi                                                                                                           |
| ------------- | ------------------------------------------------------------------------------------------------------------- |
| **Keamanan**  | Pengaturan Login/Kata Sandi, Kontrol Akses IP, Autentikasi API untuk `/models`, dan Pemblokiran Penyedia      |
| **Perutean**  | Strategi perutean global (6 opsi), alias model wildcard, rantai fallback, default kombo                       |
| **Ketahanan** | Profil penyedia, batas tarif yang dapat diedit, status pemutus sirkuit, kebijakan & pengidentifikasi terkunci |
| **AI**        | Memikirkan konfigurasi anggaran, injeksi cepat sistem global, statistik cache cepat                           |
| **Lanjutan**  | Konfigurasi proksi global (HTTP/SOCKS5)                                                                       |

---

### Biaya & Manajemen Anggaran

Akses melalui **Dasbor → Biaya**.

| Tab          | Tujuan                                                                                                     |
| ------------ | ---------------------------------------------------------------------------------------------------------- |
| **Anggaran** | Tetapkan batas pengeluaran per kunci API dengan anggaran harian/mingguan/bulanan dan pelacakan waktu nyata |
| **Harga**    | Lihat dan edit entri harga model — biaya per 1K token input/output per penyedia                            |

```bash
# API: Set a budget
curl -X POST http://localhost:20128/api/usage/budget \
  -H "Content-Type: application/json" \
  -d '{"keyId": "key-123", "limit": 50.00, "period": "monthly"}'

# API: Get current budget status
curl http://localhost:20128/api/usage/budget
```

**Pelacakan Biaya:** Setiap permintaan mencatat penggunaan token dan menghitung biaya menggunakan tabel harga. Lihat pengelompokan di **Dasbor → Penggunaan** menurut penyedia, model, dan kunci API.

---

### Transkripsi Audio

OmniRoute mendukung transkripsi audio melalui titik akhir yang kompatibel dengan OpenAI:

```bash
POST /v1/audio/transcriptions
Authorization: Bearer your-api-key
Content-Type: multipart/form-data

# Example with curl
curl -X POST http://localhost:20128/v1/audio/transcriptions \
  -H "Authorization: Bearer your-api-key" \
  -F "file=@audio.mp3" \
  -F "model=deepgram/nova-3"
```

Penyedia yang tersedia: **Deepgram** (`deepgram/`), **AssemblyAI** (`assemblyai/`).

Format audio yang didukung: `mp3`, `wav`, `m4a`, `flac`, `ogg`, `webm`.

---

### Strategi Penyeimbangan Kombo

Konfigurasikan penyeimbangan per kombo di **Dasbor → Kombo → Buat/Edit → Strategi**.

| Strategi               | Deskripsi                                                                              |
| ---------------------- | -------------------------------------------------------------------------------------- |
| **Robin Bulat**        | Berputar melalui model secara berurutan                                                |
| **Prioritas**          | Selalu mencoba model pertama; jatuh kembali hanya karena kesalahan                     |
| **Acak**               | Memilih model acak dari kombo untuk setiap permintaan                                  |
| **Berbobot**           | Rute secara proporsional berdasarkan bobot yang ditetapkan per model                   |
| **Jarang Digunakan**   | Merutekan ke model dengan permintaan terkini paling sedikit (menggunakan metrik kombo) |
| **Dioptimalkan Biaya** | Rute ke model termurah yang tersedia (menggunakan tabel harga)                         |

Default kombo global dapat diatur di **Dasbor → Pengaturan → Perutean → Default Kombo**.

---

### Dasbor Kesehatan

Akses melalui **Dasbor → Kesehatan**. Ikhtisar kesehatan sistem real-time dengan 6 kartu:

| Kartu                  | Apa yang Ditunjukkannya                                                 |
| ---------------------- | ----------------------------------------------------------------------- |
| **Status Sistem**      | Uptime, versi, penggunaan memori, direktori data                        |
| **Kesehatan Penyedia** | Status pemutus sirkuit per penyedia (Tertutup/Terbuka/Setengah Terbuka) |
| **Batas Tarif**        | Cooldown batas tarif aktif per akun dengan sisa waktu                   |
| **Penguncian Aktif**   | Penyedia diblokir sementara oleh kebijakan lockout                      |
| **Cache Tanda Tangan** | Statistik cache deduplikasi (kunci aktif, tingkat hit)                  |
| **Telemetri Latensi**  | agregasi latensi p50/p95/p99 per penyedia                               |

**Tips Pro:** Halaman Kesehatan disegarkan secara otomatis setiap 10 detik. Gunakan kartu pemutus sirkuit untuk mengidentifikasi penyedia mana yang mengalami masalah.
