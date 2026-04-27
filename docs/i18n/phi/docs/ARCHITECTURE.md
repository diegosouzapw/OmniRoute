# OmniRoute Architecture (Filipino)

🌐 **Languages:** 🇺🇸 [English](../../../../docs/ARCHITECTURE.md) · 🇸🇦 [ar](../../ar/docs/ARCHITECTURE.md) · 🇧🇬 [bg](../../bg/docs/ARCHITECTURE.md) · 🇧🇩 [bn](../../bn/docs/ARCHITECTURE.md) · 🇨🇿 [cs](../../cs/docs/ARCHITECTURE.md) · 🇩🇰 [da](../../da/docs/ARCHITECTURE.md) · 🇩🇪 [de](../../de/docs/ARCHITECTURE.md) · 🇪🇸 [es](../../es/docs/ARCHITECTURE.md) · 🇮🇷 [fa](../../fa/docs/ARCHITECTURE.md) · 🇫🇮 [fi](../../fi/docs/ARCHITECTURE.md) · 🇫🇷 [fr](../../fr/docs/ARCHITECTURE.md) · 🇮🇳 [gu](../../gu/docs/ARCHITECTURE.md) · 🇮🇱 [he](../../he/docs/ARCHITECTURE.md) · 🇮🇳 [hi](../../hi/docs/ARCHITECTURE.md) · 🇭🇺 [hu](../../hu/docs/ARCHITECTURE.md) · 🇮🇩 [id](../../id/docs/ARCHITECTURE.md) · 🇮🇹 [it](../../it/docs/ARCHITECTURE.md) · 🇯🇵 [ja](../../ja/docs/ARCHITECTURE.md) · 🇰🇷 [ko](../../ko/docs/ARCHITECTURE.md) · 🇮🇳 [mr](../../mr/docs/ARCHITECTURE.md) · 🇲🇾 [ms](../../ms/docs/ARCHITECTURE.md) · 🇳🇱 [nl](../../nl/docs/ARCHITECTURE.md) · 🇳🇴 [no](../../no/docs/ARCHITECTURE.md) · 🇵🇭 [phi](../../phi/docs/ARCHITECTURE.md) · 🇵🇱 [pl](../../pl/docs/ARCHITECTURE.md) · 🇵🇹 [pt](../../pt/docs/ARCHITECTURE.md) · 🇧🇷 [pt-BR](../../pt-BR/docs/ARCHITECTURE.md) · 🇷🇴 [ro](../../ro/docs/ARCHITECTURE.md) · 🇷🇺 [ru](../../ru/docs/ARCHITECTURE.md) · 🇸🇰 [sk](../../sk/docs/ARCHITECTURE.md) · 🇸🇪 [sv](../../sv/docs/ARCHITECTURE.md) · 🇰🇪 [sw](../../sw/docs/ARCHITECTURE.md) · 🇮🇳 [ta](../../ta/docs/ARCHITECTURE.md) · 🇮🇳 [te](../../te/docs/ARCHITECTURE.md) · 🇹🇭 [th](../../th/docs/ARCHITECTURE.md) · 🇹🇷 [tr](../../tr/docs/ARCHITECTURE.md) · 🇺🇦 [uk-UA](../../uk-UA/docs/ARCHITECTURE.md) · 🇵🇰 [ur](../../ur/docs/ARCHITECTURE.md) · 🇻🇳 [vi](../../vi/docs/ARCHITECTURE.md) · 🇨🇳 [zh-CN](../../zh-CN/docs/ARCHITECTURE.md)

---

_Last updated: 2026-04-15_

## Executive Summary

OmniRoute is a local AI routing gateway and dashboard built on Next.js.
It provides a single OpenAI-compatible endpoint (`/v1/*`) and routes traffic across multiple upstream providers with translation, fallback, token refresh, and usage tracking.

Core capabilities:

