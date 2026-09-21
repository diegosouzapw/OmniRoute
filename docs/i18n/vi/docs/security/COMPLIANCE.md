# Compliance & Audit (Tiếng Việt)

🌐 **Languages:** 🇺🇸 [English](../../../../security/COMPLIANCE.md) · 🇪🇹 [am](../../../am/docs/security/COMPLIANCE.md) · 🇸🇦 [ar](../../../ar/docs/security/COMPLIANCE.md) · 🇦🇿 [az](../../../az/docs/security/COMPLIANCE.md) · 🇧🇬 [bg](../../../bg/docs/security/COMPLIANCE.md) · 🇧🇩 [bn](../../../bn/docs/security/COMPLIANCE.md) · 🇨🇿 [cs](../../../cs/docs/security/COMPLIANCE.md) · 🇩🇰 [da](../../../da/docs/security/COMPLIANCE.md) · 🇩🇪 [de](../../../de/docs/security/COMPLIANCE.md) · 🇬🇷 [el](../../../el/docs/security/COMPLIANCE.md) · 🇪🇸 [es](../../../es/docs/security/COMPLIANCE.md) · 🇪🇪 [et](../../../et/docs/security/COMPLIANCE.md) · 🇮🇷 [fa](../../../fa/docs/security/COMPLIANCE.md) · 🇫🇮 [fi](../../../fi/docs/security/COMPLIANCE.md) · 🇫🇷 [fr](../../../fr/docs/security/COMPLIANCE.md) · 🇮🇪 [ga](../../../ga/docs/security/COMPLIANCE.md) · 🇮🇳 [gu](../../../gu/docs/security/COMPLIANCE.md) · 🇳🇬 [ha](../../../ha/docs/security/COMPLIANCE.md) · 🇮🇱 [he](../../../he/docs/security/COMPLIANCE.md) · 🇮🇳 [hi](../../../hi/docs/security/COMPLIANCE.md) · 🇭🇷 [hr](../../../hr/docs/security/COMPLIANCE.md) · 🇭🇺 [hu](../../../hu/docs/security/COMPLIANCE.md) · 🇦🇲 [hy](../../../hy/docs/security/COMPLIANCE.md) · 🇮🇩 [id](../../../id/docs/security/COMPLIANCE.md) · 🇳🇬 [ig](../../../ig/docs/security/COMPLIANCE.md) · 🇮🇹 [it](../../../it/docs/security/COMPLIANCE.md) · 🇯🇵 [ja](../../../ja/docs/security/COMPLIANCE.md) · 🇬🇪 [ka](../../../ka/docs/security/COMPLIANCE.md) · 🇰🇭 [km](../../../km/docs/security/COMPLIANCE.md) · 🇮🇳 [kn](../../../kn/docs/security/COMPLIANCE.md) · 🇰🇷 [ko](../../../ko/docs/security/COMPLIANCE.md) · 🇱🇹 [lt](../../../lt/docs/security/COMPLIANCE.md) · 🇱🇻 [lv](../../../lv/docs/security/COMPLIANCE.md) · 🇮🇳 [ml](../../../ml/docs/security/COMPLIANCE.md) · 🇮🇳 [mr](../../../mr/docs/security/COMPLIANCE.md) · 🇲🇾 [ms](../../../ms/docs/security/COMPLIANCE.md) · 🇲🇹 [mt](../../../mt/docs/security/COMPLIANCE.md) · 🇲🇲 [my](../../../my/docs/security/COMPLIANCE.md) · 🇳🇵 [ne](../../../ne/docs/security/COMPLIANCE.md) · 🇳🇱 [nl](../../../nl/docs/security/COMPLIANCE.md) · 🇳🇴 [no](../../../no/docs/security/COMPLIANCE.md) · 🇮🇳 [or](../../../or/docs/security/COMPLIANCE.md) · 🇮🇳 [pa](../../../pa/docs/security/COMPLIANCE.md) · 🇵🇭 [phi](../../../phi/docs/security/COMPLIANCE.md) · 🇵🇱 [pl](../../../pl/docs/security/COMPLIANCE.md) · 🇵🇹 [pt](../../../pt/docs/security/COMPLIANCE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/COMPLIANCE.md) · 🇷🇴 [ro](../../../ro/docs/security/COMPLIANCE.md) · 🇷🇺 [ru](../../../ru/docs/security/COMPLIANCE.md) · 🇱🇰 [si](../../../si/docs/security/COMPLIANCE.md) · 🇸🇰 [sk](../../../sk/docs/security/COMPLIANCE.md) · 🇸🇮 [sl](../../../sl/docs/security/COMPLIANCE.md) · 🇷🇸 [sr](../../../sr/docs/security/COMPLIANCE.md) · 🇸🇪 [sv](../../../sv/docs/security/COMPLIANCE.md) · 🇰🇪 [sw](../../../sw/docs/security/COMPLIANCE.md) · 🇮🇳 [ta](../../../ta/docs/security/COMPLIANCE.md) · 🇮🇳 [te](../../../te/docs/security/COMPLIANCE.md) · 🇹🇭 [th](../../../th/docs/security/COMPLIANCE.md) · 🇹🇷 [tr](../../../tr/docs/security/COMPLIANCE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/COMPLIANCE.md) · 🇵🇰 [ur](../../../ur/docs/security/COMPLIANCE.md) · 🇺🇿 [uz](../../../uz/docs/security/COMPLIANCE.md) · 🇳🇬 [yo](../../../yo/docs/security/COMPLIANCE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/COMPLIANCE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/COMPLIANCE.md)

