# Kiro Setup Guide (Tiếng Việt)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/KIRO_SETUP.md) · 🇪🇹 [am](../../../am/docs/guides/KIRO_SETUP.md) · 🇸🇦 [ar](../../../ar/docs/guides/KIRO_SETUP.md) · 🇦🇿 [az](../../../az/docs/guides/KIRO_SETUP.md) · 🇧🇬 [bg](../../../bg/docs/guides/KIRO_SETUP.md) · 🇧🇩 [bn](../../../bn/docs/guides/KIRO_SETUP.md) · 🇨🇿 [cs](../../../cs/docs/guides/KIRO_SETUP.md) · 🇩🇰 [da](../../../da/docs/guides/KIRO_SETUP.md) · 🇩🇪 [de](../../../de/docs/guides/KIRO_SETUP.md) · 🇬🇷 [el](../../../el/docs/guides/KIRO_SETUP.md) · 🇪🇸 [es](../../../es/docs/guides/KIRO_SETUP.md) · 🇪🇪 [et](../../../et/docs/guides/KIRO_SETUP.md) · 🇮🇷 [fa](../../../fa/docs/guides/KIRO_SETUP.md) · 🇫🇮 [fi](../../../fi/docs/guides/KIRO_SETUP.md) · 🇫🇷 [fr](../../../fr/docs/guides/KIRO_SETUP.md) · 🇮🇪 [ga](../../../ga/docs/guides/KIRO_SETUP.md) · 🇮🇳 [gu](../../../gu/docs/guides/KIRO_SETUP.md) · 🇳🇬 [ha](../../../ha/docs/guides/KIRO_SETUP.md) · 🇮🇱 [he](../../../he/docs/guides/KIRO_SETUP.md) · 🇮🇳 [hi](../../../hi/docs/guides/KIRO_SETUP.md) · 🇭🇷 [hr](../../../hr/docs/guides/KIRO_SETUP.md) · 🇭🇺 [hu](../../../hu/docs/guides/KIRO_SETUP.md) · 🇦🇲 [hy](../../../hy/docs/guides/KIRO_SETUP.md) · 🇮🇩 [id](../../../id/docs/guides/KIRO_SETUP.md) · 🇳🇬 [ig](../../../ig/docs/guides/KIRO_SETUP.md) · 🇮🇹 [it](../../../it/docs/guides/KIRO_SETUP.md) · 🇯🇵 [ja](../../../ja/docs/guides/KIRO_SETUP.md) · 🇬🇪 [ka](../../../ka/docs/guides/KIRO_SETUP.md) · 🇰🇭 [km](../../../km/docs/guides/KIRO_SETUP.md) · 🇮🇳 [kn](../../../kn/docs/guides/KIRO_SETUP.md) · 🇰🇷 [ko](../../../ko/docs/guides/KIRO_SETUP.md) · 🇱🇹 [lt](../../../lt/docs/guides/KIRO_SETUP.md) · 🇱🇻 [lv](../../../lv/docs/guides/KIRO_SETUP.md) · 🇮🇳 [ml](../../../ml/docs/guides/KIRO_SETUP.md) · 🇮🇳 [mr](../../../mr/docs/guides/KIRO_SETUP.md) · 🇲🇾 [ms](../../../ms/docs/guides/KIRO_SETUP.md) · 🇲🇹 [mt](../../../mt/docs/guides/KIRO_SETUP.md) · 🇲🇲 [my](../../../my/docs/guides/KIRO_SETUP.md) · 🇳🇵 [ne](../../../ne/docs/guides/KIRO_SETUP.md) · 🇳🇱 [nl](../../../nl/docs/guides/KIRO_SETUP.md) · 🇳🇴 [no](../../../no/docs/guides/KIRO_SETUP.md) · 🇮🇳 [or](../../../or/docs/guides/KIRO_SETUP.md) · 🇮🇳 [pa](../../../pa/docs/guides/KIRO_SETUP.md) · 🇵🇭 [phi](../../../phi/docs/guides/KIRO_SETUP.md) · 🇵🇱 [pl](../../../pl/docs/guides/KIRO_SETUP.md) · 🇵🇹 [pt](../../../pt/docs/guides/KIRO_SETUP.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/KIRO_SETUP.md) · 🇷🇴 [ro](../../../ro/docs/guides/KIRO_SETUP.md) · 🇷🇺 [ru](../../../ru/docs/guides/KIRO_SETUP.md) · 🇱🇰 [si](../../../si/docs/guides/KIRO_SETUP.md) · 🇸🇰 [sk](../../../sk/docs/guides/KIRO_SETUP.md) · 🇸🇮 [sl](../../../sl/docs/guides/KIRO_SETUP.md) · 🇷🇸 [sr](../../../sr/docs/guides/KIRO_SETUP.md) · 🇸🇪 [sv](../../../sv/docs/guides/KIRO_SETUP.md) · 🇰🇪 [sw](../../../sw/docs/guides/KIRO_SETUP.md) · 🇮🇳 [ta](../../../ta/docs/guides/KIRO_SETUP.md) · 🇮🇳 [te](../../../te/docs/guides/KIRO_SETUP.md) · 🇹🇭 [th](../../../th/docs/guides/KIRO_SETUP.md) · 🇹🇷 [tr](../../../tr/docs/guides/KIRO_SETUP.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/KIRO_SETUP.md) · 🇵🇰 [ur](../../../ur/docs/guides/KIRO_SETUP.md) · 🇺🇿 [uz](../../../uz/docs/guides/KIRO_SETUP.md) · 🇳🇬 [yo](../../../yo/docs/guides/KIRO_SETUP.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/KIRO_SETUP.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/KIRO_SETUP.md)

