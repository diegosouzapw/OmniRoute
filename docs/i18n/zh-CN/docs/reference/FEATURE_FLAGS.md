# Feature Flags (中文 (简体))

🌐 **Languages:** 🇺🇸 [English](../../../../reference/FEATURE_FLAGS.md) · 🇪🇹 [am](../../../am/docs/reference/FEATURE_FLAGS.md) · 🇸🇦 [ar](../../../ar/docs/reference/FEATURE_FLAGS.md) · 🇦🇿 [az](../../../az/docs/reference/FEATURE_FLAGS.md) · 🇧🇬 [bg](../../../bg/docs/reference/FEATURE_FLAGS.md) · 🇧🇩 [bn](../../../bn/docs/reference/FEATURE_FLAGS.md) · 🇧🇦 [bs](../../../bs/docs/reference/FEATURE_FLAGS.md) · 🇨🇿 [cs](../../../cs/docs/reference/FEATURE_FLAGS.md) · 🇩🇰 [da](../../../da/docs/reference/FEATURE_FLAGS.md) · 🇩🇪 [de](../../../de/docs/reference/FEATURE_FLAGS.md) · 🇬🇷 [el](../../../el/docs/reference/FEATURE_FLAGS.md) · 🇪🇸 [es](../../../es/docs/reference/FEATURE_FLAGS.md) · 🇪🇪 [et](../../../et/docs/reference/FEATURE_FLAGS.md) · 🇮🇷 [fa](../../../fa/docs/reference/FEATURE_FLAGS.md) · 🇫🇮 [fi](../../../fi/docs/reference/FEATURE_FLAGS.md) · 🇫🇷 [fr](../../../fr/docs/reference/FEATURE_FLAGS.md) · 🇮🇪 [ga](../../../ga/docs/reference/FEATURE_FLAGS.md) · 🇮🇳 [gu](../../../gu/docs/reference/FEATURE_FLAGS.md) · 🇳🇬 [ha](../../../ha/docs/reference/FEATURE_FLAGS.md) · 🇮🇱 [he](../../../he/docs/reference/FEATURE_FLAGS.md) · 🇮🇳 [hi](../../../hi/docs/reference/FEATURE_FLAGS.md) · 🇭🇷 [hr](../../../hr/docs/reference/FEATURE_FLAGS.md) · 🇭🇺 [hu](../../../hu/docs/reference/FEATURE_FLAGS.md) · 🇦🇲 [hy](../../../hy/docs/reference/FEATURE_FLAGS.md) · 🇮🇩 [id](../../../id/docs/reference/FEATURE_FLAGS.md) · 🇳🇬 [ig](../../../ig/docs/reference/FEATURE_FLAGS.md) · 🇮🇹 [it](../../../it/docs/reference/FEATURE_FLAGS.md) · 🇯🇵 [ja](../../../ja/docs/reference/FEATURE_FLAGS.md) · 🇬🇪 [ka](../../../ka/docs/reference/FEATURE_FLAGS.md) · 🇰🇭 [km](../../../km/docs/reference/FEATURE_FLAGS.md) · 🇮🇳 [kn](../../../kn/docs/reference/FEATURE_FLAGS.md) · 🇰🇷 [ko](../../../ko/docs/reference/FEATURE_FLAGS.md) · 🇱🇹 [lt](../../../lt/docs/reference/FEATURE_FLAGS.md) · 🇱🇻 [lv](../../../lv/docs/reference/FEATURE_FLAGS.md) · 🇮🇳 [ml](../../../ml/docs/reference/FEATURE_FLAGS.md) · 🇮🇳 [mr](../../../mr/docs/reference/FEATURE_FLAGS.md) · 🇲🇾 [ms](../../../ms/docs/reference/FEATURE_FLAGS.md) · 🇲🇹 [mt](../../../mt/docs/reference/FEATURE_FLAGS.md) · 🇲🇲 [my](../../../my/docs/reference/FEATURE_FLAGS.md) · 🇳🇵 [ne](../../../ne/docs/reference/FEATURE_FLAGS.md) · 🇳🇱 [nl](../../../nl/docs/reference/FEATURE_FLAGS.md) · 🇳🇴 [no](../../../no/docs/reference/FEATURE_FLAGS.md) · 🇮🇳 [or](../../../or/docs/reference/FEATURE_FLAGS.md) · 🇮🇳 [pa](../../../pa/docs/reference/FEATURE_FLAGS.md) · 🇵🇭 [phi](../../../phi/docs/reference/FEATURE_FLAGS.md) · 🇵🇱 [pl](../../../pl/docs/reference/FEATURE_FLAGS.md) · 🇵🇹 [pt](../../../pt/docs/reference/FEATURE_FLAGS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/reference/FEATURE_FLAGS.md) · 🇷🇴 [ro](../../../ro/docs/reference/FEATURE_FLAGS.md) · 🇷🇺 [ru](../../../ru/docs/reference/FEATURE_FLAGS.md) · 🇱🇰 [si](../../../si/docs/reference/FEATURE_FLAGS.md) · 🇸🇰 [sk](../../../sk/docs/reference/FEATURE_FLAGS.md) · 🇸🇮 [sl](../../../sl/docs/reference/FEATURE_FLAGS.md) · 🇷🇸 [sr](../../../sr/docs/reference/FEATURE_FLAGS.md) · 🇸🇪 [sv](../../../sv/docs/reference/FEATURE_FLAGS.md) · 🇰🇪 [sw](../../../sw/docs/reference/FEATURE_FLAGS.md) · 🇮🇳 [ta](../../../ta/docs/reference/FEATURE_FLAGS.md) · 🇮🇳 [te](../../../te/docs/reference/FEATURE_FLAGS.md) · 🇹🇭 [th](../../../th/docs/reference/FEATURE_FLAGS.md) · 🇹🇷 [tr](../../../tr/docs/reference/FEATURE_FLAGS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/reference/FEATURE_FLAGS.md) · 🇵🇰 [ur](../../../ur/docs/reference/FEATURE_FLAGS.md) · 🇺🇿 [uz](../../../uz/docs/reference/FEATURE_FLAGS.md) · 🇻🇳 [vi](../../../vi/docs/reference/FEATURE_FLAGS.md) · 🇳🇬 [yo](../../../yo/docs/reference/FEATURE_FLAGS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/reference/FEATURE_FLAGS.md)

