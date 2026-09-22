# Database Schema & Operations Guide (Tiếng Việt)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/DATABASE_GUIDE.md) · 🇪🇹 [am](../../../am/docs/ops/DATABASE_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/ops/DATABASE_GUIDE.md) · 🇦🇿 [az](../../../az/docs/ops/DATABASE_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/ops/DATABASE_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/ops/DATABASE_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/ops/DATABASE_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/ops/DATABASE_GUIDE.md) · 🇩🇰 [da](../../../da/docs/ops/DATABASE_GUIDE.md) · 🇩🇪 [de](../../../de/docs/ops/DATABASE_GUIDE.md) · 🇬🇷 [el](../../../el/docs/ops/DATABASE_GUIDE.md) · 🇪🇸 [es](../../../es/docs/ops/DATABASE_GUIDE.md) · 🇪🇪 [et](../../../et/docs/ops/DATABASE_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/ops/DATABASE_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/ops/DATABASE_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/ops/DATABASE_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/ops/DATABASE_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/ops/DATABASE_GUIDE.md) · 🇮🇱 [he](../../../he/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/ops/DATABASE_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/ops/DATABASE_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/ops/DATABASE_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/ops/DATABASE_GUIDE.md) · 🇮🇩 [id](../../../id/docs/ops/DATABASE_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/ops/DATABASE_GUIDE.md) · 🇮🇹 [it](../../../it/docs/ops/DATABASE_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/ops/DATABASE_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/ops/DATABASE_GUIDE.md) · 🇰🇭 [km](../../../km/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/ops/DATABASE_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/ops/DATABASE_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/ops/DATABASE_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/ops/DATABASE_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/ops/DATABASE_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/ops/DATABASE_GUIDE.md) · 🇲🇲 [my](../../../my/docs/ops/DATABASE_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/ops/DATABASE_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/ops/DATABASE_GUIDE.md) · 🇳🇴 [no](../../../no/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [or](../../../or/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/ops/DATABASE_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/ops/DATABASE_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/ops/DATABASE_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/ops/DATABASE_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/DATABASE_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/ops/DATABASE_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/ops/DATABASE_GUIDE.md) · 🇱🇰 [si](../../../si/docs/ops/DATABASE_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/ops/DATABASE_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/ops/DATABASE_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/ops/DATABASE_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/ops/DATABASE_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [te](../../../te/docs/ops/DATABASE_GUIDE.md) · 🇹🇭 [th](../../../th/docs/ops/DATABASE_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/ops/DATABASE_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/DATABASE_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/ops/DATABASE_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/ops/DATABASE_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/ops/DATABASE_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/DATABASE_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/DATABASE_GUIDE.md)

---

> **Tóm tắt**: OmniRoute sử dụng **SQLite với cơ chế ghi nhật ký WAL** làm kho lưu trữ chính, cùng mã hóa **AES-256-GCM** cho dữ liệu nhạy cảm khi lưu trữ. Hướng dẫn này đề cập đến lược đồ, quá trình di chuyển, sao lưu/khôi phục và các quy trình vận hành.

**Nguồn:**

- `src/lib/db/core.ts` — singleton + SCHEMA_SQL (17 bảng cơ sở)
- `src/lib/db/migrationRunner.ts` — các bản di chuyển được quản lý theo phiên bản
- `src/lib/db/migrations/` — 167 tệp SQL được quản lý theo phiên bản
- `src/lib/db/encryption.ts` — các hàm hỗ trợ mã hóa
- `src/lib/db/backup.ts` — xuất/nhập bản sao lưu
- `src/lib/db/healthCheck.ts` — chẩn đoán tình trạng hoạt động

---

## Tại sao chọn SQLite?

OmniRoute chọn SQLite thay vì PostgreSQL/MySQL vì một số lý do:

| Yếu tố                 | SQLite                                     | PostgreSQL                                 |
| ---------------------- | ------------------------------------------ | ------------------------------------------ |
| **Triển khai**         | Nhúng — không cần máy chủ riêng            | Cần thiết lập máy chủ                      |
| **Mã hóa**             | Tầng ứng dụng (AES-256-GCM)                | TDE tích hợp sẵn                           |
| **Hiệu năng**          | Nhanh hơn với khối lượng công việc nhỏ/vừa | Tốt hơn khi có lượng ghi đồng thời rất lớn |
| **Tính đồng thời**     | Chế độ WAL cho phép đọc đồng thời          | MVCC đầy đủ                                |
| **Sao lưu**            | Sao chép một tệp duy nhất                  | `pg_dump` hoặc ảnh chụp nhanh hệ thống tệp |
| **Trường hợp sử dụng** | Cài đặt theo từng người dùng, dạng nhúng   | SaaS đa đối tượng thuê                     |

