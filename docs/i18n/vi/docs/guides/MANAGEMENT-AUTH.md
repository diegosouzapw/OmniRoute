# Management Authentication (Tiếng Việt)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/MANAGEMENT-AUTH.md) · 🇪🇹 [am](../../../am/docs/guides/MANAGEMENT-AUTH.md) · 🇸🇦 [ar](../../../ar/docs/guides/MANAGEMENT-AUTH.md) · 🇦🇿 [az](../../../az/docs/guides/MANAGEMENT-AUTH.md) · 🇧🇬 [bg](../../../bg/docs/guides/MANAGEMENT-AUTH.md) · 🇧🇩 [bn](../../../bn/docs/guides/MANAGEMENT-AUTH.md) · 🇧🇦 [bs](../../../bs/docs/guides/MANAGEMENT-AUTH.md) · 🇨🇿 [cs](../../../cs/docs/guides/MANAGEMENT-AUTH.md) · 🇩🇰 [da](../../../da/docs/guides/MANAGEMENT-AUTH.md) · 🇩🇪 [de](../../../de/docs/guides/MANAGEMENT-AUTH.md) · 🇬🇷 [el](../../../el/docs/guides/MANAGEMENT-AUTH.md) · 🇪🇸 [es](../../../es/docs/guides/MANAGEMENT-AUTH.md) · 🇪🇪 [et](../../../et/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇷 [fa](../../../fa/docs/guides/MANAGEMENT-AUTH.md) · 🇫🇮 [fi](../../../fi/docs/guides/MANAGEMENT-AUTH.md) · 🇫🇷 [fr](../../../fr/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇪 [ga](../../../ga/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [gu](../../../gu/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇬 [ha](../../../ha/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇱 [he](../../../he/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [hi](../../../hi/docs/guides/MANAGEMENT-AUTH.md) · 🇭🇷 [hr](../../../hr/docs/guides/MANAGEMENT-AUTH.md) · 🇭🇺 [hu](../../../hu/docs/guides/MANAGEMENT-AUTH.md) · 🇦🇲 [hy](../../../hy/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇩 [id](../../../id/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇬 [ig](../../../ig/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇹 [it](../../../it/docs/guides/MANAGEMENT-AUTH.md) · 🇯🇵 [ja](../../../ja/docs/guides/MANAGEMENT-AUTH.md) · 🇬🇪 [ka](../../../ka/docs/guides/MANAGEMENT-AUTH.md) · 🇰🇭 [km](../../../km/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [kn](../../../kn/docs/guides/MANAGEMENT-AUTH.md) · 🇰🇷 [ko](../../../ko/docs/guides/MANAGEMENT-AUTH.md) · 🇱🇹 [lt](../../../lt/docs/guides/MANAGEMENT-AUTH.md) · 🇱🇻 [lv](../../../lv/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [ml](../../../ml/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [mr](../../../mr/docs/guides/MANAGEMENT-AUTH.md) · 🇲🇾 [ms](../../../ms/docs/guides/MANAGEMENT-AUTH.md) · 🇲🇹 [mt](../../../mt/docs/guides/MANAGEMENT-AUTH.md) · 🇲🇲 [my](../../../my/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇵 [ne](../../../ne/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇱 [nl](../../../nl/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇴 [no](../../../no/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [or](../../../or/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [pa](../../../pa/docs/guides/MANAGEMENT-AUTH.md) · 🇵🇭 [phi](../../../phi/docs/guides/MANAGEMENT-AUTH.md) · 🇵🇱 [pl](../../../pl/docs/guides/MANAGEMENT-AUTH.md) · 🇵🇹 [pt](../../../pt/docs/guides/MANAGEMENT-AUTH.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/MANAGEMENT-AUTH.md) · 🇷🇴 [ro](../../../ro/docs/guides/MANAGEMENT-AUTH.md) · 🇷🇺 [ru](../../../ru/docs/guides/MANAGEMENT-AUTH.md) · 🇱🇰 [si](../../../si/docs/guides/MANAGEMENT-AUTH.md) · 🇸🇰 [sk](../../../sk/docs/guides/MANAGEMENT-AUTH.md) · 🇸🇮 [sl](../../../sl/docs/guides/MANAGEMENT-AUTH.md) · 🇷🇸 [sr](../../../sr/docs/guides/MANAGEMENT-AUTH.md) · 🇸🇪 [sv](../../../sv/docs/guides/MANAGEMENT-AUTH.md) · 🇰🇪 [sw](../../../sw/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [ta](../../../ta/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [te](../../../te/docs/guides/MANAGEMENT-AUTH.md) · 🇹🇭 [th](../../../th/docs/guides/MANAGEMENT-AUTH.md) · 🇹🇷 [tr](../../../tr/docs/guides/MANAGEMENT-AUTH.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/MANAGEMENT-AUTH.md) · 🇵🇰 [ur](../../../ur/docs/guides/MANAGEMENT-AUTH.md) · 🇺🇿 [uz](../../../uz/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇬 [yo](../../../yo/docs/guides/MANAGEMENT-AUTH.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/MANAGEMENT-AUTH.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/MANAGEMENT-AUTH.md)

