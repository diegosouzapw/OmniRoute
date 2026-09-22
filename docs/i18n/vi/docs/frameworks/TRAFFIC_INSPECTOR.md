# Traffic Inspector (Tiếng Việt)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/TRAFFIC_INSPECTOR.md) · 🇪🇹 [am](../../../am/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇦🇿 [az](../../../az/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇩🇰 [da](../../../da/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇩🇪 [de](../../../de/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇬🇷 [el](../../../el/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇪🇸 [es](../../../es/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇪🇪 [et](../../../et/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇮🇱 [he](../../../he/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇮🇩 [id](../../../id/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇮🇹 [it](../../../it/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇰🇭 [km](../../../km/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇲🇲 [my](../../../my/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇳🇴 [no](../../../no/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇮🇳 [or](../../../or/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇱🇰 [si](../../../si/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇮🇳 [te](../../../te/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇹🇭 [th](../../../th/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/TRAFFIC_INSPECTOR.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/TRAFFIC_INSPECTOR.md)

---

Traffic Inspector là trình gỡ lỗi lưu lượng HTTPS tích hợp sẵn của OmniRoute — một công cụ tương tự Charles Proxy / mitmweb / HTTP Toolkit, có khả năng **nhận biết LLM** và **nhận biết agent**. Công cụ này nằm tại `/dashboard/tools/traffic-inspector` và tiếp nhận lưu lượng trực tiếp từ tối đa 5 nguồn thu thập đồng thời.

**Vị trí trên dashboard:** `/dashboard/tools/traffic-inspector`
**Nhóm trên thanh bên:** Tools (sau AgentBridge)
**Xem thêm:** [`AGENTBRIDGE.md`](./AGENTBRIDGE.md) — AgentBridge là chế độ thu thập 1.

---

## §1 Tổng quan

### Điều gì làm Traffic Inspector trở nên độc đáo

| Tính năng                                                                           | mitmweb  | Charles | Fiddler  | **OmniRoute Traffic Inspector** |
| ----------------------------------------------------------------------------------- | :------: | :-----: | :------: | :-----------------------------: |
| Hoạt động trên nền web                                                              |    ✓     |    ✗    |    ✗     |                ✓                |
| Mã nguồn mở                                                                         |    ✓     |    ✗    | một phần |                ✓                |
| **Nhận biết agent** (biết yêu cầu đến từ Antigravity/Copilot/v.v.)                  |    ✗     |    ✗    |    ✗     |                ✓                |
| **Nhận biết LLM** (phân tích cấu trúc OpenAI/Anthropic/Gemini, token, mô hình)      |    ✗     |    ✗    |    ✗     |                ✓                |
| **Hiển thị ánh xạ mô hình** (gemini-3-flash → claude-sonnet-4.7)                    |    ✗     |    ✗    |    ✗     |                ✓                |
| **Phân tách độ trễ proxy/upstream**                                                 | một phần |    ✗    |    ✗     |                ✓                |
| **Tích hợp với OmniRoute** về định tuyến, phương án dự phòng, chi phí               |    ✗     |    ✗    |    ✗     |                ✓                |
| **Gỡ lỗi proxy trên toàn hệ thống** (bất kỳ ứng dụng nào trên máy)                  |    ✓     |    ✓    |    ✓     |                ✓                |
| **Thu thập máy chủ tùy chỉnh** (chuyển hướng DNS theo từng máy chủ)                 |    ✓     |    ✓    |    ✓     |                ✓                |
| **Chế độ biến môi trường HTTP_PROXY**                                               |    ✓     |    ✓    |    ✓     |                ✓                |
| **Chế độ xem hội thoại** (các bong bóng hội thoại nhiều lượt, tool_use/tool_result) |    ✗     |    ✗    |    ✗     |                ✓                |
| **Trình hợp nhất luồng SSE** (tái dựng từ các sự kiện delta)                        |    ✗     |    ✗    |    ✗     |                ✓                |
| **Ghi phiên** (có tên, có thể xuất dưới dạng .har/.jsonl)                           |    ✗     |    ✓    |    ✓     |                ✓                |

### Kiến trúc trong một đoạn

`TrafficBuffer` (`src/mitm/inspector/buffer.ts`) là một bộ đệm vòng dùng chung trong bộ nhớ (mặc định 1000 mục, có thể cấu hình thông qua `INSPECTOR_BUFFER_SIZE`). Tất cả nguồn thu thập ghi vào đó thông qua `push()`. Lớp bộ đệm phân loại từng mục bằng `kindDetector.ts` (xác định liệu đó có phải là yêu cầu LLM hay không), tính toán một `contextKey` (dấu vân tay SHA-256 của lời nhắc hệ thống) và phát đến tất cả bên đăng ký WebSocket thông qua `globalTrafficBuffer.subscribe()`. Dashboard kết nối qua `GET /api/tools/traffic-inspector/ws` và nhận một ảnh chụp nhanh khi kết nối, sau đó là các sự kiện `new`/`update`/`clear`.

---

## §2 Chế độ thu thập

Traffic Inspector hỗ trợ **5 nguồn thu thập đồng thời**. Mỗi nguồn có thể được bật/tắt độc lập. Trường `source` trên mọi `InterceptedRequest` (`src/mitm/inspector/types.ts`) là một trong các giá trị `"agent-bridge"`, `"custom-host"`, `"http-proxy"`, `"system-proxy"` hoặc `"tproxy"`.

