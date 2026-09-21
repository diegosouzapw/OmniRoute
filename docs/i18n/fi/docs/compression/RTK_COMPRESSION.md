# RTK Compression (Suomi)

🌐 **Languages:** 🇺🇸 [English](../../../../compression/RTK_COMPRESSION.md) · 🇪🇹 [am](../../../am/docs/compression/RTK_COMPRESSION.md) · 🇸🇦 [ar](../../../ar/docs/compression/RTK_COMPRESSION.md) · 🇦🇿 [az](../../../az/docs/compression/RTK_COMPRESSION.md) · 🇧🇬 [bg](../../../bg/docs/compression/RTK_COMPRESSION.md) · 🇧🇩 [bn](../../../bn/docs/compression/RTK_COMPRESSION.md) · 🇨🇿 [cs](../../../cs/docs/compression/RTK_COMPRESSION.md) · 🇩🇰 [da](../../../da/docs/compression/RTK_COMPRESSION.md) · 🇩🇪 [de](../../../de/docs/compression/RTK_COMPRESSION.md) · 🇬🇷 [el](../../../el/docs/compression/RTK_COMPRESSION.md) · 🇪🇸 [es](../../../es/docs/compression/RTK_COMPRESSION.md) · 🇪🇪 [et](../../../et/docs/compression/RTK_COMPRESSION.md) · 🇮🇷 [fa](../../../fa/docs/compression/RTK_COMPRESSION.md) · 🇫🇷 [fr](../../../fr/docs/compression/RTK_COMPRESSION.md) · 🇮🇪 [ga](../../../ga/docs/compression/RTK_COMPRESSION.md) · 🇮🇳 [gu](../../../gu/docs/compression/RTK_COMPRESSION.md) · 🇳🇬 [ha](../../../ha/docs/compression/RTK_COMPRESSION.md) · 🇮🇱 [he](../../../he/docs/compression/RTK_COMPRESSION.md) · 🇮🇳 [hi](../../../hi/docs/compression/RTK_COMPRESSION.md) · 🇭🇷 [hr](../../../hr/docs/compression/RTK_COMPRESSION.md) · 🇭🇺 [hu](../../../hu/docs/compression/RTK_COMPRESSION.md) · 🇦🇲 [hy](../../../hy/docs/compression/RTK_COMPRESSION.md) · 🇮🇩 [id](../../../id/docs/compression/RTK_COMPRESSION.md) · 🇳🇬 [ig](../../../ig/docs/compression/RTK_COMPRESSION.md) · 🇮🇹 [it](../../../it/docs/compression/RTK_COMPRESSION.md) · 🇯🇵 [ja](../../../ja/docs/compression/RTK_COMPRESSION.md) · 🇬🇪 [ka](../../../ka/docs/compression/RTK_COMPRESSION.md) · 🇰🇭 [km](../../../km/docs/compression/RTK_COMPRESSION.md) · 🇮🇳 [kn](../../../kn/docs/compression/RTK_COMPRESSION.md) · 🇰🇷 [ko](../../../ko/docs/compression/RTK_COMPRESSION.md) · 🇱🇹 [lt](../../../lt/docs/compression/RTK_COMPRESSION.md) · 🇱🇻 [lv](../../../lv/docs/compression/RTK_COMPRESSION.md) · 🇮🇳 [ml](../../../ml/docs/compression/RTK_COMPRESSION.md) · 🇮🇳 [mr](../../../mr/docs/compression/RTK_COMPRESSION.md) · 🇲🇾 [ms](../../../ms/docs/compression/RTK_COMPRESSION.md) · 🇲🇹 [mt](../../../mt/docs/compression/RTK_COMPRESSION.md) · 🇲🇲 [my](../../../my/docs/compression/RTK_COMPRESSION.md) · 🇳🇵 [ne](../../../ne/docs/compression/RTK_COMPRESSION.md) · 🇳🇱 [nl](../../../nl/docs/compression/RTK_COMPRESSION.md) · 🇳🇴 [no](../../../no/docs/compression/RTK_COMPRESSION.md) · 🇮🇳 [or](../../../or/docs/compression/RTK_COMPRESSION.md) · 🇮🇳 [pa](../../../pa/docs/compression/RTK_COMPRESSION.md) · 🇵🇭 [phi](../../../phi/docs/compression/RTK_COMPRESSION.md) · 🇵🇱 [pl](../../../pl/docs/compression/RTK_COMPRESSION.md) · 🇵🇹 [pt](../../../pt/docs/compression/RTK_COMPRESSION.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/compression/RTK_COMPRESSION.md) · 🇷🇴 [ro](../../../ro/docs/compression/RTK_COMPRESSION.md) · 🇷🇺 [ru](../../../ru/docs/compression/RTK_COMPRESSION.md) · 🇱🇰 [si](../../../si/docs/compression/RTK_COMPRESSION.md) · 🇸🇰 [sk](../../../sk/docs/compression/RTK_COMPRESSION.md) · 🇸🇮 [sl](../../../sl/docs/compression/RTK_COMPRESSION.md) · 🇷🇸 [sr](../../../sr/docs/compression/RTK_COMPRESSION.md) · 🇸🇪 [sv](../../../sv/docs/compression/RTK_COMPRESSION.md) · 🇰🇪 [sw](../../../sw/docs/compression/RTK_COMPRESSION.md) · 🇮🇳 [ta](../../../ta/docs/compression/RTK_COMPRESSION.md) · 🇮🇳 [te](../../../te/docs/compression/RTK_COMPRESSION.md) · 🇹🇭 [th](../../../th/docs/compression/RTK_COMPRESSION.md) · 🇹🇷 [tr](../../../tr/docs/compression/RTK_COMPRESSION.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/compression/RTK_COMPRESSION.md) · 🇵🇰 [ur](../../../ur/docs/compression/RTK_COMPRESSION.md) · 🇺🇿 [uz](../../../uz/docs/compression/RTK_COMPRESSION.md) · 🇻🇳 [vi](../../../vi/docs/compression/RTK_COMPRESSION.md) · 🇳🇬 [yo](../../../yo/docs/compression/RTK_COMPRESSION.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/compression/RTK_COMPRESSION.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/compression/RTK_COMPRESSION.md)