---

OmniRoute có **bốn nhóm thông tin xác thực** có thể cấp quyền truy cập các route quản lý.
Chúng không thể được sử dụng thay thế cho nhau. Các khóa API suy luận (`sk-…`) **không** quản lý
máy chủ trừ khi chúng được cấp rõ ràng scope `manage` hoặc `admin`.

Phần triển khai chuẩn: `src/lib/api/requireManagementAuth.ts`.

| Thông tin xác thực       | Dạng thông thường                     | Được tạo ở đâu                                        | Mục đích sử dụng                      | Khả năng quản lý                                                                                           |
| ------------------------ | ------------------------------------- | ----------------------------------------------------- | ------------------------------------- | ---------------------------------------------------------------------------------------------------------- |
| Phiên JWT của Dashboard  | cookie `auth_token`                   | Đăng nhập Dashboard                                   | Giao diện người dùng trên trình duyệt | Toàn quyền quản lý qua dashboard, tuân theo các quy tắc về CSRF, tính cục bộ và các route luôn được bảo vệ |
| Token machine-id của CLI | nội bộ / cục bộ                       | Khởi tạo CLI (`omniroute` trên cùng máy)              | CLI cục bộ                            | Chỉ quản lý cục bộ                                                                                         |
| Access Token có scope    | `oma_live_…`                          | **Settings → Access Tokens** hoặc `omniroute connect` | CLI từ xa và API quản lý              | Phải đáp ứng scope `read`, `write` hoặc `admin` mà route yêu cầu                                           |
| Khóa API suy luận        | `sk-…` (và các tiền tố khóa API khác) | **API Manager / API Keys**                            | Suy luận `/v1/*`                      | **Không có** trừ khi metadata của khóa bao gồm `manage` hoặc `admin`                                       |

Thông tin xác thực `oma_` là thông tin xác thực dành cho quản lý/CLI. Chúng **không phải** là khóa API suy luận.

Nếu xác thực bằng thông tin đăng nhập/khóa API bị tắt trên máy chủ, một số route quản lý có thể
chấp nhận các lệnh gọi không được xác thực. Các route chỉ dành cho cục bộ và luôn được bảo vệ vẫn áp dụng
các quy tắc riêng. Do đó, việc cung cấp một trong các thông tin xác thực này không phải lúc nào cũng
bắt buộc, và việc sở hữu một thông tin xác thực cũng không phải lúc nào cũng đủ nếu không có
scope bắt buộc và không đáp ứng tính cục bộ của route.

Liên quan: [Chế độ từ xa](./REMOTE-MODE.md) (cách `oma_live_…` được cấp cho CLI từ xa).

---

## Ma trận scope

Hai hệ thống scope này **khác nhau**. Không được trộn lẫn chúng.

### Scope của Access Token (`oma_live_…`)

| Scope   | Các thao tác thông thường                                                                          |
| ------- | -------------------------------------------------------------------------------------------------- |
| `read`  | Các yêu cầu GET liệt kê/trạng thái mà token được phép xem                                          |
| `write` | Các thay đổi (tạo/cập nhật/xóa) dưới cấp admin                                                     |
| `admin` | Toàn quyền CLI từ xa / token kết nối (quá trình khởi tạo bằng mật khẩu mặc định sử dụng scope này) |

Token có `read` không thể gọi route yêu cầu `write`. Dạng thông báo khi chạy:
`Scope của access token '<have>' không đủ; yêu cầu '<need>'.`

### Scope quản lý của khóa API

| Scope      | Ý nghĩa                                                                         |
| ---------- | ------------------------------------------------------------------------------- |
| (không có) | Chỉ suy luận. Các route quản lý trả về 403.                                     |
| `manage`   | API quản lý (cùng cổng kiểm tra như nhánh khóa API của `requireManagementAuth`) |
| `admin`    | Cũng đáp ứng `hasManageScope` (được xem là có khả năng quản lý)                 |

Bật `manage` cho khóa trong giao diện API Keys / API Manager. Không sử dụng lại
khóa của ứng dụng trò chuyện cho tác vụ tự động hóa trừ khi bạn chủ động cấp scope đó.

---

## Cách tạo và thu hồi

### Phiên JWT của Dashboard

1. Mở `/login`, đăng nhập bằng mật khẩu quản lý (`INITIAL_PASSWORD` trong lần khởi động đầu tiên).
2. Cookie `auth_token` là HttpOnly. Dashboard trên trình duyệt tự động sử dụng cookie này.
3. Đăng xuất qua `/api/auth/logout`. Không có secret dài hạn nào để sao chép.

### Token machine-id của CLI

1. Chạy `omniroute` trên **cùng máy chủ** với máy chủ dịch vụ (loopback).
2. CLI khởi tạo một token machine-id trong `~/.omniroute/` (chmod 600).
3. Cách này **không** hoạt động từ máy khác. Hãy sử dụng Access Token cho CLI từ xa.

