# 📖 Setup Guide — OmniRoute (Українська)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/SETUP_GUIDE.md) · 🇪🇹 [am](../../../am/docs/guides/SETUP_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/guides/SETUP_GUIDE.md) · 🇦🇿 [az](../../../az/docs/guides/SETUP_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/guides/SETUP_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/guides/SETUP_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/guides/SETUP_GUIDE.md) · 🇩🇰 [da](../../../da/docs/guides/SETUP_GUIDE.md) · 🇩🇪 [de](../../../de/docs/guides/SETUP_GUIDE.md) · 🇬🇷 [el](../../../el/docs/guides/SETUP_GUIDE.md) · 🇪🇸 [es](../../../es/docs/guides/SETUP_GUIDE.md) · 🇪🇪 [et](../../../et/docs/guides/SETUP_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/guides/SETUP_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/guides/SETUP_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/guides/SETUP_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/guides/SETUP_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/guides/SETUP_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/guides/SETUP_GUIDE.md) · 🇮🇱 [he](../../../he/docs/guides/SETUP_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/guides/SETUP_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/guides/SETUP_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/guides/SETUP_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/guides/SETUP_GUIDE.md) · 🇮🇩 [id](../../../id/docs/guides/SETUP_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/guides/SETUP_GUIDE.md) · 🇮🇹 [it](../../../it/docs/guides/SETUP_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/guides/SETUP_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/guides/SETUP_GUIDE.md) · 🇰🇭 [km](../../../km/docs/guides/SETUP_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/guides/SETUP_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/guides/SETUP_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/guides/SETUP_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/guides/SETUP_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/guides/SETUP_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/guides/SETUP_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/guides/SETUP_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/guides/SETUP_GUIDE.md) · 🇲🇲 [my](../../../my/docs/guides/SETUP_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/guides/SETUP_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/guides/SETUP_GUIDE.md) · 🇳🇴 [no](../../../no/docs/guides/SETUP_GUIDE.md) · 🇮🇳 [or](../../../or/docs/guides/SETUP_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/guides/SETUP_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/guides/SETUP_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/guides/SETUP_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/guides/SETUP_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/SETUP_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/guides/SETUP_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/guides/SETUP_GUIDE.md) · 🇱🇰 [si](../../../si/docs/guides/SETUP_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/guides/SETUP_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/guides/SETUP_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/guides/SETUP_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/guides/SETUP_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/guides/SETUP_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/guides/SETUP_GUIDE.md) · 🇮🇳 [te](../../../te/docs/guides/SETUP_GUIDE.md) · 🇹🇭 [th](../../../th/docs/guides/SETUP_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/guides/SETUP_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/guides/SETUP_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/guides/SETUP_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/guides/SETUP_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/guides/SETUP_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/SETUP_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/SETUP_GUIDE.md)

---