### Chế độ 1 — AgentBridge (mặc định, luôn bật)

**Nguồn:** Các handler AgentBridge (`src/mitm/handlers/base.ts`)
**Cơ chế:** Mỗi lệnh gọi `intercept()` trong `MitmHandlerBase` sẽ gọi `hookBufferStart()` trước khi chuyển tiếp và `hookBufferUpdate()` khi hoàn tất. Không cần cấu hình bổ sung — hoạt động ngay khi AgentBridge chạy.
**Phạm vi:** 9 tác nhân IDE được cấu hình trong AgentBridge
**Lưu ý:** Trường `source` trong `InterceptedRequest` = `"agent-bridge"`

### Chế độ 2 — Máy chủ tùy chỉnh (chuyển hướng DNS)

**Nguồn:** Danh sách máy chủ do người dùng xác định (bảng `inspector_custom_hosts`)
**Cơ chế:** Việc thêm máy chủ qua giao diện người dùng sẽ thêm `127.0.0.1 <host>` vào `/etc/hosts` (yêu cầu sudo). Máy chủ MITM AgentBridge hiện có (cổng 443) tự động tạo chứng chỉ SNI cho máy chủ mới.
**Phạm vi:** Bất kỳ ứng dụng nào sử dụng máy chủ đã thêm — không cần thay đổi cấu hình ứng dụng
**Lưu ý:** `source` = `"custom-host"`

Ví dụ về trường hợp sử dụng:

- Giám sát `api.openai.com` từ các tập lệnh Python
- Gỡ lỗi `my-internal-llm.company.com`
- Thu thập lưu lượng từ thiết bị di động trên cùng mạng (thông qua giả mạo ARP — nâng cao)

### Chế độ 3 — Trình lắng nghe HTTP_PROXY (cổng 8080)

**Nguồn:** Các ứng dụng sử dụng biến môi trường `HTTP_PROXY`/`HTTPS_PROXY`
**Cơ chế:** Trình lắng nghe phụ tại cổng 8080 (`src/mitm/inspector/httpProxyServer.ts`) hoạt động như một proxy HTTP/HTTPS tường minh tiêu chuẩn. Chấp nhận các đường hầm `CONNECT` (HTTPS) và các yêu cầu HTTP trực tiếp.
**Phạm vi:** Bất kỳ ứng dụng nào tuân thủ biến môi trường `HTTP_PROXY` — không cần thay đổi DNS, không cần sudo
**Lưu ý:** `source` = `"http-proxy"`

```bash
# Thu thập nhanh cho một lệnh duy nhất:
HTTPS_PROXY=http://127.0.0.1:8080 curl https://api.openai.com/v1/models

# Thu thập liên tục trong một phiên shell:
export HTTP_PROXY=http://127.0.0.1:8080
export HTTPS_PROXY=http://127.0.0.1:8080
```

**Giới hạn TLS:** Các đường hầm HTTPS `CONNECT` chỉ được thu thập dưới dạng siêu dữ liệu (máy chủ, cổng, thời gian) — nội dung TLS không được giải mã theo mặc định. Bật tùy chọn "Giải mã HTTPS ở chế độ proxy" (tùy chọn tham gia, yêu cầu chứng chỉ AgentBridge phải được tin cậy) để kiểm tra toàn bộ nội dung.

**Xung đột cổng:** Nếu cổng 8080 đang được sử dụng, AgentBridge trả về mã 409 cùng lỗi có cấu trúc. Thay đổi cổng thông qua biến môi trường `INSPECTOR_HTTP_PROXY_PORT`.

### Chế độ 4 — Proxy toàn hệ thống (nâng cao, tùy chọn tham gia)

**Nguồn:** Cài đặt proxy cấp hệ điều hành (áp dụng cho tất cả ứng dụng trên máy)
**Cơ chế:** Sử dụng API của hệ điều hành để chuyển hướng toàn bộ lưu lượng HTTP/HTTPS qua trình lắng nghe HTTP_PROXY:

- **macOS:** `networksetup -setwebproxy / -setsecurewebproxy`
- **Linux:** `gsettings set org.gnome.system.proxy` + `/etc/environment`
- **Windows:** `netsh winhttp set proxy 127.0.0.1:8080`
  **Phạm vi:** Mọi ứng dụng trên máy tuân thủ cài đặt proxy hệ thống
  **Lưu ý:** `source` = `"system-proxy"`

**Cơ chế an toàn:**

- Bộ hẹn giờ tự động vô hiệu hóa (mặc định 30 phút, có thể cấu hình qua `INSPECTOR_SYSTEM_PROXY_GUARD_MINUTES`)
- Trạng thái proxy hệ thống trước đó được lưu trong DB và khôi phục khi hoàn nguyên
- Bảng điều khiển hiển thị lời nhắc "Đang hoàn nguyên proxy hệ thống" nếu người dùng rời khỏi trang trong khi proxy đang hoạt động
- Giao diện người dùng hiển thị huy hiệu `⚠ Nâng cao` + hộp kiểm xác nhận rõ ràng

