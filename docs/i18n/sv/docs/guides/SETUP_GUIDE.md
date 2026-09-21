# 📖 Setup Guide — OmniRoute (Svenska)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/SETUP_GUIDE.md) · 🇪🇹 [am](../../../am/docs/guides/SETUP_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/guides/SETUP_GUIDE.md) · 🇦🇿 [az](../../../az/docs/guides/SETUP_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/guides/SETUP_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/guides/SETUP_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/guides/SETUP_GUIDE.md) · 🇩🇰 [da](../../../da/docs/guides/SETUP_GUIDE.md) · 🇩🇪 [de](../../../de/docs/guides/SETUP_GUIDE.md) · 🇬🇷 [el](../../../el/docs/guides/SETUP_GUIDE.md) · 🇪🇸 [es](../../../es/docs/guides/SETUP_GUIDE.md) · 🇪🇪 [et](../../../et/docs/guides/SETUP_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/guides/SETUP_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/guides/SETUP_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/guides/SETUP_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/guides/SETUP_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/guides/SETUP_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/guides/SETUP_GUIDE.md) · 🇮🇱 [he](../../../he/docs/guides/SETUP_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/guides/SETUP_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/guides/SETUP_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/guides/SETUP_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/guides/SETUP_GUIDE.md) · 🇮🇩 [id](../../../id/docs/guides/SETUP_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/guides/SETUP_GUIDE.md) · 🇮🇹 [it](../../../it/docs/guides/SETUP_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/guides/SETUP_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/guides/SETUP_GUIDE.md) · 🇰🇭 [km](../../../km/docs/guides/SETUP_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/guides/SETUP_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/guides/SETUP_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/guides/SETUP_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/guides/SETUP_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/guides/SETUP_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/guides/SETUP_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/guides/SETUP_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/guides/SETUP_GUIDE.md) · 🇲🇲 [my](../../../my/docs/guides/SETUP_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/guides/SETUP_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/guides/SETUP_GUIDE.md) · 🇳🇴 [no](../../../no/docs/guides/SETUP_GUIDE.md) · 🇮🇳 [or](../../../or/docs/guides/SETUP_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/guides/SETUP_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/guides/SETUP_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/guides/SETUP_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/guides/SETUP_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/SETUP_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/guides/SETUP_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/guides/SETUP_GUIDE.md) · 🇱🇰 [si](../../../si/docs/guides/SETUP_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/guides/SETUP_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/guides/SETUP_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/guides/SETUP_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/guides/SETUP_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/guides/SETUP_GUIDE.md) · 🇮🇳 [te](../../../te/docs/guides/SETUP_GUIDE.md) · 🇹🇭 [th](../../../th/docs/guides/SETUP_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/guides/SETUP_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/SETUP_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/guides/SETUP_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/guides/SETUP_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/guides/SETUP_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/guides/SETUP_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/SETUP_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/SETUP_GUIDE.md)

---

