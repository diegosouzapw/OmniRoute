# User Guide (Bahasa Melayu)

🌐 **Languages:** 🇺🇸 [English](../../../../docs/USER_GUIDE.md) · 🇪🇸 [es](../../es/docs/USER_GUIDE.md) · 🇫🇷 [fr](../../fr/docs/USER_GUIDE.md) · 🇩🇪 [de](../../de/docs/USER_GUIDE.md) · 🇮🇹 [it](../../it/docs/USER_GUIDE.md) · 🇷🇺 [ru](../../ru/docs/USER_GUIDE.md) · 🇨🇳 [zh-CN](../../zh-CN/docs/USER_GUIDE.md) · 🇯🇵 [ja](../../ja/docs/USER_GUIDE.md) · 🇰🇷 [ko](../../ko/docs/USER_GUIDE.md) · 🇸🇦 [ar](../../ar/docs/USER_GUIDE.md) · 🇮🇳 [hi](../../hi/docs/USER_GUIDE.md) · 🇮🇳 [in](../../in/docs/USER_GUIDE.md) · 🇹🇭 [th](../../th/docs/USER_GUIDE.md) · 🇻🇳 [vi](../../vi/docs/USER_GUIDE.md) · 🇮🇩 [id](../../id/docs/USER_GUIDE.md) · 🇲🇾 [ms](../../ms/docs/USER_GUIDE.md) · 🇳🇱 [nl](../../nl/docs/USER_GUIDE.md) · 🇵🇱 [pl](../../pl/docs/USER_GUIDE.md) · 🇸🇪 [sv](../../sv/docs/USER_GUIDE.md) · 🇳🇴 [no](../../no/docs/USER_GUIDE.md) · 🇩🇰 [da](../../da/docs/USER_GUIDE.md) · 🇫🇮 [fi](../../fi/docs/USER_GUIDE.md) · 🇵🇹 [pt](../../pt/docs/USER_GUIDE.md) · 🇷🇴 [ro](../../ro/docs/USER_GUIDE.md) · 🇭🇺 [hu](../../hu/docs/USER_GUIDE.md) · 🇧🇬 [bg](../../bg/docs/USER_GUIDE.md) · 🇸🇰 [sk](../../sk/docs/USER_GUIDE.md) · 🇺🇦 [uk-UA](../../uk-UA/docs/USER_GUIDE.md) · 🇮🇱 [he](../../he/docs/USER_GUIDE.md) · 🇵🇭 [phi](../../phi/docs/USER_GUIDE.md) · 🇧🇷 [pt-BR](../../pt-BR/docs/USER_GUIDE.md) · 🇨🇿 [cs](../../cs/docs/USER_GUIDE.md) · 🇹🇷 [tr](../../tr/docs/USER_GUIDE.md)

---

Panduan lengkap untuk mengkonfigurasi penyedia, mencipta gabungan, menyepadukan alatan CLI dan menggunakan OmniRoute.---

## Table of Contents

