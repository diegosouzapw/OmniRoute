# Compression Rules Format (Suomi)

🌐 **Languages:** 🇺🇸 [English](../../../../compression/COMPRESSION_RULES_FORMAT.md) · 🇪🇹 [am](../../../am/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇸🇦 [ar](../../../ar/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇦🇿 [az](../../../az/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇧🇬 [bg](../../../bg/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇧🇩 [bn](../../../bn/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇨🇿 [cs](../../../cs/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇩🇰 [da](../../../da/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇩🇪 [de](../../../de/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇬🇷 [el](../../../el/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇪🇸 [es](../../../es/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇪🇪 [et](../../../et/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇮🇷 [fa](../../../fa/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇫🇷 [fr](../../../fr/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇮🇪 [ga](../../../ga/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇮🇳 [gu](../../../gu/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇳🇬 [ha](../../../ha/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇮🇱 [he](../../../he/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇮🇳 [hi](../../../hi/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇭🇷 [hr](../../../hr/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇭🇺 [hu](../../../hu/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇦🇲 [hy](../../../hy/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇮🇩 [id](../../../id/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇳🇬 [ig](../../../ig/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇮🇹 [it](../../../it/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇯🇵 [ja](../../../ja/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇬🇪 [ka](../../../ka/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇰🇭 [km](../../../km/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇮🇳 [kn](../../../kn/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇰🇷 [ko](../../../ko/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇱🇹 [lt](../../../lt/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇱🇻 [lv](../../../lv/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇮🇳 [ml](../../../ml/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇮🇳 [mr](../../../mr/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇲🇾 [ms](../../../ms/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇲🇹 [mt](../../../mt/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇲🇲 [my](../../../my/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇳🇵 [ne](../../../ne/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇳🇱 [nl](../../../nl/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇳🇴 [no](../../../no/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇮🇳 [or](../../../or/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇮🇳 [pa](../../../pa/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇵🇭 [phi](../../../phi/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇵🇱 [pl](../../../pl/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇵🇹 [pt](../../../pt/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇷🇴 [ro](../../../ro/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇷🇺 [ru](../../../ru/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇱🇰 [si](../../../si/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇸🇰 [sk](../../../sk/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇸🇮 [sl](../../../sl/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇷🇸 [sr](../../../sr/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇸🇪 [sv](../../../sv/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇰🇪 [sw](../../../sw/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇮🇳 [ta](../../../ta/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇮🇳 [te](../../../te/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇹🇭 [th](../../../th/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇹🇷 [tr](../../../tr/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇵🇰 [ur](../../../ur/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇺🇿 [uz](../../../uz/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇻🇳 [vi](../../../vi/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇳🇬 [yo](../../../yo/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/compression/COMPRESSION_RULES_FORMAT.md)

---

Pakkaussäännöt ovat JSON-tiedostoja, jotka ladataan suorituksen aikana. Ne sisältävät tarkoituksellisesti vain dataa, jotta uudet
kielipaketit ja RTK-komentosuodattimet voidaan tarkistaa muuttamatta moottorin koodia.

> **Kanoninen skeema (ensisijainen totuuden lähde):** [`open-sse/services/compression/rules/_schema.json`](../../open-sse/services/compression/rules/_schema.json) (JSON Schema -luonnos 2020-12).
> Alla olevat esimerkit ovat havainnollistavia — jos olet epävarma, validoi pakettisi `_schema.json`-tiedostoa vasten.

## Caveman-sääntöpaketit

Caveman-sääntöpaketit sijaitsevat hakemistossa:

```txt
open-sse/services/compression/rules/<language>/<pack>.json
```

Jokainen paketti sisältää korvauksia, joita sovelletaan tavalliseen proosaan sen jälkeen, kun suojatut alueet on eristetty.

```json
{
  "language": "en",
  "category": "filler",
  "rules": [
    {
      "name": "question_to_directive",
      "pattern": "\\b(?:Can you explain why|Could you show me how)\\b\\s*",
      "replacement": "Explain why ",
      "replacementMap": {
        "can you explain why": "Explain why ",
        "could you show me how": "Show how "
      },
      "flags": "gi",
      "context": "all",
      "category": "context",
      "minIntensity": "lite",
      "description": "Convert verbose questions into direct requests."
    }
  ]
}
```

### Caveman-kentät

| Kenttä                   | Pakollinen | Kuvaus                                                                 |
| ------------------------ | ---------- | ---------------------------------------------------------------------- |
| `language`               | kyllä      | BCP-47:n kaltainen kieliavain, kuten `en`, `pt-BR` tai `es`            |
| `category`               | kyllä      | Paketin luokan tiedostonimi/luokka, esimerkiksi `filler` tai `dedup`   |
| `rules`                  | kyllä      | Regex-korvaussääntöjen taulukko                                        |
| `rules[].name`           | kyllä      | Vakaa säännön nimi                                                     |
| `rules[].pattern`        | kyllä      | JavaScript-regexin lähdelauseke                                        |
| `rules[].flags`          | ei         | JavaScript-regexin liput; oletus on `gi`                               |
| `rules[].replacement`    | ei         | Korvausmerkkijono tai varaarvo, kun `replacementMap` ei löydä osumaa   |
| `rules[].replacementMap` | ei         | Normalisoidun osumatekstin mukaan avainnetut osumakohtaiset korvaukset |
| `rules[].context`        | ei         | `all`, `user`, `assistant` tai `system`; oletus on `all`               |
| `rules[].category`       | ei         | `filler`, `context`, `structural`, `dedup`, `terse` tai `ultra`        |
| `rules[].minIntensity`   | ei         | `lite`, `full` tai `ultra`; oletus on `lite`                           |
| `rules[].description`    | ei         | Ihmisluettava säännön yhteenveto                                       |

Käytä `flags`-kenttää, kun kirjainkoon huomioivalla täsmäytyksellä on merkitystä, esimerkiksi poistettaessa artikkelia ennen pienellä kirjaimella alkavaa proosaa
poistamatta ilmaisua `the OpenAI API`. Käytä `replacementMap`-kenttää, kun yhdessä regexissä on useita vaihtoehtoja,
jotka tarvitsevat erilaiset tulosteet. Näin JSON-sääntöpaketit sisältävät vain dataa mutta säilyttävät samalla
monipuolisempien sisäänrakennettujen TypeScript-korvausfunktioiden toiminnan.

## RTK-suodatinpaketit

RTK-suodattimet sijaitsevat hakemistossa:

```txt
open-sse/services/compression/engines/rtk/filters/<filter>.json
```

Kukin suodatin määrittää, miten komentotulosteiden ryhmä tunnistetaan ja pakataan.

```json
{
  "id": "test-vitest",
  "label": "Vitest output",
  "category": "test",
  "priority": 92,
  "match": {
    "outputTypes": ["test-vitest"],
    "commands": ["vitest", "npm test", "npm run test"],
    "patterns": ["\\bFAIL\\b", "\\bPASS\\b", "\\bTest Files\\b"]
  },
  "rules": {
    "stripAnsi": true,
    "replace": [{ "pattern": "\\s+\\[[0-9]+ms\\]", "replacement": "" }],
    "matchOutput": [
      {
        "pattern": "All tests passed",
        "message": "vitest: ok",
        "unless": "FAIL|Error:"
      }
    ],
    "includePatterns": ["FAIL", "Error:", "Test Files", "Tests"],
    "dropPatterns": ["^\\s*$", "Duration\\s+\\d+"],
    "collapsePatterns": ["^\\s+at "],
    "deduplicate": true,
    "truncateLineAt": 240,
    "maxLines": 160,
    "headLines": 24,
    "tailLines": 40,
    "onEmpty": "vitest: ok",
    "filterStderr": false
  },
  "preserve": {
    "errorPatterns": ["FAIL", "Error:", "AssertionError"],
    "summaryPatterns": ["Test Files", "Tests", "Snapshots"]
  },
  "tests": [
    {
      "name": "keeps failing tests",
      "command": "vitest",
      "input": "FAIL test/a.test.ts\\nError: boom\\nTest Files 1 failed",
      "expected": "FAIL test/a.test.ts\\nError: boom\\nTest Files 1 failed"
    }
  ]
}
```

### RTK-kentät

| Kenttä                     | Pakollinen | Kuvaus                                                                         |
| -------------------------- | ---------- | ------------------------------------------------------------------------------ |
| `id`                       | kyllä      | Vakaa suodattimen tunniste                                                     |
| `label`                    | kyllä      | Hallintapaneelissa näytettävä nimi                                             |
| `category`                 | kyllä      | Suodatinryhmä: git, test, build, shell, docker, package, infra, cloud, generic |
| `priority`                 | ei         | Suurempi prioriteetti voittaa, kun useat suodattimet täsmäävät                 |
| `match.outputTypes`        | ei         | Tunnistimen tulostetunnisteet, jotka valitsevat tämän suodattimen              |
| `match.commands`           | ei         | Komentotunnisteet, jotka valitsevat tämän suodattimen                          |
| `match.patterns`           | ei         | Säännölliset lausekkeet, jotka valitsevat tämän suodattimen tulostetekstistä   |
| `rules.stripAnsi`          | ei         | Poistaa ANSI-ohjaussekvenssit ennen säännöllisten lausekkeiden vaiheita        |
| `rules.replace`            | ei         | Järjestetyt säännöllisten lausekkeiden korvaukset, jotka tehdään riveittäin    |
| `rules.matchOutput`        | ei         | Tulostesäännöt, jotka keskeyttävät käsittelyn ja joissa voi olla `unless`-ehto |
| `rules.includePatterns`    | ei         | Rivit, joiden säilyttämistä suositaan                                          |
| `rules.dropPatterns`       | ei         | Kohinana poistettavat rivit                                                    |
| `rules.collapsePatterns`   | ei         | Toistuvat täsmäävät rivit, jotka voidaan tiivistää                             |
| `rules.deduplicate`        | ei         | Tiivistää normalisoidut kaksoiskappalerivit                                    |
| `rules.truncateLineAt`     | ei         | Unicode-turvallinen rivikohtainen merkkiraja                                   |
| `rules.maxLines`           | ei         | Säilytettävien rivien enimmäismäärä ennen loppuosan säilyttämistä              |
| `rules.headLines`          | ei         | Katkaisun aikana säilytettävät alkurivit                                       |
| `rules.tailLines`          | ei         | Viimeaikaisen kontekstin säilyttävät loppurivit                                |
| `rules.onEmpty`            | ei         | Varaviesti, kun suodatus poistaa kaiken sisällön                               |
| `rules.filterStderr`       | ei         | Normalisoi yleiset stderr-etuliitteet ennen myöhempiä suodatusvaiheita         |
| `preserve.errorPatterns`   | ei         | Virherivit, joiden tulee säilyä katkaisussa                                    |
| `preserve.summaryPatterns` | ei         | Yhteenvetorivit, joiden tulee säilyä katkaisussa                               |
| `tests[]`                  | ei         | Sisäiset varmennusesimerkit, joita RTK:n varmennusportti käyttää               |

RTK suorittaa deklaratiiviset vaiheet tässä järjestyksessä: `stripAnsi`, `filterStderr`, `replace`,
`matchOutput`, `dropPatterns`/`includePatterns`, `truncateLineAt`, `headLines`/`tailLines`,
`maxLines` ja `onEmpty`.

Mukautetut suodattimet voidaan ladata seuraavista lähteistä:

1. Projektin `.rtk/filters.json`-tiedostot vasta sen jälkeen, kun vastaavan `.rtk/trust.json`-tiedoston tiiviste on olemassa tai
   `trustProjectFilters` on käytössä.
2. Yleinen `DATA_DIR/rtk/filters.json`.
3. Sisäänrakennetut suodattimet.

Projektin tai yleiset mukautetut tiedostot voivat sisältää yhden suodatinobjektin tai suodatinobjektien taulukon. Virheelliset
mukautetut suodattimet ohitetaan diagnostiikkatietojen kera; virheelliset sisäänrakennetut suodattimet aiheuttavat validoinnin epäonnistumisen.

Projektin luottamustiedosto:

```json
{
  "filtersSha256": "0123456789abcdef..."
}
```

Ympäristömuuttujaohitus `OMNIROUTE_RTK_TRUST_PROJECT_FILTERS=1` luottaa projektin suodattimiin ilman
tiivistettä, ja sen käyttö tulisi rajata hallittuun paikalliseen kehitykseen.

## Turvallisuussäännöt

- Pidä säännöt idempotentteina: saman suodattimen suorittaminen kahdesti ei saa vioittaa tulostetta.
- Säilytä tarkat virhetekstit, tiedostopolut, rivinumerot ja komentojen yhteenvedot mahdollisuuksien mukaan.
- Vältä sääntöjä, jotka muokkaavat koodilohkoja, JSON-hyötykuormia, URL-osoitteita tai salaisuuksia.
- Lisää uusille komentoperheille yksikkötestikattavuus tunnistin- ja suodatintesteihin.
- Lisää `tests[]`-esimerkit jokaiseen sisäänrakennettuun suodattimeen ja jaettuihin mukautettuihin suodattimiin.

## Validointi

Sääntöpaketit validoidaan ennen käyttöä. Sisäänrakennettujen Caveman-pakettien ja sisäänrakennettujen RTK-suodattimien validointi keskeytetään heti virheeseen, jotta vialliset julkaisuartefaktit havaitaan ennen toimitusta. Mukautetut RTK-suodattimet ohitetaan diagnostiikkatietojen kera, jos jäsennys tai luottamuksen validointi epäonnistuu.

Kohdennettu validointi:

```bash
node --import tsx/esm --test tests/unit/compression/rule-loader.test.ts tests/unit/compression/language-packs.test.ts
node --import tsx/esm --test tests/unit/compression/rtk-verify.test.ts tests/unit/compression/rtk-dsl-pipeline.test.ts
```
