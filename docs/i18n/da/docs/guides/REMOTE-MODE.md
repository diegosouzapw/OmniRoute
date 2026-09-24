# Remote Mode (Dansk)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/REMOTE-MODE.md) · 🇪🇹 [am](../../../am/docs/guides/REMOTE-MODE.md) · 🇸🇦 [ar](../../../ar/docs/guides/REMOTE-MODE.md) · 🇦🇿 [az](../../../az/docs/guides/REMOTE-MODE.md) · 🇧🇬 [bg](../../../bg/docs/guides/REMOTE-MODE.md) · 🇧🇩 [bn](../../../bn/docs/guides/REMOTE-MODE.md) · 🇧🇦 [bs](../../../bs/docs/guides/REMOTE-MODE.md) · 🇨🇿 [cs](../../../cs/docs/guides/REMOTE-MODE.md) · 🇩🇪 [de](../../../de/docs/guides/REMOTE-MODE.md) · 🇬🇷 [el](../../../el/docs/guides/REMOTE-MODE.md) · 🇪🇸 [es](../../../es/docs/guides/REMOTE-MODE.md) · 🇪🇪 [et](../../../et/docs/guides/REMOTE-MODE.md) · 🇮🇷 [fa](../../../fa/docs/guides/REMOTE-MODE.md) · 🇫🇮 [fi](../../../fi/docs/guides/REMOTE-MODE.md) · 🇫🇷 [fr](../../../fr/docs/guides/REMOTE-MODE.md) · 🇮🇪 [ga](../../../ga/docs/guides/REMOTE-MODE.md) · 🇮🇳 [gu](../../../gu/docs/guides/REMOTE-MODE.md) · 🇳🇬 [ha](../../../ha/docs/guides/REMOTE-MODE.md) · 🇮🇱 [he](../../../he/docs/guides/REMOTE-MODE.md) · 🇮🇳 [hi](../../../hi/docs/guides/REMOTE-MODE.md) · 🇭🇷 [hr](../../../hr/docs/guides/REMOTE-MODE.md) · 🇭🇺 [hu](../../../hu/docs/guides/REMOTE-MODE.md) · 🇦🇲 [hy](../../../hy/docs/guides/REMOTE-MODE.md) · 🇮🇩 [id](../../../id/docs/guides/REMOTE-MODE.md) · 🇳🇬 [ig](../../../ig/docs/guides/REMOTE-MODE.md) · 🇮🇹 [it](../../../it/docs/guides/REMOTE-MODE.md) · 🇯🇵 [ja](../../../ja/docs/guides/REMOTE-MODE.md) · 🇬🇪 [ka](../../../ka/docs/guides/REMOTE-MODE.md) · 🇰🇭 [km](../../../km/docs/guides/REMOTE-MODE.md) · 🇮🇳 [kn](../../../kn/docs/guides/REMOTE-MODE.md) · 🇰🇷 [ko](../../../ko/docs/guides/REMOTE-MODE.md) · 🇱🇹 [lt](../../../lt/docs/guides/REMOTE-MODE.md) · 🇱🇻 [lv](../../../lv/docs/guides/REMOTE-MODE.md) · 🇮🇳 [ml](../../../ml/docs/guides/REMOTE-MODE.md) · 🇮🇳 [mr](../../../mr/docs/guides/REMOTE-MODE.md) · 🇲🇾 [ms](../../../ms/docs/guides/REMOTE-MODE.md) · 🇲🇹 [mt](../../../mt/docs/guides/REMOTE-MODE.md) · 🇲🇲 [my](../../../my/docs/guides/REMOTE-MODE.md) · 🇳🇵 [ne](../../../ne/docs/guides/REMOTE-MODE.md) · 🇳🇱 [nl](../../../nl/docs/guides/REMOTE-MODE.md) · 🇳🇴 [no](../../../no/docs/guides/REMOTE-MODE.md) · 🇮🇳 [or](../../../or/docs/guides/REMOTE-MODE.md) · 🇮🇳 [pa](../../../pa/docs/guides/REMOTE-MODE.md) · 🇵🇭 [phi](../../../phi/docs/guides/REMOTE-MODE.md) · 🇵🇱 [pl](../../../pl/docs/guides/REMOTE-MODE.md) · 🇵🇹 [pt](../../../pt/docs/guides/REMOTE-MODE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/REMOTE-MODE.md) · 🇷🇴 [ro](../../../ro/docs/guides/REMOTE-MODE.md) · 🇷🇺 [ru](../../../ru/docs/guides/REMOTE-MODE.md) · 🇱🇰 [si](../../../si/docs/guides/REMOTE-MODE.md) · 🇸🇰 [sk](../../../sk/docs/guides/REMOTE-MODE.md) · 🇸🇮 [sl](../../../sl/docs/guides/REMOTE-MODE.md) · 🇷🇸 [sr](../../../sr/docs/guides/REMOTE-MODE.md) · 🇸🇪 [sv](../../../sv/docs/guides/REMOTE-MODE.md) · 🇰🇪 [sw](../../../sw/docs/guides/REMOTE-MODE.md) · 🇮🇳 [ta](../../../ta/docs/guides/REMOTE-MODE.md) · 🇮🇳 [te](../../../te/docs/guides/REMOTE-MODE.md) · 🇹🇭 [th](../../../th/docs/guides/REMOTE-MODE.md) · 🇹🇷 [tr](../../../tr/docs/guides/REMOTE-MODE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/REMOTE-MODE.md) · 🇵🇰 [ur](../../../ur/docs/guides/REMOTE-MODE.md) · 🇺🇿 [uz](../../../uz/docs/guides/REMOTE-MODE.md) · 🇻🇳 [vi](../../../vi/docs/guides/REMOTE-MODE.md) · 🇳🇬 [yo](../../../yo/docs/guides/REMOTE-MODE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/REMOTE-MODE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/REMOTE-MODE.md)

