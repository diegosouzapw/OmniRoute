# User Guide (Magyar)

🌐 **Languages:** 🇺🇸 [English](../../../../docs/USER_GUIDE.md) · 🇪🇸 [es](../../es/docs/USER_GUIDE.md) · 🇫🇷 [fr](../../fr/docs/USER_GUIDE.md) · 🇩🇪 [de](../../de/docs/USER_GUIDE.md) · 🇮🇹 [it](../../it/docs/USER_GUIDE.md) · 🇷🇺 [ru](../../ru/docs/USER_GUIDE.md) · 🇨🇳 [zh-CN](../../zh-CN/docs/USER_GUIDE.md) · 🇯🇵 [ja](../../ja/docs/USER_GUIDE.md) · 🇰🇷 [ko](../../ko/docs/USER_GUIDE.md) · 🇸🇦 [ar](../../ar/docs/USER_GUIDE.md) · 🇮🇳 [hi](../../hi/docs/USER_GUIDE.md) · 🇮🇳 [in](../../in/docs/USER_GUIDE.md) · 🇹🇭 [th](../../th/docs/USER_GUIDE.md) · 🇻🇳 [vi](../../vi/docs/USER_GUIDE.md) · 🇮🇩 [id](../../id/docs/USER_GUIDE.md) · 🇲🇾 [ms](../../ms/docs/USER_GUIDE.md) · 🇳🇱 [nl](../../nl/docs/USER_GUIDE.md) · 🇵🇱 [pl](../../pl/docs/USER_GUIDE.md) · 🇸🇪 [sv](../../sv/docs/USER_GUIDE.md) · 🇳🇴 [no](../../no/docs/USER_GUIDE.md) · 🇩🇰 [da](../../da/docs/USER_GUIDE.md) · 🇫🇮 [fi](../../fi/docs/USER_GUIDE.md) · 🇵🇹 [pt](../../pt/docs/USER_GUIDE.md) · 🇷🇴 [ro](../../ro/docs/USER_GUIDE.md) · 🇭🇺 [hu](../../hu/docs/USER_GUIDE.md) · 🇧🇬 [bg](../../bg/docs/USER_GUIDE.md) · 🇸🇰 [sk](../../sk/docs/USER_GUIDE.md) · 🇺🇦 [uk-UA](../../uk-UA/docs/USER_GUIDE.md) · 🇮🇱 [he](../../he/docs/USER_GUIDE.md) · 🇵🇭 [phi](../../phi/docs/USER_GUIDE.md) · 🇧🇷 [pt-BR](../../pt-BR/docs/USER_GUIDE.md) · 🇨🇿 [cs](../../cs/docs/USER_GUIDE.md) · 🇹🇷 [tr](../../tr/docs/USER_GUIDE.md)

---

Teljes útmutató a szolgáltatók konfigurálásához, kombinációk létrehozásához, a CLI-eszközök integrálásához és az OmniRoute telepítéséhez.---

## Table of Contents