- OpenAI-compatible API surface for CLI/tools (100+ providers, 16 executors)
- Request/response translation across provider formats
- Model combo fallback (multi-model sequence)
- Structured combo steps (`provider + model + connection`) with runtime ordering by `compositeTiers`
- Account-level fallback (multi-account per provider)
- Quota preflight and quota-aware P2C account selection in the main chat path
- OAuth + API-key provider connection management (13 OAuth modules)
- Embedding generation via `/v1/embeddings` (6 providers, 9 models)
- Image generation via `/v1/images/generations` (10+ providers, 20+ models)
- Audio transcription via `/v1/audio/transcriptions` (7 providers)
- Text-to-speech via `/v1/audio/speech` (10 providers)
- Video generation via `/v1/videos/generations` (ComfyUI + SD WebUI)
- Music generation via `/v1/music/generations` (ComfyUI)
- Web search via `/v1/search` (5 providers)
- Moderations via `/v1/moderations`
- Reranking via `/v1/rerank`
- Think tag parsing (`<think>...</think>`) for reasoning models
- Response sanitization for strict OpenAI SDK compatibility
- Role normalization (developer→system, system→user) for cross-provider compatibility
- Structured output conversion (json_schema → Gemini responseSchema)
- Local persistence for providers, keys, aliases, combos, settings, pricing (26 DB modules)
- Usage/cost tracking and request logging
- Optional cloud sync for multi-device/state sync
- IP allowlist/blocklist for API access control
- Thinking budget management (passthrough/auto/custom/adaptive)
- Global system prompt injection
- Session tracking and fingerprinting
- Per-account enhanced rate limiting with provider-specific profiles
- Circuit breaker pattern for provider resilience
- Anti-thundering herd protection with mutex locking
- Signature-based request deduplication cache
- Domain layer: cost rules, fallback policy, lockout policy
- Context Relay: session handoff summaries for account rotation continuity
- Domain state persistence (SQLite write-through cache for fallbacks, budgets, lockouts, circuit breakers)
- Policy engine for centralized request evaluation (lockout → budget → fallback)
- Request telemetry with p50/p95/p99 latency aggregation
- Combo target telemetry and historical combo target health via `combo_execution_key` / `combo_step_id`
- Correlation ID (X-Request-Id) for end-to-end tracing
- Compliance audit logging with opt-out per API key
- Eval framework for LLM quality assurance
- Health dashboard with real-time provider circuit breaker status
- MCP Server (25 tools) with 3 transports (stdio/SSE/Streamable HTTP)
- A2A Server (JSON-RPC 2.0 + SSE) with skills and task lifecycle
- Memory system (extraction, injection, retrieval, summarization)
- Skills system (registry, executor, sandbox, built-in skills)
- MITM proxy with certificate management and DNS handling
- Prompt injection guard middleware
- ACP (Agent Communication Protocol) registry
- Modular OAuth providers (13 individual modules under `src/lib/oauth/providers/`)
- Uninstall/full-uninstall scripts
- OAuth environment repair action
- WebSocket bridge for OpenAI-compatible WS clients (`/v1/ws`)
- Sync token management (issue/revoke, ETag-versioned config bundle download)
- GLM Thinking (`glmt`) first-class provider preset
- Hybrid token counting (provider-side `/messages/count_tokens` with estimation fallback)
- Model alias auto-seeding (30+ cross-proxy dialect normalizations at startup)
- Safe outbound fetch with SSRF guard, private URL blocking, and configurable retry
- Cooldown-aware chat retries with configurable `requestRetry` and `maxRetryIntervalSec`
- Runtime environment validation with Zod at startup
- Compliance audit v2 with pagination, provider CRUD events, and SSRF-blocked validation logging

Primary runtime model:

- Next.js app routes under `src/app/api/*` implement both dashboard APIs and compatibility APIs
- A shared SSE/routing core in `src/sse/*` + `open-sse/*` handles provider execution, translation, streaming, fallback, and usage

## Scope and Boundaries

### In Scope

- Local gateway runtime
- Dashboard management APIs
- Provider authentication and token refresh
- Request translation and SSE streaming
- Local state + usage persistence
- Optional cloud sync orchestration

### Out of Scope

- Cloud service implementation behind `NEXT_PUBLIC_CLOUD_URL`
- Provider SLA/control plane outside local process
- External CLI binaries themselves (Claude CLI, Codex CLI, etc.)

## Dashboard Surface (Current)

Main pages under `src/app/(dashboard)/dashboard/`:

- `/dashboard` — quick start + provider overview
- `/dashboard/endpoint` — endpoint proxy + MCP + A2A + API endpoint tabs
- `/dashboard/providers` — provider connections and credentials
- `/dashboard/combos` — combo strategies, templates, step-based builder, model routing rules, manual persisted ordering
- `/dashboard/costs` — cost aggregation and pricing visibility
- `/dashboard/analytics` — usage analytics, evaluations, combo target health
- `/dashboard/limits` — quota/rate controls
- `/dashboard/cli-tools` — CLI onboarding, runtime detection, config generation
- `/dashboard/agents` — detected ACP agents + custom agent registration
- `/dashboard/media` — image/video/music playground
- `/dashboard/search-tools` — search provider testing and history
- `/dashboard/health` — uptime, circuit breakers, rate limits, quota-monitored sessions
- `/dashboard/logs` — request/proxy/audit/console logs
- `/dashboard/settings` — system settings tabs (general, routing, combo defaults, etc.)
- `/dashboard/api-manager` — API key lifecycle and model permissions

## High-Level System Context

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
        DB[(storage.sqlite)]
        UDB[(usage tables + log artifacts)]
    end

    subgraph Upstreams[Upstream Providers]
        P1[OAuth Providers\nClaude/Codex/Gemini/Qwen/Qoder/GitHub/Kiro/Cursor/Antigravity]
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

## Core Runtime Components

## 1) API and Routing Layer (Next.js App Routes)

Main directories:

- `src/app/api/v1/*` and `src/app/api/v1beta/*` for compatibility APIs
- `src/app/api/*` for management/configuration APIs
- Next rewrites in `next.config.mjs` map `/v1/*` to `/api/v1/*`

Important compatibility routes:

- `src/app/api/v1/chat/completions/route.ts`
- `src/app/api/v1/messages/route.ts`
- `src/app/api/v1/responses/route.ts`
- `src/app/api/v1/models/route.ts` — includes custom models with `custom: true`
- `src/app/api/v1/embeddings/route.ts` — embedding generation (6 providers)
- `src/app/api/v1/images/generations/route.ts` — image generation (4+ providers incl. Antigravity/Nebius)
- `src/app/api/v1/messages/count_tokens/route.ts`
- `src/app/api/v1/providers/[provider]/chat/completions/route.ts` — dedicated per-provider chat
- `src/app/api/v1/providers/[provider]/embeddings/route.ts` — dedicated per-provider embeddings
- `src/app/api/v1/providers/[provider]/images/generations/route.ts` — dedicated per-provider images
- `src/app/api/v1beta/models/route.ts`
- `src/app/api/v1beta/models/[...path]/route.ts`

