# User Guide (Български)

🌐 **Languages:** 🇺🇸 [English](../../../../docs/USER_GUIDE.md) · 🇪🇸 [es](../../es/docs/USER_GUIDE.md) · 🇫🇷 [fr](../../fr/docs/USER_GUIDE.md) · 🇩🇪 [de](../../de/docs/USER_GUIDE.md) · 🇮🇹 [it](../../it/docs/USER_GUIDE.md) · 🇷🇺 [ru](../../ru/docs/USER_GUIDE.md) · 🇨🇳 [zh-CN](../../zh-CN/docs/USER_GUIDE.md) · 🇯🇵 [ja](../../ja/docs/USER_GUIDE.md) · 🇰🇷 [ko](../../ko/docs/USER_GUIDE.md) · 🇸🇦 [ar](../../ar/docs/USER_GUIDE.md) · 🇮🇳 [hi](../../hi/docs/USER_GUIDE.md) · 🇮🇳 [in](../../in/docs/USER_GUIDE.md) · 🇹🇭 [th](../../th/docs/USER_GUIDE.md) · 🇻🇳 [vi](../../vi/docs/USER_GUIDE.md) · 🇮🇩 [id](../../id/docs/USER_GUIDE.md) · 🇲🇾 [ms](../../ms/docs/USER_GUIDE.md) · 🇳🇱 [nl](../../nl/docs/USER_GUIDE.md) · 🇵🇱 [pl](../../pl/docs/USER_GUIDE.md) · 🇸🇪 [sv](../../sv/docs/USER_GUIDE.md) · 🇳🇴 [no](../../no/docs/USER_GUIDE.md) · 🇩🇰 [da](../../da/docs/USER_GUIDE.md) · 🇫🇮 [fi](../../fi/docs/USER_GUIDE.md) · 🇵🇹 [pt](../../pt/docs/USER_GUIDE.md) · 🇷🇴 [ro](../../ro/docs/USER_GUIDE.md) · 🇭🇺 [hu](../../hu/docs/USER_GUIDE.md) · 🇧🇬 [bg](../../bg/docs/USER_GUIDE.md) · 🇸🇰 [sk](../../sk/docs/USER_GUIDE.md) · 🇺🇦 [uk-UA](../../uk-UA/docs/USER_GUIDE.md) · 🇮🇱 [he](../../he/docs/USER_GUIDE.md) · 🇵🇭 [phi](../../phi/docs/USER_GUIDE.md) · 🇧🇷 [pt-BR](../../pt-BR/docs/USER_GUIDE.md) · 🇨🇿 [cs](../../cs/docs/USER_GUIDE.md) · 🇹🇷 [tr](../../tr/docs/USER_GUIDE.md)

---

Пълно ръководство за конфигуриране на доставчици, създаване на комбинации, интегриране на CLI инструменти и внедряване на OmniRoute.---

## Table of Contents

