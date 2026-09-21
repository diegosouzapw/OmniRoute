# Database Schema & Operations Guide (中文 (繁體))

🌐 **Languages:** 🇺🇸 [English](../../../../ops/DATABASE_GUIDE.md) · 🇪🇹 [am](../../../am/docs/ops/DATABASE_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/ops/DATABASE_GUIDE.md) · 🇦🇿 [az](../../../az/docs/ops/DATABASE_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/ops/DATABASE_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/ops/DATABASE_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/ops/DATABASE_GUIDE.md) · 🇩🇰 [da](../../../da/docs/ops/DATABASE_GUIDE.md) · 🇩🇪 [de](../../../de/docs/ops/DATABASE_GUIDE.md) · 🇬🇷 [el](../../../el/docs/ops/DATABASE_GUIDE.md) · 🇪🇸 [es](../../../es/docs/ops/DATABASE_GUIDE.md) · 🇪🇪 [et](../../../et/docs/ops/DATABASE_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/ops/DATABASE_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/ops/DATABASE_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/ops/DATABASE_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/ops/DATABASE_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/ops/DATABASE_GUIDE.md) · 🇮🇱 [he](../../../he/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/ops/DATABASE_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/ops/DATABASE_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/ops/DATABASE_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/ops/DATABASE_GUIDE.md) · 🇮🇩 [id](../../../id/docs/ops/DATABASE_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/ops/DATABASE_GUIDE.md) · 🇮🇹 [it](../../../it/docs/ops/DATABASE_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/ops/DATABASE_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/ops/DATABASE_GUIDE.md) · 🇰🇭 [km](../../../km/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/ops/DATABASE_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/ops/DATABASE_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/ops/DATABASE_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/ops/DATABASE_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/ops/DATABASE_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/ops/DATABASE_GUIDE.md) · 🇲🇲 [my](../../../my/docs/ops/DATABASE_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/ops/DATABASE_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/ops/DATABASE_GUIDE.md) · 🇳🇴 [no](../../../no/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [or](../../../or/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/ops/DATABASE_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/ops/DATABASE_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/ops/DATABASE_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/ops/DATABASE_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/DATABASE_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/ops/DATABASE_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/ops/DATABASE_GUIDE.md) · 🇱🇰 [si](../../../si/docs/ops/DATABASE_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/ops/DATABASE_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/ops/DATABASE_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/ops/DATABASE_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/ops/DATABASE_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [te](../../../te/docs/ops/DATABASE_GUIDE.md) · 🇹🇭 [th](../../../th/docs/ops/DATABASE_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/ops/DATABASE_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/DATABASE_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/ops/DATABASE_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/ops/DATABASE_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/ops/DATABASE_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/ops/DATABASE_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/DATABASE_GUIDE.md)

---

> **TL;DR**：OmniRoute 使用啟用 **WAL 日誌記錄**的 **SQLite** 作為主要儲存區，並以 **AES-256-GCM** 對靜態儲存的敏感欄位進行加密。本指南涵蓋結構描述、遷移、備份／復原及維運操作手冊。

**來源：**

- `src/lib/db/core.ts` — 單例 + SCHEMA_SQL（17 個基礎資料表）
- `src/lib/db/migrationRunner.ts` — 版本化遷移
- `src/lib/db/migrations/` — 167 個版本化 SQL 檔案
- `src/lib/db/encryption.ts` — 加密輔助函式
- `src/lib/db/backup.ts` — 備份匯出／匯入
- `src/lib/db/healthCheck.ts` — 健康狀態診斷

---

## 為什麼選擇 SQLite？

OmniRoute 選擇 SQLite 而非 PostgreSQL/MySQL，原因如下：

| 因素         | SQLite                      | PostgreSQL               |
| ------------ | --------------------------- | ------------------------ |
| **部署**     | 內嵌式 — 不需要獨立伺服器   | 需要設定伺服器           |
| **加密**     | 應用程式層級（AES-256-GCM） | 內建 TDE                 |
| **效能**     | 對小型／中型工作負載更快    | 更適合大量並行寫入       |
| **並行處理** | WAL 模式允許並行讀取        | 完整 MVCC                |
| **備份**     | 複製單一檔案                | `pg_dump` 或檔案系統快照 |
| **使用案例** | 每位使用者個別安裝、內嵌式  | 多租戶 SaaS              |

對於**單一使用者、單一執行個體**的部署（OmniRoute 的主要使用案例），SQLite 更簡單也更快速。

### WAL 日誌記錄

`core.ts` 會使用 **WAL（預寫式日誌，Write-Ahead Logging）模式**開啟資料庫：

```ts
// src/lib/db/core.ts
db.pragma("journal_mode = WAL");
db.pragma("busy_timeout = 2000");
db.pragma("synchronous = NORMAL");
db.pragma(`cache_size = -${DEFAULT_DATABASE_SETTINGS.optimization.cacheSize}`);
```

WAL 允許在寫入期間進行**並行讀取**，這對儀表板非常重要，因為它會在記錄請求的同時執行查詢。

預設快取大小為 **65,536 KiB（64 MiB）**。SQLite 會將負數
`cache_size` 解讀為以 KiB 為單位的近似上限，並依需求配置頁面。
**設定 > 系統與儲存空間 > 快取大小**接受 **1 至
1,000,000 KiB** 的整數值；儲存設定後會將其套用至即時資料庫連線，
而 OmniRoute 會在啟動時還原已保存的值。

---

## 資料庫位置

SQLite 檔案儲存於：

| 作業系統 | 路徑                                                 |
| -------- | ---------------------------------------------------- |
| Linux    | `~/.omniroute/storage.sqlite`                        |
| macOS    | `~/.omniroute/storage.sqlite`                        |
| Windows  | `%USERPROFILE%\.omniroute\storage.sqlite`            |
| Docker   | `/app/data/storage.sqlite`（可透過 `DATA_DIR` 設定） |

附屬檔案：

- `storage.sqlite-wal` — 預寫式日誌
- `storage.sqlite-shm` — 共用記憶體檔案
- `call_logs/` — 請求承載資料成品（若已啟用）

**覆寫位置：**

```bash
DATA_DIR=/custom/path omniroute
```

---

## 網域模組架構

OmniRoute 的資料庫在 `src/lib/db/` 中有 **110 個頂層 TypeScript 模組**。每個網域模組：

- 擁有一個或多個特定資料表
- 匯出具類型的 CRUD 函式
- 絕不存取其他模組的資料表
- 使用來自 `core.ts` 的 `getDbInstance()` 存取資料庫

### 110 個頂層資料庫模組

OmniRoute 在 `src/lib/db/` 中有 **110 個頂層 TypeScript 檔案**。以下列出部分核心模組；完整清單請參閱目錄內容：

| 模組                    | 資料表                                                         | 職責                                     |
| ----------------------- | -------------------------------------------------------------- | ---------------------------------------- |
| `providers.ts`          | `provider_connections`                                         | OAuth/API 金鑰提供者註冊與憑證管理       |
| `models.ts`             | `key_value`（模型資料）                                        | 模型定義、能力與定價                     |
| `combos.ts`             | `combos`                                                       | 組合路由設定與排序                       |
| `apiKeys.ts`            | `api_keys`                                                     | API 金鑰生命週期、作用域與配額追蹤       |
| `settings.ts`           | `key_value`, `api_keys`, `combos`                              | 系統設定與共用 KV 儲存區                 |
| `backup.ts`             | —                                                              | 備份匯出／匯入作業                       |
| `proxies.ts`            | `proxy_registry`, `proxy_assignments`, `provider_connections`  | Proxy 設定與路由規則                     |
| `prompts.ts`            | `prompt_templates`                                             | 可重複使用的提示詞範本與版本控制         |
| `webhooks.ts`           | `webhooks`                                                     | 事件驅動的 Webhook 訂閱與日誌            |
| `detailedLogs.ts`       | `request_detail_logs`                                          | 逐請求稽核記錄（選用，高資料量）         |
| `domainState.ts`        | `domain_*`（5 個資料表）                                       | 網域預算、斷路器、鎖定、備援鏈與成本歷程 |
| `registeredKeys.ts`     | `registered_keys`, `account_key_limits`, `provider_key_limits` | MCP/A2A 的白名單 API 金鑰                |
| `quotaSnapshots.ts`     | `quota_snapshots`                                              | 歷史配額用量                             |
| `modelComboMappings.ts` | `model_combo_mappings`                                         | 將模型對應至預設組合                     |
| `cliToolState.ts`       | `cli_tool_state`                                               | CLI 專用持久化狀態                       |
| `encryption.ts`         | —                                                              | 用於加密／解密欄位的輔助工具             |
| `readCache.ts`          | —                                                              | 供大量讀取作業使用的記憶體內快取         |
| `secrets.ts`            | `key_value`（加密項目）                                        | 加密的機密資料儲存                       |
| `stateReset.ts`         | —                                                              | 清除／重設資料庫狀態以進行測試           |
| `contextHandoffs.ts`    | `context_handoffs`                                             | 代理交接的工作階段上下文                 |
| `usage*.ts`             | `usage_history`, `call_logs`, `proxy_logs`                     | 用量追蹤                                 |
| `compression*.ts`       | `compression_settings`, `compression_combos`                   | 壓縮設定                                 |

### 模組邊界

核心架構規則：**模組不得直接存取彼此的資料表**。若要使用另一個模組的資料，請從該模組匯入相關函式。

```ts
// ❌ 錯誤：直接對另一個模組執行 SQL
db.prepare("SELECT * FROM provider_connections").all();

// ✅ 正確：使用 providers 模組的函式
import { listProviders } from "@/lib/db/providers";
const providers = await listProviders();
```

此規則透過程式碼審查來強制執行——目前沒有靜態檢查，但違規情況會被標記。

---

## 基礎結構描述（17 個資料表）

`core.ts` 在 `SCHEMA_SQL` 中定義了 17 個基礎資料表。這些資料表由遷移 `001_initial_schema.sql` 建立，並構成核心結構描述。

### 核心資料表（於初始遷移中建立）

| 資料表                     | 用途                 | 主要欄位                                                                |
| -------------------------- | -------------------- | ----------------------------------------------------------------------- |
| `provider_connections`     | 提供者憑證（已加密） | `id`、`provider`、`auth_type`、`api_key`、`is_active`                   |
| `provider_nodes`           | 提供者節點路由資訊   | `id`、`type`、`name`、`base_url`、`created_at`                          |
| `key_value`                | 通用 KV 儲存區       | `namespace`、`key`、`value`                                             |
| `combos`                   | 路由組合定義         | `id`、`name`、`data`、`sort_order`                                      |
| `api_keys`                 | 閘道的 API 金鑰      | `id`、`name`、`key`、`machine_id`、`allowed_models`                     |
| `db_meta`                  | 資料庫中繼資料       | `key`、`value`                                                          |
| `usage_history`            | 請求用量記錄         | `id`、`provider`、`model`、`tokens_input`、`tokens_output`、`timestamp` |
| `call_logs`                | 請求承載資料與回應   | `id`、`timestamp`、`status`、`model`、`provider`、`latency_ms`          |
| `proxy_logs`               | Proxy 請求日誌       | `id`、`timestamp`、`proxy_type`、`status`、`provider`                   |
| `domain_fallback_chains`   | 模型至提供者的鏈結   | `model`、`chain`                                                        |
| `domain_budgets`           | 各網域的支出預算     | `api_key_id`、`daily_limit_usd`、`warning_threshold`、`reset_interval`  |
| `domain_budget_reset_logs` | 預算重設歷程         | `id`、`api_key_id`、`reset_interval`、`previous_spend`、`reset_at`      |
| `domain_cost_history`      | 各網域的成本追蹤     | `id`、`api_key_id`、`cost`、`timestamp`                                 |
| `domain_lockout_state`     | 網域速率限制狀態     | `identifier`、`attempts`、`locked_until`                                |
| `domain_circuit_breakers`  | 各網域的斷路器狀態   | `name`、`state`、`failure_count`、`last_failure_time`                   |
| `semantic_cache`           | LLM 回應快取         | `id`、`signature`、`model`、`prompt_hash`、`response`                   |
| `quota_snapshots`          | 歷史配額快照         | `id`、`provider`、`connection_id`、`window_key`、`remaining_percentage` |

### 額外資料表（由後續遷移新增）

後續遷移會新增以下資料表：

- `cli_tool_state`（遷移 011）— CLI 工具狀態
- `mcp_*` 資料表 — MCP 伺服器稽核
- `a2a_*` 資料表 — A2A 任務狀態
- `usage_*` 資料表 — 用量追蹤
- `plugin_*` 資料表 — 外掛系統
- `skill_executions` — 技能執行歷程
- `memory_*` 資料表 — 記憶系統
- `compression_*` 資料表 — 壓縮系統
- `webhook_*` 資料表 — Webhook 傳遞日誌
- `acp_*` 資料表 — Agent Client Protocol
- `oneproxy_*` 資料表 — 1proxy 市集
- `proxy_assignments` — Proxy 範圍繫結
- `detailed_call_artifacts` — 呼叫日誌成品中繼資料
- `quota_alert_history` — 配額警示稽核
- `command_code_auth_sessions` — Command Code OAuth 工作階段

約 30 多個資料表的完整清單位於 `src/lib/db/migrations/`。

---

## 遷移

OmniRoute 在 `src/lib/db/migrations/` 中使用**具版本且具冪等性的遷移**。每個遷移都是單一 SQL 檔案，命名格式為 `NNN_description.sql`。

### 遷移命名

```
001_initial_schema.sql
002_mcp_a2a_tables.sql
003_provider_node_custom_paths.sql
...
021_combo_call_log_targets.sql
```

### 遷移如何執行

啟動時，`migrationRunner.ts` 會：

1. 若 `_omniroute_migrations` 資料表不存在，則建立該資料表
2. 查詢已套用的遷移
3. 依序套用所有新的遷移，每個遷移都在一個交易中執行
4. 記錄每個已套用的遷移及其時間戳記

```ts
// src/lib/db/migrationRunner.ts（簡化版）
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

### 冪等性

遷移必須具備**冪等性**——執行兩次時，第二次應不會產生任何作用：

```sql
-- 004_proxy_registry.sql
CREATE TABLE IF NOT EXISTS proxy_registry (
  id TEXT PRIMARY KEY,
  host TEXT NOT NULL,
  port INTEGER NOT NULL,
  ...
);
```

請善用 `IF NOT EXISTS`、`IF EXISTS` 以及 `OR IGNORE` / `OR REPLACE` 子句。

### 新增遷移

1. **確認下一個編號**：`ls src/lib/db/migrations/ | tail -1`
2. **建立檔案**：`NNN_my_change.sql`
3. **使用安全的 DDL**：`CREATE TABLE IF NOT EXISTS`、`ALTER TABLE ... ADD COLUMN`
4. **謹慎回填資料**：使用 `UPDATE ... WHERE ...` 處理既有資料列
5. **在副本上測試**：切勿在正式環境執行未經測試的遷移

範例：

```sql
-- 022_add_combo_priority.sql
ALTER TABLE combos ADD COLUMN priority INTEGER DEFAULT 100;
UPDATE combos SET priority = 100 WHERE priority IS NULL;
CREATE INDEX IF NOT EXISTS idx_combos_priority ON combos(priority);
```

> **不向後相容的變更**（例如刪除欄位）較難處理。OmniRoute 不支援降級——遷移一經套用，結構描述變更即為永久性。請據此妥善規劃。

---

## 靜態資料加密

敏感欄位（API 金鑰、OAuth 權杖、連線字串）使用 **AES-256-GCM** 進行靜態資料加密。

### 運作方式

```ts
// src/lib/db/encryption.ts（簡化版）
const key = deriveKeyFromPassphrase(passphrase, salt);
const iv = randomBytes(12);
const cipher = createCipheriv("aes-256-gcm", key, iv);
const encrypted = Buffer.concat([cipher.update(plaintext), cipher.final()]);
const authTag = cipher.getAuthTag();
return { encrypted, iv, authTag };
```

### 使用位置

- `provider_connections.api_key`——在應用程式層級加密
- `provider_connections.access_token`、`refresh_token`、`id_token`——在應用程式層級加密
- `namespace = "secrets"` 的 `key_value` 項目——在應用程式層級加密
- `proxy_registry.auth`——若存在，則在應用程式層級加密

### 加密金鑰

加密金鑰由**通關密語**（透過 `STORAGE_ENCRYPTION_KEY` 環境變數設定）和**鹽值**（儲存在資料庫中）衍生而來。解密資料時，兩者缺一不可。

```bash
# 產生安全的通關密語
openssl rand -hex 32

# 在 .env 中設定
STORAGE_ENCRYPTION_KEY=<your-key>
```

> **重要**：遺失加密金鑰即表示無法再存取所有加密資料。**請將金鑰與資料庫分開備份**。

### 未加密的內容

基於效能考量，以下內容會以純文字儲存：

- 提供者顯示名稱
- 模型定義（已是公開資訊）
- 路由規則
- 使用量記錄（不含個人識別資訊）

---

## 加密注意事項 (v3.8.16+)

OmniRoute 使用 **`migrateLegacyEncryptedString()`** 透明地處理兩種加密方案：

- **舊版**（v3.5.0 之前）：基於 XOR 的「加密」（並非真正的密碼學加密）
- **目前版本**：使用正確 IV 與驗證標籤的 AES-256-GCM

遷移輔助工具會偵測舊版格式，並在首次讀取時使用新方案重新加密。這表示您可以升級舊資料庫而不會遺失憑證。

---

## 讀取快取

對於經常讀取的資料（模型、提供者、設定），`readCache.ts` 提供了**記憶體內快取**：

```ts
// 啟動時快取，寫入時使其失效
const providers = await getCachedProviders(); // 快速，記憶體內
const fresh = await listProviders(); // 緩慢，存取資料庫
```

| 快取實體               | 快取鍵         | TTL        |
| ---------------------- | -------------- | ---------- |
| `models`               | `models:v1`    | 直到寫入時 |
| `provider_connections` | `providers:v1` | 直到寫入時 |
| `settings`             | `settings:v1`  | 直到寫入時 |
| `combos`               | `combos:v1`    | 直到寫入時 |

每次寫入對應的資料表時，快取都會失效。

---

## 備份與復原

### 手動備份

```bash
# 使用 CLI 建立本機備份
omniroute backup create --name pre-migration

# 或透過 API
curl -X PUT http://localhost:20128/api/db-backups \
  -H "Authorization: Bearer $MANAGEMENT_KEY" \
  -H "Content-Type: application/json" \
  -d '{"name": "pre-migration"}'
```

備份檔案包含：

- 所有資料庫資料表（序列化為 JSON）
- 呼叫記錄成品（使用 base64 編碼，可選）
- 設定 + 密鑰（已加密）
- 外掛程式組態

### 還原

```bash
# 透過 CLI
omniroute restore pre-migration

# 透過 API
curl -X POST http://localhost:20128/api/db-backups/restore \
  -H "Authorization: Bearer $MANAGEMENT_KEY" \
  -H "Content-Type: application/json" \
  -d '{"name": "pre-migration"}'
```

> **警告**：還原會覆寫整個資料庫。請先停止所有用戶端。

### 自動備份

```bash
# 透過 CLI 啟用每日自動備份
omniroute backup auto enable --cron "0 2 * * *" --retention 7
```

排程由伺服器端的背景工作執行，該工作預設每 30 秒觸發一次，並根據本機伺服器時間評估 cron 運算式。

| 變數                                        | 預設值  | 說明                                                                                          |
| ------------------------------------------- | ------- | --------------------------------------------------------------------------------------------- |
| `OMNIROUTE_BACKUP_SCHEDULE_JOB_INTERVAL_MS` | `30000` | 觸發間隔，以毫秒為單位（最小值為 `5000`）。必須短於 60 秒，才能可靠地落在符合 cron 的分鐘內。 |

### SQLite 熱備份

若要在不停機的情況下備份即時資料庫：

```bash
sqlite3 ~/.omniroute/storage.sqlite ".backup /backups/omniroute-hot.db"
```

這會使用 SQLite 的線上備份 API——可在 OmniRoute 執行期間安全運行。

---

## 效能調校

### WAL 模式

WAL 預設為啟用。對於大量寫入的工作負載，請考慮：

```sql
PRAGMA wal_autocheckpoint = 1000;  -- 每 1000 個頁面執行一次檢查點
PRAGMA journal_size_limit = 67108864;  -- WAL 上限為 64MB
```

### 索引

提升效能的關鍵索引（由遷移自動建立）：

- `idx_models_provider` — 依提供者查詢模型
- `idx_combo_targets_combo_id` — 展開組合目標
- `idx_usage_history_api_key_timestamp` — 使用情況分析
- `idx_quota_snapshots_api_key_window` — 配額追蹤
- `idx_call_logs_timestamp` — 呼叫記錄查詢

若要新增索引，請建立遷移：

```sql
-- 023_add_my_index.sql
CREATE INDEX IF NOT EXISTS idx_my_table_my_column ON my_table(my_column);
```

### 記憶體映射 I/O

對於非常大的資料庫（>10GB），可透過 SQLite pragma 調整記憶體映射：

```sql
-- 透過 SQLite pragma 設定（在 core.ts 或執行階段中調整）
PRAGMA mmap_size = 268435456;  -- 256MB
```

### 壓縮

長時間執行的 OmniRoute 執行個體可受益於偶爾執行 `VACUUM`：

```bash
sqlite3 ~/.omniroute/storage.sqlite "VACUUM;"
```

請每月在低流量時段執行。（WAL 模式可降低此需求，但無法完全消除。）

---

## 健康狀態檢查

`src/lib/db/healthCheck.ts` 提供**資料庫層級的健康狀態診斷**：

這兩種 HTTP 動詞都需要驗證（否則傳回 `401`）。`GET` 僅執行診斷；`POST` 則執行相同的檢查，並啟用 `autoRepair`。

```bash
GET  /api/db/health   # 診斷
POST /api/db/health   # 診斷並修復
```

回應是由 `runDbHealthCheck()` 產生的 `DbHealthCheckResult`
（`src/lib/db/healthCheck.ts`）：

```json
{
  "isHealthy": false,
  "issues": [
    {
      "type": "broken_reference",
      "table": "domain_budgets",
      "description": "網域預算參照了已不存在的 API 金鑰。",
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

| 欄位              | 含義                                                                                                                 |
| ----------------- | -------------------------------------------------------------------------------------------------------------------- |
| `isHealthy`       | 當 `issues` 為空時為 `true`。`driver` 絕不會影響此值。                                                               |
| `issues[].type`   | `integrity_check_failed`、`broken_reference`、`stale_snapshot`、`invalid_state` 其中之一。                           |
| `repairedCount`   | 此次執行期間修復的資料列數；當 `autoRepair` 為 false 時一律為 `0`。                                                  |
| `backupCreated`   | 是否在修復前建立了備份。                                                                                             |
| `checkedAt`       | 此次執行與其寫入的任何修復註記共用的 ISO 時間戳記。                                                                  |
| `driver.name`     | 為受檢查資料庫提供服務的 SQLite 驅動程式。                                                                           |
| `driver.degraded` | 當寫入內容未由資料庫檔案提供持久性儲存時為 `true`——即使用 `sql.js` WASM 後備方案（整個檔案持久化）或記憶體內資料庫。 |

`omniroute_db_health_check` MCP 工具會傳回相同的酬載。

執行 `PRAGMA integrity_check` 以偵測損毀：

```bash
sqlite3 ~/.omniroute/storage.sqlite "PRAGMA integrity_check;"
# 應輸出：ok
```

如果傳回 `ok` 以外的任何內容，請**立即停止使用該資料庫**，並從備份還原。

---

## 災難復原

### 情境 1：WAL 檔案遺失

`-wal` 檔案遺失，但 `-shm` 與主資料庫仍完好：

```bash
# 下次開啟時會自動復原
omniroute
```

如果 SQLite 無法自動復原：

```bash
sqlite3 ~/.omniroute/storage.sqlite ".recover" > recovered.sql
sqlite3 recovered.db < recovered.sql
mv recovered.db ~/.omniroute/storage.sqlite
```

### 情境 2：主資料庫檔案損毀

從備份還原：

```bash
omniroute sync pull --merge   # 或：omniroute backup restore <backup-id>
```

### 情境 3：加密金鑰遺失

沒有金鑰就**無法復原**。加密欄位將無法讀取。請使用新的憑證，手動重新新增所有提供者。

> **緩解措施**：務必另外備份加密金鑰，最好將其儲存在密碼管理器或 KMS 中。

### 情境 4：磁碟已滿

SQLite 將傳回 `SQLITE_FULL` 錯誤。釋放磁碟空間，然後執行：

```bash
# 對 WAL 執行檢查點操作以釋放空間
sqlite3 ~/.omniroute/storage.sqlite "PRAGMA wal_checkpoint(TRUNCATE);"
```

---

## 常見操作

### 檢視資料表

```bash
sqlite3 ~/.omniroute/storage.sqlite "SELECT * FROM api_keys LIMIT 5;"
```

### 計算所有資料表的資料列數量

```bash
sqlite3 ~/.omniroute/storage.sqlite <<EOF
SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%';
EOF
```

### 重設（清除）所有資料

```bash
# 先停止 OmniRoute
omniroute stop

# 刪除資料庫檔案
rm ~/.omniroute/storage.sqlite*

# 重新啟動（將重新建立空白資料庫）
omniroute
```

若要進行**選擇性**重設（保留提供者、清除使用量資料）：

```bash
DELETE FROM usage_history WHERE timestamp < datetime('now', '-30 day');
DELETE FROM call_logs WHERE timestamp < datetime('now', '-30 day');
DELETE FROM proxy_logs WHERE timestamp < datetime('now', '-30 day');
```

### 匯出單一資料表

```bash
sqlite3 ~/.omniroute/storage.sqlite <<EOF
.mode csv
.output api_keys.csv
SELECT * FROM api_keys;
EOF
```

---

## 疑難排解

### 「資料庫已被鎖定」

另一個程序持有寫入鎖定。您可以：

- 等待其他程序完成（使用 `lsof | grep storage.sqlite` 檢查）
- 終止其他程序
- 如果問題持續發生，請重新啟動 OmniRoute

### 「外部索引鍵條件約束失敗」

某個領域模組違反了參照完整性。請檢查：

- 相依資料表中的孤立資料列
- 未正確傳播的串聯刪除
- 最近變更外部索引鍵的遷移

執行 `PRAGMA foreign_key_check;` 以找出違規項目。

### 「記憶體不足」

SQLite 的記憶體映射 I/O 超出作業系統限制。請透過 SQLite pragma 降低其大小：

```sql
PRAGMA mmap_size = 134217728;  -- 使用 128MB，而非 256MB
```

或將其停用：

```sql
PRAGMA mmap_size = 0;
```

### 「遷移執行到一半失敗」

遷移是在交易中執行，因此應已回復。如果沒有：

1. **停止 OmniRoute**（防止進一步嘗試）
2. **使用 `sqlite3` 檢查資料庫狀態**
3. **手動修正**未完成的遷移
4. **重新執行** OmniRoute（將重試遷移）

為避免此問題，請一律先在副本上測試遷移。

---

## 另請參閱

- [USAGE_QUOTA_GUIDE.md](../guides/USAGE_QUOTA_GUIDE.md) — 使用量資料表
- [MONITORING_GUIDE.md](./MONITORING_GUIDE.md) — 健全狀況監控
- [RELEASE_CHECKLIST.md](./RELEASE_CHECKLIST.md) — 發布流程
- 原始碼：`src/lib/db/`（80+ 個檔案，約 25K 行程式碼）