---

RTK-pakkaus on OmniRouten komentotietoinen pakkausmoottori pääte- ja työkalutulosteille. Se on
suunniteltu koodausagentti-istuntoihin, joissa kontekstin kasvu johtuu enimmäkseen testilokeista, koontitulosteista,
paketinhallinnan ylimääräisestä tulosteesta, komentotulkin istuntotallenteista, Docker-tulosteista, git-tulosteista ja pinojäljityksistä.

RTK:ta voidaan käyttää suoraan asetuksella `defaultMode: "rtk"` tai pinotun käsittelyketjun ensimmäisenä vaiheena, yleensä:

```txt
rtk -> caveman
```

Tässä järjestyksessä pakataan ensin kohinainen konetuloste, minkä jälkeen Caveman tiivistää jäljelle jäävän tekstin.

Alkuperäinen RTK ilmoittaa komentotulosteiden säästöksi `60-90%`. Sen README-tiedoston esimerkki-istunto pienenee
`~118,000` vakiotokenista `~23,900` RTK-tokeniin, mikä tarkoittaa `79.7%`:n säästöä (`~80%`). OmniRoute käyttää
tätä alkuperäisen toteutuksen keskiarvoa laskiessaan pinottua säästöä Cavemanin syötepakkauksen kanssa:

```txt
RTK:n keskiarvo:  80% säästetty
Caveman-syöte:    46% säästetty
Pinottu:          1 - (1 - 0.80) * (1 - 0.46) = 89.2% säästetty
Vaihteluväli:     1 - (1 - 0.60..0.90) * (1 - 0.46) = 78.4-94.6%
```

## Mitä se pakkaa

Sisäänrakennettu luettelo sisältää tällä hetkellä 49 suodatinta seuraavissa luokissa:

| Luokka    | Esimerkkejä                                                   |
| --------- | ------------------------------------------------------------- |
| `git`     | `git status`, `git branch`, `git diff`, `git log`             |
| `test`    | Vitest, Jest, Pytest, Playwright, Go-testit, Cargo-testit     |
| `build`   | TypeScript, ESLint, Biome, Prettier, Vite, Webpack, Turbo, Nx |
| `package` | `npm install`, `npm audit`, `pip`, `uv sync`, Poetry, Bundler |
| `shell`   | `ls`, `find`, `grep`, yleiset komentotulkkilokit              |
| `docker`  | `docker ps`, Docker-lokit                                     |
| `infra`   | Terraform, OpenTofu, `systemctl status`                       |
| `generic` | JSON-tuloste, pinojäljitykset, yleinen tulosteen vararatkaisu |

Tunnistin tiedostossa `open-sse/services/compression/engines/rtk/commandDetector.ts` luokittelee tulosteen
ennen suodattimen valintaa. Suodattimet voivat täsmätä myös komentomallin tai tulosteen säännöllisen lausekkeen perusteella, kun komentoluokka
ei riitä.

## Suodattimien ratkaiseminen

RTK lataa suodattimet tässä järjestyksessä:

1. Projektisuodattimet tiedostoista `.rtk/filters.toml` ja `.rtk/filters.json`, vain kun niihin luotetaan.
2. Yleiset suodattimet tiedostoista `DATA_DIR/rtk/filters.toml` ja `DATA_DIR/rtk/filters.json`.
3. Sisäänrakennetut suodattimet hakemistosta `open-sse/services/compression/engines/rtk/filters/`.

Samassa vaikutusalueessa RTK:n TOML-skeeman v1 suodattimet ovat etusijalla OmniRouten JSON-suodattimiin nähden. TOML-muotoiset
`match_command`-lausekkeet tarkistetaan ennen komentotyyppiin perustuvaa täsmäytystä, jotta tuotu komentokohtainen
suodatin voi ohittaa saman vaikutusalueen yleisemmän suodattimen. Projektin vaikutusalue on edelleen etusijalla yleiseen
vaikutusalueeseen nähden tiedostomuodosta riippumatta.

Projektisuodattimet edellyttävät tarkoituksella erillistä luottamusta, koska säännöllisiin lausekkeisiin perustuvat suodattimet voivat muuttaa sitä, miten työkalutuloste
näytetään agenteille. Projektin suodatintiedosto hyväksytään, kun jokin seuraavista ehdoista täyttyy:

- `rtkConfig.trustProjectFilters` on `true`.
- `OMNIROUTE_RTK_TRUST_PROJECT_FILTERS=1` on asetettu.
- `.rtk/trust.json` sisältää projektin suodatintiedostoa vastaavan SHA-256-tiivisteen.

Esimerkki luottamustiedostosta:

```json
{
  "filtersSha256": "0123456789abcdef...",
  "filtersTomlSha256": "fedcba9876543210..."
}
```

Tiivisteet ovat erillisiä: `filtersSha256` myöntää luottamuksen tiedostolle `.rtk/filters.json`, kun taas `filtersTomlSha256`
myöntää luottamuksen tiedostolle `.rtk/filters.toml`. Kumman tahansa tiedoston muokkaaminen mitätöi vain sen oman luottamusmerkinnän. Yleiset tiedostot
ovat järjestelmänvalvojan asentamia ja käyttävät nykyistä yleisten suodattimien luottamuskäytäntöä.

Mukautetut suodattimet voivat olla yksi suodatinobjekti tai suodatinobjektien taulukko. Virheelliset mukautetut suodattimet
ohitetaan ja ilmoitetaan `/api/context/rtk/filters`-diagnostiikassa. Virheelliset sisäänrakennetut suodattimet aiheuttavat välittömän virheen.

