# RTK Compression (日本語)

🌐 **Languages:** 🇺🇸 [English](../../../../compression/RTK_COMPRESSION.md) · 🇪🇹 [am](../../../am/docs/compression/RTK_COMPRESSION.md) · 🇸🇦 [ar](../../../ar/docs/compression/RTK_COMPRESSION.md) · 🇦🇿 [az](../../../az/docs/compression/RTK_COMPRESSION.md) · 🇧🇬 [bg](../../../bg/docs/compression/RTK_COMPRESSION.md) · 🇧🇩 [bn](../../../bn/docs/compression/RTK_COMPRESSION.md) · 🇧🇦 [bs](../../../bs/docs/compression/RTK_COMPRESSION.md) · 🇨🇿 [cs](../../../cs/docs/compression/RTK_COMPRESSION.md) · 🇩🇰 [da](../../../da/docs/compression/RTK_COMPRESSION.md) · 🇩🇪 [de](../../../de/docs/compression/RTK_COMPRESSION.md) · 🇬🇷 [el](../../../el/docs/compression/RTK_COMPRESSION.md) · 🇪🇸 [es](../../../es/docs/compression/RTK_COMPRESSION.md) · 🇪🇪 [et](../../../et/docs/compression/RTK_COMPRESSION.md) · 🇮🇷 [fa](../../../fa/docs/compression/RTK_COMPRESSION.md) · 🇫🇮 [fi](../../../fi/docs/compression/RTK_COMPRESSION.md) · 🇫🇷 [fr](../../../fr/docs/compression/RTK_COMPRESSION.md) · 🇮🇪 [ga](../../../ga/docs/compression/RTK_COMPRESSION.md) · 🇮🇳 [gu](../../../gu/docs/compression/RTK_COMPRESSION.md) · 🇳🇬 [ha](../../../ha/docs/compression/RTK_COMPRESSION.md) · 🇮🇱 [he](../../../he/docs/compression/RTK_COMPRESSION.md) · 🇮🇳 [hi](../../../hi/docs/compression/RTK_COMPRESSION.md) · 🇭🇷 [hr](../../../hr/docs/compression/RTK_COMPRESSION.md) · 🇭🇺 [hu](../../../hu/docs/compression/RTK_COMPRESSION.md) · 🇦🇲 [hy](../../../hy/docs/compression/RTK_COMPRESSION.md) · 🇮🇩 [id](../../../id/docs/compression/RTK_COMPRESSION.md) · 🇳🇬 [ig](../../../ig/docs/compression/RTK_COMPRESSION.md) · 🇮🇹 [it](../../../it/docs/compression/RTK_COMPRESSION.md) · 🇬🇪 [ka](../../../ka/docs/compression/RTK_COMPRESSION.md) · 🇰🇭 [km](../../../km/docs/compression/RTK_COMPRESSION.md) · 🇮🇳 [kn](../../../kn/docs/compression/RTK_COMPRESSION.md) · 🇰🇷 [ko](../../../ko/docs/compression/RTK_COMPRESSION.md) · 🇱🇹 [lt](../../../lt/docs/compression/RTK_COMPRESSION.md) · 🇱🇻 [lv](../../../lv/docs/compression/RTK_COMPRESSION.md) · 🇮🇳 [ml](../../../ml/docs/compression/RTK_COMPRESSION.md) · 🇮🇳 [mr](../../../mr/docs/compression/RTK_COMPRESSION.md) · 🇲🇾 [ms](../../../ms/docs/compression/RTK_COMPRESSION.md) · 🇲🇹 [mt](../../../mt/docs/compression/RTK_COMPRESSION.md) · 🇲🇲 [my](../../../my/docs/compression/RTK_COMPRESSION.md) · 🇳🇵 [ne](../../../ne/docs/compression/RTK_COMPRESSION.md) · 🇳🇱 [nl](../../../nl/docs/compression/RTK_COMPRESSION.md) · 🇳🇴 [no](../../../no/docs/compression/RTK_COMPRESSION.md) · 🇮🇳 [or](../../../or/docs/compression/RTK_COMPRESSION.md) · 🇮🇳 [pa](../../../pa/docs/compression/RTK_COMPRESSION.md) · 🇵🇭 [phi](../../../phi/docs/compression/RTK_COMPRESSION.md) · 🇵🇱 [pl](../../../pl/docs/compression/RTK_COMPRESSION.md) · 🇵🇹 [pt](../../../pt/docs/compression/RTK_COMPRESSION.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/compression/RTK_COMPRESSION.md) · 🇷🇴 [ro](../../../ro/docs/compression/RTK_COMPRESSION.md) · 🇷🇺 [ru](../../../ru/docs/compression/RTK_COMPRESSION.md) · 🇱🇰 [si](../../../si/docs/compression/RTK_COMPRESSION.md) · 🇸🇰 [sk](../../../sk/docs/compression/RTK_COMPRESSION.md) · 🇸🇮 [sl](../../../sl/docs/compression/RTK_COMPRESSION.md) · 🇷🇸 [sr](../../../sr/docs/compression/RTK_COMPRESSION.md) · 🇸🇪 [sv](../../../sv/docs/compression/RTK_COMPRESSION.md) · 🇰🇪 [sw](../../../sw/docs/compression/RTK_COMPRESSION.md) · 🇮🇳 [ta](../../../ta/docs/compression/RTK_COMPRESSION.md) · 🇮🇳 [te](../../../te/docs/compression/RTK_COMPRESSION.md) · 🇹🇭 [th](../../../th/docs/compression/RTK_COMPRESSION.md) · 🇹🇷 [tr](../../../tr/docs/compression/RTK_COMPRESSION.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/compression/RTK_COMPRESSION.md) · 🇵🇰 [ur](../../../ur/docs/compression/RTK_COMPRESSION.md) · 🇺🇿 [uz](../../../uz/docs/compression/RTK_COMPRESSION.md) · 🇻🇳 [vi](../../../vi/docs/compression/RTK_COMPRESSION.md) · 🇳🇬 [yo](../../../yo/docs/compression/RTK_COMPRESSION.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/compression/RTK_COMPRESSION.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/compression/RTK_COMPRESSION.md)

