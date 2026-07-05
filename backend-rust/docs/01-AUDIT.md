# OmniRoute Backend Rewrite - Deep Audit

**Date**: 2026-07-05
**Source**: `/Users/kooshapari/CodeProjects/Phenotype/repos/OmniRoute-pr232-policyfix-20260703` (OmniRoute v3.8.43 fork)
**Goal**: Replace non-frontend backend (HTTP API, providers, SSE, auth, quota, CLI, SDK) with Rust/Go implementation; preserve OpenAI-compatible API surface, call_logs/usage_history schemas, CLI flags.

## 1. Backend Surface Inventory

### 1.1 HTTP API routes (`src/app/api/v1/`) - 50+ handlers

| Path | Method | Purpose |
|---|---|---|
| `/api/v1/chat/completions` | POST | OpenAI-compatible chat |
| `/api/v1/completions` | POST | Legacy text completions |
| `/api/v1/embeddings` | POST | OpenAI-compatible embeddings |
| `/api/v1/images/generations` | POST | Image generation |
| `/api/v1/images/edits` | POST | Image edit |
| `/api/v1/audio/speech` | POST | TTS |
| `/api/v1/audio/transcriptions` | POST | STT (Whisper) |
| `/api/v1/music/generations` | POST | Music gen |
| `/api/v1/videos/generations` | POST | Video gen |
| `/api/v1/rerank` | POST | Reranking |
| `/api/v1/moderations` | POST | Moderation |
| `/api/v1/responses` | POST | OpenAI Responses API |
| `/api/v1/responses/[...path]` | * | Responses passthrough |
| `/api/v1/messages` | POST | Anthropic Messages |
| `/api/v1/messages/count_tokens` | POST | Token count |
| `/api/v1/models` | GET | List models |
| `/api/v1/models/[...model]` | GET | Model detail |
| `/api/v1/files` | GET/POST | Files CRUD |
| `/api/v1/files/[id]` | GET/DELETE | File ops |
| `/api/v1/files/[id]/content` | GET | File content |
| `/api/v1/batches` | GET/POST | Batch ops |
| `/api/v1/batches/[id]/cancel` | POST | Batch cancel |
| `/api/v1/batches/delete-completed` | POST | Batch cleanup |
| `/api/v1/api/chat` | POST | Generic chat |
| `/api/v1/me/status` | GET | Current user |
| `/api/v1/quotas/check` | GET/POST | Quota check |
| `/api/v1/accounts/[id]/limits` | GET | Account limits |
| `/api/v1/registered-keys` | GET/POST | API keys CRUD |
| `/api/v1/registered-keys/[id]` | GET/PATCH/DELETE | API key ops |
| `/api/v1/registered-keys/[id]/revoke` | POST | Revoke key |
| `/api/v1/agents/tasks` | GET/POST | Agent task mgmt |
| `/api/v1/agents/tasks/[id]` | GET/PATCH/DELETE | Task ops |
| `/api/v1/agents/credentials` | GET/POST | Agent creds |
| `/api/v1/agents/health` | GET | Agent health |
| `/api/v1/combos` | GET/POST/DELETE | Combo CRUD |
| `/api/v1/providers/[provider]/*` | * | Direct provider routes (chat, embeddings, images, models, limits) |
| `/api/v1/management/proxies/*` | * | Proxy management |
| `/api/v1/relay/chat/completions` | POST | Relay passthrough |
| `/api/v1/relay/chat/completions/bifrost` | POST | Bifrost relay |
| `/api/v1/search` | POST | Search |
| `/api/v1/search/analytics` | GET | Search analytics |
| `/api/v1/web/fetch` | POST | Web fetch |
| `/api/v1/chatgpt-web/image/[id]` | GET | ChatGPT web image |
| `a2a/route.ts` | POST | A2A v0.3 protocol |
| `.well-known/agent.json` | GET | A2A agent card |

### 1.2 Middleware
- `src/middleware/promptInjectionGuard.ts` - guardrail hook

### 1.3 SSE handlers (`src/sse/handlers/`)
| File | Lines | Purpose |
|---|---|---|
| `chat.ts` | 1551 | Main chat entry: auth, routing, pipeline orchestration |
| `chatHelpers.ts` | 787 | Helpers: error handling, response shaping |
| `requestBody.ts` | 24 | Request body normalization |
| `resolveRoutingModel.ts` | 17 | X-Route-Model header override |

