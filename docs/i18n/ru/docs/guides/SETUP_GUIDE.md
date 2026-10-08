# 📖 Setup Guide — OmniRoute (Русский)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/SETUP_GUIDE.md) · 🇪🇹 [am](../../../am/docs/guides/SETUP_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/guides/SETUP_GUIDE.md) · 🇦🇿 [az](../../../az/docs/guides/SETUP_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/guides/SETUP_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/guides/SETUP_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/guides/SETUP_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/guides/SETUP_GUIDE.md) · 🇩🇰 [da](../../../da/docs/guides/SETUP_GUIDE.md) · 🇩🇪 [de](../../../de/docs/guides/SETUP_GUIDE.md) · 🇬🇷 [el](../../../el/docs/guides/SETUP_GUIDE.md) · 🇪🇸 [es](../../../es/docs/guides/SETUP_GUIDE.md) · 🇪🇪 [et](../../../et/docs/guides/SETUP_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/guides/SETUP_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/guides/SETUP_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/guides/SETUP_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/guides/SETUP_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/guides/SETUP_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/guides/SETUP_GUIDE.md) · 🇮🇱 [he](../../../he/docs/guides/SETUP_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/guides/SETUP_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/guides/SETUP_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/guides/SETUP_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/guides/SETUP_GUIDE.md) · 🇮🇩 [id](../../../id/docs/guides/SETUP_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/guides/SETUP_GUIDE.md) · 🇮🇹 [it](../../../it/docs/guides/SETUP_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/guides/SETUP_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/guides/SETUP_GUIDE.md) · 🇰🇭 [km](../../../km/docs/guides/SETUP_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/guides/SETUP_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/guides/SETUP_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/guides/SETUP_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/guides/SETUP_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/guides/SETUP_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/guides/SETUP_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/guides/SETUP_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/guides/SETUP_GUIDE.md) · 🇲🇲 [my](../../../my/docs/guides/SETUP_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/guides/SETUP_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/guides/SETUP_GUIDE.md) · 🇳🇴 [no](../../../no/docs/guides/SETUP_GUIDE.md) · 🇮🇳 [or](../../../or/docs/guides/SETUP_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/guides/SETUP_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/guides/SETUP_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/guides/SETUP_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/guides/SETUP_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/SETUP_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/guides/SETUP_GUIDE.md) · 🇱🇰 [si](../../../si/docs/guides/SETUP_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/guides/SETUP_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/guides/SETUP_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/guides/SETUP_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/guides/SETUP_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/guides/SETUP_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/guides/SETUP_GUIDE.md) · 🇮🇳 [te](../../../te/docs/guides/SETUP_GUIDE.md) · 🇹🇭 [th](../../../th/docs/guides/SETUP_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/guides/SETUP_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/SETUP_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/guides/SETUP_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/guides/SETUP_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/guides/SETUP_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/guides/SETUP_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/SETUP_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/SETUP_GUIDE.md)

---

