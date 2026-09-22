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

## Các guardrail tích hợp sẵn

Registry tự động tải sáu guardrail theo thứ tự ưu tiên khi import
(xem `registry.ts` → `registerDefaultGuardrails()`):

| Độ ưu tiên | Tên                 | Giai đoạn      | Tệp                   |
| ---------- | ------------------- | -------------- | --------------------- |
| `5`        | `vision-bridge`     | `preCall`      | `visionBridge.ts`     |
| `6`        | `audio-bridge`      | `preCall`      | `audioBridge.ts`      |
| `7`        | `video-bridge`      | `preCall`      | `videoBridge.ts`      |
| `10`       | `pii-masker`        | `pre` + `post` | `piiMasker.ts`        |
| `20`       | `prompt-injection`  | `preCall`      | `promptInjection.ts`  |
| `95`       | `credential-masker` | `pre` + `post` | `credentialMasker.ts` |

Số ưu tiên thấp hơn được chạy **trước**.

### Vision Bridge (`visionBridge.ts`) — Cầu nối phương thức PR-1

Chặn các yêu cầu chứa hình ảnh nhắm đến **mô hình không hỗ trợ thị giác** và
chuyển hướng toàn bộ yêu cầu sang một mô hình có khả năng xử lý thị giác hoặc thay thế các phần
hình ảnh bằng mô tả văn bản do một mô hình thị giác có thể cấu hình tạo ra trước
lệnh gọi thượng nguồn. Điều này cho phép các nhà cung cấp chỉ hỗ trợ văn bản xử lý
payload đa phương thức một cách minh bạch.

Luồng xử lý:

1. Bỏ qua nếu mô hình đích đã hỗ trợ thị giác (trừ khi mô hình xuất hiện trong
   danh sách buộc sử dụng bridge `isVisionBridgeForcedModel`).
2. Trích xuất các phần hình ảnh qua `extractImageParts(messages)`
   (`visionBridgeHelpers.ts`), hàm này ủy quyền cho **trình phát hiện phương tiện hợp nhất**
   `detectMediaParts()` trong `open-sse/utils/mediaParts.ts` — nguồn chuẩn
   duy nhất được dùng chung với bộ lọc tương thích combo.
   Việc trích xuất sử dụng danh sách cho phép, chỉ áp dụng cho các phần cấp cao nhất có những cấu trúc
   mà `replaceImageParts` có thể chèn trở lại (hợp đồng extract↔replace): OpenAI
   `image_url`, Anthropic base64 `source.type:"base64"`, Anthropic URL
   `source.type:"url"` và Responses API `input_image`. Các kết quả khớp lồng nhau và
   các cấu trúc chỉ dùng làm chỉ báo thuộc phạm vi xử lý của bộ lọc combo và không bao giờ được trích xuất.
   Bỏ qua nếu không tìm thấy phần nào.
3. Phân giải cấu hình thời gian chạy qua `resolveVisionBridgeRuntimeSettings()`
   (`src/shared/constants/modalityBridgeDefaults.ts`): các khóa cài đặt `modalityBridge*`
   mới được ưu tiên; các khóa `visionBridge*` cũ vẫn được giữ làm **phương án dự phòng trong một chu kỳ**
   (cửa sổ hoàn tác). Bỏ qua trước khi duyệt bất kỳ nội dung phương tiện nào khi
   bridge bị tắt.
4. Bộ chọn chế độ (`modalityBridgeVisionMode`, xem bảng bên dưới) quyết định
   chuyển hướng hay mô tả. Chuyển hướng trả về `modifiedPayload` chỉ với `model`
   được hoán đổi, cùng meta `{ rerouted, fromModel, toModel, imagesKept }`.
