# Remote Mode (Nederlands)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/REMOTE-MODE.md) · 🇪🇹 [am](../../../am/docs/guides/REMOTE-MODE.md) · 🇸🇦 [ar](../../../ar/docs/guides/REMOTE-MODE.md) · 🇦🇿 [az](../../../az/docs/guides/REMOTE-MODE.md) · 🇧🇬 [bg](../../../bg/docs/guides/REMOTE-MODE.md) · 🇧🇩 [bn](../../../bn/docs/guides/REMOTE-MODE.md) · 🇧🇦 [bs](../../../bs/docs/guides/REMOTE-MODE.md) · 🇨🇿 [cs](../../../cs/docs/guides/REMOTE-MODE.md) · 🇩🇰 [da](../../../da/docs/guides/REMOTE-MODE.md) · 🇩🇪 [de](../../../de/docs/guides/REMOTE-MODE.md) · 🇬🇷 [el](../../../el/docs/guides/REMOTE-MODE.md) · 🇪🇸 [es](../../../es/docs/guides/REMOTE-MODE.md) · 🇪🇪 [et](../../../et/docs/guides/REMOTE-MODE.md) · 🇮🇷 [fa](../../../fa/docs/guides/REMOTE-MODE.md) · 🇫🇮 [fi](../../../fi/docs/guides/REMOTE-MODE.md) · 🇫🇷 [fr](../../../fr/docs/guides/REMOTE-MODE.md) · 🇮🇪 [ga](../../../ga/docs/guides/REMOTE-MODE.md) · 🇮🇳 [gu](../../../gu/docs/guides/REMOTE-MODE.md) · 🇳🇬 [ha](../../../ha/docs/guides/REMOTE-MODE.md) · 🇮🇱 [he](../../../he/docs/guides/REMOTE-MODE.md) · 🇮🇳 [hi](../../../hi/docs/guides/REMOTE-MODE.md) · 🇭🇷 [hr](../../../hr/docs/guides/REMOTE-MODE.md) · 🇭🇺 [hu](../../../hu/docs/guides/REMOTE-MODE.md) · 🇦🇲 [hy](../../../hy/docs/guides/REMOTE-MODE.md) · 🇮🇩 [id](../../../id/docs/guides/REMOTE-MODE.md) · 🇳🇬 [ig](../../../ig/docs/guides/REMOTE-MODE.md) · 🇮🇹 [it](../../../it/docs/guides/REMOTE-MODE.md) · 🇯🇵 [ja](../../../ja/docs/guides/REMOTE-MODE.md) · 🇬🇪 [ka](../../../ka/docs/guides/REMOTE-MODE.md) · 🇰🇭 [km](../../../km/docs/guides/REMOTE-MODE.md) · 🇮🇳 [kn](../../../kn/docs/guides/REMOTE-MODE.md) · 🇰🇷 [ko](../../../ko/docs/guides/REMOTE-MODE.md) · 🇱🇹 [lt](../../../lt/docs/guides/REMOTE-MODE.md) · 🇱🇻 [lv](../../../lv/docs/guides/REMOTE-MODE.md) · 🇮🇳 [ml](../../../ml/docs/guides/REMOTE-MODE.md) · 🇮🇳 [mr](../../../mr/docs/guides/REMOTE-MODE.md) · 🇲🇾 [ms](../../../ms/docs/guides/REMOTE-MODE.md) · 🇲🇹 [mt](../../../mt/docs/guides/REMOTE-MODE.md) · 🇲🇲 [my](../../../my/docs/guides/REMOTE-MODE.md) · 🇳🇵 [ne](../../../ne/docs/guides/REMOTE-MODE.md) · 🇳🇴 [no](../../../no/docs/guides/REMOTE-MODE.md) · 🇮🇳 [or](../../../or/docs/guides/REMOTE-MODE.md) · 🇮🇳 [pa](../../../pa/docs/guides/REMOTE-MODE.md) · 🇵🇭 [phi](../../../phi/docs/guides/REMOTE-MODE.md) · 🇵🇱 [pl](../../../pl/docs/guides/REMOTE-MODE.md) · 🇵🇹 [pt](../../../pt/docs/guides/REMOTE-MODE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/REMOTE-MODE.md) · 🇷🇴 [ro](../../../ro/docs/guides/REMOTE-MODE.md) · 🇷🇺 [ru](../../../ru/docs/guides/REMOTE-MODE.md) · 🇱🇰 [si](../../../si/docs/guides/REMOTE-MODE.md) · 🇸🇰 [sk](../../../sk/docs/guides/REMOTE-MODE.md) · 🇸🇮 [sl](../../../sl/docs/guides/REMOTE-MODE.md) · 🇷🇸 [sr](../../../sr/docs/guides/REMOTE-MODE.md) · 🇸🇪 [sv](../../../sv/docs/guides/REMOTE-MODE.md) · 🇰🇪 [sw](../../../sw/docs/guides/REMOTE-MODE.md) · 🇮🇳 [ta](../../../ta/docs/guides/REMOTE-MODE.md) · 🇮🇳 [te](../../../te/docs/guides/REMOTE-MODE.md) · 🇹🇭 [th](../../../th/docs/guides/REMOTE-MODE.md) · 🇹🇷 [tr](../../../tr/docs/guides/REMOTE-MODE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/REMOTE-MODE.md) · 🇵🇰 [ur](../../../ur/docs/guides/REMOTE-MODE.md) · 🇺🇿 [uz](../../../uz/docs/guides/REMOTE-MODE.md) · 🇻🇳 [vi](../../../vi/docs/guides/REMOTE-MODE.md) · 🇳🇬 [yo](../../../yo/docs/guides/REMOTE-MODE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/REMOTE-MODE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/REMOTE-MODE.md)

