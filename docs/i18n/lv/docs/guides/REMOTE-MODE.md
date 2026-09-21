# Remote Mode (Latviešu)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/REMOTE-MODE.md) · 🇪🇹 [am](../../../am/docs/guides/REMOTE-MODE.md) · 🇸🇦 [ar](../../../ar/docs/guides/REMOTE-MODE.md) · 🇦🇿 [az](../../../az/docs/guides/REMOTE-MODE.md) · 🇧🇬 [bg](../../../bg/docs/guides/REMOTE-MODE.md) · 🇧🇩 [bn](../../../bn/docs/guides/REMOTE-MODE.md) · 🇨🇿 [cs](../../../cs/docs/guides/REMOTE-MODE.md) · 🇩🇰 [da](../../../da/docs/guides/REMOTE-MODE.md) · 🇩🇪 [de](../../../de/docs/guides/REMOTE-MODE.md) · 🇬🇷 [el](../../../el/docs/guides/REMOTE-MODE.md) · 🇪🇸 [es](../../../es/docs/guides/REMOTE-MODE.md) · 🇪🇪 [et](../../../et/docs/guides/REMOTE-MODE.md) · 🇮🇷 [fa](../../../fa/docs/guides/REMOTE-MODE.md) · 🇫🇮 [fi](../../../fi/docs/guides/REMOTE-MODE.md) · 🇫🇷 [fr](../../../fr/docs/guides/REMOTE-MODE.md) · 🇮🇪 [ga](../../../ga/docs/guides/REMOTE-MODE.md) · 🇮🇳 [gu](../../../gu/docs/guides/REMOTE-MODE.md) · 🇳🇬 [ha](../../../ha/docs/guides/REMOTE-MODE.md) · 🇮🇱 [he](../../../he/docs/guides/REMOTE-MODE.md) · 🇮🇳 [hi](../../../hi/docs/guides/REMOTE-MODE.md) · 🇭🇷 [hr](../../../hr/docs/guides/REMOTE-MODE.md) · 🇭🇺 [hu](../../../hu/docs/guides/REMOTE-MODE.md) · 🇦🇲 [hy](../../../hy/docs/guides/REMOTE-MODE.md) · 🇮🇩 [id](../../../id/docs/guides/REMOTE-MODE.md) · 🇳🇬 [ig](../../../ig/docs/guides/REMOTE-MODE.md) · 🇮🇹 [it](../../../it/docs/guides/REMOTE-MODE.md) · 🇯🇵 [ja](../../../ja/docs/guides/REMOTE-MODE.md) · 🇬🇪 [ka](../../../ka/docs/guides/REMOTE-MODE.md) · 🇰🇭 [km](../../../km/docs/guides/REMOTE-MODE.md) · 🇮🇳 [kn](../../../kn/docs/guides/REMOTE-MODE.md) · 🇰🇷 [ko](../../../ko/docs/guides/REMOTE-MODE.md) · 🇱🇹 [lt](../../../lt/docs/guides/REMOTE-MODE.md) · 🇮🇳 [ml](../../../ml/docs/guides/REMOTE-MODE.md) · 🇮🇳 [mr](../../../mr/docs/guides/REMOTE-MODE.md) · 🇲🇾 [ms](../../../ms/docs/guides/REMOTE-MODE.md) · 🇲🇹 [mt](../../../mt/docs/guides/REMOTE-MODE.md) · 🇲🇲 [my](../../../my/docs/guides/REMOTE-MODE.md) · 🇳🇵 [ne](../../../ne/docs/guides/REMOTE-MODE.md) · 🇳🇱 [nl](../../../nl/docs/guides/REMOTE-MODE.md) · 🇳🇴 [no](../../../no/docs/guides/REMOTE-MODE.md) · 🇮🇳 [or](../../../or/docs/guides/REMOTE-MODE.md) · 🇮🇳 [pa](../../../pa/docs/guides/REMOTE-MODE.md) · 🇵🇭 [phi](../../../phi/docs/guides/REMOTE-MODE.md) · 🇵🇱 [pl](../../../pl/docs/guides/REMOTE-MODE.md) · 🇵🇹 [pt](../../../pt/docs/guides/REMOTE-MODE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/REMOTE-MODE.md) · 🇷🇴 [ro](../../../ro/docs/guides/REMOTE-MODE.md) · 🇷🇺 [ru](../../../ru/docs/guides/REMOTE-MODE.md) · 🇱🇰 [si](../../../si/docs/guides/REMOTE-MODE.md) · 🇸🇰 [sk](../../../sk/docs/guides/REMOTE-MODE.md) · 🇸🇮 [sl](../../../sl/docs/guides/REMOTE-MODE.md) · 🇷🇸 [sr](../../../sr/docs/guides/REMOTE-MODE.md) · 🇸🇪 [sv](../../../sv/docs/guides/REMOTE-MODE.md) · 🇰🇪 [sw](../../../sw/docs/guides/REMOTE-MODE.md) · 🇮🇳 [ta](../../../ta/docs/guides/REMOTE-MODE.md) · 🇮🇳 [te](../../../te/docs/guides/REMOTE-MODE.md) · 🇹🇭 [th](../../../th/docs/guides/REMOTE-MODE.md) · 🇹🇷 [tr](../../../tr/docs/guides/REMOTE-MODE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/REMOTE-MODE.md) · 🇵🇰 [ur](../../../ur/docs/guides/REMOTE-MODE.md) · 🇺🇿 [uz](../../../uz/docs/guides/REMOTE-MODE.md) · 🇻🇳 [vi](../../../vi/docs/guides/REMOTE-MODE.md) · 🇳🇬 [yo](../../../yo/docs/guides/REMOTE-MODE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/REMOTE-MODE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/REMOTE-MODE.md)

