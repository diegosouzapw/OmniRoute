# Adaptive Routing: Routing Events, Quality Feedback & Explainability (Tiếng Việt)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/ADAPTIVE_ROUTING.md) · 🇪🇹 [am](../../../am/docs/architecture/ADAPTIVE_ROUTING.md) · 🇸🇦 [ar](../../../ar/docs/architecture/ADAPTIVE_ROUTING.md) · 🇦🇿 [az](../../../az/docs/architecture/ADAPTIVE_ROUTING.md) · 🇧🇬 [bg](../../../bg/docs/architecture/ADAPTIVE_ROUTING.md) · 🇧🇩 [bn](../../../bn/docs/architecture/ADAPTIVE_ROUTING.md) · 🇨🇿 [cs](../../../cs/docs/architecture/ADAPTIVE_ROUTING.md) · 🇩🇰 [da](../../../da/docs/architecture/ADAPTIVE_ROUTING.md) · 🇩🇪 [de](../../../de/docs/architecture/ADAPTIVE_ROUTING.md) · 🇬🇷 [el](../../../el/docs/architecture/ADAPTIVE_ROUTING.md) · 🇪🇸 [es](../../../es/docs/architecture/ADAPTIVE_ROUTING.md) · 🇪🇪 [et](../../../et/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇷 [fa](../../../fa/docs/architecture/ADAPTIVE_ROUTING.md) · 🇫🇮 [fi](../../../fi/docs/architecture/ADAPTIVE_ROUTING.md) · 🇫🇷 [fr](../../../fr/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇪 [ga](../../../ga/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇳 [gu](../../../gu/docs/architecture/ADAPTIVE_ROUTING.md) · 🇳🇬 [ha](../../../ha/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇱 [he](../../../he/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇳 [hi](../../../hi/docs/architecture/ADAPTIVE_ROUTING.md) · 🇭🇷 [hr](../../../hr/docs/architecture/ADAPTIVE_ROUTING.md) · 🇭🇺 [hu](../../../hu/docs/architecture/ADAPTIVE_ROUTING.md) · 🇦🇲 [hy](../../../hy/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇩 [id](../../../id/docs/architecture/ADAPTIVE_ROUTING.md) · 🇳🇬 [ig](../../../ig/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇹 [it](../../../it/docs/architecture/ADAPTIVE_ROUTING.md) · 🇯🇵 [ja](../../../ja/docs/architecture/ADAPTIVE_ROUTING.md) · 🇬🇪 [ka](../../../ka/docs/architecture/ADAPTIVE_ROUTING.md) · 🇰🇭 [km](../../../km/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇳 [kn](../../../kn/docs/architecture/ADAPTIVE_ROUTING.md) · 🇰🇷 [ko](../../../ko/docs/architecture/ADAPTIVE_ROUTING.md) · 🇱🇹 [lt](../../../lt/docs/architecture/ADAPTIVE_ROUTING.md) · 🇱🇻 [lv](../../../lv/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇳 [ml](../../../ml/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇳 [mr](../../../mr/docs/architecture/ADAPTIVE_ROUTING.md) · 🇲🇾 [ms](../../../ms/docs/architecture/ADAPTIVE_ROUTING.md) · 🇲🇹 [mt](../../../mt/docs/architecture/ADAPTIVE_ROUTING.md) · 🇲🇲 [my](../../../my/docs/architecture/ADAPTIVE_ROUTING.md) · 🇳🇵 [ne](../../../ne/docs/architecture/ADAPTIVE_ROUTING.md) · 🇳🇱 [nl](../../../nl/docs/architecture/ADAPTIVE_ROUTING.md) · 🇳🇴 [no](../../../no/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇳 [or](../../../or/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇳 [pa](../../../pa/docs/architecture/ADAPTIVE_ROUTING.md) · 🇵🇭 [phi](../../../phi/docs/architecture/ADAPTIVE_ROUTING.md) · 🇵🇱 [pl](../../../pl/docs/architecture/ADAPTIVE_ROUTING.md) · 🇵🇹 [pt](../../../pt/docs/architecture/ADAPTIVE_ROUTING.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/ADAPTIVE_ROUTING.md) · 🇷🇴 [ro](../../../ro/docs/architecture/ADAPTIVE_ROUTING.md) · 🇷🇺 [ru](../../../ru/docs/architecture/ADAPTIVE_ROUTING.md) · 🇱🇰 [si](../../../si/docs/architecture/ADAPTIVE_ROUTING.md) · 🇸🇰 [sk](../../../sk/docs/architecture/ADAPTIVE_ROUTING.md) · 🇸🇮 [sl](../../../sl/docs/architecture/ADAPTIVE_ROUTING.md) · 🇷🇸 [sr](../../../sr/docs/architecture/ADAPTIVE_ROUTING.md) · 🇸🇪 [sv](../../../sv/docs/architecture/ADAPTIVE_ROUTING.md) · 🇰🇪 [sw](../../../sw/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇳 [ta](../../../ta/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇳 [te](../../../te/docs/architecture/ADAPTIVE_ROUTING.md) · 🇹🇭 [th](../../../th/docs/architecture/ADAPTIVE_ROUTING.md) · 🇹🇷 [tr](../../../tr/docs/architecture/ADAPTIVE_ROUTING.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/ADAPTIVE_ROUTING.md) · 🇵🇰 [ur](../../../ur/docs/architecture/ADAPTIVE_ROUTING.md) · 🇺🇿 [uz](../../../uz/docs/architecture/ADAPTIVE_ROUTING.md) · 🇳🇬 [yo](../../../yo/docs/architecture/ADAPTIVE_ROUTING.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/ADAPTIVE_ROUTING.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/ADAPTIVE_ROUTING.md)