### Chế độ 5 — Giải mã trong suốt TPROXY (Linux, root, tùy chọn tham gia)

**Nguồn:** TPROXY của kernel + định tuyến theo chính sách (`src/mitm/tproxy/`)
**Cơ chế:** Đánh dấu các kết nối TCP cục bộ đi ra mới đến một cổng đích (mặc định `443`) trong `mangle OUTPUT`; một `ip rule` định tuyến lại các gói tin được đánh dấu để phân phối cục bộ; và đích `TPROXY` của `mangle PREROUTING` chuyển chúng đến một trình lắng nghe trong suốt (**IP_TRANSPARENT**) (cổng mặc định `8443`). Trình lắng nghe kết thúc TLS bằng chứng chỉ lá do CA động cấp **theo từng tên máy chủ SNI khi có yêu cầu**, thu thập phiên trao đổi đã giải mã và chuyển tiếp yêu cầu được mã hóa lại đến đích ban đầu.
**Phạm vi:** Các máy chủ đích **bất kỳ** trên cổng mục tiêu — không giả mạo `/etc/hosts`, không cần biến môi trường `HTTP_PROXY`, không sửa đổi proxy toàn hệ thống. Tiến trình bị chặn không cần thay đổi cấu hình nhưng phải tin cậy CA động.
**Lưu ý:** `source` = `"tproxy"`

**Yêu cầu:** Chỉ hỗ trợ Linux (**IP_TRANSPARENT** chỉ có trên Linux), khả năng **CAP_NET_ADMIN** (root) và một addon N-API gốc phải được biên dịch bằng bộ công cụ C (`npm run build:native:tproxy`). Khi không khả dụng, nút bật/tắt trên bảng điều khiển sẽ bị vô hiệu hóa với chú giải công cụ "Giải mã TPROXY yêu cầu Linux + root + addon gốc". Các quy tắc tường lửa được áp dụng/hoàn nguyên theo giao dịch (sự cố không bao giờ để lại quy tắc `mangle`) và bị xóa khi khởi động lại. Cơ chế chống vòng lặp dựa trên SO_MARK ngăn luồng chuyển tiếp đã mã hóa lại của chính proxy bị chặn lần nữa.

Đây là một hệ thống con đáng kể có hướng dẫn vận hành chuyên biệt riêng — xem `docs/security/MITM-TPROXY-DECRYPT.md` (git; không được biên dịch vào `/docs`) để biết đầy đủ công thức tường lửa, CA động theo từng SNI + trình cài đặt kho tin cậy, tuyến chỉ cục bộ, chi tiết chống vòng lặp và lược đồ cấu hình. Nút bật/tắt được điều khiển bởi `GET / POST / DELETE /api/tools/agent-bridge/tproxy` (lưu ý: tuyến này nằm dưới tiền tố AgentBridge, không phải tiền tố Traffic Inspector).

### So sánh các chế độ thu thập

| Chế độ             | Thiết lập                      |           Sudo?           | Phạm vi                   | Ghi chú                                                                                                                    |
| ------------------ | ------------------------------ | :-----------------------: | ------------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| 1. AgentBridge     | Tự động                        | Một lần (chứng chỉ+hosts) | 9 tác nhân IDE            | Bật mặc định                                                                                                               |
| 2. Hosts tùy chỉnh | Nhập theo từng host            |      Có (tệp hosts)       | Mọi ứng dụng dùng host đó | Được lưu trong DB                                                                                                          |
| 3. HTTP_PROXY      | `export HTTPS_PROXY=...`       |           Không           | Ứng dụng tuân theo env    | Cổng 8080, mặc định không giải mã TLS                                                                                      |
| 4. Toàn hệ thống   | Bật/tắt + xác nhận             |            Có             | Mọi ứng dụng trên máy     | Tự động tắt sau 30 phút                                                                                                    |
| 5. Giải mã TPROXY  | Bật/tắt (Linux + addon native) |  Có (root + cài đặt CA)   | Mọi host trên cổng đích   | Giải mã các host bất kỳ; mặc định tắt — xem `docs/security/MITM-TPROXY-DECRYPT.md` (git; không được biên dịch vào `/docs`) |

---

## §3 Giao diện người dùng

### 3.1 Bố cục

```
┌─ Trình kiểm tra lưu lượng ─────────────────────────────────────────────┐
│ ┌─ Thanh công cụ nguồn thu thập ───────────────────────────────────┐   │
│ │ [✓ AgentBridge]  [✓ Máy chủ tùy chỉnh (3)]  [○ HTTP_PROXY]  [○ Hệ thống]│
│ └─────────────────────────────────────────────────────────────────────┘  │
│ ┌─ Thanh bộ lọc/điều khiển ────────────────────────────────────────┐   │
│ │ Hồ sơ: (●) Chỉ LLM  (○) Tùy chỉnh  (○) Tất cả                   │   │
│ │ [⎉ Tạm dừng] [🗑 Xóa] [⬇ .har] [● GHI phiên]    ● trực tiếp 482/1k│   │
│ └─────────────────────────────────────────────────────────────────────┘  │
├══◀▶══════════════════════════════╬══════════════════════════════════════╤╡
│ DANH SÁCH YÊU CẦU (có thể đổi cỡ)║ KHUNG CHI TIẾT                       ▲ │
│ ────────────────────────────── │ ║ [Hội thoại][Tiêu đề][Yêu cầu]       │ │
│ ▎ 14:32 POST 200 12k AG openai ║ [Phản hồi][Thời gian][LLM][Thống kê]│ │
│ ▎ 14:31 POST 200 8k  CP openai ║                                     ▼ │
│ ▎ 14:31 POST 503 ⚠   KR ...   ║                                       │
│ ▎ 14:30 GET  200 3k  🌐 tùy chỉnh║                                      │
└══════════════════════════════════╝══════════════════════════════════════╝
```

