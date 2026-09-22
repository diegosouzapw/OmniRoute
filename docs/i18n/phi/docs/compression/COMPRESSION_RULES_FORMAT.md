# Compression Rules Format (Filipino)

🌐 **Languages:** 🇺🇸 [English](../../../../compression/COMPRESSION_RULES_FORMAT.md) · 🇪🇹 [am](../../../am/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇸🇦 [ar](../../../ar/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇦🇿 [az](../../../az/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇧🇬 [bg](../../../bg/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇧🇩 [bn](../../../bn/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇨🇿 [cs](../../../cs/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇩🇰 [da](../../../da/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇩🇪 [de](../../../de/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇬🇷 [el](../../../el/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇪🇸 [es](../../../es/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇪🇪 [et](../../../et/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇮🇷 [fa](../../../fa/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇫🇮 [fi](../../../fi/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇫🇷 [fr](../../../fr/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇮🇪 [ga](../../../ga/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇮🇳 [gu](../../../gu/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇳🇬 [ha](../../../ha/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇮🇱 [he](../../../he/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇮🇳 [hi](../../../hi/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇭🇷 [hr](../../../hr/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇭🇺 [hu](../../../hu/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇦🇲 [hy](../../../hy/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇮🇩 [id](../../../id/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇳🇬 [ig](../../../ig/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇮🇹 [it](../../../it/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇯🇵 [ja](../../../ja/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇬🇪 [ka](../../../ka/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇰🇭 [km](../../../km/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇮🇳 [kn](../../../kn/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇰🇷 [ko](../../../ko/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇱🇹 [lt](../../../lt/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇱🇻 [lv](../../../lv/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇮🇳 [ml](../../../ml/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇮🇳 [mr](../../../mr/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇲🇾 [ms](../../../ms/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇲🇹 [mt](../../../mt/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇲🇲 [my](../../../my/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇳🇵 [ne](../../../ne/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇳🇱 [nl](../../../nl/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇳🇴 [no](../../../no/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇮🇳 [or](../../../or/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇮🇳 [pa](../../../pa/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇵🇱 [pl](../../../pl/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇵🇹 [pt](../../../pt/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇷🇴 [ro](../../../ro/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇷🇺 [ru](../../../ru/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇱🇰 [si](../../../si/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇸🇰 [sk](../../../sk/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇸🇮 [sl](../../../sl/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇷🇸 [sr](../../../sr/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇸🇪 [sv](../../../sv/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇰🇪 [sw](../../../sw/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇮🇳 [ta](../../../ta/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇮🇳 [te](../../../te/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇹🇭 [th](../../../th/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇹🇷 [tr](../../../tr/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇵🇰 [ur](../../../ur/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇺🇿 [uz](../../../uz/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇻🇳 [vi](../../../vi/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇳🇬 [yo](../../../yo/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/compression/COMPRESSION_RULES_FORMAT.md)

---

Ang mga panuntunan sa compression ay mga JSON file na nilo-load sa runtime. Sadyang data-only ang mga ito upang masuri ang mga bagong
language pack at filter ng RTK command nang hindi binabago ang engine code.

> **Kanonikal na schema (pinagmumulan ng katotohanan):** [`open-sse/services/compression/rules/_schema.json`](../../open-sse/services/compression/rules/_schema.json) (JSON Schema draft 2020-12).
> Ang mga halimbawa sa ibaba ay para sa paglalarawan lamang — kapag may pag-aalinlangan, i-validate ang iyong pack gamit ang `_schema.json`.

## Mga Caveman Rule Pack

Matatagpuan ang mga Caveman rule pack sa:

```txt
open-sse/services/compression/rules/<language>/<pack>.json
```

Naglalaman ang bawat pack ng mga replacement na inilalapat sa karaniwang prosa matapos ihiwalay ang mga protektadong rehiyon.

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

### Mga Field ng Caveman

| Field                    | Kinakailangan | Paglalarawan                                                                            |
| ------------------------ | ------------- | --------------------------------------------------------------------------------------- |
| `language`               | oo            | BCP-47-like na language key gaya ng `en`, `pt-BR`, `es`                                 |
| `category`               | oo            | Filename/kategorya ng pack, halimbawa `filler` o `dedup`                                |
| `rules`                  | oo            | Array ng mga regex replacement rule                                                     |
| `rules[].name`           | oo            | Matatag na pangalan ng panuntunan                                                       |
| `rules[].pattern`        | oo            | JavaScript regex source                                                                 |
| `rules[].flags`          | hindi         | Mga JavaScript regex flag; default ang `gi`                                             |
| `rules[].replacement`    | hindi         | Replacement string o fallback kapag walang tugma sa `replacementMap`                    |
| `rules[].replacementMap` | hindi         | Mga replacement na partikular sa tugma, gamit ang normalized na matched text bilang key |
| `rules[].context`        | hindi         | `all`, `user`, `assistant`, o `system`; default ang `all`                               |
| `rules[].category`       | hindi         | `filler`, `context`, `structural`, `dedup`, `terse`, o `ultra`                          |
| `rules[].minIntensity`   | hindi         | `lite`, `full`, o `ultra`; default ang `lite`                                           |
| `rules[].description`    | hindi         | Buod ng panuntunan na nababasa ng tao                                                   |

Gamitin ang `flags` kapag mahalaga ang case-sensitive na pagtutugma, halimbawa sa pag-aalis ng article bago ang lowercase na prosa
nang hindi inaalis ang `the OpenAI API`. Gamitin ang `replacementMap` kapag ang isang regex ay may maraming alternatibo
na nangangailangan ng magkakaibang output; pinananatili nitong data-only ang mga JSON rule pack habang pinapanatili ang gawi ng
mas mayamang built-in na mga TypeScript replacement function.

## Mga RTK Filter Pack

Matatagpuan ang mga RTK filter sa ilalim ng:

```txt
open-sse/services/compression/engines/rtk/filters/<filter>.json
```

Inilalarawan ng bawat filter kung paano tukuyin at i-compress ang isang pamilya ng output ng command.

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

### Mga Field ng RTK

| Field                      | Kinakailangan | Paglalarawan                                                                                |
| -------------------------- | ------------- | ------------------------------------------------------------------------------------------- |
| `id`                       | oo            | Matatag na id ng filter                                                                     |
| `label`                    | oo            | Pangalan na madaling basahin sa dashboard                                                   |
| `category`                 | oo            | Pamilya ng filter: git, test, build, shell, docker, package, infra, cloud, generic          |
| `priority`                 | hindi         | Ang mas mataas na priyoridad ang mananaig kapag maraming filter ang tumugma                 |
| `match.outputTypes`        | hindi         | Mga output id ng detector na pipili sa filter na ito                                        |
| `match.commands`           | hindi         | Mga token ng command na pipili sa filter na ito                                             |
| `match.patterns`           | hindi         | Mga regex pattern na pipili sa filter na ito mula sa teksto ng output                       |
| `rules.stripAnsi`          | hindi         | Alisin ang mga ANSI escape sequence bago ang mga yugto ng regex                             |
| `rules.replace`            | hindi         | Mga nakaayos na regex substitution na inilalapat sa bawat linya                             |
| `rules.matchOutput`        | hindi         | Mga panuntunan sa short-circuit output na may opsyonal na `unless` guard                    |
| `rules.includePatterns`    | hindi         | Mga linyang mas gustong panatilihin                                                         |
| `rules.dropPatterns`       | hindi         | Mga linyang aalisin bilang ingay                                                            |
| `rules.collapsePatterns`   | hindi         | Mga paulit-ulit na tumutugmang linya na maaaring pagsama-samahin                            |
| `rules.deduplicate`        | hindi         | Pagsama-samahin ang mga duplikadong na-normalize na linya                                   |
| `rules.truncateLineAt`     | hindi         | Unicode-safe na limitasyon ng character sa bawat linya                                      |
| `rules.maxLines`           | hindi         | Pinakamataas na bilang ng mga linyang pananatilihin bago ang pagpapanatili sa hulihan       |
| `rules.headLines`          | hindi         | Mga linya sa unahan na pananatilihin habang nagta-truncate                                  |
| `rules.tailLines`          | hindi         | Mga linya sa hulihan na pananatilihin para sa pinakabagong konteksto                        |
| `rules.onEmpty`            | hindi         | Fallback na mensahe kapag inalis ng pag-filter ang lahat ng nilalaman                       |
| `rules.filterStderr`       | hindi         | I-normalize ang mga karaniwang prefix ng stderr bago ang mga susunod na yugto ng pag-filter |
| `preserve.errorPatterns`   | hindi         | Mga linya ng error na dapat manatili pagkatapos ng truncation                               |
| `preserve.summaryPatterns` | hindi         | Mga linya ng buod na dapat manatili pagkatapos ng truncation                                |
| `tests[]`                  | hindi         | Mga inline na sample ng beripikasyon na ginagamit ng RTK verify gate                        |

Inilalapat ng RTK ang mga deklaratibong yugto sa ganitong pagkakasunod-sunod: `stripAnsi`, `filterStderr`, `replace`,
`matchOutput`, `dropPatterns`/`includePatterns`, `truncateLineAt`, `headLines`/`tailLines`,
`maxLines`, at `onEmpty`.

Maaaring i-load ang mga custom na filter mula sa:

1. Mga project `.rtk/filters.json` file, ngunit pagkatapos lamang magkaroon ng katugmang `.rtk/trust.json` hash o
   kapag naka-enable ang `trustProjectFilters`.
2. Global na `DATA_DIR/rtk/filters.json`.
3. Mga built-in na filter.

Maaaring maglaman ang mga project/global custom file ng isang filter object o array ng mga filter object. Nilalaktawan
ang mga di-wastong custom na filter nang may diagnostics; mabibigo naman sa validation ang mga di-wastong built-in na filter.

Trust file ng project:

```json
{
  "filtersSha256": "0123456789abcdef..."
}
```

Pinagkakatiwalaan ng environment override na `OMNIROUTE_RTK_TRUST_PROJECT_FILTERS=1` ang mga project filter nang walang
hash at dapat itong gamitin lamang sa kontroladong lokal na development.

## Mga Panuntunan sa Kaligtasan

- Panatilihing idempotent ang mga panuntunan: hindi dapat masira ang output kapag pinatakbo nang dalawang beses ang parehong filter.
- Panatilihin ang eksaktong teksto ng error, mga file path, mga numero ng linya, at mga buod ng command hangga't maaari.
- Iwasan ang mga panuntunang nagbabago sa mga code block, JSON payload, URL, o secret.
- Magdagdag ng saklaw ng unit test para sa mga bagong pamilya ng command sa mga detector/filter test.
- Magdagdag ng mga sample na `tests[]` sa bawat built-in na filter at sa mga nakabahaging custom na filter.

## Pagpapatunay

Pinapatunayan ang mga rule pack bago gamitin. Agad na nabibigo ang mga built-in na Caveman pack at built-in na RTK filter
habang isinasagawa ang pagpapatunay upang matukoy ang mga sirang release asset bago ipadala. Nilalaktawan ang mga custom na RTK filter
na may mga diagnostic kapag nabigo ang pag-parse o pagpapatunay ng tiwala.

Nakatuong pagpapatunay:

```bash
node --import tsx/esm --test tests/unit/compression/rule-loader.test.ts tests/unit/compression/language-packs.test.ts
node --import tsx/esm --test tests/unit/compression/rtk-verify.test.ts tests/unit/compression/rtk-dsl-pipeline.test.ts
```
