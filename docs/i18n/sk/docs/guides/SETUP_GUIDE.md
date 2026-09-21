# 📖 Setup Guide — OmniRoute (Slovenčina)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/SETUP_GUIDE.md) · 🇪🇹 [am](../../../am/docs/guides/SETUP_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/guides/SETUP_GUIDE.md) · 🇦🇿 [az](../../../az/docs/guides/SETUP_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/guides/SETUP_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/guides/SETUP_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/guides/SETUP_GUIDE.md) · 🇩🇰 [da](../../../da/docs/guides/SETUP_GUIDE.md) · 🇩🇪 [de](../../../de/docs/guides/SETUP_GUIDE.md) · 🇬🇷 [el](../../../el/docs/guides/SETUP_GUIDE.md) · 🇪🇸 [es](../../../es/docs/guides/SETUP_GUIDE.md) · 🇪🇪 [et](../../../et/docs/guides/SETUP_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/guides/SETUP_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/guides/SETUP_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/guides/SETUP_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/guides/SETUP_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/guides/SETUP_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/guides/SETUP_GUIDE.md) · 🇮🇱 [he](../../../he/docs/guides/SETUP_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/guides/SETUP_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/guides/SETUP_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/guides/SETUP_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/guides/SETUP_GUIDE.md) · 🇮🇩 [id](../../../id/docs/guides/SETUP_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/guides/SETUP_GUIDE.md) · 🇮🇹 [it](../../../it/docs/guides/SETUP_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/guides/SETUP_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/guides/SETUP_GUIDE.md) · 🇰🇭 [km](../../../km/docs/guides/SETUP_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/guides/SETUP_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/guides/SETUP_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/guides/SETUP_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/guides/SETUP_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/guides/SETUP_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/guides/SETUP_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/guides/SETUP_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/guides/SETUP_GUIDE.md) · 🇲🇲 [my](../../../my/docs/guides/SETUP_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/guides/SETUP_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/guides/SETUP_GUIDE.md) · 🇳🇴 [no](../../../no/docs/guides/SETUP_GUIDE.md) · 🇮🇳 [or](../../../or/docs/guides/SETUP_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/guides/SETUP_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/guides/SETUP_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/guides/SETUP_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/guides/SETUP_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/SETUP_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/guides/SETUP_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/guides/SETUP_GUIDE.md) · 🇱🇰 [si](../../../si/docs/guides/SETUP_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/guides/SETUP_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/guides/SETUP_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/guides/SETUP_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/guides/SETUP_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/guides/SETUP_GUIDE.md) · 🇮🇳 [te](../../../te/docs/guides/SETUP_GUIDE.md) · 🇹🇭 [th](../../../th/docs/guides/SETUP_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/guides/SETUP_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/SETUP_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/guides/SETUP_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/guides/SETUP_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/guides/SETUP_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/guides/SETUP_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/SETUP_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/SETUP_GUIDE.md)

---

