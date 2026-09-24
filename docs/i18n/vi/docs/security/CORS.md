# CORS Configuration & Security (Tiếng Việt)

🌐 **Languages:** 🇺🇸 [English](../../../../security/CORS.md) · 🇪🇹 [am](../../../am/docs/security/CORS.md) · 🇸🇦 [ar](../../../ar/docs/security/CORS.md) · 🇦🇿 [az](../../../az/docs/security/CORS.md) · 🇧🇬 [bg](../../../bg/docs/security/CORS.md) · 🇧🇩 [bn](../../../bn/docs/security/CORS.md) · 🇧🇦 [bs](../../../bs/docs/security/CORS.md) · 🇨🇿 [cs](../../../cs/docs/security/CORS.md) · 🇩🇰 [da](../../../da/docs/security/CORS.md) · 🇩🇪 [de](../../../de/docs/security/CORS.md) · 🇬🇷 [el](../../../el/docs/security/CORS.md) · 🇪🇸 [es](../../../es/docs/security/CORS.md) · 🇪🇪 [et](../../../et/docs/security/CORS.md) · 🇮🇷 [fa](../../../fa/docs/security/CORS.md) · 🇫🇮 [fi](../../../fi/docs/security/CORS.md) · 🇫🇷 [fr](../../../fr/docs/security/CORS.md) · 🇮🇪 [ga](../../../ga/docs/security/CORS.md) · 🇮🇳 [gu](../../../gu/docs/security/CORS.md) · 🇳🇬 [ha](../../../ha/docs/security/CORS.md) · 🇮🇱 [he](../../../he/docs/security/CORS.md) · 🇮🇳 [hi](../../../hi/docs/security/CORS.md) · 🇭🇷 [hr](../../../hr/docs/security/CORS.md) · 🇭🇺 [hu](../../../hu/docs/security/CORS.md) · 🇦🇲 [hy](../../../hy/docs/security/CORS.md) · 🇮🇩 [id](../../../id/docs/security/CORS.md) · 🇳🇬 [ig](../../../ig/docs/security/CORS.md) · 🇮🇹 [it](../../../it/docs/security/CORS.md) · 🇯🇵 [ja](../../../ja/docs/security/CORS.md) · 🇬🇪 [ka](../../../ka/docs/security/CORS.md) · 🇰🇭 [km](../../../km/docs/security/CORS.md) · 🇮🇳 [kn](../../../kn/docs/security/CORS.md) · 🇰🇷 [ko](../../../ko/docs/security/CORS.md) · 🇱🇹 [lt](../../../lt/docs/security/CORS.md) · 🇱🇻 [lv](../../../lv/docs/security/CORS.md) · 🇮🇳 [ml](../../../ml/docs/security/CORS.md) · 🇮🇳 [mr](../../../mr/docs/security/CORS.md) · 🇲🇾 [ms](../../../ms/docs/security/CORS.md) · 🇲🇹 [mt](../../../mt/docs/security/CORS.md) · 🇲🇲 [my](../../../my/docs/security/CORS.md) · 🇳🇵 [ne](../../../ne/docs/security/CORS.md) · 🇳🇱 [nl](../../../nl/docs/security/CORS.md) · 🇳🇴 [no](../../../no/docs/security/CORS.md) · 🇮🇳 [or](../../../or/docs/security/CORS.md) · 🇮🇳 [pa](../../../pa/docs/security/CORS.md) · 🇵🇭 [phi](../../../phi/docs/security/CORS.md) · 🇵🇱 [pl](../../../pl/docs/security/CORS.md) · 🇵🇹 [pt](../../../pt/docs/security/CORS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/CORS.md) · 🇷🇴 [ro](../../../ro/docs/security/CORS.md) · 🇷🇺 [ru](../../../ru/docs/security/CORS.md) · 🇱🇰 [si](../../../si/docs/security/CORS.md) · 🇸🇰 [sk](../../../sk/docs/security/CORS.md) · 🇸🇮 [sl](../../../sl/docs/security/CORS.md) · 🇷🇸 [sr](../../../sr/docs/security/CORS.md) · 🇸🇪 [sv](../../../sv/docs/security/CORS.md) · 🇰🇪 [sw](../../../sw/docs/security/CORS.md) · 🇮🇳 [ta](../../../ta/docs/security/CORS.md) · 🇮🇳 [te](../../../te/docs/security/CORS.md) · 🇹🇭 [th](../../../th/docs/security/CORS.md) · 🇹🇷 [tr](../../../tr/docs/security/CORS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/CORS.md) · 🇵🇰 [ur](../../../ur/docs/security/CORS.md) · 🇺🇿 [uz](../../../uz/docs/security/CORS.md) · 🇳🇬 [yo](../../../yo/docs/security/CORS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/CORS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/CORS.md)

