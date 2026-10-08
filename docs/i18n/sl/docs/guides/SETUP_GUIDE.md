# 📖 Setup Guide — OmniRoute (Slovenščina)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/SETUP_GUIDE.md) · 🇪🇹 [am](../../../am/docs/guides/SETUP_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/guides/SETUP_GUIDE.md) · 🇦🇿 [az](../../../az/docs/guides/SETUP_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/guides/SETUP_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/guides/SETUP_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/guides/SETUP_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/guides/SETUP_GUIDE.md) · 🇩🇰 [da](../../../da/docs/guides/SETUP_GUIDE.md) · 🇩🇪 [de](../../../de/docs/guides/SETUP_GUIDE.md) · 🇬🇷 [el](../../../el/docs/guides/SETUP_GUIDE.md) · 🇪🇸 [es](../../../es/docs/guides/SETUP_GUIDE.md) · 🇪🇪 [et](../../../et/docs/guides/SETUP_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/guides/SETUP_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/guides/SETUP_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/guides/SETUP_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/guides/SETUP_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/guides/SETUP_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/guides/SETUP_GUIDE.md) · 🇮🇱 [he](../../../he/docs/guides/SETUP_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/guides/SETUP_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/guides/SETUP_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/guides/SETUP_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/guides/SETUP_GUIDE.md) · 🇮🇩 [id](../../../id/docs/guides/SETUP_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/guides/SETUP_GUIDE.md) · 🇮🇹 [it](../../../it/docs/guides/SETUP_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/guides/SETUP_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/guides/SETUP_GUIDE.md) · 🇰🇭 [km](../../../km/docs/guides/SETUP_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/guides/SETUP_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/guides/SETUP_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/guides/SETUP_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/guides/SETUP_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/guides/SETUP_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/guides/SETUP_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/guides/SETUP_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/guides/SETUP_GUIDE.md) · 🇲🇲 [my](../../../my/docs/guides/SETUP_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/guides/SETUP_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/guides/SETUP_GUIDE.md) · 🇳🇴 [no](../../../no/docs/guides/SETUP_GUIDE.md) · 🇮🇳 [or](../../../or/docs/guides/SETUP_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/guides/SETUP_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/guides/SETUP_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/guides/SETUP_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/guides/SETUP_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/SETUP_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/guides/SETUP_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/guides/SETUP_GUIDE.md) · 🇱🇰 [si](../../../si/docs/guides/SETUP_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/guides/SETUP_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/guides/SETUP_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/guides/SETUP_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/guides/SETUP_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/guides/SETUP_GUIDE.md) · 🇮🇳 [te](../../../te/docs/guides/SETUP_GUIDE.md) · 🇹🇭 [th](../../../th/docs/guides/SETUP_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/guides/SETUP_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/SETUP_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/guides/SETUP_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/guides/SETUP_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/guides/SETUP_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/guides/SETUP_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/SETUP_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/SETUP_GUIDE.md)

---

