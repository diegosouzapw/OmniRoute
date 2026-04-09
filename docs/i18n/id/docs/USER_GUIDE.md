# User Guide (Bahasa Indonesia)

🌐 **Languages:** 🇺🇸 [English](../../../../docs/USER_GUIDE.md) · 🇪🇸 [es](../../es/docs/USER_GUIDE.md) · 🇫🇷 [fr](../../fr/docs/USER_GUIDE.md) · 🇩🇪 [de](../../de/docs/USER_GUIDE.md) · 🇮🇹 [it](../../it/docs/USER_GUIDE.md) · 🇷🇺 [ru](../../ru/docs/USER_GUIDE.md) · 🇨🇳 [zh-CN](../../zh-CN/docs/USER_GUIDE.md) · 🇯🇵 [ja](../../ja/docs/USER_GUIDE.md) · 🇰🇷 [ko](../../ko/docs/USER_GUIDE.md) · 🇸🇦 [ar](../../ar/docs/USER_GUIDE.md) · 🇮🇳 [hi](../../hi/docs/USER_GUIDE.md) · 🇮🇳 [in](../../in/docs/USER_GUIDE.md) · 🇹🇭 [th](../../th/docs/USER_GUIDE.md) · 🇻🇳 [vi](../../vi/docs/USER_GUIDE.md) · 🇮🇩 [id](../../id/docs/USER_GUIDE.md) · 🇲🇾 [ms](../../ms/docs/USER_GUIDE.md) · 🇳🇱 [nl](../../nl/docs/USER_GUIDE.md) · 🇵🇱 [pl](../../pl/docs/USER_GUIDE.md) · 🇸🇪 [sv](../../sv/docs/USER_GUIDE.md) · 🇳🇴 [no](../../no/docs/USER_GUIDE.md) · 🇩🇰 [da](../../da/docs/USER_GUIDE.md) · 🇫🇮 [fi](../../fi/docs/USER_GUIDE.md) · 🇵🇹 [pt](../../pt/docs/USER_GUIDE.md) · 🇷🇴 [ro](../../ro/docs/USER_GUIDE.md) · 🇭🇺 [hu](../../hu/docs/USER_GUIDE.md) · 🇧🇬 [bg](../../bg/docs/USER_GUIDE.md) · 🇸🇰 [sk](../../sk/docs/USER_GUIDE.md) · 🇺🇦 [uk-UA](../../uk-UA/docs/USER_GUIDE.md) · 🇮🇱 [he](../../he/docs/USER_GUIDE.md) · 🇵🇭 [phi](../../phi/docs/USER_GUIDE.md) · 🇧🇷 [pt-BR](../../pt-BR/docs/USER_GUIDE.md) · 🇨🇿 [cs](../../cs/docs/USER_GUIDE.md) · 🇹🇷 [tr](../../tr/docs/USER_GUIDE.md)

---

Panduan lengkap untuk mengonfigurasi penyedia, membuat kombo, mengintegrasikan alat CLI, dan menerapkan OmniRoute.---

## Table of Contents

