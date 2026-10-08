# Adaptive Routing: Routing Events, Quality Feedback & Explainability (日本語)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/ADAPTIVE_ROUTING.md) · 🇪🇹 [am](../../../am/docs/architecture/ADAPTIVE_ROUTING.md) · 🇸🇦 [ar](../../../ar/docs/architecture/ADAPTIVE_ROUTING.md) · 🇦🇿 [az](../../../az/docs/architecture/ADAPTIVE_ROUTING.md) · 🇧🇬 [bg](../../../bg/docs/architecture/ADAPTIVE_ROUTING.md) · 🇧🇩 [bn](../../../bn/docs/architecture/ADAPTIVE_ROUTING.md) · 🇧🇦 [bs](../../../bs/docs/architecture/ADAPTIVE_ROUTING.md) · 🇨🇿 [cs](../../../cs/docs/architecture/ADAPTIVE_ROUTING.md) · 🇩🇰 [da](../../../da/docs/architecture/ADAPTIVE_ROUTING.md) · 🇩🇪 [de](../../../de/docs/architecture/ADAPTIVE_ROUTING.md) · 🇬🇷 [el](../../../el/docs/architecture/ADAPTIVE_ROUTING.md) · 🇪🇸 [es](../../../es/docs/architecture/ADAPTIVE_ROUTING.md) · 🇪🇪 [et](../../../et/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇷 [fa](../../../fa/docs/architecture/ADAPTIVE_ROUTING.md) · 🇫🇮 [fi](../../../fi/docs/architecture/ADAPTIVE_ROUTING.md) · 🇫🇷 [fr](../../../fr/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇪 [ga](../../../ga/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇳 [gu](../../../gu/docs/architecture/ADAPTIVE_ROUTING.md) · 🇳🇬 [ha](../../../ha/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇱 [he](../../../he/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇳 [hi](../../../hi/docs/architecture/ADAPTIVE_ROUTING.md) · 🇭🇷 [hr](../../../hr/docs/architecture/ADAPTIVE_ROUTING.md) · 🇭🇺 [hu](../../../hu/docs/architecture/ADAPTIVE_ROUTING.md) · 🇦🇲 [hy](../../../hy/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇩 [id](../../../id/docs/architecture/ADAPTIVE_ROUTING.md) · 🇳🇬 [ig](../../../ig/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇹 [it](../../../it/docs/architecture/ADAPTIVE_ROUTING.md) · 🇬🇪 [ka](../../../ka/docs/architecture/ADAPTIVE_ROUTING.md) · 🇰🇭 [km](../../../km/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇳 [kn](../../../kn/docs/architecture/ADAPTIVE_ROUTING.md) · 🇰🇷 [ko](../../../ko/docs/architecture/ADAPTIVE_ROUTING.md) · 🇱🇹 [lt](../../../lt/docs/architecture/ADAPTIVE_ROUTING.md) · 🇱🇻 [lv](../../../lv/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇳 [ml](../../../ml/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇳 [mr](../../../mr/docs/architecture/ADAPTIVE_ROUTING.md) · 🇲🇾 [ms](../../../ms/docs/architecture/ADAPTIVE_ROUTING.md) · 🇲🇹 [mt](../../../mt/docs/architecture/ADAPTIVE_ROUTING.md) · 🇲🇲 [my](../../../my/docs/architecture/ADAPTIVE_ROUTING.md) · 🇳🇵 [ne](../../../ne/docs/architecture/ADAPTIVE_ROUTING.md) · 🇳🇱 [nl](../../../nl/docs/architecture/ADAPTIVE_ROUTING.md) · 🇳🇴 [no](../../../no/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇳 [or](../../../or/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇳 [pa](../../../pa/docs/architecture/ADAPTIVE_ROUTING.md) · 🇵🇭 [phi](../../../phi/docs/architecture/ADAPTIVE_ROUTING.md) · 🇵🇱 [pl](../../../pl/docs/architecture/ADAPTIVE_ROUTING.md) · 🇵🇹 [pt](../../../pt/docs/architecture/ADAPTIVE_ROUTING.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/ADAPTIVE_ROUTING.md) · 🇷🇴 [ro](../../../ro/docs/architecture/ADAPTIVE_ROUTING.md) · 🇷🇺 [ru](../../../ru/docs/architecture/ADAPTIVE_ROUTING.md) · 🇱🇰 [si](../../../si/docs/architecture/ADAPTIVE_ROUTING.md) · 🇸🇰 [sk](../../../sk/docs/architecture/ADAPTIVE_ROUTING.md) · 🇸🇮 [sl](../../../sl/docs/architecture/ADAPTIVE_ROUTING.md) · 🇷🇸 [sr](../../../sr/docs/architecture/ADAPTIVE_ROUTING.md) · 🇸🇪 [sv](../../../sv/docs/architecture/ADAPTIVE_ROUTING.md) · 🇰🇪 [sw](../../../sw/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇳 [ta](../../../ta/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇳 [te](../../../te/docs/architecture/ADAPTIVE_ROUTING.md) · 🇹🇭 [th](../../../th/docs/architecture/ADAPTIVE_ROUTING.md) · 🇹🇷 [tr](../../../tr/docs/architecture/ADAPTIVE_ROUTING.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/ADAPTIVE_ROUTING.md) · 🇵🇰 [ur](../../../ur/docs/architecture/ADAPTIVE_ROUTING.md) · 🇺🇿 [uz](../../../uz/docs/architecture/ADAPTIVE_ROUTING.md) · 🇻🇳 [vi](../../../vi/docs/architecture/ADAPTIVE_ROUTING.md) · 🇳🇬 [yo](../../../yo/docs/architecture/ADAPTIVE_ROUTING.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/ADAPTIVE_ROUTING.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/ADAPTIVE_ROUTING.md)

