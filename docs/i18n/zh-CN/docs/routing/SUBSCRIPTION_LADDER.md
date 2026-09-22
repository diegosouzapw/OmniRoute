# Subscription-first routing (中文 (简体))

🌐 **Languages:** 🇺🇸 [English](../../../../routing/SUBSCRIPTION_LADDER.md) · 🇪🇹 [am](../../../am/docs/routing/SUBSCRIPTION_LADDER.md) · 🇸🇦 [ar](../../../ar/docs/routing/SUBSCRIPTION_LADDER.md) · 🇦🇿 [az](../../../az/docs/routing/SUBSCRIPTION_LADDER.md) · 🇧🇬 [bg](../../../bg/docs/routing/SUBSCRIPTION_LADDER.md) · 🇧🇩 [bn](../../../bn/docs/routing/SUBSCRIPTION_LADDER.md) · 🇨🇿 [cs](../../../cs/docs/routing/SUBSCRIPTION_LADDER.md) · 🇩🇰 [da](../../../da/docs/routing/SUBSCRIPTION_LADDER.md) · 🇩🇪 [de](../../../de/docs/routing/SUBSCRIPTION_LADDER.md) · 🇬🇷 [el](../../../el/docs/routing/SUBSCRIPTION_LADDER.md) · 🇪🇸 [es](../../../es/docs/routing/SUBSCRIPTION_LADDER.md) · 🇪🇪 [et](../../../et/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇷 [fa](../../../fa/docs/routing/SUBSCRIPTION_LADDER.md) · 🇫🇮 [fi](../../../fi/docs/routing/SUBSCRIPTION_LADDER.md) · 🇫🇷 [fr](../../../fr/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇪 [ga](../../../ga/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇳 [gu](../../../gu/docs/routing/SUBSCRIPTION_LADDER.md) · 🇳🇬 [ha](../../../ha/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇱 [he](../../../he/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇳 [hi](../../../hi/docs/routing/SUBSCRIPTION_LADDER.md) · 🇭🇷 [hr](../../../hr/docs/routing/SUBSCRIPTION_LADDER.md) · 🇭🇺 [hu](../../../hu/docs/routing/SUBSCRIPTION_LADDER.md) · 🇦🇲 [hy](../../../hy/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇩 [id](../../../id/docs/routing/SUBSCRIPTION_LADDER.md) · 🇳🇬 [ig](../../../ig/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇹 [it](../../../it/docs/routing/SUBSCRIPTION_LADDER.md) · 🇯🇵 [ja](../../../ja/docs/routing/SUBSCRIPTION_LADDER.md) · 🇬🇪 [ka](../../../ka/docs/routing/SUBSCRIPTION_LADDER.md) · 🇰🇭 [km](../../../km/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇳 [kn](../../../kn/docs/routing/SUBSCRIPTION_LADDER.md) · 🇰🇷 [ko](../../../ko/docs/routing/SUBSCRIPTION_LADDER.md) · 🇱🇹 [lt](../../../lt/docs/routing/SUBSCRIPTION_LADDER.md) · 🇱🇻 [lv](../../../lv/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇳 [ml](../../../ml/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇳 [mr](../../../mr/docs/routing/SUBSCRIPTION_LADDER.md) · 🇲🇾 [ms](../../../ms/docs/routing/SUBSCRIPTION_LADDER.md) · 🇲🇹 [mt](../../../mt/docs/routing/SUBSCRIPTION_LADDER.md) · 🇲🇲 [my](../../../my/docs/routing/SUBSCRIPTION_LADDER.md) · 🇳🇵 [ne](../../../ne/docs/routing/SUBSCRIPTION_LADDER.md) · 🇳🇱 [nl](../../../nl/docs/routing/SUBSCRIPTION_LADDER.md) · 🇳🇴 [no](../../../no/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇳 [or](../../../or/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇳 [pa](../../../pa/docs/routing/SUBSCRIPTION_LADDER.md) · 🇵🇭 [phi](../../../phi/docs/routing/SUBSCRIPTION_LADDER.md) · 🇵🇱 [pl](../../../pl/docs/routing/SUBSCRIPTION_LADDER.md) · 🇵🇹 [pt](../../../pt/docs/routing/SUBSCRIPTION_LADDER.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/routing/SUBSCRIPTION_LADDER.md) · 🇷🇴 [ro](../../../ro/docs/routing/SUBSCRIPTION_LADDER.md) · 🇷🇺 [ru](../../../ru/docs/routing/SUBSCRIPTION_LADDER.md) · 🇱🇰 [si](../../../si/docs/routing/SUBSCRIPTION_LADDER.md) · 🇸🇰 [sk](../../../sk/docs/routing/SUBSCRIPTION_LADDER.md) · 🇸🇮 [sl](../../../sl/docs/routing/SUBSCRIPTION_LADDER.md) · 🇷🇸 [sr](../../../sr/docs/routing/SUBSCRIPTION_LADDER.md) · 🇸🇪 [sv](../../../sv/docs/routing/SUBSCRIPTION_LADDER.md) · 🇰🇪 [sw](../../../sw/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇳 [ta](../../../ta/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇳 [te](../../../te/docs/routing/SUBSCRIPTION_LADDER.md) · 🇹🇭 [th](../../../th/docs/routing/SUBSCRIPTION_LADDER.md) · 🇹🇷 [tr](../../../tr/docs/routing/SUBSCRIPTION_LADDER.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/routing/SUBSCRIPTION_LADDER.md) · 🇵🇰 [ur](../../../ur/docs/routing/SUBSCRIPTION_LADDER.md) · 🇺🇿 [uz](../../../uz/docs/routing/SUBSCRIPTION_LADDER.md) · 🇻🇳 [vi](../../../vi/docs/routing/SUBSCRIPTION_LADDER.md) · 🇳🇬 [yo](../../../yo/docs/routing/SUBSCRIPTION_LADDER.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/routing/SUBSCRIPTION_LADDER.md)

---

> 两个新的 `auto/*` id——`auto/subscription` 和 `auto/thrifty`。二者均通过显式请求启用：
> 除非调用方按名称请求相应 id，否则不会有任何流量经由它们路由，并且不会更改任何
> 现有池、策略或默认值。

## 为什么需要这个功能

OmniRoute 已经回答了两个成本相关的问题，但都不是大多数运维人员所关心的那个问题。

| 现有机制                                                 | 回答的问题                       |
| -------------------------------------------------------- | -------------------------------- |
| `hidePaidModels` (`autoCombo/paidModelFilter.ts`)        | “此模型是否被编目为免费？”       |
| `freeAccessPolicy: "strict"` (`strictZeroCostFilter.ts`) | “此连接是否有可能向我计费？”     |
| `quotaPreflight` (`combo/quotaExhaustionCutoff.ts`)      | “此连接是否接近其配额上限？”     |
| `budgetCap` / `budgetFallback` (`autoCombo/engine.ts`)   | “限制支出，并降级到最便宜的选项” |

所有仅使用免费资源的机制都会**以失败关闭方式处理**——免费池耗尽后得到的是空池，绝不会
升级到付费选项——而所有付费侧机制都不区分层级。二者都无法回答：

> “使用我已经付费购买的配额。配额耗尽后，要么停止，要么逐级升级到最便宜的付费选项——
> 并在配额重置后立即切换回来。”

## 计费是连接的属性，而非模型的属性

`classifyTier()` (`open-sse/services/tierResolver.ts`) 以 `(provider, model)` 为键，并根据
目录定价返回 `free | cheap | premium`。但一次请求是否会产生增量费用，取决于**由哪个连接
处理该请求**：同一模型通过 Claude Code OAuth 连接使用时包含在套餐中，而通过 API 密钥
连接使用时则按 token 计费。

`provider_connections.auth_type` 在两个方向上都不能作为可靠的代理指标——既存在按量计费的
OAuth 连接，也存在包含在套餐中的 API 密钥连接（Copilot 席位 token 并非按量计费的 API
密钥）。因此，计费类别来自一个**人工维护的目录**
`open-sse/config/connectionBillingCatalog.ts`，它根据各提供者公布的条款手动设定——这沿用了
`FreeModelBudget.hardStopGuaranteed` 已经为免费模型建立的模式。

```ts
type ConnectionBillingClass = "subscription" | "metered" | "keyless" | "unknown";
type ConnectionOverageBehavior = "hard-stop" | "meters-to-paid" | "unknown";
```

解析顺序（`autoCombo/connectionBilling.ts`）：合成的无认证哨兵值 → `keyless`；同时匹配
提供者和 `authType` 的目录条目；提供者范围的条目；否则为 `unknown`。**未编目并不代表免费**——
`unknown` 在所有地方都按 `metered` 处理，因此明天新增的提供者默认位于订阅层级之外，必须
经过明确维护后才能纳入其中。

## 层级模型

按升级顺序共有五个层级。它们的差异不仅在于价格——每个层级都有**自己的**耗尽信号，因此
这并非简单的排序。

| #   | 层级           | 成员条件                                     | 耗尽条件                   |
| --- | -------------- | -------------------------------------------- | -------------------------- |
| 0   | `subscription` | 人工维护的 `billing: "subscription"`         | 配额窗口达到或低于截止阈值 |
| 1   | `keyless`      | 合成的无认证路径                             | 连接冷却 / 断路器触发      |
| 2   | `free`         | 按量计费连接，`classifyTier() === "free"`    | 免费额度耗尽               |
| 3   | `cheap`        | 按量计费连接，`classifyTier() === "cheap"`   | 该层级预算耗尽             |
| 4   | `premium`      | 按量计费连接，`classifyTier() === "premium"` | 该层级预算耗尽             |

层级 0-2 因**配额**而耗尽；配额是可观测的，并且已被跟踪。层级 3-4 没有配额——付费连接可以
无限期提供服务——因此，它们唯一合理的耗尽信号是每个层级各自的**预算**。如果没有预算，
“在便宜层级耗尽时升级”就没有触发条件。

## `auto/subscription` — 默认拒绝

池 = 仅第 0 级，且仅限超额行为已明确记录为 `hard-stop`、并且已逐一实时验证仍有配额余量的连接。
所有不明确的情况均会被排除：未经审查的提供者、无法验证的配额读数、过期读数，或超额后会计入付费的情况。

空池是**预期**结果，而非缺陷——调用方现有的空池处理路径会将其转化为明确错误，而不是静默回退到可能产生费用的方案。
这就是该 ID 所作的全部保证。

`keyless` 被有意设定为**不**符合条件：此分组表示“我付费购买的套餐”，因此无需身份验证的后端不属于其中。
此类情况请使用 `auto/thrifty`（或 `auto/best-free`）。

### 连接安全性

一个候选项并不总是绑定到单个连接——逻辑候选项携带一个 `allowedConnectionIds` 允许列表，而实际使用的账户会在稍后的分派阶段由 `open-sse/services/combo/autoStrategy.ts` 选择。因此，这两个分组都会**逐一验证每个连接**，并将 `allowedConnectionIds` 重写为恰好由通过验证的子集组成——绝不会保留完整的原始列表，也绝不会任意选择其中一个成员。由于 `autoStrategy.ts` 已经将该数组作为严格的允许列表执行，因此在此处重写它，从构造上保证了“已验证”和“实际使用”的集合完全相同。这与 [STRICT_ZERO_COST](./STRICT_ZERO_COST.md) 使用的是同一条不变式和同一套推理。

## `auto/thrifty` — 每次仅提升一级

池 = 所有级别，按级别索引排序，并排除已耗尽的候选项。`auto` 引擎仍会在通过筛选的池中进行评分：阶梯决定哪些级别参与，评分则决定其中哪个候选项胜出。同一级别内的顺序保持稳定，因此评分器自身的排名绝不会被这一覆盖层重新排列。

这是一个排序与门控覆盖层，**不是**新的分派器：`combo.ts` 的推测式循环已经会按顺序遍历目标，并在失败时继续尝试下一个目标，因此，即使预检未能发现运行时配额耗尽，也仍会在同一请求内提升到下一级。

`auto/subscription` 采用默认**拒绝**策略，而 `auto/thrifty` 采用默认**放行**策略：即使套餐内连接没有可用的配额读数，也仍会优先尝试。尝试它不会产生费用；如果事实证明其配额已耗尽，回退流程仍会继续到下一级。反之，如果因为遥测数据缺失而拒绝尝试，就会把请求发送到付费级别，而这恰恰是该分组旨在避免的结果。

## 重置后返回套餐级别

路由返回第 0 级之前，必须有三个相互独立的状态到期。只修复其中一个，会导致套餐补充配额很久之后，阶梯仍卡在付费级别。

1. **配额状态缓存**——`freeAccessQuota.ts` 按 `(provider, connection)` 缓存，TTL 为
   180 秒。如果某个缓存条目自身的 `resetAt` 已经过期，它描述的窗口就已不复存在，因此现在会被视为过期，**无论其缓存时长如何**，并强制刷新。
   如果没有此机制，一个在午夜补充配额的套餐会继续显示为已耗尽，直到 TTL 碰巧到期。
2. **阶梯自身的状态**——按照设计，它没有任何自身状态。每次构建池时，都会根据实时配额状态重新计算级别资格；不存在可能在重置后继续存留并导致路由卡死的持久化“当前处于第 3 级”记录。
3. **连接冷却时间**——导致配额耗尽的 429 会根据指数退避设置 `rateLimitedUntil`，对于套餐连接，该时间可能超过实际重置时间。`clampCooldownToReset()`
   （`subscriptionLadder.ts`）会将冷却时间缩短到上游自身的重置时刻，并且绝不会延长冷却时间。**该功能已实现并经过测试，但尚未接入**：在写入任何冷却时间之前，`src/sse/services/auth.ts` 中的配额缓存就已失效，因此必须在该函数更早的位置捕获 `resetAt`——这是对弹性处理关键路径的修改，应放在单独的 PR 中接受审核。在此之前，重新进入该级别必须等待连接冷却期结束（当提供者发送上游 `Retry-After` 提示时，现有逻辑已经会优先采用该提示）。

### 防抖动

刚刚重置的级别，只有在剩余比例高于 `reentryMinRemainingPercent`（默认为 5）时才会被重新纳入；而已在使用中的连接只需保持高于 `exitCutoffPercent`（默认为 2，与 `quotaPreflight.defaultThresholdPercent` 一致）。二者之间的差值就是滞后区间——如果没有它，在连续请求之间，剩余配额徘徊在阈值附近的连接会反复在不同级别之间切换。

## 配置

仅用于调优。这里特意**没有** `enabled` 标志：如果存在一个能将这些功能关闭的开关，
就会导致 `auto/subscription` 悄无声息地提供完整模型池——包括付费模型——而其名称所表达的含义却恰恰相反。

```jsonc
{
  "subscriptionLadder": {
    "exitCutoffPercent": 2,
    "reentryMinRemainingPercent": 5,
    "rungBudgetUsd": { "cheap": 5.0, "premium": 0 }, // 0 会直接禁用该梯级
  },
}
```

在接入支出解析器之前，预算门控不会生效：如果没有可用的计费数据，付费梯级仍会被排序，但永远不会受到门控限制。截至 v3.8.51，schema 已接受 `rungBudgetUsd` 设置，但尚未强制执行——应将其视为保留配置，而非有效的支出上限。即使没有此设置，梯级排序、基于配额的耗尽判定以及重置后重新进入均可正常工作。

## 组合

`subscription` 和 `thrifty` 是 `AutoTier` 值，因此它们可以与每个类别组合：
`auto/coding:thrifty`、`auto/reasoning:subscription`，依此类推。两个扁平 ID
（`auto/subscription`、`auto/thrifty`）会在 `/v1/models` 和仪表板中公布。

这两个 ID 均不属于付费层级，因此 `isPaidTierAutoId()` 对二者均返回 `false`，并且
`auto/subscription` 不会被 `hidePaidModels` 隐藏。

## 代码位置

| 关注点                   | 文件                                                |
| ------------------------ | --------------------------------------------------- |
| 精选计费信息             | `open-sse/config/connectionBillingCatalog.ts`       |
| 分类器                   | `open-sse/services/autoCombo/connectionBilling.ts`  |
| 梯级、两种分组及重新进入 | `open-sse/services/autoCombo/subscriptionLadder.ts` |
| 接入候选池               | `open-sse/services/autoCombo/virtualFactory.ts`     |
| 感知重置的缓存过期判定   | `open-sse/services/autoCombo/freeAccessQuota.ts`    |
| 层级接口                 | `open-sse/services/autoCombo/suffixComposition.ts`  |
| 公布的 ID                | `open-sse/services/autoCombo/builtinCatalog.ts`     |
| 测试                     | `tests/unit/autoCombo/subscription-ladder.test.ts`  |
