# Remote Mode (Kiswahili)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/REMOTE-MODE.md) · 🇪🇹 [am](../../../am/docs/guides/REMOTE-MODE.md) · 🇸🇦 [ar](../../../ar/docs/guides/REMOTE-MODE.md) · 🇦🇿 [az](../../../az/docs/guides/REMOTE-MODE.md) · 🇧🇬 [bg](../../../bg/docs/guides/REMOTE-MODE.md) · 🇧🇩 [bn](../../../bn/docs/guides/REMOTE-MODE.md) · 🇨🇿 [cs](../../../cs/docs/guides/REMOTE-MODE.md) · 🇩🇰 [da](../../../da/docs/guides/REMOTE-MODE.md) · 🇩🇪 [de](../../../de/docs/guides/REMOTE-MODE.md) · 🇬🇷 [el](../../../el/docs/guides/REMOTE-MODE.md) · 🇪🇸 [es](../../../es/docs/guides/REMOTE-MODE.md) · 🇪🇪 [et](../../../et/docs/guides/REMOTE-MODE.md) · 🇮🇷 [fa](../../../fa/docs/guides/REMOTE-MODE.md) · 🇫🇮 [fi](../../../fi/docs/guides/REMOTE-MODE.md) · 🇫🇷 [fr](../../../fr/docs/guides/REMOTE-MODE.md) · 🇮🇪 [ga](../../../ga/docs/guides/REMOTE-MODE.md) · 🇮🇳 [gu](../../../gu/docs/guides/REMOTE-MODE.md) · 🇳🇬 [ha](../../../ha/docs/guides/REMOTE-MODE.md) · 🇮🇱 [he](../../../he/docs/guides/REMOTE-MODE.md) · 🇮🇳 [hi](../../../hi/docs/guides/REMOTE-MODE.md) · 🇭🇷 [hr](../../../hr/docs/guides/REMOTE-MODE.md) · 🇭🇺 [hu](../../../hu/docs/guides/REMOTE-MODE.md) · 🇦🇲 [hy](../../../hy/docs/guides/REMOTE-MODE.md) · 🇮🇩 [id](../../../id/docs/guides/REMOTE-MODE.md) · 🇳🇬 [ig](../../../ig/docs/guides/REMOTE-MODE.md) · 🇮🇹 [it](../../../it/docs/guides/REMOTE-MODE.md) · 🇯🇵 [ja](../../../ja/docs/guides/REMOTE-MODE.md) · 🇬🇪 [ka](../../../ka/docs/guides/REMOTE-MODE.md) · 🇰🇭 [km](../../../km/docs/guides/REMOTE-MODE.md) · 🇮🇳 [kn](../../../kn/docs/guides/REMOTE-MODE.md) · 🇰🇷 [ko](../../../ko/docs/guides/REMOTE-MODE.md) · 🇱🇹 [lt](../../../lt/docs/guides/REMOTE-MODE.md) · 🇱🇻 [lv](../../../lv/docs/guides/REMOTE-MODE.md) · 🇮🇳 [ml](../../../ml/docs/guides/REMOTE-MODE.md) · 🇮🇳 [mr](../../../mr/docs/guides/REMOTE-MODE.md) · 🇲🇾 [ms](../../../ms/docs/guides/REMOTE-MODE.md) · 🇲🇹 [mt](../../../mt/docs/guides/REMOTE-MODE.md) · 🇲🇲 [my](../../../my/docs/guides/REMOTE-MODE.md) · 🇳🇵 [ne](../../../ne/docs/guides/REMOTE-MODE.md) · 🇳🇱 [nl](../../../nl/docs/guides/REMOTE-MODE.md) · 🇳🇴 [no](../../../no/docs/guides/REMOTE-MODE.md) · 🇮🇳 [or](../../../or/docs/guides/REMOTE-MODE.md) · 🇮🇳 [pa](../../../pa/docs/guides/REMOTE-MODE.md) · 🇵🇭 [phi](../../../phi/docs/guides/REMOTE-MODE.md) · 🇵🇱 [pl](../../../pl/docs/guides/REMOTE-MODE.md) · 🇵🇹 [pt](../../../pt/docs/guides/REMOTE-MODE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/REMOTE-MODE.md) · 🇷🇴 [ro](../../../ro/docs/guides/REMOTE-MODE.md) · 🇷🇺 [ru](../../../ru/docs/guides/REMOTE-MODE.md) · 🇱🇰 [si](../../../si/docs/guides/REMOTE-MODE.md) · 🇸🇰 [sk](../../../sk/docs/guides/REMOTE-MODE.md) · 🇸🇮 [sl](../../../sl/docs/guides/REMOTE-MODE.md) · 🇷🇸 [sr](../../../sr/docs/guides/REMOTE-MODE.md) · 🇸🇪 [sv](../../../sv/docs/guides/REMOTE-MODE.md) · 🇮🇳 [ta](../../../ta/docs/guides/REMOTE-MODE.md) · 🇮🇳 [te](../../../te/docs/guides/REMOTE-MODE.md) · 🇹🇭 [th](../../../th/docs/guides/REMOTE-MODE.md) · 🇹🇷 [tr](../../../tr/docs/guides/REMOTE-MODE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/REMOTE-MODE.md) · 🇵🇰 [ur](../../../ur/docs/guides/REMOTE-MODE.md) · 🇺🇿 [uz](../../../uz/docs/guides/REMOTE-MODE.md) · 🇻🇳 [vi](../../../vi/docs/guides/REMOTE-MODE.md) · 🇳🇬 [yo](../../../yo/docs/guides/REMOTE-MODE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/REMOTE-MODE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/REMOTE-MODE.md)