---

本ドキュメントでは、OmniRoute に追加されたフィードバック駆動型適応ルーティングの基盤について説明します。これは意図的に小規模に設計されています。型付きルーティング結果チャネル、既存の auto-combo スコアラーに入力されるオンライン品質シグナル、オプションの OpenTelemetry エクスポーター、および説明可能性エンドポイントを導入します。既存のレジリエンススタック（サーキットブレーカー、接続クールダウン、モデルロックアウト、ヘルスマトリクス、オートパイロット）を置き換えるものでは**なく**、それらを補完するものです。

## 1. アーキテクチャ上のコンテキスト

OmniRoute は、**リクエストのホットパス**と**制御／インテリジェンスプレーン**を備えたデータプレーンです。ホットパスは、高速、メモリ効率的、非同期、レジリエント、かつ予測可能でなければなりません。評価、品質スコアリング、実験、履歴分析は制御プレーンに属します。

```
AI エージェント / IDE
      │
      ▼
┌─────────────────────┐
│    OmniRoute        │   データプレーン（高速、同期、インメモリ）
│  ルーティング / フェイルオーバー │
│  ヘルス / ガードレール │
│  キャッシュ / ストリーミング │
└──────────┬──────────┘
           │ RoutingEvent（送信後は待機しない、約0.2µs）
           ▼
┌─────────────────────┐
│  フィードバックシンク │   制御プレーン（非同期、ベストエフォート）
│  品質トラッカー      │
│  OTel エクスポーター │
│  説明ストア          │
└──────────┬──────────┘
           ▼  品質スコア
      auto-combo スコアラー
```

### 既存の機能（監査済み、重複実装なし）