- [Árképzés egy pillantással](#-pricing-at-a-glance)
- [Használati esetek](#-használati esetek)
- [Provider Setup](#-provider-setup)
- [CLI-integráció](#-cli-integráció)
- [Bevezetés](#-bevezetés)
- [Elérhető modellek](#-elérhető-modell)
- [Speciális funkciók](#-speciális-szolgáltatás)---

## 💰 Pricing at a Glance

| Tier              | Szolgáltató        | Költség                 | Kvóta visszaállítása   | Legjobb a                       |
| ----------------- | ------------------ | ----------------------- | ---------------------- | ------------------------------- |
| **💳 ELŐFIZETÉS** | Claude Code (Pro)  | 20 USD/hó               | 5 óra + heti           | Már előfizetett                 |
|                   | Codex (Plus/Pro)   | 20-200 USD/hó           | 5 óra + heti           | OpenAI felhasználók             |
|                   | Gemini CLI         | **INGYENES**            | 180 000/hó + 1 000/nap | Mindenki!                       |
|                   | GitHub másodpilóta | 10-19 USD/hó            | Havi                   | GitHub felhasználók             |
| **🔑 API KEY**    | DeepSeek           | Fizetés használatonként | Nincs                  | Olcsó érvelés                   |
|                   | Groq               | Fizetés használatonként | Nincs                  | Ultragyors következtetés        |
|                   | xAI (Grok)         | Fizetés használatonként | Nincs                  | Grok 4 okfejtés                 |
|                   | Mistral            | Fizetés használatonként | Nincs                  | EU-ban működő modellek          |
|                   | Zavartság          | Fizetés használatonként | Nincs                  | Keresés-bővített                |
|                   | Együtt AI          | Fizetés használatonként | Nincs                  | Nyílt forráskódú modellek       |
|                   | Tűzijáték AI       | Fizetés használatonként | Nincs                  | Gyors FLUX képek                |
|                   | Cerebrák           | Fizetés használatonként | Nincs                  | Ostya léptékű sebesség          |
|                   | Cohere             | Fizetés használatonként | Nincs                  | Parancs R+ RAG                  |
|                   | NVIDIA NIM         | Fizetés használatonként | Nincs                  | Vállalati modellek              |
| **💰 OLCSÓ**      | GLM-4.7            | 0,6 USD/1M              | Naponta 10:00          | Költségvetési biztonsági mentés |
|                   | MiniMax M2.1       | 0,2 USD/1M              | 5 órás gurulás         | Legolcsóbb lehetőség            |
|                   | Kimi K2            | 9 USD/hó lakás          | 10 millió token/hó     | Előrelátható költség            |
| **🆓 INGYENES**   | Qoder              | $0                      | Korlátlan              | 8 modell ingyenes               |
|                   | Qwen               | $0                      | Korlátlan              | 3 modell ingyenes               |
|                   | Kiro               | $0                      | Korlátlan              | Claude ingyen                   |

**💡 Pro tipp:**Kezdje a Gemini CLI-vel (180 000 ingyenes/hónap) + Qoder (korlátlan ingyenes) kombináció = 0 USD költség!---

## 🎯 Use Cases

### Case 1: "I have Claude Pro subscription"

**Probléma:**A kvóta lejár, kihasználatlanul, sebességkorlátozások erős kódolás közben```
Combo: "maximize-claude"

1. cc/claude-opus-4-6 (use subscription fully)
2. glm/glm-4.7 (cheap backup when quota out)
3. if/kimi-k2-thinking (free emergency fallback)

Monthly cost: $20 (subscription) + ~$5 (backup) = $25 total
vs. $20 + hitting limits = frustration

````

### Case 2: "I want zero cost"

**Probléma:**Nem engedheti meg magának az előfizetést, megbízható mesterséges intelligencia kódolásra van szüksége```
Combo: "free-forever"
  1. gc/gemini-3-flash         (180K free/month)
  2. if/kimi-k2-thinking       (unlimited free)
  3. qw/qwen3-coder-plus       (unlimited free)

Monthly cost: $0
Quality: Production-ready models
````

### Case 3: "I need 24/7 coding, no interruptions"

**Probléma:**Határidők, nem engedheti meg magának az állásidőt```
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

**Probléma:**AI-asszisztens szükséges az üzenetküldő alkalmazásokhoz, teljesen ingyenes```
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

**Profi tipp:**Használja az Opust összetett feladatokhoz, a Sonnet pedig a sebességhez. Az OmniRoute nyomkövetési kvóta modellenként!#### OpenAI Codex (Plus/Pro)

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

**Legjobb érték:**Hatalmas ingyenes szint! Használja ezt a fizetett szintek előtt.#### GitHub Copilot

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

1. Regisztráljon: [Zhipu AI](https://open.bigmodel.cn/)
2. Szerezze be az API-kulcsot a Coding Plan-ból
3. Irányítópult → API-kulcs hozzáadása: Szolgáltató: "glm", API-kulcs: "saját kulcsa"

**Használat:**`glm/glm-4.7` —**Profi tipp:**A Coding Plan 3× kvótát kínál 1/7 költséggel! Visszaállítás naponta 10:00.#### MiniMax M2.1 (5h reset, $0.20/1M)

1. Regisztráljon: [MiniMax](https://www.minimax.io/)
2. API-kulcs lekérése → Irányítópult → API-kulcs hozzáadása

**Használat:**`minimax/MiniMax-M2.1` —**Profi tipp:**A legolcsóbb lehetőség hosszú kontextushoz (1 millió token)!#### Kimi K2 ($9/month flat)

1. Feliratkozás: [Moonshot AI](https://platform.moonshot.ai/)
2. API-kulcs lekérése → Irányítópult → API-kulcs hozzáadása

**Használat:**`kimi/kimi-latest` —**Profi tipp:**Fix 9 USD/hó 10 millió token esetén = 0,90 USD/1 millió tényleges költség!### 🆓 FREE Providers

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

"~/.claude/config.json" szerkesztése:```json
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

`~/.openclaw/openclaw.json` szerkesztése:```json
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

**Vagy használja az Irányítópultot:**CLI Tools → OpenClaw → Auto-config### Cline / Continue / RooCode

```

Provider: OpenAI Compatible
Base URL: http://localhost:20128/v1
API Key: [from dashboard]
Model: cc/claude-opus-4-6

````

---

## Telepítés

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

A CLI automatikusan betölti az ".env" fájlt a "~/.omniroute/.env" vagy "./.env" állományból.### VPS Deployment

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

Korlátozott RAM-mal rendelkező szerverek esetén használja a memóriakorlátozás opciót:```bash

# With 512MB limit (default)

pm2 start npm --name omniroute -- start

# Or with custom memory limit

OMNIROUTE_MEMORY_MB=512 pm2 start npm --name omniroute -- start

# Or using ecosystem.config.js

pm2 start ecosystem.config.js

````

Hozza létre az `ecosystem.config.js' fájlt:```javascript
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

A CLI binárisokkal rendelkező gazdagépbe integrált módhoz lásd a Docker részt a fő dokumentumokban.### Void Linux (xbps-src)

A Void Linux felhasználók natív módon csomagolhatják és telepíthetik az OmniRoute-ot az `xbps-src` keresztfordítási keretrendszer használatával. Ez automatizálja a Node.js önálló felépítését a szükséges "better-sqlite3" natív kötésekkel együtt.

<részletek>

<summary><b>Xbps-src sablon megtekintése</b></summary>```bash
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

| Változó | Alapértelmezett | Leírás |
| ---------------------------------------- | ------------------------------------- | --------------------------------------------------------------------------------------------------- |
| "JWT_SECRET" | `omniroute-default-secret-change-me` | JWT aláírási titok (**változás a gyártásban**) |
| `INITIAL_PASSWORD` | "123456" | Első bejelentkezési jelszó |
| `DATA_DIR` | `~/.omniroute` | Adatkönyvtár (db, használat, naplók) |
| "KIKÖTŐ" | keretrendszer alapértelmezett | Service port (`20128` in examples)                                                                        |
| `HOSTNAME` | keretrendszer alapértelmezett | Gazda kötése (a Docker alapértelmezett értéke `0.0.0.0`) |
| "NODE_ENV" | futásidejű alapértelmezett | A "gyártás" beállítása a telepítéshez |
| `BASE_URL` | `http://localhost:20128` | Szerveroldali belső alap URL |
| `CLOUD_URL` | `https://omniroute.dev` | Felhőszinkronizálási végpont alap URL-je |
| "API_KEY_SECRET" | `endpoint-proxy-api-key-secret` | HMAC titkos a generált API-kulcsokhoz |
| `REQUIRE_API_KEY` | "hamis" | Bearer API kulcs kényszerítése a `/v1/*` |
| `ALLOW_API_KEY_REVEAL` | "hamis" | Engedélyezze az Api Managernek a teljes API-kulcsok igény szerinti másolását |
| `PROVIDER_LIMITS_SYNC_INTERVAL_MINUTES` | "70" | Szerveroldali frissítési ütem a gyorsítótárazott szolgáltatói korlátok adataihoz; A felhasználói felület frissítő gombjai továbbra is kézi szinkronizálást indítanak el |
| `DISABLE_SQLITE_AUTO_BACKUP` | "hamis" | Az automatikus SQLite pillanatképek letiltása az írás/importálás/visszaállítás előtt; a kézi biztonsági mentések továbbra is működnek |
| `APP_LOG_TO_FILE`                       | `true`                               | Enables application and audit log output to disk                                                          |
| `AUTH_COOKIE_SECURE' | "hamis" | "Biztonságos" hitelesítési cookie kényszerítése (a HTTPS fordított proxy mögött) |
| `CLOUDFLARED_BIN` | beállítva | A felügyelt letöltés helyett használjon egy létező 'cloudflared' bináris fájlt |
| `CLOUDFLARED_PROTOCOL` | `http2` | Felügyelt gyorsalagutak szállítása ("http2", "quic" vagy "auto") |
| `OMNIROUTE_MEMORY_MB` | "512" | Node.js kupackorlát MB-ban |
| `PROMPT_CACHE_MAX_SIZE` | "50" | Max prompt gyorsítótár bejegyzések |
| `SEMANTIC_CACHE_MAX_SIZE` | "100" | Maximális szemantikai gyorsítótár bejegyzések |A teljes környezeti változó hivatkozását a [README](../README.md) részben találja.---

## 📊 Available Models

<részletek>
<summary><b>Az összes elérhető modell megtekintése</b></summary>

**Claude Code (`cc/`)**— Pro/Max: `cc/claude-opus-4-6`, `cc/claude-sonnet-4-5-20250929`, `cc/claude-haiku-4-5-20251001`

**Codex (`cx/`)**— Plus/Pro: `cx/gpt-5.2-codex`, `cx/gpt-5.1-codex-max`

**Gemini CLI ("gc/")**– INGYENES: "gc/gemini-3-flash-preview", "gc/gemini-2.5-pro"

**GitHub másodpilóta ("gh/")**: "gh/gpt-5", "gh/claude-4.5-szonett"

**GLM ("glm/")**– 0,6 USD/1 millió: "glm/glm-4,7"

**MiniMax (`minimax/`)**— 0,2 USD/1 millió: `minimax/MiniMax-M2,1`

**Qoder ("if/")**– INGYENES: "if/kimi-k2-thinking", "if/qwen3-coder-plus", "if/deepseek-r1"

**Qwen ("qw/")**– INGYENES: "qw/qwen3-coder-plus", "qw/qwen3-coder-flash"

**Kiro (`kr/`)**— INGYENES: `kr/claude-szonett-4,5`, `kr/claude-haiku-4,5`

**DeepSeek (`ds/`)**: "ds/deepseek-chat", "ds/deepseek-reasoner"

**Groq ("groq/")**: "groq/llama-3.3-70b-veratile", "groq/llama-4-maverick-17b-128e-instruct"

**xAI ("xai/")**: "xai/grok-4", "xai/grok-4-0709-fast-reasoning", "xai/grok-code-mini"

**Mistral ("mistral/")**: "mistral/mistral-large-2501", "mistral/codestral-2501"

**Perplexity ("pplx/")**: "pplx/sonar-pro", "pplx/sonar"

**Together AI ("together/")**: "together/meta-llama/Llama-3.3-70B-Instruct-Turbo"

**Fireworks AI ("tűzijáték/")**: "fireworks/accounts/fireworks/models/deepseek-v3p1"

**Agy ("cerebras/")**: "cerebras/láma-3,3-70b"

**Cohere ("cohere/")**: "cohere/command-r-plus-08-2024"

**NVIDIA NIM (`nvidia/`)**: `nvidia/nvidia/llama-3.3-70b-instruct`</details>

---

## 🧩 Advanced Features

### Custom Models

Adjon hozzá bármilyen modellazonosítót bármely szolgáltatóhoz anélkül, hogy az alkalmazás frissítésére várna:```bash
# Via API
curl -X POST http://localhost:20128/api/provider-models \
  -H "Content-Type: application/json" \
  -d '{"provider": "openai", "modelId": "gpt-4.5-preview", "modelName": "GPT-4.5 Preview"}'

# List: curl http://localhost:20128/api/provider-models?provider=openai
# Remove: curl -X DELETE "http://localhost:20128/api/provider-models?provider=openai&model=gpt-4.5-preview"
````

Vagy használja az Irányítópultot:**Providers → [Provider] → Custom Models**.

Megjegyzések:

- Az OpenRouter és az OpenAI/Anthropic-kompatibilis szolgáltatók csak az**Elérhető modellekből**kezelhetők. Az összes kézi hozzáadása, importálása és automatikus szinkronizálása ugyanabban az elérhető modelllistában található, így ezeknek a szolgáltatóknak nincs külön egyéni modellek szakasza.
- Az**Egyéni modellek**szakasz azoknak a szolgáltatóknak szól, akik nem teszik közzé a felügyelt elérhető modellek importálását.### Dedicated Provider Routes

A kérések közvetlenül egy adott szolgáltatóhoz irányíthatók modellellenőrzéssel:```bash
POST http://localhost:20128/v1/providers/openai/chat/completions
POST http://localhost:20128/v1/providers/openai/embeddings
POST http://localhost:20128/v1/providers/fireworks/images/generations

````

A szolgáltató előtagja automatikusan hozzáadódik, ha hiányzik. A nem megfelelő modellek „400”-at adnak vissza.### Network Proxy Configuration

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

**Precencia:**Kulcsspecifikus → Kombinált → Szolgáltató-specifikus → Globális → Környezet.### Model Catalog API

```bash
curl http://localhost:20128/api/models/catalog
```

A modelleket szolgáltató szerint csoportosítva adja vissza típusokkal ("csevegés", "beágyazás", "kép").### Cloud Sync

- Szinkronizálja a szolgáltatókat, kombinációkat és beállításokat az eszközök között
- Automatikus háttérszinkronizálás időtúllépéssel + hibamentes
- A szerveroldali "BASE_URL"/"CLOUD_URL" előnyben részesítése éles környezetben### Cloudflare Quick Tunnel

- Elérhető a**Irányítópult → Végpontok**menüpontban a Docker és más saját üzemeltetésű telepítésekhez
- Létrehoz egy ideiglenes „https://\*.trycloudflare.com” URL-t, amely továbbítja a jelenlegi OpenAI-kompatibilis „/v1” végpontot
- Először csak szükség esetén engedélyezze a `cloudflared` telepítését; a későbbi újraindítások újra felhasználják ugyanazt a felügyelt bináris fájlt
- A gyors alagutak nem állnak vissza automatikusan az OmniRoute vagy a tároló újraindítása után; szükség esetén újra engedélyezze őket a műszerfalról
- Az alagút URL-jei rövidek, és minden alkalommal változnak, amikor leállítja/indítja az alagutat
- A felügyelt gyorsalagutak alapértelmezés szerint a HTTP/2-es szállítást használják, hogy elkerüljék a zajos QUIC UDP puffer figyelmeztetéseket a korlátozott tárolókban
- Állítsa be a `CLOUDFLARED_PROTOCOL=quic' vagy `automatikus' értéket, ha felül szeretné bírálni a felügyelt szállítási választást
- Állítsa be a `CLOUDFLARED_BIN' értéket, ha inkább egy előre telepített 'cloudflared' binárist használ a kezelt letöltés helyett### LLM Gateway Intelligence (Phase 9)

-**Szemantikus gyorsítótár**– Automatikus gyorsítótárazás, nem adatfolyam, hőmérséklet = 0 válasz (kihagyás az "X-OmniRoute-No-Cache: true" beállítással) -**Idempotency kérése**– 5 másodpercen belül deduplikálja a kéréseket az "Idempotency-Key" vagy az "X-Request-Id" fejlécen keresztül -**Előrehaladás követése**— SSE "esemény: előrehaladás" események engedélyezése az "X-OmniRoute-Progress: true" fejlécen keresztül---

### Translator Playground

Hozzáférés az**Irányítópult → Fordító**segítségével. Hibakeresés és vizualizálás, hogy az OmniRoute hogyan fordítja le az API-kéréseket a szolgáltatók között.

| mód                   | Cél                                                                                                              |
| --------------------- | ---------------------------------------------------------------------------------------------------------------- |
| **Játszótér**         | Válassza ki a forrás-/célformátumokat, illesszen be egy kérést, és azonnal megtekintheti a lefordított kimenetet |
| **Csevegés tesztelő** | Küldjön élő csevegési üzeneteket a proxyn keresztül, és ellenőrizze a teljes kérés/válasz ciklust                |
| **Próbapad**          | Futtasson kötegelt teszteket több formátumkombinációra a fordítás helyességének ellenőrzéséhez                   |
| **Élő monitor**       | Nézze meg a valós idejű fordításokat, ahogy a kérések a proxyn keresztül áramlanak                               |

**Használati esetek:**

- Hibakeresés, miért nem sikerül egy adott ügyfél/szolgáltató kombináció
- Ellenőrizze, hogy a gondolkodó címkék, az eszközhívások és a rendszerkérések helyesen fordítódnak-e
- Hasonlítsa össze a formátumbeli különbségeket az OpenAI, Claude, Gemini és Responses API formátumok között---

### Routing Strategies

Konfigurálás a**Irányítópult → Beállítások → Útválasztás**menüpontban.

| Stratégia                      | Leírás                                                                                                           |
| ------------------------------ | ---------------------------------------------------------------------------------------------------------------- | ----------------------------------- |
| **Először töltse ki**          | A fiókokat prioritási sorrendben használja – az elsődleges fiók minden kérést kezel, amíg el nem éri             |
| **Round Robin**                | A konfigurálható ragadós korláttal rendelkező összes fiókot végigjárja (alapértelmezett: fiókonként 3 hívás)     |
| **P2C (Power of Two Choices)** | 2 véletlenszerű fiókot választ, és az egészségesebbhez vezet – egyensúlyba hozza a terhelést az egészségtudattal |
| **Véletlen**                   | Véletlenszerűen kiválaszt egy fiókot minden egyes kérelemhez a Fisher-Yates shuffle                              |
| **Legkevésbé használt**        | Útvonalak a legrégebbi "lastUsedAt" időbélyeggel rendelkező fiókhoz, egyenletesen elosztva a forgalmat           |
| **Költségoptimalizált**        | Útvonalak a legalacsonyabb prioritású fiókhoz, a legalacsonyabb költségű szolgáltatókra optimalizálva            | #### External Sticky Session Header |

Külső munkamenet-affinitás esetén (például Claude Code/Codex ügynökök fordított proxyk mögött) küldje el:```http
X-Session-Id: your-session-key

````

Az OmniRoute elfogadja az "x_session_id" paramétert is, és az "X-OmniRoute-Session-Id" mezőben visszaadja a tényleges munkamenet kulcsát.

Ha az Nginxet használja, és aláhúzás-formájú fejléceket küld, engedélyezze:```nginx
underscores_in_headers on;
````

#### Wildcard Model Aliases

Hozzon létre helyettesítő karaktermintákat a modellnevek újratervezéséhez:```
Pattern: claude-sonnet-_ → Target: cc/claude-sonnet-4-5-20250929
Pattern: gpt-_ → Target: gh/gpt-5.1-codex

````

A helyettesítő karakterek támogatják a `*` (bármilyen karakter) és a `?` (egykarakteres) karaktereket.#### Fallback Chains

Határozzon meg globális tartalék láncokat, amelyek minden kérelemre vonatkoznak:```
Chain: production-fallback
  1. cc/claude-opus-4-6
  2. gh/gpt-5.1-codex
  3. glm/glm-4.7
````

---

### Resilience & Circuit Breakers

Konfigurálás a**Irányítópult → Beállítások → Ellenállás**menüpontban.

Az OmniRoute szolgáltatói szintű rugalmasságot valósít meg négy összetevőből:

1.**Szolgáltatói profilok**— Szolgáltatónkénti konfiguráció a következőkhöz:

- Meghibásodási küszöb (hány hiba történt a nyitás előtt)
- Lehűlés időtartama
- Sebességkorlát érzékelési érzékenység
- Exponenciális backoff paraméterek

  2.**Szerkeszthető díjkorlátok**— Az irányítópulton konfigurálható rendszerszintű alapértékek: -**Percenkénti kérések (RPM)**– A percenkénti kérések száma fiókonként -**Minimális idő a kérések között**- Minimális eltérés ezredmásodpercben a kérések között -**Maximális egyidejű kérések**- Maximális egyidejű kérések száma fiókonként

- Kattintson a**Szerkesztés**gombra a módosításhoz, majd a**Mentés**vagy a**Mégse**gombra. Az értékek a rezilience API-n keresztül megmaradnak.

  3.**Circuit Breaker**– Nyomon követi a hibákat szolgáltatónként, és automatikusan megnyitja az áramkört egy küszöbérték elérésekor: -**ZÁRVA**(egészséges) – A kérések normálisan futnak -**NYITVA**— A szolgáltató ideiglenesen blokkolva van ismétlődő hibák után -**HALF_OPEN**— Tesztelés, hogy a szolgáltató helyreállt-e

  4.**Policies & Locked Identifiers**— Megjeleníti a megszakító állapotát és a zárolt azonosítókat kényszer-feloldási képességgel.

  5.**Automatikus díjkorlát-észlelés**– Figyeli a "429" és az "Újrapróbálkozás után" fejléceket, hogy proaktívan elkerülje a szolgáltatói díjkorlátok átlépését.

**Profi tipp:**Használja a**Reset All**gombot az összes megszakító és leállás törléséhez, amikor a szolgáltató felépül egy kiesésből.---

### Database Export / Import

Az adatbázis-mentéseket az**Irányítópult → Beállítások → Rendszer és tárhely**menüpontban kezelheti.

| Akció                               | Leírás                                                                                                                                                                             |
| ----------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------- |
| **Adatbázis exportálása**           | Letölti az aktuális SQLite adatbázist `.sqlite` fájlként                                                                                                                           |
| **Az összes exportálása (.tar.gz)** | Letölt egy teljes biztonsági mentési archívumot, beleértve: adatbázist, beállításokat, kombinációkat, szolgáltatói kapcsolatokat (hitelesítő adatok nélkül), API kulcs metaadatait |
| **Import Database**                 | Töltsön fel egy ".sqlite" fájlt az aktuális adatbázis lecseréléséhez. Az importálás előtti biztonsági másolat automatikusan létrejön, kivéve, ha `DISABLE_SQLITE_AUTO_BACKUP=true` | ```bash |

# API: Export database

curl -o backup.sqlite http://localhost:20128/api/db-backups/export

# API: Export all (full archive)

curl -o backup.tar.gz http://localhost:20128/api/db-backups/exportAll

# API: Import database

curl -X POST http://localhost:20128/api/db-backups/import \
 -F "file=@backup.sqlite"

````

**Importálás ellenőrzése:**Az importált fájl integritását (SQLite pragma ellenőrzés), a szükséges táblákat ("provider_connections", "provider_nodes", "combos", "api_keys") és méretét (maximum 100 MB) ellenőrzik.

**Használati esetek:**

- OmniRoute migrálása a gépek között
- Készítsen külső biztonsági másolatot a katasztrófa utáni helyreállításhoz
- Share configurations between team members (export all → share archive)---

### Settings Dashboard

A beállítások oldala 6 lapra van rendezve a könnyű navigáció érdekében:

| Tab | Tartalom |
| -------------- | ---------------------------------------------------------------------------------------------- |
|**Általános**| Rendszertároló eszközök, megjelenési beállítások, témavezérlők és elemenkénti oldalsáv láthatósága |
|**Biztonság**| Bejelentkezési/jelszó-beállítások, IP-hozzáférés-vezérlés, API-hitelesítés a `/models-hez' és Szolgáltató blokkolása |
|**Útválasztás**| Globális útválasztási stratégia (6 lehetőség), helyettesítő karakteres modellálnevek, tartalék láncok, kombinált alapértelmezések |
|**rugalmasság**| Szolgáltatói profilok, szerkeszthető sebességkorlátok, megszakító állapota, szabályzatok és zárolt azonosítók |
|**AI**| Átgondolt költségkeret-konfiguráció, globális rendszerbefecskendezés, gyorsítótár-statisztikák |
|**Speciális**| Globális proxykonfiguráció (HTTP/SOCKS5) |---

### Costs & Budget Management

Hozzáférés az**Irányítópult → Költségek**menüponton keresztül.

| Tab | Cél |
| ----------- | ----------------------------------------------------------------------------------------- |
|**Költségvetés**| Költési korlátok beállítása API-kulcsonként napi/heti/havi költségkerettel és valós idejű követéssel |
|**Árak**| Modellárazási bejegyzések megtekintése és szerkesztése – szolgáltatónként 1 000 bemeneti/kimeneti tokenenkénti költség |```bash
# API: Set a budget
curl -X POST http://localhost:20128/api/usage/budget \
  -H "Content-Type: application/json" \
  -d '{"keyId": "key-123", "limit": 50.00, "period": "monthly"}'

# API: Get current budget status
curl http://localhost:20128/api/usage/budget
````

**Költségkövetés:**Minden kérés naplózza a tokenhasználatot, és az ártáblázat segítségével kiszámítja a költségeket. Tekintse meg az**Irányítópult → Használat**szolgáltató, modell és API-kulcs szerinti lebontását.---

### Audio Transcription

Az OmniRoute támogatja a hang átírását az OpenAI-kompatibilis végponton keresztül:```bash
POST /v1/audio/transcriptions
Authorization: Bearer your-api-key
Content-Type: multipart/form-data

# Example with curl

curl -X POST http://localhost:20128/v1/audio/transcriptions \
 -H "Authorization: Bearer your-api-key" \
 -F "file=@audio.mp3" \
 -F "model=deepgram/nova-3"

````

Elérhető szolgáltatók:**Deepgram**(`deepgram/`),**AssemblyAI**(`assemblyai/`).

Támogatott hangformátumok: "mp3", "wav", "m4a", "flac", "ogg", "webm".---

### Combo Balancing Strategies

Konfigurálja a kombinált egyensúlyozást az**Irányítópult → Kombók → Létrehozás/Szerkesztés → Stratégia**menüpontban.

| Stratégia | Leírás |
| ------------------- | ------------------------------------------------------------------------ |
|**Round-Robin**| Sorozatosan forgatja a modelleket |
|**Prioritás**| Mindig az első modellt próbálja ki; csak hibára esik vissza |
|**Véletlen**| Véletlenszerű modellt választ a kombinációból minden egyes kéréshez |
|**Súlyozott**| Útvonalak arányosan a modellenként hozzárendelt súlyok alapján |
|**Legkevésbé használt**| Útvonalak a legutóbbi legkevesebb kéréssel rendelkező modellhez (kombinált mérőszámokat használ) |
|**Költségoptimalizált**| Útvonalak a legolcsóbb elérhető modellhez (árazási táblázatot használ) |

A globális kombinált alapértelmezések az**Irányítópult → Beállítások → Útválasztás → Kombinált alapértelmezések**menüpontban állíthatók be.---

### Health Dashboard

Hozzáférés az**Irányítópult → Egészség**menüponton keresztül. Valós idejű rendszerállapot-áttekintés 6 kártyával:

| Kártya | Mit mutat |
| ---------------------- | ------------------------------------------------------------ |
|**Rendszerállapot**| Üzemidő, verzió, memóriahasználat, adatkönyvtár |
|**Szolgáltatói egészség**| Szolgáltatónkénti megszakító állapota (Zárt/Nyitott/Félig nyitva) |
|**Díjkorlátok**| Aktív sebességkorlátozások fiókonként a hátralévő idővel |
|**Aktív kizárások**| A kizárási szabályzat által ideiglenesen letiltott szolgáltatók |
|**Aláírás-gyorsítótár**| Deduplikációs gyorsítótár statisztikái (aktív kulcsok, találati arány) |
|**Latencia telemetria**| p50/p95/p99 késleltetési összesítés szolgáltatónként |

**Profi tipp:**Az Egészség oldal 10 másodpercenként automatikusan frissül. Használja a megszakító kártyát annak azonosítására, hogy mely szolgáltatók tapasztaltak problémákat.---

## 🖥️ Desktop Application (Electron)

Az OmniRoute natív asztali alkalmazásként érhető el Windows, macOS és Linux rendszerekhez.### Telepítés

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

Kimenet → `electron/dist-electron/`### Key Features

| Funkció                           | Leírás                                                                    |
| --------------------------------- | ------------------------------------------------------------------------- | ------------------------- |
| **Szerver készenlét**             | Szavazási kiszolgáló az ablak megjelenítése előtt (nincs üres képernyő)   |
| **Rendszertálca**                 | Minimalizálás tálcára, port módosítása, kilépés a tálca menüből           |
| **Kikötők kezelése**              | Szerverport módosítása a tálcáról (a kiszolgáló automatikus újraindítása) |
| **Tartalombiztonsági szabályzat** | Korlátozó CSP munkamenet fejléceken keresztül                             |
| **Egyetlen példány**              | Egyszerre csak egy alkalmazáspéldány futhat                               |
| **Offline mód**                   | A mellékelt Next.js szerver internet nélkül működik                       | ### Environment Variables |

| Változó               | Alapértelmezett | Leírás                            |
| --------------------- | --------------- | --------------------------------- |
| `OMNIROUTE_PORT`      | "20128"         | Szerver port                      |
| `OMNIROUTE_MEMORY_MB` | "512"           | Node.js kupackorlát (64–16384 MB) |

📖 Teljes dokumentáció: [`electron/README.md`](../electron/README.md)