---

Voer de `omniroute`-CLI uit op je laptop terwijl OmniRoute zelf ergens anders draait
(een VPS, een thuisserver, een andere machine op je Tailnet). Je logt één keer in met
`omniroute connect`, waarna **elke** CLI-opdracht op die externe server is gericht —
dezelfde opdrachten, dezelfde uitvoer, maar dan uitgevoerd op de externe server.

Er hoeft geen tweede tool te worden geïnstalleerd: de externe modus gebruikt de gewone
`omniroute`-CLI plus **toegangstokens** met een bepaald bereik.

```bash
npm install -g omniroute                 # de normale CLI
omniroute connect 192.168.0.15           # inloggen (wachtwoord → token met bereik)
omniroute models list                    # ← toont nu de modellen van de EXTERNE server
omniroute configure codex                # ← schrijft een lokaal Codex-profiel vanuit de externe catalogus
```

---

## Hoe het werkt

```
je laptop                                externe OmniRoute (VPS)
┌────────────────────┐                   ┌───────────────────────────────┐
│ omniroute-CLI      │  POST /api/cli/connect  (wachtwoord → token)       │
│  context: vps      │ ───────────────►  │ maakt een toegangstoken met    │
│  baseUrl, token    │  Authorization: Bearer oma_live_…                  │
│                    │ ───────────────►  │ bereik; elke beheerroute wordt │
│ schrijft configs   │ ◄───────────────  │ getoetst aan het tokenbereik   │
│ LOKAAL             │                   └───────────────────────────────┘
└────────────────────┘
```

- **Contexten** slaan elk één server op (`~/.omniroute/config.json`, `chmod 600`).
  `omniroute contexts use <name>` wisselt van actieve server; `default` is lokaal.
- **Toegangstokens** (`oma_live_…`) autoriseren beheeropdrachten. Ze verschillen
  van API-sleutels voor inferentie (`sk-…`, gebruikt voor `/v1/chat/completions`).
- Alleen de SHA-256-hash van een token wordt op de server opgeslagen. De platte tekst
  wordt bij het aanmaken **één keer** getoond.

---

## Verbinding maken

### Met het beheerwachtwoord (bootstrap)

```bash
omniroute connect 192.168.0.15
# Beheerwachtwoord voor http://192.168.0.15:20128: ********
# ✔ Verbonden met http://192.168.0.15:20128 — context '192.168.0.15' (bereik: admin)
```

De wachtwoordprocedure maakt standaard een **admin**-token aan (je beschikt over het
wachtwoord en hebt dus al volledige controle). Beperk het bereik met `--scope`:

```bash
omniroute connect 192.168.0.15 --scope write
```

Opties: `--port <p>` (wanneer de host geen poort bevat), `--name <ctx>` (contextnaam),
`--scope read|write|admin`. Een volledige URL wordt ongewijzigd gebruikt:
`omniroute connect https://omni.example.com`.

### Met een vooraf gegenereerd token

Genereer een token met een bepaald bereik in het dashboard (of met
`omniroute tokens create`) en plak het — er is geen wachtwoord nodig:

```bash
omniroute connect 192.168.0.15 --key oma_live_xxxxxxxx
```

De CLI valideert het via `GET /api/cli/whoami` en slaat het op als de actieve context.

---

## Bereiken

Drie hiërarchische niveaus (`admin ⊃ write ⊃ read`):

| Bereik  | Mogelijkheden                                                                             |
| ------- | ----------------------------------------------------------------------------------------- |
| `read`  | weergeven/controleren — `models list`, `providers status`, `logs`, `usage`, `cost`        |
| `write` | lezen **+** configureren/toepassen — `setup-codex`, `keys add`, `config set`, combinaties |
| `admin` | schrijven **+** beheren — `tokens`-CRUD, providers toevoegen, services, beleid, oauth     |

De server leidt uit de HTTP-methode af welk bereik elke route vereist
(`GET`→read, wijzigingen→write), aangevuld met een admin-toestaanlijst voor gevoelige
onderdelen (`/api/cli/tokens`, wijzigingen aan `/api/providers`, `/api/oauth`,
`/api/services`, …). Een token met onvoldoende bereik krijgt een `403` met een
duidelijke melding.

> Routes die processen starten (`/api/services/*`, `/api/mcp/*`, …) blijven
> **alleen via loopback toegankelijk** — een extern token kan ze nooit bereiken,
> ongeacht het bereik.

---

## Antigravity verbinden met een externe installatie

Antigravity gebruikt het first-party/nativeapp-toestemmingsscherm van Google. Google geeft
de autorisatiecode pas vrij wanneer de **loopback-omleiding**
(`http://127.0.0.1:<port>/callback`) **bereikbaar is vanuit de browser die
de aanmelding goedkeurt**. Bij een installatie op een externe VPS bevindt die loopback zich op de
server, niet op jouw machine, waardoor het toestemmingsscherm **oneindig blijft hangen en nooit
een code afgeeft** — bij de gebruikelijke terugvaloptie ‘plak de callback-URL’ valt er niets te
plakken. (Dit is een beperking van Google: hetzelfde probleem treedt op in elke proxy
die de meegeleverde Antigravity-desktopclient gebruikt, niet alleen in OmniRoute.)

Het dashboard detecteert dit voordat je vastloopt: wanneer je **Providers → Antigravity →
Connect** opent vanaf een adres dat geen localhost is, wordt de algemene melding ‘kopieer de callback-URL’
vervangen door de twee onderstaande oplossingen, waarbij je host en poort al zijn ingevuld.
(Een LAN-adres telt ook — voor deze callback wordt `192.168.x.x` niet als localhost
beschouwd.)

Er zijn twee ondersteunde manieren om Antigravity met een externe OmniRoute te verbinden.

### Optie A — lokale aanmeldhulp (aanbevolen)

Voer OAuth uit op **je eigen computer**, waar `127.0.0.1` bereikbaar is. De hulp
communiceert rechtstreeks met Google, zodat het toestemmingsproces wordt voltooid waar dat met de versie
van het dashboard niet lukt.

**Als je al verbonden bent** (`omniroute connect <host>`), hoef je niets te
kopiëren — de hulp levert de referentie voor jou aan die installatie:

```bash
# Op je LOKALE machine (vereist Node.js + een browser):
omniroute connect 192.168.0.15        # eenmalig — maakt een contexttoken met beheerdersbereik aan
npx omniroute login antigravity
#   ↳ opent het Google-toestemmingsscherm, onderschept de callback op een lokale loopback-poort,
#     wisselt deze in en verstuurt de referentie via POST naar de actieve context:
#
#   Antigravity verbonden op http://192.168.0.15:20128 (verbinding abc123).
#   Je hoeft niets te plakken — je kunt deze terminal sluiten.
```