---

Kør `omniroute`-CLI'en på din bærbare computer, mens OmniRoute selv kører et andet sted
(en VPS, en hjemmeserver eller en anden maskine på dit Tailnet). Du logger ind én gang med
`omniroute connect`, og derefter er **alle** CLI-kommandoer rettet mod den eksterne
server — samme kommandoer, samme output, blot udført mod den eksterne server.

Der er ikke noget ekstra værktøj, der skal installeres: fjerntilstand er den almindelige `omniroute`-CLI
plus afgrænsede **adgangstokens**.

```bash
npm install -g omniroute                 # den normale CLI
omniroute connect 192.168.0.15           # log ind (adgangskode → afgrænset token)
omniroute models list                    # ← viser nu FJERNSERVERENS modeller
omniroute configure codex                # ← skriver en lokal Codex-profil fra fjernkataloget
```

---

## Sådan fungerer det

```
din bærbare computer                     ekstern OmniRoute (VPS)
┌────────────────────┐                   ┌───────────────────────────────┐
│ omniroute-CLI      │  POST /api/cli/connect  (adgangskode → token)      │
│  kontekst: vps     │ ───────────────►  │ udsteder et afgrænset adgangstoken │
│  baseUrl, token    │  Authorization: Bearer oma_live_…                  │
│                    │ ───────────────►  │ hver administrationsrute,      │
│ skriver konfigurationer │ ◄───────────────  │ kontrolleret mod tokenets omfang │
│ LOKALT             │                   └───────────────────────────────┘
└────────────────────┘
```

- **Kontekster** gemmer én server hver (`~/.omniroute/config.json`, `chmod 600`).
  `omniroute contexts use <name>` skifter den aktive server; `default` er lokal.
- **Adgangstokens** (`oma_live_…`) godkender administrationskommandoer. De er
  forskellige fra API-nøgler til inferens (`sk-…`, der bruges til `/v1/chat/completions`).
- Kun SHA-256-hashen af et token gemmes på serversiden. Klarteksten vises
  **én gang**, når tokenet oprettes.

---

## Opret forbindelse

### Med administrationsadgangskoden (bootstrap)

