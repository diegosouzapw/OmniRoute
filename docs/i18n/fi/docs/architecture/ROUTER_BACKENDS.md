# Router Backends & Embedded Services — architecture contract (ADR) (Suomi)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/ROUTER_BACKENDS.md) · 🇪🇹 [am](../../../am/docs/architecture/ROUTER_BACKENDS.md) · 🇸🇦 [ar](../../../ar/docs/architecture/ROUTER_BACKENDS.md) · 🇦🇿 [az](../../../az/docs/architecture/ROUTER_BACKENDS.md) · 🇧🇬 [bg](../../../bg/docs/architecture/ROUTER_BACKENDS.md) · 🇧🇩 [bn](../../../bn/docs/architecture/ROUTER_BACKENDS.md) · 🇨🇿 [cs](../../../cs/docs/architecture/ROUTER_BACKENDS.md) · 🇩🇰 [da](../../../da/docs/architecture/ROUTER_BACKENDS.md) · 🇩🇪 [de](../../../de/docs/architecture/ROUTER_BACKENDS.md) · 🇬🇷 [el](../../../el/docs/architecture/ROUTER_BACKENDS.md) · 🇪🇸 [es](../../../es/docs/architecture/ROUTER_BACKENDS.md) · 🇪🇪 [et](../../../et/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇷 [fa](../../../fa/docs/architecture/ROUTER_BACKENDS.md) · 🇫🇷 [fr](../../../fr/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇪 [ga](../../../ga/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [gu](../../../gu/docs/architecture/ROUTER_BACKENDS.md) · 🇳🇬 [ha](../../../ha/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇱 [he](../../../he/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [hi](../../../hi/docs/architecture/ROUTER_BACKENDS.md) · 🇭🇷 [hr](../../../hr/docs/architecture/ROUTER_BACKENDS.md) · 🇭🇺 [hu](../../../hu/docs/architecture/ROUTER_BACKENDS.md) · 🇦🇲 [hy](../../../hy/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇩 [id](../../../id/docs/architecture/ROUTER_BACKENDS.md) · 🇳🇬 [ig](../../../ig/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇹 [it](../../../it/docs/architecture/ROUTER_BACKENDS.md) · 🇯🇵 [ja](../../../ja/docs/architecture/ROUTER_BACKENDS.md) · 🇬🇪 [ka](../../../ka/docs/architecture/ROUTER_BACKENDS.md) · 🇰🇭 [km](../../../km/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [kn](../../../kn/docs/architecture/ROUTER_BACKENDS.md) · 🇰🇷 [ko](../../../ko/docs/architecture/ROUTER_BACKENDS.md) · 🇱🇹 [lt](../../../lt/docs/architecture/ROUTER_BACKENDS.md) · 🇱🇻 [lv](../../../lv/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [ml](../../../ml/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [mr](../../../mr/docs/architecture/ROUTER_BACKENDS.md) · 🇲🇾 [ms](../../../ms/docs/architecture/ROUTER_BACKENDS.md) · 🇲🇹 [mt](../../../mt/docs/architecture/ROUTER_BACKENDS.md) · 🇲🇲 [my](../../../my/docs/architecture/ROUTER_BACKENDS.md) · 🇳🇵 [ne](../../../ne/docs/architecture/ROUTER_BACKENDS.md) · 🇳🇱 [nl](../../../nl/docs/architecture/ROUTER_BACKENDS.md) · 🇳🇴 [no](../../../no/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [or](../../../or/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [pa](../../../pa/docs/architecture/ROUTER_BACKENDS.md) · 🇵🇭 [phi](../../../phi/docs/architecture/ROUTER_BACKENDS.md) · 🇵🇱 [pl](../../../pl/docs/architecture/ROUTER_BACKENDS.md) · 🇵🇹 [pt](../../../pt/docs/architecture/ROUTER_BACKENDS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/ROUTER_BACKENDS.md) · 🇷🇴 [ro](../../../ro/docs/architecture/ROUTER_BACKENDS.md) · 🇷🇺 [ru](../../../ru/docs/architecture/ROUTER_BACKENDS.md) · 🇱🇰 [si](../../../si/docs/architecture/ROUTER_BACKENDS.md) · 🇸🇰 [sk](../../../sk/docs/architecture/ROUTER_BACKENDS.md) · 🇸🇮 [sl](../../../sl/docs/architecture/ROUTER_BACKENDS.md) · 🇷🇸 [sr](../../../sr/docs/architecture/ROUTER_BACKENDS.md) · 🇸🇪 [sv](../../../sv/docs/architecture/ROUTER_BACKENDS.md) · 🇰🇪 [sw](../../../sw/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [ta](../../../ta/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [te](../../../te/docs/architecture/ROUTER_BACKENDS.md) · 🇹🇭 [th](../../../th/docs/architecture/ROUTER_BACKENDS.md) · 🇹🇷 [tr](../../../tr/docs/architecture/ROUTER_BACKENDS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/ROUTER_BACKENDS.md) · 🇵🇰 [ur](../../../ur/docs/architecture/ROUTER_BACKENDS.md) · 🇺🇿 [uz](../../../uz/docs/architecture/ROUTER_BACKENDS.md) · 🇻🇳 [vi](../../../vi/docs/architecture/ROUTER_BACKENDS.md) · 🇳🇬 [yo](../../../yo/docs/architecture/ROUTER_BACKENDS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/ROUTER_BACKENDS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/ROUTER_BACKENDS.md)