> Celoten priročnik za nastavitev OmniRoute. Za hitro različico si oglejte [Hitri začetek v README](../README.md#-quick-start).

## Kazalo vsebine

- [Načini namestitve](#install-methods)
- [Konfiguracija orodja CLI](#cli-tool-configuration)
- [Nastavitev protokolov (MCP + A2A)](#protocol-setup-mcp--a2a)
- [Konfiguracija časovnih omejitev](#timeout-configuration)
- [Način z ločenimi vrati](#split-port-mode)
- [Void Linux (xbps-src)](#void-linux-xbps-src-template)
- [Odstranitev](#uninstalling)

---

## Načini namestitve

### npm (priporočeno)

```bash
npm install -g omniroute
omniroute
```

Nadzorna plošča se odpre na naslovu `http://localhost:20128`, osnovni URL API-ja pa je `http://localhost:20128/v1`.

### pnpm

```bash
pnpm add -g omniroute@latest --allow-build=better-sqlite3 --allow-build=@swc/core
omniroute
```

> **Uporabniki pnpm:** zastavica `--allow-build` je potrebna za omogočanje izvornih graditvenih skriptov za `better-sqlite3` in `@swc/core`. Ukaz `pnpm approve-builds -g` ni podprt za globalne namestitve v pnpm v11.

### Arch Linux (AUR)

```bash
yay -S omniroute-bin
systemctl --user enable --now omniroute.service
```

[Paket AUR](https://aur.archlinux.org/packages/omniroute-bin) namesti OmniRoute in zagotovi uporabniško storitev systemd.

### Iz izvorne kode

```bash
npm install
PORT=20128 DASHBOARD_PORT=20129 NEXT_PUBLIC_BASE_URL=http://localhost:20129 npm run dev
```

> **Opomba za Windows:** OmniRoute privzeto uporablja `%APPDATA%\omniroute`, kadar starejši imenik `%USERPROFILE%\.omniroute` ni prisoten. Nastavite `DATA_DIR`, če želite izbrati drugo lokacijo podatkovnega imenika.

> **Opomba:** `npm install` ob prvem zagonu samodejno ustvari `.env` iz `.env.example`. Pri naslednjih namestitvah obstoječa datoteka `.env` ne bo prepisana, zato se prilagoditve ohranijo. Če jo želite znova ustvariti iz predloge, pred ponovnim zagonom izbrišite `.env`.

### Docker

Za celotno nastavitev okolja Docker, vključno s profili Compose in HTTPS prek Caddyja, si oglejte [Vodnik za Docker](./DOCKER_GUIDE.md).

### Namizna aplikacija (Electron)

OmniRoute vključuje namizni ovoj, izdelan z Electron 41 in electron-builder 26.10. Razpoložljivi skripti (korenski imenik delovnega prostora):

```bash
npm run electron:dev          # Zaženi namizno aplikacijo s sprotnim ponovnim nalaganjem
npm run electron:build        # Izdelaj za trenutni operacijski sistem (samodejno zaznan)
npm run electron:build:win    # Namestitveni program za Windows (NSIS + prenosna različica)
npm run electron:build:mac    # macOS (dmg + zip, arm64+x64)
npm run electron:build:linux  # Linux (AppImage + deb + rpm)
npm run electron:smoke:packaged  # Izvedi osnovni preizkus zapakirane gradnje
```

Izdaje namiznih namestitvenih programov so priložene izdajam na GitHubu. Za podroben pregled Electron (podpisovanje, most IPC, distribucije) si oglejte [`ELECTRON_GUIDE.md`](./ELECTRON_GUIDE.md) _(ustvarjeno v poznejši fazi)_.

### Brezglavi strežnik (CI/avtomatizacija)

Za nenadzorovane nastavitve (Docker, Kubernetes, CI) uporabite:

```bash
omniroute setup --non-interactive
omniroute providers test-batch
```

V kombinaciji s spremenljivkami okolja (`INITIAL_PASSWORD`, `OMNIROUTE_WS_BRIDGE_SECRET` itd.) lahko tako zaženete primerek OmniRoute, ki ga je mogoče v celoti upravljati s skripti.

### Možnosti CLI

| Ukaz                    | Opis                                                                        |
| ----------------------- | --------------------------------------------------------------------------- |
| `omniroute`             | Zažene strežnik (`PORT=20128`, API in nadzorna plošča na istih vratih)      |
| `omniroute setup`       | Vodena začetna nastavitev CLI za geslo in prvega ponudnika                  |
| `omniroute doctor`      | Izvede lokalna preverjanja zdravja brez zagona strežnika                    |
| `omniroute providers`   | Odkrije, izpiše, preveri in preizkusi ponudnike prek CLI-ja                 |
| `omniroute config`      | Konfiguracija orodja CLI — izpis, pridobivanje, nastavljanje in preverjanje |
| `omniroute status`      | Nadzorna plošča stanja brez povezave — različica, DB, orodja, konfiguracija |
| `omniroute logs`        | Pretaka dnevnike uporabe iz API-ja (podpira `--follow`)                     |
| `omniroute update`      | Preveri ali uporabi posodobitve OmniRoute                                   |
| `omniroute provider`    | Upravlja povezave ponudnikov — dodajanje, izpis, odstranitev, preizkus      |
| `omniroute --port 3000` | Nastavi kanonična vrata/vrata API-ja na 3000                                |
| `omniroute --mcp`       | Zažene strežnik MCP (prenos stdio)                                          |
| `omniroute --no-open`   | Ne odpre brskalnika samodejno                                               |
| `omniroute --help`      | Prikaže pomoč                                                               |

Brezglavo nastavitev je mogoče skriptirati z zastavicami ali spremenljivkami okolja:

```bash
omniroute setup --non-interactive --password "$OMNIROUTE_PASSWORD"
omniroute setup --non-interactive --add-provider --provider openai --api-key "$OPENAI_API_KEY"
omniroute setup --non-interactive --add-provider --provider openai --api-key "$OPENAI_API_KEY" --test-provider
```

Zaženite lokalno diagnostiko brez odpiranja nadzorne plošče:

```bash
omniroute doctor
omniroute doctor --json
omniroute doctor --no-liveness
```

Upravljajte ponudnike prek SSH-ja ali skriptov, ne da bi odprli nadzorno ploščo:

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

## Konfiguracija orodja CLI

### 1) Povežite ponudnike in ustvarite ključ API

1. Odprite nadzorno ploščo → `Providers` in povežite vsaj enega ponudnika (OAuth ali ključ API).
2. Odprite nadzorno ploščo → `Endpoints` in ustvarite ključ API.
3. (Izbirno) Odprite nadzorno ploščo → `Combos` in nastavite svojo nadomestno verigo.

### 2) Usmerite svoje programersko orodje

```txt
Osnovni URL: http://localhost:20128/v1
Ključ API:   [kopirajte s strani Endpoint]
Model:       if/qwen3.8-max-preview (ali katera koli predpona ponudnika/modela)
```

Če vaš urejevalnik ne more poslati `Authorization: Bearer ...`, namesto tega uporabite tokeniziran združljiv osnovni URL:

```txt
Osnovni URL:     http://localhost:20128/api/v1/vscode/YOUR_KEY/
URL modelov:     http://localhost:20128/api/v1/vscode/YOUR_KEY/models
URL klepeta:     http://localhost:20128/api/v1/vscode/YOUR_KEY/chat/completions
URL oznak Ollama: http://localhost:20128/api/v1/vscode/YOUR_KEY/api/tags
```

Deluje z orodji Claude Code, Codex CLI, Cursor, Cline, OpenClaw, OpenCode in SDK-ji, združljivimi z OpenAI.

#### Samodejna konfiguracija z `setup-*`

Namesto ročnega lepljenja osnovnega URL-ja in ključa naj OmniRoute zapiše lastno konfiguracijo vsakega orodja iz aktualnega kataloga modelov. En ukaz na orodje:

```bash
omniroute setup-codex        # profili ~/.codex/<name>.config.toml
omniroute setup-claude       # ~/.claude/profiles/<name>/settings.json
omniroute setup-opencode     # ~/.config/opencode/opencode.json (združljivo z OpenAI)
omniroute setup-cline        # nastavitve Cline CLI in razširitve VS Code
omniroute setup-kilo         # Kilo Code
omniroute setup-continue     # ~/.continue/config.yaml (Continue / cn)
omniroute setup-cursor       # izpiše korake znotraj aplikacije Cursor
omniroute setup-roo          # uvoz Roo Code in kazalec autoImport
omniroute setup-crush        # ~/.config/crush/crush.json
omniroute setup-goose        # ~/.config/goose/config.yaml
omniroute setup-aider        # ~/.aider.conf.yml
omniroute setup-qwen         # ~/.qwen/settings.json + ~/.qwen/.env
```

Vsak sprejema `--remote <url> --api-key <key>` za konfiguracijo lokalnega orodja za uporabo **oddaljenega** OmniRoute in `--dry-run` za predogled. Če želite zagnati CLI z vstavljenimi ustreznimi spremenljivkami okolja, ne da bi se zapisala kakršna koli konfiguracija, uporabite splošni zaganjalnik `omniroute run <target>` (claude, codex, aider, goose, opencode, qwen, gemini); starejša zaganjalnika za posamezni orodji `omniroute launch` (Claude Code) in `omniroute launch-codex` (Codex) ostajata na voljo.

Za celotno tabelo (kaj zapiše vsak ukaz, vse zastavice, lokalno v primerjavi z oddaljenim načinom in pravila za `/v1` v osnovnem URL-ju) glejte **[Integracije CLI](./CLI-INTEGRATIONS.md)**.

Za podrobno konfiguracijo posameznih orodij (Claude Code, Codex CLI, Cursor, Cline, OpenClaw, Kilo Code, Copilot in druga) glejte namenski **[Vodnik po orodjih CLI](../reference/CLI-TOOLS.md)**.

---

## Nastavitev protokolov (MCP + A2A)

### Nastavitev MCP (Model Context Protocol)

Zaženite prenos MCP v načinu stdio:

```bash
omniroute --mcp
```

Priporočen postopek preverjanja:

```bash
# 1. Zaženite strežnik MCP
omniroute --mcp

# 2. Iz svojega odjemalca MCP pokličite:
omniroute_get_health        # Vrne naj stanje sistema
omniroute_list_combos       # Vrne naj aktivne kombinacije

# 3. Ali zaženite celoten paket E2E:
npm run test:protocols:e2e
```

#### Konfiguracija odjemalca MCP

**Claude Code:**

```bash
claude mcp add-server omniroute --type http --url http://localhost:20128/api/mcp/stream
```

**Cursor / Cline:**

Dodajte v svoje nastavitve MCP:

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

**Celotna dokumentacija MCP:** [README strežnika MCP](../../open-sse/mcp-server/README.md) — 110 orodij, konfiguracije IDE ter odjemalci Python/TS/Go.

### Nastavitev A2A (protokol med agenti)

Preverite kartico agenta:

```bash
curl http://localhost:20128/.well-known/agent.json
```

Pošljite opravilo:

```bash
curl -X POST http://localhost:20128/a2a \
  -H 'content-type: application/json' \
  -d '{"jsonrpc":"2.0","id":"quickstart","method":"message/send","params":{"skill":"quota-management","messages":[{"role":"user","content":"Podaj mi kratek povzetek kvote."}]}}'
```

**Celotna dokumentacija A2A:** [README strežnika A2A](../../src/lib/a2a/README.md) — JSON-RPC 2.0, veščine, pretočno pošiljanje in življenjski cikel opravil.

---

## Konfiguracija časovnih omejitev

### Osnovne časovne omejitve

Za večino uvedb potrebujete le ti dve spremenljivki:

| Spremenljivka            | Privzeta vrednost             | Namen                                                                                                                                                                                              |
| ------------------------ | ----------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `REQUEST_TIMEOUT_MS`     | `600000`                      | Skupna izhodiščna vrednost za časovno omejitev začetka odziva nadrejenega strežnika, skrite časovne omejitve Undici, zahteve za prstni odtis TLS in časovne omejitve zahtev/posredovanja mostu API |
| `STREAM_IDLE_TIMEOUT_MS` | podeduje `REQUEST_TIMEOUT_MS` | Največji razmik med pretočnimi deli, preden OmniRoute prekine tok SSE                                                                                                                              |

Združljivost za nazaj je ohranjena: obstoječe spremenljivke `FETCH_TIMEOUT_MS`, `API_BRIDGE_PROXY_TIMEOUT_MS` in druge spremenljivke časovnih omejitev za posamezne plasti še vedno delujejo ter preglasijo skupno izhodiščno vrednost.

### Opombe za posamezne ponudnike

Za nadrejene strežnike, združljive s Claude Code (`anthropic-compatible-cc-*`), OmniRoute iz razrešene časovne omejitve pridobivanja izpelje izhodno glavo `X-Stainless-Timeout`, tako da časovne omejitve branja na strani ponudnika ostanejo usklajene z vašo konfiguracijo okolja.

Za povratne posredniške strežnike drugih ponudnikov, združljive s Claude Code, OmniRoute ohranja privzeti nabor `anthropic-beta` konservativen in, kadar je nastavitev `Client Cache Control` nastavljena na `Auto`, posreduje samo označevalnike `cache_control`, ki jih zagotovi odjemalec. Preklopnik »Enable redact-thinking beta« za posamezno povezavo omogočite le, če nadrejeni strežnik izrecno zahteva tokove razmišljanja Claude z zakritimi podatki.

### Napredne preglasitve časovnih omejitev

| Spremenljivka                            | Privzeta vrednost                          | Namen                                                                                  |
| ---------------------------------------- | ------------------------------------------ | -------------------------------------------------------------------------------------- |
| `FETCH_TIMEOUT_MS`                       | podeduje `REQUEST_TIMEOUT_MS`              | Časovna omejitev začetka odziva nadrejenega strežnika, ki se uporablja do prejema glav |
| `FETCH_HEADERS_TIMEOUT_MS`               | podeduje `FETCH_TIMEOUT_MS`                | Časovna omejitev Undici za prejem glav odziva nadrejenega strežnika                    |
| `FETCH_BODY_TIMEOUT_MS`                  | podeduje `FETCH_TIMEOUT_MS`                | Časovna omejitev Undici med deli telesa nadrejenega odziva (`0` jo onemogoči)          |
| `FETCH_CONNECT_TIMEOUT_MS`               | `30000`                                    | Časovna omejitev Undici za vzpostavitev povezave TCP                                   |
| `FETCH_KEEPALIVE_TIMEOUT_MS`             | `4000`                                     | Časovna omejitev Undici za nedejavno trajno povezavo                                   |
| `TLS_CLIENT_TIMEOUT_MS`                  | podeduje `FETCH_TIMEOUT_MS`                | Časovna omejitev za zahteve za prstni odtis TLS, izvedene prek `wreq-js`               |
| `API_BRIDGE_PROXY_TIMEOUT_MS`            | podeduje `REQUEST_TIMEOUT_MS` ali `600000` | Časovna omejitev za posredovanje `/v1` z vrat API na vrata nadzorne plošče             |
| `API_BRIDGE_SERVER_REQUEST_TIMEOUT_MS`   | `max(API_BRIDGE_PROXY_TIMEOUT_MS, 300000)` | Časovna omejitev dohodne zahteve na strežniku mostu API                                |
| `API_BRIDGE_SERVER_HEADERS_TIMEOUT_MS`   | `60000`                                    | Časovna omejitev dohodnih glav na strežniku mostu API                                  |
| `API_BRIDGE_SERVER_KEEPALIVE_TIMEOUT_MS` | `5000`                                     | Časovna omejitev trajne povezave na strežniku mostu API                                |
| `API_BRIDGE_SERVER_SOCKET_TIMEOUT_MS`    | `0`                                        | Časovna omejitev nedejavnosti vtičnice na strežniku mostu API (`0` jo onemogoči)       |

> **Opomba:** Pri pretočnih zahtevah `FETCH_TIMEOUT_MS` zajema samo vzpostavljanje povezave oziroma čakanje na prvi odziv nadrejenega strežnika. Ko je tok aktiven, ga OmniRoute prekine samo ob dejanskem zastoju (`STREAM_IDLE_TIMEOUT_MS`) ali nedejavnosti telesa Undici (`FETCH_BODY_TIMEOUT_MS`).

### Združljivost s povratnimi posredniškimi strežniki

Če OmniRoute izvajate za Nginx, Caddy, Cloudflare ali drugim povratnim posredniškim strežnikom, poskrbite, da bodo tudi časovne omejitve posredniškega strežnika daljše od časovnih omejitev pretakanja/pridobivanja v OmniRoute.

---

## Način z ločenimi vrati

Za napredne scenarije (povratni posredniški strežnik, omrežje vsebnikov) zaženite API in nadzorno ploščo na ločenih vratih:

```bash
PORT=20128 DASHBOARD_PORT=20129 omniroute
# API:             http://localhost:20128/v1
# Nadzorna plošča: http://localhost:20129
```

---

## Predloga za Void Linux (xbps-src)

Uporabniki sistema Void Linux lahko ustvarijo izvorni paket z orodjem `xbps-src`. Ta blok shranite kot `srcpkgs/omniroute/template`:

```bash
# Datoteka predloge za 'omniroute'
pkgname=omniroute
version=3.8.0
revision=1
hostmakedepends="nodejs python3 make"
depends="openssl"
short_desc="Univerzalni prehod za umetno inteligenco s pametnim usmerjanjem za več ponudnikov LLM"
maintainer="zenobit <zenobit@disroot.org>"
license="MIT"
homepage="https://github.com/diegosouzapw/OmniRoute"
distfiles="https://github.com/diegosouzapw/OmniRoute/archive/refs/tags/v${version}.tar.gz"
# Za vsako izdajo znova ustvarite kontrolno vsoto z:
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

## Odstranitev

| Ukaz                     | Dejanje                                                                                               |
| ------------------------ | ----------------------------------------------------------------------------------------------------- |
| `npm run uninstall`      | Odstrani sistemsko aplikacijo, vendar **ohrani vašo zbirko podatkov in nastavitve** v `~/.omniroute`. |
| `npm run uninstall:full` | Odstrani aplikacijo IN trajno **izbriše vse nastavitve, ključe in zbirke podatkov**.                  |

> Za podrobna navodila za odstranitev pri vseh načinih namestitve glejte [UNINSTALL.md](./UNINSTALL.md).
