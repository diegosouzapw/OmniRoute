# OmniRoute Auto-Combo Engine (Suomi)

🌐 **Languages:** 🇺🇸 [English](../../../../routing/AUTO-COMBO.md) · 🇪🇹 [am](../../../am/docs/routing/AUTO-COMBO.md) · 🇸🇦 [ar](../../../ar/docs/routing/AUTO-COMBO.md) · 🇦🇿 [az](../../../az/docs/routing/AUTO-COMBO.md) · 🇧🇬 [bg](../../../bg/docs/routing/AUTO-COMBO.md) · 🇧🇩 [bn](../../../bn/docs/routing/AUTO-COMBO.md) · 🇧🇦 [bs](../../../bs/docs/routing/AUTO-COMBO.md) · 🇨🇿 [cs](../../../cs/docs/routing/AUTO-COMBO.md) · 🇩🇰 [da](../../../da/docs/routing/AUTO-COMBO.md) · 🇩🇪 [de](../../../de/docs/routing/AUTO-COMBO.md) · 🇬🇷 [el](../../../el/docs/routing/AUTO-COMBO.md) · 🇪🇸 [es](../../../es/docs/routing/AUTO-COMBO.md) · 🇪🇪 [et](../../../et/docs/routing/AUTO-COMBO.md) · 🇮🇷 [fa](../../../fa/docs/routing/AUTO-COMBO.md) · 🇫🇷 [fr](../../../fr/docs/routing/AUTO-COMBO.md) · 🇮🇪 [ga](../../../ga/docs/routing/AUTO-COMBO.md) · 🇮🇳 [gu](../../../gu/docs/routing/AUTO-COMBO.md) · 🇳🇬 [ha](../../../ha/docs/routing/AUTO-COMBO.md) · 🇮🇱 [he](../../../he/docs/routing/AUTO-COMBO.md) · 🇮🇳 [hi](../../../hi/docs/routing/AUTO-COMBO.md) · 🇭🇷 [hr](../../../hr/docs/routing/AUTO-COMBO.md) · 🇭🇺 [hu](../../../hu/docs/routing/AUTO-COMBO.md) · 🇦🇲 [hy](../../../hy/docs/routing/AUTO-COMBO.md) · 🇮🇩 [id](../../../id/docs/routing/AUTO-COMBO.md) · 🇳🇬 [ig](../../../ig/docs/routing/AUTO-COMBO.md) · 🇮🇹 [it](../../../it/docs/routing/AUTO-COMBO.md) · 🇯🇵 [ja](../../../ja/docs/routing/AUTO-COMBO.md) · 🇬🇪 [ka](../../../ka/docs/routing/AUTO-COMBO.md) · 🇰🇭 [km](../../../km/docs/routing/AUTO-COMBO.md) · 🇮🇳 [kn](../../../kn/docs/routing/AUTO-COMBO.md) · 🇰🇷 [ko](../../../ko/docs/routing/AUTO-COMBO.md) · 🇱🇹 [lt](../../../lt/docs/routing/AUTO-COMBO.md) · 🇱🇻 [lv](../../../lv/docs/routing/AUTO-COMBO.md) · 🇮🇳 [ml](../../../ml/docs/routing/AUTO-COMBO.md) · 🇮🇳 [mr](../../../mr/docs/routing/AUTO-COMBO.md) · 🇲🇾 [ms](../../../ms/docs/routing/AUTO-COMBO.md) · 🇲🇹 [mt](../../../mt/docs/routing/AUTO-COMBO.md) · 🇲🇲 [my](../../../my/docs/routing/AUTO-COMBO.md) · 🇳🇵 [ne](../../../ne/docs/routing/AUTO-COMBO.md) · 🇳🇱 [nl](../../../nl/docs/routing/AUTO-COMBO.md) · 🇳🇴 [no](../../../no/docs/routing/AUTO-COMBO.md) · 🇮🇳 [or](../../../or/docs/routing/AUTO-COMBO.md) · 🇮🇳 [pa](../../../pa/docs/routing/AUTO-COMBO.md) · 🇵🇭 [phi](../../../phi/docs/routing/AUTO-COMBO.md) · 🇵🇱 [pl](../../../pl/docs/routing/AUTO-COMBO.md) · 🇵🇹 [pt](../../../pt/docs/routing/AUTO-COMBO.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/routing/AUTO-COMBO.md) · 🇷🇴 [ro](../../../ro/docs/routing/AUTO-COMBO.md) · 🇷🇺 [ru](../../../ru/docs/routing/AUTO-COMBO.md) · 🇱🇰 [si](../../../si/docs/routing/AUTO-COMBO.md) · 🇸🇰 [sk](../../../sk/docs/routing/AUTO-COMBO.md) · 🇸🇮 [sl](../../../sl/docs/routing/AUTO-COMBO.md) · 🇷🇸 [sr](../../../sr/docs/routing/AUTO-COMBO.md) · 🇸🇪 [sv](../../../sv/docs/routing/AUTO-COMBO.md) · 🇰🇪 [sw](../../../sw/docs/routing/AUTO-COMBO.md) · 🇮🇳 [ta](../../../ta/docs/routing/AUTO-COMBO.md) · 🇮🇳 [te](../../../te/docs/routing/AUTO-COMBO.md) · 🇹🇭 [th](../../../th/docs/routing/AUTO-COMBO.md) · 🇹🇷 [tr](../../../tr/docs/routing/AUTO-COMBO.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/routing/AUTO-COMBO.md) · 🇵🇰 [ur](../../../ur/docs/routing/AUTO-COMBO.md) · 🇺🇿 [uz](../../../uz/docs/routing/AUTO-COMBO.md) · 🇻🇳 [vi](../../../vi/docs/routing/AUTO-COMBO.md) · 🇳🇬 [yo](../../../yo/docs/routing/AUTO-COMBO.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/routing/AUTO-COMBO.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/routing/AUTO-COMBO.md)

---

> **Käyttäjille**: Etsitkö pika-aloitusopasta? Yksinkertaisia selityksiä ja esimerkkejä on [Auto-Combo-käyttöoppaassa](../getting-started/AUTO-COMBO-GUIDE.md).

> Itsehallinnoituvat malliketjut mukautuvalla pisteytyksellä ja ilman määrityksiä toimivalla automaattisella reitityksellä

## Automaattinen reititys ilman määrityksiä (`auto/`-etuliite)

> **UUTTA:** Yhdistelmän luomista ei tarvita. Käytä `auto/`-etuliitettä suoraan missä tahansa asiakasohjelmassa.

### Pikaesimerkit

| Mallitunnus    | Muunnelma | Toiminta                                                                            |
| -------------- | --------- | ----------------------------------------------------------------------------------- |
| `auto`         | oletus    | Kaikki yhdistetyt palveluntarjoajat, LKGP-strategia, tasapainotetut painot          |
| `auto/coding`  | coding    | Laatua painottavat painot, soveltuu koodin generointiin                             |
| `auto/fast`    | fast      | Pienen viiveen painotettu valinta                                                   |
| `auto/cheap`   | cheap     | Kustannusoptimoitu reititys (pienin kustannus ensin)                                |
| `auto/offline` | offline   | Suosii palveluntarjoajia, joilla on eniten kiintiötä käytettävissä                  |
| `auto/smart`   | smart     | Laatu ensin + suurempi tutkimisaste (10 %) parempaan mallien löytämiseen            |
| `auto/lkgp`    | lkgp      | Eksplisiittinen LKGP (sama kuin oletusarvoinen `auto`)                              |
| `auto/chaos`   | chaos     | Rinnakkainen hajautus, yksi malli palveluntarjoajaa kohti (ei vikojen injektointia) |

### Kategorian × tason koostaminen (`auto/<category>:<tier>`)

