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

6 个类别共 77 个标志。**默认值**是定义默认值—— 当既没有数据库覆盖也没有环境变量时使用的值。

### 安全 (10)

| Key                                     | Type    | Default  | Description                                                                                                                                                                |
| :-------------------------------------- | :------ | :------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `REQUIRE_API_KEY`                       | boolean | `false`  | 要求所有传入请求都提供 API 密钥。                                                                                                                                          |
| `INPUT_SANITIZER_ENABLED`               | boolean | `true`   | 为所有请求启用输入净化。                                                                                                                                                   |
| `INJECTION_GUARD_MODE`                  | enum    | `off`    | 提示注入防护模式。可选值：`off`、`warn`、`block`、`redact`。                                                                                                               |
| `PII_REDACTION_ENABLED`                 | boolean | `false`  | 从请求中编辑 PII（独立于 `INPUT_SANITIZER_MODE`）。                                                                                                                        |
| `PII_RESPONSE_SANITIZATION`             | boolean | `false`  | 净化提供者响应中的 PII。                                                                                                                                                   |
| `PII_RESPONSE_SANITIZATION_MODE`        | enum    | `redact` | PII 响应净化模式。可选值：`redact`、`warn`、`block`、`off`。                                                                                                               |
| `OUTBOUND_SSRF_GUARD_ENABLED`           | boolean | `true`   | 阻止对私有/内部 IP 范围的出站请求。                                                                                                                                        |
| `ALLOW_API_KEY_REVEAL`                  | boolean | `false`  | 允许经过身份验证的仪表板用户显示存储的 API 密钥，而不是只看到被遮盖的值。                                                                                                  |
| `AUTH_LOG_INCLUDE_ACCOUNT_ID`           | boolean | `false`  | 在 AUTH 日志行中包含账户前缀（例如“使用 <provider> 账户：abc12345...”）。默认禁用，以便从共享/多租户进程日志中编辑账户标识符。独立于调试模式；切换调试模式不会显示此信息。 |
| `OMNIROUTE_OIDC_DISABLE_PASSWORD_LOGIN` | boolean | `false`  | 当 OIDC 启用时，禁用密码登录，以便用户只能通过 OIDC 单点登录进行身份验证。当禁用时（默认），密码登录和 OIDC 都可用。                                                       |

### 网络 (19)