## RTK TOML -skeeman v1-yhteensopivuus

OmniRoute voi jäsentää, validoida, testata ja asentaa deklaratiivisia suodatintiedostoja, jotka käyttävät RTK TOML -skeeman versiota 1.
Tuetut kentät ovat `description`, `match_command`, `strip_ansi`, `filter_stderr`,
`strip_lines_matching`, `keep_lines_matching`, `replace`, `match_output`, `truncate_lines_at`,
`head_lines`, `tail_lines`, `max_lines`, `on_empty` ja sisäiset `[[tests.<filter>]]`-testit.
Tuntemattomat kentät, virheelliset tai vaaralliset säännölliset lausekkeet, samanaikaiset poisto- ja säilytyssäännöt, yli
1 MiB:n tiedostot sekä viittaukset tuntemattomiin suodattimiin hylätään. Tiedosto, jonka sisäiset testit epäonnistuvat, voidaan
validoida tarkastelua varten, mutta sitä ei voi asentaa tai ladata. Mukautettujen tiedostojen latausvirheet noudattavat edelleen
fail-open-periaatetta: virheellinen tiedosto ohitetaan, ja jäljellä olevat suodattimet jatkavat toimintaansa.

OmniRoute vastaanottaa työkalun tulosteen vasta sen jälkeen, kun asiakasohjelma on jo tallentanut sen, joten `filter_stderr = true`
ei voi muuttaa prosessin tulosteen tallennusta. Kenttä hyväksytään, mutta sillä ei ole vaikutusta, ja validointi palauttaa varoituksen.
Tätä kuvataan tarkoituksella **RTK TOML -skeeman v1-yhteensopivuudeksi**, ei täydelliseksi yhteensopivuudeksi
RTK-suoritettavan tiedoston, komentotulkin koukkujen, Rust-komentototeutusten tai sen luottamussäilön rakenteen kanssa.

Hallintapaneelin edistynyt RTK-näkymä hyväksyy liitetyn tai palvelimeen ladatun TOML-sisällön. Validointi on vain luku -toiminto.
Asennus kirjoittaa tiedoston `DATA_DIR/rtk/filters.toml` atomisesti rajoitetuin käyttöoikeuksin ja päivittää
aktiivisen suodatinluettelon ilman uudelleenkäynnistystä. Olemassa olevan tiedoston korvaaminen edellyttää nimenomaista `overwrite`-vahvistusta,
ja toiminto luo ensin tiedoston `DATA_DIR/rtk/filters.toml.bak`.

## Suodattimien DSL

Suodattimet käyttävät dokumentissa [Pakkaussääntöjen muoto](./COMPRESSION_RULES_FORMAT.md) kuvattua JSON-skeemaa.
Ajonaikainen järjestelmä suorittaa nämä vaiheet seuraavassa järjestyksessä:

```txt
stripAnsi -> filterStderr -> replace -> matchOutput -> rivien poistaminen/sisällyttäminen
  -> truncateLineAt -> head/tail/maxLines -> onEmpty
```

Tärkeät kentät:

| Kenttä                       | Tarkoitus                                                                       |
| ---------------------------- | ------------------------------------------------------------------------------- |
| `rules.stripAnsi`            | Poista päätteen väri- ja ohjaussekvenssit ennen täsmäytystä                     |
| `rules.filterStderr`         | Normalisoi yleiset stderr-etuliitteet ennen täsmäytystä/suodatusta              |
| `rules.replace`              | Suorita järjestetyt säännöllisten lausekkeiden korvaukset                       |
| `rules.matchOutput`          | Palauta tiivis yhteenveto, kun tuloste vastaa tunnettua tilannetta              |
| `rules.matchOutput[].unless` | Ohita oikopolku, kun virhe- tai epäonnistumismalli esiintyy                     |
| `rules.dropPatterns`         | Poista tarpeettoman meluisat rivit                                              |
| `rules.includePatterns`      | Suosi toimintaa edellyttäviä rivejä                                             |
| `rules.collapsePatterns`     | Yhdistä toistuvat täsmäävät rivit                                               |
| `rules.deduplicate`          | Suodatinkohtainen valinnainen toiminto: yhdistä peräkkäiset kaksoiskappalerivit |
| `rules.truncateLineAt`       | Unicode-turvallinen rivikohtainen katkaisu                                      |
| `rules.onEmpty`              | Varaviesti, jos kaikki rivit suodatetaan pois                                   |
| `tests[]`                    | Vahvistusportin käyttämät sisäiset esimerkit                                    |

Sisäänrakennettujen suodattimien odotetaan sisältävän sisäisiä `tests[]`-esimerkkejä. Myös mukautettujen suodattimien tulisi sisältää
niitä, erityisesti silloin, kun suodattimia jaetaan projektien kesken.

## Rivien duplikaattien poisto (kaksi tasoa)

RTK yhdistää päällekkäiset rivit kahdella toisistaan riippumattomalla tasolla:

1. **Suodatinkohtainen `deduplicate` (valinnainen, oletus `false`).** Suodatin voi määrittää asetuksen `rules.deduplicate: true`
   yhdistääkseen peräkkäiset päällekkäiset rivit _kyseisen suodattimen täsmäämässä tulosteessa_ ennen katkaisua.
   Tämä suoritetaan tiedoston `lineFilter.ts` sisällä. Vanhoille suodattimille se otetaan automaattisesti käyttöön, kun suodatin määrittää
   `collapsePatterns`-asetuksen. Skeema: `deduplicate: z.boolean().default(false)` tiedostossa
   `open-sse/services/compression/engines/rtk/filterSchema.ts`.
