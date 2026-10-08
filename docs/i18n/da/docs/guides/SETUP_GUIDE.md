# 📖 Setup Guide — OmniRoute (Dansk)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/SETUP_GUIDE.md) · 🇪🇹 [am](../../../am/docs/guides/SETUP_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/guides/SETUP_GUIDE.md) · 🇦🇿 [az](../../../az/docs/guides/SETUP_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/guides/SETUP_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/guides/SETUP_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/guides/SETUP_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/guides/SETUP_GUIDE.md) · 🇩🇪 [de](../../../de/docs/guides/SETUP_GUIDE.md) · 🇬🇷 [el](../../../el/docs/guides/SETUP_GUIDE.md) · 🇪🇸 [es](../../../es/docs/guides/SETUP_GUIDE.md) · 🇪🇪 [et](../../../et/docs/guides/SETUP_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/guides/SETUP_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/guides/SETUP_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/guides/SETUP_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/guides/SETUP_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/guides/SETUP_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/guides/SETUP_GUIDE.md) · 🇮🇱 [he](../../../he/docs/guides/SETUP_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/guides/SETUP_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/guides/SETUP_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/guides/SETUP_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/guides/SETUP_GUIDE.md) · 🇮🇩 [id](../../../id/docs/guides/SETUP_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/guides/SETUP_GUIDE.md) · 🇮🇹 [it](../../../it/docs/guides/SETUP_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/guides/SETUP_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/guides/SETUP_GUIDE.md) · 🇰🇭 [km](../../../km/docs/guides/SETUP_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/guides/SETUP_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/guides/SETUP_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/guides/SETUP_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/guides/SETUP_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/guides/SETUP_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/guides/SETUP_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/guides/SETUP_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/guides/SETUP_GUIDE.md) · 🇲🇲 [my](../../../my/docs/guides/SETUP_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/guides/SETUP_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/guides/SETUP_GUIDE.md) · 🇳🇴 [no](../../../no/docs/guides/SETUP_GUIDE.md) · 🇮🇳 [or](../../../or/docs/guides/SETUP_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/guides/SETUP_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/guides/SETUP_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/guides/SETUP_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/guides/SETUP_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/SETUP_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/guides/SETUP_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/guides/SETUP_GUIDE.md) · 🇱🇰 [si](../../../si/docs/guides/SETUP_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/guides/SETUP_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/guides/SETUP_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/guides/SETUP_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/guides/SETUP_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/guides/SETUP_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/guides/SETUP_GUIDE.md) · 🇮🇳 [te](../../../te/docs/guides/SETUP_GUIDE.md) · 🇹🇭 [th](../../../th/docs/guides/SETUP_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/guides/SETUP_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/SETUP_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/guides/SETUP_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/guides/SETUP_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/guides/SETUP_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/guides/SETUP_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/SETUP_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/SETUP_GUIDE.md)

---

