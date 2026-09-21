# Remote Mode (Lietuvių)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/REMOTE-MODE.md) · 🇪🇹 [am](../../../am/docs/guides/REMOTE-MODE.md) · 🇸🇦 [ar](../../../ar/docs/guides/REMOTE-MODE.md) · 🇦🇿 [az](../../../az/docs/guides/REMOTE-MODE.md) · 🇧🇬 [bg](../../../bg/docs/guides/REMOTE-MODE.md) · 🇧🇩 [bn](../../../bn/docs/guides/REMOTE-MODE.md) · 🇨🇿 [cs](../../../cs/docs/guides/REMOTE-MODE.md) · 🇩🇰 [da](../../../da/docs/guides/REMOTE-MODE.md) · 🇩🇪 [de](../../../de/docs/guides/REMOTE-MODE.md) · 🇬🇷 [el](../../../el/docs/guides/REMOTE-MODE.md) · 🇪🇸 [es](../../../es/docs/guides/REMOTE-MODE.md) · 🇪🇪 [et](../../../et/docs/guides/REMOTE-MODE.md) · 🇮🇷 [fa](../../../fa/docs/guides/REMOTE-MODE.md) · 🇫🇮 [fi](../../../fi/docs/guides/REMOTE-MODE.md) · 🇫🇷 [fr](../../../fr/docs/guides/REMOTE-MODE.md) · 🇮🇪 [ga](../../../ga/docs/guides/REMOTE-MODE.md) · 🇮🇳 [gu](../../../gu/docs/guides/REMOTE-MODE.md) · 🇳🇬 [ha](../../../ha/docs/guides/REMOTE-MODE.md) · 🇮🇱 [he](../../../he/docs/guides/REMOTE-MODE.md) · 🇮🇳 [hi](../../../hi/docs/guides/REMOTE-MODE.md) · 🇭🇷 [hr](../../../hr/docs/guides/REMOTE-MODE.md) · 🇭🇺 [hu](../../../hu/docs/guides/REMOTE-MODE.md) · 🇦🇲 [hy](../../../hy/docs/guides/REMOTE-MODE.md) · 🇮🇩 [id](../../../id/docs/guides/REMOTE-MODE.md) · 🇳🇬 [ig](../../../ig/docs/guides/REMOTE-MODE.md) · 🇮🇹 [it](../../../it/docs/guides/REMOTE-MODE.md) · 🇯🇵 [ja](../../../ja/docs/guides/REMOTE-MODE.md) · 🇬🇪 [ka](../../../ka/docs/guides/REMOTE-MODE.md) · 🇰🇭 [km](../../../km/docs/guides/REMOTE-MODE.md) · 🇮🇳 [kn](../../../kn/docs/guides/REMOTE-MODE.md) · 🇰🇷 [ko](../../../ko/docs/guides/REMOTE-MODE.md) · 🇱🇻 [lv](../../../lv/docs/guides/REMOTE-MODE.md) · 🇮🇳 [ml](../../../ml/docs/guides/REMOTE-MODE.md) · 🇮🇳 [mr](../../../mr/docs/guides/REMOTE-MODE.md) · 🇲🇾 [ms](../../../ms/docs/guides/REMOTE-MODE.md) · 🇲🇹 [mt](../../../mt/docs/guides/REMOTE-MODE.md) · 🇲🇲 [my](../../../my/docs/guides/REMOTE-MODE.md) · 🇳🇵 [ne](../../../ne/docs/guides/REMOTE-MODE.md) · 🇳🇱 [nl](../../../nl/docs/guides/REMOTE-MODE.md) · 🇳🇴 [no](../../../no/docs/guides/REMOTE-MODE.md) · 🇮🇳 [or](../../../or/docs/guides/REMOTE-MODE.md) · 🇮🇳 [pa](../../../pa/docs/guides/REMOTE-MODE.md) · 🇵🇭 [phi](../../../phi/docs/guides/REMOTE-MODE.md) · 🇵🇱 [pl](../../../pl/docs/guides/REMOTE-MODE.md) · 🇵🇹 [pt](../../../pt/docs/guides/REMOTE-MODE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/REMOTE-MODE.md) · 🇷🇴 [ro](../../../ro/docs/guides/REMOTE-MODE.md) · 🇷🇺 [ru](../../../ru/docs/guides/REMOTE-MODE.md) · 🇱🇰 [si](../../../si/docs/guides/REMOTE-MODE.md) · 🇸🇰 [sk](../../../sk/docs/guides/REMOTE-MODE.md) · 🇸🇮 [sl](../../../sl/docs/guides/REMOTE-MODE.md) · 🇷🇸 [sr](../../../sr/docs/guides/REMOTE-MODE.md) · 🇸🇪 [sv](../../../sv/docs/guides/REMOTE-MODE.md) · 🇰🇪 [sw](../../../sw/docs/guides/REMOTE-MODE.md) · 🇮🇳 [ta](../../../ta/docs/guides/REMOTE-MODE.md) · 🇮🇳 [te](../../../te/docs/guides/REMOTE-MODE.md) · 🇹🇭 [th](../../../th/docs/guides/REMOTE-MODE.md) · 🇹🇷 [tr](../../../tr/docs/guides/REMOTE-MODE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/REMOTE-MODE.md) · 🇵🇰 [ur](../../../ur/docs/guides/REMOTE-MODE.md) · 🇺🇿 [uz](../../../uz/docs/guides/REMOTE-MODE.md) · 🇻🇳 [vi](../../../vi/docs/guides/REMOTE-MODE.md) · 🇳🇬 [yo](../../../yo/docs/guides/REMOTE-MODE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/REMOTE-MODE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/REMOTE-MODE.md)

