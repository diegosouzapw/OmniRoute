# Compliance & Audit (中文 (繁體))

🌐 **Languages:** 🇺🇸 [English](../../../../security/COMPLIANCE.md) · 🇪🇹 [am](../../../am/docs/security/COMPLIANCE.md) · 🇸🇦 [ar](../../../ar/docs/security/COMPLIANCE.md) · 🇦🇿 [az](../../../az/docs/security/COMPLIANCE.md) · 🇧🇬 [bg](../../../bg/docs/security/COMPLIANCE.md) · 🇧🇩 [bn](../../../bn/docs/security/COMPLIANCE.md) · 🇨🇿 [cs](../../../cs/docs/security/COMPLIANCE.md) · 🇩🇰 [da](../../../da/docs/security/COMPLIANCE.md) · 🇩🇪 [de](../../../de/docs/security/COMPLIANCE.md) · 🇬🇷 [el](../../../el/docs/security/COMPLIANCE.md) · 🇪🇸 [es](../../../es/docs/security/COMPLIANCE.md) · 🇪🇪 [et](../../../et/docs/security/COMPLIANCE.md) · 🇮🇷 [fa](../../../fa/docs/security/COMPLIANCE.md) · 🇫🇮 [fi](../../../fi/docs/security/COMPLIANCE.md) · 🇫🇷 [fr](../../../fr/docs/security/COMPLIANCE.md) · 🇮🇪 [ga](../../../ga/docs/security/COMPLIANCE.md) · 🇮🇳 [gu](../../../gu/docs/security/COMPLIANCE.md) · 🇳🇬 [ha](../../../ha/docs/security/COMPLIANCE.md) · 🇮🇱 [he](../../../he/docs/security/COMPLIANCE.md) · 🇮🇳 [hi](../../../hi/docs/security/COMPLIANCE.md) · 🇭🇷 [hr](../../../hr/docs/security/COMPLIANCE.md) · 🇭🇺 [hu](../../../hu/docs/security/COMPLIANCE.md) · 🇦🇲 [hy](../../../hy/docs/security/COMPLIANCE.md) · 🇮🇩 [id](../../../id/docs/security/COMPLIANCE.md) · 🇳🇬 [ig](../../../ig/docs/security/COMPLIANCE.md) · 🇮🇹 [it](../../../it/docs/security/COMPLIANCE.md) · 🇯🇵 [ja](../../../ja/docs/security/COMPLIANCE.md) · 🇬🇪 [ka](../../../ka/docs/security/COMPLIANCE.md) · 🇰🇭 [km](../../../km/docs/security/COMPLIANCE.md) · 🇮🇳 [kn](../../../kn/docs/security/COMPLIANCE.md) · 🇰🇷 [ko](../../../ko/docs/security/COMPLIANCE.md) · 🇱🇹 [lt](../../../lt/docs/security/COMPLIANCE.md) · 🇱🇻 [lv](../../../lv/docs/security/COMPLIANCE.md) · 🇮🇳 [ml](../../../ml/docs/security/COMPLIANCE.md) · 🇮🇳 [mr](../../../mr/docs/security/COMPLIANCE.md) · 🇲🇾 [ms](../../../ms/docs/security/COMPLIANCE.md) · 🇲🇹 [mt](../../../mt/docs/security/COMPLIANCE.md) · 🇲🇲 [my](../../../my/docs/security/COMPLIANCE.md) · 🇳🇵 [ne](../../../ne/docs/security/COMPLIANCE.md) · 🇳🇱 [nl](../../../nl/docs/security/COMPLIANCE.md) · 🇳🇴 [no](../../../no/docs/security/COMPLIANCE.md) · 🇮🇳 [or](../../../or/docs/security/COMPLIANCE.md) · 🇮🇳 [pa](../../../pa/docs/security/COMPLIANCE.md) · 🇵🇭 [phi](../../../phi/docs/security/COMPLIANCE.md) · 🇵🇱 [pl](../../../pl/docs/security/COMPLIANCE.md) · 🇵🇹 [pt](../../../pt/docs/security/COMPLIANCE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/COMPLIANCE.md) · 🇷🇴 [ro](../../../ro/docs/security/COMPLIANCE.md) · 🇷🇺 [ru](../../../ru/docs/security/COMPLIANCE.md) · 🇱🇰 [si](../../../si/docs/security/COMPLIANCE.md) · 🇸🇰 [sk](../../../sk/docs/security/COMPLIANCE.md) · 🇸🇮 [sl](../../../sl/docs/security/COMPLIANCE.md) · 🇷🇸 [sr](../../../sr/docs/security/COMPLIANCE.md) · 🇸🇪 [sv](../../../sv/docs/security/COMPLIANCE.md) · 🇰🇪 [sw](../../../sw/docs/security/COMPLIANCE.md) · 🇮🇳 [ta](../../../ta/docs/security/COMPLIANCE.md) · 🇮🇳 [te](../../../te/docs/security/COMPLIANCE.md) · 🇹🇭 [th](../../../th/docs/security/COMPLIANCE.md) · 🇹🇷 [tr](../../../tr/docs/security/COMPLIANCE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/COMPLIANCE.md) · 🇵🇰 [ur](../../../ur/docs/security/COMPLIANCE.md) · 🇺🇿 [uz](../../../uz/docs/security/COMPLIANCE.md) · 🇻🇳 [vi](../../../vi/docs/security/COMPLIANCE.md) · 🇳🇬 [yo](../../../yo/docs/security/COMPLIANCE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/COMPLIANCE.md)

