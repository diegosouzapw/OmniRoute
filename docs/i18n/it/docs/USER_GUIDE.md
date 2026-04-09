# User Guide (Italiano)

🌐 **Languages:** 🇺🇸 [English](../../../../docs/USER_GUIDE.md) · 🇪🇸 [es](../../es/docs/USER_GUIDE.md) · 🇫🇷 [fr](../../fr/docs/USER_GUIDE.md) · 🇩🇪 [de](../../de/docs/USER_GUIDE.md) · 🇮🇹 [it](../../it/docs/USER_GUIDE.md) · 🇷🇺 [ru](../../ru/docs/USER_GUIDE.md) · 🇨🇳 [zh-CN](../../zh-CN/docs/USER_GUIDE.md) · 🇯🇵 [ja](../../ja/docs/USER_GUIDE.md) · 🇰🇷 [ko](../../ko/docs/USER_GUIDE.md) · 🇸🇦 [ar](../../ar/docs/USER_GUIDE.md) · 🇮🇳 [hi](../../hi/docs/USER_GUIDE.md) · 🇮🇳 [in](../../in/docs/USER_GUIDE.md) · 🇹🇭 [th](../../th/docs/USER_GUIDE.md) · 🇻🇳 [vi](../../vi/docs/USER_GUIDE.md) · 🇮🇩 [id](../../id/docs/USER_GUIDE.md) · 🇲🇾 [ms](../../ms/docs/USER_GUIDE.md) · 🇳🇱 [nl](../../nl/docs/USER_GUIDE.md) · 🇵🇱 [pl](../../pl/docs/USER_GUIDE.md) · 🇸🇪 [sv](../../sv/docs/USER_GUIDE.md) · 🇳🇴 [no](../../no/docs/USER_GUIDE.md) · 🇩🇰 [da](../../da/docs/USER_GUIDE.md) · 🇫🇮 [fi](../../fi/docs/USER_GUIDE.md) · 🇵🇹 [pt](../../pt/docs/USER_GUIDE.md) · 🇷🇴 [ro](../../ro/docs/USER_GUIDE.md) · 🇭🇺 [hu](../../hu/docs/USER_GUIDE.md) · 🇧🇬 [bg](../../bg/docs/USER_GUIDE.md) · 🇸🇰 [sk](../../sk/docs/USER_GUIDE.md) · 🇺🇦 [uk-UA](../../uk-UA/docs/USER_GUIDE.md) · 🇮🇱 [he](../../he/docs/USER_GUIDE.md) · 🇵🇭 [phi](../../phi/docs/USER_GUIDE.md) · 🇧🇷 [pt-BR](../../pt-BR/docs/USER_GUIDE.md) · 🇨🇿 [cs](../../cs/docs/USER_GUIDE.md) · 🇹🇷 [tr](../../tr/docs/USER_GUIDE.md)

---

Guida completa per la configurazione dei provider, la creazione di combinazioni, l'integrazione degli strumenti CLI e la distribuzione di OmniRoute.---

## Table of Contents

