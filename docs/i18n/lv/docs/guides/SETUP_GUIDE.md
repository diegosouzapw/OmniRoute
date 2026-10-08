# 📖 Setup Guide — OmniRoute (Latviešu)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/SETUP_GUIDE.md) · 🇪🇹 [am](../../../am/docs/guides/SETUP_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/guides/SETUP_GUIDE.md) · 🇦🇿 [az](../../../az/docs/guides/SETUP_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/guides/SETUP_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/guides/SETUP_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/guides/SETUP_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/guides/SETUP_GUIDE.md) · 🇩🇰 [da](../../../da/docs/guides/SETUP_GUIDE.md) · 🇩🇪 [de](../../../de/docs/guides/SETUP_GUIDE.md) · 🇬🇷 [el](../../../el/docs/guides/SETUP_GUIDE.md) · 🇪🇸 [es](../../../es/docs/guides/SETUP_GUIDE.md) · 🇪🇪 [et](../../../et/docs/guides/SETUP_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/guides/SETUP_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/guides/SETUP_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/guides/SETUP_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/guides/SETUP_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/guides/SETUP_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/guides/SETUP_GUIDE.md) · 🇮🇱 [he](../../../he/docs/guides/SETUP_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/guides/SETUP_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/guides/SETUP_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/guides/SETUP_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/guides/SETUP_GUIDE.md) · 🇮🇩 [id](../../../id/docs/guides/SETUP_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/guides/SETUP_GUIDE.md) · 🇮🇹 [it](../../../it/docs/guides/SETUP_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/guides/SETUP_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/guides/SETUP_GUIDE.md) · 🇰🇭 [km](../../../km/docs/guides/SETUP_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/guides/SETUP_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/guides/SETUP_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/guides/SETUP_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/guides/SETUP_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/guides/SETUP_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/guides/SETUP_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/guides/SETUP_GUIDE.md) · 🇲🇲 [my](../../../my/docs/guides/SETUP_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/guides/SETUP_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/guides/SETUP_GUIDE.md) · 🇳🇴 [no](../../../no/docs/guides/SETUP_GUIDE.md) · 🇮🇳 [or](../../../or/docs/guides/SETUP_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/guides/SETUP_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/guides/SETUP_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/guides/SETUP_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/guides/SETUP_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/SETUP_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/guides/SETUP_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/guides/SETUP_GUIDE.md) · 🇱🇰 [si](../../../si/docs/guides/SETUP_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/guides/SETUP_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/guides/SETUP_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/guides/SETUP_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/guides/SETUP_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/guides/SETUP_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/guides/SETUP_GUIDE.md) · 🇮🇳 [te](../../../te/docs/guides/SETUP_GUIDE.md) · 🇹🇭 [th](../../../th/docs/guides/SETUP_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/guides/SETUP_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/SETUP_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/guides/SETUP_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/guides/SETUP_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/guides/SETUP_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/guides/SETUP_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/SETUP_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/SETUP_GUIDE.md)

---

