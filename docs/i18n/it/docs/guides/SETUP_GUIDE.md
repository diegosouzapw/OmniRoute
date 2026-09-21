# 📖 Setup Guide — OmniRoute (Italiano)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/SETUP_GUIDE.md) · 🇪🇹 [am](../../../am/docs/guides/SETUP_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/guides/SETUP_GUIDE.md) · 🇦🇿 [az](../../../az/docs/guides/SETUP_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/guides/SETUP_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/guides/SETUP_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/guides/SETUP_GUIDE.md) · 🇩🇰 [da](../../../da/docs/guides/SETUP_GUIDE.md) · 🇩🇪 [de](../../../de/docs/guides/SETUP_GUIDE.md) · 🇬🇷 [el](../../../el/docs/guides/SETUP_GUIDE.md) · 🇪🇸 [es](../../../es/docs/guides/SETUP_GUIDE.md) · 🇪🇪 [et](../../../et/docs/guides/SETUP_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/guides/SETUP_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/guides/SETUP_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/guides/SETUP_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/guides/SETUP_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/guides/SETUP_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/guides/SETUP_GUIDE.md) · 🇮🇱 [he](../../../he/docs/guides/SETUP_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/guides/SETUP_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/guides/SETUP_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/guides/SETUP_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/guides/SETUP_GUIDE.md) · 🇮🇩 [id](../../../id/docs/guides/SETUP_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/guides/SETUP_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/guides/SETUP_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/guides/SETUP_GUIDE.md) · 🇰🇭 [km](../../../km/docs/guides/SETUP_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/guides/SETUP_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/guides/SETUP_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/guides/SETUP_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/guides/SETUP_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/guides/SETUP_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/guides/SETUP_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/guides/SETUP_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/guides/SETUP_GUIDE.md) · 🇲🇲 [my](../../../my/docs/guides/SETUP_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/guides/SETUP_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/guides/SETUP_GUIDE.md) · 🇳🇴 [no](../../../no/docs/guides/SETUP_GUIDE.md) · 🇮🇳 [or](../../../or/docs/guides/SETUP_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/guides/SETUP_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/guides/SETUP_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/guides/SETUP_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/guides/SETUP_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/SETUP_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/guides/SETUP_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/guides/SETUP_GUIDE.md) · 🇱🇰 [si](../../../si/docs/guides/SETUP_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/guides/SETUP_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/guides/SETUP_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/guides/SETUP_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/guides/SETUP_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/guides/SETUP_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/guides/SETUP_GUIDE.md) · 🇮🇳 [te](../../../te/docs/guides/SETUP_GUIDE.md) · 🇹🇭 [th](../../../th/docs/guides/SETUP_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/guides/SETUP_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/SETUP_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/guides/SETUP_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/guides/SETUP_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/guides/SETUP_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/guides/SETUP_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/SETUP_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/SETUP_GUIDE.md)

---