5. Luồng mô tả: giới hạn số hình ảnh ở `maxImages`, tạo prompt nhận biết tác vụ,
   kiểm tra bộ nhớ đệm mô tả, gọi mô hình thị giác **song song**
   (`Promise.allSettled`) và chèn các phần văn bản `[Image N]: <description>` vào
   vị trí tương ứng. Một lần mô tả thất bại sẽ trả về `null` và phần hình ảnh gốc
   được **giữ nguyên** (#4012) — ngoại trừ trên luồng mô tả combo khi mọi lần
   mô tả đều thất bại, trong trường hợp đó một thượng nguồn đã được xác nhận là không hỗ trợ thị giác sẽ nhận
   phần giữ chỗ `(unavailable — no vision-capable provider connected)` thay thế (#8430).
6. Trả về `modifiedPayload` + meta (`imagesProcessed`, `descriptions`,
   `processingTimeMs`, `visionModel`).

#### Bộ chọn chế độ (`modalityBridgeVisionMode`)

| Chế độ     | Mặc định | Hành vi                                                                                                                                                                                                                                                                                                       |
| ---------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `auto`     | ✔        | Heuristic cũ, không thay đổi (#6640/#7204): các mô hình không phải combo/`auto/` được chuyển hướng đến mô hình thị giác tốt nhất, trừ khi mô hình ban đầu đã có thông tin xác thực dùng được (khi đó sẽ mô tả); các đích combo luôn mô tả.                                                                    |
| `describe` |          | Luôn mô tả — khối chuyển hướng được bỏ qua hoàn toàn; mô hình do người dùng chọn luôn trả lời.                                                                                                                                                                                                                |
| `reroute`  |          | Buộc chuyển hướng: cơ chế bảo vệ giữ lại mô hình có thông tin xác thực bị bỏ qua. Cơ chế bảo vệ thông tin xác thực của **đích** chuyển hướng vẫn được áp dụng — khi không có đích thị giác khả dụng, yêu cầu sẽ chuyển sang luồng mô tả để hình ảnh thô không bao giờ đến backend chỉ hỗ trợ văn bản (#8430). |

Các chế độ bắt buộc đoản mạch **trước khi** heuristic tự động chạy; hành vi `auto`
giống hệt từng byte với guardrail trước PR-1.

#### Prompt mô tả nhận biết tác vụ (`modalityBridgeVisionTaskAware`)

Mặc định là **true**. `composeVisionPrompt()` (`visionBridgeHelpers.ts`) nối thêm
văn bản của **tin nhắn cuối cùng từ người dùng** (được cắt ngắn còn 500 ký tự) vào prompt
mô tả cơ sở, định hướng phần mô tả theo nội dung người dùng thực sự yêu cầu
(mẫu codex-vision-proxy) và yêu cầu mô hình thị giác chép lại văn bản nhìn thấy được.
Khi cờ bị tắt — hoặc không có văn bản từ người dùng — prompt cơ sở được dùng mà không thay đổi.

Vòng lặp tự mô tả của describe gửi yêu cầu tương thích với OpenAI (`callVisionModelSingle()`
trong `visionBridgeHelpers.ts`) luôn yêu cầu `image_url.detail: "high"` —
một cách vô điều kiện, đối với mọi bên gọi/nhà cung cấp, không phụ thuộc vào bất kỳ tín hiệu nào từ máy khách.
Lấy mẫu với mức chi tiết thấp làm giảm độ chính xác OCR đối với chính tác vụ phiên âm văn bản
mà prompt này yêu cầu, vì vậy bản thân lệnh gọi describe luôn yêu cầu mức chi tiết cao,
bất kể yêu cầu đầu vào ban đầu đã sử dụng mức chi tiết nào. Điều này
chỉ ảnh hưởng đến phần thân yêu cầu describe nội bộ; nó không thay đổi cách
OmniRoute chuyển tiếp `image_url.detail` của chính bên gọi trong yêu cầu chính —
giá trị mặc định đó được áp dụng riêng và chỉ dành cho các máy khách OpenCode đã được phát hiện, trong
`defaultImageDetail()` (`open-sse/handlers/chatCore/upstreamBody.ts`). Nhánh
định dạng truyền tải Anthropic của vòng lặp tự mô tả describe không có trường `detail`
và không bị ảnh hưởng bởi bất kỳ giá trị mặc định nào trong hai giá trị trên.

#### Giới hạn đầu ra describe (`modalityBridgeVisionMaxChars`)

| Khóa                           | Mặc định | Phạm vi            |
| ------------------------------ | -------- | ------------------ |
| `modalityBridgeVisionMaxChars` | `0`      | `0` hoặc 100–50000 |

`0` (mặc định) có nghĩa là **không giới hạn** — mô tả do
`callVisionModel()` trả về được chuyển tiếp mà không sửa đổi, duy trì
hành vi hiện có. Bất kỳ giá trị nào trong phạm vi 100–50000 đều cắt ngắn mô tả với
hậu tố `…` trước khi mô tả được chèn trở lại dưới dạng `[Image N]: <description>`
(`VisionBridgeGuardrail.preCall()` trong `src/lib/guardrails/visionBridge.ts`).
Hãy tăng giá trị này cho các tác vụ OCR có nhiều chi tiết, nơi mô hình hạ nguồn cần
toàn bộ nội dung phiên âm; giảm giá trị để giới hạn mức sử dụng token đối với các mô hình thị giác
dài dòng. Trường trên bảng điều khiển nằm trong bảng Advanced của tab Vision
(`modality-bridge-max-chars` trong `ModalityBridgeVisionTab.tsx`) và nâng mọi
giá trị từ 1 đến 99 lên mức sàn 100, trong khi vẫn giữ nguyên giá trị `0`
được đặt rõ ràng — `0` tự nó là một giá trị Zod hợp lệ
(`z.union([z.literal(0), z.number().int().min(100).max(50000)])`), chứ không chỉ
là giá trị mặc định "chưa đặt".

#### Bộ nhớ đệm describe (`modalityBridge/bridgeCache.ts`)

Bộ nhớ đệm LRU + TTL trong bộ nhớ dành cho đầu ra describe, được dùng chung trên toàn tiến trình.
Khóa = `sha256(imageRef + composedPrompt + configuredBridgeModel)` với
cơ chế đóng khung bằng tiền tố độ dài (không xảy ra xung đột ranh giới trường). Thành phần mô hình là
mô hình bridge **đã cấu hình**, không phải mô hình thực sự đã phản hồi —
`callVisionModel` có thể chuyển sang phương án dự phòng nội bộ, và việc tạo khóa theo từng lần thử sẽ
phân mảnh bộ nhớ đệm. Các lần describe thất bại không bao giờ được lưu vào bộ nhớ đệm. Cài đặt:

| Khóa                            | Mặc định | Phạm vi |
| ------------------------------- | -------- | ------- |
| `modalityBridgeCacheEnabled`    | `true`   | —       |
| `modalityBridgeCacheTtlMinutes` | `60`     | 1–1440  |
| `modalityBridgeCacheMaxEntries` | `200`    | 10–5000 |

#### Chuẩn hóa hình ảnh từ xa (lệnh tự gọi describe/tìm nạp base64)

Khi bridge tự tìm nạp một hình ảnh **từ xa** — lệnh tự gọi describe của Anthropic
và quá trình chuyển đổi base64 theo định dạng truyền tải claude
(`ensureBase64ImagesForClaudeWire`), cả hai đều thông qua
`fetchRemoteImageAsDataUri()` trong `visionBridgeHelpers.ts` — URI dữ liệu thu được
được truyền qua `normalizeDataUri()`
(`open-sse/utils/imageNormalize.ts`) trước khi được nhúng vào yêu cầu gửi đến mô hình thị giác.
Các hình ảnh quá lớn được giảm kích thước xuống **cạnh dài 2048px** (khớp với
giới hạn thay đổi kích thước mà OpenAI/Anthropic đã áp dụng ở phía máy chủ), giúp giảm
số byte tải lên/độ trễ mà không thay đổi nội dung mô hình thị giác nhìn thấy. Việc thay đổi kích thước
sử dụng `sharp`, được tải qua cơ chế import động: trên nền tảng mà tệp nhị phân gốc
của nó không tải được, `normalizeDataUri()` **không bao giờ ném ngoại lệ** — nó chuyển sang
truyền nguyên trạng các byte ban đầu, vì vậy đường dẫn describe/chuyển đổi base64
luôn tiếp tục hoạt động. Các byte không phải hình ảnh (một lần tìm nạp không trả về
hình ảnh có thể giải mã) cũng được truyền qua mà không thay đổi. Việc chuẩn hóa này
chỉ áp dụng cho các hình ảnh mà bridge tìm nạp cho lệnh tự gọi của chính nó — nó không bao giờ
được áp dụng cho payload truyền nguyên trạng của bên gọi, phù hợp với
nguyên tắc chỉ sửa đổi khi chủ động bật (Quy tắc cứng #20).

#### Lược đồ cài đặt + di chuyển

Các khóa `modalityBridge*` mới được xác thực bằng Zod trong `updateSettingsSchema`
(`src/shared/validation/settingsSchemas.ts`): `modalityBridgeVisionEnabled`,
`modalityBridgeVisionMode`, `modalityBridgeVisionModel`,
`modalityBridgeVisionTaskAware`, `modalityBridgeVisionPrompt`,
`modalityBridgeVisionTimeout`, `modalityBridgeVisionMaxImages`,
`modalityBridgeVisionMaxChars`, bộ ba `modalityBridgeCache*` và nhóm
`modalityBridgeAudio*` được Audio Bridge sử dụng. Bản di chuyển
`141_modality_bridge_settings.sql` sao chép các giá trị `visionBridge*`
kế thừa hiện có sang các khóa mới tương ứng (có tính lũy đẳng, không bao giờ ghi đè
giá trị `modalityBridge*` do người vận hành đặt); các khóa kế thừa vẫn được chấp nhận
làm phương án dự phòng khi đọc trong một chu kỳ phát hành.

#### Header minh bạch + số liệu thống kê

Các phản hồi đã được biến đổi qua describe mang theo
`x-omniroute-modality-bridge: image->text;model=<visionModel>;parts=<n>`
(được tạo bởi `buildModalityBridgeHeader()` trong `modalityBridge/bridgeStats.ts`,
được gắn bởi `withModalityBridgeHeader()` trong `src/sse/handlers/chatHelpers.ts`).
Các yêu cầu được định tuyến lại **không** nhận header — payload không bị thay đổi và việc
đổi mô hình đã hiển thị trong trường `model` của phần thân phản hồi.

`GET /api/modality-bridge/stats` (xác thực quản trị, cùng cấp với
`GET /api/settings`) trả về các bộ đếm theo từng phương thức trong bộ nhớ
`{ attempts, successes, bridged, cacheHits, failures, totalLatencyMs,
latencySamples, averageLatencyMs, lastUsedAt }` cho `vision`, `audio` và
`video`. `averageLatencyMs` sử dụng `latencySamples`, không phải tất cả các lần thử, làm
mẫu số; một thao tác không có thông tin thời gian sẽ không tạo ra một mẫu giả
có độ trễ bằng không mili giây. `bridged` vẫn là bí danh tương thích ngược cho các
lần chuyển đổi thành công; các lần thử thất bại không làm tăng giá trị này.
Theo thiết kế, các bộ đếm được đặt lại khi tiến trình khởi động lại
(đo từ xa, không phải hạch toán).

#### Cấu hình bảng điều khiển

Trang dashboard chuyên dụng là
`/dashboard/settings/modality-bridge`. Các tab `Vision`, `Audio`
và `Video` có thể được truy cập trực tiếp qua URL, đồng thời giữ nguyên các tham số truy vấn khi chuyển đổi giá trị `tab`.
Tab Vision cung cấp tính năng bật/tắt, chế độ, lựa chọn mô hình (bao gồm giá trị mặc định
tự động), lời nhắc nhận biết tác vụ, các giới hạn nâng cao về thời gian chờ/hình ảnh/độ dài mô tả/bộ nhớ đệm,
các bộ đếm lúc chạy
và một yêu cầu mẫu có cơ chế bảo vệ. Tab Audio cũng đang hoạt động: tab này cung cấp
tính năng bật/tắt, bộ chọn mô hình chỉ dành cho STT với tùy chọn Auto, các giới hạn về thời gian chờ/độ dài clip tối đa, các bộ đếm
âm thanh và một bài kiểm tra mẫu `input_audio`. Tab Video đã hoạt động đầy đủ: tab này báo cáo
trạng thái lúc chạy của FFmpeg/ffprobe — một trong bốn trạng thái giao diện rõ ràng (`unknown` trong khi
quá trình thăm dò đang diễn ra hoặc không thể hoàn tất, `restricted` trên máy chủ
dashboard không phải loopback, nơi quá trình thăm dò bị bỏ qua ở phía máy khách, `unavailable` sau khi đã thăm dò
và xác nhận là không có, hoặc `available` kèm theo các phiên bản FFmpeg/ffprobe) — lưu giữ
các giới hạn bật/tắt/mô hình/khung hình/video/thời gian chờ, lọc bộ chọn mô hình để chỉ hiển thị các
mô hình hỗ trợ thị giác và cung cấp các bộ đếm video.

Thẻ Vision Bridge trước đây trong phần cài đặt AI giờ là một liên kết tương thích đến
trang mới; thẻ này không còn sở hữu bản sao thứ hai của biểu mẫu. Media Providers cũng
liên kết các quy trình Image-to-Text và Speech-to-Text đến những tab Modality
Bridge tương ứng mà không xóa sân chơi Speech-to-Text hiện có.

**Bỏ qua kiểm soát tiếp nhận cho self-loop:** khi lệnh gọi mô tả được định tuyến qua
self-loop `/v1` của chính OmniRoute (mô hình nhà cung cấp không tiêu chuẩn), yêu cầu con sẽ gửi
`x-omniroute-admission-bypass: internal` và được xác thực bằng thông tin xác thực
self-loop đã phân giải — sentinel cục bộ `sk_omniroute` trong chế độ cục bộ, hoặc khóa env
`OMNIROUTE_API_KEY` / `ROUTER_API_KEY` do người vận hành cấu hình (#1350), để các bản triển khai
`REQUIRE_API_KEY=true` vẫn có thể thực hiện lệnh gọi mô tả. Việc bỏ qua chỉ
được chấp nhận đối với chính xác các thông tin xác thực đó, vì vậy máy khách bên ngoài không thể dùng
header này để bỏ qua quá trình tiếp nhận.

Các giá trị mặc định cũ nằm trong `src/shared/constants/visionBridgeDefaults.ts`;
các giá trị mặc định mới cho chế độ/nhận biết tác vụ/bộ nhớ đệm và trình phân giải cài đặt nằm trong
`src/shared/constants/modalityBridgeDefaults.ts`. Guardrail cung cấp tùy chọn hàm khởi tạo
`deps` để các bài kiểm thử có thể chèn các triển khai `getSettings` và
`callVisionModel` giả.

### Audio Bridge (`audioBridge.ts`) — Modality Bridge PR-3

Chặn các yêu cầu trò chuyện có chứa âm thanh trước khi chúng đến một đích không
được xác định là có thể chấp nhận đầu vào âm thanh. Cơ chế này không bao giờ định tuyến lại yêu cầu trò chuyện: các phần âm thanh được
chuyển thành văn bản thông qua endpoint multipart tương thích với OpenAI hiện có và
mô hình trò chuyện đã chọn tiếp tục xử lý với các bản chép lời dạng văn bản.

Luồng xử lý:

1. Phân giải `supportsAudio` thông qua `getResolvedModelCapabilities()`. Siêu dữ liệu tường minh
   từ sổ đăng ký nhà cung cấp được ưu tiên, sau đó là siêu dữ liệu mô hình tĩnh, rồi đến
   `modalities_input` đã đồng bộ. Danh sách đầu vào đã khai báo nhưng không có `audio` sẽ là `false`; nếu không có
   bằng chứng nào về khả năng thì giá trị vẫn là `null`. Cả `false` và `null` đều kích hoạt
   bridge thận trọng, trong khi `true` bỏ qua bridge.
2. Phân giải các cài đặt `modalityBridgeAudio*` và trích xuất các phần âm thanh cấp cao nhất
   có thể được nối vào từ mọi thông điệp thông qua bộ phát hiện `detectMediaParts()`
   dùng chung. Các định dạng truyền tải được hỗ trợ là `input_audio`, `audio_url` của OpenAI và
   `source.media_type: "audio/*"`. Âm thanh lồng nhau được phát hiện để định tuyến nhưng không
   bị loại bỏ bởi đường dẫn nối. Khối lượng công việc bị giới hạn bởi `modalityBridgeAudioMaxClips`;
   các phần phía sau được giữ nguyên.
3. Tuân theo `provider/model` đã cấu hình, hoặc để `selectAudioBridgeModel()` duyệt
   `AUDIO_TRANSCRIPTION_PROVIDERS` theo thứ tự danh mục ổn định và chọn mô hình đầu tiên
   có thông tin xác thực nhà cung cấp đang hoạt động và sử dụng được.
4. `callAudioTranscription()` chuyển đổi âm thanh base64/data-URI thành một `file`
   multipart, hoặc tải xuống `audio_url` từ xa thông qua cơ chế bảo vệ truy cập ra ngoài
   chỉ công khai, có ghim DNS và giới hạn 25 MB. Sau đó, hàm này POST tệp và mô hình đã chọn
   đến self-loop cục bộ `/v1/audio/transcriptions`, được xác thực bằng
   `resolveSelfLoopBearer()`. Tuyến chép lời hiện có thực hiện quy trình tra cứu thông tin xác thực,
   xử lý thời gian hồi chiêu/giới hạn tốc độ và điều phối đến nhà cung cấp như bình thường.
5. Các lệnh gọi thành công thay thế phần tương ứng bằng `[Audio N]: <transcript>`. Các lệnh gọi
   chạy với `Promise.allSettled`: một lỗi riêng lẻ sẽ giữ nguyên phần
   âm thanh ban đầu đó (hợp đồng #4012). Nếu mọi lệnh gọi đều thất bại và đích đã được chứng minh là
   `supportsAudio === false`, các phần sẽ trở thành
   `[Audio N]: (unavailable — no STT provider connected)` (hợp đồng #8430). Đối với
   đích chưa xác định (`null`), kết quả thất bại toàn bộ vẫn được giữ nguyên. Một
   đích đã được chứng minh là chỉ hỗ trợ văn bản nhưng không có thông tin xác thực STT khả dụng sẽ nhận cùng
   phần giữ chỗ tường minh mà không phát sinh lệnh gọi mạng.

Các bản chép lời thành công sử dụng bộ nhớ đệm LRU/TTL Modality Bridge áp dụng toàn tiến trình.
Khóa kết hợp tham chiếu âm thanh, nhãn thao tác ổn định `audio-transcription`
và mô hình STT đã chọn; lỗi không bao giờ được lưu vào bộ nhớ đệm. Các lần thử xử lý âm thanh cập nhật
các bộ đếm dùng chung `bridged`, `cacheHits`, `failures` và `lastUsedAt`.
Các phản hồi đã biến đổi mang
`x-omniroute-modality-bridge: audio->text;model=<sttModel>;parts=<n>`; các yêu cầu không bị thay đổi
không nhận được phân đoạn Audio Bridge.

Các cài đặt lúc chạy được lưu trong DB và được xác thực bằng Zod:

| Khóa                          | Mặc định | Phạm vi          |
| ----------------------------- | -------- | ---------------- |
| `modalityBridgeAudioEnabled`  | `true`   | —                |
| `modalityBridgeAudioModel`    | `""`     | Auto hoặc ID STT |
| `modalityBridgeAudioTimeout`  | `60000`  | 1000–300000      |
| `modalityBridgeAudioMaxClips` | `3`      | 1–10             |

Bộ nhớ đệm dùng chung tiếp tục được kiểm soát bởi `modalityBridgeCacheEnabled`,
`modalityBridgeCacheTtlMinutes` và `modalityBridgeCacheMaxEntries`.

### Video Bridge (`videoBridge.ts`, `videoBridgePipeline.ts`)

Chặn các phần video cấp cao nhất trong `messages` của Chat Completions và `input` của Responses
API trước khi gọi một đích không được biết là có hỗ trợ video gốc.
Các dạng được hỗ trợ là `input_video`, `video_url`, `video_source`, URL HTTPS
và URI dữ liệu `data:video/*;base64,...`. Tên tệp thuần túy trong văn bản không được xem
là video.

`VideoBridgeGuardrail.preCall` (`videoBridge.ts`) đảm nhiệm việc duyệt yêu cầu,
kiểm tra khả năng/chính sách, tổng hợp theo từng yêu cầu và tải trọng phản hồi.
Công việc trên từng video — thu nhận, bộ nhớ đệm toàn bộ kết quả, mô tả một chuỗi
khung hình (kết hợp mọi bản chép lời âm thanh do bên gọi khai báo), cùng với
số liệu/việc hủy/dọn dẹp cho từng lần thử — được ẩn sau `processVideoPart` trong
`videoBridgePipeline.ts`, được gọi một lần cho mỗi phần video bên trong vòng lặp của `preCall`.
Mô-đun đó cũng định nghĩa các ranh giới cổng rõ ràng `VideoMediaBrokerPort`
(thu nhận byte và trích xuất các khung hình được lấy mẫu), `VideoAudioTranscriptionPort`
(kết hợp bản chép lời âm thanh do bên gọi khai báo với các chú thích của khung hình được lấy mẫu) và
`VideoDrilldownPort` (ranh giới lưu trữ cho việc đi sâu vào khung hình; chưa được nối
vào `processVideoPart` — hiện nay chỉ tuyến `/api/modality-bridge/video/drilldown`
riêng biệt ghi các mục đi sâu).

Đường dẫn yêu cầu `/v1` công khai không bao giờ nhập hoặc gọi một tiến trình con. Video
từ xa được tải xuống với giới hạn 50 MiB; video base64 nội tuyến có giới hạn giải mã
thận trọng là 36 MiB cho mỗi video để phần bao bọc mô hình/thông điệp/định khung
có thể nằm trong giới hạn tiếp nhận yêu cầu JSON công khai là 50 MiB. Độ dài nội tuyến
và kích thước giải mã ước tính được kiểm tra trước khi cấp phát. HTTPS là bắt buộc
đối với URL từ xa ban đầu và mọi lần chuyển hướng, sử dụng cơ chế bảo vệ truy cập ra ngoài
chỉ-công-khai hiện có với tính năng ghim DNS. Sau đó, các byte đi qua chính xác ranh giới trình môi giới nội bộ
`POST /api/modality-bridge/video/extract`. Tuyến đó vừa là
`LOCAL_ONLY` vừa là `SPAWN_CAPABLE`, chỉ chấp nhận yêu cầu loopback đáng tin cậy,
được xác thực theo từng tiến trình và không bao giờ chấp nhận URL, đường dẫn hệ thống tệp, tệp thực thi
hoặc danh sách đối số. Quy trình kích thước nội dung API và trình đọc nội dung tăng dần
của trình xử lý thực thi độc lập giới hạn đầu vào trình môi giới ở mức 50 MiB. Hàng đợi có giới hạn
của nó chạy mỗi lần một tác vụ trích xuất, cho phép bốn tác vụ đang chờ và giới hạn tổng đầu vào
đang chờ ở mức 100 MiB.

Bên trong trình môi giới, `ffprobe` đọc một tệp cục bộ riêng tư; danh sách định dạng cho phép
cố định loại trừ các định dạng danh sách phát và tệp kê khai. Đối với các vùng chứa thuộc họ MOV
được cho phép, các tham chiếu dữ liệu MOV bên ngoài vẫn bị tắt theo mặc định và lệnh
cố định không bật chúng. Cả `ffprobe` và `ffmpeg` đều sử dụng danh sách giao thức cho phép
chỉ gồm `file`, một luồng, các mảng đối số cố định, không có shell và các tệp thực thi
được phân giải từ `PATH`. Luồng ảnh bìa được đính kèm không phải là ứng viên có thể phát.
Tất cả luồng có thể phát phải đáp ứng các giới hạn, và một luồng mặc định được chỉ định rõ ràng
được ưu tiên trước phương án dự phòng có chỉ mục thấp nhất mang tính xác định. Video bị giới hạn
ở 600 giây, 8.192 pixel cho mỗi chiều và 33.554.432 pixel nguồn. FFmpeg lấy mẫu
1–16 khung hình JPEG tại điểm giữa, giảm tỷ lệ cạnh dài xuống tối đa 1.024 pixel mà không
phóng to đầu vào nhỏ hơn, và không bao giờ nhận URL. Chính sách lấy mẫu mặc định là `uniform`.
Các chính sách `scene_aware` tùy chọn và `segment_aware` thử nghiệm thực hiện thêm một
lượt FFmpeg cố định trên luồng cục bộ đã được xác thực, chọn các dấu thời gian cảnh `showinfo`
có giới hạn và dự phòng một cách xác định về cùng các điểm giữa đồng đều khi bộ phát hiện
bị lỗi, hết thời gian, tạo đầu ra sai định dạng hoặc tập hợp ứng viên trống.
Chế độ nhận biết phân đoạn phân bổ các mẫu điểm giữa theo tỷ lệ với các khoảng cảnh đã được
xác thực; bằng chứng và hành vi dự phòng của chế độ nhận biết phân đoạn được trình bày chi tiết
bên dưới. Giới hạn cứng 16 khung hình được áp dụng sau khi lựa chọn trong mọi chính sách.
Khi yêu cầu nhận biết cảnh chỉ có ngân sách một khung hình, nó sử dụng điểm giữa đồng đều
của toàn bộ video đang hoạt động hoặc cửa sổ tiêu điểm và báo cáo `policyEffective: uniform`:
một khung hình cảnh duy nhất được chọn không thể bảo toàn cả hai đầu thời gian. Bên gọi có thể
tùy ý cung cấp một cửa sổ tiêu điểm hữu hạn (`start`/`end` tính bằng giây); các giới hạn được
kẹp theo thời lượng phương tiện, cửa sổ đảo ngược hoặc không hữu hạn bị từ chối, và mọi chính sách
lấy mẫu chỉ được thực hiện bên trong khoảng đã chuẩn hóa. Cửa sổ kết quả được đưa vào siêu dữ liệu
lấy mẫu và tiền tố mô tả không đáng tin cậy để các mô hình hạ nguồn có thể phân biệt một đoạn trích
được tập trung với toàn bộ dòng thời gian.

Tiêu điểm chú thích ngữ nghĩa là một cài đặt riêng biệt, rõ ràng. Chế độ phân tích `full`
mặc định giữ nguyên lời nhắc khung hình hiện có và không bao giờ chuyển tiếp văn bản yêu cầu
đến mô hình chú thích. Ở chế độ `focused`, cầu nối chỉ đọc `text`/`input_text` mới nhất,
không trống và do người dùng tạo từ cùng vùng chứa Chat hoặc Responses, chuẩn hóa nó thành NFC,
thu gọn các ký tự điều khiển và khoảng trắng, đồng thời giới hạn ở 500 điểm mã Unicode.
Kết quả trống sẽ quay về lời nhắc `full` chính xác. Một gợi ý có thể sử dụng được sẽ được
tuần tự hóa dưới dạng JSON trong một khối ngữ cảnh người dùng không đáng tin cậy chuyên dụng
và chỉ có thể ưu tiên các chi tiết có thể quan sát; nó không thể ghi đè cảnh báo riêng biệt
về việc không làm theo các hướng dẫn hiển thị hoặc có thể nghe thấy trong phương tiện.
Tiêu điểm văn bản không bao giờ suy luận `start`/`end` hoặc thay đổi bộ lấy mẫu theo thời gian.

#### Bằng chứng phân đoạn cấu trúc FU-07

`segment_aware` sử dụng một lượt tiền phân tích có giới hạn trên luồng video cục bộ
đã được xác thực. Chuỗi bộ lọc cố định trước tiên thu nhỏ xuống tối đa 320 pixel
chiều rộng, phát hiện thay đổi cảnh và các khoảng đóng băng, sau đó lấy mẫu ở tốc độ
1 khung hình mỗi giây để đo độ mờ, độ chói trung bình và thông tin không gian/thời gian.
Lượt này được giới hạn ở 600 mẫu cấu trúc, một luồng FFmpeg/bộ lọc, cùng giao thức
chỉ gồm `file` và các danh sách vùng chứa cho phép, giới hạn đầu ra tiến trình 1 MiB,
và tối đa 30 giây trong thời hạn/hủy dùng chung của trình môi giới. Nó không bao giờ
chấp nhận lệnh, bộ lọc, đường dẫn hoặc URL từ yêu cầu.

Các giá trị cấu trúc là bằng chứng lấy mẫu mang tính xác định, không phải khả năng
hiểu ngữ nghĩa video. Chúng không suy luận chủ thể, hành động, chú thích, lời nói hay
ý định của người dùng. Các ranh giới cảnh và trạng thái đóng băng tạo thành các phân
đoạn; phạm vi đóng băng, độ mờ, độ phơi sáng, chi tiết không gian và thay đổi theo
thời gian chỉ ảnh hưởng đến cách phân bổ ngân sách hiện có từ 1–16 khung hình. Một
phân đoạn đóng băng hoàn toàn bị giới hạn ở một khung hình, trong khi các phân đoạn
không đóng băng cạnh tranh cho phần ngân sách còn lại. Khi số lượng ranh giới nhiều
hơn số khung hình, độ bao phủ đồng đều trên dòng thời gian được duy trì để các lần
cắt cảnh nhanh ở đầu không thể che khuất một phân đoạn dài ở cuối. Các ranh giới
cảnh nằm trong độ phân giải phân tích 1 giây của một ranh giới đóng băng sẽ được
hợp nhất.

Bộ lọc bị thiếu, bằng chứng sai định dạng/rỗng, lỗi bộ phát hiện hoặc thời gian chờ
tiền phân tích có giới hạn sẽ chuyển sang chính sách trung điểm đồng đều chính xác.
Việc hủy từ phía bên gọi hoặc hết hạn từ broker không chuyển sang chính sách dự
phòng: nó chấm dứt tiến trình con đang chạy, ngăn việc trích xuất khung hình sau đó
và cây thư mục tạm riêng tư được xóa trong `finally`.

`scripts/perf/video-bridge-fu07-eval.ts` tạo các fixture FFmpeg thực, mang tính xác
định, để đánh giá mức tiết kiệm số lần gọi tạo chú thích sau khi khử trùng lặp, phân
bổ ngân sách cho chuyển động dày đặc, bằng chứng về độ mờ/độ phơi sáng/SI-TI, các lần
cắt cảnh nhanh với phần đuôi dài và các kết quả dương tính giả do mờ dần. Script ghi
lại thời gian thực tế của bước tiền phân tích và, khi `/usr/bin/time` khả dụng, CPU
của tiến trình con cùng RSS đỉnh. Các phép kiểm tra chất lượng của script chỉ là
oracle cấu trúc. Chất lượng thực tế của mô hình tạo chú thích vẫn là `HOLD` vì bộ
kiểm thử này không có endpoint được ủy quyền hoặc bộ đánh giá cố định. Mức tiết kiệm
chi phí cũng vẫn là `HOLD` trừ khi `--caption-cost-per-call-usd` cung cấp một ước tính
dương rõ ràng về chi phí cho mỗi lần gọi; script không bao giờ giả lập bất kỳ kết
quả nào trong số đó.

Mỗi khung hình được giới hạn ở 4 MiB, tổng tất cả khung hình thô ở 23 MiB và phản
hồi broker đã tuần tự hóa ở 32 MiB. Một thư mục tạm riêng tư được xóa trong
`finally`. OmniRoute không đóng gói kèm FFmpeg và không chấp nhận đường dẫn tệp thực
thi tùy chỉnh. Trước khi tạo chú thích, bridge áp dụng một lượt khử trùng lặp hình
ảnh thận trọng: mỗi JPEG được thu nhỏ thành một vùng đệm thang độ xám 16×16 và chỉ
được so sánh với khung hình được giữ lại gần nhất. Khi ngân sách chú thích được yêu
cầu lớn hơn một khung hình, quá trình trích xuất cung cấp một tập ứng viên có giới
hạn, tối đa gấp đôi ngân sách đó và không bao giờ vượt quá 16 khung hình. Giới hạn
được yêu cầu chỉ được áp dụng sau khi khử trùng lặp, trong đó ứng viên đầu tiên và
cuối cùng được chọn vẫn được giữ nguyên trong bước tinh giản cuối cùng khi ngân sách
ít nhất là hai. Chính sách có phiên bản
`grayscale-16x16-mean-cells-v2` sử dụng giá trị lớn hơn giữa độ chênh lệch độ chói
trung bình và tỷ lệ các ô hình thu nhỏ có độ chênh lệch chuẩn hóa ít nhất là 0.05.
Ngưỡng trùng lặp là hằng số 0.04, được chọn để đảm bảo tính dự đoán được thay vì
được cung cấp dưới dạng một thiết lập khi chạy. Tín hiệu phụ có độ tương phản cao
này bảo toàn các chuyển động nhỏ và thay đổi văn bản nhìn thấy được mà phép so sánh
chỉ dựa trên giá trị trung bình có thể che khuất. Lỗi bộ so sánh hoặc bộ giải mã sẽ
chuyển sang chế độ mở và duy trì độ bao phủ. Siêu dữ liệu đầu ra phân biệt các ứng
viên đã trích xuất, các khung hình được sử dụng thành công và các bản trùng lặp hình
ảnh đã bị loại bỏ.

Một phần video được đánh dấu rõ ràng có thể yêu cầu một bảng ảnh liên hệ có dấu thời
gian. Bridge tạo một lưới JPEG tối đa 4 cột và 16 khung hình. Mỗi ô 512 pixel ghi
cứng dấu thời gian nguồn vào một dải có độ tương phản cao ở phía dưới, đồng thời các
dấu thời gian đó vẫn được giữ trong siêu dữ liệu văn bản để phục vụ việc liên kết và
kiểm toán ở hạ nguồn. JPEG hoàn chỉnh vẫn bị giới hạn ở 32 MiB. Nếu `sharp` không
thể giải mã hoặc tổng hợp lưới, bridge sẽ quay về sử dụng các khung hình JPEG riêng
lẻ; thao tác hủy từ phía máy khách vẫn được lan truyền qua thao tác tạo bảng ảnh.

Bằng chứng để đưa vào sử dụng được chủ ý tách biệt khỏi microbenchmark tổng hợp.
`scripts/perf/video-bridge-contact-sheet-eval.ts` định nghĩa một bộ kiểm thử A/B có
đánh phiên bản schema dành cho các mô hình thị giác thực tương thích với OpenAI. Nó
đo số token do nhà cung cấp báo cáo, độ trễ thực tế đầu-cuối (bao gồm cả việc tổng
hợp bảng ảnh), số lần gọi mô hình và mức độ duy trì dữ kiện được định nghĩa trong
manifest. Phản hồi thô của mô hình không được ghi vào báo cáo; chỉ các giá trị băm
SHA-256 và ID dữ kiện khớp được giữ lại. Bộ kiểm thử không thực hiện bất kỳ lệnh gọi
mạng hay mô hình trả phí nào trừ khi `--execute-real` được truyền và `--model`,
`OMNIROUTE_BASE_URL` cùng `OMNIROUTE_API_KEY` được cấu hình. Nếu không có lần chạy
thực được yêu cầu rõ ràng đó, phán quyết có thể đọc bằng máy vẫn là `HOLD`; riêng các
phép đo tải trọng tổng hợp/số lần gọi không phải là bằng chứng để đưa vào sử dụng.

Bên gọi có thể đính kèm một mảng `transcript.cues` tùy chọn vào một phần video được
hỗ trợ khi họ đã có văn bản được căn chỉnh. Mỗi cue phải chứa `text`, một khoảng
`start`/`end` hữu hạn nằm trong thời lượng đã thăm dò và một `source` thuộc danh sách
cho phép (`client`, `embedded` hoặc `audio-bridge`); `confidence` mặc định là `1` và
phải nằm trong khoảng từ `0` đến `1`. Các cue trùng lặp hoàn toàn được hợp nhất.
OmniRoute không bao giờ bắt đầu phiên âm từ siêu dữ liệu này: các cue đã xác thực
được sao chép vào kết quả được mô tả cùng với nguồn, độ tin cậy và khoảng thời gian,
đồng thời được hiển thị như các quan sát không đáng tin cậy bên cạnh chú thích khung
hình. Văn bản không hợp lệ, nằm ngoài phạm vi hoặc không có nguồn gốc sẽ bị từ chối
thay vì được trộn vào luồng chú thích. Trường `source` hiện do bên gọi khai báo,
không được máy chủ xác minh: OmniRoute bắt buộc giá trị phải là một trong ba chuỗi
được phép, nhưng hiện chưa xác nhận bằng mật mã rằng nhãn `embedded` hoặc
`audio-bridge` thực sự đến từ quy trình trích xuất do máy chủ sở hữu. Hãy coi
`source` là một gợi ý không đáng tin cậy cho đến khi cơ chế xác minh đó được triển
khai; không xây dựng các quyết định cấp quyền dựa trên trường này.

Một bên gọi nâng cao có thể cung cấp một track `audioTranscript` đã được ủy quyền sẵn
cho cùng một video. Điểm hợp nhất chạy các quan sát hình ảnh và âm thanh trong
cùng một thời hạn và tín hiệu hủy, sắp xếp chúng trên một dòng thời gian chung, thu gọn
các bản trùng lặp hoàn toàn và báo cáo kết quả một phần khi chỉ một phía thành công.
Một `audioTranscript` không hợp lệ sẽ suy giảm thành kết quả một phần đó — phần mô tả
hình ảnh được giữ lại và nhánh âm thanh ghi nhận một mã lỗi đã được làm sạch —
thay vì khiến toàn bộ video thất bại. Trạng thái khả dụng của từng nhánh, cờ một phần
và các mã lỗi đã được làm sạch được duy trì trong kết quả mô tả, trong siêu dữ liệu
rào chắn (`audioFusionRuns`/`audioFusionPartials`/
`audioFusionFailureCodes`), trong siêu dữ liệu bộ nhớ đệm kết quả và trong các bộ đếm
hợp nhất của bridge. Đường dẫn Video Bridge mặc định không gọi chức năng chuyển giọng nói thành văn bản
hoặc tải xuống bản sao nội dung đa phương tiện thứ hai; nếu không có track tường minh đó, nó vẫn
chỉ xử lý video.

**Lưu giữ bản chép lời (#12150 P1).** Cơ chế này tự động áp dụng bất cứ khi nào
Video Bridge (bản thân là tính năng chủ động bật) kết xuất một đoạn gợi ý từ bản chép lời — không có
cờ lưu giữ riêng. Khi một yêu cầu kết xuất bất kỳ đoạn gợi ý nào từ bản chép lời (một
`transcript` do bên gọi khai báo hoặc một `audioTranscript` đã hợp nhất), rào chắn đánh dấu yêu cầu đó là
`videoBridgeObserved` và tạo ra một bản bóng đã được biên tập của phần mô tả video —
một bản kết xuất giống hệt, trong đó phần nội dung văn bản tự do của mọi đoạn gợi ý được thay thế bằng
`[redacted-video-transcript]`, được tạo bằng cách thay thế trường đoạn gợi ý có cấu trúc
trước khi chuỗi được ghép lại (tuyệt đối không phân tích văn bản đã được làm phẳng, nhờ đó không có
nội dung đoạn gợi ý nào — dù mang tính đối kháng hay thông thường, bao gồm cả nội dung chứa `]` như
`[inaudible]`/`[music]` — có thể còn sót lại). Nội dung yêu cầu trong nhật ký lệnh gọi được lưu bền vững
thay mỗi phần văn bản bắt nguồn từ video bằng bản bóng đã được biên tập đó, được đối sánh theo tính
bằng nhau của nội dung; neo `fullText` được đọc lại từ payload rào chắn hoàn tất trước lệnh gọi,
nhờ đó phép đối sánh vẫn thành công sau khi các rào chắn chuỗi phía sau (các bộ che PII và
thông tin xác thực, với mức ưu tiên 10/95) viết lại văn bản mô tả tại chỗ và
sau khi việc chèn lời nhắc hệ thống/chuyển giao/bộ nhớ định hình lại mảng thông điệp. Phần
nội dung được gửi ngược dòng đến mô hình không thay đổi. Một yêu cầu đã được quan sát cũng không điền
dữ liệu vào Memory bền vững nào (cả quá trình trích xuất bắt nguồn từ yêu cầu lẫn phản hồi đều bị bỏ qua),
vì vậy chính phản hồi của mô hình không thể lặp lại văn bản bản chép lời vào Memory.

Các bề mặt lưu giữ vẫn còn mở và được theo dõi để xử lý tiếp (**P2**, #12430): ảnh chụp nhanh thô
của yêu cầu máy khách trước rào chắn trong hiện vật nhật ký chi tiết;
cơ chế tiếp tục `previous_response_id` đóng khi xảy ra lỗi; các lần điều phối nội bộ của
lời nhắc phái sinh nhúng bản chép lời bên trong một lời nhắc chuỗi đã tổng hợp
(các giai đoạn pipeline, chuyển giao ngữ cảnh); và phần nội dung phản hồi / bản sao bộ nhớ đệm ngữ nghĩa
của phản hồi mô hình trích dẫn bản chép lời. Đây là các bề mặt thuộc lớp thô/phản hồi hoặc
chủ động bật, nằm ngoài phạm vi phần nội dung yêu cầu được lưu bền vững + Memory của P1.

Vòng đời nội bộ `/api/modality-bridge/video/drilldown` là một hạ tầng bộ nhớ đệm
riêng biệt, được xác thực bằng loopback/token. Mỗi thao tác cũng yêu cầu một
ID principal mờ đục chuẩn tắc. Trước khi một bên gọi trong môi trường production được bật,
bên đó phải suy ra ID này từ tenant đã xác thực và tuyệt đối không được chuyển tiếp một
giá trị do máy khách lựa chọn. Các khóa bộ nhớ đệm liên kết principal đó với các ID phiên và
tham chiếu video chuẩn tắc, chỉ lưu các khóa được suy ra bằng SHA-256 của chúng và giới hạn cả thao tác đọc
lẫn xóa trong cùng principal. Bộ nhớ đệm lưu tối đa 16 khung hình JPEG phái sinh
cho mỗi mục, cho chúng hết hạn sau mười phút và hỗ trợ thao tác đọc `start`/`end`
có giới hạn hoặc xóa phiên một cách tường minh.

Mỗi principal bị giới hạn ở 16 mục và 64 MiB dữ liệu JPEG chuẩn tắc. Các
giới hạn này độc lập với mức trần toàn cục 64 mục/256 MiB: áp lực hạn ngạch
principal chỉ loại bỏ các mục ít được dùng gần đây nhất của chính principal đó trước khi
xem xét loại bỏ theo LRU toàn cục. Các mục hết hạn được loại khỏi cả phần tính toán theo principal
lẫn toàn cục khi có hoạt động bộ nhớ đệm, trong khi việc hủy và lỗi xác thực không
commit một bản thay thế chưa hoàn chỉnh.

Bộ nhớ đệm từ chối Base64 không chuẩn tắc, phần đệm dư thừa, nội dung đa phương tiện không phải JPEG, JPEG
sai định dạng hoặc bị cắt ngắn, cũng như JPEG tạo ra cảnh báo trong quá trình giải mã toàn bộ hình ảnh
có giới hạn bằng `sharp`. Bộ nhớ đệm mã hóa lại mỗi hình ảnh được chấp nhận thành JPEG chuẩn tắc, suy ra
chiều rộng và chiều cao từ các byte đã giải mã thay vì tin tưởng các trường do bên gọi cung cấp,
đồng thời loại bỏ mọi byte polyglot theo sau thay vì lưu giữ chúng. Chỉ bộ đệm nén
chuẩn tắc có giới hạn mới được tính vào cả hai hạn ngạch. Giới hạn truyền tải JSON bao gồm phần dung lượng
phụ trội của Base64 cho mức trần đầu vào đã giải mã là 32 MiB. Mỗi
dữ liệu phái sinh được lưu đều ghi lại định dạng/độ phân giải JPEG đã được xác thực, chính sách lấy mẫu,
phiên bản phái sinh, thời điểm tạo, hàm băm nội dung do máy chủ tính toán và tham chiếu cha
đã băm cùng hàm băm nội dung cha của bên gọi đáng tin cậy. Trạng thái hủy được kiểm tra
giữa các giai đoạn giải mã/băm bất đồng bộ trước khi commit nguyên tử vào bộ nhớ đệm.

Đợt triển khai này chưa kết nối producer production với route và chưa
cung cấp khả năng lựa chọn biến thể đa độ phân giải. Do đó, đường dẫn yêu cầu Video Bridge
trong suốt không phát sinh thêm công việc, còn việc suy ra principal gắn với tenant và
toàn bộ vòng đời đa độ phân giải FU-08 vẫn là công việc tiếp theo tường minh thay vì
được ghi nhận trong tài liệu như hành vi đã hoàn tất.

Các khung hình được tạo chú thích tuần tự bằng mô hình Video đã cấu hình. Cấu hình ghi đè Video để trống sẽ kế thừa thiết lập Vision; nếu cả hai đều trống, bộ định tuyến tự động của Vision sẽ chọn mô hình hỗ trợ thị giác có hiệu lực. Các chú thích thành công sẽ thay thế phần ban đầu bằng tiền tố ổn định `[Video description:`, đồng thời đánh dấu văn bản là một quan sát không đáng tin cậy được suy ra từ nội dung đa phương tiện và yêu cầu các mô hình phía sau không làm theo những chỉ dẫn tìm thấy trong nội dung đó. Khóa bộ nhớ đệm chú thích khung hình bao gồm các byte JPEG, lời nhắc, dấu thời gian và mô hình có hiệu lực; chỉ các chú thích thành công mới được lưu vào bộ nhớ đệm. Các mục trong bộ nhớ đệm lưu lại mô hình thực sự đã tạo thành công, bao gồm cả mô hình dự phòng; cầu nối báo cáo `mixed` khi các khung hình khác nhau được tạo bởi những mô hình khác nhau. Khi truy cập trúng bộ nhớ đệm, danh tính của mô hình tạo đó được sử dụng lại thay vì bị gắn nhãn lại thành kế hoạch định tuyến được yêu cầu. Bộ nhớ đệm kết quả cho toàn bộ video được lập khóa dựa trên mọi đầu vào làm thay đổi đầu ra — lời nhắc, mô hình có hiệu lực, chính sách lấy mẫu, số lượng khung hình, chế độ phân tích ngữ nghĩa, dấu vân tay SHA-256 của gợi ý trọng tâm đã chuẩn hóa, cửa sổ trọng tâm, `transcript`, `audioTranscript` và cờ bảng liên hợp ảnh — vì vậy, việc thay đổi bất kỳ phương diện nào trong số đó đều dẫn đến trượt bộ nhớ đệm, tuyệt đối không tái sử dụng dữ liệu cũ. Phiên bản chính sách khử trùng lặp hình ảnh, ngưỡng và số lượng khung hình ứng viên bị giới hạn cũng được ghi rõ trong khóa và siêu dữ liệu của bộ nhớ đệm kết quả; do đó, thay đổi chính sách không thể tái sử dụng mô tả cũ của toàn bộ video. Siêu dữ liệu bộ nhớ đệm kết quả v4 lưu chế độ và dấu vân tay, không bao giờ lưu tác vụ thô của người dùng. Siêu dữ liệu cơ chế bảo vệ báo cáo cả chế độ phân tích được yêu cầu lẫn chế độ có hiệu lực; chế độ `focused` được yêu cầu nhưng không có văn bản người dùng khả dụng sẽ được báo cáo là có hiệu lực ở chế độ `full`.

Cơ chế bảo vệ trích xuất mọi phần video được hỗ trợ nhưng không mô tả quá `modalityBridgeVideoMaxVideos`. Đối với một đích đã được xác nhận có `supportsVideo === false`, các video xử lý thất bại và vượt giới hạn sẽ trở thành những dấu văn bản an toàn rõ ràng để không còn video thô nào tồn tại. Khi chưa xác định được khả năng hỗ trợ, các phần đó vẫn được giữ nguyên. Những đích có `supportsVideo === true` sẽ bỏ qua cầu nối. Tín hiệu hủy yêu cầu của máy khách được truyền qua quá trình tải xuống, hàng đợi của bộ môi giới, các tiến trình con và các lệnh gọi tạo chú thích; thao tác hủy sẽ dừng giữa các video và không bao giờ bỏ qua lỗi để cho phép nội dung đa phương tiện thô đi qua.

Các thiết lập thời gian chạy được lưu trong DB và xác thực bằng Zod:

| Khóa                                | Mặc định    | Phạm vi / hành vi                                                                                                    |
| ----------------------------------- | ----------- | -------------------------------------------------------------------------------------------------------------------- |
| `modalityBridgeVideoEnabled`        | `false`     | Thời gian chạy tùy chọn, phải chủ động bật                                                                           |
| `modalityBridgeVideoAnalysisMode`   | `"full"`    | `full` giữ nguyên chú thích chung; `focused` sử dụng ngữ cảnh người dùng mới nhất, bị giới hạn và không đáng tin cậy |
| `modalityBridgeVideoModel`          | `""`        | Kế thừa mô hình Vision Bridge                                                                                        |
| `modalityBridgeVideoFrameCount`     | `8`         | 1–16                                                                                                                 |
| `modalityBridgeVideoSamplingPolicy` | `"uniform"` | `uniform`, `scene_aware` hoặc `segment_aware` theo tỷ lệ; nếu bộ phát hiện thất bại thì quay về `uniform`            |
| `modalityBridgeVideoMaxVideos`      | `1`         | 1–4                                                                                                                  |
| `modalityBridgeVideoTimeout`        | `120000`    | 1000–120000 ms                                                                                                       |

Các giá trị thời gian chờ Video cũ đã lưu vượt quá 120 giây được giới hạn về thời hạn của bộ môi giới; các lần ghi thiết lập mới vượt quá giới hạn đó sẽ bị từ chối. `GET /api/modality-bridge/video/runtime` yêu cầu vị trí loopback đáng tin cậy đã được đóng dấu trước khi xác thực hoặc thăm dò thời gian chạy, sau đó yêu cầu xác thực quản trị. Điểm cuối này chỉ trả về `available`, các phiên bản FFmpeg/ffprobe đã được làm sạch và một lý do cố định khi thời gian chạy không khả dụng. Điểm cuối trích xuất nội bộ không phải là API tải lên công khai: tình trạng bão hòa hàng đợi trả về `503` cùng với `Retry-After`, việc bên gọi ngắt kết nối trả về `499`, còn thời hạn cố định của bộ môi giới trả về `504`. Các phản hồi đã chuyển đổi thêm `video->text;model=<visionModel>;parts=<videos>` vào tiêu đề trung tâm `x-omniroute-modality-bridge` mà không loại bỏ các phân đoạn Vision hoặc Audio.

### Trình che PII (`piiMasker.ts`)

Chạy ở **cả hai** giai đoạn.

- **`preCall`** sao chép payload, duyệt qua `system`, `messages`, `input` và `prompt` (bao gồm cả các mục chuỗi thuần túy), rồi áp dụng `processPII()` (từ `@/shared/utils/inputSanitizer`) cho các trường chuỗi `content`/`text`. Khi `PII_REDACTION_ENABLED=true`, PII được phát hiện sẽ bị che trong payload gửi đi. Việc này độc lập với `INPUT_SANITIZER_MODE` (biến này chỉ kiểm soát chính sách chống tiêm nhiễm lời nhắc). Khi tính năng che dữ liệu bị tắt, lệnh gọi sẽ ghi lại số lượng phát hiện mà không viết lại nội dung.
- **`postCall`** sao chép sâu phản hồi, chạy `sanitizePIIResponse()` cùng với trình che theo cấu trúc Responses API (`maskResponsesOutput` — bao phủ `output_text` và `output[].content[].text`). Nếu xảy ra bất kỳ thao tác che nào, phản hồi đã chỉnh sửa sẽ thay thế phản hồi ban đầu.

Cơ chế bảo vệ không bao giờ chặn; nó chỉ chú thích (`meta.detections`, `meta.redacted`) hoặc viết lại.

### Tiêm nhiễm lời nhắc (`promptInjection.ts`)

Phát hiện các cấu trúc đối nghịch trong nội dung do người dùng cung cấp và thực thi chính sách đã cấu hình. Hành vi được điều khiển bởi các biến môi trường và tùy chọn hàm khởi tạo:

| Cài đặt     | Biến môi trường                                                                                           | Mặc định | Tác dụng                                                                                                                                                                                                               |
| ----------- | --------------------------------------------------------------------------------------------------------- | -------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Kích hoạt   | `INPUT_SANITIZER_ENABLED`                                                                                 | `true`   | Khi là `false`, cơ chế bảo vệ sẽ bỏ qua quá trình xử lý.                                                                                                                                                               |
| Chế độ      | `INJECTION_GUARD_MODE` / `INPUT_SANITIZER_MODE`                                                           | `warn`   | Chính sách chống chèn lệnh: `block`, `warn` hoặc `log`. (`redact` được chấp nhận để tương thích ngược nhưng **không** loại bỏ văn bản chèn lệnh; việc ghi lại PII trong yêu cầu do `PII_REDACTION_ENABLED` kiểm soát.) |
| Ngưỡng chặn | tùy chọn `blockThreshold` / `INPUT_SANITIZER_BLOCK_THRESHOLD` (bí danh `INJECTION_GUARD_BLOCK_THRESHOLD`) | `high`   | Mức độ nghiêm trọng tối thiểu cần thiết để chặn. Theo mặc định, mức trung bình chỉ được quan sát.                                                                                                                      |

**Thứ tự ưu tiên chế độ** (`getMode`): `options.mode` của bên gọi →
**giá trị ghi đè bằng cờ tính năng trong DB** của `INJECTION_GUARD_MODE` (Bảng điều khiển → Cài đặt →
Cờ tính năng) → biến môi trường `INJECTION_GUARD_MODE` → biến môi trường `INPUT_SANITIZER_MODE` →
`warn`. Do đó, giá trị ghi đè từ bảng điều khiển được ưu tiên hơn các biến môi trường, vì vậy giao diện
Cờ tính năng có thể điều khiển trực tiếp cơ chế bảo vệ đang chạy (không cần khởi động lại). Việc đọc DB có cơ chế an toàn khi lỗi:
nếu xảy ra lỗi, cơ chế bảo vệ sẽ quay về hành vi dựa trên biến môi trường; và khi không đặt
giá trị ghi đè, hành vi sẽ giống hệt cách phân giải chỉ dựa trên biến môi trường.

Các nguồn phát hiện:

1. `sanitizeRequest()` từ `@/shared/utils/inputSanitizer` (tập hợp bộ phát hiện dùng chung
   được sử dụng ở những nơi khác trong quy trình).
2. `DEFAULT_GUARD_PATTERNS` tích hợp sẵn (hiện gồm `system_override_inline` và
   `markdown_system_block`, cả hai đều có mức độ nghiêm trọng `high`).
3. `customPatterns` tùy chọn được truyền qua các tùy chọn của hàm khởi tạo (chuỗi, biểu thức chính quy
   hoặc các bản ghi `{ name, pattern, severity }`).

Khi `mode === "block"` **và** có ít nhất một kết quả phát hiện đạt ngưỡng mức độ nghiêm trọng,
`preCall` trả về `{ block: true, message: "Request rejected:
suspicious content detected" }`. Trong các chế độ `warn`/`log`, cơ chế bảo vệ ghi nhật ký nhưng
vẫn cho phép lệnh gọi. Hàm trợ giúp dùng chung `evaluatePromptInjection()` cũng được xuất
cho các bên gọi cần đánh giá prompt mà không thông qua registry.

**Giới hạn quét (v3.8.20):** bộ phát hiện chỉ kiểm tra **16 KB đầu tiên** của
văn bản prompt đã nối — `MAX_INJECTION_SCAN_BYTES = 16 * 1024` (16 384 byte) trong
`src/shared/utils/inputSanitizer.ts`. Cả `detectInjection()` và
`evaluatePromptInjection()` đều thực hiện `slice(0, MAX_INJECTION_SCAN_BYTES)` trước khi chạy
vòng lặp mẫu. Các chỉ thị chèn lệnh thường nằm gần đầu dữ liệu đầu vào, vì vậy điều này
giới hạn mức sử dụng CPU/GC của regex đối với các payload có kích thước hàng trăm KB mà không làm suy yếu khả năng phát hiện (xem
#3932, #4041).

### Trình che thông tin xác thực (`credentialMasker.ts`)

Chạy ở **cả hai** giai đoạn, ở vị trí cuối cùng trong chuỗi mặc định (độ ưu tiên `95`). Che
các mẫu khóa API / token bí mật phổ biến khỏi payload gửi đi (nội dung thông báo,
đối số lệnh gọi công cụ, kết quả công cụ) **và** phản hồi của nhà cung cấp, để thông tin
xác thực được dán vào prompt (hoặc được kết quả công cụ trả lại) không bị rò rỉ
đến nhà cung cấp thượng nguồn hoặc quay lại máy khách.

- **Chỉ bật khi chủ động chọn**, theo cùng quy ước với việc che PII (gần với Quy tắc cứng #20):
  bị vô hiệu hóa trừ khi `settings.credentialRedactionEnabled === true` **hoặc**
  `CREDENTIAL_REDACTION_ENABLED=true`. Khi bị tắt, cơ chế bảo vệ không thực hiện thao tác nào —
  không bao giờ chặn và không bao giờ ghi lại.
- `redactCredentials()` duyệt toàn bộ cây payload/phản hồi (`walkValue()`,
  an toàn trước ô nhiễm prototype, an toàn với chu trình thông qua `WeakSet`) và thay thế các kết quả khớp bằng
  phần giữ chỗ `[REDACTED:<type>]`, chỉ sao chép các nhánh thực sự
  thay đổi.
- `CREDENTIAL_PATTERNS` bao quát các khóa của nhà cung cấp LLM (OpenAI, OpenAI-proj,
  Anthropic, Google, Hugging Face, Replicate), token VCS/SaaS (GitHub, Slack,
  Linear, Notion, npm, Postman, Discord), khóa thanh toán (Stripe, Square), khóa đám mây
  (khóa truy cập AWS, Twilio, SendGrid, Mailgun), khóa riêng tư / JWT,
  chuỗi kết nối chứa thông tin xác thực (`mongodb://user:pass@...`, v.v.) và
  một mẫu chung cho giá trị header `Authorization`/`x-api-key`/`api-key`/`apikey`.
  Các khóa có dạng header (`authorization`, `x-api-key`, `api-key`,
  `apikey`) được che theo cấu trúc (chỉ giá trị, giữ nguyên tiền tố cơ chế như
  `Bearer `/`Basic `) thay vì thông qua regex văn bản chung.
- Cơ chế bảo vệ không bao giờ chặn; nó chỉ ghi lại (`modifiedPayload` /
  `modifiedResponse`) và chú thích (`meta.credentialsRedacted`, `meta.count`).

Kiểm thử chống hồi quy: `tests/unit/credential-masker-guardrail.test.ts`.

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
