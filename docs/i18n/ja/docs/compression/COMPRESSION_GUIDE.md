# 🗜️ Prompt Compression Guide — OmniRoute (日本語)

🌐 **Languages:** 🇺🇸 [English](../../../../compression/COMPRESSION_GUIDE.md) · 🇪🇹 [am](../../../am/docs/compression/COMPRESSION_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/compression/COMPRESSION_GUIDE.md) · 🇦🇿 [az](../../../az/docs/compression/COMPRESSION_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/compression/COMPRESSION_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/compression/COMPRESSION_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/compression/COMPRESSION_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/compression/COMPRESSION_GUIDE.md) · 🇩🇰 [da](../../../da/docs/compression/COMPRESSION_GUIDE.md) · 🇩🇪 [de](../../../de/docs/compression/COMPRESSION_GUIDE.md) · 🇬🇷 [el](../../../el/docs/compression/COMPRESSION_GUIDE.md) · 🇪🇸 [es](../../../es/docs/compression/COMPRESSION_GUIDE.md) · 🇪🇪 [et](../../../et/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/compression/COMPRESSION_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/compression/COMPRESSION_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇱 [he](../../../he/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/compression/COMPRESSION_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/compression/COMPRESSION_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/compression/COMPRESSION_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇩 [id](../../../id/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇹 [it](../../../it/docs/compression/COMPRESSION_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/compression/COMPRESSION_GUIDE.md) · 🇰🇭 [km](../../../km/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/compression/COMPRESSION_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/compression/COMPRESSION_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/compression/COMPRESSION_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/compression/COMPRESSION_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/compression/COMPRESSION_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/compression/COMPRESSION_GUIDE.md) · 🇲🇲 [my](../../../my/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇴 [no](../../../no/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [or](../../../or/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/compression/COMPRESSION_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/compression/COMPRESSION_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/compression/COMPRESSION_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/compression/COMPRESSION_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/compression/COMPRESSION_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/compression/COMPRESSION_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/compression/COMPRESSION_GUIDE.md) · 🇱🇰 [si](../../../si/docs/compression/COMPRESSION_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/compression/COMPRESSION_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/compression/COMPRESSION_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/compression/COMPRESSION_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/compression/COMPRESSION_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [te](../../../te/docs/compression/COMPRESSION_GUIDE.md) · 🇹🇭 [th](../../../th/docs/compression/COMPRESSION_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/compression/COMPRESSION_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/compression/COMPRESSION_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/compression/COMPRESSION_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/compression/COMPRESSION_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/compression/COMPRESSION_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/compression/COMPRESSION_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/compression/COMPRESSION_GUIDE.md)

---

> 対象となるコンテキストを自動的に15～95%削減します。概要については、[READMEの圧縮セクション](../README.md#%EF%B8%8F-prompt-compression--save-15-95-eligible-tokens-automatically)を参照してください。

## 概要

OmniRouteは、リクエストが上流プロバイダーに到達する**前にプロアクティブに**実行される、モジュール式のプロンプト圧縮パイプラインを実装しています。これにより、ワークフローを変更することなく、透過的にトークンを削減できます。

```
クライアントリクエスト
  → 圧縮戦略セレクター
    → コンボによるオーバーライド？ → コンボ設定を使用
    → 自動トリガーのしきい値？ → 自動モードを使用
    → デフォルトモード？ → グローバル設定を使用
    → オフ？ → 圧縮をスキップ
  → 選択された圧縮モード
    → オフ：圧縮なし
    → ライト：安全な空白／書式のクリーンアップ（約15%）
    → スタンダード：電文調による不要語の除去（約30%）
    → アグレッシブ：履歴の経年圧縮＋要約（約50%）
    → ウルトラ：ヒューリスティックな枝刈り＋コードブロックの圧縮（約75%）
    → RTK：コマンドを考慮したターミナル／ツール出力のフィルタリング（上流側で60～90%の範囲）
    → スタック：順序付けされたマルチエンジンパイプライン。通常はRTKの後にCavemanを実行（対象部分で78～95%の範囲）
  → 圧縮済みリクエスト → プロバイダー
```

---

## 圧縮モード

### オフ

圧縮は適用されません。すべてのメッセージが変更されずにそのまま渡されます。

### ライトモード（約15%削減、レイテンシー1ms未満）

最も安全なモードです。意味は一切変更せず、書式のみをクリーンアップします。

| 手法                     | 説明                                       |
| ------------------------ | ------------------------------------------ |
| `collapseWhitespace`     | 連続する空行を統合し、行末の空白を除去する |
| `dedupSystemPrompt`      | 重複するシステムメッセージを削除する       |
| `compressToolResults`    | 冗長なツール／関数出力を圧縮する           |
| `removeRedundantContent` | 繰り返される指示を削除する                 |
| `replaceImageUrls`       | base64画像データURIを短縮する              |

**最適な用途：** 常時有効での利用、安全性が重要なワークフロー。

### スタンダードモード（約30%削減）

[Caveman](https://github.com/JuliusBrussee/caveman)に着想を得たモードで、意味を維持しながら不要語や冗長な表現を削除します。

- 不要語（「please」、「I think」、「basically」、「actually」）を削除
- 冗長な表現を簡潔化（「in order to」→「to」、「as a result of」→「because」）
- 丁寧な婉曲表現を削除（「Would you mind...」、「If you could possibly...」）
- コーディング用プロンプト向けに調整された30以上の正規表現ルール

**最適な用途：** 日常的なコーディングワークフロー、コストを重視するチーム。

### アグレッシブモード（約50%削減）

長時間のセッション向けのスマートな履歴管理機能です。

- **メッセージの経年圧縮** — 古いメッセージほど段階的に強く圧縮
- **ツール結果の要約** — 長いツール出力を要約に置換
- **構造的整合性ガード** — `tool_use`と`tool_result`のペアの整合性を維持
- **コンテキストウィンドウの考慮** — モデルごとのトークン制限を遵守

**最適な用途：** 長時間のデバッグセッション、大規模なコードベース。

### ウルトラモード（約75%削減）

トークンが特に重要なシナリオ向けの最大圧縮モードです。

- **ヒューリスティックな枝刈り** — 関連性のしきい値を下回るメッセージを削除
- **コードブロックの圧縮** — 反復的なコード例を圧縮
- **二分探索による切り詰め** — コンテキストウィンドウに対する最適な切り詰め位置を特定
- アグレッシブモードの全機能を含む

**最適な用途：** コンテキスト上限に繰り返し達する場合。

### RTKモード（上流側で60～90%の範囲）

RTKモードは、コーディングエージェントのセッションに現れる冗長なツール出力向けに最適化されています。

- `git status`、`git diff`、`git log`、テストランナー、TypeScript/Vite/Webpackビルド、ESLint/Biome/Prettier、npm audit／インストール、Dockerログ、インフラ出力、汎用シェル出力などのコマンド／出力クラスを検出
- `open-sse/services/compression/engines/rtk/filters/`にあるJSONフィルターパックを適用
- プロジェクトまたはグローバルの`filters.toml`ファイルからRTK TOML schema v1フィルターをインポートし、インラインテストによる検証とプロジェクトファイルに対する信頼ゲートを実施
- インライン検証サンプルを備えた49個の組み込みフィルターを提供
- ANSI制御シーケンス、プログレスバー、重複行、対処不要なノイズを削除
- 失敗、エラー、警告、変更されたファイル、要約、長い出力の末尾を保持
- 信頼ゲート付きプロジェクトフィルター、グローバルフィルター、および必要に応じて編集済みの生出力を復元する機能をサポート

**最適な用途：** シェル、ビルド、テスト、git、grep、ファイル出力のトランスクリプトを含むエージェントセッション。

### スタックモード（対象部分で78～95%の範囲）

スタックモードは、複数の圧縮エンジンを決定論的な順序で実行します。デフォルトのパイプラインは次のとおりです。

```txt
RTK -> Caveman
```

この順序では、まずターミナル／ツール出力をコンパクトにし、その後、残りの自然言語プロンプトにCavemanの意味的圧縮を適用します。スタックパイプラインは、グローバルに設定することも、ルーティングコンボに割り当てられた圧縮コンボを通じて設定することもできます。

**最適な用途：** 大量のツールログに、人間による指示やアシスタントの要約が混在するコンテキスト。

---

## アップストリームの削減率計算

OmniRoute では、圧縮による削減効果を、アップストリームプロジェクトのベンチマークと
OmniRoute 独自のエンジン構成という 2 つの情報源に基づいて説明しています。

| 情報源  | ここで使用するアップストリーム README の数値                                                                         |
| ------- | -------------------------------------------------------------------------------------------------------------------- |
| Caveman | 出力トークンが `~75%` 減少、ベンチマークでの平均出力削減率 `65%`、範囲 `22-87%`、入力圧縮ツールで `~46%`             |
| RTK     | コマンド出力を `60-90%` 削減。サンプルセッションでは `~118,000 -> ~23,900` トークン、つまり `79.7%` の削減（`~80%`） |

重複するツール／コンテキストのペイロードに対して、OmniRoute のデフォルト構成ではエンジンを次の順序で組み合わせます。

```txt
RTK -> Caveman
```

組み合わせた削減率は加算ではなく、乗算で計算されます。

```txt
combined = 1 - (1 - RTK の削減率) * (1 - Caveman の入力削減率)
average  = 1 - (1 - 0.80) * (1 - 0.46) = 89.2%
range    = 1 - (1 - 0.60..0.90) * (1 - 0.46) = 78.4-94.6%
```

この `78-95%` という数値は、RTK と Caveman の両方が同じ入力／コンテキストのペイロードを削減できる場合に適用されます。
Caveman のレスポンス出力モードは別個のものです。有効にした場合は、Caveman 独自の出力削減率（平均 `65%`、
代表値 `~75%`、範囲 `22-87%`）を使用します。総請求額の削減率は、プロンプトと出力の比率によって異なります。

### 「対象になる」の実際の意味

15-95% という代表的な範囲は実際のものですが、適用されるのは**冗長または過度に詳細な**コンテンツのみです。たとえば、繰り返される
エラー行、同じ警告を大量に出力するビルドログ、過剰に大きな `grep`／ファイル読み取りのダンプなどです。
すべてのリクエストでこれだけ削減できるという意味では**ありません**。

実証済みです（`tests/unit/compression/stacked-compression-tool-result-savings.test.ts`）。同一の
エラー行を 300 行含む Anthropic 形式の `tool_result` ブロックに対して `stacked`（RTK + Caveman）を
実行すると、**トークンを 95.93% 削減／文字数を 96.26% 削減**でき、提示されている範囲に十分収まりました。
しかし、同じパイプラインを通常の非冗長なツール出力（整理された `grep` の一致リスト、
短いファイル読み取り、一般的な会話テキスト）に対して実行した場合は、削除できる反復要素がないため、
想定どおり**ほぼゼロの削減率**になります。また、`validateCompression()`（`validation.ts`）は、
コードブロック、URL、見出し、バージョン、またはすべて大文字の定数識別子を削除・変更するような
書き換えの送信を拒否します。

これはバグではなく、想定された安全な動作です。主に整理されたファイルを読み取ったり grep したりする
コーディングセッションでは、圧縮を完全に有効化していても総削減率は控えめになります。一方、失敗を
繰り返すループや大量の出力を行うリンターに遭遇するセッションでは、そのトラフィックに対して 78-95% の
削減率を最大限に得られます。単一セッションの総削減率が低いことだけを根拠に、圧縮の設定が誤っていると
判断しないでください。まず、元のツール出力が実際に冗長だったかどうかを確認してください。

---

## トークン削減の可視化

```
圧縮なし:             LLM に送信されるトークン数 47K
Lite 使用時:          送信されるトークン数 40K          （15% 削減 — 安全で常時有効）
Standard 使用時:      送信されるトークン数 33K          （30% 削減 — caveman-speak ルール）
Aggressive 使用時:    送信されるトークン数 24K          （50% 削減 — エイジング + 要約）
Ultra 使用時:         送信されるトークン数 12K          （75% 削減 — ヒューリスティックな枝刈り）
RTK 使用時:           送信されるトークン数 19K-5K       （コマンド／ツール出力を 60-90% 削減）
Stacked 使用時:       送信されるトークン数 10K-2.5K     （対象となる RTK+Caveman の範囲で 78-95% 削減）
```

---

## 設定

### ダッシュボード

「ダッシュボード → コンテキストとキャッシュ」に移動します。

- **Caveman** — モード選択、言語パック、プレビュー、グローバルデフォルト
- **RTK** — コマンドフィルタープレビュー、RTK安全設定、フィルターカタログ
- **圧縮コンボ** — ルーティングコンボに割り当てられた名前付きエンジンパイプライン
- **自動トリガーしきい値** — トークン数がしきい値を超えると自動的に圧縮を有効にする

### コンボごとのオーバーライド

「ダッシュボード → コンテキストとキャッシュ → 圧縮コンボ」で、ルーティングコンボに圧縮コンボを割り当てます。

```txt
Combo: "free-tier-fallback"
  Compression Combo: "coding-agent-stack"
  Pipeline: RTK -> Caveman
  Targets:
    1. if/kimi-k2.7-code
    2. if/qwen3.8-max-preview
```

これにより、無料/コーディングプロバイダーでスタック圧縮を使用しつつ、有料サブスクリプションではライトモードを維持できます。

この「コンボごとのオーバーライド」の割り当ては、**ルーティングコンボ圧縮モード**のオーバーライド（Default/Off/Lite/Standard/Aggressive/Ultra）とは異なる制御です。このオーバーライドは、名前付きの圧縮コンボパイプラインを選択するのではなく、`resolveCompressionPlan`によって参照される`compressionMode`フィールドを設定するだけです。これは、コンボカード（「ダッシュボード → コンボ」）で設定することも、または #6760 以降、上記のパイプライン割り当てチェックボックスのすぐ隣にある「ダッシュボード → コンテキストとキャッシュ → 圧縮コンボ」の「ルーティングに割り当てる」リストでルーティングコンボごとに設定することもできます。どちらのインターフェースも、同じ `PUT /api/combos/{id}` エンドポイントを通じて永続化されます。

### リクエストごとのオーバーライド

単一のリクエストの圧縮プランをオーバーライドするには、`x-omniroute-compression`リクエストヘッダーを送信します。これは最も高い優先順位を持ち、ルーティングコンボのオーバーライド、アクティブなプロファイル、自動トリガー、およびパネルのデフォルトよりも優先されます。不明な値は無視され（リクエストが拒否されることはありません）、グローバルマスター設定がすべてを制御します。つまり、グローバルに圧縮が無効になっている場合、このヘッダーで有効にすることはできません。値は以下の通りです。

| Value         | Effect                                                                                                               |
| :------------ | :------------------------------------------------------------------------------------------------------------------- |
| `off`         | このリクエストでは圧縮を行いません。                                                                                 |
| `default`     | パネルから派生したデフォルトプロファイル（アクティブなプロファイルは無視されます）。不可逆エンジンは無効のままです。 |
| `safe`        | ヘッダーを省略した場合と同じです。重複排除と空白の折りたたみのみを行います。                                         |
| `allow-lossy` | 要約、関連性フィルター、スタイル書き換えを含む、このリクエストのオペレータープランを維持します。                     |
| `engine:<id>` | 有効な場合に単一のエンジン（例: `engine:rtk`）。これは、そのエンジンに対するリクエストごとのオプトインです。         |
| `<combo>`     | 名前（大文字小文字を区別しない）で最初に一致し、次にIDで一致する名前付きコンボ。                                     |

`allow-lossy`、`engine:<id>`、または名前付きコンボがない場合、不可逆エンジンは適用されません。圧縮が有効な場合でも、リクエストにはセッションの重複排除と空白の折りたたみが適用されます。

適用されたプランは、`X-OmniRoute-Compression: <mode>; source=<source>`レスポンスヘッダーで返されます。ここで`<source>`は、`request-header`、`routing-override`、`active-profile`、`auto-trigger`、`default`、または`off`のいずれかです。

### API

```bash
# 圧縮設定を取得
curl http://localhost:20128/api/settings/compression

# 圧縮設定を更新
curl -X PUT http://localhost:20128/api/settings/compression \
  -H "Content-Type: application/json" \
  -d '{"defaultMode":"stacked","autoTriggerMode":"stacked","autoTriggerTokens":32000}'

# 特定のRTK/スタックペイロードをプレビュー
curl -X POST http://localhost:20128/api/compression/preview \
  -H "Content-Type: application/json" \
  -d '{"mode":"rtk","messages":[{"role":"tool","content":"npm test output here"}]}'

# RTKフィルターパックを一覧表示
curl http://localhost:20128/api/context/rtk/filters

# オプションのコマンドメタデータを使用してRTKを直接テスト
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
- ✅ システムプロンプト（liteモードの場合）

RTKの生出力リカバリーでは、何らかのデータを永続化する前に、一般的なAPIキー、Bearerトークン、Slackトークン、AWSアクセスキー、
パスワード、トークン、シークレットを秘匿化します。

---

## 圧縮統計

圧縮されたすべてのリクエストには、サーバーログに統計情報が含まれます。

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

## フェーズロードマップ

| フェーズ   | モード                                                                                                                                              | ステータス  |
| ---------- | --------------------------------------------------------------------------------------------------------------------------------------------------- | ----------- |
| フェーズ1  | Off, Lite                                                                                                                                           | ✅ 出荷済み |
| フェーズ2  | Standard, Aggressive, Ultra                                                                                                                         | ✅ 出荷済み |
| フェーズ3  | RTK, Stacked, Compression Combos                                                                                                                    | ✅ 出荷済み |
| フェーズ4  | Output Styles, SLM-tier Ultra, eval harness                                                                                                         | ✅ 出荷済み |
| フェーズ4C | 適応型コンテキスト予算（「ダイヤル」）— 計算エンジン + API (`contextBudget` on `PUT /api/settings/compression`) + ダッシュボードモード/ポリシー制御 | ✅ 出荷済み |

---

## 謝辞

Standardモードの圧縮ルールは、**[JuliusBrussee](https://github.com/JuliusBrussee)**による**[Caveman](https://github.com/JuliusBrussee/caveman)**（⭐ 51K+）— 話題となった「多くのトークンを使わず、少ないトークンで事足りる」というプロジェクト — に着想を得ています。Cavemanでは、出力トークンが`~75%`減少、ベンチマーク平均の出力削減率が`65%`、出力削減率の範囲が`22-87%`、入力圧縮ツールの削減率が`~46%`と報告されています。

RTKモードは、**[RTK AI](https://github.com/rtk-ai)**による**[RTK - Rust Token Killer](https://github.com/rtk-ai/rtk)** — ターミナル、ビルド、テスト、git、およびツール出力のフィルタリングに対応する高性能なコマンド出力圧縮プロジェクト — に着想を得ています。RTKでは`60-90%`の削減率が報告されており、READMEのサンプルセッションでは`~80%`の削減が示されています。

---

## 高度な圧縮システム

7つの標準モードに加えて、OmniRouteにはコンテキストに基づいて自動的に機能するいくつかの高度な圧縮システムが含まれています。

### キャッシュ対応圧縮

一部のプロバイダー（Anthropicのプロンプトキャッシュなど）は**プロンプトキャッシュ**をサポートしており、これによりプロンプトの一部をキャッシュしてコストとレイテンシを削減できます。キャッシュが有効な場合、積極的な圧縮はキャッシュされたトークンを変更し、キャッシュを無効にするため、実際にはパフォーマンスを**低下させる**可能性があります。

`cachingAware.ts`モジュールは、**キャッシュコンテキストを検出し**、それに応じて**圧縮戦略を調整する**ことで、この問題を解決します。

#### 仕組み

1.  **キャッシュコンテキストの検出** — リクエストボディをスキャンして`cache_control`マーカーを探します。
2.  **キャッシュ対応プロバイダーの特定** — ターゲットプロバイダーがキャッシュをサポートしているか確認します。
3.  **戦略の調整** — キャッシュ対応プロバイダーの場合、`aggressive`/`ultra`を`standard`にダウングレードします。
4.  **システムプロンプトのスキップ** — システムプロンプトは通常キャッシュされるため、圧縮しません。
5.  **決定論的変換の使用** — 一貫した出力を生成する変換のみを使用します。

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
// → { hasCacheControl: true, provider: "anthropic", isCachingProvider: true }

const strategy = getCacheAwareStrategy("aggressive", ctx);
// → { strategy: "standard", skipSystemPrompt: true, deterministicOnly: true }
```

#### 使用するタイミング

キャッシュ対応圧縮は**常にオン**であり、設定は不要です。以下の条件が満たされた場合にのみ機能します。

- リクエストに`cache_control`マーカーがある場合
- ターゲットプロバイダーがプロンプトキャッシュをサポートしている場合（Anthropic、OpenAIなど）

### プログレッシブエイジング

長い会話では多くのメッセージターンが蓄積されますが、古いターンほど関連性が低くなります。`progressiveAging.ts`モジュールは、**ターン距離によってメッセージを劣化させます**。

- **最近のターン（0-3）**: 逐語的に保持（完全な詳細）
- **中間のターン（4-8）**: 軽量圧縮（空白、書式設定のクリーンアップ）
- **古いターン（9+）**: 原始人圧縮（フィラーの削除、要約）
- **非常に古いターン（20+）**: 大幅に要約または削除

#### コード例

```ts
import { applyAging } from "@omniroute/open-sse/services/compression/progressiveAging";

const messages = [
  { role: "system", content: "You are a helpful assistant" },
  { role: "user", content: "What is 2+2?" },
  { role: "assistant", content: "4" },
  // ... 50 more turns ...
];

const { messages: aged, saved } = applyAging(messages, {
  verbatim: 3, // 最初の3ターン: 逐語的
  light: 8, // 4-8ターン: 軽量圧縮
  moderate: 20, // 9-20ターン: 原始人圧縮
  // 21ターン以降: 大幅な要約
});

// saved = 節約されたトークン数
```

#### 使用するタイミング

プログレッシブエイジングは、`aggressive`および`ultra`モードで**常にオン**です。特に以下の状況で効果的です。

- 長時間のコーディングセッション
- 数日間にわたる会話
- 多くのツール呼び出しを伴うエージェントワークフロー

### 原始人出力モード

`outputMode.ts`モジュールは、モデル自体が圧縮された簡潔な出力（「原始人」スタイル）を生成するように**システムプロンプトの指示**を注入します。

#### 仕組み

このモードは、入力を圧縮する代わりに、次のようなシステムプロンプトを追加します。

> 「最小限の言葉で返答してください。丁寧な言葉は不要です。短い文を使用してください。」

これは特に以下の状況でうまく機能します。

- コード生成（簡潔な出力 = 少ないトークン）
- 簡単なQ&A（詳細な説明は不要）
- バッチ処理（スループットの最大化）

#### 使用するタイミング

原始人出力モードは**オプトイン**です。コンボ設定で設定します。

```json
{
  "strategy": "auto",
  "config": {
    "auto": {
      "outputMode": "caveman"
    }
  }
}
```

### 出力スタイル（カタログ）

上記の原始人出力モードは**レガシーな単一スタイルパス**です。フェーズ4では、これを構成可能な出力スタイルのカタログに一般化しました。これは`open-sse/services/compression/outputStyles/catalog.ts`の`OUTPUT_STYLE_CATALOG`です。各スタイルは、モデル自体がより安価な出力を生成するようにするシステムプロンプトの指示であり、スタイルは組み合わせて有効にでき、カタログの順序で注入されます。

| Style                      | `id`          | What it does                                                                                                                                                                                                            | Instruction languages                                              |
| :------------------------- | :------------ | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :----------------------------------------------------------------- |
| Terse prose                | `terse-prose` | フィラー/冠詞/曖昧な表現を削除し、技術的な内容を正確に保ちます。レガシーなcaveman出力モードと同じテキストです（参照されており、再入力されていません）。                                                                 | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi                      |
| Less code                  | `less-code`   | YAGNIラダー：最小限の動作変更、不要な抽象化なし。                                                                                                                                                                       | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi                      |
| Ponytail (lazy senior dev) | `ponytail`    | 「最高のコードは書かれないコードである」：再利用 > 書き換え、根本原因 > 症状、最短の動作差分。                                                                                                                          | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi                      |
| I have ADHD (action-first) | `i-have-adhd` | アクションファースト（散文の前にコマンド/パス/スニペット）、番号付きの限定されたステップ、具体的な次のステップは1つ、前置き/要約/締めなし。[ayghri/i-have-adhd](https://github.com/ayghri/i-have-adhd) (MIT) から採用。 | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi                      |
| Terse CJK (文言)           | `terse-cjk`   | 古典中国語の超簡潔なスタイル。                                                                                                                                                                                          | zh (locale-gated: only offered when the resolved language is `zh`) |

各スタイルには3つの強度レベル（`lite`、`full`、`ultra`）があり、各レベルの最後には共通の境界句が付加されます。これにより、コードブロック、ファイルパス、コマンド、エラー文字列、URL、識別子はそのまま保持されます。

#### 注入の仕組み

`applyOutputStyles()` (`open-sse/services/compression/outputStyles/apply.ts`) は、選択内容をカタログに対して解決し（不明なIDやロケールが一致しないスタイルは破棄され、エラーにはなりません）、選択された指示をカタログ順に連結し、境界句を**一度だけ**追加し、その結果を単一の冪等性マーカー（`[OmniRoute Output Styles]`）の背後にあるシステムプロンプトに先行してロードします。再適用は何も行いません。検出されたリクエスト言語に翻訳がある場合、英語の代わりにローカライズされた指示が注入されます。

#### 有効化の方法

ダッシュボードで：**Context → Settings → Compression** — 各スタイルにつき、オン/オフ切り替えとレベルセレクター付きの行があります。プログラム的には、圧縮設定は選択内容を次のように永続化します。

```json
{
  "outputStyles": [
    { "id": "i-have-adhd", "level": "full" },
    { "id": "less-code", "level": "lite" }
  ]
}
```

後方互換性：レガシーな`outputMode: "caveman"`の組み合わせ設定は引き続き機能し、`terse-prose`にマッピングされ、すべてのレガシー言語で古い注入とバイト単位で同一です。

言語選択：`languageConfig.enabled`がオンの場合、`autoDetect`は最新のユーザーメッセージの言語を選択します（入力エンジンと同じ検出器）。`autoDetect`をオフにすると`defaultLanguage`が固定されます。オフの場合 → 英語。

スタイルと言語のマトリックスは`tests/unit/compression/output-styles-i18n-matrix.test.ts`によって固定されています。新しいスタイルは、少なくともpt-BRの翻訳（または明示的に追跡された例外）なしには出荷できず、既存のスタイルがサイレントにロケールを失うことはありません。スタイルを追加するには、[EXTENDING_COMPRESSION.md](./EXTENDING_COMPRESSION.md#adding-an-output-style)を参照してください。

### ツール結果の圧縮

`toolResultCompressor.ts`モジュールは、ツール結果（関数呼び出し、エージェント出力、検索結果など）に対して**5つの特殊な圧縮戦略**を提供します。

1.  **検索結果の圧縮** — 重複する結果を削除し、上位N件を保持します。
2.  **ファイル読み取りの圧縮** — 大容量ファイルを切り詰め、ヘッダー/インポートを保持します。
3.  **コード実行の圧縮** — 必須の標準出力/標準エラーのみを保持します。
4.  **データベースクエリの圧縮** — 行数を制限し、冗長なメタデータを削除します。
5.  **APIレスポンスの圧縮** — nullフィールドを削除し、配列を凝縮します。

#### 使用するタイミング

ツール呼び出しが存在する場合、ツール結果の圧縮は**常にオン**です。設定は不要です。

### スタック型パイプライン

スタックモードは**複数のエンジンを連続して**実行します。通常、最初にRTK（ツール出力で60-90%の節約）、次にCaveman（残りのテキストでさらに30%の節約）が実行されます。これにより、**合計で78-95%の節約**が達成されます。

#### 仕組み

```
Input (1000 tokens)
  → RTK (command-aware filter) → 200 tokens
    → Caveman (filler removal) → 140 tokens
  → Output (140 tokens, 86% savings)
```

#### 使用するタイミング

スタックモードは以下の場合に使用します。

- ツールを多用するワークフロー（エージェントコーディング、研究）
- コストに敏感なバッチ処理
- 最大限のトークン節約が必要な場合

組み合わせで設定：

```json
{
  "strategy": "auto",
  "config": {
    "auto": {
      "modePack": "stacked"
    }
  }
}
```

## コンボ単位の圧縮オーバーライド

さまざまなユースケースに応じて動作を細かく調整するため、グローバルな圧縮モードを**コンボ単位**でオーバーライドできます。

```json
{
  "id": "coding-combo",
  "strategy": "priority",
  "config": {
    "auto": {
      "weights": { "taskFit": 0.5 },
      "modePack": "quality-first"
    }
  },
  "compressionOverride": {
    "mode": "aggressive",
    "stackedPipelines": ["rtk", "caveman"],
    "preserveToolDefinitions": true
  }
}
```

これは次の用途に役立ちます。

- **コーディング用コンボ**: 長時間のセッションには `aggressive` モードを使用
- **簡単な Q&A 用コンボ**: 高速な応答には `lite` モードを使用
- **ツールを多用するコンボ**: 最大限の削減には `stacked` モードを使用
- **本番環境用コンボ**: キャッシュ機能を持つプロバイダーには `cache-aware` モードを使用

---

## 関連項目

- [環境設定](../reference/ENVIRONMENT.md) — 圧縮に関する環境変数
- [アーキテクチャガイド](../architecture/ARCHITECTURE.md) — 圧縮パイプラインの内部構造
- [ユーザーガイド](../guides/USER_GUIDE.md) — 圧縮の利用開始方法
- [RTK 圧縮](./RTK_COMPRESSION.md) — RTK フィルター、信頼モデル、検証ゲート、生出力の復元
- [圧縮エンジン](./COMPRESSION_ENGINES.md) — Caveman、RTK、スタック、API、MCP、ダッシュボード
- [圧縮ルール形式](./COMPRESSION_RULES_FORMAT.md) — JSON ルールパック形式
- [圧縮言語パック](./COMPRESSION_LANGUAGE_PACKS.md) — 言語固有の Caveman ルール