- [Prezzi in sintesi](#-prezzi in sintesi)
- [Casi d'uso](#-casi d'uso)
- [Configurazione del provider](#-configurazione del provider)
- [Integrazione CLI](#-integrazione-cli)
- [Distribuzione](#-distribuzione)
- [Modelli disponibili](#-modelli-disponibili)
- [Funzionalità avanzate](#-funzionalità-avanzate)---

## 💰 Pricing at a Glance

| Livello            | Fornitore             | Costo             | Reimpostazione quota     | Ideale per               |
| ------------------ | --------------------- | ----------------- | ------------------------ | ------------------------ |
| **💳 ABBONAMENTO** | Codice Claude (Pro)   | $20/mese          | 5 ore + settimanale      | Già iscritto             |
|                    | Codice (Plus/Pro)     | $20-200/mese      | 5 ore + settimanale      | Utenti OpenAI            |
|                    | Gemelli CLI           | **GRATIS**        | 180K/mese + 1K/giorno    | Tutti!                   |
|                    | Copilota GitHub       | $ 10-19/mese      | Mensile                  | Utenti GitHub            |
| **🔑 CHIAVE API**  | Ricerca profonda      | Paga per utilizzo | Nessuno                  | Ragionamento economico   |
|                    | Groq                  | Paga per utilizzo | Nessuno                  | Inferenza ultraveloce    |
|                    | xAI (Grok)            | Paga per utilizzo | Nessuno                  | Grok 4 ragionamento      |
|                    | Maestrale             | Paga per utilizzo | Nessuno                  | Modelli ospitati nell'UE |
|                    | Perplessità           | Paga per utilizzo | Nessuno                  | Ricerca aumentata        |
|                    | Insieme AI            | Paga per utilizzo | Nessuno                  | Modelli open source      |
|                    | Fuochi d'artificio AI | Paga per utilizzo | Nessuno                  | Immagini FLUX veloci     |
|                    | Cerebri               | Paga per utilizzo | Nessuno                  | Velocità su scala wafer  |
|                    | Coerenza              | Paga per utilizzo | Nessuno                  | Comando R+ RAG           |
|                    | NVIDIA NIM            | Paga per utilizzo | Nessuno                  | Modelli di impresa       |
| **💰 ECONOMICO**   | GLM-4.7               | $ 0,6/1 milione   | Tutti i giorni 10:00     | Backup del budget        |
|                    | MiniMax M2.1          | $ 0,2/1 milione   | 5 ore di rotazione       | Opzione più economica    |
|                    | Kimi K2               | $ 9/mese fisso    | 10 milioni di token/mese | Costo prevedibile        |
| **🆓 GRATUITO**    | Qoder                 | $0                | Illimitato               | 8 modelli gratuiti       |
|                    | Qwen                  | $0                | Illimitato               | 3 modelli gratuiti       |
|                    | Kiro                  | $0                | Illimitato               | Claude libero            |

**💡 Suggerimento da professionista:**Inizia con la combinazione Gemini CLI (180.000 gratuiti al mese) + Qoder (gratuito illimitato) = costo $ 0!---

## 🎯 Use Cases

### Case 1: "I have Claude Pro subscription"

**Problema:**La quota scade inutilizzata, limiti di velocità durante la codifica pesante```
Combo: "maximize-claude"

1. cc/claude-opus-4-6 (use subscription fully)
2. glm/glm-4.7 (cheap backup when quota out)
3. if/kimi-k2-thinking (free emergency fallback)

Monthly cost: $20 (subscription) + ~$5 (backup) = $25 total
vs. $20 + hitting limits = frustration

````

### Case 2: "I want zero cost"

**Problema:**non posso permettermi abbonamenti, ho bisogno di una codifica IA affidabile```
Combo: "free-forever"
  1. gc/gemini-3-flash         (180K free/month)
  2. if/kimi-k2-thinking       (unlimited free)
  3. qw/qwen3-coder-plus       (unlimited free)

Monthly cost: $0
Quality: Production-ready models
````

### Case 3: "I need 24/7 coding, no interruptions"

**Problema:**Scadenze, non posso permettermi tempi di inattività```
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

**Problema:**È necessario un assistente AI nelle app di messaggistica, completamente gratuito```
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

**Suggerimento professionale:**usa Opus per attività complesse, Sonnet per la velocità. OmniRoute tiene traccia della quota per modello!#### OpenAI Codex (Plus/Pro)

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

**Miglior rapporto qualità-prezzo:**Enorme livello gratuito! Utilizzalo prima dei livelli a pagamento.#### GitHub Copilot

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

1. Iscriviti: [Zhipu AI](https://open.bigmodel.cn/)
2. Ottieni la chiave API dal piano di codifica
3. Dashboard → Aggiungi chiave API: Provider: `glm`, Chiave API: `your-key`

**Utilizza:**`glm/glm-4.7` —**Suggerimento professionale:**Il piano di codifica offre una quota 3× a un costo di 1/7! Resetta ogni giorno alle 10:00.#### MiniMax M2.1 (5h reset, $0.20/1M)

1. Iscriviti: [MiniMax](https://www.minimax.io/)
2. Ottieni chiave API → Dashboard → Aggiungi chiave API

**Utilizza:**`minimax/MiniMax-M2.1` —**Suggerimento professionale:**Opzione più economica per contesti lunghi (token da 1 milione)!#### Kimi K2 ($9/month flat)

1. Iscriviti: [Moonshot AI](https://platform.moonshot.ai/)
2. Ottieni chiave API → Dashboard → Aggiungi chiave API

**Utilizza:**`kimi/kimi-latest` —**Suggerimento professionale:**Risolti $ 9/mese per 10 milioni di token = $ 0,90/1 milione di costi effettivi!### 🆓 FREE Providers

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

Modifica `~/.claude/config.json`:```json
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

Modifica `~/.openclaw/openclaw.json`:```json
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

**Oppure utilizza Dashboard:**Strumenti CLI → OpenClaw → Configurazione automatica### Cline / Continue / RooCode

```

Provider: OpenAI Compatible
Base URL: http://localhost:20128/v1
API Key: [from dashboard]
Model: cc/claude-opus-4-6

````

---

## Distribuzione

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

La CLI carica automaticamente `.env` da `~/.omniroute/.env` o `./.env`.### VPS Deployment

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

Per i server con RAM limitata, utilizzare l'opzione di limite di memoria:```bash

# With 512MB limit (default)

pm2 start npm --name omniroute -- start

# Or with custom memory limit

OMNIROUTE_MEMORY_MB=512 pm2 start npm --name omniroute -- start

# Or using ecosystem.config.js

pm2 start ecosystem.config.js

````

Crea `ecosystem.config.js`:```javascript
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

Per la modalità integrata nell'host con i file binari della CLI, consulta la sezione Docker nella documentazione principale.### Void Linux (xbps-src)

Gli utenti Void Linux possono creare pacchetti e installare OmniRoute in modo nativo utilizzando il framework di compilazione incrociata "xbps-src". Ciò automatizza la compilazione autonoma di Node.js insieme ai collegamenti nativi "better-sqlite3" richiesti.

<dettagli>
<summary><b>Visualizza modello xbps-src</b></summary>```bash
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

| Variabile | Predefinito | Descrizione |
| --------------------------------------- | ------------------------------------ | --------------------------------------------------------------------------------------------------------- |
| `JWT_SECRET` | `omniroute-default-secret-change-me` | Segreto firma JWT (**cambio di produzione**) |
| `PASSWORD_INIZIALE` | `123456` | Prima password di accesso |
| "DIR_DATI" | `~/.omniroute` | Directory dati (db, utilizzo, log) |
| "PORTO" | quadro predefinito | Porta di servizio (`20128` negli esempi) |
| "NOMEHOST" | quadro predefinito | Associa host (Docker ha come impostazione predefinita `0.0.0.0`) |
| `NODO_ENV` | impostazione predefinita di runtime | Imposta "produzione" per la distribuzione |
| "URL_BASE" | `http://localhost:20128` | URL di base interno lato server |
| `URL_CLOUD` | `https://omniroute.dev` | URL di base dell'endpoint di sincronizzazione cloud |
| `API_KEY_SECRET` | `endpoint-proxy-api-key-secret` | Segreto HMAC per le chiavi API generate |
| `REQUIRE_API_KEY` | `falso` | Applica la chiave API Bearer su `/v1/*` |
| `ALLOW_API_KEY_REVEAL` | `falso` | Consenti al gestore API di copiare le chiavi API complete su richiesta |
| "PROVIDER_LIMITS_SYNC_INTERVAL_MINUTES" | `70` | Cadenza di aggiornamento lato server per i dati sui limiti del provider memorizzati nella cache; I pulsanti di aggiornamento dell'interfaccia utente attivano ancora la sincronizzazione manuale |
| `DISABLE_SQLITE_AUTO_BACKUP` | `falso` | Disabilitare gli snapshot SQLite automatici prima delle operazioni di scrittura/importazione/ripristino; i backup manuali funzionano ancora |
| `APP_LOG_TO_FILE`                       | `true`                               | Enables application and audit log output to disk                                                          |
| `AUTH_COOKIE_SECURE` | `falso` | Forza il cookie di autenticazione `Secure` (dietro il proxy inverso HTTPS) |
| `CLOUDFLARED_BIN` | non impostato | Utilizza un file binario `cloudflared` esistente invece del download gestito |
| `CLOUDFLARED_PROTOCOL` | "http2" | Trasporto per tunnel rapidi gestiti (`http2`, `quic` o `auto`) |
| `OMNIROUTE_MEMORY_MB` | "512" | Limite heap di Node.js in MB |
| `PROMPT_CACHE_MAX_SIZE` | `50` | Numero massimo di voci nella cache dei prompt |
| `SEMANTIC_CACHE_MAX_SIZE` | "100" | Numero massimo di voci della cache semantica |Per il riferimento completo alle variabili di ambiente, vedere [README](../README.md).---

## 📊 Available Models

<dettagli>
<summary><b>Visualizza tutti i modelli disponibili</b></summary>

**Codice Claude (`cc/`)**— Pro/Max: `cc/claude-opus-4-6`, `cc/claude-sonnet-4-5-20250929`, `cc/claude-haiku-4-5-20251001`

**Codice (`cx/`)**— Plus/Pro: `cx/gpt-5.2-codex`, `cx/gpt-5.1-codex-max`

**Gemini CLI (`gc/`)**— GRATUITO: `gc/gemini-3-flash-preview`, `gc/gemini-2.5-pro`

**GitHub Copilot (`gh/`)**: `gh/gpt-5`, `gh/claude-4.5-sonnet`

**GLM (`glm/`)**— 0,6 USD/1 milione: `glm/glm-4,7`

**MiniMax (`minimax/`)**— 0,2 USD/1 milione: "minimax/MiniMax-M2.1"

**Qoder (`if/`)**— GRATUITO: `if/kimi-k2-thinking`, `if/qwen3-coder-plus`, `if/deepseek-r1`

**Qwen (`qw/`)**— GRATUITO: `qw/qwen3-coder-plus`, `qw/qwen3-coder-flash`

**Kiro (`kr/`)**— GRATUITO: `kr/claude-sonnet-4.5`, `kr/claude-haiku-4.5`

**DeepSeek (`ds/`)**: `ds/deepseek-chat`, `ds/deepseek-reasoner`

**Groq (`groq/`)**: `groq/llama-3.3-70b-versatile`, `groq/llama-4-maverick-17b-128e-instruct`

**xAI (`xai/`)**: `xai/grok-4`, `xai/grok-4-0709-fast-reasoning`, `xai/grok-code-mini`

**Mistral (`mistral/`)**: `mistral/mistral-large-2501`, `mistral/codestral-2501`

**Perplessità (`pplx/`)**: `pplx/sonar-pro`, `pplx/sonar`

**Insieme AI (`insieme/`)**: `insieme/meta-llama/Llama-3.3-70B-Instruct-Turbo`

**Fuochi d'artificio AI (`fireworks/`)**: `fireworks/accounts/fireworks/models/deepseek-v3p1`

**Cerebras (`cerebras/`)**: `cerebras/llama-3.3-70b`

**Cohere (`cohere/`)**: `cohere/command-r-plus-08-2024`

**NVIDIA NIM (`nvidia/`)**: `nvidia/nvidia/llama-3.3-70b-instruct`</details>

---

## 🧩 Advanced Features

### Custom Models

Aggiungi qualsiasi ID modello a qualsiasi provider senza attendere un aggiornamento dell'app:```bash
# Via API
curl -X POST http://localhost:20128/api/provider-models \
  -H "Content-Type: application/json" \
  -d '{"provider": "openai", "modelId": "gpt-4.5-preview", "modelName": "GPT-4.5 Preview"}'

# List: curl http://localhost:20128/api/provider-models?provider=openai
# Remove: curl -X DELETE "http://localhost:20128/api/provider-models?provider=openai&model=gpt-4.5-preview"
````

Oppure utilizza la Dashboard:**Provider → [Provider] → Modelli personalizzati**.

Note:

- I provider compatibili con OpenRouter e OpenAI/Anthropic sono gestiti solo da**Modelli disponibili**. L'aggiunta manuale, l'importazione e la sincronizzazione automatica rientrano tutti nello stesso elenco di modelli disponibili, quindi non esiste una sezione Modelli personalizzati separata per tali fornitori.
- La sezione**Modelli personalizzati**è destinata ai fornitori che non espongono le importazioni gestite di modelli disponibili.### Dedicated Provider Routes

Instrada le richieste direttamente a un fornitore specifico con convalida del modello:```bash
POST http://localhost:20128/v1/providers/openai/chat/completions
POST http://localhost:20128/v1/providers/openai/embeddings
POST http://localhost:20128/v1/providers/fireworks/images/generations

````

Se mancante, il prefisso del provider viene aggiunto automaticamente. I modelli non corrispondenti restituiscono "400".### Network Proxy Configuration

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

**Precedenza:**Specifico per chiave → Specifico per combo → Specifico per provider → Globale → Ambiente.### Model Catalog API

```bash
curl http://localhost:20128/api/models/catalog
```

Restituisce modelli raggruppati per provider con tipi (`chat`, `embedding`, `image`).### Cloud Sync

- Sincronizza provider, combo e impostazioni su tutti i dispositivi
- Sincronizzazione automatica in background con timeout + fail-fast
- Preferisci `BASE_URL`/`CLOUD_URL` lato server in produzione### Cloudflare Quick Tunnel

- Disponibile in**Dashboard → Endpoint**per Docker e altre distribuzioni self-hosted
- Crea un URL temporaneo `https://*.trycloudflare.com` che inoltra al tuo attuale endpoint `/v1` compatibile con OpenAI
- Per prima cosa abilita l'installazione di `cloudflared` solo quando necessario; i riavvii successivi riutilizzano lo stesso file binario gestito
- I tunnel rapidi non vengono ripristinati automaticamente dopo il riavvio di OmniRoute o del contenitore; riattivarli dalla dashboard quando necessario
- Gli URL dei tunnel sono effimeri e cambiano ogni volta che interrompi/avvii il tunnel
- I tunnel rapidi gestiti utilizzano per impostazione predefinita il trasporto HTTP/2 per evitare avvisi rumorosi del buffer QUIC UDP nei contenitori vincolati
- Imposta `CLOUDFLARED_PROTOCOL=quic` o `auto` se desideri sovrascrivere la scelta del trasporto gestito
- Imposta `CLOUDFLARED_BIN` se preferisci utilizzare un binario `cloudflared` preinstallato invece del download gestito### LLM Gateway Intelligence (Phase 9)

-**Cache semantica**— Memorizza automaticamente nella cache le risposte non-streaming, temperatura=0 (ignora con `X-OmniRoute-No-Cache: true`) -**Request Idempotency**: deduplica le richieste entro 5 secondi tramite l'intestazione "Idempotency-Key" o "X-Request-Id" -**Monitoraggio dei progressi**: attivazione degli eventi SSE "event: progress" tramite l'intestazione "X-OmniRoute-Progress: true"---

### Translator Playground

Accesso tramite**Dashboard → Traduttore**. Eseguire il debug e visualizzare il modo in cui OmniRoute traduce le richieste API tra provider.

| Modalità                  | Scopo                                                                                                            |
| ------------------------- | ---------------------------------------------------------------------------------------------------------------- |
| **Parco giochi**          | Seleziona i formati di origine/destinazione, incolla una richiesta e visualizza immediatamente l'output tradotto |
| **Tester della chat**     | Invia messaggi di chat dal vivo tramite il proxy e controlla l'intero ciclo di richiesta/risposta                |
| **Banco di prova**        | Esegui test batch su più combinazioni di formati per verificare la correttezza della traduzione                  |
| **Monitoraggio dal vivo** | Guarda le traduzioni in tempo reale mentre le richieste passano attraverso il proxy                              |

**Casi d'uso:**

- Debug del motivo per cui una specifica combinazione client/provider non riesce
- Verificare che i tag pensanti, le chiamate agli strumenti e i prompt di sistema vengano tradotti correttamente
- Confronta le differenze di formato tra i formati OpenAI, Claude, Gemini e Responses API---

### Routing Strategies

Configura tramite**Dashboard → Impostazioni → Routing**.

| Strategia                         | Descrizione                                                                                                                  |
| --------------------------------- | ---------------------------------------------------------------------------------------------------------------------------- | ----------------------------------- |
| **Compila prima**                 | Utilizza gli account in ordine di priorità: l'account principale gestisce tutte le richieste fino a quando non è disponibile |
| **Round Robin**                   | Scorre tutti gli account con un limite permanente configurabile (impostazione predefinita: 3 chiamate per account)           |
| **P2C (il potere di due scelte)** | Scegli 2 account casuali e percorsi verso quello più sano: bilancia il carico con la consapevolezza della salute             |
| **Casuale**                       | Seleziona casualmente un account per ciascuna richiesta utilizzando Fisher-Yates shuffle                                     |
| **Meno usato**                    | Instrada all'account con il timestamp "lastUsedAt" più vecchio, distribuendo il traffico in modo uniforme                    |
| **Costi ottimizzati**             | Instrada all'account con il valore di priorità più basso, ottimizzando per i fornitori a basso costo                         | #### External Sticky Session Header |

Per l'affinità di sessione esterna (ad esempio, agenti Claude Code/Codex dietro proxy inversi), inviare:```http
X-Session-Id: your-session-key

````

OmniRoute accetta anche "x_session_id" e restituisce la chiave di sessione effettiva in "X-OmniRoute-Session-Id".

Se utilizzi Nginx e invii intestazioni in formato underscore, abilita:```nginx
underscores_in_headers on;
````

#### Wildcard Model Aliases

Crea modelli con caratteri jolly per rimappare i nomi dei modelli:```
Pattern: claude-sonnet-_ → Target: cc/claude-sonnet-4-5-20250929
Pattern: gpt-_ → Target: gh/gpt-5.1-codex

````

I caratteri jolly supportano "*" (qualsiasi carattere) e "?" (carattere singolo).#### Fallback Chains

Definisci catene di fallback globali che si applicano a tutte le richieste:```
Chain: production-fallback
  1. cc/claude-opus-4-6
  2. gh/gpt-5.1-codex
  3. glm/glm-4.7
````

---

### Resilience & Circuit Breakers

Configura tramite**Dashboard → Impostazioni → Resilienza**.

OmniRoute implementa la resilienza a livello di fornitore con quattro componenti:

1.**Profili fornitore**: configurazione per fornitore per:

- Soglia di guasto (quanti guasti prima dell'apertura)
- Durata del raffreddamento
- Sensibilità di rilevamento del limite di velocità
- Parametri di backoff esponenziale

  2.**Limiti di velocità modificabili**: impostazioni predefinite a livello di sistema configurabili nel dashboard: -**Richieste al minuto (RPM)**: numero massimo di richieste al minuto per account -**Tempo minimo tra le richieste**: intervallo minimo in millisecondi tra le richieste -**Numero massimo di richieste simultanee**: numero massimo di richieste simultanee per account

- Fai clic su**Modifica**per modificare, quindi su**Salva**o**Annulla**. I valori persistono tramite l'API di resilienza.

  3.**Interruttore di circuito**: tiene traccia dei guasti per fornitore e apre automaticamente il circuito quando viene raggiunta una soglia: -**CHIUSO**(integro): le richieste fluiscono normalmente -**APERTO**: il provider è temporaneamente bloccato dopo ripetuti errori -**HALF_OPEN**: verifica se il provider è stato ripristinato

  4.**Criteri e identificatori bloccati**: mostra lo stato dell'interruttore automatico e gli identificatori bloccati con funzionalità di sblocco forzato.

  5.**Rilevamento automatico del limite di velocità**: monitora le intestazioni "429" e "Retry-After" per evitare in modo proattivo di raggiungere i limiti di velocità del provider.

**Pro Tip:**Use**Reset All**button to clear all circuit breakers and cooldowns when a provider recovers from an outage.---

### Database Export / Import

Gestisci i backup del database in**Dashboard → Impostazioni → Sistema e archiviazione**.

| Azione                      | Descrizione                                                                                                                                                        |
| --------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------- |
| **Esporta database**        | Scarica il database SQLite corrente come file `.sqlite`                                                                                                            |
| **Esporta tutto (.tar.gz)** | Scarica un archivio di backup completo che include: database, impostazioni, combo, connessioni al provider (nessuna credenziale), metadati della chiave API        |
| **Importa database**        | Carica un file `.sqlite` per sostituire il database corrente. Un backup pre-importazione viene creato automaticamente a meno che `DISABLE_SQLITE_AUTO_BACKUP=true` | ```bash |

# API: Export database

curl -o backup.sqlite http://localhost:20128/api/db-backups/export

# API: Export all (full archive)

curl -o backup.tar.gz http://localhost:20128/api/db-backups/exportAll

# API: Import database

curl -X POST http://localhost:20128/api/db-backups/import \
 -F "file=@backup.sqlite"

````

**Convalida dell'importazione:**il file importato viene convalidato per l'integrità (controllo pragma SQLite), le tabelle richieste (`provider_connections`, `provider_nodes`, `combos`, `api_keys`) e le dimensioni (max 100 MB).

**Casi d'uso:**

- Migrare OmniRoute tra macchine
- Creare backup esterni per il ripristino di emergenza
- Condividi le configurazioni tra i membri del team (esporta tutto → condividi archivio)---

### Settings Dashboard

La pagina delle impostazioni è organizzata in 6 schede per una facile navigazione:

| Scheda | Contenuto |
| -------------- | ---------------------------------------------------------------------------------------- |
|**Generale**| Strumenti di archiviazione del sistema, impostazioni dell'aspetto, controlli del tema e visibilità della barra laterale per elemento |
|**Sicurezza**| Impostazioni login/password, controllo accesso IP, autenticazione API per `/models` e blocco provider |
|**Percorso**| Strategia di routing globale (6 opzioni), alias del modello con caratteri jolly, catene di fallback, impostazioni predefinite combinate |
|**Resilienza**| Profili dei fornitori, limiti di velocità modificabili, stato dell'interruttore automatico, policy e identificatori bloccati |
|**AI**| Pensare alla configurazione del budget, all'inserimento dei prompt del sistema globale, alle statistiche della cache dei prompt |
|**Avanzato**| Configurazione proxy globale (HTTP/SOCKS5) |---

### Costs & Budget Management

Accesso tramite**Dashboard → Costi**.

| Scheda | Scopo |
| ----------- | ---------------------------------------------------------------------------------- |
|**Bilancio**| Imposta limiti di spesa per chiave API con budget giornalieri/settimanali/mensili e monitoraggio in tempo reale |
|**Prezzi**| Visualizza e modifica le voci dei prezzi dei modelli: costo per token di input/output da 1.000 per fornitore |```bash
# API: Set a budget
curl -X POST http://localhost:20128/api/usage/budget \
  -H "Content-Type: application/json" \
  -d '{"keyId": "key-123", "limit": 50.00, "period": "monthly"}'

# API: Get current budget status
curl http://localhost:20128/api/usage/budget
````

**Monitoraggio dei costi:**ogni richiesta registra l'utilizzo del token e calcola il costo utilizzando la tabella dei prezzi. Visualizza i dettagli in**Dashboard → Utilizzo**per provider, modello e chiave API.---

### Audio Transcription

OmniRoute supporta la trascrizione audio tramite l'endpoint compatibile con OpenAI:```bash
POST /v1/audio/transcriptions
Authorization: Bearer your-api-key
Content-Type: multipart/form-data

# Example with curl

curl -X POST http://localhost:20128/v1/audio/transcriptions \
 -H "Authorization: Bearer your-api-key" \
 -F "file=@audio.mp3" \
 -F "model=deepgram/nova-3"

````

Provider disponibili:**Deepgram**(`deepgram/`),**AssemblyAI**(`assemblyai/`).

Formati audio supportati: `mp3`, `wav`, `m4a`, `flac`, `ogg`, `webm`.---

### Combo Balancing Strategies

Configura il bilanciamento per combo in**Dashboard → Combo → Crea/Modifica → Strategia**.

| Strategia | Descrizione |
| ------------------ | ------------------------------------------------------------------------------- |
|**Round-Robin**| Ruota i modelli in sequenza |
|**Priorità**| Prova sempre il primo modello; ricorre solo in caso di errore |
|**Casuale**| Sceglie un modello casuale dalla combo per ogni richiesta |
|**Ponderato**| Percorsi proporzionali in base ai pesi assegnati per modello |
|**Meno utilizzato**| Indirizza al modello con il minor numero di richieste recenti (utilizza metriche combinate) |
|**Ottimizzazione dei costi**| Itinerari verso il modello disponibile più economico (utilizza la tabella dei prezzi) |

Le impostazioni predefinite globali della combo possono essere impostate in**Dashboard → Impostazioni → Routing → Impostazioni combo**.---

### Health Dashboard

Accesso tramite**Dashboard → Salute**. Panoramica sullo stato del sistema in tempo reale con 6 carte:

| Carta | Cosa mostra |
| --------------------- | ------------------------------------------------------------ |
|**Stato del sistema**| Tempo di attività, versione, utilizzo della memoria, directory dei dati |
|**Salute del fornitore**| Stato dell'interruttore automatico per provider (chiuso/aperto/semiaperto) |
|**Limiti di tariffa**| Raffreddamenti del limite di velocità attivi per account con tempo rimanente |
|**Blocchi attivi**| Provider temporaneamente bloccati dalla politica di blocco |
|**Cache delle firme**| Statistiche della cache di deduplicazione (chiavi attive, percentuale di successo) |
|**Telemetria della latenza**| Aggregazione della latenza p50/p95/p99 per provider |

**Suggerimento avanzato:**la pagina Salute si aggiorna automaticamente ogni 10 secondi. Utilizza la scheda dell'interruttore per identificare quali fornitori stanno riscontrando problemi.---

## 🖥️ Desktop Application (Electron)

OmniRoute è disponibile come applicazione desktop nativa per Windows, macOS e Linux.### Installare

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

Uscita → "elettrone/dist-elettrone/".### Key Features

| Caratteristica                          | Descrizione                                                                          |
| --------------------------------------- | ------------------------------------------------------------------------------------ | ------------------------- |
| **Predisposizione del server**          | Esegue il polling del server prima di mostrare la finestra (nessuna schermata vuota) |
| **Vassoio di sistema**                  | Riduci a icona nel vassoio, cambia porta, esci dal menu del vassoio                  |
| **Gestione del porto**                  | Cambia la porta del server dal vassoio (server con riavvio automatico)               |
| **Politica di sicurezza dei contenuti** | CSP restrittivo tramite intestazioni di sessione                                     |
| **Istanza singola**                     | È possibile eseguire solo un'istanza dell'app alla volta                             |
| **Modalità offline**                    | Il server Next.js in bundle funziona senza Internet                                  | ### Environment Variables |

| Variabile             | Predefinito | Descrizione                          |
| --------------------- | ----------- | ------------------------------------ |
| `OMNIROUTE_PORT`      | `20128`     | Porta del server                     |
| `OMNIROUTE_MEMORY_MB` | "512"       | Limite heap di Node.js (64–16384 MB) |

📖 Documentazione completa: [`electron/README.md`](../electron/README.md)
