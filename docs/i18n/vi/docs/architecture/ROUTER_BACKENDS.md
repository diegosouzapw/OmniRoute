# Router Backends & Embedded Services — architecture contract (ADR) (Tiếng Việt)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/ROUTER_BACKENDS.md) · 🇪🇹 [am](../../../am/docs/architecture/ROUTER_BACKENDS.md) · 🇸🇦 [ar](../../../ar/docs/architecture/ROUTER_BACKENDS.md) · 🇦🇿 [az](../../../az/docs/architecture/ROUTER_BACKENDS.md) · 🇧🇬 [bg](../../../bg/docs/architecture/ROUTER_BACKENDS.md) · 🇧🇩 [bn](../../../bn/docs/architecture/ROUTER_BACKENDS.md) · 🇧🇦 [bs](../../../bs/docs/architecture/ROUTER_BACKENDS.md) · 🇨🇿 [cs](../../../cs/docs/architecture/ROUTER_BACKENDS.md) · 🇩🇰 [da](../../../da/docs/architecture/ROUTER_BACKENDS.md) · 🇩🇪 [de](../../../de/docs/architecture/ROUTER_BACKENDS.md) · 🇬🇷 [el](../../../el/docs/architecture/ROUTER_BACKENDS.md) · 🇪🇸 [es](../../../es/docs/architecture/ROUTER_BACKENDS.md) · 🇪🇪 [et](../../../et/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇷 [fa](../../../fa/docs/architecture/ROUTER_BACKENDS.md) · 🇫🇮 [fi](../../../fi/docs/architecture/ROUTER_BACKENDS.md) · 🇫🇷 [fr](../../../fr/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇪 [ga](../../../ga/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [gu](../../../gu/docs/architecture/ROUTER_BACKENDS.md) · 🇳🇬 [ha](../../../ha/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇱 [he](../../../he/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [hi](../../../hi/docs/architecture/ROUTER_BACKENDS.md) · 🇭🇷 [hr](../../../hr/docs/architecture/ROUTER_BACKENDS.md) · 🇭🇺 [hu](../../../hu/docs/architecture/ROUTER_BACKENDS.md) · 🇦🇲 [hy](../../../hy/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇩 [id](../../../id/docs/architecture/ROUTER_BACKENDS.md) · 🇳🇬 [ig](../../../ig/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇹 [it](../../../it/docs/architecture/ROUTER_BACKENDS.md) · 🇯🇵 [ja](../../../ja/docs/architecture/ROUTER_BACKENDS.md) · 🇬🇪 [ka](../../../ka/docs/architecture/ROUTER_BACKENDS.md) · 🇰🇭 [km](../../../km/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [kn](../../../kn/docs/architecture/ROUTER_BACKENDS.md) · 🇰🇷 [ko](../../../ko/docs/architecture/ROUTER_BACKENDS.md) · 🇱🇹 [lt](../../../lt/docs/architecture/ROUTER_BACKENDS.md) · 🇱🇻 [lv](../../../lv/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [ml](../../../ml/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [mr](../../../mr/docs/architecture/ROUTER_BACKENDS.md) · 🇲🇾 [ms](../../../ms/docs/architecture/ROUTER_BACKENDS.md) · 🇲🇹 [mt](../../../mt/docs/architecture/ROUTER_BACKENDS.md) · 🇲🇲 [my](../../../my/docs/architecture/ROUTER_BACKENDS.md) · 🇳🇵 [ne](../../../ne/docs/architecture/ROUTER_BACKENDS.md) · 🇳🇱 [nl](../../../nl/docs/architecture/ROUTER_BACKENDS.md) · 🇳🇴 [no](../../../no/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [or](../../../or/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [pa](../../../pa/docs/architecture/ROUTER_BACKENDS.md) · 🇵🇭 [phi](../../../phi/docs/architecture/ROUTER_BACKENDS.md) · 🇵🇱 [pl](../../../pl/docs/architecture/ROUTER_BACKENDS.md) · 🇵🇹 [pt](../../../pt/docs/architecture/ROUTER_BACKENDS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/ROUTER_BACKENDS.md) · 🇷🇴 [ro](../../../ro/docs/architecture/ROUTER_BACKENDS.md) · 🇷🇺 [ru](../../../ru/docs/architecture/ROUTER_BACKENDS.md) · 🇱🇰 [si](../../../si/docs/architecture/ROUTER_BACKENDS.md) · 🇸🇰 [sk](../../../sk/docs/architecture/ROUTER_BACKENDS.md) · 🇸🇮 [sl](../../../sl/docs/architecture/ROUTER_BACKENDS.md) · 🇷🇸 [sr](../../../sr/docs/architecture/ROUTER_BACKENDS.md) · 🇸🇪 [sv](../../../sv/docs/architecture/ROUTER_BACKENDS.md) · 🇰🇪 [sw](../../../sw/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [ta](../../../ta/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [te](../../../te/docs/architecture/ROUTER_BACKENDS.md) · 🇹🇭 [th](../../../th/docs/architecture/ROUTER_BACKENDS.md) · 🇹🇷 [tr](../../../tr/docs/architecture/ROUTER_BACKENDS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/ROUTER_BACKENDS.md) · 🇵🇰 [ur](../../../ur/docs/architecture/ROUTER_BACKENDS.md) · 🇺🇿 [uz](../../../uz/docs/architecture/ROUTER_BACKENDS.md) · 🇳🇬 [yo](../../../yo/docs/architecture/ROUTER_BACKENDS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/ROUTER_BACKENDS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/ROUTER_BACKENDS.md)