### 1.4 SSE services (`src/sse/services/`)
| File | Lines | Purpose |
|---|---|---|
| `auth.ts` | 2335 | API key extraction, scope checks, key health |
| `cooldownAwareRetry.ts` | 162 | Cooldown retry policy |
| `model.ts` | 280 | Model lookup and combo resolution |
| `streamState.ts` | 227 | Streaming state machine |
| `tokenRefresh.ts` | 275 | OAuth token refresh |
| `noAuthProviderSettings.ts` | 18 | No-auth provider config |
| `noAuthProxyResolution.ts` | (small) | No-auth proxy |

### 1.5 `open-sse/lib/` - pipeline helpers (~70 files)
Key files: `streamingPipeline.ts`, `streamingCost.ts`, `streamingQuotaShare.ts`, `streamingSemanticCacheStore.ts`, `streamingResponseHeaders.ts`, `streamingUsageStats.ts`, `semanticCacheStore.ts`, `semanticCache.ts`, `quotaShareConsumption.ts`, `cooldownAwareRetry`, `keyHealth.ts`, `apiKeyRotator.ts`, `requestFormat.ts`, `targetFormat.ts`, `passthroughHelpers.ts`, `passthroughToolNames.ts`, `sanitization.ts`, `serviceTier.ts`, `skillsFormat.ts`, `headers.ts`, `requestSetup.ts`, `responseHeaders.ts`, `streamingResponseHeaders.ts`, `idempotency.ts`, `jsonBodyToSse.ts`, `logTruncation.ts`, `memoryExtraction.ts`, `memorySkillsInjection.ts`, `nonStreamingResponseBody.ts`, `nonStreamingResponseHeaders.ts`, `nonStreamingResponseParse.ts`, `nonStreamingSse.ts`, `nonStreamingUsageStats.ts`, `outputStyleTelemetry.ts`, `pluginOnRequest.ts`, `pluginOnResponse.ts`, `postCallGuardrailContext.ts`, `stageTrace.ts`, `streamErrorResult.ts`, `streamFinalize.ts`, `streamingCost.ts`, `streamingPipeline.ts`, `streamingQuotaShare.ts`, `streamingSemanticCacheStore.ts`, `streamingUsageStats.ts`, `targetFormat.ts`, `telemetryHelpers.ts`, `upstreamBody.ts`, `upstreamExecuteHeaders.ts`, `upstreamTimeouts.ts`, `attemptLogging.ts`, `backgroundRedirect.ts`, `cacheUsageMeta.ts`, `cavemanOutputAnalytics.ts`, `claudeEffortVariant.ts`, `claudeMessageTypes.ts`, `claudeSystemRole.ts`, `claudeUpstreamMessages.ts`, `clientUsageBuffer.ts`, `codexFailover.ts`, `codexQuota.ts`, `comboContextCache.ts`, `compressionAnalyticsWrite.ts`, `compressionCacheStats.ts`, `compressionComboPredicates.ts`, `compressionSettings.ts`, `compressionUsageReceipt.ts`, `contextEditingTelemetry.ts`, `executionCredentials.ts`, `executorClientHeaders.ts`, `executorHelpers.ts`, `executorProxy.ts`, `failureUsage.ts`, `gamificationEvent.ts`

### 1.6 `open-sse/handlers/` - endpoint implementations
| File | Lines | Purpose |
|---|---|---|
| `chatCore.ts` | **5828** | **MONOLITH** - main chat pipeline |
| `imageGeneration.ts` | 2855 | Image gen pipeline |
| `responseSanitizer.ts` | 1121 | Response cleaning |
| `videoGeneration.ts` | 1082 | Video gen |
| `audioSpeech.ts` | 1060 | TTS |
| `sseParser.ts` | 829 | SSE parsing |
| `responseTranslator.ts` | 649 | Response format translation |
| `musicGeneration.ts` | 640 | Music gen |
| `audioTranscription.ts` | 554 | STT |
| `embeddings.ts` | 378 | Embeddings |
| `rerank.ts` | 139 | Rerank |
| `webFetch.ts` | 121 | Web fetch |
| `responsesHandler.ts` | 92 | OpenAI Responses |
| `usageExtractor.ts` | 78 | Usage extraction |
| `moderations.ts` | 73 | Moderation |
| `search.ts` | 1545 | Search |

### 1.7 CLI commands (`bin/cli/commands/`) - ~30 commands
`status`, `provider-cmd`, `setup-gemini`, `setup-cline`, `setup-claude`, `setup-opencode`, `setup-roo`, `setup-crush`, `setup-aider`, `setup-kilo`, `launch-codex`, `configure`, `mcp`, `sync`, `contexts`, `usage`, `redis`, `tags`, `cloud`, `quota`, `compression`, `test-provider`, `providers`, `completion`, `memory`, `openapi`, `open`, `repl`, `context-eng`

