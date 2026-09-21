# Webhooks (Tiếng Việt)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/WEBHOOKS.md) · 🇪🇹 [am](../../../am/docs/frameworks/WEBHOOKS.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/WEBHOOKS.md) · 🇦🇿 [az](../../../az/docs/frameworks/WEBHOOKS.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/WEBHOOKS.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/WEBHOOKS.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/WEBHOOKS.md) · 🇩🇰 [da](../../../da/docs/frameworks/WEBHOOKS.md) · 🇩🇪 [de](../../../de/docs/frameworks/WEBHOOKS.md) · 🇬🇷 [el](../../../el/docs/frameworks/WEBHOOKS.md) · 🇪🇸 [es](../../../es/docs/frameworks/WEBHOOKS.md) · 🇪🇪 [et](../../../et/docs/frameworks/WEBHOOKS.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/WEBHOOKS.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/WEBHOOKS.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/WEBHOOKS.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/WEBHOOKS.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/WEBHOOKS.md) · 🇮🇱 [he](../../../he/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/WEBHOOKS.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/WEBHOOKS.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/WEBHOOKS.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/WEBHOOKS.md) · 🇮🇩 [id](../../../id/docs/frameworks/WEBHOOKS.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/WEBHOOKS.md) · 🇮🇹 [it](../../../it/docs/frameworks/WEBHOOKS.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/WEBHOOKS.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/WEBHOOKS.md) · 🇰🇭 [km](../../../km/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/WEBHOOKS.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/WEBHOOKS.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/WEBHOOKS.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/WEBHOOKS.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/WEBHOOKS.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/WEBHOOKS.md) · 🇲🇲 [my](../../../my/docs/frameworks/WEBHOOKS.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/WEBHOOKS.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/WEBHOOKS.md) · 🇳🇴 [no](../../../no/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [or](../../../or/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/WEBHOOKS.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/WEBHOOKS.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/WEBHOOKS.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/WEBHOOKS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/WEBHOOKS.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/WEBHOOKS.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/WEBHOOKS.md) · 🇱🇰 [si](../../../si/docs/frameworks/WEBHOOKS.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/WEBHOOKS.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/WEBHOOKS.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/WEBHOOKS.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/WEBHOOKS.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [te](../../../te/docs/frameworks/WEBHOOKS.md) · 🇹🇭 [th](../../../th/docs/frameworks/WEBHOOKS.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/WEBHOOKS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/WEBHOOKS.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/WEBHOOKS.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/WEBHOOKS.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/WEBHOOKS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/WEBHOOKS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/WEBHOOKS.md)

---

> **Nguồn chính xác:** `src/lib/webhookDispatcher.ts`, `src/lib/db/webhooks.ts`, `src/app/api/webhooks/`
> **Cập nhật lần cuối:** 2026-06-28 — v3.8.40

OmniRoute có thể kích hoạt webhook HTTP khi xảy ra các sự kiện trên nền tảng. Hãy sử dụng chúng để tích hợp với
Slack, PagerDuty, Datadog, các dịch vụ cảnh báo nội bộ hoặc bất kỳ trình nhận HTTP nào.

Trình điều phối ký mỗi lần gửi bằng HMAC-SHA256, thử lại khi xảy ra
lỗi tạm thời, theo dõi tình trạng gửi của từng webhook và tự động vô hiệu hóa các endpoint
liên tục gặp lỗi.

## Các sự kiện được hỗ trợ

Kiểu `WebhookEvent` (`src/lib/webhooks/eventDescriptions.ts`, được `src/lib/webhookDispatcher.ts` sử dụng) hiện mô hình hóa chính xác bốn sự kiện:

| Sự kiện             | Kích hoạt khi                                                |
| ------------------- | ------------------------------------------------------------ |
| `request.completed` | Một yêu cầu được proxy hoàn tất thành công                   |
| `request.failed`    | Một yêu cầu được proxy thất bại sau mọi lần thử lại/dự phòng |
| `quota.exceeded`    | Một khóa API vượt qua ngưỡng ngân sách/hạn mức               |
| `test.ping`         | Sự kiện mô phỏng được endpoint kiểm thử sử dụng              |

Các đăng ký chấp nhận giá trị cố định `"*"` để nhận mọi sự kiện. Tên sự kiện
không xác định trong `events` sẽ bị bỏ qua tại thời điểm điều phối.

> Lưu ý: API của trình điều phối đã được kết nối, nhưng các vị trí gọi trong môi trường sản xuất cho một số
> sự kiện không phải `test.ping` vẫn đang được bổ sung. Hãy kiểm tra `grep dispatchEvent` để xem
> những luồng nào hiện đang gọi trình điều phối trong bản phát hành của bạn.

## Kiến trúc

