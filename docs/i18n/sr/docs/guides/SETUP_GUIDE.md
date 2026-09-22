# 📖 Setup Guide — OmniRoute (Српски)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/SETUP_GUIDE.md) · 🇪🇹 [am](../../../am/docs/guides/SETUP_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/guides/SETUP_GUIDE.md) · 🇦🇿 [az](../../../az/docs/guides/SETUP_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/guides/SETUP_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/guides/SETUP_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/guides/SETUP_GUIDE.md) · 🇩🇰 [da](../../../da/docs/guides/SETUP_GUIDE.md) · 🇩🇪 [de](../../../de/docs/guides/SETUP_GUIDE.md) · 🇬🇷 [el](../../../el/docs/guides/SETUP_GUIDE.md) · 🇪🇸 [es](../../../es/docs/guides/SETUP_GUIDE.md) · 🇪🇪 [et](../../../et/docs/guides/SETUP_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/guides/SETUP_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/guides/SETUP_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/guides/SETUP_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/guides/SETUP_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/guides/SETUP_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/guides/SETUP_GUIDE.md) · 🇮🇱 [he](../../../he/docs/guides/SETUP_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/guides/SETUP_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/guides/SETUP_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/guides/SETUP_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/guides/SETUP_GUIDE.md) · 🇮🇩 [id](../../../id/docs/guides/SETUP_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/guides/SETUP_GUIDE.md) · 🇮🇹 [it](../../../it/docs/guides/SETUP_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/guides/SETUP_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/guides/SETUP_GUIDE.md) · 🇰🇭 [km](../../../km/docs/guides/SETUP_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/guides/SETUP_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/guides/SETUP_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/guides/SETUP_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/guides/SETUP_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/guides/SETUP_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/guides/SETUP_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/guides/SETUP_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/guides/SETUP_GUIDE.md) · 🇲🇲 [my](../../../my/docs/guides/SETUP_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/guides/SETUP_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/guides/SETUP_GUIDE.md) · 🇳🇴 [no](../../../no/docs/guides/SETUP_GUIDE.md) · 🇮🇳 [or](../../../or/docs/guides/SETUP_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/guides/SETUP_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/guides/SETUP_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/guides/SETUP_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/guides/SETUP_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/SETUP_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/guides/SETUP_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/guides/SETUP_GUIDE.md) · 🇱🇰 [si](../../../si/docs/guides/SETUP_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/guides/SETUP_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/guides/SETUP_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/guides/SETUP_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/guides/SETUP_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/guides/SETUP_GUIDE.md) · 🇮🇳 [te](../../../te/docs/guides/SETUP_GUIDE.md) · 🇹🇭 [th](../../../th/docs/guides/SETUP_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/guides/SETUP_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/SETUP_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/guides/SETUP_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/guides/SETUP_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/guides/SETUP_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/guides/SETUP_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/SETUP_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/SETUP_GUIDE.md)

---