---

> **事實來源：** `src/lib/compliance/`、`src/app/api/compliance/`
> **最後更新：** 2026-06-28 — v3.8.40

OmniRoute 會將管理操作、驗證事件、提供者憑證生命週期變更，以及 MCP 工具叫用記錄至由 SQLite 支援的稽核資料表。本頁說明會記錄哪些內容、資料的儲存位置、保留期限、API 金鑰如何選擇退出，以及如何查詢資料。

實作位於 `src/lib/compliance/index.ts`（T-43 —「合規控制」）與 `src/lib/compliance/providerAudit.ts`。稽核寫入絕不會擲出例外：發生任何失敗時，都會靜默忽略該次呼叫，以確保稽核記錄不會中斷主要請求流程。

## 記錄的內容

### 管理稽核事件（`audit_log`）

每次呼叫 `logAuditEvent({ action, actor, target, details, ... })` 都會產生一列記錄。動作字串遵循 `domain.verb`（或 `domain.verb.outcome`）模式。已確認存在於原始碼樹狀結構中的動作類型包括：

| 動作                                 | 來源                                    |
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

每筆項目都會擷取 `action`、`actor`（預設為 `"system"`）、`target`、`details`/`metadata`（JSON）、`ip_address`、`resource_type`、`status`、`request_id` 與 `timestamp`。敏感鍵值（`apiKey`、`accessToken`、`refreshToken`、`password`、任何符合 `*token`/`*secret`/`*apikey` 的項目等）會在資料列寫入前遞迴遮蔽為 `"[redacted]"`。

### MCP 工具呼叫（`mcp_tool_audit`）

每次 MCP 工具叫用都會透過 `open-sse/mcp-server/audit.ts` 寫入一列記錄。結構描述（來自 `src/lib/db/migrations/002_mcp_a2a_tables.sql`）：

| 欄位             | 說明                            |
| ---------------- | ------------------------------- |
| `id`             | 自動遞增                        |
| `tool_name`      | MCP 工具識別碼                  |
| `input_hash`     | 輸入的 sha256（不儲存承載資料） |
| `output_summary` | 簡短且經截斷的摘要              |
| `duration_ms`    | 實際經過時間                    |
| `api_key_id`     | 呼叫者（可為 null）             |
| `success`        | `1` / `0`                       |
| `error_code`     | 失敗時的終止錯誤代碼            |
| `created_at`     | ISO 時間戳記                    |

### 請求／使用量記錄

這些屬於營運遙測資料（嚴格來說並非管理稽核），但共用相同的保留流程：