De verzending vindt automatisch plaats wanneer de actieve context naar een andere
machine verwijst. Dwing deze in beide richtingen af met `--push` / `--no-push`, of richt je op een specifieke
context met `--context <name>`.

**Als je machine de VPS niet kan bereiken** (door een firewall, geen SSH, een fysiek geïsoleerde werkplek), werkt de
hulp nog steeds — deze heeft alleen Google _nodig_. Gebruik `--no-push`, of laat het
verzenden simpelweg mislukken: er wordt dan teruggevallen op het afdrukken van de blob, in plaats van een
autorisatie die je al hebt voltooid weg te gooien.

```bash
npx omniroute login antigravity --no-push
#   omniroute-cred-v1.eyJ2IjoxLCJ...
```

Ga vervolgens in het **externe** dashboard naar **Providers → Antigravity → Connect** en plak
de `omniroute-cred-v1.…`-blob in het veld bij **Step 2** (dit accepteert zowel een
callback-URL als een referentieblob). OmniRoute decodeert deze, voert de Cloud Code-
onboarding aan de serverzijde uit en slaat de verbinding permanent op.

> De blob bevat een vernieuwingstoken — behandel dit als een wachtwoord. Bij verzending
> wordt het eenmaal via de geverifieerde verbinding van je context verstuurd; bij plakken gebeurt dat via
> je dashboardverbinding. In beide gevallen wordt het versleuteld opgeslagen en bij een
> geslaagde verzending wordt het nooit in je terminal afgedrukt.

Opties: `--no-browser` (druk de URL af in plaats van deze automatisch te openen), `--port <n>`
(zet de loopback-poort vast), `--timeout <ms>`, `--push` / `--no-push` (overschrijf de
automatische levering), `--context <name>` (richt je op een specifieke context).

### Optie B — lokale SSH-forwardingtunnel

Als je SSH-toegang tot de VPS hebt, forward je de dashboardpoort zodat de
loopback-callback via de tunnel terug naar de server wordt geleid:

```bash
# Op je LOKALE machine:
ssh -L 20128:127.0.0.1:20128 user@your-vps
# open vervolgens http://localhost:20128 in je LOKALE browser en verbind Antigravity
# op de gebruikelijke manier — de omleiding naar 127.0.0.1:20128/callback bereikt de VPS nu via SSH.
```

Omdat je het dashboard via `localhost:20128` bereikt, wordt het Google-toestemmingsproces
voltooid en wordt de callback via dezelfde tunnel aan de server geleverd —
zonder dat een blob nodig is. Houd de tunnel open totdat de verbinding als actief wordt weergegeven.

In tegenstelling tot de onderstaande providers met een vaste loopback is **één forward voldoende**:
de callback van Antigravity gebruikt de dashboardpoort zelf, zodat er geen tweede
providerspecifieke poort via een tunnel hoeft te worden geleid.

> Een volledig headless alternatief (zonder hulp en zonder tunnel) is om je **eigen**
> Google OAuth-webreferenties plus een openbare basis-URL te configureren; raadpleeg de OAuth-
> omgevingsvariabelen van de provider. Voor de twee bovenstaande opties is geen aanvullende Google-configuratie nodig.

---

## Codex / Grok verbinden met een externe installatie (providers met vaste loopback)

Codex, xAI (`xai-oauth`) en Grok CLI (`grok-cli`) registreren een **vaste** loopback-
`redirect_uri` bij hun upstream OAuth-app. OmniRoute kan deze niet wijzigen — de
provider stuurt de browser altijd terug naar hetzelfde hardgecodeerde adres:

| Provider    | Vaste callback waarnaar de provider omleidt |
| ----------- | ------------------------------------------- |
| `codex`     | `http://localhost:1455/auth/callback`       |
| `xai-oauth` | `http://127.0.0.1:56121/callback`           |
| `grok-cli`  | `http://127.0.0.1:56122/callback`           |