```bash
omniroute connect 192.168.0.15
# Administrationsadgangskode til http://192.168.0.15:20128: ********
# ✔ Forbundet til http://192.168.0.15:20128 — kontekst '192.168.0.15' (omfang: admin)
```

Adgangskodeflowet udsteder som standard et **admin**-token (du har adgangskoden, så
du har allerede fuld kontrol). Begræns omfanget med `--scope`:

```bash
omniroute connect 192.168.0.15 --scope write
```

Valgmuligheder: `--port <p>` (når værten ikke har nogen port), `--name <ctx>` (kontekstnavn),
`--scope read|write|admin`. En fuld URL anvendes, som den er:
`omniroute connect https://omni.example.com`.

### Med et forhåndsgenereret token

Generér et afgrænset token i kontrolpanelet (eller med `omniroute tokens create`), og
indsæt det — der kræves ingen adgangskode:

```bash
omniroute connect 192.168.0.15 --key oma_live_xxxxxxxx
```

CLI'en validerer det via `GET /api/cli/whoami` og gemmer det som den aktive kontekst.

---

## Omfang

Tre hierarkiske niveauer (`admin ⊃ write ⊃ read`):

| Omfang  | Kan gøre                                                                                   |
| ------- | ------------------------------------------------------------------------------------------ |
| `read`  | vise/inspicere — `models list`, `providers status`, `logs`, `usage`, `cost`                |
| `write` | læse **+** konfigurere/anvende — `setup-codex`, `keys add`, `config set`, kombinationer    |
| `admin` | skrive **+** administrere — CRUD for `tokens`, tilføje udbydere, tjenester, politik, oauth |

Serveren udleder det omfang, som hver rute kræver, ud fra HTTP-metoden
(`GET`→read, ændringer→write) samt en admin-tilladelsesliste for følsomme områder
(`/api/cli/tokens`, ændringer af `/api/providers`, `/api/oauth`, `/api/services`, …).
Et token med utilstrækkeligt omfang får `403` med en tydelig meddelelse.

> Ruter, der starter processer (`/api/services/*`, `/api/mcp/*`, …), forbliver
> **begrænset til loopback** — et eksternt token kan aldrig tilgå dem, uanset omfang.

## Forbindelse til Antigravity på en fjerninstallation

Antigravity bruger Googles samtykkeskærm til firstparty/nativeapp. Google frigiver
kun godkendelseskoden, når **loopback-omdirigeringen**
(`http://127.0.0.1:<port>/callback`) er **tilgængelig fra den browser, der
godkender login**. På en fjerninstallation på en VPS findes denne loopback på
serveren, ikke på din maskine, så samtykkeskærmen **hænger for evigt og udsender
aldrig en kode** — den normale reserveløsning med at "indsætte callback-URL'en" har
intet at indsætte. (Dette er en begrænsning hos Google: Det samme problem opstår i
enhver proxy, der bruger den medfølgende Antigravity-desktopklient, ikke kun
OmniRoute.)

Dashboardet registrerer dette, før du sidder fast: Hvis du åbner **Providers → Antigravity →
Connect** fra en adresse, der ikke er localhost, erstattes den generelle meddelelse
om at "kopiere callback-URL'en" med de to løsninger nedenfor, hvor din vært og port
allerede er udfyldt. (En LAN-adresse tæller med — `192.168.x.x` er ikke localhost,
hvad denne callback angår.)

Der er to understøttede måder at forbinde Antigravity med en ekstern OmniRoute på.

### Mulighed A — lokal loginhjælper (anbefales)

Kør OAuth på **din egen computer**, hvor `127.0.0.1` er tilgængelig. Hjælperen
kommunikerer direkte med Google, så samtykkeprocessen gennemføres dér, hvor
dashboardets version ikke kan.

**Hvis du allerede har oprettet forbindelse** (`omniroute connect <host>`), er der
intet at kopiere — hjælperen leverer legitimationsoplysningerne til installationen
for dig:

```bash
# På din LOKALE maskine (kræver Node.js + en browser):
omniroute connect 192.168.0.15        # én gang — opretter et konteksttoken med administratorrettigheder
npx omniroute login antigravity
#   ↳ åbner Googles samtykkeskærm, opfanger callbacket på en lokal loopback-port,
#     udveksler det og sender legitimationsoplysningerne via POST til den aktive kontekst:
#
#   Antigravity forbundet på http://192.168.0.15:20128 (forbindelse abc123).
#   Intet at indsætte — du kan lukke denne terminal.
```

Overførslen sker automatisk, når den aktive kontekst peger på en anden
maskine. Gennemtving den ene eller anden adfærd med `--push` / `--no-push`, eller
målret en bestemt kontekst med `--context <name>`.

**Hvis din maskine ikke kan nå VPS'en** (firewall, ingen SSH, fysisk isoleret
arbejdsstation), virker hjælperen stadig — den _behøver_ kun adgang til Google.
Brug `--no-push`, eller lad blot overførslen mislykkes: Den falder tilbage til at
udskrive blobben i stedet for at kassere en godkendelse, du allerede har
gennemført.

```bash
npx omniroute login antigravity --no-push
#   omniroute-cred-v1.eyJ2IjoxLCJ...
```

Gå derefter til det **eksterne** dashboard: **Providers → Antigravity → Connect**,
og indsæt `omniroute-cred-v1.…`-blobben i feltet **Step 2** (det accepterer enten
en callback-URL eller en legitimationsblob). OmniRoute afkoder den, kører Cloud
Code-klargøringen på serversiden og gemmer forbindelsen.

> Blobben indeholder et refresh-token — behandl det som en adgangskode. Ved
> overførsel sendes det én gang via din konteksts godkendte forbindelse; ved
> indsættelse sendes det via din dashboardforbindelse. I begge tilfælde gemmes det
> krypteret, og ved en vellykket overførsel udskrives det aldrig i din terminal.