---

RTK 圧縮は、ターミナルおよびツール出力向けに設計された OmniRoute のコマンド認識型圧縮エンジンです。これは、コンテキスト増加の大半がテストログ、ビルド出力、パッケージマネージャーのノイズ、シェルトランスクリプト、Docker 出力、git 出力、スタックトレースに由来するコーディングエージェントのセッション向けに設計されています。

RTK は `defaultMode: "rtk"` を使用して直接実行することも、通常は次のようなスタック型パイプラインの最初のステップとして実行することもできます。

```txt
rtk -> caveman
```

この順序では、まずノイズの多いマシン出力を圧縮し、その後 Caveman が残りの文章を要約します。

アップストリームの RTK では、コマンド出力を `60-90%` 削減できると報告されています。その README のサンプルセッションでは、標準トークン数が `~118,000` から RTK トークン数 `~23,900` となり、`79.7%`（`~80%`）削減されています。OmniRoute は、Caveman の入力圧縮と組み合わせたスタック型の削減率計算に、このアップストリームの平均値を使用します。

```txt
RTK の平均:      80% 削減
Caveman の入力: 46% 削減
スタック型:     1 - (1 - 0.80) * (1 - 0.46) = 89.2% 削減
範囲:           1 - (1 - 0.60..0.90) * (1 - 0.46) = 78.4-94.6%
```

## 圧縮対象

組み込みカタログには現在、以下のカテゴリーにわたる 49 個のフィルターが含まれています。

| カテゴリー | 例                                                            |
| ---------- | ------------------------------------------------------------- |
| `git`      | `git status`、`git branch`、`git diff`、`git log`             |
| `test`     | Vitest、Jest、Pytest、Playwright、Go テスト、Cargo テスト     |
| `build`    | TypeScript、ESLint、Biome、Prettier、Vite、Webpack、Turbo、Nx |
| `package`  | `npm install`、`npm audit`、`pip`、`uv sync`、Poetry、Bundler |
| `shell`    | `ls`、`find`、`grep`、汎用シェルログ                          |
| `docker`   | `docker ps`、Docker ログ                                      |
| `infra`    | Terraform、OpenTofu、`systemctl status`                       |
| `generic`  | JSON 出力、スタックトレース、汎用出力フォールバック           |

`open-sse/services/compression/engines/rtk/commandDetector.ts` の検出器は、フィルターを選択する前に出力を分類します。コマンドクラスだけでは不十分な場合、フィルターはコマンドパターンまたは出力の正規表現によって照合することもできます。

## フィルターの解決

RTK は以下の順序でフィルターを読み込みます。

1. 信頼されている場合に限り、`.rtk/filters.toml` および `.rtk/filters.json` からプロジェクトフィルターを読み込みます。
2. `DATA_DIR/rtk/filters.toml` および `DATA_DIR/rtk/filters.json` からグローバルフィルターを読み込みます。
3. `open-sse/services/compression/engines/rtk/filters/` から組み込みフィルターを読み込みます。

同じスコープ内では、RTK TOML スキーマ v1 のフィルターが OmniRoute JSON フィルターよりも優先されます。インポートされたコマンド固有のフィルターが同じスコープ内のより広範なフィルターを上書きできるように、TOML の `match_command` 式はコマンドタイプの照合より先にチェックされます。ファイル形式に関係なく、プロジェクトスコープは引き続きグローバルスコープより優先されます。

正規表現フィルターは、ツール出力がエージェントにどのように表示されるかを変更できるため、プロジェクトフィルターは意図的に信頼確認の対象となっています。以下のいずれかが真である場合、プロジェクトフィルターファイルは受け入れられます。

- `rtkConfig.trustProjectFilters` が `true` である。
- `OMNIROUTE_RTK_TRUST_PROJECT_FILTERS=1` が設定されている。
- `.rtk/trust.json` に、プロジェクトフィルターファイルと一致する SHA-256 ハッシュが含まれている。

信頼ファイルの例:

```json
{
  "filtersSha256": "0123456789abcdef...",
  "filtersTomlSha256": "fedcba9876543210..."
}
```

