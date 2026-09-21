# 📖 Setup Guide — OmniRoute (Lietuvių)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/SETUP_GUIDE.md) · 🇪🇹 [am](../../../am/docs/guides/SETUP_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/guides/SETUP_GUIDE.md) · 🇦🇿 [az](../../../az/docs/guides/SETUP_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/guides/SETUP_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/guides/SETUP_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/guides/SETUP_GUIDE.md) · 🇩🇰 [da](../../../da/docs/guides/SETUP_GUIDE.md) · 🇩🇪 [de](../../../de/docs/guides/SETUP_GUIDE.md) · 🇬🇷 [el](../../../el/docs/guides/SETUP_GUIDE.md) · 🇪🇸 [es](../../../es/docs/guides/SETUP_GUIDE.md) · 🇪🇪 [et](../../../et/docs/guides/SETUP_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/guides/SETUP_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/guides/SETUP_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/guides/SETUP_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/guides/SETUP_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/guides/SETUP_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/guides/SETUP_GUIDE.md) · 🇮🇱 [he](../../../he/docs/guides/SETUP_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/guides/SETUP_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/guides/SETUP_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/guides/SETUP_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/guides/SETUP_GUIDE.md) · 🇮🇩 [id](../../../id/docs/guides/SETUP_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/guides/SETUP_GUIDE.md) · 🇮🇹 [it](../../../it/docs/guides/SETUP_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/guides/SETUP_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/guides/SETUP_GUIDE.md) · 🇰🇭 [km](../../../km/docs/guides/SETUP_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/guides/SETUP_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/guides/SETUP_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/guides/SETUP_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/guides/SETUP_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/guides/SETUP_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/guides/SETUP_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/guides/SETUP_GUIDE.md) · 🇲🇲 [my](../../../my/docs/guides/SETUP_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/guides/SETUP_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/guides/SETUP_GUIDE.md) · 🇳🇴 [no](../../../no/docs/guides/SETUP_GUIDE.md) · 🇮🇳 [or](../../../or/docs/guides/SETUP_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/guides/SETUP_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/guides/SETUP_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/guides/SETUP_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/guides/SETUP_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/SETUP_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/guides/SETUP_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/guides/SETUP_GUIDE.md) · 🇱🇰 [si](../../../si/docs/guides/SETUP_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/guides/SETUP_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/guides/SETUP_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/guides/SETUP_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/guides/SETUP_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/guides/SETUP_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/guides/SETUP_GUIDE.md) · 🇮🇳 [te](../../../te/docs/guides/SETUP_GUIDE.md) · 🇹🇭 [th](../../../th/docs/guides/SETUP_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/guides/SETUP_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/SETUP_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/guides/SETUP_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/guides/SETUP_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/guides/SETUP_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/guides/SETUP_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/SETUP_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/SETUP_GUIDE.md)

---

