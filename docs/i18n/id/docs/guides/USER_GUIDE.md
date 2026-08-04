# Panduan Pengguna (Bahasa Indonesia)

🌐 **Languages:** 🇺🇸 [English](../../../../docs/USER_GUIDE.md) · 🇸🇦 [ar](../../ar/docs/USER_GUIDE.md) · 🇧🇬 [bg](../../bg/docs/USER_GUIDE.md) · 🇧🇩 [bn](../../bn/docs/USER_GUIDE.md) · 🇨🇿 [cs](../../cs/docs/USER_GUIDE.md) · 🇩🇰 [da](../../da/docs/USER_GUIDE.md) · 🇩🇪 [de](../../de/docs/USER_GUIDE.md) · 🇪🇸 [es](../../es/docs/USER_GUIDE.md) · 🇮🇷 [fa](../../fa/docs/USER_GUIDE.md) · 🇫🇮 [fi](../../fi/docs/USER_GUIDE.md) · 🇫🇷 [fr](../../fr/docs/USER_GUIDE.md) · 🇮🇳 [gu](../../gu/docs/USER_GUIDE.md) · 🇮🇱 [he](../../he/docs/USER_GUIDE.md) · 🇮🇳 [hi](../../hi/docs/USER_GUIDE.md) · 🇭🇺 [hu](../../hu/docs/USER_GUIDE.md) · 🇮🇩 [id](../../id/docs/USER_GUIDE.md) · 🇮🇹 [it](../../it/docs/USER_GUIDE.md) · 🇯🇵 [ja](../../ja/docs/USER_GUIDE.md) · 🇰🇷 [ko](../../ko/docs/USER_GUIDE.md) · 🇮🇳 [mr](../../mr/docs/USER_GUIDE.md) · 🇲🇾 [ms](../../ms/docs/USER_GUIDE.md) · 🇳🇱 [nl](../../nl/docs/USER_GUIDE.md) · 🇳🇴 [no](../../no/docs/USER_GUIDE.md) · 🇵🇭 [phi](../../phi/docs/USER_GUIDE.md) · 🇵🇱 [pl](../../pl/docs/USER_GUIDE.md) · 🇵🇹 [pt](../../pt/docs/USER_GUIDE.md) · 🇧🇷 [pt-BR](../../pt-BR/docs/USER_GUIDE.md) · 🇷🇴 [ro](../../ro/docs/USER_GUIDE.md) · 🇷🇺 [ru](../../ru/docs/USER_GUIDE.md) · 🇸🇰 [sk](../../sk/docs/USER_GUIDE.md) · 🇸🇪 [sv](../../sv/docs/USER_GUIDE.md) · 🇰🇪 [sw](../../sw/docs/USER_GUIDE.md) · 🇮🇳 [ta](../../ta/docs/USER_GUIDE.md) · 🇮🇳 [te](../../te/docs/USER_GUIDE.md) · 🇹🇭 [th](../../th/docs/USER_GUIDE.md) · 🇹🇷 [tr](../../tr/docs/USER_GUIDE.md) · 🇺🇦 [uk-UA](../../uk-UA/docs/USER_GUIDE.md) · 🇵🇰 [ur](../../ur/docs/USER_GUIDE.md) · 🇻🇳 [vi](../../vi/docs/USER_GUIDE.md) · 🇨🇳 [zh-CN](../../zh-CN/docs/USER_GUIDE.md)

---

Panduan lengkap untuk mengonfigurasi penyedia, membuat combo, mengintegrasikan alat CLI, dan menerapkan OmniRoute.

---

## Daftar Isi

