# Changelog

All notable changes to OmniRoute are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).

---

## [Unreleased]

---

## [0.5.0] — 2026-02-15

Dashboard refinements, LLM evaluation framework, combo strategies expansion, and UI/UX polish.

### Added

#### Dashboard & UI

- **Shared UI Component Library** — Refactored dashboard with reusable component architecture
- **ModelAvailabilityBadge** — New component showing model availability status per provider
- **Landing Page Retheme** — Visual refresh with updated color palette and modern aesthetic
- **Providers Overview Modal** — Click provider cards to view available models with copy-to-clipboard

#### Combo Strategies

- **Random Strategy** — Random model selection for even distribution
- **Least-Used Strategy** — Routes to the least recently used model using combo metrics
- **Cost-Optimized Strategy** — Leverages pricing infrastructure to route to cheapest available model

#### LLM Evaluations

- **Golden Set Testing** — Built-in evaluation framework with 10 test cases
- **API Key Integration** — EvalsTab now makes real LLM calls through the proxy endpoint
- **Provider Alias Filtering** — Enhanced model filtering with provider-aware aliases
- **4 Match Strategies** — exact, contains, regex, and custom JS function evaluation

#### Phase 5 — Foundation & Security

- **Domain State Persistence** — SQLite-backed persistence for 4 domain modules via `domainState.js`
- **Write-Through Cache** — In-memory Map + SQLite write-through for state survival across restarts
- **Race Condition Fix** — `route.js` `ensureInitialized()` with Promise-based singleton

#### Phase 6 — Architecture Refactoring

- **OAuth Provider Extraction** — `providers.js` (1051 → 144 lines) split into 12 modules
- **Policy Engine** — Centralized request evaluation (`policyEngine.js`)
- **Deterministic Round-Robin** — Persistent counter per combo
- **Telemetry Window Accuracy** — `recordedAt` timestamps with accurate `windowMs` filtering

#### Tests

- 22 new tests: `domain-persistence.test.mjs` (16), `policy-engine.test.mjs` (6)
- Total: **295+ tests passing** (up from 273 in v0.3.0)

### Fixed

- **Proxy decoupling** — `proxy.js` imports `getSettings()` directly from `localDb`
- **Default password** — `.env.example` `INITIAL_PASSWORD` changed to `CHANGEME`
- **Server init error handling** — `server-init.js` uses `console.error` + `process.exit(1)`
- **Chat completions TypeError** — Fixed `ensureInitialized` error in API route
- **Evals Tab** — Fixed case count display and added real LLM call integration
- **Routing Tab** — Removed deprecated random strategy option

---

## [0.3.0] — 2026-02-15

Major release: security hardening, domain layer architecture, pipeline integration, full frontend coverage, and resilience overhaul with circuit breaker, anti-thundering herd, and Resilience UI.

### Added

#### Security Hardening (FASE-01 to FASE-09)

- **FASE-01 to FASE-06** — Core security hardening across authentication, input validation, and access control
- **FASE-07 to FASE-09** — Advanced features including enhanced monitoring, security audit improvements, and operational hardening

#### Domain Layer & Infrastructure

- **Model Availability** — TTL-based cooldown tracking per model (`modelAvailability.js`)
- **Cost Rules** — Per-API-key budget management with daily/monthly limits (`costRules.js`)
- **Fallback Policy** — Declarative fallback chain routing with CRUD API (`fallbackPolicy.js`)
- **Error Codes Catalog** — 24 standardized error codes in 6 categories with `createErrorResponse` helper (`errorCodes.js`)
- **Correlation ID** — AsyncLocalStorage-based `x-request-id` propagation for end-to-end tracing (`requestId.js`)
- **Fetch Timeout** — AbortController wrapper with configurable `FETCH_TIMEOUT_MS` (`fetchTimeout.js`)
- **Combo Resolver** — Priority/round-robin/random/least-used strategies (`comboResolver.js`)
- **Lockout Policy** — Sliding window lockout with force-unlock capability (`lockoutPolicy.js`)
- **Request Telemetry** — 7-phase lifecycle tracking with p50/p95/p99 latency aggregation (`requestTelemetry.js`)