Đối với các triển khai **một người dùng, một phiên bản** (trường hợp sử dụng chính của OmniRoute), SQLite đơn giản và nhanh hơn.

### Ghi nhật ký WAL

`core.ts` mở cơ sở dữ liệu ở **chế độ WAL (Write-Ahead Logging — ghi nhật ký trước)**:

```ts
// src/lib/db/core.ts
db.pragma("journal_mode = WAL");
db.pragma("busy_timeout = 2000");
db.pragma("synchronous = NORMAL");
db.pragma(`cache_size = -${DEFAULT_DATABASE_SETTINGS.optimization.cacheSize}`);
```

WAL cho phép **đọc đồng thời** trong khi ghi — điều này rất quan trọng đối với bảng điều khiển, vì bảng điều khiển thực hiện truy vấn trong lúc các yêu cầu đang được ghi lại.

Kích thước bộ nhớ đệm mặc định là **65.536 KiB (64 MiB)**. SQLite diễn giải giá trị âm của
`cache_size` là giới hạn trên xấp xỉ tính theo KiB và phân bổ các trang theo nhu cầu.
**Cài đặt > Hệ thống & Lưu trữ > Kích thước bộ nhớ đệm** chấp nhận các giá trị nguyên từ **1 đến
1.000.000 KiB**; khi lưu cài đặt, giá trị này được áp dụng cho kết nối cơ sở dữ liệu đang hoạt động,
và OmniRoute khôi phục giá trị đã lưu khi khởi động.

---

## Vị trí cơ sở dữ liệu

Tệp SQLite được lưu trữ tại:

| Hệ điều hành | Đường dẫn                                                   |
| ------------ | ----------------------------------------------------------- |
| Linux        | `~/.omniroute/storage.sqlite`                               |
| macOS        | `~/.omniroute/storage.sqlite`                               |
| Windows      | `%USERPROFILE%\.omniroute\storage.sqlite`                   |
| Docker       | `/app/data/storage.sqlite` (có thể cấu hình qua `DATA_DIR`) |

Các tệp và thư mục đi kèm:

- `storage.sqlite-wal` — nhật ký ghi trước
- `storage.sqlite-shm` — tệp bộ nhớ dùng chung
- `call_logs/` — các thành phần dữ liệu tải trọng của yêu cầu (nếu được bật)

**Ghi đè vị trí:**

```bash
DATA_DIR=/custom/path omniroute
```

---

## Kiến trúc mô-đun miền

Cơ sở dữ liệu của OmniRoute có **110 mô-đun TypeScript cấp cao nhất** trong `src/lib/db/`. Mỗi mô-đun miền:

- Sở hữu một hoặc nhiều bảng cụ thể
- Xuất các hàm CRUD có kiểu dữ liệu
- Không bao giờ truy cập các bảng của mô-đun khác
- Sử dụng `getDbInstance()` từ `core.ts` để truy cập DB

### 110 mô-đun DB cấp cao nhất

OmniRoute có **110 tệp TypeScript cấp cao nhất** trong `src/lib/db/`. Dưới đây là một số mô-đun cốt lõi tiêu biểu; hãy xem danh sách thư mục để biết danh sách đầy đủ:

| Mô-đun                  | Bảng                                                           | Trách nhiệm                                                                  |
| ----------------------- | -------------------------------------------------------------- | ---------------------------------------------------------------------------- |
| `providers.ts`          | `provider_connections`                                         | Đăng ký nhà cung cấp bằng OAuth/khóa API và quản lý thông tin xác thực       |
| `models.ts`             | `key_value` (dữ liệu mô hình)                                  | Định nghĩa mô hình, khả năng, giá cả                                         |
| `combos.ts`             | `combos`                                                       | Cấu hình định tuyến combo và thứ tự                                          |
| `apiKeys.ts`            | `api_keys`                                                     | Vòng đời khóa API, phạm vi quyền, theo dõi hạn ngạch                         |
| `settings.ts`           | `key_value`, `api_keys`, `combos`                              | Cấu hình hệ thống và kho KV dùng chung                                       |
| `backup.ts`             | —                                                              | Các thao tác xuất/nhập bản sao lưu                                           |
| `proxies.ts`            | `proxy_registry`, `proxy_assignments`, `provider_connections`  | Cấu hình proxy và quy tắc định tuyến                                         |
| `prompts.ts`            | `prompt_templates`                                             | Mẫu prompt có thể tái sử dụng, quản lý phiên bản                             |
| `webhooks.ts`           | `webhooks`                                                     | Đăng ký webhook hướng sự kiện và nhật ký                                     |
| `detailedLogs.ts`       | `request_detail_logs`                                          | Ghi nhật ký kiểm tra theo từng yêu cầu (tùy chọn, khối lượng lớn)            |
| `domainState.ts`        | `domain_*` (5 bảng)                                            | Ngân sách miền, bộ ngắt mạch, khóa truy cập, chuỗi dự phòng, lịch sử chi phí |
| `registeredKeys.ts`     | `registered_keys`, `account_key_limits`, `provider_key_limits` | Các khóa API trong danh sách cho phép dành cho MCP/A2A                       |
| `quotaSnapshots.ts`     | `quota_snapshots`                                              | Lịch sử sử dụng hạn ngạch                                                    |
| `modelComboMappings.ts` | `model_combo_mappings`                                         | Ánh xạ mô hình tới combo mặc định                                            |
| `cliToolState.ts`       | `cli_tool_state`                                               | Trạng thái bền vững dành riêng cho CLI                                       |
| `encryption.ts`         | —                                                              | Các hàm hỗ trợ mã hóa/giải mã trường                                         |
| `readCache.ts`          | —                                                              | Bộ nhớ đệm trong bộ nhớ dành cho các thao tác đọc nhiều                      |
| `secrets.ts`            | `key_value` (các mục được mã hóa)                              | Lưu trữ bí mật được mã hóa                                                   |
| `stateReset.ts`         | —                                                              | Xóa/đặt lại trạng thái DB để kiểm thử                                        |
| `contextHandoffs.ts`    | `context_handoffs`                                             | Ngữ cảnh phiên để chuyển giao tác nhân                                       |
| `usage*.ts`             | `usage_history`, `call_logs`, `proxy_logs`                     | Theo dõi mức sử dụng                                                         |
| `compression*.ts`       | `compression_settings`, `compression_combos`                   | Cấu hình nén                                                                 |

### Ranh giới mô-đun

Một quy tắc kiến trúc cốt lõi: **các mô-đun không truy cập trực tiếp vào bảng của nhau**. Để làm việc với dữ liệu của mô-đun khác, hãy nhập hàm từ mô-đun đó.

```ts
// ❌ SAI: SQL trực tiếp từ một mô-đun khác
db.prepare("SELECT * FROM provider_connections").all();

// ✅ ĐÚNG: sử dụng hàm của mô-đun providers
import { listProviders } from "@/lib/db/providers";
const providers = await listProviders();
```

Quy tắc này được thực thi thông qua quá trình đánh giá mã — không có cơ chế kiểm tra tĩnh, nhưng các vi phạm sẽ bị đánh dấu.

---

## Lược đồ cơ sở (17 bảng)

`core.ts` định nghĩa 17 bảng cơ sở trong `SCHEMA_SQL`. Các bảng này được tạo bởi migration `001_initial_schema.sql` và cấu thành lược đồ cốt lõi.

### Các bảng cốt lõi (được tạo trong migration ban đầu)

