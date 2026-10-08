# Gamification & Leaderboard System (中文 (简体))

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/GAMIFICATION.md) · 🇪🇹 [am](../../../am/docs/frameworks/GAMIFICATION.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/GAMIFICATION.md) · 🇦🇿 [az](../../../az/docs/frameworks/GAMIFICATION.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/GAMIFICATION.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/GAMIFICATION.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/GAMIFICATION.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/GAMIFICATION.md) · 🇩🇰 [da](../../../da/docs/frameworks/GAMIFICATION.md) · 🇩🇪 [de](../../../de/docs/frameworks/GAMIFICATION.md) · 🇬🇷 [el](../../../el/docs/frameworks/GAMIFICATION.md) · 🇪🇸 [es](../../../es/docs/frameworks/GAMIFICATION.md) · 🇪🇪 [et](../../../et/docs/frameworks/GAMIFICATION.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/GAMIFICATION.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/GAMIFICATION.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/GAMIFICATION.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/GAMIFICATION.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/GAMIFICATION.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/GAMIFICATION.md) · 🇮🇱 [he](../../../he/docs/frameworks/GAMIFICATION.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/GAMIFICATION.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/GAMIFICATION.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/GAMIFICATION.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/GAMIFICATION.md) · 🇮🇩 [id](../../../id/docs/frameworks/GAMIFICATION.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/GAMIFICATION.md) · 🇮🇹 [it](../../../it/docs/frameworks/GAMIFICATION.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/GAMIFICATION.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/GAMIFICATION.md) · 🇰🇭 [km](../../../km/docs/frameworks/GAMIFICATION.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/GAMIFICATION.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/GAMIFICATION.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/GAMIFICATION.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/GAMIFICATION.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/GAMIFICATION.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/GAMIFICATION.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/GAMIFICATION.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/GAMIFICATION.md) · 🇲🇲 [my](../../../my/docs/frameworks/GAMIFICATION.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/GAMIFICATION.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/GAMIFICATION.md) · 🇳🇴 [no](../../../no/docs/frameworks/GAMIFICATION.md) · 🇮🇳 [or](../../../or/docs/frameworks/GAMIFICATION.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/GAMIFICATION.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/GAMIFICATION.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/GAMIFICATION.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/GAMIFICATION.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/GAMIFICATION.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/GAMIFICATION.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/GAMIFICATION.md) · 🇱🇰 [si](../../../si/docs/frameworks/GAMIFICATION.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/GAMIFICATION.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/GAMIFICATION.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/GAMIFICATION.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/GAMIFICATION.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/GAMIFICATION.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/GAMIFICATION.md) · 🇮🇳 [te](../../../te/docs/frameworks/GAMIFICATION.md) · 🇹🇭 [th](../../../th/docs/frameworks/GAMIFICATION.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/GAMIFICATION.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/GAMIFICATION.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/GAMIFICATION.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/GAMIFICATION.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/GAMIFICATION.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/GAMIFICATION.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/GAMIFICATION.md)

---

> **事实来源：** `src/lib/gamification/`、`src/lib/db/gamification.ts`、`src/app/api/gamification/`
> **最后更新：** 2026-06-28 — v3.8.40

OmniRoute 包含一个本地优先的游戏化层，通过奖励用户与平台的互动行为——发起请求、切换提供者、创建组合、分享令牌以及为社区做贡献——来提升参与度。所有状态均存储在 SQLite 中；与社区服务器的联邦互通由用户选择启用，并采用推送模式。

该系统旨在实现**热路径零延迟**——游戏化事件从请求管线中以触发后不等待的方式分派，绝不会阻塞 LLM 响应。

---

## 概述

### 目的

通过提供可见的进度（XP、等级、徽章）、社会认同（排行榜）和经济激励（令牌分享、邀请奖励），提高用户参与度和留存率。

### 范围

| 功能       | 描述                                             |
| ---------- | ------------------------------------------------ |
| XP 与等级  | 每次操作赚取 XP；按照多项式曲线升级              |
| 徽章       | 5 个类别中的 20 多项成就，分为 4 个稀有度等级    |
| 连续活跃   | 跟踪每日活跃使用情况，包括当前和最长连续活跃天数 |
| 排行榜     | 全局、每周、每月、令牌分享和贡献范围             |
| 令牌分享   | 通过复式记账账本在用户之间转移额度               |
| 邀请与兑换 | 使用 SHA-256 哈希存储的推荐码                    |
| 社区服务器 | 与外部 OmniRoute 实例进行联邦互通                |
| 反作弊     | 服务端评分、速率限制和 z-score 异常检测          |

### 设计原则

1. **本地优先**——所有状态均存储在 SQLite 中，无需外部服务。
2. **非阻塞**——事件采用触发后不等待的方式处理；LLM 响应路径绝不会因游戏化逻辑而延迟。
3. **服务端权威**——XP 仅在服务端计算；客户端无法虚增分数。
4. **尊重隐私**——排行榜参与由用户选择启用；用户可以隐藏自己的个人资料。
5. **联邦互通就绪**——社区服务器可通过签名 API 推送分数；同步采用覆盖而非累加方式。

---

## 架构

### 高层流程

```
客户端请求
  → /v1/chat/completions
    → handleChatCore()                      [open-sse/handlers/chatCore.ts]
      → ...（现有管线）...
      → 向客户端发送上游响应
      → setImmediate（触发后不等待）：
        → emitGamificationEvent()           [src/lib/gamification/events.ts]
          → awardXp()                       [src/lib/gamification/xp.ts]
          → updateStreak()                  [src/lib/gamification/streaks.ts]
          → evaluateBadges()                [src/lib/gamification/badges.ts]
          → updateLeaderboard()             [src/lib/gamification/leaderboard.ts]
          → checkAnomalies()                [src/lib/gamification/antiCheat.ts]
```

