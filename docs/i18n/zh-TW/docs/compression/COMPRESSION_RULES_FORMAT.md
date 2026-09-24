# Compression Rules Format (中文 (繁體))

🌐 **Languages:** 🇺🇸 [English](../../../../compression/COMPRESSION_RULES_FORMAT.md) · 🇪🇹 [am](../../../am/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇸🇦 [ar](../../../ar/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇦🇿 [az](../../../az/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇧🇬 [bg](../../../bg/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇧🇩 [bn](../../../bn/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇧🇦 [bs](../../../bs/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇨🇿 [cs](../../../cs/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇩🇰 [da](../../../da/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇩🇪 [de](../../../de/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇬🇷 [el](../../../el/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇪🇸 [es](../../../es/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇪🇪 [et](../../../et/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇮🇷 [fa](../../../fa/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇫🇮 [fi](../../../fi/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇫🇷 [fr](../../../fr/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇮🇪 [ga](../../../ga/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇮🇳 [gu](../../../gu/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇳🇬 [ha](../../../ha/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇮🇱 [he](../../../he/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇮🇳 [hi](../../../hi/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇭🇷 [hr](../../../hr/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇭🇺 [hu](../../../hu/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇦🇲 [hy](../../../hy/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇮🇩 [id](../../../id/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇳🇬 [ig](../../../ig/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇮🇹 [it](../../../it/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇯🇵 [ja](../../../ja/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇬🇪 [ka](../../../ka/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇰🇭 [km](../../../km/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇮🇳 [kn](../../../kn/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇰🇷 [ko](../../../ko/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇱🇹 [lt](../../../lt/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇱🇻 [lv](../../../lv/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇮🇳 [ml](../../../ml/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇮🇳 [mr](../../../mr/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇲🇾 [ms](../../../ms/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇲🇹 [mt](../../../mt/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇲🇲 [my](../../../my/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇳🇵 [ne](../../../ne/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇳🇱 [nl](../../../nl/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇳🇴 [no](../../../no/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇮🇳 [or](../../../or/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇮🇳 [pa](../../../pa/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇵🇭 [phi](../../../phi/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇵🇱 [pl](../../../pl/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇵🇹 [pt](../../../pt/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇷🇴 [ro](../../../ro/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇷🇺 [ru](../../../ru/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇱🇰 [si](../../../si/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇸🇰 [sk](../../../sk/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇸🇮 [sl](../../../sl/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇷🇸 [sr](../../../sr/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇸🇪 [sv](../../../sv/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇰🇪 [sw](../../../sw/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇮🇳 [ta](../../../ta/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇮🇳 [te](../../../te/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇹🇭 [th](../../../th/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇹🇷 [tr](../../../tr/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇵🇰 [ur](../../../ur/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇺🇿 [uz](../../../uz/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇻🇳 [vi](../../../vi/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇳🇬 [yo](../../../yo/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/compression/COMPRESSION_RULES_FORMAT.md)

---

壓縮規則是在執行階段載入的 JSON 檔案。這些規則刻意設計為僅包含資料，因此可以在不變更引擎程式碼的情況下，審查新的語言套件和 RTK 命令篩選器。

> **標準結構描述（唯一真實來源）：** [`open-sse/services/compression/rules/_schema.json`](../../open-sse/services/compression/rules/_schema.json)（JSON Schema draft 2020-12）。
> 以下範例僅供說明——如有疑問，請使用 `_schema.json` 驗證您的套件。

## Caveman 規則套件

Caveman 規則套件位於：

```txt
open-sse/services/compression/rules/<language>/<pack>.json
```

每個套件都包含在隔離受保護區域後，套用至一般文字的替換規則。

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

### Caveman 欄位

| 欄位                     | 必填 | 說明                                                           |
| ------------------------ | ---- | -------------------------------------------------------------- |
| `language`               | 是   | 類似 BCP-47 的語言鍵，例如 `en`、`pt-BR`、`es`                 |
| `category`               | 是   | 套件類別檔名／類別，例如 `filler` 或 `dedup`                   |
| `rules`                  | 是   | 正規表示式替換規則陣列                                         |
| `rules[].name`           | 是   | 穩定的規則名稱                                                 |
| `rules[].pattern`        | 是   | JavaScript 正規表示式來源                                      |
| `rules[].flags`          | 否   | JavaScript 正規表示式旗標；預設為 `gi`                         |
| `rules[].replacement`    | 否   | 替換字串，或 `replacementMap` 未命中時使用的備援值             |
| `rules[].replacementMap` | 否   | 以正規化後的匹配文字為鍵，指定各匹配項目的替換內容             |
| `rules[].context`        | 否   | `all`、`user`、`assistant` 或 `system`；預設為 `all`           |
| `rules[].category`       | 否   | `filler`、`context`、`structural`、`dedup`、`terse` 或 `ultra` |
| `rules[].minIntensity`   | 否   | `lite`、`full` 或 `ultra`；預設為 `lite`                       |
| `rules[].description`    | 否   | 供人閱讀的規則摘要                                             |

當大小寫敏感比對很重要時，請使用 `flags`；例如，在小寫一般文字前移除冠詞，但不移除 `the OpenAI API`。當一個正規表示式包含多個需要不同輸出的替代項目時，請使用 `replacementMap`；這可讓 JSON 規則套件維持僅包含資料，同時保留內建且功能更豐富的 TypeScript 替換函式之行為。

## RTK 篩選器套件

RTK 篩選器位於：

```txt
open-sse/services/compression/engines/rtk/filters/<filter>.json
```

每個篩選器都描述如何辨識及壓縮一類命令輸出。

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

### RTK 欄位

| 欄位                       | 必填 | 說明                                                                        |
| -------------------------- | ---- | --------------------------------------------------------------------------- |
| `id`                       | 是   | 穩定的篩選器 ID                                                             |
| `label`                    | 是   | 適合顯示於儀表板的名稱                                                      |
| `category`                 | 是   | 篩選器類別：git、test、build、shell、docker、package、infra、cloud、generic |
| `priority`                 | 否   | 多個篩選器相符時，優先級較高者勝出                                          |
| `match.outputTypes`        | 否   | 用於選取此篩選器的偵測器輸出 ID                                             |
| `match.commands`           | 否   | 用於選取此篩選器的命令權杖                                                  |
| `match.patterns`           | 否   | 根據輸出文字選取此篩選器的正規表示式模式                                    |
| `rules.stripAnsi`          | 否   | 在正規表示式處理階段之前移除 ANSI 跳脫序列                                  |
| `rules.replace`            | 否   | 逐行依序套用的正規表示式替換                                                |
| `rules.matchOutput`        | 否   | 可選擇使用 `unless` 防護條件的短路輸出規則                                  |
| `rules.includePatterns`    | 否   | 優先保留的行                                                                |
| `rules.dropPatterns`       | 否   | 作為雜訊移除的行                                                            |
| `rules.collapsePatterns`   | 否   | 可合併的重複相符行                                                          |
| `rules.deduplicate`        | 否   | 合併重複的正規化行                                                          |
| `rules.truncateLineAt`     | 否   | Unicode 安全的單行字元限制                                                  |
| `rules.maxLines`           | 否   | 保留尾端內容前可保留的最大行數                                              |
| `rules.headLines`          | 否   | 截斷時保留的開頭行數                                                        |
| `rules.tailLines`          | 否   | 為保留近期上下文而保留的尾端行數                                            |
| `rules.onEmpty`            | 否   | 篩選移除所有內容時使用的後備訊息                                            |
| `rules.filterStderr`       | 否   | 在後續篩選階段之前正規化常見的 stderr 前綴                                  |
| `preserve.errorPatterns`   | 否   | 截斷後仍應保留的錯誤行                                                      |
| `preserve.summaryPatterns` | 否   | 截斷後仍應保留的摘要行                                                      |
| `tests[]`                  | 否   | RTK 驗證閘門使用的內嵌驗證範例                                              |

RTK 會依下列順序套用宣告式處理階段：`stripAnsi`、`filterStderr`、`replace`、
`matchOutput`、`dropPatterns`/`includePatterns`、`truncateLineAt`、`headLines`/`tailLines`、
`maxLines`，以及 `onEmpty`。

自訂篩選器可從下列位置載入：

1. 專案 `.rtk/filters.json` 檔案，但僅限已存在相符的 `.rtk/trust.json` 雜湊，或已啟用
   `trustProjectFilters`。
2. 全域 `DATA_DIR/rtk/filters.json`。
3. 內建篩選器。

專案／全域自訂檔案可包含單一篩選器物件或篩選器物件陣列。無效的
自訂篩選器會略過並產生診斷資訊；無效的內建篩選器則會導致驗證失敗。

專案信任檔案：

```json
{
  "filtersSha256": "0123456789abcdef..."
}
```

環境覆寫 `OMNIROUTE_RTK_TRUST_PROJECT_FILTERS=1` 可在沒有雜湊的情況下信任專案篩選器，
且應僅限於受控的本機開發環境中使用。

## 安全規則

- 保持規則的冪等性：重複執行相同的篩選器不應破壞輸出。
- 儘可能保留確切的錯誤文字、檔案路徑、行號與命令摘要。
- 避免使用會修改程式碼區塊、JSON 承載內容、URL 或機密資訊的規則。
- 在偵測器／篩選器測試中，為新的命令系列新增單元測試涵蓋範圍。
- 為每個內建篩選器及共用自訂篩選器新增 `tests[]` 範例。

## 驗證

規則套件會在使用前進行驗證。內建 Caveman 套件與內建 RTK 篩選器在驗證期間遇到錯誤時會立即失敗，以便在發布前發現有問題的發布資產。自訂 RTK 篩選器若剖析或信任驗證失敗，則會略過並提供診斷資訊。

針對性驗證：

```bash
node --import tsx/esm --test tests/unit/compression/rule-loader.test.ts tests/unit/compression/language-packs.test.ts
node --import tsx/esm --test tests/unit/compression/rtk-verify.test.ts tests/unit/compression/rtk-dsl-pipeline.test.ts
```