---

Palaidiet `omniroute` CLI savā klēpjdatorā, kamēr pats OmniRoute darbojas citur
(VPS, mājas serverī vai citā ierīcē jūsu Tailnet tīklā). Vienreiz piesakieties ar
`omniroute connect`, un turpmāk **katra** CLI komanda tiks izpildīta attālajā
serverī — tās pašas komandas, tā pati izvade, tikai izpilde notiek attāli.

Nav jāinstalē otrs rīks: attālais režīms izmanto parasto `omniroute` CLI
kopā ar tvēruma **piekļuves pilnvarām**.

```bash
npm install -g omniroute                 # parastais CLI
omniroute connect 192.168.0.15           # pieteikšanās (parole → tvēruma pilnvara)
omniroute models list                    # ← tagad uzskaita ATTĀLĀ servera modeļus
omniroute configure codex                # ← izveido lokālu Codex profilu no attālā kataloga
```

---

## Kā tas darbojas

```
jūsu klēpjdators                         attālais OmniRoute (VPS)
┌────────────────────┐                   ┌───────────────────────────────┐
│ omniroute CLI      │  POST /api/cli/connect  (parole → pilnvara)        │
│  konteksts: vps    │ ───────────────►  │ izveido tvēruma piekļuves      │
│  baseUrl, pilnvara │  Authorization: Bearer oma_live_…                  │
│                    │ ───────────────►  │ pilnvaru; katrs pārvaldības     │
│ raksta konfigurāciju│ ◄───────────────  │ maršruts pārbauda tās tvērumu  │
│ LOKĀLI             │                   └───────────────────────────────┘
└────────────────────┘
```

- **Konteksti** glabā pa vienam serverim (`~/.omniroute/config.json`, `chmod 600`).
  `omniroute contexts use <name>` pārslēdz aktīvo serveri; `default` ir lokālais.
- **Piekļuves pilnvaras** (`oma_live_…`) autorizē pārvaldības komandas. Tās
  atšķiras no inferenču API atslēgām (`sk-…`, ko izmanto `/v1/chat/completions`).
- Servera pusē tiek glabāts tikai pilnvaras SHA-256 jaucējkods. Pilnvara atklātā
  tekstā tiek parādīta **vienreiz** — izveides brīdī.

---

## Savienojuma izveide

### Ar pārvaldības paroli (sākotnējā iestatīšana)

```bash
omniroute connect 192.168.0.15
# Pārvaldības parole serverim http://192.168.0.15:20128: ********
# ✔ Savienots ar http://192.168.0.15:20128 — konteksts '192.168.0.15' (tvērums: admin)
```

Paroles plūsma pēc noklusējuma izveido **admin** pilnvaru (jums ir parole, tātad
jums jau ir pilna kontrole). Samaziniet tvērumu ar `--scope`:

```bash
omniroute connect 192.168.0.15 --scope write
```

Opcijas: `--port <p>` (ja resursdatoram nav norādīts ports), `--name <ctx>` (konteksta nosaukums),
`--scope read|write|admin`. Pilns URL tiek izmantots tieši tā, kā norādīts:
`omniroute connect https://omni.example.com`.

### Ar iepriekš ģenerētu pilnvaru

Ģenerējiet tvēruma pilnvaru informācijas panelī (vai ar `omniroute tokens create`) un
ielīmējiet to — parole nav nepieciešama:

```bash
omniroute connect 192.168.0.15 --key oma_live_xxxxxxxx
```