- `usage_history` — 每個請求的使用量彙總
- `call_logs` — 每個請求的完整記錄（受資料列上限限制，請參閱下文）
- `proxy_logs` — Proxy 流量記錄（受資料列上限限制）
- `request_detail_logs` — 舊版詳細請求記錄（若存在仍會遭到清除）

## 儲存結構

`audit_log` 會在首次使用時，由 `ensureAuditLogSchema()` 延遲建立：

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

系統會在 `timestamp`、`action`、`actor`、`resource_type`、`status` 和 `request_id` 上建立索引。舊版資料庫中缺少的欄位會視需要透過 `ALTER TABLE` 新增。

## 保留與清理

系統會遵循兩個獨立的保留期限：

| 環境變數                    | 預設值   | 適用範圍                                                          |
| --------------------------- | -------- | ----------------------------------------------------------------- |
| `APP_LOG_RETENTION_DAYS`    | `7`      | `audit_log`、`mcp_tool_audit`                                     |
| `CALL_LOG_RETENTION_DAYS`   | `7`      | `usage_history`、`call_logs`、`proxy_logs`、`request_detail_logs` |
| `CALL_LOGS_TABLE_MAX_ROWS`  | `100000` | `call_logs` 的資料列數上限修剪                                    |
| `PROXY_LOGS_TABLE_MAX_ROWS` | `100000` | `proxy_logs` 的資料列數上限修剪                                   |

`cleanupExpiredLogs()` 會執行保留期限清理作業。伺服器啟動時，會從 `src/instrumentation-node.ts` 呼叫此函式。每次執行都會記錄一個 `compliance.cleanup` 稽核事件，其中包含各資料表的刪除筆數。Proxy/呼叫記錄的修剪會分批進行（`BATCH_SIZE = 5000`），以避免長時間的寫入鎖定。

手動清理請求歷程的作業與保留期限清理分開進行。「請求記錄」頁面會呼叫 `POST /api/settings/purge-request-history`，刪除 `call_logs`、舊版 `request_detail_logs`，以及 `${DATA_DIR}/call_logs/` 下的本機請求成品檔案。

預設值定義於 `src/lib/logEnv.ts`（`DEFAULT_APP_LOG_RETENTION_DAYS = 7`、`DEFAULT_CALL_LOG_RETENTION_DAYS = 7`）。

## `noLog` 選擇退出（依 API 金鑰）

API 金鑰可加上標記，使其下游呼叫流量不會被記錄。此標記儲存在 `api_keys` 資料表中（`no_log INTEGER DEFAULT 0`），並同步至記憶體內集合，以供關鍵路徑快速查詢。

```bash
# 建立不記錄日誌的金鑰（需要管理驗證）
curl -X POST http://localhost:20128/api/keys \
  -H "Cookie: auth_token=..." \
  -H "Content-Type: application/json" \
  -d '{"name": "Privacy key", "noLog": true}'
```

輔助函式（`src/lib/compliance/index.ts`）：

- `setNoLog(apiKeyId, true|false)` — 切換記憶體內項目
- `isNoLog(apiKeyId)` — 在請求路徑上檢查；若無結果，則改為讀取已快取 30 秒的 `api_keys.no_log`
- `NO_LOG_API_KEY_IDS`（環境變數，以逗號分隔）— 啟動時預先載入記憶體內集合；適用於無法直接切換該欄位的情況

管理稽核事件（登入、提供者變更、MCP 工具呼叫等）**不會**受到 `noLog` 影響；只有每次請求的流量記錄會被選擇退出。

## REST API

| 端點                        | 方法  | 說明                           | 驗證方式   |
| --------------------------- | ----- | ------------------------------ | ---------- |
| `/api/compliance/audit-log` | `GET` | 支援篩選與分頁的管理員稽核項目 | management |
| `/api/mcp/audit`            | `GET` | 支援分頁的 MCP 工具稽核項目    | (open-sse) |
| `/api/mcp/audit/stats`      | `GET` | 彙總的 MCP 稽核統計資料        | (open-sse) |

