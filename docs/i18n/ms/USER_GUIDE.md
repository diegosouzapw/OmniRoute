# Panduan Pengguna

🌐 **Languages:** 🇺🇸 [English](../../USER_GUIDE.md) | 🇧🇷 [Português (Brasil)](../pt-BR/USER_GUIDE.md) | 🇪🇸 [Español](../es/USER_GUIDE.md) | 🇫🇷 [Français](../fr/USER_GUIDE.md) | 🇮🇹 [Italiano](../it/USER_GUIDE.md) | 🇷🇺 [Русский](../ru/USER_GUIDE.md) | 🇨🇳 [中文 (简体)](../zh-CN/USER_GUIDE.md) | 🇩🇪 [Deutsch](../de/USER_GUIDE.md) | 🇮🇳 [हिन्दी](../in/USER_GUIDE.md) | 🇹🇭 [ไทย](../th/USER_GUIDE.md) | 🇺🇦 [Українська](../uk-UA/USER_GUIDE.md) | 🇸🇦 [العربية](../ar/USER_GUIDE.md) | 🇯🇵 [日本語](../ja/USER_GUIDE.md) | 🇻🇳 [Tiếng Việt](../vi/USER_GUIDE.md) | 🇧🇬 [Български](../bg/USER_GUIDE.md) | 🇩🇰 [Dansk](../da/USER_GUIDE.md) | 🇫🇮 [Suomi](../fi/USER_GUIDE.md) | 🇮🇱 [עברית](../he/USER_GUIDE.md) | 🇭🇺 [Magyar](../hu/USER_GUIDE.md) | 🇮🇩 [Bahasa Indonesia](../id/USER_GUIDE.md) | 🇰🇷 [한국어](../ko/USER_GUIDE.md) | 🇲🇾 [Bahasa Melayu](../ms/USER_GUIDE.md) | 🇳🇱 [Nederlands](../nl/USER_GUIDE.md) | 🇳🇴 [Norsk](../no/USER_GUIDE.md) | 🇵🇹 [Português (Portugal)](../pt/USER_GUIDE.md) | 🇷🇴 [Română](../ro/USER_GUIDE.md) | 🇵🇱 [Polski](../pl/USER_GUIDE.md) | 🇸🇰 [Slovenčina](../sk/USER_GUIDE.md) | 🇸🇪 [Svenska](../sv/USER_GUIDE.md) | 🇵🇭 [Filipino](../phi/USER_GUIDE.md)

Panduan lengkap untuk mengkonfigurasi penyedia, mencipta gabungan, menyepadukan alatan CLI dan menggunakan OmniRoute.

---

## Jadual Kandungan

