# Compliance & Audit (中文 (简体))

🌐 **Languages:** 🇺🇸 [English](../../../../security/COMPLIANCE.md) · 🇪🇹 [am](../../../am/docs/security/COMPLIANCE.md) · 🇸🇦 [ar](../../../ar/docs/security/COMPLIANCE.md) · 🇦🇿 [az](../../../az/docs/security/COMPLIANCE.md) · 🇧🇬 [bg](../../../bg/docs/security/COMPLIANCE.md) · 🇧🇩 [bn](../../../bn/docs/security/COMPLIANCE.md) · 🇨🇿 [cs](../../../cs/docs/security/COMPLIANCE.md) · 🇩🇰 [da](../../../da/docs/security/COMPLIANCE.md) · 🇩🇪 [de](../../../de/docs/security/COMPLIANCE.md) · 🇬🇷 [el](../../../el/docs/security/COMPLIANCE.md) · 🇪🇸 [es](../../../es/docs/security/COMPLIANCE.md) · 🇪🇪 [et](../../../et/docs/security/COMPLIANCE.md) · 🇮🇷 [fa](../../../fa/docs/security/COMPLIANCE.md) · 🇫🇮 [fi](../../../fi/docs/security/COMPLIANCE.md) · 🇫🇷 [fr](../../../fr/docs/security/COMPLIANCE.md) · 🇮🇪 [ga](../../../ga/docs/security/COMPLIANCE.md) · 🇮🇳 [gu](../../../gu/docs/security/COMPLIANCE.md) · 🇳🇬 [ha](../../../ha/docs/security/COMPLIANCE.md) · 🇮🇱 [he](../../../he/docs/security/COMPLIANCE.md) · 🇮🇳 [hi](../../../hi/docs/security/COMPLIANCE.md) · 🇭🇷 [hr](../../../hr/docs/security/COMPLIANCE.md) · 🇭🇺 [hu](../../../hu/docs/security/COMPLIANCE.md) · 🇦🇲 [hy](../../../hy/docs/security/COMPLIANCE.md) · 🇮🇩 [id](../../../id/docs/security/COMPLIANCE.md) · 🇳🇬 [ig](../../../ig/docs/security/COMPLIANCE.md) · 🇮🇹 [it](../../../it/docs/security/COMPLIANCE.md) · 🇯🇵 [ja](../../../ja/docs/security/COMPLIANCE.md) · 🇬🇪 [ka](../../../ka/docs/security/COMPLIANCE.md) · 🇰🇭 [km](../../../km/docs/security/COMPLIANCE.md) · 🇮🇳 [kn](../../../kn/docs/security/COMPLIANCE.md) · 🇰🇷 [ko](../../../ko/docs/security/COMPLIANCE.md) · 🇱🇹 [lt](../../../lt/docs/security/COMPLIANCE.md) · 🇱🇻 [lv](../../../lv/docs/security/COMPLIANCE.md) · 🇮🇳 [ml](../../../ml/docs/security/COMPLIANCE.md) · 🇮🇳 [mr](../../../mr/docs/security/COMPLIANCE.md) · 🇲🇾 [ms](../../../ms/docs/security/COMPLIANCE.md) · 🇲🇹 [mt](../../../mt/docs/security/COMPLIANCE.md) · 🇲🇲 [my](../../../my/docs/security/COMPLIANCE.md) · 🇳🇵 [ne](../../../ne/docs/security/COMPLIANCE.md) · 🇳🇱 [nl](../../../nl/docs/security/COMPLIANCE.md) · 🇳🇴 [no](../../../no/docs/security/COMPLIANCE.md) · 🇮🇳 [or](../../../or/docs/security/COMPLIANCE.md) · 🇮🇳 [pa](../../../pa/docs/security/COMPLIANCE.md) · 🇵🇭 [phi](../../../phi/docs/security/COMPLIANCE.md) · 🇵🇱 [pl](../../../pl/docs/security/COMPLIANCE.md) · 🇵🇹 [pt](../../../pt/docs/security/COMPLIANCE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/COMPLIANCE.md) · 🇷🇴 [ro](../../../ro/docs/security/COMPLIANCE.md) · 🇷🇺 [ru](../../../ru/docs/security/COMPLIANCE.md) · 🇱🇰 [si](../../../si/docs/security/COMPLIANCE.md) · 🇸🇰 [sk](../../../sk/docs/security/COMPLIANCE.md) · 🇸🇮 [sl](../../../sl/docs/security/COMPLIANCE.md) · 🇷🇸 [sr](../../../sr/docs/security/COMPLIANCE.md) · 🇸🇪 [sv](../../../sv/docs/security/COMPLIANCE.md) · 🇰🇪 [sw](../../../sw/docs/security/COMPLIANCE.md) · 🇮🇳 [ta](../../../ta/docs/security/COMPLIANCE.md) · 🇮🇳 [te](../../../te/docs/security/COMPLIANCE.md) · 🇹🇭 [th](../../../th/docs/security/COMPLIANCE.md) · 🇹🇷 [tr](../../../tr/docs/security/COMPLIANCE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/COMPLIANCE.md) · 🇵🇰 [ur](../../../ur/docs/security/COMPLIANCE.md) · 🇺🇿 [uz](../../../uz/docs/security/COMPLIANCE.md) · 🇻🇳 [vi](../../../vi/docs/security/COMPLIANCE.md) · 🇳🇬 [yo](../../../yo/docs/security/COMPLIANCE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/COMPLIANCE.md)

