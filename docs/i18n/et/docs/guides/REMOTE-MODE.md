# Remote Mode (Eesti)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/REMOTE-MODE.md) · 🇪🇹 [am](../../../am/docs/guides/REMOTE-MODE.md) · 🇸🇦 [ar](../../../ar/docs/guides/REMOTE-MODE.md) · 🇦🇿 [az](../../../az/docs/guides/REMOTE-MODE.md) · 🇧🇬 [bg](../../../bg/docs/guides/REMOTE-MODE.md) · 🇧🇩 [bn](../../../bn/docs/guides/REMOTE-MODE.md) · 🇨🇿 [cs](../../../cs/docs/guides/REMOTE-MODE.md) · 🇩🇰 [da](../../../da/docs/guides/REMOTE-MODE.md) · 🇩🇪 [de](../../../de/docs/guides/REMOTE-MODE.md) · 🇬🇷 [el](../../../el/docs/guides/REMOTE-MODE.md) · 🇪🇸 [es](../../../es/docs/guides/REMOTE-MODE.md) · 🇮🇷 [fa](../../../fa/docs/guides/REMOTE-MODE.md) · 🇫🇮 [fi](../../../fi/docs/guides/REMOTE-MODE.md) · 🇫🇷 [fr](../../../fr/docs/guides/REMOTE-MODE.md) · 🇮🇪 [ga](../../../ga/docs/guides/REMOTE-MODE.md) · 🇮🇳 [gu](../../../gu/docs/guides/REMOTE-MODE.md) · 🇳🇬 [ha](../../../ha/docs/guides/REMOTE-MODE.md) · 🇮🇱 [he](../../../he/docs/guides/REMOTE-MODE.md) · 🇮🇳 [hi](../../../hi/docs/guides/REMOTE-MODE.md) · 🇭🇷 [hr](../../../hr/docs/guides/REMOTE-MODE.md) · 🇭🇺 [hu](../../../hu/docs/guides/REMOTE-MODE.md) · 🇦🇲 [hy](../../../hy/docs/guides/REMOTE-MODE.md) · 🇮🇩 [id](../../../id/docs/guides/REMOTE-MODE.md) · 🇳🇬 [ig](../../../ig/docs/guides/REMOTE-MODE.md) · 🇮🇹 [it](../../../it/docs/guides/REMOTE-MODE.md) · 🇯🇵 [ja](../../../ja/docs/guides/REMOTE-MODE.md) · 🇬🇪 [ka](../../../ka/docs/guides/REMOTE-MODE.md) · 🇰🇭 [km](../../../km/docs/guides/REMOTE-MODE.md) · 🇮🇳 [kn](../../../kn/docs/guides/REMOTE-MODE.md) · 🇰🇷 [ko](../../../ko/docs/guides/REMOTE-MODE.md) · 🇱🇹 [lt](../../../lt/docs/guides/REMOTE-MODE.md) · 🇱🇻 [lv](../../../lv/docs/guides/REMOTE-MODE.md) · 🇮🇳 [ml](../../../ml/docs/guides/REMOTE-MODE.md) · 🇮🇳 [mr](../../../mr/docs/guides/REMOTE-MODE.md) · 🇲🇾 [ms](../../../ms/docs/guides/REMOTE-MODE.md) · 🇲🇹 [mt](../../../mt/docs/guides/REMOTE-MODE.md) · 🇲🇲 [my](../../../my/docs/guides/REMOTE-MODE.md) · 🇳🇵 [ne](../../../ne/docs/guides/REMOTE-MODE.md) · 🇳🇱 [nl](../../../nl/docs/guides/REMOTE-MODE.md) · 🇳🇴 [no](../../../no/docs/guides/REMOTE-MODE.md) · 🇮🇳 [or](../../../or/docs/guides/REMOTE-MODE.md) · 🇮🇳 [pa](../../../pa/docs/guides/REMOTE-MODE.md) · 🇵🇭 [phi](../../../phi/docs/guides/REMOTE-MODE.md) · 🇵🇱 [pl](../../../pl/docs/guides/REMOTE-MODE.md) · 🇵🇹 [pt](../../../pt/docs/guides/REMOTE-MODE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/REMOTE-MODE.md) · 🇷🇴 [ro](../../../ro/docs/guides/REMOTE-MODE.md) · 🇷🇺 [ru](../../../ru/docs/guides/REMOTE-MODE.md) · 🇱🇰 [si](../../../si/docs/guides/REMOTE-MODE.md) · 🇸🇰 [sk](../../../sk/docs/guides/REMOTE-MODE.md) · 🇸🇮 [sl](../../../sl/docs/guides/REMOTE-MODE.md) · 🇷🇸 [sr](../../../sr/docs/guides/REMOTE-MODE.md) · 🇸🇪 [sv](../../../sv/docs/guides/REMOTE-MODE.md) · 🇰🇪 [sw](../../../sw/docs/guides/REMOTE-MODE.md) · 🇮🇳 [ta](../../../ta/docs/guides/REMOTE-MODE.md) · 🇮🇳 [te](../../../te/docs/guides/REMOTE-MODE.md) · 🇹🇭 [th](../../../th/docs/guides/REMOTE-MODE.md) · 🇹🇷 [tr](../../../tr/docs/guides/REMOTE-MODE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/REMOTE-MODE.md) · 🇵🇰 [ur](../../../ur/docs/guides/REMOTE-MODE.md) · 🇺🇿 [uz](../../../uz/docs/guides/REMOTE-MODE.md) · 🇻🇳 [vi](../../../vi/docs/guides/REMOTE-MODE.md) · 🇳🇬 [yo](../../../yo/docs/guides/REMOTE-MODE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/REMOTE-MODE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/REMOTE-MODE.md)

