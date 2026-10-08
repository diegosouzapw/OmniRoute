# Monitoring & Observability Guide (Tiếng Việt)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/MONITORING_GUIDE.md) · 🇪🇹 [am](../../../am/docs/ops/MONITORING_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/ops/MONITORING_GUIDE.md) · 🇦🇿 [az](../../../az/docs/ops/MONITORING_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/ops/MONITORING_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/ops/MONITORING_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/ops/MONITORING_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/ops/MONITORING_GUIDE.md) · 🇩🇰 [da](../../../da/docs/ops/MONITORING_GUIDE.md) · 🇩🇪 [de](../../../de/docs/ops/MONITORING_GUIDE.md) · 🇬🇷 [el](../../../el/docs/ops/MONITORING_GUIDE.md) · 🇪🇸 [es](../../../es/docs/ops/MONITORING_GUIDE.md) · 🇪🇪 [et](../../../et/docs/ops/MONITORING_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/ops/MONITORING_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/ops/MONITORING_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/ops/MONITORING_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/ops/MONITORING_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/ops/MONITORING_GUIDE.md) · 🇮🇱 [he](../../../he/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/ops/MONITORING_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/ops/MONITORING_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/ops/MONITORING_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/ops/MONITORING_GUIDE.md) · 🇮🇩 [id](../../../id/docs/ops/MONITORING_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/ops/MONITORING_GUIDE.md) · 🇮🇹 [it](../../../it/docs/ops/MONITORING_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/ops/MONITORING_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/ops/MONITORING_GUIDE.md) · 🇰🇭 [km](../../../km/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/ops/MONITORING_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/ops/MONITORING_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/ops/MONITORING_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/ops/MONITORING_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/ops/MONITORING_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/ops/MONITORING_GUIDE.md) · 🇲🇲 [my](../../../my/docs/ops/MONITORING_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/ops/MONITORING_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/ops/MONITORING_GUIDE.md) · 🇳🇴 [no](../../../no/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [or](../../../or/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/ops/MONITORING_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/ops/MONITORING_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/ops/MONITORING_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/ops/MONITORING_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/MONITORING_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/ops/MONITORING_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/ops/MONITORING_GUIDE.md) · 🇱🇰 [si](../../../si/docs/ops/MONITORING_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/ops/MONITORING_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/ops/MONITORING_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/ops/MONITORING_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/ops/MONITORING_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [te](../../../te/docs/ops/MONITORING_GUIDE.md) · 🇹🇭 [th](../../../th/docs/ops/MONITORING_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/ops/MONITORING_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/MONITORING_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/ops/MONITORING_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/ops/MONITORING_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/ops/MONITORING_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/MONITORING_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/MONITORING_GUIDE.md)

---

> **Tóm tắt**: OmniRoute tích hợp sẵn tính năng giám sát tình trạng, chế độ tự động điều khiển nhà cung cấp, theo dõi hạn mức và các hook quan sát. Hướng dẫn này trình bày bảng điều khiển, cảnh báo và cách khắc phục sự cố.

**Nguồn:**

- `src/lib/monitoring/observability.ts` — ảnh chụp nhanh khả năng quan sát
- `src/lib/monitoring/comboHealthAutopilot.ts` — chế độ tự động điều khiển tình trạng combo
- `src/lib/monitoring/providerHealthAutopilot.ts` — chế độ tự động điều khiển nhà cung cấp
- `src/lib/monitoring/providerHealthMatrix.ts` — ma trận tình trạng nhà cung cấp
- `src/lib/localHealthCheck.ts` — kiểm tra tình trạng cục bộ
- `src/lib/tokenHealthCheck.ts` — tình trạng làm mới token
- `src/lib/proxyHealth.ts` — bộ nhớ đệm tình trạng proxy (được trình bày trong PROXY_GUIDE.md)

---

## Tổng quan

OmniRoute có **3 lớp giám sát**:

```
┌──────────────────────────────────────────────────────────────┐
│  Lớp 1: Tình trạng hệ thống (cấp máy chủ)                    │
│  ├─ localHealthCheck.ts — DB, cổng, phần phụ thuộc native    │
│  ├─ db/healthCheck.ts — tính toàn vẹn, FK, hiện vật mồ côi   │
│  └─ Bảng điều khiển: /dashboard/health                       │
├──────────────────────────────────────────────────────────────┤
│  Lớp 2: Tình trạng nhà cung cấp (khả năng phục hồi theo NCC) │
│  ├─ providerHealthAutopilot.ts — circuit breaker, cooldown   │
│  ├─ providerHealthMatrix.ts — điểm tình trạng theo NCC/model │
│  └─ Bảng điều khiển: /dashboard/providers                    │
├──────────────────────────────────────────────────────────────┤
│  Lớp 3: Khả năng quan sát trực tiếp (ảnh chụp lúc chạy)      │
│  ├─ observability.ts — circuit breaker, phiên, hạn mức       │
│  ├─ tokenHealthCheck.ts — tình trạng làm mới token OAuth     │
│  └─ Công cụ MCP: omniroute_get_health, omniroute_get_session_snapshot │
└──────────────────────────────────────────────────────────────┘
```

---

## Các trang bảng điều khiển

### `/dashboard/health` (Tình trạng hệ thống)

Bảng điều khiển tình trạng cấp cao nhất hiển thị:

| Phần                       | Nội dung hiển thị                                                 |
| -------------------------- | ----------------------------------------------------------------- |
| **Trạng thái máy chủ**     | Thời gian hoạt động, phiên bản, cổng, kết nối đang hoạt động      |
| **Cơ sở dữ liệu**          | Kết nối, tính toàn vẹn, kích thước WAL, các lần migration gần đây |
| **Tóm tắt nhà cung cấp**   | Số lượng đang hoạt động, số lượng khỏe mạnh, số breaker đang mở   |
| **Trình giám sát hạn mức** | Phiên đang hoạt động, cảnh báo, đã cạn hạn mức                    |
| **Lỗi gần đây**            | 10 lỗi gần nhất kèm stack trace                                   |
| **Mức sử dụng tài nguyên** | Bộ nhớ, CPU, chỉ báo áp lực heap                                  |

### `/dashboard/providers` (Tình trạng nhà cung cấp)

Bảng điều khiển theo từng nhà cung cấp:

| Cột          | Mô tả                                          |
| ------------ | ---------------------------------------------- |
| Nhà cung cấp | ID nhà cung cấp + tên hiển thị                 |
| Tình trạng   | Trạng thái xanh lục/vàng/đỏ                    |
| Mạch         | Trạng thái mở/đóng/bán mở                      |
| Kết nối      | Số lượng kết nối, lần làm mới gần nhất         |
| Model        | Các model khả dụng, tình trạng theo model      |
| Chi phí      | Chi phí hôm nay, xu hướng 7 ngày               |
| Lỗi          | Số lỗi trong 24 giờ qua, lớp lỗi phổ biến nhất |

Nhấp vào một nhà cung cấp để xem:

- Các yêu cầu gần đây kèm phân tích chi tiết độ trễ
- Điểm tình trạng theo từng kết nối
- Các trường hợp khóa theo từng model
- Đề xuất của chế độ tự động điều khiển

### `/dashboard/quota` (Theo dõi hạn mức)

Đối với mỗi khóa API:

- Mức sử dụng hiện tại so với giới hạn (thanh tiến trình)
- Xu hướng hạn mức (biểu đồ 30 ngày)
- Thời điểm đặt lại tiếp theo
- Lịch sử cảnh báo

### `/dashboard/combos` (Tình trạng combo)

Theo từng combo:

- Chiến lược + mục tiêu
- Tình trạng theo từng mục tiêu
- Các sự kiện chuyển sang phương án dự phòng gần đây
- Tỷ lệ thành công (24 giờ, 7 ngày, 30 ngày)

---

## API kiểm tra tình trạng

OmniRoute cung cấp **hai** bề mặt kiểm tra tình trạng qua HTTP. Chúng không thể được sử dụng thay thế cho nhau trong các trình điều phối.

| Đường dẫn                    | Mục đích                                                                       | Mức tải                                | Dùng cho                                                                            |
| ---------------------------- | ------------------------------------------------------------------------------ | -------------------------------------- | ----------------------------------------------------------------------------------- |
| `GET /healthz`               | Trạng thái sống/sẵn sàng của vòng đời (`ok` / `starting` / `stopping`)         | Không đáng kể (chỉ cờ giai đoạn)       | **Readiness** của Kubernetes; **liveness** nhẹ nếu buộc phải dùng HTTP              |
| `GET /api/monitoring/health` | Tóm tắt chuyên sâu về hệ thống + nhà cung cấp (DB, heap, số lượng danh mục, …) | Nặng (công việc DB đồng bộ / giám sát) | Bảng điều khiển, kiểm tra chuyên sâu kiểu blackbox, healthcheck tích hợp của Docker |