> Полное справочное руководство по настройке OmniRoute. Краткую версию см. в разделе [Быстрый старт в README](../README.md#-quick-start).

## Содержание

- [Способы установки](#install-methods)
- [Настройка инструментов CLI](#cli-tool-configuration)
- [Настройка протоколов (MCP + A2A)](#protocol-setup-mcp--a2a)
- [Настройка тайм-аутов](#timeout-configuration)
- [Режим раздельных портов](#split-port-mode)
- [Void Linux (xbps-src)](#void-linux-xbps-src-template)
- [Удаление](#uninstalling)

---

## Способы установки

### npm (рекомендуется)

```bash
npm install -g omniroute
omniroute
```

Панель управления откроется по адресу `http://localhost:20128`, а базовый URL API — `http://localhost:20128/v1`.

### pnpm

```bash
pnpm add -g omniroute@latest --allow-build=better-sqlite3 --allow-build=@swc/core
omniroute
```

> **Для пользователей pnpm:** флаг `--allow-build` необходим для разрешения нативных сценариев сборки `better-sqlite3` и `@swc/core`. Команда `pnpm approve-builds -g` не поддерживается для глобальных установок в pnpm v11.

### Arch Linux (AUR)

```bash
yay -S omniroute-bin
systemctl --user enable --now omniroute.service
```

[Пакет AUR](https://aur.archlinux.org/packages/omniroute-bin) устанавливает OmniRoute и предоставляет пользовательскую службу systemd.

### Установка из исходного кода

```bash
npm install
PORT=20128 DASHBOARD_PORT=20129 NEXT_PUBLIC_BASE_URL=http://localhost:20129 npm run dev
```

> **Примечание для Windows:** по умолчанию OmniRoute использует `%APPDATA%\omniroute`, если устаревший каталог `%USERPROFILE%\.omniroute` отсутствует. Задайте `DATA_DIR`, чтобы выбрать другое расположение каталога данных.

> **Примечание:** при первом запуске `npm install` автоматически создаёт `.env` на основе `.env.example`. Последующие установки не перезаписывают существующий `.env`, поэтому пользовательские настройки сохраняются. Чтобы создать файл заново, удалите `.env` перед повторным запуском.

### Docker

Полные инструкции по настройке Docker, включая профили Compose и HTTPS через Caddy, см. в [руководстве по Docker](./DOCKER_GUIDE.md).

### Настольное приложение (Electron)

OmniRoute поставляется с настольной оболочкой, созданной на основе Electron 41 + electron-builder 26.10. Доступные сценарии (из корня рабочего пространства):

```bash
npm run electron:dev          # Запустить настольное приложение с горячей перезагрузкой
npm run electron:build        # Собрать для текущей ОС (определяется автоматически)
npm run electron:build:win    # Установщик Windows (NSIS + переносная версия)
npm run electron:build:mac    # macOS (dmg + zip, arm64+x64)
npm run electron:build:linux  # Linux (AppImage + deb + rpm)
npm run electron:smoke:packaged  # Выполнить дымовой тест упакованной сборки
```

Выпуски установщиков настольного приложения прикрепляются к релизам GitHub. Подробное руководство по Electron (подписание, мост IPC, дистрибутивы) см. в [`ELECTRON_GUIDE.md`](./ELECTRON_GUIDE.md) _(создано на более позднем этапе)_.

### Сервер без графического интерфейса (CI/автоматизация)

Для автоматической настройки без участия пользователя (Docker, Kubernetes, CI) используйте:

```bash
omniroute setup --non-interactive
omniroute providers test-batch
```

В сочетании с переменными окружения (`INITIAL_PASSWORD`, `OMNIROUTE_WS_BRIDGE_SECRET` и т. д.) это позволяет развёртывать экземпляр OmniRoute полностью программным способом.

### Параметры CLI

| Команда                 | Описание                                                                                                |
| ----------------------- | ------------------------------------------------------------------------------------------------------- |
| `omniroute`             | Запустить сервер (`PORT=20128`, API и панель управления на одном порту)                                 |
| `omniroute setup`       | Пошаговая настройка пароля и первого провайдера через CLI                                               |
| `omniroute doctor`      | Выполнить локальные проверки состояния без запуска сервера                                              |
| `omniroute providers`   | Обнаруживать, выводить, проверять и тестировать провайдеров через CLI                                   |
| `omniroute config`      | Настройка инструментов CLI — вывод, получение, изменение и проверка конфигураций                        |
| `omniroute status`      | Автономная панель состояния — версия, БД, инструменты, конфигурация                                     |
| `omniroute logs`        | Потоковый вывод журналов использования из API (поддерживает `--follow`)                                 |
| `omniroute update`      | Проверить наличие обновлений OmniRoute или применить их                                                 |
| `omniroute provider`    | Управлять подключениями провайдеров — добавлять, выводить, удалять, тестировать, назначать по умолчанию |
| `omniroute --port 3000` | Установить основной порт/порт API равным 3000                                                           |
| `omniroute --mcp`       | Запустить сервер MCP (транспорт stdio)                                                                  |
| `omniroute --no-open`   | Не открывать браузер автоматически                                                                      |
| `omniroute --help`      | Показать справку                                                                                        |

Настройку без графического интерфейса можно автоматизировать с помощью флагов или переменных окружения:

```bash
omniroute setup --non-interactive --password "$OMNIROUTE_PASSWORD"
omniroute setup --non-interactive --add-provider --provider openai --api-key "$OPENAI_API_KEY"
omniroute setup --non-interactive --add-provider --provider openai --api-key "$OPENAI_API_KEY" --test-provider
```

Запустите локальную диагностику, не открывая панель управления:

```bash
omniroute doctor
omniroute doctor --json
omniroute doctor --no-liveness
```

Управляйте провайдерами через SSH или сценарии, не открывая панель управления:

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

## Настройка инструмента командной строки

### 1) Подключите провайдеров и создайте ключ API

1. Откройте Dashboard → `Providers` и подключите хотя бы одного провайдера (через OAuth или ключ API).
2. Откройте Dashboard → `Endpoints` и создайте ключ API.
3. (Необязательно) Откройте Dashboard → `Combos` и настройте резервную цепочку.

### 2) Настройте инструмент для написания кода

```txt
Базовый URL: http://localhost:20128/v1
Ключ API:    [скопируйте со страницы Endpoint]
Модель:      if/qwen3.8-max-preview (или любой префикс провайдера/модели)
```

Если ваш редактор не может отправлять `Authorization: Bearer ...`, используйте вместо этого базовый URL совместимости с токеном:

```txt
Базовый URL: http://localhost:20128/api/v1/vscode/YOUR_KEY/
URL моделей: http://localhost:20128/api/v1/vscode/YOUR_KEY/models
URL чата: http://localhost:20128/api/v1/vscode/YOUR_KEY/chat/completions
URL тегов Ollama: http://localhost:20128/api/v1/vscode/YOUR_KEY/api/tags
```

Работает с Claude Code, Codex CLI, Cursor, Cline, OpenClaw, OpenCode и SDK, совместимыми с OpenAI.

#### Автоматическая настройка с помощью `setup-*`

Вместо ручной вставки базового URL и ключа позвольте OmniRoute записать собственную конфигурацию каждого инструмента на основе актуального каталога моделей. Для каждого инструмента используется одна команда:

```bash
omniroute setup-codex        # профили ~/.codex/<name>.config.toml
omniroute setup-claude       # ~/.claude/profiles/<name>/settings.json
omniroute setup-opencode     # ~/.config/opencode/opencode.json (совместимый с OpenAI)
omniroute setup-cline        # настройки Cline CLI и расширения VS Code
omniroute setup-kilo         # Kilo Code
omniroute setup-continue     # ~/.continue/config.yaml (Continue / cn)
omniroute setup-cursor       # выводит инструкции для настройки в интерфейсе Cursor
omniroute setup-roo          # импорт Roo Code и указатель autoImport
omniroute setup-crush        # ~/.config/crush/crush.json
omniroute setup-goose        # ~/.config/goose/config.yaml
omniroute setup-aider        # ~/.aider.conf.yml
omniroute setup-qwen         # ~/.qwen/settings.json + ~/.qwen/.env
```

Каждая команда принимает `--remote <url> --api-key <key>`, чтобы настроить локальный инструмент для работы с **удалённым** OmniRoute, а также `--dry-run` для предварительного просмотра. Чтобы запустить CLI с внедрёнными нужными переменными окружения вообще без записи конфигурации, используйте универсальную команду запуска `omniroute run <target>` (claude, codex, aider, goose, opencode, qwen, gemini); устаревшие команды запуска для отдельных инструментов `omniroute launch` (Claude Code) и `omniroute launch-codex` (Codex) по-прежнему доступны.

Полную таблицу (что записывает каждая команда, все флаги, локальный и удалённый режимы, соглашения по базовому URL `/v1`) см. в разделе **[Интеграции CLI](./CLI-INTEGRATIONS.md)**.

Подробные инструкции по настройке отдельных инструментов (Claude Code, Codex CLI, Cursor, Cline, OpenClaw, Kilo Code, Copilot и других) см. в специальном **[руководстве по инструментам CLI](../reference/CLI-TOOLS.md)**.

---

## Настройка протоколов (MCP + A2A)

### Настройка MCP (Model Context Protocol)

Запустите транспорт MCP в режиме stdio:

```bash
omniroute --mcp
```

Рекомендуемый процесс проверки:

```bash
# 1. Запустите сервер MCP
omniroute --mcp

# 2. Из клиента MCP вызовите:
omniroute_get_health        # Должен вернуть состояние системы
omniroute_list_combos       # Должен вернуть активные комбинации

# 3. Или запустите полный набор тестов E2E:
npm run test:protocols:e2e
```

#### Настройка клиента MCP

**Claude Code:**

```bash
claude mcp add-server omniroute --type http --url http://localhost:20128/api/mcp/stream
```

**Cursor / Cline:**

Добавьте в настройки MCP:

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

**Полная документация по MCP:** [README сервера MCP](../../open-sse/mcp-server/README.md) — 110 инструментов, конфигурации IDE, клиенты Python/TS/Go.

### Настройка A2A (протокол Agent-to-Agent)

Проверьте Agent Card:

```bash
curl http://localhost:20128/.well-known/agent.json
```

Отправьте задачу:

```bash
curl -X POST http://localhost:20128/a2a \
  -H 'content-type: application/json' \
  -d '{"jsonrpc":"2.0","id":"quickstart","method":"message/send","params":{"skill":"quota-management","messages":[{"role":"user","content":"Дайте мне краткую сводку по квоте."}]}}'
```

**Полная документация по A2A:** [README сервера A2A](../../src/lib/a2a/README.md) — JSON-RPC 2.0, навыки, потоковая передача, жизненный цикл задач.

---

## Настройка тайм-аутов

### Основные тайм-ауты

Для большинства развертываний достаточно этих двух переменных:

| Переменная               | Значение по умолчанию          | Назначение                                                                                                                                                                  |
| ------------------------ | ------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `REQUEST_TIMEOUT_MS`     | `600000`                       | Общая базовая величина для тайм-аута начала ответа вышестоящего сервера, скрытых тайм-аутов Undici, запросов цифрового отпечатка TLS и тайм-аутов запросов/прокси API-моста |
| `STREAM_IDLE_TIMEOUT_MS` | наследует `REQUEST_TIMEOUT_MS` | Максимальный интервал между фрагментами потоковых данных, после которого OmniRoute прерывает SSE-поток                                                                      |

Обратная совместимость сохранена: существующие переменные `FETCH_TIMEOUT_MS`, `API_BRIDGE_PROXY_TIMEOUT_MS` и другие переменные тайм-аутов отдельных уровней по-прежнему работают и переопределяют общую базовую величину.

### Примечания для отдельных провайдеров

Для вышестоящих серверов, совместимых с Claude Code (`anthropic-compatible-cc-*`), OmniRoute формирует исходящий заголовок `X-Stainless-Timeout` на основе итогового тайм-аута получения данных, чтобы тайм-ауты чтения на стороне провайдера соответствовали вашей конфигурации переменных окружения.

Для сторонних обратных прокси, совместимых с Claude Code, OmniRoute сохраняет консервативный набор `anthropic-beta` по умолчанию и, если для `Client Cache Control` оставлено значение `Auto`, передает только предоставленные клиентом маркеры `cache_control`. Включайте переключатель «Enable redact-thinking beta» для отдельного подключения, только если вышестоящий сервер явно требует потоки рассуждений Claude с отредактированными фрагментами.

### Расширенные переопределения тайм-аутов

| Переменная                               | Значение по умолчанию                       | Назначение                                                                                  |
| ---------------------------------------- | ------------------------------------------- | ------------------------------------------------------------------------------------------- |
| `FETCH_TIMEOUT_MS`                       | наследует `REQUEST_TIMEOUT_MS`              | Тайм-аут начала ответа вышестоящего сервера, применяемый до получения заголовков ответа     |
| `FETCH_HEADERS_TIMEOUT_MS`               | наследует `FETCH_TIMEOUT_MS`                | Лимит времени Undici на получение заголовков ответа вышестоящего сервера                    |
| `FETCH_BODY_TIMEOUT_MS`                  | наследует `FETCH_TIMEOUT_MS`                | Лимит времени Undici между фрагментами тела ответа вышестоящего сервера (`0` отключает его) |
| `FETCH_CONNECT_TIMEOUT_MS`               | `30000`                                     | Тайм-аут установки TCP-соединения в Undici                                                  |
| `FETCH_KEEPALIVE_TIMEOUT_MS`             | `4000`                                      | Тайм-аут бездействующего keep-alive-сокета в Undici                                         |
| `TLS_CLIENT_TIMEOUT_MS`                  | наследует `FETCH_TIMEOUT_MS`                | Тайм-аут запросов цифрового отпечатка TLS, выполняемых через `wreq-js`                      |
| `API_BRIDGE_PROXY_TIMEOUT_MS`            | наследует `REQUEST_TIMEOUT_MS` или `600000` | Тайм-аут проксирования `/v1` с порта API на порт панели управления                          |
| `API_BRIDGE_SERVER_REQUEST_TIMEOUT_MS`   | `max(API_BRIDGE_PROXY_TIMEOUT_MS, 300000)`  | Тайм-аут входящего запроса на сервере API-моста                                             |
| `API_BRIDGE_SERVER_HEADERS_TIMEOUT_MS`   | `60000`                                     | Тайм-аут входящих заголовков на сервере API-моста                                           |
| `API_BRIDGE_SERVER_KEEPALIVE_TIMEOUT_MS` | `5000`                                      | Тайм-аут keep-alive на сервере API-моста                                                    |
| `API_BRIDGE_SERVER_SOCKET_TIMEOUT_MS`    | `0`                                         | Тайм-аут бездействия сокета на сервере API-моста (`0` отключает его)                        |

> **Примечание:** Для потоковых запросов `FETCH_TIMEOUT_MS` охватывает только установку соединения и ожидание первого ответа от вышестоящего сервера. После активации потока OmniRoute прерывает его только при фактической остановке передачи (`STREAM_IDLE_TIMEOUT_MS`) или бездействии тела ответа Undici (`FETCH_BODY_TIMEOUT_MS`).

### Совместимость с обратными прокси

Если OmniRoute работает за Nginx, Caddy, Cloudflare или другим обратным прокси, убедитесь, что тайм-ауты прокси также превышают тайм-ауты потоковой передачи и получения данных OmniRoute.

---

## Режим раздельных портов

Запускайте API и панель управления на отдельных портах для сложных сценариев (обратный прокси-сервер, контейнерные сети):

```bash
PORT=20128 DASHBOARD_PORT=20129 omniroute
# API:              http://localhost:20128/v1
# Панель управления: http://localhost:20129
```

---

## Шаблон для Void Linux (xbps-src)

Пользователи Void Linux могут собрать нативный пакет с помощью `xbps-src`. Сохраните этот блок как `srcpkgs/omniroute/template`:

```bash
# Файл шаблона для 'omniroute'
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
# Пересоздавайте контрольную сумму для каждого выпуска с помощью:
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

## Удаление

| Команда                  | Действие                                                                                |
| ------------------------ | --------------------------------------------------------------------------------------- |
| `npm run uninstall`      | Удаляет системное приложение, но **сохраняет вашу БД и конфигурации** в `~/.omniroute`. |
| `npm run uninstall:full` | Удаляет приложение И навсегда **стирает все конфигурации, ключи и базы данных**.        |

> Подробные инструкции по удалению для всех способов установки см. в [UNINSTALL.md](./UNINSTALL.md).