事件发射器是唯一的集成点。`chatCore.ts` 在响应发送后调用 `emitGamificationEvent()`；事件模块随后将处理分发给 XP、连续活跃、徽章、排行榜和反作弊子系统。

### 模块依赖关系图

```
src/lib/gamification/
  events.ts          ← 入口点（由 chatCore.ts 调用）
    ├── xp.ts        ← XP 计算与等级解析
    ├── streaks.ts   ← 每日活跃连续记录跟踪
    ├── badges.ts    ← 徽章条件评估
    ├── leaderboard.ts ← 排名计算与 SSE 广播
    ├── antiCheat.ts ← 速率限制与异常检测
    ├── sharing.ts   ← 令牌转移账本
    ├── invites.ts   ← 邀请码/兑换码管理
    ├── servers.ts   ← 社区服务器联邦互通
    └── notifications.ts ← SSE 通知流

src/lib/db/
  gamification.ts    ← 所有 CRUD 操作（8 个表）

src/app/api/gamification/
  leaderboard/       ← GET 排名，POST 手动刷新
  leaderboard/stream ← SSE 实时更新
  transfer/          ← GET 历史记录，POST 发送令牌
  invite/            ← GET/POST 代码，DELETE 撤销
  invite/redeem/     ← POST 兑换代码
  servers/           ← GET/POST/DELETE 社区服务器
  federation/score/  ← POST 将分数推送至服务器
  federation/leaderboard/ ← GET 从服务器拉取排行榜
  notifications/     ← SSE 徽章/升级通知
  anomalies/         ← GET 异常报告（管理员）
  rotate/            ← POST 轮换邀请令牌密钥
```

---

## 数据层

### 数据库表

所有表均位于 OmniRoute 主 SQLite 数据库中，由迁移
`060_create_gamification.sql` 创建。WAL 日志模式继承自
`src/lib/db/core.ts` 中的单例 `getDbInstance()`。

```
┌─────────────────────────┐     ┌──────────────────────────┐
│      leaderboard        │     │      user_levels          │
├─────────────────────────┤     ├──────────────────────────┤
│ id            TEXT PK   │     │ api_key_id    TEXT PK    │
│ api_key_id    TEXT      │     │ xp            INTEGER    │
│ scope         TEXT      │     │ level         INTEGER    │
│ score         INTEGER   │     │ title         TEXT       │
│ period        TEXT      │     │ updated_at    TEXT       │
│ updated_at    TEXT      │     └──────────────────────────┘
└─────────────────────────┘
                │
                │ 1:N
                ▼
┌─────────────────────────┐     ┌──────────────────────────┐
│     user_badges         │     │    badge_definitions      │
├─────────────────────────┤     ├──────────────────────────┤
│ id            TEXT PK   │     │ id            TEXT PK    │
│ api_key_id    TEXT      │     │ name          TEXT       │
│ badge_id      TEXT FK   │     │ category      TEXT       │
│ earned_at     TEXT      │     │ rarity        TEXT       │
│ notified      INTEGER   │     │ criteria_type TEXT       │
└─────────────────────────┘     │ criteria      TEXT(JSON) │
                                │ description   TEXT       │
                                │ icon          TEXT       │
                                │ hidden        INTEGER    │
                                └──────────────────────────┘

┌─────────────────────────┐     ┌──────────────────────────┐
│     xp_audit_log        │     │     token_ledger         │
├─────────────────────────┤     ├──────────────────────────┤
│ id            TEXT PK   │     │ id            TEXT PK    │
│ api_key_id    TEXT      │     │ from_key_id   TEXT       │
│ action        TEXT      │     │ to_key_id     TEXT       │
│ xp_awarded    INTEGER   │     │ amount        INTEGER    │
│ metadata      TEXT(JSON)│     │ idempotency_key TEXT UQ  │
│ created_at    TEXT      │     │ created_at    TEXT       │
└─────────────────────────┘     └──────────────────────────┘

┌─────────────────────────┐     ┌──────────────────────────┐
│    invite_tokens        │     │   community_servers      │
├─────────────────────────┤     ├──────────────────────────┤
│ id            TEXT PK   │     │ id            TEXT PK    │
│ api_key_id    TEXT      │     │ name          TEXT       │
│ code          TEXT UQ   │     │ url           TEXT       │
│ token_hash    TEXT      │     │ token_hash    TEXT       │
│ uses          INTEGER   │     │ status        TEXT       │
│ max_uses      INTEGER   │     │ last_sync     TEXT       │
│ created_at    TEXT      │     │ created_at    TEXT       │
│ expires_at    TEXT      │     └──────────────────────────┘
└─────────────────────────┘
```

### 领域模块：`src/lib/db/gamification.ts`

遵循标准的 OmniRoute 模式——从 `core.ts` 导入 `getDbInstance()`，
并导出带类型的 CRUD 函数。路由处理程序中不包含原始 SQL。

关键函数：