ハッシュは個別です。`filtersSha256` は `.rtk/filters.json` を信頼し、`filtersTomlSha256` は `.rtk/filters.toml` を信頼します。いずれかのファイルを編集すると、そのファイルに対応する信頼エントリのみが無効になります。グローバルファイルは管理者によってインストールされ、既存のグローバルフィルターの信頼動作を使用します。

カスタムフィルターには、1 つのフィルターオブジェクトまたはフィルターオブジェクトの配列を指定できます。無効なカスタムフィルターはスキップされ、`/api/context/rtk/filters` の診断で報告されます。無効な組み込みフィルターは即座にエラーとなります。

## RTK TOML スキーマ v1 互換性

OmniRoute は、RTK TOML スキーマ v1 を使用した宣言的フィルターファイルを解析、検証、テスト、インストールできます。
サポートされるフィールドは、`description`、`match_command`、`strip_ansi`、`filter_stderr`、
`strip_lines_matching`、`keep_lines_matching`、`replace`、`match_output`、`truncate_lines_at`、
`head_lines`、`tail_lines`、`max_lines`、`on_empty`、および `[[tests.<filter>]]` インラインテストです。
不明なフィールド、無効または安全でない正規表現、strip ルールと keep ルールの同時指定、1 MiB を超えるファイル、
および不明なフィルターへの参照は拒否されます。インラインテストが失敗するファイルは、調査目的で検証できますが、
インストールまたは読み込みはできません。カスタムファイルの読み込み失敗は、引き続きフェイルオープンとして処理されます。
無効なファイルはスキップされ、残りのフィルターは引き続き機能します。

OmniRoute がツールの出力を受け取る時点では、クライアントによるキャプチャーがすでに完了しているため、`filter_stderr = true`
でプロセスのキャプチャー方法を変更することはできません。このフィールドは何もしない設定として受け入れられ、検証時に警告が返されます。
これは意図的に **RTK TOML スキーマ v1 互換性** と説明されており、RTK 実行ファイル、シェルフック、Rust コマンド実装、
またはそのトラストストアのレイアウトとの完全な互換性を意味するものではありません。

ダッシュボードの高度な RTK ビューでは、貼り付けまたはアップロードされた TOML を受け付けます。検証は読み取り専用です。
インストールでは、制限的な権限を設定して `DATA_DIR/rtk/filters.toml` にアトミックに書き込み、
再起動せずに稼働中のフィルターカタログを更新します。既存ファイルを置き換えるには、`overwrite`
を明示的に確認する必要があり、最初に `DATA_DIR/rtk/filters.toml.bak` が作成されます。

## フィルター DSL

フィルターでは、[圧縮ルール形式](./COMPRESSION_RULES_FORMAT.md)で説明されている JSON スキーマを使用します。
ランタイムは、以下のステージをこの順序で適用します。

```txt
stripAnsi -> filterStderr -> replace -> matchOutput -> 行の除外/包含
  -> truncateLineAt -> head/tail/maxLines -> onEmpty
```

重要なフィールド：

| フィールド                   | 目的                                                                     |
| ---------------------------- | ------------------------------------------------------------------------ |
| `rules.stripAnsi`            | マッチング前にターミナルの色／制御シーケンスを削除する                   |
| `rules.filterStderr`         | マッチング／フィルタリング前に一般的な stderr プレフィックスを正規化する |
| `rules.replace`              | 順序付きの正規表現置換を適用する                                         |
| `rules.matchOutput`          | 出力が既知の条件に一致した場合に簡潔な要約を返す                         |
| `rules.matchOutput[].unless` | エラー／失敗パターンが存在する場合はショートカットをスキップする         |
| `rules.dropPatterns`         | ノイズの多い行を削除する                                                 |
| `rules.includePatterns`      | 対処可能な行を優先する                                                   |
| `rules.collapsePatterns`     | 繰り返し出現する一致行を折りたたむ                                       |
| `rules.deduplicate`          | フィルターごとのオプトイン：連続する重複行を折りたたむ                   |
| `rules.truncateLineAt`       | Unicode セーフな行単位の切り詰め                                         |
| `rules.onEmpty`              | すべての行が除外された場合のフォールバックメッセージ                     |
| `tests[]`                    | 検証ゲートで使用されるインラインサンプル                                 |

組み込みフィルターには、インラインの `tests[]` サンプルを含めることが求められます。カスタムフィルターにも、
特にプロジェクト間で共有する場合は、これらを含めることを推奨します。

## 行の重複排除（2つのレイヤー）

RTK は、独立した2つのレイヤーで重複行をまとめます。

1. **フィルター単位の `deduplicate`（オプトイン、デフォルトは `false`）。** フィルターで `rules.deduplicate: true`
   を設定すると、切り詰め前に、_そのフィルターがマッチした出力内_の連続する重複行をまとめることができます。
   これは `lineFilter.ts` 内で実行されます。レガシーフィルターでは、そのフィルターで
   `collapsePatterns` が定義されている場合、自動的に有効化されます。スキーマは
   `open-sse/services/compression/engines/rtk/filterSchema.ts` 内の `deduplicate: z.boolean().default(false)` です。
