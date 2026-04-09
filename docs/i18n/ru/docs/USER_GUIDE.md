# User Guide (Русский)

🌐 **Languages:** 🇺🇸 [English](../../../../docs/USER_GUIDE.md) · 🇪🇸 [es](../../es/docs/USER_GUIDE.md) · 🇫🇷 [fr](../../fr/docs/USER_GUIDE.md) · 🇩🇪 [de](../../de/docs/USER_GUIDE.md) · 🇮🇹 [it](../../it/docs/USER_GUIDE.md) · 🇷🇺 [ru](../../ru/docs/USER_GUIDE.md) · 🇨🇳 [zh-CN](../../zh-CN/docs/USER_GUIDE.md) · 🇯🇵 [ja](../../ja/docs/USER_GUIDE.md) · 🇰🇷 [ko](../../ko/docs/USER_GUIDE.md) · 🇸🇦 [ar](../../ar/docs/USER_GUIDE.md) · 🇮🇳 [hi](../../hi/docs/USER_GUIDE.md) · 🇮🇳 [in](../../in/docs/USER_GUIDE.md) · 🇹🇭 [th](../../th/docs/USER_GUIDE.md) · 🇻🇳 [vi](../../vi/docs/USER_GUIDE.md) · 🇮🇩 [id](../../id/docs/USER_GUIDE.md) · 🇲🇾 [ms](../../ms/docs/USER_GUIDE.md) · 🇳🇱 [nl](../../nl/docs/USER_GUIDE.md) · 🇵🇱 [pl](../../pl/docs/USER_GUIDE.md) · 🇸🇪 [sv](../../sv/docs/USER_GUIDE.md) · 🇳🇴 [no](../../no/docs/USER_GUIDE.md) · 🇩🇰 [da](../../da/docs/USER_GUIDE.md) · 🇫🇮 [fi](../../fi/docs/USER_GUIDE.md) · 🇵🇹 [pt](../../pt/docs/USER_GUIDE.md) · 🇷🇴 [ro](../../ro/docs/USER_GUIDE.md) · 🇭🇺 [hu](../../hu/docs/USER_GUIDE.md) · 🇧🇬 [bg](../../bg/docs/USER_GUIDE.md) · 🇸🇰 [sk](../../sk/docs/USER_GUIDE.md) · 🇺🇦 [uk-UA](../../uk-UA/docs/USER_GUIDE.md) · 🇮🇱 [he](../../he/docs/USER_GUIDE.md) · 🇵🇭 [phi](../../phi/docs/USER_GUIDE.md) · 🇧🇷 [pt-BR](../../pt-BR/docs/USER_GUIDE.md) · 🇨🇿 [cs](../../cs/docs/USER_GUIDE.md) · 🇹🇷 [tr](../../tr/docs/USER_GUIDE.md)

---

Полное руководство по настройке поставщиков, созданию комбинаций, интеграции инструментов CLI и развертыванию OmniRoute.---

## Table of Contents

