# 📖 Setup Guide — OmniRoute (Filipino)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/SETUP_GUIDE.md) · 🇪🇹 [am](../../../am/docs/guides/SETUP_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/guides/SETUP_GUIDE.md) · 🇦🇿 [az](../../../az/docs/guides/SETUP_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/guides/SETUP_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/guides/SETUP_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/guides/SETUP_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/guides/SETUP_GUIDE.md) · 🇩🇰 [da](../../../da/docs/guides/SETUP_GUIDE.md) · 🇩🇪 [de](../../../de/docs/guides/SETUP_GUIDE.md) · 🇬🇷 [el](../../../el/docs/guides/SETUP_GUIDE.md) · 🇪🇸 [es](../../../es/docs/guides/SETUP_GUIDE.md) · 🇪🇪 [et](../../../et/docs/guides/SETUP_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/guides/SETUP_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/guides/SETUP_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/guides/SETUP_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/guides/SETUP_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/guides/SETUP_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/guides/SETUP_GUIDE.md) · 🇮🇱 [he](../../../he/docs/guides/SETUP_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/guides/SETUP_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/guides/SETUP_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/guides/SETUP_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/guides/SETUP_GUIDE.md) · 🇮🇩 [id](../../../id/docs/guides/SETUP_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/guides/SETUP_GUIDE.md) · 🇮🇹 [it](../../../it/docs/guides/SETUP_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/guides/SETUP_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/guides/SETUP_GUIDE.md) · 🇰🇭 [km](../../../km/docs/guides/SETUP_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/guides/SETUP_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/guides/SETUP_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/guides/SETUP_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/guides/SETUP_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/guides/SETUP_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/guides/SETUP_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/guides/SETUP_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/guides/SETUP_GUIDE.md) · 🇲🇲 [my](../../../my/docs/guides/SETUP_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/guides/SETUP_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/guides/SETUP_GUIDE.md) · 🇳🇴 [no](../../../no/docs/guides/SETUP_GUIDE.md) · 🇮🇳 [or](../../../or/docs/guides/SETUP_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/guides/SETUP_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/guides/SETUP_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/guides/SETUP_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/SETUP_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/guides/SETUP_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/guides/SETUP_GUIDE.md) · 🇱🇰 [si](../../../si/docs/guides/SETUP_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/guides/SETUP_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/guides/SETUP_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/guides/SETUP_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/guides/SETUP_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/guides/SETUP_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/guides/SETUP_GUIDE.md) · 🇮🇳 [te](../../../te/docs/guides/SETUP_GUIDE.md) · 🇹🇭 [th](../../../th/docs/guides/SETUP_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/guides/SETUP_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/SETUP_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/guides/SETUP_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/guides/SETUP_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/guides/SETUP_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/guides/SETUP_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/SETUP_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/SETUP_GUIDE.md)

---