#### Pipeline Wiring (7 Backend Modules)

- **Circuit Breaker** integration into request pipeline for provider resilience
- **Model Availability** wired with TTL cooldowns for per-model health tracking
- **Request Telemetry** lifecycle tracking across 7 phases
- **Cost Rules** budget check and cost recording per request
- **Compliance** audit logging with `noLog` opt-out per API key
- **Fetch Timeout** via `fetchWithTimeout` replacing bare `fetch()` in proxy
- **Request ID** (`X-Request-Id` header) for end-to-end tracing

#### 9 New API Routes

- `/api/cache/stats` — GET cache stats, DELETE flush
- `/api/models/availability` — GET availability report, POST clear cooldown
- `/api/telemetry/summary` — GET p50/p95/p99 latency metrics
- `/api/usage/budget` — GET cost summary, POST set budget per key
- `/api/fallback/chains` — GET/POST/DELETE fallback chain management
- `/api/compliance/audit-log` — GET filterable audit log
- `/api/evals` — GET list suites, POST run suite
- `/api/evals/[suiteId]` — GET suite details
- `/api/policies` — GET circuit breaker + lockout status, POST force-unlock

#### Frontend — 100% Backend API Coverage (7 Batches)

- **Batch 1** — Pipeline wiring integration verified across all backend modules
- **Batch 2** — 9 API routes created for backend module access
- **Batch 3** — 6 shared UI components exported (Breadcrumbs, EmptyState, NotificationToast, FilterBar, ColumnToggle, DataTable) + `notificationStore` wired into layout
- **Batch 4** — Usage page: BudgetTelemetryCards (latency p50/p95/p99, cache, system health); Settings page: ComplianceTab (audit log), CacheStatsCard (prompt cache + flush); Combos page: EmptyState component
- **Batch 5** — Integration-wiring tests: 44 tests across 12 suites verifying all batches
- **Batch 6** — Frontend now covers every backend API surface
- **Batch 7** — Final wiring and verification pass

#### Refactoring & Decomposition

- **usageDb.js** decomposed from 969 → 40 lines into 5 focused modules: `migrations.js`, `usageHistory.js`, `costCalculator.js`, `usageStats.js`, `callLogs.js`
- **handleSingleModelChat** decomposed from 183 → 80 lines with extracted helpers (`handleNoCredentials`, `safeResolveProxy`, `safeLogEvents`)
- **Shared UI primitives** extracted: FilterBar, ColumnToggle, DataTable (3230 total lines)

#### Rate Limit Overhaul (4 Phases)

- **Phase 1** — Provider-specific resilience profiles (OAuth vs API key), exponential backoff (5s→60s), default API limits (100 RPM, 200ms minTime)
- **Phase 2** — Circuit breaker integration in combo pipeline with `canExecute()` checks, early exit when all models are OPEN, semaphore marking for 502/503/504
- **Phase 3** — Anti-thundering herd: mutex on `markAccountUnavailable`, auto rate-limit for API key providers with elevated defaults
- **Phase 4** — Resilience UI tab in settings with 3 cards: ProviderProfilesCard, CircuitBreakerCard (real-time, auto-refresh 5s, reset), RateLimitOverviewCard
- `/api/resilience` — GET (full state) + PATCH (save profiles)
- `/api/resilience/reset` — POST (reset breakers + cooldowns)

#### ADRs & Quality

