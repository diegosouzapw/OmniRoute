# Compression Rules Format (日本語)

🌐 **Languages:** 🇺🇸 [English](../../../../compression/COMPRESSION_RULES_FORMAT.md) · 🇪🇹 [am](../../../am/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇸🇦 [ar](../../../ar/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇦🇿 [az](../../../az/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇧🇬 [bg](../../../bg/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇧🇩 [bn](../../../bn/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇧🇦 [bs](../../../bs/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇨🇿 [cs](../../../cs/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇩🇰 [da](../../../da/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇩🇪 [de](../../../de/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇬🇷 [el](../../../el/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇪🇸 [es](../../../es/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇪🇪 [et](../../../et/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇮🇷 [fa](../../../fa/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇫🇮 [fi](../../../fi/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇫🇷 [fr](../../../fr/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇮🇪 [ga](../../../ga/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇮🇳 [gu](../../../gu/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇳🇬 [ha](../../../ha/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇮🇱 [he](../../../he/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇮🇳 [hi](../../../hi/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇭🇷 [hr](../../../hr/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇭🇺 [hu](../../../hu/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇦🇲 [hy](../../../hy/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇮🇩 [id](../../../id/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇳🇬 [ig](../../../ig/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇮🇹 [it](../../../it/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇬🇪 [ka](../../../ka/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇰🇭 [km](../../../km/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇮🇳 [kn](../../../kn/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇰🇷 [ko](../../../ko/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇱🇹 [lt](../../../lt/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇱🇻 [lv](../../../lv/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇮🇳 [ml](../../../ml/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇮🇳 [mr](../../../mr/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇲🇾 [ms](../../../ms/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇲🇹 [mt](../../../mt/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇲🇲 [my](../../../my/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇳🇵 [ne](../../../ne/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇳🇱 [nl](../../../nl/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇳🇴 [no](../../../no/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇮🇳 [or](../../../or/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇮🇳 [pa](../../../pa/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇵🇭 [phi](../../../phi/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇵🇱 [pl](../../../pl/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇵🇹 [pt](../../../pt/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇷🇴 [ro](../../../ro/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇷🇺 [ru](../../../ru/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇱🇰 [si](../../../si/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇸🇰 [sk](../../../sk/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇸🇮 [sl](../../../sl/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇷🇸 [sr](../../../sr/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇸🇪 [sv](../../../sv/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇰🇪 [sw](../../../sw/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇮🇳 [ta](../../../ta/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇮🇳 [te](../../../te/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇹🇭 [th](../../../th/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇹🇷 [tr](../../../tr/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇵🇰 [ur](../../../ur/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇺🇿 [uz](../../../uz/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇻🇳 [vi](../../../vi/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇳🇬 [yo](../../../yo/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/compression/COMPRESSION_RULES_FORMAT.md)

---

圧縮ルールは、実行時に読み込まれる JSON ファイルです。新しい言語パックや RTK コマンドフィルターを、エンジンコードを変更せずにレビューできるよう、意図的にデータのみで構成されています。

> **正規スキーマ（信頼できる唯一の情報源）：** [`open-sse/services/compression/rules/_schema.json`](../../open-sse/services/compression/rules/_schema.json)（JSON Schema draft 2020-12）。
> 以下の例は説明用です。不明な点がある場合は、パックを `_schema.json` に対して検証してください。

## Caveman ルールパック

Caveman ルールパックは、以下に配置されます。

```txt
open-sse/services/compression/rules/<language>/<pack>.json
```

各パックには、保護対象領域を分離した後、通常の文章に適用される置換ルールが含まれます。

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

### Caveman のフィールド

| フィールド               | 必須   | 説明                                                                 |
| ------------------------ | ------ | -------------------------------------------------------------------- |
| `language`               | はい   | `en`、`pt-BR`、`es` などの BCP-47 形式に準じた言語キー               |
| `category`               | はい   | パックのカテゴリーファイル名／カテゴリー（例：`filler`、`dedup`）    |
| `rules`                  | はい   | 正規表現による置換ルールの配列                                       |
| `rules[].name`           | はい   | 安定したルール名                                                     |
| `rules[].pattern`        | はい   | JavaScript 正規表現のソース                                          |
| `rules[].flags`          | いいえ | JavaScript 正規表現のフラグ。デフォルトは `gi`                       |
| `rules[].replacement`    | いいえ | 置換文字列、または `replacementMap` に一致がない場合のフォールバック |
| `rules[].replacementMap` | いいえ | 正規化された一致テキストをキーとする、一致ごとの置換                 |
| `rules[].context`        | いいえ | `all`、`user`、`assistant`、`system`。デフォルトは `all`             |
| `rules[].category`       | いいえ | `filler`、`context`、`structural`、`dedup`、`terse`、`ultra`         |
| `rules[].minIntensity`   | いいえ | `lite`、`full`、`ultra`。デフォルトは `lite`                         |
| `rules[].description`    | いいえ | 人間が読めるルールの概要                                             |

大文字と小文字を区別したマッチングが重要な場合は、`flags` を使用してください。たとえば、`the OpenAI API` の `the` は削除せず、小文字の文章の前にある冠詞のみを削除する場合です。1 つの正規表現に複数の選択肢があり、それぞれ異なる出力が必要な場合は、`replacementMap` を使用してください。これにより、より高機能な組み込み TypeScript 置換関数の動作を維持しながら、JSON ルールパックをデータのみで構成できます。

## RTK フィルターパック

RTK フィルターは以下に配置されます。

```txt
open-sse/services/compression/engines/rtk/filters/<filter>.json
```

各フィルターは、コマンド出力の種類を認識して圧縮する方法を記述します。

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

### RTK フィールド

| フィールド                 | 必須   | 説明                                                                              |
| -------------------------- | ------ | --------------------------------------------------------------------------------- |
| `id`                       | はい   | 安定したフィルター ID                                                             |
| `label`                    | はい   | ダッシュボード上で読みやすい名前                                                  |
| `category`                 | はい   | フィルターの種類: git、test、build、shell、docker、package、infra、cloud、generic |
| `priority`                 | いいえ | 複数のフィルターが一致した場合、優先度が高いものが選択される                      |
| `match.outputTypes`        | いいえ | このフィルターを選択する検出器の出力 ID                                           |
| `match.commands`           | いいえ | このフィルターを選択するコマンドトークン                                          |
| `match.patterns`           | いいえ | 出力テキストからこのフィルターを選択する正規表現パターン                          |
| `rules.stripAnsi`          | いいえ | 正規表現処理の前に ANSI エスケープシーケンスを削除する                            |
| `rules.replace`            | いいえ | 行ごとに適用される、順序付きの正規表現置換                                        |
| `rules.matchOutput`        | いいえ | オプションの `unless` ガードを持つ、出力を即時確定するルール                      |
| `rules.includePatterns`    | いいえ | 優先的に保持する行                                                                |
| `rules.dropPatterns`       | いいえ | ノイズとして削除する行                                                            |
| `rules.collapsePatterns`   | いいえ | 折りたたみ可能な、繰り返し一致する行                                              |
| `rules.deduplicate`        | いいえ | 正規化された重複行をまとめる                                                      |
| `rules.truncateLineAt`     | いいえ | Unicode に対応した行単位の文字数制限                                              |
| `rules.maxLines`           | いいえ | 末尾を保持する前に維持できる最大行数                                              |
| `rules.headLines`          | いいえ | 切り詰め時に保持する先頭行                                                        |
| `rules.tailLines`          | いいえ | 直近のコンテキストとして保持する末尾行                                            |
| `rules.onEmpty`            | いいえ | フィルタリングですべての内容が削除された場合のフォールバックメッセージ            |
| `rules.filterStderr`       | いいえ | 後続のフィルタリング処理の前に一般的な stderr プレフィックスを正規化する          |
| `preserve.errorPatterns`   | いいえ | 切り詰め後も保持すべきエラー行                                                    |
| `preserve.summaryPatterns` | いいえ | 切り詰め後も保持すべき要約行                                                      |
| `tests[]`                  | いいえ | RTK 検証ゲートで使用されるインライン検証サンプル                                  |

RTK は宣言的な処理を次の順序で適用します: `stripAnsi`、`filterStderr`、`replace`、
`matchOutput`、`dropPatterns`/`includePatterns`、`truncateLineAt`、`headLines`/`tailLines`、
`maxLines`、`onEmpty`。

カスタムフィルターは以下から読み込めます。

1. プロジェクトの `.rtk/filters.json` ファイル。一致する `.rtk/trust.json` ハッシュが存在するか、
   `trustProjectFilters` が有効な場合にのみ読み込まれます。
2. グローバルの `DATA_DIR/rtk/filters.json`。
3. 組み込みフィルター。

プロジェクトまたはグローバルのカスタムファイルには、単一のフィルターオブジェクトまたはフィルターオブジェクトの配列を含めることができます。無効な
カスタムフィルターは診断情報とともにスキップされます。無効な組み込みフィルターは検証エラーになります。

プロジェクトの信頼ファイル:

```json
{
  "filtersSha256": "0123456789abcdef..."
}
```

環境変数による上書き `OMNIROUTE_RTK_TRUST_PROJECT_FILTERS=1` を使用すると、ハッシュなしでプロジェクトフィルターを信頼します。
この設定は、管理されたローカル開発環境での使用に限定してください。

## 安全ルール

- ルールは冪等に保ちます。同じフィルターを2回実行しても、出力が破損しないようにしてください。
- 可能な限り、エラーテキスト、ファイルパス、行番号、コマンドの要約を正確に保持してください。
- コードブロック、JSONペイロード、URL、またはシークレットを変更するルールは避けてください。
- 新しいコマンドファミリーについて、検出器／フィルターのテストにユニットテストのカバレッジを追加してください。
- すべての組み込みフィルターおよび共有カスタムフィルターに、`tests[]` サンプルを追加してください。

## 検証

ルールパックは使用前に検証されます。組み込みのCavemanパックと組み込みのRTKフィルターは、破損したリリースアセットが出荷前に検出されるよう、検証中に即座に失敗します。カスタムRTKフィルターは、解析または信頼性の検証に失敗した場合、診断情報とともにスキップされます。

対象を絞った検証：

```bash
node --import tsx/esm --test tests/unit/compression/rule-loader.test.ts tests/unit/compression/language-packs.test.ts
node --import tsx/esm --test tests/unit/compression/rtk-verify.test.ts tests/unit/compression/rtk-dsl-pipeline.test.ts
```
