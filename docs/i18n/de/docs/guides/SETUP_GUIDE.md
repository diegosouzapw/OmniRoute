# 📖 Setup Guide — OmniRoute (Deutsch)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/SETUP_GUIDE.md) · 🇪🇹 [am](../../../am/docs/guides/SETUP_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/guides/SETUP_GUIDE.md) · 🇦🇿 [az](../../../az/docs/guides/SETUP_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/guides/SETUP_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/guides/SETUP_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/guides/SETUP_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/guides/SETUP_GUIDE.md) · 🇩🇰 [da](../../../da/docs/guides/SETUP_GUIDE.md) · 🇬🇷 [el](../../../el/docs/guides/SETUP_GUIDE.md) · 🇪🇸 [es](../../../es/docs/guides/SETUP_GUIDE.md) · 🇪🇪 [et](../../../et/docs/guides/SETUP_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/guides/SETUP_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/guides/SETUP_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/guides/SETUP_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/guides/SETUP_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/guides/SETUP_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/guides/SETUP_GUIDE.md) · 🇮🇱 [he](../../../he/docs/guides/SETUP_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/guides/SETUP_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/guides/SETUP_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/guides/SETUP_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/guides/SETUP_GUIDE.md) · 🇮🇩 [id](../../../id/docs/guides/SETUP_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/guides/SETUP_GUIDE.md) · 🇮🇹 [it](../../../it/docs/guides/SETUP_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/guides/SETUP_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/guides/SETUP_GUIDE.md) · 🇰🇭 [km](../../../km/docs/guides/SETUP_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/guides/SETUP_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/guides/SETUP_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/guides/SETUP_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/guides/SETUP_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/guides/SETUP_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/guides/SETUP_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/guides/SETUP_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/guides/SETUP_GUIDE.md) · 🇲🇲 [my](../../../my/docs/guides/SETUP_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/guides/SETUP_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/guides/SETUP_GUIDE.md) · 🇳🇴 [no](../../../no/docs/guides/SETUP_GUIDE.md) · 🇮🇳 [or](../../../or/docs/guides/SETUP_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/guides/SETUP_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/guides/SETUP_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/guides/SETUP_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/guides/SETUP_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/SETUP_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/guides/SETUP_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/guides/SETUP_GUIDE.md) · 🇱🇰 [si](../../../si/docs/guides/SETUP_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/guides/SETUP_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/guides/SETUP_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/guides/SETUP_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/guides/SETUP_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/guides/SETUP_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/guides/SETUP_GUIDE.md) · 🇮🇳 [te](../../../te/docs/guides/SETUP_GUIDE.md) · 🇹🇭 [th](../../../th/docs/guides/SETUP_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/guides/SETUP_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/SETUP_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/guides/SETUP_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/guides/SETUP_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/guides/SETUP_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/guides/SETUP_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/SETUP_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/SETUP_GUIDE.md)

---

