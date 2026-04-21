# Посібник користувача

🌐 **Мови:** 🇺🇸 [English](../../../../docs/USER_GUIDE.md) · 🇪🇸 [es](../../es/docs/USER_GUIDE.md) · 🇫🇷 [fr](../../fr/docs/USER_GUIDE.md) · 🇩🇪 [de](../../de/docs/USER_GUIDE.md) · 🇮🇹 [it](../../it/docs/USER_GUIDE.md) · 🇷🇺 [ru](../../ru/docs/USER_GUIDE.md) · 🇨🇳 [zh-CN](../../zh-CN/docs/USER_GUIDE.md) · 🇯🇵 [ja](../../ja/docs/USER_GUIDE.md) · 🇰🇷 [ko](../../ko/docs/USER_GUIDE.md) · 🇸🇦 [ar](../../ar/docs/USER_GUIDE.md) · 🇮🇳 [hi](../../hi/docs/USER_GUIDE.md) · 🇮🇳 [in](../../in/docs/USER_GUIDE.md) · 🇹🇭 [th](../../th/docs/USER_GUIDE.md) · 🇻🇳 [vi](../../vi/docs/USER_GUIDE.md) · 🇮🇩 [id](../../id/docs/USER_GUIDE.md) · 🇲🇾 [ms](../../ms/docs/USER_GUIDE.md) · 🇳🇱 [nl](../../nl/docs/USER_GUIDE.md) · 🇵🇱 [pl](../../pl/docs/USER_GUIDE.md) · 🇸🇪 [sv](../../sv/docs/USER_GUIDE.md) · 🇳🇴 [no](../../no/docs/USER_GUIDE.md) · 🇩🇰 [da](../../da/docs/USER_GUIDE.md) · 🇫🇮 [fi](../../fi/docs/USER_GUIDE.md) · 🇵🇹 [pt](../../pt/docs/USER_GUIDE.md) · 🇷🇴 [ro](../../ro/docs/USER_GUIDE.md) · 🇭🇺 [hu](../../hu/docs/USER_GUIDE.md) · 🇧🇬 [bg](../../bg/docs/USER_GUIDE.md) · 🇸🇰 [sk](../../sk/docs/USER_GUIDE.md) · 🇺🇦 [uk-UA](../../uk-UA/docs/USER_GUIDE.md) · 🇮🇱 [he](../../he/docs/USER_GUIDE.md) · 🇵🇭 [phi](../../phi/docs/USER_GUIDE.md) · 🇧🇷 [pt-BR](../../pt-BR/docs/USER_GUIDE.md) · 🇨🇿 [cs](../../cs/docs/USER_GUIDE.md) · 🇹🇷 [tr](../../tr/docs/USER_GUIDE.md)

---

Повний посібник з налаштування провайдерів, створення комбо, інтеграції CLI-інструментів та розгортання OmniRoute.

---

## Зміст

