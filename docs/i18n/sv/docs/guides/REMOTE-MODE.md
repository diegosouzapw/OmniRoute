# Remote Mode (Svenska)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/REMOTE-MODE.md) · 🇪🇹 [am](../../../am/docs/guides/REMOTE-MODE.md) · 🇸🇦 [ar](../../../ar/docs/guides/REMOTE-MODE.md) · 🇦🇿 [az](../../../az/docs/guides/REMOTE-MODE.md) · 🇧🇬 [bg](../../../bg/docs/guides/REMOTE-MODE.md) · 🇧🇩 [bn](../../../bn/docs/guides/REMOTE-MODE.md) · 🇧🇦 [bs](../../../bs/docs/guides/REMOTE-MODE.md) · 🇨🇿 [cs](../../../cs/docs/guides/REMOTE-MODE.md) · 🇩🇰 [da](../../../da/docs/guides/REMOTE-MODE.md) · 🇩🇪 [de](../../../de/docs/guides/REMOTE-MODE.md) · 🇬🇷 [el](../../../el/docs/guides/REMOTE-MODE.md) · 🇪🇸 [es](../../../es/docs/guides/REMOTE-MODE.md) · 🇪🇪 [et](../../../et/docs/guides/REMOTE-MODE.md) · 🇮🇷 [fa](../../../fa/docs/guides/REMOTE-MODE.md) · 🇫🇮 [fi](../../../fi/docs/guides/REMOTE-MODE.md) · 🇫🇷 [fr](../../../fr/docs/guides/REMOTE-MODE.md) · 🇮🇪 [ga](../../../ga/docs/guides/REMOTE-MODE.md) · 🇮🇳 [gu](../../../gu/docs/guides/REMOTE-MODE.md) · 🇳🇬 [ha](../../../ha/docs/guides/REMOTE-MODE.md) · 🇮🇱 [he](../../../he/docs/guides/REMOTE-MODE.md) · 🇮🇳 [hi](../../../hi/docs/guides/REMOTE-MODE.md) · 🇭🇷 [hr](../../../hr/docs/guides/REMOTE-MODE.md) · 🇭🇺 [hu](../../../hu/docs/guides/REMOTE-MODE.md) · 🇦🇲 [hy](../../../hy/docs/guides/REMOTE-MODE.md) · 🇮🇩 [id](../../../id/docs/guides/REMOTE-MODE.md) · 🇳🇬 [ig](../../../ig/docs/guides/REMOTE-MODE.md) · 🇮🇹 [it](../../../it/docs/guides/REMOTE-MODE.md) · 🇯🇵 [ja](../../../ja/docs/guides/REMOTE-MODE.md) · 🇬🇪 [ka](../../../ka/docs/guides/REMOTE-MODE.md) · 🇰🇭 [km](../../../km/docs/guides/REMOTE-MODE.md) · 🇮🇳 [kn](../../../kn/docs/guides/REMOTE-MODE.md) · 🇰🇷 [ko](../../../ko/docs/guides/REMOTE-MODE.md) · 🇱🇹 [lt](../../../lt/docs/guides/REMOTE-MODE.md) · 🇱🇻 [lv](../../../lv/docs/guides/REMOTE-MODE.md) · 🇮🇳 [ml](../../../ml/docs/guides/REMOTE-MODE.md) · 🇮🇳 [mr](../../../mr/docs/guides/REMOTE-MODE.md) · 🇲🇾 [ms](../../../ms/docs/guides/REMOTE-MODE.md) · 🇲🇹 [mt](../../../mt/docs/guides/REMOTE-MODE.md) · 🇲🇲 [my](../../../my/docs/guides/REMOTE-MODE.md) · 🇳🇵 [ne](../../../ne/docs/guides/REMOTE-MODE.md) · 🇳🇱 [nl](../../../nl/docs/guides/REMOTE-MODE.md) · 🇳🇴 [no](../../../no/docs/guides/REMOTE-MODE.md) · 🇮🇳 [or](../../../or/docs/guides/REMOTE-MODE.md) · 🇮🇳 [pa](../../../pa/docs/guides/REMOTE-MODE.md) · 🇵🇭 [phi](../../../phi/docs/guides/REMOTE-MODE.md) · 🇵🇱 [pl](../../../pl/docs/guides/REMOTE-MODE.md) · 🇵🇹 [pt](../../../pt/docs/guides/REMOTE-MODE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/REMOTE-MODE.md) · 🇷🇴 [ro](../../../ro/docs/guides/REMOTE-MODE.md) · 🇷🇺 [ru](../../../ru/docs/guides/REMOTE-MODE.md) · 🇱🇰 [si](../../../si/docs/guides/REMOTE-MODE.md) · 🇸🇰 [sk](../../../sk/docs/guides/REMOTE-MODE.md) · 🇸🇮 [sl](../../../sl/docs/guides/REMOTE-MODE.md) · 🇷🇸 [sr](../../../sr/docs/guides/REMOTE-MODE.md) · 🇰🇪 [sw](../../../sw/docs/guides/REMOTE-MODE.md) · 🇮🇳 [ta](../../../ta/docs/guides/REMOTE-MODE.md) · 🇮🇳 [te](../../../te/docs/guides/REMOTE-MODE.md) · 🇹🇭 [th](../../../th/docs/guides/REMOTE-MODE.md) · 🇹🇷 [tr](../../../tr/docs/guides/REMOTE-MODE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/REMOTE-MODE.md) · 🇵🇰 [ur](../../../ur/docs/guides/REMOTE-MODE.md) · 🇺🇿 [uz](../../../uz/docs/guides/REMOTE-MODE.md) · 🇻🇳 [vi](../../../vi/docs/guides/REMOTE-MODE.md) · 🇳🇬 [yo](../../../yo/docs/guides/REMOTE-MODE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/REMOTE-MODE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/REMOTE-MODE.md)

