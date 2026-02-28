# OmniRoute 架构

🌐 **Languages:** 🇺🇸 [English](../../ARCHITECTURE.md) | 🇧🇷 [Português (Brasil)](../pt-BR/ARCHITECTURE.md) | 🇪🇸 [Español](../es/ARCHITECTURE.md) | 🇫🇷 [Français](../fr/ARCHITECTURE.md) | 🇮🇹 [Italiano](../it/ARCHITECTURE.md) | 🇷🇺 [Русский](../ru/ARCHITECTURE.md) | 🇨🇳 [中文 (简体)](../zh-CN/ARCHITECTURE.md) | 🇩🇪 [Deutsch](../de/ARCHITECTURE.md) | 🇮🇳 [हिन्दी](../in/ARCHITECTURE.md) | 🇹🇭 [ไทย](../th/ARCHITECTURE.md) | 🇺🇦 [Українська](../uk-UA/ARCHITECTURE.md) | 🇸🇦 [العربية](../ar/ARCHITECTURE.md) | 🇯🇵 [日本語](../ja/ARCHITECTURE.md) | 🇻🇳 [Tiếng Việt](../vi/ARCHITECTURE.md) | 🇧🇬 [Български](../bg/ARCHITECTURE.md) | 🇩🇰 [Dansk](../da/ARCHITECTURE.md) | 🇫🇮 [Suomi](../fi/ARCHITECTURE.md) | 🇮🇱 [עברית](../he/ARCHITECTURE.md) | 🇭🇺 [Magyar](../hu/ARCHITECTURE.md) | 🇮🇩 [Bahasa Indonesia](../id/ARCHITECTURE.md) | 🇰🇷 [한국어](../ko/ARCHITECTURE.md) | 🇲🇾 [Bahasa Melayu](../ms/ARCHITECTURE.md) | 🇳🇱 [Nederlands](../nl/ARCHITECTURE.md) | 🇳🇴 [Norsk](../no/ARCHITECTURE.md) | 🇵🇹 [Português (Portugal)](../pt/ARCHITECTURE.md) | 🇷🇴 [Română](../ro/ARCHITECTURE.md) | 🇵🇱 [Polski](../pl/ARCHITECTURE.md) | 🇸🇰 [Slovenčina](../sk/ARCHITECTURE.md) | 🇸🇪 [Svenska](../sv/ARCHITECTURE.md) | 🇵🇭 [Filipino](../phi/ARCHITECTURE.md)

_最后更新：2026-02-18_

## 执行摘要

OmniRoute 是基于 Next.js 构建的本地 AI 路由网关和仪表板。
它提供单个 OpenAI 兼容端点 (`/v1/*`)，并通过转换、回退、令牌刷新和使用跟踪在多个上游提供商之间路由流量。

核心能力：

- 用于 CLI/工具的 OpenAI 兼容 API 界面（28 个提供商）
- 跨提供商格式的请求/响应翻译
- 模型组合后备（多模型序列）
- 账户级回退（每个提供商多个账户）
- OAuth + API 密钥提供商连接管理
- 通过 `/v1/embeddings` 嵌入生成（6 个提供商，9 个模型）
- 通过 `/v1/images/generations` 生成图像（4 个提供商，9 个模型）
- 为推理模型考虑标签解析（`<think>...</think>`）
- 响应清理以实现严格的 OpenAI SDK 兼容性
- 角色标准化（开发人员→系统、系统→用户）以实现跨提供商兼容性
- 结构化输出转换（json_schema→Gemini responseSchema）
- 提供商、密钥、别名、组合、设置、定价的本地持久性
- 使用/成本跟踪和请求记录
- 可选的云同步用于多设备/状态同步
- API 访问控制的 IP 允许列表/阻止列表
- 思考预算管理（直通/自动/自定义/自适应）
- 全局系统提示注入
- 会话跟踪和指纹识别
- 使用特定于提供商的配置文件增强每个帐户的速率限制
- 提供者弹性的断路器模式
- 具有互斥锁的防雷群保护
- 基于签名的请求重复数据删除缓存
- 领域层：模型可用性、成本规则、后备策略、锁定策略
- 域状态持久性（用于回退、预算、锁定、断路器的 SQLite 直写式缓存）
- 用于集中请求评估的策略引擎（锁定→预算→后备）
- 使用 p50/p95/p99 延迟聚合请求遥测
- 用于端到端跟踪的关联 ID (X-Request-Id)
- 合规性审核日志记录，可根据 API 密钥选择退出
- LLM质量保证评估框架
- 具有实时断路器状态的 Resilience UI 仪表板
- 模块化 OAuth 提供程序（`src/lib/oauth/providers/` 下有 12 个单独的模块）

主要运行时模型：

- `src/app/api/*` 下的 Next.js 应用程序路由同时实现仪表板 API 和兼容性 API
- `src/sse/*` + `open-sse/*` 中的共享 SSE/路由核心处理提供程序执行、转换、流式传输、回退和使用

## 范围和边界

### 在范围内