- [Sekilas Harga](#-harga-sekilas)
- [Kasus Penggunaan](#-kasus penggunaan)
- [Penyiapan Penyedia](#-penyiapan-penyedia)
- [Integrasi CLI](#-cli-integrasi)
- [Penerapan](#-penerapan)
- [Model yang Tersedia](#-model-tersedia)
- [Fitur Lanjutan](#-fitur-lanjutan)---

## 💰 Pricing at a Glance

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
| **🆓 GRATIS**       | Qoder             | $0                   | Tidak terbatas            | 8 model gratis              |
|                     | Qwen              | $0                   | Tidak terbatas            | 3 model gratis              |
|                     | Kiro              | $0                   | Tidak terbatas            | Claude gratis               |

**💡 Kiat Pro:**Mulai dengan Gemini CLI (gratis 180 ribu/bulan) + kombo Qoder (gratis tanpa batas) = ​​biaya $0!---

## 🎯 Use Cases

### Case 1: "I have Claude Pro subscription"

**Masalah:**Kuota habis tanpa terpakai, batas kecepatan selama coding berat```
Combo: "maximize-claude"

1. cc/claude-opus-4-6 (use subscription fully)
2. glm/glm-4.7 (cheap backup when quota out)
3. if/kimi-k2-thinking (free emergency fallback)

Monthly cost: $20 (subscription) + ~$5 (backup) = $25 total
vs. $20 + hitting limits = frustration

````

### Case 2: "I want zero cost"

**Masalah:**Tidak mampu berlangganan, memerlukan pengkodean AI yang andal```
Combo: "free-forever"
  1. gc/gemini-3-flash         (180K free/month)
  2. if/kimi-k2-thinking       (unlimited free)
  3. qw/qwen3-coder-plus       (unlimited free)

Monthly cost: $0
Quality: Production-ready models
````

### Case 3: "I need 24/7 coding, no interruptions"

**Masalah:**Tenggat waktu, tidak mampu membayar downtime```
Combo: "always-on"

1. cc/claude-opus-4-6 (best quality)
2. cx/gpt-5.2-codex (second subscription)
3. glm/glm-4.7 (cheap, resets daily)
4. minimax/MiniMax-M2.1 (cheapest, 5h reset)
5. if/kimi-k2-thinking (free unlimited)

Result: 5 layers of fallback = zero downtime
Monthly cost: $20-200 (subscriptions) + $10-20 (backup)

````

### Case 4: "I want FREE AI in OpenClaw"

**Masalah:**Membutuhkan asisten AI dalam aplikasi perpesanan, sepenuhnya gratis```
Combo: "openclaw-free"
  1. if/glm-4.7                (unlimited free)
  2. if/minimax-m2.1           (unlimited free)
  3. if/kimi-k2-thinking       (unlimited free)

Monthly cost: $0
Access via: WhatsApp, Telegram, Slack, Discord, iMessage, Signal...
````

---

## 📖 Provider Setup

### 🔐 Subscription Providers

#### Claude Code (Pro/Max)

```bash
Dashboard → Providers → Connect Claude Code
→ OAuth login → Auto token refresh
→ 5-hour + weekly quota tracking

Models:
  cc/claude-opus-4-6
  cc/claude-sonnet-4-5-20250929
  cc/claude-haiku-4-5-20251001
```

**Kiat Pro:**Gunakan Opus untuk tugas kompleks, Soneta untuk kecepatan. OmniRoute melacak kuota per model!#### OpenAI Codex (Plus/Pro)

```bash
Dashboard → Providers → Connect Codex
→ OAuth login (port 1455)
→ 5-hour + weekly reset

Models:
  cx/gpt-5.2-codex
  cx/gpt-5.1-codex-max
```

#### Gemini CLI (FREE 180K/month!)

```bash
Dashboard → Providers → Connect Gemini CLI
→ Google OAuth
→ 180K completions/month + 1K/day

Models:
  gc/gemini-3-flash-preview
  gc/gemini-2.5-pro
```

**Nilai Terbaik:**Tingkat gratis yang sangat besar! Gunakan ini sebelum tingkatan berbayar.#### GitHub Copilot

```bash
Dashboard → Providers → Connect GitHub
→ OAuth via GitHub
→ Monthly reset (1st of month)

Models:
  gh/gpt-5
  gh/claude-4.5-sonnet
  gh/gemini-3.1-pro-preview
```

### 💰 Cheap Providers

#### GLM-4.7 (Daily reset, $0.6/1M)

1. Daftar: [Zhipu AI](https://open.bigmodel.cn/)
2. Dapatkan kunci API dari Coding Plan
3. Dasbor → Tambahkan Kunci API: Penyedia: `glm`, Kunci API: `kunci-Anda`

**Gunakan:**`glm/glm-4.7` —**Tips Pro:**Paket Coding menawarkan 3× kuota dengan biaya 1/7! Reset setiap hari pukul 10.00.#### MiniMax M2.1 (5h reset, $0.20/1M)

1. Daftar: [MiniMax](https://www.minimax.io/)
2. Dapatkan kunci API → Dasbor → Tambahkan Kunci API

**Gunakan:**`minimax/MiniMax-M2.1` —**Tips Pro:**Opsi termurah untuk konteks panjang (1 juta token)!#### Kimi K2 ($9/month flat)

1. Berlangganan: [Moonshot AI](https://platform.moonshot.ai/)
2. Dapatkan kunci API → Dasbor → Tambahkan Kunci API

**Penggunaan:**`kimi/kimi-latest` —**Tips Pro:**Memperbaiki $9/bulan untuk 10 juta token = biaya efektif $0,90/1 juta!### 🆓 FREE Providers

#### Qoder (8 FREE models)

```bash
Dashboard → Connect Qoder → OAuth login → Unlimited usage

Models: if/kimi-k2-thinking, if/qwen3-coder-plus, if/glm-4.7, if/minimax-m2, if/deepseek-r1
```

#### Qwen (3 FREE models)

```bash
Dashboard → Connect Qwen → Device code auth → Unlimited usage

Models: qw/qwen3-coder-plus, qw/qwen3-coder-flash
```

#### Kiro (Claude FREE)

```bash
Dashboard → Connect Kiro → AWS Builder ID or Google/GitHub → Unlimited

Models: kr/claude-sonnet-4.5, kr/claude-haiku-4.5
```

---

## 🎨 Combos

### Example 1: Maximize Subscription → Cheap Backup

```
Dashboard → Combos → Create New

Name: premium-coding
Models:
  1. cc/claude-opus-4-6 (Subscription primary)
  2. glm/glm-4.7 (Cheap backup, $0.6/1M)
  3. minimax/MiniMax-M2.1 (Cheapest fallback, $0.20/1M)

Use in CLI: premium-coding
```

### Example 2: Free-Only (Zero Cost)

```
Name: free-combo
Models:
  1. gc/gemini-3-flash-preview (180K free/month)
  2. if/kimi-k2-thinking (unlimited)
  3. qw/qwen3-coder-plus (unlimited)

Cost: $0 forever!
```

---

## 🔧 CLI Integration

### Cursor IDE

```
Settings → Models → Advanced:
  OpenAI API Base URL: http://localhost:20128/v1
  OpenAI API Key: [from omniroute dashboard]
  Model: cc/claude-opus-4-6
```

### Claude Code

Sunting `~/.claude/config.json`:```json
{
"anthropic_api_base": "http://localhost:20128/v1",
"anthropic_api_key": "your-omniroute-api-key"
}

````

### Codex CLI

```bash
export OPENAI_BASE_URL="http://localhost:20128"
export OPENAI_API_KEY="your-omniroute-api-key"
codex "your prompt"
````

### OpenClaw

Sunting `~/.openclaw/openclaw.json`:```json
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

**Atau gunakan Dasbor:**Alat CLI → OpenClaw → Konfigurasi otomatis### Cline / Continue / RooCode

```

Provider: OpenAI Compatible
Base URL: http://localhost:20128/v1
API Key: [from dashboard]
Model: cc/claude-opus-4-6

````

---

## Penerapan

### Global npm install (Recommended)

```bash
npm install -g omniroute

# Create config directory
mkdir -p ~/.omniroute

# Create .env file (see .env.example)
cp .env.example ~/.omniroute/.env

# Start server
omniroute
# Or with custom port:
omniroute --port 3000
````

CLI secara otomatis memuat `.env` dari `~/.omniroute/.env` atau `./.env`.### VPS Deployment

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

### PM2 Deployment (Low Memory)

Untuk server dengan RAM terbatas, gunakan opsi batas memori:```bash

# With 512MB limit (default)

pm2 start npm --name omniroute -- start

# Or with custom memory limit

OMNIROUTE_MEMORY_MB=512 pm2 start npm --name omniroute -- start

# Or using ecosystem.config.js

pm2 start ecosystem.config.js

````

Buat `ecosystem.config.js`:```javascript
module.exports = {
  apps: [
    {
      name: "omniroute",
      script: "npm",
      args: "start",
      env: {
        NODE_ENV: "production",
        OMNIROUTE_MEMORY_MB: "512",
        JWT_SECRET: "your-secret",
        INITIAL_PASSWORD: "your-password",
      },
      node_args: "--max-old-space-size=512",
      max_memory_restart: "300M",
    },
  ],
};
````

### Docker

```bash
# Build image (default = runner-cli with codex/claude/droid preinstalled)
docker build -t omniroute:cli .

# Portable mode (recommended)
docker run -d --name omniroute -p 20128:20128 --env-file ./.env -v omniroute-data:/app/data omniroute:cli
```

Untuk mode terintegrasi host dengan biner CLI, lihat bagian Docker di dokumen utama.### Void Linux (xbps-src)

Pengguna Void Linux dapat mengemas dan menginstal OmniRoute secara asli menggunakan kerangka kompilasi silang `xbps-src`. Ini mengotomatiskan build mandiri Node.js bersama dengan binding asli `better-sqlite3` yang diperlukan.

<detail>
<summary><b>Lihat templat xbps-src</b></summary>```bash
# Template file for 'omniroute'
pkgname=omniroute
version=3.2.4
revision=1
hostmakedepends="nodejs python3 make"
depends="openssl"
short_desc="Universal AI gateway with smart routing for multiple LLM providers"
maintainer="zenobit <zenobit@disroot.org>"
license="MIT"
homepage="https://github.com/diegosouzapw/OmniRoute"
distfiles="https://github.com/diegosouzapw/OmniRoute/archive/refs/tags/v${version}.tar.gz"
checksum=009400afee90a9f32599d8fe734145cfd84098140b7287990183dde45ae2245b
system_accounts="_omniroute"
omniroute_homedir="/var/lib/omniroute"
export NODE_ENV=production
export npm_config_engine_strict=false
export npm_config_loglevel=error
export npm_config_fund=false
export npm_config_audit=false

do_build() { # Determine target CPU arch for node-gyp
local \_gyp_arch
case "$XBPS_TARGET_MACHINE" in
aarch64*) \_gyp_arch=arm64 ;;
armv7*|armv6*) \_gyp_arch=arm ;;
i686*) \_gyp_arch=ia32 ;;
\*) \_gyp_arch=x64 ;;
esac

    # 1) Install all deps – skip scripts
    NODE_ENV=development npm ci --ignore-scripts

    # 2) Build the Next.js standalone bundle
    npm run build

    # 3) Copy static assets into standalone
    cp -r .next/static .next/standalone/.next/static
    [ -d public ] && cp -r public .next/standalone/public || true

    # 4) Compile better-sqlite3 native binding
    local _node_gyp=/usr/lib/node_modules/npm/node_modules/node-gyp/bin/node-gyp.js
    (cd node_modules/better-sqlite3 && node "$_node_gyp" rebuild --arch="$_gyp_arch")

    # 5) Place the compiled binding into the standalone bundle
    local _bs3_release=.next/standalone/node_modules/better-sqlite3/build/Release
    mkdir -p "$_bs3_release"
    cp node_modules/better-sqlite3/build/Release/better_sqlite3.node "$_bs3_release/"

    # 6) Remove arch-specific sharp bundles
    rm -rf .next/standalone/node_modules/@img

    # 7) Copy pino runtime deps omitted by Next.js static analysis:
    for _mod in pino-abstract-transport split2 process-warning; do
    	cp -r "node_modules/$_mod" .next/standalone/node_modules/
    done

}

do_check() {
npm run test:unit
}

do_install() {
vmkdir usr/lib/omniroute/.next
vcopy .next/standalone/. usr/lib/omniroute/.next/standalone

    # Prevent removal of empty Next.js app router dirs by the post-install hook
    for _d in \
    	.next/standalone/.next/server/app/dashboard \
    	.next/standalone/.next/server/app/dashboard/settings \
    	.next/standalone/.next/server/app/dashboard/providers; do
    	touch "${DESTDIR}/usr/lib/omniroute/${_d}/.keep"
    done

    cat > "${WRKDIR}/omniroute" <<'EOF'

#!/bin/sh
export PORT="${PORT:-20128}"
export DATA_DIR="${DATA_DIR:-${XDG_DATA_HOME:-${HOME}/.local/share}/omniroute}"
export APP_LOG_TO_FILE="${APP_LOG_TO_FILE:-false}"
mkdir -p "${DATA_DIR}"
exec node /usr/lib/omniroute/.next/standalone/server.js "$@"
EOF
	vbin "${WRKDIR}/omniroute"
}

post_install() {
vlicense LICENSE
}

````

</details>

### Environment Variables

| Variabel | Bawaan | Deskripsi |
| --------------------------------------- | ------------------------------------ | ---------------------------------------------------------------------------------------------------------- |
| `JWT_RAHASIA` | `omniroute-default-rahasia-ubah-saya` | Rahasia penandatanganan JWT (**perubahan produksi**) |
| `INITIAL_PASSWORD` | `123456` | Kata sandi masuk pertama |
| `DATA_DIR` | `~/.omniroute` | Direktori data (db, penggunaan, log) |
| `PELABUHAN` | kerangka default | Port layanan (`20128` dalam contoh) |
| `NAMA HOST` | kerangka default | Ikat host (Docker defaultnya adalah `0.0.0.0`) |
| `NODE_ENV` | default waktu proses | Setel `produksi` untuk penerapan |
| `BASE_URL` | `http://localhost:20128` | URL dasar internal sisi server |
| `CLOUD_URL` | `https://omniroute.dev` | URL dasar titik akhir sinkronisasi cloud |
| `API_KEY_SECRET` | `titik-akhir-proxy-api-rahasia-kunci` | Rahasia HMAC untuk kunci API yang dihasilkan |
| `REQUIRE_API_KEY` | `salah` | Terapkan kunci API Pembawa pada `/v1/*` |
| `ALLOW_API_KEY_REVEAL` | `salah` | Izinkan Api Manager menyalin kunci API lengkap sesuai permintaan |
| `PROVIDER_LIMITS_SYNC_INTERVAL_MINUTES` | `70` | Irama penyegaran sisi server untuk data Batas Penyedia yang di-cache; Tombol penyegaran UI masih memicu sinkronisasi manual |
| `DISABLE_SQLITE_AUTO_BACKUP` | `salah` | Nonaktifkan snapshot SQLite otomatis sebelum menulis/impor/pulihkan; backup manual masih berfungsi |
| `APP_LOG_TO_FILE`                       | `true`                               | Enables application and audit log output to disk                                                          |
| `AUTH_COOKIE_SECURE` | `salah` | Paksa cookie autentikasi `Aman` (di belakang proksi terbalik HTTPS) |
| `CLOUDFLARED_BIN` | tidak disetel | Gunakan biner `cloudflared` yang sudah ada alih-alih unduhan terkelola |
| `CLOUDFLARED_PROTOCOL` | `http2` | Transportasi untuk Terowongan Cepat terkelola (`http2`, `quic`, atau `auto`) |
| `OMNIROUTE_MEMORY_MB` | `512` | Batas tumpukan Node.js dalam MB |
| `PROMPT_CACHE_MAX_SIZE` | `50` | Entri cache prompt maks |
| `SEMANTIC_CACHE_MAX_SIZE` | `100` | Entri cache semantik maksimal |Untuk referensi variabel lingkungan selengkapnya, lihat [README](../README.md).---

## 📊 Available Models

<detail>
<summary><b>Lihat semua model yang tersedia</b></summary>

**Kode Claude (`cc/`)**— Pro/Maks: `cc/claude-opus-4-6`, `cc/claude-sonnet-4-5-20250929`, `cc/claude-haiku-4-5-20251001`

**Codex (`cx/`)**— Plus/Pro: `cx/gpt-5.2-codex`, `cx/gpt-5.1-codex-max`

**Gemini CLI (`gc/`)**— GRATIS: `gc/gemini-3-flash-preview`, `gc/gemini-2.5-pro`

**Copilot GitHub (`gh/`)**: `gh/gpt-5`, `gh/claude-4.5-sonnet`

**GLM (`glm/`)**— $0,6/1 juta: `glm/glm-4,7`

**MiniMax (`minimax/`)**— $0,2/1 juta: `minimax/MiniMax-M2.1`

**Qoder (`if/`)**— GRATIS: `if/kimi-k2-thinking`, `if/qwen3-coder-plus`, `if/deepseek-r1`

**Qwen (`qw/`)**— GRATIS: `qw/qwen3-coder-plus`, `qw/qwen3-coder-flash`

**Kiro (`kr/`)**— GRATIS: `kr/claude-sonnet-4.5`, `kr/claude-haiku-4.5`

**DeepSeek (`ds/`)**: `ds/deepseek-chat`, `ds/deepseek-reasoner`

**Groq (`groq/`)**: `groq/llama-3.3-70b-versatile`, `groq/llama-4-maverick-17b-128e-instruct`

**xAI (`xai/`)**: `xai/grok-4`, `xai/grok-4-0709-penalaran cepat`, `xai/grok-code-mini`

**Mistral (`mistral/`)**: `mistral/mistral-besar-2501`, `mistral/codestral-2501`

**Kebingungan (`pplx/`)**: `pplx/sonar-pro`, `pplx/sonar`

**Bersama AI (`bersama/`)**: `bersama/meta-llama/Llama-3.3-70B-Instruct-Turbo`

**Fireworks AI (`fireworks/`)**: `fireworks/accounts/fireworks/models/deepseek-v3p1`

**Serebral (`otak/`)**: `otak/llama-3.3-70b`

**Cohere (`cohere/`)**: `cohere/command-r-plus-08-2024`

**NVIDIA NIM (`nvidia/`)**: `nvidia/nvidia/llama-3.3-70b-instruct`</details>

---

## 🧩 Advanced Features

### Custom Models

Tambahkan ID model apa pun ke penyedia mana pun tanpa menunggu pembaruan aplikasi:```bash
# Via API
curl -X POST http://localhost:20128/api/provider-models \
  -H "Content-Type: application/json" \
  -d '{"provider": "openai", "modelId": "gpt-4.5-preview", "modelName": "GPT-4.5 Preview"}'

# List: curl http://localhost:20128/api/provider-models?provider=openai
# Remove: curl -X DELETE "http://localhost:20128/api/provider-models?provider=openai&model=gpt-4.5-preview"
````

Atau gunakan Dasbor:**Penyedia → [Penyedia] → Model Khusus**.

Catatan:

- Penyedia yang kompatibel dengan OpenRouter dan OpenAI/Anthropic dikelola hanya dari**Model yang Tersedia**. Penambahan, impor, dan sinkronisasi otomatis secara manual semuanya berada dalam daftar model tersedia yang sama, sehingga tidak ada bagian Model Kustom terpisah untuk penyedia tersebut.
- Bagian**Model Khusus**ditujukan untuk penyedia yang tidak mengekspos impor model tersedia yang dikelola.### Dedicated Provider Routes

Rutekan permintaan langsung ke penyedia tertentu dengan validasi model:```bash
POST http://localhost:20128/v1/providers/openai/chat/completions
POST http://localhost:20128/v1/providers/openai/embeddings
POST http://localhost:20128/v1/providers/fireworks/images/generations

````

Awalan penyedia ditambahkan secara otomatis jika tidak ada. Model yang tidak cocok menghasilkan `400`.### Network Proxy Configuration

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
````

**Prioritas:**Khusus kunci → Khusus kombo → Khusus penyedia → Global → Lingkungan.### Model Catalog API

```bash
curl http://localhost:20128/api/models/catalog
```

Mengembalikan model yang dikelompokkan berdasarkan penyedia dengan jenis (`obrolan`, `penyematan`, `gambar`).### Cloud Sync

- Sinkronisasi penyedia, kombo, dan pengaturan di seluruh perangkat
- Sinkronisasi latar belakang otomatis dengan batas waktu + cepat gagal
- Lebih memilih `BASE_URL`/`CLOUD_URL` sisi server dalam produksi### Cloudflare Quick Tunnel

- Tersedia di**Dasbor → Titik Akhir**untuk Docker dan penerapan yang dihosting sendiri lainnya
- Membuat URL `https://*.trycloudflare.com` sementara yang meneruskan ke titik akhir `/v1` yang kompatibel dengan OpenAI saat ini
- Pertama aktifkan instalasi `cloudflared` hanya bila diperlukan; kemudian restart, gunakan kembali biner terkelola yang sama
- Terowongan Cepat tidak dipulihkan secara otomatis setelah OmniRoute atau kontainer dimulai ulang; aktifkan kembali dari dasbor bila diperlukan
- URL terowongan bersifat sementara dan berubah setiap kali Anda menghentikan/memulai terowongan
- Terkelola Quick Tunnels default ke transportasi HTTP/2 untuk menghindari peringatan buffer UDP QUIC yang berisik dalam wadah yang dibatasi
- Setel `CLOUDFLARED_PROTOCOL=quic` atau `auto` jika Anda ingin mengganti pilihan transportasi terkelola
- Setel `CLOUDFLARED_BIN` jika Anda lebih suka menggunakan biner `cloudflared` yang sudah diinstal sebelumnya daripada unduhan terkelola### LLM Gateway Intelligence (Phase 9)

-**Cache Semantik**— Cache otomatis non-streaming, suhu=0 tanggapan (bypass dengan `X-OmniRoute-No-Cache: true`) -**Request Idempoency**— Menghapus duplikat permintaan dalam waktu 5 detik melalui header `Idempotency-Key` atau `X-Request-Id` -**Pelacakan Kemajuan**— Ikut serta dalam acara `acara: kemajuan` SSE melalui header `X-OmniRoute-Progress: true`---

### Translator Playground

Akses melalui**Dasbor → Penerjemah**. Debug dan visualisasikan bagaimana OmniRoute menerjemahkan permintaan API antar penyedia.

| Modus                | Tujuan                                                                                           |
| -------------------- | ------------------------------------------------------------------------------------------------ |
| **Taman Bermain**    | Pilih format sumber/target, tempelkan permintaan, dan lihat keluaran terjemahan secara instan    |
| **Penguji Obrolan**  | Kirim pesan obrolan langsung melalui proxy dan periksa siklus permintaan/respons lengkap         |
| **Bangku Tes**       | Jalankan pengujian batch pada berbagai kombinasi format untuk memverifikasi kebenaran terjemahan |
| **Monitor Langsung** | Tonton terjemahan real-time saat permintaan mengalir melalui proxy                               |

**Kasus penggunaan:**

- Debug mengapa kombinasi klien/penyedia tertentu gagal
- Verifikasi bahwa tag pemikiran, panggilan alat, dan perintah sistem diterjemahkan dengan benar
- Bandingkan perbedaan format antara format OpenAI, Claude, Gemini, dan Responses API---

### Routing Strategies

Konfigurasikan melalui**Dasbor → Pengaturan → Perutean**.

| Strategi                       | Deskripsi                                                                                                  |
| ------------------------------ | ---------------------------------------------------------------------------------------------------------- | ----------------------------------- |
| **Isi Dulu**                   | Menggunakan akun dalam urutan prioritas — akun utama menangani semua permintaan hingga tidak tersedia      |
| **Robin Bulat**                | Menggilir semua akun dengan batas melekat yang dapat dikonfigurasi (default: 3 panggilan per akun)         |
| **P2C (Kekuatan Dua Pilihan)** | Pilih 2 akun acak dan rute ke akun yang lebih sehat — menyeimbangkan beban dengan kesadaran akan kesehatan |
| **Acak**                       | Memilih akun secara acak untuk setiap permintaan menggunakan Fisher-Yates shuffle                          |
| **Jarang Digunakan**           | Merutekan ke akun dengan stempel waktu `lastUsedAt` terlama, mendistribusikan lalu lintas secara merata    |
| **Pengoptimalan Biaya**        | Merutekan ke akun dengan nilai prioritas terendah, mengoptimalkan penyedia berbiaya terendah               | #### External Sticky Session Header |

Untuk afinitas sesi eksternal (misalnya, agen Claude Code/Codex di belakang proxy terbalik), kirim:```http
X-Session-Id: your-session-key

````

OmniRoute juga menerima `x_session_id` dan mengembalikan kunci sesi efektif di `X-OmniRoute-Session-Id`.

Jika Anda menggunakan Nginx dan mengirim header berbentuk garis bawah, aktifkan:```nginx
underscores_in_headers on;
````

#### Wildcard Model Aliases

Buat pola wildcard untuk memetakan ulang nama model:```
Pattern: claude-sonnet-_ → Target: cc/claude-sonnet-4-5-20250929
Pattern: gpt-_ → Target: gh/gpt-5.1-codex

````

Wildcard mendukung `*` (karakter apa saja) dan `?` (karakter tunggal).#### Fallback Chains

Tentukan rantai fallback global yang berlaku di semua permintaan:```
Chain: production-fallback
  1. cc/claude-opus-4-6
  2. gh/gpt-5.1-codex
  3. glm/glm-4.7
````

---

### Resilience & Circuit Breakers

Konfigurasikan melalui**Dasbor → Pengaturan → Ketahanan**.

OmniRoute mengimplementasikan ketahanan tingkat penyedia dengan empat komponen:

1.**Profil Penyedia**— Konfigurasi per penyedia untuk:

- Ambang batas kegagalan (berapa banyak kegagalan sebelum dibuka)
- Durasi pendinginan
- Sensitivitas deteksi batas kecepatan
- Parameter backoff eksponensial

  2.**Batas Tarif yang Dapat Diedit**— Default tingkat sistem dapat dikonfigurasi di dasbor: -**Permintaan Per Menit (RPM)**— Permintaan maksimum per menit per akun -**Waktu Minimum Antar Permintaan**— Kesenjangan minimum dalam milidetik antar permintaan -**Permintaan Bersamaan Maksimum**— Permintaan simultan maksimum per akun

- Klik**Edit**untuk mengubah, lalu**Simpan**atau**Batal**. Nilai-nilai bertahan melalui API ketahanan.

  3.**Pemutus Sirkuit**— Melacak kegagalan per penyedia dan secara otomatis membuka sirkuit ketika ambang batas tercapai: -**TUTUP**(Sehat) — Permintaan mengalir normal -**BUKA**— Penyedia diblokir sementara setelah kegagalan berulang kali -**HALF_OPEN**— Menguji apakah penyedia telah pulih

  4.**Kebijakan & Pengidentifikasi Terkunci**— Menampilkan status pemutus sirkuit dan pengidentifikasi terkunci dengan kemampuan buka paksa.

  5.**Deteksi Otomatis Batas Kecepatan**— Memantau header `429` dan `Coba Ulang-Setelah` untuk secara proaktif menghindari batas kecepatan penyedia.

**Kiat Pro:**Gunakan tombol**Reset Semua**untuk menghapus semua pemutus sirkuit dan cooldown saat penyedia pulih dari pemadaman listrik.---

### Database Export / Import

Kelola cadangan basis data di**Dasbor → Pengaturan → Sistem & Penyimpanan**.

| Aksi                       | Deskripsi                                                                                                                                       |
| -------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- | ------- |
| **Ekspor Basis Data**      | Mengunduh database SQLite saat ini sebagai file `.sqlite`                                                                                       |
| **Ekspor Semua (.tar.gz)** | Mengunduh arsip cadangan lengkap termasuk: basis data, pengaturan, kombo, koneksi penyedia (tanpa kredensial), metadata kunci API               |
| **Impor Basis Data**       | Unggah file `.sqlite` untuk menggantikan database saat ini. Cadangan pra-impor dibuat secara otomatis kecuali `DISABLE_SQLITE_AUTO_BACKUP=true` | ```bash |

# API: Export database

curl -o backup.sqlite http://localhost:20128/api/db-backups/export

# API: Export all (full archive)

curl -o backup.tar.gz http://localhost:20128/api/db-backups/exportAll

# API: Import database

curl -X POST http://localhost:20128/api/db-backups/import \
 -F "file=@backup.sqlite"

````

**Validasi Impor:**File yang diimpor divalidasi untuk integritas (pemeriksaan pragma SQLite), tabel yang diperlukan (`provider_connections`, `provider_nodes`, `combos`, `api_keys`), dan ukuran (maks 100MB).

**Kasus Penggunaan:**

- Migrasi OmniRoute antar mesin
- Buat cadangan eksternal untuk pemulihan bencana
- Bagikan konfigurasi antar anggota tim (ekspor semua → bagikan arsip)---

### Settings Dashboard

Halaman pengaturan disusun menjadi 6 tab untuk memudahkan navigasi:

| Tab | Isi |
| -------------- | ---------------------------------------------------------------------------------------------- |
|**Umum**| Alat penyimpanan sistem, pengaturan tampilan, kontrol tema, dan visibilitas sidebar per item |
|**Keamanan**| Pengaturan Login/Kata Sandi, Kontrol Akses IP, autentikasi API untuk `/models`, dan Pemblokiran Penyedia |
|**Perutean**| Strategi perutean global (6 opsi), alias model wildcard, rantai fallback, default kombo |
|**Ketahanan**| Profil penyedia, batas tarif yang dapat diedit, status pemutus sirkuit, kebijakan & pengidentifikasi terkunci |
|**AI**| Memikirkan konfigurasi anggaran, injeksi cepat sistem global, statistik cache cepat |
|**Lanjutan**| Konfigurasi proksi global (HTTP/SOCKS5) |---

### Costs & Budget Management

Akses melalui**Dasbor → Biaya**.

| Tab | Tujuan |
| ----------- | ----------------------------------------------------------------------------------------- |
|**Anggaran**| Tetapkan batas pengeluaran per kunci API dengan anggaran harian/mingguan/bulanan dan pelacakan waktu nyata |
|**Harga**| Lihat dan edit entri harga model — biaya per 1K token input/output per penyedia |```bash
# API: Set a budget
curl -X POST http://localhost:20128/api/usage/budget \
  -H "Content-Type: application/json" \
  -d '{"keyId": "key-123", "limit": 50.00, "period": "monthly"}'

# API: Get current budget status
curl http://localhost:20128/api/usage/budget
````

**Pelacakan Biaya:**Setiap permintaan mencatat penggunaan token dan menghitung biaya menggunakan tabel harga. Lihat pengelompokan di**Dasbor → Penggunaan**menurut penyedia, model, dan kunci API.---

### Audio Transcription

OmniRoute mendukung transkripsi audio melalui titik akhir yang kompatibel dengan OpenAI:```bash
POST /v1/audio/transcriptions
Authorization: Bearer your-api-key
Content-Type: multipart/form-data

# Example with curl

curl -X POST http://localhost:20128/v1/audio/transcriptions \
 -H "Authorization: Bearer your-api-key" \
 -F "file=@audio.mp3" \
 -F "model=deepgram/nova-3"

````

Penyedia yang tersedia:**Deepgram**(`deepgram/`),**AssemblyAI**(`assemblyai/`).

Format audio yang didukung: `mp3`, `wav`, `m4a`, `flac`, `ogg`, `webm`.---

### Combo Balancing Strategies

Konfigurasikan penyeimbangan per kombo di**Dasbor → Kombo → Buat/Edit → Strategi**.

| Strategi | Deskripsi |
| ---- | ------------------------------------------------------------------------ |
|**Robin Bulat**| Berputar melalui model secara berurutan |
|**Prioritas**| Selalu mencoba model pertama; jatuh kembali hanya karena kesalahan |
|**Acak**| Memilih model acak dari kombo untuk setiap permintaan |
|**Berbobot**| Rute secara proporsional berdasarkan bobot yang ditetapkan per model |
|**Jarang Digunakan**| Merutekan ke model dengan permintaan terkini paling sedikit (menggunakan metrik kombo) |
|**Dioptimalkan Biaya**| Rute ke model termurah yang tersedia (menggunakan tabel harga) |

Default kombo global dapat diatur di**Dasbor → Pengaturan → Perutean → Default Kombo**.---

### Health Dashboard

Akses melalui**Dasbor → Kesehatan**. Ikhtisar kesehatan sistem real-time dengan 6 kartu:

| Kartu | Apa yang Ditunjukkannya |
| --------------------- | -------------------------------------------- |
|**Status Sistem**| Uptime, versi, penggunaan memori, direktori data |
|**Kesehatan Penyedia**| Status pemutus sirkuit per penyedia (Tertutup/Terbuka/Setengah Terbuka) |
|**Batas Tarif**| Cooldown batas tarif aktif per akun dengan sisa waktu |
|**Penguncian Aktif**| Penyedia diblokir sementara oleh kebijakan lockout |
|**Cache Tanda Tangan**| Statistik cache deduplikasi (kunci aktif, tingkat hit) |
|**Telemetri Latensi**| agregasi latensi p50/p95/p99 per penyedia |

**Tips Pro:**Halaman Kesehatan disegarkan secara otomatis setiap 10 detik. Gunakan kartu pemutus sirkuit untuk mengidentifikasi penyedia mana yang mengalami masalah.---

## 🖥️ Desktop Application (Electron)

OmniRoute tersedia sebagai aplikasi desktop asli untuk Windows, macOS, dan Linux.### Instal

```bash
# From the electron directory:
cd electron
npm install

# Development mode (connect to running Next.js dev server):
npm run dev

# Production mode (uses standalone build):
npm start
````

### Building Installers

```bash
cd electron
npm run build          # Current platform
npm run build:win      # Windows (.exe NSIS)
npm run build:mac      # macOS (.dmg universal)
npm run build:linux    # Linux (.AppImage)
```

Keluaran → `elektron/dist-elektron/`### Key Features

| Fitur                         | Deskripsi                                                                  |
| ----------------------------- | -------------------------------------------------------------------------- | ------------------------- |
| **Kesiapan Server**           | Server jajak pendapat sebelum menampilkan jendela (tidak ada layar kosong) |
| **Baki Sistem**               | Minimalkan ke baki, ubah port, keluar dari menu baki                       |
| **Manajemen Pelabuhan**       | Ubah port server dari baki (server restart otomatis)                       |
| **Kebijakan Keamanan Konten** | CSP terbatas melalui header sesi                                           |
| **Instans Tunggal**           | Hanya satu instance aplikasi yang dapat dijalankan dalam satu waktu        |
| **Mode Luring**               | Server Next.js yang dibundel berfungsi tanpa internet                      | ### Environment Variables |

| Variabel              | Bawaan  | Deskripsi                            |
| --------------------- | ------- | ------------------------------------ |
| `OMNIROUTE_PORT`      | `20128` | Pelabuhan server                     |
| `OMNIROUTE_MEMORY_MB` | `512`   | Batas tumpukan Node.js (64–16384 MB) |

📖 Dokumentasi lengkap: [`electron/README.md`](../electron/README.md)