| Key                                             | Type    | Default | Restart | Description                                                                                                                                                                                                                                                                                                 |
| ----------------------------------------------- | ------- | ------- | ------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `ENABLE_TLS_FINGERPRINT`                        | boolean | `false` | ✓       | 启用 TLS 指纹隐身模式。                                                                                                                                                                                                                                                                                     |
| `AUDIO_REMOTE_PROVIDER_NODES`                   | boolean | `false` |         | 允许 /v1/audio/* 路由使用托管在 localhost 之外的 OpenAI 兼容提供者节点。默认关闭 — 将音频路由到远程主机将改变出口身份，并且必须是操作员的明确决定。回环节点始终允许且不受影响。                                                                                                                             |
| `RERANK_REMOTE_PROVIDER_NODES`                  | boolean | `false` |         | 允许 POST /v1/rerank（以及内存引擎的回环重排步骤）使用托管在 localhost 之外的 OpenAI 兼容提供者节点。默认关闭 — 路由到远程主机将改变出口身份，并且必须是操作员的明确决定。回环节点始终允许；远程节点还必须通过提供者出站 URL 策略。                                                                         |
| `PROXY_AUTO_SELECT_ENABLED`                     | boolean | `false` |         | 当未为连接分配代理时，自动从注册表中选择第一个可用的代理。默认关闭（否则任何注册表代理都将成为全局备用 — #3332）。                                                                                                                                                                                          |
| `OMNIROUTE_CONTROL_PLANE_PROXY_DIRECT_FALLBACK` | boolean | `false` |         | 当代理可达性预检查失败时，允许 OAuth 和提供者验证流程绕过固定代理并直接连接。默认关闭，因为这可能会改变出口 IP。                                                                                                                                                                                            |
| `NETWORK_ROTATION_SHARED_EGRESS_GUARD`          | boolean | `true`  |         | 对于多账户轮换执行器，当出现网络异常（超时、连接拒绝/重置）且失败账户没有专用代理时，应用短暂的冷却时间并跳过请求中其余没有代理的账户，而不是重试每一个。默认开启（安全：不改变出口 IP，仅减少共享出口账户的延迟/冷却风险）。禁用此功能可在第一次无代理抛出时恢复立即传播。                                 |
| `ROTATION_ATTRIBUTION`                          | boolean | `false` |         | Opencode 轮换记录哪个账户提供了服务或被跳过（仅限掩码 ID，从不记录完整账户 ID），并将代理日志条目链接到其请求，以便操作员可以将跳过的账户与未使用的账户区分开来。默认关闭。                                                                                                                                 |
| `PROXY_SKIP_RECENTLY_FAILED`                    | boolean | `false` |         | 代理池和 opencode 的每个账户轮换会停止重新服务刚刚失败的代理（拒绝 TCP 探测，或通过它收到 429 错误），持续一个进程周期，该周期在每次重复时加倍，直到达到上限。不写入代理状态；每次候选代理被搁置时，选择保持不变。默认关闭。                                                                                |
| `PROXY_POOL_EGRESS_OBSERVATION`                 | boolean | `false` |         | 在仪表板的代理池下显示，在过去 24 小时内有多少观察到的出口 IP 为其成员提供服务，以及有多少连接使用了它们。只读，从代理日志计算，从不用于路由。默认关闭。                                                                                                                                                    |
| `OPENCODE_RESPONSES_STALL_ROTATION`             | boolean | `false` |         | 对于 OpenCode 执行器，监视流式 Responses 响应的第一个正文字节（窗口：`RESPONSES_FIRST_BYTE_TIMEOUT_MS`，默认值 `15000`）。如果 2xx Responses 流在窗口期过后仍保持静默，则被视为停滞：该账户将被冷却，请求会轮换到下一个账户一次；第二次停滞则快速失败。默认关闭：停滞的流会保持当前的等待，直到流就绪超时。 |
| `OPENCODE_USER_BLOCKED_ROTATION`                | boolean | `false` |         | OpenCode 执行器：当 403/451 响应带有 `user_blocked` 拒绝（非地理限制，非 Cloudflare 指纹拒绝）时，冷却被拒绝的账户，并且每个请求最多轮换到下一个账户一次；第二次拒绝将按原样返回，不带成功标记。默认关闭：绕过上游用户阻止可能看起来像规避行为，并可能将该标记传播到整个集群。                              |
| `OPENCODE_TRANSIENT_FAILOVER_BACKOFF`           | boolean | `false` |         | OpenCode 轮换：在两次连续的瞬时上游故障（5xx 或空的 400）之后，在切换到下一个账户之前暂停 — 每次进一步故障暂停时间翻倍 1.5 秒，每次暂停上限为 6 秒，每个请求上限为 10 秒，客户端断开连接时跳过；失败的正文在等待前释放。默认关闭：故障转移保持即时。                                                        |
| `OPENCODE_PARK_AND_RESUME`                      | boolean | `false` |         | OpenCode 轮换：在重复的瞬时 429 响应（或新的池压力标记）之后，通过心跳暂停请求，然后重播最多 3 个连续账户的一个受限阶段，而不是向整个集群扇出。默认关闭：每个 429 响应都会像以前一样轮换到下一个账户。                                                                                                      |
| `FLUSH_EMPTY_RETRY_ENABLED`                     | boolean | `false` |         | 在翻译的流式轮次中，当上游轮次不包含可用内容（仅推理完成或零有价值的块）时，在向客户端暴露任何内容之前，通过正常的凭证路径发出有限次数的重试（最多 `STREAM_RECOVERY.EMPTY_TURN_RETRY_MAX`）。默认关闭：空轮次保持当前行为（空的 200 或空内容的 502）。                                                      |
| `OPENCODE_RATE_LIMITED_429_EARLY_STOP`          | boolean | `false` |         | OpenCode 轮换：在第一个被归类为真实速率限制（可解析的 `Retry-After`，或正文指明速率/使用限制）的 429 响应处停止账户波次，并原样返回该上游 429。未分类的 429 响应会继续轮换。默认关闭：免费层级按出口 IP 限制（#9611），因此每个 429 都会轮换，耗尽的波次会返回最后一个上游 429。                            |
| `MITM_DISABLE_TLS_VERIFY`                       | boolean | `false` | ✓       | 禁用 MITM 代理的 TLS 证书验证。**危险。**                                                                                                                                                                                                                                                                   |
| `OMNIROUTE_ALLOW_PRIVATE_PROVIDER_URLS`         | boolean | `false` |         | 允许指向私有/内部网络的提供者 URL。                                                                                                                                                                                                                                                                         |
| `OMNIROUTE_ALLOW_LOCAL_PROVIDER_URLS`           | boolean | `true`  |         | 允许在本地/私有地址（127.0.0.1, localhost, LAN）上添加/验证提供者。默认开启（本地优先）；禁用以实现严格的仅公共阻止。云元数据保持阻止状态。                                                                                                                                                                 |
| `ENABLE_CC_COMPATIBLE_PROVIDER`                 | boolean | `false` | ✓       | 启用 Claude Code 兼容提供者模式。                                                                                                                                                                                                                                                                           |

### 策略 (5)

| Key                             | Type    | Default    | Description                                                                                                                      |
| ------------------------------- | ------- | ---------- | -------------------------------------------------------------------------------------------------------------------------------- |
| `TOOL_POLICY_MODE`              | enum    | `disabled` | 工具使用策略执行模式。可选值：`disabled`、`warn`、`block`。                                                                      |
| `RATE_LIMIT_AUTO_ENABLE`        | boolean | `false`    | 根据使用模式自动启用速率限制。                                                                                                   |
| `DISABLE_CONTEXT_WINDOW_CHECKS` | boolean | `false`    | 对于直接的单模型请求，跳过 OmniRoute 的本地上下文窗口/最大输入令牌检查。上游限制仍然适用。                                       |
| `CAPABILITY_FILTER_ENABLED`     | boolean | `false`    | 当目标模型缺少所需功能（视觉、工具、结构化输出、上下文窗口）时，在分派前拒绝请求。保护绕过组合层兼容性过滤器的直接单提供者请求。 |
| `RADAR_ENABLED`                 | boolean | `false`    | 启用 OmniRoute Radar 模块（目录源屏幕和同步）。默认关闭；启用仅解锁 UI — 数据同步仍需单独选择加入。                              |

### 运行时 (33)

| 键                                          | 类型    | 默认值  | 重启 | 描述                                                                                                                                                                                                                                                                                                                                                                                                                      |
| :------------------------------------------ | :------ | :------ | :--- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `UNIVERSAL_CONTEXT_HANDOFF_ENABLED`         | boolean | `true`  |      | 当组合路由切换模型时，生成并注入对话摘要。禁用此功能将独立处理模型切换，并阻止所有现有和未来组合的后台切换请求。                                                                                                                                                                                                                                                                                                          |
| `RESPONSES_PASSTHROUGH_DROP_COMMENTARY`     | boolean | `true`  |      | 在将内部评论阶段输出项转发给客户端之前，将其从 Responses API 直通流中删除。禁用此功能将接收原始上游评论。                                                                                                                                                                                                                                                                                                                 |
| `OMNIROUTE_MCP_ENFORCE_SCOPES`              | boolean | `true`  |      | 对 MCP 工具访问强制执行范围限制。                                                                                                                                                                                                                                                                                                                                                                                         |
| `OMNIROUTE_MCP_COMPRESS_DESCRIPTIONS`       | boolean | `false` |      | 压缩 MCP 工具描述以减少令牌使用。                                                                                                                                                                                                                                                                                                                                                                                         |
| `OMNIROUTE_ENABLE_RUNTIME_BACKGROUND_TASKS` | boolean | `false` |      | 在运行时启用后台任务处理。                                                                                                                                                                                                                                                                                                                                                                                                |
| `OMNIROUTE_DISABLE_BACKGROUND_SERVICES`     | boolean | `false` | ✓    | 禁用所有后台服务（配额刷新、同步等）。                                                                                                                                                                                                                                                                                                                                                                                    |
| `OMNIROUTE_RTK_TRUST_PROJECT_FILTERS`       | boolean | `false` |      | 信任项目级别的 RTK 过滤器，无需验证。                                                                                                                                                                                                                                                                                                                                                                                     |
| `OMNIROUTE_ENABLE_LIVE_WS`                  | boolean | `true`  | ✓    | 导入时启动实时仪表板 WebSocket 服务器（默认为端口 20132）。                                                                                                                                                                                                                                                                                                                                                               |
| `OMNIROUTE_CODEX_WS_ENABLED`                | boolean | `true`  |      | 允许 Codex 使用基于 WebSocket 的响应传输。关闭时，Codex 将回退到 HTTP 响应。                                                                                                                                                                                                                                                                                                                                              |
| `OMNIROUTE_CODEX_APP_SERVER_ENABLED`        | boolean | `true`  |      | 允许 Codex 使用本地应用服务器 WebSocket JSON-RPC 传输（`codexTransport=app-server`）。关闭时，选择应用服务器的连接将回退到 Codex 的其他传输方式。                                                                                                                                                                                                                                                                         |
| `OMNIROUTE_EMERGENCY_FALLBACK`              | boolean | `true`  |      | 将预算耗尽的请求路由到紧急免费回退提供者/模型。（参见下方的[紧急预算回退](#emergency-budget-fallback)。）                                                                                                                                                                                                                                                                                                                 |
| `STREAM_RECOVERY_ENABLED`                   | boolean | `false` |      | 在任何响应字节到达客户端之前，为截断的上游 SSE 流启用透明的早期重试。                                                                                                                                                                                                                                                                                                                                                     |
| `STREAM_RECOVERY_MIDSTREAM_ENABLED`         | boolean | `false` |      | 允许流恢复在字节已到达客户端后重新请求并拼接响应。                                                                                                                                                                                                                                                                                                                                                                        |
| `STREAM_RECOVERY_TOOLCALL_ORDER_FIX`        | boolean | `false` |      | 使流中继续的工具调用安全：一旦发出工具调用（正在进行中或已通过 `finish_reason tool_calls` 完成），绝不恢复被切断的流，并在一次空继续后关闭，而不是耗尽整个预算。关闭时：释放行为。                                                                                                                                                                                                                                        |
| `STREAM_EARLY_EOF_SIBLING_FAILOVER_ENABLED` | boolean | `false` |      | 当 SSE 流在发出任何有用帧之前关闭，并且同一连接的有限重试次数已用尽时，故障转移到同级连接一次；如果没有可用的同级连接，则返回原始的 `STREAM_EARLY_EOF` 502 错误。默认关闭：在同一连接重试后，早期 EOF 仍是终止状态。                                                                                                                                                                                                      |
| `MODEL_CATALOG_INCLUDE_NAMES`               | boolean | `true`  |      | 在 `/v1/models` 响应中包含易于显示的名称字段。对于只期望模型 ID 的客户端，请禁用此功能。                                                                                                                                                                                                                                                                                                                                  |
| `MODELS_CATALOG_PREFIX_MODE`                | enum    | `dual`  |      | 控制 `/v1/models` 中模型 ID 的前缀方式。“dual”（默认）为向后兼容性同时发出别名和规范提供者 ID 前缀。“alias”仅发出短别名前缀（例如 `ds-web/model`，而不是 `deepseek-web/model`）。“canonical”仅发出完整的提供者 ID 前缀。可选值：`dual`、`alias`、`canonical`。                                                                                                                                                            |
| `ARENA_ELO_SYNC_ENABLED`                    | boolean | `true`  |      | 启用模型智能排名的定期 Arena AI 排行榜 ELO 同步。                                                                                                                                                                                                                                                                                                                                                                         |
| `EXPOSE_CC_DISCOVERY_ALIASES`               | boolean | `false` |      | 在 `/v1/models` 上宣传 `claude/<provider>/<model>` 镜像 ID，以便 Claude Code 网关模型发现列表显示非 Claude 模型。这是三级门控的全局级别（环境变量优先于仪表板覆盖）。请参阅 [Claude Code 配置](../guides/CLAUDE-CODE-CONFIGURATION.md#discovery-aliases--surface-non-claude-models-in-the-model-picker)。                                                                                                                 |
| `NO_THINKING_ALIAS_ENABLED`                 | boolean | `true`  |      | no-think/<provider>/<model> 网关别名的主开关。开启（默认）：`/v1/models` 为每个符合条件的、具备思考能力的 Claude 模型宣传一个 no-thinking 变体，并且请求中发送的 `no-think/` ID 会解析回真实模型并抑制推理。关闭：不宣传任何变体，并且 `no-think/` ID 被视为任何其他未知模型 ID。当此功能开启时，每个模型的 `ModelSpec.noThinkingAlias` 选择加入/选择退出设置仍然适用。                                                   |
| `OMNIROUTE_DISABLE_THINKING_LEVEL_VARIANTS` | boolean | `false` |      | 禁用 `/v1/models` 目录中思考级别变体（例如 -low、-medium、-high）的生成。                                                                                                                                                                                                                                                                                                                                                 |
| `OMNIROUTE_CHAT_VIRTUAL_LANES`              | boolean | `false` | ✓    | 为提供者调度启用每个租户的自适应虚拟准入通道（#9654）：一个租户的突发请求不再导致另一个租户出现 503 错误。`OMNIROUTE_CHAT_VIRTUAL_LANES` 环境变量优先于此仪表板覆盖；更改在服务器重启后生效。                                                                                                                                                                                                                             |
| `EXPOSE_FUNCTIONAL_GATEWAY_MIRRORS`         | boolean | `false` |      | 为那些规范所有者没有活动凭据但通过具有活动凭据的直通网关路由的模型，在 `/v1/models` 上公布 `<gateway-alias>/<model>` 镜像 ID。警告：全局启用时，会为所有客户端添加目录条目。                                                                                                                                                                                                                                              |
| `NEWAPI_AGGREGATOR_BALANCE`                 | boolean | `false` |      | 为 New-API / One-API / Sub2API 聚合器兼容节点启用余额检测。启用后，设置了聚合器标志的兼容节点将在仪表板和配额预检路由中报告其余额。                                                                                                                                                                                                                                                                                       |
| `SERVER_OWNED_TOOL_LOOP_ENABLED`            | boolean | `false` |      | 继续非流式服务器拥有的工具调用，直到模型返回客户端可用的响应。                                                                                                                                                                                                                                                                                                                                                            |
| `SEARCH_STATS_HIDE_DELETED_CONNECTIONS`     | boolean | `false` |      | 搜索统计和最近搜索只计算仍有活动连接的提供者（无密钥提供者，如 `duckduckgo-free` 始终计算在内）。关闭此功能会保留每个带有提供者 ID 的已保留搜索行。                                                                                                                                                                                                                                                                       |
| `FREE_BADGE_REQUIRES_PROVIDER_FREE_TIER`    | boolean | `false` |      | 仪表板提供者页面：仅在提供者认可的信号上显示“免费”徽章——这会放弃显示名称启发式、非布尔型免费字段以及在没有文档记录的免费层的注册提供者上的 `:free` 后缀。关闭此功能会保留历史徽章规则。                                                                                                                                                                                                                                   |
| `RETRY_AFTER_PROVENANCE_ENABLED`            | boolean | `false` |      | 在聚合的 429/503 不可用响应中，当没有具体的未来重试时间已知时（而不是合成的 1 秒），省略 `Retry-After`，添加 `error.retry_after_provenance` (`signal` \| `none`)，并让组合耗尽路径从 JSON 和纯文本上游正文中读取散文式重试提示。此字段仅出现在由 `unavailableResponse()` 构建的响应中；其他 429/503 正文保持不变。                                                                                                        |
| `PROTECTED_PRIORITY_INFRA_502_ENABLED`      | boolean | `false` |      | 当标记为“仅在配额耗尽时回退”的 `priority` 组合目标因可证明与配额无关的原因（提供者断路器打开、预测延迟跳过）停止组合时，返回 502 而不是看起来像配额问题的 503。锁定、冷却、不可用、耗尽和并发限制停止仍返回 503。                                                                                                                                                                                                         |
| `MISTRAL_AMBIGUOUS_401_SOFT_LOCKOUT`        | boolean | `false` |      | 裸 Mistral 401 (`{"detail":"Unauthorized"}`，无明确认证信号) 对于已撤销的密钥和已耗尽的配额是相同的。启用时，它会冷却连接而不是将其停放为 `expired`，每个连接每小时最多 3 次；下一次会将其停放，因此已撤销的密钥仍然会收敛。默认关闭：每个裸 Mistral 401 都会像以前一样停放连接。                                                                                                                                         |
| `XAI_OAUTH_LIVE_MODEL_DISCOVERY`            | 布尔值  | `false` |      | 使用 OAuth bearer token 从 `https://api.x.ai/v1/models` 获取 `xai-oauth` 连接的实时 xAI 模型目录，而不是使用冻结的静态种子。默认关闭：`xai-oauth` 保持提供未更改的静态种子。任何解析错误发生时，发现机制都会回退到种子（未验证 x.ai 是否在此端点接受 OAuth bearer）。                                                                                                                                                     |
| `BATCH_AND_FILE_AUTO_CLEANUP_ENABLED`       | 布尔值  | `false` |      | 允许自动清理程序删除早于 `OMNIROUTE_BATCH_RETENTION_DAYS` 的终端（已完成/失败/已取消/已过期）批处理 API 作业及其逐行检查点，并清除已上传文件在 `expires_at` 之后的数据块 (BLOB) 内容。默认关闭：每个现有安装都会保持此数据不变，直到操作员选择启用。操作员触发的 `DELETE /api/v1/batches/delete-completed` 路由不受影响——它是一个独立的、无条件的公共 API 契约。                                                          |
| `ANTIGRAVITY_ACCOUNT_LEASE_ENABLED`         | 布尔值  | `false` |      | 为选择的 Antigravity 账户保留其请求的流式生命周期，这样并发重试或凭证移交就不能重新选择已提交给正在进行的流的账户。预留范围限定为（连接，可调用上游模型），因此一个账户仍然可以同时服务两个不同的模型。当所有符合条件的账户都已为该模型租用时，请求将返回一个结构化的 503 `antigravity_pool_busy` 错误，并带有有限的 `Retry-After` 头部，而不是堆积到繁忙的账户上。默认关闭：账户选择保持与以前完全相同，不进行任何预留。 |

### CLI (5)

| Key                                   | Type   | Default | Restart | Description                                                                                                                                              |
| ------------------------------------- | ------ | ------- | ------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `CLI_COMPAT_ALL`                      | 布尔值 | `false` | ✓       | 启用所有 CLI 客户端的兼容模式。                                                                                                                          |
| `MODEL_ALIAS_COMPAT_ENABLED`          | 布尔值 | `false` |         | 启用模型别名兼容层。                                                                                                                                     |
| `PRICING_SYNC_ENABLED`                | 布尔值 | `false` |         | 启用自动定价数据同步（也需要 `PRICING_SYNC_ENABLED` 环境变量）。                                                                                         |
| `OMNIROUTE_AUTO_SYNC_CODEX_PROFILES`  | 布尔值 | `false` |         | 在提供者模型同步后，自动（重新）从实时目录写入 ~/.codex/*.config.toml 配置文件。从不更改活动/默认的 Codex 配置。默认关闭。                               |
| `OMNIROUTE_AUTO_SYNC_CLAUDE_PROFILES` | 布尔值 | `false` |         | 在提供者模型同步后，自动（重新）从实时目录写入 ~/.claude/profiles/<name>/settings.json Claude Code 配置文件。从不更改活动/默认的 Claude 配置。默认关闭。 |

### 健康 (5)

| 键                                        | 类型    | 默认值  | 描述                                                                                                                                                                                    |
| ----------------------------------------- | ------- | ------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `OMNIROUTE_DISABLE_LOCAL_HEALTHCHECK`     | boolean | `false` | 禁用本地实例健康检查端点。                                                                                                                                                              |
| `OMNIROUTE_DISABLE_TOKEN_HEALTHCHECK`     | boolean | `false` | 禁用令牌验证健康检查。                                                                                                                                                                  |
| `SKILLS_SANDBOX_NETWORK_ENABLED`          | boolean | `false` | 在技能沙箱环境中启用网络访问。                                                                                                                                                          |
| `PROXY_HEALTH_BLOCKED_RESETS_STREAK`      | boolean | `false` | 在代理健康扫描中，目标拒绝的探测（401/403/429）会重置代理的连续失败计数。默认关闭：拒绝保持中立（#10654）。5xx 错误在任何情况下都保持不确定状态；拒绝永远不会移除、禁用或重新激活代理。 |
| `DB_HEALTHCHECK_STARTUP_DEFERRED_ENABLED` | boolean | `false` | 在服务器开始接受请求后（通过 `setImmediate`）运行启动数据库完整性/健康检查，而不是阻塞启动直到检查完成（#13717）。默认关闭：启动过程与此 PR 之前完全一致，保持阻塞。                    |

> [!NOTE]
> `INPUT_SANITIZER_BLOCK_THRESHOLD` 及其旧别名
> `INJECTION_GUARD_BLOCK_THRESHOLD` 用于调整 `INJECTION_GUARD_MODE` 的 `block` 模式，但它们是普通的环境变量，由
> [`src/shared/utils/injectionSeverity.ts`](../../src/shared/utils/injectionSeverity.ts) 读取，
> 而不是功能标志：它们没有数据库覆盖，也没有仪表板开关。请参阅
> [`ENVIRONMENT.md`](./ENVIRONMENT.md#4-security--authentication)。

> [!NOTE]
> `Restart` 列标记了带有 `requiresRestart: true` 的标志 —— 该值会立即持久化，但仅在进程重新加载后生效。枚举
> 标志会拒绝其允许集合之外的任何值（在
> `setFeatureFlagOverride()` 和 REST `PUT` 处理程序中均进行服务端验证）。

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
提供者/模型，而不是直接失败。通过仪表板开关、DB 覆盖值或
`OMNIROUTE_EMERGENCY_FALLBACK` 环境变量将其设置为 `false`（或 `0`），
即可禁用此行为，并让预算耗尽的请求失败。（在 PR #3741 / #3752 中作为
仪表板开关提供。）

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