---

Hướng dẫn này trình bày cách thêm các tài khoản Kiro (trợ lý lập trình AI do AWS lưu trữ) vào OmniRoute,
tập trung vào việc chạy đồng thời nhiều tài khoản mà không xảy ra xung đột phiên.

---

## Bối cảnh: Tại sao các tài khoản Kiro có thể xung đột

Phần backend của Kiro sử dụng các đăng ký ứng dụng khách AWS SSO OIDC để theo dõi các phiên đang hoạt động.
Giới hạn quan trọng: **mỗi đăng ký ứng dụng khách OIDC chỉ hỗ trợ một phiên
hoạt động tại một thời điểm**. Khi thiết bị hoặc người dùng thứ hai xác thực bằng cùng một
ứng dụng khách đã đăng ký, backend sẽ vô hiệu hóa refresh token của tài khoản đầu tiên.

Đây cũng là cơ chế gây ra sự cố khi chạy `kiro-cli login` trên một
máy đã đăng nhập một tài khoản Kiro khác — lần đăng nhập mới sẽ thu hồi token của
tài khoản đầu tiên.

---

## Cách OmniRoute giải quyết vấn đề này (v3.8.0+)

Kể từ v3.8.0, OmniRoute gọi `registerClient()` (AWS SSO OIDC) trong mỗi lần
nhập kết nối Kiro. Điều này cung cấp cho mỗi kết nối OmniRoute một đăng ký ứng dụng khách OIDC
riêng biệt. Vì mỗi đăng ký ứng dụng khách hoạt động độc lập, việc làm mới hoặc
xác thực lại một tài khoản sẽ không ảnh hưởng đến refresh token của bất kỳ tài khoản nào khác.

Cơ chế cô lập áp dụng cho các phương thức nhập refresh token, còn xác thực bằng API key
hoàn toàn không sử dụng phiên làm mới OIDC:

| Phương thức nhập                            | Trạng thái cô lập                                                                                                        |
| ------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| Luồng mã thiết bị AWS Builder ID / IDC      | Được cô lập kể từ khi luồng mã thiết bị được giới thiệu                                                                  |
| **Nhập Token** (dán refresh token thủ công) | Được cô lập từ v3.8.0                                                                                                    |
| **Đăng nhập mạng xã hội Google / GitHub**   | Được cô lập từ v3.8.0                                                                                                    |
| **Tự động nhập** (SQLite của kiro-cli)      | Được cô lập từ v3.8.0 (đường dẫn SQLite vốn đã được cô lập; phương án dự phòng dùng bộ nhớ đệm SSO giờ cũng được cô lập) |
| **API Key** (khóa CodeWhisperer dài hạn)    | Không có phiên làm mới; khóa được xác thực và lưu trữ dưới dạng thông tin xác thực bearer                                |