- 本地网关运行时
- 仪表板管理 API
- 提供商身份验证和令牌刷新
- 请求翻译和 SSE 流媒体
- 本地状态+使用持久性
- 可选的云同步编排

### 超出范围

- `NEXT_PUBLIC_CLOUD_URL` 背后的云服务实现
- 本地流程之外的提供商 SLA/控制平面
- 外部 CLI 二进制文件本身（Claude CLI、Codex CLI 等）

## 高级系统上下文

```mermaid
flowchart LR
    subgraph Clients[Developer Clients]
        C1[Claude Code]
        C2[Codex CLI]
        C3[OpenClaw / Droid / Cline / Continue / Roo]
        C4[Custom OpenAI-compatible clients]
        BROWSER[Browser Dashboard]
    end

    subgraph Router[OmniRoute Local Process]
        API[V1 Compatibility API\n/v1/*]
        DASH[Dashboard + Management API\n/api/*]
        CORE[SSE + Translation Core\nopen-sse + src/sse]
        DB[(db.json)]
        UDB[(usage.json + log.txt)]
    end

    subgraph Upstreams[Upstream Providers]
        P1[OAuth Providers\nClaude/Codex/Gemini/Qwen/iFlow/GitHub/Kiro/Cursor/Antigravity]
        P2[API Key Providers\nOpenAI/Anthropic/OpenRouter/GLM/Kimi/MiniMax\nDeepSeek/Groq/xAI/Mistral/Perplexity\nTogether/Fireworks/Cerebras/Cohere/NVIDIA]
        P3[Compatible Nodes\nOpenAI-compatible / Anthropic-compatible]
    end

    subgraph Cloud[Optional Cloud Sync]
        CLOUD[Cloud Sync Endpoint\nNEXT_PUBLIC_CLOUD_URL]
    end

    C1 --> API
    C2 --> API
    C3 --> API
    C4 --> API
    BROWSER --> DASH

    API --> CORE
    DASH --> DB
    CORE --> DB
    CORE --> UDB

    CORE --> P1
    CORE --> P2
    CORE --> P3

    DASH --> CLOUD
```

## 核心运行时组件

## 1) API 和路由层（Next.js 应用程序路由）

主要目录：

- `src/app/api/v1/*` 和 `src/app/api/v1beta/*` 用于兼容性 API
- `src/app/api/*` 用于管理/配置 API
- 接下来重写 `next.config.mjs` 将 `/v1/*` 映射到 `/api/v1/*`

重要的兼容性路线：

- `src/app/api/v1/chat/completions/route.ts`
- `src/app/api/v1/messages/route.ts`
- `src/app/api/v1/responses/route.ts`
- `src/app/api/v1/models/route.ts` — 包括带有 `custom: true` 的自定义模型
- `src/app/api/v1/embeddings/route.ts` — 嵌入生成（6 个提供商）
- `src/app/api/v1/images/generations/route.ts` — 图像生成（4 个以上提供商，包括 Antigravity/Nebius）
- `src/app/api/v1/messages/count_tokens/route.ts`
- `src/app/api/v1/providers/[provider]/chat/completions/route.ts` — 每个提供商专用的聊天
- `src/app/api/v1/providers/[provider]/embeddings/route.ts` — 每个提供商专用的嵌入
- `src/app/api/v1/providers/[provider]/images/generations/route.ts` — 每个提供商专用的图像
- `src/app/api/v1beta/models/route.ts`
- `src/app/api/v1beta/models/[...path]/route.ts`

管理域：

- 身份验证/设置：`src/app/api/auth/*`、`src/app/api/settings/*`
- 提供商/连接：`src/app/api/providers*`
- 提供商节点：`src/app/api/provider-nodes*`
- 自定义模型：`src/app/api/provider-models`（获取/发布/删除）
- 模型目录：`src/app/api/models/catalog` (GET)
- 代理配置：`src/app/api/settings/proxy` (GET/PUT/DELETE) + `src/app/api/settings/proxy/test` (POST)
- OAuth：`src/app/api/oauth/*`
- 密钥/别名/组合/定价：`src/app/api/keys*`、`src/app/api/models/alias`、`src/app/api/combos*`、`src/app/api/pricing`
- 用法：`src/app/api/usage/*`
- 同步/云：`src/app/api/sync/*`、`src/app/api/cloud/*`
- CLI 工具助手：`src/app/api/cli-tools/*`
- IP 过滤器：`src/app/api/settings/ip-filter` (GET/PUT)
- 思考预算：`src/app/api/settings/thinking-budget` (GET/PUT)
- 系统提示：`src/app/api/settings/system-prompt` (GET/PUT)
- 会话：`src/app/api/sessions` (GET)
- 速率限制：`src/app/api/rate-limits` (GET)
- 弹性：`src/app/api/resilience` (GET/PATCH) — 提供商配置文件、断路器、速率限制状态
- 弹性重置：`src/app/api/resilience/reset` (POST) — 重置断路器 + 冷却时间
- 缓存统计信息：`src/app/api/cache/stats`（获取/删除）
- 模型可用性：`src/app/api/models/availability` (GET/POST)
- 遥测：`src/app/api/telemetry/summary` (GET)
- 预算：`src/app/api/usage/budget`（获取/发布）
- 后备链：`src/app/api/fallback/chains` (GET/POST/DELETE)
- 合规审核：`src/app/api/compliance/audit-log` (GET)
- 评估：`src/app/api/evals` (GET/POST)、`src/app/api/evals/[suiteId]` (GET)
- 政策：`src/app/api/policies` (GET/POST)

