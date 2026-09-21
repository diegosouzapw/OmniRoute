# 📖 Setup Guide — OmniRoute (Norsk)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/SETUP_GUIDE.md) · 🇪🇹 [am](../../../am/docs/guides/SETUP_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/guides/SETUP_GUIDE.md) · 🇦🇿 [az](../../../az/docs/guides/SETUP_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/guides/SETUP_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/guides/SETUP_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/guides/SETUP_GUIDE.md) · 🇩🇰 [da](../../../da/docs/guides/SETUP_GUIDE.md) · 🇩🇪 [de](../../../de/docs/guides/SETUP_GUIDE.md) · 🇬🇷 [el](../../../el/docs/guides/SETUP_GUIDE.md) · 🇪🇸 [es](../../../es/docs/guides/SETUP_GUIDE.md) · 🇪🇪 [et](../../../et/docs/guides/SETUP_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/guides/SETUP_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/guides/SETUP_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/guides/SETUP_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/guides/SETUP_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/guides/SETUP_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/guides/SETUP_GUIDE.md) · 🇮🇱 [he](../../../he/docs/guides/SETUP_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/guides/SETUP_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/guides/SETUP_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/guides/SETUP_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/guides/SETUP_GUIDE.md) · 🇮🇩 [id](../../../id/docs/guides/SETUP_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/guides/SETUP_GUIDE.md) · 🇮🇹 [it](../../../it/docs/guides/SETUP_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/guides/SETUP_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/guides/SETUP_GUIDE.md) · 🇰🇭 [km](../../../km/docs/guides/SETUP_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/guides/SETUP_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/guides/SETUP_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/guides/SETUP_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/guides/SETUP_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/guides/SETUP_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/guides/SETUP_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/guides/SETUP_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/guides/SETUP_GUIDE.md) · 🇲🇲 [my](../../../my/docs/guides/SETUP_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/guides/SETUP_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/guides/SETUP_GUIDE.md) · 🇮🇳 [or](../../../or/docs/guides/SETUP_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/guides/SETUP_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/guides/SETUP_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/guides/SETUP_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/guides/SETUP_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/SETUP_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/guides/SETUP_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/guides/SETUP_GUIDE.md) · 🇱🇰 [si](../../../si/docs/guides/SETUP_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/guides/SETUP_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/guides/SETUP_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/guides/SETUP_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/guides/SETUP_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/guides/SETUP_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/guides/SETUP_GUIDE.md) · 🇮🇳 [te](../../../te/docs/guides/SETUP_GUIDE.md) · 🇹🇭 [th](../../../th/docs/guides/SETUP_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/guides/SETUP_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/SETUP_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/guides/SETUP_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/guides/SETUP_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/guides/SETUP_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/guides/SETUP_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/SETUP_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/SETUP_GUIDE.md)

---