`localhost` betekent hier **de machine waarop de browser draait**, terwijl de PKCE-
callbackserver van OmniRoute luistert op de loopback van de **server**. Open het dashboard
op een LAN-adres zoals `http://192.168.0.15:20128` en de twee komen nooit bij elkaar:
de autorisatiecode wordt afgeleverd bij `localhost:1455` van je eigen laptop, waar niets
luistert, en de provider laat de aanmelding mislukken zonder een foutmelding weer te geven.

Het dashboard detecteert dit voordat de pop-up wordt geopend en toont de tunnelopdracht
in plaats van de aanmelding stilzwijgend te laten mislukken (#8046).

### Oplossing — stuur **beide** poorten door

```bash
# Op de machine waarop de BROWSER draait:
ssh -L 20128:127.0.0.1:20128 -L 1455:127.0.0.1:1455 <user>@192.168.0.15
# ga vervolgens naar http://localhost:20128 en verbind Codex vanaf daar
```

Er zijn twee doorsturingen vereist; slechts één poort doorsturen mislukt nog steeds:

- **`20128`** (de dashboardpoort) zorgt ervoor dat de origin daadwerkelijk localhost is,
  waardoor OmniRoute de PKCE-callbackserver überhaupt start — een LAN-origin
  bereikt die vertakking nooit.
- **`1455`** (de vaste callbackpoort van de provider) is waarnaar de browser wordt
  teruggestuurd; deze moet via de tunnel naar de loopback van de server worden geleid.

Vervang `1455` door `56121`/`56122` wanneer je xAI of Grok CLI verbindt, en `20128` door
je daadwerkelijke dashboardpoort. Houd de tunnel open totdat de verbinding als
actief wordt weergegeven.

> **Geen SSH-toegang?** Codex en Grok CLI accepteren ook een geplakt token — het tabblad
> **API-sleutel plakken** / **auth.json importeren** in het verbindingsvenster. Dat pad
> heeft geen loopback-callback en werkt dus vanaf elke origin. Codex accepteert daarnaast
> een los toegangstoken of een `~/.codex/auth.json`-sessieblob.

---

## Tokens beheren

```bash
omniroute tokens create --name "laptop" --scope write [--expires 30]
#   ↳ geeft het geheim EENMALIG weer — kopieer het nu
omniroute tokens list                 # gemaskeerd: id, naam, bereik, voorvoegsel, status, vervaldatum
omniroute tokens revoke <id|prefix>   # onmiddellijk intrekken
omniroute tokens scopes               # de drie bereiken uitleggen
```

`tokens`-opdrachten vereisen een **admin**-referentie. Je kunt tokens ook beheren in
het dashboard onder **Instellingen → Toegangstokens** (aanmaken, intrekken, eenmalig kopiëren).

---

## Een programmeer-CLI configureren vanuit de externe catalogus

`omniroute configure` leest de live modelcatalogus van de **actieve server** en schrijft
een configuratie op **jouw** machine.

```bash
omniroute configure codex
#   Providers: glm, kmc, ollamacloud, opencode-go, …
#   Provider: glm
#   Model-id: glm/glm-5.2
#   ✔ Geschreven naar ~/.codex/glm52.config.toml
#   Gebruik als volgt:  codex --profile glm52

# niet-interactief
omniroute configure codex --provider glm --model glm/glm-5.2 --name glm52

# houd een vaak gebruikt model bovenaan de interactieve keuzelijst
omniroute configure codex --provider glm --model glm/glm-5.2 --favorite --yes
```

De keuzelijst bewaart alleen model-ID's (nooit URL's of referenties) in het lokale
bestand `model-preferences.json`, afgebakend per context en CLI-doel. Favorieten worden
vóór recente selecties weergegeven; gebruik `--unfavorite` om een geselecteerd model
uit die context-/doellijst te verwijderen.

Het geschreven profiel verwijst via een omgevingsvariabele naar de inferentiesleutel
(`OMNIROUTE_API_KEY`) — het geheim wordt nooit naar schijf geschreven. Raadpleeg voor
de eenmalige basisconfiguratie van Codex (het blok `[model_providers.omniroute]`)
[CODEX-CLI-CONFIGURATION.md](./CODEX-CLI-CONFIGURATION.md).