CLI to pārbauda, izmantojot `GET /api/cli/whoami`, un saglabā kā aktīvo kontekstu.

---

## Tvērumi

Trīs hierarhiski līmeņi (`admin ⊃ write ⊃ read`):

| Tvērums | Atļautās darbības                                                                                |
| ------- | ------------------------------------------------------------------------------------------------ |
| `read`  | uzskaitīt/pārbaudīt — `models list`, `providers status`, `logs`, `usage`, `cost`                 |
| `write` | lasīt **+** konfigurēt/lieto — `setup-codex`, `keys add`, `config set`, kombinācijas             |
| `admin` | rakstīt **+** pārvaldīt — `tokens` CRUD, pievienot nodrošinātājus, pakalpojumus, politiku, oauth |

Serveris nosaka katram maršrutam nepieciešamo tvērumu pēc HTTP metodes
(`GET`→read, izmaiņas→write), kā arī izmanto admin atļauto sarakstu sensitīvajām
saskarnēm (`/api/cli/tokens`, `/api/providers` izmaiņas, `/api/oauth`, `/api/services`, …).
Pilnvara ar nepietiekamu tvērumu saņem `403` ar skaidru ziņojumu.

> Maršruti, kas palaiž procesus (`/api/services/*`, `/api/mcp/*`, …), paliek
> pieejami **tikai lokālajā cilpā** — attāla pilnvara tiem nekad nevar piekļūt
> neatkarīgi no tvēruma.

---

## Antigravity savienošana attālā instalācijā

Antigravity izmanto Google pirmās puses/vietējās lietotnes piekrišanas ekrānu. Google
izsniedz autorizācijas kodu tikai tad, ja **atgriezeniskās cilpas novirzīšana**
(`http://127.0.0.1:<port>/callback`) ir **sasniedzama no pārlūkprogrammas, kurā
tiek apstiprināta pierakstīšanās**. Attālā VPS instalācijā šī atgriezeniskā cilpa
atrodas serverī, nevis jūsu datorā, tāpēc piekrišanas ekrāns **uzkaras uz visiem
laikiem un nekad neizsniedz kodu** — parastajā rezerves variantā „ielīmējiet
atzvanīšanas URL” nav nekā, ko ielīmēt. (Tas ir Google puses ierobežojums: tāda
pati uzkāršanās notiek jebkurā starpniekserverī, kas izmanto komplektācijā iekļauto
Antigravity darbvirsmas klientu, ne tikai OmniRoute.)

Informācijas panelis to nosaka, pirms nonākat strupceļā: atverot **Pakalpojumu sniedzēji → Antigravity →
Savienot** no adreses, kas nav localhost, vispārīgais paziņojums „kopējiet atzvanīšanas URL”
tiek aizstāts ar abiem tālāk norādītajiem risinājumiem, kuros jūsu resursdators un ports
jau ir aizpildīti. (Arī LAN adrese tiek ņemta vērā — attiecībā uz šo atzvanīšanu
`192.168.x.x` nav localhost.)

Ir divi atbalstīti veidi, kā savienot Antigravity ar attālu OmniRoute.

### A variants — lokālais pieteikšanās palīgrīks (ieteicams)

Palaidiet OAuth **savā datorā**, kur `127.0.0.1` ir sasniedzama. Palīgrīks
sazinās ar Google tieši, tāpēc piekrišanas process tiek pabeigts tur, kur informācijas
paneļa versija to nevar paveikt.

**Ja savienojums jau ir izveidots** (`omniroute connect <host>`), nekas nav
jākopē — palīgrīks jūsu vietā nogādā akreditācijas datus attiecīgajai instalācijai:

```bash
# Jūsu LOKĀLAJĀ datorā (nepieciešams Node.js un pārlūkprogramma):
omniroute connect 192.168.0.15        # vienreiz — izveido administratora tvēruma konteksta pilnvaru
npx omniroute login antigravity
#   ↳ atver Google piekrišanas ekrānu, uztver atzvanīšanu lokālā atgriezeniskās cilpas portā,
#     apmaina to un ar POST nosūta akreditācijas datus aktīvajam kontekstam:
#
#   Antigravity savienots vietnē http://192.168.0.15:20128 (savienojums abc123).
#   Nekas nav jāielīmē — varat aizvērt šo termināli.
```

Nosūtīšana notiek automātiski, kad aktīvais konteksts norāda uz citu
datoru. Piespiediet to jebkurā virzienā ar `--push` / `--no-push` vai norādiet konkrētu
kontekstu ar `--context <name>`.

