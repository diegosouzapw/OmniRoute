# 📖 Setup Guide — OmniRoute (Eesti)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/SETUP_GUIDE.md) · 🇪🇹 [am](../../../am/docs/guides/SETUP_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/guides/SETUP_GUIDE.md) · 🇦🇿 [az](../../../az/docs/guides/SETUP_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/guides/SETUP_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/guides/SETUP_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/guides/SETUP_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/guides/SETUP_GUIDE.md) · 🇩🇰 [da](../../../da/docs/guides/SETUP_GUIDE.md) · 🇩🇪 [de](../../../de/docs/guides/SETUP_GUIDE.md) · 🇬🇷 [el](../../../el/docs/guides/SETUP_GUIDE.md) · 🇪🇸 [es](../../../es/docs/guides/SETUP_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/guides/SETUP_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/guides/SETUP_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/guides/SETUP_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/guides/SETUP_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/guides/SETUP_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/guides/SETUP_GUIDE.md) · 🇮🇱 [he](../../../he/docs/guides/SETUP_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/guides/SETUP_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/guides/SETUP_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/guides/SETUP_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/guides/SETUP_GUIDE.md) · 🇮🇩 [id](../../../id/docs/guides/SETUP_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/guides/SETUP_GUIDE.md) · 🇮🇹 [it](../../../it/docs/guides/SETUP_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/guides/SETUP_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/guides/SETUP_GUIDE.md) · 🇰🇭 [km](../../../km/docs/guides/SETUP_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/guides/SETUP_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/guides/SETUP_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/guides/SETUP_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/guides/SETUP_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/guides/SETUP_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/guides/SETUP_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/guides/SETUP_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/guides/SETUP_GUIDE.md) · 🇲🇲 [my](../../../my/docs/guides/SETUP_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/guides/SETUP_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/guides/SETUP_GUIDE.md) · 🇳🇴 [no](../../../no/docs/guides/SETUP_GUIDE.md) · 🇮🇳 [or](../../../or/docs/guides/SETUP_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/guides/SETUP_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/guides/SETUP_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/guides/SETUP_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/guides/SETUP_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/SETUP_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/guides/SETUP_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/guides/SETUP_GUIDE.md) · 🇱🇰 [si](../../../si/docs/guides/SETUP_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/guides/SETUP_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/guides/SETUP_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/guides/SETUP_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/guides/SETUP_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/guides/SETUP_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/guides/SETUP_GUIDE.md) · 🇮🇳 [te](../../../te/docs/guides/SETUP_GUIDE.md) · 🇹🇭 [th](../../../th/docs/guides/SETUP_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/guides/SETUP_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/SETUP_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/guides/SETUP_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/guides/SETUP_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/guides/SETUP_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/guides/SETUP_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/SETUP_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/SETUP_GUIDE.md)

---

