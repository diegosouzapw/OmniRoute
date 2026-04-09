# User Guide (Čeština)

🌐 **Languages:** 🇺🇸 [English](../../../../docs/USER_GUIDE.md) · 🇪🇸 [es](../../es/docs/USER_GUIDE.md) · 🇫🇷 [fr](../../fr/docs/USER_GUIDE.md) · 🇩🇪 [de](../../de/docs/USER_GUIDE.md) · 🇮🇹 [it](../../it/docs/USER_GUIDE.md) · 🇷🇺 [ru](../../ru/docs/USER_GUIDE.md) · 🇨🇳 [zh-CN](../../zh-CN/docs/USER_GUIDE.md) · 🇯🇵 [ja](../../ja/docs/USER_GUIDE.md) · 🇰🇷 [ko](../../ko/docs/USER_GUIDE.md) · 🇸🇦 [ar](../../ar/docs/USER_GUIDE.md) · 🇮🇳 [hi](../../hi/docs/USER_GUIDE.md) · 🇮🇳 [in](../../in/docs/USER_GUIDE.md) · 🇹🇭 [th](../../th/docs/USER_GUIDE.md) · 🇻🇳 [vi](../../vi/docs/USER_GUIDE.md) · 🇮🇩 [id](../../id/docs/USER_GUIDE.md) · 🇲🇾 [ms](../../ms/docs/USER_GUIDE.md) · 🇳🇱 [nl](../../nl/docs/USER_GUIDE.md) · 🇵🇱 [pl](../../pl/docs/USER_GUIDE.md) · 🇸🇪 [sv](../../sv/docs/USER_GUIDE.md) · 🇳🇴 [no](../../no/docs/USER_GUIDE.md) · 🇩🇰 [da](../../da/docs/USER_GUIDE.md) · 🇫🇮 [fi](../../fi/docs/USER_GUIDE.md) · 🇵🇹 [pt](../../pt/docs/USER_GUIDE.md) · 🇷🇴 [ro](../../ro/docs/USER_GUIDE.md) · 🇭🇺 [hu](../../hu/docs/USER_GUIDE.md) · 🇧🇬 [bg](../../bg/docs/USER_GUIDE.md) · 🇸🇰 [sk](../../sk/docs/USER_GUIDE.md) · 🇺🇦 [uk-UA](../../uk-UA/docs/USER_GUIDE.md) · 🇮🇱 [he](../../he/docs/USER_GUIDE.md) · 🇵🇭 [phi](../../phi/docs/USER_GUIDE.md) · 🇧🇷 [pt-BR](../../pt-BR/docs/USER_GUIDE.md) · 🇨🇿 [cs](../../cs/docs/USER_GUIDE.md) · 🇹🇷 [tr](../../tr/docs/USER_GUIDE.md)

---

Kompletní průvodce pro konfiguraci poskytovatelů, vytváření kombinací, integraci nástrojů CLI a nasazení OmniRoute.---

## Table of Contents