---

> **Nguồn chính xác:** `src/lib/compliance/`, `src/app/api/compliance/`
> **Cập nhật lần cuối:** 2026-06-28 — v3.8.40

OmniRoute ghi lại các thao tác quản trị, sự kiện xác thực, thay đổi trong vòng đời thông tin xác thực của nhà cung cấp và các lần gọi công cụ MCP vào các bảng kiểm toán được SQLite hỗ trợ. Trang này trình bày những nội dung được ghi nhật ký, nơi lưu trữ, thời gian lưu giữ, cách các khóa API có thể chọn không tham gia và cách truy vấn dữ liệu.

Phần triển khai nằm trong `src/lib/compliance/index.ts` (T-43 — "Kiểm soát tuân thủ") và `src/lib/compliance/providerAudit.ts`. Các thao tác ghi kiểm toán không bao giờ ném ngoại lệ: khi xảy ra bất kỳ lỗi nào, lệnh gọi sẽ bị bỏ qua một cách âm thầm để việc ghi nhật ký kiểm toán không làm gián đoạn luồng yêu cầu chính.

## Những gì được ghi nhật ký

### Các sự kiện kiểm toán quản trị (`audit_log`)

Mỗi lệnh gọi `logAuditEvent({ action, actor, target, details, ... })` tạo ra một hàng. Chuỗi hành động tuân theo mẫu `domain.verb` (hoặc `domain.verb.outcome`). Các loại hành động đã được xác nhận trong cây mã nguồn bao gồm:

| Hành động                            | Nguồn                                   |
| ------------------------------------ | --------------------------------------- |
| `auth.login.success`                 | `src/app/api/auth/login/route.ts`       |
| `auth.login.failed`                  | `src/app/api/auth/login/route.ts`       |
| `auth.login.locked`                  | `src/app/api/auth/login/route.ts`       |
| `auth.login.error`                   | `src/app/api/auth/login/route.ts`       |
| `auth.login.misconfigured`           | `src/app/api/auth/login/route.ts`       |
| `auth.login.setup_required`          | `src/app/api/auth/login/route.ts`       |
| `auth.logout.success`                | `src/app/api/auth/logout/route.ts`      |
| `provider.credentials.created`       | `src/app/api/providers/route.ts`        |
| `provider.credentials.updated`       | `src/app/api/providers/[id]/route.ts`   |
| `provider.credentials.revoked`       | `src/app/api/providers/[id]/route.ts`   |
| `provider.credentials.batch_revoked` | `src/app/api/providers/route.ts`        |
| `sync.token.created`                 | `src/app/api/sync/tokens/route.ts`      |
| `sync.token.revoked`                 | `src/app/api/sync/tokens/[id]/route.ts` |
| `compliance.cleanup`                 | `src/lib/compliance/index.ts`           |