Flag: `--no-browser` (udskriv URL'en i stedet for at åbne den automatisk),
`--port <n>` (fastlås loopback-porten), `--timeout <ms>`, `--push` / `--no-push`
(tilsidesæt den automatiske levering), `--context <name>` (målret en bestemt
kontekst).

### Mulighed B — lokal SSH-videresendelsestunnel

Hvis du har SSH-adgang til VPS'en, skal du videresende dashboardporten, så
loopback-callbacket dirigeres tilbage til serveren gennem tunnelen:

```bash
# På din LOKALE maskine:
ssh -L 20128:127.0.0.1:20128 user@your-vps
# åbn derefter http://localhost:20128 i din LOKALE browser, og forbind Antigravity
# som normalt — omdirigeringen til 127.0.0.1:20128/callback når nu VPS'en via SSH.
```

Fordi du tilgår dashboardet som `localhost:20128`, gennemføres Googles
samtykkeproces, og callbacket leveres til serveren gennem den samme tunnel —
ingen blob er nødvendig. Hold tunnelen åben, indtil forbindelsen vises som aktiv.

I modsætning til udbyderne med fast loopback nedenfor er **én videresendelse nok**
her: Antigravity-callbacket bruger selve dashboardporten, så der er ingen ekstra
udbyderspecifik port, der skal tunneleres.

> Et fuldstændigt headless-alternativ (ingen hjælper, ingen tunnel) er at
> konfigurere dine **egne** Google OAuth-weblegitimationsoplysninger + en offentlig
> basis-URL; se udbyderens OAuth-miljøvariabler. De to muligheder ovenfor kræver
> ingen yderligere Google-konfiguration.

---

## Tilslutning af Codex / Grok på en fjerninstallation (udbydere med fast loopback)

Codex, xAI (`xai-oauth`) og Grok CLI (`grok-cli`) registrerer en **fast**
loopback-`redirect_uri` hos deres upstream-OAuth-app. OmniRoute kan ikke ændre den —
udbyderen sender altid browseren tilbage til den samme hardkodede adresse:

| Udbyder     | Fast callback, som udbyderen omdirigerer til |
| ----------- | -------------------------------------------- |
| `codex`     | `http://localhost:1455/auth/callback`        |
| `xai-oauth` | `http://127.0.0.1:56121/callback`            |
| `grok-cli`  | `http://127.0.0.1:56122/callback`            |

`localhost` betyder her **maskinen, der kører browseren**, mens OmniRoutes
PKCE-callbackserver lytter på **serverens** loopback. Åbn dashboardet på en
LAN-adresse som `http://192.168.0.15:20128`, og de to mødes aldrig:
Godkendelseskoden leveres til din egen laptops `localhost:1455`, hvor intet
lytter, og udbyderen kan ikke gennemføre login uden at vise en fejl.

Dashboardet registrerer dette, før pop op-vinduet åbnes, og viser tunnelkommandoen
i stedet for at lade login mislykkes uden nogen synlig fejl (#8046).

### Løsning — videresend **begge** porte

```bash
# På maskinen, der kører BROWSEREN:
ssh -L 20128:127.0.0.1:20128 -L 1455:127.0.0.1:1455 <user>@192.168.0.15
# gå derefter til http://localhost:20128, og tilslut Codex derfra
```

Der kræves to videresendelser, og hvis kun én videresendes, mislykkes det stadig:

- **`20128`** (dashboardporten) gør origin til ægte localhost, hvilket er det,
  der får OmniRoute til overhovedet at starte PKCE-callbackserveren — en LAN-origin
  når aldrig denne gren.
- **`1455`** (udbyderens faste callbackport) er den port, browseren sendes tilbage
  til; den skal tunneleres videre til serverens loopback.

Udskift `1455` med `56121`/`56122`, når du tilslutter xAI eller Grok CLI, og
`20128` med din faktiske dashboardport. Hold tunnelen åben, indtil forbindelsen
vises som aktiv.

> **Ingen SSH-adgang?** Codex og Grok CLI accepterer også et indsat token — fanen
> **Indsæt API-nøgle** / **Importér auth.json** i forbindelsesdialogen. Denne metode
> har intet loopback-callback, så den fungerer fra enhver origin. Codex accepterer
> desuden et separat adgangstoken eller en `~/.codex/auth.json`-sessionsblob.

---

## Administration af tokens

```bash
omniroute tokens create --name "laptop" --scope write [--expires 30]
#   ↳ viser hemmeligheden ÉN GANG — kopiér den nu
omniroute tokens list                 # maskeret: id, navn, scope, præfiks, status, udløb
omniroute tokens revoke <id|prefix>   # tilbagekald med det samme
omniroute tokens scopes               # forklar de tre scopes
```

`tokens`-kommandoer kræver en **admin**-legitimationsoplysning. Du kan også
administrere tokens i dashboardet under **Indstillinger → Adgangstokens**
(opret, tilbagekald, kopiér én gang).

---

## Konfiguration af en kodnings-CLI fra fjernkataloget

`omniroute configure` læser den **aktive servers** aktuelle modelkatalog og
skriver en konfiguration på **din** maskine.

```bash
omniroute configure codex
#   Udbydere: glm, kmc, ollamacloud, opencode-go, …
#   Udbyder: glm
#   Model-id: glm/glm-5.2
#   ✔ Skrev ~/.codex/glm52.config.toml
#   Brug den:  codex --profile glm52

# ikke-interaktiv
omniroute configure codex --provider glm --model glm/glm-5.2 --name glm52

# behold en ofte anvendt model øverst i den interaktive vælger
omniroute configure codex --provider glm --model glm/glm-5.2 --favorite --yes
```

Vælgeren gemmer kun model-id'er (aldrig URL'er eller legitimationsoplysninger) i
den lokale `model-preferences.json`-fil, afgrænset efter kontekst og CLI-mål.
Favoritter vises før de seneste valg; brug `--unfavorite` til at fjerne en valgt
model fra listen for den pågældende kontekst og det pågældende mål.

Den skrevne profil refererer til inferensnøglen via en miljøvariabel
(`OMNIROUTE_API_KEY`) — hemmeligheden skrives aldrig til disken. Se
[CODEX-CLI-CONFIGURATION.md](./CODEX-CLI-CONFIGURATION.md) for den
engangsbaserede opsætning af Codex (`[model_providers.omniroute]`-blokken).

### Start af en CLI mod fjernserveren (ingen konfiguration skrives)

`omniroute run <target>` respekterer også den aktive kontekst: Fjernserverens
basis-URL og kontekstens legitimationsoplysninger injiceres kun i den startede
proces.

```bash
omniroute connect 192.168.0.15
omniroute run claude   --model openai/gpt-5.4          # Claude Code → fjernserver
omniroute run gemini   --model glm/glm-5.2 -- --skip-trust -p "hello"
omniroute run opencode --model glm/glm-5.2 -- run "reply OK"

# Se præcis, hvad der ville blive startet (kun miljøvariablernes NØGLENAVNE, aldrig værdier):
omniroute run codex --dry-run --json
```

Mål: `claude`, `codex`, `aider`, `goose`, `opencode`, `qwen`, `gemini`
(én fælles kilde: `bin/cli/cli-manifest.mjs`). Qwen og Gemini kører med en
midlertidig, isoleret hjemmemappe, der fjernes ved afslutning, så starten aldrig
berører — eller lækker ind i — din personlige værktøjskonfiguration.

### Opsætningskommandoer for hver CLI

Hver understøttet CLI har en fjernserverbevidst opsætningskommando (alle
respekterer den aktive kontekst eller `--remote <url> --api-key <key>`):

| CLI         | Kommando                   | Hvad den skriver                                                                                                                                                                |
| ----------- | -------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Codex       | `omniroute setup-codex`    | `~/.codex/<name>.config.toml`-profiler (pr. model)                                                                                                                              |
| Claude Code | `omniroute setup-claude`   | `~/.claude/profiles/<name>/settings.json` (pr. model)                                                                                                                           |
| OpenCode    | `omniroute setup-opencode` | `~/.config/opencode/opencode.json` — den OpenAI-kompatible `omniroute`-udbyder med alle katalogmodeller (kør `opencode -m omniroute/<model>`)                                   |
| Cline       | `omniroute setup-cline`    | `~/.cline/data/{globalState,secrets}.json` (CLI-tilstand) + viser indstillingerne til VS Code-udvidelsen, som skal indsættes (OpenAI-kompatibel, basis-URL **uden** `/v1`)      |
| Kilo Code   | `omniroute setup-kilo`     | `~/.local/share/kilo/auth.json` (CLI) + VS Code-`kilocode.*`-indstillinger — OpenAI-kompatibel, basis-URL **med** `/v1`                                                         |
| Continue    | `omniroute setup-continue` | `~/.continue/config.yaml` (VS Code/JetBrains + `cn`-CLI) — `provider: openai`, `apiBase` **med** `/v1`, nøgle via `${{ secrets.OMNIROUTE_API_KEY }}`                            |
| Cursor      | `omniroute setup-cursor`   | viser trinnene i appen (Indstillinger → Modeller → Tilsidesæt OpenAI-basis-URL **med** `/v1` + nøgle + model). Cursors konfiguration er uigennemsigtig SQLite — kun chatpanelet |
| Roo Code    | `omniroute setup-roo`      | skriver en Roo-import-JSON (`~/.omniroute/roo-settings.json`) + indstiller `roo-cline.autoImportSettingsPath` + viser UI-trin (OpenAI-kompatibel, basis-URL **med** `/v1`)      |
| Crush       | `omniroute setup-crush`    | `~/.config/crush/crush.json` — `openai-compat`-udbyder, `base_url` **med** `/v1`, nøgle via `$OMNIROUTE_API_KEY`                                                                |
| Goose       | `omniroute setup-goose`    | `~/.config/goose/config.yaml` (`GOOSE_PROVIDER=openai` + `OPENAI_HOST` **uden** `/v1` + `GOOSE_MODEL`) + miljøopskrift                                                          |
| Aider       | `omniroute setup-aider`    | `~/.aider.conf.yml` (`openai-api-base` **uden** `/v1` + `model: openai/<id>`) + miljøopskrift (`aider --message --yes`)                                                         |
| Qwen Code   | `omniroute setup-qwen`     | `~/.qwen/settings.json` V4-`modelProviders.openai`-post + `OMNIROUTE_API_KEY` i `~/.qwen/.env`                                                                                  |

```bash
# OpenCode (OpenAI-kompatibel udbyder, alle katalogmodeller, ekstern VPS)
omniroute setup-opencode --remote http://192.168.0.15:20128 --api-key oma_live_xxx
omniroute setup-opencode --only glm,kimi        # behold kun matchende modeller
opencode -m omniroute/glm/glm-5.2 "..."          # eksportér OMNIROUTE_API_KEY først
```

> OpenCode har også en mere omfattende **plugin**-integration: `omniroute setup opencode`
> (nu med understøttelse af eksterne værter via `--remote`) installerer `@omniroute/opencode-plugin`.
> `setup-opencode` er det lette OpenAI-kompatible alternativ. API-nøglen
> refereres via `{env:OMNIROUTE_API_KEY}` — den skrives aldrig til disken.
>
> På OpenCode v2 skal du i stedet bruge `@omniroute/opencode-plugin-v2`: samme katalog,
> men en anden loader-kontrakt. Den læser nøglen fra OpenCodes eget legitimationslager,
> når integrationen er tilsluttet, så en ekstern gateway slet ikke behøver en nøgle i
> `opencode.json`.

---

## Håndtering af kontekster (skift mellem servere)

En **kontekst** er en gemt server (baseUrl + legitimationsoplysninger + rettighedsområde). `omniroute connect`
opretter en og gør den aktiv; derefter er alle kommandoer rettet mod den. Administrer og
skift mellem dem med `omniroute contexts`:

```bash
omniroute contexts list            # alle kontekster; den aktive er markeret med ●
omniroute contexts current         # den aktive server, godkendelsesstatus og rettighedsområde
```

```text
  | Navn    | Basis-URL                 | Godkendelse | Rettighedsområde | Beskrivelse
● | vps     | http://100.67.86.91:20128 | token       | admin             | Ekstern OmniRoute (…)
  | default | http://localhost:20128    | ✗           |                   |
```

**Skift server** — alle efterfølgende kommandoer følger den aktive kontekst:

```bash
omniroute contexts use vps         # → alle kommandoer rammer nu den eksterne VPS
omniroute tokens list              #   (kører mod VPS'en)

omniroute contexts use default     # → tilbage til localhost
omniroute tokens list              #   (kører mod den lokale server)
```

**Tilføj en kontekst manuelt** (i stedet for `connect`), inspicer den, eller omdøb den:

```bash
omniroute contexts add staging --url https://staging.example.com:20128 \
  --access-token oma_live_xxxx --scope write --description "stagingmiljø"
omniroute contexts show staging    # alle oplysninger om én kontekst
omniroute contexts rename staging stg
```

**Fjern en kontekst** — beder om bekræftelse; angiv `--yes` for at springe den over
(påkrævet til scripts/ikke-interaktive shells, som ellers afviser handlingen på sikker vis):

```bash
omniroute contexts remove stg --yes
```

> `default` (localhost) kan ikke fjernes. Hvis den aktive kontekst fjernes, skiftes der tilbage
> til `default`. Tip: Fjernelse af en kontekst sletter kun de **lokalt** gemte legitimationsoplysninger —
> tilbagekald tokenet på serveren med `omniroute tokens revoke <id>` for rent faktisk
> at fjerne adgangen.

**Eksportér/importér** kontekster (f.eks. for at flytte dem mellem maskiner). Nye kontekster gemmer
kun en reference til nøgleringen; legitimationsoplysninger kopieres ikke til eksporten, når
operativsystemets nøglering er tilgængelig:

```bash
omniroute contexts export --out contexts.json     # standard: stdout
omniroute contexts import contexts.json            # overskriv; brug --merge for at beholde eksisterende
omniroute contexts migrate --yes                  # flyt ældre tokens i klartekst til nøgleringen
```

På headless-systemer uden en brugbar operativsystemnøglering falder CLI'en tilbage til
`config.json` med tilstanden `0600` og viser en engangsadvarsel. Behandl eksporter fra
denne reserveløsning (og enhver ældre konfiguration før migrering) som hemmeligt materiale.

---

## Hurtig komplet kontrol

En livscyklus, der kan kopieres og indsættes, til at verificere en ekstern opsætning fra bunden — opret forbindelse, udsted et
token med et afgrænset rettighedsområde, kør en kommando, skift tilbage, og ryd op. Erstat
`192.168.0.15` med din servers værtsnavn/IP-adresse (Tailscale, LAN eller en offentlig
`https://…`-URL).

```bash
# 1. Opret forbindelse (adgangskode → admin-token, gemt som en kontekst, der bliver aktiv)
omniroute connect 192.168.0.15                 # eller: --key oma_live_xxxx  (ingen adgangskode)
omniroute contexts current                     # viser den eksterne server + rettighedsområde

# 2. Brug den — administrationskommandoer kører nu mod den eksterne server
omniroute tokens create --name laptop --scope read   # udsted et token med snævrere rettigheder
omniroute tokens list                                 # maskeret liste fra den eksterne server

# 3. Skift frem og tilbage
omniroute contexts use default                 # → lokal
omniroute contexts use 192-168-0-15            # → ekstern igen (navn fra `contexts list`)

# 4. Ryd op. BEMÆRK: `contexts remove` sletter kun de LOKALE legitimationsoplysninger —
#    den tilbagekalder IKKE tokenet på serveren. Tilbagekald det først på serversiden, hvis du
#    rent faktisk vil fjerne adgangen.
omniroute tokens revoke <id|prefix>            # fjerner adgangen på serveren
omniroute contexts remove 192-168-0-15 --yes   # slet den lokale kontekst (selv hvis den er aktiv → skifter tilbage til default), ingen bekræftelse
```

> `--yes` gør `contexts remove` ikke-interaktiv (påkrævet i scripts/CI; uden
> dette afviser en ikke-interaktiv shell handlingen på sikker vis i stedet for at hænge). Fjernelse af den
> **aktive** kontekst skifter automatisk tilbage til `default`.

---

## Sikkerhedsnoter

- Tokenets klartekst vises én gang; kun SHA-256-hashen gemmes permanent (ligesom API-nøgler).
- `omniroute connect` genbruger spærringen mod brute force-angreb ved login samt revisionslogningen.
- Foretræk HTTPS eller et Tailnet til transporten; en ren vært anvender som standard `http://`
  for nemheds skyld på LAN/Tailscale — angiv en fuld `https://…`-URL for TLS.
- Den foretrukne lokale kontekstfil er `~/.omniroute/config.json` (`chmod 600`)
  og indeholder kun en `credentialRef`; selve tokenet gemmes i operativsystemets
  nøglering (`keytar`) og udskrives aldrig i logfiler. Headless-installationer uden en
  fungerende indbygget nøglering bruger den samme `0600`-fil som en eksplicit reserveløsning og
  viser en advarsel én gang. Brug `omniroute contexts migrate --yes` efter installation af en
  nøgleringsbackend.

---

## API-slutpunkter (reference)

| Metode | Rute                  | Godkendelse            | Omfang                               |
| ------ | --------------------- | ---------------------- | ------------------------------------ |
| POST   | `/api/cli/connect`    | administrationskodeord | — (offentlig, beskyttet med kodeord) |
| GET    | `/api/cli/whoami`     | adgangstoken           | læse                                 |
| GET    | `/api/cli/tokens`     | adgangstoken           | administrator                        |
| POST   | `/api/cli/tokens`     | adgangstoken           | administrator                        |
| DELETE | `/api/cli/tokens/:id` | adgangstoken           | administrator                        |

Se [openapi.yaml](../openapi.yaml) for de komplette skemaer.