### 1.8 Providers (`open-sse/config/providers/registry/`)
**231 provider entries** (per `AGENTS.md` line 7). Examples: `claude`, `gemini`, `openai`, `openrouter`, `groq`, `deepseek`, `mistral`, `cohere`, `together`, `fireworks`, `sambanova`, `kilocode`, `cursor`, `cline`, `phind`, `chatgpt-web`, `grok-web`, `moonshot`, `sparkdesk`, `baidu`, `byteplus`, `siliconflow`, `gitlab-duo`, `predibase`, `bytez`, `nscale`, `hyperbolic`, `ideogram`, `leonardo`, `comfyUI`, `sdWebUI`, `imagen3`, `haiper`, `wafer`, `udio`, `api-airforce`, `uncloseai`, `llamagate`, `nous-research`, `theoldllm`, `heroku`, `glhf`, `moonshot`, `codestral`, `sambanova`, ...

### 1.9 Database (`src/lib/localDb.ts`, `src/lib/db/`, `src/lib/usageDb.ts`)
- Storage: **better-sqlite3** (synchronous) + **sql.js** (WASM variant)
- 17 base tables, 97 migrations
- Modules: `providerStore`, `userStore`, `emailPrivacyStore`, `notificationStore`, `themeStore`, `index`, `usageDb`, `localDb`, `db/`, `cloudAgent/db`
- Schemas: API keys, accounts, combos, call logs, usage history, sessions, handoffs, A2A tasks, agent tasks, agent credentials, combos, providers, custom providers, mcp tools, mcp scopes, search providers, plugins, themes, notifications, embeddings, memory, semantic cache

### 1.10 `open-sse/` package structure
- `config/` - provider config, error config, registries
- `config/providers/registry/<name>/index.ts` - per-provider adapter (231 files)
- `transformer/` - request/response transformers
- `translator/request/`, `translator/response/`, `translator/image/`, `translator/helpers/` - format translation
- `executors/` - execution strategies
- `mcp-server/` - MCP server (87 tools)
- `services/` - 115 services (compression, quota, combo, model, account, etc.)
- `services/compression/` - RTK + Caveman compression
- `lib/` - ~70 pipeline helpers
- `handlers/` - endpoint implementations
- `observability/` - traces, metrics
- `utils/` - utilities

## 2. Critical Backend Subsystems

### 2.1 Routing engine
- **Entry**: `src/sse/handlers/chat.ts:1-80` (imports + setup)
- **Resolve**: `src/sse/handlers/resolveRoutingModel.ts:14-22` (X-Route-Model header)
- **Pipeline**: `open-sse/handlers/chatCore.ts` (5828 lines)
- **Combo resolution**: `open-sse/services/combo.ts`
- **Auto combo**: `open-sse/services/autoCombo/autoPrefix.ts`, `builtinCatalog.ts`, `suffixComposition.ts`
- **Provider format target**: `open-sse/services/provider.ts: getTargetFormat`
- **Provider ID alias**: `open-sse/config/providerModels.ts: PROVIDER_ID_TO_ALIAS`

Key abstractions:
- `resolveChatRequestBody(request)` - normalizes body
- `resolveRoutingModel(request, body)` - picks routing model
- `enforceApiKeyPolicy(key, model)` - allowlist check
- `getCombosCacheVersion()` - cache versioning
- `handleComboChat(combo, body)` - combo execution

### 2.2 Auth & API key
- **Extraction**: `src/sse/services/auth.ts` (2335 lines)
- `extractApiKey(request)`, `isValidApiKey(key)`
- `getProviderCredentialsWithQuotaPreflight(...)`
- `markAccountUnavailable(...)`
- `extractSessionAffinityKey(...)` - session affinity
- **Scopes**: `src/app/api/v1/_helpers/apiKeyScope.ts`
- **Tiers**: per-key, per-account, per-team (preflight checks)
- **Key health**: `open-sse/lib/keyHealth.ts`
- **Key rotator**: `open-sse/services/apiKeyRotator.ts`