| 函数                       | 说明                                              |
| -------------------------- | ------------------------------------------------- |
| `upsertLeaderboardEntry()` | 插入或更新 (api_key_id, scope, period) 对应的分数 |
| `getLeaderboard()`         | 获取指定 scope/period 的分页排名                  |
| `getUserLevel()`           | 获取或创建用户等级记录                            |
| `updateUserLevel()`        | 以原子方式设置 XP、等级和头衔                     |
| `getBadgeDefinitions()`    | 获取所有徽章定义（可选筛选）                      |
| `getUserBadges()`          | 获取用户已获得的徽章                              |
| `awardBadge()`             | 插入徽章获取记录（基于 badge_id 保证幂等）        |
| `logXpAction()`            | 追加记录到 xp_audit_log                           |
| `getXpAuditLog()`          | 获取用户的分页审计历史                            |
| `insertLedgerEntry()`      | 双重记账转账（在事务中执行）                      |
| `getBalance()`             | 计算用户接收总额减去发送总额                      |
| `getTransferHistory()`     | 获取分页转账日志                                  |
| `createInviteToken()`      | 插入邀请码和哈希令牌                              |
| `redeemInviteToken()`      | 按代码查找、验证并递增使用次数                    |
| `upsertCommunityServer()`  | 注册或更新联邦服务器                              |
| `getCommunityServers()`    | 列出用户的服务器                                  |
| `deleteCommunityServer()`  | 删除服务器注册记录                                |

---

## XP / 等级系统

**文件：** `src/lib/gamification/xp.ts`

### 等级曲线

达到等级 `n` 所需的 XP 遵循多项式曲线：

```
xp_for_level(n) = floor(100 * n^1.5)
```

| 等级 | 升至下一级所需 XP | 累计 XP   | 称号   |
| ---- | ----------------- | --------- | ------ |
| 1    | 100               | 100       | 初学者 |
| 5    | 1,118             | 2,415     | 初学者 |
| 10   | 3,162             | 10,523    | 探索者 |
| 25   | 12,500            | 86,024    | 探索者 |
| 50   | 35,355            | 345,529   | 专家   |
| 75   | 64,952            | 948,683   | 大师   |
| 100  | 100,000           | 2,050,000 | 传奇   |

### 称号

| 等级范围 | 称号   |
| -------- | ------ |
| 1 – 9    | 初学者 |
| 10 – 24  | 探索者 |
| 25 – 49  | 专家   |
| 50 – 74  | 大师   |
| 75 – 100 | 传奇   |

### XP 奖励

| 操作              | XP  | 描述                               |
| ----------------- | --- | ---------------------------------- |
| `request`         | 1   | 每个通过 OmniRoute 路由的 API 请求 |
| `provider_switch` | 5   | 切换到其他提供者                   |
| `model_switch`    | 3   | 切换到其他模型                     |
| `combo_create`    | 10  | 创建新组合                         |
| `combo_use`       | 2   | 在请求中使用组合                   |
| `token_share`     | 1   | 每与其他用户共享 1 000 个令牌      |
| `invite_redeem`   | 50  | 兑换邀请码                         |
| `daily_login`     | 5   | 每日活跃使用（每天一次）           |
| `streak_bonus`    | 2   | 每连续活跃一天（乘以连续活跃天数） |
| `badge_unlock`    | 10  | 解锁徽章                           |

### 授予流程

```typescript
export async function awardXp(
  apiKeyId: string,
  action: XpAction,
  metadata?: Record<string, unknown>
): Promise<{ xp: number; level: number; title: string; levelUp: boolean }>;
```

1. 查询 `XP_REWARDS[action]` 以获取 XP 数量。
2. 通过 `checkRateLimit()` 检查（防作弊：每个密钥每分钟最多获得 1000 XP）。
3. 开启事务：
   - 读取当前 `user_levels` 行。
   - 增加 XP；通过 `levelFromXp(totalXp)` 重新计算等级。
   - 如果等级发生变化，则设置 `levelUp = true`。
   - 更新 `user_levels` 行。
   - 插入 `xp_audit_log`。
4. 返回结果。调用方负责处理通知。

### 辅助函数：`levelFromXp(totalXp)`

遍历 1..100 级，累加 `xp_for_level(n)`，直到累计 XP
超过 `totalXp`。返回已达到阈值的最高等级。
其时间复杂度为 O(100)——由于等级上限为 100，因此可以接受。

---

## 徽章系统

**文件：** `src/lib/gamification/badges.ts`

### 类别

| 类别           | 描述                 | 徽章示例                           |
| -------------- | -------------------- | ---------------------------------- |
| `usage`        | 基于使用量的里程碑   | 首次请求、1K 次请求、100K 次请求   |
| `sharing`      | 令牌共享和推荐       | 首次分享、慷慨分享者（分享 10 次） |
| `contribution` | 社区参与             | 组合创建者、提供者探索者           |
| `streak`       | 持续活跃表现         | 周度勇士、月度奉献者               |
| `rare`         | 难以获得或隐藏的成就 | 早期采用者、错误报告者             |

### 稀有度

| 稀有度      | 颜色 | 概率提示     |
| ----------- | ---- | ------------ |
| `common`    | 灰色 | 大多数用户   |
| `uncommon`  | 绿色 | 活跃用户     |
| `rare`      | 蓝色 | 高投入用户   |
| `legendary` | 金色 | 前 1% 的用户 |

### 条件类型

| 类型           | 字段         | 描述                                      |
| -------------- | ------------ | ----------------------------------------- |
| `action_count` | `count`      | 执行操作 N 次（例如 1000 次请求）         |
| `streak`       | `days`       | 连续保持活跃 N 天                         |
| `unique_count` | `field`, `n` | 使用 N 个不同的值（例如 10 个不同的模型） |
| `rank`         | `scope`, `n` | 在某个排行榜范围内达到第 N 名             |
| `first`        | —            | 成为第一个执行某项操作的用户              |
| `hidden`       | （不固定）   | 获得之前不会显示条件                      |

徽章定义作为 JSON `criteria` 存储在 `badge_definitions` 中：

```json
{
  "type": "action_count",
  "action": "request",
  "count": 1000
}
```