> **Lưu ý:** Ma trận tình trạng nhà cung cấp, sự cố autopilot, trình giám sát hạn ngạch, tình trạng token và chi tiết độ trễ ngoài `/api/monitoring/health` có thể được truy cập thông qua **công cụ MCP** `observability_snapshot` hoặc các trang **bảng điều khiển** — không có route REST chuyên dụng cho những nội dung này.

Cả hai route đều chạy trên **cùng một vòng lặp sự kiện Node** với quá trình xử lý yêu cầu. Một đường dẫn bị giới hạn bởi CPU (công việc danh mục lớn của `GET /v1/models`, nén ngữ cảnh dài / đếm token) có thể làm chậm **tất cả** trình xử lý HTTP, bao gồm `/healthz`. Vòng lặp sự kiện bận ≠ tiến trình đã chết. Nên ưu tiên khắc phục tác vụ chiếm dụng tài nguyên; việc tinh chỉnh probe chỉ giúp giảm các lần kết thúc tiến trình nhầm.

### Probe nhẹ dành cho trình điều phối

```bash
GET /healthz
# hoặc HEAD /healthz
```

- **200** + nội dung `ok` khi giai đoạn vòng đời của máy chủ đã sẵn sàng
- **503** + `starting` / `stopping` trong quá trình khởi động hoặc tắt
- Phần triển khai: `src/app/healthz/route.ts` (không ping DB)

### Tình trạng hệ thống (chuyên sâu)

```bash
GET /api/monitoring/health
```

Phản hồi:

```json
{
  "status": "healthy",
  "version": "3.8.16",
  "uptime": 123456,
  "checks": {
    "database": { "status": "pass", "latency_ms": 2 },
    "writeable": { "status": "pass" },
    "integrity": { "status": "pass", "result": "ok" },
    "foreign_keys": { "status": "pass", "violations": 0 },
    "heap_pressure": { "status": "pass", "usage_mb": 142, "threshold_mb": 512 },
    "active_sessions": 12,
    "providers": {
      "total": 7,
      "healthy": 6,
      "degraded": 1,
      "down": 0
    }
  }
}
```

#### `credentialHealth`: bộ nhớ đệm probe so với `test_status` của SQLite

`GET /api/monitoring/health` → `credentialHealth` là **chỉ số gauge từ bộ nhớ đệm probe trong bộ nhớ**,
không phải kết xuất trực tiếp của `provider_connections.test_status`. Sau #12532, đường dẫn
yêu cầu chỉ đọc `getCachedCredentialHealthSummary()`; các probe nền
làm mới bộ nhớ đệm bên ngoài vòng lặp sự kiện.

| Lớp                               | Vị trí                                                                | Ý nghĩa                                                                                                                                                                                                                                |
| --------------------------------- | --------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Chỉ số gauge của bộ nhớ đệm probe | `credentialHealth.total` / `healthy` / `failed` / `unknown` / `stale` | Các kết quả probe tình trạng thông tin xác thực gần nhất vẫn được giữ trong bộ nhớ tiến trình. `source` luôn là `probe-cache`.                                                                                                         |
| Chi tiết kết nối thất bại         | `credentialHealth.failedConnections`                                  | Chỉ xuất hiện **khi `failed > 0`**. Danh sách có giới hạn gồm các hàng bộ nhớ đệm có `status=error` (`connectionId`, `status`, `lastError` / `lastErrorType` đã được làm sạch). `failedOmitted` được đặt khi danh sách đã bị giới hạn. |
| Trạng thái cố định của SQLite     | `credentialHealth.staleDbNonOkCount`                                  | Số lượng hàng kết nối **đang hoạt động** (`is_active=1`) có `test_status` được lưu bền vững là một trạng thái không ổn đã biết (`error`, `expired`, `credits_exhausted`, `banned`, `deactivated`, `unavailable`).                      |

Hai lớp có thể chủ đích không khớp nhau:

- Chỉ số gauge `failed=0` trong khi `staleDbNonOkCount>0` — SQLite vẫn có một
  `test_status` cố định (ví dụ `expired` hoặc `credits_exhausted`) mà ảnh chụp nhanh
  mới nhất của bộ nhớ đệm probe không tính là `status=error`.
- Chỉ số gauge `failed>0` trong khi SQLite có vẻ bình thường — một probe gần đây đã thất bại và
  được lưu vào bộ nhớ đệm; hàng DB chưa được cập nhật hoặc đã được xóa sau đó.

