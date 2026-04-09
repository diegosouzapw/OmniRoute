# User Guide (Nederlands)

🌐 **Languages:** 🇺🇸 [English](../../../../docs/USER_GUIDE.md) · 🇪🇸 [es](../../es/docs/USER_GUIDE.md) · 🇫🇷 [fr](../../fr/docs/USER_GUIDE.md) · 🇩🇪 [de](../../de/docs/USER_GUIDE.md) · 🇮🇹 [it](../../it/docs/USER_GUIDE.md) · 🇷🇺 [ru](../../ru/docs/USER_GUIDE.md) · 🇨🇳 [zh-CN](../../zh-CN/docs/USER_GUIDE.md) · 🇯🇵 [ja](../../ja/docs/USER_GUIDE.md) · 🇰🇷 [ko](../../ko/docs/USER_GUIDE.md) · 🇸🇦 [ar](../../ar/docs/USER_GUIDE.md) · 🇮🇳 [hi](../../hi/docs/USER_GUIDE.md) · 🇮🇳 [in](../../in/docs/USER_GUIDE.md) · 🇹🇭 [th](../../th/docs/USER_GUIDE.md) · 🇻🇳 [vi](../../vi/docs/USER_GUIDE.md) · 🇮🇩 [id](../../id/docs/USER_GUIDE.md) · 🇲🇾 [ms](../../ms/docs/USER_GUIDE.md) · 🇳🇱 [nl](../../nl/docs/USER_GUIDE.md) · 🇵🇱 [pl](../../pl/docs/USER_GUIDE.md) · 🇸🇪 [sv](../../sv/docs/USER_GUIDE.md) · 🇳🇴 [no](../../no/docs/USER_GUIDE.md) · 🇩🇰 [da](../../da/docs/USER_GUIDE.md) · 🇫🇮 [fi](../../fi/docs/USER_GUIDE.md) · 🇵🇹 [pt](../../pt/docs/USER_GUIDE.md) · 🇷🇴 [ro](../../ro/docs/USER_GUIDE.md) · 🇭🇺 [hu](../../hu/docs/USER_GUIDE.md) · 🇧🇬 [bg](../../bg/docs/USER_GUIDE.md) · 🇸🇰 [sk](../../sk/docs/USER_GUIDE.md) · 🇺🇦 [uk-UA](../../uk-UA/docs/USER_GUIDE.md) · 🇮🇱 [he](../../he/docs/USER_GUIDE.md) · 🇵🇭 [phi](../../phi/docs/USER_GUIDE.md) · 🇧🇷 [pt-BR](../../pt-BR/docs/USER_GUIDE.md) · 🇨🇿 [cs](../../cs/docs/USER_GUIDE.md) · 🇹🇷 [tr](../../tr/docs/USER_GUIDE.md)

---

Volledige gids voor het configureren van providers, het maken van combo's, het integreren van CLI-tools en het implementeren van OmniRoute.---

## Table of Contents