### Een CLI starten voor de externe server (zonder configuratie te schrijven)

`omniroute run <target>` respecteert ook de actieve context: de externe basis-URL
en de contextreferentie worden uitsluitend in het gestarte proces geïnjecteerd.

```bash
omniroute connect 192.168.0.15
omniroute run claude   --model openai/gpt-5.4          # Claude Code → extern
omniroute run gemini   --model glm/glm-5.2 -- --skip-trust -p "hello"
omniroute run opencode --model glm/glm-5.2 -- run "reply OK"

# Bekijk exact wat er zou worden gestart (alleen NAMEN van omgevingsvariabelen, nooit waarden):
omniroute run codex --dry-run --json
```

Doelen: `claude`, `codex`, `aider`, `goose`, `opencode`, `qwen`, `gemini`
(enige bron: `bin/cli/cli-manifest.mjs`). Qwen en Gemini worden uitgevoerd met een
tijdelijke geïsoleerde thuismap die bij het afsluiten wordt verwijderd, zodat het starten
je persoonlijke toolconfiguratie nooit wijzigt — of daarin gegevens achterlaat.

### Configuratieopdrachten per CLI

Elke ondersteunde CLI heeft een extern-bewuste configuratieopdracht (ze respecteren
allemaal de actieve context, of `--remote <url> --api-key <key>`):

| CLI         | Commando                   | Wat het schrijft                                                                                                                                                               |
| ----------- | -------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Codex       | `omniroute setup-codex`    | `~/.codex/<name>.config.toml`-profielen (per model)                                                                                                                            |
| Claude Code | `omniroute setup-claude`   | `~/.claude/profiles/<name>/settings.json` (per model)                                                                                                                          |
| OpenCode    | `omniroute setup-opencode` | `~/.config/opencode/opencode.json` — de OpenAI-compatibele `omniroute`-provider met elk catalogusmodel (voer `opencode -m omniroute/<model>` uit)                              |
| Cline       | `omniroute setup-cline`    | `~/.cline/data/{globalState,secrets}.json` (CLI-modus) + toont de instellingen voor de VS Code-extensie om te plakken (OpenAI-compatibel, basis-URL **zonder** `/v1`)          |
| Kilo Code   | `omniroute setup-kilo`     | `~/.local/share/kilo/auth.json` (CLI) + VS Code-instellingen voor `kilocode.*` — OpenAI-compatibel, basis-URL **met** `/v1`                                                    |
| Continue    | `omniroute setup-continue` | `~/.continue/config.yaml` (VS Code/JetBrains + `cn`-CLI) — `provider: openai`, `apiBase` **met** `/v1`, sleutel via `${{ secrets.OMNIROUTE_API_KEY }}`                         |
| Cursor      | `omniroute setup-cursor`   | toont de stappen in de app (Settings → Models → Override OpenAI Base URL **met** `/v1` + sleutel + model). De Cursor-configuratie is ondoorzichtige SQLite — alleen chatpaneel |
| Roo Code    | `omniroute setup-roo`      | schrijft een Roo-import-JSON (`~/.omniroute/roo-settings.json`) + stelt `roo-cline.autoImportSettingsPath` in + toont UI-stappen (OpenAI-compatibel, basis-URL **met** `/v1`)  |
| Crush       | `omniroute setup-crush`    | `~/.config/crush/crush.json` — `openai-compat`-provider, `base_url` **met** `/v1`, sleutel via `$OMNIROUTE_API_KEY`                                                            |
| Goose       | `omniroute setup-goose`    | `~/.config/goose/config.yaml` (`GOOSE_PROVIDER=openai` + `OPENAI_HOST` **zonder** `/v1` + `GOOSE_MODEL`) + recept voor omgevingsvariabelen                                     |
| Aider       | `omniroute setup-aider`    | `~/.aider.conf.yml` (`openai-api-base` **zonder** `/v1` + `model: openai/<id>`) + recept voor omgevingsvariabelen (`aider --message --yes`)                                    |
| Qwen Code   | `omniroute setup-qwen`     | V4-item `modelProviders.openai` in `~/.qwen/settings.json` + `OMNIROUTE_API_KEY` in `~/.qwen/.env`                                                                             |

