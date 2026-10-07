# Guardrails (Tiếng Việt)

🌐 **Languages:** 🇺🇸 [English](../../../../security/GUARDRAILS.md) · 🇪🇹 [am](../../../am/docs/security/GUARDRAILS.md) · 🇸🇦 [ar](../../../ar/docs/security/GUARDRAILS.md) · 🇦🇿 [az](../../../az/docs/security/GUARDRAILS.md) · 🇧🇬 [bg](../../../bg/docs/security/GUARDRAILS.md) · 🇧🇩 [bn](../../../bn/docs/security/GUARDRAILS.md) · 🇧🇦 [bs](../../../bs/docs/security/GUARDRAILS.md) · 🇨🇿 [cs](../../../cs/docs/security/GUARDRAILS.md) · 🇩🇰 [da](../../../da/docs/security/GUARDRAILS.md) · 🇩🇪 [de](../../../de/docs/security/GUARDRAILS.md) · 🇬🇷 [el](../../../el/docs/security/GUARDRAILS.md) · 🇪🇸 [es](../../../es/docs/security/GUARDRAILS.md) · 🇪🇪 [et](../../../et/docs/security/GUARDRAILS.md) · 🇮🇷 [fa](../../../fa/docs/security/GUARDRAILS.md) · 🇫🇮 [fi](../../../fi/docs/security/GUARDRAILS.md) · 🇫🇷 [fr](../../../fr/docs/security/GUARDRAILS.md) · 🇮🇪 [ga](../../../ga/docs/security/GUARDRAILS.md) · 🇮🇳 [gu](../../../gu/docs/security/GUARDRAILS.md) · 🇳🇬 [ha](../../../ha/docs/security/GUARDRAILS.md) · 🇮🇱 [he](../../../he/docs/security/GUARDRAILS.md) · 🇮🇳 [hi](../../../hi/docs/security/GUARDRAILS.md) · 🇭🇷 [hr](../../../hr/docs/security/GUARDRAILS.md) · 🇭🇺 [hu](../../../hu/docs/security/GUARDRAILS.md) · 🇦🇲 [hy](../../../hy/docs/security/GUARDRAILS.md) · 🇮🇩 [id](../../../id/docs/security/GUARDRAILS.md) · 🇳🇬 [ig](../../../ig/docs/security/GUARDRAILS.md) · 🇮🇹 [it](../../../it/docs/security/GUARDRAILS.md) · 🇯🇵 [ja](../../../ja/docs/security/GUARDRAILS.md) · 🇬🇪 [ka](../../../ka/docs/security/GUARDRAILS.md) · 🇰🇭 [km](../../../km/docs/security/GUARDRAILS.md) · 🇮🇳 [kn](../../../kn/docs/security/GUARDRAILS.md) · 🇰🇷 [ko](../../../ko/docs/security/GUARDRAILS.md) · 🇱🇹 [lt](../../../lt/docs/security/GUARDRAILS.md) · 🇱🇻 [lv](../../../lv/docs/security/GUARDRAILS.md) · 🇮🇳 [ml](../../../ml/docs/security/GUARDRAILS.md) · 🇮🇳 [mr](../../../mr/docs/security/GUARDRAILS.md) · 🇲🇾 [ms](../../../ms/docs/security/GUARDRAILS.md) · 🇲🇹 [mt](../../../mt/docs/security/GUARDRAILS.md) · 🇲🇲 [my](../../../my/docs/security/GUARDRAILS.md) · 🇳🇵 [ne](../../../ne/docs/security/GUARDRAILS.md) · 🇳🇱 [nl](../../../nl/docs/security/GUARDRAILS.md) · 🇳🇴 [no](../../../no/docs/security/GUARDRAILS.md) · 🇮🇳 [or](../../../or/docs/security/GUARDRAILS.md) · 🇮🇳 [pa](../../../pa/docs/security/GUARDRAILS.md) · 🇵🇭 [phi](../../../phi/docs/security/GUARDRAILS.md) · 🇵🇱 [pl](../../../pl/docs/security/GUARDRAILS.md) · 🇵🇹 [pt](../../../pt/docs/security/GUARDRAILS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/GUARDRAILS.md) · 🇷🇴 [ro](../../../ro/docs/security/GUARDRAILS.md) · 🇷🇺 [ru](../../../ru/docs/security/GUARDRAILS.md) · 🇱🇰 [si](../../../si/docs/security/GUARDRAILS.md) · 🇸🇰 [sk](../../../sk/docs/security/GUARDRAILS.md) · 🇸🇮 [sl](../../../sl/docs/security/GUARDRAILS.md) · 🇷🇸 [sr](../../../sr/docs/security/GUARDRAILS.md) · 🇸🇪 [sv](../../../sv/docs/security/GUARDRAILS.md) · 🇰🇪 [sw](../../../sw/docs/security/GUARDRAILS.md) · 🇮🇳 [ta](../../../ta/docs/security/GUARDRAILS.md) · 🇮🇳 [te](../../../te/docs/security/GUARDRAILS.md) · 🇹🇭 [th](../../../th/docs/security/GUARDRAILS.md) · 🇹🇷 [tr](../../../tr/docs/security/GUARDRAILS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/GUARDRAILS.md) · 🇵🇰 [ur](../../../ur/docs/security/GUARDRAILS.md) · 🇺🇿 [uz](../../../uz/docs/security/GUARDRAILS.md) · 🇳🇬 [yo](../../../yo/docs/security/GUARDRAILS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/GUARDRAILS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/GUARDRAILS.md)

---

