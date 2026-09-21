# CLI Machine-ID Token (Tiếng Việt)

🌐 **Languages:** 🇺🇸 [English](../../../../security/CLI_TOKEN.md) · 🇪🇹 [am](../../../am/docs/security/CLI_TOKEN.md) · 🇸🇦 [ar](../../../ar/docs/security/CLI_TOKEN.md) · 🇦🇿 [az](../../../az/docs/security/CLI_TOKEN.md) · 🇧🇬 [bg](../../../bg/docs/security/CLI_TOKEN.md) · 🇧🇩 [bn](../../../bn/docs/security/CLI_TOKEN.md) · 🇨🇿 [cs](../../../cs/docs/security/CLI_TOKEN.md) · 🇩🇰 [da](../../../da/docs/security/CLI_TOKEN.md) · 🇩🇪 [de](../../../de/docs/security/CLI_TOKEN.md) · 🇬🇷 [el](../../../el/docs/security/CLI_TOKEN.md) · 🇪🇸 [es](../../../es/docs/security/CLI_TOKEN.md) · 🇪🇪 [et](../../../et/docs/security/CLI_TOKEN.md) · 🇮🇷 [fa](../../../fa/docs/security/CLI_TOKEN.md) · 🇫🇮 [fi](../../../fi/docs/security/CLI_TOKEN.md) · 🇫🇷 [fr](../../../fr/docs/security/CLI_TOKEN.md) · 🇮🇪 [ga](../../../ga/docs/security/CLI_TOKEN.md) · 🇮🇳 [gu](../../../gu/docs/security/CLI_TOKEN.md) · 🇳🇬 [ha](../../../ha/docs/security/CLI_TOKEN.md) · 🇮🇱 [he](../../../he/docs/security/CLI_TOKEN.md) · 🇮🇳 [hi](../../../hi/docs/security/CLI_TOKEN.md) · 🇭🇷 [hr](../../../hr/docs/security/CLI_TOKEN.md) · 🇭🇺 [hu](../../../hu/docs/security/CLI_TOKEN.md) · 🇦🇲 [hy](../../../hy/docs/security/CLI_TOKEN.md) · 🇮🇩 [id](../../../id/docs/security/CLI_TOKEN.md) · 🇳🇬 [ig](../../../ig/docs/security/CLI_TOKEN.md) · 🇮🇹 [it](../../../it/docs/security/CLI_TOKEN.md) · 🇯🇵 [ja](../../../ja/docs/security/CLI_TOKEN.md) · 🇬🇪 [ka](../../../ka/docs/security/CLI_TOKEN.md) · 🇰🇭 [km](../../../km/docs/security/CLI_TOKEN.md) · 🇮🇳 [kn](../../../kn/docs/security/CLI_TOKEN.md) · 🇰🇷 [ko](../../../ko/docs/security/CLI_TOKEN.md) · 🇱🇹 [lt](../../../lt/docs/security/CLI_TOKEN.md) · 🇱🇻 [lv](../../../lv/docs/security/CLI_TOKEN.md) · 🇮🇳 [ml](../../../ml/docs/security/CLI_TOKEN.md) · 🇮🇳 [mr](../../../mr/docs/security/CLI_TOKEN.md) · 🇲🇾 [ms](../../../ms/docs/security/CLI_TOKEN.md) · 🇲🇹 [mt](../../../mt/docs/security/CLI_TOKEN.md) · 🇲🇲 [my](../../../my/docs/security/CLI_TOKEN.md) · 🇳🇵 [ne](../../../ne/docs/security/CLI_TOKEN.md) · 🇳🇱 [nl](../../../nl/docs/security/CLI_TOKEN.md) · 🇳🇴 [no](../../../no/docs/security/CLI_TOKEN.md) · 🇮🇳 [or](../../../or/docs/security/CLI_TOKEN.md) · 🇮🇳 [pa](../../../pa/docs/security/CLI_TOKEN.md) · 🇵🇭 [phi](../../../phi/docs/security/CLI_TOKEN.md) · 🇵🇱 [pl](../../../pl/docs/security/CLI_TOKEN.md) · 🇵🇹 [pt](../../../pt/docs/security/CLI_TOKEN.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/CLI_TOKEN.md) · 🇷🇴 [ro](../../../ro/docs/security/CLI_TOKEN.md) · 🇷🇺 [ru](../../../ru/docs/security/CLI_TOKEN.md) · 🇱🇰 [si](../../../si/docs/security/CLI_TOKEN.md) · 🇸🇰 [sk](../../../sk/docs/security/CLI_TOKEN.md) · 🇸🇮 [sl](../../../sl/docs/security/CLI_TOKEN.md) · 🇷🇸 [sr](../../../sr/docs/security/CLI_TOKEN.md) · 🇸🇪 [sv](../../../sv/docs/security/CLI_TOKEN.md) · 🇰🇪 [sw](../../../sw/docs/security/CLI_TOKEN.md) · 🇮🇳 [ta](../../../ta/docs/security/CLI_TOKEN.md) · 🇮🇳 [te](../../../te/docs/security/CLI_TOKEN.md) · 🇹🇭 [th](../../../th/docs/security/CLI_TOKEN.md) · 🇹🇷 [tr](../../../tr/docs/security/CLI_TOKEN.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/CLI_TOKEN.md) · 🇵🇰 [ur](../../../ur/docs/security/CLI_TOKEN.md) · 🇺🇿 [uz](../../../uz/docs/security/CLI_TOKEN.md) · 🇳🇬 [yo](../../../yo/docs/security/CLI_TOKEN.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/CLI_TOKEN.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/CLI_TOKEN.md)