---

Tài liệu này mô tả nền tảng định tuyến thích ứng dựa trên phản hồi được bổ sung vào
OmniRoute. Nền tảng này được thiết kế có chủ đích để giữ quy mô nhỏ: giới thiệu một kênh
kết quả định tuyến có kiểu dữ liệu, một tín hiệu chất lượng trực tuyến cung cấp dữ liệu
cho bộ chấm điểm auto-combo hiện có, một trình xuất OpenTelemetry tùy chọn và một
endpoint giải thích quyết định. Nền tảng này **không** thay thế ngăn xếp khả năng phục hồi
hiện có (circuit breaker, thời gian chờ kết nối, khóa mô hình, ma trận tình trạng,
autopilot) — mà bổ trợ cho ngăn xếp đó.

## 1. Bối cảnh kiến trúc

OmniRoute là một mặt phẳng dữ liệu có **đường dẫn nóng của yêu cầu** và một **mặt phẳng
điều khiển/thông minh**. Đường dẫn nóng phải luôn nhanh, tiết kiệm bộ nhớ, bất đồng bộ,
có khả năng phục hồi và có thể dự đoán được. Hoạt động đánh giá, chấm điểm chất lượng,
thử nghiệm và phân tích dữ liệu lịch sử thuộc về mặt phẳng điều khiển.

```
Tác tử AI / IDE
      │
      ▼
┌─────────────────────┐
│    OmniRoute        │   mặt phẳng dữ liệu (nhanh, đồng bộ, trong bộ nhớ)
│  định tuyến/chuyển  │
│  đổi dự phòng       │
│  tình trạng/rào chắn│
│  bộ nhớ đệm/luồng   │
└──────────┬──────────┘
           │ RoutingEvent (gửi-và-quên, ~0.2µs)
           ▼
┌─────────────────────┐
│  Đích nhận phản hồi │   mặt phẳng điều khiển (bất đồng bộ, nỗ lực tối đa)
│  theo dõi chất lượng│
│  trình xuất OTel    │
│  kho giải thích     │
└──────────┬──────────┘
           ▼  điểm chất lượng
      bộ chấm điểm auto-combo
```