2. **Koko moottorin `deduplicateThreshold` (oletus `3`).** Kun kaikki suodattimet on suoritettu, moottori yhdistää
   koko tuloksesta kaikki vähintään `deduplicateThreshold` identtisen peräkkäisen rivin jaksot
   (`deduplicateRepeatedLines`, käytössä tiedostossa `engines/rtk/index.ts`). Normalisoinnissa arvon rajat ovat 2–100.

Suodatinkohtainen vaihe suoritetaan ensin (suodattimen sisällä) ja koko moottorin kattava vaihe viimeisenä (yhdistetylle
tulosteelle), joten ne toimivat yhdessä ilman kaksinkertaista laskentaa.

## Rivien ryhmittely (`enableGrouping`)

Kun `rtkConfig.enableGrouping` on `true` (oletus `false`), RTK suorittaa duplikaattien poiston jälkeiselle tulokselle lisäksi `groupSimilarLines`-vaiheen,
joka yhdistää peräkkäiset _lähes vastaavat_ (eivät tavutasolla identtiset)
rivit. `rtkConfig.groupingThreshold` (oletus `3`) on ryhmittelyn käynnistävä jakson vähimmäispituus.
Tämä on `deduplicateThreshold`-asetuksen rakenteellinen vastine: duplikaattien poisto käsittelee täsmälliset toistot,
ryhmittely puolestaan ”saman muodon pienin eroin”. Molemmat asetukset ovat osa `key_value`-tauluun tallennettua
`rtkConfig`-JSON-objektia (katso yllä oleva Määritys), joten asetus säilyy uudelleenkäynnistysten välillä.

## Koodikommenttien poistaminen (`stripCodeComments` / `preserveDocstrings`)

Kun `rtkConfig.applyToCodeBlocks` on käytössä, RTK voi myös poistaa kommentit aidatuista koodilohkoista:

- `stripCodeComments` (oletus `false`) — valinnainen. Kun arvo on `true`, RTK poistaa kommentit JavaScript-
  ja TypeScript-koodilohkoista. Aiemmin asetus luettiin mutta sitä ei koskaan sovellettu, joten oletuksena kommentit
  säilytetään, jotta tuotantoon ei tule huomaamatonta muutosta.
- `preserveDocstrings` (oletus `true`) — kommentteja poistettaessa JSDoc-/`/** … */`-lohkokommentit
  säilytetään (ne sisältävät API-dokumentaatiota, jonka arvo ylittää niiden viemän tavumäärän). Aseta arvoksi `false`, jos haluat poistaa
  myös ne.

Kommenttien poisto on toteutettu tiedostossa `open-sse/services/compression/engines/rtk/codeStripper.ts`. Se käyttää
**TypeScript-jäsennintä** (ei säännöllistä lauseketta), jotta merkkijono-, malline- ja säännöllisten lausekkeiden literaaleja ei koskaan tulkita virheellisesti
kommenteiksi. Lisäksi toiminto keskeytetään kokonaan, jos JSX:ää havaitaan (jotta JSX:n lausekesäilöjen kommentit eivät
koskaan vioitu). Kommenttien poisto koskee tällä hetkellä **vain JavaScriptiä ja TypeScriptiä** — muissa
poistajan `CodeLanguage`-joukon kielissä (Python, Rust, Go, Ruby, Java) tyhjät rivit ja
tyhjätilat yhdistetään, mutta kommentteja ei poisteta. Käsitellyn lohkon suoritus merkitään `rulesApplied`-kentässä tunnisteella `rtk:code-strip`.

> **Huomautus — GCF / taulukkomuotoinen koodaus on erillinen moottori.** RTK **ei** sisällä ”GCF”-
> (Graph Compact Format) taulukko-/sarakemuotoista JSON-kooderia. Kyseinen kooderi — joka korvasi vanhemman
> `omni-tabular`-kooderin — sijaitsee **headroom**-moottorissa
> (`open-sse/services/compression/engines/headroom/`, ja mukana toimitettu koodekki hakemistossa
> `headroom/gcf/`). Se ei liity tässä dokumentoituun RTK-suodatinputkeen.

## Määritykset

Yleiset asetukset ovat käytettävissä osoitteessa `/api/settings/compression`. RTK-kohtaiset asetukset ovat myös
käytettävissä osoitteessa `/api/context/rtk/config`.

```json
{
  "defaultMode": "stacked",
  "autoTriggerMode": "stacked",
  "autoTriggerTokens": 32000,
  "stackedPipeline": [
    { "engine": "rtk", "intensity": "standard" },
    { "engine": "caveman", "intensity": "full" }
  ],
  "rtkConfig": {
    "enabled": true,
    "intensity": "standard",
    "applyToToolResults": true,
    "applyToCodeBlocks": false,
    "applyToAssistantMessages": false,
    "enabledFilters": [],
    "disabledFilters": [],
    "maxLinesPerResult": 120,
    "maxCharsPerResult": 12000,
    "deduplicateThreshold": 3,
    "customFiltersEnabled": true,
    "trustProjectFilters": false,
    "rawOutputRetention": "never",
    "rawOutputMaxBytes": 1048576,
    "enableGrouping": false,
    "groupingThreshold": 3,
    "stripCodeComments": false,
    "preserveDocstrings": true
  }
}
```

`enabledFilters` ja `disabledFilters` käyttävät suodatintunnuksia, kuten `test-vitest` tai `git-diff`.

`rtkConfig`-objektin koko rakenne määritellään `RtkConfig`- / `DEFAULT_RTK_CONFIG`-määrityksillä tiedostossa
`open-sse/services/compression/types.ts`. Koko objekti säilytetään yhtenä JSON-arvona
SQLiten `key_value`-taulussa arvoilla `namespace = "compression"`, `key = "rtkConfig"`
(`src/lib/db/compression.ts`), ja `normalizeRtkConfig` normalisoi sen luettaessa. Näin ollen kaikki alla olevat
kentät — mukaan lukien `enableGrouping`, `groupingThreshold`, `stripCodeComments` ja `preserveDocstrings` —
kulkevat saman tallennuksen kautta molempiin suuntiin ja säilyvät uudelleenkäynnistyksen jälkeen.