| Bảng                       | Mục đích                                    | Các cột chính                                                           |
| -------------------------- | ------------------------------------------- | ----------------------------------------------------------------------- |
| `provider_connections`     | Thông tin xác thực nhà cung cấp (đã mã hóa) | `id`, `provider`, `auth_type`, `api_key`, `is_active`                   |
| `provider_nodes`           | Thông tin định tuyến nút của nhà cung cấp   | `id`, `type`, `name`, `base_url`, `created_at`                          |
| `key_value`                | Kho lưu trữ KV dùng chung                   | `namespace`, `key`, `value`                                             |
| `combos`                   | Định nghĩa tổ hợp định tuyến                | `id`, `name`, `data`, `sort_order`                                      |
| `api_keys`                 | Khóa API cho gateway                        | `id`, `name`, `key`, `machine_id`, `allowed_models`                     |
| `db_meta`                  | Siêu dữ liệu cơ sở dữ liệu                  | `key`, `value`                                                          |
| `usage_history`            | Bản ghi mức sử dụng của yêu cầu             | `id`, `provider`, `model`, `tokens_input`, `tokens_output`, `timestamp` |
| `call_logs`                | Payload yêu cầu và phản hồi                 | `id`, `timestamp`, `status`, `model`, `provider`, `latency_ms`          |
| `proxy_logs`               | Nhật ký yêu cầu proxy                       | `id`, `timestamp`, `proxy_type`, `status`, `provider`                   |
| `domain_fallback_chains`   | Chuỗi ánh xạ mô hình đến nhà cung cấp       | `model`, `chain`                                                        |
| `domain_budgets`           | Ngân sách chi tiêu theo từng miền           | `api_key_id`, `daily_limit_usd`, `warning_threshold`, `reset_interval`  |
| `domain_budget_reset_logs` | Lịch sử đặt lại ngân sách                   | `id`, `api_key_id`, `reset_interval`, `previous_spend`, `reset_at`      |
| `domain_cost_history`      | Theo dõi chi phí theo từng miền             | `id`, `api_key_id`, `cost`, `timestamp`                                 |
| `domain_lockout_state`     | Trạng thái giới hạn tốc độ của miền         | `identifier`, `attempts`, `locked_until`                                |
| `domain_circuit_breakers`  | Trạng thái bộ ngắt mạch theo từng miền      | `name`, `state`, `failure_count`, `last_failure_time`                   |
| `semantic_cache`           | Bộ nhớ đệm phản hồi LLM                     | `id`, `signature`, `model`, `prompt_hash`, `response`                   |
| `quota_snapshots`          | Ảnh chụp hạn ngạch lịch sử                  | `id`, `provider`, `connection_id`, `window_key`, `remaining_percentage` |

### Các bảng bổ sung (được thêm bởi các migration sau)

Các migration tiếp theo bổ sung những bảng như:

- `cli_tool_state` (migration 011) — trạng thái công cụ CLI
- Các bảng `mcp_*` — kiểm tra máy chủ MCP
- Các bảng `a2a_*` — trạng thái tác vụ A2A
- Các bảng `usage_*` — theo dõi mức sử dụng
- Các bảng `plugin_*` — hệ thống plugin
- `skill_executions` — lịch sử thực thi kỹ năng
- Các bảng `memory_*` — hệ thống bộ nhớ
- Các bảng `compression_*` — hệ thống nén
- Các bảng `webhook_*` — nhật ký phân phối webhook
- Các bảng `acp_*` — Agent Client Protocol
- Các bảng `oneproxy_*` — chợ 1proxy
- `proxy_assignments` — liên kết phạm vi proxy
- `detailed_call_artifacts` — siêu dữ liệu artifact của nhật ký lệnh gọi
- `quota_alert_history` — lịch sử kiểm tra cảnh báo hạn ngạch
- `command_code_auth_sessions` — các phiên OAuth của Command Code

Danh sách đầy đủ gồm hơn 30 bảng nằm trong `src/lib/db/migrations/`.

---

## Di chuyển cơ sở dữ liệu

OmniRoute sử dụng **các migration có phiên bản và có tính lũy đẳng** trong `src/lib/db/migrations/`. Mỗi migration là một tệp SQL duy nhất có tên theo định dạng `NNN_description.sql`.

### Quy tắc đặt tên migration

```
001_initial_schema.sql
002_mcp_a2a_tables.sql
003_provider_node_custom_paths.sql
...
021_combo_call_log_targets.sql
```

### Cách migration được chạy

Khi khởi động, `migrationRunner.ts`:

1. Tạo bảng `_omniroute_migrations` nếu bảng chưa tồn tại
2. Truy vấn các migration đã được áp dụng
3. Áp dụng mọi migration mới theo thứ tự, mỗi migration trong một giao dịch
4. Ghi lại từng migration đã áp dụng cùng dấu thời gian

```ts
// src/lib/db/migrationRunner.ts (đã đơn giản hóa)
export async function runMigrations(db: SqliteDatabase, migrationsDir: string) {
  const applied = getAppliedMigrations(db);
  const available = readMigrationFiles(migrationsDir);

  for (const migration of available) {
    if (applied.includes(migration.id)) continue;
    db.transaction(() => {
      db.exec(migration.sql);
      recordAppliedMigration(db, migration.id);
    })();
  }
}
```

### Tính lũy đẳng

Các migration phải **có tính lũy đẳng** — chạy chúng hai lần sẽ không tạo ra thay đổi nào:

```sql
-- 004_proxy_registry.sql
CREATE TABLE IF NOT EXISTS proxy_registry (
  id TEXT PRIMARY KEY,
  host TEXT NOT NULL,
  port INTEGER NOT NULL,
  ...
);
```