---

> **Tila:** Hyväksytty · **Konteksti:** [#5670](https://github.com/diegosouzapw/OmniRoute/issues/5670),
> [#5603](https://github.com/diegosouzapw/OmniRoute/issues/5603) · **Sopimus:** `domain/routing/routerBackends.ts`
> (tyypitetty rekisteri — koodi toimitetaan muutoksen [#5868](https://github.com/diegosouzapw/OmniRoute/pull/5868) mukana)

Tämä ADR määrittää täsmällisesti, miten `ts` (natiivi), `bifrost`, `cliproxy`, `9router` ja
VibeProxy-yhteensopivat moottorit liittyvät toisiinsa, jotta kehittäjät eivät enää
sekoita kahta arkkitehtuurisesti erillistä asiaa keskenään. Se määrittää
reitityksen taustajärjestelmärekisteriä koskevassa työssä käyttöön otetun tyypitetyn
rekisterin tämän mallin ainoaksi totuuden lähteeksi.

## Keskeinen ero — kaksi toisistaan riippumatonta akselia

Moottorin roolia kuvataan **kahdella itsenäisellä akselilla**, jotka on koodattu yhdessä
rekisterin `RouterBackendDefinition`-määritykseen:

1. **Elinkaari** (`RouterBackendLifecycle`) — _miten moottori suoritetaan_:
   - `in-process` — suoritetaan OmniRouten Node-prosessissa (natiivi TS-putki).
   - `supervised` — paikallinen aliprosessi, jonka OmniRoute asentaa, käynnistää, pysäyttää ja jonka kunnon se tarkistaa
     `ServiceSupervisor`-komponentin kautta ja jota se käyttää tämän jälkeen palveluntarjoajayhteytenä.
   - `external` — HTTP-päätepiste, johon OmniRoute välittää pyynnöt mutta jota se **ei** hallinnoi
     (määritetään ympäristömuuttujan perus-URL-osoitteella).
   - `disabled` — rekisteröity, mutta ei valittavissa.
2. **Valinta-akseli** (välityksen reititystaustajärjestelmä) — _välittääkö välityspalvelu pyynnöt sille_:
   `RelayRoutingBackend = "ts" | "bifrost" | "auto"` tiedostossa
   `src/app/api/v1/relay/chat/completions/routingBackend.ts`.

Vältettävä virhe: ”upotetun palvelun” ja ”reititystaustajärjestelmän” käsitteleminen yhtenä
luettelona. Ne eivät ole sama asia. `supervised`-moottori (9router/cliproxy) on **natiivin
putken käyttämä palveluntarjoajayhteys**, ei vaihtoehtoinen välityksen reititystaustajärjestelmä.
`bifrost` on päinvastainen tapaus — välityksen reititystaustajärjestelmä, joka oli (historiallisesti)
vain `external`.

## Rekisteri — ainoa totuuden lähde

`domain/routing/routerBackends.ts`-sopimus (koodi toimitetaan muutoksen
[#5868](https://github.com/diegosouzapw/OmniRoute/pull/5868) mukana) määrittelee jokaisen moottorin kerran sekä sen
elinkaaren, ominaisuudet, palveluidentiteetin, oletusportin, kuntotarkistusmääritykset ja
telemetriatuen. Käyttäjät hakevat moottoreita funktioilla `getRouterBackend(id)`,
`listRouterBackends()` ja `listRouterBackendsByCapability(cap)` sen sijaan, että
jokainen rinnakkaispalvelu käsiteltäisiin erikoistapauksena.

| Taustajärjestelmä | Elinkaari    | Palvelu (akseli A) | Välityksen taustajärjestelmä (akseli B) | Kuntotarkistus | Oletusportti |
| ----------------- | ------------ | ------------------ | --------------------------------------- | -------------- | ------------ |
| `ts`              | `in-process` | —                  | `ts` (natiivi)                          | —              | —            |
| `bifrost`         | `external`¹  | —¹                 | `bifrost` / `auto`                      | `/health`      | —            |
| `cliproxy`        | `supervised` | `cliproxy`         | — (palveluntarjoaja)                    | `/v1/models`   | 8317         |
| `9router`         | `supervised` | `9router`          | — (palveluntarjoaja)                    | `/api/health`  | 20130        |
| `vibeproxy`       | `external`   | —                  | — (palveluntarjoajasovitin)             | `/v1/models`   | —            |

¹ Bifrostin muuttamista `supervised`-tyyppiseksi upotetuksi palveluksi (asennettavissa ja käynnistettävissä
polusta `/api/services/bifrost/`) seurataan muutoksessa
[#5817](https://github.com/diegosouzapw/OmniRoute/pull/5817). Siihen asti, kunnes se yhdistetään,
Bifrost on vain `external` (saavutettavissa ainoastaan muuttujan `BIFROST_BASE_URL` kautta).

`capabilities` (`chat`, `responses`, `streaming`, `tools`, `vision`,
`oauth-backed`, `dashboard-embed`, `model-sync`, `native-hot-path`) antaa kutsujien
suodattaa moottoreita niiden todellisten ominaisuuksien perusteella sen sijaan, että
jokaiselle tunnisteelle kovakoodattaisiin erillisiä haaroja.

## Akseli A — upotetut palvelut (valvotun prosessin puoli)

- **Valvottujen prosessien rekisteri:** `src/lib/services/bootstrap.ts` `SERVICES[]`
  (tällä hetkellä: `9router`, `cliproxy`).
- **Elinkaaren hallinta:** `src/lib/services/ServiceSupervisor.ts` — `start()` käynnistää
  lapsiprosessin, odottaa `waitForHealthy()`-tarkistuksen onnistumista ja ohjaa stdout-/stderr-tulosteet rengaspuskuriin;
  `stop()` käyttää SIGTERM→SIGKILL-menettelyä; kaikki operaatiot sarjallistetaan lukon avulla.
- **Tilojen unioni** (`src/lib/services/types.ts`):
  `not_installed | stopped | starting | running | stopping | error` sekä tästä
  riippumaton `HealthState = healthy | unhealthy | unknown`.
- **Miksi erillinen prosessi (eikä prosessin sisäinen SDK)?** Prosessieristys mahdollistaa
  kunkin sivuprosessin asennuksen, käynnistyksen, pysäytyksen, terveystarkistusten ja lokien
  itsenäisen hallinnan sekä takaisinkytkentäosoitteeseen perustuvan käynnistyssuojauksen.
  Prosessin sisäisen sovittimen mallintaminen on tulevaa työtä — se ilmaistaisiin
  `native-hot-path`-ominaisuuslipulla.

### Elinkaarireittien sopimus (`/api/services/<tool>/…`)

Tilakoodit ovat **tarkoituksella tila-, verbi- ja polkukohtaisia** — tämä on sopimus,
ei epäjohdonmukaisuus:

| Kutsu                              | Ehto                                                                     | Tila                                 |
| ---------------------------------- | ------------------------------------------------------------------------ | ------------------------------------ |
| `POST .../start`                   | palvelu on `not_installed`                                               | **409** (ennakkoehto)                |
| `POST .../stop`                    | jo pysäytetty                                                            | **200** (idempotentti ei-operaatio)  |
| `GET .../status`                   | OK                                                                       | **200** (`live ?? row ?? "unknown"`) |
| `POST .../start`                   | prosessin käynnistys epäonnistuu                                         | **503** (tilapäinen)                 |
| `GET .../status`, `.../stop`       | käsittelemätön virhe                                                     | **500**                              |
| `GET /api/services/<x>/logs`       | tuntematon työkalu `<x>`                                                 | **404** `Service '<x>' not found`    |
| `GET .../status?reveal=key`        | `X-Reveal-Confirm: yes` puuttuu                                          | **403** (vain 9router)               |
| **mikä tahansa** `/api/services/*` | kutsuja ei ole takaisinkytkentäosoitteessa tai yksityisessä lähiverkossa | **403 LOCAL_ONLY**                   |

Kaikki virherungot muodostetaan funktiolla `createErrorResponse()` →
`{ error: { message, type }, requestId }`, jossa `type` johdetaan tilakoodista
(`500→server_error`, `404→not_found`, `409→conflict`, muulloin `invalid_request`) ja toimii
koneellisesti käsiteltävänä erottimena. Viestit puhdistetaan ennalta
(`sanitizeErrorMessage()`, ehdoton sääntö nro 12).

**Takaisinkytkentäsuojaus** on yleisin `403`-vastauksen syy: `/api/services/` sisältyy
`LOCAL_ONLY_API_PREFIXES`-luetteloon (`src/server/authz/routeGuard.ts`), ja
`src/server/authz/policies/management.ts` hylkää kaikki kutsujat, jotka eivät käytä
takaisinkytkentäosoitetta tai yksityistä lähiverkkoa, **ennen todennusta**, koska nämä
reitit käynnistävät lapsiprosesseja (ehdottomat säännöt 15 ja 17). Niiden käyttäminen
julkisen tunnelin kautta tuottaa tarkoituksella `403`-vastauksen.

## Akseli B — välityksen reititystaustajärjestelmä (välityksen puoli)

Vain välityspalvelimen polku `/api/v1/relay/chat/completions` valitsee välityksen
taustajärjestelmän; pääasiallinen `/api/v1/chat/completions`-rajapinta ei koskaan käytä
`routingBackend.ts`-tiedostoa.

- **Valinta** (`resolveRelayRoutingBackend`): yksi globaali ympäristömuuttujakytkin —
  `OMNIROUTE_RELAY_BACKEND` / `RELAY_ROUTING_BACKEND` ∈ {`ts`, `bifrost`, `auto`}.
  Jos arvoa ei ole asetettu, valintana on `auto`, kun Bifrost on määritetty ja käytössä,
  muussa tapauksessa `ts`.
- **Toiminta:**
  - `bifrost` (pakotettu): Bifrostin virhe → ehdoton `502`, ei varajärjestelmää.
  - `auto`: kokeile Bifrostia; virheen tai jäähdytysjakson aikana siirry hiljaisesti natiiviin toteutukseen.
  - `ts` / varajärjestelmään siirtymisen jälkeen: natiivi `open-sse`-muunnin-/suoritusputki.
- **Jäähdytysjakso:** `baseUrl`-kohtainen virheiden jäähdytysjakso tiedostossa `bifrostCooldown.ts`.

Valinta on tällä hetkellä **kaikki tai ei mitään välitystasolla** — versiossa
`release/v3.8.43` moottoria ei voi vaihtaa palveluntarjoaja- tai pyyntökohtaisesti.
Pyyntökohtainen portti lisätään sivuprosessin manifestia koskevassa työssä
([#5869](https://github.com/diegosouzapw/OmniRoute/pull/5869) manifesti +
[#5870](https://github.com/diegosouzapw/OmniRoute/pull/5870) `shouldTryBifrostForRequest`),
minkä ansiosta `auto` voi reitittää Bifrostin kautta vain manifestin perusteella
kelvolliset palveluntarjoajat.

## Koontinäyttöintegraatio

Palvelujen koontinäyttö tekee kyselyn `GET /api/services/<tool>/status` 5 sekunnin välein tiedoston
`src/app/(dashboard)/dashboard/providers/services/hooks/useServiceStatus.ts` kautta.
Kysely palauttaa arvon `{ tool, state, pid, port, health, installedVersion, latestVersion,
updateAvailable, autoStart, … }`. Jaettua saatavuuskontekstin tarjoajaa ei ole —
jokainen komponentti kutsuu hookia työkalukohtaisesti. Ehdon `!res.ok` täyttyessä hook
näyttää tällä hetkellä pelkän virheen `HTTP <status>`; `error.type`-kentän yhdistäminen
ihmisen ymmärtämään selitykseen on seurattu käyttökokemusparannus, ei sopimusmuutos.

## Seuraukset

- Uudet moottorit rekisteröidään kerran kohteessa `ROUTER_BACKENDS`; niitä käyttävät
  komponentit saavat ne käyttöönsä kykelykyselyillä ilman uusia tunnistekohtaisia haaroja.
- Kysymykseen "Onko tämä palvelu vai reititystaustajärjestelmä?" vastataan `lifecycle`-kentän
  perusteella, ei sen mukaan, missä luettelossa tunniste sattuu esiintymään.
- Bifrostin valvonta (#5817) ja natiivin hot pathin migraatio (#5670) perustuvat tähän
  jaettuun sopimukseen sen sijaan, että kukin rinnakkaisprosessi käsiteltäisiin erikoistapauksena.