目前未提供 CSV 匯出端點——請從儀表板匯出，或直接查詢
SQLite 資料庫。

### 查詢 `/api/compliance/audit-log`

支援的查詢參數如下（全部皆為選填；所有文字篩選條件均使用 `LIKE %value%`
進行比對）：

- `action`、`actor`、`target`、`resourceType`（或 `resource_type`）、
  `status`、`requestId`（或 `request_id`）
- `from` / `since`、`to` / `until`——ISO 時間戳記
- `limit`（預設為 `50`，最小值為 `1`，最大值為 `500`）
- `offset`（預設為 `0`，最大值為 `10_000`）

回應為 JSON 陣列。分頁中繼資料會透過標頭傳回：
`x-total-count`、`x-page-limit`、`x-page-offset`。

```bash
curl "http://localhost:20128/api/compliance/audit-log?action=provider.credentials&from=2026-05-01" \
  -H "Cookie: auth_token=..."
```

## 儀表板

儀表板會在 **`/dashboard/audit`**
（`src/app/(dashboard)/dashboard/audit/page.tsx`）顯示稽核資料。此頁面有兩個分頁：

- **合規**（`ComplianceTab.tsx`）——來自
  `/api/compliance/audit-log` 的管理員稽核事件。可依事件類型、嚴重性（資訊 / 警告
  / 嚴重，由動作 + 狀態衍生）及日期範圍進行篩選。嚴重性會在
  用戶端根據動作／狀態字串計算。
- **MCP**（`McpAuditTab.tsx`）——來自 `/api/mcp/audit` 的 MCP 工具稽核資料，可
  依工具名稱及成功／失敗進行篩選。

兩個分頁皆採用分頁顯示，每頁筆數分別為 `50`（合規）與 `25`（MCP）。

## 提供者憑證輔助函式

`src/lib/compliance/providerAudit.ts` 提供資料塑形輔助函式，供
提供者管理路由在發出憑證事件時使用：

- `summarizeProviderConnectionForAudit(connection)`——在將連線快照寫入
  `details` 前，移除 `apiKey`、`accessToken`、`refreshToken`、`idToken`
  及 `providerSpecificData.consoleApiKey`。
- `getProviderAuditTarget(connection)`——為 `target` 欄位組合出穩定的
  `"<provider>:<name|id>"` 字串。
- `extractProviderWarnings(...payloads)`——掃描提供者回應中的
  政策／安全性警告（`[sanitizer]`、`prompt injection detected`、
  `content has been filtered`、`safety filter`、`policy violation`），並
  顯示最多 5 筆命中項目，每筆截斷為 400 個字元。

## 最佳實務

- 對於處理 PII（法律、醫療等）的 API 金鑰，請設定 `noLog: true`。
- 調整 `APP_LOG_RETENTION_DAYS` / `CALL_LOG_RETENTION_DAYS`，以符合您的
  保留政策。預設的 7 天設定較為保守。
- 依照合規計畫要求的頻率，將稽核資料表匯出至平台外部（`sqlite3 dump`）
  ——目前沒有內建的封存功能。
- 追蹤 `auth.login.failed` 與 `auth.login.locked` 的計數，以偵測暴力破解。
- 新增管理員端點時，請以穩定的 `domain.verb.outcome` 動作字串呼叫
  `logAuditEvent({ ... })`，並透過 `getAuditRequestContext(request)` 傳入
  請求內容，系統便會自動擷取 IP 與 `requestId`。

## 另請參閱

- [`docs/security/GUARDRAILS.md`](./GUARDRAILS.md) — PII 遮罩、提示注入
- [`docs/frameworks/MCP-SERVER.md`](../frameworks/MCP-SERVER.md) — MCP 工具目錄與範圍
- [`docs/reference/ENVIRONMENT.md`](../reference/ENVIRONMENT.md) — 完整的環境變數參考
- 原始碼：`src/lib/compliance/`、`src/app/api/compliance/`、
  `src/app/api/mcp/audit/`、`src/lib/logEnv.ts`
