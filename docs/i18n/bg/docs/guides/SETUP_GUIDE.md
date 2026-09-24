# 📖 Setup Guide — OmniRoute (Български)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/SETUP_GUIDE.md) · 🇪🇹 [am](../../../am/docs/guides/SETUP_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/guides/SETUP_GUIDE.md) · 🇦🇿 [az](../../../az/docs/guides/SETUP_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/guides/SETUP_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/guides/SETUP_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/guides/SETUP_GUIDE.md) · 🇩🇰 [da](../../../da/docs/guides/SETUP_GUIDE.md) · 🇩🇪 [de](../../../de/docs/guides/SETUP_GUIDE.md) · 🇬🇷 [el](../../../el/docs/guides/SETUP_GUIDE.md) · 🇪🇸 [es](../../../es/docs/guides/SETUP_GUIDE.md) · 🇪🇪 [et](../../../et/docs/guides/SETUP_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/guides/SETUP_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/guides/SETUP_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/guides/SETUP_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/guides/SETUP_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/guides/SETUP_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/guides/SETUP_GUIDE.md) · 🇮🇱 [he](../../../he/docs/guides/SETUP_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/guides/SETUP_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/guides/SETUP_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/guides/SETUP_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/guides/SETUP_GUIDE.md) · 🇮🇩 [id](../../../id/docs/guides/SETUP_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/guides/SETUP_GUIDE.md) · 🇮🇹 [it](../../../it/docs/guides/SETUP_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/guides/SETUP_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/guides/SETUP_GUIDE.md) · 🇰🇭 [km](../../../km/docs/guides/SETUP_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/guides/SETUP_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/guides/SETUP_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/guides/SETUP_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/guides/SETUP_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/guides/SETUP_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/guides/SETUP_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/guides/SETUP_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/guides/SETUP_GUIDE.md) · 🇲🇲 [my](../../../my/docs/guides/SETUP_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/guides/SETUP_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/guides/SETUP_GUIDE.md) · 🇳🇴 [no](../../../no/docs/guides/SETUP_GUIDE.md) · 🇮🇳 [or](../../../or/docs/guides/SETUP_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/guides/SETUP_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/guides/SETUP_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/guides/SETUP_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/guides/SETUP_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/SETUP_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/guides/SETUP_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/guides/SETUP_GUIDE.md) · 🇱🇰 [si](../../../si/docs/guides/SETUP_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/guides/SETUP_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/guides/SETUP_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/guides/SETUP_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/guides/SETUP_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/guides/SETUP_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/guides/SETUP_GUIDE.md) · 🇮🇳 [te](../../../te/docs/guides/SETUP_GUIDE.md) · 🇹🇭 [th](../../../th/docs/guides/SETUP_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/guides/SETUP_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/SETUP_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/guides/SETUP_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/guides/SETUP_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/guides/SETUP_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/guides/SETUP_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/SETUP_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/SETUP_GUIDE.md)

---

