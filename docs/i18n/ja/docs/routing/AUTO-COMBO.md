# OmniRoute Auto-Combo Engine (日本語)

🌐 **Languages:** 🇺🇸 [English](../../../../routing/AUTO-COMBO.md) · 🇪🇹 [am](../../../am/docs/routing/AUTO-COMBO.md) · 🇸🇦 [ar](../../../ar/docs/routing/AUTO-COMBO.md) · 🇦🇿 [az](../../../az/docs/routing/AUTO-COMBO.md) · 🇧🇬 [bg](../../../bg/docs/routing/AUTO-COMBO.md) · 🇧🇩 [bn](../../../bn/docs/routing/AUTO-COMBO.md) · 🇧🇦 [bs](../../../bs/docs/routing/AUTO-COMBO.md) · 🇨🇿 [cs](../../../cs/docs/routing/AUTO-COMBO.md) · 🇩🇰 [da](../../../da/docs/routing/AUTO-COMBO.md) · 🇩🇪 [de](../../../de/docs/routing/AUTO-COMBO.md) · 🇬🇷 [el](../../../el/docs/routing/AUTO-COMBO.md) · 🇪🇸 [es](../../../es/docs/routing/AUTO-COMBO.md) · 🇪🇪 [et](../../../et/docs/routing/AUTO-COMBO.md) · 🇮🇷 [fa](../../../fa/docs/routing/AUTO-COMBO.md) · 🇫🇮 [fi](../../../fi/docs/routing/AUTO-COMBO.md) · 🇫🇷 [fr](../../../fr/docs/routing/AUTO-COMBO.md) · 🇮🇪 [ga](../../../ga/docs/routing/AUTO-COMBO.md) · 🇮🇳 [gu](../../../gu/docs/routing/AUTO-COMBO.md) · 🇳🇬 [ha](../../../ha/docs/routing/AUTO-COMBO.md) · 🇮🇱 [he](../../../he/docs/routing/AUTO-COMBO.md) · 🇮🇳 [hi](../../../hi/docs/routing/AUTO-COMBO.md) · 🇭🇷 [hr](../../../hr/docs/routing/AUTO-COMBO.md) · 🇭🇺 [hu](../../../hu/docs/routing/AUTO-COMBO.md) · 🇦🇲 [hy](../../../hy/docs/routing/AUTO-COMBO.md) · 🇮🇩 [id](../../../id/docs/routing/AUTO-COMBO.md) · 🇳🇬 [ig](../../../ig/docs/routing/AUTO-COMBO.md) · 🇮🇹 [it](../../../it/docs/routing/AUTO-COMBO.md) · 🇬🇪 [ka](../../../ka/docs/routing/AUTO-COMBO.md) · 🇰🇭 [km](../../../km/docs/routing/AUTO-COMBO.md) · 🇮🇳 [kn](../../../kn/docs/routing/AUTO-COMBO.md) · 🇰🇷 [ko](../../../ko/docs/routing/AUTO-COMBO.md) · 🇱🇹 [lt](../../../lt/docs/routing/AUTO-COMBO.md) · 🇱🇻 [lv](../../../lv/docs/routing/AUTO-COMBO.md) · 🇮🇳 [ml](../../../ml/docs/routing/AUTO-COMBO.md) · 🇮🇳 [mr](../../../mr/docs/routing/AUTO-COMBO.md) · 🇲🇾 [ms](../../../ms/docs/routing/AUTO-COMBO.md) · 🇲🇹 [mt](../../../mt/docs/routing/AUTO-COMBO.md) · 🇲🇲 [my](../../../my/docs/routing/AUTO-COMBO.md) · 🇳🇵 [ne](../../../ne/docs/routing/AUTO-COMBO.md) · 🇳🇱 [nl](../../../nl/docs/routing/AUTO-COMBO.md) · 🇳🇴 [no](../../../no/docs/routing/AUTO-COMBO.md) · 🇮🇳 [or](../../../or/docs/routing/AUTO-COMBO.md) · 🇮🇳 [pa](../../../pa/docs/routing/AUTO-COMBO.md) · 🇵🇭 [phi](../../../phi/docs/routing/AUTO-COMBO.md) · 🇵🇱 [pl](../../../pl/docs/routing/AUTO-COMBO.md) · 🇵🇹 [pt](../../../pt/docs/routing/AUTO-COMBO.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/routing/AUTO-COMBO.md) · 🇷🇴 [ro](../../../ro/docs/routing/AUTO-COMBO.md) · 🇷🇺 [ru](../../../ru/docs/routing/AUTO-COMBO.md) · 🇱🇰 [si](../../../si/docs/routing/AUTO-COMBO.md) · 🇸🇰 [sk](../../../sk/docs/routing/AUTO-COMBO.md) · 🇸🇮 [sl](../../../sl/docs/routing/AUTO-COMBO.md) · 🇷🇸 [sr](../../../sr/docs/routing/AUTO-COMBO.md) · 🇸🇪 [sv](../../../sv/docs/routing/AUTO-COMBO.md) · 🇰🇪 [sw](../../../sw/docs/routing/AUTO-COMBO.md) · 🇮🇳 [ta](../../../ta/docs/routing/AUTO-COMBO.md) · 🇮🇳 [te](../../../te/docs/routing/AUTO-COMBO.md) · 🇹🇭 [th](../../../th/docs/routing/AUTO-COMBO.md) · 🇹🇷 [tr](../../../tr/docs/routing/AUTO-COMBO.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/routing/AUTO-COMBO.md) · 🇵🇰 [ur](../../../ur/docs/routing/AUTO-COMBO.md) · 🇺🇿 [uz](../../../uz/docs/routing/AUTO-COMBO.md) · 🇻🇳 [vi](../../../vi/docs/routing/AUTO-COMBO.md) · 🇳🇬 [yo](../../../yo/docs/routing/AUTO-COMBO.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/routing/AUTO-COMBO.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/routing/AUTO-COMBO.md)

---

> **ユーザー向け**: すぐに始めたい場合は、わかりやすい説明と例を掲載した[自動コンボ・ユーザーガイド](../getting-started/AUTO-COMBO-GUIDE.md)をご覧ください。

> 適応型スコアリングと設定不要の自動ルーティングを備えた、自己管理型モデルチェーン

## 設定不要の自動ルーティング（`auto/` プレフィックス）

> **新機能:** コンボを作成する必要はありません。任意のクライアントで `auto/` プレフィックスを直接使用できます。

### 簡単な例

| モデル ID      | バリアント | 動作                                                            |
| -------------- | ---------- | --------------------------------------------------------------- |
| `auto`         | default    | 接続されているすべてのプロバイダー、LKGP 戦略、バランス型の重み |
| `auto/coding`  | coding     | 品質優先の重み。コード生成に最適                                |
| `auto/fast`    | fast       | 低レイテンシーを重視した選択                                    |
| `auto/cheap`   | cheap      | コスト最適化ルーティング（最低コストを優先）                    |
| `auto/offline` | offline    | 利用可能なクォータが最も多いプロバイダーを優先                  |
| `auto/smart`   | smart      | 品質優先 + より高い探索率（10%）により、優れたモデル検出を実現  |
| `auto/lkgp`    | lkgp       | 明示的な LKGP（デフォルトの `auto` と同じ）                     |
| `auto/chaos`   | chaos      | 耐障害性テスト用の障害注入型の重み（カオスエンジニアリング）    |

### カテゴリ × ティアの組み合わせ（`auto/<category>:<tier>`）