Không cảnh báo chỉ dựa trên `provider_connections.test_status` khi thu thập dữ liệu từ
endpoint này. Dùng `failed` + `failedConnections` cho các lỗi probe trực tiếp và
`staleDbNonOkCount` khi bạn cần số lượng trạng thái cố định được lưu bền vững.

### Khuyến nghị về probe Kubernetes

OmniRoute là một **tiến trình Node duy nhất** (một vòng lặp sự kiện). `HEALTHCHECK` mặc định của Docker nhắm tới `/healthz` nhẹ. `/api/monitoring/health` **quá nặng** đối với khoảng thời gian liveness của kubelet.

| Probe                   | Mục tiêu được khuyến nghị                                                          | Ghi chú                                                                                                                                                                                                                                                                                                                                                                                               |
| ----------------------- | ---------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Khởi động**           | HTTP `GET /healthz` với `failureThreshold` dài (hoặc `startPeriod` lớn)            | Khởi động nguội + di chuyển SQLite có thể mất hơn vài giây                                                                                                                                                                                                                                                                                                                                            |
| **Sẵn sàng**            | HTTP `GET /healthz`                                                                | Vòng đời `ok` / `starting` / `stopping` (200 so với 503). Vẫn dao động nếu vòng lặp bị chặn bởi CPU. **Phản hồi 200 mất nhiều giây không phải là trạng thái khỏe mạnh** (#10303) — điều đó có nghĩa là vòng lặp sự kiện đã bị thiếu tài nguyên trước khi trình xử lý 3 byte chạy                                                                                                                      |
| **Còn sống**            | HTTP `GET /livez`, **hoặc TCP** trên cổng dịch vụ chính (`PORT`, mặc định `20128`) | `/livez` chỉ cho biết tiến trình còn sống (luôn trả về 200 nếu trình xử lý chạy). Nó vẫn dùng chung vòng lặp sự kiện — bận ≠ chết, và không phát hiện tình trạng vòng lặp sự kiện bị thiếu tài nguyên (#10303) tốt hơn TCP. Ưu tiên **TCP** nếu probe HTTP hết thời gian chờ khi chịu tải danh mục/nén; dù dùng cách nào cũng **không** hủy pod khi vòng lặp sự kiện bị đình trệ trong thời gian ngắn |
| **Sức khỏe chuyên sâu** | `GET /api/monitoring/health` từ một trình kiểm tra bên ngoài                       | Không dành cho `livenessProbe` của kubelet / `readinessProbe` có tần suất cao                                                                                                                                                                                                                                                                                                                         |

Cấu hình mẫu (điều chỉnh các ngưỡng theo tải khởi động nguội và tải nén của bạn):

```yaml
ports:
  - name: http
    containerPort: 20128
startupProbe:
  httpGet:
    path: /healthz
    port: http
  failureThreshold: 30
  periodSeconds: 5
readinessProbe:
  httpGet:
    path: /healthz
    port: http
  periodSeconds: 5
  timeoutSeconds: 2
  failureThreshold: 6
livenessProbe:
  httpGet:
    path: /livez
    port: http
  periodSeconds: 10
  timeoutSeconds: 3
  failureThreshold: 6
  # Khi vòng lặp sự kiện bị đình trệ, HTTP /livez vẫn có thể hết thời gian chờ. TCP là
  # phương án thay thế thận trọng hơn:
  # tcpSocket:
  #   port: http
```

**Không** trỏ **liveness** của kubelet đến `/api/monitoring/health`. Đường dẫn đó thực hiện công việc DB/giám sát thực sự và sẽ báo dương tính giả khi chịu tải.

Liên quan: [#10052](https://github.com/diegosouzapw/OmniRoute/issues/10052) (các probe khi vòng lặp sự kiện đang bận), [#9685](https://github.com/diegosouzapw/OmniRoute/issues/9685) / [#10055](https://github.com/diegosouzapw/OmniRoute/pull/10055) (tác vụ định giá danh mục chiếm dụng tài nguyên), [#10117](https://github.com/diegosouzapw/OmniRoute/issues/10117) (tác vụ đếm token nén chiếm dụng tài nguyên).

### Công việc tùy chọn trên đường dẫn yêu cầu (bộ nhớ, kỹ năng, làm mới token)

Việc trích xuất bộ nhớ, chèn kỹ năng và làm mới token OAuth dùng chung **vòng lặp sự kiện Node chính** với `/healthz`. Đây là các tính năng bật/tắt trên bảng điều khiển (`memoryEnabled`, `skillsEnabled`), không phải một worker pool. Xem [Môi trường — chi phí vòng lặp sự kiện](../reference/ENVIRONMENT.md#event-loop-cost-of-memory-skills-and-token-refresh-10349).

### Sức khỏe nhà cung cấp

> **Không có endpoint REST.** Dữ liệu sức khỏe nhà cung cấp có sẵn thông qua công cụ MCP `observability_snapshot` hoặc trang `/dashboard/providers` trên bảng điều khiển.

### Chi tiết nhà cung cấp

> **Không có endpoint REST.** Chi tiết theo từng nhà cung cấp có sẵn thông qua trang `/dashboard/providers` trên bảng điều khiển.

---

## Autopilot Tình trạng Nhà cung cấp

Mô-đun `providerHealthAutopilot.ts` là một **hệ thống tự phục hồi** có chức năng:

1. Phát hiện các vấn đề của nhà cung cấp (mạch ngắt mở, thời gian chờ, khóa tạm thời, cảnh báo hạn ngạch)
2. Tạo **hành động được đề xuất** để giải quyết chúng
3. Có thể tùy chọn **tự động thực thi** các hành động có rủi ro thấp

### Các Loại Vấn đề Được Phát hiện

| Loại vấn đề                  | Mức độ       | Điều kiện ví dụ                                 |
| ---------------------------- | ------------ | ----------------------------------------------- |
| `provider_circuit_open`      | nghiêm trọng | Mạch ngắt mở sau 5 lần thất bại                 |
| `provider_circuit_half_open` | cảnh báo     | Mạch đang kiểm tra khả năng phục hồi            |
| `connection_cooldown`        | cảnh báo     | Kết nối trong thời gian chờ sau lỗi 429         |
| `stale_connection_error`     | cảnh báo     | Lần làm mới gần nhất thất bại hơn 30 phút trước |
| `terminal_connection_error`  | nghiêm trọng | OAuth bị thu hồi, khóa không hợp lệ             |
| `inactive_connection`        | thông tin    | Kết nối bị tắt trong phần cài đặt               |
| `model_lockout`              | cảnh báo     | Mô hình cụ thể đang bị cách ly                  |
| `quota_monitor_warning`      | cảnh báo     | Mức sử dụng hạn ngạch từ 80% trở lên            |

### Các Loại Hành động Được Tạo

| Hành động                      | Rủi ro     | Mô tả                                 |
| ------------------------------ | ---------- | ------------------------------------- |
| `clear_provider_breaker`       | trung bình | Đặt lại mạch ngắt về trạng thái đóng  |
| `clear_connection_cooldown`    | thấp       | Xóa thời gian chờ khỏi một kết nối    |
| `clear_stale_connection_error` | thấp       | Xóa cờ lỗi cũ                         |
| `clear_model_lockout`          | thấp       | Bật lại một mô hình đang bị cách ly   |
| `reactivate_connection`        | trung bình | Bật lại một kết nối đã bị vô hiệu hóa |
| `deactivate_connection`        | cao        | Vô hiệu hóa một kết nối có vấn đề     |

### API

> **Không có endpoint REST.** Các vấn đề của autopilot được cung cấp thông qua công cụ MCP `observability_snapshot` hoặc bảng điều khiển. Autopilot chạy nội bộ; hành vi của nó được cấu hình thông qua DB cài đặt (trường `autopilotMode` theo từng kết nối), không phải bằng biến môi trường — `grep -rn` cho một biến môi trường chế độ autopilot không trả về kết quả nào.

### Chế độ Autopilot

Theo mặc định, autopilot hoạt động ở **chế độ thủ công** — nó phát hiện vấn đề và tạo các hành động được đề xuất, nhưng không tự động áp dụng chúng. Có thể áp dụng các hành động thông qua bảng điều khiển.

---

## Autopilot Tình trạng Combo

`comboHealthAutopilot.ts` là thành phần tương đương của autopilot nhà cung cấp nhưng **dành riêng cho combo**. Nó:

- Phát hiện các combo không hoạt động bình thường
- Đề xuất sắp xếp lại các đích
- Đề xuất vô hiệu hóa các đích bị lỗi
- Tự động loại bỏ các đích không còn hoạt động sau N lần thất bại

### Ví dụ về Vấn đề Combo

```
Combo "always-on" (chiến lược ưu tiên)
├─ Đích 1: openai/gpt-5 (hoạt động bình thường)
├─ Đích 2: anthropic/claude-opus-4-6 (⚠️ mô hình bị khóa đến 14:00)
└─ Đích 3: kiro/claude-sonnet-4-5 (hoạt động bình thường)

Hành động được đề xuất: Sắp xếp lại — di chuyển kiro lên trên anthropic cho đến khi hết thời gian khóa
```

---

## Trình giám sát Hạn ngạch

`observability.ts` cung cấp **trình giám sát hạn ngạch theo từng phiên** cho các nhà cung cấp dịch vụ đăng ký (Claude Code, Codex, GitHub Copilot):

```ts
interface QuotaMonitorSnapshot {
  sessionId: string;
  provider: string;
  accountId: string;
  status: "starting" | "idle" | "healthy" | "warning" | "exhausted" | "error";
  lastQuotaPercent: number | null; // 0-100
  lastQuotaUsed: number | null;
  lastQuotaTotal: number | null;
  lastResetAt: string | null;
  nextPollAt: string | null;
  totalPolls: number;
  totalAlerts: number;
  consecutiveFailures: number;
}
```

### Ý nghĩa của Trạng thái

| Trạng thái  | Khi nào                            | Hành động trên UI                                  |
| ----------- | ---------------------------------- | -------------------------------------------------- |
| `starting`  | Đang thực hiện lần thăm dò ban đầu | Biểu tượng xoay tải                                |
| `idle`      | Không có hoạt động gần đây         | Ẩn khỏi bảng điều khiển                            |
| `healthy`   | Còn lại hơn 50% hạn ngạch          | Chấm màu xanh lá                                   |
| `warning`   | Còn lại dưới 50% hạn ngạch         | Cảnh báo màu vàng                                  |
| `exhausted` | Hạn ngạch = 0%                     | Khối màu đỏ, định tuyến đến nhà cung cấp tiếp theo |
| `error`     | Thăm dò thất bại                   | Chấm màu đỏ, sớm thử lại                           |

### API

> **Không có endpoint REST.** Dữ liệu của trình giám sát hạn ngạch được cung cấp thông qua công cụ MCP `observability_snapshot` hoặc bảng điều khiển.

---

## Ảnh chụp nhanh khả năng quan sát

Công cụ MCP `observability_snapshot` trả về **ảnh chụp nhanh toàn bộ hệ thống** cho các tác nhân AI:

```json
{
  "circuitBreakers": [
    {
      "name": "openai",
      "state": "closed",
      "failureCount": 0,
      "lastFailureTime": null,
      "retryAfterMs": null
    }
  ],
  "sessions": [
    {
      "sessionId": "sess-123",
      "createdAt": 1234567890,
      "lastActive": 1234567999,
      "requestCount": 42,
      "connectionId": "conn-456",
      "ageMs": 109
    }
  ],
  "quotaMonitors": {/* xem phần trên */},
  "uptime": 12345,
  "version": "3.8.16"
}
```

Các tác nhân sử dụng dữ liệu này để đưa ra **quyết định định tuyến** — ví dụ: "nếu mạch của openai đang mở, hãy định tuyến đến anthropic trước".

---

## Kiểm tra tình trạng token

Các nhà cung cấp OAuth (Claude Code, GitHub Copilot, Cursor) cần **làm mới token định kỳ**. `src/lib/tokenHealthCheck.ts` chạy một bộ lập lịch nền:

- **Nhịp quét**: mỗi 60 giây (quét theo `TICK_MS = 60 * 1000` tại `src/lib/tokenHealthCheck.ts:30`)
- **Khoảng thời gian kiểm tra tình trạng cho từng kết nối**: mặc định 60 phút (`DEFAULT_HEALTH_CHECK_INTERVAL_MIN = 60`); có thể cấu hình thông qua cơ sở dữ liệu cài đặt
- **Làm mới chủ động khi gặp lỗi 401**: được xử lý bởi interceptor của từng kết nối

### Trạng thái tình trạng token

```ts
interface TokenHealth {
  connectionId: string;
  provider: string;
  status: "valid" | "expiring_soon" | "expired" | "refresh_failed";
  expiresAt: string;
  lastRefresh: string;
  nextRefresh: string;
  consecutiveFailures: number;
}
```

### Cấu hình

Cấu hình kiểm tra tình trạng token được xử lý nội bộ bởi `tokenHealthCheck.ts`.

### Tình trạng token

> **Không có endpoint REST.** Dữ liệu tình trạng token có sẵn thông qua bảng điều khiển hoặc công cụ MCP `observability_snapshot`.

---

## Cảnh báo

### Các kênh tích hợp sẵn

OmniRoute hỗ trợ **3 kênh cảnh báo**:

| Kênh                     | Thiết lập    | Trường hợp sử dụng                           |
| ------------------------ | ------------ | -------------------------------------------- |
| Biểu ngữ bảng điều khiển | Luôn bật     | Thông báo trong ứng dụng                     |
| Webhook                  | Cấu hình URL | Slack, Discord, PagerDuty                    |
| Nhật ký                  | Mặc định     | Dành cho hệ thống tổng hợp nhật ký bên ngoài |

### Cấu hình webhook

> **Lưu ý:** Cấu hình cảnh báo webhook được thực hiện thông qua trang Cài đặt của bảng điều khiển. Xem giao diện Cài đặt để biết URL webhook, cách lọc sự kiện và tùy chỉnh payload.

### Các loại cảnh báo

| Cảnh báo                     | Thời điểm                                           | Mức độ nghiêm trọng mặc định |
| ---------------------------- | --------------------------------------------------- | ---------------------------- |
| `provider_circuit_open`      | Mạch mở                                             | nghiêm trọng                 |
| `provider_circuit_half_open` | Mạch đang kiểm tra khả năng phục hồi                | thông tin                    |
| `quota_warning`              | Hạn ngạch đạt 80% trở lên                           | cảnh báo                     |
| `quota_exhausted`            | Hạn ngạch đạt 100%                                  | nghiêm trọng                 |
| `token_refresh_failed`       | 3 lần làm mới thất bại liên tiếp trở lên            | cảnh báo                     |
| `token_expired`              | Token đã quá hạn                                    | nghiêm trọng                 |
| `combo_target_unhealthy`     | Mục tiêu combo ở trạng thái chờ trong 1 giờ trở lên | cảnh báo                     |
| `db_integrity_warning`       | Số vi phạm FK > 0                                   | cảnh báo                     |
| `heap_pressure`              | Mức sử dụng heap > 80% ngưỡng                       | cảnh báo                     |

---

## Chỉ số hiệu năng

### Các chỉ số được theo dõi

| Chỉ số                  | Loại      | Nguồn                           |
| ----------------------- | --------- | ------------------------------- |
| `request_count`         | bộ đếm    | `services/usage.ts`             |
| `request_latency_ms`    | histogram | `services/usage.ts`             |
| `tokens_consumed`       | bộ đếm    | `services/usage.ts`             |
| `cost_usd`              | bộ đếm    | `services/usage.ts`             |
| `provider_errors`       | bộ đếm    | `services/errorClassifier.ts`   |
| `circuit_state_changes` | bộ đếm    | `services/resilience.ts`        |
| `cache_hits`            | bộ đếm    | `services/signatureCache.ts`    |
| `compression_savings`   | histogram | `services/compression/stats.ts` |
| `quota_used`            | gauge     | `services/quotaMonitor.ts`      |
| `memory_used_mb`        | gauge     | `observability.ts`              |

### Các phân vị độ trễ (p50/p95/p99)

> **Không có endpoint REST.** Dữ liệu phân vị độ trễ có sẵn qua trang `/dashboard/health` của bảng điều khiển. Tính năng xuất dữ liệu sang Prometheus/OpenTelemetry được lên kế hoạch cho v3.9.

### Xuất dữ liệu sang Prometheus / OpenTelemetry (Giai đoạn 2)

Được lên kế hoạch cho v3.9: hỗ trợ xuất dữ liệu gốc sang Prometheus, OpenTelemetry, Datadog.

Hiện tại, hãy thu thập dữ liệu từ `/api/monitoring/health` bằng bất kỳ hệ thống giám sát dựa trên HTTP nào (Prometheus blackbox exporter, Datadog HTTP check, v.v.).

---

## Công thức cảnh báo

### Slack

> **Lưu ý:** Cảnh báo webhook được cấu hình thông qua trang Settings của bảng điều khiển — không có biến môi trường webhook chuyên dụng (`grep -rn` trả về 0 kết quả). Xem giao diện Settings để biết URL webhook, cách lọc sự kiện và tùy chỉnh payload.

### Discord

> Cảnh báo webhook sử dụng cùng quy trình trong giao diện Settings như Slack. Discord chấp nhận cùng một cấu trúc payload JSON.

### PagerDuty

> Cảnh báo webhook sử dụng cùng quy trình trong giao diện Settings. Các khóa định tuyến PagerDuty Events API v2 được cấu hình trong giao diện Settings.

### Webhook tùy chỉnh (JSON)

> Mọi endpoint HTTP chấp nhận POST với phần nội dung JSON đều có thể sử dụng. Hãy cấu hình URL trong giao diện Settings.

---

## Cấu hình bảng điều khiển

### Tùy chỉnh bảng điều khiển trạng thái

Tạo tệp `~/.omniroute/dashboard.json`:

```json
{
  "health": {
    "sections": ["server_status", "database", "providers", "quota_monitors", "recent_errors"],
    "refresh_interval_ms": 5000
  }
}
```

### Ghim một nhà cung cấp lên đầu

```json
{
  "health": {
    "pinned_providers": ["openai", "anthropic"]
  }
}
```

---

## Khắc phục sự cố

### "Nhà cung cấp báo trạng thái bình thường nhưng yêu cầu thất bại"

1. Kiểm tra **các sự cố autopilot** — có thể một mô hình đã bị khóa
2. Xem **các lỗi gần đây** để tìm lớp lỗi cụ thể
3. Thử **kiểm tra kết nối** trong thẻ nhà cung cấp
4. Kiểm tra xem nhà cung cấp có đang **bị giới hạn tốc độ ở phía thượng nguồn** hay không (không hiển thị cục bộ)

### "Hạn ngạch báo trạng thái bình thường nhưng tôi thấy lỗi 429"

- 429 có nghĩa là nhà cung cấp cho biết bạn đã sử dụng hết hạn ngạch
- Dữ liệu theo dõi hạn ngạch của OmniRoute có thể đã **lỗi thời** — dữ liệu của nhà cung cấp ở phía thượng nguồn mới là chính xác
- Dữ liệu hạn ngạch được tự động làm mới thông qua trình giám sát hạn ngạch nội bộ

### "Tổ hợp đang gặp lỗi nhưng tất cả mục tiêu đều có vẻ hoạt động bình thường"

- Kiểm tra bảng điều khiển **trạng thái tổ hợp** để phát hiện sự cố về thứ tự mục tiêu
- Xem **các sự kiện dự phòng** — có thể tổ hợp đang cạn kiệt mục tiêu quá nhanh
- Xác minh **chiến lược** phù hợp với trường hợp sử dụng của bạn (ưu tiên so với luân phiên so với tự động)

### "Kiểm tra trạng thái cơ sở dữ liệu đang thất bại"

- Chạy `sqlite3 ~/.omniroute/storage.sqlite "PRAGMA integrity_check;"`
- Nếu là "ok" — đây là cảnh báo giả, quy trình kiểm tra trạng thái đang quá nghiêm ngặt
- Nếu là bất kỳ kết quả nào khác — **hãy dừng OmniRoute** và làm theo [hướng dẫn khôi phục sau thảm họa](./DATABASE_GUIDE.md#disaster-recovery)

### "Áp lực bộ nhớ heap đang ở mức nghiêm trọng"

```bash
# Kiểm tra heap hiện tại
node -e "console.log(process.memoryUsage())"

# Kích hoạt GC thủ công (nếu dùng --expose-gc)
node --expose-gc -e "global.gc(); console.log(process.memoryUsage())"

# Giảm số lượng yêu cầu đồng thời (thiết lập qua trang Settings của bảng điều khiển, không phải bằng biến môi trường)
# Không có biến môi trường `MAX_CONCURRENT_REQUESTS` — hãy cấu hình trong Settings → Concurrency.
```

---

## Xem thêm

- [USAGE_QUOTA_GUIDE.md](../guides/USAGE_QUOTA_GUIDE.md) — theo dõi mức sử dụng và chi phí
- [DATABASE_GUIDE.md](./DATABASE_GUIDE.md) — lược đồ DB + tình trạng hoạt động
- [PROXY_GUIDE.md](./PROXY_GUIDE.md) — tình trạng proxy (bộ nhớ đệm riêng)
- [ARCHITECTURE.md](../architecture/ARCHITECTURE.md) — kiến trúc hệ thống
- [RESILIENCE_GUIDE.md](../architecture/RESILIENCE_GUIDE.md) — chi tiết về circuit breaker
- Mã nguồn: `src/lib/monitoring/` (4 tệp, 2121 dòng mã)