## 2) SSE + 翻译核心

主要流程模块：

- 条目：`src/sse/handlers/chat.ts`
- 核心编排：`open-sse/handlers/chatCore.ts`
- 提供者执行适配器：`open-sse/executors/*`
- 格式检测/提供商配置：`open-sse/services/provider.ts`
- 模型解析/解析：`src/sse/services/model.ts`、`open-sse/services/model.ts`
- 账户后备逻辑：`open-sse/services/accountFallback.ts`
- 翻译注册表：`open-sse/translator/index.ts`
- 流转换：`open-sse/utils/stream.ts`、`open-sse/utils/streamHandler.ts`
- 使用提取/标准化：`open-sse/utils/usageTracking.ts`
- 思考标签解析器：`open-sse/utils/thinkTagParser.ts`
- 嵌入处理程序：`open-sse/handlers/embeddings.ts`
- 嵌入提供程序注册表：`open-sse/config/embeddingRegistry.ts`
- 图像生成处理程序：`open-sse/handlers/imageGeneration.ts`
- 图像提供者注册表：`open-sse/config/imageRegistry.ts`
- 响应清理：`open-sse/handlers/responseSanitizer.ts`
- 角色规范化：`open-sse/services/roleNormalizer.ts`

服务（业务逻辑）：

- 账户选择/评分：`open-sse/services/accountSelector.ts`
- 上下文生命周期管理：`open-sse/services/contextManager.ts`
- IP 过滤器强制执行：`open-sse/services/ipFilter.ts`
- 会话跟踪：`open-sse/services/sessionManager.ts`
- 请求重复数据删除：`open-sse/services/signatureCache.ts`
- 系统提示注入：`open-sse/services/systemPrompt.ts`
- 思考预算管理：`open-sse/services/thinkingBudget.ts`
- 通配符模型路由：`open-sse/services/wildcardRouter.ts`
- 速率限制管理：`open-sse/services/rateLimitManager.ts`
- 断路器：`open-sse/services/circuitBreaker.ts`

领域层模块：

- 型号可用性：`src/lib/domain/modelAvailability.ts`
- 成本规则/预算：`src/lib/domain/costRules.ts`
- 后备政策：`src/lib/domain/fallbackPolicy.ts`
- 组合解析器：`src/lib/domain/comboResolver.ts`
- 锁定政策：`src/lib/domain/lockoutPolicy.ts`
- 策略引擎：`src/domain/policyEngine.ts` — 集中锁定→预算→后备评估
- 错误代码目录：`src/lib/domain/errorCodes.ts`
- 请求 ID：`src/lib/domain/requestId.ts`
- 获取超时：`src/lib/domain/fetchTimeout.ts`
- 请求遥测：`src/lib/domain/requestTelemetry.ts`
- 合规/审计：`src/lib/domain/compliance/index.ts`
- 评估跑步者：`src/lib/domain/evalRunner.ts`
- 域状态持久性：`src/lib/db/domainState.ts` — 用于后备链、预算、成本历史记录、锁定状态、断路器的 SQLite CRUD

OAuth 提供程序模块（`src/lib/oauth/providers/` 下有 12 个单独的文件）：

- 注册表索引：`src/lib/oauth/providers/index.ts`
- 个人提供商：`claude.ts`、`codex.ts`、`gemini.ts`、`antigravity.ts`、`iflow.ts`、`qwen.ts`、`kimi-coding.ts`、`github.ts`、 `kiro.ts`、`cursor.ts`、`kilocode.ts`、`cline.ts`
- 薄包装器：`src/lib/oauth/providers.ts` — 从各个模块重新导出

## 3) 持久层

主状态数据库：

- `src/lib/localDb.ts`
- 文件：`${DATA_DIR}/db.json`（或设置时为 `$XDG_CONFIG_HOME/omniroute/db.json`，否则为 `~/.omniroute/db.json`）
- 实体：providerConnections、providerNodes、modelAliases、组合、apiKeys、设置、定价、**customModels**、**proxyConfig**、**ipFilter**、**thinkingBudget**、**systemPrompt**

使用数据库：

- `src/lib/usageDb.ts`
- 文件：`${DATA_DIR}/usage.json`、`${DATA_DIR}/log.txt`、`${DATA_DIR}/call_logs/`
- 遵循与 `localDb` 相同的基本目录策略（`DATA_DIR`，然后设置时为 `XDG_CONFIG_HOME/omniroute`）
- 分解为重点子模块：`migrations.ts`、`usageHistory.ts`、`costCalculator.ts`、`usageStats.ts`、`callLogs.ts`

域状态数据库（SQLite）：