Nên sử dụng rộng rãi các mệnh đề `IF NOT EXISTS`, `IF EXISTS` và `OR IGNORE` / `OR REPLACE`.

### Thêm migration mới

1. **Xác định số tiếp theo**: `ls src/lib/db/migrations/ | tail -1`
2. **Tạo tệp**: `NNN_my_change.sql`
3. **Sử dụng DDL an toàn**: `CREATE TABLE IF NOT EXISTS`, `ALTER TABLE ... ADD COLUMN`
4. **Điền dữ liệu bổ sung một cách cẩn thận**: sử dụng `UPDATE ... WHERE ...` để xử lý các hàng hiện có
5. **Kiểm thử trên một bản sao**: tuyệt đối không chạy các migration chưa được kiểm thử trên môi trường production

Ví dụ:

```sql
-- 022_add_combo_priority.sql
ALTER TABLE combos ADD COLUMN priority INTEGER DEFAULT 100;
UPDATE combos SET priority = 100 WHERE priority IS NULL;
CREATE INDEX IF NOT EXISTS idx_combos_priority ON combos(priority);
```

> **Các thay đổi không tương thích ngược** (ví dụ: xóa cột) rất phức tạp. OmniRoute KHÔNG hỗ trợ hạ cấp — sau khi một migration được áp dụng, thay đổi schema sẽ tồn tại vĩnh viễn. Hãy lập kế hoạch phù hợp.

---

## Mã hóa dữ liệu lưu trữ

Các trường nhạy cảm (khóa API, token OAuth, chuỗi kết nối) được mã hóa khi lưu trữ bằng **AES-256-GCM**.

### Cách hoạt động

```ts
// src/lib/db/encryption.ts (đã đơn giản hóa)
const key = deriveKeyFromPassphrase(passphrase, salt);
const iv = randomBytes(12);
const cipher = createCipheriv("aes-256-gcm", key, iv);
const encrypted = Buffer.concat([cipher.update(plaintext), cipher.final()]);
const authTag = cipher.getAuthTag();
return { encrypted, iv, authTag };
```

### Nơi áp dụng

- `provider_connections.api_key` — được mã hóa ở cấp ứng dụng
- `provider_connections.access_token`, `refresh_token`, `id_token` — được mã hóa ở cấp ứng dụng
- Các mục `key_value` có `namespace = "secrets"` — được mã hóa ở cấp ứng dụng
- `proxy_registry.auth` — được mã hóa ở cấp ứng dụng (nếu có)

### Khóa mã hóa

Khóa mã hóa được dẫn xuất từ một **cụm mật khẩu** (được thiết lập qua biến môi trường `STORAGE_ENCRYPTION_KEY`) và một **salt** (được lưu trong DB). Cả hai đều cần thiết để giải mã dữ liệu.

```bash
# Tạo một cụm mật khẩu an toàn
openssl rand -hex 32

# Thiết lập trong .env
STORAGE_ENCRYPTION_KEY=<your-key>
```

> **Quan trọng**: Việc làm mất khóa mã hóa đồng nghĩa với mất quyền truy cập vào toàn bộ dữ liệu đã mã hóa. **Hãy sao lưu khóa riêng biệt với cơ sở dữ liệu**.

### Những dữ liệu KHÔNG được mã hóa

Vì lý do hiệu năng, các dữ liệu sau được lưu dưới dạng văn bản thuần túy:

- Tên hiển thị của nhà cung cấp
- Định nghĩa mô hình (vốn đã công khai)
- Quy tắc định tuyến
- Bản ghi sử dụng (không chứa PII)

---

## Lưu ý về mã hóa (v3.8.16+)

OmniRoute sử dụng **`migrateLegacyEncryptedString()`** để xử lý hai cơ chế mã hóa một cách minh bạch:

- **Cũ** (trước v3.5.0): "mã hóa" dựa trên XOR (không phải mật mã thực sự)
- **Hiện tại**: AES-256-GCM với IV và thẻ xác thực phù hợp

Trình hỗ trợ di chuyển sẽ phát hiện định dạng cũ và mã hóa lại bằng cơ chế mới trong lần đọc đầu tiên. Điều này có nghĩa là bạn có thể nâng cấp cơ sở dữ liệu cũ mà không làm mất thông tin xác thực.

---

## Bộ nhớ đệm đọc

Đối với dữ liệu được đọc thường xuyên (mô hình, nhà cung cấp, cài đặt), `readCache.ts` cung cấp **bộ nhớ đệm trong bộ nhớ**:

```ts
// Được lưu vào bộ nhớ đệm khi khởi động, bị vô hiệu hóa khi ghi
const providers = await getCachedProviders(); // Nhanh, trong bộ nhớ
const fresh = await listProviders(); // Chậm, truy vấn DB
```

| Thực thể được lưu đệm  | Khóa bộ nhớ đệm | TTL             |
| ---------------------- | --------------- | --------------- |
| `models`               | `models:v1`     | Cho đến khi ghi |
| `provider_connections` | `providers:v1`  | Cho đến khi ghi |
| `settings`             | `settings:v1`   | Cho đến khi ghi |
| `combos`               | `combos:v1`     | Cho đến khi ghi |

Bộ nhớ đệm bị vô hiệu hóa mỗi khi có thao tác ghi vào bảng tương ứng.

---

## Sao lưu và khôi phục

### Sao lưu thủ công

```bash
# Sử dụng CLI để tạo bản sao lưu cục bộ
omniroute backup create --name pre-migration

# Hoặc thông qua API
curl -X PUT http://localhost:20128/api/db-backups \
  -H "Authorization: Bearer $MANAGEMENT_KEY" \
  -H "Content-Type: application/json" \
  -d '{"name": "pre-migration"}'
```

Tệp sao lưu bao gồm:

- Tất cả các bảng DB (được tuần tự hóa thành JSON)
- Các thành phần nhật ký cuộc gọi (được mã hóa base64, không bắt buộc)
- Cài đặt + thông tin bí mật (được mã hóa)
- Cấu hình plugin

### Khôi phục

```bash
# Thông qua CLI
omniroute restore pre-migration

# Thông qua API
curl -X POST http://localhost:20128/api/db-backups/restore \
  -H "Authorization: Bearer $MANAGEMENT_KEY" \
  -H "Content-Type: application/json" \
  -d '{"name": "pre-migration"}'
```

> **Cảnh báo**: Việc khôi phục sẽ ghi đè toàn bộ DB. Trước tiên, hãy dừng tất cả máy khách.

### Sao lưu tự động

```bash
# Bật sao lưu tự động hằng ngày thông qua CLI
omniroute backup auto enable --cron "0 2 * * *" --retention 7
```

Lịch biểu được thực thi ở phía máy chủ bởi một tác vụ nền chạy mỗi 30 giây
(mặc định) và đánh giá biểu thức cron theo giờ cục bộ của máy chủ.

| Biến                                        | Mặc định | Mô tả                                                                                                                              |
| ------------------------------------------- | -------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| `OMNIROUTE_BACKUP_SCHEDULE_JOB_INTERVAL_MS` | `30000`  | Khoảng thời gian giữa các lần chạy tính bằng ms (tối thiểu `5000`). Phải ngắn hơn 60 giây để khớp đúng phút cron một cách ổn định. |

### Sao lưu nóng SQLite

Để sao lưu DB đang hoạt động mà không cần thời gian ngừng dịch vụ:

```bash
sqlite3 ~/.omniroute/storage.sqlite ".backup /backups/omniroute-hot.db"
```

Lệnh này sử dụng API sao lưu trực tuyến của SQLite — có thể chạy an toàn trong khi OmniRoute đang hoạt động.

---

## Tinh chỉnh hiệu năng

### Chế độ WAL

WAL được bật theo mặc định. Đối với khối lượng công việc có nhiều thao tác ghi, hãy cân nhắc:

```sql
PRAGMA wal_autocheckpoint = 1000;  -- Tạo checkpoint sau mỗi 1000 trang
PRAGMA journal_size_limit = 67108864;  -- Giới hạn WAL ở mức 64MB
```

### Chỉ mục

Các chỉ mục quan trọng đối với hiệu năng (được migration tự động tạo):

- `idx_models_provider` — tra cứu mô hình theo nhà cung cấp
- `idx_combo_targets_combo_id` — mở rộng mục tiêu combo
- `idx_usage_history_api_key_timestamp` — phân tích mức sử dụng
- `idx_quota_snapshots_api_key_window` — theo dõi hạn ngạch
- `idx_call_logs_timestamp` — truy vấn nhật ký cuộc gọi

Để thêm một chỉ mục mới, hãy tạo một migration:

```sql
-- 023_add_my_index.sql
CREATE INDEX IF NOT EXISTS idx_my_table_my_column ON my_table(my_column);
```

### I/O ánh xạ bộ nhớ