Management domains:

- Auth/settings: `src/app/api/auth/*`, `src/app/api/settings/*`
- Providers/connections: `src/app/api/providers*`
- Provider nodes: `src/app/api/provider-nodes*`
- Custom models: `src/app/api/provider-models` (GET/POST/DELETE)
- Model catalog: `src/app/api/models/route.ts` (GET)
- Proxy config: `src/app/api/settings/proxy` (GET/PUT/DELETE) + `src/app/api/settings/proxy/test` (POST)
- OAuth: `src/app/api/oauth/*`
- Keys/aliases/combos/pricing: `src/app/api/keys*`, `src/app/api/models/alias`, `src/app/api/combos*`, `src/app/api/pricing`
- Usage: `src/app/api/usage/*`
- Sync/cloud: `src/app/api/sync/*`, `src/app/api/cloud/*`
- CLI tooling helpers: `src/app/api/cli-tools/*`
- IP filter: `src/app/api/settings/ip-filter` (GET/PUT)
- Thinking budget: `src/app/api/settings/thinking-budget` (GET/PUT)
- System prompt: `src/app/api/settings/system-prompt` (GET/PUT)
- Sessions: `src/app/api/sessions` (GET)
- Rate limits: `src/app/api/rate-limits` (GET)
- Resilience: `src/app/api/resilience` (GET/PATCH) — request queue, connection cooldown, provider breaker, wait-for-cooldown config
- Resilience reset: `src/app/api/resilience/reset` (POST) — reset provider breakers
- Cache stats: `src/app/api/cache/stats` (GET/DELETE)
- Telemetry: `src/app/api/telemetry/summary` (GET)
- Budget: `src/app/api/usage/budget` (GET/POST)
- Fallback chains: `src/app/api/fallback/chains` (GET/POST/DELETE)
- Compliance audit: `src/app/api/compliance/audit-log` (GET, with pagination + structured metadata)
- Evals: `src/app/api/evals` (GET/POST), `src/app/api/evals/[suiteId]` (GET)
- Policies: `src/app/api/policies` (GET/POST)
- Sync tokens: `src/app/api/sync/tokens` (GET/POST), `src/app/api/sync/tokens/[id]` (GET/DELETE)
- Config bundle: `src/app/api/sync/bundle` (GET, ETag-versioned snapshot of settings/providers/combos/keys)
- WebSocket: `src/app/api/v1/ws/route.ts` — Upgrade handler for OpenAI-compatible WS clients

## 2) SSE + Translation Core

Main flow modules:

- Entry: `src/sse/handlers/chat.ts`
- Core orchestration: `open-sse/handlers/chatCore.ts`
- Provider execution adapters: `open-sse/executors/*`
- Format detection/provider config: `open-sse/services/provider.ts`
- Model parse/resolve: `src/sse/services/model.ts`, `open-sse/services/model.ts`
- Account fallback logic: `open-sse/services/accountFallback.ts`
- Translation registry: `open-sse/translator/index.ts`
- Stream transformations: `open-sse/utils/stream.ts`, `open-sse/utils/streamHandler.ts`
- Usage extraction/normalization: `open-sse/utils/usageTracking.ts`
- Think tag parser: `open-sse/utils/thinkTagParser.ts`
- Embedding handler: `open-sse/handlers/embeddings.ts`
- Embedding provider registry: `open-sse/config/embeddingRegistry.ts`
- Image generation handler: `open-sse/handlers/imageGeneration.ts`
- Image provider registry: `open-sse/config/imageRegistry.ts`
- Response sanitization: `open-sse/handlers/responseSanitizer.ts`
- Role normalization: `open-sse/services/roleNormalizer.ts`

Services (business logic):

- Account selection/scoring: `open-sse/services/accountSelector.ts`
- Context lifecycle management: `open-sse/services/contextManager.ts`
- IP filter enforcement: `open-sse/services/ipFilter.ts`
- Session tracking: `open-sse/services/sessionManager.ts`
- Request deduplication: `open-sse/services/signatureCache.ts`
- System prompt injection: `open-sse/services/systemPrompt.ts`
- Thinking budget management: `open-sse/services/thinkingBudget.ts`
- Wildcard model routing: `open-sse/services/wildcardRouter.ts`
- Rate limit management: `open-sse/services/rateLimitManager.ts`
- Circuit breaker: `open-sse/services/circuitBreaker.ts`
- Context handoff: `open-sse/services/contextHandoff.ts` — handoff summary generation and injection for context-relay strategy
- Codex quota fetcher: `open-sse/services/codexQuotaFetcher.ts` — fetches Codex quota for context-relay handoff decisions
- Cooldown-aware retry: `src/sse/services/cooldownAwareRetry.ts` — per-model cooldown retries with configurable `requestRetry` / `maxRetryIntervalSec`
- Safe outbound fetch: `src/shared/network/safeOutboundFetch.ts` — guarded provider/model fetch with SSRF guard, private-URL blocking, retry, and timeout
- Outbound URL guard: `src/shared/network/outboundUrlGuard.ts` — validates provider URLs against private/localhost CIDR ranges
- Provider request defaults: `open-sse/services/providerRequestDefaults.ts` — provider-level `maxTokens`, `temperature`, `thinkingBudgetTokens` defaults
- GLM provider constants: `open-sse/config/glmProvider.ts` — shared GLM models, quota URLs, GLMT timeout/defaults
- Antigravity upstream: `open-sse/config/antigravityUpstream.ts` — base URL and discovery path constants
- Codex client constants: `open-sse/config/codexClient.ts` — versioned user-agent and client-version values
- Model alias seed: `src/lib/modelAliasSeed.ts` — seeds 30+ cross-proxy dialect aliases at startup

