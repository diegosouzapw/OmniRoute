# User Guide (Dansk)

🌐 **Languages:** 🇺🇸 [English](../../../../docs/USER_GUIDE.md) · 🇪🇸 [es](../../es/docs/USER_GUIDE.md) · 🇫🇷 [fr](../../fr/docs/USER_GUIDE.md) · 🇩🇪 [de](../../de/docs/USER_GUIDE.md) · 🇮🇹 [it](../../it/docs/USER_GUIDE.md) · 🇷🇺 [ru](../../ru/docs/USER_GUIDE.md) · 🇨🇳 [zh-CN](../../zh-CN/docs/USER_GUIDE.md) · 🇯🇵 [ja](../../ja/docs/USER_GUIDE.md) · 🇰🇷 [ko](../../ko/docs/USER_GUIDE.md) · 🇸🇦 [ar](../../ar/docs/USER_GUIDE.md) · 🇮🇳 [hi](../../hi/docs/USER_GUIDE.md) · 🇮🇳 [in](../../in/docs/USER_GUIDE.md) · 🇹🇭 [th](../../th/docs/USER_GUIDE.md) · 🇻🇳 [vi](../../vi/docs/USER_GUIDE.md) · 🇮🇩 [id](../../id/docs/USER_GUIDE.md) · 🇲🇾 [ms](../../ms/docs/USER_GUIDE.md) · 🇳🇱 [nl](../../nl/docs/USER_GUIDE.md) · 🇵🇱 [pl](../../pl/docs/USER_GUIDE.md) · 🇸🇪 [sv](../../sv/docs/USER_GUIDE.md) · 🇳🇴 [no](../../no/docs/USER_GUIDE.md) · 🇩🇰 [da](../../da/docs/USER_GUIDE.md) · 🇫🇮 [fi](../../fi/docs/USER_GUIDE.md) · 🇵🇹 [pt](../../pt/docs/USER_GUIDE.md) · 🇷🇴 [ro](../../ro/docs/USER_GUIDE.md) · 🇭🇺 [hu](../../hu/docs/USER_GUIDE.md) · 🇧🇬 [bg](../../bg/docs/USER_GUIDE.md) · 🇸🇰 [sk](../../sk/docs/USER_GUIDE.md) · 🇺🇦 [uk-UA](../../uk-UA/docs/USER_GUIDE.md) · 🇮🇱 [he](../../he/docs/USER_GUIDE.md) · 🇵🇭 [phi](../../phi/docs/USER_GUIDE.md) · 🇧🇷 [pt-BR](../../pt-BR/docs/USER_GUIDE.md) · 🇨🇿 [cs](../../cs/docs/USER_GUIDE.md) · 🇹🇷 [tr](../../tr/docs/USER_GUIDE.md)

---

Komplet guide til konfiguration af udbydere, oprettelse af kombinationer, integration af CLI-værktøjer og implementering af OmniRoute.---

## Table of Contents

