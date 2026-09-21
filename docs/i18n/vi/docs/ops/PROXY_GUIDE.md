# 🌐 OmniRoute Proxy Guide (Tiếng Việt)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/PROXY_GUIDE.md) · 🇪🇹 [am](../../../am/docs/ops/PROXY_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/ops/PROXY_GUIDE.md) · 🇦🇿 [az](../../../az/docs/ops/PROXY_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/ops/PROXY_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/ops/PROXY_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/ops/PROXY_GUIDE.md) · 🇩🇰 [da](../../../da/docs/ops/PROXY_GUIDE.md) · 🇩🇪 [de](../../../de/docs/ops/PROXY_GUIDE.md) · 🇬🇷 [el](../../../el/docs/ops/PROXY_GUIDE.md) · 🇪🇸 [es](../../../es/docs/ops/PROXY_GUIDE.md) · 🇪🇪 [et](../../../et/docs/ops/PROXY_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/ops/PROXY_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/ops/PROXY_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/ops/PROXY_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/ops/PROXY_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/ops/PROXY_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/ops/PROXY_GUIDE.md) · 🇮🇱 [he](../../../he/docs/ops/PROXY_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/ops/PROXY_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/ops/PROXY_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/ops/PROXY_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/ops/PROXY_GUIDE.md) · 🇮🇩 [id](../../../id/docs/ops/PROXY_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/ops/PROXY_GUIDE.md) · 🇮🇹 [it](../../../it/docs/ops/PROXY_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/ops/PROXY_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/ops/PROXY_GUIDE.md) · 🇰🇭 [km](../../../km/docs/ops/PROXY_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/ops/PROXY_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/ops/PROXY_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/ops/PROXY_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/ops/PROXY_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/ops/PROXY_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/ops/PROXY_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/ops/PROXY_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/ops/PROXY_GUIDE.md) · 🇲🇲 [my](../../../my/docs/ops/PROXY_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/ops/PROXY_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/ops/PROXY_GUIDE.md) · 🇳🇴 [no](../../../no/docs/ops/PROXY_GUIDE.md) · 🇮🇳 [or](../../../or/docs/ops/PROXY_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/ops/PROXY_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/ops/PROXY_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/ops/PROXY_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/ops/PROXY_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/PROXY_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/ops/PROXY_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/ops/PROXY_GUIDE.md) · 🇱🇰 [si](../../../si/docs/ops/PROXY_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/ops/PROXY_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/ops/PROXY_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/ops/PROXY_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/ops/PROXY_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/ops/PROXY_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/ops/PROXY_GUIDE.md) · 🇮🇳 [te](../../../te/docs/ops/PROXY_GUIDE.md) · 🇹🇭 [th](../../../th/docs/ops/PROXY_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/ops/PROXY_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/PROXY_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/ops/PROXY_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/ops/PROXY_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/ops/PROXY_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/PROXY_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/PROXY_GUIDE.md)

---

> **Vượt qua các hạn chế địa lý, bảo vệ danh tính và định tuyến lưu lượng AI qua bất kỳ proxy nào — mà không gặp sự phức tạp trong cấu hình.**

OmniRoute bao gồm một hệ thống quản lý proxy đầy đủ tính năng, cho phép bạn định tuyến lưu lượng đến các nhà cung cấp AI thượng nguồn qua proxy HTTP, HTTPS hoặc SOCKS5. Dù bạn đang ở khu vực bị chặn, cần xoay vòng IP hay muốn che giấu dấu vân tay — hướng dẫn này sẽ trình bày mọi nội dung cần thiết.

---

## Mục lục

