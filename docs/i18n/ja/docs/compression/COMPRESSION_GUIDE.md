# 🗜️ Prompt Compression Guide — OmniRoute (日本語)

🌐 **Languages:** 🇺🇸 [English](../../../../compression/COMPRESSION_GUIDE.md) · 🇪🇹 [am](../../../am/docs/compression/COMPRESSION_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/compression/COMPRESSION_GUIDE.md) · 🇦🇿 [az](../../../az/docs/compression/COMPRESSION_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/compression/COMPRESSION_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/compression/COMPRESSION_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/compression/COMPRESSION_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/compression/COMPRESSION_GUIDE.md) · 🇩🇰 [da](../../../da/docs/compression/COMPRESSION_GUIDE.md) · 🇩🇪 [de](../../../de/docs/compression/COMPRESSION_GUIDE.md) · 🇬🇷 [el](../../../el/docs/compression/COMPRESSION_GUIDE.md) · 🇪🇸 [es](../../../es/docs/compression/COMPRESSION_GUIDE.md) · 🇪🇪 [et](../../../et/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/compression/COMPRESSION_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/compression/COMPRESSION_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇱 [he](../../../he/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/compression/COMPRESSION_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/compression/COMPRESSION_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/compression/COMPRESSION_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇩 [id](../../../id/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇹 [it](../../../it/docs/compression/COMPRESSION_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/compression/COMPRESSION_GUIDE.md) · 🇰🇭 [km](../../../km/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/compression/COMPRESSION_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/compression/COMPRESSION_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/compression/COMPRESSION_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/compression/COMPRESSION_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/compression/COMPRESSION_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/compression/COMPRESSION_GUIDE.md) · 🇲🇲 [my](../../../my/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇴 [no](../../../no/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [or](../../../or/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/compression/COMPRESSION_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/compression/COMPRESSION_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/compression/COMPRESSION_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/compression/COMPRESSION_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/compression/COMPRESSION_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/compression/COMPRESSION_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/compression/COMPRESSION_GUIDE.md) · 🇱🇰 [si](../../../si/docs/compression/COMPRESSION_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/compression/COMPRESSION_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/compression/COMPRESSION_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/compression/COMPRESSION_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/compression/COMPRESSION_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [te](../../../te/docs/compression/COMPRESSION_GUIDE.md) · 🇹🇭 [th](../../../th/docs/compression/COMPRESSION_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/compression/COMPRESSION_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/compression/COMPRESSION_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/compression/COMPRESSION_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/compression/COMPRESSION_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/compression/COMPRESSION_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/compression/COMPRESSION_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/compression/COMPRESSION_GUIDE.md)

---

> 対象となるコンテキストを自動的に圧縮し、15～95%削減します。概要については、[README の「Compression」セクション](../README.md#%EF%B8%8F-prompt-compression--save-15-95-eligible-tokens-automatically)を参照してください。

## 概要

OmniRoute は、リクエストが上流プロバイダーに到達する**前に**プロアクティブに実行される、モジュール式のプロンプト圧縮パイプラインを実装しています。つまり、ワークフローを変更することなく、透過的にトークンを節約できます。

```
クライアントリクエスト
  → 圧縮戦略セレクター
    → コンボによるオーバーライド？ → コンボ設定を使用
    → 自動トリガーのしきい値？ → 自動モードを使用
    → デフォルトモード？ → グローバル設定を使用
    → オフ？ → 圧縮をスキップ
  → 選択された圧縮モード
    → オフ：圧縮なし
    → Lite：安全な空白・書式のクリーンアップ（約15%）
    → Standard：片言化による冗長表現の削除（約30%）
    → Aggressive：履歴の経過時間に応じた処理＋要約（約50%）
    → Ultra：ヒューリスティックな枝刈り＋コードブロックの間引き（約75%）
    → RTK：コマンドを認識したターミナル／ツール出力のフィルタリング（上流で60～90%の範囲）
    → Stacked：順序付けされたマルチエンジンパイプライン。通常は RTK の後に Caveman（対象範囲で78～95%）
  → 圧縮済みリクエスト → プロバイダー
```

---

## 圧縮モード

### Off

圧縮は適用されません。すべてのメッセージが変更されずに通過します。

### Lite モード（約15%削減、レイテンシ <1ms）

最も安全なモードです。意味は一切変更せず、書式のみをクリーンアップします。

| 手法                     | 説明                                       |
| ------------------------ | ------------------------------------------ |
| `collapseWhitespace`     | 連続する空行を統合し、行末の空白を削除する |
| `dedupSystemPrompt`      | 重複するシステムメッセージを削除する       |
| `compressToolResults`    | 冗長なツール／関数の出力を圧縮する         |
| `removeRedundantContent` | 繰り返される指示を削除する                 |
| `replaceImageUrls`       | base64 画像データ URI を短縮する           |

**最適な用途：** 常時有効での使用、安全性が重要なワークフロー。

### Standard モード（約30%削減）

[Caveman](https://github.com/JuliusBrussee/caveman) に着想を得たモードです。意味を維持しながら、つなぎ言葉や冗長な表現を削除します。

- つなぎ言葉（「please」「I think」「basically」「actually」）を削除
- 冗長なフレーズを簡潔化（「in order to」→「to」、「as a result of」→「because」）
- 遠回しで丁寧な表現（「Would you mind...」「If you could possibly...」）を削除
- コーディング用プロンプト向けに調整された30以上の正規表現ルール

**最適な用途：** 日常的なコーディングワークフロー、コストを重視するチーム。

### Aggressive モード（約50%削減）

長時間のセッションに対応するスマートな履歴管理：

- **メッセージの経過時間に応じた処理** — 古いメッセージほど段階的に強く圧縮
- **ツール結果の圧縮** — 長いツール出力を切り詰めるか省略（先頭／末尾の行、
  一致行のフィルタリング、JSON キーの圧縮）
- **構造的整合性ガード** — `tool_use` と `tool_result` のペアの整合性を維持
- **コンテキストウィンドウの考慮** — モデルごとのトークン制限を尊重

**最適な用途：** 長時間にわたるデバッグセッション、大規模なコードベース。

### Ultra モード（約75%削減）

トークンが極めて重要なシナリオ向けの最大圧縮：

- **ヒューリスティックな枝刈り** — スコアに基づいて文章のトークンを枝刈り
- **構造の維持** — フェンス付きコードブロック、インラインコード、URL、識別子を
  一時的に退避して一字一句そのまま復元し、決して枝刈りしない
- **オプションの SLM 層** — 設定されている場合、小型ローカルモデルで枝刈り結果を改善可能
- Aggressive モードから独立：メッセージの経過時間に応じた処理、ツール結果の圧縮、
  フォールバック要約機能は実行しない（SLM 層で障害が発生した場合のみ、
  フォールバック処理を Aggressive にルーティング可能）

**最適な用途：** コンテキスト制限に繰り返し達する場合。

### RTK モード（上流で60～90%の範囲）

RTK モードは、コーディングエージェントのセッションに現れる冗長なツール出力に最適化されています。

- `git status`、`git diff`、`git log`、テストランナー、
  TypeScript/Vite/Webpack のビルド、ESLint/Biome/Prettier、npm の監査／インストール、Docker ログ、インフラ
  出力、一般的なシェル出力などのコマンド／出力クラスを検出
- `open-sse/services/compression/engines/rtk/filters/` の JSON フィルターパックを適用
- プロジェクトまたはグローバルの `filters.toml` ファイルから RTK TOML schema v1 フィルターをインポートし、インラインテストによる
  検証と、プロジェクトファイルに対する信頼性ゲートを適用
- インライン検証サンプル付きの55個の組み込みフィルターを搭載
- ANSI 制御シーケンス、プログレスバー、重複行、対応不要なノイズを削除
- 失敗、エラー、警告、変更されたファイル、要約、長い出力の末尾を保持
- 信頼性ゲート付きプロジェクトフィルター、グローバルフィルター、オプションの秘匿化済み生出力の復元をサポート

**最適な用途：** シェル、ビルド、テスト、git、grep、ファイル出力のトランスクリプトを含むエージェントセッション。

### Stacked モード（対象範囲で78～95%）

Stacked モードは、複数の圧縮エンジンを決定論的な順序で実行します。デフォルトのパイプラインは次のとおりです。

```txt
RTK -> Caveman
```

この順序では、最初にターミナル／ツール出力をコンパクトにし、その後、残りの自然言語プロンプトに
Caveman の意味的圧縮を適用します。Stacked パイプラインはグローバルに設定することも、
ルーティングコンボに割り当てた圧縮コンボを通じて設定することもできます。

**最適な用途：** 大量のツールログに加えて、人間による指示やアシスタントの要約を含む混在コンテキスト。

---

## アップストリームの削減率計算

OmniRoute は、圧縮による削減効果を、アップストリームプロジェクトのベンチマークと
OmniRoute 独自のエンジン構成という2つの情報源に基づいて文書化しています。

| 情報源  | ここで使用するアップストリーム README の数値                                                                       |
| ------- | ------------------------------------------------------------------------------------------------------------------ |
| Caveman | 出力トークンを `~75%` 削減、ベンチマークでの平均出力削減率 `65%`、範囲 `22-87%`、入力圧縮ツールでは `~46%`         |
| RTK     | コマンド出力を `60-90%` 削減。サンプルセッションでは `~118,000 -> ~23,900` トークン、つまり `79.7%` 削減（`~80%`） |

ツール／コンテキストのペイロードが重複する場合、デフォルトの OmniRoute コンボではエンジンを次の順序で重ねます。

```txt
RTK -> Caveman
```

合計削減率は加算ではなく、乗算で求めます。

```txt
combined = 1 - (1 - RTK savings) * (1 - Caveman input savings)
average  = 1 - (1 - 0.80) * (1 - 0.46) = 89.2%
range    = 1 - (1 - 0.60..0.90) * (1 - 0.46) = 78.4-94.6%
```

この `78-95%` という数値は、RTK と Caveman の両方が同じ入力／コンテキストのペイロードを削減できる場合に適用されます。
Caveman のレスポンス出力モードは別機能です。有効にした場合は、Caveman 独自の出力削減率（平均 `65%`、
代表値 `~75%`、範囲 `22-87%`）を使用してください。請求額全体の削減率は、プロンプトと出力の構成比によって異なります。

### 「対象になる」の実際の意味

15-95% という代表的な範囲は実際のものですが、適用されるのは、繰り返される
エラー行、同じ警告を大量に出力するビルドログ、過大な `grep`／ファイル読み取りダンプなど、**冗長または過度に詳細な**
コンテンツだけです。すべてのリクエストでこれほど削減されるという意味では
**ありません**。

実測で検証済みです（`tests/unit/compression/stacked-compression-tool-result-savings.test.ts`）。同一の
エラー行を300行含む Anthropic 形式の `tool_result` ブロックに対して `stacked`（RTK + Caveman）を
実行したところ、**トークンを 95.93% 削減／文字数を 96.26% 削減**でき、提示された範囲内に
十分収まりました。しかし、通常の非冗長なツール出力（整理された `grep` の一致結果一覧、
短いファイル読み取り、通常の会話テキスト）に対して同じパイプラインを実行すると、正しく
**ほぼゼロの削減率**になります。これは、除去できる反復がなく、`validateCompression()`（`validation.ts`）が、
コードブロック、URL、見出し、バージョン、または ALL-CAPS の定数識別子を削除または変更する
書き換えを許可しないためです。

これはバグではなく、想定された安全な動作です。主に整理されたファイルを読み取ったり grep したりするコーディングセッションでは、
圧縮を完全に有効にしていても全体の削減率は控えめになります。一方、失敗を繰り返す
ループや冗長な出力を行うリンターに遭遇するセッションでは、そのトラフィックに対して 78-95% の範囲全体の
削減効果が得られます。単一セッションの総削減率が低いことだけを根拠に、圧縮の設定ミスだと判断しないでください。
まず、元のツール出力が実際に冗長だったかどうかを確認してください。

---

## トークン削減の可視化

```
圧縮なし:               LLM に送信されるトークンは 47K
Lite:                    送信されるトークンは 40K          （15% 削減 — 安全、常時有効）
Standard:                送信されるトークンは 33K          （30% 削減 — caveman-speak ルール）
Aggressive:              送信されるトークンは 24K          （50% 削減 — エージング + 要約）
Ultra:                   送信されるトークンは 12K          （75% 削減 — ヒューリスティックな枝刈り）
RTK:                     送信されるトークンは 19K-5K       （コマンド／ツール出力を 60-90% 削減）
Stacked:                 送信されるトークンは 10K-2.5K     （対象となる RTK+Caveman の範囲で 78-95% 削減）
```

---

## 設定

### ダッシュボード

`ダッシュボード → コンテキストとキャッシュ` に移動します。

- **Caveman** — モード選択、言語パック、プレビュー、グローバルデフォルト
- **RTK** — コマンドフィルターのプレビュー、RTK の安全設定、フィルターカタログ
- **圧縮コンボ** — ルーティングコンボに割り当てる名前付きエンジンパイプライン
- **自動トリガーしきい値** — トークン数がしきい値を超えた場合に圧縮を自動的に有効化

### コンボ単位のオーバーライド

`ダッシュボード → コンテキストとキャッシュ → 圧縮コンボ` で、圧縮コンボをルーティング
コンボに割り当てます。

```txt
コンボ: "free-tier-fallback"
  圧縮コンボ: "coding-agent-stack"
  パイプライン: RTK -> Caveman
  ターゲット:
    1. if/kimi-k2.7-code
    2. if/qwen3.8-max-preview
```

これにより、有料サブスクリプションではライトモードを維持しながら、無料／コーディングプロバイダーで
積み重ねた圧縮を使用できます。

この「コンボ単位のオーバーライド」割り当ては、**ルーティングコンボの圧縮
モード**オーバーライド（デフォルト／オフ／ライト／標準／アグレッシブ／ウルトラ／Codex Responses — このフィールドの
スキーマは `rtk`、`stacked`、`omniglyph` も受け付けます）とは異なる制御です。このオーバーライドでは、名前付きの
圧縮コンボパイプラインは選択されません。単に `resolveCompressionPlan` が参照する
`compressionMode` フィールドを設定するだけです。コンボカード（`ダッシュボード → コンボ`）で設定できるほか、
#6760 以降では、`ダッシュボード → コンテキストとキャッシュ → 圧縮コンボ` の
「ルーティングに割り当て」リストで、上記のパイプライン割り当てチェックボックスのすぐ横から、ルーティングコンボごとに
設定することもできます。どちらの画面でも、同じ `PUT /api/combos/{id}` エンドポイントを通じて保存されます。

### リクエスト単位のオーバーライド

単一のリクエストについて圧縮プランをオーバーライドするには、`x-omniroute-compression` リクエストヘッダーを
送信します。このヘッダーの優先順位が最も高く、ルーティングコンボのオーバーライド、アクティブなプロファイル、
自動トリガー、パネルのデフォルトよりも優先されます。不明な値は無視され（リクエストが拒否されることはありません）、
グローバルマスタースイッチによる制御は引き続き適用されます。圧縮がグローバルにオフの場合、このヘッダーで
オンにすることはできません。値は次のとおりです。

| 値            | 効果                                                                                                                     |
| ------------- | ------------------------------------------------------------------------------------------------------------------------ |
| `off`         | このリクエストでは圧縮しません。                                                                                         |
| `default`     | パネルから導出されたデフォルトプロファイル（アクティブなプロファイルは無視）。非可逆エンジンはオフのままです。           |
| `safe`        | ヘッダーを省略した場合と同じです。重複排除と空白の折りたたみのみを行います。                                             |
| `allow-lossy` | 要約、関連性フィルター、スタイル書き換えを含む、このリクエストのオペレータープランを維持します。                         |
| `engine:<id>` | 有効な場合に単一のエンジンを使用します（例: `engine:rtk`）。これは、そのエンジンに対するリクエスト単位のオプトインです。 |
| `<combo>`     | 名前付きコンボ。最初に名前（大文字と小文字を区別しない）、次に ID で照合されます。                                       |

`allow-lossy`、`engine:<id>`、または名前付きコンボが指定されていない場合、非可逆エンジンは
適用されません。圧縮がオンの場合、リクエストには引き続きセッションの重複排除と空白の折りたたみが
適用されます。

適用されたプランは、`X-OmniRoute-Compression: <mode>; source=<source>` レスポンス
ヘッダーで返されます。`<source>` は `request-header`、`routing-override`、`active-profile`、
`auto-trigger`、`default`、`off` のいずれかです。

### API

```bash
# 圧縮設定を取得
curl http://localhost:20128/api/settings/compression

# 圧縮設定を更新
curl -X PUT http://localhost:20128/api/settings/compression \
  -H "Content-Type: application/json" \
  -d '{"defaultMode":"stacked","autoTriggerMode":"stacked","autoTriggerTokens":32000}'

# 特定の RTK/stacked ペイロードをプレビュー
curl -X POST http://localhost:20128/api/compression/preview \
  -H "Content-Type: application/json" \
  -d '{"mode":"rtk","messages":[{"role":"tool","content":"npm test output here"}]}'

# RTK フィルターパックを一覧表示
curl http://localhost:20128/api/context/rtk/filters

# オプションのコマンドメタデータを使用して RTK を直接テスト
curl -X POST http://localhost:20128/api/context/rtk/test \
  -H "Content-Type: application/json" \
  -d '{"command":"npm test","text":"FAIL tests/example.test.ts\nError: boom"}'
```

---

## 保護されるもの

圧縮エンジンは、以下を**常に保持します：**

- ✅ コードブロック（フェンス形式およびインライン）
- ✅ URLおよびファイルパス
- ✅ JSON構造および構造化データ
- ✅ 識別子および保護対象の技術トークン
- ✅ 数式
- ✅ ツール／関数呼び出しの定義
- ✅ システムプロンプト（liteモード）

RTKのraw-outputリカバリーは、何らかのデータが永続化される前に、一般的なAPIキー、bearerトークン、Slackトークン、AWSアクセスキー、パスワード、トークン、およびシークレットを編集して隠します。

---

## 圧縮統計

圧縮された各リクエストには、サーバーログ内に統計情報が含まれます：

```json
{
  "originalTokens": 47200,
  "compressedTokens": 40120,
  "savingsPercent": 15.0,
  "techniquesUsed": ["collapseWhitespace", "dedupSystemPrompt"],
  "mode": "lite",
  "engine": "caveman",
  "compressionComboId": "coding-agent-stack",
  "durationMs": 0.8,
  "rtkRawOutputPointers": []
}
```

---

## フェーズ別ロードマップ

| フェーズ   | モード                                                                                                                                               | ステータス      |
| ---------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- | --------------- |
| フェーズ1  | Off、Lite                                                                                                                                            | ✅ リリース済み |
| フェーズ2  | Standard、Aggressive、Ultra                                                                                                                          | ✅ リリース済み |
| フェーズ3  | RTK、Stacked、Compression Combos                                                                                                                     | ✅ リリース済み |
| フェーズ4  | Output Styles、SLM-tier Ultra、evalハーネス                                                                                                          | ✅ リリース済み |
| フェーズ4C | 適応型コンテキスト予算（「ダイヤル」）— 計算エンジン + API（`PUT /api/settings/compression`の`contextBudget`）+ ダッシュボードのモード／ポリシー制御 | ✅ リリース済み |

---

## 謝辞

Standardモードの圧縮ルールは、**[JuliusBrussee](https://github.com/JuliusBrussee)**による**[Caveman](https://github.com/JuliusBrussee/caveman)**（⭐ 51K+）— 話題となった「少ないトークンで用が足りるのに、なぜ多くのトークンを使うのか」というプロジェクト — に着想を得ています。Cavemanは、出力トークンを`~75%`削減、ベンチマーク平均で出力を`65%`削減、出力の削減幅は`22-87%`、入力圧縮ツールでは`~46%`削減と報告しています。

RTKモードは、**[RTK AI](https://github.com/rtk-ai)**による**[RTK - Rust Token Killer](https://github.com/rtk-ai/rtk)** — ターミナル、ビルド、テスト、git、およびツール出力のフィルタリングに対応する高性能なコマンド出力圧縮プロジェクト — に着想を得ています。RTKは`60-90%`の削減を報告しており、READMEのサンプルセッションでは`~80%`の削減が示されています。

---

## 高度な圧縮システム

上記の7つのモード（ソースでは`codex-responses`モードと`omniglyph`モードも受け付けますが、このガイドでは扱いません）に加えて、以下のセクションでは、これらのモード内またはモードと併用して機能する各種機能について説明します。Tool Result CompressionとProgressive Agingは、aggressiveエンジン（Aggressiveモード、およびstackedパイプラインの`aggressive`ステップ）のステップ1と2です。Stacked PipelineはStackedモードの実行方法です。Cache-Aware Compressionは、圧縮が有効な間、キャッシュ対応プロバイダーに対して`aggressive`と`ultra`を`standard`へダウングレードします。また、Caveman Output ModeとOutput Stylesは、デフォルトでは無効になっているオプトイン形式のシステムプロンプト指示であり、リクエストを圧縮するのではなく、モデルの出力を整形します。

### キャッシュ対応圧縮

一部のプロバイダー（プロンプトキャッシュを備えたAnthropicなど）は**プロンプトキャッシュ**をサポートしており、プロンプトの一部をキャッシュすることでコストとレイテンシーを削減できます。キャッシュが有効な場合、aggressive圧縮はキャッシュ済みのトークンを変更してキャッシュを無効化するため、実際にはパフォーマンスを**低下**させる可能性があります。

`cachingAware.ts`モジュールは、**キャッシュコンテキストを検出**し、それに応じて**圧縮戦略を調整**することで、この問題を解決します。

#### 仕組み

1. **キャッシュコンテキストを検出** — リクエスト本文で`cache_control`マーカーをスキャン
2. **キャッシュ対応プロバイダーを特定** — 対象プロバイダーがキャッシュをサポートしているかを確認
3. **戦略を調整** — キャッシュ対応プロバイダーでは`aggressive`/`ultra`を`standard`へダウングレード
4. **システムプロンプトをスキップ** — 通常、システムプロンプトはキャッシュされるため圧縮しない

戦略ヘルパーは`deterministicOnly`フラグも返しますが、プランビルダーが使用するのは戦略のみです。現時点では、後続処理のどこからもこのフラグは参照されません。

#### コード例

```ts
import {
  detectCachingContext,
  getCacheAwareStrategy,
} from "@omniroute/open-sse/services/compression/cachingAware";

const body = {
  model: "anthropic/claude-sonnet-4.5",
  messages: [{ role: "user", content: "Hello" }],
  cache_control: { type: "ephemeral" }, // ← キャッシュマーカー
};

const ctx = detectCachingContext(body, { provider: "anthropic" });
// → { hasCacheControl: true, provider: "anthropic", targetFormat: null, isCachingProvider: true }

const strategy = getCacheAwareStrategy("aggressive", ctx);
// → { strategy: "standard", skipSystemPrompt: true, deterministicOnly: true }
```

#### 使用される場面

キャッシュ対応圧縮は**常に有効**であり、設定は不要です。圧縮が有効で、対象プロバイダーがプロンプトキャッシュ（Anthropic、OpenAIなど）をサポートしている場合に作動します。明示的な`cache_control`マーカーは必須ではありません。キャッシュ対応プロバイダーであることだけでダウングレードが発生し、マーカーだけでは発生しません（マーカー検出はキャッシュのテレメトリに使用され、戦略決定には使用されません）。

### 段階的エージング

長い会話では多数のメッセージターンが蓄積されますが、古いターンほど関連性が低くなります。`progressiveAging.ts`モジュールは、**ターン距離に応じてメッセージを劣化**させます（距離は会話の末尾から測定されます）。リリース時のデフォルト値（`verbatim: 2, light: 2, moderate: 3`）では：

- **直近2ターン（距離 ≤ 2）**: そのまま保持
- **距離3**: 原始人圧縮（フィラーを除去）
- **距離4以上**: アシスタントメッセージは要約し、ユーザーメッセージは先頭行のみに縮約して120文字を上限とする。その他のロールは変更しない。システムプロンプト、すでにエージング済みのメッセージ、最新のユーザーメッセージは、距離に関係なく常にそのまま保持される。
  完全に削除されるものはなく、同梱されているデフォルト設定では `light`
  バンドには到達しない（`light` は `verbatim` と同じ）。

#### コード例

```ts
import { applyAging } from "@omniroute/open-sse/services/compression/progressiveAging";

const messages = [
  { role: "system", content: "You are a helpful assistant" },
  { role: "user", content: "What is 2+2?" },
  { role: "assistant", content: "4" },
  // ... さらに50ターン ...
];

const { messages: aged, saved } = applyAging(messages, {
  verbatim: 3, // 直近3ターン: そのまま
  light: 8, // 距離 <= 8: 軽量圧縮
  moderate: 20, // 距離 <= 20: 原始人圧縮
  fullSummary: 5, // 型では必須だが、バンド分けコードでは参照されない
  // 距離 > 20: 要約（アシスタント）/ 先頭行を保持（ユーザー）
});

// saved = 削減されたトークン数
```

#### 使用するタイミング

プログレッシブエージングは `aggressive` モードでは**常に有効**であり、`compressAggressive()` のステップ2である。Ultraモードでは実行されない。特に次の用途で効果的である。

- 長時間にわたるコーディングセッション
- 複数日にまたがる会話
- 多数のツール呼び出しを伴うエージェント型ワークフロー

### 原始人出力モード

原始人出力モードは、簡潔な出力をモデル自身に求める**システムプロンプト命令**を追加する。`lite` レベルでは完全な文を維持した簡潔な回答を、`full` では「賢い原始人のように簡潔に応答」することを、`ultra` では電文調の出力を求める。命令はあくまで要求するだけであり、保証はできない。リクエストは
`applyOutputStyles()` (`open-sse/services/compression/outputStyles/apply.ts`) を通じて命令を受け取る。
`open-sse/handlers/chatCore.ts` はまず後方互換シム
（`open-sse/services/compression/outputStyles/backCompat.ts` 内の
`resolveOutputStyleSelection()`）を使用して選択を解決する。このシムは、`outputStyles`
が空の場合、有効な `cavemanOutputMode` を
`cavemanOutputMode.intensity` の `terse-prose` 出力スタイルにマッピングする
（後述の「後方互換」を参照）。空でない `outputStyles`
の選択はそのまま使用され、その場合は `cavemanOutputMode.enabled` と `intensity`
は効果を持たないが、`autoClarity` トグルは引き続き適用される。`outputMode.ts` には
命令テキスト（`CAVEMAN_INSTRUCTION_BY_LANGUAGE`）、コンテンツのバイパス、および
注入で使用される配置ヘルパーが含まれる。同ファイル独自の `applyCavemanOutputMode()`
インジェクターには本番環境での呼び出し元がない。

#### 仕組み

このモードは入力を圧縮しない。システムプロンプトに命令ブロックを追加し
（後述の「注入の仕組み」を参照）、リクエストに対して選択された入力圧縮モードは、
そのブロックを含むようになった本文に対して、その後も実行される。すべてのレベルの
末尾にある共通の境界条項より前に、英語の `full` レベルでは次のように記載される。

> 「賢い原始人のように簡潔に応答せよ。冠詞（a/an/the）、フィラー（just/really/basically/actually/simply）、社交辞令、曖昧表現を省け。断片文でもよい。短い同義語を使え（extensive ではなく big、implement ではなく fix）。技術的な内容、コード、エラー、URL、識別子はすべて正確に保持せよ。」

これは特に次の用途で効果的である。

- コード生成（より簡潔な出力 = より少ないトークン）
- 簡単なQ&A（詳しい説明は不要）
- バッチ処理（スループットを最大化）

#### 使用するタイミング

原始人出力モードは**オプトイン**である。圧縮を有効にした状態
（`enabled: true`、Compression Settingsページのマスタートグルがオン）で、
`cavemanOutputMode.enabled` を使用して有効にする。`intensity`
では `lite`、`full`、`ultra` のいずれかを選択する。

```json
{
  "enabled": true,
  "cavemanOutputMode": {
    "enabled": true,
    "intensity": "full"
  }
}
```

圧縮コンボの **Output Mode** トグル（`outputMode`、レベルは `outputModeIntensity`）
は、そのコンボが適用されるリクエストに対して同じスイッチを設定する。また、
`omniroute_set_compression_engine` MCPツールは、真偽値の `outputMode`
引数を通じてその設定を書き込む。空でない `outputStyles` の選択は、このスイッチより
優先される。ダッシュボードで **Terse prose** 出力スタイルを有効にすると、同じ
ブロックが注入される（後述の「出力スタイル」を参照）。

### 出力スタイル（カタログ）

前述の原始人出力モードは、**従来の単一スタイル経路**である。フェーズ4ではこれを、
組み合わせ可能な出力スタイルのカタログへと一般化した。
`open-sse/services/compression/outputStyles/catalog.ts` 内の
`OUTPUT_STYLE_CATALOG` である。各スタイルは、より低コストな出力をモデル自身に求める
システムプロンプト命令である。複数のスタイルを同時に有効化でき、カタログ順に注入される。

| スタイル                           | `id`          | 機能                                                                                                                                                                                                                                                | 対応言語                                      |
| ---------------------------------- | ------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------- |
| 簡潔な文章                         | `terse-prose` | 冗長表現、冠詞、曖昧表現を省き、技術的内容の正確さを維持します。従来の caveman 出力モードと同じテキストです（参照のみで、再記述はしません）。                                                                                                       | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi |
| コードを減らす                     | `less-code`   | YAGNI の段階原則：動作する最小限の変更にとどめ、要求されていない抽象化は行いません。                                                                                                                                                                | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi |
| ポニーテール（怠惰なシニア開発者） | `ponytail`    | 「最良のコードとは、書かれなかったコードである」：書き直しより再利用、症状より根本原因、動作する最短の差分を優先します。                                                                                                                            | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi |
| ADHD があります（行動優先）        | `i-have-adhd` | 行動を先に示し（文章より前にコマンド、パス、スニペットを提示）、番号付きの有限な手順、具体的な次のステップは 1 つだけとし、前置き、要約、結びの言葉は省きます。[ayghri/i-have-adhd](https://github.com/ayghri/i-have-adhd)（MIT）を基にしています。 | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi |
| 簡潔な CJK（文言）                 | `terse-cjk`   | `full`/`ultra` の回答を漢文（文言）で出力します。`lite` では、機能語、社交辞令、装飾表現を含まない簡潔な回答のみを求めます。                                                                                                                        | zh（ロケール制限あり、以下を参照）            |

各スタイルには `lite`、`full`、`ultra` の 3 つの強度レベルがあり、すべてのレベルの
末尾には共有境界条項（`outputMode.ts` の `SHARED_BOUNDARIES`）が付きます。この条項により、
コードブロック、ファイルパス、コマンド、エラー、URL が正確に保持されます。`terse-prose` と
`terse-cjk` の各レベルのテキストでは、この一覧に識別子も追加されます。

`terse-cjk` は 2 か所でロケールが `zh` に制限されています。Compression Settings ページでは、
ダッシュボードの UI 言語が中国語（`zh-CN` または `zh-TW`）の場合にのみ、その行が表示され、
`applyOutputStyles()` はリクエストで解決された言語（以下の「言語の選択」を参照）が `zh` の
場合にのみこれを注入します。行を非表示にしても、保存済みの `terse-cjk` の選択は解除されません。
設定 API は任意のスタイル id を受け入れ、ページで他のスタイルを保存してもその選択は維持されます。
リクエスト時には、`applyOutputStyles()` の言語チェックだけがロケールゲートとして機能します。

#### 注入の仕組み

`applyOutputStyles()`（`open-sse/services/compression/outputStyles/apply.ts`）は、
選択内容をカタログと照合して解決します（不明な id やロケールが一致しないスタイルは
削除され、エラーにはなりません。どのスタイルにも解決されない選択では本文は変更されず、
`no_styles` としてスキップされます）。その後、選択された指示をカタログ順に連結し、
境界条項を **1 回だけ** 追加します（`less-code` または `ponytail` が選択されている場合は、
安全性条項である `SAFETY_BOUNDARIES` またはその翻訳も追加します）。さらに、ブロックの先頭に
単一の冪等性マーカー（`[OmniRoute Output Styles]`）を付けるため、再適用しても何も起こりません。
解決された言語（以下の「言語の選択」を参照）に翻訳がある場合は、英語ではなくローカライズされた
指示が注入されます。

空でない `messages` 配列を持つ本文では、冪等性チェックがコンテンツのバイパス判定より先に
実行されます。最上位の `system` フィールド（文字列またはコンテンツブロック配列）か、
文字列コンテンツを持つ system メッセージに `[OmniRoute Output Styles]` マーカーがすでに
含まれている場合、本文は `already_applied` として変更されず、キーワードチェックも実行されません。
それ以外の場合、コンテンツバイパス（`open-sse/services/compression/outputMode.ts` の
`shouldBypassCavemanOutputMode()`）は、ロールに関係なく最後の 3 件のメッセージのテキストを
確認し、そのテキストがセキュリティ、不可逆な操作、確認要求に関するキーワードに一致する場合、
または順序依存のシーケンスに一致する場合、そのターン全体でスタイルをスキップします。
順序依存のシーケンスとは、`first`、`then`、`after that`、`before`、`rollback`、`backup` の
いずれかの後、240 文字以内に `delete`、`drop`、`migrate`、`deploy`、`release` のいずれかが
続くものです。このバイパスは **Auto-Clarity Bypass** トグル
（`cavemanOutputMode.autoClarity`、デフォルトでオン）がオンの間に実行されます。
トグルをオフにすると、キーワードチェックはスキップされます。

バイパスでそのターンの処理が許可されると、`placeSystemInstruction()`（同じファイル）は
新しい `messages[0]` を作成せず、次のうち最初に見つかった場所にブロックを配置します。

1. 先頭にあり、文字列コンテンツを持つ system メッセージ：そのテキストの後にブロックを追加します。
2. 最上位の `system` フィールド：文字列の場合はそのテキストの後にブロックを追加し、
   コンテンツブロック配列の場合は新しいテキストブロックとして追加します。
3. それ以降で最初に現れる、文字列コンテンツを持つ system メッセージ：そのテキストの後に
   ブロックを追加します。
4. 上記のいずれにも該当しない場合：`messages` の末尾に新しい system メッセージとして
   ブロックを追加します。

`messages` 配列がない本文（または空の配列を持つ本文）では、コンテンツバイパスは実行されず、
最上位の `system` フィールドも参照されません。文字列の `instructions` フィールドがある場合は、
そのテキストの後にブロックが追加されます。ただし、そのフィールドに
`[OmniRoute Output Styles]` マーカーがすでに含まれている場合、本文は `already_applied` として
変更されません。本文に文字列の `instructions` フィールドがなく、`input`
（文字列または配列）がある場合、ブロックが `instructions` となり、そのフィールドに入っていた
文字列以外の値を置き換えます。文字列の `instructions` フィールドも、文字列または配列の
`input` もない本文は変更されず、`no_messages` としてスキップされます。

#### 有効化方法

ダッシュボードの **Compression Context → Compression Settings**
(`/dashboard/context/settings`) にある Output styles セクションでは、スタイルごとに1行が表示され、オン/オフの
トグルとレベルセレクターがあります。スタイルは、圧縮自体がオン（ページの
マスタートグルである `enabled`）の間に挿入されます。**Auto-Clarity Bypass** トグルは **Caveman**
ページ（`/dashboard/context/caveman`）の **Output Mode** カードにあります。プログラム上では、
圧縮設定によって選択内容が次のように永続化されます。

```json
{
  "outputStyles": [
    { "id": "i-have-adhd", "level": "full" },
    { "id": "less-code", "level": "lite" }
  ]
}
```

後方互換性：`outputStyles` が空の間は、従来の `cavemanOutputMode.enabled`
設定が、`cavemanOutputMode.intensity` の強度で `terse-prose` にマッピングされます。このブロックは
`[OmniRoute Output Styles]` マーカーで始まります。従来の `applyCavemanOutputMode()`
インジェクターでは `[OmniRoute Caveman Output Mode]` が挿入されていました。マーカーの下にあるテキストは、
en、pt-BR、es、de、fr、it、ru、id、vi では従来の挿入内容と一致します。ja と zh では、
境界条件の句の前に余分なスペースが1つ入ります。`terse-prose` には pt-BR、es、de、
fr、it、ru、zh、ja、id、vi の翻訳があるため、解決された言語が `hu` のリクエストでは、
従来のインジェクターがハンガリー語のテキストを使用していた箇所に英語のテキストが使用されます。

出力スタイルの言語選択（`outputStyles/apply.ts` の `resolveOutputStyleLanguage()`）：
`languageConfig.enabled` がオンの場合、`autoDetect` はリクエストの `messages` 配列内で、
テキストを含む最新のユーザーメッセージ（文字列コンテンツ、またはコンテンツパーツの `text`）をサンプリングし、
Caveman エンジンの検出器（`detectCompressionLanguage()`）を実行します。検出器は、
漢字を含み仮名を含まないテキストに対して `zh` を返します。それ以外の場合は、
`it`、`pt-BR`、`es`、`de`、`fr`、`ru`、`ja`、`hu`、`id` のうち、
ヒントの一致数が最も多いものを返し、一致がない場合は `en` を返します。
分類できないテキストには `defaultLanguage` ではなく常に英語が使用されます。また、スタイルに
`vi` のテキストが含まれていても、`vi` が検出されることはありません。Responses API のボディは
ターンを `input` に保持しますが、これはサンプリングされないため、`defaultLanguage`、次いで英語が使用されます。
`messages` 内にテキストを含むユーザーメッセージがない場合、または `autoDetect` がオフの場合は、
`defaultLanguage`、次いで英語が使用されます。`languageConfig.enabled` がオフの場合、
言語は英語になります。ただし、圧縮コンボがリクエストに適用される場合（リクエストのルーティング
コンボに割り当てられたコンボ、または組み込みのスタック型パイプラインで chatCore がフォールバックする
デフォルトの圧縮コンボ）は例外です。コンボを適用すると、そのリクエストに対して
`languageConfig.enabled` がオンになり、コンボの言語パックから `defaultLanguage` が設定されます
（保存済みの値がコンボのパックのいずれかであればその値、それ以外はコンボの最初のパックであり、
デフォルトは `en`）。一方、保存済みの `autoDetect`（デフォルトではオン）は引き続き適用されます。
Caveman 入力エンジンは、これとは異なる方法でルールパックの言語を選択します。つまり、テキストパーツごとに選択し、
自動検出がオフの場合は `enabledPacks` によって制限されます。

スタイル × 言語のマトリックスは
`tests/unit/compression/output-styles-i18n-matrix.test.ts` によって固定されています。カタログ内の各スタイルには、
テストの `BASELINE_LANGUAGES` にエントリが必要です。ロケールによる制限がないスタイルには
pt-BR 翻訳が必要です（ロケール制限付きの `terse-cjk` はこのルールの対象外です）。ただし、
`KNOWN_ENGLISH_ONLY` に含まれている場合は例外です。このリストには翻訳がまったくないスタイルのみを含めることができ、
リスト内のスタイルに翻訳が1つでもあるとテストに失敗します。また、スタイルが
`BASELINE_LANGUAGES` エントリに記載されている言語を失った場合もテストに失敗します。
スタイルを追加する方法については、
[EXTENDING_COMPRESSION.md](./EXTENDING_COMPRESSION.md#adding-an-output-style) を参照してください。

### ツール結果の圧縮

`open-sse/services/compression/toolResultCompressor.ts` の `compressToolResult()` は、
**5つの戦略**でツール結果のテキストを圧縮します。これらは次の順序で試行され、
チェックがコンテンツに一致した最初の有効な戦略によって結果が決定されます。

1. **`fileContent`**: 3行以上のコンテンツで、先頭のインデントを無視したときに少なくとも1行が
   `import `、`export `、`function `、`class `、`const `、`let `、`var `、`return `
   （キーワードとそれに続くスペース）で始まるか、`if`、`for`、`while` の後に `(` または ` (`
   が続く場合、先頭20行と末尾5行を保持し、省略された中間部分にマーカーを付けます。
2. **`grepSearch`**: `<path>:<digits>:` 形式の行が少なくとも1行あり、最初のコロンより前の
   テキストに空白が含まれないコンテンツでは、該当する行だけを最大30行まで保持し、その後に
   残りの一致件数と一致したファイルの一覧を付けます。それ以外の行はすべて削除されます。
   このストラテジーは該当する行が1行あるだけで適用されるため、`12:30:45` のような
   タイムスタンプで始まるログ行も一致として扱われます。
3. **`shellOutput`**: ANSI CSIシーケンス（`ESC[` の後に数字またはセミコロンが続き、さらに
   文字が続くもの。カラーコードなど）、またはテキスト内の任意の場所に空白が続く `$` を
   含む出力では、それらのシーケンスが削除されます（`ESC[?25l` やOSCウィンドウタイトル
   シーケンスなど、その他のエスケープは保持されます）。また、連続して重複する行をまとめた
   うえで、末尾50行を保持します。このチェックは `json` と `errorMessage` より前に実行されるため、
   このような `$` を含むJSON出力やエラー出力は、`shellOutput` が有効な間はそれらの
   ストラテジーに到達しません。
4. **`json`**: オプションの空白を除いて `{` または `[` で始まり、正常にパースできる
   2,000文字を超えるJSONペイロードは要約されます。7項目を超える配列では先頭5項目と
   末尾2項目、および合計項目数を保持します。オブジェクトでは先頭20個のキーを保持し、
   ネストされた各オブジェクトまたは配列の値を `{…N keys}` プレースホルダー
   （配列の場合、Nはその長さ）に置き換え、先頭20個より後に削除されたキー数を示す
   `_remaining_<N>_keys` マーカーを付けます。スカラー値はそのまま丸ごとコピーされるため、
   ネストされた値を含まず、キーが20個以下のオブジェクトはインデントが調整されるだけです。
   ミニファイされたものは文字数が増えるため、変更されずに保持されます。
5. **`errorMessage`**: 任意の場所に、大文字と小文字を区別せず、`error:`、`error `
   （`no error found` のように単語の後にスペースが続くもの）、`[error]`、`exception:`、
   `exception `、`[exception]`、`traceback` のいずれかを含む出力では、最初の1行、
   その次の10行、および末尾3行を保持し、それらの間の行を `… [N frames elided] …`
   マーカーで置き換えます。このマーカーは最初の行より後に13行を超える行がある場合にのみ
   表示されるため、14行以下のエラー出力は短縮されません（12行または13行の場合、末尾3行は
   すでに保持されている行と重複します）。

ストラテジーが一致すると、何も削減されない場合でも、後続のストラテジーは試行されません。
一致したストラテジーで推定トークン数（長さ ÷ 4、切り上げ）が削減されない場合、たとえば
コードらしいファイルが25行以下の場合や、2,000文字を超えるJSON配列の項目数が7以下の場合、
アグレッシブエンジンは元のツール結果を保持します。両方の呼び出し元
（`compressAggressive()` と `compressAnthropicToolResultBlock()`）は、`saved` が0以下の場合に
元の内容を保持しますが、`compressToolResult()` 自体は引き続きそのストラテジーの出力を返します。
ツール結果の処理が最終段階とは限りません。エンジンのフォールバック要約機能により、
8,192文字（`maxTokensPerMessage` の2,048に4を掛けた値）を超える `tool` または `function`
メッセージがさらに短縮される場合があります。

#### 使用するタイミング

ツール結果の圧縮は、アグレッシブエンジン（`open-sse/services/compression/aggressive.ts` の
`compressAggressive()`）のステップ1であるため、Aggressiveモード、およびスタック型パイプラインの
`aggressive` ステップで実行されます。OpenAI形式の `tool` および `function` メッセージと、
Anthropicの `tool_result` ブロック内のテキストを圧縮します。各ストラテジーには
`aggressive.toolStrategies` 配下に個別のスイッチがあり、デフォルトではすべて有効です。
ダッシュボードでは、圧縮が有効でデフォルトモードがAggressiveの場合、Cavemanページの
**Advanced** ビューにこれらのスイッチがあります。

### スタック型パイプライン

スタック型モードでは、**複数のエンジンを順番に**実行します。通常は最初にRTK
（ツール出力を60～90%削減）、続いて残りのテキストにCaveman（入力を約46%削減）を適用します。
組み合わせると、**対象範囲で78～95%**の削減になります（上記のアップストリーム削減量の計算を
参照）：`1 - (1 - 0.60..0.90) × (1 - 0.46)` の平均は約89%です。

#### 仕組み

```
入力（1000トークン）
  → RTK（コマンド対応フィルター）→ 200トークン
    → Caveman（冗長表現の除去）→ 108トークン
  → 出力（108トークン、約89%削減）
```

#### 使用するタイミング

スタック型モードは、次の場合に使用します。

- ツールを多用するワークフロー（エージェント型コーディング、調査）
- コスト重視のバッチ処理
- トークン削減量を最大化する必要がある場合

スタック型パイプラインは、グローバルな `stackedPipeline` 圧縮設定、またはルーティングコンボに
割り当てられた名前付き圧縮コンボ（上記のコンボごとのオーバーライドを参照）を通じて設定します。
auto-comboの `modePack` を通じて設定するものではありません（このフィールドはauto-comboの
モデル選択の重みを再調整するだけであり、`stacked` は有効なパック名ではありません）。

---

## コンボごとの圧縮オーバーライド

ユースケースごとに動作を微調整するため、グローバルな圧縮モードを**コンボ単位**でオーバーライドできます。

```json
{
  "id": "coding-combo",
  "strategy": "priority",
  "config": {
    "weights": { "taskFit": 0.5 },
    "modePack": "quality-first"
  },
  "compressionOverride": "aggressive"
}
```

これは次のような場合に便利です。

- **コーディング用コンボ**: 長時間のセッションには `aggressive` モードを使用
- **簡単なQ&A用コンボ**: 高速な応答には `lite` モードを使用
- **ツールを多用するコンボ**: 削減効果を最大化するには `stacked` モードを使用
- **本番環境用コンボ**: キャッシュプロバイダーではオーバーライドを無効のままにしてください — 常時有効なキャッシュ対応の調整により、`aggressive`/`ultra` は自動的に `standard` にダウングレードされます（選択可能な `cache-aware` モードはありません）

---

## 関連項目

- [環境設定](../reference/ENVIRONMENT.md) — 圧縮に関する環境変数
- [アーキテクチャガイド](../architecture/ARCHITECTURE.md) — 圧縮パイプラインの内部構造
- [ユーザーガイド](../guides/USER_GUIDE.md) — 圧縮の始め方
- [RTK圧縮](./RTK_COMPRESSION.md) — RTKフィルター、信頼モデル、検証ゲート、生出力の復元
- [圧縮エンジン](./COMPRESSION_ENGINES.md) — Caveman、RTK、stacked、API、MCP、ダッシュボード
- [圧縮ルール形式](./COMPRESSION_RULES_FORMAT.md) — JSONルールパック形式
- [圧縮言語パック](./COMPRESSION_LANGUAGE_PACKS.md) — 言語固有のCavemanルール