---

Paleiskite `omniroute` CLI savo nešiojamajame kompiuteryje, o pati „OmniRoute“ tegul veikia kitur
(VPS, namų serveryje ar kitame jūsų „Tailnet“ įrenginyje). Vieną kartą prisijungiate naudodami
`omniroute connect`, o nuo tada **kiekviena** CLI komanda nukreipiama į tą nuotolinį
serverį — tos pačios komandos, ta pati išvestis, tik vykdoma nuotoliniame serveryje.

Nereikia diegti jokio antro įrankio: nuotolinis režimas yra įprastas `omniroute` CLI
ir aprėptimi apriboti **prieigos prieigos raktai**.

```bash
npm install -g omniroute                 # įprastas CLI
omniroute connect 192.168.0.15           # prisijungti (slaptažodis → aprėptimi apribotas prieigos raktas)
omniroute models list                    # ← dabar pateikiamas NUOTOLINIO serverio modelių sąrašas
omniroute configure codex                # ← pagal nuotolinį katalogą sukuriamas vietinis „Codex“ profilis
```

---

## Kaip tai veikia

```
jūsų nešiojamasis kompiuteris             nuotolinė „OmniRoute“ (VPS)
┌────────────────────┐                   ┌───────────────────────────────┐
│ omniroute CLI      │  POST /api/cli/connect  (slaptažodis → prieigos raktas) │
│  kontekstas: vps   │ ───────────────►  │ išduoda aprėptimi apribotą    │
│  baseUrl, token    │  Authorization: Bearer oma_live_…                  │
│                    │ ───────────────►  │ prieigos raktą; kiekviename    │
│ konfigūracijas     │ ◄───────────────  │ valdymo maršrute tikrinama     │
│ įrašo VIETIŠKAI    │                   │ prieigos rakto aprėptis        │
└────────────────────┘                   └───────────────────────────────┘
```

- **Kontekstuose** saugomas po vieną serverį (`~/.omniroute/config.json`, `chmod 600`).
  `omniroute contexts use <name>` pakeičia aktyvų serverį; `default` yra vietinis.
- **Prieigos raktai** (`oma_live_…`) suteikia teisę vykdyti valdymo komandas. Jie
  skiriasi nuo išvedimo API raktų (`sk-…`, naudojamų su `/v1/chat/completions`).
- Serverio pusėje saugoma tik prieigos rakto SHA-256 maiša. Nešifruotas tekstas parodomas
  **vieną kartą**, sukūrimo metu.

---

## Prisijungimas

### Naudojant valdymo slaptažodį (pradinis parengimas)

```bash
omniroute connect 192.168.0.15
# Valdymo slaptažodis, skirtas http://192.168.0.15:20128: ********
# ✔ Prisijungta prie http://192.168.0.15:20128 — kontekstas „192.168.0.15“ (aprėptis: admin)
```

Pagal numatytąją nuostatą slaptažodžio eiga išduoda **admin** prieigos raktą (kadangi
turite slaptažodį, jau turite visišką valdymą). Aprėptį sumažinkite naudodami `--scope`:

```bash
omniroute connect 192.168.0.15 --scope write
```

Parinktys: `--port <p>` (kai pagrindiniame kompiuteryje prievadas nenurodytas), `--name <ctx>` (konteksto pavadinimas),
`--scope read|write|admin`. Visas URL naudojamas nepakeistas:
`omniroute connect https://omni.example.com`.