| Avain                  | Oletusarvo | Tarkoitus                                                                                                 |
| ---------------------- | ---------- | --------------------------------------------------------------------------------------------------------- |
| `deduplicateThreshold` | `3`        | Koko moottoria koskeva: identtisten peräkkäisten rivien vähimmäismäärä tiivistämistä varten (rajat 2–100) |
| `enableGrouping`       | `false`    | Valinnainen: tiivistä lähes vastaavien peräkkäisten rivien jaksot                                         |
| `groupingThreshold`    | `3`        | Samankaltaisten peräkkäisten rivien vähimmäismäärä, joka käynnistää ryhmittelyn                           |
| `stripCodeComments`    | `false`    | Valinnainen: poista kommentit aidatuista koodilohkoista (edellyttää `applyToCodeBlocks`-asetusta)         |
| `preserveDocstrings`   | `true`     | Säilytä JSDoc-/`/** … */`-lohkot kommentteja poistettaessa                                                |

## API

| Reitti                             | Menetelmä | Tarkoitus                                                 |
| ---------------------------------- | --------- | --------------------------------------------------------- |
| `/api/context/rtk/config`          | GET       | Lue RTK-määritykset                                       |
| `/api/context/rtk/config`          | PUT       | Päivitä RTK-määritykset                                   |
| `/api/context/rtk/filters`         | GET       | Listaa suodatinluettelo ja latausdiagnostiikka            |
| `/api/context/rtk/import`          | POST      | Validoi tai asenna RTK TOML -skeeman version 1 tiedostoja |
| `/api/context/rtk/test`            | POST      | Esikatsele yhden tekstihyötykuorman RTK-pakkausta         |
| `/api/context/rtk/raw-output/[id]` | GET       | Lue säilytetty ja peitetty raakatuotos                    |
| `/api/compression/preview`         | POST      | Esikatsele mitä tahansa pakkaustilaa                      |

RTK-testihyötykuorma:

```json
{
  "command": "npm test",
  "text": "FAIL tests/example.test.ts\nAssertionError: expected true\nTest Files 1 failed",
  "config": {
    "intensity": "standard"
  }
}
```

Pakkauksen esikatselun hyötykuorma:

```json
{
  "mode": "stacked",
  "messages": [
    {
      "role": "tool",
      "content": "FAIL tests/example.test.ts\nAssertionError: expected true\nTest Files 1 failed"
    }
  ],
  "config": {
    "rtkConfig": {
      "rawOutputRetention": "failures"
    }
  }
}
```

Hallintareitit edellyttävät hallintapaneelin hallintatodennusta tai vastaavaa API-avainkäytäntöä.

RTK TOML -validoinnin hyötykuorma:

```json
{
  "action": "validate",
  "content": "schema_version = 1\n\n[filters.my-tool]\nmatch_command = \"^my-tool\\\\b\"\nmax_lines = 20\n"
}
```

Asenna validoitu tiedosto yleisesti käyttämällä arvoa `"action": "install"`. Lisää `"overwrite": true` vasta,
kun olet tarkistanut ja vahvistanut olemassa olevan yleisen tiedoston korvaamisen.

## Raakatulosteen palautus

RTK palauttaa tavallisesti vain pakatun tekstin. Vianmääritystä varten `rawOutputRetention` voi säilyttää sensuroidun
raakatulosteen:

| Arvo       | Toiminta                                                       |
| ---------- | -------------------------------------------------------------- |
| `never`    | Älä säilytä raakatulostetta                                    |
| `failures` | Säilytä vain todennäköisiin epäonnistumisiin liittyvä tuloste  |
| `always`   | Säilytä kaikki pakatut RTK-raakatulosteet sensuroinnin jälkeen |

Säilytetyt tiedostot kirjoitetaan hakemistoon:

```txt
DATA_DIR/rtk/raw-output/
```

Salaisuudet sensuroidaan ennen tallennusta. Tämä koskee esimerkiksi yleisiä bearer-tunnuksia, API-avaimia, Slack-tunnuksia,
AWS-käyttöavaimia sekä sijoitusmuotoisia `token=...`-, `secret=...`- ja `password=...`-arvoja. Analytiikkaan
tallennetaan vain viitetunnus sekä koko- ja tiivistemetatiedot.

## Varmennusportti

Kohdennettu varmennusportti suorittaa sisäänrakennetut inline-suodatintestit käynnistämättä ulkoisia komentoja komentotulkin kautta:

```bash
node --import tsx/esm --test tests/unit/compression/rtk-verify.test.ts
```

Laajempi RTK-portti on:

```bash
node --import tsx/esm --test \
  tests/unit/compression/rtk-*.test.ts \
  tests/unit/compression/pipeline-integration.test.ts \
  tests/unit/compression/context-compression-api.test.ts
```

Suorita laaja pakkausportti ennen julkaisua:

```bash
node --import tsx/esm --test \
  tests/unit/compression/*.test.ts \
  tests/golden-set/*.test.ts \
  tests/integration/compression-pipeline.test.ts \
  tests/unit/api/compression/compression-api.test.ts
```

## RTK:n laajentaminen

1. Lisää suodattimen JSON-tiedosto tai päivitä sitä.
2. Sisällytä vähintään yksi `tests[]`-esimerkki, joka todentaa tärkeän toiminnan.
3. Lisää uusille komentoperheille testiaineisto hakemistoon `tests/unit/compression/fixtures/rtk/`.
4. Lisää komentojen tunnistuksen testikattavuus, kun otat käyttöön uuden tulosteluokan.
5. Suorita varmennusportti ja laajemmat RTK-portit.
6. Jos suodatin on projektikohtainen, commitoi `.rtk/filters.json` ja päivitä `.rtk/trust.json` vasta katselmoinnin jälkeen.