- [Pricing at a Glance](#-pricing-at-a-glance)
- [Use Cases](#-use-cases)
- [Provider Setup](#-provider-setup)
- [CLI Integration](#-cli-integration)
- [Deployment](#-deployment)
- [Available Models](#-available-models)
- [Advanced Features](#-advanced-features)

---

## 💰 Sekilas Pandang Harga

| Peringkat        | Pembekal         | Kos                     | Set Semula Kuota   | Terbaik Untuk          |
| ---------------- | ---------------- | ----------------------- | ------------------ | ---------------------- |
| **💳 LANGGANAN** | Kod Claude (Pro) | $20/bln                 | 5j + mingguan      | Sudah melanggan        |
|                  | Codex (Plus/Pro) | $20-200/bln             | 5j + mingguan      | Pengguna OpenAI        |
|                  | Gemini CLI       | **PERCUMA**             | 180K/bln + 1K/hari | Semua orang!           |
|                  | GitHub Copilot   | $10-19/bln              | Bulanan            | Pengguna GitHub        |
| **🔑 KUNCI API** | DeepSeek         | Bayar setiap penggunaan | Tiada              | Penaakulan murah       |
|                  | Groq             | Bayar setiap penggunaan | Tiada              | Inferens sangat pantas |
|                  | xAI (Grok)       | Bayar setiap penggunaan | Tiada              | Grok 4 penaakulan      |
|                  | Mistral          | Bayar setiap penggunaan | Tiada              | Model yang dihoskan EU |
|                  | Kebingungan      | Bayar setiap penggunaan | Tiada              | Carian-ditambah        |
|                  | Bersama AI       | Bayar setiap penggunaan | Tiada              | Model sumber terbuka   |
|                  | Bunga Api AI     | Bayar setiap penggunaan | Tiada              | Imej FLUX Pantas       |
|                  | Serebral         | Bayar setiap penggunaan | Tiada              | Kelajuan skala wafer   |
|                  | Cohere           | Bayar setiap penggunaan | Tiada              | Perintah R+ RAG        |
|                  | NVIDIA NIM       | Bayar setiap penggunaan | Tiada              | Model perusahaan       |
| **💰 MURAH**     | GLM-4.7          | $0.6/1J                 | Setiap hari 10AM   | Sandaran belanjawan    |
|                  | MiniMax M2.1     | $0.2/1J                 | 5 jam bergolek     | Pilihan termurah       |
|                  | Kimi K2          | $9/bln flat             | 10 juta token/bln  | Kos yang boleh diramal |
| **🆓 PERCUMA**   | iFlow            | $0                      | tanpa had          | 8 model percuma        |
|                  | Qwen             | $0                      | tanpa had          | 3 model percuma        |
|                  | Kiro             | $0                      | tanpa had          | Claude percuma         |

**💡 Petua Pro:** Mulakan dengan Gemini CLI (180K percuma/bulan) + iFlow (percuma tanpa had) kombo = $0 kos!

---

## 🎯 Kes Penggunaan

### Kes 1: "Saya mempunyai langganan Claude Pro"

**Masalah:** Kuota tamat tempoh tidak digunakan, had kadar semasa pengekodan berat

```
Combo: "maximize-claude"
  1. cc/claude-opus-4-6        (use subscription fully)
  2. glm/glm-4.7               (cheap backup when quota out)
  3. if/kimi-k2-thinking       (free emergency fallback)

Monthly cost: $20 (subscription) + ~$5 (backup) = $25 total
vs. $20 + hitting limits = frustration
```

### Kes 2: "Saya mahu kos sifar"

**Masalah:** Tidak mampu membayar langganan, memerlukan pengekodan AI yang boleh dipercayai

```
Combo: "free-forever"
  1. gc/gemini-3-flash         (180K free/month)
  2. if/kimi-k2-thinking       (unlimited free)
  3. qw/qwen3-coder-plus       (unlimited free)

Monthly cost: $0
Quality: Production-ready models
```

### Kes 3: "Saya memerlukan pengekodan 24/7, tiada gangguan"

**Masalah:** Tarikh akhir, tidak mampu membayar masa henti

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

### Kes 4: "Saya mahukan AI PERCUMA dalam OpenClaw"

**Masalah:** Memerlukan pembantu AI dalam apl pemesejan, percuma sepenuhnya

```
Combo: "openclaw-free"
  1. if/glm-4.7                (unlimited free)
  2. if/minimax-m2.1           (unlimited free)
  3. if/kimi-k2-thinking       (unlimited free)

Monthly cost: $0
Access via: WhatsApp, Telegram, Slack, Discord, iMessage, Signal...
```

---

## 📖 Persediaan Pembekal

### 🔐 Pembekal Langganan

#### Kod Claude (Pro/Max)

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

#### OpenAI Codex (Plus/Pro)

```bash
Dashboard → Providers → Connect Codex
→ OAuth login (port 1455)
→ 5-hour + weekly reset

Models:
  cx/gpt-5.2-codex
  cx/gpt-5.1-codex-max
```

#### Gemini CLI (PERCUMA 180K/bulan!)

```bash
Dashboard → Providers → Connect Gemini CLI
→ Google OAuth
→ 180K completions/month + 1K/day

Models:
  gc/gemini-3-flash-preview
  gc/gemini-2.5-pro
```

**Nilai Terbaik:** Peringkat percuma yang besar! Gunakan ini sebelum peringkat berbayar.

#### Copilot GitHub

```bash
Dashboard → Providers → Connect GitHub
→ OAuth via GitHub
→ Monthly reset (1st of month)

Models:
  gh/gpt-5
  gh/claude-4.5-sonnet
  gh/gemini-3-pro
```

### 💰 Pembekal Murah

#### GLM-4.7 (Tetapan semula harian, $0.6/1J)

1. Daftar: [Zhipu AI](https://open.bigmodel.cn/)
2. Dapatkan kunci API daripada Pelan Pengekodan
3. Papan Pemuka → Tambah Kunci API: Pembekal: `glm`, Kunci API: `your-key`

**Gunakan:** `glm/glm-4.7` — **Petua Pro:** Pelan Pengekodan menawarkan kuota 3× pada 1/7 kos! Tetapkan semula setiap hari 10:00 AM.

#### MiniMax M2.1 (tetapan semula 5j, $0.20/1J)

1. Daftar: [MiniMax](https://www.minimax.io/)
2. Dapatkan kunci API → Papan Pemuka → Tambah Kunci API

**Gunakan:** `minimax/MiniMax-M2.1` — **Petua Pro:** Pilihan termurah untuk konteks panjang (token 1M)!

#### Kimi K2 ($9/bulan rata)

1. Langgan: [Moonshot AI](https://platform.moonshot.ai/)
2. Dapatkan kunci API → Papan Pemuka → Tambah Kunci API

**Gunakan:** `kimi/kimi-latest` — **Petua Pro:** Tetap $9/bulan untuk 10 juta token = $0.90/1J kos efektif!

### 🆓 Pembekal PERCUMA

#### iFlow (8 model PERCUMA)

```bash
Dashboard → Connect iFlow → OAuth login → Unlimited usage

Models: if/kimi-k2-thinking, if/qwen3-coder-plus, if/glm-4.7, if/minimax-m2, if/deepseek-r1
```

#### Qwen (3 model PERCUMA)

```bash
Dashboard → Connect Qwen → Device code auth → Unlimited usage

Models: qw/qwen3-coder-plus, qw/qwen3-coder-flash
```

#### Kiro (Claude PERCUMA)

```bash
Dashboard → Connect Kiro → AWS Builder ID or Google/GitHub → Unlimited

Models: kr/claude-sonnet-4.5, kr/claude-haiku-4.5
```

---

## 🎨 Kombo

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

---

## 🔧 Integrasi CLI

### IDE Kursor

```
Settings → Models → Advanced:
  OpenAI API Base URL: http://localhost:20128/v1
  OpenAI API Key: [from omniroute dashboard]
  Model: cc/claude-opus-4-6
```

### Kod Claude

Edit `~/.claude/config.json`:

```json
{
  "anthropic_api_base": "http://localhost:20128/v1",
  "anthropic_api_key": "your-omniroute-api-key"
}
```

### Codex CLI

```bash
export OPENAI_BASE_URL="http://localhost:20128"
export OPENAI_API_KEY="your-omniroute-api-key"
codex "your prompt"
```

### OpenClaw

Edit `~/.openclaw/openclaw.json`:

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

**Atau gunakan Papan Pemuka:** CLI Tools → OpenClaw → Auto-config

### Cline / Teruskan / RooCode

```
Provider: OpenAI Compatible
Base URL: http://localhost:20128/v1
API Key: [from dashboard]
Model: cc/claude-opus-4-6
```

---

## 🚀 Kerahan

### Penggunaan VPS

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

### Doker

```bash
# Build image (default = runner-cli with codex/claude/droid preinstalled)
docker build -t omniroute:cli .

# Portable mode (recommended)
docker run -d --name omniroute -p 20128:20128 --env-file ./.env -v omniroute-data:/app/data omniroute:cli
```

Untuk mod bersepadu hos dengan binari CLI, lihat bahagian Docker dalam dokumen utama.

### Pembolehubah Persekitaran

| Pembolehubah          | Lalai                                | Penerangan                                                         |
| --------------------- | ------------------------------------ | ------------------------------------------------------------------ |
| `JWT_SECRET`          | `omniroute-default-secret-change-me` | Rahsia menandatangani JWT (**perubahan dalam pengeluaran**)        |
| `INITIAL_PASSWORD`    | `123456`                             | Kata laluan log masuk pertama                                      |
| `DATA_DIR`            | `~/.omniroute`                       | Direktori data (db, penggunaan, log)                               |
| `PORT`                | lalai rangka kerja                   | Port perkhidmatan (`20128` dalam contoh)                           |
| `HOSTNAME`            | lalai rangka kerja                   | Ikat hos (Docker lalai kepada `0.0.0.0`)                           |
| `NODE_ENV`            | lalai masa jalan                     | Tetapkan `production` untuk digunakan                              |
| `BASE_URL`            | `http://localhost:20128`             | URL asas dalaman sebelah pelayan                                   |
| `CLOUD_URL`           | `https://omniroute.dev`              | URL asas titik akhir penyegerakan awan                             |
| `API_KEY_SECRET`      | `endpoint-proxy-api-key-secret`      | Rahsia HMAC untuk kunci API yang dijana                            |
| `REQUIRE_API_KEY`     | `false`                              | Kuatkuasakan kunci API Pembawa pada `/v1/*`                        |
| `ENABLE_REQUEST_LOGS` | `false`                              | Mendayakan log permintaan/tindak balas                             |
| `AUTH_COOKIE_SECURE`  | `false`                              | Paksa `Secure` kuki pengesahan (di belakang proksi terbalik HTTPS) |

Untuk rujukan pembolehubah persekitaran penuh, lihat [README](../README.md).

---

## 📊 Model Tersedia

<details>
<summary><b>Lihat semua model yang tersedia</b></summary>

**Kod Claude (`cc/`)** — Pro/Max: `cc/claude-opus-4-6`, `cc/claude-sonnet-4-5-20250929`, `cc/claude-haiku-4-5-20251001`

**Codex (`cx/`)** — Tambahan/Pro: `cx/gpt-5.2-codex`, `cx/gpt-5.1-codex-max`

**Gemini CLI (`gc/`)** — PERCUMA: `gc/gemini-3-flash-preview`, `gc/gemini-2.5-pro`

**GitHub Copilot (`gh/`)**: `gh/gpt-5`, `gh/claude-4.5-sonnet`

**GLM (`glm/`)** — $0.6/1J: `glm/glm-4.7`

**MiniMax (`minimax/`)** — $0.2/1J: `minimax/MiniMax-M2.1`

**iFlow (`if/`)** — PERCUMA: `if/kimi-k2-thinking`, `if/qwen3-coder-plus`, `if/deepseek-r1`

**Qwen (`qw/`)** — PERCUMA: `qw/qwen3-coder-plus`, `qw/qwen3-coder-flash`

**Kiro (`kr/`)** — PERCUMA: `kr/claude-sonnet-4.5`, `kr/claude-haiku-4.5`

**DeepSeek (`ds/`)**: `ds/deepseek-chat`, `ds/deepseek-reasoner`

**Groq (`groq/`)**: `groq/llama-3.3-70b-versatile`, `groq/llama-4-maverick-17b-128e-instruct`

**xAI (`xai/`)**: `xai/grok-4`, `xai/grok-4-0709-fast-reasoning`, `xai/grok-code-mini`

**Mistral (`mistral/`)**: `mistral/mistral-large-2501`, `mistral/codestral-2501`

**Kekeliruan (`pplx/`)**: `pplx/sonar-pro`, `pplx/sonar`

**Bersama AI (`together/`)**: `together/meta-llama/Llama-3.3-70B-Instruct-Turbo`

**Ai Bunga Api (`fireworks/`)**: `fireworks/accounts/fireworks/models/deepseek-v3p1`

**Serebral (`cerebras/`)**: `cerebras/llama-3.3-70b`

**Kesatuan (`cohere/`)**: `cohere/command-r-plus-08-2024`

**NVIDIA NIM (`nvidia/`)**: `nvidia/nvidia/llama-3.3-70b-instruct`

</details>

---

## 🧩 Ciri Lanjutan

### Model Tersuai

Tambahkan sebarang ID model pada mana-mana pembekal tanpa menunggu kemas kini apl:

```bash
# Via API
curl -X POST http://localhost:20128/api/provider-models \
  -H "Content-Type: application/json" \
  -d '{"provider": "openai", "modelId": "gpt-4.5-preview", "modelName": "GPT-4.5 Preview"}'

# List: curl http://localhost:20128/api/provider-models?provider=openai
# Remove: curl -X DELETE "http://localhost:20128/api/provider-models?provider=openai&model=gpt-4.5-preview"
```

Atau gunakan Papan Pemuka: **Pembekal → [Penyedia] → Model Tersuai**.

### Laluan Penyedia Khusus

Halakan permintaan terus kepada pembekal tertentu dengan pengesahan model:

```bash
POST http://localhost:20128/v1/providers/openai/chat/completions
POST http://localhost:20128/v1/providers/openai/embeddings
POST http://localhost:20128/v1/providers/fireworks/images/generations
```

Awalan pembekal ditambah secara automatik jika tiada. Model tidak sepadan mengembalikan `400`.

### Konfigurasi Proksi Rangkaian

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

**Keutamaan:** Khusus kunci → Khusus kombo → Khusus pembekal → Global → Persekitaran.

### API Katalog Model

```bash
curl http://localhost:20128/api/models/catalog
```

Mengembalikan model yang dikumpulkan mengikut pembekal dengan jenis (`chat`, `embedding`, `image`).

### Penyegerakan Awan

- Penyegerakan penyedia, gabungan dan tetapan merentas peranti
- Penyegerakan latar belakang automatik dengan tamat masa + cepat gagal
- Lebih suka bahagian pelayan `BASE_URL`/`CLOUD_URL` dalam pengeluaran

### Perisikan Gerbang LLM (Fasa 9)

- **Cache Semantik** — Auto-cache bukan penstriman, suhu=0 respons (pintasan dengan `X-OmniRoute-No-Cache: true`)
- **Minta Idempotency** — Menyahduplikasi permintaan dalam masa 5s melalui pengepala `Idempotency-Key` atau `X-Request-Id`
- **Penjejakan Kemajuan** — Ikut serta acara SSE `event: progress` melalui pengepala `X-OmniRoute-Progress: true`

---

### Taman Permainan Penterjemah

Akses melalui **Papan Pemuka → Penterjemah**. Nyahpepijat dan gambarkan cara OmniRoute menterjemah permintaan API antara pembekal.

| Mod                   | Tujuan                                                                                             |
| --------------------- | -------------------------------------------------------------------------------------------------- |
| **Taman Permainan**   | Pilih format sumber/sasaran, tampal permintaan dan lihat output yang diterjemahkan serta-merta     |
| **Penguji Sembang**   | Hantar mesej sembang langsung melalui proksi dan periksa kitaran permintaan/tindak balas penuh     |
| **Bangku Ujian**      | Jalankan ujian kelompok merentasi pelbagai kombinasi format untuk mengesahkan ketepatan terjemahan |
| **Pemantau Langsung** | Tonton terjemahan masa nyata apabila permintaan mengalir melalui proksi                            |

**Kes penggunaan:**

- Nyahpepijat sebab gabungan klien/pembekal tertentu gagal
- Sahkan bahawa teg pemikiran, panggilan alat dan gesaan sistem diterjemahkan dengan betul
- Bandingkan perbezaan format antara format OpenAI, Claude, Gemini dan API Respons

---

### Strategi Penghalaan

Konfigurasikan melalui **Papan Pemuka → Tetapan → Penghalaan**.

| Strategi                    | Penerangan                                                                                                     |
| --------------------------- | -------------------------------------------------------------------------------------------------------------- |
| **Isi Dulu**                | Menggunakan akaun dalam susunan keutamaan — akaun utama mengendalikan semua permintaan sehingga tidak tersedia |
| **Robin Bulat**             | Kitaran melalui semua akaun dengan had melekit boleh dikonfigurasikan (lalai: 3 panggilan setiap akaun)        |
| **P2C (Kuasa Dua Pilihan)** | Pilih 2 akaun rawak dan laluan ke yang lebih sihat — mengimbangi beban dengan kesedaran kesihatan              |
| **Rawak**                   | Memilih akaun secara rawak untuk setiap permintaan menggunakan Fisher-Yates shuffle                            |
| **Kurang Digunakan**        | Laluan ke akaun dengan cap waktu `lastUsedAt` tertua, mengagihkan trafik secara sama rata                      |
| **Kos Dioptimumkan**        | Laluan ke akaun dengan nilai keutamaan terendah, mengoptimumkan untuk pembekal kos terendah                    |

#### Alias Model Kad Liar

Cipta corak kad bebas untuk memetakan semula nama model:

```
Pattern: claude-sonnet-*     →  Target: cc/claude-sonnet-4-5-20250929
Pattern: gpt-*               →  Target: gh/gpt-5.1-codex
```

Kad liar menyokong `*` (sebarang aksara) dan `?` (aksara tunggal).

#### Rantai Fallback

Tentukan rantaian sandaran global yang digunakan merentas semua permintaan:

```
Chain: production-fallback
  1. cc/claude-opus-4-6
  2. gh/gpt-5.1-codex
  3. glm/glm-4.7
```

---

### Ketahanan & Pemutus Litar

Konfigurasikan melalui **Papan Pemuka → Tetapan → Ketahanan**.

OmniRoute melaksanakan daya tahan peringkat penyedia dengan empat komponen:

1. **Profil Pembekal** — Konfigurasi setiap pembekal untuk:
   - Ambang kegagalan (berapa banyak kegagalan sebelum dibuka)
   - Tempoh penyejukan
   - Sensitiviti pengesanan had kadar
   - Parameter mundur eksponen

2. **Had Kadar Boleh Diedit** — Lalai peringkat sistem boleh dikonfigurasikan dalam papan pemuka:
   - **Permintaan Per Minit (RPM)** — Permintaan maksimum seminit setiap akaun
   - **Masa Min Antara Permintaan** — Jurang minimum dalam milisaat antara permintaan
   - **Permintaan Serentak Maks** — Permintaan serentak maksimum bagi setiap akaun
   - Klik **Edit** untuk mengubah suai, kemudian **Simpan** atau **Batal**. Nilai kekal melalui API ketahanan.

3. **Pemutus Litar** — Menjejaki kegagalan setiap pembekal dan membuka litar secara automatik apabila ambang dicapai:
   - **TUTUP** (Sihat) — Permintaan mengalir seperti biasa
   - **BUKA** — Pembekal disekat buat sementara waktu selepas kegagalan berulang
   - **HALF_OPEN** — Menguji jika pembekal telah pulih

4. **Dasar & Pengecam Terkunci** — Menunjukkan status pemutus litar dan pengecam terkunci dengan keupayaan buka kunci paksa.

5. **Pengesanan Auto Had Kadar** — Memantau pengepala `429` dan `Retry-After` untuk mengelak daripada mencapai had kadar penyedia secara proaktif.

**Petua Pro:** Gunakan butang **Reset Semua** untuk mengosongkan semua pemutus litar dan cooldown apabila pembekal pulih daripada gangguan.

---

### Eksport / Import Pangkalan Data

Uruskan sandaran pangkalan data dalam **Papan Pemuka → Tetapan → Sistem & Storan**.

| Tindakan                    | Penerangan                                                                                                                                 |
| --------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| **Eksport Pangkalan Data**  | Memuat turun pangkalan data SQLite semasa sebagai fail `.sqlite`                                                                           |
| **Eksport Semua (.tar.gz)** | Memuat turun arkib sandaran penuh termasuk: pangkalan data, tetapan, kombo, sambungan pembekal (tiada bukti kelayakan), metadata kunci API |
| **Import Pangkalan Data**   | Muat naik fail `.sqlite` untuk menggantikan pangkalan data semasa. Sandaran pra-import dibuat secara automatik                             |

```bash
# API: Export database
curl -o backup.sqlite http://localhost:20128/api/db-backups/export

# API: Export all (full archive)
curl -o backup.tar.gz http://localhost:20128/api/db-backups/exportAll

# API: Import database
curl -X POST http://localhost:20128/api/db-backups/import \
  -F "file=@backup.sqlite"
```

**Pengesahan Import:** Fail yang diimport disahkan untuk integriti (semakan pragma SQLite), jadual yang diperlukan (`provider_connections`, `provider_nodes`, `combos`, `api_keys`) dan saiz (maks 100MB).

**Kes Penggunaan:**

- Pindahkan OmniRoute antara mesin
- Buat sandaran luaran untuk pemulihan bencana
- Kongsi konfigurasi antara ahli pasukan (eksport semua → kongsi arkib)

---

### Papan Pemuka Tetapan

Halaman tetapan disusun menjadi 5 tab untuk navigasi mudah:

| Tab             | Kandungan                                                                                               |
| --------------- | ------------------------------------------------------------------------------------------------------- |
| **Keselamatan** | Tetapan Log Masuk/Kata Laluan, Kawalan Akses IP, pengesahan API untuk `/models` dan Penyekatan Penyedia |
| **Penghalaan**  | Strategi penghalaan global (6 pilihan), alias model kad bebas, rantai sandaran, lalai kombo             |
| **Ketahanan**   | Profil pembekal, had kadar boleh diedit, status pemutus litar, dasar & pengecam terkunci                |
| **AI**          | Pemikiran konfigurasi belanjawan, suntikan segera sistem global, statistik cache segera                 |
| **Lanjutan**    | Konfigurasi proksi global (HTTP/SOCKS5)                                                                 |

---

### Pengurusan Kos & Belanjawan

Akses melalui **Papan Pemuka → Kos**.

| Tab          | Tujuan                                                                                                              |
| ------------ | ------------------------------------------------------------------------------------------------------------------- |
| **Anggaran** | Tetapkan had perbelanjaan bagi setiap kunci API dengan belanjawan harian/mingguan/bulanan dan penjejakan masa nyata |
| **Harga**    | Lihat dan edit entri harga model — kos setiap token input/output 1K bagi setiap pembekal                            |

```bash
# API: Set a budget
curl -X POST http://localhost:20128/api/usage/budget \
  -H "Content-Type: application/json" \
  -d '{"keyId": "key-123", "limit": 50.00, "period": "monthly"}'

# API: Get current budget status
curl http://localhost:20128/api/usage/budget
```

**Penjejakan Kos:** Setiap permintaan merekodkan penggunaan token dan mengira kos menggunakan jadual harga. Lihat pecahan dalam **Papan Pemuka → Penggunaan** oleh pembekal, model dan kunci API.

---

### Transkripsi Audio

OmniRoute menyokong transkripsi audio melalui titik akhir yang serasi dengan OpenAI:

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

Pembekal yang tersedia: **Deepgram** (`deepgram/`), **AssemblyAI** (`assemblyai/`).

Format audio yang disokong: `mp3`, `wav`, `m4a`, `flac`, `ogg`, `webm`.

---

### Strategi Pengimbangan Kombo

Konfigurasikan pengimbangan setiap kombo dalam **Papan Pemuka → Kombo → Cipta/Edit → Strategi**.

| Strategi             | Penerangan                                                                               |
| -------------------- | ---------------------------------------------------------------------------------------- |
| **Round-Robin**      | Berputar melalui model secara berurutan                                                  |
| **Keutamaan**        | Sentiasa mencuba model pertama; jatuh semula hanya atas kesilapan                        |
| **Rawak**            | Memilih model rawak daripada kombo untuk setiap permintaan                               |
| **Ditimbang**        | Laluan secara berkadar berdasarkan berat yang ditetapkan bagi setiap model               |
| **Kurang Digunakan** | Laluan ke model dengan permintaan terkini yang paling sedikit (menggunakan metrik kombo) |
| **Dioptimumkan Kos** | Laluan ke model yang tersedia paling murah (menggunakan jadual harga)                    |

Lalai kombo global boleh ditetapkan dalam **Papan Pemuka → Tetapan → Penghalaan → Lalai Kombo**.

---

### Papan Pemuka Kesihatan

Akses melalui **Papan Pemuka → Kesihatan**. Gambaran keseluruhan kesihatan sistem masa nyata dengan 6 kad:

| Kad                    | Apa yang Ditunjukkan                                                     |
| ---------------------- | ------------------------------------------------------------------------ |
| **Status Sistem**      | Masa aktif, versi, penggunaan memori, direktori data                     |
| **Kesihatan Pembekal** | Keadaan pemutus litar setiap pembekal (Tertutup/Terbuka/Separuh Terbuka) |
| **Had Kadar**          | Cooldown had kadar aktif bagi setiap akaun dengan baki masa              |
| **Sekat Aktif**        | Pembekal disekat buat sementara waktu oleh dasar kunci keluar            |
| **Tandatangan Cache**  | Statistik cache penyahduplikasian (kunci aktif, kadar pukulan)           |
| **Telemetri Latensi**  | p50/p95/p99 pengagregatan kependaman bagi setiap pembekal                |

**Petua Pro:** Halaman Kesihatan dimuat semula secara automatik setiap 10 saat. Gunakan kad pemutus litar untuk mengenal pasti penyedia yang mengalami masalah.
