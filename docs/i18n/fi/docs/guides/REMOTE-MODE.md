# Remote Mode (Suomi)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/REMOTE-MODE.md) · 🇪🇹 [am](../../../am/docs/guides/REMOTE-MODE.md) · 🇸🇦 [ar](../../../ar/docs/guides/REMOTE-MODE.md) · 🇦🇿 [az](../../../az/docs/guides/REMOTE-MODE.md) · 🇧🇬 [bg](../../../bg/docs/guides/REMOTE-MODE.md) · 🇧🇩 [bn](../../../bn/docs/guides/REMOTE-MODE.md) · 🇨🇿 [cs](../../../cs/docs/guides/REMOTE-MODE.md) · 🇩🇰 [da](../../../da/docs/guides/REMOTE-MODE.md) · 🇩🇪 [de](../../../de/docs/guides/REMOTE-MODE.md) · 🇬🇷 [el](../../../el/docs/guides/REMOTE-MODE.md) · 🇪🇸 [es](../../../es/docs/guides/REMOTE-MODE.md) · 🇪🇪 [et](../../../et/docs/guides/REMOTE-MODE.md) · 🇮🇷 [fa](../../../fa/docs/guides/REMOTE-MODE.md) · 🇫🇷 [fr](../../../fr/docs/guides/REMOTE-MODE.md) · 🇮🇪 [ga](../../../ga/docs/guides/REMOTE-MODE.md) · 🇮🇳 [gu](../../../gu/docs/guides/REMOTE-MODE.md) · 🇳🇬 [ha](../../../ha/docs/guides/REMOTE-MODE.md) · 🇮🇱 [he](../../../he/docs/guides/REMOTE-MODE.md) · 🇮🇳 [hi](../../../hi/docs/guides/REMOTE-MODE.md) · 🇭🇷 [hr](../../../hr/docs/guides/REMOTE-MODE.md) · 🇭🇺 [hu](../../../hu/docs/guides/REMOTE-MODE.md) · 🇦🇲 [hy](../../../hy/docs/guides/REMOTE-MODE.md) · 🇮🇩 [id](../../../id/docs/guides/REMOTE-MODE.md) · 🇳🇬 [ig](../../../ig/docs/guides/REMOTE-MODE.md) · 🇮🇹 [it](../../../it/docs/guides/REMOTE-MODE.md) · 🇯🇵 [ja](../../../ja/docs/guides/REMOTE-MODE.md) · 🇬🇪 [ka](../../../ka/docs/guides/REMOTE-MODE.md) · 🇰🇭 [km](../../../km/docs/guides/REMOTE-MODE.md) · 🇮🇳 [kn](../../../kn/docs/guides/REMOTE-MODE.md) · 🇰🇷 [ko](../../../ko/docs/guides/REMOTE-MODE.md) · 🇱🇹 [lt](../../../lt/docs/guides/REMOTE-MODE.md) · 🇱🇻 [lv](../../../lv/docs/guides/REMOTE-MODE.md) · 🇮🇳 [ml](../../../ml/docs/guides/REMOTE-MODE.md) · 🇮🇳 [mr](../../../mr/docs/guides/REMOTE-MODE.md) · 🇲🇾 [ms](../../../ms/docs/guides/REMOTE-MODE.md) · 🇲🇹 [mt](../../../mt/docs/guides/REMOTE-MODE.md) · 🇲🇲 [my](../../../my/docs/guides/REMOTE-MODE.md) · 🇳🇵 [ne](../../../ne/docs/guides/REMOTE-MODE.md) · 🇳🇱 [nl](../../../nl/docs/guides/REMOTE-MODE.md) · 🇳🇴 [no](../../../no/docs/guides/REMOTE-MODE.md) · 🇮🇳 [or](../../../or/docs/guides/REMOTE-MODE.md) · 🇮🇳 [pa](../../../pa/docs/guides/REMOTE-MODE.md) · 🇵🇭 [phi](../../../phi/docs/guides/REMOTE-MODE.md) · 🇵🇱 [pl](../../../pl/docs/guides/REMOTE-MODE.md) · 🇵🇹 [pt](../../../pt/docs/guides/REMOTE-MODE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/REMOTE-MODE.md) · 🇷🇴 [ro](../../../ro/docs/guides/REMOTE-MODE.md) · 🇷🇺 [ru](../../../ru/docs/guides/REMOTE-MODE.md) · 🇱🇰 [si](../../../si/docs/guides/REMOTE-MODE.md) · 🇸🇰 [sk](../../../sk/docs/guides/REMOTE-MODE.md) · 🇸🇮 [sl](../../../sl/docs/guides/REMOTE-MODE.md) · 🇷🇸 [sr](../../../sr/docs/guides/REMOTE-MODE.md) · 🇸🇪 [sv](../../../sv/docs/guides/REMOTE-MODE.md) · 🇰🇪 [sw](../../../sw/docs/guides/REMOTE-MODE.md) · 🇮🇳 [ta](../../../ta/docs/guides/REMOTE-MODE.md) · 🇮🇳 [te](../../../te/docs/guides/REMOTE-MODE.md) · 🇹🇭 [th](../../../th/docs/guides/REMOTE-MODE.md) · 🇹🇷 [tr](../../../tr/docs/guides/REMOTE-MODE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/REMOTE-MODE.md) · 🇵🇰 [ur](../../../ur/docs/guides/REMOTE-MODE.md) · 🇺🇿 [uz](../../../uz/docs/guides/REMOTE-MODE.md) · 🇻🇳 [vi](../../../vi/docs/guides/REMOTE-MODE.md) · 🇳🇬 [yo](../../../yo/docs/guides/REMOTE-MODE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/REMOTE-MODE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/REMOTE-MODE.md)