---

> **事实来源：** `src/lib/compliance/`、`src/app/api/compliance/`
> **最后更新：** 2026-06-28 — v3.8.40

OmniRoute 将管理操作、身份验证事件、提供者凭据生命周期变更以及 MCP 工具调用记录到由 SQLite 支持的审计表中。本页介绍记录的内容、数据的存储位置、保留时长、API 密钥如何选择退出审计，以及如何查询这些数据。

实现位于 `src/lib/compliance/index.ts`（T-43 — “合规控制”）和 `src/lib/compliance/providerAudit.ts` 中。审计写入操作永远不会抛出异常：发生任何故障时，调用都会被静默忽略，确保审计日志不会中断主请求流程。

## 记录的内容

### 管理审计事件（`audit_log`）

每次调用 `logAuditEvent({ action, actor, target, details, ... })` 都会生成一行记录。操作字符串遵循 `domain.verb`（或 `domain.verb.outcome`）模式。代码树中已确认的操作类型包括：

| 操作                                 | 来源                                    |
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

每个条目都会记录 `action`、`actor`（默认为 `"system"`）、`target`、`details`/`metadata`（JSON）、`ip_address`、`resource_type`、`status`、`request_id` 和 `timestamp`。在写入记录之前，敏感键（`apiKey`、`accessToken`、`refreshToken`、`password`、任何匹配 `*token`/`*secret`/`*apikey` 的键等）都会被递归脱敏为 `"[redacted]"`。

### MCP 工具调用（`mcp_tool_audit`）

每次 MCP 工具调用都会通过 `open-sse/mcp-server/audit.ts` 写入一行记录。模式（来自 `src/lib/db/migrations/002_mcp_a2a_tables.sql`）：

| 列               | 说明                            |
| ---------------- | ------------------------------- |
| `id`             | 自动递增                        |
| `tool_name`      | MCP 工具标识符                  |
| `input_hash`     | 输入的 sha256（不存储有效负载） |
| `output_summary` | 简短的截断摘要                  |
| `duration_ms`    | 实际耗时                        |
| `api_key_id`     | 调用方（可为空）                |
| `success`        | `1` / `0`                       |
| `error_code`     | 失败时的最终错误代码            |
| `created_at`     | ISO 时间戳                      |

### 请求/使用日志