Đối với cơ sở dữ liệu rất lớn (>10GB), có thể điều chỉnh ánh xạ bộ nhớ thông qua pragma của SQLite:

```sql
-- Thiết lập thông qua pragma của SQLite (điều chỉnh trong core.ts hoặc khi chạy)
PRAGMA mmap_size = 268435456;  -- 256MB
```

### Thu gọn

Các phiên bản OmniRoute chạy lâu dài sẽ được hưởng lợi từ việc thỉnh thoảng chạy `VACUUM`:

```bash
sqlite3 ~/.omniroute/storage.sqlite "VACUUM;"
```

Chạy hằng tháng trong các khoảng thời gian có lưu lượng thấp. (Chế độ WAL làm giảm nhu cầu này nhưng không loại bỏ hoàn toàn.)

---

## Kiểm tra tình trạng

`src/lib/db/healthCheck.ts` cung cấp **chẩn đoán tình trạng ở cấp độ CSDL**:

Cả hai phương thức đều yêu cầu xác thực (nếu không sẽ trả về `401`). `GET` chỉ chẩn đoán; `POST` chạy cùng một
quy trình kiểm tra với `autoRepair` được bật.

```bash
GET  /api/db/health   # chẩn đoán
POST /api/db/health   # chẩn đoán + sửa chữa
```

Phản hồi là `DbHealthCheckResult` do `runDbHealthCheck()` tạo ra
(`src/lib/db/healthCheck.ts`):

```json
{
  "isHealthy": false,
  "issues": [
    {
      "type": "broken_reference",
      "table": "domain_budgets",
      "description": "Ngân sách miền tham chiếu đến các khóa API không còn tồn tại.",
      "count": 2
    }
  ],
  "repairedCount": 0,
  "backupCreated": false,
  "autoRepair": false,
  "checkedAt": "2026-08-18T09:00:00.000Z",
  "driver": { "name": "better-sqlite3", "degraded": false }
}
```

| Trường            | Ý nghĩa                                                                                                                                                              |
| ----------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `isHealthy`       | Là `true` khi `issues` trống. `driver` không bao giờ ảnh hưởng đến giá trị này.                                                                                      |
| `issues[].type`   | Một trong các giá trị `integrity_check_failed`, `broken_reference`, `stale_snapshot`, `invalid_state`.                                                               |
| `repairedCount`   | Số hàng được sửa chữa trong lần chạy này; luôn là `0` khi `autoRepair` là false.                                                                                     |
| `backupCreated`   | Cho biết bản sao lưu có được tạo trước khi sửa chữa hay không.                                                                                                       |
| `checkedAt`       | Dấu thời gian ISO được dùng chung cho lần chạy và mọi ghi chú sửa chữa mà lần chạy đó ghi lại.                                                                       |
| `driver.name`     | Trình điều khiển SQLite phục vụ cơ sở dữ liệu được kiểm tra.                                                                                                         |
| `driver.degraded` | Là `true` khi các thao tác ghi không được lưu bền vững trong tệp cơ sở dữ liệu — phương án dự phòng WASM `sql.js` (lưu toàn bộ tệp) hoặc cơ sở dữ liệu trong bộ nhớ. |

Công cụ MCP `omniroute_db_health_check` cũng trả về cùng payload này.

Chạy `PRAGMA integrity_check` để phát hiện lỗi hỏng dữ liệu:

```bash
sqlite3 ~/.omniroute/storage.sqlite "PRAGMA integrity_check;"
# Kết quả nên là: ok
```

Nếu lệnh trả về bất kỳ nội dung nào khác `ok`, hãy **ngừng sử dụng cơ sở dữ liệu ngay lập tức** và khôi phục từ bản sao lưu.

---

## Khôi phục sau thảm họa

### Tình huống 1: Mất tệp WAL

Tệp `-wal` bị thiếu nhưng `-shm` và cơ sở dữ liệu chính vẫn còn nguyên vẹn:

```bash
# Tự động khôi phục ở lần mở tiếp theo
omniroute
```

Nếu SQLite không thể tự động khôi phục:

```bash
sqlite3 ~/.omniroute/storage.sqlite ".recover" > recovered.sql
sqlite3 recovered.db < recovered.sql
mv recovered.db ~/.omniroute/storage.sqlite
```

### Tình huống 2: Tệp cơ sở dữ liệu chính bị hỏng

Khôi phục từ bản sao lưu:

```bash
omniroute sync pull --merge   # hoặc: omniroute backup restore <backup-id>
```