---

Suorita `omniroute`-CLI:tä kannettavallasi samalla, kun OmniRoute itse toimii muualla
(VPS-palvelimella, kotipalvelimella tai toisella Tailnet-verkkosi koneella). Kirjaudut kerran sisään
komennolla `omniroute connect`, minkä jälkeen **jokainen** CLI-komento kohdistuu kyseiseen
etäpalvelimeen — samat komennot ja sama tuloste, mutta suoritus tapahtuu etäpalvelimella.

Asennettavaa erillistä työkalua ei ole: etätila käyttää tavallista `omniroute`-CLI:tä
sekä rajattuja **käyttöoikeustunnuksia**.

```bash
npm install -g omniroute                 # tavallinen CLI
omniroute connect 192.168.0.15           # kirjaudu sisään (salasana → rajattu tunnus)
omniroute models list                    # ← listaa nyt ETÄPALVELIMEN mallit
omniroute configure codex                # ← kirjoittaa paikallisen Codex-profiilin etäluettelosta
```

---

## Toimintaperiaate

```
kannettavasi                             OmniRoute-etäpalvelin (VPS)
┌────────────────────┐                   ┌───────────────────────────────┐
│ omniroute-CLI      │  POST /api/cli/connect  (salasana → tunnus)        │
│  konteksti: vps    │ ───────────────►  │ luo rajatun käyttöoikeus-     │
│  baseUrl, tunnus   │  Authorization: Bearer oma_live_…                  │
│                    │ ───────────────►  │ tunnuksen; jokaisen hallinta-  │
│ kirjoittaa määritykset│ ◄─────────────  │ reitin käyttö tarkistetaan     │
│ PAIKALLISESTI      │                   │ tunnuksen käyttöalueen mukaan  │
└────────────────────┘                   └───────────────────────────────┘
```

- **Kontekstit** tallentavat kukin yhden palvelimen (`~/.omniroute/config.json`, `chmod 600`).
  `omniroute contexts use <name>` vaihtaa aktiivista palvelinta; `default` on paikallinen.
- **Käyttöoikeustunnukset** (`oma_live_…`) valtuuttavat hallintakomennot. Ne ovat
  erillisiä päättelyrajapinnan API-avaimista (`sk-…`, joita käytetään reitillä `/v1/chat/completions`).
- Palvelinpuolelle tallennetaan tunnuksesta vain SHA-256-tiiviste. Selväkielinen tunnus näytetään
  **kerran**, luonnin yhteydessä.

---

## Yhdistäminen

### Hallintasalasanalla (ensimääritys)

```bash
omniroute connect 192.168.0.15
# Hallintasalasana osoitteelle http://192.168.0.15:20128: ********
# ✔ Yhdistetty osoitteeseen http://192.168.0.15:20128 — konteksti '192.168.0.15' (käyttöalue: admin)
```

Salasanalla yhdistäminen luo oletusarvoisesti **admin**-tunnuksen (sinulla on salasana, joten
sinulla on jo täydet käyttöoikeudet). Rajaa käyttöoikeuksia valinnalla `--scope`:

```bash
omniroute connect 192.168.0.15 --scope write
```

Valinnat: `--port <p>` (kun isäntäosoite ei sisällä porttia), `--name <ctx>` (kontekstin nimi),
`--scope read|write|admin`. Täydellistä URL-osoitetta käytetään sellaisenaan:
`omniroute connect https://omni.example.com`.

### Ennalta luodulla tunnuksella

Luo rajattu tunnus hallintapaneelissa (tai komennolla `omniroute tokens create`) ja
liitä se — salasanaa ei tarvita:

```bash
omniroute connect 192.168.0.15 --key oma_live_xxxxxxxx
```

CLI validoi sen reitillä `GET /api/cli/whoami` ja tallentaa sen aktiiviseen kontekstiin.

---

## Käyttöalueet

Kolme hierarkkista tasoa (`admin ⊃ write ⊃ read`):

| Käyttöalue | Sallitut toiminnot                                                                              |
| ---------- | ----------------------------------------------------------------------------------------------- |
| `read`     | luettelointi/tarkastelu — `models list`, `providers status`, `logs`, `usage`, `cost`            |
| `write`    | luku **+** määritys/käyttöönotto — `setup-codex`, `keys add`, `config set`, yhdistelmät         |
| `admin`    | kirjoitus **+** hallinta — `tokens`-CRUD, palveluntarjoajien lisäys, palvelut, käytännöt, oauth |

Palvelin päättelee kunkin reitin edellyttämän käyttöalueen HTTP-metodista
(`GET`→read, muutokset→write) sekä arkaluonteisten kohteiden admin-sallittujen luettelosta
(`/api/cli/tokens`, `/api/providers`-muutokset, `/api/oauth`, `/api/services`, …).
Jos tunnuksen käyttöalue ei riitä, palvelin palauttaa tilakoodin `403` ja selkeän viestin.

> Prosesseja käynnistävät reitit (`/api/services/*`, `/api/mcp/*`, …) pysyvät
> **vain loopback-yhteyksille sallittuina** — etätunnuksella niitä ei voi koskaan käyttää käyttöalueesta riippumatta.

---

## Antigravityn yhdistäminen etäasennuksessa

Antigravity käyttää Googlen firstparty/nativeapp-suostumusnäyttöä. Google
luovuttaa valtuutuskoodin vain, kun **loopback-uudelleenohjaus**
(`http://127.0.0.1:<port>/callback`) on **kirjautumisen hyväksyvän selaimen
saavutettavissa**. VPS-etäasennuksessa kyseinen loopback-osoite sijaitsee
palvelimella, ei omalla koneellasi, joten suostumusnäyttö **jää odottamaan ikuisesti
eikä koskaan tuota koodia** — tavanomaisessa ”liitä callback-URL” -varamenetelmässä
ei ole mitään liitettävää. (Tämä on Googlen asettama rajoitus: sama jumiutuminen
tapahtuu missä tahansa välityspalvelimessa, joka käyttää mukana toimitettua
Antigravity-työpöytäsovellusta, ei ainoastaan OmniRoutessa.)

Hallintapaneeli havaitsee tämän ennen kuin jäät jumiin: kun avaat muusta kuin
localhost-osoitteesta kohdan **Providers → Antigravity → Connect**, yleinen
”kopioi callback-URL” -ilmoitus korvataan alla olevilla kahdella ratkaisulla,
joihin isäntäsi ja porttisi on jo täytetty. (Myös LAN-osoite lasketaan —
`192.168.x.x` ei tämän callback-kutsun kannalta ole localhost.)

Antigravity voidaan yhdistää OmniRoute-etäasennukseen kahdella tuetulla tavalla.

### Vaihtoehto A — paikallinen kirjautumisavustaja (suositeltu)

Suorita OAuth **omalla tietokoneellasi**, jossa `127.0.0.1` on saavutettavissa.
Avustaja kommunikoi suoraan Googlen kanssa, joten suostumusprosessi valmistuu
siellä, missä hallintapaneelin versio ei siihen pysty.

**Jos yhteys on jo muodostettu** (`omniroute connect <host>`), mitään ei tarvitse
kopioida — avustaja toimittaa tunnistetiedon kyseiseen asennukseen puolestasi:

```bash
# PAIKALLISELLA koneellasi (vaatii Node.js:n ja selaimen):
omniroute connect 192.168.0.15        # kerran — luo järjestelmänvalvojan laajuisen kontekstitunnuksen
npx omniroute login antigravity
#   ↳ avaa Googlen suostumusnäkymän, vastaanottaa callback-kutsun paikallisessa loopback-portissa,
#     vaihtaa sen tunnistetiedoksi ja lähettää tunnistetiedon POST-pyynnöllä aktiiviseen kontekstiin:
#
#   Antigravity yhdistetty osoitteessa http://192.168.0.15:20128 (yhteys abc123).
#   Mitään ei tarvitse liittää — voit sulkea tämän päätteen.
```

Lähetys tapahtuu automaattisesti aina, kun aktiivinen konteksti osoittaa toiseen
koneeseen. Voit pakottaa sen kumpaan tahansa tilaan valinnoilla `--push` /
`--no-push` tai kohdistaa sen tiettyyn kontekstiin valinnalla `--context <name>`.