- `src/lib/db/domainState.ts` — 域状态的 CRUD 操作
- 表（在 `src/lib/db/core.ts` 中创建）：`domain_fallback_chains`、`domain_budgets`、`domain_cost_history`、`domain_lockout_state`、`domain_circuit_breakers`
- 直写式缓存模式：内存中的Map在运行时具有权威性；突变同步写入SQLite；冷启动时从数据库恢复状态

## 4) 身份验证 + 安全表面

- 仪表板 cookie 身份验证：`src/proxy.ts`、`src/app/api/auth/login/route.ts`
- API 密钥生成/验证：`src/shared/utils/apiKey.ts`
- 提供商机密保留在 `providerConnections` 条目中
- 通过 `open-sse/utils/proxyFetch.ts` （环境变量）和 `open-sse/utils/networkProxy.ts` （可按提供商配置或全局配置）提供出站代理支持

## 5) 云同步

- 调度程序初始化：`src/lib/initCloudSync.ts`、`src/shared/services/initializeCloudSync.ts`
- 定期任务：`src/shared/services/cloudSyncScheduler.ts`
- 控制路线：`src/app/api/sync/cloud/route.ts`

## 请求生命周期 (`/v1/chat/completions`)

```mermaid
sequenceDiagram
    autonumber
    participant Client as CLI/SDK Client
    participant Route as /api/v1/chat/completions
    participant Chat as src/sse/handlers/chat
    participant Core as open-sse/handlers/chatCore
    participant Model as Model Resolver
    participant Auth as Credential Selector
    participant Exec as Provider Executor
    participant Prov as Upstream Provider
    participant Stream as Stream Translator
    participant Usage as usageDb

    Client->>Route: POST /v1/chat/completions
    Route->>Chat: handleChat(request)
    Chat->>Model: parse/resolve model or combo

    alt Combo model
        Chat->>Chat: iterate combo models (handleComboChat)
    end

    Chat->>Auth: getProviderCredentials(provider)
    Auth-->>Chat: active account + tokens/api key

    Chat->>Core: handleChatCore(body, modelInfo, credentials)
    Core->>Core: detect source format
    Core->>Core: translate request to target format
    Core->>Exec: execute(provider, transformedBody)
    Exec->>Prov: upstream API call
    Prov-->>Exec: SSE/JSON response
    Exec-->>Core: response + metadata

    alt 401/403
        Core->>Exec: refreshCredentials()
        Exec-->>Core: updated tokens
        Core->>Exec: retry request
    end

    Core->>Stream: translate/normalize stream to client format
    Stream-->>Client: SSE chunks / JSON response

    Stream->>Usage: extract usage + persist history/log
```

## 组合 + 账户回退流程

```mermaid
flowchart TD
    A[Incoming model string] --> B{Is combo name?}
    B -- Yes --> C[Load combo models sequence]
    B -- No --> D[Single model path]

    C --> E[Try model N]
    E --> F[Resolve provider/model]
    D --> F

    F --> G[Select account credentials]
    G --> H{Credentials available?}
    H -- No --> I[Return provider unavailable]
    H -- Yes --> J[Execute request]

    J --> K{Success?}
    K -- Yes --> L[Return response]
    K -- No --> M{Fallback-eligible error?}

    M -- No --> N[Return error]
    M -- Yes --> O[Mark account unavailable cooldown]
    O --> P{Another account for provider?}
    P -- Yes --> G
    P -- No --> Q{In combo with next model?}
    Q -- Yes --> E
    Q -- No --> R[Return all unavailable]
```

回退决策由 `open-sse/services/accountFallback.ts` 使用状态代码和错误消息启发法驱动。

## OAuth 加入和令牌刷新生命周期

```mermaid
sequenceDiagram
    autonumber
    participant UI as Dashboard UI
    participant OAuth as /api/oauth/[provider]/[action]
    participant ProvAuth as Provider Auth Server
    participant DB as localDb
    participant Test as /api/providers/[id]/test
    participant Exec as Provider Executor

    UI->>OAuth: GET authorize or device-code
    OAuth->>ProvAuth: create auth/device flow
    ProvAuth-->>OAuth: auth URL or device code payload
    OAuth-->>UI: flow data

    UI->>OAuth: POST exchange or poll
    OAuth->>ProvAuth: token exchange/poll
    ProvAuth-->>OAuth: access/refresh tokens
    OAuth->>DB: createProviderConnection(oauth data)
    OAuth-->>UI: success + connection id

    UI->>Test: POST /api/providers/[id]/test
    Test->>Exec: validate credentials / optional refresh
    Exec-->>Test: valid or refreshed token info
    Test->>DB: update status/tokens/errors
    Test-->>UI: validation result
```

实时流量期间的刷新通过执行器 `refreshCredentials()` 在 `open-sse/handlers/chatCore.ts` 内执行。

## 云同步生命周期（启用/同步/禁用）

