# Account-Ban / Banned-Keyword Detection (中文 (简体))

🌐 **Languages:** 🇺🇸 [English](../../../../security/BAN_DETECTION.md) · 🇪🇹 [am](../../../am/docs/security/BAN_DETECTION.md) · 🇸🇦 [ar](../../../ar/docs/security/BAN_DETECTION.md) · 🇦🇿 [az](../../../az/docs/security/BAN_DETECTION.md) · 🇧🇬 [bg](../../../bg/docs/security/BAN_DETECTION.md) · 🇧🇩 [bn](../../../bn/docs/security/BAN_DETECTION.md) · 🇧🇦 [bs](../../../bs/docs/security/BAN_DETECTION.md) · 🇨🇿 [cs](../../../cs/docs/security/BAN_DETECTION.md) · 🇩🇰 [da](../../../da/docs/security/BAN_DETECTION.md) · 🇩🇪 [de](../../../de/docs/security/BAN_DETECTION.md) · 🇬🇷 [el](../../../el/docs/security/BAN_DETECTION.md) · 🇪🇸 [es](../../../es/docs/security/BAN_DETECTION.md) · 🇪🇪 [et](../../../et/docs/security/BAN_DETECTION.md) · 🇮🇷 [fa](../../../fa/docs/security/BAN_DETECTION.md) · 🇫🇮 [fi](../../../fi/docs/security/BAN_DETECTION.md) · 🇫🇷 [fr](../../../fr/docs/security/BAN_DETECTION.md) · 🇮🇪 [ga](../../../ga/docs/security/BAN_DETECTION.md) · 🇮🇳 [gu](../../../gu/docs/security/BAN_DETECTION.md) · 🇳🇬 [ha](../../../ha/docs/security/BAN_DETECTION.md) · 🇮🇱 [he](../../../he/docs/security/BAN_DETECTION.md) · 🇮🇳 [hi](../../../hi/docs/security/BAN_DETECTION.md) · 🇭🇷 [hr](../../../hr/docs/security/BAN_DETECTION.md) · 🇭🇺 [hu](../../../hu/docs/security/BAN_DETECTION.md) · 🇦🇲 [hy](../../../hy/docs/security/BAN_DETECTION.md) · 🇮🇩 [id](../../../id/docs/security/BAN_DETECTION.md) · 🇳🇬 [ig](../../../ig/docs/security/BAN_DETECTION.md) · 🇮🇹 [it](../../../it/docs/security/BAN_DETECTION.md) · 🇯🇵 [ja](../../../ja/docs/security/BAN_DETECTION.md) · 🇬🇪 [ka](../../../ka/docs/security/BAN_DETECTION.md) · 🇰🇭 [km](../../../km/docs/security/BAN_DETECTION.md) · 🇮🇳 [kn](../../../kn/docs/security/BAN_DETECTION.md) · 🇰🇷 [ko](../../../ko/docs/security/BAN_DETECTION.md) · 🇱🇹 [lt](../../../lt/docs/security/BAN_DETECTION.md) · 🇱🇻 [lv](../../../lv/docs/security/BAN_DETECTION.md) · 🇮🇳 [ml](../../../ml/docs/security/BAN_DETECTION.md) · 🇮🇳 [mr](../../../mr/docs/security/BAN_DETECTION.md) · 🇲🇾 [ms](../../../ms/docs/security/BAN_DETECTION.md) · 🇲🇹 [mt](../../../mt/docs/security/BAN_DETECTION.md) · 🇲🇲 [my](../../../my/docs/security/BAN_DETECTION.md) · 🇳🇵 [ne](../../../ne/docs/security/BAN_DETECTION.md) · 🇳🇱 [nl](../../../nl/docs/security/BAN_DETECTION.md) · 🇳🇴 [no](../../../no/docs/security/BAN_DETECTION.md) · 🇮🇳 [or](../../../or/docs/security/BAN_DETECTION.md) · 🇮🇳 [pa](../../../pa/docs/security/BAN_DETECTION.md) · 🇵🇭 [phi](../../../phi/docs/security/BAN_DETECTION.md) · 🇵🇱 [pl](../../../pl/docs/security/BAN_DETECTION.md) · 🇵🇹 [pt](../../../pt/docs/security/BAN_DETECTION.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/BAN_DETECTION.md) · 🇷🇴 [ro](../../../ro/docs/security/BAN_DETECTION.md) · 🇷🇺 [ru](../../../ru/docs/security/BAN_DETECTION.md) · 🇱🇰 [si](../../../si/docs/security/BAN_DETECTION.md) · 🇸🇰 [sk](../../../sk/docs/security/BAN_DETECTION.md) · 🇸🇮 [sl](../../../sl/docs/security/BAN_DETECTION.md) · 🇷🇸 [sr](../../../sr/docs/security/BAN_DETECTION.md) · 🇸🇪 [sv](../../../sv/docs/security/BAN_DETECTION.md) · 🇰🇪 [sw](../../../sw/docs/security/BAN_DETECTION.md) · 🇮🇳 [ta](../../../ta/docs/security/BAN_DETECTION.md) · 🇮🇳 [te](../../../te/docs/security/BAN_DETECTION.md) · 🇹🇭 [th](../../../th/docs/security/BAN_DETECTION.md) · 🇹🇷 [tr](../../../tr/docs/security/BAN_DETECTION.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/BAN_DETECTION.md) · 🇵🇰 [ur](../../../ur/docs/security/BAN_DETECTION.md) · 🇺🇿 [uz](../../../uz/docs/security/BAN_DETECTION.md) · 🇻🇳 [vi](../../../vi/docs/security/BAN_DETECTION.md) · 🇳🇬 [yo](../../../yo/docs/security/BAN_DETECTION.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/BAN_DETECTION.md)