**Jos koneesi ei saa yhteyttä VPS-palvelimeen** (palomuuri estää yhteyden, ei
SSH-yhteyttä tai työpiste on eristetty verkosta), avustaja toimii silti — se
_tarvitsee_ yhteyden vain Googleen. Käytä valintaa `--no-push` tai anna lähetyksen
epäonnistua: avustaja tulostaa tällöin blobin sen sijaan, että jo suorittamasi
valtuutus hylättäisiin.

```bash
npx omniroute login antigravity --no-push
#   omniroute-cred-v1.eyJ2IjoxLCJ...
```

Avaa sitten **etäpalvelimen** hallintapaneelissa **Providers → Antigravity →
Connect** ja liitä `omniroute-cred-v1.…`-blob **Step 2** -kenttään (kenttä hyväksyy
joko callback-URL:n tai tunnistetietoblobin). OmniRoute purkaa sen, suorittaa
Cloud Code -käyttöönoton palvelinpuolella ja tallentaa yhteyden pysyvästi.

> Blob sisältää päivitystunnuksen — käsittele sitä kuin salasanaa. Lähetysmenetelmässä
> se lähetetään kerran kontekstisi todennetun yhteyden kautta ja liittämismenetelmässä
> hallintapaneeliyhteytesi kautta. Kummassakin tapauksessa se tallennetaan levylle
> salattuna, eikä onnistunut lähetys koskaan tulosta sitä päätteeseesi.

Valinnat: `--no-browser` (tulosta URL sen automaattisen avaamisen sijaan),
`--port <n>` (kiinnitä loopback-portti), `--timeout <ms>`, `--push` / `--no-push`
(ohita automaattinen toimitustapa), `--context <name>` (kohdista tiettyyn
kontekstiin).

### Vaihtoehto B — paikallinen SSH-porttiohjaustunneli

Jos sinulla on SSH-yhteys VPS-palvelimeen, välitä hallintapaneelin portti siten,
että loopback-callback ohjautuu tunnelin kautta takaisin palvelimelle:

```bash
# PAIKALLISELLA koneellasi:
ssh -L 20128:127.0.0.1:20128 user@your-vps
# avaa sitten http://localhost:20128 PAIKALLISESSA selaimessasi ja yhdistä Antigravity
# normaalisti — 127.0.0.1:20128/callback-uudelleenohjaus saavuttaa nyt VPS-palvelimen SSH:n kautta.
```

Koska käytät hallintapaneelia osoitteessa `localhost:20128`, Googlen
suostumusprosessi valmistuu ja callback toimitetaan palvelimelle saman tunnelin
kautta — blobia ei tarvita. Pidä tunneli avoinna, kunnes yhteys näkyy aktiivisena.

Toisin kuin alla mainituilla kiinteää loopback-osoitetta käyttävillä
palveluntarjoajilla, **yksi porttiohjaus riittää** tässä tapauksessa:
Antigravityn callback käyttää itse hallintapaneelin porttia, joten toista
palveluntarjoajakohtaista porttia ei tarvitse tunneloida.

> Täysin headless-vaihtoehtona (ei avustajaa eikä tunnelia) voit määrittää **omat**
> Googlen OAuth-verkkotunnistetietosi ja julkisen perus-URL:n; katso palveluntarjoajan
> OAuth-ympäristömuuttujat. Kumpikaan yllä olevista vaihtoehdoista ei vaadi
> Googlen lisämäärityksiä.

---

## Codexin / Grokin yhdistäminen etäasennukseen (kiinteän loopback-osoitteen palveluntarjoajat)

Codex, xAI (`xai-oauth`) ja Grok CLI (`grok-cli`) rekisteröivät OAuth-yläpalveluunsa
**kiinteän** loopback-osoitteen `redirect_uri`. OmniRoute ei voi muuttaa sitä —
palveluntarjoaja lähettää selaimen aina takaisin samaan kovakoodattuun osoitteeseen:

| Palveluntarjoaja | Kiinteä callback-osoite, johon palveluntarjoaja uudelleenohjaa |
| ---------------- | -------------------------------------------------------------- |
| `codex`          | `http://localhost:1455/auth/callback`                          |
| `xai-oauth`      | `http://127.0.0.1:56121/callback`                              |
| `grok-cli`       | `http://127.0.0.1:56122/callback`                              |

