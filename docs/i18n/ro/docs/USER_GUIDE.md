# User Guide (Română)

🌐 **Languages:** 🇺🇸 [English](../../../../docs/USER_GUIDE.md) · 🇪🇸 [es](../../es/docs/USER_GUIDE.md) · 🇫🇷 [fr](../../fr/docs/USER_GUIDE.md) · 🇩🇪 [de](../../de/docs/USER_GUIDE.md) · 🇮🇹 [it](../../it/docs/USER_GUIDE.md) · 🇷🇺 [ru](../../ru/docs/USER_GUIDE.md) · 🇨🇳 [zh-CN](../../zh-CN/docs/USER_GUIDE.md) · 🇯🇵 [ja](../../ja/docs/USER_GUIDE.md) · 🇰🇷 [ko](../../ko/docs/USER_GUIDE.md) · 🇸🇦 [ar](../../ar/docs/USER_GUIDE.md) · 🇮🇳 [hi](../../hi/docs/USER_GUIDE.md) · 🇮🇳 [in](../../in/docs/USER_GUIDE.md) · 🇹🇭 [th](../../th/docs/USER_GUIDE.md) · 🇻🇳 [vi](../../vi/docs/USER_GUIDE.md) · 🇮🇩 [id](../../id/docs/USER_GUIDE.md) · 🇲🇾 [ms](../../ms/docs/USER_GUIDE.md) · 🇳🇱 [nl](../../nl/docs/USER_GUIDE.md) · 🇵🇱 [pl](../../pl/docs/USER_GUIDE.md) · 🇸🇪 [sv](../../sv/docs/USER_GUIDE.md) · 🇳🇴 [no](../../no/docs/USER_GUIDE.md) · 🇩🇰 [da](../../da/docs/USER_GUIDE.md) · 🇫🇮 [fi](../../fi/docs/USER_GUIDE.md) · 🇵🇹 [pt](../../pt/docs/USER_GUIDE.md) · 🇷🇴 [ro](../../ro/docs/USER_GUIDE.md) · 🇭🇺 [hu](../../hu/docs/USER_GUIDE.md) · 🇧🇬 [bg](../../bg/docs/USER_GUIDE.md) · 🇸🇰 [sk](../../sk/docs/USER_GUIDE.md) · 🇺🇦 [uk-UA](../../uk-UA/docs/USER_GUIDE.md) · 🇮🇱 [he](../../he/docs/USER_GUIDE.md) · 🇵🇭 [phi](../../phi/docs/USER_GUIDE.md) · 🇧🇷 [pt-BR](../../pt-BR/docs/USER_GUIDE.md) · 🇨🇿 [cs](../../cs/docs/USER_GUIDE.md) · 🇹🇷 [tr](../../tr/docs/USER_GUIDE.md)

---

Ghid complet pentru configurarea furnizorilor, crearea combo-urilor, integrarea instrumentelor CLI și implementarea OmniRoute.---

## Table of Contents