> Riferimento completo per la configurazione di OmniRoute. Per la versione rapida, consulta la [Guida rapida nel README](../README.md#-quick-start).

## Indice

- [Metodi di installazione](#install-methods)
- [Configurazione degli strumenti CLI](#cli-tool-configuration)
- [Configurazione dei protocolli (MCP + A2A)](#protocol-setup-mcp--a2a)
- [Configurazione dei timeout](#timeout-configuration)
- [Modalità con porte separate](#split-port-mode)
- [Void Linux (xbps-src)](#void-linux-xbps-src-template)
- [Disinstallazione](#uninstalling)

---

## Metodi di installazione

### npm (consigliato)

```bash
npm install -g omniroute
omniroute
```

La dashboard si apre all'indirizzo `http://localhost:20128` e l'URL di base dell'API è `http://localhost:20128/v1`.

### pnpm

```bash
pnpm add -g omniroute@latest --allow-build=better-sqlite3 --allow-build=@swc/core
omniroute
```

> **Utenti pnpm:** il flag `--allow-build` è necessario per abilitare gli script di compilazione nativi per `better-sqlite3` e `@swc/core`. Il comando `pnpm approve-builds -g` non è supportato per le installazioni globali su pnpm v11.

### Arch Linux (AUR)

```bash
yay -S omniroute-bin
systemctl --user enable --now omniroute.service
```

Il [pacchetto AUR](https://aur.archlinux.org/packages/omniroute-bin) installa OmniRoute e fornisce un servizio utente systemd.

### Dai sorgenti

```bash
npm install
PORT=20128 DASHBOARD_PORT=20129 NEXT_PUBLIC_BASE_URL=http://localhost:20129 npm run dev
```

> **Nota per Windows:** per impostazione predefinita, OmniRoute utilizza `%APPDATA%\omniroute` quando la directory legacy `%USERPROFILE%\.omniroute` non è presente. Imposta `DATA_DIR` per scegliere una posizione diversa per la directory dei dati.

> **Nota:** alla prima esecuzione, `npm install` genera automaticamente `.env` da `.env.example`. Le installazioni successive non sovrascriveranno un file `.env` esistente, preservando così le personalizzazioni. Per rigenerarlo, elimina `.env` prima di eseguire nuovamente il comando.

### Docker

Consulta la [Guida Docker](./DOCKER_GUIDE.md) per la configurazione completa di Docker, inclusi i profili Compose e HTTPS con Caddy.

### Applicazione desktop (Electron)

OmniRoute include un wrapper desktop basato su Electron 41 + electron-builder 26.10. Script disponibili (radice del workspace):

```bash
npm run electron:dev          # Esegue l'app desktop con ricaricamento automatico
npm run electron:build        # Compila per il sistema operativo corrente (rilevato automaticamente)
npm run electron:build:win    # Programma di installazione per Windows (NSIS + portabile)
npm run electron:build:mac    # macOS (dmg + zip, arm64+x64)
npm run electron:build:linux  # Linux (AppImage + deb + rpm)
npm run electron:smoke:packaged  # Smoke test della build pacchettizzata
```

Le versioni dei programmi di installazione desktop sono allegate alle release di GitHub. Per un'analisi approfondita di Electron (firma, bridge IPC, distribuzioni), consulta [`ELECTRON_GUIDE.md`](./ELECTRON_GUIDE.md) _(creato in una fase successiva)_.

### Server headless (CI/automazione)

Per le configurazioni non presidiate (Docker, Kubernetes, CI), utilizza:

```bash
omniroute setup --non-interactive
omniroute providers test-batch
```

Insieme alle variabili d'ambiente (`INITIAL_PASSWORD`, `OMNIROUTE_WS_BRIDGE_SECRET`, ecc.), ciò consente di avviare un'istanza di OmniRoute in modo completamente automatizzabile tramite script.

### Opzioni CLI

| Comando                 | Descrizione                                                                        |
| ----------------------- | ---------------------------------------------------------------------------------- |
| `omniroute`             | Avvia il server (`PORT=20128`, API e dashboard sulla stessa porta)                 |
| `omniroute setup`       | Configurazione guidata tramite CLI per la password e il primo provider             |
| `omniroute doctor`      | Esegue controlli di integrità locali senza avviare il server                       |
| `omniroute providers`   | Individua, elenca, convalida e testa i provider dalla CLI                          |
| `omniroute config`      | Configurazione degli strumenti CLI: elenca, ottiene, imposta e convalida           |
| `omniroute status`      | Dashboard di stato offline: versione, DB, strumenti e configurazione               |
| `omniroute logs`        | Trasmette i log di utilizzo dall'API (supporta `--follow`)                         |
| `omniroute update`      | Verifica o applica gli aggiornamenti di OmniRoute                                  |
| `omniroute provider`    | Gestisce le connessioni ai provider: aggiunge, elenca, rimuove, testa, predefinito |
| `omniroute --port 3000` | Imposta la porta canonica/API su 3000                                              |
| `omniroute --mcp`       | Avvia il server MCP (trasporto stdio)                                              |
| `omniroute --no-open`   | Non apre automaticamente il browser                                                |
| `omniroute --help`      | Mostra la guida                                                                    |

La configurazione headless può essere automatizzata tramite script utilizzando flag o variabili d'ambiente:

```bash
omniroute setup --non-interactive --password "$OMNIROUTE_PASSWORD"
omniroute setup --non-interactive --add-provider --provider openai --api-key "$OPENAI_API_KEY"
omniroute setup --non-interactive --add-provider --provider openai --api-key "$OPENAI_API_KEY" --test-provider
```

Esegui la diagnostica locale senza aprire la dashboard:

```bash
omniroute doctor
omniroute doctor --json
omniroute doctor --no-liveness
```

Gestisci i provider tramite SSH o script senza aprire la dashboard:

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

## Configurazione dello strumento CLI

### 1) Connettere i provider e creare una chiave API

1. Apri Dashboard → `Providers` e connetti almeno un provider (OAuth o chiave API).
2. Apri Dashboard → `Endpoints` e crea una chiave API.
3. (Facoltativo) Apri Dashboard → `Combos` e configura la catena di fallback.

### 2) Configurare lo strumento di programmazione

```txt
URL di base: http://localhost:20128/v1
Chiave API:  [copia dalla pagina Endpoint]
Modello:     if/qwen3.8-max-preview (o qualsiasi prefisso provider/modello)
```

Se il tuo editor non può inviare `Authorization: Bearer ...`, usa invece la base di compatibilità con token:

```txt
URL di base: http://localhost:20128/api/v1/vscode/YOUR_KEY/
URL dei modelli: http://localhost:20128/api/v1/vscode/YOUR_KEY/models
URL della chat: http://localhost:20128/api/v1/vscode/YOUR_KEY/chat/completions
URL dei tag Ollama: http://localhost:20128/api/v1/vscode/YOUR_KEY/api/tags
```

Compatibile con Claude Code, Codex CLI, Cursor, Cline, OpenClaw, OpenCode e gli SDK compatibili con OpenAI.

#### Configurazione automatica con `setup-*`

Invece di incollare manualmente l'URL di base e la chiave, consenti a OmniRoute di scrivere la configurazione specifica di ciascuno strumento a partire dal catalogo dei modelli in tempo reale. Un comando per ogni strumento:

```bash
omniroute setup-codex        # Profili ~/.codex/<name>.config.toml
omniroute setup-claude       # ~/.claude/profiles/<name>/settings.json
omniroute setup-opencode     # ~/.config/opencode/opencode.json (compatibile con OpenAI)
omniroute setup-cline        # Impostazioni di Cline CLI + estensione VS Code
omniroute setup-kilo         # Kilo Code
omniroute setup-continue     # ~/.continue/config.yaml (Continue / cn)
omniroute setup-cursor       # Mostra i passaggi da eseguire nell'app Cursor
omniroute setup-roo          # Importazione in Roo Code + puntatore autoImport
omniroute setup-crush        # ~/.config/crush/crush.json
omniroute setup-goose        # ~/.config/goose/config.yaml
omniroute setup-aider        # ~/.aider.conf.yml
omniroute setup-qwen         # ~/.qwen/settings.json + ~/.qwen/.env
```

Ciascun comando accetta `--remote <url> --api-key <key>` per configurare uno strumento locale affinché utilizzi un'istanza OmniRoute **remota**, oltre a `--dry-run` per visualizzare un'anteprima. Per avviare una CLI con le variabili d'ambiente corrette già impostate e senza scrivere alcuna configurazione, usa il launcher generico `omniroute run <target>` (claude, codex, aider, goose, opencode, qwen, gemini); rimangono disponibili i launcher legacy specifici per strumento `omniroute launch` (Claude Code) e `omniroute launch-codex` (Codex).

Per la tabella completa (cosa scrive ogni comando, tutti i flag, modalità locale rispetto a remota, convenzioni `/v1` per l'URL di base), consulta **[Integrazioni CLI](./CLI-INTEGRATIONS.md)**.

Per la configurazione dettagliata di ogni strumento (Claude Code, Codex CLI, Cursor, Cline, OpenClaw, Kilo Code, Copilot e altri), consulta la guida dedicata **[Guida agli strumenti CLI](../reference/CLI-TOOLS.md)**.

---

## Configurazione dei protocolli (MCP + A2A)

### Configurazione MCP (Model Context Protocol)

Avvia il trasporto MCP in modalità stdio:

```bash
omniroute --mcp
```

Flusso di convalida consigliato:

```bash
# 1. Avvia il server MCP
omniroute --mcp

# 2. Dal tuo client MCP, esegui:
omniroute_get_health        # Dovrebbe restituire lo stato del sistema
omniroute_list_combos       # Dovrebbe restituire le combo attive

# 3. Oppure esegui l'intera suite E2E:
npm run test:protocols:e2e
```

#### Configurazione del client MCP

**Claude Code:**

```bash
claude mcp add-server omniroute --type http --url http://localhost:20128/api/mcp/stream
```

**Cursor / Cline:**

Aggiungi quanto segue alle impostazioni MCP:

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

**Documentazione MCP completa:** [README del server MCP](../../open-sse/mcp-server/README.md) — 110 strumenti, configurazioni IDE, client Python/TS/Go.

### Configurazione A2A (protocollo Agent-to-Agent)

Verifica l'Agent Card:

```bash
curl http://localhost:20128/.well-known/agent.json
```

Invia un'attività:

```bash
curl -X POST http://localhost:20128/a2a \
  -H 'content-type: application/json' \
  -d '{"jsonrpc":"2.0","id":"quickstart","method":"message/send","params":{"skill":"quota-management","messages":[{"role":"user","content":"Forniscimi un breve riepilogo delle quote."}]}}'
```

**Documentazione A2A completa:** [README del server A2A](../../src/lib/a2a/README.md) — JSON-RPC 2.0, skill, streaming, ciclo di vita delle attività.

---

## Configurazione dei timeout

### Timeout di base

Per la maggior parte delle distribuzioni, sono necessarie solo queste due variabili:

| Variabile                | Valore predefinito           | Scopo                                                                                                                                                                         |
| ------------------------ | ---------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `REQUEST_TIMEOUT_MS`     | `600000`                     | Valore di base condiviso per il timeout di inizio risposta upstream, i timeout Undici nascosti, le richieste di fingerprint TLS e i timeout di richiesta/proxy del bridge API |
| `STREAM_IDLE_TIMEOUT_MS` | eredita `REQUEST_TIMEOUT_MS` | Intervallo massimo tra i chunk di streaming prima che OmniRoute interrompa lo stream SSE                                                                                      |

La compatibilità con le versioni precedenti è preservata: le variabili di timeout esistenti `FETCH_TIMEOUT_MS`, `API_BRIDGE_PROXY_TIMEOUT_MS` e le altre variabili di timeout specifiche per livello continuano a funzionare e sovrascrivono il valore di base condiviso.

### Note specifiche per i provider

Per gli upstream compatibili con Claude Code (`anthropic-compatible-cc-*`), OmniRoute deriva l'header `X-Stainless-Timeout` in uscita dal timeout di fetch risolto, in modo che i timeout di lettura lato provider rimangano allineati alla configurazione dell'ambiente.

Per i reverse proxy di terze parti compatibili con Claude Code, OmniRoute mantiene prudenziale il set predefinito `anthropic-beta` e, quando `Client Cache Control` è impostato su `Auto`, inoltra solo i marcatori `cache_control` forniti dal client. Abilitare l'opzione specifica per connessione "Enable redact-thinking beta" solo quando l'upstream richiede espressamente stream di ragionamento Claude oscurati.

### Override avanzati dei timeout

| Variabile                                | Valore predefinito                         | Scopo                                                                                      |
| ---------------------------------------- | ------------------------------------------ | ------------------------------------------------------------------------------------------ |
| `FETCH_TIMEOUT_MS`                       | eredita `REQUEST_TIMEOUT_MS`               | Timeout di inizio risposta upstream utilizzato fino all'arrivo degli header della risposta |
| `FETCH_HEADERS_TIMEOUT_MS`               | eredita `FETCH_TIMEOUT_MS`                 | Limite di tempo Undici per la ricezione degli header della risposta upstream               |
| `FETCH_BODY_TIMEOUT_MS`                  | eredita `FETCH_TIMEOUT_MS`                 | Limite di tempo Undici tra i chunk del corpo upstream (`0` lo disabilita)                  |
| `FETCH_CONNECT_TIMEOUT_MS`               | `30000`                                    | Timeout Undici per la connessione TCP                                                      |
| `FETCH_KEEPALIVE_TIMEOUT_MS`             | `4000`                                     | Timeout del socket keep-alive inattivo di Undici                                           |
| `TLS_CLIENT_TIMEOUT_MS`                  | eredita `FETCH_TIMEOUT_MS`                 | Timeout per le richieste di fingerprint TLS effettuate tramite `wreq-js`                   |
| `API_BRIDGE_PROXY_TIMEOUT_MS`            | eredita `REQUEST_TIMEOUT_MS` o `600000`    | Timeout per l'inoltro del proxy `/v1` dalla porta API alla porta della dashboard           |
| `API_BRIDGE_SERVER_REQUEST_TIMEOUT_MS`   | `max(API_BRIDGE_PROXY_TIMEOUT_MS, 300000)` | Timeout delle richieste in ingresso sul server del bridge API                              |
| `API_BRIDGE_SERVER_HEADERS_TIMEOUT_MS`   | `60000`                                    | Timeout degli header in ingresso sul server del bridge API                                 |
| `API_BRIDGE_SERVER_KEEPALIVE_TIMEOUT_MS` | `5000`                                     | Timeout keep-alive sul server del bridge API                                               |
| `API_BRIDGE_SERVER_SOCKET_TIMEOUT_MS`    | `0`                                        | Timeout di inattività del socket sul server del bridge API (`0` lo disabilita)             |

> **Nota:** Per le richieste in streaming, `FETCH_TIMEOUT_MS` copre solo l'impostazione della connessione e l'attesa della prima risposta upstream. Una volta che lo stream è attivo, OmniRoute lo interromperà solo in caso di blocco effettivo (`STREAM_IDLE_TIMEOUT_MS`) o di inattività del corpo rilevata da Undici (`FETCH_BODY_TIMEOUT_MS`).

### Compatibilità con i reverse proxy

Se OmniRoute viene eseguito dietro Nginx, Caddy, Cloudflare o un altro reverse proxy, assicurarsi che anche i timeout del proxy siano superiori ai timeout di stream/fetch di OmniRoute.

---

## Modalità Split-Port

Esegui API e Dashboard su porte separate per scenari avanzati (reverse proxy, networking dei container):

```bash
PORT=20128 DASHBOARD_PORT=20129 omniroute
# API:       http://localhost:20128/v1
# Dashboard: http://localhost:20129
```

---

## Template per Void Linux (xbps-src)

Gli utenti di Void Linux possono creare un pacchetto nativo utilizzando `xbps-src`. Salva questo blocco come `srcpkgs/omniroute/template`:

```bash
# File template per 'omniroute'
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
# Rigenera il checksum per ogni release con:
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

## Disinstallazione

| Comando                  | Azione                                                                                                 |
| ------------------------ | ------------------------------------------------------------------------------------------------------ |
| `npm run uninstall`      | Rimuove l'applicazione di sistema ma **mantiene il database e le configurazioni** in `~/.omniroute`.   |
| `npm run uninstall:full` | Rimuove l'applicazione E **cancella definitivamente tutte le configurazioni, le chiavi e i database**. |

> Per istruzioni dettagliate sulla disinstallazione con tutti i metodi, consulta [UNINSTALL.md](./UNINSTALL.md).