### 3.2 Danh sách yêu cầu (khung bên trái)

- **Ảo hóa** (`useVirtualList` + `ResizeObserver`): xử lý 1000 mục mà không bị treo
- **Tự động cuộn** với nút bật/tắt để tạm dừng khi đang kiểm tra
- **Trạng thái được mã hóa bằng màu**: xanh lá (2xx), vàng (3xx), đỏ (4xx/5xx), xám (đang xử lý)
- **Biểu tượng emoji của tác nhân**: 🔵 Antigravity, 🟢 Copilot, 🟠 Kiro, 🟣 Codex, 🔷 Cursor, 🟤 Zed, 🟡 Claude Code, ⚫ Open Code, 🌐 máy chủ tùy chỉnh
- **Thanh màu ngữ cảnh**: đường viền trái 1px được tô màu theo `contextKey` (SHA-256 của lời nhắc hệ thống) — nhóm các cuộc hội thoại liên quan về mặt trực quan
- **Nội dung tải lười**: chỉ nội dung của yêu cầu được chọn mới được khởi tạo trong các tab chi tiết (tránh kết xuất 1000 × 1MB nội dung)

### 3.3 Khung chi tiết — 7 tab

| Tab              | Nội dung                                                                                  | Ghi chú                                                                                                             |
| ---------------- | ----------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------- |
| **Hội thoại**    | Bong bóng trò chuyện nhiều lượt (system/user/assistant + tool_use/tool_result)            | Được chuẩn hóa từ mọi định dạng nhà cung cấp; chỉ hiển thị khi `detectedKind === "llm"`                             |
| **Tiêu đề**      | Bảng tiêu đề của yêu cầu + phản hồi                                                       | Các tiêu đề nhạy cảm (Authorization, Cookie, api-key) bị che theo mặc định; nút bật/tắt "Hiển thị thông tin bí mật" |
| **Yêu cầu**      | Nội dung thô, chế độ xem cây JSON, huy hiệu trường model                                  | JSON được định dạng đẹp hoặc văn bản thô                                                                            |
| **Phản hồi**     | Nội dung thô hoặc danh sách sự kiện SSE; nút chuyển "Thô ↔ Đã hợp nhất"                   | Trình hợp nhất SSE tái tạo thông báo cuối cùng từ các sự kiện delta                                                 |
| **Thời gian**    | Biểu đồ thác nước: chi phí xử lý proxy so với độ trễ thượng nguồn                         | Tổng thời gian, TTFB và kích thước                                                                                  |
| **Chi tiết LLM** | Nhà cung cấp, model, số lượng thông báo, token vào/ra, chi phí ước tính, đích được ánh xạ | Chỉ hiển thị cho các yêu cầu LLM                                                                                    |
| **Thống kê**     | Recharts: dòng thời gian độ trễ, biểu đồ thanh token, biểu đồ phân tán lệnh gọi công cụ   | Chỉ hiển thị khi tải một phiên đã ghi                                                                               |

### 3.4 Các điều khiển trên thanh công cụ

| Điều khiển           | Hành động                                                                    |
| -------------------- | ---------------------------------------------------------------------------- |
| ⎉ Tạm dừng           | Dừng kết xuất các yêu cầu mới; huy hiệu "X mới" sẽ tích lũy                  |
| 🗑 Xóa                | Xóa danh sách trên giao diện người dùng (bộ đệm máy chủ không bị ảnh hưởng)  |
| ⬇ Xuất .har          | Tải danh sách hiện được lọc xuống dưới dạng tệp HAR                          |
| ● Ghi phiên          | Bắt đầu một phiên ghi có tên                                                 |
| Bộ chọn hồ sơ        | Chỉ LLM / Máy chủ tùy chỉnh / Tất cả                                         |
| Bộ lọc máy chủ       | Khớp chuỗi con trên trường `host`                                            |
| Bộ lọc tác nhân      | Danh sách thả xuống: Tất cả / theo từng tác nhân                             |
| Bộ lọc trạng thái    | Tất cả / 2xx / 3xx / 4xx / 5xx / lỗi                                         |
| Bộ lọc nguồn         | Tất cả / agent-bridge / custom-host / http-proxy / system-proxy / tproxy     |
| Bộ lọc **Trực tiếp** | Chỉ hiển thị các yêu cầu đang xử lý (mở) — nút bật/tắt `liveOnly` (xem §4.6) |

### 3.5 Các khung có thể thay đổi kích thước