OpenRouter-tyyliset jälkiliitteet erottavat toisistaan **reitityksen tyypin** (kategoria) ja **sen optimointitavan** (taso), joten niitä voi yhdistellä vapaasti (#4235 Phase B, `open-sse/services/autoCombo/suffixComposition.ts`):

- **Kategoriat** (suodattavat ehdokasjoukon ominaisuuksien mukaan): `coding` · `reasoning` · `vision` · `chat` · `multimodal`. `vision`/`multimodal` säilyttävät konenäköä tukevat mallit; `reasoning` säilyttää päättely-/ajattelumallit.
- **Tasot** (valitsevat pisteytyspainot / joukkosuodattimen): `fast` (nopea toimitus) · `cheap` (alias `floor`, kustannussäästö) · `reliable` (katkaisijan kunto + viiveen vakaus) · `free` / `pro` (suodattavat joukon mallitason mukaan käyttämällä `classifyTier`-toimintoa — ilmainen taso vs. premium-taso).

| Esimerkki              | Ratkaistaan muotoon                                           |
| ---------------------- | ------------------------------------------------------------- |
| `auto/coding:fast`     | koodausjoukko, pienen viiveen painot                          |
| `auto/coding:cheap`    | koodausjoukko, kustannusoptimoitu (alias `auto/coding:floor`) |
| `auto/reasoning:pro`   | vain päättely-/ajattelumallit, premium-taso                   |
| `auto/vision`          | konenäköä tukevat mallit (ei tasoa → tasapainotetut painot)   |
| `auto/multimodal:free` | multimodaalisuutta tukevat mallit, vain ilmainen taso         |

Kaikki kelvolliset `auto/<category>[:<tier>]`-muodot ratkaistaan tarvittaessa; kuratoitu osajoukko ilmoitetaan `/v1/models`-rajapinnassa ja hallintapaneelissa (`AUTO_SUFFIX_VARIANTS` tiedostossa `open-sse/services/autoCombo/builtinCatalog.ts`). Suodatus on **fail-open** — jos mikään yhdistetty malli ei täytä rajoitetta, käytetään koko joukkoa, jotta reititys ei koskaan rikkoudu. Pisteytyksen ydin (`combo.ts`) pysyy muuttumattomana; kategoria-/tasosuodatinta käytetään funktiossa `buildAutoCandidates`.

> **Ajantasainen mallitieto:** automaattisen reitityksen soveltuvuuteen vaikuttavat reaaliaikaiset **Arena ELO** -sijoitukset sekä **models.dev**-tasotiedot, kun `ARENA_ELO_SYNC_ENABLED`-valitsin on käytössä (muussa tapauksessa käytetään staattista soveltuvuuskarttaa).

**Käyttöohje:**

```bash
# Mikä tahansa IDE- tai CLI-työkalu, joka tukee OpenAI-muotoa
Perus-URL: http://localhost:20128/v1
API-avain: <päätepisteavaimesi>

# Aseta malliksi koodissa tai määrityksissä:
model: "auto"                 # tasapainotettu oletus
model: "auto/coding"          # paras koodaustehtäviin
model: "auto/fast"            # nopein saatavilla oleva
model: "auto/cheap"           # edullisin tunnistetta kohti
```

**Mitä tapahtuu:**

1. OmniRoute tunnistaa `auto/`-etuliitteen tiedostossa `src/sse/handlers/chat.ts`
2. Hakee kaikki **aktiiviset palveluntarjoajayhteydet** tietokannasta
3. Suodattaa mukaan yhteydet, joilla on kelvolliset tunnistetiedot (API-avain tai OAuth-tunnus)
4. Määrittää mallin yhteyskohtaisesti (`connection.defaultModel` tai palveluntarjoajan ensimmäinen malli)
5. Rakentaa **virtuaalisen yhdistelmän** muistiin (sitä ei tallenneta tietokantaan)
6. Reitittää valitun muunnelman painotusprofiilin ja LKGP-strategian avulla

**Keskeiset ominaisuudet:**

- ✅ **Aina käytössä:** Ei valitsinta, ei yhdistelmän luomista eikä määrityksiä
- ✅ **Dynaaminen:** Vastaa automaattisesti sillä hetkellä yhdistettyjä palveluntarjoajia
- ✅ **Istunnon pysyvyys:** LKGP varmistaa, että viimeksi onnistunut palveluntarjoaja asetetaan etusijalle
- ✅ **Tukee useita tilejä:** Jokaisesta palveluntarjoajayhteydestä tulee erillinen ehdokas
- ✅ **Ei tietokantakirjoituksia:** Virtuaalinen yhdistelmä on olemassa vain pyynnön ajan, joten pysyvyydestä ei aiheudu lainkaan lisäkustannuksia

### Avainkohtainen ehdokkaiden hallinta (#7819, tasot 1+2)

`GET /v1/auto-combo/{channel}/candidates` (`{channel}` = jälkiliite kohdan `auto/` jälkeen tai
literaali `auto` peruskanavalle) on **vain luku** -päätepiste, joka luettelee
`auto/*`-kanavan nykyisen ehdokasjoukon täydennettynä ajantasaisilla saavutettavuustiedoilla ja käyttää
uudelleen nykyisiä vikasietoisuuden lukutoimintoja (ei koskaan katkaisijan raakaa `state`-arvoa):

- palveluntarjoajan katkaisija — `getCircuitBreaker(provider).getStatus()` / `.canExecute()`
- yhteyden jäähdytysaika — `rateLimitedUntil` / `testStatus` ratkaistulla
  `provider_connections`-rivillä
- mallin lukitus — `isModelLocked(provider, connectionId, model)`

Jokainen ehdokas sisältää myös tämän API-avaimen `excluded`-merkinnän. Poissulkemiset tallennetaan
API-avainkohtaisesti (`auto_candidate_overrides`-taulu, migraatio `128`) — OmniRoute on
yhden vuokraajan järjestelmä ilman `users`-taulua, joten `apiKeyId` on lähin todellinen kutsujakohtainen
identiteetti — ja ne pannaan täytäntöön ehdokasjoukon keskistetyssä suodatuspisteessä tiedostossa
`open-sse/services/autoCombo/virtualFactory.ts` käyttämällä puhdasta, yksikkötestattua
`filterExcludedCandidates()`-funktiota (`open-sse/services/autoCombo/candidateOverrides.ts`).
Suodatin on **fail-open**: puuttuva apiKeyId/kanava tai tietokantahaun epäonnistuminen jättävät molemmat
joukon suodattamatta, joten operaattori, jolle ei ole määritetty ohituksia, saa reitityksen
tavutasolla täysin samanlaisena kuin ennen tätä ominaisuutta.

**Siirretty jatkotoimenpiteenä käsiteltävään issueen:** ehdokaskohtaiset painotukset + eksplisiittinen järjestys (taso 3
— hyödyntää olemassa olevia painotetun/priorisoidun strategian polkuja) sekä tietyn
`combo.ts`-strategian kiinnittäminen kuhunkin `auto/*`-kanavaan (taso 4). Katso #7819-suunnitelmasta avoin
kysymys siitä, pitäisikö ohitusten säilyä API-avainkohtaisina vai muuttua globaaleiksi
yhden vuokraajan mallin vuoksi.

**Kulissien takana:**

```txt
Pyyntö: { model: "auto/coding" }
   ↓
src/sse/handlers/chat.ts tunnistaa etuliitteen
   ↓
createVirtualAutoCombo('coding') → candidatePool aktiivisista yhteyksistä
   ↓
handleComboChat (sama moottori kuin tallennetuissa yhdistelmissä)
   ↓
Automaattinen pisteytys valitsee parhaan palveluntarjoajan/mallin kullekin pyynnölle
```

**Toteutustiedostot:**

| Tiedosto                                                  | Tarkoitus                                          |
| --------------------------------------------------------- | -------------------------------------------------- |
| `open-sse/services/autoCombo/autoPrefix.ts`               | Etuliitteen jäsennin (`parseAutoPrefix`)           |
| `open-sse/services/autoCombo/virtualFactory.ts`           | Luo virtuaalisia `AutoComboConfig`-olioita         |
| `open-sse/services/autoCombo/providerRegistryAccessor.ts` | Testikoukku palveluntarjoajarekisterin mockaukseen |
| `src/sse/handlers/chat.ts`                                | Integraatio: auto-etuliitteen oikopolku            |
| `src/shared/constants/providers.ts`                       | Järjestelmämerkintä `SYSTEM_PROVIDERS.auto`        |

## Yhdistelmien nimet, jotka vastaavat todellista mallitunnusta

Yhdistelmä, jonka `name` on sama kuin pelkkä mallitunnus (esim. yhdistelmä nimeltä
`gpt-5.5`), on **tarkoituksellinen ja tuettu käyttötapa**, ei virhe: se on
mekanismi mallitunnuskohtaiseen palveluntarjoajan varajärjestelyyn, joka on dokumentoitu
kohdassa [#6940](https://github.com/diegosouzapw/OmniRoute/issues/6940). Koska yhdistelmän
ratkaisu tarkistetaan ennen pelkän mallitunnuksen ratkaisua
(`getComboForModel()` tiedostossa `src/sse/services/model.ts`), pelkkää tunnusta
`gpt-5.5` käyttävä pyyntö reititetään yhdistelmän kohteiden (esim.
`acme-responses/gpt-5.5`, `backup-responses/gpt-5.5`) kautta eikä suoraan
yhdelle palveluntarjoajalle — tämä hyödyntää uudelleen yhdistelmän uudelleenkirjoitusta edeltävää ensisijaisuutta, joka toteutettiin
kohteita [#3227/#3233](https://github.com/diegosouzapw/OmniRoute/issues/3227) varten ja jolle on
regressiotestit tiedostoissa `tests/unit/responses-combo-resolution-3227.test.ts` ja
`tests/unit/combo-name-codex-responses-rewrite.test.ts`.

Todellisen mallitunnuksen peittävällä nimellä varustetun yhdistelmän luomista tai uudelleennimeämistä
**ei koskaan hylätä** — se rikkoisi tämän dokumentoidun työnkulun. Sen sijaan
(#8530) `POST /api/combos` ja `PUT /api/combos/[id]` liittävät vastaukseen estämättömän
`warning`-kentän, kun (uusi) nimi on ristiriidassa todellisen
mallitunnuksen kanssa:

```json
{
  "warning": {
    "code": "COMBO_NAME_SHADOWS_MODEL",
    "modelId": "gpt-5.5",
    "providerId": "openai"
  }
}
```

Käynnistyksen yhteydessä `scanComboModelNameCollisionsAtBoot()`
(`src/instrumentation-node.ts`) kirjaa myös yksirivisen `[STARTUP]`-varoituksen,
jossa luetellaan kaikki olemassa olevat mallitunnuksen peittävät yhdistelmät, jotta operaattorit,
jotka päätyvät tähän vahingossa (eivätkä tarkoituksella kohdan #6940 mukaisesti), saavat siitä ilmoituksen.
Tunnistuksen apufunktio sijaitsee tiedostossa `src/lib/combos/modelNameCollision.ts`.

## Mukautetun yhdistelmän kutsuminen asiakasohjelmasta

Tallennettuja yhdistelmiä (Asetukset → Yhdistelmät) käytetään vain, kun asiakasohjelma lähettää yhdistelmän **täsmällisen nimen** `model`-kentässä — yhdistelmän nimeen ei sovelleta sumeaa tai osittaista vastaavuutta eikä käytetä `auto/`-etuliitettä. Ratkaisujärjestys (`getComboForModel()` tiedostossa `src/sse/services/model.ts`):

1. täsmällinen vastaavuus yhdistelmän nimeen (`model: "my-combo"`),
2. `combo/<name>`-etuliite (`model: "combo/my-combo"`),
3. model→combo-glob-määritykset (`/api/model-combo-mappings`).

```bash
curl -X POST http://localhost:20128/v1/chat/completions \
  -H "Authorization: Bearer <key>" \
  -H "Content-Type: application/json" \
  -d '{"model":"my-combo","messages":[{"role":"user","content":"Hello"}]}'
```

Kaksi yleistä sudenkuoppaa:

- **`auto` ei käytä yhdistelmiäsi.** `auto`/`auto/*` muodostaa oman ilman määrityksiä toimivan ehdokasjoukkonsa ja käyttää tallennettuja yhdistelmiä vain, jos jonkin yhdistelmän nimi on kirjaimellisesti `auto` (ei suositella). Reititä yhdistelmän kautta lähettämällä sen täsmällinen nimi — älä `auto`.
- **`openrouter/auto` on todellinen maksullinen OpenRouter-tuote** ("Auto Best Available"), ei OmniRoute-alias. Se on OpenRouter-rekisterin ainoa staattinen mallimerkintä (`open-sse/config/providers/registry/openrouter/index.ts`), ja siitä laskutetaan erikseen. Sulje se pois `auto`-joukoista valitsemalla Asetukset → Reititys → Piilota maksulliset mallit.

Alkuperäinen tässä dokumentoitu epäselvyys on kuvattu kohdissa [#7992](https://github.com/diegosouzapw/OmniRoute/issues/7992) ja [#7111](https://github.com/diegosouzapw/OmniRoute/issues/7111).

## Toimintaperiaate (pysyvät automaattiset yhdistelmät)

Auto-Combo-moottori valitsee dynaamisesti kullekin pyynnölle parhaan palveluntarjoajan/mallin käyttämällä **16 tekijän pisteytysfunktiota** (määritelty tiedostossa `open-sse/services/autoCombo/scoring.ts` → `DEFAULT_WEIGHTS`). Oletuspainojen summa on `1.0`; mukautetut painot normalisoidaan uudelleen funktiolla `normalizeScoringWeights()`. Kahdella kuudestatoista tekijästä — `cacheAffinity` ja `resetWindowAffinity` — on oletuspaino `0`; tekijän `reliability` paino on `0` kohdassa `DEFAULT_WEIGHTS`, mutta `0.03` yleisissä paketeissa ja `0.04` paketissa `reliability-first`, ja tekijän `quality` paino on paketeissa `0.02` (`0.03` paketissa `quality-first`): ne lasketaan silti jokaiselle ehdokkaalle, ja `cacheAffinity` ohjaa kehotteen välimuistin duplikaattien poistoa pisteytyksen ulkopuolella, joten oletusarvoisesti nollapainoiset tekijät eivät yksinkertaisesti vaikuta valintaan, mutta paketeissa ne vaikuttavat.

![Auto-Combon 16 tekijän pisteytys](../diagrams/exported/auto-combo-scoring.svg)

> Lähde: [diagrams/auto-combo-scoring.mmd](../diagrams/auto-combo-scoring.mmd) (luo uudelleen komennolla `npm run docs:render-diagrams`). Tiedostonimi on historiallinen; lähde ja renderöity kaavio näyttävät kaikki 16 kohdassa `DEFAULT_WEIGHTS` määriteltyä tekijää.

| Tekijä                | Oletuspaino | Kuvaus                                                                                                                                                                                                                                                     |
| :-------------------- | :---------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `quota`               | 0.1429      | Jäljellä oleva kiintiö / nopeusrajoituksen liikkumavara [0..1]                                                                                                                                                                                             |
| `health`              | 0.1605      | Katkaisijasta saatava kuntopistemäärä (CLOSED=1.0, HALF_OPEN=0.5, OPEN=0.0)                                                                                                                                                                                |
| `costInv`             | 0.1429      | **Yhdistetyn** kustannuksen käänteisarvo (60 % syötetunnisteen hinnasta + 40 % tulostunnisteen hinnasta, normalisoituna) — halvempi = korkeampi pistemäärä                                                                                                 |
| `latencyInv`          | 0.1143      | Pooliin normalisoidun p95-viiveen käänteisarvo — nopeampi = korkeampi pistemäärä                                                                                                                                                                           |
| `taskFit`             | 0.0762      | Soveltuvuus tehtävätyyppiin (ohjelmointi, katselmointi, suunnittelu, analyysi, virheenkorjaus, dokumentaatio)                                                                                                                                              |
| `stability`           | 0.0476      | Viiveen keskihajontaan perustuva vakaus — ehdokas saa alemman pistemäärän, jos sen vasteaika vaihtelee                                                                                                                                                     |
| `tierPriority`        | 0.0476      | Käyttäjätilitason prioriteetti — Ultra=1.0, Pro=0.67, Standard=0.33, Free=0.0                                                                                                                                                                              |
| `tierAffinity`        | 0.0476      | Ehdokkaan tason ja manifestin suositteleman tason välinen vastaavuus                                                                                                                                                                                       |
| `specificityMatch`    | 0.0476      | Pyynnön tarkkuuden (manifestin vihje) ja mallitason välinen vastaavuus                                                                                                                                                                                     |
| `contextAffinity`     | 0.0476      | Pyynnön konteksti-ikkunatarpeen ja mallin konteksti-ikkunan välinen vastaavuus                                                                                                                                                                             |
| `sessionAvailability` | 0.0476      | Ehdokasyhteyden OAuth-istunnon saatavuus tässä istunnossa (`getOAuthSessionAvailability()`; muut kuin OAuth-yhteydet saavat pistemäärän 1.0)                                                                                                               |
| `connectionDensity`   | 0.0476      | Jakaa kuormituksen saman palveluntarjoajan yhteyksien kesken (keskittymisen ehkäisy)                                                                                                                                                                       |
| `cacheAffinity`       | 0.00        | Rendezvous-hajautukseen perustuva suuntautuminen yhteyteen, jolla todennäköisimmin on jo tämän pyynnön kehotteen välimuistietuliite (`open-sse/services/combo/promptCacheAffinity.ts`); oletusarvoisesti pois käytöstä (#8008)                             |
| `resetWindowAffinity` | 0.00        | Painotus yhteyksiin, joiden kiintiön nollausikkuna on suotuisa (oletusarvoisesti pois käytöstä)                                                                                                                                                            |
| `quality`             | 0.03        | Reititystapahtumien laadunseurannan palautepohjainen tulosteen laatusignaali; ehdokkaat, joista ei ole havaintoja, saavat neutraalin arvon 0.5                                                                                                             |
| `reliability`         | 0.00        | Havaittu onnistumisosuus, `1 - failureRate`, viimeisen 24 tunnin käyttöhistoriasta vähintään kymmenen näytteen kynnyksellä (muutoin reaaliaikaiset mittarit); ehdokkaiden, joista ei ole havaintoja, arvoksi tulkitaan 1.0. Oletusarvoisesti pois käytöstä |

**Summa:** `0.1429 + 0.1605 + 0.1429 + 0.1143 + 0.0762 + (7 × 0.0476) + 0.00 + 0.00 + 0.03 + 0.00 = 1.0`, kuten kohdassa `DEFAULT_WEIGHTS` on määritelty; käyttäjän määrittämät painot normalisoidaan uudelleen jakaumaksi funktiolla `normalizeScoringWeights()` ennen pisteytystä.

## Tilapaketit

6 ennalta määritettyä painoprofiilia tiedostossa `open-sse/services/autoCombo/modePacks.ts`. Kukin paketti korvaa oletuspainot kokonaan painottaakseen valintaa yhden tavoitteen suuntaan. Jokaisen paketin summa on jo `1.0` (neljän desimaalin tarkkuudella tulostettuna `0.9999`), joten `normalizeScoringWeights()`-funktiolla ei ole mitään merkityksellistä korjattavaa paketin ollessa aktiivinen — alla olevat arvot ovat pyöristykset huomioiden ne, joita pisteytys käyttää.

| Tekijä                | ship-fast  | cost-saver | quality-first | offline-friendly | reliability-first | chaos-mode |
| :-------------------- | :--------- | :--------- | :------------ | :--------------- | :---------------- | :--------- |
| `quota`               | 0.1133     | 0.1133     | 0.0752        | **0.3324**       | 0.1133            | 0.0376     |
| `health`              | 0.2667     | 0.1810     | 0.1714        | 0.2667           | **0.3524**        | **0.4000** |
| `costInv`             | 0.0276     | **0.3324** | 0.0276        | 0.0752           | 0.0181            | 0.0140     |
| `latencyInv`          | **0.3048** | 0.0476     | 0.0476        | 0.0476           | 0.0476            | 0.0186     |
| `taskFit`             | 0.0952     | 0.0952     | **0.3524**    | 0.0000           | 0.0952            | 0.1905     |
| `stability`           | 0.0000     | 0.0476     | 0.1429        | 0.0952           | 0.1905            | 0.1714     |
| `tierPriority`        | 0.0376     | 0.0376     | 0.0276        | 0.0376           | 0.0276            | 0.0040     |
| `tierAffinity`        | 0.0000     | 0.0000     | 0.0000        | 0.0000           | 0.0000            | 0.0000     |
| `specificityMatch`    | 0.0000     | 0.0000     | 0.0000        | 0.0000           | 0.0000            | 0.0000     |
| `contextAffinity`     | 0.0095     | 0.0000     | 0.0000        | 0.0000           | 0.0000            | 0.0186     |
| `sessionAvailability` | 0.0476     | 0.0476     | 0.0476        | 0.0476           | 0.0476            | 0.0476     |
| `resetWindowAffinity` | 0.0000     | 0.0000     | 0.0000        | 0.0000           | 0.0000            | 0.0000     |
| `connectionDensity`   | 0.0476     | 0.0476     | 0.0476        | 0.0476           | 0.0476            | 0.0476     |
| `quality`             | 0.02       | 0.02       | **0.03**      | 0.02             | 0.02              | 0.02       |
| `reliability`         | 0.03       | 0.03       | 0.03          | 0.03             | **0.04**          | 0.03       |

Huomautukset:

- **Paketit sisältävät `quality`- ja `reliability`-painot** (`quality 0.02`, `quality-first 0.03`; `reliability 0.03`, `reliability-first 0.04`) ja korvaavat painokartan kokonaisuudessaan (`weights = pack`, kyseessä ei ole yhdistäminen). `DEFAULT_WEIGHTS` sisältää arvot `quality 0.03 / reliability 0`; vaihtoehdon `balanced`/`default` valitseminen säilyttää nämä oletukset, kun taas paketin valitseminen käyttää yllä esitettyjä paketin arvoja. Kylmässä poolissa (havaintoja ei vielä ole, joten `quality 0.5` ja `reliability 1`) nämä kaksi tekijää lisäävät yleisellä paketilla arvon `+0.04` (`0.03 + 0.01`), paketilla `quality-first` arvon `+0.045` ja paketilla `reliability-first` arvon `+0.05`.
- `tierAffinity`, `specificityMatch` ja `resetWindowAffinity` ovat nimenomaisesti `0` jokaisessa paketissa.
- Kunkin paketin painotus lyhyesti:
  - **ship-fast** → latencyInv 0.3048 + health 0.2667 (pienen viiveen terveet yhteydet)
  - **cost-saver** → costInv 0.3324 (halvimmat tokenit voittavat)
  - **quality-first** → taskFit 0.3524 + stability 0.1429 + quality 0.03, kaikista paketeista suurin (tehtävään parhaiten sopiva, johdonmukainen malli)
  - **offline-friendly** → quota 0.3324 + health 0.2667 (mahdollisimman paljon liikkumavaraa nopeudesta tai kustannuksista riippumatta)
  - **reliability-first** → health 0.3524 + stability 0.1905 + reliability 0.04, kaikista paketeista suurin (vähiten yllätyksiä)
  - **chaos-mode** → health 0.4000 + taskFit 0.1905 (painopaketti, jonka `auto/chaos` määrittää paneelinsa jäsenille; rinnakkainen hajautus ei lue näitä painoja, eikä tämä ole vikojen injektointiprofiili, katso [CHAOS-MODE.md](../guides/CHAOS-MODE.md#autochaos-parallel-fan-out))

### Pyyntökohtaiset hallinta-asetukset (otsakkeet) — #6023 / #6024 / #6025 / #3470

`auto`-yhdistelmää voidaan ohjata **pyyntökohtaisesti** kolmella otsakkeella muuttamatta
yhdistelmän tallennettua määritystä. Nämä koskevat vain `auto`-strategiaa ja vain sitä pyyntöä,
joka sisältää ne; yhdistelmän tallennettuja arvoja `modePack`/`budgetCap`/`budgetFallback` käytetään,
kun otsake puuttuu.

| Otsake                        | Hyväksyy                                                                                                                                                                                               | Vaikutus                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| :---------------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `X-OmniRoute-Mode`            | esiasetusaliaksen (`fast`, `balanced`, `quality`, `cheap`, `reliable`, `offline`) tai paketin raakaversion nimen (`ship-fast`, `cost-saver`, `quality-first`, `offline-friendly`, `reliability-first`) | Ohittaa tämän pyynnön pisteytyspainot. `balanced`/`default` pakottavat oletuspainot (ei pakettia). Tuntemattomat arvot ohitetaan (määritykset säilytetään).                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| `X-OmniRoute-Budget`          | positiivisen luvun (USD:n enimmäismäärä pyyntöä kohden)                                                                                                                                                | Tiukka kustannusraja: ehdokkaat, joiden arvioitu kustannus ylittää sen, suodatetaan pois ennen valintaa. Alla oleva `X-OmniRoute-Budget-Fallback` määrittää, mitä tapahtuu, kun **jokainen** ehdokas ylittää rajan.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| `X-OmniRoute-Budget-Fallback` | `cheapest` (oletus, aliakset: `cheapest-viable`, `soft`) tai `strict` (aliakset: `block`, `hard`)                                                                                                      | `cheapest`: valitsee varavaihtoehtona kaikista halvimman ehdokkaan, vaikka se edelleen ylittäisi rajan (aiempi toimintatapa). `strict`: kieltäytyy tekemästä valintaa — pyyntö epäonnistuu välittömästi virheellä `HTTP 402` sen sijaan, että budjetti ylitettäisiin huomaamatta. Tuntemattomat arvot ohitetaan.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| `X-OmniRoute-Effort`          | `auto` (muut arvot varattu)                                                                                                                                                                            | Mukautuva päättelybudjetti: kun pyyntö ei sisällä **minkäänmuotoista** päättelykenttää (`reasoning_effort`, `reasoning`, `thinking`), yhdyskäytävä määrittää `auto`-arvoksi `low`/`medium`/`high` determinististen, pyynnön rakenteeseen perustuvien signaalien perusteella (viimeisen käyttäjäviestin pituus, kontekstin koko viimeiseen käyttäjäviestiin asti, aiemmat työkalutulokset, työkalusilmukan syvyys). Signaalit on rajattu nykyiseen vuoroon — kaikki viimeisen käyttäjäviestin jälkeinen ohitetaan — joten jokainen työkalusilmukan pyyntö määrittyy samalle tasolle (tilaton vuorokohtainen kiinnitys, ei istuntotilaa eikä kesken silmukan tapahtuvaa korotusta, joka rikkoisi ylätason kehotevälimuistin etuliitteet). Asiakkaan eksplisiittinen päättelykenttä on aina etusijalla. Koskee pyyntöjä, joiden ylätason reititys määrittyy OpenAI Chat Completions -muotoon (`targetFormat === FORMATS.OPENAI`) — `reasoning_effort` on OpenAI-muotoinen kenttä, joten otsakkeella ei ole vaikutusta Claude- tai Gemini-kohteiseen pyyntöön (katso `open-sse/handlers/chatCore/adaptiveEffortWiring.ts`). |

```bash
# Pakota nopein profiili, rajaa tämän pyynnön hinnaksi enintään $0.05 ja estä pyyntö ylikulutuksen sijaan
curl -sS http://localhost:20128/v1/chat/completions \
  -H "Content-Type: application/json" \
  -H "X-OmniRoute-Mode: fast" \
  -H "X-OmniRoute-Budget: 0.05" \
  -H "X-OmniRoute-Budget-Fallback: strict" \
  -d '{"model":"auto","messages":[{"role":"user","content":"hi"}]}'
```

Määritys on puhdas funktio (`open-sse/services/autoCombo/requestControls.ts`); määritetyt
arvot syötetään moottorin olemassa oleviin `config.modePack` / `config.budgetCap` /
`config.budgetFallback` -syötteisiin. Yhdistelmän tallennettu `config.budgetFallback` ("strict" |
"cheapest") määrittää pysyvän käytännön; otsake ohittaa sen yksittäisen pyynnön ajaksi.

## Kaikki reititysstrategiat

OmniRouten yhdistelmämoottori tukee **20 reititysstrategiaa** (määritelty tiedostossa `src/shared/constants/routingStrategies.ts` → `ROUTING_STRATEGY_VALUES`). Auto Combo -moottori on käytettävissä `auto`-strategialla; muut strategiat ovat käytettävissä tallennetuille yhdistelmille.

| Strategia           | Kuvaus                                                                                                                                                                                                                                          |
| :------------------ | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `priority`          | Ensimmäisen kohteen järjestetty luettelo eksplisiittisellä prioriteetilla                                                                                                                                                                       |
| `weighted`          | Painotettu satunnaisvalinta kohdekohtaisen painon perusteella                                                                                                                                                                                   |
| `round-robin`       | Kohteiden kiertäminen järjestyksessä (eräajona; katso alta)                                                                                                                                                                                     |
| `context-relay`     | Kontekstin välittäminen kohteiden välillä (pitkät keskustelut)                                                                                                                                                                                  |
| `fill-first`        | Kunkin kohteen kiintiön täyttäminen ennen seuraavaan siirtymistä                                                                                                                                                                                |
| `p2c`               | Satunnainen kuormantasaus kahden vaihtoehdon menetelmällä                                                                                                                                                                                       |
| `random`            | Tasajakaumaan perustuva satunnaisvalinta                                                                                                                                                                                                        |
| `least-used`        | Valitse kohde, jolla on tällä hetkellä pienin kuormitus                                                                                                                                                                                         |
| `cost-optimized`    | Minimoi pyynnön hinta ($) luettelohinnoittelun perusteella                                                                                                                                                                                      |
| `reset-aware` ⭐    | Priorisoi kiintiön nollausajan mukaan — lyhyemmät nollausjaksot sijoitetaan korkeammalle                                                                                                                                                        |
| `reset-window`      | Suosi kohteita, joiden kiintiöjakso nollautuu pian                                                                                                                                                                                              |
| `headroom`          | Valitse kohde, jolla on eniten jäljellä olevaa kiintiövaraa                                                                                                                                                                                     |
| `quota-weighted`    | Ohita loppuun käytetyt tilit ja valitse sitten muiden joukosta suhteessa jäljellä olevaan kiintiöön jaettuna käynnissä olevalla kuormalla; olemassa olevat keskustelut pysyvät kiinnitettyinä                                                   |
| `strict-random`     | Satunnainen valinta ilman toistojen poistamista                                                                                                                                                                                                 |
| `auto`              | Käytä Auto Combon pisteytystä (16 tekijää) — **suositeltu**                                                                                                                                                                                     |
| `lkgp`              | Viimeisin toimivaksi tiedetty polku (kiinnittyy viimeksi onnistuneeseen palveluntarjoajaan ja käyttää sitten sääntöjä varavaihtoehtona)                                                                                                         |
| `context-optimized` | Valitse nykyiseen kontekstikokoon parhaiten sopiva kohde                                                                                                                                                                                        |
| `cache-optimized`   | Järjestä kohteet uudelleen kehotteen välimuistiyhteensopivuuden perusteella — ensin kokeillaan yhteyttä, jolla tämän pyynnön välimuistiin tallennettu etuliite todennäköisimmin jo on (`open-sse/services/combo/promptCacheAffinity.ts`, #8008) |
| `fusion` 🧬         | Lähetä pyyntö rinnakkain mallipaneelille ja syntetisoi sitten yksi vastaus arviointimallin avulla (katso alta)                                                                                                                                  |
| `pipeline`          | Suorita kohteet peräkkäin välittäen kunkin vaiheen tulos seuraavan vaiheen syötteeksi; vain lopullinen vastaus palautetaan (#6396)                                                                                                              |

⭐ = Uusi versiossa v3.8.0 · 🧬 = Uusi versiossa v3.8.36

### `weighted`-strategian semantiikka

`weighted` tekee **suhteellisen satunnaisotannan pyyntökohtaisesti**
(`open-sse/services/combo/targetSorters.ts` → `selectWeightedTarget`), eikä tasaa jakaumaa:

- Jokainen pyyntö arpoo **yhden** vaiheen todennäköisyydellä `weight / totalWeight`; jäljelle jäävät vaiheet
  järjestetään painon mukaan laskevaan järjestykseen kyseisen pyynnön varaketjuksi.
- Vaihetta, jonka paino on `0` (tai puuttuu), **ei koskaan arvota**, jos jonkin muun vaiheen
  paino on > 0 — sitä voidaan käyttää vain varavaihtoehtona arvotun vaiheen epäonnistuttua. Valinta muuttuu tasajakaumaiseksi vain, kun **kaikki**
  painot ovat 0.
- Vaiheet, joiden kaikki kohteet eivät ole käytettävissä — palveluntarjoajan katkaisija on `OPEN`, yhteys on
  jäähdytysajalla tai malli on lukittu pois käytöstä — poistetaan arvonnasta ennen sen suorittamista
  (`open-sse/services/combo/targetResolution.ts`), joten yksi toimintakuntoinen vaihe voi väliaikaisesti
  voittaa jokaisen pyynnön.
- `stickyWeightedLimit` (yhdistelmän määritys, oletusarvo `1` = pois käytöstä) kiinnittää arvotun vaiheen näin monen
  peräkkäisen onnistumisen ajaksi ennen uutta arvontaa.

Käytä tiukkaan kiertoon `round-robin`-strategiaa; yhtäläiset painot `weighted`-strategiassa tuottavat tilastollisen — eivät
tiukan — tasapainon.

### Agenttinen liukuhihnatila

Vähintään kaksi mallia sisältävä `pipeline`-yhdistelmä voi ottaa käyttöön suunnittelijan ja suorittajan välisen reitityksen asetuksella
`config.agenticOrchestration.enabled`. Ensimmäinen kohde vastaa suunnittelusta ja lopullisista vastauksista;
toinen kohde tuottaa asiakasohjelman natiiveja työkalukutsuja. OmniRoute tunnistaa työkalutulosten
jatkopyynnöt pyyntöprotokollasta, kysyy suunnittelijalta, tarvitaanko uusi työkalukierros,
ja valitsee dynaamisesti joko suorittajan tai suunnittelijan viimeiseksi asiakkaalle näkyväksi
vaiheeksi.

Toisen kohteen jälkeen määritetyt lisämallit ovat järjestyksessä käytettäviä suorittajan varamalleja. Epäonnistunut
HTTP-vastaus tai siirtopoikkeus siirtää käsittelyn seuraavalle suorittajalle säilyttäen
saman suunnittelijan päätöksen ja natiivit työkalut mutta käyttäen kyseisen suorittajan omaa vaihekohtaista kehotetta ja
ratkaistua yhteyttä. Ensimmäinen onnistunut vastaus palautetaan muuttamattomana, mukaan lukien
SSE-suoratoisto; onnistuneen suoratoiston alkamisen jälkeisiä virheitä ei voida tässä yrittää uudelleen.
Jos kaikki suorittajat epäonnistuvat, viimeinen virhe palautetaan. Asiakkaan keskeytykset lopettavat välityksen.

```json
{
  "strategy": "pipeline",
  "models": [{ "model": "provider/planner" }, { "model": "provider/executor" }],
  "config": {
    "agenticOrchestration": { "enabled": true, "maxToolRounds": 8 }
  }
}
```

Suorittaja voi tuottaa yhdessä vastauksessa useita toisistaan riippumattomia kutsuja. Riippuvaiset kutsut
käsitellään asiakkaan myöhemmillä työkalutuloskierroksilla, ja suunnittelija tarkistaa jokaisen tuloksen.
`maxToolRounds`-asetuksen oletusarvo on `8`, ja se hyväksyy arvot `1`–`32`; kun raja saavutetaan, suunnittelijan on
tuotettava paras saatavilla oleva lopullinen vastaus. Suunnittelijan sisäiset päätökset puskuroidaan, kun taas
valittu asiakkaalle näkyvä vastaus säilyttää alkuperäisen suoratoistoasetuksen.

### `round-robin`-strategian pysyvä erä ja tilikohtainen laajennus

Round-robin toimii erissä, ei yksi pyyntö vaihetta kohden:

- `stickyRoundRobinLimit` (ensin yhdistelmän määritys, sitten `comboStickyRoundRobinLimit`, sitten
  `settings.stickyRoundRobinLimit`, oletus **3**) säilyttää saman kohteen näin monen
  peräkkäisen onnistumisen ajan ennen kiertoa. Aseta yhdistelmäkohtaiseksi arvoksi `1`, jos haluat kierron
  jokaisen pyynnön jälkeen. Yhdistelmäeditori näyttää käytössä olevan arvon ja sen määrityskerroksen.
- `connectionAwareExpansion` (ensin yhdistelmän määritys, sitten asetukset, oletus **false**) laajentaa
  jokaisen palveluntarjoajatason vaiheen tilikohtaisiksi kohteiksi ennen kiertoa. Ryhmän B strategiat
  (priority, weighted, round-robin, random, p2c, least-used, cost-optimized, lkgp,
  fill-first, strict-random, context-optimized, cache-optimized, context-relay, fusion,
  pipeline) säilyttävät palveluntarjoajatason näkymän, kunnes tämä otetaan käyttöön. Yhdistelmäeditorissa voi valita
  periytymisen / käytössä / pois käytöstä; periytyminen käyttää yleistä oletusarvoa (pois käytöstä).
- Kehotevälimuistin paikallisuuteen perustuva reititys (`promptCacheAffinityEnabled`, oletus **true**) järjestää
  kiinnitetyt yhteydet uudelleen, jotta vastaavat välimuistiavaimet pysyvät samalla tilillä. Se ohittaa
  round-robin- ja weighted-kierron kiinnitetyissä tilikohtaisissa vaiheissa. Poista se käytöstä kohdassa
  Settings → Combo defaults, jos tarvitset tiukkaa kiertoa. Yhdistelmäkohtaista ohitusta ei ole.

Kun haluat käyttää usean tilin kiertoa yhdellä mallilla, suosi **yhtä dynaamisen tilin vaihetta** (tyhjä
`connectionId`, koko varanto), jonka pysyvyysraja on `1`, kolmen kiinnitetyn `connectionId`-arvon sijaan.
Kiinnitetyt vaiheet yhdessä affiniteetin kanssa kohdistuvat samalle tilille, vaikka RR-laskuri
etenee.

## Fuusiostrategia

`fusion` on ainoa strategia, joka **ei** valitse yhtä kohdetta. Se lähettää kehotteen
**jokaiselle paneelimallille rinnakkain**, minkä jälkeen määritettävissä oleva **tuomarimalli** koostaa
kaikista paneelin vastauksista yhden lopullisen vastauksen. Siirretty upstream-projektista `decolua/9router`
(OpenRouterin Fusion-toteutus); toteutus tiedostossa `open-sse/services/fusion.ts`.

Toimintaperiaate:

0. **Työkaluja sisältävien pyyntöjen ohitus** — pyyntö, joka sisältää ei-tyhjän `tools`-taulukon ja
   jossa `tool_choice`-arvoksi ei ole nimenomaisesti asetettu `"none"`, ohittaa paneelin kokonaan: se reititetään suoraan
   yhdelle mallille (määritetylle tuomarille tai mallille `panel[0]`), ja `tools`/`tool_choice`
   välitetään muuttamattomina. Paneelin jäsenillä ei ole pääsyä työkaluihin, ja tuomarin
   koostamisohjeistus kehottaa välttämään työkalukutsujen tuottamista, joten agenttipohjaiset tai työkaluja kutsuvat asiakkaat
   saavat todellisen työkalukutsupäätöksen koostetun tekstin sijaan (#6771).
1. **Rinnakkainen lähetys** (vain pyynnöt, jotka eivät sisällä työkaluja) — kehote lähetetään samanaikaisesti jokaiselle paneelin
   mallille pakotetusti ilman suoratoistoa ja ilman työkaluja (tuomari tarvitsee kokonaiset
   tekstivastaukset niiden koostamista varten).
2. **Kvoorumiin ja lisäaikaan perustuva keräys** — heti kun `minPanel` vastausta on saapunut, käynnistetään lyhyt
   lisäaika hitaammille vastaajille, minkä jälkeen fuusio jatkuu kaikilla siihen mennessä kerätyillä vastauksilla.
   Tämä rajoittaa hitaimman mallin vaikutusta kokonaiskestoon, jota rajaa ehdoton aikakatkaisu.
3. **Tuomarin koostaminen** — paneelin vastaukset anonymisoidaan (`Source 1`, `Source 2`, … — jotta
   tuomari arvioi sisältöä eikä mallin brändiä) ja annetaan tuomarille, joka analysoi
   yhteisymmärrystä / ristiriitoja / osittaista kattavuutta / ainutlaatuisia havaintoja / katvealueita ja kirjoittaa sitten
   **yhden** auktoritatiivisen vastauksen. Tuomarikutsu säilyttää asiakkaan alkuperäisen
   `stream`-asetuksen ja työkalut, joten suoratoisto ja työkalujen myöhempi käyttö toimivat edelleen.
4. **Hallittu toiminnan heikentyminen** — 0 paneelivastausta → `503`; täsmälleen 1 selvinnyt vastaus → kyseinen vastaus
   palautetaan suoraan (mitään koostettavaa ei ole); yhden mallin paneeli vastaa suoraan.

Paneelin jäsen voi olla myös `combo-ref`-vaihe (`{kind: "combo-ref", comboName: "..."}`), joka viittaa
toiseen yhdistelmään — se käsitellään **yhtenä mustan laatikon paneeliäänenä** (täysi rekursiivinen välitys
viitattuun yhdistelmään, ei rinnakkainen lähetys kyseisen yhdistelmän omiin kohteisiin), käyttäen samaa syvyys- ja syklisuojausta,
jota kaikki muut `combo-ref`-viittauksia käyttävät strategiat jo hyödyntävät (#6764).

### Määritykset

Määritetään yhdistelmän `config`-objektissa (ei skeeman migraatiota — se käyttää uudelleen olemassa olevaa
`combos`-taulua):

| Kenttä                                   | Tyyppi   | Oletusarvo               | Tarkoitus                                                                                                        |
| :--------------------------------------- | :------- | :----------------------- | :--------------------------------------------------------------------------------------------------------------- |
| `config.judgeModel`                      | `string` | ensimmäinen paneelimalli | Lopullisen vastauksen koostava malli                                                                             |
| `config.fusionTuning.minPanel`           | `number` | `2`                      | Onnistuneiden vastausten määrä, joka vaaditaan ennen lisäajan käynnistymistä (rajataan välille `[2, panelSize]`) |
| `config.fusionTuning.stragglerGraceMs`   | `number` | `8000`                   | Kuinka kauan hitaampia vastaajia odotetaan kvoorumin saavuttamisen jälkeen                                       |
| `config.fusionTuning.panelHardTimeoutMs` | `number` | `90000`                  | Ehdoton yläraja, jotta yksi jumiutunut malli ei voi pysäyttää pyyntöä                                            |

Oletusarvot sijaitsevat `FUSION_DEFAULTS`-vakiossa (`open-sse/services/fusion.ts`).

### Esimerkki

```bash
curl -X POST http://localhost:20128/api/combos \
  -H "Authorization: Bearer <key>" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "fusion-panel",
    "strategy": "fusion",
    "targets": [
      { "model": "cc/claude-opus-4-7" },
      { "model": "cx/gpt-5.5" },
      { "model": "glm/glm-5.1" }
    ],
    "config": {
      "judgeModel": "cc/claude-opus-4-7",
      "fusionTuning": { "minPanel": 2, "stragglerGraceMs": 8000, "panelHardTimeoutMs": 90000 }
    }
  }'
```

Kutsu sitä sitten kuten mitä tahansa yhdistelmää: `{"model":"fusion-panel","messages":[...]}`.

## Virtuaalinen Auto-Combo-tehdas

Auto Combo -moottori ei edellytä ennalta määritettyjä comboja. Sen sijaan `open-sse/services/autoCombo/virtualFactory.ts` muodostaa ehdokkaat dynaamisesti:

1. Hakee `getProviderConnections({ isActive: true })` (kaikki käytössä olevat yhteydet)
2. Suodattaa mukaan yhteydet, joilla on kelvolliset tunnistetiedot (API-avain tai vanhentumaton OAuth-tunniste `hasUsableOAuthToken()`-funktion kautta)
3. Vertaa niitä `getProviderRegistry()`-rekisteriin mallien saatavuuden ja hinnoittelun osalta
4. Muodostaa jokaiselle `(provider, model, connection)`-monikolle `VirtualAutoComboCandidate`-ehdokkaan
5. Valitsee välityskohteeksi `connection.defaultModel`-mallin (tai rekisterin ensimmäisen mallin)
6. Pisteyttää jokaisen ehdokkaan 16 tekijän `scorePool()`-funktiolla ja variantin painopaketilla
7. Palauttaa tuloksena olevan muistissa olevan `AutoComboConfig`-määrityksen `handleComboChat()`-funktiolle — sitä ei koskaan tallenneta tietokantaan

Tämä tarkoittaa, että **uuden palveluntarjoajan lisääminen niin, että `auto/*` on käytössä, laajentaa ehdokasjoukkoa automaattisesti** — comboa ei tarvitse muokata manuaalisesti. Virtuaalinen combo muodostetaan uudelleen jokaiselle pyynnölle, joten uudet tai uudelleen toimintakuntoiset yhteydet otetaan käyttöön välittömästi.

## Itsekorjaavuus

- **Väliaikainen poissulkeminen**: Pisteet < 0.2 → suljetaan pois 5 minuutiksi (asteittainen viive, enintään 30 min)
- **Piirikatkaisijan tilan huomiointi**: OPEN → suljetaan automaattisesti pois; HALF_OPEN → koepyynnöt
- **Häiriötila**: >50 % OPEN → poistetaan kokeilu käytöstä ja maksimoidaan vakaus
- **Palautuminen jäähdytysjakson jälkeen**: Poissulkemisen jälkeen ensimmäinen pyyntö on lyhennetyllä aikakatkaisulla tehtävä "koepyyntö"

## Bandit-kokeilu

5 % pyynnöistä (määritettävissä) reititetään satunnaisille palveluntarjoajille kokeilua varten. Ei käytössä häiriötilassa.

## API

**Erillistä `POST /api/combos/auto`-päätepistettä ei ole** — Auto-Comboa käytetään kahdella tavalla:

1. **Nollakonfiguraatio (suositeltu):** Lähetä mikä tahansa keskustelun täydennyspyyntö käyttäen arvoa `model: "auto"` tai `model: "auto/<variant>"`. Virtuaalinen tehdas muodostaa kombon jokaiselle pyynnölle — pysyvää tallennusta tai API-kutsuja ei tarvita.

2. **Pysyvästi tallennettu kombo käyttäen asetusta `strategy: "auto"`:** Luo tavallinen kombo päätepisteen `POST /api/combos` kautta ja aseta `strategy: "auto"` sekä `config.auto.weights` / `config.auto.candidatePool`. Käytössä on sama pisteytysmoottori; kombo tallennetaan `combos`-kohteeseen, ja sitä voidaan käyttää uudelleen tunnuksen perusteella.

Tarkastelua varten `GET /api/combos/auto` luettelee jokaisen variantin sekä sen ratkaistun ehdokasjoukon ja arvot `context_length` / `max_output_tokens` — ehdokasjoukon konteksti-ikkunoiden MAKSIMIARVOT. Asiakasohjelmien (esim. opencode-laajennuksen) on ilmoitettava nämä arvot arvon `0` sijaan: nollan pituinen konteksti poistaa opencoden automaattisen tiivistyksen kokonaan käytöstä, jolloin istunnot kasvavat, kunnes yhdyskäytävän historiatietojen tyhjennys tuhoaa kontekstin. MAKSIMIARVON ilmoittaminen on turvallista, koska Auto-Combon kontekstin esisuodatus reitittää ylisuuret pyynnöt ehdokkaille, joilla on suuret konteksti-ikkunat.

```bash
# Käyttö nollakonfiguraatiolla (komboa ei luoda)
curl -X POST http://localhost:20128/v1/chat/completions \
  -H "Authorization: Bearer <key>" \
  -H "Content-Type: application/json" \
  -d '{"model":"auto/coding","messages":[{"role":"user","content":"Hello"}]}'

# Pysyvästi tallennettu automaattinen kombo tavallisen combos-päätepisteen kautta
curl -X POST http://localhost:20128/api/combos \
  -H "Content-Type: application/json" \
  -d '{"id":"my-auto","name":"Auto Coder","strategy":"auto","config":{"auto":{"candidatePool":["anthropic","google","openai"],"weights":{"quota":0.15,"health":0.3,"costInv":0.05,"latencyInv":0.35,"taskFit":0.1,"stability":0,"tierPriority":0.05}}}}'
```

### Automaattisen reitittimen strategiat

Pysyvästi tallennetuissa `strategy: "auto"`-komboissa `config.routerStrategy`-asetukseksi (tai vanhassa muodossa
`config.auto.routerStrategy`) voidaan määrittää jokin seuraavista:

- `rules` — oletusarvoinen painotettu pisteytys
- `score` — valitsee suurimman määritetyn painotetun pistemäärän. Täsmällisissä tasatilanteissa säilytetään määritetty
  ehdokkaiden järjestys; nykyinen `explorationRate` ottaa otoksen koko järjestetystä joukosta.
- `cost` / `eco` — halvin toimintakuntoinen palveluntarjoaja
- `latency` / `fast` — pienin p95-viive luotettavuusrangaistus huomioiden
- `sla-aware` / `sla` — suosi ehdokkaita, jotka täyttävät p95-viivettä, virheprosenttia ja valinnaisia
  kustannuksia koskevat SLO-tavoitteet
- `lkgp` — viimeisin tunnetusti toimiva palveluntarjoaja ensin
- `nadir` — kysyy [Nadirin](https://getnadir.com) päätös-API:lta, minkä joukon mallin
  kehote tarvitsee; erikseen käyttöön otettava, ja häiriötilanteessa siirrytään avoimesti `rules`-strategiaan

### Reititinstrategiat yksityiskohtaisesti

Auto-Combo-moottori tarjoaa 7 vaihdettavaa **RouterStrategy**-toteutusta, joita
voidaan vaihtaa `config.routerStrategy`-asetuksella (tai vanhalla `config.auto.routerStrategy`-asetuksella).
Kukin strategia valitsee ehdokasjoukosta yhden palveluntarjoajan annetun `RoutingContext`-kontekstin perusteella
(tehtävätyyppi, työkaluihin/näkösyötteeseen liittyvät vihjeet, token-määrän arvio, valinnainen SLA-käytäntö, valinnainen
viimeisin tunnetusti toimiva palveluntarjoaja).

#### 1. `rules` (oletus) — 16 tekijän painotettu pisteytys

Käärii nykyisen pisteytysmoottorin. Suodattaa pois `OPEN`-tilassa olevat katkaisijapiirin
ehdokkaat ja suorittaa sitten `scorePool()`-funktion nykyisellä tehtävätyypillä sekä `getTaskFitness()`-funktiolla
valiten eniten pisteitä saaneen palveluntarjoajan.

```ts
class RulesStrategyImpl implements RouterStrategy {
  readonly name = "rules";
  readonly description = "16-factor weighted scoring (see DEFAULT_WEIGHTS)";

  select(pool, context) {
    const eligible = pool.filter((c) => c.circuitBreakerState !== "OPEN");
    const ranked = scorePool(
      eligible.length > 0 ? eligible : pool,
      context.taskType,
      undefined,
      getTaskFitness
    );
    return { provider: ranked[0].provider /* ... */ };
  }
}
```

**Milloin käyttää**: Oletusvalinta. Käytä, kun haluat tasapainoisen kompromissin kaikkien signaalien välillä.

**Alias**: `rules` (ei aliasta)

---

#### 2. `cost` / `eco` — halvin toimintakuntoinen palveluntarjoaja

Järjestää ehdokasjoukon `costPer1MTokens`-arvon mukaan (nousevasti) ja valitsee halvimman.
Suodattaa ensin pois `OPEN`-tilassa olevat ehdokkaat.

```ts
class CostStrategyImpl implements RouterStrategy {
  readonly name = "cost";
  readonly description = "Always selects cheapest available provider";

  select(pool, context) {
    const healthy = pool.filter((c) => c.circuitBreakerState !== "OPEN");
    const sorted = [...healthy].sort((a, b) => a.costPer1MTokens - b.costPer1MTokens);
    return { provider: sorted[0].provider /* ... */ };
  }
}
```

**Milloin käyttää**: Kustannusherkät työkuormat, eräkäsittely tai taustatyöt.

**Aliakset**: `cost`, `eco`

---

#### 3. `latency` / `fast` — pienin p95-viive luotettavuusrangaistus huomioiden

Järjestää arvon `p95LatencyMs + (errorRate * 1000)` mukaan. Virheprosenttiin perustuva rangaistus varmistaa,
että epäluotettavat palveluntarjoajat sijoittuvat alemmas, vaikka niiden nimellinen viive olisi pieni.

```ts
class LatencyStrategyImpl implements RouterStrategy {
  readonly name = "latency";
  readonly description = "Prioritizes lowest p95 latency with reliability weighting";

  select(pool, context) {
    const healthy = pool.filter((c) => c.circuitBreakerState !== "OPEN");
    const sorted = [...healthy].sort(
      (a, b) => a.p95LatencyMs + a.errorRate * 1000 - (b.p95LatencyMs + b.errorRate * 1000)
    );
    return { provider: sorted[0].provider /* ... */ };
  }
}
```

**Milloin käyttää**: Viiveherkät työkuormat, kuten reaaliaikainen keskustelu, automaattinen täydennys tai
vuorovaikutteiset koodausavustajat.

**Aliakset**: `latency`, `fast`

---

#### 4. `sla-aware` / `sla` — viive-, virhe- ja kustannus-SLO-vaatimusten täyttäminen

Pisteyttää jokaisen ehdokkaan sen perusteella, kuinka hyvin se täyttää määritetyn SLO-käytännön:

| Tekijä           | Painoarvo | Kaava                                                     |
| ---------------- | --------- | --------------------------------------------------------- |
| Viivepisteet     | 35%       | `threshold / max(value, ε)`                               |
| Virhepisteet     | 35%       | `threshold / max(value, ε)`                               |
| Kuntopisteet     | 15%       | `1.0` (CLOSED) / `0.5` (HALF_OPEN) / `0.0` (OPEN)         |
| Kustannuspisteet | 10%       | `threshold / max(value, ε)` tai käänteisesti normalisoitu |
| Vakauspisteet    | 5%        | käänteisesti normalisoitu viiveen keskihajonta            |

Kun `hardConstraints: true`, ehdokkaat lajitellaan ensisijaisesti **rikkomuspisteiden**
(miten paljon ne ylittävät jonkin SLO:n) ja sen jälkeen yhdistelmäpisteiden perusteella. Muussa tapauksessa
käytetään vain yhdistelmäpisteitä.

```ts
class SLAStrategyImpl implements RouterStrategy {
  readonly name = "sla-aware";
  readonly description =
    "Selects the provider most likely to satisfy latency, error-rate, and cost SLOs";

  select(pool, context) {
    // ... pisteyttää jokaisen ehdokkaan käytännön perusteella: { targetP95Ms, maxErrorRate, maxCostPer1MTokens, hardConstraints }
  }
}
```

**SLA-kentät** (määritetään yhdistelmäkonfiguraatiossa):

```json
{
  "strategy": "auto",
  "config": {
    "routerStrategy": "sla-aware",
    "slaTargetP95Ms": 1500,
    "slaMaxErrorRate": 0.05,
    "slaMaxCostPer1MTokens": 5,
    "slaHardConstraints": true
  }
}
```

**Milloin käyttää**: Tuotantotyökuormissa, joilla on tiukat viive-, virheprosentti- tai kustannusbudjetit.

**Aliakset**: `sla-aware`, `sla`

---

#### 5. `lkgp` — viimeksi tunnettu toimiva palveluntarjoaja ensin

Kokeilee ensin **viimeksi tunnettua toimivaa palveluntarjoajaa** (jos määritetty) ja käyttää sen jälkeen
varamenetelmänä `rules`-strategiaa. Hyödyllinen istuntokohtaisen pysyvyyden kannalta — sama palveluntarjoaja käsittelee
keskustelun jatkopyynnöt.

```ts
class LKGPStrategyImpl implements RouterStrategy {
  readonly name = "lkgp";
  readonly description = "Tries last known good provider first, then falls back to rules";

  select(pool, context) {
    if (context.lkgpEnabled === false) {
      return getStrategy("rules").select(pool, context);
    }

    if (context.lastKnownGoodProvider) {
      const candidates = pool.filter(
        (c) => c.provider === context.lastKnownGoodProvider && c.circuitBreakerState !== "OPEN"
      );
      if (candidates.length > 0) {
        return { provider: candidates[0].provider /* ... */ };
      }
    }

    // Käytä varamenetelmänä rules-strategiaa
    return getStrategy("rules").select(pool, context);
  }
}
```

**Milloin käyttää**: Monivaiheisissa keskusteluissa, joissa haluat saman palveluntarjoajan käsittelevän
jatkopyynnöt (esimerkiksi välimuistin, kontekstin jatkuvuuden tai hinnoittelun yhdenmukaisuuden vuoksi).

**Alias**: `lkgp` (ei aliasta)

---

#### 6. `nadir` — kehotteen huomioiva mallin valinta Nadirin avulla

Kaikki edellä mainitut strategiat asettavat ehdokkaat järjestykseen oman telemetriansa perusteella; mikään niistä ei lue
pyyntöä. `nadir` lähettää viimeisimmän käyttäjävuoron sekä joukon mallitunnukset
[Nadirin](https://getnadir.com) päätöksenteko-API:lle (`POST /v1/bucket`) ja reitittää pyynnön malliin,
jonka Nadir valitsee kyseisestä valikoimasta (`simple` → halvin kykenevä malli, `complex` → edistynein
malli). Kyseistä mallia palveleva yhteys valitaan edelleen `rules`-strategialla, joten kiintiö,
kunto ja kustannukset ratkaisevat edelleen, mitä tiliä käytetään.

```json
{
  "strategy": "auto",
  "config": {
    "routerStrategy": "nadir",
    "nadir": {
      "apiKey": "ndr_...",
      "baseUrl": "https://api.getnadir.com",
      "timeoutMs": 2000
    }
  }
}
```

`OMNIROUTE_NADIR_API_KEY` ja `OMNIROUTE_NADIR_BASE_URL` ovat ympäristömuuttujapohjaisia varavaihtoehtoja näille kahdelle
merkkijonolle. `baseUrl` tarvitaan vain itse isännöidylle Nadirille (lopussa oleva `/v1` hyväksytään).
Ilman avainta tehdyt kutsut ohjautuvat Nadirin anonyymille tasolle, jonka nopeutta rajoitetaan IP-osoitekohtaisesti.

Palvelusta lähtevät tiedot: viimeisimmän käyttäjäviestin teksti (ensimmäiset 16 000 merkkiä), ehdokkaiden
mallitunnukset ja `source: "omniroute"`-kanavatunniste. Järjestelmäkehotetta, historiaa, työkaluja tai
otsakkeita ei lähetetä.

Virhetilanteissa toiminta on avoin: aikakatkaisu (oletusarvoisesti 2000 ms), muu kuin 2xx-vastaus, tavoittamaton
palvelin, virheellisesti muodostettu vastaus tai joukon ulkopuolinen valinta johtaa `rules`-päätökseen,
ja syyn alkuun lisätään `NadirStrategy: fallback (…)`. Epäonnistuneen kutsun jälkeen
strategia ohittaa verkkokutsut 30 sekunnin ajan, joten käyttökatkos aiheuttaa yhden aikakatkaisun 30 sekuntia kohden eikä
yhtä jokaista pyyntöä kohden. Reititystapahtumat ilmoittavat `strategy: "nadir"` vain, kun Nadir todella teki
valinnan.

**Milloin käyttää**: Vaikeustasoltaan vaihtelevalle liikenteelle joukossa, joka kattaa useita mallitasoja (pieni, keskitasoinen
ja edistynein malli), kun haluat vähentää aina edistyneimmän mallin käyttämisestä aiheutuvia kustannuksia.

**Alias**: `nadir` (ei aliasta)

---

### Mukautetut reititysstrategiat

Voit rekisteröidä oman `RouterStrategy`-toteutuksesi julkisen API:n kautta:

```ts
import {
  registerStrategy,
  type RouterStrategy,
} from "@omniroute/open-sse/services/autoCombo/routerStrategy";

class MyCustomStrategy implements RouterStrategy {
  readonly name = "my-custom";
  readonly description = "My custom routing strategy";

  select(pool, context) {
    // Oma reitityslogiikkasi tähän
    return {
      provider: pool[0].provider,
      model: pool[0].model,
      strategy: this.name,
      reason: "MyCustomStrategy: ...",
      candidatesConsidered: pool.length,
      finalScore: 1.0,
    };
  }
}

registerStrategy("my-custom", new MyCustomStrategy());
```

Käytä sitä sitten:

```json
{
  "strategy": "auto",
  "config": {
    "routerStrategy": "my-custom"
  }
}
```

---

### Reititysstrategian valintaopas

| Käyttötapaus             | Strategia   | Peruste                                            |
| ------------------------ | ----------- | -------------------------------------------------- |
| Tasapainoinen työkuorma  | `rules`     | Oletus — huomioi kaikki tekijät                    |
| Kustannusten minimointi  | `cost`      | Valitsee aina halvimman                            |
| Viiveen minimointi       | `latency`   | Valitsee nopeimman luotettavan palveluntarjoajan   |
| Tiukat SLO:t             | `sla-aware` | Suodattaa p95-/virhe-/kustannusrajojen perusteella |
| Monivaiheinen keskustelu | `lkgp`      | Istuntokohtainen pysyvyys                          |
| Vaihteleva vaikeustaso   | `nadir`     | Valitsee mallitason kehotekohtaisesti              |

SLA-tietoinen-strategian kentät:

```json
{
  "strategy": "auto",
  "config": {
    "routerStrategy": "sla-aware",
    "slaTargetP95Ms": 1500,
    "slaMaxErrorRate": 0.05,
    "slaMaxCostPer1MTokens": 5,
    "slaHardConstraints": true
  }
}
```

## Tehtäväsoveltuvuus

Yli 30 mallia on pisteytetty kuudessa tehtävätyypissä (`coding`, `review`, `planning`, `analysis`, `debugging`, `documentation`). Tukee jokerimerkkejä sisältäviä malleja (esim. `*-coder` → korkea ohjelmointipistemäärä).

## Auto-varianttien yhteenveto

Kun mukaan lasketaan pelkkä `auto` (oletus) sekä tiedostossa `autoPrefix.ts` määritellyt kuusi `AutoVariant`-arvoa, käytettävissä on **7 kutsuttavaa mallitunnusta**:

`auto`, `auto/coding`, `auto/fast`, `auto/cheap`, `auto/offline`, `auto/smart`, `auto/lkgp`

(`AutoVariant` itsessään luettelee kuusi arvoa; seitsemäs vaihtoehto on ”ei varianttia” — pelkkä `auto` — jonka `parseAutoPrefix()` käsittelee arvona `variant: undefined`.)

## Miten tasot liittyvät Auto-Comboon

16 tekijän pisteytysfunktio (`open-sse/services/autoCombo/scoring.ts`) käsittelee tasoon kuulumista kahtena signaalina: `tierPriority` (0.0476) ja `tierAffinity` (0.0476). Katso yllä olevasta ensisijaisesta [pisteytystekijöiden taulukosta](#how-it-works-persisted-auto-combos) täydellinen `DEFAULT_WEIGHTS`-joukko — pakettikohtaiset poikkeukset (ship-fast/cost-saver/quality-first/
offline-friendly) on lueteltu "Painoprofiilit paketeittain" -taulukossa.

Pelkkä taso **ei** pakota tasoa 1 ensimmäiseksi — jos tason 1 viive on suuri tai kustannusten ja laadun suhde ei ole optimaalinen, taso 2 voittaa. Jos haluat pakottaa tasojärjestyksen, käytä yhdistelmästrategiaa `priority` ja järjestä palveluntarjoajat tason mukaan.

Jos haluat suosia voimakkaasti tasoa 1 (tilaus), kasvata `tierPriority`-painoa:

```json
{
  "strategy": "auto",
  "config": { "auto": { "weights": { "tierPriority": 0.3, "costInv": 0.05 } } }
}
```

Katso tasojen määritelmät ja palveluntarjoajien luokittelu tiedostosta [`docs/guides/TIERS.md`](../guides/TIERS.md).

## Testaus ja kattavuus

### Deterministinen reitityspäätösten matriisi (`npm run test:combo:matrix`)

`tests/integration/combo-matrix/*.test.ts` todentaa kaikkien 19 julkisen strategian reititys**päätöksen** päästä päähän todellisen yhdistelmäputken kautta käyttämällä jäljiteltyä ylävirran palvelua. Kattavuuteen sisältyvät:

- Kaikki 19 `ROUTING_STRATEGY_VALUES`-strategiaa (ordered, weighted, cost, context, fusion, …).
- `quota-share` (sisäinen) päästä päähän: DRR-oikeudenmukaisuus ja saturoitumisen prioriteetin alentaminen todellisen `selectQuotaShareTarget`-sauman kautta (`registerQuotaFetcher` / `setLKGP` / `__setHeadroomSaturationFetcherForTests`).
- `context-relay`-strategian yleisen luovutuksen kattavuus kaikilla kohdemäärillä.

Tämä testikokonaisuus suoritetaan CI:ssä (`test:integration`-työ) asetuksilla `--test-concurrency=1` ja `--test-force-exit`, joten se on deterministinen eikä vaadi toimivia tunnistetietoja.

### Ehdolliset live-savukokeet (EIVÄT CI:ssä — todelliset palveluntarjoajat)

| Komento                                | Mitä se tekee                                                                                                                 |
| :------------------------------------- | :---------------------------------------------------------------------------------------------------------------------------- |
| `npm run test:combo:live`              | Prosessin sisäinen todellinen reititys asetuksella `RUN_COMBO_LIVE=1`; luo tilannevedoksen toimivasta OmniRoute-tietokannasta |
| `npm run test:combo:live:vps`          | HTTP-kutsut toimivaan OmniRoute-palvelimeen (aseta `COMBO_LIVE_BASE_URL`)                                                     |
| `npm run test:combo:live:vps:failover` | Sama, mutta tarkoituksellisilla varmistussiirtymäskenaarioilla                                                                |

Nämä savukokeet testaavat todellisen tiedonsiirtopolun (yhdistelmä → palveluntarjoaja → täydennys). Ne on tarkoituksellisesti jätetty pois CI:stä, koska ne vaativat toimivat tunnistetiedot ja VPS-käyttöoikeuden.

---

## Tiedostot

| Tiedosto                                                  | Tarkoitus                                                                                                   |
| :-------------------------------------------------------- | :---------------------------------------------------------------------------------------------------------- |
| `open-sse/services/autoCombo/scoring.ts`                  | 16 tekijän pisteytysfunktio, `DEFAULT_WEIGHTS`, poolin normalisointi                                        |
| `open-sse/services/autoCombo/taskFitness.ts`              | Mallin ja tehtävän soveltuvuuden hakutaulukko                                                               |
| `open-sse/services/autoCombo/engine.ts`                   | Valintalogiikka, bandiittialgoritmi, budjettiraja                                                           |
| `open-sse/services/autoCombo/selfHealing.ts`              | Poissulkeminen, koepyynnöt, poikkeustilatila                                                                |
| `open-sse/services/autoCombo/modePacks.ts`                | 6 painotusprofiilia (ship-fast, cost-saver, quality-first, offline-friendly, reliability-first, chaos-mode) |
| `open-sse/services/autoCombo/autoPrefix.ts`               | `auto/`-etuliitteen jäsennin + 6 muunnelmaa                                                                 |
| `open-sse/services/autoCombo/virtualFactory.ts`           | Luo muistissa olevan `AutoComboConfig`-määrityksen aktiivisista yhteyksistä                                 |
| `open-sse/services/autoCombo/providerRegistryAccessor.ts` | Testikoukku palveluntarjoajarekisterin jäljittelyä varten                                                   |
| `src/shared/constants/routingStrategies.ts`               | `ROUTING_STRATEGY_VALUES` (20 strategiaa)                                                                   |
| `src/sse/handlers/chat.ts`                                | Integraatio: auto-etuliitteen oikopolku                                                                     |
