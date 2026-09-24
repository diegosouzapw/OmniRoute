# Plugin Marketplace (Tiếng Việt)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/PLUGIN_MARKETPLACE.md) · 🇪🇹 [am](../../../am/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇦🇿 [az](../../../az/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇩🇰 [da](../../../da/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇩🇪 [de](../../../de/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇬🇷 [el](../../../el/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇪🇸 [es](../../../es/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇪🇪 [et](../../../et/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇱 [he](../../../he/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇩 [id](../../../id/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇹 [it](../../../it/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇰🇭 [km](../../../km/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇲🇲 [my](../../../my/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇳🇴 [no](../../../no/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [or](../../../or/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇱🇰 [si](../../../si/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [te](../../../te/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇹🇭 [th](../../../th/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/PLUGIN_MARKETPLACE.md)

---

> **Nguồn thông tin chuẩn:** `src/lib/plugins/` (`marketplace.ts`, `manager.ts`, `manifest.ts`,
> `scanner.ts`, `loader.ts`), `src/app/api/plugins/`, và
> `src/app/(dashboard)/dashboard/plugins/`
> **Cập nhật lần cuối:** 2026-06-28 — v3.8.40

OmniRoute cung cấp một hệ thống plugin theo phong cách WordPress. Các plugin là
những thư mục độc lập — mỗi thư mục có một tệp kê khai `plugin.json` và một tệp
điểm vào — được móc nối vào quy trình xử lý yêu cầu (`onRequest` / `onResponse` /
`onError`) và các sự kiện vòng đời (`onInstall` / `onActivate` / `onDeactivate` /
`onUninstall`).