### 2.3 Quota / billing / usage
- **Quota monitor**: `open-sse/services/quotaMonitor.ts`
- **Sliding window limiter**: `open-sse/services/slidingWindowLimiter.ts`
- **Streaming quota share**: `open-sse/lib/streamingQuotaShare.ts`
- **Quota share consumption**: `open-sse/lib/quotaShareConsumption.ts`
- **Usage storage**: `src/lib/usageDb.ts`
- **Antigravity credits**: `open-sse/services/antigravityCredits.ts`
- **Browser pool**: `open-sse/services/browserPool.ts`
- **Account semaphore**: `open-sse/services/accountSemaphore.ts`
- **Codex quota**: `open-sse/handlers/chatCore/codexQuota.ts`

### 2.4 Compression (RTK + Caveman)
- **Pipeline entry**: `open-sse/services/compression/`
- **Aggressive**: `compression/adaptiveCompression/aggressive.ts` - tool-result compressor, summarizer, aging
- **Caveman**: `caveman.ts` - token-level compression (deterministic substitutions, casual -> caveman)
- **Lite**: `lite.ts` - light pass
- **Adaptive**: `adaptiveCompression/` - selects strategy
- **Tool-result compressor**: `toolResultCompressor.ts`
- **Progressive aging**: `progressiveAging.ts`
- **Summarizer**: `summarizer.ts` (RuleBasedSummarizer)
- **Analytics**: `compressionAnalyticsWrite.ts`, `compressionCacheStats.ts`, `cavemanOutputAnalytics.ts`
- **CLI**: `bin/cli/commands/compression.mjs`

### 2.5 Provider translation
- **Provider format target**: `open-sse/services/provider.ts: getTargetFormat`
- **Format types**: `openai`, `anthropic`, `gemini`, `cohere`, `bedrock`, `azure`, `responses`
- **Transformers**: `open-sse/transformer/`
- **Translators**: `open-sse/translator/request/`, `translator/response/`, `translator/image/`, `translator/helpers/`
- **Registries**: `imageRegistry.ts`, `audioRegistry.ts`, `musicRegistry.ts`, `searchRegistry.ts`
- **Special upstreams**: `antigravityUpstream.ts`, `bedrock.ts`, `glmProvider.ts`, `sap.ts`, `watsonx.ts`

### 2.6 Streaming / SSE pipeline
- **Entry**: `open-sse/handlers/chatCore.ts:1-100`
- **Pipeline**: `open-sse/lib/streamingPipeline.ts`
- **State machine**: `src/sse/services/streamState.ts`
- **Parser**: `open-sse/handlers/sseParser.ts` (829 lines)
- **Response headers**: `open-sse/lib/streamingResponseHeaders.ts`
- **Non-streaming response**: `open-sse/lib/nonStreamingResponse*.ts` (4 files)
- **JSON to SSE**: `open-sse/lib/jsonBodyToSse.ts`
- **Finalize**: `open-sse/handlers/chatCore/streamFinalize.ts`
- **Sanitization**: `open-sse/handlers/chatCore/sanitization.ts`
- **Background redirect**: `open-sse/lib/backgroundRedirect.ts`
- **Stream error result**: `open-sse/lib/streamErrorResult.ts`
- **Stage trace**: `open-sse/lib/stageTrace.ts`

### 2.7 MCP server & A2A
- **MCP server**: `open-sse/mcp-server/` (87 tools)
- **MCP tools**: `open-sse/mcp-server/tools/`
- **MCP schemas**: `open-sse/mcp-server/schemas/`
- **MCP CLI**: `bin/cli/commands/mcp.mjs`
- **A2A protocol**: `src/app/a2a/route.ts` (v0.3)
- **A2A skills**: 6
- **Agent card**: `src/app/.well-known/agent.json/route.ts`
- **Agent tasks**: `/api/v1/agents/tasks/*`
- **Cloud agent**: `src/lib/cloudAgent/db.ts`

### 2.8 Token refresh
- **Service**: `src/sse/services/tokenRefresh.ts` (275 lines)
- **OAuth**: `src/lib/oauth/`
- **Providers**: `src/lib/oauth/providers/` (Google, GitHub, GitLab, etc.)
- **Services**: `src/lib/oauth/services/`
- **Zed OAuth**: `src/lib/zed-oauth/`

### 2.9 Cooldown & retry
- **Cooldown aware retry**: `src/sse/services/cooldownAwareRetry.ts` (162 lines)
- **Account fallback**: `open-sse/services/accountFallback.ts`
- **Codex failover**: `open-sse/lib/codexFailover.ts`
- **Bifrost kill switch**: `open-sse/services/bifrostKillSwitch.ts`
- **Rate limit manager**: `open-sse/services/rateLimitManager.ts`
- **Model lockout settings**: `src/lib/resilience/modelLockoutSettings`
- **Tool limit detector**: `open-sse/services/toolLimitDetector.ts`
- **Circuit breaker**: `src/shared/utils/circuitBreaker`

