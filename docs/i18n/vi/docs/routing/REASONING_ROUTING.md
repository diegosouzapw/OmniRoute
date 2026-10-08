# Reasoning Routing (Tiếng Việt)

🌐 **Languages:** 🇺🇸 [English](../../../../routing/REASONING_ROUTING.md) · 🇪🇹 [am](../../../am/docs/routing/REASONING_ROUTING.md) · 🇸🇦 [ar](../../../ar/docs/routing/REASONING_ROUTING.md) · 🇦🇿 [az](../../../az/docs/routing/REASONING_ROUTING.md) · 🇧🇬 [bg](../../../bg/docs/routing/REASONING_ROUTING.md) · 🇧🇩 [bn](../../../bn/docs/routing/REASONING_ROUTING.md) · 🇧🇦 [bs](../../../bs/docs/routing/REASONING_ROUTING.md) · 🇨🇿 [cs](../../../cs/docs/routing/REASONING_ROUTING.md) · 🇩🇰 [da](../../../da/docs/routing/REASONING_ROUTING.md) · 🇩🇪 [de](../../../de/docs/routing/REASONING_ROUTING.md) · 🇬🇷 [el](../../../el/docs/routing/REASONING_ROUTING.md) · 🇪🇸 [es](../../../es/docs/routing/REASONING_ROUTING.md) · 🇪🇪 [et](../../../et/docs/routing/REASONING_ROUTING.md) · 🇮🇷 [fa](../../../fa/docs/routing/REASONING_ROUTING.md) · 🇫🇮 [fi](../../../fi/docs/routing/REASONING_ROUTING.md) · 🇫🇷 [fr](../../../fr/docs/routing/REASONING_ROUTING.md) · 🇮🇪 [ga](../../../ga/docs/routing/REASONING_ROUTING.md) · 🇮🇳 [gu](../../../gu/docs/routing/REASONING_ROUTING.md) · 🇳🇬 [ha](../../../ha/docs/routing/REASONING_ROUTING.md) · 🇮🇱 [he](../../../he/docs/routing/REASONING_ROUTING.md) · 🇮🇳 [hi](../../../hi/docs/routing/REASONING_ROUTING.md) · 🇭🇷 [hr](../../../hr/docs/routing/REASONING_ROUTING.md) · 🇭🇺 [hu](../../../hu/docs/routing/REASONING_ROUTING.md) · 🇦🇲 [hy](../../../hy/docs/routing/REASONING_ROUTING.md) · 🇮🇩 [id](../../../id/docs/routing/REASONING_ROUTING.md) · 🇳🇬 [ig](../../../ig/docs/routing/REASONING_ROUTING.md) · 🇮🇹 [it](../../../it/docs/routing/REASONING_ROUTING.md) · 🇯🇵 [ja](../../../ja/docs/routing/REASONING_ROUTING.md) · 🇬🇪 [ka](../../../ka/docs/routing/REASONING_ROUTING.md) · 🇰🇭 [km](../../../km/docs/routing/REASONING_ROUTING.md) · 🇮🇳 [kn](../../../kn/docs/routing/REASONING_ROUTING.md) · 🇰🇷 [ko](../../../ko/docs/routing/REASONING_ROUTING.md) · 🇱🇹 [lt](../../../lt/docs/routing/REASONING_ROUTING.md) · 🇱🇻 [lv](../../../lv/docs/routing/REASONING_ROUTING.md) · 🇮🇳 [ml](../../../ml/docs/routing/REASONING_ROUTING.md) · 🇮🇳 [mr](../../../mr/docs/routing/REASONING_ROUTING.md) · 🇲🇾 [ms](../../../ms/docs/routing/REASONING_ROUTING.md) · 🇲🇹 [mt](../../../mt/docs/routing/REASONING_ROUTING.md) · 🇲🇲 [my](../../../my/docs/routing/REASONING_ROUTING.md) · 🇳🇵 [ne](../../../ne/docs/routing/REASONING_ROUTING.md) · 🇳🇱 [nl](../../../nl/docs/routing/REASONING_ROUTING.md) · 🇳🇴 [no](../../../no/docs/routing/REASONING_ROUTING.md) · 🇮🇳 [or](../../../or/docs/routing/REASONING_ROUTING.md) · 🇮🇳 [pa](../../../pa/docs/routing/REASONING_ROUTING.md) · 🇵🇭 [phi](../../../phi/docs/routing/REASONING_ROUTING.md) · 🇵🇱 [pl](../../../pl/docs/routing/REASONING_ROUTING.md) · 🇵🇹 [pt](../../../pt/docs/routing/REASONING_ROUTING.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/routing/REASONING_ROUTING.md) · 🇷🇴 [ro](../../../ro/docs/routing/REASONING_ROUTING.md) · 🇷🇺 [ru](../../../ru/docs/routing/REASONING_ROUTING.md) · 🇱🇰 [si](../../../si/docs/routing/REASONING_ROUTING.md) · 🇸🇰 [sk](../../../sk/docs/routing/REASONING_ROUTING.md) · 🇸🇮 [sl](../../../sl/docs/routing/REASONING_ROUTING.md) · 🇷🇸 [sr](../../../sr/docs/routing/REASONING_ROUTING.md) · 🇸🇪 [sv](../../../sv/docs/routing/REASONING_ROUTING.md) · 🇰🇪 [sw](../../../sw/docs/routing/REASONING_ROUTING.md) · 🇮🇳 [ta](../../../ta/docs/routing/REASONING_ROUTING.md) · 🇮🇳 [te](../../../te/docs/routing/REASONING_ROUTING.md) · 🇹🇭 [th](../../../th/docs/routing/REASONING_ROUTING.md) · 🇹🇷 [tr](../../../tr/docs/routing/REASONING_ROUTING.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/routing/REASONING_ROUTING.md) · 🇵🇰 [ur](../../../ur/docs/routing/REASONING_ROUTING.md) · 🇺🇿 [uz](../../../uz/docs/routing/REASONING_ROUTING.md) · 🇳🇬 [yo](../../../yo/docs/routing/REASONING_ROUTING.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/routing/REASONING_ROUTING.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/routing/REASONING_ROUTING.md)

