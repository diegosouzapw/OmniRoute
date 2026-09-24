# 📖 Setup Guide — OmniRoute (Hrvatski)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/SETUP_GUIDE.md) · 🇪🇹 [am](../../../am/docs/guides/SETUP_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/guides/SETUP_GUIDE.md) · 🇦🇿 [az](../../../az/docs/guides/SETUP_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/guides/SETUP_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/guides/SETUP_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/guides/SETUP_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/guides/SETUP_GUIDE.md) · 🇩🇰 [da](../../../da/docs/guides/SETUP_GUIDE.md) · 🇩🇪 [de](../../../de/docs/guides/SETUP_GUIDE.md) · 🇬🇷 [el](../../../el/docs/guides/SETUP_GUIDE.md) · 🇪🇸 [es](../../../es/docs/guides/SETUP_GUIDE.md) · 🇪🇪 [et](../../../et/docs/guides/SETUP_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/guides/SETUP_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/guides/SETUP_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/guides/SETUP_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/guides/SETUP_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/guides/SETUP_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/guides/SETUP_GUIDE.md) · 🇮🇱 [he](../../../he/docs/guides/SETUP_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/guides/SETUP_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/guides/SETUP_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/guides/SETUP_GUIDE.md) · 🇮🇩 [id](../../../id/docs/guides/SETUP_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/guides/SETUP_GUIDE.md) · 🇮🇹 [it](../../../it/docs/guides/SETUP_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/guides/SETUP_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/guides/SETUP_GUIDE.md) · 🇰🇭 [km](../../../km/docs/guides/SETUP_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/guides/SETUP_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/guides/SETUP_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/guides/SETUP_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/guides/SETUP_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/guides/SETUP_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/guides/SETUP_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/guides/SETUP_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/guides/SETUP_GUIDE.md) · 🇲🇲 [my](../../../my/docs/guides/SETUP_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/guides/SETUP_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/guides/SETUP_GUIDE.md) · 🇳🇴 [no](../../../no/docs/guides/SETUP_GUIDE.md) · 🇮🇳 [or](../../../or/docs/guides/SETUP_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/guides/SETUP_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/guides/SETUP_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/guides/SETUP_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/guides/SETUP_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/SETUP_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/guides/SETUP_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/guides/SETUP_GUIDE.md) · 🇱🇰 [si](../../../si/docs/guides/SETUP_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/guides/SETUP_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/guides/SETUP_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/guides/SETUP_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/guides/SETUP_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/guides/SETUP_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/guides/SETUP_GUIDE.md) · 🇮🇳 [te](../../../te/docs/guides/SETUP_GUIDE.md) · 🇹🇭 [th](../../../th/docs/guides/SETUP_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/guides/SETUP_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/SETUP_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/guides/SETUP_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/guides/SETUP_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/guides/SETUP_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/guides/SETUP_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/SETUP_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/SETUP_GUIDE.md)

---

