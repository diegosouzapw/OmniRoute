---
title: "Przewodnik użytkownika"
version: 3.8.40
lastUpdated: 2026-06-28
---

# Przewodnik użytkownika

🌐 **Languages:** 🇺🇸 [English](./USER_GUIDE.md) | 🇧🇷 [Português (Brasil)](../i18n/pt-BR/docs/guides/USER_GUIDE.md) | 🇪🇸 [Español](../i18n/es/docs/guides/USER_GUIDE.md) | 🇫🇷 [Français](../i18n/fr/docs/guides/USER_GUIDE.md) | 🇮🇹 [Italiano](../i18n/it/docs/guides/USER_GUIDE.md) | 🇷🇺 [Русский](../i18n/ru/docs/guides/USER_GUIDE.md) | 🇨🇳 [中文 (简体)](../i18n/zh-CN/docs/guides/USER_GUIDE.md) | 🇩🇪 [Deutsch](../i18n/de/docs/guides/USER_GUIDE.md) | 🇮🇳 [हिन्दी](../i18n/in/docs/guides/USER_GUIDE.md) | 🇹🇭 [ไทย](../i18n/th/docs/guides/USER_GUIDE.md) | 🇺🇦 [Українська](../i18n/uk-UA/docs/guides/USER_GUIDE.md) | 🇸🇦 [العربية](../i18n/ar/docs/guides/USER_GUIDE.md) | 🇯🇵 [日本語](../i18n/ja/docs/guides/USER_GUIDE.md) | 🇻🇳 [Tiếng Việt](../i18n/vi/docs/guides/USER_GUIDE.md) | 🇧🇬 [Български](../i18n/bg/docs/guides/USER_GUIDE.md) | 🇩🇰 [Dansk](../i18n/da/docs/guides/USER_GUIDE.md) | 🇫🇮 [Suomi](../i18n/fi/docs/guides/USER_GUIDE.md) | 🇮🇱 [עברית](../i18n/he/docs/guides/USER_GUIDE.md) | 🇭🇺 [Magyar](../i18n/hu/docs/guides/USER_GUIDE.md) | 🇮🇩 [Bahasa Indonesia](../i18n/id/docs/guides/USER_GUIDE.md) | 🇰🇷 [한국어](../i18n/ko/docs/guides/USER_GUIDE.md) | 🇲🇾 [Bahasa Melayu](../i18n/ms/docs/guides/USER_GUIDE.md) | 🇳🇱 [Nederlands](../i18n/nl/docs/guides/USER_GUIDE.md) | 🇳🇴 [Norsk](../i18n/no/docs/guides/USER_GUIDE.md) | 🇵🇹 [Português (Portugal)](../i18n/pt/docs/guides/USER_GUIDE.md) | 🇷🇴 [Română](../i18n/ro/docs/guides/USER_GUIDE.md) | 🇵🇱 [Polski](../i18n/pl/docs/guides/USER_GUIDE.md) | 🇸🇰 [Slovenčina](../i18n/sk/docs/guides/USER_GUIDE.md) | 🇸🇪 [Svenska](../i18n/sv/docs/guides/USER_GUIDE.md) | 🇵🇭 [Filipino](../i18n/phi/docs/guides/USER_GUIDE.md) | 🇨🇿 [Čeština](../i18n/cs/docs/guides/USER_GUIDE.md)

Kompletny przewodnik po konfiguracji providerów, tworzeniu combo, integracji narzędzi CLI i wdrażaniu OmniRoute.

---

## Spis treści

