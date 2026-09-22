# Compression Rules Format (Slovenčina)

🌐 **Languages:** 🇺🇸 [English](../../../../compression/COMPRESSION_RULES_FORMAT.md) · 🇪🇹 [am](../../../am/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇸🇦 [ar](../../../ar/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇦🇿 [az](../../../az/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇧🇬 [bg](../../../bg/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇧🇩 [bn](../../../bn/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇧🇦 [bs](../../../bs/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇨🇿 [cs](../../../cs/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇩🇰 [da](../../../da/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇩🇪 [de](../../../de/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇬🇷 [el](../../../el/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇪🇸 [es](../../../es/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇪🇪 [et](../../../et/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇮🇷 [fa](../../../fa/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇫🇮 [fi](../../../fi/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇫🇷 [fr](../../../fr/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇮🇪 [ga](../../../ga/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇮🇳 [gu](../../../gu/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇳🇬 [ha](../../../ha/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇮🇱 [he](../../../he/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇮🇳 [hi](../../../hi/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇭🇷 [hr](../../../hr/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇭🇺 [hu](../../../hu/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇦🇲 [hy](../../../hy/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇮🇩 [id](../../../id/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇳🇬 [ig](../../../ig/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇮🇹 [it](../../../it/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇯🇵 [ja](../../../ja/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇬🇪 [ka](../../../ka/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇰🇭 [km](../../../km/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇮🇳 [kn](../../../kn/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇰🇷 [ko](../../../ko/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇱🇹 [lt](../../../lt/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇱🇻 [lv](../../../lv/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇮🇳 [ml](../../../ml/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇮🇳 [mr](../../../mr/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇲🇾 [ms](../../../ms/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇲🇹 [mt](../../../mt/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇲🇲 [my](../../../my/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇳🇵 [ne](../../../ne/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇳🇱 [nl](../../../nl/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇳🇴 [no](../../../no/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇮🇳 [or](../../../or/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇮🇳 [pa](../../../pa/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇵🇭 [phi](../../../phi/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇵🇱 [pl](../../../pl/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇵🇹 [pt](../../../pt/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇷🇴 [ro](../../../ro/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇷🇺 [ru](../../../ru/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇱🇰 [si](../../../si/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇸🇮 [sl](../../../sl/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇷🇸 [sr](../../../sr/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇸🇪 [sv](../../../sv/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇰🇪 [sw](../../../sw/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇮🇳 [ta](../../../ta/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇮🇳 [te](../../../te/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇹🇭 [th](../../../th/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇹🇷 [tr](../../../tr/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇵🇰 [ur](../../../ur/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇺🇿 [uz](../../../uz/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇻🇳 [vi](../../../vi/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇳🇬 [yo](../../../yo/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/compression/COMPRESSION_RULES_FORMAT.md)

---

Pravidlá kompresie sú súbory JSON načítavané počas behu. Zámerne obsahujú iba údaje, aby bolo možné kontrolovať nové jazykové balíky a filtre príkazov RTK bez zmien v kóde jadra.

> **Kanonická schéma (zdroj pravdy):** [`open-sse/services/compression/rules/_schema.json`](../../open-sse/services/compression/rules/_schema.json) (JSON Schema, návrh 2020-12).
> Príklady nižšie slúžia len na ilustráciu — v prípade pochybností overte svoj balík voči súboru `_schema.json`.

## Balíky pravidiel Caveman

Balíky pravidiel Caveman sa nachádzajú v:

```txt
open-sse/services/compression/rules/<language>/<pack>.json
```

Každý balík obsahuje náhrady, ktoré sa aplikujú na bežný text po izolovaní chránených oblastí.

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

### Polia Caveman

| Pole                     | Povinné | Popis                                                                    |
| ------------------------ | ------- | ------------------------------------------------------------------------ |
| `language`               | áno     | Kľúč jazyka podobný BCP-47, napríklad `en`, `pt-BR`, `es`                |
| `category`               | áno     | Názov súboru/kategória balíka, napríklad `filler` alebo `dedup`          |
| `rules`                  | áno     | Pole pravidiel nahrádzania pomocou regulárnych výrazov                   |
| `rules[].name`           | áno     | Stabilný názov pravidla                                                  |
| `rules[].pattern`        | áno     | Zdroj regulárneho výrazu JavaScript                                      |
| `rules[].flags`          | nie     | Príznaky regulárneho výrazu JavaScript; predvolená hodnota `gi`          |
| `rules[].replacement`    | nie     | Reťazec náhrady alebo záložná hodnota, ak `replacementMap` nenájde zhodu |
| `rules[].replacementMap` | nie     | Náhrady pre konkrétne zhody indexované normalizovaným zhodným textom     |
| `rules[].context`        | nie     | `all`, `user`, `assistant` alebo `system`; predvolená hodnota `all`      |
| `rules[].category`       | nie     | `filler`, `context`, `structural`, `dedup`, `terse` alebo `ultra`        |
| `rules[].minIntensity`   | nie     | `lite`, `full` alebo `ultra`; predvolená hodnota `lite`                  |
| `rules[].description`    | nie     | Zhrnutie pravidla čitateľné pre človeka                                  |

Použite `flags`, keď je dôležité rozlišovanie veľkých a malých písmen, napríklad pri odstraňovaní členov pred textom začínajúcim malým písmenom bez odstránenia `the OpenAI API`. Použite `replacementMap`, keď má jeden regulárny výraz viacero alternatív, ktoré vyžadujú odlišné výstupy; tým zostanú balíky pravidiel JSON čisto dátové a zároveň sa zachová správanie komplexnejších vstavaných náhradných funkcií TypeScript.

## Balíky filtrov RTK

Filtre RTK sa nachádzajú v:

```txt
open-sse/services/compression/engines/rtk/filters/<filter>.json
```

Každý filter opisuje, ako rozpoznať a komprimovať skupinu výstupov príkazu.

```json
{
  "id": "test-vitest",
  "label": "Výstup Vitest",
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
      "name": "zachová neúspešné testy",
      "command": "vitest",
      "input": "FAIL test/a.test.ts\\nError: boom\\nTest Files 1 failed",
      "expected": "FAIL test/a.test.ts\\nError: boom\\nTest Files 1 failed"
    }
  ]
}
```

### Polia RTK

| Pole                       | Povinné | Opis                                                                             |
| -------------------------- | ------- | -------------------------------------------------------------------------------- |
| `id`                       | áno     | Stabilný identifikátor filtra                                                    |
| `label`                    | áno     | Názov čitateľný na ovládacom paneli                                              |
| `category`                 | áno     | Skupina filtrov: git, test, build, shell, docker, package, infra, cloud, generic |
| `priority`                 | nie     | Pri zhode viacerých filtrov vyhráva filter s vyššou prioritou                    |
| `match.outputTypes`        | nie     | Identifikátory výstupov detektora, ktoré vyberajú tento filter                   |
| `match.commands`           | nie     | Tokeny príkazov, ktoré vyberajú tento filter                                     |
| `match.patterns`           | nie     | Regulárne výrazy, ktoré vyberajú tento filter podľa textu výstupu                |
| `rules.stripAnsi`          | nie     | Odstráni sekvencie ANSI pred fázami regulárnych výrazov                          |
| `rules.replace`            | nie     | Usporiadané nahradenia pomocou regulárnych výrazov aplikované po riadkoch        |
| `rules.matchOutput`        | nie     | Pravidlá výstupu s okamžitým ukončením a voliteľnou podmienkou `unless`          |
| `rules.includePatterns`    | nie     | Riadky, ktorých zachovanie sa má uprednostniť                                    |
| `rules.dropPatterns`       | nie     | Riadky, ktoré sa majú odstrániť ako šum                                          |
| `rules.collapsePatterns`   | nie     | Opakované zhodné riadky, ktoré možno zbaliť                                      |
| `rules.deduplicate`        | nie     | Zbalí duplicitné normalizované riadky                                            |
| `rules.truncateLineAt`     | nie     | Limit počtu znakov na riadok s podporou Unicode                                  |
| `rules.maxLines`           | nie     | Maximálny počet zachovaných riadkov pred zachovaním konca                        |
| `rules.headLines`          | nie     | Počiatočné riadky zachované počas skracovania                                    |
| `rules.tailLines`          | nie     | Koncové riadky zachované kvôli aktuálnemu kontextu                               |
| `rules.onEmpty`            | nie     | Záložná správa, keď filtrovanie odstráni celý obsah                              |
| `rules.filterStderr`       | nie     | Normalizuje bežné predpony stderr pred neskoršími fázami filtrovania             |
| `preserve.errorPatterns`   | nie     | Riadky s chybami, ktoré sa majú zachovať pri skracovaní                          |
| `preserve.summaryPatterns` | nie     | Súhrnné riadky, ktoré sa majú zachovať pri skracovaní                            |
| `tests[]`                  | nie     | Vložené overovacie vzorky používané overovacou bránou RTK                        |

RTK aplikuje deklaratívne fázy v tomto poradí: `stripAnsi`, `filterStderr`, `replace`,
`matchOutput`, `dropPatterns`/`includePatterns`, `truncateLineAt`, `headLines`/`tailLines`,
`maxLines` a `onEmpty`.

Vlastné filtre možno načítať z:

1. Projektových súborov `.rtk/filters.json` až po zadaní zodpovedajúceho hashu v `.rtk/trust.json` alebo
   povolení `trustProjectFilters`.
2. Globálneho súboru `DATA_DIR/rtk/filters.json`.
3. Vstavaných filtrov.

Projektové/globálne vlastné súbory môžu obsahovať jeden objekt filtra alebo pole objektov filtrov. Neplatné
vlastné filtre sa preskočia s diagnostickými hláseniami; neplatné vstavané filtre spôsobia zlyhanie validácie.

Projektový súbor dôveryhodnosti:

```json
{
  "filtersSha256": "0123456789abcdef..."
}
```

Prepísanie pomocou premennej prostredia `OMNIROUTE_RTK_TRUST_PROJECT_FILTERS=1` považuje projektové filtre za dôveryhodné bez
hashu a malo by byť obmedzené na kontrolovaný lokálny vývoj.

## Bezpečnostné pravidlá

- Zachovávajte idempotentnosť pravidiel: opakované spustenie toho istého filtra nesmie poškodiť výstup.
- Ak je to možné, zachovávajte presné znenie chýb, cesty k súborom, čísla riadkov a súhrny príkazov.
- Vyhnite sa pravidlám, ktoré upravujú bloky kódu, dátové časti JSON, adresy URL alebo tajné údaje.
- Pre nové skupiny príkazov pridajte pokrytie jednotkovými testami v testoch detektora a filtra.
- Pridajte vzorky `tests[]` do každého vstavaného filtra a do zdieľaných vlastných filtrov.

## Overenie

Balíky pravidiel sa pred použitím overujú. Vstavané balíky Caveman a vstavané filtre RTK pri overovaní okamžite zlyhajú,
aby sa poškodené prostriedky vydania odhalili ešte pred distribúciou. Vlastné filtre RTK sa preskočia s diagnostickými informáciami,
ak zlyhá syntaktická analýza alebo overenie dôveryhodnosti.

Cielené overenie:

```bash
node --import tsx/esm --test tests/unit/compression/rule-loader.test.ts tests/unit/compression/language-packs.test.ts
node --import tsx/esm --test tests/unit/compression/rtk-verify.test.ts tests/unit/compression/rtk-dsl-pipeline.test.ts
```
