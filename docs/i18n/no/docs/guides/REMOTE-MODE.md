# Remote Mode (Norsk)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/REMOTE-MODE.md) · 🇪🇹 [am](../../../am/docs/guides/REMOTE-MODE.md) · 🇸🇦 [ar](../../../ar/docs/guides/REMOTE-MODE.md) · 🇦🇿 [az](../../../az/docs/guides/REMOTE-MODE.md) · 🇧🇬 [bg](../../../bg/docs/guides/REMOTE-MODE.md) · 🇧🇩 [bn](../../../bn/docs/guides/REMOTE-MODE.md) · 🇧🇦 [bs](../../../bs/docs/guides/REMOTE-MODE.md) · 🇨🇿 [cs](../../../cs/docs/guides/REMOTE-MODE.md) · 🇩🇰 [da](../../../da/docs/guides/REMOTE-MODE.md) · 🇩🇪 [de](../../../de/docs/guides/REMOTE-MODE.md) · 🇬🇷 [el](../../../el/docs/guides/REMOTE-MODE.md) · 🇪🇸 [es](../../../es/docs/guides/REMOTE-MODE.md) · 🇪🇪 [et](../../../et/docs/guides/REMOTE-MODE.md) · 🇮🇷 [fa](../../../fa/docs/guides/REMOTE-MODE.md) · 🇫🇮 [fi](../../../fi/docs/guides/REMOTE-MODE.md) · 🇫🇷 [fr](../../../fr/docs/guides/REMOTE-MODE.md) · 🇮🇪 [ga](../../../ga/docs/guides/REMOTE-MODE.md) · 🇮🇳 [gu](../../../gu/docs/guides/REMOTE-MODE.md) · 🇳🇬 [ha](../../../ha/docs/guides/REMOTE-MODE.md) · 🇮🇱 [he](../../../he/docs/guides/REMOTE-MODE.md) · 🇮🇳 [hi](../../../hi/docs/guides/REMOTE-MODE.md) · 🇭🇷 [hr](../../../hr/docs/guides/REMOTE-MODE.md) · 🇭🇺 [hu](../../../hu/docs/guides/REMOTE-MODE.md) · 🇦🇲 [hy](../../../hy/docs/guides/REMOTE-MODE.md) · 🇮🇩 [id](../../../id/docs/guides/REMOTE-MODE.md) · 🇳🇬 [ig](../../../ig/docs/guides/REMOTE-MODE.md) · 🇮🇹 [it](../../../it/docs/guides/REMOTE-MODE.md) · 🇯🇵 [ja](../../../ja/docs/guides/REMOTE-MODE.md) · 🇬🇪 [ka](../../../ka/docs/guides/REMOTE-MODE.md) · 🇰🇭 [km](../../../km/docs/guides/REMOTE-MODE.md) · 🇮🇳 [kn](../../../kn/docs/guides/REMOTE-MODE.md) · 🇰🇷 [ko](../../../ko/docs/guides/REMOTE-MODE.md) · 🇱🇹 [lt](../../../lt/docs/guides/REMOTE-MODE.md) · 🇱🇻 [lv](../../../lv/docs/guides/REMOTE-MODE.md) · 🇮🇳 [ml](../../../ml/docs/guides/REMOTE-MODE.md) · 🇮🇳 [mr](../../../mr/docs/guides/REMOTE-MODE.md) · 🇲🇾 [ms](../../../ms/docs/guides/REMOTE-MODE.md) · 🇲🇹 [mt](../../../mt/docs/guides/REMOTE-MODE.md) · 🇲🇲 [my](../../../my/docs/guides/REMOTE-MODE.md) · 🇳🇵 [ne](../../../ne/docs/guides/REMOTE-MODE.md) · 🇳🇱 [nl](../../../nl/docs/guides/REMOTE-MODE.md) · 🇮🇳 [or](../../../or/docs/guides/REMOTE-MODE.md) · 🇮🇳 [pa](../../../pa/docs/guides/REMOTE-MODE.md) · 🇵🇭 [phi](../../../phi/docs/guides/REMOTE-MODE.md) · 🇵🇱 [pl](../../../pl/docs/guides/REMOTE-MODE.md) · 🇵🇹 [pt](../../../pt/docs/guides/REMOTE-MODE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/REMOTE-MODE.md) · 🇷🇴 [ro](../../../ro/docs/guides/REMOTE-MODE.md) · 🇷🇺 [ru](../../../ru/docs/guides/REMOTE-MODE.md) · 🇱🇰 [si](../../../si/docs/guides/REMOTE-MODE.md) · 🇸🇰 [sk](../../../sk/docs/guides/REMOTE-MODE.md) · 🇸🇮 [sl](../../../sl/docs/guides/REMOTE-MODE.md) · 🇷🇸 [sr](../../../sr/docs/guides/REMOTE-MODE.md) · 🇸🇪 [sv](../../../sv/docs/guides/REMOTE-MODE.md) · 🇰🇪 [sw](../../../sw/docs/guides/REMOTE-MODE.md) · 🇮🇳 [ta](../../../ta/docs/guides/REMOTE-MODE.md) · 🇮🇳 [te](../../../te/docs/guides/REMOTE-MODE.md) · 🇹🇭 [th](../../../th/docs/guides/REMOTE-MODE.md) · 🇹🇷 [tr](../../../tr/docs/guides/REMOTE-MODE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/REMOTE-MODE.md) · 🇵🇰 [ur](../../../ur/docs/guides/REMOTE-MODE.md) · 🇺🇿 [uz](../../../uz/docs/guides/REMOTE-MODE.md) · 🇻🇳 [vi](../../../vi/docs/guides/REMOTE-MODE.md) · 🇳🇬 [yo](../../../yo/docs/guides/REMOTE-MODE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/REMOTE-MODE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/REMOTE-MODE.md)