> Fullstendig oppsettsreferanse for OmniRoute. For hurtigversjonen, se [Hurtigstart i README](../README.md#-quick-start).

## Innholdsfortegnelse

- [Installasjonsmetoder](#install-methods)
- [Konfigurasjon av CLI-verktøy](#cli-tool-configuration)
- [Protokolloppsett (MCP + A2A)](#protocol-setup-mcp--a2a)
- [Konfigurasjon av tidsavbrudd](#timeout-configuration)
- [Modus med delte porter](#split-port-mode)
- [Void Linux (xbps-src)](#void-linux-xbps-src-template)
- [Avinstallering](#uninstalling)

---

## Installasjonsmetoder

### npm (anbefalt)

```bash
npm install -g omniroute
omniroute
```

Kontrollpanelet åpnes på `http://localhost:20128`, og API-ens grunn-URL er `http://localhost:20128/v1`.

### pnpm

```bash
pnpm add -g omniroute@latest --allow-build=better-sqlite3 --allow-build=@swc/core
omniroute
```

> **pnpm-brukere:** Flagget `--allow-build` kreves for å aktivere opprinnelige byggeskript for `better-sqlite3` og `@swc/core`. Kommandoen `pnpm approve-builds -g` støttes ikke for globale installasjoner i pnpm v11.

### Arch Linux (AUR)

```bash
yay -S omniroute-bin
systemctl --user enable --now omniroute.service
```

[AUR-pakken](https://aur.archlinux.org/packages/omniroute-bin) installerer OmniRoute og leverer en systemd-brukertjeneste.

### Fra kildekode

```bash
npm install
PORT=20128 DASHBOARD_PORT=20129 NEXT_PUBLIC_BASE_URL=http://localhost:20129 npm run dev
```

> **Merknad for Windows:** OmniRoute bruker som standard `%APPDATA%\omniroute` når den eldre katalogen `%USERPROFILE%\.omniroute` ikke finnes. Angi `DATA_DIR` for å velge en annen plassering for datakatalogen.

> **Merk:** `npm install` genererer automatisk `.env` fra `.env.example` ved første kjøring. Senere installasjoner overskriver ikke en eksisterende `.env`, slik at tilpasninger bevares. Slett `.env` før du kjører kommandoen på nytt for å generere filen på nytt.

### Docker

Se [Docker-veiledningen](./DOCKER_GUIDE.md) for fullstendig Docker-oppsett, inkludert Compose-profiler og Caddy HTTPS.

### Skrivebordsapp (Electron)

OmniRoute leveres med en skrivebordsinnpakning bygget på Electron 41 + electron-builder 26.10. Tilgjengelige skript (arbeidsområdets rotkatalog):

```bash
npm run electron:dev          # Kjør skrivebordsappen med automatisk innlasting
npm run electron:build        # Bygg for gjeldende operativsystem (oppdages automatisk)
npm run electron:build:win    # Windows-installasjonsprogram (NSIS + portabel)
npm run electron:build:mac    # macOS (dmg + zip, arm64+x64)
npm run electron:build:linux  # Linux (AppImage + deb + rpm)
npm run electron:smoke:packaged  # Røyktest av pakket bygg
```

Utgivelser av installasjonsprogrammene for skrivebordsappen er vedlagt GitHub Releases. For en fullstendig gjennomgang av Electron (signering, IPC-bro, distribusjoner), se [`ELECTRON_GUIDE.md`](./ELECTRON_GUIDE.md) _(opprettet i en senere fase)_.

### Hodeløs server (CI/automatisering)

For ubetjente oppsett (Docker, Kubernetes, CI), bruk:

```bash
omniroute setup --non-interactive
omniroute providers test-batch
```

Kombinert med miljøvariabler (`INITIAL_PASSWORD`, `OMNIROUTE_WS_BRIDGE_SECRET` osv.) gjør dette det mulig å starte en OmniRoute-instans på en fullstendig skriptbar måte.

### CLI-alternativer

| Kommando                | Beskrivelse                                                               |
| ----------------------- | ------------------------------------------------------------------------- |
| `omniroute`             | Start serveren (`PORT=20128`, API og kontrollpanel på samme port)         |
| `omniroute setup`       | Veiledet CLI-introduksjon for passord og første leverandør                |
| `omniroute doctor`      | Kjør lokale helsesjekker uten å starte serveren                           |
| `omniroute providers`   | Finn, vis, valider og test leverandører fra CLI                           |
| `omniroute config`      | Konfigurasjon av CLI-verktøy — vis, hent, angi og valider konfigurasjoner |
| `omniroute status`      | Frakoblet statuspanel — versjon, database, verktøy og konfigurasjon       |
| `omniroute logs`        | Strøm brukslogger fra API-et (støtter `--follow`)                         |
| `omniroute update`      | Se etter eller ta i bruk OmniRoute-oppdateringer                          |
| `omniroute provider`    | Administrer leverandørtilkoblinger — legg til, vis, fjern, test, standard |
| `omniroute --port 3000` | Sett kanonisk port/API-port til 3000                                      |
| `omniroute --mcp`       | Start MCP-serveren (stdio-transport)                                      |
| `omniroute --no-open`   | Ikke åpne nettleseren automatisk                                          |
| `omniroute --help`      | Vis hjelp                                                                 |

Hodeløst oppsett kan skriptes med flagg eller miljøvariabler:

```bash
omniroute setup --non-interactive --password "$OMNIROUTE_PASSWORD"
omniroute setup --non-interactive --add-provider --provider openai --api-key "$OPENAI_API_KEY"
omniroute setup --non-interactive --add-provider --provider openai --api-key "$OPENAI_API_KEY" --test-provider
```

Kjør lokal diagnostikk uten å åpne kontrollpanelet:

```bash
omniroute doctor
omniroute doctor --json
omniroute doctor --no-liveness
```

Administrer leverandører fra SSH eller skript uten å åpne kontrollpanelet:

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

## Konfigurasjon av CLI-verktøy

### 1) Koble til leverandører og opprett en API-nøkkel

1. Åpne kontrollpanelet → `Providers`, og koble til minst én leverandør (OAuth eller API-nøkkel).
2. Åpne kontrollpanelet → `Endpoints`, og opprett en API-nøkkel.
3. (Valgfritt) Åpne kontrollpanelet → `Combos`, og konfigurer reservekjeden din.

### 2) Koble kodeverktøyet ditt til tjenesten

```txt
Basis-URL: http://localhost:20128/v1
API-nøkkel: [kopier fra Endpoint-siden]
Modell:     if/qwen3.8-max-preview (eller et hvilket som helst leverandør-/modellprefiks)
```

Hvis redigeringsprogrammet ditt ikke kan sende `Authorization: Bearer ...`, bruker du i stedet den tokeniserte kompatibilitetsadressen:

```txt
Basis-URL: http://localhost:20128/api/v1/vscode/YOUR_KEY/
URL for modeller: http://localhost:20128/api/v1/vscode/YOUR_KEY/models
URL for chat: http://localhost:20128/api/v1/vscode/YOUR_KEY/chat/completions
URL for Ollama-tagger: http://localhost:20128/api/v1/vscode/YOUR_KEY/api/tags
```

Fungerer med Claude Code, Codex CLI, Cursor, Cline, OpenClaw, OpenCode og OpenAI-kompatible SDK-er.

#### Automatisk konfigurasjon med `setup-*`

I stedet for å lime inn basis-URL-en og nøkkelen manuelt kan du la OmniRoute skrive hvert verktøys
egen konfigurasjon fra den aktive modellkatalogen. Én kommando per verktøy:

```bash
omniroute setup-codex        # ~/.codex/<name>.config.toml-profiler
omniroute setup-claude       # ~/.claude/profiles/<name>/settings.json
omniroute setup-opencode     # ~/.config/opencode/opencode.json (OpenAI-kompatibel)
omniroute setup-cline        # Innstillinger for Cline CLI + VS Code-utvidelsen
omniroute setup-kilo         # Kilo Code
omniroute setup-continue     # ~/.continue/config.yaml (Continue / cn)
omniroute setup-cursor       # skriver ut trinnene i Cursor-appen
omniroute setup-roo          # Roo Code-import + autoImport-peker
omniroute setup-crush        # ~/.config/crush/crush.json
omniroute setup-goose        # ~/.config/goose/config.yaml
omniroute setup-aider        # ~/.aider.conf.yml
omniroute setup-qwen         # ~/.qwen/settings.json + ~/.qwen/.env
```

Alle godtar `--remote <url> --api-key <key>` for å konfigurere et lokalt verktøy mot en
**ekstern** OmniRoute, samt `--dry-run` for forhåndsvisning. Hvis du vil starte en CLI med riktige
miljøvariabler injisert uten å skrive noen konfigurasjon, bruker du den generiske starteren
`omniroute run <target>` (claude, codex, aider, goose, opencode, qwen, gemini);
de eldre verktøyspesifikke starterne `omniroute launch` (Claude Code) og
`omniroute launch-codex` (Codex) er fortsatt tilgjengelige.

Du finner hele tabellen (hva hver kommando skriver, alle flagg, lokal kontra ekstern, basis-URL-
konvensjoner for `/v1`) under **[CLI-integrasjoner](./CLI-INTEGRATIONS.md)**.

Detaljert konfigurasjon for hvert verktøy (Claude Code, Codex CLI, Cursor, Cline, OpenClaw, Kilo Code, Copilot med flere) finner du i den egne **[veiledningen for CLI-verktøy](../reference/CLI-TOOLS.md)**.

---

## Protokolloppsett (MCP + A2A)

### MCP-oppsett (Model Context Protocol)

Start MCP-transport i stdio-modus:

```bash
omniroute --mcp
```

Anbefalt valideringsflyt:

```bash
# 1. Start MCP-serveren
omniroute --mcp

# 2. Kall følgende fra MCP-klienten:
omniroute_get_health        # Skal returnere systemstatus
omniroute_list_combos       # Skal returnere aktive kombinasjoner

# 3. Eller kjør hele E2E-testpakken:
npm run test:protocols:e2e
```

#### Konfigurasjon av MCP-klient

**Claude Code:**

```bash
claude mcp add-server omniroute --type http --url http://localhost:20128/api/mcp/stream
```

**Cursor / Cline:**

Legg til følgende i MCP-innstillingene dine:

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

**Fullstendig MCP-dokumentasjon:** [README for MCP-serveren](../../open-sse/mcp-server/README.md) — 110 verktøy, IDE-konfigurasjoner og Python-/TS-/Go-klienter.

### A2A-oppsett (Agent-to-Agent Protocol)

Kontroller agentkortet:

```bash
curl http://localhost:20128/.well-known/agent.json
```

Send en oppgave:

```bash
curl -X POST http://localhost:20128/a2a \
  -H 'content-type: application/json' \
  -d '{"jsonrpc":"2.0","id":"quickstart","method":"message/send","params":{"skill":"quota-management","messages":[{"role":"user","content":"Give me a short quota summary."}]}}'
```

**Fullstendig A2A-dokumentasjon:** [README for A2A-serveren](../../src/lib/a2a/README.md) — JSON-RPC 2.0, ferdigheter, strømming og oppgavens livssyklus.

---

## Konfigurasjon av tidsavbrudd

### Grunnleggende tidsavbrudd

For de fleste distribusjoner trenger du bare disse to variablene:

| Variabel                 | Standardverdi              | Formål                                                                                                                                                                      |
| ------------------------ | -------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `REQUEST_TIMEOUT_MS`     | `600000`                   | Felles grunnverdi for tidsavbrudd ved oppstart av oppstrømssvar, skjulte Undici-tidsavbrudd, TLS-fingeravtrykksforespørsler og tidsavbrudd for API-broforespørsler/-proxyer |
| `STREAM_IDLE_TIMEOUT_MS` | arver `REQUEST_TIMEOUT_MS` | Maksimalt opphold mellom strømmedatablokker før OmniRoute avbryter SSE-strømmen                                                                                             |

Bakoverkompatibilitet er bevart: eksisterende `FETCH_TIMEOUT_MS`, `API_BRIDGE_PROXY_TIMEOUT_MS` og andre lagspesifikke tidsavbruddsvariabler fungerer fortsatt og overstyrer den felles grunnverdien.

### Leverandørspesifikke merknader

For Claude Code-kompatible oppstrømmer (`anthropic-compatible-cc-*`) utleder OmniRoute den utgående `X-Stainless-Timeout`-headeren fra det fastsatte tidsavbruddet for henting, slik at lesetidsavbrudd på leverandørsiden forblir samordnet med miljøkonfigurasjonen din.

For tredjeparts Claude Code-kompatible reverse proxyer holder OmniRoute standardsettet for `anthropic-beta` konservativt, og når `Client Cache Control` står på `Auto`, videresendes bare `cache_control`-markører fra klienten. Aktiver bryteren «Enable redact-thinking beta» for hver enkelt tilkobling bare når oppstrømmen spesifikt krever redigerte Claude-tenkestrømmer.

### Avanserte overstyringer av tidsavbrudd

| Variabel                                 | Standardverdi                              | Formål                                                                               |
| ---------------------------------------- | ------------------------------------------ | ------------------------------------------------------------------------------------ |
| `FETCH_TIMEOUT_MS`                       | arver `REQUEST_TIMEOUT_MS`                 | Tidsavbrudd for oppstart av oppstrømssvar, brukt til svarheadere mottas              |
| `FETCH_HEADERS_TIMEOUT_MS`               | arver `FETCH_TIMEOUT_MS`                   | Undici-tidsgrense for mottak av oppstrøms svarheadere                                |
| `FETCH_BODY_TIMEOUT_MS`                  | arver `FETCH_TIMEOUT_MS`                   | Undici-tidsgrense mellom datablokker i oppstrømsinnholdet (`0` deaktiverer den)      |
| `FETCH_CONNECT_TIMEOUT_MS`               | `30000`                                    | Undici-tidsavbrudd for TCP-tilkobling                                                |
| `FETCH_KEEPALIVE_TIMEOUT_MS`             | `4000`                                     | Undici-tidsavbrudd for inaktiv keep-alive-sokkel                                     |
| `TLS_CLIENT_TIMEOUT_MS`                  | arver `FETCH_TIMEOUT_MS`                   | Tidsavbrudd for TLS-fingeravtrykksforespørsler utført gjennom `wreq-js`              |
| `API_BRIDGE_PROXY_TIMEOUT_MS`            | arver `REQUEST_TIMEOUT_MS` eller `600000`  | Tidsavbrudd for videresending via `/v1`-proxy fra API-porten til kontrollpanelporten |
| `API_BRIDGE_SERVER_REQUEST_TIMEOUT_MS`   | `max(API_BRIDGE_PROXY_TIMEOUT_MS, 300000)` | Tidsavbrudd for innkommende forespørsler på API-broserveren                          |
| `API_BRIDGE_SERVER_HEADERS_TIMEOUT_MS`   | `60000`                                    | Tidsavbrudd for innkommende headere på API-broserveren                               |
| `API_BRIDGE_SERVER_KEEPALIVE_TIMEOUT_MS` | `5000`                                     | Keep-alive-tidsavbrudd på API-broserveren                                            |
| `API_BRIDGE_SERVER_SOCKET_TIMEOUT_MS`    | `0`                                        | Tidsavbrudd for sokkelinaktivitet på API-broserveren (`0` deaktiverer det)           |

> **Merk:** For strømmeforespørsler dekker `FETCH_TIMEOUT_MS` bare oppsett av tilkoblingen / venting på det første oppstrømssvaret. Når strømmen er aktiv, avbryter OmniRoute bare ved en faktisk stans (`STREAM_IDLE_TIMEOUT_MS`) eller inaktivitet i Undici-innholdet (`FETCH_BODY_TIMEOUT_MS`).

### Kompatibilitet med reverse proxy

Hvis du kjører OmniRoute bak Nginx, Caddy, Cloudflare eller en annen reverse proxy, må du sørge for at proxyens tidsavbrudd også er høyere enn OmniRoutes tidsavbrudd for strømming/henting.

---

## Modus med delte porter

Kjør API-et og dashbordet på separate porter for avanserte scenarioer (omvendt proxy, containernettverk):

```bash
PORT=20128 DASHBOARD_PORT=20129 omniroute
# API:        http://localhost:20128/v1
# Dashbord:   http://localhost:20129
```

---

## Mal for Void Linux (xbps-src)

Void Linux-brukere kan bygge en systemtilpasset pakke med `xbps-src`. Lagre denne blokken som `srcpkgs/omniroute/template`:

```bash
# Malfil for «omniroute»
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
# Generer kontrollsummen på nytt for hver utgivelse med:
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

## Avinstallering

| Kommando                 | Handling                                                                                   |
| ------------------------ | ------------------------------------------------------------------------------------------ |
| `npm run uninstall`      | Fjerner systemappen, men **beholder databasen og konfigurasjonene dine** i `~/.omniroute`. |
| `npm run uninstall:full` | Fjerner appen OG **sletter alle konfigurasjoner, nøkler og databaser permanent**.          |

> Du finner detaljerte avinstalleringsinstruksjoner for alle metodene i [UNINSTALL.md](./UNINSTALL.md).
