# CORS Configuration & Security (Suomi)

🌐 **Languages:** 🇺🇸 [English](../../../../security/CORS.md) · 🇪🇹 [am](../../../am/docs/security/CORS.md) · 🇸🇦 [ar](../../../ar/docs/security/CORS.md) · 🇦🇿 [az](../../../az/docs/security/CORS.md) · 🇧🇬 [bg](../../../bg/docs/security/CORS.md) · 🇧🇩 [bn](../../../bn/docs/security/CORS.md) · 🇧🇦 [bs](../../../bs/docs/security/CORS.md) · 🇨🇿 [cs](../../../cs/docs/security/CORS.md) · 🇩🇰 [da](../../../da/docs/security/CORS.md) · 🇩🇪 [de](../../../de/docs/security/CORS.md) · 🇬🇷 [el](../../../el/docs/security/CORS.md) · 🇪🇸 [es](../../../es/docs/security/CORS.md) · 🇪🇪 [et](../../../et/docs/security/CORS.md) · 🇮🇷 [fa](../../../fa/docs/security/CORS.md) · 🇫🇷 [fr](../../../fr/docs/security/CORS.md) · 🇮🇪 [ga](../../../ga/docs/security/CORS.md) · 🇮🇳 [gu](../../../gu/docs/security/CORS.md) · 🇳🇬 [ha](../../../ha/docs/security/CORS.md) · 🇮🇱 [he](../../../he/docs/security/CORS.md) · 🇮🇳 [hi](../../../hi/docs/security/CORS.md) · 🇭🇷 [hr](../../../hr/docs/security/CORS.md) · 🇭🇺 [hu](../../../hu/docs/security/CORS.md) · 🇦🇲 [hy](../../../hy/docs/security/CORS.md) · 🇮🇩 [id](../../../id/docs/security/CORS.md) · 🇳🇬 [ig](../../../ig/docs/security/CORS.md) · 🇮🇹 [it](../../../it/docs/security/CORS.md) · 🇯🇵 [ja](../../../ja/docs/security/CORS.md) · 🇬🇪 [ka](../../../ka/docs/security/CORS.md) · 🇰🇭 [km](../../../km/docs/security/CORS.md) · 🇮🇳 [kn](../../../kn/docs/security/CORS.md) · 🇰🇷 [ko](../../../ko/docs/security/CORS.md) · 🇱🇹 [lt](../../../lt/docs/security/CORS.md) · 🇱🇻 [lv](../../../lv/docs/security/CORS.md) · 🇮🇳 [ml](../../../ml/docs/security/CORS.md) · 🇮🇳 [mr](../../../mr/docs/security/CORS.md) · 🇲🇾 [ms](../../../ms/docs/security/CORS.md) · 🇲🇹 [mt](../../../mt/docs/security/CORS.md) · 🇲🇲 [my](../../../my/docs/security/CORS.md) · 🇳🇵 [ne](../../../ne/docs/security/CORS.md) · 🇳🇱 [nl](../../../nl/docs/security/CORS.md) · 🇳🇴 [no](../../../no/docs/security/CORS.md) · 🇮🇳 [or](../../../or/docs/security/CORS.md) · 🇮🇳 [pa](../../../pa/docs/security/CORS.md) · 🇵🇭 [phi](../../../phi/docs/security/CORS.md) · 🇵🇱 [pl](../../../pl/docs/security/CORS.md) · 🇵🇹 [pt](../../../pt/docs/security/CORS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/CORS.md) · 🇷🇴 [ro](../../../ro/docs/security/CORS.md) · 🇷🇺 [ru](../../../ru/docs/security/CORS.md) · 🇱🇰 [si](../../../si/docs/security/CORS.md) · 🇸🇰 [sk](../../../sk/docs/security/CORS.md) · 🇸🇮 [sl](../../../sl/docs/security/CORS.md) · 🇷🇸 [sr](../../../sr/docs/security/CORS.md) · 🇸🇪 [sv](../../../sv/docs/security/CORS.md) · 🇰🇪 [sw](../../../sw/docs/security/CORS.md) · 🇮🇳 [ta](../../../ta/docs/security/CORS.md) · 🇮🇳 [te](../../../te/docs/security/CORS.md) · 🇹🇭 [th](../../../th/docs/security/CORS.md) · 🇹🇷 [tr](../../../tr/docs/security/CORS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/CORS.md) · 🇵🇰 [ur](../../../ur/docs/security/CORS.md) · 🇺🇿 [uz](../../../uz/docs/security/CORS.md) · 🇻🇳 [vi](../../../vi/docs/security/CORS.md) · 🇳🇬 [yo](../../../yo/docs/security/CORS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/CORS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/CORS.md)