```
Bên gọi (trình xử lý, dịch vụ, trình giám sát)
  dispatchEvent(event, data)            [src/lib/webhookDispatcher.ts]
    -> getEnabledWebhooks()             [src/lib/db/webhooks.ts]
    -> lọc theo webhook.events
    -> với mỗi mục khớp (song song):
       deliverWebhook(url, payload, secret)
         tạo payload { event, timestamp, data }
         ký nội dung bằng HMAC-SHA256 (nếu có secret)
         POST với thời gian chờ 10 giây
         thử lại tối đa 3 lần khi gặp lỗi 5xx / lỗi mạng
       recordWebhookDelivery(id, status, success)
    -> disableWebhooksWithHighFailures(10)
```

Việc điều phối là kiểu gửi rồi không chờ kết quả đối với bên gọi: `Promise.allSettled` bỏ qua
lỗi của từng webhook để một trình nhận bị lỗi không thể chặn các trình nhận khác.

## Ký bằng HMAC

Khi một webhook có `secret`, OmniRoute ký nội dung JSON và gửi:

```
Content-Type: application/json
User-Agent: OmniRoute-Webhook/1.0
X-Webhook-Event: <sự kiện>
X-Webhook-Timestamp: <ISO-8601>
X-Webhook-Signature: sha256=<HMAC-SHA256(secret, nội dung) dạng hex>
```

> Tên header sử dụng tiền tố `X-Webhook-*` (không phải `X-OmniRoute-*`). Giá trị chữ ký
> có dạng `sha256=<hex>` — hãy xác minh toàn bộ tiền tố.

Nếu `createWebhook` được gọi mà không có secret, mô-đun DB sẽ tạo một secret
(`whsec_<48 hex>`) để tất cả webhook đều được ký theo mặc định.

### Xác minh tại trình nhận

```typescript
import { createHmac, timingSafeEqual } from "node:crypto";

function verify(rawBody: string, signature: string, secret: string) {
  const expected = "sha256=" + createHmac("sha256", secret).update(rawBody).digest("hex");
  const a = Buffer.from(expected);
  const b = Buffer.from(signature);
  return a.length === b.length && timingSafeEqual(a, b);
}
```

Luôn xác minh dựa trên nội dung yêu cầu **thô**, trước khi thực hiện bất kỳ thao tác phân tích cú pháp JSON nào.

## Chính sách thử lại & lỗi

`deliverWebhook(url, payload, secret, maxRetries = 3)`:

- Thời gian chờ 10 giây cho mỗi lần thử (`AbortController`).
- HTTP 2xx được tính là thành công.
- HTTP 3xx/4xx được tính là trạng thái cuối cùng không thể thử lại — được ghi nhận là đã gửi
  với `success = res.ok`.
- HTTP 5xx và lỗi mạng được thử lại với thời gian chờ tăng theo cấp số nhân:
  `2^attempt * 1000 ms` (1 giây, 2 giây, 4 giây).
- Sau `maxRetries`, lần gửi được ghi nhận là thất bại.
- Mỗi lần gửi sẽ cập nhật `last_triggered_at`, `last_status`, đồng thời đặt lại
  hoặc tăng `failure_count`.
- Trình điều phối gọi `disableWebhooksWithHighFailures(10)` sau mỗi lần phân phối,
  vì vậy mọi webhook có `failure_count >= 10` sẽ tự động bị vô hiệu hóa.

## Cơ sở dữ liệu

Bảng `webhooks` (migration `011_webhooks.sql`):

| Cột                 | Kiểu    | Ghi chú                                         |
| ------------------- | ------- | ----------------------------------------------- |
| `id`                | TEXT PK | UUID                                            |
| `url`               | TEXT    | URL đích                                        |
| `events`            | TEXT    | Mảng JSON; mặc định `["*"]`                     |
| `secret`            | TEXT    | Bí mật HMAC (tự động tạo nếu không cung cấp)    |
| `enabled`           | INT     | 0/1; mặc định là 1                              |
| `description`       | TEXT    | Nhãn mô tả tùy chọn                             |
| `created_at`        | TEXT    | `datetime('now')`                               |
| `last_triggered_at` | TEXT    | Được cập nhật trong mỗi lần thử gửi             |
| `last_status`       | INT     | Trạng thái HTTP của lần thử gần nhất (0 = mạng) |
| `failure_count`     | INT     | Đặt lại thành 0 khi thành công, +1 khi thất bại |

Lịch sử gửi được lưu trữ trong bảng chuyên dụng `webhook_deliveries`
(migration `069_webhook_deliveries.sql`, được ghi thông qua
`src/lib/db/webhookDeliveries.ts::insertDelivery` trong mỗi lần thử), bên cạnh
các bộ đếm tổng hợp trên hàng `webhooks`. Siêu dữ liệu loại (Slack / Discord /
Telegram / các trình chuyển đổi payload tùy chỉnh) được thêm bởi `070_webhooks_kind_metadata.sql`.

## API REST

Tất cả endpoint đều yêu cầu xác thực quản trị (`requireManagementAuth`).