2. **エンジン全体の `deduplicateThreshold`（デフォルトは `3`）。** すべてのフィルターの実行後、エンジンは
   結果全体にわたり、同一行が連続して `>= deduplicateThreshold` 回出現するすべての並びをまとめます
   （`deduplicateRepeatedLines`、`engines/rtk/index.ts` で適用）。正規化時、この値は2～100の範囲に制限されます。

フィルター単位の処理が最初に（フィルター内で）実行され、エンジン全体の処理が最後に（結合済みの
出力全体に対して）実行されるため、二重にカウントされることなく両者が連携します。

## 行のグループ化（`enableGrouping`）

`rtkConfig.enableGrouping` が `true`（デフォルトは `false`）の場合、RTK は重複排除後の結果に対して追加の `groupSimilarLines`
処理を実行し、バイト単位では同一でないものの、_ほぼ同等_である連続行をまとめます。
`rtkConfig.groupingThreshold`（デフォルトは `3`）は、グループ化を開始する最小連続行数です。
これは `deduplicateThreshold` と構造的に対をなす機能です。重複排除は完全に同一の繰り返しを処理し、
グループ化は「わずかな違いがあるだけで同じ形」の繰り返しを処理します。どちらのフラグも `key_value` テーブルに永続化される
`rtkConfig` JSON の一部であるため（上記の「設定」を参照）、設定は再起動後も保持されます。

## コードコメントの除去（`stripCodeComments` / `preserveDocstrings`）

`rtkConfig.applyToCodeBlocks` が有効な場合、RTK はフェンス付きコードブロックからコメントを除去することもできます。

- `stripCodeComments`（デフォルトは `false`）— オプトインです。`true` の場合、RTK は JavaScript
  および TypeScript のフェンス付きブロックからコメントを除去します。歴史的にこのフラグは読み取られていたものの適用されていなかったため、
  本番環境で暗黙的な変更が発生するのを避けるため、デフォルトは「保持」のままです。
- `preserveDocstrings`（デフォルトは `true`）— コメントを除去する際、JSDoc/`/** … */` ブロックコメントは
  保持されます（消費するバイト数以上の価値がある API ドキュメントを含むためです）。これらも除去するには `false` に設定します。

コメント除去は `open-sse/services/compression/engines/rtk/codeStripper.ts` に実装されています。
文字列、テンプレート、正規表現リテラルがコメントと誤認されないように、正規表現ではなく **TypeScript パーサー**を使用しています。
また、JSX が検出された場合は処理全体を中止します（これにより、JSX 式コンテナー内のコメントが破損することはありません）。
現在、コメント除去が適用されるのは **JavaScript と TypeScript のみ**です。ストリッパーの `CodeLanguage` セットに含まれるその他の
言語（Python、Rust、Go、Ruby、Java）では、空行と空白の圧縮は行われますが、コメントは除去されません。除去処理されたブロックの実行には、
`rulesApplied` で `rtk:code-strip` タグが付けられます。

> **注 — GCF / 表形式エンコーディングは別のエンジンです。** RTK には「GCF」
> （Graph Compact Format）表形式／列指向 JSON エンコーダーは含まれて**いません**。古い
> `omni-tabular` エンコーダーを置き換えたこのエンコーダーは、**headroom** エンジン
> （`open-sse/services/compression/engines/headroom/`、同梱されたコーデックは
> `headroom/gcf/` 以下）にあります。これは、ここで説明している RTK フィルターパイプラインとは無関係です。

## 設定

グローバル設定は `/api/settings/compression` から利用できます。RTK 固有の設定は
`/api/context/rtk/config` からも利用できます。

```json
{
  "defaultMode": "stacked",
  "autoTriggerMode": "stacked",
  "autoTriggerTokens": 32000,
  "stackedPipeline": [
    { "engine": "rtk", "intensity": "standard" },
    { "engine": "caveman", "intensity": "full" }
  ],
  "rtkConfig": {
    "enabled": true,
    "intensity": "standard",
    "applyToToolResults": true,
    "applyToCodeBlocks": false,
    "applyToAssistantMessages": false,
    "enabledFilters": [],
    "disabledFilters": [],
    "maxLinesPerResult": 120,
    "maxCharsPerResult": 12000,
    "deduplicateThreshold": 3,
    "customFiltersEnabled": true,
    "trustProjectFilters": false,
    "rawOutputRetention": "never",
    "rawOutputMaxBytes": 1048576,
    "enableGrouping": false,
    "groupingThreshold": 3,
    "stripCodeComments": false,
    "preserveDocstrings": true
  }
}
```

`enabledFilters` と `disabledFilters` には、`test-vitest` や `git-diff` などのフィルター ID を指定します。

`rtkConfig` の完全な構造は、
`open-sse/services/compression/types.ts` の `RtkConfig` / `DEFAULT_RTK_CONFIG` で定義されています。オブジェクト全体は、SQLite の `key_value` テーブルにおいて `namespace = "compression"`、`key = "rtkConfig"`
（`src/lib/db/compression.ts`）として単一の JSON 値に永続化され、読み取り時に `normalizeRtkConfig` によって正規化されます。そのため、以下のすべてのフィールド
（`enableGrouping`、`groupingThreshold`、`stripCodeComments`、`preserveDocstrings` を含む）は
同じストアを通じてラウンドトリップされ、再起動後も保持されます。