| 概念                                     | 既存の実装                                                                                                |
| ---------------------------------------- | --------------------------------------------------------------------------------------------------------- |
| 可用性（トラフィックを送信できるか？）   | サーキットブレーカー（CLOSED/DEGRADED/OPEN/HALF_OPEN、DB に永続化）、接続クールダウン、モデルロックアウト |
| ヘルスレポート                           | `providerHealthMatrix.ts`、`providerHealthAutopilot.ts`                                                   |
| シャドウトラフィック                     | `open-sse/services/combo/shadowRouting.ts`                                                                |
| ガードレール                             | `src/lib/guardrails/`（前処理／後処理フック）                                                             |
| 完全一致キャッシュ                       | `src/lib/semanticCache.ts`（シグネチャベース）                                                            |
| エバリュエーター／評価駆動型ルーティング | `src/lib/evals/`、`open-sse/services/evalRouting.ts`                                                      |
| Combo の意思決定に関する説明可能性       | `open-sse/services/combo/decisionTrace.ts`                                                                |
| ダッシュボードのリアルタイムイベント     | `src/lib/events/eventBus.ts`（UI 通知チャネル、`unknown` ペイロード、100 件の履歴）                       |

ルーティングイベントレイヤーは `eventBus` の再実装では**ありません**。このバスは、ダッシュボードのリアルタイム通知チャネル（型付きの_イベント名_、不透明なペイロード、UI コンシューマー）です。`RoutingEvent` は、制御プレーンのフィードバックシンク（品質トラッカー、OTel エクスポーター、説明ストア）によって利用される、型付きの_結果_構造体（レイテンシ／トークン／コスト／結果／終了理由）です。

### 不足していた機能（ここで追加）

1. **型付きルーティング結果イベント＋シンク抽象化**（`RoutingEvent` /
   `RoutingEventSink`）。`decisionTrace` は Combo スコープかつインメモリ限定であり、
   `comboMetrics` は累積カウンター、`call_logs` は未加工の非同期永続化です。
   いずれも、品質トラッカー、OTel エクスポーター、または Future-AGI 形式のエバリュエーターが
   サブスクライブできる、型付きのシンクベース結果チャネルではありません。
2. 出力品質のための**オンライン品質シグナル**（EWMA）。以前のスコアラーは、
   静的なタスク適合度とオプトインの評価合格率のみを通じて「品質」を間接的に評価していました。
3. GenAI セマンティック規約を使用した、**オプションかつ依存関係不要の OTel エクスポーター**。
4. 実際のルーティング判断と品質状態を返す**説明可能性エンドポイント**。

## 2. ルーティングイベント（フィードバックの基盤）

ファイル: `open-sse/services/routing/events.ts`、`.../index.ts`

`RoutingEvent` はルーティングメタデータのみを保持します。

```ts
interface RoutingEvent {
  requestId: string;
  provider: string;
  model: string;
  strategy: string; // "auto" | "priority" | "direct" | ...
  latencyMs: number;
  ttftMs: number | null;
  inputTokens: number | null;
  outputTokens: number | null;
  cost: number | null;
  retries: number;
  fallbackUsed: boolean;
  outcome: RoutingOutcome; // 許可リストで定義された共用体型
  status: number | null;
  finishReason: string | null;
  connectionId: string | null;
  ts: number;
}
```

`RoutingEventSink` は、TypeScript における `Send+Sync` スタイルのトレイトです。

```ts
interface RoutingEventSink {
  readonly name: string;
  record(event: RoutingEvent): void; // O(1) 必須、同期 I/O なし
}
```

ホットパスでは、完了したリクエストごとに `emitRoutingEvent(event)` を 1 回呼び出します
（ストリーミング完了コールバック、非ストリーミングの成功パス、および
`handleChatCore` 内の不正な 200 レスポンスに対する失敗パス）。ディスパッチは、
登録済みの sink への同期ファンアウトですが、各 sink はインメモリ状態への
エンキューまたは更新のみを行います。**ホットパスでは同期データベース書き込みも、
ネットワーク I/O も行いません。**

デフォルトの sink:

- `MemoryRoutingEventStore` — explain エンドポイント用の、上限付き（500）の
  リングバッファ。新しいものが先頭です。
