# Compression Rules Format (తెలుగు)

🌐 **Languages:** 🇺🇸 [English](../../../../compression/COMPRESSION_RULES_FORMAT.md) · 🇪🇹 [am](../../../am/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇸🇦 [ar](../../../ar/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇦🇿 [az](../../../az/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇧🇬 [bg](../../../bg/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇧🇩 [bn](../../../bn/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇨🇿 [cs](../../../cs/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇩🇰 [da](../../../da/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇩🇪 [de](../../../de/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇬🇷 [el](../../../el/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇪🇸 [es](../../../es/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇪🇪 [et](../../../et/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇮🇷 [fa](../../../fa/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇫🇮 [fi](../../../fi/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇫🇷 [fr](../../../fr/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇮🇪 [ga](../../../ga/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇮🇳 [gu](../../../gu/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇳🇬 [ha](../../../ha/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇮🇱 [he](../../../he/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇮🇳 [hi](../../../hi/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇭🇷 [hr](../../../hr/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇭🇺 [hu](../../../hu/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇦🇲 [hy](../../../hy/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇮🇩 [id](../../../id/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇳🇬 [ig](../../../ig/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇮🇹 [it](../../../it/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇯🇵 [ja](../../../ja/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇬🇪 [ka](../../../ka/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇰🇭 [km](../../../km/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇮🇳 [kn](../../../kn/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇰🇷 [ko](../../../ko/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇱🇹 [lt](../../../lt/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇱🇻 [lv](../../../lv/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇮🇳 [ml](../../../ml/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇮🇳 [mr](../../../mr/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇲🇾 [ms](../../../ms/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇲🇹 [mt](../../../mt/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇲🇲 [my](../../../my/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇳🇵 [ne](../../../ne/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇳🇱 [nl](../../../nl/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇳🇴 [no](../../../no/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇮🇳 [or](../../../or/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇮🇳 [pa](../../../pa/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇵🇭 [phi](../../../phi/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇵🇱 [pl](../../../pl/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇵🇹 [pt](../../../pt/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇷🇴 [ro](../../../ro/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇷🇺 [ru](../../../ru/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇱🇰 [si](../../../si/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇸🇰 [sk](../../../sk/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇸🇮 [sl](../../../sl/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇷🇸 [sr](../../../sr/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇸🇪 [sv](../../../sv/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇰🇪 [sw](../../../sw/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇮🇳 [ta](../../../ta/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇹🇭 [th](../../../th/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇹🇷 [tr](../../../tr/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇵🇰 [ur](../../../ur/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇺🇿 [uz](../../../uz/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇻🇳 [vi](../../../vi/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇳🇬 [yo](../../../yo/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/compression/COMPRESSION_RULES_FORMAT.md)

---

కంప్రెషన్ నియమాలు రన్టైమ్లో లోడ్ చేయబడే JSON ఫైళ్లు. కొత్త భాషా ప్యాక్లు మరియు RTK కమాండ్ ఫిల్టర్లను ఇంజిన్ కోడ్ను మార్చకుండా సమీక్షించగలిగేలా వీటిని ఉద్దేశపూర్వకంగా డేటా-మాత్రమే ఉండే విధంగా రూపొందించారు.

> **ప్రామాణిక స్కీమా (అధికారిక మూలం):** [`open-sse/services/compression/rules/_schema.json`](../../open-sse/services/compression/rules/_schema.json) (JSON Schema draft 2020-12).
> దిగువ ఉదాహరణలు వివరణాత్మకమైనవి మాత్రమే — సందేహం ఉన్నప్పుడు, మీ ప్యాక్ను `_schema.json`కు అనుగుణంగా ధ్రువీకరించండి.

## Caveman నియమ ప్యాక్లు

Caveman నియమ ప్యాక్లు ఇక్కడ ఉంటాయి:

```txt
open-sse/services/compression/rules/<language>/<pack>.json
```

రక్షిత ప్రాంతాలను వేరు చేసిన తర్వాత సాధారణ గద్యానికి వర్తించే రీప్లేస్మెంట్లు ప్రతి ప్యాక్లో ఉంటాయి.

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

### Caveman ఫీల్డ్లు

| ఫీల్డ్                   | అవసరమా | వివరణ                                                                                   |
| ------------------------ | ------ | --------------------------------------------------------------------------------------- |
| `language`               | అవును  | `en`, `pt-BR`, `es` వంటి BCP-47-తరహా భాషా కీ                                            |
| `category`               | అవును  | ప్యాక్ వర్గపు ఫైల్ పేరు/వర్గం, ఉదాహరణకు `filler` లేదా `dedup`                           |
| `rules`                  | అవును  | regex రీప్లేస్మెంట్ నియమాల అరే                                                          |
| `rules[].name`           | అవును  | స్థిరమైన నియమం పేరు                                                                     |
| `rules[].pattern`        | అవును  | JavaScript regex సోర్స్                                                                 |
| `rules[].flags`          | కాదు   | JavaScript regex ఫ్లాగ్లు; డిఫాల్ట్ `gi`                                                |
| `rules[].replacement`    | కాదు   | రీప్లేస్మెంట్ స్ట్రింగ్ లేదా `replacementMap`లో సరిపోలిక లేనప్పుడు ఉపయోగించే ఫాల్బ్యాక్ |
| `rules[].replacementMap` | కాదు   | సాధారణీకరించిన సరిపోలిన టెక్స్ట్ ద్వారా కీ చేయబడిన, సరిపోలిక-నిర్దిష్ట రీప్లేస్మెంట్లు  |
| `rules[].context`        | కాదు   | `all`, `user`, `assistant`, లేదా `system`; డిఫాల్ట్ `all`                               |
| `rules[].category`       | కాదు   | `filler`, `context`, `structural`, `dedup`, `terse`, లేదా `ultra`                       |
| `rules[].minIntensity`   | కాదు   | `lite`, `full`, లేదా `ultra`; డిఫాల్ట్ `lite`                                           |
| `rules[].description`    | కాదు   | మనుషులు చదివి అర్థం చేసుకోగల నియమ సారాంశం                                               |

కేస్-సెన్సిటివ్ మ్యాచింగ్ ముఖ్యమైనప్పుడు `flags`ను ఉపయోగించండి, ఉదాహరణకు `the OpenAI API`ను తొలగించకుండా, లోయర్కేస్ గద్యానికి ముందు ఉండే ఆర్టికల్ను తొలగించడం కోసం. ఒక regexలో వేర్వేరు అవుట్పుట్లు అవసరమైన అనేక ప్రత్యామ్నాయాలు ఉన్నప్పుడు `replacementMap`ను ఉపయోగించండి; ఇది మరింత సమృద్ధిగా ఉన్న అంతర్నిర్మిత TypeScript రీప్లేస్మెంట్ ఫంక్షన్ల ప్రవర్తనను సంరక్షిస్తూనే JSON నియమ ప్యాక్లను డేటా-మాత్రమే ఉండేలా చేస్తుంది.

## RTK ఫిల్టర్ ప్యాక్లు

RTK ఫిల్టర్లు ఇక్కడ ఉంటాయి:

```txt
open-sse/services/compression/engines/rtk/filters/<filter>.json
```

ప్రతి ఫిల్టర్, ఒక కమాండ్-అవుట్పుట్ కుటుంబాన్ని ఎలా గుర్తించాలో మరియు కుదించాలో వివరిస్తుంది.

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

### RTK ఫీల్డ్లు

| ఫీల్డ్                     | తప్పనిసరా | వివరణ                                                                            |
| -------------------------- | --------- | -------------------------------------------------------------------------------- |
| `id`                       | అవును     | స్థిరమైన ఫిల్టర్ ID                                                              |
| `label`                    | అవును     | డ్యాష్బోర్డ్లో చదవగల పేరు                                                        |
| `category`                 | అవును     | ఫిల్టర్ కుటుంబం: git, test, build, shell, docker, package, infra, cloud, generic |
| `priority`                 | కాదు      | అనేక ఫిల్టర్లు సరిపోలినప్పుడు అధిక ప్రాధాన్యత కలిగినది ఎంపికవుతుంది              |
| `match.outputTypes`        | కాదు      | ఈ ఫిల్టర్ను ఎంచుకునే డిటెక్టర్ అవుట్పుట్ IDలు                                    |
| `match.commands`           | కాదు      | ఈ ఫిల్టర్ను ఎంచుకునే కమాండ్ టోకెన్లు                                             |
| `match.patterns`           | కాదు      | అవుట్పుట్ టెక్స్ట్ ఆధారంగా ఈ ఫిల్టర్ను ఎంచుకునే regex నమూనాలు                    |
| `rules.stripAnsi`          | కాదు      | regex దశలకు ముందు ANSI escape సీక్వెన్స్లను తొలగిస్తుంది                         |
| `rules.replace`            | కాదు      | ఒక్కో లైన్పై క్రమానుసారంగా వర్తించే regex ప్రత్యామ్నాయాలు                        |
| `rules.matchOutput`        | కాదు      | ఐచ్ఛిక `unless` గార్డ్తో కూడిన షార్ట్-సర్క్యూట్ అవుట్పుట్ నియమాలు                |
| `rules.includePatterns`    | కాదు      | సంరక్షించడానికి ప్రాధాన్యం ఇవ్వాల్సిన లైన్లు                                     |
| `rules.dropPatterns`       | కాదు      | అనవసర సమాచారంగా తొలగించాల్సిన లైన్లు                                             |
| `rules.collapsePatterns`   | కాదు      | కుదించగలిగే, పదేపదే సరిపోలే లైన్లు                                               |
| `rules.deduplicate`        | కాదు      | నార్మలైజ్ చేసిన నకిలీ లైన్లను కుదిస్తుంది                                        |
| `rules.truncateLineAt`     | కాదు      | ఒక్కో లైన్కు Unicode-సురక్షిత అక్షర పరిమితి                                      |
| `rules.maxLines`           | కాదు      | చివరి భాగాన్ని సంరక్షించే ముందు ఉంచగల గరిష్ఠ లైన్ల సంఖ్య                         |
| `rules.headLines`          | కాదు      | కుదింపు సమయంలో ఉంచే ప్రారంభ లైన్లు                                               |
| `rules.tailLines`          | కాదు      | ఇటీవలి సందర్భం కోసం ఉంచే చివరి లైన్లు                                            |
| `rules.onEmpty`            | కాదు      | ఫిల్టరింగ్ మొత్తం కంటెంట్ను తొలగించినప్పుడు ఉపయోగించే ప్రత్యామ్నాయ సందేశం        |
| `rules.filterStderr`       | కాదు      | తదుపరి ఫిల్టరింగ్ దశలకు ముందు సాధారణ stderr ప్రిఫిక్స్లను నార్మలైజ్ చేస్తుంది    |
| `preserve.errorPatterns`   | కాదు      | కుదింపులోనూ నిలిచి ఉండాల్సిన ఎర్రర్ లైన్లు                                       |
| `preserve.summaryPatterns` | కాదు      | కుదింపులోనూ నిలిచి ఉండాల్సిన సారాంశ లైన్లు                                       |
| `tests[]`                  | కాదు      | RTK verify గేట్ ఉపయోగించే ఇన్లైన్ ధృవీకరణ నమూనాలు                                |

RTK డిక్లరేటివ్ దశలను ఈ క్రమంలో వర్తింపజేస్తుంది: `stripAnsi`, `filterStderr`, `replace`,
`matchOutput`, `dropPatterns`/`includePatterns`, `truncateLineAt`, `headLines`/`tailLines`,
`maxLines`, మరియు `onEmpty`.

అనుకూల ఫిల్టర్లను ఈ క్రింది స్థానాల నుంచి లోడ్ చేయవచ్చు:

1. సరిపోలే `.rtk/trust.json` హాష్ ఉన్న తర్వాత మాత్రమే లేదా
   `trustProjectFilters` ప్రారంభించబడినప్పుడు ప్రాజెక్ట్ `.rtk/filters.json` ఫైల్లు.
2. గ్లోబల్ `DATA_DIR/rtk/filters.json`.
3. అంతర్నిర్మిత ఫిల్టర్లు.

ప్రాజెక్ట్/గ్లోబల్ అనుకూల ఫైల్లు ఒక ఫిల్టర్ ఆబ్జెక్ట్ను లేదా ఫిల్టర్ ఆబ్జెక్ట్ల అర్రేను కలిగి ఉండవచ్చు. చెల్లని
అనుకూల ఫిల్టర్లు డయాగ్నస్టిక్స్తో దాటవేయబడతాయి; చెల్లని అంతర్నిర్మిత ఫిల్టర్ల వల్ల ధృవీకరణ విఫలమవుతుంది.

ప్రాజెక్ట్ ట్రస్ట్ ఫైల్:

```json
{
  "filtersSha256": "0123456789abcdef..."
}
```

ఎన్విరాన్మెంట్ ఓవర్రైడ్ `OMNIROUTE_RTK_TRUST_PROJECT_FILTERS=1`, హాష్ లేకుండానే ప్రాజెక్ట్ ఫిల్టర్లను
విశ్వసిస్తుంది; దీనిని నియంత్రిత స్థానిక డెవలప్మెంట్కు మాత్రమే పరిమితం చేయాలి.

## భద్రతా నియమాలు

- నియమాలను ఐడెంపోటెంట్గా ఉంచండి: ఒకే ఫిల్టర్ను రెండుసార్లు అమలు చేసినా అవుట్పుట్ దెబ్బతినకూడదు.
- సాధ్యమైన చోట ఖచ్చితమైన ఎర్రర్ టెక్స్ట్, ఫైల్ పాత్లు, లైన్ నంబర్లు మరియు కమాండ్ సారాంశాలను యథాతథంగా ఉంచండి.
- కోడ్ బ్లాక్లు, JSON పేలోడ్లు, URLలు లేదా సీక్రెట్లను సవరించే నియమాలను నివారించండి.
- డిటెక్టర్/ఫిల్టర్ టెస్ట్లలో కొత్త కమాండ్ ఫ్యామిలీలకు యూనిట్ కవరేజ్ను జోడించండి.
- ప్రతి అంతర్నిర్మిత ఫిల్టర్కు మరియు భాగస్వామ్య కస్టమ్ ఫిల్టర్లకు `tests[]` నమూనాలను జోడించండి.

## ధృవీకరణ

రూల్ ప్యాక్లను ఉపయోగించే ముందు ధృవీకరిస్తారు. అంతర్నిర్మిత Caveman ప్యాక్లు మరియు అంతర్నిర్మిత RTK ఫిల్టర్లు ధృవీకరణ సమయంలో వెంటనే విఫలమవుతాయి, తద్వారా లోపభూయిష్టమైన విడుదల అసెట్లు పంపిణీకి ముందే గుర్తించబడతాయి. పార్సింగ్ లేదా ట్రస్ట్ ధృవీకరణ విఫలమైనప్పుడు, కస్టమ్ RTK ఫిల్టర్లు డయాగ్నస్టిక్లతో దాటవేయబడతాయి.

కేంద్రీకృత ధృవీకరణ:

```bash
node --import tsx/esm --test tests/unit/compression/rule-loader.test.ts tests/unit/compression/language-packs.test.ts
node --import tsx/esm --test tests/unit/compression/rtk-verify.test.ts tests/unit/compression/rtk-dsl-pipeline.test.ts
```