### Access Token có scope (`oma_live_…`)

1. Dashboard: **Settings → Access Tokens** → tạo (tên + scope). **Secret chỉ được hiển thị một lần.**
2. Hoặc CLI: `omniroute connect <host>` (mật khẩu → token). Xem [Chế độ từ xa](./REMOTE-MODE.md).
3. Header: `Authorization: Bearer oma_live_…`
4. Thu hồi trên cùng trang Access Tokens (hoặc xóa ngữ cảnh CLI).
5. Máy chủ chỉ lưu trữ giá trị băm. Hãy bảo vệ bản rõ như mật khẩu.

### Khóa API có scope quản lý

1. Dashboard: **API Manager / API Keys** → tạo hoặc chỉnh sửa khóa → bật `manage` (hoặc `admin`).
2. Header: `Authorization: Bearer sk-…` (tiền tố thực tế của khóa).
3. Thu hồi hoặc loại bỏ `manage` trong cùng giao diện.
4. Đối với tác vụ tự động hóa không phải CLI, hãy tuân theo nguyên tắc đặc quyền tối thiểu: ưu tiên Access Token có `read` cho các tác vụ chỉ dùng GET; chỉ sử dụng `manage` trên khóa API khi bên gọi cũng phải giao tiếp với cả `/v1` và giao diện quản lý.

---

## Định dạng header

```http
Authorization: Bearer oma_live_<secret>
Authorization: Bearer sk-<secret>
Cookie: auth_token=<dashboard-jwt>
```

Không đặt thông tin xác thực quản trị trong đường dẫn URL hoặc chuỗi truy vấn. Việc xác thực quản trị chỉ được thực hiện qua header/cookie.

---

## Ví dụ có thể sao chép và dán

Chỉ đọc (liệt kê các nhà cung cấp). Sử dụng Access Token có phạm vi `read`:

```bash
curl -sS "$OMNIROUTE_URL/api/providers" \
  -H "Authorization: Bearer oma_live_<read-token>"
```

Thay đổi dữ liệu (tạo kết nối với nhà cung cấp). Sử dụng Access Token có phạm vi `write`/`admin` hoặc API key có phạm vi `manage`:

```bash
curl -sS -X POST "$OMNIROUTE_URL/api/providers" \
  -H "Authorization: Bearer oma_live_<write-or-admin-token>" \
  -H "Content-Type: application/json" \
  -d '{"provider":"openai","apiKey":"<upstream-key>"}'
```

Suy luận (không phải quản trị). API key thông thường, không yêu cầu `manage`:

```bash
curl -sS "$OMNIROUTE_URL/v1/models" \
  -H "Authorization: Bearer sk-<inference-key>"
```

---

## Các lỗi runtime hiện tại (không hiển thị lại thông tin bí mật)

| Tình huống                                            | Mã trạng thái thường gặp | Thông báo (đã loại bỏ thông tin nhạy cảm)                                                |
| ----------------------------------------------------- | ------------------------ | ---------------------------------------------------------------------------------------- |
| Không có thông tin xác thực                           | 401                      | `Yêu cầu xác thực`                                                                       |
| `oma_live_…` không hợp lệ/đã hết hạn                  | 401                      | `Access token không hợp lệ hoặc đã hết hạn`                                              |
| API key hợp lệ nhưng không có `manage`/`admin`        | 403                      | `API key không có phạm vi 'manage'. Hãy bật phạm vi này trong bảng điều khiển API Keys.` |
| API key thông thường không hợp lệ trên route quản trị | 403                      | `Token quản trị không hợp lệ`                                                            |
| Phạm vi Access Token quá thấp                         | 403                      | `Phạm vi access token '<have>' không đủ; yêu cầu '<need>'.`                              |

"Token quản trị không hợp lệ" có nghĩa là bearer **không** được chấp nhận làm thông tin xác thực quản trị. Thông báo này **không** cho biết bạn cần tạo loại thông tin xác thực nào. Hãy sử dụng bảng ở trên: khóa suy luận cần phạm vi `manage`; CLI từ xa cần `oma_live_…`; bảng điều khiển sử dụng cookie phiên.

---

## Lựa chọn theo nguyên tắc đặc quyền tối thiểu được khuyến nghị

| Bên gọi                                             | Sử dụng                                                |
| --------------------------------------------------- | ------------------------------------------------------ |
| Trình duyệt                                         | Phiên bảng điều khiển                                  |
| CLI trên máy chủ                                    | Machine token                                          |
| CLI trên máy tính cá nhân kết nối đến máy chủ từ xa | `oma_live_…` từ `omniroute connect`                    |
| CI / tập lệnh (chỉ dành cho quản trị)               | `oma_live_…` với phạm vi nhỏ nhất đáp ứng được yêu cầu |
| CI phải gọi cả `/v1` và `/api`                      | API key có `manage` **hoặc** hai thông tin xác thực    |