- `QualityTracker` コンシューマー — EWMA 品質推定値を更新します。
- `OtlpHttpsEventSink` — オプション。`OMNIROUTE_OTEL_ENDPOINT`
  （または `OTEL_EXPORTER_OTLP_ENDPOINT`）が設定されている場合のみ有効になります。

### 測定されたオーバーヘッド（公正な比較）

このワークステーション上での `npm run bench:routing-events`（100k 回反復）。
サブマイクロ秒の処理は、処理ごとのパーセンタイルが `performance.now()` の
タイマー分解能を下回るため、集計された µs/op として測定しています。

| シナリオ                                  | µs/op  | ops/s  |
| ----------------------------------------- | ------ | ------ |
| ベースライン（スコアリングのみ）          | ~0.045 | ~22 M  |
| ベースライン + RoutingEvent（2 sinks）    | ~0.168 | ~5.9 M |
| ベースライン + イベント + OTel エンキュー | ~0.163 | ~6.1 M |
| 並行処理（8 個の交互バースト）            | ~0.18  | —      |

ベースラインのスコアリングに対するイベントディスパッチの差分は、
リクエストあたり約 0.12 µs です。OTel sink はエンキュー
（O(1) のバッファ push）のみを行うため、測定可能な追加コストはありません。
これらの数値はマシン固有の相対値であり、本番環境での性能を保証するものではありません。
v1 の「約 0.2 µs」という数値は集計された推定値でしたが、この測定手法では
スコアリングのベースラインとイベントディスパッチのコストを分離しています。

## 3. 品質シグナル（フィードバック駆動のプロバイダー状態）

ファイル: `open-sse/services/routing/quality.ts`

v2 では、**運用品質**と**意味品質**を分離しています。

- **運用品質** — ルーティングのホットパスから導出されます（HTTP 4xx/5xx、
  接続障害、429、不正なレスポンス、ストリーム中断、`finish_reason=length`、
  出力ゼロの成功、レイテンシ/TTFT の EWMA）。200 は意味品質としては
  扱われ**ません**。
- **意味品質** — 生成された出力の実際の価値です。評価器によって
  `setSemanticQuality()` を介してのみ生成されます。評価器から提供されるまでは
  `null` であり、運用品質スコアに混入することはありません。

(provider, model) ごとの状態（EWMA + 上限付きカウンター）:

- `successEwma` — 結果が成功したかどうかの EWMA（α=0.2）。
- `latencyEwma` / `ttftEwma` — レイテンシの EWMA（α=0.1）。
- `samples`、`anomalies`、`rateLimited`、`semantic`、`semanticConfidence`。
- `recencyMs` — モデルが最後に観測されてからの経過時間。

### 信頼度 / サンプル数の考慮

`confidence = clamp01(samples / 50)` とし、スコアラーに返されるスコアは
中立的な中間値に向けてブレンドされます。

```
score = 0.5 + confidence * (operational - 0.5)
```

結果（テストで検証済み）:

- コールドなプロバイダー（サンプル数 0）のスコアは **0.5** です。不当に
  ペナルティを受けることはありませんが、堅実な観測結果が数千件ある
  プロバイダーを上回ることはできません。
- たまたま 7 回成功したプロバイダーは 0.5 に近づくよう補正されます
  （楽観的な初期化によって優位になることはありません）。
- サンプル数が 50 以上のプロバイダーは、実際の運用品質スコアに収束します。
- 劣化と回復は段階的に進み（EWMA）、1 回だけの失敗によって正常な
  プロバイダーが台無しになることはありません。

`ProviderQuality` は `{ operational, semantic, confidence, samples, anomalies,
rateLimited, successEwma, latencyEwmaMs, ttftEwmaMs, recencyMs }` を公開します。

これは、`quality` スコアリング係数として auto-combo スコアラーに入力されます。

- `open-sse/services/autoCombo/scoring.ts` 内の
  `ScoringFactors.quality` / `ScoringWeights.quality`。
