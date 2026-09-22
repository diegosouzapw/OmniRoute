# Resilience Guide (中文 (简体))

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/RESILIENCE_GUIDE.md) · 🇪🇹 [am](../../../am/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/architecture/RESILIENCE_GUIDE.md) · 🇦🇿 [az](../../../az/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/architecture/RESILIENCE_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/architecture/RESILIENCE_GUIDE.md) · 🇩🇰 [da](../../../da/docs/architecture/RESILIENCE_GUIDE.md) · 🇩🇪 [de](../../../de/docs/architecture/RESILIENCE_GUIDE.md) · 🇬🇷 [el](../../../el/docs/architecture/RESILIENCE_GUIDE.md) · 🇪🇸 [es](../../../es/docs/architecture/RESILIENCE_GUIDE.md) · 🇪🇪 [et](../../../et/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/architecture/RESILIENCE_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/architecture/RESILIENCE_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇱 [he](../../../he/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/architecture/RESILIENCE_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/architecture/RESILIENCE_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/architecture/RESILIENCE_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇩 [id](../../../id/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇹 [it](../../../it/docs/architecture/RESILIENCE_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/architecture/RESILIENCE_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/architecture/RESILIENCE_GUIDE.md) · 🇰🇭 [km](../../../km/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/architecture/RESILIENCE_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/architecture/RESILIENCE_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/architecture/RESILIENCE_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/architecture/RESILIENCE_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/architecture/RESILIENCE_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/architecture/RESILIENCE_GUIDE.md) · 🇲🇲 [my](../../../my/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇴 [no](../../../no/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [or](../../../or/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/RESILIENCE_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/architecture/RESILIENCE_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/architecture/RESILIENCE_GUIDE.md) · 🇱🇰 [si](../../../si/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/architecture/RESILIENCE_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/architecture/RESILIENCE_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [te](../../../te/docs/architecture/RESILIENCE_GUIDE.md) · 🇹🇭 [th](../../../th/docs/architecture/RESILIENCE_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/architecture/RESILIENCE_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/architecture/RESILIENCE_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/architecture/RESILIENCE_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/architecture/RESILIENCE_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/RESILIENCE_GUIDE.md)

---

OmniRoute 具有三种彼此独立但又相互关联的弹性机制。每种机制的作用范围和目的都不同。调试路由行为时，请将它们区分开来。

![三层弹性模型](../diagrams/exported/resilience-3layers.svg)

> 来源：[diagrams/resilience-3layers.mmd](../diagrams/resilience-3layers.mmd)

## 1. 提供者断路器

**作用范围：** 整个提供者（例如 `glm`、`openai`、`anthropic`）。

**目的：** 停止向在上游/服务层面反复发生故障的提供者发送流量。

**实现：**

- 核心类：`src/shared/utils/circuitBreaker.ts`
- 接线：`src/sse/handlers/chatHelpers.ts`、`src/sse/handlers/chat.ts`
- 状态 API：`GET /api/monitoring/health`
- 重置 API：`POST /api/resilience/reset`
- 包装器：`open-sse/services/accountFallback.ts`
- 数据库表：`domain_circuit_breakers`

**状态：**

- `CLOSED` — 允许正常流量
- `DEGRADED` — 仍允许流量，但会跟踪增加的提供者故障
- `OPEN` — 提供者被暂时阻止；组合路由会跳过该提供者
- `HALF_OPEN` — 重置超时已结束；允许探测请求

**可配置的默认值（`open-sse/config/constants.ts`，公开于控制面板 → 设置 → 弹性）：**

| 类别     | 进入降级状态 | 进入打开状态 | 重置超时 |
| -------- | ------------ | ------------ | -------- |
| OAuth    | 5 次故障     | 8 次故障     | 60s      |
| API 密钥 | 7 次故障     | 12 次故障    | 30s      |
| 本地     | 派生值       | 2 次故障     | 15s      |

`degradationThreshold` 控制提供者何时进入 `DEGRADED`；`failureThreshold` 控制提供者何时进入打开状态并被跳过。本地提供者配置目前尚未在“弹性”设置页面中公开。

**触发状态码：** 仅限提供者级别的状态码 `[408, 500, 502, 503, 504]`。不要因账户级别错误（大多数 401/403/429——这些错误应由冷却或锁定机制处理）而触发断路器。

**惰性恢复：** 当 `OPEN` 到期时，`getStatus()`、`canExecute()`、`getRetryAfterMs()` 会将状态刷新为 `HALF_OPEN`。无需后台计时器。

---

### 可选启用的全局提供者冷却（窗口门控）

第四层为**可选启用**层（`PROVIDER_COOLDOWN_ENABLED`，默认**关闭**），它会在
`open-sse/services/providerCooldownTracker.ts` 中跨请求记录发生故障的提供者，
组合目标解析会查询这些记录，使连续的组合请求不再重复尝试刚刚发生故障的
提供者。提供者级别的条目遵循 `PROVIDER_PROFILES` 窗口门控：

| 配置     | 触发条件（`providerFailureThreshold`） | 时间窗口（`providerFailureWindowMs`） | 冷却时长（`providerCooldownMs`） |
| -------- | -------------------------------------: | ------------------------------------: | -------------------------------: |
| OAuth    |                                   `10` |                               `15min` |                           `5min` |
| API 密钥 |                                   `15` |                               `30min` |                          `10min` |

低于阈值时，不会认为提供者正处于冷却状态；一次成功会清除
该窗口。连接级别的条目（`provider:connectionId`）则继续采用
`minRetryCooldownMs → maxRetryCooldownMs` 指数退避。覆盖项：
`OMNIROUTE_PROVIDER_BREAKER_{OAUTH,API_KEY}_{FAILURE_THRESHOLD,FAILURE_WINDOW_MS,COOLDOWN_MS}`。
回归防护测试：`tests/unit/provider-cooldown-window-gate.test.ts`。

## 2. 连接冷却

**范围：** 单个提供者连接/账户/密钥。

**目的：** 跳过一个有问题的密钥，同时让同一提供者的其他连接继续提供服务。

**实现：**

- 标记为不可用：`src/sse/services/auth.ts::markAccountUnavailable()`
- 选择逻辑：同一文件中的 `getProviderCredentials*`
- 冷却计算：`open-sse/services/accountFallback.ts::checkFallbackError()`
- 设置：`src/lib/resilience/settings.ts`

**每个连接的字段：**

- `rateLimitedUntil` — 冷却结束时间戳
- `testStatus: "unavailable"`
- `lastError`、`lastErrorType`、`errorCode`
- `backoffLevel` — 指数退避计数器

**默认冷却时间：**

- OAuth 基础值：5 秒
- API 密钥基础值：3 秒
- API 密钥收到 429：优先采用上游的 `Retry-After`/重置响应头/可解析的重置文本
- 退避：`baseCooldownMs * 2 ** failureIndex`

**防惊群保护：** 防止并发失败导致冷却时间被过度延长或 `backoffLevel` 被重复递增。

**终止状态（不是冷却）：**

- `banned` — 由封禁关键词/账户封禁检测设置（参见 [BAN_DETECTION](../security/BAN_DETECTION.md)），也会在上游连续三次拒绝单次请求时设置（`request_rejected`，例如 Anthropic OAuth 403 "Request not allowed" — `open-sse/services/requestRejectedStreak.ts`）；单次拒绝只会使连接进入冷却
- `expired`（经过有界重试后转为终止状态——`EXPIRED_RETRY_MAX = 3`，并采用指数退避——因此，暂时性 OAuth 错误可在账户被永久停用前自行恢复）
- `credits_exhausted`

这些状态会一直保留，直到凭据发生变化或操作人员将其重置。不要用暂时性冷却状态覆盖终止状态。

**惰性恢复：** 当 `rateLimitedUntil` 已过期时，连接会重新具备可用资格。成功使用后，`clearAccountError()` 会清除所有错误字段。

### Claude OAuth 用量墙：低优先级通道 + 会话限额重置

**范围：** 单个 Claude 订阅（OAuth）连接。两项功能均需**按连接选择启用**
（编辑连接 → Claude 部分 → `providerSpecificData` 中的 `lowPriorityMode` /
`autoLimitReset`，两者默认均关闭），并复刻 Claude Code 的 `/low-priority` 和
`/limit-reset` 命令（线路协议基于 Claude Code 2.1.263 捕获）。

**实现：**

- 状态机 + 响应分类：`open-sse/services/claudeLowPriority.ts`
- 重置状态/申领客户端：`open-sse/services/claudeLimitReset.ts`
- 执行器钩子（响应头注入 + 同账户重试）：`open-sse/executors/base.ts::execute()`
- 选择启用状态的持久化：`src/lib/providers/requestDefaults.ts::normalizeProviderSpecificData()`

**触发条件：** 5 小时用量墙——一个 `429`，其响应头包含
`anthropic-ratelimit-unified-status: rejected`，并且当账户符合条件时，还包含
`anthropic-ratelimit-unified-slow-offer: treatment`。在首次遇到该用量墙
429 之前不会发送任何内容；不带统一限流响应头的突发 429 会进入正常冷却路径。

**低优先级通道**（`lowPriorityMode`）：

- 遇到用量墙 429 时，执行器会接受该提议，并立即使用 `anthropic-usage-limit: slow`
  重试**同一**账户；该通道会一直保持活动状态，直到已公布的
  `anthropic-ratelimit-unified-reset`（另加 60 秒宽限期），且该时间窗口内的每个请求都会携带
  此响应头。被拦截的 429 绝不会到达 `handleChatCore`，因此连接**不会**进入冷却，
  也不会被轮换掉。
- 后续响应中的 `anthropic-ratelimit-unified-slow-status`：`active` / `not_needed`
  会保持该通道；`slot_busy`（429）或 `529` 会按照服务器的
  `anthropic-ratelimit-unified-slow-retry-after` 等待（默认 20 秒，限制在 5–600 秒，
  ±30% 抖动）后重试，且受 `anthropic-ratelimit-unified-slow-max-wait` 限制
  （默认 20 分钟，限制在 1 分钟–6 小时）——超过该时间后，通道将结束，并进入 10 分钟的
  冷静期，在此期间无法重新接受提议。等待时间还会受请求自身剩余上游启动超时时间的限制
  （`resolveFetchStartTimeout`，默认为 10 分钟），并预留 5 秒余量：如果没有此限制，
  默认 20 分钟的最大等待时间会超过请求生命周期，休眠会在等待途中被中止，从而暴露
  `TimeoutError`，而不是正常的 `max_wait` 结束状态和冷静期。
- `weekly_limit` / `budget_exhausted` / `off` / `ineligible`、5 小时时间窗口滚动，
  或 `ineligible` + `anthropic-ratelimit-unified-overage-in-use: true`
  （由于付费超额用量现已覆盖该用量墙，因此无论状态为何，都会以 `extra_usage` 结束）
  都会终止该通道；随后响应会进入正常冷却路径。`budget_exhausted` 会一直保留到已公布的
  预算重置时间（≤ 8 天）。
- 用量墙检查会在执行器自身由 400 驱动的单次尝试内重试（上下文编辑、
  thinking/effort 限制、参数自动学习）之后运行，因此，即使某个用量墙 429 仅在其中一次
  重试时出现，仍会被拦截，而不会进入冷却路径。
- 状态按连接保存在内存中（重启后需要额外遇到一次用量墙 429 才能重新接受提议）。

**会话限额重置**（`autoLimitReset`，两项功能均启用时先尝试此功能）：

- `GET https://api.anthropic.com/api/oauth/usage?at_wall=1&skip_spend=1` → `juniper_tide`
  块；当 `arm: "reset"` 且 `available: true` 时，向
  `https://api.anthropic.com/api/organizations/{orgUUID}/reset_rate_limits` 发起
  `POST`，请求体为 `{ "program": "juniper_tide" }`（组织 UUID 来自
  `providerSpecificData.organizationUUID`，并提供引导式回退）。
- `result: reset|not_limited` → 以全速重试请求（不带慢速响应头）。
  `already_used` / `not_offered` 会记忆 `next_available_at`（默认为一周）；
  任何失败都会退避 15 分钟。重置每周只能执行一次，并且仍会计入每周限额。

回归保护：`tests/unit/claude-low-priority-mode.test.ts`、
`tests/unit/claude-limit-reset.test.ts`、`tests/unit/claude-low-priority-executor.test.ts`。

### 会话亲和性（#7274）

**范围：** 将一个客户端会话（`X-Session-Id` / `x-codex-session-id` /
`x-omniroute-session` 响应头）固定到一个连接，适用于**任何**提供者。

**目的：** 让多轮代理（Claude Code、aider、自定义代理）在不同请求间持续使用同一账户，从而减少跨账户导致的上下文丢失，以及在具有按账户会话状态的提供者处反复遇到冷启动 429。

**实现：**

- TTL 解析：`src/sse/services/sessionAffinityPin.ts::resolveSessionAffinityTtlMs()`
- 固定连接的选择/创建：`src/sse/services/sessionAffinityPin.ts::selectSessionAffinityConnection()`
- 请求头提取（通用，适用于任何提供者）：`src/sse/services/auth.ts::extractSessionAffinityKey()`
- 持久化固定关系表：`sessionAccountAffinity`（`src/lib/db/sessionAccountAffinity.ts`）
- 设置：`sessionAffinityTtlMs`（以毫秒为单位的全局 TTL，`0` 表示禁用）— `src/lib/db/settings.ts`。该设置由迁移 `124_generic_session_affinity_ttl.sql` 从仅适用于 Codex 的 `codexSessionAffinityTtlMs` 重命名而来；迁移会将之前配置的所有 Codex TTL 延续为新的默认值。

在 #7274 之前，对于除 `codex` 之外的所有提供者，`resolveSessionAffinityTtlMs()` 都会直接返回 `0`，因此即使固定机制和请求头提取早已与提供者无关，TTL 设置（以及会话请求头）在其他任何地方都不会生效。此修复移除了该提前返回；现在，只要将全局 TTL 设置为大于 `0`，它就会统一应用于所有提供者。

这三个会话亲和性请求头永远不会转发到上游——执行器会从头构建自己的上游请求头，而不是透传客户端请求头，因此这些请求头仅用作内部关联 ID。

### 独占式托管会话连接租约

**范围：** 一个活动的托管 HTTP 客户端/会话独占一个符合条件的 OmniRoute 连接。

**目的：** 为需要在请求之间设置严格路由边界的客户端提供持久、独占的连接所有权。这与会话亲和性不同，后者只是一种软性的连续性偏好：独占租约会在 SQLite 中持久化生命周期状态，强制保证全局活动所有者和活动连接的唯一性，并在分派给提供者之前拒绝过期的代次。

此功能需要针对每个 API 密钥主动启用。托管密钥必须具有 `lease:exclusive` 范围，并且拥有显式的非空 `allowedConnections` 列表。任何 HTTP 客户端都可以使用生命周期端点；无需指定客户端名称、用户代理、提供者、OAuth 方法或模型。租约拥有的是连接，而非模型，因此，只要连接仍然正常符合条件，更改模型后仍会保留绑定。常规模型、配额、健康状态、冷却时间和允许列表规则仍具有最终决定权，并且可以将同一代次转换到另一个空闲且符合条件的连接。

生命周期端点为 `POST /api/v1/session-leases`，支持 JSON 操作 `acquire`、`renew` 和 `release`。托管推理请求需携带不透明的 `X-OmniRoute-Lease-Owner` 值以及精确的 `X-OmniRoute-Lease-Generation`。所有者值以 `vlo_` 开头，后跟 43 个 base64url 字符；系统仅存储其 SHA-256 哈希。每个最终分派边界还会绑定已认证的 API 密钥 ID 和活动连接 ID。租约控制请求头会从日志、保留的请求快照和上游执行器请求头中移除。

如果常规路由存在符合条件的托管候选连接，但所有空闲候选连接都被其他所有者的活动租约占用，OmniRoute 将返回 HTTP `429`、租约容量不可用代码、等待容量状态，以及根据最早相关到期时间计算得出的有界 `Retry-After`。常规的无符合条件连接并不属于租约争用，并会保留其现有的路由错误语义。

相关机制仍彼此独立：

- OAuth 会话占用是一种进程内针对 OAuth 账户的软分配机制。
- 账户信号量授予请求并发许可，并在请求完成时终止。
- 独占式托管会话租约是具有代次边界的持久化生命周期所有权。

---

## 3. 模型锁定

**范围：** 提供者 + 连接 + 模型三元组。

**按状态码确定键范围：** 失败状态码决定锁定写入哪个键
（`open-sse/services/accountFallback/exactModelLock.ts` 中的 `resolveLockoutScope()`）：

- `429` / `403` / `402` — 配额或授权信号 — 锁定**配额系列**：
  对于 codex，锁定整个 `codex` / `spark` 范围（该连接的所有 `gpt-5*` 模型）；
  对于其他提供者，则使用 `getQuotaScopedModelForProvider()`。
- `404` 锁定单个模型（`getModelLockKey()` 会缩小 `not_found` 的范围）。
- 任何其他状态码 — `5xx` 传输/服务器故障，以及 OmniRoute 因质量验证而自行
  合成的 `502` — 仅锁定**精确的**提供者/连接/模型三元组。某个模型上的异常流
  并不能说明该账户的配额存在问题；在此规则实施之前，
  `codex/gpt-5.6-luna` 的一次空响应会将该连接的所有 `gpt-5*` 模型从路由中
  移除 2–30 分钟（逐步延长），即使其配额并未受到影响。
- 调用方显式指定的 `scope` 选项始终优先（Antigravity 会传入 `"exact"`）。

**目的：** 避免仅因某个模型不可用或受到配额限制，就禁用整个连接。

**示例：**

- 按模型分配配额的提供者返回 429
- 本地提供者因缺少某个模型而返回 404
- 特定于提供者的模式/模型权限故障（例如 Grok 模式）

**实现：** `open-sse/services/accountFallback.ts` — `lockModel()`、`clearModelLock()`、`getAllModelLockouts()`。

### 模型冷却仪表板 (v3.8.0)

UI：设置 → 模型冷却（`src/app/(dashboard)/dashboard/settings/components/ModelCooldownsCard.tsx`）

列出活动锁定及以下信息：提供者、连接、模型、原因、过期时间。操作员可以从该卡片中手动重新启用模型。

**REST API：**

- `GET /api/resilience/model-cooldowns` — 列出活动锁定
- `DELETE /api/resilience/model-cooldowns` — 手动重新启用。请求体：`{provider, connection, model}`。身份验证：管理权限。

### 锁定设置 UI + 成功衰减恢复 (v3.8.23)

模型锁定从始终启用的硬编码行为，转变为完全可配置的可选功能，
并拥有独立的设置卡片和自愈恢复路径。

**设置卡片：** 设置 → 模型锁定
（`src/app/(dashboard)/dashboard/settings/components/ModelLockoutCard.tsx`）。
它与上面的只读 `ModelCooldownsCard` **不同**（后者仅用于
_列出_活动锁定）— 新卡片用于_配置参数_。默认值位于
`DEFAULT_MODEL_LOCKOUT_SETTINGS`
（`src/lib/resilience/modelLockoutSettings.ts`）中：

| 设置                    | 默认值                           | 含义                                 |
| ----------------------- | -------------------------------- | ------------------------------------ |
| `enabled`               | `false`                          | 总开关 — 模型锁定**默认关闭**。      |
| `errorCodes`            | `[403, 404, 429, 502, 503, 504]` | 计为模型范围故障的上游状态码。       |
| `baseCooldownMs`        | `120_000`（120 秒）              | 首次故障的初始锁定时长。             |
| `maxCooldownMs`         | `1_800_000`（30 分钟）           | 逐步延长后的冷却时间上限。           |
| `maxBackoffSteps`       | `10`                             | 指数退避逐步延长的最大步数。         |
| `useExponentialBackoff` | `true`                           | 重复故障是否以指数方式延长冷却时间。 |

设置通过常规设置存储持久化，并使用弹性设置架构进行验证；该卡片会限制
`baseCooldownMs`/`maxCooldownMs`
（要求 `maxCooldownMs ≥ baseCooldownMs`）和 `maxBackoffSteps`。

**成功衰减恢复：** 恢复**并非**完全依赖计时器到期。健康响应会逐步降低模型的
失败计数，因此在窗口期内恢复的模型会停止逐步延长锁定（并解除锁定），而无须
等待计时器到期。当组合目标成功时，`open-sse/services/combo.ts` 会调用
`decayModelFailureCount()`
（`open-sse/services/accountFallback.ts`），将存储的
`failureCount` **减半**（`Math.floor(failureCount / 2)`）；当其达到 `0` 时，
锁定条目将被完全删除。与之对应的 `recordModelLockoutFailure()`
会在逐步延长窗口内发生故障时增加计数（并延长冷却时间）。此成功衰减机制是对
普通计时器到期机制的补充 — 任一路径都可以重新启用模型。

**状态：** 锁定保存在**内存中**（每个进程中都有以
`provider:connectionId:model` 为键的 `ModelLockoutEntry` `Map`，
精确范围锁定则以 `provider:connectionId:exact:model` 为键），不会持久化到
数据库 — 重启后会丢失。_设置_会被持久化；活动锁定的_状态_是临时的。

---

## 4. 配额共享并发控制 (v3.8.36)

订阅账户（GLM、MiniMax 等）通常只能接受约 1–3 个并发请求；超过此限制会触发 429 和冷却。在 **quota-share**（`qtSd/…`）组合下，这一问题尤其突出，因为多个 API 密钥共享同一个上游账户。通过三层机制防止共享账户被请求淹没。

### 每连接并发上限（`max_concurrent`）

每个提供者连接都可以声明一个 `max_concurrent` 上限
（`provider_connections.max_concurrent`，可在连接弹窗 / API / DB 中设置）。
留空表示不设限制。这是驱动下述串行化层的唯一配置项——请将其设置为账户的实际并发数（例如 GLM 约为 1，MiniMax 约为 2）。

### 配额共享请求串行化

当配额共享调度的目标连接声明了一个正数
`max_concurrent` 时，发往该**账户**的并发请求将通过一个
每连接信号量（键为 `qsconn:<connectionId>`）进行串行化：超出的请求会**在队列中等待**，而不是淹没账户。该机制采用**故障开放**策略——当队列已饱和或发生超时时，请求会在未取得槽位的情况下继续执行，而不会拒绝任何可调度的请求。可在**设置 → 弹性 → 配额共享每连接并发**
（`resilienceSettings.quotaShareConcurrencyLimit.enabled`，默认开启）
中切换。未设置 `max_concurrent` 上限时，行为保持不变。

> 配额共享路由门控（`selectQuotaShareTarget`、DRR + P2C）本身采用
> 故障开放策略，仅会降低达到上限的连接的优先级——在只有单个连接的池中，它无法进行硬限制，因此真正抑制请求洪峰的是此信号量。

### 感知组合冷却的重试

对于每一种组合策略（启用时），如果某个请求将因短暂的瞬时冷却而明确返回 429，则会等待冷却结束并重新调度，而不是返回 429——这涵盖了多模型组合中的 Gemini 类 TPM/RPM 窗口（约 60 秒的 retry-after），例如双模型组合的两个目标都触及了各自的每模型速率限制。其限制由**设置 → 弹性**中的 `comboCooldownWait`（`enabled`、`maxWaitMs`、`maxAttempts`、`budgetMs`）控制。对于 `quota_exhausted`（锁定至午夜）或身份验证/未找到原因，它绝不会等待。

---

## 5. 请求队列准入控制（v3.8.49 · issue #6593）

**范围**：本地的每个提供者+连接的速率限制队列（`open-sse/services/rateLimitManager.ts`，
由 Bottleneck 提供支持），位于上述三种机制的下一层。

**`maxWaitMs` 限制队列等待时间；`executionMaxWaitMs` 限制执行时间。**
二者被刻意分开，互不影响。

`resilienceSettings.requestQueue.maxWaitMs` 是**队列等待预算**：它涵盖等待提供者空位以及随后处于 QUEUED 状态的时间；任务一旦离开 QUEUED 并开始执行，其计时器就会立即清除
（`rateLimitManager.ts`、`wrappedFn`）。超过该预算的请求绝不会到达上游。默认值为 30000ms，由 `src/lib/resilience/settings.ts` 中的 `DEFAULT_REQUEST_QUEUE_MAX_WAIT_MS`
提供，并由 `tests/unit/ratelimit-admission-control-6593.test.ts` 固定验证，因此一旦更改该值，测试就会失败，而不会让本段说明在无人察觉的情况下过时。

`resilienceSettings.requestQueue.executionMaxWaitMs` 是 Bottleneck
作为任务 `expiration` 接收的值，其计时器仅在分派后启动。它为本身没有上游超时的执行器提供兜底保障；当执行器自身从发起 fetch 开始计算的超时时间更长时，该值会提高到该超时时间，因此不会中断正常进行中的响应。默认值为 600000ms（10 分钟）。

过去将队列预算传入 `expiration` 会导致非增量式网关在处理中途被终止——这些网关可能确实需要运行数分钟后才会产生首批字节——这也解释了为什么 expiration 会以 `code:
"RATE_LIMIT_EXECUTION_TIMEOUT"`（HTTP 504）的形式呈现，而队列预算则使用队列超时代码。可通过 `RATE_LIMIT_MAX_WAIT_MS` /
`RATE_LIMIT_EXECUTION_MAX_WAIT_MS`（环境变量）或仪表板
（**Settings → Resilience**）覆盖任一值。二者在规范化时都会被限制在 1ms–24h 范围内。

**二者的优先级均为：**环境变量只提供_默认值_。持久化到 `resilienceSettings.requestQueue` 中的值（通过仪表板/API 补丁设置，并存储在 `key_value` 中）优先于它，而每个连接的
`rateLimitOverrides.maxWaitMs` / `.executionMaxWaitMs` 又优先于持久化值。因此，在已有持久化值的部署中设置环境变量不会产生任何变化——应改为清除或更新持久化设置。

队列中的驻留时间由 `maxWaitMs` 限制；下述 `maxQueueDepth` 则限制可同时排队的调用方数量。

**`maxQueueDepth` — 可选启用的准入上限（新增）。** `resilienceSettings.requestQueue.maxQueueDepth`
限制单个提供者+连接中可同时处于排队状态（尚未分派）的请求数量。当队列中已有 `maxQueueDepth`
个请求时，新请求会被快速拒绝，并返回带类型的
`code: "RATE_LIMIT_QUEUE_FULL"` 错误，且此过程发生在请求到达 `limiter.schedule()` **之前**
——因此拒绝成本很低，并且会在对该请求执行任何下游提示词压缩/翻译工作之前发生。默认值 `0` =
禁用，以保留现有的无界队列行为；取值范围限制为 0–100000。可通过 `RATE_LIMIT_MAX_QUEUE_DEPTH`（环境变量）或
`resilienceSettings.requestQueue.maxQueueDepth`（仪表板/API 补丁）覆盖。

准入检查本身是一个纯函数
（`open-sse/services/rateLimitManager/admission.ts::checkQueueAdmission`），因此无需真实的 Bottleneck 限制器即可进行单元测试。

> 发起 #6593 的 RFC 还提出了一个 `bypassCompressionOnRateLimit`
> 标志。本仓库的 `open-sse/services/compression/` 流水线用于对出站 LLM 请求进行
> 提示词/上下文压缩（位于 `chatCore.ts` 中
> `resolveCompressionSettings`/`selectCompressionStrategy` 代码块附近），
> 而不是对合成的 429 响应体进行 HTTP 响应压缩——并不存在与字面意义上的绕过标志相匹配的代码路径。该提示词压缩步骤目前也在请求流水线中的 `withRateLimit()` _之前_运行，因此，
> 通过调整顺序来在队列已满拒绝时跳过该步骤，是一项独立且比此 issue 范围更大的改动；此处有意**未**实现该功能。如果节省 CPU 所带来的收益值得承担调整顺序的风险，则将其留作后续工作。

---

## 6. 慢速流吞吐量看门狗 (#9709)

可选的 `resilienceSettings.streamRecovery.throughputWatchdog` 防护机制用于检测
仍在发送数据块、但生成助手输出的速率低于所配置有效输出速率的上游。
它有意与空闲超时区分开来：
心跳和元数据既不会重置任何计时器，也不计为进度。它也不同于硬性尝试截止时间
(#9153)，后者无论输出质量如何，始终作为绝对安全上限。

看门狗必须先经历预热期，再经过一个完整的滚动窗口，之后才能中止。
它会统计来自 Chat Completions 和 Responses API 输出事件的文本增量
（作为保守的 UTF-8 字节代理），忽略仅包含用量信息的事件和空事件，并在工具调用
或推理事件进行期间暂停判断。该功能默认禁用，可通过
`STREAM_THROUGHPUT_WATCHDOG_ENABLED=true` 启用；窗口、预热期、最低速率和
最小可测量输出均受常规弹性设置规范化层的边界约束。

启用后，看门狗中止仅应用于当前活跃的上游尝试。在向客户端发送任何可见字节之前，
现有的同账户早期恢复路径可以重新发起尝试。提交之后，绝不会盲目重放流；
只有现有的安全流中续传契约能够拼接后缀。终结处理仍然只执行一次，
因此不会重复进行用量计费和信号量释放。

---

## 7. 上游状态重述（错误表述的配额错误）

**范围：** 一个使用错误 HTTP 状态报告临时配额耗尽的上游网关。

**目的：** 在分类之前纠正误导性状态，使下游消费者（回退引擎、组合聚合、面向客户端的响应）能够看到该故障真正可重试的性质。

一些网关会使用不可重试的 HTTP 状态来表示临时配额耗尽。
`agentrouter.org` 返回 `403`（有时为 `400`），并附带中文正文
（`用户额度不足` / `额度不足`），而不是标准的 `429`。Claude Code
等客户端会将 `403` 视为永久错误并中止会话；如果不加以纠正，
回退引擎会将其分类为 `AUTH_ERROR`，而不是配额事件。

**实现：**

- 注册表 + 匹配器：`open-sse/config/upstreamStatusRestatement.ts` — 一个
  按提供者划分的规则列表（`{id, fromStatuses, toStatus, textMarkers,
excludeMarkers, defaultRetryAfterMs}`），通过 `applyStatusRestatement()` 进行匹配。
- 调用位置：`open-sse/handlers/chatCore.ts` 中的 `providerFailure:` 块
  （约第 3654 行），位于 `parseUpstreamError()` 解析带有错误 HTTP 状态
  （`!providerResponse.ok`）的上游响应之后、任何分类运行之前，因此每个下游消费者
  看到的都是纠正后的状态。嵌入 `200` SSE 流内的错误会进入另一个更靠后的
  流解析路径，且目前**不在**此钩子的覆盖范围内——这是一个已知限制，
  agentrouter 的错误状态目前并不需要处理此情况（它以错误 HTTP 状态的形式出现）。
- 重试资格：`429` 位于 `RETRY_AFTER_ELIGIBLE_STATUSES`
  （`open-sse/services/combo/unavailableRetryGate.ts`）中，因此重述后的错误
  会携带真实的重试时间窗口，而不会表现为无法恢复的 `403`。
- 合成的 `60s` `defaultRetryAfterMs`（`upstreamStatusRestatement.ts`）
  只是重述后的响应告知**客户端**的信息；它本身并不是连接的内部冷却/锁定时长——
  后者由实际处理重述后错误的机制单独控制
  （Connection Cooldown 的递增退避，§2，对于 API 密钥提供者，基础值为 `3s`；
  或 Model Lockout，§3，用于 agentrouter 等按模型配额的提供者）。
  路由器内部可能会在其向客户端公布的 60s 窗口之前重新具备重试资格——
  这是有意预留的余量，而不是错误。

永久性错误（agentrouter 的 `无权访问模型`——无权访问此模型）绝不会被重述：
即使 `textMarkers` 匹配，`excludeMarkers` 也会否决该规则，
因此错误会保留其原始状态，不会被无限重试。对应的提供者分类规则
（`open-sse/config/providerErrorRules.ts` 中的
`agentrouter-model-access-denied`：
`reason: "auth_error"`、`scope: "model"`、声明的基础冷却时间为 `6h`）
由 `checkFallbackError`（`open-sse/services/accountFallback.ts`）
在通用 apikey 类别的 `FORBIDDEN` 提前返回_之前_查询，并受
`honorsRuleLockScope(provider)` 控制（#10334——目前通过
`providerErrorRules.ts` 中的 `HONORS_RULE_LOCK_SCOPE_PROVIDERS` 允许列表，
仅限 agentrouter）。该规则声明的 6h 冷却时间会以
`fallbackResult.baseCooldownMs` 的形式继续传递，但仍会进入预先存在的
按模型配额锁定路径（`lockModelIfPerModelQuota()` /
`recordModelLockoutFailure()`，除冷却时间来源外，#10334 未对其进行更改）：
与所有其他模型锁定一样，它会被向下限制为运维人员配置的
`mlSettings.maxCooldownMs`（默认 `1_800_000ms` / 30min），并且
_持久化的锁定原因_仍为预先存在的硬编码 `"forbidden"`，
而不是规则中的 `"auth_error"`——端到端仅遵循冷却时长，而不采用原因字符串。
连接本身保持活跃；同一连接上的其他模型不受影响。

重新表述的额度错误（`额度不足`）会在生产环境中命中一条提供者规则
（`agentrouter-user-quota-exhausted`：`reason: "quota_exhausted"`、`scope:
"connection"`，自身未声明冷却时间——因此使用持久化层按比例缩放的默认退避时间）。自 #10334
起，`ProviderErrorRuleMatch` 上的 `scope` 确实会被端到端使用，但**仅限于**
`HONORS_RULE_LOCK_SCOPE_PROVIDERS` 允许列表中的提供者（`providerErrorRules.ts` —
目前仅有 `"agentrouter"`，通过 `honorsRuleLockScope()` 进行控制）。对于其他所有
提供者，`scope` 仍然只提供信息，与 #10334 之前完全相同。
`checkFallbackError` 将匹配规则的作用域暴露为
`fallbackResult.ruleScope`；`isAgentrouterConnectionQuotaScope()`
（`src/sse/services/auth.ts`）是一个共享守卫，用于确认某个
`ruleScope` 确实可以安全地作为连接级、可自行恢复的信号来处理
（作用域为 `"connection"`，原因为 `quota_exhausted`，绝不能是 `permanent`，
也绝不能是 `creditsExhausted`——这是为了防御未来某条规则将作用域
`"connection"` 与永久性账户状态配对）。有两个使用方会调用它：

- **持久化**（`markAccountUnavailable()`、`src/sse/services/auth.ts`）：
  它不会进入直通提供者的**按模型**锁定分支
  （agentrouter 设置了 `passthroughModels: true` → `hasPerModelQuota()`
  返回 `true`），而是应用**临时连接冷却**——
  `testStatus: "unavailable"` + `rateLimitedUntil`，绝不会设置终止状态
  （`credits_exhausted`/`banned`/`expired`）——这样连接会在冷却期结束后
  自行恢复，而不需要手动重置凭据。
  对设置了 `disableCooling: true` 的连接会跳过此处理（#2997）：该退出选项
  会转而进入按模型锁定（这是已记录的权衡——
  请参阅该分支上方的代码注释）。
- **同一请求内的组合路由**（`applyComboTargetExhaustion()`、
  `open-sse/services/combo/targetExhaustion.ts`）：同一个守卫会将该连接
  标记到内存中的 `exhaustedConnections` 集合里，键为
  `${provider}:${connectionId}`。这只会跳过同一请求中尚未处理、并且_自身目标对象上
  已经携带完全相同 `connectionId`_的目标
  （`getExhaustedTargetSkipReason()`、
  `open-sse/services/combo/comboPredicates.ts`，在查询
  `exhaustedConnections` 前执行 `if (provider &&
connectionId)`）——对于普通的模型列表组合，兄弟目标自身并不携带固定的
  `connectionId`，而只会在每次分派时从响应的
  `X-OmniRoute-Selected-Connection-Id` 标头解析一个连接，因此永远不会命中该键。
  对于这种常见情况，防止剩余分支重新使用刚刚耗尽的账户的真正保护机制并不是这个
  Set——而是上述持久化层
  （该连接的 `rateLimitedUntil` 现在位于未来）与同一守卫共同作用，使该失败不会被加入
  `transientRateLimitedProviders`（请参阅“二阶段设计”以及
  `targetExhaustion.ts` 中 `isAgentrouterConnectionQuotaScope`
  分支上的代码注释）：由于该 Set 未被标记，`combo.ts` 的
  `allowRateLimitedConnection` 强制允许逻辑
  （`open-sse/services/combo.ts:1005-1013`、`:2734-2738`）不会对
  该提供者的剩余分支生效，因此凭据选择时会正常遵守
  `rateLimitedUntil` 过滤器（`src/sse/services/auth.ts:1238`），而剩余分支
  要么选择另一个仍然符合条件的 agentrouter 连接，要么因没有可用凭据而失败——
  它不会强行重新使用该分支刚刚置于冷却状态的连接。

### 二阶段设计：先重新表述状态，再进行分类

状态重新表述（`upstreamStatusRestatement.ts`）与提供者分类规则
（`open-sse/config/providerErrorRules.ts`、
`providerRuleRegistry`）是两个独立的注册表，它们都以提供者 ID
和文本标记为键，但在不同位置运行并服务于不同目的：重新表述会在
`chatCore.ts` 中较早地重写 HTTP 状态；
分类规则则在 `checkFallbackError()` 内选择回退 `reason` 和锁定 `scope`
（`model` / `provider` / `connection`）
（`open-sse/services/accountFallback.ts`）。

只有对于列入 `providerErrorRules.ts` 中 `FULL_TEXT_RULE_PROVIDERS`
允许列表的提供者，分类规则才能看到完整的错误**文本**
（匹配 `额度不足` 等响应正文标记时需要）——目前仅有 `"agentrouter"`。
对于其他所有**内置目录**提供者，`checkFallbackError` 只会将结构化错误
（`{code, type}`）传给 `getProviderErrorRuleMatch`；这足以处理基于
标头/状态/代码的规则，但无法识别响应正文中的文本标记。
辅助函数 `resolveRuleMatchBody()` 负责执行这一选择：对于允许列表中的提供者，
使用完整错误文本；否则使用结构化错误。将某个**内置**提供者添加到
`FULL_TEXT_RULE_PROVIDERS` 是显式的逐提供者选择加入机制——它的存在是为了确保
不在该列表中的每个提供者仍使用与原先逐字节完全一致的默认路径。

规则的 `scope`（`model` / `provider` / `connection`）与
`FULL_TEXT_RULE_PROVIDERS` 是彼此独立的选择加入机制：`checkFallbackError`
只会将其暴露为 `fallbackResult.ruleScope`，而下游使用方只会对同一文件中
`HONORS_RULE_LOCK_SCOPE_PROVIDERS` 允许列表里的提供者，
将其作为信息标签之外的内容加以遵循（通过
`honorsRuleLockScope()` 进行控制——目前仅有 `"agentrouter"`）。
有关提供者进入该允许列表后，匹配到 `scope: "connection"` 实际会产生什么行为，
请参阅上文“重新表述的额度错误”。

**#11104 — 操作员声明的规则会绕过两个允许列表。** 操作员可以通过 `settings.providerErrorRules`
（`open-sse/config/providerErrorRules.ts::setOperatorProviderErrorRules`）
在运行时声明按提供者划分的规则，而无需编辑此文件。若使用
`FULL_TEXT_RULE_PROVIDERS`/`HONORS_RULE_LOCK_SCOPE_PROVIDERS` 来限制操作员规则——这些允许列表
旨在保护内置目录规则的**默认**行为——那么对于尚未列入其中的所有提供者，
该设置机制都会失效，因为声明规则本身就已经是操作员的显式选择加入。
`resolveRuleMatchBody()` 和 `honorsRuleLockScope()` 都会先检查
`hasOperatorRuleForProvider()`：具有操作员规则的提供者会获得
原始错误文本，并且其声明的 `scope` 会得到遵循，无论
它是否也出现在任一允许列表中。

**已知缺陷 — HTTP 400 从不查询 `providerRuleRegistry`。**
`checkFallbackError` 的 `BAD_REQUEST` 分支完全通过自身的模式数组
（`accountFallback.ts` 中的 `MODEL_ACCESS_DENIED_PATTERNS`、
`CONTEXT_OVERFLOW_PATTERNS` 等）对状态 400 进行分类，并且会在
到达其上方的 `configuredRule`/`getProviderErrorRuleMatch` 分支之前返回。
带有 `status: 400` 的内置目录规则（或操作员规则）
在语法上有效，但永远不会触发。目前没有任何现有规则以 400 为目标，
因此生产环境不受影响——但未来若要添加 400 规则，需要先修改此
分支，而这是一项比添加规则更大的改动（它会重新分类所有已经依赖模式数组
行为的提供者的 400 响应），不属于添加单一提供者规则的范围。

### 添加新的配额误报网关

1. 在 `statusRestatementRegistry`
   （`open-sse/config/upstreamStatusRestatement.ts`）中注册一个规则数组。确保 `textMarkers`
   为提供者专用；切勿复用可能与
   `CREDITS_EXHAUSTED_SIGNALS`（`open-sse/services/accountFallback.ts`）冲突的通用英语短语。
2. 可以选择在
   `open-sse/config/providerErrorRules.ts`（`providerRuleRegistry`）中注册分类规则，以选择
   正确的锁定作用域（账户级配额使用 `connection`，按模型错误使用 `model`）。对于
   其规则需要完整错误文本（正文标记）的提供者，此步骤只有在生产环境中
   才会生效：请在同一文件中将提供者 ID 添加到 `FULL_TEXT_RULE_PROVIDERS`——否则
   `checkFallbackError` 只会将结构化的
   `{code, type}` 错误交给规则，而正文文本规则永远无法匹配实际流量。
   纯粹基于 `status`/`headers` 进行匹配的规则（例如 Opencode 或
   Minimax 的规则）不需要选择加入。另外，如果规则声明
   `scope: "connection"`，且预期效果是实际的连接级冷却
   以及同一请求中的组合跳过（而不仅仅是信息性标签），请在同一文件中将
   提供者 ID 添加到 `HONORS_RULE_LOCK_SCOPE_PROVIDERS`——它控制着
   `markAccountUnavailable()`（`src/sse/services/auth.ts`）和
   `applyComboTargetExhaustion()`
   （`open-sse/services/combo/targetExhaustion.ts`）中类似
   `isAgentrouterConnectionQuotaScope()` 的消费逻辑；若不添加，`scope`
   仍会通过 `fallbackResult.ruleScope` 传递，但不会有任何逻辑对其采取行动。
3. 添加单元测试，参照 `tests/unit/upstream-status-restatement.test.ts`
   和 `tests/unit/agentrouter-error-rules.test.ts`（包括
   非永久 / 非 `creditsExhausted` 的保护测试；如果提供者需要
   允许列表，还应添加一个测试，断言 `resolveRuleMatchBody()` 仅针对该提供者返回
   完整文本）。

无需更改 `chatCore.ts`、`classifyError` 或组合逻辑。

#### 按出口分桶的锁定（#10880）

`EGRESS_BUCKETED_LOCK_PROVIDERS` 中的提供者（opencode 系列）被视为
按 IP 分桶的上游（opencode 免费层按 IP 分桶，而非
按账户分桶——参见 #9611）：当状态 429 被分类为 `quota_exhausted`
**或** `rate_limit_exceeded` 时，在轮换机制尝试其他连接之前，
会冷却允许列表中同系列且最后已知出口 IP 与失败连接相同的所有连接
——从而避免 N-1 次必然失败的上游调用（与 #10460/#10525 的模式相同）。
特意包含 `rate_limit_exceeded`：在 `markAccountUnavailable`
路径中，opencode 专用规则永远无法匹配（没有将标头/正文传递给
`checkFallbackError`，且 opencode 不在 `FULL_TEXT_RULE_PROVIDERS` 中），因此正文中
带有订阅配额文本（“monthly usage limit
reached”）的 429 会先由配额文本回退逻辑
（`buildSubscriptionQuotaFallback`、`accountFallback.ts`；冷却 1 小时）
分类为 `quota_exhausted`，根本不会到达 `status_429` 规则——而不含配额文本的 429（普通
速率限制）则会通过 `status_429` 规则分类为 `rate_limit_exceeded`，
并且仍会冷却该 IP 系列。对于允许列表中的提供者，按 IP 分桶的
速率限制与配额耗尽是相同的信号。明确的限制：

- **尽力而为**：该锁会从 `proxy_logs` 中解析连接最后已知的 `egress_ip`
  （24 小时窗口、同步查询、无缓存）。冷缓存（从未探测过出口
  IP）或无对应记录 → 失败连接仍会由该分支进入冷却
  （记录方式与当前相同），只是不会锁定任何同级连接。
- **永不成为终止状态**：冷却是一个不断续期的配额窗口
  （`testStatus: "unavailable"`）；绝不会根据 IP 级信号推导出永久
  状态。启用 `disableCooling` 的连接会完全跳过该分支。
- **允许列表中该系列的锁粒度发生变化**：这是作用域
  变更，而不仅仅是同级连接优化。opencode 是一个 `passthroughModels`
  提供者，因此在此分支之前，429 会产生按模型（MODEL）的锁定；现在则会
  产生连接级冷却——即使运营者仅运行一个连接且根本不存在同级连接，也是如此。
  这正是 opencode 规则表已声明为正确的粒度（`scope: "connection"`、
  `providerErrorRules.ts`），但由于 opencode 不在
  `HONORS_RULE_LOCK_SCOPE_PROVIDERS` 中，迄今从未生效。该分支会自行写入失败
  连接的冷却状态和 `backoffLevel`，与连接作用域的 agentrouter 分支保持一致，
  然后返回——永远不会执行下方的按模型阻断和通用路径。
- **包括组合模式**：与 agentrouter 分支一样，该作用域有意忽略组合调用方
  对 429 应用的 `persistUnavailableState`/`isCombo` 降级。按模型锁定并不是
  该作用域的一种较弱形式，而是使用了错误的单元：它无法反映已耗尽的 IP，
  因此组合轮换仍会在每个同级连接上消耗一次必定失败的调用。
- **同级连接安全性**：已处于终止状态（banned/credits_exhausted）或已处于
  更长冷却期的同级连接绝不会被覆盖。
- **排他性允许列表**：扩展 `EGRESS_BUCKETED_LOCK_PROVIDERS` 是所有者的
  明确决策；不使用通用接线（模式 #10334/#10419）。同级连接查询会绑定同一个
  允许列表，而不是将其重复写成 SQL 字面量，因此扩展该列表仍只需修改一行。
- **出口 IP 双向轮换**：查询窗口（24 小时）远大于出口 IP 缓存 TTL
  （5 分钟），因此“最后已知 IP”是历史记录，而非当前状态。如果连接的代理在
  该窗口内发生了轮换，锁定可能会**遗漏**一个实际共享的 IP（所记录的 IP 是
  新的、尚未耗尽的 IP）——对称地，它也可能会**冷却一个此后已从耗尽 IP
  轮换离开的同级连接**。第二种情况会使该同级连接损失一个冷却窗口；这两种情况
  都被视为基于历史记录进行查询时可接受的尽力而为限制。
- **成本**：对 `proxy_logs` 进行两次有界扫描（通过
  `idx_pl_timestamp` 按窗口过滤），且仅以 429 的发生频率执行。不新增索引
  （迁移 134，YAGNI）。已在中等规模的真实流量数据库副本上测量；高吞吐量实例
  在相同窗口内会按比例保留更多行。

---

## 其他弹性功能

- **19 种路由策略**（priority、weighted、round-robin、context-relay、fill-first、p2c、random、least-used、cost-optimized、reset-aware、reset-window、headroom、strict-random、auto、lkgp、context-optimized、cache-optimized、fusion、pipeline）— 参见 [AUTO-COMBO.md](../routing/AUTO-COMBO.md)。
- **重置感知路由**（v3.8.0）— 根据配额重置时间确定连接的优先级。
- **后台模式降级** — Responses API 的 `background: true` 会降级为同步模式并发出警告。
- **动态工具限制检测** — 达到工具数量限制时，对提供者进行退避。
- **紧急回退** — 由 `OMNIROUTE_EMERGENCY_FALLBACK` 控制；运维人员可在功能标志页面覆盖该设置，无需重启。

---

## 调试

- 加权组合返回 `503 all_targets_cooling_down`（已设置 `Retry-After`，且 `diagnostics.excluded` 列出了每个目标及其对应的 `model_lockout` / `circuit_open` / `provider_cooldown` / `unavailable`）→ 资源池已配置并连接，但每个目标都因弹性恢复计时器而被排除；`[COMBO] Weighted selection: every target excluded before dispatch — …` 警告会指出具体原因和剩余秒数。同一组合返回 `404 no_executable_targets` 则表示未涉及弹性恢复计时器（没有可运行的目标，或每个账户都未通过可用性探测）。此逻辑基于 `targetResolution.ts` 中收集的排除项，构建于 `open-sse/services/combo/pinRecovery.ts` 中。
- 某个提供者的所有密钥都被跳过 → 同时检查断路器状态以及每个连接的 `rateLimitedUntil`/`testStatus`。
- 重置窗口结束后，提供者仍被永久排除 → 代码读取了原始 `state`，而不是 `getStatus()`/`canExecute()`。
- 一个密钥失败，但其他密钥应可用 → 优先使用连接冷却，而不是断路器。
- 只有一个模型失败 → 优先使用模型锁定，而不是连接冷却。
- 状态本应自行恢复却没有恢复 → 检查是否存在未来时间戳，以及读取路径是否会刷新已过期状态。永久状态需要手动更改。

---

## TLS 指纹与隐匿

提供者特定的隐匿机制（JA3/JA4、CCH、混淆）已另行记录 — 参见 `docs/security/STEALTH_GUIDE.md`（位于 git 中；未编译到 `/docs`）。

---

## 弹性测试（阶段 8 · 模块 C）

除了针对弹性逻辑的单元测试外，还有三项测试用于在
真实的压力/故障条件下检验运行时（均为集成/夜间测试 — 均不会阻止 PR）：

| 测试        | 内容                                                                                                                             | 运行方式                               |
| ----------- | -------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------- |
| 混沌测试    | 模拟上游节点注入真实的延迟/重置/超时/503；验证熔断器能否打开/恢复，以及 `checkFallbackError` 是否将 503 归类为可恢复的回退错误。 | `RUN_CHAOS_INT=1 npm run test:chaos`   |
| 堆增长测试  | 在 `--expose-gc` 下，每个 `createSSEStream` 约运行 500 个流；如果堆增长超过上限，则测试失败（OOM 防护 #3069）。                  | `npm run test:heap`                    |
| k6 浸泡测试 | 对 `/api/monitoring/health` 施加持续负载；检查 p95/错误阈值。                                                                    | `k6 run tests/load/k6-soak.js`（夜间） |

由 `.github/workflows/nightly-resilience.yml`（cron + dispatch）编排。在默认的
`test:integration` 中，混沌测试和堆测试会自行跳过（未使用 `RUN_CHAOS_INT`/`--expose-gc` 时）。

---

## 另请参阅

- [架构指南](./ARCHITECTURE.md) — 系统架构和内部原理
- [用户指南](../guides/USER_GUIDE.md) — 提供者、组合及 CLI 集成
- [自动组合引擎](../routing/AUTO-COMBO.md) — 16 因子评分、模式包
