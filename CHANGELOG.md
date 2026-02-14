# Changelog

All notable changes to OmniRoute are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).

---

## [Unreleased]

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