**Kho Plugin** là lớp khám phá nằm trên hệ thống đó. Lớp này cung cấp một danh
mục có thể duyệt gồm các plugin có thể cài đặt. Theo mặc định, danh mục là một
registry khởi tạo tích hợp nhỏ; người vận hành có thể trỏ danh mục đến một URL
registry từ xa tùy chỉnh. Trong trường hợp đó, thao tác tìm nạp được bảo vệ bằng
cơ chế chống SSRF có phân giải DNS (xem [Bảo mật](#security)).

Mọi tuyến plugin đều **chỉ dành cho loopback** (Bậc 1 — `LOCAL_ONLY`): plugin
nạp và thực thi mã trong các tiến trình con, vì vậy các tuyến này không thể được
truy cập từ nguồn không phải loopback, bất kể cơ chế xác thực. Xem
[`docs/security/ROUTE_GUARD_TIERS.md`](../security/ROUTE_GUARD_TIERS.md).

## Cách Các Thành Phần Hoạt Động Cùng Nhau

```
Bảng điều khiển (/dashboard/plugins)
  ├─ Tab "Đã cài đặt" → GET /api/plugins            (listPlugins)
  │                     POST /api/plugins/scan      (pluginManager.scan)
  │                     POST /api/plugins/{name}/activate|deactivate
  │                     DELETE /api/plugins/{name}   (gỡ cài đặt)
  └─ Tab "Kho Plugin" → GET /api/plugins/marketplace
                          → listMarketplacePlugins()
                            ├─ không có URL tùy chỉnh → SEED_REGISTRY tích hợp
                            └─ URL tùy chỉnh → cơ chế chống SSRF isSafeMarketplaceUrl()
                                             → safeOutboundFetch(guard:"public-only")
```

- **Lớp registry** — `src/lib/plugins/marketplace.ts`: liệt kê / tìm kiếm trong
  danh mục, chuyển về registry khởi tạo khi xảy ra bất kỳ lỗi nào.
- **Lớp vòng đời** — `src/lib/plugins/manager.ts` (singleton `pluginManager`):
  cài đặt, nâng cấp, kích hoạt, vô hiệu hóa, gỡ cài đặt, quét, nạp khi khởi động.
- **Lớp tệp kê khai** — `src/lib/plugins/manifest.ts`: lược đồ Zod + các giá trị
  mặc định cho `plugin.json`.
- **Trình quét** — `src/lib/plugins/scanner.ts`: phát hiện các plugin trên ổ đĩa
  trong thư mục plugin.
- **Trình nạp** — `src/lib/plugins/loader.ts`: khởi chạy từng plugin trong một
  tiến trình con biệt lập và điều phối các lệnh gọi hook qua IPC.

## Danh Mục Kho Plugin

`listMarketplacePlugins()` (`src/lib/plugins/marketplace.ts`) trả về danh sách
các đối tượng `MarketplaceEntry`:

| Trường        | Kiểu     | Ghi chú                                       |
| ------------- | -------- | --------------------------------------------- |
| `name`        | string   | Tên plugin dạng kebab-case                    |
| `version`     | string   | semver                                        |
| `description` | string   | Nội dung tóm tắt ngắn                         |
| `author`      | string   | Tác giả / tổ chức                             |
| `license`     | string   | Mã định danh giấy phép kiểu SPDX              |
| `downloadUrl` | string   | URL tải xuống nguồn (có thể để trống)         |
| `repository`  | string?  | URL kho lưu trữ tùy chọn                      |
| `tags`        | string[] | Các thẻ tìm kiếm/lọc                          |
| `downloads`   | number   | Số lượt tải xuống                             |
| `rating`      | number   | 0–5                                           |
| `verified`    | boolean  | Mục có được đánh dấu là đã xác minh hay không |
| `lastUpdated` | string   | Chuỗi ngày tháng gần theo định dạng ISO       |

Khi không cấu hình URL registry tùy chỉnh, danh mục sẽ là `SEED_REGISTRY` tích
hợp (hiện gồm `request-logger`, `rate-limiter`, `cost-tracker`, và
`theme-manager`). Registry khởi tạo luôn khả dụng — nếu registry từ xa đã cấu
hình không thể truy cập, trả về trạng thái không phải `200`, hoặc trả về nội dung
không nhận dạng được, `listMarketplacePlugins()` sẽ ghi nhật ký cảnh báo và
chuyển về danh sách khởi tạo.

> Lưu ý: **danh mục** kho plugin (duyệt/tìm kiếm) đã được kết nối hoàn chỉnh từ
> đầu đến cuối, nhưng tính năng **cài đặt** bằng một cú nhấp từ danh mục vẫn chưa
> được triển khai — nút "Cài đặt" của bảng điều khiển trên một mục trong kho
> plugin hiện hiển thị thông báo "sắp ra mắt". Hiện tại, việc cài đặt được thực
> hiện thông qua luồng cài đặt từ đường dẫn cục bộ (`POST /api/plugins`) và cơ
> chế khám phá trên ổ đĩa (`POST /api/plugins/scan`).

## REST API

Tất cả endpoint đều yêu cầu xác thực quản trị (`requireManagementAuth`) **và**
chỉ có thể truy cập qua loopback — `/api/plugins` và `/api/plugins/` được liệt kê
trong `LOCAL_ONLY_API_PREFIXES` (`src/server/authz/routeGuard.ts`).

| Endpoint                         | Phương thức | Mô tả                                                      |
| -------------------------------- | ----------- | ---------------------------------------------------------- |
| `/api/plugins`                   | GET         | Liệt kê các plugin đã cài đặt (bộ lọc `?status=` tùy chọn) |
| `/api/plugins`                   | POST        | Cài đặt plugin từ một đường dẫn cục bộ tuyệt đối           |
| `/api/plugins/scan`              | POST        | Quét thư mục plugin và đăng ký các plugin mới              |
| `/api/plugins/marketplace`       | GET         | Liệt kê các mục trong danh mục marketplace                 |
| `/api/plugins/[name]`            | GET         | Lấy thông tin chi tiết về plugin đã cài đặt                |
| `/api/plugins/[name]`            | DELETE      | Gỡ cài đặt plugin                                          |
| `/api/plugins/[name]/activate`   | POST        | Kích hoạt (tải + đăng ký các hook)                         |
| `/api/plugins/[name]/deactivate` | POST        | Vô hiệu hóa (gọi `onDeactivate`, hủy đăng ký các hook)     |
| `/api/plugins/[name]/config`     | GET         | Lấy cấu hình plugin + schema cấu hình                      |
| `/api/plugins/[name]/config`     | PUT         | Cập nhật cấu hình plugin (được xác thực theo schema)       |

Bộ lọc `status` của `GET /api/plugins` chấp nhận một trong các giá trị
`installed` / `active` / `inactive` / `error`. Giá trị không hợp lệ sẽ trả về `400`.

### Liệt kê các plugin đã cài đặt

```bash
curl http://localhost:20128/api/plugins \
  -H "Cookie: auth_token=..."
```

### Cài đặt từ đường dẫn cục bộ

```bash
curl -X POST http://localhost:20128/api/plugins \
  -H "Cookie: auth_token=..." \
  -H "Content-Type: application/json" \
  -d '{ "path": "/absolute/path/to/my-plugin" }'
```

`path` phải là đường dẫn **tuyệt đối** và không được chứa các phân đoạn duyệt
thư mục `..` hoặc byte null (được Zod thực thi). Thư mục nguồn phải chứa một
`plugin.json` hợp lệ (hoặc là thư mục cha của thư mục chứa tệp đó). Khi thành
công, phản hồi có mã `201` cùng với bản ghi plugin đã cài đặt.

### Duyệt marketplace

```bash
curl http://localhost:20128/api/plugins/marketplace \
  -H "Cookie: auth_token=..."
```

### Cập nhật cấu hình plugin

```bash
curl -X PUT http://localhost:20128/api/plugins/my-plugin/config \
  -H "Cookie: auth_token=..." \
  -H "Content-Type: application/json" \
  -d '{ "config": { "level": "debug", "maxItems": 100 } }'
```

`PUT .../config` xác thực từng giá trị được cung cấp theo `configSchema` của
plugin (được khai báo trong manifest): các trường `number` tuân theo `min`/`max`,
các trường `select` phải khớp với `enum` đã khai báo. Các khóa không có trong
schema vẫn được cho phép.

## Cấu hình

### Thư mục plugin

Các plugin nằm trong thư mục dữ liệu OmniRoute:

```
~/.omniroute/plugins/<plugin-name>/
  ├─ plugin.json
  └─ index.js          # (hoặc bất kỳ tệp nào mà manifest.main trỏ tới)
```

`getDefaultPluginDir()` (`src/lib/plugins/scanner.ts`) phân giải thư mục đó theo
ba bước:

1. **`OMNIROUTE_PLUGINS_DIR`**, khi được thiết lập — được sử dụng nguyên văn, bất kể `HOME` có giá trị gì. Đây là
   tùy chọn điều khiển tường minh dành cho Docker/K8s, nơi cây thư mục plugin được bind mount tại một đường dẫn
   thường không liên quan gì đến thư mục home của container (#11827).
2. `<home>/.omniroute/plugins`, trong đó `<home>` được lấy từ các biến môi trường `HOME` / `USERPROFILE`.
3. `/tmp/.omniroute/plugins`, khi tiến trình hoàn toàn không cung cấp thông tin thư mục home.

Thư mục đã phân giải được ghi log một lần khi khởi động dưới tên `scanner.dir_resolved`, đồng thời nêu rõ
đầu vào được chọn (`OMNIROUTE_PLUGINS_DIR`, `home` hoặc `no-home-fallback`) — nhờ đó, một image
âm thầm rơi vào bước 3 sẽ thông báo điều này thay vì chỉ báo cáo danh sách plugin trống.
`POST /api/plugins/scan` phát hiện mọi thư mục con tại đó có chứa một
`plugin.json` hợp lệ và đăng ký thư mục đó; chính thư mục này cũng là thư mục gốc mà
`pluginManager.install()` sao chép các plugin vào, vì vậy một giá trị ghi đè sẽ di chuyển cả vị trí khám phá
lẫn cài đặt cùng nhau.

> **`OMNIROUTE_PLUGINS_DIR` không phải là `OMNIROUTE_PLUGIN_PATH`.** Biến sau chỉ được đọc bởi
> trình tải plugin lệnh của CLI (`bin/cli/plugins.mjs`) để tìm các package npm `omniroute-cmd-*`
> bổ sung các lệnh con `omniroute` — biến này không ảnh hưởng đến trình quét runtime
> được mô tả tại đây. Xem [PLUGINS.md](./PLUGINS.md) để biết thêm về phần đó.

### URL registry marketplace tùy chỉnh

Nguồn danh mục marketplace được đọc từ cài đặt `pluginMarketplaceUrl`
(`src/lib/plugins/marketplace.ts` đọc `settings.pluginMarketplaceUrl`). Khi
được đặt thành một URL `http(s)`, `listMarketplacePlugins()` sẽ tìm nạp URL đó
và chấp nhận một mảng JSON cấp cao nhất gồm các mục hoặc một đối tượng có mảng
`plugins`; các mục không có `name` kiểu chuỗi sẽ bị lọc bỏ. Khi chưa được thiết
lập (hoặc khi thao tác tìm nạp không vượt qua được cơ chế bảo vệ SSRF / trả về
phản hồi không hợp lệ), registry khởi tạo tích hợp sẵn sẽ được sử dụng.

Tab "Marketplace" trên dashboard cung cấp một trường dành cho URL này (được đọc
lại từ `GET /api/settings`).

> Lưu ý triển khai: thao tác "Save" trên dashboard gửi
> `pluginMarketplaceUrl` tới `PATCH /api/settings`. Tại thời điểm viết tài liệu,
> khóa này chưa được khai báo trong `updateSettingsSchema`
> (`src/shared/validation/settingsSchemas.ts`), vì vậy hãy xác minh khả năng lưu
> bền vững trong bản phát hành của bạn trước khi dựa vào nó — đường dẫn **đọc**
> (`getSettings()` → `listMarketplacePlugins()`) sẽ sử dụng khóa này khi khóa đã
> có trong kho cài đặt.

## Bảo mật

### Cấp độ tuyến — chỉ loopback

Các plugin thực thi mã trong những tiến trình con được tạo riêng, vì vậy toàn bộ bề mặt `/api/plugins`
được phân loại là `LOCAL_ONLY` (Cấp 1). Việc bắt buộc sử dụng loopback luôn được thực hiện
**trước** mọi bước kiểm tra xác thực, nên ngay cả khi token quản lý bị rò rỉ và truy cập
đến máy qua đường hầm, token đó vẫn không thể cài đặt, kích hoạt hoặc gỡ cài đặt plugin.
Xem [`docs/security/ROUTE_GUARD_TIERS.md`](../security/ROUTE_GUARD_TIERS.md) và
Quy tắc cứng #15 / #17.

### Cơ chế bảo vệ chống SSRF cho registry của marketplace

URL registry tùy chỉnh là cấu hình có thể bị kẻ tấn công chi phối, vì vậy trước khi
tìm nạp URL này, `listMarketplacePlugins()` đưa URL qua hai lớp kiểm tra:

1. **`isSafeMarketplaceUrl(url)`** (`src/lib/plugins/marketplace.ts`):
   - Từ chối mọi URL không sử dụng `http:` / `https:`.
   - Từ chối các máy chủ riêng tư/loopback/link-local/ULA được chỉ định trực tiếp (cả IPv4 **và** IPv6,
     bao gồm cả IPv4 được ánh xạ) thông qua `isPrivateHost` chuẩn
     (`src/shared/network/outboundUrlGuard.ts`).
   - Phân giải **cả hai** bản ghi `A` và `AAAA`, đồng thời từ chối nếu **bất kỳ** địa chỉ
     được phân giải nào là địa chỉ riêng tư — ngăn chặn cách vượt qua bằng ánh xạ tên máy chủ công khai → IP riêng tư.
   - **Từ chối khi có lỗi**: URL bị từ chối nếu quá trình phân giải DNS thất bại.
2. **`safeOutboundFetch(url, { guard: "public-only", timeoutMs: 5000 })`**
   (`src/shared/network/safeOutboundFetch.ts`): áp dụng lại cơ chế bảo vệ URL chỉ-công-khai
   tại thời điểm tìm nạp và **chặn chuyển hướng** (không cho phép chuyển hướng `30x`
   từ công khai → riêng tư).

URL không vượt qua được một trong hai lớp sẽ không làm hủy bỏ yêu cầu — marketplace
sẽ âm thầm quay về registry hạt giống tích hợp sẵn và ghi nhật ký cảnh báo.

> Cơ chế bảo vệ này đã được tăng cường trong PR #3774 để phân giải cụ thể cả A + AAAA và sử dụng
> `isPrivateHost` chuẩn thay vì phép kiểm tra chỉ dành cho IPv4.

### Cách ly quá trình thực thi plugin

- **Cách ly tiến trình** — `loadPlugin()` (`src/lib/plugins/loader.ts`) tạo
  mỗi plugin trong một tiến trình con Node.js riêng biệt và giao tiếp qua IPC.
  Các lệnh gọi hook có thời gian chờ với cơ chế leo thang từ `SIGTERM` → `SIGKILL`.
- **Danh sách cho phép đối với biến môi trường** — tiến trình con chỉ nhận được một tập hợp biến môi trường
  nằm trong danh sách cho phép; tập hợp rộng hơn chỉ được cấp khi manifest yêu cầu quyền
  `env`.
- **Giới hạn đường dẫn** — các thao tác cài đặt/nâng cấp/gỡ cài đặt xác nhận rằng thư mục plugin
  và `manifest.main` được phân giải **bên trong** thư mục gốc plugin được quản lý
  trước mọi thao tác sao chép hoặc xóa đệ quy (bảo vệ khỏi đường dẫn DB đã bị giả mạo và
  việc duyệt `../` trong `manifest.main`). Quá trình kích hoạt phân giải các liên kết tượng trưng bằng
  `realpath` và từ chối tải điểm vào thoát ra ngoài thư mục plugin.
- **Ghim tính toàn vẹn tùy chọn** — manifest có thể khai báo trường `integrity`
  (`sha256-<base64>`, định dạng SRI). Khi trường này xuất hiện, trình tải sẽ xác minh hàm băm
  của tệp điểm vào tại thời điểm tải và từ chối kích hoạt nếu không khớp. Đây là cơ chế
  phát hiện giả mạo tự nguyện, **không phải** ranh giới bảo mật — định tuyến chỉ-loopback
  và mô hình quyền mới là các ranh giới thực sự.

## Manifest (`plugin.json`)

Được xác thực bởi `PluginManifestSchema` (`src/lib/plugins/manifest.ts`):

| Trường             | Kiểu      | Ghi chú                                                           |
| ------------------ | --------- | ----------------------------------------------------------------- |
| `name`             | string    | Bắt buộc; kebab-case (`^[a-z0-9-]+$`), 1–100 ký tự                |
| `version`          | string    | Bắt buộc; semver (`MAJOR.MINOR.PATCH`)                            |
| `description`      | string?   | ≤ 500 ký tự                                                       |
| `author`           | string?   | ≤ 200 ký tự                                                       |
| `license`          | string?   | Mặc định là `MIT`                                                 |
| `main`             | string?   | Tệp điểm vào; mặc định là `index.js`                              |
| `source`           | enum?     | `local` \| `marketplace` (mặc định là `local`)                    |
| `tags`             | string[]? | Các thẻ tìm kiếm                                                  |
| `requires`         | object?   | `{ omniroute?, permissions[] }`                                   |
| `hooks`            | object?   | Các giá trị Boolean khai báo những hook mà plugin triển khai      |
| `skills`           | object[]? | Các định nghĩa kỹ năng tùy chọn                                   |
| `enabledByDefault` | boolean?  | Tự động kích hoạt khi cài đặt                                     |
| `configSchema`     | object?   | Ánh xạ các trường cấu hình (`string`/`number`/`boolean`/`select`) |
| `integrity`        | string?   | Ghim tệp điểm vào bằng `sha256-<base64>` tùy chọn                 |

Các quyền được lấy từ enum
`network` / `file-read` / `file-write` / `env` / `exec`.

## Luồng vòng đời

```
install (POST /api/plugins, đường dẫn)
  → quét/xác thực manifest → sao chép vào staging → đảm bảo main nằm trong thư mục
  → đổi tên nguyên tử vào ~/.omniroute/plugins/<name> → chèn bản ghi DB
  → kích hoạt onInstall → nếu enabledByDefault: activate

activate (POST /api/plugins/{name}/activate)
  → kiểm tra phạm vi chứa bằng realpath → loadPlugin() (khởi tạo tiến trình con)
  → đăng ký các hook đã khai báo → status = "active" → kích hoạt onActivate

deactivate (POST /api/plugins/{name}/deactivate)
  → kích hoạt onDeactivate (TRƯỚC KHI hủy đăng ký) → hủy đăng ký các hook
  → kết thúc tiến trình con → status = "inactive"

uninstall (DELETE /api/plugins/{name})
  → deactivate nếu đang hoạt động → kích hoạt onUninstall
  → xóa đệ quy thư mục plugin sau khi kiểm tra phạm vi chứa → xóa bản ghi DB
```

Chạy lại `install` với một thư mục có phiên bản manifest **mới hơn hoàn toàn**
so với phiên bản đã cài đặt sẽ tự động nâng cấp (cài đặt lại sạch; cấu hình được
đặt lại về mặc định). Phiên bản bằng hoặc cũ hơn sẽ bị từ chối.

## Cơ sở dữ liệu

Bảng `plugins` (migration `076_create_plugins.sql`):

| Cột             | Kiểu    | Ghi chú                                                |
| --------------- | ------- | ------------------------------------------------------ |
| `id`            | TEXT PK | UUID                                                   |
| `name`          | TEXT    | Duy nhất                                               |
| `version`       | TEXT    | semver; mặc định `1.0.0`                               |
| `description`   | TEXT    | Không bắt buộc                                         |
| `author`        | TEXT    | Không bắt buộc                                         |
| `license`       | TEXT    | Mặc định `MIT`                                         |
| `main`          | TEXT    | Tệp điểm vào; mặc định `index.js`                      |
| `source`        | TEXT    | Mặc định `local`                                       |
| `tags`          | TEXT    | Mảng JSON; mặc định `[]`                               |
| `status`        | TEXT    | `installed` \| `active` \| `inactive` \| `error`       |
| `enabled`       | INT     | 0/1; mặc định 0                                        |
| `manifest`      | TEXT    | JSON manifest đầy đủ                                   |
| `config`        | TEXT    | JSON; mặc định `{}`                                    |
| `config_schema` | TEXT    | JSON; mặc định `{}`                                    |
| `hooks`         | TEXT    | Mảng JSON chứa tên các hook đã khai báo; mặc định `[]` |
| `permissions`   | TEXT    | Mảng JSON; mặc định `[]`                               |
| `plugin_dir`    | TEXT    | Thư mục cài đặt tuyệt đối                              |
| `error_message` | TEXT    | Được đặt khi `status = "error"`                        |
| `installed_at`  | TEXT    | `datetime('now')`                                      |
| `updated_at`    | TEXT    | `datetime('now')`                                      |
| `activated_at`  | TEXT    | Được đặt khi kích hoạt                                 |

Số liệu/hoạt động phân tích của plugin được theo dõi trong các bảng bổ sung
(`090_plugin_metrics.sql`, `091_plugin_analytics.sql`).

## Bảng điều khiển

Trang bảng điều khiển tại `/dashboard/plugins`
(`src/app/(dashboard)/dashboard/plugins/page.tsx`) cung cấp hai tab:

- **Đã cài đặt** — liệt kê các plugin đã cài đặt cùng với các hook được khai báo,
  nút chuyển đổi kích hoạt/vô hiệu hóa, nút gỡ cài đặt và thao tác "Quét tìm plugin"
  (`POST /api/plugins/scan`).
- **Marketplace** — hiển thị danh mục từ `GET /api/plugins/marketplace` cùng với
  một trường để đặt URL registry tùy chỉnh.

Trang cấu hình riêng cho từng plugin nằm tại `/dashboard/plugins/[name]/config`
(`src/app/(dashboard)/dashboard/plugins/[name]/config/page.tsx`).

## Xem thêm

- [`docs/security/ROUTE_GUARD_TIERS.md`](../security/ROUTE_GUARD_TIERS.md) —
  lý do `/api/plugins` chỉ có thể truy cập qua loopback (Cấp 1)
- [`docs/frameworks/SKILLS.md`](./SKILLS.md) — framework kỹ năng liên quan
  (`src/lib/skills/`); các plugin có thể khai báo kỹ năng trong manifest của chúng
- [`docs/frameworks/WEBHOOKS.md`](./WEBHOOKS.md) — các tích hợp gửi ra ngoài
  dựa trên sự kiện
- [`docs/security/ERROR_SANITIZATION.md`](../security/ERROR_SANITIZATION.md) —
  mẫu `buildErrorBody()` mà mọi route plugin đều sử dụng cho các phản hồi lỗi