---

Kjør `omniroute`-CLI-en på den bærbare datamaskinen din mens OmniRoute kjører et annet sted
(en VPS, en hjemmeserver eller en annen maskin på Tailnet-nettverket ditt). Du logger inn én gang med
`omniroute connect`, og fra da av rettes **alle** CLI-kommandoer mot den eksterne
serveren — samme kommandoer, samme utdata, bare kjørt mot den eksterne serveren.

Det finnes ikke noe ekstra verktøy som må installeres: ekstern modus bruker den vanlige `omniroute`-CLI-en
sammen med omfangsbegrensede **tilgangstokener**.

```bash
npm install -g omniroute                 # den vanlige CLI-en
omniroute connect 192.168.0.15           # logg inn (passord → omfangsbegrenset token)
omniroute models list                    # ← viser nå modellene på den EKSTERNE serveren
omniroute configure codex                # ← skriver en lokal Codex-profil fra den eksterne katalogen
```

---

## Slik fungerer det

```
den bærbare datamaskinen din             ekstern OmniRoute (VPS)
┌────────────────────┐                   ┌───────────────────────────────┐
│ omniroute-CLI      │  POST /api/cli/connect  (passord → token)          │
│  kontekst: vps     │ ───────────────►  │ utsteder et omfangsbegrenset   │
│  baseUrl, token    │  Authorization: Bearer oma_live_…                  │
│                    │ ───────────────►  │ alle administrasjonsruter,     │
│ skriver oppsett    │ ◄───────────────  │ kontrollert mot tokenomfanget  │
│ LOKALT             │                   └───────────────────────────────┘
└────────────────────┘
```

- **Kontekster** lagrer én server hver (`~/.omniroute/config.json`, `chmod 600`).
  `omniroute contexts use <name>` bytter den aktive serveren; `default` er lokal.
- **Tilgangstokener** (`oma_live_…`) autoriserer administrasjonskommandoer. De er
  forskjellige fra API-nøkler for inferens (`sk-…`, som brukes for `/v1/chat/completions`).
- Bare SHA-256-hashen av et token lagres på serversiden. Klarteksten vises
  **én gang**, ved opprettelse.

---

## Koble til

### Med administrasjonspassordet (førstegangsoppsett)

