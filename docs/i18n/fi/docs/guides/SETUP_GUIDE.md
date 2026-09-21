# 📖 Setup Guide — OmniRoute (Suomi)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/SETUP_GUIDE.md) · 🇪🇹 [am](../../../am/docs/guides/SETUP_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/guides/SETUP_GUIDE.md) · 🇦🇿 [az](../../../az/docs/guides/SETUP_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/guides/SETUP_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/guides/SETUP_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/guides/SETUP_GUIDE.md) · 🇩🇰 [da](../../../da/docs/guides/SETUP_GUIDE.md) · 🇩🇪 [de](../../../de/docs/guides/SETUP_GUIDE.md) · 🇬🇷 [el](../../../el/docs/guides/SETUP_GUIDE.md) · 🇪🇸 [es](../../../es/docs/guides/SETUP_GUIDE.md) · 🇪🇪 [et](../../../et/docs/guides/SETUP_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/guides/SETUP_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/guides/SETUP_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/guides/SETUP_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/guides/SETUP_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/guides/SETUP_GUIDE.md) · 🇮🇱 [he](../../../he/docs/guides/SETUP_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/guides/SETUP_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/guides/SETUP_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/guides/SETUP_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/guides/SETUP_GUIDE.md) · 🇮🇩 [id](../../../id/docs/guides/SETUP_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/guides/SETUP_GUIDE.md) · 🇮🇹 [it](../../../it/docs/guides/SETUP_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/guides/SETUP_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/guides/SETUP_GUIDE.md) · 🇰🇭 [km](../../../km/docs/guides/SETUP_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/guides/SETUP_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/guides/SETUP_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/guides/SETUP_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/guides/SETUP_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/guides/SETUP_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/guides/SETUP_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/guides/SETUP_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/guides/SETUP_GUIDE.md) · 🇲🇲 [my](../../../my/docs/guides/SETUP_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/guides/SETUP_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/guides/SETUP_GUIDE.md) · 🇳🇴 [no](../../../no/docs/guides/SETUP_GUIDE.md) · 🇮🇳 [or](../../../or/docs/guides/SETUP_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/guides/SETUP_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/guides/SETUP_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/guides/SETUP_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/guides/SETUP_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/SETUP_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/guides/SETUP_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/guides/SETUP_GUIDE.md) · 🇱🇰 [si](../../../si/docs/guides/SETUP_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/guides/SETUP_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/guides/SETUP_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/guides/SETUP_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/guides/SETUP_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/guides/SETUP_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/guides/SETUP_GUIDE.md) · 🇮🇳 [te](../../../te/docs/guides/SETUP_GUIDE.md) · 🇹🇭 [th](../../../th/docs/guides/SETUP_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/guides/SETUP_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/SETUP_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/guides/SETUP_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/guides/SETUP_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/guides/SETUP_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/guides/SETUP_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/SETUP_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/SETUP_GUIDE.md)

---