---

## Tổng quan

Các lệnh OmniRoute CLI xác thực với API quản lý cục bộ bằng token
`HMAC-SHA256(machine-id, salt)` được gửi qua header yêu cầu
`x-omniroute-cli-token`.

Điều này cho phép các lệnh con CLI (`omniroute status`, `omniroute providers`, v.v.)
gọi các endpoint quản lý mà không yêu cầu người dùng cung cấp JWT hoặc
mật khẩu trong mỗi lần gọi.

## Cách hoạt động

1. `getMachineTokenSync()` đọc ID phần cứng của máy thông qua `node-machine-id`
   (chuyển sang chuỗi rỗng nếu thất bại, qua đó vô hiệu hóa xác thực CLI).
2. Hàm này tính toán `HMAC-SHA256(machine_id, salt)` và trả về toàn bộ chuỗi băm
   hex dài 64 ký tự — một token xác định, không thể đảo ngược và được gắn với máy này.
3. CLI chỉ gửi token dưới dạng `x-omniroute-cli-token` khi đích đã phân giải
   là một URL loopback rõ ràng (`localhost`, `127.0.0.0/8` hoặc
   IPv6 loopback). Các yêu cầu mang token sử dụng `redirect: error`, do đó một
   chuyển hướng cục bộ không thể chuyển tiếp token đến origin khác. Các ngữ cảnh
   từ xa sử dụng token truy cập có phạm vi thay thế. Nếu không thể tạo token, CLI
   sẽ bỏ qua header và `omniroute doctor` báo cáo lỗi thay vì coi token rỗng
   là hợp lệ.
4. Máy chủ (`src/server/authz/policies/management.ts`) tính toán lại
   token dự kiến bằng cùng salt và so sánh thông qua `timingSafeEqual` để
   ngăn việc trích xuất dựa trên thời gian.

## Các thuộc tính bảo mật

| Thuộc tính                       | Chi tiết                                                                                                                                                                                                                                     |
| -------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Chỉ loopback**                 | Chỉ được chấp nhận khi dấu xác nhận tính cục bộ của peer đáng tin cậy từ máy chủ (được suy ra từ địa chỉ TCP peer thực tế) cho biết đó là loopback. Header `Host` do máy khách kiểm soát không bao giờ được tin cậy để xác định tính cục bộ. |
| **So sánh thời gian không đổi**  | `crypto.timingSafeEqual` ngăn chặn các cuộc tấn công định thời.                                                                                                                                                                              |
| **Không thể đảo ngược**          | Không thể khôi phục machine-id từ đầu ra HMAC.                                                                                                                                                                                               |
| **Không bỏ qua bảo vệ `always`** | `isAlwaysProtectedPath()` được đánh giá trước bước kiểm tra token CLI. `/api/shutdown` và `/api/settings/database` luôn yêu cầu JWT.                                                                                                         |
| **Không thể xuất**               | Token không bao giờ được ghi xuống đĩa hoặc ghi vào nhật ký.                                                                                                                                                                                 |

## Salt mặc định (ngẫu nhiên cho mỗi lần cài đặt)