```bash
omniroute connect 192.168.0.15
# Administrasjonspassord for http://192.168.0.15:20128: ********
# ✔ Koblet til http://192.168.0.15:20128 — kontekst '192.168.0.15' (omfang: admin)
```

Passordflyten utsteder som standard et **admin**-token (du har passordet, så
du har allerede full kontroll). Begrens omfanget med `--scope`:

```bash
omniroute connect 192.168.0.15 --scope write
```

Alternativer: `--port <p>` (når verten ikke har noen port), `--name <ctx>` (kontekstnavn),
`--scope read|write|admin`. En fullstendig URL brukes som den er:
`omniroute connect https://omni.example.com`.

### Med et forhåndsgenerert token

Generer et omfangsbegrenset token i kontrollpanelet (eller med `omniroute tokens create`) og
lim det inn — passord er ikke nødvendig:

```bash
omniroute connect 192.168.0.15 --key oma_live_xxxxxxxx
```

CLI-en validerer det via `GET /api/cli/whoami` og lagrer det som den aktive konteksten.

---

## Omfang

Tre hierarkiske nivåer (`admin ⊃ write ⊃ read`):

| Omfang  | Kan gjøre                                                                                      |
| ------- | ---------------------------------------------------------------------------------------------- |
| `read`  | vise/inspisere — `models list`, `providers status`, `logs`, `usage`, `cost`                    |
| `write` | read **+** konfigurere/bruke — `setup-codex`, `keys add`, `config set`, kombinasjoner          |
| `admin` | write **+** administrere — CRUD for `tokens`, legge til leverandører, tjenester, policy, oauth |

Serveren utleder hvilket omfang hver rute krever fra HTTP-metoden
(`GET`→read, endringer→write), i tillegg til en admin-tillatelsesliste for sensitive områder
(`/api/cli/tokens`, endringer av `/api/providers`, `/api/oauth`, `/api/services`, …).
Et token med utilstrekkelig omfang får `403` med en tydelig melding.

> Ruter som starter prosesser (`/api/services/*`, `/api/mcp/*`, …), forblir
> **begrenset til loopback** — et eksternt token kan aldri nå dem, uansett omfang.

---

## Koble til Antigravity på en ekstern installasjon

Antigravity bruker Googles samtykkeskjerm for førstepartsapper/innebygde apper. Google
utsteder bare autorisasjonskoden når **loopback-viderekoblingen**
(`http://127.0.0.1:<port>/callback`) er **tilgjengelig fra nettleseren som
godkjenner påloggingen**. På en ekstern VPS-installasjon befinner denne loopback-adressen
seg på serveren, ikke på maskinen din, så samtykkeskjermen **henger for alltid og
sender aldri ut noen kode** — den vanlige reserveløsningen med å «lime inn callback-URL-en»
har ingenting å lime inn. (Dette er en begrensning hos Google: den samme hengingen
oppstår i enhver proxy som bruker den medfølgende Antigravity-skrivebordsklienten,
ikke bare OmniRoute.)

Dashbordet oppdager dette før du blir sittende fast: Hvis du åpner **Providers → Antigravity →
Connect** fra en adresse som ikke er localhost, erstattes den generelle meldingen om å
«kopiere callback-URL-en» med de to løsningene nedenfor, hver med verten og porten din
allerede fylt ut. (En LAN-adresse teller — `192.168.x.x` er ikke localhost når det
gjelder denne callback-en.)

Det finnes to støttede måter å koble Antigravity til en ekstern OmniRoute på.

### Alternativ A — lokal påloggingshjelper (anbefalt)

Kjør OAuth på **din egen datamaskin**, der `127.0.0.1` er tilgjengelig. Hjelperen
kommuniserer direkte med Google, slik at samtykket fullføres der dashbordversjonen
ikke kan gjøre det.

**Hvis du allerede er tilkoblet** (`omniroute connect <host>`), trenger du ikke
kopiere noe — hjelperen leverer legitimasjonen til denne installasjonen for deg:

```bash
# På din LOKALE maskin (krever Node.js + en nettleser):
omniroute connect 192.168.0.15        # én gang — oppretter et konteksttoken med administratortilgang
npx omniroute login antigravity
#   ↳ åpner Google-samtykket, fanger opp callback-en på en lokal loopback-port,
#     utveksler den og POST-er legitimasjonen til den aktive konteksten:
#
#   Antigravity koblet til på http://192.168.0.15:20128 (tilkobling abc123).
#   Ingenting å lime inn — du kan lukke denne terminalen.
```

Overføringen skjer automatisk når den aktive konteksten peker mot en annen
maskin. Fremtving dette i begge retninger med `--push` / `--no-push`, eller velg en
bestemt kontekst med `--context <name>`.

**Hvis maskinen din ikke kan nå VPS-en** (brannmur, ingen SSH, fysisk isolert arbeidsplass),
fungerer hjelperen likevel — den _trenger_ bare Google. Bruk `--no-push`, eller la
overføringen mislykkes: Da skriver den ut datablokken i stedet for å forkaste en
autorisasjon du allerede har fullført.

```bash
npx omniroute login antigravity --no-push
#   omniroute-cred-v1.eyJ2IjoxLCJ...
```

Deretter går du til det **eksterne** dashbordet: **Providers → Antigravity → Connect**, og limer
inn `omniroute-cred-v1.…`-datablokken i feltet **Step 2** (det godtar enten en
callback-URL eller en legitimasjonsblokk). OmniRoute dekoder den, kjører Cloud Code-
oppsettet på serversiden og lagrer tilkoblingen.

> Datablokken inneholder et oppdateringstoken — behandle den som et passord. Ved automatisk
> overføring sendes den én gang via kontekstens autentiserte tilkobling; ved innliming
> sendes den via dashbordtilkoblingen. Uansett lagres den kryptert, og en
> vellykket overføring skriver den aldri ut i terminalen.

Flagg: `--no-browser` (skriv ut URL-en i stedet for å åpne den automatisk), `--port <n>`
(lås loopback-porten), `--timeout <ms>`, `--push` / `--no-push` (overstyr den
automatiske leveringen), `--context <name>` (velg en bestemt kontekst).

### Alternativ B — lokal SSH-videresendingstunnel

Hvis du har SSH-tilgang til VPS-en, videresender du dashbordporten slik at
loopback-callback-en sendes tilbake til serveren gjennom tunnelen:

```bash
# På din LOKALE maskin:
ssh -L 20128:127.0.0.1:20128 user@your-vps
# åpne deretter http://localhost:20128 i din LOKALE nettleser og koble til Antigravity
# på vanlig måte — viderekoblingen til 127.0.0.1:20128/callback når nå VPS-en via SSH.
```

Fordi du åpner dashbordet som `localhost:20128`, fullføres Google-samtykket,
og callback-en leveres til serveren gjennom den samme tunnelen — ingen datablokk
er nødvendig. Hold tunnelen åpen til tilkoblingen vises som aktiv.

I motsetning til leverandørene med fast loopback nedenfor er **én videresending nok**
her: Antigravity-callback-en bruker selve dashbordporten, så det finnes ingen
sekundær leverandørspesifikk port som må legges i tunnel.

> Et fullstendig headless-alternativ (ingen hjelper, ingen tunnel) er å konfigurere
> **din egen** Google OAuth-weblegitimasjon + en offentlig base-URL; se leverandørens
> OAuth-miljøvariabler. De to alternativene ovenfor krever ikke noe ekstra Google-oppsett.

---

## Koble til Codex / Grok på en ekstern installasjon (leverandører med fast loopback)

Codex, xAI (`xai-oauth`) og Grok CLI (`grok-cli`) registrerer en **fast** loopback-
`redirect_uri` hos sin eksterne OAuth-app. OmniRoute kan ikke endre den —
leverandøren sender alltid nettleseren tilbake til den samme hardkodede adressen:

| Leverandør  | Fast callback som leverandøren omdirigerer til |
| ----------- | ---------------------------------------------- |
| `codex`     | `http://localhost:1455/auth/callback`          |
| `xai-oauth` | `http://127.0.0.1:56121/callback`              |
| `grok-cli`  | `http://127.0.0.1:56122/callback`              |