> OmniRoute’i täielik seadistusjuhend. Kiirversiooni leiate [README kiirjuhendist](../README.md#-quick-start).

## Sisukord

- [Paigaldusmeetodid](#install-methods)
- [CLI-tööriista seadistamine](#cli-tool-configuration)
- [Protokollide seadistamine (MCP + A2A)](#protocol-setup-mcp--a2a)
- [Ajalõpu seadistamine](#timeout-configuration)
- [Eraldi portide režiim](#split-port-mode)
- [Void Linux (xbps-src)](#void-linux-xbps-src-template)
- [Desinstallimine](#uninstalling)

---

## Paigaldusmeetodid

### npm (soovitatav)

```bash
npm install -g omniroute
omniroute
```

Juhtpaneel avaneb aadressil `http://localhost:20128` ja API baas-URL on `http://localhost:20128/v1`.

### pnpm

```bash
pnpm add -g omniroute@latest --allow-build=better-sqlite3 --allow-build=@swc/core
omniroute
```

> **pnpm-i kasutajad:** lipp `--allow-build` on vajalik pakettide `better-sqlite3` ja `@swc/core` natiivsete ehitusskriptide lubamiseks. Käsku `pnpm approve-builds -g` ei toetata pnpm v11 globaalsete paigalduste korral.

### Arch Linux (AUR)

```bash
yay -S omniroute-bin
systemctl --user enable --now omniroute.service
```

[AUR-i pakett](https://aur.archlinux.org/packages/omniroute-bin) paigaldab OmniRoute’i ja sisaldab systemd kasutajateenust.

### Lähtekoodist

```bash
npm install
PORT=20128 DASHBOARD_PORT=20129 NEXT_PUBLIC_BASE_URL=http://localhost:20129 npm run dev
```

> **Märkus Windowsi kohta:** kui pärandkataloogi `%USERPROFILE%\.omniroute` pole olemas, kasutab OmniRoute vaikimisi kataloogi `%APPDATA%\omniroute`. Muu andmekataloogi asukoha valimiseks määrake `DATA_DIR`.

> **Märkus:** `npm install` genereerib esmakordsel käivitamisel faili `.env` automaatselt faili `.env.example` põhjal. Järgnevad paigaldused olemasolevat faili `.env` üle ei kirjuta, mistõttu kohandused säilivad. Uuesti algväärtustamiseks kustutage `.env` enne käsu korduskäivitamist.

### Docker

Täieliku Dockeri seadistuse, sealhulgas Compose’i profiilide ja Caddy HTTPS-i kohta vaadake [Dockeri juhendit](./DOCKER_GUIDE.md).

### Töölauarakendus (Electron)

OmniRoute sisaldab töölauaümbrist, mis põhineb Electron 41-l ja electron-builder 26.10-l. Saadaolevad skriptid (tööruumi juurkaustas):

```bash
npm run electron:dev          # Käivita töölauarakendus automaatse uuesti laadimisega
npm run electron:build        # Ehita praeguse operatsioonisüsteemi jaoks (tuvastatakse automaatselt)
npm run electron:build:win    # Windowsi paigaldusprogramm (NSIS + kaasaskantav)
npm run electron:build:mac    # macOS (dmg + zip, arm64+x64)
npm run electron:build:linux  # Linux (AppImage + deb + rpm)
npm run electron:smoke:packaged  # Pakendatud versiooni suitsutest
```

Töölauarakenduse paigaldusprogrammid lisatakse GitHubi väljalasetele. Electroni täieliku süvakäsitluse (allkirjastamine, IPC-sild, distributsioonid) leiate failist [`ELECTRON_GUIDE.md`](./ELECTRON_GUIDE.md) _(loodud hilisemas etapis)_.

### Graafilise liideseta server (CI/automatiseerimine)

Järelevalveta seadistuste (Docker, Kubernetes, CI) jaoks kasutage:

```bash
omniroute setup --non-interactive
omniroute providers test-batch
```

Koos keskkonnamuutujatega (`INITIAL_PASSWORD`, `OMNIROUTE_WS_BRIDGE_SECRET` jne) võimaldab see käivitada OmniRoute’i eksemplari täielikult skriptitaval viisil.

### CLI suvandid

| Käsk                    | Kirjeldus                                                                     |
| ----------------------- | ----------------------------------------------------------------------------- |
| `omniroute`             | Käivita server (`PORT=20128`, API ja juhtpaneel samas pordis)                 |
| `omniroute setup`       | Juhendatud CLI esmane seadistus parooli ja esimese teenusepakkuja jaoks       |
| `omniroute doctor`      | Käivita kohalikud tervisekontrollid ilma serverit käivitamata                 |
| `omniroute providers`   | Avasta, loetle, valideeri ja testi teenusepakkujaid CLI kaudu                 |
| `omniroute config`      | CLI-tööriista seadistus — loetle, hangi, määra ja valideeri seadistusi        |
| `omniroute status`      | Võrguühenduseta oleku juhtpaneel — versioon, andmebaas, tööriistad, seadistus |
| `omniroute logs`        | Voogedasta API-st kasutuslogisid (toetab lippu `--follow`)                    |
| `omniroute update`      | Kontrolli või rakenda OmniRoute’i värskendusi                                 |
| `omniroute provider`    | Halda teenusepakkuja ühendusi — lisa, loetle, eemalda, testi, määra vaikimisi |
| `omniroute --port 3000` | Määra kanooniliseks/API-pordiks 3000                                          |
| `omniroute --mcp`       | Käivita MCP-server (stdio-transport)                                          |
| `omniroute --no-open`   | Ära ava brauserit automaatselt                                                |
| `omniroute --help`      | Kuva abi                                                                      |

Graafilise liideseta seadistust saab skriptida lippude või keskkonnamuutujatega:

```bash
omniroute setup --non-interactive --password "$OMNIROUTE_PASSWORD"
omniroute setup --non-interactive --add-provider --provider openai --api-key "$OPENAI_API_KEY"
omniroute setup --non-interactive --add-provider --provider openai --api-key "$OPENAI_API_KEY" --test-provider
```

Kohaliku diagnostika käivitamine ilma juhtpaneeli avamata:

```bash
omniroute doctor
omniroute doctor --json
omniroute doctor --no-liveness
```

Teenusepakkujate haldamine SSH või skriptide kaudu ilma juhtpaneeli avamata:

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

## CLI-tööriista seadistamine

### 1) Ühendage teenusepakkujad ja looge API-võti

1. Avage Dashboard → `Providers` ja ühendage vähemalt üks teenusepakkuja (OAuthi või API-võtme abil).
2. Avage Dashboard → `Endpoints` ja looge API-võti.
3. (Valikuline) Avage Dashboard → `Combos` ja määrake varuahel.

### 2) Suunake oma programmeerimistööriist

```txt
Baas-URL: http://localhost:20128/v1
API-võti: [kopeerige lehelt Endpoint]
Mudel:    if/qwen3.8-max-preview (või mis tahes teenusepakkuja/mudeli prefiks)
```

Kui teie redaktor ei saa saata päist `Authorization: Bearer ...`, kasutage selle asemel tokeniseeritud ühilduvusbaasi:

```txt
Baas-URL: http://localhost:20128/api/v1/vscode/YOUR_KEY/
Mudelite URL: http://localhost:20128/api/v1/vscode/YOUR_KEY/models
Vestluse URL: http://localhost:20128/api/v1/vscode/YOUR_KEY/chat/completions
Ollama siltide URL: http://localhost:20128/api/v1/vscode/YOUR_KEY/api/tags
```

Töötab Claude Code'i, Codex CLI, Cursori, Cline'i, OpenClaw', OpenCode'i ja OpenAI-ga ühilduvate SDK-dega.

#### Automaatne seadistamine käsuga `setup-*`

Selle asemel, et baas-URL ja võti käsitsi kleepida, laske OmniRoute'il kirjutada iga tööriista
konfiguratsioon aktiivse mudelikataloogi põhjal. Üks käsk tööriista kohta:

```bash
omniroute setup-codex        # ~/.codex/<name>.config.toml profiilid
omniroute setup-claude       # ~/.claude/profiles/<name>/settings.json
omniroute setup-opencode     # ~/.config/opencode/opencode.json (OpenAI-ga ühilduv)
omniroute setup-cline        # Cline CLI + VS Code'i laienduse sätted
omniroute setup-kilo         # Kilo Code
omniroute setup-continue     # ~/.continue/config.yaml (Continue / cn)
omniroute setup-cursor       # väljastab Cursori rakendusesisesed juhised
omniroute setup-roo          # Roo Code'i import + autoImporti viit
omniroute setup-crush        # ~/.config/crush/crush.json
omniroute setup-goose        # ~/.config/goose/config.yaml
omniroute setup-aider        # ~/.aider.conf.yml
omniroute setup-qwen         # ~/.qwen/settings.json + ~/.qwen/.env
```

Iga käsk toetab suvandit `--remote <url> --api-key <key>`, et seadistada kohalik tööriist
**kaugserveris** töötava OmniRoute'i kasutamiseks, ning suvandit `--dry-run` eelvaate kuvamiseks. Õigete
keskkonnamuutujatega CLI käivitamiseks ilma ühtegi konfiguratsiooni kirjutamata kasutage üldist käivitajat
`omniroute run <target>` (claude, codex, aider, goose, opencode, qwen, gemini);
pärandtööriistapõhised käivitajad `omniroute launch` (Claude Code) ja
`omniroute launch-codex` (Codex) on endiselt saadaval.

Täieliku tabeli (mida iga käsk kirjutab, kõik lipud, kohalik vs. kaugserver, baas-URL-i
`/v1` tavad) leiate jaotisest **[CLI-integratsioonid](./CLI-INTEGRATIONS.md)**.

Üksikasjalikud tööriistapõhised seadistusjuhised (Claude Code, Codex CLI, Cursor, Cline, OpenClaw, Kilo Code, Copilot ja muud) leiate eraldi juhendist **[CLI-tööriistade juhend](../reference/CLI-TOOLS.md)**.

---

## Protokollide seadistamine (MCP + A2A)

### MCP seadistamine (Model Context Protocol)

Käivitage MCP-transport stdio-režiimis:

```bash
omniroute --mcp
```

Soovitatav valideerimisvoog:

```bash
# 1. Käivitage MCP-server
omniroute --mcp

# 2. Kutsuge oma MCP-kliendist välja:
omniroute_get_health        # Peaks tagastama süsteemi seisundi
omniroute_list_combos       # Peaks tagastama aktiivsed kombinatsioonid

# 3. Või käivitage täielik E2E-testikomplekt:
npm run test:protocols:e2e
```

#### MCP-kliendi seadistamine

**Claude Code:**

```bash
claude mcp add-server omniroute --type http --url http://localhost:20128/api/mcp/stream
```

**Cursor / Cline:**

Lisage oma MCP-sätetesse:

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

**Täielik MCP-dokumentatsioon:** [MCP-serveri README](../../open-sse/mcp-server/README.md) — 110 tööriista, IDE konfiguratsioonid, Pythoni/TS-i/Go kliendid.

### A2A seadistamine (agentidevaheline protokoll)

Kontrollige agendikaarti:

```bash
curl http://localhost:20128/.well-known/agent.json
```

Saatke ülesanne:

```bash
curl -X POST http://localhost:20128/a2a \
  -H 'content-type: application/json' \
  -d '{"jsonrpc":"2.0","id":"quickstart","method":"message/send","params":{"skill":"quota-management","messages":[{"role":"user","content":"Give me a short quota summary."}]}}'
```

**Täielik A2A-dokumentatsioon:** [A2A-serveri README](../../src/lib/a2a/README.md) — JSON-RPC 2.0, oskused, voogedastus, ülesande elutsükkel.

---

## Ajalõpu seadistus

### Põhilised ajalõpud

Enamiku juurutuste puhul vajate ainult neid kahte muutujat:

| Muutuja                  | Vaikeväärtus                        | Otstarve                                                                                                                                                        |
| ------------------------ | ----------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `REQUEST_TIMEOUT_MS`     | `600000`                            | Ühine lähtetase ülesvoolu vastuse alguse ajalõpu, peidetud Undici ajalõppude, TLS-sõrmejäljepäringute ning API-silla päringu- ja puhverserveri ajalõppude jaoks |
| `STREAM_IDLE_TIMEOUT_MS` | pärib väärtuse `REQUEST_TIMEOUT_MS` | Maksimaalne ajavahemik voogedastuse andmeplokkide vahel, enne kui OmniRoute katkestab SSE-voo                                                                   |

Tagasiühilduvus säilib: olemasolevad `FETCH_TIMEOUT_MS`, `API_BRIDGE_PROXY_TIMEOUT_MS` ja muud kihipõhised ajalõpumuutujad töötavad endiselt ning alistavad ühise lähtetaseme.

### Teenusepakkujapõhised märkused

Claude Code'iga ühilduvate ülesvooluteenuste (`anthropic-compatible-cc-*`) puhul tuletab OmniRoute väljamineva `X-Stainless-Timeout` päise lahendatud päringu ajalõpust, et teenusepakkujapoolsed lugemise ajalõpud oleksid teie keskkonnaseadistusega kooskõlas.

Kolmandate osapoolte Claude Code'iga ühilduvate pöördpuhverserverite puhul hoiab OmniRoute vaikimisi `anthropic-beta` väärtuste komplekti konservatiivsena ja kui `Client Cache Control` on jäetud väärtusele `Auto`, edastab ainult kliendi määratud `cache_control` markerid. Lubage ühendusepõhine lüliti „Enable redact-thinking beta” ainult siis, kui ülesvooluteenus nõuab konkreetselt redigeeritud Claude'i mõttekäigu vooge.

### Täpsemad ajalõpu alistused

| Muutuja                                  | Vaikeväärtus                                     | Otstarve                                                                        |
| ---------------------------------------- | ------------------------------------------------ | ------------------------------------------------------------------------------- |
| `FETCH_TIMEOUT_MS`                       | pärib väärtuse `REQUEST_TIMEOUT_MS`              | Ülesvoolu vastuse alguse ajalõpp, mida kasutatakse vastusepäiste saabumiseni    |
| `FETCH_HEADERS_TIMEOUT_MS`               | pärib väärtuse `FETCH_TIMEOUT_MS`                | Undici ajapiirang ülesvoolu vastusepäiste vastuvõtmiseks                        |
| `FETCH_BODY_TIMEOUT_MS`                  | pärib väärtuse `FETCH_TIMEOUT_MS`                | Undici ajapiirang ülesvoolu vastuse sisu andmeplokkide vahel (`0` keelab selle) |
| `FETCH_CONNECT_TIMEOUT_MS`               | `30000`                                          | Undici TCP-ühenduse loomise ajalõpp                                             |
| `FETCH_KEEPALIVE_TIMEOUT_MS`             | `4000`                                           | Undici jõudeoleva keep-alive-sokli ajalõpp                                      |
| `TLS_CLIENT_TIMEOUT_MS`                  | pärib väärtuse `FETCH_TIMEOUT_MS`                | `wreq-js` kaudu tehtavate TLS-sõrmejäljepäringute ajalõpp                       |
| `API_BRIDGE_PROXY_TIMEOUT_MS`            | pärib väärtuse `REQUEST_TIMEOUT_MS` või `600000` | API-pordist töölauaporti suunatava `/v1` puhverserveriliikluse ajalõpp          |
| `API_BRIDGE_SERVER_REQUEST_TIMEOUT_MS`   | `max(API_BRIDGE_PROXY_TIMEOUT_MS, 300000)`       | API-silla serveri sissetuleva päringu ajalõpp                                   |
| `API_BRIDGE_SERVER_HEADERS_TIMEOUT_MS`   | `60000`                                          | API-silla serveri sissetulevate päiste ajalõpp                                  |
| `API_BRIDGE_SERVER_KEEPALIVE_TIMEOUT_MS` | `5000`                                           | API-silla serveri keep-alive-ajalõpp                                            |
| `API_BRIDGE_SERVER_SOCKET_TIMEOUT_MS`    | `0`                                              | API-silla serveri sokli tegevusetuse ajalõpp (`0` keelab selle)                 |

> **Märkus:** Voogedastuspäringute puhul hõlmab `FETCH_TIMEOUT_MS` ainult ühenduse loomist / esimese ülesvoolu vastuse ootamist. Kui voog on aktiivne, katkestab OmniRoute selle ainult tegeliku seiskumise (`STREAM_IDLE_TIMEOUT_MS`) või Undici vastuse sisu tegevusetuse (`FETCH_BODY_TIMEOUT_MS`) korral.

### Pöördpuhverserveri ühilduvus

Kui käitate OmniRoute'i Nginxi, Caddy, Cloudflare'i või mõne muu pöördpuhverserveri taga, veenduge, et ka puhverserveri ajalõpud oleksid pikemad kui OmniRoute'i voo-/päringuajalõpud.

---

## Eraldi portide režiim

Käivitage API ja töölaud eraldi portides täiustatud kasutusjuhtude jaoks (pöördpuhverserver, konteinerivõrk):

```bash
PORT=20128 DASHBOARD_PORT=20129 omniroute
# API:       http://localhost:20128/v1
# Töölaud:   http://localhost:20129
```

---

## Void Linuxi (xbps-src) mall

Void Linuxi kasutajad saavad luua omapaketi tööriistaga `xbps-src`. Salvestage see plokk failina `srcpkgs/omniroute/template`:

```bash
# Mallifail paketile „omniroute”
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
# Genereerige kontrollsumma iga väljalaske jaoks uuesti käsuga:
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

## Desinstallimine

| Käsk                     | Toiming                                                                                                 |
| ------------------------ | ------------------------------------------------------------------------------------------------------- |
| `npm run uninstall`      | Eemaldab süsteemirakenduse, kuid **säilitab teie andmebaasi ja seadistused** kataloogis `~/.omniroute`. |
| `npm run uninstall:full` | Eemaldab rakenduse JA **kustutab jäädavalt kõik seadistused, võtmed ja andmebaasid**.                   |

> Kõigi meetodite üksikasjalikud desinstallimisjuhised leiate failist [UNINSTALL.md](./UNINSTALL.md).