- [Prijzen in één oogopslag](#-prijzen in één oogopslag)
- [Gebruiksscenario's](#-use-cases)
- [Providerinstellingen](#-provider-setup)
- [CLI-integratie](#-cli-integratie)
- [Implementatie](#-implementatie)
- [Beschikbare modellen](#-beschikbare-modellen)
- [Geavanceerde functies](#-advanced-features)---

## 💰 Pricing at a Glance

| Niveau             | Aanbieder         | Kosten              | Quotum opnieuw instellen | Beste voor                  |
| ------------------ | ----------------- | ------------------- | ------------------------ | --------------------------- |
| **💳 ABONNEMENT**  | Claude Code (Pro) | $ 20/maand          | 5u + wekelijks           | Al geabonneerd              |
|                    | Codex (Plus/Pro)  | $ 20-200/maand      | 5u + wekelijks           | OpenAI-gebruikers           |
|                    | Tweeling CLI      | **GRATIS**          | 180K/maand + 1K/dag      | Iedereen!                   |
|                    | GitHub-copiloot   | $ 10-19/maand       | Maandelijks              | GitHub-gebruikers           |
| **🔑 API-SLEUTEL** | DeepSeek          | Betalen per gebruik | Geen                     | Goedkoop redeneren          |
|                    | Groq              | Betalen per gebruik | Geen                     | Ultrasnelle gevolgtrekking  |
|                    | xAI (Grok)        | Betalen per gebruik | Geen                     | Grok 4 redenering           |
|                    | Mistral           | Betalen per gebruik | Geen                     | Door de EU gehoste modellen |
|                    | Verbijstering     | Betalen per gebruik | Geen                     | Zoek-uitgebreid             |
|                    | Samen AI          | Betalen per gebruik | Geen                     | Open source-modellen        |
|                    | Vuurwerk AI       | Betalen per gebruik | Geen                     | Snelle FLUX-afbeeldingen    |
|                    | Hersenen          | Betalen per gebruik | Geen                     | Snelheid op wafelschaal     |
|                    | Cohier            | Betalen per gebruik | Geen                     | Commando R+ RAG             |
|                    | NVIDIA NIM        | Betalen per gebruik | Geen                     | Enterprise-modellen         |
| **💰GOEDKOOP**     | GLM-4.7           | $ 0,6/1 miljoen     | Dagelijks 10.00 uur      | Budgetback-up               |
|                    | MiniMax M2.1      | $ 0,2/1 miljoen     | 5-uurs rollen            | Goedkoopste optie           |
|                    | Kimi K2           | $ 9/maand plat      | 10 miljoen tokens/maand  | Voorspelbare kosten         |
| **🆓 GRATIS**      | Qoder             | $0                  | Onbeperkt                | 8 modellen gratis           |
|                    | Qwen              | $0                  | Onbeperkt                | 3 modellen gratis           |
|                    | Kiro              | $0                  | Onbeperkt                | Claude vrij                 |

**💡 Pro-tip:**Begin met Gemini CLI (180K gratis/maand) + Qoder (onbeperkt gratis) combo = $ 0 kosten!---

## 🎯 Use Cases

### Case 1: "I have Claude Pro subscription"

**Probleem:**Quotum verloopt ongebruikt, snelheidslimieten tijdens intensief coderen```
Combo: "maximize-claude"

1. cc/claude-opus-4-6 (use subscription fully)
2. glm/glm-4.7 (cheap backup when quota out)
3. if/kimi-k2-thinking (free emergency fallback)

Monthly cost: $20 (subscription) + ~$5 (backup) = $25 total
vs. $20 + hitting limits = frustration

````

### Case 2: "I want zero cost"

**Probleem:**Ik kan geen abonnementen betalen, heb betrouwbare AI-codering nodig```
Combo: "free-forever"
  1. gc/gemini-3-flash         (180K free/month)
  2. if/kimi-k2-thinking       (unlimited free)
  3. qw/qwen3-coder-plus       (unlimited free)

Monthly cost: $0
Quality: Production-ready models
````

### Case 3: "I need 24/7 coding, no interruptions"

**Probleem:**Deadlines, downtime is niet mogelijk```
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

**Probleem:**AI-assistent nodig in berichtenapps, geheel gratis```
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

**Pro-tip:**Gebruik Opus voor complexe taken, Sonnet voor snelheid. OmniRoute houdt quota bij per model!#### OpenAI Codex (Plus/Pro)

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

**Beste waarde:**Enorm gratis niveau! Gebruik dit vóór betaalde niveaus.#### GitHub Copilot

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

1. Aanmelden: [Zhipu AI](https://open.bigmodel.cn/)
2. Haal de API-sleutel op uit het Coderingsplan
3. Dashboard → API-sleutel toevoegen: Provider: `glm`, API-sleutel: `uw-sleutel`

**Gebruik:**`glm/glm-4.7` —**Pro Tip:**Codeerplan biedt 3× quota tegen 1/7 kosten! Dagelijks resetten om 10:00 uur.#### MiniMax M2.1 (5h reset, $0.20/1M)

1. Aanmelden: [MiniMax](https://www.minimax.io/)
2. API-sleutel ophalen → Dashboard → API-sleutel toevoegen

**Gebruik:**`minimax/MiniMax-M2.1` —**Pro Tip:**Goedkoopste optie voor lange context (1M tokens)!#### Kimi K2 ($9/month flat)

1. Abonneer je op: [Moonshot AI](https://platform.moonshot.ai/)
2. API-sleutel ophalen → Dashboard → API-sleutel toevoegen

**Gebruik:**`kimi/kimi-latest` —**Pro-tip:**Vaste $ 9/maand voor 10 miljoen tokens = $ 0,90/1 miljoen effectieve kosten!### 🆓 FREE Providers

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

Bewerk `~/.claude/config.json`:```json
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

Bewerk `~/.openclaw/openclaw.json`:```json
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

**Of gebruik Dashboard:**CLI Tools → OpenClaw → Auto-config### Cline / Continue / RooCode

```

Provider: OpenAI Compatible
Base URL: http://localhost:20128/v1
API Key: [from dashboard]
Model: cc/claude-opus-4-6

````

---

## Implementatie

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

De CLI laadt automatisch `.env` van `~/.omniroute/.env` of `./.env`.### VPS Deployment

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

Voor servers met beperkt RAM-geheugen gebruikt u de geheugenlimietoptie:```bash

# With 512MB limit (default)

pm2 start npm --name omniroute -- start

# Or with custom memory limit

OMNIROUTE_MEMORY_MB=512 pm2 start npm --name omniroute -- start

# Or using ecosystem.config.js

pm2 start ecosystem.config.js

````

Maak `ecosystem.config.js` aan:```javascript
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

Voor de host-geïntegreerde modus met CLI-binaire bestanden raadpleegt u de Docker-sectie in de hoofddocumentatie.### Void Linux (xbps-src)

Void Linux-gebruikers kunnen OmniRoute native verpakken en installeren met behulp van het `xbps-src` cross-compilatieframework. Dit automatiseert de standalone build van Node.js samen met de vereiste `better-sqlite3` native bindingen.

<details>
<summary><b>Xbps-src-sjabloon bekijken</b></summary>```bash
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

| Variabel | Standaard | Beschrijving |
| ------------------------------------ | ----------------------------------- | ------------------------------------------------------------------------------------------- |
| `JWT_SECRET` | `omniroute-standaard-geheim-wijzig-mij` | JWT-ondertekeningsgeheim (**productiewijziging**) |
| `INITIAL_PASSWORD` | `123456` | Wachtwoord voor eerste aanmelding |
| `DATA_DIR` | `~/.omniroute` | Gegevensmap (db, gebruik, logs) |
| `POORT` | standaard raamwerk | Servicepoort (`20128` in voorbeelden) |
| `HOSTNAAM` | standaard raamwerk | Bind host (Docker is standaard `0.0.0.0`) |
| `NODE_ENV` | runtime-standaard | Stel `productie` in voor implementatie |
| `BASE_URL` | `http://localhost:20128` | Interne basis-URL aan serverzijde |
| `CLOUD_URL` | `https://omniroute.dev` | Basis-URL van cloudsynchronisatie-eindpunt |
| `API_KEY_SECRET` | `eindpunt-proxy-api-sleutelgeheim` | HMAC-geheim voor gegenereerde API-sleutels |
| `REQUIRE_API_KEY` | `vals` | Bearer API-sleutel afdwingen op `/v1/*` |
| `ALLOW_API_KEY_REVEAL` | `vals` | Sta Api Manager toe om op aanvraag volledige API-sleutels te kopiëren |
| `PROVIDER_LIMITS_SYNC_INTERVAL_MINUTES` | `70` | Verversingsfrequentie aan de serverzijde voor in de cache opgeslagen Provider Limits-gegevens; Knoppen voor het vernieuwen van de gebruikersinterface activeren nog steeds handmatige synchronisatie |
| `DISABLE_SQLITE_AUTO_BACKUP` | `vals` | Schakel automatische SQLite-snapshots uit vóór schrijven/importeren/herstellen; handmatige back-ups werken nog steeds |
| `APP_LOG_TO_FILE`                       | `true`                               | Enables application and audit log output to disk                                                          |
| `AUTH_COOKIE_SECURE` | `vals` | Forceer `Secure` auth-cookie (achter HTTPS reverse proxy) |
| `CLOUDFLARED_BIN` | uitgeschakeld | Gebruik een bestaand `cloudflared` binair bestand in plaats van een beheerde download |
| `CLOUDFLARED_PROTOCOL` | `http2` | Transport voor beheerde Quick Tunnels (`http2`, `quic` of `auto`) |
| `OMNIROUTE_MEMORY_MB` | `512` | Node.js-heaplimiet in MB |
| `PROMPT_CACHE_MAX_SIZE` | `50` | Max. promptcache-items |
| `SEMANTIC_CACHE_MAX_SIZE` | `100` | Max. semantische cache-items |Voor de volledige referentie van de omgevingsvariabelen, zie [README](../README.md).---

## 📊 Available Models

<details>
<summary><b>Bekijk alle beschikbare modellen</b></summary>

**Claude-code (`cc/`)**— Pro/Max: `cc/claude-opus-4-6`, `cc/claude-sonnet-4-5-20250929`, `cc/claude-haiku-4-5-20251001`

**Codex (`cx/`)**— Plus/Pro: `cx/gpt-5.2-codex`, `cx/gpt-5.1-codex-max`

**Gemini CLI (`gc/`)**— GRATIS: `gc/gemini-3-flash-preview`, `gc/gemini-2.5-pro`

**GitHub Copiloot (`gh/`)**: `gh/gpt-5`, `gh/claude-4.5-sonnet`

**GLM (`glm/`)**— $0,6/1 miljoen: `glm/glm-4,7`

**MiniMax (`minimax/`)**— $0,2/1M: `minimax/MiniMax-M2.1`

**Qoder (`if/`)**— GRATIS: `if/kimi-k2-thinking`, `if/qwen3-coder-plus`, `if/deepseek-r1`

**Qwen (`qw/`)**— GRATIS: `qw/qwen3-coder-plus`, `qw/qwen3-coder-flash`

**Kiro (`kr/`)**— GRATIS: `kr/claude-sonnet-4.5`, `kr/claude-haiku-4.5`

**DeepSeek (`ds/`)**: `ds/deepseek-chat`, `ds/deepseek-reasoner`

**Groq (`groq/`)**: `groq/llama-3.3-70b-veelzijdig`, `groq/llama-4-maverick-17b-128e-instruct`

**xAI (`xai/`)**: `xai/grok-4`, `xai/grok-4-0709-snel redeneren`, `xai/grok-code-mini`

**Mistral (`mistral/`)**: `mistral/mistral-groot-2501`, `mistral/codestral-2501`

**Verbijstering (`pplx/`)**: `pplx/sonar-pro`, `pplx/sonar`

**Samen AI (`samen/`)**: `samen/meta-llama/Llama-3.3-70B-Instruct-Turbo`

**Vuurwerk AI (`fireworks/`)**: `fireworks/accounts/fireworks/models/deepseek-v3p1`

**Cerebras (`cerebras/`)**: `cerebras/llama-3.3-70b`

**Cohere (`cohere/`)**: `cohere/command-r-plus-08-2024`

**NVIDIA NIM (`nvidia/`)**: `nvidia/nvidia/llama-3.3-70b-instruct`</details>

---

## 🧩 Advanced Features

### Custom Models

Voeg elke model-ID toe aan elke provider zonder te wachten op een app-update:```bash
# Via API
curl -X POST http://localhost:20128/api/provider-models \
  -H "Content-Type: application/json" \
  -d '{"provider": "openai", "modelId": "gpt-4.5-preview", "modelName": "GPT-4.5 Preview"}'

# List: curl http://localhost:20128/api/provider-models?provider=openai
# Remove: curl -X DELETE "http://localhost:20128/api/provider-models?provider=openai&model=gpt-4.5-preview"
````

Of gebruik Dashboard:**Aanbieders → [Aanbieder] → Aangepaste modellen**.

Opmerkingen:

- OpenRouter en OpenAI/Anthropic-compatibele providers worden uitsluitend beheerd vanuit**Beschikbare modellen**. Handmatig toevoegen, importeren en automatisch synchroniseren komen allemaal in dezelfde lijst met beschikbare modellen terecht, dus er is geen aparte sectie Aangepaste modellen voor die providers.
- De sectie**Aangepaste modellen**is bedoeld voor providers die geen beheerde import van beschikbare modellen beschikbaar stellen.### Dedicated Provider Routes

Routeer verzoeken rechtstreeks naar een specifieke provider met modelvalidatie:```bash
POST http://localhost:20128/v1/providers/openai/chat/completions
POST http://localhost:20128/v1/providers/openai/embeddings
POST http://localhost:20128/v1/providers/fireworks/images/generations

````

Het providervoorvoegsel wordt automatisch toegevoegd als het ontbreekt. Niet-overeenkomende modellen retourneren '400'.### Network Proxy Configuration

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

**Voorrang:**Sleutelspecifiek → Combospecifiek → Providerspecifiek → Globaal → Omgeving.### Model Catalog API

```bash
curl http://localhost:20128/api/models/catalog
```

Retourneert modellen gegroepeerd op provider met typen (`chat`, `embedding`, `image`).### Cloud Sync

- Synchroniseer providers, combo's en instellingen op verschillende apparaten
- Automatische achtergrondsynchronisatie met time-out + fail-fast
- Geef de voorkeur aan `BASE_URL`/`CLOUD_URL` aan de serverzijde in productie### Cloudflare Quick Tunnel

- Beschikbaar in**Dashboard → Eindpunten**voor Docker en andere zelf-gehoste implementaties
- Creëert een tijdelijke `https://*.trycloudflare.com` URL die doorstuurt naar uw huidige OpenAI-compatibele `/v1` eindpunt
- Schakel eerst de installatie 'cloudflared' alleen in als dat nodig is; herstart later en hergebruikt hetzelfde beheerde binaire bestand
- Quick Tunnels worden niet automatisch hersteld na een herstart van OmniRoute of een container; schakel ze indien nodig opnieuw in vanaf het dashboard
- Tunnel-URL's zijn kortstondig en veranderen elke keer dat u de tunnel stopt/start
- Beheerde Quick Tunnels gebruiken standaard HTTP/2-transport om luidruchtige QUIC UDP-bufferwaarschuwingen in beperkte containers te voorkomen
- Stel `CLOUDFLARED_PROTOCOL=quic` of `auto` in als u de beheerde transportkeuze wilt overschrijven
- Stel `CLOUDFLARED_BIN` in als u liever een vooraf geïnstalleerd `cloudflared` binair bestand gebruikt in plaats van de beheerde download### LLM Gateway Intelligence (Phase 9)

-**Semantische cache**— Auto-caches van niet-streaming, temperatuur=0 reacties (omzeilen met `X-OmniRoute-No-Cache: true`) -**Request Idempotency**— Ontdubbelt verzoeken binnen 5 seconden via de header 'Idempotency-Key' of 'X-Request-Id' -**Voortgang bijhouden**— Meld u aan voor SSE `event: progress`-gebeurtenissen via `X-OmniRoute-Progress: true` header---

### Translator Playground

Toegang via**Dashboard → Vertaler**. Debug en visualiseer hoe OmniRoute API-verzoeken tussen providers vertaalt.

| Modus           | Doel                                                                                                  |
| --------------- | ----------------------------------------------------------------------------------------------------- |
| **Speeltuin**   | Selecteer bron-/doelformaten, plak een verzoek en bekijk direct de vertaalde uitvoer                  |
| **Chattester**  | Stuur livechatberichten via de proxy en inspecteer de volledige aanvraag/antwoordcyclus               |
| **Proefbank**   | Voer batchtests uit voor meerdere formaatcombinaties om de juistheid van de vertalingen te verifiëren |
| **Livemonitor** | Bekijk realtime vertalingen terwijl verzoeken via de proxy                                            |

**Gebruiksscenario's:**

- Debug waarom een specifieke client/provider-combinatie mislukt
- Controleer of denktags, tooloproepen en systeemprompts correct worden vertaald
- Vergelijk formaatverschillen tussen OpenAI-, Claude-, Gemini- en Responses API-formaten---

### Routing Strategies

Configureer via**Dashboard → Instellingen → Routing**.

| Strategie                        | Beschrijving                                                                                                                          |
| -------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------- |
| **Eerst invullen**               | Gebruikt accounts in volgorde van prioriteit: het primaire account handelt alle verzoeken af ​​totdat deze niet meer beschikbaar zijn |
| **Ronde Robin**                  | Bladert door alle accounts met een configureerbare sticky limiet (standaard: 3 oproepen per account)                                  |
| **P2C (Kracht van twee keuzes)** | Kiest 2 willekeurige accounts en routes naar de gezondere – balanceert de belasting met bewustzijn van de gezondheid                  |
| **Willekeurig**                  | Selecteert willekeurig een account voor elk verzoek met behulp van Fisher-Yates shuffle                                               |
| **Minst gebruikt**               | Routes naar het account met het oudste `lastUsedAt`-tijdstempel, waarbij het verkeer gelijkmatig wordt verdeeld                       |
| **Kostengeoptimaliseerd**        | Routes naar het account met de laagste prioriteitswaarde, geoptimaliseerd voor providers met de laagste kosten                        | #### External Sticky Session Header |

Voor externe sessie-affiniteit (bijvoorbeeld Claude Code/Codex-agenten achter omgekeerde proxy's), verzendt u:```http
X-Session-Id: your-session-key

````

OmniRoute accepteert ook `x_session_id` en retourneert de effectieve sessiesleutel in `X-OmniRoute-Session-Id`.

Als u Nginx gebruikt en headers in onderstrepingsformulier verzendt, schakelt u het volgende in:```nginx
underscores_in_headers on;
````

#### Wildcard Model Aliases

Maak jokertekenpatronen om modelnamen opnieuw toe te wijzen:```
Pattern: claude-sonnet-_ → Target: cc/claude-sonnet-4-5-20250929
Pattern: gpt-_ → Target: gh/gpt-5.1-codex

````

Jokertekens ondersteunen `*` (willekeurige tekens) en `?` (enkel teken).#### Fallback Chains

Definieer globale fallback-ketens die op alle verzoeken van toepassing zijn:```
Chain: production-fallback
  1. cc/claude-opus-4-6
  2. gh/gpt-5.1-codex
  3. glm/glm-4.7
````

---

### Resilience & Circuit Breakers

Configureer via**Dashboard → Instellingen → Veerkracht**.

OmniRoute implementeert veerkracht op providerniveau met vier componenten:

1.**Providerprofielen**— Configuratie per provider voor:

- Foutdrempel (hoeveel fouten vóór opening)
- Cooldown-duur
- Snelheidslimietdetectiegevoeligheid
- Exponentiële uitstelparameters

  2.**Bewerkbare tarieflimieten**— Standaardinstellingen op systeemniveau configureerbaar in het dashboard: -**Verzoeken per minuut (RPM)**— Maximaal aantal verzoeken per minuut per account -**Min. tijd tussen verzoeken**— Minimale pauze in milliseconden tussen verzoeken -**Max. gelijktijdige verzoeken**— Maximaal gelijktijdige verzoeken per account

- Klik op**Bewerken**om te wijzigen en vervolgens op**Opslaan**of**Annuleren**. Waarden blijven behouden via de veerkracht-API.

  3.**Circuit Breaker**— Volgt storingen per provider en opent automatisch het circuit wanneer een drempel wordt bereikt: -**GESLOTEN**(Gezond) — Verzoeken stromen normaal door -**OPEN**— Provider is tijdelijk geblokkeerd na herhaalde fouten -**HALF_OPEN**— Testen of de provider is hersteld

  4.**Beleid en vergrendelde identificatiegegevens**— Toont de status van de stroomonderbreker en vergrendelde identificatiegegevens met de mogelijkheid tot geforceerd ontgrendelen.

  5.**Automatische detectie van snelheidslimiet**— Controleert de headers '429' en 'Retry-After' om proactief te voorkomen dat de tarieflimieten van de provider worden overschreden.

**Pro-tip:**Gebruik de knop**Alles resetten**om alle stroomonderbrekers en cooldowns te wissen wanneer een provider herstelt van een storing.---

### Database Export / Import

Beheer databaseback-ups in**Dashboard → Instellingen → Systeem en opslag**.

| Actie                          | Beschrijving                                                                                                                                                  |
| ------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------- |
| **Database exporteren**        | Downloadt de huidige SQLite-database als een `.sqlite`-bestand                                                                                                |
| **Alles exporteren (.tar.gz)** | Downloadt een volledig back-uparchief inclusief: database, instellingen, combo's, providerverbindingen (geen inloggegevens), API-sleutelmetagegevens          |
| **Database importeren**        | Upload een `.sqlite`-bestand om de huidige database te vervangen. Er wordt automatisch een pre-importback-up gemaakt tenzij `DISABLE_SQLITE_AUTO_BACKUP=true` | ```bash |

# API: Export database

curl -o backup.sqlite http://localhost:20128/api/db-backups/export

# API: Export all (full archive)

curl -o backup.tar.gz http://localhost:20128/api/db-backups/exportAll

# API: Import database

curl -X POST http://localhost:20128/api/db-backups/import \
 -F "file=@backup.sqlite"

````

**Importvalidatie:**Het geïmporteerde bestand wordt gevalideerd op integriteit (SQLite pragma check), vereiste tabellen (`provider_connections`, `provider_nodes`, `combos`, `api_keys`) en grootte (max. 100 MB).

**Gebruiksscenario's:**

- Migreer OmniRoute tussen machines
- Maak externe back-ups voor noodherstel
- Deel configuraties tussen teamleden (alles exporteren → archief delen)---

### Settings Dashboard

De instellingenpagina is onderverdeeld in 6 tabbladen voor eenvoudige navigatie:

| Tabblad | Inhoud |
| -------------- | ----------------------------------------------------------------------------------- |
|**Algemeen**| Hulpmiddelen voor systeemopslag, weergave-instellingen, themabediening en zichtbaarheid in de zijbalk per item |
|**Beveiliging**| Login-/wachtwoordinstellingen, IP-toegangscontrole, API-authenticatie voor `/modellen` en providerblokkering |
|**Routing**| Globale routeringsstrategie (6 opties), wildcard-modelaliassen, fallback-ketens, combo-standaardwaarden |
|**Veerkracht**| Providerprofielen, bewerkbare tarieflimieten, status van stroomonderbrekers, beleid en vergrendelde identificatiegegevens |
|**AI**| Denken aan budgetconfiguratie, globale systeempromptinjectie, prompt cachestatistieken |
|**Geavanceerd**| Globale proxyconfiguratie (HTTP/SOCKS5) |---

### Costs & Budget Management

Toegang via**Dashboard → Kosten**.

| Tabblad | Doel |
| ----------- | ------------------------------------------------------------------------------ |
|**Begroting**| Stel bestedingslimieten per API-sleutel in met dagelijkse/wekelijkse/maandelijkse budgetten en realtime tracking |
|**Prijzen**| Bekijk en bewerk modelprijsgegevens — kosten per 1K input/output-tokens per provider |```bash
# API: Set a budget
curl -X POST http://localhost:20128/api/usage/budget \
  -H "Content-Type: application/json" \
  -d '{"keyId": "key-123", "limit": 50.00, "period": "monthly"}'

# API: Get current budget status
curl http://localhost:20128/api/usage/budget
````

**Kosten bijhouden:**Bij elk verzoek wordt het tokengebruik geregistreerd en worden de kosten berekend met behulp van de prijstabel. Bekijk de uitsplitsingen in**Dashboard → Gebruik**per provider, model en API-sleutel.---

### Audio Transcription

OmniRoute ondersteunt audiotranscriptie via het OpenAI-compatibele eindpunt:```bash
POST /v1/audio/transcriptions
Authorization: Bearer your-api-key
Content-Type: multipart/form-data

# Example with curl

curl -X POST http://localhost:20128/v1/audio/transcriptions \
 -H "Authorization: Bearer your-api-key" \
 -F "file=@audio.mp3" \
 -F "model=deepgram/nova-3"

````

Beschikbare providers:**Deepgram**(`deepgram/`),**AssemblyAI**(`assemblyai/`).

Ondersteunde audioformaten: `mp3`, `wav`, `m4a`, `flac`, `ogg`, `webm`.---

### Combo Balancing Strategies

Configureer de balans per combo in**Dashboard → Combo's → Maken/bewerken → Strategie**.

| Strategie | Beschrijving |
| ------------------ | ----------------------------------------------------------------- |
|**Round-Robin**| Roteert opeenvolgend door modellen |
|**Prioriteit**| Probeert altijd het eerste model; valt alleen terug op fouten |
|**Willekeurig**| Kiest voor elk verzoek een willekeurig model uit de combo |
|**Gewogen**| Routes proportioneel op basis van toegekende gewichten per model |
|**Minst gebruikt**| Routes naar het model met de minste recente verzoeken (gebruikt combo-statistieken) |
|**Kostengeoptimaliseerd**| Routes naar het goedkoopste beschikbare model (gebruikt prijstabel) |

Algemene combo-standaardinstellingen kunnen worden ingesteld in**Dashboard → Instellingen → Routing → Combo-standaardwaarden**.---

### Health Dashboard

Toegang via**Dashboard → Gezondheid**. Realtime overzicht van de systeemstatus met 6 kaarten:

| Kaart | Wat het laat zien |
| -------------------- | ---------------------------------------------------- |
|**Systeemstatus**| Uptime, versie, geheugengebruik, datadirectory |
|**Provider Gezondheid**| Status stroomonderbreker per provider (gesloten/open/halfopen) |
|**Tarieflimieten**| Actieve afkoelperiodes voor tarieflimieten per account met resterende tijd |
|**Actieve vergrendelingen**| Providers tijdelijk geblokkeerd door het lockoutbeleid |
|**Handtekeningcache**| Deduplicatiecachestatistieken (actieve sleutels, trefpercentage) |
|**Latentietelemetrie**| p50/p95/p99-latentieaggregatie per provider |

**Pro-tip:**De Gezondheidspagina wordt elke 10 seconden automatisch vernieuwd. Gebruik de stroomonderbrekerkaart om te identificeren welke providers problemen ondervinden.---

## 🖥️ Desktop Application (Electron)

OmniRoute is beschikbaar als native desktop-applicatie voor Windows, macOS en Linux.### Installeren

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

Uitvoer → `elektron/dist-elektron/`### Key Features

| Kenmerk                       | Beschrijving                                                             |
| ----------------------------- | ------------------------------------------------------------------------ | ------------------------- |
| **Servergereedheid**          | Pollt de server voordat het venster wordt weergegeven (geen leeg scherm) |
| **Systeemvak**                | Minimaliseren naar lade, poort wijzigen, afsluiten vanuit lademenu       |
| **Havenbeheer**               | Serverpoort vanuit lade wijzigen (server automatisch opnieuw opstarten)  |
| **Inhoudsbeveiligingsbeleid** | Beperkende CSP via sessieheaders                                         |
| **Enkel exemplaar**           | Er kan slechts één app-exemplaar tegelijk worden uitgevoerd              |
| **Offlinemodus**              | Gebundelde Next.js-server werkt zonder internet                          | ### Environment Variables |

| Variabel              | Standaard | Beschrijving                     |
| --------------------- | --------- | -------------------------------- |
| `OMNIROUTE_PORT`      | `20128`   | Serverpoort                      |
| `OMNIROUTE_MEMORY_MB` | `512`     | Node.js-heaplimiet (64–16384 MB) |

📖 Volledige documentatie: [`electron/README.md`](../electron/README.md)
