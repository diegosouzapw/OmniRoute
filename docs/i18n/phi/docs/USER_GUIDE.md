# User Guide (Filipino)

🌐 **Languages:** 🇺🇸 [English](../../../../docs/USER_GUIDE.md) · 🇪🇸 [es](../../es/docs/USER_GUIDE.md) · 🇫🇷 [fr](../../fr/docs/USER_GUIDE.md) · 🇩🇪 [de](../../de/docs/USER_GUIDE.md) · 🇮🇹 [it](../../it/docs/USER_GUIDE.md) · 🇷🇺 [ru](../../ru/docs/USER_GUIDE.md) · 🇨🇳 [zh-CN](../../zh-CN/docs/USER_GUIDE.md) · 🇯🇵 [ja](../../ja/docs/USER_GUIDE.md) · 🇰🇷 [ko](../../ko/docs/USER_GUIDE.md) · 🇸🇦 [ar](../../ar/docs/USER_GUIDE.md) · 🇮🇳 [hi](../../hi/docs/USER_GUIDE.md) · 🇮🇳 [in](../../in/docs/USER_GUIDE.md) · 🇹🇭 [th](../../th/docs/USER_GUIDE.md) · 🇻🇳 [vi](../../vi/docs/USER_GUIDE.md) · 🇮🇩 [id](../../id/docs/USER_GUIDE.md) · 🇲🇾 [ms](../../ms/docs/USER_GUIDE.md) · 🇳🇱 [nl](../../nl/docs/USER_GUIDE.md) · 🇵🇱 [pl](../../pl/docs/USER_GUIDE.md) · 🇸🇪 [sv](../../sv/docs/USER_GUIDE.md) · 🇳🇴 [no](../../no/docs/USER_GUIDE.md) · 🇩🇰 [da](../../da/docs/USER_GUIDE.md) · 🇫🇮 [fi](../../fi/docs/USER_GUIDE.md) · 🇵🇹 [pt](../../pt/docs/USER_GUIDE.md) · 🇷🇴 [ro](../../ro/docs/USER_GUIDE.md) · 🇭🇺 [hu](../../hu/docs/USER_GUIDE.md) · 🇧🇬 [bg](../../bg/docs/USER_GUIDE.md) · 🇸🇰 [sk](../../sk/docs/USER_GUIDE.md) · 🇺🇦 [uk-UA](../../uk-UA/docs/USER_GUIDE.md) · 🇮🇱 [he](../../he/docs/USER_GUIDE.md) · 🇵🇭 [phi](../../phi/docs/USER_GUIDE.md) · 🇧🇷 [pt-BR](../../pt-BR/docs/USER_GUIDE.md) · 🇨🇿 [cs](../../cs/docs/USER_GUIDE.md) · 🇹🇷 [tr](../../tr/docs/USER_GUIDE.md)

---

Kumpletong gabay para sa pag-configure ng mga provider, paggawa ng mga combo, pagsasama ng mga tool ng CLI, at pag-deploy ng OmniRoute.---

## Table of Contents