### Naudojant iš anksto sugeneruotą prieigos raktą

Valdymo skydelyje (arba naudodami `omniroute tokens create`) sugeneruokite aprėptimi apribotą prieigos raktą ir
įklijuokite jį — slaptažodžio nereikia:

```bash
omniroute connect 192.168.0.15 --key oma_live_xxxxxxxx
```

CLI patikrina jį per `GET /api/cli/whoami` ir išsaugo kaip aktyvų kontekstą.

---

## Aprėptys

Trys hierarchiniai lygiai (`admin ⊃ write ⊃ read`):

| Aprėptis | Leidžiami veiksmai                                                                         |
| -------- | ------------------------------------------------------------------------------------------ |
| `read`   | pateikti sąrašą / peržiūrėti — `models list`, `providers status`, `logs`, `usage`, `cost`  |
| `write`  | skaityti **ir** konfigūruoti / taikyti — `setup-codex`, `keys add`, `config set`, deriniai |
| `admin`  | rašyti **ir** valdyti — `tokens` CRUD, pridėti teikėjus, paslaugos, politika, oauth        |

Serveris nustato kiekvienam maršrutui reikalingą aprėptį pagal HTTP metodą
(`GET`→read, keitimai→write) ir administratoriaus leidžiamų veiksmų sąrašą, skirtą jautrioms sritims
(`/api/cli/tokens`, `/api/providers` keitimai, `/api/oauth`, `/api/services`, …).
Nepakankamos aprėpties prieigos raktas gauna `403` su aiškiu pranešimu.

> Procesus paleidžiantys maršrutai (`/api/services/*`, `/api/mcp/*`, …) lieka
> pasiekiami **tik per loopback** — nuotolinis prieigos raktas niekada negali jų pasiekti, nepaisant jo aprėpties.

---

## Antigravity prijungimas nuotoliniame dieginyje

Antigravity naudoja Google pirmosios šalies / savosios programos sutikimo ekraną. Google
išduoda autorizacijos kodą tik tada, kai **vietinio ciklo peradresavimas**
(`http://127.0.0.1:<port>/callback`) yra **pasiekiamas iš naršyklės, kurioje
patvirtinamas prisijungimas**. Nuotoliniame VPS dieginyje šis vietinis ciklas veikia
serveryje, o ne jūsų kompiuteryje, todėl sutikimo ekranas **užstringa visam laikui ir
kodo nepateikia** — įprastame atsarginiame variante „įklijuokite atgalinio iškvietimo
URL“ nėra ko įklijuoti. (Tai Google pusės apribojimas: taip pat užstringa bet kuris
tarpinis serveris, naudojantis komplekte pateikiamą Antigravity darbalaukio klientą,
ne tik OmniRoute.)

Prietaisų skydelis tai aptinka dar prieš jums įstringant: atidarius **Providers → Antigravity →
Connect** ne iš localhost adreso, bendrasis pranešimas „nukopijuokite atgalinio iškvietimo URL“
pakeičiamas dviem toliau nurodytais sprendimais, kuriuose jūsų prieglobos serveris ir prievadas
jau įrašyti. (LAN adresas taip pat įskaitomas — šio atgalinio iškvietimo požiūriu
`192.168.x.x` nėra localhost.)

Yra du palaikomi būdai prijungti Antigravity prie nuotolinio OmniRoute.

### A variantas — vietinė prisijungimo pagalbinė priemonė (rekomenduojama)

Paleiskite OAuth **savo kompiuteryje**, kuriame `127.0.0.1` yra pasiekiamas. Pagalbinė
priemonė tiesiogiai susisiekia su Google, todėl sutikimo procesas užbaigiamas ten, kur
prietaisų skydelio versija to padaryti negali.

**Jei jau esate prisijungę** (`omniroute connect <host>`), nieko kopijuoti
nereikia — pagalbinė priemonė pati perduos prisijungimo duomenis tam dieginiui:

```bash
# Jūsų VIETINIAME kompiuteryje (reikia Node.js ir naršyklės):
omniroute connect 192.168.0.15        # vieną kartą — sukuria administratoriaus apimties konteksto prieigos raktą
npx omniroute login antigravity
#   ↳ atidaro Google sutikimo ekraną, priima atgalinį iškvietimą per vietinio ciklo prievadą,
#     atlieka keitimą ir POST užklausa nusiunčia prisijungimo duomenis į aktyvų kontekstą:
#
#   Antigravity prijungtas adresu http://192.168.0.15:20128 (ryšys abc123).
#   Nieko įklijuoti nereikia — galite užverti šį terminalą.
```