---

Käivita `omniroute` CLI oma sülearvutis, samal ajal kui OmniRoute ise töötab kusagil mujal
(VPS-is, koduserveris või mõnes teises sinu Tailneti masinas). Logid ühe korra sisse käsuga
`omniroute connect` ning seejärel sihib **iga** CLI-käsk seda kaugserverit
— samad käsud, sama väljund, kuid need käivitatakse kaugserveri suhtes.

Teist tööriista pole vaja installida: kaugkasutusrežiim kasutab tavalist `omniroute` CLI-d
koos piiratud õigustega **juurdepääsutõenditega**.

```bash
npm install -g omniroute                 # tavaline CLI
omniroute connect 192.168.0.15           # logi sisse (parool → piiratud õigustega tõend)
omniroute models list                    # ← loetleb nüüd KAUGSERVERI mudelid
omniroute configure codex                # ← loob kaugkataloogi põhjal kohaliku Codexi profiili
```

---

## Kuidas see töötab

```
sinu sülearvuti                          OmniRoute'i kaugserver (VPS)
┌────────────────────┐                   ┌───────────────────────────────┐
│ omniroute CLI      │  POST /api/cli/connect  (parool → tõend)           │
│  kontekst: vps     │ ───────────────►  │ väljastab piiratud õigustega   │
│  baseUrl, token    │  Authorization: Bearer oma_live_…                  │
│                    │ ───────────────►  │ juurdepääsutõendi; iga haldus-  │
│ kirjutab seadistus-│ ◄───────────────  │ marsruut kontrollib tõendi     │
│ failid KOHALIKULT  │                   │ õigustaset                     │
└────────────────────┘                   └───────────────────────────────┘
```

- **Kontekstid** salvestavad igaüks ühe serveri (`~/.omniroute/config.json`, `chmod 600`).
  `omniroute contexts use <name>` vahetab aktiivset serverit; `default` on kohalik.
- **Juurdepääsutõendid** (`oma_live_…`) lubavad kasutada halduskäske. Need
  erinevad inferentsi API-võtmetest (`sk-…`, mida kasutatakse marsruudil `/v1/chat/completions`).
- Serveri poolel salvestatakse ainult tõendi SHA-256 räsi. Lihttekstina kuvatakse seda
  loomisel **ainult üks kord**.

---

## Ühenduse loomine

### Haldusparooliga (algseadistus)

```bash
omniroute connect 192.168.0.15
# Haldusparool aadressile http://192.168.0.15:20128: ********
# ✔ Ühendatud aadressiga http://192.168.0.15:20128 — kontekst '192.168.0.15' (õigustase: admin)
```

Parooliga autentimine väljastab vaikimisi **admin**-tõendi (kuna sul on parool,
on sul juba täielik kontroll). Piira õigustaset suvandiga `--scope`:

```bash
omniroute connect 192.168.0.15 --scope write
```