> Fullständig installationsreferens för OmniRoute. För snabbversionen, se [Snabbstart i README](../README.md#-quick-start).

## Innehållsförteckning

- [Installationsmetoder](#install-methods)
- [Konfiguration av CLI-verktyg](#cli-tool-configuration)
- [Protokollkonfiguration (MCP + A2A)](#protocol-setup-mcp--a2a)
- [Konfiguration av tidsgränser](#timeout-configuration)
- [Läge med separata portar](#split-port-mode)
- [Void Linux (xbps-src)](#void-linux-xbps-src-template)
- [Avinstallation](#uninstalling)

---

## Installationsmetoder

### npm (rekommenderas)

```bash
npm install -g omniroute
omniroute
```

Kontrollpanelen öppnas på `http://localhost:20128` och API:ets bas-URL är `http://localhost:20128/v1`.

### pnpm

```bash
pnpm add -g omniroute@latest --allow-build=better-sqlite3 --allow-build=@swc/core
omniroute
```

> **För pnpm-användare:** flaggan `--allow-build` krävs för att aktivera inbyggda byggskript för `better-sqlite3` och `@swc/core`. Kommandot `pnpm approve-builds -g` stöds inte för globala installationer i pnpm v11.

### Arch Linux (AUR)

```bash
yay -S omniroute-bin
systemctl --user enable --now omniroute.service
```

[AUR-paketet](https://aur.archlinux.org/packages/omniroute-bin) installerar OmniRoute och tillhandahåller en systemd-användartjänst.

### Från källkod

```bash
npm install
PORT=20128 DASHBOARD_PORT=20129 NEXT_PUBLIC_BASE_URL=http://localhost:20129 npm run dev
```

> **Information för Windows:** Som standard använder OmniRoute `%APPDATA%\omniroute` när den äldre katalogen `%USERPROFILE%\.omniroute` inte finns. Ange `DATA_DIR` för att välja en annan plats för datakatalogen.

> **Obs:** `npm install` genererar automatiskt `.env` från `.env.example` vid den första körningen. Efterföljande installationer skriver inte över en befintlig `.env`, så anpassningar bevaras. Om du vill skapa den på nytt tar du bort `.env` innan du kör kommandot igen.

### Docker

Se [Docker-guiden](./DOCKER_GUIDE.md) för fullständiga instruktioner om Docker-konfiguration, inklusive Compose-profiler och Caddy HTTPS.

### Skrivbordsapp (Electron)

OmniRoute levereras med ett skrivbordsgränssnitt som bygger på Electron 41 + electron-builder 26.10. Tillgängliga skript (arbetsytans rot):

```bash
npm run electron:dev          # Kör skrivbordsappen med automatisk omladdning
npm run electron:build        # Bygg för aktuellt operativsystem (identifieras automatiskt)
npm run electron:build:win    # Windows-installationsprogram (NSIS + portabelt)
npm run electron:build:mac    # macOS (dmg + zip, arm64+x64)
npm run electron:build:linux  # Linux (AppImage + deb + rpm)
npm run electron:smoke:packaged  # Snabbtesta den paketerade versionen
```

Versioner av installationsprogrammen för skrivbordsappen bifogas till GitHub Releases. En fullständig djupdykning i Electron (signering, IPC-brygga, distributioner) finns i [`ELECTRON_GUIDE.md`](./ELECTRON_GUIDE.md) _(skapad i en senare fas)_.

### Server utan grafiskt gränssnitt (CI/automatisering)

För installationer utan användarinteraktion (Docker, Kubernetes, CI), använd:

```bash
omniroute setup --non-interactive
omniroute providers test-batch
```

I kombination med miljövariabler (`INITIAL_PASSWORD`, `OMNIROUTE_WS_BRIDGE_SECRET` osv.) kan du starta en OmniRoute-instans helt skriptstyrt.

### CLI-alternativ

| Kommando                | Beskrivning                                                                          |
| ----------------------- | ------------------------------------------------------------------------------------ |
| `omniroute`             | Starta servern (`PORT=20128`, API och kontrollpanel på samma port)                   |
| `omniroute setup`       | Guidad CLI-introduktion för lösenord och den första leverantören                     |
| `omniroute doctor`      | Kör lokala hälsokontroller utan att starta servern                                   |
| `omniroute providers`   | Upptäck, lista, validera och testa leverantörer från CLI                             |
| `omniroute config`      | Konfiguration av CLI-verktyg – lista, hämta, ange och validera konfigurationer       |
| `omniroute status`      | Offlinekontrollpanel för status – version, databas, verktyg och konfiguration        |
| `omniroute logs`        | Strömma användningsloggar från API:et (stöder `--follow`)                            |
| `omniroute update`      | Sök efter eller tillämpa OmniRoute-uppdateringar                                     |
| `omniroute provider`    | Hantera leverantörsanslutningar – lägg till, lista, ta bort, testa och ange standard |
| `omniroute --port 3000` | Ange den kanoniska porten/API-porten till 3000                                       |
| `omniroute --mcp`       | Starta MCP-servern (stdio-transport)                                                 |
| `omniroute --no-open`   | Öppna inte webbläsaren automatiskt                                                   |
| `omniroute --help`      | Visa hjälp                                                                           |

Installation utan grafiskt gränssnitt kan skriptas med flaggor eller miljövariabler:

```bash
omniroute setup --non-interactive --password "$OMNIROUTE_PASSWORD"
omniroute setup --non-interactive --add-provider --provider openai --api-key "$OPENAI_API_KEY"
omniroute setup --non-interactive --add-provider --provider openai --api-key "$OPENAI_API_KEY" --test-provider
```

Kör lokal diagnostik utan att öppna kontrollpanelen:

```bash
omniroute doctor
omniroute doctor --json
omniroute doctor --no-liveness
```

Hantera leverantörer via SSH eller skript utan att öppna kontrollpanelen:

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

## Konfiguration av CLI-verktyg

### 1) Anslut leverantörer och skapa en API-nyckel

1. Öppna Dashboard → `Providers` och anslut minst en leverantör (OAuth eller API-nyckel).
2. Öppna Dashboard → `Endpoints` och skapa en API-nyckel.
3. (Valfritt) Öppna Dashboard → `Combos` och konfigurera din reservkedja.

### 2) Konfigurera ditt kodningsverktyg

```txt
Bas-URL:   http://localhost:20128/v1
API-nyckel: [kopiera från Endpoint-sidan]
Modell:     if/qwen3.8-max-preview (eller valfritt leverantörs-/modellprefix)
```

Om din redigerare inte kan skicka `Authorization: Bearer ...` använder du i stället den tokeniserade kompatibilitetsbasen:

```txt
Bas-URL: http://localhost:20128/api/v1/vscode/YOUR_KEY/
Modell-URL: http://localhost:20128/api/v1/vscode/YOUR_KEY/models
Chatt-URL: http://localhost:20128/api/v1/vscode/YOUR_KEY/chat/completions
URL för Ollama-taggar: http://localhost:20128/api/v1/vscode/YOUR_KEY/api/tags
```

Fungerar med Claude Code, Codex CLI, Cursor, Cline, OpenClaw, OpenCode och OpenAI-kompatibla SDK:er.

#### Automatisk konfiguration med `setup-*`

I stället för att klistra in bas-URL:en och nyckeln manuellt kan du låta OmniRoute skriva varje verktygs
egen konfiguration från den aktuella modellkatalogen. Ett kommando per verktyg:

```bash
omniroute setup-codex        # profiler i ~/.codex/<name>.config.toml
omniroute setup-claude       # ~/.claude/profiles/<name>/settings.json
omniroute setup-opencode     # ~/.config/opencode/opencode.json (OpenAI-kompatibel)
omniroute setup-cline        # inställningar för Cline CLI + VS Code-tillägget
omniroute setup-kilo         # Kilo Code
omniroute setup-continue     # ~/.continue/config.yaml (Continue / cn)
omniroute setup-cursor       # skriver ut stegen i Cursor-appen
omniroute setup-roo          # Roo Code-import + autoImport-pekare
omniroute setup-crush        # ~/.config/crush/crush.json
omniroute setup-goose        # ~/.config/goose/config.yaml
omniroute setup-aider        # ~/.aider.conf.yml
omniroute setup-qwen         # ~/.qwen/settings.json + ~/.qwen/.env
```

Varje kommando accepterar `--remote <url> --api-key <key>` för att konfigurera ett lokalt verktyg mot en
**fjärransluten** OmniRoute samt `--dry-run` för förhandsgranskning. Om du vill starta ett CLI med rätt
miljö injicerad utan att någon konfiguration skrivs använder du den generiska startaren
`omniroute run <target>` (claude, codex, aider, goose, opencode, qwen, gemini);
de äldre verktygsspecifika startarna `omniroute launch` (Claude Code) och
`omniroute launch-codex` (Codex) är fortfarande tillgängliga.

Den fullständiga tabellen (vad varje kommando skriver, alla flaggor, lokalt kontra fjärranslutet, bas-URL-
konventioner för `/v1`) finns i **[CLI-integrationer](./CLI-INTEGRATIONS.md)**.

Detaljerad konfiguration för varje verktyg (Claude Code, Codex CLI, Cursor, Cline, OpenClaw, Kilo Code, Copilot med flera) finns i den särskilda **[guiden för CLI-verktyg](../reference/CLI-TOOLS.md)**.

---

## Protokollkonfiguration (MCP + A2A)

### MCP-konfiguration (Model Context Protocol)

Starta MCP-transporten i stdio-läge:

```bash
omniroute --mcp
```

Rekommenderat valideringsflöde:

```bash
# 1. Starta MCP-servern
omniroute --mcp

# 2. Anropa följande från din MCP-klient:
omniroute_get_health        # Bör returnera systemets hälsostatus
omniroute_list_combos       # Bör returnera aktiva kombinationer

# 3. Eller kör hela E2E-sviten:
npm run test:protocols:e2e
```

#### Konfiguration av MCP-klient

**Claude Code:**

```bash
claude mcp add-server omniroute --type http --url http://localhost:20128/api/mcp/stream
```

**Cursor / Cline:**

Lägg till följande i dina MCP-inställningar:

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

**Fullständig MCP-dokumentation:** [README för MCP-servern](../../open-sse/mcp-server/README.md) — 110 verktyg, IDE-konfigurationer samt Python-/TS-/Go-klienter.

### A2A-konfiguration (Agent-to-Agent Protocol)

Verifiera Agent Card:

```bash
curl http://localhost:20128/.well-known/agent.json
```

Skicka en uppgift:

```bash
curl -X POST http://localhost:20128/a2a \
  -H 'content-type: application/json' \
  -d '{"jsonrpc":"2.0","id":"quickstart","method":"message/send","params":{"skill":"quota-management","messages":[{"role":"user","content":"Give me a short quota summary."}]}}'
```

**Fullständig A2A-dokumentation:** [README för A2A-servern](../../src/lib/a2a/README.md) — JSON-RPC 2.0, färdigheter, strömning och uppgifters livscykel.

---

## Konfiguration av tidsgränser

### Grundläggande tidsgränser

För de flesta driftsättningar behöver du bara dessa två variabler:

| Variabel                 | Standardvärde              | Syfte                                                                                                                                                                        |
| ------------------------ | -------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `REQUEST_TIMEOUT_MS`     | `600000`                   | Gemensam baslinje för tidsgränsen för start av uppströmssvar, dolda Undici-tidsgränser, TLS-fingeravtrycksförfrågningar och tidsgränser för API-bryggans förfrågningar/proxy |
| `STREAM_IDLE_TIMEOUT_MS` | ärver `REQUEST_TIMEOUT_MS` | Maximalt intervall mellan strömmande segment innan OmniRoute avbryter SSE-strömmen                                                                                           |

Bakåtkompatibiliteten bevaras: befintliga `FETCH_TIMEOUT_MS`, `API_BRIDGE_PROXY_TIMEOUT_MS` och andra tidsgränsvariabler per lager fungerar fortfarande och åsidosätter den gemensamma baslinjen.

### Leverantörsspecifika anmärkningar

För Claude Code-kompatibla uppströmsanslutningar (`anthropic-compatible-cc-*`) härleder OmniRoute det utgående `X-Stainless-Timeout`-huvudet från den fastställda tidsgränsen för hämtning, så att lästidsgränserna på leverantörssidan förblir synkroniserade med din miljökonfiguration.

För Claude Code-kompatibla omvända proxyservrar från tredje part behåller OmniRoute standarduppsättningen `anthropic-beta` konservativ och vidarebefordrar, när `Client Cache Control` är inställt på `Auto`, endast `cache_control`-markörer som tillhandahålls av klienten. Aktivera växlingsknappen "Enable redact-thinking beta" per anslutning endast när uppströmsservern uttryckligen kräver maskerade Claude-resonemangsströmmar.

### Avancerade åsidosättningar av tidsgränser

| Variabel                                 | Standardvärde                              | Syfte                                                                                      |
| ---------------------------------------- | ------------------------------------------ | ------------------------------------------------------------------------------------------ |
| `FETCH_TIMEOUT_MS`                       | ärver `REQUEST_TIMEOUT_MS`                 | Tidsgräns för start av uppströmssvar som används tills svarshuvuden tas emot               |
| `FETCH_HEADERS_TIMEOUT_MS`               | ärver `FETCH_TIMEOUT_MS`                   | Undici-tidsgräns för mottagning av uppströmmens svarshuvuden                               |
| `FETCH_BODY_TIMEOUT_MS`                  | ärver `FETCH_TIMEOUT_MS`                   | Undici-tidsgräns mellan segment i uppströmmens svarskropp (`0` inaktiverar den)            |
| `FETCH_CONNECT_TIMEOUT_MS`               | `30000`                                    | Undici-tidsgräns för TCP-anslutning                                                        |
| `FETCH_KEEPALIVE_TIMEOUT_MS`             | `4000`                                     | Undici-tidsgräns för inaktiv keep-alive-socket                                             |
| `TLS_CLIENT_TIMEOUT_MS`                  | ärver `FETCH_TIMEOUT_MS`                   | Tidsgräns för TLS-fingeravtrycksförfrågningar som görs via `wreq-js`                       |
| `API_BRIDGE_PROXY_TIMEOUT_MS`            | ärver `REQUEST_TIMEOUT_MS` eller `600000`  | Tidsgräns för vidarebefordran via `/v1`-proxy från API-porten till instrumentpanelens port |
| `API_BRIDGE_SERVER_REQUEST_TIMEOUT_MS`   | `max(API_BRIDGE_PROXY_TIMEOUT_MS, 300000)` | Tidsgräns för inkommande förfrågningar på API-bryggservern                                 |
| `API_BRIDGE_SERVER_HEADERS_TIMEOUT_MS`   | `60000`                                    | Tidsgräns för inkommande huvuden på API-bryggservern                                       |
| `API_BRIDGE_SERVER_KEEPALIVE_TIMEOUT_MS` | `5000`                                     | Keep-alive-tidsgräns på API-bryggservern                                                   |
| `API_BRIDGE_SERVER_SOCKET_TIMEOUT_MS`    | `0`                                        | Tidsgräns för socketinaktivitet på API-bryggservern (`0` inaktiverar den)                  |

> **Obs:** För strömmande förfrågningar omfattar `FETCH_TIMEOUT_MS` endast upprättandet av anslutningen/väntan på det första uppströmssvaret. När strömmen är aktiv avbryter OmniRoute endast vid ett faktiskt avbrott (`STREAM_IDLE_TIMEOUT_MS`) eller inaktivitet i Undici-svarskroppen (`FETCH_BODY_TIMEOUT_MS`).

### Kompatibilitet med omvänd proxy

Om du kör OmniRoute bakom Nginx, Caddy, Cloudflare eller en annan omvänd proxy ska du se till att proxyns tidsgränser också är högre än OmniRoutes tidsgränser för strömning/hämtning.

---

## Läge med separata portar

Kör API och instrumentpanelen på separata portar för avancerade scenarier (omvänd proxy, containernätverk):

```bash
PORT=20128 DASHBOARD_PORT=20129 omniroute
# API:              http://localhost:20128/v1
# Instrumentpanel:  http://localhost:20129
```

---

## Mall för Void Linux (xbps-src)

Som Void Linux-användare kan du bygga ett inbyggt paket med hjälp av `xbps-src`. Spara detta block som `srcpkgs/omniroute/template`:

```bash
# Mallfil för 'omniroute'
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
# Generera kontrollsumman på nytt för varje utgåva med:
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

## Avinstallation

| Kommando                 | Åtgärd                                                                                       |
| ------------------------ | -------------------------------------------------------------------------------------------- |
| `npm run uninstall`      | Tar bort systemappen men **behåller din databas och dina konfigurationer** i `~/.omniroute`. |
| `npm run uninstall:full` | Tar bort appen OCH **raderar permanent alla konfigurationer, nycklar och databaser**.        |

> Detaljerade avinstallationsanvisningar för alla metoder finns i [UNINSTALL.md](./UNINSTALL.md).