---

Endesha CLI ya `omniroute` kwenye kompyuta yako huku OmniRoute yenyewe ikiendeshwa mahali pengine
(VPS, seva ya nyumbani, mashine nyingine kwenye Tailnet yako). Unaingia mara moja kwa
`omniroute connect`, na kuanzia hapo **kila** amri ya CLI inalenga seva hiyo ya mbali
— amri zilezile, matokeo yaleyale, ila zinatekelezwa kwenye seva ya mbali.

Hakuna zana ya pili ya kusakinisha: hali ya mbali ni CLI ya kawaida ya `omniroute`
pamoja na **tokeni za ufikiaji** zenye upeo maalum.

```bash
npm install -g omniroute                 # CLI ya kawaida
omniroute connect 192.168.0.15           # ingia (nenosiri → tokeni yenye upeo)
omniroute models list                    # ← sasa huorodhesha modeli za SEVA YA MBALI
omniroute configure codex                # ← huandika wasifu wa ndani wa Codex kutoka kwenye katalogi ya mbali
```

---

## Jinsi inavyofanya kazi

```
kompyuta yako                            OmniRoute ya mbali (VPS)
┌────────────────────┐                   ┌───────────────────────────────┐
│ CLI ya omniroute   │  POST /api/cli/connect  (nenosiri → tokeni)        │
│  muktadha: vps     │ ───────────────►  │ hutengeneza tokeni ya ufikiaji │
│  baseUrl, token    │  Authorization: Bearer oma_live_…                  │
│                    │ ───────────────►  │ kila njia ya usimamizi, upeo   │
│ huandika usanidi   │ ◄───────────────  │ hukaguliwa kulingana na tokeni│
│ NDANI YA KOMPYUTA  │                   └───────────────────────────────┘
└────────────────────┘
```

- **Muktadha** huhifadhi seva moja kila mmoja (`~/.omniroute/config.json`, `chmod 600`).
  `omniroute contexts use <name>` hubadilisha seva inayotumika; `default` ni ya ndani.
- **Tokeni za ufikiaji** (`oma_live_…`) huidhinisha amri za usimamizi. Ni
  tofauti na funguo za API za uinferensi (`sk-…`, zinazotumika kwa `/v1/chat/completions`).
- Ni hashi ya SHA-256 ya tokeni pekee inayohifadhiwa upande wa seva. Maandishi halisi huonyeshwa
  **mara moja tu**, wakati wa kuunda.

---

## Kuunganisha

### Kwa nenosiri la usimamizi (uanzishaji)

```bash
omniroute connect 192.168.0.15
# Nenosiri la usimamizi la http://192.168.0.15:20128: ********
# ✔ Imeunganishwa na http://192.168.0.15:20128 — muktadha '192.168.0.15' (upeo: admin)
```

Mtiririko wa nenosiri hutengeneza tokeni ya **admin** kwa chaguo-msingi (unalo nenosiri, kwa hiyo
tayari una udhibiti kamili). Punguza upeo kwa `--scope`:

```bash
omniroute connect 192.168.0.15 --scope write
```

Chaguo: `--port <p>` (wakati host haina port), `--name <ctx>` (jina la muktadha),
`--scope read|write|admin`. URL kamili inatumika kama ilivyo:
`omniroute connect https://omni.example.com`.

### Kwa tokeni iliyotengenezwa mapema