---

## Lưu ý di chuyển đối với các kết nối được tạo trước v3.8.0

Các kết nối được nhập trước v3.8.0 không có đăng ký ứng dụng khách OIDC riêng
được lưu trong `providerSpecificData`. Các kết nối này vẫn tiếp tục hoạt động nhưng sử dụng endpoint
làm mới xác thực mạng xã hội dùng chung, nghĩa là hai kết nối như vậy vẫn có thể vô hiệu hóa lẫn
nhau.

**Để có được sự cô lập:** hãy xóa kết nối cũ khỏi **Bảng điều khiển → Nhà cung cấp** và
nhập lại bằng bất kỳ luồng nhập nào được hỗ trợ. Tất cả kết nối mới được tạo sẽ
tự động nhận đăng ký ứng dụng khách riêng.

---

## Thêm hai tài khoản Kiro song song

### Điều kiện tiên quyết

- OmniRoute v3.8.0 trở lên.
- Một tài khoản Kiro đang hoạt động (email + mật khẩu, đăng nhập bằng Google hoặc GitHub).
- Có thể có thêm tài khoản Kiro thứ hai.

### Bước 1: Nhập tài khoản đầu tiên

1. Mở **Bảng điều khiển → Nhà cung cấp → Thêm nhà cung cấp → Kiro**.
2. Chọn một trong các tùy chọn:
   - **Nhập Token** — dán refresh token bắt đầu bằng `aorAAAAAG`.
   - **API Key** — dán API key Kiro / CodeWhisperer dài hạn.
   - **Đăng nhập bằng Google / GitHub** — hoàn tất luồng OAuth trong trình duyệt.
   - **Tự động nhập** — nhấp vào nút; OmniRoute đọc thông tin xác thực từ cơ sở dữ liệu
     kiro-cli cục bộ hoặc `~/.aws/sso/cache`.
3. Kết nối được lưu. Các luồng refresh token tự động đăng ký một ứng dụng khách
   OIDC riêng. Các luồng API key xác thực khóa với AWS và không lưu refresh token.

### Bước 2: Nhập tài khoản thứ hai

Lặp lại bước 1 cho tài khoản thứ hai. Vì mỗi lần nhập đều tạo một đăng ký ứng dụng khách OIDC
riêng biệt, hai kết nối được cô lập hoàn toàn.

### Bước 3: Xác minh cả hai kết nối đều đang hoạt động

1. **Bảng điều khiển → Nhà cung cấp** — cả hai kết nối Kiro phải hiển thị trạng thái **Đang hoạt động**.
2. **Bảng điều khiển → Tình trạng** — cả hai kết nối phải vượt qua quá trình kiểm tra tình trạng token.

### Bước 4: Sử dụng combo để định tuyến giữa các tài khoản

Tạo một combo với cả hai kết nối làm đích để cân bằng tải hoặc dự phòng chuyển đổi giữa chúng:

```
kiro/kiro-dev → kiro/kiro-pro
```

Xem [FEATURES.md](./FEATURES.md) và tài liệu định tuyến để biết cách cấu hình combo.

---

## Người dùng doanh nghiệp / IDC

Đối với các tài khoản AWS IAM Identity Center (IDC), hãy sử dụng luồng **mã thiết bị AWS Builder ID / IDC**
từ **Dashboard → Providers → Kiro → Device Code**. Luồng mã thiết bị luôn
được cô lập hoàn toàn. Không cần nhập lại các kết nối này.

Người dùng doanh nghiệp hoạt động tại khu vực AWS không mặc định có thể chỉ định khu vực khi
nhập thông qua Import Token API:

```bash
curl -X POST http://localhost:20128/api/oauth/kiro/import \
  -H "Content-Type: application/json" \
  -d '{"refreshToken": "aorAAAAAG...", "region": "eu-west-1"}'
```

