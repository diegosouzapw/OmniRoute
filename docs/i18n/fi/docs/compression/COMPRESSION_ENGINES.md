# Compression Engines (Suomi)

🌐 **Languages:** 🇺🇸 [English](../../../../compression/COMPRESSION_ENGINES.md) · 🇪🇹 [am](../../../am/docs/compression/COMPRESSION_ENGINES.md) · 🇸🇦 [ar](../../../ar/docs/compression/COMPRESSION_ENGINES.md) · 🇦🇿 [az](../../../az/docs/compression/COMPRESSION_ENGINES.md) · 🇧🇬 [bg](../../../bg/docs/compression/COMPRESSION_ENGINES.md) · 🇧🇩 [bn](../../../bn/docs/compression/COMPRESSION_ENGINES.md) · 🇨🇿 [cs](../../../cs/docs/compression/COMPRESSION_ENGINES.md) · 🇩🇰 [da](../../../da/docs/compression/COMPRESSION_ENGINES.md) · 🇩🇪 [de](../../../de/docs/compression/COMPRESSION_ENGINES.md) · 🇬🇷 [el](../../../el/docs/compression/COMPRESSION_ENGINES.md) · 🇪🇸 [es](../../../es/docs/compression/COMPRESSION_ENGINES.md) · 🇪🇪 [et](../../../et/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇷 [fa](../../../fa/docs/compression/COMPRESSION_ENGINES.md) · 🇫🇷 [fr](../../../fr/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇪 [ga](../../../ga/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇳 [gu](../../../gu/docs/compression/COMPRESSION_ENGINES.md) · 🇳🇬 [ha](../../../ha/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇱 [he](../../../he/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇳 [hi](../../../hi/docs/compression/COMPRESSION_ENGINES.md) · 🇭🇷 [hr](../../../hr/docs/compression/COMPRESSION_ENGINES.md) · 🇭🇺 [hu](../../../hu/docs/compression/COMPRESSION_ENGINES.md) · 🇦🇲 [hy](../../../hy/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇩 [id](../../../id/docs/compression/COMPRESSION_ENGINES.md) · 🇳🇬 [ig](../../../ig/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇹 [it](../../../it/docs/compression/COMPRESSION_ENGINES.md) · 🇯🇵 [ja](../../../ja/docs/compression/COMPRESSION_ENGINES.md) · 🇬🇪 [ka](../../../ka/docs/compression/COMPRESSION_ENGINES.md) · 🇰🇭 [km](../../../km/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇳 [kn](../../../kn/docs/compression/COMPRESSION_ENGINES.md) · 🇰🇷 [ko](../../../ko/docs/compression/COMPRESSION_ENGINES.md) · 🇱🇹 [lt](../../../lt/docs/compression/COMPRESSION_ENGINES.md) · 🇱🇻 [lv](../../../lv/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇳 [ml](../../../ml/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇳 [mr](../../../mr/docs/compression/COMPRESSION_ENGINES.md) · 🇲🇾 [ms](../../../ms/docs/compression/COMPRESSION_ENGINES.md) · 🇲🇹 [mt](../../../mt/docs/compression/COMPRESSION_ENGINES.md) · 🇲🇲 [my](../../../my/docs/compression/COMPRESSION_ENGINES.md) · 🇳🇵 [ne](../../../ne/docs/compression/COMPRESSION_ENGINES.md) · 🇳🇱 [nl](../../../nl/docs/compression/COMPRESSION_ENGINES.md) · 🇳🇴 [no](../../../no/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇳 [or](../../../or/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇳 [pa](../../../pa/docs/compression/COMPRESSION_ENGINES.md) · 🇵🇭 [phi](../../../phi/docs/compression/COMPRESSION_ENGINES.md) · 🇵🇱 [pl](../../../pl/docs/compression/COMPRESSION_ENGINES.md) · 🇵🇹 [pt](../../../pt/docs/compression/COMPRESSION_ENGINES.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/compression/COMPRESSION_ENGINES.md) · 🇷🇴 [ro](../../../ro/docs/compression/COMPRESSION_ENGINES.md) · 🇷🇺 [ru](../../../ru/docs/compression/COMPRESSION_ENGINES.md) · 🇱🇰 [si](../../../si/docs/compression/COMPRESSION_ENGINES.md) · 🇸🇰 [sk](../../../sk/docs/compression/COMPRESSION_ENGINES.md) · 🇸🇮 [sl](../../../sl/docs/compression/COMPRESSION_ENGINES.md) · 🇷🇸 [sr](../../../sr/docs/compression/COMPRESSION_ENGINES.md) · 🇸🇪 [sv](../../../sv/docs/compression/COMPRESSION_ENGINES.md) · 🇰🇪 [sw](../../../sw/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇳 [ta](../../../ta/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇳 [te](../../../te/docs/compression/COMPRESSION_ENGINES.md) · 🇹🇭 [th](../../../th/docs/compression/COMPRESSION_ENGINES.md) · 🇹🇷 [tr](../../../tr/docs/compression/COMPRESSION_ENGINES.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/compression/COMPRESSION_ENGINES.md) · 🇵🇰 [ur](../../../ur/docs/compression/COMPRESSION_ENGINES.md) · 🇺🇿 [uz](../../../uz/docs/compression/COMPRESSION_ENGINES.md) · 🇻🇳 [vi](../../../vi/docs/compression/COMPRESSION_ENGINES.md) · 🇳🇬 [yo](../../../yo/docs/compression/COMPRESSION_ENGINES.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/compression/COMPRESSION_ENGINES.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/compression/COMPRESSION_ENGINES.md)

---

OmniRoute-pakkaus perustuu moottorisopimuksiin. Tila voi suorittaa yhden moottorin suoraan
(`caveman` tai `rtk`) tai deterministisen pinotun putken, joka suorittaa useita moottoreita järjestyksessä.

## Tilat

| Tila         | Moottoripolku                          | Tarkoitettu syöte                                           |
| ------------ | -------------------------------------- | ----------------------------------------------------------- |
| `off`        | ei mitään                              | Kehotteen tarkka säilyttäminen                              |
| `lite`       | Caveman lite -aputoiminnot             | Vähäriskinen, aina käytössä oleva siivous                   |
| `standard`   | Caveman                                | Luonnollisella kielellä kirjoitetun kehotteen tiivistäminen |
| `aggressive` | Caveman + historia-/työkalutiivistimet | Pitkät keskusteluistunnot                                   |
| `ultra`      | Caveman + karsinta-aputoiminnot        | Kontekstirajan ylityksestä palautuminen                     |
| `rtk`        | RTK                                    | Päätteen, komentotulkin, koonnin, testien ja gitin tuloste  |
| `omniglyph`  | OmniGlyph                              | Konteksti kuvana natiivissa palveluntarjoajan rajapinnassa  |
| `stacked`    | Putki, oletuksena `rtk -> caveman`     | Sekalaiset työkalulokit ja proosa, suurimmat säästöt        |

### OmniGlyph-pakkausprofiilit

`omniglyph`-moottori (paketti `omniglyph`, 1.4.0+) hyväksyy nimetyn semanttisen profiilin, joka asetetaan
globaalisti pakkausasetusten `omniglyph.profile`-arvolla tai vaihekohtaisesti
pinotun putken vaiheen asetuksissa:

| Profiili      | Rajaus                                                                                                                               |
| ------------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| `aggressive`  | Oletus. Julkaistuissa mittaustuloksissa käytetty käytäntö — muuntaa järjestelmän, työkaludokumentaation ja tiiviin historian kuviksi |
| `balanced`    | Säilyttää aktiivisen tilan natiivina, suojaa viimeiset 8 vuoroa ja tiivistää vanhemman suljetun historian                            |
| `coding-safe` | Säilyttää auktoriteetin, työkaluskeemat ja aktiivisen työkalutulosteen natiivina sekä suojaa viimeiset 12 vuoroa                     |
| `passthrough` | Reitittää muuntamatta; moottori ohitetaan                                                                                            |

Profiili on **yläraja, ei alaraja**: paketin `mergeCompressionProfileOptions`
estää kutsujan ohitusta avaamasta uudelleen profiilin sulkemaa häviöllistä käsittelylinjaa, joten vaihekohtainen
`preserveSystemPrompt: false` ei voi ottaa järjestelmäpakkauksen käyttöön `coding-safe`-profiilissa.

Tällä koodipohjalla mitattuna `coding-safe` ja `balanced` nostavat `minCompressChars`-arvon
enimmäisarvoonsa ja säilyttävät järjestelmän, työkaluskeemat ja työkalutulokset natiiveina, joten istunto, johon ei ole
vielä kertynyt historiaa, pysähtyy tilaan `below_min_chars`, eikä moottori muunna mitään. Siksi
oletus on `aggressive` turvallisimman profiilin sijaan.

Paketti ratkaisee oman mallirajauksensa ja profiilinsa ympäristömäärityksistään.
OmniRoute ei koskaan delegoi päätöstä: sovitin kiinnittää malliportin paketin
rajoittavimpaan rajaukseen, joten isäntäympäristön asetukset voivat vain supistaa sallittujen mallien luetteloa, eivät koskaan
laajentaa sitä OmniRouten mitattujen tulosten ulkopuolelle.

## Moottorirekisteri

Rekisteri sijaitsee tiedostossa `open-sse/services/compression/engines/registry.ts`. Moottorit toteuttavat yhteisen
sopimuksen:

- `id`: vakaa moottoritunniste, kuten `caveman` tai `rtk`
- `apply(text, config)`: pinotuissa käsittelyketjuissa käytetty vanha suorituspolku
- `compress(input, config)`: ensisijainen suorituspolku, joka palauttaa tekstin ja tilastot
- `getConfigSchema()`: palauttaa kelvollisen konfiguraation JSON-Schema-tyyppisen rakenteen
- `validateConfig(config)`: palauttaa arvon `{ valid, errors[] }`

Rekisteröinti käyttää funktiota `registerCompressionEngine(engine)` (tai edistyneissä tapauksissa funktiota `registerEngine`),
joka kutsuu funktioita `assertValidEngine()` ja `validateConfig(defaultConfig)` ennen hyväksymistä.
Poista moottori ajon aikana funktiolla `unregisterCompressionEngine(id)`.

`strategySelector.ts` rekisteröi sisäänrakennetut moottorit ennen pakkauksen suorittamista. Näin esikatselu,
ajonaikainen pakkaus, pinottu tila, testit ja tulevat moottorit voivat käyttää samaa suorituspolkua.

### MCP-kuvausten pakkaus (liittyvä)

Erillinen rekisteri pakkaa MCP-työkalujen kuvausmetadataa rekisteritasolla — katso
`open-sse/mcp-server/descriptionCompressor.ts` ja [MCP-SERVER.md](../frameworks/MCP-SERVER.md). Se käyttää uudelleen
Caveman-sääntöjä, mutta käsittelee työkalumetadataa eikä pyyntöjen hyötykuormia.

### Muut sisäänrakennetut moottorit

Cavemanin, RTK:n ja LLMLingua-2:n lisäksi rekisteri sisältää useita erikoistuneita häviöttömiä /
rakenteellisia moottoreita (joita käytetään pinotuissa käsittelyketjuissa, kokeiluympäristössä ja testeissä):

| Moottori      | Tunniste        | Toiminta                                                                                                                                                                                   |
| ------------- | --------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| CCR           | `ccr`           | Content-Compress-Retrieve (H4): korvaa suuret yhtenäiset tekstilohkot sisältöosoitteisilla viittauksilla, jolloin toistuvat/suuret lohkot lähetetään kerran ja niihin viitataan myöhemmin. |
| headroom      | `headroom`      | SmartCrusher (H3 + N5): pakkaa homogeeniset JSON-taulukkohyötykuormat häviöttömästi sarakepohjaiseen `[N rows]`-muotoon.                                                                   |
| ionizer       | `ionizer`       | Ottaa erittäin suurista homogeenisista lohkoista otoksen alun, keskiosan ja lopun riveistä sekä tallentaa pois jätetyn keskiosan CCR:n sisältöosoitteisena viittauksena.                   |
| session-dedup | `session-dedup` | Sisältöosoitteinen keskusteluvuorojen välinen deduplikointi (TokenMizerin innoittama): jättää pois tekstin, joka on jo esiintynyt saman istunnon aiemmissa vuoroissa.                      |

**CCR:n noutoprotokollan ohje (#8033):** kun CCR korvaa pyynnössä ensimmäisen kerran ≥1 lohkon,
moottori lisää alkuun yhden idempotentin `system`-viestin (jonka alussa on
`[CCR protocol]`-vartioarvo) ja opettaa kutsujalle merkinnän ja työkalun välisen sopimuksen: mitä
`[CCR retrieve hash=<24hex> chars=N]`-merkintä tarkoittaa, että tiiviste on kopioitava sanatarkasti
(kaikki 24 heksadesimaalimerkkiä — väärin kopioidut tiivisteet ovat todennäköinen syy "lohkoa ei löydy"
-virheisiin) ja että `[dedup:ref sha=...]`-merkintä tarkoittaa "katso taaksepäin historiasta", ei "kutsu
työkalua". Huomautus lisätään **vain, kun kutsujan ilmoittama `tools[]` osoittaa, että se todella voi
käyttää `omniroute_ccr_retrieve`-työkalua** (`callerSupportsCcrRetrieve()` tiedostossa
`open-sse/services/compression/engines/ccr/protocolInstruction.ts`) — tavallinen
OpenAI-yhteensopiva kutsuja, jolla ei ole kyseistä työkalua, ei koskaan saa ohjetta kutsua kohdetta,
jota se ei voi käyttää. Idempotenssi varmistetaan etsimällä vartioarvo viestihistoriasta
ennen lisäämistä, joten monen vuoron pyynnöt (jotka toistavat aiemmat viestit) eivät kasaa
huomautusta kerran jokaisella vuorolla.

## Caveman

Caveman-tila keskittyy tavallisen proosan semanttiseen tiivistämiseen:

- säilyttää koodilohkot, URL-osoitteet, JSON-datan, polut ja rakenteisen datan
- poistaa täytesanat, varaukset, toistetun kontekstin ja monisanaiset yhdysilmaukset
- tukee kielikohtaisia tiedostosääntöpaketteja hakemistossa `open-sse/services/compression/rules/`
- on edelleen käytettävissä vanhojen `standard`-, `aggressive`- ja `ultra`-tilojen kautta

Hallintapaneelin sijainti on `Dashboard -> Context & Cache -> Caveman`.

Cavemanin upstream-versio ilmoittaa tuottavansa `~75%` vähemmän tulostetokeneita ja saavuttavansa vertailutesteissä keskimäärin `65%`:n tulossäästön vaihteluvälillä `22-87%` sekä tarjoavansa `~46%`:n syötteenpakkaustyökalun. OmniRoute käyttää Cavemanin syötepuolen lukua dokumentoidessaan ketjutettuja kehote- ja kontekstisäästöjä; Cavemanin tulostila on edelleen erillinen vastauksen toimintaa ohjaava ominaisuus.

## RTK

RTK-tila keskittyy komentojen ja työkalujen tulosteisiin:

- tunnistaa tulosteluokkia, kuten `git status`, `git branch`, `git diff`, Vitest/Jest/Pytest,
  Cargo/Go-testit, TypeScript/Vite/Webpack-koontiversiot, ESLint, npm-tarkastukset/asennukset, Docker-lokit,
  komentotulkin `find`/`grep`, pinon jäljitykset ja yleiset lokit
- käyttää 49:ää JSON-suodatinta hakemistosta `open-sse/services/compression/engines/rtk/filters/`
- tukee RTK-tyylistä deklaratiivista käsittelyketjua: ANSI-koodien poisto, korvaus, match-output-oikotie,
  rivien poisto/säilytys, rivikohtainen katkaisu, alku-/loppu-/enimmäisrivikatkaisu ja varatoiminto tyhjälle tulokselle
- tukee luottamukseen perustuvia projektisuodattimia tiedostossa `.rtk/filters.json` ja yleisiä suodattimia tiedostossa
  `DATA_DIR/rtk/filters.json`
- poistaa ANSI-sekvenssit, edistymisilmoitusten kohinan, toistuvat rivit ja hyödyttömät vakiotekstit
- säilyttää toimenpiteitä edellyttävät virheet, varoitukset, yhteenvedot, muuttuneet tiedostot ja loppuosan kontekstin
- voi valinnaisesti säilyttää peitetyn raakatuotteen palautusta ja virheenkorjausta varten todennettujen hallintareittien
  kautta

Hallintapaneelin sijainti on `Dashboard -> Context & Cache -> RTK`.

Mukautettujen suodattimien, luottamuksen, varmennuksen ja raakatuotteen palautuksen operatiiviset tiedot ovat tiedostossa
[`RTK_COMPRESSION.md`](./RTK_COMPRESSION.md).

RTK:n upstream-versio ilmoittaa komentotulosteiden pakkauksen säästöksi `60-90%`. Sen README-esimerkissä
30 minuutin Claude Code -istunnon tokenimäärä pienenee `~118,000` tokenista `~23,900` tokeniin eli säästö on `79.7%`.

## LLMLingua-2 (semanttinen karsinta)

LLMLingua-2-tila suorittaa proosalle **semanttisen tokenien karsinnan** käyttäen pientä ONNX-tokeniluokittelijaa ja täydentää sääntöpohjaisia Caveman- ja RTK-moottoreita:

- pakkaa proosaa vain muissa kuin järjestelmäviesteissä; aidatut koodilohkot ja muut säilytettävät
  rakenteet pysyvät aina muuttumattomina
- suorittaa `@atjsh/llmlingua-2`-taustajärjestelmän (ONNX `@huggingface/transformers`-paketin kautta)
  työtekijäsäikeessä, joten mallin päättely ei koskaan estä pyynnön tapahtumasilmukkaa
- on **ketjutettavissa** (`stackPriority` 35): ketjutetussa käsittelyketjussa se suoritetaan rakenteellisten
  moottoreiden (CCR, session-dedup, headroom, Caveman) jälkeen mutta ennen `ultra`-tilaa, koska
  semanttinen karsinta on tehokkainta jo rakenteellisesti pakatulle tekstille — esimerkiksi
  `rtk -> caveman -> llmlingua`
- **palautuu virhetilanteessa aina alkuperäiseen toimintaan** (puuttuvat valinnaiset riippuvuudet, työtekijän käynnistys, mallin lataus, päättely
  tai aikakatkaisu) → alkuperäinen teksti palautetaan muuttumattomana, ei koskaan virhettä

Moottorin sijainti: `open-sse/services/compression/engines/llmlingua/`. Hallintapaneelin sijainti
on `Dashboard -> Context & Cache -> LLMLingua`.

### Mallit

Oletusmalli on **TinyBERT** (`atjsh/llmlingua-2-js-tinybert-meetingbank`, ~57 MB,
nopea). Tarkempi **BERT-base**-malli (`Arcoldd/llmlingua4j-bert-base-onnx`,
~710 MB) on käytettävissä moottorin määrityksen `model`-kentän kautta. `@huggingface/transformers`
lataa valitun mallin tarvittaessa HuggingFace Hubista hakemistoon
`${DATA_DIR}/models/llmlingua` ensimmäisellä kutsulla (`modelStore.ts`); `modelPath`-määrityksen
ohitus ohjaa sen sen sijaan paikalliseen kopioon (offline-ympäristöt / verkosta eristetyt asennukset).

### Valinnaiset riippuvuudet ja asennus tarvittaessa

Karsittavissa oleva LLMLingua-ajonaikainen vertaisriippuvuuspino on **valinnainen**. Kaksi pakettia on määritetty
`optionalDependencies`-riippuvuuksiksi tiedostossa `package.json`, ja tuotantokoonti pitää ne **ulkoisina**
(`scripts/build/prepublish.ts` ei sisällytä niitä):

| Paketti              | Versio (kiinnitetty) | Huomautukset                                          |
| -------------------- | -------------------- | ----------------------------------------------------- |
| `@atjsh/llmlingua-2` | `2.0.5`              | Aloituspaketti; määrittää muut vertaisriippuvuuksiksi |
| `js-tiktoken`        | `^1.0.20`            | Tokenisoija                                           |

`@huggingface/transformers` on kiinnitetty versioon `^4.2.0` (jaettu paikallisen upotuspolun kanssa ja
jäljitetään myös erilliseen pakettiin); `@atjsh/llmlingua-2@2.0.5` määrittää sen vertaisriippuvuudeksi ehdolla
`"^3.5.2 || ^4.0.0"`, joten sekä Transformers.js v3 että v4 ovat tuettuja. Versiosta 2.0.4 alkaen
`@atjsh/llmlingua-2` ei enää vaadi `@tensorflow/tfjs`-pakettia, mikä poisti suurimman yksittäisen
osan (TensorFlow.js) SLM-pinosta. Vain edellä mainitut kaksi pakettia ovat karsittavia SLM-
vertaisriippuvuuksia. Tavallinen `npm install` (kehitysympäristössä) asentaa valinnaisen pinon automaattisesti, ellei valinnaisia
riippuvuuksia jätetä pois.

**Miksi tarvittaessa:** npm:ssä julkaistu paketti, erillinen paketti ja Docker-levykuva
toimitetaan **ilman** näitä riippuvuuksia, jotta ne pysyvät pieninä. Kun riippuvuudet puuttuvat, työtekijän riippuvuustarkistus
(`@atjsh/llmlingua-2`-ratkaisutesti tiedostossa `worker.ts`) epäonnistuu ja moottori
**palautuu hiljaisesti alkuperäiseen toimintaan** — LLMLinguan valitseminen ei tee mitään (teksti palautetaan muuttumattomana eikä
virhettä kirjata). Aktivoi se karsitussa ympäristössä asentamalla valinnainen pino:

```bash
# kiinnitä package.json-tiedoston optionalDependencies-kohdassa määritettyihin versioihin
npm install @atjsh/llmlingua-2@2.0.5 js-tiktoken
```

`@tensorflow/tfjs`-paketin poistaminen (2.0.4+) poistaa aiemmin hallitsevan ~800 MB:n
osan — jäljelle jäävä tilantarve koostuu transformers.js- ja onnxruntime-node-ajoympäristöistä
sekä ensimmäisellä käyttökerralla ladattavasta TinyBERT-mallista (~57 MB), jota ei ladata npm:n kautta.

Ympäristöittäin:

- **Kehitys / `npm install`** — asennetaan automaattisesti, ellet antanut valitsinta `--omit=optional`
  (tai `--no-optional`). Toimenpiteitä ei tarvita.
- **Globaali npm (`npm i -g omniroute`) / itsenäinen asennus** — suorita yllä oleva asennuskomento
  asennetun paketin hakemistossa tai asenna uudelleen jättämättä valinnaisia riippuvuuksia pois.
- **Docker** — lisää asennuskomento johdetun levykuvan tasoon; julkaistu levykuva
  toimitetaan tarkoituksella suppeana.
- **VPS (PM2)** — asenna sovelluksen `node_modules`-hakemistoon ja käynnistä sitten prosessi uudelleen, jotta
  worker tarkistaa portin uudelleen.
- **Raaka Next-itsenäisversio (`npm run build` → `.build/next/standalone/server.js`)** — itsenäisversion
  jäljitys ei sisällä workeria EIKÄ valinnaisia riippuvuuksia, joten moottori epäonnistuu hiljaisesti avoimeen tilaan.
  `scripts/build/colocate-standalone.mjs` lisää molemmat uudelleen (workerin esbuild +
  valinnaisten riippuvuuksien sulkeuma itsenäisversion hakemistopuuhun); se suoritetaan automaattisesti
  `postbuild`-npm-koukun kautta jokaisen koonnin jälkeen. Idempotentti ja epäonnistuu hallitusti, jos riippuvuuksia ei ole.

**Varmista, että se on aktiivinen:** kun LLMLingua on valittuna, varsinainen proosateksti todella lyhenee (moottori
ei enää epäonnistu avoimeen tilaan), ja ensimmäinen pyyntö käynnistää mallin lataamisen hakemistoon
`${DATA_DIR}/models/llmlingua`. Portti tarkistaa tarkoituksella vain paketin `@atjsh/llmlingua-2` —
muut vertaisriippuvuudet ovat vain ESM-muodossa, ja `require.resolve` aiheuttaa niiden kohdalla poikkeuksen, vaikka ne olisivat asennettuina — joten
worker epäonnistuu silti avoimeen tilaan, jos jokin vertaisriippuvuus todella puuttuu `import()`-kutsun aikana.

## Pinotut käsittelyketjut

Pinottu tila suorittaa käsittelyketjun vaiheet järjestyksessä. Oletusarvo on:

```txt
rtk -> caveman
```

Käytä tätä koodausagentti-istunnoissa, joissa kehote yhdistää komentojen tulosteita ihmisen tai avustajan tuottamaan tekstiin. RTK vähentää ensin työkalulokien kohinaa, minkä jälkeen Caveman tiivistää jäljelle jäävän luonnollisen kielen.

Käsittelyketjun vaiheet määritetään pakkausasetusten `stackedPipeline`-asetuksella tai pakkausyhdistelmien kautta.

Kun molemmat moottorit pienentävät samaa käsittelykelpoista sisältöä, säästöt kertautuvat:

```txt
combined = 1 - (1 - RTK-säästö) * (1 - Caveman-syötesäästö)
average  = 1 - (1 - 0.80) * (1 - 0.46) = 89.2%
range    = 1 - (1 - 0.60..0.90) * (1 - 0.46) = 78.4-94.6%
```

## MCP:n saavutettavuuspuusuodatin

MCP:n saavutettavuuspuun älykäs suodatin on suorituksen jälkeinen pakkauskerros, joka käsittelee MCP:n **työkalutuloksia**, ei kehotteita tai kontekstia. Se kohdistuu monisanaisiin saavutettavuuspuu- ja selaimen tilannekuvasisältöihin, joita palauttavat esimerkiksi Playwright-, computer-use- ja selainautomaation MCP-palvelimet.

### Mitä se tekee

1. **Kohinan poisto** — poistaa tyhjät yleiset ja tekstimerkinnät (`- generic:`, `- text: ""`)
2. **Sisarusten tiivistäminen** — kun vähintään `collapseThreshold` (oletusarvo 30) peräkkäistä riviä sisältää rakenteellisia toistoja, ne tiivistetään ensimmäisiin `collapseKeepHead`-riveihin (oletusarvo 10), määrän yhteenvetoon ja viimeisiin `collapseKeepTail`-riveihin (oletusarvo 5)
3. **Viittausten säilyttäminen** — Playwrightin ja computer-use-työkalujen tarvitsemiin `[ref=eXX]`-ankkureihin ei koskaan kosketa
4. **Kiinteä katkaisu** — jos teksti ylittää tiivistämisen jälkeenkin `maxTextChars`-rajan (oletusarvo 50 000), se katkaistaan ja siihen lisätään navigointivihje, jotta agentti voi jatkaa työskentelyä

### Moottorin sijainti

```txt
open-sse/services/compression/engines/mcpAccessibility/
  index.ts            ← smartFilterText()-aloituskohta
  collapseRepeated.ts ← sisarusten tiivistämisalgoritmi
  constants.ts        ← DEFAULT_MCP_ACCESSIBILITY_CONFIG
```

### Määritykset

Toimintaa ohjataan yleisten asetusten `compression.mcpAccessibility`-kohdalla (migraatio 056). Oletusmääritykset:

```json
{
  "enabled": true,
  "maxTextChars": 50000,
  "collapseThreshold": 30,
  "collapseKeepHead": 10,
  "collapseKeepTail": 5,
  "minLengthToProcess": 2000
}
```

Suodatinta käytetään vain työkalutulossisältöihin, joiden `type` on `"text"` ja joiden pituus ylittää `minLengthToProcess`-arvon. Se ei vaikuta kehotteiden pakkaamiseen tai pyyntösisältöihin.

### Odotetut säästöt

Selaimen tilannekuvien työkalutuloksissa säästö on 60–80 % sivun monimutkaisuudesta riippuen. Tiivistämisalgoritmin aikavaativuus on O(n) rivien määrän suhteen, ja se lisää viivettä vain merkityksettömän vähän.

### Tämä suodatin verrattuna yllä oleviin pakkausmoottoreihin

| Ominaisuus       | Caveman / RTK / Stacked         | MCP:n saavutettavuussuodatin           |
| ---------------- | ------------------------------- | -------------------------------------- |
| Kohde            | Pyyntöjen kehotteet / konteksti | MCP-työkalutulokset                    |
| Käynnistys       | Pakkaustilan asetus             | `compression.mcpAccessibility.enabled` |
| Laajuus          | Kaikki SSE-viestit              | Vain työkalutulokset                   |
| Viittausankkurit | Ei sovellu                      | Säilytetään poikkeuksetta              |

---

## Pakkausyhdistelmät

Pakkausyhdistelmät ovat nimettyjä pakkausprofiileja, jotka voidaan liittää reititysyhdistelmiin:

- `compression_combos`: tallentaa tilan, putken, RTK-määritykset, kielimääritykset ja oletusmerkinnän
- `compression_combo_assignments`: yhdistää pakkausyhdistelmän reititysyhdistelmään
- ajonaikainen integraatio ratkaisee liitetyn pakkausyhdistelmän ennen yleisiä yhdistelmäkohtaisia ohituksia
- analytiikka sisältää kentät `compression_combo_id` ja `engine`

Hallintapaneelin sijainti: `Dashboard -> Context & Cache -> Compression Combos`.

## API-rajapinta

| Reitti                                 | Tarkoitus                                                          |
| -------------------------------------- | ------------------------------------------------------------------ |
| `/api/settings/compression`            | Yleiset pakkausasetukset (sisältää `mcpAccessibility`-määrityksen) |
| `/api/compression/preview`             | Minkä tahansa pakkaustilan esikatselu                              |
| `/api/compression/language-packs`      | Saatavilla olevien Caveman-kielipakettien luettelo                 |
| `/api/context/caveman/config`          | Caveman-asetusten alias                                            |
| `/api/context/rtk/config`              | RTK:n oletusarvot ja asetukset                                     |
| `/api/context/rtk/filters`             | RTK-suodatinluettelo                                               |
| `/api/context/rtk/test`                | RTK:n esikatselu-/testipäätepiste                                  |
| `/api/context/rtk/raw-output/[id]`     | Todennettu, peitetyn raakasyötteen palautus                        |
| `/api/context/combos`                  | Pakkausyhdistelmien CRUD-toiminnot                                 |
| `/api/context/combos/[id]/assignments` | Reititysyhdistelmien liitosten CRUD-toiminnot                      |
| `/api/context/analytics`               | Pakkausanalytiikan alias                                           |

Hallintareitit edellyttävät hallintatason todennusta tai API-avainkäytännön tarkistuksia.

## MCP-työkalut

Pakkaus tarjoaa viisi MCP-työkalua:

| Työkalu                             | Käyttöalue          | Tarkoitus                                    |
| ----------------------------------- | ------------------- | -------------------------------------------- |
| `omniroute_compression_status`      | `read:compression`  | Asetukset, analytiikka ja välimuistitilastot |
| `omniroute_compression_configure`   | `write:compression` | Yleisten asetusten päivitys                  |
| `omniroute_set_compression_engine`  | `write:compression` | Tilan ja valinnaisen putken asettaminen      |
| `omniroute_list_compression_combos` | `read:compression`  | Pakkausyhdistelmien luettelo                 |
| `omniroute_compression_combo_stats` | `read:compression`  | Yhdistelmä-/moottorianalytiikan lukeminen    |

## Soveltamisala ja poissulkemiset

**Upotuksia ei koskaan pakata.** `open-sse/handlers/embeddings.ts` ei koskaan kutsu mitään
pakkausmoottoria — pyyntö- ja vastausrungot välitetään suoraan suorittajalle muuttamattomina.
Tämä perustuu tällä hetkellä rakenteeseen (upotuksilla ja keskustelutäydennyksillä on erilliset käsittelijät), ei
ajonaikaiseen tarkistukseen, mutta se tarkoittaa, ettei kohdassa #8034 mainitulla vektorivääristymän riskillä ole vaikutuspintaa
upotuspolussa.

**Malli-/päätepistekohtainen poissulkemissuodatin (#8034).** Keskustelutäydennyksiä varten operaattori voi määrittää
mallitunnuksia / `provider/model`-kohteita, joita ei saa koskaan pakata — tämä suojamekanismi on hyödyllinen, jos
pakkaus myöhemmin kytketään lähemmäksi upotuksiin liittyvää polkua, ja yleisesti kaikille
malleille, joissa kehotteen täsmällinen tavukohtainen sisältö on tärkeä (deterministiset arvioinnit, välimuistiherkät
etuliitteet jne.).

- Asetuskenttä: `exclusions?: string[]` yleisessä pakkausmäärityksessä
  (`GET`/`PUT /api/settings/compression`), joka säilytetään olemassa olevan `key_value`-pakkauksen
  nimiavaruuden kautta (`src/lib/db/compression.ts`) — ei uutta taulua.
- Hallintapaneelin välilehti: **Hallintapaneeli → Pakkaus → Poissulkemiset**
  (`/dashboard/compression/exclusions`).
- Mallisyntaksi: `*` on ainoa jokerimerkki. Kaikki muut mallin säännöllisten lausekkeiden metamerkit
  suojataan ennen täsmäytystä, joten `gpt-5.6` vastaa vain kirjaimellista merkkijonoa, ei koskaan merkkijonoa `gpt-5x6`
  (ReDoS-turvallinen, rajattu, ei sisäkkäisiä kvanttoreita). Mallit täsmäytetään kirjainkoosta riippumatta
  sekä pelkkään mallitunnukseen että `provider/model`-yhdistelmään — `gpt-5-6`, `openai/gpt-5-6`
  ja `openai/*` toimivat kaikki, ja pelkkä `*` sulkee pois kaikki mallit.
- Täsmäytys: `isCompressionExcluded()` / `normalizeCompressionExclusions()` tiedostossa
  `open-sse/services/compression/exclusions.ts`. `chatCore.ts` tarkistaa poissuljetun kohteen
  heti pakkausasetusten ratkaisemisen jälkeen, **ennen minkään moottorin suorittamista**, ja käsittelee täsmäyksen
  aivan kuin pakkaus olisi poistettu käytöstä yleisesti — pyynnön runko on todistettavasti
  tavutasolla identtinen. Ohitus kirjataan analytiikan näkyvyyttä varten kutsulla `writeCompressionSkip(..., "excluded")`.
- Oletusarvo (tyhjä/puuttuva luettelo): toiminta on sama kuin ennen versiota #8034 — mitään ei suljeta pois.

## Tunnetut rajoitukset

- **LLMLingua-2 (SLM) vaatii rinnakkain sijoitetut valinnaiset riippuvuudet.** Työntekijä suoritetaan
  tuotantokoosteessa vain, kun `@atjsh/llmlingua-2` ja sen vertaisriippuvuudet on sijoitettu rinnakkain
  hakemistoon `dist/node_modules` (katso `scripts/build/colocateOptionals.mjs`, #4286). Ilman niitä
  moottori ohittaa virheen turvallisesti (palauttaa alkuperäisen tekstin). Työntekijän ratkaisu ei enää riipu
  `import.meta.url`-arvosta (se ei toimi itsenäisessä koosteessa), vaan ankkuroituu suorituksenaikaiseen
  cwd-arvoon / `argv[1]`-arvoon.
- **Cavemanin kielipaketit `de` / `fr` / `ja` ovat osittaisia.** Ne sisältävät `context`-,
  `filler`- ja `structural`-säännöt mutta eivät `dedup`- / `ultra`-paketteja, joten `ultra`-intensiteetti ei ole
  näillä kielillä `full`-intensiteettiä voimakkaampi (ne käyttävät vain omia sääntöjään — englannin
  `dedup`-/`ultra`-sääntöihin ei palata huomaamattomasti, sillä se vääristäisi vieraskielistä tekstiä).
  `en` / `es` / `id` / `pt-BR` ovat täydellisiä. Osittaisiin paketteihin tarkoitetut
  `dedup.json`- ja `ultra.json`-kontribuutiot ovat tervetulleita.
- **Pinottu telemetria luettelee vain pakkausta tehneet moottorit.** Pinotun käsittelyketjun vaihe, jonka
  moottori suoritettiin mutta joka tuotti 0 %:n säästön, palauttaa arvon `stats:null` eikä siksi näy
  `engineBreakdown`-tiedoissa — sitä ei voi erottaa ohitetusta vaiheesta. Tilojen
  "suoritettu, 0 %" ja "ohitettu" erottaminen vaatisi erittelymallin muuttamista, joten sitä on lykätty.

## Validointi

Tämän alueen kohdennetut tarkistukset ovat:

```bash
node --import tsx/esm --test tests/unit/compression/rtk-*.test.ts tests/unit/compression/pipeline-integration.test.ts tests/unit/compression/context-compression-api.test.ts
node --import tsx/esm --test tests/unit/compression/*.test.ts tests/golden-set/*.test.ts tests/integration/compression-pipeline.test.ts tests/unit/api/compression/compression-api.test.ts
node --import tsx/esm --test tests/unit/compression/mcpAccessibility*.test.ts
npm run typecheck:core
```
