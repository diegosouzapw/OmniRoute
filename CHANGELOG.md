# Changelog

All notable changes to OmniRoute are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [1.0.6] — 2026-02-20

> ### ✨ Provider & Combo Toggles — Strict Model Filtering
>
> `/v1/models` now shows only models from providers with active connections. Combos and providers can be toggled on/off directly from the dashboard.

### ✨ New Features

- **Provider toggle on Providers page** — Enable/disable all connections for a provider directly from the main Providers list. Toggle is always visible, no hover needed
- **Combo enable/disable toggle** — Each combo on the Combos page now has a toggle. Disabled combos are excluded from `/v1/models`
- **OAuth private IP support** — Expanded localhost detection to include private/LAN IPs (`192.168.x.x`, `10.x.x.x`, `172.16-31.x.x`) for correct OAuth redirect URIs

### 🐛 Bug Fixes

- **`/v1/models` strict filtering** — Models are now shown only from providers with active, enabled connections. Previously, if no connections existed or all were disabled, all 378+ models were shown as a fallback
- **Disabled provider models hidden** — Toggling off a provider immediately removes its models from `/v1/models`

---

## [1.0.5] — 2026-02-20

> ### 🐛 Hotfix — Model Filtering & Docker DATA_DIR
>
> Filters all model types in `/v1/models` by active providers and fixes Docker data directory mismatch.

### 🐛 Bug Fixes