- **6 Architecture Decision Records**: SQLite, Fallback Strategy, OAuth, JS+JSDoc, Single-Tenant, Translator Registry
- **Accessibility audit** — WCAG AA checker with aria-label, dialog role, alt text, label validation (`a11yAudit.js`)
- **Password Reset CLI** — Interactive admin password reset tool (`bin/reset-password.mjs`)
- **Playwright E2E specs** — Responsive viewport tests (375/768/1280) across 4 pages
- **Eval Framework** — 4 strategies (exact, contains, regex, custom) + 10-case golden set (`evalRunner.js`)
- **Compliance module** — audit_log table, `noLog` opt-out per API key, `LOG_RETENTION_DAYS` cleanup

#### Tests

- **63 new tests** for rate limit overhaul: error-classification, combo-circuit-breaker, thundering-herd
- **44 integration-wiring tests** across 12 suites
- **31 domain layer tests** for model availability, cost rules, error codes, request ID, fetch timeout
- **13 UX/telemetry tests** for error pages, breadcrumbs, empty states, telemetry, domain extraction
- **25 batch-B tests** for ADRs, eval framework, compliance, a11y, CLI, Playwright specs
- Total: **273+ tests passing** (up from ~144 in v0.2.0)

#### Documentation

- **JSDoc** coverage added to all new modules (100% exported functions documented)
- `@ts-check` added to 8 critical files

### Fixed

- **ESLint v10 → v9 downgrade** for `eslint-config-next` compatibility — rewrote flat config, removed `defineConfig`/`globalIgnores` (ESLint 10-only APIs)
- **Unrecoverable refresh token errors** — detect `refresh_token_reused` and similar errors, mark connections as expired requiring re-authentication
- **Record type annotation** added to `getAllFallbackChains` result
- **`.gitignore` cleanup** — added `.analysis/` and `antigravity-manager-analysis/`, whitelisted FASE docs

### Changed

- **Error pages** — Custom 404 and global error boundary with gradient design and dev details
- **Combo page** — Inline empty state replaced with EmptyState component
- **Layout** — Breadcrumbs rendered between Header and content, NotificationToast as global fixed overlay
- **Proxy module** — bare `fetch()` replaced with `fetchWithTimeout` (5s timeout) + `X-Request-Id` header

---

## [0.2.0] — 2026-02-14

Major feature release: advanced routing services, security hardening, cost analytics dashboard, and pricing management overhaul.

### Added

#### Open-SSE Services

- **Account Selector** — intelligent provider account selection with priority and load-balancing strategies (`accountSelector.js`)
- **Context Manager** — request context tracking and lifecycle management (`contextManager.js`)
- **IP Filter** — allowlist/blocklist IP filtering with CIDR support (`ipFilter.js`)
- **Session Manager** — persistent session tracking across requests (`sessionManager.js`)
- **Signature Cache** — request signature caching for deduplication (`signatureCache.js`)
- **System Prompt** — global system prompt injection into all chat completions (`systemPrompt.js`)
- **Thinking Budget** — token budget management for reasoning models (`thinkingBudget.js`)
- **Wildcard Router** — pattern-based model routing with glob matching (`wildcardRouter.js`)
- Enhanced **Rate Limit Manager** with sliding-window algorithm and per-key quotas

#### Dashboard Settings

- **IP Filter** settings tab — configure allowed/blocked IPs from the UI (`IPFilterSection.js`)
- **System Prompt** settings tab — set global system prompt injection (`SystemPromptTab.js`)
- **Thinking Budget** settings tab — configure reasoning token budgets (`ThinkingBudgetTab.js`)
- **Pricing Tab** — full-page redesign with provider-centric organization, inline editing, search/filter, and save/reset per provider (`PricingTab.js`)
- **Rate Limit Status** component on Usage page (`RateLimitStatus.js`)
- **Sessions Tab** on Usage page — view and manage active sessions (`SessionsTab.js`)

#### Usage & Cost Analytics

- **Cost stat card** (amber accent) prominently displayed in analytics top row
- **Provider Cost Donut** — new chart showing cost distribution across providers
- **Daily Cost Trend** — cost line overlay (amber) on token trend chart with secondary Y-axis
- **Model Table Cost column** — sortable cost column in model breakdown table
- Cost-aware tooltip formatting throughout analytics charts

