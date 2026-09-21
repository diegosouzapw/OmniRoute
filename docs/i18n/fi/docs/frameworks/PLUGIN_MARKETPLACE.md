# Plugin Marketplace (Suomi)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/PLUGIN_MARKETPLACE.md) · 🇪🇹 [am](../../../am/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇦🇿 [az](../../../az/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇩🇰 [da](../../../da/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇩🇪 [de](../../../de/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇬🇷 [el](../../../el/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇪🇸 [es](../../../es/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇪🇪 [et](../../../et/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇱 [he](../../../he/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇩 [id](../../../id/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇹 [it](../../../it/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇰🇭 [km](../../../km/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇲🇲 [my](../../../my/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇳🇴 [no](../../../no/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [or](../../../or/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇱🇰 [si](../../../si/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [te](../../../te/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇹🇭 [th](../../../th/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/PLUGIN_MARKETPLACE.md)

---

> **Totuuden lähde:** `src/lib/plugins/` (`marketplace.ts`, `manager.ts`, `manifest.ts`,
> `scanner.ts`, `loader.ts`), `src/app/api/plugins/` ja
> `src/app/(dashboard)/dashboard/plugins/`
> **Päivitetty viimeksi:** 2026-06-28 — v3.8.40

OmniRoute sisältää WordPress-tyylisen lisäosajärjestelmän. Lisäosat ovat
itsenäisiä hakemistoja, joista jokainen sisältää `plugin.json`-manifestin ja
aloitustiedoston. Ne kytkeytyvät pyyntöputkeen (`onRequest` / `onResponse` /
`onError`) ja elinkaaritapahtumiin (`onInstall` / `onActivate` / `onDeactivate` /
`onUninstall`).