> Potpuna referenca za postavljanje OmniRoutea. Za brzu verziju pogledajte [Brzi početak u README-u](../README.md#-quick-start).

## Sadržaj

- [Načini instalacije](#install-methods)
- [Konfiguracija CLI alata](#cli-tool-configuration)
- [Postavljanje protokola (MCP + A2A)](#protocol-setup-mcp--a2a)
- [Konfiguracija vremenskog ograničenja](#timeout-configuration)
- [Način rada s odvojenim priključcima](#split-port-mode)
- [Void Linux (xbps-src)](#void-linux-xbps-src-template)
- [Deinstalacija](#uninstalling)

---

## Načini instalacije

### npm (preporučeno)

```bash
npm install -g omniroute
omniroute
```

Nadzorna ploča otvara se na adresi `http://localhost:20128`, a osnovni URL API-ja je `http://localhost:20128/v1`.

### pnpm

```bash
pnpm add -g omniroute@latest --allow-build=better-sqlite3 --allow-build=@swc/core
omniroute
```

> **Korisnici pnpm-a:** zastavica `--allow-build` potrebna je za omogućavanje nativnih skripti za izgradnju za `better-sqlite3` i `@swc/core`. Naredba `pnpm approve-builds -g` nije podržana za globalne instalacije u pnpm-u v11.

### Arch Linux (AUR)

```bash
yay -S omniroute-bin
systemctl --user enable --now omniroute.service
```

[AUR paket](https://aur.archlinux.org/packages/omniroute-bin) instalira OmniRoute i pruža korisničku uslugu systemd.

### Iz izvornog koda

```bash
npm install
PORT=20128 DASHBOARD_PORT=20129 NEXT_PUBLIC_BASE_URL=http://localhost:20129 npm run dev
```

> **Napomena za Windows:** OmniRoute prema zadanim postavkama upotrebljava `%APPDATA%\omniroute` kada naslijeđeni direktorij `%USERPROFILE%\.omniroute` nije prisutan. Postavite `DATA_DIR` kako biste odabrali drugu lokaciju direktorija podataka.

> **Napomena:** `npm install` pri prvom pokretanju automatski generira `.env` iz `.env.example`. Naknadne instalacije neće prebrisati postojeću datoteku `.env`, pa će prilagodbe biti sačuvane. Za ponovno generiranje izbrišite `.env` prije ponovnog pokretanja.

### Docker

Potpune upute za postavljanje Dockera, uključujući Compose profile i Caddy HTTPS, potražite u [Vodiču za Docker](./DOCKER_GUIDE.md).

### Aplikacija za stolna računala (Electron)

OmniRoute dolazi s omotačem za stolna računala izrađenim pomoću Electron 41 + electron-builder 26.10. Dostupne skripte (korijen radnog prostora):

```bash
npm run electron:dev          # Pokreni aplikaciju za stolna računala s automatskim ponovnim učitavanjem
npm run electron:build        # Izgradi za trenutačni OS (automatski otkriven)
npm run electron:build:win    # Instalacijski program za Windows (NSIS + prijenosna verzija)
npm run electron:build:mac    # macOS (dmg + zip, arm64+x64)
npm run electron:build:linux  # Linux (AppImage + deb + rpm)
npm run electron:smoke:packaged  # Brzo testiraj zapakiranu verziju
```

Izdanja instalacijskih programa za stolna računala priložena su izdanjima na GitHubu. Za detaljan vodič o Electronu (potpisivanje, IPC most, distribucije) pogledajte [`ELECTRON_GUIDE.md`](./ELECTRON_GUIDE.md) _(izrađeno u kasnijoj fazi)_.

### Poslužitelj bez grafičkog sučelja (CI/automatizacija)

Za postavljanja bez nadzora (Docker, Kubernetes, CI) upotrijebite:

```bash
omniroute setup --non-interactive
omniroute providers test-batch
```

U kombinaciji s varijablama okruženja (`INITIAL_PASSWORD`, `OMNIROUTE_WS_BRIDGE_SECRET` itd.) to vam omogućuje pokretanje instance OmniRoutea koju je moguće u potpunosti skriptirati.

### Opcije CLI-ja

| Naredba                 | Opis                                                                              |
| ----------------------- | --------------------------------------------------------------------------------- |
| `omniroute`             | Pokreni poslužitelj (`PORT=20128`, API i nadzorna ploča na istom priključku)      |
| `omniroute setup`       | Vođeno početno postavljanje putem CLI-ja za lozinku i prvog pružatelja            |
| `omniroute doctor`      | Pokreni lokalne provjere ispravnosti bez pokretanja poslužitelja                  |
| `omniroute providers`   | Otkrij, prikaži, provjeri i testiraj pružatelje putem CLI-ja                      |
| `omniroute config`      | Konfiguracija CLI alata — prikaži, dohvati, postavi i provjeri konfiguracije      |
| `omniroute status`      | Izvanmrežna nadzorna ploča statusa — verzija, baza podataka, alati, konfiguracija |
| `omniroute logs`        | Prati zapisnike upotrebe iz API-ja (podržava `--follow`)                          |
| `omniroute update`      | Provjeri ili primijeni ažuriranja OmniRoutea                                      |
| `omniroute provider`    | Upravljaj vezama pružatelja — dodaj, prikaži, ukloni, testiraj, postavi zadano    |
| `omniroute --port 3000` | Postavi kanonski/API priključak na 3000                                           |
| `omniroute --mcp`       | Pokreni MCP poslužitelj (stdio prijenos)                                          |
| `omniroute --no-open`   | Nemoj automatski otvarati preglednik                                              |
| `omniroute --help`      | Prikaži pomoć                                                                     |

Postavljanje bez grafičkog sučelja može se skriptirati pomoću zastavica ili varijabli okruženja:

```bash
omniroute setup --non-interactive --password "$OMNIROUTE_PASSWORD"
omniroute setup --non-interactive --add-provider --provider openai --api-key "$OPENAI_API_KEY"
omniroute setup --non-interactive --add-provider --provider openai --api-key "$OPENAI_API_KEY" --test-provider
```

Pokrenite lokalnu dijagnostiku bez otvaranja nadzorne ploče:

```bash
omniroute doctor
omniroute doctor --json
omniroute doctor --no-liveness
```

Upravljajte pružateljima putem SSH-a ili skripti bez otvaranja nadzorne ploče:

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

## Konfiguracija CLI alata

### 1) Povežite pružatelje usluga i izradite API ključ

1. Otvorite nadzornu ploču → `Providers` i povežite barem jednog pružatelja usluga (OAuth ili API ključ).
2. Otvorite nadzornu ploču → `Endpoints` i izradite API ključ.
3. (Neobavezno) Otvorite nadzornu ploču → `Combos` i postavite svoj pričuvni lanac.

### 2) Usmjerite svoj alat za programiranje

```txt
Osnovni URL: http://localhost:20128/v1
API ključ:   [kopirajte sa stranice Endpoint]
Model:       if/qwen3.8-max-preview (ili bilo koji prefiks pružatelja usluga/modela)
```

Ako vaš uređivač ne može poslati `Authorization: Bearer ...`, umjesto toga upotrijebite tokeniziranu kompatibilnu osnovnu adresu:

```txt
Osnovni URL: http://localhost:20128/api/v1/vscode/YOUR_KEY/
URL modela: http://localhost:20128/api/v1/vscode/YOUR_KEY/models
URL razgovora: http://localhost:20128/api/v1/vscode/YOUR_KEY/chat/completions
URL Ollama oznaka: http://localhost:20128/api/v1/vscode/YOUR_KEY/api/tags
```

Radi s alatima Claude Code, Codex CLI, Cursor, Cline, OpenClaw, OpenCode i SDK-ovima kompatibilnima s OpenAI-jem.

#### Automatski konfigurirajte pomoću `setup-*`

Umjesto ručnog lijepljenja osnovnog URL-a i ključa, dopustite alatu OmniRoute da zapiše vlastitu konfiguraciju svakog alata iz aktivnog kataloga modela. Jedna naredba po alatu:

```bash
omniroute setup-codex        # profili ~/.codex/<name>.config.toml
omniroute setup-claude       # ~/.claude/profiles/<name>/settings.json
omniroute setup-opencode     # ~/.config/opencode/opencode.json (kompatibilno s OpenAI-jem)
omniroute setup-cline        # postavke za Cline CLI + proširenje za VS Code
omniroute setup-kilo         # Kilo Code
omniroute setup-continue     # ~/.continue/config.yaml (Continue / cn)
omniroute setup-cursor       # ispisuje korake unutar aplikacije Cursor
omniroute setup-roo          # uvoz za Roo Code + pokazivač autoImport
omniroute setup-crush        # ~/.config/crush/crush.json
omniroute setup-goose        # ~/.config/goose/config.yaml
omniroute setup-aider        # ~/.aider.conf.yml
omniroute setup-qwen         # ~/.qwen/settings.json + ~/.qwen/.env
```

Svaka prihvaća `--remote <url> --api-key <key>` za konfiguriranje lokalnog alata prema **udaljenom** OmniRouteu, kao i `--dry-run` za pretpregled. Za pokretanje CLI-ja s umetnutim odgovarajućim varijablama okruženja, bez ikakvog zapisivanja konfiguracije, upotrijebite generički pokretač `omniroute run <target>` (claude, codex, aider, goose, opencode, qwen, gemini); naslijeđeni pokretači za pojedinačne alate `omniroute launch` (Claude Code) i `omniroute launch-codex` (Codex) i dalje su dostupni.

Za cijelu tablicu (što svaka naredba zapisuje, sve zastavice, lokalno u odnosu na udaljeno, konvencije osnovnog URL-a `/v1`) pogledajte **[CLI integracije](./CLI-INTEGRATIONS.md)**.

Za detaljnu konfiguraciju pojedinačnih alata (Claude Code, Codex CLI, Cursor, Cline, OpenClaw, Kilo Code, Copilot i drugih) pogledajte namjenski **[Vodič za CLI alate](../reference/CLI-TOOLS.md)**.

---

## Postavljanje protokola (MCP + A2A)

### Postavljanje MCP-a (protokol konteksta modela)

Pokrenite MCP prijenos u načinu stdio:

```bash
omniroute --mcp
```

Preporučeni tijek provjere:

```bash
# 1. Pokrenite MCP poslužitelj
omniroute --mcp

# 2. Iz svojeg MCP klijenta pozovite:
omniroute_get_health        # Treba vratiti stanje sustava
omniroute_list_combos       # Treba vratiti aktivne kombinacije

# 3. Ili pokrenite cijeli E2E paket:
npm run test:protocols:e2e
```

#### Konfiguracija MCP klijenta

**Claude Code:**

```bash
claude mcp add-server omniroute --type http --url http://localhost:20128/api/mcp/stream
```

**Cursor / Cline:**

Dodajte u svoje MCP postavke:

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

**Cjelovita dokumentacija za MCP:** [README MCP poslužitelja](../../open-sse/mcp-server/README.md) — 110 alata, konfiguracije IDE-ova, klijenti za Python/TS/Go.

### Postavljanje A2A-a (protokol između agenata)

Provjerite karticu agenta:

```bash
curl http://localhost:20128/.well-known/agent.json
```

Pošaljite zadatak:

```bash
curl -X POST http://localhost:20128/a2a \
  -H 'content-type: application/json' \
  -d '{"jsonrpc":"2.0","id":"quickstart","method":"message/send","params":{"skill":"quota-management","messages":[{"role":"user","content":"Give me a short quota summary."}]}}'
```

**Cjelovita dokumentacija za A2A:** [README A2A poslužitelja](../../src/lib/a2a/README.md) — JSON-RPC 2.0, vještine, strujanje, životni ciklus zadatka.

---

## Konfiguracija vremenskih ograničenja

### Osnovna vremenska ograničenja

Za većinu implementacija potrebne su vam samo ove dvije varijable:

| Varijabla                | Zadana vrijednost               | Svrha                                                                                                                                                                                                                  |
| ------------------------ | ------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `REQUEST_TIMEOUT_MS`     | `600000`                        | Zajednička osnovna vrijednost za vremensko ograničenje početka odgovora uzvodnog poslužitelja, skrivena vremenska ograničenja Undici-ja, TLS fingerprint zahtjeve i vremenska ograničenja zahtjeva/proxyja API bridgea |
| `STREAM_IDLE_TIMEOUT_MS` | nasljeđuje `REQUEST_TIMEOUT_MS` | Najveći dopušteni razmak između dijelova toka prije nego što OmniRoute prekine SSE tok                                                                                                                                 |

Kompatibilnost s prethodnim verzijama je očuvana: postojeće varijable `FETCH_TIMEOUT_MS`, `API_BRIDGE_PROXY_TIMEOUT_MS` i druge varijable vremenskog ograničenja za pojedinačne slojeve i dalje rade te nadjačavaju zajedničku osnovnu vrijednost.

### Napomene specifične za pružatelje usluga

Za uzvodne poslužitelje kompatibilne s Claude Codeom (`anthropic-compatible-cc-*`), OmniRoute izvodi odlazno zaglavlje `X-Stainless-Timeout` iz razriješenog vremenskog ograničenja dohvaćanja kako bi vremenska ograničenja čitanja na strani pružatelja ostala usklađena s vašom konfiguracijom okruženja.

Za obrnute proxyje trećih strana kompatibilne s Claude Codeom, OmniRoute zadržava zadani skup `anthropic-beta` konzervativnim te, kada je `Client Cache Control` postavljen na `Auto`, prosljeđuje samo oznake `cache_control` koje je dostavio klijent. Uključite opciju „Enable redact-thinking beta” za pojedinačnu vezu samo kada uzvodni poslužitelj izričito zahtijeva redigirane tokove Claudeova razmišljanja.

### Napredna nadjačavanja vremenskih ograničenja

| Varijabla                                | Zadana vrijednost                            | Svrha                                                                                                           |
| ---------------------------------------- | -------------------------------------------- | --------------------------------------------------------------------------------------------------------------- |
| `FETCH_TIMEOUT_MS`                       | nasljeđuje `REQUEST_TIMEOUT_MS`              | Vremensko ograničenje početka odgovora uzvodnog poslužitelja koje se primjenjuje do primitka zaglavlja odgovora |
| `FETCH_HEADERS_TIMEOUT_MS`               | nasljeđuje `FETCH_TIMEOUT_MS`                | Vremensko ograničenje Undici-ja za primanje zaglavlja odgovora uzvodnog poslužitelja                            |
| `FETCH_BODY_TIMEOUT_MS`                  | nasljeđuje `FETCH_TIMEOUT_MS`                | Vremensko ograničenje Undici-ja između dijelova tijela odgovora uzvodnog poslužitelja (`0` ga onemogućuje)      |
| `FETCH_CONNECT_TIMEOUT_MS`               | `30000`                                      | Vremensko ograničenje Undici-ja za uspostavljanje TCP veze                                                      |
| `FETCH_KEEPALIVE_TIMEOUT_MS`             | `4000`                                       | Vremensko ograničenje Undici-ja za neaktivnu keep-alive utičnicu                                                |
| `TLS_CLIENT_TIMEOUT_MS`                  | nasljeđuje `FETCH_TIMEOUT_MS`                | Vremensko ograničenje za TLS fingerprint zahtjeve upućene putem `wreq-js`                                       |
| `API_BRIDGE_PROXY_TIMEOUT_MS`            | nasljeđuje `REQUEST_TIMEOUT_MS` ili `600000` | Vremensko ograničenje za proxy prosljeđivanje `/v1` s API porta na port nadzorne ploče                          |
| `API_BRIDGE_SERVER_REQUEST_TIMEOUT_MS`   | `max(API_BRIDGE_PROXY_TIMEOUT_MS, 300000)`   | Vremensko ograničenje dolaznog zahtjeva na poslužitelju API bridgea                                             |
| `API_BRIDGE_SERVER_HEADERS_TIMEOUT_MS`   | `60000`                                      | Vremensko ograničenje dolaznih zaglavlja na poslužitelju API bridgea                                            |
| `API_BRIDGE_SERVER_KEEPALIVE_TIMEOUT_MS` | `5000`                                       | Keep-alive vremensko ograničenje na poslužitelju API bridgea                                                    |
| `API_BRIDGE_SERVER_SOCKET_TIMEOUT_MS`    | `0`                                          | Vremensko ograničenje neaktivnosti utičnice na poslužitelju API bridgea (`0` ga onemogućuje)                    |

> **Napomena:** Za zahtjeve s prijenosom u toku, `FETCH_TIMEOUT_MS` obuhvaća samo uspostavljanje veze / čekanje prvog odgovora uzvodnog poslužitelja. Nakon što tok postane aktivan, OmniRoute će ga prekinuti samo u slučaju stvarnog zastoja (`STREAM_IDLE_TIMEOUT_MS`) ili neaktivnosti tijela prema Undici-ju (`FETCH_BODY_TIMEOUT_MS`).

### Kompatibilnost s obrnutim proxyjem

Ako OmniRoute pokrećete iza Nginxa, Caddyja, Cloudflarea ili drugog obrnutog proxyja, provjerite jesu li vremenska ograničenja proxyja također dulja od vremenskih ograničenja toka/dohvaćanja u OmniRouteu.

---

## Način rada s odvojenim portovima

Pokrenite API i nadzornu ploču na zasebnim portovima za napredne scenarije (obrnuti proxy, mrežno povezivanje spremnika):

```bash
PORT=20128 DASHBOARD_PORT=20129 omniroute
# API:             http://localhost:20128/v1
# Nadzorna ploča:  http://localhost:20129
```

---

## Predložak za Void Linux (xbps-src)

Korisnici sustava Void Linux mogu izraditi izvorni paket pomoću alata `xbps-src`. Spremite ovaj blok kao `srcpkgs/omniroute/template`:

```bash
# Datoteka predloška za 'omniroute'
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
# Ponovno generirajte kontrolni zbroj za svako izdanje pomoću:
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

## Deinstalacija

| Naredba                  | Radnja                                                                                               |
| ------------------------ | ---------------------------------------------------------------------------------------------------- |
| `npm run uninstall`      | Uklanja aplikaciju iz sustava, ali **zadržava vašu bazu podataka i konfiguracije** u `~/.omniroute`. |
| `npm run uninstall:full` | Uklanja aplikaciju I trajno **briše sve konfiguracije, ključeve i baze podataka**.                   |

> Detaljne upute za deinstalaciju svim metodama potražite u dokumentu [UNINSTALL.md](./UNINSTALL.md).