> Пълна справка за настройването на OmniRoute. За кратката версия вижте [Бърз старт в README](../README.md#-quick-start).

## Съдържание

- [Методи за инсталиране](#install-methods)
- [Конфигуриране на CLI инструмента](#cli-tool-configuration)
- [Настройване на протоколите (MCP + A2A)](#protocol-setup-mcp--a2a)
- [Конфигуриране на времето за изчакване](#timeout-configuration)
- [Режим с разделени портове](#split-port-mode)
- [Void Linux (xbps-src)](#void-linux-xbps-src-template)
- [Деинсталиране](#uninstalling)

---

## Методи за инсталиране

### npm (препоръчително)

```bash
npm install -g omniroute
omniroute
```

Таблото се отваря на `http://localhost:20128`, а базовият URL адрес на API е `http://localhost:20128/v1`.

### pnpm

```bash
pnpm add -g omniroute@latest --allow-build=better-sqlite3 --allow-build=@swc/core
omniroute
```

> **За потребителите на pnpm:** флагът `--allow-build` е необходим, за да се активират собствените скриптове за компилация на `better-sqlite3` и `@swc/core`. Командата `pnpm approve-builds -g` не се поддържа за глобални инсталации в pnpm v11.

### Arch Linux (AUR)

```bash
yay -S omniroute-bin
systemctl --user enable --now omniroute.service
```

[Пакетът в AUR](https://aur.archlinux.org/packages/omniroute-bin) инсталира OmniRoute и предоставя потребителска услуга на systemd.

### От изходния код

```bash
npm install
PORT=20128 DASHBOARD_PORT=20129 NEXT_PUBLIC_BASE_URL=http://localhost:20129 npm run dev
```

> **Бележка за Windows:** По подразбиране OmniRoute използва `%APPDATA%\omniroute`, когато наследената директория `%USERPROFILE%\.omniroute` не съществува. Задайте `DATA_DIR`, за да изберете друго местоположение за директорията с данни.

> **Бележка:** `npm install` автоматично генерира `.env` от `.env.example` при първото изпълнение. Следващите инсталации няма да презапишат съществуващ `.env`, така че персонализациите се запазват. За да го генерирате отново, изтрийте `.env`, преди да изпълните командата повторно.

### Docker

Вижте [Ръководството за Docker](./DOCKER_GUIDE.md) за пълни инструкции за настройване на Docker, включително профили за Compose и Caddy HTTPS.

### Настолно приложение (Electron)

OmniRoute се предоставя с настолна обвивка, изградена върху Electron 41 + electron-builder 26.10. Налични скриптове (в корена на работното пространство):

```bash
npm run electron:dev          # Стартира настолното приложение с горещо презареждане
npm run electron:build        # Компилира за текущата ОС (автоматично разпозната)
npm run electron:build:win    # Инсталатор за Windows (NSIS + преносима версия)
npm run electron:build:mac    # macOS (dmg + zip, arm64+x64)
npm run electron:build:linux  # Linux (AppImage + deb + rpm)
npm run electron:smoke:packaged  # Бърз тест на пакетирана компилация
```

Версиите на инсталаторите за настолното приложение са прикачени към изданията в GitHub. За подробно ръководство за Electron (подписване, IPC мост, дистрибуции) вижте [`ELECTRON_GUIDE.md`](./ELECTRON_GUIDE.md) _(създадено на по-късен етап)_.

### Сървър без графичен интерфейс (CI/автоматизация)

За настройки без потребителска намеса (Docker, Kubernetes, CI) използвайте:

```bash
omniroute setup --non-interactive
omniroute providers test-batch
```

В комбинация с променливи на средата (`INITIAL_PASSWORD`, `OMNIROUTE_WS_BRIDGE_SECRET` и др.) това позволява да стартирате екземпляр на OmniRoute изцяло чрез скриптове.

### Опции на CLI

| Команда                 | Описание                                                                                             |
| ----------------------- | ---------------------------------------------------------------------------------------------------- |
| `omniroute`             | Стартира сървъра (`PORT=20128`, API и таблото са на един и същ порт)                                 |
| `omniroute setup`       | Интерактивно първоначално настройване чрез CLI на парола и първи доставчик                           |
| `omniroute doctor`      | Изпълнява локални проверки на състоянието, без да стартира сървъра                                   |
| `omniroute providers`   | Открива, изброява, валидира и тества доставчици чрез CLI                                             |
| `omniroute config`      | Конфигуриране на CLI инструмента — изброяване, извличане, задаване и валидиране на конфигурации      |
| `omniroute status`      | Офлайн табло за състоянието — версия, БД, инструменти и конфигурация                                 |
| `omniroute logs`        | Предава в реално време журналите за използване от API (поддържа `--follow`)                          |
| `omniroute update`      | Проверява за или прилага актуализации на OmniRoute                                                   |
| `omniroute provider`    | Управлява връзките с доставчици — добавяне, изброяване, премахване, тестване и избор по подразбиране |
| `omniroute --port 3000` | Задава каноничния/API порт на 3000                                                                   |
| `omniroute --mcp`       | Стартира MCP сървъра (stdio транспорт)                                                               |
| `omniroute --no-open`   | Не отваря автоматично браузъра                                                                       |
| `omniroute --help`      | Показва помощ                                                                                        |

Настройването без графичен интерфейс може да бъде автоматизирано чрез флагове или променливи на средата:

```bash
omniroute setup --non-interactive --password "$OMNIROUTE_PASSWORD"
omniroute setup --non-interactive --add-provider --provider openai --api-key "$OPENAI_API_KEY"
omniroute setup --non-interactive --add-provider --provider openai --api-key "$OPENAI_API_KEY" --test-provider
```

Изпълнете локална диагностика, без да отваряте таблото:

```bash
omniroute doctor
omniroute doctor --json
omniroute doctor --no-liveness
```

Управлявайте доставчиците чрез SSH или скриптове, без да отваряте таблото:

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

## Конфигуриране на CLI инструменти

### 1) Свържете доставчици и създайте API ключ

1. Отворете Dashboard → `Providers` и свържете поне един доставчик (OAuth или API ключ).
2. Отворете Dashboard → `Endpoints` и създайте API ключ.
3. (По избор) Отворете Dashboard → `Combos` и задайте резервната си верига.

### 2) Насочете инструмента си за програмиране

```txt
Основен URL: http://localhost:20128/v1
API ключ:    [копирайте от страницата Endpoint]
Модел:       if/qwen3.8-max-preview (или произволен префикс доставчик/модел)
```

Ако редакторът ви не може да изпрати `Authorization: Bearer ...`, вместо това използвайте основния URL за съвместимост с вграден токен:

```txt
Основен URL: http://localhost:20128/api/v1/vscode/YOUR_KEY/
URL за модели: http://localhost:20128/api/v1/vscode/YOUR_KEY/models
URL за чат: http://localhost:20128/api/v1/vscode/YOUR_KEY/chat/completions
URL за тагове на Ollama: http://localhost:20128/api/v1/vscode/YOUR_KEY/api/tags
```

Работи с Claude Code, Codex CLI, Cursor, Cline, OpenClaw, OpenCode и съвместими с OpenAI SDK пакети.

#### Автоматично конфигуриране със `setup-*`

Вместо ръчно да поставяте основния URL и ключа, позволете на OmniRoute да запише собствената конфигурация на всеки инструмент от актуалния каталог с модели. По една команда за всеки инструмент:

```bash
omniroute setup-codex        # профили в ~/.codex/<name>.config.toml
omniroute setup-claude       # ~/.claude/profiles/<name>/settings.json
omniroute setup-opencode     # ~/.config/opencode/opencode.json (съвместим с openai)
omniroute setup-cline        # настройки на Cline CLI + разширението за VS Code
omniroute setup-kilo         # Kilo Code
omniroute setup-continue     # ~/.continue/config.yaml (Continue / cn)
omniroute setup-cursor       # извежда стъпките в приложението Cursor
omniroute setup-roo          # импортиране в Roo Code + указател autoImport
omniroute setup-crush        # ~/.config/crush/crush.json
omniroute setup-goose        # ~/.config/goose/config.yaml
omniroute setup-aider        # ~/.aider.conf.yml
omniroute setup-qwen         # ~/.qwen/settings.json + ~/.qwen/.env
```

Всяка команда приема `--remote <url> --api-key <key>` за конфигуриране на локален инструмент спрямо **отдалечен** OmniRoute, както и `--dry-run` за предварителен преглед. За да стартирате CLI с подадени подходящи променливи на средата, без изобщо да записвате конфигурация, използвайте универсалния стартиращ инструмент `omniroute run <target>` (claude, codex, aider, goose, opencode, qwen, gemini); наследените стартиращи команди за отделните инструменти `omniroute launch` (Claude Code) и `omniroute launch-codex` (Codex) остават налични.

За пълната таблица (какво записва всяка команда, всички флагове, локално спрямо отдалечено използване, конвенции за основния URL с `/v1`) вижте **[CLI интеграции](./CLI-INTEGRATIONS.md)**.

За подробна конфигурация на всеки инструмент поотделно (Claude Code, Codex CLI, Cursor, Cline, OpenClaw, Kilo Code, Copilot и други) вижте специалното **[Ръководство за CLI инструменти](../reference/CLI-TOOLS.md)**.

---

## Настройване на протоколи (MCP + A2A)

### Настройване на MCP (Model Context Protocol)

Стартирайте MCP транспорта в режим stdio:

```bash
omniroute --mcp
```

Препоръчителен процес за валидиране:

```bash
# 1. Стартирайте MCP сървъра
omniroute --mcp

# 2. От своя MCP клиент извикайте:
omniroute_get_health        # Трябва да върне състоянието на системата
omniroute_list_combos       # Трябва да върне активните комбинации

# 3. Или изпълнете пълния E2E набор:
npm run test:protocols:e2e
```

#### Конфигуриране на MCP клиент

**Claude Code:**

```bash
claude mcp add-server omniroute --type http --url http://localhost:20128/api/mcp/stream
```

**Cursor / Cline:**

Добавете към настройките си за MCP:

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

**Пълна документация за MCP:** [README на MCP сървъра](../../open-sse/mcp-server/README.md) — 110 инструмента, конфигурации за IDE, клиенти за Python/TS/Go.

### Настройване на A2A (Agent-to-Agent Protocol)

Проверете Agent Card:

```bash
curl http://localhost:20128/.well-known/agent.json
```

Изпратете задача:

```bash
curl -X POST http://localhost:20128/a2a \
  -H 'content-type: application/json' \
  -d '{"jsonrpc":"2.0","id":"quickstart","method":"message/send","params":{"skill":"quota-management","messages":[{"role":"user","content":"Give me a short quota summary."}]}}'
```

**Пълна документация за A2A:** [README на A2A сървъра](../../src/lib/a2a/README.md) — JSON-RPC 2.0, умения, поточно предаване, жизнен цикъл на задачите.

---

## Конфигурация на времето за изчакване

### Основни времена за изчакване

За повечето внедрявания са ви необходими само тези две променливи:

| Променлива               | Стойност по подразбиране       | Предназначение                                                                                                                                                                                                  |
| ------------------------ | ------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `REQUEST_TIMEOUT_MS`     | `600000`                       | Обща базова стойност за времето за изчакване на началото на отговора от upstream, скритите времена за изчакване на Undici, заявките за TLS отпечатък и времената за изчакване на заявките/проксито на API моста |
| `STREAM_IDLE_TIMEOUT_MS` | наследява `REQUEST_TIMEOUT_MS` | Максимална пауза между поточните фрагменти, преди OmniRoute да прекрати SSE потока                                                                                                                              |

Обратната съвместимост е запазена: съществуващите `FETCH_TIMEOUT_MS`, `API_BRIDGE_PROXY_TIMEOUT_MS` и други променливи за време за изчакване на отделните слоеве продължават да работят и заменят общата базова стойност.

### Бележки за отделните доставчици

За upstream услуги, съвместими с Claude Code (`anthropic-compatible-cc-*`), OmniRoute извежда изходящия хедър `X-Stainless-Timeout` от определеното време за изчакване при извличане, така че времената за изчакване при четене от страна на доставчика да останат синхронизирани с конфигурацията на средата ви.

За reverse proxy сървъри на трети страни, съвместими с Claude Code, OmniRoute поддържа консервативен набора по подразбиране `anthropic-beta` и когато `Client Cache Control` е оставено на `Auto`, препраща само предоставените от клиента маркери `cache_control`. Активирайте превключвателя „Enable redact-thinking beta“ за съответната връзка само когато upstream услугата изрично изисква редактирани потоци с разсъждения от Claude.

### Разширени настройки за замяна на времената за изчакване

| Променлива                               | Стойност по подразбиране                    | Предназначение                                                                                        |
| ---------------------------------------- | ------------------------------------------- | ----------------------------------------------------------------------------------------------------- |
| `FETCH_TIMEOUT_MS`                       | наследява `REQUEST_TIMEOUT_MS`              | Време за изчакване на началото на upstream отговора, използвано до получаване на хедърите на отговора |
| `FETCH_HEADERS_TIMEOUT_MS`               | наследява `FETCH_TIMEOUT_MS`                | Ограничение на Undici за времето за получаване на хедърите на upstream отговора                       |
| `FETCH_BODY_TIMEOUT_MS`                  | наследява `FETCH_TIMEOUT_MS`                | Ограничение на Undici за времето между фрагментите на upstream тялото (`0` го деактивира)             |
| `FETCH_CONNECT_TIMEOUT_MS`               | `30000`                                     | Време за изчакване на Undici за установяване на TCP връзка                                            |
| `FETCH_KEEPALIVE_TIMEOUT_MS`             | `4000`                                      | Време за изчакване на неактивен keep-alive сокет в Undici                                             |
| `TLS_CLIENT_TIMEOUT_MS`                  | наследява `FETCH_TIMEOUT_MS`                | Време за изчакване на заявки за TLS отпечатък, направени чрез `wreq-js`                               |
| `API_BRIDGE_PROXY_TIMEOUT_MS`            | наследява `REQUEST_TIMEOUT_MS` или `600000` | Време за изчакване при прокси препращане на `/v1` от API порта към порта на таблото за управление     |
| `API_BRIDGE_SERVER_REQUEST_TIMEOUT_MS`   | `max(API_BRIDGE_PROXY_TIMEOUT_MS, 300000)`  | Време за изчакване на входяща заявка на сървъра на API моста                                          |
| `API_BRIDGE_SERVER_HEADERS_TIMEOUT_MS`   | `60000`                                     | Време за изчакване на входящите хедъри на сървъра на API моста                                        |
| `API_BRIDGE_SERVER_KEEPALIVE_TIMEOUT_MS` | `5000`                                      | Keep-alive време за изчакване на сървъра на API моста                                                 |
| `API_BRIDGE_SERVER_SOCKET_TIMEOUT_MS`    | `0`                                         | Време за изчакване при неактивност на сокета на сървъра на API моста (`0` го деактивира)              |

> **Забележка:** За поточни заявки `FETCH_TIMEOUT_MS` обхваща само установяването на връзката/изчакването на първия upstream отговор. След като потокът стане активен, OmniRoute ще го прекрати само при действително блокиране (`STREAM_IDLE_TIMEOUT_MS`) или неактивност на тялото в Undici (`FETCH_BODY_TIMEOUT_MS`).

### Съвместимост с reverse proxy

Ако изпълнявате OmniRoute зад Nginx, Caddy, Cloudflare или друг reverse proxy, уверете се, че времената за изчакване на проксито също са по-дълги от времената за изчакване на потока/извличането в OmniRoute.

---

## Режим с разделени портове

Стартирайте API и таблото за управление на отделни портове за разширени сценарии (обратно прокси, мрежова свързаност на контейнери):

```bash
PORT=20128 DASHBOARD_PORT=20129 omniroute
# API:              http://localhost:20128/v1
# Табло за управление: http://localhost:20129
```

---

## Шаблон за Void Linux (xbps-src)

Потребителите на Void Linux могат да създадат собствен пакет чрез `xbps-src`. Запазете този блок като `srcpkgs/omniroute/template`:

```bash
# Файл с шаблон за „omniroute“
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
# Генерирайте отново контролната сума за всяка версия чрез:
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

## Деинсталиране

| Команда                  | Действие                                                                                             |
| ------------------------ | ---------------------------------------------------------------------------------------------------- |
| `npm run uninstall`      | Премахва системното приложение, но **запазва базата ви от данни и конфигурациите** в `~/.omniroute`. |
| `npm run uninstall:full` | Премахва приложението И окончателно **изтрива всички конфигурации, ключове и бази от данни**.        |

> За подробни инструкции за деинсталиране при всички методи вижте [UNINSTALL.md](./UNINSTALL.md).