- [Cennik w skrócie](#-cennik-w-skrócie)
- [Przypadki użycia](#-przypadki-użycia)
- [Konfiguracja providerów](#-konfiguracja-providerów)
- [Integracja CLI](#-integracja-cli)
- [Wdrożenie](#-wdrożenie)
- [Dostępne modele](#-dostępne-modele)
- [Funkcje zaawansowane](#-funkcje-zaawansowane)
- [Auto-routing (bez konfiguracji)](#-auto-routing-bez-konfiguracji)
- [Integracja MCP i A2A](#-integracja-mcp-i-a2a)
- [System Skills](#-system-skills)
- [System Memory](#-system-memory)
- [Webhooki](#-webhooki)
- [Cloud Agents](#-cloud-agents)
- [Zarządzanie programistyczne](#-zarządzanie-programistyczne)
- [Wewnętrzne CLI](#-wewnętrzne-cli)
- [Aplikacja desktopowa (Electron)](#-aplikacja-desktopowa-electron)

---

## 💰 Cennik w skrócie

| Poziom             | Provider          | Koszt              | Reset limitu       | Najlepsze do             |
| ------------------ | ----------------- | ------------------ | ------------------ | ------------------------ |
| **💳 SUBSKRYPCJA** | Claude Code (Pro) | $20/mies.          | 5h + tygodniowo    | Już masz subskrypcję     |
|                    | Codex (Plus/Pro)  | $20-200/mies.      | 5h + tygodniowo    | Użytkownicy OpenAI       |
|                    | GitHub Copilot    | $10-19/mies.       | Miesięcznie        | Użytkownicy GitHub       |
| **🔑 KLUCZ API**   | DeepSeek          | Płatność za użycie | Brak               | Tanie rozumowanie        |
|                    | Groq              | Płatność za użycie | Brak               | Ultra-szybka inferencja  |
|                    | xAI (Grok)        | Płatność za użycie | Brak               | Rozumowanie Grok 4       |
|                    | Mistral           | Płatność za użycie | Brak               | Modele hostowane w UE    |
|                    | Perplexity        | Płatność za użycie | Brak               | Wzbogacone wyszukiwaniem |
|                    | Together AI       | Płatność za użycie | Brak               | Modele open-source       |
|                    | Fireworks AI      | Płatność za użycie | Brak               | Szybkie obrazy FLUX      |
|                    | Cerebras          | Płatność za użycie | Brak               | Prędkość wafer-scale     |
|                    | Cohere            | Płatność za użycie | Brak               | Command R+ RAG           |
|                    | NVIDIA NIM        | Płatność za użycie | Brak               | Modele enterprise        |
|                    | Baidu Qianfan     | Płatność za użycie | Brak               | Modele ERNIE             |
| **💰 TANIO**       | GLM-4.7           | $0.6/1M            | Codziennie 10:00   | Zapas budżetowy          |
|                    | MiniMax M2.1      | $0.2/1M            | Okno 5-godzinne    | Najtańsza opcja          |
|                    | Kimi K2           | $9/mies. ryczałt   | 10M tokenów/mies.  | Przewidywalny koszt      |
| **🆓 ZA DARMO**    | Qoder             | $0                 | Bez limitu         | 8 modeli za darmo        |
|                    | Qwen              | $0                 | Bez limitu         | 3 modele za darmo        |
|                    | Kiro              | $0                 | ~50 kredytów/mies. | Claude za darmo          |

---

## 🎯 Przypadki użycia

### Przypadek 1: „Mam subskrypcję Claude Pro”

**Problem:** Limit wygasa niewykorzystany, limity żądań przy intensywnym kodowaniu

```
Combo: "maximize-claude"
  1. cc/claude-opus-4-7        (use subscription fully)
  2. glm/glm-4.7               (cheap backup when quota out)
  3. if/qwen3.8-max-preview       (free emergency fallback)

Monthly cost: $20 (subscription) + ~$5 (backup) = $25 total
vs. $20 + hitting limits = frustration
```

### Przypadek 2: „Chcę zerowy koszt”

**Problem:** Nie stać mnie na subskrypcje, potrzebuję niezawodnego AI do kodowania

```
Combo: "free-forever"
  1. if/kimi-k2.7-code          (unlimited free)
  2. kr/qwen3-coder-next        (Kiro free fallback)

Monthly cost: $0
Quality: Production-ready models
```

### Przypadek 3: „Potrzebuję kodowania 24/7 bez przerw”

**Problem:** Terminy, nie mogę sobie pozwolić na przestoje

```
Combo: "always-on"
  1. cc/claude-opus-4-7        (best quality)
  2. cx/gpt-5.5                (second subscription)
  3. glm/glm-4.7               (cheap, resets daily)
  4. minimax/MiniMax-M2.1      (cheapest, 5h reset)
  5. if/deepseek-v4-flash       (free unlimited)

Result: 5 layers of fallback = zero downtime
Monthly cost: $20-200 (subscriptions) + $10-20 (backup)
```

### Przypadek 4: „Chcę darmowe AI w OpenClaw”

**Problem:** Potrzebuję asystenta AI w aplikacjach messagingowych, całkowicie za darmo

```
Combo: "openclaw-free"
  1. if/qwen3.8-max-preview     (unlimited free)
  2. if/deepseek-v4-flash       (unlimited free)
  3. if/kimi-k2.7-code          (unlimited free)

Monthly cost: $0
Access via: WhatsApp, Telegram, Slack, Discord, iMessage, Signal...
```

---

## 📖 Konfiguracja providerów

### 🔐 Providerzy subskrypcyjni

#### Claude Code (Pro/Max)

```bash
Dashboard → Providers → Connect Claude Code
→ OAuth login → Auto token refresh
→ 5-hour + weekly quota tracking

Models:
  cc/claude-opus-4-7
  cc/claude-sonnet-4-6
  cc/claude-haiku-4-5-20251001
```

**Wskazówka:** Używaj Opus do złożonych zadań, Sonnet dla szybkości. OmniRoute śledzi limit per model!

Trasy zgodne z Claude i Claude Code zachowują poziom myślenia `max` dla modeli Opus i Sonnet
Modele Haiku nie akceptują poziomu wysiłku `max`, więc OmniRoute obniża to
żądanie do wysokiego budżetu myślenia przed wysłaniem upstream.

#### OpenAI Codex (Plus/Pro)

```bash
Dashboard → Providers → Connect Codex
→ OAuth login (port 1455)
→ 5-hour + weekly reset

Models:
  cx/gpt-5.5
  cx/gpt-5.4
  cx/gpt-5.3-codex
  cx/gpt-5.3-codex-spark
```

#### GitHub Copilot

```bash
Dashboard → Providers → Connect GitHub
→ OAuth via GitHub
→ Monthly reset (1st of month)

Models:
  gh/gpt-5.5
  gh/gpt-5.4
  gh/claude-sonnet-4.6
  gh/claude-opus-4.7
  gh/gemini-3.1-pro-preview
```

### 💰 Tanie providery

#### GLM-4.7 (reset codzienny, $0.6/1M)

1. Zarejestruj się: [Zhipu AI](https://open.bigmodel.cn)
2. Pobierz klucz API z Coding Plan
3. Dashboard → Add API Key: Provider: `glm`, API Key: `your-key`

**Użyj:** `glm/glm-4.7` — **Wskazówka:** Coding Plan daje 3× limit przy 1/7 kosztu! Reset codziennie o 10:00.

#### MiniMax M2.1 (reset 5h, $0.20/1M)

1. Zarejestruj się: [MiniMax](https://www.minimax.io)
2. Pobierz klucz API → Dashboard → Add API Key

**Użyj:** `minimax/MiniMax-M2.1` — **Wskazówka:** Najtańsza opcja dla długiego kontekstu (1M tokenów)!

#### Kimi K2 ($9/mies. ryczałt)

1. Subskrybuj: [Moonshot AI](https://platform.kimi.ai?aff=omniroute)
2. Pobierz klucz API → Dashboard → Add API Key

**Użyj:** `kimi/kimi-k2.5` — **Wskazówka:** Stałe $9/mies. za 10M tokenów = efektywny koszt $0.90/1M!

#### Baidu Qianfan / ERNIE

1. Zarejestruj się: [Baidu AI Cloud Qianfan](https://cloud.baidu.com/product/wenxinworkshop)
2. Utwórz klucz API Qianfan → Dashboard → Add API Key: Provider: `qianfan`

**Użyj:** `qianfan/ernie-5.1`, `qianfan/ernie-x1.1` lub inny identyfikator modelu Qianfan zgodny z OpenAI.

### 🆓 Providerzy ZA DARMO

Darmowi providerzy bez auth mają przełącznik obok **No authentication required** na stronie providera.
Wyłączenie dezaktywuje providera, usuwa go z widoków Providers configured/compact oraz
usuwa jego modele z `/v1/models`.

#### Qoder (9 modeli ZA DARMO)

```bash
Dashboard → Connect Qoder → OAuth login → Unlimited usage

Models: if/qwen3.8-max-preview, if/qwen3.7-max, if/qwen3.7-plus, if/kimi-k3, if/kimi-k2.7-code, if/glm-5.2, if/deepseek-v4-pro, if/deepseek-v4-flash, if/minimax-m3
```

#### Kiro (Claude ZA DARMO)

```bash
Dashboard → Connect Kiro → AWS Builder ID or Google/GitHub → ~50 credits/month

Models: kr/claude-sonnet-4.5, kr/claude-haiku-4.5
```

---

## 🎨 Combo

Karty combo możesz przestawiać bezpośrednio w **Dashboard → Combos**, przeciągając uchwyt na każdej karcie. Kolejność jest zapisywana w SQLite i przywracana po przeładowaniu.

### Przykład 1: Maksymalizacja subskrypcji → tani zapas

```
Dashboard → Combos → Create New

Name: premium-coding
Models:
  1. cc/claude-opus-4-7 (Subscription primary)
  2. glm/glm-4.7 (Cheap backup, $0.6/1M)
  3. minimax/MiniMax-M2.7 (Cheapest fallback, $0.3/1M)

Use in CLI: premium-coding
```

### Przykład 2: Tylko darmowe (zerowy koszt)

```
Name: free-combo
Models:
  1. if/kimi-k2.7-code (unlimited)
  2. kr/qwen3-coder-next (Kiro free fallback)

Cost: $0 forever!
```

---

## 🔧 Integracja CLI

### Cursor IDE

```
Settings → Models → Advanced:
  OpenAI API Base URL: http://localhost:20128/v1
  OpenAI API Key: [from omniroute dashboard]
  Model: cc/claude-opus-4-7
```

### Claude Code

Edytuj `~/.claude/settings.json`:

```json
{
  "env": {
    "ANTHROPIC_BASE_URL": "http://localhost:20128",
    "ANTHROPIC_AUTH_TOKEN": "your-omniroute-api-key"
  }
}
```

Użyj tutaj root endpointu zgodnego z Claude. Nie dopisuj `/v1` do `ANTHROPIC_BASE_URL`.

### Codex CLI

```bash
export OPENAI_BASE_URL="http://localhost:20128"
export OPENAI_API_KEY="your-omniroute-api-key"
codex "your prompt"
```

### OpenClaw

Edytuj `~/.openclaw/openclaw.json`:

```json
{
  "agents": {
    "defaults": {
      "model": { "primary": "omniroute/if/kimi-k2.7-code" }
    }
  },
  "models": {
    "providers": {
      "omniroute": {
        "baseUrl": "http://localhost:20128/v1",
        "apiKey": "your-omniroute-api-key",
        "api": "openai-completions",
        "models": [{ "id": "if/kimi-k2.7-code", "name": "Kimi K2.7 Code" }]
      }
    }
  }
}
```

**Albo użyj Dashboard:** CLI Tools → OpenClaw → Auto-config

### Cline / Continue / RooCode

```
Provider: OpenAI Compatible
Base URL: http://localhost:20128/v1
API Key: [from dashboard]
Model: cc/claude-opus-4-7
```

---

## 🚀 Wdrożenie

### Globalna instalacja npm (zalecane)

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
```

CLI automatycznie ładuje `.env` z `~/.omniroute/.env` lub `./.env`.

### Odinstalowywanie

Gdy nie potrzebujesz już OmniRoute, mamy dwa szybkie skrypty do czystego usunięcia:

| Polecenie                | Działanie                                                                        |
| ------------------------ | -------------------------------------------------------------------------------- |
| `npm run uninstall`      | Usuwa aplikację systemową, ale **zachowuje DB i konfiguracje** w `~/.omniroute`. |
| `npm run uninstall:full` | Usuwa aplikację ORAZ trwale **kasuje wszystkie konfiguracje, klucze i bazy**.    |

> Uwaga: Aby uruchomić te polecenia, przejdź do folderu projektu OmniRoute (jeśli klonowałeś) i je wykonaj. Alternatywnie, przy instalacji globalnej możesz po prostu uruchomić `npm uninstall -g omniroute`.

### Wdrożenie na VPS

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

### Wdrożenie PM2 (mało pamięci)

Na serwerach z ograniczoną RAM użyj opcji limitu pamięci:

```bash
# With 512MB limit (default)
pm2 start npm --name omniroute -- start

# Or with custom memory limit
OMNIROUTE_MEMORY_MB=512 pm2 start npm --name omniroute -- start

# Or using ecosystem.config.js
pm2 start ecosystem.config.js
```

Utwórz `ecosystem.config.js`:

```javascript
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
```

### Docker

```bash
# Build image (default = runner-cli with codex/claude/droid preinstalled)
docker build -t omniroute:cli .

# Portable mode (recommended)
docker run -d --name omniroute -p 20128:20128 --env-file ./.env -v omniroute-data:/app/data omniroute:cli
```

Dla trybu zintegrowanego z hostem i binariami CLI zobacz sekcję Docker w głównej dokumentacji.

### Void Linux (xbps-src)

Użytkownicy Void Linux mogą spakować i zainstalować OmniRoute natywnie przez framework cross-kompilacji `xbps-src`. Automatyzuje to build standalone Node.js wraz z wymaganymi natywnymi bindingami `better-sqlite3`.

<details>
<summary><b>Zobacz szablon xbps-src</b></summary>

```bash
# Template file for 'omniroute'
pkgname=omniroute
version=3.8.0
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

do_build() {
	# Determine target CPU arch for node-gyp
	local _gyp_arch
	case "$XBPS_TARGET_MACHINE" in
		aarch64*) _gyp_arch=arm64 ;;
		armv7*|armv6*) _gyp_arch=arm ;;
		i686*) _gyp_arch=ia32 ;;
		*) _gyp_arch=x64 ;;
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
```

</details>

### Zmienne środowiskowe

| Zmienna                                 | Domyślnie                            | Opis                                                                                                                     |
| --------------------------------------- | ------------------------------------ | ------------------------------------------------------------------------------------------------------------------------ |
| `JWT_SECRET`                            | `omniroute-default-secret-change-me` | Sekret podpisu JWT (**zmień w produkcji**)                                                                               |
| `INITIAL_PASSWORD`                      | `CHANGEME`                           | Hasło pierwszego logowania                                                                                               |
| `DATA_DIR`                              | `~/.omniroute`                       | Katalog danych (db, usage, logi)                                                                                         |
| `PORT`                                  | domyślne frameworka                  | Port usługi (`20128` w przykładach)                                                                                      |
| `HOSTNAME`                              | domyślne frameworka                  | Host nasłuchiwania (Docker domyślnie `0.0.0.0`)                                                                          |
| `NODE_ENV`                              | domyślne runtime                     | Ustaw `production` przy wdrożeniu                                                                                        |
| `NEXT_PUBLIC_BASE_URL`                  | `http://localhost:20128`             | Publiczny bazowy URL widoczny w dashboardzie i na serwerze (zastępuje legacy `BASE_URL`)                                 |
| `NEXT_PUBLIC_CLOUD_URL`                 | `https://omniroute.dev`              | Bazowy URL endpointu cloud sync (zastępuje legacy `CLOUD_URL`)                                                           |
| `API_KEY_SECRET`                        | `endpoint-proxy-api-key-secret`      | Sekret HMAC dla generowanych kluczy API                                                                                  |
| `REQUIRE_API_KEY`                       | `false`                              | Wymuszaj klucz API Bearer na `/v1/*`                                                                                     |
| `ALLOW_API_KEY_REVEAL`                  | `false`                              | Pozwól zalogowanym użytkownikom dashboardu na żądanie odsłaniać pełne zapisane wartości kluczy API                       |
| `PROVIDER_LIMITS_SYNC_INTERVAL_MINUTES` | `70`                                 | Częstotliwość odświeżania cache Provider Limits po stronie serwera; przyciski w UI nadal wymuszają ręczną synchronizację |
| `DISABLE_SQLITE_AUTO_BACKUP`            | `false`                              | Wyłącz automatyczne snapshoty SQLite przed zapisem/importem/przywróceniem; ręczne kopie nadal działają                   |
| `APP_LOG_TO_FILE`                       | `true`                               | Włącza zapis logów aplikacji i audytu na dysk                                                                            |
| `AUTH_COOKIE_SECURE`                    | `false`                              | Wymuś cookie auth `Secure` (za reverse proxy HTTPS)                                                                      |
| `CLOUDFLARED_BIN`                       | unset                                | Użyj istniejącego binarium `cloudflared` zamiast zarządzanego pobierania                                                 |
| `CLOUDFLARED_PROTOCOL`                  | `http2`                              | Transport dla zarządzanych Quick Tunnels (`http2`, `quic` lub `auto`)                                                    |
| `OMNIROUTE_MEMORY_MB`                   | `512`                                | Limit sterty Node.js w MB                                                                                                |
| `PROMPT_CACHE_MAX_SIZE`                 | `50`                                 | Maks. wpisów cache promptów                                                                                              |
| `SEMANTIC_CACHE_MAX_SIZE`               | `100`                                | Maks. wpisów semantic cache                                                                                              |

Pełną listę zmiennych środowiskowych znajdziesz w [README](../README.md).

---

## 📊 Dostępne modele

<details>
<summary><b>Zobacz wszystkie dostępne modele</b></summary>

> Poniższa lista pochodzi z `open-sse/config/providerRegistry.ts` dla v3.8.0. Katalogi chmurowe (Gemini, OpenRouter itd.) są synchronizowane dynamicznie — pełny live katalog: **Dashboard → Providers → [provider] → Available Models** lub `GET /api/models/catalog`.

**Claude Code (`cc/`)** — OAuth Pro/Max: `cc/claude-opus-4-8`, `cc/claude-opus-4-7`, `cc/claude-opus-4-6`, `cc/claude-opus-4-5-20251101`, `cc/claude-sonnet-4-6`, `cc/claude-sonnet-4-5-20250929`, `cc/claude-haiku-4-5-20251001`

**Codex (`cx/`)** — OAuth Plus/Pro: `cx/gpt-5.5` (+ poziomy effort: `gpt-5.5-xhigh`, `gpt-5.5-high`, `gpt-5.5-medium`, `gpt-5.5-low`), `cx/gpt-5.4`, `cx/gpt-5.4-mini`, `cx/gpt-5.3-codex`, `cx/gpt-5.3-codex-spark`

**GitHub Copilot (`gh/`)** — OAuth: `gh/gpt-5.5`, `gh/gpt-5.4`, `gh/gpt-5.4-mini`, `gh/gpt-5-mini`, `gh/gpt-5.3-codex`, `gh/claude-opus-4.7`, `gh/claude-opus-4.6`, `gh/claude-opus-4-5-20251101`, `gh/claude-sonnet-4.6`, `gh/claude-sonnet-4.5`, `gh/claude-haiku-4.5`, `gh/gemini-3.1-pro-preview`, `gh/gemini-3-flash-preview`, `gh/oswe-vscode-prime`

**Kiro (`kr/`)** — OAuth ZA DARMO: użyj live katalogu w **Dashboard → Providers → Kiro → Available Models**. Availability depends on the account and plan.

**Qoder (`if/`)** — OAuth ZA DARMO: `if/qwen3.8-max-preview`, `if/qwen3.7-max`, `if/qwen3.7-plus`, `if/kimi-k3`, `if/kimi-k2.7-code`, `if/glm-5.2`, `if/deepseek-v4-pro`, `if/deepseek-v4-flash`, `if/minimax-m3`

**GLM (`glm/`, `glm-cn/`, `zai/`, `glmt/`)** — $0.2–0.6/1M: `glm/glm-5.1`, `glm/glm-5`, `glm/glm-5-turbo`, `glm/glm-4.7`, `glm/glm-4.7-flash`, `glm/glm-4.6`, `glm/glm-4.6v`, `glm/glm-4.5`, `glm/glm-4.5v`, `glm/glm-4.5-air`

**MiniMax (`minimax/`, `minimax-cn/`)** — $0.2/1M: `minimax/MiniMax-M2.7`, `minimax/MiniMax-M2.7-highspeed`, `minimax/MiniMax-M2.5`, `minimax/MiniMax-M2.5-highspeed`

**Kimi (`kimi/`, `kimi-coding/`, `kimi-coding-apikey/`)** — $9/mies. ryczałt lub za użycie: `kimi/kimi-k2.6`, `kimi/kimi-k2.5`

**DeepSeek (`ds/`)** — klucz API: `ds/deepseek-v4-pro`, `ds/deepseek-v4-flash`

**Groq (`groq/`)** — ultra-szybkie: `groq/llama-3.3-70b-versatile`, `groq/meta-llama/llama-4-maverick-17b-128e-instruct`, `groq/qwen/qwen3-32b`, `groq/openai/gpt-oss-120b`

**xAI (`xai/`)** — natywne Grok: `xai/grok-4.3`, `xai/grok-4.20-multi-agent-0309`, `xai/grok-4.20-0309-reasoning`, `xai/grok-4.20-0309-non-reasoning`

**Mistral (`mistral/`)** — hostowane w UE: `mistral/mistral-large-latest`, `mistral/mistral-medium-3-5`, `mistral/mistral-small-latest`, `mistral/devstral-latest`, `mistral/codestral-latest`

**Perplexity (`pplx/`)** — wzbogacone wyszukiwaniem: `pplx/sonar-deep-research`, `pplx/sonar-reasoning-pro`, `pplx/sonar-pro`, `pplx/sonar`

**Together AI (`together/`)** — open-source: `together/meta-llama/Llama-3.3-70B-Instruct-Turbo-Free` (free), `together/meta-llama/Llama-Vision-Free`, `together/deepseek-ai/DeepSeek-R1-Distill-Llama-70B-Free`, `together/deepseek-ai/DeepSeek-R1`, `together/Qwen/Qwen3-235B-A22B`, `together/meta-llama/Llama-4-Maverick-17B-128E-Instruct-FP8`

**Fireworks AI (`fireworks/`)** — szybka inferencja: `fireworks/accounts/fireworks/models/kimi-k2p6`, `fireworks/accounts/fireworks/models/minimax-m2p7`, `fireworks/accounts/fireworks/models/qwen3p6-plus`, `fireworks/accounts/fireworks/models/glm-5p1`, `fireworks/accounts/fireworks/models/deepseek-v4-pro`

**Cerebras (`cerebras/`)** — wafer-scale: `cerebras/zai-glm-4.7`, `cerebras/gpt-oss-120b`

**Cohere (`cohere/`)** — pod RAG: `cohere/command-a-reasoning-08-2025`, `cohere/command-a-vision-07-2025`, `cohere/command-a-03-2025`, `cohere/command-r-08-2024`

**NVIDIA NIM (`nvidia/`)** — enterprise: `nvidia/z-ai/glm-5.1`, `nvidia/minimaxai/minimax-m2.7`, `nvidia/google/gemma-4-31b-it`, `nvidia/mistralai/mistral-small-4-119b-2603`, `nvidia/mistralai/mistral-large-3-675b-instruct-2512`, `nvidia/qwen/qwen3.5-397b-a17b`, `nvidia/deepseek-ai/deepseek-v4-pro`, `nvidia/openai/gpt-oss-120b`, `nvidia/nvidia/nemotron-3-super-120b-a12b`

**Baidu Qianfan (`qianfan/`)** — ERNIE: `qianfan/ernie-5.1`, `qianfan/ernie-5.0-thinking-latest`, `qianfan/ernie-x1.1`

**Ollama Cloud (`ollama-cloud/`)**: `ollama-cloud/deepseek-v4-pro`, `ollama-cloud/deepseek-v4-flash`, `ollama-cloud/kimi-k2.6`, `ollama-cloud/glm-5.1`, `ollama-cloud/minimax-m2.7`, `ollama-cloud/gemma4:31b`, `ollama-cloud/qwen3.5:397b`

**Gemini (Google Cloud `gemini/`)**: Synchronizowane na żywo per klucz API z Google — bez statycznej listy. Podłącz klucz w **Dashboard → Providers** then use **Available Models** to import the current catalog (e.g. `gemini/gemini-3-pro`, `gemini/gemini-3-flash`).

**Inni zgodni providerzy** (wybrane): `cohere`, `databricks`, `snowflake`, `together`, `vertex`, `alibaba`, `alibaba-cn`, `bedrock` (via `aws-bedrock`), `azure-ai`, `openrouter` (passthrough catalog), `siliconflow`, `hyperbolic`, `huggingface`, `featherless-ai`, `cloudflare-ai`, `scaleway`, `deepinfra`, `vercel-ai-gateway`, `bazaarlink`, `friendliai`, `nous-research`, `reka`, `volcengine`, `ai21`, `gigachat`. Each maintains its own model list in `providerRegistry.ts` and can be auto-synced when the provider exposes a `/models` endpoint.

**Uwaga o ID modeli:** OmniRoute używa natywnych ID providerów (`claude-opus-4-8`, `gpt-5.5`, `glm-5.1`, `MiniMax-M2.7`, `kimi-k2.5`, `grok-4.20-0309-reasoning`). Some IDs include dotted versions because that is how the upstream API expects them. If a model is not listed above, run `omniroute models --search <term>` or hit `GET /api/models/catalog` to confirm availability.

</details>

---

## 🧩 Funkcje zaawansowane

### Modele niestandardowe

Dodaj dowolne ID modelu do dowolnego providera bez czekania na aktualizację aplikacji:

```bash
# Via API
curl -X POST http://localhost:20128/api/provider-models \
  -H "Content-Type: application/json" \
  -d '{"provider": "openai", "modelId": "gpt-5.2", "modelName": "GPT-5.2"}'

# List: curl http://localhost:20128/api/provider-models?provider=openai
# Remove: curl -X DELETE "http://localhost:20128/api/provider-models?provider=openai&model=gpt-5.2"
```

Albo użyj Dashboard: **Providers → [Provider] → Custom Models**.

Uwagi:

- Providerzy OpenRouter oraz zgodni z OpenAI/Anthropic są zarządzani wyłącznie z **Available Models**. Ręczne dodawanie, import i auto-sync trafiają do tej samej listy dostępnych modeli, więc nie ma osobnej sekcji Custom Models dla tych providerów.
- Sekcja **Custom Models** jest przeznaczona dla providerów, które nie udostępniają zarządzanego importu dostępnych modeli.

### Łączenie peerów OmniRoute

Inną bramę OmniRoute możesz dodać jako provider **Custom OpenAI-compatible**. Użyj
bazowego URL peeru `/v1` oraz dedykowanego klucza API o minimalnych uprawnieniach wydanego przez ten peer.

Dla łańcuchów wzajemnych lub multi-hop włącz opcjonalną ochronę przed pętlami na każdej bramie:

```bash
# gateway-a
OMNIROUTE_INSTANCE_ID=gateway-a
OMNIROUTE_PEER_URLS=http://gateway-b:20128/v1
OMNIROUTE_PEER_MAX_HOPS=4
```

```bash
# gateway-b
OMNIROUTE_INSTANCE_ID=gateway-b
OMNIROUTE_PEER_URLS=http://gateway-a:20128/v1
OMNIROUTE_PEER_MAX_HOPS=4
```

Tylko żądania wysyłane na jawnie dozwolony URL peeru otrzymują nagłówek
`X-OmniRoute-Peer-Trace`. Brama odrzuca powtórzone ID instancji lub wyczerpany budżet hopów
kodem HTTP `508 Loop Detected`; zwykli providerzy upstream nie otrzymują metadanych peer.

Łączenie peerów to nie replikacja bazy ani failover hosta. Każda brama utrzymuje niezależny
stan SQLite, cache, liczniki limitów i sesje. Użyj reverse proxy ze health-checkiem lub failoveru
klienta dla dostępności active/passive lub active/active i nigdy nie montuj jednej bazy SQLite
do wielu uruchomionych instancji OmniRoute.

### Dedykowane trasy providerów

Kieruj żądania bezpośrednio do wybranego providera z walidacją modelu:

```bash
POST http://localhost:20128/v1/providers/openai/chat/completions
POST http://localhost:20128/v1/providers/openai/embeddings
POST http://localhost:20128/v1/providers/fireworks/images/generations
```

Prefiks providera jest dodawany automatycznie, jeśli brakuje. Niedopasowane modele zwracają `400`.

### Konfiguracja proxy sieciowego

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
```

**Pierwszeństwo:** Key-specific → Combo-specific → Provider-specific → Global → Environment.

### API katalogu modeli

```bash
curl http://localhost:20128/api/models/catalog
```

Zwraca modele pogrupowane według providera z typami (`chat`, `embedding`, `image`).

### Cloud Sync

- Synchronizuj providerów, combo i ustawienia między urządzeniami
- Automatyczna synchronizacja w tle z timeoutem + fail-fast
- W produkcji preferuj po stronie serwera `NEXT_PUBLIC_BASE_URL`/`NEXT_PUBLIC_CLOUD_URL`

### Cloudflare Quick Tunnel

- Dostępne w **Dashboard → Endpoints** dla Dockera i innych wdrożeń self-hosted
- Tworzy tymczasowy URL `https://*.trycloudflare.com` przekierowujący na Twój endpoint OpenAI-compatible `/v1`
- Pierwsze włączenie instaluje `cloudflared` tylko gdy potrzeba; kolejne restarty używają tego samego zarządzanego binarium
- Quick Tunnels nie są automatycznie przywracane po restarcie OmniRoute lub kontenera; włącz je ponownie z dashboardu w razie potrzeby
- URL-e tuneli są efemeryczne i zmieniają się przy każdym stop/start tunelu
- Zarządzane Quick Tunnels domyślnie używają transportu HTTP/2, by uniknąć głośnych ostrzeżeń QUIC UDP w ograniczonych kontenerach
- Ustaw `CLOUDFLARED_PROTOCOL=quic` lub `auto`, jeśli chcesz nadpisać wybór transportu
- Ustaw `CLOUDFLARED_BIN`, jeśli wolisz preinstalowane binarium `cloudflared` zamiast zarządzanego pobierania
- Panele Cloudflare Quick Tunnel, Tailscale Funnel i ngrok Tunnel można pokazać lub ukryć w **Settings → Appearance**. Hiding a panel does not stop a running tunnel.

### Inteligencja bramy LLM (faza 9)

- **Semantic Cache** — automatycznie cache'uje odpowiedzi non-streaming z temperature=0 (pomiń przez `X-OmniRoute-No-Cache: true`)
- **Idempotencja żądań** — deduplikuje żądania w ciągu 5s przez nagłówek `Idempotency-Key` lub `X-Request-Id`
- **Śledzenie postępu** — opcjonalne zdarzenia SSE `event: progress` przez nagłówek `X-OmniRoute-Progress: true`

---

### Translator Playground

Dostęp: **Dashboard → Translator**. Debuguj i wizualizuj, jak OmniRoute tłumaczy żądania API między providerami.

|| Tryb | Cel ||
| ---------------- | -------------------------------------------------------------------------------------- |
|| **Playground** | Wybierz format źródłowy/docelowy, wklej żądanie i od razu zobacz przetłumaczone wyjście ||
|| **Chat Tester** | Wysyłaj live wiadomości czatu przez proxy i sprawdzaj pełny cykl żądanie/odpowiedź ||
|| **Test Bench** | Uruchamiaj testy wsadowe na wielu kombinacjach formatów, by zweryfikować tłumaczenie ||
|| **Live Monitor** | Obserwuj tłumaczenia w czasie rzeczywistym, gdy żądania przechodzą przez proxy ||

**Przypadki użycia:**

- Debuguj, dlaczego dana kombinacja klient/provider zawodzi
- Sprawdź, że tagi thinking, tool calls i system prompts tłumaczą się poprawnie
- Porównaj różnice formatów między OpenAI, Claude, Gemini i Responses API

---

### Strategie routingu

Konfiguruj w **Dashboard → Settings → Routing**. Dashboard pokazuje sześć najczęściej używanych strategii; combo i auto-router wewnętrznie obsługują szerszy zestaw.

**Strategie widoczne w dashboardzie (routing na poziomie konta):**

|| Strategia | Opis ||
| ------------------------------ | ------------------------------------------------------------------------------------------------ |
|| **Fill First** | Używa kont w kolejności priorytetu — konto primary obsługuje wszystkie żądania, aż będzie niedostępne ||
|| **Round Robin** | Cykluje po wszystkich kontach z konfigurowalnym limitem sticky (domyślnie: 3 wywołania na konto) ||
|| **P2C (Power of Two Choices)** | Wybiera 2 losowe konta i kieruje do zdrowszego — balansuje obciążenie ze świadomością zdrowia ||
|| **Random** | Losowo wybiera konto dla każdego żądania algorytmem Fisher-Yates ||
|| **Least Used** | Kieruje do konta z najstarszym znacznikiem `lastUsedAt`, równomiernie rozkładając ruch ||
|| **Cost Optimized** | Kieruje do konta z najniższą wartością priority, optymalizując pod najtańszych providerów ||

**Zaawansowane strategie combo i auto** (konfigurowalne per combo lub przez prefiksy `auto/*` — zobacz [AUTO-COMBO.md](../routing/AUTO-COMBO.md)):

- `priority` — ścisła kolejność, bez round-robin
- `weighted` — proporcjonalny podział ruchu według wag per model
- `fill-first` — wyczerpuj pierwszy model aż do limitów
- `round-robin` / `strict-random` / `random`
- `p2c` (Power of Two Choices)
- `least-used` oraz `cost-optimized`
- `auto` — oparte na score spośród wszystkich kandydatów
- `lkgp` (Last Known Good Provider) — trzyma się ostatniego udanego modelu per sesja
- `context-optimized` — wybiera model z największym wolnym oknem kontekstu
- `context-relay` — łączy modele long-context dla kolejnych tur

#### Zewnętrzny nagłówek sticky session

Dla zewnętrznej afinity sesji (np. agenci Claude Code/Codex za reverse proxy) wyślij:

```http
X-Session-Id: your-session-key
```

OmniRoute akceptuje też `x_session_id` i zwraca efektywny klucz sesji w `X-OmniRoute-Session-Id`.

Jeśli używasz Nginxa i wysyłasz nagłówki w formie z podkreśleniem, włącz:

```nginx
underscores_in_headers on;
```

#### Aliasy modeli z wildcardami

Utwórz wzorce wildcard do mapowania nazw modeli:

```
Pattern: claude-sonnet-*     →  Target: cc/claude-sonnet-4-6
Pattern: gpt-*               →  Target: gh/gpt-5.3-codex
```

Wildcardy obsługują `*` (dowolne znaki) i `?` (pojedynczy znak).

#### Łańcuchy fallback

Zdefiniuj globalne łańcuchy fallback stosowane do wszystkich żądań:

```
Chain: production-fallback
  1. cc/claude-opus-4-7
  2. gh/gpt-5.3-codex
  3. glm/glm-4.7
```

---

### Odporność i circuit breakery

Konfiguruj w **Dashboard → Settings → Resilience**.

OmniRoute implementuje odporność na poziomie providera w pięciu komponentach:

1. **Kolejka żądań i pacing** — kształtowanie żądań na poziomie systemu:
   - **Requests Per Minute (RPM)** — maks. żądań na minutę per konto
   - **Min Time Between Requests** — minimalna przerwa w milisekundach między żądaniami
   - **Max Concurrent Requests** — maks. równoczesnych żądań per konto

2. **Connection Cooldown** — konfiguracja per typ auth dla pojedynczego połączenia po błędach do ponowienia:
   - **Base Cooldown** — domyślne okno cooldown po błędach upstream do ponowienia
   - **Use Upstream Retry Hints** — honoruje autorytatywne `Retry-After` lub wskazówki resetu, gdy podane
   - **Max Backoff Steps** — maks. poziom exponential backoff przy powtarzających się błędach

3. **Provider Circuit Breaker** — śledzi błędy end-to-end providera, oznacza go jako degraded przy skonfigurowanym progu ostrzeżenia i otwiera breaker po osiągnięciu progu błędów:
   - **Degradation Threshold** — kolejne błędy providera przed wejściem w `DEGRADED`
   - **Failure Threshold** — kolejne błędy providera przed wejściem w `OPEN`
   - **Reset Timeout** — okno czasu przed ponownym testem providera
   - **CLOSED** (Healthy) — żądania płyną normalnie
   - **DEGRADED** — żądania nadal płyną, a podwyższone błędy są śledzone
   - **OPEN** — provider tymczasowo zablokowany po powtarzających się błędach
   - **HALF_OPEN** — test, czy provider wrócił do zdrowia

   Limity `429` w zakresie połączenia zostają w **Connection Cooldown** i nie liczą się do breakera providera.

   Stan runtime breakera providera jest pokazywany wyłącznie na **Dashboard → Health**.

4. **Wait For Cooldown** — jeśli każde połączenie-kandydat jest już w cooldown, OmniRoute może poczekać na najwcześniejszy cooldown i automatycznie ponowić to samo żądanie klienta.

5. **Rate Limit Auto-Detection** — gdy providerzy upstream zwracają jawne okna oczekiwania, te wskazówki nadpisują lokalny connection cooldown (gdy ustawienie włączone).

**Wskazówka:** Użyj strony **Health**, by sprawdzić i zresetować live breakery providerów po awarii. Strona Resilience zmienia tylko konfigurację.

---

### Eksport / import bazy danych

Zarządzaj kopiami bazy w **Dashboard → Settings → System & Storage**.

|| Akcja | Opis | |
| ------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------- |
|| **Export Database** | Pobiera bieżącą bazę SQLite jako plik `.sqlite` | |
|| **Export All (.tar.gz)** | Pobiera pełne archiwum backupu: baza, ustawienia, combo, połączenia providerów (bez credentials), metadane kluczy API | |
| **Import Database** | Prześlij plik `.sqlite`, by zastąpić bieżącą bazę. Kopia przed importem tworzona automatycznie, chyba że `DISABLE_SQLITE_AUTO_BACKUP=true` |

```bash
# API: Export database
curl -o backup.sqlite http://localhost:20128/api/db-backups/export

# API: Export all (full archive)
curl -o backup.tar.gz http://localhost:20128/api/db-backups/exportAll

# API: Import database
curl -X POST http://localhost:20128/api/db-backups/import \
  -F "file=@backup.sqlite"
```

**Walidacja importu:** Importowany plik jest walidowany pod kątem integralności (pragma SQLite), wymaganych tabel (`provider_connections`, `provider_nodes`, `combos`, `api_keys`) i rozmiaru (maks. 100MB).

**Przypadki użycia:**

- Migruj OmniRoute między maszynami
- Twórz zewnętrzne kopie na disaster recovery
- Udostępniaj konfiguracje członkom zespołu (export all → udostępnij archiwum)

---

### Dashboard ustawień

Strona ustawień jest podzielona na **7 kart** dla łatwej nawigacji:

|| Karta | Zawartość ||
| -------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
|| **General** | Narzędzia storage systemu, domyślne zachowanie, widoczność tuneli Endpoint ||
|| **Appearance** | Motyw (light/dark/system), widoczność sidebara, przełączniki paneli kart tuneli Cloudflare/Tailscale/ngrok ||
|| **AI** | Konfiguracja thinking budget, globalne wstrzykiwanie system prompt, statystyki prompt cache ||
|| **Security** | Ustawienia logowania/hasła, IP Access Control, auth API dla `/models`, blokowanie providerów, ochrona prompt-injection ||
|| **Routing** | Globalna strategia routingu (Fill First / Round Robin / P2C / Random / Least Used / Cost Optimized), aliasy wildcard, łańcuchy fallback, domyślne combo ||
|| **Resilience** | Kolejka żądań, connection cooldown, konfiguracja breakerów providerów i zachowanie wait-for-cooldown ||
|| **Advanced** | Globalna konfiguracja proxy (HTTP/SOCKS5), nadpisania proxy per provider ||

General nie duplikuje już tylko-do-odczytu notatek o logach i cache. Retencja bazy i
ustawienia optymalizacji są zapisywane przez `/api/settings/database`; ręczne czyszczenie cache używa
`DELETE /api/cache`. Limity wierszy logów żądań i proxy sterują
`CALL_LOGS_TABLE_MAX_ROWS` i `PROXY_LOGS_TABLE_MAX_ROWS`.

---

### Koszty i zarządzanie budżetem

Dostęp: **Dashboard → Costs**.

|| Karta | Cel | |
| ----------- | ---------------------------------------------------------------------------------------- |
| **Budget** | Ustaw limity wydatków per klucz API z budżetami dziennymi/tygodniowymi/miesięcznymi i śledzeniem w czasie rzeczywistym |
| **Pricing** | Podgląd i edycja wpisów cen modeli — koszt na 1K tokenów input/output per provider |

```bash
# API: Set a budget
curl -X POST http://localhost:20128/api/usage/budget \
  -H "Content-Type: application/json" \
  -d '{"keyId": "key-123", "limit": 50.00, "period": "monthly"}'

# API: Get current budget status
curl http://localhost:20128/api/usage/budget
```

**Śledzenie kosztów:** Każde żądanie loguje użycie tokenów i liczy koszt według tabeli cen. Podziały w **Dashboard → Usage** według providera, modelu i klucza API.

---

### Transkrypcja audio

OmniRoute obsługuje transkrypcję audio przez endpoint zgodny z OpenAI:

```bash
POST /v1/audio/transcriptions
Authorization: Bearer your-api-key
Content-Type: multipart/form-data

# Example with curl
curl -X POST http://localhost:20128/v1/audio/transcriptions \
  -H "Authorization: Bearer your-api-key" \
  -F "file=@audio.mp3" \
  -F "model=deepgram/nova-3"
```

**Speech-to-Text (transkrypcja)** — providerzy:

- `openai/` (whisper-compatible)
- `groq/` (Groq Whisper Turbo)
- `deepgram/` (Nova family)
- `assemblyai/`
- `nvidia/` (Parakeet, Canary)
- `huggingface/` (whisper variants)
- `qwen/`

**Text-to-Speech (`POST /v1/audio/speech`)** — providerzy:

- `openai/` (tts-1, tts-1-hd)
- `hyperbolic/`
- `deepgram/` (Aura)
- `nvidia/` (Magpie TTS)
- `elevenlabs/`
- `huggingface/`
- `inworld/`
- `cartesia/`
- `playht/`
- `kie/`
- `aws-polly/`
- `xiaomi-mimo/`
- `edgetts/` (Microsoft Edge „Read Aloud” — darmowe, bez klucza API; nieoficjalny/reverse-engineered endpoint)
- `coqui/`, `tortoise/`
- `qwen/`

Obsługiwane formaty audio do transkrypcji: `mp3`, `wav`, `m4a`, `flac`, `ogg`, `webm`. TTS output formats depend on the provider (mp3, wav, opus, pcm, mulaw).

---

### Strategie balansowania combo

Konfiguruj balansowanie per combo w **Dashboard → Combos → Create/Edit → Strategy**.

| Strategia | Opis               |
| --------- | ------------------ |
|           | **Round-Robin**    | Przechodzi sekwencyjnie przez modele                                   |     |
|           | **Priority**       | Zawsze próbuje pierwszego modelu; fallback tylko przy błędzie          |     |
|           | **Random**         | Wybiera losowy model z combo dla każdego żądania                       |     |
|           | **Weighted**       | Kieruje proporcjonalnie według wag przypisanych modelom                |     |
|           | **Least-Used**     | Kieruje do modelu z najmniejszą liczbą ostatnich żądań (metryki combo) |     |
|           | **Cost-Optimized** | Kieruje do najtańszego dostępnego modelu (tabela cen)                  |     |

Globalne domyślne combo ustawisz w **Dashboard → Settings → Routing → Combo Defaults**.
Timeouty celów combo domyślnie dziedziczą timeout bieżącego żądania. Użyj **Target timeout
(sekundy)** w domyślnych combo lub pojedynczym combo tylko gdy krótszy limit per-cel ma
szybciej uruchamiać fallback.

Optymalizacje zero-latency combo są opcjonalne. Zostaw **Zero-latency optimizations** wyłączone, aby
te funkcje opóźnień nie ścigały celów fallback, nie pomijały celów na podstawie TTFT
historii ani nie kompresowały żądań fallback; włączenie pozwala na skonfigurowany hedging, predictive TTFT
pomijanie i proaktywną kompresję fallback w zamian za niższe tail
opóźnienie.

Wyłącz **Reasoning token buffer**, gdy providerzy upstream wymagają ścisłych
limitów `max_tokens` / `maxOutputTokens`. Po włączeniu routing combo dodaje zapas reasoning-model
tylko dla modeli ze znanym limitem wyjścia i zostawia limit tokenów klienta bez zmian, gdy
bezpieczna wartość z buforem przekroczyłaby ten limit. Jeśli limit klienta jest już powyżej znanego limitu,
OmniRoute obcina go do tego limitu przed wysłaniem żądania upstream.

---

### Dashboard zdrowia

Dostęp: **Dashboard → Health**. Przegląd zdrowia systemu w czasie rzeczywistym z 6 kartami:

|| Karta | Co pokazuje ||
| --------------------- | ----------------------------------------------------------- |
|| **System Status** | Uptime, wersja, użycie pamięci, katalog danych ||
|| **Provider Health** | Stan runtime globalnych breakerów providerów ||
|| **Rate Limits** | Aktywne connection cooldown per konto z pozostałym czasem ||
|| **Active Lockouts** | Aktywne lockouty per model i tymczasowe wykluczenia ||
|| **Signature Cache** | Statystyki cache deduplikacji (aktywne klucze, hit rate) ||
|| **Latency Telemetry** | Agregacja opóźnień p50/p95/p99 per provider ||

**Wskazówka:** Strona Health odświeża się automatycznie co 10 sekund. Użyj karty circuit breaker, by zidentyfikować providerów z problemami.

---

## 🤖 Auto-routing (bez konfiguracji)

OmniRoute ma wbudowany **auto-router oparty na score**, który wybiera najlepszy model dla każdego żądania spośród podłączonych providerów — bez utrzymywania combo. Wystarczy wysłać żądanie z jednym z prefiksów `auto/*`, a OmniRoute złoży wirtualne combo w locie, oceniając kandydatów pod kątem opóźnienia, kosztu, success rate, dopasowania kontekstu, przydatności modelu do zadania, ostatnich błędów, quoty i stanu circuit breakera.

| Prefiks        | Optymalizuje pod                                                                   |
| -------------- | ---------------------------------------------------------------------------------- |
| `auto`         | Zbalansowane domyślne (opóźnienie × koszt × success rate)                          |
| `auto/coding`  | Zadania kodowania: preferuje Claude, GPT-5, GLM, Kimi, Qwen Coder, DeepSeek coders |
| `auto/cheap`   | Najniższy $/token, akceptuje wyższe opóźnienie                                     |
| `auto/fast`    | Najniższe opóźnienie, ignoruje koszt                                               |
| `auto/offline` | Tylko lokalni providerzy (Ollama, vLLM, llama.cpp) — przydatne w air-gap           |
| `auto/smart`   | Najpierw jakość rozumowania (Opus, GPT-5 xhigh, R1, GLM 5.1 reasoning)             |
| `auto/lkgp`    | „Last Known Good Provider” — sticky do ostatnio udanego celu                       |

Przykład:

```bash
curl -X POST http://localhost:20128/v1/chat/completions \
  -H "Authorization: Bearer $OMNIROUTE_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "auto/coding",
    "messages": [{ "role": "user", "content": "Refactor this Python function" }],
    "stream": true
  }'
```

Auto-router jest w pełni opisany w [AUTO-COMBO.md](../routing/AUTO-COMBO.md) — w tym strojenie wag score, blacklistę providerów i podgląd decyzji routingu w **Dashboard → Auto Combo**.

---

## 🔌 Integracja MCP i A2A

OmniRoute jest jednocześnie **serwerem MCP** (Model Context Protocol) i **serwerem A2A** (Agent-to-Agent JSON-RPC 2.0). Każde IDE lub host agentów zgodny z MCP może wywoływać narzędzia OmniRoute bezpośrednio — bez dodatkowego wrappera.

### Transporty MCP

- **SSE**: `http://localhost:20128/api/mcp/sse`
- **Streamable HTTP**: `http://localhost:20128/api/mcp/stream`
- **stdio**: `omniroute --mcp` (dla wtyczek IDE preferujących stdio)

### Połącz Claude Desktop

Edytuj `~/Library/Application Support/Claude/claude_desktop_config.json` (macOS) lub odpowiednik na Windows/Linux:

```json
{
  "mcpServers": {
    "omniroute": {
      "command": "omniroute",
      "args": ["--mcp"]
    }
  }
}
```

### Połącz Cursor / Continue / VS Code MCP

Użyj URL SSE `http://localhost:20128/api/mcp/sse` oraz klucza API Bearer wygenerowanego w **Dashboard → API Keys**.

### Zakresy (scopes)

Narzędzia MCP są pogrupowane w 10 zakresów: `analytics`, `auth`, `billing`, `combos`, `health`, `keys`, `memory`, `models`, `providers`, `system`. Każdy klucz Bearer można ograniczyć do wybranych zakresów — pełny katalog narzędzi: [MCP-SERVER.md](../frameworks/MCP-SERVER.md), schemat JSON-RPC: [A2A-SERVER.md](../frameworks/A2A-SERVER.md).

---

## 🧠 System Skills

OmniRoute udostępnia rozszerzalny **framework skills** (`src/lib/skills/`), dzięki czemu agenci i endpoint A2A mogą uruchamiać rutyny domenowe (np. `code-review`, `summarize`, `extract-facts`, `web-research`).

- **Marketplace UI** — przeglądaj i instaluj skills w **Dashboard → Skills**
- **Per-key scopes** — ogranicz, które klucze API mogą wywoływać które skills
- **Własne skills** — wrzuć plik TypeScript do `src/lib/a2a/skills/`, zarejestruj go, a od razu będzie wywoływalny przez A2A

Pełna referencja: [SKILLS.md](../frameworks/SKILLS.md).

---

## 💾 System Memory

OmniRoute przechowuje **długoterminową pamięć konwersacyjną** z hybrydowym retrieval:

- **SQLite FTS5** do wyszukiwania keyword po poprzednich turach
- **Qdrant vector store** (opcjonalnie) do semantic recall
- **Automatyczna ekstrakcja faktów** — encje, preferencje i decyzje są podsumowywane po każdej sesji i zapisywane w tabeli `memory_facts`
- Wspomnienia są w zakresie per klucz API i per sesja

Zarządzaj pamięcią w **Dashboard → Memory** (szukaj, edytuj, eksportuj, czyść). Powierzchnia HTTP (`/api/memory/*`) pozwala agentom dodawać i odpytywać fakty programowo — zobacz [MEMORY.md](../frameworks/MEMORY.md).

---

## 🔔 Webhooki

Subskrybuj zdarzenia OmniRoute do monitoringu i automatyzacji w czasie rzeczywistym.

- Utwórz webhook w **Dashboard → Webhooks** z docelowym URL i sekretem podpisu HMAC
- Dostępne zdarzenia: `request.completed`, `request.failed`, `provider.unavailable`, `budget.exceeded`, `combo.switched`, `circuit_breaker.opened`, `circuit_breaker.closed`
- Każdy payload zawiera `X-OmniRoute-Signature` (HMAC-SHA256) do weryfikacji
- Ponowienia: 3 próby z exponential backoff, potem dead-letter queue

Pełny schemat w [WEBHOOKS.md](../frameworks/WEBHOOKS.md).

---

## ☁️ Cloud Agents

OmniRoute integruje się z cloud coding agents (**OpenAI Codex Cloud**, **Devin**, **Jules**, **Antigravity**), dzięki czemu możesz wysyłać długotrwałe zadania z tego samego dashboardu, który obsługuje lokalny routing.

- Twórz zadania w **Dashboard → Cloud Agents** lub przez `POST /api/v1/agents/tasks`
- Śledź status, logi i artefakty per zadanie
- Własny klucz API per provider — credentials nigdy nie opuszczają instancji OmniRoute

Pełna referencja: [CLOUD_AGENT.md](../frameworks/CLOUD_AGENT.md).

---

## 🛠️ Zarządzanie programistyczne

Możesz zarządzać każdym zasobem OmniRoute (providerzy, combo, klucze, ustawienia) przez HTTP, używając klucza zarządzania.

Wygeneruj klucz w **Dashboard → API Keys → New Key → Scope: manage**, następnie:

```bash
# List providers
curl http://localhost:20128/api/providers \
  -H "Authorization: Bearer $OMNIROUTE_MANAGE_KEY"

# Add a provider connection
curl -X POST http://localhost:20128/api/providers \
  -H "Authorization: Bearer $OMNIROUTE_MANAGE_KEY" \
  -H "Content-Type: application/json" \
  -d '{ "provider": "openai", "apiKey": "sk-...", "name": "main" }'

# Create a combo
curl -X POST http://localhost:20128/api/combos \
  -H "Authorization: Bearer $OMNIROUTE_MANAGE_KEY" \
  -H "Content-Type: application/json" \
  -d '{ "name": "premium", "strategy": "priority", "models": [{ "model": "cc/claude-opus-4-7" }, { "model": "glm/glm-5.1" }] }'

# List/create API keys
curl http://localhost:20128/api/keys -H "Authorization: Bearer $OMNIROUTE_MANAGE_KEY"
curl -X POST http://localhost:20128/api/keys -H "Authorization: Bearer $OMNIROUTE_MANAGE_KEY" \
  -d '{ "name": "ci-bot", "scopes": ["chat"] }'
```

Zobacz [API_REFERENCE.md](../reference/API_REFERENCE.md) po pełny katalog endpointów i przykłady request/response.

---

## 💻 Wewnętrzne CLI

OmniRoute dostarcza wewnętrzne CLI (`omniroute …`) do setupu, diagnostyki i kontroli runtime.

```bash
omniroute setup                    # Interactive wizard (password, providers, combos)
omniroute setup --non-interactive  # CI-friendly
omniroute doctor                   # Health diagnostics (data dir, DB, providers, ports)
omniroute providers available      # List supported providers
omniroute providers list           # List configured connections
omniroute providers test <id>      # Live test a provider connection
omniroute combos list              # List combos
omniroute combos switch <name>     # Set default combo
omniroute models                   # List available models (--json, --search)
omniroute keys add | list | remove # Manage API keys from the terminal
omniroute backup                   # Snapshot config + DB
omniroute restore [<timestamp>]    # Restore from a snapshot
omniroute health                   # Detailed health (breakers, cache, memory)
omniroute quota                    # Provider quota usage
omniroute mcp status               # MCP server status
omniroute a2a status               # A2A server status
omniroute tunnel list|create|stop  # Cloudflare/Tailscale/ngrok tunnels
omniroute reset-password           # Reset the admin password
omniroute --mcp                    # Start MCP server over stdio
omniroute --port 3000              # Start the server on a custom port
```

Wskazówka: połącz `omniroute doctor --json` z narzędziem monitoringu, by alertować o niezdrowych providerach.

---

## 🖥️ Aplikacja desktopowa (Electron)

OmniRoute jest dostępny jako natywna aplikacja desktopowa na Windows, macOS i Linux.

### Instalacja

```bash
# From the electron directory:
cd electron
npm install

# Development mode (connect to running Next.js dev server):
npm run dev

# Production mode (uses standalone build):
npm start
```

### Budowanie instalatorów

```bash
cd electron
npm run build          # Current platform
npm run build:win      # Windows (.exe NSIS)
npm run build:mac      # macOS (.dmg universal)
npm run build:linux    # Linux (.AppImage)
```

Wyjście → `electron/dist-electron/`

### Kluczowe funkcje

| Funkcja                     | Opis                                                               |
| --------------------------- | ------------------------------------------------------------------ |
| **Server Readiness**        | Odpytuje serwer przed pokazaniem okna (bez pustego ekranu)         |
| **System Tray**             | Minimalizacja do zasobnika, zmiana portu, wyjście z menu zasobnika |
| **Port Management**         | Zmiana portu serwera z zasobnika (auto-restart serwera)            |
| **Content Security Policy** | Restrykcyjne CSP przez nagłówki sesji                              |
| **Single Instance**         | Tylko jedna instancja aplikacji może działać naraz                 |
| **Offline Mode**            | Wbudowany serwer Next.js działa bez internetu                      |

### Zmienne środowiskowe

| Zmienna               | Domyślnie | Opis                               |
| --------------------- | --------- | ---------------------------------- |
| `OMNIROUTE_PORT`      | `20128`   | Port serwera                       |
| `OMNIROUTE_MEMORY_MB` | `512`     | Limit sterty Node.js (64–16384 MB) |

📖 Pełna dokumentacja: [`electron/README.md`](../../electron/README.md)
