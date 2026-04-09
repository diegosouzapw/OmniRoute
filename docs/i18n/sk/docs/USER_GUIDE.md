# User Guide (Slovenčina)

🌐 **Languages:** 🇺🇸 [English](../../../../docs/USER_GUIDE.md) · 🇪🇸 [es](../../es/docs/USER_GUIDE.md) · 🇫🇷 [fr](../../fr/docs/USER_GUIDE.md) · 🇩🇪 [de](../../de/docs/USER_GUIDE.md) · 🇮🇹 [it](../../it/docs/USER_GUIDE.md) · 🇷🇺 [ru](../../ru/docs/USER_GUIDE.md) · 🇨🇳 [zh-CN](../../zh-CN/docs/USER_GUIDE.md) · 🇯🇵 [ja](../../ja/docs/USER_GUIDE.md) · 🇰🇷 [ko](../../ko/docs/USER_GUIDE.md) · 🇸🇦 [ar](../../ar/docs/USER_GUIDE.md) · 🇮🇳 [hi](../../hi/docs/USER_GUIDE.md) · 🇮🇳 [in](../../in/docs/USER_GUIDE.md) · 🇹🇭 [th](../../th/docs/USER_GUIDE.md) · 🇻🇳 [vi](../../vi/docs/USER_GUIDE.md) · 🇮🇩 [id](../../id/docs/USER_GUIDE.md) · 🇲🇾 [ms](../../ms/docs/USER_GUIDE.md) · 🇳🇱 [nl](../../nl/docs/USER_GUIDE.md) · 🇵🇱 [pl](../../pl/docs/USER_GUIDE.md) · 🇸🇪 [sv](../../sv/docs/USER_GUIDE.md) · 🇳🇴 [no](../../no/docs/USER_GUIDE.md) · 🇩🇰 [da](../../da/docs/USER_GUIDE.md) · 🇫🇮 [fi](../../fi/docs/USER_GUIDE.md) · 🇵🇹 [pt](../../pt/docs/USER_GUIDE.md) · 🇷🇴 [ro](../../ro/docs/USER_GUIDE.md) · 🇭🇺 [hu](../../hu/docs/USER_GUIDE.md) · 🇧🇬 [bg](../../bg/docs/USER_GUIDE.md) · 🇸🇰 [sk](../../sk/docs/USER_GUIDE.md) · 🇺🇦 [uk-UA](../../uk-UA/docs/USER_GUIDE.md) · 🇮🇱 [he](../../he/docs/USER_GUIDE.md) · 🇵🇭 [phi](../../phi/docs/USER_GUIDE.md) · 🇧🇷 [pt-BR](../../pt-BR/docs/USER_GUIDE.md) · 🇨🇿 [cs](../../cs/docs/USER_GUIDE.md) · 🇹🇷 [tr](../../tr/docs/USER_GUIDE.md)

---

Kompletný sprievodca pre konfiguráciu poskytovateľov, vytváranie komb, integráciu nástrojov CLI a nasadenie OmniRoute.---

## Table of Contents

