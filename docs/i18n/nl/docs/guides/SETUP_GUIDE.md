# 📖 Setup Guide — OmniRoute (Nederlands)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/SETUP_GUIDE.md) · 🇪🇹 [am](../../../am/docs/guides/SETUP_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/guides/SETUP_GUIDE.md) · 🇦🇿 [az](../../../az/docs/guides/SETUP_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/guides/SETUP_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/guides/SETUP_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/guides/SETUP_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/guides/SETUP_GUIDE.md) · 🇩🇰 [da](../../../da/docs/guides/SETUP_GUIDE.md) · 🇩🇪 [de](../../../de/docs/guides/SETUP_GUIDE.md) · 🇬🇷 [el](../../../el/docs/guides/SETUP_GUIDE.md) · 🇪🇸 [es](../../../es/docs/guides/SETUP_GUIDE.md) · 🇪🇪 [et](../../../et/docs/guides/SETUP_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/guides/SETUP_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/guides/SETUP_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/guides/SETUP_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/guides/SETUP_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/guides/SETUP_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/guides/SETUP_GUIDE.md) · 🇮🇱 [he](../../../he/docs/guides/SETUP_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/guides/SETUP_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/guides/SETUP_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/guides/SETUP_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/guides/SETUP_GUIDE.md) · 🇮🇩 [id](../../../id/docs/guides/SETUP_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/guides/SETUP_GUIDE.md) · 🇮🇹 [it](../../../it/docs/guides/SETUP_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/guides/SETUP_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/guides/SETUP_GUIDE.md) · 🇰🇭 [km](../../../km/docs/guides/SETUP_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/guides/SETUP_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/guides/SETUP_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/guides/SETUP_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/guides/SETUP_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/guides/SETUP_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/guides/SETUP_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/guides/SETUP_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/guides/SETUP_GUIDE.md) · 🇲🇲 [my](../../../my/docs/guides/SETUP_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/guides/SETUP_GUIDE.md) · 🇳🇴 [no](../../../no/docs/guides/SETUP_GUIDE.md) · 🇮🇳 [or](../../../or/docs/guides/SETUP_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/guides/SETUP_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/guides/SETUP_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/guides/SETUP_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/guides/SETUP_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/SETUP_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/guides/SETUP_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/guides/SETUP_GUIDE.md) · 🇱🇰 [si](../../../si/docs/guides/SETUP_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/guides/SETUP_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/guides/SETUP_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/guides/SETUP_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/guides/SETUP_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/guides/SETUP_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/guides/SETUP_GUIDE.md) · 🇮🇳 [te](../../../te/docs/guides/SETUP_GUIDE.md) · 🇹🇭 [th](../../../th/docs/guides/SETUP_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/guides/SETUP_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/SETUP_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/guides/SETUP_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/guides/SETUP_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/guides/SETUP_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/guides/SETUP_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/SETUP_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/SETUP_GUIDE.md)

---