- `DEFAULT_WEIGHTS`: `health` は 0.1905 → 0.1605、`quality` は 0.03。
  合計は 1.0 のままです。
- `buildAutoCandidates` はトラッカーから `candidate.quality` を設定します。
  データのない候補は、デフォルトで中立値 **0.5** になります
  （コールドな候補は優遇もペナルティ付与もされません）。

閉ループ:

```
RoutingEvent → QualityTracker → getQualityScore → auto-combo の quality 係数
      ↑                                                    │
      └────── リクエスト結果（handleChatCore）←───────────────┘
```

### ハード除外とソフトペナルティ

品質シグナルは、**ソフトな適応型プリファレンス**としてのみ機能します。
ハード除外は、既存のレジリエンススタックが引き続き担います。サーキットブレーカーの
OPEN、クォータ枯渇、認証失敗、モデルのロックアウトはいずれも品質スコアの影響を
受けません。品質スコアが一時的に低下したプロバイダーは優先度が下がるだけで、
ハード無効化されることはありません。

## 3b. 正規ストリームタイミング（TTFT / ITL）

ファイル: `open-sse/utils/streamTiming.ts`

`createStreamTiming()` はストリーミング経路における唯一の計測ポイントであり、
`createSSEStream`（open-sse/utils/stream.ts）に組み込まれています。

- `markByte()` — 最初のアップストリームチャンクを受信した時点。
- `markForward()` — 最初のチャンクをクライアントへ転送した時点（TTFT に使用）。
- `markInterrupted()` — 正常終了前にストリームがタイムアウト、中断、またはエラーになった時点。
- `ttft()` = 最初に転送された SSE チャンクまでのレイテンシ。**これはトークンレベルの TTFT ではありません** —
  1 つの SSE チャンクには、0 個、1 個、または複数のトークンが含まれる可能性があります。この点は明確に文書化されています。
- `avgItlMs()` = チャンク間隔の平均（ITL の代替指標となるチャンクレイテンシ）。

TTFT/ITL/中断状態は `RoutingEvent`（`ttftMs`、`itlMs`）に渡され、
OTel シンクによって GenAI/OmniRoute スパン属性としてエクスポートされます。

## 4. OpenTelemetry / GenAI オブザーバビリティ

ファイル: `open-sse/services/routing/otel.ts`

- 依存関係のない OTLP/HTTP JSON エクスポーター（グローバルな `fetch` を使用し、
  `@opentelemetry/*` SDK は使用しません）。
- スパンは GenAI セマンティック規約（`gen_ai.provider.name`、
  `gen_ai.request.model`、`gen_ai.usage.input_tokens/output_tokens`、
  `gen_ai.completion.finish_reason`、`gen_ai.system`）に加え、OmniRoute のルーティング属性
  （結果、ステータス、TTFT、再試行、フォールバック）に準拠します。
- `record()` は境界付きバッファへのエンキューのみを行います（O(1)）。バックグラウンドタイマーが
  `POST {endpoint}/v1/traces` により非同期でフラッシュします。過負荷時には
  最も古いイベントが破棄され（`dropped` カウンター）、データプレーンにバックプレッシャーを
  かけることはありません。
- **設定されていない限り無効です。** `OMNIROUTE_OTEL_ENDPOINT`（または
  `OTEL_EXPORTER_OTLP_ENDPOINT`）を設定する必要があります。設定されていない場合、シンクは
  登録されず、OTel コードは一切実行されません。

## 5. 説明可能性

- `GET /v1/explain/routing` は、直近の `RoutingEvent`（実際の判断、新しい順）と、
  プロバイダー／モデルごとの品質スナップショットを返します。
- 認証は `/v1/combos` と同様です（Bearer API キーまたはダッシュボードセッション。
  `REQUIRE_API_KEY=false` の単一ユーザーローカルデプロイでは匿名アクセスが可能）。
- コンボ単位の呼び出しごとのトレースは、既存の `decisionTrace.ts`
  （ヘッダー `X-OmniRoute-Combo-Trace`）を介して引き続き利用できます。