### Những gì đã có sẵn (đã kiểm tra, không triển khai trùng lặp)

| Khái niệm                               | Phần triển khai hiện có                                                                                  |
| --------------------------------------- | -------------------------------------------------------------------------------------------------------- |
| Tính khả dụng (có thể gửi lưu lượng?)   | Circuit breaker (CLOSED/DEGRADED/OPEN/HALF_OPEN, được lưu trong DB), thời gian chờ kết nối, khóa mô hình |
| Báo cáo tình trạng                      | `providerHealthMatrix.ts`, `providerHealthAutopilot.ts`                                                  |
| Lưu lượng bóng                          | `open-sse/services/combo/shadowRouting.ts`                                                               |
| Rào chắn                                | `src/lib/guardrails/` (hook trước/sau)                                                                   |
| Bộ nhớ đệm chính xác                    | `src/lib/semanticCache.ts` (dựa trên chữ ký)                                                             |
| Trình đánh giá/định tuyến theo đánh giá | `src/lib/evals/`, `open-sse/services/evalRouting.ts`                                                     |
| Khả năng giải thích quyết định combo    | `open-sse/services/combo/decisionTrace.ts`                                                               |
| Sự kiện thời gian thực của dashboard    | `src/lib/events/eventBus.ts` (kênh thông báo UI, payload `unknown`, lịch sử 100 mục)                     |

Lớp sự kiện định tuyến **không** phải là bản triển khai lại của `eventBus`: bus đó là
kênh thông báo thời gian thực của dashboard (tên _sự kiện_ có kiểu dữ liệu, payload
không rõ kiểu, đối tượng sử dụng là UI). `RoutingEvent` là một cấu trúc _kết quả_ có
kiểu dữ liệu (độ trễ/token/chi phí/kết quả/lý do kết thúc), được các đích nhận phản hồi
của mặt phẳng điều khiển sử dụng (trình theo dõi chất lượng, trình xuất OTel, kho
giải thích).

### Những gì còn thiếu (được bổ sung tại đây)

1. Một **sự kiện kết quả định tuyến có kiểu dữ liệu + lớp trừu tượng cho đích nhận**
   (`RoutingEvent` / `RoutingEventSink`). `decisionTrace` chỉ áp dụng trong phạm vi
   combo và chỉ tồn tại trong bộ nhớ; `comboMetrics` là các bộ đếm tích lũy;
   `call_logs` là dữ liệu lưu trữ bất đồng bộ thô. Không thành phần nào là một kênh
   kết quả dựa trên đích nhận và có kiểu dữ liệu mà trình theo dõi chất lượng,
   trình xuất OTel hoặc trình đánh giá kiểu Future-AGI có thể đăng ký nhận.
2. Một **tín hiệu chất lượng trực tuyến** (EWMA) cho chất lượng đầu ra — trước đây,
   bộ chấm điểm chỉ đại diện gián tiếp cho "chất lượng" thông qua mức độ phù hợp
   tĩnh với tác vụ và tỷ lệ vượt qua đánh giá được bật theo lựa chọn.
3. Một **trình xuất OTel tùy chọn, không phụ thuộc thư viện** sử dụng các quy ước
   ngữ nghĩa GenAI.
4. Một **endpoint giải thích quyết định** trả về các quyết định định tuyến thực tế
   cùng với trạng thái chất lượng.

## 2. Sự kiện định tuyến (nền tảng phản hồi)

Tệp: `open-sse/services/routing/events.ts`, `.../index.ts`