- [Ценообразуване с един поглед](#-pricing-at-a-glance)
- [Случаи на употреба](#-случаи на употреба)
- [Настройка на доставчик](#-provider-setup)
- [CLI интеграция](#-cli-интеграция)
- [Разгръщане](#-разгръщане)
- [Налични модели](#-налични-модели)
- [Разширени функции](#-advanced-features)---

## 💰 Pricing at a Glance

| Ниво               | Доставчик         | Цена                  | Нулиране на квота       | Най-добро за              |
| ------------------ | ----------------- | --------------------- | ----------------------- | ------------------------- |
| **💳 АБОНАМЕНТ**   | Claude Code (Pro) | $20/месец             | 5 часа + седмично       | Вече сте абонирани        |
|                    | Codex (Plus/Pro)  | $20-200/месец         | 5 часа + седмично       | Потребители на OpenAI     |
|                    | Gemini CLI        | **БЕЗПЛАТНО**         | 180K/месец + 1K/ден     | всички!                   |
|                    | Копилот на GitHub | $10-19/месец          | Месечно                 | Потребители на GitHub     |
| **🔑 КЛЮЧ ЗА API** | DeepSeek          | Плащане за използване | Няма                    | Евтини разсъждения        |
|                    | Groq              | Плащане за използване | Няма                    | Свръхбърз извод           |
|                    | xAI (Grok)        | Плащане за използване | Няма                    | Грок 4 разсъждения        |
|                    | Мистрал           | Плащане за използване | Няма                    | Хоствани в ЕС модели      |
|                    | Недоумение        | Плащане за използване | Няма                    | Разширено търсене         |
|                    | Заедно AI         | Плащане за използване | Няма                    | Модели с отворен код      |
|                    | Фойерверки AI     | Плащане за използване | Няма                    | Бързи FLUX изображения    |
|                    | Мозъци            | Плащане за използване | Няма                    | Скорост на вафла          |
|                    | Cohere            | Плащане за използване | Няма                    | Команда R+ RAG            |
|                    | NVIDIA NIM        | Плащане за използване | Няма                    | Корпоративни модели       |
| **💰 ЕВТИНО**      | GLM-4.7           | $0,6/1 милион         | Ежедневно 10 сутринта   | Резервно копие на бюджета |
|                    | MiniMax M2.1      | $0,2/1 милион         | 5-часово търкаляне      | Най-евтиният вариант      |
|                    | Кими К2           | $9/месец апартамент   | 10 милиона токена/месец | Предвидими разходи        |
| **🆓 БЕЗПЛАТНО**   | Qoder             | $0                    | Неограничен             | 8 модела безплатно        |
|                    | Куен              | $0                    | Неограничен             | 3 модела безплатно        |
|                    | Киро              | $0                    | Неограничен             | Клод безплатно            |

**💡 Професионален съвет:**Започнете с Gemini CLI (180K безплатно/месец) + Qoder (неограничено безплатно) комбо = $0 цена!---

## 🎯 Use Cases

### Case 1: "I have Claude Pro subscription"

**Проблем:**Квотата изтича неизползвана, ограничения на скоростта по време на тежко кодиране```
Combo: "maximize-claude"

1. cc/claude-opus-4-6 (use subscription fully)
2. glm/glm-4.7 (cheap backup when quota out)
3. if/kimi-k2-thinking (free emergency fallback)

Monthly cost: $20 (subscription) + ~$5 (backup) = $25 total
vs. $20 + hitting limits = frustration

````

### Case 2: "I want zero cost"

**Проблем:**Не мога да си позволя абонаменти, имам нужда от надеждно AI кодиране```
Combo: "free-forever"
  1. gc/gemini-3-flash         (180K free/month)
  2. if/kimi-k2-thinking       (unlimited free)
  3. qw/qwen3-coder-plus       (unlimited free)

Monthly cost: $0
Quality: Production-ready models
````

### Case 3: "I need 24/7 coding, no interruptions"

**Проблем:**Крайни срокове, не мога да си позволя престой```
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

**Проблем:**Имате нужда от AI асистент в приложенията за съобщения, напълно безплатно```
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

**Професионален съвет:**Използвайте Opus за сложни задачи, Sonnet за скорост. OmniRoute проследява квота за модел!#### OpenAI Codex (Plus/Pro)

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

**Най-добра стойност:**Огромно безплатно ниво! Използвайте това преди платените нива.#### GitHub Copilot

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

1. Регистрирайте се: [Zhipu AI](https://open.bigmodel.cn/)
2. Вземете API ключ от Coding Plan
3. Табло → Добавяне на API ключ: Доставчик: `glm`, API ключ: `вашият-ключ`

**Използване:**`glm/glm-4.7` —**Професионален съвет:**Планът за кодиране предлага 3× квота на цена 1/7! Нулирайте всеки ден в 10:00 ч.#### MiniMax M2.1 (5h reset, $0.20/1M)

1. Регистрирайте се: [MiniMax](https://www.minimax.io/)
2. Вземете API ключ → Табло → Добавете API ключ

**Използвайте:**`minimax/MiniMax-M2.1` —**Професионален съвет:**Най-евтината опция за дълъг контекст (1M токени)!#### Kimi K2 ($9/month flat)

1. Абонирайте се: [Moonshot AI](https://platform.moonshot.ai/)
2. Вземете API ключ → Табло → Добавете API ключ

**Използване:**`kimi/kimi-latest` —**Професионален съвет:**Фиксирани $9/месец за 10 милиона токена = $0,90/1 милион ефективна цена!### 🆓 FREE Providers

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

Редактирайте `~/.claude/config.json`:```json
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

Редактирайте `~/.openclaw/openclaw.json`:```json
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

**Или използвайте таблото за управление:**CLI инструменти → OpenClaw → Автоматично конфигуриране### Cline / Continue / RooCode

```

Provider: OpenAI Compatible
Base URL: http://localhost:20128/v1
API Key: [from dashboard]
Model: cc/claude-opus-4-6

````

---

## Разгръщане

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

CLI автоматично зарежда `.env` от `~/.omniroute/.env` или `./.env`.### VPS Deployment

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

За сървъри с ограничена RAM използвайте опцията за ограничаване на паметта:```bash

# With 512MB limit (default)

pm2 start npm --name omniroute -- start

# Or with custom memory limit

OMNIROUTE_MEMORY_MB=512 pm2 start npm --name omniroute -- start

# Or using ecosystem.config.js

pm2 start ecosystem.config.js

````

Създайте `ecosystem.config.js`:```javascript
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

За интегриран в хост режим с двоични файлове на CLI вижте раздела Docker в основните документи.### Void Linux (xbps-src)

Потребителите на Void Linux могат да пакетират и инсталират OmniRoute естествено, като използват рамката за кръстосано компилиране `xbps-src`. Това автоматизира самостоятелната компилация на Node.js заедно с необходимите нативни свързвания `better-sqlite3`.

<подробности>

<summary><b>Преглед на шаблона xbps-src</b></summary>```bash
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

| Променлива | По подразбиране | Описание |
| ----------------------------------------------- | ------------------------------------ | --------------------------------------------------------------------------------------------------------- |
| `JWT_SECRET` | `omniroute-default-secret-change-me` | Тайна за подписване на JWT (**промяна в производството**) |
| `ПЪРВОНАЧАЛНА_ПАРОЛА` | „123456“ | Първа парола за влизане |
| `DATA_DIR` | `~/.omniroute` | Директория с данни (db, използване, регистрационни файлове) |
| `ПОРТ` | рамка по подразбиране | Сервизен порт („20128“ в примерите) |
| `ИМЕ НА ХОСТА` | рамка по подразбиране | Свързване на хост (Docker по подразбиране е `0.0.0.0`) |
| `NODE_ENV` | по подразбиране по време на изпълнение | Задайте `production` за внедряване |
| `ОСНОВЕН_URL` | `http://localhost:20128` | Вътрешен основен URL адрес от страната на сървъра |
| `CLOUD_URL` | `https://omniroute.dev` | Основен URL адрес на крайна точка за синхронизиране в облак |
| `API_KEY_SECRET` | `endpoint-proxy-api-key-secret` | HMAC тайна за генерирани API ключове |
| `REQUIRE_API_KEY` | `false` | Налагане на API ключ на носител на `/v1/*` |
| `ALLOW_API_KEY_REVEAL` | `false` | Разрешаване на Api Manager да копира пълни API ключове при поискване |
| `PROVIDER_LIMITS_SYNC_INTERVAL_MINUTES` | `70` | Честота на опресняване от страна на сървъра за кеширани данни за ограниченията на доставчика; Бутоните за опресняване на потребителския интерфейс все още задействат ръчно синхронизиране |
| `DISABLE_SQLITE_AUTO_BACKUP` | `false` | Деактивирайте автоматичните моментни снимки на SQLite преди запис/импорт/възстановяване; ръчните архиви все още работят |
| `APP_LOG_TO_FILE`                       | `true`                               | Enables application and audit log output to disk                                                          |
| `AUTH_COOKIE_SECURE` | `false` | Принудително `Secure` бисквитка за удостоверяване (зад HTTPS обратен прокси) |
| `CLOUDFLARED_BIN` | деактивирано | Използвайте съществуващ двоичен файл `cloudflared` вместо управлявано изтегляне |
| `CLOUDFLARED_PROTOCOL` | `http2` | Транспорт за управлявани бързи тунели (`http2`, `quic` или `auto`) |
| `OMNIROUTE_MEMORY_MB` | „512“ | Ограничение на купчината на Node.js в MB |
| `PROMPT_CACHE_MAX_SIZE` | `50` | Максимални записи в кеша за подкани |
| `SEMANTIC_CACHE_MAX_SIZE` | „100“ | Максимални семантични записи в кеша |За пълната справка за променливите на средата вижте [README](../README.md).---

## 📊 Available Models

<подробности>
<summary><b>Вижте всички налични модели</b></summary>

**Claude Code (`cc/`)**— Pro/Max: `cc/claude-opus-4-6`, `cc/claude-sonnet-4-5-20250929`, `cc/claude-haiku-4-5-20251001`

**Codex (`cx/`)**— Plus/Pro: `cx/gpt-5.2-codex`, `cx/gpt-5.1-codex-max`

**Gemini CLI (`gc/`)**— БЕЗПЛАТНО: `gc/gemini-3-flash-preview`, `gc/gemini-2.5-pro`

**GitHub Copilot (`gh/`)**: `gh/gpt-5`, `gh/claude-4.5-sonnet`

**GLM (`glm/`)**— $0,6/1M: `glm/glm-4,7`

**MiniMax (`minimax/`)**— $0,2/1M: `minimax/MiniMax-M2.1`

**Qoder (`if/`)**— БЕЗПЛАТНО: `if/kimi-k2-thinking`, `if/qwen3-coder-plus`, `if/deepseek-r1`

**Qwen (`qw/`)**— БЕЗПЛАТНО: `qw/qwen3-coder-plus`, `qw/qwen3-coder-flash`

**Kiro (`kr/`)**— БЕЗПЛАТНО: `kr/claude-sonnet-4.5`, `kr/claude-haiku-4.5`

**DeepSeek (`ds/`)**: `ds/deepseek-chat`, `ds/deepseek-reasoner`

**Groq (`groq/`)**: `groq/llama-3.3-70b-versatile`, `groq/llama-4-maverick-17b-128e-instruct`

**xAI (`xai/`)**: `xai/grok-4`, `xai/grok-4-0709-fast-reasoning`, `xai/grok-code-mini`

**Мистрал (`mistral/`)**: `mistral/mistral-large-2501`, `mistral/codestral-2501`

**Обърканост (`pplx/`)**: `pplx/sonar-pro`, `pplx/sonar`

**Together AI (`together/`)**: `together/meta-llama/Llama-3.3-70B-Instruct-Turbo`

**Fireworks AI (`fireworks/`)**: `fireworks/accounts/fireworks/models/deepseek-v3p1`

**Cerebras (`cerebras/`)**: `cerebras/llama-3.3-70b`

**Cohere (`cohere/`)**: `cohere/command-r-plus-08-2024`

**NVIDIA NIM (`nvidia/`)**: `nvidia/nvidia/llama-3.3-70b-instruct`</details>

---

## 🧩 Advanced Features

### Custom Models

Добавете всеки ID на модел към всеки доставчик, без да чакате актуализация на приложението:```bash
# Via API
curl -X POST http://localhost:20128/api/provider-models \
  -H "Content-Type: application/json" \
  -d '{"provider": "openai", "modelId": "gpt-4.5-preview", "modelName": "GPT-4.5 Preview"}'

# List: curl http://localhost:20128/api/provider-models?provider=openai
# Remove: curl -X DELETE "http://localhost:20128/api/provider-models?provider=openai&model=gpt-4.5-preview"
````

Или използвайте таблото за управление:**Доставчици → [Доставчик] → Персонализирани модели**.

Бележки:

- OpenRouter и OpenAI/Anthropic-съвместими доставчици се управляват само от**Налични модели**. Ръчното добавяне, импортиране и автоматично синхронизиране се намира в един и същ списък с налични модели, така че няма отделен раздел за персонализирани модели за тези доставчици.
- Секцията**Персонализирани модели**е предназначена за доставчици, които не излагат импортиране на управлявани налични модели.### Dedicated Provider Routes

Насочвайте заявките директно към конкретен доставчик с валидиране на модела:```bash
POST http://localhost:20128/v1/providers/openai/chat/completions
POST http://localhost:20128/v1/providers/openai/embeddings
POST http://localhost:20128/v1/providers/fireworks/images/generations

````

Префиксът на доставчика се добавя автоматично, ако липсва. Несъответстващите модели връщат „400“.### Network Proxy Configuration

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

**Приоритет:**Специфичен за ключ → Специфичен за комбинация → Специфичен за доставчик → Глобален → Среда.### Model Catalog API

```bash
curl http://localhost:20128/api/models/catalog
```

Връща модели, групирани по доставчик с типове („чат“, „вграждане“, „изображение“).### Cloud Sync

- Синхронизиране на доставчици, комбинации и настройки на всички устройства
- Автоматична фонова синхронизация с изчакване + бързо отказване
- Предпочитайте `BASE_URL`/`CLOUD_URL` от страна на сървъра в производството### Cloudflare Quick Tunnel

- Предлага се в**Табло за управление → Крайни точки**за Docker и други самостоятелно хоствани внедрявания
- Създава временен URL адрес `https://*.trycloudflare.com`, който препраща към текущата ви крайна точка `/v1`, съвместима с OpenAI
- Първо активиране инсталира `cloudflared` само когато е необходимо; по-късно рестартира повторно използване на същия управляван двоичен файл
- Бързите тунели не се възстановяват автоматично след рестартиране на OmniRoute или контейнер; активирайте ги отново от таблото за управление, когато е необходимо
- URL адресите на тунелите са ефимерни и се променят всеки път, когато спрете/пуснете тунела
- Управляваните бързи тунели по подразбиране са HTTP/2 транспорт, за да се избегнат шумни QUIC UDP буферни предупреждения в ограничени контейнери
- Задайте `CLOUDFLARED_PROTOCOL=quic` или `auto`, ако искате да отмените избора на управляван транспорт
- Задайте `CLOUDFLARED_BIN`, ако предпочитате да използвате предварително инсталиран двоичен файл `cloudflared` вместо управлявано изтегляне### LLM Gateway Intelligence (Phase 9)

-**Семантичен кеш**— Автоматично кешира не-стрийминг, температура=0 отговори (заобикаляне с `X-OmniRoute-No-Cache: true`) -**Request Idempotency**— Дедупликира заявките в рамките на 5s чрез `Idempotency-Key` или `X-Request-Id` хедър -**Проследяване на напредъка**— Включване на SSE `event: progress` събития чрез `X-OmniRoute-Progress: true` хедър---

### Translator Playground

Достъп чрез**Табло → Преводач**. Отстранете грешки и визуализирайте как OmniRoute превежда API заявки между доставчици.

| Режим               | Цел                                                                                                  |
| ------------------- | ---------------------------------------------------------------------------------------------------- |
| **Детска площадка** | Изберете изходни/целеви формати, поставете заявка и незабавно вижте преведения резултат              |
| **Чат тестер**      | Изпращайте чат съобщения на живо през проксито и проверявайте пълния цикъл на заявка/отговор         |
| **Тестова стенда**  | Изпълнете групови тестове в множество комбинации от формати, за да проверите правилността на превода |
| **Монитор на живо** | Гледайте преводи в реално време, докато заявките преминават през проксито                            |

**Случаи на употреба:**

- Отстраняване на грешки защо конкретна комбинация клиент/доставчик е неуспешна
- Проверете дали мислещите тагове, извикванията на инструменти и системните подкани се превеждат правилно
- Сравнете разликите във форматите между форматите OpenAI, Claude, Gemini и Responses API---

### Routing Strategies

Конфигурирайте чрез**Табло → Настройки → Маршрутизация**.

| Стратегия                    | Описание                                                                                                       |
| ---------------------------- | -------------------------------------------------------------------------------------------------------------- | ----------------------------------- |
| **Първо попълване**          | Използва акаунти в приоритетен ред — основният акаунт обработва всички заявки, докато стане недостъпен         |
| **Round Robin**              | Преминава през всички акаунти с конфигурируем лепкав лимит (по подразбиране: 3 обаждания на акаунт)            |
| **P2C (Сила на два избора)** | Избира 2 произволни акаунта и маршрути към по-здравословния — балансира натоварването с осъзнаване на здравето |
| **Произволно**               | Произволно избира акаунт за всяка заявка чрез разбъркване на Fisher-Yates                                      |
| **Най-малко използвани**     | Маршрути към акаунта с най-стария времеви печат `lastUsedAt`, разпределящ трафика равномерно                   |
| **Оптимизирани разходи**     | Маршрути към акаунта с най-ниска стойност на приоритет, оптимизиране за доставчици с най-ниска цена            | #### External Sticky Session Header |

За афинитет към външна сесия (например агенти на Claude Code/Codex зад обратни прокси сървъри), изпратете:```http
X-Session-Id: your-session-key

````

OmniRoute също приема `x_session_id` и връща ефективния сесиен ключ в `X-OmniRoute-Session-Id`.

Ако използвате Nginx и изпращате заглавки на формуляр с долна черта, активирайте:```nginx
underscores_in_headers on;
````

#### Wildcard Model Aliases

Създайте шаблони със заместващи знаци, за да пренасочите имената на моделите:```
Pattern: claude-sonnet-_ → Target: cc/claude-sonnet-4-5-20250929
Pattern: gpt-_ → Target: gh/gpt-5.1-codex

````

Заместващите символи поддържат `*` (всякакви знаци) и `?` (единичен знак).#### Fallback Chains

Дефинирайте глобални резервни вериги, които се прилагат за всички заявки:```
Chain: production-fallback
  1. cc/claude-opus-4-6
  2. gh/gpt-5.1-codex
  3. glm/glm-4.7
````

---

### Resilience & Circuit Breakers

Конфигурирайте чрез**Табло → Настройки → Устойчивост**.

OmniRoute прилага устойчивост на ниво доставчик с четири компонента:

1.**Профили на доставчици**— Конфигурация за всеки доставчик за:

- Праг на повреда (колко повреда преди отваряне)
- Продължителност на изчакване
- Чувствителност на откриване на ограничение на скоростта
- Параметри на експоненциално отстъпление

  2.**Редактируеми ограничения на скоростта**— Настройки по подразбиране на системно ниво, които могат да се конфигурират в таблото за управление: -**Заявки в минута (RPM)**— Максимален брой заявки в минута за акаунт -**Минимално време между заявките**— Минимална разлика в милисекунди между заявките -**Максимални едновременни заявки**— Максимални едновременни заявки за акаунт

- Щракнете върху**Редактиране**, за да промените, след това върху**Запазване**или**Отказ**. Стойностите се запазват чрез API за устойчивост.

  3.**Прекъсвач на веригата**— Проследява повреди на доставчик и автоматично отваря веригата при достигане на праг: -**ЗАТВОРЕНО**(здравословно) — Заявките протичат нормално -**OPEN**— Доставчикът е временно блокиран след повтарящи се повреди -**HALF_OPEN**— Тестване дали доставчикът се е възстановил

  4.**Правила и заключени идентификатори**— Показва състоянието на прекъсвача и заключените идентификатори с възможност за принудително отключване.

  5.**Автоматично откриване на лимита на скоростта**— Наблюдава заглавките `429` и `Retry-After`, за да избегне проактивно достигане на лимитите на скоростта на доставчика.

**Професионален съвет:**Използвайте бутона**Нулиране на всички**, за да изчистите всички прекъсвачи и изчаквания, когато доставчикът се възстанови от прекъсване.---

### Database Export / Import

Управлявайте резервни копия на бази данни в**Табло → Настройки → Система и съхранение**.

| Действие                             | Описание                                                                                                                                                        |
| ------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------- |
| **Експортиране на база данни**       | Изтегля текущата база данни SQLite като `.sqlite` файл                                                                                                          |
| **Експортиране на всички (.tar.gz)** | Изтегля пълен резервен архив, включително: база данни, настройки, комбинации, връзки с доставчик (без идентификационни данни), API ключ метаданни               |
| **Импортиране на база данни**        | Качете файл `.sqlite`, за да замените текущата база данни. Резервно копие преди импортиране се създава автоматично, освен ако `DISABLE_SQLITE_AUTO_BACKUP=true` | ```bash |

# API: Export database

curl -o backup.sqlite http://localhost:20128/api/db-backups/export

# API: Export all (full archive)

curl -o backup.tar.gz http://localhost:20128/api/db-backups/exportAll

# API: Import database

curl -X POST http://localhost:20128/api/db-backups/import \
 -F "file=@backup.sqlite"

````

**Проверка на импортиране:**Импортираният файл се валидира за целостта (проверка на SQLite pragma), необходимите таблици (`provider_connections`, `provider_nodes`, `combos`, `api_keys`) и размер (макс. 100MB).

**Случаи на употреба:**

- Мигрирайте OmniRoute между машини
- Създаване на външни резервни копия за възстановяване след бедствие
- Споделяне на конфигурации между членовете на екипа (експортиране на всички → споделяне на архив)---

### Settings Dashboard

Страницата с настройки е организирана в 6 раздела за лесна навигация:

| Раздел | Съдържание |
| -------------- | ---------------------------------------------------------------------------------------------- |
|**Общи**| Системни инструменти за съхранение, настройки за външен вид, контроли на теми и видимост на страничната лента |
|**Сигурност**| Настройки за вход/парола, IP контрол на достъпа, API удостоверяване за `/models` и блокиране на доставчик |
|**Маршрутизиране**| Стратегия за глобално маршрутизиране (6 опции), псевдоними на модели със заместващи символи, резервни вериги, комбинирани настройки по подразбиране |
|**Устойчивост**| Профили на доставчици, редактируеми лимити на скоростта, състояние на прекъсвача, политики и заключени идентификатори |
|**AI**| Обмисляне на конфигурация на бюджета, инжектиране на глобална система, статистика на бързия кеш |
|**Разширено**| Глобална прокси конфигурация (HTTP/SOCKS5) |---

### Costs & Budget Management

Достъп чрез**Табло → Разходи**.

| Раздел | Цел |
| ----------- | ---------------------------------------------------------------------------------------- |
|**Бюджет**| Задайте лимити на разходите за API ключ с дневни/седмични/месечни бюджети и проследяване в реално време |
|**Цени**| Преглеждайте и редактирайте записи за ценообразуване на модела — цена за 1K входно/изходни токени на доставчик |```bash
# API: Set a budget
curl -X POST http://localhost:20128/api/usage/budget \
  -H "Content-Type: application/json" \
  -d '{"keyId": "key-123", "limit": 50.00, "period": "monthly"}'

# API: Get current budget status
curl http://localhost:20128/api/usage/budget
````

**Проследяване на разходите:**Всяка заявка регистрира използването на токени и изчислява разходите с помощта на ценовата таблица. Вижте разбивки в**Табло за управление → Използване**по доставчик, модел и API ключ.---

### Audio Transcription

OmniRoute поддържа аудио транскрипция чрез OpenAI-съвместима крайна точка:```bash
POST /v1/audio/transcriptions
Authorization: Bearer your-api-key
Content-Type: multipart/form-data

# Example with curl

curl -X POST http://localhost:20128/v1/audio/transcriptions \
 -H "Authorization: Bearer your-api-key" \
 -F "file=@audio.mp3" \
 -F "model=deepgram/nova-3"

````

Налични доставчици:**Deepgram**(`deepgram/`),**AssemblyAI**(`assemblyai/`).

Поддържани аудио формати: `mp3`, `wav`, `m4a`, `flac`, `ogg`, `webm`.---

### Combo Balancing Strategies

Конфигурирайте балансирането за комбо в**Табло за управление → Комбота → Създаване/Редактиране → Стратегия**.

| Стратегия | Описание |
| ------------------ | ------------------------------------------------------------------------ |
|**Round-Robin**| Върти се през моделите последователно |
|**Приоритет**| Винаги пробва първия модел; връща се само при грешка |
|**Произволно**| Избира произволен модел от комбинацията за всяка заявка |
|**Претеглено**| Маршрути пропорционално въз основа на зададени тегла за модел |
|**Най-малко използвани**| Насочва към модела с най-малко скорошни заявки (използва комбинирани показатели) |
|**Оптимизиран за разходите**| Маршрути до най-евтиния наличен модел (използва ценова таблица) |

Глобалните настройки по подразбиране на комбинацията могат да бъдат зададени в**Табло → Настройки → Маршрут → Настройки по подразбиране на комбинация**.---

### Health Dashboard

Достъп чрез**Табло → Здраве**. Преглед на здравето на системата в реално време с 6 карти:

| Карта | Какво показва |
| --------------------- | ------------------------------------------------------------ |
|**Състояние на системата**| Време на работа, версия, използване на паметта, директория с данни |
|**Здраве на доставчика**| Състояние на прекъсвача за всеки доставчик (затворен/отворен/полуотворен) |
|**Ограничения на скоростта**| Активен лимит на изчакване за акаунт с оставащо време |
|**Активни блокировки**| Доставчици, временно блокирани от политиката за блокиране |
|**Кеш на подписа**| Статистика на кеша за дедупликация (активни ключове, процент на попадения) |
|**Телеметрия за забавяне**| p50/p95/p99 агрегиране на латентност за доставчик |

**Професионален съвет:**Страницата Health се опреснява автоматично на всеки 10 секунди. Използвайте картата на прекъсвача, за да идентифицирате кои доставчици имат проблеми.---

## 🖥️ Desktop Application (Electron)

OmniRoute се предлага като родно настолно приложение за Windows, macOS и Linux.### Инсталиране

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

Изход → `electron/dist-electron/`### Key Features

| Характеристика                           | Описание                                                            |
| ---------------------------------------- | ------------------------------------------------------------------- | ------------------------- |
| **Готовност на сървъра**                 | Анкета на сървъра преди показване на прозорец (без празен екран)    |
| **Системна област**                      | Минимизиране в трея, промяна на порта, изход от менюто на трея      |
| **Управление на портове**                | Промяна на сървърния порт от трея (автоматично рестартира сървъра)  |
| **Правила за сигурност на съдържанието** | Ограничителен CSP чрез заглавки на сесии                            |
| **Единичен екземпляр**                   | Само един екземпляр на приложение може да се изпълнява едновременно |
| **Офлайн режим**                         | Пакетът Next.js сървър работи без интернет                          | ### Environment Variables |

| Променлива            | По подразбиране | Описание                                          |
| --------------------- | --------------- | ------------------------------------------------- |
| `OMNIROUTE_PORT`      | `20128`         | Порт на сървъра                                   |
| `OMNIROUTE_MEMORY_MB` | „512“           | Ограничение на купчината на Node.js (64–16384 MB) |

📖 Пълна документация: [`electron/README.md`](../electron/README.md)