- [Pagpepresyo sa isang Sulyap](#-pricing-sa-isang-sulyap)
- [Use Cases](#-use-cases)
- [Provider Setup](#-provider-setup)
- [CLI Integration](#-cli-integration)
- [Deployment](#-deployment)
- [Available Models](#-available-models)
- [Mga Advanced na Feature](#-advanced-features)---

## 💰 Pricing at a Glance

| Tier                | Provider          | Gastos                     | I-reset ang Quota    | Pinakamahusay Para sa          |
| ------------------- | ----------------- | -------------------------- | -------------------- | ------------------------------ |
| **💳 SUBSCRIPTION** | Claude Code (Pro) | $20/buwan                  | 5h + lingguhan       | Naka-subscribe na              |
|                     | Codex (Plus/Pro)  | $20-200/buwan              | 5h + lingguhan       | Mga user ng OpenAI             |
|                     | Gemini CLI        | **LIBRE**                  | 180K/buwan + 1K/araw | Lahat!                         |
|                     | GitHub Copilot    | $10-19/buwan               | Buwanang             | Mga user ng GitHub             |
| **🔑 API KEY**      | DeepSeek          | Magbayad sa bawat paggamit | Wala                 | Murang pangangatwiran          |
|                     | Groq              | Magbayad sa bawat paggamit | Wala                 | Napakabilis na hinuha          |
|                     | xAI (Grok)        | Magbayad sa bawat paggamit | Wala                 | Grok 4 na pangangatwiran       |
|                     | Mistral           | Magbayad sa bawat paggamit | Wala                 | Mga modelong naka-host sa EU   |
|                     | Pagkagulo         | Magbayad sa bawat paggamit | Wala                 | Search-augmented               |
|                     | Magkasama AI      | Magbayad sa bawat paggamit | Wala                 | Open-source na mga modelo      |
|                     | Fireworks AI      | Magbayad sa bawat paggamit | Wala                 | Mabilis na FLUX na mga larawan |
|                     | Cerebras          | Magbayad sa bawat paggamit | Wala                 | Wafer-scale na bilis           |
|                     | Cohere            | Magbayad sa bawat paggamit | Wala                 | Command R+ RAG                 |
|                     | NVIDIA NIM        | Magbayad sa bawat paggamit | Wala                 | Mga modelo ng enterprise       |
| **💰 MURA**         | GLM-4.7           | $0.6/1M                    | Araw-araw 10AM       | Backup ng badyet               |
|                     | MiniMax M2.1      | $0.2/1M                    | 5 oras na rolling    | Pinaka murang opsyon           |
|                     | Kimi K2           | $9/buwan flat              | 10M token/buwan      | Nahuhulaang gastos             |
| **🆓 LIBRE**        | Qoder             | $0                         | Walang limitasyong   | 8 mga modelong libre           |
|                     | Qwen              | $0                         | Walang limitasyong   | 3 mga modelong libre           |
|                     | Kiro              | $0                         | Walang limitasyong   | Claude libre                   |

**💡 Pro Tip:**Magsimula sa Gemini CLI (180K libre/buwan) + Qoder (walang limitasyong libre) combo = $0 na halaga!---

## 🎯 Use Cases

### Case 1: "I have Claude Pro subscription"

**Problema:**Nag-e-expire ang quota nang hindi nagamit, mga limitasyon sa rate sa panahon ng mabigat na coding```
Combo: "maximize-claude"

1. cc/claude-opus-4-6 (use subscription fully)
2. glm/glm-4.7 (cheap backup when quota out)
3. if/kimi-k2-thinking (free emergency fallback)

Monthly cost: $20 (subscription) + ~$5 (backup) = $25 total
vs. $20 + hitting limits = frustration

````

### Case 2: "I want zero cost"

**Problema:**Hindi kayang bayaran ang mga subscription, kailangan ng maaasahang AI coding```
Combo: "free-forever"
  1. gc/gemini-3-flash         (180K free/month)
  2. if/kimi-k2-thinking       (unlimited free)
  3. qw/qwen3-coder-plus       (unlimited free)

Monthly cost: $0
Quality: Production-ready models
````

### Case 3: "I need 24/7 coding, no interruptions"

**Problema:**Mga deadline, hindi kayang bayaran ang downtime```
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

**Problema:**Kailangan ng AI assistant sa mga app sa pagmemensahe, ganap na libre```
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

**Pro Tip:**Gamitin ang Opus para sa mga kumplikadong gawain, Soneto para sa bilis. Sinusubaybayan ng OmniRoute ang quota bawat modelo!#### OpenAI Codex (Plus/Pro)

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

**Pinakamahusay na Halaga:**Malaking libreng tier! Gamitin ito bago ang mga bayad na tier.#### GitHub Copilot

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

1. Mag-sign up: [Zhipu AI](https://open.bigmodel.cn/)
2. Kumuha ng API key mula sa Coding Plan
3. Dashboard → Magdagdag ng API Key: Provider: `glm`, API Key: `your-key`

**Gamitin:**`glm/glm-4.7` —**Pro Tip:**Nag-aalok ang Coding Plan ng 3× na quota sa halagang 1/7! I-reset araw-araw 10:00 AM.#### MiniMax M2.1 (5h reset, $0.20/1M)

1. Mag-sign up: [MiniMax](https://www.minimax.io/)
2. Kunin ang API key → Dashboard → Magdagdag ng API Key

**Gamitin:**`minimax/MiniMax-M2.1` —**Pro Tip:**Pinaka murang opsyon para sa mahabang konteksto (1M token)!#### Kimi K2 ($9/month flat)

1. Mag-subscribe: [Moonshot AI](https://platform.moonshot.ai/)
2. Kunin ang API key → Dashboard → Magdagdag ng API Key

**Gamitin:**`kimi/kimi-latest` —**Pro Tip:**Fixed $9/month para sa 10M token = $0.90/1M epektibong gastos!### 🆓 FREE Providers

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

I-edit ang `~/.claude/config.json`:```json
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

I-edit ang `~/.openclaw/openclaw.json`:```json
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

**O gumamit ng Dashboard:**CLI Tools → OpenClaw → Auto-config### Cline / Continue / RooCode

```

Provider: OpenAI Compatible
Base URL: http://localhost:20128/v1
API Key: [from dashboard]
Model: cc/claude-opus-4-6

````

---

## Pag-deploy

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

Awtomatikong naglo-load ang CLI ng `.env` mula sa `~/.omniroute/.env` o `./.env`.### VPS Deployment

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

Para sa mga server na may limitadong RAM, gamitin ang opsyon sa limitasyon ng memorya:```bash

# With 512MB limit (default)

pm2 start npm --name omniroute -- start

# Or with custom memory limit

OMNIROUTE_MEMORY_MB=512 pm2 start npm --name omniroute -- start

# Or using ecosystem.config.js

pm2 start ecosystem.config.js

````

Lumikha ng `ecosystem.config.js`:```javascript
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

Para sa host-integrated mode na may mga CLI binary, tingnan ang seksyong Docker sa mga pangunahing doc.### Void Linux (xbps-src)

Ang mga gumagamit ng Void Linux ay maaaring mag-package at mag-install ng OmniRoute nang native gamit ang `xbps-src` cross-compilation framework. I-automate nito ang standalone na build ng Node.js kasama ng kinakailangang mga native na binding na `better-sqlite3`.

<mga detalye>
<summary><b>Tingnan ang xbps-src template</b></summary>```bash
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

| Variable | Default | Paglalarawan |
| --------------------------------------- | ------------------------------------ | ------------------------------------------------------------------------------------------------------------------- |
| `JWT_SECRET` | `omniroute-default-secret-change-me` | JWT signing secret (**pagbabago sa produksyon**) |
| `INITIAL_PASSWORD` | `123456` | Unang login password |
| `DATA_DIR` | `~/.omniroute` | Direktoryo ng data (db, paggamit, mga log) |
| `PORT` | default na framework | Port ng serbisyo (`20128` sa mga halimbawa) |
| `HOSTNAME` | default na framework | Bind host (Docker default sa `0.0.0.0`) |
| `NODE_ENV` | default na runtime | Itakda ang `produksyon` para sa pag-deploy |
| `BASE_URL` | `http://localhost:20128` | Panloob na base URL sa gilid ng server |
| `CLOUD_URL` | `https://omniroute.dev` | Cloud sync endpoint base URL |
| `API_KEY_SECRET` | `endpoint-proxy-api-key-secret` | HMAC secret para sa mga nabuong API key |
| `REQUIRE_API_KEY` | `false` | Ipatupad ang Bearer API key sa `/v1/*` |
| `ALLOW_API_KEY_REVEAL` | `false` | Payagan ang Api Manager na kopyahin ang buong API keys on demand |
| `PROVIDER_LIMITS_SYNC_INTERVAL_MINUTES` | `70` | Server-side refresh cadence para sa naka-cache na data ng Mga Limitasyon ng Provider; Ang mga button ng pag-refresh ng UI ay nagti-trigger pa rin ng manu-manong pag-sync |
| `DISABLE_SQLITE_AUTO_BACKUP` | `false` | Huwag paganahin ang mga awtomatikong snapshot ng SQLite bago magsulat/mag-import/mag-restore; gumagana pa rin ang mga manu-manong backup |
| `APP_LOG_TO_FILE`                       | `true`                               | Enables application and audit log output to disk                                                          |
| `AUTH_COOKIE_SECURE` | `false` | Pilitin ang `Secure` auth cookie (sa likod ng HTTPS reverse proxy) |
| `CLOUDFLARED_BIN` | hindi nakatakda | Gumamit ng kasalukuyang binary na `cloudflared` sa halip na pinamamahalaang pag-download |
| `CLOUDFLARED_PROTOCOL` | `http2` | Transport para sa pinamamahalaang Quick Tunnels (`http2`, `quic`, o `auto`) |
| `OMNIROUTE_MEMORY_MB` | `512` | Node.js heap limit sa MB |
| `PROMPT_CACHE_MAX_SIZE` | `50` | Max prompt cache entry |
| `SEMANTIC_CACHE_MAX_SIZE` | `100` | Max semantic cache na mga entry |Para sa buong environment variable reference, tingnan ang [README](../README.md).---

## 📊 Available Models

<mga detalye>
<summary><b>Tingnan ang lahat ng available na modelo</b></summary>

**Claude Code (`cc/`)**— Pro/Max: `cc/claude-opus-4-6`, `cc/claude-sonnet-4-5-20250929`, `cc/claude-haiku-4-5-20251001`

**Codex (`cx/`)**— Plus/Pro: `cx/gpt-5.2-codex`, `cx/gpt-5.1-codex-max`

**Gemini CLI (`gc/`)**— LIBRE: `gc/gemini-3-flash-preview`, `gc/gemini-2.5-pro`

**GitHub Copilot (`gh/`)**: `gh/gpt-5`, `gh/claude-4.5-sonnet`

**GLM (`glm/`)**— $0.6/1M: `glm/glm-4.7`

**MiniMax (`minimax/`)**— $0.2/1M: `minimax/MiniMax-M2.1`

**Qoder (`if/`)**— LIBRE: `if/kimi-k2-thinking`, `if/qwen3-coder-plus`, `if/deepseek-r1`

**Qwen (`qw/`)**— LIBRE: `qw/qwen3-coder-plus`, `qw/qwen3-coder-flash`

**Kiro (`kr/`)**— LIBRE: `kr/claude-sonnet-4.5`, `kr/claude-haiku-4.5`

**DeepSeek (`ds/`)**: `ds/deepseek-chat`, `ds/deepseek-reasoner`

**Groq (`groq/`)**: `groq/llama-3.3-70b-versatile`, `groq/llama-4-maverick-17b-128e-instruct`

**xAI (`xai/`)**: `xai/grok-4`, `xai/grok-4-0709-fast-reasoning`, `xai/grok-code-mini`

**Mistral (`mistral/`)**: `mistral/mistral-large-2501`, `mistral/codestral-2501`

**Perplexity (`pplx/`)**: `pplx/sonar-pro`, `pplx/sonar`

**Together AI (`together/`)**: `together/meta-llama/Llama-3.3-70B-Instruct-Turbo`

**Fireworks AI (`fireworks/`)**: `fireworks/accounts/fireworks/models/deepseek-v3p1`

**Cerebras (`cerebras/`)**: `cerebras/llama-3.3-70b`

**Cohere (`cohere/`)**: `cohere/command-r-plus-08-2024`

**NVIDIA NIM (`nvidia/`)**: `nvidia/nvidia/llama-3.3-70b-instruct`</details>

---

## 🧩 Advanced Features

### Custom Models

Magdagdag ng anumang ID ng modelo sa anumang provider nang hindi naghihintay ng update ng app:```bash
# Via API
curl -X POST http://localhost:20128/api/provider-models \
  -H "Content-Type: application/json" \
  -d '{"provider": "openai", "modelId": "gpt-4.5-preview", "modelName": "GPT-4.5 Preview"}'

# List: curl http://localhost:20128/api/provider-models?provider=openai
# Remove: curl -X DELETE "http://localhost:20128/api/provider-models?provider=openai&model=gpt-4.5-preview"
````

O gamitin ang Dashboard:**Mga Provider → [Provider] → Mga Custom na Modelo**.

Mga Tala:

- Ang OpenRouter at OpenAI/Anthropic-compatible na provider ay pinamamahalaan mula sa**Available Models**lang. Manu-manong pagdaragdag, pag-import, at pag-auto-sync ng lahat ng lupain sa parehong listahan ng available na modelo, kaya walang hiwalay na seksyon ng Mga Custom na Modelo para sa mga provider na iyon.
- Ang seksyong**Custom Models**ay inilaan para sa mga provider na hindi naglalantad ng mga pinamamahalaang pag-import ng available na modelo.### Dedicated Provider Routes

Direktang iruta ang mga kahilingan sa isang partikular na provider na may pagpapatunay ng modelo:```bash
POST http://localhost:20128/v1/providers/openai/chat/completions
POST http://localhost:20128/v1/providers/openai/embeddings
POST http://localhost:20128/v1/providers/fireworks/images/generations

````

Ang prefix ng provider ay awtomatikong idinaragdag kung nawawala. Ang mga hindi tugmang modelo ay nagbabalik ng `400`.### Network Proxy Configuration

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

**Precedence:**Key-specific → Combo-specific → Provider-specific → Global → Environment.### Model Catalog API

```bash
curl http://localhost:20128/api/models/catalog
```

Ibinabalik ang mga modelong nakapangkat ayon sa provider na may mga uri (`chat`, `embedding`, `image`).### Cloud Sync

- I-sync ang mga provider, combo, at mga setting sa mga device
- Awtomatikong pag-sync sa background na may timeout + mabilis na mabibigo
- Mas gusto ang server-side `BASE_URL`/`CLOUD_URL` sa produksyon### Cloudflare Quick Tunnel

- Available sa**Dashboard → Endpoints**para sa Docker at iba pang self-hosted deployment
- Lumilikha ng pansamantalang `https://*.trycloudflare.com` URL na nagpapasa sa iyong kasalukuyang `/v1` na tugma sa OpenAI na endpoint
- Unang paganahin ang pag-install ng `cloudflared` lamang kapag kinakailangan; sa paglaon ay muling mag-re-reuse ang parehong pinamamahalaang binary
- Ang Mga Mabilisang Tunnel ay hindi na-auto-restore pagkatapos ng OmniRoute o pag-restart ng container; muling paganahin ang mga ito mula sa dashboard kung kinakailangan
- Ang mga URL ng tunnel ay panandalian at nagbabago sa tuwing hihinto/simulan mo ang tunnel
- Default ang Managed Quick Tunnels sa HTTP/2 transport para maiwasan ang maingay na QUIC UDP buffer na babala sa mga pinipigilang container
- Itakda ang `CLOUDFLARED_PROTOCOL=quic` o `auto` kung gusto mong i-override ang piniling pinamamahalaang transportasyon
- Itakda ang `CLOUDFLARED_BIN` kung mas gusto mong gumamit ng paunang naka-install na `cloudflared` binary sa halip na ang pinamamahalaang pag-download### LLM Gateway Intelligence (Phase 9)

-**Semantic Cache**— Auto-cache non-streaming, temperature=0 responses (bypass gamit ang `X-OmniRoute-No-Cache: true`) -**Request Idempotency**— Nagde-deduplicate ng mga kahilingan sa loob ng 5s sa pamamagitan ng `Idempotency-Key` o `X-Request-Id` header -**Pagsubaybay sa Pag-unlad**— Mag-opt-in sa SSE na mga kaganapan sa `kaganapan: pag-unlad` sa pamamagitan ng header ng `X-OmniRoute-Progress: true`---

### Translator Playground

Access sa pamamagitan ng**Dashboard → Translator**. I-debug at i-visualize kung paano isinasalin ng OmniRoute ang mga kahilingan sa API sa pagitan ng mga provider.

| Mode             | Layunin                                                                                                           |
| ---------------- | ----------------------------------------------------------------------------------------------------------------- |
| **Laruan**       | Pumili ng pinagmulan/target na mga format, i-paste ang isang kahilingan, at makita agad ang isinaling output      |
| **Chat Tester**  | Magpadala ng mga mensahe sa live chat sa pamamagitan ng proxy at siyasatin ang buong cycle ng kahilingan/pagtugon |
| **Test Bench**   | Magpatakbo ng mga batch test sa maraming kumbinasyon ng format upang i-verify ang kawastuhan ng pagsasalin        |
| **Live Monitor** | Manood ng mga real-time na pagsasalin habang dumadaloy ang mga kahilingan sa pamamagitan ng proxy                 |

**Mga kaso ng paggamit:**

- I-debug kung bakit nabigo ang isang partikular na kumbinasyon ng kliyente/provider
- I-verify na ang mga tag ng pag-iisip, mga tawag sa tool, at mga prompt ng system ay naisalin nang tama
- Ihambing ang mga pagkakaiba sa format sa pagitan ng mga format ng OpenAI, Claude, Gemini, at Responses API---

### Routing Strategies

I-configure sa pamamagitan ng**Dashboard → Mga Setting → Pagruruta**.

| Diskarte                       | Paglalarawan                                                                                                                                             |
| ------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------- |
| **Punan muna**                 | Gumagamit ng mga account sa pagkakasunud-sunod ng priyoridad — pinangangasiwaan ng pangunahing account ang lahat ng kahilingan hanggang sa hindi magamit |
| **Round Robin**                | Umiikot sa lahat ng account na may na-configure na malagkit na limitasyon (default: 3 tawag sa bawat account)                                            |
| **P2C (Power of Two Choices)** | Pumili ng 2 random na account at ruta patungo sa mas malusog — binabalanse ang load nang may kamalayan sa kalusugan                                      |
| **Random**                     | Random na pumipili ng account para sa bawat kahilingan gamit ang Fisher-Yates shuffle                                                                    |
| **Hindi gaanong Nagamit**      | Mga ruta papunta sa account na may pinakamatandang `lastUsedAt` timestamp, na namamahagi ng trapiko nang pantay-pantay                                   |
| **Na-optimize ang Gastos**     | Mga ruta patungo sa account na may pinakamababang halaga ng priyoridad, na nag-o-optimize para sa mga provider na may pinakamababang halaga              | #### External Sticky Session Header |

Para sa panlabas na affinity ng session (halimbawa, mga ahente ng Claude Code/Codex sa likod ng mga reverse proxy), ipadala ang:```http
X-Session-Id: your-session-key

````

Tumatanggap din ang OmniRoute ng `x_session_id` at ibinabalik ang epektibong session key sa `X-OmniRoute-Session-Id`.

Kung gumagamit ka ng Nginx at magpadala ng mga underscore-form na header, paganahin ang:```nginx
underscores_in_headers on;
````

#### Wildcard Model Aliases

Lumikha ng mga pattern ng wildcard para i-remap ang mga pangalan ng modelo:```
Pattern: claude-sonnet-_ → Target: cc/claude-sonnet-4-5-20250929
Pattern: gpt-_ → Target: gh/gpt-5.1-codex

````

Ang mga wildcard ay sumusuporta sa `*` (anumang character) at `?` (solong character).#### Fallback Chains

Tukuyin ang mga pandaigdigang fallback chain na nalalapat sa lahat ng kahilingan:```
Chain: production-fallback
  1. cc/claude-opus-4-6
  2. gh/gpt-5.1-codex
  3. glm/glm-4.7
````

---

### Resilience & Circuit Breakers

I-configure sa pamamagitan ng**Dashboard → Mga Setting → Resilience**.

Ang OmniRoute ay nagpapatupad ng pagiging matatag sa antas ng provider na may apat na bahagi:

1.**Provider Profile**— Configuration ng bawat provider para sa:

- Failure threshold (ilang pagkabigo bago buksan)
- Tagal ng cooldown
- Rate limit detection sensitivity
- Exponential backoff na mga parameter

  2.**Editable Rate Limits**— System-level defaults configurable sa dashboard: -**Requests Per Minute (RPM)**— Mga maximum na kahilingan kada minuto bawat account -**Min Time Between Requests**— Minimum na agwat sa millisecond sa pagitan ng mga kahilingan -**Max Kasabay na Kahilingan**— Pinakamataas na sabay-sabay na kahilingan sa bawat account

- I-click ang**I-edit**upang baguhin, pagkatapos ay**I-save**o**Kanselahin**. Nananatili ang mga halaga sa pamamagitan ng resilience API.

  3.**Circuit Breaker**— Sinusubaybayan ang mga pagkabigo sa bawat provider at awtomatikong bubuksan ang circuit kapag naabot ang isang threshold: -**SARADO**(Healthy) — Normal na dumadaloy ang mga kahilingan -**OPEN**— Pansamantalang naka-block ang provider pagkatapos ng paulit-ulit na pagkabigo -**HALF_OPEN**— Pagsubok kung nakabawi na ang provider

  4.**Mga Patakaran at Mga Naka-lock na Identifier**— Nagpapakita ng status ng circuit breaker at mga naka-lock na identifier na may kakayahan sa force-unlock.

  5.**Awtomatikong Pagtukoy sa Limitasyon ng Rate**— Sinusubaybayan ang mga header ng `429` at `Retry-After` upang aktibong maiwasang maabot ang mga limitasyon sa rate ng provider.

**Pro Tip:**Gamitin ang**I-reset Lahat**na button para i-clear ang lahat ng mga circuit breaker at cooldown kapag gumaling ang isang provider mula sa isang outage.---

### Database Export / Import

Pamahalaan ang mga backup ng database sa**Dashboard → Mga Setting → System at Storage**.

| Aksyon                       | Paglalarawan                                                                                                                                                        |
| ---------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------- |
| **I-export ang Database**    | Dina-download ang kasalukuyang database ng SQLite bilang isang `.sqlite` file                                                                                       |
| **I-export Lahat (.tar.gz)** | Nagda-download ng buong backup na archive kabilang ang: database, mga setting, combo, mga koneksyon sa provider (walang mga kredensyal), metadata ng API key        |
| **Import Database**          | Mag-upload ng `.sqlite` file upang palitan ang kasalukuyang database. Awtomatikong nagagawa ang pre-import na backup maliban kung `DISABLE_SQLITE_AUTO_BACKUP=true` | ```bash |

# API: Export database

curl -o backup.sqlite http://localhost:20128/api/db-backups/export

# API: Export all (full archive)

curl -o backup.tar.gz http://localhost:20128/api/db-backups/exportAll

# API: Import database

curl -X POST http://localhost:20128/api/db-backups/import \
 -F "file=@backup.sqlite"

````

**Import Validation:**Ang na-import na file ay napatunayan para sa integridad (SQLite pragma check), kinakailangang mga talahanayan (`provider_connections`, `provider_nodes`, `combos`, `api_keys`), at laki (max 100MB).

**Mga Kaso ng Paggamit:**

- I-migrate ang OmniRoute sa pagitan ng mga machine
- Lumikha ng mga panlabas na backup para sa pagbawi ng kalamidad
- Magbahagi ng mga pagsasaayos sa pagitan ng mga miyembro ng koponan (i-export lahat → ibahagi ang archive)---

### Settings Dashboard

Ang pahina ng mga setting ay isinaayos sa 6 na tab para sa madaling pag-navigate:

| Tab | Mga Nilalaman |
| -------------- | ------------------------------------------------------------------------------------------------- |
|**Pangkalahatan**| Mga tool sa storage ng system, mga setting ng hitsura, mga kontrol sa tema, at per-item sidebar visibility |
|**Seguridad**| Mga setting ng Login/Password, IP Access Control, API auth para sa `/models`, at Provider Blocking |
|**Pagruruta**| Pandaigdigang diskarte sa pagruruta (6 na opsyon), wildcard model alias, fallback chain, combo default |
|**Katatagan**| Mga profile ng provider, mga limitasyon sa nae-edit na rate, status ng circuit breaker, mga patakaran at mga naka-lock na identifier |
|**AI**| Pag-iisip ng configuration ng badyet, pandaigdigang system prompt injection, prompt cache stats |
|**Advanced**| Global proxy configuration (HTTP/SOCKS5) |---

### Costs & Budget Management

Access sa pamamagitan ng**Dashboard → Mga Gastos**.

| Tab | Layunin |
| ----------- | ------------------------------------------------------------------------------------ |
|**Badyet**| Magtakda ng mga limitasyon sa paggastos sa bawat API key na may pang-araw-araw/lingguhan/buwanang mga badyet at real-time na pagsubaybay |
|**Pagpepresyo**| Tingnan at i-edit ang mga entry sa pagpepresyo ng modelo — cost per 1K input/output token bawat provider |```bash
# API: Set a budget
curl -X POST http://localhost:20128/api/usage/budget \
  -H "Content-Type: application/json" \
  -d '{"keyId": "key-123", "limit": 50.00, "period": "monthly"}'

# API: Get current budget status
curl http://localhost:20128/api/usage/budget
````

**Pagsubaybay sa Gastos:**Ang bawat kahilingan ay nagtatala ng paggamit ng token at kinakalkula ang gastos gamit ang talahanayan ng pagpepresyo. Tingnan ang mga breakdown sa**Dashboard → Paggamit**ayon sa provider, modelo, at API key.---

### Audio Transcription

Sinusuportahan ng OmniRoute ang audio transcription sa pamamagitan ng OpenAI-compatible na endpoint:```bash
POST /v1/audio/transcriptions
Authorization: Bearer your-api-key
Content-Type: multipart/form-data

# Example with curl

curl -X POST http://localhost:20128/v1/audio/transcriptions \
 -H "Authorization: Bearer your-api-key" \
 -F "file=@audio.mp3" \
 -F "model=deepgram/nova-3"

````

Mga available na provider:**Deepgram**(`deepgram/`),**AssemblyAI**(`assemblyai/`).

Mga sinusuportahang format ng audio: `mp3`, `wav`, `m4a`, `flac`, `ogg`, `webm`.---

### Combo Balancing Strategies

I-configure ang per-combo balancing sa**Dashboard → Combos → Create/Edit → Strategy**.

| Diskarte | Paglalarawan |
| ------------------- | ---------------------------------------------------------------------- |
|**Round-Robin**| Umiikot sa mga modelo nang sunud-sunod |
|**Priyoridad**| Palaging sinusubukan ang unang modelo; bumabalik lamang sa error |
|**Random**| Pumipili ng random na modelo mula sa combo para sa bawat kahilingan |
|**Tinimbang**| Mga rutang proporsyonal batay sa mga nakatalagang timbang sa bawat modelo |
|**Hindi gaanong Nagamit**| Mga ruta patungo sa modelo na may kaunting mga kamakailang kahilingan (gumagamit ng combo metrics) |
|**Cost-Optimized**| Mga ruta patungo sa pinakamurang available na modelo (gumagamit ng talahanayan ng pagpepresyo) |

Maaaring itakda ang mga global combo default sa**Dashboard → Settings → Routing → Combo Defaults**.---

### Health Dashboard

Access sa pamamagitan ng**Dashboard → Health**. Real-time na pangkalahatang-ideya ng kalusugan ng system na may 6 na card:

| Card | Ano ang Ipinakikita Nito |
| ---------------------- | -------------------------------------------------------- |
|**System Status**| Uptime, bersyon, paggamit ng memorya, direktoryo ng data |
|**Kalusugan ng Provider**| Status ng circuit breaker ng bawat provider (Sarado/Bukas/Kalahating Bukas) |
|**Mga Limitasyon sa Rate**| Mga cooldown sa limitasyon ng aktibong rate sa bawat account na may natitirang oras |
|**Mga Aktibong Lockout**| Pansamantalang na-block ang mga provider ng patakaran sa lockout |
|**Signature Cache**| Deduplication cache stats (aktibong key, hit rate) |
|**Latency Telemetry**| p50/p95/p99 latency aggregation bawat provider |

**Pro Tip:**Awtomatikong nagre-refresh ang page ng Health bawat 10 segundo. Gamitin ang circuit breaker card upang matukoy kung aling mga provider ang nakakaranas ng mga isyu.---

## 🖥️ Desktop Application (Electron)

Available ang OmniRoute bilang isang katutubong desktop application para sa Windows, macOS, at Linux.### I-install

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

Output → `electron/dist-electron/`### Key Features

| Tampok                                  | Paglalarawan                                                         |
| --------------------------------------- | -------------------------------------------------------------------- | ------------------------- |
| **Kahandaan ng Server**                 | Server ng botohan bago magpakita ng window (walang blangkong screen) |
| **System Tray**                         | I-minimize sa tray, palitan ang port, quit mula sa tray menu         |
| **Pamamahala ng Port**                  | Baguhin ang port ng server mula sa tray (auto-restart ang server)    |
| **Patakaran sa Seguridad ng Nilalaman** | Mahigpit na CSP sa pamamagitan ng mga header ng session              |
| **Sisang Instance**                     | Isang instance ng app lang ang maaaring tumakbo sa isang pagkakataon |
| **Offline Mode**                        | Ang Bundled Next.js server ay gumagana nang walang internet          | ### Environment Variables |

| Variable              | Default | Paglalarawan                     |
| --------------------- | ------- | -------------------------------- |
| `OMNIROUTE_PORT`      | `20128` | Port ng server                   |
| `OMNIROUTE_MEMORY_MB` | `512`   | Node.js heap limit (64–16384 MB) |

📖 Buong dokumentasyon: [`electron/README.md`](../electron/README.md)