---

OmniRoute 会扫描上游错误响应，查找表明提供者**账户已永久失效**（已暂停 / 已停用 / 因违反服务条款而被封禁）的信号；匹配后，会将该连接移入终止性的 **`banned` 状态**，使其不再被选中处理请求。这正是 **Security → Banned Keywords** 设置卡所配置的内容（“触发永久账户封禁检测的其他关键词。内置关键词始终生效。”）。

本页记录了内置列表、检测流程、适用范围、如何安全地添加自定义关键词，以及如何恢复被标记的连接。终止状态本身是弹性模型的一部分——请参阅
[RESILIENCE_GUIDE](../architecture/RESILIENCE_GUIDE.md)（“终止状态”）。

**事实来源：** `open-sse/services/accountFallback.ts`
（`ACCOUNT_DEACTIVATED_SIGNALS`、`getMergedBannedSignals()`、`isAccountDeactivated()`）。

## 内置关键词

无论是否配置了自定义列表，以下 8 个子字符串始终生效（不区分大小写）：

```
account_deactivated
account has been deactivated
account has been disabled
your account has been suspended
this account is deactivated
verify your account to continue                                 (Antigravity / Google Cloud Code)
this service has been disabled in this account for violation    (Antigravity)
this service has been disabled in this account                  (Antigravity)
```

> 随着提供者更改其封禁措辞，此列表也会不断演变。权威版本是
> `open-sse/services/accountFallback.ts` 中的 `ACCOUNT_DEACTIVATED_SIGNALS`；
> 请将上面的代码块视为快照。

同一文件中还有两个相邻但**独立**的信号表，它们_不_属于封禁关键词检测：

- `CREDITS_EXHAUSTED_SIGNALS` — 账单额度/配额已耗尽（`insufficient_quota`、
  `credit_balance_too_low`、`payment required`，……）→ 终止性的 `credits_exhausted`。
- `OAUTH_INVALID_TOKEN_SIGNALS` — **非终止性**；可通过刷新令牌恢复。

注意：**`rate limit`** / `429` 等常见的暂时性短语由速率限制 / 连接冷却流程处理，**不**属于封禁信号。

## 检测流程

```
上游错误响应
  → 将响应正文转换为字符串并转为小写
  → isAccountDeactivated(body): getMergedBannedSignals().some(sig => body.includes(sig))   [子字符串匹配]
  → 是否匹配？
      → 连接 testStatus = "banned"      （永久——冷却期为 1 年，绝不会自动恢复）
      → 如果设置 `autoDisableBannedAccounts` 已开启，且 `autoDisableBannedScope`
        包含此连接（`all`，或对于 OAuth/cookie/session 为 `subscription`）
        → 同时设置 isActive = false。当范围为
        `subscription` 时，预付费 API 密钥仍保持活动状态。
      → 账户选择期间跳过该连接（组合 QUOTA_BLOCKING 状态）
```