> Komplet opsætningsreference til OmniRoute. Se [Hurtig start i README](../README.md#-quick-start) for den korte version.

## Indholdsfortegnelse

- [Installationsmetoder](#install-methods)
- [Konfiguration af CLI-værktøj](#cli-tool-configuration)
- [Protokolopsætning (MCP + A2A)](#protocol-setup-mcp--a2a)
- [Konfiguration af timeout](#timeout-configuration)
- [Tilstand med separate porte](#split-port-mode)
- [Void Linux (xbps-src)](#void-linux-xbps-src-template)
- [Afinstallation](#uninstalling)

---

## Installationsmetoder

### npm (anbefalet)

```bash
npm install -g omniroute
omniroute
```

Dashboardet åbnes på `http://localhost:20128`, og API'ets basis-URL er `http://localhost:20128/v1`.

### pnpm

```bash
pnpm add -g omniroute@latest --allow-build=better-sqlite3 --allow-build=@swc/core
omniroute
```

> **pnpm-brugere:** Flaget `--allow-build` er påkrævet for at aktivere native build-scripts for `better-sqlite3` og `@swc/core`. Kommandoen `pnpm approve-builds -g` understøttes ikke til globale installationer på pnpm v11.

### Arch Linux (AUR)

```bash
yay -S omniroute-bin
systemctl --user enable --now omniroute.service
```

[AUR-pakken](https://aur.archlinux.org/packages/omniroute-bin) installerer OmniRoute og leverer en systemd-brugertjeneste.

### Fra kildekode

```bash
npm install
PORT=20128 DASHBOARD_PORT=20129 NEXT_PUBLIC_BASE_URL=http://localhost:20129 npm run dev
```

> **Bemærkning til Windows:** Som standard bruger OmniRoute `%APPDATA%\omniroute`, når den ældre mappe `%USERPROFILE%\.omniroute` ikke findes. Angiv `DATA_DIR` for at vælge en anden placering til datamappen.

> **Bemærk:** `npm install` genererer automatisk `.env` fra `.env.example` ved første kørsel. Efterfølgende installationer overskriver ikke en eksisterende `.env`, så tilpasninger bevares. Hvis du vil oprette den på ny, skal du slette `.env`, før du kører kommandoen igen.

### Docker

Se [Docker-vejledningen](./DOCKER_GUIDE.md) for en komplet Docker-opsætning, herunder Compose-profiler og Caddy HTTPS.

### Desktopapp (Electron)

OmniRoute leveres med en desktop-wrapper bygget på Electron 41 + electron-builder 26.10. Tilgængelige scripts (workspace-roden):

```bash
npm run electron:dev          # Kør desktopappen med hot-reload
npm run electron:build        # Byg til det aktuelle operativsystem (registreres automatisk)
npm run electron:build:win    # Windows-installationsprogram (NSIS + portabel)
npm run electron:build:mac    # macOS (dmg + zip, arm64+x64)
npm run electron:build:linux  # Linux (AppImage + deb + rpm)
npm run electron:smoke:packaged  # Smoke-test af pakket build
```

Udgivelser af desktop-installationsprogrammerne er vedhæftet GitHub Releases. Se [`ELECTRON_GUIDE.md`](./ELECTRON_GUIDE.md) for en komplet og dybdegående gennemgang af Electron (signering, IPC-bro, distributioner) _(oprettet i en senere fase)_.

### Headless-server (CI/automatisering)

Brug følgende til ubemandede opsætninger (Docker, Kubernetes, CI):

```bash
omniroute setup --non-interactive
omniroute providers test-batch
```

Kombineret med miljøvariabler (`INITIAL_PASSWORD`, `OMNIROUTE_WS_BRIDGE_SECRET` osv.) giver dette dig mulighed for at starte en OmniRoute-instans via et fuldt scriptbart forløb.

### CLI-indstillinger

| Kommando                | Beskrivelse                                                                |
| ----------------------- | -------------------------------------------------------------------------- |
| `omniroute`             | Start serveren (`PORT=20128`, API og dashboard på samme port)              |
| `omniroute setup`       | Guidet CLI-introduktion til adgangskode og første udbyder                  |
| `omniroute doctor`      | Kør lokale sundhedstjek uden at starte serveren                            |
| `omniroute providers`   | Find, vis, valider og test udbydere fra CLI'en                             |
| `omniroute config`      | Konfiguration af CLI-værktøj — vis, hent, angiv og valider konfigurationer |
| `omniroute status`      | Offline-statusdashboard — version, database, værktøjer, konfiguration      |
| `omniroute logs`        | Stream brugslogfiler fra API'et (understøtter `--follow`)                  |
| `omniroute update`      | Søg efter eller anvend OmniRoute-opdateringer                              |
| `omniroute provider`    | Administrer udbyderforbindelser — tilføj, vis, fjern, test, standard       |
| `omniroute --port 3000` | Angiv den kanoniske port/API-porten til 3000                               |
| `omniroute --mcp`       | Start MCP-serveren (stdio-transport)                                       |
| `omniroute --no-open`   | Åbn ikke browseren automatisk                                              |
| `omniroute --help`      | Vis hjælp                                                                  |

Headless-opsætning kan scriptes med flag eller miljøvariabler:

```bash
omniroute setup --non-interactive --password "$OMNIROUTE_PASSWORD"
omniroute setup --non-interactive --add-provider --provider openai --api-key "$OPENAI_API_KEY"
omniroute setup --non-interactive --add-provider --provider openai --api-key "$OPENAI_API_KEY" --test-provider
```

Kør lokal diagnosticering uden at åbne dashboardet:

```bash
omniroute doctor
omniroute doctor --json
omniroute doctor --no-liveness
```

Administrer udbydere via SSH eller scripts uden at åbne dashboardet:

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

## Konfiguration af CLI-værktøj

### 1) Tilslut udbydere, og opret en API-nøgle

1. Åbn Dashboard → `Providers`, og tilslut mindst én udbyder (OAuth eller API-nøgle).
2. Åbn Dashboard → `Endpoints`, og opret en API-nøgle.
3. (Valgfrit) Åbn Dashboard → `Combos`, og konfigurer din fallback-kæde.

### 2) Konfigurer dit kodeværktøj

```txt
Basis-URL: http://localhost:20128/v1
API-nøgle: [kopiér fra Endpoint-siden]
Model:     if/qwen3.8-max-preview (eller et vilkårligt udbyder-/modelpræfiks)
```

Hvis din editor ikke kan sende `Authorization: Bearer ...`, skal du i stedet bruge den tokeniserede kompatibilitetsbasis:

```txt
Basis-URL: http://localhost:20128/api/v1/vscode/YOUR_KEY/
Model-URL: http://localhost:20128/api/v1/vscode/YOUR_KEY/models
Chat-URL: http://localhost:20128/api/v1/vscode/YOUR_KEY/chat/completions
Ollama Tags-URL: http://localhost:20128/api/v1/vscode/YOUR_KEY/api/tags
```

Fungerer med Claude Code, Codex CLI, Cursor, Cline, OpenClaw, OpenCode og OpenAI-kompatible SDK'er.

#### Automatisk konfiguration med `setup-*`

I stedet for manuelt at indsætte basis-URL'en og nøglen kan du lade OmniRoute skrive hvert værktøjs
egen konfiguration ud fra det aktive modelkatalog. Én kommando pr. værktøj:

```bash
omniroute setup-codex        # ~/.codex/<name>.config.toml-profiler
omniroute setup-claude       # ~/.claude/profiles/<name>/settings.json
omniroute setup-opencode     # ~/.config/opencode/opencode.json (OpenAI-kompatibel)
omniroute setup-cline        # Indstillinger for Cline CLI + VS Code-udvidelsen
omniroute setup-kilo         # Kilo Code
omniroute setup-continue     # ~/.continue/config.yaml (Continue / cn)
omniroute setup-cursor       # udskriver trinnene i Cursor-appen
omniroute setup-roo          # Roo Code-import + autoImport-markør
omniroute setup-crush        # ~/.config/crush/crush.json
omniroute setup-goose        # ~/.config/goose/config.yaml
omniroute setup-aider        # ~/.aider.conf.yml
omniroute setup-qwen         # ~/.qwen/settings.json + ~/.qwen/.env
```

Hver kommando accepterer `--remote <url> --api-key <key>` til konfiguration af et lokalt værktøj mod en
**ekstern** OmniRoute samt `--dry-run` til forhåndsvisning. Hvis du vil starte en CLI med de korrekte
miljøvariabler indsat uden overhovedet at skrive en konfiguration, skal du bruge den generiske starter
`omniroute run <target>` (claude, codex, aider, goose, opencode, qwen, gemini);
de ældre værktøjsspecifikke startere `omniroute launch` (Claude Code) og
`omniroute launch-codex` (Codex) er fortsat tilgængelige.

Se **[CLI-integrationer](./CLI-INTEGRATIONS.md)** for den komplette tabel (hvad hver kommando skriver, alle flag, lokal kontra ekstern samt basis-URL-
`/v1`-konventioner).

Se den dedikerede **[vejledning til CLI-værktøjer](../reference/CLI-TOOLS.md)** for detaljeret konfiguration af hvert værktøj (Claude Code, Codex CLI, Cursor, Cline, OpenClaw, Kilo Code, Copilot med flere).

---

## Protokolkonfiguration (MCP + A2A)

### MCP-konfiguration (Model Context Protocol)

Start MCP-transporten i stdio-tilstand:

```bash
omniroute --mcp
```

Anbefalet valideringsforløb:

```bash
# 1. Start MCP-serveren
omniroute --mcp

# 2. Kald følgende fra din MCP-klient:
omniroute_get_health        # Bør returnere systemets tilstand
omniroute_list_combos       # Bør returnere aktive kombinationer

# 3. Eller kør hele E2E-testsuiten:
npm run test:protocols:e2e
```

#### Konfiguration af MCP-klient

**Claude Code:**

```bash
claude mcp add-server omniroute --type http --url http://localhost:20128/api/mcp/stream
```

**Cursor / Cline:**

Føj følgende til dine MCP-indstillinger:

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

**Komplet MCP-dokumentation:** [README til MCP-serveren](../../open-sse/mcp-server/README.md) — 110 værktøjer, IDE-konfigurationer samt Python-/TS-/Go-klienter.

### A2A-konfiguration (Agent-to-Agent Protocol)

Bekræft Agent Card:

```bash
curl http://localhost:20128/.well-known/agent.json
```

Send en opgave:

```bash
curl -X POST http://localhost:20128/a2a \
  -H 'content-type: application/json' \
  -d '{"jsonrpc":"2.0","id":"quickstart","method":"message/send","params":{"skill":"quota-management","messages":[{"role":"user","content":"Give me a short quota summary."}]}}'
```

**Komplet A2A-dokumentation:** [README til A2A-serveren](../../src/lib/a2a/README.md) — JSON-RPC 2.0, færdigheder, streaming og opgavers livscyklus.

---

## Konfiguration af timeouts

### Grundlæggende timeouts

Til de fleste installationer behøver du kun disse to variabler:

| Variabel                 | Standardværdi              | Formål                                                                                                                                                           |
| ------------------------ | -------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `REQUEST_TIMEOUT_MS`     | `600000`                   | Fælles udgangspunkt for timeout ved start af upstream-svar, skjulte Undici-timeouts, TLS-fingeraftryksanmodninger og timeouts for API-bridge-anmodninger/proxyer |
| `STREAM_IDLE_TIMEOUT_MS` | arver `REQUEST_TIMEOUT_MS` | Maksimalt mellemrum mellem streaming-segmenter, før OmniRoute afbryder SSE-streamen                                                                              |

Bagudkompatibiliteten er bevaret: eksisterende `FETCH_TIMEOUT_MS`, `API_BRIDGE_PROXY_TIMEOUT_MS` og andre timeoutvariabler for individuelle lag fungerer fortsat og tilsidesætter det fælles udgangspunkt.

### Providerspecifikke bemærkninger

For Claude Code-kompatible upstreams (`anthropic-compatible-cc-*`) udleder OmniRoute den udgående `X-Stainless-Timeout`-header fra den fastlagte hentningstimeout, så udbydersidens læsetimeouts forbliver afstemt med din miljøkonfiguration.

For Claude Code-kompatible reverse proxies fra tredjeparter holder OmniRoute standardsættet for `anthropic-beta` konservativt og videresender kun `cache_control`-markører fra klienten, når `Client Cache Control` står på `Auto`. Aktivér kun indstillingen "Enable redact-thinking beta" for den enkelte forbindelse, når upstreamen specifikt kræver redigerede Claude-tænkestrømme.

### Avancerede timeout-tilsidesættelser

| Variabel                                 | Standardværdi                              | Formål                                                                         |
| ---------------------------------------- | ------------------------------------------ | ------------------------------------------------------------------------------ |
| `FETCH_TIMEOUT_MS`                       | arver `REQUEST_TIMEOUT_MS`                 | Timeout ved start af upstream-svar, som anvendes, indtil svarheaderne ankommer |
| `FETCH_HEADERS_TIMEOUT_MS`               | arver `FETCH_TIMEOUT_MS`                   | Undici-tidsgrænse for modtagelse af upstream-svarheadere                       |
| `FETCH_BODY_TIMEOUT_MS`                  | arver `FETCH_TIMEOUT_MS`                   | Undici-tidsgrænse mellem upstream-body-segmenter (`0` deaktiverer den)         |
| `FETCH_CONNECT_TIMEOUT_MS`               | `30000`                                    | Undici-timeout for TCP-forbindelse                                             |
| `FETCH_KEEPALIVE_TIMEOUT_MS`             | `4000`                                     | Undici-timeout for inaktiv keep-alive-socket                                   |
| `TLS_CLIENT_TIMEOUT_MS`                  | arver `FETCH_TIMEOUT_MS`                   | Timeout for TLS-fingeraftryksanmodninger foretaget via `wreq-js`               |
| `API_BRIDGE_PROXY_TIMEOUT_MS`            | arver `REQUEST_TIMEOUT_MS` eller `600000`  | Timeout for `/v1`-proxyvideresendelse fra API-porten til dashboardporten       |
| `API_BRIDGE_SERVER_REQUEST_TIMEOUT_MS`   | `max(API_BRIDGE_PROXY_TIMEOUT_MS, 300000)` | Timeout for indgående anmodninger på API-bridge-serveren                       |
| `API_BRIDGE_SERVER_HEADERS_TIMEOUT_MS`   | `60000`                                    | Timeout for indgående headere på API-bridge-serveren                           |
| `API_BRIDGE_SERVER_KEEPALIVE_TIMEOUT_MS` | `5000`                                     | Keep-alive-timeout på API-bridge-serveren                                      |
| `API_BRIDGE_SERVER_SOCKET_TIMEOUT_MS`    | `0`                                        | Timeout for socketinaktivitet på API-bridge-serveren (`0` deaktiverer den)     |

> **Bemærk:** For streaminganmodninger dækker `FETCH_TIMEOUT_MS` kun opsætning af forbindelsen/ventetid på det første upstream-svar. Når streamen er aktiv, afbryder OmniRoute kun ved et reelt stop (`STREAM_IDLE_TIMEOUT_MS`) eller inaktivitet i Undici-bodyen (`FETCH_BODY_TIMEOUT_MS`).

### Kompatibilitet med reverse proxy

Hvis du kører OmniRoute bag Nginx, Caddy, Cloudflare eller en anden reverse proxy, skal du sørge for, at proxyens timeouts også er højere end dine stream-/hentningstimeouts i OmniRoute.

---

## Tilstand med separate porte

Kør API og Dashboard på separate porte til avancerede scenarier (reverse proxy, container-netværk):

```bash
PORT=20128 DASHBOARD_PORT=20129 omniroute
# API:       http://localhost:20128/v1
# Dashboard: http://localhost:20129
```

---

## Skabelon til Void Linux (xbps-src)

Void Linux-brugere kan bygge en oprindelig pakke ved hjælp af `xbps-src`. Gem denne blok som `srcpkgs/omniroute/template`:

```bash
# Skabelonfil til 'omniroute'
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
# Generér kontrolsummen igen for hver udgivelse med:
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

## Afinstallation

| Kommando                 | Handling                                                                                    |
| ------------------------ | ------------------------------------------------------------------------------------------- |
| `npm run uninstall`      | Fjerner systemappen, men **bevarer din database og dine konfigurationer** i `~/.omniroute`. |
| `npm run uninstall:full` | Fjerner appen OG **sletter alle konfigurationer, nøgler og databaser permanent**.           |

> Se [UNINSTALL.md](./UNINSTALL.md) for detaljerede afinstallationsinstruktioner for alle metoder.