---

Các quy tắc định tuyến suy luận mở rộng cơ chế định tuyến theo model và combo hiện có. Khi không có quy tắc đang hoạt động nào khớp,
các hành vi hiện có về thinking, suffix, giá trị mặc định của kết nối và chuyển đổi theo provider vẫn
không thay đổi.

## Quản lý

Tính năng quản lý quy tắc có tại **Settings → Global Routing**. Trình chỉnh sửa API key cung cấp cùng
giao diện quản lý, được lọc theo key đã chọn.

API quản lý được cung cấp qua các route sau:

- `GET` và `POST` tại `/api/settings/reasoning-routing-rules`
- `GET`, `PATCH` và `DELETE` tại `/api/settings/reasoning-routing-rules/[id]`
- `POST` tại `/api/settings/reasoning-routing-rules/simulate`

Tất cả route đều sử dụng `requireManagementAuth`. Dữ liệu đầu vào được xác thực bằng các schema trong
`src/shared/validation/schemas/reasoningRouting.ts`. Trình mô phỏng không bao giờ thực hiện lệnh gọi đến upstream.

## Phân giải quy tắc

Quá trình đánh giá sớm chọn chính xác một quy tắc. Các phạm vi được kiểm tra theo thứ tự sau:

1. `apiKey`
2. `combo`
3. `model`
4. `global`

Trong một phạm vi, `priority` cao hơn được ưu tiên trước, tiếp theo là model khớp chính xác được ưu tiên hơn mẫu glob,
sau đó là thứ tự ổn định theo `createdAt` và `id`. `requestTags` chỉ được đọc từ `metadata.tags`
và hỗ trợ chế độ khớp `any` hoặc `all`.

Quy tắc `connection` chỉ được đánh giá khi không có quy tắc sớm nào thắng và một kết nối provider cụ thể
đã được chọn. Quy tắc này chỉ có thể thay đổi mức độ nỗ lực và ngân sách.

## Mức độ nỗ lực và ngân sách

`sourceEffort` chấp nhận `any`, `missing`, `none`, `low`, `medium`, `high`, `xhigh`, `max` và
`ultra`. `missing` có nghĩa là request không chứa mức độ nỗ lực rời rạc, nút bật/tắt thinking
hoặc ngân sách thinking. Do đó, tín hiệu chỉ có ngân sách chỉ khớp với `any`.

`effortMode` có ba biến thể:

- `inherit` giữ nguyên mức độ nỗ lực của client trong khi vẫn cho phép thay đổi model hoặc combo.
- `default` chỉ đặt `targetEffort` khi không có tín hiệu suy luận tường minh.
- `force` thay thế mức độ nỗ lực rời rạc bằng `targetEffort`.

Độc lập với cơ chế trên, `budgetAction` có thể là `preserve`, `remove` hoặc `set`. `force` với `none` sẽ xóa
tất cả trường mức độ nỗ lực và ngân sách được nhận diện. `none` kết hợp với `set` là không hợp lệ.

Các request nhắm đến những model đã biết là không tương thích sẽ bị từ chối trước lệnh gọi upstream. Đối với
mục tiêu combo, các mục không tương thích sẽ bị loại bỏ; nếu không còn mục nào, request sẽ trả về trạng thái `400`.
Dữ liệu khả năng không xác định sẽ tạo cảnh báo và quy tắc vẫn được kích hoạt.

## Bảo mật và phương thức truyền tải

Model nguồn và model đích, hoặc combo nguồn và combo đích, vẫn chịu sự điều chỉnh của chính sách API key
hiện có. Quy tắc suy luận không bao giờ mở rộng quyền truy cập model, combo hoặc hạn ngạch.

Engine được tích hợp vào Chat Completions, Responses, Anthropic Messages và đường dẫn
Codex WebSocket nội bộ. Đường dẫn WebSocket chỉ chấp nhận các model đích Codex; không thể thực thi
mục tiêu combo tại đây. Quyết định của quy tắc được lưu trong dấu vết route hiện có mà không chứa thông tin bí mật.

## Lưu trữ lâu dài

Migration `src/lib/db/migrations/126_reasoning_routing_rules.sql` tạo bảng
`reasoning_routing_rules`. Các quy tắc tham chiếu đến API key, combo và kết nối provider đã được lưu trữ.
Việc xóa sẽ dọn dẹp các quy tắc liên quan. Lớp truy cập cơ sở dữ liệu trong
`src/lib/db/reasoningRoutingRules.ts` duy trì một bộ nhớ đệm có thể bị vô hiệu hóa cho đường dẫn request.

Các quy tắc được đưa vào bản sao lưu SQLite, bản xuất toàn bộ cơ sở dữ liệu và gói đồng bộ cấu hình.
`reconcileReasoningRulesForSync` vô hiệu hóa các quy tắc được nhập có tham chiếu bị thiếu và báo cáo các
xung đột đó.