Một `RoutingEvent` chỉ mang siêu dữ liệu định tuyến:

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
  outcome: RoutingOutcome; // hợp kiểu union trong danh sách cho phép
  status: number | null;
  finishReason: string | null;
  connectionId: string | null;
  ts: number;
}
```

`RoutingEventSink` là một trait theo kiểu `Send+Sync` trong TypeScript:

```ts
interface RoutingEventSink {
  readonly name: string;
  record(event: RoutingEvent): void; // phải là O(1), không có I/O đồng bộ
}
```

Đường dẫn nóng gọi `emitRoutingEvent(event)` một lần cho mỗi yêu cầu đã hoàn tất
(callback hoàn tất luồng, đường dẫn thành công không phát luồng và đường dẫn lỗi
200 không hợp lệ trong `handleChatCore`). Việc phân phối là fan-out đồng bộ
đến các sink đã đăng ký, nhưng mỗi sink chỉ đưa vào hàng đợi/cập nhật trạng thái
trong bộ nhớ. **Không ghi cơ sở dữ liệu đồng bộ, không có I/O mạng trên đường dẫn nóng.**

Các sink mặc định:

- `MemoryRoutingEventStore` — bộ đệm vòng có giới hạn (500), mới nhất trước, dành cho
  endpoint giải thích.
- Consumer `QualityTracker` — cập nhật ước tính chất lượng EWMA.
- `OtlpHttpsEventSink` — tùy chọn, chỉ được bật khi `OMNIROUTE_OTEL_ENDPOINT`
  (hoặc `OTEL_EXPORTER_OTLP_ENDPOINT`) được thiết lập.

### Chi phí phụ được đo lường (so sánh trung thực)

`npm run bench:routing-events` trên máy trạm này (100k vòng lặp; các thao tác dưới µs
được đo dưới dạng µs/op tổng hợp vì các phân vị trên mỗi thao tác thấp hơn độ phân giải
bộ định thời `performance.now()`):

| Kịch bản                                      | µs/op  | ops/s  |
| --------------------------------------------- | ------ | ------ |
| đường cơ sở (chỉ tính điểm)                   | ~0.045 | ~22 M  |
| đường cơ sở + RoutingEvent (2 sink)           | ~0.168 | ~5.9 M |
| đường cơ sở + sự kiện + đưa OTel vào hàng đợi | ~0.163 | ~6.1 M |
| đồng thời (8 đợt xen kẽ)                      | ~0.18  | —      |

Chênh lệch do phân phối sự kiện so với việc tính điểm cơ sở là ~0.12 µs/yêu cầu; sink OTel
chỉ đưa vào hàng đợi (thao tác đẩy vào bộ đệm O(1)), không làm tăng mức có thể đo được.
Các số liệu này phụ thuộc vào máy và mang tính tương đối — không phải cam kết cho môi
trường production. Con số "~0.2 µs" của v1 là một ước tính tổng hợp; phương pháp này
tách đường cơ sở tính điểm khỏi chi phí phân phối sự kiện.

## 3. Tín hiệu chất lượng (trạng thái nhà cung cấp dựa trên phản hồi)

Tệp: `open-sse/services/routing/quality.ts`

v2 tách biệt chất lượng **vận hành** khỏi chất lượng **ngữ nghĩa**:

- **Vận hành** — được suy ra từ đường dẫn nóng định tuyến (HTTP 4xx/5xx, lỗi kết nối,
  429, phản hồi không hợp lệ, gián đoạn luồng, `finish_reason=length`,
  thành công nhưng không có đầu ra, EWMA độ trễ/TTFT). Phản hồi 200 KHÔNG được coi là
  chất lượng ngữ nghĩa.
- **Ngữ nghĩa** — giá trị thực tế của đầu ra được tạo. CHỈ được tạo bởi
  một trình đánh giá thông qua `setSemanticQuality()`. Giá trị này là `null` cho đến
  khi có trình đánh giá cung cấp và không bao giờ bị trộn vào điểm vận hành.

Trạng thái theo từng cặp (nhà cung cấp, mô hình) (EWMA + bộ đếm có giới hạn):

- `successEwma` — EWMA (α=0.2) của kết quả thành công.
- `latencyEwma` / `ttftEwma` — EWMA của độ trễ (α=0.1).
- `samples`, `anomalies`, `rateLimited`, `semantic`, `semanticConfidence`.
- `recencyMs` — khoảng thời gian kể từ lần gần nhất mô hình được quan sát.

### Nhận biết độ tin cậy / số lượng mẫu

`confidence = clamp01(samples / 50)`, và điểm được trả về cho bộ tính điểm
được pha trộn theo hướng điểm giữa trung lập:

```
score = 0.5 + confidence * (operational - 0.5)
```

Hệ quả (đã được xác minh bằng kiểm thử):

- Một nhà cung cấp chưa có dữ liệu (0 mẫu) đạt điểm **0.5** — không bị phạt một cách
  bất công, nhưng cũng không thể vượt trội hơn một nhà cung cấp có hàng nghìn quan sát tốt.
- Một nhà cung cấp có 7 lần thành công may mắn sẽ bị kéo về 0.5 (không bao giờ chiếm
  ưu thế nhờ giá trị khởi tạo lạc quan).
- Một nhà cung cấp có từ 50 mẫu trở lên sẽ hội tụ về điểm vận hành thực của mình.
- Sự suy giảm và phục hồi diễn ra dần dần (EWMA), và một lỗi đơn lẻ không
  hủy hoại một nhà cung cấp đang hoạt động tốt.

`ProviderQuality` cung cấp `{ operational, semantic, confidence, samples, anomalies,
rateLimited, successEwma, latencyEwmaMs, ttftEwmaMs, recencyMs }`.

Thông tin này được đưa vào bộ tính điểm auto-combo dưới dạng hệ số tính điểm `quality`:

- `ScoringFactors.quality` / `ScoringWeights.quality` trong
  `open-sse/services/autoCombo/scoring.ts`.
- `DEFAULT_WEIGHTS`: `health` 0.1905 → 0.1605, `quality` 0.03. Tổng vẫn là 1.0.
- `buildAutoCandidates` điền `candidate.quality` từ tracker; các ứng viên
  không có dữ liệu mặc định nhận giá trị trung lập **0.5** (một ứng viên chưa có dữ liệu
  không được tăng điểm cũng không bị phạt).

Vòng lặp khép kín:

```
RoutingEvent → QualityTracker → getQualityScore → hệ số chất lượng auto-combo
      ↑                                                    │
      └────── kết quả yêu cầu (handleChatCore) ←────────────┘