- 匹配方式是对响应**正文**执行**不区分大小写的子字符串**搜索
  （`isAccountDeactivated`、`accountFallback.ts`）。
- 只要响应正文中包含封禁信号，无论 **HTTP 状态码**为何，都会触发永久性的 `banned` 终止处理（通过 `markAccountUnavailable` → `checkFallbackError`）。范围更窄的 **`deactivated`** 标签（当连接没有备用 API 密钥时设为 `isActive=false`）由 `chatCore.ts` 的内联路径在 **HTTP 401 / 403** 时写入（通过 `classifyProviderError` → `ACCOUNT_DEACTIVATED` 进行分类）。请注意，对于相同的 `ACCOUNT_DEACTIVATED` 信号，`markAccountUnavailable()` 路径会写入一个_不同的_终止状态——**`expired`**（通过 `resolveTerminalConnectionStatus`）；因此，同一次封禁可能显示为 `deactivated` 或 `expired`，具体取决于由哪条路径处理该响应。（较早的代码注释称“当 401 响应正文包含这些字符串时”——这低估了当前行为的适用范围。）
- 在所有过滤终止状态的位置，`banned` 连接都会被排除在选择范围之外（`isTerminalConnectionStatus`、组合 `QUOTA_BLOCKING_CONNECTION_STATUSES`）。

## 范围 — 扫描哪些提供者

**所有提供者。** 该检查在通用错误处理管线中运行，每个失败的上游请求都会经过该管线——它**不**仅限于 OAuth/订阅抓取器。最终产生的终止状态是针对每个**连接**的，而不是每个提供者。

不过，内置的_字符串_主要面向确实存在封禁风险的订阅/OAuth 提供者（ChatGPT Web Codex、Claude Web、Codex、Muse Spark、Antigravity）。只有当 API 密钥提供者的错误响应正文确实包含其中某个子字符串时，才会触发检测器。

`autoDisableBannedScope`（`all` | `subscription`，默认为 `all`）控制匹配后是否同时将 `isActive=false`。`subscription` 表示登录式席位（付费订阅和免费账户，包括 Web Cookie 会话）。对于预付费 API 密钥，它仍会记录 `testStatus=banned`，但会将其保留在路由池中。长期设计方案是提供按提供者和按账户的覆盖设置；全局枚举只是第一版实现。

## 自定义封禁关键词

可在**安全性 → 封禁关键词**中添加或删除关键词（通过 `PATCH /api/settings` 持久化为全局 `customBannedSignals` 设置）。它们会**添加到**内置列表中——绝不会替换内置列表——并在保存时（以及启动时）通过 `setCustomBannedSignals()` 热重载。每个关键词最多 200 个字符；数组长度没有限制。

**⚠ 误报风险——请选择具体的短语。** 检测方式是在整个响应正文上执行原始子字符串匹配，并且一旦匹配就是**永久性的**（1 年冷却期，需要手动恢复）。过于宽泛的关键词可能会封禁一个完全正常的连接：

- **不推荐：** `quota`、`limit`、`error`、`denied`——这些词会出现在许多瞬时错误中。
- **推荐：** 完整的封禁语句，例如 `your account has been suspended for`、
  `account permanently banned`、`violation of our terms`。

优先使用提供者在真实封禁时返回的、最长且没有歧义的短语。如果不确定，请先观察连接的 `lastError`，然后添加其准确措辞。

## 恢复被标记的连接

终止状态 `banned` / `deactivated` **永远不会自动恢复**（它们会被排除在主动恢复定时任务之外——只有 `unavailable` 冷却状态会自行恢复）。操作人员必须显式清除它们：

1. **重新测试连接**——使用仪表板中的**测试**操作
   （`POST /api/providers/{id}/test`）；探测成功后会将 `testStatus` 重置为
   `active`，并清除错误字段。
2. **重新进行身份验证 / 编辑凭据**——对于 OAuth 提供者，重新运行登录
   / 刷新流程；提供者创建/导入路由会设置 `isActive = true`。
3. **重新启用连接**——如果自动禁用将 `isActive = false`
   （范围为 `all`，或者对于 OAuth/Cookie/会话连接，范围为 `subscription`），
   请在修复账户后将其重新开启。