Suvandid: `--port <p>` (kui hostil pole porti määratud), `--name <ctx>` (konteksti nimi),
`--scope read|write|admin`. Täielikku URL-i kasutatakse muutmata kujul:
`omniroute connect https://omni.example.com`.

### Eelnevalt loodud tõendiga

Loo juhtpaneelil (või käsuga `omniroute tokens create`) piiratud õigustega tõend ja
kleebi see — parooli pole vaja:

```bash
omniroute connect 192.168.0.15 --key oma_live_xxxxxxxx
```

CLI valideerib selle päringuga `GET /api/cli/whoami` ja salvestab aktiivse kontekstina.

---

## Õigustasemed

Kolm hierarhilist taset (`admin ⊃ write ⊃ read`):

| Õigustase | Lubatud tegevused                                                                              |
| --------- | ---------------------------------------------------------------------------------------------- |
| `read`    | loetlemine/vaatamine — `models list`, `providers status`, `logs`, `usage`, `cost`              |
| `write`   | read **+** seadistamine/rakendamine — `setup-codex`, `keys add`, `config set`, kombinatsioonid |
| `admin`   | write **+** haldamine — `tokens` CRUD, teenusepakkujate lisamine, teenused, reeglistik, oauth  |

Server tuletab iga marsruudi nõutava õigustaseme HTTP-meetodist
(`GET`→read, muudatused→write) ning tundlike funktsioonide admin-lubatud loendist
(`/api/cli/tokens`, `/api/providers` muudatused, `/api/oauth`, `/api/services`, …).
Ebapiisava õigustasemega tõend saab vastuseks `403` koos selge teatega.

> Protsesse käivitavad marsruudid (`/api/services/*`, `/api/mcp/*`, …) jäävad
> **ainult loopback-liidese kaudu kasutatavaks** — kaugjuurdepääsutõend ei pääse neile kunagi ligi, olenemata õigustasemest.

---

## Antigravity ühendamine kauginstallatsiooniga

