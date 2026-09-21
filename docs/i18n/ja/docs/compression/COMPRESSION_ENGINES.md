# Compression Engines (日本語)

🌐 **Languages:** 🇺🇸 [English](../../../../compression/COMPRESSION_ENGINES.md) · 🇪🇹 [am](../../../am/docs/compression/COMPRESSION_ENGINES.md) · 🇸🇦 [ar](../../../ar/docs/compression/COMPRESSION_ENGINES.md) · 🇦🇿 [az](../../../az/docs/compression/COMPRESSION_ENGINES.md) · 🇧🇬 [bg](../../../bg/docs/compression/COMPRESSION_ENGINES.md) · 🇧🇩 [bn](../../../bn/docs/compression/COMPRESSION_ENGINES.md) · 🇨🇿 [cs](../../../cs/docs/compression/COMPRESSION_ENGINES.md) · 🇩🇰 [da](../../../da/docs/compression/COMPRESSION_ENGINES.md) · 🇩🇪 [de](../../../de/docs/compression/COMPRESSION_ENGINES.md) · 🇬🇷 [el](../../../el/docs/compression/COMPRESSION_ENGINES.md) · 🇪🇸 [es](../../../es/docs/compression/COMPRESSION_ENGINES.md) · 🇪🇪 [et](../../../et/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇷 [fa](../../../fa/docs/compression/COMPRESSION_ENGINES.md) · 🇫🇮 [fi](../../../fi/docs/compression/COMPRESSION_ENGINES.md) · 🇫🇷 [fr](../../../fr/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇪 [ga](../../../ga/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇳 [gu](../../../gu/docs/compression/COMPRESSION_ENGINES.md) · 🇳🇬 [ha](../../../ha/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇱 [he](../../../he/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇳 [hi](../../../hi/docs/compression/COMPRESSION_ENGINES.md) · 🇭🇷 [hr](../../../hr/docs/compression/COMPRESSION_ENGINES.md) · 🇭🇺 [hu](../../../hu/docs/compression/COMPRESSION_ENGINES.md) · 🇦🇲 [hy](../../../hy/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇩 [id](../../../id/docs/compression/COMPRESSION_ENGINES.md) · 🇳🇬 [ig](../../../ig/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇹 [it](../../../it/docs/compression/COMPRESSION_ENGINES.md) · 🇬🇪 [ka](../../../ka/docs/compression/COMPRESSION_ENGINES.md) · 🇰🇭 [km](../../../km/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇳 [kn](../../../kn/docs/compression/COMPRESSION_ENGINES.md) · 🇰🇷 [ko](../../../ko/docs/compression/COMPRESSION_ENGINES.md) · 🇱🇹 [lt](../../../lt/docs/compression/COMPRESSION_ENGINES.md) · 🇱🇻 [lv](../../../lv/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇳 [ml](../../../ml/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇳 [mr](../../../mr/docs/compression/COMPRESSION_ENGINES.md) · 🇲🇾 [ms](../../../ms/docs/compression/COMPRESSION_ENGINES.md) · 🇲🇹 [mt](../../../mt/docs/compression/COMPRESSION_ENGINES.md) · 🇲🇲 [my](../../../my/docs/compression/COMPRESSION_ENGINES.md) · 🇳🇵 [ne](../../../ne/docs/compression/COMPRESSION_ENGINES.md) · 🇳🇱 [nl](../../../nl/docs/compression/COMPRESSION_ENGINES.md) · 🇳🇴 [no](../../../no/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇳 [or](../../../or/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇳 [pa](../../../pa/docs/compression/COMPRESSION_ENGINES.md) · 🇵🇭 [phi](../../../phi/docs/compression/COMPRESSION_ENGINES.md) · 🇵🇱 [pl](../../../pl/docs/compression/COMPRESSION_ENGINES.md) · 🇵🇹 [pt](../../../pt/docs/compression/COMPRESSION_ENGINES.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/compression/COMPRESSION_ENGINES.md) · 🇷🇴 [ro](../../../ro/docs/compression/COMPRESSION_ENGINES.md) · 🇷🇺 [ru](../../../ru/docs/compression/COMPRESSION_ENGINES.md) · 🇱🇰 [si](../../../si/docs/compression/COMPRESSION_ENGINES.md) · 🇸🇰 [sk](../../../sk/docs/compression/COMPRESSION_ENGINES.md) · 🇸🇮 [sl](../../../sl/docs/compression/COMPRESSION_ENGINES.md) · 🇷🇸 [sr](../../../sr/docs/compression/COMPRESSION_ENGINES.md) · 🇸🇪 [sv](../../../sv/docs/compression/COMPRESSION_ENGINES.md) · 🇰🇪 [sw](../../../sw/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇳 [ta](../../../ta/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇳 [te](../../../te/docs/compression/COMPRESSION_ENGINES.md) · 🇹🇭 [th](../../../th/docs/compression/COMPRESSION_ENGINES.md) · 🇹🇷 [tr](../../../tr/docs/compression/COMPRESSION_ENGINES.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/compression/COMPRESSION_ENGINES.md) · 🇵🇰 [ur](../../../ur/docs/compression/COMPRESSION_ENGINES.md) · 🇺🇿 [uz](../../../uz/docs/compression/COMPRESSION_ENGINES.md) · 🇻🇳 [vi](../../../vi/docs/compression/COMPRESSION_ENGINES.md) · 🇳🇬 [yo](../../../yo/docs/compression/COMPRESSION_ENGINES.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/compression/COMPRESSION_ENGINES.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/compression/COMPRESSION_ENGINES.md)

---

OmniRoute の圧縮は、エンジンコントラクトを中心に構築されています。モードでは、1 つのエンジン
（`caveman` または `rtk`）を直接実行することも、複数のエンジンを順番に実行する決定論的なスタック型パイプラインを使用することもできます。

## モード

| モード       | エンジンパス                          | 想定される入力                                         |
| ------------ | ------------------------------------- | ------------------------------------------------------ |
| `off`        | なし                                  | プロンプトの完全な保持                                 |
| `lite`       | Caveman lite ヘルパー                 | リスクの低い常時クリーンアップ                         |
| `standard`   | Caveman                               | 自然言語プロンプトの圧縮                               |
| `aggressive` | Caveman + 履歴/ツール要約機能         | 長時間のチャットセッション                             |
| `ultra`      | Caveman + プルーニングヘルパー        | コンテキスト上限からの復旧                             |
| `rtk`        | RTK                                   | ターミナル、シェル、ビルド、テスト、git の出力         |
| `omniglyph`  | OmniGlyph                             | ネイティブプロバイダ経路上での画像としてのコンテキスト |
| `stacked`    | パイプライン、既定は `rtk -> caveman` | ツールログと文章の混在、最大限の削減                   |

### OmniGlyph 圧縮プロファイル

`omniglyph` エンジン（パッケージ `omniglyph`、1.4.0 以降）は、名前付きのセマンティックプロファイルを受け付けます。これは、圧縮設定の `omniglyph.profile` を通じてグローバルに設定するか、スタック型パイプラインのステップ設定を通じてステップごとに設定します。

| プロファイル  | 境界                                                                                                    |
| ------------- | ------------------------------------------------------------------------------------------------------- |
| `aggressive`  | 既定。公開済みの測定結果で使用されたポリシー — システム、ツールドキュメント、高密度の履歴を画像化します |
| `balanced`    | ライブ状態をネイティブのまま維持し、直近 8 ターンを保護して、それ以前の完了済み履歴を圧縮します         |
| `coding-safe` | 権限、ツールスキーマ、ライブツール出力をネイティブのまま維持し、直近 12 ターンを保護します              |
| `passthrough` | 変換せずにルーティングします。エンジンはスキップされます                                                |

プロファイルは**下限ではなく上限**です。パッケージ内の `mergeCompressionProfileOptions` は、呼び出し元によるオーバーライドで、プロファイルが閉じた非可逆レーンを再び開くことを拒否します。そのため、ステップごとの `preserveSystemPrompt: false` では、`coding-safe` におけるシステム圧縮を再び有効にできません。

このコードベースでの測定では、`coding-safe` と `balanced` は `minCompressChars` を最大値まで引き上げ、システム、ツールスキーマ、ツール結果をネイティブのまま維持します。そのため、履歴がまだ蓄積されていないセッションは `below_min_chars` で停止し、エンジンは何も変換しません。既定値が最も安全なプロファイルではなく `aggressive` であるのは、このためです。

パッケージは、独自のモデルスコープとプロファイルを環境設定から解決します。
OmniRoute がこの判断を委譲することはありません。アダプターはモデルゲートをパッケージの最も制限の厳しいスコープに固定するため、ホスト環境の設定で許可リストを狭めることはできても、OmniRoute の測定結果を超えて広げることはできません。

## エンジンレジストリ

レジストリは `open-sse/services/compression/engines/registry.ts` にあります。各エンジンは共通の
コントラクトを公開します。

- `id`: `caveman` や `rtk` などの安定したエンジン ID
- `apply(text, config)`: スタック型パイプラインで使用される従来の実行パス
- `compress(input, config)`: テキストと統計情報を返す主要な実行パス
- `getConfigSchema()`: 有効な設定の JSON-Schema 風の構造を返す
- `validateConfig(config)`: `{ valid, errors[] }` を返す

登録には `registerCompressionEngine(engine)`（高度なユースケースでは `registerEngine`）を使用し、
受け入れる前に `assertValidEngine()` と `validateConfig(defaultConfig)` を呼び出します。
実行時にエンジンを削除するには、`unregisterCompressionEngine(id)` を使用します。

`strategySelector.ts` は、圧縮の実行前に組み込みエンジンを登録します。これにより、プレビュー、
ランタイム圧縮、スタックモード、テスト、および将来のエンジンで同じ実行パスを使用できます。

### MCP の説明文圧縮（関連）

別のレジストリが、レジストリレベルで MCP ツールの説明メタデータを圧縮します。詳細は
`open-sse/mcp-server/descriptionCompressor.ts` および [MCP-SERVER.md](../frameworks/MCP-SERVER.md) を参照してください。これは
Caveman のルールを再利用しますが、リクエストペイロードではなくツールメタデータを対象にします。

### その他の組み込みエンジン

Caveman、RTK、LLMLingua-2 に加えて、レジストリには特化型の可逆圧縮 /
構造化エンジンがいくつか含まれています（スタック型パイプライン、プレイグラウンド、テストで使用されます）。

| エンジン      | ID              | 機能                                                                                                                                                                                      |
| ------------- | --------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| CCR           | `ccr`           | Content-Compress-Retrieve（H4）：連続する大きなテキストブロックをコンテンツアドレス参照に置き換え、反復されるブロックや大きなブロックが一度だけ送信され、その後は参照されるようにします。 |
| headroom      | `headroom`      | SmartCrusher（H3 + N5）：同種の JSON 配列ペイロードを列指向の `[N rows]` 形式に可逆圧縮します。                                                                                           |
| ionizer       | `ionizer`       | 非常に大きな同種ブロックに対して先頭・中央・末尾の行をサンプリングし、省略された中央部分を CCR コンテンツアドレス参照として保存します。                                                   |
| session-dedup | `session-dedup` | コンテンツアドレス方式によるターン間重複排除（TokenMizer に着想）：同一セッションの以前のターンですでに出現したテキストを省略します。                                                     |

**CCR 取得プロトコルの指示（#8033）：** CCR がリクエスト内で初めて 1 個以上のブロックを
置き換えると、エンジンは単一の冪等な `system` メッセージ（先頭に
`[CCR protocol]` センチネルを含む）を追加し、呼び出し元にマーカー → ツールのコントラクトを説明します。具体的には、
`[CCR retrieve hash=<24hex> chars=N]` マーカーの意味、ハッシュをそのままコピーする必要があること
（16 進数 24 文字すべて。ハッシュのコピー間違いが「ブロックが見つからない」
エラーの原因として最も可能性が高い）、および `[dedup:ref sha=...]` マーカーが「ツールを
呼び出す」ことではなく「履歴を遡って参照する」ことを意味する点です。この注記は、呼び出し元が提示した `tools[]` によって
実際に `omniroute_ccr_retrieve` へアクセスできることが証明される場合に**のみ挿入されます**
（`open-sse/services/compression/engines/ccr/protocolInstruction.ts` の
`callerSupportsCcrRetrieve()`）。このツールを持たない通常の
OpenAI 互換呼び出し元が、アクセス不能なものを呼び出すよう指示されることはありません。
挿入前にメッセージ履歴内のセンチネルをスキャンすることで冪等性が保証されるため、
過去のメッセージを再送する複数ターンのリクエストでも、ターンごとに
注記が重複して追加されることはありません。

## Caveman

Caveman モードは、通常の文章を意味的に凝縮することに重点を置いています。

- コードブロック、URL、JSON、パス、構造化データを保持
- 冗長な表現、曖昧な言い回し、繰り返される文脈、冗長な接続表現を削除
- `open-sse/services/compression/rules/` にある言語対応のファイルルールパックをサポート
- 従来の `standard`、`aggressive`、`ultra` モードからも引き続き利用可能

ダッシュボード上の場所は `Dashboard -> Context & Cache -> Caveman` です。

Caveman のアップストリームでは、出力トークンが `~75%` 減少し、ベンチマークでの平均出力削減率が
`65%`、範囲が `22-87%`、入力圧縮ツールとしての削減率が `~46%` であると報告されています。
OmniRoute では、プロンプト／コンテキストを重ねて圧縮した場合の削減効果を説明する際に、Caveman の
入力側の数値を使用しています。Caveman の出力モードは、これとは別の応答動作機能です。

## RTK

RTK モードは、コマンドおよびツールの出力に重点を置いています。

- `git status`、`git branch`、`git diff`、Vitest/Jest/Pytest、
  Cargo/Go テスト、TypeScript/Vite/Webpack ビルド、ESLint、npm の監査／インストール、Docker ログ、
  シェルの `find`/`grep`、スタックトレース、汎用ログなどの出力クラスを検出
- `open-sse/services/compression/engines/rtk/filters/` にある49個の JSON フィルターを適用
- RTK 形式の宣言的パイプラインをサポート：ANSI 除去、置換、出力一致による短絡処理、
  行の削除／保持、行単位の切り詰め、先頭／末尾／最大行数による切り詰め、空の場合のフォールバック
- `.rtk/filters.json` の信頼性ゲート付きプロジェクトフィルターと、
  `DATA_DIR/rtk/filters.json` のグローバルフィルターをサポート
- ANSI シーケンス、進捗ノイズ、重複行、有用でない定型文を除去
- 対応可能な失敗、警告、要約、変更されたファイル、末尾のコンテキストを保持
- 認証済みの管理ルートを通じた復元／デバッグのために、編集済みの生出力をオプションで保持可能

ダッシュボード上の場所は `Dashboard -> Context & Cache -> RTK` です。

カスタムフィルター、信頼、検証、生出力の復元に関する運用上の詳細は、
[`RTK_COMPRESSION.md`](./RTK_COMPRESSION.md) に記載されています。

RTK のアップストリームでは、コマンド出力の圧縮によって `60-90%` 削減できると報告されています。
README の例では、30分間の Claude Code セッションが `~118,000` トークンから `~23,900`
トークンになり、`79.7%` 削減されています。

## LLMLingua-2（セマンティックプルーニング）

LLMLingua-2 モードは、小型の ONNX トークン分類器を使用して文章に対する
**セマンティックトークンプルーニング**を実行し、ルールベースの Caveman および RTK エンジンを補完します。

- 非システムメッセージ内の文章のみを圧縮。フェンス付きコードブロックやその他の保持対象構造は
  一切変更されない
- ワーカースレッド内で `@atjsh/llmlingua-2` バックエンド（`@huggingface/transformers` 経由の ONNX）
  を実行するため、モデル推論がリクエストのイベントループをブロックすることはない
- **スタック可能**（`stackPriority` 35）：スタックされたパイプラインでは、
  構造エンジン（CCR、session-dedup、headroom、Caveman）の後、`ultra` の前に実行される。
  セマンティックプルーニングは、あらかじめ構造的に圧縮されたテキストに対して最も効果的であるためです。
  例：`rtk -> caveman -> llmlingua`
- **あらゆるエラーでフェイルオープン**（オプション依存関係の欠落、ワーカーの生成、モデルの読み込み、推論、
  タイムアウトなど）→ エラーになることはなく、元のテキストが変更されずに返される

エンジンの場所：`open-sse/services/compression/engines/llmlingua/`。ダッシュボード上の場所は
`Dashboard -> Context & Cache -> LLMLingua` です。

### モデル

デフォルトモデルは、高速な **TinyBERT**（`atjsh/llmlingua-2-js-tinybert-meetingbank`、~57 MB）です。
より高精度な **BERT-base** モデル（`Arcoldd/llmlingua4j-bert-base-onnx`、~710 MB）も、
エンジン設定の `model` フィールドから利用できます。`@huggingface/transformers` は初回呼び出し時に、
選択されたモデルを HuggingFace Hub から `${DATA_DIR}/models/llmlingua` へ遅延ダウンロードします
（`modelStore.ts`）。代わりに `modelPath` 設定を上書きすると、ローカルコピーを参照できます
（オフライン／エアギャップ環境でのインストール）。

### オプション依存関係とオンデマンドインストール

削除可能な LLMLingua ランタイムのピアスタックは**オプション**です。2つのパッケージが
`package.json` で `optionalDependencies` として宣言され、プロダクションビルドでは
**外部化**されています（`scripts/build/prepublish.ts` はこれらをバンドルしません）。

| パッケージ           | バージョン（固定） | 備考                                                 |
| -------------------- | ------------------ | ---------------------------------------------------- |
| `@atjsh/llmlingua-2` | `2.0.5`            | エントリーパッケージ。他のパッケージをピアとして宣言 |
| `js-tiktoken`        | `^1.0.20`          | トークナイザー                                       |

`@huggingface/transformers` は `^4.2.0` に固定されています（ローカル埋め込みパスと共有され、
スタンドアロンバンドルにもトレースされます）。`@atjsh/llmlingua-2@2.0.5` は
`"^3.5.2 || ^4.0.0"` をピア依存関係としているため、Transformers.js v3 と v4 の両方がサポートされます。
2.0.4 以降、`@atjsh/llmlingua-2` は `@tensorflow/tfjs` を必要としなくなり、SLM スタックで
単独最大の容量を占めていた TensorFlow.js が除外されました。削除可能な SLM ピアは、上記の2つの
パッケージだけです。標準の `npm install`（開発環境）では、オプション依存関係を除外しない限り、
オプションスタックが自動的にインストールされます。

**オンデマンドである理由：** npm で公開されるパッケージ、スタンドアロンバンドル、Docker イメージには、
サイズを抑えるため、これらの依存関係は**含まれていません**。依存関係がない場合、ワーカーの依存関係ゲート
（`worker.ts` 内の `@atjsh/llmlingua-2` 解決プローブ）が失敗し、エンジンは
**通知なしにフェイルオープン**します。つまり、LLMLingua を選択しても何も実行されず
（テキストは変更されずに返され、エラーは記録されません）、削除済み環境で有効化するには、
オプションスタックをインストールします。

```bash
# package.json の optionalDependencies で宣言されたバージョンに固定
npm install @atjsh/llmlingua-2@2.0.5 js-tiktoken
```

`@tensorflow/tfjs` の削除（2.0.4+）により、以前は支配的だった約800 MBの要素がなくなりました。
残るフットプリントは transformers.js + onnxruntime-node ランタイムと、初回使用時にダウンロードされる
TinyBERT モデル（~57 MB、npm 経由ではない）です。

環境別：

- **開発環境 / `npm install`** — `--omit=optional`（または `--no-optional`）を指定していない限り、自動的にインストールされます。対応は不要です。
- **グローバル npm（`npm i -g omniroute`）/ スタンドアロン** — インストール済みパッケージのディレクトリ内で上記のインストールコマンドを実行するか、オプション依存関係を省略せずに再インストールしてください。
- **Docker** — 派生イメージのレイヤーにインストールコマンドを追加してください。公開イメージは意図的にスリムな構成になっています。
- **VPS（PM2）** — アプリの `node_modules` にインストールしてからプロセスを再起動し、ワーカーがゲートを再プローブするようにしてください。
- **未加工の Next スタンドアロン（`npm run build` → `.build/next/standalone/server.js`）** — スタンドアロントレースにはワーカーもオプション依存関係も含まれないため、エンジンは通知なしにフェイルオープンします。`scripts/build/colocate-standalone.mjs` は両方（ワーカーの esbuild と、スタンドアロンツリーへのオプション依存関係クロージャ）を再適用します。これはビルドのたびに `postbuild` npm フックによって自動実行されます。冪等であり、依存関係が存在しない場合はソフトフェイルします。

**有効であることの確認:** LLMLingua を選択すると、実際の文章が実際に短縮され（エンジンがフェイルオープンしなくなり）、最初のリクエストによってモデルが `${DATA_DIR}/models/llmlingua` にダウンロードされます。ゲートは意図的に `@atjsh/llmlingua-2` のみをプローブします。他のピアは ESM 専用であり、存在していても `require.resolve` が例外をスローするためです。そのため、`import()` 時にいずれかのピアが実際に欠けている場合、ワーカーは引き続きフェイルオープンします。

## スタックパイプライン

スタックモードでは、パイプラインの各ステップを順番に実行します。デフォルトは次のとおりです。

```txt
rtk -> caveman
```

プロンプトにコマンド出力と人間またはアシスタントによる文章が混在する、コーディングエージェントのセッションで使用します。まず RTK がノイズの多いツールログを削減し、次に Caveman が残りの自然言語を圧縮します。

パイプラインのステップは、圧縮設定の `stackedPipeline` または圧縮コンボを通じて設定します。

両方のエンジンが同じ対象ペイロードを削減すると、削減効果が複合されます。

```txt
combined = 1 - (1 - RTK savings) * (1 - Caveman input savings)
average  = 1 - (1 - 0.80) * (1 - 0.46) = 89.2%
range    = 1 - (1 - 0.60..0.90) * (1 - 0.46) = 78.4-94.6%
```

## MCP アクセシビリティツリーフィルター

MCP アクセシビリティツリーのスマートフィルターは、プロンプトやコンテキストではなく、MCP の**ツール結果**に対して実行される、実行後の圧縮レイヤーです。Playwright、computer-use、ブラウザ自動化 MCP サーバーなどのツールが返す、冗長なアクセシビリティツリーおよびブラウザスナップショットのペイロードを対象とします。

### 機能

1. **ノイズの除去** — 空の汎用／テキストエントリ（`- generic:`、`- text: ""`）を削除します
2. **兄弟要素の折りたたみ** — 連続する ≥ `collapseThreshold`（デフォルトは 30）行が構造的に繰り返されている場合、先頭の `collapseKeepHead`（デフォルトは 10）行 + 件数の要約 + 末尾の `collapseKeepTail`（デフォルトは 5）行に折りたたみます
3. **参照の保持** — Playwright／computer-use に必要な `[ref=eXX]` アンカーには一切変更を加えません
4. **強制切り詰め** — 折りたたみ後のテキストが引き続き `maxTextChars`（デフォルトは 50,000）を超える場合、エージェントが作業を継続できるよう、ナビゲーション用のヒントを付けて切り詰めます

### エンジンの場所

```txt
open-sse/services/compression/engines/mcpAccessibility/
  index.ts            ← smartFilterText() のエントリーポイント
  collapseRepeated.ts ← 兄弟要素の折りたたみアルゴリズム
  constants.ts        ← DEFAULT_MCP_ACCESSIBILITY_CONFIG
```

### 設定

グローバル設定の `compression.mcpAccessibility`（マイグレーション 056）で制御します。デフォルト設定は次のとおりです。

```json
{
  "enabled": true,
  "maxTextChars": 50000,
  "collapseThreshold": 30,
  "collapseKeepHead": 10,
  "collapseKeepTail": 5,
  "minLengthToProcess": 2000
}
```

このフィルターは、`type` が `"text"` で、長さが `minLengthToProcess` を超えるツール結果ペイロードにのみ適用されます。プロンプト圧縮やリクエストペイロードには影響しません。

### 想定される削減率

ページの複雑さに応じて、ブラウザスナップショットのツール結果を 60～80% 削減します。折りたたみアルゴリズムの計算量は行数に対して O(n) であり、追加されるレイテンシーは無視できる程度です。

### このフィルターと上記の圧縮エンジンの比較

| 観点         | Caveman / RTK / Stacked            | MCP アクセシビリティフィルター         |
| ------------ | ---------------------------------- | -------------------------------------- |
| 対象         | リクエストプロンプト／コンテキスト | MCP ツール結果                         |
| トリガー     | 圧縮モード設定                     | `compression.mcpAccessibility.enabled` |
| 適用範囲     | すべての SSE メッセージ            | ツール結果のみ                         |
| 参照アンカー | 該当なし                           | 無条件で保持                           |

---

## 圧縮コンボ

圧縮コンボは、ルーティングコンボに割り当てられる名前付き圧縮プロファイルです。

- `compression_combos`: モード、パイプライン、RTK 設定、言語設定、およびデフォルトマーカーを保存
- `compression_combo_assignments`: 圧縮コンボをルーティングコンボにマッピング
- ランタイム統合では、汎用コンボのオーバーライドより先に、割り当てられた圧縮コンボを解決
- 分析には `compression_combo_id` と `engine` を含む

ダッシュボード上の場所: `Dashboard -> Context & Cache -> Compression Combos`。

## API サーフェス

| ルート                                 | 目的                                                |
| -------------------------------------- | --------------------------------------------------- |
| `/api/settings/compression`            | グローバル圧縮設定（`mcpAccessibility` 設定を含む） |
| `/api/compression/preview`             | 任意の圧縮モードをプレビュー                        |
| `/api/compression/language-packs`      | 利用可能な Caveman 言語パックを一覧表示             |
| `/api/context/caveman/config`          | Caveman 設定のエイリアス                            |
| `/api/context/rtk/config`              | RTK のデフォルト値と設定                            |
| `/api/context/rtk/filters`             | RTK フィルターカタログ                              |
| `/api/context/rtk/test`                | RTK プレビュー／テストエンドポイント                |
| `/api/context/rtk/raw-output/[id]`     | 認証済みの秘匿化済み生出力の復元                    |
| `/api/context/combos`                  | 圧縮コンボの CRUD                                   |
| `/api/context/combos/[id]/assignments` | ルーティングコンボ割り当ての CRUD                   |
| `/api/context/analytics`               | 圧縮分析のエイリアス                                |

管理ルートには、管理者認証または API キーポリシーのチェックが必要です。

## MCP ツール

圧縮機能では、5 つの MCP ツールを公開しています。

| ツール                              | スコープ            | 目的                             |
| ----------------------------------- | ------------------- | -------------------------------- |
| `omniroute_compression_status`      | `read:compression`  | 設定、分析、キャッシュ統計       |
| `omniroute_compression_configure`   | `write:compression` | グローバル設定を更新             |
| `omniroute_set_compression_engine`  | `write:compression` | モードと任意のパイプラインを設定 |
| `omniroute_list_compression_combos` | `read:compression`  | 圧縮コンボを一覧表示             |
| `omniroute_compression_combo_stats` | `read:compression`  | コンボ／エンジン分析を取得       |

## 適用範囲と除外事項

**埋め込みは圧縮されません。** `open-sse/handlers/embeddings.ts` は、いかなる圧縮エンジンも呼び出しません。リクエスト／レスポンス本文は変更されることなく、そのままエグゼキューターに渡されます。現時点では、これはランタイムチェックではなく構造上の保証です（埋め込みとチャット補完は別個のハンドラーで処理されます）。したがって、#8034 のベクトル歪みに関する懸念が埋め込みパスに影響する余地はありません。

**モデル／エンドポイント単位の除外フィルター（#8034）。** チャット補完では、オペレーターは圧縮対象から常に除外するモデル ID／`provider/model` ターゲットを指定できます。これは、将来的に圧縮処理が埋め込みに隣接するパスの近くに組み込まれた場合に有用なガードレールであり、バイト単位で完全に同一のプロンプトが重要となるモデル（決定論的評価、キャッシュ依存のプレフィックスなど）にも一般的に役立ちます。

- 設定フィールド: グローバル圧縮設定の `exclusions?: string[]`
  （`GET`/`PUT /api/settings/compression`）。既存の `key_value` 圧縮
  名前空間（`src/lib/db/compression.ts`）を介して永続化されます。新しいテーブルは追加されません。
- ダッシュボードタブ: **Dashboard → Compression → Exclusions**
  （`/dashboard/compression/exclusions`）。
- パターン構文: ワイルドカードは `*` のみです。パターン内のその他すべての正規表現メタ文字は
  マッチング前にエスケープされるため、`gpt-5.6` はリテラル文字列のみに一致し、`gpt-5x6`
  には一致しません（ReDoS に対して安全で、処理量が有界であり、ネストした量指定子はありません）。パターンは、大文字と小文字を区別せずに
  モデル ID 単体と `provider/model` の複合表現の両方に対して照合されます。`gpt-5-6`、`openai/gpt-5-6`、
  `openai/*` はすべて機能し、`*` のみを指定するとすべてのモデルが除外されます。
- マッチング: `open-sse/services/compression/exclusions.ts` 内の
  `isCompressionExcluded()` / `normalizeCompressionExclusions()`。`chatCore.ts` は圧縮設定を解決した直後、
  **いずれのエンジンも実行される前に**除外対象をチェックし、一致した場合は
  圧縮がグローバルに無効化されている場合とまったく同様に扱います。そのため、リクエスト本文は
  バイト単位で同一であることが保証されます。スキップは分析で確認できるよう、
  `writeCompressionSkip(..., "excluded")` によって記録されます。
- デフォルト（リストが空または未指定）: #8034 より前の動作と同一で、何も除外されません。

## 既知の制限事項

- **LLMLingua-2 (SLM) には、同じ場所に配置されたオプション依存関係が必要です。** ワーカーがプロダクションビルドで動作するには、`@atjsh/llmlingua-2` とその peer 依存関係が `dist/node_modules` に同じ場所で配置されている必要があります（`scripts/build/colocateOptionals.mjs`、#4286 を参照）。これらがない場合、エンジンはフェイルオープンします（元のテキストを返します）。ワーカーの解決は `import.meta.url` に依存しなくなりました（スタンドアロンバンドルでは機能しないため）。代わりに、ランタイムの cwd / `argv[1]` を基準にします。
- **Caveman の言語パック `de` / `fr` / `ja` は部分的です。** これらには `context` + `filler` + `structural` ルールが含まれていますが、`dedup` / `ultra` パックは含まれていません。そのため、これらの言語では `ultra` 強度は `full` より強くありません（各言語固有のルールのみを使用します。外国語テキストを壊してしまう英語の `dedup`/`ultra` ルールへの暗黙的なフォールバックはありません）。`en` / `es` / `id` / `pt-BR` は完全です。部分的なパック向けの `dedup.json` + `ultra.json` のコントリビューションを歓迎します。
- **スタック型テレメトリには、圧縮を行ったエンジンのみが一覧表示されます。** エンジンは実行されたものの削減率が 0 % だったスタック型パイプラインのステップは `stats:null` を返すため、`engineBreakdown` には表示されません。このため、スキップされたステップと区別できません。「実行済み、0 %」と「スキップ済み」を区別するには内訳モデルの変更が必要となるため、対応は延期されています。

## 検証

この領域に重点を置いたゲートは以下のとおりです。

```bash
node --import tsx/esm --test tests/unit/compression/rtk-*.test.ts tests/unit/compression/pipeline-integration.test.ts tests/unit/compression/context-compression-api.test.ts
node --import tsx/esm --test tests/unit/compression/*.test.ts tests/golden-set/*.test.ts tests/integration/compression-pipeline.test.ts tests/unit/api/compression/compression-api.test.ts
node --import tsx/esm --test tests/unit/compression/mcpAccessibility*.test.ts
npm run typecheck:core
```