**Ja jūsu dators nevar sasniegt VPS** (ugunsmūra dēļ, nav SSH vai darbstacija ir izolēta),
palīgrīks tik un tā darbojas — tam _nepieciešams_ tikai Google. Izmantojiet `--no-push`
vai vienkārši ļaujiet nosūtīšanai neizdoties: autorizācija, ko jau pabeidzāt, netiks
atmesta, bet tā vietā palīgrīks izdrukās datu bloku.

```bash
npx omniroute login antigravity --no-push
#   omniroute-cred-v1.eyJ2IjoxLCJ...
```

Pēc tam **attālajā** informācijas panelī atveriet **Pakalpojumu sniedzēji → Antigravity → Savienot** un ielīmējiet
`omniroute-cred-v1.…` datu bloku **2. darbības** laukā (tas pieņem gan
atzvanīšanas URL, gan akreditācijas datu bloku). OmniRoute to atkodē, servera pusē
izpilda Cloud Code sākotnējo iestatīšanu un saglabā savienojumu.

> Datu blokā ir atsvaidzināšanas pilnvara — izturieties pret to kā pret paroli. Izmantojot nosūtīšanu, tas
> tiek vienreiz nosūtīts, izmantojot jūsu konteksta autentificēto savienojumu; izmantojot
> ielīmēšanu — jūsu informācijas paneļa savienojumu. Abos gadījumos tas miera stāvoklī tiek glabāts
> šifrētā veidā, un veiksmīgas nosūtīšanas gadījumā tas nekad netiek izdrukāts terminālī.

Karodziņi: `--no-browser` (izdrukāt URL, nevis automātiski to atvērt), `--port <n>`
(fiksēt atgriezeniskās cilpas portu), `--timeout <ms>`, `--push` / `--no-push` (ignorēt
automātiskās piegādes iestatījumu), `--context <name>` (norādīt konkrētu kontekstu).

### B variants — SSH lokālās pārsūtīšanas tunelis

Ja jums ir SSH piekļuve VPS, pārsūtiet informācijas paneļa portu, lai
atgriezeniskās cilpas atzvanīšana caur tuneli atkal nonāktu serverī:

```bash
# Jūsu LOKĀLAJĀ datorā:
ssh -L 20128:127.0.0.1:20128 user@your-vps
# pēc tam LOKĀLAJĀ pārlūkprogrammā atveriet http://localhost:20128 un savienojiet Antigravity
# kā parasti — 127.0.0.1:20128/callback novirzīšana tagad sasniedz VPS, izmantojot SSH.
```

Tā kā informācijas panelim piekļūstat kā `localhost:20128`, Google piekrišanas
process tiek pabeigts un atzvanīšana tiek nogādāta serverī caur to pašu tuneli —
datu bloks nav nepieciešams. Turiet tuneli atvērtu, līdz savienojums tiek parādīts kā aktīvs.

Atšķirībā no tālāk minētajiem pakalpojumu sniedzējiem ar fiksētu atgriezenisko cilpu, šeit pietiek ar **vienu pārsūtīšanu**:
Antigravity atzvanīšana izmanto pašu informācijas paneļa portu, tāpēc nav nepieciešams
tunelēt otru, konkrētajam pakalpojumu sniedzējam paredzētu portu.

> Pilnībā bezgalvas alternatīva (bez palīgrīka un tuneļa) ir konfigurēt **savus**
> Google OAuth tīmekļa akreditācijas datus un publisku bāzes URL; skatiet pakalpojumu sniedzēja OAuth
> vides mainīgos. Abiem iepriekš minētajiem variantiem nav nepieciešama papildu Google konfigurācija.

---

## Codex / Grok savienošana attālā instalācijā (pakalpojumu sniedzēji ar fiksētu atgriezeniskās cilpas adresi)

Codex, xAI (`xai-oauth`) un Grok CLI (`grok-cli`) savā augšupējā OAuth lietotnē reģistrē
**fiksētu** atgriezeniskās cilpas `redirect_uri`. OmniRoute to nevar mainīt — pakalpojumu
sniedzējs vienmēr novirza pārlūkprogrammu atpakaļ uz to pašu iepriekš definēto adresi:

| Pakalpojumu sniedzējs | Fiksētais atzvanīšanas URL, uz kuru novirza pakalpojumu sniedzējs |
| --------------------- | ----------------------------------------------------------------- |
| `codex`               | `http://localhost:1455/auth/callback`                             |
| `xai-oauth`           | `http://127.0.0.1:56121/callback`                                 |
| `grok-cli`            | `http://127.0.0.1:56122/callback`                                 |

