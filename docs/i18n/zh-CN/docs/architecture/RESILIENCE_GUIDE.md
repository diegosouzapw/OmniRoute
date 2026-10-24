# Resilience Guide (中文 (简体))

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/RESILIENCE_GUIDE.md) · 🇪🇹 [am](../../../am/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/architecture/RESILIENCE_GUIDE.md) · 🇦🇿 [az](../../../az/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/architecture/RESILIENCE_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/architecture/RESILIENCE_GUIDE.md) · 🇩🇰 [da](../../../da/docs/architecture/RESILIENCE_GUIDE.md) · 🇩🇪 [de](../../../de/docs/architecture/RESILIENCE_GUIDE.md) · 🇬🇷 [el](../../../el/docs/architecture/RESILIENCE_GUIDE.md) · 🇪🇸 [es](../../../es/docs/architecture/RESILIENCE_GUIDE.md) · 🇪🇪 [et](../../../et/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/architecture/RESILIENCE_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/architecture/RESILIENCE_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇱 [he](../../../he/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/architecture/RESILIENCE_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/architecture/RESILIENCE_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/architecture/RESILIENCE_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇩 [id](../../../id/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇹 [it](../../../it/docs/architecture/RESILIENCE_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/architecture/RESILIENCE_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/architecture/RESILIENCE_GUIDE.md) · 🇰🇭 [km](../../../km/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/architecture/RESILIENCE_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/architecture/RESILIENCE_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/architecture/RESILIENCE_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/architecture/RESILIENCE_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/architecture/RESILIENCE_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/architecture/RESILIENCE_GUIDE.md) · 🇲🇲 [my](../../../my/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇴 [no](../../../no/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [or](../../../or/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/RESILIENCE_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/architecture/RESILIENCE_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/architecture/RESILIENCE_GUIDE.md) · 🇱🇰 [si](../../../si/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/architecture/RESILIENCE_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/architecture/RESILIENCE_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [te](../../../te/docs/architecture/RESILIENCE_GUIDE.md) · 🇹🇭 [th](../../../th/docs/architecture/RESILIENCE_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/architecture/RESILIENCE_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/architecture/RESILIENCE_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/architecture/RESILIENCE_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/architecture/RESILIENCE_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/RESILIENCE_GUIDE.md)

---

OmniRoute 有三个不同但相互关联的弹性机制。它们各自的作用范围和用途不同。在调试路由行为时，请将它们区分开来。

![3-layer resilience model](../diagrams/exported/resilience-3layers.svg)

> 来源：[diagrams/resilience-3layers.mmd](../diagrams/resilience-3layers.mmd)

## 1. 提供者熔断器（Provider Circuit Breaker）

**作用范围：**整个提供者（例如 `glm`、`openai`、`anthropic`）。

**用途：**停止向上游/服务层面持续失败的提供者发送流量。

**实现：**

- 核心类：`src/shared/utils/circuitBreaker.ts`
- 接线：`src/sse/handlers/chatHelpers.ts`、`src/sse/handlers/chat.ts`
- 状态 API：`GET /api/monitoring/health`
- 重置 API：`POST /api/resilience/reset`
- 封装：`open-sse/services/accountFallback.ts`
- 数据库表：`domain_circuit_breakers`

**状态：**

- `CLOSED` — 允许正常流量
- `DEGRADED` — 仍允许流量，但正在跟踪升高的提供者失败次数；在取得足够多的成功、通过有效的连接测试，或在上次失败类型对应的最长 `OPEN` 保持时间（其 `cooldownByKind` 值，否则为 `resetTimeout`，× `maxBackoffMultiplier`，至少一个冷却周期）内没有出现新失败后，会回到 `CLOSED`
- `OPEN` — 提供者被临时阻断；组合路由会跳过它
- `HALF_OPEN` — 重置超时已过；允许探测请求

**可配置默认值（`open-sse/config/constants.ts`，在 Dashboard → Settings → Resilience 中公开）：**

| 类别    | 进入降级（Degraded） | 熔断（Opens） | 重置超时 |
| ------- | -------------------- | ------------- | -------- |
| OAuth   | 5 次失败             | 8 次失败      | 60s      |
| API-key | 7 次失败             | 12 次失败     | 30s      |
| Local   | 派生                 | 2 次失败      | 15s      |

`degradationThreshold` 控制提供者何时进入 `DEGRADED`；`failureThreshold` 控制其何时熔断并被跳过。Local 提供者配置文件尚未在 Resilience 设置页面中公开。

**触发条件码：**仅提供者级状态码 `[408, 500, 502, 503, 504]`。账户级错误（大多数 401/403/429——它们属于冷却或锁定范畴）**不会**触发熔断。

**惰性恢复：**当 `OPEN` 过期时，`getStatus()`、`canExecute()`、`getRetryAfterMs()` 会将状态刷新为 `HALF_OPEN`。同样的读取操作（以及下一次失败）会使过期的 `DEGRADED` 衰减回 `CLOSED`。无需后台定时器。

---

### 可选启用的全局 Provider Cooldown（窗口门控）

第四层是**可选启用**的（`PROVIDER_COOLDOWN_ENABLED`，默认**关闭**），它在
`open-sse/services/providerCooldownTracker.ts` 中保留失败提供者的
跨请求记忆，由组合目标解析逻辑查询，使连续的组合请求不再重新遍历刚刚
失败的提供者。提供者级条目遵循 `PROVIDER_PROFILES` 的窗口门控：

| 配置文件 | 触发所需次数（`providerFailureThreshold`） | 时间窗口（`providerFailureWindowMs`） | 冷却时长（`providerCooldownMs`） |
| -------- | -----------------------------------------: | ------------------------------------: | -------------------------------: |
| OAuth    |                                       `10` |                               `15min` |                           `5min` |
| API key  |                                       `15` |                               `30min` |                          `10min` |

低于阈值时，该提供者**不会**被视为冷却中；一次成功会清除该窗口。
连接级条目（`provider:connectionId`）则保留指数级的
`minRetryCooldownMs → maxRetryCooldownMs` 退避策略。覆盖配置：
`OMNIROUTE_PROVIDER_BREAKER_{OAUTH,API_KEY}_{FAILURE_THRESHOLD,FAILURE_WINDOW_MS,COOLDOWN_MS}`。
回归防护测试：`tests/unit/provider-cooldown-window-gate.test.ts`。

## 2. 连接冷却

**范围：** 单个供应商连接/账户/密钥。

**目的：** 跳过单个坏密钥，同时同一供应商的其他连接继续提供服务。

**实现：**

- 标记不可用：`src/sse/services/auth.ts::markAccountUnavailable()`
- 选择：同一文件中的 `getProviderCredentials*`
- 冷却计算：`open-sse/services/accountFallback.ts::checkFallbackError()`
- 设置：`src/lib/resilience/settings.ts`

**每个连接的字段：**

- `rateLimitedUntil` — 冷却到期的时间戳
- `testStatus: "unavailable"`
- `lastError`、`lastErrorType`、`errorCode`
- `backoffLevel` — 指数退避计数器

**默认冷却时间：**

- OAuth 基础值：5s
- API-key 基础值：3s
- API-key 429：优先使用上游 `Retry-After`/重置响应头/可解析的重置文本
- 退避：`baseCooldownMs * 2 ** failureIndex`

**防惊群保护：** 防止并发失败过度延长冷却时间或重复递增 `backoffLevel`。

**并发限制类 429 不会沿退避阶梯上升。** 一个 `429` 响应体若报告并发限制（"too many concurrent requests"、"concurrency limit"、"parallel request limit"、GLM `并发数过高`），意味着该账户本身健康，只是正忙。
`checkFallbackError()` 返回原因 `concurrency_limited`：立即切换到下一个连接，将当前连接固定冷却 `CONCURRENCY_LIMIT_COOLDOWN_MS`（1s）或按上游重试提示冷却，保持 `backoffLevel` 不变，并设置 `skipProviderBreaker`。
显式的配额响应体仍然优先，因此同时匹配配额模式的响应体仍判定为配额结论。检测逻辑：`src/shared/utils/classify429.ts` 中的 `looksLikeConcurrencyLimit()`；判定逻辑：`open-sse/services/accountFallback/concurrencyLimit429.ts`。`classify429()`（熔断器的 `FailureKind`）保持不变，对这些响应体仍读取为 `rate_limit`。

**流内容停滞不会冷却账户。** 当内容停滞看门狗（`open-sse/utils/streamHandler.ts`）放弃一个迟迟未发送任何模型输出的流时，`markAccountUnavailable()` 会在连接上记录该错误，但不设置冷却：这种停滞属于该次请求，大多数情况下是一段很长的推理轮次，尚未产生任何输出。运维人员可通过 `resilienceSettings.streamStallCooldown.enabled` 重新启用（默认 `false`）。

**推理帧会重启内容停滞预算。** 推理模型可能思考数分钟才产生第一个可见 token：Claude 会流式发送 `thinking_delta` 帧，其思考文本可能为空，而 Responses API 会一个接一个地流式发送推理项。`isReasoningProgressFrame()`（`open-sse/utils/streamReadiness.ts`）能识别这些帧，看门狗会在每个此类帧上重启预算，而不是取消该轮次。这些帧仍不算模型输出，因此仅以推理结束的轮次仍会被报告为空，而停止推理、只发送心跳的轮次仍会触发看门狗。

Kiro 的二进制 `reasoningContentEvent` 帧若携带非空签名，会经由执行器以空的 `reasoning_content` 增量保留这一推理活动。该签名不会被转发。元数据、不完整帧和空签名不会重启内容预算；独立的活跃流超时和客户端取消仍然生效（`open-sse/executors/kiro/reasoning.ts`）。

**终态（不是冷却）：**

- `banned` — 由封禁关键词/账户封禁检测设置（见 [BAN_DETECTION](../security/BAN_DETECTION.md)），以及由连续三次上游的按请求拒绝设置（`request_rejected`，例如 Anthropic OAuth 403 "Request not allowed" — `open-sse/services/requestRejectedStreak.ts`）；单次拒绝只会冷却该连接
- `expired`（在有限次重试后转为终态 — `EXPIRED_RETRY_MAX = 3`，配合指数退避 — 因此暂时性的 OAuth 错误可以在账户被永久停用前自行恢复）
- `credits_exhausted`

这些状态会一直保持，直到凭据发生变化或运维人员重置它们。不要用临时冷却状态覆盖终态。

**惰性恢复：** 当 `rateLimitedUntil` 已过期，连接会重新变为可用。成功使用后，`clearAccountError()` 会清除所有错误字段。

### Claude OAuth 用量墙：低优先级通道 + 会话限制重置

**范围：** 单个 Claude 订阅（OAuth）连接。两个功能都是**按连接选择性启用**（编辑连接 → Claude 区块 → `providerSpecificData` 中的 `lowPriorityMode` / `autoLimitReset`，默认均为关闭），并复刻 Claude Code 的 `/low-priority` 和 `/limit-reset` 命令（线路协议捕获自 Claude Code 2.1.263）。

**实现：**

- 状态机 + 响应分类：`open-sse/services/claudeLowPriority.ts`
- 重置状态/认领客户端：`open-sse/services/claudeLimitReset.ts`
- 执行器钩子（响应头注入 + 同账户重试）：`open-sse/executors/base.ts::execute()`
- 选择性启用的持久化：`src/lib/providers/requestDefaults.ts::normalizeProviderSpecificData()`

**触发条件：** 5 小时用量墙 — 一个 `429`，其响应头携带
`anthropic-ratelimit-unified-status: rejected`，并且当账户符合条件时还携带
`anthropic-ratelimit-unified-slow-offer: treatment`。在首次用量墙 429 之前不会发送任何内容；没有 unified 响应头的突发 429 会走常规冷却路径。

**低优先级通道**（`lowPriorityMode`）：

- 遇到限额墙 429 时，执行器接受该提议并立即以 `anthropic-usage-limit: slow` 重试**同一**账户；通道保持活跃，直至公告的 `anthropic-ratelimit-unified-reset`（+60 秒宽限期），且该窗口内的每个请求都携带该头部。被拦截的 429 永远不会到达 `handleChatCore`，因此该连接**不会**进入冷却，也不会被轮换出去。
- 后续响应上的 `anthropic-ratelimit-unified-slow-status`：`active` / `not_needed` 保持通道；`slot_busy`（429）或 `529` 则等待服务器给出的 `anthropic-ratelimit-unified-slow-retry-after`（默认 20 秒，钳制在 5–600 秒，±30% 抖动）后重试，并受 `anthropic-ratelimit-unified-slow-max-wait`（默认 20 分钟，钳制在 1 分钟–6 小时）约束——超过该值通道结束，并进入 10 分钟冷却期以阻止重新接受。等待时间还额外受限于请求自身上游启动超时（`resolveFetchStartTimeout`，默认 10 分钟）的剩余时间减去 5 秒余量：若没有这一上限，20 分钟的默认最大等待时间会超过请求的存活时间，sleep 会在等待中途被中止，从而抛出 `TimeoutError`，而不是优雅地以 `max_wait` 结束并进入冷却期。
- `weekly_limit` / `budget_exhausted` / `off` / `ineligible`、5 小时窗口滚动，或 `ineligible` + `anthropic-ratelimit-unified-overage-in-use: true`（由于付费超额用量现已覆盖限额墙，在任何状态下都会以 `extra_usage` 结束通道）会结束通道；随后响应流入正常的冷却路径。`budget_exhausted` 会被记住，直到公告的预算重置时间（≤ 8 天）。
- 限额墙检查在执行器自身由 400 驱动的单次尝试内重试（上下文编辑、thinking/effort 钳制、参数自动学习）之后运行，因此仅在这些重试之一中才出现的限额墙 429 仍会被拦截，而不会进入冷却路径。
- 状态按连接保存在内存中（重启后需要额外一次限额墙 429 才能重新接受）。

**会话限额重置**（`autoLimitReset`，当两者都启用时，先于通道尝试）：

- `GET https://api.anthropic.com/api/oauth/usage?at_wall=1&skip_spend=1` → `juniper_tide` 块；当 `arm: "reset"` 且 `available: true` 时，以 `{ "program": "juniper_tide" }` 发起 `POST https://api.anthropic.com/api/organizations/{orgUUID}/reset_rate_limits`（组织 UUID 来自 `providerSpecificData.organizationUUID`，回退到 bootstrap）。
- `result: reset|not_limited` → 请求以全速重试（不带 slow 头部）。`already_used` / `not_offered` 会缓存 `next_available_at`（默认一周）；任何失败都会退避 15 分钟。该重置每周一次，且仍计入每周限额。

回归防护：`tests/unit/claude-low-priority-mode.test.ts`、`tests/unit/claude-limit-reset.test.ts`、`tests/unit/claude-low-priority-executor.test.ts`。

### 会话亲和性（#7274）

**范围：** 一个客户端会话（`X-Session-Id` / `x-codex-session-id` / `x-omniroute-session` 头部）固定到一个连接，适用于**任意**提供者。

**目的：** 让多轮智能体（Claude Code、aider、自定义智能体）在多次请求之间保持在同一账户上，减少跨账户的上下文丢失，以及在具有按账户会话状态的提供者上反复出现的冷启动 429。

**实现：**

- TTL 解析：`src/sse/services/sessionAffinityPin.ts::resolveSessionAffinityTtlMs()`
- 固定选择/创建：`src/sse/services/sessionAffinityPin.ts::selectSessionAffinityConnection()`
- 头部提取（通用，适用于任意提供者）：`src/sse/services/auth.ts::extractSessionAffinityKey()`
- 持久化固定表：`sessionAccountAffinity`（`src/lib/db/sessionAccountAffinity.ts`）
- 设置：`sessionAffinityTtlMs`（全局 TTL，单位毫秒，`0` 表示禁用）—— `src/lib/db/settings.ts`。由迁移 `124_generic_session_affinity_ttl.sql` 从仅限 Codex 的 `codexSessionAffinityTtlMs` 重命名而来，该迁移会将先前配置的 Codex TTL 沿用为新的默认值。

在 #7274 之前，`resolveSessionAffinityTtlMs()` 对除 `codex` 之外的所有提供者都硬性返回 `0`，因此尽管固定机制和头部提取本已是提供者无关的，TTL 设置（以及会话头部）在其他任何地方都不起作用。该修复移除了这个提前返回；现在一旦全局设置为大于 `0`，TTL 就会统一应用于每个提供者。

这三个会话亲和性头部永远不会被转发到上游——执行器从头构建自己的上游头部，而不是透传客户端头部，因此它仅作为内部关联 ID 存在。

### 独占式托管会话连接租约

**范围：** 一个活跃的托管 HTTP 客户端/会话拥有一个符合条件的 OmniRoute 连接。

**目的：** 为需要跨请求硬路由屏障的客户端提供持久的独占连接所有权。这不同于会话亲和性——后者只是一种软连续性偏好：独占租约在 SQLite 中持久化生命周期状态，强制执行全局活跃所有者与活跃连接的唯一性，并在提供者分发之前拒绝过期的代次（generation）。

该功能按 API 密钥选择性启用。托管密钥必须具有 `lease:exclusive` 作用域以及显式非空的 `allowedConnections` 列表。任何 HTTP 客户端都可以使用生命周期端点；不要求客户端名称、user-agent、提供者、OAuth 方法或模型。租约拥有的是连接而非模型，因此在连接保持正常符合条件的情况下，更换模型仍保留绑定。常规的模型、配额、健康、冷却和允许列表规则仍然具有最高效力，并可能将同一代次转移到另一个空闲的符合条件连接。

其生命周期为 `POST /api/v1/session-leases`，并使用 JSON 操作 `acquire`、`renew` 和 `release`。
托管推理请求会提供不透明的 `X-OmniRoute-Lease-Owner` 值和精确的
`X-OmniRoute-Lease-Generation`。owner 使用 `vlo_` 后跟 43 个 base64url 字符；系统中仅
存储其 SHA-256 哈希。每个最终分发栅栏（fence）还会绑定经过身份验证的 API 密钥 ID 和
活跃连接 ID。租约控制头会从日志、保留的请求快照以及
上游执行器头中移除。

如果普通路由存在符合条件的托管候选，但每个空闲候选都被
外部活跃租约占用，OmniRoute 将返回 HTTP `429`、lease-capacity-unavailable 错误码、
waiting-for-capacity 状态，以及根据最早相关过期时间推导出的有界 `Retry-After`。
普通的空资格情况不属于租约争用，仍保留其现有的路由错误语义。

相关机制保持相互独立：

- OAuth 会话占用是 OAuth 账户的进程本地软分配。
- 账户信号量授予请求并发许可，并在请求完成时结束。
- 独占托管会话租约是带有代次栅栏（generation fence）的持久生命周期所有权。

---

## 3. 模型锁定（Model Lockout）

**作用域：** 提供者 + 连接 + 模型三元组。

**按状态码划分键作用域：** 失败的状态码决定锁定写入哪个键（`open-sse/services/accountFallback/exactModelLock.ts` 中的 `resolveLockoutScope()`）：

- `429` / `403` / `402` —— 配额或授权（entitlement）信号 —— 锁定**配额族**：
  对 codex 锁定整个 `codex` / `spark` 作用域（该连接的每一个 `gpt-5*` 模型），对其他提供者则使用 `getQuotaScopedModelForProvider()`。
- `404` 锁定裸模型（`getModelLockKey()` 会将 `not_found` 缩小范围）。
- 其他所有状态码 —— `5xx` 传输/服务器故障，以及 OmniRoute 自身由质量校验合成的 `502` —— 只锁定**精确的**提供者/连接/模型元组。某个模型上的一次坏流并不能证明该账户的配额有问题；在此规则之前，`codex/gpt-5.6-luna` 上的一个空响应会把该连接的每一个 `gpt-5*` 模型从路由中移除 2–30 分钟（逐级升级），而其配额根本没有受影响。
- 调用方显式传入的 `scope` 选项始终优先（Antigravity 传入 `"exact"`）。

**目的：** 当只有一个模型不可用或受配额限制时，避免禁用整个连接。

**示例：**

- 按模型计配额的提供者返回 429
- 本地提供者对某个缺失的模型返回 404
- 特定于提供者的模式/模型权限故障（例如 Grok 模式）

**实现：** `open-sse/services/accountFallback.ts` —— `lockModel()`、`clearModelLock()`、`getAllModelLockouts()`。

### 模型冷却仪表板（v3.8.0）

UI：设置 → 模型冷却（`src/app/(dashboard)/dashboard/settings/components/ModelCooldownsCard.tsx`）

列出当前生效的锁定，包含：提供者、连接、模型、原因、expiresAt。运维人员可以从卡片上手动重新启用某个模型。

**REST API：**

- `GET /api/resilience/model-cooldowns` —— 列出当前生效的锁定
- `DELETE /api/resilience/model-cooldowns` —— 手动重新启用。请求体：`{provider, connection, model}`。鉴权：management。

### 冷却管理器

UI：监控 → 冷却管理器（`src/app/(dashboard)/dashboard/resilience/cooldowns/`）。

用一个页面集中展示所有因临时原因被移出路由的连接，而不必逐个打开各提供者页面。它会列出连接冷却、模型锁定和终态，可按单个连接、按选中的一批、或按某提供者的全部连接进行清除，并可编辑最常调整的冷却规则：`streamStallCooldown.enabled`，以及 OAuth / API 密钥的 `connectionCooldown` 基础冷却时长和最大退避步数（通过 `PATCH /api/resilience` 保存）。终态（`banned`、`expired`、`credits_exhausted`）会被列出，但绝不在此处清除。

**REST API**（`src/lib/resilience/cooldownManager.ts`，鉴权：management）：

- `GET /api/resilience/cooldowns[?provider=]` —— 返回各连接的状态、剩余冷却时间、
  退避级别、最近一次错误类型和模型锁定（不含凭据）
- `POST /api/resilience/cooldowns` —— 请求体为 `{connectionIds: string[]}` 或
  `{all: true, provider?}`；返回 `{cleared, unchanged, skippedTerminal, lockoutsCleared}`

### 锁定设置 UI + 成功衰减恢复（v3.8.23）

模型锁定从始终开启的硬编码行为，变为一个完全可配置、需主动启用的功能，拥有专属的设置卡片和一条自愈恢复路径。

**设置卡片：** 设置 → 模型锁定
（`src/app/(dashboard)/dashboard/settings/components/ModelLockoutCard.tsx`）。
它与上方只读的 `ModelCooldownsCard` **不同**（后者只_列出_当前生效的锁定）——新卡片用于_配置参数_。默认值位于 `DEFAULT_MODEL_LOCKOUT_SETTINGS`
（`src/lib/resilience/modelLockoutSettings.ts`）：

| 设置                    | 默认值                           | 含义                                 |
| ----------------------- | -------------------------------- | ------------------------------------ |
| `enabled`               | `false`                          | 主开关 —— 模型锁定**默认关闭**。     |
| `errorCodes`            | `[403, 404, 429, 502, 503, 504]` | 计为模型级失败的上游状态码。         |
| `baseCooldownMs`        | `120_000`（120 秒）              | 首次失败的初始锁定时长。             |
| `maxCooldownMs`         | `1_800_000`（30 分钟）           | 升级后冷却时长的上限。               |
| `maxBackoffSteps`       | `10`                             | 指数退避升级的最大步数。             |
| `useExponentialBackoff` | `true`                           | 重复失败是否按指数方式升级冷却时长。 |

设置通过常规的设置存储持久化，并通过弹性设置 schema 校验；卡片会钳制 `baseCooldownMs`/`maxCooldownMs`
（要求 `maxCooldownMs ≥ baseCooldownMs`）和 `maxBackoffSteps`。

**成功衰减恢复：** 恢复**并非**单纯依赖计时器到期。一次健康的响应会把模型的失败计数逐步回退，使在窗口期中途恢复的模型在计时器到期之前就停止升级（并被清除）。当 combo 目标成功时，`open-sse/services/combo.ts` 会调用 `decayModelFailureCount()`
（`open-sse/services/accountFallback.ts`），将存储的
`failureCount` **减半**（`Math.floor(failureCount / 2)`）；当计数降到 `0` 时，该锁定条目会被完全删除。与之对应的 `recordModelLockoutFailure()` 则在升级窗口内发生失败时递增计数（并升级冷却时长）。这种成功衰减是在普通计时器到期之外额外存在的——任一路径都可以重新启用模型。

**状态：** 锁定保存在**内存中**（每个进程各自持有以 `provider:connectionId:model` 为键的 `ModelLockoutEntry` `Map`，精确作用域锁定则以
`provider:connectionId:exact:model` 为键），不会持久化到
数据库——重启后丢失。_设置_会被持久化；生效中的锁定_状态_则是临时的。

---

## 4. 配额共享并发控制（v3.8.36）

订阅账户（GLM、MiniMax 等）通常只接受约 1–3 个并发请求；超过该数量会触发 429 和冷却。这在 **配额共享**（`qtSd/…`）组合下尤为突出，因为多个 API 密钥共享同一个上游账户。三层机制可防止共享账户被淹没。

### 每连接并发上限（`max_concurrent`）

每个提供者连接都可以声明一个 `max_concurrent` 上限（`provider_connections.max_concurrent`，可在连接弹窗 / API / 数据库中设置）。留空表示不限制。这是驱动下方序列化层的唯一旋钮——将其设置为账户的真实并发数（例如 GLM 约 1，MiniMax 约 2）。

### 每模型并发上限（`modelConcurrency`）

连接还可以在其 `rateLimitOverrides` 映射中声明精确的每模型并发上限：

```json
{
  "rateLimitOverrides": {
    "maxConcurrent": 4,
    "modelConcurrency": { "glm-5": 1, "glm-4.7": 3 }
  }
}
```

可在连接弹窗中设置（**Rate limit overrides → Per-model concurrency caps**，每行一个 `model=cap`），或通过 `PATCH /api/providers/[id]` 使用相同的 JSON 结构设置。关键语义：

- **连接级与模型级：** `maxConcurrent` 仍是共享的连接级上限。当两者都适用时，两个门控会在同一个复合门控（`global → provider → account → model`）中以原子方式获取；实际行为取决于更严格的那个适用限制。
- **精确匹配模型键：** 键是路由解析后传递给执行器的模型字符串——通常是裸的上游模型 id（`glm-5`），而不是客户端的 `provider/model` 别名（`zai/glm-5` 不会匹配 `glm-5`）。值为正整数并发请求上限。
- **本地排队，不做发现：** 超出的请求会按照现有的队列/超时语义在本地排队（类型化的 `SEMAPHORE_TIMEOUT` / `SEMAPHORE_QUEUE_FULL` 准入错误）。OmniRoute 不会发现或推断上游策略——它只执行运维人员配置的精确上限。饱和的模型门控绝不会禁用提供者，也绝不会造成永久性的模型锁定；上游 429/冷却/回退行为仍然是错误兜底。
- **每连接、每进程作用域：** 上限按数据库连接划分并保存在内存中，因此复用同一上游 API 密钥的两个连接不会相互协调。
- **未配置即保持不变：** 省略该映射（或将仪表盘字段留空）不会添加任何模型门控。以下示例配置未断言任何通用提供者限制：

```text
glm-5=1
glm-4.7=3
```

### 配额共享请求序列化

当配额共享调度指向一个声明了正数 `max_concurrent` 的连接时，指向该**账户**的并发请求会通过每连接信号量（键为 `qsconn:<connectionId>`）进行序列化：超出的请求会**在队列中等待**，而不是淹没账户。该机制是 **fail-open** 的——队列饱和或超时时，请求会不带槽位继续执行，而不是拒绝任何本可调度的请求。可在 **Settings → Resilience → Quota-share per-connection concurrency** 中切换（`resilienceSettings.quotaShareConcurrencyLimit.enabled`，默认开启）。如果没有 `max_concurrent` 上限，行为保持不变。

> 配额共享路由门控（`selectQuotaShareTarget`，DRR + P2C）本身也是 fail-open 的，并且只会 _降低_ 已达上限连接的优先级——在单连接池中它无法硬性限制，因此真正遏制洪泛的是这个信号量。

### 组合冷却感知重试

对于每种组合策略（启用时），如果某个请求会因为 SHORT 短暂冷却而最终变成 429，该请求会等待冷却结束并重新调度，而不是返回 429——这涵盖了多模型组合上的 Gemini 类 TPM/RPM 窗口（约 60 秒 retry-after），例如一个 2 模型组合的两个目标都触发了每模型速率限制。由 **Settings → Resilience** 中的 `comboCooldownWait`（`enabled`、`maxWaitMs`、`maxAttempts`、`budgetMs`）限定。它从不会因 `quota_exhausted`（锁定到午夜）或认证/未找到原因而等待。

同一个门控也覆盖预调度场景（#16319）：当组合的每个目标在任何尝试发生之前都被跳过，因为其模型处于短暂临时锁定状态时，零尝试路径会在相同的上限下等待锁解除并重新调度，而不是返回一个没有提示的 `503 ALL_TARGETS_SKIPPED`。当不允许等待时（达到上限、尝试次数或预算耗尽，或该功能关闭），最终响应会升级为 `429 rate_limit_error`，并携带最早临时锁过期时间的 `retry_after` / `reset_at`；配额、认证和未找到锁定则保持无提示的 503。

```text
#16319 · comboCooldownWait · pre-dispatch (attempts = 0)
all targets skipped + transient model lockout:
  enabled ∧ 0 < waitMs ≤ maxWaitMs ∧ attempt < maxAttempts ∧ budgetLeftMs ≥ waitMs
    → wait → re-dispatch
  wait = false → HTTP 429 rate_limit_error
  retry_after / reset_at ← earliest transient lock expiry
quota_exhausted / auth_error / not_found / not_found_local:
  no transient hint → HTTP 503 ALL_TARGETS_SKIPPED
```

---

## 5. 请求队列准入控制（v3.8.49 · issue #6593）

**范围**：本地的按"提供者+连接"维度划分的限流队列（`open-sse/services/rateLimitManager.ts`，由 Bottleneck 支撑），位于上述三种机制之下的一个层级。

**`maxWaitMs` 约束队列等待；`executionMaxWaitMs` 约束执行。**
两者被有意分开，互不馈入。

`resilienceSettings.requestQueue.maxWaitMs` 是**队列等待预算**：它涵盖等待提供者槽位、随后处于 QUEUED 状态排队的时间，其计时器在任务离开 QUEUED 并开始执行的那一刻被清除（`rateLimitManager.ts`，`wrappedFn`）。超过该预算的请求永远不会到达上游。默认值为 30000ms，由 `src/lib/resilience/settings.ts` 中的 `DEFAULT_REQUEST_QUEUE_MAX_WAIT_MS` 提供，并被 `tests/unit/ratelimit-admission-control-6593.test.ts` 锁定——因此更改它会让该测试变红，而不是让本段内容悄悄过时。

`resilienceSettings.requestQueue.executionMaxWaitMs` 是作为任务 `expiration` 传给 Bottleneck 的值，其计时器仅在调度后才启动。它是为自身没有上游超时的执行器提供的兜底，并且当执行器自己的 fetch-start 超时更长时会提升到该值，因此它不会切断一个健康的、正在传输中的响应。默认值为 600000ms（10 分钟）。

过去将队列预算馈入 `expiration` 正是曾在传输中途杀死非增量网关的原因——它们在收到首批字节之前合理地运行数分钟——这也是为什么过期会呈现为 `code: "RATE_LIMIT_EXECUTION_TIMEOUT"`（HTTP 504），而队列预算携带的是队列超时错误码。可通过 `RATE_LIMIT_MAX_WAIT_MS` / `RATE_LIMIT_EXECUTION_MAX_WAIT_MS`（环境变量）或仪表盘（**设置（Settings）→ 弹性（Resilience）**）覆盖任一值。两者在规范化时都会被钳制在 1ms–24h 范围内。

**两者的优先级：**环境变量仅提供_默认值_。持久化在 `resilienceSettings.requestQueue` 中的值（仪表盘 / API patch，存储于 `key_value`）优先于它，而按连接设置的 `rateLimitOverrides.maxWaitMs` / `.executionMaxWaitMs` 又优先于前者。因此，在已有持久化值的部署上设置环境变量不会有任何效果——请改为清除或更新该持久化设置。

队列驻留时间由 `maxWaitMs` 约束；下文的 `maxQueueDepth` 约束同时允许多少调用者排队。

**响应体声明的重试：限速 vs 锁定。**429 响应体可以指定自己的等待时间（Gemini 的 `RetryInfo.retryDelay`、"retry after Ns" 文本），`updateFromResponseBody` 会读取它。能容纳进连接 `maxWaitMs` 的等待属于限速：限流器在该时长内清空其储备量，排队的调用在储备量恢复时被调度。超过 `maxWaitMs` 的等待不是队列能坐等的——Gemini 对耗尽的每日配额会返回 `retryDelay: "86399s"`。重建后的 429 上转发的 `Retry-After`（#16528）已经让回退引擎在该时间窗口内锁定模型，但如果同时为此暂停限流器，仍会让任何提前到达该密钥的调用（例如在弹性重置之后）停滞整整 `maxWaitMs`。当这样的等待来自带类型的 Google `RetryInfo` 详情（`google_rpc_retry_info` 来源）且密钥的限流器已经按模型划分（见 `getLimiterKey`）时，429 会转为对该连接的模型锁定（`open-sse/services/rateLimitManager/bodyRetryPause.ts` 中的 `lockModelForLongBodyRetry`，上限为 24h），限流器保持不暂停。账户选择会通过 `isModelLocked()` 跳过该锁定，针对固定到该连接的目标的组合预调度门控同样如此。在 antigravity 上——其限流器是按配额族划分的——锁定作用于确切的模型，与其其他配额锁定一致。当别名将客户端请求的名称解析到该模型时，该请求名称也会被锁定，因为这些检查使用的是请求的名称；它是被精确锁定的（`lockExactModel`），因此跨越 antigravity 配额族或 codex 作用域的别名永远不会锁定其自身。散文式提示、无类型的 `retryDelay`，或整个连接共享的限流器，则保留暂停行为。当 429 路径刚重建的限流器确实暂停时，剩余排队时间早于暂停结束时间的调用者会立即被以队列超时错误码拒绝（`checkLimiterPause`），而不是干等那段时间耗尽；所记录的结束时间锚定在限流器构建之前——即 Bottleneck 启动其刷新时钟的位置——而之后对储备量的任何更改都会遗忘该锚点。由 `tests/unit/rate-limit-long-body-retry-lockout.test.ts` 和 `tests/unit/rate-limit-body-retry-pause.test.ts` 覆盖。

**`maxQueueDepth`——可选启用的准入上限（新）。**`resilienceSettings.requestQueue.maxQueueDepth`
约束一个"提供者+连接"同时允许多少请求处于排队状态（尚未调度）。当队列已持有 `maxQueueDepth` 个请求时，新请求会在到达 `limiter.schedule()` **之前**被快速拒绝，并携带带类型的 `code: "RATE_LIMIT_QUEUE_FULL"` 错误——因此拒绝的开销很低，并且发生在该请求的任何下游提示词压缩 / 翻译工作之前。默认 `0` = 禁用，保留现有的无界队列行为；取值范围 0–100000。可通过 `RATE_LIMIT_MAX_QUEUE_DEPTH`（环境变量）或 `resilienceSettings.requestQueue.maxQueueDepth`（仪表盘 / API patch）覆盖。

准入检查本身是一个纯函数（`open-sse/services/rateLimitManager/admission.ts::checkQueueAdmission`），因此无需真实的 Bottleneck 限流器即可进行单元测试。

> 发起 #6593 的 RFC 还提议了一个 `bypassCompressionOnRateLimit` 标志。本仓库的
> `open-sse/services/compression/` 流水线是对出站 LLM 请求进行提示词/上下文压缩（`chatCore.ts` 中
> `resolveCompressionSettings`/`selectCompressionStrategy` 代码块附近），而不是对合成的 429 响应体进行 HTTP 响应压缩——对于字面意义上的绕过标志，不存在匹配的代码路径。该提示词压缩步骤
> 目前在请求流水线中还运行在 `withRateLimit()` _之前_，因此在队列已满而被拒绝时通过重排序来跳过它是一个独立且更大的变更，超出了本问题的范围；此处有意**未**实现，并且如果节省 CPU 的收益值得承担重排序风险，则将其留作后续工作。

### 速率限制自动启用安全网与连接保护 (`rateLimitProtection`)

**自动启用安全网**（`resilienceSettings.requestQueue.autoEnableApiKeyProviders`，默认 `true`）：
默认情况下，OmniRoute 会为所有活动的 API 密钥提供者连接（`getProviderCategory(provider) === "apikey"`）自动启用速率限制队列保护。这可确保发往对速率敏感的上游 API 密钥的传入请求会通过 Bottleneck 排队并限流，而不是突发为上游 429 错误。该安全网可通过 `RATE_LIMIT_AUTO_ENABLE` 环境变量覆盖（`false`/`0`/`off` 禁用，`true`/`1`/`on` 强制开启），其优先级高于持久化的仪表盘设置（**设置 → 弹性** / `PATCH /api/resilience`）。

**每个连接的 `rateLimitProtection` 语义：**
每个连接的速率限制保护通过提供者连接上的 `rateLimitProtection` 布尔字段进行跟踪（在 SQLite 中持久化为 `rate_limit_protection`）：

- **显式开启（`rateLimitProtection === true`）**：无论提供者类别如何，也无论自动启用安全网是否开启，都会为此连接显式启用速率限制保护。
- **显式关闭（`rateLimitProtection === false`）**：会禁用显式保护，但**不会**让活动的 API 密钥连接退出全局自动启用安全网。在 `reconcileEnabledConnections`（`open-sse/services/rateLimitManager.ts`）中，`false` 与 `undefined` 等价：只有 `rateLimitProtection === true` 才被视为显式覆盖。如果 `rateLimitProtection` 为 `false`（或未设置），活动的 API 密钥连接仍会匹配自动启用条件，并继续保持速率限制保护。
- **没有每连接退出选项**：操作员目前无法表达“这一条活动的 API 密钥连接必须在没有速率限制队列保护的情况下运行”，同时为其他连接保持自动启用处于活动状态。要让 API 密钥连接完全在没有速率限制队列的情况下运行，必须全局关闭安全网（`RATE_LIMIT_AUTO_ENABLE=false` 或 `resilienceSettings.requestQueue.autoEnableApiKeyProviders = false`）。

**支持的写入路径：**

- **`POST /api/rate-limits`**：用于切换连接 `rateLimitProtection` 的受支持管理写入路径（`{ connectionId: string, enabled: boolean }`）。以 `enabled: true` 调用会开启显式保护；以 `enabled: false` 调用会移除显式保护（不过如果自动启用处于开启状态，活动的 API 密钥连接仍会在全局安全网覆盖之下）。
- **`PUT /api/providers/[id]`**：有意**不**接受或翻转 `rateLimitProtection`（#11278）。通过 `PUT /api/providers/[id]` 更新提供者连接元数据永远不会更改持久化的速率限制保护状态。

---

## 6. 慢流吞吐量看门狗（#9709）

可选的 `resilienceSettings.streamRecovery.throughputWatchdog` 防护机制用于检测这样一种上游：它仍在发送数据块，但产生的助手输出低于配置的有效输出速率。它与空闲超时（idle timeout）刻意区分开：心跳和元数据既不会重置这两个计时器中的任何一个，也不算作有效进展。它同样区别于硬性尝试截止期限（#9153）——无论输出质量如何，后者始终是绝对的安全上限。

看门狗必须先经过一段预热期，随后再积累一个完整的滚动窗口，才能触发中止。它统计来自 Chat Completions 与 Responses API 输出事件的文本增量（采用保守的 UTF-8 字节近似值），忽略仅含用量的事件与空事件，并在工具调用或推理事件进行期间暂停判定。该功能默认禁用，可通过 `STREAM_THROUGHPUT_WATCHDOG_ENABLED=true` 启用；窗口、预热期、最小速率与最小可测量输出均由常规的弹性设置规范化层进行边界约束。

启用后，看门狗中止仅作用于当前活跃的上游尝试。在任何客户端可见字节产生之前，现有的同账户早期恢复路径可以重新打开该尝试。提交（commit）之后，流绝不会被盲目重放；只有现有的安全流中续传契约才能拼接后缀。终结（Finalization）仍为单次执行，因此用量统计与信号量释放不会重复发生。

---

## 7. 上游状态码重述（状态码误报的配额错误）

**范围：** 一个使用错误 HTTP 状态码报告临时配额耗尽的上游网关。

**目的：** 在分类（classification）**之前**纠正误导性的状态码，使下游消费者（回退引擎、combo 聚合、面向客户端的响应）都能看到故障真正的可重试本质。

某些网关会用不可重试的 HTTP 状态码来表示**临时性**的配额耗尽。`agentrouter.org` 返回 `403`（有时是 `400`），响应体为中文（`用户额度不足` / `额度不足`），而不是标准的 `429`。像 Claude Code 这样的客户端会将 `403` 视为永久性错误并中止会话，而如果不加纠正，回退引擎会将其归类为 `AUTH_ERROR` 而不是配额事件。

**实现：**

- 注册表 + 匹配器：`open-sse/config/upstreamStatusRestatement.ts` —— 一份按提供者划分的规则列表（`{id, fromStatuses, toStatus, textMarkers,
excludeMarkers, defaultRetryAfterMs}`），通过 `applyStatusRestatement()` 进行匹配。
- 调用点：`open-sse/handlers/chatCore.ts` 中的 `providerFailure:` 代码块（约第 3654 行），位于 `parseUpstreamError()` 解析出带有错误 HTTP 状态码（`!providerResponse.ok`）的上游响应之后、任何分类逻辑运行之前，因此每个下游消费者都能看到纠正后的状态码。嵌入在 `200` SSE 流中的错误走的是另一条独立的、更靠后的流解析路径，目前**不**被此 hook 覆盖——这是一个已知的限制，但 agentrouter 的状态码误报（以错误 HTTP 状态码的形式出现）还不需要覆盖该路径。
- 重试资格：`429` 在 `RETRY_AFTER_ELIGIBLE_STATUSES`（`open-sse/services/combo/unavailableRetryGate.ts`）中，因此重述后的错误会携带真实的重试窗口，而不是以一个无解的 `403` 呈现出来。
- 合成的 `60s` `defaultRetryAfterMs`（`upstreamStatusRestatement.ts`）只是重述后的响应告知**客户端**的内容；它本身并不是连接内部的冷却/锁定时长——后者由实际处理该重述错误的机制单独控制（连接冷却的逐级退避，§2，API 密钥提供者的基础值为 `3s`；或模型锁定，§3，适用于 agentrouter 这类按模型配额的提供者）。路由器内部可能早于它向客户端宣告的 60 秒窗口就具备重试资格——这是有意预留的余量，不是 bug。

永久性错误（agentrouter 的 `无权访问模型`——即无权访问该模型）永远不会被重述：即使 `textMarkers` 命中，`excludeMarkers` 也会否决该规则，因此错误保留其原始状态码，不会有任何机制对它进行无休止的重试。匹配的提供者分类规则（`open-sse/config/providerErrorRules.ts` 中的 `agentrouter-model-access-denied`：`reason: "auth_error"`，`scope: "model"`，声明的基础冷却时间为 `6h`）由 `checkFallbackError`（`open-sse/services/accountFallback.ts`）在通用的 apikey 类别 `FORBIDDEN` 提前返回_之前_查询，并受 `honorsRuleLockScope(provider)` 门控（#10334——目前通过 `providerErrorRules.ts` 中的 `HONORS_RULE_LOCK_SCOPE_PROVIDERS` 允许列表仅限 agentrouter）。该规则声明的 6 小时冷却时间作为 `fallbackResult.baseCooldownMs` 传递，但它仍然进入既有的按模型配额锁定路径（`lockModelIfPerModelQuota()` / `recordModelLockoutFailure()`，除冷却时间来源外未被 #10334 改动）：与所有其他模型锁定一样，它会被钳制到运维人员配置的 `mlSettings.maxCooldownMs`（默认 `1_800_000ms` / 30 分钟），并且_持久化的锁定原因_仍然是既有硬编码的 `"forbidden"`，而不是规则的 `"auth_error"`——端到端生效的只有冷却时长，而不是原因字符串。连接本身保持活跃；同一连接上的其他兄弟模型不受影响。

重述后的配额错误（`额度不足`）在生产环境中会命中一条提供者规则（`agentrouter-user-quota-exhausted`：`reason: "quota_exhausted"`，`scope: "connection"`，自身没有声明冷却时间——适用持久化层的按比例退避默认值）。自 #10334 起，`ProviderErrorRuleMatch` 上的 `scope` 确实被端到端消费，但**仅**适用于 `HONORS_RULE_LOCK_SCOPE_PROVIDERS` 允许列表中的提供者（`providerErrorRules.ts`——目前只有 `"agentrouter"`，通过 `honorsRuleLockScope()` 门控）。对于其他所有提供者，`scope` 仍然只是信息性的，与 #10334 之前完全相同。`checkFallbackError` 将匹配规则的 scope 暴露为 `fallbackResult.ruleScope`；`isAgentrouterConnectionQuotaScope()`（`src/sse/services/auth.ts`）是一个共享的守卫函数，用于确认某个 `ruleScope` 确实可以安全地作为连接范围的、可自我恢复的信号来采纳（scope 为 `"connection"`，reason 为 `quota_exhausted`，绝不为 `permanent`，绝不为 `creditsExhausted`——这是为了防御未来某条规则将 scope `"connection"` 与永久账户状态配对的情况）。有两个消费者调用它：

- **持久化**（`markAccountUnavailable()`，`src/sse/services/auth.ts`）：
  不再落入 passthrough 提供者的**按模型**锁定分支
  （agentrouter 为 `passthroughModels: true` → `hasPerModelQuota()`
  返回 `true`），而是应用**临时连接冷却**——
  `testStatus: "unavailable"` + `rateLimitedUntil`，永远不会是终止状态
  （`credits_exhausted`/`banned`/`expired`）——因此连接在冷却期
  结束后会自行恢复，而无需手动重置凭据。
  对于设置了 `disableCooling: true` 的连接则跳过此逻辑（#2997）：
  该 opt-out 会转而落入按模型锁定（这是一个已记录在案的权衡——
  请参阅该分支上方的代码注释）。
- **同一请求内的 combo 路由**（`applyComboTargetExhaustion()`，
  `open-sse/services/combo/targetExhaustion.ts`）：同一个守卫会把该连接
  标记进内存中的 `exhaustedConnections` 集合，键为
  `${provider}:${connectionId}`。这只会跳过那些_自身目标对象上已经
  携带该确切 `connectionId`_ 的同一请求（SAME-REQUEST）剩余目标
  （`getExhaustedTargetSkipReason()`，
  `open-sse/services/combo/comboPredicates.ts`，即在 `exhaustedConnections`
  查找之前的 `if (provider &&
connectionId)`）——而普通的模型列表 combo
  中，兄弟目标自身并不携带固定的 `connectionId`，只在每次分发时根据响应的
  `X-OmniRoute-Selected-Connection-Id` 头解析出一个，因此永远不会
  命中该键匹配。对于这种常见情况，真正防止剩余分支（leg）复用
  刚刚耗尽的账户的并不是这个 Set——而是上面的持久化层
  （该连接的 `rateLimitedUntil` 现在已位于未来时间），再加上
  同一个守卫抑制了该失败的 `transientRateLimitedProviders`
  （参见"两阶段设计"以及 `targetExhaustion.ts` 中
  `isAgentrouterConnectionQuotaScope` 分支上的代码注释）：由于
  该 Set 未被标记，`combo.ts` 的 `allowRateLimitedConnection` 强制放行
  （`open-sse/services/combo.ts:1005-1013`、`:2734-2738`）不会对
  该提供者的剩余分支生效，因此凭据选择的 `rateLimitedUntil`
  过滤器（`src/sse/services/auth.ts:1238`）会被正常遵守，
  剩余分支要么选择一个不同的、仍然符合条件的 agentrouter
  连接，要么因无可用凭据而失败——它不会强行
  回到这个分支刚刚冷却的连接上。

### 两阶段设计：先状态重述，再分类

状态重述（`upstreamStatusRestatement.ts`）与提供者
分类规则（`open-sse/config/providerErrorRules.ts`，
`providerRuleRegistry`）是两个独立的注册表，二者都以提供者 id
和文本标记作为键，但它们在不同位置运行、服务于不同
目的：重述在 `chatCore.ts` 的早期阶段重写 HTTP 状态；
分类规则则在 `checkFallbackError()`
（`open-sse/services/accountFallback.ts`）内部选择回退 `reason`
并锁定 `scope`（`model` / `provider` / `connection`）。

只有对 `providerErrorRules.ts` 中 `FULL_TEXT_RULE_PROVIDERS`
允许列表里列出的提供者，分类规则才能看到完整的错误**文本**
（这是匹配 `额度不足` 这类正文标记所必需的）——目前
只有 `"agentrouter"`。对于其他所有**内置目录**提供者，
`checkFallbackError` 只把结构化错误（`{code, type}`）交给
`getProviderErrorRuleMatch`，这对于基于 header/状态/代码的规则
已经足够，但对正文文本标记则无能为力。
辅助函数 `resolveRuleMatchBody()` 执行这一选择：允许列表中的
提供者获得完整错误文本，其他提供者则获得结构化错误。将
**内置**提供者添加到 `FULL_TEXT_RULE_PROVIDERS` 是一个显式的
逐提供者 opt-in——其存在是为了让不在列表中的每个提供者的
默认路径保持逐字节不变。

规则的 `scope`（`model` / `provider` / `connection`）是独立于
`FULL_TEXT_RULE_PROVIDERS` 的另一个 opt-in：
`checkFallbackError` 只将其作为 `fallbackResult.ruleScope` 暴露出来，
而下游消费者只有对同一文件中
`HONORS_RULE_LOCK_SCOPE_PROVIDERS` 允许列表里的提供者，才会把它当作
信息性标签以外的东西来遵守（通过 `honorsRuleLockScope()` 进行门控——目前只有 `"agentrouter"`）。关于提供者进入该允许列表后
`scope: "connection"` 匹配实际会做什么，请参阅上文的
"重述的配额错误"。

**#11104——运营者声明的规则绕过两个允许列表。** 运营者可以
在运行时通过 `settings.providerErrorRules`
（`open-sse/config/providerErrorRules.ts::setOperatorProviderErrorRules`）
声明逐提供者规则，而无需编辑此文件。若将运营者规则门控在
`FULL_TEXT_RULE_PROVIDERS`/`HONORS_RULE_LOCK_SCOPE_PROVIDERS` 之后
——这些允许列表旨在保护内置目录规则的**默认**行为——
将使设置机制对除已列入其中的提供者之外的所有提供者失效，
因为声明规则本身已经是运营者的显式
opt-in。`resolveRuleMatchBody()` 和 `honorsRuleLockScope()` 都会先检查
`hasOperatorRuleForProvider()`：拥有运营者规则的提供者会获得
原始错误文本，并且其声明的 `scope` 会被遵守，无论它
是否也出现在任一允许列表中。

**已知缺口——HTTP 400 从不咨询 `providerRuleRegistry`。**
`checkFallbackError` 的 `BAD_REQUEST` 分支完全通过它自己的
模式数组（`accountFallback.ts` 中的 `MODEL_ACCESS_DENIED_PATTERNS`、
`CONTEXT_OVERFLOW_PATTERNS` 等）对状态 400 进行分类，
并在到达其上方的
`configuredRule`/`getProviderErrorRuleMatch` 分支之前返回。
带有 `status: 400` 的内置目录规则（或运营者规则）在语法上
是有效的，但永远不会触发。目前没有任何现有规则针对
400，因此生产环境不受影响——但未来的 400 规则需要先
改动此分支，这比添加一条规则的改动更大（它会为每个
已经依赖模式数组行为的提供者重新分类 400），
并且超出了单个提供者规则添加的范围。

### 添加新的配额误报网关

1. 在 `statusRestatementRegistry`
   （`open-sse/config/upstreamStatusRestatement.ts`）中注册一个规则数组。保持 `textMarkers`
   提供者专属；切勿复用会与
   `CREDITS_EXHAUSTED_SIGNALS`（`open-sse/services/accountFallback.ts`）冲突的通用英文短语。
2. 可选地在
   `open-sse/config/providerErrorRules.ts`（`providerRuleRegistry`）中注册分类规则，以选择正确的锁定范围（账户级配额用 `connection`，按模型的错误用 `model`）。此步骤仅对那些规则需要完整错误文本（body 标记）的提供者在生产环境中生效：将提供者 id 加入同一文件中的 `FULL_TEXT_RULE_PROVIDERS` —— 否则 `checkFallbackError` 只会把结构化的 `{code, type}` 错误交给规则，body 文本规则将永远无法匹配实时流量。纯粹基于 `status`/`headers` 匹配的规则（如 Opencode 或 Minimax 的规则）不需要此显式启用。另外，如果规则声明了 `scope: "connection"` 且意图是实际的连接级冷却加同请求 combo 跳过（而不仅是信息性标签），请将提供者 id 加入同一文件中的 `HONORS_RULE_LOCK_SCOPE_PROVIDERS` —— 正是它门控着 `markAccountUnavailable()`（`src/sse/services/auth.ts`）和
   `applyComboTargetExhaustion()`
   （`open-sse/services/combo/targetExhaustion.ts`）中 `isAgentrouterConnectionQuotaScope()` 式的消费；没有它，`scope` 仍会流经 `fallbackResult.ruleScope`，但没有任何逻辑对其采取行动。
3. 添加参照 `tests/unit/upstream-status-restatement.test.ts`
   和 `tests/unit/agentrouter-error-rules.test.ts` 的单元测试（包括
   not-permanent / not-creditsExhausted 守卫，以及 —— 如果该提供者需要允许列表 —— 一个断言 `resolveRuleMatchBody()` 仅对该提供者返回完整文本的测试）。

无需更改 `chatCore.ts`、`classifyError` 或 combo。

#### 出口分桶锁定 (#10880)

`EGRESS_BUCKETED_LOCK_PROVIDERS` 中的提供者（opencode 家族）被视为按 IP 分桶的上游（opencode 免费层是按 IP 分桶的，而非按账户分桶 —— 见 #9611）：被分类为 `quota_exhausted` **或** `rate_limit_exceeded` 的 status-429 会在轮换尝试之前，冷却所有最后已知出口 IP 与失败连接相匹配的允许列表家族连接
—— 避免 N-1 次注定失败的上游调用（与 #10460/#10525 形态相同）。`rate_limit_exceeded` 是有意包含的：在 `markAccountUnavailable`
路径上，opencode 专属规则从不匹配（没有 headers/body 被交给
`checkFallbackError`，opencode 也不在 `FULL_TEXT_RULE_PROVIDERS` 中），因此 body 携带订阅配额文本（"monthly usage limit
reached"）的 429 会在 `status_429` 规则被触及之前，就被配额文本回退
（`buildSubscriptionQuotaFallback`，`accountFallback.ts`；1 小时冷却）分类为 `quota_exhausted` —— 而不含配额文本的 429（纯速率限制）通过 `status_429` 规则分类为 `rate_limit_exceeded`，并且仍会冷却该 IP 家族。对于允许列表中的提供者，按 IP 分桶的速率限制与配额耗尽是同一信号。如实说明的局限：

- **尽力而为**：锁从 `proxy_logs` 解析该连接最近已知的 `egress_ip`
  （24 小时窗口，同步，无缓存）。缓存冷启动（出口 IP 从未探测过）
  或没有记录 → 失败的连接仍会被该分支冷却（与今天一样记录），
  只是没有同级连接被锁定。
- **永不终结**：冷却是一个可续期的配额窗口
  （`testStatus: "unavailable"`）；永远不会从 IP 级信号推导出
  永久状态。`disableCooling` 连接会完全跳过该分支。
- **白名单家族的锁定粒度发生变化**：这是一个作用域变更，而不仅仅是
  同级优化。opencode 是一个 `passthroughModels` 提供者，因此在此分支
  之前，429 会产生按模型的锁定；现在它会产生连接级冷却——包括对于
  运行单个连接且完全没有同级连接的操作者。这正是 opencode 规则表
  已声明为正确的粒度（`scope: "connection"`，
  `providerErrorRules.ts`），但由于 opencode 不在
  `HONORS_RULE_LOCK_SCOPE_PROVIDERS` 中，至今从未被遵守。该分支自行
  写入失败连接的冷却 + `backoffLevel`，镜像了连接作用域的
  agentrouter 分支，然后返回——下方的按模型块和通用路径永远不会
  被执行到。
- **包含组合调用**：与 agentrouter 分支一样，该作用域刻意忽略
  组合调用方对 429 应用的 `persistUnavailableState`/`isCombo` 降级。
  按模型锁定并不是该作用域的更弱形式，而是错误的单位：它对已耗尽的
  IP 没有任何说明，因此组合轮换会继续在每个同级连接上浪费一次
  注定失败的调用。
- **同级安全**：已处于终结状态（banned/credits_exhausted）或已处于
  更长冷却期的同级连接永远不会被覆盖。
- **排他性白名单**：扩展 `EGRESS_BUCKETED_LOCK_PROVIDERS` 是所有者的
  明确决定；不做通用接线（模式 #10334/#10419）。同级查询绑定同一个
  白名单，而不是将其作为 SQL 字面量重复，因此扩展它仍然只需
  一行改动。
- **出口 IP 轮换，双向影响**：查找窗口（24 小时）远宽于出口 IP 缓存
  TTL（5 分钟），因此"最近已知 IP"是历史记录，而非当前状态。如果
  连接的代理在窗口内发生了轮换，锁可能会**错过**一个真正共享的 IP
  （记录的 IP 是新的、未耗尽的）——对称地，它也可能会**冷却一个
  已经从耗尽的 IP 轮换走的同级连接**。第二种情况会让该同级连接
  损失一个冷却窗口；两者都是基于历史记录的查找所接受的
  尽力而为的局限。
- **成本**：对 `proxy_logs` 进行两次有界扫描（通过
  `idx_pl_timestamp` 进行窗口过滤），仅在 429 频率下发生。不新增
  索引（迁移 134 YAGNI）。在中等规模的真实流量数据库副本上测量；
  高吞吐量实例在同一窗口内按比例持有更多行。

---

## 其他弹性功能

- **21 种路由策略**（priority、weighted、round-robin、context-relay、fill-first、p2c、random、least-used、cost-optimized、reset-aware、reset-window、expiry-first、headroom、quota-weighted、strict-random、auto、lkgp、context-optimized、cache-optimized、fusion、pipeline）—— 参见 [AUTO-COMBO.md](../routing/AUTO-COMBO.md)。
- **重置感知路由**（v3.8.0）—— 按配额重置时间对连接进行优先级排序。
- **后台模式降级** —— Responses API 的 `background: true` 会降级为同步执行并附带警告。
- **动态工具数量限制检测** —— 当触及工具数量限制时，对提供者进行退避。
- **紧急回退** —— 由 `OMNIROUTE_EMERGENCY_FALLBACK` 控制；运维人员无需重启即可在功能开关页面覆盖该设置。

---

## 调试

- 加权组合（Weighted combo）返回 `503 all_targets_cooling_down`（设置了 `Retry-After`，`diagnostics.excluded` 列出每个目标及其 `model_lockout` / `circuit_open` / `provider_cooldown` / `unavailable` 状态）→ 说明资源池已配置并连接，只是所有目标都被某个弹性计时器排除了；`[COMBO] Weighted selection: every target excluded before dispatch — …` 警告会给出原因和剩余秒数。同一个组合返回 `404 no_executable_targets` 则表示没有涉及弹性计时器（没有可运行的目标，或者每个账号都未通过可用性探测）。构建逻辑位于 `open-sse/services/combo/pinRecovery.ts`，排除信息收集自 `targetResolution.ts`。
- 某个提供者的所有密钥都被跳过 → 同时检查熔断器状态**和**每个连接的 `rateLimitedUntil`/`testStatus`。
- 提供者在重置窗口之后仍被永久排除 → 代码直接读取原始 `state`，而不是使用 `getStatus()`/`canExecute()`。
- 一个密钥失败，其他密钥应该可用 → 优先使用连接冷却而非熔断器。
- 只有一个模型失败 → 优先使用模型锁定而非连接冷却。
- 状态本应自动恢复但没有恢复 → 检查是否存在未来时间戳，以及读取路径是否会刷新过期状态。永久性状态需要手动修改。

---

## 运行时状态 —— 代理快速参考

> 原文从 `AGENTS.md` 的 "Resilience Runtime State" 一节原样迁移而来（PR #12743），
> 以使代理指南保持在 40k 上下文预算之内。这是上述各节的精简、面向代理的视图；
> 编号章节仍是完整参考。

OmniRoute 有三种相关但不同的临时故障机制。在调试路由行为时，请保持它们的
作用域清晰区分。参见
[3 层弹性架构图](../diagrams/exported/resilience-3layers.svg)
（源文件：[diagrams/resilience-3layers.mmd](../diagrams/resilience-3layers.mmd)）
以快速了解整体结构。

### 提供者熔断器

**作用域**：整个提供者，例如 `glm`、`openai`、`anthropic`。

**目的**：停止向在上游/服务层面反复失败的提供者发送流量，避免一个不健康的
提供者拖慢每个请求。

**实现**：

- 核心类：`src/shared/utils/circuitBreaker.ts`
- 聊天门控/执行接线：`src/sse/handlers/chatHelpers.ts`、`src/sse/handlers/chat.ts`
- 运行时状态 API：`src/app/api/monitoring/health/route.ts`
- 共享封装：`open-sse/services/accountFallback.ts`
- 持久化状态表：`domain_circuit_breakers`

**状态**（共 4 个 —— `src/shared/utils/circuitBreaker.ts`）：

- `CLOSED`：正常放行流量。
- `DEGRADED`：预警区间 —— 失败次数已越过降级阈值，但尚未达到熔断
  阈值；流量仍然放行，仪表盘显示警告。一次有效的连接测试或一段没有
  新故障的静默窗口会使其回到 `CLOSED`
  （窗口说明见 `docs/architecture/RESILIENCE_GUIDE.md`）。
- `OPEN`：提供者被临时阻断；调用方会收到提供者熔断响应，
  或者组合路由跳到其他目标。
- `HALF_OPEN`：重置超时已到；允许一个探测请求。探测成功则闭合
  熔断器，失败则再次打开。

**默认值**（`open-sse/config/constants.ts` → `PROVIDER_PROFILES`，经由
`src/lib/resilience/settings.ts` 中的 `DEFAULT_RESILIENCE_SETTINGS.providerBreaker` 消费，
再传入 `src/sse/handlers/chatHelpers.ts` 中的 `getCircuitBreaker(provider, …)`）。整个提供者级别的
熔断器依据 `circuitBreakerThreshold` / `circuitBreakerReset` 运行：

| 配置文件 | 降级阈值 | 熔断阈值（`circuitBreakerThreshold`） | 重置时间（`circuitBreakerReset`） |
| -------- | -------: | ------------------------------------: | --------------------------------: |
| OAuth    |      `5` |                                   `8` |                             `60s` |
| API 密钥 |      `7` |                                  `12` |                             `30s` |
| 本地     | （派生） |                                   `2` |                             `15s` |

`PROVIDER_PROFILES` 还定义了 `providerFailureThreshold`（10/15/2）、
`providerFailureWindowMs`（15/30/5 分钟）和 `providerCooldownMs`（5/10/1 分钟）：这些参数驱动的是
**可选开启的全局提供者冷却（Provider Cooldown）的窗口门控**（`PROVIDER_COOLDOWN_ENABLED`，默认
关闭）—— `open-sse/services/providerCooldownTracker.ts` 中的提供者级条目只有在
`providerFailureWindowMs` 窗口内达到 `providerFailureThreshold` 次失败后才算进入冷却，随后
冷却 `providerCooldownMs` 时长。它们**不是**实时熔断器的阈值 —— 不要调整它们并期望
改变熔断器行为。所有默认值都可以通过
`OMNIROUTE_PROVIDER_BREAKER_*` 和 `OMNIROUTE_CIRCUIT_BREAKER_*` 环境变量覆盖；
与运行时一致的参考表位于 `docs/architecture/RESILIENCE_GUIDE.md`。

只有提供者级别的故障状态码才应触发提供者熔断器：

```ts
(408, 500, 502, 503, 504);
```

对于普通的账号/密钥/模型错误，例如大多数 `401`、`403` 或 `429` 情况，不应触发
整个提供者级别的熔断器。这些通常属于连接冷却或模型锁定的范畴。通用 API 密钥
提供者返回的 `403` 应该是可恢复的，除非它被归类为终止性的提供者/账号错误。

断路器采用惰性恢复，而非后台定时器。当 `OPEN` 状态过期时，诸如
`getStatus()`、`canExecute()` 和 `getRetryAfterMs()` 的读取操作会将状态刷新为
`HALF_OPEN`，这样仪表盘和组合候选构建器就不会一直无限期地排除一个已过期的 provider。

### 连接冷却（Connection Cooldown）

**作用范围**：单个 provider 连接/账户/密钥。

**目的**：临时跳过一个异常的密钥/账户，同时允许同一 provider 的其他连接继续处理请求。

**实现**：

- 写入/更新路径：`src/sse/services/auth.ts::markAccountUnavailable()`
- 账户选择/过滤：`src/sse/services/auth.ts::getProviderCredentials...`
- 冷却时间计算：`open-sse/services/accountFallback.ts::checkFallbackError()`
- 设置：`src/lib/resilience/settings.ts`

provider 连接上的重要字段：

```ts
rateLimitedUntil;
testStatus: "unavailable";
lastError;
lastErrorType;
errorCode;
backoffLevel;
```

在账户选择期间，满足以下条件时连接会被跳过：

```ts
new Date(rateLimitedUntil).getTime() > Date.now();
```

冷却同样是惰性的：当 `rateLimitedUntil` 已成为过去时间，连接将重新变为可用。成功使用后，`clearAccountError()` 会清除 `testStatus`、
`rateLimitedUntil`、错误字段以及 `backoffLevel`。

默认的连接冷却行为：

- OAuth 基础冷却时间：`5s`。
- API 密钥基础冷却时间：`3s`。
- API 密钥遇到 `429` 时，应优先采用上游的重试提示（`Retry-After`、reset 响应头或
  可解析的 reset 文本），如果有的话。
- 重复出现的可恢复故障使用指数退避：

```ts
baseCooldownMs * 2 ** failureIndex;
```

防惊群（anti-thundering-herd）保护机制可防止同一连接上的并发故障反复延长冷却时间或重复递增 `backoffLevel`。

终态（terminal states）不是冷却。`banned`、`expired`（仅在经过 N 次有界重试后才变为终态，由 `EXPIRED_RETRY_MAX` 控制）和 `credits_exhausted` 旨在保持不可用状态，直到凭据/设置发生变更或由运维人员手动重置。
不要用瞬态冷却状态覆盖终态。

### 模型锁定（Model Lockout）

**作用范围**：provider + 连接 + 模型。

**目的**：当某个连接上仅有一个模型不可用或配额受限时，避免禁用整个连接。

示例：

- 按模型配额计费的 provider 返回 `429`。
- 本地 provider 对某个缺失的模型返回 `404`。
- 特定 provider 的模式/模型权限故障，例如选定的 Grok 模式。

模型锁定位于 `open-sse/services/accountFallback.ts`，它允许同一连接继续为其他模型提供服务。

### 调试指南

- 如果某个 provider 的所有密钥都被跳过，请同时检查 provider 断路器状态和每个
  连接的 `rateLimitedUntil`/`testStatus`。
- 如果某个 provider 在重置窗口之后似乎被永久排除，请检查代码是否在直接读取原始的
  `state`，而没有使用 `getStatus()`/`canExecute()`。
- 如果某个 provider 密钥失败但其他密钥应该可用，优先使用连接冷却而非
  provider 断路器。
- 如果只有一个模型失败，优先使用模型锁定而非连接冷却。
- 如果某个状态应当自我恢复，它应该具有一个未来的时间戳/重置超时，以及一条
  能刷新过期状态的读取路径。永久性状态需要手动修改凭据或配置。

---

## TLS 指纹识别与隐匿

特定于提供者的隐匿技术（JA3/JA4、CCH、混淆）另有单独文档记载 — 参见 `docs/security/STEALTH_GUIDE.md`（位于 git 中；未编译进 `/docs`）。

---

## 韧性测试（第 8 阶段 · Block C）

除了针对韧性逻辑的单元测试之外，还有三个测试在真实的压力/故障条件下检验运行时（全部为集成/夜间测试 — 均不阻塞 PR）：

| 测试        | 说明                                                                                                                       | 运行方式                               |
| ----------- | -------------------------------------------------------------------------------------------------------------------------- | -------------------------------------- |
| Chaos       | 伪上游节点注入真实的延迟/重置/超时/503；验证断路器是否打开/恢复，以及 `checkFallbackError` 是否将 503 归类为可恢复的回退。 | `RUN_CHAOS_INT=1 npm run test:chaos`   |
| Heap-growth | 在 `--expose-gc` 下每次 `createSSEStream` 运行约 500 个流；若堆增长超过上限则失败（OOM 防护 #3069）。                      | `npm run test:heap`                    |
| k6 soak     | 对 `/api/monitoring/health` 施加持续负载；检查 p95/错误率阈值。                                                            | `k6 run tests/load/k6-soak.js`（夜间） |

由 `.github/workflows/nightly-resilience.yml`（cron + dispatch）编排。在默认的 `test:integration` 中，chaos 和 heap 测试会自动跳过（缺少 `RUN_CHAOS_INT`/`--expose-gc` 时）。

---

## 另请参阅

- [架构指南](./ARCHITECTURE.md) — 系统架构与内部实现
- [用户指南](../guides/USER_GUIDE.md) — 提供者、组合与 CLI 集成
- [自动组合引擎](../routing/AUTO-COMBO.md) — 16 因子评分与模式包