- [Prissætning på et øjeblik](#-pricing-at-a-glance)
- [Use Cases](#-use-cases)
- [Provider Setup](#-provider-setup)
- [CLI-integration](#-cli-integration)
- [Implementering](#-implementering)
- [Tilgængelige modeller](#-tilgængelige-modeller)
- [Avancerede funktioner](#-avancerede-funktioner)---

## 💰 Pricing at a Glance

| Tier              | Udbyder           | Omkostninger        | Kvote nulstilling  | Bedst til                  |
| ----------------- | ----------------- | ------------------- | ------------------ | -------------------------- |
| **💳 ABONNEMENT** | Claude Code (Pro) | 20 USD/md.          | 5 timer + ugentlig | Allerede abonneret         |
|                   | Codex (Plus/Pro)  | $20-200/md.         | 5 timer + ugentlig | OpenAI-brugere             |
|                   | Gemini CLI        | **GRATIS**          | 180K/md + 1K/dag   | Alle sammen!               |
|                   | GitHub Copilot    | $10-19/md.          | Månedlig           | GitHub-brugere             |
| **🔑 API NØGLE**  | DeepSeek          | Betal pr. brug      | Ingen              | Billig ræsonnement         |
|                   | Groq              | Betal pr. brug      | Ingen              | Ultrahurtig slutning       |
|                   | xAI (Grok)        | Betal pr. brug      | Ingen              | Grok 4 ræsonnement         |
|                   | Mistral           | Betal pr. brug      | Ingen              | EU-hostede modeller        |
|                   | Forvirring        | Betal pr. brug      | Ingen              | Søgeforøget                |
|                   | Sammen AI         | Betal pr. brug      | Ingen              | Open source-modeller       |
|                   | Fyrværkeri AI     | Betal pr. brug      | Ingen              | Fast FLUX billeder         |
|                   | Cerebras          | Betal pr. brug      | Ingen              | Wafer-skala hastighed      |
|                   | Sammenhæng        | Betal pr. brug      | Ingen              | Kommando R+ RAG            |
|                   | NVIDIA NIM        | Betal pr. brug      | Ingen              | Virksomhedsmodeller        |
| **💰 BILLIG**     | GLM-4.7           | 0,6 USD/1 mio.      | Dagligt 10:00      | Budget backup              |
|                   | MiniMax M2.1      | $0,2/1 mio.         | 5-timers rullende  | Billigste mulighed         |
|                   | Kimi K2           | 9 USD/md. lejlighed | 10M tokens/md.     | Forudsigelige omkostninger |
| **🆓 GRATIS**     | Qoder             | $0                  | Ubegrænset         | 8 modeller gratis          |
|                   | Qwen              | $0                  | Ubegrænset         | 3 modeller gratis          |
|                   | Kiro              | $0                  | Ubegrænset         | Claude gratis              |

**💡 Pro-tip:**Start med Gemini CLI (180K gratis/måned) + Qoder (ubegrænset gratis) combo = $0 omkostninger!---

## 🎯 Use Cases

### Case 1: "I have Claude Pro subscription"

**Problem:**Kvoten udløber ubrugt, satsgrænser under tung kodning```
Combo: "maximize-claude"

1. cc/claude-opus-4-6 (use subscription fully)
2. glm/glm-4.7 (cheap backup when quota out)
3. if/kimi-k2-thinking (free emergency fallback)

Monthly cost: $20 (subscription) + ~$5 (backup) = $25 total
vs. $20 + hitting limits = frustration

````

### Case 2: "I want zero cost"

**Problem:**Har ikke råd til abonnementer, har brug for pålidelig AI-kodning```
Combo: "free-forever"
  1. gc/gemini-3-flash         (180K free/month)
  2. if/kimi-k2-thinking       (unlimited free)
  3. qw/qwen3-coder-plus       (unlimited free)

Monthly cost: $0
Quality: Production-ready models
````

### Case 3: "I need 24/7 coding, no interruptions"

**Problem:**Deadlines, har ikke råd til nedetid```
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

**Problem:**Har brug for AI-assistent i beskedapps, helt gratis```
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

**Prof tip:**Brug Opus til komplekse opgaver, Sonnet for hurtighed. OmniRoute sporer kvote pr. model!#### OpenAI Codex (Plus/Pro)

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

**Bedste værdi:**Kæmpe gratis niveau! Brug dette før betalte niveauer.#### GitHub Copilot

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

1. Tilmeld dig: [Zhipu AI](https://open.bigmodel.cn/)
2. Hent API-nøgle fra Coding Plan
3. Dashboard → Tilføj API-nøgle: Udbyder: `glm`, API-nøgle: `din-nøgle`

**Brug:**`glm/glm-4.7` —**Prof tip:**Kodningsplan tilbyder 3× kvote til 1/7 pris! Nulstil dagligt 10:00.#### MiniMax M2.1 (5h reset, $0.20/1M)

1. Tilmeld dig: [MiniMax](https://www.minimax.io/)
2. Hent API-nøgle → Dashboard → Tilføj API-nøgle

**Brug:**`minimax/MiniMax-M2.1` —**Pro-tip:**Billigste mulighed for lang sammenhæng (1M tokens)!#### Kimi K2 ($9/month flat)

1. Abonner: [Moonshot AI](https://platform.moonshot.ai/)
2. Hent API-nøgle → Dashboard → Tilføj API-nøgle

**Brug:**`kimi/kimi-nyeste` —**Prof tip:**Fast $9/måned for 10M tokens = $0,90/1M effektive omkostninger!### 🆓 FREE Providers

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

Rediger `~/.claude/config.json`:```json
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

Rediger `~/.openclaw/openclaw.json`:```json
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

**Eller brug Dashboard:**CLI Tools → OpenClaw → Auto-config### Cline / Continue / RooCode

```

Provider: OpenAI Compatible
Base URL: http://localhost:20128/v1
API Key: [from dashboard]
Model: cc/claude-opus-4-6

````

---

## Udrulning

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

CLI'en indlæser automatisk `.env` fra `~/.omniroute/.env` eller `./.env`.### VPS Deployment

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

For servere med begrænset RAM skal du bruge muligheden for hukommelsesbegrænsning:```bash

# With 512MB limit (default)

pm2 start npm --name omniroute -- start

# Or with custom memory limit

OMNIROUTE_MEMORY_MB=512 pm2 start npm --name omniroute -- start

# Or using ecosystem.config.js

pm2 start ecosystem.config.js

````

Opret `ecosystem.config.js`:```javascript
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

For værtsintegreret tilstand med CLI-binære filer, se Docker-sektionen i hoveddokumenterne.### Void Linux (xbps-src)

Void Linux-brugere kan pakke og installere OmniRoute naturligt ved hjælp af `xbps-src` krydskompileringsramme. Dette automatiserer Node.js standalone build sammen med de nødvendige "better-sqlite3" native bindinger.

<detaljer>
<summary><b>Se xbps-src skabelon</b></summary>```bash
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

| Variabel | Standard | Beskrivelse |
| ----------------------------------------------- | ------------------------------------ | ---------------------------------------------------------------------------------------------------------- |
| `JWT_SECRET` | `omniroute-default-secret-change-me` | JWT signeringshemmelighed (**ændring i produktion**) |
| `INITIAL_PASSWORD` | `123456` | Første login-adgangskode |
| `DATA_DIR` | `~/.omniroute` | Datamappe (db, forbrug, logfiler) |
| `PORT` | ramme standard | Serviceport ('20128' i eksempler) |
| `HOSTNAVN` | ramme standard | Bind vært (Docker er som standard `0.0.0.0`) |
| `NODE_ENV` | runtime default | Indstil 'produktion' til implementering |
| `BASE_URL` | `http://localhost:20128` | Intern basis-URL på serversiden |
| `CLOUD_URL` | `https://omniroute.dev` | Base URL for slutpunkt for skysynkronisering |
| `API_KEY_SECRET` | `endpoint-proxy-api-key-secret` | HMAC-hemmelighed for genererede API-nøgler |
| `REQUIRE_API_KEY` | 'falsk' | Gennemtving Bearer API-nøgle på `/v1/*` |
| `ALLOW_API_KEY_REVEAL` | 'falsk' | Tillad Api Manager at kopiere hele API-nøgler efter behov |
| `PROVIDER_LIMITS_SYNC_INTERVAL_MINUTES` | `70` | Server-side opdateringskadence for cachelagrede Provider Limits-data; UI-opdateringsknapper udløser stadig manuel synkronisering |
| `DISABLE_SQLITE_AUTO_BACKUP` | 'falsk' | Deaktiver automatiske SQLite-snapshots før skrivning/import/gendannelse; Manuelle sikkerhedskopier virker stadig |
| `APP_LOG_TO_FILE`                       | `true`                               | Enables application and audit log output to disk                                                          |
| `AUTH_COOKIE_SECURE` | 'falsk' | Tving 'Sikker' auth-cookie (bag HTTPS omvendt proxy) |
| `CLOUDFLARED_BIN` | frakoblet | Brug en eksisterende `cloudflared` binær i stedet for administreret download |
| `CLOUDFLARED_PROTOCOL` | `http2` | Transport til administrerede hurtige tunneler (`http2`, `quic` eller `auto`) |
| `OMNIROUTE_MEMORY_MB` | `512` | Node.js heap-grænse i MB |
| `PROMPT_CACHE_MAX_SIZE` | `50` | Maks. prompt-cache-indgange |
| `SEMANTIC_CACHE_MAX_SIZE` | `100` | Maksimal semantisk cache-indgange |For den fulde reference til miljøvariablen, se [README](../README.md).---

## 📊 Available Models

<detaljer>
<summary><b>Se alle tilgængelige modeller</b></summary>

**Claude Code (`cc/`)**— Pro/Max: `cc/claude-opus-4-6`, `cc/claude-sonnet-4-5-20250929`, `cc/claude-haiku-4-5-20251001`

**Codex (`cx/`)**— Plus/Pro: `cx/gpt-5.2-codex`, `cx/gpt-5.1-codex-max`

**Gemini CLI (`gc/`)**– GRATIS: `gc/gemini-3-flash-preview`, `gc/gemini-2.5-pro`

**GitHub Copilot (`gh/`)**: `gh/gpt-5`, `gh/claude-4.5-sonnet`

**GLM (`glm/`)**– 0,6 USD/1 mio.: `glm/glm-4,7`

**MiniMax (`minimax/`)**— 0,2 USD/1 mio.: `minimax/MiniMax-M2.1`

**Qoder (`if/`)**— GRATIS: `if/kimi-k2-thinking`, `if/qwen3-coder-plus`, `if/deepseek-r1`

**Qwen (`qw/`)**— GRATIS: `qw/qwen3-coder-plus`, `qw/qwen3-coder-flash`

**Kiro (`kr/`)**— GRATIS: `kr/claude-sonnet-4.5`, `kr/claude-haiku-4.5`

**DeepSeek (`ds/`)**: `ds/deepseek-chat`, `ds/deepseek-reasoner`

**Groq (`groq/`)**: `groq/llama-3.3-70b-versatile`, `groq/llama-4-maverick-17b-128e-instruct`

**xAI (`xai/`)**: `xai/grok-4`, `xai/grok-4-0709-fast-reasoning`, `xai/grok-code-mini`

**Mistral (`mistral/`)**: `mistral/mistral-large-2501`, `mistral/codestral-2501`

**Forvirring (`pplx/`)**: `pplx/ekkolod-pro`, `pplx/ekkolod`

**Together AI (`together/`)**: `together/meta-llama/Llama-3.3-70B-Instruct-Turbo`

**Fireworks AI (`fireworks/`)**: `fireworks/accounts/fireworks/models/deepseek-v3p1`

**Cerebras (`cerebras/`)**: `cerebras/llama-3.3-70b`

**Cohere (`cohere/`)**: `cohere/command-r-plus-08-2024`

**NVIDIA NIM (`nvidia/`)**: `nvidia/nvidia/llama-3.3-70b-instruct`</details>

---

## 🧩 Advanced Features

### Custom Models

Tilføj ethvert model-id til enhver udbyder uden at vente på en appopdatering:```bash
# Via API
curl -X POST http://localhost:20128/api/provider-models \
  -H "Content-Type: application/json" \
  -d '{"provider": "openai", "modelId": "gpt-4.5-preview", "modelName": "GPT-4.5 Preview"}'

# List: curl http://localhost:20128/api/provider-models?provider=openai
# Remove: curl -X DELETE "http://localhost:20128/api/provider-models?provider=openai&model=gpt-4.5-preview"
````

Eller brug Dashboard:**Udbydere → [Udbyder] → Brugerdefinerede modeller**.

Bemærkninger:

- OpenRouter og OpenAI/Anthropic-kompatible udbydere administreres kun fra**Tilgængelige modeller**. Manuel tilføjelse, import og automatisk synkronisering lander alle på den samme tilgængelige modelliste, så der er ingen separat sektion med tilpassede modeller for disse udbydere.
- Sektionen**Tilpassede modeller**er beregnet til udbydere, der ikke eksponerer administrerede tilgængelige modeller-importer.### Dedicated Provider Routes

Rut anmodninger direkte til en specifik udbyder med modelvalidering:```bash
POST http://localhost:20128/v1/providers/openai/chat/completions
POST http://localhost:20128/v1/providers/openai/embeddings
POST http://localhost:20128/v1/providers/fireworks/images/generations

````

Udbyderpræfikset tilføjes automatisk, hvis det mangler. Umatchede modeller returnerer '400'.### Network Proxy Configuration

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

**Forrang:**Nøglespecifik → Kombinationsspecifik → Udbyderspecifik → Global → Miljø.### Model Catalog API

```bash
curl http://localhost:20128/api/models/catalog
```

Returnerer modeller grupperet efter udbyder med typer ("chat", "indlejring", "billede").### Cloud Sync

- Synkroniser udbydere, kombinationer og indstillinger på tværs af enheder
- Automatisk baggrundssynkronisering med timeout + fejl-hurtig
- Foretrække server-side `BASE_URL`/`CLOUD_URL` i produktion### Cloudflare Quick Tunnel

- Tilgængelig i**Dashboard → Endpoints**til Docker og andre selv-hostede implementeringer
- Opretter en midlertidig `https://*.trycloudflare.com` URL, der videresender til dit nuværende OpenAI-kompatible `/v1` slutpunkt
- Aktiver først installationer "cloudflared", når det er nødvendigt; senere genstarter genbrug den samme administrerede binære
- Hurtige tunneler gendannes ikke automatisk efter en OmniRoute- eller containergenstart; genaktiver dem fra dashboardet, når det er nødvendigt
- Tunnel-URL'er er flygtige og ændres hver gang du stopper/starter tunnelen
- Managed Quick Tunnels er som standard HTTP/2-transport for at undgå støjende QUIC UDP-bufferadvarsler i begrænsede containere
- Indstil `CLOUDFLARED_PROTOCOL=quic` eller `auto`, hvis du vil tilsidesætte det administrerede transportvalg
- Indstil "CLOUDFLARED_BIN", hvis du foretrækker at bruge en forudinstalleret "cloudflared" binær i stedet for den administrerede download### LLM Gateway Intelligence (Phase 9)

-**Semantisk cache**— Automatisk cache, ikke-streaming, temperatur=0 svar (omgå med `X-OmniRoute-No-Cache: true`) -**Request Idempotency**— Deduplikerer anmodninger inden for 5 sekunder via "Idempotency-Key" eller "X-Request-Id" header -**Progress Tracking**— Opt-in SSE `event: progress` events via `X-OmniRoute-Progress: true` header---

### Translator Playground

Adgang via**Dashboard → Oversætter**. Fejlfind og visualiser, hvordan OmniRoute oversætter API-anmodninger mellem udbydere.

| Tilstand         | Formål                                                                                        |
| ---------------- | --------------------------------------------------------------------------------------------- |
| **Legeplads**    | Vælg kilde-/målformater, indsæt en anmodning, og se det oversatte output med det samme        |
| **Chattester**   | Send live chatbeskeder gennem proxyen og inspicer den fulde anmodning/svar-cyklus             |
| **Testbænk**     | Kør batchtest på tværs af flere formatkombinationer for at bekræfte oversættelsens korrekthed |
| **Live Monitor** | Se oversættelser i realtid, mens anmodninger strømmer gennem proxyen                          |

**Brugstilfælde:**

- Fejlfinding af, hvorfor en specifik klient/udbyder-kombination mislykkes
- Bekræft, at tankemærker, værktøjsopkald og systembeskeder oversættes korrekt
- Sammenlign formatforskelle mellem OpenAI, Claude, Gemini og Responses API-formater---

### Routing Strategies

Konfigurer via**Dashboard → Indstillinger → Routing**.

| Strategi                       | Beskrivelse                                                                                                     |
| ------------------------------ | --------------------------------------------------------------------------------------------------------------- | ----------------------------------- |
| **Fyld først**                 | Bruger konti i prioriteret rækkefølge — primær konto håndterer alle anmodninger, indtil de ikke er tilgængelige |
| **Round Robin**                | Går gennem alle konti med en konfigurerbar sticky-grænse (standard: 3 opkald pr. konto)                         |
| **P2C (Power of Two Choices)** | Vælger 2 tilfældige konti og ruter til den sundere — balancerer belastning med bevidsthed om sundhed            |
| **Tilfældig**                  | Vælger tilfældigt en konto for hver anmodning ved hjælp af Fisher-Yates shuffle                                 |
| **Mindst brugt**               | Ruter til kontoen med det ældste `lastUsedAt`-tidsstempel, der fordeler trafikken jævnt                         |
| **Omkostningsoptimeret**       | Ruter til kontoen med den laveste prioritetsværdi, optimerer til udbydere med laveste omkostninger              | #### External Sticky Session Header |

For ekstern sessionsaffinitet (for eksempel Claude Code/Codex-agenter bag omvendte proxyer), send:```http
X-Session-Id: your-session-key

````

OmniRoute accepterer også `x_session_id` og returnerer den effektive sessionsnøgle i `X-OmniRoute-Session-Id`.

Hvis du bruger Nginx og sender overskrifter i understregningsform, skal du aktivere:```nginx
underscores_in_headers on;
````

#### Wildcard Model Aliases

Opret jokertegnsmønstre for at omdanne modelnavne:```
Pattern: claude-sonnet-_ → Target: cc/claude-sonnet-4-5-20250929
Pattern: gpt-_ → Target: gh/gpt-5.1-codex

````

Jokertegn understøtter `*` (alle tegn) og `?` (enkelt tegn).#### Fallback Chains

Definer globale reservekæder, der gælder på tværs af alle anmodninger:```
Chain: production-fallback
  1. cc/claude-opus-4-6
  2. gh/gpt-5.1-codex
  3. glm/glm-4.7
````

---

### Resilience & Circuit Breakers

Konfigurer via**Dashboard → Indstillinger → Resiliens**.

OmniRoute implementerer modstandsdygtighed på udbyderniveau med fire komponenter:

1.**Udbyderprofiler**— Konfiguration pr. udbyder for:

- Fejltærskel (hvor mange fejl før åbning)
- Nedkølingsvarighed
- Følsomhed for registrering af hastighedsgrænse
- Eksponentielle backoff-parametre

  2.**Redigerbare hastighedsgrænser**— Standardindstillinger på systemniveau, der kan konfigureres i dashboardet: -**Requests Per Minute (RPM)**— Maksimale anmodninger pr. minut pr. konto -**Min Time Between Requests**— Minimumsafstand i millisekunder mellem anmodninger -**Maksimal samtidige anmodninger**— Maksimalt antal samtidige anmodninger pr. konto

- Klik på**Rediger**for at ændre, og klik derefter på**Gem**eller**Annuller**. Værdier bevarer via resilience API.

  3.**Circuit Breaker**— Sporer fejl pr. udbyder og åbner automatisk kredsløbet, når en tærskel er nået: -**LUKKET**(Sund) — Anmodninger flyder normalt -**ÅBEN**— Udbyderen er midlertidigt blokeret efter gentagne fejl -**HALF_OPEN**— Tester, om udbyderen er genoprettet

  4.**Politik og låste identifikatorer**— Viser strømafbryderstatus og låste identifikatorer med tvangsoplåsningsfunktion.

  5.**Rate Limit Auto-Detection**— Overvåger "429" og "Retry-After"-headere for proaktivt at undgå at ramme udbyderens takstgrænser.

**Prof tip:**Brug knappen**Nulstil alle**til at rydde alle strømafbrydere og nedkøling, når en udbyder kommer sig efter en fejl.---

### Database Export / Import

Administrer databasesikkerhedskopier i**Dashboard → Indstillinger → System og lager**.

| Handling                     | Beskrivelse                                                                                                                                                      |
| ---------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------- |
| **Eksporter database**       | Downloader den aktuelle SQLite-database som en `.sqlite`-fil                                                                                                     |
| **Eksporter alle (.tar.gz)** | Downloader et komplet backup-arkiv inklusive: database, indstillinger, kombinationer, udbyderforbindelser (ingen legitimationsoplysninger), API-nøglemetadata    |
| **Importer database**        | Upload en `.sqlite`-fil for at erstatte den aktuelle database. En forhåndsimport-sikkerhedskopi oprettes automatisk, medmindre `DISABLE_SQLITE_AUTO_BACKUP=true` | ```bash |

# API: Export database

curl -o backup.sqlite http://localhost:20128/api/db-backups/export

# API: Export all (full archive)

curl -o backup.tar.gz http://localhost:20128/api/db-backups/exportAll

# API: Import database

curl -X POST http://localhost:20128/api/db-backups/import \
 -F "file=@backup.sqlite"

````

**Importvalidering:**Den importerede fil er valideret for integritet (SQLite pragmatjek), påkrævede tabeller (`provider_connections`, `provider_nodes`, `combos`, `api_keys`) og størrelse (maks. 100MB).

**Brugstilfælde:**

- Migrer OmniRoute mellem maskiner
- Opret eksterne sikkerhedskopier til katastrofegendannelse
- Del konfigurationer mellem teammedlemmer (eksporter alle → del arkiv)---

### Settings Dashboard

Indstillingssiden er organiseret i 6 faner for nem navigation:

| Faneblad | Indhold |
| -------------- | ---------------------------------------------------------------------------------------------------- |
|**Generelt**| Systemlagerværktøjer, udseendeindstillinger, temakontroller og synlighed i sidebjælken pr. element |
|**Sikkerhed**| Indstillinger for login/adgangskode, IP-adgangskontrol, API-godkendelse for `/modeller` og udbyderblokering |
|**Routing**| Global routingstrategi (6 muligheder), jokertegn-modelaliaser, reservekæder, combo-standarder |
|**Resiliens**| Udbyderprofiler, redigerbare hastighedsgrænser, strømafbryderstatus, politikker og låste identifikatorer |
|**AI**| Tænkende budgetkonfiguration, global systemprompt-injektion, prompt-cache-statistik |
|**Avanceret**| Global proxy-konfiguration (HTTP/SOCKS5) |---

### Costs & Budget Management

Adgang via**Dashboard → Omkostninger**.

| Faneblad | Formål |
| ----------- | ------------------------------------------------------------------------------------------ |
|**Budget**| Indstil forbrugsgrænser pr. API-nøgle med daglige/ugentlige/månedlige budgetter og realtidssporing |
|**Priser**| Se og rediger modelprisangivelser — pris pr. 1K input/output-tokens pr. udbyder |```bash
# API: Set a budget
curl -X POST http://localhost:20128/api/usage/budget \
  -H "Content-Type: application/json" \
  -d '{"keyId": "key-123", "limit": 50.00, "period": "monthly"}'

# API: Get current budget status
curl http://localhost:20128/api/usage/budget
````

**Omkostningssporing:**Hver anmodning logger tokenbrug og beregner omkostninger ved hjælp af pristabellen. Se opdelinger i**Dashboard → Brug**efter udbyder, model og API-nøgle.---

### Audio Transcription

OmniRoute understøtter lydtransskription via det OpenAI-kompatible slutpunkt:```bash
POST /v1/audio/transcriptions
Authorization: Bearer your-api-key
Content-Type: multipart/form-data

# Example with curl

curl -X POST http://localhost:20128/v1/audio/transcriptions \
 -H "Authorization: Bearer your-api-key" \
 -F "file=@audio.mp3" \
 -F "model=deepgram/nova-3"

````

Tilgængelige udbydere:**Deepgram**(`deepgram/`),**AssemblyAI**(`assemblyai/`).

Understøttede lydformater: "mp3", "wav", "m4a", "flac", "ogg", "webm".---

### Combo Balancing Strategies

Konfigurer balancering pr. kombination i**Dashboard → Combos → Opret/Rediger → Strategi**.

| Strategi | Beskrivelse |
| ------------------ | -------------------------------------------------------------------------- |
|**Round-Robin**| Roterer sekventielt gennem modeller |
|**Prioritet**| Prøver altid den første model; falder kun tilbage på fejl |
|**Tilfældig**| Vælger en tilfældig model fra kombinationen for hver anmodning |
|**Vægtet**| Ruter proportionalt baseret på tildelte vægte pr. model |
|**Mindst brugt**| Ruter til modellen med de færreste seneste anmodninger (bruger combo-metrics) |
|**Omkostningsoptimeret**| Ruter til den billigste tilgængelige model (bruger pristabel) |

Globale kombinationsstandarder kan indstilles i**Dashboard → Indstillinger → Routing → Combo-standarder**.---

### Health Dashboard

Adgang via**Dashboard → Health**. Oversigt over systemets tilstand i realtid med 6 kort:

| Kort | Hvad det viser |
| ---------------------- | ------------------------------------------------------------------ |
|**Systemstatus**| Oppetid, version, hukommelsesforbrug, datakatalog |
|**Udbydersundhed**| Per-leverandør afbrydertilstand (Lukket/Åben/Halv-Åben) |
|**Satsgrænser**| Aktive nedkølingsgrænser pr. konto med resterende tid |
|**Aktive lockouts**| Udbydere midlertidigt blokeret af lockout-politikken |
|**Signatur Cache**| Deduplikeringscache-statistikker (aktive nøgler, hitrate) |
|**Latency Telemetri**| p50/p95/p99 latenssammenlægning pr. udbyder |

**Prof tip:**Sundhedssiden opdateres automatisk hvert 10. sekund. Brug afbryderkortet til at identificere, hvilke udbydere der oplever problemer.---

## 🖥️ Desktop Application (Electron)

OmniRoute er tilgængelig som en indbygget desktopapplikation til Windows, macOS og Linux.### Installer

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

| Funktion                      | Beskrivelse                                               |
| ----------------------------- | --------------------------------------------------------- | ------------------------- |
| **Serverklarhed**             | Afstemningsserver før vinduet vises (ingen blank skærm)   |
| **Systembakke**               | Minimer til bakke, skift port, luk fra bakkemenu          |
| **Port Management**           | Skift serverport fra bakke (automatisk genstarter server) |
| **Indholdssikkerhedspolitik** | Restriktiv CSP via sessionsoverskrifter                   |
| **Enkelt forekomst**          | Kun én app-forekomst kan køre ad gangen                   |
| **Offlinetilstand**           | Bundet Next.js server fungerer uden internet              | ### Environment Variables |

| Variabel              | Standard | Beskrivelse                       |
| --------------------- | -------- | --------------------------------- |
| `OMNIROUTE_PORT`      | `20128`  | Serverport                        |
| `OMNIROUTE_MEMORY_MB` | `512`    | Node.js heap-grænse (64–16384 MB) |

📖 Fuld dokumentation: [`electron/README.md`](../electron/README.md)
