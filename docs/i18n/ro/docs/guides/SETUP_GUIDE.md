# 📖 Setup Guide — OmniRoute (Română)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/SETUP_GUIDE.md) · 🇪🇹 [am](../../../am/docs/guides/SETUP_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/guides/SETUP_GUIDE.md) · 🇦🇿 [az](../../../az/docs/guides/SETUP_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/guides/SETUP_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/guides/SETUP_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/guides/SETUP_GUIDE.md) · 🇩🇰 [da](../../../da/docs/guides/SETUP_GUIDE.md) · 🇩🇪 [de](../../../de/docs/guides/SETUP_GUIDE.md) · 🇬🇷 [el](../../../el/docs/guides/SETUP_GUIDE.md) · 🇪🇸 [es](../../../es/docs/guides/SETUP_GUIDE.md) · 🇪🇪 [et](../../../et/docs/guides/SETUP_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/guides/SETUP_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/guides/SETUP_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/guides/SETUP_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/guides/SETUP_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/guides/SETUP_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/guides/SETUP_GUIDE.md) · 🇮🇱 [he](../../../he/docs/guides/SETUP_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/guides/SETUP_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/guides/SETUP_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/guides/SETUP_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/guides/SETUP_GUIDE.md) · 🇮🇩 [id](../../../id/docs/guides/SETUP_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/guides/SETUP_GUIDE.md) · 🇮🇹 [it](../../../it/docs/guides/SETUP_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/guides/SETUP_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/guides/SETUP_GUIDE.md) · 🇰🇭 [km](../../../km/docs/guides/SETUP_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/guides/SETUP_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/guides/SETUP_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/guides/SETUP_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/guides/SETUP_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/guides/SETUP_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/guides/SETUP_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/guides/SETUP_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/guides/SETUP_GUIDE.md) · 🇲🇲 [my](../../../my/docs/guides/SETUP_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/guides/SETUP_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/guides/SETUP_GUIDE.md) · 🇳🇴 [no](../../../no/docs/guides/SETUP_GUIDE.md) · 🇮🇳 [or](../../../or/docs/guides/SETUP_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/guides/SETUP_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/guides/SETUP_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/guides/SETUP_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/guides/SETUP_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/SETUP_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/guides/SETUP_GUIDE.md) · 🇱🇰 [si](../../../si/docs/guides/SETUP_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/guides/SETUP_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/guides/SETUP_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/guides/SETUP_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/guides/SETUP_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/guides/SETUP_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/guides/SETUP_GUIDE.md) · 🇮🇳 [te](../../../te/docs/guides/SETUP_GUIDE.md) · 🇹🇭 [th](../../../th/docs/guides/SETUP_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/guides/SETUP_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/SETUP_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/guides/SETUP_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/guides/SETUP_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/guides/SETUP_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/guides/SETUP_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/SETUP_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/SETUP_GUIDE.md)

---

