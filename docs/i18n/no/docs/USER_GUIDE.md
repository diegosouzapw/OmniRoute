# User Guide (Norsk)

🌐 **Languages:** 🇺🇸 [English](../../../../docs/USER_GUIDE.md) · 🇪🇸 [es](../../es/docs/USER_GUIDE.md) · 🇫🇷 [fr](../../fr/docs/USER_GUIDE.md) · 🇩🇪 [de](../../de/docs/USER_GUIDE.md) · 🇮🇹 [it](../../it/docs/USER_GUIDE.md) · 🇷🇺 [ru](../../ru/docs/USER_GUIDE.md) · 🇨🇳 [zh-CN](../../zh-CN/docs/USER_GUIDE.md) · 🇯🇵 [ja](../../ja/docs/USER_GUIDE.md) · 🇰🇷 [ko](../../ko/docs/USER_GUIDE.md) · 🇸🇦 [ar](../../ar/docs/USER_GUIDE.md) · 🇮🇳 [hi](../../hi/docs/USER_GUIDE.md) · 🇮🇳 [in](../../in/docs/USER_GUIDE.md) · 🇹🇭 [th](../../th/docs/USER_GUIDE.md) · 🇻🇳 [vi](../../vi/docs/USER_GUIDE.md) · 🇮🇩 [id](../../id/docs/USER_GUIDE.md) · 🇲🇾 [ms](../../ms/docs/USER_GUIDE.md) · 🇳🇱 [nl](../../nl/docs/USER_GUIDE.md) · 🇵🇱 [pl](../../pl/docs/USER_GUIDE.md) · 🇸🇪 [sv](../../sv/docs/USER_GUIDE.md) · 🇳🇴 [no](../../no/docs/USER_GUIDE.md) · 🇩🇰 [da](../../da/docs/USER_GUIDE.md) · 🇫🇮 [fi](../../fi/docs/USER_GUIDE.md) · 🇵🇹 [pt](../../pt/docs/USER_GUIDE.md) · 🇷🇴 [ro](../../ro/docs/USER_GUIDE.md) · 🇭🇺 [hu](../../hu/docs/USER_GUIDE.md) · 🇧🇬 [bg](../../bg/docs/USER_GUIDE.md) · 🇸🇰 [sk](../../sk/docs/USER_GUIDE.md) · 🇺🇦 [uk-UA](../../uk-UA/docs/USER_GUIDE.md) · 🇮🇱 [he](../../he/docs/USER_GUIDE.md) · 🇵🇭 [phi](../../phi/docs/USER_GUIDE.md) · 🇧🇷 [pt-BR](../../pt-BR/docs/USER_GUIDE.md) · 🇨🇿 [cs](../../cs/docs/USER_GUIDE.md) · 🇹🇷 [tr](../../tr/docs/USER_GUIDE.md)

---

Komplett veiledning for å konfigurere leverandører, lage kombinasjoner, integrere CLI-verktøy og distribuere OmniRoute.---

## Table of Contents

