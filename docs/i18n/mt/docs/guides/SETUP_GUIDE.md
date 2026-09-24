# 📖 Setup Guide — OmniRoute (Malti)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/SETUP_GUIDE.md) · 🇪🇹 [am](../../../am/docs/guides/SETUP_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/guides/SETUP_GUIDE.md) · 🇦🇿 [az](../../../az/docs/guides/SETUP_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/guides/SETUP_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/guides/SETUP_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/guides/SETUP_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/guides/SETUP_GUIDE.md) · 🇩🇰 [da](../../../da/docs/guides/SETUP_GUIDE.md) · 🇩🇪 [de](../../../de/docs/guides/SETUP_GUIDE.md) · 🇬🇷 [el](../../../el/docs/guides/SETUP_GUIDE.md) · 🇪🇸 [es](../../../es/docs/guides/SETUP_GUIDE.md) · 🇪🇪 [et](../../../et/docs/guides/SETUP_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/guides/SETUP_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/guides/SETUP_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/guides/SETUP_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/guides/SETUP_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/guides/SETUP_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/guides/SETUP_GUIDE.md) · 🇮🇱 [he](../../../he/docs/guides/SETUP_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/guides/SETUP_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/guides/SETUP_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/guides/SETUP_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/guides/SETUP_GUIDE.md) · 🇮🇩 [id](../../../id/docs/guides/SETUP_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/guides/SETUP_GUIDE.md) · 🇮🇹 [it](../../../it/docs/guides/SETUP_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/guides/SETUP_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/guides/SETUP_GUIDE.md) · 🇰🇭 [km](../../../km/docs/guides/SETUP_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/guides/SETUP_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/guides/SETUP_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/guides/SETUP_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/guides/SETUP_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/guides/SETUP_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/guides/SETUP_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/guides/SETUP_GUIDE.md) · 🇲🇲 [my](../../../my/docs/guides/SETUP_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/guides/SETUP_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/guides/SETUP_GUIDE.md) · 🇳🇴 [no](../../../no/docs/guides/SETUP_GUIDE.md) · 🇮🇳 [or](../../../or/docs/guides/SETUP_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/guides/SETUP_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/guides/SETUP_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/guides/SETUP_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/guides/SETUP_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/SETUP_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/guides/SETUP_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/guides/SETUP_GUIDE.md) · 🇱🇰 [si](../../../si/docs/guides/SETUP_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/guides/SETUP_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/guides/SETUP_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/guides/SETUP_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/guides/SETUP_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/guides/SETUP_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/guides/SETUP_GUIDE.md) · 🇮🇳 [te](../../../te/docs/guides/SETUP_GUIDE.md) · 🇹🇭 [th](../../../th/docs/guides/SETUP_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/guides/SETUP_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/SETUP_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/guides/SETUP_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/guides/SETUP_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/guides/SETUP_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/guides/SETUP_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/SETUP_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/SETUP_GUIDE.md)

---