- [Harga Sekilas](#-harga-sekilas)
- [Kasus Penggunaan](#-kasus-penggunaan)
- [Pengaturan Penyedia](#-pengaturan-penyedia)
- [Integrasi CLI](#-integrasi-cli)
- [Penerapan](#penerapan)
- [Model yang Tersedia](#-model-yang-tersedia)
- [Fitur Lanjutan](#-fitur-lanjutan)

---

## 💰 Harga Sekilas

| Tingkatan           | Penyedia          | Biaya       | Reset Kuota      | Terbaik Untuk              |
| ------------------- | ----------------- | ----------- | ---------------- | -------------------------- |
| **💳 LANGGANAN**    | Claude Code (Pro) | $20/bln     | 5j + mingguan    | Sudah berlangganan         |
|                     | Codex (Plus/Pro)  | $20-200/bln | 5j + mingguan    | Pengguna OpenAI            |
|                     | GitHub Copilot    | $10-19/bln  | Bulanan          | Pengguna GitHub            |
| **🔑 KUNCI API**    | DeepSeek          | Bayar pakai | Tidak ada        | Penalaran murah            |
|                     | Groq              | Bayar pakai | Tidak ada        | Inferensi sangat cepat     |
|                     | xAI (Grok)        | Bayar pakai | Tidak ada        | Penalaran Grok 4           |
|                     | Mistral           | Bayar pakai | Tidak ada        |Model berbasis EU          |
|                     | Perplexity        | Bayar pakai | Tidak ada        | Dilengkapi pencarian       |
|                     | Together AI       | Bayar pakai | Tidak ada        | Model sumber terbuka          |
|                     | Fireworks AI      | Bayar pakai | Tidak ada        | Gambar FLUX cepat          |
|                     | Cerebras          | Bayar pakai | Tidak ada        | Kecepatan skala wafer      |
|                     | Cohere            | Bayar pakai | Tidak ada        | RAG Command R+             |
|                     | NVIDIA NIM        | Bayar pakai | Tidak ada        | Model enterprise           |
| **💰 MURAH**        | GLM-4.7           | $0.6/1M     | Harian pukul 10  | Cadangan hemat             |
|                     | MiniMax M2.1      | $0.2/1M     | Bergulir 5 jam   | Pilihan termurah           |
|                     | Kimi K2           | $9/bln flat | 10M token/bln    | Biaya yang dapat diprediksi|
| **🆓 GRATIS**       | Qoder             | $0          | Tidak terbatas   | 8 model gratis             |
|                     | Qwen              | $0          | Tidak terbatas   | 3 model gratis             |
|                     | Kiro              | $0          | Tidak terbatas   | Claude gratis              |


---

## 🎯 Kasus Penggunaan

### Kasus 1: "Saya punya langganan Claude Pro"

**Masalah:** Kuota habis tidak terpakai, batas kecepatan saat coding intensif

```
Combo: "maximize-claude"
  1. cc/claude-opus-4-7        (gunakan langganan sepenuhnya)
  2. glm/glm-4.7               (cadangan murah saat kuota habis)
  3. if/kimi-k2-thinking       (fallback darurat gratis)

Biaya bulanan: $20 (langganan) + ~$5 (cadangan) = total $25
vs. $20 + terkena batas = frustrasi
```

### Kasus 2: "Saya ingin biaya nol"

**Masalah:** Tidak mampu berlangganan, butuh AI coding yang andal

```
Combo: "free-forever"
  1. if/kimi-k2-thinking       (unlimited free)
  2. qw/qwen3-coder-plus       (unlimited free)

Biaya bulanan: $0
Kualitas: Model siap produksi
```

### Kasus 3: "Saya butuh coding 24/7, tanpa gangguan"

**Masalah:** Tenggat waktu, tidak boleh ada downtime

```
Combo: "always-on"
  1. cc/claude-opus-4-7        (kualitas terbaik)
  2. cx/gpt-5.2-codex          (langganan kedua)
  3. glm/glm-4.7               (murah, reset harian)
  4. minimax/MiniMax-M2.1      (termurah, reset 5 jam)
  5. if/kimi-k2-thinking       (gratis tanpa batas)

Hasil: 5 lapis fallback = nol downtime
Biaya bulanan: $20-200 (langganan) + $10-20 (cadangan)
```

### Kasus 4: "Saya ingin AI GRATIS di OpenClaw"

**Masalah:** Perlu asisten AI di aplikasi pesan, sepenuhnya gratis

```
Combo: "openclaw-free"
  1. if/glm-4.7                (gratis tanpa batas)
  2. if/minimax-m2.1           (gratis tanpa batas)
  3. if/kimi-k2-thinking       (gratis tanpa batas)

Biaya bulanan: $0
Akses melalui: WhatsApp, Telegram, Slack, Discord, iMessage, Signal...
```

---

## 📖 Pengaturan Penyedia

### 🔐 Penyedia Berlangganan

#### Claude Code (Pro/Max)

```bash
Dashboard → Providers → Connect Claude Code
→ OAuth login → Auto token refresh
→ 5-hour + weekly quota tracking

Models:
  cc/claude-opus-4-7
  cc/claude-sonnet-4-5-20250929
  cc/claude-haiku-4-5-20251001
```

**Tips Pro:** Gunakan Opus untuk tugas kompleks, Sonnet untuk kecepatan. OmniRoute melacak kuota per model!

#### OpenAI Codex (Plus/Pro)

```bash
Dashboard → Providers → Connect Codex
→ OAuth login (port 1455)
→ 5-hour + weekly reset

Models:
  cx/gpt-5.2-codex
  cx/gpt-5.1-codex-max
```



#### GitHub Copilot

```bash
Dashboard → Providers → Connect GitHub
→ OAuth via GitHub
→ Monthly reset (1st of month)

Models:
  gh/gpt-5
  gh/claude-4.5-sonnet
  gh/gemini-3.1-pro-preview
```

### 💰 Penyedia Murah

#### GLM-4.7 (Reset harian, $0.6/1M)

1. Daftar: [Zhipu AI](https://open.bigmodel.cn/)
2. Dapatkan kunci API dari Coding Plan
3. Dasbor → Tambahkan Kunci API: Penyedia: `glm`, Kunci API: `your-key`

**Gunakan:** `glm/glm-4.7` — **Tips Pro:** Coding Plan menawarkan kuota 3× dengan biaya 1/7! Reset setiap hari pukul 10:00.

#### MiniMax M2.1 (Reset 5 jam, $0.20/1M)

1. Daftar: [MiniMax](https://www.minimax.io/)
2. Dapatkan kunci API → Dasbor → Tambahkan Kunci API

**Gunakan:** `minimax/MiniMax-M2.1` — **Tips Pro:** Pilihan termurah untuk konteks panjang (1M token)!

#### Kimi K2 ($9/bulan flat)

1. Berlangganan: [Moonshot AI](https://platform.moonshot.ai/)
2. Dapatkan kunci API → Dasbor → Tambahkan Kunci API

**Gunakan:** `kimi/kimi-latest` — **Tips Pro:** Tetap $9/bulan untuk 10M token = biaya efektif $0.90/1M!

### 🆓 Penyedia GRATIS

#### Qoder (8 model GRATIS)

```bash
Dashboard → Connect Qoder → OAuth login → Unlimited usage

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

## 🎨 Combo

Anda dapat mengurutkan ulang kartu combo langsung di **Dashboard → Combos** dengan menyeret gagang pada setiap kartu. Urutan disimpan di SQLite dan dipulihkan saat dimuat ulang.

### Contoh 1: Maksimalkan Langganan → Cadangan Murah

```
Dashboard → Combos → Create New

Name: premium-coding
Models:
  1. cc/claude-opus-4-7 (Langganan utama)
  2. glm/glm-4.7 (Cadangan murah, $0.6/1M)
  3. minimax/MiniMax-M2.1 (Fallback termurah, $0.20/1M)

Use in CLI: premium-coding
```

### Contoh 2: Hanya Gratis (Biaya Nol)

```
Name: free-combo
Models:
  1. if/kimi-k2-thinking (unlimited)
  2. qw/qwen3-coder-plus (unlimited)

Cost: $0 selamanya!
```

---

## 🔧 Integrasi CLI

### Cursor IDE

```
Settings → Models → Advanced:
  OpenAI API Base URL: http://localhost:20128/v1
  OpenAI API Key: [dari dasbor omniroute]
  Model: cc/claude-opus-4-7
```

### Claude Code

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

**Atau gunakan Dasbor:** CLI Tools → OpenClaw → Auto-config

### Cline / Continue / RooCode

```
Provider: OpenAI Compatible
Base URL: http://localhost:20128/v1
API Key: [dari dasbor]
Model: cc/claude-opus-4-7
```

---

## Penerapan

### Instalasi npm Global (Direkomendasikan)

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
```

CLI secara otomatis memuat `.env` dari `~/.omniroute/.env` atau `./.env`.

### Menghapus Instalasi

Saat Anda tidak lagi memerlukan OmniRoute, kami menyediakan dua skrip cepat untuk penghapusan bersih:

| Perintah                 | Tindakan                                                                                           |
| ------------------------ | -------------------------------------------------------------------------------------------------- |
| `npm run uninstall`      | Menghapus aplikasi dari sistem tetapi **menyimpan DB dan konfigurasi** di `~/.omniroute`.          |
| `npm run uninstall:full` | Menghapus aplikasi DAN secara permanen **menghapus semua konfigurasi, kunci, dan basis data**. |

> Catatan: Untuk menjalankan perintah ini, navigasikan ke folder proyek OmniRoute (jika Anda telah meng-clone-nya) dan jalankan. Atau, jika diinstal secara global, Anda cukup menjalankan `npm uninstall -g omniroute`.

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

### Penerapan PM2 (Memori Rendah)

Untuk server dengan RAM terbatas, gunakan opsi batas memori:

```bash
# With 512MB limit (default)
pm2 start npm --name omniroute -- start

# Or with custom memory limit
OMNIROUTE_MEMORY_MB=512 pm2 start npm --name omniroute -- start

# Or using ecosystem.config.js
pm2 start ecosystem.config.js
```

Buat `ecosystem.config.js`:

```javascript
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
```

### Docker

```bash
# Build image (default = runner-cli with codex/claude/droid preinstalled)
docker build -t omniroute:cli .

# Portable mode (recommended)
docker run -d --name omniroute -p 20128:20128 --env-file ./.env -v omniroute-data:/app/data omniroute:cli
```

Untuk mode integrasi host dengan binari CLI, lihat bagian Docker di dokumentasi utama.

### Void Linux (xbps-src)

Pengguna Void Linux dapat mengemas dan menginstal OmniRoute secara native menggunakan framework kompilasi silang `xbps-src`. Ini mengotomasi build standalone Node.js beserta binding native `better-sqlite3` yang diperlukan.

<details>
<summary><b>Lihat template xbps-src</b></summary>

```bash
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

do_build() {
	# Determine target CPU arch for node-gyp
	local _gyp_arch
	case "$XBPS_TARGET_MACHINE" in
		aarch64*) _gyp_arch=arm64 ;;
		armv7*|armv6*) _gyp_arch=arm ;;
		i686*) _gyp_arch=ia32 ;;
		*) _gyp_arch=x64 ;;
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
```

</details>

### Variabel Lingkungan

| Variabel                                | Default                              | Deskripsi                                                                                                                  |
| --------------------------------------- | ------------------------------------ | -------------------------------------------------------------------------------------------------------------------------- |
| `JWT_SECRET`                            | `omniroute-default-secret-change-me` | Rahasia penandatanganan JWT (**ubah di produksi**)                                                                         |
| `INITIAL_PASSWORD`                      | `123456`                             | Kata sandi login pertama                                                                                                   |
| `DATA_DIR`                              | `~/.omniroute`                       | Direktori data (db, penggunaan, log)                                                                                       |
| `PORT`                                  | default framework                    | Port layanan (`20128` dalam contoh)                                                                                        |
| `HOSTNAME`                              | default framework                    | Host bind (Docker default ke `0.0.0.0`)                                                                                    |
| `NODE_ENV`                              | default runtime                      | Atur `production` untuk penerapan                                                                                          |
| `BASE_URL`                              | `http://localhost:20128`             | URL berbasis sisi server internal                                                                                             |
| `CLOUD_URL`                             | `https://omniroute.dev`              | Cloud sinkronisasi titik akhir berbasis URL                                                                                      |
| `API_KEY_SECRET`                        | `endpoint-proxy-api-key-secret`      | Rahasia HMAC untuk kunci API yang dihasilkan                                                                               |
| `REQUIRE_API_KEY`                       | `false`                              | Wajibkan kunci API Bearer di `/v1/*`                                                                                       |
| `ALLOW_API_KEY_REVEAL`                  | `false`                              | Izinkan Api Manager menyalin kunci API lengkap sesuai permintaan                                                           |
| `PROVIDER_LIMITS_SYNC_INTERVAL_MINUTES` | `70`                                 | Frekuensi refresh sisi server untuk data Provider Limits yang di-cache; tombol refresh UI tetap memicu sinkronisasi manual |
| `DISABLE_SQLITE_AUTO_BACKUP`            | `false`                              | Nonaktifkan snapshot SQLite otomatis sebelum tulis/impor/pemulihan; backup manual tetap berfungsi                          |
| `APP_LOG_TO_FILE`                       | `true`                               | Mengaktifkan output log aplikasi dan audit ke disk                                                                         |
| `AUTH_COOKIE_SECURE`                    | `false`                              | Paksa cookie auth `Secure` (di belakang reverse proxy HTTPS)                                                               |
| `CLOUDFLARED_BIN`                       | tidak diatur                         | Gunakan binari `cloudflared` yang sudah ada alih-alih unduhan terkelola                                                    |
| `CLOUDFLARED_PROTOCOL`                  | `http2`                              | Transport untuk Quick Tunnel terkelola (`http2`, `quic`, atau `auto`)                                                      |
| `OMNIROUTE_MEMORY_MB`                   | `512`                                | Batas heap Node.js dalam MB                                                                                                |
| `PROMPT_CACHE_MAX_SIZE`                 | `50`                                 | Entri cache prompt maksimum                                                                                                |
| `SEMANTIC_CACHE_MAX_SIZE`               | `100`                                | Entri cache semantik maksimum                                                                                              |

Untuk referensi variabel lingkungan lengkap, lihat [README](../README.md).

---

## 📊 Model yang Tersedia

<details>
<summary><b>Lihat semua model yang tersedia</b></summary>

**Claude Code (`cc/`)** — Pro/Max: `cc/claude-opus-4-7`, `cc/claude-sonnet-4-5-20250929`, `cc/claude-haiku-4-5-20251001`

**Codex (`cx/`)** — Plus/Pro: `cx/gpt-5.2-codex`, `cx/gpt-5.1-codex-max`


**GitHub Copilot (`gh/`)**: `gh/gpt-5`, `gh/claude-4.5-sonnet`

**GLM (`glm/`)** — $0.6/1M: `glm/glm-4.7`

**MiniMax (`minimax/`)** — $0.2/1M: `minimax/MiniMax-M2.1`

**Qoder (`if/`)** — GRATIS: `if/kimi-k2-thinking`, `if/qwen3-coder-plus`, `if/deepseek-r1`

**Qwen (`qw/`)** — GRATIS: `qw/qwen3-coder-plus`, `qw/qwen3-coder-flash`

**Kiro (`kr/`)** — GRATIS: `kr/claude-sonnet-4.5`, `kr/claude-haiku-4.5`

**DeepSeek (`ds/`)**: `ds/deepseek-chat`, `ds/deepseek-reasoner`

**Groq (`groq/`)**: `groq/llama-3.3-70b-versatile`, `groq/llama-4-maverick-17b-128e-instruct`

**xAI (`xai/`)**: `xai/grok-4`, `xai/grok-4-0709-fast-reasoning`, `xai/grok-code-mini`

**Mistral (`mistral/`)**: `mistral/mistral-large-2501`, `mistral/codestral-2501`

**Perplexity (`pplx/`)**: `pplx/sonar-pro`, `pplx/sonar`

**Together AI (`together/`)**: `together/meta-llama/Llama-3.3-70B-Instruct-Turbo`

**Fireworks AI (`fireworks/`)**: `fireworks/accounts/fireworks/models/deepseek-v3p1`

**Cerebras (`cerebras/`)**: `cerebras/llama-3.3-70b`

**Cohere (`cohere/`)**: `cohere/command-r-plus-08-2024`

**NVIDIA NIM (`nvidia/`)**: `nvidia/nvidia/llama-3.3-70b-instruct`

</details>

---

## 🧩 Fitur Lanjutan

### Model Kustom

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

Catatan:

- Penyedia yang kompatibel dengan OpenRouter dan OpenAI/Anthropic dikelola hanya melalui **Available Models**. Penambahan manual, impor, dan auto-sync semuanya masuk ke daftar model yang sama, sehingga tidak ada bagian Custom Models terpisah untuk penyedia tersebut.
- Bagian **Custom Models** ditujukan untuk penyedia yang tidak mengekspos impor model yang terkelola.

### Rute Penyedia Khusus

Arahkan permintaan langsung ke penyedia tertentu dengan validasi model:

```bash
POST http://localhost:20128/v1/providers/openai/chat/completions
POST http://localhost:20128/v1/providers/openai/embeddings
POST http://localhost:20128/v1/providers/fireworks/images/generations
```

Awalan penyedia ditambahkan otomatis jika tidak ada. Model yang tidak cocok mengembalikan `400`.

### Konfigurasi Proxy Jaringan

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

**Urutan Prioritas:** Spesifik-kunci → Spesifik-combo → Spesifik-penyedia → Global → Lingkungan.

### API Katalog Model

```bash
curl http://localhost:20128/api/models/catalog
```

Mengembalikan model yang dikelompokkan berdasarkan penyedia dengan tipe (`chat`, `embedding`, `image`).

### Sinkronisasi Cloud

- Sinkronkan penyedia, combo, dan pengaturan di semua perangkat
- Sinkronisasi latar belakang otomatis dengan timeout + gagal cepat
- Gunakan `BASE_URL`/`CLOUD_URL` sisi server di produksi

### Cloudflare Quick Tunnel

- Tersedia di **Dashboard → Endpoints** untuk penerapan Docker dan self-hosted lainnya
- Membuat URL `https://*.trycloudflare.com` sementara yang diteruskan ke endpoint `/v1` Anda yang kompatibel dengan OpenAI
- Aktifkan pertama kali untuk menginstal `cloudflared` hanya saat diperlukan; restart berikutnya menggunakan kembali binari terkelola yang sama
- Quick Tunnel tidak dipulihkan otomatis setelah OmniRoute atau container di-restart; aktifkan kembali dari dasbor bila diperlukan
- URL tunnel bersifat sementara dan berubah setiap kali Anda menghentikan/memulai tunnel
- Managed Quick Tunnel secara default menggunakan transport HTTP/2 untuk menghindari peringatan buffer UDP QUIC yang mengganggu di container terbatas
- Atur `CLOUDFLARED_PROTOCOL=quic` atau `auto` jika ingin mengubah pilihan transport terkelola
- Atur `CLOUDFLARED_BIN` jika ingin menggunakan binari `cloudflared` yang sudah terinstal alih-alih unduhan terkelola

### Kecerdasan LLM Gateway (Fase 9)

- **Cache Semantik** — Otomatis menyimpan respons non-streaming, temperature=0 (lewati dengan `X-OmniRoute-No-Cache: true`)
- **Idempotensitas Permintaan** — Mendeduplikasi permintaan dalam 5 detik melalui header `Idempotency-Key` atau `X-Request-Id`
- **Pelacakan Progres** — Event SSE `event: progress` yang bisa diaktifkan melalui header `X-OmniRoute-Progress: true`

---

### Translator Playground

Akses melalui **Dashboard → Translator**. Debug dan visualisasikan bagaimana OmniRoute menerjemahkan permintaan API antar penyedia.

| Mode             | Tujuan                                                                                           |
| ---------------- | ------------------------------------------------------------------------------------------------ |
| **Playground**   | Pilih format sumber/target, tempel permintaan, dan lihat hasil terjemahan secara instan          |
| **Chat Tester**  | Kirim pesan chat langsung melalui proxy dan periksa siklus permintaan/respons lengkap            |
| **Test Bench**   | Jalankan pengujian batch di berbagai kombinasi format untuk memverifikasi kebenaran terjemahan   |
| **Live Monitor** | Amati terjemahan real-time saat permintaan mengalir melalui proxy                               |

**Kasus penggunaan:**

- Debug mengapa kombinasi klien/penyedia tertentu gagal
- Verifikasi bahwa tag thinking, pemanggilan tool, dan system prompt diterjemahkan dengan benar
- Bandingkan perbedaan format antara OpenAI, Claude, Gemini, dan format Responses API

---

### Strategi Routing

Konfigurasikan melalui **Dasbor → Pengaturan → Perutean**.

| Strategy                       | Description                                                                                      |
| ------------------------------ | ------------------------------------------------------------------------------------------------ |
| **Fill First**                 | Menggunakan akun dalam urutan prioritas — akun utama menangani semua permintaan hingga tidak tersedia         |
| **Round Robin**                | Menggilir semua akun dengan batas melekat yang dapat dikonfigurasi (default: 3 panggilan per akun)      |
| **P2C (Power of Two Choices)** | Pilih 2 akun acak dan rute ke akun yang lebih sehat — menyeimbangkan beban dengan kesadaran akan kesehatan |
| **Random**                     | Memilih akun secara acak untuk setiap permintaan menggunakan pengacakan Fisher-Yates                          |
| **Least Used**                 | Merutekan ke akun dengan stempel waktu `lastUsedAt` terlama, mendistribusikan lalu lintas secara merata        |
| **Cost Optimized**             | Merutekan ke akun dengan nilai prioritas terendah, mengoptimalkan penyedia berbiaya terendah       |

#### Header Sesi Lengket Eksternal

Untuk afinitas sesi eksternal (misalnya, agen Claude Code/Codex di belakang proxy terbalik), kirim:

```http
X-Session-Id: your-session-key
```

OmniRoute juga menerima `x_session_id` dan mengembalikan kunci sesi efektif di `X-OmniRoute-Session-Id`.

Jika Anda menggunakan Nginx dan mengirim header berbentuk garis bawah, aktifkan:

```nginx
underscores_in_headers on;
```

#### Model Alias Wildcard

Buat pola wildcard untuk memetakan ulang nama model:

```
Pattern: claude-sonnet-*     →  Target: cc/claude-sonnet-4-5-20250929
Pattern: gpt-*               →  Target: gh/gpt-5.1-codex
```

Wildcard mendukung `*` (karakter apa saja) dan `?` (karakter tunggal).

#### Fallback Chains

Tentukan rantai fallback global yang berlaku di semua permintaan:

```
Chain: production-fallback
  1. cc/claude-opus-4-7
  2. gh/gpt-5.1-codex
  3. glm/glm-4.7
```

---

### Ketahanan & Pemutus Sirkuit

Konfigurasikan melalui **Dasbor → Pengaturan → Ketahanan**.

OmniRoute mengimplementasikan ketahanan tingkat penyedia dengan lima komponen:

1. **Antrian & Kecepatan Permintaan** — Pembentukan permintaan tingkat sistem:
   - **Permintaan Per Menit (RPM)** — Permintaan maksimum per menit per akun
   - **Waktu Minimum Antar Permintaan** — Kesenjangan minimum dalam milidetik antar permintaan
   - **Permintaan Bersamaan Maksimum** — Permintaan simultan maksimum per akun

2. **Cooldown Koneksi** — Konfigurasi tipe per autentikasi untuk satu koneksi setelah kegagalan yang dapat dicoba lagi:
   - **Cooldown Dasar** — Jendela cooldown default untuk kegagalan upstream yang dapat dicoba ulang
   - **Gunakan Petunjuk Coba Ulang Hulu** — Ikuti `Retry-After` resmi atau petunjuk setel ulang bila diberikan
   - **Langkah Backoff Maks** — Tingkat backoff eksponensial maksimum untuk kegagalan berulang

3. **Pemutus Sirkuit Penyedia** — Melacak kegagalan penyedia ujung ke ujung dan secara otomatis membuka pemutus ketika ambang batas yang dikonfigurasi tercapai:
   - **Ambang Kegagalan** — Kegagalan penyedia berturut-turut sebelum membuka pemutus
   - **Reset Timeout** — Jangka waktu sebelum penyedia diuji lagi
   - **TUTUP** (Sehat) — Permintaan mengalir normal
   - **BUKA** — Penyedia diblokir sementara setelah kegagalan berulang kali
   - **HALF_OPEN** — Menguji apakah penyedia telah pulih

   Batas kecepatan `429` cakupan koneksi tetap dalam **Cooldown Koneksi** dan tidak diperhitungkan dalam pemutus penyedia.

   Status waktu proses pemutus penyedia hanya ditampilkan di **Dasbor → Kesehatan**.

4. **Tunggu Cooldown** — Jika setiap kandidat koneksi sudah cooldown, OmniRoute dapat menunggu cooldown paling awal dan mencoba kembali permintaan klien yang sama secara otomatis.

5. **Deteksi Otomatis Batas Kecepatan** — Saat penyedia upstream mengembalikan jendela tunggu eksplisit, petunjuk tersebut akan menggantikan jeda pakai koneksi lokal saat pengaturan diaktifkan.

**Kiat Pro:** Gunakan laman **Kesehatan** untuk memeriksa dan menyetel ulang pemutus penyedia langsung setelah pemadaman. Halaman Ketahanan hanya mengubah konfigurasi.

---

### Ekspor/Impor Basis Data

Kelola cadangan basis data di **Dasbor → Pengaturan → Sistem & Penyimpanan**.

| Action                   | Description                                                                                                                                    |
| ------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| **Export Database**      | Mengunduh database SQLite saat ini sebagai file `.sqlite`                                                                                      |
| **Ekspor Semua (.tar.gz)** | Mengunduh arsip cadangan lengkap termasuk: basis data, pengaturan, kombo, koneksi penyedia (tanpa kredensial), metadata kunci API                 |
| **Import Database**      | Unggah file `.sqlite` untuk menggantikan database saat ini. Cadangan pra-impor dibuat secara otomatis kecuali `DISABLE_SQLITE_AUTO_BACKUP=true` |

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

**Use Cases:**

- Migrasi OmniRoute antar mesin
- Buat cadangan eksternal untuk pemulihan bencana
- Bagikan konfigurasi antar anggota tim (ekspor semua → bagikan arsip)

---

### Dashboard Pengaturan

Halaman pengaturan disusun menjadi 6 tab untuk memudahkan navigasi:

| Tab            | Contents                                                                                     |
| -------------- | -------------------------------------------------------------------------------------------- |
| **General**    | System storage tools, appearance settings, theme controls, and per-item sidebar visibility   |
| **Security**   |Pengaturan Login/Kata Sandi, Kontrol Akses IP, autentikasi API untuk `/models`, dan Pemblokiran Penyedia    |
| **Routing**    | Global routing strategy (6 options), wildcard model aliases, fallback chains, combo defaults |
| **Resilience** | Antrean permintaan, waktu tunggu koneksi, konfigurasi pemutus penyedia, dan perilaku menunggu waktu tunggu  |
| **AI**         | Thinking budget configuration, global system prompt injection, prompt cache stats            |
| **Advanced**   | Konfigurasi proksi global (HTTP/SOCKS5)                                                     |

---

### Biaya & Manajemen Anggaran

Akses melalui **Dasbor → Biaya**.

| Tab         | Purpose                                                                                  |
| ----------- | ---------------------------------------------------------------------------------------- |
| **Budget**  | Tetapkan batas pengeluaran per kunci API dengan anggaran harian/mingguan/bulanan dan pelacakan waktu nyata |
| **Pricing** | Lihat dan edit entri harga model — biaya per 1K token input/output per penyedia       |

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

| Strategy           | Description                                                              |
| ------------------ | ------------------------------------------------------------------------ |
| **Round-Robin**    | Berputar melalui model secara berurutan                                      |
| **Priority**       | Selalu mencoba model pertama; jatuh kembali hanya karena kesalahan                   |
| **Random**         | Memilih model acak dari kombo untuk setiap permintaan                     |
| **Weighted**       | Rute secara proporsional berdasarkan bobot yang ditetapkan per model                |
| **Least-Used**     | Merutekan ke model dengan permintaan terkini paling sedikit (menggunakan metrik kombo) |
| **Cost-Optimized** | Rute ke model termurah yang tersedia (menggunakan tabel harga)              |

Default kombo global dapat diatur di **Dasbor → Pengaturan → Perutean → Default Kombo**.

---

### Dashboard Kesehatan

Akses melalui **Dasbor → Kesehatan**. Ikhtisar kesehatan sistem real-time dengan 6 kartu:

| Card                  | Apa yang Ditunjukkannya                                               |
| --------------------- | ----------------------------------------------------------- |
| **System Status**     | Uptime, version, memory usage, data directory               |
| **Provider Health**   | Status runtime pemutus sirkuit penyedia global               |
| **Rate Limits**       | Cooldown koneksi aktif per akun dengan sisa waktu |
| **Active Lockouts**   | Penguncian cakupan model aktif dan pengecualian sementara       |
| **Signature Cache**   | Statistik cache deduplikasi (kunci aktif, tingkat hit)           |
| **Latency Telemetry** | agregasi latensi p50/p95/p99 per penyedia                |

**Tips Pro:** Halaman Kesehatan disegarkan secara otomatis setiap 10 detik. Gunakan kartu pemutus sirkuit untuk mengidentifikasi penyedia mana yang mengalami masalah.

---

## 🖥️ Aplikasi Desktop (Elektron)

OmniRoute tersedia sebagai aplikasi desktop asli untuk Windows, macOS, dan Linux.

### Instal

```bash
# From the electron directory:
cd electron
npm install

# Development mode (connect to running Next.js dev server):
npm run dev

# Production mode (uses standalone build):
npm start
```

### Membuat Installer

```bash
cd electron
npm run build          # Current platform
npm run build:win      # Windows (.exe NSIS)
npm run build:mac      # macOS (.dmg universal)
npm run build:linux    # Linux (.AppImage)
```

Output → `electron/dist-electron/`

### Fitur Utama

| Feature                     | Description                                          |
| --------------------------- | ---------------------------------------------------- |
| **Server Readiness**        |Server jajak pendapat sebelum menampilkan jendela (tidak ada layar kosong) |
| **System Tray**             | Minimize to tray, change port, quit from tray menu   |
| **Port Management**         | Ubah port server dari baki (server restart otomatis)  |
| **Kebijakan Keamanan Konten** | CSP terbatas melalui header sesi                  |
| **Single Instance**         | Hanya satu instance aplikasi yang dapat berjalan dalam satu waktu              |
| **Offline Mode**            | Server Next.js yang dibundel berfungsi tanpa internet|

### Variabel Lingkungan

| Variable              | Default | Description                      |
| --------------------- | ------- | -------------------------------- |
| `OMNIROUTE_PORT`      | `20128` | Server port                      |
| `OMNIROUTE_MEMORY_MB` | `512`   | Node.js heap limit (64–16384 MB) |

📖 Full documentation: [`electron/README.md`](../electron/README.md)