---

> 无需重新部署即可更改 OmniRoute 行为的运行时开关。
> 此处列出的每个标志均定义于
> [`src/shared/constants/featureFlagDefinitions.ts`](../../src/shared/constants/featureFlagDefinitions.ts)
> ——这是唯一事实来源。仪表板和 REST API 都从
> 该文件读取，因此下表按 1:1 的对应关系生成。

---

## 什么是功能标志

功能标志是一种具名开关（布尔值或枚举值），其值可在运行时更改并持久化到数据库中，无需重新部署进程。每个标志均由一个 `FeatureFlagDefinition` 描述，其中包含 `key`、`label`、`description`、`category`、`defaultValue`、`type` 和 `requiresRestart` 提示。

### 解析顺序

标志的**有效值**由
[`resolveFeatureFlag()`](../../src/shared/utils/featureFlags.ts) 按以下优先级解析（优先级最高者生效）：

1. **数据库覆盖值**——存储在 `key_value` 表的
   `feature_flags` 命名空间中的值（通过仪表板或 REST API 设置）。
2. **环境变量**——`process.env[<KEY>]`，前提是已设置且非空。
3. **定义默认值**——`featureFlagDefinitions.ts` 中的 `defaultValue`。

当布尔标志的有效值为 `"true"`、`"1"` 或 `"yes"` 时，该标志被视为**已启用**
（参见 `isFeatureFlagEnabled()`）。

> [!NOTE]
> 大多数标志还有一个在 [`ENVIRONMENT.md`](./ENVIRONMENT.md) 中记录的**同名**
> 环境变量。标志的数据库覆盖值优先于该环境变量。具有
> `requiresRestart: true` 的标志会立即持久化，但仅在进程启动时重新读取
> ——切换该标志后，仪表板中会显示**“重启服务器”**横幅。

---

## 标志目录

共 82 个标志，分为 6 个类别。**默认值**是定义中的默认值，即既不存在数据库覆盖值，也不存在环境变量时所使用的值。

### 安全性（10）

| 键                                      | 类型   | 默认值   | 描述                                                                                                                                                                                           |
| --------------------------------------- | ------ | -------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `REQUIRE_API_KEY`                       | 布尔值 | `false`  | 要求所有传入请求都提供 API 密钥。                                                                                                                                                              |
| `INPUT_SANITIZER_ENABLED`               | 布尔值 | `true`   | 为所有请求启用输入清理。                                                                                                                                                                       |
| `INJECTION_GUARD_MODE`                  | 枚举   | `off`    | 提示词注入防护模式。可选值：`off`、`warn`、`block`、`redact`。                                                                                                                                 |
| `PII_REDACTION_ENABLED`                 | 布尔值 | `false`  | 从请求中隐去个人身份信息（PII）（独立于 `INPUT_SANITIZER_MODE`）。                                                                                                                             |
| `PII_RESPONSE_SANITIZATION`             | 布尔值 | `false`  | 清理提供者响应中的个人身份信息（PII）。                                                                                                                                                        |
| `PII_RESPONSE_SANITIZATION_MODE`        | 枚举   | `redact` | PII 响应清理模式。可选值：`redact`、`warn`、`block`、`off`。                                                                                                                                   |
| `OUTBOUND_SSRF_GUARD_ENABLED`           | 布尔值 | `true`   | 旧版别名：在此标志的仪表板开关上保存的值会优先于环境变量读取；若任一位置中的值为 `false`、`0`、`no` 或 `off`，则会像 `OMNIROUTE_ALLOW_PRIVATE_PROVIDER_URLS` 一样关闭出站 URL 防护的主机检查。 |
| `ALLOW_API_KEY_REVEAL`                  | 布尔值 | `false`  | 允许经过身份验证的仪表板用户显示已存储的 API 密钥，而不只是看到掩码值。                                                                                                                        |
| `AUTH_LOG_INCLUDE_ACCOUNT_ID`           | 布尔值 | `false`  | 在 AUTH 日志行中包含账户前缀（例如“正在使用 <provider> 账户：abc12345...”）。默认禁用，因此共享/多租户进程日志中的账户标识符会被隐去。此设置独立于调试模式；切换调试模式不会显示该信息。       |
| `OMNIROUTE_OIDC_DISABLE_PASSWORD_LOGIN` | 布尔值 | `false`  | 启用 OIDC 时，禁用密码登录，使用户只能通过 OIDC 单点登录进行身份验证。禁用时（默认），密码登录和 OIDC 均可用。                                                                                 |