Perdavimas atliekamas automatiškai, kai aktyvus kontekstas nurodo kitą
kompiuterį. Bet kurią veikseną galite priverstinai įjungti naudodami `--push` / `--no-push`,
o konkretų kontekstą pasirinkti naudodami `--context <name>`.

**Jei jūsų kompiuteris negali pasiekti VPS** (užblokuota užkardos, nėra SSH, izoliuota
darbo vieta), pagalbinė priemonė vis tiek veiks — jai _reikalingas_ tik Google. Naudokite
`--no-push` arba tiesiog leiskite perdavimui nepavykti: tuomet, užuot atmetusi jau
užbaigtą autorizaciją, ji išves duomenų bloką.

```bash
npx omniroute login antigravity --no-push
#   omniroute-cred-v1.eyJ2IjoxLCJ...
```

Tada **nuotoliniame** prietaisų skydelyje pasirinkite **Providers → Antigravity → Connect**
ir įklijuokite `omniroute-cred-v1.…` bloką į lauką **Step 2** (jame galima įvesti
atgalinio iškvietimo URL arba prisijungimo duomenų bloką). OmniRoute jį dekoduoja,
serveryje atlieka Cloud Code įvedimo procesą ir išsaugo ryšį.

> Duomenų bloke yra atnaujinimo prieigos raktas — saugokite jį kaip slaptažodį. Naudojant
> perdavimą, jis vieną kartą siunčiamas autentifikuotu jūsų konteksto ryšiu; įklijuojant —
> jūsų prietaisų skydelio ryšiu. Abiem atvejais jis saugomas užšifruotas, o sėkmingai
> perdavus niekada neišvedamas jūsų terminale.

Parinktys: `--no-browser` (išvesti URL, užuot automatiškai jį atidarius), `--port <n>`
(nustatyti vietinio ciklo prievadą), `--timeout <ms>`, `--push` / `--no-push` (nepaisyti
automatinio pristatymo nuostatos), `--context <name>` (pasirinkti konkretų kontekstą).

### B variantas — SSH vietinio persiuntimo tunelis

Jei turite SSH prieigą prie VPS, persiųskite prietaisų skydelio prievadą, kad vietinio
ciklo atgalinis iškvietimas per tunelį būtų nukreiptas atgal į serverį:

```bash
# Jūsų VIETINIAME kompiuteryje:
ssh -L 20128:127.0.0.1:20128 user@your-vps
# tada VIETINĖJE naršyklėje atidarykite http://localhost:20128 ir įprastai prijunkite Antigravity
# — dabar 127.0.0.1:20128/callback peradresavimas per SSH pasiekia VPS.
```

Kadangi prietaisų skydelį pasiekiate adresu `localhost:20128`, Google sutikimo
procesas užbaigiamas, o atgalinis iškvietimas tuo pačiu tuneliu pristatomas į serverį —
duomenų bloko nereikia. Laikykite tunelį atvirą, kol ryšys bus rodomas kaip aktyvus.

Kitaip nei toliau nurodytiems teikėjams su fiksuotu vietiniu ciklu, čia **pakanka vieno
persiuntimo**: Antigravity atgalinis iškvietimas naudoja patį prietaisų skydelio prievadą,
todėl nereikia tuneliu persiųsti antro, konkrečiam teikėjui skirto prievado.

> Visiškai automatizuota alternatyva be grafinės sąsajos (be pagalbinės priemonės ir be
> tunelio) — sukonfigūruoti **savo** Google OAuth žiniatinklio prisijungimo duomenis ir
> viešą bazinį URL; žr. teikėjo OAuth aplinkos kintamuosius. Dviem pirmiau nurodytiems
> variantams nereikia jokios papildomos Google konfigūracijos.

---

## Codex / Grok prijungimas nuotoliniame diegime (fiksuoto „loopback“ adreso paslaugų teikėjai)

Codex, xAI (`xai-oauth`) ir Grok CLI (`grok-cli`) savo pirminėje OAuth programoje
užregistruoja **fiksuotą** „loopback“ `redirect_uri`. OmniRoute negali jo pakeisti —
paslaugų teikėjas visada nukreipia naršyklę tuo pačiu programoje įrašytu adresu:

| Paslaugų teikėjas | Fiksuotas atgalinio iškvietimo adresas, į kurį nukreipia paslaugų teikėjas |
| ----------------- | -------------------------------------------------------------------------- |
| `codex`           | `http://localhost:1455/auth/callback`                                      |
| `xai-oauth`       | `http://127.0.0.1:56121/callback`                                          |
| `grok-cli`        | `http://127.0.0.1:56122/callback`                                          |