- [Краткий обзор цен](#-цены-краткий обзор)
- [Случаи использования](#-сценариев использования)
- [Настройка поставщика](#-provider-setup)
- [Интеграция CLI](#-cli-интеграция)
- [Развертывание](#-развертывание)
- [Доступные модели](#-доступных-моделей)
- [Расширенные функции](#-расширенные-функции)---

## 💰 Pricing at a Glance

| Уровень          | Провайдер           | Стоимость                      | Сброс квоты                  | Лучшее для                       |
| ---------------- | ------------------- | ------------------------------ | ---------------------------- | -------------------------------- |
| **💳 ПОДПИСКА**  | Клод Код (Про)      | 20 долларов США в месяц        | 5 часов + еженедельно        | Уже подписан                     |
|                  | Кодекс (Плюс/Про)   | 20–200 долларов в месяц        | 5 часов + еженедельно        | Пользователи OpenAI              |
|                  | Близнецы CLI        | **БЕСПЛАТНО**                  | 180 тыс./мес + 1 тыс./день   | Каждый!                          |
|                  | Второй пилот GitHub | 10–19 долларов в месяц         | Ежемесячно                   | Пользователи GitHub              |
| **🔑 КЛЮЧ API**  | ДипСик              | Плата за использование         | Нет                          | Дешевое рассуждение              |
|                  | Грок                | Плата за использование         | Нет                          | Сверхбыстрый вывод               |
|                  | xAI (Грок)          | Плата за использование         | Нет                          | рассуждения Грока 4              |
|                  | Мистраль            | Плата за использование         | Нет                          | Модели, размещенные в ЕС         |
|                  | Растерянность       | Плата за использование         | Нет                          | Расширенный поиск                |
|                  | Вместе ИИ           | Плата за использование         | Нет                          | Модели с открытым исходным кодом |
|                  | Фейерверк ИИ        | Плата за использование         | Нет                          | Изображения Fast FLUX            |
|                  | Церебра             | Плата за использование         | Нет                          | Скорость пластинчатого масштаба  |
|                  | Согласовано         | Плата за использование         | Нет                          | Команда R+ ТРЯПКА                |
|                  | NVIDIA НИМ          | Плата за использование         | Нет                          | Модели предприятия               |
| **💰 ДЕШЕВО**    | ГЛМ-4.7             | 0,6 долл. США/1 млн            | Ежедневно в 10:00            | Резервное копирование бюджета    |
|                  | МиниМакс М2.1       | 0,2 долл. США/1 млн            | 5-часовой прокат             | Самый дешевый вариант            |
|                  | Кими К2             | 9 долларов в месяц за квартиру | 10 миллионов токенов в месяц | Предсказуемая стоимость          |
| **🆓 БЕСПЛАТНО** | Кодер               | $0                             | Неограниченный               | 8 моделей бесплатно              |
|                  | Квен                | $0                             | Неограниченный               | 3 модели бесплатно               |
|                  | Киро                | $0                             | Неограниченный               | Клод бесплатно                   |

**💡Совет для профессионалов:**Начните с комбинации Gemini CLI (180 000 бесплатно в месяц) + Qoder (бесплатно без ограничений) = стоимость 0 долларов США!---

## 🎯 Use Cases

### Case 1: "I have Claude Pro subscription"

**Проблема:**Срок действия квоты истекает, а скорость ограничена во время интенсивного кодирования.```
Combo: "maximize-claude"

1. cc/claude-opus-4-6 (use subscription fully)
2. glm/glm-4.7 (cheap backup when quota out)
3. if/kimi-k2-thinking (free emergency fallback)

Monthly cost: $20 (subscription) + ~$5 (backup) = $25 total
vs. $20 + hitting limits = frustration

````

### Case 2: "I want zero cost"

**Проблема:**Не могу позволить себе подписку, нужно надежное кодирование с использованием искусственного интеллекта.```
Combo: "free-forever"
  1. gc/gemini-3-flash         (180K free/month)
  2. if/kimi-k2-thinking       (unlimited free)
  3. qw/qwen3-coder-plus       (unlimited free)

Monthly cost: $0
Quality: Production-ready models
````

### Case 3: "I need 24/7 coding, no interruptions"

**Проблема:**сроки, невозможность простоя```
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

**Проблема:**Нужен ИИ-помощник в приложениях для обмена сообщениями, совершенно бесплатно.```
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

**Совет для профессионалов.**Используйте Opus для сложных задач и Sonnet для скорости. OmniRoute отслеживает квоту на каждую модель!#### OpenAI Codex (Plus/Pro)

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

**Лучшая цена:**Огромный уровень бесплатного пользования! Используйте это перед платными уровнями.#### GitHub Copilot

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

1. Зарегистрируйтесь: [Zhipu AI](https://open.bigmodel.cn/)
2. Получите ключ API из плана кодирования.
3. Панель управления → Добавить ключ API: Поставщик: `glm`, Ключ API: `ваш-ключ`

**Используйте:**`glm/glm-4.7` —**Совет для профессионалов:**План кодирования предлагает 3-кратную квоту за 1/7 стоимости! Сброс ежедневно в 10:00.#### MiniMax M2.1 (5h reset, $0.20/1M)

1. Зарегистрируйтесь: [MiniMax](https://www.minimax.io/)
2. Получите ключ API → Панель управления → Добавить ключ API.

**Используйте:**`minimax/MiniMax-M2.1` —**Совет для профессионалов:**Самый дешевый вариант для длинного контекста (1 млн токенов)!#### Kimi K2 ($9/month flat)

1. Подпишитесь: [Moonshot AI](https://platform.moonshot.ai/)
2. Получите ключ API → Панель управления → Добавить ключ API.

**Используйте:**`kimi/kimi-latest` —**Совет для профессионалов:**Фиксированная 9 долларов США в месяц за 10 миллионов токенов = эффективная стоимость 0,90 долларов США/1 миллион долларов США!### 🆓 FREE Providers

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

Отредактируйте `~/.claude/config.json`:```json
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

Отредактируйте `~/.openclaw/openclaw.json`:```json
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

**Или используйте панель инструментов:**Инструменты CLI → OpenClaw → Автонастройка.### Cline / Continue / RooCode

```

Provider: OpenAI Compatible
Base URL: http://localhost:20128/v1
API Key: [from dashboard]
Model: cc/claude-opus-4-6

````

---

## Развёртывание

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

CLI автоматически загружает .env из ~/.omniroute/.env или ./.env.### VPS Deployment

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

Для серверов с ограниченным объемом оперативной памяти используйте опцию ограничения памяти:```bash

# With 512MB limit (default)

pm2 start npm --name omniroute -- start

# Or with custom memory limit

OMNIROUTE_MEMORY_MB=512 pm2 start npm --name omniroute -- start

# Or using ecosystem.config.js

pm2 start ecosystem.config.js

````

Создайте `ecosystem.config.js`:```javascript
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

Для режима интеграции с хостом с двоичными файлами CLI см. раздел Docker в основной документации.### Void Linux (xbps-src)

Пользователи Void Linux могут упаковать и установить OmniRoute, используя среду кросс-компиляции xbps-src. Это автоматизирует автономную сборку Node.js вместе с необходимыми собственными привязками Better-sqlite3.

<подробности>

<summary><b>Просмотр шаблона xbps-src</b></summary>```bash
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

| Переменная | По умолчанию | Описание |
| --------------------------------------- | ------------------------------------ | --------------------------------------------------------------------------------------------------------- |
| `JWT_SECRET` | `omniroute-default-secret-change-me` | Секрет подписания JWT (**изменение в производстве**) |
| `INITIAL_PASSWORD` | `123456` | Первый пароль для входа |
| `DATA_DIR` | `~/.omniroute` | Каталог данных (база данных, использование, журналы) |
| `ПОРТ` | структура по умолчанию | Сервисный порт (в примерах «20128») |
| `ИМЯ ХОСТА` | структура по умолчанию | Привязать хост (по умолчанию в Docker установлено значение «0.0.0.0») |
| `NODE_ENV` | по умолчанию во время выполнения | Установить `производство` для развертывания |
| `BASE_URL` | `http://localhost:20128` | Внутренний базовый URL-адрес на стороне сервера |
| `CLOUD_URL` | `https://omniroute.dev` | Базовый URL-адрес конечной точки облачной синхронизации |
| `API_KEY_SECRET` | `конечная точка-прокси-api-ключ-секрет` | Секрет HMAC для сгенерированных ключей API |
| `REQUIRE_API_KEY` | `ложь` | Принудительно использовать ключ API носителя для `/v1/*` |
| `ALLOW_API_KEY_REVEAL` | `ложь` | Разрешить Api Manager копировать полные ключи API по требованию |
| `PROVIDER_LIMITS_SYNC_INTERVAL_MINUTES` | `70` | Частота обновления на стороне сервера кэшированных данных о лимитах поставщика; Кнопки обновления пользовательского интерфейса по-прежнему запускают ручную синхронизацию |
| `DISABLE_SQLITE_AUTO_BACKUP` | `ложь` | Отключить автоматическое создание снимков SQLite перед записью/импортом/восстановлением; резервное копирование вручную все еще работает |
| `APP_LOG_TO_FILE`                       | `true`                               | Enables application and audit log output to disk                                                          |
| `AUTH_COOKIE_SECURE` | `ложь` | Принудительно использовать файл cookie аутентификации `Secure` (за обратным прокси-сервером HTTPS) |
| `CLOUDFLARED_BIN` | не установлен | Использовать существующий двоичный файл «cloudflared» вместо управляемой загрузки |
| `CLOUDFLARED_PROTOCOL` | `http2` | Транспорт для управляемых быстрых туннелей (http2, quic или auto) |
| `OMNIROUTE_MEMORY_MB` | `512` | Ограничение кучи Node.js в МБ |
| `PROMPT_CACHE_MAX_SIZE` | `50` | Максимальное количество записей в кэше подсказок |
| `SEMANTIC_CACHE_MAX_SIZE` | `100` | Максимальное количество записей семантического кэша |Полную ссылку на переменную среды см. в [README](../README.md).---

## 📊 Available Models

<подробности>
<summary><b>Просмотреть все доступные модели</b></summary>

**Код Клода (`cc/`)**— Pro/Max: `cc/claude-opus-4-6`, `cc/claude-sonnet-4-5-20250929`, `cc/claude-haiku-4-5-20251001`

**Кодекс (`cx/`)**— Plus/Pro: `cx/gpt-5.2-codex`, `cx/gpt-5.1-codex-max`

**Gemini CLI (`gc/`)**— БЕСПЛАТНО: `gc/gemini-3-flash-preview`, `gc/gemini-2.5-pro`

**GitHub Copilot (`gh/`)**: `gh/gpt-5`, `gh/claude-4.5-sonnet`

**GLM (`glm/`)**— 0,6 долл. США/1 миллион: `glm/glm-4.7`

**MiniMax (`minimax/`)**— 0,2 долл. США/1 миллион: `minimax/MiniMax-M2.1`

**Qoder (`if/`)**— БЕСПЛАТНО: `if/kimi-k2-thinking`, `if/qwen3-coder-plus`, `if/deepseek-r1`

**Qwen (`qw/`)**— БЕСПЛАТНО: `qw/qwen3-coder-plus`, `qw/qwen3-coder-flash`

**Киро (`kr/`)**— БЕСПЛАТНО: `kr/claude-sonnet-4.5`, `kr/claude-haiku-4.5`

**DeepSeek (`ds/`)**: `ds/deepseek-chat`, `ds/deepseek-reasoner`

**Грок (`groq/`)**: `groq/llama-3.3-70b-versatile`, `groq/llama-4-maverick-17b-128e-instruct`

**xAI (`xai/`)**: `xai/grok-4`, `xai/grok-4-0709-fast-reasoning`, `xai/grok-code-mini`

**Мистраль (`mistral/`)**: `mistral/mistral-large-2501`, `mistral/codestral-2501`

**Недоумение (`pplx/`)**: `pplx/sonar-pro`, `pplx/sonar`

**Вместе AI (`вместе/`)**: `вместе/мета-лама/Ллама-3.3-70B-Instruct-Turbo`

**ИИ фейерверков (`fireworks/`)**: `fireworks/accounts/fireworks/models/deepseek-v3p1`

**Церебрас (`cerebras/`)**: `cerebras/llama-3.3-70b`

**Cohere (`cohere/`)**: `cohere/command-r-plus-08-2024`

**NVIDIA NIM (`nvidia/`)**: `nvidia/nvidia/llama-3.3-70b-instruct`</details>

---

## 🧩 Advanced Features

### Custom Models

Добавьте любой идентификатор модели к любому поставщику, не дожидаясь обновления приложения:```bash
# Via API
curl -X POST http://localhost:20128/api/provider-models \
  -H "Content-Type: application/json" \
  -d '{"provider": "openai", "modelId": "gpt-4.5-preview", "modelName": "GPT-4.5 Preview"}'

# List: curl http://localhost:20128/api/provider-models?provider=openai
# Remove: curl -X DELETE "http://localhost:20128/api/provider-models?provider=openai&model=gpt-4.5-preview"
````

Или используйте панель управления:**Поставщики → [Поставщик] → Пользовательские модели**.

Примечания:

- Поставщики OpenRouter и OpenAI/Anthropic-совместимые управляются только из**Доступных моделей**. Добавление, импорт и автоматическая синхронизация вручную попадают в один и тот же список доступных моделей, поэтому для этих поставщиков нет отдельного раздела «Пользовательские модели».
  – Раздел**Пользовательские модели**предназначен для поставщиков, которые не предоставляют управляемый импорт доступных моделей.### Dedicated Provider Routes

Направляйте запросы непосредственно к конкретному поставщику с проверкой модели:```bash
POST http://localhost:20128/v1/providers/openai/chat/completions
POST http://localhost:20128/v1/providers/openai/embeddings
POST http://localhost:20128/v1/providers/fireworks/images/generations

````

Префикс провайдера добавляется автоматически, если он отсутствует. Несовпадающие модели возвращают «400».### Network Proxy Configuration

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

**Приоритет:**Зависит от ключа → Зависит от комбинации → Зависит от поставщика → Глобальный → Окружающая среда.### Model Catalog API

```bash
curl http://localhost:20128/api/models/catalog
```

Возвращает модели, сгруппированные по поставщикам с типами («чат», «встраивание», «изображение»).### Cloud Sync

- Синхронизация поставщиков, комбинаций и настроек между устройствами.
- Автоматическая фоновая синхронизация с таймаутом + отказоустойчивость
- Предпочитайте серверную версию `BASE_URL`/`CLOUD_URL` в рабочей среде.### Cloudflare Quick Tunnel

- Доступно в разделе**Панель управления → Конечные точки**для Docker и других локальных развертываний.
- Создает временный URL-адрес https://\*.trycloudflare.com, который перенаправляет вас на текущую конечную точку, совместимую с OpenAI, /v1.
- Первое включение устанавливает Cloudflared только при необходимости; последующие перезапуски повторно используют тот же управляемый двоичный файл
  — Быстрые туннели не восстанавливаются автоматически после перезапуска OmniRoute или контейнера; при необходимости повторно включите их с панели управления
- URL-адреса туннелей являются эфемерными и меняются каждый раз, когда вы останавливаете/запускаете туннель.
- Управляемые быстрые туннели по умолчанию используют транспорт HTTP/2, чтобы избежать шумных предупреждений буфера QUIC UDP в ограниченных контейнерах.
- Установите `CLOUDFLARED_PROTOCOL=quic` или `auto`, если вы хотите переопределить выбор управляемого транспорта.
- Установите `CLOUDFLARED_BIN`, если вы предпочитаете использовать предустановленный двоичный файл `cloudflared` вместо управляемой загрузки.### LLM Gateway Intelligence (Phase 9)

-**Семантический кеш**— автоматически кэширует непоточные ответы, температура = 0 (обход с помощью `X-OmniRoute-No-Cache: true`) -**Request Idempotency**— дедупликация запросов в течение 5 секунд через заголовок Idempotency-Key или X-Request-Id. -**Отслеживание прогресса** — включите события SSE `event: Progress` через заголовок `X-OmniRoute-Progress: true`.---

### Translator Playground

Доступ через**Личный кабинет → Переводчик**. Отладка и визуализация того, как OmniRoute преобразует запросы API между поставщиками.

| Режим                   | Цель                                                                                               |
| ----------------------- | -------------------------------------------------------------------------------------------------- |
| **Детская площадка**    | Выберите исходный/целевой формат, вставьте запрос и мгновенно просмотрите переведенный результат   |
| **Тестер чата**         | Отправляйте сообщения в чате через прокси и проверяйте полный цикл запросов/ответов                |
| **Испытательный стенд** | Запустите пакетные тесты для нескольких комбинаций форматов, чтобы проверить правильность перевода |
| **Живой монитор**       | Наблюдайте за переводами в реальном времени, пока запросы проходят через прокси                    |

**Случаи использования:**

- Отладка причины сбоя конкретной комбинации клиента/провайдера.
- Убедитесь, что теги мышления, вызовы инструментов и системные подсказки переводятся правильно.
- Сравните различия форматов между форматами API OpenAI, Claude, Gemini и Responses.---

### Routing Strategies

Настройте через**Панель управления → Настройки → Маршрутизация**.

| Стратегия                     | Описание                                                                                                                         |
| ----------------------------- | -------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------- |
| **Сначала заполните**         | Использует учетные записи в порядке приоритета — основная учетная запись обрабатывает все запросы, пока они не станут недоступны |
| **Круговая система**          | Циклически перебирает все учетные записи с настраиваемым фиксированным лимитом (по умолчанию: 3 вызова на учетную запись)        |
| **P2C (Сила двух вариантов)** | Выбирает 2 случайных аккаунта и направляется к более здоровому — балансирует нагрузку с осознанием здоровья                      |
| **Случайный**                 | Случайным образом выбирает учетную запись для каждого запроса, используя перемешивание Фишера-Йейтса                             |
| **Наименее используемый**     | Маршруты к учетной записи с самой старой отметкой времени `lastUsedAt`, равномерно распределяя трафик                            |
| **Оптимизирована стоимость**  | Маршруты к учетной записи с наименьшим значением приоритета, оптимизация для поставщиков с наименьшими затратами                 | #### External Sticky Session Header |

Для привязки внешнего сеанса (например, агенты Claude Code/Codex за обратными прокси-серверами) отправьте:```http
X-Session-Id: your-session-key

````

OmniRoute также принимает x_session_id и возвращает эффективный ключ сеанса в X-OmniRoute-Session-Id.

Если вы используете Nginx и отправляете заголовки формы подчеркивания, включите:```nginx
underscores_in_headers on;
````

#### Wildcard Model Aliases

Создайте шаблоны подстановочных знаков для переназначения имен моделей:```
Pattern: claude-sonnet-_ → Target: cc/claude-sonnet-4-5-20250929
Pattern: gpt-_ → Target: gh/gpt-5.1-codex

````

Подстановочные знаки поддерживают `*` (любые символы) и `?` (один символ).#### Fallback Chains

Определите глобальные резервные цепочки, которые применяются ко всем запросам:```
Chain: production-fallback
  1. cc/claude-opus-4-6
  2. gh/gpt-5.1-codex
  3. glm/glm-4.7
````

---

### Resilience & Circuit Breakers

Настройте через**Панель управления → Настройки → Устойчивость**.

OmniRoute реализует устойчивость на уровне поставщика с помощью четырех компонентов:

1.**Профили поставщиков**— конфигурация каждого поставщика для:

- Порог отказа (сколько отказов до открытия)
- Продолжительность перезарядки
- Чувствительность определения ограничения скорости
- Параметры экспоненциальной отсрочки

  2.**Редактируемые ограничения скорости**— настройки по умолчанию на уровне системы, которые можно настроить на панели управления: -**Запросов в минуту (RPM)**— максимальное количество запросов в минуту на аккаунт. -**Min Time Between Requests**— Минимальный промежуток в миллисекундах между запросами. -**Максимальное количество одновременных запросов**— максимальное количество одновременных запросов на одну учетную запись.
  – Нажмите**Изменить**, чтобы изменить, затем**Сохранить**или**Отменить**. Значения сохраняются через API устойчивости.

  3.**Прерыватель цепи**— отслеживает сбои каждого провайдера и автоматически размыкает цепь при достижении порогового значения: -**ЗАКРЫТО**(Исправно) — запросы выполняются нормально. -**OPEN**— Провайдер временно заблокирован после повторных сбоев. -**HALF_OPEN**— Проверка восстановления провайдера

  4.**Политики и заблокированные идентификаторы**— отображает состояние автоматического выключателя и заблокированные идентификаторы с возможностью принудительной разблокировки.

  5.**Автоматическое определение ограничения скорости** — отслеживает заголовки `429` и `Retry-After`, чтобы заранее избежать превышения ограничений скорости провайдера.

**Совет для профессионалов.**Используйте кнопку**Сбросить все**, чтобы сбросить все автоматические выключатели и время восстановления, когда поставщик услуг восстанавливается после сбоя.---

### Database Export / Import

Управляйте резервными копиями базы данных в**Панель управления → Настройки → Система и хранилище**.

| Действие                         | Описание                                                                                                                                                     |
| -------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------- |
| **Экспорт базы данных**          | Загружает текущую базу данных SQLite в виде файла `.sqlite`                                                                                                  |
| **Экспортировать все (.tar.gz)** | Загружает полный архив резервных копий, включая: базу данных, настройки, комбинации, подключения к провайдерам (без учетных данных), метаданные ключей API   |
| **Импорт базы данных**           | Загрузите файл `.sqlite`, чтобы заменить текущую базу данных. Резервная копия перед импортом создается автоматически, если `DISABLE_SQLITE_AUTO_BACKUP=true` | ```bash |

# API: Export database

curl -o backup.sqlite http://localhost:20128/api/db-backups/export

# API: Export all (full archive)

curl -o backup.tar.gz http://localhost:20128/api/db-backups/exportAll

# API: Import database

curl -X POST http://localhost:20128/api/db-backups/import \
 -F "file=@backup.sqlite"

````

**Проверка импорта.**Импортированный файл проверяется на целостность (проверка прагмы SQLite), наличие необходимых таблиц («provider_connections», «provider_nodes», «combos», «api_keys») и размера (максимум 100 МБ).

**Примеры использования:**

- Миграция OmniRoute между компьютерами
- Создание внешних резервных копий для аварийного восстановления.
- Делитесь конфигурациями между членами команды (экспортировать все → поделиться архивом)---

### Settings Dashboard

Страница настроек разделена на 6 вкладок для удобной навигации:

| Вкладка | Содержание |
| -------------- | --------------------------------------------------------------------------------------------- |
|**Общие**| Инструменты системного хранения, настройки внешнего вида, элементы управления темами и видимость боковой панели для каждого элемента |
|**Безопасность**| Настройки логина/пароля, контроль доступа по IP, аутентификация API для `/models` и блокировка провайдера |
|**Маршрутизация**| Глобальная стратегия маршрутизации (6 вариантов), псевдонимы моделей с подстановочными знаками, резервные цепочки, комбинированные значения по умолчанию |
|**Устойчивость**| Профили провайдеров, редактируемые ограничения скорости, статус автоматического выключателя, политики и заблокированные идентификаторы |
|**ИИ**| Обдумывание конфигурации бюджета, глобальная системная инъекция подсказок, статистика кэша подсказок |
|**Расширенный**| Глобальная конфигурация прокси (HTTP/SOCKS5) |---

### Costs & Budget Management

Доступ через**Личный кабинет → Расходы**.

| Вкладка | Цель |
| ----------- | ---------------------------------------------------------------------------------------- |
|**Бюджет**| Установите лимиты расходов на ключ API с ежедневными/еженедельными/месячными бюджетами и отслеживанием в реальном времени |
|**Цены**| Просмотр и редактирование записей цен модели — стоимость за 1 тыс. токенов ввода/вывода на одного поставщика |```bash
# API: Set a budget
curl -X POST http://localhost:20128/api/usage/budget \
  -H "Content-Type: application/json" \
  -d '{"keyId": "key-123", "limit": 50.00, "period": "monthly"}'

# API: Get current budget status
curl http://localhost:20128/api/usage/budget
````

**Отслеживание затрат.**Каждый запрос регистрирует использование токенов и рассчитывает стоимость с использованием таблицы цен. Просмотрите разбивку в**Панель управления → Использование**по поставщикам, моделям и ключам API.---

### Audio Transcription

OmniRoute поддерживает транскрипцию звука через конечную точку, совместимую с OpenAI:```bash
POST /v1/audio/transcriptions
Authorization: Bearer your-api-key
Content-Type: multipart/form-data

# Example with curl

curl -X POST http://localhost:20128/v1/audio/transcriptions \
 -H "Authorization: Bearer your-api-key" \
 -F "file=@audio.mp3" \
 -F "model=deepgram/nova-3"

````

Доступные провайдеры:**Deepgram**(`deepgram/`),**AssemblyAI**(`assemblyai/`).

Поддерживаемые аудиоформаты: `mp3`, `wav`, `m4a`, `flac`, `ogg`, `webm`.---

### Combo Balancing Strategies

Настройте балансировку для каждой комбинации в**Панель управления → Комбо → Создать/Редактировать → Стратегия**.

| Стратегия | Описание |
| ------------------ | -------------------------------------------------------- |
|**Круговой**| Последовательное переключение моделей |
|**Приоритет**| Всегда пробует первую модель; возвращается только в случае ошибки |
|**Случайный**| Выбирает случайную модель из комбинации для каждого запроса |
|**Взвешенный**| Маршруты пропорциональны на основе назначенных весов для каждой модели |
|**Наименее используемый**| Маршруты к модели с наименьшим количеством недавних запросов (использует комбинированные метрики) |
|**Оптимизированная стоимость**| Маршруты к самой дешевой доступной модели (используется таблица цен) |

Глобальные настройки комбо по умолчанию можно установить в**Панель управления → Настройки → Маршрутизация → Параметры комбо по умолчанию**.---

### Health Dashboard

Доступ через**Панель управления → Здоровье**. Обзор состояния системы в реальном времени с 6 картами:

| Карта | Что это показывает |
| --------------------- | ------------------------------------------- |
|**Состояние системы**| Время работы, версия, использование памяти, каталог данных |
|**Здоровье поставщика услуг**| Состояние автоматического выключателя каждого поставщика (Закрыто/Открыто/Полуоткрыто) |
|**Ограничения ставок**| Время восстановления активного лимита скорости на аккаунт с оставшимся временем |
|**Активные блокировки**| Провайдеры временно заблокированы политикой блокировки |
|**Кэш подписей**| Статистика кэша дедупликации (активные ключи, частота попаданий) |
|**Телеметрия с задержкой**| Агрегация задержек p50/p95/p99 для каждого провайдера |

**Совет для профессионалов.**Страница «Здоровье» автоматически обновляется каждые 10 секунд. Используйте карту автоматического выключателя, чтобы определить, у каких поставщиков возникли проблемы.---

## 🖥️ Desktop Application (Electron)

OmniRoute доступен как собственное настольное приложение для Windows, macOS и Linux.### Установить

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

Вывод → `электрон/дист-электрон/`### Key Features

| Особенность                        | Описание                                                          |
| ---------------------------------- | ----------------------------------------------------------------- | ------------------------- |
| **Готовность сервера**             | Опрос сервера перед отображением окна (без пустого экрана)        |
| **Системный лоток**                | Свернуть в трей, изменить порт, выйти из меню трея                |
| **Управление портом**              | Изменить порт сервера из трея (автоматический перезапуск сервера) |
| **Политика безопасности контента** | Ограничительный CSP через заголовки сеансов                       |
| **Единичный экземпляр**            | Одновременно может работать только один экземпляр приложения      |
| **Офлайн-режим**                   | Входящий в комплект сервер Next.js работает без Интернета         | ### Environment Variables |

| Переменная            | По умолчанию | Описание                               |
| --------------------- | ------------ | -------------------------------------- |
| `OMNIROUTE_PORT`      | `20128`      | Порт сервера                           |
| `OMNIROUTE_MEMORY_MB` | `512`        | Ограничение кучи Node.js (64–16384 МБ) |

📖 Полная документация: [`electron/README.md`](../electron/README.md)