Tengeneza tokeni yenye upeo kwenye dashibodi (au kwa `omniroute tokens create`) na
uibandike — hakuna nenosiri linalohitajika:

```bash
omniroute connect 192.168.0.15 --key oma_live_xxxxxxxx
```

CLI huihalalisha kupitia `GET /api/cli/whoami` na kuihifadhi kama muktadha unaotumika.

---

## Upeo

Viwango vitatu, vya ngazi (`admin ⊃ write ⊃ read`):

| Upeo    | Inaweza kufanya                                                                       |
| ------- | ------------------------------------------------------------------------------------- |
| `read`  | kuorodhesha/kukagua — `models list`, `providers status`, `logs`, `usage`, `cost`      |
| `write` | read **+** kusanidi/kutekeleza — `setup-codex`, `keys add`, `config set`, mikusanyiko |
| `admin` | write **+** kusimamia — CRUD ya `tokens`, kuongeza providers, services, policy, oauth |

Seva hubaini upeo unaohitajika na kila njia kutokana na mbinu ya HTTP
(`GET`→read, mabadiliko→write) pamoja na orodha ya ruhusa ya admin kwa sehemu nyeti
(mabadiliko ya `/api/cli/tokens`, `/api/providers`, `/api/oauth`, `/api/services`, …).
Tokeni yenye upeo usiotosha hupokea `403` pamoja na ujumbe ulio wazi.

> Njia zinazoanzisha michakato (`/api/services/*`, `/api/mcp/*`, …) hubaki
> **kwa loopback pekee** — tokeni ya mbali haiwezi kamwe kuzifikia, bila kujali upeo.

---

## Kuunganisha Antigravity kwenye usakinishaji wa mbali

Antigravity hutumia skrini ya idhini ya Google ya firstparty/nativeapp. Google hutoa
msimbo wa uidhinishaji tu wakati **uelekezaji upya wa loopback**
(`http://127.0.0.1:<port>/callback`) **unaweza kufikiwa kutoka kwenye kivinjari
kinachoidhinisha kuingia**. Kwenye usakinishaji wa VPS wa mbali, loopback hiyo iko
kwenye seva, si kwenye kompyuta yako, kwa hivyo skrini ya idhini **hukwama milele na
haitoi msimbo kamwe** — mbinu mbadala ya kawaida ya "kubandika URL ya callback" haina
chochote cha kubandika. (Hiki ni kizuizi cha upande wa Google: kukwama huku pia
hutokea katika proksi yoyote inayotumia kiteja cha eneo-kazi cha Antigravity
kilichojumuishwa, si OmniRoute pekee.)

Dashibodi hugundua hili kabla hujakwama: kufungua **Providers → Antigravity →
Connect** kutoka kwenye anwani isiyo localhost hubadilisha arifa ya jumla ya "nakili
URL ya callback" na suluhisho mbili zilizo hapa chini, kila moja ikiwa na host na
port yako ambazo tayari zimejazwa. (Anwani ya LAN pia inahesabika —
`192.168.x.x` si localhost kuhusiana na callback hii.)

Kuna njia mbili zinazotumika rasmi za kuunganisha Antigravity kwenye OmniRoute ya
mbali.

### Chaguo A — kisaidizi cha kuingia cha ndani (kinapendekezwa)

Endesha OAuth kwenye **kompyuta yako mwenyewe**, ambako `127.0.0.1` inaweza
kufikiwa. Kisaidizi huwasiliana na Google moja kwa moja, kwa hivyo mchakato wa
idhini hukamilika mahali ambapo toleo la dashibodi haliwezi.

**Ikiwa tayari umeunganishwa** (`omniroute connect <host>`), hakuna kitu cha
kunakili — kisaidizi huwasilisha kitambulisho kwenye usakinishaji huo kwa niaba
yako:

```bash
# Kwenye kompyuta yako ya NDANI (inahitaji Node.js + kivinjari):
omniroute connect 192.168.0.15        # mara moja — huunda tokeni ya muktadha yenye wigo wa msimamizi
npx omniroute login antigravity
#   ↳ hufungua idhini ya Google, hunasa callback kwenye port ya loopback ya ndani,
#     huibadilisha, na hutuma kitambulisho kwa POST kwenye muktadha unaotumika:
#
#   Antigravity imeunganishwa kwenye http://192.168.0.15:20128 (muunganisho abc123).
#   Hakuna cha kubandika — unaweza kufunga terminali hii.
```

Utumaji hutokea kiotomatiki wakati wowote muktadha unaotumika unapoelekeza kwenye
kompyuta nyingine. Ulazimishe kwa njia yoyote ukitumia `--push` / `--no-push`, au
lenga muktadha mahususi ukitumia `--context <name>`.