OpenRouter 形式のサフィックスでは、**どの種類のルートか**（カテゴリ）と**どのように最適化するか**（ティア）を分離するため、自由に組み合わせることができます（#4235 Phase B、`open-sse/services/autoCombo/suffixComposition.ts`）。

- **カテゴリ**（機能に基づいて候補プールを絞り込み）: `coding` · `reasoning` · `vision` · `chat` · `multimodal`。`vision`/`multimodal` はビジョン対応モデルを保持し、`reasoning` は推論／思考モデルを保持します。
- **ティア**（スコアリングの重み／プールフィルターを選択）: `fast`（迅速な提供）· `cheap`（別名 `floor`、コスト節約）· `reliable`（サーキットブレーカーの健全性 + レイテンシーの安定性）· `free` / `pro`（`classifyTier` を介してモデルティア別にプールを絞り込み — 無料ティアとプレミアム）。

| 例                     | 解決結果                                                     |
| ---------------------- | ------------------------------------------------------------ |
| `auto/coding:fast`     | コーディングプール、低レイテンシーの重み                     |
| `auto/coding:cheap`    | コーディングプール、コスト最適化（別名 `auto/coding:floor`） |
| `auto/reasoning:pro`   | 推論／思考モデルのみ、プレミアムティア                       |
| `auto/vision`          | ビジョン対応モデル（ティアなし → バランス型の重み）          |
| `auto/multimodal:free` | マルチモーダル対応モデル、無料ティアのみ                     |

有効な `auto/<category>[:<tier>]` はすべてオンデマンドで解決されます。厳選されたサブセットは `/v1/models` とダッシュボード（`open-sse/services/autoCombo/builtinCatalog.ts` の `AUTO_SUFFIX_VARIANTS`）に表示されます。フィルタリングは**フェイルオープン**です。制約に一致する接続済みモデルがない場合は、ルーティングが中断されないようにプール全体が使用されます。コアスコアラー（`combo.ts`）は変更されておらず、カテゴリ／ティアのフィルターは `buildAutoCandidates` で適用されます。

> **ライブモデルインテリジェンス:** `ARENA_ELO_SYNC_ENABLED` フラグが有効な場合、自動ルーティングの適合度はライブの **Arena ELO** ランキングと **models.dev** のティアデータに基づいて判断されます（無効な場合は静的な適合度マップにフォールバックします）。

**使用方法:**

```bash
# OpenAI 形式をサポートする任意の IDE または CLI ツール
Base URL: http://localhost:20128/v1
API Key:  <your-endpoint-key>

# コード／設定内でモデルを次のように指定:
model: "auto"                 # バランス型のデフォルト
model: "auto/coding"          # コーディングタスクに最適
model: "auto/fast"            # 利用可能な中で最速
model: "auto/cheap"           # トークンあたりのコストが最安
```

**実行される処理:**

1. OmniRoute が `src/sse/handlers/chat.ts` で `auto/` プレフィックスを検出します
2. データベースからすべての**アクティブなプロバイダー接続**を照会します
3. 有効な認証情報（API キーまたは OAuth トークン）を持つ接続に絞り込みます
4. 接続ごとにモデルを決定します（`connection.defaultModel` またはプロバイダーの最初のモデル）
5. メモリ内に**仮想コンボ**を構築します（DB には保存されません）
6. 選択されたバリアントの重みプロファイルと LKGP 戦略を使用してルーティングします

**主な特性:**

- ✅ **常時有効:** トグル、コンボの作成、設定は不要
- ✅ **動的:** 現在接続されているプロバイダーを自動的に反映
- ✅ **セッション固定:** LKGP により、最後に成功したプロバイダーが優先されることを保証
- ✅ **複数アカウント対応:** 各プロバイダー接続が個別の候補になります
- ✅ **DB 書き込みなし:** 仮想コンボはリクエスト中にのみ存在し、永続化のオーバーヘッドはゼロ

### API キー単位の候補制御（#7819、Level 1+2）

`GET /v1/auto-combo/{channel}/candidates`（`{channel}` = `auto/` の後に続くサフィックス、またはベースチャンネルの場合はリテラル `auto`）は、`auto/*` チャンネルの現在の候補プールをライブの到達可能性情報付きで一覧表示する**読み取り専用**エンドポイントです。既存の耐障害性情報の読み取りを再利用し、生のブレーカー `state` は使用しません。

- プロバイダーのサーキットブレーカー — `getCircuitBreaker(provider).getStatus()` / `.canExecute()`
- 接続のクールダウン — 解決された `provider_connections` 行の `rateLimitedUntil` / `testStatus`
- モデルのロックアウト — `isModelLocked(provider, connectionId, model)`

各候補には、この API キーの `excluded` フラグも含まれます。除外設定は API キーごとに保存されます（`auto_candidate_overrides` テーブル、マイグレーション `128`）。OmniRoute は `users` テーブルを持たないシングルテナント構成であるため、`apiKeyId` が実在する呼び出し元単位の識別情報として最も適しています。除外設定は、`open-sse/services/autoCombo/virtualFactory.ts` にある候補プールのチョークポイントで、純粋かつ単体テスト済みの `filterExcludedCandidates()`（`open-sse/services/autoCombo/candidateOverrides.ts`）を介して適用されます。このフィルターは**フェイルオープン**です。apiKeyId／チャンネルが未設定の場合も、DB ルックアップに失敗した場合も、プールはフィルタリングされません。そのため、オーバーライドを設定していないオペレーターには、この機能の導入前とバイト単位で同一のルーティングが提供されます。

**フォローアップ issue に延期:** 候補ごとの重み付け + 明示的な順序付け（Level 3
— 既存の重み付け／優先度ストラテジーのパスに統合）および `auto/*` チャンネルごとに特定の
`combo.ts` ストラテジーを固定する機能（Level 4）。シングルテナントモデルを踏まえ、オーバーライドを API キー単位のままにするか、グローバルにするかという未解決の問題については、#7819 の計画を参照してください。

**内部処理:**

```txt
リクエスト: { model: "auto/coding" }
   ↓
src/sse/handlers/chat.ts がプレフィックスを検出
   ↓
createVirtualAutoCombo('coding') → アクティブな接続から candidatePool を生成
   ↓
handleComboChat（永続化された combo と同じエンジン）
   ↓
自動スコアリングにより、リクエストごとに最適なプロバイダー／モデルを選択
```

**実装ファイル:**

| ファイル                                                  | 目的                                                 |
| --------------------------------------------------------- | ---------------------------------------------------- |
| `open-sse/services/autoCombo/autoPrefix.ts`               | プレフィックスパーサー（`parseAutoPrefix`）          |
| `open-sse/services/autoCombo/virtualFactory.ts`           | 仮想 `AutoComboConfig` オブジェクトを作成            |
| `open-sse/services/autoCombo/providerRegistryAccessor.ts` | プロバイダーレジストリをモックするためのテストフック |
| `src/sse/handlers/chat.ts`                                | 統合: auto プレフィックスによる早期分岐              |
| `src/shared/constants/providers.ts`                       | `SYSTEM_PROVIDERS.auto` システムエントリ             |

## 実在するモデルIDと一致するコンボ名