- Danh sách và khung chi tiết được ngăn cách bằng một tay nắm kéo
- Chiều rộng danh sách: tối thiểu 280px, tối đa 720px, được lưu trong `localStorage` (`inspector.listWidth`)
- Có thể thu gọn thành một thanh 48px (chỉ có biểu tượng); nhấp vào một hàng trong thanh để mở rộng

---

## §4 Các tính năng nhận biết LLM

### 4.1 Bộ phát hiện loại (`src/mitm/inspector/kindDetector.ts`)

Phân loại từng yêu cầu thành `"llm"`, `"app"` hoặc `"unknown"` bằng 4 tín hiệu:

1. **Danh mục máy chủ** — khoảng 18 tên máy chủ API LLM đã biết (OpenAI, Anthropic, Gemini, Groq, Mistral, Together, Fireworks, Cohere, Perplexity, Hugging Face, OpenRouter, xAI, Moonshot, v.v.)
2. **Mẫu đường dẫn** — `/v1/chat/completions`, `/v1/messages`, `/generateContent`, `/v1/responses`, v.v.
3. **Cấu trúc phần thân** — phát hiện `messages[]` (OpenAI/Claude), `contents[]` (Gemini), các trường `prompt`, `input`
4. **Gợi ý từ user-agent** — `codex`, `claude`, `gemini`, `antigravity`, `kiro`, `copilot`, `cursor` trong chuỗi UA

Các máy chủ tùy chỉnh được thêm qua Chế độ 2 kế thừa `kind` từ dữ liệu nhập trong biểu mẫu (mặc định là `"custom"`).

### 4.2 Bộ hợp nhất SSE (`src/mitm/inspector/sseMerger.ts`)