### 网络（23）

| 键                                              | 类型    | 默认值  | 重启 | 描述                                                                                                                                                                                                                                                                                                                                                                   |
| ----------------------------------------------- | ------- | ------- | ---- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `ENABLE_TLS_FINGERPRINT`                        | boolean | `false` | ✓    | 启用 TLS 指纹隐匿模式。                                                                                                                                                                                                                                                                                                                                                |
| `AUDIO_REMOTE_PROVIDER_NODES`                   | boolean | `false` |      | 允许 /v1/audio/* 路由使用托管在 localhost 之外、兼容 OpenAI 的提供者节点。默认关闭——将音频路由到远程主机会改变出口身份，因此必须由运维人员明确决定。始终允许使用环回节点，且其不受此设置影响。                                                                                                                                                                         |
| `RERANK_REMOTE_PROVIDER_NODES`                  | boolean | `false` |      | 允许 POST /v1/rerank（以及记忆引擎的环回重排序步骤）使用托管在 localhost 之外、兼容 OpenAI 的提供者节点。默认关闭——将请求路由到远程主机会改变出口身份，因此必须由运维人员明确决定。始终允许使用环回节点；远程节点还必须通过提供者出站 URL 策略检查。                                                                                                                   |
| `PROXY_AUTO_SELECT_ENABLED`                     | boolean | `false` |      | 当连接未分配代理时，自动从注册表中选择第一个可用的代理。默认关闭（否则注册表中的任何代理都会成为全局后备代理——#3332）。                                                                                                                                                                                                                                                |
| `OMNIROUTE_CONTROL_PLANE_PROXY_DIRECT_FALLBACK` | boolean | `false` |      | 当代理可达性预检查失败时，允许 OAuth 和提供者验证流程绕过固定代理并直接连接。默认关闭，因为这可能会改变出口 IP。                                                                                                                                                                                                                                                       |
| `NETWORK_ROTATION_SHARED_EGRESS_GUARD`          | boolean | `true`  |      | 当多账户轮换执行器遇到网络异常（超时、连接被拒绝/重置）且失败账户没有专用代理时，应用短暂冷却，并在该请求的剩余过程中跳过其他无代理账户，而不是逐一重试。默认开启（安全：不会改变出口 IP，只会降低共享出口账户的延迟/冷却风险）。禁用后，将恢复在第一个无代理账户抛出异常时立即传播该异常。                                                                            |
| `ROTATION_ATTRIBUTION`                          | boolean | `false` |      | Opencode 轮换会记录由哪个账户提供服务或哪个账户被跳过（仅记录掩码后的 ID，绝不记录完整账户 ID），并将代理日志条目关联到对应请求，以便运维人员区分被跳过的账户和未使用的账户。默认关闭。                                                                                                                                                                                |
| `PROXY_SKIP_RECENTLY_FAILED`                    | boolean | `true`  |      | 代理池和 Opencode 的每账户轮换机制会在当前进程的一段时间内停止再次提供刚刚失败的代理（TCP 探测被拒绝，或通过该代理收到 429）；每次重复失败时，该时长都会翻倍，直至达到上限。不会写入代理状态；当所有候选代理都被暂时搁置时，选择结果保持不变。默认开启；设置为 `false` 可恢复普通选择方式。                                                                            |
| `PROXY_POOL_SHARED_EGRESS_ORDER`                | boolean | `false` |      | 对于配额按出口地址分桶的提供者，将与最近被拒绝成员共享观测出口地址的池成员排在健康成员之后。仅调整顺序，绝不排除。需要启用 PROXY_SKIP_RECENTLY_FAILED，由其生成此功能所读取的拒绝信号。默认关闭。                                                                                                                                                                      |
| `PROXY_POOL_EGRESS_OBSERVATION`                 | boolean | `false` |      | 在仪表板的代理池下，显示过去 24 h 内为其成员提供服务的观测出口 IP 数量，以及使用这些 IP 的连接数。只读，根据代理日志计算，绝不用于路由。默认关闭。                                                                                                                                                                                                                     |
| `PROXY_OPERATOR_EGRESS_ENABLED`                 | boolean | `false` |      | 接受运维人员为每个池成员推送的带日期观测地址，并将其与从日志中读取的数据合并，用于显示和池排序。默认关闭：推送路由返回 404，池读取行为与之前完全相同。                                                                                                                                                                                                                 |
| `OPENCODE_RESPONSES_STALL_ROTATION`             | boolean | `false` |      | 对于 OpenCode 执行器，监视流式 Responses 回复的首个正文结果字节（窗口：`RESPONSES_FIRST_BYTE_TIMEOUT_MS`，默认值为 `15000`）。如果 2xx Responses 流在超过该窗口后仍保持静默，则视为停滞：该账户将进入冷却状态，并将请求轮转至下一个账户一次；第二次停滞将快速失败。默认关闭：停滞的流会继续按当前行为等待，直至流就绪超时。                                            |
| `OPENCODE_USER_BLOCKED_ROTATION`                | boolean | `false` |      | OpenCode 执行器：收到携带 `user_blocked` 拒绝信息的 403/451 时（非地理位置限制，也非 Cloudflare 指纹拒绝），将被拒绝的账户置于冷却状态，并在每个请求中最多轮转至下一个账户一次；第二次拒绝将原样返回，且不会标记为成功。默认关闭：绕过上游用户封禁进行路由可能看起来像规避措施，并可能将此标记扩散到整个账户群。                                                       |
| `OPENCODE_TRANSIENT_FAILOVER_BACKOFF`           | boolean | `false` |      | OpenCode 轮转：连续发生两次上游瞬时故障（5xx 或空的 400）后，在尝试下一个账户前暂停——从 1.5s 开始，每多发生一次故障便翻倍，每次暂停最长 6s，每个请求累计最长 10s；客户端断开连接时跳过暂停。等待前会释放失败响应的正文。默认关闭：故障转移仍会立即进行。                                                                                                               |
| `OPENCODE_PARK_AND_RESUME`                      | boolean | `false` |      | OpenCode 轮转：在重复出现瞬时 429（或存在新的池压力标记）后，通过心跳使请求进入驻留状态，然后重放一个有上限的阶段，最多依次尝试 3 个账户，而不是扇出至整个账户群。默认关闭：每次 429 都会与之前完全一样轮转至下一个账户。                                                                                                                                              |
| `STREAM_READINESS_STALL_RETRY`                  | boolean | `false` |      | 流式聊天：当首个上游正文在生成可用事件前停滞时，通过相同的路由路径发起一次有界的第二次尝试，使用相同的就绪时间预算，且不对账户施加惩罚。默认关闭：首个正文停滞时请求会失败，不进行重试。                                                                                                                                                                               |
| `FLUSH_EMPTY_RETRY_ENABLED`                     | boolean | `false` |      | 对于经过转换的流式交互轮次，当上游轮次不包含可用内容（仅推理的完成结果或零个有价值的数据块）时，在向客户端公开任何内容之前，通过常规凭证路径发起有界重试（最多 `STREAM_RECOVERY.EMPTY_TURN_RETRY_MAX` 次）。默认关闭：空轮次保持当前行为（空的 200 或空内容 502）。                                                                                                    |
| `OPENCODE_POOL_RESELECT`                        | boolean | `false` |      | OpenCode 轮转：当处于环境池上下文且未配置代理的账户收到按出口地址分桶的提供者返回的 429 后，请求连接池为下一次尝试选择另一个成员，而不是重试相同的出口地址。仅调整顺序，绝不排除：池耗尽时保持当前行为。默认关闭：每次 429 都会与之前完全一样轮转至下一个账户。                                                                                                        |
| `OPENCODE_RATE_LIMITED_429_EARLY_STOP`          | boolean | `false` |      | OpenCode 轮换：遇到第一个被归类为真实速率限制的 429（可解析的 `Retry-After`，或响应正文中指明速率/用量限制）时停止账户轮次，并原样返回该上游 429。未分类的 429 将继续轮换。默认关闭：免费套餐按出口 IP 限制（#9611），因此每个 429 都会触发轮换，而耗尽的轮次会返回最后一个上游 429。                                                                                  |
| `MITM_DISABLE_TLS_VERIFY`                       | boolean | `false` | ✓    | 禁用 MITM 代理的 TLS 证书验证。**危险。**                                                                                                                                                                                                                                                                                                                              |
| `OMNIROUTE_ALLOW_PRIVATE_PROVIDER_URLS`         | boolean | `false` |      | 在提供者 URL 验证、模型发现、提供者节点基础 URL 和代理回退测试中，关闭出站 URL 防护机制的主机检查（包括云元数据拦截），并允许私有 webhook 目标。默认情况下，本地和 LAN URL 已可通过验证、发现和提供者节点路径（`OMNIROUTE_ALLOW_LOCAL_PROVIDER_URLS`）；代理回退测试和私有 webhook 目标仅检查 `OMNIROUTE_ALLOW_PRIVATE_PROVIDER_URLS`，当其关闭时会拦截本地/LAN 主机。 |
| `OMNIROUTE_ALLOW_LOCAL_PROVIDER_URLS`           | boolean | `true`  |      | 允许提供者 URL 使用本地/私有地址（127.0.0.1、localhost、LAN）。默认开启（本地优先）：此时防护机制会拦截云元数据端点（整个 169.254.0.0/16 以及已知的元数据主机名）。禁用后将执行严格的仅公共地址拦截策略：私有主机和环回主机也会被拦截。                                                                                                                                |
| `ENABLE_CC_COMPATIBLE_PROVIDER`                 | boolean | `false` | ✓    | 启用 Claude Code 兼容提供者模式。                                                                                                                                                                                                                                                                                                                                      |

### 策略（5）

| 键                              | 类型    | 默认值     | 描述                                                                                                                             |
| ------------------------------- | ------- | ---------- | -------------------------------------------------------------------------------------------------------------------------------- |
| `TOOL_POLICY_MODE`              | enum    | `disabled` | 工具使用策略执行模式。可选值：`disabled`、`warn`、`block`。                                                                      |
| `RATE_LIMIT_AUTO_ENABLE`        | boolean | `false`    | 根据使用模式自动启用速率限制。                                                                                                   |
| `DISABLE_CONTEXT_WINDOW_CHECKS` | boolean | `false`    | 对直接单模型请求跳过 OmniRoute 的本地上下文窗口/最大输入令牌检查。上游限制仍然适用。                                             |
| `CAPABILITY_FILTER_ENABLED`     | boolean | `false`    | 当目标模型缺少所需能力（视觉、工具、结构化输出、上下文窗口）时，在分派前拒绝请求。保护绕过组合层兼容性筛选器的直接单提供者请求。 |
| `RADAR_ENABLED`                 | boolean | `false`    | 启用 OmniRoute Radar 模块（目录源页面和同步）。默认关闭；启用仅会解锁 UI，数据同步仍需单独选择启用。                             |

### 运行时（34）

| 键                                          | 类型    | 默认值  | 重启 | 描述                                                                                                                                                                                                                                                                                                                                                                                                         |
| ------------------------------------------- | ------- | ------- | ---- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `UNIVERSAL_CONTEXT_HANDOFF_ENABLED`         | boolean | `true`  |      | 当组合路由切换模型时，生成并注入对话摘要。禁用后，模型切换将被独立处理，并阻止针对所有现有及未来组合的后台交接请求。                                                                                                                                                                                                                                                                                         |
| `RESPONSES_PASSTHROUGH_DROP_COMMENTARY`     | boolean | `true`  |      | 在转发给客户端之前，从 Responses API 直通流中丢弃内部评论阶段的输出项。禁用后可接收原始上游评论。                                                                                                                                                                                                                                                                                                            |
| `OMNIROUTE_MCP_ENFORCE_SCOPES`              | boolean | `false` |      | 对 MCP 工具访问强制执行作用域限制。                                                                                                                                                                                                                                                                                                                                                                          |
| `OMNIROUTE_MCP_COMPRESS_DESCRIPTIONS`       | boolean | `false` |      | 压缩 MCP 工具描述以减少令牌用量。                                                                                                                                                                                                                                                                                                                                                                            |
| `OMNIROUTE_ENABLE_RUNTIME_BACKGROUND_TASKS` | boolean | `false` |      | 启用运行时后台任务处理。                                                                                                                                                                                                                                                                                                                                                                                     |
| `OMNIROUTE_DISABLE_BACKGROUND_SERVICES`     | boolean | `false` | ✓    | 禁用所有后台服务（配额刷新、同步等）。                                                                                                                                                                                                                                                                                                                                                                       |
| `OMNIROUTE_RTK_TRUST_PROJECT_FILTERS`       | boolean | `false` |      | 信任项目级 RTK 过滤器，无需验证。                                                                                                                                                                                                                                                                                                                                                                            |
| `OMNIROUTE_ENABLE_LIVE_WS`                  | boolean | `true`  | ✓    | 导入时启动实时仪表板 WebSocket 服务器（默认端口为 20132）。                                                                                                                                                                                                                                                                                                                                                  |
| `OMNIROUTE_CODEX_WS_ENABLED`                | boolean | `true`  |      | 允许 Codex 使用基于 WebSocket 的 Responses 传输。关闭时，Codex 将回退到 HTTP Responses。                                                                                                                                                                                                                                                                                                                     |
| `OMNIROUTE_CODEX_APP_SERVER_ENABLED`        | boolean | `true`  |      | 允许 Codex 使用本地 app-server WebSocket JSON-RPC 传输（codexTransport=app-server）。关闭时，选择使用 app-server 的连接将回退到 Codex 的其他传输方式。                                                                                                                                                                                                                                                       |
| `OMNIROUTE_EMERGENCY_FALLBACK`              | boolean | `true`  |      | 将预算耗尽的请求路由到紧急免费回退提供者/模型。（请参阅下文的[紧急预算回退](#emergency-budget-fallback)。）                                                                                                                                                                                                                                                                                                  |
| `STREAM_RECOVERY_ENABLED`                   | boolean | `false` |      | 在任何响应字节到达客户端之前，针对被截断的上游 SSE 流启用透明的提前重试。                                                                                                                                                                                                                                                                                                                                    |
| `STREAM_RECOVERY_MIDSTREAM_ENABLED`         | boolean | `false` |      | 允许流恢复在响应字节已经到达客户端后重新发起请求并拼接响应。                                                                                                                                                                                                                                                                                                                                                 |
| `STREAM_RECOVERY_TOOLCALL_ORDER_FIX`        | boolean | `false` |      | 确保流中途续传对工具调用安全：一旦已发出工具调用（正在进行中，或已完成且 finish_reason 为 tool_calls），就绝不恢复被截断的流；如果续传一次后仍为空，则关闭流，而不是耗尽全部预算。关闭时：保持发布版本的行为。                                                                                                                                                                                               |
| `STREAM_EARLY_EOF_SIBLING_FAILOVER_ENABLED` | boolean | `false` |      | 当 SSE 流在发出任何有用帧之前关闭，且有界的同一连接重试次数已用尽时，故障转移一次到同级连接；如果没有可用的同级连接，则返回原始的 `STREAM_EARLY_EOF` 502。默认关闭：同一连接重试后，提前 EOF 仍为终止状态。                                                                                                                                                                                                  |
| `MODEL_CATALOG_INCLUDE_NAMES`               | boolean | `true`  |      | 在 `/v1/models` 响应中包含便于显示的名称字段。对于仅接受模型 ID 的客户端，请禁用此项。                                                                                                                                                                                                                                                                                                                       |
| `MODELS_CATALOG_PREFIX_MODE`                | enum    | `dual`  |      | 控制 /v1/models 中模型 ID 的前缀方式。'dual'（默认）会同时生成别名前缀和规范的提供者 ID 前缀，以实现向后兼容。'alias' 仅生成短别名前缀（例如 ds-web/model，而不是 deepseek-web/model）。'canonical' 仅生成完整的提供者 ID 前缀。可选值：`dual`、`alias`、`canonical`。                                                                                                                                       |
| `ARENA_ELO_SYNC_ENABLED`                    | boolean | `true`  |      | 启用 Arena AI 排行榜 ELO 的定期同步，用于模型智能水平排名。                                                                                                                                                                                                                                                                                                                                                  |
| `EXPOSE_CC_DISCOVERY_ALIASES`               | boolean | `false` |      | 在 `/v1/models` 上公布 `claude/<provider>/<model>` 镜像 ID，以便 Claude Code 网关的模型发现功能列出非 Claude 模型。这是三级开关中的全局级别（环境变量优先于仪表板覆盖设置）。请参阅 [Claude Code 配置](../guides/CLAUDE-CODE-CONFIGURATION.md#discovery-aliases--surface-non-claude-models-in-the-model-picker)。                                                                                            |
| `NO_THINKING_ALIAS_ENABLED`                 | boolean | `true`  |      | no-think/<provider>/<model> 网关别名的总开关。开启（默认）：/v1/models 会为每个符合条件且支持思考的 Claude 模型公布一个无思考变体，并且请求中发送的 no-think/ ID 会解析回真实模型，同时抑制推理。关闭：不会公布任何变体，且 no-think/ ID 会像其他未知模型 ID 一样处理。开启此项时，仍会应用每个模型的 ModelSpec.noThinkingAlias 选择启用/停用设置。                                                          |
| `OMNIROUTE_DISABLE_THINKING_LEVEL_VARIANTS` | boolean | `false` |      | 禁止在 /v1/models 目录中生成思考级别变体（例如 -low、-medium、-high）。                                                                                                                                                                                                                                                                                                                                      |
| `OMNIROUTE_CHAT_VIRTUAL_LANES`              | boolean | `false` | ✓    | 为提供者分派启用按租户自适应的虚拟准入通道（#9654）：一个租户的突发流量不再导致另一个租户收到 503。`OMNIROUTE_CHAT_VIRTUAL_LANES` 环境变量优先于此仪表板覆盖设置；更改将在服务器重启后生效。                                                                                                                                                                                                                 |
| `EXPOSE_FUNCTIONAL_GATEWAY_MIRRORS`         | boolean | `false` |      | 对于规范所有者没有有效凭据、但由具有有效凭据的直通网关进行路由的模型，在 /v1/models 中公布 <gateway-alias>/<model> 镜像 ID。警告：全局启用时，会为所有客户端添加目录条目。                                                                                                                                                                                                                                   |
| `NEWAPI_AGGREGATOR_BALANCE`                 | boolean | `false` |      | 为 New-API / One-API / Sub2API 聚合器兼容节点启用余额检测。启用后，已设置聚合器标志的兼容节点将在仪表板和配额预检路由中报告其余额。                                                                                                                                                                                                                                                                          |
| `SERVER_OWNED_TOOL_LOOP_ENABLED`            | boolean | `false` |      | 继续执行非流式、服务器所有的工具调用，直到模型返回客户端可用的响应。                                                                                                                                                                                                                                                                                                                                         |
| `SEARCH_STATS_HIDE_DELETED_CONNECTIONS`     | boolean | `false` |      | 搜索统计和最近搜索仅统计仍具有有效连接的提供者（无密钥提供者，例如 duckduckgo-free，始终计入）。关闭时，会保留每一条具有提供者 ID 的搜索记录。                                                                                                                                                                                                                                                               |
| `FREE_BADGE_REQUIRES_PROVIDER_FREE_TIER`    | boolean | `false` |      | 仪表板提供者页面：仅在提供者明确支持的信号上显示“免费”徽章——不再使用显示名称启发式规则、非布尔型免费字段，以及未记录免费套餐的已注册提供者名称中的 :free 后缀。关闭时，保留原有的徽章规则。                                                                                                                                                                                                                  |
| `RETRY_AFTER_PROVENANCE_ENABLED`            | boolean | `false` |      | 对于聚合后的 429/503 不可用响应，如果无法确定具体的未来重试时间，则省略 `Retry-After`（而不是使用合成的 1 秒），添加 `error.retry_after_provenance`（`signal` \| `none`），并允许组合耗尽路径从 JSON 和纯文本上游响应正文中读取文字形式的重试提示。该字段仅出现在由 `unavailableResponse()` 构建的响应中；其他 429/503 响应正文保持不变。                                                                    |
| `PROTECTED_PRIORITY_INFRA_502_ENABLED`      | boolean | `false` |      | 当标记为“仅在配额耗尽时回退”的 `priority` 组合目标由于可证实与配额无关的原因（提供者断路器打开、预测性延迟跳过）而停止组合时，返回 502，而不是看似与配额相关的 503。因锁定、冷却、不可用、耗尽和并发上限而停止时，仍返回 503。                                                                                                                                                                               |
| `MISTRAL_AMBIGUOUS_401_SOFT_LOCKOUT`        | boolean | `false` |      | 对于已撤销的密钥和配额已耗尽的情况，单独的 Mistral 401（`{"detail":"Unauthorized"}`，无明确的身份验证信号）完全相同。启用后，它会将连接置于冷却状态，而不是将其标记为 `expired`；每个连接每小时最多执行 3 次，下一次则会将其标记，因此已撤销的密钥最终仍会被标记。默认关闭：与以前一样，每个单独的 Mistral 401 都会将连接标记。                                                                              |
| `GROK_SUBSCRIPTION_IMAGES_ENABLED`          | boolean | `false` |      | 注册 xai-oauth (xao) 和 grok-cli 图像路由，并将 OpenAI 的 high/hd 质量映射为 xAI 的 medium。默认关闭：使用 API 密钥的 xAI 图像路径会继续使用现有的 OpenAI 兼容请求，且不会注册订阅路由。                                                                                                                                                                                                                     |
| `XAI_OAUTH_LIVE_MODEL_DISCOVERY`            | boolean | `true`  |      | 使用 OAuth bearer token 从 https://api.x.ai/v1/models 获取 xai-oauth 连接的实时 xAI 模型目录，而不是使用固定的静态种子。默认开启。将此标志设置为 false 可继续提供静态种子。HTTP 请求失败时，发现路由会回退到该种子；标志 getter 本身不会发起 HTTP 请求。                                                                                                                                                     |
| `BATCH_AND_FILE_AUTO_CLEANUP_ENABLED`       | boolean | `false` |      | 允许自动清理扫描删除早于 `OMNIROUTE_BATCH_RETENTION_DAYS` 的终态（已完成/失败/已取消/已过期）Batch API 作业及其逐行检查点，并清除已超过其自身 `expires_at` 的上传文件的 BLOB 内容。默认关闭：在操作员选择启用之前，每个现有安装都会像以前一样保留这些数据。无论如何，操作员触发的 `DELETE /api/v1/batches/delete-completed` 路由均不受影响——它是一项独立且无条件的公共 API 契约。                            |
| `ANTIGRAVITY_ACCOUNT_LEASE_ENABLED`         | boolean | `false` |      | 在选中 Antigravity 账户的请求的流式生命周期内保留该账户，以防并发重试或凭据移交再次选中已分配给进行中流的账户。保留范围限定为（连接、可调用的上游模型），因此一个账户仍可同时为两个不同的模型提供服务。当该模型的所有符合条件的账户都已被租用时，请求将返回结构化的 503 `antigravity_pool_busy` 和有上限的 `Retry-After`，而不是继续堆积到繁忙账户上。默认关闭：账户选择保持原有行为，并且不会进行任何保留。 |

### CLI (5)

| 键                                    | 类型    | 默认值  | 重启 | 描述                                                                                                                                                             |
| ------------------------------------- | ------- | ------- | ---- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `CLI_COMPAT_ALL`                      | boolean | `false` | ✓    | 为所有 CLI 客户端启用兼容模式。                                                                                                                                  |
| `MODEL_ALIAS_COMPAT_ENABLED`          | boolean | `false` |      | 启用模型别名兼容层。                                                                                                                                             |
| `PRICING_SYNC_ENABLED`                | boolean | `false` |      | 启用定价数据自动同步（还需要设置 `PRICING_SYNC_ENABLED` 环境变量）。                                                                                             |
| `OMNIROUTE_AUTO_SYNC_CODEX_PROFILES`  | boolean | `false` |      | 同步提供者模型后，根据实时目录自动（重新）写入 ~/.codex/*.config.toml 配置文件。绝不会更改当前使用的/默认的 Codex 配置。默认关闭。                               |
| `OMNIROUTE_AUTO_SYNC_CLAUDE_PROFILES` | boolean | `false` |      | 同步提供者模型后，根据实时目录自动（重新）写入 ~/.claude/profiles/<name>/settings.json Claude Code 配置文件。绝不会更改当前使用的/默认的 Claude 配置。默认关闭。 |

### 健康状态 (5)

| 键                                        | 类型    | 默认值  | 描述                                                                                                                                                                                                |
| ----------------------------------------- | ------- | ------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `OMNIROUTE_DISABLE_LOCAL_HEALTHCHECK`     | boolean | `false` | 禁用本地实例健康检查端点。                                                                                                                                                                          |
| `OMNIROUTE_DISABLE_TOKEN_HEALTHCHECK`     | boolean | `false` | 禁用令牌验证健康检查。                                                                                                                                                                              |
| `SKILLS_SANDBOX_NETWORK_ENABLED`          | boolean | `false` | 在技能沙箱环境中启用网络访问。                                                                                                                                                                      |
| `PROXY_HEALTH_BLOCKED_RESETS_STREAK`      | boolean | `false` | 在代理健康检查扫描中，如果探测请求被目标拒绝（401/403/429），则重置代理的连续失败计数。默认关闭：拒绝将保持中性状态（#10654）。无论如何，5xx 均保持不确定状态；拒绝绝不会移除、禁用或重新激活代理。 |
| `DB_HEALTHCHECK_STARTUP_DEFERRED_ENABLED` | boolean | `false` | 在服务器开始接受请求后（通过 `setImmediate`）运行启动时数据库完整性/健康检查，而不是阻塞启动直至检查完成（#13717）。默认关闭：启动过程与此 PR 之前完全一样，仍会被阻塞。                            |

> [!NOTE]
> `INPUT_SANITIZER_BLOCK_THRESHOLD` 及其旧版别名
> `INJECTION_GUARD_BLOCK_THRESHOLD` 用于调整 `INJECTION_GUARD_MODE` 的
> `block` 模式，但它们只是由
> [`src/shared/utils/injectionSeverity.ts`](../../src/shared/utils/injectionSeverity.ts)
> 读取的普通环境变量，并非功能标志：它们没有数据库覆盖值，也没有仪表板开关。请参阅
> [`ENVIRONMENT.md`](./ENVIRONMENT.md#4-security--authentication)。

> [!NOTE]
> `Restart` 列标记了设置了 `requiresRestart: true` 的标志——其值会
> 立即持久化，但只有在进程重新加载后才会生效。枚举标志会拒绝其允许集合之外的任何值（在服务端的
> `setFeatureFlagOverride()` 和 REST `PUT` 处理程序中均会进行验证）。

---

## 切换标志

### 仪表板

导航到 **仪表板 → 设置 → 功能标志**
(`/dashboard/settings/feature-flags`)。该网格
(`src/app/(dashboard)/dashboard/settings/components/FeatureFlagsGrid.tsx`)
支持：

- 按键或描述**搜索**，并按类别**筛选**（外加一个合成的**需要重启**视图）。
- 布尔标志的**开关**和枚举标志的**下拉菜单**
  (`src/app/(dashboard)/dashboard/settings/components/FeatureFlagCard.tsx`)。
- 每个标志的**来源徽章**——`DB`、`ENV`或`DEF`——显示有效值来自何处。
- **重置**按钮（仅对`DB`来源的标志显示）用于取消覆盖，底部还有一个**重置所有覆盖**按钮。
- 当`requiresRestart`标志被更改时，会显示**重启服务器**横幅。

### REST API

所有操作都通过一个路由进行：
[`src/app/api/settings/feature-flags/route.ts`](../../src/app/api/settings/feature-flags/route.ts)。
每个方法都需要经过身份验证的仪表板会话（否则返回`401`）。

#### `GET /api/settings/feature-flags`

返回每个标志及其有效值、来源和摘要。

```jsonc
{
  "flags": [
    {
      "key": "REQUIRE_API_KEY",
      "label": "Require API Key",
      "description": "Require an API key for all incoming requests",
      "category": "security",
      "type": "boolean",
      "enumValues": null,
      "defaultValue": "false",
      "effectiveValue": "false",
      "source": "default", // "db" | "env" | "default"
      "requiresRestart": false,
      "warningLevel": "caution",
    },
    // ... 所有 77 个标志
  ],
  "summary": {
    "total": 56,
    "active": 0,
    "inactive": 0,
    "overriddenByDb": 0,
    "overriddenByEnv": 0,
  },
}
```

#### `PUT /api/settings/feature-flags`

设置或移除单个覆盖。请求体：`{ key: string; value?: string }`。
省略`value`会移除覆盖（恢复环境变量/默认值）。

```bash
# 设置一个 DB 覆盖
curl -X PUT http://localhost:20128/api/settings/feature-flags \
  -H "Content-Type: application/json" \
  -d '{"key":"REQUIRE_API_KEY","value":"true"}'

# 移除覆盖（无 "value"）
curl -X PUT http://localhost:20128/api/settings/feature-flags \
  -H "Content-Type: application/json" \
  -d '{"key":"REQUIRE_API_KEY"}'
```

响应会回显新的`effectiveValue`/`source`、`previousValue`/
`previousSource`和`requiresRestart`。未知键和超出范围的枚举值将被`400`拒绝。

#### `DELETE /api/settings/feature-flags`

一次性清除**所有**DB覆盖，将每个标志恢复到其环境变量/默认值。返回`{ cleared: <count>, message: "..." }`。

> [!注意]
> 带有`requiresRestart: true`的标志仅在进程重新加载后生效。
> 仪表板的重启流程会调用`POST /api/restart`，然后轮询
> `GET /api/health/ping`直到服务器恢复运行。

---

## 紧急预算回退

`OMNIROUTE_EMERGENCY_FALLBACK`（类别为 `runtime`，默认值为 `true`）控制
[`open-sse/services/emergencyFallback.ts`](../../open-sse/services/emergencyFallback.ts)
中的紧急免费回退路径。启用后，预算耗尽的请求将被路由到免费的回退
提供者/模型，而不是直接失败。可通过控制面板开关、数据库覆盖配置或
`OMNIROUTE_EMERGENCY_FALLBACK` 环境变量将其设置为 `false`（或 `0`），
以禁用此行为，并让预算耗尽的请求失败。（已在 PR #3741 / #3752 中作为
控制面板开关提供。）

由此回退机制处理的响应会携带
`X-OmniRoute-Emergency-Fallback: from=<provider/model>; to=<provider/model>`，
因此客户端无需将 `X-OmniRoute-Provider` 与其请求进行比对，即可判断请求是否
被重新路由。其他所有响应均不包含此标头。

---

## 另请参阅

- [环境变量参考](./ENVIRONMENT.md) — 大多数标志都有一个同名的环境变量，其文档记录于此（数据库覆盖值的优先级高于该环境变量）。
- [`src/shared/constants/featureFlagDefinitions.ts`](../../src/shared/constants/featureFlagDefinitions.ts)
  — 所有标志的权威定义来源。
- [`src/shared/utils/featureFlags.ts`](../../src/shared/utils/featureFlags.ts)
  — 解析逻辑（`resolveFeatureFlag`、`isFeatureFlagEnabled`、
  `resolveAllFeatureFlags`）。
- [`src/lib/db/featureFlags.ts`](../../src/lib/db/featureFlags.ts) — 数据库覆盖值
  持久化于 `key_value` 表的 `feature_flags` 命名空间中。
