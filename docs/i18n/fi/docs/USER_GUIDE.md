# User Guide (Suomi)

🌐 **Languages:** 🇺🇸 [English](../../../../docs/USER_GUIDE.md) · 🇪🇸 [es](../../es/docs/USER_GUIDE.md) · 🇫🇷 [fr](../../fr/docs/USER_GUIDE.md) · 🇩🇪 [de](../../de/docs/USER_GUIDE.md) · 🇮🇹 [it](../../it/docs/USER_GUIDE.md) · 🇷🇺 [ru](../../ru/docs/USER_GUIDE.md) · 🇨🇳 [zh-CN](../../zh-CN/docs/USER_GUIDE.md) · 🇯🇵 [ja](../../ja/docs/USER_GUIDE.md) · 🇰🇷 [ko](../../ko/docs/USER_GUIDE.md) · 🇸🇦 [ar](../../ar/docs/USER_GUIDE.md) · 🇮🇳 [hi](../../hi/docs/USER_GUIDE.md) · 🇮🇳 [in](../../in/docs/USER_GUIDE.md) · 🇹🇭 [th](../../th/docs/USER_GUIDE.md) · 🇻🇳 [vi](../../vi/docs/USER_GUIDE.md) · 🇮🇩 [id](../../id/docs/USER_GUIDE.md) · 🇲🇾 [ms](../../ms/docs/USER_GUIDE.md) · 🇳🇱 [nl](../../nl/docs/USER_GUIDE.md) · 🇵🇱 [pl](../../pl/docs/USER_GUIDE.md) · 🇸🇪 [sv](../../sv/docs/USER_GUIDE.md) · 🇳🇴 [no](../../no/docs/USER_GUIDE.md) · 🇩🇰 [da](../../da/docs/USER_GUIDE.md) · 🇫🇮 [fi](../../fi/docs/USER_GUIDE.md) · 🇵🇹 [pt](../../pt/docs/USER_GUIDE.md) · 🇷🇴 [ro](../../ro/docs/USER_GUIDE.md) · 🇭🇺 [hu](../../hu/docs/USER_GUIDE.md) · 🇧🇬 [bg](../../bg/docs/USER_GUIDE.md) · 🇸🇰 [sk](../../sk/docs/USER_GUIDE.md) · 🇺🇦 [uk-UA](../../uk-UA/docs/USER_GUIDE.md) · 🇮🇱 [he](../../he/docs/USER_GUIDE.md) · 🇵🇭 [phi](../../phi/docs/USER_GUIDE.md) · 🇧🇷 [pt-BR](../../pt-BR/docs/USER_GUIDE.md) · 🇨🇿 [cs](../../cs/docs/USER_GUIDE.md) · 🇹🇷 [tr](../../tr/docs/USER_GUIDE.md)

---

Täydellinen opas palveluntarjoajien määrittämiseen, yhdistelmien luomiseen, CLI-työkalujen integrointiin ja OmniRouten käyttöönottoon.---

## Table of Contents