`name` がベアモデルIDと同一であるコンボ（例: `gpt-5.5` という名前のコンボ）は、バグではなく、**意図的にサポートされているパターン**です。これは、[#6940](https://github.com/diegosouzapw/OmniRoute/issues/6940) で説明されている、モデルIDごとのプロバイダーフォールバックを実現する仕組みです。コンボの解決はベアモデルIDの解決より先に確認されるため
（`src/sse/services/model.ts` の `getComboForModel()`）、ベアID `gpt-5.5` に対するリクエストは、単一のプロバイダーに直接送られるのではなく、コンボのターゲット（例:
`acme-responses/gpt-5.5`、`backup-responses/gpt-5.5`）を経由してルーティングされます。これは
[#3227/#3233](https://github.com/diegosouzapw/OmniRoute/issues/3227) のために実装された、書き換えよりコンボを優先する仕組みを再利用しており、
`tests/unit/responses-combo-resolution-3227.test.ts` および
`tests/unit/combo-name-codex-responses-rewrite.test.ts` によってリグレッションテストされています。

実在するモデルIDを隠す名前でコンボを作成したり、そのような名前に変更したりしても、**拒否されることはありません**。拒否すると、この文書化されたワークフローが機能しなくなるためです。代わりに
（#8530）、`POST /api/combos` および `PUT /api/combos/[id]` は、（新しい）名前が実在するモデルIDと競合する場合、処理をブロックしない
`warning` フィールドをレスポンスに付加します。

```json
{
  "warning": {
    "code": "COMBO_NAME_SHADOWS_MODEL",
    "modelId": "gpt-5.5",
    "providerId": "openai"
  }
}
```

起動時には、`scanComboModelNameCollisionsAtBoot()`
（`src/instrumentation-node.ts`）も、モデルIDを隠している既存のコンボをすべて列挙する1行の `[STARTUP]` 警告をログに記録します。これにより、#6940 に従って意図的に設定したのではなく、誤ってこの状態になった運用担当者が問題を認識できます。
検出ヘルパーは `src/lib/combos/modelNameCollision.ts` にあります。

## クライアントからカスタムコンボを呼び出す

保存済みコンボ（設定 → コンボ）は、クライアントが `model` フィールドにコンボの**完全に一致する名前**を送信した場合にのみ使用されます。コンボ名のあいまい一致や部分一致は行われず、`auto/` プレフィックスも関係ありません。解決順序（`src/sse/services/model.ts` の `getComboForModel()`）:

1. コンボ名との完全一致（`model: "my-combo"`）、
2. `combo/<name>` プレフィックス（`model: "combo/my-combo"`）、
3. モデル→コンボのglobマッピング（`/api/model-combo-mappings`）。

```bash
curl -X POST http://localhost:20128/v1/chat/completions \
  -H "Authorization: Bearer <key>" \
  -H "Content-Type: application/json" \
  -d '{"model":"my-combo","messages":[{"role":"user","content":"Hello"}]}'
```

よくある落とし穴は次の2つです。

- **`auto` はユーザーのコンボを使用しません。** `auto`/`auto/*` は独自のゼロコンフィグ候補プールを構築し、コンボの名前が文字どおり `auto` である場合にのみ保存済みコンボを参照します（非推奨）。コンボ経由でルーティングするには、`auto` ではなく、その完全に一致する名前を送信してください。
- **`openrouter/auto` は実在する有料のOpenRouter製品**（「Auto Best Available」）であり、OmniRouteのエイリアスではありません。これはOpenRouterレジストリ（`open-sse/config/providers/registry/openrouter/index.ts`）の単一の静的モデルエントリであり、料金も別途請求されます。`auto` プールから除外するには、設定 → ルーティング → 有料モデルを非表示を使用してください。

ここで説明した混乱の経緯については、[#7992](https://github.com/diegosouzapw/OmniRoute/issues/7992) および [#7111](https://github.com/diegosouzapw/OmniRoute/issues/7111) を参照してください。

## 仕組み（永続化された Auto-Combo）

Auto-Combo Engine は、**16 要素のスコアリング関数**（`open-sse/services/autoCombo/scoring.ts` → `DEFAULT_WEIGHTS` で定義）を使用して、リクエストごとに最適なプロバイダー／モデルを動的に選択します。デフォルトの重みの合計は `1.0` で、カスタムの重みは `normalizeScoringWeights()` によって再正規化されます。16 要素のうち、`cacheAffinity` と `resetWindowAffinity` のデフォルトの重みは `0` です。`reliability` は `DEFAULT_WEIGHTS` では `0` ですが、汎用パックでは `0.03`、`reliability-first` では `0.04` です。また、`quality` はパックでは `0.02`（`quality-first` では `0.03`）です。これらもすべての候補について計算され、`cacheAffinity` はスコア外でプロンプトキャッシュの重複排除を制御します。そのため、デフォルトで重みがゼロの要素は単にデフォルトではスコアに寄与しませんが、パックでは寄与します。

![Auto-Combo の 16 要素スコアリング](../diagrams/exported/auto-combo-scoring.svg)

> ソース：[diagrams/auto-combo-scoring.mmd](../diagrams/auto-combo-scoring.mmd)（`npm run docs:render-diagrams` で再生成）。ファイル名は歴史的なものです。ソースとレンダリングされた図には、`DEFAULT_WEIGHTS` で宣言されている 16 要素がすべて示されています。

| 要素                  | デフォルトの重み | 説明                                                                                                                                                                                                            |
| :-------------------- | :--------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `quota`               | 0.1429           | 残りのクォータ／レート制限の余裕 [0..1]                                                                                                                                                                         |
| `health`              | 0.1605           | サーキットブレーカーから得られるヘルススコア（CLOSED=1.0、HALF_OPEN=0.5、OPEN=0.0）                                                                                                                             |
| `costInv`             | 0.1429           | **ブレンドされた**コストの逆数（入力トークン価格 60% + 出力トークン価格 40%、正規化済み）— 安価であるほどスコアが高い                                                                                           |
| `latencyInv`          | 0.1143           | プールに対して正規化された p95 レイテンシーの逆数 — 高速であるほどスコアが高い                                                                                                                                  |
| `taskFit`             | 0.0762           | タスク種別への適合度（コーディング、レビュー、計画、分析、デバッグ、ドキュメント）                                                                                                                              |
| `stability`           | 0.0476           | レイテンシーの標準偏差から算出される分散ベースの安定性 — 応答時間の変動が大きい候補ほどスコアが低い                                                                                                             |
| `tierPriority`        | 0.0476           | アカウント階層の優先度 — Ultra=1.0、Pro=0.67、Standard=0.33、Free=0.0                                                                                                                                           |
| `tierAffinity`        | 0.0476           | 候補の階層と、マニフェストで推奨される階層との親和性                                                                                                                                                            |
| `specificityMatch`    | 0.0476           | リクエストの特異性（マニフェストのヒント）とモデル階層との一致度                                                                                                                                                |
| `contextAffinity`     | 0.0476           | リクエストで必要とされるコンテキストウィンドウと、モデルのコンテキストウィンドウとの親和性                                                                                                                      |
| `sessionAvailability` | 0.0476           | このセッションにおける候補接続の OAuth セッション可用性（`getOAuthSessionAvailability()`。OAuth 以外の接続のスコアは 1.0）                                                                                      |
| `connectionDensity`   | 0.0476           | 同一プロバイダーの接続間で負荷を分散（集中を回避）                                                                                                                                                              |
| `cacheAffinity`       | 0.00             | このリクエストのプロンプトキャッシュのプレフィックスを保持している可能性が最も高い接続に対する、ランデブーハッシュによる親和性（`open-sse/services/combo/promptCacheAffinity.ts`）。デフォルトでは無効（#8008） |
| `resetWindowAffinity` | 0.00             | クォータのリセット期間が有利な接続を優先するバイアス（デフォルトでは無効）                                                                                                                                      |
| `quality`             | 0.03             | ルーティングイベントの品質トラッカーから得られる、フィードバック駆動の出力品質シグナル。観測データがない候補には中立値の 0.5 が与えられる                                                                       |
| `reliability`         | 0.00             | 10 サンプルを最低条件とする過去 24 時間の使用履歴（それ以外の場合はリアルタイム指標）から得られる、観測された成功割合 `1 - failureRate`。観測データがない候補は 1.0 と見なされる。デフォルトでは無効            |

**合計：** `DEFAULT_WEIGHTS` で宣言されているとおり、`0.1429 + 0.1605 + 0.1429 + 0.1143 + 0.0762 + (7 × 0.0476) + 0.00 + 0.00 + 0.03 + 0.00 = 1.0` です。ユーザーが設定した重みは、スコアリングの前に `normalizeScoringWeights()` によって分布として再正規化されます。

## モードパック

`open-sse/services/autoCombo/modePacks.ts` には、事前定義された6つの重みプロファイルがあります。各パックはデフォルトの重みを完全に置き換え、選択が1つの目標に偏るようにします。各パックの合計はすでに `1.0`（小数点以下4桁で表示すると `0.9999`）であるため、パックが有効な場合、`normalizeScoringWeights()` が実質的に補正するものはありません。以下の値は、丸め誤差を除けば、スコアラーが適用する値です。

| 要素                  | ship-fast  | cost-saver | quality-first | offline-friendly | reliability-first | chaos-mode |
| :-------------------- | :--------- | :--------- | :------------ | :--------------- | :---------------- | :--------- |
| `quota`               | 0.1133     | 0.1133     | 0.0752        | **0.3324**       | 0.1133            | 0.0376     |
| `health`              | 0.2667     | 0.1810     | 0.1714        | 0.2667           | **0.3524**        | **0.4000** |
| `costInv`             | 0.0276     | **0.3324** | 0.0276        | 0.0752           | 0.0181            | 0.0140     |
| `latencyInv`          | **0.3048** | 0.0476     | 0.0476        | 0.0476           | 0.0476            | 0.0186     |
| `taskFit`             | 0.0952     | 0.0952     | **0.3524**    | 0.0000           | 0.0952            | 0.1905     |
| `stability`           | 0.0000     | 0.0476     | 0.1429        | 0.0952           | 0.1905            | 0.1714     |
| `tierPriority`        | 0.0376     | 0.0376     | 0.0276        | 0.0376           | 0.0276            | 0.0040     |
| `tierAffinity`        | 0.0000     | 0.0000     | 0.0000        | 0.0000           | 0.0000            | 0.0000     |
| `specificityMatch`    | 0.0000     | 0.0000     | 0.0000        | 0.0000           | 0.0000            | 0.0000     |
| `contextAffinity`     | 0.0095     | 0.0000     | 0.0000        | 0.0000           | 0.0000            | 0.0186     |
| `sessionAvailability` | 0.0476     | 0.0476     | 0.0476        | 0.0476           | 0.0476            | 0.0476     |
| `resetWindowAffinity` | 0.0000     | 0.0000     | 0.0000        | 0.0000           | 0.0000            | 0.0000     |
| `connectionDensity`   | 0.0476     | 0.0476     | 0.0476        | 0.0476           | 0.0476            | 0.0476     |
| `quality`             | 0.02       | 0.02       | **0.03**      | 0.02             | 0.02              | 0.02       |
| `reliability`         | 0.03       | 0.03       | 0.03          | 0.03             | **0.04**          | 0.03       |

注:

- **パックには `quality` と `reliability` が含まれています**（`quality 0.02`、`quality-first 0.03`、`reliability 0.03`、`reliability-first 0.04`）。また、重みマップをマージではなく丸ごと置き換えます（`weights = pack`）。`DEFAULT_WEIGHTS` には `quality 0.03 / reliability 0` が含まれています。`balanced`/`default` を選択するとこれらのデフォルト値が維持され、パックを選択すると上記のパック値が使用されます。コールドプール（まだ観測値がなく、`quality 0.5`、`reliability 1` の状態）では、この2つの要素によって、汎用パックでは `+0.04`（`0.03 + 0.01`）、`quality-first` では `+0.045`、`reliability-first` では `+0.05` が加算されます。
- `tierAffinity`、`specificityMatch`、`resetWindowAffinity` は、すべてのパックで明示的に `0` に設定されています。
- 各パックの重点を一目で確認すると、次のとおりです。
  - **ship-fast** → latencyInv 0.3048 + health 0.2667（低レイテンシで正常な接続）
  - **cost-saver** → costInv 0.3324（最も安価なトークンが優先）
  - **quality-first** → taskFit 0.3524 + stability 0.1429 + quality 0.03。全パック中で最高（タスクに最適で、一貫性のあるモデル）
  - **offline-friendly** → quota 0.3324 + health 0.2667（速度やコストに関係なく、最大の余裕を確保）
  - **reliability-first** → health 0.3524 + stability 0.1905 + reliability 0.04。全パック中で最高（予期しない事態を最小化）
  - **chaos-mode** → health 0.4000 + taskFit 0.1905（フォールトインジェクション用プロファイル）

### リクエスト単位の制御（ヘッダー）— #6023 / #6024 / #6025 / #3470

`auto` コンボでは、保存されているコンボ設定を変更せずに、3つのヘッダーを介して**リクエスト単位**で動作を制御できます。これらは `auto` ストラテジーにのみ適用され、かつヘッダーを含むリクエストにのみ適用されます。ヘッダーが存在しない場合は、コンボに保存されている `modePack`/`budgetCap`/`budgetFallback` が使用されます。

| ヘッダー                      | 受け付ける値                                                                                                                                                                                     | 効果                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| :---------------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `X-OmniRoute-Mode`            | プリセットエイリアス（`fast`、`balanced`、`quality`、`cheap`、`reliable`、`offline`）、または生のパック名（`ship-fast`、`cost-saver`、`quality-first`、`offline-friendly`、`reliability-first`） | このリクエストのスコアリング重みを上書きします。`balanced`/`default` はデフォルトの重みを強制的に使用します（パックなし）。不明な値は無視されます（設定は維持されます）。                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| `X-OmniRoute-Budget`          | 正の数（リクエストあたりの最大 USD）                                                                                                                                                             | コストのハード上限です。推定コストがこの値を超える候補は、選択前に除外されます。**すべての**候補が上限を超える場合の動作は、以下の `X-OmniRoute-Budget-Fallback` で制御されます。                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| `X-OmniRoute-Budget-Fallback` | `cheapest`（デフォルト、エイリアス: `cheapest-viable`、`soft`）、または `strict`（エイリアス: `block`、`hard`）                                                                                  | `cheapest`: 上限を超過していても、全候補の中で最も安価な候補にフォールバックします（従来の動作）。`strict`: 選択を拒否し、黙って予算を超過する代わりにリクエストを `HTTP 402` で即座に失敗させます。不明な値は無視されます。                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| `X-OmniRoute-Effort`          | `auto`（その他の値は予約済み）                                                                                                                                                                   | 適応型思考予算です。リクエストにいかなる形式の reasoning フィールド（`reasoning_effort`、`reasoning`、`thinking`）も含まれていない場合、ゲートウェイは決定論的なリクエスト形状シグナル（最後のユーザーメッセージの長さ、最後のユーザーメッセージまでのコンテキストサイズ、以前のツール結果、ツールループの深さ）に基づいて、`auto` を `low`/`medium`/`high` のいずれかに解決します。シグナルのスコープは現在のターンに限定され、最後のユーザーメッセージより後にあるものはすべて無視されます。そのため、ツールループ内のすべてのリクエストは同じレベルに解決されます（ターン単位のステートレスな固定であり、セッション状態はなく、上流のプロンプトキャッシュのプレフィックスを損なうようなループ途中でのエスカレーションもありません）。クライアントが明示的に指定した reasoning フィールドが常に優先されます。上流へのディスパッチが OpenAI Chat Completions 形式（`targetFormat === FORMATS.OPENAI`）に解決されるリクエストにのみ適用されます。`reasoning_effort` は OpenAI 形式のフィールドであるため、Claude または Gemini を対象とするリクエストではこのヘッダーは何も行いません（`open-sse/handlers/chatCore/adaptiveEffortWiring.ts` を参照）。 |

```bash
# 最速プロファイルを強制し、このリクエストの上限を $0.05 に設定して、予算超過を許可せずハードブロックする
curl -sS http://localhost:20128/v1/chat/completions \
  -H "Content-Type: application/json" \
  -H "X-OmniRoute-Mode: fast" \
  -H "X-OmniRoute-Budget: 0.05" \
  -H "X-OmniRoute-Budget-Fallback: strict" \
  -d '{"model":"auto","messages":[{"role":"user","content":"hi"}]}'
```

解決処理は純粋関数（`open-sse/services/autoCombo/requestControls.ts`）であり、解決された値はエンジンの既存の `config.modePack` / `config.budgetCap` /
`config.budgetFallback` 入力に渡されます。コンボに保存された `config.budgetFallback`（"strict" |
"cheapest"）が永続的なポリシーを設定し、ヘッダーは単一のリクエストに対してその設定を上書きします。

## すべてのルーティング戦略

OmniRoute のコンボエンジンは、**19 種類のルーティング戦略**（`src/shared/constants/routingStrategies.ts` → `ROUTING_STRATEGY_VALUES` で宣言）をサポートしています。Auto Combo エンジン自体は `auto` 戦略として公開されており、その他の戦略は永続化されたコンボで利用できます。

| 戦略                | 説明                                                                                                                                                                                                                 |
| :------------------ | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `priority`          | 明示的な優先順位に基づき、最初のターゲットから順に試行するリスト                                                                                                                                                     |
| `weighted`          | ターゲットごとの重みに基づく重み付きランダム                                                                                                                                                                         |
| `round-robin`       | ターゲットを順番に巡回                                                                                                                                                                                               |
| `context-relay`     | ターゲット間でコンテキストを引き継ぐ（長い会話向け）                                                                                                                                                                 |
| `fill-first`        | 次のターゲットに移る前に、各ターゲットのクォータを使い切る                                                                                                                                                           |
| `p2c`               | 2 択方式によるランダム負荷分散                                                                                                                                                                                       |
| `random`            | 一様ランダム選択                                                                                                                                                                                                     |
| `least-used`        | 現在の負荷が最も低いターゲットを選択                                                                                                                                                                                 |
| `cost-optimized`    | カタログ価格に基づいてリクエストあたりのコストを最小化                                                                                                                                                               |
| `reset-aware` ⭐    | クォータのリセット時刻に基づいて優先順位を決定 — リセット間隔が短いものを上位に配置                                                                                                                                  |
| `reset-window`      | クォータウィンドウが最も早くリセットされるターゲットを優先                                                                                                                                                           |
| `headroom`          | クォータの残余容量が最も多いターゲットを選択                                                                                                                                                                         |
| `strict-random`     | 重複を排除せずにランダム選択                                                                                                                                                                                         |
| `auto`              | Auto Combo スコアリング（16 要素）を使用 — **推奨**                                                                                                                                                                  |
| `lkgp`              | Last-Known-Good Path（最後に成功したプロバイダーに固定し、その後ルールにフォールバック）                                                                                                                             |
| `context-optimized` | 現在のコンテキストサイズに最も適したターゲットを選択                                                                                                                                                                 |
| `cache-optimized`   | プロンプトキャッシュとの親和性に基づいてターゲットを並べ替え — このリクエストのキャッシュ済みプレフィックスを保持している可能性が最も高い接続を最初に試行（`open-sse/services/combo/promptCacheAffinity.ts`、#8008） |
| `fusion` 🧬         | 複数のモデルへ並列に送信し、判定モデルを介して 1 つの回答に統合（下記参照）                                                                                                                                          |
| `pipeline`          | ターゲットを順番に実行し、各ステップの出力を次のステップの入力へ引き継ぐ。返されるのは最終回答のみ（#6396）                                                                                                          |

⭐ = v3.8.0 で追加 · 🧬 = v3.8.36 で追加

### `weighted` のセマンティクス

`weighted` は、均等化ではなく、**リクエストごとの比率に基づくランダム抽選**です
（`open-sse/services/combo/targetSorters.ts` → `selectWeightedTarget`）。

- 各リクエストでは、`weight / totalWeight` の確率で **1 つ**のステップを抽選します。残りのステップは、そのリクエストのフォールバックチェーンとして重みの降順に並べられます。
- 重みが `0`（または未指定）のステップは、他に重み > 0 のステップが 1 つでも存在する限り、**抽選されることはありません**。抽選されたステップが失敗した後のフォールバックとしてのみ機能します。**すべて**の重みが 0 の場合に限り、選択は一様になります。
- すべてのターゲットが利用不能なステップ（プロバイダーのサーキットブレーカーが `OPEN`、接続がクールダウン中、モデルがロックアウト中）は、抽選前に除外されます
  （`open-sse/services/combo/targetResolution.ts`）。そのため、正常なステップが 1 つしかない場合は、一時的にすべてのリクエストでそのステップが選ばれる可能性があります。
- `stickyWeightedLimit`（コンボ設定、デフォルトは `1` = オフ）を指定すると、再抽選する前に、抽選されたステップをその回数だけ連続成功するまで固定します。

厳密なローテーションには `round-robin` を使用してください。`weighted` で重みを均等にしても、得られるのは統計的な均衡であり、厳密な均衡ではありません。

## Fusion 戦略

`fusion` は、単一のターゲットを選択**しない**唯一の戦略です。プロンプトを
**すべてのパネルモデルへ並列に**展開し、設定可能な**ジャッジモデル**が
すべてのパネル応答から単一の最終回答を合成します。アップストリームの `decolua/9router`
（OpenRouter の Fusion 設計）から移植されており、実装は `open-sse/services/fusion.ts` にあります。

仕組み：

0. **ツール付きリクエストのバイパス** — 空でない `tools` 配列を持ち、かつ
   `tool_choice` が明示的に `"none"` ではないリクエストは、パネルを完全にスキップします。
   そのリクエストは単一モデル（設定されたジャッジ、または `panel[0]`）へ直接ルーティングされ、
   `tools`/`tool_choice` は変更されずに渡されます。パネルメンバーはツールへアクセスできず、
   ジャッジの合成指示ではツール呼び出しを出力しないよう促されるため、エージェント型／ツール呼び出し型クライアントは、
   合成された文章ではなく、実際のツール呼び出し判断を受け取れます（#6771）。
1. **ファンアウト**（ツールなしのリクエストのみ）— プロンプトはすべてのパネルモデルへ
   同時に送信され、ツールを取り除いたうえで非ストリーミングが強制されます（ジャッジが合成するには
   完全な文章が必要なためです）。
2. **クォーラム猶予付き収集** — `minPanel` 件の回答が到着するとすぐに、遅れているモデル向けの
   短い猶予タイマーが開始されます。その後、収集できた回答を使用して Fusion が続行されます。
   これにより、最も遅いモデルが実時間に与えるペナルティを抑えつつ、ハードタイムアウトによる上限も設けられます。
3. **ジャッジによる合成** — パネルの回答は匿名化され（`Source 1`、`Source 2`、… — これにより
   ジャッジはモデルのブランドではなく内容を評価します）、ジャッジへ渡されます。ジャッジは、
   合意点／矛盾／部分的な網羅／固有の洞察／見落としを分析したうえで、信頼できる回答を
   **1 つ**作成します。ジャッジ呼び出しではクライアントの元の `stream` フラグとツールが維持されるため、
   ストリーミングと後段でのツール利用は引き続き機能します。
4. **グレースフルデグラデーション** — パネル回答が 0 件 → `503`、生き残った回答がちょうど 1 件 →
   その回答を直接返します（合成対象がないため）。単一モデルのパネルも直接回答します。

パネルメンバーには、別のコンボを参照する `combo-ref` ステップ（`{kind: "combo-ref", comboName: "..."}`）も
使用できます。この場合、参照先コンボ自身のターゲットをファンアウトするのではなく、そのコンボへの完全な再帰ディスパッチを行う
**1 つのブラックボックス型パネル音声**として解決されます。また、`combo-ref` を使用する他のすべての戦略ですでに使用されているものと
同じ深度／循環保護が適用されます（#6764）。

### 設定

コンボの `config` blob で設定します（スキーマ移行は不要です。既存の
`combos` テーブルを再利用します）。

| フィールド                               | 型       | デフォルト         | 目的                                                                        |
| :--------------------------------------- | :------- | :----------------- | :-------------------------------------------------------------------------- |
| `config.judgeModel`                      | `string` | 最初のパネルモデル | 最終回答を合成するモデル                                                    |
| `config.fusionTuning.minPanel`           | `number` | `2`                | 猶予タイマーを開始する前に必要な成功回答数（`[2, panelSize]` の範囲に制限） |
| `config.fusionTuning.stragglerGraceMs`   | `number` | `8000`             | クォーラム到達後、遅れているモデルを待機する時間                            |
| `config.fusionTuning.panelHardTimeoutMs` | `number` | `90000`            | 1 つの停止したモデルによってリクエストが滞留しないようにする絶対上限        |

デフォルト値は `FUSION_DEFAULTS`（`open-sse/services/fusion.ts`）で定義されています。

### 例

```bash
curl -X POST http://localhost:20128/api/combos \
  -H "Authorization: Bearer <key>" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "fusion-panel",
    "strategy": "fusion",
    "targets": [
      { "model": "cc/claude-opus-4-7" },
      { "model": "cx/gpt-5.5" },
      { "model": "glm/glm-5.1" }
    ],
    "config": {
      "judgeModel": "cc/claude-opus-4-7",
      "fusionTuning": { "minPanel": 2, "stragglerGraceMs": 8000, "panelHardTimeoutMs": 90000 }
    }
  }'
```

その後は、他のコンボと同様に呼び出します：`{"model":"fusion-panel","messages":[...]}`。

## 仮想 Auto-Combo ファクトリー

Auto Combo エンジンでは、事前定義されたコンボは必要ありません。代わりに、`open-sse/services/autoCombo/virtualFactory.ts` が候補を動的に構築します。

1. `getProviderConnections({ isActive: true })`（有効化されているすべての接続）を取得
2. 有効な認証情報を持つ接続に絞り込み（API キー、または `hasUsableOAuthToken()` による有効期限内の OAuth トークン）
3. モデルの可用性と料金について `getProviderRegistry()` と照合
4. 各タプル `(provider, model, connection)` に対して `VirtualAutoComboCandidate` を構築
5. ディスパッチ先として `connection.defaultModel`（またはレジストリの最初のモデル）を選択
6. 16 要素の `scorePool()` とバリアントの重みセットを使用して各候補をスコアリング
7. 生成されたインメモリの `AutoComboConfig` を `handleComboChat()` に返す — DB には一切永続化されない

つまり、**`auto/*` が有効な新しいプロバイダーを追加すると、候補プールが自動的に拡張されます** — コンボを手動で編集する必要はありません。仮想コンボはリクエストごとに再構築されるため、新しく追加された接続や、新たに正常な状態になった接続が即座に反映されます。

## 自己修復

- **一時的な除外**：スコア < 0.2 → 5 分間除外（段階的バックオフ、最大 30 分）
- **サーキットブレーカー対応**：OPEN → 自動的に除外、HALF_OPEN → プローブリクエスト
- **インシデントモード**：50% 超が OPEN → 探索を無効化し、安定性を最大化
- **クールダウン後の復旧**：除外解除後、最初のリクエストはタイムアウトを短縮した「プローブ」として実行

## バンディット探索

リクエストの 5%（設定可能）は、探索のためにランダムなプロバイダーへルーティングされます。インシデントモードでは無効になります。

## API

**専用の `POST /api/combos/auto` エンドポイントはありません** — Auto-Combo は次の 2 つの方法で利用します。

1. **ゼロコンフィグ（推奨）：** 任意のチャット補完リクエストで `model: "auto"` または `model: "auto/<variant>"` を指定します。仮想ファクトリーがリクエストごとにコンボを構築します。永続化も API 呼び出しも必要ありません。

2. **`strategy: "auto"` を指定した永続化コンボ：** `POST /api/combos` で通常のコンボを作成し、`strategy: "auto"` と `config.auto.weights` / `config.auto.candidatePool` を設定します。同じスコアリングエンジンが使用されます。コンボは `combos` に保存され、ID を指定して再利用できます。

検出用として、`GET /api/combos/auto` は、解決済みの候補プールに加え、候補プール内のコンテキストウィンドウの最大値である `context_length` / `max_output_tokens` とともに、すべてのバリアントを一覧表示します。クライアント（例：opencode プラグイン）は、`0` ではなくこれらの値を公開する必要があります。コンテキストがゼロの場合、opencode の自動圧縮が完全に無効化され、ゲートウェイによる履歴削除でコンテキストが失われるまでセッションが増大し続けます。Auto-Combo のコンテキスト事前フィルターは、サイズ超過のリクエストを大きなウィンドウを持つ候補へルーティングするため、最大値を公開しても安全です。

```bash
# ゼロコンフィグでの使用（コンボの作成不要）
curl -X POST http://localhost:20128/v1/chat/completions \
  -H "Authorization: Bearer <key>" \
  -H "Content-Type: application/json" \
  -d '{"model":"auto/coding","messages":[{"role":"user","content":"Hello"}]}'

# 通常のコンボエンドポイントを介した永続化 Auto Combo
curl -X POST http://localhost:20128/api/combos \
  -H "Content-Type: application/json" \
  -d '{"id":"my-auto","name":"Auto Coder","strategy":"auto","config":{"auto":{"candidatePool":["anthropic","google","openai"],"weights":{"quota":0.15,"health":0.3,"costInv":0.05,"latencyInv":0.35,"taskFit":0.1,"stability":0,"tierPriority":0.05}}}}'
```

### Auto ルーター戦略

永続化された `strategy: "auto"` コンボでは、`config.routerStrategy`（またはレガシーな
`config.auto.routerStrategy`）に次のいずれかを設定できます。

- `rules` — デフォルトの重み付きスコアリング
- `score` — 設定された重み付きスコアが最も高い候補を選択します。完全に同点の場合は、設定された
  候補の順序が維持されます。既存の `explorationRate` は、ランク付けされたプール全体からサンプリングします。
- `cost` / `eco` — 最も安価で正常なプロバイダー
- `latency` / `fast` — 信頼性ペナルティを考慮した最小の p95 レイテンシ
- `sla-aware` / `sla` — p95 レイテンシ、エラー率、およびオプションの
  コスト SLO を満たす候補を優先
- `lkgp` — 最後に正常だった既知のプロバイダーを最優先

### ルーター戦略の詳細

Auto-Combo エンジンは、`config.routerStrategy`（またはレガシーな `config.auto.routerStrategy`）
で切り替え可能な、6 つのプラグイン対応 **RouterStrategy** 実装を公開しています。
各戦略は、`RoutingContext`（タスクタイプ、ツール／ビジョンのヒント、推定トークン数、オプションの SLA ポリシー、
オプションの最後に正常だった既知のプロバイダー）に基づいて、候補プールから 1 つのプロバイダーを選択します。

#### 1. `rules`（デフォルト）— 16 要素の重み付きスコアリング

既存のスコアリングエンジンをラップします。`OPEN` 状態のサーキットブレーカーを持つ
候補を除外した後、現在のタスクタイプと `getTaskFitness()` を使用して `scorePool()` を実行し、
最もスコアの高いプロバイダーを選択します。

```ts
class RulesStrategyImpl implements RouterStrategy {
  readonly name = "rules";
  readonly description = "16-factor weighted scoring (see DEFAULT_WEIGHTS)";

  select(pool, context) {
    const eligible = pool.filter((c) => c.circuitBreakerState !== "OPEN");
    const ranked = scorePool(
      eligible.length > 0 ? eligible : pool,
      context.taskType,
      undefined,
      getTaskFitness
    );
    return { provider: ranked[0].provider /* ... */ };
  }
}
```

**使用すべき状況**：デフォルト。すべてのシグナル間でバランスの取れたトレードオフが必要な場合に使用します。

**エイリアス**：`rules`（エイリアスなし）

---

#### 2. `cost` / `eco` — 最も安価で正常なプロバイダー

候補プールを `costPer1MTokens` の昇順で並べ替え、最も安価な候補を選択します。
最初に `OPEN` 状態の候補を除外します。

```ts
class CostStrategyImpl implements RouterStrategy {
  readonly name = "cost";
  readonly description = "Always selects cheapest available provider";

  select(pool, context) {
    const healthy = pool.filter((c) => c.circuitBreakerState !== "OPEN");
    const sorted = [...healthy].sort((a, b) => a.costPer1MTokens - b.costPer1MTokens);
    return { provider: sorted[0].provider /* ... */ };
  }
}
```

**使用すべき状況**：コスト重視のワークロード、バッチ処理、またはバックグラウンドジョブ。

**エイリアス**：`cost`、`eco`

---

#### 3. `latency` / `fast` — 信頼性ペナルティを考慮した最小の p95 レイテンシ

`p95LatencyMs + (errorRate * 1000)` でソートします。エラー率に対するペナルティにより、公称レイテンシーが低い場合でも、信頼性の低いプロバイダーは低い順位になります。

```ts
class LatencyStrategyImpl implements RouterStrategy {
  readonly name = "latency";
  readonly description =
    "信頼性による重み付けを行い、p95レイテンシーが最も低いプロバイダーを優先します";

  select(pool, context) {
    const healthy = pool.filter((c) => c.circuitBreakerState !== "OPEN");
    const sorted = [...healthy].sort(
      (a, b) => a.p95LatencyMs + a.errorRate * 1000 - (b.p95LatencyMs + b.errorRate * 1000)
    );
    return { provider: sorted[0].provider /* ... */ };
  }
}
```

**使用する場面**: リアルタイムチャット、オートコンプリート、対話型コーディングアシスタントなど、レイテンシーが重要なワークロード。

**エイリアス**: `latency`、`fast`

---

#### 4. `sla-aware` / `sla` — レイテンシー、エラー、コストに関するSLOへの準拠

設定されたSLOポリシーをどの程度満たしているかに基づいて、各候補をスコアリングします。

| 要素               | 重み | 計算式                                             |
| ------------------ | ---- | -------------------------------------------------- |
| レイテンシースコア | 35%  | `threshold / max(value, ε)`                        |
| エラースコア       | 35%  | `threshold / max(value, ε)`                        |
| ヘルススコア       | 15%  | `1.0`（CLOSED）/ `0.5`（HALF_OPEN）/ `0.0`（OPEN） |
| コストスコア       | 10%  | `threshold / max(value, ε)` または逆正規化         |
| 安定性スコア       | 5%   | レイテンシー標準偏差の逆正規化                     |

`hardConstraints: true` の場合、候補はまず**違反スコア**（SLOをどの程度超過しているか）を基準にソートされ、次に複合スコアを基準にソートされます。それ以外の場合は、複合スコアのみが使用されます。

```ts
class SLAStrategyImpl implements RouterStrategy {
  readonly name = "sla-aware";
  readonly description =
    "レイテンシー、エラー率、コストに関するSLOを満たす可能性が最も高いプロバイダーを選択します";

  select(pool, context) {
    // ポリシー（{ targetP95Ms, maxErrorRate, maxCostPer1MTokens, hardConstraints }）に照らして各候補をスコアリングします
  }
}
```

**SLAフィールド**（コンボ設定で指定）:

```json
{
  "strategy": "auto",
  "config": {
    "routerStrategy": "sla-aware",
    "slaTargetP95Ms": 1500,
    "slaMaxErrorRate": 0.05,
    "slaMaxCostPer1MTokens": 5,
    "slaHardConstraints": true
  }
}
```

**使用する場面**: レイテンシー、エラー率、コストについて厳格な予算が設定されている本番ワークロード。

**エイリアス**: `sla-aware`、`sla`

---

#### 5. `lkgp` — 最後に正常だったプロバイダーを優先

**最後に正常だったプロバイダー**（設定されている場合）を最初に試し、その後 `rules` 戦略にフォールバックします。同じプロバイダーが会話内の後続リクエストを処理する、セッションのスティッキネスに役立ちます。

```ts
class LKGPStrategyImpl implements RouterStrategy {
  readonly name = "lkgp";
  readonly description =
    "最後に正常だったプロバイダーを最初に試し、その後rulesにフォールバックします";

  select(pool, context) {
    if (context.lkgpEnabled === false) {
      return getStrategy("rules").select(pool, context);
    }

    if (context.lastKnownGoodProvider) {
      const candidates = pool.filter(
        (c) => c.provider === context.lastKnownGoodProvider && c.circuitBreakerState !== "OPEN"
      );
      if (candidates.length > 0) {
        return { provider: candidates[0].provider /* ... */ };
      }
    }

    // rules戦略にフォールバック
    return getStrategy("rules").select(pool, context);
  }
}
```

**使用する場面**: 同じプロバイダーに後続リクエストを処理させたい複数ターンの会話（キャッシュ、コンテキストの継続性、料金の一貫性など）。

**エイリアス**: `lkgp`（エイリアスなし）

---

### カスタムルーター戦略

公開APIを介して、独自の `RouterStrategy` 実装を登録できます。

```ts
import {
  registerStrategy,
  type RouterStrategy,
} from "@omniroute/open-sse/services/autoCombo/routerStrategy";

class MyCustomStrategy implements RouterStrategy {
  readonly name = "my-custom";
  readonly description = "独自のカスタムルーティング戦略";

  select(pool, context) {
    // ここにルーティングロジックを記述します
    return {
      provider: pool[0].provider,
      model: pool[0].model,
      strategy: this.name,
      reason: "MyCustomStrategy: ...",
      candidatesConsidered: pool.length,
      finalScore: 1.0,
    };
  }
}

registerStrategy("my-custom", new MyCustomStrategy());
```

その後、次のように使用します。

```json
{
  "strategy": "auto",
  "config": {
    "routerStrategy": "my-custom"
  }
}
```

---

### ルーター戦略の選択ガイド

| ユースケース               | 戦略        | 理由                                          |
| -------------------------- | ----------- | --------------------------------------------- |
| バランス重視のワークロード | `rules`     | デフォルト — すべての要素を考慮               |
| コストの最小化             | `cost`      | 常に最も安価なものを選択                      |
| レイテンシーの最小化       | `latency`   | 最も高速で信頼性の高いプロバイダーを選択      |
| 厳格なSLO                  | `sla-aware` | p95、エラー、コストのしきい値でフィルタリング |
| 複数ターンのチャット       | `lkgp`      | セッションのスティッキネス                    |

SLA対応フィールド:

```json
{
  "strategy": "auto",
  "config": {
    "routerStrategy": "sla-aware",
    "slaTargetP95Ms": 1500,
    "slaMaxErrorRate": 0.05,
    "slaMaxCostPer1MTokens": 5,
    "slaHardConstraints": true
  }
}
```

## タスク適性

6つのタスクタイプ（`coding`、`review`、`planning`、`analysis`、`debugging`、`documentation`）にわたり、30以上のモデルを評価します。ワイルドカードパターンをサポートします（例：`*-coder` → コーディングスコアが高い）。

## Autoバリアントの概要

素の`auto`（デフォルト）に加え、`autoPrefix.ts`で宣言されている6つの`AutoVariant`値を含めると、**呼び出し可能なモデルIDは7つ**あります。

`auto`、`auto/coding`、`auto/fast`、`auto/cheap`、`auto/offline`、`auto/smart`、`auto/lkgp`

（`AutoVariant`自体は6つの値を列挙しています。7番目の選択肢は「バリアントなし」、つまり素の`auto`であり、`parseAutoPrefix()`によって`variant: undefined`として処理されます。）

## Auto-Comboにおける階層の位置付け

16要素のスコアリング関数（`open-sse/services/autoCombo/scoring.ts`）は、階層への所属を`tierPriority`（0.0476）と`tierAffinity`（0.0476）という2つのシグナルとして扱います。`DEFAULT_WEIGHTS`の完全なセットについては、上記の標準的な[スコアリング要素表](#how-it-works-persisted-auto-combos)を参照してください。パックごとのオーバーライド（ship-fast/cost-saver/quality-first/offline-friendly）は、「パックごとの重みプロファイル」表に記載されています。

階層だけでは、Tier 1が最初になることを**強制しません**。Tier 1のレイテンシーが悪い場合や、コスト対品質が最適でない場合は、Tier 2が選ばれます。階層順を強制するには、コンボ戦略`priority`を使用し、プロバイダーを階層順に並べてください。

Tier 1（サブスクリプション）を強く優先するには、`tierPriority`の重みを増やします。

```json
{
  "strategy": "auto",
  "config": { "auto": { "weights": { "tierPriority": 0.3, "costInv": 0.05 } } }
}
```

階層の定義とプロバイダーの分類については、`docs/marketing/TIERS.md`を参照してください。

## テストとカバレッジ

### 決定論的ルーティング判断マトリックス（`npm run test:combo:matrix`）

`tests/integration/combo-matrix/*.test.ts`は、モック化されたアップストリームを使用し、実際のコンボパイプラインを通じて、公開されている19の全戦略におけるルーティングの**判断**をエンドツーエンドで検証します。カバレッジには以下が含まれます。

- 19の全`ROUTING_STRATEGY_VALUES`戦略（ordered、weighted、cost、context、fusionなど）。
- `quota-share`（内部）のエンドツーエンド検証：実際の`selectQuotaShareTarget`シーム（`registerQuotaFetcher` / `setLKGP` / `__setHeadroomSaturationFetcherForTests`）を介したDRRの公平性と、飽和状態にあるターゲットの優先度低下。
- すべてのターゲット数にわたる`context-relay`のユニバーサルハンドオフのカバレッジ。

このスイートはCI（`test:integration`ジョブ）で`--test-concurrency=1`および`--test-force-exit`を指定して実行されるため、決定論的であり、実際の認証情報を必要としません。

### ゲート付きライブスモークテスト（CIでは実行されません — 実際のプロバイダーを使用）

| コマンド                               | 実行内容                                                                                               |
| :------------------------------------- | :----------------------------------------------------------------------------------------------------- |
| `npm run test:combo:live`              | `RUN_COMBO_LIVE=1`を使用したインプロセスの実ルーティング。稼働中のOmniRoute DBのスナップショットを作成 |
| `npm run test:combo:live:vps`          | 稼働中のOmniRouteサーバーに対するHTTP呼び出し（`COMBO_LIVE_BASE_URL`を設定）                           |
| `npm run test:combo:live:vps:failover` | 同上。ただし、意図的なフェイルオーバーシナリオを含む                                                   |

これらのスモークテストは、実際の通信経路（コンボ → プロバイダー → 補完）を検証します。実際の認証情報とVPSへのアクセスが必要なため、意図的にCIから除外されています。

---

## ファイル

| ファイル                                                  | 目的                                                                                                           |
| :-------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------- |
| `open-sse/services/autoCombo/scoring.ts`                  | 16要素のスコアリング関数、`DEFAULT_WEIGHTS`、プール正規化                                                      |
| `open-sse/services/autoCombo/taskFitness.ts`              | モデル × タスクの適合度ルックアップ                                                                            |
| `open-sse/services/autoCombo/engine.ts`                   | 選択ロジック、バンディット、予算上限                                                                           |
| `open-sse/services/autoCombo/selfHealing.ts`              | 除外、プローブ、インシデントモード                                                                             |
| `open-sse/services/autoCombo/modePacks.ts`                | 6つの重みプロファイル（ship-fast、cost-saver、quality-first、offline-friendly、reliability-first、chaos-mode） |
| `open-sse/services/autoCombo/autoPrefix.ts`               | `auto/`プレフィックスパーサー + 6つのバリアント                                                                |
| `open-sse/services/autoCombo/virtualFactory.ts`           | 稼働中の接続からインメモリの`AutoComboConfig`を構築                                                            |
| `open-sse/services/autoCombo/providerRegistryAccessor.ts` | プロバイダーレジストリをモックするためのテストフック                                                           |
| `src/shared/constants/routingStrategies.ts`               | `ROUTING_STRATEGY_VALUES`（19種類の戦略）                                                                      |
| `src/sse/handlers/chat.ts`                                | 統合：auto-prefixのショートサーキット                                                                          |