Mỗi mục ghi lại `action`, `actor` (mặc định là `"system"`), `target`, `details`/`metadata` (JSON), `ip_address`, `resource_type`, `status`, `request_id` và `timestamp`. Các khóa nhạy cảm (`apiKey`, `accessToken`, `refreshToken`, `password`, mọi khóa khớp với `*token`/`*secret`/`*apikey`, v.v.) được che giấu đệ quy thành `"[redacted]"` trước khi hàng được ghi.

### Các lệnh gọi công cụ MCP (`mcp_tool_audit`)

Mỗi lần gọi công cụ MCP đều ghi một hàng thông qua `open-sse/mcp-server/audit.ts`. Lược đồ (từ `src/lib/db/migrations/002_mcp_a2a_tables.sql`):

| Cột              | Ghi chú                                  |
| ---------------- | ---------------------------------------- |
| `id`             | tự động tăng                             |
| `tool_name`      | mã định danh công cụ MCP                 |
| `input_hash`     | sha256 của đầu vào (không lưu tải trọng) |
| `output_summary` | bản tóm tắt ngắn, đã cắt bớt             |
| `duration_ms`    | thời gian thực tế                        |
| `api_key_id`     | bên gọi (có thể null)                    |
| `success`        | `1` / `0`                                |
| `error_code`     | mã lỗi cuối cùng khi thất bại            |
| `created_at`     | dấu thời gian ISO                        |

### Nhật ký yêu cầu / mức sử dụng

Đây là dữ liệu đo từ xa vận hành (không hoàn toàn là kiểm toán quản trị), nhưng sử dụng chung quy trình lưu giữ:

- `usage_history` — tổng hợp mức sử dụng theo từng yêu cầu
- `call_logs` — nhật ký đầy đủ theo từng yêu cầu (chịu giới hạn số hàng, xem bên dưới)
- `proxy_logs` — nhật ký lưu lượng proxy (chịu giới hạn số hàng)
- `request_detail_logs` — nhật ký yêu cầu chi tiết cũ (vẫn được lược bỏ nếu tồn tại)

## Lược đồ lưu trữ

`audit_log` được tạo theo cơ chế trì hoãn bởi `ensureAuditLogSchema()` trong lần sử dụng đầu tiên:

```sql
CREATE TABLE IF NOT EXISTS audit_log (
  id            INTEGER PRIMARY KEY AUTOINCREMENT,
  timestamp     TEXT NOT NULL DEFAULT (datetime('now')),
  action        TEXT NOT NULL,
  actor         TEXT NOT NULL DEFAULT 'system',
  target        TEXT,
  details       TEXT,
  ip_address    TEXT,
  resource_type TEXT,
  status        TEXT,
  request_id    TEXT,
  metadata      TEXT
);
```

Các chỉ mục được tạo trên `timestamp`, `action`, `actor`, `resource_type`,
`status` và `request_id`. Các cột còn thiếu trong cơ sở dữ liệu cũ được thêm qua
`ALTER TABLE` khi cần.

## Lưu giữ & Dọn dẹp

Hai khoảng thời gian lưu giữ riêng biệt được áp dụng:

| Biến môi trường             | Mặc định | Áp dụng cho                                                       |
| --------------------------- | -------- | ----------------------------------------------------------------- |
| `APP_LOG_RETENTION_DAYS`    | `7`      | `audit_log`, `mcp_tool_audit`                                     |
| `CALL_LOG_RETENTION_DAYS`   | `7`      | `usage_history`, `call_logs`, `proxy_logs`, `request_detail_logs` |
| `CALL_LOGS_TABLE_MAX_ROWS`  | `100000` | Giới hạn số hàng cho `call_logs`                                  |
| `PROXY_LOGS_TABLE_MAX_ROWS` | `100000` | Giới hạn số hàng cho `proxy_logs`                                 |

