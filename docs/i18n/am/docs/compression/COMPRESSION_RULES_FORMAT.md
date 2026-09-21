# Compression Rules Format (አማርኛ)

🌐 **Languages:** 🇺🇸 [English](../../../../compression/COMPRESSION_RULES_FORMAT.md) · 🇸🇦 [ar](../../../ar/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇦🇿 [az](../../../az/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇧🇬 [bg](../../../bg/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇧🇩 [bn](../../../bn/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇨🇿 [cs](../../../cs/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇩🇰 [da](../../../da/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇩🇪 [de](../../../de/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇬🇷 [el](../../../el/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇪🇸 [es](../../../es/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇪🇪 [et](../../../et/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇮🇷 [fa](../../../fa/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇫🇮 [fi](../../../fi/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇫🇷 [fr](../../../fr/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇮🇪 [ga](../../../ga/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇮🇳 [gu](../../../gu/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇳🇬 [ha](../../../ha/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇮🇱 [he](../../../he/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇮🇳 [hi](../../../hi/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇭🇷 [hr](../../../hr/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇭🇺 [hu](../../../hu/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇦🇲 [hy](../../../hy/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇮🇩 [id](../../../id/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇳🇬 [ig](../../../ig/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇮🇹 [it](../../../it/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇯🇵 [ja](../../../ja/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇬🇪 [ka](../../../ka/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇰🇭 [km](../../../km/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇮🇳 [kn](../../../kn/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇰🇷 [ko](../../../ko/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇱🇹 [lt](../../../lt/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇱🇻 [lv](../../../lv/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇮🇳 [ml](../../../ml/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇮🇳 [mr](../../../mr/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇲🇾 [ms](../../../ms/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇲🇹 [mt](../../../mt/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇲🇲 [my](../../../my/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇳🇵 [ne](../../../ne/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇳🇱 [nl](../../../nl/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇳🇴 [no](../../../no/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇮🇳 [or](../../../or/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇮🇳 [pa](../../../pa/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇵🇭 [phi](../../../phi/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇵🇱 [pl](../../../pl/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇵🇹 [pt](../../../pt/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇷🇴 [ro](../../../ro/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇷🇺 [ru](../../../ru/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇱🇰 [si](../../../si/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇸🇰 [sk](../../../sk/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇸🇮 [sl](../../../sl/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇷🇸 [sr](../../../sr/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇸🇪 [sv](../../../sv/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇰🇪 [sw](../../../sw/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇮🇳 [ta](../../../ta/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇮🇳 [te](../../../te/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇹🇭 [th](../../../th/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇹🇷 [tr](../../../tr/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇵🇰 [ur](../../../ur/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇺🇿 [uz](../../../uz/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇻🇳 [vi](../../../vi/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇳🇬 [yo](../../../yo/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/compression/COMPRESSION_RULES_FORMAT.md)

---

የማመቅ ደንቦች በአሂድ ጊዜ የሚጫኑ JSON ፋይሎች ናቸው። አዲስ የቋንቋ ጥቅሎችን እና የRTK ትዕዛዝ ማጣሪያዎችን የሞተሩን ኮድ ሳይቀይሩ መገምገም እንዲቻል ሆን ተብለው ውሂብ-ብቻ እንዲሆኑ ተደርገዋል።

> **ቀኖናዊ መርሃግብር (የእውነት ምንጭ):** [`open-sse/services/compression/rules/_schema.json`](../../open-sse/services/compression/rules/_schema.json) (JSON Schema draft 2020-12)።
> ከታች ያሉት ምሳሌዎች ለማብራሪያ ብቻ ናቸው — ጥርጣሬ ሲኖርዎት ጥቅልዎን ከ`_schema.json` ጋር ያረጋግጡ።

## የCaveman ደንብ ጥቅሎች

የCaveman ደንብ ጥቅሎች በሚከተለው ሥር ይገኛሉ፦

```txt
open-sse/services/compression/rules/<language>/<pack>.json
```

እያንዳንዱ ጥቅል የተጠበቁ ክልሎች ከተለዩ በኋላ በመደበኛ ጽሑፍ ላይ የሚተገበሩ ተተኪዎችን ይይዛል።

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

### የCaveman መስኮች

| መስክ                      | አስፈላጊ | መግለጫ                                                            |
| ------------------------ | ----- | --------------------------------------------------------------- |
| `language`               | አዎ    | እንደ `en`፣ `pt-BR`፣ `es` ያለ BCP-47-መሰል የቋንቋ ቁልፍ                  |
| `category`               | አዎ    | የጥቅል ምድብ ፋይል ስም/ምድብ፣ ለምሳሌ `filler` ወይም `dedup`                  |
| `rules`                  | አዎ    | የregex ተተኪ ደንቦች ድርድር                                            |
| `rules[].name`           | አዎ    | የማይለዋወጥ የደንብ ስም                                                 |
| `rules[].pattern`        | አዎ    | የJavaScript regex ምንጭ                                           |
| `rules[].flags`          | አይ    | የJavaScript regex ምልክቶች፤ ነባሪው `gi` ነው                           |
| `rules[].replacement`    | አይ    | የተተኪ ሕብረቁምፊ ወይም `replacementMap` ሲያጣ የሚያገለግል አማራጭ               |
| `rules[].replacementMap` | አይ    | በተደበኛ መልክ በተስማማው ጽሑፍ የተቆለፉ፣ ለእያንዳንዱ ተዛማጅ የተለዩ ተተኪዎች             |
| `rules[].context`        | አይ    | `all`፣ `user`፣ `assistant` ወይም `system`፤ ነባሪው `all` ነው          |
| `rules[].category`       | አይ    | `filler`፣ `context`፣ `structural`፣ `dedup`፣ `terse` ወይም `ultra` |
| `rules[].minIntensity`   | አይ    | `lite`፣ `full` ወይም `ultra`፤ ነባሪው `lite` ነው                      |
| `rules[].description`    | አይ    | ለሰው ሊነበብ የሚችል የደንቡ ማጠቃለያ                                        |

የፊደል መጠንን የሚለይ ማዛመድ አስፈላጊ ሲሆን `flags`ን ይጠቀሙ፤ ለምሳሌ፣ `the OpenAI API`ን ሳያስወግዱ በትንሽ ፊደል ከተጻፈ ጽሑፍ በፊት ያለን መስተዋድድ ለማስወገድ። አንድ regex የተለያዩ ውጤቶችን የሚፈልጉ በርካታ አማራጮች ሲኖሩት `replacementMap`ን ይጠቀሙ፤ ይህም የበለጸጉትን አብሮ የተካተቱ የTypeScript ተተኪ ተግባራት ባህሪ እየጠበቀ፣ የJSON ደንብ ጥቅሎች ውሂብ-ብቻ ሆነው እንዲቆዩ ያደርጋል።

## RTK የማጣሪያ ጥቅሎች

RTK ማጣሪያዎች በሚከተለው ስር ይገኛሉ፦

```txt
open-sse/services/compression/engines/rtk/filters/<filter>.json
```

እያንዳንዱ ማጣሪያ አንድን የትዕዛዝ ውጤት ስብስብ እንዴት መለየትና መጭመቅ እንደሚቻል ይገልጻል።

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

### የRTK መስኮች

| መስክ                        | አስፈላጊ | መግለጫ                                                                        |
| -------------------------- | ----- | --------------------------------------------------------------------------- |
| `id`                       | አዎ    | የማይለወጥ የማጣሪያ መለያ                                                            |
| `label`                    | አዎ    | በዳሽቦርድ ላይ ሊነበብ የሚችል ስም                                                      |
| `category`                 | አዎ    | የማጣሪያ ስብስብ፦ git, test, build, shell, docker, package, infra, cloud, generic |
| `priority`                 | አይ    | ብዙ ማጣሪያዎች ሲዛመዱ ከፍተኛ ቅድሚያ ያለው ያሸንፋል                                          |
| `match.outputTypes`        | አይ    | ይህን ማጣሪያ የሚመርጡ የመለያ ሰጪው የውጤት መለያዎች                                          |
| `match.commands`           | አይ    | ይህን ማጣሪያ የሚመርጡ የትዕዛዝ ቶከኖች                                                   |
| `match.patterns`           | አይ    | ከውጤት ጽሑፍ ይህን ማጣሪያ የሚመርጡ የRegex ስርዓተ ጥለቶች                                    |
| `rules.stripAnsi`          | አይ    | ከRegex ደረጃዎች በፊት የANSI ማምለጫ ቅደም ተከተሎችን ያስወግዳል                               |
| `rules.replace`            | አይ    | በየመስመሩ በቅደም ተከተል የሚተገበሩ የRegex ምትኮች                                         |
| `rules.matchOutput`        | አይ    | አማራጭ `unless` ጠባቂ ያላቸው የውጤት አቋራጭ ደንቦች                                       |
| `rules.includePatterns`    | አይ    | እንዲጠበቁ ቅድሚያ የሚሰጣቸው መስመሮች                                                    |
| `rules.dropPatterns`       | አይ    | እንደ አላስፈላጊ ይዘት የሚወገዱ መስመሮች                                                  |
| `rules.collapsePatterns`   | አይ    | ሊጠቃለሉ የሚችሉ ተደጋጋሚ ተዛማጅ መስመሮች                                                 |
| `rules.deduplicate`        | አይ    | የተደጋገሙ መደበኛ የተደረጉ መስመሮችን ያጠቃልላል                                             |
| `rules.truncateLineAt`     | አይ    | Unicode-ደህንነቱ የተጠበቀ የእያንዳንዱ መስመር የቁምፊ ገደብ                                   |
| `rules.maxLines`           | አይ    | የመጨረሻ መስመሮች ከመጠበቃቸው በፊት የሚቀመጡ ከፍተኛው የመስመሮች ብዛት                              |
| `rules.headLines`          | አይ    | በመቁረጥ ጊዜ የሚቀመጡ የመጀመሪያ መስመሮች                                                 |
| `rules.tailLines`          | አይ    | የቅርብ ጊዜ አውድን ለመጠበቅ የሚቀመጡ የመጨረሻ መስመሮች                                        |
| `rules.onEmpty`            | አይ    | ማጣራቱ ሁሉንም ይዘት ሲያስወግድ የሚታይ ተተኪ መልዕክት                                         |
| `rules.filterStderr`       | አይ    | ከቀጣዮቹ የማጣራት ደረጃዎች በፊት የተለመዱ የstderr ቅድመ ቅጥያዎችን መደበኛ ያደርጋል                   |
| `preserve.errorPatterns`   | አይ    | ከመቁረጥ በኋላም ሊቆዩ የሚገባቸው የስህተት መስመሮች                                           |
| `preserve.summaryPatterns` | አይ    | ከመቁረጥ በኋላም ሊቆዩ የሚገባቸው የማጠቃለያ መስመሮች                                          |
| `tests[]`                  | አይ    | በRTK ማረጋገጫ በር የሚጠቀሙ ውስጠ-መስመር የማረጋገጫ ናሙናዎች                                   |

RTK መግለጫዊ ደረጃዎቹን በዚህ ቅደም ተከተል ይተገብራል፦ `stripAnsi`, `filterStderr`, `replace`,
`matchOutput`, `dropPatterns`/`includePatterns`, `truncateLineAt`, `headLines`/`tailLines`,
`maxLines`, እና `onEmpty`።

ብጁ ማጣሪያዎች ከሚከተሉት ሊጫኑ ይችላሉ፦

1. የፕሮጀክት `.rtk/filters.json` ፋይሎች፤ እነዚህ የሚጫኑት ተዛማጅ `.rtk/trust.json` hash ከተገኘ በኋላ ወይም
   `trustProjectFilters` ከነቃ ብቻ ነው።
2. ዓለም አቀፍ `DATA_DIR/rtk/filters.json`።
3. አብሮገነብ ማጣሪያዎች።

የፕሮጀክት/ዓለም አቀፍ ብጁ ፋይሎች አንድ የማጣሪያ ኦብጀክት ወይም የማጣሪያ ኦብጀክቶች ድርድር ሊይዙ ይችላሉ። ልክ ያልሆኑ
ብጁ ማጣሪያዎች ከምርመራ መረጃዎች ጋር ይዘለላሉ፤ ልክ ያልሆኑ አብሮገነብ ማጣሪያዎች ግን ማረጋገጡን ያሳክታሉ።

የፕሮጀክት እምነት ፋይል፦

```json
{
  "filtersSha256": "0123456789abcdef..."
}
```

የአካባቢ ለውጥ `OMNIROUTE_RTK_TRUST_PROJECT_FILTERS=1` ያለ hash የፕሮጀክት ማጣሪያዎችን የታመኑ አድርጎ
ይቆጥራል፤ አጠቃቀሙም ቁጥጥር ባለበት የአካባቢ ልማት ብቻ ሊገደብ ይገባል።

## የደህንነት ደንቦች

- ደንቦችን ተደጋጋሚ አፈጻጸምን በሚቋቋም መልኩ ያቆዩ፦ ተመሳሳዩን ማጣሪያ ሁለት ጊዜ ማስኬድ ውጤቱን ማበላሸት የለበትም።
- በተቻለ መጠን ትክክለኛውን የስህተት ጽሑፍ፣ የፋይል ዱካዎችን፣ የመስመር ቁጥሮችን እና የትዕዛዝ ማጠቃለያዎችን ሳይቀይሩ ያቆዩ።
- የኮድ ብሎኮችን፣ JSON ይዘቶችን፣ URLs ወይም ሚስጥሮችን የሚቀይሩ ደንቦችን ያስወግዱ።
- በፈላጊ/ማጣሪያ ሙከራዎች ውስጥ ለአዲስ የትዕዛዝ ስብስቦች የአሃድ ሙከራ ሽፋን ያክሉ።
- ለእያንዳንዱ አብሮገነብ ማጣሪያ እና ለጋራ ብጁ ማጣሪያዎች `tests[]` ናሙናዎችን ያክሉ።

## ማረጋገጫ

የደንብ ጥቅሎች ከጥቅም ላይ ከመዋላቸው በፊት ይረጋገጣሉ። አብሮገነብ Caveman ጥቅሎች እና አብሮገነብ RTK ማጣሪያዎች
የተበላሹ የልቀት ሀብቶች ከመላካቸው በፊት እንዲገኙ በማረጋገጫ ጊዜ ወዲያውኑ ይሳናሉ። ብጁ RTK ማጣሪያዎች
የመተንተን ወይም የታማኝነት ማረጋገጫ ሲሳካ ከምርመራ መረጃዎች ጋር ይዘለላሉ።

ያተኮረ ማረጋገጫ፦

```bash
node --import tsx/esm --test tests/unit/compression/rule-loader.test.ts tests/unit/compression/language-packs.test.ts
node --import tsx/esm --test tests/unit/compression/rtk-verify.test.ts tests/unit/compression/rtk-dsl-pipeline.test.ts
```