这些属于运行遥测数据（严格来说并非管理审计），但与审计数据使用相同的保留管道：

- `usage_history` — 每个请求的使用情况汇总
- `call_logs` — 完整的逐请求日志（受行数上限约束，见下文）
- `proxy_logs` — 代理流量日志（受行数上限约束）
- `request_detail_logs` — 旧版详细请求日志（如果存在，仍会被清理）

## 存储架构

`audit_log` 会在首次使用时由 `ensureAuditLogSchema()` 延迟创建：

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

系统会为 `timestamp`、`action`、`actor`、`resource_type`、`status` 和 `request_id` 创建索引。旧版数据库中缺失的列会根据需要通过 `ALTER TABLE` 添加。

## 保留与清理

系统遵循两个独立的保留期限：

| 环境变量                    | 默认值   | 适用于                                                            |
| --------------------------- | -------- | ----------------------------------------------------------------- |
| `APP_LOG_RETENTION_DAYS`    | `7`      | `audit_log`、`mcp_tool_audit`                                     |
| `CALL_LOG_RETENTION_DAYS`   | `7`      | `usage_history`、`call_logs`、`proxy_logs`、`request_detail_logs` |
| `CALL_LOGS_TABLE_MAX_ROWS`  | `100000` | `call_logs` 的行数上限裁剪                                        |
| `PROXY_LOGS_TABLE_MAX_ROWS` | `100000` | `proxy_logs` 的行数上限裁剪                                       |

`cleanupExpiredLogs()` 会执行保留期限清理。服务器启动时，`src/instrumentation-node.ts` 会调用该函数。每次运行都会记录一条 `compliance.cleanup` 审计事件，其中包含各个表的删除数量。代理/调用日志的裁剪会分批执行（`BATCH_SIZE = 5000`），以避免长时间的写锁。

手动清理请求历史记录与保留期限清理相互独立。“请求日志”页面会调用 `POST /api/settings/purge-request-history`，该接口会删除 `call_logs`、旧版 `request_detail_logs`，以及 `${DATA_DIR}/call_logs/` 下的本地请求产物。

默认值在 `src/lib/logEnv.ts` 中定义（`DEFAULT_APP_LOG_RETENTION_DAYS = 7`、`DEFAULT_CALL_LOG_RETENTION_DAYS = 7`）。

## `noLog` 选择退出（按 API 密钥）

可以为 API 密钥设置标志，使其下游调用流量不被记录。该标志存储在 `api_keys` 表中（`no_log INTEGER DEFAULT 0`），并同步到内存集合中，以供热路径快速查询。

```bash
# 创建不记录日志的密钥（需要管理身份验证）
curl -X POST http://localhost:20128/api/keys \
  -H "Cookie: auth_token=..." \
  -H "Content-Type: application/json" \
  -d '{"name": "Privacy key", "noLog": true}'
```

辅助函数（`src/lib/compliance/index.ts`）：

- `setNoLog(apiKeyId, true|false)` — 切换内存中的条目
- `isNoLog(apiKeyId)` — 在请求路径上检查；若无结果，则回退到对 `api_keys.no_log` 的缓存读取，缓存时间为 30 秒
- `NO_LOG_API_KEY_IDS`（环境变量，以逗号分隔）— 启动时预加载到内存集合中；当无法直接切换该列时非常有用

管理类审计事件（登录、提供者变更、MCP 工具调用等）**不受** `noLog` 影响——只有每个请求的流量日志会被选择退出。

## REST API

| 端点                        | 方法  | 描述                           | 认证       |
| --------------------------- | ----- | ------------------------------ | ---------- |
| `/api/compliance/audit-log` | `GET` | 带筛选条件的分页管理员审计条目 | management |
| `/api/mcp/audit`            | `GET` | 分页的 MCP 工具审计条目        | (open-sse) |
| `/api/mcp/audit/stats`      | `GET` | 汇总的 MCP 审计统计信息        | (open-sse) |

