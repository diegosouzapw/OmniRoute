# Compression Rules Format (ગુજરાતી)

🌐 **Languages:** 🇺🇸 [English](../../../../compression/COMPRESSION_RULES_FORMAT.md) · 🇪🇹 [am](../../../am/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇸🇦 [ar](../../../ar/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇦🇿 [az](../../../az/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇧🇬 [bg](../../../bg/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇧🇩 [bn](../../../bn/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇨🇿 [cs](../../../cs/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇩🇰 [da](../../../da/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇩🇪 [de](../../../de/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇬🇷 [el](../../../el/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇪🇸 [es](../../../es/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇪🇪 [et](../../../et/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇮🇷 [fa](../../../fa/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇫🇮 [fi](../../../fi/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇫🇷 [fr](../../../fr/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇮🇪 [ga](../../../ga/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇳🇬 [ha](../../../ha/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇮🇱 [he](../../../he/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇮🇳 [hi](../../../hi/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇭🇷 [hr](../../../hr/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇭🇺 [hu](../../../hu/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇦🇲 [hy](../../../hy/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇮🇩 [id](../../../id/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇳🇬 [ig](../../../ig/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇮🇹 [it](../../../it/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇯🇵 [ja](../../../ja/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇬🇪 [ka](../../../ka/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇰🇭 [km](../../../km/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇮🇳 [kn](../../../kn/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇰🇷 [ko](../../../ko/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇱🇹 [lt](../../../lt/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇱🇻 [lv](../../../lv/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇮🇳 [ml](../../../ml/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇮🇳 [mr](../../../mr/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇲🇾 [ms](../../../ms/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇲🇹 [mt](../../../mt/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇲🇲 [my](../../../my/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇳🇵 [ne](../../../ne/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇳🇱 [nl](../../../nl/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇳🇴 [no](../../../no/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇮🇳 [or](../../../or/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇮🇳 [pa](../../../pa/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇵🇭 [phi](../../../phi/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇵🇱 [pl](../../../pl/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇵🇹 [pt](../../../pt/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇷🇴 [ro](../../../ro/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇷🇺 [ru](../../../ru/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇱🇰 [si](../../../si/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇸🇰 [sk](../../../sk/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇸🇮 [sl](../../../sl/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇷🇸 [sr](../../../sr/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇸🇪 [sv](../../../sv/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇰🇪 [sw](../../../sw/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇮🇳 [ta](../../../ta/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇮🇳 [te](../../../te/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇹🇭 [th](../../../th/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇹🇷 [tr](../../../tr/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇵🇰 [ur](../../../ur/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇺🇿 [uz](../../../uz/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇻🇳 [vi](../../../vi/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇳🇬 [yo](../../../yo/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/compression/COMPRESSION_RULES_FORMAT.md)

---

કમ્પ્રેશન નિયમો એવા JSON ફાઇલો છે જે runtime પર લોડ થાય છે. તેમને ઇરાદાપૂર્વક માત્ર ડેટા-આધારિત રાખવામાં આવ્યા છે, જેથી નવા
language packs અને RTK command filters ની engine code બદલ્યા વિના સમીક્ષા કરી શકાય.

> **પ્રમાણભૂત schema (સત્યનો મૂળ સ્રોત):** [`open-sse/services/compression/rules/_schema.json`](../../open-sse/services/compression/rules/_schema.json) (JSON Schema draft 2020-12).
> નીચેના ઉદાહરણો માત્ર સમજ માટે છે — શંકા હોય ત્યારે તમારા pack ને `_schema.json` સામે validate કરો.

## Caveman Rule Packs

Caveman rule packs અહીં સ્થિત હોય છે:

```txt
open-sse/services/compression/rules/<language>/<pack>.json
```

દરેક pack માં એવા replacements હોય છે, જે protected regions ને અલગ કર્યા પછી સામાન્ય ગદ્ય પર લાગુ થાય છે.

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
      "description": "વિસ્તૃત પ્રશ્નોને સીધી વિનંતીઓમાં રૂપાંતરિત કરો."
    }
  ]
}
```

### Caveman Fields

| ફીલ્ડ                    | આવશ્યક | વર્ણન                                                                    |
| ------------------------ | ------ | ------------------------------------------------------------------------ |
| `language`               | હા     | BCP-47-સમાન language key, જેમ કે `en`, `pt-BR`, `es`                     |
| `category`               | હા     | Pack category filename/category, ઉદાહરણ તરીકે `filler` અથવા `dedup`      |
| `rules`                  | હા     | regex replacement rules ની array                                         |
| `rules[].name`           | હા     | સ્થિર rule name                                                          |
| `rules[].pattern`        | હા     | JavaScript regex source                                                  |
| `rules[].flags`          | ના     | JavaScript regex flags; default `gi`                                     |
| `rules[].replacement`    | ના     | `replacementMap` માં મેળ ન મળે ત્યારે replacement string અથવા fallback   |
| `rules[].replacementMap` | ના     | normalized matched text દ્વારા keyed કરાયેલા match-specific replacements |
| `rules[].context`        | ના     | `all`, `user`, `assistant`, અથવા `system`; default `all`                 |
| `rules[].category`       | ના     | `filler`, `context`, `structural`, `dedup`, `terse`, અથવા `ultra`        |
| `rules[].minIntensity`   | ના     | `lite`, `full`, અથવા `ultra`; default `lite`                             |
| `rules[].description`    | ના     | માનવ-વાંચનીય rule summary                                                |

જ્યારે case-sensitive matching મહત્વનું હોય ત્યારે `flags` નો ઉપયોગ કરો, ઉદાહરણ તરીકે lowercase ગદ્ય પહેલાં article removal
કરતી વખતે `the OpenAI API` ને દૂર કર્યા વિના. જ્યારે એક regex માં અનેક alternatives હોય અને તેમને
અલગ outputs ની જરૂર હોય ત્યારે `replacementMap` નો ઉપયોગ કરો; આ વધુ સમૃદ્ધ built-in TypeScript replacement functions નું વર્તન
જાળવી રાખીને JSON rule packs ને માત્ર ડેટા-આધારિત રાખે છે.

## RTK ફિલ્ટર પૅક્સ

RTK ફિલ્ટર્સ અહીં સ્થિત છે:

```txt
open-sse/services/compression/engines/rtk/filters/<filter>.json
```

દરેક ફિલ્ટર કમાન્ડ-આઉટપુટના સમૂહને કેવી રીતે ઓળખવો અને સંકુચિત કરવો તે વર્ણવે છે.

```json
{
  "id": "test-vitest",
  "label": "Vitest આઉટપુટ",
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
      "name": "નિષ્ફળ થતી કસોટીઓને જાળવે છે",
      "command": "vitest",
      "input": "FAIL test/a.test.ts\\nError: boom\\nTest Files 1 failed",
      "expected": "FAIL test/a.test.ts\\nError: boom\\nTest Files 1 failed"
    }
  ]
}
```

### RTK ફીલ્ડ્સ

| ફીલ્ડ                      | આવશ્યક | વર્ણન                                                                        |
| -------------------------- | ------ | ---------------------------------------------------------------------------- |
| `id`                       | હા     | સ્થિર ફિલ્ટર id                                                              |
| `label`                    | હા     | ડૅશબોર્ડમાં વાંચી શકાય તેવું નામ                                             |
| `category`                 | હા     | ફિલ્ટર સમૂહ: git, test, build, shell, docker, package, infra, cloud, generic |
| `priority`                 | ના     | અનેક ફિલ્ટર્સ મેળ ખાતાં હોય ત્યારે ઉચ્ચ પ્રાથમિકતાવાળું ફિલ્ટર પસંદ થાય છે   |
| `match.outputTypes`        | ના     | આ ફિલ્ટર પસંદ કરતા ડિટેક્ટર આઉટપુટ ids                                       |
| `match.commands`           | ના     | આ ફિલ્ટર પસંદ કરતા કમાન્ડ ટોકન્સ                                             |
| `match.patterns`           | ના     | આઉટપુટ ટેક્સ્ટમાંથી આ ફિલ્ટર પસંદ કરતા regex પેટર્ન્સ                        |
| `rules.stripAnsi`          | ના     | regex તબક્કાઓ પહેલાં ANSI એસ્કેપ સિક્વન્સ દૂર કરે છે                         |
| `rules.replace`            | ના     | લાઇન પ્રમાણે લાગુ કરાતા ક્રમબદ્ધ regex અવેજીકરણો                             |
| `rules.matchOutput`        | ના     | વૈકલ્પિક `unless` ગાર્ડ સાથેના શૉર્ટ-સર્કિટ આઉટપુટ નિયમો                     |
| `rules.includePatterns`    | ના     | જાળવી રાખવા માટે પ્રાથમિકતા આપવાની લાઇનો                                     |
| `rules.dropPatterns`       | ના     | અનાવશ્યક સામગ્રી તરીકે દૂર કરવાની લાઇનો                                      |
| `rules.collapsePatterns`   | ના     | વારંવાર આવતી મેળ ખાતી લાઇનો, જેને સંક્ષિપ્ત કરી શકાય                         |
| `rules.deduplicate`        | ના     | ડુપ્લિકેટ નોર્મલાઇઝ્ડ લાઇનોને સંક્ષિપ્ત કરે છે                               |
| `rules.truncateLineAt`     | ના     | દરેક લાઇન માટે Unicode-સુરક્ષિત અક્ષર મર્યાદા                                |
| `rules.maxLines`           | ના     | અંતિમ લાઇનો જાળવતાં પહેલાં રાખવામાં આવતી મહત્તમ લાઇનો                        |
| `rules.headLines`          | ના     | ટ્રન્કેશન દરમિયાન જાળવવામાં આવતી શરૂઆતની લાઇનો                               |
| `rules.tailLines`          | ના     | તાજેતરના સંદર્ભ માટે જાળવવામાં આવતી અંતિમ લાઇનો                              |
| `rules.onEmpty`            | ના     | ફિલ્ટરિંગથી બધી સામગ્રી દૂર થાય ત્યારે વપરાતો ફૉલબૅક સંદેશ                   |
| `rules.filterStderr`       | ના     | પછીના ફિલ્ટરિંગ તબક્કાઓ પહેલાં સામાન્ય stderr પ્રીફિક્સને નોર્મલાઇઝ કરે છે   |
| `preserve.errorPatterns`   | ના     | ટ્રન્કેશન પછી પણ જળવાઈ રહેવી જોઈએ તેવી ભૂલ લાઇનો                             |
| `preserve.summaryPatterns` | ના     | ટ્રન્કેશન પછી પણ જળવાઈ રહેવી જોઈએ તેવી સારાંશ લાઇનો                          |
| `tests[]`                  | ના     | RTK ચકાસણી ગેટ દ્વારા ઉપયોગમાં લેવાતા ઇનલાઇન ચકાસણી નમૂનાઓ                   |

RTK આ ક્રમમાં ઘોષણાત્મક તબક્કાઓ લાગુ કરે છે: `stripAnsi`, `filterStderr`, `replace`,
`matchOutput`, `dropPatterns`/`includePatterns`, `truncateLineAt`, `headLines`/`tailLines`,
`maxLines`, અને `onEmpty`.

કસ્ટમ ફિલ્ટર્સ અહીંથી લોડ કરી શકાય છે:

1. પ્રોજેક્ટની `.rtk/filters.json` ફાઇલો માત્ર ત્યારે, જ્યારે મેળ ખાતો `.rtk/trust.json` હૅશ હાજર હોય અથવા
   `trustProjectFilters` સક્ષમ કરેલું હોય.
2. વૈશ્વિક `DATA_DIR/rtk/filters.json`.
3. બિલ્ટ-ઇન ફિલ્ટર્સ.

પ્રોજેક્ટ/વૈશ્વિક કસ્ટમ ફાઇલોમાં એક ફિલ્ટર ઑબ્જેક્ટ અથવા ફિલ્ટર ઑબ્જેક્ટ્સની ઍરે હોઈ શકે છે. અમાન્ય
કસ્ટમ ફિલ્ટર્સને ડાયગ્નોસ્ટિક્સ સાથે અવગણવામાં આવે છે; અમાન્ય બિલ્ટ-ઇન ફિલ્ટર્સથી માન્યતા નિષ્ફળ જાય છે.

પ્રોજેક્ટ ટ્રસ્ટ ફાઇલ:

```json
{
  "filtersSha256": "0123456789abcdef..."
}
```

એન્વાયર્નમેન્ટ ઓવરરાઇડ `OMNIROUTE_RTK_TRUST_PROJECT_FILTERS=1` હૅશ વિના પ્રોજેક્ટ ફિલ્ટર્સ પર વિશ્વાસ કરે છે અને
તેનો ઉપયોગ નિયંત્રિત સ્થાનિક ડેવલપમેન્ટ પૂરતો મર્યાદિત રાખવો જોઈએ.

## સુરક્ષા નિયમો

- નિયમોને આઇડેમ્પોટન્ટ રાખો: સમાન ફિલ્ટરને બે વાર ચલાવવાથી આઉટપુટ બગડવું જોઈએ નહીં.
- શક્ય હોય ત્યાં ચોક્કસ એરર ટેક્સ્ટ, ફાઇલ પાથ, લાઇન નંબર અને કમાન્ડ સારાંશ જાળવો.
- કોડ બ્લૉક્સ, JSON પેલોડ્સ, URLs અથવા સિક્રેટ્સને બદલતા નિયમો ટાળો.
- ડિટેક્ટર/ફિલ્ટર ટેસ્ટ્સમાં નવી કમાન્ડ ફૅમિલીઝ માટે યુનિટ કવરેજ ઉમેરો.
- દરેક બિલ્ટ-ઇન ફિલ્ટર અને શેર્ડ કસ્ટમ ફિલ્ટર્સમાં `tests[]` સૅમ્પલ્સ ઉમેરો.

## માન્યતા ચકાસણી

ઉપયોગ પહેલાં રૂલ પૅક્સની માન્યતા ચકાસવામાં આવે છે. બિલ્ટ-ઇન Caveman પૅક્સ અને બિલ્ટ-ઇન RTK ફિલ્ટર્સ માન્યતા ચકાસણી દરમિયાન તરત નિષ્ફળ જાય છે, જેથી ખામીયુક્ત રિલીઝ ઍસેટ્સ શિપમેન્ટ પહેલાં પકડાઈ જાય. પાર્સિંગ અથવા ટ્રસ્ટ માન્યતા ચકાસણી નિષ્ફળ જાય ત્યારે કસ્ટમ RTK ફિલ્ટર્સને ડાયગ્નોસ્ટિક્સ સાથે અવગણવામાં આવે છે.

કેન્દ્રિત માન્યતા ચકાસણી:

```bash
node --import tsx/esm --test tests/unit/compression/rule-loader.test.ts tests/unit/compression/language-packs.test.ts
node --import tsx/esm --test tests/unit/compression/rtk-verify.test.ts tests/unit/compression/rtk-dsl-pipeline.test.ts
```