### 评估流程

```
emitGamificationEvent(event)
  → evaluateBadges(apiKeyId, event)
    → getBadgeDefinitions()           # 所有定义
    → getUserBadges(apiKeyId)         # 已获得（跳过）
    → 对每个尚未获得的徽章：
       → matchesCriteria(badge, event, userState)
       → 如果匹配：awardBadge(apiKeyId, badgeId)
         → 返回通知载荷
```

评估采用**事件驱动**方式——它会在每个游戏化事件发生后运行，但
只检查 `criteria.type` 与事件操作相符的徽章。这使得评估速度保持较快（大多数事件小于 5ms）。

### `matchesCriteria(badge, event, userState)`

| 条件类型       | 检查                                           |
| -------------- | ---------------------------------------------- |
| `action_count` | `getActionCount(apiKeyId, action) >= count`    |
| `streak`       | `getCurrentStreak(apiKeyId) >= days`           |
| `unique_count` | `getUniqueCount(apiKeyId, field) >= n`         |
| `rank`         | `getRank(apiKeyId, scope) <= n`                |
| `first`        | 此操作类型在 `xp_audit_log` 中不存在先前的条目 |
| `hidden`       | 委托给相应的子检查                             |

### 内置徽章（20+）

<details>
<summary>完整徽章列表</summary>

| 徽章         | 类别     | 稀有度 | 条件                   |
| ------------ | -------- | ------ | ---------------------- |
| 初试身手     | 使用量   | 普通   | 1 次请求               |
| 渐入佳境     | 使用量   | 普通   | 100 次请求             |
| 高级用户     | 使用量   | 罕见   | 1,000 次请求           |
| 百夫长       | 使用量   | 稀有   | 10,000 次请求          |
| 全能之力     | 使用量   | 传奇   | 100,000 次请求         |
| 提供者探索者 | 贡献     | 普通   | 使用 5 个不同的提供者  |
| 提供者大师   | 贡献     | 罕见   | 使用 20 个不同的提供者 |
| 组合架构师   | 贡献     | 罕见   | 创建 5 个组合          |
| 组合宗师     | 贡献     | 稀有   | 创建 25 个组合         |
| 首次分享     | 分享     | 普通   | 1 次代币转账           |
| 慷慨之人     | 分享     | 罕见   | 10 次代币转账          |
| 慈善家       | 分享     | 稀有   | 累计转账 10,000 枚代币 |
| 推荐人       | 分享     | 普通   | 1 次成功推荐           |
| 人脉构建者   | 分享     | 罕见   | 10 次成功推荐          |
| 连续一周达人 | 连续使用 | 罕见   | 连续使用 7 天          |
| 月度坚守者   | 连续使用 | 稀有   | 连续使用 30 天         |
| 势不可挡     | 连续使用 | 传奇   | 连续使用 365 天        |
| 早期采用者   | 稀有     | 传奇   | 在测试期加入           |
| 压缩先锋     | 稀有     | 罕见   | 使用压缩功能 100 次    |
| 技能收藏家   | 稀有     | 稀有   | 使用 10 种不同的技能   |
| 模型探索者   | 贡献     | 罕见   | 使用 15 个不同的模型   |

</details>

---

## 连续记录追踪器

**文件：** `src/lib/gamification/streaks.ts`

### 数据模型

连续记录存储在 `key_value` 表（共享工具表）中，并使用带命名空间的键：

| 键                            | 值                               | 描述             |
| ----------------------------- | -------------------------------- | ---------------- |
| `gamification:streak:{keyId}` | `{current},{longest},{lastDate}` | 活跃连续记录数据 |

### 逻辑

```typescript
export async function updateStreak(
  apiKeyId: string
): Promise<{ current: number; longest: number; milestone: boolean }>;
```

1. 从 `key_value` 读取连续记录。
2. 解析 `{current}`、`{longest}`、`{lastDate}`（ISO 日期字符串）。
3. 如果 `lastDate === today`——不做更改（今天已计数）。
4. 如果 `lastDate === yesterday`——递增 `current`；必要时更新 `longest`。
5. 如果 `lastDate < yesterday`——重置 `current = 1`（连续记录已中断）。
6. 写入更新后的记录。
7. 检查里程碑：7、14、30、60、90、180、365 天。如果跨越了里程碑，则设置
   `milestone = true`（调用方奖励 XP 并检查徽章）。

### 边界情况

- **时区**：连续记录使用 UTC 日期（`new Date().toISOString().slice(0, 10)`）。
  这是有意为之——使用单一的规范时区可防止通过切换时区进行操纵。
- **新用户**：不存在连续记录；首次请求会创建记录，并设置
  `current=1, longest=1, lastDate=today`。
- **每天多次请求**：仅 UTC 当天的第一次请求会递增连续记录。

---

## 排行榜

**文件：** `src/lib/gamification/leaderboard.ts`

### 范围

| 范围            | 周期    | 描述                                            |
| --------------- | ------- | ----------------------------------------------- |
| `global`        | `all`   | 所有时间累计的 XP                               |
| `weekly`        | `week`  | 当前 UTC 周内（周一至周日）获得的 XP            |
| `monthly`       | `month` | 当前 UTC 月内获得的 XP                          |
| `tokens_shared` | `all`   | 转移给其他人的 token 总数                       |
| `contributions` | `all`   | 创建的 combo 数 + 使用的提供者数 + 使用的技能数 |

### 排名计算

排名在**读取时计算**，而不是存储。这可以避免排名数据过期，
并且无需定期执行排名重新计算任务。