## 3. Performance Bottlenecks

1. **Monolith `chatCore.ts` (5828 lines)**: Single function does auth, routing, provider dispatch, format translation, SSE, usage, compression, cache. Hard to optimize per-stage. **Fix**: decompose to 8-12 sub-pipeline stages with trait-based interfaces.

2. **JSON parse/stringify hot loops**: Each SSE chunk gets parsed, mutated, re-serialized. **Fix**: use `simd-json` (Rust) or zero-copy buffer slicing.

3. **Synchronous I/O (`better-sqlite3`)**: Blocks Node event loop on heavy write paths. **Fix**: `tokio` + `sqlx` async SQLite.

4. **Provider routing O(n)**: Each chat request runs through 231 provider registry entries. **Fix**: pre-compute hash index `model_alias -> (provider, upstream_model)`, build at startup, hot-reload on config change.

5. **SSE backpressure**: No explicit backpressure between upstream and client. **Fix**: bounded channels + explicit yield to client task.

6. **SQLite single-writer**: With many concurrent writes, SQLite WAL helps but limits throughput. **Fix**: WAL + async pool + batched inserts every 100ms or 100 rows.

7. **Compression is per-message on every request**: No memoization. **Fix**: LRU cache keyed by `(model, message_hash, config_version)`.

8. **Token counting on every request**: Estimates by `length/4`. **Fix**: real BPE tokenizers via `tiktoken-rs`, `tokenizers`.

9. **No connection pooling to upstream providers**: New HTTP/2 stream per request. **Fix**: per-provider pool with `hyper` keepalive, `reqwest` connection pool.

10. **CLI as `node` runtime**: Cold start 250-500ms, requires Node 22+. **Fix**: single static Rust binary, 10-20ms cold start, embedded SQLite.

## 4. Concrete Rewrite Targets

### 4.1 Must-port (Day 1)
- **HTTP server**: `axum` (Rust) - all `/api/v1/*` routes, full OpenAI-compatible surface
- **Auth**: API key extraction, scope checks, key health - port `src/sse/services/auth.ts`
- **Routing engine**: `resolveRoutingModel` + combo resolution
- **Provider format target**: 6 formats (openai, anthropic, gemini, cohere, bedrock, responses)
- **SSE pipeline**: `streamingPipeline.ts` -> Rust with `tokio::sync::mpsc` bounded channels
- **Storage**: `localDb.ts` schema -> `sqlx` migrations, same call_logs/usage_history table shapes
- **CLI**: `bin/omniroute.mjs` + ~30 commands -> Rust binary with `clap`
- **SDK**: New Rust crate `omniroute-sdk`

### 4.2 Phase 2 (week 2-3)
- **Compression (RTK + Caveman)**: port `open-sse/services/compression/`
- **MCP server**: port `open-sse/mcp-server/` (87 tools)
- **A2A protocol**: port `src/app/a2a/route.ts`
- **Semantic cache**: port `semanticCacheStore.ts`
- **Provider translation**: port all 231 provider adapters

### 4.3 Phase 3 (month 2)
- Image, video, music, audio generators
- Search, web fetch, rerank
- OAuth flows
- Memory & embeddings

### 4.4 What can be deleted
- All Next.js App Router plumbing
- `tsx` runtime
- `better-sqlite3` (sync)
- `npm` workspace
- `tsc` build pipeline
- Next.js-specific tests (keep only contract tests)

## 5. Test Surface to Preserve

Test files in `tests/unit/`:
- `api/` - API contract tests (KEEP)
- `auth/`, `authz/` - auth contract tests (KEEP)
- `combo/` - combo resolution tests (KEEP)
- `compression/` - compression contract tests (KEEP)
- `mcp/` - MCP tool tests (KEEP)
- `services/` - service contract tests (KEEP)
- `usage/` - usage tracking tests (KEEP)
- `db/`, `db-adapters/` - schema migration tests (KEEP)
- `cli/`, `cli-helper/` - CLI flag tests (KEEP)
- `cors/`, `security/` - middleware tests (KEEP)
- `correctness/` - property tests (KEEP)

**Strategy**: Keep TS tests as the gold-spec, run them against a Rust test server via HTTP. This is the contract test harness.

## 6. Hard Constraints