**Bản triển khai phòng sạch độc lập.** Quá trình phân tích sự kiện tuân theo
[thuật toán sự kiện do máy chủ gửi của WHATWG](https://html.spec.whatwg.org/multipage/server-sent-events.html#parsing-an-event-stream),
trong khi quá trình tái dựng tuân theo các lược đồ truyền phát công khai của
[OpenAI](https://platform.openai.com/docs/api-reference/chat/create),
[Anthropic](https://platform.claude.com/docs/en/build-with-claude/streaming) và
[Gemini](https://ai.google.dev/api/generate-content#method:-models.streamgeneratecontent).

Tái dựng thông điệp cuối cùng của trợ lý từ các sự kiện delta SSE thô:

- **Anthropic**: tích lũy `content_block_delta` theo chỉ mục; xử lý `text_delta`, `input_json_delta` (lệnh gọi công cụ), `thinking_delta`
- **OpenAI**: tích lũy các lựa chọn/lệnh gọi công cụ của Chat Completions và các mục đầu ra của Responses API
  theo chỉ mục
- **Gemini**: tích lũy `candidates[i].content.parts`
- **Không xác định**: trả về nguyên trạng các sự kiện thô

Tab Phản hồi hiển thị nút chuyển đổi: **"Sự kiện thô ↔ Đã hợp nhất"**.

### 4.3 Bộ chuẩn hóa hội thoại (`src/mitm/inspector/conversationNormalizer.ts`)

**Bản triển khai phòng sạch độc lập.** Quá trình chuẩn hóa được xác định bởi các hợp đồng hộp đen cục bộ
và các lược đồ thông điệp công khai của OpenAI, Anthropic và Gemini; không sử dụng mã nguồn
triển khai thượng nguồn.

Chuyển đổi các định dạng thông điệp của OpenAI, Anthropic và Gemini thành một `NormalizedConversation` duy nhất trước khi hiển thị:

```ts
interface NormalizedConversation {
  request: NormalizedTurn[]; // messages / contents / prompt từ phần thân yêu cầu
  response: NormalizedTurn[]; // phản hồi của trợ lý (được hợp nhất qua sseMerger)
  contextKey: string | null; // dấu vân tay SHA-256 của lời nhắc hệ thống
}
```

Các loại khối: `text`, `tool_use`, `tool_result`. Tab Hội thoại sử dụng cấu trúc này bất kể nhà cung cấp.

### 4.4 Tô màu khóa ngữ cảnh (`src/mitm/inspector/contextKey.ts`)

- Tính `SHA-256` của lời nhắc hệ thống (thông điệp `role:system` đầu tiên, hoặc trường `system`, hoặc `systemInstruction` của Gemini)
- Trả về tiền tố hex gồm 12 ký tự (`"a3f9c2..."`)
- Giao diện ánh xạ khóa sang một màu HSL tất định cho thanh viền bên trái
- **Bộ lọc "cùng ngữ cảnh"**: nhấp vào thẻ `ctx #a3f` sẽ thêm một bộ lọc để chỉ hiển thị các yêu cầu có cùng dấu vân tay

Điều này giúp dễ dàng phân biệt trực quan các "nhân cách" hoặc tác vụ khác nhau đang chạy trong cùng một phiên tác tử.

### 4.5 Trích xuất siêu dữ liệu LLM

Đối với các yêu cầu LLM, tab Chi tiết LLM trích xuất:

```ts
interface LlmMetadata {
  provider: string | null; // "openai" | "anthropic" | "gemini" | ...
  apiKind: string | null; // "chat.completions" | "messages" | "embeddings" | ...
  model: string | null; // từ phần thân yêu cầu hoặc phản hồi
  messages: number; // số lượt
  tokensIn: number | null; // usage.prompt_tokens / usage.input_tokens
  tokensOut: number | null; // usage.completion_tokens / usage.output_tokens
  streamed: boolean; // true nếu là phản hồi SSE
  mappedTo: string | null; // header x-omniroute-mapped
  costEstimateUsd: number | null; // chi phí ước tính dựa trên bảng giá OmniRoute
}
```

### 4.6 Bộ lọc trực tiếp các yêu cầu đang xử lý

Trường `status` của yêu cầu là `number | "in-flight" | "error"` — một mục được
thêm với giá trị `"in-flight"` ngay khi yêu cầu bắt đầu và được **cập nhật tại chỗ**
khi phản hồi (hoặc lỗi) đến. Nút chuyển đổi **"Trực tiếp"** trên thanh công cụ
(`liveOnly`, khóa i18n `trafficInspector.liveOnly`) giới hạn danh sách ở những mục
có `status === "in-flight"`, cho phép bạn theo dõi các kết nối đang mở theo thời gian thực.

Bộ lọc là một vị từ thuần túy phía máy khách trong
`src/lib/inspector/matchesTrafficFilter.ts`:

```ts
if (f.liveOnly && req.status !== "in-flight") return false;
```

Trạng thái nút chuyển đổi nằm trong `useTrafficFilters` (các hook của bảng điều khiển trình kiểm tra) và
kết hợp với các bộ lọc khác (hồ sơ, máy chủ, tác tử, nguồn, trạng thái, ngữ cảnh).

### 4.7 Quy kết tiến trình (Linux)

Trên Linux, mỗi yêu cầu bị chặn có thể được quy kết cho **tiến trình cục bộ khởi tạo
yêu cầu**. Hai trường tùy chọn được thêm vào `InterceptedRequest`:

```ts
pid?: number;          // id tiến trình khởi tạo (chỉ Linux)
processName?: string;  // tên tiến trình khởi tạo (chỉ Linux)
```

`src/mitm/inspector/processAttribution.ts` ánh xạ cổng tạm thời của _máy khách_
trong kết nối tới PID + tên bằng cách:

1. Đọc `/proc/net/tcp` và `/proc/net/tcp6` để tìm inode socket cho
   cổng (`parseProcNetTcpForInode`, một trình phân tích cú pháp thuần túy có thể kiểm thử bằng fixture).
2. Quét `/proc/<pid>/fd/` để tìm liên kết tượng trưng đến `socket:[<inode>]`.
3. Đọc tên tiến trình từ `/proc/<pid>/comm`.

Bộ nhớ đệm TTL 1 giây giới hạn chi phí quét procfs khi chịu tải. Việc quy kết được thực hiện
theo nguyên tắc **nỗ lực tối đa** — mọi lỗi đều trả về `null` và không bao giờ chặn quá trình ghi nhận. Trên
macOS/Windows, hàm trả về `null` (stub; hỗ trợ `lsof`/`GetExtendedTcpTable`
sẽ được bổ sung sau).

---

## §5 Phiên

### 5.1 Ghi một phiên

1. Nhấp vào **"● Ghi phiên"** trên thanh công cụ → nhập tên (không bắt buộc)
2. Theo dõi trực tiếp tiếp tục như bình thường; một chỉ báo màu đỏ nhấp nháy hiển thị `◉ ĐANG GHI · <tên> · 00:42 · 23 yêu cầu`
3. Nhấp vào **"⏹ Dừng"** → ảnh chụp nhanh của phiên được lưu vào `inspector_sessions` + `inspector_session_requests`

### 5.2 Xem một phiên đã ghi

Trình đơn thả xuống **Phiên** trên thanh công cụ liệt kê các phiên đã lưu. Khi chọn một phiên:

- Tải ảnh chụp nhanh của phiên (trạng thái đóng băng)
- Một biểu ngữ hiển thị: `Đang xem phiên đã ghi "<tên>" — [Quay lại trực tiếp]`
- Tab Thống kê sẽ khả dụng với dữ liệu tổng hợp bằng Recharts

### 5.3 Định dạng xuất

Mỗi phiên có thể được xuất dưới dạng:

| Định dạng                  | Công dụng                                                                            |
| -------------------------- | ------------------------------------------------------------------------------------ |
| **HAR** (HTTP Archive 1.2) | Tương thích với Chrome DevTools, Charles, Fiddler — nhập để phân tích ngoại tuyến    |
| **JSONL**                  | Một `InterceptedRequest` trên mỗi dòng — tương thích với định dạng `llm-interceptor` |

Xuất qua `GET /api/tools/traffic-inspector/sessions/{id}/export.har` hoặc nút ⬇ trong trình đơn thả xuống Phiên.

---

## §6 Bảo mật

Traffic Inspector hiển thị **tất cả lưu lượng HTTPS bị chặn bắt**, bao gồm các header ủy quyền và nội dung yêu cầu. Các biện pháp kiểm soát sau được áp dụng:

| Biện pháp kiểm soát           | Chi tiết                                                                                                                                                                                            |
| ----------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **LOCAL_ONLY**                | Tất cả route và endpoint WebSocket chỉ có thể truy cập qua loopback (được thực thi trong `routeGuard.ts` trước bước xác thực)                                                                       |
| **Che giấu thông tin bí mật** | Trình quét tuyến tính `maskSecret()` biên tập ẩn thông tin xác thực Bearer theo RFC 6750, các khóa có tiền tố nhà cung cấp và token dài khó đoán trước khi gọi `TrafficBuffer.push()`               |
| **Giới hạn kích thước body**  | Các body > `INSPECTOR_MAX_BODY_KB` (mặc định 1024 KB) bị cắt bớt kèm thông báo `"(đã cắt bớt để đảm bảo hiệu năng)"`                                                                                |
| **Làm sạch header**           | Tên được chuyển thành chữ thường; các header đóng khung/hop-by-hop và xác thực proxy bị loại bỏ; cookie được biên tập ẩn hoàn toàn; giá trị thông tin xác thực được chuyển cho `maskSecret()` xử lý |
| **CSP**                       | Chính sách bảo mật nội dung nghiêm ngặt trên các trang Traffic Inspector nhằm ngăn chặn XSS thông qua nội dung phản hồi bị chèn                                                                     |
| **Mặc định không lưu trữ**    | `TrafficBuffer` nằm trong bộ nhớ và bị mất khi máy chủ khởi động lại. Các phiên chỉ được lưu trữ lâu dài khi được ghi một cách rõ ràng                                                              |

### Các quy tắc bắt buộc được áp dụng

| Quy tắc                           | Cách áp dụng                                                                            |
| --------------------------------- | --------------------------------------------------------------------------------------- |
| **#12** `sanitizeErrorMessage`    | Tất cả phản hồi lỗi HTTP từ các route của Traffic Inspector đều được làm sạch           |
| **#15 + #17** `isLocalOnlyPath()` | `/api/tools/traffic-inspector/` là LOCAL_ONLY + SPAWN_CAPABLE (các lệnh proxy hệ thống) |

### Các hạn chế đã biết

- **Chế độ proxy toàn hệ thống** ảnh hưởng đến tất cả ứng dụng trên máy, bao gồm các ứng dụng VPN và SSO. Luôn sử dụng cùng bộ hẹn giờ tự động vô hiệu hóa. Không sử dụng trên máy dùng chung.
- **HTTPS qua đường hầm CONNECT**: Chế độ 3 (HTTP_PROXY) chỉ ghi lại siêu dữ liệu đường hầm cho các đích HTTPS, trừ khi tính năng chặn bắt TLS được bật. Đây là hành vi có chủ đích — việc ghi lại trong suốt khi chứng chỉ AgentBridge chưa được các ứng dụng đó tin cậy sẽ làm hỏng quá trình xác minh TLS.
- **Chuỗi được mã hóa cứng trong một số thành phần**: Một số thành phần giao diện người dùng (F7/F8) có một lượng nhỏ chuỗi được mã hóa cứng chưa được bao phủ bởi các khóa i18n. Chúng được ghi nhận là Hạn chế đã biết trong báo cáo khoảng trống i18n; chúng sẽ được di chuyển trong một lượt xử lý tiếp theo. Các chuỗi bị ảnh hưởng là nhãn trang trí giao diện người dùng, không cần dịch để sử dụng chức năng.

---

## §7 Khắc phục sự cố

### Mất kết nối WebSocket

Nếu phần theo dõi trực tiếp hiển thị "Đã ngắt kết nối":

1. Kiểm tra máy chủ vẫn đang chạy: `GET /api/tools/traffic-inspector/capture-modes`
2. Tải lại trang — WebSocket sẽ kết nối lại và nhận một ảnh chụp nhanh mới
3. Nếu máy chủ đã được khởi động lại, bộ đệm trong bộ nhớ đã bị xóa — các mục cũ sẽ không còn trừ khi một phiên đã được ghi lại

### Xung đột cổng 8080

Nếu chế độ HTTP_PROXY không thể khởi động:

```bash
lsof -i :8080    # tìm tiến trình
```

Thay đổi cổng:

```bash
# .env
INSPECTOR_HTTP_PROXY_PORT=8888
```

### Proxy hệ thống không được khôi phục

Nếu OmniRoute gặp sự cố trong khi chế độ proxy toàn hệ thống đang hoạt động:

**macOS:**

```bash
networksetup -setwebproxystate Wi-Fi off
networksetup -setsecurewebproxystate Wi-Fi off
```

**Linux (GNOME):**

```bash
gsettings set org.gnome.system.proxy mode 'none'
```

**Windows:**

```cmd
netsh winhttp reset proxy
```

Bảng điều khiển cũng sẽ cung cấp tùy chọn "Khôi phục proxy hệ thống" trong lần tải tiếp theo nếu phát hiện trạng thái DB cho biết proxy đã hoạt động.

### Bộ đệm đầy

Khi bộ đệm đạt đến `INSPECTOR_BUFFER_SIZE` (mặc định là 1000), các mục mới sẽ thay thế những mục cũ nhất. Nếu các yêu cầu quan trọng đang bị mất:

- Tăng `INSPECTOR_BUFFER_SIZE` (ví dụ: 5000) — đánh đổi bộ nhớ để kéo dài thời gian lưu giữ
- Ghi lại một phiên để lưu cửa sổ liên quan vào DB

---

## §8 Tài liệu tham khảo API

Tất cả các tuyến đều là `LOCAL_ONLY` (chỉ loopback) và `SPAWN_CAPABLE` (các lệnh proxy hệ thống). Xem `src/server/authz/routeGuard.ts`.

Đường dẫn cơ sở: `/api/tools/traffic-inspector/`

### Quản lý yêu cầu

| Phương thức | Đường dẫn                   | Mô tả                                                                                |
| ----------- | --------------------------- | ------------------------------------------------------------------------------------ |
| GET         | `/requests`                 | Liệt kê yêu cầu (có thể lọc: `?profile=llm&host=&agent=&status=&source=&sessionId=`) |
| GET         | `/requests/{id}`            | Chi tiết của một yêu cầu                                                             |
| DELETE      | `/requests`                 | Xóa bộ đệm trong bộ nhớ                                                              |
| POST        | `/requests/{id}/replay`     | Thực thi lại cùng yêu cầu thông qua bộ định tuyến OmniRoute                          |
| PUT         | `/requests/{id}/annotation` | Lưu hoặc cập nhật ghi chú cho một yêu cầu                                            |

### WebSocket

| Phương thức | Đường dẫn | Mô tả                                                                                               |
| ----------- | --------- | --------------------------------------------------------------------------------------------------- |
| GET         | `/ws`     | Luồng WebSocket trực tiếp. Gửi `snapshot` khi kết nối, sau đó là các sự kiện `new`/`update`/`clear` |

### Xuất dữ liệu

| Phương thức | Đường dẫn     | Mô tả                                          |
| ----------- | ------------- | ---------------------------------------------- |
| GET         | `/export.har` | Xuất danh sách đang được lọc dưới dạng HAR 1.2 |

### Máy chủ tùy chỉnh

| Phương thức | Đường dẫn       | Mô tả                                   |
| ----------- | --------------- | --------------------------------------- |
| GET         | `/hosts`        | Liệt kê các máy chủ tùy chỉnh           |
| POST        | `/hosts`        | Thêm máy chủ (tự động sửa `/etc/hosts`) |
| DELETE      | `/hosts/{host}` | Xóa máy chủ                             |
| PATCH       | `/hosts/{host}` | Bật/tắt `enabled`                       |

### Chế độ ghi nhận

| Phương thức | Đường dẫn                      | Mô tả                                                                                                              |
| ----------- | ------------------------------ | ------------------------------------------------------------------------------------------------------------------ |
| GET         | `/capture-modes`               | Trạng thái của các chế độ AgentBridge / máy chủ tùy chỉnh / HTTP_PROXY / proxy hệ thống + tùy chọn `tls-intercept` |
| POST        | `/capture-modes/http-proxy`    | Khởi động/dừng trình lắng nghe HTTP_PROXY (`{action: "start"\|"stop"}`)                                            |
| POST        | `/capture-modes/system-proxy`  | Áp dụng/khôi phục proxy toàn hệ thống (`{action: "apply"\|"revert"}`)                                              |
| POST        | `/capture-modes/tls-intercept` | Bật/tắt giải mã nội dung HTTPS trong chế độ proxy (`{enabled: boolean}`)                                           |

> **Giải mã TPROXY** (chế độ ghi nhận 5) được điều khiển bởi một tuyến **riêng biệt** bên dưới
> tiền tố AgentBridge — `GET / POST / DELETE /api/tools/agent-bridge/tproxy` — không nằm
> dưới `/api/tools/traffic-inspector/`. Xem
> `docs/security/MITM-TPROXY-DECRYPT.md` (git; không được biên dịch vào `/docs`).

### Phiên

| Phương thức | Đường dẫn                   | Mô tả                                                           |
| ----------- | --------------------------- | --------------------------------------------------------------- |
| POST        | `/sessions`                 | Bắt đầu ghi (`{name?: string}`)                                 |
| PATCH       | `/sessions/{id}`            | Dừng hoặc đổi tên (`{action: "stop"\|"rename", name?: string}`) |
| GET         | `/sessions`                 | Liệt kê tất cả các phiên đã lưu                                 |
| GET         | `/sessions/{id}`            | Ảnh chụp nhanh của phiên (tất cả yêu cầu)                       |
| DELETE      | `/sessions/{id}`            | Xóa phiên                                                       |
| GET         | `/sessions/{id}/export.har` | Xuất phiên dưới dạng HAR 1.2                                    |

### Tiếp nhận nội bộ (phương án dự phòng D4)

| Phương thức | Đường dẫn          | Mô tả                                                                                                                 |
| ----------- | ------------------ | --------------------------------------------------------------------------------------------------------------------- |
| POST        | `/internal/ingest` | Chấp nhận yêu cầu bị chặn từ đường dẫn chuyển tiếp của `server.cjs`; yêu cầu header `INSPECTOR_INTERNAL_INGEST_TOKEN` |

Các schema OpenAPI đầy đủ: `docs/openapi.yaml` → thẻ `Traffic Inspector`.