```typescript
export async function getLeaderboard(
  scope: LeaderboardScope,
  period: string,
  limit: number,
  offset: number
): Promise<{ entries: LeaderboardEntry[]; total: number }>;
```

查询模式：

```sql
SELECT api_key_id, score,
       RANK() OVER (ORDER BY score DESC) as rank
FROM leaderboard
WHERE scope = ? AND period = ?
ORDER BY score DESC
LIMIT ? OFFSET ?
```

### 周期轮换

每周和每月排行榜会自动轮换：

1. **归档**：在周期边界，将当前条目连同周期标签复制到
   `leaderboard_archive`。
2. **重置**：删除已过期周期的条目。
3. **触发**：每次调用 `updateLeaderboard()` 时都会进行检查；新周期的第一次请求
   会触发轮换。

这可确保每周排行榜在每周一 UTC 00:00 重置，每月排行榜在每月 1 日重置。

### SSE 实时更新

**端点：** `GET /api/gamification/stream`

```
客户端 → GET /api/gamification/stream
  → 建立 SSE 连接
  → 服务器立即发送排行榜前 10 名的快照
  → 每 5 秒：如果有变化，则推送更新后的前 10 名
  → 每 15 秒：发送心跳注释（": heartbeat\n\n"）
  → 客户端断开连接 → 清理（移除监听器）
```

事件格式：

```
event: leaderboard
data: {"scope":"global","entries":[...]}

event: leaderboard
data: {"scope":"weekly","entries":[...]}

: heartbeat
```

SSE 管理器按范围跟踪已连接的客户端，并且仅在排行榜数据自上次推送以来
确实发生变化时才发送更新。

---

## 代币分享

**文件：** `src/lib/gamification/sharing.ts`

### 复式记账

每次转账都会在 `token_ledger` 中创建两行：

| 行   | `from_key_id` | `to_key_id` | `amount` |
| ---- | ------------- | ----------- | -------- |
| 借记 | 发送方        | 接收方      | +amount  |
| 贷记 | 接收方        | 发送方      | -amount  |

等等——实际约定如下：

| 行   | `from_key_id` | `to_key_id` | `amount` | 含义         |
| ---- | ------------- | ----------- | -------- | ------------ |
| 发送 | 发送方        | 接收方      | +amount  | 从发送方流出 |
| 接收 | 接收方        | 发送方      | +amount  | 流入接收方   |

余额的计算方式如下：

```sql
SELECT
  COALESCE(SUM(CASE WHEN to_key_id = ? THEN amount ELSE 0 END), 0)
  - COALESCE(SUM(CASE WHEN from_key_id = ? THEN amount ELSE 0 END), 0)
  AS balance
FROM token_ledger
WHERE from_key_id = ? OR to_key_id = ?
```

### 转账流程

```typescript
export async function transferTokens(
  fromKeyId: string,
  toKeyId: string,
  amount: number,
  idempotencyKey: string
): Promise<{ success: boolean; balance: number }>;
```

1. **验证**：`amount > 0`、`fromKeyId !== toKeyId`。
2. **幂等性**：检查账本中是否已存在 `idempotency_key`。
   如果存在，则返回缓存的结果。
3. **事务**（单个 SQLite 事务）：
   a. 计算发送方余额。
   b. 如果 `balance < amount`，则中止（余额不足）。
   c. 插入发送行（`from=sender,`。

### 速率限制

- 每个 API 密钥每分钟最多转账 10 次。
- 单次转账最多 10,000 个代币。
- 每个 API 密钥每天最多转账 100,000 个代币。

---

## 邀请与兑换代币

**文件：** `src/lib/gamification/invites.ts`

### 代码格式

- **代码**：8 个字符的字母数字组合（例如 `A3K9-X7M2`），便于阅读，
  向用户显示。
- **令牌**：32 字节随机令牌，以 SHA-256 哈希形式存储。用于
  程序化兑换（例如 URL 链接）。

### 存储

| 列           | 值                         |
| ------------ | -------------------------- |
| `code`       | `A3K9X7M2`（唯一，已索引） |
| `token_hash` | SHA-256(raw_token)         |

原始令牌仅在创建时向用户返回一次。此后，OmniRoute
不会再次存储或显示该令牌——仅保留其哈希值。

### 防止自我推荐

当用户兑换代码时，系统会检查：

1. 该代码属于另一个 `api_key_id`。
2. 兑换用户此前未兑换过来自同一
   推荐人的任何代码（通过 `invite_tokens` + 兑换日志进行连接查询）。

如果任一检查失败，兑换将被拒绝，并返回清晰的错误消息。

### 有效期与限制

- 默认 `max_uses`：10（可在创建时配置）。
- 默认 `expires_at`：自创建之日起 30 天。
- 已过期或使用次数已耗尽的代码返回 HTTP 410 Gone。

---

## 社区服务器联邦

**文件：** `src/lib/gamification/servers.ts`

### 连接

社区服务器通过远程服务器签发的邀请令牌进行注册。本地实例：

1. 接收邀请令牌（例如，粘贴到仪表板中）。
2. 调用远程服务器上的 `POST /api/gamification/federation/leaderboard`，以验证令牌并获取当前排行榜。
3. 使用 `status: connected` 存储服务器记录。

### 同步模型

联邦使用**覆盖同步**，而非增量同步：

```
本地实例                         社区服务器
     │                              │
     ├── 推送分数 ─────────────────►│  POST /federation/score
     │   { api_key_id, score }      │  （服务器验证令牌哈希）
     │                              │
     ├── 拉取排行榜 ───────────────►│  GET /federation/leaderboard
     │◄── 前 N 条记录 ──────────────┤  （覆盖本地缓存）
     │                              │
     └── 健康检查 ─────────────────►│  GET /federation/health
         （每 60 秒一次，超时 5 秒） │
```

