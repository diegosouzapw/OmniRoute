# Database Schema & Operations Guide (中文 (简体))

🌐 **Languages:** 🇺🇸 [English](../../../../ops/DATABASE_GUIDE.md) · 🇪🇹 [am](../../../am/docs/ops/DATABASE_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/ops/DATABASE_GUIDE.md) · 🇦🇿 [az](../../../az/docs/ops/DATABASE_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/ops/DATABASE_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/ops/DATABASE_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/ops/DATABASE_GUIDE.md) · 🇩🇰 [da](../../../da/docs/ops/DATABASE_GUIDE.md) · 🇩🇪 [de](../../../de/docs/ops/DATABASE_GUIDE.md) · 🇬🇷 [el](../../../el/docs/ops/DATABASE_GUIDE.md) · 🇪🇸 [es](../../../es/docs/ops/DATABASE_GUIDE.md) · 🇪🇪 [et](../../../et/docs/ops/DATABASE_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/ops/DATABASE_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/ops/DATABASE_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/ops/DATABASE_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/ops/DATABASE_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/ops/DATABASE_GUIDE.md) · 🇮🇱 [he](../../../he/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/ops/DATABASE_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/ops/DATABASE_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/ops/DATABASE_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/ops/DATABASE_GUIDE.md) · 🇮🇩 [id](../../../id/docs/ops/DATABASE_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/ops/DATABASE_GUIDE.md) · 🇮🇹 [it](../../../it/docs/ops/DATABASE_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/ops/DATABASE_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/ops/DATABASE_GUIDE.md) · 🇰🇭 [km](../../../km/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/ops/DATABASE_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/ops/DATABASE_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/ops/DATABASE_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/ops/DATABASE_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/ops/DATABASE_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/ops/DATABASE_GUIDE.md) · 🇲🇲 [my](../../../my/docs/ops/DATABASE_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/ops/DATABASE_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/ops/DATABASE_GUIDE.md) · 🇳🇴 [no](../../../no/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [or](../../../or/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/ops/DATABASE_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/ops/DATABASE_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/ops/DATABASE_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/ops/DATABASE_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/DATABASE_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/ops/DATABASE_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/ops/DATABASE_GUIDE.md) · 🇱🇰 [si](../../../si/docs/ops/DATABASE_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/ops/DATABASE_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/ops/DATABASE_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/ops/DATABASE_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/ops/DATABASE_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [te](../../../te/docs/ops/DATABASE_GUIDE.md) · 🇹🇭 [th](../../../th/docs/ops/DATABASE_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/ops/DATABASE_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/DATABASE_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/ops/DATABASE_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/ops/DATABASE_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/ops/DATABASE_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/ops/DATABASE_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/DATABASE_GUIDE.md)

---

> **简而言之**：OmniRoute 使用启用了 **WAL 日志模式的 SQLite** 作为主要存储，并使用 **AES-256-GCM** 对静态存储的敏感字段进行加密。本指南涵盖数据库架构、迁移、备份/恢复以及运维操作手册。

**来源：**

- `src/lib/db/core.ts` — 单例 + SCHEMA_SQL（17 个基础表）
- `src/lib/db/migrationRunner.ts` — 版本化迁移
- `src/lib/db/migrations/` — 167 个版本化 SQL 文件
- `src/lib/db/encryption.ts` — 加密辅助函数
- `src/lib/db/backup.ts` — 备份导出/导入
- `src/lib/db/healthCheck.ts` — 健康诊断

---

## 为什么选择 SQLite？

OmniRoute 选择 SQLite 而非 PostgreSQL/MySQL，原因如下：

| 因素       | SQLite                   | PostgreSQL               |
| ---------- | ------------------------ | ------------------------ |
| **部署**   | 嵌入式——无需单独的服务器 | 需要配置服务器           |
| **加密**   | 应用层（AES-256-GCM）    | 内置 TDE                 |
| **性能**   | 对中小型工作负载更快     | 更适合海量并发写入       |
| **并发性** | WAL 模式允许并发读取     | 完整 MVCC                |
| **备份**   | 复制单个文件             | `pg_dump` 或文件系统快照 |
| **用例**   | 单用户安装、嵌入式部署   | 多租户 SaaS              |

对于**单用户、单实例**部署（OmniRoute 的主要用例），SQLite 更简单、更快速。

### WAL 日志模式

`core.ts` 以 **WAL（预写式日志）模式**打开数据库：

```ts
// src/lib/db/core.ts
db.pragma("journal_mode = WAL");
db.pragma("busy_timeout = 2000");
db.pragma("synchronous = NORMAL");
db.pragma(`cache_size = -${DEFAULT_DATABASE_SETTINGS.optimization.cacheSize}`);
```

WAL 允许在写入期间进行**并发读取**——这对仪表板非常重要，因为仪表板会在记录请求的同时执行查询。

默认缓存大小为 **65,536 KiB（64 MiB）**。SQLite 将负值
`cache_size` 解释为以 KiB 为单位的近似上限，并按需分配页面。
**设置 > 系统与存储 > 缓存大小**接受从 **1 到
1,000,000 KiB** 的整数值；保存设置后，该值会应用于当前数据库连接，
并且 OmniRoute 会在启动时恢复已持久化的值。

---

## 数据库位置

SQLite 文件存储在：

| 操作系统 | 路径                                                 |
| -------- | ---------------------------------------------------- |
| Linux    | `~/.omniroute/storage.sqlite`                        |
| macOS    | `~/.omniroute/storage.sqlite`                        |
| Windows  | `%USERPROFILE%\.omniroute\storage.sqlite`            |
| Docker   | `/app/data/storage.sqlite`（可通过 `DATA_DIR` 配置） |

配套文件：

- `storage.sqlite-wal` — 预写式日志
- `storage.sqlite-shm` — 共享内存文件
- `call_logs/` — 请求负载产物（如果已启用）

**覆盖默认位置：**

```bash
DATA_DIR=/custom/path omniroute
```

---

## 领域模块架构

OmniRoute 的数据库在 `src/lib/db/` 中包含 **110 个顶层 TypeScript 模块**。每个领域模块：

- 负责一个或多个特定表
- 导出类型化的 CRUD 函数
- 从不操作其他模块的表
- 使用 `core.ts` 中的 `getDbInstance()` 访问数据库

### 110 个顶层数据库模块

OmniRoute 在 `src/lib/db/` 中有 **110 个顶层 TypeScript 文件**。以下是核心模块示例；完整列表请参阅目录清单：

| 模块                    | 表                                                             | 职责                                         |
| ----------------------- | -------------------------------------------------------------- | -------------------------------------------- |
| `providers.ts`          | `provider_connections`                                         | OAuth/API 密钥提供者注册和凭据管理           |
| `models.ts`             | `key_value`（模型数据）                                        | 模型定义、功能和定价                         |
| `combos.ts`             | `combos`                                                       | 组合路由配置和排序                           |
| `apiKeys.ts`            | `api_keys`                                                     | API 密钥生命周期、作用域和配额跟踪           |
| `settings.ts`           | `key_value`、`api_keys`、`combos`                              | 系统配置和共享 KV 存储                       |
| `backup.ts`             | —                                                              | 备份导出/导入操作                            |
| `proxies.ts`            | `proxy_registry`、`proxy_assignments`、`provider_connections`  | 代理配置和路由规则                           |
| `prompts.ts`            | `prompt_templates`                                             | 可复用的提示词模板和版本控制                 |
| `webhooks.ts`           | `webhooks`                                                     | 事件驱动的 Webhook 订阅和日志                |
| `detailedLogs.ts`       | `request_detail_logs`                                          | 每请求审计日志记录（可选，高容量）           |
| `domainState.ts`        | `domain_*`（5 个表）                                           | 领域预算、熔断器、锁定、回退链和成本历史记录 |
| `registeredKeys.ts`     | `registered_keys`、`account_key_limits`、`provider_key_limits` | 用于 MCP/A2A 的 API 密钥白名单               |
| `quotaSnapshots.ts`     | `quota_snapshots`                                              | 历史配额使用情况                             |
| `modelComboMappings.ts` | `model_combo_mappings`                                         | 将模型映射到默认组合                         |
| `cliToolState.ts`       | `cli_tool_state`                                               | CLI 专用持久化状态                           |
| `encryption.ts`         | —                                                              | 用于加密/解密字段的辅助函数                  |
| `readCache.ts`          | —                                                              | 用于读取密集型操作的内存缓存                 |
| `secrets.ts`            | `key_value`（加密条目）                                        | 加密的密钥存储                               |
| `stateReset.ts`         | —                                                              | 清除/重置数据库状态以进行测试                |
| `contextHandoffs.ts`    | `context_handoffs`                                             | 用于智能体移交的会话上下文                   |
| `usage*.ts`             | `usage_history`、`call_logs`、`proxy_logs`                     | 使用情况跟踪                                 |
| `compression*.ts`       | `compression_settings`、`compression_combos`                   | 压缩配置                                     |

### 模块边界

一项核心架构规则：**模块不能直接访问其他模块的表**。如需操作另一个模块的数据，应从该模块导入相应函数。

```ts
// ❌ 错误：直接对另一个模块执行 SQL
db.prepare("SELECT * FROM provider_connections").all();

// ✅ 正确：使用 providers 模块的函数
import { listProviders } from "@/lib/db/providers";
const providers = await listProviders();
```

此规则通过代码审查强制执行——虽然没有静态检查，但任何违规都会被标记。

---

## 基础架构（17 个表）

`core.ts` 在 `SCHEMA_SQL` 中定义了 17 个基础表。这些表由迁移 `001_initial_schema.sql` 创建，并构成核心架构。

### 核心表（在初始迁移中创建）

| 表                         | 用途                 | 关键列                                                                  |
| -------------------------- | -------------------- | ----------------------------------------------------------------------- |
| `provider_connections`     | 提供者凭据（已加密） | `id`、`provider`、`auth_type`、`api_key`、`is_active`                   |
| `provider_nodes`           | 提供者节点路由信息   | `id`、`type`、`name`、`base_url`、`created_at`                          |
| `key_value`                | 通用 KV 存储         | `namespace`、`key`、`value`                                             |
| `combos`                   | 路由组合定义         | `id`、`name`、`data`、`sort_order`                                      |
| `api_keys`                 | 网关的 API 密钥      | `id`、`name`、`key`、`machine_id`、`allowed_models`                     |
| `db_meta`                  | 数据库元数据         | `key`、`value`                                                          |
| `usage_history`            | 请求用量记录         | `id`、`provider`、`model`、`tokens_input`、`tokens_output`、`timestamp` |
| `call_logs`                | 请求载荷和响应       | `id`、`timestamp`、`status`、`model`、`provider`、`latency_ms`          |
| `proxy_logs`               | 代理请求日志         | `id`、`timestamp`、`proxy_type`、`status`、`provider`                   |
| `domain_fallback_chains`   | 模型到提供者的回退链 | `model`、`chain`                                                        |
| `domain_budgets`           | 每个域的支出预算     | `api_key_id`、`daily_limit_usd`、`warning_threshold`、`reset_interval`  |
| `domain_budget_reset_logs` | 预算重置历史         | `id`、`api_key_id`、`reset_interval`、`previous_spend`、`reset_at`      |
| `domain_cost_history`      | 每个域的成本跟踪     | `id`、`api_key_id`、`cost`、`timestamp`                                 |
| `domain_lockout_state`     | 域限流状态           | `identifier`、`attempts`、`locked_until`                                |
| `domain_circuit_breakers`  | 每个域的熔断器状态   | `name`、`state`、`failure_count`、`last_failure_time`                   |
| `semantic_cache`           | LLM 响应缓存         | `id`、`signature`、`model`、`prompt_hash`、`response`                   |
| `quota_snapshots`          | 历史配额快照         | `id`、`provider`、`connection_id`、`window_key`、`remaining_percentage` |

### 附加表（由后续迁移添加）

后续迁移添加了如下表：

- `cli_tool_state`（迁移 011）— CLI 工具状态
- `mcp_*` 表 — MCP 服务器审计
- `a2a_*` 表 — A2A 任务状态
- `usage_*` 表 — 用量跟踪
- `plugin_*` 表 — 插件系统
- `skill_executions` — 技能执行历史
- `memory_*` 表 — 记忆系统
- `compression_*` 表 — 压缩系统
- `webhook_*` 表 — Webhook 投递日志
- `acp_*` 表 — Agent Client Protocol
- `oneproxy_*` 表 — 1proxy 市场
- `proxy_assignments` — 代理作用域绑定
- `detailed_call_artifacts` — 调用日志制品元数据
- `quota_alert_history` — 配额警报审计
- `command_code_auth_sessions` — Command Code OAuth 会话

约 30 多个表的完整列表位于 `src/lib/db/migrations/`。

---

## 迁移

OmniRoute 在 `src/lib/db/migrations/` 中使用**带版本且幂等的迁移**。每个迁移都是一个独立的 SQL 文件，命名格式为 `NNN_description.sql`。

### 迁移命名

```
001_initial_schema.sql
002_mcp_a2a_tables.sql
003_provider_node_custom_paths.sql
...
021_combo_call_log_targets.sql
```

### 迁移如何运行

启动时，`migrationRunner.ts` 会：

1. 如果 `_omniroute_migrations` 表不存在，则创建该表
2. 查询已应用的迁移
3. 按顺序应用所有新迁移，每个迁移都在一个事务中执行
4. 记录每个已应用的迁移及其时间戳

```ts
// src/lib/db/migrationRunner.ts（简化版）
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

### 幂等性

迁移必须是**幂等的**——运行两次时，第二次应不执行任何操作：

```sql
-- 004_proxy_registry.sql
CREATE TABLE IF NOT EXISTS proxy_registry (
  id TEXT PRIMARY KEY,
  host TEXT NOT NULL,
  port INTEGER NOT NULL,
  ...
);
```

应充分使用 `IF NOT EXISTS`、`IF EXISTS` 和 `OR IGNORE` / `OR REPLACE` 子句。

### 添加新迁移

1. **确定下一个编号**：`ls src/lib/db/migrations/ | tail -1`
2. **创建文件**：`NNN_my_change.sql`
3. **使用安全的 DDL**：`CREATE TABLE IF NOT EXISTS`、`ALTER TABLE ... ADD COLUMN`
4. **谨慎回填数据**：使用 `UPDATE ... WHERE ...` 处理现有行
5. **在副本上测试**：切勿在生产环境中运行未经测试的迁移

示例：

```sql
-- 022_add_combo_priority.sql
ALTER TABLE combos ADD COLUMN priority INTEGER DEFAULT 100;
UPDATE combos SET priority = 100 WHERE priority IS NULL;
CREATE INDEX IF NOT EXISTS idx_combos_priority ON combos(priority);
```

> **向后不兼容的更改**（例如删除列）处理起来较为棘手。OmniRoute 不支持降级——迁移一旦应用，架构更改便是永久性的。请据此做好规划。

---

## 静态数据加密

敏感字段（API 密钥、OAuth 令牌、连接字符串）使用 **AES-256-GCM** 进行静态加密。

### 工作原理

```ts
// src/lib/db/encryption.ts（简化版）
const key = deriveKeyFromPassphrase(passphrase, salt);
const iv = randomBytes(12);
const cipher = createCipheriv("aes-256-gcm", key, iv);
const encrypted = Buffer.concat([cipher.update(plaintext), cipher.final()]);
const authTag = cipher.getAuthTag();
return { encrypted, iv, authTag };
```

### 使用位置

- `provider_connections.api_key`——在应用层加密
- `provider_connections.access_token`、`refresh_token`、`id_token`——在应用层加密
- `namespace = "secrets"` 的 `key_value` 条目——在应用层加密
- `proxy_registry.auth`——在应用层加密（如果存在）

### 加密密钥

加密密钥派生自一个**口令**（通过 `STORAGE_ENCRYPTION_KEY` 环境变量设置）和一个**盐值**（存储在数据库中）。解密数据时，两者缺一不可。

```bash
# 生成安全口令
openssl rand -hex 32

# 在 .env 中设置
STORAGE_ENCRYPTION_KEY=<your-key>
```

> **关键提示**：丢失加密密钥意味着无法再访问所有加密数据。**请将密钥与数据库分开备份**。

### 未加密的内容

出于性能考虑，以下内容以明文形式存储：

- 提供者显示名称
- 模型定义（已公开）
- 路由规则
- 使用记录（不含个人身份信息）

---

## 加密注意事项 (v3.8.16+)

OmniRoute 使用 **`migrateLegacyEncryptedString()`** 透明地处理两种加密方案：

- **旧版**（v3.5.0 之前）：基于 XOR 的“加密”（并非真正的加密）
- **当前版本**：AES-256-GCM，使用正确的 IV 和认证标签

迁移辅助函数会检测旧格式，并在首次读取时使用新方案重新加密。这意味着你可以升级旧数据库而不会丢失凭据。

---

## 读取缓存

对于频繁读取的数据（模型、提供者、设置），`readCache.ts` 提供了**内存缓存**：

```ts
// 启动时缓存，写入时失效
const providers = await getCachedProviders(); // 快速，从内存读取
const fresh = await listProviders(); // 较慢，访问数据库
```

| 缓存实体               | 缓存键         | TTL      |
| ---------------------- | -------------- | -------- |
| `models`               | `models:v1`    | 直到写入 |
| `provider_connections` | `providers:v1` | 直到写入 |
| `settings`             | `settings:v1`  | 直到写入 |
| `combos`               | `combos:v1`    | 直到写入 |

每次写入相应的数据表时，缓存都会失效。

---

## 备份与恢复

### 手动备份

```bash
# 使用 CLI 创建本地备份
omniroute backup create --name pre-migration

# 或通过 API
curl -X PUT http://localhost:20128/api/db-backups \
  -H "Authorization: Bearer $MANAGEMENT_KEY" \
  -H "Content-Type: application/json" \
  -d '{"name": "pre-migration"}'
```

备份文件包括：

- 所有数据库表（序列化为 JSON）
- 调用日志制品（使用 base64 编码，可选）
- 设置和密钥（已加密）
- 插件配置

### 恢复

```bash
# 通过 CLI
omniroute restore pre-migration

# 通过 API
curl -X POST http://localhost:20128/api/db-backups/restore \
  -H "Authorization: Bearer $MANAGEMENT_KEY" \
  -H "Content-Type: application/json" \
  -d '{"name": "pre-migration"}'
```

> **警告**：恢复操作会覆盖整个数据库。请先停止所有客户端。

### 自动备份

```bash
# 通过 CLI 启用每日自动备份
omniroute backup auto enable --cron "0 2 * * *" --retention 7
```

该计划由服务器端的后台作业执行，此作业每 30 秒触发一次
（默认值），并根据服务器本地时间计算 cron 表达式。

| 变量                                        | 默认值  | 说明                                                                                          |
| ------------------------------------------- | ------- | --------------------------------------------------------------------------------------------- |
| `OMNIROUTE_BACKUP_SCHEDULE_JOB_INTERVAL_MS` | `30000` | 触发间隔，以毫秒为单位（最小值为 `5000`）。必须短于 60 秒，才能可靠地落在匹配的 cron 分钟内。 |

### SQLite 热备份

如需对正在使用的数据库进行零停机备份：

```bash
sqlite3 ~/.omniroute/storage.sqlite ".backup /backups/omniroute-hot.db"
```

此命令使用 SQLite 的在线备份 API，因此可在 OmniRoute 运行时安全执行。

---

## 性能调优

### WAL 模式

默认启用 WAL。对于高写入负载，请考虑：

```sql
PRAGMA wal_autocheckpoint = 1000;  -- 每 1000 页执行一次检查点操作
PRAGMA journal_size_limit = 67108864;  -- WAL 上限为 64MB
```

### 索引

用于提升性能的关键索引（由迁移自动创建）：

- `idx_models_provider` — 按提供者查找模型
- `idx_combo_targets_combo_id` — 展开组合目标
- `idx_usage_history_api_key_timestamp` — 使用情况分析
- `idx_quota_snapshots_api_key_window` — 配额跟踪
- `idx_call_logs_timestamp` — 调用日志查询

要添加新索引，请创建迁移：

```sql
-- 023_add_my_index.sql
CREATE INDEX IF NOT EXISTS idx_my_table_my_column ON my_table(my_column);
```

### 内存映射 I/O

对于非常大的数据库（>10GB），可以通过 SQLite pragma 调整内存映射：

```sql
-- 通过 SQLite pragma 设置（在 core.ts 或运行时中调整）
PRAGMA mmap_size = 268435456;  -- 256MB
```

### 压缩

长期运行的 OmniRoute 实例可受益于偶尔执行 `VACUUM`：

```bash
sqlite3 ~/.omniroute/storage.sqlite "VACUUM;"
```

每月在低流量时段运行一次。（WAL 模式可减少此操作的必要性，但无法完全消除。）

---

## 健康检查

`src/lib/db/healthCheck.ts` 提供**数据库级健康诊断**：

这两种请求方法都需要身份验证（否则返回 `401`）。`GET` 仅进行诊断；`POST` 则在启用
`autoRepair` 的情况下运行相同检查。

```bash
GET  /api/db/health   # 诊断
POST /api/db/health   # 诊断并修复
```

响应是由 `runDbHealthCheck()` 生成的 `DbHealthCheckResult`
（`src/lib/db/healthCheck.ts`）：

```json
{
  "isHealthy": false,
  "issues": [
    {
      "type": "broken_reference",
      "table": "domain_budgets",
      "description": "域预算引用了已不存在的 API 密钥。",
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

| 字段              | 含义                                                                                                       |
| ----------------- | ---------------------------------------------------------------------------------------------------------- |
| `isHealthy`       | 当 `issues` 为空时为 `true`。`driver` 永远不会影响该值。                                                   |
| `issues[].type`   | `integrity_check_failed`、`broken_reference`、`stale_snapshot`、`invalid_state` 之一。                     |
| `repairedCount`   | 本次运行期间修复的行数；当 `autoRepair` 为 false 时始终为 `0`。                                            |
| `backupCreated`   | 修复前是否已创建备份。                                                                                     |
| `checkedAt`       | 本次运行与其写入的任何修复说明共用的 ISO 时间戳。                                                          |
| `driver.name`     | 为被检查数据库提供服务的 SQLite 驱动程序。                                                                 |
| `driver.degraded` | 当写入内容未由数据库文件持久保存时为 `true`——即使用 `sql.js` WASM 回退方案（全文件持久化）或内存数据库时。 |

`omniroute_db_health_check` MCP 工具会返回相同的有效负载。

运行 `PRAGMA integrity_check` 以检测损坏：

```bash
sqlite3 ~/.omniroute/storage.sqlite "PRAGMA integrity_check;"
# 应输出：ok
```

如果返回除 `ok` 之外的任何内容，请**立即停止使用该数据库**并从备份中恢复。

---

## 灾难恢复

### 场景 1：WAL 文件丢失

`-wal` 文件丢失，但 `-shm` 文件和主数据库完好无损：

```bash
# 下次打开时自动恢复
omniroute
```

如果 SQLite 无法自动恢复：

```bash
sqlite3 ~/.omniroute/storage.sqlite ".recover" > recovered.sql
sqlite3 recovered.db < recovered.sql
mv recovered.db ~/.omniroute/storage.sqlite
```

### 场景 2：主数据库文件损坏

从备份恢复：

```bash
omniroute sync pull --merge   # 或：omniroute backup restore <backup-id>
```

### 场景 3：加密密钥丢失

没有密钥时**无法恢复**。加密字段将无法读取。请使用新的凭据手动重新添加所有提供者。

> **缓解措施**：务必单独备份加密密钥，最好将其保存在密码管理器或 KMS 中。

### 场景 4：磁盘空间已满

SQLite 将返回 `SQLITE_FULL` 错误。释放磁盘空间，然后执行：

```bash
# 为 WAL 执行检查点操作以释放空间
sqlite3 ~/.omniroute/storage.sqlite "PRAGMA wal_checkpoint(TRUNCATE);"
```

---

## 常见操作

### 检查表

```bash
sqlite3 ~/.omniroute/storage.sqlite "SELECT * FROM api_keys LIMIT 5;"
```

### 统计所有表中的行数

```bash
sqlite3 ~/.omniroute/storage.sqlite <<EOF
SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%';
EOF
```

### 重置（清除）所有数据

```bash
# 首先停止 OmniRoute
omniroute stop

# 删除数据库文件
rm ~/.omniroute/storage.sqlite*

# 重新启动（将重新创建空数据库）
omniroute
```

如需**选择性**重置（保留提供者，清除使用记录）：

```bash
DELETE FROM usage_history WHERE timestamp < datetime('now', '-30 day');
DELETE FROM call_logs WHERE timestamp < datetime('now', '-30 day');
DELETE FROM proxy_logs WHERE timestamp < datetime('now', '-30 day');
```

### 导出单个表

```bash
sqlite3 ~/.omniroute/storage.sqlite <<EOF
.mode csv
.output api_keys.csv
SELECT * FROM api_keys;
EOF
```

---

## 故障排除

### “数据库已锁定”

另一个进程持有写锁。可以：

- 等待另一个进程完成（使用 `lsof | grep storage.sqlite` 检查）
- 终止另一个进程
- 如果问题持续存在，请重启 OmniRoute

### “外键约束失败”

某个领域模块违反了引用完整性。请检查：

- 依赖表中的孤立行
- 未能传播的级联删除
- 最近更改了外键的迁移

运行 `PRAGMA foreign_key_check;` 以查找违规项。

### “内存不足”

SQLite 的内存映射 I/O 超出了操作系统限制。可通过 SQLite pragma 减少其大小：

```sql
PRAGMA mmap_size = 134217728;  -- 使用 128MB，而不是 256MB
```

或者将其禁用：

```sql
PRAGMA mmap_size = 0;
```

### “迁移中途失败”

迁移在事务中运行，因此应该已回滚。如果没有：

1. **停止 OmniRoute**（防止继续尝试）
2. 使用 `sqlite3` **检查数据库状态**
3. **手动修复**未完成的迁移
4. **重新运行** OmniRoute（将重试迁移）

为防止这种情况，请始终先在副本上测试迁移。

---

## 另请参阅

- [USAGE_QUOTA_GUIDE.md](../guides/USAGE_QUOTA_GUIDE.md) — 使用情况表
- [MONITORING_GUIDE.md](./MONITORING_GUIDE.md) — 健康监控
- [RELEASE_CHECKLIST.md](./RELEASE_CHECKLIST.md) — 发布流程
- 源代码：`src/lib/db/`（80 多个文件，约 25K 行代码）