- [Přehled cen](#-pricing-at-a-glance)
- [Případy použití](#-případů použití)
- [Nastavení poskytovatele](#-provider-setup)
- [Integrace CLI](#-cli-integrace)
- [Deployment](#-deployment)
- [Dostupné modely](#-dostupných-modelů)
- [Pokročilé funkce](#-pokročilých-funkcí)---

## 💰 Pricing at a Glance

| Úroveň            | Poskytovatel      | Cena              | Obnovení kvóty              | Nejlepší pro               |
| ----------------- | ----------------- | ----------------- | --------------------------- | -------------------------- |
| **💳 PŘEDPLATNÉ** | Claude Code (Pro) | 20 $/měsíc        | 5h + týdně                  | Již přihlášeno             |
|                   | Codex (Plus/Pro)  | 20–200 USD/měsíc  | 5h + týdně                  | Uživatelé OpenAI           |
|                   | Gemini CLI        | **ZDARMA**        | 180 tis./měsíc + 1 tis./den | Každý!                     |
|                   | GitHub Copilot    | 10–19 USD/měsíc   | Měsíčně                     | Uživatelé GitHubu          |
| **🔑 API KEY**    | DeepSeek          | Platba za použití | Žádné                       | Levné uvažování            |
|                   | Groq              | Platba za použití | Žádné                       | Ultra-rychlé odvození      |
|                   | xAI (Grok)        | Platba za použití | Žádné                       | Grok 4 zdůvodnění          |
|                   | Mistral           | Platba za použití | Žádné                       | Modely hostované EU        |
|                   | Zmatenost         | Platba za použití | Žádné                       | Rozšířené vyhledávání      |
|                   | Společně AI       | Platba za použití | Žádné                       | Open-source modely         |
|                   | Ohňostroje AI     | Platba za použití | Žádné                       | Fast FLUX obrázky          |
|                   | Cerebras          | Platba za použití | Žádné                       | Rychlost waferové stupnice |
|                   | Cohere            | Platba za použití | Žádné                       | Příkaz R+ RAG              |
|                   | NVIDIA NIM        | Platba za použití | Žádné                       | Podnikové modely           |
| **💰 LEVNĚ**      | GLM-4.7           | 0,6 $/1 mil.      | Denně 10:00                 | Záloha rozpočtu            |
|                   | MiniMax M2.1      | 0,2 $/1 milion    | 5hodinové válcování         | Nejlevnější varianta       |
|                   | Kimi K2           | 9 $/měsíc byt     | 10 milionů tokenů/měsíc     | Předvídatelné náklady      |
| **🆓 ZDARMA**     | Qoder             | 0 $               | Neomezené                   | 8 modelů zdarma            |
|                   | Qwen              | 0 $               | Neomezené                   | 3 modely zdarma            |
|                   | Kiro              | 0 $               | Neomezené                   | Claude zdarma              |

**💡 Tip pro profesionály:**Začněte s Gemini CLI (180 000 zdarma/měsíc) + kombinace Qoder (bez omezení zdarma) = cena 0 $!---

## 🎯 Use Cases

### Case 1: "I have Claude Pro subscription"

**Problém:**Kvóta vyprší nevyužita, rychlostní limity při náročném kódování```
Combo: "maximize-claude"

1. cc/claude-opus-4-6 (use subscription fully)
2. glm/glm-4.7 (cheap backup when quota out)
3. if/kimi-k2-thinking (free emergency fallback)

Monthly cost: $20 (subscription) + ~$5 (backup) = $25 total
vs. $20 + hitting limits = frustration

````

### Case 2: "I want zero cost"

**Problém:**Nemohu si dovolit předplatné, potřebujete spolehlivé kódování AI```
Combo: "free-forever"
  1. gc/gemini-3-flash         (180K free/month)
  2. if/kimi-k2-thinking       (unlimited free)
  3. qw/qwen3-coder-plus       (unlimited free)

Monthly cost: $0
Quality: Production-ready models
````

### Case 3: "I need 24/7 coding, no interruptions"

**Problém:**Termíny, nemohu si dovolit prostoje```
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

**Problém:**Potřebujete asistenta AI v aplikacích pro zasílání zpráv, zcela zdarma```
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

**Tip pro profesionály:**Používejte Opus pro složité úkoly, Sonnet pro rychlost. OmniRoute sleduje kvótu na model!#### OpenAI Codex (Plus/Pro)

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

**Nejlepší hodnota:**Obrovská bezplatná úroveň! Použijte to před placenými úrovněmi.#### GitHub Copilot

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

1. Zaregistrujte se: [Zhipu AI](https://open.bigmodel.cn/)
2. Získejte API klíč z Coding Plan
3. Panel → Přidat klíč API: Poskytovatel: `glm`, Klíč API: `váš klíč`

**Použití:**`glm/glm-4,7` —**Tip pro profesionály:**Kódovací plán nabízí 3× kvótu za 1/7 cenu! Resetovat denně v 10:00.#### MiniMax M2.1 (5h reset, $0.20/1M)

1. Zaregistrujte se: [MiniMax](https://www.minimax.io/)
2. Získat klíč API → Řídicí panel → Přidat klíč API

**Použití:**`minimax/MiniMax-M2.1` —**Tip pro profesionály:**Nejlevnější možnost pro dlouhý kontext (1 milion tokenů)!#### Kimi K2 ($9/month flat)

1. Přihlaste se k odběru: [Moonshot AI](https://platform.moonshot.ai/)
2. Získat klíč API → Řídicí panel → Přidat klíč API

**Použití:**`kimi/kimi-nejnovější` —**Tip pro profesionály:**Pevná cena 9 $ měsíčně za 10 milionů tokenů = 0,90 $ / 1 milion efektivních nákladů!### 🆓 FREE Providers

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

Upravit `~/.claude/config.json`:```json
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

Upravit `~/.openclaw/openclaw.json`:```json
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

**Nebo použijte Dashboard:**Nástroje CLI → OpenClaw → Auto-config### Cline / Continue / RooCode

```

Provider: OpenAI Compatible
Base URL: http://localhost:20128/v1
API Key: [from dashboard]
Model: cc/claude-opus-4-6

````

---

## Nasazení

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

CLI automaticky načte `.env` z `~/.omniroute/.env` nebo `./.env`.### VPS Deployment

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

U serverů s omezenou pamětí RAM použijte možnost omezení paměti:```bash

# With 512MB limit (default)

pm2 start npm --name omniroute -- start

# Or with custom memory limit

OMNIROUTE_MEMORY_MB=512 pm2 start npm --name omniroute -- start

# Or using ecosystem.config.js

pm2 start ecosystem.config.js

````

Vytvořte `ecosystem.config.js`:```javascript
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

Informace o režimu integrovaném do hostitele s binárními soubory CLI naleznete v části Docker v hlavních dokumentech.### Void Linux (xbps-src)

Uživatelé Void Linuxu mohou zabalit a nainstalovat OmniRoute nativně pomocí rámce křížové kompilace `xbps-src`. To automatizuje samostatné sestavení Node.js spolu s požadovanými nativními vazbami `better-sqlite3`.

<podrobnosti>
<summary><b>Zobrazit šablonu xbps-src</b></summary>```bash
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

| Proměnná | Výchozí | Popis |
| ---------------------------------------- | ------------------------------------- | -------------------------------------------------------------------------------------------------- |
| `JWT_SECRET` | `omniroute-default-secret-change-me` | Tajemství podpisu JWT (**změna výroby**) |
| `VÝCHOZÍ_HESLO` | "123456" | První přihlašovací heslo |
| `DATA_DIR` | `~/.omniroute` | Datový adresář (db, využití, protokoly) |
| "PORT" | výchozí rámec | Port služby (v příkladech `20128`) |
| `HOSTNAME` | výchozí rámec | Svázat hostitele (výchozí nastavení Dockeru je `0.0.0.0`) |
| `NODE_ENV` | výchozí runtime | Nastavte `produkci` pro nasazení |
| `BASE_URL` | `http://localhost:20128` | Interní základní URL na straně serveru |
| `CLOUD_URL` | `https://omniroute.dev` | Základní URL koncového bodu synchronizace cloudu |
| `API_KEY_SECRET` | `endpoint-proxy-api-key-secret` | Tajný klíč HMAC pro generované klíče API |
| `REQUIRE_API_KEY` | "nepravda" | Vynutit klíč rozhraní API nosiče na `/v1/*` |
| `ALLOW_API_KEY_REVEAL` | "nepravda" | Povolit Api Manager kopírovat úplné klíče API na vyžádání |
| `PROVIDER_LIMITS_SYNC_INTERVAL_MINUTES` | "70" | Obnovovací kadence na straně serveru pro data o limitech poskytovatelů uložená v mezipaměti; Tlačítka pro obnovení uživatelského rozhraní stále spouštějí ruční synchronizaci |
| `DISABLE_SQLITE_AUTO_BACKUP` | "nepravda" | Zakázat automatické snímky SQLite před zápisem/importem/obnovením; ruční zálohování stále funguje |
| `APP_LOG_TO_FILE`                       | `true`                               | Enables application and audit log output to disk                                                          |
| `AUTH_COOKIE_SECURE` | "nepravda" | Vynutit `Secure` auth cookie (za HTTPS reverzní proxy) |
| `CLOUDFLARED_BIN` | odstaveno | Místo řízeného stahování použijte existující binární soubor `cloudflared` |
| `CLOUDFLARED_PROTOCOL` | `http2` | Transport pro spravované rychlé tunely (`http2`, `quic` nebo `auto`) |
| `OMNIROUTE_MEMORY_MB` | "512" | Limit haldy Node.js v MB |
| `PROMPT_CACHE_MAX_SIZE` | "50" | Max promptní položky mezipaměti |
| `SEMANTIC_CACHE_MAX_SIZE` | "100" | Maximální počet záznamů sémantické mezipaměti |Úplný odkaz na proměnné prostředí naleznete v [README](../README.md).---

## 📊 Available Models

<podrobnosti>
<summary><b>Zobrazit všechny dostupné modely</b></summary>

**Kód Claude (`cc/`)**— Pro/Max: `cc/claude-opus-4-6`, `cc/claude-sonnet-4-5-20250929`, `cc/claude-haiku-4-5-20251001`

**Codex (`cx/`)**— Plus/Pro: `cx/gpt-5.2-codex`, `cx/gpt-5.1-codex-max`

**Gemini CLI (`gc/`)**— ZDARMA: `gc/gemini-3-flash-preview`, `gc/gemini-2.5-pro`

**GitHub Copilot (`gh/`)**: `gh/gpt-5`, `gh/claude-4,5-sonnet`

**GLM (`glm/`)**— 0,6 $/1 milion: `glm/glm-4,7`

**MiniMax (`minimax/`)**— 0,2 $/1 milion: `minimax/MiniMax-M2,1`

**Qoder (`if/`)**— ZDARMA: `if/kimi-k2-thinking`, `if/qwen3-coder-plus`, `if/deepseek-r1`

**Qwen (`qw/`)**— ZDARMA: `qw/qwen3-coder-plus`, `qw/qwen3-coder-flash`

**Kiro (`kr/`)**— ZDARMA: `kr/claude-sonnet-4.5`, `kr/claude-haiku-4.5`

**DeepSeek (`ds/`)**: `ds/deepseek-chat`, `ds/deepseek-reasoner`

**Groq (`groq/`)**: `groq/lama-3.3-70b-versatile`, `groq/lama-4-maverick-17b-128e-instruct`

**xAI (`xai/`)**: `xai/grok-4`, `xai/grok-4-0709-fast-reasoning`, `xai/grok-code-mini`

**Mistral (`mistral/`)**: `mistral/mistral-large-2501`, `mistral/codestral-2501`

**Perplexity (`pplx/`)**: `pplx/sonar-pro`, `pplx/sonar`

**Together AI (`together/`)**: `together/meta-lama/Llama-3.3-70B-Instruct-Turbo`

**Fireworks AI (`ohňostroje/`)**: `ohňostroje/účty/ohňostroje/modely/deepseek-v3p1`

**Cerebras (`cerebras/`)**: `cerebras/lama-3.3-70b`

**Cohere (`cohere/`)**: `cohere/command-r-plus-08-2024`

**NVIDIA NIM (`nvidia/`)**: `nvidia/nvidia/llama-3.3-70b-instruct`</details>

---

## 🧩 Advanced Features

### Custom Models

Přidejte jakékoli ID modelu k libovolnému poskytovateli bez čekání na aktualizaci aplikace:```bash
# Via API
curl -X POST http://localhost:20128/api/provider-models \
  -H "Content-Type: application/json" \
  -d '{"provider": "openai", "modelId": "gpt-4.5-preview", "modelName": "GPT-4.5 Preview"}'

# List: curl http://localhost:20128/api/provider-models?provider=openai
# Remove: curl -X DELETE "http://localhost:20128/api/provider-models?provider=openai&model=gpt-4.5-preview"
````

Nebo použijte Dashboard:**Poskytovatelé → [Poskytovatel] → Vlastní modely**.

Poznámky:

- OpenRouter a poskytovatelé kompatibilní s OpenAI/Anthropic jsou spravováni pouze z**Available Models**. Ručně přidávejte, importujte a automaticky synchronizujte všechny pozemky ve stejném seznamu dostupných modelů, takže pro tyto poskytovatele neexistuje žádná samostatná sekce Vlastní modely.
  – Sekce**Vlastní modely**je určena poskytovatelům, kteří nevystavují importy spravovaných dostupných modelů.### Dedicated Provider Routes

Směrujte požadavky přímo ke konkrétnímu poskytovateli s ověřením modelu:```bash
POST http://localhost:20128/v1/providers/openai/chat/completions
POST http://localhost:20128/v1/providers/openai/embeddings
POST http://localhost:20128/v1/providers/fireworks/images/generations

````

Pokud chybí předpona poskytovatele, je automaticky přidána. Neodpovídající modely vrátí „400“.### Network Proxy Configuration

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

**Přednost:**Specifické pro klíč → Specifické pro kombinované → Specifické pro poskytovatele → Globální → Prostředí.### Model Catalog API

```bash
curl http://localhost:20128/api/models/catalog
```

Vrátí modely seskupené podle poskytovatele s typy (`chat`, `embedding`, `image`).### Cloud Sync

- Synchronizujte poskytovatele, komba a nastavení napříč zařízeními
- Automatická synchronizace na pozadí s časovým limitem + rychlé selhání
- V produkci preferujte `BASE_URL`/`CLOUD_URL` na straně serveru### Cloudflare Quick Tunnel

- K dispozici v**Dashboard → Endpoints**pro Docker a další samostatně hostovaná nasazení
- Vytvoří dočasnou adresu URL `https://*.trycloudflare.com`, která přesměruje na váš aktuální koncový bod `/v1` kompatibilní s OpenAI
- Nejprve povolte instalaci `cloudflared` pouze v případě potřeby; pozdější restartování znovu použije stejný spravovaný binární soubor
- Rychlé tunely se po restartu OmniRoute nebo kontejneru automaticky neobnoví; v případě potřeby je znovu povolte z palubní desky
- Adresy URL tunelu jsou pomíjivé a mění se při každém zastavení/spuštění tunelu
- Spravované rychlé tunely ve výchozím nastavení pro přenos HTTP/2, aby se zabránilo hlučným varováním vyrovnávací paměti QUIC UDP v omezených kontejnerech
- Pokud chcete volbu řízeného přenosu přepsat, nastavte `CLOUDFLARED_PROTOCOL=quic` nebo `auto`
- Nastavte `CLOUDFLARED_BIN`, pokud dáváte přednost použití předinstalovaného binárního souboru `cloudflared` namísto spravovaného stahování### LLM Gateway Intelligence (Phase 9)

-**Sémantická mezipaměť**– Automatické ukládání do mezipaměti bez streamování, teplota=0 odpovědí (obejít s `X-OmniRoute-No-Cache: true`)
–**Request Idempotency**– Deduplikuje požadavky do 5 s pomocí hlavičky „Idempotency-Key“ nebo „X-Request-Id“ -**Sledování pokroku**— Přihlaste se k událostem SSE `event: progress` prostřednictvím záhlaví `X-OmniRoute-Progress: true`---

### Translator Playground

Přístup přes**Dashboard → Translator**. Laďte a vizualizujte, jak OmniRoute překládá požadavky API mezi poskytovateli.

| Režim                | Účel                                                                                  |
| -------------------- | ------------------------------------------------------------------------------------- |
| **Hřiště**           | Vyberte zdrojové/cílové formáty, vložte požadavek a okamžitě uvidíte přeložený výstup |
| **Chat Tester**      | Odesílejte zprávy živého chatu přes proxy a prohlédněte si celý cyklus žádost/odpověď |
| **Zkušební stolice** | Spusťte dávkové testy ve více kombinacích formátů, abyste ověřili správnost překladu  |
| **Živý monitor**     | Sledujte překlady v reálném čase, jak požadavky proudí přes proxy                     |

**Případy použití:**

- Odlaďte, proč konkrétní kombinace klient/poskytovatel selhává
- Ověřte, že se značky myšlení, volání nástrojů a systémové výzvy překládají správně
- Porovnejte rozdíly mezi formáty OpenAI, Claude, Gemini a Responses API---

### Routing Strategies

Konfigurujte přes**Dashboard → Nastavení → Směrování**.

| Strategie                    | Popis                                                                                               |
| ---------------------------- | --------------------------------------------------------------------------------------------------- | ----------------------------------- |
| **Vyplňte první**            | Používá účty v pořadí priority – primární účet zpracovává všechny požadavky, dokud není dostupný    |
| **Round Robin**              | Prochází všechny účty s nastavitelným limitem (výchozí: 3 volání na účet)                           |
| **P2C (síla dvou možností)** | Vybere 2 náhodné účty a cesty ke zdravějšímu — vyrovnává zátěž s vědomím zdraví                     |
| **Náhodné**                  | Náhodně vybere účet pro každý požadavek pomocí Fisher-Yates shuffle                                 |
| **Nejméně používané**        | Směrování na účet s nejstarším časovým razítkem `lastUsedAt`, distribuce provozu rovnoměrně         |
| **Costově optimalizované**   | Směrování na účet s nejnižší hodnotou priority, optimalizace pro poskytovatele s nejnižšími náklady | #### External Sticky Session Header |

Pro externí afinitu relace (například agenti Claude Code/Codex za reverzními proxy) odešlete:```http
X-Session-Id: your-session-key

````

OmniRoute také přijímá `x_session_id` a vrací efektivní klíč relace v `X-OmniRoute-Session-Id`.

Pokud používáte Nginx a odesíláte záhlaví formuláře podtržení, povolte:```nginx
underscores_in_headers on;
````

#### Wildcard Model Aliases

Vytvořte vzory zástupných znaků pro přemapování názvů modelů:```
Pattern: claude-sonnet-_ → Target: cc/claude-sonnet-4-5-20250929
Pattern: gpt-_ → Target: gh/gpt-5.1-codex

````

Zástupné znaky podporují `*` (jakékoli znaky) a `?` (jeden znak).#### Fallback Chains

Definujte globální záložní řetězce, které platí pro všechny požadavky:```
Chain: production-fallback
  1. cc/claude-opus-4-6
  2. gh/gpt-5.1-codex
  3. glm/glm-4.7
````

---

### Resilience & Circuit Breakers

Konfigurujte pomocí**Dashboard → Settings → Resilience**.

OmniRoute implementuje odolnost na úrovni poskytovatele se čtyřmi komponentami:

1.**Profily poskytovatelů**— Konfigurace podle poskytovatele pro:

- Práh selhání (kolik selhání před otevřením)
- Doba vychladnutí
- Citlivost detekce rychlostního limitu
- Exponenciální backoff parametry

  2.**Upravitelné limity rychlosti**— Výchozí nastavení na úrovni systému konfigurovatelné na řídicím panelu: -**Požadavky za minutu (RPM)**– Maximální počet požadavků za minutu na účet -**Min Time Between Requests**— Minimální prodleva v milisekundách mezi požadavky -**Max Concurrent Requests**– Maximální počet souběžných požadavků na účet

- Klikněte na**Upravit**pro úpravu a poté na**Uložit**nebo**Zrušit**. Hodnoty přetrvávají prostřednictvím rozhraní API pro odolnost.

  3.**Circuit Breaker**— Sleduje poruchy na poskytovatele a automaticky otevře okruh, když je dosaženo prahové hodnoty: -**UZAVŘENO**(Zdravé) – Požadavky běží normálně -**OPEN**— Poskytovatel je po opakovaných selháních dočasně zablokován -**HALF_OPEN**— Testování, zda se poskytovatel zotavil

  4.**Policies & Locked Identifiers**– Zobrazuje stav jističe a uzamčené identifikátory s možností vynuceného odemknutí.

  5.**Automatická detekce limitu rychlosti**— Monitoruje hlavičky `429` a `Retry-After`, aby se proaktivně zabránilo překročení limitů sazeb poskytovatele.

**Tip pro profesionály:**Když se poskytovatel zotaví z výpadku, použijte tlačítko**Resetovat vše**k vymazání všech jističů a ochlazení.---

### Database Export / Import

Spravujte zálohy databáze v**Hlavní panel → Nastavení → Systém a úložiště**.

| Akce                         | Popis                                                                                                                                                |
| ---------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- | ------- |
| **Export databáze**          | Stáhne aktuální databázi SQLite jako soubor `.sqlite`                                                                                                |
| **Exportovat vše (.tar.gz)** | Stáhne úplný záložní archiv včetně: databáze, nastavení, kombinací, připojení poskytovatele (bez přihlašovacích údajů), metadat klíče API            |
| **Importovat databázi**      | Nahrajte soubor `.sqlite`, který nahradí aktuální databázi. Předimportní záloha se vytvoří automaticky, pokud není `DISABLE_SQLITE_AUTO_BACKUP=true` | ```bash |

# API: Export database

curl -o backup.sqlite http://localhost:20128/api/db-backups/export

# API: Export all (full archive)

curl -o backup.tar.gz http://localhost:20128/api/db-backups/exportAll

# API: Import database

curl -X POST http://localhost:20128/api/db-backups/import \
 -F "file=@backup.sqlite"

````

**Ověření importu:**U importovaného souboru je ověřena integrita (kontrola SQLite pragma), požadované tabulky (`provider_connections`, `provider_nodes`, `combos`, `api_keys`) a velikost (max 100 MB).

**Případy použití:**

- Migrujte OmniRoute mezi počítači
- Vytvářejte externí zálohy pro obnovu po havárii
- Sdílejte konfigurace mezi členy týmu (exportovat vše → sdílet archiv)---

### Settings Dashboard

Stránka nastavení je uspořádána do 6 záložek pro snadnou navigaci:

| Tab | Obsah |
| --------------- | ---------------------------------------------------------------------------------------------- |
|**Obecné**| Nástroje systémového úložiště, nastavení vzhledu, ovládací prvky motivu a viditelnost postranního panelu pro jednotlivé položky |
|**Zabezpečení**| Nastavení přihlášení/hesla, řízení přístupu k IP, ověření API pro `/modely` a blokování poskytovatelů |
|**Směrování**| Globální strategie směrování (6 možností), zástupné modelové aliasy, záložní řetězce, výchozí kombinace |
|**Odolnost**| Profily poskytovatelů, upravitelné limity sazeb, stav jističe, zásady a uzamčené identifikátory |
|**AI**| Konfigurace rozpočtu myšlení, okamžité vložení globálního systému, statistiky rychlé vyrovnávací paměti |
|**Pokročilé**| Globální konfigurace proxy (HTTP/SOCKS5) |---

### Costs & Budget Management

Přístup přes**Dashboard → Náklady**.

| Tab | Účel |
| ----------- | ---------------------------------------------------------------------------------------- |
|**Rozpočet**| Nastavte limity výdajů na klíč API s denními/týdenními/měsíčními rozpočty a sledováním v reálném čase |
|**Cena**| Prohlížejte a upravujte položky cen modelu – cena za 1 000 vstupních/výstupních tokenů na poskytovatele |```bash
# API: Set a budget
curl -X POST http://localhost:20128/api/usage/budget \
  -H "Content-Type: application/json" \
  -d '{"keyId": "key-123", "limit": 50.00, "period": "monthly"}'

# API: Get current budget status
curl http://localhost:20128/api/usage/budget
````

**Sledování nákladů:**Každý požadavek zaznamenává využití tokenu a vypočítává náklady pomocí cenové tabulky. Prohlédněte si rozdělení v**Hlavním panelu → Využití**podle poskytovatele, modelu a klíče API.---

### Audio Transcription

OmniRoute podporuje přepis zvuku prostřednictvím koncového bodu kompatibilního s OpenAI:```bash
POST /v1/audio/transcriptions
Authorization: Bearer your-api-key
Content-Type: multipart/form-data

# Example with curl

curl -X POST http://localhost:20128/v1/audio/transcriptions \
 -H "Authorization: Bearer your-api-key" \
 -F "file=@audio.mp3" \
 -F "model=deepgram/nova-3"

````

Dostupní poskytovatelé:**Deepgram**(`deepgram/`),**AssemblyAI**(`assemblyai/`).

Podporované zvukové formáty: `mp3`, `wav`, `m4a`, `flac`, `ogg`, `webm`.---

### Combo Balancing Strategies

Nakonfigurujte vyvážení jednotlivých kombinací v**Dashboard → Combos → Create/Edit → Strategy**.

| Strategie | Popis |
| ------------------- | ------------------------------------------------------------------------- |
|**Round-Robin**| Postupně otáčí modely |
|**Priorita**| Vždy zkouší první model; vrátí se pouze při chybě |
|**Náhodné**| Vybere náhodný model z kombinace pro každý požadavek |
|**Vážený**| Trasy proporcionálně na základě přiřazených vah na model |
|**Nejméně používané**| Směruje k modelu s nejmenším počtem nedávných požadavků (používá kombinované metriky) |
|**Nákladově optimalizované**| Trasy k nejlevnějšímu dostupnému modelu (používá cenovou tabulku) |

Globální výchozí combo lze nastavit v**Dashboard → Settings → Routing → Combo Defaults**.---

### Health Dashboard

Přístup přes**Dashboard → Zdraví**. Přehled stavu systému v reálném čase se 6 kartami:

| Karta | Co ukazuje |
| ---------------------- | ----------------------------------------------------------- |
|**Stav systému**| Uptime, verze, využití paměti, datový adresář |
|**Zdraví poskytovatele**| Stav jističe podle poskytovatele (zavřeno/otevřeno/polootevřeno) |
|**Limity sazeb**| Aktivní cooldowny rychlostního limitu na účet se zbývajícím časem |
|**Aktivní uzamčení**| Poskytovatelé dočasně blokováni zásadou uzamčení |
|**Signature Cache**| Statistiky deduplikační mezipaměti (aktivní klíče, četnost zásahů) |
|**Latenční telemetrie**| p50/p95/p99 agregace latence na poskytovatele |

**Tip pro profesionály:**Stránka Zdraví se automaticky obnovuje každých 10 sekund. Pomocí karty jističe zjistěte, u kterých poskytovatelů dochází k problémům.---

## 🖥️ Desktop Application (Electron)

OmniRoute je k dispozici jako nativní desktopová aplikace pro Windows, macOS a Linux.### Instalace

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

Výstup → `elektron/dist-elektron/`### Key Features

| Funkce                        | Popis                                                               |
| ----------------------------- | ------------------------------------------------------------------- | ------------------------- |
| **Připravenost serveru**      | Před zobrazením okna dotazuje server (bez prázdné obrazovky)        |
| **Systémová lišta**           | Minimalizovat do zásobníku, změnit port, opustit nabídku zásobníku  |
| **Správa portů**              | Změňte port serveru ze zásobníku (automatické restartování serveru) |
| **Zásady zabezpečení obsahu** | Omezující CSP prostřednictvím záhlaví relací                        |
| **Jedna instance**            | Najednou může běžet pouze jedna instance aplikace                   |
| **Režim offline**             | Přibalený server Next.js funguje bez internetu                      | ### Environment Variables |

| Proměnná              | Výchozí | Popis                             |
| --------------------- | ------- | --------------------------------- |
| `OMNIROUTE_PORT`      | "20128" | Port serveru                      |
| `OMNIROUTE_MEMORY_MB` | "512"   | Limit haldy Node.js (64–16384 MB) |

📖 Úplná dokumentace: [`electron/README.md`](../electron/README.md)