> Referenza kompleta għall-konfigurazzjoni ta’ OmniRoute. Għall-verżjoni ta’ malajr, ara l-[Bidu Rapidu fir-README](../README.md#-quick-start).

## Werrej

- [Metodi ta’ Installazzjoni](#install-methods)
- [Konfigurazzjoni tal-Għodda CLI](#cli-tool-configuration)
- [Konfigurazzjoni tal-Protokolli (MCP + A2A)](#protocol-setup-mcp--a2a)
- [Konfigurazzjoni tal-Limitu ta’ Żmien](#timeout-configuration)
- [Modalità b’Ports Separati](#split-port-mode)
- [Void Linux (xbps-src)](#void-linux-xbps-src-template)
- [Diżinstallazzjoni](#uninstalling)

---

## Metodi ta’ Installazzjoni

### npm (rakkomandat)

```bash
npm install -g omniroute
omniroute
```

Id-dashboard jinfetaħ fuq `http://localhost:20128` u l-URL bażi tal-API huwa `http://localhost:20128/v1`.

### pnpm

```bash
pnpm add -g omniroute@latest --allow-build=better-sqlite3 --allow-build=@swc/core
omniroute
```

> **Utenti ta’ pnpm:** il-flag `--allow-build` huwa meħtieġ biex jippermetti l-iskripts nattivi tal-build għal `better-sqlite3` u `@swc/core`. Il-kmand `pnpm approve-builds -g` mhuwiex appoġġjat għal installazzjonijiet globali fuq pnpm v11.

### Arch Linux (AUR)

```bash
yay -S omniroute-bin
systemctl --user enable --now omniroute.service
```

Il-[pakkett AUR](https://aur.archlinux.org/packages/omniroute-bin) jinstalla OmniRoute u jipprovdi servizz systemd għall-utent.

### Mill-Kodiċi Sors

```bash
npm install
PORT=20128 DASHBOARD_PORT=20129 NEXT_PUBLIC_BASE_URL=http://localhost:20129 npm run dev
```

> **Nota għal Windows:** B’mod awtomatiku, OmniRoute juża `%APPDATA%\omniroute` meta d-direttorju antik `%USERPROFILE%\.omniroute` ma jkunx preżenti. Issettja `DATA_DIR` biex tagħżel post differenti għad-direttorju tad-data.

> **Nota:** `npm install` jiġġenera `.env` awtomatikament minn `.env.example` mal-ewwel tħaddim. Installazzjonijiet sussegwenti ma jissostitwixxux fajl `.env` eżistenti, għalhekk il-personalizzazzjonijiet jiġu ppreservati. Biex terġa’ toħloqu mill-bidu, ħassar `.env` qabel terġa’ tħaddem il-kmand.

### Docker

Ara l-[Gwida ta’ Docker](./DOCKER_GUIDE.md) għall-konfigurazzjoni kompleta ta’ Docker, inklużi l-profili ta’ Compose u Caddy HTTPS.

### Applikazzjoni tad-Desktop (Electron)

OmniRoute jinkludi wrapper tad-desktop mibni fuq Electron 41 + electron-builder 26.10. Skripts disponibbli (fl-għerq tal-workspace):

```bash
npm run electron:dev          # Ħaddem id-desktop b’hot-reload
npm run electron:build        # Ibni għas-sistema operattiva attwali (identifikata awtomatikament)
npm run electron:build:win    # Installatur għal Windows (NSIS + portabbli)
npm run electron:build:mac    # macOS (dmg + zip, arm64+x64)
npm run electron:build:linux  # Linux (AppImage + deb + rpm)
npm run electron:smoke:packaged  # Wettaq smoke test fuq il-build ippakkjat
```

Ir-rilaxxi tal-installaturi tad-desktop huma mehmuża mal-GitHub Releases. Għal analiżi dettaljata u kompleta ta’ Electron (iffirmar, bridge IPC, distribuzzjonijiet), ara [`ELECTRON_GUIDE.md`](./ELECTRON_GUIDE.md) _(maħluq fi stadju aktar tard)_.

### Server headless (CI/awtomatizzazzjoni)

Għal konfigurazzjonijiet mhux assistiti (Docker, Kubernetes, CI), uża:

```bash
omniroute setup --non-interactive
omniroute providers test-batch
```

Flimkien ma’ varjabbli tal-ambjent (`INITIAL_PASSWORD`, `OMNIROUTE_WS_BRIDGE_SECRET`, eċċ.), dan jippermettilek tibda istanza ta’ OmniRoute li tista’ tiġi kkontrollata kompletament permezz ta’ skripts.

### Għażliet tas-CLI

| Kmand                   | Deskrizzjoni                                                                                  |
| ----------------------- | --------------------------------------------------------------------------------------------- |
| `omniroute`             | Ibda s-server (`PORT=20128`, l-API u d-dashboard fuq l-istess port)                           |
| `omniroute setup`       | Introduzzjoni ggwidata mis-CLI għall-password u l-ewwel fornitur                              |
| `omniroute doctor`      | Wettaq kontrolli lokali tas-saħħa mingħajr ma tibda s-server                                  |
| `omniroute providers`   | Sib, elenka, ivvalida u ttestja l-fornituri mis-CLI                                           |
| `omniroute config`      | Konfigurazzjoni tal-għodda CLI — elenka, aqra, issettja u vvalida configs                     |
| `omniroute status`      | Dashboard tal-istatus offline — verżjoni, DB, għodod, konfigurazzjoni                         |
| `omniroute logs`        | Uri l-logs tal-użu mill-API f’ħin reali (jappoġġja `--follow`)                                |
| `omniroute update`      | Iċċekkja għal aġġornamenti ta’ OmniRoute jew applikahom                                       |
| `omniroute provider`    | Immaniġġja l-konnessjonijiet tal-fornituri — żid, elenka, neħħi, ittestja, issettja l-default |
| `omniroute --port 3000` | Issettja l-port kanoniku/tal-API għal 3000                                                    |
| `omniroute --mcp`       | Ibda s-server MCP (trasport stdio)                                                            |
| `omniroute --no-open`   | Tiftaħx il-browser awtomatikament                                                             |
| `omniroute --help`      | Uri l-għajnuna                                                                                |

Il-konfigurazzjoni headless tista’ tiġi awtomatizzata bi flags jew b’varjabbli tal-ambjent:

```bash
omniroute setup --non-interactive --password "$OMNIROUTE_PASSWORD"
omniroute setup --non-interactive --add-provider --provider openai --api-key "$OPENAI_API_KEY"
omniroute setup --non-interactive --add-provider --provider openai --api-key "$OPENAI_API_KEY" --test-provider
```

Ħaddem dijanjostiċi lokali mingħajr ma tiftaħ id-dashboard:

```bash
omniroute doctor
omniroute doctor --json
omniroute doctor --no-liveness
```

Immaniġġja l-fornituri minn SSH jew minn skripts mingħajr ma tiftaħ id-dashboard:

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

## Konfigurazzjoni tal-Għodda CLI

### 1) Qabbad il-Fornituri u Oħloq Ċavetta API

1. Iftaħ id-Dashboard → `Providers` u qabbad mill-inqas fornitur wieħed (OAuth jew ċavetta API).
2. Iftaħ id-Dashboard → `Endpoints` u oħloq ċavetta API.
3. (Mhux obbligatorju) Iftaħ id-Dashboard → `Combos` u ssettja l-katina ta’ riżerva tiegħek.

### 2) Ipponta l-Għodda tal-Kodifikazzjoni Tiegħek

```txt
URL Bażi: http://localhost:20128/v1
Ċavetta API:  [ikkopja mill-paġna Endpoint]
Mudell:    if/qwen3.8-max-preview (jew kwalunkwe prefiss fornitur/mudell)
```

Jekk l-editur tiegħek ma jistax jibgħat `Authorization: Bearer ...`, uża minflok il-bażi ta’ kompatibbiltà bit-token:

```txt
URL Bażi: http://localhost:20128/api/v1/vscode/YOUR_KEY/
URL tal-Mudelli: http://localhost:20128/api/v1/vscode/YOUR_KEY/models
URL taċ-Chat: http://localhost:20128/api/v1/vscode/YOUR_KEY/chat/completions
URL tat-Tags ta’ Ollama: http://localhost:20128/api/v1/vscode/YOUR_KEY/api/tags
```

Jaħdem ma’ Claude Code, Codex CLI, Cursor, Cline, OpenClaw, OpenCode, u SDKs kompatibbli ma’ OpenAI.

#### Ikkonfigura awtomatikament b’`setup-*`

Minflok twaħħal il-URL bażi u ċ-ċavetta manwalment, ħalli lil OmniRoute jikteb il-konfigurazzjoni
proprja ta’ kull għodda mill-katalgu tal-mudelli attiv. Kmand wieħed għal kull għodda:

```bash
omniroute setup-codex        # profili ~/.codex/<name>.config.toml
omniroute setup-claude       # ~/.claude/profiles/<name>/settings.json
omniroute setup-opencode     # ~/.config/opencode/opencode.json (kompatibbli ma’ OpenAI)
omniroute setup-cline        # Cline CLI + settings tal-estensjoni ta’ VS Code
omniroute setup-kilo         # Kilo Code
omniroute setup-continue     # ~/.continue/config.yaml (Continue / cn)
omniroute setup-cursor       # jistampa l-passi fl-app ta’ Cursor
omniroute setup-roo          # importazzjoni ta’ Roo Code + pointer autoImport
omniroute setup-crush        # ~/.config/crush/crush.json
omniroute setup-goose        # ~/.config/goose/config.yaml
omniroute setup-aider        # ~/.aider.conf.yml
omniroute setup-qwen         # ~/.qwen/settings.json + ~/.qwen/.env
```

Kull wieħed jaċċetta `--remote <url> --api-key <key>` biex jikkonfigura għodda lokali ma’
OmniRoute **remot**, flimkien ma’ `--dry-run` għal previżjoni. Biex tħaddem CLI bl-env
ittrasmess b’mod korrett u mingħajr ma tinkiteb ebda konfigurazzjoni, uża l-launcher ġeneriku
`omniroute run <target>` (claude, codex, aider, goose, opencode, qwen, gemini);
il-launchers preċedenti għal kull għodda `omniroute launch` (Claude Code) u
`omniroute launch-codex` (Codex) għadhom disponibbli.

Għat-tabella sħiħa (x’jikteb kull kmand, kull flag, lokali kontra remot, il-konvenzjonijiet tal-URL
bażi `/v1`), ara **[Integrazzjonijiet CLI](./CLI-INTEGRATIONS.md)**.

Għal konfigurazzjoni dettaljata għal kull għodda (Claude Code, Codex CLI, Cursor, Cline, OpenClaw, Kilo Code, Copilot, u aktar), ara l-**[Gwida għall-Għodod CLI](../reference/CLI-TOOLS.md)** iddedikata.

---

## Konfigurazzjoni tal-Protokolli (MCP + A2A)

### Konfigurazzjoni tal-MCP (Model Context Protocol)

Ibda t-trasport MCP fil-modalità stdio:

```bash
omniroute --mcp
```

Fluss ta’ validazzjoni rakkomandat:

```bash
# 1. Ibda s-server MCP
omniroute --mcp

# 2. Mill-klijent MCP tiegħek, sejjaħ:
omniroute_get_health        # Għandu jirritorna l-istat tas-sistema
omniroute_list_combos       # Għandu jirritorna l-combos attivi

# 3. Jew ħaddem is-suite E2E sħiħa:
npm run test:protocols:e2e
```

#### Konfigurazzjoni tal-Klijent MCP

**Claude Code:**

```bash
claude mcp add-server omniroute --type http --url http://localhost:20128/api/mcp/stream
```

**Cursor / Cline:**

Żid dan mas-settings tal-MCP tiegħek:

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

**Dokumentazzjoni sħiħa tal-MCP:** [README tas-Server MCP](../../open-sse/mcp-server/README.md) — 110 għodod, konfigurazzjonijiet tal-IDE, klijenti Python/TS/Go.

### Konfigurazzjoni tal-A2A (Agent-to-Agent Protocol)

Ivverifika l-Agent Card:

```bash
curl http://localhost:20128/.well-known/agent.json
```

Ibgħat kompitu:

```bash
curl -X POST http://localhost:20128/a2a \
  -H 'content-type: application/json' \
  -d '{"jsonrpc":"2.0","id":"quickstart","method":"message/send","params":{"skill":"quota-management","messages":[{"role":"user","content":"Agħtini sommarju qasir tal-kwota."}]}}'
```

**Dokumentazzjoni sħiħa tal-A2A:** [README tas-Server A2A](../../src/lib/a2a/README.md) — JSON-RPC 2.0, ħiliet, streaming, ċiklu tal-ħajja tal-kompiti.

---

## Konfigurazzjoni tat-Timeout

### Timeouts Bażiċi

Għall-biċċa l-kbira tad-deployments, għandek bżonn biss dawn iż-żewġ varjabbli:

| Varjabbli                | Valur predefinit           | Għan                                                                                                                                                                       |
| ------------------------ | -------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `REQUEST_TIMEOUT_MS`     | `600000`                   | Bażi komuni għat-timeout tal-bidu tar-rispons upstream, it-timeouts moħbija ta’ Undici, it-talbiet tal-marki tas-swaba’ TLS, u t-timeouts tat-talbiet/proxy tal-API bridge |
| `STREAM_IDLE_TIMEOUT_MS` | jiret `REQUEST_TIMEOUT_MS` | L-intervall massimu bejn biċċiet tal-istreaming qabel ma OmniRoute jwaqqaf l-istream SSE                                                                                   |

Il-kompatibbiltà retroattiva tinżamm: `FETCH_TIMEOUT_MS`, `API_BRIDGE_PROXY_TIMEOUT_MS`, u varjabbli oħra tat-timeout għal kull saff li diġà jeżistu jibqgħu jaħdmu u jieħdu preċedenza fuq il-valur bażi komuni.

### Noti Speċifiċi għall-Provider

Għal servizzi upstream kompatibbli ma’ Claude Code (`anthropic-compatible-cc-*`), OmniRoute joħloq l-header `X-Stainless-Timeout` tal-ħruġ mit-timeout tal-fetch riżolt sabiex it-timeouts tal-qari min-naħa tal-provider jibqgħu allinjati mal-konfigurazzjoni tal-env tiegħek.

Għal reverse proxies ta’ partijiet terzi kompatibbli ma’ Claude Code, OmniRoute jżomm is-sett predefinit `anthropic-beta` konservattiv u, meta `Client Cache Control` jitħalla fuq `Auto`, jgħaddi biss il-markaturi `cache_control` ipprovduti mill-klijent. Attiva t-toggle "Enable redact-thinking beta" għal kull konnessjoni biss meta s-servizz upstream ikun jeħtieġ b’mod speċifiku streams tal-ħsieb redattati ta’ Claude.

### Overrides Avvanzati tat-Timeout

| Varjabbli                                | Valur predefinit                           | Għan                                                                                 |
| ---------------------------------------- | ------------------------------------------ | ------------------------------------------------------------------------------------ |
| `FETCH_TIMEOUT_MS`                       | jiret `REQUEST_TIMEOUT_MS`                 | Timeout tal-bidu tar-rispons upstream użat sakemm jaslu l-headers tar-rispons        |
| `FETCH_HEADERS_TIMEOUT_MS`               | jiret `FETCH_TIMEOUT_MS`                   | Limitu ta’ żmien ta’ Undici biex jirċievi l-headers tar-rispons upstream             |
| `FETCH_BODY_TIMEOUT_MS`                  | jiret `FETCH_TIMEOUT_MS`                   | Limitu ta’ żmien ta’ Undici bejn il-biċċiet tal-body upstream (`0` jiddiżattivah)    |
| `FETCH_CONNECT_TIMEOUT_MS`               | `30000`                                    | Timeout tal-konnessjoni TCP ta’ Undici                                               |
| `FETCH_KEEPALIVE_TIMEOUT_MS`             | `4000`                                     | Timeout tas-socket keep-alive inattiv ta’ Undici                                     |
| `TLS_CLIENT_TIMEOUT_MS`                  | jiret `FETCH_TIMEOUT_MS`                   | Timeout għat-talbiet tal-marki tas-swaba’ TLS magħmula permezz ta’ `wreq-js`         |
| `API_BRIDGE_PROXY_TIMEOUT_MS`            | jiret `REQUEST_TIMEOUT_MS` jew `600000`    | Timeout għat-trażmissjoni tal-proxy `/v1` mill-port tal-API għall-port tad-dashboard |
| `API_BRIDGE_SERVER_REQUEST_TIMEOUT_MS`   | `max(API_BRIDGE_PROXY_TIMEOUT_MS, 300000)` | Timeout tat-talbiet deħlin fuq is-server tal-API bridge                              |
| `API_BRIDGE_SERVER_HEADERS_TIMEOUT_MS`   | `60000`                                    | Timeout tal-headers deħlin fuq is-server tal-API bridge                              |
| `API_BRIDGE_SERVER_KEEPALIVE_TIMEOUT_MS` | `5000`                                     | Timeout tal-keep-alive fuq is-server tal-API bridge                                  |
| `API_BRIDGE_SERVER_SOCKET_TIMEOUT_MS`    | `0`                                        | Timeout tal-inattività tas-socket fuq is-server tal-API bridge (`0` jiddiżattivah)   |

> **Nota:** Għat-talbiet ta’ streaming, `FETCH_TIMEOUT_MS` ikopri biss l-istabbiliment tal-konnessjoni / l-istennija għall-ewwel rispons upstream. Ladarba l-istream ikun attiv, OmniRoute jwaqqfu biss jekk ikun hemm waqfien reali (`STREAM_IDLE_TIMEOUT_MS`) jew inattività tal-body ta’ Undici (`FETCH_BODY_TIMEOUT_MS`).

### Kompatibbiltà mar-Reverse Proxy

Jekk tħaddem OmniRoute wara Nginx, Caddy, Cloudflare, jew reverse proxy ieħor, kun żgur li t-timeouts tal-proxy jkunu wkoll ogħla mit-timeouts tal-istream/fetch ta’ OmniRoute.

---

## Modalità b'Portijiet Separati

Ħaddem l-API u d-Dashboard fuq portijiet separati għal xenarji avvanzati (reverse proxy, networking tal-kontejners):

```bash
PORT=20128 DASHBOARD_PORT=20129 omniroute
# API:       http://localhost:20128/v1
# Dashboard: http://localhost:20129
```

---

## Mudell għal Void Linux (xbps-src)

L-utenti ta' Void Linux jistgħu jibnu pakkett nattiv permezz ta' `xbps-src`. Issejvja din il-blokka bħala `srcpkgs/omniroute/template`:

```bash
# Fajl tal-mudell għal 'omniroute'
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
# Iġġenera mill-ġdid iċ-checksum għal kull rilaxx permezz ta':
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

## Diżinstallazzjoni

| Kmand                    | Azzjoni                                                                                                       |
| ------------------------ | ------------------------------------------------------------------------------------------------------------- |
| `npm run uninstall`      | Ineħħi l-applikazzjoni mis-sistema iżda **jżomm id-DB u l-konfigurazzjonijiet tiegħek** f'`~/.omniroute`.     |
| `npm run uninstall:full` | Ineħħi l-applikazzjoni U **jħassar b'mod permanenti l-konfigurazzjonijiet, iċ-ċwievet u d-databases kollha**. |

> Għal struzzjonijiet dettaljati dwar id-diżinstallazzjoni bil-metodi kollha, ara [UNINSTALL.md](./UNINSTALL.md).
