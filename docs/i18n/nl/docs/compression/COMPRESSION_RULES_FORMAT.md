# Compression Rules Format (Nederlands)

🌐 **Languages:** 🇺🇸 [English](../../../../compression/COMPRESSION_RULES_FORMAT.md) · 🇪🇹 [am](../../../am/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇸🇦 [ar](../../../ar/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇦🇿 [az](../../../az/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇧🇬 [bg](../../../bg/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇧🇩 [bn](../../../bn/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇨🇿 [cs](../../../cs/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇩🇰 [da](../../../da/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇩🇪 [de](../../../de/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇬🇷 [el](../../../el/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇪🇸 [es](../../../es/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇪🇪 [et](../../../et/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇮🇷 [fa](../../../fa/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇫🇮 [fi](../../../fi/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇫🇷 [fr](../../../fr/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇮🇪 [ga](../../../ga/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇮🇳 [gu](../../../gu/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇳🇬 [ha](../../../ha/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇮🇱 [he](../../../he/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇮🇳 [hi](../../../hi/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇭🇷 [hr](../../../hr/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇭🇺 [hu](../../../hu/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇦🇲 [hy](../../../hy/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇮🇩 [id](../../../id/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇳🇬 [ig](../../../ig/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇮🇹 [it](../../../it/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇯🇵 [ja](../../../ja/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇬🇪 [ka](../../../ka/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇰🇭 [km](../../../km/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇮🇳 [kn](../../../kn/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇰🇷 [ko](../../../ko/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇱🇹 [lt](../../../lt/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇱🇻 [lv](../../../lv/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇮🇳 [ml](../../../ml/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇮🇳 [mr](../../../mr/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇲🇾 [ms](../../../ms/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇲🇹 [mt](../../../mt/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇲🇲 [my](../../../my/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇳🇵 [ne](../../../ne/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇳🇴 [no](../../../no/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇮🇳 [or](../../../or/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇮🇳 [pa](../../../pa/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇵🇭 [phi](../../../phi/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇵🇱 [pl](../../../pl/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇵🇹 [pt](../../../pt/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇷🇴 [ro](../../../ro/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇷🇺 [ru](../../../ru/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇱🇰 [si](../../../si/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇸🇰 [sk](../../../sk/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇸🇮 [sl](../../../sl/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇷🇸 [sr](../../../sr/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇸🇪 [sv](../../../sv/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇰🇪 [sw](../../../sw/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇮🇳 [ta](../../../ta/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇮🇳 [te](../../../te/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇹🇭 [th](../../../th/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇹🇷 [tr](../../../tr/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇵🇰 [ur](../../../ur/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇺🇿 [uz](../../../uz/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇻🇳 [vi](../../../vi/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇳🇬 [yo](../../../yo/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/compression/COMPRESSION_RULES_FORMAT.md)

---

Compressieregels zijn JSON-bestanden die tijdens runtime worden geladen. Ze bevatten bewust uitsluitend gegevens, zodat nieuwe taalpakketten en RTK-opdrachtfilters kunnen worden beoordeeld zonder de enginecode te wijzigen.

> **Canoniek schema (gezaghebbende bron):** [`open-sse/services/compression/rules/_schema.json`](../../open-sse/services/compression/rules/_schema.json) (JSON Schema draft 2020-12).
> De onderstaande voorbeelden dienen ter illustratie — valideer bij twijfel je pakket aan de hand van `_schema.json`.

## Caveman-regelpakketten

Caveman-regelpakketten bevinden zich onder:

```txt
open-sse/services/compression/rules/<language>/<pack>.json
```

Elk pakket bevat vervangingen die op normale proza worden toegepast nadat beschermde gebieden zijn geïsoleerd.

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

### Caveman-velden

| Veld                     | Verplicht | Beschrijving                                                                      |
| ------------------------ | --------- | --------------------------------------------------------------------------------- |
| `language`               | ja        | BCP-47-achtige taalsleutel, zoals `en`, `pt-BR`, `es`                             |
| `category`               | ja        | Bestandsnaam/categorie van het pakket, bijvoorbeeld `filler` of `dedup`           |
| `rules`                  | ja        | Array met regex-vervangingsregels                                                 |
| `rules[].name`           | ja        | Stabiele regelnaam                                                                |
| `rules[].pattern`        | ja        | JavaScript-regexbron                                                              |
| `rules[].flags`          | nee       | JavaScript-regexvlaggen; standaard `gi`                                           |
| `rules[].replacement`    | nee       | Vervangende tekenreeks of terugvalwaarde als `replacementMap` niets vindt         |
| `rules[].replacementMap` | nee       | Matchspecifieke vervangingen met genormaliseerde overeenkomende tekst als sleutel |
| `rules[].context`        | nee       | `all`, `user`, `assistant` of `system`; standaard `all`                           |
| `rules[].category`       | nee       | `filler`, `context`, `structural`, `dedup`, `terse` of `ultra`                    |
| `rules[].minIntensity`   | nee       | `lite`, `full` of `ultra`; standaard `lite`                                       |
| `rules[].description`    | nee       | Voor mensen leesbare samenvatting van de regel                                    |

Gebruik `flags` wanneer hoofdlettergevoelige overeenkomsten van belang zijn, bijvoorbeeld bij het verwijderen van lidwoorden vóór proza in kleine letters zonder `the OpenAI API` te verwijderen. Gebruik `replacementMap` wanneer één regex meerdere alternatieven heeft die verschillende uitvoer vereisen; zo blijven JSON-regelpakketten uitsluitend uit gegevens bestaan, terwijl het gedrag van de uitgebreidere ingebouwde TypeScript-vervangingsfuncties behouden blijft.

## RTK-filterpakketten

RTK-filters bevinden zich onder:

```txt
open-sse/services/compression/engines/rtk/filters/<filter>.json
```

Elk filter beschrijft hoe een familie van opdrachtuitvoer kan worden herkend en gecomprimeerd.

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

### RTK-velden

| Veld                       | Vereist | Beschrijving                                                                       |
| -------------------------- | ------- | ---------------------------------------------------------------------------------- |
| `id`                       | ja      | Stabiele filter-id                                                                 |
| `label`                    | ja      | Naam die leesbaar is in het dashboard                                              |
| `category`                 | ja      | Filterfamilie: git, test, build, shell, docker, package, infra, cloud, generic     |
| `priority`                 | nee     | De hogere prioriteit wint wanneer meerdere filters overeenkomen                    |
| `match.outputTypes`        | nee     | Door de detector uitgevoerde id's die dit filter selecteren                        |
| `match.commands`           | nee     | Opdrachttokens die dit filter selecteren                                           |
| `match.patterns`           | nee     | Regex-patronen die dit filter selecteren op basis van de uitvoertekst              |
| `rules.stripAnsi`          | nee     | ANSI-escapereeksen verwijderen vóór de regex-fasen                                 |
| `rules.replace`            | nee     | Geordende regex-vervangingen die regel voor regel worden toegepast                 |
| `rules.matchOutput`        | nee     | Regels voor vroegtijdige uitvoer met een optionele `unless`-voorwaarde             |
| `rules.includePatterns`    | nee     | Regels waarvan behoud de voorkeur heeft                                            |
| `rules.dropPatterns`       | nee     | Regels die als ruis moeten worden verwijderd                                       |
| `rules.collapsePatterns`   | nee     | Herhaalde overeenkomende regels die kunnen worden samengevouwen                    |
| `rules.deduplicate`        | nee     | Dubbele genormaliseerde regels samenvoegen                                         |
| `rules.truncateLineAt`     | nee     | Unicode-veilige tekenlimiet per regel                                              |
| `rules.maxLines`           | nee     | Maximaal aantal behouden regels vóór het behouden van de laatste regels            |
| `rules.headLines`          | nee     | Eerste regels die tijdens het afkappen behouden blijven                            |
| `rules.tailLines`          | nee     | Laatste regels die voor recente context behouden blijven                           |
| `rules.onEmpty`            | nee     | Terugvalbericht wanneer alle inhoud door het filteren wordt verwijderd             |
| `rules.filterStderr`       | nee     | Gangbare stderr-voorvoegsels normaliseren vóór latere filterfasen                  |
| `preserve.errorPatterns`   | nee     | Foutregels die het afkappen moeten overleven                                       |
| `preserve.summaryPatterns` | nee     | Samenvattingsregels die het afkappen moeten overleven                              |
| `tests[]`                  | nee     | Ingesloten verificatievoorbeelden die door de RTK-verificatiepoort worden gebruikt |

RTK past declaratieve fasen in deze volgorde toe: `stripAnsi`, `filterStderr`, `replace`,
`matchOutput`, `dropPatterns`/`includePatterns`, `truncateLineAt`, `headLines`/`tailLines`,
`maxLines` en `onEmpty`.

Aangepaste filters kunnen worden geladen vanuit:

1. Projectbestanden `.rtk/filters.json`, maar alleen nadat een overeenkomende hash in `.rtk/trust.json` aanwezig is of
   `trustProjectFilters` is ingeschakeld.
2. Globaal `DATA_DIR/rtk/filters.json`.
3. Ingebouwde filters.

Aangepaste project-/globale bestanden mogen één filterobject of een array van filterobjecten bevatten. Ongeldige
aangepaste filters worden met diagnostische meldingen overgeslagen; ongeldige ingebouwde filters laten de validatie mislukken.

Projectvertrouwensbestand:

```json
{
  "filtersSha256": "0123456789abcdef..."
}
```

De omgevingsoverschrijving `OMNIROUTE_RTK_TRUST_PROJECT_FILTERS=1` vertrouwt projectfilters zonder een
hash en moet worden beperkt tot gecontroleerde lokale ontwikkeling.

## Veiligheidsregels

- Houd regels idempotent: wanneer hetzelfde filter tweemaal wordt uitgevoerd, mag de uitvoer niet beschadigd raken.
- Behoud waar mogelijk de exacte fouttekst, bestandspaden, regelnummers en opdrachtsamenvattingen.
- Vermijd regels die codeblokken, JSON-payloads, URL's of geheimen wijzigen.
- Voeg unit-testdekking voor nieuwe opdrachtfamilies toe aan detector-/filtertests.
- Voeg `tests[]`-voorbeelden toe aan elk ingebouwd filter en aan gedeelde aangepaste filters.

## Validatie

Regelpakketten worden vóór gebruik gevalideerd. Ingebouwde Caveman-pakketten en ingebouwde RTK-filters stoppen direct bij fouten
tijdens de validatie, zodat defecte release-assets vóór levering worden gedetecteerd. Aangepaste RTK-filters worden
met diagnostische meldingen overgeslagen wanneer het parseren of de vertrouwensvalidatie mislukt.

Gerichte validatie:

```bash
node --import tsx/esm --test tests/unit/compression/rule-loader.test.ts tests/unit/compression/language-packs.test.ts
node --import tsx/esm --test tests/unit/compression/rtk-verify.test.ts tests/unit/compression/rtk-dsl-pipeline.test.ts
```