- **`/v1/models` full filtering** — Embedding, image, rerank, audio, and moderation models are now filtered by active provider connections, matching chat model behavior. Providers like Together AI no longer appear without a configured API key (#88)
- **Docker `DATA_DIR`** — Added `ENV DATA_DIR=/app/data` to Dockerfile and `docker-compose.yml` ensuring the volume mount always matches the app data directory — prevents empty database on container recreation

---

## [1.0.4] — 2026-02-19

> ### 🔧 Provider Filtering, OAuth Proxy Fix & Documentation
>
> Dashboard model filtering by active providers, provider enable/disable visual indicators, OAuth login fix for nginx reverse proxy, and LLM onboarding documentation.

### ✨ Features

- **API Models filtering** — `GET /api/models` now returns only models from active providers; use `?all=true` for all models (#85)
- **Provider disabled indicator** — Provider cards show ⏸ "Disabled" badge with reduced opacity when all connections are inactive (#85)
- **`llm.txt`** — Comprehensive LLM onboarding file with project overview, architecture, flows, and conventions (#84)
- **WhatsApp Community** — Added WhatsApp group link to README badges and Support section

### 🐛 Bug Fixes

- **OAuth behind nginx** — Fixed OAuth login failing when behind a reverse proxy by using `window.location.origin` for redirect URI instead of hardcoded `localhost` (#86)
- **`NEXT_PUBLIC_BASE_URL` for OAuth** — Documented env var usage as redirect URI override for proxy deployments (#86)

### 📁 Files Added

| File      | Purpose                                            |
| --------- | -------------------------------------------------- |
| `llm.txt` | LLM and contributor onboarding (llms.txt standard) |

### 📁 Files Modified

| File                                               | Change                                                           |
| -------------------------------------------------- | ---------------------------------------------------------------- |
| `src/app/api/models/route.ts`                      | Filter by active providers, `?all=true` param, `available` field |
| `src/app/(dashboard)/dashboard/providers/page.tsx` | `allDisabled` detection + ⏸ badge + opacity-50 on provider cards |
| `src/shared/components/OAuthModal.tsx`             | Proxy-aware redirect URI using `window.location.origin`          |
| `.env.example`                                     | Documented `NEXT_PUBLIC_BASE_URL` for OAuth behind proxy         |

---

## [1.0.3] — 2026-02-19

> ### 📊 Logs Dashboard & Real-Time Console Viewer
>
> Unified logs interface with real-time console log viewer, file-based logging via console interception, and server initialization improvements.

### ✨ Features

- **Logs Dashboard** — Consolidated 4-tab page at `/dashboard/logs` with Request Logs, Proxy Logs, Audit Logs, and Console tabs
- **Console Log Viewer** — Terminal-style real-time log viewer with color-coded log levels, auto-scroll, search/filtering, level filter, and 5-second polling
- **Console Interceptor** — Monkey-patches `console.log/info/warn/error/debug` at server start to capture all application output as JSON lines to `logs/application/app.log`
- **Log Rotation** — Size-based rotation and retention-based cleanup for log files

### 🔧 Improvements

- **Instrumentation consolidation** — Moved `initAuditLog()`, `cleanupExpiredLogs()`, and console interceptor initialization to Next.js `instrumentation.ts` (runs on both dev and prod server start)
- **Structured Logger file output** — `structuredLogger.ts` now also appends JSON log entries to the log file
- **Pino Logger fix** — Fixed broken mix of pino `transport` targets + manual `createWriteStream`; now uses `pino/file` transport targets exclusively with absolute paths

### 🗂️ Files Added

| File                                                 | Purpose                                                           |
| ---------------------------------------------------- | ----------------------------------------------------------------- |
| `src/app/(dashboard)/dashboard/logs/page.tsx`        | Tabbed Logs Dashboard page                                        |
| `src/app/(dashboard)/dashboard/logs/AuditLogTab.tsx` | Audit log tab component extracted from standalone page            |
| `src/shared/components/ConsoleLogViewer.tsx`         | Terminal-style real-time log viewer                               |
| `src/app/api/logs/console/route.ts`                  | API endpoint to read log file (filters last 1h, level, component) |
| `src/lib/consoleInterceptor.ts`                      | Console method monkey-patching for file capture                   |
| `src/lib/logRotation.ts`                             | Log rotation by size and cleanup by retention days                |

### 🗂️ Files Modified

| File                                    | Change                                                                          |
| --------------------------------------- | ------------------------------------------------------------------------------- |
| `src/shared/components/Sidebar.tsx`     | Nav: "Request Logs" → "Logs" with `description` icon                            |
| `src/shared/components/Breadcrumbs.tsx` | Added breadcrumb labels for `logs`, `audit-log`, `console`                      |
| `src/instrumentation.ts`                | Added console interceptor + audit log init + expired log cleanup                |
| `src/server-init.ts`                    | Added console interceptor import (backup init)                                  |
| `src/shared/utils/logger.ts`            | Fixed pino file transport using `pino/file` targets                             |
| `src/shared/utils/structuredLogger.ts`  | Added `appendFileSync` file writing + log file config                           |
| `.env.example`                          | Added `LOG_TO_FILE`, `LOG_FILE_PATH`, `LOG_MAX_FILE_SIZE`, `LOG_RETENTION_DAYS` |

### ⚙️ Configuration

New environment variables:

| Variable             | Default                    | Description                   |
| -------------------- | -------------------------- | ----------------------------- |
| `LOG_TO_FILE`        | `true`                     | Enable/disable file logging   |
| `LOG_FILE_PATH`      | `logs/application/app.log` | Log file path                 |
| `LOG_MAX_FILE_SIZE`  | `50M`                      | Max file size before rotation |
| `LOG_RETENTION_DAYS` | `7`                        | Days to retain old log files  |

---

## [1.0.2] — 2026-02-18

> ### 🔒 Security Hardening, Architecture Improvements & UX Polish
>
> Comprehensive audit-driven improvements across security, architecture, testing, and user experience.

### 🛡️ Security (Phase 0)

- **Auth guard** — API route protection via `withAuth` middleware for all dashboard routes
- **CSRF protection** — Token-based CSRF guard for all state-changing API routes
- **Request payload validation** — Zod schemas for provider, combo, key, and settings endpoints
- **Prompt injection guard** — Input sanitization against malicious prompt patterns
- **Body size guard** — Route-specific body size limits with dedicated audio upload threshold
- **Rate limiter** — Per-IP rate limiting with configurable windows and thresholds

### 🏗️ Architecture (Phase 1–2)

- **DI container** — Simple dependency injection container for service registration
- **Policy engine** — Consolidated `PolicyEngine` for routing, security, and rate limiting
- **SQLite migration** — Database migration system with versioned migration runner
- **Graceful shutdown** — Clean server shutdown with connection draining
- **TypeScript fixes** — Resolved all `tsc` errors; removed redundant `@ts-check` directives
- **Pipeline decomposition** — `handleSingleModelChat` decomposed into composable pipeline stages
- **Prompt template versioning** — Version-tracked prompt templates with rollback support
- **Eval scheduling** — Automated evaluation suite scheduling with cron-based runner
- **Plugin architecture** — Extensible plugin system for custom middleware and handlers

### 🧪 Testing & CI (Phase 2)

- **Coverage thresholds** — Jest coverage thresholds enforced in CI (368 tests passing)
- **Proxy pipeline integration tests** — End-to-end tests for the proxy request pipeline
- **CI audit workflow** — npm audit and security scanning in GitHub Actions
- **k6 load tests** — Performance testing with ramping VUs and custom metrics

### ✨ UX & Polish (Phase 3–4)

- **Session management** — Session info card with login time, age, user agent, and logout
- **Focus indicators** — Global `:focus-visible` styles and `--focus-ring` CSS utility
- **Audit log viewer** — Security event audit log with structured data display
- **Dashboard cleanup** — Removed unused files, fixed Quick Start links to Endpoint page
- **Documentation** — Troubleshooting guide, deployment improvements

---

## [1.1.0] — 2026-02-18

> ### 🔧 API Compatibility & SDK Hardening
>
> Response sanitization, role normalization, and structured output improvements for strict OpenAI SDK compatibility and cross-provider robustness.

### 🛡️ Response Sanitization (NEW)

- **Response sanitizer module** — New `responseSanitizer.ts` strips non-standard fields (`x_groq`, `usage_breakdown`, `service_tier`, etc.) from all OpenAI-format provider responses, fixing OpenAI Python SDK v1.83+ Pydantic validation failures that returned raw strings instead of parsed `ChatCompletion` objects
- **Streaming chunk sanitization** — Passthrough streaming mode now sanitizes each SSE chunk in real-time via `sanitizeStreamingChunk()`, ensuring strict `chat.completion.chunk` schema compliance
- **ID/Object/Usage normalization** — Ensures `id`, `object`, `created`, `model`, `choices`, and `usage` fields always exist with correct types
- **Usage field cleanup** — Strips non-standard usage sub-fields, keeps only `prompt_tokens`, `completion_tokens`, `total_tokens`, and OpenAI detail fields

### 🧠 Think Tag Extraction (NEW)

- **`<think>` tag extraction** — Automatically extracts `<think>...</think>` blocks from thinking model responses (DeepSeek R1, Kimi K2 Thinking, etc.) into OpenAI's standard `reasoning_content` field
- **Streaming think-tag stripping** — Real-time `<think>` extraction in passthrough SSE stream, preventing JSON parsing errors in downstream tools
- **Preserves native reasoning** — Providers that already send `reasoning_content` natively (e.g., OpenAI o1) are not overwritten

### 🔄 Role Normalization (NEW)

- **`developer` → `system` conversion** — OpenAI's new `developer` role is automatically converted to `system` for all non-OpenAI providers (Claude, Gemini, Kiro, etc.)
- **`system` → `user` merging** — For models that reject the `system` role (GLM, ERNIE), system messages are intelligently merged into the first user message with clear delimiters
- **Model-aware normalization** — Uses model name prefix matching (`glm-*`, `ernie-*`) for compatibility decisions, avoiding hardcoded provider-level flags

### 📐 Structured Output for Gemini (NEW)

- **`response_format` → Gemini conversion** — OpenAI's `json_schema` structured output is now translated to Gemini's `responseMimeType` + `responseSchema` in the translator pipeline
- **`json_object` support** — `response_format: { type: "json_object" }` maps to Gemini's `application/json` MIME type
- **Schema cleanup** — Automatically removes unsupported JSON Schema keywords (`$schema`, `additionalProperties`) for Gemini compatibility

### 📁 Files Added

| File                                     | Purpose                                                                |
| ---------------------------------------- | ---------------------------------------------------------------------- |
| `open-sse/handlers/responseSanitizer.ts` | Response field stripping, think-tag extraction, ID/usage normalization |
| `open-sse/services/roleNormalizer.ts`    | Developer→system, system→user role conversion pipeline                 |

### 📁 Files Modified

| File                                              | Change                                                                          |
| ------------------------------------------------- | ------------------------------------------------------------------------------- |
| `open-sse/handlers/chatCore.ts`                   | Integrated response sanitizer for non-streaming OpenAI responses                |
| `open-sse/utils/stream.ts`                        | Integrated streaming chunk sanitizer + think-tag extraction in passthrough mode |
| `open-sse/translator/index.ts`                    | Integrated role normalizer into the request translation pipeline                |
| `open-sse/translator/request/openai-to-gemini.ts` | Added `response_format` → `responseMimeType`/`responseSchema` conversion        |

---

## [1.0.0] — 2026-02-18

> ### 🎉 First Major Release — OmniRoute 1.0
>
> OmniRoute is an intelligent API gateway that unifies 20+ AI providers behind a single OpenAI-compatible endpoint. This release represents the culmination of the entire development effort — from initial prototype to production-ready platform.

### 🧠 Core Routing & Intelligence

- **Smart 4-tier fallback** — Auto-routing: Subscription → Cheap → Free → Emergency
- **6 routing strategies** — Fill First, Round Robin, Power-of-Two-Choices, Random, Least Used, Cost Optimized
- **Semantic caching** — Auto-cache responses for deduplication with configurable TTL
- **Request idempotency** — Prevent duplicate processing of identical requests
- **Thinking budget validation** — Control reasoning token allocation per request
- **System prompt injection** — Configurable global system prompts for all requests

### 🔌 Providers & Models

- **20+ AI providers** — OpenAI, Claude (Anthropic), Gemini, GitHub Copilot, DeepSeek, Groq, xAI, Mistral, Qwen, iFlow, Kiro, OpenRouter, GLM, MiniMax, Kimi, NVIDIA NIM, and more
- **Multi-account support** — Multiple accounts per provider with automatic rotation
- **OAuth 2.0 (PKCE)** — Automatic token management and refresh for Claude Code, Codex, Gemini CLI, Copilot, Kiro
- **Auto token refresh** — Background refresh with expiry detection and unrecoverable error handling
- **Model import** — Import models from API-compatible passthrough providers
- **OpenAI-compatible validation** — Fallback validation via chat completions for providers without `/models` endpoint
- **TLS fingerprint spoofing** — Browser-like TLS fingerprinting via `wreq-js` to bypass bot detection

### 🔄 Format Translation

- **Multi-format translation** — Seamless OpenAI ↔ Claude ↔ Gemini ↔ OpenAI Responses API conversion
- **Translator Playground** — 4 interactive modes:
  - **Playground** — Test format translations between any provider formats
  - **Chat Tester** — Send real requests through the proxy with visual response rendering
  - **Test Bench** — Automated batch testing across multiple providers
  - **Live Monitor** — Real-time stream of active proxy requests and translations

### 🎯 Combos & Fallback Chains

- **Custom combos** — Create model combinations with multi-provider fallback chains
- **6 combo balancing strategies** — Fill First, Round Robin, Random, Least Used, P2C, Cost Optimized
- **Combo circuit breaker** — Auto-disable failing providers within a combo chain

### 🛡️ Resilience & Security

- **Circuit breakers** — Auto-recovery with configurable thresholds and cooldown periods
- **Exponential backoff** — Progressive retry delays for failed requests
- **Anti-thundering herd** — Mutex-based protection against concurrent retry storms
- **Rate limit detection** — Per-provider RPM, min gap, and max concurrent request tracking
- **Editable rate limits** — Configurable defaults via Settings → Resilience with persistence
- **Prompt injection guard** — Input sanitization for malicious prompt patterns
- **PII redaction** — Automatic detection and masking of personally identifiable information
- **AES-256-GCM encryption** — Credential encryption at rest
- **IP access control** — Whitelist/blacklist IP filtering
- **SOCKS5 proxy support** — Outbound proxy for upstream provider calls

### 📊 Observability & Analytics

- **Analytics dashboard** — Recharts-based SVG charts: stat cards, model usage bar chart, provider breakdown table with success rates and latency
- **Real-time health monitoring** — Provider health, rate limits, latency telemetry
- **Request logs** — Dedicated page with SQLite-persisted proxy request/response logs
- **Limits & Quotas** — Separate dashboard for quota monitoring with reset countdowns
- **Cost analytics** — Token cost tracking and budget management per provider
- **Request telemetry** — Correlation IDs, structured logging, request timing

### 💾 Database & Backup

- **Dual database** — LowDB (JSON) for config + SQLite for domain state and proxy logs
- **Export database** — `GET /api/db-backups/export` — Download SQLite database file
- **Export all** — `GET /api/db-backups/exportAll` — Full backup as `.tar.gz` archive (DB + settings + combos + providers + masked API keys)
- **Import database** — `POST /api/db-backups/import` — Upload and restore with validation, integrity check, and pre-import backup
- **Automatic backups** — Configurable backup schedule with retention
- **Storage health** — Dashboard widget with database size, path, and backup status

### 🖥️ Dashboard & UI

- **Full dashboard** — Provider management, analytics, health monitoring, settings, CLI tools
- **9 dashboard sections** — Providers, Combos, Analytics, Health, Translator, Settings, CLI Tools, Usage, Endpoint
- **Settings restructure** — 6 tabs: Security, Routing, Resilience, AI, System/Storage, Advanced
- **Shared UI component library** — Reusable components (Avatar, Badge, Button, Card, DataTable, Modal, etc.)
- **Dark/Light/System theme** — Persistent theme selection with system preference detection
- **Agent showcase grid** — Visual grid of 10 AI coding agents in README header
- **Provider logos** — Logo assets for all supported agents and providers
- **Red shield badges** — Styled badge icons across all documentation

### ☁️ Deployment & Infrastructure

- **Docker support** — Multi-stage Dockerfile with `base` and `cli` profiles
- **Docker Hub** — `diegosouzapw/omniroute` with `latest` and versioned tags
- **Docker CI/CD** — GitHub Actions auto-build and push on release
- **npm CLI package** — `npx omniroute` with auto-launch
- **npm CI/CD** — GitHub Actions auto-publish to npm on release
- **Akamai VM deployment** — Production deployment on Nanode 1GB with nginx reverse proxy
- **Cloud sync** — Sync configuration across devices via Cloudflare Worker
- **Edge compatibility** — Native `crypto.randomUUID()` for Cloudflare Workers

### 🧪 Testing & Quality

- **100% TypeScript** — Full migration of `src/` (200+ files) and `open-sse/` (94 files) — zero `@ts-ignore`, zero TypeScript errors
- **CI/CD pipeline** — GitHub Actions for lint, build, test, npm publish, Docker publish
- **Unit tests** — 20+ test suites covering domain logic, security, caching, routing
- **E2E tests** — Playwright specs for API, navigation, and responsive behavior
- **LLM evaluations** — Golden set testing framework with 4 match strategies (`exact`, `contains`, `regex`, `custom`)
- **Security tests** — CLI runtime, Docker hardening, cloud sync, and OpenAI compatibility

### 📖 Documentation

- **8 language READMEs** — English, Portuguese (pt-BR), Spanish, Russian, Chinese (zh-CN), German, French, Italian
- **VM Deployment Guide** — Complete guide (VM + Docker + nginx + Cloudflare + security)
- **Features Gallery** — 9 dashboard screenshots with descriptions
- **API Reference** — Full endpoint documentation including backup/export/import
- **User Guide** — Step-by-step setup, configuration, and usage instructions
- **Architecture docs** — System design, component decomposition, ADRs
- **OpenAPI specification** — Machine-readable API documentation
- **Troubleshooting guide** — Common issues and solutions
- **Security policy** — `SECURITY.md` with vulnerability reporting via GitHub Security Advisories
- **Roadmap** — 150+ planned features across 6 categories

### 🔌 API Endpoints

- `/v1/chat/completions` — OpenAI-compatible chat endpoint with format translation
- `/v1/embeddings` — Embedding generation
- `/v1/images/generations` — Image generation
- `/v1/models` — Model listing with provider filtering
- `/v1/rerank` — Re-ranking endpoint
- `/v1/audio/*` — Audio transcription and translation
- `/v1/moderations` — Content moderation
- `/api/db-backups/export` — Database export
- `/api/db-backups/exportAll` — Full archive export
- `/api/db-backups/import` — Database import with validation
- 30+ dashboard API routes for providers, combos, settings, analytics, health, CLI tools

---

[1.0.6]: https://github.com/diegosouzapw/OmniRoute/releases/tag/v1.0.6
[1.0.5]: https://github.com/diegosouzapw/OmniRoute/releases/tag/v1.0.5
[1.0.4]: https://github.com/diegosouzapw/OmniRoute/releases/tag/v1.0.4
[1.1.0]: https://github.com/diegosouzapw/OmniRoute/releases/tag/v1.1.0
[1.0.3]: https://github.com/diegosouzapw/OmniRoute/releases/tag/v1.0.3
[1.0.2]: https://github.com/diegosouzapw/OmniRoute/releases/tag/v1.0.2
[1.0.0]: https://github.com/diegosouzapw/OmniRoute/releases/tag/v1.0.0