- [Огляд цін](#-огляд-цін)
- [Варіанти використання](#-варіанти-використання)
- [Налаштування провайдерів](#-налаштування-провайдерів)
- [Інтеграція CLI](#-інтеграція-cli)
- [Розгортання](#-розгортання)
- [Доступні моделі](#-доступні-моделі)
- [Розширені функції](#-розширені-функції)

---

## 💰 Огляд цін

| Рівень             | Провайдер         | Вартість    | Скидання квоти     | Найкраще для           |
| ------------------ | ----------------- | ----------- | ------------------ | ---------------------- |
| **💳 ПІДПИСКА**    | Claude Code (Pro) | $20/міс     | 5год + щотижня     | Вже підписані          |
|                    | Codex (Plus/Pro)  | $20-200/міс | 5год + щотижня     | Користувачі OpenAI     |
|                    | Gemini CLI        | **БЕЗКОШТ** | 180K/міс + 1K/день | Для всіх!              |
|                    | GitHub Copilot    | $10-19/міс  | Щомісяця           | Користувачі GitHub     |
| **🔑 API КЛЮЧ**    | DeepSeek          | За викор.   | Немає              | Дешеві міркування      |
|                    | Groq              | За викор.   | Немає              | Надшвидкий висновок    |
|                    | xAI (Grok)        | За викор.   | Немає              | Міркування Grok 4      |
|                    | Mistral           | За викор.   | Немає              | Моделі в ЄС            |
|                    | Perplexity        | За викор.   | Немає              | З пошуком              |
|                    | Together AI       | За викор.   | Немає              | Відкриті моделі        |
|                    | Fireworks AI      | За викор.   | Немає              | Швидкі FLUX зображення |
|                    | Cerebras          | За викор.   | Немає              | Швидкість на вафлях    |
|                    | Cohere            | За викор.   | Немає              | Command R+ RAG         |
|                    | NVIDIA NIM        | За викор.   | Немає              | Корпоративні моделі    |
| **💰 ДЕШЕВО**      | GLM-4.7           | $0.6/1M     | Щодня о 10:00      | Бюджетний резерв       |
|                    | MiniMax M2.1      | $0.2/1M     | Кожні 5 годин      | Найдешевший варіант    |
|                    | Kimi K2           | $9/міс фікс | 10M токенів/міс    | Передбачувана ціна     |
| **🆓 БЕЗКОШТОВНО** | Qoder             | $0          | Необмежено         | 8 моделей безкошт      |
|                    | Qwen              | $0          | Необмежено         | 3 моделі безкошт       |
|                    | Kiro              | $0          | Необмежено         | Claude безкоштовно     |

**💡 Порада:** Почніть з Gemini CLI (180K безкошт/міс) + Qoder (необмежено) = $0 вартість!

---

## 🎯 Варіанти використання

### Випадок 1: "У мене є підписка Claude Pro"

**Проблема:** Квота закінчується невикористаною, обмеження швидкості під час інтенсивного кодування

```
Комбо: "maximize-claude"
  1. cc/claude-opus-4-7        (повне використання підписки)
  2. glm/glm-4.7               (дешевий резерв при вичерпанні квоти)
  3. if/kimi-k2-thinking       (безкоштовний аварійний резерв)

Щомісячна вартість: $20 (підписка) + ~$5 (резерв) = $25 загалом
проти $20 + досягнення лімітів = розчарування
```

### Випадок 2: "Я хочу нульову вартість"

**Проблема:** Не можу дозволити собі підписки, потрібне надійне AI-кодування

```
Комбо: "free-forever"
  1. gc/gemini-3-flash         (180K безкошт/міс)
  2. if/kimi-k2-thinking       (необмежено безкошт)
  3. qw/qwen3-coder-plus       (необмежено безкошт)

Щомісячна вартість: $0
Якість: Готові до продакшену моделі
```

### Випадок 3: "Мені потрібне кодування 24/7, без перерв"

**Проблема:** Дедлайни, не можу дозволити собі простою

```
Комбо: "always-on"
  1. cc/claude-opus-4-7        (найкраща якість)
  2. cx/gpt-5.2-codex          (друга підписка)
  3. glm/glm-4.7               (дешево, скидається щодня)
  4. minimax/MiniMax-M2.1      (найдешевше, скидання кожні 5год)
  5. if/kimi-k2-thinking       (безкошт необмежено)

Результат: 5 рівнів резервування = нульовий простій
Щомісячна вартість: $20-200 (підписки) + $10-20 (резерв)
```

### Випадок 4: "Я хочу БЕЗКОШТОВНИЙ AI в OpenClaw"

**Проблема:** Потрібен AI-асистент у месенджерах, повністю безкоштовно

```
Комбо: "openclaw-free"
  1. if/glm-4.7                (необмежено безкошт)
  2. if/minimax-m2.1           (необмежено безкошт)
  3. if/kimi-k2-thinking       (необмежено безкошт)

Щомісячна вартість: $0
Доступ через: WhatsApp, Telegram, Slack, Discord, iMessage, Signal...
```

---

## 📖 Налаштування провайдерів

### 🔐 Провайдери з підпискою

#### Claude Code (Pro/Max)

```bash
Панель → Провайдери → Підключити Claude Code
→ OAuth вхід → Автооновлення токена
→ Відстеження квоти 5год + щотижня

Моделі:
  cc/claude-opus-4-7
  cc/claude-sonnet-4-5-20250929
  cc/claude-haiku-4-5-20251001
```

**Порада:** Використовуйте Opus для складних завдань, Sonnet для швидкості. OmniRoute відстежує квоту для кожної моделі!

#### OpenAI Codex (Plus/Pro)

```bash
Панель → Провайдери → Підключити Codex
→ OAuth вхід (порт 1455)
→ Скидання 5год + щотижня

Моделі:
  cx/gpt-5.2-codex
  cx/gpt-5.1-codex-max
```

#### Gemini CLI (БЕЗКОШТОВНО 180K/міс!)

```bash
Панель → Провайдери → Підключити Gemini CLI
→ Google OAuth
→ 180K завершень/міс + 1K/день

Моделі:
  gc/gemini-3-flash-preview
  gc/gemini-2.5-pro
```

**Найкраща цінність:** Величезний безкоштовний рівень! Використовуйте це перед платними рівнями.

#### GitHub Copilot

```bash
Панель → Провайдери → Підключити GitHub
→ OAuth через GitHub
→ Щомісячне скидання (1-го числа)

Моделі:
  gh/gpt-5
  gh/claude-4.5-sonnet
  gh/gemini-3.1-pro-preview
```

### 💰 Дешеві провайдери

#### GLM-4.7 (Щоденне скидання, $0.6/1M)

1. Зареєструйтесь: [Zhipu AI](https://open.bigmodel.cn/)
2. Отримайте API ключ з Coding Plan
3. Панель → Додати API ключ: Провайдер: `glm`, API ключ: `ваш-ключ`

**Використання:** `glm/glm-4.7` — **Порада:** Coding Plan пропонує 3× квоту за 1/7 вартості! Скидання щодня о 10:00.

#### MiniMax M2.1 (Скидання кожні 5год, $0.20/1M)

1. Зареєструйтесь: [MiniMax](https://www.minimax.io/)
2. Отримайте API ключ → Панель → Додати API ключ

**Використання:** `minimax/MiniMax-M2.1` — **Порада:** Найдешевший варіант для довгого контексту (1M токенів)!

#### Kimi K2 ($9/міс фіксовано)

1. Підпишіться: [Moonshot AI](https://platform.moonshot.ai/)
2. Отримайте API ключ → Панель → Додати API ключ

**Використання:** `kimi/kimi-latest` — **Порада:** Фіксовані $9/міс за 10M токенів = $0.90/1M ефективна вартість!

### 🆓 БЕЗКОШТОВНІ провайдери

#### Qoder (8 БЕЗКОШТОВНИХ моделей)

```bash
Панель → Підключити Qoder → OAuth вхід → Необмежене використання

Моделі: if/kimi-k2-thinking, if/qwen3-coder-plus, if/glm-4.7, if/minimax-m2, if/deepseek-r1
```

#### Qwen (3 БЕЗКОШТОВНІ моделі)

```bash
Панель → Підключити Qwen → Авторизація коду пристрою → Необмежене використання

Моделі: qw/qwen3-coder-plus, qw/qwen3-coder-flash
```

#### Kiro (Claude БЕЗКОШТОВНО)

```bash
Панель → Підключити Kiro → AWS Builder ID або Google/GitHub → Необмежено

Моделі: kr/claude-sonnet-4.5, kr/claude-haiku-4.5
```

---

## 🎨 Комбо

Ви можете змінювати порядок карток комбо безпосередньо в **Панель → Комбо**, перетягуючи ручку на кожній картці. Порядок зберігається в SQLite і відновлюється при перезавантаженні.

### Приклад 1: Максимізація підписки → Дешевий резерв

```
Панель → Комбо → Створити нове

Назва: premium-coding
Моделі:
  1. cc/claude-opus-4-7 (Основна підписка)
  2. glm/glm-4.7 (Дешевий резерв, $0.6/1M)
  3. minimax/MiniMax-M2.1 (Найдешевший резерв, $0.20/1M)

Використання в CLI: premium-coding
```

### Приклад 2: Тільки безкоштовне (Нульова вартість)

```
Назва: free-combo
Моделі:
  1. gc/gemini-3-flash-preview (180K безкошт/міс)
  2. if/kimi-k2-thinking (необмежено)
  3. qw/qwen3-coder-plus (необмежено)

Вартість: $0 назавжди!
```

---

## 🔧 Інтеграція CLI

### Cursor IDE

```
Налаштування → Моделі → Розширені:
  OpenAI API Base URL: http://localhost:20128/v1
  OpenAI API Key: [з панелі omniroute]
  Model: cc/claude-opus-4-7
```

### Claude Code

Редагуйте `~/.claude/config.json`:

```json
{
  "anthropic_api_base": "http://localhost:20128/v1",
  "anthropic_api_key": "ваш-omniroute-api-ключ"
}
```

### Codex CLI

```bash
export OPENAI_BASE_URL="http://localhost:20128"
export OPENAI_API_KEY="ваш-omniroute-api-ключ"
codex "ваш запит"
```

### OpenClaw

Редагуйте `~/.openclaw/openclaw.json`:

```json
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
        "apiKey": "ваш-omniroute-api-ключ",
        "api": "openai-completions",
        "models": [{ "id": "if/glm-4.7", "name": "glm-4.7" }]
      }
    }
  }
}
```

**Або використовуйте Панель:** CLI Tools → OpenClaw → Автоналаштування

### Cline / Continue / RooCode

```
Провайдер: OpenAI Compatible
Base URL: http://localhost:20128/v1
API Key: [з панелі]
Model: cc/claude-opus-4-7
```

---

## Розгортання

### Глобальне встановлення npm (Рекомендовано)

```bash
npm install -g omniroute

# Створити каталог конфігурації
mkdir -p ~/.omniroute

# Створити файл .env (див. .env.example)
cp .env.example ~/.omniroute/.env

# Запустити сервер
omniroute
# Або з власним портом:
omniroute --port 3000
```

CLI автоматично завантажує `.env` з `~/.omniroute/.env` або `./.env`.

### Видалення

Коли вам більше не потрібен OmniRoute, ми надаємо два швидкі скрипти для чистого видалення:

| Команда                  | Дія                                                                                      |
| ------------------------ | ---------------------------------------------------------------------------------------- |
| `npm run uninstall`      | Видаляє системний застосунок, але **зберігає вашу БД та конфігурації** в `~/.omniroute`. |
| `npm run uninstall:full` | Видаляє застосунок І назавжди **стирає всі конфігурації, ключі та бази даних**.          |

> Примітка: Щоб виконати ці команди, перейдіть до папки проєкту OmniRoute (якщо ви його клонували) і запустіть їх. Альтернативно, якщо встановлено глобально, ви можете просто виконати `npm uninstall -g omniroute`.

### Розгортання на VPS

```bash
git clone https://github.com/diegosouzapw/OmniRoute.git
cd OmniRoute && npm install && npm run build

export JWT_SECRET="ваш-безпечний-секрет-змініть-це"
export INITIAL_PASSWORD="ваш-пароль"
export DATA_DIR="/var/lib/omniroute"
export PORT="20128"
export HOSTNAME="0.0.0.0"
export NODE_ENV="production"
export NEXT_PUBLIC_BASE_URL="http://localhost:20128"
export API_KEY_SECRET="endpoint-proxy-api-key-secret"

npm run start
# Або: pm2 start npm --name omniroute -- start
```

### Розгортання PM2 (Низька пам'ять)

Для серверів з обмеженою RAM використовуйте опцію обмеження пам'яті:

```bash
# З лімітом 512MB (за замовчуванням)
pm2 start npm --name omniroute -- start

# Або з власним лімітом пам'яті
OMNIROUTE_MEMORY_MB=512 pm2 start npm --name omniroute -- start

# Або використовуючи ecosystem.config.js
pm2 start ecosystem.config.js
```

Створіть `ecosystem.config.js`:

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
        JWT_SECRET: "ваш-секрет",
        INITIAL_PASSWORD: "ваш-пароль",
      },
      node_args: "--max-old-space-size=512",
      max_memory_restart: "300M",
    },
  ],
};
```

### Docker

```bash
# Збірка образу (за замовчуванням = runner-cli з попередньо встановленими codex/claude/droid)
docker build -t omniroute:cli .

# Портативний режим (рекомендовано)
docker run -d --name omniroute -p 20128:20128 --env-file ./.env -v omniroute-data:/app/data omniroute:cli
```

Для режиму інтеграції з хостом з CLI бінарниками див. розділ Docker в основній документації.

### Void Linux (xbps-src)

Користувачі Void Linux можуть упакувати та встановити OmniRoute нативно, використовуючи фреймворк крос-компіляції `xbps-src`. Це автоматизує автономну збірку Node.js разом з необхідними нативними прив'язками `better-sqlite3`.

<details>
<summary><b>Переглянути шаблон xbps-src</b></summary>

```bash
# Файл шаблону для 'omniroute'
pkgname=omniroute
version=3.2.4
revision=1
hostmakedepends="nodejs python3 make"
depends="openssl"
short_desc="Універсальний AI-шлюз з розумною маршрутизацією для кількох LLM провайдерів"
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
	# Визначити цільову архітектуру CPU для node-gyp
	local _gyp_arch
	case "$XBPS_TARGET_MACHINE" in
		aarch64*) _gyp_arch=arm64 ;;
		armv7*|armv6*) _gyp_arch=arm ;;
		i686*) _gyp_arch=ia32 ;;
		*) _gyp_arch=x64 ;;
	esac

	# 1) Встановити всі залежності – пропустити скрипти
	NODE_ENV=development npm ci --ignore-scripts

	# 2) Зібрати автономний пакет Next.js
	npm run build

	# 3) Скопіювати статичні ресурси в автономний
	cp -r .next/static .next/standalone/.next/static
	[ -d public ] && cp -r public .next/standalone/public || true

	# 4) Скомпілювати нативну прив'язку better-sqlite3
	local _node_gyp=/usr/lib/node_modules/npm/node_modules/node-gyp/bin/node-gyp.js
	(cd node_modules/better-sqlite3 && node "$_node_gyp" rebuild --arch="$_gyp_arch")

	# 5) Помістити скомпільовану прив'язку в автономний пакет
	local _bs3_release=.next/standalone/node_modules/better-sqlite3/build/Release
	mkdir -p "$_bs3_release"
	cp node_modules/better-sqlite3/build/Release/better_sqlite3.node "$_bs3_release/"

	# 6) Видалити архітектурно-специфічні пакети sharp
	rm -rf .next/standalone/node_modules/@img

	# 7) Скопіювати залежності pino, пропущені статичним аналізом Next.js:
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

	# Запобігти видаленню порожніх каталогів маршрутизатора Next.js хуком після встановлення
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

### Змінні середовища

| Змінна                                  | За замовчуванням                     | Опис                                                                                                     |
| --------------------------------------- | ------------------------------------ | -------------------------------------------------------------------------------------------------------- |
| `JWT_SECRET`                            | `omniroute-default-secret-change-me` | Секрет підпису JWT (**змініть у продакшені**)                                                            |
| `INITIAL_PASSWORD`                      | `123456`                             | Пароль першого входу                                                                                     |
| `DATA_DIR`                              | `~/.omniroute`                       | Каталог даних (БД, використання, логи)                                                                   |
| `PORT`                                  | за замовчуванням фреймворку          | Порт сервісу (`20128` у прикладах)                                                                       |
| `HOSTNAME`                              | за замовчуванням фреймворку          | Хост прив'язки (Docker за замовчуванням `0.0.0.0`)                                                       |
| `NODE_ENV`                              | за замовчуванням середовища          | Встановіть `production` для розгортання                                                                  |
| `BASE_URL`                              | `http://localhost:20128`             | Внутрішній базовий URL на стороні сервера                                                                |
| `CLOUD_URL`                             | `https://omniroute.dev`              | Базовий URL кінцевої точки хмарної синхронізації                                                         |
| `API_KEY_SECRET`                        | `endpoint-proxy-api-key-secret`      | HMAC секрет для згенерованих API ключів                                                                  |
| `REQUIRE_API_KEY`                       | `false`                              | Примусовий Bearer API ключ на `/v1/*`                                                                    |
| `ALLOW_API_KEY_REVEAL`                  | `false`                              | Дозволити Api Manager копіювати повні API ключі на вимогу                                                |
| `PROVIDER_LIMITS_SYNC_INTERVAL_MINUTES` | `70`                                 | Інтервал оновлення кешованих даних лімітів провайдера; кнопки оновлення UI все ще запускають ручну синхр |
| `DISABLE_SQLITE_AUTO_BACKUP`            | `false`                              | Вимкнути автоматичні знімки SQLite перед записами/імпортом/відновленням; ручні резервні копії працюють   |
| `APP_LOG_TO_FILE`                       | `true`                               | Увімкнути вивід логів додатка та аудиту на диск                                                          |
| `AUTH_COOKIE_SECURE`                    | `false`                              | Примусовий `Secure` cookie авторизації (за HTTPS зворотним проксі)                                       |
| `CLOUDFLARED_BIN`                       | не встановлено                       | Використовувати існуючий бінарник `cloudflared` замість керованого завантаження                          |
| `CLOUDFLARED_PROTOCOL`                  | `http2`                              | Транспорт для керованих Quick Tunnels (`http2`, `quic` або `auto`)                                       |
| `OMNIROUTE_MEMORY_MB`                   | `512`                                | Ліміт купи Node.js у МБ                                                                                  |
| `PROMPT_CACHE_MAX_SIZE`                 | `50`                                 | Макс. записів кешу промптів                                                                              |
| `SEMANTIC_CACHE_MAX_SIZE`               | `100`                                | Макс. записів семантичного кешу                                                                          |

Для повного довідника змінних середовища див. [README](../README.md).

---

## 📊 Доступні моделі

<details>
<summary><b>Переглянути всі доступні моделі</b></summary>

**Claude Code (`cc/`)** — Pro/Max: `cc/claude-opus-4-7`, `cc/claude-sonnet-4-5-20250929`, `cc/claude-haiku-4-5-20251001`

**Codex (`cx/`)** — Plus/Pro: `cx/gpt-5.2-codex`, `cx/gpt-5.1-codex-max`

**Gemini CLI (`gc/`)** — БЕЗКОШТ: `gc/gemini-3-flash-preview`, `gc/gemini-2.5-pro`

**GitHub Copilot (`gh/`)**: `gh/gpt-5`, `gh/claude-4.5-sonnet`

**GLM (`glm/`)** — $0.6/1M: `glm/glm-4.7`

**MiniMax (`minimax/`)** — $0.2/1M: `minimax/MiniMax-M2.1`

**Qoder (`if/`)** — БЕЗКОШТ: `if/kimi-k2-thinking`, `if/qwen3-coder-plus`, `if/deepseek-r1`

**Qwen (`qw/`)** — БЕЗКОШТ: `qw/qwen3-coder-plus`, `qw/qwen3-coder-flash`

**Kiro (`kr/`)** — БЕЗКОШТ: `kr/claude-sonnet-4.5`, `kr/claude-haiku-4.5`

**DeepSeek (`ds/`)**: `ds/deepseek-chat`, `ds/deepseek-reasoner`

**Groq (`groq/`)**: `groq/llama-3.3-70b-versatile`, `groq/llama-4-maverick-17b-128e-instruct`

**xAI (`xai/`)**: `xai/grok-4`, `xai/grok-4-0709-fast-reasoning`, `xai/grok-code-mini`

**Mistral (`mistral/`)**: `mistral/mistral-large-2501`, `mistral/codestral-2501`

**Perplexity (`pplx/`)**: `pplx/sonar-pro`, `pplx/sonar`

**Together AI (`together/`)**: `together/meta-llama/Llama-3.3-70B-Instruct-Turbo`

**Fireworks AI (`fireworks/`)**: `fireworks/accounts/fireworks/models/deepseek-v3p1`

**Cerebras (`cerebras/`)**: `cerebras/llama-3.3-70b`

**Cohere (`cohere/`)**: `cohere/command-r-plus-08-2024`

**NVIDIA NIM (`nvidia/`)**: `nvidia/nvidia/llama-3.3-70b-instruct`

</details>

---

## 🧩 Розширені функції

### Власні моделі

Додайте будь-який ID моделі до будь-якого провайдера без очікування оновлення додатка:

```bash
# Через API
curl -X POST http://localhost:20128/api/provider-models \
  -H "Content-Type: application/json" \
  -d '{"provider": "openai", "modelId": "gpt-4.5-preview", "modelName": "GPT-4.5 Preview"}'

# Список: curl http://localhost:20128/api/provider-models?provider=openai
# Видалити: curl -X DELETE "http://localhost:20128/api/provider-models?provider=openai&model=gpt-4.5-preview"
```

Або використовуйте Панель: **Провайдери → [Провайдер] → Власні моделі**.

Примітки:

- OpenRouter та OpenAI/Anthropic-сумісні провайдери керуються тільки з **Доступних моделей**. Ручне додавання, імпорт та автосинхронізація потрапляють в той самий список доступних моделей, тому немає окремого розділу Власних моделей для цих провайдерів.
- Розділ **Власні моделі** призначений для провайдерів, які не надають керований імпорт доступних моделей.

### Виділені маршрути провайдерів

Направляйте запити безпосередньо до конкретного провайдера з валідацією моделі:

```bash
POST http://localhost:20128/v1/providers/openai/chat/completions
POST http://localhost:20128/v1/providers/openai/embeddings
POST http://localhost:20128/v1/providers/fireworks/images/generations
```

Префікс провайдера додається автоматично, якщо відсутній. Невідповідні моделі повертають `400`.

### Конфігурація мережевого проксі

```bash
# Встановити глобальний проксі
curl -X PUT http://localhost:20128/api/settings/proxy \
  -d '{"global": {"type":"http","host":"proxy.example.com","port":"8080"}}'

# Проксі для окремого провайдера
curl -X PUT http://localhost:20128/api/settings/proxy \
  -d '{"providers": {"openai": {"type":"socks5","host":"proxy.example.com","port":"1080"}}}'

# Тестувати проксі
curl -X POST http://localhost:20128/api/settings/proxy/test \
  -d '{"proxy":{"type":"socks5","host":"proxy.example.com","port":"1080"}}'
```

**Пріоритет:** Специфічний для ключа → Специфічний для комбо → Специфічний для провайдера → Глобальний → Середовище.

### API каталогу моделей

```bash
curl http://localhost:20128/api/models/catalog
```

Повертає моделі, згруповані за провайдером з типами (`chat`, `embedding`, `image`).

### Хмарна синхронізація

- Синхронізація провайдерів, комбо та налаштувань між пристроями
- Автоматична фонова синхронізація з тайм-аутом + швидким відмовленням
- Віддавайте перевагу серверним `BASE_URL`/`CLOUD_URL` у продакшені

### Cloudflare Quick Tunnel

- Доступний в **Панель → Кінцеві точки** для Docker та інших самостійних розгортань
- Створює тимчасовий URL `https://*.trycloudflare.com`, який перенаправляє на вашу поточну OpenAI-сумісну кінцеву точку `/v1`
- Перше увімкнення встановлює `cloudflared` тільки при необхідності; пізніші перезапуски повторно використовують той самий керований бінарник
- Quick Tunnels не відновлюються автоматично після перезапуску OmniRoute або контейнера; повторно увімкніть їх з панелі при необхідності
- URL тунелів є ефемерними і змінюються кожного разу, коли ви зупиняєте/запускаєте тунель
- Керовані Quick Tunnels за замовчуванням використовують транспорт HTTP/2, щоб уникнути шумних попереджень про UDP буфер QUIC в обмежених контейнерах
- Встановіть `CLOUDFLARED_PROTOCOL=quic` або `auto`, якщо хочете перевизначити вибір керованого транспорту
- Встановіть `CLOUDFLARED_BIN`, якщо віддаєте перевагу використанню попередньо встановленого бінарника `cloudflared` замість керованого завантаження

### Інтелект LLM-шлюзу (Фаза 9)

- **Семантичний кеш** — Автоматично кешує не-потокові відповіді з temperature=0 (обхід з `X-OmniRoute-No-Cache: true`)
- **Ідемпотентність запитів** — Дедуплікує запити протягом 5с через заголовок `Idempotency-Key` або `X-Request-Id`
- **Відстеження прогресу** — Опціональні SSE події `event: progress` через заголовок `X-OmniRoute-Progress: true`

---

### Майданчик перекладача

Доступ через **Панель → Перекладач**. Налагоджуйте та візуалізуйте, як OmniRoute перекладає API запити між провайдерами.

| Режим            | Призначення                                                                                   |
| ---------------- | --------------------------------------------------------------------------------------------- |
| **Playground**   | Виберіть формати джерела/цілі, вставте запит і миттєво побачте перекладений вивід             |
| **Chat Tester**  | Надсилайте живі чат-повідомлення через проксі та перевіряйте повний цикл запит/відповідь      |
| **Test Bench**   | Запускайте пакетні тести через кілька комбінацій форматів для перевірки коректності перекладу |
| **Live Monitor** | Спостерігайте за перекладами в реальному часі, коли запити проходять через проксі             |

**Варіанти використання:**

- Налагодження, чому конкретна комбінація клієнт/провайдер не працює
- Перевірка, що теги мислення, виклики інструментів та системні промпти перекладаються правильно
- Порівняння відмінностей форматів між OpenAI, Claude, Gemini та форматами Responses API

---

### Стратегії маршрутизації

Налаштування через **Панель → Налаштування → Маршрутизація**.

| Стратегія                      | Опис                                                                                                                              |
| ------------------------------ | --------------------------------------------------------------------------------------------------------------------------------- |
| **Fill First**                 | Використовує облікові записи в порядку пріоритету — основний обліковий запис обробляє всі запити до недоступності                 |
| **Round Robin**                | Циклічно проходить через всі облікові записи з налаштовуваним лімітом прилипання (за замовчуванням: 3 виклики на обліковий запис) |
| **P2C (Power of Two Choices)** | Вибирає 2 випадкові облікові записи та направляє до здоровішого — балансує навантаження з урахуванням здоров'я                    |
| **Random**                     | Випадково вибирає обліковий запис для кожного запиту, використовуючи перемішування Фішера-Йєтса                                   |
| **Least Used**                 | Направляє до облікового запису з найстарішою міткою часу `lastUsedAt`, рівномірно розподіляючи трафік                             |
| **Cost Optimized**             | Направляє до облікового запису з найнижчим значенням пріоритету, оптимізуючи для найдешевших провайдерів                          |

#### Зовнішній заголовок липкої сесії

Для зовнішньої прив'язки сесії (наприклад, агенти Claude Code/Codex за зворотними проксі), надішліть:

```http
X-Session-Id: ваш-ключ-сесії
```

OmniRoute також приймає `x_session_id` і повертає ефективний ключ сесії в `X-OmniRoute-Session-Id`.

Якщо ви використовуєте Nginx і надсилаєте заголовки з підкресленнями, увімкніть:

```nginx
underscores_in_headers on;
```

#### Шаблонні псевдоніми моделей

Створіть шаблонні патерни для переназначення імен моделей:

```
Патерн: claude-sonnet-*     →  Ціль: cc/claude-sonnet-4-5-20250929
Патерн: gpt-*               →  Ціль: gh/gpt-5.1-codex
```

Шаблони підтримують `*` (будь-які символи) та `?` (один символ).

#### Ланцюги резервування

Визначте глобальні ланцюги резервування, які застосовуються до всіх запитів:

```
Ланцюг: production-fallback
  1. cc/claude-opus-4-7
  2. gh/gpt-5.1-codex
  3. glm/glm-4.7
```

---

### Стійкість та автоматичні вимикачі

Налаштування через **Панель → Налаштування → Стійкість**.

OmniRoute реалізує стійкість на рівні провайдера з чотирма компонентами:

1. **Профілі провайдерів** — Конфігурація для кожного провайдера:
   - **Transient Cooldown** — Базове охолодження для тимчасових збоїв upstream
   - **Rate Limit Cooldown** — Базове охолодження для блокувань через `429`
   - **Max Backoff Level** — Максимальний рівень експоненційного відступу для повторних збоїв
   - **CB Threshold** — Кількість збоїв перед карантином моделі / ескалацією автоматичного вимикача провайдера
   - **CB Reset Time** — Вікно підрахунку збоїв та таймер скидання вимикача

2. **Редаговані ліміти швидкості** — Системні значення за замовчуванням, налаштовувані в панелі:
   - **Requests Per Minute (RPM)** — Максимум запитів на хвилину на обліковий запис
   - **Min Time Between Requests** — Мінімальний проміжок у мілісекундах між запитами
   - **Max Concurrent Requests** — Максимум одночасних запитів на обліковий запис
   - Натисніть **Edit** для зміни, потім **Save** або **Cancel**. Значення зберігаються через API стійкості.

3. **Автоматичний вимикач** — Відстежує збої для кожного провайдера та автоматично відкриває ланцюг при досягненні налаштованого порогу:
   - **CLOSED** (Здоровий) — Запити проходять нормально
   - **OPEN** — Провайдер тимчасово заблокований після повторних збоїв
   - **HALF_OPEN** — Тестування, чи відновився провайдер

   Той самий профіль провайдера також керує блокуваннями з обмеженням моделі:
   - Блокування облікового запису/моделі реагують негайно на авторитетні сигнали `429` / `404` та використовують налаштовані значення охолодження + відступу
   - Глобальний карантин провайдера/моделі активується тільки після того, як повторне вичерпання досягає налаштованого **CB Threshold** протягом **CB Reset Time**

4. **Політики та заблоковані ідентифікатори** — Показує статус автоматичного вимикача та заблоковані ідентифікатори з можливістю примусового розблокування.

5. **Автовиявлення лімітів швидкості** — Моніторить заголовки `429` та `Retry-After` для проактивного уникнення досягнення лімітів швидкості провайдера. Коли upstream провайдер повертає явне вікно очікування, це авторитетне значення `Retry-After` перевизначає базове охолодження з профілю провайдера.

**Порада:** Використовуйте кнопку **Reset All** для очищення всіх автоматичних вимикачів та охолоджень, коли провайдер відновлюється після збою.

---

### Експорт / Імпорт бази даних

Керування резервними копіями бази даних в **Панель → Налаштування → Система та сховище**.

| Дія                      | Опис                                                                                                                                                       |
| ------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Export Database**      | Завантажує поточну базу даних SQLite як файл `.sqlite`                                                                                                     |
| **Export All (.tar.gz)** | Завантажує повний архів резервної копії, включаючи: базу даних, налаштування, комбо, підключення провайдерів (без облікових даних), метадані API ключів    |
| **Import Database**      | Завантажте файл `.sqlite` для заміни поточної бази даних. Резервна копія перед імпортом створюється автоматично, якщо не `DISABLE_SQLITE_AUTO_BACKUP=true` |

```bash
# API: Експорт бази даних
curl -o backup.sqlite http://localhost:20128/api/db-backups/export

# API: Експорт всього (повний архів)
curl -o backup.tar.gz http://localhost:20128/api/db-backups/exportAll

# API: Імпорт бази даних
curl -X POST http://localhost:20128/api/db-backups/import \
  -F "file=@backup.sqlite"
```

**Валідація імпорту:** Імпортований файл перевіряється на цілісність (перевірка pragma SQLite), необхідні таблиці (`provider_connections`, `provider_nodes`, `combos`, `api_keys`) та розмір (макс. 100MB).

**Варіанти використання:**

- Міграція OmniRoute між машинами
- Створення зовнішніх резервних копій для аварійного відновлення
- Обмін конфігураціями між членами команди (експорт всього → поділитися архівом)

---

### Панель налаштувань

Сторінка налаштувань організована в 6 вкладок для легкої навігації:

| Вкладка        | Вміст                                                                                                                               |
| -------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| **General**    | Інструменти системного сховища, налаштування зовнішнього вигляду, керування темою та видимість елементів бічної панелі              |
| **Security**   | Налаштування входу/пароля, контроль доступу за IP, авторизація API для `/models` та блокування провайдерів                          |
| **Routing**    | Глобальна стратегія маршрутизації (6 опцій), шаблонні псевдоніми моделей, ланцюги резервування, значення за замовчуванням для комбо |
| **Resilience** | Профілі провайдерів, редаговані ліміти швидкості, статус автоматичного вимикача, політики та заблоковані ідентифікатори             |
| **AI**         | Конфігурація бюджету мислення, глобальна ін'єкція системного промпту, статистика кешу промптів                                      |
| **Advanced**   | Глобальна конфігурація проксі (HTTP/SOCKS5)                                                                                         |

---

### Управління витратами та бюджетом

Доступ через **Панель → Витрати**.

| Вкладка     | Призначення                                                                                                            |
| ----------- | ---------------------------------------------------------------------------------------------------------------------- |
| **Budget**  | Встановлення лімітів витрат на API ключ з щоденними/щотижневими/щомісячними бюджетами та відстеженням у реальному часі |
| **Pricing** | Перегляд та редагування записів цін моделей — вартість за 1K вхідних/вихідних токенів на провайдера                    |

```bash
# API: Встановити бюджет
curl -X POST http://localhost:20128/api/usage/budget \
  -H "Content-Type: application/json" \
  -d '{"keyId": "key-123", "limit": 50.00, "period": "monthly"}'

# API: Отримати поточний статус бюджету
curl http://localhost:20128/api/usage/budget
```

**Відстеження витрат:** Кожен запит логує використання токенів та обчислює вартість, використовуючи таблицю цін. Переглядайте деталізацію в **Панель → Використання** за провайдером, моделлю та API ключем.

---

### Аудіо транскрипція

OmniRoute підтримує аудіо транскрипцію через OpenAI-сумісну кінцеву точку:

```bash
POST /v1/audio/transcriptions
Authorization: Bearer ваш-api-ключ
Content-Type: multipart/form-data

# Приклад з curl
curl -X POST http://localhost:20128/v1/audio/transcriptions \
  -H "Authorization: Bearer ваш-api-ключ" \
  -F "file=@audio.mp3" \
  -F "model=deepgram/nova-3"
```

Available providers: **Deepgram** (`deepgram/`), **AssemblyAI** (`assemblyai/`).

Supported audio formats: `mp3`, `wav`, `m4a`, `flac`, `ogg`, `webm`.

---

### Combo Balancing Strategies

Configure per-combo balancing in **Dashboard → Combos → Create/Edit → Strategy**.

| Strategy           | Description                                                              |
| ------------------ | ------------------------------------------------------------------------ |
| **Round-Robin**    | Rotates through models sequentially                                      |
| **Priority**       | Always tries the first model; falls back only on error                   |
| **Random**         | Picks a random model from the combo for each request                     |
| **Weighted**       | Routes proportionally based on assigned weights per model                |
| **Least-Used**     | Routes to the model with the fewest recent requests (uses combo metrics) |
| **Cost-Optimized** | Routes to the cheapest available model (uses pricing table)              |

Global combo defaults can be set in **Dashboard → Settings → Routing → Combo Defaults**.

---

### Health Dashboard

Access via **Dashboard → Health**. Real-time system health overview with 6 cards:

| Card                  | What It Shows                                               |
| --------------------- | ----------------------------------------------------------- |
| **System Status**     | Uptime, version, memory usage, data directory               |
| **Provider Health**   | Per-provider circuit breaker state (Closed/Open/Half-Open)  |
| **Rate Limits**       | Active rate limit cooldowns per account with remaining time |
| **Active Lockouts**   | Providers temporarily blocked by the lockout policy         |
| **Signature Cache**   | Deduplication cache stats (active keys, hit rate)           |
| **Latency Telemetry** | p50/p95/p99 latency aggregation per provider                |

**Pro Tip:** The Health page auto-refreshes every 10 seconds. Use the circuit breaker card to identify which providers are experiencing issues.

---

## 🖥️ Desktop Application (Electron)

OmniRoute is available as a native desktop application for Windows, macOS, and Linux.

### Встановити

```bash
# From the electron directory:
cd electron
npm install

# Development mode (connect to running Next.js dev server):
npm run dev

# Production mode (uses standalone build):
npm start
```

### Building Installers

```bash
cd electron
npm run build          # Current platform
npm run build:win      # Windows (.exe NSIS)
npm run build:mac      # macOS (.dmg universal)
npm run build:linux    # Linux (.AppImage)
```

Output → `electron/dist-electron/`

### Key Features

| Feature                     | Description                                          |
| --------------------------- | ---------------------------------------------------- |
| **Server Readiness**        | Polls server before showing window (no blank screen) |
| **System Tray**             | Minimize to tray, change port, quit from tray menu   |
| **Port Management**         | Change server port from tray (auto-restarts server)  |
| **Content Security Policy** | Restrictive CSP via session headers                  |
| **Single Instance**         | Only one app instance can run at a time              |
| **Offline Mode**            | Bundled Next.js server works without internet        |

### Environment Variables

| Variable              | Default | Description                      |
| --------------------- | ------- | -------------------------------- |
| `OMNIROUTE_PORT`      | `20128` | Server port                      |
| `OMNIROUTE_MEMORY_MB` | `512`   | Node.js heap limit (64–16384 MB) |

📖 Full documentation: [`electron/README.md`](../electron/README.md)