目前未提供 CSV 导出端点——请从仪表板导出，或直接查询
SQLite 数据库。

### 查询 `/api/compliance/audit-log`

支持的查询参数（均为可选参数，所有文本筛选器均使用 `LIKE %value%`
进行匹配）：

- `action`、`actor`、`target`、`resourceType`（或 `resource_type`）、
  `status`、`requestId`（或 `request_id`）
- `from` / `since`、`to` / `until`——ISO 时间戳
- `limit`（默认值为 `50`，最小值为 `1`，最大值为 `500`）
- `offset`（默认值为 `0`，最大值为 `10_000`）

响应为 JSON 数组。分页元数据通过以下响应头返回：
`x-total-count`、`x-page-limit`、`x-page-offset`。

```bash
curl "http://localhost:20128/api/compliance/audit-log?action=provider.credentials&from=2026-05-01" \
  -H "Cookie: auth_token=..."
```

## 仪表板

仪表板在 **`/dashboard/audit`**
（`src/app/(dashboard)/dashboard/audit/page.tsx`）中提供审计数据。该页面包含两个选项卡：

- **合规性**（`ComplianceTab.tsx`）——来自
  `/api/compliance/audit-log` 的管理员审计事件。可按事件类型、严重性（info / warning
  / critical，由操作 + 状态派生）和日期范围筛选。严重性根据操作/状态字符串
  在客户端计算。
- **MCP**（`McpAuditTab.tsx`）——来自 `/api/mcp/audit` 的 MCP 工具审计，
  可按工具名称和成功/失败状态筛选。

两个选项卡均使用分页，合规性选项卡的每页大小为 `50`，MCP 选项卡为 `25`。

## 提供者凭据辅助函数

`src/lib/compliance/providerAudit.ts` 提供了格式化辅助函数，供
提供者管理路由在发出凭据事件时使用：

- `summarizeProviderConnectionForAudit(connection)`——在将连接快照写入
  `details` 之前，移除 `apiKey`、`accessToken`、`refreshToken`、`idToken`
  和 `providerSpecificData.consoleApiKey`。
- `getProviderAuditTarget(connection)`——为 `target` 字段构造稳定的
  `"<provider>:<name|id>"` 字符串。
- `extractProviderWarnings(...payloads)`——扫描提供者响应中的
  策略/安全警告（`[sanitizer]`、`prompt injection detected`、
  `content has been filtered`、`safety filter`、`policy violation`），并
  提取最多 5 条匹配项，每条截断至 400 个字符。

## 最佳实践

- 对处理 PII（法律、医疗等）的 API 密钥设置 `noLog: true` 标记。
- 调整 `APP_LOG_RETENTION_DAYS` / `CALL_LOG_RETENTION_DAYS`，以满足您的
  保留策略。默认的 7 天期限较为保守。
- 按照合规计划要求的频率，将审计表导出至平台外部（`sqlite3 dump`）——
  系统不提供内置归档功能。
- 跟踪 `auth.login.failed` 和 `auth.login.locked` 的计数，以检测暴力破解
  攻击。
- 添加新的管理员端点时，请使用稳定的 `domain.verb.outcome` 操作字符串调用
  `logAuditEvent({ ... })`，并通过 `getAuditRequestContext(request)` 传递
  请求上下文，以便自动捕获 IP 和 `requestId`。

## 另请参阅

- [`docs/security/GUARDRAILS.md`](./GUARDRAILS.md) — PII 脱敏、提示词注入
- [`docs/frameworks/MCP-SERVER.md`](../frameworks/MCP-SERVER.md) — MCP 工具目录和作用域
- [`docs/reference/ENVIRONMENT.md`](../reference/ENVIRONMENT.md) — 完整的环境变量参考
- 源代码：`src/lib/compliance/`、`src/app/api/compliance/`、
  `src/app/api/mcp/audit/`、`src/lib/logEnv.ts`
