# 📖 Setup Guide — OmniRoute (Čeština)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/SETUP_GUIDE.md) · 🇪🇹 [am](../../../am/docs/guides/SETUP_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/guides/SETUP_GUIDE.md) · 🇦🇿 [az](../../../az/docs/guides/SETUP_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/guides/SETUP_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/guides/SETUP_GUIDE.md) · 🇩🇰 [da](../../../da/docs/guides/SETUP_GUIDE.md) · 🇩🇪 [de](../../../de/docs/guides/SETUP_GUIDE.md) · 🇬🇷 [el](../../../el/docs/guides/SETUP_GUIDE.md) · 🇪🇸 [es](../../../es/docs/guides/SETUP_GUIDE.md) · 🇪🇪 [et](../../../et/docs/guides/SETUP_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/guides/SETUP_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/guides/SETUP_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/guides/SETUP_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/guides/SETUP_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/guides/SETUP_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/guides/SETUP_GUIDE.md) · 🇮🇱 [he](../../../he/docs/guides/SETUP_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/guides/SETUP_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/guides/SETUP_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/guides/SETUP_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/guides/SETUP_GUIDE.md) · 🇮🇩 [id](../../../id/docs/guides/SETUP_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/guides/SETUP_GUIDE.md) · 🇮🇹 [it](../../../it/docs/guides/SETUP_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/guides/SETUP_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/guides/SETUP_GUIDE.md) · 🇰🇭 [km](../../../km/docs/guides/SETUP_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/guides/SETUP_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/guides/SETUP_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/guides/SETUP_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/guides/SETUP_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/guides/SETUP_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/guides/SETUP_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/guides/SETUP_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/guides/SETUP_GUIDE.md) · 🇲🇲 [my](../../../my/docs/guides/SETUP_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/guides/SETUP_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/guides/SETUP_GUIDE.md) · 🇳🇴 [no](../../../no/docs/guides/SETUP_GUIDE.md) · 🇮🇳 [or](../../../or/docs/guides/SETUP_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/guides/SETUP_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/guides/SETUP_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/guides/SETUP_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/guides/SETUP_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/SETUP_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/guides/SETUP_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/guides/SETUP_GUIDE.md) · 🇱🇰 [si](../../../si/docs/guides/SETUP_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/guides/SETUP_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/guides/SETUP_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/guides/SETUP_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/guides/SETUP_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/guides/SETUP_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/guides/SETUP_GUIDE.md) · 🇮🇳 [te](../../../te/docs/guides/SETUP_GUIDE.md) · 🇹🇭 [th](../../../th/docs/guides/SETUP_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/guides/SETUP_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/SETUP_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/guides/SETUP_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/guides/SETUP_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/guides/SETUP_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/guides/SETUP_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/SETUP_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/SETUP_GUIDE.md)

---