**Ikiwa kompyuta yako haiwezi kufikia VPS** (imezuiwa na ngome, hakuna SSH, au
kompyuta imetengwa kabisa na mtandao), kisaidizi bado hufanya kazi — kwa hakika
_kinahitaji_ Google pekee. Tumia `--no-push`, au uruhusu tu utumaji ushindwe:
kitarejea kwenye kuchapisha blob badala ya kutupilia mbali uidhinishaji ambao tayari
umekamilisha.

```bash
npx omniroute login antigravity --no-push
#   omniroute-cred-v1.eyJ2IjoxLCJ...
```

Kisha, kwenye dashibodi ya **mbali**: **Providers → Antigravity → Connect**, na
ubandike blob ya `omniroute-cred-v1.…` kwenye sehemu ya **Step 2** (inakubali URL ya
callback au blob ya kitambulisho). OmniRoute huisimbua, huendesha mchakato wa
kuanzisha Cloud Code upande wa seva, na huhifadhi muunganisho.

> Blob ina tokeni ya kuonyesha upya — ishughulikie kama nenosiri. Kwenye njia ya
> utumaji, hutumwa mara moja kupitia muunganisho uliothibitishwa wa muktadha wako;
> kwenye njia ya kubandika, hutumwa kupitia muunganisho wa dashibodi yako. Kwa njia
> yoyote ile, huhifadhiwa ikiwa imesimbwa fiche inapokuwa katika hifadhi, na utumaji
> uliofanikiwa kamwe hauichapishi kwenye terminali yako.

Chaguo za amri: `--no-browser` (chapisha URL badala ya kuifungua kiotomatiki),
`--port <n>` (weka port ya loopback), `--timeout <ms>`, `--push` / `--no-push`
(batilisha uwasilishaji wa kiotomatiki), `--context <name>` (lenga muktadha
mahususi).

### Chaguo B — handaki la usambazaji wa ndani la SSH

Ikiwa una ufikiaji wa SSH kwenye VPS, sambaza port ya dashibodi ili callback ya
loopback ielekezwe tena kwenye seva kupitia handaki:

```bash
# Kwenye kompyuta yako ya NDANI:
ssh -L 20128:127.0.0.1:20128 user@your-vps
# kisha fungua http://localhost:20128 kwenye kivinjari chako cha NDANI na uunganishe Antigravity
# kama kawaida — uelekezaji upya wa 127.0.0.1:20128/callback sasa unaifikia VPS kupitia SSH.
```

Kwa sababu unaifikia dashibodi kupitia `localhost:20128`, idhini ya Google
hukamilika na callback huwasilishwa kwenye seva kupitia handaki hilohilo — hakuna
blob inayohitajika. Weka handaki wazi hadi muunganisho uonyeshwe kuwa unatumika.

Tofauti na watoa huduma wenye loopback maalum walio hapa chini, **usambazaji mmoja
unatosha** hapa: callback ya Antigravity hutumia port yenyewe ya dashibodi, kwa
hivyo hakuna port ya pili inayomhusu mtoa huduma ambayo inahitaji handaki.

> Njia mbadala isiyohitaji kiolesura kabisa (hakuna kisaidizi wala handaki) ni
> kusanidi vitambulisho vyako **mwenyewe** vya wavuti vya Google OAuth pamoja na URL
> ya msingi ya umma; angalia vigeu vya mazingira vya OAuth vya mtoa huduma. Chaguo
> mbili zilizo hapo juu hazihitaji usanidi wa ziada wa Google.

---

## Kuunganisha Codex / Grok kwenye usakinishaji wa mbali (watoa huduma wenye loopback isiyobadilika)

Codex, xAI (`xai-oauth`) na Grok CLI (`grok-cli`) husajili `redirect_uri` ya
loopback **isiyobadilika** kwenye programu yao ya OAuth ya upstream. OmniRoute haiwezi kuibadilisha — mtoa huduma
daima hurejesha kivinjari kwenye anwani ileile iliyowekwa moja kwa moja:

| Mtoa huduma | Callback isiyobadilika ambako mtoa huduma huelekeza |
| ----------- | --------------------------------------------------- |
| `codex`     | `http://localhost:1455/auth/callback`               |
| `xai-oauth` | `http://127.0.0.1:56121/callback`                   |
| `grok-cli`  | `http://127.0.0.1:56122/callback`                   |