1. **License**: MIT
2. **API compatibility**: 100% of OpenAI-compatible endpoints must work unchanged
3. **Data compatibility**: `call_logs`, `usage_history` SQLite schemas must be importable from existing TS database
4. **CLI compatibility**: All existing CLI flags must work
5. **Provider compatibility**: All 231 providers must work (at least the 30 most-used; rest in phase 3)
6. **Polyglot binding**: per ADR-032, prefer HTTP for now, design for UDS/RPC next
7. **Bifrost integration**: ADR-031 keeps Bifrost (Go) as Tier-1 router; new Rust backend acts as Tier-2/3 (provider integration, policy, observability)

## 7. Recommended Architecture

```
backend-rust/
  Cargo.toml              # workspace
  crates/
    omniroute-core/       # core types, traits, errors, no I/O
      src/
        provider.rs       # Provider trait
        model.rs          # Model, ModelFamily, ModelCapabilities
        format.rs         # Format enum (OpenAI, Anthropic, Gemini, Cohere, Bedrock, Responses)
        request.rs        # canonical ChatRequest, EmbeddingRequest, etc.
        response.rs       # canonical ChatResponse, StreamChunk
        quota.rs          # Quota, QuotaTracker
        auth.rs           # ApiKey, Scope
        combo.rs          # Combo, ComboResolver
        error.rs          # typed errors
    omniroute-storage/    # sqlx, call_logs, usage_history
      src/
        lib.rs
        schema.rs
        call_logs.rs
        usage.rs
        keys.rs
        combos.rs
        migrations/       # sqlx migrations (port from TS)
    omniroute-providers/  # provider adapter impls
      src/
        lib.rs
        openai.rs
        anthropic.rs
        gemini.rs
        cohere.rs
        bedrock.rs
        responses.rs
        registry.rs       # 231-entry registry
        translate.rs      # format -> format
    omniroute-pipeline/   # streaming, compression, cache
      src/
        stream.rs         # SSE pipeline
        compression.rs    # RTK + Caveman
        cache.rs          # semantic cache
        circuit_breaker.rs
        cooldown.rs
    omniroute-server/     # axum HTTP server
      src/
        main.rs
        routes/
          v1/
            chat.rs
            completions.rs
            embeddings.rs
            models.rs
            responses.rs
            messages.rs
            images.rs
            audio.rs
            music.rs
            videos.rs
            files.rs
            batches.rs
            rerank.rs
            moderations.rs
            search.rs
            web.rs
            relay.rs
            proxies.rs
            accounts.rs
            keys.rs
            combos.rs
            agents.rs
            mcp.rs
            a2a.rs
            quotas.rs
        auth_layer.rs     # apiKeyScope, preflight
        middleware.rs
    omniroute-cli/        # clap-based single binary
      src/
        main.rs
        commands/
          status.rs
          provider.rs
          combo.rs
          usage.rs
          quota.rs
          compression.rs
          mcp.rs
          test_provider.rs
          setup.rs         # setup-gemini, setup-cline, etc.
          configure.rs
          openapi.rs
          contexts.rs
    omniroute-sdk/        # typed Rust client
      src/
        lib.rs
        chat.rs
        embeddings.rs
        stream.rs
    omniroute-ffi/        # C-ABI for UDS/RPC binding (per ADR-032)
      src/
        lib.rs
  docs/
    01-AUDIT.md           # this file
    02-ARCHITECTURE.md    # full spec
    03-PROVIDER-PORT.md   # provider porting guide
    04-COMPRESSION.md     # RTK+Caveman spec
    05-MCP-A2A.md         # MCP/A2A spec
    06-CLI-UX.md          # CLI UX spec
    07-TESTING.md         # test strategy
  migrations/             # sqlx migrations
  .github/
    workflows/
      ci.yml
      contract-tests.yml
  README.md
  CHANGELOG.md
  Cargo.lock
```

## 8. Open Questions

1. **Polyglot binding**: HTTP first, or jump straight to UDS (Unix Domain Socket) per ADR-032?
2. **Provider porting**: top 30 first (YAGNI), or all 231 with thin shims?
3. **Compression**: port RTK+Caveman 1:1, or take this as the chance to redesign?
4. **MCP/A2A**: port in v1, or defer to v2?
5. **Bifrost integration**: keep Bifrost (Go) as Tier-1 router alongside new Rust Tier-2, or replace Bifrost entirely?
6. **Test strategy**: keep TS test suite as gold-spec and run Rust server under TS test harness, or port tests too?
