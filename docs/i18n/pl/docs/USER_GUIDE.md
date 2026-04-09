# User Guide (Polski)

🌐 **Languages:** 🇺🇸 [English](../../../../docs/USER_GUIDE.md) · 🇪🇸 [es](../../es/docs/USER_GUIDE.md) · 🇫🇷 [fr](../../fr/docs/USER_GUIDE.md) · 🇩🇪 [de](../../de/docs/USER_GUIDE.md) · 🇮🇹 [it](../../it/docs/USER_GUIDE.md) · 🇷🇺 [ru](../../ru/docs/USER_GUIDE.md) · 🇨🇳 [zh-CN](../../zh-CN/docs/USER_GUIDE.md) · 🇯🇵 [ja](../../ja/docs/USER_GUIDE.md) · 🇰🇷 [ko](../../ko/docs/USER_GUIDE.md) · 🇸🇦 [ar](../../ar/docs/USER_GUIDE.md) · 🇮🇳 [hi](../../hi/docs/USER_GUIDE.md) · 🇮🇳 [in](../../in/docs/USER_GUIDE.md) · 🇹🇭 [th](../../th/docs/USER_GUIDE.md) · 🇻🇳 [vi](../../vi/docs/USER_GUIDE.md) · 🇮🇩 [id](../../id/docs/USER_GUIDE.md) · 🇲🇾 [ms](../../ms/docs/USER_GUIDE.md) · 🇳🇱 [nl](../../nl/docs/USER_GUIDE.md) · 🇵🇱 [pl](../../pl/docs/USER_GUIDE.md) · 🇸🇪 [sv](../../sv/docs/USER_GUIDE.md) · 🇳🇴 [no](../../no/docs/USER_GUIDE.md) · 🇩🇰 [da](../../da/docs/USER_GUIDE.md) · 🇫🇮 [fi](../../fi/docs/USER_GUIDE.md) · 🇵🇹 [pt](../../pt/docs/USER_GUIDE.md) · 🇷🇴 [ro](../../ro/docs/USER_GUIDE.md) · 🇭🇺 [hu](../../hu/docs/USER_GUIDE.md) · 🇧🇬 [bg](../../bg/docs/USER_GUIDE.md) · 🇸🇰 [sk](../../sk/docs/USER_GUIDE.md) · 🇺🇦 [uk-UA](../../uk-UA/docs/USER_GUIDE.md) · 🇮🇱 [he](../../he/docs/USER_GUIDE.md) · 🇵🇭 [phi](../../phi/docs/USER_GUIDE.md) · 🇧🇷 [pt-BR](../../pt-BR/docs/USER_GUIDE.md) · 🇨🇿 [cs](../../cs/docs/USER_GUIDE.md) · 🇹🇷 [tr](../../tr/docs/USER_GUIDE.md)

---

Kompletny przewodnik dotyczący konfigurowania dostawców, tworzenia kombinacji, integracji narzędzi CLI i wdrażania OmniRoute.---

## Table of Contents