| キー                   | デフォルト | 目的                                                                                   |
| ---------------------- | ---------- | -------------------------------------------------------------------------------------- |
| `deduplicateThreshold` | `3`        | エンジン全体：折りたたむ連続した同一行の最小数（2～100 の範囲）                        |
| `enableGrouping`       | `false`    | オプトイン：ほぼ同等の行が連続する部分を折りたたむ                                     |
| `groupingThreshold`    | `3`        | グループ化を開始する、連続した類似行の最小数                                           |
| `stripCodeComments`    | `false`    | オプトイン：フェンス付きコードブロックからコメントを削除（`applyToCodeBlocks` が必要） |
| `preserveDocstrings`   | `true`     | コメント削除時に JSDoc/`/** … */` ブロックを保持                                       |

## API

| ルート                             | メソッド | 目的                                                      |
| ---------------------------------- | -------- | --------------------------------------------------------- |
| `/api/context/rtk/config`          | GET      | RTK 設定を読み取る                                        |
| `/api/context/rtk/config`          | PUT      | RTK 設定を更新する                                        |
| `/api/context/rtk/filters`         | GET      | フィルターカタログと読み込み診断を一覧表示する            |
| `/api/context/rtk/import`          | POST     | RTK TOML スキーマ v1 ファイルを検証またはインストールする |
| `/api/context/rtk/test`            | POST     | 1 つのテキストペイロードに対する RTK 圧縮をプレビューする |
| `/api/context/rtk/raw-output/[id]` | GET      | 保持された編集済みの生出力を読み取る                      |
| `/api/compression/preview`         | POST     | 任意の圧縮モードをプレビューする                          |

RTK テストペイロード：

```json
{
  "command": "npm test",
  "text": "FAIL tests/example.test.ts\nAssertionError: expected true\nTest Files 1 failed",
  "config": {
    "intensity": "standard"
  }
}
```

圧縮プレビューペイロード：

```json
{
  "mode": "stacked",
  "messages": [
    {
      "role": "tool",
      "content": "FAIL tests/example.test.ts\nAssertionError: expected true\nTest Files 1 failed"
    }
  ],
  "config": {
    "rtkConfig": {
      "rawOutputRetention": "failures"
    }
  }
}
```

管理ルートには、ダッシュボード管理認証または一致する API キーポリシーが必要です。

RTK TOML 検証ペイロード：

```json
{
  "action": "validate",
  "content": "schema_version = 1\n\n[filters.my-tool]\nmatch_command = \"^my-tool\\\\b\"\nmax_lines = 20\n"
}
```

検証済みファイルをグローバルにインストールするには、`"action": "install"` を使用します。既存のグローバルファイルを置き換える内容を確認し、承認した後にのみ
`"overwrite": true` を追加してください。

## 生の出力の復元

RTK は通常、圧縮されたテキストのみを返します。デバッグのために、`rawOutputRetention` を使用して秘匿化済みの生の出力を保持できます。

| 値         | 動作                                                |
| ---------- | --------------------------------------------------- |
| `never`    | 生の出力を保持しない                                |
| `failures` | 失敗した可能性が高い出力のみを保持する              |
| `always`   | 秘匿化後の、圧縮されたすべての RTK 生出力を保持する |

保持されたファイルは以下に書き込まれます。

```txt
DATA_DIR/rtk/raw-output/
```

永続化の前に、一般的なベアラートークン、API キー、Slack トークン、AWS アクセスキー、および代入形式の `token=...`、`secret=...`、`password=...` 値などのシークレットが秘匿化されます。分析データには、ポインター ID、サイズ、ハッシュのメタデータのみが保存されます。

## 検証ゲート

対象を絞った検証ゲートでは、外部コマンドをシェル経由で実行せず、組み込みのインラインフィルターテストを実行します。

```bash
node --import tsx/esm --test tests/unit/compression/rtk-verify.test.ts
```

より広範な RTK ゲートは以下のとおりです。

```bash
node --import tsx/esm --test \
  tests/unit/compression/rtk-*.test.ts \
  tests/unit/compression/pipeline-integration.test.ts \
  tests/unit/compression/context-compression-api.test.ts
```

リリース前に、広範な圧縮ゲートを実行してください。

```bash
node --import tsx/esm --test \
  tests/unit/compression/*.test.ts \
  tests/golden-set/*.test.ts \
  tests/integration/compression-pipeline.test.ts \
  tests/unit/api/compression/compression-api.test.ts
```

## RTK の拡張

1. フィルターの JSON ファイルを追加または更新します。
2. 重要な動作を実証する `tests[]` サンプルを少なくとも 1 つ含めます。
3. 新しいコマンドファミリーについて、`tests/unit/compression/fixtures/rtk/` 配下にフィクスチャを追加します。
4. 新しい出力クラスを導入する場合は、コマンド検出のカバレッジを追加します。
5. 検証ゲートと広範な RTK ゲートを実行します。
6. フィルターがプロジェクトローカルの場合は、レビュー後にのみ `.rtk/filters.json` をコミットし、`.rtk/trust.json` を更新します。