### 身份验证

联邦请求包含：

```
Authorization: Bearer <raw_token>
X-Federation-Version: 1
```

远程服务器对令牌进行哈希处理，并查找匹配的 `community_servers` 行。这样可避免传输已存储的哈希值。

### 健康监控

每条服务器记录都会跟踪：

| 字段        | 说明                                   |
| ----------- | -------------------------------------- |
| `status`    | `connected`、`degraded`、`unreachable` |
| `last_sync` | 上次成功同步的 ISO 时间戳              |
| `failures`  | 连续健康检查失败次数                   |

连续失败 5 次后，状态将更改为 `unreachable`，并暂停同步，直到手动健康检查成功。

---

## 反作弊

**文件：** `src/lib/gamification/antiCheat.ts`

### 服务端计分

所有 XP 计算均在 `src/lib/gamification/xp.ts` 中进行。客户端绝不会提交分数——它们提交操作，由服务器计算 XP。`leaderboard.score` 列只能由服务端代码写入。

### 速率限制

| 限制               | 值      | 作用域        |
| ------------------ | ------- | ------------- |
| 每分钟最大 XP      | 1,000   | 每个 API 密钥 |
| 每分钟最大转账次数 | 10      | 每个 API 密钥 |
| 单次转账最大金额   | 10,000  | 每次转账      |
| 每日最大转账金额   | 100,000 | 每个 API 密钥 |

速率限制使用内存中的滑动窗口（与 `open-sse/services/` 中的 `RateLimitManager` 采用相同模式）。如果进程重启，则回退到由 SQLite 支持的计数器。

### Z 分数异常检测

对于每个 API 密钥，系统会维护一个滚动的 7 天窗口，记录每小时获得的 XP。每次授予 XP 时：

1. 计算用户当前每小时的 XP 获取速率。
2. 计算总体均值和标准差。
3. 计算 `z = (user_rate - mean) / stddev`。
4. 如果 `z > 3.0`（3 个标准差），则标记为异常。

异常会记录到 `xp_audit_log` 中，其中 `action = 'anomaly_detected'`，并显示在管理员仪表板上。

### 审计追踪

每次 XP 授予、转账、徽章获取和异常检测都会记录到 `xp_audit_log` 中，其中包含：

| 字段         | 说明                                         |
| ------------ | -------------------------------------------- |
| `api_key_id` | 操作者                                       |
| `action`     | 发生的操作（xp_award、transfer、anomaly、…） |
| `xp_awarded` | 数量（非 XP 事件为 0）                       |
| `metadata`   | 包含上下文的 JSON（操作类型、目标、…）       |
| `created_at` | 时间（ISO 8601）                             |

管理员可以通过 `GET /api/gamification/anomalies` 查询完整的审计追踪记录。

---

## API 路由

所有路由均遵循标准的 OmniRoute 模式：

```
路由 → CORS 预检 → 请求体验证 (Zod) → 身份验证 (extractApiKey)
  → 处理程序
```

### 端点

| 方法   | 路径                                       | 描述                           | 身份验证 |
| ------ | ------------------------------------------ | ------------------------------ | -------- |
| GET    | `/api/gamification/leaderboard`            | 获取排行榜（范围、周期、分页） | 可选     |
| POST   | `/api/gamification/leaderboard`            | 强制刷新排行榜缓存             | 必需     |
| GET    | `/api/gamification/stream`                 | SSE 实时排行榜更新             | 可选     |
| GET    | `/api/gamification/transfer`               | 获取转账历史记录（分页）       | 必需     |
| POST   | `/api/gamification/transfer`               | 向其他用户发送代币             | 必需     |
| GET    | `/api/gamification/invite`                 | 列出我的邀请码                 | 必需     |
| POST   | `/api/gamification/invite`                 | 生成新的邀请码                 | 必需     |
| DELETE | `/api/gamification/invite`                 | 撤销邀请码                     | 必需     |
| POST   | `/api/gamification/invite/redeem`          | 兑换邀请码                     | 必需     |
| GET    | `/api/gamification/servers`                | 列出社区服务器                 | 必需     |
| POST   | `/api/gamification/servers`                | 连接到社区服务器               | 必需     |
| DELETE | `/api/gamification/servers`                | 断开与社区服务器的连接         | 必需     |
| POST   | `/api/gamification/federation/score`       | 将分数推送到远程服务器         | 联邦认证 |
| GET    | `/api/gamification/federation/leaderboard` | 从远程服务器拉取排行榜         | 联邦认证 |
| GET    | `/api/gamification/notifications`          | SSE 徽章/升级通知              | 必需     |
| GET    | `/api/gamification/anomalies`              | 查看异常报告（管理员）         | 管理员   |
| POST   | `/api/gamification/rotate`                 | 轮换邀请令牌密钥               | 必需     |

### 请求/响应示例

**POST /api/gamification/transfer**

```json
// 请求
{
  "to": "recipient-api-key-id",
  "amount": 500,
  "idempotencyKey": "uuid-v4"
}

// 响应 200
{
  "success": true,
  "transfer": {
    "id": "txn-uuid",
    "from": "sender-api-key-id",
    "to": "recipient-api-key-id",
    "amount": 500,
    "createdAt": "2026-05-19T12:00:00.000Z"
  },
  "balance": 2500
}

// 响应 400（余额不足）
{
  "error": "余额不足",
  "balance": 200,
  "requested": 500
}
```

**GET /api/gamification/leaderboard?scope=weekly&limit=10**