> Повний довідник із налаштування OmniRoute. Скорочену версію див. у розділі [Швидкий старт у README](../README.md#-quick-start).

## Зміст

- [Способи встановлення](#install-methods)
- [Налаштування інструментів CLI](#cli-tool-configuration)
- [Налаштування протоколів (MCP + A2A)](#protocol-setup-mcp--a2a)
- [Налаштування тайм-аутів](#timeout-configuration)
- [Режим розділених портів](#split-port-mode)
- [Void Linux (xbps-src)](#void-linux-xbps-src-template)
- [Видалення](#uninstalling)

---

## Способи встановлення

### npm (рекомендовано)

```bash
npm install -g omniroute
omniroute
```

Панель керування відкривається за адресою `http://localhost:20128`, а базова URL-адреса API — `http://localhost:20128/v1`.

### pnpm

```bash
pnpm add -g omniroute@latest --allow-build=better-sqlite3 --allow-build=@swc/core
omniroute
```

> **Користувачам pnpm:** прапорець `--allow-build` потрібен, щоб дозволити нативні сценарії збирання для `better-sqlite3` і `@swc/core`. Команда `pnpm approve-builds -g` не підтримується для глобальних встановлень у pnpm v11.

### Arch Linux (AUR)

```bash
yay -S omniroute-bin
systemctl --user enable --now omniroute.service
```

[Пакунок AUR](https://aur.archlinux.org/packages/omniroute-bin) встановлює OmniRoute та надає користувацьку службу systemd.

### З вихідного коду

```bash
npm install
PORT=20128 DASHBOARD_PORT=20129 NEXT_PUBLIC_BASE_URL=http://localhost:20129 npm run dev
```

> **Примітка для Windows:** За замовчуванням OmniRoute використовує `%APPDATA%\omniroute`, якщо застарілий каталог `%USERPROFILE%\.omniroute` відсутній. Установіть `DATA_DIR`, щоб вибрати інше розташування каталогу даних.

> **Примітка:** під час першого запуску `npm install` автоматично створює `.env` на основі `.env.example`. Наступні встановлення не перезаписуватимуть наявний `.env`, тому налаштування зберігатимуться. Щоб створити його заново, видаліть `.env` перед повторним запуском.

### Docker

Повні інструкції з налаштування Docker, зокрема профілі Compose і Caddy HTTPS, див. у [Посібнику з Docker](./DOCKER_GUIDE.md).

### Настільний застосунок (Electron)

OmniRoute постачається з настільною оболонкою, створеною на основі Electron 41 + electron-builder 26.10. Доступні сценарії (корінь робочого простору):

```bash
npm run electron:dev          # Запустити настільний застосунок із гарячим перезавантаженням
npm run electron:build        # Зібрати для поточної ОС (визначається автоматично)
npm run electron:build:win    # Інсталятор Windows (NSIS + portable)
npm run electron:build:mac    # macOS (dmg + zip, arm64+x64)
npm run electron:build:linux  # Linux (AppImage + deb + rpm)
npm run electron:smoke:packaged  # Виконати швидке тестування упакованої збірки
```

Випуски інсталяторів настільного застосунку додаються до релізів GitHub. Повний детальний огляд Electron (підписування, міст IPC, дистрибутиви) див. у [`ELECTRON_GUIDE.md`](./ELECTRON_GUIDE.md) _(створено на пізнішому етапі)_.

### Безголовий сервер (CI/автоматизація)

Для автоматичних налаштувань без участі користувача (Docker, Kubernetes, CI) використовуйте:

```bash
omniroute setup --non-interactive
omniroute providers test-batch
```

Разом зі змінними середовища (`INITIAL_PASSWORD`, `OMNIROUTE_WS_BRIDGE_SECRET` тощо) це дає змогу розгорнути екземпляр OmniRoute повністю за допомогою сценаріїв.

### Параметри CLI

| Команда                 | Опис                                                                                                      |
| ----------------------- | --------------------------------------------------------------------------------------------------------- |
| `omniroute`             | Запустити сервер (`PORT=20128`, API та панель керування на одному порту)                                  |
| `omniroute setup`       | Покрокове початкове налаштування пароля та першого постачальника через CLI                                |
| `omniroute doctor`      | Виконати локальні перевірки стану без запуску сервера                                                     |
| `omniroute providers`   | Знаходити, переглядати, перевіряти й тестувати постачальників через CLI                                   |
| `omniroute config`      | Налаштування інструментів CLI — переглядати, отримувати, задавати й перевіряти конфігурації               |
| `omniroute status`      | Автономна панель стану — версія, БД, інструменти, конфігурація                                            |
| `omniroute logs`        | Потоково отримувати журнали використання з API (підтримує `--follow`)                                     |
| `omniroute update`      | Перевірити наявність оновлень OmniRoute або застосувати їх                                                |
| `omniroute provider`    | Керувати підключеннями постачальників — додавати, переглядати, видаляти, тестувати, задавати стандартного |
| `omniroute --port 3000` | Установити канонічний порт/порт API на 3000                                                               |
| `omniroute --mcp`       | Запустити сервер MCP (транспорт stdio)                                                                    |
| `omniroute --no-open`   | Не відкривати браузер автоматично                                                                         |
| `omniroute --help`      | Показати довідку                                                                                          |

Безголове налаштування можна автоматизувати за допомогою прапорців або змінних середовища:

```bash
omniroute setup --non-interactive --password "$OMNIROUTE_PASSWORD"
omniroute setup --non-interactive --add-provider --provider openai --api-key "$OPENAI_API_KEY"
omniroute setup --non-interactive --add-provider --provider openai --api-key "$OPENAI_API_KEY" --test-provider
```

Запустіть локальну діагностику, не відкриваючи панель керування:

```bash
omniroute doctor
omniroute doctor --json
omniroute doctor --no-liveness
```

Керуйте постачальниками через SSH або сценарії, не відкриваючи панель керування:

```bash
omniroute providers available
omniroute providers available --search openai
omniroute providers available --category api-key
omniroute providers list
omniroute providers test <id-or-name>
omniroute providers test-all
omniroute providers validate
```

---

## Налаштування інструментів CLI

### 1) Підключіть провайдерів і створіть ключ API

1. Відкрийте Dashboard → `Providers` і підключіть принаймні одного провайдера (OAuth або ключ API).
2. Відкрийте Dashboard → `Endpoints` і створіть ключ API.
3. (Необов’язково) Відкрийте Dashboard → `Combos` і налаштуйте ланцюжок резервних варіантів.

### 2) Налаштуйте свій інструмент для програмування

```txt
Базова URL-адреса: http://localhost:20128/v1
Ключ API:         [скопіюйте зі сторінки Endpoint]
Модель:           if/qwen3.8-max-preview (або будь-який префікс провайдера/моделі)
```

Якщо ваш редактор не може надсилати `Authorization: Bearer ...`, натомість використовуйте базову URL-адресу сумісності з токеном:

```txt
Базова URL-адреса:    http://localhost:20128/api/v1/vscode/YOUR_KEY/
URL-адреса моделей:   http://localhost:20128/api/v1/vscode/YOUR_KEY/models
URL-адреса чату:      http://localhost:20128/api/v1/vscode/YOUR_KEY/chat/completions
URL-адреса тегів Ollama: http://localhost:20128/api/v1/vscode/YOUR_KEY/api/tags
```

Працює з Claude Code, Codex CLI, Cursor, Cline, OpenClaw, OpenCode та SDK, сумісними з OpenAI.

#### Автоматичне налаштування за допомогою `setup-*`

Замість ручного вставлення базової URL-адреси та ключа дозвольте OmniRoute записати власну конфігурацію кожного інструмента з актуального каталогу моделей. Одна команда для кожного інструмента:

```bash
omniroute setup-codex        # профілі ~/.codex/<name>.config.toml
omniroute setup-claude       # ~/.claude/profiles/<name>/settings.json
omniroute setup-opencode     # ~/.config/opencode/opencode.json (сумісний з OpenAI)
omniroute setup-cline        # Cline CLI + налаштування розширення VS Code
omniroute setup-kilo         # Kilo Code
omniroute setup-continue     # ~/.continue/config.yaml (Continue / cn)
omniroute setup-cursor       # виводить інструкції для виконання в застосунку Cursor
omniroute setup-roo          # імпорт Roo Code + вказівник autoImport
omniroute setup-crush        # ~/.config/crush/crush.json
omniroute setup-goose        # ~/.config/goose/config.yaml
omniroute setup-aider        # ~/.aider.conf.yml
omniroute setup-qwen         # ~/.qwen/settings.json + ~/.qwen/.env
```

Кожна команда приймає `--remote <url> --api-key <key>` для налаштування локального інструмента для роботи з **віддаленим** OmniRoute, а також `--dry-run` для попереднього перегляду. Щоб запустити CLI з доданими відповідними змінними середовища взагалі без запису конфігурації, скористайтеся універсальним засобом запуску `omniroute run <target>` (claude, codex, aider, goose, opencode, qwen, gemini); застарілі засоби запуску для окремих інструментів `omniroute launch` (Claude Code) і `omniroute launch-codex` (Codex) залишаються доступними.

Повну таблицю (що записує кожна команда, усі прапорці, локальний і віддалений режими, правила базових URL-адрес із `/v1`) дивіться в розділі **[Інтеграції CLI](./CLI-INTEGRATIONS.md)**.

Докладні налаштування для кожного інструмента (Claude Code, Codex CLI, Cursor, Cline, OpenClaw, Kilo Code, Copilot тощо) дивіться в окремому **[посібнику з інструментів CLI](../reference/CLI-TOOLS.md)**.

---

## Налаштування протоколів (MCP + A2A)

### Налаштування MCP (Model Context Protocol)

Запустіть транспорт MCP у режимі stdio:

```bash
omniroute --mcp
```

Рекомендована послідовність перевірки:

```bash
# 1. Запустіть сервер MCP
omniroute --mcp

# 2. Зі свого клієнта MCP викличте:
omniroute_get_health        # Має повернути стан системи
omniroute_list_combos       # Має повернути активні комбінації

# 3. Або запустіть повний набір наскрізних тестів:
npm run test:protocols:e2e
```

#### Налаштування клієнта MCP

**Claude Code:**

```bash
claude mcp add-server omniroute --type http --url http://localhost:20128/api/mcp/stream
```

**Cursor / Cline:**

Додайте до налаштувань MCP:

```json
{
  "mcpServers": {
    "omniroute": {
      "command": "omniroute",
      "args": ["--mcp"],
      "env": {}
    }
  }
}
```

**Повна документація MCP:** [README сервера MCP](../../open-sse/mcp-server/README.md) — 110 інструментів, конфігурації IDE, клієнти Python/TS/Go.

### Налаштування A2A (Agent-to-Agent Protocol)

Перевірте картку агента:

```bash
curl http://localhost:20128/.well-known/agent.json
```

Надішліть завдання:

```bash
curl -X POST http://localhost:20128/a2a \
  -H 'content-type: application/json' \
  -d '{"jsonrpc":"2.0","id":"quickstart","method":"message/send","params":{"skill":"quota-management","messages":[{"role":"user","content":"Give me a short quota summary."}]}}'
```

**Повна документація A2A:** [README сервера A2A](../../src/lib/a2a/README.md) — JSON-RPC 2.0, навички, потокове передавання, життєвий цикл завдань.

---

## Налаштування тайм-аутів

### Основні тайм-аути

Для більшості розгортань потрібні лише ці дві змінні:

| Змінна                   | Значення за замовчуванням       | Призначення                                                                                                                                                                     |
| ------------------------ | ------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `REQUEST_TIMEOUT_MS`     | `600000`                        | Спільне базове значення тайм-ауту початку відповіді від висхідного сервера, прихованих тайм-аутів Undici, запитів цифрового відбитка TLS і тайм-аутів запитів/проксі API bridge |
| `STREAM_IDLE_TIMEOUT_MS` | успадковує `REQUEST_TIMEOUT_MS` | Максимальний інтервал між фрагментами потокових даних, після якого OmniRoute перериває потік SSE                                                                                |

Зворотну сумісність збережено: наявні змінні `FETCH_TIMEOUT_MS`, `API_BRIDGE_PROXY_TIMEOUT_MS` та інші змінні тайм-аутів для окремих рівнів і надалі працюють та перевизначають спільне базове значення.

### Примітки щодо окремих провайдерів

Для висхідних серверів, сумісних із Claude Code (`anthropic-compatible-cc-*`), OmniRoute формує вихідний заголовок `X-Stainless-Timeout` на основі визначеного тайм-ауту отримання даних, щоб тайм-аути читання на боці провайдера відповідали вашій конфігурації змінних середовища.

Для сторонніх зворотних проксі, сумісних із Claude Code, OmniRoute зберігає консервативний стандартний набір `anthropic-beta` і, коли для `Client Cache Control` залишено значення `Auto`, передає лише надані клієнтом маркери `cache_control`. Вмикайте перемикач «Enable redact-thinking beta» для окремого з’єднання лише тоді, коли висхідний сервер безпосередньо вимагає потоки міркувань Claude із прихованими даними.

### Розширені перевизначення тайм-аутів

| Змінна                                   | Значення за замовчуванням                    | Призначення                                                                                    |
| ---------------------------------------- | -------------------------------------------- | ---------------------------------------------------------------------------------------------- |
| `FETCH_TIMEOUT_MS`                       | успадковує `REQUEST_TIMEOUT_MS`              | Тайм-аут початку відповіді від висхідного сервера, що діє до отримання заголовків відповіді    |
| `FETCH_HEADERS_TIMEOUT_MS`               | успадковує `FETCH_TIMEOUT_MS`                | Обмеження часу Undici для отримання заголовків відповіді від висхідного сервера                |
| `FETCH_BODY_TIMEOUT_MS`                  | успадковує `FETCH_TIMEOUT_MS`                | Обмеження часу Undici між фрагментами тіла відповіді від висхідного сервера (`0` вимикає його) |
| `FETCH_CONNECT_TIMEOUT_MS`               | `30000`                                      | Тайм-аут встановлення TCP-з’єднання Undici                                                     |
| `FETCH_KEEPALIVE_TIMEOUT_MS`             | `4000`                                       | Тайм-аут неактивного keep-alive-сокета Undici                                                  |
| `TLS_CLIENT_TIMEOUT_MS`                  | успадковує `FETCH_TIMEOUT_MS`                | Тайм-аут для запитів цифрового відбитка TLS, виконаних через `wreq-js`                         |
| `API_BRIDGE_PROXY_TIMEOUT_MS`            | успадковує `REQUEST_TIMEOUT_MS` або `600000` | Тайм-аут для проксіювання `/v1` з порту API на порт панелі керування                           |
| `API_BRIDGE_SERVER_REQUEST_TIMEOUT_MS`   | `max(API_BRIDGE_PROXY_TIMEOUT_MS, 300000)`   | Тайм-аут вхідного запиту на сервері API bridge                                                 |
| `API_BRIDGE_SERVER_HEADERS_TIMEOUT_MS`   | `60000`                                      | Тайм-аут вхідних заголовків на сервері API bridge                                              |
| `API_BRIDGE_SERVER_KEEPALIVE_TIMEOUT_MS` | `5000`                                       | Тайм-аут keep-alive на сервері API bridge                                                      |
| `API_BRIDGE_SERVER_SOCKET_TIMEOUT_MS`    | `0`                                          | Тайм-аут неактивності сокета на сервері API bridge (`0` вимикає його)                          |

> **Примітка:** Для потокових запитів `FETCH_TIMEOUT_MS` охоплює лише встановлення з’єднання / очікування першої відповіді від висхідного сервера. Після активації потоку OmniRoute перериває його лише в разі фактичної зупинки (`STREAM_IDLE_TIMEOUT_MS`) або неактивності тіла відповіді Undici (`FETCH_BODY_TIMEOUT_MS`).

### Сумісність зі зворотними проксі

Якщо ви запускаєте OmniRoute за Nginx, Caddy, Cloudflare або іншим зворотним проксі, переконайтеся, що тайм-аути проксі також перевищують тайм-аути потоків/отримання даних OmniRoute.

---

## Режим розділених портів

Запускайте API та Dashboard на окремих портах для розширених сценаріїв (зворотний проксі, контейнерна мережа):

```bash
PORT=20128 DASHBOARD_PORT=20129 omniroute
# API:       http://localhost:20128/v1
# Dashboard: http://localhost:20129
```

---

## Шаблон для Void Linux (xbps-src)

Користувачі Void Linux можуть створити нативний пакет за допомогою `xbps-src`. Збережіть цей блок як `srcpkgs/omniroute/template`:

```bash
# Файл шаблону для 'omniroute'
pkgname=omniroute
version=3.8.0
revision=1
hostmakedepends="nodejs python3 make"
depends="openssl"
short_desc="Універсальний шлюз ШІ з інтелектуальною маршрутизацією для кількох постачальників LLM"
maintainer="zenobit <zenobit@disroot.org>"
license="MIT"
homepage="https://github.com/diegosouzapw/OmniRoute"
distfiles="https://github.com/diegosouzapw/OmniRoute/archive/refs/tags/v${version}.tar.gz"
# Повторно створюйте контрольну суму для кожного випуску за допомогою:
#   curl -L -o /tmp/omniroute.tar.gz "https://github.com/diegosouzapw/OmniRoute/archive/refs/tags/v${version}.tar.gz" && sha256sum /tmp/omniroute.tar.gz
checksum=PLACEHOLDER_REGENERATE_PER_RELEASE
system_accounts="_omniroute"
omniroute_homedir="/var/lib/omniroute"
export NODE_ENV=production
export npm_config_engine_strict=false
export npm_config_loglevel=error
export npm_config_fund=false
export npm_config_audit=false

do_build() {
	local _gyp_arch
	case "$XBPS_TARGET_MACHINE" in
		aarch64*) _gyp_arch=arm64 ;;
		armv7*|armv6*) _gyp_arch=arm ;;
		i686*) _gyp_arch=ia32 ;;
		*) _gyp_arch=x64 ;;
	esac

	NODE_ENV=development npm ci --ignore-scripts
	npm run build
	cp -r .next/static .next/standalone/.next/static
	[ -d public ] && cp -r public .next/standalone/public || true

	local _node_gyp=/usr/lib/node_modules/npm/node_modules/node-gyp/bin/node-gyp.js
	(cd node_modules/better-sqlite3 && node "$_node_gyp" rebuild --arch="$_gyp_arch")

	local _bs3_release=.next/standalone/node_modules/better-sqlite3/build/Release
	mkdir -p "$_bs3_release"
	cp node_modules/better-sqlite3/build/Release/better_sqlite3.node "$_bs3_release/"

	rm -rf .next/standalone/node_modules/@img

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

---

## Видалення

| Команда                  | Дія                                                                                     |
| ------------------------ | --------------------------------------------------------------------------------------- |
| `npm run uninstall`      | Видаляє системний застосунок, але **зберігає вашу БД і конфігурації** в `~/.omniroute`. |
| `npm run uninstall:full` | Видаляє застосунок І назавжди **стирає всі конфігурації, ключі та бази даних**.         |

> Докладні інструкції з видалення для всіх способів див. у файлі [UNINSTALL.md](./UNINSTALL.md).