---

## 強度レベル（v3.8.16+）

RTK は、**圧縮の積極性**と**安全性**のバランスが異なる **3 つの強度レベル**をサポートしています。レベルは、エンジン設定の `config.intensity` で設定します。

### 3 つのレベル

| レベル                   | 切り詰めしきい値       | トークン削減率 | リスク   | 最適な用途                         |
| ------------------------ | ---------------------- | -------------- | -------- | ---------------------------------- |
| `minimal`                | セクションごとに 24 行 | ~20-40%        | 非常に低 | 重要なコンテキストを扱う本番環境   |
| `standard`（デフォルト） | セクションごとに 24 行 | ~50-70%        | 低       | 日常的なコーディングセッション     |
| `aggressive`             | セクションごとに 16 行 | ~70-90%        | 中       | 長時間のセッション、削減量の最大化 |

### 切り詰めが行われる場所

切り詰めしきい値は `lineFilter.ts` に影響します。

```ts
// open-sse/services/compression/engines/rtk/index.ts:329-330 より
config.intensity === "aggressive" ? 16 : 24,
config.intensity === "aggressive" ? 16 : 24,
```

各セクションの**先頭**と**末尾**はどちらも保持されます。切り詰めが作動すると、中間の内容が削除されます。

### 保持される内容と削除される内容

| 内容                     | minimal       | standard      | aggressive    |
| ------------------------ | ------------- | ------------- | ------------- |
| エラー／スタックトレース | ✅ 保持       | ✅ 保持       | ✅ 保持       |
| テスト失敗               | ✅ 保持       | ✅ 保持       | ✅ 保持       |
| ビルドエラー             | ✅ 保持       | ✅ 保持       | ✅ 保持       |
| テスト成功（詳細出力）   | ✅ 保持       | 🟡 折りたたみ | 🟡 折りたたみ |
| 通常の出力（情報ログ）   | 🟡 折りたたみ | 🟡 折りたたみ | ❌ 削除       |
| プログレスバー           | 🟡 折りたたみ | ❌ 削除       | ❌ 削除       |
| バナー／ASCII アート     | 🟡 折りたたみ | ❌ 削除       | ❌ 削除       |

### 適切な強度の選択

```
                  コンテキストの喪失は致命的か？
                  │
      ┌───────────┼───────────┐
      │           │           │
    はい        いいえ      わからない
      │           │           │
      ▼           │           │
   minimal        │           │
      │           │           │
      │           ▼           ▼
      │      スループットは  まず `standard` を試す
      │      どの程度重要か？（80% のケースで
      │           │          有効）
      │      ┌────┴────┐
      │      │         │
      │     低い      高い
      │      │         │
      │      ▼         ▼
      │   standard   aggressive
      │      │         │
      └──────┴─────────┘
```

### 強度の設定

**コンボ単位**（コンボ設定内）：

```json
{
  "combo": "my-coding-combo",
  "routing": {/* ... */},
  "compression": {
    "engine": "rtk",
    "intensity": "aggressive"
  }
}
```

**プログラムから**：

`rtkEngine`（`@omniroute/open-sse/services/compression/engines/rtk`）は
`CompressionEngine` であり、`updateConfig` メソッドはありません。代わりに、レジストリヘルパーを介してエンジンの設定を更新してください。

```ts
import { updateEngineConfig } from "@omniroute/open-sse/services/compression/engines/registry";

updateEngineConfig("rtk", { intensity: "aggressive" });
```

### 効果の検証

選択した強度でフィルターが安全であることを確認するには、**検証ゲート**（下記参照）を使用します。

```ts
import { runRtkFilterTests } from "omniroute/compression/engines/rtk/verify";

const result = runRtkFilterTests({ intensity: "aggressive" });
if (!result.passed) {
  console.error("aggressive 強度でフィルターが失敗しました");
}
```

---

## カスタムフィルターの開発 (v3.8.16+)

`engines/rtk/filters/` ディレクトリには、**49 個以上の組み込みフィルター JSON ファイル**が含まれています。デフォルトでは対応していないカスタムツールの出力を圧縮するために、独自のフィルターを追加できます。

### フィルタースキーマ (Zod)