`cleanupExpiredLogs()` chạy quy trình lưu giữ. Hàm này được gọi khi máy chủ khởi động
từ `src/instrumentation-node.ts`. Mỗi lần chạy sẽ ghi một sự kiện kiểm tra
`compliance.cleanup` cùng với số lượng bản ghi đã xóa theo từng bảng. Việc cắt giảm nhật ký proxy/cuộc gọi
được thực hiện theo lô (`BATCH_SIZE = 5000`) để tránh khóa ghi kéo dài.

Việc dọn dẹp thủ công lịch sử yêu cầu tách biệt với cơ chế lưu giữ. Trang Nhật ký yêu cầu
gọi `POST /api/settings/purge-request-history`, thao tác này sẽ xóa `call_logs`,
`request_detail_logs` cũ và các tệp tạo tác yêu cầu cục bộ trong
`${DATA_DIR}/call_logs/`.

Các giá trị mặc định được định nghĩa trong `src/lib/logEnv.ts`
(`DEFAULT_APP_LOG_RETENTION_DAYS = 7`, `DEFAULT_CALL_LOG_RETENTION_DAYS = 7`).

## Tùy chọn từ chối `noLog` (theo từng khóa API)

Các khóa API có thể được gắn cờ để lưu lượng cuộc gọi hạ nguồn của chúng không bị ghi nhật ký. Cờ này
nằm trong bảng `api_keys` (`no_log INTEGER DEFAULT 0`) và được sao chép
vào một tập hợp trong bộ nhớ để tra cứu trên đường xử lý nóng.

```bash
# Tạo khóa không ghi nhật ký (yêu cầu xác thực quản lý)
curl -X POST http://localhost:20128/api/keys \
  -H "Cookie: auth_token=..." \
  -H "Content-Type: application/json" \
  -d '{"name": "Privacy key", "noLog": true}'
```

Các hàm hỗ trợ (`src/lib/compliance/index.ts`):

- `setNoLog(apiKeyId, true|false)` — bật/tắt mục nhập trong bộ nhớ
- `isNoLog(apiKeyId)` — được kiểm tra trên đường xử lý yêu cầu; nếu không có thì chuyển sang đọc
  `api_keys.no_log` từ bộ nhớ đệm 30 giây
- `NO_LOG_API_KEY_IDS` (biến môi trường, phân tách bằng dấu phẩy) — được nạp trước vào tập hợp trong bộ nhớ
  khi khởi động; hữu ích khi bạn không thể trực tiếp thay đổi cột

Các sự kiện kiểm tra quản trị (đăng nhập, thay đổi nhà cung cấp, lệnh gọi công cụ MCP, v.v.)
**không** bị ảnh hưởng bởi `noLog` — chỉ việc ghi nhật ký lưu lượng theo từng yêu cầu mới bị
từ chối.

## API REST

| Điểm cuối                   | Phương thức | Mô tả                                                           | Xác thực   |
| --------------------------- | ----------- | --------------------------------------------------------------- | ---------- |
| `/api/compliance/audit-log` | `GET`       | Các mục nhật ký kiểm toán quản trị được phân trang và có bộ lọc | management |
| `/api/mcp/audit`            | `GET`       | Các mục nhật ký kiểm toán công cụ MCP được phân trang           | (open-sse) |
| `/api/mcp/audit/stats`      | `GET`       | Số liệu thống kê kiểm toán MCP tổng hợp                         | (open-sse) |

Hiện chưa có điểm cuối xuất CSV — hãy xuất từ bảng điều khiển hoặc truy vấn
trực tiếp cơ sở dữ liệu SQLite.

### Truy vấn `/api/compliance/audit-log`

Các tham số truy vấn được hỗ trợ (tất cả đều không bắt buộc, tất cả bộ lọc
văn bản đều sử dụng đối sánh `LIKE %value%`):

- `action`, `actor`, `target`, `resourceType` (hoặc `resource_type`),
  `status`, `requestId` (hoặc `request_id`)
- `from` / `since`, `to` / `until` — dấu thời gian ISO
- `limit` (mặc định `50`, tối thiểu `1`, tối đa `500`)
- `offset` (mặc định `0`, tối đa `10_000`)