Domain layer modules:

- Cost rules/budgets: `src/lib/domain/costRules.ts`
- Fallback policy: `src/lib/domain/fallbackPolicy.ts`
- Combo resolver: `src/lib/domain/comboResolver.ts`
- Lockout policy: `src/lib/domain/lockoutPolicy.ts`
- Policy engine: `src/domain/policyEngine.ts` — centralized lockout → budget → fallback evaluation
- Error codes catalog: `src/lib/domain/errorCodes.ts`
- Request ID: `src/lib/domain/requestId.ts`
- Fetch timeout: `src/lib/domain/fetchTimeout.ts`
- Request telemetry: `src/lib/domain/requestTelemetry.ts`
- Compliance/audit: `src/lib/domain/compliance/index.ts`
- Eval runner: `src/lib/domain/evalRunner.ts`
- Domain state persistence: `src/lib/db/domainState.ts` — SQLite CRUD for fallback chains, budgets, cost history, lockout state, circuit breakers

OAuth provider modules (13 individual files under `src/lib/oauth/providers/`):

- Registry index: `src/lib/oauth/providers/index.ts`
- Individual providers: `claude.ts`, `codex.ts`, `gemini.ts`, `antigravity.ts`, `qoder.ts`, `qwen.ts`, `kimi-coding.ts`, `github.ts`, `kiro.ts`, `cursor.ts`, `kilocode.ts`, `cline.ts`
- Thin wrapper: `src/lib/oauth/providers.ts` — re-exports from individual modules

## 3) Persistence Layer

Primary state DB (SQLite):

- Core infra: `src/lib/db/core.ts` (better-sqlite3, migrations, WAL)
- Re-export facade: `src/lib/localDb.ts` (thin compatibility layer for callers)
- file: `${DATA_DIR}/storage.sqlite` (or `$XDG_CONFIG_HOME/omniroute/storage.sqlite` when set, else `~/.omniroute/storage.sqlite`)
- entities (tables + KV namespaces): providerConnections, providerNodes, modelAliases, combos, apiKeys, settings, pricing, **customModels**, **proxyConfig**, **ipFilter**, **thinkingBudget**, **systemPrompt**

Usage persistence:

- facade: `src/lib/usageDb.ts` (decomposed modules in `src/lib/usage/*`)
- SQLite tables in `storage.sqlite`: `usage_history`, `call_logs`, `proxy_logs`
- optional file artifacts remain for compatibility/debug (`${DATA_DIR}/log.txt`, `${DATA_DIR}/call_logs/`, `<repo>/logs/...`)
- legacy JSON files are migrated to SQLite by startup migrations when present

Domain State DB (SQLite):

- `src/lib/db/domainState.ts` — CRUD operations for domain state
- Tables (created in `src/lib/db/core.ts`): `domain_fallback_chains`, `domain_budgets`, `domain_cost_history`, `domain_lockout_state`, `domain_circuit_breakers`
- Write-through cache pattern: in-memory Maps are authoritative at runtime; mutations are written synchronously to SQLite; state is restored from DB on cold start

## 4) Auth + Security Surfaces

- Dashboard cookie auth: `src/proxy.ts`, `src/app/api/auth/login/route.ts`
- API key generation/verification: `src/shared/utils/apiKey.ts`
- Provider secrets persisted in `providerConnections` entries
- Outbound proxy support via `open-sse/utils/proxyFetch.ts` (env vars) and `open-sse/utils/networkProxy.ts` (configurable per-provider or global)
- SSRF / outbound URL guard: `src/shared/network/outboundUrlGuard.ts` — blocks private/loopback/link-local ranges for all provider calls
- Runtime env validation: `src/lib/env/runtimeEnv.ts` — Zod schema for all environment variables, surfaced as startup errors/warnings
- Sync tokens: `src/lib/db/syncTokens.ts` — scoped tokens for config bundle download endpoints; backed by `sync_tokens` SQLite table (migration `024_create_sync_tokens.sql`)
- WebSocket handshake auth: `src/lib/ws/handshake.ts` — validates WS upgrade requests via API key or session cookie

## 5) Cloud Sync

- Scheduler init: `src/lib/initCloudSync.ts`, `src/shared/services/initializeCloudSync.ts`, `src/shared/services/modelSyncScheduler.ts`
- Periodic task: `src/shared/services/cloudSyncScheduler.ts`
- Periodic task: `src/shared/services/modelSyncScheduler.ts`
- Control route: `src/app/api/sync/cloud/route.ts`