- [Prețul dintr-o privire](#-pricing-at-a-glance)
- [Cazuri de utilizare](#-cazuri de utilizare)
- [Configurare furnizor](#-provider-setup)
- [Integrare CLI](#-cli-integration)
- [Implementare](#-implementare)
- [Modele disponibile](#-modele-disponibile)
- [Funcții avansate](#-funcții-avansate)---

## 💰 Pricing at a Glance

| Nivelul          | Furnizor          | Cost               | Resetare cotă               | Cel mai bun pentru        |
| ---------------- | ----------------- | ------------------ | --------------------------- | ------------------------- |
| **💳 ABONARE**   | Claude Code (Pro) | 20 USD/lună        | 5h + săptămânal             | Deja abonat               |
|                  | Codex (Plus/Pro)  | 20-200 USD/lună    | 5h + săptămânal             | Utilizatori OpenAI        |
|                  | Gemeni CLI        | **GRATIS**         | 180K/lună + 1K/zi           | Toată lumea!              |
|                  | GitHub Copilot    | 10-19 USD/lună     | Lunar                       | utilizatorii GitHub       |
| **🔑 CHEIA API** | DeepSeek          | Plată pe utilizare | Niciuna                     | Raționament ieftin        |
|                  | Groq              | Plată pe utilizare | Niciuna                     | Inferență ultra-rapidă    |
|                  | xAI (Grok)        | Plată pe utilizare | Niciuna                     | Grok 4 raționament        |
|                  | Mistral           | Plată pe utilizare | Niciuna                     | Modele găzduite de UE     |
|                  | Nedumerire        | Plată pe utilizare | Niciuna                     | Căutare sporită           |
|                  | Împreună AI       | Plată pe utilizare | Niciuna                     | Modele open-source        |
|                  | Artificii AI      | Plată pe utilizare | Niciuna                     | Imagini Fast FLUX         |
|                  | Cerebre           | Plată pe utilizare | Niciuna                     | Viteza la scara plachetei |
|                  | Cohere            | Plată pe utilizare | Niciuna                     | Comanda R+ RAG            |
|                  | NVIDIA NIM        | Plată pe utilizare | Niciuna                     | Modele de întreprindere   |
| **💰 IEFTIN**    | GLM-4.7           | 0,6 USD/1 milion   | Zilnic 10:00                | Backup buget              |
|                  | MiniMax M2.1      | 0,2 USD/1 milion   | rulare de 5 ore             | Cea mai ieftină opțiune   |
|                  | Kimi K2           | 9 USD/lună plat    | 10 milioane de jetoane/lună | Cost previzibil           |
| **🆓 GRATUIT**   | Qoder             | $0                 | Nelimitat                   | 8 modele gratuite         |
|                  | Qwen              | $0                 | Nelimitat                   | 3 modele gratuite         |
|                  | Kiro              | $0                 | Nelimitat                   | Claude liber              |

**💡 Sfat profesional:**Începeți cu Gemini CLI (180K gratuit/lună) + Qoder (gratuit nelimitat) combo = cost 0 USD!---

## 🎯 Use Cases

### Case 1: "I have Claude Pro subscription"

**Problemă:**Cota expiră neutilizată, limitele ratei în timpul codării grele```
Combo: "maximize-claude"

1. cc/claude-opus-4-6 (use subscription fully)
2. glm/glm-4.7 (cheap backup when quota out)
3. if/kimi-k2-thinking (free emergency fallback)

Monthly cost: $20 (subscription) + ~$5 (backup) = $25 total
vs. $20 + hitting limits = frustration

````

### Case 2: "I want zero cost"

**Problemă:**Nu-mi permit abonamente, au nevoie de codare AI fiabilă```
Combo: "free-forever"
  1. gc/gemini-3-flash         (180K free/month)
  2. if/kimi-k2-thinking       (unlimited free)
  3. qw/qwen3-coder-plus       (unlimited free)

Monthly cost: $0
Quality: Production-ready models
````

### Case 3: "I need 24/7 coding, no interruptions"

**Problemă:**Termenele limită, nu-mi permit timpi de nefuncționare```
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

**Problemă:**Aveți nevoie de asistent AI în aplicațiile de mesagerie, complet gratuit```
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

**Sfat profesionist:**Folosiți Opus pentru sarcini complexe, Sonnet pentru viteză. OmniRoute urmărește cota per model!#### OpenAI Codex (Plus/Pro)

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

**Cea mai bună valoare:**Nivel gratuit imens! Utilizați acest lucru înainte de nivelurile plătite.#### GitHub Copilot

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

1. Înscrieți-vă: [Zhipu AI](https://open.bigmodel.cn/)
2. Obțineți cheia API din Coding Plan
3. Tabloul de bord → Adăugați cheia API: Furnizor: `glm`, Cheia API: `cheia dvs.`

**Utilizați:**`glm/glm-4.7` —**Sfat profesionist:**Planul de codare oferă 3× cotă la 1/7 cost! Resetați zilnic la 10:00.#### MiniMax M2.1 (5h reset, $0.20/1M)

1. Înscrieți-vă: [MiniMax](https://www.minimax.io/)
2. Obțineți cheia API → Tabloul de bord → Adăugați cheia API

**Utilizați:**`minimax/MiniMax-M2.1` —**Sfat profesional:**Cea mai ieftină opțiune pentru context lung (1 milion de jetoane)!#### Kimi K2 ($9/month flat)

1. Abonați-vă: [Moonshot AI](https://platform.moonshot.ai/)
2. Obțineți cheia API → Tabloul de bord → Adăugați cheia API

**Utilizați:**`kimi/kimi-latest` —**Sfat profesionist:**Fix 9 USD/lună pentru 10 milioane de jetoane = 0,90 USD/1 milion cost efectiv!### 🆓 FREE Providers

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

Editați `~/.claude/config.json`:```json
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

Editați `~/.openclaw/openclaw.json`:```json
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

**Sau utilizați Dashboard:**CLI Tools → OpenClaw → Auto-config### Cline / Continue / RooCode

```

Provider: OpenAI Compatible
Base URL: http://localhost:20128/v1
API Key: [from dashboard]
Model: cc/claude-opus-4-6

````

---

## Implementare

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

CLI încarcă automat `.env` din `~/.omniroute/.env` sau `./.env`.### VPS Deployment

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

Pentru serverele cu RAM limitată, utilizați opțiunea de limită de memorie:```bash

# With 512MB limit (default)

pm2 start npm --name omniroute -- start

# Or with custom memory limit

OMNIROUTE_MEMORY_MB=512 pm2 start npm --name omniroute -- start

# Or using ecosystem.config.js

pm2 start ecosystem.config.js

````

Creați `ecosystem.config.js`:```javascript
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

Pentru modul integrat în gazdă cu binare CLI, consultați secțiunea Docker din documentele principale.### Void Linux (xbps-src)

Utilizatorii Void Linux pot împacheta și instala OmniRoute în mod nativ folosind cadrul de compilare încrucișată `xbps-src`. Acest lucru automatizează construcția independentă Node.js împreună cu legăturile native necesare `better-sqlite3`.

<detalii>
<summary><b>Vizualizați șablonul xbps-src</b></summary>```bash
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

| Variabila | Implicit | Descriere |
| --------------------------------------- | ------------------------------------ | -------------------------------------------------------------------------------------------------- |
| `JWT_SECRET` | `omniroute-default-secret-change-me` | Secret de semnare JWT (**schimbarea producției**) |
| `PAROLA_INIȚIALĂ` | `123456` | Prima parolă de conectare |
| `DATA_DIR` | `~/.omniroute` | Director de date (db, utilizare, jurnale) |
| `PORT` | cadru implicit | Port de serviciu (`20128` în exemple) |
| `HOSTNAME` | cadru implicit | Leagă gazdă (Docker este implicit `0.0.0.0`) |
| `NODE_ENV` | implicit de rulare | Setați `producție` pentru implementare |
| `BASE_URL` | `http://localhost:20128` | Adresa URL de bază internă pe partea serverului |
| `CLOUD_URL` | `https://omniroute.dev` | Adresa URL de bază a punctului final de sincronizare în cloud |
| `API_KEY_SECRET` | `endpoint-proxy-api-key-secret` | Secret HMAC pentru cheile API generate |
| `REQUIRE_API_KEY` | `fals` | Aplicați cheia API Bearer pe `/v1/*` |
| `ALLOW_API_KEY_REVEAL` | `fals` | Permiteți Managerului Api să copieze chei API complete la cerere |
| `PROVIDER_LIMITS_SYNC_INTERVAL_MINUTES` | `70` | cadență de reîmprospătare la nivelul serverului pentru datele din cache ale Limitelor furnizorului; Butoanele de reîmprospătare a interfeței de utilizator declanșează în continuare sincronizarea manuală |
| `DISABLE_SQLITE_AUTO_BACKUP` | `fals` | Dezactivați instantaneele automate SQLite înainte de scriere/import/restaurare; backup-urile manuale încă funcționează |
| `APP_LOG_TO_FILE`                       | `true`                               | Enables application and audit log output to disk                                                          |
| `AUTH_COOKIE_SECURE` | `fals` | Forțați cookie-ul de autentificare „Securizat” (în spatele proxy-ului invers HTTPS) |
| `CLOUDFLARED_BIN` | dezactivat | Utilizați un binar `cloudflared` existent în loc de descărcare gestionată |
| `CLOUDFLARED_PROTOCOL` | `http2` | Transport pentru tuneluri rapide gestionate (`http2`, `quic` sau `auto`) |
| `OMNIROUTE_MEMORY_MB` | `512` | Limită heap Node.js în MB |
| `PROMPT_CACHE_MAX_SIZE` | `50` | Numărul maxim de intrări în cache pentru prompt |
| `SEMANTIC_CACHE_MAX_SIZE` | `100` | Numărul maxim de intrări semantice în cache |Pentru referința completă a variabilei de mediu, consultați [README](../README.md).---

## 📊 Available Models

<detalii>
<summary><b>Vedeți toate modelele disponibile</b></summary>

**Cod Claude (`cc/`)**— Pro/Max: `cc/claude-opus-4-6`, `cc/claude-sonnet-4-5-20250929`, `cc/claude-haiku-4-5-20251001`

**Codex (`cx/`)**— Plus/Pro: `cx/gpt-5.2-codex`, `cx/gpt-5.1-codex-max`

**Gemini CLI (`gc/`)**— GRATUIT: `gc/gemini-3-flash-preview`, `gc/gemini-2.5-pro`

**Copilot GitHub (`gh/`)**: `gh/gpt-5`, `gh/claude-4.5-sonnet`

**GLM (`glm/`)**— 0,6 USD/1 M: `glm/glm-4,7`

**MiniMax (`minimax/`)**— 0,2 USD/1 M: `minimax/MiniMax-M2,1`

**Qoder (`if/`)**— GRATUIT: `if/kimi-k2-thinking`, `if/qwen3-coder-plus`, `if/deepseek-r1`

**Qwen (`qw/`)**— GRATUIT: `qw/qwen3-coder-plus`, `qw/qwen3-coder-flash`

**Kiro (`kr/`)**— GRATUIT: `kr/claude-sonnet-4.5`, `kr/claude-haiku-4.5`

**DeepSeek (`ds/`)**: `ds/deepseek-chat`, `ds/deepseek-reasoner`

**Groq (`groq/`)**: `groq/llama-3.3-70b-versatile`, `groq/llama-4-maverick-17b-128e-instruct`

**xAI (`xai/`)**: `xai/grok-4`, `xai/grok-4-0709-raționament rapid`, `xai/grok-code-mini`

**Mistral (`mistral/`)**: `mistral/mistral-large-2501`, `mistral/codestral-2501`

**Perplexitate (`pplx/`)**: `pplx/sonar-pro`, `pplx/sonar`

**Together AI (`together/`)**: `together/meta-llama/Llama-3.3-70B-Instruct-Turbo`

**Fireworks AI (`fireworks/`)**: `fireworks/conturi/fireworks/models/deepseek-v3p1`

**Cerebras (`cerebras/`)**: `cerebras/llama-3.3-70b`

**Cohere (`cohere/`)**: `cohere/command-r-plus-08-2024`

**NVIDIA NIM (`nvidia/`)**: `nvidia/nvidia/llama-3.3-70b-instruct`</details>

---

## 🧩 Advanced Features

### Custom Models

Adăugați orice ID de model oricărui furnizor fără a aștepta o actualizare a aplicației:```bash
# Via API
curl -X POST http://localhost:20128/api/provider-models \
  -H "Content-Type: application/json" \
  -d '{"provider": "openai", "modelId": "gpt-4.5-preview", "modelName": "GPT-4.5 Preview"}'

# List: curl http://localhost:20128/api/provider-models?provider=openai
# Remove: curl -X DELETE "http://localhost:20128/api/provider-models?provider=openai&model=gpt-4.5-preview"
````

Sau utilizați Tabloul de bord:**Furnizori → [Furnizor] → Modele personalizate**.

Note:

- Furnizorii OpenRouter și OpenAI/compatibili cu Anthropic sunt gestionați numai din**Modele disponibile**. Adăugarea manuală, importarea și sincronizarea automată ajung toate în aceeași listă de modele disponibile, deci nu există o secțiune separată de modele personalizate pentru acei furnizori.
- Secțiunea**Modele personalizate**este destinată furnizorilor care nu expun importurile gestionate de modele disponibile.### Dedicated Provider Routes

Dirijați cererile direct către un anumit furnizor cu validarea modelului:```bash
POST http://localhost:20128/v1/providers/openai/chat/completions
POST http://localhost:20128/v1/providers/openai/embeddings
POST http://localhost:20128/v1/providers/fireworks/images/generations

````

Prefixul furnizorului este adăugat automat dacă lipsește. Modelele nepotrivite returnează `400`.### Network Proxy Configuration

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

**Precedență:**Specific cheie → Specific combo → Specific furnizor → Global → Mediu.### Model Catalog API

```bash
curl http://localhost:20128/api/models/catalog
```

Returnează modele grupate după furnizor cu tipuri (`chat`, `embedding`, `image`).### Cloud Sync

- Sincronizați furnizorii, combo-urile și setările pe dispozitive
- Sincronizare automată în fundal cu timeout + fail-rapid
- Preferați `BASE_URL`/`CLOUD_URL` pe partea de server în producție### Cloudflare Quick Tunnel

- Disponibil în**Tabloul de bord → Puncte finale**pentru Docker și alte implementări găzduite de sine
- creează o adresă URL temporară „https://\*.trycloudflare.com” care redirecționează către punctul final „/v1” compatibil cu OpenAI.
- Activați mai întâi instalările `cloudflared` numai când este necesar; repornirile ulterioare reutilizează același binar gestionat
- Tunelurile rapide nu sunt restaurate automat după o repornire a OmniRoute sau a containerului; reactivați-le din tabloul de bord când este necesar
- URL-urile tunelului sunt efemere și se schimbă de fiecare dată când opriți/porniți tunelul
- Tunelurile rapide gestionate implicit la transportul HTTP/2 pentru a evita avertismentele zgomotoase ale bufferului QUIC UDP în containerele constrânse
- Setați `CLOUDFLARED_PROTOCOL=quic` sau `auto` dacă doriți să suprascrieți opțiunea de transport gestionat
- Setați `CLOUDFLARED_BIN` dacă preferați să utilizați un binar `cloudflared` preinstalat în loc de descărcarea gestionată### LLM Gateway Intelligence (Phase 9)

-**Semantic Cache**— Memorează automat în cache non-streaming, temperatură=0 răspunsuri (ocolire cu `X-OmniRoute-No-Cache: true`) -**Solicitare Idempotency**— Deduplică cererile în 5 secunde prin antetul `Idempotency-Key` sau `X-Request-Id` -**Urmărirea progresului**— Opt-in SSE „eveniment: progres” evenimente prin antetul „X-OmniRoute-Progress: true”---

### Translator Playground

Acces prin**Tabloul de bord → Translator**. Depanați și vizualizați modul în care OmniRoute traduce cererile API între furnizori.

| Modul               | Scop                                                                                                  |
| ------------------- | ----------------------------------------------------------------------------------------------------- |
| **Teren de joacă**  | Selectați formatele sursă/țintă, inserați o solicitare și vedeți instantaneu rezultatul tradus        |
| **Tester de chat**  | Trimiteți mesaje de chat live prin proxy și inspectați întregul ciclu de solicitare/răspuns           |
| **Banc de testare** | Rulați teste în loturi în mai multe combinații de formate pentru a verifica corectitudinea traducerii |
| **Monitor live**    | Urmăriți traducerile în timp real pe măsură ce solicitările curg prin proxy                           |

**Cazuri de utilizare:**

- Depanați de ce o anumită combinație client/furnizor eșuează
- Verificați dacă etichetele de gândire, apelurile de instrumente și instrucțiunile de sistem se traduc corect
- Comparați diferențele de format dintre formatele OpenAI, Claude, Gemini și Responses API---

### Routing Strategies

Configurați prin**Tablou de bord → Setări → Rutare**.

| Strategie                        | Descriere                                                                                                                    |
| -------------------------------- | ---------------------------------------------------------------------------------------------------------------------------- | ----------------------------------- |
| **Umpleți mai întâi**            | Utilizează conturile în ordine de prioritate — contul principal gestionează toate solicitările până când nu sunt disponibile |
| **Round Robin**                  | Parcurge toate conturile cu o limită stabilă configurabilă (implicit: 3 apeluri per cont)                                    |
| **P2C (Puterea a două opțiuni)** | Alege 2 conturi aleatorii și rute către cel mai sănătos — echilibrează sarcina cu conștientizarea sănătății                  |
| **La întâmplare**                | Selectează aleatoriu un cont pentru fiecare solicitare folosind Fisher-Yates shuffle                                         |
| **Cel mai puțin folosit**        | Rute către contul cu cea mai veche amprentă temporală `lastUsedAt`, distribuind traficul uniform                             |
| **Cost optimizat**               | Rute către contul cu cea mai mică valoare de prioritate, optimizare pentru furnizorii cu cel mai mic cost                    | #### External Sticky Session Header |

Pentru afinitatea sesiunii externe (de exemplu, agenți Claude Code/Codex din spatele proxy-urilor inverse), trimiteți:```http
X-Session-Id: your-session-key

````

OmniRoute acceptă, de asemenea, `x_session_id` și returnează cheia efectivă de sesiune în `X-OmniRoute-Session-Id`.

Dacă utilizați Nginx și trimiteți antete pentru formulare de subliniere, activați:```nginx
underscores_in_headers on;
````

#### Wildcard Model Aliases

Creați modele de metacara pentru a remapa numele modelelor:```
Pattern: claude-sonnet-_ → Target: cc/claude-sonnet-4-5-20250929
Pattern: gpt-_ → Target: gh/gpt-5.1-codex

````

Wildcards acceptă `*` (orice caractere) și `?` (un singur caracter).#### Fallback Chains

Definiți lanțuri globale de rezervă care se aplică tuturor solicitărilor:```
Chain: production-fallback
  1. cc/claude-opus-4-6
  2. gh/gpt-5.1-codex
  3. glm/glm-4.7
````

---

### Resilience & Circuit Breakers

Configurați prin**Tabloul de bord → Setări → Reziliență**.

OmniRoute implementează rezistența la nivel de furnizor cu patru componente:

1.**Profiluri de furnizor**— Configurație per furnizor pentru:

- Pragul de eșec (cate defecțiuni înainte de deschidere)
- Durata de răcire
- Sensibilitatea de detectare a limitei ratei
- Parametrii de backoff exponenţial

  2.**Limite de rată editabile**— Setări implicite la nivel de sistem configurabile în tabloul de bord: -**Solicitări pe minut (RPM)**— Numărul maxim de solicitări pe minut per cont -**Timp minim între solicitări**— Intervalul minim în milisecunde între solicitări -**Max. de solicitări simultane**— Maxim de solicitări simultane per cont

- Faceți clic pe**Editați**pentru a modifica, apoi pe**Salvați**sau**Anulați**. Valorile persistă prin intermediul API-ului de rezistență.

  3.**Circuit Breaker**— Urmărește defecțiunile pentru fiecare furnizor și deschide automat circuitul când este atins un prag: -**ÎNCHIS**(sănătos) — Solicitările curg normal -**DESCHIS**— Furnizorul este blocat temporar după eșecuri repetate -**HALF_OPEN**— Se testează dacă furnizorul și-a revenit

  4.**Politici și identificatori blocați**— Afișează starea întrerupătorului și identificatorii blocați cu capacitatea de deblocare forțată.

  5.**Rate Limit Auto-Detection**— Monitorizează anteturile `429` și `Retry-After` pentru a evita în mod proactiv atingerea limitelor de rate ale furnizorului.

**Sfat profesionist:**Folosiți butonul**Reset All**pentru a șterge toate întreruptoarele de circuit și perioadele de răcire atunci când un furnizor își revine după o întrerupere.---

### Database Export / Import

Gestionați copiile de rezervă ale bazei de date în**Tabloul de bord → Setări → Sistem și stocare**.

| Acțiune                       | Descriere                                                                                                                                                                             |
| ----------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------- |
| **Exportați baza de date**    | Descarcă baza de date SQLite curentă ca fișier `.sqlite`                                                                                                                              |
| **Exportați toate (.tar.gz)** | Descărcă o arhivă de rezervă completă, inclusiv: bază de date, setări, combinații, conexiuni la furnizor (fără acreditări), metadatele cheii API                                      |
| **Importă baza de date**      | Încărcați un fișier `.sqlite` pentru a înlocui baza de date curentă. O copie de rezervă pre-import este creată automat, cu excepția cazului în care `DISABLE_SQLITE_AUTO_BACKUP=true` | ```bash |

# API: Export database

curl -o backup.sqlite http://localhost:20128/api/db-backups/export

# API: Export all (full archive)

curl -o backup.tar.gz http://localhost:20128/api/db-backups/exportAll

# API: Import database

curl -X POST http://localhost:20128/api/db-backups/import \
 -F "file=@backup.sqlite"

````

**Validare import:**Fișierul importat este validat pentru integritate (verificare pragma SQLite), tabelele necesare (`provider_connections`, `provider_nodes`, `combos`, `api_keys`) și dimensiune (maximum 100MB).

**Cazuri de utilizare:**

- Migrați OmniRoute între mașini
- Creați copii de rezervă externe pentru recuperarea în caz de dezastru
- Partajați configurațiile între membrii echipei (exportați toate → partajați arhiva)---

### Settings Dashboard

Pagina de setări este organizată în 6 file pentru o navigare ușoară:

| Tab | Cuprins |
| -------------- | ----------------------------------------------------------------------------------------------------- |
|**General**| Instrumente de stocare a sistemului, setări de aspect, comenzi ale temei și vizibilitate pe bara laterală per articol |
|**Securitate**| Setări de conectare/parolă, control acces IP, autentificare API pentru „/modele” și blocare furnizor |
|**Dirutare**| Strategie globală de rutare (6 opțiuni), aliasuri de model cu wildcard, lanțuri de rezervă, valori implicite combo |
|**Reziliență**| Profilurile furnizorilor, limitele de rată modificabile, starea întrerupătorului, politicile și identificatorii blocați |
|**AI**| Gândire la configurația bugetului, injectarea promptă a sistemului global, statisticile cache prompte |
|**Avansat**| Configurație globală proxy (HTTP/SOCKS5) |---

### Costs & Budget Management

Acces prin**Tabloul de bord → Costuri**.

| Tab | Scop |
| ----------- | ---------------------------------------------------------------------------------------- |
|**Buget**| Setați limite de cheltuieli pentru fiecare cheie API cu bugete zilnice/săptămânale/lunare și urmărire în timp real |
|**Prețuri**| Vizualizați și editați intrările de prețuri ale modelului — cost pe 1K jetonuri de intrare/ieșire per furnizor |```bash
# API: Set a budget
curl -X POST http://localhost:20128/api/usage/budget \
  -H "Content-Type: application/json" \
  -d '{"keyId": "key-123", "limit": 50.00, "period": "monthly"}'

# API: Get current budget status
curl http://localhost:20128/api/usage/budget
````

**Urmărirea costurilor:**Fiecare solicitare înregistrează utilizarea simbolurilor și calculează costul utilizând tabelul de prețuri. Vedeți defalcări în**Tabloul de bord → Utilizare**în funcție de furnizor, model și cheie API.---

### Audio Transcription

OmniRoute acceptă transcrierea audio prin punctul final compatibil cu OpenAI:```bash
POST /v1/audio/transcriptions
Authorization: Bearer your-api-key
Content-Type: multipart/form-data

# Example with curl

curl -X POST http://localhost:20128/v1/audio/transcriptions \
 -H "Authorization: Bearer your-api-key" \
 -F "file=@audio.mp3" \
 -F "model=deepgram/nova-3"

````

Furnizori disponibili:**Deepgram**(`deepgram/`),**AssemblyAI**(`assemblyai/`).

Formate audio acceptate: `mp3`, `wav`, `m4a`, `flac`, `ogg`, `webm`.---

### Combo Balancing Strategies

Configurați echilibrarea per-combo în**Tabloul de bord → Combo → Creare/Editare → Strategie**.

| Strategie | Descriere |
| ------------------ | ------------------------------------------------------------------------ |
|**Round-Robin**| Se rotește succesiv prin modele |
|**Prioritate**| Încearcă întotdeauna primul model; cade înapoi numai pe eroare |
|**La întâmplare**| Alege un model aleatoriu din combo pentru fiecare cerere |
|**Ponderat**| Rute proporționale pe baza greutăților atribuite per model |
|**Cel mai puțin folosit**| Rute către modelul cu cele mai puține solicitări recente (folosește valori combinate) |
|**Optimizat din punct de vedere al costurilor**| Rute către cel mai ieftin model disponibil (folosește tabelul de prețuri) |

Valorile implicite globale ale combo pot fi setate în**Tabloul de bord → Setări → Rutare → Setări implicite combo**.---

### Health Dashboard

Acces prin**Tabloul de bord → Sănătate**. Prezentare generală a stării sistemului în timp real cu 6 carduri:

| Card | Ce arată |
| --------------------- | ---------------------------------------------------------- |
|**Stare sistem**| Uptime, versiune, utilizare a memoriei, director de date |
|**Sănătatea furnizorului**| Stare întrerupător pentru fiecare furnizor (Închis/Deschis/Pe jumătate deschis) |
|**Limite de rate**| Reduceri de reducere a limitei ratei active per cont cu timpul rămas |
|**Blocari active**| Furnizori blocați temporar de politica de blocare |
|**Cache pentru semnături**| Statistici cache de deduplicare (chei active, rata de accesare) |
|**Telemetrie de latență**| agregarea latenței p50/p95/p99 per furnizor |

**Sfat profesional:**Pagina Sănătate se reîmprospătează automat la fiecare 10 secunde. Utilizați cardul de întrerupător pentru a identifica furnizorii care se confruntă cu probleme.---

## 🖥️ Desktop Application (Electron)

OmniRoute este disponibil ca aplicație desktop nativă pentru Windows, macOS și Linux.### Instalare

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

Ieșire → `electron/dist-electron/`### Key Features

| Caracteristica                            | Descriere                                                          |
| ----------------------------------------- | ------------------------------------------------------------------ | ------------------------- |
| **Pregătirea serverului**                 | Sondați serverul înainte de a afișa fereastra (fără ecran gol)     |
| **Tava de sistem**                        | Minimizați în tavă, schimbați portul, ieșiți din meniul tavă       |
| **Gestionarea portului**                  | Schimbați portul serverului din tavă (repornește automat serverul) |
| **Politica de securitate a conținutului** | CSP restrictiv prin anteturile de sesiune                          |
| **Instanță unică**                        | O singură instanță de aplicație poate rula o dată                  |
| **Mod offline**                           | Serverul Next.js inclus funcționează fără internet                 | ### Environment Variables |

| Variabila             | Implicit | Descriere                         |
| --------------------- | -------- | --------------------------------- |
| `OMNIROUTE_PORT`      | `20128`  | Port server                       |
| `OMNIROUTE_MEMORY_MB` | `512`    | Limită heap Node.js (64–16384 MB) |

📖 Documentația completă: [`electron/README.md`](../electron/README.md)