没有单独的“清除封禁标记”按钮——恢复方式是重新测试、重新身份验证或重新启用，这与
[RESILIENCE_GUIDE](../architecture/RESILIENCE_GUIDE.md)
中的通用终止状态规则一致。

## 探测隔离（模型全量测试）

**源自探测的失败**（在 `runAsProbe` 内执行的模型全量测试 / 健康检查调度）永远不会将连接从池中移除（#9817）：系统会**记录该失败以便查看**（`last_error`、`last_error_type`、`error_code`、`last_error_at`），但会跳过**所有**路由状态变更——冷却、终止状态（`banned` / `deactivated` / `credits_exhausted`）、按模型锁定、提供者熔断器、5 分钟配额缓存、OAuth 令牌刷新以及自动禁用。只有真实请求路径上的失败才会停用连接。记录的错误会使被标记的账户显示在仪表板中，同时继续为流量提供服务。

唯一的决策点是 `shouldIsolateProbeFailures()`
（`src/shared/utils/probeOrigin.ts`）；任何可能因源自探测的失败而变更路由状态的位置都会查询它：

- `markAccountUnavailable`（`auth.ts`）——仅记录（`lastError` 原始文本、
  `lastErrorType`、`errorCode`、`lastErrorAt`；刻意**不**设置
  `backoffLevel`，因为它会触发选择时的自动衰减并清除记录）
- `maybeAutoDisableBannedAccount`——不自动禁用
- `chatCore`——FORBIDDEN、ACCOUNT_DEACTIVATED、QUOTA_EXHAUSTED（仅记录，
  不设置终止状态 `credits_exhausted`）、GEO_BLOCKED（不排除 24 小时）、
  MODEL_NOT_FOUND（不调用 `lockModel`）、Codex 429 账户轮换故障转移
  （不调用 `markCodexScopeRateLimited`，不持久化 `rate_limited_until`，
  不清除会话亲和性）、`persistCodexQuotaState`（不写入配额状态，
  不使缓存失效）、`recordKeyHealthStatus`（密钥健康状态轮换器
  不受影响）
- OAuth 刷新——执行器基类中的主动刷新
  （`base.ts` `execute()`，不会消耗刷新令牌轮换）和
  `chatCore` 中的被动 401/403 路径（不会执行 `expired` 停用）
- `chat.ts`——提供者熔断器和 5 分钟配额缓存
  （`markAccountExhaustedFrom429`）永远不会降级

记录的错误会使被标记的账户显示在仪表板中，同时继续为流量提供服务。请注意：探测记录会存储**原始的**（未经截断的）错误文本，这与真实路径中的 `slice(0,100)` 截断不同。

将全量测试用作维护工具的操作人员可通过以下任一方式恢复历史行为（将探测计作一次真实生成）：

- 使用 `probeCanDisable` 设置（向 `POST /api/settings` 提交
  `{"probeCanDisable": true}`，或直接编辑 `key_value` 数据库），或
- 使用功能标志 **`PROBE_CAN_DISABLE=true`**（环境变量或数据库覆盖；其优先级高于该设置）。

故障安全机制：如果标志或设置查询抛出异常，隔离仍将保持开启。

## 源文件

| 关注点                 | 文件                                                                                                           |
| ---------------------- | -------------------------------------------------------------------------------------------------------------- |
| 信号表 + 匹配          | `open-sse/services/accountFallback.ts`                                                                         |
| 终止化 / 持久化        | `src/sse/services/auth.ts`（`markAccountUnavailable`、`resolveTerminalConnectionStatus`、`clearAccountError`） |
| 自动禁用范围           | `src/shared/utils/autoDisableBanned.ts`、`src/sse/services/autoDisableBannedAccount.ts`                        |
| 内联分类               | `open-sse/handlers/chatCore.ts`、`open-sse/services/errorClassifier.ts`                                        |
| 终止状态恢复排除       | `src/lib/quota/connectionRecovery.ts`                                                                          |
| 自定义关键字运行时加载 | `src/lib/config/runtimeSettings.ts`（`setCustomBannedSignals`）                                                |
| 设置界面               | `src/app/(dashboard)/dashboard/settings/components/SecurityTab.tsx`                                            |