```ts
{
  "id": "string",                      // 必須。フィルター識別子（kebab-case、例: "python-traceback"）
  "label": "string",                   // 必須。人が読めるフィルター名
  "description": "string",             // 任意（デフォルト: ""）。フィルターの動作についての簡潔な説明
  "category": "git|test|build|shell|docker|package|infra|cloud|generic",
  "priority": number,                  // 任意（0～100、デフォルト: 50）。実行順序（値が大きいほど先）
  "match": {
    "commands": ["string"],            // 一致させるコマンド名（例: "python"、"pytest"）
    "patterns": ["string"],            // 出力に一致させる正規表現パターン
    "outputTypes": ["string"]          // 検出された出力クラス（例: "test-failure"）
  },
  "rules": {
    "stripAnsi": boolean,              // 任意（デフォルト: false）。ANSI カラーコードを除去
    "replace": [                       // 検索・置換ルール（デフォルト: []）
      { "pattern": "regex", "replacement": "..." }
    ],
    "matchOutput": [                   // パターン一致時に短絡処理（デフォルト: []）
      {
        "pattern": "regex",
        "message": "short summary",
        "unless": "regex"              // このパターンに一致する場合はスキップ
      }
    ],
    "includePatterns": ["string"],     // 保持する行（正規表現パターン、デフォルト: []）
    "dropPatterns": ["string"],        // 削除する行（正規表現パターン、デフォルト: []）
    "collapsePatterns": ["string"],    // 1 回の出現にまとめる行（デフォルト: []）
    "deduplicate": boolean,            // 任意（デフォルト: false）。重複行を削除
    "truncateLineAt": number,          // 任意（デフォルト: 0）。行を最大文字数で切り詰め
    "maxLines": number,                // 任意（デフォルト: 0）。合計行数の上限
    "headLines": number,               // 任意（デフォルト: 20）。一致した出力の先頭 N 行を保持
    "tailLines": number,               // 任意（デフォルト: 20）。一致した出力の末尾 N 行を保持
    "onEmpty": "string",               // 任意（デフォルト: ""）。すべての行が除外された場合のフォールバックメッセージ
    "filterStderr": boolean            // 任意（デフォルト: false）。stderr 出力もフィルタリング
  },
  "preserve": {
    "errorPatterns": ["string"],       // 必ず保持する必要があるパターン（デフォルト: []）
    "summaryPatterns": ["string"]      // 最終サマリー行のパターン（デフォルト: []）
  },
  "tests": [                           // 検証用のインラインテスト（デフォルト: []）
    {
      "name": "string",               // 必須。テスト名
      "input": "sample output",        // 必須。サンプル入力テキスト
      "expected": "expected output",   // 必須。期待される圧縮後の出力
      "command": "optional command"    // 任意。コマンドコンテキスト
    }
  ]
}
```

### 例: Python トレースバックフィルター

```json
{
  "id": "python-traceback",
  "label": "Python Traceback Filter",
  "description": "Compresses Python tracebacks to essential file/line locations and error type",
  "category": "test",
  "priority": 60,
  "match": {
    "commands": ["python", "python3", "pytest", "uv", "poetry"],
    "patterns": ["Traceback \\(most recent call last\\)", "Error", "Exception"],
    "outputTypes": ["error-traceback"]
  },
  "rules": {
    "stripAnsi": true,
    "includePatterns": [
      "Traceback \\(most recent call last\\)",
      "^\\s*File \".+\", line \\d+",
      "^\\s*[A-Z][a-zA-Z]+Error:",
      "^\\s*[A-Z][a-zA-Z]+Exception"
    ],
    "dropPatterns": ["site-packages/", "^\\s+[a-z_]+\\([^)]*\\)$"],
    "headLines": 5,
    "tailLines": 3,
    "maxLines": 25,
    "filterStderr": true
  },
  "preserve": {
    "errorPatterns": ["Error:", "Exception:", "Traceback"],
    "summaryPatterns": ["^[A-Z][a-zA-Z]+(?:Error|Exception):"]
  },
  "tests": [
    {
      "name": "preserves-error-type-and-location",
      "input": "Traceback (most recent call last):\n  File \"app.py\", line 42, in main\n    do_thing()\n  File \"lib/utils.py\", line 17, in helper\n    return 1 / 0\nZeroDivisionError: division by zero",
      "expected": "Traceback (most recent call last):\n  File \"app.py\", line 42, in main\n  File \"lib/utils.py\", line 17, in helper\nZeroDivisionError: division by zero",
      "command": "python app.py"
    }
  ]
}
```

### カスタムフィルターの読み込み

認識される場所にファイルを配置します。

```
~/.omniroute/rtk/filters/my-filter.json     # ユーザーレベル
<project>/.rtk/filters/my-filter.json      # プロジェクトレベル
```

フィルターは、`open-sse/services/compression/engines/rtk/filterLoader.ts` の `loadRtkFilters()` によって起動時に自動的に読み込まれます。ローダーは、以下の場所からフィルターを検出します。

- 組み込みカタログ: `open-sse/services/compression/engines/rtk/filters/`
- ユーザーディレクトリ: `~/.omniroute/rtk/filters/`
- プロジェクトディレクトリ: `<project>/.rtk/filters/`

プログラムからフィルターを読み込むには、次のようにします。

```ts
import { loadRtkFilters } from "@omniroute/open-sse/services/compression/engines/rtk/filterLoader";

// オプション: customFiltersEnabled（ユーザー／プロジェクトフィルターを読み込む。デフォルトで有効）、
// trustProjectFilters、refresh。
const filters = loadRtkFilters({ customFiltersEnabled: true });
```

### 検証

フィルターは読み込み時に Zod スキーマに対して検証されます。構造が不正なフィルターは読み込みに失敗し、エラーがログに記録されます。

```
RTK_FILTER_LOADER: filter "my-filter" failed validation:
  - rules.replace.0.pattern: Invalid regex
  - match.commands: must not be empty
```