### Tình huống 3: Mất khóa mã hóa

**Không thể khôi phục** nếu không có khóa. Không thể đọc được các trường đã mã hóa. Hãy thêm lại tất cả nhà cung cấp theo cách thủ công bằng thông tin xác thực mới.

> **Biện pháp giảm thiểu**: Luôn sao lưu khóa mã hóa riêng biệt, tốt nhất là trong trình quản lý mật khẩu hoặc KMS.

### Tình huống 4: Ổ đĩa đầy

SQLite sẽ trả về lỗi `SQLITE_FULL`. Hãy giải phóng dung lượng ổ đĩa, sau đó:

```bash
# Tạo checkpoint cho WAL để giải phóng dung lượng
sqlite3 ~/.omniroute/storage.sqlite "PRAGMA wal_checkpoint(TRUNCATE);"
```

---

## Các thao tác phổ biến

### Kiểm tra một bảng

```bash
sqlite3 ~/.omniroute/storage.sqlite "SELECT * FROM api_keys LIMIT 5;"
```

### Đếm số hàng trong tất cả các bảng

```bash
sqlite3 ~/.omniroute/storage.sqlite <<EOF
SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%';
EOF
```

### Đặt lại (xóa sạch) toàn bộ dữ liệu

```bash
# Trước tiên, dừng OmniRoute
omniroute stop

# Xóa tệp cơ sở dữ liệu
rm ~/.omniroute/storage.sqlite*

# Khởi động lại (sẽ tạo lại cơ sở dữ liệu trống)
omniroute
```

Để đặt lại **có chọn lọc** (giữ lại các nhà cung cấp, xóa dữ liệu sử dụng):

```bash
DELETE FROM usage_history WHERE timestamp < datetime('now', '-30 day');
DELETE FROM call_logs WHERE timestamp < datetime('now', '-30 day');
DELETE FROM proxy_logs WHERE timestamp < datetime('now', '-30 day');
```

### Xuất một bảng

```bash
sqlite3 ~/.omniroute/storage.sqlite <<EOF
.mode csv
.output api_keys.csv
SELECT * FROM api_keys;
EOF
```

---

## Khắc phục sự cố

### "Cơ sở dữ liệu bị khóa"

Một tiến trình khác đang giữ khóa ghi. Bạn có thể:

- Chờ tiến trình kia hoàn tất (kiểm tra bằng `lsof | grep storage.sqlite`)
- Chấm dứt tiến trình kia
- Nếu sự cố vẫn tiếp diễn, hãy khởi động lại OmniRoute

### "Ràng buộc khóa ngoại thất bại"

Một mô-đun miền đang vi phạm tính toàn vẹn tham chiếu. Hãy kiểm tra:

- Các hàng mồ côi trong những bảng phụ thuộc
- Các thao tác xóa theo tầng không được lan truyền
- Bản di chuyển gần đây đã thay đổi khóa ngoại

Chạy `PRAGMA foreign_key_check;` để tìm các vi phạm.

### "Hết bộ nhớ"

I/O ánh xạ bộ nhớ của SQLite đang vượt quá giới hạn của hệ điều hành. Giảm giới hạn bằng pragma của SQLite:

```sql
PRAGMA mmap_size = 134217728;  -- 128MB thay vì 256MB
```

Hoặc vô hiệu hóa:

```sql
PRAGMA mmap_size = 0;
```

### "Bản di chuyển thất bại giữa chừng"

Bản di chuyển được chạy trong một giao dịch, vì vậy lẽ ra nó đã được hoàn tác. Nếu không:

1. **Dừng OmniRoute** (ngăn các lần thử tiếp theo)
2. **Kiểm tra trạng thái cơ sở dữ liệu** bằng `sqlite3`
3. **Sửa thủ công** phần di chuyển chưa hoàn tất
4. **Chạy lại** OmniRoute (bản di chuyển sẽ được thử lại)

Để ngăn tình trạng này, luôn kiểm thử các bản di chuyển trên một bản sao trước.

---

## Xem thêm

- [USAGE_QUOTA_GUIDE.md](../guides/USAGE_QUOTA_GUIDE.md) — các bảng dữ liệu sử dụng
- [MONITORING_GUIDE.md](./MONITORING_GUIDE.md) — giám sát tình trạng hoạt động
- [RELEASE_CHECKLIST.md](./RELEASE_CHECKLIST.md) — quy trình phát hành
- Mã nguồn: `src/lib/db/` (hơn 80 tệp, khoảng 25 nghìn dòng mã)