---

## Intensiteettitasot (v3.8.16+)

RTK tukee **kolmea intensiteettitasoa**, jotka tasapainottavat **pakkauksen aggressiivisuutta** ja **turvallisuutta**. Taso asetetaan moottorin määrityksen `config.intensity`-arvolla.

### Kolme tasoa

| Taso                | Katkaisukynnys         | Tunnistesäästö | Riski          | Soveltuu parhaiten                        |
| ------------------- | ---------------------- | -------------- | -------------- | ----------------------------------------- |
| `minimal`           | 24 riviä osiota kohden | ~20-40%        | Erittäin pieni | Tuotantoon, jossa konteksti on kriittinen |
| `standard` (oletus) | 24 riviä osiota kohden | ~50-70%        | Pieni          | Päivittäisiin koodausistuntoihin          |
| `aggressive`        | 16 riviä osiota kohden | ~70-90%        | Keskisuuri     | Pitkiin istuntoihin ja maksimisäästöihin  |

### Missä katkaisu tapahtuu

Katkaisukynnys vaikuttaa tiedostoon `lineFilter.ts`:

```ts
// Tiedostosta open-sse/services/compression/engines/rtk/index.ts:329-330
config.intensity === "aggressive" ? 16 : 24,
config.intensity === "aggressive" ? 16 : 24,
```

Kunkin osion **alku** ja **loppu** säilytetään; keskellä oleva sisältö poistetaan, kun katkaisu aktivoituu.

### Mikä säilyy ja mikä poistetaan

| Sisältö                         | minimal         | standard        | aggressive      |
| ------------------------------- | --------------- | --------------- | --------------- |
| Virheet / pinojäljet            | ✅ säilytetään  | ✅ säilytetään  | ✅ säilytetään  |
| Testien epäonnistumiset         | ✅ säilytetään  | ✅ säilytetään  | ✅ säilytetään  |
| Koontivirheet                   | ✅ säilytetään  | ✅ säilytetään  | ✅ säilytetään  |
| Läpäistyt testit (monisanaiset) | ✅ säilytetään  | 🟡 tiivistetään | 🟡 tiivistetään |
| Rutiinituloste (infolokit)      | 🟡 tiivistetään | 🟡 tiivistetään | ❌ poistetaan   |
| Edistymispalkit                 | 🟡 tiivistetään | ❌ poistetaan   | ❌ poistetaan   |
| Bannerit / ASCII-taide          | 🟡 tiivistetään | ❌ poistetaan   | ❌ poistetaan   |

### Oikean intensiteetin valitseminen

```
                  Onko kontekstin menettäminen katastrofaalista?
                  │
      ┌───────────┼───────────┐
      │           │           │
    KYLLÄ        EI          EN OSAA SANOA
      │           │           │
      ▼           │           │
   minimal        │           │
      │           │           │
      │           ▼           ▼
      │      Kuinka tärkeää  Kokeile ensin `standard`-tasoa
      │      suorituskyky    (toimii 80 %:ssa
      │      on?             tapauksista)
      │           │
      │      ┌────┴────┐
      │      │         │
      │    VÄHÄINEN  SUURI
      │      │         │
      │      ▼         ▼
      │   standard   aggressive
      │      │         │
      └──────┴─────────┘
```

### Intensiteetin määrittäminen

**Yhdistelmäkohtaisesti** (yhdistelmän määrityksessä):

```json
{
  "combo": "my-coding-combo",
  "routing": {/* ... */},
  "compression": {
    "engine": "rtk",
    "intensity": "aggressive"
  }
}
```

**Ohjelmallisesti**:

`rtkEngine` (`@omniroute/open-sse/services/compression/engines/rtk`) on
`CompressionEngine`, eikä sillä ole `updateConfig`-metodia. Päivitä moottorin määritys
sen sijaan rekisterin apufunktion kautta:

```ts
import { updateEngineConfig } from "@omniroute/open-sse/services/compression/engines/registry";

updateEngineConfig("rtk", { intensity: "aggressive" });
```

### Vaikutuksen varmentaminen

Varmista **varmennusportin** avulla (katso jäljempänä), että suodatin on turvallinen valitsemallasi intensiteetillä:

```ts
import { runRtkFilterTests } from "omniroute/compression/engines/rtk/verify";

const result = runRtkFilterTests({ intensity: "aggressive" });
if (!result.passed) {
  console.error("Suodattimet epäonnistuivat aggressive-intensiteetillä");
}
```

---

## Mukautettujen suodattimien kehittäminen (v3.8.16+)

Hakemisto `engines/rtk/filters/` sisältää **yli 49 sisäänrakennettua JSON-suodatintiedostoa**. Voit lisätä omia suodattimia pakataksesi sellaisten mukautettujen työkalujen tulosteen, joita oletusasetukset eivät kata.

### Suodattimen skeema (Zod)