Trường `region` mặc định là `us-east-1` nếu bị bỏ qua.

---

## Luồng nhập bằng khóa API

Phương thức xác thực bằng khóa API dành cho thông tin xác thực bearer Kiro / AWS CodeWhisperer có thời hạn dài. Phương thức này
không sử dụng cơ chế làm mới OAuth, nhờ đó tránh làm mất hiệu lực phiên OIDC dùng chung.

### Dashboard

1. Mở **Dashboard -> Providers -> Kiro**.
2. Chọn **API Key**.
3. Dán khóa API và khu vực AWS tùy chọn (`us-east-1` theo mặc định).
4. OmniRoute xác thực khóa và lưu kết nối.

### API

```bash
curl -X POST http://localhost:20128/api/oauth/kiro/api-key \
  -H "Content-Type: application/json" \
  -d '{"apiKey": "kiro_or_codewhisperer_key", "region": "us-east-1"}'
```

### Hợp đồng nội bộ

Tuyến API xác thực khóa bằng cách gọi `KiroService.validateApiKey()`, hàm này
sử dụng `ListAvailableProfiles` với điểm cuối CodeWhisperer/Amazon Q khớp với khu vực
và phân giải một `profileArn`.

Kết nối đã lưu sử dụng:

```json
{
  "authType": "apikey",
  "providerSpecificData": {
    "authMethod": "api_key",
    "region": "us-east-1",
    "profileArn": "arn:aws:codewhisperer:..."
  }
}
```

Trong thời gian chạy, `KiroExecutor.buildHeaders()` gửi khóa dưới dạng
`Authorization: Bearer <key>` và thêm `tokentype: API_KEY`. Các lệnh gọi hạn ngạch/hồ sơ
sử dụng cùng dấu hiệu này để AWS xử lý bearer như một khóa API có thời hạn dài thay vì
một mã truy cập OIDC hoặc mạng xã hội.

---

## Thời hạn của máy khách OIDC

Các máy khách công khai AWS SSO OIDC thường hết hạn sau 90 ngày
(`clientSecretExpiresAt`). OmniRoute lưu dấu thời gian này trong `providerSpecificData`
để phục vụ khả năng quan sát. Nếu kết nối ngừng làm mới sau khoảng 90 ngày, hãy nhập lại
kết nối để có được đăng ký máy khách OIDC mới. Việc tự động đăng ký lại khi
hết hạn được theo dõi như một cải tiến trong tương lai.

Các kết nối bằng khóa API không có thời hạn máy khách OIDC vì chúng không làm mới
thông qua AWS SSO OIDC.

---

## Khắc phục sự cố

### Tài khoản thứ hai liên tục bị đăng xuất

- Kiểm tra cả hai kết nối trong **Dashboard → Providers** và xác nhận mỗi kết nối đều hiển thị
  `clientId` khác null trong JSON thô (có thể xem qua biểu tượng thông tin). Nếu một trong hai kết nối thiếu
  `clientId`, kết nối đó đã được nhập trước v3.8.0 — hãy nhập lại.

### Nhập thất bại với thông báo "Token validation failed"

- Đảm bảo mã làm mới bắt đầu bằng `aorAAAAAG`.
- Đảm bảo OmniRoute có thể truy cập `https://oidc.us-east-1.amazonaws.com` (hoặc khu vực
  đã cấu hình). Nếu bạn đang sử dụng proxy doanh nghiệp, hãy thiết lập proxy ở cấp nhà cung cấp trong
  **Dashboard → Settings → Proxies**.

### Nhập bằng khóa API thất bại

- Xác nhận khóa là khóa API Kiro / CodeWhisperer, không phải mã làm mới.
- Xác nhận khu vực AWS khớp với khóa/tài khoản. `us-east-1` là giá trị mặc định.
- Khóa phải có khả năng gọi `ListAvailableProfiles`; nếu không, OmniRoute không thể
  phân giải `profileArn` bắt buộc.

Đối với các sự cố khác, hãy xem tài liệu chính [TROUBLESHOOTING.md](./TROUBLESHOOTING.md).