```mermaid
sequenceDiagram
    autonumber
    participant UI as Endpoint Page UI
    participant Sync as /api/sync/cloud
    participant DB as localDb
    participant Cloud as External Cloud Sync
    participant Claude as ~/.claude/settings.json

    UI->>Sync: POST action=enable
    Sync->>DB: set cloudEnabled=true
    Sync->>DB: ensure API key exists
    Sync->>Cloud: POST /sync/{machineId} (providers/aliases/combos/keys)
    Cloud-->>Sync: sync result
    Sync->>Cloud: GET /{machineId}/v1/verify
    Sync-->>UI: enabled + verification status

    UI->>Sync: POST action=sync
    Sync->>Cloud: POST /sync/{machineId}
    Cloud-->>Sync: remote data
    Sync->>DB: update newer local tokens/status
    Sync-->>UI: synced

    UI->>Sync: POST action=disable
    Sync->>DB: set cloudEnabled=false
    Sync->>Cloud: DELETE /sync/{machineId}
    Sync->>Claude: switch ANTHROPIC_BASE_URL back to local (if needed)
    Sync-->>UI: disabled
```

启用云时，定期同步由 `CloudSyncScheduler` 触发。

## 数据模型和存储映射

```mermaid
erDiagram
    SETTINGS ||--o{ PROVIDER_CONNECTION : controls
    PROVIDER_NODE ||--o{ PROVIDER_CONNECTION : backs_compatible_provider
    PROVIDER_CONNECTION ||--o{ USAGE_ENTRY : emits_usage

    SETTINGS {
      boolean cloudEnabled
      number stickyRoundRobinLimit
      boolean requireLogin
      string password_hash
      string fallbackStrategy
      json rateLimitDefaults
      json providerProfiles
    }

    PROVIDER_CONNECTION {
      string id
      string provider
      string authType
      string name
      number priority
      boolean isActive
      string apiKey
      string accessToken
      string refreshToken
      string expiresAt
      string testStatus
      string lastError
      string rateLimitedUntil
      json providerSpecificData
    }

    PROVIDER_NODE {
      string id
      string type
      string name
      string prefix
      string apiType
      string baseUrl
    }

    MODEL_ALIAS {
      string alias
      string targetModel
    }

    COMBO {
      string id
      string name
      string[] models
    }

    API_KEY {
      string id
      string name
      string key
      string machineId
    }

    USAGE_ENTRY {
      string provider
      string model
      number prompt_tokens
      number completion_tokens
      string connectionId
      string timestamp
    }

    CUSTOM_MODEL {
      string id
      string name
      string providerId
    }

    PROXY_CONFIG {
      string global
      json providers
    }

    IP_FILTER {
      string mode
      string[] allowlist
      string[] blocklist
    }

    THINKING_BUDGET {
      string mode
      number customBudget
      string effortLevel
    }

    SYSTEM_PROMPT {
      boolean enabled
      string prompt
      string position
    }
```

物理存储文件：

- 主状态：`${DATA_DIR}/db.json`（或设置时为 `$XDG_CONFIG_HOME/omniroute/db.json`，否则为 `~/.omniroute/db.json`）
- 使用统计数据：`${DATA_DIR}/usage.json`
- 请求日志行：`${DATA_DIR}/log.txt`
- 可选转换器/请求调试会话：`<repo>/logs/...`

## 部署拓扑

```mermaid
flowchart LR
    subgraph LocalHost[Developer Host]
        CLI[CLI Tools]
        Browser[Dashboard Browser]
    end

    subgraph ContainerOrProcess[OmniRoute Runtime]
        Next[Next.js Server\nPORT=20128]
        Core[SSE Core + Executors]
        MainDB[(db.json)]
        UsageDB[(usage.json/log.txt)]
    end

    subgraph External[External Services]
        Providers[AI Providers]
        SyncCloud[Cloud Sync Service]
    end

    CLI --> Next
    Browser --> Next
    Next --> Core
    Next --> MainDB
    Core --> MainDB
    Core --> UsageDB
    Core --> Providers
    Next --> SyncCloud
```

## 模块映射（决策关键）

### 路由和 API 模块

- `src/app/api/v1/*`、`src/app/api/v1beta/*`：兼容性 API
- `src/app/api/v1/providers/[provider]/*`：每个提供商的专用路由（聊天、嵌入、图像）
- `src/app/api/providers*`：提供商 CRUD、验证、测试
- `src/app/api/provider-nodes*`：自定义兼容节点管理
- `src/app/api/provider-models`：自定义模型管理（CRUD）
- `src/app/api/models/catalog`：完整模型目录 API（所有类型按提供商分组）
- `src/app/api/oauth/*`：OAuth/设备代码流
- `src/app/api/keys*`：本地 API 密钥生命周期
- `src/app/api/models/alias`：别名管理
- `src/app/api/combos*`：后备组合管理
- `src/app/api/pricing`：成本计算的定价覆盖
- `src/app/api/settings/proxy`：代理配置（GET/PUT/DELETE）
- `src/app/api/settings/proxy/test`：出站代理连接测试 (POST)
- `src/app/api/usage/*`：使用和日志 API
- `src/app/api/sync/*` + `src/app/api/cloud/*`：云同步和面向云的助手
- `src/app/api/cli-tools/*`：本地 CLI 配置编写器/检查器
- `src/app/api/settings/ip-filter`：IP 允许列表/阻止列表 (GET/PUT)
- `src/app/api/settings/thinking-budget`：思考代币预算配置（GET/PUT）
- `src/app/api/settings/system-prompt`：全局系统提示符（GET/PUT）
- `src/app/api/sessions`：活动会话列表 (GET)
- `src/app/api/rate-limits`：每个账户的速率限制状态 (GET)