> Комплетна референца за подешавање OmniRoute-а. За брзу верзију погледајте [Брзи почетак у README-у](../README.md#-quick-start).

## Садржај

- [Начини инсталације](#install-methods)
- [Конфигурација CLI алата](#cli-tool-configuration)
- [Подешавање протокола (MCP + A2A)](#protocol-setup-mcp--a2a)
- [Конфигурација временског ограничења](#timeout-configuration)
- [Режим одвојених портова](#split-port-mode)
- [Void Linux (xbps-src)](#void-linux-xbps-src-template)
- [Деинсталација](#uninstalling)

---

## Начини инсталације

### npm (препоручено)

```bash
npm install -g omniroute
omniroute
```

Контролна табла се отвара на `http://localhost:20128`, а основни URL API-ја је `http://localhost:20128/v1`.

### pnpm

```bash
pnpm add -g omniroute@latest --allow-build=better-sqlite3 --allow-build=@swc/core
omniroute
```

> **Корисници pnpm-а:** опција `--allow-build` је неопходна да би се омогућиле изворне скрипте за изградњу за `better-sqlite3` и `@swc/core`. Команда `pnpm approve-builds -g` није подржана за глобалне инсталације у pnpm v11.

### Arch Linux (AUR)

```bash
yay -S omniroute-bin
systemctl --user enable --now omniroute.service
```

[AUR пакет](https://aur.archlinux.org/packages/omniroute-bin) инсталира OmniRoute и обезбеђује systemd кориснички сервис.

### Из изворног кода

```bash
npm install
PORT=20128 DASHBOARD_PORT=20129 NEXT_PUBLIC_BASE_URL=http://localhost:20129 npm run dev
```

> **Напомена за Windows:** OmniRoute подразумевано користи `%APPDATA%\omniroute` када стари директоријум `%USERPROFILE%\.omniroute` не постоји. Подесите `DATA_DIR` да бисте изабрали другу локацију директоријума са подацима.

> **Напомена:** `npm install` аутоматски генерише `.env` из `.env.example` при првом покретању. Наредне инсталације неће преписати постојећу датотеку `.env`, па се прилагођавања чувају. Да бисте је поново генерисали, избришите `.env` пре поновног покретања.

### Docker

Погледајте [Водич за Docker](./DOCKER_GUIDE.md) за комплетно подешавање Docker-а, укључујући Compose профиле и Caddy HTTPS.

### Десктоп апликација (Electron)

OmniRoute долази са десктоп омотачем изграђеним на Electron 41 + electron-builder 26.10. Доступне скрипте (корен радног простора):

```bash
npm run electron:dev          # Покрени десктоп апликацију са аутоматским поновним учитавањем
npm run electron:build        # Изгради за тренутни ОС (аутоматски откривен)
npm run electron:build:win    # Windows инсталатер (NSIS + преносива верзија)
npm run electron:build:mac    # macOS (dmg + zip, arm64+x64)
npm run electron:build:linux  # Linux (AppImage + deb + rpm)
npm run electron:smoke:packaged  # Основно тестирање упаковане верзије
```

Издања десктоп инсталатера приложена су уз GitHub Releases. За детаљан водич о Electron-у (потписивање, IPC мост, дистрибуције) погледајте [`ELECTRON_GUIDE.md`](./ELECTRON_GUIDE.md) _(направљено у каснијој фази)_.

### Сервер без графичког интерфејса (CI/аутоматизација)

За подешавања без надзора (Docker, Kubernetes, CI), користите:

```bash
omniroute setup --non-interactive
omniroute providers test-batch
```

У комбинацији са променљивама окружења (`INITIAL_PASSWORD`, `OMNIROUTE_WS_BRIDGE_SECRET` итд.), ово вам омогућава да покренете OmniRoute инстанцу која се у потпуности може аутоматизовати скриптама.

### CLI опције

| Команда                 | Опис                                                                        |
| ----------------------- | --------------------------------------------------------------------------- |
| `omniroute`             | Покрени сервер (`PORT=20128`, API и контролна табла на истом порту)         |
| `omniroute setup`       | Вођено CLI почетно подешавање лозинке и првог добављача                     |
| `omniroute doctor`      | Покрени локалне здравствене провере без покретања сервера                   |
| `omniroute providers`   | Откриј, прикажи, провери и тестирај добављаче преко CLI-ја                  |
| `omniroute config`      | Конфигурација CLI алата — прикажи, преузми, постави и провери поставке      |
| `omniroute status`      | Контролна табла статуса ван мреже — верзија, база, алати, конфигурација     |
| `omniroute logs`        | Стримуј евиденцију коришћења из API-ја (подржава `--follow`)                |
| `omniroute update`      | Провери или примени ажурирања за OmniRoute                                  |
| `omniroute provider`    | Управљај везама добављача — додај, прикажи, уклони, тестирај, подразумевано |
| `omniroute --port 3000` | Постави канонски/API порт на 3000                                           |
| `omniroute --mcp`       | Покрени MCP сервер (stdio транспорт)                                        |
| `omniroute --no-open`   | Не отварај прегледач аутоматски                                             |
| `omniroute --help`      | Прикажи помоћ                                                               |

Подешавање без графичког интерфејса може се аутоматизовати опцијама или променљивама окружења:

```bash
omniroute setup --non-interactive --password "$OMNIROUTE_PASSWORD"
omniroute setup --non-interactive --add-provider --provider openai --api-key "$OPENAI_API_KEY"
omniroute setup --non-interactive --add-provider --provider openai --api-key "$OPENAI_API_KEY" --test-provider
```

Покрените локалну дијагностику без отварања контролне табле:

```bash
omniroute doctor
omniroute doctor --json
omniroute doctor --no-liveness
```

Управљајте добављачима преко SSH-а или скрипти без отварања контролне табле:

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

## Конфигурација CLI алата

### 1) Повежите добављаче и направите API кључ

1. Отворите контролну таблу → `Providers` и повежите најмање једног добављача (OAuth или API кључ).
2. Отворите контролну таблу → `Endpoints` и направите API кључ.
3. (Опционално) Отворите контролну таблу → `Combos` и подесите свој резервни ланац.

### 2) Усмерите свој алат за програмирање

```txt
Основни URL: http://localhost:20128/v1
API кључ:    [копирајте са странице Endpoint]
Модел:       if/qwen3.8-max-preview (или било који префикс добављача/модела)
```

Ако ваш уређивач не може да пошаље `Authorization: Bearer ...`, уместо тога користите токенизовану компатибилну основну адресу:

```txt
Основни URL: http://localhost:20128/api/v1/vscode/YOUR_KEY/
URL модела: http://localhost:20128/api/v1/vscode/YOUR_KEY/models
URL ћаскања: http://localhost:20128/api/v1/vscode/YOUR_KEY/chat/completions
URL Ollama ознака: http://localhost:20128/api/v1/vscode/YOUR_KEY/api/tags
```

Ради са алатима Claude Code, Codex CLI, Cursor, Cline, OpenClaw, OpenCode и SDK-овима компатибилним са OpenAI-јем.

#### Аутоматска конфигурација помоћу `setup-*`

Уместо ручног уношења основне URL адресе и кључа, дозволите OmniRoute-у да запише засебну конфигурацију сваког алата на основу активног каталога модела. По једна команда за сваки алат:

```bash
omniroute setup-codex        # профили у ~/.codex/<name>.config.toml
omniroute setup-claude       # ~/.claude/profiles/<name>/settings.json
omniroute setup-opencode     # ~/.config/opencode/opencode.json (компатибилно са OpenAI-јем)
omniroute setup-cline        # подешавања за Cline CLI + VS Code проширење
omniroute setup-kilo         # Kilo Code
omniroute setup-continue     # ~/.continue/config.yaml (Continue / cn)
omniroute setup-cursor       # приказује кораке унутар апликације Cursor
omniroute setup-roo          # Roo Code увоз + autoImport показивач
omniroute setup-crush        # ~/.config/crush/crush.json
omniroute setup-goose        # ~/.config/goose/config.yaml
omniroute setup-aider        # ~/.aider.conf.yml
omniroute setup-qwen         # ~/.qwen/settings.json + ~/.qwen/.env
```

Свака команда прихвата `--remote <url> --api-key <key>` за конфигурисање локалног алата за рад са **удаљеним** OmniRoute-ом, као и `--dry-run` за преглед. Да бисте покренули CLI са уметнутим одговарајућим окружењем, без икаквог уписивања конфигурације, користите генерички покретач `omniroute run <target>` (claude, codex, aider, goose, opencode, qwen, gemini); старији покретачи за појединачне алате `omniroute launch` (Claude Code) и `omniroute launch-codex` (Codex) и даље су доступни.

За комплетну табелу (шта свака команда уписује, све опције, локални наспрам удаљеног режима, конвенције основног URL-а `/v1`) погледајте **[CLI интеграције](./CLI-INTEGRATIONS.md)**.

За детаљну конфигурацију појединачних алата (Claude Code, Codex CLI, Cursor, Cline, OpenClaw, Kilo Code, Copilot и други) погледајте наменски **[Водич за CLI алате](../reference/CLI-TOOLS.md)**.

---

## Подешавање протокола (MCP + A2A)

### Подешавање MCP-а (Model Context Protocol)

Покрените MCP транспорт у stdio режиму:

```bash
omniroute --mcp
```

Препоручени поступак провере:

```bash
# 1. Покрените MCP сервер
omniroute --mcp

# 2. Из свог MCP клијента позовите:
omniroute_get_health        # Требало би да врати стање система
omniroute_list_combos       # Требало би да врати активне комбинације

# 3. Или покрените комплетан E2E пакет:
npm run test:protocols:e2e
```

#### Конфигурација MCP клијента

**Claude Code:**

```bash
claude mcp add-server omniroute --type http --url http://localhost:20128/api/mcp/stream
```

**Cursor / Cline:**

Додајте у своја MCP подешавања:

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

**Комплетна MCP документација:** [README MCP сервера](../../open-sse/mcp-server/README.md) — 110 алата, IDE конфигурације, Python/TS/Go клијенти.

### Подешавање A2A протокола (Agent-to-Agent Protocol)

Проверите картицу агента:

```bash
curl http://localhost:20128/.well-known/agent.json
```

Пошаљите задатак:

```bash
curl -X POST http://localhost:20128/a2a \
  -H 'content-type: application/json' \
  -d '{"jsonrpc":"2.0","id":"quickstart","method":"message/send","params":{"skill":"quota-management","messages":[{"role":"user","content":"Give me a short quota summary."}]}}'
```

**Комплетна A2A документација:** [README A2A сервера](../../src/lib/a2a/README.md) — JSON-RPC 2.0, вештине, стримовање, животни циклус задатка.

---

## Конфигурација временских ограничења

### Основна временска ограничења

За већину примена потребне су вам само ове две променљиве:

| Променљива               | Подразумевано                  | Намена                                                                                                                                                                                               |
| ------------------------ | ------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `REQUEST_TIMEOUT_MS`     | `600000`                       | Заједничка основна вредност за временско ограничење почетка одговора узводног сервера, скривена Undici временска ограничења, захтеве за TLS отисак и временска ограничења захтева/проксија API моста |
| `STREAM_IDLE_TIMEOUT_MS` | наслеђује `REQUEST_TIMEOUT_MS` | Највећи дозвољени размак између делова стрима пре него што OmniRoute прекине SSE стрим                                                                                                               |

Компатибилност са претходним верзијама је очувана: постојеће променљиве `FETCH_TIMEOUT_MS`, `API_BRIDGE_PROXY_TIMEOUT_MS` и друге променљиве временских ограничења по слојевима и даље функционишу и имају предност у односу на заједничку основну вредност.

### Напомене специфичне за добављаче

За узводне сервисе компатибилне са Claude Code-ом (`anthropic-compatible-cc-*`), OmniRoute изводи одлазно заглавље `X-Stainless-Timeout` из разрешеног временског ограничења преузимања, тако да временска ограничења читања на страни добављача остану усклађена са вашом конфигурацијом окружења.

За независне обрнуте проксије компатибилне са Claude Code-ом, OmniRoute задржава конзервативан подразумевани скуп `anthropic-beta` и, када је `Client Cache Control` остављен на `Auto`, прослеђује само ознаке `cache_control` које је задао клијент. Омогућите прекидач „Enable redact-thinking beta“ за појединачну везу само када узводни сервис изричито захтева Claude стримове размишљања са редигованим садржајем.

### Напредно замењивање временских ограничења

| Променљива                               | Подразумевано                               | Намена                                                                                                |
| ---------------------------------------- | ------------------------------------------- | ----------------------------------------------------------------------------------------------------- |
| `FETCH_TIMEOUT_MS`                       | наслеђује `REQUEST_TIMEOUT_MS`              | Временско ограничење почетка одговора узводног сервера које се примењује до пријема заглавља одговора |
| `FETCH_HEADERS_TIMEOUT_MS`               | наслеђује `FETCH_TIMEOUT_MS`                | Undici временско ограничење за пријем заглавља одговора узводног сервера                              |
| `FETCH_BODY_TIMEOUT_MS`                  | наслеђује `FETCH_TIMEOUT_MS`                | Undici временско ограничење између делова тела одговора узводног сервера (`0` га онемогућава)         |
| `FETCH_CONNECT_TIMEOUT_MS`               | `30000`                                     | Undici временско ограничење за успостављање TCP везе                                                  |
| `FETCH_KEEPALIVE_TIMEOUT_MS`             | `4000`                                      | Undici временско ограничење неактивности keep-alive сокета                                            |
| `TLS_CLIENT_TIMEOUT_MS`                  | наслеђује `FETCH_TIMEOUT_MS`                | Временско ограничење за захтеве за TLS отисак упућене преко `wreq-js`                                 |
| `API_BRIDGE_PROXY_TIMEOUT_MS`            | наслеђује `REQUEST_TIMEOUT_MS` или `600000` | Временско ограничење за прокси прослеђивање `/v1` са API порта на порт контролне табле                |
| `API_BRIDGE_SERVER_REQUEST_TIMEOUT_MS`   | `max(API_BRIDGE_PROXY_TIMEOUT_MS, 300000)`  | Временско ограничење долазног захтева на серверу API моста                                            |
| `API_BRIDGE_SERVER_HEADERS_TIMEOUT_MS`   | `60000`                                     | Временско ограничење долазних заглавља на серверу API моста                                           |
| `API_BRIDGE_SERVER_KEEPALIVE_TIMEOUT_MS` | `5000`                                      | Keep-alive временско ограничење на серверу API моста                                                  |
| `API_BRIDGE_SERVER_SOCKET_TIMEOUT_MS`    | `0`                                         | Временско ограничење неактивности сокета на серверу API моста (`0` га онемогућава)                    |

> **Напомена:** За захтеве са стримовањем, `FETCH_TIMEOUT_MS` покрива само успостављање везе / чекање на први одговор узводног сервера. Када стрим постане активан, OmniRoute ће га прекинути само у случају стварног застоја (`STREAM_IDLE_TIMEOUT_MS`) или неактивности Undici тела (`FETCH_BODY_TIMEOUT_MS`).

### Компатибилност са обрнутим проксијем

Ако OmniRoute покрећете иза Nginx-а, Caddy-ја, Cloudflare-а или другог обрнутог проксија, уверите се да су временска ограничења проксија такође већа од временских ограничења OmniRoute стрима/преузимања.

---

## Режим одвојених портова

Покрените API и контролну таблу на одвојеним портовима за напредне сценарије (обрнути прокси, умрежавање контејнера):

```bash
PORT=20128 DASHBOARD_PORT=20129 omniroute
# API:              http://localhost:20128/v1
# Контролна табла:  http://localhost:20129
```

---

## Шаблон за Void Linux (xbps-src)

Корисници Void Linux-а могу да направе изворни пакет користећи `xbps-src`. Сачувајте овај блок као `srcpkgs/omniroute/template`:

```bash
# Датотека шаблона за 'omniroute'
pkgname=omniroute
version=3.8.0
revision=1
hostmakedepends="nodejs python3 make"
depends="openssl"
short_desc="Универзални AI мрежни пролаз са паметним усмеравањем за више LLM добављача"
maintainer="zenobit <zenobit@disroot.org>"
license="MIT"
homepage="https://github.com/diegosouzapw/OmniRoute"
distfiles="https://github.com/diegosouzapw/OmniRoute/archive/refs/tags/v${version}.tar.gz"
# Поново генеришите контролну суму за свако издање помоћу:
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

## Деинсталација

| Команда                  | Радња                                                                                              |
| ------------------------ | -------------------------------------------------------------------------------------------------- |
| `npm run uninstall`      | Уклања системску апликацију, али **задржава вашу базу података и конфигурације** у `~/.omniroute`. |
| `npm run uninstall:full` | Уклања апликацију И трајно **брише све конфигурације, кључеве и базе података**.                   |

> Детаљна упутства за деинсталацију за све методе потражите у [UNINSTALL.md](./UNINSTALL.md).