- [Hinnoittelu yhdellä silmäyksellä](#-pricing-at-a-glance)
- [Käyttötapaukset](#-käyttötapausta)
- [Provider Setup](#-provider-setup)
- [CLI-integrointi](#-cli-integraatio)
- [Käyttöönotto](#-käyttöönotto)
- [Saatavilla olevat mallit](#-käytettävissä olevaa-mallia)
- [Lisäominaisuudet](#-lisäominaisuuksia)---

## 💰 Pricing at a Glance

| Taso             | Palveluntarjoaja  | Kustannukset         | Kiintiön nollaus       | Paras                      |
| ---------------- | ----------------- | -------------------- | ---------------------- | -------------------------- |
| **💳 TILAUS**    | Claude Code (Pro) | 20 dollaria/kk       | 5h + viikoittain       | jo tilattu                 |
|                  | Codex (Plus/Pro)  | 20-200 $/kk          | 5h + viikoittain       | OpenAI-käyttäjät           |
|                  | Gemini CLI        | **ILMAINEN**         | 180 tk/kk + 1 tk/päivä | Kaikki!                    |
|                  | GitHub Copilot    | 10-19 $/kk           | Kuukausittain          | GitHub-käyttäjät           |
| **🔑 API-AVAIN** | DeepSeek          | Maksu per käyttö     | Ei yhtään              | Halpa perustelu            |
|                  | Groq              | Maksu per käyttö     | Ei yhtään              | Erittäin nopea johtopäätös |
|                  | xAI (Grok)        | Maksu per käyttö     | Ei yhtään              | Grok 4 perustelut          |
|                  | Mistral           | Maksu per käyttö     | Ei yhtään              | EU:n isännöimät mallit     |
|                  | Hämmennys         | Maksu per käyttö     | Ei yhtään              | Haku-lisätty               |
|                  | Yhdessä AI        | Maksu per käyttö     | Ei yhtään              | Avoimen lähdekoodin mallit |
|                  | Ilotulitus AI     | Maksu per käyttö     | Ei yhtään              | Nopeat FLUX-kuvat          |
|                  | Aivot             | Maksu per käyttö     | Ei yhtään              | Kiekon mittakaavanopeus    |
|                  | Cohere            | Maksu per käyttö     | Ei yhtään              | Komento R+ RAG             |
|                  | NVIDIA NIM        | Maksu per käyttö     | Ei yhtään              | Yritysmallit               |
| **💰 EDULLISET** | GLM-4.7           | 0,6 $/1 milj.        | Päivittäin klo 10      | Budjetin varmuuskopio      |
|                  | MiniMax M2.1      | 0,2 $/1 milj.        | 5 tunnin rullaus       | Halvin vaihtoehto          |
|                  | Kimi K2           | 9 dollaria/kk asunto | 10 milj. rahakkeita/kk | Ennustettavat kustannukset |
| **🆓 ILMAINEN**  | Qoder             | 0 dollaria           | Rajoittamaton          | 8 mallia ilmaiseksi        |
|                  | Qwen              | 0 dollaria           | Rajoittamaton          | 3 mallia ilmaiseksi        |
|                  | Kiro              | 0 dollaria           | Rajoittamaton          | Claude ilmaiseksi          |

**💡 Pro-vinkki:**Aloita Gemini CLI:llä (180 000 ilmaista kuukaudessa) + Qoder (rajoittamaton ilmainen) -yhdistelmä = 0 dollarin hinta!---

## 🎯 Use Cases

### Case 1: "I have Claude Pro subscription"

**Ongelma:**Kiintiö vanhenee käyttämättä, nopeusrajoitukset raskaan koodauksen aikana```
Combo: "maximize-claude"

1. cc/claude-opus-4-6 (use subscription fully)
2. glm/glm-4.7 (cheap backup when quota out)
3. if/kimi-k2-thinking (free emergency fallback)

Monthly cost: $20 (subscription) + ~$5 (backup) = $25 total
vs. $20 + hitting limits = frustration

````

### Case 2: "I want zero cost"

**Ongelma:**Ei ole varaa tilauksiin, tarvitaan luotettavaa tekoälykoodausta```
Combo: "free-forever"
  1. gc/gemini-3-flash         (180K free/month)
  2. if/kimi-k2-thinking       (unlimited free)
  3. qw/qwen3-coder-plus       (unlimited free)

Monthly cost: $0
Quality: Production-ready models
````

### Case 3: "I need 24/7 coding, no interruptions"

**Ongelma:**Määräajat, seisokkeihin ei ole varaa```
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

**Ongelma:**Tarvitset AI-avustajan viestisovelluksissa, täysin ilmainen```
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

**Provinkki:**Käytä Opusta monimutkaisiin tehtäviin ja Sonnetia nopeutta varten. OmniRoute jäljityskiintiö mallia kohti!#### OpenAI Codex (Plus/Pro)

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

**Paras hinta-laatusuhde:**Valtava ilmainen taso! Käytä tätä ennen maksettuja tasoja.#### GitHub Copilot

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

1. Rekisteröidy: [Zhipu AI](https://open.bigmodel.cn/)
2. Hanki API-avain Coding Planista
3. Hallintapaneeli → Lisää API-avain: Palveluntarjoaja: "glm", API-avain: "oma-avain"

**Käytä:**`glm/glm-4.7` —**Provinkki:**Coding Plan tarjoaa 3× kiintiön 1/7 hinnalla! Nollaa päivittäin klo 10.00.#### MiniMax M2.1 (5h reset, $0.20/1M)

1. Rekisteröidy: [MiniMax](https://www.minimax.io/)
2. Hanki API-avain → Dashboard → Add API Key

**Käytä:**`minimax/MiniMax-M2.1` —**Pro-vinkki:**Halvin vaihtoehto pitkälle kontekstille (1 miljoonaa merkkiä)!#### Kimi K2 ($9/month flat)

1. Tilaa: [Moonshot AI](https://platform.moonshot.ai/)
2. Hanki API-avain → Dashboard → Add API Key

**Käyttö:**`kimi/kimi-latest` —**Ammattilaisen vinkki:**Kiinteä 9 dollaria kuukaudessa 10 miljoonalle tokenille = 0,90 dollaria / 1 miljoona todellista hintaa!### 🆓 FREE Providers

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

Muokkaa `~/.claude/config.json`:```json
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

Muokkaa `~/.openclaw/openclaw.json`:```json
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

**Tai käytä Dashboardia:**CLI Tools → OpenClaw → Auto-config### Cline / Continue / RooCode

```

Provider: OpenAI Compatible
Base URL: http://localhost:20128/v1
API Key: [from dashboard]
Model: cc/claude-opus-4-6

````

---

## Käyttöönotto

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

CLI lataa automaattisesti .env-tiedoston osoitteesta ~/.omniroute/.env tai ./.env.### VPS Deployment

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

Palvelimissa, joissa on rajoitettu RAM-muisti, käytä muistirajoitusvaihtoehtoa:```bash

# With 512MB limit (default)

pm2 start npm --name omniroute -- start

# Or with custom memory limit

OMNIROUTE_MEMORY_MB=512 pm2 start npm --name omniroute -- start

# Or using ecosystem.config.js

pm2 start ecosystem.config.js

````

Luo "ecosystem.config.js":```javascript
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

Katso isäntäintegroitu tila CLI-binaarien kanssa pääasiakirjojen Docker-osiosta.### Void Linux (xbps-src)

Void Linux -käyttäjät voivat pakata ja asentaa OmniRouten natiivisti käyttämällä `xbps-src` -ristikäännöskehystä. Tämä automatisoi Node.js:n itsenäisen koontiversion sekä tarvittavat "better-sqlite3" -natiivisidokset.

<tiedot>
<summary><b>Näytä xbps-src-malli</b></summary>```bash
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

| Muuttuja | Oletus | Kuvaus |
| ---------------------------------------- | ------------------------------------- | --------------------------------------------------------------------------------------------------- |
| "JWT_SECRET" | `omniroute-default-secret-change-me` | JWT:n allekirjoitussalaisuus (**muutos tuotannossa**) |
| `ALKU_SALASANA` | "123456" | Ensimmäisen kirjautumisen salasana |
| `DATA_DIR` | `~/.omniroute` | Tietohakemisto (db, käyttö, lokit) |
| "PORTTI" | oletuskehys | Huoltoportti (`20128` esimerkeissä) |
| `HOSTNAME` | oletuskehys | Sido isäntä (Dockerin oletusarvo on `0.0.0.0`) |
| "NODE_ENV" | ajonaikainen oletus | Aseta "tuotanto" käyttöönotolle |
| "BASE_URL" | `http://localhost:20128` | Palvelinpuolen sisäinen perus-URL |
| `CLOUD_URL` | `https://omniroute.dev` | Pilvisynkronoinnin päätepisteen perus-URL |
| "API_KEY_SECRET" | `endpoint-proxy-api-key-secret` | Luotujen API-avaimien HMAC-salaisuus |
| `REQUIRE_API_KEY` | "väärä" | Pakota Bearer API-avain `/v1/*` |
| `ALLOW_API_KEY_REVEAL` | `väärä` | Salli Api Managerin kopioida täydet API-avaimet pyynnöstä |
| `PROVIDER_LIMITS_SYNC_INTERVAL_MINUTES' | "70" | Palvelinpuolen päivitystiheys välimuistissa oleville palveluntarjoajan rajoitustiedoille; Käyttöliittymän päivityspainikkeet käynnistävät edelleen manuaalisen synkronoinnin |
| `DISABLE_SQLITE_AUTO_BACKUP` | `väärä` | Poista automaattiset SQLite-vedoskuvat käytöstä ennen kirjoitusta/tuontia/palautusta; manuaaliset varmuuskopiot toimivat edelleen |
| `APP_LOG_TO_FILE`                       | `true`                               | Enables application and audit log output to disk                                                          |
| `AUTH_COOKIE_SECURE` | `väärä` | Pakota "Suojattu" todennuseväste (HTTS:n käänteisen välityspalvelimen takana) |
| "CLOUDFLARED_BIN" | pois käytöstä | Käytä olemassa olevaa "cloudflared"-binaaria hallitun latauksen sijasta |
| `CLOUDFLARED_PROTOCOL' | `http2` | Kuljetus hallituille pikatunneleille ("http2", "quic" tai "auto") |
| `OMNIROUTE_MEMORY_MB` | "512" | Node.js-keon rajoitus megatavuina |
| `PROMPT_CACHE_MAX_SIZE` | "50" | Enimmäiskehotteet välimuistin merkinnät |
| `SEMANTIC_CACHE_MAX_SIZE` | "100" | Semanttisen välimuistin enimmäismerkinnät |Täydellinen ympäristömuuttujaviittaus on kohdassa [README](../README.md).---

## 📊 Available Models

<tiedot>
<summary><b>Näytä kaikki saatavilla olevat mallit</b></summary>

**Claude Code (`cc/`)**— Pro/Max: `cc/claude-opus-4-6`, `cc/claude-sonnet-4-5-20250929`, `cc/claude-haiku-4-5-20251001`

**Koodi (`cx/`)**— Plus/Pro: `cx/gpt-5.2-codex`, `cx/gpt-5.1-codex-max`

**Gemini CLI (`gc/`)**— ILMAISEKSI: "gc/gemini-3-flash-preview", "gc/gemini-2.5-pro"

**GitHub Copilot (gh/`)**: gh/gpt-5, gh/claude-4.5-sonnet

**GLM (`glm/`)**– 0,6 $/1 milj.: "glm/glm-4,7"

**MiniMax (`minimax/`)**— 0,2 $/1 milj.: `minimax/MiniMax-M2.1`

**Qoder (`if/`)**— ILMAISEKSI: "if/kimi-k2-thinking", "if/qwen3-coder-plus", "if/deepseek-r1"

**Qwen (`qw/`)**— ILMAISEKSI: "qw/qwen3-coder-plus", "qw/qwen3-coder-flash"

**Kiro (`kr/`)**— ILMAISEKSI: `kr/claude-sonnet-4,5`, `kr/claude-haiku-4,5`

**DeepSeek (`ds/`)**: `ds/deepseek-chat, `ds/deepseek-reasoner`

**Groq ("groq/")**: "groq/llama-3.3-70b-versatile", "groq/llama-4-maverick-17b-128e-instruct"

**xAI (`xai/`)**: "xai/grok-4", "xai/grok-4-0709-fast-reasoning", "xai/grok-code-mini"

**Mistral (`mistral/`)**: `mistral/mistral-large-2501`, `mistral/codestral-2501`

**Hämmitys ("pplx/")**: "pplx/sonar-pro", "pplx/sonar"

**Together AI (`together/`)**: `together/meta-llama/Llama-3.3-70B-Instruct-Turbo`

**Fireworks AI ("fireworks/")**: "fireworks/accounts/fireworks/models/deepseek-v3p1"

**Cerebras (`cerebras/`)**: `cerebras/laama-3,3-70b`

**Cohere (`cohere/`)**: `cohere/command-r-plus-08-2024`

**NVIDIA NIM (`nvidia/`)**: `nvidia/nvidia/llama-3.3-70b-instruct`</details>

---

## 🧩 Advanced Features

### Custom Models

Lisää mikä tahansa mallitunnus mille tahansa palveluntarjoajalle odottamatta sovelluspäivitystä:```bash
# Via API
curl -X POST http://localhost:20128/api/provider-models \
  -H "Content-Type: application/json" \
  -d '{"provider": "openai", "modelId": "gpt-4.5-preview", "modelName": "GPT-4.5 Preview"}'

# List: curl http://localhost:20128/api/provider-models?provider=openai
# Remove: curl -X DELETE "http://localhost:20128/api/provider-models?provider=openai&model=gpt-4.5-preview"
````

Tai käytä Dashboardia:**Providers → [Provider] → Custom Models**.

Huomautuksia:

- OpenRouter- ja OpenAI/Anthropic-yhteensopivia palveluntarjoajia hallitaan vain**Saatavilla olevista malleista**. Manuaalinen lisääminen, tuonti ja automaattinen synkronointi ovat kaikki samassa käytettävissä olevien mallien luettelossa, joten näille palveluntarjoajille ei ole erillistä mukautetut mallit -osiota. -**Mukautetut mallit**-osio on tarkoitettu palveluntarjoajille, jotka eivät paljasta hallittujen käytettävissä olevien mallien tuontia.### Dedicated Provider Routes

Reititä pyynnöt suoraan tietylle palveluntarjoajalle mallin validoinnilla:```bash
POST http://localhost:20128/v1/providers/openai/chat/completions
POST http://localhost:20128/v1/providers/openai/embeddings
POST http://localhost:20128/v1/providers/fireworks/images/generations

````

Palveluntarjoajan etuliite lisätään automaattisesti, jos se puuttuu. Yhteensopimattomat mallit palauttavat "400".### Network Proxy Configuration

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

**Ensisijaisuus:**Avainkohtainen → Yhdistelmäkohtainen → Palveluntarjoajakohtainen → Globaali → Ympäristö.### Model Catalog API

```bash
curl http://localhost:20128/api/models/catalog
```

Palauttaa mallit, jotka on ryhmitelty palveluntarjoajan mukaan tyypeillä ("chat", "embedding", "image").### Cloud Sync

- Synkronoi palveluntarjoajat, yhdistelmät ja asetukset eri laitteiden välillä
- Automaattinen taustasynkronointi aikakatkaisulla + Fast Fast
- Suosi palvelinpuolen BASE_URL-/CLOUD_URL-osoitetta tuotannossa### Cloudflare Quick Tunnel

- Saatavilla kohdassa**Dashboard → Endpoints**Dockeria ja muita itseisännöityjä käyttöönottoja varten
- Luo väliaikaisen https://\*.trycloudflare.com-URL-osoitteen, joka ohjaa edelleen nykyiseen OpenAI-yhteensopivaan `/v1-päätepisteeseesi
- Salli ensin asennus "cloudflared" vain tarvittaessa; myöhemmin uudelleenkäynnistys käyttää samaa hallittua binaaritiedostoa uudelleen
- Pikatunneleita ei palauteta automaattisesti OmniRouten tai kontin uudelleenkäynnistyksen jälkeen; ota ne uudelleen käyttöön kojelaudasta tarvittaessa
- Tunnelin URL-osoitteet ovat lyhytaikaisia ja muuttuvat aina, kun pysäytät/aloitat tunnelin
- Hallitut pikatunnelit käyttävät oletuksena HTTP/2-siirtoa meluisten QUIC UDP -puskurivaroitusten välttämiseksi rajoitetuissa säilöissä
- Aseta "CLOUDFLARED_PROTOCOL=quic" tai "auto", jos haluat ohittaa hallitun kuljetusvalinnan
- Aseta CLOUDFLARED_BIN, jos haluat käyttää esiasennettua 'cloudflared'-binaaria hallitun latauksen sijaan### LLM Gateway Intelligence (Phase 9)

-**Semanttinen välimuisti**— Tallentaa automaattisesti välimuistiin ei-suoratoistoa, lämpötila = 0 vastausta (ohita X-OmniRoute-No-Cache: true') -**Request Idempotency**– Poistaa pyyntöjen kaksoiskappaleet 5 sekunnissa "Idempotency-Key"- tai "X-Request-Id"-otsikon kautta -**Edistyksen seuranta**— Ota SSE:n tapahtuma: edistyminen -tapahtumat käyttöön X-OmniRoute-Progress: true -otsikon kautta---

### Translator Playground

Pääsy**Dashboard → Kääntäjän**kautta. Tee virheenkorjaus ja visualisoi, kuinka OmniRoute kääntää API-pyynnöt palveluntarjoajien välillä.

| Tila                      | Tarkoitus                                                                                |
| ------------------------- | ---------------------------------------------------------------------------------------- |
| **Leikkikenttä**          | Valitse lähde-/kohdemuodot, liitä pyyntö ja näet käännetyn tulosteen välittömästi        |
| **Pikaviestien testaaja** | Lähetä live-chat-viestejä välityspalvelimen kautta ja tarkista koko pyyntö-/vastausjakso |
| **Testipenkki**           | Suorita erätestejä useille muotoyhdistelmille varmistaaksesi käännöksen oikeellisuuden   |
| **Live Monitor**          | Katso reaaliaikaisia ​​käännöksiä, kun pyynnöt kulkevat välityspalvelimen kautta         |

**Käyttötapaukset:**

- Selvitä, miksi tietty asiakas/toimittaja-yhdistelmä epäonnistuu
- Varmista, että ajattelutunnisteet, työkalukutsut ja järjestelmäkehotteet käännetään oikein
- Vertaa muotoeroja OpenAI-, Claude-, Gemini- ja Responses API -muotojen välillä---

### Routing Strategies

Määritä kohdasta**Kojelauta → Asetukset → Reititys**.

| Strategia                      | Kuvaus                                                                                                                |
| ------------------------------ | --------------------------------------------------------------------------------------------------------------------- | ----------------------------------- |
| **Täytä ensin**                | Käyttää tilejä tärkeysjärjestyksessä — ensisijainen tili käsittelee kaikki pyynnöt, kunnes ne eivät ole käytettävissä |
| **Round Robin**                | Selaa kaikki tilit, joilla on määritettävissä oleva rajoitus (oletus: 3 puhelua tiliä kohden)                         |
| **P2C (Kahden valinnan teho)** | Valitsee 2 satunnaista tiliä ja reitit terveempään tiliin – tasapainottaa kuormituksen terveystietoisuuden kanssa     |
| **Satunnainen**                | Valitsee satunnaisesti tilin kullekin pyynnölle käyttämällä Fisher-Yates shuffle                                      |
| **Vähiten käytetty**           | Reitit tilille, jolla on vanhin "lastUsedAt" aikaleima, jakaa liikenteen tasaisesti                                   |
| **Kustannusoptimoitu**         | Reitit tilille, jolla on alhaisin prioriteettiarvo, optimointi edullisimpien palveluntarjoajien mukaan                | #### External Sticky Session Header |

Jos kyseessä on ulkoinen istuntosuhde (esimerkiksi Claude Code/Codex-agentit käänteisten välityspalvelinten takana), lähetä:```http
X-Session-Id: your-session-key

````

OmniRoute hyväksyy myös "x_session_id" ja palauttaa voimassa olevan istuntoavaimen kohdassa "X-OmniRoute-Session-Id".

Jos käytät Nginxiä ja lähetät alaviiva-lomakkeen otsikoita, ota käyttöön:```nginx
underscores_in_headers on;
````

#### Wildcard Model Aliases

Luo jokerimerkkikuvioita mallien nimien uudelleen yhdistämiseksi:```
Pattern: claude-sonnet-_ → Target: cc/claude-sonnet-4-5-20250929
Pattern: gpt-_ → Target: gh/gpt-5.1-codex

````

Jokerimerkit tukevat `*` (kaikki merkit) ja `?` (yksi merkki).#### Fallback Chains

Määritä maailmanlaajuiset varaketjut, jotka koskevat kaikkia pyyntöjä:```
Chain: production-fallback
  1. cc/claude-opus-4-6
  2. gh/gpt-5.1-codex
  3. glm/glm-4.7
````

---

### Resilience & Circuit Breakers

Määritä kohdasta**Kojelauta → Asetukset → Resilience**.

OmniRoute toteuttaa toimittajatason joustavuutta neljällä osalla:

1.**Toimittajan profiilit**— Palveluntarjoajakohtainen määritys:

- Vikakynnys (kuinka monta vikaa ennen avaamista)
- Jäähdytyskesto
- Nopeusrajan tunnistusherkkyys
- Eksponentiaaliset peruutusparametrit

  2.**Muokattavat nopeusrajoitukset**— Järjestelmätason oletusasetukset, jotka voidaan määrittää kojelaudassa: -**Pyynnöt minuutissa (RPM)**– Pyyntöjen enimmäismäärä minuutissa per tili -**Pyyntöjen välinen vähimmäisaika**- pyyntöjen välinen vähimmäisero millisekunteina -**Samanaikaisten pyyntöjen enimmäismäärä**— Samanaikaisten pyyntöjen enimmäismäärä tiliä kohden

- Napsauta**Muokkaa**muokataksesi ja sitten**Tallenna**tai**Peruuta**. Arvot säilyvät resilience API:n kautta.

  3.**Circuit Breaker**– Seuraa vikoja palveluntarjoajakohtaisesti ja avaa piirin automaattisesti, kun kynnys saavutetaan: -**SULJETTU**(terve) — Pyynnöt kulkevat normaalisti -**AUKI**— Palveluntarjoaja on tilapäisesti estetty toistuvien vikojen jälkeen -**HALF_OPEN**— Testataan, onko palveluntarjoaja palautunut

  4.**Policies & Locked Identifiers**— Näyttää katkaisijan tilan ja lukitut tunnisteet, joissa on pakko-avaaminen.

  5.**Automaattinen nopeusrajoituksen tunnistus**— Valvoo "429"- ja "Retry-After"-otsikoita välttääkseen ennakoivasti palveluntarjoajan nopeusrajojen ylittymisen.

**Ammattilaisen vinkki:**Käytä**Nollaa kaikki**-painiketta tyhjentääksesi kaikki katkaisijat ja jäähdytykset, kun palveluntarjoaja toipuu katkosta.---

### Database Export / Import

Hallitse tietokannan varmuuskopioita kohdassa**Käyttöpaneeli → Asetukset → Järjestelmä ja tallennus**.

| Toiminta                 | Kuvaus                                                                                                                                                         |
| ------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------- |
| **Vie tietokanta**       | Lataa nykyisen SQLite-tietokannan .sqlite-tiedostona                                                                                                           |
| **Vie kaikki (.tar.gz)** | Lataa täyden varmuuskopioarkiston, joka sisältää: tietokannan, asetukset, yhdistelmät, palveluntarjoajan yhteydet (ei tunnistetietoja), API-avaimen metatiedot |
| **Tuo tietokanta**       | Lataa .sqlite-tiedosto nykyisen tietokannan tilalle. Tuontia edeltävä varmuuskopio luodaan automaattisesti, ellei `DISABLE_SQLITE_AUTO_BACKUP=true`            | ```bash |

# API: Export database

curl -o backup.sqlite http://localhost:20128/api/db-backups/export

# API: Export all (full archive)

curl -o backup.tar.gz http://localhost:20128/api/db-backups/exportAll

# API: Import database

curl -X POST http://localhost:20128/api/db-backups/import \
 -F "file=@backup.sqlite"

````

**Tuonnin vahvistus:**Tuodun tiedoston eheys (SQLite pragma check), vaaditut taulukot (provider_connections, provider_nodes, combos, api_keys) ja koko (enintään 100 Mt) tarkistetaan.

**Käyttötapaukset:**

- Siirrä OmniRoute koneiden välillä
- Luo ulkoisia varmuuskopioita katastrofipalautusta varten
- Jaa kokoonpanot tiimin jäsenten välillä (vie kaikki → jaa arkisto)---

### Settings Dashboard

Asetussivu on järjestetty 6 välilehteen navigoinnin helpottamiseksi:

| Välilehti | Sisältö |
| --------------- | ---------------------------------------------------------------------------------------------- |
|**Yleinen**| Järjestelmän tallennustyökalut, ulkoasuasetukset, teemaohjaimet ja kohdekohtainen sivupalkin näkyvyys |
|**Turvallisuus**| Kirjautumis-/salasana-asetukset, IP-käytön valvonta, API-todennus /mallille ja palveluntarjoajan esto |
|**Reititys**| Globaali reititysstrategia (6 vaihtoehtoa), jokerimerkkimallien aliakset, varaketjut, yhdistelmäoletukset |
|**Kestävyys**| Palveluntarjoajan profiilit, muokattavat nopeusrajoitukset, katkaisijan tila, käytännöt ja lukitut tunnisteet |
|**AI**| Ajatteleva budjettimäärittely, globaali järjestelmäkehote, nopea välimuistitilastot |
|**Lisäasetukset**| Yleiset välityspalvelimen asetukset (HTTP/SOCKS5) |---

### Costs & Budget Management

Pääsy kohdasta**Käyttöpaneeli → Kulut**.

| Välilehti | Tarkoitus |
| ----------- | ----------------------------------------------------------------------------------------- |
|**Budjetti**| Aseta kulutusrajat API-avaimelle päivä-/viikko-/kuukausibudjeteilla ja reaaliaikaisella seurannalla |
|**Hinnoittelu**| Tarkastele ja muokkaa mallin hinnoittelumerkintöjä – hinta per 1 000 syöttö-/tulostustunnusta toimittajaa kohti |```bash
# API: Set a budget
curl -X POST http://localhost:20128/api/usage/budget \
  -H "Content-Type: application/json" \
  -d '{"keyId": "key-123", "limit": 50.00, "period": "monthly"}'

# API: Get current budget status
curl http://localhost:20128/api/usage/budget
````

**Kustannusten seuranta:**Jokainen pyyntö kirjaa tunnuksen käytön ja laskee kustannukset hinnoittelutaulukon avulla. Näytä erittelyt kohdassa**Käyttöpaneeli → Käyttö**tarjoajan, mallin ja API-avaimen mukaan.---

### Audio Transcription

OmniRoute tukee äänen transkriptiota OpenAI-yhteensopivan päätepisteen kautta:```bash
POST /v1/audio/transcriptions
Authorization: Bearer your-api-key
Content-Type: multipart/form-data

# Example with curl

curl -X POST http://localhost:20128/v1/audio/transcriptions \
 -H "Authorization: Bearer your-api-key" \
 -F "file=@audio.mp3" \
 -F "model=deepgram/nova-3"

````

Saatavilla olevat palveluntarjoajat:**Deepgram**(`deepgram/`),**AssemblyAI**(`assemblyai/`).

Tuetut äänimuodot: "mp3", "wav", "m4a", "flac", "ogg", "webm".---

### Combo Balancing Strategies

Määritä yhdistelmäkohtainen tasapainotus kohdassa**Käyttöpaneeli → Yhdistelmät → Luo/muokkaa → Strategia**.

| Strategia | Kuvaus |
| ------------------- | ------------------------------------------------------------------------- |
|**Round-Robin**| Pyörii mallien välillä peräkkäin |
|**Etusija**| Kokeilee aina ensimmäistä mallia; palautuu vain virheen yhteydessä |
|**Satunnainen**| Valitsee satunnaisen mallin yhdistelmästä jokaiselle pyynnölle |
|**Painotettu**| Reitit suhteellisesti mallikohtaisten painojen perusteella |
|**Vähiten käytetty**| Reitit malliin, jolla on vähiten viimeaikaisia ​​pyyntöjä (käyttää yhdistelmämittareita) |
|**Kustannusoptimoitu**| Reitit halvimpaan saatavilla olevaan malliin (käyttää hinnoittelutaulukkoa) |

Yleiset yhdistelmäoletukset voidaan asettaa kohdassa**Kojelauta → Asetukset → Reititys → Yhdistelmäoletukset**.---

### Health Dashboard

Pääsy kohdasta**Dashboard → Health**. Reaaliaikainen järjestelmän kunnon yleiskatsaus 6 kortilla:

| Kortti | Mitä se näyttää |
| ---------------------- | ------------------------------------------------------------ |
|**Järjestelmän tila**| Käyttöaika, versio, muistin käyttö, tietohakemisto |
|**Tarjoajan terveys**| Palveluntarjoajakohtainen katkaisijan tila (suljettu/auki/puoliauki) |
|**Rate Limits**| Aktiivisen nopeuden rajan viilennyksiä tiliä kohti jäljellä olevan ajan kanssa |
|**Aktiiviset lukitukset**| Palveluntarjoajat, jotka on tilapäisesti estetty lukituskäytännön vuoksi |
|**Allekirjoitusvälimuisti**| Päällekkäisyyden poistamisen välimuistitilastot (aktiiviset avaimet, osumaprosentti) |
|**Viiveen telemetria**| p50/p95/p99 latenssin yhteenlaskettu palveluntarjoajakohtainen |

**Provinkki:**Terveys-sivu päivittyy automaattisesti 10 sekunnin välein. Käytä katkaisijakorttia tunnistaaksesi, millä palveluntarjoajilla on ongelmia.---

## 🖥️ Desktop Application (Electron)

OmniRoute on saatavana alkuperäisenä työpöytäsovelluksena Windowsille, macOS:lle ja Linuxille.### Asenna

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

Tulos → `electron/dist-electron/`### Key Features

| Ominaisuus                   | Kuvaus                                                                            |
| ---------------------------- | --------------------------------------------------------------------------------- | ------------------------- |
| **Palvelimen valmius**       | Kyselypalvelin ennen ikkunan näyttämistä (ei tyhjää näyttöä)                      |
| **Järjestelmälokero**        | Pienennä lokeroon, vaihda porttia, sulje lokerovalikosta                          |
| **Satamien hallinta**        | Vaihda palvelinportti alustasta (käynnistää palvelimen automaattisesti uudelleen) |
| **Sisällön suojauskäytäntö** | Rajoittava CSP istunnon otsikoiden kautta                                         |
| **Yksittäinen esiintymä**    | Vain yksi sovellusesiintymä voi toimia kerrallaan                                 |
| **Offline-tila**             | Mukana oleva Next.js-palvelin toimii ilman Internetiä                             | ### Environment Variables |

| Muuttuja              | Oletus  | Kuvaus                          |
| --------------------- | ------- | ------------------------------- |
| "OMNIROUTE_PORT"      | "20128" | Palvelinportti                  |
| `OMNIROUTE_MEMORY_MB` | "512"   | Node.js-keon raja (64–16384 Mt) |

📖 Täydellinen dokumentaatio: [`electron/README.md`](../electron/README.md)