### 路由和执行核心

- `src/sse/handlers/chat.ts`：请求解析、组合处理、帐户选择循环
- `open-sse/handlers/chatCore.ts`：翻译、执行程序调度、重试/刷新处理、流设置
- `open-sse/executors/*`：提供商特定的网络和格式行为

### 翻译注册表和格式转换器

- `open-sse/translator/index.ts`：翻译器注册和编排
- 请求翻译：`open-sse/translator/request/*`
- 回复翻译器：`open-sse/translator/response/*`
- 格式常量：`open-sse/translator/formats.ts`

### 坚持

- `src/lib/localDb.ts`：持久配置/状态
- `src/lib/usageDb.ts`：使用历史记录和滚动请求日志

## 提供者执行者覆盖范围（策略模式）

每个提供程序都有一个扩展 `BaseExecutor`（在 `open-sse/executors/base.ts` 中）的专用执行器，它提供 URL 构建、标头构建、指数退避重试、凭证刷新挂钩和 `execute()` 编排方法。

| 执行人                | 提供商                                                                                                                                                       | 特殊处理                                               |
| --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------ | ------------------------------------------------------------ |
| `DefaultExecutor`     | OpenAI、Claude、Gemini、Qwen、iFlow、OpenRouter、GLM、Kimi、MiniMax、DeepSeek、Groq、xAI、Mistral、Perplexity、Together、Fireworks、Cerebras、Cohere、NVIDIA | 每个提供商的动态 URL/标头配置                          |
| `AntigravityExecutor` | 谷歌反重力                                                                                                                                                   | 自定义项目/会话 ID，解析后重试                         |
| `CodexExecutor`       | OpenAI 法典                                                                                                                                                  | 注入系统指令，强制推理工作                             |
| `CursorExecutor`      | 光标IDE                                                                                                                                                      | ConnectRPC 协议、Protobuf 编码、通过校验和进行请求签名 |
| `GithubExecutor`      | GitHub 副驾驶                                                                                                                                                | Copilot 令牌刷新，模仿 VSCode 标头                     |
| `KiroExecutor`        | AWS CodeWhisperer/Kiro                                                                                                                                       | AWS CodeWhisperer/Kiro                                 | AWS CodeWhisperer/Kiro AWS EventStream 二进制格式 → SSE 转换 |
| `GeminiCLIExecutor`   | 双子座 CLI                                                                                                                                                   | Google OAuth 令牌刷新周期                              |

所有其他提供商（包括自定义兼容节点）都使用 `DefaultExecutor`。

## 提供商兼容性矩阵

| 供应商           | 格式        | 授权               | 流           | 非流                      | 令牌刷新 | 使用API​​      |
| ---------------- | ----------- | ------------------ | ------------ | ------------------------- | -------- | -------------- | ----------- |
| 克劳德           | 克劳德      | API 密钥/OAuth     | ✅           | ✅                        | ✅       | ⚠️ 仅限管理员  |
| 双子座           | 双子座      | API 密钥/OAuth     | ✅           | ✅                        | ✅       | ⚠️ 云控制台    |
| 双子座 CLI       | Gemini-cli  | OAuth              | ✅           | ✅                        | ✅       | ⚠️ 云控制台    |
| 反重力           | 反重力      | OAuth              | ✅           | ✅                        | ✅       | ✅ 完整配额API |
| 开放人工智能     | 开放        | API 密钥           | ✅           | ✅                        | ❌       | ❌             |
| 法典             | openai-回应 | OAuth              | ✅ 强迫      | ❌                        | ✅       | ✅ 速率限制    |
| GitHub 副驾驶    | 开放        | OAuth + 副驾驶令牌 | ✅           | ✅                        | ✅       | ✅ 配额快照    |
| 光标             | 光标        | 自定义校验和       | ✅           | ✅                        | ❌       | ❌             |
| 基罗             | 基罗        | AWS SSO OIDC       | AWS SSO OIDC | AWS SSO OIDC ✅（事件流） | ❌       | ✅             | ✅ 使用限制 |
| 奎文             | 开放        | OAuth              | ✅           | ✅                        | ✅       | ⚠️ 根据要求    |
| iFlow            | 开放        | OAuth（基本）      | ✅           | ✅                        | ✅       | ⚠️ 根据要求    |
| 开放路由器       | 开放        | API 密钥           | ✅           | ✅                        | ❌       | ❌             |
| GLM/Kimi/MiniMax | 克劳德      | API 密钥           | ✅           | ✅                        | ❌       | ❌             |
| 深度搜索         | 开放        | API 密钥           | ✅           | ✅                        | ❌       | ❌             |
| 格罗克           | 开放        | API 密钥           | ✅           | ✅                        | ❌       | ❌             |
| xAI (Grok)       | 开放        | API 密钥           | ✅           | ✅                        | ❌       | ❌             |
| 米斯特拉尔       | 开放        | API 密钥           | ✅           | ✅                        | ❌       | ❌             |
| 困惑             | 开放        | API 密钥           | ✅           | ✅                        | ❌       | ❌             |
| 一起人工智能     | 开放        | API 密钥           | ✅           | ✅                        | ❌       | ❌             |
| 烟花人工智能     | 开放        | API 密钥           | ✅           | ✅                        | ❌       | ❌             |
| 大脑             | 开放        | API 密钥           | ✅           | ✅                        | ❌       | ❌             |
| 连贯             | 开放        | API 密钥           | ✅           | ✅                        | ❌       | ❌             |
| NVIDIA NIM       | 开放        | API 密钥           | ✅           | ✅                        | ❌       | ❌             |