#### Pricing API

- `/api/pricing/models` endpoint — serves merged model catalog from 3 sources: registry, custom models (DB), and pricing-only models
- Custom model badge in pricing page for user-imported models
- `/api/rate-limits` endpoint for rate limit configuration
- `/api/sessions` endpoint for session management
- `/api/settings/ip-filter`, `/api/settings/system-prompt`, `/api/settings/thinking-budget` endpoints

#### Cloudflare Worker

- Cloud worker module for edge deployment (`cloud/`)

#### Tests

- Unit tests for account selector, context manager, IP filter, enhanced rate limiting, session manager, signature cache, system prompt, thinking budget, and wildcard router (9 new test files)

#### Documentation

- OpenAPI specification at `docs/openapi.yaml` covering all 89 API endpoints
- Enhanced `restart.sh` with clean build, health check, graceful shutdown (Ctrl+C), and real-time log tailing
- Updated architecture documentation and codebase docs with new services and API routes
- Model selector with autocomplete in Chat Tester and Test Bench modes

### Fixed

- Server port collision (EADDRINUSE) during restart — now kills port before `next start`
- Icon rendering corrected from `material-symbols-rounded` to `material-symbols-outlined`
- Pricing page only showed hardcoded registry models — now includes custom/imported models

### Changed

- Usage analytics layout reorganized: donuts separated into logical groupings, bottom stats simplified from 6 to 4 cards
- Daily trend chart upgraded from `BarChart` to `ComposedChart` with dual Y-axes
- Routing tab updated with new service integrations

---

## [0.0.1] — 2026-02-13

Initial public release of OmniRoute (rebranded from 9router).

### Added

- **28 AI Providers** — OpenAI, Anthropic, Google Gemini, DeepSeek, Groq, xAI, Mistral, Perplexity, Together AI, Fireworks AI, Cerebras, Cohere, NVIDIA NIM, Nebius, GitHub Copilot, Cursor, Kiro, Kimi, MiniMax, iFlow, and more
- **OpenAI-compatible proxy** at `/api/v1/chat/completions` with automatic format translation, load balancing, and failover
- **Anthropic Messages API** at `/api/v1/messages` for Claude-native clients
- **OpenAI Responses API** at `/api/v1/responses` for modern OpenAI workflows
- **Embeddings API** at `/api/v1/embeddings` with 6 providers and 9 models
- **Image Generation API** at `/api/v1/images/generations` with 4 providers and 9 models
- **Format Translator** — automatic request/response conversion between OpenAI, Anthropic, Gemini, and OpenAI Responses formats
- **Translator Playground** with 4 modes: Playground, Chat Tester, Test Bench, Live Monitor
- **Combo Routing** — named route configurations with priority, weighted, and round-robin strategies
- **API Key Management** — create/revoke keys with usage attribution
- **Usage Dashboard** — analytics, call logs, request logger with API key filtering and cost tracking
- **Provider Health Diagnostics** — structured status (runtime errors, auth failures, token refresh) with per-connection retest
- **CLI Tools Integration** — runtime detection for Cline, Kiro, Droid, OpenClaw with backup/restore
- **OAuth Flows** — for Cursor, Kiro, Kimi, and GitHub Copilot
- **Docker Support** — multi-stage Dockerfile, docker-compose with 3 profiles (base, cli, host), production compose
- **SOCKS5 Proxy** — outbound proxy support enabled by default (`ab8d752`)
- **Unified Storage** — `DATA_DIR` / `XDG_CONFIG_HOME` resolution with auto-migration from `~/.omniroute`
- **In-app Documentation** at `/docs` with quick start, endpoint reference, and client compatibility notes
- **Dark Theme UI** — modern dashboard with glassmorphism, responsive layout
- `<think>` tag parser for reasoning models (DeepSeek, Qwen)
- Non-stream response translation for all formats
- Secure cookie handling for LAN/reverse-proxy deployments