`localhost` hapo humaanisha **mashine inayoendesha kivinjari**, ilhali seva ya callback ya PKCE ya OmniRoute
husikiliza kwenye loopback ya **seva**. Fungua dashibodi kupitia anwani ya LAN
kama `http://192.168.0.15:20128` na hizo mbili hazitawahi kuungana: msimbo wa uidhinishaji
unawasilishwa kwenye `localhost:1455` ya kompyuta yako mwenyewe, ambako hakuna kinachosikiliza,
na mtoa huduma hushindwa kuingia bila kuonyesha hitilafu.

Dashibodi hutambua hili kabla ya kufungua dirisha ibukizi na huonyesha amri ya tunnel
badala ya kuruhusu kuingia kushindwe kimya kimya (#8046).

### Suluhisho — sambaza milango **yote miwili**

```bash
# Kwenye mashine inayoendesha KIVINJARI:
ssh -L 20128:127.0.0.1:20128 -L 1455:127.0.0.1:1455 <user>@192.168.0.15
# kisha nenda kwenye http://localhost:20128 na uunganishe Codex kutoka hapo
```

Usambazaji wa milango miwili unahitajika, na kusambaza mmoja pekee bado kutashindwa:

- **`20128`** (mlango wa dashibodi) hufanya origin kuwa localhost halisi, jambo ambalo
  hufanya OmniRoute ianzishe seva ya callback ya PKCE — origin ya LAN kamwe
  haifikii tawi hilo.
- **`1455`** (mlango wa callback usiobadilika wa mtoa huduma) ndipo kivinjari kinaporejeshwa;
  ni lazima upitie kwenye tunnel hadi loopback ya seva.

Badilisha `1455` kuwa `56121`/`56122` unapounganisha xAI au Grok CLI, na `20128` kuwa
mlango halisi wa dashibodi yako. Weka tunnel wazi hadi muunganisho uonekane kuwa
amilifu.

> **Huna ufikiaji wa SSH?** Codex na Grok CLI pia hukubali tokeni iliyobandikwa — kichupo cha **Bandika API
> Key** / **Leta auth.json** kwenye kidirisha cha kuunganisha. Njia hiyo haina callback ya loopback,
> kwa hivyo hufanya kazi kutoka origin yoyote. Codex pia hukubali access
> token tupu au blob ya kipindi ya `~/.codex/auth.json`.

---

## Kudhibiti tokeni

```bash
omniroute tokens create --name "laptop" --scope write [--expires 30]
#   ↳ huchapisha siri MARA MOJA — inakili sasa
omniroute tokens list                 # imefichwa: id, jina, scope, prefix, hali, muda wa kuisha
omniroute tokens revoke <id|prefix>   # batilisha mara moja
omniroute tokens scopes               # eleza scope tatu
```

Amri za `tokens` zinahitaji kitambulisho cha **admin**. Unaweza pia kudhibiti tokeni kwenye
dashibodi chini ya **Mipangilio → Tokeni za Ufikiaji** (unda, batilisha, nakili mara moja).

---

## Kusanidi CLI ya uandishi wa msimbo kutoka katalogi ya mbali

`omniroute configure` husoma katalogi ya moja kwa moja ya modeli ya **seva amilifu** na kuandika
usanidi kwenye mashine **yako**.

```bash
omniroute configure codex
#   Watoa huduma: glm, kmc, ollamacloud, opencode-go, …
#   Mtoa huduma: glm
#   Model id: glm/glm-5.2
#   ✔ Imeandika ~/.codex/glm52.config.toml
#   Itumie:  codex --profile glm52

# isiyoingiliana
omniroute configure codex --provider glm --model glm/glm-5.2 --name glm52

# weka modeli inayotumiwa mara kwa mara juu ya kichaguzi shirikishi
omniroute configure codex --provider glm --model glm/glm-5.2 --favorite --yes
```

Kichaguzi huhifadhi vitambulisho vya modeli pekee (kamwe si URLs au vitambulisho vya ufikiaji) kwenye faili ya ndani ya
`model-preferences.json`, vikiwa na upeo kulingana na muktadha na lengo la CLI. Vipendwa
huonyeshwa kabla ya chaguo za hivi karibuni; tumia `--unfavorite` ili kuondoa modeli iliyochaguliwa
kwenye orodha hiyo ya muktadha/lengo.

Wasifu ulioandikwa hurejelea ufunguo wa inference kupitia env var
(`OMNIROUTE_API_KEY`) — siri haiandikwi kamwe kwenye diski. Kwa usanidi wa msingi wa Codex wa mara moja
(kizuizi cha `[model_providers.omniroute]`), angalia
[CODEX-CLI-CONFIGURATION.md](./CODEX-CLI-CONFIGURATION.md).

### Kuanzisha CLI dhidi ya seva ya mbali (hakuna usanidi unaoandikwa)

`omniroute run <target>` pia huheshimu muktadha amilifu: URL ya msingi ya mbali
na kitambulisho cha ufikiaji cha muktadha huingizwa kwenye mchakato ulioanzishwa pekee.

```bash
omniroute connect 192.168.0.15
omniroute run claude   --model openai/gpt-5.4          # Claude Code → seva ya mbali
omniroute run gemini   --model glm/glm-5.2 -- --skip-trust -p "hello"
omniroute run opencode --model glm/glm-5.2 -- run "reply OK"

# Hakiki kwa usahihi kile ambacho kingeanzishwa (MAJINA YA KEY za env pekee, kamwe si thamani):
omniroute run codex --dry-run --json
```

Malengo: `claude`, `codex`, `aider`, `goose`, `opencode`, `qwen`, `gemini`
(chanzo kimoja: `bin/cli/cli-manifest.mjs`). Qwen na Gemini huendeshwa kwa kutumia
home ya muda iliyotengwa ambayo huondolewa wakati wa kuondoka, kwa hivyo uzinduzi haugusi kamwe —
wala kuvuja hadi kwenye — usanidi wako binafsi wa zana.

### Amri za usanidi kwa kila CLI

Kila CLI inayotumika ina amri ya usanidi inayotambua seva ya mbali (zote huheshimu
muktadha amilifu, au `--remote <url> --api-key <key>`):

| CLI         | Amri                       | Inachoandika                                                                                                                                                                                        |
| ----------- | -------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Codex       | `omniroute setup-codex`    | wasifu wa `~/.codex/<name>.config.toml` (kwa kila modeli)                                                                                                                                           |
| Claude Code | `omniroute setup-claude`   | `~/.claude/profiles/<name>/settings.json` (kwa kila modeli)                                                                                                                                         |
| OpenCode    | `omniroute setup-opencode` | `~/.config/opencode/opencode.json` — mtoa huduma `omniroute` anayeoana na OpenAI akiwa na kila modeli ya katalogi (endesha `opencode -m omniroute/<model>`)                                         |
| Cline       | `omniroute setup-cline`    | `~/.cline/data/{globalState,secrets}.json` (hali ya CLI) + huchapisha mipangilio ya kiendelezi cha VS Code ya kubandika (inayoana na OpenAI, Base URL **bila** `/v1`)                               |
| Kilo Code   | `omniroute setup-kilo`     | `~/.local/share/kilo/auth.json` (CLI) + mipangilio ya VS Code ya `kilocode.*` — inayoana na OpenAI, Base URL **ikiwa na** `/v1`                                                                     |
| Continue    | `omniroute setup-continue` | `~/.continue/config.yaml` (VS Code/JetBrains + `cn` CLI) — `provider: openai`, `apiBase` **ikiwa na** `/v1`, ufunguo kupitia `${{ secrets.OMNIROUTE_API_KEY }}`                                     |
| Cursor      | `omniroute setup-cursor`   | huchapisha hatua za ndani ya programu (Settings → Models → Override OpenAI Base URL **ikiwa na** `/v1` + ufunguo + modeli). Usanidi wa Cursor ni SQLite isiyo wazi — paneli ya gumzo pekee          |
| Roo Code    | `omniroute setup-roo`      | huandika JSON ya kuleta mipangilio ya Roo (`~/.omniroute/roo-settings.json`) + huweka `roo-cline.autoImportSettingsPath` + huchapisha hatua za UI (inayoana na OpenAI, Base URL **ikiwa na** `/v1`) |
| Crush       | `omniroute setup-crush`    | `~/.config/crush/crush.json` — mtoa huduma wa `openai-compat`, `base_url` **ikiwa na** `/v1`, ufunguo kupitia `$OMNIROUTE_API_KEY`                                                                  |
| Goose       | `omniroute setup-goose`    | `~/.config/goose/config.yaml` (`GOOSE_PROVIDER=openai` + `OPENAI_HOST` **bila** `/v1` + `GOOSE_MODEL`) + maelekezo ya env                                                                           |
| Aider       | `omniroute setup-aider`    | `~/.aider.conf.yml` (`openai-api-base` **bila** `/v1` + `model: openai/<id>`) + maelekezo ya env (`aider --message --yes`)                                                                          |
| Qwen Code   | `omniroute setup-qwen`     | ingizo la V4 `modelProviders.openai` katika `~/.qwen/settings.json` + `OMNIROUTE_API_KEY` katika `~/.qwen/.env`                                                                                     |

```bash
# OpenCode (mtoa huduma anayeoana na OpenAI, modeli zote za katalogi, VPS ya mbali)
omniroute setup-opencode --remote http://192.168.0.15:20128 --api-key oma_live_xxx
omniroute setup-opencode --only glm,kimi        # weka modeli zinazolingana pekee
opencode -m omniroute/glm/glm-5.2 "..."          # kwanza hamisha OMNIROUTE_API_KEY
```

> OpenCode pia ina muunganisho wa **plugin** wenye uwezo zaidi: `omniroute setup opencode`
> (sasa unatambua mazingira ya mbali kupitia `--remote`) husakinisha `@omniroute/opencode-plugin`.
> `setup-opencode` ni chaguo jepesi linalooana na OpenAI. Ufunguo wa API
> hurejelewa kupitia `{env:OMNIROUTE_API_KEY}` — hauandikwi kamwe kwenye diski.
>
> Kwenye OpenCode v2, tumia `@omniroute/opencode-plugin-v2` badala yake: katalogi ileile,
> mkataba tofauti wa kipakiaji. Husoma ufunguo kutoka kwenye hifadhi ya vitambulisho
> ya OpenCode yenyewe wakati muunganisho umeunganishwa, kwa hivyo lango la mbali halihitaji ufunguo wowote katika
> `opencode.json`.

---

## Kudhibiti miktadha (kubadilisha kati ya seva)

**Muktadha** ni seva iliyohifadhiwa (baseUrl + kitambulisho + upeo). `omniroute connect`
huunda mmoja na kuufanya uwe amilifu; kuanzia hapo kila amri hulenga muktadha huo. Dhibiti na
ubadilishe kati yake kwa kutumia `omniroute contexts`:

```bash
omniroute contexts list            # miktadha yote; ulio amilifu umewekwa alama ●
omniroute contexts current         # seva amilifu, hali ya uthibitishaji, upeo
```

```text
  | Jina    | URL ya Msingi              | Uthibitishaji | Upeo  | Maelezo
● | vps     | http://100.67.86.91:20128 | token         | admin | OmniRoute ya Mbali (…)
  | default | http://localhost:20128    | ✗             |       |
```

**Badilisha seva** — kila amri inayofuata hutumia muktadha amilifu:

```bash
omniroute contexts use vps         # → sasa amri zote zinalenga VPS ya mbali
omniroute tokens list              #   (hutekelezwa dhidi ya VPS)

omniroute contexts use default     # → kurudi localhost
omniroute tokens list              #   (hutekelezwa dhidi ya seva ya ndani)
```

**Ongeza muktadha mwenyewe** (badala ya `connect`), ukague, au ubadilishe jina:

```bash
omniroute contexts add staging --url https://staging.example.com:20128 \
  --access-token oma_live_xxxx --scope write --description "staging box"
omniroute contexts show staging    # maelezo kamili ya muktadha mmoja
omniroute contexts rename staging stg
```

**Ondoa muktadha** — huomba uthibitisho; tumia `--yes` ili kuuruka
(inahitajika kwa hati / shell zisizoingiliana, ambazo vinginevyo hukataa kwa usalama):

```bash
omniroute contexts remove stg --yes
```

> `default` (localhost) haiwezi kuondolewa. Kuondoa muktadha amilifu hurudisha matumizi
> kwenye `default`. Kidokezo: kuondoa muktadha hufuta tu kitambulisho kilichohifadhiwa **ndani** —
> batilisha tokeni kwenye seva kwa kutumia `omniroute tokens revoke <id>` ili kusitisha
> ufikiaji kikamilifu.

**Hamisha nje / ingiza** miktadha (kwa mfano, kuihamisha kati ya mashine). Miktadha mipya huhifadhi
rejeleo la keychain pekee; vitambulisho havinakiliwi kwenye faili ya kuhamisha nje wakati
keychain ya OS inapatikana:

```bash
omniroute contexts export --out contexts.json     # chaguo-msingi: stdout
omniroute contexts import contexts.json            # andika juu yake; --merge ili kuhifadhi iliyopo
omniroute contexts migrate --yes                  # hamisha tokeni za zamani za maandishi wazi kwenda keychain
```

Kwenye mifumo isiyo na kiolesura bila keychain ya OS inayoweza kutumika, CLI hurudi kutumia
`config.json` yenye modi `0600` na kuchapisha onyo la mara moja. Chukulia faili zilizohamishwa nje
kutoka kwenye mbinu hiyo mbadala (na usanidi wowote wa zamani kabla ya uhamishaji) kama nyenzo za siri.

---

## Ukaguzi wa haraka wa mwanzo hadi mwisho

Mzunguko unaoweza kunakiliwa na kubandikwa ili kuthibitisha usanidi wa mbali kutoka mwanzo — unganisha, unda
tokeni yenye upeo, elekeza amri, rudi kwenye muktadha wa awali, kisha vunja usanidi. Badilisha
`192.168.0.15` na jina la mwenyeji/IP ya seva yako (Tailscale, LAN, au URL ya umma ya
`https://…`).

```bash
# 1. Unganisha (nenosiri → tokeni ya admin, imehifadhiwa kama muktadha unaokuwa amilifu)
omniroute connect 192.168.0.15                 # au: --key oma_live_xxxx  (hakuna nenosiri)
omniroute contexts current                     # huonyesha seva ya mbali + upeo

# 2. Itumie — sasa amri za usimamizi hutekelezwa dhidi ya seva ya mbali
omniroute tokens create --name laptop --scope read   # unda tokeni yenye upeo finyu zaidi
omniroute tokens list                                 # orodha iliyofichwa kwa kiasi, kutoka seva ya mbali

# 3. Badilisha kwenda na kurudi
omniroute contexts use default                 # → ndani
omniroute contexts use 192-168-0-15            # → mbali tena (jina kutoka `contexts list`)

# 4. Vunja usanidi. KUMBUKA: `contexts remove` hufuta kitambulisho cha NDANI pekee —
#    HAIbatilishi tokeni kwenye seva. Batilisha kwenye seva kwanza ikiwa
#    unataka kusitisha ufikiaji kikamilifu.
omniroute tokens revoke <id|prefix>            # husitisha ufikiaji kwenye seva
omniroute contexts remove 192-168-0-15 --yes   # futa muktadha wa ndani (hata ukiwa amilifu → hurudi kwenye default), bila ombi la uthibitisho
```

> `--yes` hufanya `contexts remove` isiwe ya mwingiliano (inahitajika kwenye hati/CI; bila
> hiyo, shell isiyoingiliana hukataa kwa usalama badala ya kukwama). Kuondoa muktadha
> **amilifu** hurudisha matumizi kwenye `default` kiotomatiki.

---

## Maelezo ya usalama

- Token katika maandishi wazi huonyeshwa mara moja pekee; ni heshi ya SHA-256 pekee inayohifadhiwa (sawa na funguo za API).
- `omniroute connect` hutumia tena kufungiwa baada ya majaribio mengi ya kuingia yasiyofaulu pamoja na uwekaji kumbukumbu za ukaguzi.
- Pendelea HTTPS au Tailnet kwa usafirishaji; host tupu hutumia `http://`
  kwa chaguo-msingi kwa urahisi wa LAN/Tailscale — pitisha URL kamili ya `https://…` ili kutumia TLS.
- Faili ya muktadha wa ndani inayopendekezwa ni `~/.omniroute/config.json` (`chmod 600`)
  iliyo na `credentialRef` pekee; token yenyewe huhifadhiwa katika mfumo wa
  kuhifadhi vitambulisho wa OS (`keytar`) na kamwe haichapishwi katika kumbukumbu. Usakinishaji usio na kiolesura bila
  mfumo asilia wa kuhifadhi vitambulisho unaofanya kazi hutumia faili hiyo hiyo ya `0600` kama mbadala wa moja kwa moja na
  hutoa onyo mara moja. Tumia `omniroute contexts migrate --yes` baada ya kusakinisha
  backend ya mfumo wa kuhifadhi vitambulisho.

---

## Endpoint za API (marejeleo)

| Mbinu  | Njia                  | Uthibitishaji         | Upeo                                |
| ------ | --------------------- | --------------------- | ----------------------------------- |
| POST   | `/api/cli/connect`    | nenosiri la usimamizi | — (ya umma, inalindwa kwa nenosiri) |
| GET    | `/api/cli/whoami`     | token ya ufikiaji     | kusoma                              |
| GET    | `/api/cli/tokens`     | token ya ufikiaji     | usimamizi                           |
| POST   | `/api/cli/tokens`     | token ya ufikiaji     | usimamizi                           |
| DELETE | `/api/cli/tokens/:id` | token ya ufikiaji     | usimamizi                           |

Tazama [openapi.yaml](../openapi.yaml) kwa schema kamili.