**Lisäosakauppa** toimii tämän järjestelmän löytämiskerroksena. Se tarjoaa
selattavan luettelon asennettavista lisäosista. Oletusarvoisesti luettelo on
pieni sisäänrakennettu alustava rekisteri. Operaattori voi määrittää käyttöön
mukautetun etärekisterin URL-osoitteen, jolloin nouto suojataan DNS-selvitystä
käyttävällä SSRF-suojauksella (katso [Tietoturva](#security)).

Kaikki lisäosareitit ovat käytettävissä **vain loopback-osoitteesta** (taso 1 —
`LOCAL_ONLY`): lisäosat lataavat ja suorittavat koodia aliprosesseissa, joten
reitit eivät ole käytettävissä muista kuin loopback-lähteistä todennuksesta
riippumatta. Katso
[`docs/security/ROUTE_GUARD_TIERS.md`](../security/ROUTE_GUARD_TIERS.md).

## Kokonaisuuden toiminta

```
Hallintapaneeli (/dashboard/plugins)
  ├─ "Asennetut"-välilehti → GET /api/plugins            (listPlugins)
  │                          POST /api/plugins/scan      (pluginManager.scan)
  │                          POST /api/plugins/{name}/activate|deactivate
  │                          DELETE /api/plugins/{name}   (asennuksen poisto)
  └─ "Lisäosakauppa"-välilehti → GET /api/plugins/marketplace
                                  → listMarketplacePlugins()
                                    ├─ ei mukautettua URL-osoitetta → sisäänrakennettu SEED_REGISTRY
                                    └─ mukautettu URL-osoite → isSafeMarketplaceUrl() SSRF-suojaus
                                                               → safeOutboundFetch(guard:"public-only")
```

- **Rekisterikerros** — `src/lib/plugins/marketplace.ts`: luettelee luettelon
  sisällön ja tekee siitä hakuja sekä käyttää virhetilanteissa alustavaa
  rekisteriä.
- **Elinkaarikerros** — `src/lib/plugins/manager.ts` (`pluginManager`-singleton):
  asennus, päivitys, aktivointi, käytöstäpoisto, asennuksen poisto, tarkistus ja
  lataus käynnistyksen yhteydessä.
- **Manifestikerros** — `src/lib/plugins/manifest.ts`: Zod-skeema ja
  oletusarvot tiedostolle `plugin.json`.
- **Tarkistin** — `src/lib/plugins/scanner.ts`: löytää levyllä olevat lisäosat
  lisäosahakemistosta.
- **Lataaja** — `src/lib/plugins/loader.ts`: käynnistää jokaisen lisäosan
  eristetyssä aliprosessissa ja välittää koukkukutsut IPC:n kautta.

## Lisäosakaupan luettelo

`listMarketplacePlugins()` (`src/lib/plugins/marketplace.ts`) palauttaa luettelon
`MarketplaceEntry`-objekteja:

| Kenttä        | Tyyppi   | Huomautukset                        |
| ------------- | -------- | ----------------------------------- |
| `name`        | string   | kebab-case-muotoinen lisäosan nimi  |
| `version`     | string   | semver                              |
| `description` | string   | Lyhyt yhteenveto                    |
| `author`      | string   | Tekijä / organisaatio               |
| `license`     | string   | SPDX-tyylinen lisenssitunniste      |
| `downloadUrl` | string   | Lähteen lataus-URL (voi olla tyhjä) |
| `repository`  | string?  | Valinnainen tietovaraston URL       |
| `tags`        | string[] | Haku- ja suodatustunnisteet         |
| `downloads`   | number   | Latausten määrä                     |
| `rating`      | number   | 0–5                                 |
| `verified`    | boolean  | Onko kohde merkitty vahvistetuksi   |
| `lastUpdated` | string   | ISO-tyylinen päivämäärämerkkijono   |

Kun mukautetun rekisterin URL-osoitetta ei ole määritetty, luettelona käytetään
sisäänrakennettua `SEED_REGISTRY`-rekisteriä (tällä hetkellä `request-logger`,
`rate-limiter`, `cost-tracker` ja `theme-manager`). Alustava rekisteri on aina
käytettävissä — jos määritettyä etärekisteriä ei voida tavoittaa, se palauttaa
muun kuin `200`-tilan tai tunnistamattoman rungon, `listMarketplacePlugins()`
kirjaa varoituksen ja käyttää alustavaa luetteloa.

> Huomautus: lisäosakaupan **luettelo** (selaaminen/haku) on toteutettu päästä
> päähän, mutta yhden napsautuksen **asennusta** luettelosta ei ole vielä
> toteutettu — hallintapaneelin lisäosakauppakohteen "Asenna"-painike näyttää
> tällä hetkellä ilmoituksen tulevasta toiminnosta. Asennus tehdään nykyisin
> paikallisen polun asennusprosessin (`POST /api/plugins`) ja levyltä tehtävän
> haun (`POST /api/plugins/scan`) kautta.

## REST API

Kaikki päätepisteet edellyttävät hallinnan todennusta (`requireManagementAuth`) **ja**
ovat käytettävissä vain loopback-osoitteesta — `/api/plugins` ja `/api/plugins/` on lueteltu
`LOCAL_ONLY_API_PREFIXES`-taulukossa (`src/server/authz/routeGuard.ts`).

| Päätepiste                       | Menetelmä | Kuvaus                                                        |
| -------------------------------- | --------- | ------------------------------------------------------------- |
| `/api/plugins`                   | GET       | Luettele asennetut lisäosat (valinnainen `?status=`-suodatin) |
| `/api/plugins`                   | POST      | Asenna lisäosa absoluuttisesta paikallisesta polusta          |
| `/api/plugins/scan`              | POST      | Tarkista lisäosahakemisto ja rekisteröi uudet lisäosat        |
| `/api/plugins/marketplace`       | GET       | Luettele markkinapaikan luettelomerkinnät                     |
| `/api/plugins/[name]`            | GET       | Hae asennetun lisäosan tiedot                                 |
| `/api/plugins/[name]`            | DELETE    | Poista lisäosan asennus                                       |
| `/api/plugins/[name]/activate`   | POST      | Aktivoi (lataa + rekisteröi koukut)                           |
| `/api/plugins/[name]/deactivate` | POST      | Poista käytöstä (suorita `onDeactivate`, poista koukut)       |
| `/api/plugins/[name]/config`     | GET       | Hae lisäosan määritykset + määritysskeema                     |
| `/api/plugins/[name]/config`     | PUT       | Päivitä lisäosan määritykset (validoidaan skeemaa vasten)     |

`GET /api/plugins` -pyynnön `status`-suodatin hyväksyy yhden seuraavista arvoista:
`installed` / `active` / `inactive` / `error`. Virheellinen arvo palauttaa vastauksen `400`.

### Asennettujen lisäosien luetteleminen

```bash
curl http://localhost:20128/api/plugins \
  -H "Cookie: auth_token=..."
```

### Asentaminen paikallisesta polusta

```bash
curl -X POST http://localhost:20128/api/plugins \
  -H "Cookie: auth_token=..." \
  -H "Content-Type: application/json" \
  -d '{ "path": "/absolute/path/to/my-plugin" }'
```

`path`-arvon on oltava **absoluuttinen**, eikä se saa sisältää `..`-siirtymäsegmenttejä tai
nollatavuja (Zod varmistaa tämän). Lähdehakemiston on sisällettävä kelvollinen
`plugin.json` (tai sen on oltava sellaisen ylähakemisto). Onnistuneen pyynnön vastaus on `201`, ja se
sisältää asennetun lisäosan rivin.

### Markkinapaikan selaaminen

```bash
curl http://localhost:20128/api/plugins/marketplace \
  -H "Cookie: auth_token=..."
```

### Lisäosan määritysten päivittäminen

```bash
curl -X PUT http://localhost:20128/api/plugins/my-plugin/config \
  -H "Cookie: auth_token=..." \
  -H "Content-Type: application/json" \
  -d '{ "config": { "level": "debug", "maxItems": 100 } }'
```

`PUT .../config` validoi jokaisen annetun arvon lisäosan
`configSchema`-skeemaa vasten (määritetty manifestissa): `number`-kentät noudattavat `min`-/`max`-rajoja,
ja `select`-kenttien on vastattava määritettyä `enum`-arvoa. Avaimet, joita skeemassa ei ole,
sallitaan sellaisinaan.

## Määritykset

### Lisäosahakemisto

Lisäosat sijaitsevat OmniRouten datahakemistossa:

```
~/.omniroute/plugins/<plugin-name>/
  ├─ plugin.json
  └─ index.js          # (tai tiedosto, johon manifest.main viittaa)
```

`getDefaultPluginDir()` (`src/lib/plugins/scanner.ts`) määrittää hakemiston
kolmessa vaiheessa:

1. **`OMNIROUTE_PLUGINS_DIR`**, kun se on asetettu — käytetään sellaisenaan riippumatta `HOME`-arvosta. Tämä on
   nimenomainen asetus Docker-/K8s-ympäristöille, joissa lisäosapuu liitetään bind-mountilla polkuun,
   jolla ei yleensä ole mitään tekemistä säilön kotihakemiston kanssa (#11827).
2. `<home>/.omniroute/plugins`, jossa `<home>` saadaan `HOME`- / `USERPROFILE`-
   ympäristömuuttujista.
3. `/tmp/.omniroute/plugins`, kun prosessi ei vie lainkaan kotihakemistotietoa.

Ratkaistu hakemisto kirjataan lokiin kerran käynnistyksen yhteydessä tapahtumana `scanner.dir_resolved`, ja
lokimerkintä nimeää valitun syötteen (`OMNIROUTE_PLUGINS_DIR`, `home` tai `no-home-fallback`) — näin vaiheeseen 3
hiljaisesti päätyvä levykuva ilmoittaa asiasta sen sijaan, että se raportoisi vain tyhjän lisäosaluettelon.
`POST /api/plugins/scan` etsii kaikki kyseisen hakemiston alihakemistot, jotka sisältävät kelvollisen
`plugin.json`-tiedoston, ja rekisteröi ne; sama hakemisto on juuri, johon
`pluginManager.install()` kopioi lisäosat, joten ohitus siirtää etsinnän ja
asennuksen yhdessä.

> **`OMNIROUTE_PLUGINS_DIR` ei ole `OMNIROUTE_PLUGIN_PATH`.** Jälkimmäistä lukee vain
> CLI:n komentolisäosien lataaja (`bin/cli/plugins.mjs`) löytääkseen `omniroute-cmd-*` npm-
> paketit, jotka lisäävät `omniroute`-alikomentoja — se ei vaikuta tässä kuvattuun suorituksenaikaiseen skanneriin.
> Katso tätä osuutta koskevat tiedot tiedostosta [PLUGINS.md](./PLUGINS.md).

### Mukautettu markkinapaikkarekisterin URL-osoite

Markkinapaikan luettelon lähde luetaan `pluginMarketplaceUrl`-asetuksesta
(`src/lib/plugins/marketplace.ts` lukee arvon `settings.pluginMarketplaceUrl`). Kun
asetuksena on `http(s)`-URL-osoite, `listMarketplacePlugins()` noutaa kyseisen URL-osoitteen ja hyväksyy
joko ylätason JSON-taulukon, joka sisältää merkinnät, tai objektin, jossa on `plugins`-taulukko;
merkinnät, joilla ei ole merkkijonomuotoista `name`-arvoa, suodatetaan pois. Kun asetusta ei ole määritetty
(tai kun nouto ei läpäise SSRF-suojausta / palauttaa virheellisen vastauksen), käytetään
sisäänrakennettua alkurekisteriä.

Hallintapaneelin "Markkinapaikka"-välilehti sisältää kentän tälle URL-osoitteelle (arvo luetaan takaisin
`GET /api/settings` -pyynnöllä).

> Toteutushuomautus: hallintapaneelin "Tallenna"-toiminto lähettää
> `pluginMarketplaceUrl`-arvon `PATCH /api/settings` -pyynnöllä. Tätä kirjoitettaessa kyseistä
> avainta ei ole määritetty `updateSettingsSchema`-skeemassa
> (`src/shared/validation/settingsSchemas.ts`), joten varmista arvon säilyminen omassa
> julkaisussasi ennen kuin luotat siihen — **lukupolku** (`getSettings()` →
> `listMarketplacePlugins()`) huomioi avaimen, kun se on asetustietovarastossa.

## Tietoturva

### Reittitaso — vain loopback-yhteydet

Liitännäiset suorittavat koodia käynnistetyissä aliprosesseissa, joten koko
`/api/plugins`-rajapinta on luokiteltu tasolle `LOCAL_ONLY` (taso 1).
Loopback-rajoitus suoritetaan poikkeuksetta **ennen** mitään todennustarkistusta,
joten tunnelin kautta koneelle päätynyt vuotanut hallintatunniste ei siltikään
voi asentaa, aktivoida tai poistaa liitännäistä. Katso
[`docs/security/ROUTE_GUARD_TIERS.md`](../security/ROUTE_GUARD_TIERS.md) ja
ehdottomat säännöt #15 / #17.

### Markkinapaikkarekisterin SSRF-suojaus

Mukautettu rekisterin URL-osoite on hyökkääjän vaikutettavissa oleva määritys,
joten ennen sen noutamista `listMarketplacePlugins()` käsittelee sen kahdella
suojaustasolla:

1. **`isSafeMarketplaceUrl(url)`** (`src/lib/plugins/marketplace.ts`):
   - Hylkää kaiken, mikä ei käytä `http:`- tai `https:`-protokollaa.
   - Hylkää literaaliset yksityiset, loopback-, link-local- ja ULA-isännät
     (sekä IPv4 **että** IPv6, mukaan lukien IPv4-mappaukset) käyttäen
     kanonista `isPrivateHost`-toimintoa
     (`src/shared/network/outboundUrlGuard.ts`).
   - Selvittää **sekä** `A`- että `AAAA`-tietueet ja hylkää URL-osoitteen, jos
     **mikä tahansa** selvitetty osoite on yksityinen — tämä estää
     julkinen isäntänimi → yksityinen IP -ohituksen.
   - **Estää oletusarvoisesti**: DNS-selvityksen epäonnistuminen johtaa
     URL-osoitteen hylkäämiseen.
2. **`safeOutboundFetch(url, { guard: "public-only", timeoutMs: 5000 })`**
   (`src/shared/network/safeOutboundFetch.ts`): ottaa julkisiin osoitteisiin
   rajoittuvan URL-suojauksen uudelleen käyttöön noutohetkellä ja **estää
   uudelleenohjaukset** (ei julkinen → yksityinen `30x`-siirtymää).

Kumman tahansa suojaustason hylkäämä URL-osoite ei keskeytä pyyntöä —
markkinapaikka palaa huomaamattomasti sisäänrakennettuun alkurekisteriin ja
kirjaa varoituksen.

> Tätä suojausta vahvistettiin PR:ssä #3774 erityisesti selvittämään A + AAAA
> ja käyttämään kanonista `isPrivateHost`-toimintoa pelkän IPv4-tarkistuksen
> sijaan.

### Liitännäisten suorituksen eristäminen

- **Prosessieristys** — `loadPlugin()` (`src/lib/plugins/loader.ts`) käynnistää
  jokaisen liitännäisen erillisessä Node.js-aliprosessissa ja viestii sen kanssa
  IPC:n kautta. Koukkujen kutsuilla on aikakatkaisu, joka eskaloituu
  `SIGTERM` → `SIGKILL`.
- **Ympäristömuuttujien sallittujen luettelo** — aliprosessi saa vain
  sallittujen luetteloon kuuluvat ympäristömuuttujat; laajempi joukko annetaan
  vain, kun manifesti pyytää `env`-oikeutta.
- **Polkujen rajaaminen** — asennus, päivitys ja poistaminen varmistavat ennen
  mitään kopiointia tai rekursiivista poistamista, että liitännäisen hakemisto
  ja `manifest.main` ratkeavat hallitun liitännäisjuuren **sisälle** (suojaa
  peukaloiduilta tietokantapoluilta ja `../`-siirtymiseltä kohteessa
  `manifest.main`). Aktivointi ratkaisee symboliset linkit `realpath`-toiminnolla
  ja kieltäytyy lataamasta aloituskohtaa, joka sijaitsee liitännäishakemiston
  ulkopuolella.
- **Valinnainen eheyskiinnitys** — manifesti voi määrittää `integrity`-kentän
  (`sha256-<base64>`, SRI-muoto). Kun kenttä on määritetty, lataaja tarkistaa
  aloitustiedoston tiivisteen lataushetkellä ja kieltäytyy aktivoimasta
  liitännäistä, jos tiiviste ei täsmää. Kyseessä on erikseen käyttöön otettava
  peukaloinnin tunnistus, **ei** tietoturvaraja — todelliset rajat muodostuvat
  vain loopback-yhteydet sallivasta reitityksestä ja käyttöoikeusmallista.

## Manifesti (`plugin.json`)

Validoidaan `PluginManifestSchema`-skeemalla
(`src/lib/plugins/manifest.ts`):

| Kenttä             | Tyyppi    | Huomautukset                                                   |
| ------------------ | --------- | -------------------------------------------------------------- |
| `name`             | string    | Pakollinen; kebab-case (`^[a-z0-9-]+$`), 1–100 merkkiä         |
| `version`          | string    | Pakollinen; semver (`MAJOR.MINOR.PATCH`)                       |
| `description`      | string?   | ≤ 500 merkkiä                                                  |
| `author`           | string?   | ≤ 200 merkkiä                                                  |
| `license`          | string?   | Oletusarvo on `MIT`                                            |
| `main`             | string?   | Aloitustiedosto; oletusarvo on `index.js`                      |
| `source`           | enum?     | `local` \| `marketplace` (oletusarvo on `local`)               |
| `tags`             | string[]? | Hakutunnisteet                                                 |
| `requires`         | object?   | `{ omniroute?, permissions[] }`                                |
| `hooks`            | object?   | Totuusarvot, jotka ilmoittavat liitännäisen toteuttamat koukut |
| `skills`           | object[]? | Valinnaiset taitomääritykset                                   |
| `enabledByDefault` | boolean?  | Aktivoi automaattisesti asennuksen yhteydessä                  |
| `configSchema`     | object?   | Määrityskenttien kartta (`string`/`number`/`boolean`/`select`) |
| `integrity`        | string?   | Valinnainen aloitustiedoston `sha256-<base64>`-kiinnitys       |

Käyttöoikeudet valitaan enumeraatiosta
`network` / `file-read` / `file-write` / `env` / `exec`.

## Elinkaaren kulku

```
install (POST /api/plugins, polku)
  → tarkista/validoi manifesti → kopioi valmistelualueelle → varmista, että main on hakemiston sisällä
  → nimeä atomisesti uudelleen kohteeseen ~/.omniroute/plugins/<name> → lisää tietokantarivi
  → suorita onInstall → jos enabledByDefault: aktivoi

activate (POST /api/plugins/{name}/activate)
  → tarkista realpath-polun pysyminen hakemiston sisällä → loadPlugin() (käynnistä aliprosessi)
  → rekisteröi määritetyt koukut → status = "active" → suorita onActivate

deactivate (POST /api/plugins/{name}/deactivate)
  → suorita onDeactivate (ENNEN rekisteröinnin poistamista) → poista koukkujen rekisteröinti
  → lopeta aliprosessi → status = "inactive"

uninstall (DELETE /api/plugins/{name})
  → deaktivoi, jos aktiivinen → suorita onUninstall
  → poista liitännäishakemisto rekursiivisesti polun pysyminen tarkistaen → poista tietokantarivi
```

Kun `install` suoritetaan uudelleen hakemistolle, jonka manifestiversio on **aidosti
uudempi** kuin asennettu versio, liitännäinen päivitetään automaattisesti (puhdas
uudelleenasennus; määritykset palautetaan oletusarvoihin). Sama tai vanhempi versio
hylätään.

## Tietokanta

Taulu `plugins` (migraatio `076_create_plugins.sql`):

| Sarake          | Tyyppi  | Huomautukset                                              |
| --------------- | ------- | --------------------------------------------------------- |
| `id`            | TEXT PK | UUID                                                      |
| `name`          | TEXT    | Yksilöllinen                                              |
| `version`       | TEXT    | semver; oletus `1.0.0`                                    |
| `description`   | TEXT    | Valinnainen                                               |
| `author`        | TEXT    | Valinnainen                                               |
| `license`       | TEXT    | Oletus `MIT`                                              |
| `main`          | TEXT    | Aloitustiedosto; oletus `index.js`                        |
| `source`        | TEXT    | Oletus `local`                                            |
| `tags`          | TEXT    | JSON-taulukko; oletus `[]`                                |
| `status`        | TEXT    | `installed` \| `active` \| `inactive` \| `error`          |
| `enabled`       | INT     | 0/1; oletus 0                                             |
| `manifest`      | TEXT    | Täydellinen manifesti-JSON                                |
| `config`        | TEXT    | JSON; oletus `{}`                                         |
| `config_schema` | TEXT    | JSON; oletus `{}`                                         |
| `hooks`         | TEXT    | Määritettyjen koukkujen nimien JSON-taulukko; oletus `[]` |
| `permissions`   | TEXT    | JSON-taulukko; oletus `[]`                                |
| `plugin_dir`    | TEXT    | Absoluuttinen asennushakemisto                            |
| `error_message` | TEXT    | Asetetaan, kun `status = "error"`                         |
| `installed_at`  | TEXT    | `datetime('now')`                                         |
| `updated_at`    | TEXT    | `datetime('now')`                                         |
| `activated_at`  | TEXT    | Asetetaan aktivoinnin yhteydessä                          |

Liitännäisten mittareita ja analytiikkaa seurataan erillisissä tauluissa
(`090_plugin_metrics.sql`, `091_plugin_analytics.sql`).

## Hallintapaneeli

Hallintapaneelin sivulla `/dashboard/plugins`
(`src/app/(dashboard)/dashboard/plugins/page.tsx`) on kaksi välilehteä:

- **Asennetut** — näyttää asennetut liitännäiset ja niiden määrittämät koukut,
  aktivoinnin/deaktivoinnin vaihtokytkimen, asennuksen poistopainikkeen sekä
  "Etsi liitännäisiä" -toiminnon (`POST /api/plugins/scan`).
- **Markkinapaikka** — näyttää luettelon, joka haetaan osoitteesta
  `GET /api/plugins/marketplace`, sekä kentän mukautetun rekisterin URL-osoitteen
  määrittämistä varten.

Liitännäiskohtainen määrityssivu sijaitsee osoitteessa
`/dashboard/plugins/[name]/config`
(`src/app/(dashboard)/dashboard/plugins/[name]/config/page.tsx`).

## Katso myös

- [`docs/security/ROUTE_GUARD_TIERS.md`](../security/ROUTE_GUARD_TIERS.md) —
  miksi `/api/plugins` on käytettävissä vain loopback-osoitteesta (taso 1)
- [`docs/frameworks/SKILLS.md`](./SKILLS.md) — siihen liittyvä taitokehys
  (`src/lib/skills/`); liitännäiset voivat määrittää taitoja manifestissaan
- [`docs/frameworks/WEBHOOKS.md`](./WEBHOOKS.md) — tapahtumapohjaiset lähtevät
  integraatiot
- [`docs/security/ERROR_SANITIZATION.md`](../security/ERROR_SANITIZATION.md) —
  `buildErrorBody()`-malli, jota jokainen liitännäisreitti käyttää virhevastauksissa