> Vollständige Einrichtungsreferenz für OmniRoute. Eine Kurzfassung finden Sie im [Schnellstart in der README](../README.md#-quick-start).

## Inhaltsverzeichnis

- [Installationsmethoden](#install-methods)
- [Konfiguration der CLI-Tools](#cli-tool-configuration)
- [Protokolleinrichtung (MCP + A2A)](#protocol-setup-mcp--a2a)
- [Timeout-Konfiguration](#timeout-configuration)
- [Modus mit getrennten Ports](#split-port-mode)
- [Void Linux (xbps-src)](#void-linux-xbps-src-template)
- [Deinstallation](#uninstalling)

---

## Installationsmethoden

### npm (empfohlen)

```bash
npm install -g omniroute
omniroute
```

Das Dashboard wird unter `http://localhost:20128` geöffnet, und die Basis-URL der API lautet `http://localhost:20128/v1`.

### pnpm

```bash
pnpm add -g omniroute@latest --allow-build=better-sqlite3 --allow-build=@swc/core
omniroute
```

> **Hinweis für pnpm-Benutzer:** Das Flag `--allow-build` ist erforderlich, um native Build-Skripte für `better-sqlite3` und `@swc/core` zu aktivieren. Der Befehl `pnpm approve-builds -g` wird unter pnpm v11 für globale Installationen nicht unterstützt.

### Arch Linux (AUR)

```bash
yay -S omniroute-bin
systemctl --user enable --now omniroute.service
```

Das [AUR-Paket](https://aur.archlinux.org/packages/omniroute-bin) installiert OmniRoute und stellt einen systemd-Benutzerdienst bereit.

### Aus dem Quellcode

```bash
npm install
PORT=20128 DASHBOARD_PORT=20129 NEXT_PUBLIC_BASE_URL=http://localhost:20129 npm run dev
```

> **Hinweis für Windows:** Standardmäßig verwendet OmniRoute `%APPDATA%\omniroute`, wenn das veraltete Verzeichnis `%USERPROFILE%\.omniroute` nicht vorhanden ist. Legen Sie `DATA_DIR` fest, um einen anderen Speicherort für das Datenverzeichnis auszuwählen.

> **Hinweis:** `npm install` generiert beim ersten Ausführen automatisch `.env` aus `.env.example`. Bei späteren Installationen wird eine vorhandene `.env` nicht überschrieben, sodass Anpassungen erhalten bleiben. Um sie neu zu erstellen, löschen Sie `.env`, bevor Sie den Befehl erneut ausführen.

### Docker

Eine vollständige Docker-Einrichtung einschließlich Compose-Profilen und Caddy HTTPS finden Sie im [Docker-Leitfaden](./DOCKER_GUIDE.md).

### Desktop-App (Electron)

OmniRoute enthält einen Desktop-Wrapper, der auf Electron 41 + electron-builder 26.10 basiert. Verfügbare Skripte (Workspace-Stammverzeichnis):

```bash
npm run electron:dev          # Desktop-App mit Hot-Reload ausführen
npm run electron:build        # Für das aktuelle Betriebssystem erstellen (automatisch erkannt)
npm run electron:build:win    # Windows-Installationsprogramm (NSIS + portabel)
npm run electron:build:mac    # macOS (dmg + zip, arm64+x64)
npm run electron:build:linux  # Linux (AppImage + deb + rpm)
npm run electron:smoke:packaged  # Paketierten Build einem Smoke-Test unterziehen
```

Veröffentlichungen der Desktop-Installationsprogramme sind den GitHub-Releases beigefügt. Ausführliche Informationen zu Electron (Signierung, IPC-Bridge, Distributionen) finden Sie unter [`ELECTRON_GUIDE.md`](./ELECTRON_GUIDE.md) _(in einer späteren Phase erstellt)_.

### Headless-Server (CI/Automatisierung)

Verwenden Sie für unbeaufsichtigte Einrichtungen (Docker, Kubernetes, CI):

```bash
omniroute setup --non-interactive
omniroute providers test-batch
```

In Kombination mit Umgebungsvariablen (`INITIAL_PASSWORD`, `OMNIROUTE_WS_BRIDGE_SECRET` usw.) können Sie damit eine OmniRoute-Instanz vollständig skriptgesteuert starten.

### CLI-Optionen

| Befehl                  | Beschreibung                                                                                  |
| ----------------------- | --------------------------------------------------------------------------------------------- |
| `omniroute`             | Server starten (`PORT=20128`, API und Dashboard auf demselben Port)                           |
| `omniroute setup`       | Geführte CLI-Ersteinrichtung für Passwort und ersten Anbieter                                 |
| `omniroute doctor`      | Lokale Integritätsprüfungen ausführen, ohne den Server zu starten                             |
| `omniroute providers`   | Anbieter über die CLI erkennen, auflisten, validieren und testen                              |
| `omniroute config`      | Konfiguration der CLI-Tools — Konfigurationen auflisten, abrufen, setzen, prüfen              |
| `omniroute status`      | Offline-Status-Dashboard — Version, DB, Tools, Konfiguration                                  |
| `omniroute logs`        | Nutzungsprotokolle von der API streamen (unterstützt `--follow`)                              |
| `omniroute update`      | Nach OmniRoute-Updates suchen oder diese installieren                                         |
| `omniroute provider`    | Anbieterverbindungen verwalten — hinzufügen, auflisten, entfernen, testen, Standard festlegen |
| `omniroute --port 3000` | Kanonischen/API-Port auf 3000 setzen                                                          |
| `omniroute --mcp`       | MCP-Server starten (stdio-Transport)                                                          |
| `omniroute --no-open`   | Browser nicht automatisch öffnen                                                              |
| `omniroute --help`      | Hilfe anzeigen                                                                                |

Die Headless-Einrichtung kann mit Flags oder Umgebungsvariablen skriptgesteuert werden:

```bash
omniroute setup --non-interactive --password "$OMNIROUTE_PASSWORD"
omniroute setup --non-interactive --add-provider --provider openai --api-key "$OPENAI_API_KEY"
omniroute setup --non-interactive --add-provider --provider openai --api-key "$OPENAI_API_KEY" --test-provider
```

Lokale Diagnosen ausführen, ohne das Dashboard zu öffnen:

```bash
omniroute doctor
omniroute doctor --json
omniroute doctor --no-liveness
```

Anbieter über SSH oder Skripte verwalten, ohne das Dashboard zu öffnen:

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

## Konfiguration des CLI-Tools

### 1) Anbieter verbinden und API-Schlüssel erstellen

1. Öffnen Sie Dashboard → `Providers` und verbinden Sie mindestens einen Anbieter (OAuth oder API-Schlüssel).
2. Öffnen Sie Dashboard → `Endpoints` und erstellen Sie einen API-Schlüssel.
3. (Optional) Öffnen Sie Dashboard → `Combos` und legen Sie Ihre Fallback-Kette fest.

### 2) Coding-Tool konfigurieren

```txt
Basis-URL:     http://localhost:20128/v1
API-Schlüssel: [von der Endpoint-Seite kopieren]
Modell:        if/qwen3.8-max-preview (oder ein beliebiges Anbieter-/Modellpräfix)
```

Wenn Ihr Editor `Authorization: Bearer ...` nicht senden kann, verwenden Sie stattdessen die tokenisierte Kompatibilitätsbasis:

```txt
Basis-URL:       http://localhost:20128/api/v1/vscode/YOUR_KEY/
Modell-URL:      http://localhost:20128/api/v1/vscode/YOUR_KEY/models
Chat-URL:        http://localhost:20128/api/v1/vscode/YOUR_KEY/chat/completions
Ollama-Tags-URL: http://localhost:20128/api/v1/vscode/YOUR_KEY/api/tags
```

Funktioniert mit Claude Code, Codex CLI, Cursor, Cline, OpenClaw, OpenCode und OpenAI-kompatiblen SDKs.

#### Automatisch mit `setup-*` konfigurieren

Anstatt die Basis-URL und den Schlüssel manuell einzufügen, können Sie OmniRoute die eigene Konfiguration jedes Tools anhand des aktuellen Modellkatalogs erstellen lassen. Ein Befehl pro Tool:

```bash
omniroute setup-codex        # Profile unter ~/.codex/<name>.config.toml
omniroute setup-claude       # ~/.claude/profiles/<name>/settings.json
omniroute setup-opencode     # ~/.config/opencode/opencode.json (OpenAI-kompatibel)
omniroute setup-cline        # Einstellungen für Cline CLI und die VS-Code-Erweiterung
omniroute setup-kilo         # Kilo Code
omniroute setup-continue     # ~/.continue/config.yaml (Continue / cn)
omniroute setup-cursor       # gibt die innerhalb von Cursor auszuführenden Schritte aus
omniroute setup-roo          # Roo-Code-Import und autoImport-Verweis
omniroute setup-crush        # ~/.config/crush/crush.json
omniroute setup-goose        # ~/.config/goose/config.yaml
omniroute setup-aider        # ~/.aider.conf.yml
omniroute setup-qwen         # ~/.qwen/settings.json und ~/.qwen/.env
```

Jeder Befehl akzeptiert `--remote <url> --api-key <key>`, um ein lokales Tool für eine **entfernte** OmniRoute-Instanz zu konfigurieren, sowie `--dry-run` für eine Vorschau. Um eine CLI mit den passenden eingefügten Umgebungsvariablen zu starten, ohne eine Konfiguration zu schreiben, verwenden Sie den allgemeinen Starter `omniroute run <target>` (claude, codex, aider, goose, opencode, qwen, gemini); die älteren toolspezifischen Starter `omniroute launch` (Claude Code) und `omniroute launch-codex` (Codex) bleiben verfügbar.

Die vollständige Tabelle (welcher Befehl was schreibt, alle Flags, lokal gegenüber entfernt, `/v1`-Konventionen für Basis-URLs) finden Sie unter **[CLI-Integrationen](./CLI-INTEGRATIONS.md)**.

Eine detaillierte Konfiguration der einzelnen Tools (Claude Code, Codex CLI, Cursor, Cline, OpenClaw, Kilo Code, Copilot und weitere) finden Sie im separaten **[Leitfaden für CLI-Tools](../reference/CLI-TOOLS.md)**.

---

## Protokolleinrichtung (MCP + A2A)

### MCP-Einrichtung (Model Context Protocol)

Starten Sie den MCP-Transport im stdio-Modus:

```bash
omniroute --mcp
```

Empfohlener Validierungsablauf:

```bash
# 1. MCP-Server starten
omniroute --mcp

# 2. Von Ihrem MCP-Client aus aufrufen:
omniroute_get_health        # Sollte den Systemzustand zurückgeben
omniroute_list_combos       # Sollte aktive Combos zurückgeben

# 3. Oder die vollständige E2E-Suite ausführen:
npm run test:protocols:e2e
```

#### MCP-Client-Konfiguration

**Claude Code:**

```bash
claude mcp add-server omniroute --type http --url http://localhost:20128/api/mcp/stream
```

**Cursor / Cline:**

Fügen Sie Folgendes zu Ihren MCP-Einstellungen hinzu:

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

**Vollständige MCP-Dokumentation:** [README des MCP-Servers](../../open-sse/mcp-server/README.md) — 110 Tools, IDE-Konfigurationen, Python-/TS-/Go-Clients.

### A2A-Einrichtung (Agent-to-Agent Protocol)

Überprüfen Sie die Agent Card:

```bash
curl http://localhost:20128/.well-known/agent.json
```

Senden Sie eine Aufgabe:

```bash
curl -X POST http://localhost:20128/a2a \
  -H 'content-type: application/json' \
  -d '{"jsonrpc":"2.0","id":"quickstart","method":"message/send","params":{"skill":"quota-management","messages":[{"role":"user","content":"Give me a short quota summary."}]}}'
```

**Vollständige A2A-Dokumentation:** [README des A2A-Servers](../../src/lib/a2a/README.md) — JSON-RPC 2.0, Skills, Streaming, Aufgabenlebenszyklus.

---

## Timeout-Konfiguration

### Grundlegende Timeouts

Für die meisten Bereitstellungen benötigen Sie nur diese beiden Variablen:

| Variable                 | Standardwert                   | Zweck                                                                                                                                                                         |
| ------------------------ | ------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `REQUEST_TIMEOUT_MS`     | `600000`                       | Gemeinsamer Ausgangswert für den Timeout bis zum Beginn der Upstream-Antwort, verborgene Undici-Timeouts, TLS-Fingerprint-Anfragen und Anfrage-/Proxy-Timeouts der API-Bridge |
| `STREAM_IDLE_TIMEOUT_MS` | übernimmt `REQUEST_TIMEOUT_MS` | Maximaler Abstand zwischen Streaming-Chunks, bevor OmniRoute den SSE-Stream abbricht                                                                                          |

Die Abwärtskompatibilität bleibt erhalten: Vorhandene Variablen wie `FETCH_TIMEOUT_MS`, `API_BRIDGE_PROXY_TIMEOUT_MS` und andere schichtspezifische Timeout-Variablen funktionieren weiterhin und überschreiben den gemeinsamen Ausgangswert.

### Anbieterspezifische Hinweise

Für Claude Code-kompatible Upstreams (`anthropic-compatible-cc-*`) leitet OmniRoute den ausgehenden Header `X-Stainless-Timeout` aus dem ermittelten Fetch-Timeout ab, damit die anbieterseitigen Lese-Timeouts mit Ihrer Umgebungskonfiguration übereinstimmen.

Bei Claude Code-kompatiblen Reverse-Proxys von Drittanbietern verwendet OmniRoute standardmäßig einen konservativen `anthropic-beta`-Satz und leitet, wenn `Client Cache Control` auf `Auto` belassen wird, nur vom Client bereitgestellte `cache_control`-Markierungen weiter. Aktivieren Sie den verbindungsspezifischen Schalter „Enable redact-thinking beta“ nur, wenn der Upstream ausdrücklich Claude-Streams mit redigierten Denkprozessen erfordert.

### Erweiterte Timeout-Überschreibungen

| Variable                                 | Standardwert                                 | Zweck                                                                                       |
| ---------------------------------------- | -------------------------------------------- | ------------------------------------------------------------------------------------------- |
| `FETCH_TIMEOUT_MS`                       | übernimmt `REQUEST_TIMEOUT_MS`               | Timeout bis zum Beginn der Upstream-Antwort, der bis zum Eintreffen der Antwort-Header gilt |
| `FETCH_HEADERS_TIMEOUT_MS`               | übernimmt `FETCH_TIMEOUT_MS`                 | Undici-Zeitlimit für den Empfang der Upstream-Antwort-Header                                |
| `FETCH_BODY_TIMEOUT_MS`                  | übernimmt `FETCH_TIMEOUT_MS`                 | Undici-Zeitlimit zwischen Upstream-Body-Chunks (`0` deaktiviert es)                         |
| `FETCH_CONNECT_TIMEOUT_MS`               | `30000`                                      | Undici-Timeout für den TCP-Verbindungsaufbau                                                |
| `FETCH_KEEPALIVE_TIMEOUT_MS`             | `4000`                                       | Undici-Timeout für inaktive Keep-Alive-Sockets                                              |
| `TLS_CLIENT_TIMEOUT_MS`                  | übernimmt `FETCH_TIMEOUT_MS`                 | Timeout für über `wreq-js` ausgeführte TLS-Fingerprint-Anfragen                             |
| `API_BRIDGE_PROXY_TIMEOUT_MS`            | übernimmt `REQUEST_TIMEOUT_MS` oder `600000` | Timeout für die `/v1`-Proxy-Weiterleitung vom API-Port zum Dashboard-Port                   |
| `API_BRIDGE_SERVER_REQUEST_TIMEOUT_MS`   | `max(API_BRIDGE_PROXY_TIMEOUT_MS, 300000)`   | Timeout für eingehende Anfragen auf dem API-Bridge-Server                                   |
| `API_BRIDGE_SERVER_HEADERS_TIMEOUT_MS`   | `60000`                                      | Timeout für eingehende Header auf dem API-Bridge-Server                                     |
| `API_BRIDGE_SERVER_KEEPALIVE_TIMEOUT_MS` | `5000`                                       | Keep-Alive-Timeout auf dem API-Bridge-Server                                                |
| `API_BRIDGE_SERVER_SOCKET_TIMEOUT_MS`    | `0`                                          | Timeout bei Socket-Inaktivität auf dem API-Bridge-Server (`0` deaktiviert ihn)              |

> **Hinweis:** Bei Streaming-Anfragen deckt `FETCH_TIMEOUT_MS` nur den Verbindungsaufbau beziehungsweise das Warten auf die erste Upstream-Antwort ab. Sobald der Stream aktiv ist, bricht OmniRoute nur bei einem tatsächlichen Stillstand (`STREAM_IDLE_TIMEOUT_MS`) oder bei Inaktivität des Undici-Bodys (`FETCH_BODY_TIMEOUT_MS`) ab.

### Reverse-Proxy-Kompatibilität

Wenn Sie OmniRoute hinter Nginx, Caddy, Cloudflare oder einem anderen Reverse-Proxy betreiben, stellen Sie sicher, dass die Proxy-Timeouts ebenfalls höher als Ihre OmniRoute-Stream-/Fetch-Timeouts sind.

---

## Modus mit getrennten Ports

Führen Sie API und Dashboard für erweiterte Szenarien (Reverse-Proxy, Container-Netzwerke) auf getrennten Ports aus:

```bash
PORT=20128 DASHBOARD_PORT=20129 omniroute
# API:       http://localhost:20128/v1
# Dashboard: http://localhost:20129
```

---

## Vorlage für Void Linux (xbps-src)

Benutzer von Void Linux können mit `xbps-src` ein natives Paket erstellen. Speichern Sie diesen Block als `srcpkgs/omniroute/template`:

```bash
# Vorlagendatei für 'omniroute'
pkgname=omniroute
version=3.8.0
revision=1
hostmakedepends="nodejs python3 make"
depends="openssl"
short_desc="Universelles KI-Gateway mit intelligenter Weiterleitung für mehrere LLM-Anbieter"
maintainer="zenobit <zenobit@disroot.org>"
license="MIT"
homepage="https://github.com/diegosouzapw/OmniRoute"
distfiles="https://github.com/diegosouzapw/OmniRoute/archive/refs/tags/v${version}.tar.gz"
# Prüfsumme für jede Veröffentlichung neu generieren mit:
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

## Deinstallation

| Befehl                   | Aktion                                                                                                |
| ------------------------ | ----------------------------------------------------------------------------------------------------- |
| `npm run uninstall`      | Entfernt die Systemanwendung, **behält jedoch Ihre Datenbank und Konfigurationen** in `~/.omniroute`. |
| `npm run uninstall:full` | Entfernt die Anwendung UND **löscht dauerhaft alle Konfigurationen, Schlüssel und Datenbanken**.      |

> Ausführliche Anweisungen zur Deinstallation für alle Methoden finden Sie unter [UNINSTALL.md](./UNINSTALL.md).
