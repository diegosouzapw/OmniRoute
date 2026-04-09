# User Guide (Українська)

🌐 **Languages:** 🇺🇸 [English](../../../../docs/USER_GUIDE.md) · 🇪🇸 [es](../../es/docs/USER_GUIDE.md) · 🇫🇷 [fr](../../fr/docs/USER_GUIDE.md) · 🇩🇪 [de](../../de/docs/USER_GUIDE.md) · 🇮🇹 [it](../../it/docs/USER_GUIDE.md) · 🇷🇺 [ru](../../ru/docs/USER_GUIDE.md) · 🇨🇳 [zh-CN](../../zh-CN/docs/USER_GUIDE.md) · 🇯🇵 [ja](../../ja/docs/USER_GUIDE.md) · 🇰🇷 [ko](../../ko/docs/USER_GUIDE.md) · 🇸🇦 [ar](../../ar/docs/USER_GUIDE.md) · 🇮🇳 [hi](../../hi/docs/USER_GUIDE.md) · 🇮🇳 [in](../../in/docs/USER_GUIDE.md) · 🇹🇭 [th](../../th/docs/USER_GUIDE.md) · 🇻🇳 [vi](../../vi/docs/USER_GUIDE.md) · 🇮🇩 [id](../../id/docs/USER_GUIDE.md) · 🇲🇾 [ms](../../ms/docs/USER_GUIDE.md) · 🇳🇱 [nl](../../nl/docs/USER_GUIDE.md) · 🇵🇱 [pl](../../pl/docs/USER_GUIDE.md) · 🇸🇪 [sv](../../sv/docs/USER_GUIDE.md) · 🇳🇴 [no](../../no/docs/USER_GUIDE.md) · 🇩🇰 [da](../../da/docs/USER_GUIDE.md) · 🇫🇮 [fi](../../fi/docs/USER_GUIDE.md) · 🇵🇹 [pt](../../pt/docs/USER_GUIDE.md) · 🇷🇴 [ro](../../ro/docs/USER_GUIDE.md) · 🇭🇺 [hu](../../hu/docs/USER_GUIDE.md) · 🇧🇬 [bg](../../bg/docs/USER_GUIDE.md) · 🇸🇰 [sk](../../sk/docs/USER_GUIDE.md) · 🇺🇦 [uk-UA](../../uk-UA/docs/USER_GUIDE.md) · 🇮🇱 [he](../../he/docs/USER_GUIDE.md) · 🇵🇭 [phi](../../phi/docs/USER_GUIDE.md) · 🇧🇷 [pt-BR](../../pt-BR/docs/USER_GUIDE.md) · 🇨🇿 [cs](../../cs/docs/USER_GUIDE.md) · 🇹🇷 [tr](../../tr/docs/USER_GUIDE.md)

---

Повний посібник із налаштування постачальників, створення комбінацій, інтеграції інструментів CLI та розгортання OmniRoute.---

## Table of Contents