> **Nguồn chuẩn:** `src/lib/guardrails/`
> **Cập nhật lần cuối:** 2026-08-29 — v3.8.51 (nguồn gốc bản chép lời Video Bridge do bên gọi khai báo,
> chưa được máy chủ xác minh — đã làm rõ theo #11661)

Các guardrail thực thi những phép biến đổi về an toàn, chính sách và nội dung tại ranh giới
giữa OmniRoute và các nhà cung cấp thượng nguồn. Mỗi guardrail có thể kiểm tra (và
tùy chọn từ chối, biến đổi hoặc chú thích) payload yêu cầu (`preCall`) và
phản hồi thượng nguồn (`postCall`).

Hệ thống hoạt động theo cơ chế **fail-open**: nếu một guardrail phát sinh lỗi trong khi thực thi, registry
sẽ ghi lại lỗi và tiếp tục với guardrail tiếp theo thay vì làm yêu cầu
thất bại. Việc chặn là một quyết định rõ ràng (`block: true`), không bao giờ là sự cố ngoài ý muốn.

## Các Guardrail Tích hợp Sẵn

Registry tự động tải sáu guardrail theo thứ tự ưu tiên khi import (xem `registry.ts` → `registerDefaultGuardrails()`):

| Ưu tiên | Tên                 | Giai đoạn(s)   | Tệp                   |
| ------- | ------------------- | -------------- | --------------------- |
| `5`     | `vision-bridge`     | `preCall`      | `visionBridge.ts`     |
| `6`     | `audio-bridge`      | `preCall`      | `audioBridge.ts`      |
| `7`     | `video-bridge`      | `preCall`      | `videoBridge.ts`      |
| `10`    | `pii-masker`        | `pre` + `post` | `piiMasker.ts`        |
| `20`    | `prompt-injection`  | `preCall`      | `promptInjection.ts`  |
| `95`    | `credential-masker` | `pre` + `post` | `credentialMasker.ts` |

Số ưu tiên thấp hơn sẽ chạy **trước**.

### Vision Bridge (`visionBridge.ts`) — Cầu nối Đa phương thức PR-1

Chặn các yêu cầu chứa hình ảnh nhắm đến **các mô hình không có khả năng thị giác** và chuyển hướng toàn bộ yêu cầu đến một mô hình có khả năng thị giác hoặc thay thế các phần hình ảnh bằng mô tả văn bản được tạo bởi một mô hình thị giác có thể cấu hình trước khi gọi lên upstream. Điều này cho phép các nhà cung cấp chỉ hỗ trợ văn bản xử lý các tải trọng đa phương thức một cách minh bạch.

Luồng:

1.  Bỏ qua nếu mô hình đích đã hỗ trợ thị giác (trừ khi nó xuất hiện trong danh sách cầu nối bắt buộc `isVisionBridgeForcedModel`).
2.  Trích xuất các phần hình ảnh thông qua `extractImageParts(messages)` (`visionBridgeHelpers.ts`), ủy quyền cho **bộ phát hiện phương tiện thống nhất** `detectMediaParts()` trong `open-sse/utils/mediaParts.ts` — nguồn chân lý duy nhất được chia sẻ với bộ lọc tương thích kết hợp. Việc trích xuất được cho phép đối với các phần cấp cao nhất của các hình dạng mà `replaceImageParts` có thể ghép lại (hợp đồng trích xuất↔thay thế): OpenAI `image_url`, Anthropic base64 `source.type:"base64"`, Anthropic URL `source.type:"url"`, và Responses API `input_image`. Các kết quả lồng ghép và các hình dạng chỉ báo chỉ là vật liệu cho bộ lọc kết hợp và không bao giờ được trích xuất. Bỏ qua nếu không tìm thấy.
3.  Giải quyết cấu hình thời gian chạy thông qua `resolveVisionBridgeRuntimeSettings()` (`src/shared/constants/modalityBridgeDefaults.ts`): các khóa cài đặt `modalityBridge*` mới sẽ được ưu tiên; các khóa `visionBridge*` cũ vẫn là **phương án dự phòng một chu kỳ** (cửa sổ hoàn tác). Bỏ qua trước bất kỳ quá trình duyệt phương tiện nào khi cầu nối bị vô hiệu hóa.
4.  Bộ chọn chế độ (`modalityBridgeVisionMode`, xem bảng dưới đây) quyết định chuyển hướng hay mô tả. Chuyển hướng trả về `modifiedPayload` chỉ với `model` được hoán đổi, cộng với meta `{ rerouted, fromModel, toModel, imagesKept }`.
5.  Đường dẫn mô tả: giới hạn hình ảnh ở `maxImages`, tạo lời nhắc nhận biết tác vụ, tham khảo bộ nhớ đệm mô tả, gọi mô hình thị giác **song song** (`Promise.allSettled`), và chèn các phần văn bản `[Image N]: <description>` vào vị trí của chúng. Một mô tả thất bại sẽ trả về `null` và phần hình ảnh gốc được **giữ nguyên** (#4012) — ngoại trừ trên đường dẫn mô tả kết hợp khi mọi mô tả đều thất bại, trong trường hợp đó một upstream không có khả năng thị giác đã được xác nhận sẽ nhận một stub `(unavailable — no vision-capable provider connected)` thay thế (#8430).
6.  Trả về `modifiedPayload` + meta (`imagesProcessed`, `descriptions`, `processingTimeMs`, `visionModel`).

#### Bộ chọn chế độ (`modalityBridgeVisionMode`)

| Chế độ     | Mặc định | Hành vi                                                                                                                                                                                                                                                                                          |
| ---------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `auto`     | ✔        | Thuật toán heuristic cũ, không thay đổi (#6640/#7204): các mô hình không kết hợp/`auto/` chuyển hướng đến mô hình thị giác tốt nhất trừ khi mô hình gốc đã có thông tin xác thực có thể sử dụng được (sau đó mô tả); các mục tiêu kết hợp luôn mô tả.                                            |
| `describe` |          | Luôn mô tả — khối chuyển hướng bị bỏ qua hoàn toàn; mô hình do người dùng chọn luôn trả lời.                                                                                                                                                                                                     |
| `reroute`  |          | Buộc chuyển hướng: guard giữ mô hình có thông tin xác thực bị bỏ qua. Guard thông tin xác thực của **mục tiêu** chuyển hướng vẫn được áp dụng — khi không có mục tiêu thị giác khả dụng, yêu cầu sẽ chuyển sang mô tả để hình ảnh thô không bao giờ đến được backend chỉ hỗ trợ văn bản (#8430). |

Các chế độ bắt buộc sẽ ngắt mạch **trước khi** thuật toán heuristic tự động chạy; hành vi `auto` giống hệt từng byte với guardrail trước PR-1.

#### Lời nhắc mô tả nhận biết tác vụ (`modalityBridgeVisionTaskAware`)

Mặc định là **true**. `composeVisionPrompt()` (`visionBridgeHelpers.ts`) nối văn bản của **tin nhắn người dùng cuối cùng** (cắt ngắn còn 500 ký tự) vào lời nhắc mô tả cơ bản, hướng mô tả đến những gì người dùng thực sự hỏi (mẫu codex-vision-proxy) và yêu cầu mô hình thị giác phiên âm văn bản hiển thị. Khi cờ này tắt — hoặc không có văn bản người dùng — lời nhắc cơ bản được sử dụng không thay đổi.

Yêu cầu tương thích OpenAI của vòng lặp tự mô tả (`callVisionModelSingle()` trong `visionBridgeHelpers.ts`) luôn yêu cầu `image_url.detail: "high"` — một cách vô điều kiện, cho mọi người gọi/nhà cung cấp, không bị giới hạn bởi bất kỳ tín hiệu máy khách nào. Lấy mẫu chi tiết thấp làm giảm độ chính xác của OCR đối với chính tác vụ chuyển đổi văn bản mà lời nhắc này yêu cầu, vì vậy lệnh gọi mô tả luôn yêu cầu chi tiết cao bất kể mức độ chi tiết mà yêu cầu đến ban đầu đã sử dụng. Điều này chỉ ảnh hưởng đến phần thân yêu cầu mô tả nội bộ; nó không thay đổi cách OmniRoute chuyển tiếp `image_url.detail` của người gọi trong yêu cầu chính — giá trị mặc định đó được áp dụng riêng, và chỉ dành cho các máy khách OpenCode được phát hiện, trong `defaultImageDetail()` (`open-sse/handlers/chatCore/upstreamBody.ts`). Nhánh định dạng dây Anthropic của vòng lặp tự mô tả không có trường `detail` và không bị ảnh hưởng bởi bất kỳ giá trị mặc định nào.

#### Mức giới hạn đầu ra mô tả (`modalityBridgeVisionMaxChars`)

| Key                            | Default | Range              |
| ------------------------------ | ------- | ------------------ |
| `modalityBridgeVisionMaxChars` | `0`     | `0` hoặc 100–50000 |

`0` (mặc định) có nghĩa là **không giới hạn** — mô tả được trả về bởi `callVisionModel()` được chuyển tiếp nguyên vẹn, giữ nguyên hành vi hiện có. Bất kỳ giá trị nào trong phạm vi 100–50000 sẽ cắt bớt mô tả bằng hậu tố `…` trước khi nó được ghép lại thành `[Image N]: <description>` (`VisionBridgeGuardrail.preCall()` trong `src/lib/guardrails/visionBridge.ts`). Tăng giá trị này đối với các tác vụ OCR nặng chi tiết mà mô hình hạ nguồn cần bản chép đầy đủ; giảm giá trị này để giới hạn việc sử dụng token trên các mô hình thị giác "nhiều lời". Trường trên bảng điều khiển nằm trong bảng Nâng cao của tab Vision (`modality-bridge-max-chars` trong `ModalityBridgeVisionTab.tsx`) và giới hạn bất kỳ giá trị nào từ 1 đến 99 lên mức sàn 100 trong khi vẫn giữ nguyên giá trị `0` rõ ràng — `0` là một giá trị Zod hợp lệ theo đúng nghĩa của nó (`z.union([z.literal(0), z.number().int().min(100).max(50000)])`), chứ không chỉ đơn thuần là giá trị mặc định "chưa đặt".

#### Bộ nhớ đệm mô tả (`modalityBridge/bridgeCache.ts`)

Bộ nhớ đệm LRU + TTL trong bộ nhớ cho các đầu ra mô tả, được chia sẻ trên toàn bộ tiến trình. Khóa = `sha256(imageRef + composedPrompt + configuredBridgeModel)` với định dạng tiền tố độ dài (không có xung đột ranh giới trường). Thành phần mô hình là mô hình cầu nối **đã cấu hình**, không phải mô hình thực sự đã trả lời — `callVisionModel` có thể tự động chuyển sang dự phòng nội bộ, và việc tạo khóa cho mỗi lần thử sẽ làm phân mảnh bộ nhớ đệm. Các mô tả thất bại không bao giờ được lưu vào bộ nhớ đệm. Cài đặt:

| Key                             | Default | Range   |
| ------------------------------- | ------- | ------- |
| `modalityBridgeCacheEnabled`    | `true`  | —       |
| `modalityBridgeCacheTtlMinutes` | `60`    | 1–1440  |
| `modalityBridgeCacheMaxEntries` | `200`   | 10–5000 |

#### Chuẩn hóa hình ảnh từ xa (mô tả vòng lặp tự động/tìm nạp base64)

Khi cầu nối tự tìm nạp một hình ảnh **từ xa** — lệnh gọi tự mô tả của Anthropic và chuyển đổi base64 định dạng dây claude (`ensureBase64ImagesForClaudeWire`), cả hai đều thông qua `fetchRemoteImageAsDataUri()` trong `visionBridgeHelpers.ts` — URI dữ liệu kết quả được chuyển qua `normalizeDataUri()` (`open-sse/utils/imageNormalize.ts`) trước khi được nhúng vào yêu cầu mô hình thị giác. Các hình ảnh quá khổ được giảm tỷ lệ xuống **cạnh dài 2048px** (khớp với giới hạn thay đổi kích thước mà OpenAI/Anthropic đã áp dụng phía máy chủ), giúp giảm byte tải lên/độ trễ mà không thay đổi những gì mô hình thị giác nhìn thấy. Thay đổi kích thước sử dụng `sharp`, được tải qua import động: trên một nền tảng mà tệp nhị phân gốc của nó không tải được, `normalizeDataUri()` **không bao giờ ném lỗi** — nó sẽ quay trở lại việc chuyển tiếp các byte gốc, vì vậy đường dẫn mô tả/chuyển đổi base64 luôn hoạt động. Các byte không phải hình ảnh (một lần tìm nạp không trả về hình ảnh có thể giải mã được) cũng được chuyển tiếp nguyên vẹn. Chuẩn hóa này chỉ giới hạn ở các hình ảnh mà cầu nối tìm nạp cho lệnh gọi tự động của nó — nó không bao giờ được áp dụng cho tải trọng chuyển tiếp thô của người gọi, phù hợp với nguyên tắc đột biến chỉ chọn tham gia (Quy tắc cứng #20).

#### Lược đồ cài đặt + di chuyển

Các khóa `modalityBridge*` mới được Zod-xác thực trong `updateSettingsSchema` (`src/shared/validation/settingsSchemas.ts`): `modalityBridgeVisionEnabled`, `modalityBridgeVisionMode`, `modalityBridgeVisionModel`, `modalityBridgeVisionTaskAware`, `modalityBridgeVisionPrompt`, `modalityBridgeVisionTimeout`, `modalityBridgeVisionMaxImages`, `modalityBridgeVisionMaxChars`, bộ ba `modalityBridgeCache*`, và nhóm `modalityBridgeAudio*` được sử dụng bởi Audio Bridge. Di chuyển `141_modality_bridge_settings.sql` sao chép các giá trị `visionBridge*` cũ hiện có sang các khóa mới tương ứng (bất biến, không bao giờ ghi đè giá trị `modalityBridge*` do người vận hành đặt); các khóa cũ vẫn được chấp nhận làm dự phòng đọc trong một chu kỳ phát hành.

#### Tiêu đề minh bạch + thống kê

Các phản hồi đã được chuyển đổi mô tả mang tiêu đề `x-omniroute-modality-bridge: image->text;model=<visionModel>;parts=<n>` (được xây dựng bởi `buildModalityBridgeHeader()` trong `modalityBridge/bridgeStats.ts`, được đóng dấu bởi `withModalityBridgeHeader()` trong `src/sse/handlers/chatHelpers.ts`). Các yêu cầu được định tuyến lại **không** có tiêu đề — tải trọng không bị thay đổi và việc hoán đổi mô hình đã hiển thị trong trường `model` của phần thân phản hồi.

`GET /api/modality-bridge/stats` (xác thực quản lý, cùng cấp với `GET /api/settings`) trả về các bộ đếm trong bộ nhớ theo từng phương thức `{ attempts, successes, bridged, cacheHits, failures, totalLatencyMs, latencySamples, averageLatencyMs, lastUsedAt }` cho `vision`, `audio`, và `video`. `averageLatencyMs` sử dụng `latencySamples`, chứ không phải tất cả các lần thử, làm mẫu số của nó; một hoạt động không có thời gian sẽ không tạo ra một mẫu không mili giây. `bridged` vẫn là bí danh tương thích ngược cho các chuyển đổi thành công; các lần thử thất bại không làm tăng nó. Các bộ đếm được đặt lại khi khởi động lại tiến trình theo thiết kế (đo từ xa, không phải kế toán).

#### Cấu hình bảng điều khiển

Trang tổng quan chuyên dụng là
`/dashboard/settings/modality-bridge`. Các tab có thể truy cập bằng URL `Vision`, `Audio`,
và `Video` của nó giữ nguyên các tham số truy vấn trong khi chuyển đổi giá trị `tab`.
Tab Vision hiển thị khả năng bật/tắt, chế độ, lựa chọn mô hình (bao gồm cả mặc định
tự động), nhắc nhở nhận biết tác vụ, giới hạn nâng cao về thời gian chờ/hình ảnh/độ dài mô tả/bộ nhớ đệm, bộ đếm thời gian chạy, và một yêu cầu mẫu được bảo vệ. Tab Audio cũng đang hoạt động: nó hiển thị
khả năng bật/tắt, một bộ chọn mô hình chỉ STT với Auto, giới hạn thời gian chờ/clip tối đa, bộ đếm âm thanh, và một bài kiểm tra mẫu `input_audio`. Tab Video có chức năng: nó báo cáo
trạng thái thời gian chạy của FFmpeg/ffprobe — một trong bốn trạng thái UI rõ ràng (`unknown` khi
quá trình thăm dò đang diễn ra hoặc không thể hoàn thành, `restricted` trên một máy chủ bảng điều khiển không phải loopback nơi quá trình thăm dò bị bỏ qua ở phía máy khách, `unavailable` sau khi thăm dò
và xác nhận bị thiếu, hoặc `available` với các phiên bản FFmpeg/ffprobe) — duy trì
giới hạn bật/mô hình/khung hình/video/thời gian chờ, lọc bộ chọn mô hình thành các mô hình có khả năng thị giác, và hiển thị bộ đếm video.

Thẻ Vision Bridge trước đây trong cài đặt AI là một liên kết tương thích đến
trang mới; nó không còn sở hữu một bản sao thứ hai của biểu mẫu. Các nhà cung cấp phương tiện cũng
liên kết quy trình làm việc Chuyển đổi hình ảnh thành văn bản và Chuyển đổi giọng nói thành văn bản với các tab Modality
Bridge tương ứng mà không loại bỏ sân chơi Chuyển đổi giọng nói thành văn bản hiện có.

**Bỏ qua kiểm soát tự vòng lặp:** khi lệnh mô tả được định tuyến qua
vòng lặp tự thân `/v1` của OmniRoute (mô hình nhà cung cấp không chuẩn), yêu cầu phụ gửi
`x-omniroute-admission-bypass: internal` và được xác thực bằng thông tin đăng nhập tự vòng lặp đã được giải quyết — `sk_omniroute` cục bộ trong chế độ cục bộ, hoặc khóa môi trường `OMNIROUTE_API_KEY` / `ROUTER_API_KEY` do nhà điều hành cấu hình (#1350) để
các triển khai `REQUIRE_API_KEY=true` vẫn có thể chạy lệnh mô tả. Việc bỏ qua chỉ được chấp nhận đối với các thông tin đăng nhập chính xác đó, vì vậy các máy khách bên ngoài không thể sử dụng tiêu đề để bỏ qua kiểm soát.

Các giá trị mặc định cũ nằm trong `src/shared/constants/visionBridgeDefaults.ts`;
các giá trị mặc định mới về chế độ/nhận biết tác vụ/bộ nhớ đệm và trình giải quyết cài đặt nằm trong
`src/shared/constants/modalityBridgeDefaults.ts`. Guardrail hiển thị một
tùy chọn hàm tạo `deps` để các bài kiểm tra có thể chèn các triển khai `getSettings` và
`callVisionModel` giả.

### Audio Bridge (`audioBridge.ts`) — Modality Bridge PR-3

Chặn các yêu cầu trò chuyện có chứa âm thanh trước khi chúng đến một mục tiêu không
được biết là chấp nhận đầu vào âm thanh. Nó không bao giờ định tuyến lại yêu cầu trò chuyện: các phần âm thanh được
chuyển đổi thông qua điểm cuối nhiều phần tương thích với OpenAI hiện có và
mô hình trò chuyện đã chọn tiếp tục với các bản ghi văn bản.

Luồng:

1. Giải quyết `supportsAudio` thông qua `getResolvedModelCapabilities()`. Siêu dữ liệu đăng ký nhà cung cấp rõ ràng
   thắng thế, sau đó là siêu dữ liệu mô hình tĩnh, sau đó là `modalities_input` được đồng bộ hóa. Một danh sách đầu vào được khai báo không có `audio` là `false`; không có
   bằng chứng khả năng nào vẫn là `null`. Cả `false` và `null` đều kích hoạt
   cầu nối bảo thủ, trong khi `true` bỏ qua nó.
2. Giải quyết cài đặt `modalityBridgeAudio*` và trích xuất các phần âm thanh cấp cao nhất có thể ghép nối từ mọi tin nhắn thông qua bộ phát hiện `detectMediaParts()` được chia sẻ. Các hình dạng dây được hỗ trợ là OpenAI `input_audio`, `audio_url` và
   `source.media_type: "audio/*"`. Âm thanh lồng nhau được phát hiện để định tuyến nhưng không
   bị xóa bởi đường dẫn ghép nối. Công việc được giới hạn bởi `modalityBridgeAudioMaxClips`;
   các phần sau đó vẫn không bị chạm đến.
3. Tôn trọng `provider/model` đã cấu hình, hoặc để `selectAudioBridgeModel()` duyệt qua
   `AUDIO_TRANSCRIPTION_PROVIDERS` theo thứ tự danh mục ổn định và chọn
   mô hình đầu tiên có thông tin đăng nhập nhà cung cấp đang hoạt động có thể sử dụng.
4. `callAudioTranscription()` chuyển đổi âm thanh base64/data-URI thành một `file` nhiều phần, hoặc tải xuống một `audio_url` từ xa thông qua bảo vệ đầu ra chỉ công khai với ghim DNS và giới hạn 25 MB. Sau đó, nó POST tệp và mô hình đã chọn đến vòng lặp tự thân `/v1/audio/transcriptions` cục bộ, được xác thực bằng
   `resolveSelfLoopBearer()`. Tuyến chuyển đổi hiện có thực hiện tra cứu thông tin đăng nhập bình thường, xử lý thời gian chờ/giới hạn tốc độ và điều phối nhà cung cấp.
5. Các cuộc gọi thành công thay thế các phần của chúng bằng `[Audio N]: <transcript>`. Các cuộc gọi
   chạy với `Promise.allSettled`: một lỗi riêng lẻ giữ nguyên phần âm thanh gốc đó (hợp đồng #4012). Nếu mọi cuộc gọi đều thất bại và mục tiêu được chứng minh là
   `supportsAudio === false`, các phần trở thành
   `[Audio N]: (unavailable — no STT provider connected)` (hợp đồng #8430). Đối với
   một mục tiêu không xác định (`null`), kết quả tất cả lỗi vẫn không bị chạm đến. Một mục tiêu chỉ văn bản đã được chứng minh không có thông tin đăng nhập STT có thể sử dụng sẽ nhận được cùng một stub rõ ràng mà không cần thực hiện cuộc gọi mạng.

Các bản ghi thành công sử dụng bộ nhớ đệm LRU/TTL của Modality Bridge trên toàn bộ quy trình. Khóa kết hợp tham chiếu âm thanh, nhãn hoạt động `audio-transcription` ổn định và mô hình STT đã chọn; các lỗi không bao giờ được lưu vào bộ nhớ đệm. Các lần thử âm thanh cập nhật các bộ đếm `bridged`, `cacheHits`, `failures` và `lastUsedAt` được chia sẻ.
Các phản hồi đã chuyển đổi mang
`x-omniroute-modality-bridge: audio->text;model=<sttModel>;parts=<n>`; các yêu cầu không bị chạm đến không nhận được phân đoạn Audio Bridge.

Cài đặt thời gian chạy được hỗ trợ bởi DB và được xác thực bằng Zod:

| Khóa                          | Mặc định | Phạm vi             |
| ----------------------------- | -------- | ------------------- |
| `modalityBridgeAudioEnabled`  | `true`   | —                   |
| `modalityBridgeAudioModel`    | `""`     | Tự động hoặc ID STT |
| `modalityBridgeAudioTimeout`  | `60000`  | 1000–300000         |
| `modalityBridgeAudioMaxClips` | `3`      | 1–10                |

Bộ nhớ đệm được chia sẻ vẫn được kiểm soát bởi `modalityBridgeCacheEnabled`,
`modalityBridgeCacheTtlMinutes` và `modalityBridgeCacheMaxEntries`.

### Video Bridge (`videoBridge.ts`, `videoBridgePipeline.ts`)

Chặn các phần video cấp cao nhất trong `messages` của Chat Completions và `input` của Responses API trước khi một mục tiêu không có hỗ trợ video gốc được biết đến được gọi. Các định dạng được hỗ trợ là `input_video`, `video_url`, `video_source`, URL HTTPS và URI dữ liệu `data:video/*;base64,...`. Tên tệp đơn thuần trong văn bản không được coi là video.

`VideoBridgeGuardrail.preCall` (`videoBridge.ts`) chịu trách nhiệm duyệt yêu cầu, kiểm tra khả năng/chính sách, tổng hợp theo từng yêu cầu và tải trọng phản hồi. Công việc theo từng video — thu thập, bộ nhớ đệm kết quả toàn bộ, mô tả một chuỗi khung hình (kết hợp bất kỳ bản ghi âm thanh nào do người gọi khai báo), và các chỉ số/hủy bỏ/dọn dẹp theo từng lần thử — được ẩn sau `processVideoPart` trong `videoBridgePipeline.ts`, được gọi một lần cho mỗi phần video bên trong vòng lặp của `preCall`. Mô-đun đó cũng định nghĩa các ranh giới cổng rõ ràng `VideoMediaBrokerPort` (thu thập byte và trích xuất các khung hình được lấy mẫu), `VideoAudioTranscriptionPort` (kết hợp bản ghi âm thanh do người gọi khai báo với các phụ đề được lấy mẫu), và `VideoDrilldownPort` (ranh giới duy trì chi tiết khung hình; chưa được kết nối vào `processVideoPart` — chỉ có tuyến `/api/modality-bridge/video/drilldown` riêng biệt ghi các mục chi tiết hôm nay).

Đường dẫn yêu cầu `/v1` công khai không bao giờ nhập hoặc gọi một tiến trình con. Các video từ xa được tải xuống với giới hạn 50 MiB; các video base64 nội tuyến có giới hạn giải mã 36 MiB cho mỗi video để gói mô hình/tin nhắn/khung hình có thể nằm trong giới hạn chấp nhận yêu cầu JSON công khai là 50 MiB. Ước tính độ dài nội tuyến và kích thước đã giải mã được kiểm tra trước khi cấp phát. HTTPS được yêu cầu trên URL từ xa ban đầu và mọi chuyển hướng, sử dụng cơ chế bảo vệ đầu ra chỉ công khai hiện có với ghim DNS. Sau đó, các byte vượt qua ranh giới môi giới nội bộ chính xác `POST /api/modality-bridge/video/extract`. Tuyến đó vừa là `LOCAL_ONLY` vừa là `SPAWN_CAPABLE`, chỉ chấp nhận một yêu cầu loopback đáng tin cậy, được xác thực theo từng tiến trình, và không bao giờ chấp nhận URL, đường dẫn hệ thống tệp, tệp thực thi hoặc danh sách đối số. Đường ống kích thước nội dung API và trình đọc nội dung tăng dần của trình xử lý độc lập thực thi giới hạn đầu vào môi giới 50 MiB. Hàng đợi có giới hạn của nó chạy một lần trích xuất tại một thời điểm, cho phép bốn công việc đang chờ xử lý, và giới hạn đầu vào đang chờ xử lý ở 100 MiB.

Bên trong môi giới, `ffprobe` đọc một tệp cục bộ riêng tư; danh sách định dạng cho phép cố định loại trừ các định dạng danh sách phát và tệp kê khai. Đối với các vùng chứa thuộc họ MOV được phép, các tham chiếu dữ liệu MOV bên ngoài vẫn bị tắt theo mặc định, và lệnh cố định không chọn tham gia chúng. Cả `ffprobe` và `ffmpeg` đều sử dụng danh sách trắng giao thức chỉ `file`, một luồng, các mảng đối số cố định, không có shell, và các tệp thực thi được phân giải từ `PATH`. Luồng ảnh bìa đính kèm không phải là ứng cử viên có thể phát. Tất cả các luồng có thể phát phải đáp ứng các giới hạn, và một luồng mặc định rõ ràng được ưu tiên trước khi dự phòng chỉ mục thấp nhất có tính xác định. Video được giới hạn ở 600 giây, 8.192 pixel mỗi chiều, và 33.554.432 pixel nguồn. FFmpeg lấy mẫu 1–16 khung hình JPEG ở điểm giữa, thu nhỏ cạnh dài xuống tối đa 1.024 pixel mà không phóng to các đầu vào nhỏ hơn, và không bao giờ nhận URL. Lấy mẫu là `uniform` theo mặc định. Các chính sách `scene_aware` tùy chọn và `segment_aware` thử nghiệm thực hiện thêm một lần chạy FFmpeg cố định trên luồng cục bộ đã được xác thực, chọn các dấu thời gian cảnh `showinfo` có giới hạn, và dự phòng một cách xác định về cùng các điểm giữa đồng nhất khi bộ phát hiện lỗi, hết thời gian chờ, đầu ra bị lỗi hoặc tập hợp ứng cử viên trống. Chế độ nhận biết phân đoạn phân bổ các mẫu điểm giữa tỷ lệ thuận với các khoảng cảnh đã được xác thực; bằng chứng nhận biết phân đoạn và hành vi dự phòng được trình bày chi tiết dưới đây. Giới hạn cứng 16 khung hình được áp dụng sau khi lựa chọn trong mọi chính sách. Khi một yêu cầu nhận biết cảnh chỉ có ngân sách một khung hình, nó sử dụng điểm giữa đồng nhất của cửa sổ video đầy đủ hoặc cửa sổ lấy nét đang hoạt động và báo cáo `policyEffective: uniform`: một khung cảnh được chọn duy nhất không thể bảo toàn cả hai đầu thời gian. Người gọi có thể tùy chọn cung cấp một cửa sổ lấy nét hữu hạn (giây `start`/`end`); các giới hạn được kẹp vào thời lượng phương tiện, các cửa sổ đảo ngược hoặc không hữu hạn bị từ chối, và tất cả các chính sách lấy mẫu chỉ được thực hiện bên trong khoảng thời gian đã chuẩn hóa. Cửa sổ kết quả được bao gồm trong siêu dữ liệu lấy mẫu và trong tiền tố mô tả không đáng tin cậy để các mô hình hạ nguồn có thể phân biệt một đoạn trích tập trung với toàn bộ dòng thời gian.

Tiêu điểm phụ đề ngữ nghĩa là một cài đặt riêng biệt, rõ ràng. Chế độ phân tích `full` mặc định giữ nguyên lời nhắc khung hình hiện có và không bao giờ chuyển tiếp văn bản yêu cầu đến mô hình phụ đề. Ở chế độ `focused`, cầu nối chỉ đọc `text`/`input_text` do người dùng tạo, không trống mới nhất từ cùng một vùng chứa Chat hoặc Responses, chuẩn hóa nó thành NFC, thu gọn các ký tự điều khiển và khoảng trắng, và giới hạn nó ở 500 điểm mã Unicode. Một kết quả trống sẽ quay trở lại lời nhắc `full` chính xác. Một gợi ý có thể sử dụng được được tuần tự hóa dưới dạng JSON trong một khối ngữ cảnh người dùng không đáng tin cậy chuyên dụng và chỉ có thể ưu tiên các chi tiết có thể quan sát được; nó không thể ghi đè cảnh báo riêng biệt về việc tuân theo các hướng dẫn có thể nhìn thấy hoặc nghe được trong phương tiện. Tiêu điểm văn bản không bao giờ suy ra `start`/`end` hoặc thay đổi bộ lấy mẫu thời gian.

#### Bằng chứng phân đoạn cấu trúc FU-07

`segment_aware` sử dụng một lần chạy phân tích trước có giới hạn trên luồng video cục bộ đã được xác thực. Chuỗi bộ lọc cố định đầu tiên chia tỷ lệ tối đa 320 pixel chiều rộng, phát hiện các thay đổi cảnh và khoảng thời gian đóng băng, sau đó lấy mẫu ở 1 khung hình mỗi giây để làm mờ, độ sáng trung bình và thông tin không gian/thời gian. Lần chạy được giới hạn ở 600 mẫu cấu trúc, một luồng FFmpeg/bộ lọc, cùng danh sách cho phép giao thức và vùng chứa chỉ `file`, giới hạn đầu ra tiến trình 1 MiB, và tối đa 30 giây bên trong giới hạn hủy bỏ/thời hạn chung của môi giới. Nó không bao giờ chấp nhận lệnh, bộ lọc, đường dẫn hoặc URL từ yêu cầu.

Các giá trị cấu trúc là bằng chứng lấy mẫu xác định, không phải là hiểu biết ngữ nghĩa về video. Chúng không suy luận chủ thể, hành động, chú thích, lời nói hoặc ý định của người dùng. Ranh giới cảnh và đóng băng tạo thành các phân đoạn; độ bao phủ đóng băng, độ mờ, độ phơi sáng, chi tiết không gian và thay đổi thời gian chỉ ảnh hưởng đến cách phân bổ ngân sách 1–16 khung hình hiện có. Một phân đoạn hoàn toàn đóng băng được giới hạn ở một khung hình, trong khi các phân đoạn không đóng băng cạnh tranh để giành ngân sách còn lại. Khi số lượng ranh giới vượt quá số khung hình, độ bao phủ dòng thời gian đồng nhất được giữ lại để các đoạn cắt nhanh ban đầu không thể che giấu một phân đoạn dài phía sau. Các ranh giới cảnh trong độ phân giải phân tích 1 giây của ranh giới đóng băng được hợp nhất.

Các bộ lọc bị thiếu, bằng chứng bị lỗi/trống, lỗi bộ dò hoặc thời gian chờ phân tích trước bị giới hạn sẽ mở ra chính sách điểm giữa đồng nhất chính xác. Việc người gọi hủy bỏ hoặc hết hạn của broker không mở ra: nó chấm dứt tiến trình con đang chạy, ngăn chặn việc trích xuất khung hình sau này và cây tạm thời riêng tư được xóa trong `finally`.

`scripts/perf/video-bridge-fu07-eval.ts` tạo ra các fixture FFmpeg thực tế có tính xác định cho việc tiết kiệm cuộc gọi chú thích sau khi loại bỏ trùng lặp, phân bổ ngân sách chuyển động dày đặc, bằng chứng về độ mờ/phơi sáng/SI-TI, các đoạn cắt nhanh với phần đuôi dài và các trường hợp dương tính giả do mờ dần. Nó ghi lại thời gian thực tế trước phân tích và, nếu `/usr/bin/time` có sẵn, CPU con và RSS cao nhất. Các kiểm tra chất lượng của nó chỉ là các oracle cấu trúc. Chất lượng mô hình chú thích thực tế vẫn ở trạng thái `HOLD` vì công cụ này không có điểm cuối được ủy quyền hoặc trọng tài cố định. Tiết kiệm tiền cũng vẫn ở trạng thái `HOLD` trừ khi `--caption-cost-per-call-usd` cung cấp một ước tính chi phí mỗi cuộc gọi dương rõ ràng; tập lệnh không bao giờ tạo ra cả hai kết quả.

Mỗi khung hình được giới hạn ở 4 MiB, tất cả các khung hình thô cùng nhau là 23 MiB và phản hồi broker được tuần tự hóa là 32 MiB. Một thư mục tạm thời riêng tư được xóa trong `finally`. OmniRoute không đóng gói FFmpeg và không chấp nhận đường dẫn thực thi tùy chỉnh. Trước khi tạo chú thích, cầu nối áp dụng một bước loại bỏ trùng lặp hình ảnh thận trọng: mỗi JPEG được giảm xuống thành một bộ đệm thang độ xám 16×16 và chỉ được so sánh với khung hình cuối cùng được giữ lại. Đối với ngân sách chú thích được yêu cầu trên một khung hình, quá trình trích xuất cung cấp một nhóm ứng cử viên giới hạn lên đến gấp đôi ngân sách đó và không bao giờ quá 16 khung hình. Giới hạn được yêu cầu chỉ được áp dụng sau khi loại bỏ trùng lặp, với các ứng cử viên được chọn đầu tiên và cuối cùng được giữ lại trong quá trình tinh giản cuối cùng khi ngân sách ít nhất là hai. Chính sách `grayscale-16x16-mean-cells-v2` có phiên bản sử dụng giá trị lớn hơn giữa delta độ sáng trung bình và tỷ lệ các ô hình thu nhỏ có delta chuẩn hóa ít nhất là 0,05. Ngưỡng trùng lặp là hằng số 0,04, được chọn vì tính dự đoán chứ không phải được hiển thị dưới dạng cài đặt thời gian chạy. Tín hiệu độ tương phản cao thứ cấp này bảo toàn các chuyển động nhỏ và thay đổi văn bản hiển thị mà so sánh chỉ dựa trên giá trị trung bình có thể che giấu. Lỗi bộ so sánh hoặc bộ giải mã sẽ mở ra và giữ nguyên độ bao phủ. Siêu dữ liệu đầu ra phân tách các ứng cử viên được trích xuất, các khung hình được sử dụng thành công và các bản sao hình ảnh bị loại bỏ.

Một phần video được đánh dấu rõ ràng có thể yêu cầu một bảng liên hệ có dấu thời gian. Cầu nối xây dựng tối đa một lưới JPEG 4 cột, 16 khung hình. Mỗi ô 512 pixel ghi dấu thời gian nguồn của nó vào một dải dưới cùng có độ tương phản cao, trong khi các dấu thời gian tương tự vẫn còn trong siêu dữ liệu văn bản để liên kết và kiểm tra sau này. JPEG hoàn chỉnh vẫn được giới hạn ở 32 MiB. Nếu `sharp` không thể giải mã hoặc tạo lưới, cầu nối sẽ quay lại các khung hình JPEG riêng lẻ; việc hủy bỏ của máy khách vẫn lan truyền qua hoạt động tạo bảng.

Bằng chứng quảng bá được tách biệt một cách có chủ ý khỏi điểm chuẩn vi mô tổng hợp. `scripts/perf/video-bridge-contact-sheet-eval.ts` định nghĩa một công cụ A/B có phiên bản schema cho các mô hình thị giác tương thích OpenAI thực tế. Nó đo lường các token do nhà cung cấp báo cáo, độ trễ tổng thể (bao gồm cả việc tạo bảng), số lượng cuộc gọi mô hình và việc giữ lại các sự kiện được định nghĩa trong manifest. Các phản hồi mô hình thô không được ghi vào báo cáo; chỉ các bản tóm tắt SHA-256 và ID sự kiện khớp mới được giữ lại. Công cụ này không thực hiện cuộc gọi mạng hoặc cuộc gọi mô hình trả phí trừ khi `--execute-real` được truyền và `--model`, `OMNIROUTE_BASE_URL`, và `OMNIROUTE_API_KEY` được cấu hình. Nếu không có lần chạy thực tế rõ ràng đó, phán quyết có thể đọc được bằng máy của nó vẫn là `HOLD`; các phép đo tải trọng/số lượng cuộc gọi tổng hợp một mình không phải là bằng chứng quảng bá.

Người gọi có thể đính kèm một mảng `transcript.cues` tùy chọn vào một phần video được hỗ trợ khi họ đã có văn bản được căn chỉnh. Mỗi cue phải chứa `text`, một khoảng thời gian `start`/`end` hữu hạn bên trong thời lượng được thăm dò, và một `source` được phép (`client`, `embedded`, hoặc `audio-bridge`); `confidence` mặc định là `1` và phải nằm trong khoảng từ `0` đến `1`. Các cue trùng lặp chính xác được gộp lại. OmniRoute không bao giờ bắt đầu chuyển đổi giọng nói từ siêu dữ liệu này: các cue đã được xác thực được sao chép vào kết quả được mô tả cùng với nguồn, độ tin cậy và khoảng thời gian, và được hiển thị dưới dạng các quan sát không đáng tin cậy bên cạnh các chú thích khung hình. Văn bản không hợp lệ, nằm ngoài phạm vi hoặc không có nguồn gốc sẽ bị từ chối thay vì được trộn vào luồng chú thích. Trường `source` hiện do người gọi khai báo, không phải do máy chủ xác minh: OmniRoute thực thi rằng giá trị là một trong ba chuỗi được phép, nhưng chưa xác nhận bằng mật mã rằng nhãn `embedded` hoặc `audio-bridge` thực sự đến từ một quá trình trích xuất thuộc sở hữu của máy chủ. Hãy coi `source` là một gợi ý không đáng tin cậy cho đến khi quá trình xác minh đó được triển khai; đừng xây dựng các quyết định ủy quyền dựa trên nó.

Một người gọi nâng cao có thể cung cấp một track `audioTranscript` đã được ủy quyền cho cùng một video. Luồng hợp nhất chạy các quan sát hình ảnh và âm thanh dưới một thời hạn và tín hiệu hủy bỏ, sắp xếp chúng trên một dòng thời gian chung, gộp các bản sao chính xác, và báo cáo kết quả một phần khi chỉ một bên thành công. Một `audioTranscript` không hợp lệ sẽ bị hạ cấp xuống kết quả một phần đó — mô tả hình ảnh được giữ lại và nhánh âm thanh ghi lại một mã lỗi đã được làm sạch — thay vì làm hỏng toàn bộ video. Tính khả dụng theo từng nhánh, cờ một phần và các mã lỗi đã được làm sạch được bảo toàn trong kết quả được mô tả, trong siêu dữ liệu guardrail (`audioFusionRuns`/`audioFusionPartials`/`audioFusionFailureCodes`), trong siêu dữ liệu bộ nhớ đệm kết quả, và trong các bộ đếm hợp nhất cầu nối. Đường dẫn Video Bridge mặc định không gọi chuyển đổi giọng nói thành văn bản hoặc tải xuống bản sao phương tiện thứ hai; nếu không có track rõ ràng đó, nó vẫn chỉ là video.

**Lưu giữ bản ghi (#12150 P1).** Điều này tự động áp dụng bất cứ khi nào Video Bridge (bản thân nó là tùy chọn tham gia) hiển thị một gợi ý bản ghi — không có cờ lưu giữ riêng biệt. Khi một yêu cầu hiển thị bất kỳ gợi ý bản ghi nào (một `transcript` do người gọi khai báo hoặc một `audioTranscript` đã hợp nhất), guardrail sẽ đánh dấu nó là `videoBridgeObserved` và tạo ra một bản sao đã được biên tập của mô tả video — một bản hiển thị giống hệt trong đó phần nội dung văn bản tự do của mỗi gợi ý được thay thế bằng `[redacted-video-transcript]`, được xây dựng bằng cách thay thế trường gợi ý có cấu trúc trước khi chuỗi được lắp ráp (không bao giờ bằng cách phân tích cú pháp văn bản đã được làm phẳng, vì vậy không có nội dung gợi ý nào — dù là đối kháng hay thông thường, bao gồm các nội dung chứa `]` như `[inaudible]`/`[music]` — có thể tồn tại). Phần thân yêu cầu nhật ký cuộc gọi được lưu trữ sẽ hoán đổi từng phần văn bản có nguồn gốc từ video bằng bản sao đã được biên tập đó, được khớp bằng cách so sánh nội dung; neo `fullText` được đọc lại từ tải trọng guardrail tiền cuộc gọi đã hoàn thành, do đó việc khớp vẫn thành công sau khi các guardrail chuỗi sau này (các bộ che PII và thông tin xác thực, ưu tiên 10/95) ghi lại văn bản mô tả tại chỗ và sau khi việc chèn lời nhắc hệ thống/chuyển giao/bộ nhớ định hình lại mảng tin nhắn. Phần thân được gửi lên mô hình không thay đổi. Một yêu cầu được quan sát cũng không điền vào Bộ nhớ bền vững nào (cả việc trích xuất từ yêu cầu và phản hồi đều bị bỏ qua), do đó phản hồi của chính mô hình không thể lặp lại văn bản bản ghi vào Bộ nhớ.

Các bản sao được lưu giữ bổ sung sử dụng cùng tín hiệu yêu cầu đã được quan sát. Ảnh chụp yêu cầu của khách hàng trước guardrail thô, yêu cầu đang chờ xử lý trong bộ nhớ và nhật ký yêu cầu bị từ chối sớm sẽ thay thế cấu trúc các trường bản ghi trong các phần video; các lời nhắc chuỗi được tổng hợp bởi các giai đoạn pipeline và chuyển giao ngữ cảnh được biên tập tại điểm lưu trữ phần thân yêu cầu. Dấu `video_content_removed` được lưu trữ khiến việc tiếp tục `previous_response_id` thất bại đóng thay vì tái tạo văn bản đã bị loại bỏ có chủ đích. Nếu một yêu cầu được quan sát mất bản sao biên tập từng phần trước khi ghi nhật ký, hoặc thậm chí một trong số nhiều bản sao video không khớp sau các thay đổi yêu cầu sau này, phần thân yêu cầu được lưu giữ sẽ bị bỏ qua hoàn toàn thay vì lưu giữ một bản ghi đã được biên tập một phần.

Đối với một yêu cầu được quan sát, phản hồi của mô hình có thể trích dẫn bất kỳ phần nào của bản ghi mà không có ranh giới gợi ý có cấu trúc. Do đó, `responseBody` của nhật ký cuộc gọi được lưu trữ của nó được thay thế bằng một dấu bỏ qua; tạo phẩm pipeline chi tiết (có thể bao gồm các phần thân upstream/client và các khối luồng) không được lưu giữ. Các bộ nhớ đệm ngữ nghĩa, tính bất biến và phát lại suy luận bỏ qua các thao tác đọc và ghi cho yêu cầu đó. Yêu cầu của nhà cung cấp và phản hồi hiển thị cho khách hàng vẫn không thay đổi. Các byte keepalive sớm được rút khỏi bộ đệm tạm thời khi tạo phẩm chi tiết bị bỏ qua. Cảnh báo EventStream bị lỗi của Kiro chỉ báo cáo số lượng byte tải trọng, không bao giờ báo cáo nội dung của nó hoặc lỗi thô của trình phân tích cú pháp JSON. Điều này không khẳng định rằng mọi chẩn đoán nhà cung cấp/plugin không liên quan đã được kiểm toán; việc quét rộng hơn các sink được lưu giữ được theo dõi trong #11658.

Vòng đời nội bộ `/api/modality-bridge/video/drilldown` là một lớp nền bộ nhớ đệm riêng biệt, được xác thực bằng loopback/token. Mỗi hoạt động cũng yêu cầu một ID chính tắc không rõ ràng của người dùng chính. Trước khi một người gọi sản xuất được kích hoạt, nó phải lấy ID đó từ tenant đã được xác thực và không bao giờ được chuyển tiếp một giá trị do khách hàng chọn. Các khóa bộ nhớ đệm liên kết người dùng chính đó với các ID phiên và tham chiếu video chính tắc, chỉ lưu trữ các khóa được tạo từ SHA-256 của chúng, và giới hạn cả việc đọc và xóa cho cùng một người dùng chính. Bộ nhớ đệm lưu trữ tối đa 16 khung hình JPEG được tạo ra cho mỗi mục nhập, hết hạn sau mười phút và hỗ trợ đọc `start`/`end` có giới hạn hoặc xóa phiên rõ ràng.

Mỗi người dùng chính được giới hạn ở 16 mục nhập và 64 MiB dữ liệu JPEG chính tắc. Các giới hạn đó độc lập với giới hạn toàn cầu 64 mục nhập/256 MiB: áp lực hạn ngạch của người dùng chính chỉ loại bỏ các mục nhập được sử dụng ít nhất gần đây của người dùng chính đó trước khi xem xét việc loại bỏ LRU toàn cầu. Các mục nhập đã hết hạn được loại bỏ khỏi cả tài khoản người dùng chính và tài khoản toàn cầu khi có hoạt động bộ nhớ đệm, trong khi việc hủy bỏ và lỗi xác thực không cam kết thay thế một phần.

Bộ nhớ đệm từ chối Base64 không chính tắc, phần đệm thừa, phương tiện không phải JPEG, các tệp JPEG bị lỗi hoặc bị cắt xén, và các tệp JPEG tạo ra cảnh báo trong quá trình giải mã `sharp` hình ảnh đầy đủ có giới hạn. Nó mã hóa lại mỗi hình ảnh được chấp nhận thành một JPEG chính tắc, lấy chiều rộng và chiều cao từ các byte đã giải mã thay vì tin tưởng các trường của người gọi, và loại bỏ bất kỳ byte đa ngôn ngữ thừa nào thay vì giữ lại chúng. Chỉ bộ đệm nén chính tắc có giới hạn mới được tính vào cả hai hạn ngạch. Giới hạn JSON wire bao gồm chi phí Base64 cho giới hạn đầu vào đã giải mã 32 MiB. Mỗi dẫn xuất được lưu trữ ghi lại định dạng/độ phân giải JPEG đã được xác thực, chính sách lấy mẫu, phiên bản dẫn xuất, thời gian tạo, hàm băm nội dung do máy chủ tính toán và tham chiếu cha đã được băm cộng với hàm băm nội dung cha của người gọi đáng tin cậy. Việc hủy bỏ được kiểm tra giữa các giai đoạn giải mã/băm không đồng bộ trước khi cam kết bộ nhớ đệm nguyên tử.

Phân đoạn này chưa kết nối một nhà sản xuất sản phẩm (production producer) với tuyến đường và không cung cấp lựa chọn biến thể đa độ phân giải. Do đó, đường dẫn yêu cầu Video Bridge trong suốt không phát sinh thêm công việc, trong khi việc dẫn xuất nguyên tắc ràng buộc theo người thuê (tenant-bound principal derivation) và vòng đời đa độ phân giải FU-08 đầy đủ vẫn là công việc tiếp theo rõ ràng chứ không phải là hành vi hoàn chỉnh được ghi lại.

Các khung hình được chú thích tuần tự bằng mô hình Video đã cấu hình. Một ghi đè Video trống sẽ kế thừa cài đặt Vision; nếu cả hai đều trống, bộ định tuyến tự động Vision sẽ chọn mô hình có khả năng thị giác hiệu quả. Các chú thích thành công sẽ thay thế phần gốc bằng tiền tố ổn định `[Video description:` cũng đánh dấu văn bản là một quan sát không đáng tin cậy có nguồn gốc từ phương tiện và yêu cầu các mô hình hạ nguồn không tuân theo các hướng dẫn tìm thấy trong phương tiện. Các khóa bộ đệm chú thích khung hình bao gồm các byte JPEG, lời nhắc (prompt), dấu thời gian và mô hình hiệu quả; chỉ các chú thích thành công mới được lưu vào bộ đệm. Các mục nhập bộ đệm giữ lại mô hình nhà sản xuất thành công thực tế, bao gồm cả mô hình dự phòng; cầu nối báo cáo `mixed` khi các khung hình khác nhau được tạo ra bởi các mô hình khác nhau. Một lần truy cập bộ đệm sẽ sử dụng lại danh tính nhà sản xuất đó thay vì gắn nhãn lại nó là kế hoạch định tuyến được yêu cầu. Bộ đệm kết quả toàn bộ video được lập khóa dựa trên mọi đầu vào làm thay đổi đầu ra — lời nhắc (prompt), mô hình hiệu quả, chính sách lấy mẫu, số lượng khung hình, chế độ phân tích ngữ nghĩa, dấu vân tay SHA-256 của gợi ý tiêu điểm đã chuẩn hóa, cửa sổ tiêu điểm, `transcript`, `audioTranscript` và cờ bảng liên hệ — do đó, việc thay đổi bất kỳ chiều nào trong số đó sẽ là một lỗi bộ đệm (cache miss), không bao giờ là một lần tái sử dụng cũ. Phiên bản chính sách loại bỏ trùng lặp hình ảnh, ngưỡng và số lượng khung hình ứng cử viên bị giới hạn cũng được thể hiện rõ ràng trong khóa bộ đệm kết quả và siêu dữ liệu; do đó, việc thay đổi chính sách không thể sử dụng lại mô tả toàn bộ video cũ. Siêu dữ liệu bộ đệm kết quả v4 giữ lại chế độ và dấu vân tay, không bao giờ là tác vụ người dùng thô. Siêu dữ liệu guardrail báo cáo cả chế độ phân tích được yêu cầu và chế độ phân tích hiệu quả; một chế độ `focused` được yêu cầu mà không có văn bản người dùng có thể sử dụng được sẽ được báo cáo là `full` một cách hiệu quả.

Guardrail trích xuất mọi phần video được hỗ trợ nhưng không mô tả quá `modalityBridgeVideoMaxVideos`. Đối với một mục tiêu đã được chứng minh là có `supportsVideo === false`, các video bị lỗi và vượt quá giới hạn sẽ trở thành các dấu hiệu văn bản an toàn rõ ràng để không có video thô nào tồn tại. Khi khả năng không xác định, các phần đó vẫn không bị chạm tới. Các mục tiêu có `supportsVideo === true` sẽ bỏ qua cầu nối. Tín hiệu hủy yêu cầu của máy khách lan truyền qua quá trình tải xuống, hàng đợi broker, các tiến trình con và các cuộc gọi chú thích; các lệnh hủy dừng giữa các video và không bao giờ thất bại mở ra phương tiện thô.

Cài đặt thời gian chạy được hỗ trợ bởi DB và được xác thực bằng Zod:

| Khóa                                | Mặc định    | Phạm vi / hành vi                                                                                                      |
| :---------------------------------- | :---------- | :--------------------------------------------------------------------------------------------------------------------- |
| `modalityBridgeVideoEnabled`        | `false`     | Thời gian chạy tùy chọn, chọn tham gia                                                                                 |
| `modalityBridgeVideoAnalysisMode`   | `"full"`    | `full` giữ lại các chú thích chung; `focused` sử dụng ngữ cảnh người dùng gần đây nhất bị giới hạn, không đáng tin cậy |
| `modalityBridgeVideoModel`          | `""`        | Kế thừa mô hình Vision Bridge                                                                                          |
| `modalityBridgeVideoFrameCount`     | `8`         | 1–16                                                                                                                   |
| `modalityBridgeVideoSamplingPolicy` | `"uniform"` | `uniform`, `scene_aware`, hoặc `segment_aware` theo tỷ lệ; lỗi bộ phát hiện sẽ quay lại `uniform`                      |
| `modalityBridgeVideoMaxVideos`      | `1`         | 1–4                                                                                                                    |
| `modalityBridgeVideoTimeout`        | `120000`    | 1000–120000 ms                                                                                                         |

Các giá trị thời gian chờ Video cũ được duy trì trên 120 giây sẽ được giới hạn theo thời hạn của broker; các ghi cài đặt mới vượt quá giới hạn đó sẽ bị từ chối. `GET /api/modality-bridge/video/runtime` yêu cầu tính cục bộ loopback được đóng dấu đáng tin cậy trước khi xác thực hoặc thăm dò thời gian chạy, sau đó yêu cầu xác thực quản lý. Nó chỉ trả về `available`, các phiên bản FFmpeg/ffprobe đã được làm sạch, và một lý do cố định khi thời gian chạy không khả dụng. Điểm cuối trích xuất nội bộ không phải là API tải lên công khai: bão hòa hàng đợi trả về `503` kèm `Retry-After`, ngắt kết nối người gọi trả về `499`, và thời hạn broker cố định trả về `504`. Các phản hồi đã chuyển đổi thêm `video->text;model=<visionModel>;parts=<videos>` vào tiêu đề `x-omniroute-modality-bridge` trung tâm mà không loại bỏ các phân đoạn Vision hoặc Audio.

### Bộ che PII (`piiMasker.ts`)

Chạy trên **cả hai** giai đoạn.

- **`preCall`** sao chép tải trọng, duyệt qua `system`, `messages`, `input` và `prompt` (bao gồm các mục chuỗi đơn giản), và áp dụng `processPII()` (từ `@/shared/utils/inputSanitizer`) cho các trường chuỗi `content`/`text`. Khi `PII_REDACTION_ENABLED=true`, PII được phát hiện sẽ được biên tập lại trong tải trọng gửi đi. Điều này độc lập với `INPUT_SANITIZER_MODE` (chỉ kiểm soát chính sách chèn lời nhắc). Khi tính năng biên tập tắt, cuộc gọi sẽ ghi lại số lượng phát hiện mà không ghi lại nội dung.
- **`postCall`** sao chép sâu phản hồi, chạy `sanitizePIIResponse()` cộng với bộ che hình dạng API phản hồi (`maskResponsesOutput` — bao gồm `output_text` và `output[].content[].text`). Nếu có bất kỳ sự biên tập nào xảy ra, phản hồi đã sửa đổi sẽ thay thế phản hồi gốc.

Guardrail không bao giờ chặn; nó chỉ chú thích (`meta.detections`, `meta.redacted`) hoặc viết lại.

### Chèn lời nhắc (`promptInjection.ts`)

Phát hiện các cấu trúc đối nghịch trong nội dung do người dùng cung cấp và thực thi chính sách đã cấu hình. Hành vi được điều khiển bởi các biến môi trường và các tùy chọn hàm tạo:

| Cài đặt     | Biến môi trường                                                                                           | Mặc định | Hiệu ứng                                                                                                                                                                                            |
| ----------- | --------------------------------------------------------------------------------------------------------- | -------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Đã bật      | `INPUT_SANITIZER_ENABLED`                                                                                 | `true`   | Khi `false`, guardrail sẽ bỏ qua.                                                                                                                                                                   |
| Chế độ      | `INJECTION_GUARD_MODE` / `INPUT_SANITIZER_MODE`                                                           | `warn`   | Chính sách tiêm: `block`, `warn`, hoặc `log`. (`redact` được chấp nhận để tương thích ngược nhưng **không** loại bỏ văn bản tiêm; yêu cầu viết lại PII được kiểm soát bởi `PII_REDACTION_ENABLED`.) |
| Ngưỡng chặn | Tùy chọn `blockThreshold` / `INPUT_SANITIZER_BLOCK_THRESHOLD` (bí danh `INJECTION_GUARD_BLOCK_THRESHOLD`) | `high`   | Mức độ nghiêm trọng tối thiểu cần thiết để chặn. Mức trung bình chỉ ở chế độ quan sát theo mặc định.                                                                                                |

**Thứ tự ưu tiên của chế độ** (`getMode`): `options.mode` của người gọi →
**ghi đè cờ tính năng DB** `INJECTION_GUARD_MODE` (Bảng điều khiển → Cài đặt →
Cờ tính năng) → biến môi trường `INJECTION_GUARD_MODE` → biến môi trường
`INPUT_SANITIZER_MODE` → `warn`. Do đó, một ghi đè từ bảng điều khiển sẽ ưu
tiên hơn các biến môi trường, vì vậy giao diện người dùng Cờ tính năng kiểm
soát guard đang chạy trực tiếp (không cần khởi động lại). Việc đọc DB là an
toàn khi lỗi: nếu có lỗi, guard sẽ quay lại hành vi dựa trên biến môi trường,
và khi không có ghi đè nào được đặt, hành vi sẽ giống hệt như giải pháp chỉ
dựa trên biến môi trường.

Nguồn phát hiện:

1.  `sanitizeRequest()` từ `@/shared/utils/inputSanitizer` (bộ phát hiện dùng
    chung được sử dụng ở những nơi khác trong pipeline).
2.  `DEFAULT_GUARD_PATTERNS` tích hợp sẵn (hiện tại là `system_override_inline`
    và `markdown_system_block`, cả hai đều có mức độ nghiêm trọng `high`).
3.  `customPatterns` tùy chọn được truyền qua các tùy chọn của hàm tạo (chuỗi,
    regex, hoặc các bản ghi `{ name, pattern, severity }`).

Khi `mode === "block"` **và** ít nhất một phát hiện đạt ngưỡng nghiêm trọng,
`preCall` trả về `{ block: true, message: "Request rejected: suspicious content
detected" }`. Trong các chế độ `warn`/`log`, guardrail sẽ ghi log nhưng cho
phép cuộc gọi. Hàm trợ giúp dùng chung `evaluatePromptInjection()` cũng được
xuất để các bên gọi cần đánh giá lời nhắc mà không cần thông qua registry.

**Giới hạn quét (v3.8.20):** bộ phát hiện chỉ kiểm tra **16 KB đầu tiên** của
văn bản lời nhắc đã nối — `MAX_INJECTION_SCAN_BYTES = 16 * 1024` (16 384 byte)
trong `src/shared/utils/inputSanitizer.ts`. Cả `detectInjection()` và
`evaluatePromptInjection()` đều `slice(0, MAX_INJECTION_SCAN_BYTES)` trước khi
chạy vòng lặp mẫu. Các chỉ thị tiêm thường nằm gần đầu một đầu vào, vì vậy điều
này giới hạn CPU/GC của regex trên các tải trọng hàng trăm KB mà không làm suy
yếu khả năng phát hiện (xem #3932, #4041).

### Bộ che thông tin xác thực (`credentialMasker.ts`)

Chạy trên **cả hai** giai đoạn, cuối cùng trong chuỗi mặc định (ưu tiên `95`).
Che các mẫu khóa API / mã thông báo bí mật nổi tiếng khỏi tải trọng gửi đi
(nội dung tin nhắn, đối số gọi công cụ, kết quả công cụ) **và** phản hồi của
nhà cung cấp, để thông tin xác thực được dán vào lời nhắc (hoặc được công cụ
trả về) không bị rò rỉ cho nhà cung cấp thượng nguồn hoặc quay lại client.

- **Chỉ chọn tham gia**, cùng quy ước với việc che PII (Quy tắc cứng
  #20-liên quan): bị tắt trừ khi `settings.credentialRedactionEnabled ===
true` **hoặc** `CREDENTIAL_REDACTION_ENABLED=true`. Khi tắt, guardrail sẽ
  không hoạt động — nó không bao giờ chặn và không bao giờ viết lại.
- `redactCredentials()` duyệt toàn bộ cây tải trọng/phản hồi (`walkValue()`,
  an toàn chống ô nhiễm prototype, an toàn chu trình thông qua `WeakSet`) và
  thay thế các kết quả khớp bằng một trình giữ chỗ `[REDACTED:<type>]`, chỉ
  sao chép các nhánh thực sự thay đổi.
- `CREDENTIAL_PATTERNS` bao gồm các khóa nhà cung cấp LLM (OpenAI,
  OpenAI-proj, Anthropic, Google, Hugging Face, Replicate), mã thông báo
  VCS/SaaS (GitHub, Slack, Linear, Notion, npm, Postman, Discord), khóa thanh
  toán (Stripe, Square), khóa đám mây (khóa truy cập AWS, Twilio, SendGrid,
  Mailgun), khóa riêng tư / JWT, chuỗi kết nối chứa thông tin xác thực
  (`mongodb://user:pass@...`, v.v.), và một mẫu giá trị tiêu đề chung
  `Authorization`/`x-api-key`/`api-key`/`apikey`. Các khóa có dạng tiêu đề
  (`authorization`, `x-api-key`, `api-key`, `apikey`) được che cấu trúc (chỉ
  giá trị, tiền tố lược đồ như `Bearer `/`Basic ` được giữ nguyên) thay vì
  thông qua regex văn bản chung.
- Guardrail không bao giờ chặn; nó chỉ viết lại (`modifiedPayload` /
  `modifiedResponse`) và chú thích (`meta.credentialsRedacted`, `meta.count`).

Guard hồi quy: `tests/unit/credential-masker-guardrail.test.ts`.

## Hợp đồng cơ sở (`base.ts`)

```typescript
class BaseGuardrail {
  enabled: boolean;
  name: string;
  priority: number;

  constructor(name: string, options?: { enabled?: boolean; priority?: number });

  async preCall(payload: unknown, context: GuardrailContext): Promise<GuardrailResult | void>;

  async postCall(response: unknown, context: GuardrailContext): Promise<GuardrailResult | void>;
}

interface GuardrailResult<TValue = unknown> {
  block?: boolean; // true sẽ dừng chuỗi ngay lập tức
  message?: string; // được hiển thị khi chặn
  meta?: Record<string, unknown> | null;
  modifiedPayload?: TValue; // được preCall trả về để ghi lại yêu cầu
  modifiedResponse?: TValue; // được postCall trả về để ghi lại phản hồi
}

interface GuardrailContext {
  apiKeyInfo?: Record<string, unknown> | null;
  disabledGuardrails?: string[] | null;
  endpoint?: string | null;
  headers?: Headers | Record<string, unknown> | null;
  log?: GuardrailLog | Console | null;
  method?: string | null;
  model?: string | null;
  provider?: string | null;
  signal?: AbortSignal;
  sourceFormat?: string | null;
  stream?: boolean;
  targetFormat?: string | null;
}
```

Một guardrail biểu thị "không thay đổi" bằng cách trả về `void`, `{}`, hoặc
`{ block: false }`. Việc trả về `modifiedPayload`/`modifiedResponse` sẽ thay thế
giá trị đang truyền qua chuỗi cho các guardrail phía sau.
`signal?: AbortSignal` truyền vòng đời của bên gọi vào các guardrail. Việc hủy yêu cầu là ngoại lệ fail-open có chủ đích: các cầu nối phương tiện sẽ dừng công việc và dọn dẹp mà không khôi phục dữ liệu phương tiện thô cho một đích được biết là không hỗ trợ dữ liệu đó.

## Registry (`registry.ts`)

Singleton `guardrailRegistry` cung cấp:

- `register(guardrail)` — thêm một guardrail (hoặc thay thế theo tên đã chuẩn hóa) và
  sắp xếp lại theo `priority` tăng dần.
- `clear()` / `list()` — các tiện ích quản trị.
- `runPreCallHooks(payload, context)` — lặp qua các guardrail đang hoạt động, truyền
  payload qua `modifiedPayload`, và dừng tại `block: true` đầu tiên.
- `runPostCallHooks(response, context)` — luồng tương tự ở phía phản hồi.
- `resetGuardrailsForTests({ registerDefaults })` — xóa trạng thái và tùy chọn
  đăng ký lại các giá trị mặc định để cô lập kiểm thử một cách sạch sẽ.

Cả hai trình chạy đều trả về `{ blocked, payload|response, results, guardrail?, message? }`,
trong đó `results` là một mảng các bản ghi `GuardrailExecutionResult` bao gồm
các trường `blocked`, `skipped`, `modified`, `error`, và `meta` cho từng guardrail,
hữu ích cho việc truy vết.

### Vô hiệu hóa guardrail theo từng yêu cầu

`resolveDisabledGuardrails({ apiKeyInfo, body, headers })` tổng hợp một
danh sách tên guardrail đã loại bỏ trùng lặp cần được bỏ qua đối với yêu cầu
hiện tại. Các nguồn (tất cả đều không bắt buộc và đều được hợp nhất):

- `apiKeyInfo.disabledGuardrails`
- `disabledGuardrails` trong phần thân yêu cầu (cấp cao nhất)
- `metadata.disabledGuardrails` trong phần thân yêu cầu
- Header `x-omniroute-disabled-guardrails` (hoặc dạng cũ
  `x-disabled-guardrails`)

Giá trị có thể là mảng chuỗi hoặc chuỗi phân tách bằng dấu phẩy; tên được
chuẩn hóa thành kebab-case viết thường (`pii_masker` → `pii-masker`). Kết quả
được truyền qua `context.disabledGuardrails` tới registry, nơi sẽ bỏ qua
các guardrail khớp tên (`skipped: true` trong `results`).

## Thứ tự thực thi

Đối với mỗi yêu cầu đi qua `src/sse/handlers/chat.ts` và
`open-sse/handlers/chatCore.ts`:

1. `resolveDisabledGuardrails(...)` tạo danh sách bỏ qua từ khóa API, phần thân
   và các header.
2. `guardrailRegistry.runPreCallHooks(body, ctx)` chạy các guardrail theo thứ tự
   ưu tiên tăng dần:
   - Các guardrail bị vô hiệu hóa được ghi nhận là `skipped`.
   - `preCall` của mỗi guardrail có thể ghi lại payload thông qua `modifiedPayload`.
   - Guardrail đầu tiên có `block: true` sẽ dừng ngay chuỗi xử lý và handler trả về
     phản hồi từ chối của guardrail.
3. Payload (có thể đã được ghi lại) được chuyển vào quá trình định tuyến kết hợp
   và gửi đến upstream.
4. Sau khi phản hồi được tập hợp, `guardrailRegistry.runPostCallHooks(...)`
   chạy cùng chuỗi đó trên phản hồi. `block: true` tại đây sẽ loại bỏ phản hồi
   từ upstream.

Các guardrail phát sinh ngoại lệ được ghi nhận với `error: <message>` và được ghi log qua
`logger.warn`, nhưng chuỗi vẫn tiếp tục — theo thiết kế fail-open.

## Cấu hình

Các biến môi trường được những guardrail tích hợp sẵn đọc:

| Biến                                  | Được dùng bởi             | Tác dụng                                                                                                        |
| ------------------------------------- | ------------------------- | --------------------------------------------------------------------------------------------------------------- |
| `INPUT_SANITIZER_ENABLED`             | `prompt-injection`        | Đặt thành `false` để vô hiệu hóa hoàn toàn việc phát hiện.                                                      |
| `INPUT_SANITIZER_MODE`                | `prompt-injection`        | Chính sách đối với injection: `warn`, `block` hoặc `log`. Giá trị cũ `redact` không ghi lại văn bản injection.  |
| `INJECTION_GUARD_MODE`                | `prompt-injection`        | Chế độ cho guard chống injection; đồng thời là cờ tính năng trong DB **ghi đè** các biến môi trường (DB > ENV). |
| `INPUT_SANITIZER_BLOCK_THRESHOLD`     | `prompt-injection`        | Mức độ nghiêm trọng tối thiểu mà `MODE=block` sẽ từ chối: `high` (mặc định), `medium` hoặc `low`.               |
| `INJECTION_GUARD_BLOCK_THRESHOLD`     | `prompt-injection`        | Bí danh cũ của `INPUT_SANITIZER_BLOCK_THRESHOLD`.                                                               |
| `PII_REDACTION_ENABLED`               | `pii-masker`              | Khi là `true`, PII trong yêu cầu được che đi (độc lập với chế độ injection).                                    |
| `PII_RESPONSE_SANITIZATION` / `_MODE` | `pii-masker` (downstream) | Kiểm soát hành vi che dữ liệu ở phía phản hồi.                                                                  |

Các guardrail Modality Bridge đọc cấu hình thời gian chạy từ kho cài đặt được
DB hỗ trợ (`getSettings()`), không phải từ các biến môi trường. Các khóa chính
của Vision là `modalityBridgeVisionEnabled`, `modalityBridgeVisionMode`,
`modalityBridgeVisionModel`, `modalityBridgeVisionTaskAware`,
`modalityBridgeVisionPrompt`, `modalityBridgeVisionTimeout`,
`modalityBridgeVisionMaxImages`, `modalityBridgeVisionMaxChars`,
`modalityBridgeCacheEnabled`, `modalityBridgeCacheTtlMinutes` và
`modalityBridgeCacheMaxEntries`. Các khóa cũ
`visionBridge*` chỉ được chấp nhận làm phương án đọc dự phòng trong một chu kỳ
như đã ghi trong tài liệu; các thao tác ghi từ dashboard sử dụng những khóa
chính. Các giá trị mặc định và trình phân giải dự phòng nằm trong
`src/shared/constants/modalityBridgeDefaults.ts`, còn các hằng số cũ được giữ
lại trong `src/shared/constants/visionBridgeDefaults.ts`.

Audio sử dụng `modalityBridgeAudioEnabled`, `modalityBridgeAudioModel`,
`modalityBridgeAudioTimeout` và `modalityBridgeAudioMaxClips`, cùng với các cài
đặt `modalityBridgeCache*` dùng chung. Audio không có cơ chế dự phòng bằng khóa
cũ vì các khóa này được giới thiệu cùng với schema Modality Bridge.

Video sử dụng `modalityBridgeVideoEnabled`, `modalityBridgeVideoAnalysisMode`,
`modalityBridgeVideoModel`,
`modalityBridgeVideoFrameCount`, `modalityBridgeVideoSamplingPolicy`,
`modalityBridgeVideoMaxVideos` và
`modalityBridgeVideoTimeout`, cùng với các cài đặt `modalityBridgeCache*` dùng
chung. Tính năng này mặc định bị vô hiệu hóa vì FFmpeg/ffprobe là các dependency
vận hành không bắt buộc, đồng thời việc tạo chú thích cho khung hình làm tăng độ
trễ và chi phí mô hình.

## Guardrail tùy chỉnh

```typescript
import { BaseGuardrail, guardrailRegistry } from "@/lib/guardrails";

class BudgetGuardrail extends BaseGuardrail {
  constructor() {
    super("budget", { priority: 50 });
  }

  async preCall(payload, ctx) {
    if (ctx.apiKeyInfo?.budgetExceeded) {
      return { block: true, message: "Daily budget exceeded" };
    }
    return { block: false };
  }
}

guardrailRegistry.register(new BudgetGuardrail());
```

Các bước:

1. Tạo `src/lib/guardrails/myGuardrail.ts` mở rộng `BaseGuardrail`.
2. Triển khai `preCall` và/hoặc `postCall`.
3. Đăng ký ngay khi import (thêm từ `registerDefaultGuardrails`) hoặc
   gọi `guardrailRegistry.register(...)` trong thời gian chạy — registry sẽ thay thế
   mọi guardrail trước đó có cùng tên đã chuẩn hóa.
4. Thêm các bài kiểm thử trong `tests/unit/` (các ví dụ hiện có:
   `tests/unit/guardrails-registry.test.ts`,
   `tests/unit/prompt-injection-guard.test.ts`,
   `tests/unit/guardrails/visionBridge.test.ts`).

## Kiểm thử

Sử dụng `resetGuardrailsForTests()` giữa các bài kiểm thử để bắt đầu từ một trạng thái đã biết.
Truyền `{ registerDefaults: false }` để bắt đầu với một registry trống và
chỉ đăng ký các guardrail đang được kiểm thử. Vision Bridge hỗ trợ chèn phần phụ thuộc
(`deps.getSettings`, `deps.callVisionModel`); Audio Bridge cung cấp các điểm nối
tương đương cho phần cài đặt, khả năng, lựa chọn mô hình STT, kiểm tra thông tin xác thực
và phiên âm. Do đó, các bài kiểm thử có thể thực thi cả hai luồng mà không cần truy cập
cơ sở dữ liệu hoặc mạng.

## Xem thêm

- `src/lib/guardrails/` — phần triển khai
- `src/shared/utils/inputSanitizer.ts` — bộ phát hiện dùng chung hỗ trợ
  chống chèn prompt và che thông tin nhận dạng cá nhân (PII)
- `src/shared/constants/visionBridgeDefaults.ts` — các giá trị mặc định của Vision Bridge và
  danh sách mô hình bắt buộc sử dụng bridge
- `src/shared/constants/modalityBridgeDefaults.ts` — các giá trị mặc định khi chạy dùng chung cho Vision/Audio
- `docs/architecture/RESILIENCE_GUIDE.md` — lớp độc lập (circuit breaker, thời gian chờ)
- `docs/reference/ENVIRONMENT.md` — tài liệu tham khảo đầy đủ về biến môi trường

## Phạm vi route và red-team của guard chống chèn (Giai đoạn 8 · Khối D)

Guard chống chèn (`createInjectionGuard` / `withInjectionGuard`) bao phủ tất cả các route
chấp nhận prompt của người dùng. Guard tuân theo `INJECTION_GUARD_MODE` (mặc định `warn` = chỉ ghi log;
`block` = trả về HTTP 400 `SECURITY_001`).

| Loại              | Route                                                                                                                                                | Chế độ mặc định |
| ----------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- | --------------- |
| Văn bản (hiện có) | `/v1/chat/completions`, `/v1/completions`, `/v1/relay/chat/completions`                                                                              | warn            |
| Sinh nội dung     | `/v1/messages`, `/v1/responses`, `/v1/images/generations`, `/v1/images/edits`, `/v1/videos/generations`, `/v1/music/generations`, `/v1/audio/speech` | warn            |
| Dữ liệu           | `/v1/embeddings`, `/v1/rerank`, `/v1/search`, `/v1/moderations`                                                                                      | warn            |

Quá trình trích xuất văn bản (`extractMessageContents`) bao phủ `messages`/`input`/`prompt`/`query`+`documents`/`instructions`/`system`.

**Red-team (hằng đêm, `nightly-llm-security.yml`):** promptfoo xác thực rằng mỗi route đều chặn
tập dữ liệu OWASP-LLM khi `INJECTION_GUARD_MODE=block`; garak chạy các phép thăm dò (bỏ qua khi không có secret).
`moderations` được đưa vào để đảm bảo tính nhất quán — các đơn vị vận hành ở chế độ chặn có thể miễn trừ route này thông qua
`resolveDisabledGuardrails`.

Quy trình hằng đêm (`.github/workflows/nightly-llm-security.yml`, cron + kích hoạt thủ công)
có hai job:

- **`promptfoo-guard` (bắt buộc)** — chạy `promptfoo eval -c promptfooconfig.yaml`
  với `INJECTION_GUARD_MODE=block`. Mỗi trường hợp đối kháng (ví dụ: "bỏ qua tất cả
  chỉ dẫn trước đó…", các kiểu jailbreak dạng DAN) xác nhận rằng phản hồi chứa
  `error.code === "SECURITY_001"`, tức là guard thực sự đã từ chối yêu cầu.
- **`garak` (tham khảo)** — chạy garak `--probes promptinject,dan,leakreplay`
  với một phiên bản OmniRoute cục bộ (`http://localhost:20128/v1`). Job này phụ thuộc vào
  secret của nhà cung cấp (`PROMPTFOO_PROVIDER_KEY`); sẽ bỏ qua một cách an toàn khi không có và được thêm hậu tố
  `|| true`, vì vậy job chỉ báo cáo mà không làm CI thất bại.

Phạm vi bao phủ của helper guard (`createInjectionGuard` / `withInjectionGuard`)
trải rộng trên mọi route `/v1` có chứa prompt; văn bản prompt được lấy từ
`messages`/`input`/`prompt`/`query`+`documents`/`instructions`/`system` bởi
`extractMessageContents()` trong `src/shared/utils/inputSanitizer.ts`.