## 格式翻译覆盖范围

检测到的源格式包括：

- `openai`
- `openai-responses`
- `claude`
- `gemini`

目标格式包括：

- OpenAI 聊天/回复
  ——克劳德
- Gemini/Gemini-CLI/反重力信封
- 基罗
- 光标

翻译使用 **OpenAI 作为中心格式** - 所有转换都通过 OpenAI 作为中间：

```
Source Format → OpenAI (hub) → Target Format
```

根据源有效负载形状和提供程序目标格式动态选择翻译。

翻译管道中的附加处理层：

- **响应清理** — 从 OpenAI 格式响应（流式和非流式）中去除非标准字段，以确保严格的 SDK 合规性
- **角色标准化** — 对于非 OpenAI 目标，将 `developer` → `system` 转换；对于拒绝系统角色的模型（GLM、ERNIE），合并 `system` → `user`
- **思考标签提取** — 将内容中的 `<think>...</think>` 块解析为 `reasoning_content` 字段
- **结构化输出** — 将 OpenAI `response_format.json_schema` 转换为 Gemini 的 `responseMimeType` + `responseSchema`

## 支持的 API 端点

| 端点                                               | 格式            | 处理程序                                |
| -------------------------------------------------- | --------------- | --------------------------------------- |
| `POST /v1/chat/completions`                        | OpenAI 聊天     | `src/sse/handlers/chat.ts`              |
| `POST /v1/messages`                                | 克劳德消息      | 相同的处理程序（自动检测）              |
| `POST /v1/responses`                               | OpenAI 回应     | `open-sse/handlers/responsesHandler.ts` |
| `POST /v1/embeddings`                              | OpenAI 嵌入     | `open-sse/handlers/embeddings.ts`       |
| `GET /v1/embeddings`                               | 型号列表        | API路线                                 |
| `POST /v1/images/generations`                      | OpenAI 图像     | `open-sse/handlers/imageGeneration.ts`  |
| `GET /v1/images/generations`                       | 型号列表        | API路线                                 |
| `POST /v1/providers/{provider}/chat/completions`   | OpenAI 聊天     | 专用于每个提供商的模型验证              |
| `POST /v1/providers/{provider}/embeddings`         | OpenAI 嵌入     | 专用于每个提供商的模型验证              |
| `POST /v1/providers/{provider}/images/generations` | OpenAI 图像     | 专用于每个提供商的模型验证              |
| `POST /v1/messages/count_tokens`                   | 克劳德代币计数  | API路线                                 |
| `GET /v1/models`                                   | OpenAI 模型列表 | API路线（聊天+嵌入+图像+自定义模型）    |
| `GET /api/models/catalog`                          | 目录            | 所有模型按提供商+类型分组               |
| `POST /v1beta/models/*:streamGenerateContent`      | 双子座人        | API路线                                 |
| `GET/PUT/DELETE /api/settings/proxy`               | 代理配置        | 网络代理配置                            |
| `POST /api/settings/proxy/test`                    | 代理连接        | 代理运行状况/连接测试端点               |
| `GET/POST/DELETE /api/provider-models`             | 定制型号        | 每个提供商的自定义模型管理              |

## 绕过处理程序

旁路处理程序 (`open-sse/utils/bypassHandler.ts`) 拦截来自 Claude CLI 的已知“一次性”请求（预热 ping、标题提取和令牌计数），并返回 **虚假响应**，而不消耗上游提供商令牌。仅当 `User-Agent` 包含 `claude-cli` 时才会触发。

## 请求记录器管道

请求记录器 (`open-sse/utils/requestLogger.ts`) 提供 7 阶段调试日志记录管道，默认情况下禁用，通过 `ENABLE_REQUEST_LOGS=true` 启用：

```
1_req_client.json → 2_req_source.json → 3_req_openai.json → 4_req_target.json
→ 5_res_provider.txt → 6_res_openai.txt → 7_res_client.txt
```

每个请求会话的文件都会写入 `<repo>/logs/<session>/`。

## 故障模式和恢复能力

