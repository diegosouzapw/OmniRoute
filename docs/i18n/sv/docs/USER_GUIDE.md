# User Guide (Svenska)

🌐 **Languages:** 🇺🇸 [English](../../../../docs/USER_GUIDE.md) · 🇪🇸 [es](../../es/docs/USER_GUIDE.md) · 🇫🇷 [fr](../../fr/docs/USER_GUIDE.md) · 🇩🇪 [de](../../de/docs/USER_GUIDE.md) · 🇮🇹 [it](../../it/docs/USER_GUIDE.md) · 🇷🇺 [ru](../../ru/docs/USER_GUIDE.md) · 🇨🇳 [zh-CN](../../zh-CN/docs/USER_GUIDE.md) · 🇯🇵 [ja](../../ja/docs/USER_GUIDE.md) · 🇰🇷 [ko](../../ko/docs/USER_GUIDE.md) · 🇸🇦 [ar](../../ar/docs/USER_GUIDE.md) · 🇮🇳 [hi](../../hi/docs/USER_GUIDE.md) · 🇮🇳 [in](../../in/docs/USER_GUIDE.md) · 🇹🇭 [th](../../th/docs/USER_GUIDE.md) · 🇻🇳 [vi](../../vi/docs/USER_GUIDE.md) · 🇮🇩 [id](../../id/docs/USER_GUIDE.md) · 🇲🇾 [ms](../../ms/docs/USER_GUIDE.md) · 🇳🇱 [nl](../../nl/docs/USER_GUIDE.md) · 🇵🇱 [pl](../../pl/docs/USER_GUIDE.md) · 🇸🇪 [sv](../../sv/docs/USER_GUIDE.md) · 🇳🇴 [no](../../no/docs/USER_GUIDE.md) · 🇩🇰 [da](../../da/docs/USER_GUIDE.md) · 🇫🇮 [fi](../../fi/docs/USER_GUIDE.md) · 🇵🇹 [pt](../../pt/docs/USER_GUIDE.md) · 🇷🇴 [ro](../../ro/docs/USER_GUIDE.md) · 🇭🇺 [hu](../../hu/docs/USER_GUIDE.md) · 🇧🇬 [bg](../../bg/docs/USER_GUIDE.md) · 🇸🇰 [sk](../../sk/docs/USER_GUIDE.md) · 🇺🇦 [uk-UA](../../uk-UA/docs/USER_GUIDE.md) · 🇮🇱 [he](../../he/docs/USER_GUIDE.md) · 🇵🇭 [phi](../../phi/docs/USER_GUIDE.md) · 🇧🇷 [pt-BR](../../pt-BR/docs/USER_GUIDE.md) · 🇨🇿 [cs](../../cs/docs/USER_GUIDE.md) · 🇹🇷 [tr](../../tr/docs/USER_GUIDE.md)

---

Komplett guide för att konfigurera leverantörer, skapa kombinationer, integrera CLI-verktyg och distribuera OmniRoute.---

## Table of Contents