インストールされているすべてのフィルターを検証するには、`open-sse/services/compression/engines/rtk/verify.ts` からエクスポートされている `runRtkFilterTests()` を呼び出します。

### ベストプラクティス

1. **必ず `tests[]` を含める** — フィルターが正しく機能することを証明し、リグレッションを防止します
2. **短絡処理には `matchOutput` を使用する** — 1行で十分に内容を伝えられる場合は、ブロック全体を置き換えます
3. **`strip` より `keep` を優先する** — 「常に削除する」ルールよりも、明示的な「常に保持する」ルールのほうが安全です
4. **3段階すべての強度レベルでテストする** — `minimal` は何も変更せず、`aggressive` でもエラーは保持されるようにします
5. **`unless` フィールドを使用する** — 「Xが存在する場合はトリガーしない」という条件で短絡処理を保護します

---

## 生の出力の復元と検証ゲート

RTK が出力を積極的に圧縮する場合でも、デバッグ、監査、または再実行のために**元のテキストを復元**できます。

### 生の出力の復元の仕組み

```
元の出力（10Kトークン）
        │
        ▼
RTKによる圧縮（rawOutput.enabled=true）
        │
        ├─▶ 圧縮済み出力（2Kトークン）  ──▶ LLMへ
        │
        └─▶ 元の出力（10Kトークン）     ──▶ DBに保存
                                                  （request_idで関連付け）
```

### 生の出力の保存を有効にする

**リクエスト単位**（combo設定内）:

```json
{
  "compression": {
    "engine": "rtk",
    "intensity": "aggressive",
    "rawOutput": {
      "enabled": true,
      "maxBytes": 1048576 // 上限1MB
    }
  }
}
```

**デフォルト**: `rawOutput.enabled: false`（ストレージを節約）。

### ストレージコスト

| リクエスト単位          | 上限1MB     | 上限10MB     |
| ----------------------- | ----------- | ------------ |
| 圧縮済み出力の平均      | ~5KB        | ~5KB         |
| 保存される生の出力      | ~50-500KB   | ~500KB-5MB   |
| 1日1000リクエストの場合 | 50-500MB/日 | 500MB-5GB/日 |

> **推奨事項**: 生の出力は常時有効にせず、**デバッグセッション**または**サンプリング監査**の場合にのみ有効にしてください。

### 元の出力を復元する

```ts
import { readRtkRawOutput } from "omniroute/compression/engines/rtk/rawOutput";

const raw = readRtkRawOutput(pointerId); // 圧縮統計から取得したpointerId
if (raw) {
  console.log("Original output:", raw);
}
```

`pointerId` は、圧縮後に `CompressionStats.rtkRawOutputPointers[]` で返されます。
関数シグネチャについては、`open-sse/services/compression/engines/rtk/rawOutput.ts:102` を参照してください。

### 検証ゲート

**RTKフィルター検証**（`open-sse/services/compression/engines/rtk/verify.ts`）は、すべてのフィルターを各フィルターの `tests[]` に照らして検証し、3つすべての強度レベルで動作が正しいことを確認します。

検証を実行するには、**`runRtkFilterTests()` を呼び出します**:

```ts
import { runRtkFilterTests } from "open-sse/services/compression/engines/rtk/verify";

const result = runRtkFilterTests();
console.log(`Passed: ${result.outcomes.filter((o) => o.passed).length}`);
console.log(`Failed: ${result.outcomes.filter((o) => !o.passed).length}`);
if (!result.passed) {
  console.error("Filters failed verification");
  result.outcomes
    .filter((o) => !o.passed)
    .forEach((o) => {
      console.error(
        `  - ${o.filterId} / ${o.testName}: expected "${o.expected}", got "${o.actual}"`
      );
    });
}
```

**検証内容**:

1. すべてのフィルターが読み込まれ、スキーマ検証に合格する
2. `tests[]` のすべてのエントリが期待される出力を生成する
3. `minimal` 強度では何も変更しない（元の内容を保持し、構造フィルターのみを適用する）
4. `aggressive` 強度でも、エラー、テスト失敗、およびスタックトレースが保持される
5. 圧縮済み出力が元の入力より大きくならない

- ソース: `open-sse/services/compression/engines/rtk/`（63ファイル、~70KB）

- **フィルターの変更をマージする前** — 必ずテストが合格することを確認する
- **RTKエンジンをアップグレードした後** — スキーマが変更されている可能性がある
- **監視の一環として定期的に** — テストフィクスチャのドリフトを防止する
- **新しいツール／コマンドファミリーを追加するとき** — 新しいフィルターが機能することを証明する

---

## 関連項目

- [COMPRESSION_GUIDE.md](./COMPRESSION_GUIDE.md) — 圧縮パイプラインの全体概要
- [COMPRESSION_ENGINES.md](./COMPRESSION_ENGINES.md) — エンジンレジストリと組み込みエンジン
- [EXTENDING_COMPRESSION.md](./EXTENDING_COMPRESSION.md) — カスタムエンジン、言語パック、スタック型パイプライン
- ソース: `open-sse/services/compression/engines/rtk/`（63ファイル、約70KB）