- 安全性: イベントに含まれるのはルーティングメタデータのみであり、プロンプト、本文、認証情報は
  一切含まれません。

## 6. 評価プレーンの統合（Future AGI への対応準備）

OmniRoute は Future AGI（または任意の評価器）を**潜在的な
インテリジェンス／評価バックエンドとして扱い、依存関係とはしません**。連携ポイントは次のとおりです。

- `RoutingEventSink` はイベントを評価器へ非同期で転送できます。
- `MemoryRoutingEventStore` と品質スナップショットは、評価器に生の
  判断ストリームを提供します。
- 将来の `Evaluator`（決定論的評価器、ローカルジャッジ、HTTP、WASM）は、
  イベント／トレースを受け取り、同じ `getQualityScore`／品質係数の経路に反映される
  `QualityScore` を返します。
- 既存の評価駆動ルーティング（`open-sse/services/evalRouting.ts`）は、有効化されている場合、
  `eval_runs` の合格率に基づいてコンボターゲットをすでに並べ替えています。

リクエスト経路上で評価が同期実行されることはなく、評価器が存在しなくても
ゲートウェイは完全に動作します。

## 7. 最終アーキテクチャレビュー

1. **同期ホットパスに残るものは何ですか？** ルーティング／スコアリング、ガードレールの
   事前チェック、キャッシュ検索、およびインメモリシンクへの 1 回の `emitRoutingEvent`
   ファンアウト（ベースラインスコアリングに対して約 0.12 µs）。
2. **非同期処理へ移されたものは何ですか？** OTel エクスポート（タイマー + fetch）、
   `call_logs`／使用量の永続化、セマンティックキャッシュへの書き込み。品質処理はインメモリかつ
   O(1) のため、非同期化は不要です。
3. **ルーティング結果はどのようにフィードバックになりますか？** `handleChatCore` が
   `RoutingEvent` を発行 → `QualityTracker` が EWMA 状態を更新 → `getQualityScore` が
   自動コンボの `quality` 係数へ反映します。
4. **品質は将来のルーティングにどのような影響を与えますか？** 品質スコアが低いと、
   `scoreAutoTargets` における該当プロバイダー／モデルの重み付きスコアが低下するため、
   劣化したモデルの優先度は徐々に下がり、EWMA の改善に伴って回復します。
5. **Future AGI は依存関係になることなく、どのように統合できますか？**
   `RoutingEventSink` インターフェース／将来の `Evaluator` アダプターを介して統合します。
   ハードコードされた依存関係はありません。
6. **評価器が利用できない場合はどうなりますか？** ルーティングには影響しません。
   観測されたシグナルがないモデルでは、品質は中立値（1.0）にフォールバックします。
7. **テレメトリが利用できない場合はどうなりますか？** OTel シンクが登録されないだけであり、
   ルーティングレイヤーの残りの部分は変更なく動作します。
8. **過負荷時にはどうなりますか？** OTel バッファは最も古いイベントを破棄します。
   品質データとリングバッファは構造上有界であり、バックプレッシャーは発生しません。
9. **劣化後、プロバイダーの状態はどのように回復しますか？** 成功が蓄積されるにつれて
   EWMA は再収束します。ウォームアップによりコールドモデルは中立に保たれます。
   サーキットブレーカーは HALF_OPEN プローブによって独立して回復します。
10. **提案された機能のうち、意図的に実装しなかったものと、その理由は何ですか？**
    - シャドウトラフィック／実験 — すでに実装済み
      （`combo/shadowRouting.ts`）のため、再実装していません。
    - ガードレール — すでに実装済み（`src/lib/guardrails/`）のため、重複実装していません。
    - セマンティックキャッシュ — すでに実装済み（`src/lib/semanticCache.ts`）のため、
      重複実装していません。
    - 完全な実験管理プラットフォーム、データセットツール、プロンプト最適化
      プラットフォーム、ベクトル DB、または必須の外部 OTel インフラストラクチャ —
      軽量なデータプレーンのスコープ外です。
    - Rust の `RoutingEvent` 構造体 — データプレーンは TypeScript であり、TS の型が
      それに対応する同等の実装です。