- [Prehľad cien](#-pricing-a-gance)
- [prípady použitia](#-prípadov použitia)
- [Nastavenie poskytovateľa](#-provider-setup)
- [Integrácia CLI](#-cli-integrácia)
- [Nasadenie](#-nasadenie)
- [Dostupné modely](#-dostupných-modelov)
- [Pokročilé funkcie](#-pokročilých-funkcií)---

## 💰 Pricing at a Glance

| Úroveň            | Poskytovateľ      | Náklady             | Obnovenie kvóty              | Najlepšie pre               |
| ----------------- | ----------------- | ------------------- | ---------------------------- | --------------------------- |
| **💳 PREDPLATNÉ** | Claude Code (Pro) | 20 USD/mesiac       | 5h + týždenne                | Už prihlásené               |
|                   | Codex (Plus/Pro)  | 20 – 200 USD/mesiac | 5h + týždenne                | Používatelia OpenAI         |
|                   | Gemini CLI        | **ZADARMO**         | 180 tis./mesiac + 1 tis./deň | Všetci!                     |
|                   | GitHub Copilot    | 10 – 19 USD/mes.    | Mesačne                      | Používatelia GitHubu        |
| **🔑 API KEY**    | DeepSeek          | Platba za použitie  | Žiadne                       | Lacné uvažovanie            |
|                   | Groq              | Platba za použitie  | Žiadne                       | Ultra-rýchle odvodenie      |
|                   | xAI (Grok)        | Platba za použitie  | Žiadne                       | Grok 4 zdôvodnenie          |
|                   | Mistral           | Platba za použitie  | Žiadne                       | Modely hostené v EÚ         |
|                   | Zmätok            | Platba za použitie  | Žiadne                       | Rozšírené vyhľadávanie      |
|                   | Spolu AI          | Platba za použitie  | Žiadne                       | Modely s otvoreným zdrojom  |
|                   | Ohňostroje AI     | Platba za použitie  | Žiadne                       | Fast FLUX obrázky           |
|                   | Cerebras          | Platba za použitie  | Žiadne                       | Rýchlosť plátkovej stupnice |
|                   | Cohere            | Platba za použitie  | Žiadne                       | Príkaz R+ RAG               |
|                   | NVIDIA NIM        | Platba za použitie  | Žiadne                       | Podnikové modely            |
| **💰 LACNO**      | GLM-4,7           | 0,6 USD/1 milión    | Denne 10:00                  | Záloha rozpočtu             |
|                   | MiniMax M2.1      | 0,2 USD/1 milión    | 5-hodinové valcovanie        | Najlacnejšia možnosť        |
|                   | Kimi K2           | 9 USD/mesiac byt    | 10 miliónov tokenov/mesiac   | Predvídateľné náklady       |
| **🆓 ZDARMA**     | Qoder             | 0 USD               | Neobmedzené                  | 8 modelov zadarmo           |
|                   | Qwen              | 0 USD               | Neobmedzené                  | 3 modely zadarmo            |
|                   | Kiro              | 0 USD               | Neobmedzené                  | Claude zadarmo              |

**💡 Tip pre profesionálov:**Začnite s Gemini CLI (180 000 zadarmo/mesiac) + kombinácia Qoder (neobmedzene zadarmo) = cena 0 $!---

## 🎯 Use Cases

### Case 1: "I have Claude Pro subscription"

**Problém:**Platnosť kvóty vyprší nevyužitá, obmedzenia sadzieb počas náročného kódovania```
Combo: "maximize-claude"

1. cc/claude-opus-4-6 (use subscription fully)
2. glm/glm-4.7 (cheap backup when quota out)
3. if/kimi-k2-thinking (free emergency fallback)

Monthly cost: $20 (subscription) + ~$5 (backup) = $25 total
vs. $20 + hitting limits = frustration

````

### Case 2: "I want zero cost"

**Problém:**Nemôžem si dovoliť predplatné, potrebujem spoľahlivé kódovanie AI```
Combo: "free-forever"
  1. gc/gemini-3-flash         (180K free/month)
  2. if/kimi-k2-thinking       (unlimited free)
  3. qw/qwen3-coder-plus       (unlimited free)

Monthly cost: $0
Quality: Production-ready models
````

### Case 3: "I need 24/7 coding, no interruptions"

**Problém:**Termíny, nemôžem si dovoliť prestoje```
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

**Problém:**Potrebujete asistenta AI v aplikáciách na odosielanie správ, úplne zadarmo```
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

**Tip pre profesionálov:**Používajte Opus na zložité úlohy, Sonnet na rýchlosť. OmniRoute sleduje kvótu na model!#### OpenAI Codex (Plus/Pro)

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

**Najlepšia hodnota:**Obrovská bezplatná úroveň! Použite to pred platenými úrovňami.#### GitHub Copilot

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

1. Zaregistrujte sa: [Zhipu AI](https://open.bigmodel.cn/)
2. Získajte kľúč API z plánu kódovania
3. Dashboard → Pridať kľúč API: Poskytovateľ: `glm`, Kľúč API: `váš kľúč`

**Použitie:**`glm/glm-4,7` —**Tip pre profesionálov:**Plán kódovania ponúka 3× kvótu za 1/7 cenu! Resetovať denne o 10:00.#### MiniMax M2.1 (5h reset, $0.20/1M)

1. Zaregistrujte sa: [MiniMax](https://www.minimax.io/)
2. Získať kľúč API → Dashboard → Pridať kľúč API

**Použitie:**`minimax/MiniMax-M2.1` —**Tip pre profesionálov:**Najlacnejšia možnosť pre dlhý kontext (1 milión tokenov)!#### Kimi K2 ($9/month flat)

1. Prihláste sa na odber: [Moonshot AI](https://platform.moonshot.ai/)
2. Získať kľúč API → Dashboard → Pridať kľúč API

**Použitie:**`kimi/kimi-najnovšie` —**Tip pre profesionálov:**Pevné 9 $/mesiac za 10 miliónov tokenov = 0,90 $/1 milión efektívnych nákladov!### 🆓 FREE Providers

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

Upravte `~/.claude/config.json`:```json
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

Upravte `~/.openclaw/openclaw.json`:```json
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

**Alebo použite Dashboard:**Nástroje CLI → OpenClaw → Automatická konfigurácia### Cline / Continue / RooCode

```

Provider: OpenAI Compatible
Base URL: http://localhost:20128/v1
API Key: [from dashboard]
Model: cc/claude-opus-4-6

````

---

## Nasadenie

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

CLI automaticky načítava `.env` z `~/.omniroute/.env` alebo `./.env`.### VPS Deployment

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

Pre servery s obmedzenou pamäťou RAM použite možnosť obmedzenia pamäte:```bash

# With 512MB limit (default)

pm2 start npm --name omniroute -- start

# Or with custom memory limit

OMNIROUTE_MEMORY_MB=512 pm2 start npm --name omniroute -- start

# Or using ecosystem.config.js

pm2 start ecosystem.config.js

````

Vytvorte súbor `ecosystem.config.js`:```javascript
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

Informácie o režime integrovanom s hostiteľom s binárnymi súbormi CLI nájdete v časti Docker v hlavných dokumentoch.### Void Linux (xbps-src)

Používatelia Void Linuxu môžu zabaliť a nainštalovať OmniRoute natívne pomocou rámca krížovej kompilácie `xbps-src`. Toto automatizuje samostatné zostavenie Node.js spolu s požadovanými natívnymi väzbami „better-sqlite3“.

<podrobnosti>
<summary><b>Zobraziť šablónu xbps-src</b></summary>```bash
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

| Premenná | Predvolené | Popis |
| ---------------------------------------- | ------------------------------------- | --------------------------------------------------------------------------------------------------- |
| `JWT_SECRET` | `omniroute-default-secret-change-me` | Tajomstvo podpisu JWT (**zmena vo výrobe**) |
| `ÚVODNÉ_HESLO` | "123456" | Prvé prihlasovacie heslo |
| "DATA_DIR" | `~/.omniroute` | Adresár údajov (db, využitie, protokoly) |
| "PORT" | štandardný rámec | Port služby (v príkladoch `20128`) |
| `HOSTNAME` | štandardný rámec | Zviazať hostiteľa (predvolená hodnota Dockera je `0.0.0.0`) |
| `NODE_ENV` | runtime default | Nastaviť `produkciu` pre nasadenie |
| "BASE_URL" | `http://localhost:20128` | Interná základná adresa URL na strane servera |
| `CLOUD_URL` | `https://omniroute.dev` | Základná adresa URL koncového bodu synchronizácie v cloude |
| `API_KEY_SECRET` | "endpoint-proxy-api-key-secret" | Tajný kľúč HMAC pre vygenerované kľúče API |
| `REQUIRE_API_KEY` | "nepravda" | Vynútiť kľúč rozhrania Bearer API na `/v1/*` |
| `ALLOW_API_KEY_REVEAL` | "nepravda" | Povoliť Správcovi API kopírovať úplné kľúče API na požiadanie |
| `PROVIDER_LIMITS_SYNC_INTERVAL_MINUTES` | "70" | Kadencia obnovovania na strane servera pre údaje limitov poskytovateľa uložené vo vyrovnávacej pamäti; Tlačidlá obnovenia používateľského rozhrania stále spúšťajú manuálnu synchronizáciu |
| `DISABLE_SQLITE_AUTO_BACKUP` | "nepravda" | Zakázať automatické snímky SQLite pred zápisom/importom/obnovením; manuálne zálohovanie stále funguje |
| `APP_LOG_TO_FILE`                       | `true`                               | Enables application and audit log output to disk                                                          |
| „AUTH_COOKIE_SECURE“ | "nepravda" | Vynútiť „Secure“ auth cookie (za HTTPS reverzným proxy serverom) |
| `CLOUDFLARED_BIN` | deaktivovaný | Namiesto riadeného sťahovania použite existujúci binárny súbor „cloudflared“ |
| `CLOUDFLARED_PROTOCOL` | "http2" | Transport pre spravované rýchle tunely (`http2`, `quic` alebo `auto`) |
| `OMNIROUTE_MEMORY_MB` | "512" | Limit haldy Node.js v MB |
| "PROMPT_CACHE_MAX_SIZE" | "50" | Maximálne rýchle položky cache |
| `SEMANTIC_CACHE_MAX_SIZE` | "100" | Maximálny počet záznamov sémantickej vyrovnávacej pamäte |Úplný odkaz na premenné prostredia nájdete v [README](../README.md).---

## 📊 Available Models

<podrobnosti>
<summary><b>Zobraziť všetky dostupné modely</b></summary>

**Claude Code (`cc/`)**— Pro/Max: `cc/claude-opus-4-6`, `cc/claude-sonnet-4-5-20250929`, `cc/claude-haiku-4-5-20251001`

**Codex (`cx/`)**— Plus/Pro: `cx/gpt-5.2-codex`, `cx/gpt-5.1-codex-max`

**Gemini CLI (`gc/`)**— ZDARMA: `gc/gemini-3-flash-preview`, `gc/gemini-2.5-pro`

**GitHub Copilot (`gh/`)**: `gh/gpt-5`, `gh/claude-4,5-sonnet`

**GLM (`glm/`)**– 0,6 USD/1 milión: `glm/glm-4,7`

**MiniMax (`minimax/`)**– 0,2 USD/1 milión: `minimax/MiniMax-M2,1`

**Qoder (`if/`)**– ZDARMA: `if/kimi-k2-thinking`, `if/qwen3-coder-plus`, `if/deepseek-r1`

**Qwen (`qw/`)**— ZDARMA: `qw/qwen3-coder-plus`, `qw/qwen3-coder-flash`

**Kiro (`kr/`)**— ZDARMA: `kr/claude-sonnet-4.5`, `kr/claude-haiku-4.5`

**DeepSeek (`ds/`)**: `ds/deepseek-chat`, `ds/deepseek-reasoner`

**Groq (`groq/`)**: `groq/lama-3.3-70b-versatile`, `groq/lama-4-maverick-17b-128e-instruct`

**xAI (`xai/`)**: `xai/grok-4`, `xai/grok-4-0709-fast-reasoning`, `xai/grok-code-mini`

**Mistral (`mistral/`)**: `mistral/mistral-large-2501`, `mistral/codestral-2501`

**Zložitosť (`pplx/`)**: `pplx/sonar-pro`, `pplx/sonar`

**Together AI (`together/`)**: `together/meta-lama/Llama-3.3-70B-Instruct-Turbo`

**Umelá inteligencia ohňostrojov (`ohňostroj/`)**: `ohňostroje/účty/ohňostroje/modely/deepseek-v3p1`

**Cerebras (`cerebras/`)**: `cerebras/lama-3.3-70b`

**Cohere (`cohere/`)**: `cohere/command-r-plus-08-2024`

**NVIDIA NIM (`nvidia/`)**: `nvidia/nvidia/llama-3.3-70b-instruct`</details>

---

## 🧩 Advanced Features

### Custom Models

Pridajte akékoľvek ID modelu k akémukoľvek poskytovateľovi bez čakania na aktualizáciu aplikácie:```bash
# Via API
curl -X POST http://localhost:20128/api/provider-models \
  -H "Content-Type: application/json" \
  -d '{"provider": "openai", "modelId": "gpt-4.5-preview", "modelName": "GPT-4.5 Preview"}'

# List: curl http://localhost:20128/api/provider-models?provider=openai
# Remove: curl -X DELETE "http://localhost:20128/api/provider-models?provider=openai&model=gpt-4.5-preview"
````

Alebo použite Dashboard:**Poskytovatelia → [Poskytovateľ] → Vlastné modely**.

Poznámky:

- OpenRouter a poskytovatelia kompatibilní s OpenAI/Anthropic sú spravovaní iba z**dostupných modelov**. Manuálne pridávanie, import a automatická synchronizácia všetkých pozemkov v rovnakom zozname dostupných modelov, takže pre týchto poskytovateľov neexistuje samostatná sekcia vlastných modelov.
  – Sekcia**Vlastné modely**je určená pre poskytovateľov, ktorí nezverejňujú importy spravovaných dostupných modelov.### Dedicated Provider Routes

Smerujte požiadavky priamo ku konkrétnemu poskytovateľovi s overením modelu:```bash
POST http://localhost:20128/v1/providers/openai/chat/completions
POST http://localhost:20128/v1/providers/openai/embeddings
POST http://localhost:20128/v1/providers/fireworks/images/generations

````

Ak chýba predpona poskytovateľa, automaticky sa pridá. Nezhodné modely vrátia hodnotu „400“.### Network Proxy Configuration

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

**Prednosť:**Špecifické pre kľúč → Špecifické pre kombináciu → Špecifické pre poskytovateľa → Globálne → Prostredie.### Model Catalog API

```bash
curl http://localhost:20128/api/models/catalog
```

Vráti modely zoskupené podľa poskytovateľa s typmi („chat“, „vkladanie“, „obrázok“).### Cloud Sync

- Synchronizujte poskytovateľov, kombinácie a nastavenia medzi zariadeniami
- Automatická synchronizácia na pozadí s časovým limitom + rýchle zlyhanie
- V produkcii uprednostňujte `BASE_URL`/`CLOUD_URL` na strane servera### Cloudflare Quick Tunnel

- Dostupné v**Dashboard → Endpoints**pre Docker a ďalšie nasadenia s vlastným hosťovaním
- Vytvorí dočasnú adresu URL `https://*.trycloudflare.com`, ktorá prepošle váš aktuálny koncový bod `/v1` kompatibilný s OpenAI
- Najprv povoľte inštaláciu „cloudflared“ iba v prípade potreby; neskoršie reštarty znova použijú rovnaký spravovaný binárny súbor
- Rýchle tunely sa po reštarte OmniRoute alebo kontajnera automaticky neobnovia; v prípade potreby ich znova povoľte z palubnej dosky
- Adresy URL tunelov sú pominuteľné a menia sa pri každom zastavení/spustení tunela
- Spravované rýchle tunely predvolene používajú prenos HTTP/2, aby sa predišlo hlučným upozorneniam vyrovnávacej pamäte QUIC UDP v obmedzených kontajneroch
- Ak chcete prepísať výber spravovaného prenosu, nastavte `CLOUDFLARED_PROTOCOL=quic` alebo `auto`
- Nastavte `CLOUDFLARED_BIN`, ak uprednostňujete použitie predinštalovaného binárneho súboru `cloudflared` namiesto spravovaného sťahovania### LLM Gateway Intelligence (Phase 9)

–**Sémantická vyrovnávacia pamäť**– Automatické ukladanie do vyrovnávacej pamäte bez streamovania, teplota = 0 odoziev (obíďte sa pomocou „X-OmniRoute-No-Cache: true“)
–**Request Idempotency**– Deduplikuje požiadavky do 5 sekúnd prostredníctvom hlavičky „Idempotency-Key“ alebo „X-Request-Id“ -**Sledovanie pokroku**– Prihláste sa do udalostí SSE `event: progress` cez hlavičku `X-OmniRoute-Progress: true`---

### Translator Playground

Prístup cez**Dashboard → Translator**. Laďte a vizualizujte, ako OmniRoute prekladá požiadavky API medzi poskytovateľmi.

| Režim                 | Účel                                                                                       |
| --------------------- | ------------------------------------------------------------------------------------------ |
| **Ihrisko**           | Vyberte zdrojové/cieľové formáty, vložte požiadavku a okamžite si pozrite preložený výstup |
| **Tester chatu**      | Posielajte správy živého chatu cez proxy a skontrolujte celý cyklus žiadostí/odpovedí      |
| **Testovacia lavica** | Spustite dávkové testy vo viacerých kombináciách formátov na overenie správnosti prekladu  |
| **Živý monitor**      | Sledujte preklady v reálnom čase, keď požiadavky prechádzajú cez server proxy              |

**Prípady použitia:**

- Odlaďte, prečo konkrétna kombinácia klient/poskytovateľ zlyhá
- Overte, či sa značky myslenia, volania nástrojov a systémové výzvy prekladajú správne
- Porovnajte rozdiely medzi formátmi OpenAI, Claude, Gemini a Responses API---

### Routing Strategies

Konfigurujte cez**Dashboard → Nastavenia → Smerovanie**.

| Stratégia                     | Popis                                                                                                  |
| ----------------------------- | ------------------------------------------------------------------------------------------------------ | ----------------------------------- |
| **Vyplňte ako prvé**          | Používa účty v poradí podľa priority – primárny účet spracováva všetky požiadavky, kým nie je dostupný |
| **Round Robin**               | Prechádza cez všetky účty s konfigurovateľným fixným limitom (predvolené: 3 hovory na účet)            |
| **P2C (sila dvoch možností)** | Vyberie 2 náhodné účty a cesty k zdravšiemu — vyrovnáva záťaž s uvedomením si zdravia                  |
| **Náhodné**                   | Náhodne vyberie účet pre každú požiadavku pomocou Fisher-Yates shuffle                                 |
| **Najmenej používané**        | Smeruje na účet s najstaršou časovou pečiatkou `lastUsedAt`, rovnomerne rozdeľuje návštevnosť          |
| **Costovo optimalizované**    | Smeruje na účet s najnižšou prioritou, optimalizácia pre poskytovateľov s najnižšou cenou              | #### External Sticky Session Header |

Pre externú príbuznosť relácie (napríklad agenti Claude Code/Codex za reverznými proxy servermi) odošlite:```http
X-Session-Id: your-session-key

````

OmniRoute tiež akceptuje `x_session_id` a vráti efektívny kľúč relácie v `X-OmniRoute-Session-Id`.

Ak používate Nginx a odosielate hlavičky formulárov podčiarknutia, povoľte:```nginx
underscores_in_headers on;
````

#### Wildcard Model Aliases

Vytvorte vzory zástupných znakov na premapovanie názvov modelov:```
Pattern: claude-sonnet-_ → Target: cc/claude-sonnet-4-5-20250929
Pattern: gpt-_ → Target: gh/gpt-5.1-codex

````

Zástupné znaky podporujú `*` (ľubovoľné znaky) a `?` (jeden znak).#### Fallback Chains

Definujte globálne záložné reťazce, ktoré platia pre všetky požiadavky:```
Chain: production-fallback
  1. cc/claude-opus-4-6
  2. gh/gpt-5.1-codex
  3. glm/glm-4.7
````

---

### Resilience & Circuit Breakers

Konfigurujte cez**Dashboard → Nastavenia → Odolnosť**.

OmniRoute implementuje odolnosť na úrovni poskytovateľa so štyrmi komponentmi:

1.**Profily poskytovateľa**— Konfigurácia podľa jednotlivých poskytovateľov pre:

- Prah zlyhania (koľko porúch pred otvorením)
- Trvanie chladenia
- Citlivosť detekcie limitu rýchlosti
- Exponenciálne parametre backoff

  2.**Upraviteľné limity rýchlosti**— Predvolené nastavenia na úrovni systému konfigurovateľné na paneli: -**Požiadavky za minútu (RPM)**– Maximálny počet žiadostí za minútu na účet -**Min Time Between Requests**– Minimálna medzera v milisekundách medzi požiadavkami -**Max Concurrent Requests**– Maximálny počet simultánnych požiadaviek na účet

- Kliknite na**Upraviť**a upravte, potom na**Uložiť**alebo**Zrušiť**. Hodnoty pretrvávajú prostredníctvom rozhrania API odolnosti.

  3.**Circuit Breaker**– Sleduje zlyhania podľa poskytovateľa a automaticky otvára okruh, keď sa dosiahne prah: -**ZATVORENÉ**(zdravé) – požiadavky prebiehajú normálne -**OPEN**— Poskytovateľ je po opakovaných zlyhaniach dočasne zablokovaný -**HALF_OPEN**– Testuje sa, či sa poskytovateľ zotavil

  4.**Policies & Locked Identifiers**– Zobrazuje stav ističa a uzamknuté identifikátory s možnosťou vynútenia odomknutia.

  5.**Automatická detekcia limitu rýchlosti**— Monitoruje hlavičky `429` a `Retry-After`, aby sa proaktívne vyhlo prekročeniu limitov sadzby poskytovateľa.

**Tip pre profesionálov:**Použite tlačidlo**Reset All**na vymazanie všetkých ističov a chladenia, keď sa poskytovateľ zotaví z výpadku.---

### Database Export / Import

Spravujte zálohy databázy v**Dashboard → Nastavenia → Systém a úložisko**.

| Akcia                           | Popis                                                                                                                                                |
| ------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- | ------- |
| **Exportovať databázu**         | Stiahne aktuálnu databázu SQLite ako súbor `.sqlite`                                                                                                 |
| **Exportovať všetko (.tar.gz)** | Stiahne celý záložný archív vrátane: databázy, nastavení, kombinácií, pripojení poskytovateľa (bez poverení), metadát kľúča API                      |
| **Importovať databázu**         | Ak chcete nahradiť aktuálnu databázu, nahrajte súbor `.sqlite`. Predimportná záloha sa vytvorí automaticky, pokiaľ `DISABLE_SQLITE_AUTO_BACKUP=true` | ```bash |

# API: Export database

curl -o backup.sqlite http://localhost:20128/api/db-backups/export

# API: Export all (full archive)

curl -o backup.tar.gz http://localhost:20128/api/db-backups/exportAll

# API: Import database

curl -X POST http://localhost:20128/api/db-backups/import \
 -F "file=@backup.sqlite"

````

**Overenie importu:**Overí sa integrita importovaného súboru (kontrola SQLite pragma), požadované tabuľky (`provider_connections`, `provider_nodes`, `combos`, `api_keys`) a veľkosť (max 100 MB).

**Prípady použitia:**

- Migrujte OmniRoute medzi strojmi
- Vytvorte externé zálohy na obnovu po havárii
- Zdieľanie konfigurácií medzi členmi tímu (exportovať všetko → zdieľať archív)---

### Settings Dashboard

Stránka nastavení je usporiadaná do 6 kariet pre jednoduchú navigáciu:

| Tab | Obsah |
| --------------- | --------------------------------------------------------------------------------------------- |
|**Všeobecné**| Nástroje systémového úložiska, nastavenia vzhľadu, ovládacie prvky tém a viditeľnosť bočného panela pre jednotlivé položky |
|**Bezpečnosť**| Nastavenia prihlasovacieho mena/hesla, kontrola prístupu IP, overenie API pre `/modely` a blokovanie poskytovateľa |
|**Smerovanie**| Globálna stratégia smerovania (6 možností), aliasy modelu so zástupnými znakmi, záložné reťazce, predvolené nastavenia komba |
|**Odolnosť**| Profily poskytovateľov, upraviteľné limity sadzieb, stav ističa, zásady a zamknuté identifikátory |
|**AI**| Konfigurácia rozpočtu myslenia, rýchle vloženie globálneho systému, rýchle štatistiky vyrovnávacej pamäte |
|**Pokročilé**| Globálna konfigurácia proxy (HTTP/SOCKS5) |---

### Costs & Budget Management

Prístup cez**Dashboard → Náklady**.

| Tab | Účel |
| ----------- | ---------------------------------------------------------------------------------------- |
|**Rozpočet**| Nastavte limity výdavkov na kľúč API s dennými/týždennými/mesačnými rozpočtami a sledovaním v reálnom čase |
|**Ceny**| Zobrazenie a úprava položiek cien modelu – cena za 1 000 vstupných/výstupných tokenov na poskytovateľa |```bash
# API: Set a budget
curl -X POST http://localhost:20128/api/usage/budget \
  -H "Content-Type: application/json" \
  -d '{"keyId": "key-123", "limit": 50.00, "period": "monthly"}'

# API: Get current budget status
curl http://localhost:20128/api/usage/budget
````

**Sledovanie nákladov:**Každá požiadavka zaznamenáva použitie tokenu a vypočítava náklady pomocou cenovej tabuľky. Pozrite si rozpisy v**Dashboard → Použitie**podľa poskytovateľa, modelu a kľúča API.---

### Audio Transcription

OmniRoute podporuje prepis zvuku cez koncový bod kompatibilný s OpenAI:```bash
POST /v1/audio/transcriptions
Authorization: Bearer your-api-key
Content-Type: multipart/form-data

# Example with curl

curl -X POST http://localhost:20128/v1/audio/transcriptions \
 -H "Authorization: Bearer your-api-key" \
 -F "file=@audio.mp3" \
 -F "model=deepgram/nova-3"

````

Dostupní poskytovatelia:**Deepgram**(`deepgram/`),**AssemblyAI**(`assemblyai/`).

Podporované zvukové formáty: `mp3`, `wav`, `m4a`, `flac`, `ogg`, `webm`.---

### Combo Balancing Strategies

Nakonfigurujte vyváženie jednotlivých kombinácií v**Dashboard → Combos → Create/Edit → Strategy**.

| Stratégia | Popis |
| ------------------- | ------------------------------------------------------------------------ |
|**Round-Robin**| Postupne rotuje medzi modelmi |
|**Priorita**| Vždy vyskúšajte prvý model; vracia sa len pri chybe |
|**Náhodné**| Vyberie náhodný model z kombinácie pre každú požiadavku |
|**Vážený**| Trasy proporcionálne na základe pridelených hmotností na model |
|**Najmenej používané**| Smeruje k modelu s najmenším počtom nedávnych požiadaviek (používa kombinovanú metriku) |
|**Nákladovo optimalizované**| Trasy k najlacnejšiemu dostupnému modelu (používa cenovú tabuľku) |

Globálne predvolené nastavenia pre kombináciu je možné nastaviť v**Dashboard → Settings → Routing → Combo Defaults**.---

### Health Dashboard

Prístup cez**Dashboard → Health**. Prehľad stavu systému v reálnom čase so 6 kartami:

| Karta | Čo ukazuje |
| ---------------------- | ----------------------------------------------------------- |
|**Stav systému**| Uptime, verzia, využitie pamäte, dátový adresár |
|**Zdravie poskytovateľa**| Stav ističa podľa poskytovateľa (zatvorené/otvorené/polootvorené) |
|**Obmedzenia sadzieb**| Aktívne zníženia rýchlosti limitu na účet so zostávajúcim časom |
|**Aktívne blokovania**| Poskytovatelia dočasne zablokovaní politikou uzamknutia |
|**Vyrovnávacia pamäť podpisov**| Štatistiky vyrovnávacej pamäte deduplikácie (aktívne kľúče, počet prístupov) |
|**Telemetria latencie**| p50/p95/p99 agregácia latencie podľa poskytovateľa |

**Tip pre profesionálov:**Stránka Zdravie sa automaticky obnovuje každých 10 sekúnd. Pomocou karty ističa identifikujte, ktorí poskytovatelia majú problémy.---

## 🖥️ Desktop Application (Electron)

OmniRoute je k dispozícii ako natívna desktopová aplikácia pre Windows, MacOS a Linux.### Inštalácia

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

Výstup → `elektrón/dist-elektrón/`### Key Features

| Funkcia                        | Popis                                                             |
| ------------------------------ | ----------------------------------------------------------------- | ------------------------- |
| **Pripravenosť servera**       | Polls server pred zobrazením okna (bez prázdnej obrazovky)        |
| **Systémová lišta**            | Minimalizovať do zásobníka, zmeniť port, ukončiť ponuku zásobníka |
| **Správa portov**              | Zmeňte port servera zo zásobníka (automaticky reštartuje server)  |
| **Zásady zabezpečenia obsahu** | Reštriktívny CSP prostredníctvom hlavičiek relácie                |
| **Jedna inštancia**            | Naraz môže bežať iba jedna inštancia aplikácie                    |
| **Režim offline**              | Pribalený server Next.js funguje bez internetu                    | ### Environment Variables |

| Premenná              | Predvolené | Popis                             |
| --------------------- | ---------- | --------------------------------- |
| "OMNIROUTE_PORT"      | "20128"    | Port servera                      |
| `OMNIROUTE_MEMORY_MB` | "512"      | Limit haldy Node.js (64–16384 MB) |

📖 Úplná dokumentácia: [`electron/README.md`](../electron/README.md)