---

OmniRoute hallitsee keskitetyn sallittujen luettelon avulla, mitkä **selainalkuperät** saavat lukea eri alkuperästä tulevia vastauksia. Malli on **oletusarvoisesti estävä**:
mitään alkuperää ei sallita, ennen kuin lisäät sen sallittujen joukkoon. Tällä sivulla kuvataan, miten sallittujen luettelo
ratkaistaan, mitä `CORS_ALLOW_ALL=true` todella tuo saataville (ja ennen kaikkea, mitä se
**ei** tuo), miten kehitys- ja tuotantoympäristöt määritetään turvallisesti sekä ajonaikainen varoitus,
jonka hallintapaneeli näyttää yleismerkin ollessa käytössä.

**Ensisijainen lähde:** `src/server/cors/origins.ts` (`resolveAllowedOrigin`,
`applyCorsHeaders`, `getCorsStatus`). Sallittujen luetteloa sovelletaan kerran
väliohjelmistossa (`src/server/authz/pipeline.ts`) — reittikohtaiset käsittelijät eivät itse aseta
`Access-Control-Allow-Origin`-otsaketta.

## Miten alkuperä ratkaistaan

Väliohjelmisto laskee jokaiselle pyynnölle `Access-Control-Allow-Origin`-arvon
seuraavassa järjestyksessä:

1. **`CORS_ALLOW_ALL=true`** (tai vanha `CORS_ORIGIN=*`) → palauttaa kutsujan
   `Origin`-arvon sellaisenaan (tai `*`, jos `Origin`-otsaketta ei ole) ja lisää `Vary: Origin` -otsakkeen,
   jotta välimuistit toimivat oikein. Sama keskitetty `applyCorsHeaders()`-kohta lisää myös
   `Vary: Accept-Encoding` -otsakkeen jokaiseen vastauksen rungon sisältävään 2xx-vastaukseen tunnisteella todennetulla
   `/v1*`/`/v1beta*`-rajapinnalla (`relaxForTokenAuth`, RFC 9110 §12.5.5, ongelma #6737), jotta
   myöhemmät ja jaetut välimuistit pystyvät erottamaan pakatut ja pakkaamattomat
   versiot oikein.
2. Muussa tapauksessa pyynnön `Origin` normalisoidaan (muunnetaan pieniksi kirjaimiksi ja lopussa oleva vinoviiva
   poistetaan) ja sitä verrataan **yhdistettyyn sallittujen luetteloon**:
   - ympäristömuuttuja **`CORS_ALLOWED_ORIGINS`** — pilkuilla eroteltu luettelo, ja
   - ajonaikainen **`corsOrigins`**-asetus (Hallintapaneeli → Tietoturva → _Sallitut CORS-alkuperät_),
     joka syötetään `setRuntimeAllowedOrigins()`-funktion kautta tiedostosta
     `src/lib/config/runtimeSettings.ts`.
3. Ei vastaavuutta → **`Access-Control-Allow-Origin`-otsaketta ei lähetetä**. Selain
   estää eri alkuperästä tulevan vastauksen lukemisen. Tämä on tarkoituksellinen oletusarvoisesti estävä toimintatapa.

| Ympäristömuuttuja      | Merkitys                                                                                                      |
| ---------------------- | ------------------------------------------------------------------------------------------------------------- |
| `CORS_ALLOWED_ORIGINS` | Pilkuilla eroteltu luettelo täsmällisesti sallittavista alkuperistä (suositus).                               |
| `CORS_ALLOW_ALL`       | `true`/`1` → hyväksy mikä tahansa alkuperä palauttamalla se vastauksessa (yleismerkki). Vain kehityskäyttöön. |
| `CORS_ORIGIN`          | Vanha. `*` toimii kuten `CORS_ALLOW_ALL`; yksittäinen arvo lisätään sallittujen luetteloon.                   |

## Uhkakuva — mitä `CORS_ALLOW_ALL=true` todella tuo saataville

OWASP:n yleinen varoitus ("yleismerkillä määritetty CORS = mikä tahansa sivusto voi kutsua rajapintaasi") on syytä
ottaa vakavasti, mutta OmniRouten altistuminen on **yleistä tapausta suppeampi**
yhden konkreettisen toteutusseikan vuoksi:

> **Keskitetty `applyCorsHeaders()` ei koskaan lähetä
> `Access-Control-Allow-Credentials`-otsaketta.** Selain ei anna eri alkuperän sivulle _tunnistetietoja sisältävää_
> (evästeen sisältävää) vastausta, ellei palvelin lähetä
> `Access-Control-Allow-Credentials: true` -otsaketta. OmniRouten yhteinen CORS-polku ei koskaan
> tee näin.

Tämä tarkoittaa seuraavaa kullekin rajapinnalle, vaikka `CORS_ALLOW_ALL=true`:

| Rajapinta                                        | Todennusmekanismi           | Yleismerkillä määritetyn CORS:n vaikutus                                                                                                                                                                                                                                                  |
| ------------------------------------------------ | --------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Hallintapaneeli / MANAGEMENT `/api/*`            | Evästeistunto               | Alkuperä palautetaan vastauksessa, mutta **ilman `Allow-Credentials`-otsaketta** selain **estää** tunnistetietoja sisältävän vastauksen lukemisen. Haitallinen eri alkuperässä oleva sivusto **ei voi lukea** todennettuja hallintapaneelivastauksiasi, eikä istuntoevästettä paljasteta. |
| Asiakasrajapinta `/v1/*`, `/v1beta/*`            | Bearer / `x-api-key`-otsake | On jo valmiiksi salliva **tarkoituksellisesti** (`relaxForTokenAuth`): selaimet eivät koskaan liitä automaattisesti `Authorization`/`x-api-key`-otsakkeita, joten hyökkääjän sivu ei voi toimittaa avaintasi. `CORS_ALLOW_ALL` ei laajenna tätä.                                          |
| Julkinen vain luku -rajapinta (`/api/health`, …) | Ei mitään                   | Ei arkaluonteinen; yleismerkki on vaaraton.                                                                                                                                                                                                                                               |

Näin ollen `CORS_ALLOW_ALL=true`-asetuksen **jäännösriski** rajoittuu seuraaviin: (a)
jo valmiiksi todentamattomien tietojen eri alkuperästä tehtävät **lukupyynnöt** ilman tunnistetietoja ja (b)
CORS-**esitarkistuspyyntöjen läpäiseminen** hallintareiteillä — jotka edellyttävät silti todennusta,
jota eri alkuperässä oleva sivu ei voi toimittaa. Tämä **ei** muodosta istunnon kaappaus- tai
tunnistetietojen varastamisriskiä yhteisellä CORS-polulla.

### Yksi todellinen poikkeus — `/api/v1/agents/`

Cloud-Agent-reitit (`/api/v1/agents/{health,credentials,tasks,tasks/[id]}`) asettavat
**omat** CORS-otsakkeensa
(`src/lib/cloudAgent/api.ts`, `getCloudAgentCorsHeaders`) ja **lähettävät**
`Access-Control-Allow-Origin: <origin>|*`-otsakkeen yhdessä
`Access-Control-Allow-Credentials: true` -otsakkeen kanssa. Tämä on ainoa rajapinta, jossa
alkuperän palauttaminen ja tunnistetiedot esiintyvät yhdessä, ja se on **riippumaton
`CORS_ALLOW_ALL`**-asetuksesta. Nämä reitit todennetaan hallintatunnuksilla
(`requireManagementAuth`); hallintapaneelin isäntäkoneen ulkopuolelle tuovien ylläpitäjien tulisi
tiedostaa, että tämä on ainoa kohta, jossa vastausotsakkeet sallivat tunnistetietoja sisältävän
vastauksen lukemisen eri alkuperästä. Sen rajaamista nimenomaiseen sallittujen luetteloon seurataan
erillään tästä CORS-ohjeistuksesta.

## Tuotantoympäristön tarkistuslista

- **Älä koskaan aseta tuotantoympäristössä arvoa `CORS_ALLOW_ALL=true`.** Jätä se määrittämättä.
- Määritä **eksplisiittinen** alkuperäluettelo joko ympäristömuuttujalla tai Security-välilehden kentässä:

  ```bash
  CORS_ALLOWED_ORIGINS="https://app.example.com, https://admin.example.com"
  ```

- Jos OmniRoute toimii käänteisen välityspalvelimen / tunnelin (nginx, Caddy, Cloudflare
  Tunnel, Tailscale) takana, CORS **ei** ole ainoa suojauksesi — loopback-reittisuojaus
  suojaa edelleen prosessien käynnistämiseen kykeneviä reittejä (katso
  [ROUTE_GUARD_TIERS](./ROUTE_GUARD_TIERS.md)). Älä väärennä
  `X-Forwarded-For: 127.0.0.1` -otsaketta 403-virheen "korjaamiseksi", sillä se avaa
  uudelleen RCE-haavoittuvuusluokan, jonka reittisuojaus sulkee.
- Vahvista ajonaikainen tila: hallintapaneeli näyttää **pysyvän meripihkanvärisen bannerin**
  kohdassa Dashboard → Security → Authorization Inventory aina, kun
  `CORS_ALLOW_ALL=true` on käytössä, ja `/api/settings/authz-inventory` palauttaa
  `cors: { allowAll, allowedOrigins }` -rakenteen, jota valvontatyökalut voivat kysellä.

## Kehitysympäristön käytännöllisyys — salli tietyt paikalliset alkuperät

Jokerimerkkiä tarvitaan harvoin edes kehitysympäristössä. Salli vain käyttämäsi kehityspalvelimet:

```bash
# Vite- (5173) ja Next.js-kehityspalvelimet (3000), jotka kutsuvat paikallista OmniRoutea
CORS_ALLOWED_ORIGINS="http://localhost:5173, http://localhost:3000"
```

Alkuperät täsmäytetään kirjainkoosta riippumatta ja lopun vinoviiva ohitetaan, joten
`http://localhost:3000` ja `http://localhost:3000/` ovat samanarvoisia. Saman CSV-luettelon
voi asettaa ajonaikaisesti kohdassa **Dashboard → Security → CORS Allowed Origins** ilman
uudelleenkäynnistystä.

## API-avaimet vs. evästeistunnot

- **Bearer / `x-api-key` (`/v1/*`-päättelyrajapinta):** selaimet eivät koskaan liitä
  näitä automaattisesti. CORS ei ole tässä merkityksellinen este — API-avain on
  este — minkä vuoksi tämä rajapinta on tarkoituksella salliva, jotta selain- ja
  Electron-asiakkaat voivat lukea vastaukset, joihin niillä on jo oikeus.
- **Evästeistunto (hallintapaneeli):** sitä suojaavat sekä oletusarvoinen estävä
  toimintatapa **että** `Access-Control-Allow-Credentials`-otsakkeen puuttuminen
  jaetulta polulta. Älä sisällytä hallinta- tai hallintapaneelialkuperiä mihinkään
  sallivaan määritykseen; niiden on pysyttävä täysin oletusarvoisesti estettyinä.

## Esimerkki: käänteinen välityspalvelin OmniRouten edessä

OmniRoute valvoo CORS-käytäntöä itse, joten välityspalvelimen ei yleensä pidä **lisätä**
tai muokata `Access-Control-*`-otsakkeita (päällekkäiset otsakkeet rikkovat selainten
toiminnan). Päätä TLS-yhteys ja välitä liikenne — anna OmniRouten vastata esitarkistuspyyntöön:

```nginx
# nginx — välitä OmniRoutelle; ÄLÄ lisää Access-Control-*-otsakkeita tässä
location / {
    proxy_pass http://127.0.0.1:20128;
    proxy_set_header Host $host;
    proxy_set_header X-Forwarded-Proto $scheme;
    # ÄLÄ aseta X-Forwarded-For-otsakkeen arvoksi 127.0.0.1 — se ohittaa loopback-reittisuojauksen.
}
```

Aseta sallitut selainalkuperät OmniRoutessa (`CORS_ALLOWED_ORIGINS` tai
Security-välilehti), älä välityspalvelimessa.

## Lähdetiedostot

| Kohde                                               | Tiedosto                                                             |
| --------------------------------------------------- | -------------------------------------------------------------------- |
| Sallittujen alkuperien ratkaisu + `getCorsStatus()` | `src/server/cors/origins.ts`                                         |
| Väliohjelmiston käyttöönotto (ainoa totuuden lähde) | `src/server/authz/pipeline.ts`                                       |
| Asetukset → ajonaikainen alkuperien lisäys          | `src/lib/config/runtimeSettings.ts`                                  |
| Hallintapaneelin ajonaikainen tila                  | `src/app/api/settings/authz-inventory/route.ts`                      |
| Hallintapaneelin varoitusbanneri                    | `src/app/(dashboard)/dashboard/settings/components/AuthzSection.tsx` |
| CORS Allowed Origins -kenttä                        | `src/app/(dashboard)/dashboard/settings/components/SecurityTab.tsx`  |
| Cloud-Agentin reittikohtainen CORS (poikkeus)       | `src/lib/cloudAgent/api.ts`                                          |

## Katso myös

- [Reittisuojauksen tasot](./ROUTE_GUARD_TIERS.md) — loopback-pakotus
  prosesseja käynnistäville reiteille (erillinen, täydentävä hallintakeino).
- [Valtuutusopas](../architecture/AUTHZ_GUIDE.md) — koko valtuutusputki.