- [Sekilas Pandang Harga](#-harga-sepintas lalu)
- [Kes Penggunaan](# kes penggunaan)
- [Persediaan Penyedia](#-persediaan-penyedia)
- [Penyatuan CLI](penyepaduan #-cli)
- [Deployment](#-deployment)
- [Model Tersedia](#-model-tersedia)
- [Ciri Terperinci](#-ciri-termaju)---

## 💰 Pricing at a Glance

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
| **🆓 PERCUMA**   | Qoder            | $0                      | tanpa had          | 8 model percuma        |
|                  | Qwen             | $0                      | tanpa had          | 3 model percuma        |
|                  | Kiro             | $0                      | tanpa had          | Claude percuma         |

**💡 Petua Pro:**Mulakan dengan Gemini CLI (180K percuma/bulan) + Qoder (percuma tanpa had) kombo = $0 kos!---

## 🎯 Use Cases

### Case 1: "I have Claude Pro subscription"

**Masalah:**Kuota tamat tempoh tidak digunakan, had kadar semasa pengekodan berat```
Combo: "maximize-claude"

1. cc/claude-opus-4-6 (use subscription fully)
2. glm/glm-4.7 (cheap backup when quota out)
3. if/kimi-k2-thinking (free emergency fallback)

Monthly cost: $20 (subscription) + ~$5 (backup) = $25 total
vs. $20 + hitting limits = frustration

````

### Case 2: "I want zero cost"

**Masalah:**Tidak mampu membayar langganan, memerlukan pengekodan AI yang boleh dipercayai```
Combo: "free-forever"
  1. gc/gemini-3-flash         (180K free/month)
  2. if/kimi-k2-thinking       (unlimited free)
  3. qw/qwen3-coder-plus       (unlimited free)

Monthly cost: $0
Quality: Production-ready models
````

### Case 3: "I need 24/7 coding, no interruptions"

**Masalah:**Tarikh akhir, tidak mampu membayar masa henti```
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

**Masalah:**Memerlukan pembantu AI dalam apl pemesejan, percuma sepenuhnya```
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

**Petua Pro:**Gunakan Opus untuk tugas yang rumit, Sonnet untuk kelajuan. OmniRoute menjejaki kuota setiap model!#### OpenAI Codex (Plus/Pro)

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

**Nilai Terbaik:**Peringkat percuma yang besar! Gunakan ini sebelum peringkat berbayar.#### GitHub Copilot

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
2. Dapatkan kunci API daripada Pelan Pengekodan
3. Papan Pemuka → Tambah Kunci API: Pembekal: `glm`, Kunci API: `kunci-anda`

**Gunakan:**`glm/glm-4.7` —**Petua Pro:**Pelan Pengekodan menawarkan kuota 3× pada kos 1/7! Tetapkan semula setiap hari 10:00 AM.#### MiniMax M2.1 (5h reset, $0.20/1M)

1. Daftar: [MiniMax](https://www.minimax.io/)
2. Dapatkan kunci API → Papan Pemuka → Tambah Kunci API

**Gunakan:**`minimax/MiniMax-M2.1` —**Petua Pro:**Pilihan termurah untuk konteks panjang (token 1M)!#### Kimi K2 ($9/month flat)

1. Langgan: [Moonshot AI](https://platform.moonshot.ai/)
2. Dapatkan kunci API → Papan Pemuka → Tambah Kunci API

**Gunakan:**`kimi/kimi-terbaru` —**Petua Pro:**Tetap $9/bulan untuk 10 juta token = $0.90/1J kos efektif!### 🆓 FREE Providers

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

Edit `~/.claude/config.json`:```json
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

Edit `~/.openclaw/openclaw.json`:```json
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

**Atau gunakan Papan Pemuka:**CLI Tools → OpenClaw → Auto-config### Cline / Continue / RooCode

```

Provider: OpenAI Compatible
Base URL: http://localhost:20128/v1
API Key: [from dashboard]
Model: cc/claude-opus-4-6

````

---

## Penempatan

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

CLI secara automatik memuatkan `.env` daripada `~/.omniroute/.env` atau `./.env`.### VPS Deployment

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

Untuk pelayan dengan RAM terhad, gunakan pilihan had memori:```bash

# With 512MB limit (default)

pm2 start npm --name omniroute -- start

# Or with custom memory limit

OMNIROUTE_MEMORY_MB=512 pm2 start npm --name omniroute -- start

# Or using ecosystem.config.js

pm2 start ecosystem.config.js

````

Cipta `ecosystem.config.js`:```javascript
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

Untuk mod bersepadu hos dengan perduaan CLI, lihat bahagian Docker dalam dokumen utama.### Void Linux (xbps-src)

Pengguna Linux yang tidak sah boleh membungkus dan memasang OmniRoute secara asli menggunakan rangka kerja kompilasi silang `xbps-src`. Ini mengautomasikan binaan kendiri Node.js bersama-sama dengan pengikatan asli `better-sqlite3` yang diperlukan.

<butiran>
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

| Pembolehubah | Lalai | Penerangan |
| ---------------------------------------------------- | ------------------------------------ | ------------------------------------------------------------------------------------------------------------------- |
| `JWT_RAHSIA` | `omniroute-default-secret-change-me` | Rahsia menandatangani JWT (**perubahan dalam pengeluaran**) |
| `KATA_laluan_AWAL` | `123456` | Kata laluan log masuk pertama |
| `DATA_DIR` | `~/.omniroute` | Direktori data (db, penggunaan, log) |
| `PORT` | lalai rangka kerja | Port perkhidmatan (`20128` dalam contoh) |
| `HOSTNAME` | lalai rangka kerja | Ikat hos (Docker lalai kepada `0.0.0.0`) |
| `NODE_ENV` | lalai masa jalan | Tetapkan `pengeluaran` untuk digunakan |
| `URL_BASE` | `http://localhost:20128` | URL asas dalaman sebelah pelayan |
| `CLOUD_URL` | `https://omniroute.dev` | URL asas titik akhir penyegerakan awan |
| `RAHSIA_KUNCI_API` | `endpoint-proxy-api-key-secret` | Rahsia HMAC untuk kunci API yang dijana |
| `PERLUKAN_KUNCI_API` | `palsu` | Kuatkuasakan kunci API Pembawa pada `/v1/*` |
| `BENARKAN_KUNCI_API_DEDAH` | `palsu` | Benarkan Pengurus Api menyalin kunci API penuh atas permintaan |
| `PROVIDER_LIMITS_SYNC_INTERVAL_MINUTES` | `70` | Irama penyegaran sisi pelayan untuk data Had Penyedia yang dicache; Butang muat semula UI masih mencetuskan penyegerakan manual |
| `DISABLE_SQLITE_AUTO_BACKUP` | `palsu` | Lumpuhkan syot kilat SQLite automatik sebelum menulis/import/pulihkan; sandaran manual masih berfungsi |
| `APP_LOG_TO_FILE`                       | `true`                               | Enables application and audit log output to disk                                                          |
| `AUTH_COOKIE_SECURE` | `palsu` | Paksa kuki pengesahan `Secure` (di belakang proksi terbalik HTTPS) |
| `CLOUDFLARED_BIN` | tidak ditetapkan | Gunakan binari `cloudflared` sedia ada dan bukannya muat turun terurus |
| `CLOUDFLARED_PROTOCOL` | `http2` | Pengangkutan untuk Terowong Pantas terurus (`http2`, `quic` atau `auto`) |
| `OMNIROUTE_MEMORY_MB` | `512` | Had timbunan Node.js dalam MB |
| `PROMPT_CACHE_MAX_SIZE` | `50` | Kemasukan cache gesaan maksimum |
| `SEMANTIK_CACHE_MAX_SIZE` | `100` | Entri cache semantik maksimum |Untuk rujukan pembolehubah persekitaran penuh, lihat [README](../README.md).---

## 📊 Available Models

<butiran>
<summary><b>Lihat semua model yang tersedia</b></summary>

**Kod Claude (`cc/`)**— Pro/Max: `cc/claude-opus-4-6`, `cc/claude-sonnet-4-5-20250929`, `cc/claude-haiku-4-5-20251001`

**Codex (`cx/`)**— Plus/Pro: `cx/gpt-5.2-codex`, `cx/gpt-5.1-codex-max`

**Gemini CLI (`gc/`)**— PERCUMA: `gc/gemini-3-flash-preview`, `gc/gemini-2.5-pro`

**GitHub Copilot (`gh/`)**: `gh/gpt-5`, `gh/claude-4.5-sonnet`

**GLM (`glm/`)**— $0.6/1J: `glm/glm-4.7`

**MiniMax (`minimax/`)**— $0.2/1J: `minimax/MiniMax-M2.1`

**Qoder (`jika/`)**— PERCUMA: `if/kimi-k2-thinking`, `if/qwen3-coder-plus`, `if/deepseek-r1`

**Qwen (`qw/`)**— PERCUMA: `qw/qwen3-coder-plus`, `qw/qwen3-coder-flash`

**Kiro (`kr/`)**— PERCUMA: `kr/claude-sonnet-4.5`, `kr/claude-haiku-4.5`

**DeepSeek (`ds/`)**: `ds/deepseek-chat`, `ds/deepseek-reasoner`

**Groq (`groq/`)**: `groq/llama-3.3-70b-versatile`, `groq/llama-4-maverick-17b-128e-instruct`

**xAI (`xai/`)**: `xai/grok-4`, `xai/grok-4-0709-fast-reasoning`, `xai/grok-code-mini`

**Mistral (`mistral/`)**: `mistral/mistral-large-2501`, `mistral/codestral-2501`

**Kekeliruan (`pplx/`)**: `pplx/sonar-pro`, `pplx/sonar`

**Together AI (`together/`)**: `together/meta-llama/Llama-3.3-70B-Instruct-Turbo`

**Ai Bunga Api (`bunga api/`)**: `bunga api/akaun/bunga api/model/deepseek-v3p1`

**Serebral (`cerebras/`)**: `cerebras/llama-3.3-70b`

**Cohere (`cohere/`)**: `cohere/command-r-plus-08-2024`

**NVIDIA NIM (`nvidia/`)**: `nvidia/nvidia/llama-3.3-70b-instruct`</details>

---

## 🧩 Advanced Features

### Custom Models

Tambahkan sebarang ID model pada mana-mana pembekal tanpa menunggu kemas kini apl:```bash
# Via API
curl -X POST http://localhost:20128/api/provider-models \
  -H "Content-Type: application/json" \
  -d '{"provider": "openai", "modelId": "gpt-4.5-preview", "modelName": "GPT-4.5 Preview"}'

# List: curl http://localhost:20128/api/provider-models?provider=openai
# Remove: curl -X DELETE "http://localhost:20128/api/provider-models?provider=openai&model=gpt-4.5-preview"
````

Atau gunakan Papan Pemuka:**Pembekal → [Penyedia] → Model Tersuai**.

Nota:

- Pembekal OpenRouter dan OpenAI/Anthropic-compatible diuruskan daripada**Model Tersedia**sahaja. Tambah, import dan autosegerakkan secara manual semua mendarat dalam senarai model tersedia yang sama, jadi tiada bahagian Model Tersuai yang berasingan untuk pembekal tersebut.
- Bahagian**Model Tersuai**bertujuan untuk pembekal yang tidak mendedahkan import model tersedia terurus.### Dedicated Provider Routes

Halakan permintaan terus kepada pembekal tertentu dengan pengesahan model:```bash
POST http://localhost:20128/v1/providers/openai/chat/completions
POST http://localhost:20128/v1/providers/openai/embeddings
POST http://localhost:20128/v1/providers/fireworks/images/generations

````

Awalan pembekal ditambah secara automatik jika tiada. Model yang tidak sepadan mengembalikan `400`.### Network Proxy Configuration

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

**Keutamaan:**Khusus kunci → Khusus kombo → Khusus pembekal → Global → Persekitaran.### Model Catalog API

```bash
curl http://localhost:20128/api/models/catalog
```

Mengembalikan model yang dikumpulkan mengikut pembekal dengan jenis (`sembang`, `benam`, `imej`).### Cloud Sync

- Penyegerakan penyedia, gabungan dan tetapan merentas peranti
- Penyegerakan latar belakang automatik dengan tamat masa + cepat gagal
- Lebih suka bahagian pelayan `BASE_URL`/`CLOUD_URL` dalam pengeluaran### Cloudflare Quick Tunnel

- Tersedia dalam**Papan Pemuka → Titik Tamat**untuk Docker dan penempatan dihoskan sendiri yang lain
- Mencipta URL sementara `https://*.trycloudflare.com` yang memajukan ke titik akhir `/v1` semasa anda yang serasi dengan OpenAI
- Mula-mula dayakan pemasangan `cloudflared` hanya apabila diperlukan; kemudian dimulakan semula menggunakan semula binari terurus yang sama
- Terowong Pantas tidak dipulihkan secara automatik selepas OmniRoute atau kontena dimulakan semula; dayakan semula daripada papan pemuka apabila diperlukan
- URL terowong bersifat sementara dan berubah setiap kali anda berhenti/memulakan terowong
- Terowong Pantas Terurus lalai kepada pengangkutan HTTP/2 untuk mengelakkan amaran penimbal UDP QUIC yang bising dalam bekas yang dikekang
- Tetapkan `CLOUDFLARED_PROTOCOL=quic` atau `auto` jika anda ingin mengatasi pilihan pengangkutan terurus
- Tetapkan `CLOUDFLARED_BIN` jika anda lebih suka menggunakan binari `cloudflared` yang diprapasang dan bukannya muat turun terurus### LLM Gateway Intelligence (Phase 9)

-**Semantic Cache**— Auto-cache bukan penstriman, suhu=0 respons (pintasan dengan `X-OmniRoute-No-Cache: true`) -**Minta Idempotency**— Menyahduplikasi permintaan dalam masa 5s melalui pengepala `Idempotency-Key` atau `X-Request-Id` -**Penjejakan Kemajuan**— Ikut serta SSE acara `event: progress` melalui pengepala `X-OmniRoute-Progress: true`---

### Translator Playground

Akses melalui**Papan Pemuka → Penterjemah**. Nyahpepijat dan gambarkan cara OmniRoute menterjemah permintaan API antara pembekal.

| Mod                   | Tujuan                                                                                             |
| --------------------- | -------------------------------------------------------------------------------------------------- |
| **Taman Permainan**   | Pilih format sumber/sasaran, tampal permintaan dan lihat output yang diterjemahkan serta-merta     |
| **Penguji Sembang**   | Hantar mesej sembang langsung melalui proksi dan periksa kitaran permintaan/tindak balas penuh     |
| **Bangku Ujian**      | Jalankan ujian kelompok merentasi pelbagai kombinasi format untuk mengesahkan ketepatan terjemahan |
| **Pemantau Langsung** | Tonton terjemahan masa nyata apabila permintaan mengalir melalui proksi                            |

**Kes penggunaan:**

- Nyahpepijat sebab gabungan klien/pembekal tertentu gagal
- Sahkan bahawa teg pemikiran, panggilan alat dan gesaan sistem diterjemahkan dengan betul
- Bandingkan perbezaan format antara format OpenAI, Claude, Gemini dan API Respons---

### Routing Strategies

Konfigurasikan melalui**Papan Pemuka → Tetapan → Penghalaan**.

| Strategi                    | Penerangan                                                                                                     |
| --------------------------- | -------------------------------------------------------------------------------------------------------------- | ----------------------------------- |
| **Isi Dulu**                | Menggunakan akaun dalam susunan keutamaan — akaun utama mengendalikan semua permintaan sehingga tidak tersedia |
| **Robin Bulat**             | Kitaran melalui semua akaun dengan had melekat boleh dikonfigurasikan (lalai: 3 panggilan setiap akaun)        |
| **P2C (Kuasa Dua Pilihan)** | Pilih 2 akaun rawak dan laluan ke yang lebih sihat — mengimbangi beban dengan kesedaran kesihatan              |
| **Rawak**                   | Memilih akaun secara rawak untuk setiap permintaan menggunakan Fisher-Yates shuffle                            |
| **Kurang Digunakan**        | Laluan ke akaun dengan cap waktu `lastUsedAt` tertua, mengagihkan trafik secara sama rata                      |
| **Kos Dioptimumkan**        | Laluan ke akaun dengan nilai keutamaan terendah, mengoptimumkan untuk pembekal kos terendah                    | #### External Sticky Session Header |

Untuk perkaitan sesi luaran (contohnya, ejen Claude Code/Codex di sebalik proksi terbalik), hantarkan:```http
X-Session-Id: your-session-key

````

OmniRoute juga menerima `x_session_id` dan mengembalikan kunci sesi berkesan dalam `X-OmniRoute-Session-Id`.

Jika anda menggunakan Nginx dan menghantar pengepala borang garis bawah, dayakan:```nginx
underscores_in_headers on;
````

#### Wildcard Model Aliases

Cipta corak kad bebas untuk memetakan semula nama model:```
Pattern: claude-sonnet-_ → Target: cc/claude-sonnet-4-5-20250929
Pattern: gpt-_ → Target: gh/gpt-5.1-codex

````

Kad liar menyokong `*` (sebarang aksara) dan `?` (aksara tunggal).#### Fallback Chains

Tentukan rantaian sandaran global yang digunakan merentas semua permintaan:```
Chain: production-fallback
  1. cc/claude-opus-4-6
  2. gh/gpt-5.1-codex
  3. glm/glm-4.7
````

---

### Resilience & Circuit Breakers

Konfigurasikan melalui**Papan Pemuka → Tetapan → Ketahanan**.

OmniRoute melaksanakan daya tahan peringkat penyedia dengan empat komponen:

1.**Profil Pembekal**— Konfigurasi setiap pembekal untuk:

- Ambang kegagalan (berapa banyak kegagalan sebelum dibuka)
- Tempoh penyejukan
- Sensitiviti pengesanan had kadar
- Parameter mundur eksponen

  2.**Had Kadar Boleh Diedit**— Lalai peringkat sistem boleh dikonfigurasikan dalam papan pemuka: -**Permintaan Per Minit (RPM)**— Permintaan maksimum seminit setiap akaun -**Masa Min Antara Permintaan**— Jurang minimum dalam milisaat antara permintaan -**Permintaan Serentak Maks**— Permintaan serentak maksimum bagi setiap akaun

- Klik**Edit**untuk mengubah suai, kemudian**Simpan**atau**Batal**. Nilai kekal melalui API ketahanan.

  3.**Pemutus Litar**— Menjejaki kegagalan setiap pembekal dan membuka litar secara automatik apabila ambang dicapai: -**TUTUP**(Sihat) — Permintaan mengalir seperti biasa -**BUKA**— Pembekal disekat buat sementara waktu selepas kegagalan berulang -**HALF_OPEN**— Menguji jika pembekal telah pulih

  4.**Dasar & Pengecam Terkunci**— Menunjukkan status pemutus litar dan pengecam terkunci dengan keupayaan buka kunci paksa.

  5.**Pengesanan Auto Had Kadar**— Memantau pengepala `429` dan `Retry-After` untuk mengelak daripada mencapai had kadar penyedia secara proaktif.

**Petua Pro:**Gunakan butang**Reset Semua**untuk mengosongkan semua pemutus litar dan cooldown apabila pembekal pulih daripada gangguan.---

### Database Export / Import

Uruskan sandaran pangkalan data dalam**Papan Pemuka → Tetapan → Sistem & Storan**.

| Tindakan                    | Penerangan                                                                                                                                                |
| --------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- | ------- |
| **Eksport Pangkalan Data**  | Memuat turun pangkalan data SQLite semasa sebagai fail `.sqlite`                                                                                          |
| **Eksport Semua (.tar.gz)** | Memuat turun arkib sandaran penuh termasuk: pangkalan data, tetapan, kombo, sambungan pembekal (tiada bukti kelayakan), metadata kunci API                |
| **Import Pangkalan Data**   | Muat naik fail `.sqlite` untuk menggantikan pangkalan data semasa. Sandaran praimport dibuat secara automatik melainkan `DISABLE_SQLITE_AUTO_BACKUP=true` | ```bash |

# API: Export database

curl -o backup.sqlite http://localhost:20128/api/db-backups/export

# API: Export all (full archive)

curl -o backup.tar.gz http://localhost:20128/api/db-backups/exportAll

# API: Import database

curl -X POST http://localhost:20128/api/db-backups/import \
 -F "file=@backup.sqlite"

````

**Pengesahan Import:**Fail yang diimport disahkan untuk integriti (semakan pragma SQLite), jadual yang diperlukan (`provider_connections`, `provider_nodes`, `combos`, `api_keys`) dan saiz (maks 100MB).

**Kes Penggunaan:**

- Pindahkan OmniRoute antara mesin
- Buat sandaran luaran untuk pemulihan bencana
- Kongsi konfigurasi antara ahli pasukan (eksport semua → kongsi arkib)---

### Settings Dashboard

Halaman tetapan disusun menjadi 6 tab untuk navigasi mudah:

| Tab | Kandungan |
| -------------- | ------------------------------------------------------------------------------------------------- |
|**Umum**| Alat storan sistem, tetapan penampilan, kawalan tema dan keterlihatan bar sisi setiap item |
|**Keselamatan**| Tetapan Log Masuk/Kata Laluan, Kawalan Akses IP, pengesahan API untuk `/model` dan Penyekatan Penyedia |
|**Penghalaan**| Strategi penghalaan global (6 pilihan), alias model kad bebas, rantai sandaran, lalai kombo |
|**Ketahanan**| Profil pembekal, had kadar boleh diedit, status pemutus litar, dasar & pengecam terkunci |
|**AI**| Pemikiran konfigurasi belanjawan, suntikan segera sistem global, statistik cache segera |
|**Lanjutan**| Konfigurasi proksi global (HTTP/SOCKS5) |---

### Costs & Budget Management

Akses melalui**Papan Pemuka → Kos**.

| Tab | Tujuan |
| ----------- | ------------------------------------------------------------------------------------ |
|**Anggaran**| Tetapkan had perbelanjaan setiap kunci API dengan belanjawan harian/mingguan/bulanan dan penjejakan masa nyata |
|**Harga**| Lihat dan edit entri harga model — kos setiap token input/output 1K bagi setiap pembekal |```bash
# API: Set a budget
curl -X POST http://localhost:20128/api/usage/budget \
  -H "Content-Type: application/json" \
  -d '{"keyId": "key-123", "limit": 50.00, "period": "monthly"}'

# API: Get current budget status
curl http://localhost:20128/api/usage/budget
````

**Penjejakan Kos:**Setiap permintaan merekodkan penggunaan token dan mengira kos menggunakan jadual harga. Lihat pecahan dalam**Papan Pemuka → Penggunaan**oleh pembekal, model dan kunci API.---

### Audio Transcription

OmniRoute menyokong transkripsi audio melalui titik akhir yang serasi dengan OpenAI:```bash
POST /v1/audio/transcriptions
Authorization: Bearer your-api-key
Content-Type: multipart/form-data

# Example with curl

curl -X POST http://localhost:20128/v1/audio/transcriptions \
 -H "Authorization: Bearer your-api-key" \
 -F "file=@audio.mp3" \
 -F "model=deepgram/nova-3"

````

Pembekal tersedia:**Deepgram**(`deepgram/`),**AssemblyAI**(`assemblyai/`).

Format audio yang disokong: `mp3`, `wav`, `m4a`, `flac`, `ogg`, `webm`.---

### Combo Balancing Strategies

Konfigurasikan pengimbangan setiap kombo dalam**Papan Pemuka → Kombo → Cipta/Edit → Strategi**.

| Strategi | Penerangan |
| ------------------- | ---------------------------------------------------------------------- |
|**Round-Robin**| Berputar melalui model secara berurutan |
|**Keutamaan**| Sentiasa mencuba model pertama; jatuh semula hanya atas kesilapan |
|**Rawak**| Memilih model rawak daripada kombo untuk setiap permintaan |
|**Ditimbang**| Laluan secara berkadar berdasarkan berat yang ditetapkan bagi setiap model |
|**Kurang Digunakan**| Laluan ke model dengan permintaan terkini yang paling sedikit (menggunakan metrik kombo) |
|**Dioptimumkan Kos**| Laluan ke model yang tersedia paling murah (menggunakan jadual harga) |

Lalai kombo global boleh ditetapkan dalam**Papan Pemuka → Tetapan → Penghalaan → Lalai Kombo**.---

### Health Dashboard

Akses melalui**Papan Pemuka → Kesihatan**. Gambaran keseluruhan kesihatan sistem masa nyata dengan 6 kad:

| Kad | Apa yang Ditunjukkan |
| ---------------------- | -------------------------------------------------------- |
|**Status Sistem**| Masa aktif, versi, penggunaan memori, direktori data |
|**Kesihatan Pembekal**| Keadaan pemutus litar setiap pembekal (Tertutup/Terbuka/Separuh Terbuka) |
|**Had Kadar**| Cooldown had kadar aktif bagi setiap akaun dengan baki masa |
|**Sekat Aktif**| Pembekal disekat buat sementara waktu oleh dasar kunci keluar |
|**Tandatangan Cache**| Statistik cache penyahduplikasian (kunci aktif, kadar pukulan) |
|**Telemetri Latensi**| p50/p95/p99 pengagregatan kependaman bagi setiap pembekal |

**Petua Pro:**Halaman Kesihatan dimuat semula secara automatik setiap 10 saat. Gunakan kad pemutus litar untuk mengenal pasti penyedia yang mengalami masalah.---

## 🖥️ Desktop Application (Electron)

OmniRoute tersedia sebagai aplikasi desktop asli untuk Windows, macOS dan Linux.### Pasang

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

Output → `elektron/dist-elektron/`### Key Features

| Ciri                            | Penerangan                                                        |
| ------------------------------- | ----------------------------------------------------------------- | ------------------------- |
| **Kesediaan Pelayan**           | Pelayan undian sebelum menunjukkan tetingkap (tiada skrin kosong) |
| **System Dulang**               | Minimumkan kepada dulang, tukar port, keluar dari menu dulang     |
| **Pengurusan Pelabuhan**        | Tukar port pelayan daripada dulang (pelayan auto-mula semula)     |
| **Dasar Keselamatan Kandungan** | CSP terhad melalui pengepala sesi                                 |
| **Instance Tunggal**            | Hanya satu contoh apl boleh dijalankan pada satu masa             |
| **Mod Luar Talian**             | Pelayan Bundled Next.js berfungsi tanpa internet                  | ### Environment Variables |

| Pembolehubah          | Lalai   | Penerangan                         |
| --------------------- | ------- | ---------------------------------- |
| `OMNIROUTE_PORT`      | `20128` | Port pelayan                       |
| `OMNIROUTE_MEMORY_MB` | `512`   | Had timbunan Node.js (64–16384 MB) |

📖 Dokumentasi penuh: [`electron/README.md`](../electron/README.md)