```bash
# OpenCode (OpenAI-compatibele provider, alle catalogusmodellen, externe VPS)
omniroute setup-opencode --remote http://192.168.0.15:20128 --api-key oma_live_xxx
omniroute setup-opencode --only glm,kimi        # alleen overeenkomende modellen behouden
opencode -m omniroute/glm/glm-5.2 "..."          # exporteer eerst OMNIROUTE_API_KEY
```

> OpenCode heeft ook een uitgebreidere **plugin**-integratie: `omniroute setup opencode`
> (nu geschikt voor externe omgevingen via `--remote`) installeert `@omniroute/opencode-plugin`.
> `setup-opencode` is het lichtgewicht OpenAI-compatibele alternatief. Naar de API-sleutel
> wordt verwezen via `{env:OMNIROUTE_API_KEY}` — deze wordt nooit naar schijf geschreven.
>
> Gebruik op OpenCode v2 in plaats daarvan `@omniroute/opencode-plugin-v2`: dezelfde catalogus,
> ander laadcontract. De sleutel wordt uit OpenCode's eigen opslag voor aanmeldgegevens
> gelezen wanneer de integratie is verbonden, zodat een externe gateway helemaal geen sleutel
> in `opencode.json` nodig heeft.

---

## Contexten beheren (schakelen tussen servers)

Een **context** is een opgeslagen server (baseUrl + credential + scope). `omniroute connect` maakt er een aan en activeert deze; vanaf dat moment richt elke opdracht zich erop. Beheer en schakel ertussen met `omniroute contexts`:

```bash
omniroute contexts list            # alle contexten; de actieve is gemarkeerd met ●
omniroute contexts current         # de actieve server, authenticatiestatus, scope
```

```text
  | Name    | Base URL                  | Auth  | Scope | Description
● | vps     | http://100.67.86.91:20128 | token | admin | Remote OmniRoute (…)
  | default | http://localhost:20128    | ✗     |       |
```

**Servers wisselen** — elke volgende opdracht volgt de actieve context:

```bash
omniroute contexts use vps         # → alle opdrachten richten zich nu op de externe VPS
omniroute tokens list              #   (wordt uitgevoerd op de VPS)

omniroute contexts use default     # → terug naar localhost
omniroute tokens list              #   (wordt uitgevoerd op de lokale server)
```

**Voeg handmatig een context toe** (in plaats van `connect`), inspecteer of hernoem deze:

```bash
omniroute contexts add staging --url https://staging.example.com:20128 \
  --access-token oma_live_xxxx --scope write --description "staging box"
omniroute contexts show staging    # volledige details voor één context
omniroute contexts rename staging stg
```

**Verwijder een context** — vraagt om bevestiging; geef `--yes` door om dit over te slaan (vereist voor scripts / niet-interactieve shells, die anders veilig weigeren):

```bash
omniroute contexts remove stg --yes
```

> `default` (localhost) kan niet worden verwijderd. Het verwijderen van de actieve context valt terug op `default`. Tip: het verwijderen van een context verwijdert alleen de **lokaal** opgeslagen referentie — trek het token op de server in met `omniroute tokens revoke <id>` om de toegang daadwerkelijk te beëindigen.

**Contexten exporteren / importeren** (bijv. om ze tussen machines te verplaatsen). Exports laten referenties standaard weg, inclusief referenties die zijn opgeslagen via de file fallback. Gebruik `--include-secrets` expliciet wanneer een draagbare back-up met referenties nodig is:

```bash
omniroute contexts export --out contexts.json     # geredigeerd; standaardbestemming: stdout
omniroute contexts export --include-secrets --out private-contexts.json
omniroute contexts import contexts.json            # overschrijven; --merge om bestaande te behouden
omniroute contexts migrate --yes                  # verplaats verouderde platte tekst tokens naar de sleutelhanger
```