> Täydellinen OmniRouten asennusopas. Lyhyt versio löytyy [README-tiedoston pikaoppaasta](../README.md#-quick-start).

## Sisällysluettelo

- [Asennustavat](#install-methods)
- [CLI-työkalun määritys](#cli-tool-configuration)
- [Protokollien määritys (MCP + A2A)](#protocol-setup-mcp--a2a)
- [Aikakatkaisujen määritys](#timeout-configuration)
- [Jaetun portin tila](#split-port-mode)
- [Void Linux (xbps-src)](#void-linux-xbps-src-template)
- [Asennuksen poistaminen](#uninstalling)

---

## Asennustavat

### npm (suositeltu)

```bash
npm install -g omniroute
omniroute
```

Hallintapaneeli avautuu osoitteessa `http://localhost:20128`, ja API:n perus-URL on `http://localhost:20128/v1`.

### pnpm

```bash
pnpm add -g omniroute@latest --allow-build=better-sqlite3 --allow-build=@swc/core
omniroute
```

> **pnpm-käyttäjät:** `--allow-build`-lippu vaaditaan `better-sqlite3`- ja `@swc/core`-pakettien natiivien koontikomentosarjojen käyttöön. `pnpm approve-builds -g` -komentoa ei tueta globaaleissa asennuksissa pnpm v11:ssä.

### Arch Linux (AUR)

```bash
yay -S omniroute-bin
systemctl --user enable --now omniroute.service
```

[AUR-paketti](https://aur.archlinux.org/packages/omniroute-bin) asentaa OmniRouten ja tarjoaa systemd-käyttäjäpalvelun.

### Lähdekoodista

```bash
npm install
PORT=20128 DASHBOARD_PORT=20129 NEXT_PUBLIC_BASE_URL=http://localhost:20129 npm run dev
```

> **Windows-huomautus:** OmniRoute käyttää oletusarvoisesti `%APPDATA%\omniroute`-hakemistoa, jos vanhaa `%USERPROFILE%\.omniroute`-hakemistoa ei ole olemassa. Valitse toinen datahakemiston sijainti asettamalla `DATA_DIR`.

> **Huomautus:** `npm install` luo `.env`-tiedoston automaattisesti `.env.example`-tiedostosta ensimmäisellä suorituskerralla. Myöhemmät asennukset eivät korvaa olemassa olevaa `.env`-tiedostoa, joten mukautukset säilyvät. Luo tiedosto uudelleen poistamalla `.env` ennen komennon suorittamista uudelleen.

### Docker

Katso täydelliset Docker-asennusohjeet, mukaan lukien Compose-profiilit ja Caddy HTTPS, [Docker-oppaasta](./DOCKER_GUIDE.md).

### Työpöytäsovellus (Electron)

OmniRoute sisältää Electron 41:n ja electron-builder 26.10:n avulla rakennetun työpöytäkääreen. Käytettävissä olevat komentosarjat (työtilan juuressa):

```bash
npm run electron:dev          # Suorita työpöytäsovellus automaattisella uudelleenlatauksella
npm run electron:build        # Koosta nykyiselle käyttöjärjestelmälle (tunnistetaan automaattisesti)
npm run electron:build:win    # Windows-asennusohjelma (NSIS + siirrettävä versio)
npm run electron:build:mac    # macOS (dmg + zip, arm64+x64)
npm run electron:build:linux  # Linux (AppImage + deb + rpm)
npm run electron:smoke:packaged  # Savutestaa pakattu koontiversio
```

Työpöytäsovelluksen asennusohjelmien julkaisut liitetään GitHub Releases -julkaisuihin. Kattava Electron-opas (allekirjoitus, IPC-silta, jakelut) löytyy tiedostosta [`ELECTRON_GUIDE.md`](./ELECTRON_GUIDE.md) _(luotu myöhemmässä vaiheessa)_.

### Käyttöliittymätön palvelin (CI/automaatio)

Käytä valvomattomissa asennuksissa (Docker, Kubernetes, CI):

```bash
omniroute setup --non-interactive
omniroute providers test-batch
```

Yhdessä ympäristömuuttujien (`INITIAL_PASSWORD`, `OMNIROUTE_WS_BRIDGE_SECRET` jne.) kanssa tämä mahdollistaa täysin komentosarjoilla hallittavan OmniRoute-instanssin käynnistämisen.

### CLI-valinnat

| Komento                 | Kuvaus                                                                               |
| ----------------------- | ------------------------------------------------------------------------------------ |
| `omniroute`             | Käynnistä palvelin (`PORT=20128`, API ja hallintapaneeli samassa portissa)           |
| `omniroute setup`       | Ohjattu CLI-käyttöönotto salasanalle ja ensimmäiselle palveluntarjoajalle            |
| `omniroute doctor`      | Suorita paikalliset kuntotarkistukset käynnistämättä palvelinta                      |
| `omniroute providers`   | Etsi, luettele, validoi ja testaa palveluntarjoajia CLI:stä                          |
| `omniroute config`      | CLI-työkalun määritys — luettele, nouda, aseta ja validoi määrityksiä                |
| `omniroute status`      | Offline-tilapaneeli — versio, tietokanta, työkalut ja määritykset                    |
| `omniroute logs`        | Suoratoista käyttölokeja API:sta (tukee `--follow`-lippua)                           |
| `omniroute update`      | Tarkista tai asenna OmniRoute-päivityksiä                                            |
| `omniroute provider`    | Hallitse palveluntarjoajayhteyksiä — lisää, luettele, poista, testaa ja aseta oletus |
| `omniroute --port 3000` | Aseta ensisijaiseksi/API-portiksi 3000                                               |
| `omniroute --mcp`       | Käynnistä MCP-palvelin (stdio-siirtotapa)                                            |
| `omniroute --no-open`   | Älä avaa selainta automaattisesti                                                    |
| `omniroute --help`      | Näytä ohje                                                                           |

Käyttöliittymätön asennus voidaan automatisoida lipuilla tai ympäristömuuttujilla:

```bash
omniroute setup --non-interactive --password "$OMNIROUTE_PASSWORD"
omniroute setup --non-interactive --add-provider --provider openai --api-key "$OPENAI_API_KEY"
omniroute setup --non-interactive --add-provider --provider openai --api-key "$OPENAI_API_KEY" --test-provider
```

Suorita paikallinen diagnostiikka avaamatta hallintapaneelia:

```bash
omniroute doctor
omniroute doctor --json
omniroute doctor --no-liveness
```

Hallitse palveluntarjoajia SSH:n tai komentosarjojen kautta avaamatta hallintapaneelia:

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

## CLI-työkalun määritys

### 1) Yhdistä palveluntarjoajat ja luo API-avain

1. Avaa Dashboard → `Providers` ja yhdistä vähintään yksi palveluntarjoaja (OAuth tai API-avain).
2. Avaa Dashboard → `Endpoints` ja luo API-avain.
3. (Valinnainen) Avaa Dashboard → `Combos` ja määritä varaketjusi.

### 2) Määritä ohjelmointityökalusi

```txt
Perus-URL: http://localhost:20128/v1
API-avain: [kopioi Endpoint-sivulta]
Malli:     if/qwen3.8-max-preview (tai mikä tahansa palveluntarjoaja/malli-etuliite)
```

Jos editorisi ei voi lähettää `Authorization: Bearer ...` -otsaketta, käytä sen sijaan tokenin sisältävää yhteensopivuuden perusosoitetta:

```txt
Perus-URL: http://localhost:20128/api/v1/vscode/YOUR_KEY/
Mallien URL: http://localhost:20128/api/v1/vscode/YOUR_KEY/models
Keskustelun URL: http://localhost:20128/api/v1/vscode/YOUR_KEY/chat/completions
Ollama-tunnisteiden URL: http://localhost:20128/api/v1/vscode/YOUR_KEY/api/tags
```

Toimii Claude Coden, Codex CLI:n, Cursorin, Clinen, OpenClawin, OpenCoden ja OpenAI-yhteensopivien SDK:iden kanssa.

#### Automaattinen määritys `setup-*`-komennoilla

Sen sijaan, että liittäisit perus-URL-osoitteen ja avaimen käsin, anna OmniRouten kirjoittaa kunkin työkalun
omat määritykset reaaliaikaisesta malliluettelosta. Yksi komento työkalua kohden:

```bash
omniroute setup-codex        # ~/.codex/<name>.config.toml-profiilit
omniroute setup-claude       # ~/.claude/profiles/<name>/settings.json
omniroute setup-opencode     # ~/.config/opencode/opencode.json (OpenAI-yhteensopiva)
omniroute setup-cline        # Cline CLI:n ja VS Code -laajennuksen asetukset
omniroute setup-kilo         # Kilo Code
omniroute setup-continue     # ~/.continue/config.yaml (Continue / cn)
omniroute setup-cursor       # tulostaa Cursorin sovelluksen sisäiset vaiheet
omniroute setup-roo          # Roo Code -tuonti ja autoImport-osoitin
omniroute setup-crush        # ~/.config/crush/crush.json
omniroute setup-goose        # ~/.config/goose/config.yaml
omniroute setup-aider        # ~/.aider.conf.yml
omniroute setup-qwen         # ~/.qwen/settings.json + ~/.qwen/.env
```

Jokainen hyväksyy valinnat `--remote <url> --api-key <key>`, joilla paikallinen työkalu määritetään käyttämään
**etäpalvelimella** toimivaa OmniRoutea, sekä valinnan `--dry-run` esikatselua varten. Jos haluat käynnistää CLI:n oikeat
ympäristömuuttujat asetettuina kirjoittamatta lainkaan määrityksiä, käytä yleistä käynnistintä
`omniroute run <target>` (claude, codex, aider, goose, opencode, qwen, gemini);
vanhat työkalukohtaiset käynnistimet `omniroute launch` (Claude Code) ja
`omniroute launch-codex` (Codex) ovat edelleen käytettävissä.

Täydellinen taulukko (mitä kukin komento kirjoittaa, kaikki valinnat, paikallinen ja etäkäyttö sekä perus-URL-osoitteen
`/v1`-käytännöt) on kohdassa **[CLI-integraatiot](./CLI-INTEGRATIONS.md)**.

Yksityiskohtaiset työkalukohtaiset määritykset (Claude Code, Codex CLI, Cursor, Cline, OpenClaw, Kilo Code, Copilot ja muut) ovat erillisessä **[CLI-työkalujen oppaassa](../reference/CLI-TOOLS.md)**.

---

## Protokollien määritys (MCP + A2A)

### MCP:n määritys (Model Context Protocol)

Käynnistä MCP-siirto stdio-tilassa:

```bash
omniroute --mcp
```

Suositeltu validointiprosessi:

```bash
# 1. Käynnistä MCP-palvelin
omniroute --mcp

# 2. Kutsu MCP-asiakkaastasi:
omniroute_get_health        # Pitäisi palauttaa järjestelmän tila
omniroute_list_combos       # Pitäisi palauttaa aktiiviset yhdistelmät

# 3. Tai suorita koko päästä päähän -testisarja:
npm run test:protocols:e2e
```

#### MCP-asiakkaan määritys

**Claude Code:**

```bash
claude mcp add-server omniroute --type http --url http://localhost:20128/api/mcp/stream
```

**Cursor / Cline:**

Lisää MCP-asetuksiisi:

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

**Täydellinen MCP-dokumentaatio:** [MCP-palvelimen README](../../open-sse/mcp-server/README.md) — 110 työkalua, IDE-määritykset sekä Python/TS/Go-asiakkaat.

### A2A:n määritys (Agent-to-Agent Protocol)

Tarkista Agent Card:

```bash
curl http://localhost:20128/.well-known/agent.json
```

Lähetä tehtävä:

```bash
curl -X POST http://localhost:20128/a2a \
  -H 'content-type: application/json' \
  -d '{"jsonrpc":"2.0","id":"quickstart","method":"message/send","params":{"skill":"quota-management","messages":[{"role":"user","content":"Anna minulle lyhyt yhteenveto kiintiöstä."}]}}'
```

**Täydellinen A2A-dokumentaatio:** [A2A-palvelimen README](../../src/lib/a2a/README.md) — JSON-RPC 2.0, taidot, suoratoisto ja tehtävän elinkaari.

---

## Aikakatkaisujen määritys

### Perusaikakatkaisut

Useimmissa käyttöönotoissa tarvitset vain nämä kaksi muuttujaa:

| Muuttuja                 | Oletusarvo                                   | Tarkoitus                                                                                                                                                                           |
| ------------------------ | -------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `REQUEST_TIMEOUT_MS`     | `600000`                                     | Jaettu perustaso ylätason vastauksen alkamisen aikakatkaisulle, piilotetuille Undici-aikakatkaisuille, TLS-sormenjälkipyynnöille sekä API-sillan pyyntö- ja välitysaikakatkaisuille |
| `STREAM_IDLE_TIMEOUT_MS` | perii arvon muuttujalta `REQUEST_TIMEOUT_MS` | Suurin sallittu väli suoratoistettavien osien välillä, ennen kuin OmniRoute keskeyttää SSE-virran                                                                                   |

Taaksepäin yhteensopivuus säilyy: nykyiset `FETCH_TIMEOUT_MS`-, `API_BRIDGE_PROXY_TIMEOUT_MS`- ja muut kerroskohtaiset aikakatkaisumuuttujat toimivat edelleen ja ohittavat jaetun perustason.

### Palveluntarjoajakohtaiset huomautukset

Claude Code -yhteensopiville ylätason palveluille (`anthropic-compatible-cc-*`) OmniRoute johtaa lähtevän `X-Stainless-Timeout`-otsakkeen ratkaistusta hakuaikakatkaisusta, jotta palveluntarjoajan lukuaikakatkaisut pysyvät ympäristömääritystesi mukaisina.

Kolmannen osapuolen Claude Code -yhteensopivien käänteisten välityspalvelinten tapauksessa OmniRoute pitää oletusarvoisen `anthropic-beta`-joukon maltillisena ja välittää vain asiakkaan antamat `cache_control`-merkinnät, kun `Client Cache Control` -asetuksena on `Auto`. Ota yhteyskohtainen "Ota redact-thinking-beta käyttöön" -valitsin käyttöön vain, kun ylätason palvelu nimenomaisesti edellyttää sensuroituja Claude-ajatteluvirtoja.

### Aikakatkaisujen lisäohitukset

| Muuttuja                                 | Oletusarvo                                                | Tarkoitus                                                                                      |
| ---------------------------------------- | --------------------------------------------------------- | ---------------------------------------------------------------------------------------------- |
| `FETCH_TIMEOUT_MS`                       | perii arvon muuttujalta `REQUEST_TIMEOUT_MS`              | Ylätason vastauksen alkamisen aikakatkaisu, jota käytetään vastausotsakkeiden saapumiseen asti |
| `FETCH_HEADERS_TIMEOUT_MS`               | perii arvon muuttujalta `FETCH_TIMEOUT_MS`                | Undicin aikaraja ylätason vastausotsakkeiden vastaanottamiselle                                |
| `FETCH_BODY_TIMEOUT_MS`                  | perii arvon muuttujalta `FETCH_TIMEOUT_MS`                | Undicin aikaraja ylätason vastausrungon osien välillä (`0` poistaa sen käytöstä)               |
| `FETCH_CONNECT_TIMEOUT_MS`               | `30000`                                                   | Undicin TCP-yhteyden aikakatkaisu                                                              |
| `FETCH_KEEPALIVE_TIMEOUT_MS`             | `4000`                                                    | Undicin käyttämättömän keep-alive-yhteyden aikakatkaisu                                        |
| `TLS_CLIENT_TIMEOUT_MS`                  | perii arvon muuttujalta `FETCH_TIMEOUT_MS`                | `wreq-js`:n kautta tehtävien TLS-sormenjälkipyyntöjen aikakatkaisu                             |
| `API_BRIDGE_PROXY_TIMEOUT_MS`            | perii arvon muuttujalta `REQUEST_TIMEOUT_MS` tai `600000` | `/v1`-välityksen aikakatkaisu API-portista hallintapaneelin porttiin                           |
| `API_BRIDGE_SERVER_REQUEST_TIMEOUT_MS`   | `max(API_BRIDGE_PROXY_TIMEOUT_MS, 300000)`                | Saapuvan pyynnön aikakatkaisu API-siltapalvelimella                                            |
| `API_BRIDGE_SERVER_HEADERS_TIMEOUT_MS`   | `60000`                                                   | Saapuvien otsakkeiden aikakatkaisu API-siltapalvelimella                                       |
| `API_BRIDGE_SERVER_KEEPALIVE_TIMEOUT_MS` | `5000`                                                    | Keep-alive-aikakatkaisu API-siltapalvelimella                                                  |
| `API_BRIDGE_SERVER_SOCKET_TIMEOUT_MS`    | `0`                                                       | Vastakkeen toimettomuuden aikakatkaisu API-siltapalvelimella (`0` poistaa sen käytöstä)        |

> **Huomautus:** Suoratoistopyynnöissä `FETCH_TIMEOUT_MS` kattaa vain yhteyden muodostamisen ja ensimmäisen ylätason vastauksen odottamisen. Kun virta on aktiivinen, OmniRoute keskeyttää sen vain todellisen pysähdyksen (`STREAM_IDLE_TIMEOUT_MS`) tai Undicin vastausrungon toimettomuuden (`FETCH_BODY_TIMEOUT_MS`) vuoksi.

### Yhteensopivuus käänteisten välityspalvelinten kanssa

Jos käytät OmniRoutea Nginxin, Caddyn, Cloudflaren tai muun käänteisen välityspalvelimen takana, varmista, että myös välityspalvelimen aikakatkaisut ovat OmniRouten suoratoisto- ja hakuaikakatkaisuja pidempiä.

---

## Jaettujen porttien tila

Suorita API ja hallintapaneeli eri porteissa edistyneitä käyttötapauksia varten (käänteinen välityspalvelin, konttiverkot):

```bash
PORT=20128 DASHBOARD_PORT=20129 omniroute
# API:            http://localhost:20128/v1
# Hallintapaneeli: http://localhost:20129
```

---

## Void Linuxin (xbps-src) mallipohja

Void Linuxin käyttäjät voivat kääntää natiivin paketin `xbps-src`-työkalulla. Tallenna tämä lohko tiedostoksi `srcpkgs/omniroute/template`:

```bash
# Mallipohjatiedosto paketille 'omniroute'
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
# Luo tarkistussumma uudelleen jokaiselle julkaisulle komennolla:
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

## Asennuksen poistaminen

| Komento                  | Toiminto                                                                                                     |
| ------------------------ | ------------------------------------------------------------------------------------------------------------ |
| `npm run uninstall`      | Poistaa järjestelmäsovelluksen mutta **säilyttää tietokantasi ja määrityksesi** hakemistossa `~/.omniroute`. |
| `npm run uninstall:full` | Poistaa sovelluksen JA **hävittää pysyvästi kaikki määritykset, avaimet ja tietokannat**.                    |

> Yksityiskohtaiset asennuksen poisto-ohjeet kaikille menetelmille ovat tiedostossa [UNINSTALL.md](./UNINSTALL.md).