> Pilnīga OmniRoute iestatīšanas uzziņa. Īsajai versijai skatiet [ātro sākšanu README failā](../README.md#-quick-start).

## Satura rādītājs

- [Instalēšanas metodes](#install-methods)
- [CLI rīka konfigurācija](#cli-tool-configuration)
- [Protokolu iestatīšana (MCP + A2A)](#protocol-setup-mcp--a2a)
- [Taimautu konfigurācija](#timeout-configuration)
- [Dalīto portu režīms](#split-port-mode)
- [Void Linux (xbps-src)](#void-linux-xbps-src-template)
- [Atinstalēšana](#uninstalling)

---

## Instalēšanas metodes

### npm (ieteicams)

```bash
npm install -g omniroute
omniroute
```

Informācijas panelis tiek atvērts adresē `http://localhost:20128`, un API bāzes URL ir `http://localhost:20128/v1`.

### pnpm

```bash
pnpm add -g omniroute@latest --allow-build=better-sqlite3 --allow-build=@swc/core
omniroute
```

> **pnpm lietotājiem:** karodziņš `--allow-build` ir nepieciešams, lai iespējotu `better-sqlite3` un `@swc/core` vietējos būvēšanas skriptus. Komanda `pnpm approve-builds -g` netiek atbalstīta globālām instalācijām ar pnpm v11.

### Arch Linux (AUR)

```bash
yay -S omniroute-bin
systemctl --user enable --now omniroute.service
```

[AUR pakotne](https://aur.archlinux.org/packages/omniroute-bin) instalē OmniRoute un nodrošina systemd lietotāja servisu.

### No pirmkoda

```bash
npm install
PORT=20128 DASHBOARD_PORT=20129 NEXT_PUBLIC_BASE_URL=http://localhost:20129 npm run dev
```

> **Piezīme Windows lietotājiem:** pēc noklusējuma OmniRoute izmanto `%APPDATA%\omniroute`, ja mantotais direktorijs `%USERPROFILE%\.omniroute` nepastāv. Iestatiet `DATA_DIR`, lai izvēlētos citu datu direktorija atrašanās vietu.

> **Piezīme:** pirmajā palaišanas reizē `npm install` automātiski ģenerē `.env` no `.env.example`. Turpmākās instalēšanas nepārrakstīs esošu `.env`, tāpēc pielāgojumi tiks saglabāti. Lai to ģenerētu no jauna, pirms atkārtotas palaišanas izdzēsiet `.env`.

### Docker

Pilnīgu Docker iestatīšanas aprakstu, tostarp Compose profilus un Caddy HTTPS, skatiet [Docker rokasgrāmatā](./DOCKER_GUIDE.md).

### Darbvirsmas lietotne (Electron)

OmniRoute ietver darbvirsmas ietvarprogrammu, kas veidota ar Electron 41 + electron-builder 26.10. Pieejamie skripti (darbvietas saknē):

```bash
npm run electron:dev          # Palaist darbvirsmas lietotni ar automātisku pārlādi
npm run electron:build        # Būvēt pašreizējai OS (automātiski noteiktai)
npm run electron:build:win    # Windows instalētājs (NSIS + portatīvā versija)
npm run electron:build:mac    # macOS (dmg + zip, arm64+x64)
npm run electron:build:linux  # Linux (AppImage + deb + rpm)
npm run electron:smoke:packaged  # Veikt pakotās būvējuma versijas dūmu testu
```

Darbvirsmas instalētāju laidieni ir pievienoti GitHub laidieniem. Pilnīgu un padziļinātu Electron aprakstu (parakstīšana, IPC tilts, distributīvi) skatiet [`ELECTRON_GUIDE.md`](./ELECTRON_GUIDE.md) _(izveidots vēlākā posmā)_.

### Bezgalvas serveris (CI/automatizācija)

Bezuzraudzības iestatīšanai (Docker, Kubernetes, CI) izmantojiet:

```bash
omniroute setup --non-interactive
omniroute providers test-batch
```

Apvienojot to ar vides mainīgajiem (`INITIAL_PASSWORD`, `OMNIROUTE_WS_BRIDGE_SECRET` u.c.), varat palaist pilnībā skriptējamu OmniRoute instanci.

### CLI opcijas

| Komanda                 | Apraksts                                                                                            |
| ----------------------- | --------------------------------------------------------------------------------------------------- |
| `omniroute`             | Palaist serveri (`PORT=20128`, API un informācijas panelis vienā portā)                             |
| `omniroute setup`       | Vadīta CLI sākotnējā iestatīšana parolei un pirmajam nodrošinātājam                                 |
| `omniroute doctor`      | Veikt lokālas veselības pārbaudes, nepalaižot serveri                                               |
| `omniroute providers`   | Atklāt, uzskaitīt, validēt un testēt nodrošinātājus no CLI                                          |
| `omniroute config`      | CLI rīka konfigurācija — uzskaitīt, iegūt, iestatīt un validēt konfigurācijas                       |
| `omniroute status`      | Bezsaistes statusa panelis — versija, DB, rīki un konfigurācija                                     |
| `omniroute logs`        | Straumēt lietojuma žurnālus no API (atbalsta `--follow`)                                            |
| `omniroute update`      | Pārbaudīt vai lietot OmniRoute atjauninājumus                                                       |
| `omniroute provider`    | Pārvaldīt nodrošinātāju savienojumus — pievienot, uzskaitīt, noņemt, testēt un iestatīt noklusējumu |
| `omniroute --port 3000` | Iestatīt kanonisko/API portu uz 3000                                                                |
| `omniroute --mcp`       | Palaist MCP serveri (stdio transports)                                                              |
| `omniroute --no-open`   | Automātiski neatvērt pārlūkprogrammu                                                                |
| `omniroute --help`      | Parādīt palīdzību                                                                                   |

Bezgalvas iestatīšanu var skriptēt, izmantojot karodziņus vai vides mainīgos:

```bash
omniroute setup --non-interactive --password "$OMNIROUTE_PASSWORD"
omniroute setup --non-interactive --add-provider --provider openai --api-key "$OPENAI_API_KEY"
omniroute setup --non-interactive --add-provider --provider openai --api-key "$OPENAI_API_KEY" --test-provider
```

Veiciet lokālo diagnostiku, neatverot informācijas paneli:

```bash
omniroute doctor
omniroute doctor --json
omniroute doctor --no-liveness
```

Pārvaldiet nodrošinātājus, izmantojot SSH vai skriptus un neatverot informācijas paneli:

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

## CLI rīka konfigurācija

### 1) Savienojiet pakalpojumu sniedzējus un izveidojiet API atslēgu

1. Atveriet informācijas paneli → `Providers` un pievienojiet vismaz vienu pakalpojumu sniedzēju (OAuth vai API atslēgu).
2. Atveriet informācijas paneli → `Endpoints` un izveidojiet API atslēgu.
3. (Neobligāti) Atveriet informācijas paneli → `Combos` un iestatiet rezerves ķēdi.

### 2) Konfigurējiet savu programmēšanas rīku

```txt
Bāzes URL: http://localhost:20128/v1
API atslēga:  [kopējiet no galapunkta lapas]
Modelis:    if/qwen3.8-max-preview (vai jebkurš pakalpojuma sniedzēja/modeļa prefikss)
```

Ja jūsu redaktors nevar nosūtīt `Authorization: Bearer ...`, tā vietā izmantojiet tokenizēto saderības bāzes adresi:

```txt
Bāzes URL: http://localhost:20128/api/v1/vscode/YOUR_KEY/
Modeļu URL: http://localhost:20128/api/v1/vscode/YOUR_KEY/models
Tērzēšanas URL: http://localhost:20128/api/v1/vscode/YOUR_KEY/chat/completions
Ollama tagu URL: http://localhost:20128/api/v1/vscode/YOUR_KEY/api/tags
```

Darbojas ar Claude Code, Codex CLI, Cursor, Cline, OpenClaw, OpenCode un ar OpenAI saderīgiem SDK.

#### Automātiska konfigurēšana ar `setup-*`

Tā vietā, lai manuāli ielīmētu bāzes URL un atslēgu, ļaujiet OmniRoute izveidot katra rīka
konfigurāciju no aktuālā modeļu kataloga. Viena komanda katram rīkam:

```bash
omniroute setup-codex        # ~/.codex/<name>.config.toml profili
omniroute setup-claude       # ~/.claude/profiles/<name>/settings.json
omniroute setup-opencode     # ~/.config/opencode/opencode.json (saderīgs ar openai)
omniroute setup-cline        # Cline CLI + VS Code paplašinājuma iestatījumi
omniroute setup-kilo         # Kilo Code
omniroute setup-continue     # ~/.continue/config.yaml (Continue / cn)
omniroute setup-cursor       # izdrukā Cursor lietotnē veicamās darbības
omniroute setup-roo          # Roo Code imports + autoImport rādītājs
omniroute setup-crush        # ~/.config/crush/crush.json
omniroute setup-goose        # ~/.config/goose/config.yaml
omniroute setup-aider        # ~/.aider.conf.yml
omniroute setup-qwen         # ~/.qwen/settings.json + ~/.qwen/.env
```

Katra komanda pieņem `--remote <url> --api-key <key>`, lai konfigurētu lokālu rīku darbam ar
**attālu** OmniRoute, kā arī `--dry-run` priekšskatījumam. Lai palaistu CLI ar ievadītu pareizo
vidi, vispār neierakstot konfigurāciju, izmantojiet vispārīgo palaidēju
`omniroute run <target>` (claude, codex, aider, goose, opencode, qwen, gemini);
joprojām ir pieejami mantotie atsevišķu rīku palaidēji `omniroute launch` (Claude Code) un
`omniroute launch-codex` (Codex).

Pilnu tabulu (ko katra komanda ieraksta, visi karodziņi, lokālais un attālais režīms, bāzes URL
`/v1` principi) skatiet sadaļā **[CLI integrācijas](./CLI-INTEGRATIONS.md)**.

Detalizētu katra rīka konfigurāciju (Claude Code, Codex CLI, Cursor, Cline, OpenClaw, Kilo Code, Copilot un citiem) skatiet atsevišķajā **[CLI rīku ceļvedī](../reference/CLI-TOOLS.md)**.

---

## Protokolu iestatīšana (MCP + A2A)

### MCP iestatīšana (Modeļa konteksta protokols)

Palaidiet MCP transportu stdio režīmā:

```bash
omniroute --mcp
```

Ieteicamā validācijas secība:

```bash
# 1. Palaidiet MCP serveri
omniroute --mcp

# 2. Savā MCP klientā izsauciet:
omniroute_get_health        # Jāatgriež sistēmas darbspējas stāvoklis
omniroute_list_combos       # Jāatgriež aktīvās kombinācijas

# 3. Vai palaidiet pilno E2E komplektu:
npm run test:protocols:e2e
```

#### MCP klienta konfigurācija

**Claude Code:**

```bash
claude mcp add-server omniroute --type http --url http://localhost:20128/api/mcp/stream
```

**Cursor / Cline:**

Pievienojiet saviem MCP iestatījumiem:

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

**Pilna MCP dokumentācija:** [MCP servera README](../../open-sse/mcp-server/README.md) — 110 rīki, IDE konfigurācijas, Python/TS/Go klienti.

### A2A iestatīšana (Aģentu savstarpējās saziņas protokols)

Pārbaudiet aģenta karti:

```bash
curl http://localhost:20128/.well-known/agent.json
```

Nosūtiet uzdevumu:

```bash
curl -X POST http://localhost:20128/a2a \
  -H 'content-type: application/json' \
  -d '{"jsonrpc":"2.0","id":"quickstart","method":"message/send","params":{"skill":"quota-management","messages":[{"role":"user","content":"Give me a short quota summary."}]}}'
```

**Pilna A2A dokumentācija:** [A2A servera README](../../src/lib/a2a/README.md) — JSON-RPC 2.0, prasmes, straumēšana, uzdevuma dzīves cikls.

---

## Taimauta konfigurācija

### Pamata taimauti

Vairumam izvietojumu ir nepieciešami tikai šie divi mainīgie:

| Mainīgais                | Noklusējums                | Mērķis                                                                                                                                                                                |
| ------------------------ | -------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `REQUEST_TIMEOUT_MS`     | `600000`                   | Kopīga bāzes vērtība augšupstraumes atbildes sākuma taimautam, slēptajiem Undici taimautiem, TLS ciparnospieduma pieprasījumiem un API tilta pieprasījumu/starpniekservera taimautiem |
| `STREAM_IDLE_TIMEOUT_MS` | manto `REQUEST_TIMEOUT_MS` | Maksimālais intervāls starp straumēšanas fragmentiem, pirms OmniRoute pārtrauc SSE straumi                                                                                            |

Atpakaļsaderība tiek saglabāta: esošie `FETCH_TIMEOUT_MS`, `API_BRIDGE_PROXY_TIMEOUT_MS` un citi katram slānim paredzētie taimauta mainīgie joprojām darbojas un pārraksta kopīgo bāzes vērtību.

### Piezīmes par konkrētiem pakalpojumu sniedzējiem

Ar Claude Code saderīgām augšupstraumēm (`anthropic-compatible-cc-*`) OmniRoute atvasina izejošo `X-Stainless-Timeout` galveni no noteiktā ielādes taimauta, lai pakalpojumu sniedzēja puses lasīšanas taimauti būtu saskaņoti ar jūsu vides konfigurāciju.

Trešo pušu ar Claude Code saderīgiem reversajiem starpniekserveriem OmniRoute saglabā konservatīvu noklusējuma `anthropic-beta` kopu un, ja `Client Cache Control` ir atstāts iestatījumā `Auto`, pārsūta tikai klienta nodrošinātos `cache_control` marķierus. Iespējojiet katram savienojumam paredzēto pārslēgu "Iespējot redact-thinking beta" tikai tad, ja augšupstraumei ir īpaši nepieciešamas rediģētas Claude domāšanas straumes.

### Papildu taimautu pārrakstīšana

| Mainīgais                                | Noklusējums                                | Mērķis                                                                                       |
| ---------------------------------------- | ------------------------------------------ | -------------------------------------------------------------------------------------------- |
| `FETCH_TIMEOUT_MS`                       | manto `REQUEST_TIMEOUT_MS`                 | Augšupstraumes atbildes sākuma taimauts, kas tiek izmantots līdz atbildes galveņu saņemšanai |
| `FETCH_HEADERS_TIMEOUT_MS`               | manto `FETCH_TIMEOUT_MS`                   | Undici laika ierobežojums augšupstraumes atbildes galveņu saņemšanai                         |
| `FETCH_BODY_TIMEOUT_MS`                  | manto `FETCH_TIMEOUT_MS`                   | Undici laika ierobežojums starp augšupstraumes pamatteksta fragmentiem (`0` to atspējo)      |
| `FETCH_CONNECT_TIMEOUT_MS`               | `30000`                                    | Undici TCP savienojuma taimauts                                                              |
| `FETCH_KEEPALIVE_TIMEOUT_MS`             | `4000`                                     | Undici neaktīva keep-alive ligzdas savienojuma taimauts                                      |
| `TLS_CLIENT_TIMEOUT_MS`                  | manto `FETCH_TIMEOUT_MS`                   | Taimauts TLS ciparnospieduma pieprasījumiem, kas veikti, izmantojot `wreq-js`                |
| `API_BRIDGE_PROXY_TIMEOUT_MS`            | manto `REQUEST_TIMEOUT_MS` vai `600000`    | Taimauts `/v1` starpniekpārsūtīšanai no API porta uz informācijas paneļa portu               |
| `API_BRIDGE_SERVER_REQUEST_TIMEOUT_MS`   | `max(API_BRIDGE_PROXY_TIMEOUT_MS, 300000)` | API tilta serverī ienākošā pieprasījuma taimauts                                             |
| `API_BRIDGE_SERVER_HEADERS_TIMEOUT_MS`   | `60000`                                    | API tilta serverī ienākošo galveņu taimauts                                                  |
| `API_BRIDGE_SERVER_KEEPALIVE_TIMEOUT_MS` | `5000`                                     | Keep-alive taimauts API tilta serverī                                                        |
| `API_BRIDGE_SERVER_SOCKET_TIMEOUT_MS`    | `0`                                        | Ligzdas neaktivitātes taimauts API tilta serverī (`0` to atspējo)                            |

> **Piezīme:** Straumēšanas pieprasījumiem `FETCH_TIMEOUT_MS` attiecas tikai uz savienojuma izveidi / pirmās augšupstraumes atbildes gaidīšanu. Kad straume ir aktīva, OmniRoute to pārtrauks tikai faktiskas aiztures (`STREAM_IDLE_TIMEOUT_MS`) vai Undici pamatteksta neaktivitātes (`FETCH_BODY_TIMEOUT_MS`) gadījumā.

### Saderība ar reversajiem starpniekserveriem

Ja izmantojat OmniRoute aiz Nginx, Caddy, Cloudflare vai cita reversā starpniekservera, pārliecinieties, ka arī starpniekservera taimauti ir lielāki par OmniRoute straumes/ielādes taimautiem.

---

## Dalīto portu režīms

Palaidiet API un informācijas paneli atsevišķos portos sarežģītākiem scenārijiem (reversais starpniekserveris, konteineru tīklošana):

```bash
PORT=20128 DASHBOARD_PORT=20129 omniroute
# API:                 http://localhost:20128/v1
# Informācijas panelis: http://localhost:20129
```

---

## Void Linux (xbps-src) veidne

Void Linux lietotāji var izveidot vietējo pakotni, izmantojot `xbps-src`. Saglabājiet šo bloku kā `srcpkgs/omniroute/template`:

```bash
# Veidnes fails pakotnei 'omniroute'
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
# Ģenerējiet kontrolsummu no jauna katram laidienam, izmantojot:
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

## Atinstalēšana

| Komanda                  | Darbība                                                                                       |
| ------------------------ | --------------------------------------------------------------------------------------------- |
| `npm run uninstall`      | Noņem sistēmas lietotni, bet **saglabā jūsu datubāzi un konfigurācijas** mapē `~/.omniroute`. |
| `npm run uninstall:full` | Noņem lietotni UN neatgriezeniski **izdzēš visas konfigurācijas, atslēgas un datubāzes**.     |

> Detalizētus norādījumus par atinstalēšanu ar visām metodēm skatiet failā [UNINSTALL.md](./UNINSTALL.md).