Čia `localhost` reiškia **įrenginį, kuriame veikia naršyklė**, o OmniRoute PKCE
atgalinio iškvietimo serveris klausosi **serverio** „loopback“ sąsajoje. Atidarius
valdymo skydelį LAN adresu, pvz., `http://192.168.0.15:20128`, jie niekada
nesusijungia: autorizavimo kodas pristatomas jūsų nešiojamojo kompiuterio
`localhost:1455`, kur niekas nesiklauso, todėl paslaugų teikėjui nepavyksta
prisijungti ir nepateikiamas joks klaidos pranešimas.

Valdymo skydelis tai aptinka prieš atidarydamas iškylantįjį langą ir, užuot leidęs
prisijungimui nepastebimai nepavykti, parodo tunelio komandą (#8046).

### Sprendimas — persiųskite **abu** prievadus

```bash
# Įrenginyje, kuriame veikia NARŠYKLĖ:
ssh -L 20128:127.0.0.1:20128 -L 1455:127.0.0.1:1455 <user>@192.168.0.15
# tada atverkite http://localhost:20128 ir iš ten prijunkite Codex
```

Reikia dviejų persiuntimų; persiuntus tik vieną, prisijungti vis tiek nepavyks:

- **`20128`** (valdymo skydelio prievadas) padaro šaltinį tikru vietiniu `localhost`,
  todėl OmniRoute apskritai paleidžia PKCE atgalinio iškvietimo serverį — naudojant
  LAN šaltinį ši programos šaka niekada nepasiekiama.
- **`1455`** (fiksuotas paslaugų teikėjo atgalinio iškvietimo prievadas) yra vieta,
  į kurią grąžinama naršyklė; jis turi būti tuneliu nukreiptas į serverio
  „loopback“ sąsają.

Jungdami xAI arba Grok CLI pakeiskite `1455` į `56121`/`56122`, o `20128` — į
faktinį savo valdymo skydelio prievadą. Laikykite tunelį atidarytą, kol ryšys bus
rodomas kaip aktyvus.

> **Neturite SSH prieigos?** Codex ir Grok CLI taip pat priima įklijuotą prieigos
> raktą — prisijungimo dialogo kortelėje **Įklijuoti API raktą** / **Importuoti
> auth.json**. Šis būdas nenaudoja „loopback“ atgalinio iškvietimo, todėl veikia
> iš bet kokio šaltinio. Be to, Codex priima atskirą prieigos raktą arba
> `~/.codex/auth.json` seanso duomenų bloką.

---

## Prieigos raktų valdymas

```bash
omniroute tokens create --name "laptop" --scope write [--expires 30]
#   ↳ paslaptis parodoma VIENĄ KARTĄ — nukopijuokite ją dabar
omniroute tokens list                 # užmaskuota: ID, pavadinimas, aprėptis, prefiksas, būsena, galiojimo pabaiga
omniroute tokens revoke <id|prefix>   # nedelsiant atšaukti
omniroute tokens scopes               # paaiškinti tris aprėptis
```

`tokens` komandoms reikia **administratoriaus** kredencialų. Prieigos raktus taip
pat galite valdyti valdymo skydelio skiltyje **Nustatymai → Prieigos raktai**
(sukurti, atšaukti, nukopijuoti vieną kartą).

---

## Programavimo CLI konfigūravimas iš nuotolinio katalogo

`omniroute configure` nuskaito **aktyvaus serverio** modelių katalogą realiuoju
laiku ir įrašo konfigūraciją **jūsų** įrenginyje.

```bash
omniroute configure codex
#   Paslaugų teikėjai: glm, kmc, ollamacloud, opencode-go, …
#   Paslaugų teikėjas: glm
#   Modelio ID: glm/glm-5.2
#   ✔ Įrašyta ~/.codex/glm52.config.toml
#   Naudojimas:  codex --profile glm52

# neinteraktyvus režimas
omniroute configure codex --provider glm --model glm/glm-5.2 --name glm52

# laikyti dažnai naudojamą modelį interaktyvaus parinkiklio viršuje
omniroute configure codex --provider glm --model glm/glm-5.2 --favorite --yes
```

Parinkiklis vietiniame `model-preferences.json` faile saugo tik modelių ID
(niekada ne URL ar kredencialus), suskirstytus pagal kontekstą ir CLI paskirtį.
Mėgstamiausi rodomi prieš naujausius pasirinkimus; norėdami pašalinti pasirinktą
modelį iš to konteksto ir paskirties sąrašo, naudokite `--unfavorite`.

Įrašytame profilyje išvedimo raktas nurodomas per aplinkos kintamąjį
(`OMNIROUTE_API_KEY`) — paslaptis niekada neįrašoma į diską. Vienkartinio
pagrindinio Codex nustatymo (`[model_providers.omniroute]` bloko) instrukcijas
žr. [CODEX-CLI-CONFIGURATION.md](./CODEX-CLI-CONFIGURATION.md).

### CLI paleidimas nuotoliniam serveriui (neįrašant konfigūracijos)

`omniroute run <target>` taip pat naudoja aktyvų kontekstą: nuotolinis bazinis URL
ir konteksto kredencialai įterpiami tik į paleistą procesą.

```bash
omniroute connect 192.168.0.15
omniroute run claude   --model openai/gpt-5.4          # Claude Code → nuotolinis serveris
omniroute run gemini   --model glm/glm-5.2 -- --skip-trust -p "hello"
omniroute run opencode --model glm/glm-5.2 -- run "reply OK"

# Tiksliai peržiūrėti, kas būtų paleista (tik aplinkos KINTAMŲJŲ PAVADINIMAI, niekada ne reikšmės):
omniroute run codex --dry-run --json
```

Paskirtys: `claude`, `codex`, `aider`, `goose`, `opencode`, `qwen`, `gemini`
(vienintelis šaltinis: `bin/cli/cli-manifest.mjs`). Qwen ir Gemini paleidžiami
naudojant laikiną izoliuotą namų katalogą, kuris pašalinamas baigus darbą, todėl
paleidimas niekada nepakeičia jūsų asmeninės įrankių konfigūracijos ir į ją
nenutekina duomenų.

### Kiekvienai CLI skirtos nustatymo komandos

Kiekviena palaikoma CLI turi nuotolinį serverį palaikančią nustatymo komandą
(visos naudoja aktyvų kontekstą arba `--remote <url> --api-key <key>`):

| CLI         | Komanda                    | Ką ji įrašo                                                                                                                                                                                |
| ----------- | -------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Codex       | `omniroute setup-codex`    | `~/.codex/<name>.config.toml` profilius (kiekvienam modeliui)                                                                                                                              |
| Claude Code | `omniroute setup-claude`   | `~/.claude/profiles/<name>/settings.json` (kiekvienam modeliui)                                                                                                                            |
| OpenCode    | `omniroute setup-opencode` | `~/.config/opencode/opencode.json` — su OpenAI suderinamą `omniroute` teikėją su visais katalogo modeliais (paleiskite `opencode -m omniroute/<model>`)                                    |
| Cline       | `omniroute setup-cline`    | `~/.cline/data/{globalState,secrets}.json` (CLI režimu) + išspausdina įklijuotinus VS Code plėtinio nustatymus (suderinama su OpenAI, bazinis URL **be** `/v1`)                            |
| Kilo Code   | `omniroute setup-kilo`     | `~/.local/share/kilo/auth.json` (CLI) + VS Code `kilocode.*` nustatymus — suderinama su OpenAI, bazinis URL **su** `/v1`                                                                   |
| Continue    | `omniroute setup-continue` | `~/.continue/config.yaml` (VS Code/JetBrains + `cn` CLI) — `provider: openai`, `apiBase` **su** `/v1`, raktas per `${{ secrets.OMNIROUTE_API_KEY }}`                                       |
| Cursor      | `omniroute setup-cursor`   | išspausdina veiksmus programoje (Settings → Models → Override OpenAI Base URL **su** `/v1` + raktas + modelis). Cursor konfigūracija yra nepermatoma SQLite — tik pokalbių skydeliui       |
| Roo Code    | `omniroute setup-roo`      | įrašo Roo importavimo JSON (`~/.omniroute/roo-settings.json`) + nustato `roo-cline.autoImportSettingsPath` + išspausdina sąsajos veiksmus (suderinama su OpenAI, bazinis URL **su** `/v1`) |
| Crush       | `omniroute setup-crush`    | `~/.config/crush/crush.json` — `openai-compat` teikėją, `base_url` **su** `/v1`, raktas per `$OMNIROUTE_API_KEY`                                                                           |
| Goose       | `omniroute setup-goose`    | `~/.config/goose/config.yaml` (`GOOSE_PROVIDER=openai` + `OPENAI_HOST` **be** `/v1` + `GOOSE_MODEL`) + aplinkos kintamųjų instrukciją                                                      |
| Aider       | `omniroute setup-aider`    | `~/.aider.conf.yml` (`openai-api-base` **be** `/v1` + `model: openai/<id>`) + aplinkos kintamųjų instrukciją (`aider --message --yes`)                                                     |
| Qwen Code   | `omniroute setup-qwen`     | `~/.qwen/settings.json` V4 `modelProviders.openai` įrašą + `OMNIROUTE_API_KEY` faile `~/.qwen/.env`                                                                                        |

```bash
# OpenCode (su OpenAI suderinamas teikėjas, visi katalogo modeliai, nuotolinis VPS)
omniroute setup-opencode --remote http://192.168.0.15:20128 --api-key oma_live_xxx
omniroute setup-opencode --only glm,kimi        # palikti tik atitinkančius modelius
opencode -m omniroute/glm/glm-5.2 "..."          # pirmiausia export OMNIROUTE_API_KEY
```

> OpenCode taip pat turi funkcionalesnę **papildinio** integraciją: `omniroute setup opencode`
> (dabar palaikančią nuotolinį veikimą per `--remote`), kuri įdiegia `@omniroute/opencode-plugin`.
> `setup-opencode` yra paprastesnė, su OpenAI suderinama alternatyva. API raktas
> nurodomas per `{env:OMNIROUTE_API_KEY}` — jis niekada neįrašomas į diską.
>
> OpenCode v2 versijoje vietoje jo naudokite `@omniroute/opencode-plugin-v2`: tas pats katalogas,
> kitokia įkėliklio sutartis. Kai integracija prijungta, jis nuskaito raktą iš pačios OpenCode kredencialų
> saugyklos, todėl nuotoliniam šliuzui faile
> `opencode.json` rakto visai nereikia.

---

## Kontekstų valdymas (serverių perjungimas)

**Kontekstas** – tai išsaugotas serveris (baseUrl + prisijungimo duomenys + taikymo sritis). `omniroute connect`
jį sukuria ir padaro aktyvų; nuo tada visos komandos taikomos jam. Valdykite ir
perjunkite kontekstus naudodami `omniroute contexts`:

```bash
omniroute contexts list            # visi kontekstai; aktyvusis pažymėtas ●
omniroute contexts current         # aktyvus serveris, autentifikavimo būsena, taikymo sritis
```

```text
  | Pavadinimas | Bazinis URL                | Autent. | Taikymo sritis | Aprašymas
● | vps         | http://100.67.86.91:20128 | token   | admin           | Nuotolinis „OmniRoute“ (…)
  | default     | http://localhost:20128    | ✗       |                 |
```

**Serverių perjungimas** – visos paskesnės komandos naudoja aktyvų kontekstą:

```bash
omniroute contexts use vps         # → dabar visos komandos siunčiamos į nuotolinį VPS
omniroute tokens list              #   (vykdoma VPS serveryje)

omniroute contexts use default     # → grįžtama į localhost
omniroute tokens list              #   (vykdoma vietiniame serveryje)
```

**Konteksto pridėjimas rankiniu būdu** (užuot naudojus `connect`), jo peržiūra arba pervadinimas:

```bash
omniroute contexts add staging --url https://staging.example.com:20128 \
  --access-token oma_live_xxxx --scope write --description "testavimo serveris"
omniroute contexts show staging    # visa vieno konteksto informacija
omniroute contexts rename staging stg
```

**Konteksto pašalinimas** – prašoma patvirtinti; norėdami tai praleisti, nurodykite `--yes`
(būtina scenarijuose / neinteraktyviuose apvalkaluose, kurie kitu atveju saugiai atsisako vykdyti veiksmą):

```bash
omniroute contexts remove stg --yes
```

> `default` (localhost) pašalinti negalima. Pašalinus aktyvų kontekstą, grįžtama
> prie `default`. Patarimas: pašalinus kontekstą ištrinami tik **vietoje** išsaugoti prisijungimo duomenys –
> norėdami iš tikrųjų panaikinti prieigą, atšaukite prieigos raktą serveryje naudodami `omniroute tokens revoke <id>`.

Kontekstų **eksportavimas / importavimas** (pvz., norint juos perkelti iš vieno kompiuterio į kitą). Naujuose kontekstuose išsaugoma
tik nuoroda į raktinę; kai prieinama OS raktinė, prisijungimo duomenys į eksportą
nekopijuojami:

```bash
omniroute contexts export --out contexts.json     # numatytoji išvestis: stdout
omniroute contexts import contexts.json            # perrašyti; naudokite --merge, kad išsaugotumėte esamus
omniroute contexts migrate --yes                  # perkelti senus atvirojo teksto prieigos raktus į raktinę
```

Sistemose be grafinės sąsajos, kuriose negalima naudoti OS raktinės, CLI kaip atsarginį variantą naudoja
`config.json` su režimu `0600` ir parodo vienkartinį įspėjimą. Iš šio
atsarginio varianto eksportuotus duomenis (ir bet kokią seną konfigūraciją prieš perkėlimą) laikykite slapta medžiaga.

---

## Greita viso proceso patikra

Nukopijuojama komandų seka, skirta nuotolinei sąrankai patikrinti nuo pradžių: prisijungti, sukurti
apribotos taikymo srities prieigos raktą, nukreipti komandą, grįžti atgal ir viską pašalinti. Pakeiskite
`192.168.0.15` savo serverio pagrindinio kompiuterio vardu / IP adresu („Tailscale“, LAN arba viešu
`https://…` URL).

```bash
# 1. Prisijunkite (slaptažodis → administratoriaus prieigos raktas, išsaugomas kaip aktyviu tampantis kontekstas)
omniroute connect 192.168.0.15                 # arba: --key oma_live_xxxx  (be slaptažodžio)
omniroute contexts current                     # parodo nuotolinį serverį ir taikymo sritį

# 2. Naudokite jį – dabar valdymo komandos vykdomos nuotoliniame serveryje
omniroute tokens create --name laptop --scope read   # sukuria siauresnės taikymo srities prieigos raktą
omniroute tokens list                                 # užmaskuotas sąrašas iš nuotolinio serverio

# 3. Perjunkite pirmyn ir atgal
omniroute contexts use default                 # → vietinis
omniroute contexts use 192-168-0-15            # → vėl nuotolinis (pavadinimas iš `contexts list`)

# 4. Pašalinkite. PASTABA: `contexts remove` ištrina tik VIETINIUS prisijungimo duomenis –
#    ji NEATŠAUKIA prieigos rakto serveryje. Jei norite iš tikrųjų
#    panaikinti prieigą, pirmiausia atšaukite jį serveryje.
omniroute tokens revoke <id|prefix>            # panaikina prieigą serveryje
omniroute contexts remove 192-168-0-15 --yes   # pašalina vietinį kontekstą (net jei jis aktyvus → grįžtama prie default), be patvirtinimo
```

> `--yes` leidžia vykdyti `contexts remove` neinteraktyviai (būtina scenarijuose / CI; be
> jo neinteraktyvus apvalkalas saugiai atsisako vykdyti veiksmą, užuot pakibęs). Pašalinus
> **aktyvų** kontekstą, automatiškai grįžtama prie `default`.

---

## Saugumo pastabos

- Atviras prieigos rakto tekstas parodomas vieną kartą; išsaugoma tik SHA-256 maiša (kaip ir API raktų).
- `omniroute connect` pakartotinai naudoja prisijungimo apsaugą nuo bandymų parinkti slaptažodį ir audito žurnalų registravimą.
- Duomenims perduoti rekomenduojama naudoti HTTPS arba Tailnet; nurodžius tik pagrindinį kompiuterį, pagal numatytąsias nuostatas naudojama `http://`, kad būtų patogu naudoti LAN / Tailscale tinkle — norėdami naudoti TLS, perduokite visą `https://…` URL.
- Rekomenduojamas vietinio konteksto failas yra `~/.omniroute/config.json` (`chmod 600`), kuriame yra tik `credentialRef`; pats prieigos raktas saugomas OS raktinėje (`keytar`) ir niekada nespausdinamas žurnaluose. Diegimuose be grafinės sąsajos, kuriuose nėra veikiančios savosios raktinės, kaip aiškiai nurodyta atsarginė priemonė naudojamas tas pats `0600` failas ir vieną kartą pateikiamas įspėjimas. Įdiegę raktinės posistemę, naudokite `omniroute contexts migrate --yes`.

---

## API galiniai taškai (žinynas)

| Metodas | Maršrutas             | Autentifikavimas    | Apimtis                             |
| ------- | --------------------- | ------------------- | ----------------------------------- |
| POST    | `/api/cli/connect`    | valdymo slaptažodis | — (viešas, apsaugotas slaptažodžiu) |
| GET     | `/api/cli/whoami`     | prieigos raktas     | skaitymas                           |
| GET     | `/api/cli/tokens`     | prieigos raktas     | administravimas                     |
| POST    | `/api/cli/tokens`     | prieigos raktas     | administravimas                     |
| DELETE  | `/api/cli/tokens/:id` | prieigos raktas     | administravimas                     |

Išsamias schemas žr. [openapi.yaml](../openapi.yaml).