> Išsami „OmniRoute“ sąrankos dokumentacija. Trumpąją versiją rasite [README greitosios pradžios skiltyje](../README.md#-quick-start).

## Turinys

- [Diegimo būdai](#install-methods)
- [CLI įrankio konfigūravimas](#cli-tool-configuration)
- [Protokolų sąranka (MCP + A2A)](#protocol-setup-mcp--a2a)
- [Skirtojo laiko konfigūravimas](#timeout-configuration)
- [Atskirų prievadų režimas](#split-port-mode)
- [Void Linux (xbps-src)](#void-linux-xbps-src-template)
- [Šalinimas](#uninstalling)

---

## Diegimo būdai

### npm (rekomenduojama)

```bash
npm install -g omniroute
omniroute
```

Valdymo skydelis atidaromas adresu `http://localhost:20128`, o bazinis API URL yra `http://localhost:20128/v1`.

### pnpm

```bash
pnpm add -g omniroute@latest --allow-build=better-sqlite3 --allow-build=@swc/core
omniroute
```

> **pnpm naudotojams:** vėliavėlė `--allow-build` būtina norint įjungti vietinius `better-sqlite3` ir `@swc/core` kūrimo scenarijus. Komanda `pnpm approve-builds -g` nepalaikoma visuotiniams diegimams naudojant pnpm v11.

### Arch Linux (AUR)

```bash
yay -S omniroute-bin
systemctl --user enable --now omniroute.service
```

[AUR paketas](https://aur.archlinux.org/packages/omniroute-bin) įdiegia „OmniRoute“ ir pateikia systemd naudotojo paslaugą.

### Iš pirminio kodo

```bash
npm install
PORT=20128 DASHBOARD_PORT=20129 NEXT_PUBLIC_BASE_URL=http://localhost:20129 npm run dev
```

> **Pastaba „Windows“ naudotojams:** pagal numatytąsias nuostatas „OmniRoute“ naudoja `%APPDATA%\omniroute`, kai senojo `%USERPROFILE%\.omniroute` katalogo nėra. Norėdami pasirinkti kitą duomenų katalogo vietą, nustatykite `DATA_DIR`.

> **Pastaba:** pirmą kartą paleidus `npm install`, `.env` automatiškai sugeneruojamas iš `.env.example`. Vėlesni diegimai neperrašys esamo `.env`, todėl tinkinimai bus išsaugoti. Norėdami sugeneruoti jį iš naujo, prieš kartodami komandą ištrinkite `.env`.

### Docker

Išsamią „Docker“ sąranką, įskaitant „Compose“ profilius ir „Caddy HTTPS“, rasite [„Docker“ vadove](./DOCKER_GUIDE.md).

### Darbalaukio programa (Electron)

„OmniRoute“ pateikiama su darbalaukio apvalkalu, sukurtu naudojant Electron 41 ir electron-builder 26.10. Galimi scenarijai (darbo srities šakniniame kataloge):

```bash
npm run electron:dev          # Paleisti darbalaukio programą su automatiniu perkrovimu
npm run electron:build        # Sukurti dabartinei OS (aptinkama automatiškai)
npm run electron:build:win    # „Windows“ diegimo programa (NSIS + nešiojamoji versija)
npm run electron:build:mac    # macOS (dmg + zip, arm64+x64)
npm run electron:build:linux  # Linux (AppImage + deb + rpm)
npm run electron:smoke:packaged  # Atlikti supakuotos versijos bazinį patikrinimą
```

Darbalaukio diegimo programų leidimai pridedami prie „GitHub Releases“. Išsamų „Electron“ aprašą (pasirašymą, IPC tiltą, platinamuosius paketus) rasite [`ELECTRON_GUIDE.md`](./ELECTRON_GUIDE.md) _(sukurta vėlesniame etape)_.

### Serveris be grafinės sąsajos (CI / automatizavimas)

Neprižiūrimoms sąrankoms („Docker“, „Kubernetes“, CI) naudokite:

```bash
omniroute setup --non-interactive
omniroute providers test-batch
```

Naudojant kartu su aplinkos kintamaisiais (`INITIAL_PASSWORD`, `OMNIROUTE_WS_BRIDGE_SECRET` ir kt.), „OmniRoute“ egzempliorių galima visiškai automatizuotai paleisti scenarijais.

### CLI parinktys

| Komanda                 | Aprašas                                                                                 |
| ----------------------- | --------------------------------------------------------------------------------------- |
| `omniroute`             | Paleisti serverį (`PORT=20128`, API ir valdymo skydelis tame pačiame prievade)          |
| `omniroute setup`       | Interaktyvi pradinė CLI slaptažodžio ir pirmojo teikėjo sąranka                         |
| `omniroute doctor`      | Atlikti vietines būklės patikras nepaleidžiant serverio                                 |
| `omniroute providers`   | Aptikti, išvardyti, patikrinti ir išbandyti teikėjus per CLI                            |
| `omniroute config`      | CLI įrankio konfigūravimas — konfigūracijų sąrašas, gavimas, nustatymas ir tikrinimas   |
| `omniroute status`      | Neprisijungus pasiekiamas būsenos skydelis — versija, DB, įrankiai, konfigūracija       |
| `omniroute logs`        | Srautiniu būdu gauti naudojimo žurnalus iš API (palaiko `--follow`)                     |
| `omniroute update`      | Patikrinti arba pritaikyti „OmniRoute“ naujinimus                                       |
| `omniroute provider`    | Valdyti teikėjų ryšius — pridėti, išvardyti, pašalinti, išbandyti, nustatyti numatytąjį |
| `omniroute --port 3000` | Nustatyti pagrindinį / API prievadą į 3000                                              |
| `omniroute --mcp`       | Paleisti MCP serverį (stdio perdavimo būdas)                                            |
| `omniroute --no-open`   | Automatiškai neatidaryti naršyklės                                                      |
| `omniroute --help`      | Rodyti žinyną                                                                           |

Sąranką be grafinės sąsajos galima automatizuoti naudojant vėliavėles arba aplinkos kintamuosius:

```bash
omniroute setup --non-interactive --password "$OMNIROUTE_PASSWORD"
omniroute setup --non-interactive --add-provider --provider openai --api-key "$OPENAI_API_KEY"
omniroute setup --non-interactive --add-provider --provider openai --api-key "$OPENAI_API_KEY" --test-provider
```

Paleiskite vietinę diagnostiką neatidarydami valdymo skydelio:

```bash
omniroute doctor
omniroute doctor --json
omniroute doctor --no-liveness
```

Valdykite teikėjus per SSH arba scenarijus neatidarydami valdymo skydelio:

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

## CLI įrankio konfigūracija

### 1) Prijunkite teikėjus ir sukurkite API raktą

1. Atidarykite Dashboard → `Providers` ir prijunkite bent vieną teikėją („OAuth“ arba API raktu).
2. Atidarykite Dashboard → `Endpoints` ir sukurkite API raktą.
3. (Pasirinktinai) Atidarykite Dashboard → `Combos` ir nustatykite atsarginę grandinę.

### 2) Nukreipkite savo programavimo įrankį

```txt
Bazinis URL: http://localhost:20128/v1
API raktas:  [nukopijuokite iš Endpoint puslapio]
Modelis:     if/qwen3.8-max-preview (arba bet koks teikėjo/modelio prefiksas)
```

Jei jūsų redaktorius negali siųsti `Authorization: Bearer ...`, vietoje jo naudokite suderinamumo bazinį adresą su prieigos raktu:

```txt
Bazinis URL: http://localhost:20128/api/v1/vscode/YOUR_KEY/
Modelių URL: http://localhost:20128/api/v1/vscode/YOUR_KEY/models
Pokalbių URL: http://localhost:20128/api/v1/vscode/YOUR_KEY/chat/completions
Ollama žymų URL: http://localhost:20128/api/v1/vscode/YOUR_KEY/api/tags
```

Veikia su Claude Code, Codex CLI, Cursor, Cline, OpenClaw, OpenCode ir su OpenAI suderinamais SDK.

#### Automatinė konfigūracija naudojant `setup-*`

Užuot rankiniu būdu įvedę bazinį URL ir raktą, leiskite OmniRoute įrašyti kiekvieno įrankio
konfigūraciją pagal tiesioginį modelių katalogą. Kiekvienam įrankiui skirta po vieną komandą:

```bash
omniroute setup-codex        # ~/.codex/<name>.config.toml profiliai
omniroute setup-claude       # ~/.claude/profiles/<name>/settings.json
omniroute setup-opencode     # ~/.config/opencode/opencode.json (suderinama su openai)
omniroute setup-cline        # Cline CLI ir VS Code plėtinio nustatymai
omniroute setup-kilo         # Kilo Code
omniroute setup-continue     # ~/.continue/config.yaml (Continue / cn)
omniroute setup-cursor       # išveda veiksmus, kuriuos reikia atlikti Cursor programoje
omniroute setup-roo          # Roo Code importavimas ir autoImport nuoroda
omniroute setup-crush        # ~/.config/crush/crush.json
omniroute setup-goose        # ~/.config/goose/config.yaml
omniroute setup-aider        # ~/.aider.conf.yml
omniroute setup-qwen         # ~/.qwen/settings.json ir ~/.qwen/.env
```

Kiekviena komanda priima `--remote <url> --api-key <key>`, kad vietinis įrankis būtų sukonfigūruotas naudoti
**nuotolinį** OmniRoute, taip pat `--dry-run`, skirtą peržiūrai. Norėdami paleisti CLI su įterptais
tinkamais aplinkos kintamaisiais ir visiškai neįrašyti konfigūracijos, naudokite bendrąją paleidimo komandą
`omniroute run <target>` (claude, codex, aider, goose, opencode, qwen, gemini);
senesnės konkretiems įrankiams skirtos paleidimo komandos `omniroute launch` (Claude Code) ir
`omniroute launch-codex` (Codex) tebėra pasiekiamos.

Visą lentelę (ką įrašo kiekviena komanda, visas parinktis, vietinį ir nuotolinį režimus, bazinio URL
`/v1` taisykles) rasite **[CLI integracijų dokumentacijoje](./CLI-INTEGRATIONS.md)**.

Išsamią kiekvieno įrankio konfigūraciją (Claude Code, Codex CLI, Cursor, Cline, OpenClaw, Kilo Code, Copilot ir kt.) rasite specialiame **[CLI įrankių vadove](../reference/CLI-TOOLS.md)**.

---

## Protokolų sąranka (MCP + A2A)

### MCP sąranka (Model Context Protocol)

Paleiskite MCP transportą stdio režimu:

```bash
omniroute --mcp
```

Rekomenduojama tikrinimo eiga:

```bash
# 1. Paleiskite MCP serverį
omniroute --mcp

# 2. Iš savo MCP kliento iškvieskite:
omniroute_get_health        # Turėtų grąžinti sistemos būklę
omniroute_list_combos       # Turėtų grąžinti aktyvius derinius

# 3. Arba paleiskite visą E2E testų rinkinį:
npm run test:protocols:e2e
```

#### MCP kliento konfigūracija

**Claude Code:**

```bash
claude mcp add-server omniroute --type http --url http://localhost:20128/api/mcp/stream
```

**Cursor / Cline:**

Pridėkite prie savo MCP nustatymų:

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

**Visa MCP dokumentacija:** [MCP serverio README](../../open-sse/mcp-server/README.md) — 110 įrankių, IDE konfigūracijos, Python/TS/Go klientai.

### A2A sąranka (Agent-to-Agent Protocol)

Patikrinkite agento kortelę:

```bash
curl http://localhost:20128/.well-known/agent.json
```

Išsiųskite užduotį:

```bash
curl -X POST http://localhost:20128/a2a \
  -H 'content-type: application/json' \
  -d '{"jsonrpc":"2.0","id":"quickstart","method":"message/send","params":{"skill":"quota-management","messages":[{"role":"user","content":"Give me a short quota summary."}]}}'
```

**Visa A2A dokumentacija:** [A2A serverio README](../../src/lib/a2a/README.md) — JSON-RPC 2.0, įgūdžiai, srautinis perdavimas, užduočių gyvavimo ciklas.

---

## Skirtojo laiko konfigūracija

### Pagrindiniai skirtojo laiko nustatymai

Daugumai diegimų reikia tik šių dviejų kintamųjų:

| Kintamasis               | Numatytoji reikšmė          | Paskirtis                                                                                                                                                                       |
| ------------------------ | --------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `REQUEST_TIMEOUT_MS`     | `600000`                    | Bendroji bazinė reikšmė išorinio serverio atsako pradžios, paslėptiems Undici, TLS kontrolinio atspaudo užklausų ir API tilto užklausų / tarpinio serverio skirtiesiems laikams |
| `STREAM_IDLE_TIMEOUT_MS` | perima `REQUEST_TIMEOUT_MS` | Didžiausias tarpas tarp srautinio perdavimo fragmentų, kuriam praėjus OmniRoute nutraukia SSE srautą                                                                            |

Atgalinis suderinamumas išlaikomas: esami `FETCH_TIMEOUT_MS`, `API_BRIDGE_PROXY_TIMEOUT_MS` ir kiti kiekvieno sluoksnio skirtojo laiko kintamieji vis dar veikia ir pakeičia bendrąją bazinę reikšmę.

### Pastabos, susijusios su teikėjais

Su Claude Code suderinamiems išoriniams serveriams (`anthropic-compatible-cc-*`) OmniRoute nustato siunčiamą `X-Stainless-Timeout` antraštę pagal apskaičiuotą gavimo skirtąjį laiką, kad teikėjo skaitymo skirtasis laikas atitiktų jūsų aplinkos konfigūraciją.

Naudojant trečiųjų šalių su Claude Code suderinamus atvirkštinius tarpinius serverius, OmniRoute išlaiko konservatyvų numatytąjį `anthropic-beta` rinkinį ir, kai `Client Cache Control` paliekamas kaip `Auto`, persiunčia tik kliento pateiktas `cache_control` žymas. Įjunkite kiekvienam ryšiui skirtą „Enable redact-thinking beta“ parinktį tik tada, kai išorinis serveris aiškiai reikalauja redaguotų Claude mąstymo srautų.

### Išplėstiniai skirtojo laiko perrašymai

| Kintamasis                               | Numatytoji reikšmė                         | Paskirtis                                                                                 |
| ---------------------------------------- | ------------------------------------------ | ----------------------------------------------------------------------------------------- |
| `FETCH_TIMEOUT_MS`                       | perima `REQUEST_TIMEOUT_MS`                | Išorinio serverio atsako pradžios skirtasis laikas, taikomas iki gaunant atsako antraštes |
| `FETCH_HEADERS_TIMEOUT_MS`               | perima `FETCH_TIMEOUT_MS`                  | Undici laiko riba išorinio serverio atsako antraštėms gauti                               |
| `FETCH_BODY_TIMEOUT_MS`                  | perima `FETCH_TIMEOUT_MS`                  | Undici laiko riba tarp išorinio serverio atsako turinio fragmentų (`0` ją išjungia)       |
| `FETCH_CONNECT_TIMEOUT_MS`               | `30000`                                    | Undici TCP ryšio užmezgimo skirtasis laikas                                               |
| `FETCH_KEEPALIVE_TIMEOUT_MS`             | `4000`                                     | Undici neaktyvaus palaikomojo ryšio lizdo skirtasis laikas                                |
| `TLS_CLIENT_TIMEOUT_MS`                  | perima `FETCH_TIMEOUT_MS`                  | TLS kontrolinio atspaudo užklausų, vykdomų per `wreq-js`, skirtasis laikas                |
| `API_BRIDGE_PROXY_TIMEOUT_MS`            | perima `REQUEST_TIMEOUT_MS` arba `600000`  | `/v1` tarpinio persiuntimo iš API prievado į valdymo skydelio prievadą skirtasis laikas   |
| `API_BRIDGE_SERVER_REQUEST_TIMEOUT_MS`   | `max(API_BRIDGE_PROXY_TIMEOUT_MS, 300000)` | API tilto serverio gaunamos užklausos skirtasis laikas                                    |
| `API_BRIDGE_SERVER_HEADERS_TIMEOUT_MS`   | `60000`                                    | API tilto serverio gaunamų antraščių skirtasis laikas                                     |
| `API_BRIDGE_SERVER_KEEPALIVE_TIMEOUT_MS` | `5000`                                     | API tilto serverio palaikomojo ryšio skirtasis laikas                                     |
| `API_BRIDGE_SERVER_SOCKET_TIMEOUT_MS`    | `0`                                        | API tilto serverio lizdo neveiklumo skirtasis laikas (`0` jį išjungia)                    |

> **Pastaba:** Srautinio perdavimo užklausoms `FETCH_TIMEOUT_MS` taikomas tik ryšio užmezgimui / pirmojo išorinio serverio atsako laukimui. Kai srautas tampa aktyvus, OmniRoute jį nutraukia tik esant faktinei prastovai (`STREAM_IDLE_TIMEOUT_MS`) arba Undici atsako turinio neveiklumui (`FETCH_BODY_TIMEOUT_MS`).

### Suderinamumas su atvirkštiniu tarpiniu serveriu

Jei OmniRoute naudojate už Nginx, Caddy, Cloudflare ar kito atvirkštinio tarpinio serverio, įsitikinkite, kad tarpinio serverio skirtieji laikai taip pat yra ilgesni už OmniRoute srauto / gavimo skirtuosius laikus.

---

## Atskirų prievadų režimas

Paleiskite API ir valdymo skydelį naudodami atskirus prievadus išplėstiniams scenarijams (atvirkštiniam tarpiniam serveriui, konteinerių tinklui):

```bash
PORT=20128 DASHBOARD_PORT=20129 omniroute
# API:               http://localhost:20128/v1
# Valdymo skydelis:  http://localhost:20129
```

---

## Void Linux (`xbps-src`) šablonas

Void Linux naudotojai gali sukurti vietinį paketą naudodami `xbps-src`. Išsaugokite šį bloką kaip `srcpkgs/omniroute/template`:

```bash
# „omniroute“ šablono failas
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
# Kiekvienam leidimui iš naujo sugeneruokite kontrolinę sumą naudodami:
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

## Pašalinimas

| Komanda                  | Veiksmas                                                                                       |
| ------------------------ | ---------------------------------------------------------------------------------------------- |
| `npm run uninstall`      | Pašalina sistemos programą, bet **išsaugo jūsų DB ir konfigūracijas** kataloge `~/.omniroute`. |
| `npm run uninstall:full` | Pašalina programą IR visam laikui **ištrina visas konfigūracijas, raktus ir duomenų bazes**.   |

> Išsamias pašalinimo instrukcijas visiems metodams rasite [UNINSTALL.md](./UNINSTALL.md).