`--include-secrets` lost sleutelhangerreferenties op voordat ze worden geëxporteerd en mislukt als een van de gerefereerde referenties niet kan worden gelezen. `--no-secrets` heeft altijd voorrang. Exportbestanden worden atomair geschreven met modus `0600`. Behandel een expliciete export met geheimen als geheim materiaal. Op headless systemen zonder een bruikbare OS-sleutelhanger valt de CLI terug op `config.json` met modus `0600` en drukt een eenmalige waarschuwing af; een standaardexport blijft in deze modus geredigeerd.

---

## Snelle end-to-end-controle

Een kopieer-en-plaklevenscyclus om een externe configuratie vanaf nul te verifiëren — verbinding maken, een
token met een beperkt bereik aanmaken, een opdracht routeren, terugschakelen en alles weer opruimen. Vervang
`192.168.0.15` door de hostnaam of het IP-adres van uw server (Tailscale, LAN of een openbare
`https://…`-URL).

```bash
# 1. Maak verbinding (wachtwoord → admin-token, opgeslagen als een context die actief wordt)
omniroute connect 192.168.0.15                 # of: --key oma_live_xxxx  (geen wachtwoord)
omniroute contexts current                     # toont de externe server + het bereik

# 2. Gebruik de context — beheeropdrachten worden nu uitgevoerd op de externe server
omniroute tokens create --name laptop --scope read   # maak een token met een beperkter bereik aan
omniroute tokens list                                 # gemaskeerde lijst van de externe server

# 3. Schakel heen en weer
omniroute contexts use default                 # → lokaal
omniroute contexts use 192-168-0-15            # → opnieuw extern (naam uit `contexts list`)

# 4. Ruim alles op. LET OP: `contexts remove` verwijdert alleen de LOKALE referentie —
#    hiermee wordt het token op de server NIET ingetrokken. Trek het eerst op de server
#    in als u de toegang daadwerkelijk wilt beëindigen.
omniroute tokens revoke <id|prefix>            # beëindigt de toegang op de server
omniroute contexts remove 192-168-0-15 --yes   # verwijder de lokale context (zelfs als deze actief is → valt terug op default), zonder bevestiging
```

> `--yes` maakt `contexts remove` niet-interactief (vereist in scripts/CI; zonder
> deze optie weigert een niet-interactieve shell veilig in plaats van te blijven hangen). Als de
> **actieve** context wordt verwijderd, wordt automatisch teruggevallen op `default`.

---

## Beveiligingsopmerkingen

- De platte tekst van het token wordt eenmaal weergegeven; alleen de SHA-256-hash wordt opgeslagen (net als bij API-sleutels).
- `omniroute connect` maakt opnieuw gebruik van de blokkering tegen brute-force-aanmeldpogingen en de auditlogboekregistratie.
- Gebruik bij voorkeur HTTPS of een Tailnet voor het transport; een kale host gebruikt standaard `http://`
  voor het gemak binnen LAN/Tailscale — geef een volledige `https://…`-URL op voor TLS.
- Het voorkeursbestand voor de lokale context is `~/.omniroute/config.json` (`chmod 600`)
  en bevat alleen een `credentialRef`; het token zelf wordt opgeslagen in de
  sleutelhanger van het besturingssysteem (`keytar`) en wordt nooit in logboeken weergegeven. Headless-installaties zonder een
  werkende systeemeigen sleutelhanger gebruiken expliciet hetzelfde `0600`-bestand als terugvaloptie en
  geven eenmaal een waarschuwing weer. Gebruik `omniroute contexts migrate --yes` nadat u een
  sleutelhangerbackend hebt geïnstalleerd.

---

## API-eindpunten (referentie)

| Methode | Route                 | Authenticatie    | Bereik                                  |
| ------- | --------------------- | ---------------- | --------------------------------------- |
| POST    | `/api/cli/connect`    | beheerwachtwoord | — (openbaar, met wachtwoordbeveiliging) |
| GET     | `/api/cli/whoami`     | toegangstoken    | lezen                                   |
| GET     | `/api/cli/tokens`     | toegangstoken    | beheer                                  |
| POST    | `/api/cli/tokens`     | toegangstoken    | beheer                                  |
| DELETE  | `/api/cli/tokens/:id` | toegangstoken    | beheer                                  |

Zie [openapi.yaml](../openapi.yaml) voor de volledige schema's.
