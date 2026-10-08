# Zed IDE Integration in Docker Environments (Tiếng Việt)

🌐 **Languages:** 🇺🇸 [English](../../../../providers/ZED-DOCKER.md) · 🇪🇹 [am](../../../am/docs/providers/ZED-DOCKER.md) · 🇸🇦 [ar](../../../ar/docs/providers/ZED-DOCKER.md) · 🇦🇿 [az](../../../az/docs/providers/ZED-DOCKER.md) · 🇧🇬 [bg](../../../bg/docs/providers/ZED-DOCKER.md) · 🇧🇩 [bn](../../../bn/docs/providers/ZED-DOCKER.md) · 🇧🇦 [bs](../../../bs/docs/providers/ZED-DOCKER.md) · 🇨🇿 [cs](../../../cs/docs/providers/ZED-DOCKER.md) · 🇩🇰 [da](../../../da/docs/providers/ZED-DOCKER.md) · 🇩🇪 [de](../../../de/docs/providers/ZED-DOCKER.md) · 🇬🇷 [el](../../../el/docs/providers/ZED-DOCKER.md) · 🇪🇸 [es](../../../es/docs/providers/ZED-DOCKER.md) · 🇪🇪 [et](../../../et/docs/providers/ZED-DOCKER.md) · 🇮🇷 [fa](../../../fa/docs/providers/ZED-DOCKER.md) · 🇫🇮 [fi](../../../fi/docs/providers/ZED-DOCKER.md) · 🇫🇷 [fr](../../../fr/docs/providers/ZED-DOCKER.md) · 🇮🇪 [ga](../../../ga/docs/providers/ZED-DOCKER.md) · 🇮🇳 [gu](../../../gu/docs/providers/ZED-DOCKER.md) · 🇳🇬 [ha](../../../ha/docs/providers/ZED-DOCKER.md) · 🇮🇱 [he](../../../he/docs/providers/ZED-DOCKER.md) · 🇮🇳 [hi](../../../hi/docs/providers/ZED-DOCKER.md) · 🇭🇷 [hr](../../../hr/docs/providers/ZED-DOCKER.md) · 🇭🇺 [hu](../../../hu/docs/providers/ZED-DOCKER.md) · 🇦🇲 [hy](../../../hy/docs/providers/ZED-DOCKER.md) · 🇮🇩 [id](../../../id/docs/providers/ZED-DOCKER.md) · 🇳🇬 [ig](../../../ig/docs/providers/ZED-DOCKER.md) · 🇮🇹 [it](../../../it/docs/providers/ZED-DOCKER.md) · 🇯🇵 [ja](../../../ja/docs/providers/ZED-DOCKER.md) · 🇬🇪 [ka](../../../ka/docs/providers/ZED-DOCKER.md) · 🇰🇭 [km](../../../km/docs/providers/ZED-DOCKER.md) · 🇮🇳 [kn](../../../kn/docs/providers/ZED-DOCKER.md) · 🇰🇷 [ko](../../../ko/docs/providers/ZED-DOCKER.md) · 🇱🇹 [lt](../../../lt/docs/providers/ZED-DOCKER.md) · 🇱🇻 [lv](../../../lv/docs/providers/ZED-DOCKER.md) · 🇮🇳 [ml](../../../ml/docs/providers/ZED-DOCKER.md) · 🇮🇳 [mr](../../../mr/docs/providers/ZED-DOCKER.md) · 🇲🇾 [ms](../../../ms/docs/providers/ZED-DOCKER.md) · 🇲🇹 [mt](../../../mt/docs/providers/ZED-DOCKER.md) · 🇲🇲 [my](../../../my/docs/providers/ZED-DOCKER.md) · 🇳🇵 [ne](../../../ne/docs/providers/ZED-DOCKER.md) · 🇳🇱 [nl](../../../nl/docs/providers/ZED-DOCKER.md) · 🇳🇴 [no](../../../no/docs/providers/ZED-DOCKER.md) · 🇮🇳 [or](../../../or/docs/providers/ZED-DOCKER.md) · 🇮🇳 [pa](../../../pa/docs/providers/ZED-DOCKER.md) · 🇵🇭 [phi](../../../phi/docs/providers/ZED-DOCKER.md) · 🇵🇱 [pl](../../../pl/docs/providers/ZED-DOCKER.md) · 🇵🇹 [pt](../../../pt/docs/providers/ZED-DOCKER.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/providers/ZED-DOCKER.md) · 🇷🇴 [ro](../../../ro/docs/providers/ZED-DOCKER.md) · 🇷🇺 [ru](../../../ru/docs/providers/ZED-DOCKER.md) · 🇱🇰 [si](../../../si/docs/providers/ZED-DOCKER.md) · 🇸🇰 [sk](../../../sk/docs/providers/ZED-DOCKER.md) · 🇸🇮 [sl](../../../sl/docs/providers/ZED-DOCKER.md) · 🇷🇸 [sr](../../../sr/docs/providers/ZED-DOCKER.md) · 🇸🇪 [sv](../../../sv/docs/providers/ZED-DOCKER.md) · 🇰🇪 [sw](../../../sw/docs/providers/ZED-DOCKER.md) · 🇮🇳 [ta](../../../ta/docs/providers/ZED-DOCKER.md) · 🇮🇳 [te](../../../te/docs/providers/ZED-DOCKER.md) · 🇹🇭 [th](../../../th/docs/providers/ZED-DOCKER.md) · 🇹🇷 [tr](../../../tr/docs/providers/ZED-DOCKER.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/providers/ZED-DOCKER.md) · 🇵🇰 [ur](../../../ur/docs/providers/ZED-DOCKER.md) · 🇺🇿 [uz](../../../uz/docs/providers/ZED-DOCKER.md) · 🇳🇬 [yo](../../../yo/docs/providers/ZED-DOCKER.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/providers/ZED-DOCKER.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/providers/ZED-DOCKER.md)