## 8. 設定リファレンス

| 変数                          | デフォルト  | 効果                                                                                        |
| ----------------------------- | ----------- | ------------------------------------------------------------------------------------------- |
| `OMNIROUTE_OTEL_ENDPOINT`     | 未設定      | 設定すると、OTLP/HTTP トレースエクスポーターを有効にします（例: `http://collector:4318`）。 |
| `OTEL_EXPORTER_OTLP_ENDPOINT` | 未設定      | OTLP エンドポイントのフォールバックエイリアスです。                                         |
| `OTEL_SERVICE_NAME`           | `omniroute` | `service.name` リソース属性です。                                                           |

## 9. テスト

- `tests/unit/routing-events.test.ts` — イベントの正規化、ステータスの
  分類、サイズ制限付きリングバッファ、シンクへのファンアウトと分離。
- `tests/unit/routing-quality.test.ts` — EWMA のウォームアップ、失敗/成功からの回復、
  異常ペナルティ、429 の一時的エラー処理、スナップショット、リセット。
- `tests/unit/routing-scoring-quality.test.ts` — 重みの整合性、ニュートラルな
  デフォルト、品質係数によるランキング。
- `tests/unit/routing-otel.test.ts` — 有効化のゲーティング、GenAI スパンのペイロード、非同期
  フラッシュ、過負荷時のドロップ。
- `tests/unit/routing-events-concurrency.test.ts` — 数千件のイベント、リング
  バッファのサイズ制限、例外をスローするシンクの分離、交錯する非同期バースト、
  挿入中のリセット。
- `tests/unit/routing-adaptive-e2e.test.ts` — 実際の `scoreAutoTargets` スコアラーを介した
  決定論的なエンドツーエンドループ: 正常 → 劣化 → 回復 → 一時的不調。さらに、
  コールドスタートおよび運良く成功したコールドプロバイダーのシナリオ。
- `tests/unit/stream-timing.test.ts` — TTFT（最初に転送されたチャンク）、ITL、
  最初のバイトと最初の転送の比較、中断、不正形式/空チャンクに対する安全性。

## 10. 既存の問題のステータス（フェーズ 18）

| 問題                                                | ステータス               | 注記                                                                                                                                                                                                                                                                       |
| --------------------------------------------------- | ------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `omniglyph` のエクスポート不一致                    | **修正済み（環境要因）** | `node_modules` が `package-lock.json` と同期していませんでした（インストール済みは 1.3.1、ロック済みは 1.4.0）。`npm install omniglyph@1.4.0` を実行してロック済みバージョンを復元した結果、型エラーは 0 件になりました。マニフェストは変更していません。                  |
| 古い `getKnownContextOverflow` テスト               | **既知 — 未修正**        | `combo-context-overflow-compression-probe.test.ts` は、`open-sse/services/combo.ts` に存在しなくなった関数をインポートしています（コメント内でのみ参照されています）。修正には、その関数の再実装またはテストの書き直しが必要であり、無関係なアーキテクチャ変更になります。 |
| `combo-runtime-unit-concurrency.test.ts` の DB 分離 | **既知 — 未修正**        | 直接実行すると、テストハーネスの SQLite 分離アサーションが失敗します。ベースブランチでも同様に失敗します。                                                                                                                                                                 |
| i18n の `llm.txt` の乖離                            | **既知 — 未修正**        | `docs/i18n/*/llm.txt` はルートのファイルと異なっています。これは既存の問題であり、ドキュメント同期用の pre-commit ゲートをブロックします。                                                                                                                                 |

環境上の問題とコード上の問題は明確に区別されており、変更されたテストフィルターによって
無関係な失敗が隠されることはありません。