> Volledige installatiehandleiding voor OmniRoute. Zie voor de snelle versie de [Snelstart in de README](../README.md#-quick-start).

## Inhoudsopgave

- [Installatiemethoden](#install-methods)
- [Configuratie van CLI-tools](#cli-tool-configuration)
- [Protocolconfiguratie (MCP + A2A)](#protocol-setup-mcp--a2a)
- [Time-outconfiguratie](#timeout-configuration)
- [Modus met gesplitste poorten](#split-port-mode)
- [Void Linux (xbps-src)](#void-linux-xbps-src-template)
- [De-installatie](#uninstalling)

---

## Installatiemethoden

### npm (aanbevolen)

```bash
npm install -g omniroute
omniroute
```

Het dashboard wordt geopend op `http://localhost:20128` en de basis-URL van de API is `http://localhost:20128/v1`.

### pnpm

```bash
pnpm add -g omniroute@latest --allow-build=better-sqlite3 --allow-build=@swc/core
omniroute
```

> **pnpm-gebruikers:** de vlag `--allow-build` is vereist om systeemeigen buildscripts voor `better-sqlite3` en `@swc/core` in te schakelen. De opdracht `pnpm approve-builds -g` wordt in pnpm v11 niet ondersteund voor globale installaties.

### Arch Linux (AUR)

```bash
yay -S omniroute-bin
systemctl --user enable --now omniroute.service
```

Het [AUR-pakket](https://aur.archlinux.org/packages/omniroute-bin) installeert OmniRoute en biedt een systemd-gebruikersservice.

### Vanuit de broncode

```bash
npm install
PORT=20128 DASHBOARD_PORT=20129 NEXT_PUBLIC_BASE_URL=http://localhost:20129 npm run dev
```

> **Opmerking voor Windows:** OmniRoute gebruikt standaard `%APPDATA%\omniroute` wanneer de verouderde map `%USERPROFILE%\.omniroute` niet aanwezig is. Stel `DATA_DIR` in om een andere locatie voor de gegevensmap te kiezen.

> **Opmerking:** `npm install` genereert bij de eerste uitvoering automatisch `.env` vanuit `.env.example`. Bij volgende installaties wordt een bestaande `.env` niet overschreven, zodat aanpassingen behouden blijven. Verwijder `.env` voordat u de opdracht opnieuw uitvoert om het bestand opnieuw te genereren.

### Docker

Zie de [Docker-handleiding](./DOCKER_GUIDE.md) voor de volledige Docker-configuratie, inclusief Compose-profielen en Caddy HTTPS.

### Desktopapp (Electron)

OmniRoute wordt geleverd met een desktopwrapper die is gebouwd op Electron 41 + electron-builder 26.10. Beschikbare scripts (hoofdmap van de werkruimte):

```bash
npm run electron:dev          # Desktopapp uitvoeren met automatisch herladen
npm run electron:build        # Bouwen voor het huidige besturingssysteem (automatisch gedetecteerd)
npm run electron:build:win    # Windows-installatieprogramma (NSIS + draagbare versie)
npm run electron:build:mac    # macOS (dmg + zip, arm64+x64)
npm run electron:build:linux  # Linux (AppImage + deb + rpm)
npm run electron:smoke:packaged  # Rooktest voor verpakte build uitvoeren
```

Releases van de desktopinstallatieprogramma's worden aan GitHub Releases toegevoegd. Zie [`ELECTRON_GUIDE.md`](./ELECTRON_GUIDE.md) voor een volledig overzicht van Electron (ondertekening, IPC-bridge, distributies) _(in een latere fase gemaakt)_.

### Headless server (CI/automatisering)

Gebruik voor onbeheerde configuraties (Docker, Kubernetes, CI):

```bash
omniroute setup --non-interactive
omniroute providers test-batch
```

In combinatie met omgevingsvariabelen (`INITIAL_PASSWORD`, `OMNIROUTE_WS_BRIDGE_SECRET`, enzovoort) kunt u hiermee volledig scriptbaar een OmniRoute-instantie opzetten.

### CLI-opties

| Opdracht                | Beschrijving                                                                                  |
| ----------------------- | --------------------------------------------------------------------------------------------- |
| `omniroute`             | Server starten (`PORT=20128`, API en dashboard op dezelfde poort)                             |
| `omniroute setup`       | Begeleide CLI-configuratie voor het wachtwoord en de eerste provider                          |
| `omniroute doctor`      | Lokale statuscontroles uitvoeren zonder de server te starten                                  |
| `omniroute providers`   | Providers ontdekken, weergeven, valideren en testen vanuit de CLI                             |
| `omniroute config`      | Configuratie van CLI-tools — configuraties weergeven, ophalen, instellen en valideren         |
| `omniroute status`      | Offline statusdashboard — versie, database, tools, configuratie                               |
| `omniroute logs`        | Gebruikslogboeken vanuit de API streamen (ondersteunt `--follow`)                             |
| `omniroute update`      | Controleren op OmniRoute-updates of deze toepassen                                            |
| `omniroute provider`    | Providerverbindingen beheren — toevoegen, weergeven, verwijderen, testen, standaard instellen |
| `omniroute --port 3000` | Canonieke/API-poort instellen op 3000                                                         |
| `omniroute --mcp`       | MCP-server starten (stdio-transport)                                                          |
| `omniroute --no-open`   | Browser niet automatisch openen                                                               |
| `omniroute --help`      | Help weergeven                                                                                |

De headless configuratie kan worden gescript met vlaggen of omgevingsvariabelen:

```bash
omniroute setup --non-interactive --password "$OMNIROUTE_PASSWORD"
omniroute setup --non-interactive --add-provider --provider openai --api-key "$OPENAI_API_KEY"
omniroute setup --non-interactive --add-provider --provider openai --api-key "$OPENAI_API_KEY" --test-provider
```

Voer lokale diagnostiek uit zonder het dashboard te openen:

```bash
omniroute doctor
omniroute doctor --json
omniroute doctor --no-liveness
```

Beheer providers via SSH of scripts zonder het dashboard te openen:

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

## Configuratie van CLI-tools

### 1) Providers verbinden en een API-sleutel maken

1. Open Dashboard → `Providers` en verbind ten minste één provider (OAuth of API-sleutel).
2. Open Dashboard → `Endpoints` en maak een API-sleutel.
3. (Optioneel) Open Dashboard → `Combos` en stel uw fallback-keten in.

### 2) Uw programmeertool configureren

```txt
Basis-URL: http://localhost:20128/v1
API-sleutel:  [kopiëren vanaf de Endpoint-pagina]
Model:    if/qwen3.8-max-preview (of een willekeurig provider-/modelvoorvoegsel)
```

Als uw editor geen `Authorization: Bearer ...` kan verzenden, gebruikt u in plaats daarvan de getokeniseerde compatibiliteitsbasis:

```txt
Basis-URL: http://localhost:20128/api/v1/vscode/YOUR_KEY/
Modellen-URL: http://localhost:20128/api/v1/vscode/YOUR_KEY/models
Chat-URL: http://localhost:20128/api/v1/vscode/YOUR_KEY/chat/completions
Ollama Tags-URL: http://localhost:20128/api/v1/vscode/YOUR_KEY/api/tags
```

Werkt met Claude Code, Codex CLI, Cursor, Cline, OpenClaw, OpenCode en OpenAI-compatibele SDK's.

#### Automatisch configureren met `setup-*`

In plaats van de basis-URL en sleutel handmatig te plakken, kunt u OmniRoute de
eigen configuratie van elke tool laten schrijven vanuit de actuele modelcatalogus. Eén opdracht per tool:

```bash
omniroute setup-codex        # ~/.codex/<name>.config.toml-profielen
omniroute setup-claude       # ~/.claude/profiles/<name>/settings.json
omniroute setup-opencode     # ~/.config/opencode/opencode.json (OpenAI-compatibel)
omniroute setup-cline        # Instellingen voor Cline CLI + VS Code-extensie
omniroute setup-kilo         # Kilo Code
omniroute setup-continue     # ~/.continue/config.yaml (Continue / cn)
omniroute setup-cursor       # geeft de stappen in de Cursor-app weer
omniroute setup-roo          # Roo Code-import + autoImport-verwijzing
omniroute setup-crush        # ~/.config/crush/crush.json
omniroute setup-goose        # ~/.config/goose/config.yaml
omniroute setup-aider        # ~/.aider.conf.yml
omniroute setup-qwen         # ~/.qwen/settings.json + ~/.qwen/.env
```

Elke opdracht accepteert `--remote <url> --api-key <key>` om een lokale tool te configureren voor een
**externe** OmniRoute, plus `--dry-run` voor een voorbeeldweergave. Gebruik het algemene startprogramma
`omniroute run <target>` (claude, codex, aider, goose, opencode, qwen, gemini) om een CLI te starten met de juiste
geïnjecteerde omgevingsvariabelen zonder een configuratiebestand te schrijven;
de oudere toolspecifieke startprogramma's `omniroute launch` (Claude Code) en
`omniroute launch-codex` (Codex) blijven beschikbaar.

Raadpleeg **[CLI-integraties](./CLI-INTEGRATIONS.md)** voor de volledige tabel (wat elke opdracht schrijft, alle opties, lokaal versus extern en
`/v1`-conventies voor basis-URL's).

Raadpleeg de speciale **[Handleiding voor CLI-tools](../reference/CLI-TOOLS.md)** voor gedetailleerde configuratie per tool (Claude Code, Codex CLI, Cursor, Cline, OpenClaw, Kilo Code, Copilot en meer).

---

## Protocolconfiguratie (MCP + A2A)

### MCP-configuratie (Model Context Protocol)

Start het MCP-transport in stdio-modus:

```bash
omniroute --mcp
```

Aanbevolen validatieprocedure:

```bash
# 1. Start de MCP-server
omniroute --mcp

# 2. Roep vanuit uw MCP-client het volgende aan:
omniroute_get_health        # Moet de systeemstatus retourneren
omniroute_list_combos       # Moet actieve combo's retourneren

# 3. Of voer de volledige E2E-testsuite uit:
npm run test:protocols:e2e
```

#### MCP-clientconfiguratie

**Claude Code:**

```bash
claude mcp add-server omniroute --type http --url http://localhost:20128/api/mcp/stream
```

**Cursor / Cline:**

Voeg het volgende toe aan uw MCP-instellingen:

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

**Volledige MCP-documentatie:** [README van de MCP-server](../../open-sse/mcp-server/README.md) — 110 tools, IDE-configuraties, Python-/TS-/Go-clients.

### A2A-configuratie (Agent-to-Agent Protocol)

Controleer de Agent Card:

```bash
curl http://localhost:20128/.well-known/agent.json
```

Verzend een taak:

```bash
curl -X POST http://localhost:20128/a2a \
  -H 'content-type: application/json' \
  -d '{"jsonrpc":"2.0","id":"quickstart","method":"message/send","params":{"skill":"quota-management","messages":[{"role":"user","content":"Give me a short quota summary."}]}}'
```

**Volledige A2A-documentatie:** [README van de A2A-server](../../src/lib/a2a/README.md) — JSON-RPC 2.0, vaardigheden, streaming en taaklevenscyclus.

---

## Time-outconfiguratie

### Basistime-outs

Voor de meeste implementaties hebt u alleen deze twee variabelen nodig:

| Variabele                | Standaardwaarde                 | Doel                                                                                                                                                                          |
| ------------------------ | ------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `REQUEST_TIMEOUT_MS`     | `600000`                        | Gedeelde basiswaarde voor de time-out bij het starten van upstreamreacties, verborgen Undici-time-outs, TLS-fingerprintverzoeken en request-/proxytime-outs van de API-bridge |
| `STREAM_IDLE_TIMEOUT_MS` | neemt `REQUEST_TIMEOUT_MS` over | Maximale tijd tussen streamingchunks voordat OmniRoute de SSE-stream afbreekt                                                                                                 |

Achterwaartse compatibiliteit blijft behouden: bestaande variabelen zoals `FETCH_TIMEOUT_MS`, `API_BRIDGE_PROXY_TIMEOUT_MS` en andere time-outvariabelen per laag blijven werken en overschrijven de gedeelde basiswaarde.

### Providerspecifieke opmerkingen

Voor Claude Code-compatibele upstreams (`anthropic-compatible-cc-*`) leidt OmniRoute de uitgaande header `X-Stainless-Timeout` af van de bepaalde fetch-time-out, zodat leestime-outs aan de providerzijde afgestemd blijven op uw omgevingsconfiguratie.

Voor Claude Code-compatibele reverse proxy's van derden houdt OmniRoute de standaardset `anthropic-beta` conservatief en stuurt het, wanneer `Client Cache Control` op `Auto` blijft staan, alleen door de client aangeleverde `cache_control`-markeringen door. Schakel de verbindingsspecifieke optie "Enable redact-thinking beta" alleen in wanneer de upstream specifiek geredigeerde Claude-thinkingstreams vereist.

### Geavanceerde time-outoverschrijvingen

| Variabele                                | Standaardwaarde                             | Doel                                                                                    |
| ---------------------------------------- | ------------------------------------------- | --------------------------------------------------------------------------------------- |
| `FETCH_TIMEOUT_MS`                       | neemt `REQUEST_TIMEOUT_MS` over             | Time-out voor de start van de upstreamreactie, totdat de responseheaders zijn ontvangen |
| `FETCH_HEADERS_TIMEOUT_MS`               | neemt `FETCH_TIMEOUT_MS` over               | Undici-tijdslimiet voor het ontvangen van upstreamresponseheaders                       |
| `FETCH_BODY_TIMEOUT_MS`                  | neemt `FETCH_TIMEOUT_MS` over               | Undici-tijdslimiet tussen upstreambodychunks (`0` schakelt deze uit)                    |
| `FETCH_CONNECT_TIMEOUT_MS`               | `30000`                                     | Undici-time-out voor het opzetten van een TCP-verbinding                                |
| `FETCH_KEEPALIVE_TIMEOUT_MS`             | `4000`                                      | Undici-time-out voor inactieve keep-alive-sockets                                       |
| `TLS_CLIENT_TIMEOUT_MS`                  | neemt `FETCH_TIMEOUT_MS` over               | Time-out voor TLS-fingerprintverzoeken die via `wreq-js` worden uitgevoerd              |
| `API_BRIDGE_PROXY_TIMEOUT_MS`            | neemt `REQUEST_TIMEOUT_MS` of `600000` over | Time-out voor het doorsturen van de `/v1`-proxy van de API-poort naar de dashboardpoort |
| `API_BRIDGE_SERVER_REQUEST_TIMEOUT_MS`   | `max(API_BRIDGE_PROXY_TIMEOUT_MS, 300000)`  | Time-out voor inkomende verzoeken op de API-bridgeserver                                |
| `API_BRIDGE_SERVER_HEADERS_TIMEOUT_MS`   | `60000`                                     | Time-out voor inkomende headers op de API-bridgeserver                                  |
| `API_BRIDGE_SERVER_KEEPALIVE_TIMEOUT_MS` | `5000`                                      | Keep-alive-time-out op de API-bridgeserver                                              |
| `API_BRIDGE_SERVER_SOCKET_TIMEOUT_MS`    | `0`                                         | Time-out voor socketinactiviteit op de API-bridgeserver (`0` schakelt deze uit)         |

> **Opmerking:** Voor streamingverzoeken heeft `FETCH_TIMEOUT_MS` alleen betrekking op het opzetten van de verbinding en het wachten op de eerste upstreamreactie. Zodra de stream actief is, breekt OmniRoute deze alleen af bij een daadwerkelijke onderbreking (`STREAM_IDLE_TIMEOUT_MS`) of inactiviteit van de Undici-body (`FETCH_BODY_TIMEOUT_MS`).

### Compatibiliteit met reverse proxy's

Als u OmniRoute achter Nginx, Caddy, Cloudflare of een andere reverse proxy uitvoert, zorg er dan voor dat de proxytime-outs ook hoger zijn dan de stream-/fetch-time-outs van OmniRoute.

---

## Modus met gescheiden poorten

Voer de API en het dashboard uit op afzonderlijke poorten voor geavanceerde scenario's (reverse proxy, containernetwerken):

```bash
PORT=20128 DASHBOARD_PORT=20129 omniroute
# API:       http://localhost:20128/v1
# Dashboard: http://localhost:20129
```

---

## Sjabloon voor Void Linux (xbps-src)

Gebruikers van Void Linux kunnen een systeemeigen pakket bouwen met `xbps-src`. Sla dit blok op als `srcpkgs/omniroute/template`:

```bash
# Sjabloonbestand voor 'omniroute'
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
# Genereer de controlesom voor elke release opnieuw met:
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

## Verwijderen

| Opdracht                 | Actie                                                                                      |
| ------------------------ | ------------------------------------------------------------------------------------------ |
| `npm run uninstall`      | Verwijdert de systeemapp, maar **behoudt uw database en configuraties** in `~/.omniroute`. |
| `npm run uninstall:full` | Verwijdert de app EN **wist alle configuraties, sleutels en databases permanent**.         |

> Zie [UNINSTALL.md](./UNINSTALL.md) voor gedetailleerde verwijderingsinstructies voor alle methoden.