---

Kör CLI-verktyget `omniroute` på din bärbara dator medan OmniRoute körs någon annanstans
(en VPS, en hemmaserver eller en annan dator i ditt Tailnet). Du loggar in en gång med
`omniroute connect`, och därefter riktas **alla** CLI-kommandon mot fjärrservern
— samma kommandon, samma utdata, men körda mot fjärrservern.

Det finns inget ytterligare verktyg att installera: fjärrläget använder det vanliga CLI-verktyget
`omniroute` tillsammans med omfångsbegränsade **åtkomsttoken**.

```bash
npm install -g omniroute                 # det vanliga CLI-verktyget
omniroute connect 192.168.0.15           # logga in (lösenord → omfångsbegränsad token)
omniroute models list                    # ← listar nu FJÄRRSERVERNS modeller
omniroute configure codex                # ← skapar en lokal Codex-profil från fjärrkatalogen
```

---

## Så fungerar det

```
din bärbara dator                       OmniRoute på fjärrservern (VPS)
┌────────────────────┐                   ┌───────────────────────────────┐
│ omniroute CLI      │  POST /api/cli/connect  (lösenord → token)          │
│  kontext: vps      │ ───────────────►  │ utfärdar en omfångsbegränsad   │
│  baseUrl, token    │  Authorization: Bearer oma_live_…                  │
│                    │ ───────────────►  │ åtkomsttoken; varje hanterings- │
│ skriver konfigura- │ ◄───────────────  │ route kontrolleras mot dess    │
│ tioner LOKALT      │                   │ omfång                         │
└────────────────────┘                   └───────────────────────────────┘
```

- **Kontexter** lagrar en server vardera (`~/.omniroute/config.json`, `chmod 600`).
  `omniroute contexts use <name>` byter aktiv server; `default` är lokal.
- **Åtkomsttoken** (`oma_live_…`) auktoriserar hanteringskommandon. De skiljer sig
  från API-nycklar för inferens (`sk-…`, som används för `/v1/chat/completions`).
- Endast SHA-256-hashen för en token lagras på serversidan. Klartexten visas
  **en gång**, när den skapas.

---

## Anslutning