- [Tại sao nên sử dụng proxy?](#why-use-proxies)
- [Tổng quan kiến trúc](#architecture-overview)
- [Hệ thống proxy 4 cấp](#4-level-proxy-system)
- [Sổ đăng ký proxy (CRUD)](#proxy-registry-crud)
- [Kho proxy miễn phí 1proxy](#1proxy-free-proxy-marketplace)
- [Xoay vòng proxy](#proxy-rotation)
- [Chống phát hiện & ẩn danh](#anti-detection--stealth)
- [Các chế độ proxy thượng nguồn](#upstream-proxy-modes)
- [Giao diện bảng điều khiển](#dashboard-ui)
- [Tài liệu tham khảo API](#api-reference)
- [Biến môi trường](#environment-variables)
- [Khắc phục sự cố](#troubleshooting)

---

## Tại sao nên sử dụng proxy?

Nhiều nhà cung cấp AI hạn chế quyền truy cập theo khu vực địa lý. Các nhà phát triển tại **Nga, Trung Quốc, Iran, Cuba, Thổ Nhĩ Kỳ** và những quốc gia khác có thể gặp các lỗi như:

```
unsupported_country_region_territory
```

Ngay cả khi ở ngoài các khu vực bị chặn, proxy vẫn hữu ích cho các mục đích sau:

| Trường hợp sử dụng      | Mô tả                                                              |
| ----------------------- | ------------------------------------------------------------------ |
| **Vượt hạn chế địa lý** | Truy cập OpenAI, Anthropic, Codex, Copilot từ các quốc gia bị chặn |
| **Xoay vòng IP**        | Phân phối yêu cầu trên nhiều IP để tránh bị giới hạn tốc độ        |
| **Quyền riêng tư**      | Ẩn địa chỉ IP thực của bạn khỏi các nhà cung cấp thượng nguồn      |
| **Tuân thủ**            | Định tuyến lưu lượng qua các khu vực tài phán cụ thể               |
| **Kiểm thử**            | Mô phỏng các yêu cầu đến từ những khu vực khác nhau                |

---

## Tổng quan kiến trúc

```
┌───────────────────────────────────────────────────────────────┐
│                       Máy chủ OmniRoute                       │
│                                                               │
│  ┌─────────────┐    ┌──────────────┐    ┌──────────────────┐  │
│  │ Sổ đăng ký  │    │ Bộ điều phối │    │ Fetch (undici)   │  │
│  │ proxy       │───▶│ proxy        │───▶│                  │  │
│  │ (SQLite)    │    │ (được lưu đệm)│    │                  │  │
│  └─────────────┘    └──────────────┘    └────────┬─────────┘  │
│         ▲                                        │            │
│         │                                        ▼            │
│  ┌──────┴──────┐                        ┌──────────────────┐  │
│  │ Đồng bộ     │                        │ API nhà cung cấp │  │
│  │ 1proxy      │                        │ thượng nguồn     │  │
│  │ (nhóm miễn phí)│                     │                  │  │
│  └─────────────┘                        └──────────────────┘  │
└───────────────────────────────────────────────────────────────┘
```

### Các thành phần chính

| Thành phần             | Tệp                                          | Vai trò                                                                         |
| ---------------------- | -------------------------------------------- | ------------------------------------------------------------------------------- |
| **Sổ đăng ký proxy**   | `src/lib/db/proxies.ts`                      | Các thao tác CRUD cho mục proxy + phép gán phạm vi                              |
| **Bộ điều phối proxy** | `open-sse/utils/proxyDispatcher.ts`          | Tạo các bộ điều phối ProxyAgent/SOCKS của `undici` có hỗ trợ lưu vào bộ nhớ đệm |
| **Proxy Fetch**        | `open-sse/utils/proxyFetch.ts`               | Bao bọc `fetch()` và chèn bộ điều phối proxy                                    |
| **Tuyến cài đặt**      | `src/app/api/settings/proxy/route.ts`        | API cấu hình proxy cũ (GET/PUT/DELETE)                                          |
| **Tuyến quản lý**      | `src/app/api/v1/management/proxies/route.ts` | API CRUD cho sổ đăng ký (GET/POST/PATCH/DELETE)                                 |
| **CSDL 1proxy**        | `src/lib/db/oneproxy.ts`                     | Lưu trữ bền vững cho kho proxy miễn phí                                         |

---

## Hệ thống Proxy 4 cấp

OmniRoute hỗ trợ cấu hình proxy ở **bốn phạm vi độc lập**, được phân giải theo thứ tự ưu tiên:

```
Thứ tự ưu tiên phân giải (cao nhất → thấp nhất):

  1. 🔵 Proxy tài khoản/kết nối  →  theo từng API key / kết nối OAuth
  2. 🟡 Proxy nhà cung cấp       →  theo từng nhà cung cấp (ví dụ: toàn bộ lưu lượng OpenAI)
  3. 🟠 Proxy tổ hợp             →  theo từng cấu hình tổ hợp/định tuyến
  4. 🟢 Proxy toàn cục           →  toàn bộ lưu lượng, mọi nhà cung cấp
```

### Cách thức phân giải hoạt động

Khi OmniRoute gửi yêu cầu đến một nhà cung cấp thượng nguồn, hệ thống sẽ gọi `resolveProxyForConnectionFromRegistry()` để kiểm tra lần lượt từng cấp:

1. **Cấp tài khoản** — Có proxy nào được gán cho ID kết nối cụ thể này không?
2. **Cấp nhà cung cấp** — Có proxy nào được gán cho nhà cung cấp này (ví dụ: `openai`) không?
3. **Cấp toàn cục** — Có proxy toàn cục nào được cấu hình không?
4. **Không có proxy** — Kết nối trực tiếp đến nhà cung cấp.

Kết quả khớp đầu tiên sẽ được sử dụng. Điều này có nghĩa là bạn có thể đặt một proxy toàn cục làm phương án dự phòng nhưng ghi đè proxy đó cho các nhà cung cấp hoặc kết nối cụ thể.

### Những lưu lượng được chuyển qua proxy

| Loại lưu lượng        | Qua proxy? | Ghi chú                                          |
| --------------------- | ---------- | ------------------------------------------------ |
| Hoàn thành trò chuyện | ✅         | Mọi yêu cầu `/v1/chat/completions`               |
| Embedding             | ✅         | `/v1/embeddings`                                 |
| Tạo hình ảnh          | ✅         | `/v1/images/generations`                         |
| Âm thanh (TTS/STT)    | ✅         | `/v1/audio/*`                                    |
| Trao đổi token OAuth  | ✅         | Khắc phục `unsupported_country_region_territory` |
| Kiểm tra kết nối      | ✅         | Nút "Kiểm tra kết nối" sử dụng proxy             |
| Làm mới token         | ✅         | Gia hạn OAuth trong nền                          |
| Đồng bộ mô hình       | ✅         | Liệt kê và khám phá mô hình                      |

---

## Sổ đăng ký Proxy (CRUD)

Sổ đăng ký proxy là một bảng SQLite (`proxy_registry`) lưu trữ tất cả proxy của bạn. Mỗi proxy có:

| Trường     | Kiểu      | Mô tả                                             |
| ---------- | --------- | ------------------------------------------------- |
| `id`       | UUID      | Mã định danh duy nhất                             |
| `name`     | Chuỗi     | Nhãn dễ đọc                                       |
| `type`     | Chuỗi     | Giao thức: `http`, `https`, `socks5`              |
| `host`     | Chuỗi     | Tên máy chủ hoặc IP của proxy                     |
| `port`     | Số nguyên | Số cổng                                           |
| `username` | Chuỗi     | Tên người dùng xác thực (được mã hóa khi lưu trữ) |
| `password` | Chuỗi     | Mật khẩu xác thực (được mã hóa khi lưu trữ)       |
| `region`   | Chuỗi     | Nhãn khu vực địa lý                               |
| `notes`    | Chuỗi     | Ghi chú dạng văn bản tự do                        |
| `status`   | Chuỗi     | `active` hoặc `inactive`                          |
| `source`   | Chuỗi     | `manual` hoặc `oneproxy`                          |

### Tạo Proxy

**Qua Dashboard:**

1. Đi tới **Cài đặt → Proxy**
2. Nhấp vào **Thêm Proxy**
3. Điền loại, máy chủ, cổng và thông tin xác thực tùy chọn
4. Lưu

**Qua API:**

```bash
curl -X POST http://localhost:20128/api/v1/management/proxies \
  -H "Content-Type: application/json" \
  -d '{
    "name": "US Proxy",
    "type": "http",
    "host": "proxy.example.com",
    "port": 8080,
    "username": "user",
    "password": "pass",
    "region": "US"
  }'
```

### Cập nhật Proxy

```bash
curl -X PATCH http://localhost:20128/api/v1/management/proxies \
  -H "Content-Type: application/json" \
  -d '{
    "id": "proxy-uuid-here",
    "host": "new-proxy.example.com",
    "port": 9090
  }'
```

> **Lưu ý:** Thông tin xác thực được giữ nguyên trừ khi bạn gửi rõ ràng các giá trị thay thế không rỗng. Việc gửi chuỗi rỗng cho `username`/`password` sẽ giữ nguyên các giá trị đã lưu.

### Xóa Proxy

```bash
# Thất bại nếu proxy được gán cho bất kỳ phạm vi nào
curl -X DELETE "http://localhost:20128/api/v1/management/proxies?id=proxy-uuid"

# Buộc xóa (đồng thời xóa các phép gán)
curl -X DELETE "http://localhost:20128/api/v1/management/proxies?id=proxy-uuid&force=1"
```

### Liệt kê Proxy

```bash
curl "http://localhost:20128/api/v1/management/proxies?limit=50&offset=0"
```

### Gán Proxy cho các phạm vi

```bash
# Gán cho phạm vi toàn cục
curl -X PUT http://localhost:20128/api/settings/proxy \
  -H "Content-Type: application/json" \
  -d '{"level": "global", "proxy": {"type":"http","host":"proxy.example.com","port":8080}}'

# Gán cho một nhà cung cấp cụ thể
curl -X PUT http://localhost:20128/api/settings/proxy \
  -H "Content-Type: application/json" \
  -d '{"level": "provider", "id": "openai", "proxy": {"type":"socks5","host":"socks.example.com","port":1080}}'

# Gán cho một kết nối/khóa cụ thể
curl -X PUT http://localhost:20128/api/settings/proxy \
  -H "Content-Type: application/json" \
  -d '{"level": "key", "id": "connection-uuid", "proxy": {"type":"http","host":"key-proxy.com","port":3128}}'
```

### Phân giải Proxy có hiệu lực

Kiểm tra proxy nào sẽ được sử dụng cho một kết nối nhất định:

```bash
curl "http://localhost:20128/api/settings/proxy?resolve=connection-uuid"
```

Trả về proxy đã phân giải cùng với cấp của proxy đó (`account`, `provider` hoặc `global`) và nguồn.

### Gán hàng loạt

Gán một proxy cho nhiều nhà cung cấp hoặc kết nối cùng lúc:

```bash
curl -X POST http://localhost:20128/api/v1/management/proxies/bulk-assign \
  -H "Content-Type: application/json" \
  -d '{
    "scope": "provider",
    "scopeIds": ["openai", "anthropic", "codex"],
    "proxyId": "proxy-uuid"
  }'
```

### Nhập/Xuất

Các proxy được bao gồm trong hệ thống **Sao lưu/Khôi phục**. Khi bạn xuất cấu hình OmniRoute:

1. Đi tới **Dashboard → Cài đặt → Sao lưu**
2. Nhấp vào **Xuất** — sổ đăng ký proxy và các phép gán đều được bao gồm
3. Để khôi phục, nhấp vào **Nhập** và tải tệp sao lưu lên

Sổ đăng ký proxy cũng hỗ trợ **upsert theo host+port** — nếu bạn nhập một proxy đã tồn tại (cùng máy chủ và cổng), proxy đó sẽ được cập nhật thay vì tạo bản sao trùng lặp.

### Di chuyển dữ liệu cũ

Nếu bạn đã cấu hình proxy trong phiên bản cũ hơn (trước khi có registry), OmniRoute sẽ tự động di chuyển chúng:

```
Kho key_value cũ → proxy_registry + proxy_assignments
```

Quá trình này diễn ra một lần trong lần khởi động đầu tiên sau khi nâng cấp. Sử dụng `migrateLegacyProxyConfigToRegistry({ force: true })` để chạy lại.

---

## Chợ Proxy Miễn phí 1proxy

> 🆕 **Được đóng góp bởi [@oyi77](https://github.com/oyi77)** — PR [#1847](https://github.com/diegosouzapw/OmniRoute/pull/1847) (Vấn đề [#1788](https://github.com/diegosouzapw/OmniRoute/issues/1788))

OmniRoute tích hợp với nền tảng cộng đồng **[1proxy](https://1proxy-api.aitradepulse.com)** để cung cấp quyền truy cập vào **hàng trăm proxy miễn phí đã được xác thực** từ khắp nơi trên thế giới. Đây là lựa chọn hoàn hảo cho những người dùng không có hạ tầng proxy riêng.

### Cách Hoạt động

```
┌─────────────┐   Đồng bộ    ┌─────────────────┐   Luân phiên   ┌──────────────┐
│  API 1proxy │ ────────────▶ │  proxy_registry  │ ────────────▶ │ API nhà cung │
│  (bên ngoài)│  tối đa 500  │  source=oneproxy │  theo chất     │     cấp      │
└─────────────┘     proxy     └─────────────────┘     lượng       └──────────────┘
```

1. **Đồng bộ** — OmniRoute lấy các proxy đã được xác thực từ API 1proxy
2. **Lưu trữ** — Proxy được lưu vào cùng bảng `proxy_registry` với `source = 'oneproxy'`
3. **Lọc** — Lọc theo giao thức, quốc gia và điểm chất lượng
4. **Luân phiên** — Chọn proxy tốt nhất bằng chiến lược dựa trên chất lượng, ngẫu nhiên hoặc tuần tự
5. **Tự động hạ cấp** — Proxy bị lỗi sẽ bị giảm điểm chất lượng; nếu thấp hơn ngưỡng → được đánh dấu là không hoạt động

### Đồng bộ Proxy

**Qua Bảng điều khiển:**

1. Đi tới tab **Cài đặt → 1proxy**
2. Nhấp vào **"Đồng bộ ngay"**
3. Xem số liệu thống kê: tổng số proxy, số lượng đang hoạt động, chất lượng trung bình và phân bố theo quốc gia

**Qua API:**

```bash
# Kích hoạt đồng bộ
curl -X POST http://localhost:20128/api/settings/oneproxy \
  -H "Content-Type: application/json" \
  -d '{}'

# Phản hồi:
# { "success": true, "added": 127, "updated": 45, "failed": 2, "total": 172 }
```

### Lọc Proxy

```bash
# Lọc theo giao thức
curl "http://localhost:20128/api/settings/oneproxy?protocol=socks5"

# Lọc theo quốc gia
curl "http://localhost:20128/api/settings/oneproxy?countryCode=US"

# Lọc theo điểm chất lượng tối thiểu
curl "http://localhost:20128/api/settings/oneproxy?minQuality=80"

# Kết hợp các bộ lọc
curl "http://localhost:20128/api/settings/oneproxy?protocol=http&countryCode=DE&minQuality=70"
```

### Điểm Chất lượng Proxy

Mỗi proxy 1proxy đi kèm với siêu dữ liệu:

| Trường          | Mô tả                                                  |
| --------------- | ------------------------------------------------------ |
| `qualityScore`  | Điểm đánh giá 0-100 từ quá trình xác thực của 1proxy   |
| `latencyMs`     | Độ trễ mạng đo được                                    |
| `anonymity`     | `transparent`, `anonymous` hoặc `elite`                |
| `googleAccess`  | Proxy có thể truy cập các dịch vụ của Google hay không |
| `countryCode`   | Mã quốc gia ISO gồm hai chữ cái                        |
| `lastValidated` | Dấu thời gian của lần xác thực gần nhất                |

Điểm chất lượng được điều chỉnh linh hoạt:

- **Yêu cầu thất bại** làm giảm điểm 10 điểm
- **Điểm giảm xuống ≤10** → proxy được đánh dấu là `inactive`
- Các proxy không hoạt động sẽ bị loại khỏi quá trình luân phiên

### Chiến lược Luân phiên

```bash
# Luân phiên theo chất lượng (proxy tốt nhất trước) — mặc định
curl -X POST http://localhost:20128/api/settings/oneproxy/rotate \
  -H "Content-Type: application/json" \
  -d '{"strategy": "quality"}'

# Luân phiên ngẫu nhiên
curl -X POST http://localhost:20128/api/settings/oneproxy/rotate \
  -d '{"strategy": "random"}'

# Tuần tự (proxy được xác thực cách đây lâu nhất trước)
curl -X POST http://localhost:20128/api/settings/oneproxy/rotate \
  -d '{"strategy": "sequential"}'
```

### Bộ ngắt Mạch

Tính năng đồng bộ 1proxy có bộ ngắt mạch tích hợp sẵn:

- Sau **5 lần đồng bộ thất bại liên tiếp**, các lần đồng bộ tiếp theo sẽ bị chặn
- Đặt lại bằng: `resetOneproxyCircuitBreaker()` hoặc khởi động lại máy chủ
- Trạng thái đồng bộ có tại `GET /api/settings/oneproxy?action=status`

### Xóa Proxy 1proxy

```bash
# Xóa một proxy 1proxy
curl -X DELETE "http://localhost:20128/api/settings/oneproxy?id=proxy-uuid"

# Xóa TẤT CẢ proxy 1proxy (các proxy thủ công không bị ảnh hưởng)
curl -X DELETE "http://localhost:20128/api/settings/oneproxy?clearAll=1"
```

---

## Chống Phát Hiện & Ẩn Danh

OmniRoute không chỉ định tuyến lưu lượng qua proxy — nó còn khiến lưu lượng trông hợp lệ:

### Giả Mạo Dấu Vân Tay TLS

Sử dụng `wreq-js` để tạo dấu vân tay TLS giống trình duyệt, vượt qua các hệ thống phát hiện bot vốn gắn cờ những quy trình bắt tay TLS không phải của trình duyệt.

### Khớp Dấu Vân Tay CLI

**Nút Bật/Tắt Dấu Vân Tay CLI** (`Settings → Security`) sắp xếp lại các header HTTP và trường trong phần thân JSON để khớp với chữ ký chính xác của các tệp nhị phân CLI gốc (Claude Code, Codex, v.v.). Tính năng này hoạt động **kết hợp với** proxy:

```
IP của bạn (bị chặn) → IP proxy (Hoa Kỳ) → API của nhà cung cấp
                        + giả mạo TLS
                        + dấu vân tay CLI
```

Bạn đồng thời có được cả **khả năng che giấu IP** và **tính xác thực của yêu cầu**.

### Bảo Toàn IP Proxy

Các huy hiệu được mã hóa bằng màu trong bảng điều khiển cho biết cấp proxy nào đang hoạt động:

| Huy hiệu | Cấp độ       | Ý nghĩa                                         |
| -------- | ------------ | ----------------------------------------------- |
| 🟢       | Toàn cục     | Tất cả lưu lượng đều đi qua proxy này           |
| 🟡       | Nhà cung cấp | Chỉ lưu lượng của nhà cung cấp này đi qua proxy |
| 🔵       | Kết nối      | Khóa/tài khoản cụ thể này sử dụng proxy này     |

Huy hiệu cũng hiển thị IP proxy đã được phân giải để xác minh.

---

## Chế Độ Proxy Thượng Nguồn

Đối với các nhà cung cấp sử dụng mẫu CLIProxyAPI, OmniRoute hỗ trợ ba chế độ proxy thượng nguồn:

| Chế độ        | Mô tả                                                         |
| ------------- | ------------------------------------------------------------- |
| `native`      | OmniRoute trực tiếp xử lý việc định tuyến proxy (mặc định)    |
| `cliproxyapi` | Ủy quyền cho một phiên bản CLIProxyAPI bên ngoài              |
| `fallback`    | Thử chế độ gốc trước, sau đó chuyển sang CLIProxyAPI dự phòng |

Cấu hình theo từng nhà cung cấp:

```bash
curl -X PUT "http://localhost:20128/api/upstream-proxy/openai" \
  -H "Content-Type: application/json" \
  -d '{"mode": "native", "enabled": true}'
```

---

## Giao Diện Bảng Điều Khiển

### Settings → Thẻ Proxy

- Cấu hình **proxy toàn cục** (thiết lập một lần cho toàn bộ lưu lượng)
- Ghi đè **proxy theo từng nhà cung cấp**
- Gán **proxy theo từng kết nối**
- **Kiểm tra kết nối** thông qua proxy đã cấu hình
- **Huy hiệu được mã hóa bằng màu** hiển thị cấp proxy đang hoạt động

### Settings → Thẻ 1proxy

- Nút **Đồng Bộ Ngay** để tải các proxy miễn phí
- **Thẻ thống kê**: Tổng số, Đang hoạt động, Chất lượng trung bình, Lần đồng bộ gần nhất
- **Bộ lọc**: Giao thức, Mã quốc gia, Chất lượng tối thiểu
- **Bảng proxy** chứa máy chủ, giao thức, quốc gia, điểm chất lượng, độ trễ, mức độ ẩn danh, khả năng truy cập Google
- Bảng **trạng thái đồng bộ** có chức năng theo dõi thành công/thất bại và số lần thất bại liên tiếp
- **Xóa Tất Cả** để xóa toàn bộ mục 1proxy

---

## Tài Liệu Tham Khảo API

### API Cài Đặt Proxy

| Phương thức | Điểm cuối                                      | Mô tả                        |
| ----------- | ---------------------------------------------- | ---------------------------- |
| `GET`       | `/api/settings/proxy`                          | Lấy cấu hình proxy đầy đủ    |
| `GET`       | `/api/settings/proxy?level=global`             | Lấy proxy toàn cục           |
| `GET`       | `/api/settings/proxy?level=provider&id=openai` | Lấy proxy của nhà cung cấp   |
| `GET`       | `/api/settings/proxy?resolve=connectionId`     | Phân giải proxy có hiệu lực  |
| `PUT`       | `/api/settings/proxy`                          | Cập nhật cấu hình proxy      |
| `DELETE`    | `/api/settings/proxy?level=provider&id=openai` | Xóa proxy ở cấp độ tương ứng |

### API Registry Proxy

| Phương thức | Điểm cuối                                         | Mô tả                     |
| ----------- | ------------------------------------------------- | ------------------------- |
| `GET`       | `/api/v1/management/proxies`                      | Liệt kê tất cả proxy      |
| `GET`       | `/api/v1/management/proxies?id=uuid`              | Lấy proxy theo ID         |
| `GET`       | `/api/v1/management/proxies?id=uuid&where_used=1` | Lấy các phép gán proxy    |
| `POST`      | `/api/v1/management/proxies`                      | Tạo proxy                 |
| `PATCH`     | `/api/v1/management/proxies`                      | Cập nhật proxy            |
| `DELETE`    | `/api/v1/management/proxies?id=uuid`              | Xóa proxy                 |
| `DELETE`    | `/api/v1/management/proxies?id=uuid&force=1`      | Buộc xóa                  |
| `POST`      | `/api/v1/management/proxies/bulk-assign`          | Gán hàng loạt             |
| `GET`       | `/api/v1/management/proxies/assignments`          | Liệt kê các phép gán      |
| `GET`       | `/api/v1/management/proxies/health`               | Thống kê tình trạng proxy |

### API Tunnel

Để công khai phiên bản OmniRoute của bạn trên internet (Cloudflare/ngrok/Tailscale) thay vì định tuyến lưu lượng đi qua proxy, hãy xem [TUNNELS_GUIDE.md](./TUNNELS_GUIDE.md). API REST của tunnel nằm dưới `/api/tunnels/{cloudflared,ngrok,tailscale}/*` và độc lập với chuỗi proxy chiều ra được mô tả ở trên.

### API 1proxy

| Phương thức | Điểm cuối                              | Mô tả                             |
| ----------- | -------------------------------------- | --------------------------------- |
| `GET`       | `/api/settings/oneproxy`               | Liệt kê các proxy 1proxy          |
| `GET`       | `/api/settings/oneproxy?action=stats`  | Lấy thống kê + trạng thái đồng bộ |
| `GET`       | `/api/settings/oneproxy?action=status` | Chỉ lấy trạng thái đồng bộ        |
| `POST`      | `/api/settings/oneproxy`               | Kích hoạt đồng bộ                 |
| `POST`      | `/api/settings/oneproxy/rotate`        | Chuyển sang proxy tiếp theo       |
| `DELETE`    | `/api/settings/oneproxy?id=uuid`       | Xóa một proxy                     |
| `DELETE`    | `/api/settings/oneproxy?clearAll=1`    | Xóa tất cả                        |

### API Proxy Thượng Nguồn

| Phương thức | Điểm cuối                         | Mô tả                               |
| ----------- | --------------------------------- | ----------------------------------- |
| `GET`       | `/api/upstream-proxy/:providerId` | Lấy cấu hình proxy thượng nguồn     |
| `PUT`       | `/api/upstream-proxy/:providerId` | Thiết lập chế độ proxy thượng nguồn |
| `DELETE`    | `/api/upstream-proxy/:providerId` | Xóa cấu hình proxy thượng nguồn     |

---

## Biến môi trường

| Biến                  | Mặc định | Mô tả                                                             |
| --------------------- | -------- | ----------------------------------------------------------------- |
| `ENABLE_SOCKS5_PROXY` | `true`   | Bật hỗ trợ proxy SOCKS5 (mặc định là `true` trong `.env.example`) |

---

## Khắc phục sự cố

### "Proxy SOCKS5 đã bị vô hiệu hóa"

Đặt `ENABLE_SOCKS5_PROXY=true` trong tệp `.env` của bạn và khởi động lại.

### Lỗi "socket hang up" khi sử dụng proxy

Điều này là bình thường với các proxy giá rẻ thường ngắt những kết nối không hoạt động. OmniRoute đã xử lý vấn đề này bằng cách:

- Vô hiệu hóa keep-alive trên các kết nối proxy (`keepAliveTimeout: 1`)
- Vô hiệu hóa pipelining (`pipelining: 0`)
- Lưu bộ điều phối vào bộ nhớ đệm để tránh lặp lại quá trình bắt tay

Nếu sự cố vẫn tiếp diễn, hãy thử một proxy khác hoặc sử dụng tính năng xoay vòng của 1proxy.

### "unsupported_country_region_territory" trong quá trình OAuth

Đảm bảo proxy được cấu hình **trước khi** bắt đầu quy trình OAuth. OmniRoute định tuyến việc trao đổi token OAuth qua proxy đã cấu hình. Trước tiên, hãy thiết lập proxy ở cấp độ toàn cục hoặc nhà cung cấp, sau đó kết nối.

### Proxy không được sử dụng

Kiểm tra thứ tự phân giải:

1. Xác minh bằng `GET /api/settings/proxy?resolve=your-connection-id`
2. Kiểm tra xem `status` của proxy có phải là `active` (không phải `inactive`) hay không
3. Đảm bảo phạm vi gán proxy khớp với kết nối của bạn

### Đồng bộ hóa 1proxy không thành công

Kiểm tra trạng thái đồng bộ hóa:

```bash
curl "http://localhost:20128/api/settings/oneproxy?action=status"
```

Nếu `consecutiveFailures >= 5`, bộ ngắt mạch đã được kích hoạt. Khởi động lại máy chủ để đặt lại hoặc chờ đặt lại thủ công.

---

## Lược đồ cơ sở dữ liệu

### Bảng `proxy_registry`

```sql
CREATE TABLE proxy_registry (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  type TEXT NOT NULL DEFAULT 'http',
  host TEXT NOT NULL,
  port INTEGER NOT NULL,
  username TEXT DEFAULT '',
  password TEXT DEFAULT '',
  region TEXT,
  notes TEXT,
  status TEXT DEFAULT 'active',
  source TEXT NOT NULL DEFAULT 'manual',    -- 'manual' hoặc 'oneproxy'
  quality_score INTEGER,                     -- 0-100 (chỉ dành cho 1proxy)
  latency_ms INTEGER,                        -- mili giây (chỉ dành cho 1proxy)
  anonymity TEXT,                            -- trong suốt/ẩn danh/ưu tú
  google_access INTEGER DEFAULT 0,           -- có thể truy cập Google? (1proxy)
  last_validated TEXT,                       -- dấu thời gian ISO (1proxy)
  country_code TEXT,                         -- mã ISO gồm 2 chữ cái (1proxy)
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL
);
```

### Bảng `proxy_assignments`

```sql
CREATE TABLE proxy_assignments (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  proxy_id TEXT NOT NULL REFERENCES proxy_registry(id),
  scope TEXT NOT NULL,        -- 'global', 'provider', 'account', 'combo'
  scope_id TEXT,              -- ID nhà cung cấp, ID kết nối hoặc ID tổ hợp
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL,
  UNIQUE(scope, scope_id)
);
```

---

## Kiểm tra tình trạng proxy (v3.8.16+)

Cơ chế **proxy fast-fail** của OmniRoute (`src/lib/proxyHealth.ts`) phát hiện các proxy không hoạt động trong <2 giây thông qua kiểm tra kết nối TCP nhanh, sau đó **lưu kết quả vào bộ nhớ đệm** để tránh phát sinh chi phí cho mỗi yêu cầu.

### Cách hoạt động

```
Yêu cầu ──▶ ProxyHealthCache.get(url)
             │
             ├─ Có trong bộ nhớ đệm + còn mới?  ──▶ trả về trạng thái đã lưu
             │
             └─ Không có / đã cũ?  ──▶ Kết nối TCP tới host:port
                                          (thời gian chờ: FAST_FAIL_TIMEOUT_MS)
                                          ──▶ lưu vào bộ nhớ đệm trong HEALTH_CACHE_TTL_MS
                                          ──▶ trả về kết quả
```

Nếu không có cơ chế này, một proxy không hoạt động sẽ chặn mọi yêu cầu trong toàn bộ thời gian `PROXY_TIMEOUT_MS` (mặc định 30 giây) trước khi báo lỗi.

### Các biến môi trường có thể điều chỉnh

| Biến                         | Mặc định | Mục đích                                              |
| ---------------------------- | -------- | ----------------------------------------------------- |
| `PROXY_FAST_FAIL_TIMEOUT_MS` | `2000`   | Thời gian chờ kết nối TCP cho mỗi lần kiểm tra        |
| `PROXY_HEALTH_CACHE_TTL_MS`  | `30000`  | Thời gian lưu kết quả kiểm tra tình trạng trong cache |

**Giá trị được đề xuất:**

| Trường hợp                   | Thời gian chờ fast-fail | TTL bộ nhớ đệm | Lý do                                                                     |
| ---------------------------- | ----------------------- | -------------- | ------------------------------------------------------------------------- |
| Cổng API có lưu lượng cao    | 1500ms                  | 60000ms        | Báo lỗi nhanh tích cực, lưu cache lâu hơn để giảm số lần kiểm tra         |
| Các nút phân tán theo địa lý | 3000ms                  | 15000ms        | Mạng chậm cần thêm thời gian; cache ngắn hơn để chuyển đổi dự phòng nhanh |
| Phát triển / kiểm thử        | 1000ms                  | 10000ms        | Lặp lại nhanh với các proxy cục bộ                                        |
| Ẩn mình / chống phát hiện    | 2500ms                  | 45000ms        | Tránh thăm dò nhanh có thể kích hoạt giới hạn tốc độ                      |

### Kiểm tra tình trạng proxy

```ts
import { getAllProxyHealthStatuses, invalidateProxyHealth } from "omniroute/proxyHealth";

const statuses = getAllProxyHealthStatuses();
for (const s of statuses) {
  console.log(`${s.proxyUrl} → healthy=${s.healthy}, stale=${s.stale}`);
}

// Buộc kiểm tra lại một proxy cụ thể
invalidateProxyHealth("http://user:pass@203.0.113.7:8080");
```

Cờ `stale` là `true` khi mục trong bộ nhớ đệm đã vượt quá `HEALTH_CACHE_TTL_MS` và yêu cầu tiếp theo sẽ kích hoạt một lần kiểm tra mới.

### Giá trị mặc định theo từng loại proxy

Quá trình kiểm tra tình trạng sử dụng các giá trị mặc định hợp lý dựa trên lược đồ URL:

| Lược đồ                    | Cổng mặc định |
| -------------------------- | ------------- |
| `http://`                  | 8080          |
| `https://`                 | 443           |
| `socks5://` / `socks5h://` | 1080          |

Các cổng tùy chỉnh trong URL (`http://host:9999`) luôn được ưu tiên hơn giá trị mặc định của lược đồ.

---

## Phân tích & Khả năng quan sát Proxy

OmniRoute theo dõi mức sử dụng của từng proxy để giúp người vận hành chẩn đoán các mẫu định tuyến, tình trạng độ trễ tăng đột biến và lỗi tái diễn.

### Các dữ liệu được theo dõi

Đối với mọi yêu cầu đi qua một proxy đã cấu hình, OmniRoute ghi lại:

| Chỉ số       | Mô tả                                                       |
| ------------ | ----------------------------------------------------------- |
| `proxy_url`  | URL proxy đầy đủ (đã che thông tin xác thực)                |
| `provider`   | ID nhà cung cấp thượng nguồn (openai, anthropic, v.v.)      |
| `latency_ms` | Tổng thời gian khứ hồi, bao gồm quá trình bắt tay với proxy |
| `connect_ms` | Chỉ tính thời gian kết nối TCP                              |
| `status`     | Mã trạng thái HTTP từ thượng nguồn                          |
| `error`      | Lớp lỗi nếu yêu cầu thất bại                                |
| `timestamp`  | ISO 8601 UTC                                                |

### Truy cập dữ liệu

```bash
# Các sự kiện proxy gần đây
curl -H "Authorization: Bearer $OMNIROUTE_KEY" \
  "http://localhost:20128/api/usage/proxy-logs?limit=100"
```

Endpoint thực tế là `/api/usage/proxy-logs` (xem `src/app/api/usage/proxy-logs/route.ts`). Endpoint này hỗ trợ:

- `GET /api/usage/proxy-logs` — truy xuất nhật ký proxy
- `DELETE /api/usage/proxy-logs` — xóa toàn bộ nhật ký proxy

Nếu cần, có thể truy vấn trực tiếp số liệu thống kê tổng hợp từ bảng `proxy_logs` bằng SQL. Giao diện dashboard có thể cung cấp các chế độ xem tổng hợp.

### Các mẫu phổ biến

**Phát hiện proxy hoạt động chập chờn** (luân phiên giữa thành công/thất bại):

```sql
SELECT proxy_url,
       COUNT(*) AS total,
       SUM(CASE WHEN status >= 500 THEN 1 ELSE 0 END) AS errors,
       ROUND(100.0 * SUM(CASE WHEN status >= 500 THEN 1 ELSE 0 END) / COUNT(*), 1) AS error_pct
FROM proxy_logs
WHERE timestamp > datetime('now', '-1 hour')
GROUP BY proxy_url
HAVING error_pct > 5
ORDER BY error_pct DESC;
```

**Tìm các proxy chậm** (độ trễ p95 > 2 giây):

```sql
WITH ranked AS (
  SELECT proxy_url, latency_ms,
         PERCENT_RANK() OVER (PARTITION BY proxy_url ORDER BY latency_ms) AS pct
  FROM proxy_logs
  WHERE timestamp > datetime('now', '-24 hour')
)
SELECT proxy_url, latency_ms
FROM ranked
WHERE pct >= 0.95
ORDER BY latency_ms DESC;
```

---

## Cây quyết định chiến lược xoay vòng

Khi nhiều proxy được gán cho một phạm vi, OmniRoute sử dụng một **chiến lược xoay vòng** để chọn proxy sẽ dùng cho từng yêu cầu. Chiến lược được cấu hình ở cấp phạm vi (toàn cục, theo từng nhà cung cấp, theo từng tài khoản, theo từng tổ hợp).

### Các chiến lược khả dụng

| Chiến lược           | Khi nào nên sử dụng                                         | Đánh đổi                                                                               |
| -------------------- | ----------------------------------------------------------- | -------------------------------------------------------------------------------------- |
| `quality` (mặc định) | Môi trường production với các proxy có chất lượng khác nhau | Ưu tiên proxy được đánh giá cao; có thể khiến proxy được đánh giá thấp ít được sử dụng |
| `random`             | Phân phối tải, quyền riêng tư                               | Phân phối đồng đều; bỏ qua các tín hiệu chất lượng                                     |
| `sequential`         | Gỡ lỗi, kiểm thử có tính xác định                           | Luân phiên proxy theo thứ tự; dễ phân tích hành vi                                     |

### Cây quyết định

```
                    Bạn có điểm chất lượng cho các proxy không?
                    │
        ┌───────────┴───────────┐
        │                       │
       CÓ                    KHÔNG
        │                       │
   Tất cả proxy có             │
   chất lượng gần                 │
   tương đương nhau không?       │
        │                       │
   ┌────┴────┐                  │
   │         │                  │
  CÓ       KHÔNG              Dùng
   │         │              `random`
   │         │              (phân bổ đều
   │         │              giúp tích lũy dữ liệu
   │         │              chất lượng theo thời gian)
   │         │
   │    Dùng `quality`
   │    (tốt nhất khi
   │    chất lượng khác nhau)
   │
Dùng `random`
(phân phối tải
đồng đều)
```

## Tự động loại trừ lỗi cho proxy của riêng bạn

Nhóm proxy trên marketplace 1proxy đã tự động hạ cấp các proxy bị lỗi (xem
[Điểm chất lượng proxy](#proxy-quality-scores)). Đối với các proxy **bạn** đã thêm
vào registry, bộ lập lịch kiểm tra tình trạng chạy nền
(`src/lib/proxyHealth/scheduler.ts`) cung cấp cùng cơ chế "tự động loại trừ một
thành viên không hoạt động khỏi chuỗi" mà không xóa bất kỳ thứ gì:

```bash
# .env — vô hiệu hóa tạm thời một proxy sau 3 lần kiểm tra liên tiếp thất bại và
# tự động kích hoạt lại khi proxy bắt đầu phản hồi các lần kiểm tra.
PROXY_AUTO_DISABLE=true
PROXY_AUTO_REMOVE_AFTER=3
```

Cách cơ chế này hoạt động trong một chuỗi nhiều proxy:

1. Bộ lập lịch kiểm tra mọi proxy đã đăng ký sau mỗi `PROXY_HEALTH_INTERVAL_MS`
   (mặc định 10 phút; tối thiểu 1 phút).
2. Sau `PROXY_AUTO_REMOVE_AFTER` lần lỗi **có kết luận rõ ràng** liên tiếp (một
   lỗi kết nối thực sự — thời gian chờ hết hạn hoặc lỗi 5xx của chính đích kiểm tra
   không bao giờ được tính, xem
   [Kiểm tra tình trạng proxy](#proxy-health-checking-v3816)), `status` của proxy
   được đặt thành `dead`.
3. `dead` là một trong các trạng thái bị bộ lọc trạng thái hoạt động dùng khi phân
   giải nhóm/vòng xoay loại trừ, vì vậy vòng xoay của một phạm vi (round-robin /
   ngẫu nhiên / cố định / độ trễ — xem
   [Cây quyết định chiến lược xoay vòng](#rotation-strategy-decision-tree))
   ngay lập tức ngừng cung cấp proxy đó cho các yêu cầu mới. Không proxy nào khác
   trong nhóm bị ảnh hưởng và toàn bộ nhóm không bao giờ âm thầm chuyển sang kết
   nối trực tiếp — xem cơ chế bảo vệ đóng khi lỗi của
   [Hệ thống proxy 4 cấp](#4-level-proxy-system).
4. Bộ lập lịch tiếp tục kiểm tra các proxy `dead` theo cùng khoảng thời gian. Lần
   kiểm tra thành công tiếp theo sẽ chuyển `status` trở lại `active` và proxy sẽ
   tham gia lại vòng xoay — không cần thêm lại theo cách thủ công.

Cơ chế này được thiết kế có chủ đích để **chỉ hoạt động khi được bật và không gây
phá hủy**: theo mặc định, bộ lập lịch chỉ đếm và ghi nhật ký các lỗi (xem chính
sách C trong `decision.ts`), còn `PROXY_AUTO_DISABLE` không bao giờ xóa một hàng
— đó là mục đích của cờ `PROXY_AUTO_REMOVE` riêng biệt và mạnh tay hơn. Nếu cả hai
được đặt thành `true`, `PROXY_AUTO_REMOVE` sẽ được ưu tiên (việc vô hiệu hóa tạm
thời một proxy sắp bị xóa là không cần thiết). Xem tài liệu tham khảo
[Cấu hình môi trường](../reference/ENVIRONMENT.md) để biết danh sách biến đầy đủ.

---

> 📖 **Tài liệu liên quan:**
>
> - [Hướng dẫn người dùng](../guides/USER_GUIDE.md) — Thiết lập và cấu hình chung
> - [Tài liệu tham khảo API](../reference/API_REFERENCE.md) — Tài liệu API đầy đủ
> - [Cấu hình môi trường](../reference/ENVIRONMENT.md) — Tất cả các biến môi trường