`localhost` šeit nozīmē **datoru, kurā darbojas pārlūkprogramma**, savukārt OmniRoute PKCE
atzvanīšanas serveris klausās **servera** atgriezeniskās cilpas interfeisā. Atverot informācijas paneli
LAN adresē, piemēram, `http://192.168.0.15:20128`, tie nekad nesavienojas: autorizācijas
kods tiek piegādāts jūsu klēpjdatora adresei `localhost:1455`, kur nekas neklausās,
un pakalpojumu sniedzējs nevar pabeigt pierakstīšanos, neparādot kļūdu.

Informācijas panelis to nosaka pirms uznirstošā loga atvēršanas un parāda tuneļa komandu,
nevis ļauj pieteikšanās procesam nemanāmi izgāzties (#8046).

### Risinājums — pārsūtiet **abas** pieslēgvietas

```bash
# Datorā, kurā darbojas PĀRLŪKPROGRAMMA:
ssh -L 20128:127.0.0.1:20128 -L 1455:127.0.0.1:1455 <user>@192.168.0.15
# pēc tam atveriet http://localhost:20128 un no turienes savienojiet Codex
```

Ir nepieciešamas divas pārsūtīšanas; arī tikai vienas pieslēgvietas pārsūtīšana nedarbosies:

- **`20128`** (informācijas paneļa pieslēgvieta) padara izcelsmi par īstu lokālo `localhost`, kas
  vispār ļauj OmniRoute palaist PKCE atzvanīšanas serveri — LAN izcelsme nekad
  nesasniedz šo atzaru.
- **`1455`** (pakalpojumu sniedzēja fiksētā atzvanīšanas pieslēgvieta) ir vieta, uz kuru pārlūkprogramma tiek novirzīta
  atpakaļ; tai pa tuneli jāsasniedz servera atgriezeniskās cilpas interfeiss.

Savienojot xAI vai Grok CLI, aizstājiet `1455` ar `56121`/`56122`, bet `20128` — ar
savu faktisko informācijas paneļa pieslēgvietu. Turiet tuneli atvērtu, līdz savienojums tiek parādīts kā
aktīvs.

> **Nav SSH piekļuves?** Codex un Grok CLI pieņem arī ielīmētu pilnvaru — savienošanas dialoglodziņa cilnē **Ielīmēt API
> atslēgu** / **Importēt auth.json**. Šajā ceļā netiek izmantota atgriezeniskās cilpas
> atzvanīšana, tāpēc tas darbojas no jebkuras izcelsmes. Codex papildus pieņem vienkāršu piekļuves
> pilnvaru vai `~/.codex/auth.json` sesijas bloku.

---

## Pilnvaru pārvaldība

```bash
omniroute tokens create --name "laptop" --scope write [--expires 30]
#   ↳ izvada noslēpumu VIENU REIZI — nokopējiet to tagad
omniroute tokens list                 # maskēts: ID, nosaukums, tvērums, prefikss, statuss, derīguma termiņš
omniroute tokens revoke <id|prefix>   # nekavējoties atsaukt
omniroute tokens scopes               # izskaidrot trīs tvērumus
```

`tokens` komandām ir nepieciešami **administratora** akreditācijas dati. Pilnvaras varat pārvaldīt arī
informācijas paneļa sadaļā **Iestatījumi → Piekļuves pilnvaras** (izveide, atsaukšana, vienreizēja kopēšana).

---

## Kodēšanas CLI konfigurēšana no attālā kataloga

`omniroute configure` nolasa **aktīvā servera** aktuālo modeļu katalogu un ieraksta
konfigurāciju **jūsu** datorā.

```bash
omniroute configure codex
#   Pakalpojumu sniedzēji: glm, kmc, ollamacloud, opencode-go, …
#   Pakalpojumu sniedzējs: glm
#   Modeļa ID: glm/glm-5.2
#   ✔ Ierakstīts ~/.codex/glm52.config.toml
#   Izmantošana:  codex --profile glm52

# neinteraktīvi
omniroute configure codex --provider glm --model glm/glm-5.2 --name glm52

# paturēt bieži izmantotu modeli interaktīvā atlasītāja augšdaļā
omniroute configure codex --provider glm --model glm/glm-5.2 --favorite --yes
```

Atlasītājs lokālajā `model-preferences.json` failā glabā tikai modeļu ID (nekad URL vai
akreditācijas datus), nodalot tos pēc konteksta un CLI mērķa. Izlases vienumi tiek
rādīti pirms nesen atlasītajiem; izmantojiet `--unfavorite`, lai noņemtu atlasīto modeli
no attiecīgā konteksta/mērķa saraksta.

Ierakstītais profils atsaucas uz inferenču atslēgu, izmantojot vides mainīgo
(`OMNIROUTE_API_KEY`) — noslēpums nekad netiek ierakstīts diskā. Informāciju par vienreizējo
Codex pamata iestatīšanu (`[model_providers.omniroute]` bloku) skatiet
[CODEX-CLI-CONFIGURATION.md](./CODEX-CLI-CONFIGURATION.md).

### CLI palaišana darbam ar attālo serveri (konfigurācija netiek ierakstīta)

`omniroute run <target>` ņem vērā arī aktīvo kontekstu: attālais pamata URL
un konteksta akreditācijas dati tiek ievadīti tikai palaistajā procesā.

```bash
omniroute connect 192.168.0.15
omniroute run claude   --model openai/gpt-5.4          # Claude Code → attālais serveris
omniroute run gemini   --model glm/glm-5.2 -- --skip-trust -p "hello"
omniroute run opencode --model glm/glm-5.2 -- run "reply OK"

# Priekšskatīt tieši to, kas tiktu palaists (tikai vides mainīgo ATSLĒGU NOSAUKUMI, nekad vērtības):
omniroute run codex --dry-run --json
```

Mērķi: `claude`, `codex`, `aider`, `goose`, `opencode`, `qwen`, `gemini`
(vienīgais avots: `bin/cli/cli-manifest.mjs`). Qwen un Gemini darbojas ar
pagaidu izolētu mājas direktoriju, kas pēc iziešanas tiek noņemts, tāpēc palaišana nekad nemaina —
un nepiesārņo — jūsu personīgo rīka konfigurāciju.

### Katram CLI paredzētās iestatīšanas komandas

Katram atbalstītajam CLI ir attālā servera atbalsta iestatīšanas komanda (visas ņem vērā aktīvo
kontekstu vai `--remote <url> --api-key <key>`):

| CLI         | Komanda                    | Ko tā ieraksta                                                                                                                                                                                              |
| ----------- | -------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Codex       | `omniroute setup-codex`    | `~/.codex/<name>.config.toml` profili (katram modelim)                                                                                                                                                      |
| Claude Code | `omniroute setup-claude`   | `~/.claude/profiles/<name>/settings.json` (katram modelim)                                                                                                                                                  |
| OpenCode    | `omniroute setup-opencode` | `~/.config/opencode/opencode.json` — ar OpenAI saderīgs `omniroute` nodrošinātājs ar visiem kataloga modeļiem (palaidiet `opencode -m omniroute/<model>`)                                                   |
| Cline       | `omniroute setup-cline`    | `~/.cline/data/{globalState,secrets}.json` (CLI režīms) + izdrukā ielīmējamos VS Code paplašinājuma iestatījumus (saderīgs ar OpenAI, pamata URL **bez** `/v1`)                                             |
| Kilo Code   | `omniroute setup-kilo`     | `~/.local/share/kilo/auth.json` (CLI) + VS Code `kilocode.*` iestatījumi — saderīgs ar OpenAI, pamata URL **ar** `/v1`                                                                                      |
| Continue    | `omniroute setup-continue` | `~/.continue/config.yaml` (VS Code/JetBrains + `cn` CLI) — `provider: openai`, `apiBase` **ar** `/v1`, atslēga, izmantojot `${{ secrets.OMNIROUTE_API_KEY }}`                                               |
| Cursor      | `omniroute setup-cursor`   | izdrukā lietotnē veicamās darbības (Iestatījumi → Modeļi → pārrakstīt OpenAI pamata URL **ar** `/v1` + atslēga + modelis). Cursor konfigurācija ir necaurskatāma SQLite datubāze — tikai tērzēšanas panelis |
| Roo Code    | `omniroute setup-roo`      | ieraksta Roo importēšanas JSON (`~/.omniroute/roo-settings.json`) + iestata `roo-cline.autoImportSettingsPath` + izdrukā lietotāja saskarnes darbības (saderīgs ar OpenAI, pamata URL **ar** `/v1`)         |
| Crush       | `omniroute setup-crush`    | `~/.config/crush/crush.json` — `openai-compat` nodrošinātājs, `base_url` **ar** `/v1`, atslēga, izmantojot `$OMNIROUTE_API_KEY`                                                                             |
| Goose       | `omniroute setup-goose`    | `~/.config/goose/config.yaml` (`GOOSE_PROVIDER=openai` + `OPENAI_HOST` **bez** `/v1` + `GOOSE_MODEL`) + vides konfigurēšanas norādes                                                                        |
| Aider       | `omniroute setup-aider`    | `~/.aider.conf.yml` (`openai-api-base` **bez** `/v1` + `model: openai/<id>`) + vides konfigurēšanas norādes (`aider --message --yes`)                                                                       |
| Qwen Code   | `omniroute setup-qwen`     | `~/.qwen/settings.json` V4 `modelProviders.openai` ieraksts + `OMNIROUTE_API_KEY` failā `~/.qwen/.env`                                                                                                      |

```bash
# OpenCode (ar OpenAI saderīgs nodrošinātājs, visi kataloga modeļi, attāls VPS)
omniroute setup-opencode --remote http://192.168.0.15:20128 --api-key oma_live_xxx
omniroute setup-opencode --only glm,kimi        # paturēt tikai atbilstošos modeļus
opencode -m omniroute/glm/glm-5.2 "..."          # vispirms eksportēt OMNIROUTE_API_KEY
```

> OpenCode piedāvā arī plašāku **spraudņa** integrāciju: `omniroute setup opencode`
> (tagad ar attālā režīma atbalstu, izmantojot `--remote`) instalē `@omniroute/opencode-plugin`.
> `setup-opencode` ir vienkāršāka, ar OpenAI saderīga alternatīva. Atsauce uz API atslēgu
> tiek veidota, izmantojot `{env:OMNIROUTE_API_KEY}` — tā nekad netiek ierakstīta diskā.
>
> OpenCode v2 gadījumā izmantojiet `@omniroute/opencode-plugin-v2`: tas pats katalogs,
> bet atšķirīgs ielādētāja kontrakts. Kad integrācija ir savienota, tas nolasa atslēgu no
> OpenCode akreditācijas datu krātuves, tādēļ attālai vārtejai vispār nav nepieciešama
> atslēga failā `opencode.json`.

---

## Kontekstu pārvaldība (pārslēgšanās starp serveriem)

**Konteksts** ir saglabāts serveris (baseUrl + akreditācijas dati + tvērums). `omniroute connect`
izveido kontekstu un padara to aktīvu; turpmāk visas komandas tiek izpildītas tajā. Pārvaldiet
kontekstus un pārslēdzieties starp tiem, izmantojot `omniroute contexts`:

```bash
omniroute contexts list            # visi konteksti; aktīvais ir atzīmēts ar ●
omniroute contexts current         # aktīvais serveris, autentifikācijas statuss, tvērums
```

```text
  | Nosaukums | Pamata URL                | Autent. | Tvērums | Apraksts
● | vps       | http://100.67.86.91:20128 | token   | admin  | Attālais OmniRoute (…)
  | default   | http://localhost:20128    | ✗       |        |
```

**Pārslēgšanās starp serveriem** — katra nākamā komanda izmanto aktīvo kontekstu:

```bash
omniroute contexts use vps         # → visas komandas tagad izmanto attālo VPS
omniroute tokens list              #   (tiek izpildīta VPS serverī)

omniroute contexts use default     # → atpakaļ uz localhost
omniroute tokens list              #   (tiek izpildīta lokālajā serverī)
```

**Konteksta manuāla pievienošana** (`connect` vietā), apskate vai pārdēvēšana:

```bash
omniroute contexts add staging --url https://staging.example.com:20128 \
  --access-token oma_live_xxxx --scope write --description "staging box"
omniroute contexts show staging    # pilna informācija par vienu kontekstu
omniroute contexts rename staging stg
```

**Konteksta noņemšana** — tiek pieprasīts apstiprinājums; norādiet `--yes`, lai to izlaistu
(nepieciešams skriptiem / neinteraktīvām čaulām, kas pretējā gadījumā drošības nolūkos darbību noraida):

```bash
omniroute contexts remove stg --yes
```

> `default` (localhost) nevar noņemt. Noņemot aktīvo kontekstu, automātiski tiek izmantots
> `default`. Padoms: konteksta noņemšana dzēš tikai **lokāli** saglabātos akreditācijas datus —
> lai faktiski liegtu piekļuvi, atsauciet pilnvaru serverī ar `omniroute tokens revoke <id>`.

Kontekstu **eksportēšana/importēšana** (piemēram, lai tos pārvietotu starp ierīcēm). Ja OS
atslēgu saišķis ir pieejams, jaunajiem kontekstiem tiek saglabāta tikai atsauce uz atslēgu saišķi;
akreditācijas dati netiek iekļauti eksportā:

```bash
omniroute contexts export --out contexts.json     # noklusējums: stdout
omniroute contexts import contexts.json            # pārrakstīt; --merge, lai saglabātu esošos
omniroute contexts migrate --yes                  # pārvietot mantotos vienkāršā teksta pilnvaras atslēgu saišķī
```

Bezgalvas sistēmās, kurās nav izmantojama OS atslēgu saišķa, CLI izmanto
`config.json` ar režīmu `0600` un parāda vienreizēju brīdinājumu. Eksportus no
šī rezerves risinājuma (un jebkuru mantoto konfigurāciju pirms migrācijas) uzskatiet par slepenu materiālu.

---

## Ātra pilna procesa pārbaude

Kopēšanai un ielīmēšanai gatavs darbību cikls, lai attālo iestatījumu pārbaudītu no nulles —
izveidojiet savienojumu, izveidojiet pilnvaru ar noteiktu tvērumu, novirziet komandu, pārslēdzieties
atpakaļ un visu noņemiet. Aizstājiet `192.168.0.15` ar sava servera resursdatora nosaukumu/IP
(Tailscale, LAN vai publisku `https://…` URL).

```bash
# 1. Izveidojiet savienojumu (parole → administratora pilnvara, saglabāta kā konteksts, kas kļūst aktīvs)
omniroute connect 192.168.0.15                 # vai: --key oma_live_xxxx  (bez paroles)
omniroute contexts current                     # parāda attālo serveri un tvērumu

# 2. Izmantojiet to — pārvaldības komandas tagad tiek izpildītas attālajā serverī
omniroute tokens create --name laptop --scope read   # izveidojiet pilnvaru ar šaurāku tvērumu
omniroute tokens list                                 # maskēts saraksts no attālā servera

# 3. Pārslēdzieties turp un atpakaļ
omniroute contexts use default                 # → lokāli
omniroute contexts use 192-168-0-15            # → atkal attāli (nosaukums no `contexts list`)

# 4. Noņemiet visu. PIEZĪME: `contexts remove` dzēš tikai LOKĀLOS akreditācijas datus —
#    tā NEATSAUC pilnvaru serverī. Ja vēlaties faktiski liegt piekļuvi,
#    vispirms atsauciet pilnvaru serverī.
omniroute tokens revoke <id|prefix>            # liedz piekļuvi serverī
omniroute contexts remove 192-168-0-15 --yes   # noņem lokālo kontekstu (pat ja tas ir aktīvs → pāriet uz default), bez uzvednes
```

> `--yes` padara `contexts remove` neinteraktīvu (nepieciešams skriptos/CI; bez tā
> neinteraktīva čaula drošības nolūkos noraida darbību, nevis iestrēgst). Noņemot
> **aktīvo** kontekstu, automātiski tiek izmantots `default`.

---

## Drošības piezīmes

- Tokena atklātais teksts tiek parādīts vienu reizi; tiek saglabāts tikai SHA-256 jaucējkods (tāpat kā API atslēgām).
- `omniroute connect` atkārtoti izmanto pieteikšanās brutālā spēka uzbrukumu bloķēšanu un audita žurnalēšanu.
- Transportam dodiet priekšroku HTTPS vai Tailnet; nenorādot protokolu, resursdatoram pēc noklusējuma tiek izmantots `http://`
  ērtākai lietošanai LAN/Tailscale tīklā — TLS izmantošanai norādiet pilnu `https://…` URL.
- Ieteicamais lokālais konteksta fails ir `~/.omniroute/config.json` (`chmod 600`),
  un tajā ir tikai `credentialRef`; pats tokens tiek glabāts operētājsistēmas
  akreditācijas datu krātuvē (`keytar`) un nekad netiek izvadīts žurnālos. Bezinterfeisa instalācijas bez
  funkcionējošas vietējās akreditācijas datu krātuves izmanto to pašu `0600` failu kā nepārprotami norādītu rezerves risinājumu un
  vienreiz parāda brīdinājumu. Pēc akreditācijas datu krātuves aizmugursistēmas instalēšanas izmantojiet
  `omniroute contexts migrate --yes`.

---

## API galapunkti (uzziņai)

| Metode | Maršruts              | Autentifikācija    | Tvērums                            |
| ------ | --------------------- | ------------------ | ---------------------------------- |
| POST   | `/api/cli/connect`    | pārvaldības parole | — (publisks, aizsargāts ar paroli) |
| GET    | `/api/cli/whoami`     | piekļuves tokens   | lasīšana                           |
| GET    | `/api/cli/tokens`     | piekļuves tokens   | administrēšana                     |
| POST   | `/api/cli/tokens`     | piekļuves tokens   | administrēšana                     |
| DELETE | `/api/cli/tokens/:id` | piekļuves tokens   | administrēšana                     |

Pilnas shēmas skatiet failā [openapi.yaml](../openapi.yaml).