### Med hanteringslösenordet (bootstrap)

```bash
omniroute connect 192.168.0.15
# Hanteringslösenord för http://192.168.0.15:20128: ********
# ✔ Ansluten till http://192.168.0.15:20128 — kontext '192.168.0.15' (omfång: admin)
```

Lösenordsflödet utfärdar som standard en **admin**-token (du har lösenordet och
har därför redan fullständig kontroll). Begränsa omfånget med `--scope`:

```bash
omniroute connect 192.168.0.15 --scope write
```

Alternativ: `--port <p>` (när värden saknar port), `--name <ctx>` (kontextnamn),
`--scope read|write|admin`. En fullständig URL respekteras som den är:
`omniroute connect https://omni.example.com`.

### Med en förgenererad token

Generera en omfångsbegränsad token i kontrollpanelen (eller med `omniroute tokens create`) och
klistra in den — inget lösenord behövs:

```bash
omniroute connect 192.168.0.15 --key oma_live_xxxxxxxx
```

CLI-verktyget validerar den via `GET /api/cli/whoami` och sparar den som aktiv kontext.

---

## Omfång

Tre hierarkiska nivåer (`admin ⊃ write ⊃ read`):

| Omfång  | Tillåtna åtgärder                                                                          |
| ------- | ------------------------------------------------------------------------------------------ |
| `read`  | lista/inspektera — `models list`, `providers status`, `logs`, `usage`, `cost`              |
| `write` | läsa **+** konfigurera/tillämpa — `setup-codex`, `keys add`, `config set`, kombinationer   |
| `admin` | skriva **+** hantera — CRUD för `tokens`, lägga till leverantörer, tjänster, policy, oauth |

Servern avgör vilket omfång varje route kräver utifrån HTTP-metoden
(`GET`→read, ändringar→write) samt en admin-tillåtelselista för känsliga ytor
(ändringar av `/api/cli/tokens`, `/api/providers`, `/api/oauth`, `/api/services`, …).
En token med otillräckligt omfång får `403` med ett tydligt meddelande.

> Routes som startar processer (`/api/services/*`, `/api/mcp/*`, …) förblir
> **begränsade till loopback** — en fjärrtoken kan aldrig nå dem, oavsett omfång.

---

## Ansluta Antigravity vid en fjärrinstallation

Antigravity använder Googles samtyckesskärm för firstparty/nativeapp. Google
släpper endast auktoriseringskoden när **loopback-omdirigeringen**
(`http://127.0.0.1:<port>/callback`) är **nåbar från webbläsaren som
godkänner inloggningen**. Vid en fjärrinstallation på en VPS finns denna loopback
på servern, inte på din dator, så samtyckesskärmen **hänger sig för alltid och
skickar aldrig någon kod** — den vanliga reservlösningen ”klistra in callback-URL:en”
har inget att klistra in. (Detta är en begränsning hos Google: samma låsning inträffar
i alla proxyservrar som använder den medföljande Antigravity-skrivbordsklienten,
inte bara OmniRoute.)

Kontrollpanelen upptäcker detta innan du fastnar: om du öppnar **Leverantörer → Antigravity →
Anslut** från en adress som inte är localhost ersätts det allmänna meddelandet
”kopiera callback-URL:en” med de två lösningarna nedan, båda med din värd och port
redan ifyllda. (En LAN-adress räknas — `192.168.x.x` är inte localhost vad gäller
denna callback.)

Det finns två sätt som stöds för att ansluta Antigravity till en fjärransluten OmniRoute.

### Alternativ A — lokal inloggningshjälpare (rekommenderas)

Kör OAuth på **din egen dator**, där `127.0.0.1` är nåbar. Hjälpprogrammet
kommunicerar direkt med Google, så samtycket kan slutföras där kontrollpanelens
version inte kan göra det.

**Om du redan är ansluten** (`omniroute connect <host>`) behöver du inte kopiera
något — hjälpprogrammet levererar autentiseringsuppgiften till installationen åt dig:

```bash
# På din LOKALA dator (kräver Node.js + en webbläsare):
omniroute connect 192.168.0.15        # en gång — skapar en kontexttoken med administratörsbehörighet
npx omniroute login antigravity
#   ↳ öppnar Googles samtycke, fångar callback-anropet på en lokal loopback-port,
#     växlar in det och skickar autentiseringsuppgiften med POST till den aktiva kontexten:
#
#   Antigravity anslöts på http://192.168.0.15:20128 (anslutning abc123).
#   Inget att klistra in — du kan stänga den här terminalen.
```

Överföringen sker automatiskt när den aktiva kontexten pekar på en annan
dator. Framtvinga beteendet åt endera hållet med `--push` / `--no-push`, eller rikta
överföringen mot en viss kontext med `--context <name>`.

**Om din dator inte kan nå VPS:en** (brandvägg, ingen SSH, fysiskt isolerad
arbetsstation) fungerar hjälpprogrammet ändå — det _behöver_ bara Google. Använd
`--no-push`, eller låt helt enkelt överföringen misslyckas: då skrivs blobben ut
i stället för att en auktorisering som du redan har slutfört kasseras.

```bash
npx omniroute login antigravity --no-push
#   omniroute-cred-v1.eyJ2IjoxLCJ...
```

Gå sedan till den **fjärranslutna** kontrollpanelen: **Leverantörer → Antigravity → Anslut**,
och klistra in `omniroute-cred-v1.…`-blobben i fältet **Steg 2** (det accepterar
antingen en callback-URL eller en autentiseringsblobb). OmniRoute avkodar den,
kör Cloud Code-introduktionen på serversidan och sparar anslutningen.

> Blobben innehåller en uppdateringstoken — behandla den som ett lösenord. Vid
> överföring skickas den en gång via kontextens autentiserade anslutning; vid
> inklistring skickas den via kontrollpanelens anslutning. I båda fallen lagras
> den krypterad, och efter en lyckad överföring skrivs den aldrig ut i terminalen.

Flaggor: `--no-browser` (skriv ut URL:en i stället för att öppna den automatiskt),
`--port <n>` (lås loopback-porten), `--timeout <ms>`, `--push` / `--no-push`
(åsidosätt den automatiska leveransen), `--context <name>` (rikta mot en viss
kontext).

### Alternativ B — lokal vidarebefordring via SSH-tunnel

Om du har SSH-åtkomst till VPS:en kan du vidarebefordra kontrollpanelens port så
att loopback-anropet dirigeras tillbaka till servern genom tunneln:

```bash
# På din LOKALA dator:
ssh -L 20128:127.0.0.1:20128 user@your-vps
# öppna sedan http://localhost:20128 i din LOKALA webbläsare och anslut Antigravity
# som vanligt — omdirigeringen till 127.0.0.1:20128/callback når nu VPS:en via SSH.
```

Eftersom du når kontrollpanelen som `localhost:20128` slutförs Googles samtycke
och callback-anropet levereras till servern genom samma tunnel — ingen blobb
behövs. Håll tunneln öppen tills anslutningen visas som aktiv.

Till skillnad från leverantörerna med fast loopback nedan **räcker en enda
vidarebefordring** här: Antigravity-callbacken använder själva kontrollpanelsporten,
så det finns ingen andra leverantörsspecifik port som behöver tunnlas.

> Ett helt headless-alternativ (utan hjälpprogram och utan tunnel) är att konfigurera
> dina **egna** OAuth-webbautentiseringsuppgifter för Google + en offentlig bas-URL;
> se leverantörens OAuth-miljövariabler. De två alternativen ovan kräver ingen
> ytterligare Google-konfiguration.

---

## Ansluta Codex / Grok till en fjärrinstallation (leverantörer med fast loopback)

Codex, xAI (`xai-oauth`) och Grok CLI (`grok-cli`) registrerar en **fast**
loopback-`redirect_uri` hos sin externa OAuth-app. OmniRoute kan inte ändra den —
leverantören skickar alltid tillbaka webbläsaren till samma hårdkodade adress:

| Leverantör  | Fast callback som leverantören omdirigerar till |
| ----------- | ----------------------------------------------- |
| `codex`     | `http://localhost:1455/auth/callback`           |
| `xai-oauth` | `http://127.0.0.1:56121/callback`               |
| `grok-cli`  | `http://127.0.0.1:56122/callback`               |

`localhost` betyder här **datorn där webbläsaren körs**, medan OmniRoutes
PKCE-callbackserver lyssnar på **serverns** loopback. Om du öppnar kontrollpanelen
på en LAN-adress som `http://192.168.0.15:20128` möts de aldrig: auktoriseringskoden
levereras till din egen bärbara dators `localhost:1455`, där ingenting lyssnar,
och leverantören misslyckas med inloggningen utan att visa något fel.

Kontrollpanelen upptäcker detta innan popup-fönstret öppnas och visar
tunnelkommandot i stället för att låta inloggningen misslyckas utan meddelande
(#8046).

### Lösning — vidarebefordra **båda** portarna

```bash
# På datorn där WEBBLÄSAREN körs:
ssh -L 20128:127.0.0.1:20128 -L 1455:127.0.0.1:1455 <user>@192.168.0.15
# öppna sedan http://localhost:20128 och anslut Codex därifrån
```

Två vidarebefordringar krävs, och att endast vidarebefordra en av dem misslyckas
fortfarande:

- **`20128`** (kontrollpanelens port) gör ursprunget till äkta localhost, vilket
  är vad som över huvud taget får OmniRoute att starta PKCE-callbackservern — ett
  LAN-ursprung når aldrig den grenen.
- **`1455`** (leverantörens fasta callback-port) är dit webbläsaren skickas
  tillbaka; den måste tunnlas vidare till serverns loopback.

Byt ut `1455` mot `56121`/`56122` när du ansluter xAI eller Grok CLI, och `20128`
mot kontrollpanelens faktiska port. Håll tunneln öppen tills anslutningen visas
som aktiv.

> **Ingen SSH-åtkomst?** Codex och Grok CLI accepterar även en inklistrad token —
> fliken **Klistra in API-nyckel** / **Importera auth.json** i anslutningsdialogrutan.
> Den metoden saknar loopback-callback och fungerar därför från alla ursprung.
> Codex accepterar dessutom en fristående åtkomsttoken eller en sessionsblob från
> `~/.codex/auth.json`.

---

## Hantera tokens

```bash
omniroute tokens create --name "laptop" --scope write [--expires 30]
#   ↳ skriver ut hemligheten EN GÅNG — kopiera den nu
omniroute tokens list                 # maskerat: id, namn, omfång, prefix, status, utgångstid
omniroute tokens revoke <id|prefix>   # återkalla omedelbart
omniroute tokens scopes               # förklara de tre omfången
```

`tokens`-kommandon kräver en **admin**-autentiseringsuppgift. Du kan även hantera
tokens i kontrollpanelen under **Inställningar → Åtkomsttokens** (skapa,
återkalla, kopiera en gång).

---

## Konfigurera ett kodnings-CLI från fjärrkatalogen

`omniroute configure` läser den **aktiva serverns** aktuella modellkatalog och
skriver en konfiguration på **din** dator.

```bash
omniroute configure codex
#   Leverantörer: glm, kmc, ollamacloud, opencode-go, …
#   Leverantör: glm
#   Modell-id: glm/glm-5.2
#   ✔ Skrev ~/.codex/glm52.config.toml
#   Använd den:  codex --profile glm52

# icke-interaktivt
omniroute configure codex --provider glm --model glm/glm-5.2 --name glm52

# behåll en ofta använd modell högst upp i den interaktiva väljaren
omniroute configure codex --provider glm --model glm/glm-5.2 --favorite --yes
```

Väljaren sparar endast modell-ID:n (aldrig URL:er eller autentiseringsuppgifter)
i den lokala filen `model-preferences.json`, avgränsade efter kontext och
CLI-mål. Favoriter visas före de senaste valen; använd `--unfavorite` för att ta
bort en vald modell från listan för den kontexten/det målet.

Den skrivna profilen refererar till inferensnyckeln via en miljövariabel
(`OMNIROUTE_API_KEY`) — hemligheten skrivs aldrig till disk. För
engångskonfigurationen av Codex-basen (`[model_providers.omniroute]`-blocket), se
[CODEX-CLI-CONFIGURATION.md](./CODEX-CLI-CONFIGURATION.md).

### Starta ett CLI mot fjärrservern (ingen konfiguration skrivs)

`omniroute run <target>` följer också den aktiva kontexten: fjärrserverns bas-URL
och kontextens autentiseringsuppgift injiceras endast i den startade processen.

```bash
omniroute connect 192.168.0.15
omniroute run claude   --model openai/gpt-5.4          # Claude Code → fjärrserver
omniroute run gemini   --model glm/glm-5.2 -- --skip-trust -p "hello"
omniroute run opencode --model glm/glm-5.2 -- run "reply OK"

# Förhandsgranska exakt vad som skulle startas (endast miljövariablernas NYCKELNAMN, aldrig värden):
omniroute run codex --dry-run --json
```

Mål: `claude`, `codex`, `aider`, `goose`, `opencode`, `qwen`, `gemini`
(enda källa: `bin/cli/cli-manifest.mjs`). Qwen och Gemini körs med en tillfällig,
isolerad hemkatalog som tas bort vid avslut, så starten varken rör — eller läcker
in i — din personliga verktygskonfiguration.

### Konfigurationskommandon per CLI

Varje CLI som stöds har ett fjärrmedvetet konfigurationskommando (alla följer
den aktiva kontexten, eller `--remote <url> --api-key <key>`):

| CLI         | Kommando                   | Vad det skriver                                                                                                                                                                        |
| ----------- | -------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Codex       | `omniroute setup-codex`    | `~/.codex/<name>.config.toml`-profiler (per modell)                                                                                                                                    |
| Claude Code | `omniroute setup-claude`   | `~/.claude/profiles/<name>/settings.json` (per modell)                                                                                                                                 |
| OpenCode    | `omniroute setup-opencode` | `~/.config/opencode/opencode.json` — den OpenAI-kompatibla leverantören `omniroute` med alla katalogmodeller (kör `opencode -m omniroute/<model>`)                                     |
| Cline       | `omniroute setup-cline`    | `~/.cline/data/{globalState,secrets}.json` (CLI-läge) + skriver ut inställningarna för VS Code-tillägget att klistra in (OpenAI-kompatibel, bas-URL **utan** `/v1`)                    |
| Kilo Code   | `omniroute setup-kilo`     | `~/.local/share/kilo/auth.json` (CLI) + VS Code-inställningar för `kilocode.*` — OpenAI-kompatibel, bas-URL **med** `/v1`                                                              |
| Continue    | `omniroute setup-continue` | `~/.continue/config.yaml` (VS Code/JetBrains + `cn` CLI) — `provider: openai`, `apiBase` **med** `/v1`, nyckel via `${{ secrets.OMNIROUTE_API_KEY }}`                                  |
| Cursor      | `omniroute setup-cursor`   | skriver ut stegen i appen (Inställningar → Modeller → Åsidosätt OpenAI:s bas-URL **med** `/v1` + nyckel + modell). Cursors konfiguration är ogenomskinlig SQLite — endast chattpanelen |
| Roo Code    | `omniroute setup-roo`      | skriver en Roo-import-JSON (`~/.omniroute/roo-settings.json`) + ställer in `roo-cline.autoImportSettingsPath` + skriver ut UI-steg (OpenAI-kompatibel, bas-URL **med** `/v1`)          |
| Crush       | `omniroute setup-crush`    | `~/.config/crush/crush.json` — `openai-compat`-leverantör, `base_url` **med** `/v1`, nyckel via `$OMNIROUTE_API_KEY`                                                                   |
| Goose       | `omniroute setup-goose`    | `~/.config/goose/config.yaml` (`GOOSE_PROVIDER=openai` + `OPENAI_HOST` **utan** `/v1` + `GOOSE_MODEL`) + miljörecept                                                                   |
| Aider       | `omniroute setup-aider`    | `~/.aider.conf.yml` (`openai-api-base` **utan** `/v1` + `model: openai/<id>`) + miljörecept (`aider --message --yes`)                                                                  |
| Qwen Code   | `omniroute setup-qwen`     | `~/.qwen/settings.json` V4-post för `modelProviders.openai` + `OMNIROUTE_API_KEY` i `~/.qwen/.env`                                                                                     |

```bash
# OpenCode (OpenAI-kompatibel leverantör, alla katalogmodeller, fjärr-VPS)
omniroute setup-opencode --remote http://192.168.0.15:20128 --api-key oma_live_xxx
omniroute setup-opencode --only glm,kimi        # behåll endast matchande modeller
opencode -m omniroute/glm/glm-5.2 "..."          # exportera OMNIROUTE_API_KEY först
```

> OpenCode har även en mer avancerad **plugin**-integration: `omniroute setup opencode`
> (nu med stöd för fjärranslutning via `--remote`) installerar `@omniroute/opencode-plugin`.
> `setup-opencode` är det lättviktiga OpenAI-kompatibla alternativet. API-nyckeln
> refereras via `{env:OMNIROUTE_API_KEY}` — den skrivs aldrig till disk.
>
> På OpenCode v2 använder du i stället `@omniroute/opencode-plugin-v2`: samma katalog,
> annat inläsningskontrakt. Det läser nyckeln från OpenCodes eget autentiseringsarkiv
> när integrationen är ansluten, så en fjärrgateway behöver ingen nyckel alls i
> `opencode.json`.

---

## Hantera kontexter (växla mellan servrar)

En **kontext** är en sparad server (baseUrl + autentiseringsuppgift + omfattning). `omniroute connect`
skapar en och gör den aktiv; därefter riktas varje kommando mot den. Hantera och
växla mellan dem med `omniroute contexts`:

```bash
omniroute contexts list            # alla kontexter; den aktiva är markerad med ●
omniroute contexts current         # den aktiva servern, autentiseringsstatus, omfattning
```

```text
  | Namn    | Bas-URL                   | Autentisering | Omfattning | Beskrivning
● | vps     | http://100.67.86.91:20128 | token         | admin      | OmniRoute på fjärrserver (…)
  | default | http://localhost:20128    | ✗             |            |
```

**Växla server** — varje efterföljande kommando använder den aktiva kontexten:

```bash
omniroute contexts use vps         # → alla kommandon riktas nu mot fjärr-VPS:en
omniroute tokens list              #   (körs mot VPS:en)

omniroute contexts use default     # → tillbaka till localhost
omniroute tokens list              #   (körs mot den lokala servern)
```

**Lägg till en kontext manuellt** (i stället för `connect`), inspektera den eller byt namn på den:

```bash
omniroute contexts add staging --url https://staging.example.com:20128 \
  --access-token oma_live_xxxx --scope write --description "testserver"
omniroute contexts show staging    # fullständig information om en kontext
omniroute contexts rename staging stg
```

**Ta bort en kontext** — frågar efter bekräftelse; ange `--yes` för att hoppa över den
(krävs för skript/icke-interaktiva skal, som annars avböjer på ett säkert sätt):

```bash
omniroute contexts remove stg --yes
```

> `default` (localhost) kan inte tas bort. Om den aktiva kontexten tas bort sker en återgång
> till `default`. Tips: att ta bort en kontext raderar endast den **lokalt** sparade autentiseringsuppgiften —
> återkalla token på servern med `omniroute tokens revoke <id>` för att faktiskt
> stänga av åtkomsten.

**Exportera/importera** kontexter (t.ex. för att flytta dem mellan datorer). Nya kontexter sparar
endast en nyckelringsreferens; autentiseringsuppgifterna kopieras inte till exporten när operativsystemets
nyckelring är tillgänglig:

```bash
omniroute contexts export --out contexts.json     # standard: stdout
omniroute contexts import contexts.json            # skriv över; använd --merge för att behålla befintliga
omniroute contexts migrate --yes                  # flytta äldre token i klartext till nyckelringen
```

På headless-system utan en användbar nyckelring i operativsystemet faller CLI-verktyget tillbaka på
`config.json` med läget `0600` och visar en engångsvarning. Behandla exporter från
den reservlösningen (och alla äldre konfigurationer före migrering) som hemligt material.

---

## Snabb kontroll från början till slut

En livscykel som kan kopieras och klistras in för att verifiera en fjärrkonfiguration från grunden — anslut, utfärda en
token med begränsad omfattning, dirigera ett kommando, växla tillbaka och städa upp. Ersätt
`192.168.0.15` med serverns värdnamn/IP-adress (Tailscale, LAN eller en offentlig
`https://…`-URL).

```bash
# 1. Anslut (lösenord → admin-token, sparad som en kontext som blir aktiv)
omniroute connect 192.168.0.15                 # eller: --key oma_live_xxxx  (inget lösenord)
omniroute contexts current                     # visar fjärrservern + omfattning

# 2. Använd den — administrationskommandon körs nu mot fjärrservern
omniroute tokens create --name laptop --scope read   # utfärda en token med snävare omfattning
omniroute tokens list                                 # maskerad lista från fjärrservern

# 3. Växla fram och tillbaka
omniroute contexts use default                 # → lokal
omniroute contexts use 192-168-0-15            # → fjärrservern igen (namn från `contexts list`)

# 4. Städa upp. OBS! `contexts remove` raderar endast den LOKALA autentiseringsuppgiften —
#    det återkallar INTE token på servern. Återkalla den först på serversidan om du
#    faktiskt vill stänga av åtkomsten.
omniroute tokens revoke <id|prefix>            # stänger av åtkomsten på servern
omniroute contexts remove 192-168-0-15 --yes   # ta bort den lokala kontexten (även om den är aktiv → återgår till default), ingen bekräftelse
```

> `--yes` gör `contexts remove` icke-interaktivt (krävs i skript/CI; utan
> det avböjer ett icke-interaktivt skal på ett säkert sätt i stället för att hänga sig). Om den
> **aktiva** kontexten tas bort sker automatiskt en återgång till `default`.

---

## Säkerhetsanteckningar

- Tokenens klartext visas en gång; endast SHA-256-hashen sparas (på samma sätt som för API-nycklar).
- `omniroute connect` återanvänder spärren mot råstyrkeattacker vid inloggning samt granskningsloggningen.
- Använd helst HTTPS eller ett Tailnet för transporten; enbart ett värdnamn använder som standard `http://`
  för smidig användning via LAN/Tailscale — ange en fullständig `https://…`-URL för TLS.
- Den föredragna lokala kontextfilen är `~/.omniroute/config.json` (`chmod 600`)
  och innehåller endast en `credentialRef`; själva token lagras i operativsystemets
  nyckelring (`keytar`) och skrivs aldrig ut i loggar. Headless-installationer utan en
  fungerande inbyggd nyckelring använder samma `0600`-fil som en uttrycklig reservlösning och
  avger en varning en gång. Använd `omniroute contexts migrate --yes` efter att ha installerat en
  backend för nyckelringen.

---

## API-slutpunkter (referens)

| Metod  | Rutt                  | Autentisering           | Behörighetsområde               |
| ------ | --------------------- | ----------------------- | ------------------------------- |
| POST   | `/api/cli/connect`    | administrationslösenord | — (offentlig, lösenordsskyddad) |
| GET    | `/api/cli/whoami`     | åtkomsttoken            | läsning                         |
| GET    | `/api/cli/tokens`     | åtkomsttoken            | administration                  |
| POST   | `/api/cli/tokens`     | åtkomsttoken            | administration                  |
| DELETE | `/api/cli/tokens/:id` | åtkomsttoken            | administration                  |

Se [openapi.yaml](../openapi.yaml) för fullständiga scheman.
