# 📖 Setup Guide — OmniRoute (Magyar)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/SETUP_GUIDE.md) · 🇪🇹 [am](../../../am/docs/guides/SETUP_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/guides/SETUP_GUIDE.md) · 🇦🇿 [az](../../../az/docs/guides/SETUP_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/guides/SETUP_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/guides/SETUP_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/guides/SETUP_GUIDE.md) · 🇩🇰 [da](../../../da/docs/guides/SETUP_GUIDE.md) · 🇩🇪 [de](../../../de/docs/guides/SETUP_GUIDE.md) · 🇬🇷 [el](../../../el/docs/guides/SETUP_GUIDE.md) · 🇪🇸 [es](../../../es/docs/guides/SETUP_GUIDE.md) · 🇪🇪 [et](../../../et/docs/guides/SETUP_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/guides/SETUP_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/guides/SETUP_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/guides/SETUP_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/guides/SETUP_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/guides/SETUP_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/guides/SETUP_GUIDE.md) · 🇮🇱 [he](../../../he/docs/guides/SETUP_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/guides/SETUP_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/guides/SETUP_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/guides/SETUP_GUIDE.md) · 🇮🇩 [id](../../../id/docs/guides/SETUP_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/guides/SETUP_GUIDE.md) · 🇮🇹 [it](../../../it/docs/guides/SETUP_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/guides/SETUP_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/guides/SETUP_GUIDE.md) · 🇰🇭 [km](../../../km/docs/guides/SETUP_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/guides/SETUP_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/guides/SETUP_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/guides/SETUP_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/guides/SETUP_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/guides/SETUP_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/guides/SETUP_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/guides/SETUP_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/guides/SETUP_GUIDE.md) · 🇲🇲 [my](../../../my/docs/guides/SETUP_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/guides/SETUP_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/guides/SETUP_GUIDE.md) · 🇳🇴 [no](../../../no/docs/guides/SETUP_GUIDE.md) · 🇮🇳 [or](../../../or/docs/guides/SETUP_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/guides/SETUP_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/guides/SETUP_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/guides/SETUP_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/guides/SETUP_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/SETUP_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/guides/SETUP_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/guides/SETUP_GUIDE.md) · 🇱🇰 [si](../../../si/docs/guides/SETUP_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/guides/SETUP_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/guides/SETUP_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/guides/SETUP_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/guides/SETUP_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/guides/SETUP_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/guides/SETUP_GUIDE.md) · 🇮🇳 [te](../../../te/docs/guides/SETUP_GUIDE.md) · 🇹🇭 [th](../../../th/docs/guides/SETUP_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/guides/SETUP_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/SETUP_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/guides/SETUP_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/guides/SETUP_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/guides/SETUP_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/guides/SETUP_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/SETUP_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/SETUP_GUIDE.md)

---