```ts
{
  "id": "string",                      // Pakollinen. Suodattimen tunniste (kebab-case, esim. "python-traceback")
  "label": "string",                   // Pakollinen. Ihmisen luettavissa oleva suodattimen nimi
  "description": "string",             // Valinnainen (oletus: ""). Lyhyt kuvaus suodattimen toiminnasta
  "category": "git|test|build|shell|docker|package|infra|cloud|generic",
  "priority": number,                  // Valinnainen (0–100, oletus: 50). Suoritusjärjestys (suurempi = ensin)
  "match": {
    "commands": ["string"],            // Täsmättävät komentojen nimet (esim. "python", "pytest")
    "patterns": ["string"],            // Tulosteeseen täsmättävät regex-lausekkeet
    "outputTypes": ["string"]          // Tunnistetut tulosteluokat (esim. "test-failure")
  },
  "rules": {
    "stripAnsi": boolean,              // Valinnainen (oletus: false). Poista ANSI-värikoodit
    "replace": [                       // Etsi ja korvaa -säännöt (oletus: [])
      { "pattern": "regex", "replacement": "..." }
    ],
    "matchOutput": [                   // Lopeta käsittely heti, kun lauseke täsmää (oletus: [])
      {
        "pattern": "regex",
        "message": "short summary",
        "unless": "regex"              // Ohita, jos tämä lauseke täsmää
      }
    ],
    "includePatterns": ["string"],     // Säilytettävät rivit (regex-lausekkeet, oletus: [])
    "dropPatterns": ["string"],        // Poistettavat rivit (regex-lausekkeet, oletus: [])
    "collapsePatterns": ["string"],    // Yhdeksi esiintymäksi tiivistettävät rivit (oletus: [])
    "deduplicate": boolean,            // Valinnainen (oletus: false). Poista päällekkäiset rivit
    "truncateLineAt": number,          // Valinnainen (oletus: 0). Katkaise rivit enimmäispituuteen
    "maxLines": number,                // Valinnainen (oletus: 0). Rivien kokonaismäärän ehdoton yläraja
    "headLines": number,               // Valinnainen (oletus: 20). Säilytä täsmänneen tulosteen ensimmäiset N riviä
    "tailLines": number,               // Valinnainen (oletus: 20). Säilytä täsmänneen tulosteen viimeiset N riviä
    "onEmpty": "string",               // Valinnainen (oletus: ""). Varaviesti, jos kaikki rivit suodatetaan pois
    "filterStderr": boolean            // Valinnainen (oletus: false). Suodata myös stderr-tuloste
  },
  "preserve": {
    "errorPatterns": ["string"],       // Lausekkeet, jotka on aina säilytettävä (oletus: [])
    "summaryPatterns": ["string"]      // Loppuyhteenvetorivin lausekkeet (oletus: [])
  },
  "tests": [                           // Sisäiset varmennustestit (oletus: [])
    {
      "name": "string",               // Pakollinen. Testin nimi
      "input": "sample output",        // Pakollinen. Esimerkkisyöte
      "expected": "expected output",   // Pakollinen. Odotettu pakattu tuloste
      "command": "optional command"    // Valinnainen. Komentokonteksti
    }
  ]
}
```

### Esimerkki: Python-pinojälkisuodatin

```json
{
  "id": "python-traceback",
  "label": "Python Traceback Filter",
  "description": "Compresses Python tracebacks to essential file/line locations and error type",
  "category": "test",
  "priority": 60,
  "match": {
    "commands": ["python", "python3", "pytest", "uv", "poetry"],
    "patterns": ["Traceback \\(most recent call last\\)", "Error", "Exception"],
    "outputTypes": ["error-traceback"]
  },
  "rules": {
    "stripAnsi": true,
    "includePatterns": [
      "Traceback \\(most recent call last\\)",
      "^\\s*File \".+\", line \\d+",
      "^\\s*[A-Z][a-zA-Z]+Error:",
      "^\\s*[A-Z][a-zA-Z]+Exception"
    ],
    "dropPatterns": ["site-packages/", "^\\s+[a-z_]+\\([^)]*\\)$"],
    "headLines": 5,
    "tailLines": 3,
    "maxLines": 25,
    "filterStderr": true
  },
  "preserve": {
    "errorPatterns": ["Error:", "Exception:", "Traceback"],
    "summaryPatterns": ["^[A-Z][a-zA-Z]+(?:Error|Exception):"]
  },
  "tests": [
    {
      "name": "preserves-error-type-and-location",
      "input": "Traceback (most recent call last):\n  File \"app.py\", line 42, in main\n    do_thing()\n  File \"lib/utils.py\", line 17, in helper\n    return 1 / 0\nZeroDivisionError: division by zero",
      "expected": "Traceback (most recent call last):\n  File \"app.py\", line 42, in main\n  File \"lib/utils.py\", line 17, in helper\nZeroDivisionError: division by zero",
      "command": "python app.py"
    }
  ]
}
```

### Mukautettujen suodattimien lataaminen

Sijoita tiedosto tunnistettuun sijaintiin:

```
~/.omniroute/rtk/filters/my-filter.json     # Käyttäjätaso
<project>/.rtk/filters/my-filter.json      # Projektitaso
```

Suodattimet ladataan automaattisesti käynnistyksen yhteydessä `open-sse/services/compression/engines/rtk/filterLoader.ts`-tiedoston `loadRtkFilters()`-toiminnolla. Lataaja etsii suodattimia seuraavista sijainneista:

- Sisäänrakennettu luettelo: `open-sse/services/compression/engines/rtk/filters/`
- Käyttäjähakemisto: `~/.omniroute/rtk/filters/`
- Projektihakemisto: `<project>/.rtk/filters/`

Suodattimien lataaminen ohjelmallisesti:

```ts
import { loadRtkFilters } from "@omniroute/open-sse/services/compression/engines/rtk/filterLoader";

// Valinnat: customFiltersEnabled (lataa käyttäjä- ja projektisuodattimet, oletuksena käytössä),
// trustProjectFilters, refresh.
const filters = loadRtkFilters({ customFiltersEnabled: true });
```

### Validointi

Suodattimet validoidaan ladattaessa Zod-skeemaa vasten. Rakenteeltaan virheellisen suodattimen lataaminen epäonnistuu ja virhe kirjataan lokiin:

```
RTK_FILTER_LOADER: suodattimen "my-filter" validointi epäonnistui:
  - rules.replace.0.pattern: Virheellinen regex-lauseke
  - match.commands: ei saa olla tyhjä
```

Voit validoida kaikki asennetut suodattimet kutsumalla `runRtkFilterTests()`-toimintoa, joka viedään `open-sse/services/compression/engines/rtk/verify.ts`-tiedostosta.

