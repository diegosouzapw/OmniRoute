# User Guide (Deutsch)

🌐 **Languages:** 🇺🇸 [English](../../../../docs/USER_GUIDE.md) · 🇪🇸 [es](../../es/docs/USER_GUIDE.md) · 🇫🇷 [fr](../../fr/docs/USER_GUIDE.md) · 🇩🇪 [de](../../de/docs/USER_GUIDE.md) · 🇮🇹 [it](../../it/docs/USER_GUIDE.md) · 🇷🇺 [ru](../../ru/docs/USER_GUIDE.md) · 🇨🇳 [zh-CN](../../zh-CN/docs/USER_GUIDE.md) · 🇯🇵 [ja](../../ja/docs/USER_GUIDE.md) · 🇰🇷 [ko](../../ko/docs/USER_GUIDE.md) · 🇸🇦 [ar](../../ar/docs/USER_GUIDE.md) · 🇮🇳 [hi](../../hi/docs/USER_GUIDE.md) · 🇮🇳 [in](../../in/docs/USER_GUIDE.md) · 🇹🇭 [th](../../th/docs/USER_GUIDE.md) · 🇻🇳 [vi](../../vi/docs/USER_GUIDE.md) · 🇮🇩 [id](../../id/docs/USER_GUIDE.md) · 🇲🇾 [ms](../../ms/docs/USER_GUIDE.md) · 🇳🇱 [nl](../../nl/docs/USER_GUIDE.md) · 🇵🇱 [pl](../../pl/docs/USER_GUIDE.md) · 🇸🇪 [sv](../../sv/docs/USER_GUIDE.md) · 🇳🇴 [no](../../no/docs/USER_GUIDE.md) · 🇩🇰 [da](../../da/docs/USER_GUIDE.md) · 🇫🇮 [fi](../../fi/docs/USER_GUIDE.md) · 🇵🇹 [pt](../../pt/docs/USER_GUIDE.md) · 🇷🇴 [ro](../../ro/docs/USER_GUIDE.md) · 🇭🇺 [hu](../../hu/docs/USER_GUIDE.md) · 🇧🇬 [bg](../../bg/docs/USER_GUIDE.md) · 🇸🇰 [sk](../../sk/docs/USER_GUIDE.md) · 🇺🇦 [uk-UA](../../uk-UA/docs/USER_GUIDE.md) · 🇮🇱 [he](../../he/docs/USER_GUIDE.md) · 🇵🇭 [phi](../../phi/docs/USER_GUIDE.md) · 🇧🇷 [pt-BR](../../pt-BR/docs/USER_GUIDE.md) · 🇨🇿 [cs](../../cs/docs/USER_GUIDE.md) · 🇹🇷 [tr](../../tr/docs/USER_GUIDE.md)

---

Vollständiger Leitfaden zum Konfigurieren von Anbietern, Erstellen von Kombinationen, Integrieren von CLI-Tools und Bereitstellen von OmniRoute.---

## Table of Contents