> Kumpletong sanggunian sa pag-setup ng OmniRoute. Para sa mabilisang bersyon, tingnan ang [Mabilisang Pagsisimula sa README](../README.md#-quick-start).

## Talaan ng mga Nilalaman

- [Mga Paraan ng Pag-install](#install-methods)
- [Configuration ng CLI Tool](#cli-tool-configuration)
- [Pag-setup ng Protocol (MCP + A2A)](#protocol-setup-mcp--a2a)
- [Configuration ng Timeout](#timeout-configuration)
- [Split-Port Mode](#split-port-mode)
- [Void Linux (xbps-src)](#void-linux-xbps-src-template)
- [Pag-uninstall](#uninstalling)

---

## Mga Paraan ng Pag-install

### npm (inirerekomenda)

```bash
npm install -g omniroute
omniroute
```

Magbubukas ang dashboard sa `http://localhost:20128` at ang base URL ng API ay `http://localhost:20128/v1`.

### pnpm

```bash
pnpm add -g omniroute@latest --allow-build=better-sqlite3 --allow-build=@swc/core
omniroute
```

> **Mga gumagamit ng pnpm:** kinakailangan ang flag na `--allow-build` upang paganahin ang mga native build script para sa `better-sqlite3` at `@swc/core`. Hindi sinusuportahan ang command na `pnpm approve-builds -g` para sa mga global install sa pnpm v11.

### Arch Linux (AUR)

```bash
yay -S omniroute-bin
systemctl --user enable --now omniroute.service
```

Ini-install ng [AUR package](https://aur.archlinux.org/packages/omniroute-bin) ang OmniRoute at nagbibigay ito ng systemd user service.

### Mula sa Source

```bash
npm install
PORT=20128 DASHBOARD_PORT=20129 NEXT_PUBLIC_BASE_URL=http://localhost:20129 npm run dev
```

> **Paalala para sa Windows:** Bilang default, ginagamit ng OmniRoute ang `%APPDATA%\omniroute` kapag wala ang legacy na directory na `%USERPROFILE%\.omniroute`. Itakda ang `DATA_DIR` upang pumili ng ibang lokasyon ng data directory.

> **Paalala:** Awtomatikong binubuo ng `npm install` ang `.env` mula sa `.env.example` sa unang pagpapatakbo. Hindi papalitan ng mga susunod na pag-install ang umiiral na `.env`, kaya mapapanatili ang mga customization. Upang muling buuin ito mula sa panimulang configuration, burahin ang `.env` bago muling patakbuhin.

### Docker

Tingnan ang [Gabay sa Docker](./DOCKER_GUIDE.md) para sa kumpletong pag-setup ng Docker, kabilang ang mga Compose profile at Caddy HTTPS.

### Desktop App (Electron)

May kasamang desktop wrapper ang OmniRoute na binuo gamit ang Electron 41 + electron-builder 26.10. Mga available na script (workspace root):

```bash
npm run electron:dev          # Patakbuhin ang desktop gamit ang hot-reload
npm run electron:build        # Bumuo para sa kasalukuyang OS (awtomatikong natutukoy)
npm run electron:build:win    # Windows installer (NSIS + portable)
npm run electron:build:mac    # macOS (dmg + zip, arm64+x64)
npm run electron:build:linux  # Linux (AppImage + deb + rpm)
npm run electron:smoke:packaged  # Smoke test sa naka-package na build
```

Naka-attach sa GitHub Releases ang mga release ng mga desktop installer. Para sa buong detalyadong gabay sa Electron (signing, IPC bridge, mga distro), tingnan ang [`ELECTRON_GUIDE.md`](./ELECTRON_GUIDE.md) _(ginawa sa susunod na yugto)_.

### Headless server (CI/automation)

Para sa mga setup na walang interbensyon ng user (Docker, Kubernetes, CI), gamitin ang:

```bash
omniroute setup --non-interactive
omniroute providers test-batch
```

Kapag isinama sa mga env var (`INITIAL_PASSWORD`, `OMNIROUTE_WS_BRIDGE_SECRET`, atbp.), maaari kang magpatakbo ng instance ng OmniRoute na ganap na makokontrol sa pamamagitan ng mga script.

### Mga Opsyon sa CLI

| Command                 | Paglalarawan                                                                                           |
| ----------------------- | ------------------------------------------------------------------------------------------------------ |
| `omniroute`             | Simulan ang server (`PORT=20128`, API at dashboard sa iisang port)                                     |
| `omniroute setup`       | Ginabayang CLI onboarding para sa password at unang provider                                           |
| `omniroute doctor`      | Magpatakbo ng mga lokal na health check nang hindi sinisimulan ang server                              |
| `omniroute providers`   | Tumuklas, maglista, mag-validate, at sumubok ng mga provider mula sa CLI                               |
| `omniroute config`      | Configuration ng CLI tool — maglista, kumuha, magtakda, mag-validate ng config                         |
| `omniroute status`      | Offline na status dashboard — bersyon, DB, mga tool, config                                            |
| `omniroute logs`        | Mag-stream ng mga usage log mula sa API (sinusuportahan ang `--follow`)                                |
| `omniroute update`      | Tingnan o ilapat ang mga update ng OmniRoute                                                           |
| `omniroute provider`    | Pamahalaan ang mga koneksyon sa provider — magdagdag, maglista, mag-alis, sumubok, magtakda ng default |
| `omniroute --port 3000` | Itakda sa 3000 ang canonical/API port                                                                  |
| `omniroute --mcp`       | Simulan ang MCP server (stdio transport)                                                               |
| `omniroute --no-open`   | Huwag awtomatikong buksan ang browser                                                                  |
| `omniroute --help`      | Ipakita ang tulong                                                                                     |

Maaaring i-script ang headless setup gamit ang mga flag o environment variable:

```bash
omniroute setup --non-interactive --password "$OMNIROUTE_PASSWORD"
omniroute setup --non-interactive --add-provider --provider openai --api-key "$OPENAI_API_KEY"
omniroute setup --non-interactive --add-provider --provider openai --api-key "$OPENAI_API_KEY" --test-provider
```

Magpatakbo ng mga lokal na diagnostic nang hindi binubuksan ang dashboard:

```bash
omniroute doctor
omniroute doctor --json
omniroute doctor --no-liveness
```

Pamahalaan ang mga provider mula sa SSH o mga script nang hindi binubuksan ang dashboard:

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

## Configuration ng CLI Tool

### 1) Ikonekta ang mga Provider at Gumawa ng API Key

1. Buksan ang Dashboard → `Providers` at magkonekta ng kahit isang provider (OAuth o API key).
2. Buksan ang Dashboard → `Endpoints` at gumawa ng API key.
3. (Opsyonal) Buksan ang Dashboard → `Combos` at itakda ang iyong fallback chain.

### 2) Ituro ang Iyong Coding Tool

```txt
Base URL: http://localhost:20128/v1
API Key:  [kopyahin mula sa pahina ng Endpoint]
Model:    if/qwen3.8-max-preview (o anumang prefix ng provider/model)
```

Kung hindi maipadala ng iyong editor ang `Authorization: Bearer ...`, gamitin sa halip ang tokenized compatibility base:

```txt
Base URL: http://localhost:20128/api/v1/vscode/YOUR_KEY/
Models URL: http://localhost:20128/api/v1/vscode/YOUR_KEY/models
Chat URL: http://localhost:20128/api/v1/vscode/YOUR_KEY/chat/completions
Ollama Tags URL: http://localhost:20128/api/v1/vscode/YOUR_KEY/api/tags
```

Gumagana sa Claude Code, Codex CLI, Cursor, Cline, OpenClaw, OpenCode, at mga SDK na compatible sa OpenAI.

#### Awtomatikong i-configure gamit ang `setup-*`

Sa halip na manu-manong i-paste ang base URL at key, hayaang isulat ng OmniRoute ang sariling
config ng bawat tool mula sa live model catalog. Isang command bawat tool:

```bash
omniroute setup-codex        # Mga profile sa ~/.codex/<name>.config.toml
omniroute setup-claude       # ~/.claude/profiles/<name>/settings.json
omniroute setup-opencode     # ~/.config/opencode/opencode.json (compatible sa OpenAI)
omniroute setup-cline        # Mga setting ng Cline CLI + VS Code extension
omniroute setup-kilo         # Kilo Code
omniroute setup-continue     # ~/.continue/config.yaml (Continue / cn)
omniroute setup-cursor       # Ipinapakita ang mga hakbang sa loob ng app ng Cursor
omniroute setup-roo          # Import ng Roo Code + autoImport pointer
omniroute setup-crush        # ~/.config/crush/crush.json
omniroute setup-goose        # ~/.config/goose/config.yaml
omniroute setup-aider        # ~/.aider.conf.yml
omniroute setup-qwen         # ~/.qwen/settings.json + ~/.qwen/.env
```

Tinatanggap ng bawat isa ang `--remote <url> --api-key <key>` upang mag-configure ng lokal na tool para sa isang
**remote** na OmniRoute, pati na rin ang `--dry-run` para sa preview. Upang maglunsad ng CLI na may tamang
env na naka-inject nang walang anumang isinusulat na config, gamitin ang generic launcher na
`omniroute run <target>` (claude, codex, aider, goose, opencode, qwen, gemini);
patuloy na magagamit ang mga legacy na per-tool launcher na `omniroute launch` (Claude Code) at
`omniroute launch-codex` (Codex).

Para sa kumpletong talahanayan (kung ano ang isinusulat ng bawat command, lahat ng flag, lokal kumpara sa remote, mga convention ng base-URL
na `/v1`), tingnan ang **[Mga Integrasyon ng CLI](./CLI-INTEGRATIONS.md)**.

Para sa detalyadong configuration ng bawat tool (Claude Code, Codex CLI, Cursor, Cline, OpenClaw, Kilo Code, Copilot, at iba pa), tingnan ang nakalaang **[Gabay sa mga CLI Tool](../reference/CLI-TOOLS.md)**.

---

## Pag-setup ng Protocol (MCP + A2A)

### Pag-setup ng MCP (Model Context Protocol)

Simulan ang MCP transport sa stdio mode:

```bash
omniroute --mcp
```

Inirerekomendang daloy ng validation:

```bash
# 1. Simulan ang MCP server
omniroute --mcp

# 2. Mula sa iyong MCP client, tawagin ang:
omniroute_get_health        # Dapat ibalik ang kalagayan ng system
omniroute_list_combos       # Dapat ibalik ang mga aktibong combo

# 3. O patakbuhin ang kumpletong E2E suite:
npm run test:protocols:e2e
```

#### Configuration ng MCP Client

**Claude Code:**

```bash
claude mcp add-server omniroute --type http --url http://localhost:20128/api/mcp/stream
```

**Cursor / Cline:**

Idagdag sa iyong mga setting ng MCP:

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

**Kumpletong dokumentasyon ng MCP:** [README ng MCP Server](../../open-sse/mcp-server/README.md) — 110 tool, mga config ng IDE, at mga Python/TS/Go client.

### Pag-setup ng A2A (Agent-to-Agent Protocol)

I-verify ang Agent Card:

```bash
curl http://localhost:20128/.well-known/agent.json
```

Magpadala ng gawain:

```bash
curl -X POST http://localhost:20128/a2a \
  -H 'content-type: application/json' \
  -d '{"jsonrpc":"2.0","id":"quickstart","method":"message/send","params":{"skill":"quota-management","messages":[{"role":"user","content":"Bigyan ako ng maikling buod ng quota."}]}}'
```

**Kumpletong dokumentasyon ng A2A:** [README ng A2A Server](../../src/lib/a2a/README.md) — JSON-RPC 2.0, mga skill, streaming, at lifecycle ng gawain.

---

## Configuration ng Timeout

### Mga Pangunahing Timeout

Para sa karamihan ng deployment, dalawang variable lang na ito ang kailangan mo:

| Variable                 | Default                           | Layunin                                                                                                                                                                                          |
| ------------------------ | --------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `REQUEST_TIMEOUT_MS`     | `600000`                          | Pinagsasaluhang baseline para sa timeout ng pagsisimula ng upstream response, mga nakatagong Undici timeout, mga kahilingan sa TLS fingerprint, at mga timeout ng kahilingan/proxy ng API bridge |
| `STREAM_IDLE_TIMEOUT_MS` | minamana ang `REQUEST_TIMEOUT_MS` | Pinakamahabang pagitan ng mga streaming chunk bago ihinto ng OmniRoute ang SSE stream                                                                                                            |

Pinananatili ang backward compatibility: gumagana pa rin ang umiiral na `FETCH_TIMEOUT_MS`, `API_BRIDGE_PROXY_TIMEOUT_MS`, at iba pang timeout variable sa bawat layer at ino-override ng mga ito ang pinagsasaluhang baseline.

### Mga Tala na Partikular sa Provider

Para sa mga upstream na compatible sa Claude Code (`anthropic-compatible-cc-*`), kinukuha ng OmniRoute ang outbound na `X-Stainless-Timeout` header mula sa nalutas na fetch timeout upang manatiling nakaayon ang mga read timeout sa panig ng provider sa iyong configuration ng environment.

Para sa mga third-party reverse proxy na compatible sa Claude Code, pinananatiling konserbatibo ng OmniRoute ang default na hanay ng `anthropic-beta` at, kapag nananatiling `Auto` ang `Client Cache Control`, ang mga `cache_control` marker lang na ibinigay ng client ang ipinapasa. I-enable lang ang toggle na "Enable redact-thinking beta" para sa bawat koneksyon kapag partikular na kinakailangan ng upstream ang mga na-redact na thinking stream ng Claude.

### Mga Advanced na Override ng Timeout

| Variable                                 | Default                                      | Layunin                                                                                               |
| ---------------------------------------- | -------------------------------------------- | ----------------------------------------------------------------------------------------------------- |
| `FETCH_TIMEOUT_MS`                       | minamana ang `REQUEST_TIMEOUT_MS`            | Timeout ng pagsisimula ng upstream response na ginagamit hanggang sa dumating ang mga response header |
| `FETCH_HEADERS_TIMEOUT_MS`               | minamana ang `FETCH_TIMEOUT_MS`              | Limitasyon ng oras ng Undici para matanggap ang mga upstream response header                          |
| `FETCH_BODY_TIMEOUT_MS`                  | minamana ang `FETCH_TIMEOUT_MS`              | Limitasyon ng oras ng Undici sa pagitan ng mga upstream body chunk (`0` ay nagdi-disable nito)        |
| `FETCH_CONNECT_TIMEOUT_MS`               | `30000`                                      | Timeout ng koneksyon sa TCP ng Undici                                                                 |
| `FETCH_KEEPALIVE_TIMEOUT_MS`             | `4000`                                       | Timeout ng idle keep-alive socket ng Undici                                                           |
| `TLS_CLIENT_TIMEOUT_MS`                  | minamana ang `FETCH_TIMEOUT_MS`              | Timeout para sa mga kahilingan sa TLS fingerprint na ginawa sa pamamagitan ng `wreq-js`               |
| `API_BRIDGE_PROXY_TIMEOUT_MS`            | minamana ang `REQUEST_TIMEOUT_MS` o `600000` | Timeout para sa `/v1` proxy forwarding mula sa API port patungo sa dashboard port                     |
| `API_BRIDGE_SERVER_REQUEST_TIMEOUT_MS`   | `max(API_BRIDGE_PROXY_TIMEOUT_MS, 300000)`   | Timeout ng papasok na kahilingan sa API bridge server                                                 |
| `API_BRIDGE_SERVER_HEADERS_TIMEOUT_MS`   | `60000`                                      | Timeout ng papasok na header sa API bridge server                                                     |
| `API_BRIDGE_SERVER_KEEPALIVE_TIMEOUT_MS` | `5000`                                       | Keep-alive timeout sa API bridge server                                                               |
| `API_BRIDGE_SERVER_SOCKET_TIMEOUT_MS`    | `0`                                          | Timeout ng kawalan ng aktibidad ng socket sa API bridge server (`0` ay nagdi-disable nito)            |

> **Tandaan:** Para sa mga streaming request, saklaw lang ng `FETCH_TIMEOUT_MS` ang pag-set up ng koneksyon / paghihintay sa unang upstream response. Kapag aktibo na ang stream, ihihinto lang ito ng OmniRoute kapag may aktuwal na pagtigil (`STREAM_IDLE_TIMEOUT_MS`) o kawalan ng aktibidad ng Undici body (`FETCH_BODY_TIMEOUT_MS`).

### Compatibility sa Reverse Proxy

Kung pinapatakbo mo ang OmniRoute sa likod ng Nginx, Caddy, Cloudflare, o iba pang reverse proxy, tiyaking mas mataas din ang mga timeout ng proxy kaysa sa mga stream/fetch timeout ng OmniRoute.

---

## Split-Port Mode

Patakbuhin ang API at Dashboard sa magkahiwalay na port para sa mga advanced na sitwasyon (reverse proxy, container networking):

```bash
PORT=20128 DASHBOARD_PORT=20129 omniroute
# API:       http://localhost:20128/v1
# Dashboard: http://localhost:20129
```

---

## Template para sa Void Linux (xbps-src)

Para sa mga gumagamit ng Void Linux, maaari kang bumuo ng native package gamit ang `xbps-src`. I-save ang block na ito bilang `srcpkgs/omniroute/template`:

```bash
# Template file para sa 'omniroute'
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
# Muling buuin ang checksum para sa bawat release gamit ang:
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

## Pag-uninstall

| Command                  | Aksyon                                                                                              |
| ------------------------ | --------------------------------------------------------------------------------------------------- |
| `npm run uninstall`      | Inaalis ang system app ngunit **pinapanatili ang iyong DB at mga configuration** sa `~/.omniroute`. |
| `npm run uninstall:full` | Inaalis ang app AT permanenteng **binubura ang lahat ng configuration, key, at database**.          |

> Para sa detalyadong mga tagubilin sa pag-uninstall para sa lahat ng paraan, tingnan ang [UNINSTALL.md](./UNINSTALL.md).