---

OmniRoute kiểm soát **các origin của trình duyệt** nào có thể đọc phản hồi cross-origin
thông qua một danh sách cho phép tập trung duy nhất. Mô hình này **mặc định từ chối**:
không origin nào được phép cho đến khi bạn chủ động thêm vào danh sách. Trang này mô tả cách
phân giải danh sách cho phép, `CORS_ALLOW_ALL=true` thực sự làm lộ những gì (và quan trọng hơn,
những gì nó **không** làm lộ), cách cấu hình môi trường phát triển và production một cách an toàn,
cũng như cảnh báo runtime mà dashboard hiển thị khi wildcard đang được bật.

**Nguồn chính xác:** `src/server/cors/origins.ts` (`resolveAllowedOrigin`,
`applyCorsHeaders`, `getCorsStatus`). Danh sách cho phép được áp dụng một lần trong
middleware (`src/server/authz/pipeline.ts`) — các handler riêng lẻ của từng route không tự đặt
`Access-Control-Allow-Origin`.

## Cách phân giải một origin

Với mỗi request, middleware tính toán giá trị `Access-Control-Allow-Origin`
theo thứ tự sau:

1. **`CORS_ALLOW_ALL=true`** (hoặc `CORS_ORIGIN=*` cũ) → phản hồi lại `Origin`
   của bên gọi (hoặc `*` khi không có header `Origin`), cùng với `Vary: Origin`
   để đảm bảo cache hoạt động chính xác. Điểm kiểm soát duy nhất `applyCorsHeaders()` này cũng thêm
   `Vary: Accept-Encoding` vào mọi phản hồi 2xx có body trên bề mặt
   `/v1*`/`/v1beta*` được xác thực bằng token (`relaxForTokenAuth`, RFC 9110 §12.5.5, issue #6737), để
   các cache hạ nguồn/cache dùng chung có thể phân biệt chính xác giữa các biến thể
   đã nén và chưa nén.
2. Nếu không, `Origin` của request được chuẩn hóa (chuyển thành chữ thường, loại bỏ
   dấu gạch chéo ở cuối) và đối chiếu với **danh sách cho phép đã hợp nhất**:
   - env **`CORS_ALLOWED_ORIGINS`** — danh sách phân tách bằng dấu phẩy, và
   - thiết lập runtime **`corsOrigins`** (Dashboard → Security → _CORS Allowed
     Origins_), được đưa vào qua `setRuntimeAllowedOrigins()` từ
     `src/lib/config/runtimeSettings.ts`.
3. Không khớp → **không phát ra header `Access-Control-Allow-Origin`**. Trình duyệt
   chặn việc đọc cross-origin. Đây là hành vi mặc định từ chối có chủ đích.

| Biến môi trường        | Ý nghĩa                                                                                   |
| ---------------------- | ----------------------------------------------------------------------------------------- |
| `CORS_ALLOWED_ORIGINS` | Danh sách CSV gồm các origin chính xác được phép (khuyến nghị).                           |
| `CORS_ALLOW_ALL`       | `true`/`1` → phản hồi lại bất kỳ origin nào (wildcard). Chỉ dành cho môi trường dev.      |
| `CORS_ORIGIN`          | Cũ. `*` hoạt động như `CORS_ALLOW_ALL`; một giá trị đơn được thêm vào danh sách cho phép. |

## Mô hình đe dọa — `CORS_ALLOW_ALL=true` thực sự làm lộ những gì

Cảnh báo chung của OWASP ("wildcard CORS = bất kỳ trang web nào cũng có thể gọi API của bạn")
cần được xem xét nghiêm túc, nhưng phạm vi lộ diện của OmniRoute **hẹp hơn trường hợp chung**,
do một đặc điểm triển khai cụ thể:

> **`applyCorsHeaders()` trung tâm không bao giờ phát ra
> `Access-Control-Allow-Credentials`.** Trình duyệt sẽ không cho phép truy cập một phản hồi cross-origin
> _có thông tin xác thực_ (kèm cookie), trừ khi máy chủ gửi
> `Access-Control-Allow-Credentials: true`. Luồng CORS dùng chung của OmniRoute không bao giờ
> làm điều đó.

Điều này có ý nghĩa như sau đối với từng bề mặt, ngay cả khi dùng `CORS_ALLOW_ALL=true`:

| Bề mặt                               | Cơ chế xác thực             | Ảnh hưởng của wildcard CORS                                                                                                                                                                                                                                   |
| ------------------------------------ | --------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Dashboard / MANAGEMENT `/api/*`      | Phiên cookie                | Origin được phản hồi lại, nhưng **nếu không có `Allow-Credentials`** thì trình duyệt sẽ **chặn** việc đọc có thông tin xác thực. Một trang web cross-origin độc hại **không thể đọc** các phản hồi dashboard đã xác thực của bạn và cookie phiên không bị lộ. |
| Client API `/v1/*`, `/v1beta/*`      | Header Bearer / `x-api-key` | Vốn đã cho phép rộng rãi **theo thiết kế** (`relaxForTokenAuth`): trình duyệt không bao giờ tự động đính kèm `Authorization`/`x-api-key`, vì vậy trang của kẻ tấn công không thể cung cấp khóa của bạn. `CORS_ALLOW_ALL` không mở rộng phạm vi này.           |
| Chỉ đọc công khai (`/api/health`, …) | Không có                    | Không nhạy cảm; wildcard không gây hại.                                                                                                                                                                                                                       |

Vì vậy, mức độ lộ diện **còn lại** của `CORS_ALLOW_ALL=true` chỉ giới hạn ở: (a)
các thao tác **đọc** cross-origin không có thông tin xác thực đối với dữ liệu vốn đã không yêu cầu
xác thực, và (b) cho phép **preflight CORS thành công** trên các route quản trị — những route này
vẫn yêu cầu xác thực mà một trang cross-origin không thể cung cấp. Đây **không phải** là
vector chiếm đoạt phiên hoặc đánh cắp thông tin xác thực trên luồng CORS dùng chung.

### Một ngoại lệ thực sự — `/api/v1/agents/`

Các route Cloud-Agent (`/api/v1/agents/{health,credentials,tasks,tasks/[id]}`) đặt
các header CORS **riêng**
(`src/lib/cloudAgent/api.ts`, `getCloudAgentCorsHeaders`) và **có** phát ra
`Access-Control-Allow-Origin: <origin>|*` cùng với
`Access-Control-Allow-Credentials: true`. Đây là bề mặt duy nhất mà việc
phản hồi lại origin và thông tin xác thực cùng tồn tại, đồng thời nó **độc lập với
`CORS_ALLOW_ALL`**. Các route này được xác thực ở cấp quản trị
(`requireManagementAuth`); những người vận hành công khai dashboard ra ngoài máy chủ cần
biết rằng đây là nơi duy nhất các header phản hồi cho phép đọc cross-origin có thông tin xác thực.
Việc thắt chặt nó thành một danh sách cho phép rõ ràng được theo dõi
riêng biệt với hướng dẫn CORS này.

## Danh sách kiểm tra cho môi trường production

- **Tuyệt đối không đặt `CORS_ALLOW_ALL=true` trong môi trường production.** Hãy để biến này không được thiết lập.
- Thiết lập danh sách origin **tường minh** — bằng biến môi trường hoặc trường trong tab Security:

  ```bash
  CORS_ALLOWED_ORIGINS="https://app.example.com, https://admin.example.com"
  ```

- Nếu OmniRoute chạy phía sau reverse proxy / tunnel (nginx, Caddy, Cloudflare
  Tunnel, Tailscale), CORS **không** phải là biện pháp kiểm soát duy nhất — cơ chế
  bảo vệ route loopback vẫn bảo vệ các route có khả năng spawn (xem
  [ROUTE_GUARD_TIERS](./ROUTE_GUARD_TIERS.md)). Không được giả mạo
  `X-Forwarded-For: 127.0.0.1` để "khắc phục" lỗi 403; việc đó sẽ mở lại lớp lỗ hổng
  RCE mà cơ chế bảo vệ route đã ngăn chặn.
- Xác nhận trạng thái runtime: dashboard hiển thị một **biểu ngữ màu hổ phách liên tục**
  trong Dashboard → Security → Authorization Inventory bất cứ khi nào
  `CORS_ALLOW_ALL=true` đang có hiệu lực, và `/api/settings/authz-inventory` trả về
  một cấu trúc bao `cors: { allowAll, allowedOrigins }` mà các công cụ giám sát có thể thăm dò.

## Tiện lợi khi phát triển — cho phép các origin cục bộ cụ thể

Ngay cả trong môi trường dev, bạn hiếm khi cần ký tự đại diện. Chỉ cho phép các máy chủ dev mà bạn sử dụng:

```bash
# Các máy chủ dev Vite (5173) + Next.js (3000) gọi đến OmniRoute cục bộ
CORS_ALLOWED_ORIGINS="http://localhost:5173, http://localhost:3000"
```

Các origin được đối sánh không phân biệt chữ hoa chữ thường và bỏ qua dấu gạch chéo ở cuối, vì vậy
`http://localhost:3000` và `http://localhost:3000/` là tương đương. Cùng một danh sách CSV
có thể được thiết lập tại runtime trong **Dashboard → Security → CORS Allowed Origins** mà không cần
khởi động lại.

## API key so với phiên cookie

- **Bearer / `x-api-key` (bề mặt suy luận `/v1/*`):** trình duyệt không bao giờ tự động đính kèm
  các thông tin này. CORS không phải là một rào cản có ý nghĩa ở đây — API key mới là
  rào cản — đó là lý do bề mặt này được chủ ý thiết lập theo hướng cho phép để trình duyệt và
  các client Electron có thể đọc những phản hồi mà chúng vốn đã được quyền truy cập.
- **Phiên cookie (dashboard):** được bảo vệ bởi mặc định đóng khi có lỗi **và**
  bởi việc không có `Access-Control-Allow-Credentials` trên đường dẫn dùng chung. Không đưa
  các origin quản trị/dashboard vào bất kỳ cấu hình cho phép nào; chúng phải luôn
  đóng khi có lỗi một cách tuyệt đối.

## Ví dụ: reverse proxy phía trước OmniRoute

CORS được chính OmniRoute thực thi, vì vậy proxy thường **không** nên thêm hoặc
ghi đè các header `Access-Control-*` (header trùng lặp khiến trình duyệt gặp lỗi). Kết thúc TLS
và chuyển tiếp — hãy để OmniRoute phản hồi preflight:

```nginx
# nginx — chuyển tiếp đến OmniRoute; KHÔNG chèn Access-Control-* tại đây
location / {
    proxy_pass http://127.0.0.1:20128;
    proxy_set_header Host $host;
    proxy_set_header X-Forwarded-Proto $scheme;
    # KHÔNG đặt X-Forwarded-For thành 127.0.0.1 — việc này vô hiệu hóa cơ chế bảo vệ route loopback.
}
```

Thiết lập các origin trình duyệt được phép trong OmniRoute (`CORS_ALLOWED_ORIGINS` hoặc
tab Security), không phải trong proxy.

## Các tệp nguồn

| Hạng mục                                        | Tệp                                                                  |
| ----------------------------------------------- | -------------------------------------------------------------------- |
| Phân giải allowlist + `getCorsStatus()`         | `src/server/cors/origins.ts`                                         |
| Áp dụng middleware (nguồn thông tin duy nhất)   | `src/server/authz/pipeline.ts`                                       |
| Settings → đưa origin vào runtime               | `src/lib/config/runtimeSettings.ts`                                  |
| Trạng thái runtime cho dashboard                | `src/app/api/settings/authz-inventory/route.ts`                      |
| Biểu ngữ cảnh báo trên dashboard                | `src/app/(dashboard)/dashboard/settings/components/AuthzSection.tsx` |
| Trường CORS Allowed Origins                     | `src/app/(dashboard)/dashboard/settings/components/SecurityTab.tsx`  |
| CORS theo từng route của Cloud-Agent (ngoại lệ) | `src/lib/cloudAgent/api.ts`                                          |

## Xem thêm

- [Các cấp bảo vệ tuyến](./ROUTE_GUARD_TIERS.md) — thực thi loopback cho
  các tuyến có khả năng tạo tiến trình (một biện pháp kiểm soát riêng biệt, mang tính bổ trợ).
- [Hướng dẫn phân quyền](../architecture/AUTHZ_GUIDE.md) — quy trình xác thực và phân quyền đầy đủ.