- [Prising på et øyeblikk](#-pricing-at-a-glance)
- [Use Cases](#-use-cases)
  – [Provider Setup](#-provider-setup)
- [CLI-integrasjon](#-cli-integrasjon)
- [Deployment](#-distribusjon)
- [Tilgjengelige modeller](#-tilgjengelige-modeller)
- [Avanserte funksjoner](#-avanserte-funksjoner)---

## 💰 Pricing at a Glance

| Nivå              | Leverandør        | Kostnad         | Kvote Tilbakestill      | Best for                 |
| ----------------- | ----------------- | --------------- | ----------------------- | ------------------------ |
| **💳 ABONNEMENT** | Claude Code (Pro) | $20/md          | 5t + ukentlig           | Allerede abonnert        |
|                   | Codex (Pluss/Pro) | $20-200/md      | 5t + ukentlig           | OpenAI-brukere           |
|                   | Gemini CLI        | **GRATIS**      | 180K/mnd + 1K/dag       | Alle sammen!             |
|                   | GitHub Copilot    | $10-19/md       | Månedlig                | GitHub-brukere           |
| **🔑 API NØKKEL** | DeepSeek          | Betal per bruk  | Ingen                   | Billig resonnement       |
|                   | Groq              | Betal per bruk  | Ingen                   | Ultrarask slutning       |
|                   | xAI (Grok)        | Betal per bruk  | Ingen                   | Grok 4 resonnement       |
|                   | Mistral           | Betal per bruk  | Ingen                   | EU-vertsbaserte modeller |
|                   | Forvirring        | Betal per bruk  | Ingen                   | Søkeutvidet              |
|                   | Sammen AI         | Betal per bruk  | Ingen                   | Åpen kildekode-modeller  |
|                   | Fyrverkeri AI     | Betal per bruk  | Ingen                   | Rask FLUX bilder         |
|                   | Cerebras          | Betal per bruk  | Ingen                   | Wafer-skala hastighet    |
|                   | Sammenheng        | Betal per bruk  | Ingen                   | Kommando R+ RAG          |
|                   | NVIDIA NIM        | Betal per bruk  | Ingen                   | Bedriftsmodeller         |
| **💰 BILLIG**     | GLM-4.7           | $0,6/1M         | Daglig 10:00            | Budsjett backup          |
|                   | MiniMax M2.1      | $0,2/1 million  | 5-timers rullende       | Billigste alternativ     |
|                   | Kimi K2           | $9/md leilighet | 10 millioner tokens/mnd | Forutsigbar kostnad      |
| **🆓 GRATIS**     | Qoder             | $0              | Ubegrenset              | 8 modeller gratis        |
|                   | Qwen              | $0              | Ubegrenset              | 3 modeller gratis        |
|                   | Kiro              | $0              | Ubegrenset              | Claude gratis            |

**💡 Pro-tips:**Start med Gemini CLI (180K gratis/måned) + Qoder (ubegrenset gratis) kombinasjon = $0 kostnad!---

## 🎯 Use Cases

### Case 1: "I have Claude Pro subscription"

**Problem:**Kvoten utløper ubrukt, satsgrenser under tung koding```
Combo: "maximize-claude"

1. cc/claude-opus-4-6 (use subscription fully)
2. glm/glm-4.7 (cheap backup when quota out)
3. if/kimi-k2-thinking (free emergency fallback)

Monthly cost: $20 (subscription) + ~$5 (backup) = $25 total
vs. $20 + hitting limits = frustration

````

### Case 2: "I want zero cost"

**Problem:**Har ikke råd til abonnementer, trenger pålitelig AI-koding```
Combo: "free-forever"
  1. gc/gemini-3-flash         (180K free/month)
  2. if/kimi-k2-thinking       (unlimited free)
  3. qw/qwen3-coder-plus       (unlimited free)

Monthly cost: $0
Quality: Production-ready models
````

### Case 3: "I need 24/7 coding, no interruptions"

**Problem:**Tidsfrister, har ikke råd til nedetid```
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

**Problem:**Trenger AI-assistent i meldingsapper, helt gratis```
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

**Profftips:**Bruk Opus for komplekse oppgaver, Sonnet for hastighet. OmniRoute sporer kvote per modell!#### OpenAI Codex (Plus/Pro)

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

**Mest verdi:**Enormt gratis nivå! Bruk dette før betalte nivåer.#### GitHub Copilot

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

1. Registrer deg: [Zhipu AI](https://open.bigmodel.cn/)
2. Få API-nøkkel fra Coding Plan
3. Dashboard → Legg til API-nøkkel: Leverandør: `glm`, API-nøkkel: `din-nøkkel`

**Bruk:**`glm/glm-4.7` —**Profftips:**Kodeplan tilbyr 3× kvote til 1/7 kostnad! Tilbakestill daglig 10:00.#### MiniMax M2.1 (5h reset, $0.20/1M)

1. Registrer deg: [MiniMax](https://www.minimax.io/)
2. Hent API-nøkkel → Dashboard → Legg til API-nøkkel

**Bruk:**`minimax/MiniMax-M2.1` —**Profftips:**Billigste alternativ for lang kontekst (1M tokens)!#### Kimi K2 ($9/month flat)

1. Abonner: [Moonshot AI](https://platform.moonshot.ai/)
2. Hent API-nøkkel → Dashboard → Legg til API-nøkkel

**Bruk:**`kimi/kimi-latest` —**Profftips:**Fast $9/måned for 10M tokens = $0,90/1M effektiv kostnad!### 🆓 FREE Providers

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

**Eller bruk Dashboard:**CLI Tools → OpenClaw → Auto-config### Cline / Continue / RooCode

```

Provider: OpenAI Compatible
Base URL: http://localhost:20128/v1
API Key: [from dashboard]
Model: cc/claude-opus-4-6

````

---

## Utrulling

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

CLI laster automatisk `.env` fra `~/.omniroute/.env` eller `./.env`.### VPS Deployment

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

For servere med begrenset RAM, bruk alternativet for minnegrense:```bash

# With 512MB limit (default)

pm2 start npm --name omniroute -- start

# Or with custom memory limit

OMNIROUTE_MEMORY_MB=512 pm2 start npm --name omniroute -- start

# Or using ecosystem.config.js

pm2 start ecosystem.config.js

````

Opprett `ecosystem.config.js`:```javascript
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

For vertsintegrert modus med CLI-binærfiler, se Docker-delen i hoveddokumentene.### Void Linux (xbps-src)

Void Linux-brukere kan pakke og installere OmniRoute naturlig ved å bruke "xbps-src" krysskompileringsrammeverket. Dette automatiserer Node.js frittstående build sammen med de nødvendige "better-sqlite3" native bindingene.

<detaljer>
<summary><b>Se xbps-src-mal</b></summary>```bash
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
| ----------------------------------------------- | ------------------------------------ | ------------------------------------------------------------------------------------------------------------------ |
| `JWT_SECRET` | `omniroute-default-secret-change-me` | JWT signeringshemmelighet (**endring i produksjon**) |
| `INITIAL_PASSWORD` | `123456` | Første påloggingspassord |
| `DATA_DIR` | `~/.omniroute` | Datakatalog (db, bruk, logger) |
| `PORT` | standard rammeverk | Tjenesteport («20128» i eksempler) |
| `VERTSNAVN` | standard rammeverk | Bind vert (Docker er standard til `0.0.0.0`) |
| `NODE_ENV` | kjøretidsstandard | Angi "produksjon" for distribusjon |
| `BASE_URL` | `http://localhost:20128` | Intern basis-URL på tjenersiden |
| `CLOUD_URL` | `https://omniroute.dev` | Nettadresse for endepunkt for nettskysynkronisering |
| `API_KEY_SECRET` | `endepunkt-proxy-api-nøkkel-hemmelig` | HMAC-hemmelighet for genererte API-nøkler |
| `REQUIRE_API_KEY` | `false` | Håndhev Bearer API-nøkkel på `/v1/*` |
| `ALLOW_API_KEY_REVEAL` | `false` | Tillat at Api Manager kopierer fullstendige API-nøkler på forespørsel |
| `PROVIDER_LIMITS_SYNC_INTERVAL_MINUTES` | `70` | Oppdateringskadens på tjenersiden for bufrede Provider Limits-data; UI-oppdateringsknapper utløser fortsatt manuell synkronisering |
| `DISABLE_SQLITE_AUTO_BACKUP` | `false` | Deaktiver automatiske SQLite-øyeblikksbilder før skriving/importering/gjenoppretting; manuelle sikkerhetskopier fungerer fortsatt |
| `APP_LOG_TO_FILE`                       | `true`                               | Enables application and audit log output to disk                                                          |
| `AUTH_COOKIE_SECURE` | `false` | Tving `Sikker` auth-informasjonskapsel (bak HTTPS omvendt proxy) |
| `CLOUDFLARED_BIN` | deaktivert | Bruk en eksisterende `cloudflared`-binær i stedet for administrert nedlasting |
| `CLOUDFLARED_PROTOCOL` | `http2` | Transport for administrerte hurtigtunneler (`http2`, `quic` eller `auto`) |
| `OMNIROUTE_MEMORY_MB` | `512` | Node.js hauggrense i MB |
| `PROMPT_CACHE_MAX_SIZE` | `50` | Maks. hurtigbufferoppføringer |
| `SEMANTIC_CACHE_MAX_SIZE` | `100` | Maks. semantisk cache-oppføringer |For hele miljøvariabelreferansen, se [README](../README.md).---

## 📊 Available Models

<detaljer>
<summary><b>Se alle tilgjengelige modeller</b></summary>

**Claude Code (`cc/`)**— Pro/Max: `cc/claude-opus-4-6`, `cc/claude-sonnet-4-5-20250929`, `cc/claude-haiku-4-5-20251001`

**Codex (`cx/`)**– Pluss/Pro: `cx/gpt-5.2-codex`, `cx/gpt-5.1-codex-max`

**Gemini CLI (`gc/`)**– GRATIS: `gc/gemini-3-flash-preview`, `gc/gemini-2.5-pro`

**GitHub Copilot (`gh/`)**: `gh/gpt-5`, `gh/claude-4.5-sonnet`

**GLM (`glm/`)**– $0,6/1M: `glm/glm-4,7`

**MiniMax (`minimax/`)**– $0,2/1M: `minimax/MiniMax-M2.1`

**Qoder (`if/`)**– GRATIS: `if/kimi-k2-thinking`, `if/qwen3-coder-plus`, `if/deepseek-r1`

**Qwen (`qw/`)**– GRATIS: `qw/qwen3-coder-plus`, `qw/qwen3-coder-flash`

**Kiro (`kr/`)**– GRATIS: `kr/claude-sonnet-4.5`, `kr/claude-haiku-4.5`

**DeepSeek (`ds/`)**: `ds/deepseek-chat`, `ds/deepseek-reasoner`

**Groq (`groq/`)**: `groq/llama-3.3-70b-versatile`, `groq/llama-4-maverick-17b-128e-instruct`

**xAI (`xai/`)**: `xai/grok-4`, `xai/grok-4-0709-fast-reasoning`, `xai/grok-code-mini`

**Mistral (`mistral/`)**: `mistral/mistral-large-2501`, `mistral/codestral-2501`

**Forvirring (`pplx/`)**: `pplx/sonar-pro`, `pplx/ekkolodd`

**Together AI (`together/`)**: `together/meta-llama/Llama-3.3-70B-Instruct-Turbo`

**Fireworks AI (`fireworks/`)**: `fireworks/accounts/fireworks/models/deepseek-v3p1`

**Cerebras (`cerebras/`)**: `cerebras/llama-3.3-70b`

**Cohere (`cohere/`)**: `cohere/command-r-plus-08-2024`

**NVIDIA NIM (`nvidia/`)**: `nvidia/nvidia/llama-3.3-70b-instruct`</details>

---

## 🧩 Advanced Features

### Custom Models

Legg til hvilken som helst modell-ID til en hvilken som helst leverandør uten å vente på en appoppdatering:```bash
# Via API
curl -X POST http://localhost:20128/api/provider-models \
  -H "Content-Type: application/json" \
  -d '{"provider": "openai", "modelId": "gpt-4.5-preview", "modelName": "GPT-4.5 Preview"}'

# List: curl http://localhost:20128/api/provider-models?provider=openai
# Remove: curl -X DELETE "http://localhost:20128/api/provider-models?provider=openai&model=gpt-4.5-preview"
````

Eller bruk Dashboard:**Leverandører → [Leverandør] → Egendefinerte modeller**.

Merknader:

- OpenRouter og OpenAI/Anthropic-kompatible leverandører administreres kun fra**Tilgjengelige modeller**. Manuell tillegging, import og automatisk synkronisering havner i samme liste over tilgjengelige modeller, så det er ingen egen seksjon for tilpassede modeller for disse leverandørene.
  –**Egendefinerte modeller**-delen er beregnet på leverandører som ikke eksponerer administrert import av tilgjengelige modeller.### Dedicated Provider Routes

Rute forespørsler direkte til en spesifikk leverandør med modellvalidering:```bash
POST http://localhost:20128/v1/providers/openai/chat/completions
POST http://localhost:20128/v1/providers/openai/embeddings
POST http://localhost:20128/v1/providers/fireworks/images/generations

````

Leverandørprefikset blir automatisk lagt til hvis det mangler. Umatchede modeller returnerer `400`.### Network Proxy Configuration

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

**Forrang:**Nøkkelspesifikk → Kombinasjonsspesifikk → Leverandørspesifikk → Global → Miljø.### Model Catalog API

```bash
curl http://localhost:20128/api/models/catalog
```

Returnerer modeller gruppert etter leverandør med typer (`chat`, `embedding`, `image`).### Cloud Sync

- Synkroniser leverandører, kombinasjoner og innstillinger på tvers av enheter
- Automatisk bakgrunnssynkronisering med timeout + feil-rask
- Foretrekk "BASE_URL"/"CLOUD_URL" på serversiden i produksjon### Cloudflare Quick Tunnel

- Tilgjengelig i**Dashboard → Endpoints**for Docker og andre selvvertsbaserte distribusjoner
- Oppretter en midlertidig `https://*.trycloudflare.com` URL som videresender til ditt nåværende OpenAI-kompatible `/v1` endepunkt
- Aktiver først installasjoner `cloudflared` bare når det er nødvendig; senere omstarter gjenbruk den samme administrerte binære filen
- Hurtigtunneler blir ikke automatisk gjenopprettet etter omstart av OmniRoute eller container; aktiver dem på nytt fra dashbordet ved behov
- Tunnel-URLer er flyktige og endres hver gang du stopper/starter tunnelen
- Managed Quick Tunnels er som standard HTTP/2-transport for å unngå støyende QUIC UDP-buffervarsler i begrensede containere
- Angi `CLOUDFLARED_PROTOCOL=quic` eller `auto` hvis du vil overstyre det administrerte transportvalget
- Angi `CLOUDFLARED_BIN` hvis du foretrekker å bruke en forhåndsinstallert `cloudflared`-binær i stedet for den administrerte nedlastingen### LLM Gateway Intelligence (Phase 9)

-**Semantisk hurtigbuffer**— Automatisk hurtigbufring som ikke er streaming, temperatur=0 svar (omgå med `X-OmniRoute-No-Cache: true`) -**Request Idempotency**— Dedupliserer forespørsler innen 5 s via «Idempotency-Key» eller «X-Request-Id»-overskrift -**Fremdriftssporing**— Meld deg på SSE `event: progress`-hendelser via `X-OmniRoute-Progress: true` header---

### Translator Playground

Tilgang via**Dashboard → Oversetter**. Feilsøk og visualiser hvordan OmniRoute oversetter API-forespørsler mellom leverandører.

| Modus            | Formål                                                                                           |
| ---------------- | ------------------------------------------------------------------------------------------------ |
| **Lekeplass**    | Velg kilde-/målformater, lim inn en forespørsel og se den oversatte utgangen umiddelbart         |
| **Chattetester** | Send live chat-meldinger gjennom proxyen og inspiser hele forespørsels-/svarsyklusen             |
| **Testbenk**     | Kjør batch-tester på tvers av flere formatkombinasjoner for å bekrefte oversettelsens korrekthet |
| **Live Monitor** | Se sanntidsoversettelser mens forespørsler strømmer gjennom proxyen                              |

**Brukstilfeller:**

- Feilsøk hvorfor en spesifikk klient/leverandør-kombinasjon mislykkes
- Bekreft at tankekoder, verktøykall og systemmeldinger oversettes riktig
- Sammenlign formatforskjeller mellom OpenAI, Claude, Gemini og Responses API-formater---

### Routing Strategies

Konfigurer via**Dashboard → Innstillinger → Ruting**.

| Strategi                       | Beskrivelse                                                                                              |
| ------------------------------ | -------------------------------------------------------------------------------------------------------- | ----------------------------------- |
| **Fyll først**                 | Bruker kontoer i prioritert rekkefølge — primærkonto håndterer alle forespørsler inntil utilgjengelig    |
| **Round Robin**                | Bla gjennom alle kontoer med en konfigurerbar klebrig grense (standard: 3 samtaler per konto)            |
| **P2C (Power of Two Choices)** | Velger 2 tilfeldige kontoer og ruter til den sunnere — balanserer belastning med bevissthet om helse     |
| **Tilfeldig**                  | Velger tilfeldig en konto for hver forespørsel ved hjelp av Fisher-Yates shuffle                         |
| **Minst brukt**                | Ruter til kontoen med det eldste «lastUsedAt»-tidsstempelet, og fordeler trafikk jevnt                   |
| **Kostnadsoptimalisert**       | Ruter til kontoen med den laveste prioritetsverdien, optimalisering for de laveste kostnadsleverandørene | #### External Sticky Session Header |

For ekstern sesjonstilhørighet (for eksempel Claude Code/Codex-agenter bak omvendte proxyer), send:```http
X-Session-Id: your-session-key

````

OmniRoute godtar også `x_session_id` og returnerer den effektive øktnøkkelen i `X-OmniRoute-Session-Id`.

Hvis du bruker Nginx og sender understrek-overskrifter, aktiver:```nginx
underscores_in_headers on;
````

#### Wildcard Model Aliases

Lag jokertegnmønstre for å omordne modellnavn:```
Pattern: claude-sonnet-_ → Target: cc/claude-sonnet-4-5-20250929
Pattern: gpt-_ → Target: gh/gpt-5.1-codex

````

Jokertegn støtter `*` (alle tegn) og `?` (enkelttegn).#### Fallback Chains

Definer globale reservekjeder som gjelder for alle forespørsler:```
Chain: production-fallback
  1. cc/claude-opus-4-6
  2. gh/gpt-5.1-codex
  3. glm/glm-4.7
````

---

### Resilience & Circuit Breakers

Konfigurer via**Dashboard → Innstillinger → Resiliens**.

OmniRoute implementerer motstandskraft på leverandørnivå med fire komponenter:

1.**Leverandørprofiler**— Konfigurasjon per leverandør for:

- Feilterskel (hvor mange feil før åpning)
- Nedkjølingsvarighet
- Følsomhet for deteksjon av hastighetsgrense
- Eksponentielle backoff-parametere

  2.**Redigerbare rategrenser**— Standardinnstillinger på systemnivå som kan konfigureres i dashbordet: -**Forespørsler per minutt (RPM)**— Maksimalt antall forespørsler per minutt per konto -**Min time Between Requests**— Minimumsavstand i millisekunder mellom forespørsler -**Maks samtidige forespørsler**— Maksimalt antall samtidige forespørsler per konto

- Klikk på**Rediger**for å endre, deretter**Lagre**eller**Avbryt**. Verdiene vedvarer via resilience API.

  3.**Circuit Breaker**— Sporer feil per leverandør og åpner automatisk kretsen når en terskel er nådd: -**STENGT**(Sunn) — Forespørslene flyter normalt -**ÅPEN**— Leverandøren er midlertidig blokkert etter gjentatte feil -**HALF_OPEN**— Tester om leverandøren har kommet seg

  4.**Retningslinjer og låste identifikatorer**— Viser strømbryterstatus og låste identifikatorer med tvangsopplåsingsfunksjon.

  5.**Rate Limit Auto-Detection**— Overvåker «429» og «Retry-After»-overskrifter for å proaktivt unngå å treffe leverandørens takstgrenser.

**Profftips:**Bruk**Tilbakestill alle**-knappen for å fjerne alle strømbrytere og nedkjøling når en leverandør kommer seg etter et strømbrudd.---

### Database Export / Import

Administrer sikkerhetskopiering av databaser i**Dashboard → Innstillinger → System og lagring**.

| Handling                     | Beskrivelse                                                                                                                                                      |
| ---------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------- |
| **Eksporter database**       | Laster ned gjeldende SQLite-database som en `.sqlite`-fil                                                                                                        |
| **Eksporter alle (.tar.gz)** | Laster ned et fullstendig sikkerhetskopiarkiv inkludert: database, innstillinger, kombinasjoner, leverandørtilkoblinger (ingen legitimasjon), API-nøkkelmetadata |
| **Importer database**        | Last opp en `.sqlite`-fil for å erstatte gjeldende database. En forhåndsimport-sikkerhetskopi opprettes automatisk med mindre `DISABLE_SQLITE_AUTO_BACKUP=true`  | ```bash |

# API: Export database

curl -o backup.sqlite http://localhost:20128/api/db-backups/export

# API: Export all (full archive)

curl -o backup.tar.gz http://localhost:20128/api/db-backups/exportAll

# API: Import database

curl -X POST http://localhost:20128/api/db-backups/import \
 -F "file=@backup.sqlite"

````

**Importvalidering:**Den importerte filen er validert for integritet (SQLite pragmasjekk), nødvendige tabeller (`provider_connections`, `provider_nodes`, `combos`, `api_keys`) og størrelse (maks. 100MB).

**Brukstilfeller:**

- Migrer OmniRoute mellom maskiner
- Lag eksterne sikkerhetskopier for katastrofegjenoppretting
- Del konfigurasjoner mellom teammedlemmer (eksporter alle → del arkiv)---

### Settings Dashboard

Innstillingssiden er organisert i 6 faner for enkel navigering:

| Tab | Innhold |
| -------------- | ------------------------------------------------------------------------------------------------------ |
|**Generelt**| Systemlagringsverktøy, utseendeinnstillinger, temakontroller og synlighet i sidefeltet per element |
|**Sikkerhet**| Innstillinger for pålogging/passord, IP-tilgangskontroll, API-autentisering for `/modeller` og leverandørblokkering |
|**Ruting**| Global rutingstrategi (6 alternativer), jokertegnmodellaliaser, reservekjeder, kombinasjonsstandarder |
|**Resiliens**| Leverandørprofiler, redigerbare hastighetsgrenser, strømbryterstatus, retningslinjer og låste identifikatorer |
|**AI**| Tenker budsjettkonfigurasjon, global systempromptinjeksjon, promptbufferstatistikk |
|**Avansert**| Global proxy-konfigurasjon (HTTP/SOCKS5) |---

### Costs & Budget Management

Tilgang via**Dashboard → Kostnader**.

| Tab | Formål |
| ----------- | ------------------------------------------------------------------------------------------ |
|**Budsjett**| Angi utgiftsgrenser per API-nøkkel med daglige/ukentlige/månedlige budsjetter og sanntidssporing |
|**Priser**| Se og rediger modellprisoppføringer — kostnad per 1K input/output tokens per leverandør |```bash
# API: Set a budget
curl -X POST http://localhost:20128/api/usage/budget \
  -H "Content-Type: application/json" \
  -d '{"keyId": "key-123", "limit": 50.00, "period": "monthly"}'

# API: Get current budget status
curl http://localhost:20128/api/usage/budget
````

**Kostnadssporing:**Hver forespørsel logger tokenbruk og beregner kostnad ved hjelp av pristabellen. Se oversikter i**Dashboard → Bruk**etter leverandør, modell og API-nøkkel.---

### Audio Transcription

OmniRoute støtter lydtranskripsjon via det OpenAI-kompatible endepunktet:```bash
POST /v1/audio/transcriptions
Authorization: Bearer your-api-key
Content-Type: multipart/form-data

# Example with curl

curl -X POST http://localhost:20128/v1/audio/transcriptions \
 -H "Authorization: Bearer your-api-key" \
 -F "file=@audio.mp3" \
 -F "model=deepgram/nova-3"

````

Tilgjengelige leverandører:**Deepgram**(`deepgram/`),**AssemblyAI**(`assemblyai/`).

Støttede lydformater: "mp3", "wav", "m4a", "flac", "ogg", "webm".---

### Combo Balancing Strategies

Konfigurer balansering per kombinasjon i**Dashboard → Kombinasjoner → Opprett/Rediger → Strategi**.

| Strategi | Beskrivelse |
| ------------------ | ---------------------------------------------------------------------------------- |
|**Round-Robin**| Roterer gjennom modellene sekvensielt |
|**Prioritet**| Prøver alltid den første modellen; faller tilbake kun på feil |
|**Tilfeldig**| Velger en tilfeldig modell fra kombinasjonen for hver forespørsel |
|**Vektet**| Ruter proporsjonalt basert på tildelte vekter per modell |
|**Minst brukt**| Ruter til modellen med færrest nylige forespørsler (bruker kombinasjonsberegninger) |
|**Kostnadsoptimalisert**| Ruter til den billigste tilgjengelige modellen (bruker pristabell) |

Globale kombinasjonsstandarder kan angis i**Dashboard → Innstillinger → Ruting → Combo-standarder**.---

### Health Dashboard

Tilgang via**Dashboard → Helse**. Sanntids systemhelseoversikt med 6 kort:

| Kort | Hva det viser |
| ---------------------- | ------------------------------------------------------------------ |
|**Systemstatus**| Oppetid, versjon, minnebruk, datakatalog |
|**Leverandørhelse**| Per leverandør effektbrytertilstand (lukket/åpen/halvåpen) |
|**Satsgrenser**| Aktive nedkjølingshastigheter per konto med gjenværende tid |
|**Aktive Lockouts**| Leverandører midlertidig blokkert av lockout-policyen |
|**Signaturbuffer**| Dedupliseringsbufferstatistikk (aktive nøkler, trefffrekvens) |
|**Latens-telemetri**| p50/p95/p99 latensaggregering per leverandør |

**Profftips:**Helsesiden oppdateres automatisk hvert 10. sekund. Bruk kretsbryterkortet til å identifisere hvilke leverandører som har problemer.---

## 🖥️ Desktop Application (Electron)

OmniRoute er tilgjengelig som en innebygd skrivebordsapplikasjon for Windows, macOS og Linux.### Installer

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

Utgang → `elektron/dist-elektron/`### Key Features

| Funksjon                                 | Beskrivelse                                                        |
| ---------------------------------------- | ------------------------------------------------------------------ | ------------------------- |
| **Serverberedskap**                      | Avstemningsserver før vindu vises (ingen blank skjerm)             |
| **System Tray**                          | Minimer til skuff, bytt port, avslutt fra skuffmenyen              |
| **Port Management**                      | Endre serverport fra skuffen (starter serveren automatisk på nytt) |
| **Retningslinjer for innholdssikkerhet** | Restriktiv CSP via økthoder                                        |
| **Enkeltforekomst**                      | Bare én appforekomst kan kjøres om gangen                          |
| **Frakoblet modus**                      | Medfølgende Next.js-server fungerer uten internett                 | ### Environment Variables |

| Variabel              | Standard | Beskrivelse                       |
| --------------------- | -------- | --------------------------------- |
| `OMNIROUTE_PORT`      | `20128`  | Serverport                        |
| `OMNIROUTE_MEMORY_MB` | `512`    | Node.js heap-grense (64–16384 MB) |

📖 Full dokumentasjon: [`electron/README.md`](../electron/README.md)