```json
{
  "scope": "weekly",
  "period": "2026-W20",
  "entries": [
    {
      "rank": 1,
      "apiKeyId": "key-uuid",
      "displayName": "User***1234",
      "score": 15230,
      "level": 42,
      "title": "专家"
    }
  ],
  "total": 847,
  "updatedAt": "2026-05-19T12:00:00.000Z"
}
```

---

## MCP 工具 (8)

与现有工具一起注册在 `open-sse/mcp-server/` 中。受
`gamification` 权限范围约束。

| 工具                       | 描述                              | 输入模式                     |           |
| -------------------------- | --------------------------------- | ---------------------------- | --------- |
| `gamification_leaderboard` | 获取指定范围/周期的排行榜         | `{ scope, period?, limit? }` |
| `gamification_rank`        | 获取调用者的排名及相邻排名        | `{ scope }`                  |
| `gamification_profile`     | 获取 XP、等级、称号和连续记录摘要 | `{}`                         |
| `gamification_badges`      | 列出已获得的徽章或所有徽章定义    | `{ earned?: boolean }`       |
| `gamification_transfer`    | 向另一用户发送代币                | `{ to, amount }`             |
| `gamification_invite`      | 生成或列出邀请码                  | `{ action: "create"          | "list" }` |
| `gamification_servers`     | 列出或连接社区服务器              | `{ action, token? }`         |
| `gamification_anomalies`   | 查看异常报告（管理员权限范围）    | `{ limit?, since? }`         |

---

## 仪表板页面

### `/dashboard/leaderboard`

- 领奖台展示（排名前三的用户及其头像和 XP）。
- 范围选择器：全局 / 每周 / 每月 / 已分享代币 / 贡献。
- 分页表格（每页 25 条），包含排名、姓名、分数、等级和称号。
- SSE 实时更新——排名变化时显示动画。
- 当前用户在表格中突出显示，并提供“你的排名”固定行。

### `/dashboard/profile`

- XP 进度条，显示当前等级和下一级阈值。
- 醒目显示称号徽章。
- 徽章库——已获得的徽章显示获得日期，未获得的徽章显示为灰色
  （隐藏徽章在获得前显示为“???”）。
- 带火焰图标的连续记录计数器；连续记录日历（最近 30 天）。
- XP 历史图表（最近 30 天的每日 XP）。

### `/dashboard/tokens`

- 代币余额（醒目显示在页面顶部）。
- 转账表单：接收者、金额、确认对话框。
- 带筛选条件（已发送/已接收/全部）的转账历史记录表格。
- 邀请部分：有效邀请码、生成新邀请码、分享链接。
- 社区服务器：显示健康状态的列表，以及连接/断开连接操作。

### `/dashboard/gamification/admin`

- 异常列表，包含严重性、用户、时间戳和 z-score。
- 带筛选条件（操作类型、用户、日期范围）的审计日志查看器。
- 系统统计信息：已授予的 XP 总量、活跃用户数、徽章获得率。
- 联邦服务器健康状况概览。

---

## 流水线集成

### 集成点

游戏化功能在请求流水线的单一位置接入，
该位置位于 `open-sse/handlers/chatCore.ts`：

```typescript
// 响应发送给客户端后：
setImmediate(() => {
  emitGamificationEvent({
    type: "request.completed",
    apiKeyId,
    metadata: {
      provider: selectedProvider,
      model: selectedModel,
      comboId: resolvedCombo?.id,
      compressionUsed: compressionStats?.applied,
      skillUsed: skillExecution?.name,
    },
  }).catch(() => {
    // 即发即弃：记录日志，但绝不传播给客户端
  });
});
```

### 事件类型

| 事件类型            | 触发时机                         |
| ------------------- | -------------------------------- |
| `request.completed` | 成功的 LLM 响应已发送            |
| `provider.switch`   | 提供者发生变更（组合回退也计入） |
| `combo.created`     | 新的组合配置已保存               |
| `combo.used`        | 成功命中组合目标                 |
| `badge.earned`      | 徽章评估发现匹配项               |
| `streak.milestone`  | 跨过连续记录阈值                 |
| `transfer.sent`     | 代币转账完成                     |
| `referral.redeemed` | 邀请码成功兑换                   |
| `compression.used`  | 已应用提示词压缩                 |
| `skill.executed`    | 技能执行完成                     |
| `model.first_use`   | 模型在过去 7 天内未被使用        |

### 非阻塞保证

`setImmediate` + `.catch(() => {})` 模式可确保：

1. 在游戏化逻辑运行前，响应已完整发送。
2. 游戏化错误绝不会暴露给客户端。
3. 事件处理在下一个微任务中运行，而不是内联运行。

---

## 安全性

### 威胁模型

| 威胁               | 缓解措施                                    |
| ------------------ | ------------------------------------------- |
| 分数膨胀           | 仅在服务端计算 XP；客户端提交操作，而非分数 |
| 重放攻击           | 转账使用幂等键；审计日志去重                |
| 转账欺诈           | 复式记账；原子事务；速率限制                |
| 自我推荐           | 兑换时交叉检查 `api_key_id`                 |
| 排行榜操纵         | Z 分数异常检测；管理员异常监控面板          |
| 联邦令牌被盗       | 使用 SHA-256 哈希存储；原始令牌仅显示一次   |
| 暴力破解邀请码     | 兑换端点采用速率限制；8 字符熵              |
| 显示名称中的 XSS   | 清理显示名称；转义排行榜条目                |
| 针对哈希的时序攻击 | 使用 `crypto.timingSafeEqual` 比较令牌哈希  |

### 身份验证要求

- **公开**（无需身份验证）：`GET /leaderboard`、`GET /stream`（只读
  排行榜）。