### Parhaat käytännöt

1. **Sisällytä aina `tests[]`** — ne todistavat suodattimesi toimivuuden ja estävät regressiot
2. **Käytä `matchOutput`-kenttää oikopoluissa** — jos yksi rivi kertoo kaiken oleellisen, korvaa koko lohko
3. **Suosi `keep`-kenttää `strip`-kentän sijaan** — eksplisiittiset ”säilytä aina” -säännöt ovat turvallisempia kuin ”poista aina” -säännöt
4. **Testaa kaikilla kolmella intensiteettitasolla** — `minimal` ei saisi tehdä mitään, ja `aggressive`-tason tulisi silti säilyttää virheet
5. **Käytä `unless`-kenttää** — suojaa oikopolut ehdolla ”älä aktivoi, jos X esiintyy”

---

## Raakatulosteen palautus ja varmennusportti

Kun RTK pakkaa tulostetta aggressiivisesti, voit **palauttaa alkuperäisen tekstin** virheenkorjausta, auditointia tai uudelleentoistoa varten.

### Näin raakatulosteen palautus toimii

```
Alkuperäinen tuloste (10K tokenia)
        │
        ▼
RTK-pakkaus (rawOutput.enabled=true)
        │
        ├─▶ Pakattu tuloste (2K tokenia)       ──▶ LLM:lle
        │
        └─▶ Alkuperäinen tuloste (10K tokenia) ──▶ tallennetaan tietokantaan
                                                      (linkitetty request_id-tunnuksella)
```

### Raakatulosteen tallennuksen käyttöönotto

**Pyyntökohtaisesti** (yhdistelmäkonfiguraatiossa):

```json
{
  "compression": {
    "engine": "rtk",
    "intensity": "aggressive",
    "rawOutput": {
      "enabled": true,
      "maxBytes": 1048576 // 1MB:n enimmäisraja
    }
  }
}
```

**Oletus**: `rawOutput.enabled: false` (säästää tallennustilaa).

### Tallennuskustannus

| Pyyntökohtaisesti              | 1MB:n raja     | 10MB:n raja     |
| ------------------------------ | -------------- | --------------- |
| Keskimääräinen pakattu tuloste | ~5KB           | ~5KB            |
| Tallennettu raakatuloste       | ~50-500KB      | ~500KB-5MB      |
| 1000 pyyntöä päivässä          | 50-500MB/päivä | 500MB-5GB/päivä |

> **Suositus**: Ota raakatuloste käyttöön vain **virheenkorjausistuntoja** tai **otantaan perustuvaa auditointia** varten, älä jatkuvasti.

### Alkuperäisen tulosteen palauttaminen

```ts
import { readRtkRawOutput } from "omniroute/compression/engines/rtk/rawOutput";

const raw = readRtkRawOutput(pointerId); // pointerId pakkaustilastoista
if (raw) {
  console.log("Original output:", raw);
}
```

`pointerId` palautetaan pakkauksen jälkeen taulukossa `CompressionStats.rtkRawOutputPointers[]`.
Funktion allekirjoitus on tiedostossa `open-sse/services/compression/engines/rtk/rawOutput.ts:102`.

### Varmennusportti

**RTK-suodattimien varmennus** (`open-sse/services/compression/engines/rtk/verify.ts`) validoi kaikki suodattimet niiden `tests[]`-testejä vasten ja varmistaa toiminnan oikeellisuuden kaikilla kolmella intensiteettitasolla.

**Suorita varmennus kutsumalla `runRtkFilterTests()`**:

```ts
import { runRtkFilterTests } from "open-sse/services/compression/engines/rtk/verify";

const result = runRtkFilterTests();
console.log(`Passed: ${result.outcomes.filter((o) => o.passed).length}`);
console.log(`Failed: ${result.outcomes.filter((o) => !o.passed).length}`);
if (!result.passed) {
  console.error("Filters failed verification");
  result.outcomes
    .filter((o) => !o.passed)
    .forEach((o) => {
      console.error(
        `  - ${o.filterId} / ${o.testName}: expected "${o.expected}", got "${o.actual}"`
      );
    });
}
```

**Mitä se validoi**:

1. Jokainen suodatin latautuu ja läpäisee skeemavalidoinnin
2. Jokainen `tests[]`-merkintä tuottaa odotetun tulosteen
3. `minimal`-intensiteetti ei tee muutoksia (säilyttää alkuperäisen ja käyttää vain rakenteellisia suodattimia)
4. `aggressive`-intensiteetti säilyttää virheet, epäonnistuneet testit ja pinon jäljitykset
5. Pakattu tuloste ei koskaan ole alkuperäistä syötettä suurempi

- Lähde: `open-sse/services/compression/engines/rtk/` (63 tiedostoa, ~70KB)

- **Ennen suodatinmuutoksen yhdistämistä** — varmista aina, että testit läpäistään
- **RTK-moottorin päivittämisen jälkeen** — skeema on saattanut muuttua
- **Säännöllisesti valvonnan yhteydessä** — suojaa testikalusteiden ajautumiselta
- **Kun lisäät uuden työkalu- tai komentoperheen** — osoittaa uuden suodattimen toimivan

---

## Katso myös

- [COMPRESSION_GUIDE.md](./COMPRESSION_GUIDE.md) — Pakkausputken kattava yleiskatsaus
- [COMPRESSION_ENGINES.md](./COMPRESSION_ENGINES.md) — Moottorirekisteri ja sisäänrakennetut moottorit
- [EXTENDING_COMPRESSION.md](./EXTENDING_COMPRESSION.md) — Mukautetut moottorit, kielipaketit ja pinotut käsittelyputket
- Lähdekoodi: `open-sse/services/compression/engines/rtk/` (63 tiedostoa, ~70 kt)