> Kompletná referencia nastavenia OmniRoute. Stručnú verziu nájdete v časti [Rýchly štart v README](../README.md#-quick-start).

## Obsah

- [Spôsoby inštalácie](#install-methods)
- [Konfigurácia nástroja CLI](#cli-tool-configuration)
- [Nastavenie protokolov (MCP + A2A)](#protocol-setup-mcp--a2a)
- [Konfigurácia časových limitov](#timeout-configuration)
- [Režim oddelených portov](#split-port-mode)
- [Void Linux (xbps-src)](#void-linux-xbps-src-template)
- [Odinštalovanie](#uninstalling)

---

## Spôsoby inštalácie

### npm (odporúčané)

```bash
npm install -g omniroute
omniroute
```

Ovládací panel sa otvorí na adrese `http://localhost:20128` a základná URL adresa API je `http://localhost:20128/v1`.

### pnpm

```bash
pnpm add -g omniroute@latest --allow-build=better-sqlite3 --allow-build=@swc/core
omniroute
```

> **Používatelia pnpm:** príznak `--allow-build` je potrebný na povolenie natívnych zostavovacích skriptov pre `better-sqlite3` a `@swc/core`. Príkaz `pnpm approve-builds -g` nie je v pnpm v11 podporovaný pre globálne inštalácie.

### Arch Linux (AUR)

```bash
yay -S omniroute-bin
systemctl --user enable --now omniroute.service
```

[Balík AUR](https://aur.archlinux.org/packages/omniroute-bin) nainštaluje OmniRoute a poskytuje používateľskú službu systemd.

### Zo zdrojového kódu

```bash
npm install
PORT=20128 DASHBOARD_PORT=20129 NEXT_PUBLIC_BASE_URL=http://localhost:20129 npm run dev
```

> **Poznámka pre Windows:** OmniRoute predvolene používa `%APPDATA%\omniroute`, ak starší adresár `%USERPROFILE%\.omniroute` neexistuje. Nastavením `DATA_DIR` môžete vybrať iné umiestnenie dátového adresára.

> **Poznámka:** Pri prvom spustení `npm install` automaticky vygeneruje `.env` zo súboru `.env.example`. Pri ďalších inštaláciách sa existujúci súbor `.env` neprepíše, takže vlastné úpravy zostanú zachované. Ak ho chcete znova vytvoriť z predlohy, pred opätovným spustením odstráňte `.env`.

### Docker

Kompletné nastavenie Dockeru vrátane profilov Compose a HTTPS cez Caddy nájdete v [príručke k Dockeru](./DOCKER_GUIDE.md).

### Desktopová aplikácia (Electron)

OmniRoute obsahuje desktopový obal vytvorený pomocou Electron 41 + electron-builder 26.10. Dostupné skripty (koreň pracovného priestoru):

```bash
npm run electron:dev          # Spustenie desktopovej aplikácie s automatickým opätovným načítaním
npm run electron:build        # Zostavenie pre aktuálny OS (automaticky rozpoznaný)
npm run electron:build:win    # Inštalátor pre Windows (NSIS + prenosná verzia)
npm run electron:build:mac    # macOS (dmg + zip, arm64+x64)
npm run electron:build:linux  # Linux (AppImage + deb + rpm)
npm run electron:smoke:packaged  # Rýchly test zabalenej zostavy
```

Vydania desktopových inštalátorov sú priložené k vydaniam na GitHube. Úplný podrobný prehľad Electronu (podpisovanie, most IPC, distribúcie) nájdete v [`ELECTRON_GUIDE.md`](./ELECTRON_GUIDE.md) _(vytvorené v neskoršej fáze)_.

### Bezobslužný server (CI/automatizácia)

Pre bezobslužné nastavenia (Docker, Kubernetes, CI) použite:

```bash
omniroute setup --non-interactive
omniroute providers test-batch
```

V kombinácii s premennými prostredia (`INITIAL_PASSWORD`, `OMNIROUTE_WS_BRIDGE_SECRET` atď.) tak môžete spustiť inštanciu OmniRoute úplne skriptovateľným spôsobom.

### Možnosti CLI

| Príkaz                  | Popis                                                                                                |
| ----------------------- | ---------------------------------------------------------------------------------------------------- |
| `omniroute`             | Spustí server (`PORT=20128`, API a ovládací panel na rovnakom porte)                                 |
| `omniroute setup`       | Sprievodca úvodným nastavením hesla a prvého poskytovateľa cez CLI                                   |
| `omniroute doctor`      | Spustí lokálne kontroly stavu bez spustenia servera                                                  |
| `omniroute providers`   | Vyhľadá, vypíše, overí a otestuje poskytovateľov cez CLI                                             |
| `omniroute config`      | Konfigurácia nástroja CLI — výpis, získanie, nastavenie a overenie konfigurácií                      |
| `omniroute status`      | Offline ovládací panel stavu — verzia, databáza, nástroje, konfigurácia                              |
| `omniroute logs`        | Prenáša denníky používania z API (podporuje `--follow`)                                              |
| `omniroute update`      | Skontroluje alebo použije aktualizácie OmniRoute                                                     |
| `omniroute provider`    | Spravuje pripojenia poskytovateľov — pridanie, výpis, odstránenie, testovanie, predvolené nastavenie |
| `omniroute --port 3000` | Nastaví kanonický port/port API na 3000                                                              |
| `omniroute --mcp`       | Spustí server MCP (prenos stdio)                                                                     |
| `omniroute --no-open`   | Zakáže automatické otvorenie prehliadača                                                             |
| `omniroute --help`      | Zobrazí pomocníka                                                                                    |

Bezobslužné nastavenie možno automatizovať pomocou príznakov alebo premenných prostredia:

```bash
omniroute setup --non-interactive --password "$OMNIROUTE_PASSWORD"
omniroute setup --non-interactive --add-provider --provider openai --api-key "$OPENAI_API_KEY"
omniroute setup --non-interactive --add-provider --provider openai --api-key "$OPENAI_API_KEY" --test-provider
```

Spustenie lokálnej diagnostiky bez otvorenia ovládacieho panela:

```bash
omniroute doctor
omniroute doctor --json
omniroute doctor --no-liveness
```

Správa poskytovateľov cez SSH alebo skripty bez otvorenia ovládacieho panela:

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

## Konfigurácia nástroja CLI

### 1) Pripojenie poskytovateľov a vytvorenie kľúča API

1. Otvorte Dashboard → `Providers` a pripojte aspoň jedného poskytovateľa (OAuth alebo kľúč API).
2. Otvorte Dashboard → `Endpoints` a vytvorte kľúč API.
3. (Voliteľné) Otvorte Dashboard → `Combos` a nastavte svoj záložný reťazec.

### 2) Nasmerovanie vášho nástroja na programovanie

```txt
Základná URL: http://localhost:20128/v1
Kľúč API:     [skopírujte zo stránky Endpoint]
Model:        if/qwen3.8-max-preview (alebo ľubovoľný prefix poskytovateľa/modelu)
```

Ak váš editor nedokáže odosielať `Authorization: Bearer ...`, použite namiesto toho tokenizovanú kompatibilnú základnú adresu:

```txt
Základná URL:         http://localhost:20128/api/v1/vscode/YOUR_KEY/
URL modelov:          http://localhost:20128/api/v1/vscode/YOUR_KEY/models
URL chatu:            http://localhost:20128/api/v1/vscode/YOUR_KEY/chat/completions
URL značiek Ollama:   http://localhost:20128/api/v1/vscode/YOUR_KEY/api/tags
```

Funguje s Claude Code, Codex CLI, Cursor, Cline, OpenClaw, OpenCode a súpravami SDK kompatibilnými s OpenAI.

#### Automatická konfigurácia pomocou `setup-*`

Namiesto ručného vkladania základnej adresy URL a kľúča nechajte OmniRoute zapísať vlastnú
konfiguráciu každého nástroja podľa aktuálneho katalógu modelov. Jeden príkaz pre každý nástroj:

```bash
omniroute setup-codex        # profily ~/.codex/<name>.config.toml
omniroute setup-claude       # ~/.claude/profiles/<name>/settings.json
omniroute setup-opencode     # ~/.config/opencode/opencode.json (kompatibilné s OpenAI)
omniroute setup-cline        # nastavenia Cline CLI + rozšírenia VS Code
omniroute setup-kilo         # Kilo Code
omniroute setup-continue     # ~/.continue/config.yaml (Continue / cn)
omniroute setup-cursor       # vypíše kroky v aplikácii Cursor
omniroute setup-roo          # import Roo Code + ukazovateľ autoImport
omniroute setup-crush        # ~/.config/crush/crush.json
omniroute setup-goose        # ~/.config/goose/config.yaml
omniroute setup-aider        # ~/.aider.conf.yml
omniroute setup-qwen         # ~/.qwen/settings.json + ~/.qwen/.env
```

Každý z nich podporuje `--remote <url> --api-key <key>` na konfiguráciu lokálneho nástroja voči
**vzdialenému** OmniRoute a tiež `--dry-run` na zobrazenie náhľadu. Ak chcete spustiť CLI so správne
vloženými premennými prostredia bez zápisu akejkoľvek konfigurácie, použite všeobecný spúšťač
`omniroute run <target>` (claude, codex, aider, goose, opencode, qwen, gemini);
staršie spúšťače pre jednotlivé nástroje `omniroute launch` (Claude Code) a
`omniroute launch-codex` (Codex) zostávajú dostupné.

Úplnú tabuľku (čo každý príkaz zapisuje, všetky príznaky, lokálne oproti vzdialenému režimu, konvencie
`/v1` pre základnú adresu URL) nájdete v dokumente **[Integrácie CLI](./CLI-INTEGRATIONS.md)**.

Podrobnú konfiguráciu jednotlivých nástrojov (Claude Code, Codex CLI, Cursor, Cline, OpenClaw, Kilo Code, Copilot a ďalšie) nájdete v samostatnej **[Príručke nástrojov CLI](../reference/CLI-TOOLS.md)**.

---

## Nastavenie protokolov (MCP + A2A)

### Nastavenie MCP (Model Context Protocol)

Spustite prenos MCP v režime štandardného vstupu a výstupu:

```bash
omniroute --mcp
```

Odporúčaný postup overenia:

```bash
# 1. Spustite server MCP
omniroute --mcp

# 2. Z vášho klienta MCP zavolajte:
omniroute_get_health        # Malo by vrátiť stav systému
omniroute_list_combos       # Malo by vrátiť aktívne kombinácie

# 3. Alebo spustite úplnú súpravu testov E2E:
npm run test:protocols:e2e
```

#### Konfigurácia klienta MCP

**Claude Code:**

```bash
claude mcp add-server omniroute --type http --url http://localhost:20128/api/mcp/stream
```

**Cursor / Cline:**

Pridajte do svojich nastavení MCP:

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

**Úplná dokumentácia MCP:** [README servera MCP](../../open-sse/mcp-server/README.md) — 110 nástrojov, konfigurácie IDE, klienti pre Python/TS/Go.

### Nastavenie A2A (Agent-to-Agent Protocol)

Overte kartu agenta:

```bash
curl http://localhost:20128/.well-known/agent.json
```

Odošlite úlohu:

```bash
curl -X POST http://localhost:20128/a2a \
  -H 'content-type: application/json' \
  -d '{"jsonrpc":"2.0","id":"quickstart","method":"message/send","params":{"skill":"quota-management","messages":[{"role":"user","content":"Give me a short quota summary."}]}}'
```

**Úplná dokumentácia A2A:** [README servera A2A](../../src/lib/a2a/README.md) — JSON-RPC 2.0, zručnosti, streamovanie, životný cyklus úloh.

---

## Konfigurácia časových limitov

### Základné časové limity

Pre väčšinu nasadení potrebujete iba tieto dve premenné:

| Premenná                 | Predvolená hodnota          | Účel                                                                                                                                                                                    |
| ------------------------ | --------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `REQUEST_TIMEOUT_MS`     | `600000`                    | Spoločná základná hodnota časového limitu začiatku odpovede upstreamu, skrytých časových limitov Undici, požiadaviek na TLS fingerprint a časových limitov požiadaviek/proxy API bridge |
| `STREAM_IDLE_TIMEOUT_MS` | dedí z `REQUEST_TIMEOUT_MS` | Maximálna medzera medzi streamovanými blokmi, po ktorej OmniRoute preruší SSE stream                                                                                                    |

Spätná kompatibilita je zachovaná: existujúce premenné `FETCH_TIMEOUT_MS`, `API_BRIDGE_PROXY_TIMEOUT_MS` a ďalšie premenné časových limitov jednotlivých vrstiev naďalej fungujú a prepíšu spoločnú základnú hodnotu.

### Poznámky špecifické pre poskytovateľov

Pre upstreamy kompatibilné s Claude Code (`anthropic-compatible-cc-*`) OmniRoute odvodzuje odchádzajúcu hlavičku `X-Stainless-Timeout` z výsledného časového limitu fetch, aby časové limity čítania na strane poskytovateľa zostali zosúladené s vašou konfiguráciou prostredia.

Pre reverzné proxy tretích strán kompatibilné s Claude Code ponecháva OmniRoute predvolenú množinu `anthropic-beta` konzervatívnu a v prípade, že je možnosť `Client Cache Control` ponechaná na hodnote `Auto`, preposiela iba značky `cache_control` poskytnuté klientom. Prepínač „Enable redact-thinking beta“ pre jednotlivé pripojenia zapnite iba vtedy, keď upstream výslovne vyžaduje streamy Claude thinking s redigovaným obsahom.

### Pokročilé prepísanie časových limitov

| Premenná                                 | Predvolená hodnota                         | Účel                                                                              |
| ---------------------------------------- | ------------------------------------------ | --------------------------------------------------------------------------------- |
| `FETCH_TIMEOUT_MS`                       | dedí z `REQUEST_TIMEOUT_MS`                | Časový limit začiatku odpovede upstreamu používaný do prijatia hlavičiek odpovede |
| `FETCH_HEADERS_TIMEOUT_MS`               | dedí z `FETCH_TIMEOUT_MS`                  | Časový limit Undici na prijatie hlavičiek odpovede upstreamu                      |
| `FETCH_BODY_TIMEOUT_MS`                  | dedí z `FETCH_TIMEOUT_MS`                  | Časový limit Undici medzi blokmi tela odpovede upstreamu (`0` ho vypne)           |
| `FETCH_CONNECT_TIMEOUT_MS`               | `30000`                                    | Časový limit Undici na nadviazanie TCP pripojenia                                 |
| `FETCH_KEEPALIVE_TIMEOUT_MS`             | `4000`                                     | Časový limit nečinnosti socketu keep-alive v Undici                               |
| `TLS_CLIENT_TIMEOUT_MS`                  | dedí z `FETCH_TIMEOUT_MS`                  | Časový limit požiadaviek na TLS fingerprint vykonaných prostredníctvom `wreq-js`  |
| `API_BRIDGE_PROXY_TIMEOUT_MS`            | dedí z `REQUEST_TIMEOUT_MS` alebo `600000` | Časový limit preposielania proxy `/v1` z portu API na port ovládacieho panela     |
| `API_BRIDGE_SERVER_REQUEST_TIMEOUT_MS`   | `max(API_BRIDGE_PROXY_TIMEOUT_MS, 300000)` | Časový limit prichádzajúcej požiadavky na serveri API bridge                      |
| `API_BRIDGE_SERVER_HEADERS_TIMEOUT_MS`   | `60000`                                    | Časový limit prichádzajúcich hlavičiek na serveri API bridge                      |
| `API_BRIDGE_SERVER_KEEPALIVE_TIMEOUT_MS` | `5000`                                     | Časový limit keep-alive na serveri API bridge                                     |
| `API_BRIDGE_SERVER_SOCKET_TIMEOUT_MS`    | `0`                                        | Časový limit nečinnosti socketu na serveri API bridge (`0` ho vypne)              |

> **Poznámka:** Pri streamovaných požiadavkách sa `FETCH_TIMEOUT_MS` vzťahuje iba na vytvorenie pripojenia / čakanie na prvú odpoveď upstreamu. Po aktivovaní streamu ho OmniRoute preruší iba pri skutočnom zastavení (`STREAM_IDLE_TIMEOUT_MS`) alebo nečinnosti tela v Undici (`FETCH_BODY_TIMEOUT_MS`).

### Kompatibilita s reverzným proxy

Ak OmniRoute prevádzkujete za Nginx, Caddy, Cloudflare alebo iným reverzným proxy, uistite sa, že časové limity proxy sú tiež vyššie než časové limity streamu/fetch v OmniRoute.

---

## Režim oddelených portov

Spustite API a ovládací panel na samostatných portoch pre pokročilé scenáre (reverzný proxy server, kontajnerové siete):

```bash
PORT=20128 DASHBOARD_PORT=20129 omniroute
# API:             http://localhost:20128/v1
# Ovládací panel:  http://localhost:20129
```

---

## Šablóna pre Void Linux (xbps-src)

Používatelia systému Void Linux môžu zostaviť natívny balík pomocou `xbps-src`. Uložte tento blok ako `srcpkgs/omniroute/template`:

```bash
# Súbor šablóny pre balík „omniroute“
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
# Pre každé vydanie znova vygenerujte kontrolný súčet pomocou:
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

## Odinštalovanie

| Príkaz                   | Akcia                                                                                        |
| ------------------------ | -------------------------------------------------------------------------------------------- |
| `npm run uninstall`      | Odstráni systémovú aplikáciu, ale **ponechá vašu databázu a konfigurácie** v `~/.omniroute`. |
| `npm run uninstall:full` | Odstráni aplikáciu A zároveň natrvalo **vymaže všetky konfigurácie, kľúče a databázy**.      |

> Podrobné pokyny na odinštalovanie pre všetky metódy nájdete v súbore [UNINSTALL.md](./UNINSTALL.md).