---

> **Trạng thái:** Đã chấp nhận · **Bối cảnh:** [#5670](https://github.com/diegosouzapw/OmniRoute/issues/5670),
> [#5603](https://github.com/diegosouzapw/OmniRoute/issues/5603) · **Hợp đồng:** `domain/routing/routerBackends.ts`
> (registry có kiểu — mã nguồn được tích hợp cùng [#5868](https://github.com/diegosouzapw/OmniRoute/pull/5868))

ADR này xác định rõ mối quan hệ giữa `ts` (gốc), `bifrost`, `cliproxy`, `9router` và các engine tương thích với VibeProxy, để những người đóng góp không còn nhầm lẫn hai khái niệm khác biệt về mặt kiến trúc. Tài liệu này xác định registry có kiểu được giới thiệu trong quá trình triển khai router-backend-registry là nguồn thông tin chính xác duy nhất cho mô hình đó.

## Điểm khác biệt cốt lõi — hai trục trực giao

Vai trò của một engine được mô tả bằng **hai trục độc lập**, được mã hóa cùng nhau trong `RouterBackendDefinition` của registry:

1. **Vòng đời** (`RouterBackendLifecycle`) — _engine chạy như thế nào_:
   - `in-process` — chạy bên trong tiến trình Node của OmniRoute (pipeline TS gốc).
   - `supervised` — một tiến trình con cục bộ mà OmniRoute cài đặt/khởi động/dừng/kiểm tra tình trạng thông qua `ServiceSupervisor`, sau đó sử dụng dưới dạng một kết nối nhà cung cấp.
   - `external` — một endpoint HTTP mà OmniRoute gửi yêu cầu tới nhưng **không** quản lý (được cấu hình bằng URL cơ sở qua biến môi trường).
   - `disabled` — đã đăng ký nhưng không thể được chọn.
2. **Trục lựa chọn** (backend định tuyến relay) — _relay có gửi yêu cầu tới đó hay không_:
   `RelayRoutingBackend = "ts" | "bifrost" | "auto"` trong
   `src/app/api/v1/relay/chat/completions/routingBackend.ts`.

Sai lầm cần tránh: coi "dịch vụ nhúng" và "backend định tuyến" là cùng một danh sách. Chúng không giống nhau. Một engine `supervised` (9router/cliproxy) là một **kết nối nhà cung cấp được pipeline gốc sử dụng**, không phải một backend gửi yêu cầu relay thay thế. `bifrost` thì ngược lại — đây là một backend gửi yêu cầu relay mà (trước đây) chỉ ở dạng `external`.

## Registry — nguồn thông tin chính xác duy nhất

Hợp đồng `domain/routing/routerBackends.ts` (mã nguồn được tích hợp cùng
[#5868](https://github.com/diegosouzapw/OmniRoute/pull/5868)) khai báo mỗi engine đúng một lần, cùng với vòng đời, các khả năng, định danh dịch vụ, cổng mặc định, cấu hình kiểm tra tình trạng và hỗ trợ đo từ xa của engine đó. Các thành phần sử dụng tra cứu engine thông qua `getRouterBackend(id)`, `listRouterBackends()` và `listRouterBackendsByCapability(cap)` thay vì xử lý đặc biệt từng sidecar.

| Backend     | Vòng đời     | Dịch vụ (trục A) | Backend relay (trục B)   | Kiểm tra tình trạng | Cổng mặc định |
| ----------- | ------------ | ---------------- | ------------------------ | ------------------- | ------------- |
| `ts`        | `in-process` | —                | `ts` (gốc)               | —                   | —             |
| `bifrost`   | `external`¹  | —¹               | `bifrost` / `auto`       | `/health`           | —             |
| `cliproxy`  | `supervised` | `cliproxy`       | — (nhà cung cấp)         | `/v1/models`        | 8317          |
| `9router`   | `supervised` | `9router`        | — (nhà cung cấp)         | `/api/health`       | 20130         |
| `vibeproxy` | `external`   | —                | — (adapter nhà cung cấp) | `/v1/models`        | —             |

¹ Việc nâng cấp Bifrost thành một dịch vụ nhúng `supervised` (có thể cài đặt/khởi động từ `/api/services/bifrost/`) đang được theo dõi trong
[#5817](https://github.com/diegosouzapw/OmniRoute/pull/5817); cho đến khi thay đổi này được hợp nhất, Bifrost chỉ ở dạng `external` (chỉ có thể truy cập thông qua `BIFROST_BASE_URL`).

`capabilities` (`chat`, `responses`, `streaming`, `tools`, `vision`,
`oauth-backed`, `dashboard-embed`, `model-sync`, `native-hot-path`) cho phép bên gọi lọc theo những gì một engine thực sự có thể thực hiện, thay vì mã hóa cứng các nhánh riêng cho từng id.

## Trục A — các dịch vụ nhúng (phía tiến trình được giám sát)

- **Registry của các tiến trình được giám sát:** `src/lib/services/bootstrap.ts` `SERVICES[]`
  (hiện tại: `9router`, `cliproxy`).
- **Thành phần quản lý vòng đời:** `src/lib/services/ServiceSupervisor.ts` — `start()` khởi chạy
  tiến trình con, chờ `waitForHealthy()` thành công, thu stdout/stderr vào một bộ đệm vòng;
  `stop()` thực hiện SIGTERM→SIGKILL; tất cả đều được tuần tự hóa bằng một khóa.
- **Kiểu union trạng thái** (`src/lib/services/types.ts`):
  `not_installed | stopped | starting | running | stopping | error`, cùng với
  `HealthState = healthy | unhealthy | unknown` trực giao.
- **Tại sao lại là một tiến trình riêng biệt (thay vì SDK trong cùng tiến trình)?** Việc cô lập tiến trình
  cho phép kiểm soát độc lập việc cài đặt/khởi động/dừng/tình trạng/nhật ký của từng sidecar và cho phép áp dụng
  cơ chế bảo vệ việc khởi chạy qua loopback. Việc mô hình hóa một adapter trong cùng tiến trình là công việc trong tương lai —
  cờ khả năng `native-hot-path` là nơi điều này sẽ được biểu thị.

### Hợp đồng route vòng đời (`/api/services/<tool>/…`)

Các mã trạng thái được thiết kế **riêng theo trạng thái/động từ/đường dẫn** — đây là hợp đồng,
không phải sự thiếu nhất quán:

| Lời gọi                      | Điều kiện                                 | Trạng thái                           |
| ---------------------------- | ----------------------------------------- | ------------------------------------ |
| `POST .../start`             | dịch vụ `not_installed`                   | **409** (điều kiện tiên quyết)       |
| `POST .../stop`              | đã dừng                                   | **200** (không thao tác, lũy đẳng)   |
| `GET .../status`             | OK                                        | **200** (`live ?? row ?? "unknown"`) |
| `POST .../start`             | lỗi khởi chạy tiến trình                  | **503** (tạm thời)                   |
| `GET .../status`, `.../stop` | lỗi không được bắt                        | **500**                              |
| `GET /api/services/<x>/logs` | công cụ `<x>` không xác định              | **404** `Service '<x>' not found`    |
| `GET .../status?reveal=key`  | thiếu `X-Reveal-Confirm: yes`             | **403** (chỉ 9router)                |
| **bất kỳ** `/api/services/*` | bên gọi không thuộc loopback/LAN riêng tư | **403 LOCAL_ONLY**                   |

Tất cả nội dung lỗi đều được định dạng bởi `createErrorResponse()` →
`{ error: { message, type }, requestId }`, trong đó `type` được suy ra từ trạng thái
(`500→server_error`, `404→not_found`, `409→conflict`, còn lại là `invalid_request`) và là
giá trị phân biệt mà máy có thể xử lý. Các thông báo được làm sạch trước
(`sanitizeErrorMessage()`, Quy tắc Cứng #12).

**Cơ chế bảo vệ loopback** là nguồn phổ biến nhất gây ra `403`: `/api/services/` nằm trong
`LOCAL_ONLY_API_PREFIXES` (`src/server/authz/routeGuard.ts`) và
`src/server/authz/policies/management.ts` từ chối mọi bên gọi không thuộc loopback / LAN riêng tư
**trước bước xác thực**, vì các route này khởi chạy tiến trình con (Quy tắc Cứng 15
và 17). Truy cập chúng thông qua một tunnel công khai sẽ trả về `403` theo thiết kế.

## Trục B — backend định tuyến relay (phía điều phối)

Chỉ đường dẫn proxy relay `/api/v1/relay/chat/completions` mới chọn một backend
điều phối; bề mặt chính `/api/v1/chat/completions` không bao giờ tham chiếu
`routingBackend.ts`.

- **Lựa chọn** (`resolveRelayRoutingBackend`): một biến môi trường toàn cục duy nhất —
  `OMNIROUTE_RELAY_BACKEND` / `RELAY_ROUTING_BACKEND` ∈ {`ts`, `bifrost`, `auto`}.
  Nếu không được đặt, dùng `auto` khi Bifrost đã được cấu hình+bật, nếu không thì dùng `ts`.
- **Hành vi:**
  - `bifrost` (bắt buộc): Bifrost gặp lỗi → trả về `502` ngay, không dự phòng.
  - `auto`: thử Bifrost, khi gặp lỗi/thời gian chờ hồi phục thì âm thầm chuyển sang giải pháp native.
  - `ts` / sau khi dự phòng: pipeline dịch thuật/thực thi `open-sse` native.
- **Thời gian chờ hồi phục:** thời gian chờ sau lỗi theo từng `baseUrl` trong `bifrostCooldown.ts`.

Hiện tại, việc lựa chọn là **tất cả hoặc không gì cả ở cấp relay** — không có việc chuyển đổi engine
theo từng provider hoặc từng request trên `release/v3.8.43`. Cơ chế kiểm soát theo từng request đang được bổ sung
bởi phần triển khai manifest của sidecar
([#5869](https://github.com/diegosouzapw/OmniRoute/pull/5869) manifest +
[#5870](https://github.com/diegosouzapw/OmniRoute/pull/5870) `shouldTryBifrostForRequest`),
cho phép `auto` chỉ định tuyến các provider đủ điều kiện theo manifest thông qua Bifrost.

## Tích hợp dashboard

Dashboard dịch vụ thăm dò `GET /api/services/<tool>/status` mỗi 5 giây thông qua
`src/app/(dashboard)/dashboard/providers/services/hooks/useServiceStatus.ts`,
trả về `{ tool, state, pid, port, health, installedVersion, latestVersion,
updateAvailable, autoStart, … }`. Không có provider ngữ cảnh khả dụng dùng chung —
mỗi component gọi hook cho từng công cụ. Khi `!res.ok`, hook hiện chỉ hiển thị một
thông báo `HTTP <status>` đơn thuần; việc ánh xạ trường `error.type` sang phần giải thích
dễ hiểu cho người dùng là một cải tiến UX đang được theo dõi, không phải thay đổi về hợp đồng.

## Hệ quả

- Các engine mới chỉ cần đăng ký một lần trong `ROUTER_BACKENDS`; các consumer nhận được chúng thông qua
  các truy vấn capability mà không cần thêm nhánh mới cho từng id.
- Câu hỏi "Đây là dịch vụ hay routing backend?" được trả lời bằng trường `lifecycle`, chứ không phải
  dựa vào danh sách mà một id tình cờ xuất hiện trong đó.
- Cơ chế giám sát Bifrost (#5817) và quá trình di chuyển hot path sang native (#5670) được xây dựng dựa trên
  hợp đồng dùng chung này thay vì xử lý đặc biệt từng sidecar.