> Az OmniRoute teljes körű beállítási referenciája. A rövid változatért tekintse meg a [README gyorsútmutatóját](../README.md#-quick-start).

## Tartalomjegyzék

- [Telepítési módszerek](#install-methods)
- [CLI-eszköz konfigurálása](#cli-tool-configuration)
- [Protokoll beállítása (MCP + A2A)](#protocol-setup-mcp--a2a)
- [Időtúllépés konfigurálása](#timeout-configuration)
- [Osztott portos mód](#split-port-mode)
- [Void Linux (xbps-src)](#void-linux-xbps-src-template)
- [Eltávolítás](#uninstalling)

---

## Telepítési módszerek

### npm (ajánlott)

```bash
npm install -g omniroute
omniroute
```

A vezérlőpult a `http://localhost:20128` címen nyílik meg, az API alap-URL-je pedig `http://localhost:20128/v1`.

### pnpm

```bash
pnpm add -g omniroute@latest --allow-build=better-sqlite3 --allow-build=@swc/core
omniroute
```

> **pnpm-felhasználók:** a `--allow-build` kapcsoló szükséges a `better-sqlite3` és az `@swc/core` natív összeállítási szkriptjeinek engedélyezéséhez. A `pnpm approve-builds -g` parancs nem támogatott globális telepítések esetén a pnpm v11 verziójában.

### Arch Linux (AUR)

```bash
yay -S omniroute-bin
systemctl --user enable --now omniroute.service
```

Az [AUR-csomag](https://aur.archlinux.org/packages/omniroute-bin) telepíti az OmniRoute-ot, és egy systemd felhasználói szolgáltatást biztosít.

### Forráskódból

```bash
npm install
PORT=20128 DASHBOARD_PORT=20129 NEXT_PUBLIC_BASE_URL=http://localhost:20129 npm run dev
```

> **Megjegyzés Windows rendszerhez:** Alapértelmezés szerint az OmniRoute a `%APPDATA%\omniroute` könyvtárat használja, ha a korábbi `%USERPROFILE%\.omniroute` könyvtár nem található. Másik adatkönyvtár-hely kiválasztásához állítsa be a `DATA_DIR` értékét.

> **Megjegyzés:** az `npm install` az első futtatáskor automatikusan létrehozza az `.env` fájlt az `.env.example` alapján. A későbbi telepítések nem írják felül a meglévő `.env` fájlt, így az egyéni beállítások megmaradnak. Az újbóli inicializáláshoz törölje az `.env` fájlt az ismételt futtatás előtt.

### Docker

A teljes Docker-beállításhoz, beleértve a Compose-profilokat és a Caddy HTTPS-t, tekintse meg a [Docker-útmutatót](./DOCKER_GUIDE.md).

### Asztali alkalmazás (Electron)

Az OmniRoute egy Electron 41 + electron-builder 26.10 alapú asztali csomagolóalkalmazást is tartalmaz. Elérhető szkriptek (a munkaterület gyökerében):

```bash
npm run electron:dev          # Az asztali alkalmazás futtatása automatikus újratöltéssel
npm run electron:build        # Összeállítás az aktuális operációs rendszerhez (automatikus felismerés)
npm run electron:build:win    # Windows-telepítő (NSIS + hordozható)
npm run electron:build:mac    # macOS (dmg + zip, arm64+x64)
npm run electron:build:linux  # Linux (AppImage + deb + rpm)
npm run electron:smoke:packaged  # A csomagolt összeállítás gyors ellenőrzése
```

Az asztali telepítők kiadásai a GitHub Releases oldalán találhatók. Az Electron részletes ismertetéséért (aláírás, IPC-híd, disztribúciók) tekintse meg az [`ELECTRON_GUIDE.md`](./ELECTRON_GUIDE.md) fájlt _(egy későbbi fázisban létrehozva)_.

### Grafikus felület nélküli kiszolgáló (CI/automatizálás)

Felügyelet nélküli beállításokhoz (Docker, Kubernetes, CI) használja a következőket:

```bash
omniroute setup --non-interactive
omniroute providers test-batch
```

Környezeti változókkal (`INITIAL_PASSWORD`, `OMNIROUTE_WS_BRIDGE_SECRET` stb.) kombinálva ez lehetővé teszi egy teljes mértékben szkriptelhető OmniRoute-példány elindítását.

### CLI-beállítások

| Parancs                 | Leírás                                                                                                      |
| ----------------------- | ----------------------------------------------------------------------------------------------------------- |
| `omniroute`             | A kiszolgáló indítása (`PORT=20128`, az API és a vezérlőpult ugyanazon a porton)                            |
| `omniroute setup`       | Vezetett CLI-kezdőbeállítás a jelszóhoz és az első szolgáltatóhoz                                           |
| `omniroute doctor`      | Helyi állapotellenőrzések futtatása a kiszolgáló elindítása nélkül                                          |
| `omniroute providers`   | Szolgáltatók felderítése, listázása, ellenőrzése és tesztelése a CLI-ből                                    |
| `omniroute config`      | CLI-eszköz konfigurálása — konfigurációk listázása, lekérése, beállítása és ellenőrzése                     |
| `omniroute status`      | Offline állapot-vezérlőpult — verzió, adatbázis, eszközök, konfiguráció                                     |
| `omniroute logs`        | Használati naplók folyamatos olvasása az API-ból (támogatja a `--follow` kapcsolót)                         |
| `omniroute update`      | OmniRoute-frissítések keresése vagy alkalmazása                                                             |
| `omniroute provider`    | Szolgáltatói kapcsolatok kezelése — hozzáadás, listázás, eltávolítás, tesztelés, alapértelmezett beállítása |
| `omniroute --port 3000` | A kanonikus/API-port beállítása 3000 értékre                                                                |
| `omniroute --mcp`       | Az MCP-kiszolgáló indítása (stdio átviteli mód)                                                             |
| `omniroute --no-open`   | A böngésző automatikus megnyitásának letiltása                                                              |
| `omniroute --help`      | Súgó megjelenítése                                                                                          |

A grafikus felület nélküli beállítás kapcsolókkal vagy környezeti változókkal szkriptelhető:

```bash
omniroute setup --non-interactive --password "$OMNIROUTE_PASSWORD"
omniroute setup --non-interactive --add-provider --provider openai --api-key "$OPENAI_API_KEY"
omniroute setup --non-interactive --add-provider --provider openai --api-key "$OPENAI_API_KEY" --test-provider
```

Helyi diagnosztika futtatása a vezérlőpult megnyitása nélkül:

```bash
omniroute doctor
omniroute doctor --json
omniroute doctor --no-liveness
```

Szolgáltatók kezelése SSH-n vagy szkripteken keresztül, a vezérlőpult megnyitása nélkül:

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

## CLI-eszköz konfigurálása

### 1) Szolgáltatók csatlakoztatása és API-kulcs létrehozása

1. Nyissa meg a Vezérlőpult → `Providers` oldalt, és csatlakoztasson legalább egy szolgáltatót (OAuth vagy API-kulcs használatával).
2. Nyissa meg a Vezérlőpult → `Endpoints` oldalt, és hozzon létre egy API-kulcsot.
3. (Opcionális) Nyissa meg a Vezérlőpult → `Combos` oldalt, és állítsa be a tartalék láncot.

### 2) A kódolási eszköz beállítása

```txt
Alap URL: http://localhost:20128/v1
API-kulcs:  [másolja ki az Endpoint oldalról]
Modell:    if/qwen3.8-max-preview (vagy bármely szolgáltató/modell előtag)
```

Ha a szerkesztője nem tud `Authorization: Bearer ...` fejlécet küldeni, használja helyette a tokenizált kompatibilitási alapcímet:

```txt
Alap URL: http://localhost:20128/api/v1/vscode/YOUR_KEY/
Modellek URL-je: http://localhost:20128/api/v1/vscode/YOUR_KEY/models
Csevegés URL-je: http://localhost:20128/api/v1/vscode/YOUR_KEY/chat/completions
Ollama-címkék URL-je: http://localhost:20128/api/v1/vscode/YOUR_KEY/api/tags
```

Működik a Claude Code, Codex CLI, Cursor, Cline, OpenClaw, OpenCode és az OpenAI-kompatibilis SDK-k használatával.

#### Automatikus konfigurálás a `setup-*` parancsokkal

Az alap URL és a kulcs kézi beillesztése helyett hagyja, hogy az OmniRoute az élő modellkatalógusból írja be az egyes eszközök
saját konfigurációját. Eszközönként egy parancs:

```bash
omniroute setup-codex        # ~/.codex/<name>.config.toml profilok
omniroute setup-claude       # ~/.claude/profiles/<name>/settings.json
omniroute setup-opencode     # ~/.config/opencode/opencode.json (OpenAI-kompatibilis)
omniroute setup-cline        # Cline CLI + VS Code-bővítmény beállításai
omniroute setup-kilo         # Kilo Code
omniroute setup-continue     # ~/.continue/config.yaml (Continue / cn)
omniroute setup-cursor       # kiírja a Cursor alkalmazáson belüli lépéseit
omniroute setup-roo          # Roo Code-importálás + autoImport-mutató
omniroute setup-crush        # ~/.config/crush/crush.json
omniroute setup-goose        # ~/.config/goose/config.yaml
omniroute setup-aider        # ~/.aider.conf.yml
omniroute setup-qwen         # ~/.qwen/settings.json + ~/.qwen/.env
```

Mindegyik támogatja a `--remote <url> --api-key <key>` kapcsolókat, amelyekkel egy helyi eszköz konfigurálható egy
**távoli** OmniRoute használatára, valamint a `--dry-run` kapcsolót az előnézethez. Ha egy CLI-t a megfelelő
környezeti változók átadásával, konfiguráció írása nélkül szeretne elindítani, használja az általános
`omniroute run <target>` indítót (claude, codex, aider, goose, opencode, qwen, gemini);
a korábbi, eszközspecifikus `omniroute launch` (Claude Code) és
`omniroute launch-codex` (Codex) indítók továbbra is elérhetők.

A teljes táblázatért (az egyes parancsok által írt fájlok, minden kapcsoló, helyi és távoli használat, valamint az alap URL
`/v1` konvenciói) tekintse meg a **[CLI-integrációk](./CLI-INTEGRATIONS.md)** dokumentumot.

Az eszközönkénti részletes konfigurációért (Claude Code, Codex CLI, Cursor, Cline, OpenClaw, Kilo Code, Copilot és továbbiak) tekintse meg a különálló **[CLI-eszközök útmutatóját](../reference/CLI-TOOLS.md)**.

---

## Protokollbeállítás (MCP + A2A)

### MCP beállítása (Model Context Protocol)

Indítsa el az MCP-átvitelt stdio módban:

```bash
omniroute --mcp
```

Ajánlott ellenőrzési folyamat:

```bash
# 1. Indítsa el az MCP-kiszolgálót
omniroute --mcp

# 2. Az MCP-kliensből hívja meg a következőket:
omniroute_get_health        # A rendszer állapotát kell visszaadnia
omniroute_list_combos       # Az aktív kombinációkat kell visszaadnia

# 3. Vagy futtassa a teljes E2E tesztcsomagot:
npm run test:protocols:e2e
```

#### MCP-kliens konfigurálása

**Claude Code:**

```bash
claude mcp add-server omniroute --type http --url http://localhost:20128/api/mcp/stream
```

**Cursor / Cline:**

Adja hozzá az MCP-beállításokhoz:

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

**Teljes MCP-dokumentáció:** [MCP Server README](../../open-sse/mcp-server/README.md) — 110 eszköz, IDE-konfigurációk, Python/TS/Go kliensek.

### A2A beállítása (ügynökök közötti protokoll)

Ellenőrizze az ügynökkártyát:

```bash
curl http://localhost:20128/.well-known/agent.json
```

Küldjön egy feladatot:

```bash
curl -X POST http://localhost:20128/a2a \
  -H 'content-type: application/json' \
  -d '{"jsonrpc":"2.0","id":"quickstart","method":"message/send","params":{"skill":"quota-management","messages":[{"role":"user","content":"Give me a short quota summary."}]}}'
```

**Teljes A2A-dokumentáció:** [A2A Server README](../../src/lib/a2a/README.md) — JSON-RPC 2.0, képességek, streamelés, feladat-életciklus.

---

## Időtúllépési konfiguráció

### Alapvető időtúllépések

A legtöbb telepítésnél csak erre a két változóra van szükség:

| Változó                  | Alapértelmezett érték                 | Rendeltetés                                                                                                                                                                              |
| ------------------------ | ------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `REQUEST_TIMEOUT_MS`     | `600000`                              | Közös alapérték a külső szolgáltató válaszkezdési időtúllépéséhez, a rejtett Undici-időtúllépésekhez, a TLS-ujjlenyomat-kérésekhez, valamint az API-híd kérés- és proxy-időtúllépéseihez |
| `STREAM_IDLE_TIMEOUT_MS` | örökli a `REQUEST_TIMEOUT_MS` értékét | A streamelési adatblokkok közötti maximális időköz, amelynek letelte után az OmniRoute megszakítja az SSE-adatfolyamot                                                                   |

A visszamenőleges kompatibilitás megmarad: a meglévő `FETCH_TIMEOUT_MS`, `API_BRIDGE_PROXY_TIMEOUT_MS` és más, rétegenkénti időtúllépési változók továbbra is működnek, és felülírják a közös alapértéket.

### Szolgáltatóspecifikus megjegyzések

A Claude Code-kompatibilis külső szolgáltatók (`anthropic-compatible-cc-*`) esetében az OmniRoute a feloldott lekérési időtúllépésből származtatja a kimenő `X-Stainless-Timeout` fejlécet, így a szolgáltatói oldali olvasási időtúllépések összhangban maradnak a környezeti konfigurációval.

Harmadik féltől származó, Claude Code-kompatibilis fordított proxyk esetén az OmniRoute konzervatív értéken tartja az alapértelmezett `anthropic-beta` beállítást, és ha a `Client Cache Control` értéke `Auto` marad, csak a kliens által megadott `cache_control` jelölőket továbbítja. Kapcsolatonként csak akkor engedélyezze az „Enable redact-thinking beta” kapcsolót, ha a külső szolgáltató kifejezetten megköveteli a kitakart Claude-gondolatmeneti adatfolyamokat.

### Speciális időtúllépés-felülbírálások

| Változó                                  | Alapértelmezett érték                                | Rendeltetés                                                                                   |
| ---------------------------------------- | ---------------------------------------------------- | --------------------------------------------------------------------------------------------- |
| `FETCH_TIMEOUT_MS`                       | örökli a `REQUEST_TIMEOUT_MS` értékét                | A külső szolgáltató válaszkezdési időtúllépése, amely a válaszfejlécek megérkezéséig érvényes |
| `FETCH_HEADERS_TIMEOUT_MS`               | örökli a `FETCH_TIMEOUT_MS` értékét                  | Az Undici időkorlátja a külső szolgáltató válaszfejléceinek fogadására                        |
| `FETCH_BODY_TIMEOUT_MS`                  | örökli a `FETCH_TIMEOUT_MS` értékét                  | Az Undici időkorlátja a külső szolgáltatótól érkező törzsadatblokkok között (a `0` letiltja)  |
| `FETCH_CONNECT_TIMEOUT_MS`               | `30000`                                              | Az Undici TCP-kapcsolódási időtúllépése                                                       |
| `FETCH_KEEPALIVE_TIMEOUT_MS`             | `4000`                                               | Az Undici inaktív keep-alive socketjének időtúllépése                                         |
| `TLS_CLIENT_TIMEOUT_MS`                  | örökli a `FETCH_TIMEOUT_MS` értékét                  | A `wreq-js` használatával végrehajtott TLS-ujjlenyomat-kérések időtúllépése                   |
| `API_BRIDGE_PROXY_TIMEOUT_MS`            | örökli a `REQUEST_TIMEOUT_MS` értékét, vagy `600000` | Az API-portról az irányítópult portjára történő `/v1` proxytovábbítás időtúllépése            |
| `API_BRIDGE_SERVER_REQUEST_TIMEOUT_MS`   | `max(API_BRIDGE_PROXY_TIMEOUT_MS, 300000)`           | Az API-híd kiszolgálójára beérkező kérések időtúllépése                                       |
| `API_BRIDGE_SERVER_HEADERS_TIMEOUT_MS`   | `60000`                                              | A beérkező fejlécek időtúllépése az API-híd kiszolgálóján                                     |
| `API_BRIDGE_SERVER_KEEPALIVE_TIMEOUT_MS` | `5000`                                               | Keep-alive időtúllépés az API-híd kiszolgálóján                                               |
| `API_BRIDGE_SERVER_SOCKET_TIMEOUT_MS`    | `0`                                                  | A socket inaktivitási időtúllépése az API-híd kiszolgálóján (a `0` letiltja)                  |

> **Megjegyzés:** Streamelési kérések esetén a `FETCH_TIMEOUT_MS` csak a kapcsolat létrehozására, illetve a külső szolgáltató első válaszára való várakozásra vonatkozik. Amint az adatfolyam aktívvá válik, az OmniRoute csak tényleges elakadás (`STREAM_IDLE_TIMEOUT_MS`) vagy az Undici törzsadat-inaktivitása (`FETCH_BODY_TIMEOUT_MS`) esetén szakítja meg.

### Fordított proxykkal való kompatibilitás

Ha az OmniRoute-ot Nginx, Caddy, Cloudflare vagy más fordított proxy mögött futtatja, győződjön meg arról, hogy a proxy időtúllépései is hosszabbak az OmniRoute adatfolyam-/lekérési időtúllépéseinél.

---

## Osztott portos mód

Haladó használati esetekhez (fordított proxy, konténerhálózatok) futtassa az API-t és az irányítópultot külön portokon:

```bash
PORT=20128 DASHBOARD_PORT=20129 omniroute
# API:         http://localhost:20128/v1
# Irányítópult: http://localhost:20129
```

---

## Void Linux (xbps-src) sablon

A Void Linux felhasználói az `xbps-src` használatával natív csomagot készíthetnek. Mentse ezt a blokkot `srcpkgs/omniroute/template` néven:

```bash
# Sablonfájl az „omniroute” csomaghoz
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
# Minden kiadáshoz generálja újra az ellenőrző összeget a következő paranccsal:
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

## Eltávolítás

| Parancs                  | Művelet                                                                                                            |
| ------------------------ | ------------------------------------------------------------------------------------------------------------------ |
| `npm run uninstall`      | Eltávolítja a rendszeralkalmazást, de **megőrzi az adatbázist és a konfigurációkat** a `~/.omniroute` könyvtárban. |
| `npm run uninstall:full` | Eltávolítja az alkalmazást, ÉS véglegesen **törli az összes konfigurációt, kulcsot és adatbázist**.                |

> Az összes módszer részletes eltávolítási utasításaiért tekintse meg az [UNINSTALL.md](./UNINSTALL.md) fájlt.