Antigravity kasutab Google'i esimese osapoole / omarakenduse nõusolekukuva. Google
väljastab autoriseerimiskoodi ainult siis, kui **tagasisuunamise loopback-aadress**
(`http://127.0.0.1:<port>/callback`) on **sisselogimise kinnitanud brauserist
ligipääsetav**. VPS-i kauginstallatsiooni korral asub see loopback-aadress
serveris, mitte teie arvutis, mistõttu nõusolekukuva **jääb igaveseks ootele ega
väljasta kunagi koodi** — tavapärase varuvariandi „kleebi tagasikutse URL” puhul
pole midagi kleepida. (See on Google'i-poolne piirang: sama hangumine ilmneb igas
puhverserveris, mis kasutab komplekti kuuluvat Antigravity töölauaklienti, mitte
ainult OmniRoute'is.)

Juhtpaneel tuvastab selle enne, kui kinni jääte: kui avate **Providers → Antigravity →
Connect** aadressilt, mis pole localhost, asendatakse üldine teade „kopeeri tagasikutse
URL” kahe alltoodud lahendusega, milles teie host ja port on juba sisestatud.
(Ka LAN-aadress läheb arvesse — selle tagasikutse seisukohast pole `192.168.x.x`
localhost.)

Antigravity ühendamiseks OmniRoute'i kauginstallatsiooniga on kaks toetatud viisi.

### Variant A — kohalik sisselogimisabiline (soovitatud)

Käivitage OAuth **oma arvutis**, kus `127.0.0.1` on ligipääsetav. Abiline
suhtleb otse Google'iga, mistõttu saab nõusolekuprotsess lõpule jõuda seal, kus
juhtpaneeli versioon seda teha ei saa.

**Kui olete juba ühendatud** (`omniroute connect <host>`), pole vaja midagi
kopeerida — abiline edastab identimisteabe teie eest sellesse installatsiooni:

```bash
# Teie KOHALIKUS arvutis (vajab Node.js-i ja brauserit):
omniroute connect 192.168.0.15        # üks kord — loob administraatori ulatusega kontekstitõendi
npx omniroute login antigravity
#   ↳ avab Google'i nõusolekukuva, püüab tagasikutse kinni kohalikus loopback-pordis,
#     vahetab selle ning POSTib identimisteabe aktiivsesse konteksti:
#
#   Antigravity on ühendatud aadressil http://192.168.0.15:20128 (ühendus abc123).
#   Midagi pole vaja kleepida — võite selle terminali sulgeda.
```

Saatmine toimub automaatselt alati, kui aktiivne kontekst osutab teisele
masinale. Selle saab kummaski suunas sundida suvandiga `--push` / `--no-push` või
suunata kindlasse konteksti suvandiga `--context <name>`.

**Kui teie arvuti ei pääse VPS-ile ligi** (tulemüüriga blokeeritud, SSH puudub,
arvuti on võrgust eraldatud), töötab abiline ikkagi — see _vajab_ ainult Google'it.
Kasutage suvandit `--no-push` või laske saatmisel lihtsalt nurjuda: juba lõpule
viidud autoriseerimise hülgamise asemel kuvatakse varuvariandina identimisteabe
plokk.

```bash
npx omniroute login antigravity --no-push
#   omniroute-cred-v1.eyJ2IjoxLCJ...
```

Seejärel avage **kaugserveri** juhtpaneelil **Providers → Antigravity → Connect** ja
kleepige `omniroute-cred-v1.…` plokk väljale **Step 2** (see aktsepteerib nii
tagasikutse URL-i kui ka identimisteabe plokki). OmniRoute dekodeerib selle, käivitab
serveris Cloud Code'i kasutuselevõtu ja salvestab ühenduse püsivalt.

> Plokk sisaldab värskendustõendit — käsitlege seda nagu parooli. Saatmise korral
> edastatakse see üks kord teie konteksti autenditud ühenduse kaudu; kleepimise korral
> teie juhtpaneeli ühenduse kaudu. Mõlemal juhul talletatakse see krüptitult ning
> õnnestunud saatmise korral ei kuvata seda kunagi teie terminalis.

Suvandid: `--no-browser` (URL-i kuvamine automaatse avamise asemel), `--port <n>`
(loopback-pordi fikseerimine), `--timeout <ms>`, `--push` / `--no-push` (automaatse
edastamise alistamine), `--context <name>` (kindla konteksti sihtimine).

### Variant B — SSH kohaliku pordiedastuse tunnel

Kui teil on VPS-ile SSH-ligipääs, edastage juhtpaneeli port nii, et
loopback-tagasikutse jõuaks tunneli kaudu tagasi serverisse:

```bash
# Teie KOHALIKUS arvutis:
ssh -L 20128:127.0.0.1:20128 user@your-vps
# seejärel avage oma KOHALIKUS brauseris http://localhost:20128 ja ühendage Antigravity
# tavapäraselt — ümbersuunamine aadressile 127.0.0.1:20128/callback jõuab nüüd SSH kaudu VPS-i.
```

Kuna pääsete juhtpaneelile ligi aadressil `localhost:20128`, viiakse Google'i
nõusolekuprotsess lõpule ja tagasikutse edastatakse sama tunneli kaudu serverisse —
identimisteabe plokki pole vaja. Hoidke tunnel avatuna, kuni ühendus kuvatakse
aktiivsena.

Erinevalt allpool kirjeldatud fikseeritud loopback-aadressiga pakkujatest piisab
siin **ühest pordiedastusest**: Antigravity tagasikutse kasutab juhtpaneeli enda
porti, seega pole vaja tunnelida teist pakkujapõhist porti.

> Täielikult ilma kasutajaliideseta alternatiivina (ilma abilise ja tunnelita) saate
> seadistada **enda** Google OAuth-i veebirakenduse identimisteabe ja avaliku baas-URL-i;
> vaadake pakkuja OAuth-i keskkonnamuutujaid. Kumbki ülaltoodud variant ei vaja
> Google'is lisaseadistust.

---

## Codexi / Groki ühendamine kauginstallatsioonis (fikseeritud loopback-aadressiga pakkujad)

Codex, xAI (`xai-oauth`) ja Grok CLI (`grok-cli`) registreerivad oma ülesvoolu OAuthi rakenduses **fikseeritud** loopback-aadressiga
`redirect_uri`. OmniRoute ei saa seda muuta — pakkuja saadab brauseri alati tagasi samale püsikodeeritud aadressile:

| Pakkuja     | Fikseeritud tagasikutseaadress, kuhu pakkuja ümber suunab |
| ----------- | --------------------------------------------------------- |
| `codex`     | `http://localhost:1455/auth/callback`                     |
| `xai-oauth` | `http://127.0.0.1:56121/callback`                         |
| `grok-cli`  | `http://127.0.0.1:56122/callback`                         |

`localhost` tähendab siin **masinat, milles brauser töötab**, samas kui OmniRoute'i PKCE
tagasikutse server kuulab **serveri** loopback-aadressil. Kui avate juhtpaneeli LAN-aadressil,
näiteks `http://192.168.0.15:20128`, ei saa need kaks omavahel ühendust: autoriseerimiskood
edastatakse teie sülearvuti aadressile `localhost:1455`, kus miski ei kuula,
ning pakkuja sisselogimine ebaõnnestub ilma veateadet kuvamata.

Juhtpaneel tuvastab selle enne hüpikakna avamist ja kuvab tunnelikäsu,
selle asemel et lasta sisselogimisel vaikimisi ebaõnnestuda (#8046).

### Lahendus — edastage **mõlemad** pordid

```bash
# BROWSERIT käitavas masinas:
ssh -L 20128:127.0.0.1:20128 -L 1455:127.0.0.1:1455 <user>@192.168.0.15
# seejärel avage http://localhost:20128 ja ühendage Codex sealt
```

Vaja on kahte pordiedastust ning ainult ühe edastamine ebaõnnestub endiselt:

- **`20128`** (juhtpaneeli port) muudab lähtekoha tegelikuks localhost'iks, mis
  paneb OmniRoute'i üldse PKCE tagasikutse serverit käivitama — LAN-lähtekoht ei
  jõua kunagi selle haruni.
- **`1455`** (pakkuja fikseeritud tagasikutse port) on koht, kuhu brauser tagasi
  saadetakse; see peab tunneli kaudu jõudma serveri loopback-aadressile.

xAI või Grok CLI ühendamisel asendage `1455` pordiga `56121`/`56122` ning `20128`
oma tegeliku juhtpaneeli pordiga. Hoidke tunnel avatuna, kuni ühenduse olekuks
kuvatakse aktiivne.

> **SSH-juurdepääs puudub?** Codex ja Grok CLI aktsepteerivad ka kleebitud pääsmikku — ühendamisdialoogi
> vahekaarti **Kleebi API-võti** / **Impordi auth.json**. See meetod ei kasuta loopback-tagasikutset,
> seega töötab see mis tahes lähtekohast. Codex aktsepteerib lisaks paljast juurdepääsupääsmikku
> või `~/.codex/auth.json` seansiandmeid.

---

## Pääsmike haldamine

```bash
omniroute tokens create --name "laptop" --scope write [--expires 30]
#   ↳ väljastab saladuse ÜHE KORRA — kopeerige see kohe
omniroute tokens list                 # maskitud: ID, nimi, ulatus, prefiks, olek, aegumine
omniroute tokens revoke <id|prefix>   # tühistab kohe
omniroute tokens scopes               # selgitab kolme ulatust
```

`tokens`-käsud nõuavad **administraatori** identimisteavet. Pääsmikke saab hallata ka
juhtpaneeli jaotises **Seaded → Juurdepääsupääsmikud** (loomine, tühistamine, ühekordne kopeerimine).

---

## Kodeerimise CLI konfigureerimine kaugkataloogist

`omniroute configure` loeb **aktiivse serveri** reaalajas mudelikataloogi ja kirjutab
konfiguratsiooni **teie** masinasse.

```bash
omniroute configure codex
#   Providers: glm, kmc, ollamacloud, opencode-go, …
#   Provider: glm
#   Model id: glm/glm-5.2
#   ✔ Wrote ~/.codex/glm52.config.toml
#   Use it:  codex --profile glm52

# mitteinteraktiivne
omniroute configure codex --provider glm --model glm/glm-5.2 --name glm52

# hoidke sageli kasutatav mudel interaktiivse valija ülaosas
omniroute configure codex --provider glm --model glm/glm-5.2 --favorite --yes
```

Valija säilitab kohalikus failis `model-preferences.json` ainult mudeli-ID-sid
(mitte kunagi URL-e ega identimisteavet), rühmitatuna konteksti ja CLI-sihtmärgi järgi. Lemmikuid
kuvatakse enne hiljutisi valikuid; kasutage `--unfavorite`, et eemaldada valitud mudel
selle konteksti/sihtmärgi loendist.

Kirjutatud profiil viitab järeldusvõtmele keskkonnamuutuja
(`OMNIROUTE_API_KEY`) kaudu — saladust ei kirjutata kunagi kettale. Codexi ühekordse
baasseadistuse (`[model_providers.omniroute]` plokk) kohta vaadake
[CODEX-CLI-CONFIGURATION.md](./CODEX-CLI-CONFIGURATION.md).

### CLI käivitamine kaugserveri vastu (konfiguratsiooni ei kirjutata)

`omniroute run <target>` arvestab samuti aktiivse kontekstiga: kaugserveri baas-URL
ja konteksti identimisteave sisestatakse ainult käivitatud protsessi.

```bash
omniroute connect 192.168.0.15
omniroute run claude   --model openai/gpt-5.4          # Claude Code → kaugserver
omniroute run gemini   --model glm/glm-5.2 -- --skip-trust -p "hello"
omniroute run opencode --model glm/glm-5.2 -- run "reply OK"

# Eelvaade täpselt sellest, mis käivitataks (ainult keskkonnamuutujate VÕTMETE NIMED, mitte kunagi väärtused):
omniroute run codex --dry-run --json
```

Sihtmärgid: `claude`, `codex`, `aider`, `goose`, `opencode`, `qwen`, `gemini`
(ainus allikas: `bin/cli/cli-manifest.mjs`). Qwen ja Gemini töötavad ajutise
isoleeritud kodukataloogiga, mis eemaldatakse väljumisel, seega ei puuduta käivitamine kunagi
teie isiklikku tööriistakonfiguratsiooni ega lekita sinna midagi.

### CLI-põhised seadistuskäsud

Igal toetatud CLI-l on kaugserveriteadlik seadistuskäsk (kõik arvestavad aktiivse
kontekstiga või parameetritega `--remote <url> --api-key <key>`):

| CLI         | Käsk                       | Mida see kirjutab                                                                                                                                                                         |
| ----------- | -------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Codex       | `omniroute setup-codex`    | `~/.codex/<name>.config.toml` profiilid (iga mudeli kohta)                                                                                                                                |
| Claude Code | `omniroute setup-claude`   | `~/.claude/profiles/<name>/settings.json` (iga mudeli kohta)                                                                                                                              |
| OpenCode    | `omniroute setup-opencode` | `~/.config/opencode/opencode.json` — OpenAI-ga ühilduv `omniroute` teenusepakkuja koos kõigi kataloogi mudelitega (käivita `opencode -m omniroute/<model>`)                               |
| Cline       | `omniroute setup-cline`    | `~/.cline/data/{globalState,secrets}.json` (CLI-režiim) + kuvab kleepimiseks VS Code'i laienduse sätted (OpenAI-ga ühilduv, baas-URL **ilma** `/v1`-ta)                                   |
| Kilo Code   | `omniroute setup-kilo`     | `~/.local/share/kilo/auth.json` (CLI) + VS Code'i `kilocode.*` sätted — OpenAI-ga ühilduv, baas-URL **koos** `/v1`-ga                                                                     |
| Continue    | `omniroute setup-continue` | `~/.continue/config.yaml` (VS Code/JetBrains + `cn` CLI) — `provider: openai`, `apiBase` **koos** `/v1`-ga, võti `${{ secrets.OMNIROUTE_API_KEY }}` kaudu                                 |
| Cursor      | `omniroute setup-cursor`   | kuvab rakenduses tehtavad sammud (Settings → Models → Override OpenAI Base URL **koos** `/v1`-ga + võti + mudel). Cursori konfiguratsioon on läbipaistmatu SQLite — ainult vestluspaneel  |
| Roo Code    | `omniroute setup-roo`      | kirjutab Roo impordi-JSON-i (`~/.omniroute/roo-settings.json`) + määrab `roo-cline.autoImportSettingsPath` + kuvab kasutajaliidese sammud (OpenAI-ga ühilduv, baas-URL **koos** `/v1`-ga) |
| Crush       | `omniroute setup-crush`    | `~/.config/crush/crush.json` — `openai-compat` teenusepakkuja, `base_url` **koos** `/v1`-ga, võti `$OMNIROUTE_API_KEY` kaudu                                                              |
| Goose       | `omniroute setup-goose`    | `~/.config/goose/config.yaml` (`GOOSE_PROVIDER=openai` + `OPENAI_HOST` **ilma** `/v1`-ta + `GOOSE_MODEL`) + keskkonnamuutujate juhis                                                      |
| Aider       | `omniroute setup-aider`    | `~/.aider.conf.yml` (`openai-api-base` **ilma** `/v1`-ta + `model: openai/<id>`) + keskkonnamuutujate juhis (`aider --message --yes`)                                                     |
| Qwen Code   | `omniroute setup-qwen`     | `~/.qwen/settings.json` V4 `modelProviders.openai` kirje + `OMNIROUTE_API_KEY` failis `~/.qwen/.env`                                                                                      |

```bash
# OpenCode (OpenAI-ga ühilduv teenusepakkuja, kõik kataloogi mudelid, kaug-VPS)
omniroute setup-opencode --remote http://192.168.0.15:20128 --api-key oma_live_xxx
omniroute setup-opencode --only glm,kimi        # säilita ainult sobivad mudelid
opencode -m omniroute/glm/glm-5.2 "..."          # ekspordi esmalt OMNIROUTE_API_KEY
```

> OpenCode'il on ka võimalusterohkem **plugin**-integratsioon: `omniroute setup opencode`
> (nüüd `--remote` kaudu kaugühenduse toega) installib paketi `@omniroute/opencode-plugin`.
> `setup-opencode` on kergekaaluline OpenAI-ga ühilduv alternatiiv. API-võtmele
> viidatakse kujul `{env:OMNIROUTE_API_KEY}` — seda ei kirjutata kunagi kettale.
>
> OpenCode v2 puhul kasuta selle asemel `@omniroute/opencode-plugin-v2`: sama kataloog,
> erinev laadimisleping. Kui integratsioon on ühendatud, loeb see võtme OpenCode'i enda
> mandaadihoidlast, seega ei vaja kauglüüs failis `opencode.json` üldse võtit.

---

## Kontekstide haldamine (serverite vahel vahetamine)

**Kontekst** on salvestatud server (baseUrl + mandaat + ulatus). `omniroute connect`
loob selle ja muudab aktiivseks; edaspidi on kõik käsud suunatud sellele. Kontekste saab hallata ja
nende vahel vahetada käsuga `omniroute contexts`:

```bash
omniroute contexts list            # kõik kontekstid; aktiivne on tähistatud sümboliga ●
omniroute contexts current         # aktiivne server, autentimise olek ja ulatus
```

```text
  | Nimi    | Baas-URL                  | Autentimine | Ulatus | Kirjeldus
● | vps     | http://100.67.86.91:20128 | token       | admin  | Kaug-OmniRoute (…)
  | default | http://localhost:20128    | ✗           |        |
```

**Serverite vahetamine** — kõik järgnevad käsud kasutavad aktiivset konteksti:

```bash
omniroute contexts use vps         # → kõik käsud kasutavad nüüd kaug-VPS-i
omniroute tokens list              #   (käivitatakse VPS-i suhtes)

omniroute contexts use default     # → tagasi localhosti
omniroute tokens list              #   (käivitatakse kohaliku serveri suhtes)
```

**Konteksti käsitsi lisamine** (`connect` asemel), vaatamine või ümbernimetamine:

```bash
omniroute contexts add staging --url https://staging.example.com:20128 \
  --access-token oma_live_xxxx --scope write --description "staging box"
omniroute contexts show staging    # ühe konteksti täielikud üksikasjad
omniroute contexts rename staging stg
```

**Konteksti eemaldamine** — küsib kinnitust; kinnituse vahelejätmiseks lisage `--yes`
(skriptides ja mitteinteraktiivsetes kestades nõutav, sest muidu keeldutakse turvaliselt):

```bash
omniroute contexts remove stg --yes
```

> Konteksti `default` (localhost) ei saa eemaldada. Aktiivse konteksti eemaldamisel võetakse
> kasutusele `default`. Näpunäide: konteksti eemaldamine kustutab ainult **kohalikult** salvestatud mandaadi —
> juurdepääsu tegelikuks lõpetamiseks tühistage token serveris käsuga `omniroute tokens revoke <id>`.

Kontekstide **eksportimine/importimine** (nt nende teisaldamiseks masinate vahel). Uute kontekstide puhul säilitatakse
ainult võtmerõnga viide; mandaate ei kopeerita eksporti, kui operatsioonisüsteemi
võtmerõngas on saadaval:

```bash
omniroute contexts export --out contexts.json     # vaikimisi: stdout
omniroute contexts import contexts.json            # kirjuta üle; olemasolevate säilitamiseks kasuta --merge
omniroute contexts migrate --yes                  # teisalda pärandteksti lihtteksttokenid võtmerõngasse
```

Ilma kasutatava operatsioonisüsteemi võtmerõngata käsurealiideseta süsteemides kasutab CLI varuvariandina
faili `config.json` režiimiga `0600` ja kuvab ühekordse hoiatuse. Käsitlege selle
varuvariandi eksporte (ja migreerimiseelset pärandkonfiguratsiooni) salajase materjalina.

---

## Kiire täielik kontroll

Kopeeritav ja kleebitav töövoog kaugseadistuse nullist kontrollimiseks — ühenduse loomine, piiratud
ulatusega tokeni väljastamine, käsu suunamine, tagasi vahetamine ja eemaldamine. Asendage
`192.168.0.15` oma serveri hostinime/IP-ga (Tailscale, LAN või avalik
`https://…` URL).

```bash
# 1. Loo ühendus (parool → administraatori token, salvestatakse kontekstina, mis muutub aktiivseks)
omniroute connect 192.168.0.15                 # või: --key oma_live_xxxx  (paroolita)
omniroute contexts current                     # kuvab kaugserveri ja ulatuse

# 2. Kasuta seda — halduskäsud käivitatakse nüüd kaugserveri suhtes
omniroute tokens create --name laptop --scope read   # väljasta kitsama ulatusega token
omniroute tokens list                                 # kaugserverist saadud maskitud loend

# 3. Vaheta edasi-tagasi
omniroute contexts use default                 # → kohalik
omniroute contexts use 192-168-0-15            # → taas kaugserver (nimi pärineb käsust `contexts list`)

# 4. Eemalda seadistus. MÄRKUS: `contexts remove` kustutab ainult KOHALIKU mandaadi —
#    see EI tühista tokenit serveris. Vajaduse korral tühista see esmalt serveris,
#    et juurdepääs tegelikult lõpetada.
omniroute tokens revoke <id|prefix>            # lõpetab juurdepääsu serveris
omniroute contexts remove 192-168-0-15 --yes   # eemalda kohalik kontekst (isegi kui aktiivne → võetakse kasutusele default), kinnitust küsimata
```

> `--yes` muudab käsu `contexts remove` mitteinteraktiivseks (nõutav skriptides/CI-s; ilma
> selleta keeldub mitteinteraktiivne kest turvaliselt, selle asemel et ootele jääda). **Aktiivse**
> konteksti eemaldamisel võetakse automaatselt kasutusele `default`.

---

## Turvamärkused

- Tokeni avateksti kuvatakse üks kord; püsivalt salvestatakse ainult SHA-256 räsi (nagu API võtmete puhul).
- `omniroute connect` kasutab sama jõuründekatsete blokeerimist ja auditilogimist nagu sisselogimine.
- Eelista transpordiks HTTPS-i või Tailneti; protokollita host kasutab vaikimisi `http://`-i
  LAN-i/Tailscale'i mugavuse huvides — TLS-i kasutamiseks edasta täielik `https://…` URL.
- Eelistatud kohalik kontekstifail on `~/.omniroute/config.json` (`chmod 600`),
  mis sisaldab ainult välja `credentialRef`; token ise salvestatakse operatsioonisüsteemi
  võtmehoidlasse (`keytar`) ja seda ei väljastata kunagi logidesse. Ilma toimiva
  natiivse võtmehoidlata ekraanita installid kasutavad selgesõnaliselt sama `0600`
  faili varuvariandina ja väljastavad ühe korra hoiatuse. Pärast võtmehoidla
  taustsüsteemi installimist kasuta käsku `omniroute contexts migrate --yes`.

---

## API lõpp-punktid (viide)

| Meetod | Marsruut              | Autentimine      | Ulatus                         |
| ------ | --------------------- | ---------------- | ------------------------------ |
| POST   | `/api/cli/connect`    | haldusparool     | — (avalik, parooliga kaitstud) |
| GET    | `/api/cli/whoami`     | juurdepääsutoken | lugemine                       |
| GET    | `/api/cli/tokens`     | juurdepääsutoken | admin                          |
| POST   | `/api/cli/tokens`     | juurdepääsutoken | admin                          |
| DELETE | `/api/cli/tokens/:id` | juurdepääsutoken | admin                          |

Täielikud skeemid leiad failist [openapi.yaml](../openapi.yaml).