### Fixed

- OAuth re-authentication no longer creates duplicate connections (`773f117`, `510aedd`)
- Connection test no longer corrupts valid OAuth tokens (`a2ba189`)
- Cloud sync disabled to prevent 404 log spam (`71d132e`)
- `.env.example` synced with current environment structure (`6bdc74b`)
- Select dropdown dark theme inconsistency (`1bd734d`)

### Dependencies

- `actions/github-script` bumped from 7 to 8 (`f6a994a`)
- `eslint` bumped from 9.39.2 to 10.0.0 (`ecd4aea`)

---

## Pre-Release History (9router)

> The following entries document the legacy 9router project before it was
> rebranded to OmniRoute. All changes below were included in the initial
> `0.0.1` release.

### 0.2.75 — 2026-02-11

- API key attribution in usage/call logs with per-key analytics aggregates
- Usage dashboard API key observability (distribution donut, filterable table)
- In-app docs page (`/docs`) with quick start, endpoint reference, and client compatibility notes
- Unified storage path policy (`DATA_DIR` → `XDG_CONFIG_HOME` → `~/.omniroute`)
- Build-phase guard for `usageDb` (in-memory during `next build`)
- LAN/reverse-proxy cookie security detection
- Hardened Gemini 3 Flash normalization and non-stream SSE fallback parsing
- CLI tool runtime and OAuth refresh reliability improvements
- Provider health diagnostics with structured error types

### 0.2.74 — 2026-02-11

- Model resolution fallback fix for unprefixed models
- GitHub Copilot dynamic endpoint selection (Codex → `/responses`)
- Non-stream translation path for OpenAI Responses
- Updated GitHub model catalog with compatibility aliases

### 0.2.73 — 2026-02-09

- Expanded provider registry from 18 → 28 providers (DeepSeek, Groq, xAI, Mistral, Perplexity, Together AI, Fireworks AI, Cerebras, Cohere, NVIDIA NIM)
- `/v1/embeddings` endpoint with 6 providers and 9 models
- `/v1/images/generations` endpoint with 4 providers and 9 models
- `<think>` tag parser for reasoning models
- Available Endpoints card on Endpoint page (127 chat, 9 embedding, 9 image models)

### 0.2.72 — 2026-02-08

- Split Kimi into dual providers: `kimi` (OpenAI-compatible) and `kimi-coding` (Moonshot API)
- Hybrid CLI runtime support with Docker profiles (`runner-base`, `runner-cli`)
- Hardened cloud sync/auth flow with SSE fallback

### 0.2.66 — 2026-02-06

- Cursor provider end-to-end support with OAuth import flow
- `requireLogin` control and `hasPassword` state handling
- Usage/quota UX improvements
- Model support for custom providers
- Codex updates (GPT-5.3, thinking levels), Claude Opus 4.6, MiniMax Coding
- Auto-validation for provider API keys

### 0.2.56 — 2026-02-04

- Anthropic-compatible provider support
- Provider icons across dashboard
- Enhanced usage tracking pipeline

### 0.2.52 — 2026-02-02

- Codex Cursor compatibility and Next.js 16 proxy migration
- OpenAI-compatible provider nodes (CRUD/validation/test)
- Token expiration and key-validity checks
- Non-streaming response translation for multiple formats
- Kiro OAuth wiring and token refresh support

### 0.2.43 — 2026-01-27

- Fixed CLI tools model selection
- Fixed Kiro translator request handling

### 0.2.36 — 2026-01-19

- Usage dashboard page
- Outbound proxy support in Open SSE fetch pipeline
- Fixed combo fallback behavior

### 0.2.31 — 2026-01-18

- Fixed Kiro token refresh and executor behavior
- Fixed Kiro request translation handling

### 0.2.27 — 2026-01-15

- Added Kiro provider support with OAuth flow
- Fixed Codex provider behavior

### 0.2.21 — 2026-01-12

- Initial README and project setup