- [Preise auf einen Blick](#-pricing-at-a-glance)
- [Anwendungsfälle](#-use-cases)
- [Anbieter-Setup](#-provider-setup)
- [CLI-Integration](#-cli-integration)
- [Bereitstellung](#-deployment)
- [Verfügbare Modelle](#-available-models)
- [Erweiterte Funktionen](#-advanced-features)---

## 💰 Pricing at a Glance

| Stufe                | Anbieter          | Kosten                | Kontingent zurücksetzen   | Am besten für                   |
| -------------------- | ----------------- | --------------------- | ------------------------- | ------------------------------- |
| **💳 ABO**           | Claude Code (Pro) | 20 $/Monat            | 5h + wöchentlich          | Bereits abonniert               |
|                      | Codex (Plus/Pro)  | 20–200 $/Monat        | 5h + wöchentlich          | OpenAI-Benutzer                 |
|                      | Gemini CLI        | **KOSTENLOS**         | 180.000/Monat + 1.000/Tag | Alle!                           |
|                      | GitHub-Copilot    | 10–19 $/Monat         | Monatlich                 | GitHub-Benutzer                 |
| **🔑 API-SCHLÜSSEL** | DeepSeek          | Bezahlung pro Nutzung | Keine                     | Billiges Denken                 |
|                      | Groq              | Bezahlung pro Nutzung | Keine                     | Ultraschnelle Inferenz          |
|                      | xAI (Grok)        | Bezahlung pro Nutzung | Keine                     | Grok 4 Argumentation            |
|                      | Mistral           | Bezahlung pro Nutzung | Keine                     | In der EU gehostete Modelle     |
|                      | Ratlosigkeit      | Bezahlung pro Nutzung | Keine                     | Sucherweitert                   |
|                      | Zusammen KI       | Bezahlung pro Nutzung | Keine                     | Open-Source-Modelle             |
|                      | Feuerwerk KI      | Bezahlung pro Nutzung | Keine                     | Schnelle FLUX-Bilder            |
|                      | Großhirn          | Bezahlung pro Nutzung | Keine                     | Geschwindigkeit im Wafermaßstab |
|                      | Kohärent          | Bezahlung pro Nutzung | Keine                     | Befehl R+ RAG                   |
|                      | NVIDIA NIM        | Bezahlung pro Nutzung | Keine                     | Unternehmensmodelle             |
| **💰 GÜNSTIG**       | GLM-4.7           | 0,6 $/1 Mio.          | Täglich 10 Uhr            | Budgetsicherung                 |
|                      | MiniMax M2.1      | 0,2 $/1 Mio.          | 5-Stunden-Rollen          | Günstigste Option               |
|                      | Kimi K2           | $9/Monat pauschal     | 10 Millionen Token/Monat  | Vorhersehbare Kosten            |
| **🆓 KOSTENLOS**     | Qoder             | $0                    | Unbegrenzt                | 8 Modelle kostenlos             |
|                      | Qwen              | $0                    | Unbegrenzt                | 3 Modelle kostenlos             |
|                      | Kiro              | $0                    | Unbegrenzt                | Claude frei                     |

**💡 Profi-Tipp:**Beginnen Sie mit der Kombination Gemini CLI (180.000 kostenlos/Monat) + Qoder (unbegrenzt kostenlos) = 0 $ Kosten!---

## 🎯 Use Cases

### Case 1: "I have Claude Pro subscription"

**Problem:**Kontingent läuft ungenutzt ab, Ratenbegrenzungen bei intensiver Codierung```
Combo: "maximize-claude"

1. cc/claude-opus-4-6 (use subscription fully)
2. glm/glm-4.7 (cheap backup when quota out)
3. if/kimi-k2-thinking (free emergency fallback)

Monthly cost: $20 (subscription) + ~$5 (backup) = $25 total
vs. $20 + hitting limits = frustration

````

### Case 2: "I want zero cost"

**Problem:**Ich kann mir keine Abonnements leisten und brauche zuverlässige KI-Codierung```
Combo: "free-forever"
  1. gc/gemini-3-flash         (180K free/month)
  2. if/kimi-k2-thinking       (unlimited free)
  3. qw/qwen3-coder-plus       (unlimited free)

Monthly cost: $0
Quality: Production-ready models
````

### Case 3: "I need 24/7 coding, no interruptions"

**Problem:**Fristen, ich kann mir Ausfallzeiten nicht leisten```
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

**Problem:**Benötigen Sie einen KI-Assistenten in Messaging-Apps, völlig kostenlos```
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

**Profi-Tipp:**Verwenden Sie Opus für komplexe Aufgaben, Sonnet für Geschwindigkeit. OmniRoute verfolgt das Kontingent pro Modell!#### OpenAI Codex (Plus/Pro)

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

**Bester Wert:**Riesiges kostenloses Kontingent! Verwenden Sie dies vor kostenpflichtigen Stufen.#### GitHub Copilot

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

1. Registrieren Sie sich: [Zhipu AI](https://open.bigmodel.cn/)
2. Holen Sie sich den API-Schlüssel vom Coding Plan
3. Dashboard → API-Schlüssel hinzufügen: Anbieter: „glm“, API-Schlüssel: „your-key“.

**Verwenden Sie:**„glm/glm-4.7“ –**Profi-Tipp:**Coding Plan bietet 3× Kontingent zu 1/7 Kosten! Täglich um 10:00 Uhr zurückgesetzt.#### MiniMax M2.1 (5h reset, $0.20/1M)

1. Registrieren Sie sich: [MiniMax](https://www.minimax.io/)
2. API-Schlüssel abrufen → Dashboard → API-Schlüssel hinzufügen

**Verwenden Sie:**„minimax/MiniMax-M2.1“ –**Profi-Tipp:**Günstigste Option für langen Kontext (1 Mio. Token)!#### Kimi K2 ($9/month flat)

1. Abonnieren: [Moonshot AI](https://platform.moonshot.ai/)
2. API-Schlüssel abrufen → Dashboard → API-Schlüssel hinzufügen

**Verwenden Sie:**„kimi/kimi-latest“ –**Profi-Tipp:**Feste 9 $/Monat für 10 Mio. Token = 0,90 $/1 Mio. effektive Kosten!### 🆓 FREE Providers

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

Bearbeiten Sie „~/.claude/config.json“:```json
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

Bearbeiten Sie „~/.openclaw/openclaw.json“:```json
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

**Oder verwenden Sie Dashboard:**CLI-Tools → OpenClaw → Auto-config### Cline / Continue / RooCode

```

Provider: OpenAI Compatible
Base URL: http://localhost:20128/v1
API Key: [from dashboard]
Model: cc/claude-opus-4-6

````

---

## Bereitstellung

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

Die CLI lädt „.env“ automatisch von „~/.omniroute/.env“ oder „./.env“.### VPS Deployment

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

Verwenden Sie für Server mit begrenztem RAM die Option „Speicherlimit“:```bash

# With 512MB limit (default)

pm2 start npm --name omniroute -- start

# Or with custom memory limit

OMNIROUTE_MEMORY_MB=512 pm2 start npm --name omniroute -- start

# Or using ecosystem.config.js

pm2 start ecosystem.config.js

````

Erstellen Sie „ecosystem.config.js“:```javascript
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

Informationen zum hostintegrierten Modus mit CLI-Binärdateien finden Sie im Abschnitt „Docker“ in den Hauptdokumenten.### Void Linux (xbps-src)

Void-Linux-Benutzer können OmniRoute mithilfe des Cross-Compilation-Frameworks „xbps-src“ nativ verpacken und installieren. Dadurch wird der eigenständige Node.js-Build zusammen mit den erforderlichen nativen „better-sqlite3“-Bindungen automatisiert.

<Details>
<summary><b>Xbps-src-Vorlage anzeigen</b></summary>```bash
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

| Variable | Standard | Beschreibung |
| --------------------------------------- | ------------------------------------ | ------------------------------------------------------------------------------------------- |
| `JWT_SECRET` | `omniroute-default-secret-change-me` | JWT-Signaturgeheimnis (**Änderung in der Produktion**) |
| `INITIAL_PASSWORD` | `123456` | Erstes Login-Passwort |
| `DATA_DIR` | `~/.omniroute` | Datenverzeichnis (Datenbank, Nutzung, Protokolle) |
| „HAFEN“ | Framework-Standard | Service-Port (in Beispielen „20128“) |
| `HOSTNAME` | Framework-Standard | Host binden (Docker ist standardmäßig „0.0.0.0“) |
| `NODE_ENV` | Laufzeitstandard | Legen Sie „Produktion“ für die Bereitstellung | fest
| `BASE_URL` | `http://localhost:20128` | Serverseitige interne Basis-URL |
| „CLOUD_URL“ | `https://omniroute.dev` | Basis-URL des Cloud-Synchronisierungsendpunkts |
| `API_KEY_SECRET` | `endpoint-proxy-api-key-secret` | HMAC-Geheimnis für generierte API-Schlüssel |
| `REQUIRE_API_KEY` | „falsch“ | Bearer-API-Schlüssel auf „/v1/*“ erzwingen |
| `ALLOW_API_KEY_REVEAL` | „falsch“ | Api Manager erlauben, bei Bedarf vollständige API-Schlüssel zu kopieren |
| `PROVIDER_LIMITS_SYNC_INTERVAL_MINUTES` | `70` | Serverseitige Aktualisierungsfrequenz für zwischengespeicherte Provider-Limit-Daten; Schaltflächen zum Aktualisieren der Benutzeroberfläche lösen weiterhin eine manuelle Synchronisierung aus |
| `DISABLE_SQLITE_AUTO_BACKUP` | „falsch“ | Deaktivieren Sie automatische SQLite-Snapshots vor dem Schreiben/Importieren/Wiederherstellen. Manuelle Backups funktionieren weiterhin |
| `APP_LOG_TO_FILE`                       | `true`                               | Enables application and audit log output to disk                                                          |
| `AUTH_COOKIE_SECURE` | „falsch“ | „Sicheres“ Authentifizierungs-Cookie erzwingen (hinter HTTPS-Reverse-Proxy) |
| `CLOUDFLARED_BIN` | nicht gesetzt | Verwenden Sie eine vorhandene „Cloudflared“-Binärdatei anstelle eines verwalteten Downloads |
| `CLOUDFLARED_PROTOCOL` | `http2` | Transport für verwaltete Quick Tunnels („http2“, „quic“ oder „auto“) |
| `OMNIROUTE_MEMORY_MB` | `512` | Node.js-Heap-Limit in MB |
| `PROMPT_CACHE_MAX_SIZE` | `50` | Maximale Einträge im Eingabeaufforderungscache |
| `SEMANTIC_CACHE_MAX_SIZE` | `100` | Max. Einträge im semantischen Cache |Die vollständige Umgebungsvariablenreferenz finden Sie in der [README](../README.md).---

## 📊 Available Models

<Details>
<summary><b>Alle verfügbaren Modelle anzeigen</b></summary>

**Claude Code (`cc/`)**– Pro/Max: `cc/claude-opus-4-6`, `cc/claude-sonnet-4-5-20250929`, `cc/claude-haiku-4-5-20251001`

**Codex (`cx/`)**– Plus/Pro: `cx/gpt-5.2-codex`, `cx/gpt-5.1-codex-max`

**Gemini CLI (`gc/`)**– KOSTENLOS: `gc/gemini-3-flash-preview`, `gc/gemini-2.5-pro`

**GitHub Copilot (`gh/`)**: `gh/gpt-5`, `gh/claude-4.5-sonnet`

**GLM (`glm/`)**– 0,6 $/1 Mio.: `glm/glm-4,7`

**MiniMax (`minimax/`)**— 0,2 $/1 Mio.: `minimax/MiniMax-M2.1`

**Qoder (`if/`)**– KOSTENLOS: `if/kimi-k2-thinking`, `if/qwen3-coder-plus`, `if/deepseek-r1`

**Qwen (`qw/`)**— KOSTENLOS: `qw/qwen3-coder-plus`, `qw/qwen3-coder-flash`

**Kiro (`kr/`)**— KOSTENLOS: `kr/claude-sonnet-4.5`, `kr/claude-haiku-4.5`

**DeepSeek (`ds/`)**: `ds/deepseek-chat`, `ds/deepseek-reasoner`

**Groq (`groq/`)**: `groq/llama-3.3-70b-versatile`, `groq/llama-4-maverick-17b-128e-instruct`

**xAI (`xai/`)**: `xai/grok-4`, `xai/grok-4-0709-fast-reasoning`, `xai/grok-code-mini`

**Mistral (`mistral/`)**: `mistral/mistral-large-2501`, `mistral/codestral-2501`

**Perplexity (`pplx/`)**: `pplx/sonar-pro`, `pplx/sonar`

**Together AI (`together/`)**: `together/meta-llama/Llama-3.3-70B-Instruct-Turbo`

**Feuerwerks-KI (`fireworks/`)**: `fireworks/accounts/fireworks/models/deepseek-v3p1`

**Großhirn (`cerebras/`)**: `cerebras/llama-3.3-70b`

**Cohere (`cohere/`)**: `cohere/command-r-plus-08-2024`

**NVIDIA NIM (`nvidia/`)**: `nvidia/nvidia/llama-3.3-70b-instruct`</details>

---

## 🧩 Advanced Features

### Custom Models

Fügen Sie jedem Anbieter eine beliebige Modell-ID hinzu, ohne auf ein App-Update warten zu müssen:```bash
# Via API
curl -X POST http://localhost:20128/api/provider-models \
  -H "Content-Type: application/json" \
  -d '{"provider": "openai", "modelId": "gpt-4.5-preview", "modelName": "GPT-4.5 Preview"}'

# List: curl http://localhost:20128/api/provider-models?provider=openai
# Remove: curl -X DELETE "http://localhost:20128/api/provider-models?provider=openai&model=gpt-4.5-preview"
````

Oder verwenden Sie das Dashboard:**Anbieter → [Anbieter] → Benutzerdefinierte Modelle**.

Hinweise:

– OpenRouter- und OpenAI/Anthropic-kompatible Anbieter werden nur über**verfügbare Modelle**verwaltet. Manuelles Hinzufügen, Importieren und automatische Synchronisieren landen alle in derselben Liste verfügbarer Modelle, sodass es für diese Anbieter keinen separaten Abschnitt „Benutzerdefinierte Modelle“ gibt.
– Der Abschnitt**Benutzerdefinierte Modelle**ist für Anbieter gedacht, die keine verwalteten Importe verfügbarer Modelle verfügbar machen.### Dedicated Provider Routes

Leiten Sie Anfragen mit Modellvalidierung direkt an einen bestimmten Anbieter weiter:```bash
POST http://localhost:20128/v1/providers/openai/chat/completions
POST http://localhost:20128/v1/providers/openai/embeddings
POST http://localhost:20128/v1/providers/fireworks/images/generations

````

Das Anbieterpräfix wird automatisch hinzugefügt, wenn es fehlt. Nicht übereinstimmende Modelle geben „400“ zurück.### Network Proxy Configuration

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

**Vorrang:**Schlüsselspezifisch → Combo-spezifisch → Anbieterspezifisch → Global → Umgebung.### Model Catalog API

```bash
curl http://localhost:20128/api/models/catalog
```

Gibt nach Anbieter gruppierte Modelle mit Typen („chat“, „embedding“, „image“) zurück.### Cloud Sync

- Synchronisieren Sie Anbieter, Kombinationen und Einstellungen geräteübergreifend
- Automatische Hintergrundsynchronisierung mit Timeout + Fail-Fast
- Bevorzugen Sie serverseitige „BASE_URL“/„CLOUD_URL“ in der Produktion### Cloudflare Quick Tunnel

– Verfügbar in**Dashboard → Endpoints**für Docker und andere selbstgehostete Bereitstellungen

- Erstellt eine temporäre „https://\*.trycloudflare.com“-URL, die an Ihren aktuellen OpenAI-kompatiblen „/v1“-Endpunkt weiterleitet
- Zuerst aktivieren, installiert „cloudflared“ nur bei Bedarf; Bei späteren Neustarts wird dieselbe verwaltete Binärdatei wiederverwendet
  – Quick Tunnels werden nach einem OmniRoute- oder Container-Neustart nicht automatisch wiederhergestellt; Aktivieren Sie sie bei Bedarf über das Dashboard erneut
- Tunnel-URLs sind kurzlebig und ändern sich jedes Mal, wenn Sie den Tunnel stoppen/starten
  – Managed Quick Tunnels verwenden standardmäßig den HTTP/2-Transport, um laute QUIC-UDP-Pufferwarnungen in eingeschränkten Containern zu vermeiden
- Legen Sie „CLOUDFLARED_PROTOCOL=quic“ oder „auto“ fest, wenn Sie die Auswahl für den verwalteten Transport überschreiben möchten
- Legen Sie „CLOUDFLARED_BIN“ fest, wenn Sie anstelle des verwalteten Downloads lieber eine vorinstallierte „Cloudflared“-Binärdatei verwenden möchten### LLM Gateway Intelligence (Phase 9)

-**Semantischer Cache**– Nicht-Streaming-Antworten mit Temperatur = 0 werden automatisch zwischengespeichert (Umgehung mit „X-OmniRoute-No-Cache: true“) -**Request Idempotency**– Dedupliziert Anfragen innerhalb von 5 Sekunden über den Header „Idempotency-Key“ oder „X-Request-Id“. -**Fortschrittsverfolgung**– Opt-in-SSE-Events „event: progress“ über den Header „X-OmniRoute-Progress: true“.---

### Translator Playground

Zugriff über**Dashboard → Übersetzer**. Debuggen und visualisieren Sie, wie OmniRoute API-Anfragen zwischen Anbietern übersetzt.

| Modus            | Zweck                                                                                                              |
| ---------------- | ------------------------------------------------------------------------------------------------------------------ |
| **Spielplatz**   | Wählen Sie Quell-/Zielformate aus, fügen Sie eine Anfrage ein und sehen Sie sich sofort die übersetzte Ausgabe an  |
| **Chat-Tester**  | Senden Sie Live-Chat-Nachrichten über den Proxy und überprüfen Sie den gesamten Anfrage-/Antwortzyklus             |
| **Prüfstand**    | Führen Sie Batch-Tests über mehrere Formatkombinationen hinweg durch, um die Übersetzungskorrektheit zu überprüfen |
| **Live-Monitor** | Beobachten Sie Übersetzungen in Echtzeit, während Anfragen über den Proxy fließen                                  |

**Anwendungsfälle:**

- Debuggen Sie, warum eine bestimmte Client-/Provider-Kombination fehlschlägt
- Stellen Sie sicher, dass Denktags, Toolaufrufe und Systemaufforderungen korrekt übersetzt werden
- Vergleichen Sie Formatunterschiede zwischen den API-Formaten OpenAI, Claude, Gemini und Responses---

### Routing Strategies

Konfigurieren Sie über**Dashboard → Einstellungen → Routing**.

| Strategie                      | Beschreibung                                                                                                                      |
| ------------------------------ | --------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------- |
| **Zuerst füllen**              | Verwendet Konten in der Reihenfolge ihrer Priorität – das primäre Konto bearbeitet alle Anfragen, bis es nicht mehr verfügbar ist |
| **Round Robin**                | Durchläuft alle Konten mit einem konfigurierbaren Sticky-Limit (Standard: 3 Anrufe pro Konto)                                     |
| **P2C (Power of Two Choices)** | Wählt zwei zufällige Konten aus und leitet sie zum gesünderen weiter – gleicht Last mit Gesundheitsbewusstsein aus                |
| **Zufällig**                   | Wählt für jede Anfrage per Fisher-Yates-Shuffle                                                                                   | zufällig ein Konto aus              |
| **Am wenigsten genutzt**       | Leitet zum Konto mit dem ältesten „lastUsedAt“-Zeitstempel weiter und verteilt den Datenverkehr gleichmäßig                       |
| **Kostenoptimiert**            | Leitet zum Konto mit dem niedrigsten Prioritätswert weiter, optimiert für Anbieter mit den niedrigsten Kosten                     | #### External Sticky Session Header |

Für externe Sitzungsaffinität (z. B. Claude Code/Codex-Agenten hinter Reverse-Proxys) senden Sie Folgendes:```http
X-Session-Id: your-session-key

````

OmniRoute akzeptiert auch „x_session_id“ und gibt den effektiven Sitzungsschlüssel in „X-OmniRoute-Session-Id“ zurück.

Wenn Sie Nginx verwenden und Unterstrich-Header senden, aktivieren Sie Folgendes:```nginx
underscores_in_headers on;
````

#### Wildcard Model Aliases

Erstellen Sie Platzhaltermuster, um Modellnamen neu zuzuordnen:```
Pattern: claude-sonnet-_ → Target: cc/claude-sonnet-4-5-20250929
Pattern: gpt-_ → Target: gh/gpt-5.1-codex

````

Platzhalter unterstützen „*“ (beliebige Zeichen) und „?“ (einzelnes Zeichen).#### Fallback Chains

Definieren Sie globale Fallback-Ketten, die für alle Anfragen gelten:```
Chain: production-fallback
  1. cc/claude-opus-4-6
  2. gh/gpt-5.1-codex
  3. glm/glm-4.7
````

---

### Resilience & Circuit Breakers

Konfigurieren Sie über**Dashboard → Einstellungen → Resilienz**.

OmniRoute implementiert Resilienz auf Anbieterebene mit vier Komponenten:

1.**Anbieterprofile**– Konfiguration pro Anbieter für:

- Fehlerschwelle (wie viele Fehler vor dem Öffnen)
- Abklingdauer
- Empfindlichkeit der Grenzfrequenzerkennung
- Exponentielle Backoff-Parameter

  2.**Bearbeitbare Ratenbegrenzungen**– Standardeinstellungen auf Systemebene, konfigurierbar im Dashboard: -**Anfragen pro Minute (RPM)**– Maximale Anfragen pro Minute und Konto -**Min. Zeit zwischen Anfragen**– Mindestlücke in Millisekunden zwischen Anfragen -**Max. gleichzeitige Anfragen**– Maximale gleichzeitige Anfragen pro Konto

- Klicken Sie zum Ändern auf**Bearbeiten**und dann auf**Speichern**oder**Abbrechen**. Werte bleiben über die Resilience-API bestehen.

  3.**Leistungsschalter**– Verfolgt Ausfälle pro Anbieter und öffnet automatisch den Stromkreis, wenn ein Schwellenwert erreicht wird: -**GESCHLOSSEN**(fehlerfrei) – Anfragen fließen normal -**OFFEN**– Der Anbieter ist nach wiederholten Ausfällen vorübergehend gesperrt -**HALF_OPEN**– Testen, ob sich der Anbieter erholt hat

  4.**Richtlinien und Sperrkennungen**– Zeigt den Status des Leistungsschalters und die Sperrkennungen mit der Möglichkeit zum erzwungenen Entsperren an.

  5.**Automatische Erkennung von Ratenbegrenzungen**– Überwacht die Header „429“ und „Retry-After“, um proaktiv zu vermeiden, dass die Ratenbegrenzungen der Anbieter erreicht werden.

**Profi-Tipp:**Verwenden Sie die Schaltfläche**Alle zurücksetzen**, um alle Leistungsschalter und Abklingzeiten zu löschen, wenn ein Anbieter nach einem Ausfall wiederhergestellt wird.---

### Database Export / Import

Verwalten Sie Datenbanksicherungen unter**Dashboard → Einstellungen → System & Speicher**.

| Aktion                         | Beschreibung                                                                                                                                                                        |
| ------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------- |
| **Datenbank exportieren**      | Lädt die aktuelle SQLite-Datenbank als „.sqlite“-Datei herunter                                                                                                                     |
| **Alle exportieren (.tar.gz)** | Lädt ein vollständiges Backup-Archiv herunter, einschließlich: Datenbank, Einstellungen, Kombinationen, Anbieterverbindungen (keine Anmeldeinformationen), API-Schlüsselmetadaten   |
| **Datenbank importieren**      | Laden Sie eine „.sqlite“-Datei hoch, um die aktuelle Datenbank zu ersetzen. Eine Sicherung vor dem Import wird automatisch erstellt, es sei denn, „DISABLE_SQLITE_AUTO_BACKUP=true“ | ```bash |

# API: Export database

curl -o backup.sqlite http://localhost:20128/api/db-backups/export

# API: Export all (full archive)

curl -o backup.tar.gz http://localhost:20128/api/db-backups/exportAll

# API: Import database

curl -X POST http://localhost:20128/api/db-backups/import \
 -F "file=@backup.sqlite"

````

**Importvalidierung:**Die importierte Datei wird auf Integrität (SQLite-Pragma-Prüfung), erforderliche Tabellen („provider_connections“, „provider_nodes“, „combos“, „api_keys“) und Größe (max. 100 MB) validiert.

**Anwendungsfälle:**

- OmniRoute zwischen Maschinen migrieren
- Erstellen Sie externe Backups für die Notfallwiederherstellung
- Konfigurationen zwischen Teammitgliedern teilen (alle exportieren → Archiv teilen)---

### Settings Dashboard

Die Einstellungsseite ist zur einfachen Navigation in 6 Registerkarten unterteilt:

| Tab | Inhalt |
| -------------- | ----------------------------------------------------------------- |
|**Allgemein**| Systemspeicher-Tools, Darstellungseinstellungen, Design-Steuerelemente und Sichtbarkeit der Seitenleiste pro Element |
|**Sicherheit**| Anmelde-/Passworteinstellungen, IP-Zugriffskontrolle, API-Authentifizierung für „/models“ und Anbieterblockierung |
|**Routing**| Globale Routing-Strategie (6 Optionen), Wildcard-Modell-Aliase, Fallback-Ketten, Combo-Standardwerte |
|**Belastbarkeit**| Anbieterprofile, bearbeitbare Tarifbegrenzungen, Leistungsschalterstatus, Richtlinien und Sperrkennungen |
|**KI**| Denken Sie an die Budgetkonfiguration, die globale System-Prompt-Injektion, die Prompt-Cache-Statistiken |
|**Fortgeschritten**| Globale Proxy-Konfiguration (HTTP/SOCKS5) |---

### Costs & Budget Management

Zugang über**Dashboard → Kosten**.

| Tab | Zweck |
| ----------- | ------------------------------------------------------------ |
|**Budget**| Legen Sie Ausgabenlimits pro API-Schlüssel mit Tages-/Wochen-/Monatsbudgets und Echtzeitverfolgung fest |
|**Preise**| Modellpreiseinträge anzeigen und bearbeiten – Kosten pro 1.000 Ein-/Ausgabe-Tokens pro Anbieter |```bash
# API: Set a budget
curl -X POST http://localhost:20128/api/usage/budget \
  -H "Content-Type: application/json" \
  -d '{"keyId": "key-123", "limit": 50.00, "period": "monthly"}'

# API: Get current budget status
curl http://localhost:20128/api/usage/budget
````

**Kostenverfolgung:**Bei jeder Anfrage wird die Token-Nutzung protokolliert und die Kosten anhand der Preistabelle berechnet. Sehen Sie sich Aufschlüsselungen in**Dashboard → Nutzung**nach Anbieter, Modell und API-Schlüssel an.---

### Audio Transcription

OmniRoute unterstützt die Audiotranskription über den OpenAI-kompatiblen Endpunkt:```bash
POST /v1/audio/transcriptions
Authorization: Bearer your-api-key
Content-Type: multipart/form-data

# Example with curl

curl -X POST http://localhost:20128/v1/audio/transcriptions \
 -H "Authorization: Bearer your-api-key" \
 -F "file=@audio.mp3" \
 -F "model=deepgram/nova-3"

````

Verfügbare Anbieter:**Deepgram**(`deepgram/`),**AssemblyAI**(`assemblyai/`).

Unterstützte Audioformate: „mp3“, „wav“, „m4a“, „flac“, „ogg“, „webm“.---

### Combo Balancing Strategies

Konfigurieren Sie die Balance pro Combo unter**Dashboard → Combos → Erstellen/Bearbeiten → Strategie**.

| Strategie | Beschreibung |
| ------------------- | ------------------------------------------------------------------------ |
|**Round-Robin**| Rotiert nacheinander durch die Modelle |
|**Priorität**| Versucht immer das erste Modell; fällt nur bei Fehler zurück |
|**Zufällig**| Wählt für jede Anfrage ein zufälliges Modell aus der Kombination aus |
|**Gewichtet**| Routen proportional basierend auf den zugewiesenen Gewichten pro Modell |
|**Am wenigsten genutzt**| Leitet zum Modell mit den wenigsten aktuellen Anfragen weiter (verwendet Kombinationsmetriken) |
|**Kostenoptimiert**| Leitet zum günstigsten verfügbaren Modell (unter Verwendung der Preistabelle) |

Globale Combo-Standards können unter**Dashboard → Einstellungen → Routing → Combo-Standards**festgelegt werden.---

### Health Dashboard

Zugriff über**Dashboard → Gesundheit**. Echtzeit-Übersicht über den Systemzustand mit 6 Karten:

| Karte | Was es zeigt |
| --------------------- | ----------------------------------------------------------- |
|**Systemstatus**| Betriebszeit, Version, Speichernutzung, Datenverzeichnis |
|**Anbietergesundheit**| Zustand des Leistungsschalters pro Anbieter (geschlossen/offen/halboffen) |
|**Ratenbegrenzungen**| Aktive Abklingzeiten pro Konto mit verbleibender Zeit |
|**Aktive Sperren**| Anbieter, die durch die Sperrrichtlinie vorübergehend gesperrt sind |
|**Signatur-Cache**| Statistiken zum Deduplizierungs-Cache (aktive Schlüssel, Trefferquote) |
|**Latenztelemetrie**| p50/p95/p99-Latenzaggregation pro Anbieter |

**Profi-Tipp:**Die Gesundheitsseite wird alle 10 Sekunden automatisch aktualisiert. Verwenden Sie die Leistungsschalterkarte, um zu ermitteln, bei welchen Anbietern Probleme auftreten.---

## 🖥️ Desktop Application (Electron)

OmniRoute ist als native Desktop-Anwendung für Windows, macOS und Linux verfügbar.### Installieren

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

Ausgabe → `electron/dist-electron/`### Key Features

| Funktion                             | Beschreibung                                                                   |
| ------------------------------------ | ------------------------------------------------------------------------------ | ------------------------- |
| **Serverbereitschaft**               | Fragt den Server ab, bevor das Fenster angezeigt wird (kein leerer Bildschirm) |
| **Systemablage**                     | Auf Fach minimieren, Port ändern, Fachmenü verlassen                           |
| **Portverwaltung**                   | Server-Port aus der Taskleiste ändern (Server wird automatisch neu gestartet)  |
| **Richtlinie zur Inhaltssicherheit** | Restriktiver CSP über Sitzungsheader                                           |
| **Einzelne Instanz**                 | Es kann jeweils nur eine App-Instanz ausgeführt werden                         |
| **Offline-Modus**                    | Der gebündelte Next.js-Server funktioniert ohne Internet                       | ### Environment Variables |

| Variable              | Standard | Beschreibung                     |
| --------------------- | -------- | -------------------------------- |
| `OMNIROUTE_PORT`      | `20128`  | Server-Port                      |
| `OMNIROUTE_MEMORY_MB` | `512`    | Node.js-Heap-Limit (64–16384 MB) |

📖 Vollständige Dokumentation: [`electron/README.md`](../electron/README.md)