> Referință completă pentru configurarea OmniRoute. Pentru versiunea rapidă, consultați [Ghidul de pornire rapidă din README](../README.md#-quick-start).

## Cuprins

- [Metode de instalare](#install-methods)
- [Configurarea instrumentelor CLI](#cli-tool-configuration)
- [Configurarea protocoalelor (MCP + A2A)](#protocol-setup-mcp--a2a)
- [Configurarea timpilor de expirare](#timeout-configuration)
- [Modul cu porturi separate](#split-port-mode)
- [Void Linux (xbps-src)](#void-linux-xbps-src-template)
- [Dezinstalare](#uninstalling)

---

## Metode de instalare

### npm (recomandat)

```bash
npm install -g omniroute
omniroute
```

Panoul de control se deschide la `http://localhost:20128`, iar URL-ul de bază al API-ului este `http://localhost:20128/v1`.

### pnpm

```bash
pnpm add -g omniroute@latest --allow-build=better-sqlite3 --allow-build=@swc/core
omniroute
```

> **Pentru utilizatorii pnpm:** indicatorul `--allow-build` este necesar pentru a activa scripturile de compilare native pentru `better-sqlite3` și `@swc/core`. Comanda `pnpm approve-builds -g` nu este acceptată pentru instalările globale în pnpm v11.

### Arch Linux (AUR)

```bash
yay -S omniroute-bin
systemctl --user enable --now omniroute.service
```

[Pachetul AUR](https://aur.archlinux.org/packages/omniroute-bin) instalează OmniRoute și oferă un serviciu systemd la nivel de utilizator.

### Din sursă

```bash
npm install
PORT=20128 DASHBOARD_PORT=20129 NEXT_PUBLIC_BASE_URL=http://localhost:20129 npm run dev
```

> **Notă pentru Windows:** În mod implicit, OmniRoute utilizează `%APPDATA%\omniroute` atunci când directorul vechi `%USERPROFILE%\.omniroute` nu este prezent. Setați `DATA_DIR` pentru a alege o altă locație pentru directorul de date.

> **Notă:** La prima rulare, `npm install` generează automat `.env` din `.env.example`. Instalările ulterioare nu vor suprascrie un fișier `.env` existent, astfel încât personalizările sunt păstrate. Pentru a-l genera din nou, ștergeți `.env` înainte de a rula din nou comanda.

### Docker

Consultați [Ghidul Docker](./DOCKER_GUIDE.md) pentru configurarea completă a Docker, inclusiv profilurile Compose și Caddy HTTPS.

### Aplicația desktop (Electron)

OmniRoute include un înveliș desktop construit pe Electron 41 + electron-builder 26.10. Scripturi disponibile (în rădăcina spațiului de lucru):

```bash
npm run electron:dev          # Rulează aplicația desktop cu reîncărcare automată
npm run electron:build        # Compilează pentru sistemul de operare curent (detectat automat)
npm run electron:build:win    # Program de instalare Windows (NSIS + portabil)
npm run electron:build:mac    # macOS (dmg + zip, arm64+x64)
npm run electron:build:linux  # Linux (AppImage + deb + rpm)
npm run electron:smoke:packaged  # Test rapid pentru versiunea împachetată
```

Versiunile programelor de instalare desktop sunt atașate la lansările GitHub. Pentru ghidul aprofundat complet despre Electron (semnare, punte IPC, distribuții), consultați [`ELECTRON_GUIDE.md`](./ELECTRON_GUIDE.md) _(creat într-o etapă ulterioară)_.

### Server fără interfață grafică (CI/automatizare)

Pentru configurări nesupravegheate (Docker, Kubernetes, CI), utilizați:

```bash
omniroute setup --non-interactive
omniroute providers test-batch
```

Împreună cu variabilele de mediu (`INITIAL_PASSWORD`, `OMNIROUTE_WS_BRIDGE_SECRET` etc.), acest lucru vă permite să porniți o instanță OmniRoute complet scriptabilă.

### Opțiuni CLI

| Comandă                 | Descriere                                                                                              |
| ----------------------- | ------------------------------------------------------------------------------------------------------ |
| `omniroute`             | Pornește serverul (`PORT=20128`, API-ul și panoul de control pe același port)                          |
| `omniroute setup`       | Configurare CLI ghidată pentru parolă și primul furnizor                                               |
| `omniroute doctor`      | Rulează verificări locale de stare fără a porni serverul                                               |
| `omniroute providers`   | Descoperă, listează, validează și testează furnizorii din CLI                                          |
| `omniroute config`      | Configurarea instrumentelor CLI — listează, obține, setează și validează configurații                  |
| `omniroute status`      | Panou de stare offline — versiune, bază de date, instrumente, configurație                             |
| `omniroute logs`        | Transmite în flux jurnalele de utilizare din API (acceptă `--follow`)                                  |
| `omniroute update`      | Verifică sau aplică actualizările OmniRoute                                                            |
| `omniroute provider`    | Gestionează conexiunile furnizorilor — adaugă, listează, elimină, testează, setează opțiunea implicită |
| `omniroute --port 3000` | Setează portul canonic/API la 3000                                                                     |
| `omniroute --mcp`       | Pornește serverul MCP (transport stdio)                                                                |
| `omniroute --no-open`   | Nu deschide automat browserul                                                                          |
| `omniroute --help`      | Afișează ajutorul                                                                                      |

Configurarea fără interfață grafică poate fi automatizată prin scripturi folosind opțiuni sau variabile de mediu:

```bash
omniroute setup --non-interactive --password "$OMNIROUTE_PASSWORD"
omniroute setup --non-interactive --add-provider --provider openai --api-key "$OPENAI_API_KEY"
omniroute setup --non-interactive --add-provider --provider openai --api-key "$OPENAI_API_KEY" --test-provider
```

Rulați diagnosticarea locală fără a deschide panoul de control:

```bash
omniroute doctor
omniroute doctor --json
omniroute doctor --no-liveness
```

Gestionați furnizorii prin SSH sau scripturi fără a deschide panoul de control:

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

## Configurarea instrumentului CLI

### 1) Conectați furnizorii și creați cheia API

1. Deschideți Dashboard → `Providers` și conectați cel puțin un furnizor (OAuth sau cheie API).
2. Deschideți Dashboard → `Endpoints` și creați o cheie API.
3. (Opțional) Deschideți Dashboard → `Combos` și configurați lanțul de rezervă.

### 2) Configurați instrumentul de programare

```txt
URL de bază: http://localhost:20128/v1
Cheie API:    [copiați de pe pagina Endpoint]
Model:        if/qwen3.8-max-preview (sau orice prefix furnizor/model)
```

Dacă editorul dvs. nu poate trimite `Authorization: Bearer ...`, utilizați în schimb baza de compatibilitate cu token inclus:

```txt
URL de bază:         http://localhost:20128/api/v1/vscode/YOUR_KEY/
URL pentru modele:   http://localhost:20128/api/v1/vscode/YOUR_KEY/models
URL pentru chat:     http://localhost:20128/api/v1/vscode/YOUR_KEY/chat/completions
URL pentru taguri Ollama: http://localhost:20128/api/v1/vscode/YOUR_KEY/api/tags
```

Funcționează cu Claude Code, Codex CLI, Cursor, Cline, OpenClaw, OpenCode și SDK-uri compatibile cu OpenAI.

#### Configurare automată cu `setup-*`

În loc să introduceți manual URL-ul de bază și cheia, permiteți OmniRoute să scrie configurația proprie a fiecărui instrument folosind catalogul activ de modele. Câte o comandă pentru fiecare instrument:

```bash
omniroute setup-codex        # profiluri ~/.codex/<name>.config.toml
omniroute setup-claude       # ~/.claude/profiles/<name>/settings.json
omniroute setup-opencode     # ~/.config/opencode/opencode.json (compatibil cu OpenAI)
omniroute setup-cline        # setările Cline CLI + extensia VS Code
omniroute setup-kilo         # Kilo Code
omniroute setup-continue     # ~/.continue/config.yaml (Continue / cn)
omniroute setup-cursor       # afișează pașii din aplicația Cursor
omniroute setup-roo          # import Roo Code + indicator autoImport
omniroute setup-crush        # ~/.config/crush/crush.json
omniroute setup-goose        # ~/.config/goose/config.yaml
omniroute setup-aider        # ~/.aider.conf.yml
omniroute setup-qwen         # ~/.qwen/settings.json + ~/.qwen/.env
```

Fiecare acceptă `--remote <url> --api-key <key>` pentru a configura un instrument local cu un OmniRoute **la distanță**, precum și `--dry-run` pentru previzualizare. Pentru a lansa un CLI cu mediul corespunzător injectat și fără a scrie nicio configurație, utilizați lansatorul generic `omniroute run <target>` (claude, codex, aider, goose, opencode, qwen, gemini); lansatoarele vechi specifice fiecărui instrument, `omniroute launch` (Claude Code) și `omniroute launch-codex` (Codex), rămân disponibile.

Pentru tabelul complet (ce scrie fiecare comandă, toate opțiunile, local comparativ cu la distanță, convențiile `/v1` pentru URL-ul de bază), consultați **[Integrări CLI](./CLI-INTEGRATIONS.md)**.

Pentru configurarea detaliată a fiecărui instrument (Claude Code, Codex CLI, Cursor, Cline, OpenClaw, Kilo Code, Copilot și altele), consultați ghidul dedicat **[Ghidul instrumentelor CLI](../reference/CLI-TOOLS.md)**.

---

## Configurarea protocoalelor (MCP + A2A)

### Configurarea MCP (Model Context Protocol)

Porniți transportul MCP în modul stdio:

```bash
omniroute --mcp
```

Flux de validare recomandat:

```bash
# 1. Porniți serverul MCP
omniroute --mcp

# 2. Din clientul MCP, apelați:
omniroute_get_health        # Ar trebui să returneze starea sistemului
omniroute_list_combos       # Ar trebui să returneze combinațiile active

# 3. Sau rulați suita E2E completă:
npm run test:protocols:e2e
```

#### Configurarea clientului MCP

**Claude Code:**

```bash
claude mcp add-server omniroute --type http --url http://localhost:20128/api/mcp/stream
```

**Cursor / Cline:**

Adăugați în setările MCP:

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

**Documentația MCP completă:** [README-ul serverului MCP](../../open-sse/mcp-server/README.md) — 110 instrumente, configurații IDE, clienți Python/TS/Go.

### Configurarea A2A (Agent-to-Agent Protocol)

Verificați Agent Card:

```bash
curl http://localhost:20128/.well-known/agent.json
```

Trimiteți o sarcină:

```bash
curl -X POST http://localhost:20128/a2a \
  -H 'content-type: application/json' \
  -d '{"jsonrpc":"2.0","id":"quickstart","method":"message/send","params":{"skill":"quota-management","messages":[{"role":"user","content":"Oferă-mi un rezumat scurt al cotelor."}]}}'
```

**Documentația A2A completă:** [README-ul serverului A2A](../../src/lib/a2a/README.md) — JSON-RPC 2.0, abilități, streaming, ciclul de viață al sarcinilor.

---

## Configurarea timeouturilor

### Timeouturi de bază

Pentru majoritatea implementărilor, aveți nevoie doar de aceste două variabile:

| Variabilă                | Valoare implicită               | Scop                                                                                                                                                                                      |
| ------------------------ | ------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `REQUEST_TIMEOUT_MS`     | `600000`                        | Valoare de bază comună pentru timeoutul de începere a răspunsului upstream, timeouturile Undici ascunse, solicitările de amprentă TLS și timeouturile solicitărilor/proxy-ului punții API |
| `STREAM_IDLE_TIMEOUT_MS` | moștenește `REQUEST_TIMEOUT_MS` | Intervalul maxim dintre fragmentele fluxului înainte ca OmniRoute să întrerupă fluxul SSE                                                                                                 |

Compatibilitatea cu versiunile anterioare este păstrată: variabilele existente `FETCH_TIMEOUT_MS`, `API_BRIDGE_PROXY_TIMEOUT_MS` și alte variabile de timeout specifice fiecărui nivel continuă să funcționeze și suprascriu valoarea de bază comună.

### Note specifice furnizorilor

Pentru serviciile upstream compatibile cu Claude Code (`anthropic-compatible-cc-*`), OmniRoute derivă antetul outbound `X-Stainless-Timeout` din timeoutul de preluare determinat, astfel încât timeouturile de citire de la nivelul furnizorului să rămână aliniate cu configurația variabilelor de mediu.

Pentru proxy-urile inverse terțe compatibile cu Claude Code, OmniRoute păstrează setul implicit `anthropic-beta` la un nivel conservator și, când `Client Cache Control` este lăsat pe `Auto`, transmite doar marcajele `cache_control` furnizate de client. Activați comutatorul per conexiune „Enable redact-thinking beta” numai atunci când serviciul upstream necesită în mod explicit fluxuri de raționament Claude redactate.

### Suprascrieri avansate ale timeouturilor

| Variabilă                                | Valoare implicită                            | Scop                                                                                                  |
| ---------------------------------------- | -------------------------------------------- | ----------------------------------------------------------------------------------------------------- |
| `FETCH_TIMEOUT_MS`                       | moștenește `REQUEST_TIMEOUT_MS`              | Timeoutul de începere a răspunsului upstream utilizat până la sosirea anteturilor răspunsului         |
| `FETCH_HEADERS_TIMEOUT_MS`               | moștenește `FETCH_TIMEOUT_MS`                | Limita de timp Undici pentru primirea anteturilor răspunsului upstream                                |
| `FETCH_BODY_TIMEOUT_MS`                  | moștenește `FETCH_TIMEOUT_MS`                | Limita de timp Undici dintre fragmentele corpului upstream (`0` o dezactivează)                       |
| `FETCH_CONNECT_TIMEOUT_MS`               | `30000`                                      | Timeoutul Undici pentru conexiunea TCP                                                                |
| `FETCH_KEEPALIVE_TIMEOUT_MS`             | `4000`                                       | Timeoutul Undici pentru un socket keep-alive inactiv                                                  |
| `TLS_CLIENT_TIMEOUT_MS`                  | moștenește `FETCH_TIMEOUT_MS`                | Timeoutul solicitărilor de amprentă TLS efectuate prin `wreq-js`                                      |
| `API_BRIDGE_PROXY_TIMEOUT_MS`            | moștenește `REQUEST_TIMEOUT_MS` sau `600000` | Timeoutul pentru redirecționarea prin proxy a căii `/v1` de la portul API la portul tabloului de bord |
| `API_BRIDGE_SERVER_REQUEST_TIMEOUT_MS`   | `max(API_BRIDGE_PROXY_TIMEOUT_MS, 300000)`   | Timeoutul solicitărilor primite pe serverul punții API                                                |
| `API_BRIDGE_SERVER_HEADERS_TIMEOUT_MS`   | `60000`                                      | Timeoutul anteturilor primite pe serverul punții API                                                  |
| `API_BRIDGE_SERVER_KEEPALIVE_TIMEOUT_MS` | `5000`                                       | Timeoutul keep-alive pe serverul punții API                                                           |
| `API_BRIDGE_SERVER_SOCKET_TIMEOUT_MS`    | `0`                                          | Timeoutul de inactivitate al socketului pe serverul punții API (`0` îl dezactivează)                  |

> **Notă:** Pentru solicitările de streaming, `FETCH_TIMEOUT_MS` acoperă doar configurarea conexiunii / așteptarea primului răspuns upstream. După ce fluxul devine activ, OmniRoute îl va întrerupe numai în cazul unui blocaj efectiv (`STREAM_IDLE_TIMEOUT_MS`) sau al inactivității corpului Undici (`FETCH_BODY_TIMEOUT_MS`).

### Compatibilitatea cu proxy-urile inverse

Dacă rulați OmniRoute în spatele Nginx, Caddy, Cloudflare sau al altui proxy invers, asigurați-vă că timeouturile proxy-ului sunt, de asemenea, mai mari decât timeouturile de flux/preluare OmniRoute.

---

## Modul cu porturi separate

Rulați API-ul și Panoul de control pe porturi separate pentru scenarii avansate (proxy invers, rețelistică pentru containere):

```bash
PORT=20128 DASHBOARD_PORT=20129 omniroute
# API:              http://localhost:20128/v1
# Panou de control: http://localhost:20129
```

---

## Șablon pentru Void Linux (xbps-src)

Utilizatorii Void Linux pot construi un pachet nativ folosind `xbps-src`. Salvați acest bloc ca `srcpkgs/omniroute/template`:

```bash
# Fișier șablon pentru „omniroute”
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
# Regenerați suma de control pentru fiecare versiune cu:
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

## Dezinstalare

| Comandă                  | Acțiune                                                                                           |
| ------------------------ | ------------------------------------------------------------------------------------------------- |
| `npm run uninstall`      | Elimină aplicația din sistem, dar **păstrează baza de date și configurațiile** în `~/.omniroute`. |
| `npm run uninstall:full` | Elimină aplicația ȘI **șterge definitiv toate configurațiile, cheile și bazele de date**.         |

> Pentru instrucțiuni detaliate de dezinstalare pentru toate metodele, consultați [UNINSTALL.md](./UNINSTALL.md).