- [Ceny w skrócie](#-pricing-at-a-glance)
- [Przypadki użycia](#-przypadków użycia)
- [Konfiguracja dostawcy](#-konfiguracja-dostawcy)
- [Integracja CLI](#-integracja z cli)
- [Wdrożenie](#-wdrożenie)
- [Dostępne modele](#-dostępne-modele)
- [Funkcje zaawansowane](#-funkcje zaawansowane)---

## 💰 Pricing at a Glance

| Poziom             | Dostawca            | Koszt             | Reset przydziału              | Najlepsze dla             |
| ------------------ | ------------------- | ----------------- | ----------------------------- | ------------------------- |
| **💳 SUBSKRYPCJA** | Claude Code (Pro)   | 20 USD/mies.      | 5h + tygodniowo               | Już subskrybujesz         |
|                    | Kodeks (Plus/Pro)   | 20-200 $/mies.    | 5h + tygodniowo               | Użytkownicy OpenAI        |
|                    | Bliźnięta CLI       | **BEZPŁATNE**     | 180 tys./mies. + 1 tys./dzień | Wszyscy!                  |
|                    | Drugi pilot GitHuba | 10–19 USD/mies.   | Miesięczne                    | Użytkownicy GitHuba       |
| **🔑 KLUCZ API**   | DeepSeek            | Płać za użycie    | Brak                          | Tanie rozumowanie         |
|                    | Groq                | Płać za użycie    | Brak                          | Ultraszybkie wnioskowanie |
|                    | xAI (Grok)          | Płać za użycie    | Brak                          | Grok 4 rozumowanie        |
|                    | Mistral             | Płać za użycie    | Brak                          | Modele hostowane w UE     |
|                    | Zakłopotanie        | Płać za użycie    | Brak                          | Rozszerzone wyszukiwanie  |
|                    | Razem AI            | Płać za użycie    | Brak                          | Modele open source        |
|                    | Fajerwerki AI       | Płać za użycie    | Brak                          | Obrazy Fast FLUX          |
|                    | Cerebra             | Płać za użycie    | Brak                          | Prędkość w skali opłatka  |
|                    | Spójne              | Płać za użycie    | Brak                          | Polecenie R+RAG           |
|                    | NVIDIA NIM          | Płać za użycie    | Brak                          | Modele korporacyjne       |
| **💰 TANIO**       | GLM-4.7             | 0,6 USD/1 mln     | Codziennie 10:00              | Kopia zapasowa budżetu    |
|                    | MiniMax M2.1        | 0,2 USD/1 mln     | 5-godzinne toczenie           | Najtańsza opcja           |
|                    | Kimi K2             | 9 USD miesięcznie | 10 mln tokenów/mies.          | Przewidywalny koszt       |
| **🆓 DARMOWE**     | Qoder               | 0 dolarów         | Nieograniczony                | 8 modeli za darmo         |
|                    | Qwen                | 0 dolarów         | Nieograniczony                | 3 modele za darmo         |
|                    | Kiro                | 0 dolarów         | Nieograniczony                | Claude wolny              |

**💡 Wskazówka dla profesjonalistów:**Zacznij od zestawu Gemini CLI (180 tys. za darmo/miesiąc) + Qoder (bez ograniczeń za darmo) = koszt 0 USD!---

## 🎯 Use Cases

### Case 1: "I have Claude Pro subscription"

**Problem:**Limit wygasa niewykorzystany, limity szybkości podczas intensywnego kodowania```
Combo: "maximize-claude"

1. cc/claude-opus-4-6 (use subscription fully)
2. glm/glm-4.7 (cheap backup when quota out)
3. if/kimi-k2-thinking (free emergency fallback)

Monthly cost: $20 (subscription) + ~$5 (backup) = $25 total
vs. $20 + hitting limits = frustration

````

### Case 2: "I want zero cost"

**Problem:**Nie stać Cię na subskrypcję, potrzebujesz niezawodnego kodowania AI```
Combo: "free-forever"
  1. gc/gemini-3-flash         (180K free/month)
  2. if/kimi-k2-thinking       (unlimited free)
  3. qw/qwen3-coder-plus       (unlimited free)

Monthly cost: $0
Quality: Production-ready models
````

### Case 3: "I need 24/7 coding, no interruptions"

**Problem:**Terminy, nie mogę sobie pozwolić na przestoje```
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

**Problem:**Potrzebujesz asystenta AI w aplikacjach do przesyłania wiadomości, całkowicie za darmo```
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

**Wskazówka dla profesjonalistów:**używaj Opus do skomplikowanych zadań, a Sonnet do szybkości. OmniRoute śledzi limit na model!#### OpenAI Codex (Plus/Pro)

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

**Najlepsza wartość:**Ogromny darmowy poziom! Użyj tego przed płatnymi poziomami.#### GitHub Copilot

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

1. Zarejestruj się: [Zhipu AI](https://open.bigmodel.cn/)
2. Uzyskaj klucz API z planu kodowania
3. Panel → Dodaj klucz API: Dostawca: `glm`, Klucz API: `twój-klucz`

**Użyj:**`glm/glm-4.7` —**Wskazówka dla profesjonalistów:**Plan kodowania oferuje 3× limit przy cenie 1/7! Resetuj codziennie o 10:00.#### MiniMax M2.1 (5h reset, $0.20/1M)

1. Zarejestruj się: [MiniMax](https://www.minimax.io/)
2. Uzyskaj klucz API → Panel kontrolny → Dodaj klucz API

**Użyj:**`minimax/MiniMax-M2.1` —**Wskazówka:**Najtańsza opcja dla długiego kontekstu (1M tokenów)!#### Kimi K2 ($9/month flat)

1. Subskrybuj: [Moonshot AI](https://platform.moonshot.ai/)
2. Uzyskaj klucz API → Panel kontrolny → Dodaj klucz API

**Użyj:**`kimi/kimi-latest` —**Wskazówka:**Naprawiono 9 USD/miesiąc za 10 mln tokenów = efektywny koszt 0,90 USD/1 mln!### 🆓 FREE Providers

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

Edytuj `~/.claude/config.json`:```json
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

Edytuj `~/.openclaw/openclaw.json`:```json
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

**Lub użyj Dashboardu:**Narzędzia CLI → OpenClaw → Auto-config### Cline / Continue / RooCode

```

Provider: OpenAI Compatible
Base URL: http://localhost:20128/v1
API Key: [from dashboard]
Model: cc/claude-opus-4-6

````

---

## Wdrożenie

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

Interfejs CLI automatycznie ładuje `.env` z `~/.omniroute/.env` lub `./.env`.### VPS Deployment

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

W przypadku serwerów z ograniczoną ilością pamięci RAM użyj opcji limitu pamięci:```bash

# With 512MB limit (default)

pm2 start npm --name omniroute -- start

# Or with custom memory limit

OMNIROUTE_MEMORY_MB=512 pm2 start npm --name omniroute -- start

# Or using ecosystem.config.js

pm2 start ecosystem.config.js

````

Utwórz plik `ecosystem.config.js`:```javascript
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

Informacje na temat trybu zintegrowanego z hostem i plików binarnych CLI można znaleźć w sekcji Docker w głównych dokumentach.### Void Linux (xbps-src)

Użytkownicy Void Linux mogą spakować i zainstalować OmniRoute natywnie, korzystając ze środowiska kompilacji krzyżowej `xbps-src`. Automatyzuje to samodzielną kompilację Node.js wraz z wymaganymi natywnymi powiązaniami „better-sqlite3”.

<szczegóły>

<summary><b>Wyświetl szablon xbps-src</b></summary>```bash
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

| Zmienna | Domyślne | Opis |
| ---------------------------------------- | ------------------------------------ | ------------------------------------------------------------------------------------------------------------------ |
| `JWT_SECRET` | `omniroute-domyślny-sekret-zmień mnie` | Tajemnica podpisania JWT (**zmiana w produkcji**) |
| `INITIAL_HASŁO` | `123456` | Hasło pierwszego logowania |
| `DANE_KATALOG` | `~/.omniroute` | Katalog danych (db, wykorzystanie, logi) |
| `PORT` | domyślne ramy | Port serwisowy (w przykładach „20128”) |
| `NAZWA HOSTA` | domyślne ramy | Powiąż hosta (Docker domyślnie ma wartość `0.0.0.0`) |
| `WĘZEŁ_ENV` | domyślne środowisko wykonawcze | Ustaw „produkcję” dla wdrożenia |
| `BAZA_URL` | `http://localhost:20128` | Wewnętrzny podstawowy adres URL po stronie serwera |
| `CHMUROWY_URL` | `https://omniroute.dev` | Podstawowy adres URL punktu końcowego synchronizacji w chmurze |
| `API_KEY_SECRET` | `sekret-klucza-proxy-api-punktu końcowego` | Sekret HMAC dla wygenerowanych kluczy API |
| `REQUIRE_API_KEY` | `fałszywy` | Wymuś klucz API nośnika na `/v1/*` |
| `ALLOW_API_KEY_REVEAL` | `fałszywy` | Zezwalaj Api Managerowi na kopiowanie pełnych kluczy API na żądanie |
| `PROVIDER_LIMITS_SYNC_INTERVAL_MINUTES` | `70` | Częstotliwość odświeżania po stronie serwera buforowanych danych dotyczących limitów dostawcy; Przyciski odświeżania interfejsu użytkownika nadal uruchamiają ręczną synchronizację |
| `WYŁĄCZ_SQLITE_AUTO_BACKUP` | `fałszywy` | Wyłącz automatyczne migawki SQLite przed zapisem/importem/przywróceniem; ręczne kopie zapasowe nadal działają |
| `APP_LOG_TO_FILE`                       | `true`                               | Enables application and audit log output to disk                                                          |
| `AUTH_COOKIE_SECURE` | `fałszywy` | Wymuś „bezpieczny” plik cookie uwierzytelniający (za odwrotnym proxy HTTPS) |
| `CLOUDFLARED_BIN` | rozbrojony | Użyj istniejącego pliku binarnego `cloudflared` zamiast zarządzanego pobierania |
| `CLOUDFLARED_PROTOCOL` | `http2` | Transport dla zarządzanych szybkich tuneli (`http2`, `quic` lub `auto`) |
| `OMNIROUTE_MEMORY_MB` | `512` | Limit sterty Node.js w MB |
| `PROMPT_CACHE_MAX_SIZE` | `50` | Maksymalna liczba wpisów w pamięci podręcznej monitów |
| `SEMANTIC_CACHE_MAX_SIZE` | `100` | Maksymalna liczba wpisów w semantycznej pamięci podręcznej |Pełne odwołanie do zmiennych środowiskowych można znaleźć w [README](../README.md).---

## 📊 Available Models

<szczegóły>
<summary><b>Wyświetl wszystkie dostępne modele</b></summary>

**Kod Claude (`cc/`)**— Pro/Max: `cc/claude-opus-4-6`, `cc/claude-sonnet-4-5-20250929`, `cc/claude-haiku-4-5-20251001`

**Kodeks (`cx/`)**— Plus/Pro: `cx/gpt-5.2-codex`, `cx/gpt-5.1-codex-max`

**Gemini CLI (`gc/`)**— ZA DARMO: `gc/gemini-3-flash-preview`, `gc/gemini-2.5-pro`

**GitHub Copilot (`gh/`)**: `gh/gpt-5`, `gh/claude-4.5-sonnet`

**GLM („glm/`)**— 0,6 USD/1 mln: `glm/glm-4,7`

**MiniMax („minimax/`)**— 0,2 USD/1 mln: `minimax/MiniMax-M2.1`

**Qoder (`if/`)**— BEZPŁATNE: `if/kimi-k2-myślenie`, `if/qwen3-coder-plus`, `if/deepseek-r1`

**Qwen (`qw/`)**— ZA DARMO: `qw/qwen3-coder-plus`, `qw/qwen3-coder-flash`

**Kiro (`kr/`)**— ZA DARMO: `kr/claude-sonnet-4.5`, `kr/claude-haiku-4.5`

**DeepSeek (`ds/`)**: `ds/deepseek-chat`, `ds/deepseek-reasoner`

**Groq (`groq/`)**: `groq/llama-3.3-70b-uniwersalny`, `groq/llama-4-maverick-17b-128e-instrukcja`

**xAI (`xai/`)**: `xai/grok-4`, `xai/grok-4-0709-szybkie-rozumowanie`, `xai/grok-code-mini`

**Mistral (`mistral/`)**: `mistral/mistral-large-2501`, `mistral/codestral-2501`

**Zagubienie (`pplx/`)**: `pplx/sonar-pro`, `pplx/sonar`

**Razem AI („razem/`)**: `razem/meta-llama/Llama-3.3-70B-Instruct-Turbo`

**Fajerwerki AI (`fajerwerki/`)**: `fajerwerki/konta/fajerwerki/modele/deepseek-v3p1`

**Cerebras (`cerebras/`)**: `mózgowie/lama-3.3-70b`

**Spójność (`spójność/`)**: `spójność/polecenie-r-plus-08-2024`

**NVIDIA NIM (`nvidia/`)**: `nvidia/nvidia/llama-3.3-70b-instrukcja`</details>

---

## 🧩 Advanced Features

### Custom Models

Dodaj dowolny identyfikator modelu do dowolnego dostawcy, nie czekając na aktualizację aplikacji:```bash
# Via API
curl -X POST http://localhost:20128/api/provider-models \
  -H "Content-Type: application/json" \
  -d '{"provider": "openai", "modelId": "gpt-4.5-preview", "modelName": "GPT-4.5 Preview"}'

# List: curl http://localhost:20128/api/provider-models?provider=openai
# Remove: curl -X DELETE "http://localhost:20128/api/provider-models?provider=openai&model=gpt-4.5-preview"
````

Lub użyj Panelu:**Dostawcy → [Dostawca] → Modele niestandardowe**.

Uwagi:

- Dostawcy obsługujący OpenRouter i OpenAI/Anthropic są zarządzani wyłącznie z poziomu**Dostępnych modeli**. Ręczne dodawanie, importowanie i automatyczna synchronizacja wszystkich gruntów na tej samej liście dostępnych modeli, więc nie ma osobnej sekcji modeli niestandardowych dla tych dostawców.
  — Sekcja**Modele niestandardowe**jest przeznaczona dla dostawców, którzy nie udostępniają importów zarządzanych dostępnych modeli.### Dedicated Provider Routes

Kieruj żądania bezpośrednio do konkretnego dostawcy z walidacją modelu:```bash
POST http://localhost:20128/v1/providers/openai/chat/completions
POST http://localhost:20128/v1/providers/openai/embeddings
POST http://localhost:20128/v1/providers/fireworks/images/generations

````

Prefiks dostawcy jest dodawany automatycznie, jeśli go brakuje. Niedopasowane modele zwracają „400”.### Network Proxy Configuration

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

**Pierwszeństwo:**specyficzne dla klucza → specyficzne dla kombinacji → specyficzne dla dostawcy → globalne → środowisko.### Model Catalog API

```bash
curl http://localhost:20128/api/models/catalog
```

Zwraca modele pogrupowane według dostawców z typami („czat”, „osadzanie”, „obraz”).### Cloud Sync

- Synchronizuj dostawców, kombinacje i ustawienia na różnych urządzeniach
- Automatyczna synchronizacja w tle z limitem czasu + szybka awaria
- Preferuj `BASE_URL`/`CLOUD_URL` po stronie serwera w środowisku produkcyjnym### Cloudflare Quick Tunnel

- Dostępne w**Panel kontrolny → Punkty końcowe**dla Dockera i innych wdrożeń hostowanych samodzielnie
- Tworzy tymczasowy adres URL `https://*.trycloudflare.com`, który przekazuje do bieżącego punktu końcowego `/v1` kompatybilnego z OpenAI
- Najpierw włącz instalację „cloudflared” tylko wtedy, gdy jest to potrzebne; później uruchamia ponownie, ponownie używa tego samego zarządzanego pliku binarnego
- Szybkie tunele nie są automatycznie przywracane po ponownym uruchomieniu OmniRoute lub kontenera; w razie potrzeby włącz je ponownie z poziomu pulpitu nawigacyjnego
- Adresy URL tuneli są efemeryczne i zmieniają się przy każdym zatrzymaniu/uruchomieniu tunelu
  — Zarządzane szybkie tunele domyślnie korzystają z transportu HTTP/2, aby uniknąć hałaśliwych ostrzeżeń o buforze QUIC UDP w ograniczonych kontenerach
- Ustaw `CLOUDFLARED_PROTOCOL=quic` lub `auto`, jeśli chcesz zastąpić wybór zarządzanego transportu
- Ustaw `CLOUDFLARED_BIN`, jeśli wolisz używać preinstalowanego pliku binarnego `cloudflared` zamiast zarządzanego pobierania### LLM Gateway Intelligence (Phase 9)

-**Semantyczna pamięć podręczna**— automatycznie buforuje dane niestrumieniowe, temperatura = 0 odpowiedzi (pomiń przy użyciu opcji `X-OmniRoute-No-Cache: true`) -**Request Idempotency**— Deduplikuje żądania w ciągu 5 sekund za pomocą nagłówka `Idempotency-Key` lub `X-Request-Id` -**Śledzenie postępu**— Możliwość wyrażenia zgody na zdarzenia SSE „event: postęp” poprzez nagłówek „X-OmniRoute-Progress: true”---

### Translator Playground

Dostęp przez**Panel kontrolny → Tłumacz**. Debuguj i wizualizuj, jak OmniRoute tłumaczy żądania API między dostawcami.

| Tryb                      | Cel                                                                                                 |
| ------------------------- | --------------------------------------------------------------------------------------------------- |
| **Plac zabaw**            | Wybierz formaty źródłowe/docelowe, wklej żądanie i natychmiast zobacz przetłumaczone dane wyjściowe |
| **Tester czatu**          | Wysyłaj wiadomości na czacie na żywo przez serwer proxy i sprawdzaj pełny cykl żądań/odpowiedzi     |
| **Stolik testowy**        | Przeprowadź testy wsadowe w wielu kombinacjach formatów, aby sprawdzić poprawność tłumaczenia       |
| **Monitorowanie na żywo** | Oglądaj tłumaczenia w czasie rzeczywistym, gdy żądania przepływają przez serwer proxy               |

**Przypadki użycia:**

- Debugowanie, dlaczego konkretna kombinacja klient/dostawca nie działa
- Sprawdź, czy znaczniki myślenia, wywołania narzędzi i podpowiedzi systemowe są tłumaczone poprawnie
- Porównaj różnice w formatach między formatami OpenAI, Claude, Gemini i Responses API---

### Routing Strategies

Skonfiguruj za pomocą**Panel kontrolny → Ustawienia → Routing**.

| Strategia                      | Opis                                                                                                        |
| ------------------------------ | ----------------------------------------------------------------------------------------------------------- | ----------------------------------- |
| **Najpierw wypełnij**          | Używa kont w kolejności priorytetów — konto podstawowe obsługuje wszystkie żądania, aż będą niedostępne     |
| **Robinowy**                   | Przełącza między wszystkimi kontami z konfigurowalnym limitem stałym (domyślnie: 3 połączenia na konto)     |
| **P2C (potęga dwóch wyborów)** | Wybiera 2 losowe konta i ścieżki do zdrowszego — równoważy obciążenie świadomością zdrowia                  |
| **Losowe**                     | Losowo wybiera konto dla każdego żądania, korzystając z funkcji losowania Fisher-Yates                      |
| **Najrzadziej używane**        | Trasy do konta z najstarszym znacznikiem czasu „lastUsedAt”, równomiernie rozkładając ruch                  |
| **Optymalizacja kosztów**      | Kieruje do konta o najniższej wartości priorytetu, optymalizując pod kątem dostawców o najniższych kosztach | #### External Sticky Session Header |

W przypadku koligacji sesji zewnętrznej (na przykład agenci Claude Code/Codex za zwrotnymi serwerami proxy) wyślij:```http
X-Session-Id: your-session-key

````

OmniRoute akceptuje także `x_session_id` i zwraca efektywny klucz sesji w `X-OmniRoute-Session-Id`.

Jeśli używasz Nginx i wysyłasz nagłówki w formie podkreślenia, włącz:```nginx
underscores_in_headers on;
````

#### Wildcard Model Aliases

Utwórz wzorce symboli wieloznacznych, aby ponownie przypisać nazwy modeli:```
Pattern: claude-sonnet-_ → Target: cc/claude-sonnet-4-5-20250929
Pattern: gpt-_ → Target: gh/gpt-5.1-codex

````

Symbole wieloznaczne obsługują `*` (dowolne znaki) i `?` (pojedynczy znak).#### Fallback Chains

Zdefiniuj globalne łańcuchy awaryjne, które mają zastosowanie do wszystkich żądań:```
Chain: production-fallback
  1. cc/claude-opus-4-6
  2. gh/gpt-5.1-codex
  3. glm/glm-4.7
````

---

### Resilience & Circuit Breakers

Skonfiguruj za pomocą**Panel kontrolny → Ustawienia → Odporność**.

OmniRoute wdraża odporność na poziomie dostawcy za pomocą czterech komponentów:

1.**Profile dostawców**— konfiguracja dla poszczególnych dostawców dla:

- Próg awaryjności (ile awarii przed otwarciem)
- Czas odnowienia
- Czułość wykrywania limitu szybkości
- Wykładnicze parametry wycofywania

  2.**Edytowalne limity prędkości**— Domyślne ustawienia na poziomie systemu można skonfigurować w panelu kontrolnym: -**Żądania na minutę (RPM)**— Maksymalna liczba żądań na minutę na konto -**Min. czas między żądaniami**— Minimalna przerwa w milisekundach między żądaniami -**Maksymalna liczba jednoczesnych żądań**— Maksymalna liczba jednoczesnych żądań na konto

- Kliknij**Edytuj**, aby zmodyfikować, a następnie**Zapisz**lub**Anuluj**. Wartości są zachowywane za pośrednictwem interfejsu API odporności.

  3.**Wyłącznik**— śledzi awarie według dostawcy i automatycznie otwiera obwód po osiągnięciu progu: -**ZAMKNIĘTE**(zdrowe) — Żądania przebiegają normalnie -**OTWARTE**— Dostawca jest tymczasowo blokowany po powtarzających się awariach -**HALF_OPEN**— Sprawdzanie, czy dostawca powrócił do zdrowia

  4.**Zasady i zablokowane identyfikatory**— Pokazuje stan wyłącznika automatycznego i zablokowane identyfikatory z możliwością wymuszonego odblokowania.

  5.**Automatyczne wykrywanie limitu szybkości**— Monitoruje nagłówki „429” i „Retry-After”, aby aktywnie zapobiegać przekroczeniu limitów szybkości dostawcy.

**Wskazówka dla profesjonalistów:**Użyj przycisku**Resetuj wszystko**, aby wyczyścić wszystkie wyłączniki automatyczne i czasy odnowienia, gdy dostawca wznowi działanie po awarii.---

### Database Export / Import

Zarządzaj kopiami zapasowymi baz danych w**Panel kontrolny → Ustawienia → System i pamięć masowa**.

| Akcja                            | Opis                                                                                                                                                             |
| -------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------- |
| **Eksportuj bazę danych**        | Pobiera bieżącą bazę danych SQLite jako plik `.sqlite`                                                                                                           |
| **Eksportuj wszystko (.tar.gz)** | Pobiera pełne archiwum kopii zapasowych, w tym: bazę danych, ustawienia, kombinacje, połączenia z dostawcami (bez poświadczeń), metadane klucza API              |
| **Importuj bazę danych**         | Prześlij plik `.sqlite`, aby zastąpić bieżącą bazę danych. Kopia zapasowa przed importem jest tworzona automatycznie, chyba że `DISABLE_SQLITE_AUTO_BACKUP=true` | ```bash |

# API: Export database

curl -o backup.sqlite http://localhost:20128/api/db-backups/export

# API: Export all (full archive)

curl -o backup.tar.gz http://localhost:20128/api/db-backups/exportAll

# API: Import database

curl -X POST http://localhost:20128/api/db-backups/import \
 -F "file=@backup.sqlite"

````

**Weryfikacja importu:**Zaimportowany plik jest sprawdzany pod kątem integralności (sprawdzanie pragma SQLite), wymaganych tabel („połączenia_dostawcy”, „węzły_dostawcy”, „combos”, „klucze_api”) i rozmiaru (maks. 100MB).

**Przypadki użycia:**

- Przeprowadź migrację OmniRoute pomiędzy maszynami
- Twórz zewnętrzne kopie zapasowe w celu odzyskiwania po awarii
- Udostępniaj konfiguracje pomiędzy członkami zespołu (eksportuj wszystko → udostępnij archiwum)---

### Settings Dashboard

Strona ustawień jest podzielona na 6 zakładek ułatwiających nawigację:

| Zakładka | Spis treści |
| -------------- | -------------------------------------------------------------------------------------------------------- |
|**Ogólne**| Narzędzia pamięci systemowej, ustawienia wyglądu, elementy sterujące motywem i widoczność paska bocznego poszczególnych elementów |
|**Bezpieczeństwo**| Ustawienia loginu/hasła, kontrola dostępu IP, autoryzacja API dla `/models` i blokowanie dostawców |
|**Trasowanie**| Globalna strategia routingu (6 opcji), aliasy modeli z symbolami wieloznacznymi, łańcuchy awaryjne, domyślne kombinacje |
|**Odporność**| Profile dostawców, edytowalne limity stawek, stan wyłącznika, zasady i zablokowane identyfikatory |
|**AI**| Myślenie o konfiguracji budżetu, globalnym wstrzykiwaniu podpowiedzi do systemu, szybkich statystykach pamięci podręcznej |
|**Zaawansowane**| Globalna konfiguracja proxy (HTTP/SOCKS5) |---

### Costs & Budget Management

Dostęp przez**Panel kontrolny → Koszty**.

| Zakładka | Cel |
| ----------- | -------------------------------------------------------------------------------------------------- |
|**Budżet**| Ustaw limity wydatków na klucz API z budżetami dziennymi/tygodniowymi/miesięcznymi i śledzeniem w czasie rzeczywistym |
|**Cennik**| Wyświetlaj i edytuj wpisy cen modelu — koszt za 1 tys. tokenów wejścia/wyjścia na dostawcę |```bash
# API: Set a budget
curl -X POST http://localhost:20128/api/usage/budget \
  -H "Content-Type: application/json" \
  -d '{"keyId": "key-123", "limit": 50.00, "period": "monthly"}'

# API: Get current budget status
curl http://localhost:20128/api/usage/budget
````

**Śledzenie kosztów:**każde żądanie rejestruje użycie tokena i oblicza koszt, korzystając z tabeli cen. Zobacz zestawienia w**Panel kontrolny → Użycie**według dostawcy, modelu i klucza API.---

### Audio Transcription

OmniRoute obsługuje transkrypcję audio za pośrednictwem punktu końcowego kompatybilnego z OpenAI:```bash
POST /v1/audio/transcriptions
Authorization: Bearer your-api-key
Content-Type: multipart/form-data

# Example with curl

curl -X POST http://localhost:20128/v1/audio/transcriptions \
 -H "Authorization: Bearer your-api-key" \
 -F "file=@audio.mp3" \
 -F "model=deepgram/nova-3"

````

Dostępni dostawcy:**Deepgram**(`deepgram/`),**AssemblyAI**(`assemblyai/`).

Obsługiwane formaty audio: `mp3`, `wav`, `m4a`, `flac`, `ogg`, `webm`.---

### Combo Balancing Strategies

Skonfiguruj równoważenie poszczególnych kombinacji w**Panel sterowania → Kombinacje → Utwórz/edytuj → Strategia**.

| Strategia | Opis |
| ------------------ | ---------------------------------------------------------------------------------- |
|**Równy każdy z każdym**| Obraca modele sekwencyjnie |
|**Priorytet**| Zawsze wypróbowuje pierwszy model; powraca tylko w przypadku błędu |
|**Losowe**| Wybiera losowy model z kombinacji dla każdego żądania |
|**Ważona**| Trasy proporcjonalnie na podstawie przypisanych wag do modelu |
|**Najrzadziej używane**| Trasy do modelu z najmniejszą liczbą ostatnich żądań (wykorzystuje metryki kombi) |
|**Optymalizacja kosztów**| Trasy do najtańszego dostępnego modelu (korzysta z tabeli cen) |

Globalne ustawienia domyślne kombinacji można ustawić w**Panel sterowania → Ustawienia → Routing → Domyślne ustawienia kombinacji**.---

### Health Dashboard

Dostęp przez**Panel kontrolny → Zdrowie**. Przegląd stanu systemu w czasie rzeczywistym za pomocą 6 kart:

| Karta | Co to pokazuje |
| ----------------------------------- | ----------------------------------------------------------- |
|**Stan systemu**| Czas pracy, wersja, wykorzystanie pamięci, katalog danych |
|**Zdrowie dostawcy**| Stan wyłącznika automatycznego dostawcy (zamknięty/otwarty/półotwarty) |
|**Limity stawek**| Aktywne czasy odnowienia limitu szybkości na konto z pozostałym czasem |
|**Aktywne blokady**| Dostawcy tymczasowo zablokowani przez politykę blokad |
|**Pamięć podręczna podpisów**| Statystyki pamięci podręcznej deduplikacji (aktywne klucze, współczynnik trafień) |
|**Telemetria opóźnień**| Agregacja opóźnień p50/p95/p99 na dostawcę |

**Wskazówka dla profesjonalistów:**Strona Zdrowie odświeża się automatycznie co 10 sekund. Użyj karty wyłącznika, aby zidentyfikować dostawców, u których występują problemy.---

## 🖥️ Desktop Application (Electron)

OmniRoute jest dostępny jako natywna aplikacja komputerowa dla systemów Windows, macOS i Linux.### Zainstaluj

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

Wyjście → `elektron/odległość-elektron/`### Key Features

| Funkcja                            | Opis                                                             |
| ---------------------------------- | ---------------------------------------------------------------- | ------------------------- |
| **Gotowość serwera**               | Odpytuje serwer przed wyświetleniem okna (bez pustego ekranu)    |
| **Taca systemowa**                 | Minimalizuj do zasobnika, zmień port, wyjdź z menu zasobnika     |
| **Zarządzanie portem**             | Zmień port serwera z zasobnika (automatycznie restartuje serwer) |
| **Polityka bezpieczeństwa treści** | Restrykcyjny CSP poprzez nagłówki sesji                          |
| **Pojedyncza instancja**           | Jednocześnie może działać tylko jedna instancja aplikacji        |
| **Tryb offline**                   | Dołączony serwer Next.js działa bez Internetu                    | ### Environment Variables |

| Zmienna               | Domyślne | Opis                               |
| --------------------- | -------- | ---------------------------------- |
| `OMNIROUT_PORT`       | `20128`  | Port serwera                       |
| `OMNIROUTE_MEMORY_MB` | `512`    | Limit sterty Node.js (64–16384 MB) |

📖 Pełna dokumentacja: [`electron/README.md`](../electron/README.md)