---

Khi OmniRoute chạy bên trong Docker, quy trình tiêu chuẩn "Nhập từ Zed Keychain" sẽ thất bại
vì container không thể truy cập daemon keychain của hệ điều hành máy chủ (`libsecret` trên Linux,
Keychain trên macOS, Credential Manager trên Windows), đồng thời các thư mục cấu hình Zed trên
hệ thống tệp của máy chủ không hiển thị bên trong container theo mặc định.

## Tại sao nhập từ Keychain thất bại trong Docker

Hai vấn đề gây cản trở xảy ra bên trong container:

1. **Cô lập hệ thống tệp** — `isZedInstalled()` tìm kiếm `~/.config/zed` (Linux),
   `~/Library/Application Support/Zed` (macOS) hoặc đường dẫn tương đương trên Windows. Các đường dẫn
   này nằm trên máy chủ và không khả dụng trừ khi được gắn volume một cách rõ ràng.
2. **Cô lập IPC** — Ngay cả khi thư mục cấu hình đã được gắn, module native `keytar`
   vẫn giao tiếp với dịch vụ keychain của hệ điều hành qua Unix socket hoặc phiên D-Bus.
   Theo mặc định, cả hai đều không được kết nối vào container, vì vậy việc đọc thông tin xác thực luôn thất bại.

OmniRoute phát hiện môi trường Docker bằng hai phương pháp:

- Sự hiện diện của `/.dockerenv` (được Docker daemon tạo khi container khởi động).
- Chuỗi `docker` xuất hiện trong `/proc/1/cgroup` (Linux cgroup v1).

Khi một trong hai phương pháp phát hiện Docker, route nhập sẽ trả về HTTP 422 với
`zedDockerEnvironment: true` và thông báo hướng dẫn bạn chuyển đến tab Nhập Token Thủ công.

## Sử dụng tab Nhập Token Thủ công

1. Mở **Dashboard → Providers → Zed**.
2. Bảng **Manual Token Import** xuất hiện bên dưới thẻ nhập từ keychain. Khi
   OmniRoute phát hiện Docker, bảng này sẽ tự động mở rộng sau lần thử nhập từ
   keychain thất bại đầu tiên.