Phản hồi là một mảng JSON. Siêu dữ liệu phân trang được trả về trong các header:
`x-total-count`, `x-page-limit`, `x-page-offset`.

```bash
curl "http://localhost:20128/api/compliance/audit-log?action=provider.credentials&from=2026-05-01" \
  -H "Cookie: auth_token=..."
```

## Bảng điều khiển

Bảng điều khiển hiển thị dữ liệu kiểm toán tại **`/dashboard/audit`**
(`src/app/(dashboard)/dashboard/audit/page.tsx`). Trang này có hai tab:

- **Tuân thủ** (`ComplianceTab.tsx`) — các sự kiện kiểm toán quản trị từ
  `/api/compliance/audit-log`. Lọc theo loại sự kiện, mức độ nghiêm trọng (thông tin / cảnh báo
  / nghiêm trọng, được suy ra từ hành động + trạng thái) và phạm vi ngày. Mức độ nghiêm trọng
  được tính toán phía máy khách từ các chuỗi hành động/trạng thái.
- **MCP** (`McpAuditTab.tsx`) — kiểm toán công cụ MCP từ `/api/mcp/audit`, với
  các bộ lọc theo tên công cụ và trạng thái thành công/thất bại.

Cả hai tab đều phân trang với kích thước trang là `50` (tuân thủ) và `25` (MCP).

## Các hàm trợ giúp thông tin xác thực của nhà cung cấp

`src/lib/compliance/providerAudit.ts` cung cấp các hàm trợ giúp định hình dữ liệu được các
route quản lý nhà cung cấp sử dụng khi phát ra sự kiện thông tin xác thực:

- `summarizeProviderConnectionForAudit(connection)` — loại bỏ `apiKey`,
  `accessToken`, `refreshToken`, `idToken` và
  `providerSpecificData.consoleApiKey` trước khi ảnh chụp nhanh kết nối được
  ghi vào `details`.
- `getProviderAuditTarget(connection)` — tạo một chuỗi ổn định
  `"<provider>:<name|id>"` cho trường `target`.
- `extractProviderWarnings(...payloads)` — quét phản hồi của nhà cung cấp để tìm
  các cảnh báo về chính sách/an toàn (`[sanitizer]`, `prompt injection detected`,
  `content has been filtered`, `safety filter`, `policy violation`) và
  đưa ra tối đa 5 kết quả, mỗi kết quả được cắt ngắn còn 400 ký tự.

## Các phương pháp hay nhất

- Đánh dấu các khóa API xử lý PII (pháp lý, y tế, v.v.) bằng `noLog: true`.
- Điều chỉnh `APP_LOG_RETENTION_DAYS` / `CALL_LOG_RETENTION_DAYS` để đáp ứng
  chính sách lưu giữ của bạn. Giá trị mặc định 7 ngày mang tính thận trọng.
- Xuất bảng kiểm toán ra ngoài nền tảng (`sqlite3 dump`) theo bất kỳ chu kỳ nào
  mà chương trình tuân thủ của bạn yêu cầu — không có tính năng lưu trữ tích hợp sẵn.
- Theo dõi số lượng `auth.login.failed` và `auth.login.locked` để phát hiện
  các cuộc tấn công vét cạn.
- Khi thêm các điểm cuối quản trị mới, hãy gọi `logAuditEvent({ ... })` với chuỗi hành động
  `domain.verb.outcome` ổn định và truyền ngữ cảnh yêu cầu qua
  `getAuditRequestContext(request)` để IP và `requestId` được ghi lại
  tự động.

## Xem thêm

- [`docs/security/GUARDRAILS.md`](./GUARDRAILS.md) — che giấu PII, tấn công chèn prompt
- [`docs/frameworks/MCP-SERVER.md`](../frameworks/MCP-SERVER.md) — danh mục công cụ MCP và phạm vi
- [`docs/reference/ENVIRONMENT.md`](../reference/ENVIRONMENT.md) — tài liệu tham khảo đầy đủ về biến môi trường
- Mã nguồn: `src/lib/compliance/`, `src/app/api/compliance/`,
  `src/app/api/mcp/audit/`, `src/lib/logEnv.ts`