Khi `OMNIROUTE_CLI_SALT` chưa được đặt, salt là một chuỗi hex ngẫu nhiên dài 64 ký tự,
được tạo một lần và lưu tại `<DATA_DIR>/cli-token-salt.json` (chế độ `0600`) —
không phải giá trị cố định `omniroute-cli-auth-v1` có trong mã nguồn. Cả `getActiveSalt()` trong
`src/lib/machineToken.ts` và bản tương ứng của nó trong `bin/cli/utils/cliToken.mjs` đều đọc
cùng một tệp, vì vậy máy chủ và mọi lần gọi CLI trong bản cài đặt này sẽ thống nhất về
cùng một giá trị; giá trị cố định có trong mã nguồn chỉ được dùng làm phương án dự phòng cuối cùng khi chưa thể thiết lập
salt được lưu trữ hoặc salt từ biến môi trường (ví dụ: một bản cài đặt mới chỉ có CLI
trước khi máy chủ từng được chạy). Điều này khắc phục một điểm yếu của giá trị mặc định cố định
trước đây: `/etc/machine-id` thường có thể được mọi người đọc, vì vậy bất kỳ người dùng cục bộ nào
cũng có thể tạo ra cùng một token cho mọi bản cài đặt chưa từng đặt
`OMNIROUTE_CLI_SALT`.

## Xoay vòng salt

Đặt `OMNIROUTE_CLI_SALT` để xoay vòng token dẫn xuất mà không cần thay đổi mã — biến này
luôn được ưu tiên hơn salt riêng cho từng bản cài đặt đã được lưu. Sau khi xoay vòng, tất cả tiến trình CLI
trên máy này sẽ tự động sử dụng token mới. Hữu ích sau khi danh sách tiến trình bị rò rỉ,
có thể đã làm lộ giá trị dẫn xuất trước đó.

```bash
# Xoay vòng lâu dài (thêm vào hồ sơ shell)
export OMNIROUTE_CLI_SALT="my-secret-salt-2026"

# Xác minh token mới đang được sử dụng
omniroute status
```

## Định dạng cũ (SHA-256, 32 ký tự) — vẫn được chấp nhận

Trước định dạng HMAC ở trên, CLI dẫn xuất token theo công thức
`SHA-256(machineId + salt).hex[0..32]` (tiền tố 32 ký tự) trong
`bin/cli/utils/cliToken.mjs` (`getLegacyCliTokenSync` trong `src/lib/machineToken.ts`).

Để đảm bảo khả năng tương thích ngược, máy chủ chấp nhận **cả hai** định dạng: trình xác minh tạo
`expectedTokens = [getMachineTokenSync(), getLegacyCliTokenSync()]` và so sánh
header nhận được với từng token bằng `timingSafeEqual`
(`src/server/authz/policies/management.ts` và `src/lib/middleware/cliTokenAuth.ts`).
Vì vậy, một token hợp lệ nếu khớp với **một trong hai**: mã băm HMAC 64 ký tự hoặc tiền tố
SHA-256 cũ 32 ký tự.

**Tắt tính năng:** đặt `OMNIROUTE_DISABLE_CLI_TOKEN=true` (trong env hoặc `.env`) để vô hiệu hóa hoàn toàn
cơ chế token CLI; khi đó, mọi lượt truy cập đều yêu cầu khóa API tường minh. Trên các máy
có nhiều người dùng, bạn nên thực hiện điều này vì `machine-id` là riêng cho từng thiết bị (không phải từng người dùng) và một
người dùng khác trên cùng máy có thể tính được cùng một token.

## Tệp

| Tệp                                       | Mục đích                                      |
| ----------------------------------------- | --------------------------------------------- |
| `src/lib/machineToken.ts`                 | Dẫn xuất token (`getMachineTokenSync`)        |
| `bin/cli/utils/cliToken.mjs`              | Bản sao phía CLI của cùng quy trình dẫn xuất  |
| `<DATA_DIR>/cli-token-salt.json`          | Salt ngẫu nhiên được lưu cho từng bản cài đặt |
| `src/server/authz/headers.ts`             | Hằng số `CLI_TOKEN_HEADER`                    |
| `src/server/authz/policies/management.ts` | Xác minh phía máy chủ                         |
| `src/server/authz/routeGuard.ts`          | Kiểm tra máy chủ loopback (`isLoopbackHost`)  |

## Xem thêm

- `docs/security/ROUTE_GUARD_TIERS.md` — các cấp bảo vệ tuyến
- `docs/architecture/AUTHZ_GUIDE.md` — toàn bộ quy trình phân quyền