- **需要 API 密钥**：所有写入操作、个人资料、转账、邀请。
- **仅限管理员**：异常监控面板、审计日志查看器。
- **联邦**：使用 `Authorization` 标头中的原始令牌，通过单独的身份验证路径进行验证，
  并与存储的 SHA-256 哈希进行比对。

---

## 测试

### 测试文件

所有测试均使用 Node.js 原生测试运行器（`node --import tsx/esm --test`）。

| 测试文件                                      | 覆盖内容                       | 测试数 |
| --------------------------------------------- | ------------------------------ | ------ |
| `tests/unit/gamification/xp.test.ts`          | XP 计算、等级曲线、称号        | 8      |
| `tests/unit/gamification/badges.test.ts`      | 徽章条件匹配、授予             | 10     |
| `tests/unit/gamification/streaks.test.ts`     | 连续活跃逻辑、里程碑、边界情况 | 7      |
| `tests/unit/gamification/leaderboard.test.ts` | 排名计算、分页、轮换           | 8      |
| `tests/unit/gamification/sharing.test.ts`     | 转账、余额、幂等性             | 9      |
| `tests/unit/gamification/invites.test.ts`     | 创建、兑换、过期、自我推荐     | 7      |
| `tests/unit/gamification/antiCheat.test.ts`   | 速率限制、Z 分数、审计日志记录 | 6      |
| `tests/unit/gamification/events.test.ts`      | 事件发出、扇出、错误处理       | 5      |

### 运行测试

```bash
# 所有游戏化测试
node --import tsx/esm --test tests/unit/gamification/*.test.ts

# 单个测试文件
node --import tsx/esm --test tests/unit/gamification/xp.test.ts
```

### 覆盖率要求

根据 `CONTRIBUTING.md`，所有新模块必须满足：

- 分支覆盖率 >= 80%。
- 每个公共函数至少测试一次。
- 测试错误路径（余额不足、代码过期、速率限制）。

---

## 文件结构

```
src/
  lib/
    db/
      migrations/
        060_create_gamification.sql    # 全部 8 张表及索引
      gamification.ts                  # 领域 CRUD 模块
    gamification/
      xp.ts                           # XP 计算、等级曲线、称号
      badges.ts                       # 徽章定义、条件、评估
      streaks.ts                      # 每日连续活跃记录
      leaderboard.ts                  # 排名计算、SSE、轮换
      antiCheat.ts                    # 速率限制、z-score、审计
      sharing.ts                      # 代币转账账本
      invites.ts                      # 邀请码/兑换码
      servers.ts                      # 社区服务器联邦
      events.ts                       # 事件发射器（集成点）
      notifications.ts                # SSE 通知流
  app/
    api/
      gamification/
        leaderboard/route.ts          # GET/POST 排行榜
        leaderboard/stream/route.ts   # SSE 实时更新
        transfer/route.ts             # GET/POST 转账
        invite/route.ts               # GET/POST/DELETE 邀请码
        invite/redeem/route.ts        # POST 兑换码
        servers/route.ts              # GET/POST/DELETE 服务器
        federation/score/route.ts     # POST 推送分数
        federation/leaderboard/route.ts # GET 拉取排行榜
        notifications/route.ts        # SSE 通知
        anomalies/route.ts            # GET 异常报告
        rotate/route.ts               # POST 轮换密钥
    (dashboard)/
      dashboard/
        leaderboard/page.tsx           # 排名页面
        profile/page.tsx               # XP/徽章/连续活跃页面
        tokens/page.tsx                # 余额/转账/邀请页面
        gamification/admin/page.tsx    # 管理员异常监控
  shared/
    constants/
      gamification.ts                  # XP_REWARDS、TITLES、BADGE_DEFS、LIMITS

tests/
  unit/
    gamification/
      xp.test.ts
      badges.test.ts
      streaks.test.ts
      leaderboard.test.ts
      sharing.test.ts
      invites.test.ts
      antiCheat.test.ts
      events.test.ts

docs/
  frameworks/
    GAMIFICATION.md                    # 本文档
```

---

## 迁移策略

### 阶段 1：后端核心（PR 1）

- 迁移 `060_create_gamification.sql`（8 张表）。
- `src/lib/db/gamification.ts`（领域模块）。
- `src/lib/gamification/xp.ts`、`streaks.ts`、`events.ts`。
- `chatCore.ts` 中的集成点。
- XP、连续活跃和事件的单元测试。

### 阶段 2：徽章与排行榜（PR 2）

- `src/lib/gamification/badges.ts`、`leaderboard.ts`。
- 常量中的徽章定义。
- 排行榜 API 路由 + SSE 流。
- 徽章和排行榜的单元测试。

### 阶段 3：分享与邀请（PR 3）

- `src/lib/gamification/sharing.ts`、`invites.ts`、`antiCheat.ts`。
- 转账 + 邀请 API 路由。
- 分享、邀请和反作弊的单元测试。

### 阶段 4：联邦与仪表板（PR 4）

- `src/lib/gamification/servers.ts`、`notifications.ts`。
- 联邦 API 路由。
- 仪表板页面（排行榜、个人资料、代币、管理）。
- MCP 工具注册。

---

## 未来规划

- **季节性活动**：限时徽章套装和排行榜赛季。
- **团队排行榜**：按组织或组合对用户进行分组。
- **XP 倍率**：在推广期间提高 XP。
- **成就分享**：生成可分享的徽章卡片（OpenGraph 图片）。
- **移动端推送**：针对徽章/等级事件的基于 webhook 的通知。
- **排行榜 API**：用于第三方集成的公共 API。