> Kompletní referenční příručka k nastavení OmniRoute. Stručnou verzi najdete v části [Rychlý start v README](../README.md#-quick-start).

## Obsah

- [Způsoby instalace](#install-methods)
- [Konfigurace nástrojů CLI](#cli-tool-configuration)
- [Nastavení protokolů (MCP + A2A)](#protocol-setup-mcp--a2a)
- [Konfigurace časových limitů](#timeout-configuration)
- [Režim oddělených portů](#split-port-mode)
- [Void Linux (xbps-src)](#void-linux-xbps-src-template)
- [Odinstalace](#uninstalling)

---

## Způsoby instalace

### npm (doporučeno)

```bash
npm install -g omniroute
omniroute
```

Ovládací panel se otevře na adrese `http://localhost:20128` a základní URL rozhraní API je `http://localhost:20128/v1`.

### pnpm

```bash
pnpm add -g omniroute@latest --allow-build=better-sqlite3 --allow-build=@swc/core
omniroute
```

> **Uživatelé pnpm:** příznak `--allow-build` je vyžadován k povolení nativních sestavovacích skriptů pro `better-sqlite3` a `@swc/core`. Příkaz `pnpm approve-builds -g` není u globálních instalací v pnpm v11 podporován.

### Arch Linux (AUR)

```bash
yay -S omniroute-bin
systemctl --user enable --now omniroute.service
```

[Balíček AUR](https://aur.archlinux.org/packages/omniroute-bin) nainstaluje OmniRoute a poskytne uživatelskou službu systemd.

### Ze zdrojového kódu

```bash
npm install
PORT=20128 DASHBOARD_PORT=20129 NEXT_PUBLIC_BASE_URL=http://localhost:20129 npm run dev
```

> **Poznámka pro Windows:** Ve výchozím nastavení používá OmniRoute `%APPDATA%\omniroute`, pokud starší adresář `%USERPROFILE%\.omniroute` neexistuje. Nastavením `DATA_DIR` zvolíte jiné umístění datového adresáře.

> **Poznámka:** `npm install` při prvním spuštění automaticky vygeneruje `.env` ze souboru `.env.example`. Následující instalace existující soubor `.env` nepřepíší, takže vlastní úpravy zůstanou zachovány. Chcete-li jej vygenerovat znovu, před opětovným spuštěním odstraňte `.env`.

### Docker

Kompletní nastavení Dockeru včetně profilů Compose a HTTPS přes Caddy najdete v [průvodci Dockerem](./DOCKER_GUIDE.md).

### Desktopová aplikace (Electron)

OmniRoute obsahuje desktopový obal založený na Electron 41 + electron-builder 26.10. Dostupné skripty (kořenový adresář pracovního prostoru):

```bash
npm run electron:dev          # Spustí desktopovou aplikaci s automatickým opětovným načítáním
npm run electron:build        # Sestaví aplikaci pro aktuální OS (automaticky rozpoznaný)
npm run electron:build:win    # Instalační program pro Windows (NSIS + přenosná verze)
npm run electron:build:mac    # macOS (dmg + zip, arm64+x64)
npm run electron:build:linux  # Linux (AppImage + deb + rpm)
npm run electron:smoke:packaged  # Provede základní test zabaleného sestavení
```

Vydání instalačních programů desktopové aplikace jsou přiložena k vydáním na GitHubu. Podrobný rozbor Electronu (podepisování, most IPC, distribuce) najdete v souboru [`ELECTRON_GUIDE.md`](./ELECTRON_GUIDE.md) _(vytvořeno v pozdější fázi)_.

### Bezobslužný server (CI/automatizace)

Pro bezobslužná nastavení (Docker, Kubernetes, CI) použijte:

```bash
omniroute setup --non-interactive
omniroute providers test-batch
```

V kombinaci s proměnnými prostředí (`INITIAL_PASSWORD`, `OMNIROUTE_WS_BRIDGE_SECRET` atd.) tak můžete spustit instanci OmniRoute plně ovladatelnou pomocí skriptů.

### Možnosti CLI

| Příkaz                  | Popis                                                                                      |
| ----------------------- | ------------------------------------------------------------------------------------------ |
| `omniroute`             | Spustí server (`PORT=20128`, API a ovládací panel na stejném portu)                        |
| `omniroute setup`       | Průvodce úvodním nastavením hesla a prvního poskytovatele v CLI                            |
| `omniroute doctor`      | Spustí místní kontroly stavu bez spuštění serveru                                          |
| `omniroute providers`   | Vyhledá, vypíše, ověří a otestuje poskytovatele z CLI                                      |
| `omniroute config`      | Konfigurace nástrojů CLI — výpis, načtení, nastavení a ověření konfigurací                 |
| `omniroute status`      | Offline ovládací panel stavu — verze, databáze, nástroje a konfigurace                     |
| `omniroute logs`        | Průběžně zobrazuje protokoly používání z API (podporuje `--follow`)                        |
| `omniroute update`      | Vyhledá nebo použije aktualizace OmniRoute                                                 |
| `omniroute provider`    | Spravuje připojení poskytovatelů — přidání, výpis, odebrání, testování a výchozí nastavení |
| `omniroute --port 3000` | Nastaví kanonický/API port na 3000                                                         |
| `omniroute --mcp`       | Spustí server MCP (přenos přes stdio)                                                      |
| `omniroute --no-open`   | Neotevře automaticky prohlížeč                                                             |
| `omniroute --help`      | Zobrazí nápovědu                                                                           |

Bezobslužné nastavení lze skriptovat pomocí příznaků nebo proměnných prostředí:

```bash
omniroute setup --non-interactive --password "$OMNIROUTE_PASSWORD"
omniroute setup --non-interactive --add-provider --provider openai --api-key "$OPENAI_API_KEY"
omniroute setup --non-interactive --add-provider --provider openai --api-key "$OPENAI_API_KEY" --test-provider
```

Spusťte místní diagnostiku bez otevření ovládacího panelu:

```bash
omniroute doctor
omniroute doctor --json
omniroute doctor --no-liveness
```

Spravujte poskytovatele přes SSH nebo pomocí skriptů bez otevření ovládacího panelu:

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

## Konfigurace nástroje CLI

### 1) Připojte poskytovatele a vytvořte klíč API

1. Otevřete Dashboard → `Providers` a připojte alespoň jednoho poskytovatele (OAuth nebo klíč API).
2. Otevřete Dashboard → `Endpoints` a vytvořte klíč API.
3. (Volitelné) Otevřete Dashboard → `Combos` a nastavte řetězec záložních možností.

### 2) Nasměrujte svůj nástroj pro programování

```txt
Base URL: http://localhost:20128/v1
API Key:  [zkopírujte ze stránky Endpoint]
Model:    if/qwen3.8-max-preview (nebo libovolný prefix poskytovatel/model)
```

Pokud váš editor nedokáže odeslat `Authorization: Bearer ...`, použijte místo toho kompatibilní základní adresu s tokenem:

```txt
Base URL: http://localhost:20128/api/v1/vscode/YOUR_KEY/
Models URL: http://localhost:20128/api/v1/vscode/YOUR_KEY/models
Chat URL: http://localhost:20128/api/v1/vscode/YOUR_KEY/chat/completions
Ollama Tags URL: http://localhost:20128/api/v1/vscode/YOUR_KEY/api/tags
```

Funguje s Claude Code, Codex CLI, Cursor, Cline, OpenClaw, OpenCode a sadami SDK kompatibilními s OpenAI.

#### Automatická konfigurace pomocí `setup-*`

Místo ručního vkládání základní adresy URL a klíče nechte OmniRoute zapsat vlastní konfiguraci každého nástroje z aktuálního katalogu modelů. Jeden příkaz pro každý nástroj:

```bash
omniroute setup-codex        # profily ~/.codex/<name>.config.toml
omniroute setup-claude       # ~/.claude/profiles/<name>/settings.json
omniroute setup-opencode     # ~/.config/opencode/opencode.json (kompatibilní s OpenAI)
omniroute setup-cline        # CLI Cline + nastavení rozšíření VS Code
omniroute setup-kilo         # Kilo Code
omniroute setup-continue     # ~/.continue/config.yaml (Continue / cn)
omniroute setup-cursor       # vypíše postup v aplikaci Cursor
omniroute setup-roo          # import Roo Code + ukazatel autoImport
omniroute setup-crush        # ~/.config/crush/crush.json
omniroute setup-goose        # ~/.config/goose/config.yaml
omniroute setup-aider        # ~/.aider.conf.yml
omniroute setup-qwen         # ~/.qwen/settings.json + ~/.qwen/.env
```

Každý z nich přijímá `--remote <url> --api-key <key>` pro konfiguraci místního nástroje vůči **vzdálené** instanci OmniRoute a také `--dry-run` pro zobrazení náhledu. Chcete-li spustit CLI se správně vloženými proměnnými prostředí a bez zápisu jakékoli konfigurace, použijte obecný spouštěč `omniroute run <target>` (claude, codex, aider, goose, opencode, qwen, gemini); původní spouštěče pro jednotlivé nástroje `omniroute launch` (Claude Code) a `omniroute launch-codex` (Codex) zůstávají k dispozici.

Úplnou tabulku (co jednotlivé příkazy zapisují, všechny příznaky, místní oproti vzdálenému režimu, konvence základní adresy URL s `/v1`) najdete v dokumentu **[Integrace CLI](./CLI-INTEGRATIONS.md)**.

Podrobnou konfiguraci jednotlivých nástrojů (Claude Code, Codex CLI, Cursor, Cline, OpenClaw, Kilo Code, Copilot a další) najdete ve vyhrazeném **[Průvodci nástroji CLI](../reference/CLI-TOOLS.md)**.

---

## Nastavení protokolů (MCP + A2A)

### Nastavení MCP (Model Context Protocol)

Spusťte transport MCP v režimu stdio:

```bash
omniroute --mcp
```

Doporučený postup ověření:

```bash
# 1. Spusťte server MCP
omniroute --mcp

# 2. Z klienta MCP zavolejte:
omniroute_get_health        # Mělo by vrátit stav systému
omniroute_list_combos       # Mělo by vrátit aktivní kombinace

# 3. Nebo spusťte úplnou sadu testů E2E:
npm run test:protocols:e2e
```

#### Konfigurace klienta MCP

**Claude Code:**

```bash
claude mcp add-server omniroute --type http --url http://localhost:20128/api/mcp/stream
```

**Cursor / Cline:**

Přidejte do nastavení MCP:

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

**Úplná dokumentace MCP:** [README serveru MCP](../../open-sse/mcp-server/README.md) — 110 nástrojů, konfigurace IDE, klienti pro Python/TS/Go.

### Nastavení A2A (protokol Agent-to-Agent)

Ověřte kartu agenta:

```bash
curl http://localhost:20128/.well-known/agent.json
```

Odešlete úlohu:

```bash
curl -X POST http://localhost:20128/a2a \
  -H 'content-type: application/json' \
  -d '{"jsonrpc":"2.0","id":"quickstart","method":"message/send","params":{"skill":"quota-management","messages":[{"role":"user","content":"Give me a short quota summary."}]}}'
```

**Úplná dokumentace A2A:** [README serveru A2A](../../src/lib/a2a/README.md) — JSON-RPC 2.0, dovednosti, streamování, životní cyklus úloh.

---

## Konfigurace časových limitů

### Základní časové limity

Pro většinu nasazení potřebujete pouze tyto dvě proměnné:

| Proměnná                 | Výchozí hodnota              | Účel                                                                                                                                                                  |
| ------------------------ | ---------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `REQUEST_TIMEOUT_MS`     | `600000`                     | Společná výchozí hodnota pro časový limit zahájení odpovědi upstreamu, skryté časové limity Undici, požadavky na otisk TLS a časové limity požadavků/proxy API bridge |
| `STREAM_IDLE_TIMEOUT_MS` | přebírá `REQUEST_TIMEOUT_MS` | Maximální prodleva mezi streamovanými bloky, po jejímž překročení OmniRoute přeruší stream SSE                                                                        |

Zpětná kompatibilita je zachována: stávající proměnné `FETCH_TIMEOUT_MS`, `API_BRIDGE_PROXY_TIMEOUT_MS` a další proměnné časových limitů pro jednotlivé vrstvy nadále fungují a přepisují společnou výchozí hodnotu.

### Poznámky specifické pro poskytovatele

Pro upstreamy kompatibilní s Claude Code (`anthropic-compatible-cc-*`) odvozuje OmniRoute odchozí hlavičku `X-Stainless-Timeout` z výsledného časového limitu načítání, aby časové limity čtení na straně poskytovatele zůstaly sladěné s konfigurací vašeho prostředí.

U reverzních proxy třetích stran kompatibilních s Claude Code ponechává OmniRoute výchozí sadu `anthropic-beta` konzervativní, a pokud je `Client Cache Control` ponecháno na hodnotě `Auto`, předává pouze značky `cache_control` poskytnuté klientem. Přepínač „Enable redact-thinking beta“ pro jednotlivá připojení povolte pouze tehdy, když upstream výslovně vyžaduje streamy Claude s redigovaným uvažováním.

### Pokročilá nastavení časových limitů

| Proměnná                                 | Výchozí hodnota                            | Účel                                                                             |
| ---------------------------------------- | ------------------------------------------ | -------------------------------------------------------------------------------- |
| `FETCH_TIMEOUT_MS`                       | přebírá `REQUEST_TIMEOUT_MS`               | Časový limit zahájení odpovědi upstreamu, používaný do přijetí hlaviček odpovědi |
| `FETCH_HEADERS_TIMEOUT_MS`               | přebírá `FETCH_TIMEOUT_MS`                 | Časový limit Undici pro přijetí hlaviček odpovědi upstreamu                      |
| `FETCH_BODY_TIMEOUT_MS`                  | přebírá `FETCH_TIMEOUT_MS`                 | Časový limit Undici mezi bloky těla odpovědi upstreamu (`0` jej deaktivuje)      |
| `FETCH_CONNECT_TIMEOUT_MS`               | `30000`                                    | Časový limit Undici pro navázání připojení TCP                                   |
| `FETCH_KEEPALIVE_TIMEOUT_MS`             | `4000`                                     | Časový limit Undici pro nečinný socket keep-alive                                |
| `TLS_CLIENT_TIMEOUT_MS`                  | přebírá `FETCH_TIMEOUT_MS`                 | Časový limit pro požadavky na otisk TLS prováděné prostřednictvím `wreq-js`      |
| `API_BRIDGE_PROXY_TIMEOUT_MS`            | přebírá `REQUEST_TIMEOUT_MS` nebo `600000` | Časový limit pro předávání proxy `/v1` z portu API na port řídicího panelu       |
| `API_BRIDGE_SERVER_REQUEST_TIMEOUT_MS`   | `max(API_BRIDGE_PROXY_TIMEOUT_MS, 300000)` | Časový limit příchozího požadavku na serveru API bridge                          |
| `API_BRIDGE_SERVER_HEADERS_TIMEOUT_MS`   | `60000`                                    | Časový limit příchozích hlaviček na serveru API bridge                           |
| `API_BRIDGE_SERVER_KEEPALIVE_TIMEOUT_MS` | `5000`                                     | Časový limit keep-alive na serveru API bridge                                    |
| `API_BRIDGE_SERVER_SOCKET_TIMEOUT_MS`    | `0`                                        | Časový limit nečinnosti socketu na serveru API bridge (`0` jej deaktivuje)       |

> **Poznámka:** U streamovaných požadavků pokrývá `FETCH_TIMEOUT_MS` pouze navázání připojení / čekání na první odpověď upstreamu. Jakmile je stream aktivní, OmniRoute jej přeruší pouze při skutečném výpadku (`STREAM_IDLE_TIMEOUT_MS`) nebo nečinnosti těla podle Undici (`FETCH_BODY_TIMEOUT_MS`).

### Kompatibilita s reverzními proxy

Pokud provozujete OmniRoute za Nginx, Caddy, Cloudflare nebo jinou reverzní proxy, ujistěte se, že časové limity proxy jsou také delší než časové limity streamu/načítání OmniRoute.

---

## Režim oddělených portů

Pro pokročilé scénáře (reverzní proxy, kontejnerové sítě) spusťte API a Dashboard na samostatných portech:

```bash
PORT=20128 DASHBOARD_PORT=20129 omniroute
# API:       http://localhost:20128/v1
# Dashboard: http://localhost:20129
```

---

## Šablona pro Void Linux (xbps-src)

Uživatelé Void Linuxu mohou vytvořit nativní balíček pomocí `xbps-src`. Uložte tento blok jako `srcpkgs/omniroute/template`:

```bash
# Soubor šablony pro 'omniroute'
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
# Pro každé vydání znovu vygenerujte kontrolní součet pomocí:
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

## Odinstalace

| Příkaz                   | Akce                                                                                        |
| ------------------------ | ------------------------------------------------------------------------------------------- |
| `npm run uninstall`      | Odstraní systémovou aplikaci, ale **zachová vaši databázi a konfigurace** v `~/.omniroute`. |
| `npm run uninstall:full` | Odstraní aplikaci A ZÁROVEŇ trvale **vymaže všechny konfigurace, klíče a databáze**.        |

> Podrobné pokyny k odinstalaci pro všechny metody naleznete v souboru [UNINSTALL.md](./UNINSTALL.md).
