# Adaptive Routing: Routing Events, Quality Feedback & Explainability (中文 (繁體))

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/ADAPTIVE_ROUTING.md) · 🇪🇹 [am](../../../am/docs/architecture/ADAPTIVE_ROUTING.md) · 🇸🇦 [ar](../../../ar/docs/architecture/ADAPTIVE_ROUTING.md) · 🇦🇿 [az](../../../az/docs/architecture/ADAPTIVE_ROUTING.md) · 🇧🇬 [bg](../../../bg/docs/architecture/ADAPTIVE_ROUTING.md) · 🇧🇩 [bn](../../../bn/docs/architecture/ADAPTIVE_ROUTING.md) · 🇧🇦 [bs](../../../bs/docs/architecture/ADAPTIVE_ROUTING.md) · 🇨🇿 [cs](../../../cs/docs/architecture/ADAPTIVE_ROUTING.md) · 🇩🇰 [da](../../../da/docs/architecture/ADAPTIVE_ROUTING.md) · 🇩🇪 [de](../../../de/docs/architecture/ADAPTIVE_ROUTING.md) · 🇬🇷 [el](../../../el/docs/architecture/ADAPTIVE_ROUTING.md) · 🇪🇸 [es](../../../es/docs/architecture/ADAPTIVE_ROUTING.md) · 🇪🇪 [et](../../../et/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇷 [fa](../../../fa/docs/architecture/ADAPTIVE_ROUTING.md) · 🇫🇮 [fi](../../../fi/docs/architecture/ADAPTIVE_ROUTING.md) · 🇫🇷 [fr](../../../fr/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇪 [ga](../../../ga/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇳 [gu](../../../gu/docs/architecture/ADAPTIVE_ROUTING.md) · 🇳🇬 [ha](../../../ha/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇱 [he](../../../he/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇳 [hi](../../../hi/docs/architecture/ADAPTIVE_ROUTING.md) · 🇭🇷 [hr](../../../hr/docs/architecture/ADAPTIVE_ROUTING.md) · 🇭🇺 [hu](../../../hu/docs/architecture/ADAPTIVE_ROUTING.md) · 🇦🇲 [hy](../../../hy/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇩 [id](../../../id/docs/architecture/ADAPTIVE_ROUTING.md) · 🇳🇬 [ig](../../../ig/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇹 [it](../../../it/docs/architecture/ADAPTIVE_ROUTING.md) · 🇯🇵 [ja](../../../ja/docs/architecture/ADAPTIVE_ROUTING.md) · 🇬🇪 [ka](../../../ka/docs/architecture/ADAPTIVE_ROUTING.md) · 🇰🇭 [km](../../../km/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇳 [kn](../../../kn/docs/architecture/ADAPTIVE_ROUTING.md) · 🇰🇷 [ko](../../../ko/docs/architecture/ADAPTIVE_ROUTING.md) · 🇱🇹 [lt](../../../lt/docs/architecture/ADAPTIVE_ROUTING.md) · 🇱🇻 [lv](../../../lv/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇳 [ml](../../../ml/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇳 [mr](../../../mr/docs/architecture/ADAPTIVE_ROUTING.md) · 🇲🇾 [ms](../../../ms/docs/architecture/ADAPTIVE_ROUTING.md) · 🇲🇹 [mt](../../../mt/docs/architecture/ADAPTIVE_ROUTING.md) · 🇲🇲 [my](../../../my/docs/architecture/ADAPTIVE_ROUTING.md) · 🇳🇵 [ne](../../../ne/docs/architecture/ADAPTIVE_ROUTING.md) · 🇳🇱 [nl](../../../nl/docs/architecture/ADAPTIVE_ROUTING.md) · 🇳🇴 [no](../../../no/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇳 [or](../../../or/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇳 [pa](../../../pa/docs/architecture/ADAPTIVE_ROUTING.md) · 🇵🇭 [phi](../../../phi/docs/architecture/ADAPTIVE_ROUTING.md) · 🇵🇱 [pl](../../../pl/docs/architecture/ADAPTIVE_ROUTING.md) · 🇵🇹 [pt](../../../pt/docs/architecture/ADAPTIVE_ROUTING.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/ADAPTIVE_ROUTING.md) · 🇷🇴 [ro](../../../ro/docs/architecture/ADAPTIVE_ROUTING.md) · 🇷🇺 [ru](../../../ru/docs/architecture/ADAPTIVE_ROUTING.md) · 🇱🇰 [si](../../../si/docs/architecture/ADAPTIVE_ROUTING.md) · 🇸🇰 [sk](../../../sk/docs/architecture/ADAPTIVE_ROUTING.md) · 🇸🇮 [sl](../../../sl/docs/architecture/ADAPTIVE_ROUTING.md) · 🇷🇸 [sr](../../../sr/docs/architecture/ADAPTIVE_ROUTING.md) · 🇸🇪 [sv](../../../sv/docs/architecture/ADAPTIVE_ROUTING.md) · 🇰🇪 [sw](../../../sw/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇳 [ta](../../../ta/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇳 [te](../../../te/docs/architecture/ADAPTIVE_ROUTING.md) · 🇹🇭 [th](../../../th/docs/architecture/ADAPTIVE_ROUTING.md) · 🇹🇷 [tr](../../../tr/docs/architecture/ADAPTIVE_ROUTING.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/ADAPTIVE_ROUTING.md) · 🇵🇰 [ur](../../../ur/docs/architecture/ADAPTIVE_ROUTING.md) · 🇺🇿 [uz](../../../uz/docs/architecture/ADAPTIVE_ROUTING.md) · 🇻🇳 [vi](../../../vi/docs/architecture/ADAPTIVE_ROUTING.md) · 🇳🇬 [yo](../../../yo/docs/architecture/ADAPTIVE_ROUTING.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/ADAPTIVE_ROUTING.md)

---

本文說明新增至 OmniRoute、由回饋驅動的自適應路由基礎架構。
其設計刻意保持精簡：引入類型化的路由結果通道、將線上品質訊號饋入既有的
auto-combo 評分器、可選用的 OpenTelemetry 匯出器，以及可解釋性端點。它**不會**
取代既有的韌性堆疊（斷路器、連線冷卻、模型鎖定、健康狀態矩陣、自動駕駛）——
而是對其加以補充。

## 1. 架構背景

OmniRoute 是一個資料平面，包含**請求熱路徑**與**控制／智慧
平面**。熱路徑必須維持快速、記憶體高效、非同步、具韌性且
可預測。評估、品質評分、實驗及歷史分析則屬於控制平面。

```
AI 代理程式／IDE
      │
      ▼
┌─────────────────────┐
│    OmniRoute        │   資料平面（快速、同步、記憶體內）
│  路由／容錯移轉     │
│  健康狀態／防護機制 │
│  快取／串流         │
└──────────┬──────────┘
           │ RoutingEvent（發送後不等待，約 0.2µs）
           ▼
┌─────────────────────┐
│  回饋接收端         │   控制平面（非同步、盡力而為）
│  品質追蹤器         │
│  OTel 匯出器        │
│  解釋資料存放區     │
└──────────┬──────────┘
           ▼  品質分數
      auto-combo 評分器
```

### 原先已有的功能（已稽核，未重複實作）

| 概念                     | 既有實作                                                                     |
| ------------------------ | ---------------------------------------------------------------------------- |
| 可用性（能否傳送流量？） | 斷路器（CLOSED/DEGRADED/OPEN/HALF_OPEN，持久化至資料庫）、連線冷卻、模型鎖定 |
| 健康狀態報告             | `providerHealthMatrix.ts`、`providerHealthAutopilot.ts`                      |
| 影子流量                 | `open-sse/services/combo/shadowRouting.ts`                                   |
| 防護機制                 | `src/lib/guardrails/`（前置／後置掛鉤）                                      |
| 精確快取                 | `src/lib/semanticCache.ts`（以簽章為基礎）                                   |
| 評估器／評估驅動路由     | `src/lib/evals/`、`open-sse/services/evalRouting.ts`                         |
| 組合決策可解釋性         | `open-sse/services/combo/decisionTrace.ts`                                   |
| 儀表板即時事件           | `src/lib/events/eventBus.ts`（UI 通知通道、`unknown` 酬載、100 筆歷史記錄）  |

路由事件層**並非**重新實作 `eventBus`：該匯流排是
儀表板的即時通知通道（具類型的_事件名稱_、不透明
酬載、UI 消費者）。`RoutingEvent` 是類型化的_結果_結構
（延遲／權杖／成本／結果／完成原因），供控制平面的
回饋接收端（品質追蹤器、OTel 匯出器、解釋資料存放區）使用。

### 原先缺少的功能（於此新增）

1. **類型化路由結果事件＋接收端抽象層**（`RoutingEvent` /
   `RoutingEventSink`）。`decisionTrace` 僅限組合範圍且只存在於記憶體中；
   `comboMetrics` 是累積計數器；`call_logs` 則是原始的非同步持久化資料。
   這些都不是類型化、以接收端為基礎的結果通道，無法讓品質追蹤器、OTel
   匯出器或 Future-AGI 類型的評估器訂閱。
2. 用於輸出品質的**線上品質訊號**（EWMA）——評分器先前僅透過
   靜態任務適配度與選擇性啟用的評估通過率，間接表示「品質」。
3. 使用 GenAI 語意慣例的**可選用、零相依性 OTel 匯出器**。
4. 傳回實際路由決策與品質狀態的**可解釋性端點**。

## 2. 路由事件（回饋基礎）

檔案：`open-sse/services/routing/events.ts`、`.../index.ts`

`RoutingEvent` 僅攜帶路由中繼資料：

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
  outcome: RoutingOutcome; // 白名單聯集類型
  status: number | null;
  finishReason: string | null;
  connectionId: string | null;
  ts: number;
}
```

`RoutingEventSink` 是 TypeScript 中類似 `Send+Sync` 的 trait：

```ts
interface RoutingEventSink {
  readonly name: string;
  record(event: RoutingEvent): void; // 必須為 O(1)，不得有同步 I/O
}
```

熱路徑會針對每個已完成的請求呼叫一次 `emitRoutingEvent(event)`
（串流完成回呼、非串流成功路徑，以及 `handleChatCore` 中格式錯誤的 200
失敗路徑）。分派採同步扇出至已註冊的接收器，但每個接收器只會將事件排入佇列或更新記憶體內狀態。**熱路徑中不得同步寫入資料庫，也不得執行網路 I/O。**

預設接收器：

- `MemoryRoutingEventStore` — 有界（500）環形緩衝區，最新項目優先，用於
  說明端點。
- `QualityTracker` 消費者 — 更新 EWMA 品質估計值。
- `OtlpHttpsEventSink` — 選用，僅在設定 `OMNIROUTE_OTEL_ENDPOINT`
  （或 `OTEL_EXPORTER_OTLP_ENDPOINT`）時啟用。

### 實測額外負荷（如實比較）

在此工作站上執行 `npm run bench:routing-events`（10 萬次迭代；由於單次操作的百分位數低於
`performance.now()` 的計時器解析度，因此次微秒操作以彙總的 µs/op
計量）：

| 情境                              | µs/op  | ops/s  |
| --------------------------------- | ------ | ------ |
| 基準（僅評分）                    | ~0.045 | ~22 M  |
| 基準 + RoutingEvent（2 個接收器） | ~0.168 | ~5.9 M |
| 基準 + 事件 + OTel 排入佇列       | ~0.163 | ~6.1 M |
| 並行（8 個交錯突發批次）          | ~0.18  | —      |

相較於基準評分，事件分派增加約 0.12 µs/請求；OTel 接收器
只會排入佇列（O(1) 緩衝區推入），未增加任何可測量的負荷。這些數字
僅適用於特定機器且為相對值，並非正式環境保證。v1 的「約 0.2 µs」
數字是彙總估計值；此方法將評分基準與事件分派成本分開計算。

## 3. 品質訊號（由回饋驅動的提供者狀態）

檔案：`open-sse/services/routing/quality.ts`

v2 將**作業**品質與**語意**品質分開：

- **作業** — 衍生自路由熱路徑（HTTP 4xx/5xx、連線
  失敗、429、格式錯誤的回應、串流中斷、`finish_reason=length`、
  零輸出成功，以及延遲/TTFT EWMA）。200 不會被視為語意
  品質。
- **語意** — 所產生輸出的實際價值。只能由評估器透過
  `setSemanticQuality()` 產生。在評估器提供該值之前，它會保持為 `null`，
  且絕不會滲入作業分數。

每個（提供者、模型）的狀態（EWMA + 有界計數器）：

- `successEwma` — 結果成功與否的 EWMA（α=0.2）。
- `latencyEwma` / `ttftEwma` — 延遲的 EWMA（α=0.1）。
- `samples`、`anomalies`、`rateLimited`、`semantic`、`semanticConfidence`。
- `recencyMs` — 距離上次觀察到該模型經過的時間。

### 信賴度／樣本感知

`confidence = clamp01(samples / 50)`，而回傳給評分器的分數會向中立
中點混合：

```
score = 0.5 + confidence * (operational - 0.5)
```

結果如下（已由測試驗證）：

- 冷啟動提供者（0 個樣本）的分數為 **0.5** — 不會受到不公平的懲罰，但
  也無法凌駕於擁有數千筆穩健觀察資料的提供者。
- 只有 7 次幸運成功的提供者會被拉向 0.5（絕不會因樂觀初始化而
  取得主導地位）。
- 擁有 50 個以上樣本的提供者會收斂至其真實的作業分數。
- 劣化與復原都是漸進式的（EWMA），單次孤立失敗不會
  摧毀健康提供者的評分。

`ProviderQuality` 會公開 `{ operational, semantic, confidence, samples, anomalies,
rateLimited, successEwma, latencyEwmaMs, ttftEwmaMs, recencyMs }`。

此資訊會作為 `quality` 評分因子，提供給自動組合評分器：

- `open-sse/services/autoCombo/scoring.ts` 中的
  `ScoringFactors.quality` / `ScoringWeights.quality`。
- `DEFAULT_WEIGHTS`：`health` 由 0.1905 → 0.1605，`quality` 為 0.03。總和維持 1.0。
- `buildAutoCandidates` 會使用追蹤器的資料填入 `candidate.quality`；沒有
  資料的候選項目預設為中立值 **0.5**（冷啟動候選項目既不會獲得加分，也不會
  受到懲罰）。

閉環如下：

```
RoutingEvent → QualityTracker → getQualityScore → 自動組合品質因子
      ↑                                                    │
      └────── 請求結果（handleChatCore）←──────────────────┘
```

### 硬性排除與軟性懲罰

品質訊號僅是一種**軟性自適應偏好**。硬性排除仍由
現有的韌性堆疊負責：斷路器 OPEN、配額耗盡、
驗證失敗、模型鎖定；這些情況均不受品質分數影響。
品質分數暫時下降的提供者只會降低偏好順位，絕不會被
硬性停用。

## 3b. 標準串流計時（TTFT / ITL）

檔案：`open-sse/utils/streamTiming.ts`

`createStreamTiming()` 是串流路徑的單一插樁接點，
並已接入 `createSSEStream`（open-sse/utils/stream.ts）：

- `markByte()` — 收到第一個上游區塊。
- `markForward()` — 將第一個區塊轉送至用戶端（用於 TTFT）。
- `markInterrupted()` — 串流在正常完成前逾時、中止或發生錯誤。
- `ttft()` = 第一個轉送的 SSE 區塊延遲。**這不是權杖層級的 TTFT** —
  單一 SSE 區塊可能攜帶零個、一個或多個權杖。此定義已有精確記錄。
- `avgItlMs()` = 平均區塊間隔（ITL 的區塊延遲代理指標）。

TTFT/ITL/中斷狀態會流入 `RoutingEvent`（`ttftMs`、`itlMs`），並由 OTel
接收端匯出為 GenAI/OmniRoute span 屬性。

## 4. OpenTelemetry / GenAI 可觀測性

檔案：`open-sse/services/routing/otel.ts`

- 無相依性的 OTLP/HTTP JSON 匯出器（使用全域 `fetch`，不使用
  `@opentelemetry/*` SDK）。
- Span 遵循 GenAI 語意慣例（`gen_ai.provider.name`、
  `gen_ai.request.model`、`gen_ai.usage.input_tokens/output_tokens`、
  `gen_ai.completion.finish_reason`、`gen_ai.system`），並加入 OmniRoute
  路由屬性（結果、狀態、TTFT、重試、備援）。
- `record()` 僅將資料加入有界緩衝區（O(1)）；背景計時器會透過
  `POST {endpoint}/v1/traces` 非同步排空。過載時會捨棄最舊的事件
  （由 `dropped` 計數器記錄）— 絕不對資料平面施加背壓。
- **除非完成設定，否則停用。** 必須設定 `OMNIROUTE_OTEL_ENDPOINT`
  （或 `OTEL_EXPORTER_OTLP_ENDPOINT`）；否則不會註冊接收端，也不會執行任何
  OTel 程式碼。

## 5. 可解釋性

- `GET /v1/explain/routing` 會傳回最近的 `RoutingEvent`（真實決策，最新者優先）
  以及各提供者／模型的品質快照。
- 驗證方式與 `/v1/combos` 一致（Bearer API 金鑰或儀表板工作階段；在
  `REQUIRE_API_KEY=false` 的單一使用者本機部署中允許匿名存取）。
- 每次組合呼叫層級的追蹤仍可透過現有的 `decisionTrace.ts`
  取得（標頭 `X-OmniRoute-Combo-Trace`）。
- 安全性：事件僅攜帶路由中繼資料，絕不包含提示詞、主體內容或認證資訊。

## 6. 評估平面整合（為 Future AGI 做好準備）

OmniRoute 將 Future AGI（或任何評估器）視為**潛在的智慧／評估後端，而非相依項目**。
整合接點如下：

- `RoutingEventSink` 可將事件非同步轉送至評估器。
- `MemoryRoutingEventStore` 與品質快照可向評估器提供原始決策串流。
- 未來的 `Evaluator`（確定性、本機評審、HTTP、WASM）可取用事件／追蹤，
  並傳回 `QualityScore`，以饋入同一條 `getQualityScore`／品質因子路徑。
- 現有的評估驅動路由（`open-sse/services/evalRouting.ts`）啟用後，已會依據
  `eval_runs` 通過率重新排序組合目標。

請求路徑上不會同步執行任何評估；即使沒有評估器，閘道仍可完整運作。

## 7. 最終架構審查

1. **同步熱路徑上還有哪些作業？** 路由／評分、防護措施預先檢查、
   快取查詢，以及一次向記憶體內接收端廣播的 `emitRoutingEvent`
   （相較於基準評分約增加 0.12 µs）。
2. **哪些作業已移至非同步處理？** OTel 匯出（計時器 + fetch）、
   `call_logs`／用量持久化、語意快取寫入；品質處理位於記憶體內且為 O(1)
   （不需要非同步）。
3. **路由結果如何轉化為回饋？** `handleChatCore` 發出 `RoutingEvent` →
   `QualityTracker` 更新 EWMA 狀態 → `getQualityScore` 將結果饋入自動組合的
   `quality` 因子。
4. **品質如何影響未來的路由？** 低品質分數會降低該提供者／模型在
   `scoreAutoTargets` 中的加權分數，因此效能退化的模型會逐漸降低優先順序，
   並隨著其 EWMA 改善而恢復。
5. **Future AGI 如何在不成為相依項目的情況下整合？** 透過
   `RoutingEventSink` 介面／未來的 `Evaluator` 介接器 — 不存在硬編碼相依性。
6. **評估器無法使用時會發生什麼？** 路由不受影響；對於尚未觀察到訊號的模型，
   品質會回退至中性值（1.0）。
7. **遙測無法使用時會發生什麼？** 不會註冊 OTel 接收端；路由層的其他部分
   仍會維持不變地運作。
8. **過載時會發生什麼？** OTel 緩衝區會捨棄最舊的事件；品質狀態與環形緩衝區
   在設計上皆有界；不會產生背壓。
9. **提供者狀態在退化後如何恢復？** 隨著成功事件累積，EWMA 會重新收斂；
   暖機機制會讓冷啟動模型保持中性；斷路器則透過 HALF_OPEN 探測獨立恢復。
10. **哪些提議的功能刻意未實作？原因為何？**
    - 影子流量／實驗 — 已實作
      （`combo/shadowRouting.ts`）；不重複建置。
    - 防護措施 — 已實作（`src/lib/guardrails/`）；不重複實作。
    - 語意快取 — 已實作（`src/lib/semanticCache.ts`）；不重複實作。
    - 完整的實驗管理平台、資料集工具、提示詞最佳化平台、向量資料庫或強制性的
      外部 OTel 基礎架構 — 不屬於精簡資料平面的範圍。
    - Rust `RoutingEvent` 結構 — 資料平面採用 TypeScript；TS 類型即為經調整的
      對應實作。

## 8. 設定參考

| 變數                          | 預設值      | 效果                                                                |
| ----------------------------- | ----------- | ------------------------------------------------------------------- |
| `OMNIROUTE_OTEL_ENDPOINT`     | 未設定      | 設定後會啟用 OTLP/HTTP 追蹤匯出器（例如 `http://collector:4318`）。 |
| `OTEL_EXPORTER_OTLP_ENDPOINT` | 未設定      | OTLP 端點的備用別名。                                               |
| `OTEL_SERVICE_NAME`           | `omniroute` | `service.name` 資源屬性。                                           |

## 9. 測試

- `tests/unit/routing-events.test.ts` — 事件正規化、狀態
  分類、有界環形緩衝區、接收端扇出與隔離。
- `tests/unit/routing-quality.test.ts` — EWMA 暖機、失敗／成功恢復、
  異常懲罰、429 暫時性處理、快照、重設。
- `tests/unit/routing-scoring-quality.test.ts` — 權重完整性、中性
  預設值、品質因子排名。
- `tests/unit/routing-otel.test.ts` — 啟用閘控、GenAI span 承載資料、非同步
  排空、過載時丟棄。
- `tests/unit/routing-events-concurrency.test.ts` — 數千個事件、環形
  緩衝區有界性、會擲出例外的接收端隔離、交錯的非同步突發事件、
  插入期間重設。
- `tests/unit/routing-adaptive-e2e.test.ts` — 透過實際
  `scoreAutoTargets` 評分器執行的確定性端對端迴圈：健康 → 劣化 → 恢復 → 短暫波動，另加
  冷啟動與幸運冷啟動提供者情境。
- `tests/unit/stream-timing.test.ts` — TTFT（第一個轉送的區塊）、ITL、
  第一個位元組與首次轉送、串流中斷、格式錯誤／空白區塊的安全性。

## 10. 既有問題狀態（階段 18）

| 問題                                                | 狀態                   | 備註                                                                                                                                                                                            |
| --------------------------------------------------- | ---------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `omniglyph` 匯出不一致                              | **已修正（環境問題）** | `node_modules` 與 `package-lock.json` 不同步（安裝的是 1.3.1，但鎖定的是 1.4.0）。執行 `npm install omniglyph@1.4.0` 後已還原鎖定版本；類型錯誤降至 0。資訊清單未變更。                         |
| 過時的 `getKnownContextOverflow` 測試               | **已知問題 — 未修正**  | `combo-context-overflow-compression-probe.test.ts` 匯入了 `open-sse/services/combo.ts` 中已不存在的函式（僅註解仍有提及）。若要修正，需要重新實作該函式或重寫這些測試，這屬於不相關的架構變動。 |
| `combo-runtime-unit-concurrency.test.ts` 資料庫隔離 | **已知問題 — 未修正**  | 直接執行時，測試框架的 SQLite 隔離斷言會失敗；在基礎分支上也會以相同方式失敗。                                                                                                                  |
| i18n `llm.txt` 差異                                 | **已知問題 — 未修正**  | `docs/i18n/*/llm.txt` 與根目錄中的檔案不同；這是既有問題，會阻擋文件同步的提交前檢查。                                                                                                          |

環境問題與程式碼問題會明確區分；不會透過變更測試篩選條件來隱藏
任何不相關的失敗。