- [Prissättning i ett ögonkast](#-pricing-at-a-glance)
- [Use Cases](#-use-cases)
- [Provider Setup](#-provider-setup)
- [CLI-integration](#-cli-integration)
- [Deployment](#-distribution)
- [Tillgängliga modeller](#-tillgängliga-modeller)
- [Avancerade funktioner](#-avancerade-funktioner)---

## 💰 Pricing at a Glance

| Nivå                 | Leverantör        | Kostnad               | Kvotåterställning        | Bäst för                   |
| -------------------- | ----------------- | --------------------- | ------------------------ | -------------------------- |
| **💳 PRENUMERATION** | Claude Code (Pro) | 20 USD/månad          | 5h + veckovis            | Har redan prenumererat     |
|                      | Codex (Plus/Pro)  | 20-200 USD/månad      | 5h + veckovis            | OpenAI-användare           |
|                      | Gemini CLI        | **GRATIS**            | 180K/månad + 1K/dag      | Alla!                      |
|                      | GitHub Copilot    | 10-19 USD/månad       | Månatlig                 | GitHub-användare           |
| **🔑 API-NYCKEL**    | DeepSeek          | Betala per användning | Inga                     | Billigt resonemang         |
|                      | Groq              | Betala per användning | Inga                     | Ultrasnabb slutledning     |
|                      | xAI (Grok)        | Betala per användning | Inga                     | Grok 4 resonemang          |
|                      | Mistral           | Betala per användning | Inga                     | EU-värdade modeller        |
|                      | Förvirring        | Betala per användning | Inga                     | Sökförstärkt               |
|                      | Tillsammans AI    | Betala per användning | Inga                     | Modeller med öppen källkod |
|                      | Fireworks AI      | Betala per användning | Inga                     | Fast FLUX bilder           |
|                      | Cerebras          | Betala per användning | Inga                     | Wafer-skala hastighet      |
|                      | Sammanhålla       | Betala per användning | Inga                     | Kommando R+ RAG            |
|                      | NVIDIA NIM        | Betala per användning | Inga                     | Företagsmodeller           |
| **💰 BILLIGT**       | GLM-4.7           | $0,6/1M               | Dagligen 10:00           | Budget backup              |
|                      | MiniMax M2.1      | $0,2/1M               | 5-timmars rullande       | Billigaste alternativet    |
|                      | Kimi K2           | 9 USD/mån lägenhet    | 10 miljoner tokens/månad | Förutsägbar kostnad        |
| **🆓 GRATIS**        | Qoder             | $0                    | Obegränsad               | 8 modeller gratis          |
|                      | Qwen              | $0                    | Obegränsad               | 3 modeller gratis          |
|                      | Kiro              | $0                    | Obegränsad               | Claude gratis              |

**💡 Proffstips:**Börja med Gemini CLI (180K gratis/månad) + Qoder (obegränsat gratis) combo = $0 kostnad!---

## 🎯 Use Cases

### Case 1: "I have Claude Pro subscription"

**Problem:**Kvoten går ut oanvänd, hastighetsgränser under tung kodning```
Combo: "maximize-claude"

1. cc/claude-opus-4-6 (use subscription fully)
2. glm/glm-4.7 (cheap backup when quota out)
3. if/kimi-k2-thinking (free emergency fallback)

Monthly cost: $20 (subscription) + ~$5 (backup) = $25 total
vs. $20 + hitting limits = frustration

````

### Case 2: "I want zero cost"

**Problem:**Har inte råd med prenumerationer, behöver pålitlig AI-kodning```
Combo: "free-forever"
  1. gc/gemini-3-flash         (180K free/month)
  2. if/kimi-k2-thinking       (unlimited free)
  3. qw/qwen3-coder-plus       (unlimited free)

Monthly cost: $0
Quality: Production-ready models
````

### Case 3: "I need 24/7 coding, no interruptions"

**Problem:**Deadlines, har inte råd med driftstopp```
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

**Problem:**Behöver AI-assistent i meddelandeappar, helt gratis```
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

**Proffstips:**Använd Opus för komplexa uppgifter, Sonnet för snabbhet. OmniRoute spårar kvot per modell!#### OpenAI Codex (Plus/Pro)

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

**Bäst värde:**Enorma gratis nivå! Använd detta före betalda nivåer.#### GitHub Copilot

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

1. Registrera dig: [Zhipu AI](https://open.bigmodel.cn/)
2. Hämta API-nyckel från Coding Plan
3. Dashboard → Lägg till API-nyckel: Leverantör: `glm`, API-nyckel: `din nyckel`

**Använd:**`glm/glm-4.7` —**Proffstips:**Coding Plan erbjuder 3× kvot till 1/7 kostnad! Återställ dagligen 10:00.#### MiniMax M2.1 (5h reset, $0.20/1M)

1. Registrera dig: [MiniMax](https://www.minimax.io/)
2. Hämta API-nyckel → Dashboard → Lägg till API-nyckel

**Använd:**`minimax/MiniMax-M2.1` —**Proffstips:**Billigaste alternativet för långa sammanhang (1M tokens)!#### Kimi K2 ($9/month flat)

1. Prenumerera: [Moonshot AI](https://platform.moonshot.ai/)
2. Hämta API-nyckel → Dashboard → Lägg till API-nyckel

**Använd:**`kimi/kimi-senaste` —**Proffstips:**Fast $9/månad för 10 miljoner tokens = $0,90/1 miljon effektiv kostnad!### 🆓 FREE Providers

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

Redigera `~/.claude/config.json`:```json
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

Redigera `~/.openclaw/openclaw.json`:```json
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

**Eller använd Dashboard:**CLI Tools → OpenClaw → Auto-config### Cline / Continue / RooCode

```

Provider: OpenAI Compatible
Base URL: http://localhost:20128/v1
API Key: [from dashboard]
Model: cc/claude-opus-4-6

````

---

## Distribution

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

CLI:n laddar automatiskt `.env` från `~/.omniroute/.env` eller `./.env`.### VPS Deployment

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

För servrar med begränsat RAM, använd alternativet för minnesbegränsning:```bash

# With 512MB limit (default)

pm2 start npm --name omniroute -- start

# Or with custom memory limit

OMNIROUTE_MEMORY_MB=512 pm2 start npm --name omniroute -- start

# Or using ecosystem.config.js

pm2 start ecosystem.config.js

````

Skapa `ecosystem.config.js`:```javascript
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

För värdintegrerat läge med CLI-binärer, se Docker-sektionen i huvuddokumenten.### Void Linux (xbps-src)

Void Linux-användare kan paketera och installera OmniRoute naturligt med hjälp av "xbps-src" korskompileringsramverket. Detta automatiserar Node.js fristående konstruktion tillsammans med de nödvändiga inbyggda bindningarna för "bättre-sqlite3".

<detaljer>
<summary><b>Visa xbps-src-mall</b></summary>```bash
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

| Variabel | Standard | Beskrivning |
| ----------------------------------------------- | ------------------------------------ | ------------------------------------------------------------------------------------------------------------------ |
| `JWT_SECRET` | `omniroute-default-secret-change-me` | JWT-signeringshemlighet (**förändring i produktion**) |
| `INITIAL_PASSWORD` | `123456` | Första inloggningslösenordet |
| `DATA_DIR` | `~/.omniroute` | Datakatalog (db, användning, loggar) |
| `PORT` | ram standard | Serviceport ('20128' i exempel) |
| `VÄRDNAMN` | ram standard | Bind värd (Docker har som standard `0.0.0.0`) |
| `NODE_ENV` | runtime default | Ställ in "produktion" för distribution |
| `BASE_URL` | `http://localhost:20128` | Intern bas-URL på serversidan |
| `CLOUD_URL` | `https://omniroute.dev` | Bas-URL för molnsynkroniseringsslutpunkt |
| `API_KEY_SECRET` | `endpoint-proxy-api-key-secret` | HMAC-hemlighet för genererade API-nycklar |
| `REQUIRE_API_KEY` | `falskt` | Framtvinga Bearer API-nyckel på `/v1/*` |
| `ALLOW_API_KEY_REVEAL` | `falskt` | Tillåt Api Manager att kopiera fullständiga API-nycklar på begäran |
| `PROVIDER_LIMITS_SYNC_INTERVAL_MINUTES` | `70` | Uppdateringskadens på serversidan för cachelagrade Provider Limits-data; UI-uppdateringsknappar utlöser fortfarande manuell synkronisering |
| `DISABLE_SQLITE_AUTO_BACKUP` | `falskt` | Inaktivera automatiska SQLite-ögonblicksbilder före skrivning/import/återställning; manuella säkerhetskopieringar fungerar fortfarande |
| `APP_LOG_TO_FILE`                       | `true`                               | Enables application and audit log output to disk                                                          |
| `AUTH_COOKIE_SECURE` | `falskt` | Tvinga "Säker" auth-cookie (bakom HTTPS omvänd proxy) |
| `CLOUDFLARED_BIN` | avstängd | Använd en befintlig `cloudflared`-binär istället för hanterad nedladdning |
| `CLOUDFLARED_PROTOCOL` | `http2` | Transport för hanterade snabba tunnlar (`http2`, `quic` eller `auto`) |
| `OMNIROUTE_MEMORY_MB` | `512` | Node.js heap-gräns i MB |
| `PROMPT_CACHE_MAX_SIZE` | `50` | Max cacheposter för prompt |
| `SEMANTIC_CACHE_MAX_SIZE` | `100` | Max semantiska cacheposter |För den fullständiga referensen till miljövariabeln, se [README](../README.md).---

## 📊 Available Models

<detaljer>
<summary><b>Visa alla tillgängliga modeller</b></summary>

**Claude Code (`cc/`)**— Pro/Max: `cc/claude-opus-4-6`, `cc/claude-sonnet-4-5-20250929`, `cc/claude-haiku-4-5-20251001`

**Codex (`cx/`)**— Plus/Pro: `cx/gpt-5.2-codex`, `cx/gpt-5.1-codex-max`

**Gemini CLI (`gc/`)**– GRATIS: `gc/gemini-3-flash-preview`, `gc/gemini-2.5-pro`

**GitHub Copilot (`gh/`)**: `gh/gpt-5`, `gh/claude-4.5-sonnet`

**GLM (`glm/`)**– 0,6 USD/1M: `glm/glm-4,7`

**MiniMax (`minimax/`)**– $0,2/1M: `minimax/MiniMax-M2.1`

**Qoder (`if/`)**— GRATIS: `if/kimi-k2-thinking`, `if/qwen3-coder-plus`, `if/deepseek-r1`

**Qwen (`qw/`)**— GRATIS: `qw/qwen3-coder-plus`, `qw/qwen3-coder-flash`

**Kiro (`kr/`)**— GRATIS: `kr/claude-sonnet-4.5`, `kr/claude-haiku-4.5`

**DeepSeek (`ds/`)**: `ds/deepseek-chat`, `ds/deepseek-reasoner`

**Groq (`groq/`)**: `groq/llama-3.3-70b-versatile`, `groq/llama-4-maverick-17b-128e-instruct`

**xAI (`xai/`)**: `xai/grok-4`, `xai/grok-4-0709-fast-reasoning`, `xai/grok-code-mini`

**Mistral (`mistral/`)**: `mistral/mistral-large-2501`, `mistral/codestral-2501`

**Perplexity (`pplx/`)**: `pplx/ekolod-pro`, `pplx/ekolod`

**Together AI (`together/`)**: `together/meta-llama/Llama-3.3-70B-Instruct-Turbo`

**Fireworks AI (`fireworks/`)**: `fireworks/accounts/fireworks/models/deepseek-v3p1`

**Cerebras (`cerebras/`)**: `cerebras/llama-3.3-70b`

**Cohere (`cohere/`)**: `cohere/command-r-plus-08-2024`

**NVIDIA NIM (`nvidia/`)**: `nvidia/nvidia/llama-3.3-70b-instruct`</details>

---

## 🧩 Advanced Features

### Custom Models

Lägg till valfritt modell-ID till valfri leverantör utan att vänta på en appuppdatering:```bash
# Via API
curl -X POST http://localhost:20128/api/provider-models \
  -H "Content-Type: application/json" \
  -d '{"provider": "openai", "modelId": "gpt-4.5-preview", "modelName": "GPT-4.5 Preview"}'

# List: curl http://localhost:20128/api/provider-models?provider=openai
# Remove: curl -X DELETE "http://localhost:20128/api/provider-models?provider=openai&model=gpt-4.5-preview"
````

Eller använd Dashboard:**Leverantörer → [Leverantör] → Anpassade modeller**.

Anmärkningar:

- OpenRouter och OpenAI/Anthropic-kompatibla leverantörer hanteras endast från**Tillgängliga modeller**. Manuell tillägg, import och automatisk synkronisering hamnar i samma lista med tillgängliga modeller, så det finns ingen separat avsnitt för anpassade modeller för dessa leverantörer.
- Avsnittet**Anpassade modeller**är avsett för leverantörer som inte exponerar hanterad import av tillgängliga modeller.### Dedicated Provider Routes

Ruttförfrågningar direkt till en specifik leverantör med modellvalidering:```bash
POST http://localhost:20128/v1/providers/openai/chat/completions
POST http://localhost:20128/v1/providers/openai/embeddings
POST http://localhost:20128/v1/providers/fireworks/images/generations

````

Providerprefixet läggs till automatiskt om det saknas. Omatchade modeller returnerar "400".### Network Proxy Configuration

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

**Tillrang:**Nyckelspecifik → Kombinationsspecifik → Leverantörsspecifik → Global → Miljö.### Model Catalog API

```bash
curl http://localhost:20128/api/models/catalog
```

Returnerar modeller grupperade efter leverantör med typer ('chatt', 'inbäddning', 'bild').### Cloud Sync

- Synkronisera leverantörer, kombinationer och inställningar mellan enheter
- Automatisk bakgrundssynkronisering med timeout + felsnabb
- Föredrar server-side `BASE_URL`/`CLOUD_URL` i produktion### Cloudflare Quick Tunnel

- Tillgängligt i**Dashboard → Endpoints**för Docker och andra driftsättningar med egen värd
- Skapar en tillfällig `https://*.trycloudflare.com`-URL som vidarebefordrar till din nuvarande OpenAI-kompatibla `/v1`-slutpunkt
- Aktivera först installerar `cloudflared` endast när det behövs; senare omstarter återanvänd samma hanterade binära filer
- Snabbtunnlar återställs inte automatiskt efter omstart av OmniRoute eller container; återaktivera dem från instrumentpanelen vid behov
- Tunnel-URL:er är tillfälliga och ändras varje gång du stoppar/startar tunneln
- Managed Quick Tunnels som standard till HTTP/2-transport för att undvika bullriga QUIC UDP-buffertvarningar i begränsade containrar
- Ställ in `CLOUDFLARED_PROTOCOL=quic` eller `auto` om du vill åsidosätta det hanterade transportalternativet
- Ställ in `CLOUDFLARED_BIN` om du föredrar att använda en förinstallerad `cloudflared`-binär istället för den hanterade nedladdningen### LLM Gateway Intelligence (Phase 9)

-**Semantisk cache**— Autocachar icke-strömmande, temperatur=0 svar (förbigå med "X-OmniRoute-No-Cache: true") -**Request Idempotency**— Deduplicerar förfrågningar inom 5s via "Idempotency-Key" eller "X-Request-Id" header -**Progress Tracking**— Opt-in SSE `event: progress`-händelser via `X-OmniRoute-Progress: true` header---

### Translator Playground

Åtkomst via**Dashboard → Översättare**. Felsöka och visualisera hur OmniRoute översätter API-förfrågningar mellan leverantörer.

| Läge             | Syfte                                                                                       |
| ---------------- | ------------------------------------------------------------------------------------------- |
| **Lekplats**     | Välj käll-/målformat, klistra in en begäran och se den översatta utdata direkt              |
| **Chatttestare** | Skicka livechattmeddelanden via proxyn och inspektera hela begäran/svarscykeln              |
| **Testbänk**     | Kör batchtester över flera formatkombinationer för att verifiera översättningens korrekthet |
| **Live Monitor** | Se översättningar i realtid när förfrågningar flödar genom proxyn                           |

**Användningsfall:**

- Felsök varför en specifik kombination av klient/leverantör misslyckas
- Verifiera att tanketaggar, verktygsanrop och systemuppmaningar översätts korrekt
- Jämför formatskillnader mellan OpenAI, Claude, Gemini och Responses API-format---

### Routing Strategies

Konfigurera via**Dashboard → Inställningar → Routing**.

| Strategi                       | Beskrivning                                                                                                    |
| ------------------------------ | -------------------------------------------------------------------------------------------------------------- | ----------------------------------- |
| **Fyll först**                 | Använder konton i prioritetsordning – primärt konto hanterar alla förfrågningar tills det inte är tillgängligt |
| **Round Robin**                | Går igenom alla konton med en konfigurerbar sticky limit (standard: 3 samtal per konto)                        |
| **P2C (Power of Two Choices)** | Väljer 2 slumpmässiga konton och vägar till det friskare — balanserar belastning med medvetenhet om hälsa      |
| **Slumpmässig**                | Väljer slumpmässigt ett konto för varje begäran med Fisher-Yates shuffle                                       |
| **Minst använda**              | Rutter till kontot med den äldsta "lastUsedAt"-tidsstämpeln, fördelar trafiken jämnt                           |
| **Kostnadsoptimerad**          | Rutter till kontot med lägst prioritetsvärde, optimerar för lägsta kostnadsleverantörer                        | #### External Sticky Session Header |

För extern sessionsaffinitet (till exempel Claude Code/Codex-agenter bakom omvända proxyservrar), skicka:```http
X-Session-Id: your-session-key

````

OmniRoute accepterar också `x_session_id` och returnerar den effektiva sessionsnyckeln i `X-OmniRoute-Session-Id`.

Om du använder Nginx och skickar understreck-formrubriker, aktivera:```nginx
underscores_in_headers on;
````

#### Wildcard Model Aliases

Skapa jokerteckenmönster för att mappa om modellnamn:```
Pattern: claude-sonnet-_ → Target: cc/claude-sonnet-4-5-20250929
Pattern: gpt-_ → Target: gh/gpt-5.1-codex

````

Jokertecken stöder `*` (alla tecken) och `?` (enkel tecken).#### Fallback Chains

Definiera globala reservkedjor som gäller för alla förfrågningar:```
Chain: production-fallback
  1. cc/claude-opus-4-6
  2. gh/gpt-5.1-codex
  3. glm/glm-4.7
````

---

### Resilience & Circuit Breakers

Konfigurera via**Dashboard → Inställningar → Resilience**.

OmniRoute implementerar motståndskraft på leverantörsnivå med fyra komponenter:

1.**Provider Profiles**— Konfiguration per leverantör för:

- Feltröskel (hur många fel före öppning)
- Nedkylningstid
- Känslighet för detektering av hastighetsgräns
- Exponentiell backoff-parametrar

  2.**Redigerbara hastighetsgränser**— Standardinställningar på systemnivå som kan konfigureras i instrumentpanelen: -**Requests Per Minute (RPM)**— Maximalt antal förfrågningar per minut och konto -**Minsta tid mellan förfrågningar**— Minsta mellanrum i millisekunder mellan förfrågningar -**Max samtidiga förfrågningar**— Maximalt antal samtidiga förfrågningar per konto

- Klicka på**Redigera**för att ändra och sedan på**Spara**eller**Avbryt**. Värden kvarstår via resilience API.

  3.**Circuit Breaker**— Spårar fel per leverantör och öppnar automatiskt kretsen när ett tröskelvärde nås: -**STÄNGD**(frisk) — Begäran flyter normalt -**ÖPPEN**— Leverantören är tillfälligt blockerad efter upprepade fel -**HALF_OPEN**— Testar om leverantören har återhämtat sig

  4.**Policy & Locked Identifiers**— Visar strömbrytarens status och låsta identifierare med tvångsupplåsning.

  5.**Rate Limit Auto-Detection**— Övervakar rubrikerna "429" och "Retry-After" för att proaktivt undvika att nå leverantörshastighetsgränser.

**Proffstips:**Använd knappen**Återställ alla**för att rensa alla strömbrytare och nedkylningar när en leverantör återhämtar sig efter ett avbrott.---

### Database Export / Import

Hantera säkerhetskopiering av databas i**Dashboard → Inställningar → System och lagring**.

| Åtgärd                       | Beskrivning                                                                                                                                                          |
| ---------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------- |
| **Exportera databas**        | Laddar ned den aktuella SQLite-databasen som en `.sqlite`-fil                                                                                                        |
| **Exportera alla (.tar.gz)** | Laddar ner ett fullständigt säkerhetskopieringsarkiv inklusive: databas, inställningar, kombinationer, leverantörsanslutningar (inga referenser), API-nyckelmetadata |
| **Importera databas**        | Ladda upp en `.sqlite`-fil för att ersätta den aktuella databasen. En säkerhetskopia för förimport skapas automatiskt om inte `DISABLE_SQLITE_AUTO_BACKUP=true`      | ```bash |

# API: Export database

curl -o backup.sqlite http://localhost:20128/api/db-backups/export

# API: Export all (full archive)

curl -o backup.tar.gz http://localhost:20128/api/db-backups/exportAll

# API: Import database

curl -X POST http://localhost:20128/api/db-backups/import \
 -F "file=@backup.sqlite"

````

**Importvalidering:**Den importerade filen är validerad för integritet (SQLite pragmakontroll), obligatoriska tabeller (`provider_connections`, `provider_nodes`, `combos`, `api_keys`) och storlek (max 100MB).

**Användningsfall:**

- Migrera OmniRoute mellan maskiner
- Skapa externa säkerhetskopior för katastrofåterställning
- Dela konfigurationer mellan teammedlemmar (exportera alla → dela arkiv)---

### Settings Dashboard

Inställningssidan är organiserad i 6 flikar för enkel navigering:

| Tab | Innehåll |
| -------------- | -------------------------------------------------------------------------------------------------------------------- |
|**Allmänt**| Systemlagringsverktyg, utseendeinställningar, temakontroller och sidofältssynlighet per objekt |
|**Säkerhet**| Inställningar för inloggning/lösenord, IP-åtkomstkontroll, API-auth för `/modeller` och leverantörsblockering |
|**Ruttning**| Global routingstrategi (6 alternativ), jokerteckenmodellalias, reservkedjor, kombinationsstandarder |
|**Resiliens**| Leverantörsprofiler, redigerbara hastighetsgränser, strömbrytarstatus, policyer och låsta identifierare |
|**AI**| Tänkande budgetkonfiguration, global systempromptinjektion, promptcachestatistik |
|**Avancerat**| Global proxykonfiguration (HTTP/SOCKS5) |---

### Costs & Budget Management

Åtkomst via**Dashboard → Kostnader**.

| Tab | Syfte |
| ----------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------
|**Budget**| Ställ in utgiftsgränser per API-nyckel med dagliga/veckovisa/månatliga budgetar och realtidsspårning |
|**Priser**| Visa och redigera modellprisposter — kostnad per 1000 in-/utdata-tokens per leverantör |```bash
# API: Set a budget
curl -X POST http://localhost:20128/api/usage/budget \
  -H "Content-Type: application/json" \
  -d '{"keyId": "key-123", "limit": 50.00, "period": "monthly"}'

# API: Get current budget status
curl http://localhost:20128/api/usage/budget
````

**Kostnadsspårning:**Varje begäran loggar tokenanvändning och beräknar kostnaden med hjälp av pristabellen. Visa uppdelningar i**Dashboard → Användning**efter leverantör, modell och API-nyckel.---

### Audio Transcription

OmniRoute stöder ljudtranskription via den OpenAI-kompatibla slutpunkten:```bash
POST /v1/audio/transcriptions
Authorization: Bearer your-api-key
Content-Type: multipart/form-data

# Example with curl

curl -X POST http://localhost:20128/v1/audio/transcriptions \
 -H "Authorization: Bearer your-api-key" \
 -F "file=@audio.mp3" \
 -F "model=deepgram/nova-3"

````

Tillgängliga leverantörer:**Deepgram**(`deepgram/`),**AssemblyAI**(`assemblyai/`).

Ljudformat som stöds: "mp3", "wav", "m4a", "flac", "ogg", "webm".---

### Combo Balancing Strategies

Konfigurera balansering per kombination i**Dashboard → Kombinationer → Skapa/Redigera → Strategi**.

| Strategi | Beskrivning |
| ------------------ | ---------------------------------------------------------------------------------- |
|**Round-Robin**| Roterar genom modeller sekventiellt |
|**Prioritet**| Försöker alltid den första modellen; faller tillbaka endast på fel |
|**Slumpmässig**| Väljer en slumpmässig modell från kombinationen för varje begäran |
|**Viktad**| Rutter proportionellt baserade på tilldelade vikter per modell |
|**Minst använda**| Rutter till modellen med de minsta senaste förfrågningarna (använder kombinationsmått) |
|**Kostnadsoptimerad**| Rutter till den billigaste tillgängliga modellen (använder pristabell) |

Globala kombinationsstandarder kan ställas in i**Dashboard → Inställningar → Routing → Combo Defaults**.---

### Health Dashboard

Åtkomst via**Dashboard → Hälsa**. Systemhälsoöversikt i realtid med 6 kort:

| Kort | Vad den visar |
| ---------------------- | ------------------------------------------------------------------ |
|**Systemstatus**| Drifttid, version, minnesanvändning, datakatalog |
|**Providers hälsa**| Tillstånd för strömbrytare per leverantör (stängd/öppen/halvöppen) |
|**Taxegränser**| Aktiva nedkylningar per konto med återstående tid |
|**Aktiva låsningar**| Leverantörer tillfälligt blockerade av lockoutpolicyn |
|**Signaturcache**| Dedupliceringscachestatistik (aktiva nycklar, träffhastighet) |
|**Latens telemetri**| p50/p95/p99 latensaggregation per leverantör |

**Proffstips:**Hälsosidan uppdateras automatiskt var tionde sekund. Använd strömbrytarkortet för att identifiera vilka leverantörer som har problem.---

## 🖥️ Desktop Application (Electron)

OmniRoute är tillgänglig som en inbyggd skrivbordsapplikation för Windows, macOS och Linux.### Installera

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

Utgång → `elektron/dist-elektron/`### Key Features

| Funktion                     | Beskrivning                                                   |
| ---------------------------- | ------------------------------------------------------------- | ------------------------- |
| **Serverberedskap**          | Omröstningsserver innan fönster visas (ingen tom skärm)       |
| **Systembricka**             | Minimera till fack, byt port, avsluta från fackmenyn          |
| **Port Management**          | Ändra serverport från facket (startar om servern automatiskt) |
| **Innehållssäkerhetspolicy** | Restriktiv CSP via sessionsrubriker                           |
| **Enstaka instans**          | Endast en appinstans kan köras åt gången                      |
| **Offlineläge**              | Medföljande Next.js-server fungerar utan internet             | ### Environment Variables |

| Variabel              | Standard | Beskrivning                      |
| --------------------- | -------- | -------------------------------- |
| `OMNIROUTE_PORT`      | `20128`  | Serverport                       |
| `OMNIROUTE_MEMORY_MB` | `512`    | Node.js heap-gräns (64–16384 MB) |

📖 Fullständig dokumentation: [`electron/README.md`](../electron/README.md)