`localhost` betyr her **maskinen som kjører nettleseren**, mens OmniRoutes PKCE-
callback-server lytter på **serverens** loopback. Åpne kontrollpanelet på en LAN-
adresse som `http://192.168.0.15:20128`, så møtes de aldri: autorisasjonskoden
leveres til din egen bærbare maskins `localhost:1455`, der ingenting lytter,
og leverandøren mislykkes med innloggingen uten å vise en feil.

Kontrollpanelet oppdager dette før popup-vinduet åpnes og viser tunnelkommandoen
i stedet for å la innloggingen mislykkes uten varsel (#8046).

### Løsning — videresend **begge** portene

```bash
# På maskinen som kjører NETTLESEREN:
ssh -L 20128:127.0.0.1:20128 -L 1455:127.0.0.1:1455 <user>@192.168.0.15
# gå deretter til http://localhost:20128 og koble til Codex derfra
```

To videresendinger kreves, og videresending av bare én vil fortsatt mislykkes:

- **`20128`** (porten til kontrollpanelet) gjør opphavet til ekte localhost, som
  er det som får OmniRoute til å starte PKCE-callback-serveren i det hele tatt —
  et LAN-opphav når aldri denne grenen.
- **`1455`** (leverandørens faste callback-port) er dit nettleseren sendes
  tilbake; den må tunneleres videre til serverens loopback.

Bytt ut `1455` med `56121`/`56122` når du kobler til xAI eller Grok CLI, og
`20128` med den faktiske porten til kontrollpanelet. Hold tunnelen åpen til
tilkoblingen vises som aktiv.

> **Ingen SSH-tilgang?** Codex og Grok CLI godtar også et innlimt token — fanen
> **Lim inn API-nøkkel** / **Importer auth.json** i tilkoblingsdialogen. Denne
> metoden har ingen loopback-callback, så den fungerer fra ethvert opphav. Codex
> godtar i tillegg et rent tilgangstoken eller en `~/.codex/auth.json`-øktblob.

---

## Administrere tokener

```bash
omniroute tokens create --name "laptop" --scope write [--expires 30]
#   ↳ skriver ut hemmeligheten ÉN GANG — kopier den nå
omniroute tokens list                 # maskert: id, navn, omfang, prefiks, status, utløpstid
omniroute tokens revoke <id|prefix>   # tilbakekall umiddelbart
omniroute tokens scopes               # forklar de tre omfangene
```

`tokens`-kommandoer krever en **admin**-legitimasjon. Du kan også administrere
tokener i kontrollpanelet under **Innstillinger → Tilgangstokener** (opprett,
tilbakekall, kopier én gang).

---

## Konfigurere en CLI for koding fra den eksterne katalogen

`omniroute configure` leser den **aktive serverens** gjeldende modellkatalog og
skriver en konfigurasjon på **din** maskin.

```bash
omniroute configure codex
#   Leverandører: glm, kmc, ollamacloud, opencode-go, …
#   Leverandør: glm
#   Modell-ID: glm/glm-5.2
#   ✔ Skrev ~/.codex/glm52.config.toml
#   Bruk den:  codex --profile glm52

# ikke-interaktiv
omniroute configure codex --provider glm --model glm/glm-5.2 --name glm52

# behold en ofte brukt modell øverst i den interaktive velgeren
omniroute configure codex --provider glm --model glm/glm-5.2 --favorite --yes
```

Velgeren lagrer bare modell-ID-er (aldri URL-er eller legitimasjon) i den lokale
filen `model-preferences.json`, avgrenset etter kontekst og CLI-mål. Favoritter
vises før nylige valg; bruk `--unfavorite` for å fjerne en valgt modell fra
listen for denne konteksten og dette målet.

Den skrevne profilen refererer til inferensnøkkelen via en miljøvariabel
(`OMNIROUTE_API_KEY`) — hemmeligheten skrives aldri til disken. For
engangskonfigureringen av Codex-basen (`[model_providers.omniroute]`-blokken), se
[CODEX-CLI-CONFIGURATION.md](./CODEX-CLI-CONFIGURATION.md).

### Starte en CLI mot den eksterne serveren (ingen konfigurasjon skrives)

`omniroute run <target>` respekterer også den aktive konteksten: den eksterne
basis-URL-en og kontekstlegitimasjonen injiseres bare i den startede prosessen.

```bash
omniroute connect 192.168.0.15
omniroute run claude   --model openai/gpt-5.4          # Claude Code → ekstern server
omniroute run gemini   --model glm/glm-5.2 -- --skip-trust -p "hello"
omniroute run opencode --model glm/glm-5.2 -- run "reply OK"

# Forhåndsvis nøyaktig hva som ville blitt startet (bare NAVN på miljøvariabler, aldri verdier):
omniroute run codex --dry-run --json
```

Mål: `claude`, `codex`, `aider`, `goose`, `opencode`, `qwen`, `gemini`
(én enkelt kilde: `bin/cli/cli-manifest.mjs`). Qwen og Gemini kjører med en
midlertidig, isolert hjemmekatalog som fjernes ved avslutning, slik at oppstarten
aldri berører — eller lekker inn i — din personlige verktøykonfigurasjon.

### Oppsettkommandoer per CLI

Hver støttede CLI har en oppsettkommando som støtter eksterne servere (alle
respekterer den aktive konteksten, eller `--remote <url> --api-key <key>`):

| CLI         | Kommando                   | Hva den skriver                                                                                                                                                                                   |
| ----------- | -------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Codex       | `omniroute setup-codex`    | `~/.codex/<name>.config.toml`-profiler (per modell)                                                                                                                                               |
| Claude Code | `omniroute setup-claude`   | `~/.claude/profiles/<name>/settings.json` (per modell)                                                                                                                                            |
| OpenCode    | `omniroute setup-opencode` | `~/.config/opencode/opencode.json` — den OpenAI-kompatible `omniroute`-leverandøren med alle katalogmodeller (kjør `opencode -m omniroute/<model>`)                                               |
| Cline       | `omniroute setup-cline`    | `~/.cline/data/{globalState,secrets}.json` (CLI-modus) + skriver ut innstillingene for VS Code-utvidelsen som skal limes inn (OpenAI-kompatibel, basis-URL **uten** `/v1`)                        |
| Kilo Code   | `omniroute setup-kilo`     | `~/.local/share/kilo/auth.json` (CLI) + VS Code-innstillinger for `kilocode.*` — OpenAI-kompatibel, basis-URL **med** `/v1`                                                                       |
| Continue    | `omniroute setup-continue` | `~/.continue/config.yaml` (VS Code/JetBrains + `cn` CLI) — `provider: openai`, `apiBase` **med** `/v1`, nøkkel via `${{ secrets.OMNIROUTE_API_KEY }}`                                             |
| Cursor      | `omniroute setup-cursor`   | skriver ut trinnene i appen (Innstillinger → Modeller → Overstyr OpenAI-basis-URL **med** `/v1` + nøkkel + modell). Cursor-konfigurasjonen er ugjennomsiktig SQLite — bare chattepanelet          |
| Roo Code    | `omniroute setup-roo`      | skriver en Roo-import-JSON (`~/.omniroute/roo-settings.json`) + angir `roo-cline.autoImportSettingsPath` + skriver ut trinnene i brukergrensesnittet (OpenAI-kompatibel, basis-URL **med** `/v1`) |
| Crush       | `omniroute setup-crush`    | `~/.config/crush/crush.json` — `openai-compat`-leverandør, `base_url` **med** `/v1`, nøkkel via `$OMNIROUTE_API_KEY`                                                                              |
| Goose       | `omniroute setup-goose`    | `~/.config/goose/config.yaml` (`GOOSE_PROVIDER=openai` + `OPENAI_HOST` **uten** `/v1` + `GOOSE_MODEL`) + oppskrift for miljøvariabler                                                             |
| Aider       | `omniroute setup-aider`    | `~/.aider.conf.yml` (`openai-api-base` **uten** `/v1` + `model: openai/<id>`) + oppskrift for miljøvariabler (`aider --message --yes`)                                                            |
| Qwen Code   | `omniroute setup-qwen`     | `~/.qwen/settings.json` V4-oppføring for `modelProviders.openai` + `OMNIROUTE_API_KEY` i `~/.qwen/.env`                                                                                           |

```bash
# OpenCode (OpenAI-kompatibel leverandør, alle katalogmodeller, ekstern VPS)
omniroute setup-opencode --remote http://192.168.0.15:20128 --api-key oma_live_xxx
omniroute setup-opencode --only glm,kimi        # behold bare samsvarende modeller
opencode -m omniroute/glm/glm-5.2 "..."          # eksporter OMNIROUTE_API_KEY først
```

> OpenCode har også en mer omfattende **plugin**-integrasjon: `omniroute setup opencode`
> (nå med støtte for eksterne verter via `--remote`) installerer `@omniroute/opencode-plugin`.
> `setup-opencode` er det lettvektige OpenAI-kompatible alternativet. API-nøkkelen
> refereres via `{env:OMNIROUTE_API_KEY}` — den skrives aldri til disk.
>
> På OpenCode v2 bruker du `@omniroute/opencode-plugin-v2` i stedet: samme katalog,
> en annen lasterkontrakt. Den leser nøkkelen fra OpenCodes eget lager for påloggingsinformasjon
> når integrasjonen er koblet til, så en ekstern gateway trenger ingen nøkkel i
> `opencode.json` i det hele tatt.

---

## Administrere kontekster (bytte mellom servere)

En **kontekst** er en lagret server (baseUrl + påloggingsinformasjon + omfang). `omniroute connect`
oppretter en og gjør den aktiv. Fra da av bruker alle kommandoer denne serveren. Administrer og
bytt mellom dem med `omniroute contexts`:

```bash
omniroute contexts list            # alle kontekster; den aktive er merket med ●
omniroute contexts current         # den aktive serveren, autentiseringsstatus, omfang
```

```text
  | Navn    | Basis-URL                 | Autentisering | Omfang | Beskrivelse
● | vps     | http://100.67.86.91:20128 | token         | admin  | Ekstern OmniRoute (…)
  | default | http://localhost:20128    | ✗             |        |
```

**Bytt server** — alle etterfølgende kommandoer bruker den aktive konteksten:

```bash
omniroute contexts use vps         # → alle kommandoer bruker nå den eksterne VPS-en
omniroute tokens list              #   (kjøres mot VPS-en)

omniroute contexts use default     # → tilbake til localhost
omniroute tokens list              #   (kjøres mot den lokale serveren)
```

**Legg til en kontekst manuelt** (i stedet for `connect`), vis detaljer eller endre navn:

```bash
omniroute contexts add staging --url https://staging.example.com:20128 \
  --access-token oma_live_xxxx --scope write --description "staging box"
omniroute contexts show staging    # fullstendige detaljer for én kontekst
omniroute contexts rename staging stg
```

**Fjern en kontekst** — ber om bekreftelse. Bruk `--yes` for å hoppe over dette
(påkrevd for skript / ikke-interaktive skall, som ellers avviser handlingen på en trygg måte):

```bash
omniroute contexts remove stg --yes
```

> `default` (localhost) kan ikke fjernes. Hvis den aktive konteksten fjernes, brukes
> `default` i stedet. Tips: Når en kontekst fjernes, slettes bare den **lokalt** lagrede påloggingsinformasjonen —
> tilbakekall tokenet på serveren med `omniroute tokens revoke <id>` for å faktisk
> oppheve tilgangen.

**Eksporter / importer** kontekster (for eksempel for å flytte dem mellom maskiner). Nye kontekster lagrer
bare en nøkkelringreferanse. Påloggingsinformasjon kopieres ikke til eksporten når operativsystemets
nøkkelring er tilgjengelig:

```bash
omniroute contexts export --out contexts.json     # standard: stdout
omniroute contexts import contexts.json            # overskriv; --merge for å beholde eksisterende
omniroute contexts migrate --yes                  # flytt eldre klarteksttoken til nøkkelringen
```

På skjermløse systemer uten en brukbar nøkkelring i operativsystemet bruker CLI-en i stedet
`config.json` med modus `0600` og viser en engangsadvarsel. Behandle eksporter fra
denne reserveløsningen (og eventuell eldre konfigurasjon før migrering) som hemmelig materiale.

---

## Rask ende-til-ende-kontroll

En livssyklus som kan kopieres og limes inn for å verifisere et eksternt oppsett fra bunnen av — koble til, opprett et
token med begrenset omfang, rut en kommando, bytt tilbake og rydd opp. Erstatt
`192.168.0.15` med serverens vertsnavn/IP-adresse (Tailscale, LAN eller en offentlig
`https://…`-URL).

```bash
# 1. Koble til (passord → admin-token, lagret som en kontekst som blir aktiv)
omniroute connect 192.168.0.15                 # eller: --key oma_live_xxxx  (uten passord)
omniroute contexts current                     # viser den eksterne serveren + omfang

# 2. Bruk den — administrasjonskommandoer kjøres nå mot den eksterne serveren
omniroute tokens create --name laptop --scope read   # opprett et token med snevrere omfang
omniroute tokens list                                 # maskert liste fra den eksterne serveren

# 3. Bytt frem og tilbake
omniroute contexts use default                 # → lokal
omniroute contexts use 192-168-0-15            # → ekstern igjen (navn fra `contexts list`)

# 4. Rydd opp. MERK: `contexts remove` sletter bare den LOKALE påloggingsinformasjonen —
#    den tilbakekaller IKKE tokenet på serveren. Tilbakekall det først på serversiden hvis du
#    faktisk vil oppheve tilgangen.
omniroute tokens revoke <id|prefix>            # opphever tilgangen på serveren
omniroute contexts remove 192-168-0-15 --yes   # fjern den lokale konteksten (selv om den er aktiv → går tilbake til default), uten spørsmål
```

> `--yes` gjør `contexts remove` ikke-interaktiv (påkrevd i skript/CI; uten
> dette avviser et ikke-interaktivt skall handlingen på en trygg måte i stedet for å bli hengende). Hvis den
> **aktive** konteksten fjernes, brukes `default` automatisk i stedet.

---

## Sikkerhetsmerknader

- Tokenet vises i klartekst én gang; bare SHA-256-hashen lagres permanent (på samme måte som API-nøkler).
- `omniroute connect` gjenbruker sperren mot brute-force-angrep ved innlogging samt revisjonsloggingen.
- Bruk helst HTTPS eller et Tailnet til transporten. En ren vertsadresse bruker som standard `http://`
  for å gjøre bruk på LAN/Tailscale enklere — oppgi en fullstendig `https://…`-URL for TLS.
- Den foretrukne lokale kontekstfilen er `~/.omniroute/config.json` (`chmod 600`)
  og inneholder bare en `credentialRef`; selve tokenet lagres i operativsystemets
  nøkkelring (`keytar`) og skrives aldri ut i logger. Hodeløse installasjoner uten en
  fungerende innebygd nøkkelring bruker den samme `0600`-filen som en eksplisitt reserveløsning og
  viser en advarsel én gang. Bruk `omniroute contexts migrate --yes` etter at du har installert en
  nøkkelringbackend.

---

## API-endepunkter (referanse)

| Metode | Rute                  | Autentisering          | Omfang                          |
| ------ | --------------------- | ---------------------- | ------------------------------- |
| POST   | `/api/cli/connect`    | administrasjonspassord | — (offentlig, passordbeskyttet) |
| GET    | `/api/cli/whoami`     | tilgangstoken          | read                            |
| GET    | `/api/cli/tokens`     | tilgangstoken          | admin                           |
| POST   | `/api/cli/tokens`     | tilgangstoken          | admin                           |
| DELETE | `/api/cli/tokens/:id` | tilgangstoken          | admin                           |

Se [openapi.yaml](../openapi.yaml) for fullstendige skjemaer.
