# Compression Rules Format (Slovenščina)

🌐 **Languages:** 🇺🇸 [English](../../../../compression/COMPRESSION_RULES_FORMAT.md) · 🇪🇹 [am](../../../am/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇸🇦 [ar](../../../ar/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇦🇿 [az](../../../az/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇧🇬 [bg](../../../bg/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇧🇩 [bn](../../../bn/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇨🇿 [cs](../../../cs/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇩🇰 [da](../../../da/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇩🇪 [de](../../../de/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇬🇷 [el](../../../el/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇪🇸 [es](../../../es/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇪🇪 [et](../../../et/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇮🇷 [fa](../../../fa/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇫🇮 [fi](../../../fi/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇫🇷 [fr](../../../fr/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇮🇪 [ga](../../../ga/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇮🇳 [gu](../../../gu/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇳🇬 [ha](../../../ha/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇮🇱 [he](../../../he/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇮🇳 [hi](../../../hi/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇭🇷 [hr](../../../hr/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇭🇺 [hu](../../../hu/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇦🇲 [hy](../../../hy/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇮🇩 [id](../../../id/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇳🇬 [ig](../../../ig/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇮🇹 [it](../../../it/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇯🇵 [ja](../../../ja/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇬🇪 [ka](../../../ka/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇰🇭 [km](../../../km/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇮🇳 [kn](../../../kn/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇰🇷 [ko](../../../ko/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇱🇹 [lt](../../../lt/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇱🇻 [lv](../../../lv/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇮🇳 [ml](../../../ml/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇮🇳 [mr](../../../mr/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇲🇾 [ms](../../../ms/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇲🇹 [mt](../../../mt/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇲🇲 [my](../../../my/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇳🇵 [ne](../../../ne/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇳🇱 [nl](../../../nl/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇳🇴 [no](../../../no/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇮🇳 [or](../../../or/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇮🇳 [pa](../../../pa/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇵🇭 [phi](../../../phi/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇵🇱 [pl](../../../pl/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇵🇹 [pt](../../../pt/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇷🇴 [ro](../../../ro/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇷🇺 [ru](../../../ru/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇱🇰 [si](../../../si/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇸🇰 [sk](../../../sk/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇷🇸 [sr](../../../sr/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇸🇪 [sv](../../../sv/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇰🇪 [sw](../../../sw/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇮🇳 [ta](../../../ta/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇮🇳 [te](../../../te/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇹🇭 [th](../../../th/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇹🇷 [tr](../../../tr/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇵🇰 [ur](../../../ur/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇺🇿 [uz](../../../uz/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇻🇳 [vi](../../../vi/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇳🇬 [yo](../../../yo/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/compression/COMPRESSION_RULES_FORMAT.md)

---

Pravila stiskanja so datoteke JSON, ki se naložijo med izvajanjem. Namenoma vsebujejo samo podatke, tako da je mogoče nove jezikovne pakete in filtre ukazov RTK pregledati brez spreminjanja kode pogona.

> **Kanonična shema (vir resnice):** [`open-sse/services/compression/rules/_schema.json`](../../open-sse/services/compression/rules/_schema.json) (JSON Schema, osnutek 2020-12).
> Spodnji primeri so zgolj ponazoritveni — če ste v dvomih, preverite veljavnost svojega paketa glede na `_schema.json`.

## Paketi pravil Caveman

Paketi pravil Caveman so shranjeni v:

```txt
open-sse/services/compression/rules/<language>/<pack>.json
```

Vsak paket vsebuje zamenjave, ki se uporabijo za običajno besedilo, potem ko so zaščitena območja ločena.

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

### Polja Caveman

| Polje                    | Obvezno | Opis                                                                                  |
| ------------------------ | ------- | ------------------------------------------------------------------------------------- |
| `language`               | da      | Jezikovni ključ, podoben BCP-47, na primer `en`, `pt-BR`, `es`                        |
| `category`               | da      | Ime datoteke/kategorija paketa, na primer `filler` ali `dedup`                        |
| `rules`                  | da      | Polje pravil za zamenjavo z regularnimi izrazi                                        |
| `rules[].name`           | da      | Stabilno ime pravila                                                                  |
| `rules[].pattern`        | da      | Izvorni izraz JavaScript regex                                                        |
| `rules[].flags`          | ne      | Zastavice JavaScript regex; privzeto `gi`                                             |
| `rules[].replacement`    | ne      | Nadomestni niz ali rezervna vrednost, ko `replacementMap` ne najde ujemanja           |
| `rules[].replacementMap` | ne      | Zamenjave za posamezna ujemanja, indeksirane po normaliziranem ujemajočem se besedilu |
| `rules[].context`        | ne      | `all`, `user`, `assistant` ali `system`; privzeto `all`                               |
| `rules[].category`       | ne      | `filler`, `context`, `structural`, `dedup`, `terse` ali `ultra`                       |
| `rules[].minIntensity`   | ne      | `lite`, `full` ali `ultra`; privzeto `lite`                                           |
| `rules[].description`    | ne      | Človeku berljiv povzetek pravila                                                      |

Uporabite `flags`, kadar je pomembno razlikovanje med velikimi in malimi črkami, na primer pri odstranjevanju členov pred besedilom z malimi črkami, ne da bi odstranili `the OpenAI API`. Uporabite `replacementMap`, kadar ima en regularni izraz več alternativ, ki zahtevajo različne rezultate; tako paketi pravil JSON ostanejo omejeni samo na podatke, hkrati pa ohranijo vedenje zmogljivejših vgrajenih funkcij TypeScript za zamenjavo.

## Paketi filtrov RTK

Filtri RTK se nahajajo v:

```txt
open-sse/services/compression/engines/rtk/filters/<filter>.json
```

Vsak filter opisuje, kako prepoznati in stisniti družino izhodov ukazov.

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

### Polja RTK

| Polje                      | Obvezno | Opis                                                                            |
| -------------------------- | ------- | ------------------------------------------------------------------------------- |
| `id`                       | da      | Stabilni identifikator filtra                                                   |
| `label`                    | da      | Ime, berljivo na nadzorni plošči                                                |
| `category`                 | da      | Družina filtra: git, test, build, shell, docker, package, infra, cloud, generic |
| `priority`                 | ne      | Ko se ujema več filtrov, ima prednost tisti z višjo prioriteto                  |
| `match.outputTypes`        | ne      | Identifikatorji izhodov detektorja, ki izberejo ta filter                       |
| `match.commands`           | ne      | Žetoni ukazov, ki izberejo ta filter                                            |
| `match.patterns`           | ne      | Vzorci regularnih izrazov, ki izberejo ta filter na podlagi izhodnega besedila  |
| `rules.stripAnsi`          | ne      | Pred koraki z regularnimi izrazi odstrani ubežna zaporedja ANSI                 |
| `rules.replace`            | ne      | Urejene zamenjave z regularnimi izrazi, uporabljene vrstico za vrstico          |
| `rules.matchOutput`        | ne      | Pravila za takojšnji izhod z izbirnim pogojem `unless`                          |
| `rules.includePatterns`    | ne      | Vrstice, katerih ohranitev ima prednost                                         |
| `rules.dropPatterns`       | ne      | Vrstice, ki se odstranijo kot šum                                               |
| `rules.collapsePatterns`   | ne      | Ponavljajoče se ujemajoče vrstice, ki jih je mogoče strniti                     |
| `rules.deduplicate`        | ne      | Strne podvojene normalizirane vrstice                                           |
| `rules.truncateLineAt`     | ne      | Omejitev števila znakov na vrstico, varna za Unicode                            |
| `rules.maxLines`           | ne      | Največje število ohranjenih vrstic pred ohranitvijo zaključnega dela            |
| `rules.headLines`          | ne      | Začetne vrstice, ohranjene med krajšanjem                                       |
| `rules.tailLines`          | ne      | Končne vrstice, ohranjene zaradi nedavnega konteksta                            |
| `rules.onEmpty`            | ne      | Nadomestno sporočilo, ko filtriranje odstrani vso vsebino                       |
| `rules.filterStderr`       | ne      | Normalizira običajne predpone stderr pred poznejšimi koraki filtriranja         |
| `preserve.errorPatterns`   | ne      | Vrstice z napakami, ki morajo ostati ohranjene pri krajšanju                    |
| `preserve.summaryPatterns` | ne      | Vrstice s povzetki, ki morajo ostati ohranjene pri krajšanju                    |
| `tests[]`                  | ne      | Vključeni preveritveni vzorci, ki jih uporablja preverjevalni prehod RTK        |

RTK uporablja deklarativne korake v tem vrstnem redu: `stripAnsi`, `filterStderr`, `replace`,
`matchOutput`, `dropPatterns`/`includePatterns`, `truncateLineAt`, `headLines`/`tailLines`,
`maxLines` in `onEmpty`.

Filtre po meri je mogoče naložiti iz:

1. Projektnih datotek `.rtk/filters.json`, vendar šele ko je prisotna ujemajoča se zgoščena vrednost v `.rtk/trust.json` ali
   je omogočen `trustProjectFilters`.
2. Globalne datoteke `DATA_DIR/rtk/filters.json`.
3. Vgrajenih filtrov.

Projektne/globalne datoteke po meri lahko vsebujejo en objekt filtra ali polje objektov filtrov. Neveljavni
filtri po meri se preskočijo z diagnostičnimi sporočili; neveljavni vgrajeni filtri povzročijo neuspešno preverjanje veljavnosti.

Projektna datoteka zaupanja:

```json
{
  "filtersSha256": "0123456789abcdef..."
}
```

Preglasitev z okoljsko spremenljivko `OMNIROUTE_RTK_TRUST_PROJECT_FILTERS=1` zaupa projektnim filtrom brez
zgoščene vrednosti in mora biti omejena na nadzorovan lokalni razvoj.

## Varnostna pravila

- Pravila naj bodo idempotentna: večkratna uporaba istega filtra ne sme poškodovati izhoda.
- Kjer je mogoče, ohranite natančno besedilo napak, poti datotek, številke vrstic in povzetke ukazov.
- Izogibajte se pravilom, ki spreminjajo bloke kode, koristne vsebine JSON, URL-je ali skrivnosti.
- Za nove družine ukazov dodajte pokritost s testi enot v testih detektorjev/filtrov.
- Vsakemu vgrajenemu filtru in skupnim filtrom po meri dodajte vzorce `tests[]`.

## Preverjanje veljavnosti

Paketi pravil so pred uporabo preverjeni. Vgrajeni paketi Caveman in vgrajeni filtri RTK ob napaki
med preverjanjem veljavnosti takoj prekinejo izvajanje, tako da so okvarjeni viri izdaje odkriti pred distribucijo. Filtri RTK po meri so
preskočeni z diagnostičnimi sporočili, kadar razčlenjevanje ali preverjanje zaupanja ne uspe.

Ciljno usmerjeno preverjanje veljavnosti:

```bash
node --import tsx/esm --test tests/unit/compression/rule-loader.test.ts tests/unit/compression/language-packs.test.ts
node --import tsx/esm --test tests/unit/compression/rtk-verify.test.ts tests/unit/compression/rtk-dsl-pipeline.test.ts
```