- [Ціни з першого погляду](#-pricing-at-a-glance)
- [Випадки використання](#-випадків використання)
- [Налаштування постачальника](#-provider-setup)
- [Інтеграція CLI](#-cli-integration)
- [Розгортання](#-розгортання)
- [Доступні моделі](#-available-models)
- [Розширені функції](#-advanced-features)---

## 💰 Pricing at a Glance

| Рівень             | Постачальник     | Вартість                 | Скидання квоти                | Найкраще для                |
| ------------------ | ---------------- | ------------------------ | ----------------------------- | --------------------------- |
| **💳 ПІДПИСКА**    | Клод Код (Pro)   | 20 доларів США на місяць | 5 годин + щотижня             | Вже підписані               |
|                    | Codex (Plus/Pro) | $20-200/міс              | 5 годин + щотижня             | Користувачі OpenAI          |
|                    | Gemini CLI       | **БЕЗКОШТОВНО**          | 180 тис./місяць + 1 тис./день | всі!                        |
|                    | Копілот GitHub   | $10-19/міс               | Щомісяця                      | Користувачі GitHub          |
| **🔑 КЛЮЧ API**    | DeepSeek         | Оплата за використання   | Жодного                       | Дешеві міркування           |
|                    | Groq             | Оплата за використання   | Жодного                       | Надшвидкий висновок         |
|                    | xAI (Грок)       | Оплата за використання   | Жодного                       | Грок 4 міркування           |
|                    | Містраль         | Оплата за використання   | Жодного                       | Моделі, розміщені в ЄС      |
|                    | Розгубленість    | Оплата за використання   | Жодного                       | Search-augmented            |
|                    | Разом AI         | Оплата за використання   | Жодного                       | Моделі з відкритим кодом    |
|                    | Феєрверк AI      | Оплата за використання   | Жодного                       | Швидкі зображення FLUX      |
|                    | Головний мозок   | Оплата за використання   | Жодного                       | Швидкість вафельної шкали   |
|                    | Cohere           | Оплата за використання   | Жодного                       | Команда R+ RAG              |
|                    | NVIDIA NIM       | Оплата за використання   | Жодного                       | Моделі підприємства         |
| **💰 ДЕШЕВО**      | GLM-4.7          | $0,6/1 млн               | Щодня о 10 ранку              | Резервне копіювання бюджету |
|                    | MiniMax M2.1     | $0,2/1 млн               | 5-годинний роликовий          | Найдешевший варіант         |
|                    | Кімі К2          | 9 $/міс квартира         | 10 млн токенів/міс            | Передбачувана вартість      |
| **🆓 БЕЗКОШТОВНО** | Qoder            | $0                       | Необмежений                   | 8 моделей безкоштовно       |
|                    | Квен             | $0                       | Необмежений                   | 3 моделі безкоштовно        |
|                    | Кіро             | $0                       | Необмежений                   | Клод безкоштовно            |

**💡 Порада професіонала:**Почніть із Gemini CLI (180 тис. безкоштовно/місяць) + Qoder (необмежено безкоштовно) = вартість 0 доларів США!---

## 🎯 Use Cases

### Case 1: "I have Claude Pro subscription"

**Проблема:**Квота закінчується невикористаною, обмеження швидкості під час інтенсивного кодування```
Combo: "maximize-claude"

1. cc/claude-opus-4-6 (use subscription fully)
2. glm/glm-4.7 (cheap backup when quota out)
3. if/kimi-k2-thinking (free emergency fallback)

Monthly cost: $20 (subscription) + ~$5 (backup) = $25 total
vs. $20 + hitting limits = frustration

````

### Case 2: "I want zero cost"

**Проблема:**не можу дозволити собі підписку, потрібне надійне кодування ШІ```
Combo: "free-forever"
  1. gc/gemini-3-flash         (180K free/month)
  2. if/kimi-k2-thinking       (unlimited free)
  3. qw/qwen3-coder-plus       (unlimited free)

Monthly cost: $0
Quality: Production-ready models
````

### Case 3: "I need 24/7 coding, no interruptions"

**Проблема:**Дедлайни, не можу дозволити собі простої```
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

**Проблема:**потрібен помічник штучного інтелекту в програмах для обміну повідомленнями, повністю безкоштовний```
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

**Професійна порада:**Використовуйте Opus для складних завдань, Sonnet для швидкості. OmniRoute відстежує квоту на модель!#### OpenAI Codex (Plus/Pro)

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

**Найкраще:**Величезний безкоштовний рівень! Використовуйте це перед платними рівнями.#### GitHub Copilot

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

1. Зареєструйтеся: [Zhipu AI](https://open.bigmodel.cn/)
2. Отримайте ключ API від Coding Plan
3. Інформаційна панель → Додати ключ API: Постачальник: `glm`, Ключ API: `your-key`

**Використовуйте:**`glm/glm-4.7` —**Професійна порада:**План кодування пропонує 3× квоту за 1/7 вартості! Скидання щодня о 10:00.#### MiniMax M2.1 (5h reset, $0.20/1M)

1. Зареєструйтеся: [MiniMax](https://www.minimax.io/)
2. Отримати ключ API → Інформаційна панель → Додати ключ API

**Використовуйте:**`minimax/MiniMax-M2.1` —**Порада:**Найдешевший варіант для довгого контексту (1 млн токенів)!#### Kimi K2 ($9/month flat)

1. Підпишіться: [Moonshot AI](https://platform.moonshot.ai/)
2. Отримати ключ API → Інформаційна панель → Додати ключ API

**Використовуйте:**`kimi/kimi-latest` —**Порада професіонала:**Фіксовані 9 доларів США на місяць за 10 мільйонів токенів = 0,90 доларів США за 1 млн фактичних витрат!### 🆓 FREE Providers

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

Відредагуйте `~/.claude/config.json`:```json
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

Відредагуйте `~/.openclaw/openclaw.json`:```json
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

**Або скористайтеся інформаційною панеллю:**Інструменти CLI → OpenClaw → Auto-config### Cline / Continue / RooCode

```

Provider: OpenAI Compatible
Base URL: http://localhost:20128/v1
API Key: [from dashboard]
Model: cc/claude-opus-4-6

````

---

## Розгортання

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

CLI автоматично завантажує `.env` з `~/.omniroute/.env` або `./.env`.### VPS Deployment

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

Для серверів з обмеженою оперативною пам’яттю використовуйте опцію обмеження пам’яті:```bash

# With 512MB limit (default)

pm2 start npm --name omniroute -- start

# Or with custom memory limit

OMNIROUTE_MEMORY_MB=512 pm2 start npm --name omniroute -- start

# Or using ecosystem.config.js

pm2 start ecosystem.config.js

````

Створіть `ecosystem.config.js`:```javascript
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

Для інтегрованого режиму з двійковими файлами CLI дивіться розділ Docker в основних документах.### Void Linux (xbps-src)

Користувачі Void Linux можуть запакувати та інсталювати OmniRoute нативно за допомогою фреймворку крос-компіляції `xbps-src`. Це автоматизує окрему збірку Node.js разом із необхідними нативними зв’язками `better-sqlite3`.

<подробиці>

<summary><b>Переглянути шаблон xbps-src</b></summary>```bash
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

| Змінна | За замовчуванням | Опис |
| ----------------------------------------------- | ------------------------------------ | --------------------------------------------------------------------------------------------------------------- |
| `JWT_SECRET` | `omniroute-default-secret-change-me` | Секрет підпису JWT (**зміни у виробництві**) |
| `ПОЧАТКОВИЙ_ПАРОЛЬ` | `123456` | Перший пароль для входу |
| `DATA_DIR` | `~/.omniroute` | Каталог даних (база даних, використання, журнали) |
| `ПОРТ` | рамка за замовчуванням | Сервісний порт («20128» у прикладах) |
| `ІМ'Я ХОСТУ` | рамка за замовчуванням | Прив’язати хост (Docker за замовчуванням `0.0.0.0`) |
| `NODE_ENV` | виконання за замовчуванням | Встановіть `виробництво` для розгортання |
| `BASE_URL` | `http://localhost:20128` | Внутрішня базова URL-адреса на стороні сервера |
| `CLOUD_URL` | `https://omniroute.dev` | Базова URL-адреса кінцевої точки хмарної синхронізації |
| `API_KEY_SECRET` | `endpoint-proxy-api-key-secret` | Секрет HMAC для згенерованих ключів API |
| `REQUIRE_API_KEY` | `false` | Примусово застосувати ключ API носія на `/v1/*` |
| `ALLOW_API_KEY_REVEAL` | `false` | Дозволити Api Manager копіювати повні ключі API на вимогу |
| `PROVIDER_LIMITS_SYNC_INTERVAL_MINUTES` | `70` | Частота оновлення на стороні сервера для кешованих даних про обмеження постачальника; Кнопки оновлення інтерфейсу досі запускають ручну синхронізацію |
| `DISABLE_SQLITE_AUTO_BACKUP` | `false` | Вимкнути автоматичні знімки SQLite перед записом/імпортом/відновленням; ручне резервне копіювання все ще працює |
| `APP_LOG_TO_FILE`                       | `true`                               | Enables application and audit log output to disk                                                          |
| `AUTH_COOKIE_SECURE` | `false` | Примусово `Secure` автентифікація cookie (за зворотним проксі HTTPS) |
| `CLOUDFLARED_BIN` | не встановлено | Використовуйте існуючий двійковий файл `cloudflared` замість керованого завантаження |
| `CLOUDFLARED_PROTOCOL` | `http2` | Транспорт для керованих швидких тунелів (`http2`, `quic` або `auto`) |
| `OMNIROUTE_MEMORY_MB` | `512` | Обмеження купи Node.js у МБ |
| `PROMPT_CACHE_MAX_SIZE` | `50` | Максимальна кількість записів кешу запитів |
| `SEMANTIC_CACHE_MAX_SIZE` | `100` | Максимальна кількість записів семантичного кешу |Щоб отримати повну інформацію про змінні середовища, перегляньте [README](../README.md).---

## 📊 Available Models

<подробиці>
<summary><b>Переглянути всі доступні моделі</b></summary>

**Claude Code (`cc/`)**— Pro/Max: `cc/claude-opus-4-6`, `cc/claude-sonnet-4-5-20250929`, `cc/claude-haiku-4-5-20251001`

**Codex (`cx/`)**— Plus/Pro: `cx/gpt-5.2-codex`, `cx/gpt-5.1-codex-max`

**Gemini CLI (`gc/`)**— БЕЗКОШТОВНО: `gc/gemini-3-flash-preview`, `gc/gemini-2.5-pro`

**GitHub Copilot (`gh/`)**: `gh/gpt-5`, `gh/claude-4.5-sonnet`

**GLM (`glm/`)**— $0,6/1 млн: `glm/glm-4,7`

**MiniMax (`minimax/`)**— $0,2/1 млн: `minimax/MiniMax-M2.1`

**Qoder (`if/`)**— БЕЗКОШТОВНО: `if/kimi-k2-thinking`, `if/qwen3-coder-plus`, `if/deepseek-r1`

**Qwen (`qw/`)**— БЕЗКОШТОВНО: `qw/qwen3-coder-plus`, `qw/qwen3-coder-flash`

**Kiro (`kr/`)**— БЕЗКОШТОВНО: `kr/claude-sonnet-4.5`, `kr/claude-haiku-4.5`

**DeepSeek (`ds/`)**: `ds/deepseek-chat`, `ds/deepseek-reasoner`

**Groq (`groq/`)**: `groq/llama-3.3-70b-versatile`, `groq/llama-4-maverick-17b-128e-instruct`

**xAI (`xai/`)**: `xai/grok-4`, `xai/grok-4-0709-fast-reasoning`, `xai/grok-code-mini`

**Містраль (`mistral/`)**: `mistral/mistral-large-2501`, `mistral/codestral-2501`

**Перплексність (`pplx/`)**: `pplx/sonar-pro`, `pplx/sonar`

**Together AI (`together/`)**: `together/meta-llama/Llama-3.3-70B-Instruct-Turbo`

**Fireworks AI (`fireworks/`)**: `fireworks/accounts/fireworks/models/deepseek-v3p1`

**Cerebras (`cerebras/`)**: `cerebras/llama-3.3-70b`

**Cohere (`cohere/`)**: `cohere/command-r-plus-08-2024`

**NVIDIA NIM (`nvidia/`)**: `nvidia/nvidia/llama-3.3-70b-instruct`</details>

---

## 🧩 Advanced Features

### Custom Models

Додайте будь-який ідентифікатор моделі до будь-якого постачальника, не чекаючи оновлення програми:```bash
# Via API
curl -X POST http://localhost:20128/api/provider-models \
  -H "Content-Type: application/json" \
  -d '{"provider": "openai", "modelId": "gpt-4.5-preview", "modelName": "GPT-4.5 Preview"}'

# List: curl http://localhost:20128/api/provider-models?provider=openai
# Remove: curl -X DELETE "http://localhost:20128/api/provider-models?provider=openai&model=gpt-4.5-preview"
````

Або скористайтеся інформаційною панеллю:**Постачальники → [Постачальник] → Спеціальні моделі**.

Примітки:

- OpenRouter і OpenAI/Anthropic-сумісні провайдери керуються лише з**Доступних моделей**. Додавання, імпорт і автоматична синхронізація вручну все потрапляє в той самий список доступних моделей, тому для цих постачальників немає окремого розділу «Користувацькі моделі».
- Розділ**Користувацькі моделі**призначений для постачальників, які не надають імпорт керованих доступних моделей.### Dedicated Provider Routes

Направляйте запити безпосередньо до конкретного постачальника з перевіркою моделі:```bash
POST http://localhost:20128/v1/providers/openai/chat/completions
POST http://localhost:20128/v1/providers/openai/embeddings
POST http://localhost:20128/v1/providers/fireworks/images/generations

````

Якщо префікс провайдера відсутній, додається автоматично. Невідповідні моделі повертають "400".### Network Proxy Configuration

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

**Пріоритет:**Специфічний ключ → Специфічний комбінований → Специфічний постачальник → Глобальний → Середовище.### Model Catalog API

```bash
curl http://localhost:20128/api/models/catalog
```

Повертає моделі, згруповані за постачальником із типами (`чат`, `вбудовування`, `зображення`).### Cloud Sync

- Синхронізація постачальників, комбінацій і налаштувань на всіх пристроях
- Автоматична фонова синхронізація з тайм-аутом + швидка відмова
- Надавайте перевагу серверним `BASE_URL`/`CLOUD_URL` у виробництві### Cloudflare Quick Tunnel

- Доступно в**Інформаційна панель → Кінцеві точки**для Docker та інших самостійних розгортань
- Створює тимчасову URL-адресу `https://*.trycloudflare.com`, яка пересилає вашу поточну кінцеву точку `/v1`, сумісну з OpenAI
- Спочатку ввімкніть установку `cloudflared` лише за потреби; пізніші перезапуски повторно використовують той самий керований двійковий файл
- Швидкі тунелі не відновлюються автоматично після перезапуску OmniRoute або контейнера; за потреби повторно ввімкніть їх на інформаційній панелі
- URL-адреси тунелів є ефемерними та змінюються кожного разу, коли ви зупиняєте/запускаєте тунель
- У керованих швидких тунелях за замовчуванням використовується транспорт HTTP/2, щоб уникнути шумових попереджень буфера QUIC UDP у обмежених контейнерах.
- Встановіть `CLOUDFLARED_PROTOCOL=quic` або `auto`, якщо ви хочете змінити вибір керованого транспорту
- Установіть `CLOUDFLARED_BIN`, якщо ви віддаєте перевагу використанню попередньо встановленого двійкового файлу `cloudflared` замість керованого завантаження### LLM Gateway Intelligence (Phase 9)

-**Семантичний кеш**— автоматично кешує непотокові відповіді, температура=0 (обхід за допомогою `X-OmniRoute-No-Cache: true`) -**Request Idempotency**— видаляє дублікати запитів протягом 5 секунд через заголовок `Idempotency-Key` або `X-Request-Id` -**Відстеження прогресу**— увімкнення події SSE `event: progress` через заголовок `X-OmniRoute-Progress: true`---

### Translator Playground

Доступ через**Інформаційна панель → Перекладач**. Налагодьте та візуалізуйте, як OmniRoute перекладає запити API між постачальниками.

| Режим                    | Призначення                                                                                    |
| ------------------------ | ---------------------------------------------------------------------------------------------- |
| **Дитячий майданчик**    | Виберіть вихідний/цільовий формати, вставте запит і миттєво перегляньте перекладений результат |
| **Тестувальник чату**    | Надсилайте повідомлення чату через проксі та перевіряйте повний цикл запитів/відповідей        |
| **Випробувальний стенд** | Виконайте пакетні тести для кількох комбінацій форматів, щоб перевірити правильність перекладу |
| **Живий монітор**        | Переглядайте переклади в реальному часі, коли запити проходять через проксі                    |

**Приклади використання:**

- Налагодження причин невдачі певної комбінації клієнт/постачальник
- Переконайтеся, що теги мислення, виклики інструментів і системні підказки перекладаються правильно
- Порівняйте відмінності форматів між форматами OpenAI, Claude, Gemini та Responses API---

### Routing Strategies

Налаштувати через**Інформаційна панель → Налаштування → Маршрутизація**.

| Стратегія                      | Опис                                                                                                                         |
| ------------------------------ | ---------------------------------------------------------------------------------------------------------------------------- | ----------------------------------- |
| **Спочатку заповніть**         | Використовує облікові записи в пріоритетному порядку — основний обліковий запис обробляє всі запити, поки не стане доступним |
| **Кругова система**            | Переглядає всі облікові записи з настроюваним лімітом (за замовчуванням: 3 виклики на обліковий запис)                       |
| **P2C (Power of Two Choices)** | Вибирає 2 випадкові облікові записи та направляє до більш здорового — балансує навантаження з усвідомленням здоров’я         |
| **Випадкове**                  | Випадково вибирає обліковий запис для кожного запиту за допомогою перемішування Фішера-Єйтса                                 |
| **Найменш використовуваний**   | Маршрути до облікового запису з найстарішою міткою часу `lastUsedAt`, рівномірно розподіляючи трафік                         |
| **Оптимізація вартості**       | Маршрути до облікового запису з найнижчим значенням пріоритету, оптимізуючи для найнижчих постачальників                     | #### External Sticky Session Header |

Для спорідненості зовнішнього сеансу (наприклад, агенти Claude Code/Codex за зворотними проксі-серверами) надішліть:```http
X-Session-Id: your-session-key

````

OmniRoute також приймає `x_session_id` і повертає ефективний ключ сеансу в `X-OmniRoute-Session-Id`.

Якщо ви використовуєте Nginx і надсилаєте заголовки форми підкреслення, увімкніть:```nginx
underscores_in_headers on;
````

#### Wildcard Model Aliases

Створіть шаблони символів підстановки, щоб змінити назви моделей:```
Pattern: claude-sonnet-_ → Target: cc/claude-sonnet-4-5-20250929
Pattern: gpt-_ → Target: gh/gpt-5.1-codex

````

Символи підстановки підтримують `*` (будь-які символи) і `?` (один символ).#### Fallback Chains

Визначте глобальні резервні ланцюжки, які застосовуються до всіх запитів:```
Chain: production-fallback
  1. cc/claude-opus-4-6
  2. gh/gpt-5.1-codex
  3. glm/glm-4.7
````

---

### Resilience & Circuit Breakers

Налаштуйте за допомогою**Інформаційна панель → Налаштування → Стійкість**.

OmniRoute реалізує стійкість на рівні постачальника за допомогою чотирьох компонентів:

1.**Профілі постачальників**— конфігурація кожного постачальника для:

- Поріг відмови (скільки відмов до відкриття)
- Тривалість відновлення
- Чутливість визначення межі швидкості
- Експоненціальні параметри відставання

  2.**Обмеження швидкості, які можна редагувати**— параметри системного рівня, які можна налаштувати на інформаційній панелі: -**Запитів за хвилину (RPM)**— максимальна кількість запитів за хвилину на обліковий запис -**Мінімальний час між запитами**— мінімальний проміжок у мілісекундах між запитами -**Max Concurrent Requests**— максимальна кількість одночасних запитів на обліковий запис

- Натисніть**Редагувати**, щоб змінити, потім**Зберегти**або**Скасувати**. Значення зберігаються через API стійкості.

  3.**Circuit Breaker**— відстежує збої кожного постачальника та автоматично розмикає ланцюг, коли досягається порогове значення: -**ЗАКРИТО**(справний) — запити надходять нормально -**OPEN**— Провайдер тимчасово заблоковано після повторних збоїв -**HALF_OPEN**— Перевірка, якщо провайдер відновився

  4.**Політики та заблоковані ідентифікатори**— показує статус автоматичного вимикача та заблоковані ідентифікатори з можливістю примусового розблокування.

  5.**Автовизначення ліміту швидкості**— відстежує заголовки `429` і `Retry-After`, щоб завчасно уникнути перевищення обмежень постачальника.

**Порада:**Використовуйте кнопку**Скинути все**, щоб очистити всі автоматичні вимикачі та часи відновлення, коли постачальник відновиться після збою.---

### Database Export / Import

Керуйте резервними копіями бази даних у**Інформаційна панель → Налаштування → Система та сховище**.

| Дія                            | Опис                                                                                                                                                      |
| ------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------- | ------- |
| **Експорт бази даних**         | Завантажує поточну базу даних SQLite як файл `.sqlite`                                                                                                    |
| **Експортувати все (.tar.gz)** | Завантажує повний резервний архів, включаючи: базу даних, налаштування, комбінації, з’єднання провайдера (без облікових даних), метадані ключа API        |
| **Імпорт бази даних**          | Завантажте файл `.sqlite`, щоб замінити поточну базу даних. Резервна копія перед імпортом створюється автоматично, якщо `DISABLE_SQLITE_AUTO_BACKUP=true` | ```bash |

# API: Export database

curl -o backup.sqlite http://localhost:20128/api/db-backups/export

# API: Export all (full archive)

curl -o backup.tar.gz http://localhost:20128/api/db-backups/exportAll

# API: Import database

curl -X POST http://localhost:20128/api/db-backups/import \
 -F "file=@backup.sqlite"

````

**Перевірка імпорту:**Імпортований файл перевіряється на цілісність (перевірка прагми SQLite), необхідні таблиці (`provider_connections`, `provider_nodes`, `combos`, `api_keys`) і розмір (макс. 100 МБ).

**Випадки використання:**

- Перенос OmniRoute між машинами
- Створення зовнішніх резервних копій для аварійного відновлення
- Спільний доступ до конфігурацій між членами команди (експортувати все → надати доступ до архіву)---

### Settings Dashboard

Для зручності навігації сторінка налаштувань складається з 6 вкладок:

| Вкладка | Зміст |
| -------------- | ---------------------------------------------------------------------------------------------- |
|**Загальне**| Інструменти системного зберігання, налаштування зовнішнього вигляду, елементи керування темою та видимість бічної панелі для кожного елемента |
|**Безпека**| Налаштування логіна/пароля, контроль IP-доступу, автентифікація API для `/models` і блокування постачальника |
|**Маршрутизація**| Глобальна стратегія маршрутизації (6 варіантів), псевдоніми моделей із підстановкою, резервні ланцюжки, комбіновані параметри за замовчуванням |
|**Стійкість**| Профілі постачальників, обмеження швидкості, які можна редагувати, статус автоматичного вимикача, політики та заблоковані ідентифікатори |
|**AI**| Продумана конфігурація бюджету, впровадження глобальної системної підказки, швидка статистика кешу |
|**Розширений**| Глобальна конфігурація проксі (HTTP/SOCKS5) |---

### Costs & Budget Management

Доступ через**Інформаційна панель → Витрати**.

| Вкладка | Призначення |
| ----------- | ---------------------------------------------------------------------------------------- |
|**Бюджет**| Встановіть ліміти витрат на ключ API за допомогою щоденних/тижневих/місячних бюджетів і відстеження в реальному часі |
|**Ціни**| Перегляд і редагування записів моделі ціноутворення — вартість 1 тис. токенів вводу/виводу на постачальника |```bash
# API: Set a budget
curl -X POST http://localhost:20128/api/usage/budget \
  -H "Content-Type: application/json" \
  -d '{"keyId": "key-123", "limit": 50.00, "period": "monthly"}'

# API: Get current budget status
curl http://localhost:20128/api/usage/budget
````

**Відстеження вартості:**кожен запит реєструє використання токенів і розраховує вартість за допомогою таблиці цін. Перегляньте розбивку в**Інформаційна панель → Використання**за постачальником, моделлю та ключем API.---

### Audio Transcription

OmniRoute підтримує транскрипцію аудіо через кінцеву точку, сумісну з OpenAI:```bash
POST /v1/audio/transcriptions
Authorization: Bearer your-api-key
Content-Type: multipart/form-data

# Example with curl

curl -X POST http://localhost:20128/v1/audio/transcriptions \
 -H "Authorization: Bearer your-api-key" \
 -F "file=@audio.mp3" \
 -F "model=deepgram/nova-3"

````

Доступні постачальники:**Deepgram**(`deepgram/`),**AssemblyAI**(`assemblyai/`).

Підтримувані аудіоформати: `mp3`, `wav`, `m4a`, `flac`, `ogg`, `webm`.---

### Combo Balancing Strategies

Налаштуйте балансування за комбо в**Інформаційна панель → Комбо → Створити/Редагувати → Стратегія**.

| Стратегія | Опис |
| ------------------ | ------------------------------------------------------------------------ |
|**Кругова система**| Обертає моделі послідовно |
|**Пріоритет**| Завжди пробує першу модель; повертається лише в разі помилки |
|**Випадкове**| Вибирає випадкову модель із комбо для кожного запиту |
|**Зважений**| Маршрути пропорційно на основі призначеної ваги для моделі |
|**Найменш використовуваний**| Маршрути до моделі з найменшою кількістю останніх запитів (використовує комбіновані показники) |
|**Оптимізовано за витратами**| Маршрути до найдешевшої доступної моделі (використовується таблиця цін) |

Глобальні стандартні параметри комбінованих маршрутів можна встановити в**Інформаційна панель → Налаштування → Маршрутизація → Стандартні параметри комбінованих маршрутів**.---

### Health Dashboard

Доступ через**Інформаційна панель → Здоров’я**. Огляд стану системи в реальному часі з 6 картками:

| Картка | Що це показує |
| --------------------- | ------------------------------------------------------------ |
|**Стан системи**| Час роботи, версія, використання пам’яті, каталог даних |
|**Здоров’я постачальника**| Стан автоматичного вимикача для кожного постачальника (замкнуто/розімкнуто/напіврозімкнуто) |
|**Обмеження швидкості**| Обмеження активної швидкості перезарядки на обліковий запис із часом, що залишився |
|**Активні блокування**| Провайдери, тимчасово заблоковані політикою блокування |
|**Кеш підпису**| Статистика кешу дедуплікації (активні ключі, частота звернень) |
|**Телеметрія затримки**| Агрегація затримок p50/p95/p99 для кожного провайдера |

**Професійна порада.**Сторінка «Здоров’я» автоматично оновлюється кожні 10 секунд. Використовуйте картку автоматичного вимикача, щоб визначити, які постачальники мають проблеми.---

## 🖥️ Desktop Application (Electron)

OmniRoute доступний як рідна настільна програма для Windows, macOS і Linux.### Встановити

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

Вивід → `electron/dist-electron/`### Key Features

| Особливість                 | Опис                                                              |
| --------------------------- | ----------------------------------------------------------------- | ------------------------- |
| **Готовність сервера**      | Опитує сервер перед показом вікна (без порожнього екрана)         |
| **Системний трей**          | Згорнути в трей, змінити порт, вийти з меню трея                  |
| **Керування портами**       | Змінити порт сервера з трея (сервер автоматично перезапускається) |
| **Політика безпеки вмісту** | Обмежувальний CSP через заголовки сеансу                          |
| **Один екземпляр**          | Одночасно може працювати лише один екземпляр програми             |
| **Автономний режим**        | Поєднаний сервер Next.js працює без Інтернету                     | ### Environment Variables |

| Змінна                | За замовчуванням | Опис                                 |
| --------------------- | ---------------- | ------------------------------------ |
| `OMNIROUTE_PORT`      | `20128`          | Порт сервера                         |
| `OMNIROUTE_MEMORY_MB` | `512`            | Обмеження купи Node.js (64–16384 МБ) |

📖 Повна документація: [`electron/README.md`](../electron/README.md)