| Endpoint                        | Phương thức | Mô tả                                          |
| ------------------------------- | ----------- | ---------------------------------------------- |
| `/api/webhooks`                 | GET         | Liệt kê webhook (các bí mật được che)          |
| `/api/webhooks`                 | POST        | Tạo webhook                                    |
| `/api/webhooks/[id]`            | GET         | Chi tiết webhook (bí mật đầy đủ)               |
| `/api/webhooks/[id]`            | PUT         | Cập nhật các trường                            |
| `/api/webhooks/[id]`            | DELETE      | Xóa                                            |
| `/api/webhooks/[id]/test`       | POST        | Kích hoạt một `test.ping` (không thử lại)      |
| `/api/webhooks/[id]/deliveries` | GET         | Các lần thử gửi gần đây của một webhook        |
| `/api/webhooks/validate-url`    | POST        | Xác thực URL trước khi gửi (bảo vệ chống SSRF) |

`GET /api/webhooks` che bí mật thành `<10 ký tự đầu tiên>...` để tránh làm lộ
trên các trang danh sách. Sử dụng GET `[id]` khi bạn thực sự cần bí mật.

### Tạo webhook

```bash
curl -X POST http://localhost:20128/api/webhooks \
  -H "Cookie: auth_token=..." \
  -H "Content-Type: application/json" \
  -d '{
    "url": "https://hooks.slack.com/services/...",
    "secret": "whsec_my_shared_secret",
    "events": ["quota.exceeded", "request.failed"],
    "description": "Slack alerts"
  }'
```

Nếu bỏ qua `secret`, máy chủ sẽ tạo một bí mật `whsec_<hex>` và trả về
trong phản hồi.

### Kiểm tra webhook

```bash
curl -X POST http://localhost:20128/api/webhooks/<id>/test \
  -H "Cookie: auth_token=..."
```

Trả về `{ delivered, status, error }`. Hệ thống không thực hiện thử lại — hữu ích để
nhanh chóng xác thực rằng bên nhận chấp nhận payload và chữ ký.

## Bảng điều khiển

Trang bảng điều khiển tại `/dashboard/webhooks` (xem
`src/app/(dashboard)/dashboard/webhooks/page.tsx`) cung cấp:

- Tạo/chỉnh sửa webhook bằng trình chọn sự kiện
- Chỉ báo trạng thái (đang hoạt động / không hoạt động / bị lỗi) dựa trên `enabled`,
  `failure_count` và `last_status`
- Gửi thử nghiệm chỉ bằng một lần nhấp
- Nút bật/tắt thủ công

## Ví dụ payload

### request.completed

```json
{
  "event": "request.completed",
  "timestamp": "2026-05-13T20:30:00.123Z",
  "data": {
    "trace_id": "...",
    "api_key_id": "...",
    "provider": "openai",
    "model": "gpt-5",
    "status": 200,
    "tokens_in": 142,
    "tokens_out": 350,
    "cost_usd": 0.0042
  }
}
```

### test.ping

```json
{
  "event": "test.ping",
  "timestamp": "2026-05-13T20:32:00.000Z",
  "data": {
    "message": "Test webhook delivery from OmniRoute",
    "webhookId": "<uuid>"
  }
}
```

Cấu trúc trường cho các sự kiện không phải `test.ping` được xác định bởi các vị trí gọi phát ra
chúng; hãy coi đối tượng `data` là tương thích về sau (có thể thêm trường, không phụ thuộc vào
việc trường nào đó không tồn tại).

## Các phương pháp hay nhất

- **Xác minh chữ ký trong mỗi lần gửi** dựa trên phần thân thô — giúp ngăn chặn
  các yêu cầu POST giả mạo từ bất kỳ ai đoán được URL webhook của bạn.
- **Phản hồi bằng mã 2xx trong vòng khoảng 5 giây** — bộ điều phối hết thời gian chờ sau 10 giây. Các
  bên nhận chậm sẽ làm tiêu tốn số lần thử lại và tăng `failure_count`.
- **Thiết kế các trình xử lý có tính lũy đẳng** — cơ chế thử lại và ngữ nghĩa gửi ít nhất một lần
  đồng nghĩa với việc có thể xuất hiện dữ liệu trùng lặp.
- **Chỉ đăng ký tối thiểu** — chỉ liệt kê những sự kiện bạn thực sự sử dụng; `"*"` sẽ
  làm tăng chi phí trên các bên nhận mà bạn không kiểm soát.
- **Theo dõi `failure_count`** — các endpoint sẽ tự động bị vô hiệu hóa sau 10 lần
  thất bại liên tiếp; đặt lại bằng cách gọi `PUT /api/webhooks/[id]` với `enabled: true`
  sau khi đã khắc phục bên nhận.
- **Luân chuyển secret định kỳ** — dùng `PUT` để đặt `secret` mới, triển khai giá trị mới
  tới bên nhận và xác nhận qua endpoint thử nghiệm.

## Xem thêm

- [API_REFERENCE.md](../reference/API_REFERENCE.md) — toàn bộ bề mặt API quản lý
- [RESILIENCE_GUIDE.md](../architecture/RESILIENCE_GUIDE.md) — ngữ nghĩa circuit breaker / cooldown
  đằng sau các lỗi nhà cung cấp được hiển thị qua `request.failed`
- Mã nguồn: `src/lib/webhookDispatcher.ts`, `src/lib/db/webhooks.ts`