```

### Loại trừ cứng so với hình phạt mềm

Tín hiệu chất lượng chỉ là một **ưu tiên thích ứng mềm**. Việc loại trừ cứng vẫn
thuộc về ngăn xếp khả năng phục hồi hiện có: circuit breaker OPEN, hạn ngạch cạn kiệt,
lỗi xác thực, khóa mô hình — không yếu tố nào trong số này bị ảnh hưởng bởi điểm chất lượng.
Một nhà cung cấp có điểm chất lượng tạm thời giảm sẽ bị giảm mức ưu tiên, nhưng không bao giờ
bị vô hiệu hóa cứng.

## 3b. Định thời luồng chuẩn (TTFT / ITL)

Tệp: `open-sse/utils/streamTiming.ts`

`createStreamTiming()` là điểm tích hợp đo lường duy nhất cho luồng xử lý streaming,
được nối vào `createSSEStream` (open-sse/utils/stream.ts):

- `markByte()` — chunk đầu tiên từ upstream được nhận.
- `markForward()` — chunk đầu tiên được chuyển tiếp tới client (được dùng cho TTFT).
- `markInterrupted()` — luồng bị hết thời gian chờ/hủy/lỗi trước khi hoàn tất bình thường.
- `ttft()` = độ trễ của chunk SSE đầu tiên được chuyển tiếp. **Đây KHÔNG phải TTFT ở cấp token** —
  một chunk SSE có thể chứa không/một/nhiều token. Điều này được ghi lại chính xác trong tài liệu.
- `avgItlMs()` = khoảng cách trung bình giữa các chunk (một chỉ số đại diện cho độ trễ ITL).

TTFT/ITL/trạng thái gián đoạn được đưa vào `RoutingEvent` (`ttftMs`, `itlMs`) và được
OTel sink xuất dưới dạng các thuộc tính span GenAI/OmniRoute.

## 4. Khả năng quan sát OpenTelemetry / GenAI

Tệp: `open-sse/services/routing/otel.ts`

- Trình xuất OTLP/HTTP JSON không phụ thuộc thư viện (sử dụng `fetch` toàn cục, không dùng
  SDK `@opentelemetry/*`).
- Các span tuân theo quy ước ngữ nghĩa GenAI (`gen_ai.provider.name`,
  `gen_ai.request.model`, `gen_ai.usage.input_tokens/output_tokens`,
  `gen_ai.completion.finish_reason`, `gen_ai.system`) cùng với các thuộc tính định tuyến
  OmniRoute (kết quả, trạng thái, TTFT, số lần thử lại, phương án dự phòng).
- `record()` chỉ thêm sự kiện vào một bộ đệm có giới hạn (O(1)); một bộ hẹn giờ chạy nền
  sẽ bất đồng bộ gửi dữ liệu qua `POST {endpoint}/v1/traces`. Khi quá tải, các sự kiện
  cũ nhất bị loại bỏ (bộ đếm `dropped`) — không bao giờ tạo backpressure lên data plane.
- **Bị vô hiệu hóa trừ khi được cấu hình.** Phải đặt `OMNIROUTE_OTEL_ENDPOINT` (hoặc
  `OTEL_EXPORTER_OTLP_ENDPOINT`); nếu không, sink sẽ không được đăng ký và không có
  mã OTel nào được thực thi.

## 5. Khả năng giải thích

- `GET /v1/explain/routing` trả về các `RoutingEvent` gần đây (các quyết định thực tế,
  mới nhất trước) và bản chụp nhanh chất lượng theo từng provider/model.
- Cơ chế xác thực giống `/v1/combos` (Bearer API key hoặc phiên dashboard; cho phép
  ẩn danh trên các bản triển khai cục bộ một người dùng với `REQUIRE_API_KEY=false`).
- Các dấu vết theo từng lần gọi ở cấp combo vẫn khả dụng thông qua
  `decisionTrace.ts` hiện có (header `X-OmniRoute-Combo-Trace`).
- An toàn: các sự kiện chỉ chứa metadata định tuyến, tuyệt đối không chứa prompt/body/thông tin xác thực.

## 6. Tích hợp evaluation plane (sẵn sàng cho Future AGI)

OmniRoute xem Future AGI (hoặc bất kỳ evaluator nào) là một **backend
trí tuệ/đánh giá tiềm năng, không phải dependency**. Các điểm tích hợp:

- Một `RoutingEventSink` có thể chuyển tiếp bất đồng bộ các sự kiện đến evaluator.
- `MemoryRoutingEventStore` cùng với bản chụp nhanh chất lượng cung cấp cho evaluator
  luồng quyết định thô.
- Một `Evaluator` trong tương lai (tất định, trình đánh giá cục bộ, HTTP, WASM) sẽ tiếp nhận
  các sự kiện/dấu vết và trả về một `QualityScore`, được đưa vào cùng đường dẫn
  `getQualityScore`/hệ số chất lượng.
- Cơ chế định tuyến dựa trên eval hiện có (`open-sse/services/evalRouting.ts`) đã
  sắp xếp lại các đích combo theo tỷ lệ đạt của `eval_runs` khi được bật.

Không có quá trình đánh giá nào chạy đồng bộ trên đường dẫn yêu cầu, và gateway vẫn
hoạt động đầy đủ khi không có evaluator.

## 7. Đánh giá kiến trúc cuối cùng

1. **Những gì còn lại trên hot path đồng bộ?** Định tuyến/chấm điểm, kiểm tra trước
   bằng guardrail, tra cứu cache và một lần fan-out `emitRoutingEvent` (~0.12 µs so với
   chấm điểm cơ sở) tới các sink trong bộ nhớ.
2. **Những gì đã được chuyển sang xử lý bất đồng bộ?** Xuất OTel (bộ hẹn giờ + fetch),
   lưu trữ `call_logs`/mức sử dụng, ghi semantic cache; chất lượng được giữ trong bộ nhớ
   và có độ phức tạp O(1) (không cần bất đồng bộ).
3. **Kết quả định tuyến trở thành phản hồi như thế nào?** `handleChatCore` phát một
   `RoutingEvent` → `QualityTracker` cập nhật trạng thái EWMA → `getQualityScore`
   cung cấp dữ liệu cho hệ số `quality` của auto-combo.
4. **Chất lượng ảnh hưởng đến việc định tuyến trong tương lai như thế nào?** Điểm chất lượng
   thấp làm giảm điểm có trọng số của provider/model đó trong `scoreAutoTargets`, do đó
   các model bị suy giảm sẽ dần ít được ưu tiên hơn và phục hồi khi EWMA của chúng được cải thiện.
5. **Future AGI có thể tích hợp mà không trở thành dependency bằng cách nào?** Thông qua
   interface `RoutingEventSink` / một adapter `Evaluator` trong tương lai — không có
   dependency được mã hóa cứng.
6. **Điều gì xảy ra khi evaluator không khả dụng?** Việc định tuyến không bị ảnh hưởng;
   chất lượng trở về giá trị trung lập (1.0) đối với các model chưa có tín hiệu quan sát được.
7. **Điều gì xảy ra khi telemetry không khả dụng?** OTel sink đơn giản là không được
   đăng ký; phần còn lại của lớp định tuyến vẫn chạy mà không thay đổi.
8. **Điều gì xảy ra khi quá tải?** Bộ đệm OTel loại bỏ các sự kiện cũ nhất; chất lượng
   và ring buffer được giới hạn ngay từ thiết kế; không có backpressure.
9. **Trạng thái provider phục hồi như thế nào sau khi suy giảm?** EWMA hội tụ trở lại khi
   các lần thành công tích lũy; warmup giữ các model mới ở trạng thái trung lập; circuit breaker
   phục hồi độc lập thông qua các lần thăm dò HALF_OPEN.
10. **Những tính năng được đề xuất nào đã chủ đích KHÔNG được triển khai, và tại sao?**
    - Shadow traffic / thử nghiệm — đã được triển khai
      (`combo/shadowRouting.ts`); không xây dựng lại.
    - Guardrail — đã được triển khai (`src/lib/guardrails/`); không sao chép.
    - Semantic cache — đã được triển khai (`src/lib/semanticCache.ts`); không
      sao chép.
    - Một nền tảng quản lý thử nghiệm đầy đủ, công cụ bộ dữ liệu, nền tảng tối ưu hóa
      prompt, vector DB hoặc hạ tầng OTel bên ngoài bắt buộc — nằm ngoài phạm vi
      của một data plane tinh gọn.
    - Một struct `RoutingEvent` bằng Rust — data plane sử dụng TypeScript; kiểu TS
      là phiên bản tương đương đã được điều chỉnh.

## 8. Tham chiếu cấu hình

| Biến                          | Mặc định    | Tác dụng                                                                         |
| ----------------------------- | ----------- | -------------------------------------------------------------------------------- |
| `OMNIROUTE_OTEL_ENDPOINT`     | chưa đặt    | Khi được đặt, bật trình xuất dấu vết OTLP/HTTP (ví dụ: `http://collector:4318`). |
| `OTEL_EXPORTER_OTLP_ENDPOINT` | chưa đặt    | Bí danh dự phòng cho điểm cuối OTLP.                                             |
| `OTEL_SERVICE_NAME`           | `omniroute` | Thuộc tính tài nguyên `service.name`.                                            |

## 9. Kiểm thử

- `tests/unit/routing-events.test.ts` — chuẩn hóa sự kiện, phân loại trạng thái,
  bộ đệm vòng có giới hạn, phân phối đến nhiều sink + cô lập.
- `tests/unit/routing-quality.test.ts` — khởi động EWMA, phục hồi sau thất bại/thành công,
  mức phạt bất thường, xử lý 429 tạm thời, ảnh chụp nhanh, đặt lại.
- `tests/unit/routing-scoring-quality.test.ts` — tính toàn vẹn của trọng số, giá trị mặc định
  trung lập, xếp hạng theo hệ số chất lượng.
- `tests/unit/routing-otel.test.ts` — kiểm soát kích hoạt, tải dữ liệu span GenAI, xả bất đồng bộ,
  loại bỏ khi quá tải.
- `tests/unit/routing-events-concurrency.test.ts` — hàng nghìn sự kiện, tính giới hạn của bộ đệm
  vòng, cô lập sink phát sinh lỗi, các đợt bất đồng bộ xen kẽ,
  đặt lại trong khi chèn.
- `tests/unit/routing-adaptive-e2e.test.ts` — vòng lặp đầu-cuối xác định thông qua
  bộ chấm điểm `scoreAutoTargets` thực tế: lành mạnh → suy giảm → phục hồi → gián đoạn thoáng qua, cùng với
  các kịch bản khởi động nguội và nhà cung cấp nguội gặp may.
- `tests/unit/stream-timing.test.ts` — TTFT (phân đoạn được chuyển tiếp đầu tiên), ITL,
  byte đầu tiên so với lần chuyển tiếp đầu tiên, gián đoạn, độ an toàn khi phân đoạn sai định dạng/trống.

## 10. Trạng thái các vấn đề tồn tại từ trước (Giai đoạn 18)

| Vấn đề                                                   | Trạng thái              | Ghi chú                                                                                                                                                                                                                                                                      |
| -------------------------------------------------------- | ----------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Xuất `omniglyph` không khớp                              | **ĐÃ SỬA (môi trường)** | `node_modules` không đồng bộ với `package-lock.json` (đã cài đặt 1.3.1 trong khi phiên bản bị khóa là 1.4.0). Chạy `npm install omniglyph@1.4.0` đã khôi phục phiên bản bị khóa; số lỗi kiểu dữ liệu giảm xuống 0. Các tệp kê khai không thay đổi.                           |
| Các kiểm thử `getKnownContextOverflow` lỗi thời          | **ĐÃ BIẾT — chưa sửa**  | `combo-context-overflow-compression-probe.test.ts` nhập một hàm không còn tồn tại trong `open-sse/services/combo.ts` (chỉ còn các chú thích đề cập đến hàm đó). Việc sửa lỗi đòi hỏi triển khai lại hoặc viết lại các kiểm thử này — gây xáo trộn kiến trúc không liên quan. |
| Cô lập DB trong `combo-runtime-unit-concurrency.test.ts` | **ĐÃ BIẾT — chưa sửa**  | Xác nhận cô lập SQLite của bộ công cụ kiểm thử thất bại khi chạy trực tiếp; lỗi xảy ra giống hệt trên nhánh cơ sở.                                                                                                                                                           |
| Sai lệch i18n `llm.txt`                                  | **ĐÃ BIẾT — chưa sửa**  | `docs/i18n/*/llm.txt` khác với tệp gốc; đây là vấn đề tồn tại từ trước, ngăn cổng kiểm tra đồng bộ tài liệu trước khi commit.                                                                                                                                                |

Các vấn đề về môi trường và mã nguồn được phân biệt rõ ràng; không có lỗi không liên quan nào bị che giấu
bằng các bộ lọc kiểm thử đã thay đổi.