## 1) 帐户/提供商可用性

- 提供商帐户因瞬态/速率/身份验证错误而冷却
- 请求失败之前的帐户回退
- 当前模型/提供商路径耗尽时组合模型回退

## 2) 令牌到期

- 对可刷新提供程序进行预检查和刷新并重试
- 401/403 在核心路径中尝试刷新后重试

## 3) 流安全

- 断开连接感知流控制器
- 具有流尾刷新和 `[DONE]` 处理的翻译流
- 当提供者使用元数据丢失时使用估计回退

## 4) 云同步降级

- 出现同步错误，但本地运行时仍在继续
- 调度程序具有可重试的逻辑，但定期执行当前默认调用单次尝试同步

## 5) 数据完整性

- 数据库形状迁移/修复丢失的键
- localDb 和 useDb 的损坏的 JSON 重置保护措施

## 可观察性和操作信号

运行时可见性来源：

- 来自 `src/sse/utils/logger.ts` 的控制台日志
- 每个请求的使用情况汇总在 `usage.json` 中
- `log.txt` 中的文本请求状态日志
- 当 `ENABLE_REQUEST_LOGS=true` 时，`logs/` 下的可选深度请求/翻译日志
- UI 使用的仪表板使用端点 (`/api/usage/*`)

## 安全敏感边界

- JWT 秘密 (`JWT_SECRET`) 确保仪表板会话 cookie 验证/签名
- 在实际部署中必须覆盖初始密码回退（`INITIAL_PASSWORD`，默认 `123456`）
- API 密钥 HMAC 秘密 (`API_KEY_SECRET`) 确保生成的本地 API 密钥格式的安全
- 提供者机密（API 密钥/令牌）保留在本地数据库中，并应在文件系统级别受到保护
- 云同步端点依赖于 API 密钥身份验证 + 机器 ID 语义

## 环境和运行时矩阵

代码主动使用的环境变量：

- 应用程序/身份验证：`JWT_SECRET`、`INITIAL_PASSWORD`
- 存储：`DATA_DIR`
- 兼容节点行为：`ALLOW_MULTI_CONNECTIONS_PER_COMPAT_NODE`
- 可选存储基础覆盖（Linux/macOS 当 `DATA_DIR` 未设置时）：`XDG_CONFIG_HOME`
- 安全哈希：`API_KEY_SECRET`、`MACHINE_ID_SALT`
- 日志记录：`ENABLE_REQUEST_LOGS`
- 同步/云 URL：`NEXT_PUBLIC_BASE_URL`、`NEXT_PUBLIC_CLOUD_URL`
- 出站代理：`HTTP_PROXY`、`HTTPS_PROXY`、`ALL_PROXY`、`NO_PROXY` 和小写变体
- SOCKS5 功能标志：`ENABLE_SOCKS5_PROXY`、`NEXT_PUBLIC_ENABLE_SOCKS5_PROXY`
- 平台/运行时帮助程序（不是特定于应用程序的配置）：`APPDATA`、`NODE_ENV`、`PORT`、`HOSTNAME`

## 已知的架构注释

1. `usageDb` 和 `localDb` 现在与旧文件迁移共享相同的基本目录策略 (`DATA_DIR` -> `XDG_CONFIG_HOME/omniroute` -> `~/.omniroute`)。
2. `/api/v1/route.ts` 返回静态模型列表，不是 `/v1/models` 使用的主要模型源。
3. 请求记录器在启用时写入完整的标头/正文；将日志目录视为敏感目录。
4. 云行为取决于正确的 `NEXT_PUBLIC_BASE_URL` 和云端点可访问性。
5. `open-sse/` 目录发布为 `@omniroute/open-sse` **npm 工作区包**。源代码通过 `@omniroute/open-sse/...` 导入它（由 Next.js `transpilePackages` 解析）。为了保持一致性，本文档中的文件路径仍使用目录名称 `open-sse/`。
6. 仪表板中的图表使用 **Recharts**（基于 SVG）来实现可访问的交互式分析可视化（模型使用情况条形图、包含成功率的提供商细分表）。
7. E2E 测试使用 **Playwright** (`tests/e2e/`)，通过 `npm run test:e2e` 运行。单元测试使用 **Node.js 测试运行程序** (`tests/unit/`)，通过 `npm run test:plan3` 运行。 `src/` 下的源代码是 **TypeScript** (`.ts`/`.tsx`)； `open-sse/` 工作区仍然是 JavaScript (`.js`)。
8. 设置页面分为 5 个选项卡：安全、路由（6 种全局策略：先填充、循环、p2c、随机、最少使用、成本优化）、弹性（可编辑速率限制、断路器、策略）、AI（思考预算、系统提示、提示缓存）、高级（代理）。

## 操作验证清单

- 从源代码构建：`npm run build`
- 构建 Docker 镜像：`docker build -t omniroute .`
- 启动服务并验证：
- `GET /api/settings`
- `GET /api/v1/models`
- 当 `PORT=20128` 时，CLI 目标基本 URL 应为 `http://<host>:20128/v1`
