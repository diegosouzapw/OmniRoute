# Quota Sharing Engine (中文 (简体))

🌐 **Languages:** 🇺🇸 [English](../../../../routing/QUOTA_SHARE.md) · 🇪🇹 [am](../../../am/docs/routing/QUOTA_SHARE.md) · 🇸🇦 [ar](../../../ar/docs/routing/QUOTA_SHARE.md) · 🇦🇿 [az](../../../az/docs/routing/QUOTA_SHARE.md) · 🇧🇬 [bg](../../../bg/docs/routing/QUOTA_SHARE.md) · 🇧🇩 [bn](../../../bn/docs/routing/QUOTA_SHARE.md) · 🇨🇿 [cs](../../../cs/docs/routing/QUOTA_SHARE.md) · 🇩🇰 [da](../../../da/docs/routing/QUOTA_SHARE.md) · 🇩🇪 [de](../../../de/docs/routing/QUOTA_SHARE.md) · 🇬🇷 [el](../../../el/docs/routing/QUOTA_SHARE.md) · 🇪🇸 [es](../../../es/docs/routing/QUOTA_SHARE.md) · 🇪🇪 [et](../../../et/docs/routing/QUOTA_SHARE.md) · 🇮🇷 [fa](../../../fa/docs/routing/QUOTA_SHARE.md) · 🇫🇮 [fi](../../../fi/docs/routing/QUOTA_SHARE.md) · 🇫🇷 [fr](../../../fr/docs/routing/QUOTA_SHARE.md) · 🇮🇪 [ga](../../../ga/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [gu](../../../gu/docs/routing/QUOTA_SHARE.md) · 🇳🇬 [ha](../../../ha/docs/routing/QUOTA_SHARE.md) · 🇮🇱 [he](../../../he/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [hi](../../../hi/docs/routing/QUOTA_SHARE.md) · 🇭🇷 [hr](../../../hr/docs/routing/QUOTA_SHARE.md) · 🇭🇺 [hu](../../../hu/docs/routing/QUOTA_SHARE.md) · 🇦🇲 [hy](../../../hy/docs/routing/QUOTA_SHARE.md) · 🇮🇩 [id](../../../id/docs/routing/QUOTA_SHARE.md) · 🇳🇬 [ig](../../../ig/docs/routing/QUOTA_SHARE.md) · 🇮🇹 [it](../../../it/docs/routing/QUOTA_SHARE.md) · 🇯🇵 [ja](../../../ja/docs/routing/QUOTA_SHARE.md) · 🇬🇪 [ka](../../../ka/docs/routing/QUOTA_SHARE.md) · 🇰🇭 [km](../../../km/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [kn](../../../kn/docs/routing/QUOTA_SHARE.md) · 🇰🇷 [ko](../../../ko/docs/routing/QUOTA_SHARE.md) · 🇱🇹 [lt](../../../lt/docs/routing/QUOTA_SHARE.md) · 🇱🇻 [lv](../../../lv/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [ml](../../../ml/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [mr](../../../mr/docs/routing/QUOTA_SHARE.md) · 🇲🇾 [ms](../../../ms/docs/routing/QUOTA_SHARE.md) · 🇲🇹 [mt](../../../mt/docs/routing/QUOTA_SHARE.md) · 🇲🇲 [my](../../../my/docs/routing/QUOTA_SHARE.md) · 🇳🇵 [ne](../../../ne/docs/routing/QUOTA_SHARE.md) · 🇳🇱 [nl](../../../nl/docs/routing/QUOTA_SHARE.md) · 🇳🇴 [no](../../../no/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [or](../../../or/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [pa](../../../pa/docs/routing/QUOTA_SHARE.md) · 🇵🇭 [phi](../../../phi/docs/routing/QUOTA_SHARE.md) · 🇵🇱 [pl](../../../pl/docs/routing/QUOTA_SHARE.md) · 🇵🇹 [pt](../../../pt/docs/routing/QUOTA_SHARE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/routing/QUOTA_SHARE.md) · 🇷🇴 [ro](../../../ro/docs/routing/QUOTA_SHARE.md) · 🇷🇺 [ru](../../../ru/docs/routing/QUOTA_SHARE.md) · 🇱🇰 [si](../../../si/docs/routing/QUOTA_SHARE.md) · 🇸🇰 [sk](../../../sk/docs/routing/QUOTA_SHARE.md) · 🇸🇮 [sl](../../../sl/docs/routing/QUOTA_SHARE.md) · 🇷🇸 [sr](../../../sr/docs/routing/QUOTA_SHARE.md) · 🇸🇪 [sv](../../../sv/docs/routing/QUOTA_SHARE.md) · 🇰🇪 [sw](../../../sw/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [ta](../../../ta/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [te](../../../te/docs/routing/QUOTA_SHARE.md) · 🇹🇭 [th](../../../th/docs/routing/QUOTA_SHARE.md) · 🇹🇷 [tr](../../../tr/docs/routing/QUOTA_SHARE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/routing/QUOTA_SHARE.md) · 🇵🇰 [ur](../../../ur/docs/routing/QUOTA_SHARE.md) · 🇺🇿 [uz](../../../uz/docs/routing/QUOTA_SHARE.md) · 🇻🇳 [vi](../../../vi/docs/routing/QUOTA_SHARE.md) · 🇳🇬 [yo](../../../yo/docs/routing/QUOTA_SHARE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/routing/QUOTA_SHARE.md)

---

> **文档参考**：`docs/routing/QUOTA_SHARE.md`
> 属于 B 组（计划 16 + 22）。

---

## 概述

配额共享引擎在共享同一连接的多个 API 密钥之间，公平分配提供者基于时间的配额（例如 Codex 的 5 小时窗口、Kimi 的 1500 次请求/小时）。

**它解决的问题：** OmniRoute 使用许多 API 密钥代理访问同一个上游提供者账户。如果没有共享逻辑，密钥 A 的突发请求可能会耗尽提供者在当前小时内的配额，导致密钥 B 和 C 在窗口重置前一直被阻止。该引擎通过以下方式防止这种情况：

1. 按维度（%、请求数、令牌数、$）跟踪每个密钥的滚动用量。
2. 应用工作保持型公平份额算法：只要全局池尚未饱和，密钥就可以借用闲置份额。
3. 在请求到达上游执行器之前，于热路径（`chatCore.ts`）中强制执行计算结果。

---

## 算法：工作保持型公平份额

实现在 `src/lib/quota/fairShare.ts` 中。

### 模式

| 条件                                       | 模式     | 行为                                           |
| ------------------------------------------ | -------- | ---------------------------------------------- |
| `globalUsedPercent < saturationThreshold`  | **宽松** | 密钥最多可借用全局限制减去总消耗量后的剩余额度 |
| `globalUsedPercent >= saturationThreshold` | **严格** | 严格执行各密钥的公平份额                       |

默认值为 `saturationThreshold = 0.5`（环境变量 `QUOTA_SATURATION_THRESHOLD`）。

### 按维度决策

对于池中的每个活跃维度，引擎会计算：

```
fairShareAllowed = poolLimit × (allocationWeight / 100)
consumed        = 此密钥当前的滚动值（来自 QuotaStore.peek）
remaining       = fairShareAllowed - consumed
```

然后：

- **`policy = hard`**：如果 `consumed > fairShareAllowed` 且处于严格模式 → **阻止**。
- **`policy = soft`**：如果 `consumed > fairShareAllowed` 且处于严格模式 → **惩罚**（降低其在组合中的优先级；绝不硬性阻止）。
- **`policy = burst`**：只要全局仍有余量，无论公平份额如何都允许使用。

### 绝对上限

分配中的 `capValue` + `capUnit` 是独立于模式或策略的硬性上限。任何维度中，只要 `consumed >= capValue`，就始终会**阻止**请求。

### 多维度检查

如果池中的**任意**维度会阻止请求，则该请求会被阻止。各维度彼此独立——5h% 耗尽不会影响 weekly% 维度。

### 借用

在宽松模式下，某个分配未被完全使用的密钥可以使用其他密钥未分配份额中的剩余额度。公式为：

```
maxAllowed = globalLimit - consumedByOtherKeys
```

其中，`consumedByOtherKeys = consumedTotal - consumedByThisKey`。全局上限（该维度的池 `limit`）始终是硬性上限。

---

## 滑动窗口计数器

实现在 `src/lib/quota/sqliteQuotaStore.ts` 和 `redisQuotaStore.ts` 中。

每个 `(apiKeyId, dimensionKey)` 有两个桶：

- `curr`：当前桶（`floor(nowMs / windowMs)`）
- `prev`：前一个桶（`curr - 1`）

有效滚动值：

```
effectiveBucketIndex = floor(nowMs / windowMs)
bucketStartMs        = effectiveBucketIndex × windowMs
elapsed              = nowMs - bucketStartMs
weight               = 1 - elapsed / windowMs

effective = prev × weight + curr
```

**精度**：约 99% 准确。误差最多为窗口大小的 1%，出现在桶之间的边界处（这是双桶近似法固有的误差）。

### 并发

SQLite 驱动：按 `(apiKeyId | dimensionKey)` 键使用内存互斥锁，以防止读取-修改-写入竞争。该模式与 `src/sse/services/auth.ts` 中防止惊群效应的实现一致。

Redis 驱动：使用 Lua EVAL 脚本进行原子递增——作为单条 Redis 命令执行。

---

## 驱动程序

### SQLite（默认，零安装）

- 表：`quota_consumption`（请参阅迁移文件 `073_quota_pools.sql` / `074_quota_consumption.sql`）。
- 最适合单实例部署。
- 所有持久化数据都存储在现有的 OmniRoute SQLite 数据库中（`DATA_DIR/storage.sqlite`）。

### Redis（可选，多实例）

- 需要 `ioredis` npm 包。
- 计数器存储在 Redis 中；元数据（池/分配）仍存储在 SQLite 中。
- 最适合必须共享计数器的多副本部署。

### 切换驱动程序

通过设置界面（`/dashboard/settings` → 配额存储），或通过环境变量：

```bash
QUOTA_STORE_DRIVER=redis
QUOTA_STORE_REDIS_URL=redis://localhost:6379
```

数据库设置的优先级高于环境变量。如果 `driver=redis` 但未提供 URL，或未安装
`ioredis`，工厂将回退到 SQLite 并记录警告。

驱动程序选择顺序：

1. 数据库设置 `quotaStore.driver`
2. 环境变量 `QUOTA_STORE_DRIVER`
3. 默认值：`sqlite`

---

## 多维度

一个池可以具有多个维度。每个维度相互独立：

```ts
QuotaDimension {
  unit: "percent" | "requests" | "tokens" | "usd",
  window: "5h" | "hourly" | "daily" | "weekly" | "monthly",
  limit: number,  // 此维度的全局池上限
}
```

**示例：Codex 方案**（5 小时百分比 + 每周百分比）：

```json
[
  { "unit": "percent", "window": "5h", "limit": 100 },
  { "unit": "percent", "window": "weekly", "limit": 100 }
]
```

请求必须满足所有维度才能获准通过。

---

## 方案解析器

实现在 `src/lib/quota/planResolver.ts` 中。

优先级（从高到低）：

1. **手动数据库覆盖** — `provider_plans` 表，按 `connectionId` 设置。
2. **已知目录** — `src/lib/quota/planRegistry.ts`（仅包含数据）。
3. **空方案** — 没有维度，需要手动配置。

### 已知目录

| 提供者                | 维度                                                          |
| --------------------- | ------------------------------------------------------------- |
| `codex`               | `percent/5h/100`, `percent/weekly/100`                        |
| `glm`                 | `tokens/5h`（limit=0，未知），`tokens/weekly`                 |
| `minimax`             | `tokens/5h`, `tokens/weekly`                                  |
| `bailian`             | `percent/5h/100`, `percent/weekly/100`, `percent/monthly/100` |
| `kimi`                | `requests/hourly/1500`                                        |
| `alibaba`             | `requests/monthly/90000`                                      |
| `openai`, `anthropic` | 无默认值 — 需要手动配置                                       |

---

## 流水线集成

### PRE 钩子（`open-sse/handlers/chatCore.ts`）

在上游执行器之前、身份验证和策略检查之后运行：

```
resolveComboTargets / handleSingleModel
  → enforceQuotaShare(apiKeyId, connectionId, provider, estimatedCost)
      → 每个维度调用 getQuotaStore().peek()
      → fairShare.decideFairShare()
      → 如果阻止 → 返回 429（buildErrorBody，硬性规则 #12）
      → 如果允许 + 降低优先级 → 在候选项上设置 quotaSoftPenalty=true
  → executor.execute()
```

**故障开放**：如果 `enforceQuotaShare` 抛出异常，则允许请求通过，
并记录 `pino.warn` 日志。这可防止配额引擎错误阻止所有
流量。

### POST 钩子（记录消耗）

成功响应后：

```
执行器返回成功
  → spendRecorder.recordConsumption(apiKeyId, connectionId, provider, actualCost)
      → 每个维度调用 getQuotaStore().consume()
      → 故障开放：错误记录为 pino.warn，绝不传播给客户端
```

**漂移说明**：如果响应后 `consume` 失败，滚动计数器会少计。
来自提供者的饱和度信号（例如 `anthropic-ratelimit-unified-5h-utilization`）
将在下一个请求中修正全局估算值。

### 组合软惩罚（`open-sse/services/combo.ts`）

当 `decision.deprioritize === true` 时：

```ts
if (candidate.quotaSoftPenalty) {
  score *= QUOTA_SOFT_DEPRIORITIZE_FACTOR; // 默认值为 0.7
}
```

该惩罚会在所有其他评分因子之后应用。它会降低自动组合选择已饱和密钥的
概率，但不会硬性阻止该密钥。

## UI 操作指南

### `/dashboard/costs/quota-share` — 主池页面

组件（均位于 `src/app/(dashboard)/dashboard/costs/quota-share/`）：

| 组件                   | 用途                                                     |
| ---------------------- | -------------------------------------------------------- |
| `QuotaConceptCard`     | 向新用户说明配额共享的介绍卡片                           |
| `CreatePoolModal`      | 创建新的配额池（连接 + 名称 + 初始分配）                 |
| `PoolCard`             | 各配额池摘要：名称、连接、分配数量                       |
| `DimensionBar`         | 各维度堆叠条形图：每个键的份额 + 全局使用量              |
| `AllocationTable`      | 包含已消耗量、公平份额、欠额/盈余和借用标志的表格        |
| `BurnRateChart`        | EMA 消耗速率折线图（通过 `dynamic()` 延迟加载 Recharts） |
| `EditAllocationsModal` | 编辑配额池的分配权重、上限和策略                         |

页面钩子：

- `usePools` — 每 30 秒获取一次 `GET /api/quota/pools`。
- `usePoolUsage` — 按需获取 `GET /api/quota/pools/[id]/usage`。
- `useLocalStoragePoolMigration` — 挂载时运行一次，用于迁移旧版 LS 数据。

### `/dashboard/costs/quota-share/plans` — 提供者套餐配置

- `ProviderPlanConfigClient.tsx`：用于选择提供者、查看解析后的套餐（从目录自动获取或手动覆盖）以及编辑维度的下拉菜单。
- 更改将写入 `PUT /api/quota/plans/[connectionId]`。
- 删除后将恢复为目录中的套餐或空套餐。

---

## 环境变量

| 变量                               | 默认值   | 说明                                               |
| ---------------------------------- | -------- | -------------------------------------------------- |
| `QUOTA_STORE_DRIVER`               | `sqlite` | 要使用的驱动程序：`sqlite` 或 `redis`              |
| `QUOTA_STORE_REDIS_URL`            | _（空）_ | Redis URL，例如 `redis://localhost:6379`           |
| `QUOTA_SATURATION_THRESHOLD`       | `0.5`    | 0..1；`>= threshold` 时启用严格模式                |
| `QUOTA_SOFT_DEPRIORITIZE_FACTOR`   | `0.7`    | 0..1；软策略组合得分的乘数                         |
| `QUOTA_CONSUMPTION_RETENTION_DAYS` | `14`     | GC 删除旧 `quota_consumption` 存储桶之前的保留天数 |

数据库设置（`quotaStore.*`）会覆盖环境变量。

---

## 故障排除

### 已配置 Redis 但无法连接

检查是否已安装 `ioredis`（`npm ls ioredis`），并确认 `QUOTA_STORE_REDIS_URL` 可访问。连接失败时，工厂会回退到 SQLite（以 `warn` 级别记录）。

### `peek` 返回过时结果/失效时放行

如果 `peek` 抛出异常，`enforceQuotaShare` 会将结果视为“允许”（失效时放行）。检查 `pino` 日志中的 `quota:enforce` 和 `quota:factory` 条目以确定根本原因。

### 消耗计数器偏移

如果提供者的实际使用量与计数器不同，这是预期现象——双桶滑动窗口在窗口边界处约有 1% 的误差，并且 `consume` 是响应后即发即弃的操作。饱和度信号（`saturationSignals.ts`）会以 30 秒 TTL 读取提供者的实际利用率，并相应调整 `globalUsedPercent`。

### 配额池的消耗速率显示“无数据”

`computeBurnRate` 至少需要 2 个历史样本。此前未调用过 `consume` 的新配额池将显示 `tokensPerSecond: 0` 和 `timeToExhaustionMs: null`。

---

## 从 localStorage 迁移

首次加载 `/dashboard/costs/quota-share` 时，hook `useLocalStoragePoolMigration`
会检查：

1. `localStorage.getItem("omniroute:quota-share:pools")` 非空。
2. `GET /api/quota/pools` 返回 `[]`（DB 为空）。

如果两个条件均为真，则会将每个旧版池批量提交到 `POST /api/quota/pools`，
然后移除 localStorage 键。该迁移具有幂等性：条件 2 可防止
重复迁移。

---

## 内部策略分类

`quota-share` 是一种**仅供内部使用**的路由策略（位于
`src/shared/constants/routingStrategies.ts` 中的 `INTERNAL_ROUTING_STRATEGY_VALUES`）。
它仅由系统生成的 `qtSd/` 池组合使用，并被特意排除在 `ROUTING_STRATEGY_VALUES`
之外，因此永远不会在 UI 或 API 中作为用户可选选项出现。

---

## 测试覆盖

配额共享引擎提供两层自动化测试覆盖：

| 测试套件              | 命令                                                                   | 覆盖内容                                                                                                                                                           |
| :-------------------- | :--------------------------------------------------------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 单元测试（29 项测试） | `node --import tsx/esm --test tests/unit/quota-share-strategy.test.ts` | DRR 调度器、饱和度门控、并发上限、fairShare 计算、积压队列                                                                                                         |
| 集成矩阵              | `npm run test:combo:matrix`                                            | 通过真实组合流水线进行端到端路由决策；通过实时接入点（`registerQuotaFetcher`、`setLKGP`、`__setHeadroomSaturationFetcherForTests`）验证 DRR 公平性和饱和度降优先级 |

集成矩阵会在 CI 中与全部 19 种公共策略一同运行。单元测试套件
可以独立运行。

---

## DB 架构摘要

迁移 `078`、`079` 和 `085` 新增了三个表：

- `quota_pools` + `quota_allocations` — 池定义及每个键的分配。
- `quota_consumption` — 每个 `(apiKeyId, dimensionKey)` 的滚动双桶计数器。
- `provider_plans` — 手动提供者套餐覆盖配置（每个 connectionId 的维度 JSON）。

所有表均通过幂等的 `CREATE TABLE IF NOT EXISTS` 迁移添加。
