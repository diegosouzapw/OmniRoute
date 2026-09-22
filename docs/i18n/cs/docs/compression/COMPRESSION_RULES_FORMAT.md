# Compression Rules Format (Čeština)

🌐 **Languages:** 🇺🇸 [English](../../../../compression/COMPRESSION_RULES_FORMAT.md) · 🇪🇹 [am](../../../am/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇸🇦 [ar](../../../ar/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇦🇿 [az](../../../az/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇧🇬 [bg](../../../bg/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇧🇩 [bn](../../../bn/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇩🇰 [da](../../../da/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇩🇪 [de](../../../de/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇬🇷 [el](../../../el/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇪🇸 [es](../../../es/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇪🇪 [et](../../../et/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇮🇷 [fa](../../../fa/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇫🇮 [fi](../../../fi/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇫🇷 [fr](../../../fr/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇮🇪 [ga](../../../ga/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇮🇳 [gu](../../../gu/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇳🇬 [ha](../../../ha/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇮🇱 [he](../../../he/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇮🇳 [hi](../../../hi/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇭🇷 [hr](../../../hr/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇭🇺 [hu](../../../hu/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇦🇲 [hy](../../../hy/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇮🇩 [id](../../../id/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇳🇬 [ig](../../../ig/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇮🇹 [it](../../../it/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇯🇵 [ja](../../../ja/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇬🇪 [ka](../../../ka/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇰🇭 [km](../../../km/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇮🇳 [kn](../../../kn/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇰🇷 [ko](../../../ko/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇱🇹 [lt](../../../lt/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇱🇻 [lv](../../../lv/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇮🇳 [ml](../../../ml/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇮🇳 [mr](../../../mr/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇲🇾 [ms](../../../ms/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇲🇹 [mt](../../../mt/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇲🇲 [my](../../../my/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇳🇵 [ne](../../../ne/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇳🇱 [nl](../../../nl/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇳🇴 [no](../../../no/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇮🇳 [or](../../../or/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇮🇳 [pa](../../../pa/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇵🇭 [phi](../../../phi/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇵🇱 [pl](../../../pl/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇵🇹 [pt](../../../pt/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇷🇴 [ro](../../../ro/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇷🇺 [ru](../../../ru/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇱🇰 [si](../../../si/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇸🇰 [sk](../../../sk/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇸🇮 [sl](../../../sl/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇷🇸 [sr](../../../sr/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇸🇪 [sv](../../../sv/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇰🇪 [sw](../../../sw/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇮🇳 [ta](../../../ta/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇮🇳 [te](../../../te/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇹🇭 [th](../../../th/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇹🇷 [tr](../../../tr/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇵🇰 [ur](../../../ur/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇺🇿 [uz](../../../uz/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇻🇳 [vi](../../../vi/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇳🇬 [yo](../../../yo/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/compression/COMPRESSION_RULES_FORMAT.md)

---

Pravidla komprese jsou soubory JSON načítané za běhu. Záměrně obsahují pouze data, aby bylo možné kontrolovat nové
jazykové balíčky a filtry příkazů RTK bez změn v kódu enginu.

> **Kanonické schéma (zdroj pravdy):** [`open-sse/services/compression/rules/_schema.json`](../../open-sse/services/compression/rules/_schema.json) (JSON Schema draft 2020-12).
> Níže uvedené příklady jsou pouze ilustrativní — v případě pochybností ověřte svůj balíček vůči souboru `_schema.json`.

## Balíčky pravidel Caveman

Balíčky pravidel Caveman se nacházejí v:

```txt
open-sse/services/compression/rules/<language>/<pack>.json
```

Každý balíček obsahuje nahrazení, která se aplikují na běžný text po izolování chráněných oblastí.

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

### Pole Caveman

| Pole                     | Povinné | Popis                                                                            |
| ------------------------ | ------- | -------------------------------------------------------------------------------- |
| `language`               | ano     | Klíč jazyka podobný BCP-47, například `en`, `pt-BR`, `es`                        |
| `category`               | ano     | Název souboru/kategorie balíčku, například `filler` nebo `dedup`                 |
| `rules`                  | ano     | Pole pravidel nahrazování pomocí regulárních výrazů                              |
| `rules[].name`           | ano     | Stabilní název pravidla                                                          |
| `rules[].pattern`        | ano     | Zdroj regulárního výrazu JavaScriptu                                             |
| `rules[].flags`          | ne      | Příznaky regulárního výrazu JavaScriptu; výchozí hodnota `gi`                    |
| `rules[].replacement`    | ne      | Řetězec nahrazení nebo záložní hodnota, když `replacementMap` nenalezne shodu    |
| `rules[].replacementMap` | ne      | Nahrazení pro konkrétní shody, jejichž klíčem je normalizovaný odpovídající text |
| `rules[].context`        | ne      | `all`, `user`, `assistant` nebo `system`; výchozí hodnota `all`                  |
| `rules[].category`       | ne      | `filler`, `context`, `structural`, `dedup`, `terse` nebo `ultra`                 |
| `rules[].minIntensity`   | ne      | `lite`, `full` nebo `ultra`; výchozí hodnota `lite`                              |
| `rules[].description`    | ne      | Souhrn pravidla čitelný pro člověka                                              |

Použijte `flags`, pokud záleží na rozlišování velkých a malých písmen, například při odstraňování členů před textem začínajícím malým písmenem,
aniž by se odstranilo `the OpenAI API`. Použijte `replacementMap`, pokud má jeden regulární výraz více alternativ,
které vyžadují různé výstupy; balíčky pravidel JSON tak mohou obsahovat pouze data a přitom zachovat chování
propracovanějších vestavěných nahrazovacích funkcí TypeScriptu.

## Balíčky filtrů RTK

Filtry RTK se nacházejí v:

```txt
open-sse/services/compression/engines/rtk/filters/<filter>.json
```

Každý filtr popisuje, jak rozpoznat a komprimovat určitou skupinu výstupů příkazů.

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

### Pole RTK

| Pole                       | Povinné | Popis                                                                           |
| -------------------------- | ------- | ------------------------------------------------------------------------------- |
| `id`                       | ano     | Stabilní ID filtru                                                              |
| `label`                    | ano     | Název čitelný v řídicím panelu                                                  |
| `category`                 | ano     | Skupina filtru: git, test, build, shell, docker, package, infra, cloud, generic |
| `priority`                 | ne      | Při shodě více filtrů vyhrává filtr s vyšší prioritou                           |
| `match.outputTypes`        | ne      | ID výstupů detektoru, která vybírají tento filtr                                |
| `match.commands`           | ne      | Tokeny příkazů, které vybírají tento filtr                                      |
| `match.patterns`           | ne      | Regulární výrazy, které vybírají tento filtr podle textu výstupu                |
| `rules.stripAnsi`          | ne      | Odstraní řídicí sekvence ANSI před fázemi s regulárními výrazy                  |
| `rules.replace`            | ne      | Seřazené náhrady pomocí regulárních výrazů aplikované řádek po řádku            |
| `rules.matchOutput`        | ne      | Pravidla pro okamžitý výstup s volitelnou podmínkou `unless`                    |
| `rules.includePatterns`    | ne      | Řádky, jejichž zachování má být upřednostněno                                   |
| `rules.dropPatterns`       | ne      | Řádky, které mají být odstraněny jako šum                                       |
| `rules.collapsePatterns`   | ne      | Opakující se odpovídající řádky, které lze sloučit                              |
| `rules.deduplicate`        | ne      | Sloučí duplicitní normalizované řádky                                           |
| `rules.truncateLineAt`     | ne      | Limit počtu znaků na řádek bezpečný pro Unicode                                 |
| `rules.maxLines`           | ne      | Maximální počet zachovaných řádků před zachováním konce                         |
| `rules.headLines`          | ne      | Počet řádků ze začátku zachovaných při zkracování                               |
| `rules.tailLines`          | ne      | Počet řádků z konce zachovaných pro aktuální kontext                            |
| `rules.onEmpty`            | ne      | Záložní zpráva, pokud filtrování odstraní veškerý obsah                         |
| `rules.filterStderr`       | ne      | Normalizuje běžné předpony stderr před dalšími fázemi filtrování                |
| `preserve.errorPatterns`   | ne      | Chybové řádky, které mají přežít zkrácení                                       |
| `preserve.summaryPatterns` | ne      | Souhrnné řádky, které mají přežít zkrácení                                      |
| `tests[]`                  | ne      | Vložené ověřovací vzorky používané kontrolou RTK verify                         |

RTK používá deklarativní fáze v tomto pořadí: `stripAnsi`, `filterStderr`, `replace`,
`matchOutput`, `dropPatterns`/`includePatterns`, `truncateLineAt`, `headLines`/`tailLines`,
`maxLines` a `onEmpty`.

Vlastní filtry lze načíst z:

1. Projektových souborů `.rtk/filters.json`, ale pouze pokud je přítomen odpovídající hash v `.rtk/trust.json` nebo
   je povoleno `trustProjectFilters`.
2. Globálního souboru `DATA_DIR/rtk/filters.json`.
3. Vestavěných filtrů.

Vlastní projektové/globální soubory mohou obsahovat jeden objekt filtru nebo pole objektů filtrů. Neplatné
vlastní filtry jsou přeskočeny s diagnostickými informacemi; neplatné vestavěné filtry způsobí selhání validace.

Soubor důvěryhodnosti projektu:

```json
{
  "filtersSha256": "0123456789abcdef..."
}
```

Přepsání pomocí proměnné prostředí `OMNIROUTE_RTK_TRUST_PROJECT_FILTERS=1` považuje projektové filtry za důvěryhodné bez
hashe a mělo by být omezeno na kontrolovaný místní vývoj.

## Bezpečnostní pravidla

- Zachovávejte idempotenci pravidel: opakované spuštění stejného filtru nesmí poškodit výstup.
- Pokud možno zachovávejte přesné znění chyb, cesty k souborům, čísla řádků a souhrny příkazů.
- Vyhněte se pravidlům, která upravují bloky kódu, datové části JSON, adresy URL nebo tajné údaje.
- Pro nové rodiny příkazů přidejte pokrytí jednotkovými testy v testech detektoru/filtru.
- Ke každému vestavěnému filtru a ke sdíleným vlastním filtrům přidejte vzorky `tests[]`.

## Ověřování

Balíčky pravidel jsou před použitím ověřovány. Vestavěné balíčky Caveman a vestavěné filtry RTK při ověřování okamžitě selžou, aby byly poškozené artefakty vydání odhaleny ještě před distribucí. Vlastní filtry RTK jsou při selhání parsování nebo ověřování důvěryhodnosti přeskočeny a jsou vypsány diagnostické informace.

Cílené ověřování:

```bash
node --import tsx/esm --test tests/unit/compression/rule-loader.test.ts tests/unit/compression/language-packs.test.ts
node --import tsx/esm --test tests/unit/compression/rtk-verify.test.ts tests/unit/compression/rtk-dsl-pipeline.test.ts
```