Tässä `localhost` tarkoittaa **konetta, jossa selain on käynnissä**, kun taas OmniRouten
PKCE-callback-palvelin kuuntelee **palvelimen** loopback-osoitetta. Jos hallintapaneeli
avataan lähiverkko-osoitteessa, kuten `http://192.168.0.15:20128`, nämä eivät koskaan
kohtaa: valtuutuskoodi toimitetaan oman kannettavan tietokoneesi osoitteeseen
`localhost:1455`, jossa mikään ei kuuntele, ja palveluntarjoajan kirjautuminen
epäonnistuu näyttämättä virheilmoitusta.

Hallintapaneeli havaitsee tämän ennen ponnahdusikkunan avaamista ja näyttää
tunnelikomennon sen sijaan, että kirjautuminen epäonnistuisi huomaamatta (#8046).

### Korjaus — välitä **molemmat** portit

```bash
# Koneessa, jossa SELAIN on käynnissä:
ssh -L 20128:127.0.0.1:20128 -L 1455:127.0.0.1:1455 <user>@192.168.0.15
# siirry sitten osoitteeseen http://localhost:20128 ja yhdistä Codex sieltä
```

Molemmat välitykset tarvitaan, ja vain yhden portin välittäminen epäonnistuu edelleen:

- **`20128`** (hallintapaneelin portti) tekee originista aidosti localhost-osoitteen,
  minkä ansiosta OmniRoute ylipäätään käynnistää PKCE-callback-palvelimen —
  lähiverkko-origin ei koskaan päädy kyseiseen haaraan.
- **`1455`** (palveluntarjoajan kiinteä callback-portti) on portti, johon selain
  lähetetään takaisin; liikenne on tunneloitava sen kautta palvelimen
  loopback-osoitteeseen.

Korvaa `1455` portilla `56121`/`56122`, kun yhdistät xAI:n tai Grok CLI:n, ja
`20128` todellisella hallintapaneelisi portilla. Pidä tunneli avoinna, kunnes
yhteys näkyy aktiivisena.

> **Eikö SSH-yhteyttä ole?** Codex ja Grok CLI hyväksyvät myös liitetyn tunnuksen —
> yhdistämisikkunan **Liitä API-avain**- / **Tuo auth.json** -välilehdellä. Tämä
> menetelmä ei käytä loopback-callbackia, joten se toimii mistä tahansa originista.
> Codex hyväksyy lisäksi pelkän käyttöoikeustunnuksen tai
> `~/.codex/auth.json`-istuntoblobin.

---

## Tunnusten hallinta

```bash
omniroute tokens create --name "laptop" --scope write [--expires 30]
#   ↳ tulostaa salaisuuden KERRAN — kopioi se nyt
omniroute tokens list                 # peitetty: tunniste, nimi, käyttöalue, etuliite, tila, vanheneminen
omniroute tokens revoke <id|prefix>   # mitätöi välittömästi
omniroute tokens scopes               # selitä kolme käyttöaluetta
```

`tokens`-komennot edellyttävät **admin**-tunnistetietoa. Voit hallita tunnuksia
myös hallintapaneelin kohdassa **Asetukset → Käyttöoikeustunnukset** (luo, mitätöi,
kopioi kerran).

---

## Ohjelmointi-CLI:n määrittäminen etäluettelosta

`omniroute configure` lukee **aktiivisen palvelimen** ajantasaisen malliluettelon
ja kirjoittaa määritykset **omalle** koneellesi.

```bash
omniroute configure codex
#   Palveluntarjoajat: glm, kmc, ollamacloud, opencode-go, …
#   Palveluntarjoaja: glm
#   Mallin tunniste: glm/glm-5.2
#   ✔ Kirjoitettiin ~/.codex/glm52.config.toml
#   Käytä näin:  codex --profile glm52

# ei-vuorovaikutteinen
omniroute configure codex --provider glm --model glm/glm-5.2 --name glm52

# pidä usein käytetty malli vuorovaikutteisen valitsimen alussa
omniroute configure codex --provider glm --model glm/glm-5.2 --favorite --yes
```

Valitsin säilyttää paikallisessa `model-preferences.json`-tiedostossa vain mallien
tunnisteet (ei koskaan URL-osoitteita tai tunnistetietoja), kontekstin ja
CLI-kohteen mukaan rajattuina. Suosikit näytetään ennen viimeksi valittuja;
poista valittu malli kyseisen kontekstin/kohteen luettelosta käyttämällä
`--unfavorite`-valitsinta.

Kirjoitettu profiili viittaa päättelyavaimeen ympäristömuuttujan
(`OMNIROUTE_API_KEY`) kautta — salaisuutta ei koskaan kirjoiteta levylle.
Codexin kertaluonteisen perusmäärityksen (`[model_providers.omniroute]`-lohkon)
ohjeet ovat tiedostossa
[CODEX-CLI-CONFIGURATION.md](./CODEX-CLI-CONFIGURATION.md).

### CLI:n käynnistäminen etäpalvelua vasten (määrityksiä kirjoittamatta)

Myös `omniroute run <target>` noudattaa aktiivista kontekstia: etäpalvelun
perus-URL-osoite ja kontekstin tunnistetieto lisätään vain käynnistettyyn
prosessiin.

```bash
omniroute connect 192.168.0.15
omniroute run claude   --model openai/gpt-5.4          # Claude Code → etäpalvelu
omniroute run gemini   --model glm/glm-5.2 -- --skip-trust -p "hello"
omniroute run opencode --model glm/glm-5.2 -- run "reply OK"

# Esikatsele tarkalleen, mitä käynnistettäisiin (vain ympäristömuuttujien AVAINTEN NIMET, ei koskaan arvoja):
omniroute run codex --dry-run --json
```

Kohteet: `claude`, `codex`, `aider`, `goose`, `opencode`, `qwen`, `gemini`
(ainoa lähde: `bin/cli/cli-manifest.mjs`). Qwen ja Gemini suoritetaan
väliaikaisessa eristetyssä kotihakemistossa, joka poistetaan suorittamisen
päätyttyä, joten käynnistys ei koskaan koske henkilökohtaisen työkalusi
määrityksiin — eikä vuoda niihin.

### CLI-kohtaiset määrityskomennot

Jokaisella tuetulla CLI:llä on etäpalvelut huomioiva määrityskomento (kaikki
noudattavat aktiivista kontekstia tai valitsimia `--remote <url> --api-key <key>`):

| CLI         | Komento                    | Mitä se kirjoittaa                                                                                                                                                                                                        |
| ----------- | -------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Codex       | `omniroute setup-codex`    | `~/.codex/<name>.config.toml`-profiilit (mallikohtaisesti)                                                                                                                                                                |
| Claude Code | `omniroute setup-claude`   | `~/.claude/profiles/<name>/settings.json` (mallikohtaisesti)                                                                                                                                                              |
| OpenCode    | `omniroute setup-opencode` | `~/.config/opencode/opencode.json` — OpenAI-yhteensopiva `omniroute`-palveluntarjoaja kaikilla luettelon malleilla (suorita `opencode -m omniroute/<model>`)                                                              |
| Cline       | `omniroute setup-cline`    | `~/.cline/data/{globalState,secrets}.json` (CLI-tila) + tulostaa liitettävät VS Code -laajennuksen asetukset (OpenAI-yhteensopiva, perus-URL **ilman** `/v1`-osaa)                                                        |
| Kilo Code   | `omniroute setup-kilo`     | `~/.local/share/kilo/auth.json` (CLI) + VS Coden `kilocode.*`-asetukset — OpenAI-yhteensopiva, perus-URL **sisältää** `/v1`-osan                                                                                          |
| Continue    | `omniroute setup-continue` | `~/.continue/config.yaml` (VS Code/JetBrains + `cn` CLI) — `provider: openai`, `apiBase` **sisältää** `/v1`-osan, avain `${{ secrets.OMNIROUTE_API_KEY }}`-salaisuuden kautta                                             |
| Cursor      | `omniroute setup-cursor`   | tulostaa sovelluksessa tehtävät vaiheet (Settings → Models → Override OpenAI Base URL **sisältäen** `/v1`-osan + avain + malli). Cursorin määritys on läpinäkymätön SQLite — vain keskustelupaneeli                       |
| Roo Code    | `omniroute setup-roo`      | kirjoittaa Roon tuotavan JSON-tiedoston (`~/.omniroute/roo-settings.json`) + asettaa `roo-cline.autoImportSettingsPath`-arvon + tulostaa käyttöliittymän vaiheet (OpenAI-yhteensopiva, perus-URL **sisältää** `/v1`-osan) |
| Crush       | `omniroute setup-crush`    | `~/.config/crush/crush.json` — `openai-compat`-palveluntarjoaja, `base_url` **sisältää** `/v1`-osan, avain `$OMNIROUTE_API_KEY`-ympäristömuuttujan kautta                                                                 |
| Goose       | `omniroute setup-goose`    | `~/.config/goose/config.yaml` (`GOOSE_PROVIDER=openai` + `OPENAI_HOST` **ilman** `/v1`-osaa + `GOOSE_MODEL`) + ympäristömuuttujaohje                                                                                      |
| Aider       | `omniroute setup-aider`    | `~/.aider.conf.yml` (`openai-api-base` **ilman** `/v1`-osaa + `model: openai/<id>`) + ympäristömuuttujaohje (`aider --message --yes`)                                                                                     |
| Qwen Code   | `omniroute setup-qwen`     | `~/.qwen/settings.json` V4:n `modelProviders.openai`-merkintä + `OMNIROUTE_API_KEY` tiedostossa `~/.qwen/.env`                                                                                                            |

```bash
# OpenCode (OpenAI-yhteensopiva palveluntarjoaja, kaikki luettelon mallit, etä-VPS)
omniroute setup-opencode --remote http://192.168.0.15:20128 --api-key oma_live_xxx
omniroute setup-opencode --only glm,kimi        # säilytä vain vastaavat mallit
opencode -m omniroute/glm/glm-5.2 "..."          # vie ensin OMNIROUTE_API_KEY ympäristöön
```

> OpenCodella on myös monipuolisempi **liitännäisintegraatio**: `omniroute setup opencode`
> (tukee nyt etäyhteyksiä `--remote`-valitsimella), joka asentaa `@omniroute/opencode-plugin`-paketin.
> `setup-opencode` on kevyt OpenAI-yhteensopiva vaihtoehto. API-avaimeen
> viitataan muodossa `{env:OMNIROUTE_API_KEY}` — sitä ei koskaan kirjoiteta levylle.
>
> Käytä OpenCode v2:ssa sen sijaan `@omniroute/opencode-plugin-v2`-pakettia: sama luettelo,
> eri lataussopimus. Se lukee avaimen OpenCoden omasta tunnistetietosäilöstä,
> kun integraatio on yhdistetty, joten etäyhdyskäytävä ei tarvitse lainkaan avainta
> `opencode.json`-tiedostossa.

---

## Kontekstien hallinta (palvelimien välillä vaihtaminen)

**Konteksti** on tallennettu palvelin (baseUrl + tunnistetieto + käyttöalue). `omniroute connect`
luo kontekstin ja aktivoi sen; sen jälkeen jokainen komento kohdistuu siihen. Hallitse
konteksteja ja vaihda niiden välillä komennolla `omniroute contexts`:

```bash
omniroute contexts list            # kaikki kontekstit; aktiivinen on merkitty symbolilla ●
omniroute contexts current         # aktiivinen palvelin, todennuksen tila ja käyttöalue
```

```text
  | Nimi    | Perus-URL                 | Todennus | Käyttöalue | Kuvaus
● | vps     | http://100.67.86.91:20128 | token    | admin      | Etä-OmniRoute (…)
  | default | http://localhost:20128    | ✗        |            |
```

**Vaihda palvelinta** — kaikki seuraavat komennot käyttävät aktiivista kontekstia:

```bash
omniroute contexts use vps         # → kaikki komennot kohdistuvat nyt VPS-etäpalvelimeen
omniroute tokens list              #   (suoritetaan VPS-palvelinta vasten)

omniroute contexts use default     # → takaisin localhost-palvelimeen
omniroute tokens list              #   (suoritetaan paikallista palvelinta vasten)
```

**Lisää konteksti manuaalisesti** (`connect`-komennon sijaan), tarkastele sitä tai nimeä se uudelleen:

```bash
omniroute contexts add staging --url https://staging.example.com:20128 \
  --access-token oma_live_xxxx --scope write --description "välipalvelin"
omniroute contexts show staging    # yhden kontekstin täydelliset tiedot
omniroute contexts rename staging stg
```

**Poista konteksti** — pyytää vahvistusta; ohita se antamalla `--yes`
(vaaditaan komentosarjoissa / ei-vuorovaikutteisissa komentotulkeissa, jotka muuten kieltäytyvät turvallisesti):

```bash
omniroute contexts remove stg --yes
```

> `default`-kontekstia (localhost) ei voi poistaa. Aktiivisen kontekstin poistaminen vaihtaa
> takaisin `default`-kontekstiin. Vinkki: kontekstin poistaminen poistaa vain **paikallisesti** tallennetun tunnistetiedon —
> peruuta token palvelimella komennolla `omniroute tokens revoke <id>`, jotta
> käyttöoikeus todella poistuu.

**Vie / tuo** konteksteja (esimerkiksi niiden siirtämiseksi koneiden välillä). Uusissa konteksteissa säilytetään
vain viittaus avainnippuun; tunnistetietoja ei kopioida vientiin, kun käyttöjärjestelmän
avainnippu on käytettävissä:

```bash
omniroute contexts export --out contexts.json     # oletus: stdout
omniroute contexts import contexts.json            # korvaa; säilytä nykyiset valitsimella --merge
omniroute contexts migrate --yes                  # siirrä vanhat selväkieliset tokenit avainnippuun
```

Ilman käyttökelpoista käyttöjärjestelmän avainnippua toimivissa headless-järjestelmissä CLI käyttää varajärjestelynä
`config.json`-tiedostoa tilassa `0600` ja näyttää kertaluonteisen varoituksen. Käsittele tämän
varajärjestelyn vientejä (ja kaikkia ennen siirtoa luotuja vanhoja määrityksiä) salassa pidettävänä aineistona.

---

## Nopea päästä päähän -tarkistus

Kopioitava ja liitettävä elinkaari etäasennuksen tarkistamiseen alusta alkaen — muodosta yhteys, luo
rajatun käyttöalueen token, reititä komento, vaihda takaisin ja pura määritys. Korvaa
`192.168.0.15` palvelimesi isäntänimellä/IP-osoitteella (Tailscale, LAN tai julkinen
`https://…`-URL).

```bash
# 1. Muodosta yhteys (salasana → admin-token, tallennetaan aktiiviseksi tulevana kontekstina)
omniroute connect 192.168.0.15                 # tai: --key oma_live_xxxx  (ei salasanaa)
omniroute contexts current                     # näyttää etäpalvelimen ja käyttöalueen

# 2. Käytä sitä — hallintakomennot suoritetaan nyt etäpalvelinta vasten
omniroute tokens create --name laptop --scope read   # luo käyttöalueeltaan suppeampi token
omniroute tokens list                                 # peitetty luettelo etäpalvelimelta

# 3. Vaihda edestakaisin
omniroute contexts use default                 # → paikallinen
omniroute contexts use 192-168-0-15            # → takaisin etäpalvelimeen (nimi komennosta `contexts list`)

# 4. Pura määritys. HUOMAUTUS: `contexts remove` poistaa vain PAIKALLISEN tunnistetiedon —
#    se EI peruuta tokenia palvelimella. Peruuta se ensin palvelimelta, jos
#    haluat todella poistaa käyttöoikeuden.
omniroute tokens revoke <id|prefix>            # poistaa käyttöoikeuden palvelimella
omniroute contexts remove 192-168-0-15 --yes   # poista paikallinen konteksti (vaikka se olisi aktiivinen → vaihtaa default-kontekstiin), ei vahvistuspyyntöä
```

> `--yes` tekee `contexts remove` -komennosta ei-vuorovaikutteisen (vaaditaan komentosarjoissa/CI:ssä; ilman
> sitä ei-vuorovaikutteinen komentotulkki kieltäytyy turvallisesti jumiutumisen sijaan). **Aktiivisen**
> kontekstin poistaminen vaihtaa automaattisesti `default`-kontekstiin.

---

## Tietoturvahuomautukset

- Tokenin selväkielinen arvo näytetään kerran; vain SHA-256-tiiviste tallennetaan (samoin kuin API-avaimissa).
- `omniroute connect` käyttää samaa kirjautumisen väsytyshyökkäysten estävää lukitusta ja auditointilokitusta.
- Käytä tiedonsiirtoon mieluiten HTTPS-yhteyttä tai Tailnet-verkkoa; pelkkä isäntänimi käyttää oletusarvoisesti `http://`-protokollaa lähiverkko- ja Tailscale-käytön helpottamiseksi — käytä täydellistä `https://…`-URL-osoitetta TLS-yhteyttä varten.
- Suositeltu paikallinen kontekstitiedosto on `~/.omniroute/config.json` (`chmod 600`), joka sisältää vain `credentialRef`-viittauksen; itse token tallennetaan käyttöjärjestelmän avainnippuun (`keytar`), eikä sitä koskaan tulosteta lokeihin. Ilman toimivaa natiivia avainnippua tehdyt käyttöliittymättömät asennukset käyttävät erikseen määritettynä vararatkaisuna samaa `0600`-tiedostoa ja antavat varoituksen kerran. Käytä komentoa `omniroute contexts migrate --yes` avainnippu-taustajärjestelmän asentamisen jälkeen.

---

## API-päätepisteet (viite)

| Menetelmä | Reitti                | Todennus           | Käyttöoikeus                       |
| --------- | --------------------- | ------------------ | ---------------------------------- |
| POST      | `/api/cli/connect`    | hallinnan salasana | — (julkinen, salasanalla suojattu) |
| GET       | `/api/cli/whoami`     | käyttötoken        | luku                               |
| GET       | `/api/cli/tokens`     | käyttötoken        | ylläpito                           |
| POST      | `/api/cli/tokens`     | käyttötoken        | ylläpito                           |
| DELETE    | `/api/cli/tokens/:id` | käyttötoken        | ylläpito                           |

Täydelliset skeemat ovat tiedostossa [openapi.yaml](../openapi.yaml).