## Request Lifecycle (`/v1/chat/completions`)

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

## Combo + Account Fallback Flow

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

Fallback decisions are driven by `open-sse/services/accountFallback.ts` using status codes and error-message heuristics. Combo routing adds one extra guard: provider-scoped 400s such as upstream content-block and role-validation failures are treated as model-local failures so later combo targets can still run.

## OAuth Onboarding and Token Refresh Lifecycle

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

Refresh during live traffic is executed inside `open-sse/handlers/chatCore.ts` via executor `refreshCredentials()`.

## Cloud Sync Lifecycle (Enable / Sync / Disable)

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

Periodic sync is triggered by `CloudSyncScheduler` when cloud is enabled.

## Data Model and Storage Map

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

Physical storage files:

- primary runtime DB: `${DATA_DIR}/storage.sqlite`
- request log lines: `${DATA_DIR}/log.txt` (compat/debug artifact)
- structured call payload archives: `${DATA_DIR}/call_logs/`
- optional translator/request debug sessions: `<repo>/logs/...`

## Deployment Topology

```mermaid
flowchart LR
    subgraph LocalHost[Developer Host]
        CLI[CLI Tools]
        Browser[Dashboard Browser]
    end

    subgraph ContainerOrProcess[OmniRoute Runtime]
        Next[Next.js Server\nPORT=20128]
        Core[SSE Core + Executors]
        MainDB[(storage.sqlite)]
        UsageDB[(usage tables + log artifacts)]
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

## Module Mapping (Decision-Critical)

### Route and API Modules

- `src/app/api/v1/*`, `src/app/api/v1beta/*`: compatibility APIs
- `src/app/api/v1/providers/[provider]/*`: dedicated per-provider routes (chat, embeddings, images)
- `src/app/api/providers*`: provider CRUD, validation, testing
- `src/app/api/provider-nodes*`: custom compatible node management
- `src/app/api/provider-models`: custom model management (CRUD)
- `src/app/api/models/route.ts`: model catalog API (aliases + custom models)
- `src/app/api/oauth/*`: OAuth/device-code flows
- `src/app/api/keys*`: local API key lifecycle
- `src/app/api/models/alias`: alias management
- `src/app/api/combos*`: fallback combo management
- `src/app/api/pricing`: pricing overrides for cost calculation
- `src/app/api/settings/proxy`: proxy configuration (GET/PUT/DELETE)
- `src/app/api/settings/proxy/test`: outbound proxy connectivity test (POST)
- `src/app/api/usage/*`: usage and logs APIs
- `src/app/api/sync/*` + `src/app/api/cloud/*`: cloud sync and cloud-facing helpers
- `src/app/api/cli-tools/*`: local CLI config writers/checkers
- `src/app/api/settings/ip-filter`: IP allowlist/blocklist (GET/PUT)
- `src/app/api/settings/thinking-budget`: thinking token budget config (GET/PUT)
- `src/app/api/settings/system-prompt`: global system prompt (GET/PUT)
- `src/app/api/sessions`: active session listing (GET)
- `src/app/api/rate-limits`: per-account rate limit status (GET)
- `src/app/api/sync/tokens`: sync token CRUD (GET/POST)
- `src/app/api/sync/tokens/[id]`: sync token get/delete (GET/DELETE)
- `src/app/api/sync/bundle`: config bundle download (GET, ETag versioning)
- `src/app/api/v1/ws`: WebSocket upgrade handler for OpenAI-compatible WS clients

### Routing and Execution Core

- `src/sse/handlers/chat.ts`: request parse, combo handling, account selection loop
- `open-sse/handlers/chatCore.ts`: translation, executor dispatch, retry/refresh handling, stream setup
- `open-sse/executors/*`: provider-specific network and format behavior

### Translation Registry and Format Converters

- `open-sse/translator/index.ts`: translator registry and orchestration
- Request translators: `open-sse/translator/request/*`
- Response translators: `open-sse/translator/response/*`
- Format constants: `open-sse/translator/formats.ts`

### Persistence

- `src/lib/db/*`: persistent config/state and domain persistence on SQLite
- `src/lib/localDb.ts`: compatibility re-export for DB modules
- `src/lib/usageDb.ts`: usage history/call logs facade on top of SQLite tables

## Provider Executor Coverage (Strategy Pattern)

Each provider has a specialized executor extending `BaseExecutor` (in `open-sse/executors/base.ts`), which provides URL building, header construction, retry with exponential backoff, credential refresh hooks, and the `execute()` orchestration method.

| Executor               | Provider(s)                                                                                                                                                 | Special Handling                                                     |
| ---------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------- |
| `DefaultExecutor`      | OpenAI, Claude, Gemini, Qwen, OpenRouter, GLM, Kimi, MiniMax, DeepSeek, Groq, xAI, Mistral, Perplexity, Together, Fireworks, Cerebras, Cohere, NVIDIA, etc. | Dynamic URL/header config per provider                               |
| `AntigravityExecutor`  | Google Antigravity                                                                                                                                          | Custom project/session IDs, Retry-After parsing                      |
| `CliProxyApiExecutor`  | CLIProxyAPI-compatible providers                                                                                                                            | Custom auth and protocol handling                                    |
| `CloudflareAiExecutor` | Cloudflare Workers AI                                                                                                                                       | Account ID injection, Neurons-based usage tracking                   |
| `CodexExecutor`        | OpenAI Codex                                                                                                                                                | Injects system instructions, forces reasoning effort                 |
| `CursorExecutor`       | Cursor IDE                                                                                                                                                  | ConnectRPC protocol, Protobuf encoding, request signing via checksum |
| `GithubExecutor`       | GitHub Copilot                                                                                                                                              | Copilot token refresh, VSCode-mimicking headers                      |
| `GeminiCLIExecutor`    | Gemini CLI                                                                                                                                                  | Google OAuth token refresh cycle                                     |
| `KiroExecutor`         | AWS CodeWhisperer/Kiro                                                                                                                                      | AWS EventStream binary format → SSE conversion                       |
| `OpenCodeExecutor`     | OpenCode                                                                                                                                                    | AI SDK compatible provider setup                                     |
| `PollinationsExecutor` | Pollinations AI                                                                                                                                             | No API key required, rate-limited requests                           |
| `PuterExecutor`        | Puter                                                                                                                                                       | Browser-based provider integration                                   |
| `QoderExecutor`        | Qoder AI                                                                                                                                                    | PAT and OAuth support, multi-model free tier                         |
| `VertexExecutor`       | Google Vertex AI                                                                                                                                            | Service account auth, region-based endpoints                         |

All other providers (including custom compatible nodes) use the `DefaultExecutor`.

## Provider Compatibility Matrix

| Provider         | Format           | Auth                  | Stream           | Non-Stream | Token Refresh | Usage API          |
| ---------------- | ---------------- | --------------------- | ---------------- | ---------- | ------------- | ------------------ |
| Claude           | claude           | API Key / OAuth       | ✅               | ✅         | ✅            | ⚠️ Admin only      |
| Gemini           | gemini           | API Key / OAuth       | ✅               | ✅         | ✅            | ⚠️ Cloud Console   |
| Gemini CLI       | gemini-cli       | OAuth                 | ✅               | ✅         | ✅            | ⚠️ Cloud Console   |
| Antigravity      | antigravity      | OAuth                 | ✅               | ✅         | ✅            | ✅ Full quota API  |
| OpenAI           | openai           | API Key               | ✅               | ✅         | ❌            | ❌                 |
| Codex            | openai-responses | OAuth                 | ✅ forced        | ❌         | ✅            | ✅ Rate limits     |
| GitHub Copilot   | openai           | OAuth + Copilot Token | ✅               | ✅         | ✅            | ✅ Quota snapshots |
| Cursor           | cursor           | Custom checksum       | ✅               | ✅         | ❌            | ❌                 |
| Kiro             | kiro             | AWS SSO OIDC          | ✅ (EventStream) | ❌         | ✅            | ✅ Usage limits    |
| Qwen             | openai           | OAuth                 | ✅               | ✅         | ✅            | ⚠️ Per request     |
| Qoder            | openai           | OAuth / PAT           | ✅               | ✅         | ✅            | ⚠️ Per request     |
| Kilo Code        | openai           | OAuth                 | ✅               | ✅         | ✅            | ❌                 |
| Cline            | openai           | OAuth                 | ✅               | ✅         | ✅            | ❌                 |
| Kimi Coding      | openai           | OAuth                 | ✅               | ✅         | ✅            | ❌                 |
| OpenRouter       | openai           | API Key               | ✅               | ✅         | ❌            | ❌                 |
| GLM/Kimi/MiniMax | claude           | API Key               | ✅               | ✅         | ❌            | ❌                 |
| DeepSeek         | openai           | API Key               | ✅               | ✅         | ❌            | ❌                 |
| Groq             | openai           | API Key               | ✅               | ✅         | ❌            | ❌                 |
| xAI (Grok)       | openai           | API Key               | ✅               | ✅         | ❌            | ❌                 |
| Mistral          | openai           | API Key               | ✅               | ✅         | ❌            | ❌                 |
| Perplexity       | openai           | API Key               | ✅               | ✅         | ❌            | ❌                 |
| Together AI      | openai           | API Key               | ✅               | ✅         | ❌            | ❌                 |
| Fireworks AI     | openai           | API Key               | ✅               | ✅         | ❌            | ❌                 |
| Cerebras         | openai           | API Key               | ✅               | ✅         | ❌            | ❌                 |
| Cohere           | openai           | API Key               | ✅               | ✅         | ❌            | ❌                 |
| NVIDIA NIM       | openai           | API Key               | ✅               | ✅         | ❌            | ❌                 |
| Cloudflare AI    | openai           | API Token + Acct ID   | ✅               | ✅         | ❌            | ❌                 |
| Pollinations     | openai           | None (no key)         | ✅               | ✅         | ❌            | ❌                 |
| Scaleway AI      | openai           | API Key               | ✅               | ✅         | ❌            | ❌                 |
| LongCat          | openai           | API Key               | ✅               | ✅         | ❌            | ❌                 |
| Ollama Cloud     | openai           | API Key (optional)    | ✅               | ✅         | ❌            | ❌                 |
| HuggingFace      | openai           | API Key               | ✅               | ✅         | ❌            | ❌                 |
| Nebius           | openai           | API Key               | ✅               | ✅         | ❌            | ❌                 |
| SiliconFlow      | openai           | API Key               | ✅               | ✅         | ❌            | ❌                 |
| Hyperbolic       | openai           | API Key               | ✅               | ✅         | ❌            | ❌                 |
| Vertex AI        | gemini           | Service Account       | ✅               | ✅         | ✅            | ⚠️ Cloud Console   |
| Puter            | openai           | API Key               | ✅               | ✅         | ❌            | ❌                 |

## Format Translation Coverage

Detected source formats include:

- `openai`
- `openai-responses`
- `claude`
- `gemini`

Target formats include:

- OpenAI chat/Responses
- Claude
- Gemini/Gemini-CLI/Antigravity envelope
- Kiro
- Cursor

Translations use **OpenAI as the hub format** — all conversions go through OpenAI as intermediate:

```
Source Format → OpenAI (hub) → Target Format
```

Translations are selected dynamically based on source payload shape and provider target format.

Additional processing layers in the translation pipeline:

- **Response sanitization** — Strips non-standard fields from OpenAI-format responses (both streaming and non-streaming) to ensure strict SDK compliance
- **Role normalization** — Converts `developer` → `system` for non-OpenAI targets; merges `system` → `user` for models that reject the system role (GLM, ERNIE)
- **Think tag extraction** — Parses `<think>...</think>` blocks from content into `reasoning_content` field
- **Structured output** — Converts OpenAI `response_format.json_schema` to Gemini's `responseMimeType` + `responseSchema`

## Supported API Endpoints

| Endpoint                                           | Format             | Handler                                                             |
| -------------------------------------------------- | ------------------ | ------------------------------------------------------------------- |
| `POST /v1/chat/completions`                        | OpenAI Chat        | `src/sse/handlers/chat.ts`                                          |
| `POST /v1/messages`                                | Claude Messages    | Same handler (auto-detected)                                        |
| `POST /v1/responses`                               | OpenAI Responses   | `open-sse/handlers/responsesHandler.ts`                             |
| `POST /v1/embeddings`                              | OpenAI Embeddings  | `open-sse/handlers/embeddings.ts`                                   |
| `GET /v1/embeddings`                               | Model listing      | API route                                                           |
| `POST /v1/images/generations`                      | OpenAI Images      | `open-sse/handlers/imageGeneration.ts`                              |
| `GET /v1/images/generations`                       | Model listing      | API route                                                           |
| `POST /v1/providers/{provider}/chat/completions`   | OpenAI Chat        | Dedicated per-provider with model validation                        |
| `POST /v1/providers/{provider}/embeddings`         | OpenAI Embeddings  | Dedicated per-provider with model validation                        |
| `POST /v1/providers/{provider}/images/generations` | OpenAI Images      | Dedicated per-provider with model validation                        |
| `POST /v1/messages/count_tokens`                   | Claude Token Count | API route                                                           |
| `GET /v1/models`                                   | OpenAI Models list | API route (chat + embedding + image + custom models)                |
| `GET /api/models/catalog`                          | Catalog            | All models grouped by provider + type                               |
| `POST /v1beta/models/*:streamGenerateContent`      | Gemini native      | API route                                                           |
| `GET/PUT/DELETE /api/settings/proxy`               | Proxy Config       | Network proxy configuration                                         |
| `POST /api/settings/proxy/test`                    | Proxy Connectivity | Proxy health/connectivity test endpoint                             |
| `GET/POST/DELETE /api/provider-models`             | Provider Models    | Provider model metadata backing custom and managed available models |

## Bypass Handler

The bypass handler (`open-sse/utils/bypassHandler.ts`) intercepts known "throwaway" requests from Claude CLI — warmup pings, title extractions, and token counts — and returns a **fake response** without consuming upstream provider tokens. This is triggered only when `User-Agent` contains `claude-cli`.

## Request Logging and Artifacts

The older file-based request logger (`open-sse/utils/requestLogger.ts`) is retained only for
legacy compatibility. The current runtime contract uses:

- `APP_LOG_TO_FILE=true` for application and audit logs written under `<repo>/logs/`
- SQLite-backed call log records in `call_logs`
- `${DATA_DIR}/call_logs/YYYY-MM-DD/...` artifacts when the call log pipeline is enabled

## Failure Modes and Resilience

## 1) Account/Provider Availability

- connection cooldown on retryable upstream failures
- account fallback before failing request
- combo model fallback when current model/provider path is exhausted

## 2) Token Expiry

- pre-check and refresh with retry for refreshable providers
- 401/403 retry after refresh attempt in core path

## 3) Stream Safety

- disconnect-aware stream controller
- translation stream with end-of-stream flush and `[DONE]` handling
- usage estimation fallback when provider usage metadata is missing

## 4) Cloud Sync Degradation

- sync errors are surfaced but local runtime continues
- scheduler has retry-capable logic, but periodic execution currently calls single-attempt sync by default

## 5) Data Integrity

- SQLite schema migrations and auto-upgrade hooks at startup
- legacy JSON → SQLite migration compatibility path

## 6) SSRF / Outbound URL Guard

- `src/shared/network/outboundUrlGuard.ts` blocks all private/loopback/link-local target URLs before they reach provider executors
- Provider model discovery and validation routes use `src/shared/network/safeOutboundFetch.ts` which applies the guard before every outbound request
- Guard errors surface as `URL_GUARD_BLOCKED` with HTTP 422 and are logged to the compliance audit trail via `providerAudit.ts`

## Observability and Operational Signals

Runtime visibility sources:

- console logs from `src/sse/utils/logger.ts`
- per-request usage aggregates in SQLite (`usage_history`, `call_logs`, `proxy_logs`)
- four-stage detailed payload captures in SQLite (`request_detail_logs`) when `settings.detailed_logs_enabled=true`
- textual request status log in `log.txt` (optional/compat)
- optional application log files under `logs/` when `APP_LOG_TO_FILE=true`
- optional request artifacts under `${DATA_DIR}/call_logs/` when the call log pipeline is enabled
- dashboard usage endpoints (`/api/usage/*`) for UI consumption

Detailed request payload capture stores up to four JSON payload stages per routed call:

- raw request received from the client
- translated request actually sent upstream
- provider response reconstructed as JSON; streamed responses are compacted to the final summary plus stream metadata
- final client response returned by OmniRoute; streamed responses are stored in the same compact summary form

## Security-Sensitive Boundaries

- JWT secret (`JWT_SECRET`) secures dashboard session cookie verification/signing
- Initial password bootstrap (`INITIAL_PASSWORD`) should be explicitly configured for first-run provisioning
- API key HMAC secret (`API_KEY_SECRET`) secures generated local API key format
- Provider secrets (API keys/tokens) are persisted in local DB and should be protected at filesystem level
- Cloud sync endpoints rely on API key auth + machine id semantics

## Environment and Runtime Matrix

Environment variables actively used by code:

- App/auth: `JWT_SECRET`, `INITIAL_PASSWORD`
- Storage: `DATA_DIR`
- Compatible node behavior: `ALLOW_MULTI_CONNECTIONS_PER_COMPAT_NODE`
- Optional storage base override (Linux/macOS when `DATA_DIR` unset): `XDG_CONFIG_HOME`
- Security hashing: `API_KEY_SECRET`, `MACHINE_ID_SALT`
- Logging: `APP_LOG_TO_FILE`, `APP_LOG_RETENTION_DAYS`, `CALL_LOG_RETENTION_DAYS`
- Sync/cloud URLing: `NEXT_PUBLIC_BASE_URL`, `NEXT_PUBLIC_CLOUD_URL`
- Outbound proxy: `HTTP_PROXY`, `HTTPS_PROXY`, `ALL_PROXY`, `NO_PROXY` and lowercase variants
- SOCKS5 feature flags: `ENABLE_SOCKS5_PROXY`, `NEXT_PUBLIC_ENABLE_SOCKS5_PROXY`
- Platform/runtime helpers (not app-specific config): `APPDATA`, `NODE_ENV`, `PORT`, `HOSTNAME`

## Known Architectural Notes

1. `usageDb` and `localDb` share the same base directory policy (`DATA_DIR` -> `XDG_CONFIG_HOME/omniroute` -> `~/.omniroute`) with legacy file migration.
2. `/api/v1/route.ts` delegates to the same unified catalog builder used by `/api/v1/models` (`src/app/api/v1/models/catalog.ts`) to avoid semantic drift.
3. Request logger writes full headers/body when enabled; treat log directory as sensitive.
4. Cloud behavior depends on correct `NEXT_PUBLIC_BASE_URL` and cloud endpoint reachability.
5. The `open-sse/` directory is published as the `@omniroute/open-sse` **npm workspace package**. Source code imports it via `@omniroute/open-sse/...` (resolved by Next.js `transpilePackages`). File paths in this document still use the directory name `open-sse/` for consistency.
6. Charts in the dashboard use **Recharts** (SVG-based) for accessible, interactive analytics visualizations (model usage bar charts, provider breakdown tables with success rates).
7. E2E tests use **Playwright** (`tests/e2e/`), run via `npm run test:e2e`. Unit tests use **Node.js test runner** (`tests/unit/`), run via `npm run test:unit`. Source code under `src/` is **TypeScript** (`.ts`/`.tsx`); the `open-sse/` workspace remains JavaScript (`.js`).
8. Settings page is organized into 7 tabs: General, Appearance, AI, Security, Routing, Resilience, Advanced. The Resilience page only configures request queue, connection cooldown, provider breaker, and wait-for-cooldown behavior; live breaker runtime state is shown on the Health page.
9. **Context Relay** strategy (`context-relay`) is split across two layers: `combo.ts` decides if a handoff should be generated, `chat.ts` injects the handoff after account resolution. Handoff data lives in `context_handoffs` SQLite table. This split is intentional because only `chat.ts` knows whether the actual account changed.
10. **Proxy enforcement** is now comprehensive: `tokenHealthCheck.ts` resolves proxy per connection, `/api/providers/validate` uses `runWithProxyContext`, and `proxyFetch.ts` uses `undici.fetch()` to maintain dispatcher compatibility on Node 22.
11. **Node.js runtime policy detection**: `/api/settings/require-login` returns `nodeVersion` and `nodeCompatible` fields. The login page renders a warning banner when the runtime falls outside the supported secure Node.js lines.

## Operational Verification Checklist

- Build from source: `npm run build`
- Build Docker image: `docker build -t omniroute .`
- Start service and verify:
- `GET /api/settings`
- `GET /api/v1/models`
- CLI target base URL should be `http://<host>:20128/v1` when `PORT=20128`