3. Chọn nhà cung cấp từ danh sách thả xuống (OpenAI, Anthropic, Google, Mistral, xAI,
   OpenRouter hoặc DeepSeek).
4. Dán khóa API vào trường mật khẩu.
5. Nhấp vào **Import**.

Khóa được lưu dưới dạng một kết nối nhà cung cấp mới với tên
`Zed Manual Import (<provider>)`.

## Nơi Zed lưu trữ khóa API trên máy chủ

Zed lưu trữ khóa của các nhà cung cấp AI trong keychain của hệ điều hành dưới các tên dịch vụ như
`zed-openai`, `ai.zed.openai`, `zed-anthropic`, v.v. Để truy xuất chúng nhằm nhập thủ công,
hãy tìm trong:

**Linux**

```
~/.config/zed/settings.json
```

Phần `language_models` chứa cấu hình của các nhà cung cấp. Các khóa được lưu vào
keychain thông qua giao diện người dùng Zed không tồn tại dưới dạng văn bản thuần trong `settings.json`; hãy truy xuất chúng bằng
trình xem keychain như GNOME Keyring / Seahorse hoặc bằng cách chạy:

```bash
secret-tool lookup service zed-openai account api-key
```

**macOS**

```
~/Library/Application Support/Zed/settings.json
```

Bạn có thể tìm các mục keychain trong **Keychain Access.app** bằng cách tìm kiếm `zed`.

## Tùy chọn gắn Volume (Nâng cao)

Bạn có thể tùy chọn gắn thư mục cấu hình Zed vào container ở chế độ chỉ đọc.
Thao tác này không khắc phục vấn đề keychain nhưng có thể hữu ích cho các tính năng trong tương lai cần đọc
các giá trị cấu hình Zed không phải dữ liệu bí mật (ví dụ: tùy chọn mô hình).

```yaml
# Đoạn trích docker-compose.yml
services:
  omniroute:
    image: omniroute:latest
    volumes:
      # Máy chủ Linux
      - "${HOME}/.config/zed:/host-zed-config:ro"
      # Máy chủ macOS (bỏ chú thích để sử dụng thay thế)
      # - "${HOME}/Library/Application Support/Zed:/host-zed-config:ro"
    environment:
      # Trong tương lai: ZED_CONFIG_PATH=/host-zed-config
      PORT: "20128"
```

Lưu ý: tính năng ghi đè bằng biến môi trường `ZED_CONFIG_PATH` chưa được triển khai. Đoạn mã
này được cung cấp để tham khảo khi tính năng đó được bổ sung.

## API nhập thủ công

Endpoint nhập thủ công cũng có thể được gọi trực tiếp:

```
POST /api/providers/zed/manual-import
Content-Type: application/json
Authorization: Bearer <oma_live_or_manage_scoped_api_key>

{
  "provider": "openai",
  "token": "sk-...",
  "label": "Khóa Zed OpenAI của tôi"   // không bắt buộc
}
```

Khi thành công, endpoint trả về:

```json
{ "success": true, "connectionId": "...", "provider": "openai" }
```

## Khắc phục sự cố

| Triệu chứng                              | Nguyên nhân                                  | Cách khắc phục                                     |
| ---------------------------------------- | -------------------------------------------- | -------------------------------------------------- |
| 422 + `zedDockerEnvironment: true`       | Đang chạy bên trong Docker                   | Sử dụng tab Nhập Token Thủ công                    |
| 404 + `zedInstalled: false`              | Zed chưa được cài đặt trên máy chủ           | Cài đặt Zed hoặc sử dụng phương thức nhập thủ công |
| 403 + quyền truy cập keychain bị từ chối | Hệ điều hành từ chối quyền truy cập keychain | Cấp quyền trong lời nhắc của hệ điều hành          |
| 404 + dịch vụ keychain không khả dụng    | Thiếu `libsecret` trên Linux                 | Cài đặt `libsecret-1-dev`                          |
