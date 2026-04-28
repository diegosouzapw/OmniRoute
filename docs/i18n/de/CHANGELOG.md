# Changelog (Deutsch)

🌐 **Languages:** 🇺🇸 [English](../../../CHANGELOG.md) · 🇸🇦 [ar](../ar/CHANGELOG.md) · 🇧🇬 [bg](../bg/CHANGELOG.md) · 🇧🇩 [bn](../bn/CHANGELOG.md) · 🇨🇿 [cs](../cs/CHANGELOG.md) · 🇩🇰 [da](../da/CHANGELOG.md) · 🇩🇪 [de](../de/CHANGELOG.md) · 🇪🇸 [es](../es/CHANGELOG.md) · 🇮🇷 [fa](../fa/CHANGELOG.md) · 🇫🇮 [fi](../fi/CHANGELOG.md) · 🇫🇷 [fr](../fr/CHANGELOG.md) · 🇮🇳 [gu](../gu/CHANGELOG.md) · 🇮🇱 [he](../he/CHANGELOG.md) · 🇮🇳 [hi](../hi/CHANGELOG.md) · 🇭🇺 [hu](../hu/CHANGELOG.md) · 🇮🇩 [id](../id/CHANGELOG.md) · 🇮🇹 [it](../it/CHANGELOG.md) · 🇯🇵 [ja](../ja/CHANGELOG.md) · 🇰🇷 [ko](../ko/CHANGELOG.md) · 🇮🇳 [mr](../mr/CHANGELOG.md) · 🇲🇾 [ms](../ms/CHANGELOG.md) · 🇳🇱 [nl](../nl/CHANGELOG.md) · 🇳🇴 [no](../no/CHANGELOG.md) · 🇵🇭 [phi](../phi/CHANGELOG.md) · 🇵🇱 [pl](../pl/CHANGELOG.md) · 🇵🇹 [pt](../pt/CHANGELOG.md) · 🇧🇷 [pt-BR](../pt-BR/CHANGELOG.md) · 🇷🇴 [ro](../ro/CHANGELOG.md) · 🇷🇺 [ru](../ru/CHANGELOG.md) · 🇸🇰 [sk](../sk/CHANGELOG.md) · 🇸🇪 [sv](../sv/CHANGELOG.md) · 🇰🇪 [sw](../sw/CHANGELOG.md) · 🇮🇳 [ta](../ta/CHANGELOG.md) · 🇮🇳 [te](../te/CHANGELOG.md) · 🇹🇭 [th](../th/CHANGELOG.md) · 🇹🇷 [tr](../tr/CHANGELOG.md) · 🇺🇦 [uk-UA](../uk-UA/CHANGELOG.md) · 🇵🇰 [ur](../ur/CHANGELOG.md) · 🇻🇳 [vi](../vi/CHANGELOG.md) · 🇨🇳 [zh-CN](../zh-CN/CHANGELOG.md)

---


## [Unreleased]

---

## [3.7.2] — 2026-04-27

### ✨ New Features

- **feat(authz):** introduce centralized proxy-based authz pipeline and lifecycle policy (#1632)
- **feat(logs):** configure call log pipeline artifacts (#1650)
- **feat(network):** add guarded remote image fetch utility
- **feat(codex):** enable native Codex websocket responses on beta-gated models (#1658)
- **feat(muse-spark-web):** continue the same meta.ai conversation across turns (#1673)

### 🐛 Bug Fixes

- **fix(responses):** sanitize empty string placeholders from tool-call optional arguments in stream delta accumulation to avoid breaking strict clients (#1674)
- **fix(codex):** prevent unexpected protocol leakage and fabricated instructions on bare chat completion requests without tools (#1686)
- **fix(executors):** truncate tools array to 128 items max in GitHub Copilot and OpenCode executors to mitigate 400 Bad Request errors from upstream (#1687)
- **fix:** add body-read timeout to prevent stuck pending requests (#1680)
- **fix(rate-limit):** replace unsupported Bottleneck `maxWait` option with job-level `expiration` to prevent indefinite queue stalls (#1694)
- **fix(sse):** sanitize OpenAI tool schemas for strict upstream validators — strips null from enum arrays, normalizes tuple items, filters invalid required keys (#1692)
- **fix(stream):** fail zombie SSE streams before accepting response — returns 504 instead of hanging indefinitely, enables combo fallback (#1693)
- **fix(combo):** complete context truncation hotfix — cache getCombos() with 10s TTL, pass allCombosData to resolveComboTargets() for nested combo resolution, consolidate duplicated context overflow regex patterns (#1685)
- **fix(codex):** raise default quota threshold from 90% to 99% to avoid premature account blocking when usable quota remains (#1697)
- **fix(combo):** trigger fallback on Anthropic `Invalid signature in thinking block` errors instead of returning 400 directly (#1696)
- **fix:** combo retry loop stops immediately on client disconnect (499) (#1681)
- **fix(search):** support optional bearer auth for SearXNG (#1683)
- **fix(vision):** respect native GPT vision support — prevents VisionBridge from intercepting models that already handle images natively (#1678)
- **fix(qwen):** use `security.auth` format instead of `modelProviders` for Qwen Code config generation (#1677)
- **fix(codex):** remove stale websocket transport lookup that caused fallback errors (#1676)
- **fix(chatgpt-web):** bound tls-client native deadlocks so requests never hang forever (#1664)
- **fix(codex):** default gpt-5.5 to HTTP transport instead of WebSocket (#1660)
- **fix(codex):** [urgent] fix gpt-5.5 websocket transport and model labels (#1656)
- **fix(grokweb):** update Request and Response Specifications (#1655)
- **fix(blackbox-web):** set isPremium flag to true to enable premium model access (#1661)
- **fix(core):** avoid OpenAI stream options for Anthropic-compatible providers (#1654)
- **fix(electron):** resolve MCP server start failure on Windows (#1662)
- **fix(electron):** make Windows smoke test non-blocking (continue-on-error), pre-create userData dir for Windows + stream logs in CI, and add --no-sandbox and sandbox env for CI smoke tests
- **fix(codex):** fix `getWreqWebsocket` ReferenceError causing 502 on all Codex requests (#1652, #1653)
- **fix(codex):** default `store` to `false` — Codex OAuth backend rejects `store=true` (#1635)
- **fix(db):** add post-migration guards for missing `batches` table and `combos.sort_order` column on DB upgrades (#1648, #1657)
- **fix(db):** renumber duplicate migration `032` to prevent collision
- **fix(perplexity-web):** update API version and user-agent to match upstream requirements (#1666)
- **fix(docker):** copy SQLite migration files and explicitly trace in standalone build (#1665)
- **fix(muse-spark-web):** update to Meta's Ecto-era persisted query — fixes 502 `Unknown type "RewriteOptionsInput"` after Meta retired the Abra mutation (#1668)
- **fix(dev):** enable Turbopack by default and repair Codex CORS headers (#1669)
- **fix(authz):** restore `REQUIRE_API_KEY` support in clientApi policy
- **fix(auth):** align fallback API key format with test setup

### 🛠️ Maintenance

- **build(prepublish):** make Next.js build bundler configurable (webpack/turbopack)
- **ci:** align sonar analysis scope
- **ci:** stabilize release branch checks
- **ci:** remove expired advanced security scans job

### 🧪 Tests

- **test:** fix TypeScript configuration errors in plan3-p0.test.ts
- **test:** fix implicit any types across test suites
- **test:** disable type checking in flaky unit tests
- **test:** fix failing tests due to recent refactors
- **fix(tests):** align integration tests with authz pipeline refactor
- **fix(tests):** align test assertions with v3.7.2 source code changes
- **fix(tests):** CORS test now checks object body instead of entire file
- **fix(e2e):** fix E2E flakiness and implicit any type errors

---

## [3.7.1] — 2026-04-26

### ✨ New Features

- **feat(providers):** Add GPT-5.5 support to the Codex provider — includes 1.05M context window, tool calling, vision, and reasoning capabilities with proper pricing entries across `cx` and `openai` providers. Refactors `splitCodexReasoningSuffix()` into a shared helper for cleaner effort-level parsing (#1617 — thanks @Zhaba1337228).
- **feat(cli):** Add `omniroute reset-encrypted-columns` recovery command — nulls encrypted credential columns (`api_key`, `access_token`, `refresh_token`, `id_token`) in `provider_connections` while preserving provider metadata, giving users affected by #1622 a clean recovery path without losing configurations.
- **feat(i18n):** Expand locale coverage with nine new language packs (Bengali, Farsi, Gujarati, Indonesian, Marathi, Swahili, Tamil, Telugu, Urdu), bringing total language support from 32 to 41 locales.

### 🐛 Bug Fixes

- **fix(rate-limit):** Add per-model rate limiting for GitHub Copilot provider — a 429 on one model (e.g. `gpt-5.1-codex-max`) no longer locks the entire connection, matching the existing Gemini per-model quota pattern (#1624 — thanks @slewis3600).
- **fix(cli-tools):** Preserve existing OpenCode configuration (MCP servers, custom providers, comments) when saving OmniRoute settings — uses `jsonc-parser` for tree-preserving edits instead of destructive JSON roundtrip. Fix API key clipboard copy to use raw keys instead of masked placeholders. Add theme-aware OpenCode light/dark SVG logos (#1626 — thanks @JasonLandbridge).
- **fix(cli-tools):** Fix OpenCode guide step 3 `{{baseUrl}}` double-brace placeholder to use ICU-style `{baseUrl}` across all 41 locales, restoring next-intl interpolation (#1626).
- **fix(codex):** Make `wreq-js` native module import lazy and optional to prevent server crash on startup when the platform-specific binary is missing — affects pnpm installs, Docker Alpine, macOS ARM, and Windows (#1612, #1613, #1616).
- **fix(i18n):** Add 14 missing translation keys (`logs.runningRequests`, `logs.model`, `logs.provider`, `logs.account`, `logs.elapsed`, `logs.count`, `logs.payloads`, etc.) for the Active Requests panel across all locales. Replace 83 placeholder values in usage/evals namespace. Add 5 missing health namespace keys for rate limit status.
- **fix(encryption):** Prevent `STORAGE_ENCRYPTION_KEY` from being silently regenerated during `npm install -g` upgrades, which made all previously-encrypted provider credentials permanently unrecoverable due to AES-GCM auth-tag mismatch (#1622).
- **fix(startup):** Add decrypt-probe diagnostic at server bootstrap — if `STORAGE_ENCRYPTION_KEY` doesn't match encrypted credentials in the database, a prominent warning is logged directing users to restore the key or use the new recovery command.
- **fix(cli-tools):** Allow `null` API key values in `cliModelConfigSchema` to prevent 400 Bad Request errors when saving cloud-based CLI tool configurations. Fix error handling across all 10 ToolCard components to safely extract messages from structured error objects, preventing React Error #31 crashes.
- **fix(docker):** Set `NPM_CONFIG_LEGACY_PEER_DEPS=true` in the Docker builder layer before `npm ci` and remove duplicate `postinstallSupport.mjs` COPY instruction — fixes container image build failures introduced in v3.7.0 (#1630 — thanks @rdself).
- **fix(antigravity):** Hide deprecated Gemini-routed Claude 4.5 models from public catalogs and model lists. Legacy `gemini-claude-*` aliases now silently resolve to current Claude 4.6 equivalents. Replace dynamic reverse-alias generation with an explicit allowlist for predictable model visibility (#1631 — thanks @backryun).
- **fix(types):** Add explicit type annotations to sync-env test helpers and dynamic import casts to satisfy `typecheck:noimplicit:core` CI gate.
- **fix(reasoning):** Implement Reasoning Replay Cache — hybrid memory/SQLite persistence for `reasoning_content` in multi-turn tool-calling flows. Automatically captures reasoning from DeepSeek V4, Kimi K2, Qwen-Thinking, and GLM models and re-injects it on follow-up turns to prevent HTTP 400 errors from strict reasoning-content validation. Includes dashboard telemetry tab, REST API, and 21 unit tests (#1628 — thanks @JasonLandbridge).
- **fix(postinstall):** Extend postinstall native module repair to cover `wreq-js` — detects missing platform-specific `.node` binaries inside `app/node_modules/wreq-js/rust/` and copies them from the root install. Fixes global `pnpm` installs on macOS arm64 where the standalone app directory only contained Linux binaries (#1634 — thanks @MarcosT96).
- **fix(migration):** Prevent compat-renamed migration slots from shadowing new migrations at the same version number. After rewriting `028_provider_connection_max_concurrent` → `029`, the runner now verifies the old version slot is clear, ensuring `028_create_files_and_batches` runs on v3.6.x → v3.7.x upgrades. Adds `batches` table as a physical schema sentinel for upgrade recovery (#1637 — thanks @V8-Software).
- **fix(registry):** Route GitHub Copilot GPT 5.4/5.5 models through the Responses API (`targetFormat: "openai-responses"`). Fixes `gpt-5.4-mini` and `gpt-5.4` being rejected on `/chat/completions` by GitHub (#1641 — thanks @dhaern).
- **fix(usage):** Correct MiniMax token plan quota display — the newer `/v1/token_plan/remains` endpoint reports used counts, not remaining counts. Rounds floating-point percentage artifacts in Provider Limits UI (#1642 — thanks @CruxExperts).
- **fix(codex):** Lazy-load `wreq-js` WebSocket transport via `createRequire` instead of top-level import. Server boots cleanly when native module is unavailable and returns 503 only when Codex WebSocket is actually requested. Fixes #1612 (#1640 — thanks @dendyadinirwana).
- **fix(electron):** Package Electron runtime dependencies into `resources/app/node_modules/` via separate `extraResources` FileSet. Adds cross-platform packaged app smoke test script and CI integration to prevent future regressions. Closes #1636 (#1639 — thanks @prateek).
- **feat(account-fallback):** Add model-level daily quota lockout. When a provider returns 429 with `quota_exhausted`, cooldown is set to tomorrow 00:00 instead of exponential backoff. Detects daily quota patterns via `isDailyQuotaExhausted()` in chat handler (#1644 — thanks @clousky2020).
- **fix(codex):** Use per-conversation `session_id`/`conversation_id` from client body as `prompt_cache_key` instead of account-wide `workspaceId`. The official Codex CLI uses `conversation_id` (a unique UUID per session); using the shared `workspaceId` capped cache hit-rate at ~49%. Includes 10 unit tests (#1643).
- **fix(claude):** Stabilize billing header fingerprint to prevent Anthropic prompt-cache prefix invalidation. The fingerprint was derived from the first user message text, which changes every turn, mutating `system[]` and forcing ~100% `cache_create`. Now uses a stable per-day hash, preserving ~96% `cache_read` hit rate (#1638).
- **fix(transport):** Harden GitHub and Kiro streaming — thread `clientHeaders` through `BaseExecutor.buildHeaders()` to eliminate mutable singleton state race condition on concurrent requests. Remove redundant `[DONE]` stripping TransformStream from GitHub executor. Add defensive `parseToolInput()` for malformed Kiro tool call arguments. Hoist `TextEncoder`/`TextDecoder` to module singletons and use zero-copy `subarray()` (#1645 — thanks @dhaern).
- **fix(transport):** Prevent memory bloat and database exhaustion from large, fragmented streaming responses. Implemented `ByteQueue` in `kiro.ts` for zero-copy binary accumulation, refactored `antigravity.ts` for incremental SSE parsing, and enforced a strict 512KB tiered truncation limit (`MAX_CALL_LOG_ARTIFACT_BYTES`) on stream request logs and call artifacts (#1647).
- **chore(ci):** Update build environment dependencies — bump Node to `24.15.0`, `actions/checkout@v6`, `docker/build-push-action@v7`, pin `actions/setup-python` to major tag (#1646 — thanks @backryun).

### Dokumentation

- **docs(env):** Add `OMNIROUTE_ALLOW_PRIVATE_PROVIDER_URLS` to `.env.example` with documentation for LM Studio and other local provider use cases (#1623).

---

## [3.7.0] — 2026-04-26

### ✨ New Features

- **feat(providers):** Implement Image Generation and Editing capabilities for ChatGPT Web, including in-band chat image generation and caching (#1606).
- **feat(ui):** Integrate OpenCode Zen/Go API tool logo SVG and polish API key copy-to-clipboard interactions (#1607).
- **feat(providers):** Add CrofAI as a built-in API-key provider with quota/usage monitoring wired into the dashboard Limits page (#1604, #1606).
- **feat(skills):** Add workspace-scoped built-in skills (`file_read`, `file_write`, `http_request`, `eval_code`, `execute_command`) with real sandbox execution via Docker, replacing stub responses. Browser skills now fail explicitly when runtime is not configured.

- **feat(providers):** Integrate AgentRouter as a new OpenAI-compatible passthrough provider with $200 free credits via sign-up (Issue #1572).
- **feat(ui):** Implement on-demand per-model testing in the provider dashboard, allowing single-token diagnostic checks without triggering rate-limits (Issue #1532).

- **feat(provider):** add ChatGPT Web (Plus/Pro) session provider (#1593)
- **feat(provider):** add Baidu Qianfan chat provider (#1582)
- **feat(codex):** support GPT-5.5 responses websocket (#1573)
- **feat(sse):** Codex CLI image_generation + DALL-E-style image route (#1544)
- **feat(dashboard):** Complete the reconciled v3.7.0 dashboard task set: MCP cache tools and count, video endpoint visibility, provider taxonomy, upstream proxy visibility, provider count badges, costs overview, eval suite management, Custom CLI builder, ACP-focused Agents copy, Translator stream transformer, logs convergence, learned rate-limit health cards, docs expansion, and active request payload inspection.
- **feat(mcp):** Register `omniroute_cache_stats` and `omniroute_cache_flush` across MCP schemas, server registration, handlers, docs, and tests.
- **feat(providers):** Complete the v3.7.0 provider onboarding wave with self-hosted/local providers (`lm-studio`, `vllm`, `lemonade`, `llamafile`, `triton`, `docker-model-runner`, `xinference`, `oobabooga`), OpenAI-compatible gateways (`glhf`, `cablyai`, `thebai`, `fenayai`, `empower`, `poe`), enterprise providers (`datarobot`, `azure-openai`, `azure-ai`, `bedrock`, `watsonx`, `oci`, `sap`), specialty providers (`clarifai`, `modal`, `reka`, `nous-research`, `nlpcloud`, `petals`, `vertex-partner`), `amazon-q`, GitLab/GitLab Duo, and Chutes.ai.
- **feat(providers):** Add Cloudflare Workers AI integration and UI support for robust backend execution.
- **feat(telemetry):** Implement proactive public IP capture from client headers (`x-forwarded-for`, `x-real-ip`, etc.) within `safeLogEvents` for accurate database observability.
- **feat(audio):** Add AWS Polly as an audio speech provider with SigV4 request signing, static engine catalog, provider validation, managed-provider UI coverage, and sanitization for AWS secret/session fields.
- **feat(search):** Add You.com search provider support with dashboard discovery, validation, livecrawl option handling, and search handler normalization.
- **feat(video):** Add RunwayML task-based video generation support, task polling, provider catalog metadata, validation, and dashboard/model-list coverage.
- **feat(providers):** Add search functionality to the providers dashboard with i18n support. (#1511 — thanks @th-ch)
- **feat(providers):** Register 6 new models in the opencode-go provider catalog. (#1510 — thanks @kang-heewon)
- **feat(providers):** Add ModelScope provider (Chinese AI marketplace) with Kimi K2.5, GLM-5, and Step-3.5-Flash integration. (#1430 — thanks @clousky2020)
- **feat(providers):** Add LM Studio as an OpenAI-compatible local provider for self-hosted model inference.
- **feat(providers):** Add Grok 4.3 thinking model support for xAI web executor requests.
- **feat(core):** Implement provider-level Circuit Breaker to prevent cascading failures across connections, enforcing a 10-minute cooldown after 5 consecutive transient failures. (#1430)
- **feat(core):** Add daily quota exhaustion lock to detect "quota exceeded" signals and lock the specific model until midnight. (#1430)
- **feat(core):** Auto-inject `stream_options.include_usage = true` for OpenAI format streams to guarantee token usage is reported correctly during streaming. (#1423)
- **feat(core):** Add OpenAI Batch Processing API support — submit, monitor, and manage batch jobs through the proxy with full lifecycle tracking.
- **feat(vision-bridge):** Add automatic image description fallback for non-vision models via `VisionBridgeGuardrail` (priority 5). Intercepts image-bearing requests to non-vision models, extracts descriptions via a configurable vision model (default: gpt-4o-mini), and replaces images with text before forwarding. Fails open on any error. (#1476)
- **feat(dashboard):** Introduce real-time model status badges with countdown timers in the provider detail and combo panel interfaces. (#1430)
- **feat(dashboard):** Add Batch/File management data grid with full i18n translations for batch processing workflows. (#1479)
- **feat(usage):** MiniMax + MiniMax-CN quota tracking in provider limits dashboard. (#1516)
- **feat(providers):** Fix OpenRouter remote discovery and unify managed model sync. (#1521)
- **feat(providers):** Implement provider and account-level concurrency cap enforcement (`maxConcurrent`) using robust semaphore mechanisms. (#1524)
- **feat(core):** Implement Hermes CLI config generation and message content stripping. (#1475)
- **feat(combos):** Add expert combo configuration mode for advanced routing controls. (#1547)
- **feat(providers):** Register Codex auto review and expand icon coverage.
- **feat(tunnels):** Add Tailscale tunnel management routes and runtime helpers for install, login, daemon start, enable/disable, and health checks.

### 🐛 Bug Fixes

- **fix(mitm):** Compile MITM utilities as NodeNext ESM during prepublish, copy the CommonJS MITM server into the standalone artifact, and resolve MITM data paths without relying on Next.js aliases in packaged runtime.
- **fix(build):** Move the local `.tmp/wine32` Wine prefix out of the isolated Next.js build path so Windows Electron packaging artifacts cannot trigger `EACCES` scans during Node 24 builds.
- **fix(build):** Copy the `wreq-js` native runtime directory into the isolated Next.js standalone output so packaged Playwright/E2E starts can load the instrumentation hook on Linux.
- **fix(api):** Validate the Codex Responses websocket bridge and `/v1/batches` JSON payloads with Zod before use, keeping `request.json()` route validation green and returning explicit 400 responses for invalid bodies.
- **fix(providers):** Add explicit typing to provider alias and category helpers so the strict `typecheck:noimplicit:core` CI gate passes.
- **fix(ui):** Keep the upstream proxy provider detail page labeled with a fallback "Managed via Upstream Proxy Settings" management surface when translations are unavailable.
- **fix(electron):** Harden the production desktop CSP by removing `unsafe-eval` outside development and adding object, base URI, form action, frame ancestor, and worker restrictions.
- **fix(cli):** Replace shell-interpolated setup and privileged command execution paths with argument-based `spawn`/`execFile` helpers for database setup, Tailscale sudo commands, MITM DNS edits, and certificate install/uninstall flows.
- **fix(ui):** Keep provider icons resilient by using direct `@lobehub/icons` components first, then local PNG/SVG fallbacks, avoiding the `@lobehub/ui` peer runtime in the dashboard.

- **fix(chatgpt-web):** Fix empty-file race in `tlsFetchStreaming` where `waitForFile` accepted zero-byte files, silently degrading streaming requests to buffered mode. Replaced with `waitForContent` requiring `file.size > 0` with early exit on request settlement. (#1597 — thanks @trader-payne)
- **fix(chatgpt-web):** Fix stale NextAuth session-token cookies surviving rotation shape changes (unchunked↔chunked). `mergeRefreshedCookie` now drops all session-token family members via `SESSION_TOKEN_FAMILY_RE` before appending the refreshed set, preventing auth failures from dual cookie submission. (#1597 — thanks @trader-payne)
- **fix(codex):** WebSocket memory retention and weekly limit handling (#1581)
- **fix(providers):** Default models list logic (#1577)
- **fix(ui):** Dashboard endpoint URL hydration respects `NEXT_PUBLIC_BASE_URL` when behind a reverse proxy (#1579)
- **fix(providers):** Restore strict PascalCase header masquerading for Claude Code to resolve HTTP 429 upstream errors (#1556)
- **fix(sse):** make Responses passthrough robust for size-sensitive clients (#1580)
- **fix(codex):** update client version for gpt-5.5 (#1578)
- **fix(vision-bridge):** force GPT-family image fallback (#1571)
- **fix(claude):** skip adaptive thinking defaults for unsupported models (#1563)
- **fix(claude):** preserve tool_result adjacency in native and CC-compatible paths (#1555)
- **fix(reasoning):** Preserve OpenAI Chat Completions `reasoning_effort` through assistant-prefill requests and label OpenAI request protocols explicitly as `OpenAI-Chat` or `OpenAI-Responses`. (#1550)
- **fix(codex):** Fix Codex auto-review model routing so review traffic resolves to the intended configured model. (#1551)
- **fix(resilience):** Route HTTP 429 cooldowns through runtime settings so cooldown behavior follows the configured resilience profile. (#1548)
- **fix(providers):** Normalize Anthropic header keys to lowercase in the provider registry to avoid duplicate or case-variant upstream headers. (#1527)
- **fix(providers):** Preserve audio, embedding, rerank, image, video, and OpenAI-compatible alias metadata when `/v1/models` merges static and discovered catalogs.
- **fix(providers):** Discover Azure OpenAI deployments from resource endpoints using `api-key` auth and configurable API versions.
- **fix(providers):** Keep local OpenAI-style providers authless when no API key is configured, including the Lemonade Server default endpoint.
- **fix(translator):** Preserve Antigravity default system instructions and caller-provided system prompts as separate Gemini `systemInstruction` parts instead of concatenating them.
- **fix(security):** Sanitize provider-specific AWS secrets and session tokens from provider management API responses.
- **fix(release):** Resolve combo prefixing, Electron packaging, CLI auth, and release-branch integration regressions. (#1471, #1492, #1496, #1497, #1486)
- **fix(providers):** Resolve 400 errors for GLM and Antigravity Claude adapter during request translation by scoping prompt caching to compatible Anthropic endpoints and flattening system instructions. (#1514, #1520, #1522)
- **fix(core):** Strip `reasoning_content` from OpenAI format messages for non-reasoning models to prevent upstream HTTP 400 validation errors. (#1505)
- **fix(sse):** Map Claude `output_config/thinking` to OpenAI `reasoning_effort` for proper Antigravity tool translation. (#1528)
- **fix(combo):** Fallback to next model on all-accounts-rate-limited (HTTP 503/429) to maintain high availability. (#1523)
- **fix(api):** Harden batch and file endpoints for auth and recovery to prevent schema state collisions.
- **fix(ui):** Add missing UI wiring for "Add Memory" and "Import" buttons on the `/dashboard/memory` page. (#1506)
- **fix(ui):** Prevent Dark Mode FOUC (Flash of Unstyled Content) by injecting a synchronous theme initialization script into the root `layout.tsx`.
- **fix(ui):** Fix mobile layout text overflow in provider and combo cards, and enable touch-friendly reordering arrows across all combo strategies.
- **fix(core):** Add periodic runtime log rotation checks to prevent disk exhaustion in long-running instances. (#1504 — thanks @ether-btc)
- **fix(build):** Resolve missing `process` module in webpack client build for pino-abstract-transport. (#1509 — thanks @hartmark)
- **fix(ui):** Add dark mode support for native dropdown `<option>` elements on Linux/Windows, resolving invisible text in settings and combo builders (#1488)
- **fix(batch):** Add batch item dispatching to specific handlers based on URL to support embeddings and other modalities (#1495 — thanks @hartmark)
- **fix(dashboard):** Correct TOML round-trip corruption in Codex config serializer by dequoting keys and preserving array/boolean structures properly. (#1438 — thanks @benzntech)
- **fix(security):** Resolve CodeQL alert 164 (ReDoS in extraction) and 163 (incomplete URL sanitization). (#163, #164)
- **fix(providers):** Add optional chaining to connection object before accessing `providerSpecificData`, preventing runtime errors when the connection is null/undefined.
- **fix(codex):** Preserve namespace MCP tools forwarded to Codex Responses API, preventing tool name stripping during translation. (#1483)
- **fix(codex):** Deduplicate case-variant `anthropic-version` header in Claude Code patch to prevent duplicate header injection. (#1481)
- **fix(fallback):** Use shared `CircuitBreaker` instead of undefined constants, fixing runtime errors in provider failure handling. (#1485)
- **fix(fallback):** Merge new provider failure threshold fields (`providerFailureThreshold`, `providerFailureWindowMs`, `providerCooldownMs`) into resilience profiles.
- **fix(fallback):** Remove 429 from `PROVIDER_FAILURE_ERROR_CODES` — rate limits are already handled by model-level and account-level locks; including them in the provider-wide circuit breaker caused premature cooldown.
- **fix(sse):** Enable tool calling for GPT OSS and DeepSeek Reasoner models. (#1455)
- **fix(encryption):** Return null on decryption failure to prevent sending encrypted tokens to providers. (#1462)
- **fix(combo):** Resolve cross-provider thinking 400 errors and HTTP clipboard issues during combo routing. (#1444)
- **fix(core):** Resolve skills, memory, and encryption system issues affecting startup and runtime stability. (#1456)
- **fix(core):** Fix model ID parsing for providers with slashes in model names — use `indexOf`/`substring` instead of `split` to handle models like `modelscope/moonshotai/Kimi-K2.5`.
- **fix(core):** Fix reference counting in `ModelStatusContext` — changed `registeredModels` from `Set` to `Map<string, number>` to prevent polling stop when one component unmounts while others still track the same model.
- **fix(security):** Prompt injection guard failures now return an explicit 500 response instead of silently passing through (fail-closed policy).
- **fix(security):** Encryption now derives new keys from a secret-based salt while falling back to the legacy static-salt key during decryption, preserving existing stored credentials.
- **fix(combo):** Resolve context truncation bug in combo routing to prevent incomplete execution states. (#1517)
- **fix(compression):** Implement bidirectional tool_pair cleaning for anthropic inputs (fixes #1592).
- **fix:** Resolve v3.7.0 stabilization issues including dashboard navigation routing, ProxyRegistryManager component layout, and models API response merging (#1566, #1560, #1559).
- **fix(cli):** Preserve TOML integer/boolean types in Codex config round-trip to prevent `tui.model_availability_nux` validation errors.
- **fix(tailscale):** Support sudo auth prompts and live daemon socket detection for non-root tunnel management.
- **fix(dashboard):** Stabilize usage tab loading and refresh behavior to prevent empty state flashes.
- **fix(i18n):** Translate 519 untranslated pt-BR keys and add missing Windsurf/Cline/Kimi docs keys.
- **fix(i18n):** Add missing dashboard message keys across all 30 locales.
- **fix(cli):** Align OpenCode config preview and add multi-model selection (#1602).
- **fix(security):** Harden management API auth and OpenAPI try-proxy endpoint.
- **fix(security):** Resolve vulnerability scan findings for auth-guarded routes.

### ♻️ Refactoring

- **refactor(fallback):** Make provider failure thresholds configurable via `PROVIDER_PROFILES` instead of hardcoded constants, supporting different failure tolerance per provider type. (#1449)
- **refactor(resilience):** Unify resilience controls across the codebase for consistent circuit breaker and fallback behavior. (#1449)
- **refactor(core):** Implement shared path utilities, add custom date formatting, improve type safety, and unify database imports across modules.
- **refactor(security):** Harden backup archive creation by switching to `execFileSync`, validate ACP agent IDs, expand shared CORS handling.
- **refactor(release):** Remove obsolete agent workflow playbooks and the stale compiled `src/lib/dataPaths.js` artifact. (#1541)

### 🧪 Tests

- **test(providers):** Add targeted coverage for AWS Polly SigV4 speech/validation, Azure OpenAI deployment discovery, Lemonade local discovery, provider dashboard taxonomy, managed provider catalog behavior, and merged `/v1/models` alias metadata.
- **test(catalog):** Add v3.7.0 catalog coverage for Pollinations text models, Perplexity Sonar via Puter, and NVIDIA free-model alias resolution.
- **test(vision-bridge):** Add 51 unit tests covering all VisionBridge spec scenarios (VB-S01 through VB-S10), including helper functions for `callVisionModel`, `extractImageParts`, `replaceImageParts`, and `resolveImageAsDataUri`.
- **test(batch-api):** Isolate batch API unit tests with temp `DATA_DIR` to prevent schema state collisions.
- **test(settings-api):** Add test harness with `createSettingsApiHarness` function for proper temp directory setup and storage reset between tests.
- **test(security):** Update prompt injection test for fail-closed policy alignment.
- **test(core):** Restore local test fixes for encryption and resilience modules.
- **test(next):** Align transpile package expectations for the Next.js standalone build.
- **test(ci):** Fix CI-only test failures from environment differences — clear `INITIAL_PASSWORD` and `JWT_SECRET` in integration tests, handle `XDG_CONFIG_HOME` for guide-settings tests.

### Dokumentation

- **docs:** Update the root changelog with all release-branch changes through 2026-04-24, including PRs #1544, #1555, #1551, #1550, #1548, #1547, #1541, #1538, #1536, and #1527.
- **docs:** Fix broken README and localized documentation links. (#1536)
- **docs:** Add dashboard docs coverage for current API endpoints, management APIs, ACP, MCP tools, provider onboarding, and v3.7.0 task reconciliation.
- **docs:** Add Arch Linux AUR install notes for community package support. (#1478)
- **docs(i18n):** Improve Ukrainian (uk-UA) translation quality — full Ukrainian translation for README, SECURITY, A2A-SERVER, API_REFERENCE, AUTO-COMBO, and USER_GUIDE documents. Fix mixed Latin/Cyrillic typos, translate model table entries, and standardize section headers.

### 🛠️ Maintenance

- **chore:** Add `.tmp/` to `.gitignore` to keep local build/test artifacts out of release diffs. (#1538)
- **chore(release):** Clarify release version parity and changelog segregation rules for generated release workflows.

### 📦 Dependencies

- **deps:** Bump the development group with 4 updates. (#1464)
- **deps:** Bump the production group with 4 updates. (#1463)
- **deps:** Update `@lobehub/icons` to `5.5.4`, add explicit `react-is@19.2.5` for Recharts, pin npm installs to skip unused peer auto-installs, and override Electron's transitive `@xmldom/xmldom` to `0.9.10` so audit findings stay closed.

---

## [3.6.9] — 2026-04-19

### ✨ New Features

- **feat(providers):** Implement Image Generation and Editing capabilities for ChatGPT Web, including in-band chat image generation and caching (#1606).
- **feat(ui):** Integrate OpenCode Zen/Go API tool logo SVG and polish API key copy-to-clipboard interactions (#1607).

- **feat(providers):** Mark Qwen OAuth provider as deprecated following the upstream free tier shutdown on 2026-04-15. Adds deprecation warning to CLI tool UI and rewrites `saveQwenConfig` to inject OmniRoute as a multi-provider (openai, anthropic, gemini) via `.qwen/settings.json` and `.qwen/.env` (#1437)
- **feat(cc-compatible):** Align Claude Code-compatible request shape with the official Claude CLI protocol, including proper system skeleton and request normalization (#1411)
- **feat(skills):** Provider-aware marketplace UX with scored AUTO injection and memory pipeline hardening. Skills now show relevance scores and can automatically inject context into requests (#1411)
- **feat(claude-code):** Update Claude Code obfuscation to version 2.1.114, centralize hardcoded version strings, and use standard logger (#1403)
- **feat(cli-tools):** Add direct configuration file generation and override support for Qwen Code local settings (#1394)
- **feat(providers):** Derive Claude CLI model defaults dynamically from provider registry to stay current with upstream API changes (#1393)
- **feat(core):** Implement persistent API key, backup pruning, and GPU optimization (#1350, #1367, #1369)

### 🐛 Bug Fixes

- **fix(mitm):** Compile MITM utilities as NodeNext ESM during prepublish, copy the CommonJS MITM server into the standalone artifact, and resolve MITM data paths without relying on Next.js aliases in packaged runtime.
- **fix(build):** Move the local `.tmp/wine32` Wine prefix out of the isolated Next.js build path so Windows Electron packaging artifacts cannot trigger `EACCES` scans during Node 24 builds.
- **fix(build):** Copy the `wreq-js` native runtime directory into the isolated Next.js standalone output so packaged Playwright/E2E starts can load the instrumentation hook on Linux.
- **fix(api):** Validate the Codex Responses websocket bridge and `/v1/batches` JSON payloads with Zod before use, keeping `request.json()` route validation green and returning explicit 400 responses for invalid bodies.
- **fix(providers):** Add explicit typing to provider alias and category helpers so the strict `typecheck:noimplicit:core` CI gate passes.
- **fix(ui):** Keep the upstream proxy provider detail page labeled with a fallback "Managed via Upstream Proxy Settings" management surface when translations are unavailable.
- **fix(electron):** Harden the production desktop CSP by removing `unsafe-eval` outside development and adding object, base URI, form action, frame ancestor, and worker restrictions.
- **fix(cli):** Replace shell-interpolated setup and privileged command execution paths with argument-based `spawn`/`execFile` helpers for database setup, Tailscale sudo commands, MITM DNS edits, and certificate install/uninstall flows.
- **fix(ui):** Keep provider icons resilient by using direct `@lobehub/icons` components first, then local PNG/SVG fallbacks, avoiding the `@lobehub/ui` peer runtime in the dashboard.

- **fix(cli-tools):** Prevent masked API keys (`sk-31c4****8600`) from being written to CLI tool config files. The dashboard UI now passes `key.id` to the backend, which resolves the unmasked key from the database via a new `resolveApiKey()` helper. Fixes auth failures across all CLI tools (Claude, Codex, Cline, Kilo, Droid, OpenClaw, Antigravity) (#1435)
- **fix(cc-compatible):** Trim the default Claude Code-compatible system prompt skeleton from a multi-paragraph instruction set down to a single identifier line, reducing redundant token usage since Claude Code already injects its own extensive system context (#1433)
- **fix(security):** Resolve SSRF environment static evaluation bug where the outbound URL guard could be bypassed via computed expressions (#1427)
- **fix(auth):** Reload fresh token state and unify expiry persistence to prevent stale credentials from causing cascading auth failures
- **fix(core):** Stabilization fixes for token refresh, usage translation, and testing infrastructure
- **fix(api):** Stop sending unsupported parameters to Gemini and Codex upstream APIs, preventing 400 Bad Request errors
- **fix(skills):** Optimize AUTO scoring algorithm and include Responses API input context for more accurate skill relevance matching (#1418)
- **fix(responses):** Preserve reasoning content when translating Chat Completions format to Responses API format, preventing loss of chain-of-thought data (#1414)
- **fix(cc-compatible):** Add Claude CLI system skeleton for OpenAI-format inputs to ensure consistent behavior when CC-compatible providers receive OpenAI-style payloads
- **fix(providers):** Add `ref` to `GEMINI_UNSUPPORTED_SCHEMA_KEYS` to fix 400 errors from Gemini CLI when tool schemas contain JSON Schema `$ref` fields
- **fix(codex):** Prevent proactive token refresh from consuming valid tokens and strip the unsupported `background` parameter from upstream requests
- **fix(providers):** Fix `usage.prompt_tokens` under-reporting when translating Claude caching responses to OpenAI format (#1426)
- **fix(core):** Fix token refresh resilience for Codex providers. Unrecoverable OAuth refresh errors (`token_expired` and `invalid_token`) now correctly mark the connection as invalid to prompt user re-authentication, rather than silently failing (#1415)
- **fix(providers):** Fix Gemini tool calling by removing the unsupported `additionalProperties` schema field, resolving 400 errors during complex tool invocations (#1421)
- **fix(providers):** Remove arbitrary user thought signature injection in Gemini responses to comply with updated API constraints (#1410)
- **fix(providers):** Fix Gemini API part count mismatch for streaming responses (#1412)
- **fix(codex):** Respect `openaiStoreEnabled` setting during native passthrough for Responses API to prevent unsupported upstream arguments (#1432)
- **fix(ui):** Makes dropdown text visible in dark mode within the Combo Builder modal (#1409)
- **fix(chatcore):** Apply proactive compression before provider translation to prevent token limit errors in combo routes (#1406)
- **fix(claude-code):** Scope thinking stripping to executor boundaries to prevent issues with normal API requests (#1401)
- **fix(claude-code):** Scope obfuscation logic to CLI clients only and fix associated test assertions
- **fix(mitm):** Resolve MITM not working when connecting Antigravity (#1399)
- **fix(security):** Resolve CodeQL password hash alert and fix TruffleHog CI failure (#161)
- **fix(combo):** Fallback to the next model when all provider accounts return a 503 rate-limited signal instead of aborting the routing sequence (#1398)
- **fix(codex):** Strip server-generated IDs from response items in input to prevent 404 lookup errors in multi-turn Codex Conversations (#1397)
- **fix(codex):** Optimize Chat Completions paths by converting `system` to `developer` roles instead of hoisting them into instructions, enabling prompt caching for system messages on GPT-5 models (#1400)
- **fix(providers):** Resolve Claude passthrough corruption (#1359), Kimi-k2 reasoning header rejections (#1360), thinking parameter leaks (#1361), and Ollama proxy redirect drops (#1381)
- **fix(core):** Proxy lookup in key validation respects the new ProxyRegistry environments, and proxy contexts correctly inherit downwards during token refresh preventing expiration loops (#1384, #1390)
- **fix(providers):** Treat upstream legacy validation HTTP 5xx responses as a valid bypass for Qoder PAT tokens to prevent false negative invalidation (#1391)
- **fix(electron):** Resolve type error in Header electronAPI properties
- **fix(security):** Resolve CodeQL security alerts including safe prototype bindings (#151, #152, #154, #155-159)
- **fix(tsc):** Silence `baseUrl` deprecation warnings for TypeScript 5.5+ configurations

### 🧪 Tests

- **test(core):** Resolve typescript strictness complaints and fix combo-routing-engine test regression
- **test(core):** Resolve remaining strict type errors across all unit test files
- **test(providers):** Fix provider service assertion for anthropic-compatible header format
- **test(codex):** Align codex passthrough assertions with explicit store retention policy
- **test(codex):** Fix store assertion for codex responses
- **test(cli):** Resolve strict null checks in Qoder unit tests

### 🛠️ Maintenance

- **chore:** Sync infrastructure with docker postinstall components and secondary CodeQL analysis rules
- **chore:** Enforce contributor credit rule in review-prs workflow
- **chore:** Fix TS errors and update review-prs workflow for improved automation
- **ci:** Allow manual CI dispatch for release branches
- **ci:** Shard long-running test suites and relax timeouts for stability
- **ci:** Restore release v3.6.9 build pipeline and fix flaky tests
- **docs:** Update generate-release workflow to use full changelog for PR body
- **docs:** Enforce PR merge instead of manual close in workflows

---

## [3.6.8] — 2026-04-17

### ✨ New Features

- **feat(providers):** Implement Image Generation and Editing capabilities for ChatGPT Web, including in-band chat image generation and caching (#1606).
- **feat(ui):** Integrate OpenCode Zen/Go API tool logo SVG and polish API key copy-to-clipboard interactions (#1607).

- **feat(providers):** Integrate AgentRouter as a new OpenAI-compatible passthrough provider with $200 free credits via sign-up (Issue #1572).
- **feat(ui):** Implement on-demand per-model testing in the provider dashboard, allowing single-token diagnostic checks without triggering rate-limits (Issue #1532).

- **feat(providers):** Support `xhigh` reasoning tier exclusively on Claude models that expose it (#1356)
- **feat(providers):** Add CC Compatible connection-level 1M context toggle (#1357)
- **feat(core):** Add full support for Node.js 24 LTS (Krypton) environments with continuous integration coverage (#1340)
- **feat(dashboard):** Display Antigravity credit balance in dashboard Limits & Quotas (#1338)
- **feat(i18n):** Add internationalization support for combo features and dashboard components; sync translations across 31 keys (#1318)
- **feat(providers):** Add Claude Opus 4.7 to Claude Code OAuth models natively with extended context and caching (#1347)
- **feat(core):** Add stopSequences support and expand tool definitions to include Google Search capabilities
- **feat(auth):** Enforce dashboard session authentication on all management API routes, preventing unauthenticated access to configuration endpoints
- **feat(runtime):** Add hot-reloadable guardrails and model diagnostics for real-time rule evaluation without restarts
- **feat(core):** Add payload rules, tag-based routing, and scheduled budget systems for fine-grained request governance
- **feat(providers):** Expose Antigravity preview model aliases and Gemini CLI onboarding flow for first-time setup
- **feat(antigravity):** Add client model aliases and thoughtSignature bypass modes for Antigravity OAuth connections
- **feat(providers):** Expand image provider registry with extended model support including SD3.5, FLUX, and DALL-E 3 HD configurations
- **feat(combos):** Add new routing strategies and full i18n support for agent features section across 31 languages

### Sicherheit

- **security:** Resolve 18 GitHub CodeQL scan alerts including ReDoS, incomplete sanitization, and bad HTML filtering regexp patterns
- **fix(auth):** Seal privilege escalation vector by enforcing JWT session checking exclusively on `/api/keys` management endpoints (#1353)
- **fix(providers):** Resolve Codex token refresh race condition via mutex `getAccessToken` preventing `refresh_token_reused` Auth0 revocations

### 🔧 Maintenance & Architecture

- **refactor(core):** Split CLI runner and decouple migration engine for extensibility (#1358)
- **refactor(audit):** Rewire audit dashboard from dead in-memory `configAudit` store to live SQLite `audit_log` table — 331+ hidden compliance entries now visible in `/dashboard/audit`
- **build(deps):** Bump `softprops/action-gh-release` from v2 to v3
- **ci:** Bump GitHub Actions CI node-version to Node.js 24 natively
- **fix(types):** Resolve TypeScript compilation errors in `claudeCodeCompatible.ts` (type predicates, `cache_control` index access) and `proxyFetch.ts` (`signal` nullability)

### 🐛 Bug Fixes

- **fix(mitm):** Compile MITM utilities as NodeNext ESM during prepublish, copy the CommonJS MITM server into the standalone artifact, and resolve MITM data paths without relying on Next.js aliases in packaged runtime.
- **fix(build):** Move the local `.tmp/wine32` Wine prefix out of the isolated Next.js build path so Windows Electron packaging artifacts cannot trigger `EACCES` scans during Node 24 builds.
- **fix(build):** Copy the `wreq-js` native runtime directory into the isolated Next.js standalone output so packaged Playwright/E2E starts can load the instrumentation hook on Linux.
- **fix(api):** Validate the Codex Responses websocket bridge and `/v1/batches` JSON payloads with Zod before use, keeping `request.json()` route validation green and returning explicit 400 responses for invalid bodies.
- **fix(providers):** Add explicit typing to provider alias and category helpers so the strict `typecheck:noimplicit:core` CI gate passes.
- **fix(ui):** Keep the upstream proxy provider detail page labeled with a fallback "Managed via Upstream Proxy Settings" management surface when translations are unavailable.
- **fix(electron):** Harden the production desktop CSP by removing `unsafe-eval` outside development and adding object, base URI, form action, frame ancestor, and worker restrictions.
- **fix(cli):** Replace shell-interpolated setup and privileged command execution paths with argument-based `spawn`/`execFile` helpers for database setup, Tailscale sudo commands, MITM DNS edits, and certificate install/uninstall flows.
- **fix(ui):** Keep provider icons resilient by using direct `@lobehub/icons` components first, then local PNG/SVG fallbacks, avoiding the `@lobehub/ui` peer runtime in the dashboard.

- **fix(context):** Scale reserved context tokens dynamically using a 15% sliding window for smaller models
- **test(core):** Replace unit test with integration test for proactive context compression to align with isolated runner rules (#1378)
- **fix(services):** Pass origin provider to refreshWithRetry to avoid tripping the generic "unknown" circuit breaker (fixes Codex accounts erroneously disabling)
- **fix(db):** Prevent native module ABI load crashes from assuming database corruption and skipping databases
- **fix(db):** Increase mass-migration threshold from 5 to 50 pending migrations to protect legacy users upgrading node
- **fix(db):** Prevent migration runner safety aborts from triggering on fresh `DATA_DIR` installations by detecting new databases (#1328)
- **fix(mcp):** Checkpoint and close MCP audit SQLite database safely on process signals and shutdown (#1348)
- **fix(mcp):** Fully decouple MCP audit SQLite connection caching via globalThis to fix unhandled teardown in standalone Next.js chunks (#1349)
- **fix(cli):** Avoid creating app router directory during postinstall initialization on non-built source trees (#1351)
- **fix(codex):** Correctly translate `system` role to `developer` in input array to unlock GPT-5 automatic prompt caching (#1346)
- **fix(core):** Pass client headers to executor in chatCore (#1335)
- **fix(providers):** Separate test batch calls and ignore unknown connections
- **fix(providers):** Add grok-web SSO cookie validation handler (#1334)
- **fix(db):** Preserve key_value settings (dashboard passwords, saved aliases) across DB heuristic recreation cycles (#1333)
- **fix(routing):** Allow combo fallback to cascade context overflow 400 errors instead of immediate aborts (#1331)
- **fix(core):** Resolve thinking leaks, consecutive roles, and missing thoughtSignatures for Antigravity translator (#1316)
- **fix(translator):** Only apply thoughtSignature to the first `functionCall` part in Gemini parallel tool calls, preventing duplicate signatures
- **fix(providers):** Default to batch testing execution blocks for web, search, and audio modalities to prevent connection timeouts
- **fix(cli):** Resolve Node 22 TS entrypoint incompatibility by using esbuild compilation (#1315)
- **fix(chat):** Preserve max_output_tokens for Responses API targets in chatCore sanitization (#1313)
- **fix(api):** API Manager usage stats showing 0 for all registered keys (#1310)
- **fix(api):** Support image-only models in catalog and allow authless search providers to bypass validation requirements
- **fix(routes):** Require prompts for media generation requests (`/images`, `/videos`, `/music`), returning 400 on missing payloads
- **fix(dashboard):** Auto-scroll ActivityHeatmap to show current date (#1309)
- **fix(dashboard):** Restore horizontal layout with `w-max` wrapper in heatmap components
- **fix(i18n):** Update `nodeIncompatibleHint` to recommend Node 24 LTS across all 31 languages
- **fix(i18n):** Add Chinese i18n support to remaining dashboard components (`Loading.tsx`, `DataTable`, etc.)
- **fix(requestLogger):** Add missing `cacheSource` and `tps` columns to i18n log detail views

## [3.6.6] — 2026-04-15

### ✨ New Features

- **feat(providers):** Implement Image Generation and Editing capabilities for ChatGPT Web, including in-band chat image generation and caching (#1606).
- **feat(ui):** Integrate OpenCode Zen/Go API tool logo SVG and polish API key copy-to-clipboard interactions (#1607).

- **feat(providers):** Integrate AgentRouter as a new OpenAI-compatible passthrough provider with $200 free credits via sign-up (Issue #1572).
- **feat(ui):** Implement on-demand per-model testing in the provider dashboard, allowing single-token diagnostic checks without triggering rate-limits (Issue #1532).

- **feat(storage):** Add database backup cleanup controls, UI management, and customizable retention period env vars (#1304)
- **feat(providers):** Add Freepik Pikaso image generation provider with support for cookie/subscription-based auth modes (#1277)
- **feat(providers): Add Perplexity Web (Session) Provider** — Routes through Perplexity's internal SSE API using a session cookie, giving native proxy access without separate API costs to GPT-5.4, Claude Opus, Gemini 3.1 Pro, and Nemotron via preferences mapping (#1289)
- **feat(api): Sync Tokens & V1 WebSocket Bridge** — Dedicated sync token storage, issuance, revocation, and bundle download routes backed by stable config bundle versioning with ETag support. Exposes `/v1/ws` WebSocket upgrade route and a custom Next.js server bridge (`scripts/v1-ws-bridge.mjs`) so OpenAI-compatible WebSocket traffic can be proxied through the gateway. Compliance auditing expanded with structured metadata, pagination, request context, auth/provider credential events, and SSRF-blocked validation logging. New migrations: `024_create_sync_tokens.sql`. New modules: `syncTokens.ts`, `src/lib/sync/bundle.ts`, `src/lib/sync/tokens.ts`, `src/lib/ws/handshake.ts`, `src/lib/apiBridgeServer.ts`, `src/lib/compliance/providerAudit.ts`.
- **feat(models): GLM Thinking Preset & Hybrid Token Counting** — GLM Thinking (`glmt`) registered as a first-class provider preset with shared GLM model metadata, pricing, per-connection usage sync, dashboard support, and `maxTokens: 65536 / thinkingBudgetTokens: 24576` request defaults with 900s extended timeout. Provider-side `/messages/count_tokens` endpoint used when a Claude-compatible upstream supports it; gracefully falls back to estimation on missing models, missing credentials, or upstream failures. Startup seeding of default model aliases (`src/lib/modelAliasSeed.ts`) normalizes common cross-proxy model dialects so canonical slash-based model IDs are not misrouted. New file `open-sse/config/glmProvider.ts`.
- **feat(core): Hardened Outbound Provider Calls & Cooldown Retries** — Guarded outbound fetch helpers (`src/shared/network/safeOutboundFetch.ts`, `src/shared/network/outboundUrlGuard.ts`) blocking private/local URLs with configurable retry, timeout normalisation, and route-level status propagation for provider validation and model discovery. Cooldown-aware chat retries (`src/sse/services/cooldownAwareRetry.ts`) with configurable `requestRetry` and `maxRetryIntervalSec` settings and model-scoped cooldown responses. Improved rate-limit learning from headers and error bodies so short upstream lockouts can recover automatically. Runtime environment validation (`src/lib/env/runtimeEnv.ts`) checks env at startup. Pollinations now requires an API key. Antigravity and Codex header handling aligned via `open-sse/config/antigravityUpstream.ts` and `open-sse/config/codexClient.ts`. Gemini tool names restored in translated responses; synthetic Claude text block injected when upstream SSE completes empty.
- **feat(logs):** Add TPS (Tokens Per Second) metric to log details modal metadata grid (#1182)
- **feat(memory+skills):** Full-featured Memory & Skills systems with FTS5 SQLite search, dynamic UI pagination, backend observability, and extensive test coverage (#1228)
- **feat(bailian-quota):** Add Alibaba Coding Plan quota monitoring, multi-window quota extraction, and UI credential validation (#1235)
- **feat(storage): Call Log Storage Refactor** — Extracted heavy request/response JSON payloads from the core SQLite database (`storage.sqlite`) into filesystem artifacts stored within `DATA_DIR/call_logs`. This massively reduces WAL bloat and eliminates `SQLITE_FULL` crashes on high-traffic nodes (#1307).
- **feat(providers): Add Grok Web (Subscription) Provider** — Routes through the xAI web interface for subscription users via cookie session mapping (#1295).
- **feat(api): Advanced Media Support** — Extends OpenAI generic proxy layer to natively support `image`, `embeddings`, `audio-transcriptions`, and `audio-speech` workflows (#1297).
- **feat(cli-tools): Qwen Code CLI Integration** — Full integration for Qwen Code local execution mapping, model resolution, and dynamic API key fetching (#1266, #1263).
- **feat(oauth):** Supports `cursor-agent` CLI as a native Cursor credential source alongside the standard configuration (#1258).
- **feat(models):** Custom and imported models now merge correctly into filter lists for all available global providers (#1191).

### 🐛 Bug Fixes

- **fix(mitm):** Compile MITM utilities as NodeNext ESM during prepublish, copy the CommonJS MITM server into the standalone artifact, and resolve MITM data paths without relying on Next.js aliases in packaged runtime.
- **fix(build):** Move the local `.tmp/wine32` Wine prefix out of the isolated Next.js build path so Windows Electron packaging artifacts cannot trigger `EACCES` scans during Node 24 builds.
- **fix(build):** Copy the `wreq-js` native runtime directory into the isolated Next.js standalone output so packaged Playwright/E2E starts can load the instrumentation hook on Linux.
- **fix(api):** Validate the Codex Responses websocket bridge and `/v1/batches` JSON payloads with Zod before use, keeping `request.json()` route validation green and returning explicit 400 responses for invalid bodies.
- **fix(providers):** Add explicit typing to provider alias and category helpers so the strict `typecheck:noimplicit:core` CI gate passes.
- **fix(ui):** Keep the upstream proxy provider detail page labeled with a fallback "Managed via Upstream Proxy Settings" management surface when translations are unavailable.
- **fix(electron):** Harden the production desktop CSP by removing `unsafe-eval` outside development and adding object, base URI, form action, frame ancestor, and worker restrictions.
- **fix(cli):** Replace shell-interpolated setup and privileged command execution paths with argument-based `spawn`/`execFile` helpers for database setup, Tailscale sudo commands, MITM DNS edits, and certificate install/uninstall flows.
- **fix(ui):** Keep provider icons resilient by using direct `@lobehub/icons` components first, then local PNG/SVG fallbacks, avoiding the `@lobehub/ui` peer runtime in the dashboard.

- **fix(providers):** match correct endpoint api.xiaomimimo.com for Xiaomi MiMo (#1303)
- **fix(core):** strip provider alias routing prefix from payload for custom endpoints to fix Azure OpenAI 400 errors (#1261)
- **fix(core):** ProxyFetch Undici dispatcher automatically bypasses LAN/local addresses, preventing fetch failures on internal OpenRouter requests (#1254)
- **fix(core):** Gemini thought stream signature detection upgraded to use native part.thought boolean, preventing reasoning text leaks (#1298)
- **deps:** bump hono from 4.12.12 to 4.12.14 to resolve CVE SSR HTML injection vulnerability (#1306, #59)
- **deps:** update dompurify to 3.4.0 in frontend overrides mitigating XSS HTML Injection (CVE-XYZ / Dependabot #60)
- **test:** Disable SQLite automatic backups during continuous integration (CI) tests to resolve E2E timeout issues limiting runner scaling (#24481475058)
- **feat(core): Proactive Context Compression** — `chatCore` now proactively compresses oversized message contexts before hitting upstream providers to dramatically reduce `context_length_exceeded` errors. Employs binary-search message pruning with structural integrity guarantees tracking explicit `tool_use` boundaries ensuring truncated tool inputs drop paired outputs appropriately (#1292, #1293)

- **fix(cli):** Resolve codex routing config parsing by strictly quoting section keys array, enforcing responses wire_api with fallback, and standardizing select-model button positioning mirroring Claude UI
- **fix(providers):** Correct Lobehub provider icons rendering by removing unsupported local references ensuring local SVG/PNG fallback mechanism invokes natively
- **fix(db):** Implement Database migration tracking safety abort safeguards (pre-migration backups via `VACUUM INTO` and mass renumbering warnings) to protect existing database structures on startup upgrades (#1281)
- **fix(dashboard):** Cleaned up target codex `config.toml` structure preventing recursive section rendering by enforcing quotes on section dot paths and mapping correct UI `OMNIROUTE_API_KEY` names.
- **fix(mcp):** Add dedicated explicit timeout constraint overrides for search handlers (#1280)
- **fix(crypto):** Add validation guard to encryption layer to surface clear UI errors when cryptographic environment variables are missing, replacing raw Node.js TypeErrors. Legacy env vars `OMNIROUTE_CRYPT_KEY` and `OMNIROUTE_API_KEY_BASE64` now also accepted as fallbacks (#1165)
- **fix(providers):** Update Pollinations provider definition to require API keys and specify their new limited pollen/hour free tier (#1177)
- **Streaming `\n\n` Artifact Fix (#1211):** Changed `<omniModel>` tag-stripping regex from `?` to `*` quantifier across `combo.ts`, `comboAgentMiddleware.ts`, and `contextHandoff.ts` to greedily strip all accumulated JSON-escaped newline sequences surrounding the tag. This prevents literal `\n\n` prefix artifacts from appearing in consumer streaming responses
- **E2E Combo Test Locator:** Fixed Playwright strict-mode violation in `combo-unification.spec.ts` by replacing ambiguous `getByRole` locator with a compound filter locator for the "All" strategy tab
- **fix(cc-compatible):** Trim beta flags and preserve cache passthrough for third-party HTTP proxy compatibility (#1230)
- **fix(providers):** Update Xiaomi MiMo endpoints to the live token-plan, migrating away from dead API URLs (#1238)
- **fix:** Forward client `x-initiator` header to GitHub Copilot upstream to accurately distinguish agent vs user turns (#1227)
- **fix:** Resolve backlog bugs including streaming edge cases, unhandled rejections, and quota parse failures (#1206, #1220, #1231, #1175, #1187, #1218, #1202)
- **fix(tests):** Resolve memory migration and skills route pagination bugs arising from PR overlaps
- **fix(i18n):** Add missing Chinese i18n support to dashboard components (`DataTable`, `EmptyState`, etc), update `en.json/zh-CN.json` routing keys, and natively resolve JSX defaults via `next-intl` (#1274)

### 🔧 Internal Improvements

- **Compliance Audit Expansion:** `src/lib/compliance/index.ts` expanded with structured metadata, pagination support, request context enrichment, and new `providerAudit.ts` module logging auth and provider credential events, SSRF-blocked validation attempts, and provider CRUD operations
- **Config Sync Bundle:** `src/lib/sync/bundle.ts` exports `buildConfigBundle()` generating a versioned JSON snapshot of settings, provider connections, nodes, model aliases, combos, and API keys (passwords redacted) with ETag support for bandwidth-efficient polling
- **Codex Client Constants:** Centralized `CODEX_CLIENT_VERSION`, `CODEX_USER_AGENT_PLATFORM`, and pattern-validated env overrides (`CODEX_CLIENT_VERSION`, `CODEX_USER_AGENT`) in `open-sse/config/codexClient.ts`
- **Antigravity Upstream Constants:** `open-sse/config/antigravityUpstream.ts` consolidates all Antigravity base URLs and model/fetchAvailableModels discovery path builders
- **Model Alias Seed:** `src/lib/modelAliasSeed.ts` seeds 30+ cross-proxy model dialect aliases (e.g. `openai/gpt-5` → `gpt-5`, `anthropic/claude-opus-4-6` → `cc/claude-opus-4-6`) at startup via idempotent `upsert`
- **Test Coverage:** 15+ new unit test suites covering sync routes, WebSocket bridge, compliance index, GLM provider config, cooldown-aware retry, safe outbound fetch, stream utilities, Codex executor, provider validation branches, model cross-proxy compatibility, and model alias seeding
- **TypeScript Migration:** Finalized migration of remaining JS tests (`proxy-load` and `testFromFile`) to TypeScript ES modules, ensuring a fully synchronized TS stack.
- **Reliability & Resilience:** Added exponential backoff to `models.dev` auto-sync to combat transient network failures, raised interval floor to 1 hour, and added LKGP debug logging for enhanced observability during routing. (#1286)

---

## [3.6.5] — 2026-04-13

### ✨ New Features

- **feat(providers):** Implement Image Generation and Editing capabilities for ChatGPT Web, including in-band chat image generation and caching (#1606).
- **feat(ui):** Integrate OpenCode Zen/Go API tool logo SVG and polish API key copy-to-clipboard interactions (#1607).

- **feat(providers):** Integrate AgentRouter as a new OpenAI-compatible passthrough provider with $200 free credits via sign-up (Issue #1572).
- **feat(ui):** Implement on-demand per-model testing in the provider dashboard, allowing single-token diagnostic checks without triggering rate-limits (Issue #1532).

- **Antigravity AI Credits Fallback:** Automatically retries with `GOOGLE_ONE_AI` credit injection when free-tier quota is exhausted. Per-account credit balance (5-hour TTL) is cached from SSE `remainingCredits` and exposed as a numeric badge in the Provider Usage dashboard (#1190 — thanks @sFaxsy)
- **Claude Code Native Parity:** Full header/body signing parity with the Claude Code 2.1.87 OAuth client — CCH xxHash64 body signing with singleton WASM initialization promise (fixing race conditions), dynamic per-request fingerprint, bidirectional TitleCase ↔ lowercase tool name remapping (14 tools), API constraint enforcement (`temperature=1` for thinking, max 4 `cache_control` blocks, auto-inject ephemeral on last user message), and optional ZWJ obfuscation. Wired into `BaseExecutor` for automatic CCH signing on all `anthropic-compatible-cc-*` providers and into `chatCore` for synchronous parity pipeline steps (#1188 — thanks @RaviTharuma)
- **Per-Connection Codex Defaults:** Codex Fast Service Tier and Reasoning Effort settings are now per-connection instead of a single global toggle. Existing connections are migrated automatically on startup via an idempotent backfill migration (#1176 — thanks @rdself)
- **Cursor Usage Dashboard:** New `getCursorUsage()` fetches quotas from Cursor's `/api/usage`, `/api/auth/me`, and `/api/subscription` endpoints. Displays standard requests, on-demand usage, and per-plan limits (Free/Pro/Business/Team). Client version bumped to `3.1.0` and `x-cursor-user-agent` header added for parity
- **Database Health Check System:** Automated periodic SQLite integrity monitoring via `runDbHealthCheck()` — detects orphan quota/domain rows, broken combo references, stale snapshots, and invalid JSON state. Runs every 6 hours (configurable via `OMNIROUTE_DB_HEALTHCHECK_INTERVAL_MS`), with auto-repair and pre-repair backup. Exposed as **MCP tool #18** (`omniroute_db_health_check`) with Zod schemas and `autoRepair` option. Dashboard panel in Health page with status card, issue count, repaired count, and one-click repair button
- **OpenAI Responses API Store Opt-In:** Per-connection `openaiStoreEnabled` flag controls whether the `store` field is preserved or forced to `false` on Codex Responses API requests. When enabled, `previous_response_id`, `prompt_cache_key`, `session_id`, and `conversation_id` fields are round-tripped through the Chat Completions → Responses translation, enabling multi-turn context caching on supported providers
- **Email Privacy Toggle (Combos Page):** Global email visibility toggle (`EmailPrivacyToggle`) added to the Combos page header with responsive layout, tooltip guidance, and per-connection label masking via `pickDisplayValue()`. All combo builder options, provider connection lists, and quota screens now respect the global privacy state from `emailPrivacyStore`
- **skills.sh Integration:** Added `skills.sh` as an external skill provider. Users can now search, browse, and install agent skills directly from a new "skills.sh" tab in the Skills dashboard. Includes backend API resolvers, frontend implementation with search/install states, and a dedicated unit test suite (#1223 — thanks @RaviTharuma)
- **Stabilization Settings:** Added persistence support for `lkgpEnabled` and `backgroundDegradation` settings, integrated into `instrumentation-node.ts` for improved lifecycle awareness (#1212)
- **xxhash-wasm dependency:** Added `xxhash-wasm@^1.1.0` for CCH signing (xxHash64 with seed `0x6E52736AC806831E`)

### 🐛 Bug Fixes

- **fix(mitm):** Compile MITM utilities as NodeNext ESM during prepublish, copy the CommonJS MITM server into the standalone artifact, and resolve MITM data paths without relying on Next.js aliases in packaged runtime.
- **fix(build):** Move the local `.tmp/wine32` Wine prefix out of the isolated Next.js build path so Windows Electron packaging artifacts cannot trigger `EACCES` scans during Node 24 builds.
- **fix(build):** Copy the `wreq-js` native runtime directory into the isolated Next.js standalone output so packaged Playwright/E2E starts can load the instrumentation hook on Linux.
- **fix(api):** Validate the Codex Responses websocket bridge and `/v1/batches` JSON payloads with Zod before use, keeping `request.json()` route validation green and returning explicit 400 responses for invalid bodies.
- **fix(providers):** Add explicit typing to provider alias and category helpers so the strict `typecheck:noimplicit:core` CI gate passes.
- **fix(ui):** Keep the upstream proxy provider detail page labeled with a fallback "Managed via Upstream Proxy Settings" management surface when translations are unavailable.
- **fix(electron):** Harden the production desktop CSP by removing `unsafe-eval` outside development and adding object, base URI, form action, frame ancestor, and worker restrictions.
- **fix(cli):** Replace shell-interpolated setup and privileged command execution paths with argument-based `spawn`/`execFile` helpers for database setup, Tailscale sudo commands, MITM DNS edits, and certificate install/uninstall flows.
- **fix(ui):** Keep provider icons resilient by using direct `@lobehub/icons` components first, then local PNG/SVG fallbacks, avoiding the `@lobehub/ui` peer runtime in the dashboard.

- **Codex `stream: false` via Combo (ALL_ACCOUNTS_INACTIVE):** Fixed a critical bug where Codex combos returned `ALL_ACCOUNTS_INACTIVE` or empty content when the client sent `stream: false`. Root cause was triple: (1) `CodexExecutor.transformRequest()` mutated `body.stream` in-place to `true`, contaminating the combo's quality check which skipped validation thinking it was streaming; (2) the non-stream SSE parser used the wrong format (Chat Completions instead of Responses API) for Codex SSE output; (3) combo quality validation read the mutated `body.stream` instead of the client's original intent. Fixed by: cloning the body via `structuredClone()` in CodexExecutor, detecting Codex/Responses SSE format in the non-stream fallback path (with auto-translation back to Chat Completions), and capturing `clientRequestedStream` before the combo loop
- **Gemini CLI Tool Schema Rejection:** Fixed 400 Bad Request errors from the Google API by strictly filtering non-standard vendor extensions (starting with `x-`) and `deprecated` fields from tool parameter schemas (#1206)
- **SOCKS5 Proxy Interop (Node.js 22):** Resolved `invalid onRequestStart method` crashes caused by `undici` version mismatches between dispatchers and the built-in fetch. Hardened `proxyFetch.ts` to strictly use the library's fetch implementation for custom dispatchers (#1219)
- **Search Cache Coalescing with TTL=0:** Fixed a bug where providers configured with `cacheTTLMs: 0` (caching explicitly disabled) still had concurrent requests coalesced and returned `{ cached: true }`. Now each call gets its own independent upstream fetch (#1178 — thanks @sjhddh)
- **Antigravity Credit Cache Alignment (PR #1190):** Reconciled `accountId` derivation between `AntigravityExecutor.collectStreamToResponse` and `getAntigravityUsage` to use consistent cache keys (`email || sub || "unknown"`). Previously, SSE-parsed credit balances could be written under a different key than the one read by the usage dashboard, causing stale/missing credit badges
- **Non-streaming reasoning_content Duplication:** Fixed clients rendering duplicated reasoning panels when both `reasoning_content` and visible `content` were present in non-streaming responses. `responseSanitizer` now strips `reasoning_content` from messages that already have visible text content, preserving it only for reasoning-only messages
- **Streaming Regression Fix:** Hardened the `sanitize` TransformStream in the combo engine to strip both literal and JSON-escaped newline sequences, eliminating leading `\n\n` prefixes in assistant responses (#1211)
- **Gemini Empty Choice Fix:** Ensured initial assistant deltas always include an empty `content: ""` string to satisfy strict OpenAI client requirements and prevent empty choice responses in tools (#1209)
- **Gemini Tools Sanitizer Deduplication:** Extracted shared tool conversion logic into `buildGeminiTools()` helper (`geminiToolsSanitizer.ts`), eliminating duplicate implementations between `openai-to-gemini.ts` and `claude-to-gemini.ts`. The new helper correctly handles `web_search` / `web_search_preview` tool types by emitting `googleSearch` tools with priority over function declarations
- **Qwen/Qoder Thinking+Tool_Choice Conflict:** Added `sanitizeQwenThinkingToolChoice()` to both `DefaultExecutor` (for Qwen provider) and `QoderExecutor` to prevent provider-side 400 errors when clients send `tool_choice` alongside thinking/reasoning parameters that are mutually exclusive upstream
- **API Key Deletion Orphan Cleanup:** Deleting an API key now also removes associated `domain_budgets` and `domain_cost_history` rows, preventing orphan data accumulation
- **CC-compatible test assertion:** Fixed pre-existing test that expected no `cache_control` on system blocks — the billing header system block now carries `cache_control: { type: "ephemeral" }` per PR #1188 design
- **Codex Combo Smoke Test False Positives:** Fixed combo tests incorrectly reporting `ERROR` for valid Codex streaming responses when `response.output` is empty but text deltas were emitted. The summary now falls back to accumulated delta text (#1176 — thanks @rdself)
- **Electron Builder Version Mismatch:** Fixed Electron desktop startup failures on Windows packaged builds caused by native modules (`better-sqlite3`) being under `app.asar.unpacked` while helpers were in `app/node_modules`. `resolveServerNodePath()` now merges both locations with deduplication and existence checks (#1172 — thanks @backryun)

### 🔧 Internal Improvements

- **SSE Parser: Responses API Non-Stream Conversion:** Added full `parseSSEToResponsesOutput()` implementation in `sseParser.ts` (255+ lines) — reconstructs complete Responses API objects from SSE event streams, handling `response.output_text.delta/done`, `response.reasoning_summary_text.delta/done`, `response.function_call_arguments.delta/done`, and terminal events. Used by the new chatCore non-stream fallback path for Codex
- **Cursor Executor Version Sync:** Updated Cursor client User-Agent to `3.1.0` and centralized version constants (`CURSOR_CLIENT_VERSION`, `CURSOR_USER_AGENT`) for consistent fingerprinting across executor, usage fetcher, and OAuth flows
- **Responses API Translator Parity:** `convertResponsesApiFormat()` now accepts credentials and passes them through to the translator, enabling store-aware field propagation. Round-trip preservation of `previous_response_id`, `prompt_cache_key`, `session_id`, and `conversation_id` fields
- **Provider Schema Validation:** Added `openaiStoreEnabled` boolean validation to `providerSpecificData` Zod schema
- **Combo Error Response Normalization:** Empty combo targets now return 404 (`comboModelNotFoundResponse`) instead of generic 503, improving client-side error differentiation
- **Dependency Updates:** Bumps `typescript-eslint` to `8.58.2` (dev), `axios` to `1.15.0` (prod), and `next` to `16.2.2` (prod) (#1224, #1225)

### ⚠️ Breaking Changes

- **`DELETE /api/settings/codex-service-tier` removed:** This endpoint no longer exists. Codex Service Tier configuration has moved to per-connection `providerSpecificData.requestDefaults`. Existing connections are migrated automatically on first startup after upgrade. Any external scripts or integrations that call this endpoint should be updated — use `PUT /api/providers/:id` with `providerSpecificData.requestDefaults.serviceTier` instead (#1176).
- **CCH signing on CC-compatible providers:** All requests to `anthropic-compatible-cc-*` providers now include an xxHash64 integrity token (`cch=...`) in the billing header. Providers that do not validate CCH will ignore it (no behavioral change), but any custom middleware inspecting the billing header should expect a 5-character hex token instead of the `00000` placeholder

---

## [3.6.4] — 2026-04-12

### ✨ New Features

- **feat(providers):** Implement Image Generation and Editing capabilities for ChatGPT Web, including in-band chat image generation and caching (#1606).
- **feat(ui):** Integrate OpenCode Zen/Go API tool logo SVG and polish API key copy-to-clipboard interactions (#1607).

- **feat(providers):** Integrate AgentRouter as a new OpenAI-compatible passthrough provider with $200 free credits via sign-up (Issue #1572).
- **feat(ui):** Implement on-demand per-model testing in the provider dashboard, allowing single-token diagnostic checks without triggering rate-limits (Issue #1532).

- **Combo Builder v2 (Wizard UI):** Completely redesigned the combo creation/editing interface as a multi-stage wizard with stages: Basics → Steps → Strategy → Review. The builder fetches provider, model, and connection metadata via a new `GET /api/combos/builder/options` endpoint, enabling precise provider/model/account selection with duplicate detection and automatic next-connection suggestion. Heavy UI components (`ModelSelectModal`, `ProxyConfigModal`, `ModelRoutingSection`) are now lazily loaded via `next/dynamic` for faster initial page render
- **Combo Step Architecture (Schema v2):** Introduced a structured step model (`ComboModelStep`, `ComboRefStep`) replacing the legacy flat string/object combo entries. Steps carry explicit `id`, `kind`, `providerId`, `connectionId`, `weight`, and `label` fields, enabling pinned-account routing, cross-combo references, and per-step metrics. All combo CRUD operations normalize entries through the new `src/lib/combos/steps.ts` module. Zod schemas updated with `comboModelStepInputSchema` and `comboRefStepInputSchema` unions
- **Composite Tiers System:** Added tiered model routing via `config.compositeTiers` — each tier maps a named stage to a specific combo step with optional fallback chains. Includes comprehensive validation (`src/lib/combos/compositeTiers.ts`) ensuring step existence, preventing circular fallback, and validating default tier references. Zod schema enforcement blocks composite tiers on global defaults (concrete combos only)
- **Model Capabilities Registry:** Created `src/lib/modelCapabilities.ts` providing `getResolvedModelCapabilities()` — a unified resolver that merges static specs, provider registry data, and live-synced capabilities into a single `ResolvedModelCapabilities` object covering tool calling, reasoning, vision, context window, thinking budget, modalities, and model lifecycle metadata
- **Observability Module:** Extracted health and telemetry payload construction into `src/lib/monitoring/observability.ts` with `buildHealthPayload()`, `buildTelemetryPayload()`, and `buildSessionsSummary()` builders. The health endpoint now returns session activity, quota monitor status, and per-provider breakdowns alongside existing system metrics
- **Session & Quota Monitor Dashboard:** Added live Session Activity and Quota Monitors panels to the Health dashboard, showing active session counts, sticky-bound sessions, per-API-key breakdowns, and top session details alongside quota monitor alerting/exhausted/error status with per-provider drill-down
- **Combo Health Per-Target Analytics:** The combo-health API now resolves per-target metrics using the new `resolveNestedComboTargets()` function, providing step-level success rates, latency, and historical usage breakdowns per execution key — enabling per-account, per-connection health visibility
- **Auto-Combo → Combos Unification:** Merged the separate `/dashboard/auto-combo` page into the main `/dashboard/combos` page. Auto/LKGP combos are now managed alongside all other combos with a new strategy filter tabs system (All / Intelligent / Deterministic). The old auto-combo route redirects to `/dashboard/combos?filter=intelligent`. Removed the `auto-combo` sidebar entry, consolidating navigation into the single `Combos` item
- **Intelligent Routing Panel (`IntelligentComboPanel`):** New inline panel (371 lines) within the combos page that shows real-time provider scores, 6-factor scoring breakdown (quota, health, cost, latency, task fitness, stability), mode pack selector, incident mode status, and excluded providers for `auto`/`lkgp` combos — replacing the former standalone auto-combo dashboard
- **Builder Intelligent Step (`BuilderIntelligentStep`):** New conditional wizard step (280 lines) that appears in the Builder v2 flow only when `strategy=auto` or `strategy=lkgp` is selected. Exposes candidate pool selection, mode pack presets, router sub-strategy selector, exploration rate slider, budget cap, and collapsible advanced scoring weights configuration
- **Intelligent Routing Module (`intelligentRouting.ts`):** Extracted strategy categorization and filtering logic into a dedicated shared module (210 lines) with `getStrategyCategory()`, `isIntelligentStrategy()`, `filterCombosByStrategyCategory()`, `normalizeIntelligentRoutingFilter()`, and `normalizeIntelligentRoutingConfig()` utility functions
- **LKGP Standalone Strategy:** Implemented `lkgp` (Last Known Good Provider) as a fully functional standalone combo strategy. Previously, `lkgp` as a combo strategy silently fell through to `priority` ordering — the LKGP lookup only ran inside the `auto` engine. Now `strategy: "lkgp"` correctly queries the LKGP state, moves the last successful provider to the top of the target list, and saves the LKGP state after each successful request. Falls back to priority ordering when no LKGP state exists
- **Unified Routing Rules & Model Aliases:** Consolidated the routing rules and model alias management controls into the Settings page, reducing fragmentation across the dashboard

### ⚡ Performance

- **Middleware Lazy Loading:** Refactored `src/proxy.ts` to lazy-import `apiAuth`, `db/settings`, and `modelSyncScheduler` modules, reducing middleware cold-start overhead. Added inline `isPublicApiRoute()` to avoid loading the full auth module for public routes
- **E2E Auth Bypass:** Added `NEXT_PUBLIC_OMNIROUTE_E2E_MODE` environment flag to bypass authentication gates for dashboard and management API routes during Playwright E2E test runs

### 🐛 Bug Fixes

- **fix(mitm):** Compile MITM utilities as NodeNext ESM during prepublish, copy the CommonJS MITM server into the standalone artifact, and resolve MITM data paths without relying on Next.js aliases in packaged runtime.
- **fix(build):** Move the local `.tmp/wine32` Wine prefix out of the isolated Next.js build path so Windows Electron packaging artifacts cannot trigger `EACCES` scans during Node 24 builds.
- **fix(build):** Copy the `wreq-js` native runtime directory into the isolated Next.js standalone output so packaged Playwright/E2E starts can load the instrumentation hook on Linux.
- **fix(api):** Validate the Codex Responses websocket bridge and `/v1/batches` JSON payloads with Zod before use, keeping `request.json()` route validation green and returning explicit 400 responses for invalid bodies.
- **fix(providers):** Add explicit typing to provider alias and category helpers so the strict `typecheck:noimplicit:core` CI gate passes.
- **fix(ui):** Keep the upstream proxy provider detail page labeled with a fallback "Managed via Upstream Proxy Settings" management surface when translations are unavailable.
- **fix(electron):** Harden the production desktop CSP by removing `unsafe-eval` outside development and adding object, base URI, form action, frame ancestor, and worker restrictions.
- **fix(cli):** Replace shell-interpolated setup and privileged command execution paths with argument-based `spawn`/`execFile` helpers for database setup, Tailscale sudo commands, MITM DNS edits, and certificate install/uninstall flows.
- **fix(ui):** Keep provider icons resilient by using direct `@lobehub/icons` components first, then local PNG/SVG fallbacks, avoiding the `@lobehub/ui` peer runtime in the dashboard.

- **P2C Credential Selection:** Implemented Power-of-Two-Choices (P2C) connection scoring in `src/sse/services/auth.ts` with quota headroom awareness, error/recency penalties, and forced/excluded connection support. The new `getProviderCredentialsWithQuotaPreflight()` function integrates quota preflight checks directly into credential selection, eliminating the separate Codex-only preflight path
- **Fixed-Account Combo Steps:** Combo steps with explicit `connectionId` now correctly bypass provider-level model cooldowns and circuit breakers, preventing a single account failure from blocking pinned-connection routing for the same model
- **Combo Metrics Per-Target Tracking:** Extended `comboMetrics.ts` to track `byTarget` metrics keyed by execution path, recording per-step `provider`, `providerId`, `connectionId`, and `label` alongside existing per-model aggregates
- **Call Logs Schema Expansion:** Added `requested_model`, `request_type`, `tokens_cache_read`, `tokens_cache_creation`, `tokens_reasoning`, `combo_step_id`, and `combo_execution_key` columns to `call_logs` with auto-migration. Added composite index `idx_cl_combo_target` for efficient per-target historical queries
- **Quota Monitor Enrichment:** Expanded `quotaMonitor.ts` with full lifecycle state tracking (`status`, `startedAt`, `lastPolledAt`, `consecutiveFailures`, `totalPolls`, `totalAlerts`), ISO-formatted snapshots via `getQuotaMonitorSnapshots()`, and sorted summary via `getQuotaMonitorSummary()`
- **Codex Quota Fetcher Hardening:** Improved `codexQuotaFetcher.ts` with safer connection registration and quota fetch error handling
- **LKGP Save Refactored to Async/Await:** Replaced fire-and-forget `.then()` chain for LKGP persistence after successful combo routing with proper `async/await` + `try/catch`, preventing unhandled promise rejections and ensuring LKGP state is reliably saved before the response is returned
- **Duplicate `auto` in Combo Strategy Schema:** Removed duplicate `"auto"` entry from `comboStrategySchema` (was listed on both line 104 and 108). Harmless to Zod runtime but cleaned up to avoid confusion. Schema now has exactly 13 unique strategy values
- **Legacy Combo Refs Normalization:** Fixed combo step normalization to preserve legacy string combo references during CRUD operations, preventing data loss when editing combos created before the v2 step architecture

### Sicherheit

- **Auth Bypass on Backup Routes (Critical):** Added `isAuthenticated` guards to `/api/db-backups/exportAll` (full database export) and `/api/db-backups` (list, create, and restore backups) — both were previously accessible without authentication
- **Auth Guard on Translator Save:** Added `isAuthenticated` guard to `/api/translator/save` for defense-in-depth consistency
- **API Key Secret Hardening:** Removed the hardcoded `"omniroute-default-insecure-api-key-secret"` fallback from `apiKey.ts` — the function now fails fast if `API_KEY_SECRET` is unset, relying on the startup validator to auto-generate it
- **NPM Tarball Leak Fix:** Added `app/.env*` to `.npmignore` to prevent the working `.env` file from being shipped inside the npm tarball distribution
- **Electron Builder CVE Fix:** Bumped `electron-builder` to 26.8.1 to resolve `tar` CVEs in the desktop build pipeline

### 🔧 Maintenance & Infrastructure

- **DB Migration 021:** Added `combo_call_log_targets` migration for `combo_step_id` and `combo_execution_key` columns in call_logs
- **Combo CRUD Normalization:** `db/combos.ts` now normalizes all stored combo entries through the step normalization pipeline on read, ensuring consistent step IDs and kind annotations regardless of when the combo was created
- **Playwright Config:** Updated Playwright configuration and `run-next-playwright.mjs` script for improved E2E test orchestration
- **Build Script:** Updated `build-next-isolated.mjs` with additional reliability improvements
- **Auto-Combo UI Cleanup:** Deleted `AutoComboModal.tsx` (161 lines), replaced `auto-combo/page.tsx` (478→5 lines) with a server-side redirect to `/dashboard/combos?filter=intelligent`
- **Sidebar Consolidation:** Removed `"auto-combo"` from `HIDEABLE_SIDEBAR_ITEM_IDS` and `PRIMARY_SIDEBAR_ITEMS` — `normalizeHiddenSidebarItems()` silently discards any stale `"auto-combo"` entries in user settings
- **Schema Cleanup:** Removed obsolete `createAutoComboSchema` from `schemas.ts`. Exported `comboStrategySchema` for direct use in test and filter modules
- **A2A Agent Card Update:** Renamed skill ID from `auto-combo` to `intelligent-routing` with updated description referencing the unified combos dashboard
- **Builder Draft Refactor:** Extended `builderDraft.ts` with dynamic stage list generation via `getComboBuilderStages()` and `isIntelligentBuilderStrategy()`. Stage navigation (`getNextComboBuilderStage`, `getPreviousComboBuilderStage`, `canAccessComboBuilderStage`) now accepts options to conditionally include/skip the `intelligent` wizard step
- **i18n Consolidation:** Removed the standalone `"autoCombo"` i18n block (22 keys) from all 30 language files. Migrated keys into the `"combos"` block with new additions for filter tabs, intelligent panel, and builder step labels

### 🧪 Tests

- **16 New Test Suites:** Added comprehensive test coverage including:
  - `combo-builder-draft.test.mjs` (186 lines) — Builder draft step construction and validation
  - `combo-builder-options-route.test.mjs` (228 lines) — Builder options API endpoint
  - `combo-health-route.test.mjs` (266 lines) — Combo health analytics with per-target metrics
  - `combo-routes-composite-tiers.test.mjs` (157 lines) — Composite tiers API integration
  - `composite-tiers-validation.test.mjs` (131 lines) — Composite tier validation rules
  - `db-combos-crud.test.mjs` — Combo CRUD with step normalization
  - `db-core-init.test.mjs` (129 lines) — DB initialization and column migrations
  - `model-capabilities-registry.test.mjs` (105 lines) — Model capabilities resolution
  - `observability-payloads.test.mjs` (165 lines) — Health/telemetry payload construction
  - `openapi-spec-route.test.mjs` — OpenAPI spec generation
  - `proxy-e2e-mode.test.mjs` (74 lines) — E2E mode auth bypass
  - `quota-monitor.test.mjs` — Quota monitor lifecycle state
  - `run-next-playwright.test.mjs` (119 lines) — Playwright runner script
  - `sse-auth.test.mjs` (154 lines) — P2C credential selection and quota preflight
  - `telemetry-summary-route.test.mjs` (35 lines) — Telemetry summary endpoint
  - Plus updates to 12 existing test files for compatibility with new step architecture
- **Auto-Combo Unification Tests:**
  - `autocombo-unification.test.mjs` (156 lines) — Strategy categorization, schema deduplication, sidebar cleanup, and routing strategies metadata validation
  - `combo-unification.spec.ts` (189 lines) — Playwright E2E tests for filter tabs, intelligent panel rendering, redirect from old route, sidebar entry removal, and Builder v2 intelligent step flow
  - 3 new LKGP standalone tests in `combo-routing-engine.test.mjs` — Validates LKGP provider prioritization, fallback to priority when no state exists, and LKGP state persistence after successful requests
  - Updated `combo-builder-draft.test.mjs` with intelligent stage navigation tests
  - Updated `sidebar-visibility.test.mjs` to reflect `auto-combo` removal

---

## [3.6.3] — 2026-04-11

### ✨ New Features

- **feat(providers):** Implement Image Generation and Editing capabilities for ChatGPT Web, including in-band chat image generation and caching (#1606).
- **feat(ui):** Integrate OpenCode Zen/Go API tool logo SVG and polish API key copy-to-clipboard interactions (#1607).

- **feat(providers):** Integrate AgentRouter as a new OpenAI-compatible passthrough provider with $200 free credits via sign-up (Issue #1572).
- **feat(ui):** Implement on-demand per-model testing in the provider dashboard, allowing single-token diagnostic checks without triggering rate-limits (Issue #1532).

- **OpenAI-Compatible Loose Validation:** Empty API keys can now be naturally submitted and saved for any `openai-compatible-*` providers (e.g. Pollinations, localized routes) directly in the UI instead of blocking save actions (#1152)
- **Cloudflare Configuration:** Updated the provider schema and UI integration for Cloudflare AI to officially expose and support the backend `accountId` field securely without overrides (#1150)

### 🐛 Bug Fixes

- **fix(mitm):** Compile MITM utilities as NodeNext ESM during prepublish, copy the CommonJS MITM server into the standalone artifact, and resolve MITM data paths without relying on Next.js aliases in packaged runtime.
- **fix(build):** Move the local `.tmp/wine32` Wine prefix out of the isolated Next.js build path so Windows Electron packaging artifacts cannot trigger `EACCES` scans during Node 24 builds.
- **fix(build):** Copy the `wreq-js` native runtime directory into the isolated Next.js standalone output so packaged Playwright/E2E starts can load the instrumentation hook on Linux.
- **fix(api):** Validate the Codex Responses websocket bridge and `/v1/batches` JSON payloads with Zod before use, keeping `request.json()` route validation green and returning explicit 400 responses for invalid bodies.
- **fix(providers):** Add explicit typing to provider alias and category helpers so the strict `typecheck:noimplicit:core` CI gate passes.
- **fix(ui):** Keep the upstream proxy provider detail page labeled with a fallback "Managed via Upstream Proxy Settings" management surface when translations are unavailable.
- **fix(electron):** Harden the production desktop CSP by removing `unsafe-eval` outside development and adding object, base URI, form action, frame ancestor, and worker restrictions.
- **fix(cli):** Replace shell-interpolated setup and privileged command execution paths with argument-based `spawn`/`execFile` helpers for database setup, Tailscale sudo commands, MITM DNS edits, and certificate install/uninstall flows.
- **fix(ui):** Keep provider icons resilient by using direct `@lobehub/icons` components first, then local PNG/SVG fallbacks, avoiding the `@lobehub/ui` peer runtime in the dashboard.

- **Vertex JSON Validation Crash:** Prevented `invalid character in header` crashes inside the `/validate` endpoint by creating a native authentication parser that correctly handles Google Identity Service Account JSON flows prior to pinging endpoints (#1153)
- **Extraneous Payload Rejection:** Globally prevented upstream `400 Bad Request` execution crashes by stripping the non-standard `prompt_cache_retention` attribute forcibly attached by Cursor/Cline IDE engines when targeting strict OpenAI/Anthropic routes (#1154)
- **Reasoning Content Drop:** Prevented pure reasoning packets, common in advanced fallback models like DeepSeek, from being aborted mid-stream by explicitly adjusting the `Empty Content (502)` circuit breakers to acknowledge `reasoning_content` states as valid (#1155)
- **Desktop Windows Build Crash:** Fixed `better_sqlite3.node is not a valid Win32 application` preventing OmniRoute Desktop from launching on Windows by properly removing the ABI-mismatched sqlite cache from Next.js standalone and falling back to the cross-compiled Electron equivalent during packager build steps (#1163)
- **Login Visual Security:** Removed the raw fallback hash dump that artificially rendered underneath the login modal in Docker instances missing `OMNIROUTE_API_KEY_BASE64` flags (#1148)

### 🔧 Maintenance & Dependencies

- **Dependabot Updates:** Safely bumped GitHub Actions `docker/build-push-action` to v7 and `actions/download-artifact` to v8
- **Electron Updates:** Upgraded desktop wrapper core to Electron `41.2.0` and `electron-builder` to `26.8.1`, incorporating essential V8/Chromium security patches
- **NPM Package Groups:** Updated `production` and `development` NPM groups to securely handle minor audit warnings and keep toolchains modern
- **CI/CD Reliability:** Fixed persistent `Snyk` token-absence failures on automated pull requests by appropriately bypassing on dependabot actions

## [3.6.2] — 2026-04-11

### ✨ New Features

- **feat(providers):** Implement Image Generation and Editing capabilities for ChatGPT Web, including in-band chat image generation and caching (#1606).
- **feat(ui):** Integrate OpenCode Zen/Go API tool logo SVG and polish API key copy-to-clipboard interactions (#1607).

- **feat(providers):** Integrate AgentRouter as a new OpenAI-compatible passthrough provider with $200 free credits via sign-up (Issue #1572).
- **feat(ui):** Implement on-demand per-model testing in the provider dashboard, allowing single-token diagnostic checks without triggering rate-limits (Issue #1532).

- **33 New API Key Providers:** Massive provider expansion adding DeepInfra, Vercel AI Gateway, Lambda AI, SambaNova, nScale, OVHcloud AI, Baseten, PublicAI, Moonshot AI, Meta Llama API, v0 (Vercel), Morph, Featherless AI, FriendliAI, LlamaGate, Galadriel, Weights & Biases Inference, Volcengine, AI21 Labs, Venice.ai, Codestral, Upstage, Maritalk, Xiaomi MiMo, Inference.net, NanoGPT, Predibase, Bytez, Heroku AI, Databricks, Snowflake Cortex, and GigaChat (Sber). OmniRoute now supports **100+ providers** (4 Free + 8 OAuth + 91 API Key + Custom compatible)
- **Global Email Privacy Toggle:** Added a persistent eye-icon toggle button across all dashboard pages (Providers, Usage Limits, Playground) that reveals or hides masked email addresses. Toggle state is stored in localStorage and synced globally via Zustand store
- **Documentation Refresh:** Updated README, ARCHITECTURE, FEATURES, AGENTS.md, and API_REFERENCE for v3.6.2 with accurate provider counts (100+), new executor list, and system API documentation
- **Uninstall Guide:** Created comprehensive `docs/UNINSTALL.md` covering clean uninstallation for all deployment methods (npm, Docker, Electron, source)

### 🐛 Bug Fixes

- **fix(mitm):** Compile MITM utilities as NodeNext ESM during prepublish, copy the CommonJS MITM server into the standalone artifact, and resolve MITM data paths without relying on Next.js aliases in packaged runtime.
- **fix(build):** Move the local `.tmp/wine32` Wine prefix out of the isolated Next.js build path so Windows Electron packaging artifacts cannot trigger `EACCES` scans during Node 24 builds.
- **fix(build):** Copy the `wreq-js` native runtime directory into the isolated Next.js standalone output so packaged Playwright/E2E starts can load the instrumentation hook on Linux.
- **fix(api):** Validate the Codex Responses websocket bridge and `/v1/batches` JSON payloads with Zod before use, keeping `request.json()` route validation green and returning explicit 400 responses for invalid bodies.
- **fix(providers):** Add explicit typing to provider alias and category helpers so the strict `typecheck:noimplicit:core` CI gate passes.
- **fix(ui):** Keep the upstream proxy provider detail page labeled with a fallback "Managed via Upstream Proxy Settings" management surface when translations are unavailable.
- **fix(electron):** Harden the production desktop CSP by removing `unsafe-eval` outside development and adding object, base URI, form action, frame ancestor, and worker restrictions.
- **fix(cli):** Replace shell-interpolated setup and privileged command execution paths with argument-based `spawn`/`execFile` helpers for database setup, Tailscale sudo commands, MITM DNS edits, and certificate install/uninstall flows.
- **fix(ui):** Keep provider icons resilient by using direct `@lobehub/icons` components first, then local PNG/SVG fallbacks, avoiding the `@lobehub/ui` peer runtime in the dashboard.

- **PDF Attachments:** Unlocked deep string object parsing (`geminiHelper`) ensuring Gemini translation successfully passes complex PDF payloads from OpenAI-compatible streams without dropping them silently (#993)
- **SkillsMP Engine:** Corrected object extraction path mappings inside the API router to fix UI marketplace rendering under Docker/Standalone Node isolated deployments (#988)

---

## [3.6.1] — 2026-04-10

### ✨ New Features

- **feat(providers):** Implement Image Generation and Editing capabilities for ChatGPT Web, including in-band chat image generation and caching (#1606).
- **feat(ui):** Integrate OpenCode Zen/Go API tool logo SVG and polish API key copy-to-clipboard interactions (#1607).

- **feat(providers):** Integrate AgentRouter as a new OpenAI-compatible passthrough provider with $200 free credits via sign-up (Issue #1572).
- **feat(ui):** Implement on-demand per-model testing in the provider dashboard, allowing single-token diagnostic checks without triggering rate-limits (Issue #1532).

- **OAuth Env Repair Action:** Added a "Repair env" button to the OAuth Providers dashboard that detects and restores missing OAuth client IDs from `.env.example` — with timestamped backup and append-only safety. Includes full 33-language i18n support and sanitized API responses (#1116, by @yart)

### 🐛 Bug Fixes

- **fix(mitm):** Compile MITM utilities as NodeNext ESM during prepublish, copy the CommonJS MITM server into the standalone artifact, and resolve MITM data paths without relying on Next.js aliases in packaged runtime.
- **fix(build):** Move the local `.tmp/wine32` Wine prefix out of the isolated Next.js build path so Windows Electron packaging artifacts cannot trigger `EACCES` scans during Node 24 builds.
- **fix(build):** Copy the `wreq-js` native runtime directory into the isolated Next.js standalone output so packaged Playwright/E2E starts can load the instrumentation hook on Linux.
- **fix(api):** Validate the Codex Responses websocket bridge and `/v1/batches` JSON payloads with Zod before use, keeping `request.json()` route validation green and returning explicit 400 responses for invalid bodies.
- **fix(providers):** Add explicit typing to provider alias and category helpers so the strict `typecheck:noimplicit:core` CI gate passes.
- **fix(ui):** Keep the upstream proxy provider detail page labeled with a fallback "Managed via Upstream Proxy Settings" management surface when translations are unavailable.
- **fix(electron):** Harden the production desktop CSP by removing `unsafe-eval` outside development and adding object, base URI, form action, frame ancestor, and worker restrictions.
- **fix(cli):** Replace shell-interpolated setup and privileged command execution paths with argument-based `spawn`/`execFile` helpers for database setup, Tailscale sudo commands, MITM DNS edits, and certificate install/uninstall flows.
- **fix(ui):** Keep provider icons resilient by using direct `@lobehub/icons` components first, then local PNG/SVG fallbacks, avoiding the `@lobehub/ui` peer runtime in the dashboard.

- **i18n: Missing Provider Keys:** Added missing `filterModels`, `modelsActive`, `showModel`, `hideModel` keys across all 32 locale files, fixing runtime `MISSING_MESSAGE` errors in the providers UI. Also cleaned up duplicate keys in `en.json` (#1111, by @rilham97)
- **GPT-5.4 Routing:** Added missing `targetFormat: "openai-responses"` to `gpt-5.4` and `gpt-5.4-mini` models in both the Codex and GitHub Copilot providers, fixing `[400]: model not accessible via /chat/completions` errors (#1114, by @ask33r)

---

## [3.6.0] — 2026-04-10

### ✨ New Features & Analytics

- **feat(providers):** Implement Image Generation and Editing capabilities for ChatGPT Web, including in-band chat image generation and caching (#1606).
- **feat(ui):** Integrate OpenCode Zen/Go API tool logo SVG and polish API key copy-to-clipboard interactions (#1607).

- **feat(providers):** Integrate AgentRouter as a new OpenAI-compatible passthrough provider with $200 free credits via sign-up (Issue #1572).
- **feat(ui):** Implement on-demand per-model testing in the provider dashboard, allowing single-token diagnostic checks without triggering rate-limits (Issue #1532).

- **Combo Smoke Test:** Raised the default token budget to 2048 to prevent truncation of thinking models during preflight checks, and fully randomized the arithmetic probe prompt to bypass deterministic caching from upstream relays (#1105)

### 🐛 Bug Fixes & Compliance

- **fix(mitm):** Compile MITM utilities as NodeNext ESM during prepublish, copy the CommonJS MITM server into the standalone artifact, and resolve MITM data paths without relying on Next.js aliases in packaged runtime.
- **fix(build):** Move the local `.tmp/wine32` Wine prefix out of the isolated Next.js build path so Windows Electron packaging artifacts cannot trigger `EACCES` scans during Node 24 builds.
- **fix(build):** Copy the `wreq-js` native runtime directory into the isolated Next.js standalone output so packaged Playwright/E2E starts can load the instrumentation hook on Linux.
- **fix(api):** Validate the Codex Responses websocket bridge and `/v1/batches` JSON payloads with Zod before use, keeping `request.json()` route validation green and returning explicit 400 responses for invalid bodies.
- **fix(providers):** Add explicit typing to provider alias and category helpers so the strict `typecheck:noimplicit:core` CI gate passes.
- **fix(ui):** Keep the upstream proxy provider detail page labeled with a fallback "Managed via Upstream Proxy Settings" management surface when translations are unavailable.
- **fix(electron):** Harden the production desktop CSP by removing `unsafe-eval` outside development and adding object, base URI, form action, frame ancestor, and worker restrictions.
- **fix(cli):** Replace shell-interpolated setup and privileged command execution paths with argument-based `spawn`/`execFile` helpers for database setup, Tailscale sudo commands, MITM DNS edits, and certificate install/uninstall flows.
- **fix(ui):** Keep provider icons resilient by using direct `@lobehub/icons` components first, then local PNG/SVG fallbacks, avoiding the `@lobehub/ui` peer runtime in the dashboard.

- **DB Bloat / Row Limits:** Added `CALL_LOGS_TABLE_MAX_ROWS` and `PROXY_LOGS_TABLE_MAX_ROWS` (default: 100,000) to the backend DB compliance cleaner to prevent runaway SQLite growth. Limits are enforced automatically on the TTL cycle (#1104, fixes #1101)
- **HTML Error Handling:** The router now correctly identifies unexpected HTML responses (e.g. `<!DOCTYPE html>`) sent by upstream providers (like Azure/Copilot) instead of throwing obscure `Unexpected token '<'` JSON parse errors, bubbling up a clean 502 Bad Gateway (#1104, fixes #1066)
- **Android/Termux SQLite Native Support:** `better-sqlite3` is now correctly built from source with cross-compilation flags in ARM64 local Termux deployments without failing on missing prebuilt binaries (#1107)

---

## [3.5.9] — 2026-04-09

### ✨ New Features

- **feat(providers):** Implement Image Generation and Editing capabilities for ChatGPT Web, including in-band chat image generation and caching (#1606).
- **feat(ui):** Integrate OpenCode Zen/Go API tool logo SVG and polish API key copy-to-clipboard interactions (#1607).

- **feat(providers):** Integrate AgentRouter as a new OpenAI-compatible passthrough provider with $200 free credits via sign-up (Issue #1572).
- **feat(ui):** Implement on-demand per-model testing in the provider dashboard, allowing single-token diagnostic checks without triggering rate-limits (Issue #1532).

- **Persistent Combo Ordering:** Drag combo cards by handle to reorder them in the dashboard; order is persisted to SQLite via a new `sort_order` column and `POST /api/combos/reorder` endpoint. Includes DB migration `020_combo_sort_order.sql` and JSON import preservation (#1095)
- **Sidebar Group Reorder:** Moved "Logs" before "Health" in the System section and "Limits & Quotas" after "Cache" in the Primary section for a more logical navigation flow (#1095)

### 🐛 Bug Fixes

- **fix(mitm):** Compile MITM utilities as NodeNext ESM during prepublish, copy the CommonJS MITM server into the standalone artifact, and resolve MITM data paths without relying on Next.js aliases in packaged runtime.
- **fix(build):** Move the local `.tmp/wine32` Wine prefix out of the isolated Next.js build path so Windows Electron packaging artifacts cannot trigger `EACCES` scans during Node 24 builds.
- **fix(build):** Copy the `wreq-js` native runtime directory into the isolated Next.js standalone output so packaged Playwright/E2E starts can load the instrumentation hook on Linux.
- **fix(api):** Validate the Codex Responses websocket bridge and `/v1/batches` JSON payloads with Zod before use, keeping `request.json()` route validation green and returning explicit 400 responses for invalid bodies.
- **fix(providers):** Add explicit typing to provider alias and category helpers so the strict `typecheck:noimplicit:core` CI gate passes.
- **fix(ui):** Keep the upstream proxy provider detail page labeled with a fallback "Managed via Upstream Proxy Settings" management surface when translations are unavailable.
- **fix(electron):** Harden the production desktop CSP by removing `unsafe-eval` outside development and adding object, base URI, form action, frame ancestor, and worker restrictions.
- **fix(cli):** Replace shell-interpolated setup and privileged command execution paths with argument-based `spawn`/`execFile` helpers for database setup, Tailscale sudo commands, MITM DNS edits, and certificate install/uninstall flows.
- **fix(ui):** Keep provider icons resilient by using direct `@lobehub/icons` components first, then local PNG/SVG fallbacks, avoiding the `@lobehub/ui` peer runtime in the dashboard.

- **Stream Failure Surfacing:** Upstream `response.failed` events (e.g. Codex rate-limit errors) are now properly surfaced as non-200 errors instead of being silently swallowed as empty 200 OK streams. Rate-limit failures return HTTP 429 (#1098, closes #1093)
- **Upstream Model Preservation:** The Responses-to-OpenAI stream translator now preserves the actual upstream model (e.g. `gpt-5.4`) instead of hardcoding a `gpt-4` fallback (#1098, closes #1094)
- **Docker EXDEV Fix:** `build-next-isolated.mjs` now falls back from `fs.rename()` to `cp/rm` when Docker buildx raises `EXDEV` (cross-device link), unblocking the Docker image publish workflow (#1097)
- **macOS CLI Path Resolution:** `cliRuntime.ts` resolves symlink parents with `fs.realpath()` to handle macOS `/var` → `/private/var` chains, preventing false `symlink_escape` rejections (#1097)
- **Request Log Token Layout:** Split token badges into separate Input (Total In, Cache Read, Cache Write) and Output (Total Out, Reasoning) groups for clearer readability; renamed "Time" label to "Completed Time" (#1096)

---

## [3.5.8] — 2026-04-09

### ✨ New Features & Analytics

- **feat(providers):** Implement Image Generation and Editing capabilities for ChatGPT Web, including in-band chat image generation and caching (#1606).
- **feat(ui):** Integrate OpenCode Zen/Go API tool logo SVG and polish API key copy-to-clipboard interactions (#1607).

- **feat(providers):** Integrate AgentRouter as a new OpenAI-compatible passthrough provider with $200 free credits via sign-up (Issue #1572).
- **feat(ui):** Implement on-demand per-model testing in the provider dashboard, allowing single-token diagnostic checks without triggering rate-limits (Issue #1532).

- **Analytics Layout Redesign:** Replaced flat metrics with a responsive `CompactStatGrid`, grouping data visually across sections (#1089)

### 🐛 Bug Fixes

- **fix(mitm):** Compile MITM utilities as NodeNext ESM during prepublish, copy the CommonJS MITM server into the standalone artifact, and resolve MITM data paths without relying on Next.js aliases in packaged runtime.
- **fix(build):** Move the local `.tmp/wine32` Wine prefix out of the isolated Next.js build path so Windows Electron packaging artifacts cannot trigger `EACCES` scans during Node 24 builds.
- **fix(build):** Copy the `wreq-js` native runtime directory into the isolated Next.js standalone output so packaged Playwright/E2E starts can load the instrumentation hook on Linux.
- **fix(api):** Validate the Codex Responses websocket bridge and `/v1/batches` JSON payloads with Zod before use, keeping `request.json()` route validation green and returning explicit 400 responses for invalid bodies.
- **fix(providers):** Add explicit typing to provider alias and category helpers so the strict `typecheck:noimplicit:core` CI gate passes.
- **fix(ui):** Keep the upstream proxy provider detail page labeled with a fallback "Managed via Upstream Proxy Settings" management surface when translations are unavailable.
- **fix(electron):** Harden the production desktop CSP by removing `unsafe-eval` outside development and adding object, base URI, form action, frame ancestor, and worker restrictions.
- **fix(cli):** Replace shell-interpolated setup and privileged command execution paths with argument-based `spawn`/`execFile` helpers for database setup, Tailscale sudo commands, MITM DNS edits, and certificate install/uninstall flows.
- **fix(ui):** Keep provider icons resilient by using direct `@lobehub/icons` components first, then local PNG/SVG fallbacks, avoiding the `@lobehub/ui` peer runtime in the dashboard.

- **Build Core:** Force Turbopack cleanup via Prepbulish script to prevent Next.js 16 app/ routing conflicts on runtime.
- **Provider Quarantine:** Introduces model/provider circuit-breakers with adaptive TTL exponential backoff for recurring upstream errors (#1090)
- **Oauth Keep-Alive:** Safely protects authenticated active accounts against spontaneous dropping from router due to transient token refresh failures (#1085)

### 🔒 Security & Maintenance

- **Dependabot:** bumped axios from 1.14.0 to 1.15.0 addressing SSRF flags (#1088)

---

## [3.5.7] — 2026-04-09

### 🐛 Bug Fixes & Security

- **fix(mitm):** Compile MITM utilities as NodeNext ESM during prepublish, copy the CommonJS MITM server into the standalone artifact, and resolve MITM data paths without relying on Next.js aliases in packaged runtime.
- **fix(build):** Move the local `.tmp/wine32` Wine prefix out of the isolated Next.js build path so Windows Electron packaging artifacts cannot trigger `EACCES` scans during Node 24 builds.
- **fix(build):** Copy the `wreq-js` native runtime directory into the isolated Next.js standalone output so packaged Playwright/E2E starts can load the instrumentation hook on Linux.
- **fix(api):** Validate the Codex Responses websocket bridge and `/v1/batches` JSON payloads with Zod before use, keeping `request.json()` route validation green and returning explicit 400 responses for invalid bodies.
- **fix(providers):** Add explicit typing to provider alias and category helpers so the strict `typecheck:noimplicit:core` CI gate passes.
- **fix(ui):** Keep the upstream proxy provider detail page labeled with a fallback "Managed via Upstream Proxy Settings" management surface when translations are unavailable.
- **fix(electron):** Harden the production desktop CSP by removing `unsafe-eval` outside development and adding object, base URI, form action, frame ancestor, and worker restrictions.
- **fix(cli):** Replace shell-interpolated setup and privileged command execution paths with argument-based `spawn`/`execFile` helpers for database setup, Tailscale sudo commands, MITM DNS edits, and certificate install/uninstall flows.
- **fix(ui):** Keep provider icons resilient by using direct `@lobehub/icons` components first, then local PNG/SVG fallbacks, avoiding the `@lobehub/ui` peer runtime in the dashboard.

- **Turbopack Standalone Chunks:** Fixed a critical bug in `scripts/prepublish.mjs` where Turbopack chunks missing from the `.next/standalone` trace resulted in a `500 ChunkLoadError` (e.g., `_not-found` page crash) during production deployments via NPM or Docker. Standalone chunks are now explicitly copied and correctly stripped of Turbopack hashes.

---

## [3.5.6] — 2026-04-09

### ✨ New Features

- **feat(providers):** Implement Image Generation and Editing capabilities for ChatGPT Web, including in-band chat image generation and caching (#1606).
- **feat(ui):** Integrate OpenCode Zen/Go API tool logo SVG and polish API key copy-to-clipboard interactions (#1607).

- **feat(providers):** Integrate AgentRouter as a new OpenAI-compatible passthrough provider with $200 free credits via sign-up (Issue #1572).
- **feat(ui):** Implement on-demand per-model testing in the provider dashboard, allowing single-token diagnostic checks without triggering rate-limits (Issue #1532).

- **Email Privacy Masking:** OAuth account emails are now masked in the provider dashboard (e.g. `di*****@g****.com`) to prevent accidental exposure when sharing screenshots. Full address visible on hover via `title` attribute (#1025).
- **OpenRouter & GitHub in Embedding/Image Registries:** OpenRouter (3 embedding models, 4 image models) and GitHub Models (2 embedding models via Azure inference) are now first-class entries in the provider registries, enabling their use for `/v1/embeddings` and `/v1/images/generations` (#960).
- **Model Visibility Toggle & Search Filter:** The provider page model list now includes a real-time search/filter bar and a per-model visibility toggle (👁 icon). Hidden models are grayed out and excluded from the `/v1/models` catalog. An active-count badge (`N/M active`) shows at a glance how many models are enabled (#750).
- **Chinese Localization (zh-CN):** Added missing translations for Context Relay, Memory, LKGP, and Models.dev sync features, while standardizing terminology across the application (#1079).
- **Environment Auto-Sync:** Added `sync-env.mjs` to auto-generate and append `.env` from `.env.example` during installation, automatically generating cryptographic secrets on first run.
- **Source Mode Dashboard Update:** Fixed real-time Source (git-checkout) updating in the dashboard, enabling secure, real-time update pipelines for non-NPM installations.

### 🐛 Bug Fixes & Security

- **fix(mitm):** Compile MITM utilities as NodeNext ESM during prepublish, copy the CommonJS MITM server into the standalone artifact, and resolve MITM data paths without relying on Next.js aliases in packaged runtime.
- **fix(build):** Move the local `.tmp/wine32` Wine prefix out of the isolated Next.js build path so Windows Electron packaging artifacts cannot trigger `EACCES` scans during Node 24 builds.
- **fix(build):** Copy the `wreq-js` native runtime directory into the isolated Next.js standalone output so packaged Playwright/E2E starts can load the instrumentation hook on Linux.
- **fix(api):** Validate the Codex Responses websocket bridge and `/v1/batches` JSON payloads with Zod before use, keeping `request.json()` route validation green and returning explicit 400 responses for invalid bodies.
- **fix(providers):** Add explicit typing to provider alias and category helpers so the strict `typecheck:noimplicit:core` CI gate passes.
- **fix(ui):** Keep the upstream proxy provider detail page labeled with a fallback "Managed via Upstream Proxy Settings" management surface when translations are unavailable.
- **fix(electron):** Harden the production desktop CSP by removing `unsafe-eval` outside development and adding object, base URI, form action, frame ancestor, and worker restrictions.
- **fix(cli):** Replace shell-interpolated setup and privileged command execution paths with argument-based `spawn`/`execFile` helpers for database setup, Tailscale sudo commands, MITM DNS edits, and certificate install/uninstall flows.
- **fix(ui):** Keep provider icons resilient by using direct `@lobehub/icons` components first, then local PNG/SVG fallbacks, avoiding the `@lobehub/ui` peer runtime in the dashboard.

- **Hardcoded Secret Cleanup:** Removed 12 hardcoded OAuth credential fallbacks from the source code, forcing secure reliance on environment variables and resolving static analysis security alerts.
- **Next.js Security Patch:** Bumped `next` from 16.2.2 to 16.2.3 to resolve critical RSC deserialization RCE vulnerability (SNYK-JS-NEXT-15954202).
- **Memory/Cache UI Crash:** Added null-safety guards (`?? 0`) to `.toLocaleString()` calls in Memory and Cache dashboard pages, preventing `TypeError` crashes when database tables are empty or contain null numeric values (#1083).
- **WebSearch tool_choice Translation:** Fixed OpenAI-to-Claude translator dropping `tool_choice` objects with `type: "function"` as-is, which Claude rejects. Now properly maps all OpenAI `tool_choice` variants (`function`, `required`, `none`) to Claude-compatible format (`tool`, `any`, `auto`), fixing "Did 0 searches" in Claude Code WebSearch (#1072).
- **Provider Validation baseUrl Override:** Added `baseUrl` passthrough from frontend validation requests to the backend validation endpoint. Chinese-site users of Alibaba Coding Plan (bailian-coding-plan) can now validate API keys against their custom Base URL instead of always hitting the international endpoint (#1078).
- **Minimax Auth Header:** Switched Minimax provider from `x-api-key` to `Authorization: Bearer` header format, matching the current API spec (#1076).
- **Native Fetch Fallback:** Added graceful fallback to native `fetch` when the `undici` dispatcher fails, improving resilience in environments where undici is unavailable (#1054).
- **EPIPE Flood Fix:** Added circuit-breaker logic to prevent EPIPE errors from creating a feedback loop that fills logs at GB/s (#1006).
- **Qoder PAT Validation:** Improved Qoder Personal Access Token validation with actionable error messages that guide users to the correct token format (#966).
- **CI/CD Pipeline:** Fixed `check:docs-sync` failure by syncing OpenAPI version to 3.5.6 and finalizing CHANGELOG release heading. Commented out `DATA_DIR` in `.env.example` to prevent E2E test failures in CI runners lacking root permissions.

### 🌍 i18n

- **Auto Language Generation (CI):** Added CI pipeline to auto-generate missing language files and strings via `feat(CI,i18n)` workflow, covering 30+ locales (#1071).

---

## [3.5.5] — 2026-04-08

### ✨ New Features

- **feat(providers):** Implement Image Generation and Editing capabilities for ChatGPT Web, including in-band chat image generation and caching (#1606).
- **feat(ui):** Integrate OpenCode Zen/Go API tool logo SVG and polish API key copy-to-clipboard interactions (#1607).

- **feat(providers):** Integrate AgentRouter as a new OpenAI-compatible passthrough provider with $200 free credits via sign-up (Issue #1572).
- **feat(ui):** Implement on-demand per-model testing in the provider dashboard, allowing single-token diagnostic checks without triggering rate-limits (Issue #1532).

- **Node.js 24 Compatibility Warning:** Added a proactive version incompatibility warning on the login page to guide users to the stable Node.js 22 LTS, preventing native sqlite binding crashes.
- **Context Relay Combo Strategy:** Added the new `context-relay` combo strategy with priority-style routing, structured handoff summary generation once quota usage reaches the warning threshold, and handoff injection after the next real account switch.
- **Global Context Relay Defaults:** Added global Settings defaults plus combo-level configuration for `handoffThreshold`, `handoffModel`, and `handoffProviders`, so new or unconfigured combos can inherit the feature consistently.

### 🐛 Bug Fixes

- **fix(mitm):** Compile MITM utilities as NodeNext ESM during prepublish, copy the CommonJS MITM server into the standalone artifact, and resolve MITM data paths without relying on Next.js aliases in packaged runtime.
- **fix(build):** Move the local `.tmp/wine32` Wine prefix out of the isolated Next.js build path so Windows Electron packaging artifacts cannot trigger `EACCES` scans during Node 24 builds.
- **fix(build):** Copy the `wreq-js` native runtime directory into the isolated Next.js standalone output so packaged Playwright/E2E starts can load the instrumentation hook on Linux.
- **fix(api):** Validate the Codex Responses websocket bridge and `/v1/batches` JSON payloads with Zod before use, keeping `request.json()` route validation green and returning explicit 400 responses for invalid bodies.
- **fix(providers):** Add explicit typing to provider alias and category helpers so the strict `typecheck:noimplicit:core` CI gate passes.
- **fix(ui):** Keep the upstream proxy provider detail page labeled with a fallback "Managed via Upstream Proxy Settings" management surface when translations are unavailable.
- **fix(electron):** Harden the production desktop CSP by removing `unsafe-eval` outside development and adding object, base URI, form action, frame ancestor, and worker restrictions.
- **fix(cli):** Replace shell-interpolated setup and privileged command execution paths with argument-based `spawn`/`execFile` helpers for database setup, Tailscale sudo commands, MITM DNS edits, and certificate install/uninstall flows.
- **fix(ui):** Keep provider icons resilient by using direct `@lobehub/icons` components first, then local PNG/SVG fallbacks, avoiding the `@lobehub/ui` peer runtime in the dashboard.

- **Proxy Connection Healthchecks:** Applied proxy resolution per connection in the sweeping loop (`tokenHealthCheck.ts`) and global provider validation sweeps, resolving Node 22 bypass and improving proxy stability (#1051, #1056, #1061).
- **Security Vulnerability Remediation:** Resolved multiple CodeQL scanning alerts including SSRF in model sync, insecure randomness in web crypto (`generateSessionId`), and incomplete URL sanitization.
- **Context Relay Typing & Synchronization:** Reverted out-of-scope test breakages and resolved `handoffProvider` and response `input` extraction payload typing.
- **Legacy OpenAI-Compatible Responses Routing:** Fixed legacy/imported OpenAI-compatible providers (for example `openai-compatible-sp-openai`) incorrectly routing Chat Completions traffic to `/chat/completions` when the real provider node was configured as `apiType: "responses"`. OmniRoute now treats `providerSpecificData.apiType` as authoritative across routing, executors, and translator tools, avoiding false empty-content failures during combo/provider smoke tests (#1069).
- **Gemini PDF Attachment Integration:** Fixed payload generation and format for parsing `inline_data` and generic base64 sources for deep Gemini PDF routing (#993, #1021).
- **Vercel AI SDK Fallbacks:** Mapped `max_output_tokens` to `max_tokens` for strict OpenAI-compatible providers, resolving errors from standard AI agents and frameworks (#994).
- **External Auth & UI Reliability:** Handled null `state` failures in Cline OAuth exchange (#1016), added 3rd-party 400 error patterns to combo fallback (#1024), and resolved desktop sidebar layout and popover overflows (#1039, #1001).
- **Context Relay In-Flight Deduplication:** Prevented duplicate handoff generation for the same session/combo while an earlier summary request is still in flight.
- **Context Relay Provider Gating:** Aligned runtime behavior with configuration so explicit `handoffProviders` exclusions, including an empty array, now disable handoff generation as expected.

### 🛠️ Maintenance & Dependabot

- **Updated Sub-dependencies:** Bumped `hono` to `4.12.12` and `@hono/node-server` to `1.19.13` to patch critical security gaps (#1063, #1064, #1067, #1068).

### Dokumentation

- **Documentation Synchronization:** Updated system documentation (README, Architecture, Features, Tools, Troubleshooting) and synced `i18n` configurations to match the v3.5.5 context relay patterns and proxy troubleshooting steps.
- **Context Relay Delivery Notes:** Documented the current architecture, runtime flow, and Codex-focused scope in the feature docs, changelog, and agent guidance.

---

## [3.5.4] — 2026-04-07

### ✨ New Features

- **feat(providers):** Implement Image Generation and Editing capabilities for ChatGPT Web, including in-band chat image generation and caching (#1606).
- **feat(ui):** Integrate OpenCode Zen/Go API tool logo SVG and polish API key copy-to-clipboard interactions (#1607).

- **feat(providers):** Integrate AgentRouter as a new OpenAI-compatible passthrough provider with $200 free credits via sign-up (Issue #1572).
- **feat(ui):** Implement on-demand per-model testing in the provider dashboard, allowing single-token diagnostic checks without triggering rate-limits (Issue #1532).

- **Detailed Token Tracking:** Added granular token breakdown columns (cache read, cache write, reasoning) to call logs with proper null vs zero distinction. Includes DB migration 018 and 5-label UI display per provider capability (#1017 — thanks @rdself).
- **Legacy JSON Config Import/Export:** Restored JSON-based settings export and import for migration from legacy 9router configurations. Security-hardened with Zero-Trust redaction of passwords and `requireLogin` fields, and automatic pre-import database backups (#1012 — thanks @luandiasrj).
- **Non-Stream Aliases:** Added API support for explicit non-streaming aliases (`non_stream`, `disable_stream`, `disable_streaming`, `streaming=false`), normalized at the boundary before provider translation (#1036 — thanks @wlfonseca).
- **Russian Dashboard Localization:** Comprehensive Russian translation for the dashboard UI, including fixes for 2 Ukrainian locale keys (#1003 — thanks @mercs2910).

### 🐛 Bug Fixes

- **fix(mitm):** Compile MITM utilities as NodeNext ESM during prepublish, copy the CommonJS MITM server into the standalone artifact, and resolve MITM data paths without relying on Next.js aliases in packaged runtime.
- **fix(build):** Move the local `.tmp/wine32` Wine prefix out of the isolated Next.js build path so Windows Electron packaging artifacts cannot trigger `EACCES` scans during Node 24 builds.
- **fix(build):** Copy the `wreq-js` native runtime directory into the isolated Next.js standalone output so packaged Playwright/E2E starts can load the instrumentation hook on Linux.
- **fix(api):** Validate the Codex Responses websocket bridge and `/v1/batches` JSON payloads with Zod before use, keeping `request.json()` route validation green and returning explicit 400 responses for invalid bodies.
- **fix(providers):** Add explicit typing to provider alias and category helpers so the strict `typecheck:noimplicit:core` CI gate passes.
- **fix(ui):** Keep the upstream proxy provider detail page labeled with a fallback "Managed via Upstream Proxy Settings" management surface when translations are unavailable.
- **fix(electron):** Harden the production desktop CSP by removing `unsafe-eval` outside development and adding object, base URI, form action, frame ancestor, and worker restrictions.
- **fix(cli):** Replace shell-interpolated setup and privileged command execution paths with argument-based `spawn`/`execFile` helpers for database setup, Tailscale sudo commands, MITM DNS edits, and certificate install/uninstall flows.
- **fix(ui):** Keep provider icons resilient by using direct `@lobehub/icons` components first, then local PNG/SVG fallbacks, avoiding the `@lobehub/ui` peer runtime in the dashboard.

- **Anthropic Streaming Input Undercount:** Fixed a critical bug where Anthropic streaming `prompt_tokens` only reported non-cached tokens (e.g., `in=3` when actual total was 113,616). Cache tokens are now summed into prompt_tokens during streaming (#1017).
- **Built-in Responses API Tool Types:** Preserved built-in Responses API tools (`web_search`, `file_search`, `computer`, `code_interpreter`, `image_generation`) from being silently stripped by the empty-name tool filter — these tools carry no `.name` field (#1014 — thanks @rdself).
- **Cursor/Codex Responses Compatibility:** Fixed empty output in Cursor when using Codex models by hoisting system input items to `instructions`, sanitizing invalid tool names, and detecting Responses-format payloads on chat/completions endpoint (#1002 — thanks @mercs2910).
- **OAuth Token Expiry Display:** Fixed OAuth connections showing "expired" badge even with valid tokens by reading `tokenExpiresAt` (updated on refresh) instead of `expiresAt` (original grant timestamp) (#1032 — thanks @tombii).
- **Codex Fast-Tier Copy:** Corrected dashboard settings copy from `service_tier=fast` to `service_tier=priority`, matching the actual Codex wire format (#1045 — thanks @kfiramar).
- **macOS Desktop App Startup:** Stabilized packaged macOS app launch by excluding desktop artifacts from the standalone bundle and improving launch path detection (#1004 — thanks @mercs2910).
- **macOS Sidebar Layout:** Fixed macOS traffic light overlap, sidebar spacing, and button overflow in the Electron desktop app (#1001 — thanks @mercs2910).

### ⚡ Performance

- **Analytics Page Load:** Dramatically reduced analytics page load times (30s→1-2s for 50K entries) via date-filtered DB queries, parallel `Promise.all()` cost calculations, and merged 6 COUNT queries into a single CASE WHEN aggregate (#1038 — thanks @oyi77).

### 🔒 Security & Dependencies

- **Node Base Image:** Upgraded Docker base from `22-bookworm-slim` to `22.22.2-trixie-slim` (#1011 — Snyk).
- **Production Dependencies:** Bumped 5 production dependencies (#1044 — Dependabot).
- **Vite:** Bumped from 8.0.3 to 8.0.5 (#1031 — Dependabot).
- **Development Dependencies:** Bumped 4 development dependencies (#1030 — Dependabot).

### 🧪 Tests

- **Token Accounting Tests:** Added 18 new unit tests covering detailed token breakdown, null vs zero semantics, per-provider token extraction, and Anthropic streaming input fix (#1017).
- **Built-in Tool Tests:** Added 3 new test cases for built-in Responses API tool type preservation (#1014).
- **ChatCore Sanitization:** Updated sanitization tests to accommodate Responses format detection (PR #1002) and built-in tool preservation (PR #1014).

### 🛠️ Maintenance

- **PR Workflow:** Updated `/review-prs` workflow to merge PRs into the release branch (`release/vX.Y.Z`) instead of directly into `main`, ensuring proper pre-release staging.

### Coverage

- **2537 tests, 2532 passing** — Statement coverage: 91.95%, Branch coverage: 78.79%, Function coverage: 93.19%

## [3.5.3] - 2026-04-07

### Sicherheit

- **Vulnerabilities:** Fully remediated 12 High-Severity CodeQL vulnerabilities by migrating from Math.random to `crypto.randomUUID()`, wrapping SSE injection points with aggressive backslash escaping, sanitizing trailing HTTP fragments, and enforcing rigid SSRF HTTP verification schemes across internal routes.
- **Dependencies:** Upgraded Next.js to `^16.2.2` and Vite to `>=8.0.5` resolving critical DoS, arbitrary file reads and CSRF vectors in the build/server environments.

### Fixed

- **E2E Stability:** Eliminated extreme CI unreliability and transient test timeouts (Playwright) by propagating internal standalone `_next/static` assets properly and refactoring deep UI interactions inside defensive `expect().toPass()` loops.
- **Middleware:** Resolved infinite redirect loop on dashboard for fresh instances when requireLogin is disabled.
- **Core Fallbacks:** Preserved primary failure contexts and enhanced Edge-case error handling pipelines across chat and fallback loops.
- **Proxy/Hooks:** Optimized local git hooks, normalized token coverage endpoints into `/coverage`, and guarded GLM region lookups.

### 🛠️ Maintenance

- **CI/CD Stabilization:** Prevented random GitHub Runner freezes by decoupling sharded processes, adjusting test concurrencies, unref-ing active connections on server teardown, and strictly capping job timeout durations.

### Dokumentation

- **I18n Engine:** Synchronized and pushed deep Machine Translation updates across all 32 natively-supported languages (682 translation nodes aligned).

### Coverage

- **Testing:** Consolidated the workspace test coverage framework hitting 92.1% statement line coverage, with new rigid unit-tests matching API key policies and tool scopes.

---

## [3.5.2] — 2026-04-05

### ✨ New Features

- **feat(providers):** Implement Image Generation and Editing capabilities for ChatGPT Web, including in-band chat image generation and caching (#1606).
- **feat(ui):** Integrate OpenCode Zen/Go API tool logo SVG and polish API key copy-to-clipboard interactions (#1607).

- **feat(providers):** Integrate AgentRouter as a new OpenAI-compatible passthrough provider with $200 free credits via sign-up (Issue #1572).
- **feat(ui):** Implement on-demand per-model testing in the provider dashboard, allowing single-token diagnostic checks without triggering rate-limits (Issue #1532).

- **Qoder API Native Integration:** Completely refactored the Qoder Executor to bypass the legacy COSY AES/RSA encryption algorithm, routing directly into the native DashScope OpenAi-compatible URL. Eliminates complex dependencies on Node `crypto` modules while improving stream fidelity.
- **Resilience Engine Overhaul:** Integrated context overflow graceful fallbacks, proactive OAuth token detection, and empty-content emission prevention (#990).
- **Context-Optimized Routing Strategy:** Added new intelligent routing capability to natively maximize context windows in automated combo deployments (#990).

### 🐛 Bug Fixes

- **fix(mitm):** Compile MITM utilities as NodeNext ESM during prepublish, copy the CommonJS MITM server into the standalone artifact, and resolve MITM data paths without relying on Next.js aliases in packaged runtime.
- **fix(build):** Move the local `.tmp/wine32` Wine prefix out of the isolated Next.js build path so Windows Electron packaging artifacts cannot trigger `EACCES` scans during Node 24 builds.
- **fix(build):** Copy the `wreq-js` native runtime directory into the isolated Next.js standalone output so packaged Playwright/E2E starts can load the instrumentation hook on Linux.
- **fix(api):** Validate the Codex Responses websocket bridge and `/v1/batches` JSON payloads with Zod before use, keeping `request.json()` route validation green and returning explicit 400 responses for invalid bodies.
- **fix(providers):** Add explicit typing to provider alias and category helpers so the strict `typecheck:noimplicit:core` CI gate passes.
- **fix(ui):** Keep the upstream proxy provider detail page labeled with a fallback "Managed via Upstream Proxy Settings" management surface when translations are unavailable.
- **fix(electron):** Harden the production desktop CSP by removing `unsafe-eval` outside development and adding object, base URI, form action, frame ancestor, and worker restrictions.
- **fix(cli):** Replace shell-interpolated setup and privileged command execution paths with argument-based `spawn`/`execFile` helpers for database setup, Tailscale sudo commands, MITM DNS edits, and certificate install/uninstall flows.
- **fix(ui):** Keep provider icons resilient by using direct `@lobehub/icons` components first, then local PNG/SVG fallbacks, avoiding the `@lobehub/ui` peer runtime in the dashboard.

- **Responses API Stream Corruption:** Fixed deep-cloning corruption where Anthropic/OpenAI translation boundaries stripped `response.` specific SSE prefixes from streaming boundaries (#992).
- **Claude Cache Passthrough Alignment:** Aligned CC-Compatible cache markers consistently with upstream Client Pass-Through mode preserving prompt caching.
- **Turbopack Memory Leak:** Pinned Next.js to strict `16.0.10` preventing memory leaks and build staleness from recent upstream Turbopack hashed module regressions (#987).

---

## [3.5.1] — 2026-04-04

### ✨ New Features

- **feat(providers):** Implement Image Generation and Editing capabilities for ChatGPT Web, including in-band chat image generation and caching (#1606).
- **feat(ui):** Integrate OpenCode Zen/Go API tool logo SVG and polish API key copy-to-clipboard interactions (#1607).

- **feat(providers):** Integrate AgentRouter as a new OpenAI-compatible passthrough provider with $200 free credits via sign-up (Issue #1572).
- **feat(ui):** Implement on-demand per-model testing in the provider dashboard, allowing single-token diagnostic checks without triggering rate-limits (Issue #1532).

- **Models.dev Integration:** Integrated models.dev as the authoritative runtime source for model pricing, capabilities, and specifications, overriding hardcoded prices. Includes a settings UI to manage sync intervals, translation strings for all 30 languages, and robust test coverage.
- **Provider Native Capabilities:** Added support for declaring and checking native API features (e.g. `systemInstructions_supported`) preventing failures by sanitizing invalid roles. Currently configured for Gemini Base and Antigravity OAuth providers.
- **API Provider Advanced Settings:** Added per-connection custom `User-Agent` overrides for API-key provider connections. The override is stored in `providerSpecificData.customUserAgent` and now applies to validation probes and upstream execution requests.

### 🐛 Bug Fixes

- **fix(mitm):** Compile MITM utilities as NodeNext ESM during prepublish, copy the CommonJS MITM server into the standalone artifact, and resolve MITM data paths without relying on Next.js aliases in packaged runtime.
- **fix(build):** Move the local `.tmp/wine32` Wine prefix out of the isolated Next.js build path so Windows Electron packaging artifacts cannot trigger `EACCES` scans during Node 24 builds.
- **fix(build):** Copy the `wreq-js` native runtime directory into the isolated Next.js standalone output so packaged Playwright/E2E starts can load the instrumentation hook on Linux.
- **fix(api):** Validate the Codex Responses websocket bridge and `/v1/batches` JSON payloads with Zod before use, keeping `request.json()` route validation green and returning explicit 400 responses for invalid bodies.
- **fix(providers):** Add explicit typing to provider alias and category helpers so the strict `typecheck:noimplicit:core` CI gate passes.
- **fix(ui):** Keep the upstream proxy provider detail page labeled with a fallback "Managed via Upstream Proxy Settings" management surface when translations are unavailable.
- **fix(electron):** Harden the production desktop CSP by removing `unsafe-eval` outside development and adding object, base URI, form action, frame ancestor, and worker restrictions.
- **fix(cli):** Replace shell-interpolated setup and privileged command execution paths with argument-based `spawn`/`execFile` helpers for database setup, Tailscale sudo commands, MITM DNS edits, and certificate install/uninstall flows.
- **fix(ui):** Keep provider icons resilient by using direct `@lobehub/icons` components first, then local PNG/SVG fallbacks, avoiding the `@lobehub/ui` peer runtime in the dashboard.

- **Qwen OAuth Reliability:** Resolved a series of OAuth integration issues including a 400 Bad Request blocker on expired tokens, fallback generation for parsing OIDC `access_token` properties when `id_token` is omitted, model catalog discovery errors, and strict filtering of `X-Dashscope-*` headers to avoid 400 rejection from OpenAI-compatible endpoints.

## [3.5.0] — 2026-04-03

### ✨ New Features

- **feat(providers):** Implement Image Generation and Editing capabilities for ChatGPT Web, including in-band chat image generation and caching (#1606).
- **feat(ui):** Integrate OpenCode Zen/Go API tool logo SVG and polish API key copy-to-clipboard interactions (#1607).

- **feat(providers):** Integrate AgentRouter as a new OpenAI-compatible passthrough provider with $200 free credits via sign-up (Issue #1572).
- **feat(ui):** Implement on-demand per-model testing in the provider dashboard, allowing single-token diagnostic checks without triggering rate-limits (Issue #1532).

- **Auto-Combo & Routing:** Completed native CRUD lifecycle integration for the advanced Auto-Combo engine (#955).
- **Core Operations:** Fixed missing translations for new native Auto-Combos options (#955).
- **Security Validation:** Disabled SQLite auto-backup tasks natively during unit test CI execution to explicitly resolve Node 22 Event Loop hanging memory leaks (#956).
- **Ecosystem Proxies:** Completed explicit integration mapping model synchronization schedulers, OAuth cycles, and Token Check refreshes safely through OmniRoute's native system upstream proxies (#953).
- **MCP Extensibility:** Added and successfully registered the new `omniroute_web_search` MCP framework tool out of beta into production schemas (#951).
- **Tokens Buffer Logic:** Added runtime configuration limits extending configurable input/output token buffers for precise Usage Tracking metrics (#959).

### 🐛 Bug Fixes

- **fix(mitm):** Compile MITM utilities as NodeNext ESM during prepublish, copy the CommonJS MITM server into the standalone artifact, and resolve MITM data paths without relying on Next.js aliases in packaged runtime.
- **fix(build):** Move the local `.tmp/wine32` Wine prefix out of the isolated Next.js build path so Windows Electron packaging artifacts cannot trigger `EACCES` scans during Node 24 builds.
- **fix(build):** Copy the `wreq-js` native runtime directory into the isolated Next.js standalone output so packaged Playwright/E2E starts can load the instrumentation hook on Linux.
- **fix(api):** Validate the Codex Responses websocket bridge and `/v1/batches` JSON payloads with Zod before use, keeping `request.json()` route validation green and returning explicit 400 responses for invalid bodies.
- **fix(providers):** Add explicit typing to provider alias and category helpers so the strict `typecheck:noimplicit:core` CI gate passes.
- **fix(ui):** Keep the upstream proxy provider detail page labeled with a fallback "Managed via Upstream Proxy Settings" management surface when translations are unavailable.
- **fix(electron):** Harden the production desktop CSP by removing `unsafe-eval` outside development and adding object, base URI, form action, frame ancestor, and worker restrictions.
- **fix(cli):** Replace shell-interpolated setup and privileged command execution paths with argument-based `spawn`/`execFile` helpers for database setup, Tailscale sudo commands, MITM DNS edits, and certificate install/uninstall flows.
- **fix(ui):** Keep provider icons resilient by using direct `@lobehub/icons` components first, then local PNG/SVG fallbacks, avoiding the `@lobehub/ui` peer runtime in the dashboard.

- **CodeQL Remediation:** Fully resolved and secured critical string indexing operations preventing Server-Side Request Forgery (SSRF) arrays indexing heuristics alongside polynomial algorithmic backtracking (ReDoS) inside deep proxy dispatcher modules.
- **Crypto Hashes:** Replaced weak unverified legacy OAuth 1.0 hashes with robust HMAC-SHA-256 standard validation primitives ensuring tight access controls.
- **API Boundary Protection:** Correctly verified and mapped structural route protections enforcing strict `isAuthenticated()` middleware logic covering newer dynamic endpoints targeting settings manipulation and native skills loading.
- **CLI Ecosystem Compat:** Resolved broken native runtime parser bindings crashing `where` environment detectors strictly over `.cmd/.exe` edge cases gracefully for external plugins (#969).
- **Cache Architecture:** Refactored exact Analytics and System Settings dashboard parameters layout structure caching to maintain stable re-hydration persistence cycles resolving visual unaligned state flashes (#952).
- **Claude Caching Standards:** Normalized and accurately strictly preserved critical ephemeral block markers `ephemeral` caching TTL orders for downstream nodes enforcing standard compatible CC requests mapping cleanly without dropped metrics (#948).
- **Internal Aliases Auth:** Simplified internal runtime mappings normalizing Codex credential payload lookups inside global translation parameters resolving 401 unauthenticated drops (#958).

### 🛠️ Maintenance

- **UI Discoverability:** Correctly adjusted layout categorizations explicitly separating free tier providers logic improving UX sorting flows inside the general API registry pages (#950).
- **Deployment Topology:** Unified Docker deployment artifacts ensuring the root `fly.toml` matches expected cloud instance parameters out-of-the-box natively handling automated deployments scaling properly.
- **Development Tooling:** Decoupled `LKGP` runtime parameters into explicit DB layer abstraction caching utilities ensuring strict test isolation coverage for core caching layers safely.

---

## [3.4.9] — 2026-04-03

### Features & Refactoring

- **Dashboard Auto-Combo Panel:** Completely refactored the `/dashboard/auto-combo` UI to seamlessly integrate with native Dashboard Cards and standardized visual padding/headers. Added dynamic visual progress bars mapping model selection weight mechanisms.
- **Settings Routing Sync:** Fully exposed advanced routing `priority` and `weighted` schema targets internally inside global settings fallback lists.

### Bug Fixes

- **Memory & Skills Locale Nodes:** Resolved empty rendering tags for Memory and Skills options directly inside global settings views by wiring all `settings.*` mapping values internally into `en.json` (also mapped implicitly for cross-translation tools).

### Internal Integrations

- Integrated PR #946 — fix: preserve Claude Code compatibility in responses conversion
- Integrated PR #944 — fix(gemini): preserve thought signatures across antigravity tool calls
- Integrated PR #943 — fix: restore GitHub Copilot body
- Integrated PR #942 — Fix cc-compatible cache markers
- Integrated PR #941 — refactor(auth): improve NVIDIA alias lookup + add LKGP error logging
- Integrated PR #939 — Restore Claude OAuth localhost callback handling
- _(Note: PR #934 was omitted from 3.4.9 cycle to prevent core conflict regressions)_

---

## [3.4.8] — 2026-04-03

### Sicherheit

- Fully remediated all outstanding Github Advanced Security (CodeQL) findings and Dependabot alerts.
- Fixed insecure randomness vulnerabilities by migrating from `Math.random` to `crypto.randomUUID()`.
- Secured shell commands in automated scripts from string injection.
- Migrated vulnerable catastrophic backtracking RegEx parsing patterns in chat/translation pipelines.
- Enhanced output sanitization controls inside React UI components and Server Sent Events (SSE) tag injection.

---

## [3.4.7] — 2026-04-03

### Funktionen

- Added `Cryptography` node to Monitoring and MCP health checks (#798)
- Hardened model-catalog route permissions mapping (`/models`) (#781)

### Bug Fixes

- Fixed Claude OAuth token refreshes failing to preserve cache contexts (#937)
- Fixed CC-Compatible provider errors rendering cached models unreachable (#937)
- Fixed GitHub Executor errors related to invalid context arrays (#937)
- Fixed NPM-installed CLI tools healthcheck failures on Windows (#935)
- Fixed payload translation dropping valid content due to invalid API fields (#927)
- Fixed runtime crash in Node 25 regarding API key execution (#867)
- Fixed MCP standalone module-resolution (`ERR_MODULE_NOT_FOUND`) via `esbuild` (#936)
- Fixed NVIDIA NIM routing credential resolution alias mismatch (#931)

### Sicherheit

- Added safe strict input boundary protection against raw `shell: true` remote-code execution injections.

---

## [3.4.6] - 2026-04-02

### ✨ New Features

- **feat(providers):** Implement Image Generation and Editing capabilities for ChatGPT Web, including in-band chat image generation and caching (#1606).
- **feat(ui):** Integrate OpenCode Zen/Go API tool logo SVG and polish API key copy-to-clipboard interactions (#1607).

- **feat(providers):** Integrate AgentRouter as a new OpenAI-compatible passthrough provider with $200 free credits via sign-up (Issue #1572).
- **feat(ui):** Implement on-demand per-model testing in the provider dashboard, allowing single-token diagnostic checks without triggering rate-limits (Issue #1532).

- **Providers:** Registered new image, video, and audio generation providers from the community-requested list (#926).
- **Dashboard UI:** Added standalone sidebar navigation for the new Memory and Skills modules (#926).
- **i18n:** Added translation strings and layout mappings across 30 languages for the Memory and Skills namespaces.

### 🐛 Bug Fixes

- **fix(mitm):** Compile MITM utilities as NodeNext ESM during prepublish, copy the CommonJS MITM server into the standalone artifact, and resolve MITM data paths without relying on Next.js aliases in packaged runtime.
- **fix(build):** Move the local `.tmp/wine32` Wine prefix out of the isolated Next.js build path so Windows Electron packaging artifacts cannot trigger `EACCES` scans during Node 24 builds.
- **fix(build):** Copy the `wreq-js` native runtime directory into the isolated Next.js standalone output so packaged Playwright/E2E starts can load the instrumentation hook on Linux.
- **fix(api):** Validate the Codex Responses websocket bridge and `/v1/batches` JSON payloads with Zod before use, keeping `request.json()` route validation green and returning explicit 400 responses for invalid bodies.
- **fix(providers):** Add explicit typing to provider alias and category helpers so the strict `typecheck:noimplicit:core` CI gate passes.
- **fix(ui):** Keep the upstream proxy provider detail page labeled with a fallback "Managed via Upstream Proxy Settings" management surface when translations are unavailable.
- **fix(electron):** Harden the production desktop CSP by removing `unsafe-eval` outside development and adding object, base URI, form action, frame ancestor, and worker restrictions.
- **fix(cli):** Replace shell-interpolated setup and privileged command execution paths with argument-based `spawn`/`execFile` helpers for database setup, Tailscale sudo commands, MITM DNS edits, and certificate install/uninstall flows.
- **fix(ui):** Keep provider icons resilient by using direct `@lobehub/icons` components first, then local PNG/SVG fallbacks, avoiding the `@lobehub/ui` peer runtime in the dashboard.

- **Resilience:** Prevented the proxy Circuit Breaker from becoming stuck in an OPEN state indefinitely by handling direct transitions to CLOSED state inside fallback combo paths (#930).
- **Protocol Translation:** Patched the streaming transformer to sanitize response blocks based on the expected _source_ protocol rather than the provider _target_ protocol, fixing Anthropics models wrapped in OpenAI payloads crashing Claude Code (#929).
- **API Specs & Gemini:** Fixed `thought_signature` parsing in `openai-to-gemini` and `claude-to-gemini` translators, preventing HTTP 400 errors across all Gemini 3 API tool-calls.
- **Providers:** Cleaned up non-OpenAI-compatible endpoints preventing valid upstream connections (#926).
- **Cache Trends:** Fixed an invalid property mapping data mismatch causing Cache Trends UI charts to crash, and extracted redundant cache metric widgets (#926).

---

## [3.4.5] - 2026-04-02

### ✨ New Features

- **feat(providers):** Implement Image Generation and Editing capabilities for ChatGPT Web, including in-band chat image generation and caching (#1606).
- **feat(ui):** Integrate OpenCode Zen/Go API tool logo SVG and polish API key copy-to-clipboard interactions (#1607).

- **feat(providers):** Integrate AgentRouter as a new OpenAI-compatible passthrough provider with $200 free credits via sign-up (Issue #1572).
- **feat(ui):** Implement on-demand per-model testing in the provider dashboard, allowing single-token diagnostic checks without triggering rate-limits (Issue #1532).

- **CLIProxyAPI Ecosystem Integration:** Added the `cliproxyapi` executor with built-in module-level caching and proxy routing. Introduced a comprehensive Version Manager service to automatically test health, download binaries from GitHub, spawn isolated background processes, and cleanly manage the lifecycle of external CLI tools directly through the UI. Includes DB tables for proxy configuration to enable automatic SSRF-gated cross-routing of external OpenAI requests via the local CLI tool layer (#914, #915, #916).
- **Qoder PAT Support:** Integrated Personal Access Tokens (PAT) support directly via the local `qodercli` transport instead of legacy remote `.cn` browser configurations (#913).
- **Gemini 3.1 Pro Preview (GitHub):** Added `gemini-3.1-pro-preview` canonical explicit model support natively into the GitHub Copilot provider while preserving older routing aliases (#924).

### 🐛 Bug Fixes

- **fix(mitm):** Compile MITM utilities as NodeNext ESM during prepublish, copy the CommonJS MITM server into the standalone artifact, and resolve MITM data paths without relying on Next.js aliases in packaged runtime.
- **fix(build):** Move the local `.tmp/wine32` Wine prefix out of the isolated Next.js build path so Windows Electron packaging artifacts cannot trigger `EACCES` scans during Node 24 builds.
- **fix(build):** Copy the `wreq-js` native runtime directory into the isolated Next.js standalone output so packaged Playwright/E2E starts can load the instrumentation hook on Linux.
- **fix(api):** Validate the Codex Responses websocket bridge and `/v1/batches` JSON payloads with Zod before use, keeping `request.json()` route validation green and returning explicit 400 responses for invalid bodies.
- **fix(providers):** Add explicit typing to provider alias and category helpers so the strict `typecheck:noimplicit:core` CI gate passes.
- **fix(ui):** Keep the upstream proxy provider detail page labeled with a fallback "Managed via Upstream Proxy Settings" management surface when translations are unavailable.
- **fix(electron):** Harden the production desktop CSP by removing `unsafe-eval` outside development and adding object, base URI, form action, frame ancestor, and worker restrictions.
- **fix(cli):** Replace shell-interpolated setup and privileged command execution paths with argument-based `spawn`/`execFile` helpers for database setup, Tailscale sudo commands, MITM DNS edits, and certificate install/uninstall flows.
- **fix(ui):** Keep provider icons resilient by using direct `@lobehub/icons` components first, then local PNG/SVG fallbacks, avoiding the `@lobehub/ui` peer runtime in the dashboard.

- **GitHub Copilot Token Stability:** Repaired the Copilot token refresh loop where stale tokens weren't deep-merged into DB, and removed `reasoning_text` fields that were fatally breaking downstream Anthropic block conversions for multi-turn chats (#923).
- **Global Timeout Matrix:** Centralized and parameterized request timeouts explicitly from `REQUEST_TIMEOUT_MS` to prevent hidden (~300s) default fetch buffers prematurely cutting off long-lived SSE streaming responses from heavy reasoning models (#918).
- **Cloudflare Quick Tunnels State:** Fixed a severe state inconsistency where restarted OmniRoute instances erroneously showed destroyed tunnels as active, and defaulted cloudflared tunneling to `HTTP/2` to eliminate UDP receive buffer log spam (#925).
- **i18n Translation Overhaul (Czech & Hindi):** Fixed Hindi code from DEPRECATED `in.json` to canonical `hi.json`, overhauled Czech text mappings, extracted `untranslatable-keys.json` to fix CI/CD false-positive validations, and generated comprehensive `I18N.md` docs to guide translators (#912).
- **Tokens Provider Recovery:** Fixed Qwen losing specific `resourceUrl` endpoints after automatic health-check token refreshes because of missing DB deep merges (#917).
- **CC Compatible UX & Streaming:** Unified the Add CC/OpenAI/Anthropic compatible actions around the Anthropic UI treatment, forced CC-compatible upstream requests to use SSE while still returning streaming or non-streaming responses based on the client request, removed CC model-list configuration/import support in favor of an explicit unsupported-model-listing error, and made CC-compatible Available Models mirror the OAuth Claude Code registry list (#921).

---

## [3.4.4] - 2026-04-02

### 🐛 Bug Fixes

- **fix(mitm):** Compile MITM utilities as NodeNext ESM during prepublish, copy the CommonJS MITM server into the standalone artifact, and resolve MITM data paths without relying on Next.js aliases in packaged runtime.
- **fix(build):** Move the local `.tmp/wine32` Wine prefix out of the isolated Next.js build path so Windows Electron packaging artifacts cannot trigger `EACCES` scans during Node 24 builds.
- **fix(build):** Copy the `wreq-js` native runtime directory into the isolated Next.js standalone output so packaged Playwright/E2E starts can load the instrumentation hook on Linux.
- **fix(api):** Validate the Codex Responses websocket bridge and `/v1/batches` JSON payloads with Zod before use, keeping `request.json()` route validation green and returning explicit 400 responses for invalid bodies.
- **fix(providers):** Add explicit typing to provider alias and category helpers so the strict `typecheck:noimplicit:core` CI gate passes.
- **fix(ui):** Keep the upstream proxy provider detail page labeled with a fallback "Managed via Upstream Proxy Settings" management surface when translations are unavailable.
- **fix(electron):** Harden the production desktop CSP by removing `unsafe-eval` outside development and adding object, base URI, form action, frame ancestor, and worker restrictions.
- **fix(cli):** Replace shell-interpolated setup and privileged command execution paths with argument-based `spawn`/`execFile` helpers for database setup, Tailscale sudo commands, MITM DNS edits, and certificate install/uninstall flows.
- **fix(ui):** Keep provider icons resilient by using direct `@lobehub/icons` components first, then local PNG/SVG fallbacks, avoiding the `@lobehub/ui` peer runtime in the dashboard.

- **Responses API Token Reporting:** Emit `response.completed` with correct `input_tokens`/`output_tokens` fields for Codex CLI clients, fixing token usage display (#909 — thanks @christopher-s).
- **SQLite WAL Checkpoint on Shutdown:** Flush WAL changes into the primary database file during graceful shutdown/restart, preventing data loss on Docker container stops (#905 — thanks @rdself).
- **Graceful Shutdown Signal:** Changed `/api/restart` and `/api/shutdown` routes from `process.exit(0)` to `process.kill(SIGTERM)`, ensuring the shutdown handler runs before exit.
- **Docker Stop Grace Period:** Added `stop_grace_period: 40s` to Docker Compose files and `--stop-timeout 40` to Docker run examples.

### 🛠️ Maintenance

- Closed 5 resolved/not-a-bug issues (#872, #814, #816, #890, #877).
- Triaged 6 issues with needs-info requests (#892, #887, #886, #865, #895, #870).
- Responded to CLI detection tracking issue (#863) with contributor guidance.

---

## [3.4.3] - 2026-04-02

### ✨ New Features

- **feat(providers):** Implement Image Generation and Editing capabilities for ChatGPT Web, including in-band chat image generation and caching (#1606).
- **feat(ui):** Integrate OpenCode Zen/Go API tool logo SVG and polish API key copy-to-clipboard interactions (#1607).

- **feat(providers):** Integrate AgentRouter as a new OpenAI-compatible passthrough provider with $200 free credits via sign-up (Issue #1572).
- **feat(ui):** Implement on-demand per-model testing in the provider dashboard, allowing single-token diagnostic checks without triggering rate-limits (Issue #1532).

- **Antigravity Memory & Skills:** Completed remote memory and skills injection for the Antigravity provider at the proxy network level.
- **Claude Code Compatibility:** Built a natively hidden compatibility bridge for Claude Code, passing tools and formatting through cleanly.
- **Web Search MCP:** Added the `omniroute_web_search` tool with the `execute:search` scope.
- **Cache Components:** Implemented dynamic cache components utilizing TDD.
- **UI & Customization:** Added custom favicon support, appearance tabs, wired whitelabeling to the sidebar, and added Windsurf guide steps across all 33 languages.
- **Log Retention:** Unified request log retention and artifacts natively.
- **Model Enhancements:** Added explicit `contextLength` for all opencode-zen models.
- **i18n & translations:** Integrated 33 language translations natively, including placeholder CI validations and Chinese documentation updates (#873, #869).

### 🐛 Bug Fixes

- **fix(mitm):** Compile MITM utilities as NodeNext ESM during prepublish, copy the CommonJS MITM server into the standalone artifact, and resolve MITM data paths without relying on Next.js aliases in packaged runtime.
- **fix(build):** Move the local `.tmp/wine32` Wine prefix out of the isolated Next.js build path so Windows Electron packaging artifacts cannot trigger `EACCES` scans during Node 24 builds.
- **fix(build):** Copy the `wreq-js` native runtime directory into the isolated Next.js standalone output so packaged Playwright/E2E starts can load the instrumentation hook on Linux.
- **fix(api):** Validate the Codex Responses websocket bridge and `/v1/batches` JSON payloads with Zod before use, keeping `request.json()` route validation green and returning explicit 400 responses for invalid bodies.
- **fix(providers):** Add explicit typing to provider alias and category helpers so the strict `typecheck:noimplicit:core` CI gate passes.
- **fix(ui):** Keep the upstream proxy provider detail page labeled with a fallback "Managed via Upstream Proxy Settings" management surface when translations are unavailable.
- **fix(electron):** Harden the production desktop CSP by removing `unsafe-eval` outside development and adding object, base URI, form action, frame ancestor, and worker restrictions.
- **fix(cli):** Replace shell-interpolated setup and privileged command execution paths with argument-based `spawn`/`execFile` helpers for database setup, Tailscale sudo commands, MITM DNS edits, and certificate install/uninstall flows.
- **fix(ui):** Keep provider icons resilient by using direct `@lobehub/icons` components first, then local PNG/SVG fallbacks, avoiding the `@lobehub/ui` peer runtime in the dashboard.

- **Qwen OAuth Mapping:** Reverted `id_token` reliance to `access_token` and enabled dynamic `resource_url` API endpoint injection for proper regional routing (#900).
- **Model Sync Engine:** Stored the strict internal Provider ID in `getCustomModels()` sync routines instead of the UI Channel Alias format, preventing SQLite catalog insertion failures (#903).
- **Claude Code & Codex:** Standardized non-streaming blank responses to Anthropic-formatted `(empty response)` to prevent CLI proxy crashes (#866).
- **CC Compatible Routing:** Resolved duplicate `/v1` endpoint collision during path concatenation for generic Claude Code gateways (#904).
- **Antigravity Dashboards:** Blocked unlimited quota models from falsely registering as exhausted `100% Usage` limit states in the Provider Usage UI (#857).
- **Claude Image Passthrough:** Fixed Claude models missing image block passthroughs (#898).
- **Gemini CLI Routing:** Resolved 403 authorization lockouts and content accumulation issues by refreshing the project ID via `loadCodeAssist` (#868).
- **Antigravity Stability:** Corrected model access lists, enforced 404 lockouts, fixed 429 cascades locking out standard connections, and capped `gemini-3.1-pro` output tokens (#885).
- **Provider Sync Cadence:** Repaired the provider limits synchronization cadence via the internal scheduler (#888).
- **Dashboard Optimization:** Resolved `/dashboard/limits` UI freezing when processing 70+ accounts via chunk parallelization (#784).
- **SSRF Hardening:** Enforced strict SSRF IP range filtering and blocked the `::1` loopback interface.
- **MIME Types:** Standardized `mime_type` to snake_case to match Gemini API specifications.
- **CI Stabilization:** Fixed failing analytics/settings Playwright selectors and request assertions so GitHub Actions E2E runs pass reliably across localized UIs and switch-based controls.
- **Deterministic Tests:** Removed date-sensitive quota fixtures from Copilot usage tests and aligned idempotency/model catalog tests with the merged runtime behavior.
- **MCP Type Hardening:** Removed zero-budget explicit `any` regressions from the MCP server tool registration path.
- **Model Sync Engine:** Bypassed destructive `replace` overrides when the provider's auto-sync yields an empty model list, maintaining stability for dynamic catalogs (#899).

### 🛠️ Maintenance

- **Pipeline Logging:** Refined pipeline logging artifacts and enforce retention caps (#880).
- **AGENTS.md Overhaul:** Condensed from 297→153 lines. Added build/test/style guidelines, code workflows (Prettier, TypeScript, ESLint), and trimmed verbose tables (#882).
- **Release Branch Integration:** Consolidated the active feature branches into `release/v3.4.2` on top of current `main` and validated the branch with lint, unit, coverage, build, and CI-mode E2E runs.
- **Testing:** Added vitest configuration for component testing and Playwright specs for settings toggles.
- **Doc Updates:** Expanded root readmes, translated chinese documents natively, and cleaned up obsolete files.

## [3.4.1] - 2026-03-31

> [!WARNING]
> **BREAKING CHANGE: request logging, retention, and logging environment variables have been redesigned.**
> On the first startup after upgrading, OmniRoute archives legacy request logs from `DATA_DIR/logs/`, legacy `DATA_DIR/call_logs/`, and `DATA_DIR/log.txt` into `DATA_DIR/log_archives/*.zip`, then removes the deprecated layout and switches to the new unified artifact format under `DATA_DIR/call_logs/`.

### ✨ New Features

- **feat(providers):** Implement Image Generation and Editing capabilities for ChatGPT Web, including in-band chat image generation and caching (#1606).
- **feat(ui):** Integrate OpenCode Zen/Go API tool logo SVG and polish API key copy-to-clipboard interactions (#1607).

- **feat(providers):** Integrate AgentRouter as a new OpenAI-compatible passthrough provider with $200 free credits via sign-up (Issue #1572).
- **feat(ui):** Implement on-demand per-model testing in the provider dashboard, allowing single-token diagnostic checks without triggering rate-limits (Issue #1532).

- **.ENV Migration Utility:** Included `scripts/migrate-env.mjs` to seamlessly migrate `<v3.3` configurations to `v3.4.x` strict security validation constraints (FASE-01), repairing startup crashes caused by short `JWT_SECRET` instances.
- **Kiro AI Cache Optimization:** Implemented deterministic `conversationId` generation (uuidv5) to enable AWS Builder ID Prompt Caching properly across invocations (#814).
- **Dashboard UI Restoration & Consolidation:** Resolved sidebar logic omitting the Debug section, and cleared Nextjs routing warnings by moving standalone `/dashboard/mcp` and `/dashboard/a2a` pages explicitly into embedded Endpoint Proxy UI components.
- **Unified Request Log Artifacts:** Request logging now stores one SQLite index row plus one JSON artifact per request under `DATA_DIR/call_logs/`, with optional pipeline capture embedded in the same file.
- **Language:** Improved the Chinese translation (#855)
- **Opencode-Zen Models:** Added 4 free models to opencode-zen registry (#854)
- **Tests:** Added unit and E2E tests for settings toggles and bug fixes (#850)

### 🐛 Bug Fixes

- **fix(mitm):** Compile MITM utilities as NodeNext ESM during prepublish, copy the CommonJS MITM server into the standalone artifact, and resolve MITM data paths without relying on Next.js aliases in packaged runtime.
- **fix(build):** Move the local `.tmp/wine32` Wine prefix out of the isolated Next.js build path so Windows Electron packaging artifacts cannot trigger `EACCES` scans during Node 24 builds.
- **fix(build):** Copy the `wreq-js` native runtime directory into the isolated Next.js standalone output so packaged Playwright/E2E starts can load the instrumentation hook on Linux.
- **fix(api):** Validate the Codex Responses websocket bridge and `/v1/batches` JSON payloads with Zod before use, keeping `request.json()` route validation green and returning explicit 400 responses for invalid bodies.
- **fix(providers):** Add explicit typing to provider alias and category helpers so the strict `typecheck:noimplicit:core` CI gate passes.
- **fix(ui):** Keep the upstream proxy provider detail page labeled with a fallback "Managed via Upstream Proxy Settings" management surface when translations are unavailable.
- **fix(electron):** Harden the production desktop CSP by removing `unsafe-eval` outside development and adding object, base URI, form action, frame ancestor, and worker restrictions.
- **fix(cli):** Replace shell-interpolated setup and privileged command execution paths with argument-based `spawn`/`execFile` helpers for database setup, Tailscale sudo commands, MITM DNS edits, and certificate install/uninstall flows.
- **fix(ui):** Keep provider icons resilient by using direct `@lobehub/icons` components first, then local PNG/SVG fallbacks, avoiding the `@lobehub/ui` peer runtime in the dashboard.

- **429 Quota Parsing:** Parsed long quota reset times from error bodies to honor correct backoffs and prevent rate-limited account bans (#859)
- **Prompt Caching:** Preserved client `cache_control` headers for all Claude-protocol providers (like Minimax, GLM, and Bailian), correctly recognizing caching support (#856)
- **Model Sync Logs:** Reduced log spam by recording `sync-models` only when the channel actually modifies the list (#853)
- **Provider Quota & Token Parsing:** Switched Antigravity limits to use `retrieveUserQuota` natively and correctly mapped Claude token refresh payloads to URL-encoded forms (#862)
- **Rate-Limiting Stability:** Universalized the 429 Retry-After parsing architecture to cap provider-induced cooldowns at 24 hours max (#862)
- **Dashboard Limit Rendering:** Re-architected `/dashboard/limits` quota mapping to render immediately inside chunks, fixing a major UI freezing delay on accounts exceeding 70 active connections (#784)
- **QWEN OAuth Authorization:** Mapped the OIDC `id_token` as the primary API Bearer token for Dashscope requests, fixing immediate 401 Unauthorized errors after connecting accounts or refreshing tokens (#864)
- **ZAI API Stability:** Hardened Server-Sent Events compiler to gracefully fallback to empty strings when DeepSeek providers stream mathematically null content during reasoning phases (#871)
- **Claude Code/Codex Translations:** Protected non-streaming payload conversions against empty responses from upstream Codex tools, avoiding catastrophic TypeErrors (#866)
- **NVIDIA NIM Rendering:** Conditionally stripped identical provider prefixes dynamically pushed by audio models, eliminating duplicate `nim/nim` tag structures throwing 404 on the Media Playground (#872)

### ⚠️ Breaking Changes

- **Request Log Layout:** Removed the old multi-file `DATA_DIR/logs/` request log sessions and the `DATA_DIR/log.txt` summary file. New requests are written as single JSON artifacts in `DATA_DIR/call_logs/YYYY-MM-DD/`.
- **Logging Environment Variables:** Replaced `LOG_*`, `ENABLE_REQUEST_LOGS`, `CALL_LOGS_MAX`, `CALL_LOG_PAYLOAD_MODE`, and `PROXY_LOG_MAX_ENTRIES` with the new `APP_LOG_*` and `CALL_LOG_RETENTION_DAYS` configuration model.
- **Pipeline Toggle Setting:** Replaced the legacy `detailed_logs_enabled` setting with `call_log_pipeline_enabled`. New pipeline details are embedded inside the request artifact instead of being stored as separate `request_detail_logs` records.

### 🛠️ Maintenance

- **Legacy Request Log Upgrade Backup:** Upgrades now archive old `data/logs/`, legacy `data/call_logs/`, and `data/log.txt` layouts into `DATA_DIR/log_archives/*.zip` before removing the deprecated structure.
- **Streaming Usage Persistence:** Streaming requests now write a single `usage_history` row on completion instead of emitting a duplicate in-progress usage row with empty status metadata.
- **Logging Follow-up Cleanup:** Pipeline logs no longer capture `SOURCE REQUEST`, request artifact entries now honor `CALL_LOG_MAX_ENTRIES`, and application log archives now honor `APP_LOG_MAX_FILES`.

---

## [3.4.0] - 2026-03-31

### Funktionen

- **Subscription Utilization Analytics:** Added quota snapshot time-series tracking, Provider Utilization and Combo Health tabs with recharts visualizations, and corresponding API endpoints (#847)
- **SQLite Backup Control:** New `OMNIROUTE_DISABLE_AUTO_BACKUP` env flag to disable automatic SQLite backups (#846)
- **Model Registry Update:** Injected `gpt-5.4-mini` into the Codex provider's array of models (#756)
- **Provider Limit Tracking:** Track and display when provider rate limits were last refreshed per account (#843)

### 🐛 Bug Fixes

- **fix(mitm):** Compile MITM utilities as NodeNext ESM during prepublish, copy the CommonJS MITM server into the standalone artifact, and resolve MITM data paths without relying on Next.js aliases in packaged runtime.
- **fix(build):** Move the local `.tmp/wine32` Wine prefix out of the isolated Next.js build path so Windows Electron packaging artifacts cannot trigger `EACCES` scans during Node 24 builds.
- **fix(build):** Copy the `wreq-js` native runtime directory into the isolated Next.js standalone output so packaged Playwright/E2E starts can load the instrumentation hook on Linux.
- **fix(api):** Validate the Codex Responses websocket bridge and `/v1/batches` JSON payloads with Zod before use, keeping `request.json()` route validation green and returning explicit 400 responses for invalid bodies.
- **fix(providers):** Add explicit typing to provider alias and category helpers so the strict `typecheck:noimplicit:core` CI gate passes.
- **fix(ui):** Keep the upstream proxy provider detail page labeled with a fallback "Managed via Upstream Proxy Settings" management surface when translations are unavailable.
- **fix(electron):** Harden the production desktop CSP by removing `unsafe-eval` outside development and adding object, base URI, form action, frame ancestor, and worker restrictions.
- **fix(cli):** Replace shell-interpolated setup and privileged command execution paths with argument-based `spawn`/`execFile` helpers for database setup, Tailscale sudo commands, MITM DNS edits, and certificate install/uninstall flows.
- **fix(ui):** Keep provider icons resilient by using direct `@lobehub/icons` components first, then local PNG/SVG fallbacks, avoiding the `@lobehub/ui` peer runtime in the dashboard.

- **Qwen Auth Routing:** Re-routed Qwen OAuth completions from the DashScope API to the Web Inference API (`chat.qwen.ai`), resolving authorization failures (#844, #807, #832)
- **Qwen Auto-Retry Loop:** Added targeted 429 Quota Exceeded backoff handling inside `chatCore` protecting burst requests
- **Codex OAuth Fallback:** Modern browser popup blocking no longer traps the user; it automatically falls back to manual URL entry (#808)
- **Claude Token Refresh:** Anthropic's strict `application/json` boundaries are now respected during token generation instead of encoded URLs (#836)
- **Codex Messages Schema:** Stripped purist `messages` injects from native passthrough requests to avoid structural rejections from the ChatGPT upstream (#806)
- **CLI Detection Size Limit:** Safely bumped the Node binary scanning upper bound from 100MB to 350MB, allowing heavy standalone tools like Claude Code (229MB) and OpenCode (153MB) to be correctly detected by the VPS runtime (#809)
- **CLI Runtime Environment:** Restored ability for CLI configurations to respect user override paths (`CLI_{PROVIDER}_BIN`) bypassing strict path-bound discovery rules
- **Nvidia Header Conflicts:** Removed `prompt_cache_key` properties from upstream headers when calling non-Anthropic providers (#848)
- **Codex Fast Tier Toggle:** Restored Codex service tier toggle contrast in light mode (#842)
- **Test Infrastructure:** Updated `t28-model-catalog-updates` test that incorrectly expected the outdated DashScope endpoint for the Qwen native registry

---

## [3.3.9] - 2026-03-31

### 🐛 Bug Fixes

- **fix(mitm):** Compile MITM utilities as NodeNext ESM during prepublish, copy the CommonJS MITM server into the standalone artifact, and resolve MITM data paths without relying on Next.js aliases in packaged runtime.
- **fix(build):** Move the local `.tmp/wine32` Wine prefix out of the isolated Next.js build path so Windows Electron packaging artifacts cannot trigger `EACCES` scans during Node 24 builds.
- **fix(build):** Copy the `wreq-js` native runtime directory into the isolated Next.js standalone output so packaged Playwright/E2E starts can load the instrumentation hook on Linux.
- **fix(api):** Validate the Codex Responses websocket bridge and `/v1/batches` JSON payloads with Zod before use, keeping `request.json()` route validation green and returning explicit 400 responses for invalid bodies.
- **fix(providers):** Add explicit typing to provider alias and category helpers so the strict `typecheck:noimplicit:core` CI gate passes.
- **fix(ui):** Keep the upstream proxy provider detail page labeled with a fallback "Managed via Upstream Proxy Settings" management surface when translations are unavailable.
- **fix(electron):** Harden the production desktop CSP by removing `unsafe-eval` outside development and adding object, base URI, form action, frame ancestor, and worker restrictions.
- **fix(cli):** Replace shell-interpolated setup and privileged command execution paths with argument-based `spawn`/`execFile` helpers for database setup, Tailscale sudo commands, MITM DNS edits, and certificate install/uninstall flows.
- **fix(ui):** Keep provider icons resilient by using direct `@lobehub/icons` components first, then local PNG/SVG fallbacks, avoiding the `@lobehub/ui` peer runtime in the dashboard.

- **Custom Provider Rotation:** Integrated `getRotatingApiKey` internally inside DefaultExecutor, ensuring `extraApiKeys` rotation triggers correctly for custom and compatible upstream providers (#815)

---

## [3.3.8] - 2026-03-30

### Funktionen

- **Models API Filtering:** Endpoint `/v1/models` now dynamically filters its list based on the permissions tied to the `Authorization: Bearer <token>` when restricted access is on (#781)
- **Qoder Integration:** Native integration for Qoder AI natively replacing the legacy iFlow platform mappings (#660)
- **Prompt Cache Tracking:** Added tracking capabilities and frontend visualization (Stats card) for semantic and prompt caching in the Dashboard UI

### 🐛 Bug Fixes

- **fix(mitm):** Compile MITM utilities as NodeNext ESM during prepublish, copy the CommonJS MITM server into the standalone artifact, and resolve MITM data paths without relying on Next.js aliases in packaged runtime.
- **fix(build):** Move the local `.tmp/wine32` Wine prefix out of the isolated Next.js build path so Windows Electron packaging artifacts cannot trigger `EACCES` scans during Node 24 builds.
- **fix(build):** Copy the `wreq-js` native runtime directory into the isolated Next.js standalone output so packaged Playwright/E2E starts can load the instrumentation hook on Linux.
- **fix(api):** Validate the Codex Responses websocket bridge and `/v1/batches` JSON payloads with Zod before use, keeping `request.json()` route validation green and returning explicit 400 responses for invalid bodies.
- **fix(providers):** Add explicit typing to provider alias and category helpers so the strict `typecheck:noimplicit:core` CI gate passes.
- **fix(ui):** Keep the upstream proxy provider detail page labeled with a fallback "Managed via Upstream Proxy Settings" management surface when translations are unavailable.
- **fix(electron):** Harden the production desktop CSP by removing `unsafe-eval` outside development and adding object, base URI, form action, frame ancestor, and worker restrictions.
- **fix(cli):** Replace shell-interpolated setup and privileged command execution paths with argument-based `spawn`/`execFile` helpers for database setup, Tailscale sudo commands, MITM DNS edits, and certificate install/uninstall flows.
- **fix(ui):** Keep provider icons resilient by using direct `@lobehub/icons` components first, then local PNG/SVG fallbacks, avoiding the `@lobehub/ui` peer runtime in the dashboard.

- **Cache Dashboard Sizing:** Improved the UI layout sizes and context headers for the advanced cache pages (#835)
- **Debug Sidebar Visibility:** Fixed an issue where the debug toggle wouldn't correctly show/hide sidebar debug details (#834)
- **Gemini Model Prefixing:** Modified the namespace fallback to properly route via `gemini-cli/` instead of `gc/` to respect upstream specs (#831)
- **OpenRouter Sync:** Improved compatibility synchronization to automatically ingest the available models catalog correctly from OpenRouter (#830)
- **Streaming Payloads Mapping:** Reserialization of reasoning fields natively resolves conflict alias paths when output is streaming to edge devices

---

## [3.3.7] - 2026-03-30

### 🐛 Bug Fixes

- **fix(mitm):** Compile MITM utilities as NodeNext ESM during prepublish, copy the CommonJS MITM server into the standalone artifact, and resolve MITM data paths without relying on Next.js aliases in packaged runtime.
- **fix(build):** Move the local `.tmp/wine32` Wine prefix out of the isolated Next.js build path so Windows Electron packaging artifacts cannot trigger `EACCES` scans during Node 24 builds.
- **fix(build):** Copy the `wreq-js` native runtime directory into the isolated Next.js standalone output so packaged Playwright/E2E starts can load the instrumentation hook on Linux.
- **fix(api):** Validate the Codex Responses websocket bridge and `/v1/batches` JSON payloads with Zod before use, keeping `request.json()` route validation green and returning explicit 400 responses for invalid bodies.
- **fix(providers):** Add explicit typing to provider alias and category helpers so the strict `typecheck:noimplicit:core` CI gate passes.
- **fix(ui):** Keep the upstream proxy provider detail page labeled with a fallback "Managed via Upstream Proxy Settings" management surface when translations are unavailable.
- **fix(electron):** Harden the production desktop CSP by removing `unsafe-eval` outside development and adding object, base URI, form action, frame ancestor, and worker restrictions.
- **fix(cli):** Replace shell-interpolated setup and privileged command execution paths with argument-based `spawn`/`execFile` helpers for database setup, Tailscale sudo commands, MITM DNS edits, and certificate install/uninstall flows.
- **fix(ui):** Keep provider icons resilient by using direct `@lobehub/icons` components first, then local PNG/SVG fallbacks, avoiding the `@lobehub/ui` peer runtime in the dashboard.

- **OpenCode Config:** Restructured generated `opencode.json` to use the `@ai-sdk/openai-compatible` record-based schema with `options` and `models` as object maps instead of flat arrays, fixing config validation failures (#816)
- **i18n Missing Keys:** Added missing `cloudflaredUrlNotice` translation key across all 30 language files to prevent `MISSING_MESSAGE` console errors in the Endpoint page (#823)

---

## [3.3.6] - 2026-03-30

### 🐛 Bug Fixes

- **fix(mitm):** Compile MITM utilities as NodeNext ESM during prepublish, copy the CommonJS MITM server into the standalone artifact, and resolve MITM data paths without relying on Next.js aliases in packaged runtime.
- **fix(build):** Move the local `.tmp/wine32` Wine prefix out of the isolated Next.js build path so Windows Electron packaging artifacts cannot trigger `EACCES` scans during Node 24 builds.
- **fix(build):** Copy the `wreq-js` native runtime directory into the isolated Next.js standalone output so packaged Playwright/E2E starts can load the instrumentation hook on Linux.
- **fix(api):** Validate the Codex Responses websocket bridge and `/v1/batches` JSON payloads with Zod before use, keeping `request.json()` route validation green and returning explicit 400 responses for invalid bodies.
- **fix(providers):** Add explicit typing to provider alias and category helpers so the strict `typecheck:noimplicit:core` CI gate passes.
- **fix(ui):** Keep the upstream proxy provider detail page labeled with a fallback "Managed via Upstream Proxy Settings" management surface when translations are unavailable.
- **fix(electron):** Harden the production desktop CSP by removing `unsafe-eval` outside development and adding object, base URI, form action, frame ancestor, and worker restrictions.
- **fix(cli):** Replace shell-interpolated setup and privileged command execution paths with argument-based `spawn`/`execFile` helpers for database setup, Tailscale sudo commands, MITM DNS edits, and certificate install/uninstall flows.
- **fix(ui):** Keep provider icons resilient by using direct `@lobehub/icons` components first, then local PNG/SVG fallbacks, avoiding the `@lobehub/ui` peer runtime in the dashboard.

- **Token Accounting:** Included prompt cache tokens safely in historical usage inputs calculations for correct quota deductions (PR #822)
- **Combo Test Probes:** Fixed combo testing logic false negatives by resolving parsing for reasoning-only responses and enabled massive parallelization via Promise.all (PR #828)
- **Docker Quick Tunnels:** Embedded required ca-certificates inside the base runtime container to resolve Cloudflared TLS startup failures, and surfaced stdout network errors replacing generic exit codes (PR #829)

---

## [3.3.5] - 2026-03-30

### ✨ New Features

- **feat(providers):** Implement Image Generation and Editing capabilities for ChatGPT Web, including in-band chat image generation and caching (#1606).
- **feat(ui):** Integrate OpenCode Zen/Go API tool logo SVG and polish API key copy-to-clipboard interactions (#1607).

- **feat(providers):** Integrate AgentRouter as a new OpenAI-compatible passthrough provider with $200 free credits via sign-up (Issue #1572).
- **feat(ui):** Implement on-demand per-model testing in the provider dashboard, allowing single-token diagnostic checks without triggering rate-limits (Issue #1532).

- **Gemini Quota Tracking:** Added real-time Gemini CLI quota tracking via the `retrieveUserQuota` API (PR #825)
- **Cache Dashboard:** Enhanced the Cache Dashboard to display prompt cache metrics, 24h trends, and estimated cost savings (PR #824)

### 🐛 Bug Fixes

- **fix(mitm):** Compile MITM utilities as NodeNext ESM during prepublish, copy the CommonJS MITM server into the standalone artifact, and resolve MITM data paths without relying on Next.js aliases in packaged runtime.
- **fix(build):** Move the local `.tmp/wine32` Wine prefix out of the isolated Next.js build path so Windows Electron packaging artifacts cannot trigger `EACCES` scans during Node 24 builds.
- **fix(build):** Copy the `wreq-js` native runtime directory into the isolated Next.js standalone output so packaged Playwright/E2E starts can load the instrumentation hook on Linux.
- **fix(api):** Validate the Codex Responses websocket bridge and `/v1/batches` JSON payloads with Zod before use, keeping `request.json()` route validation green and returning explicit 400 responses for invalid bodies.
- **fix(providers):** Add explicit typing to provider alias and category helpers so the strict `typecheck:noimplicit:core` CI gate passes.
- **fix(ui):** Keep the upstream proxy provider detail page labeled with a fallback "Managed via Upstream Proxy Settings" management surface when translations are unavailable.
- **fix(electron):** Harden the production desktop CSP by removing `unsafe-eval` outside development and adding object, base URI, form action, frame ancestor, and worker restrictions.
- **fix(cli):** Replace shell-interpolated setup and privileged command execution paths with argument-based `spawn`/`execFile` helpers for database setup, Tailscale sudo commands, MITM DNS edits, and certificate install/uninstall flows.
- **fix(ui):** Keep provider icons resilient by using direct `@lobehub/icons` components first, then local PNG/SVG fallbacks, avoiding the `@lobehub/ui` peer runtime in the dashboard.

- **User Experience:** Removed invasive auto-opening OAuth modal loops on barren provider detailed pages (PR #820)
- **Dependency Updates:** Bumped and locked down dependencies for development and production trees including Next.js 16.2.1, Recharts, and TailwindCSS 4.2.2 (PR #826, #827)

---

## [3.3.4] - 2026-03-30

### ✨ New Features

- **feat(providers):** Implement Image Generation and Editing capabilities for ChatGPT Web, including in-band chat image generation and caching (#1606).
- **feat(ui):** Integrate OpenCode Zen/Go API tool logo SVG and polish API key copy-to-clipboard interactions (#1607).

- **feat(providers):** Integrate AgentRouter as a new OpenAI-compatible passthrough provider with $200 free credits via sign-up (Issue #1572).
- **feat(ui):** Implement on-demand per-model testing in the provider dashboard, allowing single-token diagnostic checks without triggering rate-limits (Issue #1532).

- **A2A Workflows:** Added deterministic FSM orchestrator for multi-step agent workflows.
- **Graceful Degradation:** Added a new multi-layer fallback framework to preserve core functionality during partial system outages.
- **Config Audit:** Added an audit trail with diff detection to track changes and enable configuration rollbacks.
- **Provider Health:** Added provider expiration tracking with proactive UI alerts for expiring API keys.
- **Adaptive Routing:** Added an adaptive volume and complexity detector to override routing strategies dynamically based on load.
- **Provider Diversity:** Implemented provider diversity scoring via Shannon entropy to improve load distribution.
- **Auto-Disable Bounds:** Added an Auto-Disable Banned Accounts setting toggle to the Resilience dashboard.

### 🐛 Bug Fixes

- **fix(mitm):** Compile MITM utilities as NodeNext ESM during prepublish, copy the CommonJS MITM server into the standalone artifact, and resolve MITM data paths without relying on Next.js aliases in packaged runtime.
- **fix(build):** Move the local `.tmp/wine32` Wine prefix out of the isolated Next.js build path so Windows Electron packaging artifacts cannot trigger `EACCES` scans during Node 24 builds.
- **fix(build):** Copy the `wreq-js` native runtime directory into the isolated Next.js standalone output so packaged Playwright/E2E starts can load the instrumentation hook on Linux.
- **fix(api):** Validate the Codex Responses websocket bridge and `/v1/batches` JSON payloads with Zod before use, keeping `request.json()` route validation green and returning explicit 400 responses for invalid bodies.
- **fix(providers):** Add explicit typing to provider alias and category helpers so the strict `typecheck:noimplicit:core` CI gate passes.
- **fix(ui):** Keep the upstream proxy provider detail page labeled with a fallback "Managed via Upstream Proxy Settings" management surface when translations are unavailable.
- **fix(electron):** Harden the production desktop CSP by removing `unsafe-eval` outside development and adding object, base URI, form action, frame ancestor, and worker restrictions.
- **fix(cli):** Replace shell-interpolated setup and privileged command execution paths with argument-based `spawn`/`execFile` helpers for database setup, Tailscale sudo commands, MITM DNS edits, and certificate install/uninstall flows.
- **fix(ui):** Keep provider icons resilient by using direct `@lobehub/icons` components first, then local PNG/SVG fallbacks, avoiding the `@lobehub/ui` peer runtime in the dashboard.

- **Codex & Claude Compatibility:** Fixed UI fallbacks, patched Codex non-streaming integration issues, and resolved CLI runtime detection on Windows.
- **Release Automation:** Expanded permissions required for the Electron App build in GitHub Actions.
- **Cloudflare Runtime:** Addressed correct runtime isolation exit codes for Cloudflared tunnel components.

### 🧪 Tests

- **Test Suite Updates:** Expanded test coverage for volume detectors, provider diversity, configuration audit, and FSM.

---

## [3.3.3] - 2026-03-29

### 🐛 Bug Fixes

- **fix(mitm):** Compile MITM utilities as NodeNext ESM during prepublish, copy the CommonJS MITM server into the standalone artifact, and resolve MITM data paths without relying on Next.js aliases in packaged runtime.
- **fix(build):** Move the local `.tmp/wine32` Wine prefix out of the isolated Next.js build path so Windows Electron packaging artifacts cannot trigger `EACCES` scans during Node 24 builds.
- **fix(build):** Copy the `wreq-js` native runtime directory into the isolated Next.js standalone output so packaged Playwright/E2E starts can load the instrumentation hook on Linux.
- **fix(api):** Validate the Codex Responses websocket bridge and `/v1/batches` JSON payloads with Zod before use, keeping `request.json()` route validation green and returning explicit 400 responses for invalid bodies.
- **fix(providers):** Add explicit typing to provider alias and category helpers so the strict `typecheck:noimplicit:core` CI gate passes.
- **fix(ui):** Keep the upstream proxy provider detail page labeled with a fallback "Managed via Upstream Proxy Settings" management surface when translations are unavailable.
- **fix(electron):** Harden the production desktop CSP by removing `unsafe-eval` outside development and adding object, base URI, form action, frame ancestor, and worker restrictions.
- **fix(cli):** Replace shell-interpolated setup and privileged command execution paths with argument-based `spawn`/`execFile` helpers for database setup, Tailscale sudo commands, MITM DNS edits, and certificate install/uninstall flows.
- **fix(ui):** Keep provider icons resilient by using direct `@lobehub/icons` components first, then local PNG/SVG fallbacks, avoiding the `@lobehub/ui` peer runtime in the dashboard.

- **CI/CD Reliability:** Patched GitHub Actions to stable dependency versions (`actions/checkout@v4`, `actions/upload-artifact@v4`) to mitigate unannounced builder environment deprecations.
- **Image Fallbacks:** Replaced arbitrary fallback chains in `ProviderIcon.tsx` with explicit asset validation to prevent UI loading `<Image>` components for files that don't exist, eliminating `404` errors in dashboard console logs (#745).
- **Admin Updater:** Dynamic source-installation detection for the dashboard Updater. Safely disables the `Update Now` button when OmniRoute is built locally rather than through npm, prompting for `git pull` (#743).
- **Update ERESOLVE Error:** Injected `package.json` overrides for `react`/`react-dom` and enabled `--legacy-peer-deps` within the internal automatic updater scripts to resolve breaking dependency tree conflicts with `@lobehub/ui`.

---

## [3.3.2] - 2026-03-29

### ✨ New Features

- **feat(providers):** Implement Image Generation and Editing capabilities for ChatGPT Web, including in-band chat image generation and caching (#1606).
- **feat(ui):** Integrate OpenCode Zen/Go API tool logo SVG and polish API key copy-to-clipboard interactions (#1607).

- **feat(providers):** Integrate AgentRouter as a new OpenAI-compatible passthrough provider with $200 free credits via sign-up (Issue #1572).
- **feat(ui):** Implement on-demand per-model testing in the provider dashboard, allowing single-token diagnostic checks without triggering rate-limits (Issue #1532).

- **Cloudflare Tunnels:** Cloudflare Quick Tunnel integration with dashboard controls (PR #772).
- **Diagnostics:** Semantic cache bypass for combo live tests (PR #773).

### 🐛 Bug Fixes

- **fix(mitm):** Compile MITM utilities as NodeNext ESM during prepublish, copy the CommonJS MITM server into the standalone artifact, and resolve MITM data paths without relying on Next.js aliases in packaged runtime.
- **fix(build):** Move the local `.tmp/wine32` Wine prefix out of the isolated Next.js build path so Windows Electron packaging artifacts cannot trigger `EACCES` scans during Node 24 builds.
- **fix(build):** Copy the `wreq-js` native runtime directory into the isolated Next.js standalone output so packaged Playwright/E2E starts can load the instrumentation hook on Linux.
- **fix(api):** Validate the Codex Responses websocket bridge and `/v1/batches` JSON payloads with Zod before use, keeping `request.json()` route validation green and returning explicit 400 responses for invalid bodies.
- **fix(providers):** Add explicit typing to provider alias and category helpers so the strict `typecheck:noimplicit:core` CI gate passes.
- **fix(ui):** Keep the upstream proxy provider detail page labeled with a fallback "Managed via Upstream Proxy Settings" management surface when translations are unavailable.
- **fix(electron):** Harden the production desktop CSP by removing `unsafe-eval` outside development and adding object, base URI, form action, frame ancestor, and worker restrictions.
- **fix(cli):** Replace shell-interpolated setup and privileged command execution paths with argument-based `spawn`/`execFile` helpers for database setup, Tailscale sudo commands, MITM DNS edits, and certificate install/uninstall flows.
- **fix(ui):** Keep provider icons resilient by using direct `@lobehub/icons` components first, then local PNG/SVG fallbacks, avoiding the `@lobehub/ui` peer runtime in the dashboard.

- **Streaming Stability:** Apply `FETCH_TIMEOUT_MS` to streaming requests' initial `fetch()` call to prevent 300s Node.js TCP timeout causing silent task failures (#769).
- **i18n:** Add missing `windsurf` and `copilot` entries to `toolDescriptions` across all 33 locale files (#748).
- **GLM Coding Audit:** Complete provider audit fixing ReDoS vulnerabilities, context window sizing (128k/16k), and model registry syncing (PR #778).

---

## [3.3.1] - 2026-03-29

### 🐛 Bug Fixes

- **fix(mitm):** Compile MITM utilities as NodeNext ESM during prepublish, copy the CommonJS MITM server into the standalone artifact, and resolve MITM data paths without relying on Next.js aliases in packaged runtime.
- **fix(build):** Move the local `.tmp/wine32` Wine prefix out of the isolated Next.js build path so Windows Electron packaging artifacts cannot trigger `EACCES` scans during Node 24 builds.
- **fix(build):** Copy the `wreq-js` native runtime directory into the isolated Next.js standalone output so packaged Playwright/E2E starts can load the instrumentation hook on Linux.
- **fix(api):** Validate the Codex Responses websocket bridge and `/v1/batches` JSON payloads with Zod before use, keeping `request.json()` route validation green and returning explicit 400 responses for invalid bodies.
- **fix(providers):** Add explicit typing to provider alias and category helpers so the strict `typecheck:noimplicit:core` CI gate passes.
- **fix(ui):** Keep the upstream proxy provider detail page labeled with a fallback "Managed via Upstream Proxy Settings" management surface when translations are unavailable.
- **fix(electron):** Harden the production desktop CSP by removing `unsafe-eval` outside development and adding object, base URI, form action, frame ancestor, and worker restrictions.
- **fix(cli):** Replace shell-interpolated setup and privileged command execution paths with argument-based `spawn`/`execFile` helpers for database setup, Tailscale sudo commands, MITM DNS edits, and certificate install/uninstall flows.
- **fix(ui):** Keep provider icons resilient by using direct `@lobehub/icons` components first, then local PNG/SVG fallbacks, avoiding the `@lobehub/ui` peer runtime in the dashboard.

- **OpenAI Codex:** Fallback processing fix for `type: "text"` elements carrying null or empty datasets that caused 400 rejection (#742).
- **Opencode:** Update schema alignment to singular `provider` to match official spec (#774).
- **Gemini CLI:** Inject missing end-user quota headers preventing 403 authorization lockouts (#775).
- **DB Recovery:** Refactor multipart payload imports into raw binary buffered arrays to bypass reverse proxy max body limits (#770).

---

## [3.3.0] - 2026-03-29

### ✨ Enhancements & Refactoring

- **Release Stabilization** — Finalized v3.2.9 release (combo diagnostics, quality gates, Gemini tool fix) and created missing git tag. Consolidated all staged changes into a single atomic release commit.

### 🐛 Bug Fixes

- **fix(mitm):** Compile MITM utilities as NodeNext ESM during prepublish, copy the CommonJS MITM server into the standalone artifact, and resolve MITM data paths without relying on Next.js aliases in packaged runtime.
- **fix(build):** Move the local `.tmp/wine32` Wine prefix out of the isolated Next.js build path so Windows Electron packaging artifacts cannot trigger `EACCES` scans during Node 24 builds.
- **fix(build):** Copy the `wreq-js` native runtime directory into the isolated Next.js standalone output so packaged Playwright/E2E starts can load the instrumentation hook on Linux.
- **fix(api):** Validate the Codex Responses websocket bridge and `/v1/batches` JSON payloads with Zod before use, keeping `request.json()` route validation green and returning explicit 400 responses for invalid bodies.
- **fix(providers):** Add explicit typing to provider alias and category helpers so the strict `typecheck:noimplicit:core` CI gate passes.
- **fix(ui):** Keep the upstream proxy provider detail page labeled with a fallback "Managed via Upstream Proxy Settings" management surface when translations are unavailable.
- **fix(electron):** Harden the production desktop CSP by removing `unsafe-eval` outside development and adding object, base URI, form action, frame ancestor, and worker restrictions.
- **fix(cli):** Replace shell-interpolated setup and privileged command execution paths with argument-based `spawn`/`execFile` helpers for database setup, Tailscale sudo commands, MITM DNS edits, and certificate install/uninstall flows.
- **fix(ui):** Keep provider icons resilient by using direct `@lobehub/icons` components first, then local PNG/SVG fallbacks, avoiding the `@lobehub/ui` peer runtime in the dashboard.

- **Auto-Update Test** — Fixed `buildDockerComposeUpdateScript` test assertion to match unexpanded shell variable references (`$TARGET_TAG`, `${TARGET_TAG#v}`) in the generated deploy script, aligning with the refactored template from v3.2.8.
- **Circuit Breaker Test** — Hardened `combo-circuit-breaker.test.mjs` by injecting `maxRetries: 0` to prevent retry inflation from skewing failure count assertions during breaker state transitions.

---

## [3.2.9] - 2026-03-29

### ✨ Enhancements & Refactoring

- **Combo Diagnostics** — Introduced a live test bypass flag (`forceLiveComboTest`) allowing administrators to execute real upstream health checks that bypass all local circuit-breaker and cooldown state mechanisms, enabling precise diagnostics during rolling outages (PR #759)
- **Quality Gates** — Added automated response quality validation for combos and officially integrated `claude-4.6` model support into the core routing schemas (PR #762)

### 🐛 Bug Fixes

- **fix(mitm):** Compile MITM utilities as NodeNext ESM during prepublish, copy the CommonJS MITM server into the standalone artifact, and resolve MITM data paths without relying on Next.js aliases in packaged runtime.
- **fix(build):** Move the local `.tmp/wine32` Wine prefix out of the isolated Next.js build path so Windows Electron packaging artifacts cannot trigger `EACCES` scans during Node 24 builds.
- **fix(build):** Copy the `wreq-js` native runtime directory into the isolated Next.js standalone output so packaged Playwright/E2E starts can load the instrumentation hook on Linux.
- **fix(api):** Validate the Codex Responses websocket bridge and `/v1/batches` JSON payloads with Zod before use, keeping `request.json()` route validation green and returning explicit 400 responses for invalid bodies.
- **fix(providers):** Add explicit typing to provider alias and category helpers so the strict `typecheck:noimplicit:core` CI gate passes.
- **fix(ui):** Keep the upstream proxy provider detail page labeled with a fallback "Managed via Upstream Proxy Settings" management surface when translations are unavailable.
- **fix(electron):** Harden the production desktop CSP by removing `unsafe-eval` outside development and adding object, base URI, form action, frame ancestor, and worker restrictions.
- **fix(cli):** Replace shell-interpolated setup and privileged command execution paths with argument-based `spawn`/`execFile` helpers for database setup, Tailscale sudo commands, MITM DNS edits, and certificate install/uninstall flows.
- **fix(ui):** Keep provider icons resilient by using direct `@lobehub/icons` components first, then local PNG/SVG fallbacks, avoiding the `@lobehub/ui` peer runtime in the dashboard.

- **Tool Definition Validation** — Repaired Gemini API integration by normalizing enum types inside tool definitions, preventing upstream HTTP 400 parameter errors (PR #760)

---

## [3.2.8] - 2026-03-29

### ✨ Enhancements & Refactoring

- **Docker Auto-Update UI** — Integrated a detached background update process for Docker Compose deployments. The Dashboard UI now seamlessly tracks update lifecycle events combining JSON REST responses with SSE streaming progress overlays for robust cross-environment reliability.
- **Cache Analytics** — Repaired zero-metrics visualization mapping by migrating Semantic Cache telemetry logs directly into the centralized tracking SQLite module.

### 🐛 Bug Fixes

- **fix(mitm):** Compile MITM utilities as NodeNext ESM during prepublish, copy the CommonJS MITM server into the standalone artifact, and resolve MITM data paths without relying on Next.js aliases in packaged runtime.
- **fix(build):** Move the local `.tmp/wine32` Wine prefix out of the isolated Next.js build path so Windows Electron packaging artifacts cannot trigger `EACCES` scans during Node 24 builds.
- **fix(build):** Copy the `wreq-js` native runtime directory into the isolated Next.js standalone output so packaged Playwright/E2E starts can load the instrumentation hook on Linux.
- **fix(api):** Validate the Codex Responses websocket bridge and `/v1/batches` JSON payloads with Zod before use, keeping `request.json()` route validation green and returning explicit 400 responses for invalid bodies.
- **fix(providers):** Add explicit typing to provider alias and category helpers so the strict `typecheck:noimplicit:core` CI gate passes.
- **fix(ui):** Keep the upstream proxy provider detail page labeled with a fallback "Managed via Upstream Proxy Settings" management surface when translations are unavailable.
- **fix(electron):** Harden the production desktop CSP by removing `unsafe-eval` outside development and adding object, base URI, form action, frame ancestor, and worker restrictions.
- **fix(cli):** Replace shell-interpolated setup and privileged command execution paths with argument-based `spawn`/`execFile` helpers for database setup, Tailscale sudo commands, MITM DNS edits, and certificate install/uninstall flows.
- **fix(ui):** Keep provider icons resilient by using direct `@lobehub/icons` components first, then local PNG/SVG fallbacks, avoiding the `@lobehub/ui` peer runtime in the dashboard.

- **Authentication Logic** — Fixed a bug where saving dashboard settings or adding models failed with a 401 Unauthorized error when `requireLogin` was disabled. API endpoints now correctly evaluate the global authentication toggle. Resolved global redirection by reactivating `src/middleware.ts`.
- **CLI Tool Detection (Windows)** — Prevented fatal initialization exceptions during CLI environment detection by catching `cross-spawn` ENOENT errors correctly. Adds explicit detection paths for `\AppData\Local\droid\droid.exe`.
- **Codex Native Passthrough** — Normalized model translation parameters preventing context poisoning in proxy pass-through mode, enforcing generic `store: false` constraints explicitly for all Codex-originated requests.
- **SSE Token Reporting** — Normalized provider tool-call chunk `finish_reason` detection, fixing 0% Usage analytics for stream-only responses missing strict `<DONE>` indicators.
- **DeepSeek <think> Tags** — Implemented an explicit `<think>` extraction mapping inside `responsesHandler.ts`, ensuring DeepSeek reasoning streams map equivalently to native Anthropic `<thinking>` structures.

---

## [3.2.7] - 2026-03-29

### Fixed

- **Seamless UI Updates**: The "Update Now" feature on the Dashboard now provides live, transparent feedback using Server-Sent Events (SSE). It performs package installation, native module rebuilds (better-sqlite3), and PM2 restarts reliably while showing real-time loaders instead of silently hanging.

---

## [3.2.6] — 2026-03-29

### ✨ Enhancements & Refactoring

- **API Key Reveal (#740)** — Added a scoped API key copy flow in the Api Manager, protected by the `ALLOW_API_KEY_REVEAL` environment variable.
- **Sidebar Visibility Controls (#739)** — Admins can now hide any sidebar navigation link via the Appearance settings to reduce visual clutter.
- **Strict Combo Testing (#735)** — Hardened the combo health check endpoint to require live text responses from models instead of just soft reachability signals.
- **Streamed Detailed Logs (#734)** — Switched detailed request logging for SSE streams to reconstruct the final payload, saving immense amounts of SQLite database size and significantly cleaning up the UI.

### 🐛 Bug Fixes

- **fix(mitm):** Compile MITM utilities as NodeNext ESM during prepublish, copy the CommonJS MITM server into the standalone artifact, and resolve MITM data paths without relying on Next.js aliases in packaged runtime.
- **fix(build):** Move the local `.tmp/wine32` Wine prefix out of the isolated Next.js build path so Windows Electron packaging artifacts cannot trigger `EACCES` scans during Node 24 builds.
- **fix(build):** Copy the `wreq-js` native runtime directory into the isolated Next.js standalone output so packaged Playwright/E2E starts can load the instrumentation hook on Linux.
- **fix(api):** Validate the Codex Responses websocket bridge and `/v1/batches` JSON payloads with Zod before use, keeping `request.json()` route validation green and returning explicit 400 responses for invalid bodies.
- **fix(providers):** Add explicit typing to provider alias and category helpers so the strict `typecheck:noimplicit:core` CI gate passes.
- **fix(ui):** Keep the upstream proxy provider detail page labeled with a fallback "Managed via Upstream Proxy Settings" management surface when translations are unavailable.
- **fix(electron):** Harden the production desktop CSP by removing `unsafe-eval` outside development and adding object, base URI, form action, frame ancestor, and worker restrictions.
- **fix(cli):** Replace shell-interpolated setup and privileged command execution paths with argument-based `spawn`/`execFile` helpers for database setup, Tailscale sudo commands, MITM DNS edits, and certificate install/uninstall flows.
- **fix(ui):** Keep provider icons resilient by using direct `@lobehub/icons` components first, then local PNG/SVG fallbacks, avoiding the `@lobehub/ui` peer runtime in the dashboard.

- **OpenCode Go MiniMax Auth (#733)** — Corrected the authentication header logic for `minimax` models on OpenCode Go to use `x-api-key` instead of standard bearer tokens across the `/messages` protocol.

---

## [3.2.5] — 2026-03-29

### ✨ Enhancements & Refactoring

- **Void Linux Deployment Support (#732)** — Integrated `xbps-src` packaging template and instructions to natively compile and install OmniRoute with `better-sqlite3` bindings via cross-compilation target.

## [3.2.4] — 2026-03-29

### ✨ Enhancements & Refactoring

- **Qoder AI Migration (#660)** — Completely migrated the legacy `iFlow` core provider onto `Qoder AI` maintaining stable API routing capabilities.

### 🐛 Bug Fixes

- **fix(mitm):** Compile MITM utilities as NodeNext ESM during prepublish, copy the CommonJS MITM server into the standalone artifact, and resolve MITM data paths without relying on Next.js aliases in packaged runtime.
- **fix(build):** Move the local `.tmp/wine32` Wine prefix out of the isolated Next.js build path so Windows Electron packaging artifacts cannot trigger `EACCES` scans during Node 24 builds.
- **fix(build):** Copy the `wreq-js` native runtime directory into the isolated Next.js standalone output so packaged Playwright/E2E starts can load the instrumentation hook on Linux.
- **fix(api):** Validate the Codex Responses websocket bridge and `/v1/batches` JSON payloads with Zod before use, keeping `request.json()` route validation green and returning explicit 400 responses for invalid bodies.
- **fix(providers):** Add explicit typing to provider alias and category helpers so the strict `typecheck:noimplicit:core` CI gate passes.
- **fix(ui):** Keep the upstream proxy provider detail page labeled with a fallback "Managed via Upstream Proxy Settings" management surface when translations are unavailable.
- **fix(electron):** Harden the production desktop CSP by removing `unsafe-eval` outside development and adding object, base URI, form action, frame ancestor, and worker restrictions.
- **fix(cli):** Replace shell-interpolated setup and privileged command execution paths with argument-based `spawn`/`execFile` helpers for database setup, Tailscale sudo commands, MITM DNS edits, and certificate install/uninstall flows.
- **fix(ui):** Keep provider icons resilient by using direct `@lobehub/icons` components first, then local PNG/SVG fallbacks, avoiding the `@lobehub/ui` peer runtime in the dashboard.

- **Gemini Tools HTTP 400 Payload Invalid Argument (#731)** — Prevented `thoughtSignature` array injections inside standard Gemini `functionCall` sequences blocking agentic routing flows.

---

## [3.2.3] — 2026-03-29

### ✨ Enhancements & Refactoring

- **Provider Limits Quota UI (#728)** — Normalized quota limit logic and data labeling inside the Limits interface.

### 🐛 Bug Fixes

- **fix(mitm):** Compile MITM utilities as NodeNext ESM during prepublish, copy the CommonJS MITM server into the standalone artifact, and resolve MITM data paths without relying on Next.js aliases in packaged runtime.
- **fix(build):** Move the local `.tmp/wine32` Wine prefix out of the isolated Next.js build path so Windows Electron packaging artifacts cannot trigger `EACCES` scans during Node 24 builds.
- **fix(build):** Copy the `wreq-js` native runtime directory into the isolated Next.js standalone output so packaged Playwright/E2E starts can load the instrumentation hook on Linux.
- **fix(api):** Validate the Codex Responses websocket bridge and `/v1/batches` JSON payloads with Zod before use, keeping `request.json()` route validation green and returning explicit 400 responses for invalid bodies.
- **fix(providers):** Add explicit typing to provider alias and category helpers so the strict `typecheck:noimplicit:core` CI gate passes.
- **fix(ui):** Keep the upstream proxy provider detail page labeled with a fallback "Managed via Upstream Proxy Settings" management surface when translations are unavailable.
- **fix(electron):** Harden the production desktop CSP by removing `unsafe-eval` outside development and adding object, base URI, form action, frame ancestor, and worker restrictions.
- **fix(cli):** Replace shell-interpolated setup and privileged command execution paths with argument-based `spawn`/`execFile` helpers for database setup, Tailscale sudo commands, MITM DNS edits, and certificate install/uninstall flows.
- **fix(ui):** Keep provider icons resilient by using direct `@lobehub/icons` components first, then local PNG/SVG fallbacks, avoiding the `@lobehub/ui` peer runtime in the dashboard.

- **Core Routing Schemas & Leaks** — Expanded `comboStrategySchema` to natively support `fill-first` and `p2c` strategies to unblock complex combo editing natively.
- **Thinking Tags Extraction (CLI)** — Restructured CLI token responses sanitizer RegEx capturing model reasoning structures inside streams avoiding broken `<thinking>` extractions breaking response text output format.
- **Strict Format Enforcements** — Hardened pipeline sanitization execution making it universally apply to translation mode targets.

---

## [3.2.2] — 2026-03-29

### ✨ New Features

- **feat(providers):** Implement Image Generation and Editing capabilities for ChatGPT Web, including in-band chat image generation and caching (#1606).
- **feat(ui):** Integrate OpenCode Zen/Go API tool logo SVG and polish API key copy-to-clipboard interactions (#1607).

- **feat(providers):** Integrate AgentRouter as a new OpenAI-compatible passthrough provider with $200 free credits via sign-up (Issue #1572).
- **feat(ui):** Implement on-demand per-model testing in the provider dashboard, allowing single-token diagnostic checks without triggering rate-limits (Issue #1532).

- **Four-Stage Request Log Pipeline (#705)** — Refactored log persistence to save comprehensive payloads at four distinct pipeline stages: Client Request, Translated Provider Request, Provider Response, and Translated Client Response. Introduced `streamPayloadCollector` for robust SSE stream truncation and payload serialization.

### 🐛 Bug Fixes

- **fix(mitm):** Compile MITM utilities as NodeNext ESM during prepublish, copy the CommonJS MITM server into the standalone artifact, and resolve MITM data paths without relying on Next.js aliases in packaged runtime.
- **fix(build):** Move the local `.tmp/wine32` Wine prefix out of the isolated Next.js build path so Windows Electron packaging artifacts cannot trigger `EACCES` scans during Node 24 builds.
- **fix(build):** Copy the `wreq-js` native runtime directory into the isolated Next.js standalone output so packaged Playwright/E2E starts can load the instrumentation hook on Linux.
- **fix(api):** Validate the Codex Responses websocket bridge and `/v1/batches` JSON payloads with Zod before use, keeping `request.json()` route validation green and returning explicit 400 responses for invalid bodies.
- **fix(providers):** Add explicit typing to provider alias and category helpers so the strict `typecheck:noimplicit:core` CI gate passes.
- **fix(ui):** Keep the upstream proxy provider detail page labeled with a fallback "Managed via Upstream Proxy Settings" management surface when translations are unavailable.
- **fix(electron):** Harden the production desktop CSP by removing `unsafe-eval` outside development and adding object, base URI, form action, frame ancestor, and worker restrictions.
- **fix(cli):** Replace shell-interpolated setup and privileged command execution paths with argument-based `spawn`/`execFile` helpers for database setup, Tailscale sudo commands, MITM DNS edits, and certificate install/uninstall flows.
- **fix(ui):** Keep provider icons resilient by using direct `@lobehub/icons` components first, then local PNG/SVG fallbacks, avoiding the `@lobehub/ui` peer runtime in the dashboard.

- **Mobile UI Fixes (#659)** — Prevented table components on the dashboard from breaking the layout on narrow viewports by adding proper horizontal scrolling and overflow containment to `DashboardLayout`.
- **Claude Prompt Cache Fixes (#708)** — Ensured `cache_control` blocks in Claude-to-Claude fallback loops are faithfully preserved and passed safely back to Anthropic models.
- **Gemini Tool Definitions (#725)** — Fixed schema translation errors when declaring simple `object` parameter types for Gemini function calling.

## [3.2.1] — 2026-03-29

### ✨ New Features

- **feat(providers):** Implement Image Generation and Editing capabilities for ChatGPT Web, including in-band chat image generation and caching (#1606).
- **feat(ui):** Integrate OpenCode Zen/Go API tool logo SVG and polish API key copy-to-clipboard interactions (#1607).

- **feat(providers):** Integrate AgentRouter as a new OpenAI-compatible passthrough provider with $200 free credits via sign-up (Issue #1572).
- **feat(ui):** Implement on-demand per-model testing in the provider dashboard, allowing single-token diagnostic checks without triggering rate-limits (Issue #1532).

- **Global Fallback Provider (#689)** — When all combo models are exhausted (502/503), OmniRoute now attempts a configurable global fallback model before returning the error. Set `globalFallbackModel` in settings to enable.

### 🐛 Bug Fixes

- **fix(mitm):** Compile MITM utilities as NodeNext ESM during prepublish, copy the CommonJS MITM server into the standalone artifact, and resolve MITM data paths without relying on Next.js aliases in packaged runtime.
- **fix(build):** Move the local `.tmp/wine32` Wine prefix out of the isolated Next.js build path so Windows Electron packaging artifacts cannot trigger `EACCES` scans during Node 24 builds.
- **fix(build):** Copy the `wreq-js` native runtime directory into the isolated Next.js standalone output so packaged Playwright/E2E starts can load the instrumentation hook on Linux.
- **fix(api):** Validate the Codex Responses websocket bridge and `/v1/batches` JSON payloads with Zod before use, keeping `request.json()` route validation green and returning explicit 400 responses for invalid bodies.
- **fix(providers):** Add explicit typing to provider alias and category helpers so the strict `typecheck:noimplicit:core` CI gate passes.
- **fix(ui):** Keep the upstream proxy provider detail page labeled with a fallback "Managed via Upstream Proxy Settings" management surface when translations are unavailable.
- **fix(electron):** Harden the production desktop CSP by removing `unsafe-eval` outside development and adding object, base URI, form action, frame ancestor, and worker restrictions.
- **fix(cli):** Replace shell-interpolated setup and privileged command execution paths with argument-based `spawn`/`execFile` helpers for database setup, Tailscale sudo commands, MITM DNS edits, and certificate install/uninstall flows.
- **fix(ui):** Keep provider icons resilient by using direct `@lobehub/icons` components first, then local PNG/SVG fallbacks, avoiding the `@lobehub/ui` peer runtime in the dashboard.

- **Fix #721** — Fixed context pinning bypass during tool-call responses. Non-streaming tagging used wrong JSON path (`json.messages` → `json.choices[0].message`). Streaming injection now triggers on `finish_reason` chunks for tool-call-only streams. `injectModelTag()` now appends synthetic pin messages for non-string content.
- **Fix #709** — Confirmed already fixed (v3.1.9) — `system-info.mjs` creates directories recursively. Closed.
- **Fix #707** — Confirmed already fixed (v3.1.9) — empty tool name sanitization in `chatCore.ts`. Closed.

### 🧪 Tests

- Added 6 unit tests for context pinning with tool-call responses (null content, array content, roundtrip, re-injection)

## [3.2.0] — 2026-03-28

### ✨ New Features

- **feat(providers):** Implement Image Generation and Editing capabilities for ChatGPT Web, including in-band chat image generation and caching (#1606).
- **feat(ui):** Integrate OpenCode Zen/Go API tool logo SVG and polish API key copy-to-clipboard interactions (#1607).

- **feat(providers):** Integrate AgentRouter as a new OpenAI-compatible passthrough provider with $200 free credits via sign-up (Issue #1572).
- **feat(ui):** Implement on-demand per-model testing in the provider dashboard, allowing single-token diagnostic checks without triggering rate-limits (Issue #1532).

- **Cache Management UI** — Added a dedicated semantic caching dashboard at \`/dashboard/cache\` with targeted API invalidation and 31-language i18n support (PR #701 by @oyi77)
- **GLM Quota Tracking** — Added real-time usage and session quota tracking for the GLM Coding (Z.AI) provider (PR #698 by @christopher-s)
- **Detailed Log Payloads** — Wired full four-stage pipeline payload capturing (original, translated, provider-response, streamed-deltas) directly into the UI (PR #705 by @rdself)

### 🐛 Bug Fixes

- **fix(mitm):** Compile MITM utilities as NodeNext ESM during prepublish, copy the CommonJS MITM server into the standalone artifact, and resolve MITM data paths without relying on Next.js aliases in packaged runtime.
- **fix(build):** Move the local `.tmp/wine32` Wine prefix out of the isolated Next.js build path so Windows Electron packaging artifacts cannot trigger `EACCES` scans during Node 24 builds.
- **fix(build):** Copy the `wreq-js` native runtime directory into the isolated Next.js standalone output so packaged Playwright/E2E starts can load the instrumentation hook on Linux.
- **fix(api):** Validate the Codex Responses websocket bridge and `/v1/batches` JSON payloads with Zod before use, keeping `request.json()` route validation green and returning explicit 400 responses for invalid bodies.
- **fix(providers):** Add explicit typing to provider alias and category helpers so the strict `typecheck:noimplicit:core` CI gate passes.
- **fix(ui):** Keep the upstream proxy provider detail page labeled with a fallback "Managed via Upstream Proxy Settings" management surface when translations are unavailable.
- **fix(electron):** Harden the production desktop CSP by removing `unsafe-eval` outside development and adding object, base URI, form action, frame ancestor, and worker restrictions.
- **fix(cli):** Replace shell-interpolated setup and privileged command execution paths with argument-based `spawn`/`execFile` helpers for database setup, Tailscale sudo commands, MITM DNS edits, and certificate install/uninstall flows.
- **fix(ui):** Keep provider icons resilient by using direct `@lobehub/icons` components first, then local PNG/SVG fallbacks, avoiding the `@lobehub/ui` peer runtime in the dashboard.

- **Fix #708** — Prevented token bleeding for Claude Code users routing through OmniRoute by correctly preserving native \`cache_control\` headers during Claude-to-Claude passthrough (PR #708 by @tombii)
- **Fix #719** — Setup internal auth boundaries for \`ModelSyncScheduler\` to prevent unauthenticated daemon failures on startup (PR #719 by @rdself)
- **Fix #718** — Rebuilt badge rendering in Provider Limits UI preventing bad quota boundaries overlap (PR #718 by @rdself)
- **Fix #704** — Fixed Combo Fallbacks breaking on HTTP 400 content-policy errors preventing model-rotation dead-routing (PR #704 by @rdself)

### 🔒 Security & Dependencies

- Bumped \`path-to-regexp\` to \`8.4.0\` resolving dependabot vulnerabilities (PR #715)

## [3.1.10] — 2026-03-28

### 🐛 Bug Fixes

- **fix(mitm):** Compile MITM utilities as NodeNext ESM during prepublish, copy the CommonJS MITM server into the standalone artifact, and resolve MITM data paths without relying on Next.js aliases in packaged runtime.
- **fix(build):** Move the local `.tmp/wine32` Wine prefix out of the isolated Next.js build path so Windows Electron packaging artifacts cannot trigger `EACCES` scans during Node 24 builds.
- **fix(build):** Copy the `wreq-js` native runtime directory into the isolated Next.js standalone output so packaged Playwright/E2E starts can load the instrumentation hook on Linux.
- **fix(api):** Validate the Codex Responses websocket bridge and `/v1/batches` JSON payloads with Zod before use, keeping `request.json()` route validation green and returning explicit 400 responses for invalid bodies.
- **fix(providers):** Add explicit typing to provider alias and category helpers so the strict `typecheck:noimplicit:core` CI gate passes.
- **fix(ui):** Keep the upstream proxy provider detail page labeled with a fallback "Managed via Upstream Proxy Settings" management surface when translations are unavailable.
- **fix(electron):** Harden the production desktop CSP by removing `unsafe-eval` outside development and adding object, base URI, form action, frame ancestor, and worker restrictions.
- **fix(cli):** Replace shell-interpolated setup and privileged command execution paths with argument-based `spawn`/`execFile` helpers for database setup, Tailscale sudo commands, MITM DNS edits, and certificate install/uninstall flows.
- **fix(ui):** Keep provider icons resilient by using direct `@lobehub/icons` components first, then local PNG/SVG fallbacks, avoiding the `@lobehub/ui` peer runtime in the dashboard.

- **Fix #706** — Fixed icon fallback rendering caused by Tailwind V4 `font-sans` override by applying `!important` to `.material-symbols-outlined`.
- **Fix #703** — Fixed GitHub Copilot broken streams by enabling `responses` to `openai` format translation for any custom models leveraging `apiFormat: "responses"`.
- **Fix #702** — Replaced flat-rate usage tracking with accurate DB pricing calculations for both streaming and non-streaming responses.
- **Fix #716** — Cleaned up Claude tool-call translation state, correctly parsing streaming arguments and preventing OpenAI `tool_calls` chunks from repeating the `id` field.

## [3.1.9] — 2026-03-28

### ✨ New Features

- **feat(providers):** Implement Image Generation and Editing capabilities for ChatGPT Web, including in-band chat image generation and caching (#1606).
- **feat(ui):** Integrate OpenCode Zen/Go API tool logo SVG and polish API key copy-to-clipboard interactions (#1607).

- **feat(providers):** Integrate AgentRouter as a new OpenAI-compatible passthrough provider with $200 free credits via sign-up (Issue #1572).
- **feat(ui):** Implement on-demand per-model testing in the provider dashboard, allowing single-token diagnostic checks without triggering rate-limits (Issue #1532).

- **Schema Coercion** — Auto-coerce string-encoded numeric JSON Schema constraints (e.g. `"minimum": "1"`) to proper types, preventing 400 errors from Cursor, Cline, and other clients sending malformed tool schemas.
- **Tool Description Sanitization** — Ensure tool descriptions are always strings; converts `null`, `undefined`, or numeric descriptions to empty strings before sending to providers.
- **Clear All Models Button** — Added i18n translations for the "Clear All Models" provider action across all 30 languages.
- **Codex Auth Export** — Added Codex `auth.json` export and apply-local buttons for seamless CLI integration.
- **Windsurf BYOK Notes** — Added official limitation warnings to the Windsurf CLI tool card documenting BYOK constraints.

### 🐛 Bug Fixes

- **fix(mitm):** Compile MITM utilities as NodeNext ESM during prepublish, copy the CommonJS MITM server into the standalone artifact, and resolve MITM data paths without relying on Next.js aliases in packaged runtime.
- **fix(build):** Move the local `.tmp/wine32` Wine prefix out of the isolated Next.js build path so Windows Electron packaging artifacts cannot trigger `EACCES` scans during Node 24 builds.
- **fix(build):** Copy the `wreq-js` native runtime directory into the isolated Next.js standalone output so packaged Playwright/E2E starts can load the instrumentation hook on Linux.
- **fix(api):** Validate the Codex Responses websocket bridge and `/v1/batches` JSON payloads with Zod before use, keeping `request.json()` route validation green and returning explicit 400 responses for invalid bodies.
- **fix(providers):** Add explicit typing to provider alias and category helpers so the strict `typecheck:noimplicit:core` CI gate passes.
- **fix(ui):** Keep the upstream proxy provider detail page labeled with a fallback "Managed via Upstream Proxy Settings" management surface when translations are unavailable.
- **fix(electron):** Harden the production desktop CSP by removing `unsafe-eval` outside development and adding object, base URI, form action, frame ancestor, and worker restrictions.
- **fix(cli):** Replace shell-interpolated setup and privileged command execution paths with argument-based `spawn`/`execFile` helpers for database setup, Tailscale sudo commands, MITM DNS edits, and certificate install/uninstall flows.
- **fix(ui):** Keep provider icons resilient by using direct `@lobehub/icons` components first, then local PNG/SVG fallbacks, avoiding the `@lobehub/ui` peer runtime in the dashboard.

- **Fix #709** — `system-info.mjs` no longer crashes when the output directory doesn't exist (added `mkdirSync` with recursive flag).
- **Fix #710** — A2A `TaskManager` singleton now uses `globalThis` to prevent state leakage across Next.js API route recompilations in dev mode. E2E test suite updated to handle 401 gracefully.
- **Fix #711** — Added provider-specific `max_tokens` cap enforcement for upstream requests.
- **Fix #605 / #592** — Strip `proxy_` prefix from tool names in non-streaming Claude responses; fixed LongCat validation URL.
- **Call Logs Max Cap** — Upgraded `getMaxCallLogs()` with caching layer, env var support (`CALL_LOGS_MAX`), and DB settings integration.

### 🧪 Tests

- Test suite expanded from 964 → 1027 tests (63 new tests)
- Added `schema-coercion.test.mjs` — 9 tests for numeric field coercion and tool description sanitization
- Added `t40-opencode-cli-tools-integration.test.mjs` — OpenCode/Windsurf CLI integration tests
- Enhanced feature-tests branch with comprehensive coverage tooling

### 📁 New Files

| File                                                     | Purpose                                                     |
| -------------------------------------------------------- | ----------------------------------------------------------- |
| `open-sse/translator/helpers/schemaCoercion.ts`          | Schema coercion and tool description sanitization utilities |
| `tests/unit/schema-coercion.test.mjs`                    | Unit tests for schema coercion                              |
| `tests/unit/t40-opencode-cli-tools-integration.test.mjs` | CLI tool integration tests                                  |
| `COVERAGE_PLAN.md`                                       | Test coverage planning document                             |

### 🐛 Bug Fixes

- **fix(mitm):** Compile MITM utilities as NodeNext ESM during prepublish, copy the CommonJS MITM server into the standalone artifact, and resolve MITM data paths without relying on Next.js aliases in packaged runtime.
- **fix(build):** Move the local `.tmp/wine32` Wine prefix out of the isolated Next.js build path so Windows Electron packaging artifacts cannot trigger `EACCES` scans during Node 24 builds.
- **fix(build):** Copy the `wreq-js` native runtime directory into the isolated Next.js standalone output so packaged Playwright/E2E starts can load the instrumentation hook on Linux.
- **fix(api):** Validate the Codex Responses websocket bridge and `/v1/batches` JSON payloads with Zod before use, keeping `request.json()` route validation green and returning explicit 400 responses for invalid bodies.
- **fix(providers):** Add explicit typing to provider alias and category helpers so the strict `typecheck:noimplicit:core` CI gate passes.
- **fix(ui):** Keep the upstream proxy provider detail page labeled with a fallback "Managed via Upstream Proxy Settings" management surface when translations are unavailable.
- **fix(electron):** Harden the production desktop CSP by removing `unsafe-eval` outside development and adding object, base URI, form action, frame ancestor, and worker restrictions.
- **fix(cli):** Replace shell-interpolated setup and privileged command execution paths with argument-based `spawn`/`execFile` helpers for database setup, Tailscale sudo commands, MITM DNS edits, and certificate install/uninstall flows.
- **fix(ui):** Keep provider icons resilient by using direct `@lobehub/icons` components first, then local PNG/SVG fallbacks, avoiding the `@lobehub/ui` peer runtime in the dashboard.

- **Claude Prompt Caching Passthrough** — Fixed cache_control markers being stripped in Claude passthrough mode (Claude → OmniRoute → Claude), which caused Claude Code users to deplete their Anthropic API quota 5-10x faster than direct connections. OmniRoute now preserves client's cache_control markers when sourceFormat and targetFormat are both Claude, ensuring prompt caching works correctly and dramatically reducing token consumption.

## [3.1.8] - 2026-03-27

### 🐛 Bug Fixes & Features

- **fix(mitm):** Compile MITM utilities as NodeNext ESM during prepublish, copy the CommonJS MITM server into the standalone artifact, and resolve MITM data paths without relying on Next.js aliases in packaged runtime.
- **fix(build):** Move the local `.tmp/wine32` Wine prefix out of the isolated Next.js build path so Windows Electron packaging artifacts cannot trigger `EACCES` scans during Node 24 builds.
- **fix(build):** Copy the `wreq-js` native runtime directory into the isolated Next.js standalone output so packaged Playwright/E2E starts can load the instrumentation hook on Linux.
- **fix(api):** Validate the Codex Responses websocket bridge and `/v1/batches` JSON payloads with Zod before use, keeping `request.json()` route validation green and returning explicit 400 responses for invalid bodies.
- **fix(providers):** Add explicit typing to provider alias and category helpers so the strict `typecheck:noimplicit:core` CI gate passes.
- **fix(ui):** Keep the upstream proxy provider detail page labeled with a fallback "Managed via Upstream Proxy Settings" management surface when translations are unavailable.
- **fix(electron):** Harden the production desktop CSP by removing `unsafe-eval` outside development and adding object, base URI, form action, frame ancestor, and worker restrictions.
- **fix(cli):** Replace shell-interpolated setup and privileged command execution paths with argument-based `spawn`/`execFile` helpers for database setup, Tailscale sudo commands, MITM DNS edits, and certificate install/uninstall flows.
- **fix(ui):** Keep provider icons resilient by using direct `@lobehub/icons` components first, then local PNG/SVG fallbacks, avoiding the `@lobehub/ui` peer runtime in the dashboard.

- **Platform Core:** Implemented global state handling for Hidden Models & Combos preventing them from cluttering the catalog or leaking into connected MCP agents (#681).
- **Stability:** Patched streaming crashes related to the native Antigravity provider integration failing due to unhandled undefined state arrays (#684).
- **Localization Sync:** Deployed a fully overhauled `i18n` synchronizer detecting missing nested JSON properties and retro-fitting 30 locales sequentially (#685).## [3.1.7] - 2026-03-27

### 🐛 Bug Fixes

- **fix(mitm):** Compile MITM utilities as NodeNext ESM during prepublish, copy the CommonJS MITM server into the standalone artifact, and resolve MITM data paths without relying on Next.js aliases in packaged runtime.
- **fix(build):** Move the local `.tmp/wine32` Wine prefix out of the isolated Next.js build path so Windows Electron packaging artifacts cannot trigger `EACCES` scans during Node 24 builds.
- **fix(build):** Copy the `wreq-js` native runtime directory into the isolated Next.js standalone output so packaged Playwright/E2E starts can load the instrumentation hook on Linux.
- **fix(api):** Validate the Codex Responses websocket bridge and `/v1/batches` JSON payloads with Zod before use, keeping `request.json()` route validation green and returning explicit 400 responses for invalid bodies.
- **fix(providers):** Add explicit typing to provider alias and category helpers so the strict `typecheck:noimplicit:core` CI gate passes.
- **fix(ui):** Keep the upstream proxy provider detail page labeled with a fallback "Managed via Upstream Proxy Settings" management surface when translations are unavailable.
- **fix(electron):** Harden the production desktop CSP by removing `unsafe-eval` outside development and adding object, base URI, form action, frame ancestor, and worker restrictions.
- **fix(cli):** Replace shell-interpolated setup and privileged command execution paths with argument-based `spawn`/`execFile` helpers for database setup, Tailscale sudo commands, MITM DNS edits, and certificate install/uninstall flows.
- **fix(ui):** Keep provider icons resilient by using direct `@lobehub/icons` components first, then local PNG/SVG fallbacks, avoiding the `@lobehub/ui` peer runtime in the dashboard.

- **Streaming Stability:** Fixed `hasValuableContent` returning `undefined` for empty chunks in SSE streams (#676).
- **Tool Calling:** Fixed an issue in `sseParser.ts` where non-streaming Claude responses with multiple tool calls dropped the `id` of subsequent tool calls due to incorrect index-based deduplication (#671).

---

## [3.1.6] — 2026-03-27

### 🐛 Bug Fixes

- **fix(mitm):** Compile MITM utilities as NodeNext ESM during prepublish, copy the CommonJS MITM server into the standalone artifact, and resolve MITM data paths without relying on Next.js aliases in packaged runtime.
- **fix(build):** Move the local `.tmp/wine32` Wine prefix out of the isolated Next.js build path so Windows Electron packaging artifacts cannot trigger `EACCES` scans during Node 24 builds.
- **fix(build):** Copy the `wreq-js` native runtime directory into the isolated Next.js standalone output so packaged Playwright/E2E starts can load the instrumentation hook on Linux.
- **fix(api):** Validate the Codex Responses websocket bridge and `/v1/batches` JSON payloads with Zod before use, keeping `request.json()` route validation green and returning explicit 400 responses for invalid bodies.
- **fix(providers):** Add explicit typing to provider alias and category helpers so the strict `typecheck:noimplicit:core` CI gate passes.
- **fix(ui):** Keep the upstream proxy provider detail page labeled with a fallback "Managed via Upstream Proxy Settings" management surface when translations are unavailable.
- **fix(electron):** Harden the production desktop CSP by removing `unsafe-eval` outside development and adding object, base URI, form action, frame ancestor, and worker restrictions.
- **fix(cli):** Replace shell-interpolated setup and privileged command execution paths with argument-based `spawn`/`execFile` helpers for database setup, Tailscale sudo commands, MITM DNS edits, and certificate install/uninstall flows.
- **fix(ui):** Keep provider icons resilient by using direct `@lobehub/icons` components first, then local PNG/SVG fallbacks, avoiding the `@lobehub/ui` peer runtime in the dashboard.

- **Claude Native Tool Name Restoration** — Tool names like `TodoWrite` are no longer prefixed with `proxy_` in Claude passthrough responses (both streaming and non-streaming). Includes unit test coverage (PR #663 by @coobabm)
- **Clear All Models Alias Cleanup** — "Clear All Models" button now also removes associated model aliases, preventing ghost models in the UI (PR #664 by @rdself)

---

## [3.1.5] — 2026-03-27

### 🐛 Bug Fixes

- **fix(mitm):** Compile MITM utilities as NodeNext ESM during prepublish, copy the CommonJS MITM server into the standalone artifact, and resolve MITM data paths without relying on Next.js aliases in packaged runtime.
- **fix(build):** Move the local `.tmp/wine32` Wine prefix out of the isolated Next.js build path so Windows Electron packaging artifacts cannot trigger `EACCES` scans during Node 24 builds.
- **fix(build):** Copy the `wreq-js` native runtime directory into the isolated Next.js standalone output so packaged Playwright/E2E starts can load the instrumentation hook on Linux.
- **fix(api):** Validate the Codex Responses websocket bridge and `/v1/batches` JSON payloads with Zod before use, keeping `request.json()` route validation green and returning explicit 400 responses for invalid bodies.
- **fix(providers):** Add explicit typing to provider alias and category helpers so the strict `typecheck:noimplicit:core` CI gate passes.
- **fix(ui):** Keep the upstream proxy provider detail page labeled with a fallback "Managed via Upstream Proxy Settings" management surface when translations are unavailable.
- **fix(electron):** Harden the production desktop CSP by removing `unsafe-eval` outside development and adding object, base URI, form action, frame ancestor, and worker restrictions.
- **fix(cli):** Replace shell-interpolated setup and privileged command execution paths with argument-based `spawn`/`execFile` helpers for database setup, Tailscale sudo commands, MITM DNS edits, and certificate install/uninstall flows.
- **fix(ui):** Keep provider icons resilient by using direct `@lobehub/icons` components first, then local PNG/SVG fallbacks, avoiding the `@lobehub/ui` peer runtime in the dashboard.

- **Backoff Auto-Decay** — Rate-limited accounts now auto-recover when their cooldown window expires, fixing a deadlock where high `backoffLevel` permanently deprioritized accounts (PR #657 by @brendandebeasi)

### 🌍 i18n

- **Chinese translation overhaul** — Comprehensive rewrite of `zh-CN.json` with improved accuracy (PR #658 by @only4copilot)

---

## [3.1.4] — 2026-03-27

### 🐛 Bug Fixes

- **fix(mitm):** Compile MITM utilities as NodeNext ESM during prepublish, copy the CommonJS MITM server into the standalone artifact, and resolve MITM data paths without relying on Next.js aliases in packaged runtime.
- **fix(build):** Move the local `.tmp/wine32` Wine prefix out of the isolated Next.js build path so Windows Electron packaging artifacts cannot trigger `EACCES` scans during Node 24 builds.
- **fix(build):** Copy the `wreq-js` native runtime directory into the isolated Next.js standalone output so packaged Playwright/E2E starts can load the instrumentation hook on Linux.
- **fix(api):** Validate the Codex Responses websocket bridge and `/v1/batches` JSON payloads with Zod before use, keeping `request.json()` route validation green and returning explicit 400 responses for invalid bodies.
- **fix(providers):** Add explicit typing to provider alias and category helpers so the strict `typecheck:noimplicit:core` CI gate passes.
- **fix(ui):** Keep the upstream proxy provider detail page labeled with a fallback "Managed via Upstream Proxy Settings" management surface when translations are unavailable.
- **fix(electron):** Harden the production desktop CSP by removing `unsafe-eval` outside development and adding object, base URI, form action, frame ancestor, and worker restrictions.
- **fix(cli):** Replace shell-interpolated setup and privileged command execution paths with argument-based `spawn`/`execFile` helpers for database setup, Tailscale sudo commands, MITM DNS edits, and certificate install/uninstall flows.
- **fix(ui):** Keep provider icons resilient by using direct `@lobehub/icons` components first, then local PNG/SVG fallbacks, avoiding the `@lobehub/ui` peer runtime in the dashboard.

- **Streaming Override Fix** — Explicit `stream: true` in request body now takes priority over `Accept: application/json` header. Clients sending both will correctly receive SSE streaming responses (#656)

### 🌍 i18n

- **Czech string improvements** — Refined terminology across `cs.json` (PR #655 by @zen0bit)

---

## [3.1.3] — 2026-03-26

### 🌍 i18n & Community

- **~70 missing translation keys** added to `en.json` and 12 languages (PR #652 by @zen0bit)
- **Czech documentation updated** — CLI-TOOLS, API_REFERENCE, VM_DEPLOYMENT guides (PR #652)
- **Translation validation scripts** — `check_translations.py` and `validate_translation.py` for CI/QA (PR #651 by @zen0bit)

---

## [3.1.2] — 2026-03-26

### 🐛 Bug Fixes

- **fix(mitm):** Compile MITM utilities as NodeNext ESM during prepublish, copy the CommonJS MITM server into the standalone artifact, and resolve MITM data paths without relying on Next.js aliases in packaged runtime.
- **fix(build):** Move the local `.tmp/wine32` Wine prefix out of the isolated Next.js build path so Windows Electron packaging artifacts cannot trigger `EACCES` scans during Node 24 builds.
- **fix(build):** Copy the `wreq-js` native runtime directory into the isolated Next.js standalone output so packaged Playwright/E2E starts can load the instrumentation hook on Linux.
- **fix(api):** Validate the Codex Responses websocket bridge and `/v1/batches` JSON payloads with Zod before use, keeping `request.json()` route validation green and returning explicit 400 responses for invalid bodies.
- **fix(providers):** Add explicit typing to provider alias and category helpers so the strict `typecheck:noimplicit:core` CI gate passes.
- **fix(ui):** Keep the upstream proxy provider detail page labeled with a fallback "Managed via Upstream Proxy Settings" management surface when translations are unavailable.
- **fix(electron):** Harden the production desktop CSP by removing `unsafe-eval` outside development and adding object, base URI, form action, frame ancestor, and worker restrictions.
- **fix(cli):** Replace shell-interpolated setup and privileged command execution paths with argument-based `spawn`/`execFile` helpers for database setup, Tailscale sudo commands, MITM DNS edits, and certificate install/uninstall flows.
- **fix(ui):** Keep provider icons resilient by using direct `@lobehub/icons` components first, then local PNG/SVG fallbacks, avoiding the `@lobehub/ui` peer runtime in the dashboard.

- **Critical: Tool Calling Regression** — Fixed `proxy_Bash` errors by disabling the `proxy_` tool name prefix in the Claude passthrough path. Tools like `Bash`, `Read`, `Write` were being renamed to `proxy_Bash`, `proxy_Read`, etc., causing Claude to reject them (#618)
- **Kiro Account Ban Documentation** — Documented as upstream AWS anti-fraud false positive, not an OmniRoute issue (#649)

### 🧪 Tests

- **936 tests, 0 failures**

---

## [3.1.1] — 2026-03-26

### ✨ New Features

- **feat(providers):** Implement Image Generation and Editing capabilities for ChatGPT Web, including in-band chat image generation and caching (#1606).
- **feat(ui):** Integrate OpenCode Zen/Go API tool logo SVG and polish API key copy-to-clipboard interactions (#1607).

- **feat(providers):** Integrate AgentRouter as a new OpenAI-compatible passthrough provider with $200 free credits via sign-up (Issue #1572).
- **feat(ui):** Implement on-demand per-model testing in the provider dashboard, allowing single-token diagnostic checks without triggering rate-limits (Issue #1532).

- **Vision Capability Metadata**: Added `capabilities.vision`, `input_modalities`, and `output_modalities` to `/v1/models` entries for vision-capable models (PR #646)
- **Gemini 3.1 Models**: Added `gemini-3.1-pro-preview` and `gemini-3.1-flash-lite-preview` to the Antigravity provider (#645)

### 🐛 Bug Fixes

- **fix(mitm):** Compile MITM utilities as NodeNext ESM during prepublish, copy the CommonJS MITM server into the standalone artifact, and resolve MITM data paths without relying on Next.js aliases in packaged runtime.
- **fix(build):** Move the local `.tmp/wine32` Wine prefix out of the isolated Next.js build path so Windows Electron packaging artifacts cannot trigger `EACCES` scans during Node 24 builds.
- **fix(build):** Copy the `wreq-js` native runtime directory into the isolated Next.js standalone output so packaged Playwright/E2E starts can load the instrumentation hook on Linux.
- **fix(api):** Validate the Codex Responses websocket bridge and `/v1/batches` JSON payloads with Zod before use, keeping `request.json()` route validation green and returning explicit 400 responses for invalid bodies.
- **fix(providers):** Add explicit typing to provider alias and category helpers so the strict `typecheck:noimplicit:core` CI gate passes.
- **fix(ui):** Keep the upstream proxy provider detail page labeled with a fallback "Managed via Upstream Proxy Settings" management surface when translations are unavailable.
- **fix(electron):** Harden the production desktop CSP by removing `unsafe-eval` outside development and adding object, base URI, form action, frame ancestor, and worker restrictions.
- **fix(cli):** Replace shell-interpolated setup and privileged command execution paths with argument-based `spawn`/`execFile` helpers for database setup, Tailscale sudo commands, MITM DNS edits, and certificate install/uninstall flows.
- **fix(ui):** Keep provider icons resilient by using direct `@lobehub/icons` components first, then local PNG/SVG fallbacks, avoiding the `@lobehub/ui` peer runtime in the dashboard.

- **Ollama Cloud 401 Error**: Fixed incorrect API base URL — changed from `api.ollama.com` to official `ollama.com/v1/chat/completions` (#643)
- **Expired Token Retry**: Added bounded retry with exponential backoff (5→10→20 min) for expired OAuth connections instead of permanently skipping them (PR #647)

### 🧪 Tests

- **936 tests, 0 failures**

---

## [3.1.0] — 2026-03-26

### ✨ New Features

- **feat(providers):** Implement Image Generation and Editing capabilities for ChatGPT Web, including in-band chat image generation and caching (#1606).
- **feat(ui):** Integrate OpenCode Zen/Go API tool logo SVG and polish API key copy-to-clipboard interactions (#1607).

- **feat(providers):** Integrate AgentRouter as a new OpenAI-compatible passthrough provider with $200 free credits via sign-up (Issue #1572).
- **feat(ui):** Implement on-demand per-model testing in the provider dashboard, allowing single-token diagnostic checks without triggering rate-limits (Issue #1532).

- **GitHub Issue Templates**: Added standardized bug report, feature request, and config/proxy issue templates (#641)
- **Clear All Models**: Added a "Clear All Models" button to the provider detail page with i18n support in 29 languages (#634)

### 🐛 Bug Fixes

- **fix(mitm):** Compile MITM utilities as NodeNext ESM during prepublish, copy the CommonJS MITM server into the standalone artifact, and resolve MITM data paths without relying on Next.js aliases in packaged runtime.
- **fix(build):** Move the local `.tmp/wine32` Wine prefix out of the isolated Next.js build path so Windows Electron packaging artifacts cannot trigger `EACCES` scans during Node 24 builds.
- **fix(build):** Copy the `wreq-js` native runtime directory into the isolated Next.js standalone output so packaged Playwright/E2E starts can load the instrumentation hook on Linux.
- **fix(api):** Validate the Codex Responses websocket bridge and `/v1/batches` JSON payloads with Zod before use, keeping `request.json()` route validation green and returning explicit 400 responses for invalid bodies.
- **fix(providers):** Add explicit typing to provider alias and category helpers so the strict `typecheck:noimplicit:core` CI gate passes.
- **fix(ui):** Keep the upstream proxy provider detail page labeled with a fallback "Managed via Upstream Proxy Settings" management surface when translations are unavailable.
- **fix(electron):** Harden the production desktop CSP by removing `unsafe-eval` outside development and adding object, base URI, form action, frame ancestor, and worker restrictions.
- **fix(cli):** Replace shell-interpolated setup and privileged command execution paths with argument-based `spawn`/`execFile` helpers for database setup, Tailscale sudo commands, MITM DNS edits, and certificate install/uninstall flows.
- **fix(ui):** Keep provider icons resilient by using direct `@lobehub/icons` components first, then local PNG/SVG fallbacks, avoiding the `@lobehub/ui` peer runtime in the dashboard.

- **Locale Conflict (`in.json`)**: Renamed the Hindi locale file from `in.json` (Indonesian ISO code) to `hi.json` to fix translation conflicts in Weblate (#642)
- **Codex Empty Tool Names**: Moved tool name sanitization before the native Codex passthrough, fixing 400 errors from upstream providers when tools had empty names (#637)
- **Streaming Newline Artifacts**: Added `collapseExcessiveNewlines` to the response sanitizer, collapsing runs of 3+ consecutive newlines from thinking models into a standard double newline (#638)
- **Claude Reasoning Effort**: Converted OpenAI `reasoning_effort` param to Claude's native `thinking` budget block across all request paths, including automatic `max_tokens` adjustment (#627)
- **Qwen Token Refresh**: Implemented proactive pre-expiry OAuth token refreshes (5-minute buffer) to prevent requests from failing when using short-lived tokens (#631)

### 🧪 Tests

- **936 tests, 0 failures** (+10 tests since 3.0.9)

---

## [3.0.9] — 2026-03-26

### 🐛 Bug Fixes

- **fix(mitm):** Compile MITM utilities as NodeNext ESM during prepublish, copy the CommonJS MITM server into the standalone artifact, and resolve MITM data paths without relying on Next.js aliases in packaged runtime.
- **fix(build):** Move the local `.tmp/wine32` Wine prefix out of the isolated Next.js build path so Windows Electron packaging artifacts cannot trigger `EACCES` scans during Node 24 builds.
- **fix(build):** Copy the `wreq-js` native runtime directory into the isolated Next.js standalone output so packaged Playwright/E2E starts can load the instrumentation hook on Linux.
- **fix(api):** Validate the Codex Responses websocket bridge and `/v1/batches` JSON payloads with Zod before use, keeping `request.json()` route validation green and returning explicit 400 responses for invalid bodies.
- **fix(providers):** Add explicit typing to provider alias and category helpers so the strict `typecheck:noimplicit:core` CI gate passes.
- **fix(ui):** Keep the upstream proxy provider detail page labeled with a fallback "Managed via Upstream Proxy Settings" management surface when translations are unavailable.
- **fix(electron):** Harden the production desktop CSP by removing `unsafe-eval` outside development and adding object, base URI, form action, frame ancestor, and worker restrictions.
- **fix(cli):** Replace shell-interpolated setup and privileged command execution paths with argument-based `spawn`/`execFile` helpers for database setup, Tailscale sudo commands, MITM DNS edits, and certificate install/uninstall flows.
- **fix(ui):** Keep provider icons resilient by using direct `@lobehub/icons` components first, then local PNG/SVG fallbacks, avoiding the `@lobehub/ui` peer runtime in the dashboard.

- **NaN tokens in Claude Code / client responses (#617):**
  - `sanitizeUsage()` now cross-maps `input_tokens`→`prompt_tokens` and `output_tokens`→`completion_tokens` before the whitelist filter, fixing responses showing NaN/0 token counts when providers return Claude-style usage field names

### Sicherheit

- Updated `yaml` package to fix stack overflow vulnerability (GHSA-48c2-rrv3-qjmp)

### 📋 Issue Triage

- Closed #613 (Codestral — resolved with Custom Provider workaround)
- Commented on #615 (OpenCode dual-endpoint — workaround provided, tracked as feature request)
- Commented on #618 (tool call visibility — requesting v3.0.9 test)
- Commented on #627 (effort level — already supported)

---

## [3.0.8] — 2026-03-25

### 🐛 Bug Fixes

- **fix(mitm):** Compile MITM utilities as NodeNext ESM during prepublish, copy the CommonJS MITM server into the standalone artifact, and resolve MITM data paths without relying on Next.js aliases in packaged runtime.
- **fix(build):** Move the local `.tmp/wine32` Wine prefix out of the isolated Next.js build path so Windows Electron packaging artifacts cannot trigger `EACCES` scans during Node 24 builds.
- **fix(build):** Copy the `wreq-js` native runtime directory into the isolated Next.js standalone output so packaged Playwright/E2E starts can load the instrumentation hook on Linux.
- **fix(api):** Validate the Codex Responses websocket bridge and `/v1/batches` JSON payloads with Zod before use, keeping `request.json()` route validation green and returning explicit 400 responses for invalid bodies.
- **fix(providers):** Add explicit typing to provider alias and category helpers so the strict `typecheck:noimplicit:core` CI gate passes.
- **fix(ui):** Keep the upstream proxy provider detail page labeled with a fallback "Managed via Upstream Proxy Settings" management surface when translations are unavailable.
- **fix(electron):** Harden the production desktop CSP by removing `unsafe-eval` outside development and adding object, base URI, form action, frame ancestor, and worker restrictions.
- **fix(cli):** Replace shell-interpolated setup and privileged command execution paths with argument-based `spawn`/`execFile` helpers for database setup, Tailscale sudo commands, MITM DNS edits, and certificate install/uninstall flows.
- **fix(ui):** Keep provider icons resilient by using direct `@lobehub/icons` components first, then local PNG/SVG fallbacks, avoiding the `@lobehub/ui` peer runtime in the dashboard.

- **Translation Failures for OpenAI-format Providers in Claude CLI (#632):**
  - Handle `reasoning_details[]` array format from StepFun/OpenRouter — converts to `reasoning_content`
  - Handle `reasoning` field alias from some providers → normalized to `reasoning_content`
  - Cross-map usage field names: `input_tokens`↔`prompt_tokens`, `output_tokens`↔`completion_tokens` in `filterUsageForFormat`
  - Fix `extractUsage` to accept both `input_tokens`/`output_tokens` and `prompt_tokens`/`completion_tokens` as valid usage fields
  - Applied to both streaming (`sanitizeStreamingChunk`, `openai-to-claude.ts` translator) and non-streaming (`sanitizeMessage`) paths

---

## [3.0.7] — 2026-03-25

### 🐛 Bug Fixes

- **fix(mitm):** Compile MITM utilities as NodeNext ESM during prepublish, copy the CommonJS MITM server into the standalone artifact, and resolve MITM data paths without relying on Next.js aliases in packaged runtime.
- **fix(build):** Move the local `.tmp/wine32` Wine prefix out of the isolated Next.js build path so Windows Electron packaging artifacts cannot trigger `EACCES` scans during Node 24 builds.
- **fix(build):** Copy the `wreq-js` native runtime directory into the isolated Next.js standalone output so packaged Playwright/E2E starts can load the instrumentation hook on Linux.
- **fix(api):** Validate the Codex Responses websocket bridge and `/v1/batches` JSON payloads with Zod before use, keeping `request.json()` route validation green and returning explicit 400 responses for invalid bodies.
- **fix(providers):** Add explicit typing to provider alias and category helpers so the strict `typecheck:noimplicit:core` CI gate passes.
- **fix(ui):** Keep the upstream proxy provider detail page labeled with a fallback "Managed via Upstream Proxy Settings" management surface when translations are unavailable.
- **fix(electron):** Harden the production desktop CSP by removing `unsafe-eval` outside development and adding object, base URI, form action, frame ancestor, and worker restrictions.
- **fix(cli):** Replace shell-interpolated setup and privileged command execution paths with argument-based `spawn`/`execFile` helpers for database setup, Tailscale sudo commands, MITM DNS edits, and certificate install/uninstall flows.
- **fix(ui):** Keep provider icons resilient by using direct `@lobehub/icons` components first, then local PNG/SVG fallbacks, avoiding the `@lobehub/ui` peer runtime in the dashboard.

- **Antigravity Token Refresh:** Fixed `client_secret is missing` error for npm-installed users — the `clientSecretDefault` was empty in providerRegistry, causing Google to reject token refresh requests (#588)
- **OpenCode Zen Models:** Added `modelsUrl` to the OpenCode Zen registry entry so "Import from /models" works correctly (#612)
- **Streaming Artifacts:** Fixed excessive newlines left in responses after thinking-tag signature stripping (#626)
- **Proxy Fallback:** Added automatic retry without proxy when SOCKS5 relay fails
- **Proxy Test:** Test endpoint now resolves real credentials from DB via proxyId

### ✨ New Features

- **feat(providers):** Implement Image Generation and Editing capabilities for ChatGPT Web, including in-band chat image generation and caching (#1606).
- **feat(ui):** Integrate OpenCode Zen/Go API tool logo SVG and polish API key copy-to-clipboard interactions (#1607).

- **feat(providers):** Integrate AgentRouter as a new OpenAI-compatible passthrough provider with $200 free credits via sign-up (Issue #1572).
- **feat(ui):** Implement on-demand per-model testing in the provider dashboard, allowing single-token diagnostic checks without triggering rate-limits (Issue #1532).

- **Playground Account/Key Selector:** Persistent, always-visible dropdown to select specific provider accounts/keys for testing — fetches all connections at startup and filters by selected provider
- **CLI Tools Dynamic Models:** Model selection now dynamically fetches from `/v1/models` API — providers like Kiro now show their full model catalog
- **Antigravity Model List:** Updated with Claude Sonnet 4.5, Claude Sonnet 4, GPT 5, GPT 5 Mini; enabled `passthroughModels` for dynamic model access (#628)

### 🔧 Maintenance

- Merged PR #625 — Provider Limits light mode background fix

---

## [3.0.6] — 2026-03-25

### 🐛 Bug Fixes

- **fix(mitm):** Compile MITM utilities as NodeNext ESM during prepublish, copy the CommonJS MITM server into the standalone artifact, and resolve MITM data paths without relying on Next.js aliases in packaged runtime.
- **fix(build):** Move the local `.tmp/wine32` Wine prefix out of the isolated Next.js build path so Windows Electron packaging artifacts cannot trigger `EACCES` scans during Node 24 builds.
- **fix(build):** Copy the `wreq-js` native runtime directory into the isolated Next.js standalone output so packaged Playwright/E2E starts can load the instrumentation hook on Linux.
- **fix(api):** Validate the Codex Responses websocket bridge and `/v1/batches` JSON payloads with Zod before use, keeping `request.json()` route validation green and returning explicit 400 responses for invalid bodies.
- **fix(providers):** Add explicit typing to provider alias and category helpers so the strict `typecheck:noimplicit:core` CI gate passes.
- **fix(ui):** Keep the upstream proxy provider detail page labeled with a fallback "Managed via Upstream Proxy Settings" management surface when translations are unavailable.
- **fix(electron):** Harden the production desktop CSP by removing `unsafe-eval` outside development and adding object, base URI, form action, frame ancestor, and worker restrictions.
- **fix(cli):** Replace shell-interpolated setup and privileged command execution paths with argument-based `spawn`/`execFile` helpers for database setup, Tailscale sudo commands, MITM DNS edits, and certificate install/uninstall flows.
- **fix(ui):** Keep provider icons resilient by using direct `@lobehub/icons` components first, then local PNG/SVG fallbacks, avoiding the `@lobehub/ui` peer runtime in the dashboard.

- **Limits/Proxy:** Fixed Codex limit fetching for accounts behind SOCKS5 proxies — token refresh now runs inside proxy context
- **CI:** Fixed integration test `v1/models` assertion failure in CI environments without provider connections
- **Settings:** Proxy test button now shows success/failure results immediately (previously hidden behind health data)

### ✨ New Features

- **feat(providers):** Implement Image Generation and Editing capabilities for ChatGPT Web, including in-band chat image generation and caching (#1606).
- **feat(ui):** Integrate OpenCode Zen/Go API tool logo SVG and polish API key copy-to-clipboard interactions (#1607).

- **feat(providers):** Integrate AgentRouter as a new OpenAI-compatible passthrough provider with $200 free credits via sign-up (Issue #1572).
- **feat(ui):** Implement on-demand per-model testing in the provider dashboard, allowing single-token diagnostic checks without triggering rate-limits (Issue #1532).

- **Playground:** Added Account selector dropdown — test specific connections individually when a provider has multiple accounts

### 🔧 Maintenance

- Merged PR #623 — LongCat API base URL path correction

---

## [3.0.5] — 2026-03-25

### ✨ New Features

- **feat(providers):** Implement Image Generation and Editing capabilities for ChatGPT Web, including in-band chat image generation and caching (#1606).
- **feat(ui):** Integrate OpenCode Zen/Go API tool logo SVG and polish API key copy-to-clipboard interactions (#1607).

- **feat(providers):** Integrate AgentRouter as a new OpenAI-compatible passthrough provider with $200 free credits via sign-up (Issue #1572).
- **feat(ui):** Implement on-demand per-model testing in the provider dashboard, allowing single-token diagnostic checks without triggering rate-limits (Issue #1532).

- **Limits UI:** Added tag grouping feature to the connections dashboard to improve visual organization for accounts with custom tags.

---

## [3.0.4] — 2026-03-25

### 🐛 Bug Fixes

- **fix(mitm):** Compile MITM utilities as NodeNext ESM during prepublish, copy the CommonJS MITM server into the standalone artifact, and resolve MITM data paths without relying on Next.js aliases in packaged runtime.
- **fix(build):** Move the local `.tmp/wine32` Wine prefix out of the isolated Next.js build path so Windows Electron packaging artifacts cannot trigger `EACCES` scans during Node 24 builds.
- **fix(build):** Copy the `wreq-js` native runtime directory into the isolated Next.js standalone output so packaged Playwright/E2E starts can load the instrumentation hook on Linux.
- **fix(api):** Validate the Codex Responses websocket bridge and `/v1/batches` JSON payloads with Zod before use, keeping `request.json()` route validation green and returning explicit 400 responses for invalid bodies.
- **fix(providers):** Add explicit typing to provider alias and category helpers so the strict `typecheck:noimplicit:core` CI gate passes.
- **fix(ui):** Keep the upstream proxy provider detail page labeled with a fallback "Managed via Upstream Proxy Settings" management surface when translations are unavailable.
- **fix(electron):** Harden the production desktop CSP by removing `unsafe-eval` outside development and adding object, base URI, form action, frame ancestor, and worker restrictions.
- **fix(cli):** Replace shell-interpolated setup and privileged command execution paths with argument-based `spawn`/`execFile` helpers for database setup, Tailscale sudo commands, MITM DNS edits, and certificate install/uninstall flows.
- **fix(ui):** Keep provider icons resilient by using direct `@lobehub/icons` components first, then local PNG/SVG fallbacks, avoiding the `@lobehub/ui` peer runtime in the dashboard.

- **Streaming:** Fixed `TextDecoder` state corruption inside combo `sanitize` TransformStream which caused SSE garbled output matching multibyte characters (PR #614)
- **Providers UI:** Safely render HTML tags inside provider connection error tooltips using `dangerouslySetInnerHTML`
- **Proxy Settings:** Added missing `username` and `password` payload body properties allowing authenticated proxies to be successfully verified from the Dashboard.
- **Provider API:** Bound soft exception returns to `getCodexUsage` preventing API HTTP 500 failures when token fetch fails

---

## [3.0.3] — 2026-03-25

### ✨ New Features

- **feat(providers):** Implement Image Generation and Editing capabilities for ChatGPT Web, including in-band chat image generation and caching (#1606).
- **feat(ui):** Integrate OpenCode Zen/Go API tool logo SVG and polish API key copy-to-clipboard interactions (#1607).

- **feat(providers):** Integrate AgentRouter as a new OpenAI-compatible passthrough provider with $200 free credits via sign-up (Issue #1572).
- **feat(ui):** Implement on-demand per-model testing in the provider dashboard, allowing single-token diagnostic checks without triggering rate-limits (Issue #1532).

- **Auto-Sync Models:** Added a UI toggle and `sync-models` endpoint to automatically synchronise model lists per provider using a scheduled interval scheduler (PR #597)

### 🐛 Bug Fixes

- **fix(mitm):** Compile MITM utilities as NodeNext ESM during prepublish, copy the CommonJS MITM server into the standalone artifact, and resolve MITM data paths without relying on Next.js aliases in packaged runtime.
- **fix(build):** Move the local `.tmp/wine32` Wine prefix out of the isolated Next.js build path so Windows Electron packaging artifacts cannot trigger `EACCES` scans during Node 24 builds.
- **fix(build):** Copy the `wreq-js` native runtime directory into the isolated Next.js standalone output so packaged Playwright/E2E starts can load the instrumentation hook on Linux.
- **fix(api):** Validate the Codex Responses websocket bridge and `/v1/batches` JSON payloads with Zod before use, keeping `request.json()` route validation green and returning explicit 400 responses for invalid bodies.
- **fix(providers):** Add explicit typing to provider alias and category helpers so the strict `typecheck:noimplicit:core` CI gate passes.
- **fix(ui):** Keep the upstream proxy provider detail page labeled with a fallback "Managed via Upstream Proxy Settings" management surface when translations are unavailable.
- **fix(electron):** Harden the production desktop CSP by removing `unsafe-eval` outside development and adding object, base URI, form action, frame ancestor, and worker restrictions.
- **fix(cli):** Replace shell-interpolated setup and privileged command execution paths with argument-based `spawn`/`execFile` helpers for database setup, Tailscale sudo commands, MITM DNS edits, and certificate install/uninstall flows.
- **fix(ui):** Keep provider icons resilient by using direct `@lobehub/icons` components first, then local PNG/SVG fallbacks, avoiding the `@lobehub/ui` peer runtime in the dashboard.

- **Timeouts:** Elevated default proxies `FETCH_TIMEOUT_MS` and `STREAM_IDLE_TIMEOUT_MS` to 10 minutes to properly support deep reasoning models (like o1) without aborting requests (Fixes #609)
- **CLI Tool Detection:** Improved cross-platform detection handling NVM paths, Windows `PATHEXT` (preventing `.cmd` wrappers issue), and custom NPM prefixes (PR #598)
- **Streaming Logs:** Implemented `tool_calls` delta accumulation in streaming response logs so function calls are tracked and persisted accurately in DB (PR #603)
- **Model Catalog:** Removed auth exemption, properly hiding `comfyui` and `sdwebui` models when no provider is explicitly configured (PR #599)

### 🌐 Translations

- **cs:** Improved Czech translation strings across the app (PR #601)

## [3.0.2] — 2026-03-25

### 🚀 Enhancements & Features

#### feat(ui): Connection Tag Grouping

- Added a Tag/Group field to `EditConnectionModal` (stored in `providerSpecificData.tag`) without requiring DB schema migrations.
- Connections in the provider view now dynamically group by tag with visual dividers.
- Untagged connections appear first without a header, followed by tagged groups in alphabetical order.
- The tag grouping automatically applies to the Codex/Copilot/Antigravity Limits section since toggles exist inside connection rows.

### 🐛 Bug Fixes

- **fix(mitm):** Compile MITM utilities as NodeNext ESM during prepublish, copy the CommonJS MITM server into the standalone artifact, and resolve MITM data paths without relying on Next.js aliases in packaged runtime.
- **fix(build):** Move the local `.tmp/wine32` Wine prefix out of the isolated Next.js build path so Windows Electron packaging artifacts cannot trigger `EACCES` scans during Node 24 builds.
- **fix(build):** Copy the `wreq-js` native runtime directory into the isolated Next.js standalone output so packaged Playwright/E2E starts can load the instrumentation hook on Linux.
- **fix(api):** Validate the Codex Responses websocket bridge and `/v1/batches` JSON payloads with Zod before use, keeping `request.json()` route validation green and returning explicit 400 responses for invalid bodies.
- **fix(providers):** Add explicit typing to provider alias and category helpers so the strict `typecheck:noimplicit:core` CI gate passes.
- **fix(ui):** Keep the upstream proxy provider detail page labeled with a fallback "Managed via Upstream Proxy Settings" management surface when translations are unavailable.
- **fix(electron):** Harden the production desktop CSP by removing `unsafe-eval` outside development and adding object, base URI, form action, frame ancestor, and worker restrictions.
- **fix(cli):** Replace shell-interpolated setup and privileged command execution paths with argument-based `spawn`/`execFile` helpers for database setup, Tailscale sudo commands, MITM DNS edits, and certificate install/uninstall flows.
- **fix(ui):** Keep provider icons resilient by using direct `@lobehub/icons` components first, then local PNG/SVG fallbacks, avoiding the `@lobehub/ui` peer runtime in the dashboard.

#### fix(ui): Proxy Management UI Stabilization

- **Missing badges on connection cards:** Fixed by using `resolveProxyForConnection()` rather than static mapping.
- **Test Connection disabled in saved mode:** Enabled the Test button by resolving proxy config from the saved list.
- **Config Modal freezing:** Added `onClose()` calls after save/clear to prevent the UI from freezing.
- **Double usage counting:** `ProxyRegistryManager` now loads usage eagerly on mount with deduplication by `scope` + `scopeId`. Usage counts were replaced with a Test button displaying IP/latency inline.

#### fix(translator): `function_call` prefix stripping

- Repaired an incomplete fix from PR #607 where only `tool_use` blocks stripped Claude's `proxy_` tool prefix. Now, clients using the OpenAI Responses API format will also correctly receive tool tools without the `proxy_` prefix.

---

## [3.0.1] — 2026-03-25

### 🔧 Hotfix Patch — Critical Bug Fixes

Three critical regressions reported by users after the v3.0.0 launch have been resolved.

#### fix(translator): strip `proxy_` prefix in non-streaming Claude responses (#605)

The `proxy_` prefix added by Claude OAuth was only stripped from **streaming** responses. In **non-streaming** mode, `translateNonStreamingResponse` had no access to the `toolNameMap`, causing clients to receive mangled tool names like `proxy_read_file` instead of `read_file`.

**Fix:** Added optional `toolNameMap` parameter to `translateNonStreamingResponse` and applied prefix stripping in the Claude `tool_use` block handler. `chatCore.ts` now passes the map through.

#### fix(validation): add LongCat specialty validator to skip /models probe (#592)

LongCat AI does not expose `GET /v1/models`. The generic `validateOpenAICompatibleProvider` validator fell through to a chat-completions fallback only if `validationModelId` was set, which LongCat doesn't configure. This caused provider validation to fail with a misleading error on add/save.

**Fix:** Added `longcat` to the specialty validators map, probing `/chat/completions` directly and treating any non-auth response as a pass.

#### fix(translator): normalize object tool schemas for Anthropic (#595)

MCP tools (e.g. `pencil`, `computer_use`) forward tool definitions with `{type:"object"}` but without a `properties` field. Anthropic's API rejects these with: `object schema missing properties`.

**Fix:** In `openai-to-claude.ts`, inject `properties: {}` as a safe default when `type` is `"object"` and `properties` is absent.

---

### 🔀 Community PRs Merged (2)

| PR       | Author  | Summary                                                                    |
| -------- | ------- | -------------------------------------------------------------------------- |
| **#589** | @flobo3 | docs(i18n): fix Russian translation for Playground and Testbed             |
| **#591** | @rdself | fix(ui): improve Provider Limits light mode contrast and plan tier display |

---

### ✅ Issues Resolved

`#592` `#595` `#605`

---

### 🧪 Tests

- **926 tests, 0 failures** (unchanged from v3.0.0)

---

## [3.0.0] — 2026-03-24

### 🎉 OmniRoute v3.0.0 — The Free AI Gateway, Now with 67+ Providers

> **The biggest release ever.** From 36 providers in v2.9.5 to **67+ providers** in v3.0.0 — with MCP Server, A2A Protocol, auto-combo engine, Provider Icons, Registered Keys API, 926 tests, and contributions from **12 community members** across **10 merged PRs**.
>
> Consolidated from v3.0.0-rc.1 through rc.17 (17 release candidates over 3 days of intense development).

---

### 🆕 New Providers (+31 since v2.9.5)

| Provider                      | Alias           | Tier        | Notes                                                                       |
| ----------------------------- | --------------- | ----------- | --------------------------------------------------------------------------- |
| **OpenCode Zen**              | `opencode-zen`  | Free        | 3 models via `opencode.ai/zen/v1` (PR #530 by @kang-heewon)                 |
| **OpenCode Go**               | `opencode-go`   | Paid        | 4 models via `opencode.ai/zen/go/v1` (PR #530 by @kang-heewon)              |
| **LongCat AI**                | `lc`            | Free        | 50M tokens/day (Flash-Lite) + 500K/day (Chat/Thinking) during public beta   |
| **Pollinations AI**           | `pol`           | Free        | No API key needed — GPT-5, Claude, Gemini, DeepSeek V3, Llama 4 (1 req/15s) |
| **Cloudflare Workers AI**     | `cf`            | Free        | 10K Neurons/day — ~150 LLM responses or 500s Whisper audio, edge inference  |
| **Scaleway AI**               | `scw`           | Free        | 1M free tokens for new accounts — EU/GDPR compliant (Paris)                 |
| **AI/ML API**                 | `aiml`          | Free        | $0.025/day free credits — 200+ models via single endpoint                   |
| **Puter AI**                  | `pu`            | Free        | 500+ models (GPT-5, Claude Opus 4, Gemini 3 Pro, Grok 4, DeepSeek V3)       |
| **Alibaba Cloud (DashScope)** | `ali`           | Paid        | International + China endpoints via `alicode`/`alicode-intl`                |
| **Alibaba Coding Plan**       | `bcp`           | Paid        | Alibaba Model Studio with Anthropic-compatible API                          |
| **Kimi Coding (API Key)**     | `kmca`          | Paid        | Dedicated API-key-based Kimi access (separate from OAuth)                   |
| **MiniMax Coding**            | `minimax`       | Paid        | International endpoint                                                      |
| **MiniMax (China)**           | `minimax-cn`    | Paid        | China-specific endpoint                                                     |
| **Z.AI (GLM-5)**              | `zai`           | Paid        | Zhipu AI next-gen GLM models                                                |
| **Vertex AI**                 | `vertex`        | Paid        | Google Cloud — Service Account JSON or OAuth access_token                   |
| **Ollama Cloud**              | `ollamacloud`   | Paid        | Ollama's hosted API service                                                 |
| **Synthetic**                 | `synthetic`     | Paid        | Passthrough models gateway                                                  |
| **Kilo Gateway**              | `kg`            | Paid        | Passthrough models gateway                                                  |
| **Perplexity Search**         | `pplx-search`   | Paid        | Dedicated search-grounded endpoint                                          |
| **Serper Search**             | `serper-search` | Paid        | Web search API integration                                                  |
| **Brave Search**              | `brave-search`  | Paid        | Brave Search API integration                                                |
| **Exa Search**                | `exa-search`    | Paid        | Neural search API integration                                               |
| **Tavily Search**             | `tavily-search` | Paid        | AI search API integration                                                   |
| **NanoBanana**                | `nb`            | Paid        | Image generation API                                                        |
| **ElevenLabs**                | `el`            | Paid        | Text-to-speech voice synthesis                                              |
| **Cartesia**                  | `cartesia`      | Paid        | Ultra-fast TTS voice synthesis                                              |
| **PlayHT**                    | `playht`        | Paid        | Voice cloning and TTS                                                       |
| **Inworld**                   | `inworld`       | Paid        | AI character voice chat                                                     |
| **SD WebUI**                  | `sdwebui`       | Self-hosted | Stable Diffusion local image generation                                     |
| **ComfyUI**                   | `comfyui`       | Self-hosted | ComfyUI local workflow node-based generation                                |
| **GLM Coding**                | `glm`           | Paid        | BigModel/Zhipu coding-specific endpoint                                     |

**Total: 67+ providers** (4 Free, 8 OAuth, 55 API Key) + unlimited OpenAI/Anthropic-Compatible custom providers.

---

### ✨ Major Features

#### 🔑 Registered Keys Provisioning API (#464)

Auto-generate and issue OmniRoute API keys programmatically with per-provider and per-account quota enforcement.

| Endpoint                        | Method       | Description                                      |
| ------------------------------- | ------------ | ------------------------------------------------ |
| `/api/v1/registered-keys`       | `POST`       | Issue a new key — raw key returned **once only** |
| `/api/v1/registered-keys`       | `GET`        | List registered keys (masked)                    |
| `/api/v1/registered-keys/{id}`  | `GET/DELETE` | Get metadata / Revoke                            |
| `/api/v1/quotas/check`          | `GET`        | Pre-validate quota before issuing                |
| `/api/v1/providers/{id}/limits` | `GET/PUT`    | Configure per-provider issuance limits           |
| `/api/v1/accounts/{id}/limits`  | `GET/PUT`    | Configure per-account issuance limits            |
| `/api/v1/issues/report`         | `POST`       | Report quota events to GitHub Issues             |

**Security:** Keys stored as SHA-256 hashes. Raw key shown once on creation, never retrievable again.

#### 🎨 Provider Icons via @lobehub/icons (#529)

130+ provider logos using `@lobehub/icons` React components (SVG). Fallback chain: **Lobehub SVG → existing PNG → generic icon**. Applied across Dashboard, Providers, and Agents pages with standardized `ProviderIcon` component.

#### 🔄 Model Auto-Sync Scheduler (#488)

Auto-refreshes model lists for connected providers every **24 hours**. Runs on server startup. Configurable via `MODEL_SYNC_INTERVAL_HOURS`.

#### 🔀 Per-Model Combo Routing (#563)

Map model name patterns (glob) to specific combos for automatic routing:

- `claude-sonnet*` → code-combo, `gpt-4o*` → openai-combo, `gemini-*` → google-combo
- New `model_combo_mappings` table with glob-to-regex matching
- Dashboard UI section: "Model Routing Rules" with inline add/edit/toggle/delete

#### 🧭 API Endpoints Dashboard

Interactive catalog, webhooks management, OpenAPI viewer — all in one tabbed page at `/dashboard/endpoint`.

#### 🔍 Web Search Providers

5 new search provider integrations: **Perplexity Search**, **Serper**, **Brave Search**, **Exa**, **Tavily** — enabling grounded AI responses with real-time web data.

#### 📊 Search Analytics

New tab in `/dashboard/analytics` — provider breakdown, cache hit rate, cost tracking. API: `GET /api/v1/search/analytics`.

#### 🛡️ Per-API-Key Rate Limits (#452)

`max_requests_per_day` and `max_requests_per_minute` columns with in-memory sliding-window enforcement returning HTTP 429.

#### 🎵 Media Playground

Full media generation playground at `/dashboard/media`: Image Generation, Video, Music, Audio Transcription (2GB upload limit), and Text-to-Speech.

---

### 🔒 Security & CI/CD

- **CodeQL remediation** — Fixed 10+ alerts: 6 polynomial-redos, 1 insecure-randomness (`Math.random()` → `crypto.randomUUID()`), 1 shell-command-injection
- **Route validation** — Zod schemas + `validateBody()` on **176/176 API routes** — CI enforced
- **CVE fix** — dompurify XSS vulnerability (GHSA-v2wj-7wpq-c8vv) resolved via npm overrides
- **Flatted** — Bumped 3.3.3 → 3.4.2 (CWE-1321 prototype pollution)
- **Docker** — Upgraded `docker/setup-buildx-action` v3 → v4

---

### 🐛 Bug Fixes (40+)

- **fix(mitm):** Compile MITM utilities as NodeNext ESM during prepublish, copy the CommonJS MITM server into the standalone artifact, and resolve MITM data paths without relying on Next.js aliases in packaged runtime.
- **fix(build):** Move the local `.tmp/wine32` Wine prefix out of the isolated Next.js build path so Windows Electron packaging artifacts cannot trigger `EACCES` scans during Node 24 builds.
- **fix(build):** Copy the `wreq-js` native runtime directory into the isolated Next.js standalone output so packaged Playwright/E2E starts can load the instrumentation hook on Linux.
- **fix(api):** Validate the Codex Responses websocket bridge and `/v1/batches` JSON payloads with Zod before use, keeping `request.json()` route validation green and returning explicit 400 responses for invalid bodies.
- **fix(providers):** Add explicit typing to provider alias and category helpers so the strict `typecheck:noimplicit:core` CI gate passes.
- **fix(ui):** Keep the upstream proxy provider detail page labeled with a fallback "Managed via Upstream Proxy Settings" management surface when translations are unavailable.
- **fix(electron):** Harden the production desktop CSP by removing `unsafe-eval` outside development and adding object, base URI, form action, frame ancestor, and worker restrictions.
- **fix(cli):** Replace shell-interpolated setup and privileged command execution paths with argument-based `spawn`/`execFile` helpers for database setup, Tailscale sudo commands, MITM DNS edits, and certificate install/uninstall flows.
- **fix(ui):** Keep provider icons resilient by using direct `@lobehub/icons` components first, then local PNG/SVG fallbacks, avoiding the `@lobehub/ui` peer runtime in the dashboard.

#### OAuth & Auth

- **#537** — Gemini CLI OAuth: clear actionable error when `GEMINI_OAUTH_CLIENT_SECRET` missing in Docker
- **#549** — CLI settings routes now resolve real API key from `keyId` (not masked strings)
- **#574** — Login no longer freezes after skipping wizard password setup
- **#506** — Cross-platform `machineId` rewritten (Windows REG.exe → macOS ioreg → Linux → hostname fallback)

#### Providers & Routing

- **#536** — LongCat AI: fixed `baseUrl` and `authHeader`
- **#535** — Pinned model override: `body.model` correctly set to `pinnedModel`
- **#570** — Unprefixed Claude models now resolve to Anthropic provider
- **#585** — `<omniModel>` internal tags no longer leak to clients in SSE streaming
- **#493** — Custom provider model naming no longer mangled by prefix stripping
- **#490** — Streaming + context cache protection via `TransformStream` injection
- **#511** — `<omniModel>` tag injected into first content chunk (not after `[DONE]`)

#### CLI & Tools

- **#527** — Claude Code + Codex loop: `tool_result` blocks now converted to text
- **#524** — OpenCode config saved correctly (XDG_CONFIG_HOME, TOML format)
- **#522** — API Manager: removed misleading "Copy masked key" button
- **#546** — `--version` returning `unknown` on Windows (PR by @k0valik)
- **#544** — Secure CLI tool detection via known installation paths (PR by @k0valik)
- **#510** — Windows MSYS2/Git-Bash paths normalized automatically
- **#492** — CLI detects `mise`/`nvm`-managed Node when `app/server.js` missing

#### Streaming & SSE

- **PR #587** — Revert `resolveDataDir` import in responsesTransformer for Cloudflare Workers compat (@k0valik)
- **PR #495** — Bottleneck 429 infinite wait: drop waiting jobs on rate limit (@xandr0s)
- **#483** — Stop trailing `data: null` after `[DONE]` signal
- **#473** — Zombie SSE streams: timeout reduced 300s → 120s for faster fallback

#### Media & Transcription

- **Transcription** — Deepgram `video/mp4` → `audio/mp4` MIME mapping, auto language detection, punctuation
- **TTS** — `[object Object]` error display fixed for ElevenLabs-style nested errors
- **Upload limits** — Media transcription increased to 2GB (nginx `client_max_body_size 2g` + `maxDuration=300`)

---

### 🔧 Infrastructure & Improvements

#### Sub2api Gap Analysis (T01–T15 + T23–T42)

- **T01** — `requested_model` column in call logs (migration 009)
- **T02** — Strip empty text blocks from nested `tool_result.content`
- **T03** — Parse `x-codex-5h-*` / `x-codex-7d-*` quota headers
- **T04** — `X-Session-Id` header for external sticky routing
- **T05** — Rate-limit DB persistence with dedicated API
- **T06** — Account deactivated → permanent block (1-year cooldown)
- **T07** — X-Forwarded-For IP validation (`extractClientIp()`)
- **T08** — Per-API-key session limits with sliding-window enforcement
- **T09** — Codex vs Spark rate-limit scopes (separate pools)
- **T10** — Credits exhausted → distinct 1h cooldown fallback
- **T11** — `max` reasoning effort → 131072 budget tokens
- **T12** — MiniMax M2.7 pricing entries
- **T13** — Stale quota display fix (reset window awareness)
- **T14** — Proxy fast-fail TCP check (≤2s, cached 30s)
- **T15** — Array content normalization for Anthropic
- **T23** — Intelligent quota reset fallback (header extraction)
- **T24** — `503` cooldown + `406` mapping
- **T25** — Provider validation fallback
- **T29** — Vertex AI Service Account JWT auth
- **T33** — Thinking level to budget conversion
- **T36** — `403` vs `429` error classification
- **T38** — Centralized model specifications (`modelSpecs.ts`)
- **T39** — Endpoint fallback for `fetchAvailableModels`
- **T41** — Background task auto-redirect to flash models
- **T42** — Image generation aspect ratio mapping

#### Other Improvements

- **Per-model upstream custom headers** — via configuration UI (PR #575 by @zhangqiang8vip)
- **Model context length** — configurable in model metadata (PR #578 by @hijak)
- **Model prefix stripping** — option to remove provider prefix from model names (PR #582 by @jay77721)
- **Gemini CLI deprecation** — marked deprecated with Google OAuth restriction warning
- **YAML parser** — replaced custom parser with `js-yaml` for correct OpenAPI spec parsing
- **ZWS v5** — HMR leak fix (485 DB connections → 1, memory 2.4GB → 195MB)
- **Log export** — New JSON export button on dashboard with time range dropdown
- **Update notification banner** — dashboard homepage shows when new versions are available

---

### 🌐 i18n & Documentation

- **30 languages** at 100% parity — 2,788 missing keys synced
- **Czech** — Full translation: 22 docs, 2,606 UI strings (PR by @zen0bit)
- **Chinese (zh-CN)** — Complete retranslation (PR by @only4copilot)
- **VM Deployment Guide** — Translated to English as source document
- **API Reference** — Added `/v1/embeddings` and `/v1/audio/speech` endpoints
- **Provider count** — Updated from 36+/40+/44+ to **67+** across README and all 30 i18n READMEs

---

### 🔀 Community PRs Merged (10)

| PR       | Author          | Summary                                                              |
| -------- | --------------- | -------------------------------------------------------------------- |
| **#587** | @k0valik        | fix(sse): revert resolveDataDir import for Cloudflare Workers compat |
| **#582** | @jay77721       | feat(proxy): model name prefix stripping option                      |
| **#581** | @jay77721       | fix(npm): link electron-release to npm-publish workflow              |
| **#578** | @hijak          | feat: configurable context length in model metadata                  |
| **#575** | @zhangqiang8vip | feat: per-model upstream headers, compat PATCH, chat alignment       |
| **#562** | @coobabm        | fix: MCP session management, Claude passthrough, detectFormat        |
| **#561** | @zen0bit        | fix(i18n): Czech translation corrections                             |
| **#555** | @k0valik        | fix(sse): centralized `resolveDataDir()` for path resolution         |
| **#546** | @k0valik        | fix(cli): `--version` returning `unknown` on Windows                 |
| **#544** | @k0valik        | fix(cli): secure CLI tool detection via installation paths           |
| **#542** | @rdself         | fix(ui): light mode contrast CSS theme variables                     |
| **#530** | @kang-heewon    | feat: OpenCode Zen + Go providers with `OpencodeExecutor`            |
| **#512** | @zhangqiang8vip | feat: per-protocol model compatibility (`compatByProtocol`)          |
| **#497** | @zhangqiang8vip | fix: dev-mode HMR resource leaks (ZWS v5)                            |
| **#495** | @xandr0s        | fix: Bottleneck 429 infinite wait (drop waiting jobs)                |
| **#494** | @zhangqiang8vip | feat: MiniMax developer→system role fix                              |
| **#480** | @prakersh       | fix: stream flush usage extraction                                   |
| **#479** | @prakersh       | feat: Codex 5.3/5.4 and Anthropic pricing entries                    |
| **#475** | @only4copilot   | feat(i18n): improved Chinese translation                             |

**Thank you to all contributors!** 🙏

---

### 📋 Issues Resolved (50+)

`#452` `#458` `#462` `#464` `#466` `#473` `#474` `#481` `#483` `#487` `#488` `#489` `#490` `#491` `#492` `#493` `#506` `#508` `#509` `#510` `#511` `#513` `#520` `#521` `#522` `#524` `#525` `#527` `#529` `#531` `#532` `#535` `#536` `#537` `#541` `#546` `#549` `#563` `#570` `#574` `#585`

---

### 🧪 Tests

- **926 tests, 0 failures** (up from 821 in v2.9.5)
- +105 new tests covering: model-combo mappings, registered keys, OpencodeExecutor, Bailian provider, route validation, error classification, aspect ratio mapping, and more

---

### 📦 Database Migrations

| Migration | Description                                                           |
| --------- | --------------------------------------------------------------------- |
| **008**   | `registered_keys`, `provider_key_limits`, `account_key_limits` tables |
| **009**   | `requested_model` column in `call_logs`                               |
| **010**   | `model_combo_mappings` table for per-model combo routing              |

---

### ⬆️ Upgrading from v2.9.5

```bash
# npm
npm install -g omniroute@3.0.0

# Docker
docker pull diegosouzapw/omniroute:3.0.0

# Migrations run automatically on first startup
```

> **Breaking changes:** None. All existing configurations, combos, and API keys are preserved.
> Database migrations 008-010 run automatically on startup.

---

## [3.0.0-rc.17] — 2026-03-24

### 🔒 Security & CI/CD

- **CodeQL remediation** — Fixed 10+ alerts:
  - 6 polynomial-redos in `provider.ts` / `chatCore.ts` (replaced `(?:^|/)` alternation patterns with segment-based matching)
  - 1 insecure-randomness in `acp/manager.ts` (`Math.random()` → `crypto.randomUUID()`)
  - 1 shell-command-injection in `prepublish.mjs` (`JSON.stringify()` path escaping)
- **Route validation** — Added Zod schemas + `validateBody()` to 5 routes missing validation:
  - `model-combo-mappings` (POST, PUT), `webhooks` (POST, PUT), `openapi/try` (POST)
  - CI `check:route-validation:t06` now passes: **176/176 routes validated**

### 🐛 Bug Fixes

- **fix(mitm):** Compile MITM utilities as NodeNext ESM during prepublish, copy the CommonJS MITM server into the standalone artifact, and resolve MITM data paths without relying on Next.js aliases in packaged runtime.
- **fix(build):** Move the local `.tmp/wine32` Wine prefix out of the isolated Next.js build path so Windows Electron packaging artifacts cannot trigger `EACCES` scans during Node 24 builds.
- **fix(build):** Copy the `wreq-js` native runtime directory into the isolated Next.js standalone output so packaged Playwright/E2E starts can load the instrumentation hook on Linux.
- **fix(api):** Validate the Codex Responses websocket bridge and `/v1/batches` JSON payloads with Zod before use, keeping `request.json()` route validation green and returning explicit 400 responses for invalid bodies.
- **fix(providers):** Add explicit typing to provider alias and category helpers so the strict `typecheck:noimplicit:core` CI gate passes.
- **fix(ui):** Keep the upstream proxy provider detail page labeled with a fallback "Managed via Upstream Proxy Settings" management surface when translations are unavailable.
- **fix(electron):** Harden the production desktop CSP by removing `unsafe-eval` outside development and adding object, base URI, form action, frame ancestor, and worker restrictions.
- **fix(cli):** Replace shell-interpolated setup and privileged command execution paths with argument-based `spawn`/`execFile` helpers for database setup, Tailscale sudo commands, MITM DNS edits, and certificate install/uninstall flows.
- **fix(ui):** Keep provider icons resilient by using direct `@lobehub/icons` components first, then local PNG/SVG fallbacks, avoiding the `@lobehub/ui` peer runtime in the dashboard.

- **#585** — `<omniModel>` internal tags no longer leak to clients in SSE responses. Added outbound sanitization `TransformStream` in `combo.ts`

### ⚙️ Infrastructure

- **Docker** — Upgraded `docker/setup-buildx-action` from v3 → v4 (Node.js 20 deprecation fix)
- **CI cleanup** — Deleted 150+ failed/cancelled workflow runs

### 🧪 Tests

- Test suite: **926 tests, 0 failures** (+3 new)

---

## [3.0.0-rc.16] — 2026-03-24

### ✨ New Features

- **feat(providers):** Implement Image Generation and Editing capabilities for ChatGPT Web, including in-band chat image generation and caching (#1606).
- **feat(ui):** Integrate OpenCode Zen/Go API tool logo SVG and polish API key copy-to-clipboard interactions (#1607).

- **feat(providers):** Integrate AgentRouter as a new OpenAI-compatible passthrough provider with $200 free credits via sign-up (Issue #1572).
- **feat(ui):** Implement on-demand per-model testing in the provider dashboard, allowing single-token diagnostic checks without triggering rate-limits (Issue #1532).

- Increased media transcription limits
- Added Model Context Length to registry metadata
- Added per-model upstream custom headers via configuration UI
- Fixed multiple bugs, Zod valiadation for patches, and resolved various community issues.

## [3.0.0-rc.15] — 2026-03-24

### ✨ New Features

- **feat(providers):** Implement Image Generation and Editing capabilities for ChatGPT Web, including in-band chat image generation and caching (#1606).
- **feat(ui):** Integrate OpenCode Zen/Go API tool logo SVG and polish API key copy-to-clipboard interactions (#1607).

- **feat(providers):** Integrate AgentRouter as a new OpenAI-compatible passthrough provider with $200 free credits via sign-up (Issue #1572).
- **feat(ui):** Implement on-demand per-model testing in the provider dashboard, allowing single-token diagnostic checks without triggering rate-limits (Issue #1532).

- **#563** — Per-model Combo Routing: map model name patterns (glob) to specific combos for automatic routing
  - New `model_combo_mappings` table (migration 010) with pattern, combo_id, priority, enabled
  - `resolveComboForModel()` DB function with glob-to-regex matching (case-insensitive, `*` and `?` wildcards)
  - `getComboForModel()` in `model.ts`: augments `getCombo()` with model-pattern fallback
  - `chat.ts`: routing decision now checks model-combo mappings before single-model handling
  - API: `GET/POST /api/model-combo-mappings`, `GET/PUT/DELETE /api/model-combo-mappings/:id`
  - Dashboard: "Model Routing Rules" section added to Combos page with inline add/edit/toggle/delete
  - Examples: `claude-sonnet*` → code-combo, `gpt-4o*` → openai-combo, `gemini-*` → google-combo

### 🌐 i18n

- **Full i18n Sync**: 2,788 missing keys added across 30 language files — all languages now at 100% parity with `en.json`
- **Agents page i18n**: OpenCode Integration section fully internationalized (title, description, scanning, download labels)
- **6 new keys** added to `agents` namespace for OpenCode section

### 🎨 UI/UX

- **Provider Icons**: 16 missing provider icons added (3 copied, 2 downloaded, 11 SVG created)
- **SVG fallback**: `ProviderIcon` component updated with 4-tier strategy: Lobehub → PNG → SVG → Generic icon
- **Agents fingerprinting**: Synced with CLI tools — added droid, openclaw, copilot, opencode to fingerprint list (14 total)

### Sicherheit

- **CVE fix**: Resolved dompurify XSS vulnerability (GHSA-v2wj-7wpq-c8vv) via npm overrides forcing `dompurify@^3.3.2`
- `npm audit` now reports **0 vulnerabilities**

### 🧪 Tests

- Test suite: **923 tests, 0 failures** (+15 new model-combo mapping tests)

---

## [3.0.0-rc.14] — 2026-03-23

### 🔀 Community PRs Merged

| PR       | Author   | Summary                                                                                      |
| -------- | -------- | -------------------------------------------------------------------------------------------- |
| **#562** | @coobabm | fix(ux): MCP session management, Claude passthrough normalization, OAuth modal, detectFormat |
| **#561** | @zen0bit | fix(i18n): Czech translation corrections — HTTP method names and documentation updates       |

### 🧪 Tests

- Test suite: **908 tests, 0 failures**

---

## [3.0.0-rc.13] — 2026-03-23

### 🔧 Bug Fixes

- **config:** resolve real API key from `keyId` in CLI settings routes (`codex-settings`, `droid-settings`, `kilo-settings`) to prevent writing masked strings (#549)

---

## [3.0.0-rc.12] — 2026-03-23

### 🔀 Community PRs Merged

| PR       | Author   | Summary                                                                                                                                                       |
| -------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **#546** | @k0valik | fix(cli): `--version` returning `unknown` on Windows — use `JSON.parse(readFileSync)` instead of ESM import                                                   |
| **#555** | @k0valik | fix(sse): centralized `resolveDataDir()` for path resolution in credentials, autoCombo, responses logger, and request logger                                  |
| **#544** | @k0valik | fix(cli): secure CLI tool detection via known installation paths (8 tools) with symlink validation, file-type checks, size bounds, minimal env in healthcheck |
| **#542** | @rdself  | fix(ui): improve light mode contrast — add missing CSS theme variables (`bg-primary`, `bg-subtle`, `text-primary`) and fix dark-only colors in log detail     |

### 🔧 Bug Fixes

- **TDZ fix in `cliRuntime.ts`** — `validateEnvPath` was used before initialization at module startup by `getExpectedParentPaths()`. Reordered declarations to fix `ReferenceError`.
- **Build fixes** — Added `pino` and `pino-pretty` to `serverExternalPackages` to prevent Turbopack from breaking Pino's internal worker loading.

### 🧪 Tests

- Test suite: **905 tests, 0 failures**

---

## [3.0.0-rc.10] — 2026-03-23

### 🔧 Bug Fixes

- **#509 / #508** — Electron build regression: downgraded Next.js from `16.1.x` to `16.0.10` to eliminate Turbopack module-hashing instability that caused blank screens in the Electron desktop bundle.
- **Unit test fixes** — Corrected two stale test assertions (`nanobanana-image-handler` aspect ratio/resolution, `thinking-budget` Gemini `thinkingConfig` field mapping) that had drifted after recent implementation changes.
- **#541** — Responded to user feedback about installation complexity; no code changes required.

---

## [3.0.0-rc.9] — 2026-03-23

### ✨ New Features

- **feat(providers):** Implement Image Generation and Editing capabilities for ChatGPT Web, including in-band chat image generation and caching (#1606).
- **feat(ui):** Integrate OpenCode Zen/Go API tool logo SVG and polish API key copy-to-clipboard interactions (#1607).

- **feat(providers):** Integrate AgentRouter as a new OpenAI-compatible passthrough provider with $200 free credits via sign-up (Issue #1572).
- **feat(ui):** Implement on-demand per-model testing in the provider dashboard, allowing single-token diagnostic checks without triggering rate-limits (Issue #1532).

- **T29** — Vertex AI SA JSON Executor: implemented using the `jose` library to handle JWT/Service Account auth, along with configurable regions in the UI and automatic partner model URL building.
- **T42** — Image generation aspect ratio mapping: created `sizeMapper` logic for generic OpenAI formats (`size`), added native `imagen3` handling, and updated NanoBanana endpoints to utilize mapped aspect ratios automatically.
- **T38** — Centralized model specifications: `modelSpecs.ts` created for limits and parameters per model.

### 🔧 Improvements

- **T40** — OpenCode CLI tools integration: native `opencode-zen` and `opencode-go` integration completed in earlier PR.

---

## [3.0.0-rc.8] — 2026-03-23

### 🔧 Bug Fixes & Improvements (Fallback, Quota & Budget)

- **T24** — `503` cooldown await fix + `406` mapping: mapped `406 Not Acceptable` to `503 Service Unavailable` with proper cooldown intervals.
- **T25** — Provider validation fallback: graceful fallback to standard validation models when a specific `validationModelId` is not present.
- **T36** — `403` vs `429` provider handling refinement: extracted into `errorClassifier.ts` to properly segregate hard permissions failures (`403`) from rate limits (`429`).
- **T39** — Endpoint Fallback for `fetchAvailableModels`: implemented a tri-tier mechanism (`/models` -> `/v1/models` -> local generic catalog) + `list_models_catalog` MCP tool updates to reflect `source` and `warning`.
- **T33** — Thinking level to budget conversion: translates qualitative thinking levels into precise budget allocations.
- **T41** — Background task auto redirect: routes heavy background evaluation tasks to flash/efficient models automatically.
- **T23** — Intelligent quota reset fallback: accurately extracts `x-ratelimit-reset` / `retry-after` header values or maps static cooldowns.

---

## [3.0.0-rc.7] — 2026-03-23 _(What's New vs v2.9.5 — will be released as v3.0.0)_

> **Upgrade from v2.9.5:** 16 issues resolved · 2 community PRs merged · 2 new providers · 7 new API endpoints · 3 new features · DB migration 008+009 · 832 tests passing · 15 sub2api gap improvements (T01–T15 complete).

### 🆕 New Providers

| Provider         | Alias          | Tier | Notes                                                          |
| ---------------- | -------------- | ---- | -------------------------------------------------------------- |
| **OpenCode Zen** | `opencode-zen` | Free | 3 models via `opencode.ai/zen/v1` (PR #530 by @kang-heewon)    |
| **OpenCode Go**  | `opencode-go`  | Paid | 4 models via `opencode.ai/zen/go/v1` (PR #530 by @kang-heewon) |

Both providers use the new `OpencodeExecutor` with multi-format routing (`/chat/completions`, `/messages`, `/responses`, `/models/{model}:generateContent`).

---

### ✨ New Features

- **feat(providers):** Implement Image Generation and Editing capabilities for ChatGPT Web, including in-band chat image generation and caching (#1606).
- **feat(ui):** Integrate OpenCode Zen/Go API tool logo SVG and polish API key copy-to-clipboard interactions (#1607).

- **feat(providers):** Integrate AgentRouter as a new OpenAI-compatible passthrough provider with $200 free credits via sign-up (Issue #1572).
- **feat(ui):** Implement on-demand per-model testing in the provider dashboard, allowing single-token diagnostic checks without triggering rate-limits (Issue #1532).

#### 🔑 Registered Keys Provisioning API (#464)

Auto-generate and issue OmniRoute API keys programmatically with per-provider and per-account quota enforcement.

| Endpoint                              | Method    | Description                                      |
| ------------------------------------- | --------- | ------------------------------------------------ |
| `/api/v1/registered-keys`             | `POST`    | Issue a new key — raw key returned **once only** |
| `/api/v1/registered-keys`             | `GET`     | List registered keys (masked)                    |
| `/api/v1/registered-keys/{id}`        | `GET`     | Get key metadata                                 |
| `/api/v1/registered-keys/{id}`        | `DELETE`  | Revoke a key                                     |
| `/api/v1/registered-keys/{id}/revoke` | `POST`    | Revoke (for clients without DELETE support)      |
| `/api/v1/quotas/check`                | `GET`     | Pre-validate quota before issuing                |
| `/api/v1/providers/{id}/limits`       | `GET/PUT` | Configure per-provider issuance limits           |
| `/api/v1/accounts/{id}/limits`        | `GET/PUT` | Configure per-account issuance limits            |
| `/api/v1/issues/report`               | `POST`    | Report quota events to GitHub Issues             |

**DB — Migration 008:** Three new tables: `registered_keys`, `provider_key_limits`, `account_key_limits`.
**Security:** Keys stored as SHA-256 hashes. Raw key shown once on creation, never retrievable again.
**Quota types:** `maxActiveKeys`, `dailyIssueLimit`, `hourlyIssueLimit` per provider and per account.
**Idempotency:** `idempotency_key` field prevents duplicate issuance. Returns `409 IDEMPOTENCY_CONFLICT` if key was already used.
**Budget per key:** `dailyBudget` / `hourlyBudget` — limits how many requests a key can route per window.
**GitHub reporting:** Optional. Set `GITHUB_ISSUES_REPO` + `GITHUB_ISSUES_TOKEN` to auto-create GitHub issues on quota exceeded or issuance failures.

#### 🎨 Provider Icons — @lobehub/icons (#529)

All provider icons in the dashboard now use `@lobehub/icons` React components (130+ providers with SVG).
Fallback chain: **Lobehub SVG → existing `/providers/{id}.png` → generic icon**. Uses a proper React `ErrorBoundary` pattern.

#### 🔄 Model Auto-Sync Scheduler (#488)

OmniRoute now automatically refreshes model lists for connected providers every **24 hours**.

- Runs on server startup via the existing `/api/sync/initialize` hook
- Configurable via `MODEL_SYNC_INTERVAL_HOURS` environment variable
- Covers 16 major providers
- Records last sync time in the settings database

---

### 🔧 Bug Fixes

#### OAuth & Auth

- **#537 — Gemini CLI OAuth:** Clear actionable error when `GEMINI_OAUTH_CLIENT_SECRET` is missing in Docker/self-hosted deployments. Previously showed cryptic `client_secret is missing` from Google. Now provides specific `docker-compose.yml` and `~/.omniroute/.env` instructions.

#### Providers & Routing

- **#536 — LongCat AI:** Fixed `baseUrl` (`api.longcat.chat/openai`) and `authHeader` (`Authorization: Bearer`).
- **#535 — Pinned model override:** `body.model` is now correctly set to `pinnedModel` when context-cache protection is active.
- **#532 — OpenCode Go key validation:** Now uses the `zen/v1` test endpoint (`testKeyBaseUrl`) — same key works for both tiers.

#### CLI & Tools

- **#527 — Claude Code + Codex loop:** `tool_result` blocks are now converted to text instead of dropped, stopping infinite tool-result loops.
- **#524 — OpenCode config save:** Added `saveOpenCodeConfig()` handler (XDG_CONFIG_HOME aware, writes TOML).
- **#521 — Login stuck:** Login no longer freezes after skipping password setup — redirects correctly to onboarding.
- **#522 — API Manager:** Removed misleading "Copy masked key" button (replaced with a lock icon tooltip).
- **#532 — OpenCode Go config:** Guide settings handler now handles `opencode` toolId.

#### Developer Experience

- **#489 — Antigravity:** Missing `googleProjectId` returns a structured 422 error with reconnect guidance instead of a cryptic crash.
- **#510 — Windows paths:** MSYS2/Git-Bash paths (`/c/Program Files/...`) are now normalized to `C:\Program Files\...` automatically.
- **#492 — CLI startup:** `omniroute` CLI now detects `mise`/`nvm`-managed Node when `app/server.js` is missing and shows targeted fix instructions.

---

### 📖 Documentation Updates

- **#513** — Docker password reset: `INITIAL_PASSWORD` env var workaround documented
- **#520** — pnpm: `pnpm approve-builds better-sqlite3` step documented

---

### ✅ Issues Resolved in v3.0.0

`#464` `#488` `#489` `#492` `#510` `#513` `#520` `#521` `#522` `#524` `#527` `#529` `#532` `#535` `#536` `#537`

---

### 🔀 Community PRs Merged

| PR       | Author       | Summary                                                                |
| -------- | ------------ | ---------------------------------------------------------------------- |
| **#530** | @kang-heewon | OpenCode Zen + Go providers with `OpencodeExecutor` and improved tests |

---

## [3.0.0-rc.7] - 2026-03-23

### 🔧 Improvements (sub2api Gap Analysis — T05, T08, T09, T13, T14)

- **T05** — Rate-limit DB persistence: `setConnectionRateLimitUntil()`, `isConnectionRateLimited()`, `getRateLimitedConnections()` in `providers.ts`. The existing `rate_limited_until` column is now exposed as a dedicated API — OAuth token refresh must NOT touch this field to prevent rate-limit loops.
- **T08** — Per-API-key session limit: `max_sessions INTEGER DEFAULT 0` added to `api_keys` via auto-migration. `sessionManager.ts` gains `registerKeySession()`, `unregisterKeySession()`, `checkSessionLimit()`, and `getActiveSessionCountForKey()`. Callers in `chatCore.js` can enforce the limit and decrement on `req.close`.
- **T09** — Codex vs Spark rate-limit scopes: `getCodexModelScope()` and `getCodexRateLimitKey()` in `codex.ts`. Standard models (`gpt-5.x-codex`, `codex-mini`) get scope `"codex"`; spark models (`codex-spark*`) get scope `"spark"`. Rate-limit keys should be `${accountId}:${scope}` so exhausting one pool doesn't block the other.
- **T13** — Stale quota display fix: `getEffectiveQuotaUsage(used, resetAt)` returns `0` when the reset window has passed; `formatResetCountdown(resetAt)` returns a human-readable countdown string (e.g. `"2h 35m"`). Both exported from `providers.ts` + `localDb.ts` for dashboard consumption.
- **T14** — Proxy fast-fail: new `src/lib/proxyHealth.ts` with `isProxyReachable(proxyUrl, timeoutMs=2000)` (TCP check, ≤2s instead of 30s timeout), `getCachedProxyHealth()`, `invalidateProxyHealth()`, and `getAllProxyHealthStatuses()`. Results cached 30s by default; configurable via `PROXY_FAST_FAIL_TIMEOUT_MS` / `PROXY_HEALTH_CACHE_TTL_MS`.

### 🧪 Tests

- Test suite: **832 tests, 0 failures**

---

## [3.0.0-rc.6] - 2026-03-23

### 🔧 Bug Fixes & Improvements (sub2api Gap Analysis — T01–T15)

- **T01** — `requested_model` column in `call_logs` (migration 009): track which model the client originally requested vs the actual routed model. Enables fallback rate analytics.
- **T02** — Strip empty text blocks from nested `tool_result.content`: prevents Anthropic 400 errors (`text content blocks must be non-empty`) when Claude Code chains tool results.
- **T03** — Parse `x-codex-5h-*` / `x-codex-7d-*` headers: `parseCodexQuotaHeaders()` + `getCodexResetTime()` extract Codex quota windows for precise cooldown scheduling instead of generic 5-min fallback.
- **T04** — `X-Session-Id` header for external sticky routing: `extractExternalSessionId()` in `sessionManager.ts` reads `x-session-id` / `x-omniroute-session` headers with `ext:` prefix to avoid collision with internal SHA-256 session IDs. Nginx-compatible (hyphenated header).
- **T06** — Account deactivated → permanent block: `isAccountDeactivated()` in `accountFallback.ts` detects 401 deactivation signals and applies a 1-year cooldown to prevent retrying permanently dead accounts.
- **T07** — X-Forwarded-For IP validation: new `src/lib/ipUtils.ts` with `extractClientIp()` and `getClientIpFromRequest()` — skips `unknown`/non-IP entries in `X-Forwarded-For` chains (Nginx/proxy-forwarded requests).
- **T10** — Credits exhausted → distinct fallback: `isCreditsExhausted()` in `accountFallback.ts` returns 1h cooldown with `creditsExhausted` flag, distinct from generic 429 rate limiting.
- **T11** — `max` reasoning effort → 131072 budget tokens: `EFFORT_BUDGETS` and `THINKING_LEVEL_MAP` updated; reverse mapping now returns `"max"` for full-budget responses. Unit test updated.
- **T12** — MiniMax M2.7 pricing entries added: `minimax-m2.7`, `MiniMax-M2.7`, `minimax-m2.7-highspeed` added to pricing table (sub2api PR #1120). M2.5/GLM-4.7/GLM-5/Kimi pricing already existed.
- **T15** — Array content normalization: `normalizeContentToString()` helper in `openai-to-claude.ts` correctly collapses array-formatted system/tool messages to string before sending to Anthropic.

### 🧪 Tests

- Test suite: **832 tests, 0 failures** (unchanged from rc.5)

---

## [3.0.0-rc.5] - 2026-03-22

### ✨ New Features

- **feat(providers):** Implement Image Generation and Editing capabilities for ChatGPT Web, including in-band chat image generation and caching (#1606).
- **feat(ui):** Integrate OpenCode Zen/Go API tool logo SVG and polish API key copy-to-clipboard interactions (#1607).

- **feat(providers):** Integrate AgentRouter as a new OpenAI-compatible passthrough provider with $200 free credits via sign-up (Issue #1572).
- **feat(ui):** Implement on-demand per-model testing in the provider dashboard, allowing single-token diagnostic checks without triggering rate-limits (Issue #1532).

- **#464** — Registered Keys Provisioning API: auto-issue API keys with per-provider & per-account quota enforcement
  - `POST /api/v1/registered-keys` — issue keys with idempotency support
  - `GET /api/v1/registered-keys` — list (masked) registered keys
  - `GET /api/v1/registered-keys/{id}` — get key metadata
  - `DELETE /api/v1/registered-keys/{id}` / `POST ../{id}/revoke` — revoke keys
  - `GET /api/v1/quotas/check` — pre-validate before issuing
  - `PUT /api/v1/providers/{id}/limits` — set provider issuance limits
  - `PUT /api/v1/accounts/{id}/limits` — set account issuance limits
  - `POST /api/v1/issues/report` — optional GitHub issue reporting
  - DB migration 008: `registered_keys`, `provider_key_limits`, `account_key_limits` tables

---

## [3.0.0-rc.4] - 2026-03-22

### ✨ New Features

- **feat(providers):** Implement Image Generation and Editing capabilities for ChatGPT Web, including in-band chat image generation and caching (#1606).
- **feat(ui):** Integrate OpenCode Zen/Go API tool logo SVG and polish API key copy-to-clipboard interactions (#1607).

- **feat(providers):** Integrate AgentRouter as a new OpenAI-compatible passthrough provider with $200 free credits via sign-up (Issue #1572).
- **feat(ui):** Implement on-demand per-model testing in the provider dashboard, allowing single-token diagnostic checks without triggering rate-limits (Issue #1532).

- **#530 (PR)** — OpenCode Zen and OpenCode Go providers added (by @kang-heewon)
  - New `OpencodeExecutor` with multi-format routing (`/chat/completions`, `/messages`, `/responses`)
  - 7 models across both tiers

---

## [3.0.0-rc.3] - 2026-03-22

### ✨ New Features

- **feat(providers):** Implement Image Generation and Editing capabilities for ChatGPT Web, including in-band chat image generation and caching (#1606).
- **feat(ui):** Integrate OpenCode Zen/Go API tool logo SVG and polish API key copy-to-clipboard interactions (#1607).

- **feat(providers):** Integrate AgentRouter as a new OpenAI-compatible passthrough provider with $200 free credits via sign-up (Issue #1572).
- **feat(ui):** Implement on-demand per-model testing in the provider dashboard, allowing single-token diagnostic checks without triggering rate-limits (Issue #1532).

- **#529** — Provider icons now use [@lobehub/icons](https://github.com/lobehub/lobe-icons) with graceful PNG fallback and a `ProviderIcon` component (130+ providers supported)
- **#488** — Auto-update model lists every 24h via `modelSyncScheduler` (configurable via `MODEL_SYNC_INTERVAL_HOURS`)

### 🔧 Bug Fixes

- **#537** — Gemini CLI OAuth: now shows clear actionable error when `GEMINI_OAUTH_CLIENT_SECRET` is missing in Docker/self-hosted deployments

---

## [3.0.0-rc.2] - 2026-03-22

### 🔧 Bug Fixes

- **#536** — LongCat AI key validation: fixed baseUrl (`api.longcat.chat/openai`) and authHeader (`Authorization: Bearer`)
- **#535** — Pinned model override: `body.model` is now set to `pinnedModel` when context-cache protection detects a pinned model
- **#524** — OpenCode config now saved correctly: added `saveOpenCodeConfig()` handler (XDG_CONFIG_HOME aware, writes TOML)

---

## [3.0.0-rc.1] - 2026-03-22

### 🔧 Bug Fixes

- **#521** — Login no longer gets stuck after skipping password setup (redirects to onboarding)
- **#522** — API Manager: Removed misleading "Copy masked key" button (replaced with lock icon tooltip)
- **#527** — Claude Code + Codex superpowers loop: `tool_result` blocks now converted to text instead of dropped
- **#532** — OpenCode GO API key validation now uses the correct `zen/v1` endpoint (`testKeyBaseUrl`)
- **#489** — Antigravity: missing `googleProjectId` returns structured 422 error with reconnect guidance
- **#510** — Windows: MSYS2/Git-Bash paths (`/c/Program Files/...`) are now normalized to `C:\Program Files\...`
- **#492** — `omniroute` CLI now detects `mise`/`nvm` when `app/server.js` is missing and shows targeted fix

### Dokumentation

- **#513** — Docker password reset: `INITIAL_PASSWORD` env var workaround documented
- **#520** — pnpm: `pnpm approve-builds better-sqlite3` documented

### ✅ Closed Issues

#489, #492, #510, #513, #520, #521, #522, #525, #527, #532

---

## [2.9.5] — 2026-03-22

> Sprint: New OpenCode providers, embedding credentials fix, CLI masked key bug, CACHE_TAG_PATTERN fix.

### 🐛 Bug Fixes

- **fix(mitm):** Compile MITM utilities as NodeNext ESM during prepublish, copy the CommonJS MITM server into the standalone artifact, and resolve MITM data paths without relying on Next.js aliases in packaged runtime.
- **fix(build):** Move the local `.tmp/wine32` Wine prefix out of the isolated Next.js build path so Windows Electron packaging artifacts cannot trigger `EACCES` scans during Node 24 builds.
- **fix(build):** Copy the `wreq-js` native runtime directory into the isolated Next.js standalone output so packaged Playwright/E2E starts can load the instrumentation hook on Linux.
- **fix(api):** Validate the Codex Responses websocket bridge and `/v1/batches` JSON payloads with Zod before use, keeping `request.json()` route validation green and returning explicit 400 responses for invalid bodies.
- **fix(providers):** Add explicit typing to provider alias and category helpers so the strict `typecheck:noimplicit:core` CI gate passes.
- **fix(ui):** Keep the upstream proxy provider detail page labeled with a fallback "Managed via Upstream Proxy Settings" management surface when translations are unavailable.
- **fix(electron):** Harden the production desktop CSP by removing `unsafe-eval` outside development and adding object, base URI, form action, frame ancestor, and worker restrictions.
- **fix(cli):** Replace shell-interpolated setup and privileged command execution paths with argument-based `spawn`/`execFile` helpers for database setup, Tailscale sudo commands, MITM DNS edits, and certificate install/uninstall flows.
- **fix(ui):** Keep provider icons resilient by using direct `@lobehub/icons` components first, then local PNG/SVG fallbacks, avoiding the `@lobehub/ui` peer runtime in the dashboard.

- **CLI tools save masked API key to config files** — `claude-settings`, `cline-settings`, and `openclaw-settings` POST routes now accept a `keyId` param and resolve the real API key from DB before writing to disk. `ClaudeToolCard` updated to send `keyId` instead of the masked display string. Fixes #523, #526.
- **Custom embedding providers: `No credentials` error** — `/v1/embeddings` now tracks `credentialsProviderId` separately from the routing prefix, so credentials are fetched from the matching provider node ID rather than the public prefix string. Fixes a regression where `google/gemini-embedding-001` and similar custom-provider models would always fail with a credentials error. Fixes #532-related. (PR #528 by @jacob2826)
- **Context cache protection regex misses `
` prefix** — `CACHE_TAG_PATTERN` in `comboAgentMiddleware.ts` updated to match both literal `
` (backslash-n) and actual newline U+000A that `combo.ts` streaming injects around the `<omniModel>` tag after fix #515. Fixes #531.

### ✨ New Providers

- **OpenCode Zen** — Free tier gateway at `opencode.ai/zen/v1` with 3 models: `minimax-m2.5-free`, `big-pickle`, `gpt-5-nano`
- **OpenCode Go** — Subscription service at `opencode.ai/zen/go/v1` with 4 models: `glm-5`, `kimi-k2.5`, `minimax-m2.7` (Claude format), `minimax-m2.5` (Claude format)
- Both providers use the new `OpencodeExecutor` which routes dynamically to `/chat/completions`, `/messages`, `/responses`, or `/models/{model}:generateContent` based on the requested model. (PR #530 by @kang-heewon)

---

## [2.9.4] — 2026-03-21

> Sprint: Bug fixes — preserve Codex prompt cache key, fix tagContent JSON escaping, sync expired token status to DB.

### 🐛 Bug Fixes

- **fix(mitm):** Compile MITM utilities as NodeNext ESM during prepublish, copy the CommonJS MITM server into the standalone artifact, and resolve MITM data paths without relying on Next.js aliases in packaged runtime.
- **fix(build):** Move the local `.tmp/wine32` Wine prefix out of the isolated Next.js build path so Windows Electron packaging artifacts cannot trigger `EACCES` scans during Node 24 builds.
- **fix(build):** Copy the `wreq-js` native runtime directory into the isolated Next.js standalone output so packaged Playwright/E2E starts can load the instrumentation hook on Linux.
- **fix(api):** Validate the Codex Responses websocket bridge and `/v1/batches` JSON payloads with Zod before use, keeping `request.json()` route validation green and returning explicit 400 responses for invalid bodies.
- **fix(providers):** Add explicit typing to provider alias and category helpers so the strict `typecheck:noimplicit:core` CI gate passes.
- **fix(ui):** Keep the upstream proxy provider detail page labeled with a fallback "Managed via Upstream Proxy Settings" management surface when translations are unavailable.
- **fix(electron):** Harden the production desktop CSP by removing `unsafe-eval` outside development and adding object, base URI, form action, frame ancestor, and worker restrictions.
- **fix(cli):** Replace shell-interpolated setup and privileged command execution paths with argument-based `spawn`/`execFile` helpers for database setup, Tailscale sudo commands, MITM DNS edits, and certificate install/uninstall flows.
- **fix(ui):** Keep provider icons resilient by using direct `@lobehub/icons` components first, then local PNG/SVG fallbacks, avoiding the `@lobehub/ui` peer runtime in the dashboard.

- **fix(translator)**: Preserve `prompt_cache_key` in Responses API → Chat Completions translation (#517)
  — The field is a cache-affinity signal used by Codex; stripping it was preventing prompt cache hits.
  Fixed in `openai-responses.ts` and `responsesApiHelper.ts`.

- **fix(combo)**: Escape `
` in `tagContent` so injected JSON string is valid (#515)
  — Template literal newlines (U+000A) are not allowed unescaped inside JSON string values.
  Replaced with `\n` literal sequences in `open-sse/services/combo.ts`.

- **fix(usage)**: Sync expired token status back to DB on live auth failure (#491)
  — When the Limits & Quotas live check returns 401/403, the connection `testStatus` is now updated
  to `"expired"` in the database so the Providers page reflects the same degraded state.
  Fixed in `src/app/api/usage/[connectionId]/route.ts`.

---

## [2.9.3] — 2026-03-21

> Sprint: Add 5 new free AI providers — LongCat, Pollinations, Cloudflare AI, Scaleway, AI/ML API.

### ✨ New Providers

- **feat(providers/longcat)**: Add LongCat AI (`lc/`) — 50M tokens/day free (Flash-Lite) + 500K/day (Chat/Thinking) during public beta. OpenAI-compatible, standard Bearer auth.
- **feat(providers/pollinations)**: Add Pollinations AI (`pol/`) — no API key required. Proxies GPT-5, Claude, Gemini, DeepSeek V3, Llama 4 (1 req/15s free). Custom executor handles optional auth.
- **feat(providers/cloudflare-ai)**: Add Cloudflare Workers AI (`cf/`) — 10K Neurons/day free (~150 LLM responses or 500s Whisper audio). 50+ models on global edge. Custom executor builds dynamic URL with `accountId` from credentials.
- **feat(providers/scaleway)**: Add Scaleway Generative APIs (`scw/`) — 1M free tokens for new accounts. EU/GDPR compliant (Paris). Qwen3 235B, Llama 3.1 70B, Mistral Small 3.2.
- **feat(providers/aimlapi)**: Add AI/ML API (`aiml/`) — $0.025/day free credit, 200+ models (GPT-4o, Claude, Gemini, Llama) via single aggregator endpoint.

### 🔄 Provider Updates

- **feat(providers/together)**: Add `hasFree: true` + 3 permanently free model IDs: `Llama-3.3-70B-Instruct-Turbo-Free`, `Llama-Vision-Free`, `DeepSeek-R1-Distill-Llama-70B-Free`
- **feat(providers/gemini)**: Add `hasFree: true` + `freeNote` (1,500 req/day, no credit card needed, aistudio.google.com)
- **chore(providers/gemini)**: Rename display name to `Gemini (Google AI Studio)` for clarity

### ⚙️ Infrastructure

- **feat(executors/pollinations)**: New `PollinationsExecutor` — omits `Authorization` header when no API key provided
- **feat(executors/cloudflare-ai)**: New `CloudflareAIExecutor` — dynamic URL construction requires `accountId` in provider credentials
- **feat(executors)**: Register `pollinations`, `pol`, `cloudflare-ai`, `cf` executor mappings

### Dokumentation

- **docs(readme)**: Expanded free combo stack to 11 providers ($0 forever)
- **docs(readme)**: Added 4 new free provider sections (LongCat, Pollinations, Cloudflare AI, Scaleway) with model tables
- **docs(readme)**: Updated pricing table with 4 new free tier rows
- **docs(i18n/pt-BR)**: Updated pricing table + added LongCat/Pollinations/Cloudflare AI/Scaleway sections in Portuguese
- **docs(new-features/ai)**: 10 task spec files + master implementation plan in `docs/new-features/ai/`

### 🧪 Tests

- Test suite: **821 tests, 0 failures** (unchanged)

---

## [2.9.2] — 2026-03-21

> Sprint: Fix media transcription (Deepgram/HuggingFace Content-Type, language detection) and TTS error display.

### 🐛 Bug Fixes

- **fix(mitm):** Compile MITM utilities as NodeNext ESM during prepublish, copy the CommonJS MITM server into the standalone artifact, and resolve MITM data paths without relying on Next.js aliases in packaged runtime.
- **fix(build):** Move the local `.tmp/wine32` Wine prefix out of the isolated Next.js build path so Windows Electron packaging artifacts cannot trigger `EACCES` scans during Node 24 builds.
- **fix(build):** Copy the `wreq-js` native runtime directory into the isolated Next.js standalone output so packaged Playwright/E2E starts can load the instrumentation hook on Linux.
- **fix(api):** Validate the Codex Responses websocket bridge and `/v1/batches` JSON payloads with Zod before use, keeping `request.json()` route validation green and returning explicit 400 responses for invalid bodies.
- **fix(providers):** Add explicit typing to provider alias and category helpers so the strict `typecheck:noimplicit:core` CI gate passes.
- **fix(ui):** Keep the upstream proxy provider detail page labeled with a fallback "Managed via Upstream Proxy Settings" management surface when translations are unavailable.
- **fix(electron):** Harden the production desktop CSP by removing `unsafe-eval` outside development and adding object, base URI, form action, frame ancestor, and worker restrictions.
- **fix(cli):** Replace shell-interpolated setup and privileged command execution paths with argument-based `spawn`/`execFile` helpers for database setup, Tailscale sudo commands, MITM DNS edits, and certificate install/uninstall flows.
- **fix(ui):** Keep provider icons resilient by using direct `@lobehub/icons` components first, then local PNG/SVG fallbacks, avoiding the `@lobehub/ui` peer runtime in the dashboard.

- **fix(transcription)**: Deepgram and HuggingFace audio transcription now correctly map `video/mp4` → `audio/mp4` and other media MIME types via new `resolveAudioContentType()` helper. Previously, uploading `.mp4` files consistently returned "No speech detected" because Deepgram was receiving `Content-Type: video/mp4`.
- **fix(transcription)**: Added `detect_language=true` to Deepgram requests — auto-detects audio language (Portuguese, Spanish, etc.) instead of defaulting to English. Fixes non-English transcriptions returning empty or garbage results.
- **fix(transcription)**: Added `punctuate=true` to Deepgram requests for higher-quality transcription output with correct punctuation.
- **fix(tts)**: `[object Object]` error display in Text-to-Speech responses fixed in both `audioSpeech.ts` and `audioTranscription.ts`. The `upstreamErrorResponse()` function now correctly extracts nested string messages from providers like ElevenLabs that return `{ error: { message: "...", status_code: 401 } }` instead of a flat error string.

### 🧪 Tests

- Test suite: **821 tests, 0 failures** (unchanged)

### Triaged Issues

- **#508** — Tool call format regression: requested proxy logs and provider chain info (`needs-info`)
- **#510** — Windows CLI healthcheck path: requested shell/Node version info (`needs-info`)
- **#485** — Kiro MCP tool calls: closed as external Kiro issue (not OmniRoute)
- **#442** — Baseten /models endpoint: closed (documented manual workaround)
- **#464** — Key provisioning API: acknowledged as roadmap item

---

## [2.9.1] — 2026-03-21

> Sprint: Fix SSE omniModel data loss, merge per-protocol model compatibility.

### Bug Fixes

- **#511** — Critical: `<omniModel>` tag was sent after `finish_reason:stop` in SSE streams, causing data loss. Tag is now injected into the first non-empty content chunk, guaranteeing delivery before SDKs close the connection.

### Merged PRs

- **PR #512** (@zhangqiang8vip): Per-protocol model compatibility — `normalizeToolCallId` and `preserveOpenAIDeveloperRole` can now be configured per client protocol (OpenAI, Claude, Responses API). New `compatByProtocol` field in model config with Zod validation.

### Triaged Issues

- **#510** — Windows CLI healthcheck_failed: requested PATH/version info
- **#509** — Turbopack Electron regression: upstream Next.js bug, documented workarounds
- **#508** — macOS black screen: suggested `--disable-gpu` workaround

---

## [2.9.0] — 2026-03-20

> Sprint: Cross-platform machineId fix, per-API-key rate limits, streaming context cache, Alibaba DashScope, search analytics, ZWS v5, and 8 issues closed.

### ✨ New Features

- **feat(providers):** Implement Image Generation and Editing capabilities for ChatGPT Web, including in-band chat image generation and caching (#1606).
- **feat(ui):** Integrate OpenCode Zen/Go API tool logo SVG and polish API key copy-to-clipboard interactions (#1607).

- **feat(providers):** Integrate AgentRouter as a new OpenAI-compatible passthrough provider with $200 free credits via sign-up (Issue #1572).
- **feat(ui):** Implement on-demand per-model testing in the provider dashboard, allowing single-token diagnostic checks without triggering rate-limits (Issue #1532).

- **feat(search)**: Search Analytics tab in `/dashboard/analytics` — provider breakdown, cache hit rate, cost tracking. New API: `GET /api/v1/search/analytics` (#feat/search-provider-routing)
- **feat(provider)**: Alibaba Cloud DashScope added with custom endpoint path validation — configurable `chatPath` and `modelsPath` per node (#feat/custom-endpoint-paths)
- **feat(api)**: Per-API-key request-count limits — `max_requests_per_day` and `max_requests_per_minute` columns with in-memory sliding-window enforcement returning HTTP 429 (#452)
- **feat(dev)**: ZWS v5 — HMR leak fix (485 DB connections → 1), memory 2.4GB → 195MB, `globalThis` singletons, Edge Runtime warning fix (@zhangqiang8vip)

### 🐛 Bug Fixes

- **fix(mitm):** Compile MITM utilities as NodeNext ESM during prepublish, copy the CommonJS MITM server into the standalone artifact, and resolve MITM data paths without relying on Next.js aliases in packaged runtime.
- **fix(build):** Move the local `.tmp/wine32` Wine prefix out of the isolated Next.js build path so Windows Electron packaging artifacts cannot trigger `EACCES` scans during Node 24 builds.
- **fix(build):** Copy the `wreq-js` native runtime directory into the isolated Next.js standalone output so packaged Playwright/E2E starts can load the instrumentation hook on Linux.
- **fix(api):** Validate the Codex Responses websocket bridge and `/v1/batches` JSON payloads with Zod before use, keeping `request.json()` route validation green and returning explicit 400 responses for invalid bodies.
- **fix(providers):** Add explicit typing to provider alias and category helpers so the strict `typecheck:noimplicit:core` CI gate passes.
- **fix(ui):** Keep the upstream proxy provider detail page labeled with a fallback "Managed via Upstream Proxy Settings" management surface when translations are unavailable.
- **fix(electron):** Harden the production desktop CSP by removing `unsafe-eval` outside development and adding object, base URI, form action, frame ancestor, and worker restrictions.
- **fix(cli):** Replace shell-interpolated setup and privileged command execution paths with argument-based `spawn`/`execFile` helpers for database setup, Tailscale sudo commands, MITM DNS edits, and certificate install/uninstall flows.
- **fix(ui):** Keep provider icons resilient by using direct `@lobehub/icons` components first, then local PNG/SVG fallbacks, avoiding the `@lobehub/ui` peer runtime in the dashboard.

- **fix(#506)**: Cross-platform `machineId` — `getMachineIdRaw()` rewritten with try/catch waterfall (Windows REG.exe → macOS ioreg → Linux file read → hostname → `os.hostname()`). Eliminates `process.platform` branching that Next.js bundler dead-code-eliminated, fixing `'head' is not recognized` on Windows. Also fixes #466.
- **fix(#493)**: Custom provider model naming — removed incorrect prefix stripping in `DefaultExecutor.transformRequest()` that mangled org-scoped model IDs like `zai-org/GLM-5-FP8`.
- **fix(#490)**: Streaming + context cache protection — `TransformStream` intercepts SSE to inject `<omniModel>` tag before `[DONE]` marker, enabling context cache protection for streaming responses.
- **fix(#458)**: Combo schema validation — `system_message`, `tool_filter_regex`, `context_cache_protection` fields now pass Zod validation on save.
- **fix(#487)**: KIRO MITM card cleanup — removed ZWS_README, generified `AntigravityToolCard` to use dynamic tool metadata.

### 🧪 Tests

- Added Anthropic-format tools filter unit tests (PR #397) — 8 regression tests for `tool.name` without `.function` wrapper
- Test suite: **821 tests, 0 failures** (up from 813)

### 📋 Issues Closed (8)

- **#506** — Windows machineId `head` not recognized (fixed)
- **#493** — Custom provider model naming (fixed)
- **#490** — Streaming context cache (fixed)
- **#452** — Per-API-key request limits (implemented)
- **#466** — Windows login failure (same root cause as #506)
- **#504** — MITM inactive (expected behavior)
- **#462** — Gemini CLI PSA (resolved)
- **#434** — Electron app crash (duplicate of #402)

## [2.8.9] — 2026-03-20

> Sprint: Merge community PRs, fix KIRO MITM card, dependency updates.

### Merged PRs

- **PR #498** (@Sajid11194): Fix Windows machine ID crash (`undefined\REG.exe`). Replaces `node-machine-id` with native OS registry queries. **Closes #486.**
- **PR #497** (@zhangqiang8vip): Fix dev-mode HMR resource leaks — 485 leaked DB connections → 1, memory 2.4GB → 195MB. `globalThis` singletons, Edge Runtime warning fix, Windows test stability. (+1168/-338 across 22 files)
- **PRs #499-503** (Dependabot): GitHub Actions updates — `docker/build-push-action@7`, `actions/checkout@6`, `peter-evans/dockerhub-description@5`, `docker/setup-qemu-action@4`, `docker/login-action@4`.

### Bug Fixes

- **#505** — KIRO MITM card now displays tool-specific instructions (`api.anthropic.com`) instead of Antigravity-specific text.
- **#504** — Responded with UX clarification (MITM "Inactive" is expected behavior when proxy is not running).

---

## [2.8.8] — 2026-03-20

> Sprint: Fix OAuth batch test crash, add "Test All" button to individual provider pages.

### Bug Fixes

- **OAuth batch test crash** (ERR_CONNECTION_REFUSED): Replaced sequential for-loop with 5-connection concurrency limit + 30s per-connection timeout via `Promise.race()` + `Promise.allSettled()`. Prevents server crash when testing large OAuth provider groups (~30+ connections).

### Funktionen

- **"Test All" button on provider pages**: Individual provider pages (e.g., `/providers/codex`) now show a "Test All" button in the Connections header when there are 2+ connections. Uses `POST /api/providers/test-batch` with `{mode: "provider", providerId}`. Results displayed in a modal with pass/fail summary and per-connection diagnosis.

---

## [2.8.7] — 2026-03-20

> Sprint: Merge PR #495 (Bottleneck 429 drop), fix #496 (custom embedding providers), triage features.

### Bug Fixes

- **Bottleneck 429 infinite wait** (PR #495 by @xandr0s): On 429, `limiter.stop({ dropWaitingJobs: true })` immediately fails all queued requests so upstream callers can trigger fallback. Limiter is deleted from Map so next request creates a fresh instance.
- **Custom embedding models unresolvable** (#496): `POST /v1/embeddings` now resolves custom embedding models from ALL provider_nodes (not just localhost). Enables models like `google/gemini-embedding-001` added via dashboard.

### Issues Responded

- **#452** — Per-API-key request-count limits (acknowledged, on roadmap)
- **#464** — Auto-issue API keys with provider/account limits (needs more detail)
- **#488** — Auto-update model lists (acknowledged, on roadmap)
- **#496** — Custom embedding provider resolution (fixed)

---

## [2.8.6] — 2026-03-20

> Sprint: Merge PR #494 (MiniMax role fix), fix KIRO MITM dashboard, triage 8 issues.

### Funktionen

- **MiniMax developer→system role fix** (PR #494 by @zhangqiang8vip): Per-model `preserveDeveloperRole` toggle. Adds "Compatibility" UI in providers page. Fixes 422 "role param error" for MiniMax and similar gateways.
- **roleNormalizer**: `normalizeDeveloperRole()` now accepts `preserveDeveloperRole` parameter with tri-state behavior (undefined=keep, true=keep, false=convert).
- **DB**: New `getModelPreserveOpenAIDeveloperRole()` and `mergeModelCompatOverride()` in `models.ts`.

### Bug Fixes

- **KIRO MITM dashboard** (#481/#487): `CLIToolsPageClient` now routes any `configType: "mitm"` tool to `AntigravityToolCard` (MITM Start/Stop controls). Previously only Antigravity was hardcoded.
- **AntigravityToolCard generic**: Uses `tool.image`, `tool.description`, `tool.id` instead of hardcoded Antigravity values. Guards against missing `defaultModels`.

### Cleanup

- Removed `ZWS_README_V2.md` (development-only docs from PR #494).

### Issues Triaged (8)

- **#487** — Closed (KIRO MITM fixed in this release)
- **#486** — needs-info (Windows REG.exe PATH issue)
- **#489** — needs-info (Antigravity projectId missing, OAuth reconnect needed)
- **#492** — needs-info (missing app/server.js on mise-managed Node)
- **#490** — Acknowledged (streaming + context cache blocking, fix planned)
- **#491** — Acknowledged (Codex auth state inconsistency)
- **#493** — Acknowledged (Modal provider model name prefix, workaround provided)
- **#488** — Feature request backlog (auto-update model lists)

---

## [2.8.5] — 2026-03-19

> Sprint: Fix zombie SSE streams, context cache first-turn, KIRO MITM, and triage 5 external issues.

### Bug Fixes

- **Zombie SSE Streams** (#473): Reduce `STREAM_IDLE_TIMEOUT_MS` from 300s → 120s for faster combo fallback when providers hang mid-stream. Configurable via env var.
- **Context Cache Tag** (#474): Fix `injectModelTag()` to handle first-turn requests (no assistant messages) — context cache protection now works from the very first response.
- **KIRO MITM** (#481): Change KIRO `configType` from `guide` → `mitm` so the dashboard renders MITM Start/Stop controls.
- **E2E Test** (CI): Fix `providers-bailian-coding-plan.spec.ts` — dismiss pre-existing modal overlay before clicking Add API Key button.

### Closed Issues

- #473 — Zombie SSE streams bypass combo fallback
- #474 — Context cache `<omniModel>` tag missing on first turn
- #481 — MITM for KIRO not activatable from dashboard
- #468 — Gemini CLI remote server (superseded by #462 deprecation)
- #438 — Claude unable to write files (external CLI issue)
- #439 — AppImage doesn't work (documented libfuse2 workaround)
- #402 — ARM64 DMG "damaged" (documented xattr -cr workaround)
- #460 — CLI not runnable on Windows (documented PATH fix)

---

## [2.8.4] — 2026-03-19

> Sprint: Gemini CLI deprecation, VM guide i18n fix, dependabot security fix, provider schema expansion.

### Funktionen

- **Gemini CLI Deprecation** (#462): Mark `gemini-cli` provider as deprecated with warning — Google restricts third-party OAuth usage from March 2026
- **Provider Schema** (#462): Expand Zod validation with `deprecated`, `deprecationReason`, `hasFree`, `freeNote`, `authHint`, `apiHint` optional fields

### Bug Fixes

- **VM Guide i18n** (#471): Add `VM_DEPLOYMENT_GUIDE.md` to i18n translation pipeline, regenerate all 30 locale translations from English source (were stuck in Portuguese)

### Sicherheit

- **deps**: Bump `flatted` 3.3.3 → 3.4.2 — fixes CWE-1321 prototype pollution (#484, @dependabot)

### Closed Issues

- #472 — Model Aliases regression (fixed in v2.8.2)
- #471 — VM guide translations broken
- #483 — Trailing `data: null` after `[DONE]` (fixed in v2.8.3)

### Merged PRs

- #484 — deps: bump flatted from 3.3.3 to 3.4.2 (@dependabot)

---

## [2.8.3] — 2026-03-19

> Sprint: Czech i18n, SSE protocol fix, VM guide translation.

### Funktionen

- **Czech Language** (#482): Full Czech (cs) i18n — 22 docs, 2606 UI strings, language switcher updates (@zen0bit)
- **VM Deployment Guide**: Translated from Portuguese to English as the source document (@zen0bit)

### Bug Fixes

- **SSE Protocol** (#483): Stop sending trailing `data: null` after `[DONE]` signal — fixes `AI_TypeValidationError` in strict AI SDK clients (Zod-based validators)

### Merged PRs

- #482 — Add Czech language + Fix VM_DEPLOYMENT_GUIDE.md English source (@zen0bit)

---

## [2.8.2] — 2026-03-19

> Sprint: 2 merged PRs, model aliases routing fix, log export, and issue triage.

### Funktionen

- **Log Export**: New Export button on `/dashboard/logs` with time range dropdown (1h, 6h, 12h, 24h). Downloads JSON of request/proxy/call logs via `/api/logs/export` API (#user-request)

### Bug Fixes

- **Model Aliases Routing** (#472): Settings → Model Aliases now correctly affect provider routing, not just format detection. Previously `resolveModelAlias()` output was only used for `getModelTargetFormat()` but the original model ID was sent to the provider
- **Stream Flush Usage** (#480): Usage data from the last SSE event in the buffer is now correctly extracted during stream flush (merged from @prakersh)

### Merged PRs

- #480 — Extract usage from remaining buffer in flush handler (@prakersh)
- #479 — Add missing Codex 5.3/5.4 and Anthropic model ID pricing entries (@prakersh)

---

## [2.8.1] — 2026-03-19

> Sprint: Five community PRs — streaming call log fixes, Kiro compatibility, cache token analytics, Chinese translation, and configurable tool call IDs.

### Funktionen

- **feat(logs)**: Call log response content now correctly accumulated from raw provider chunks (OpenAI/Claude/Gemini) before translation, fixing empty response payloads in streaming mode (#470, @zhangqiang8vip)
- **feat(providers)**: Per-model configurable 9-char tool call ID normalization (Mistral-style) — only models with the option enabled get truncated IDs (#470)
- **feat(api)**: Key PATCH API expanded to support `allowedConnections`, `name`, `autoResolve`, `isActive`, and `accessSchedule` fields (#470)
- **feat(dashboard)**: Response-first layout in request log detail UI (#470)
- **feat(i18n)**: Improved Chinese (zh-CN) translation — complete retranslation (#475, @only4copilot)

### 🐛 Bug Fixes

- **fix(mitm):** Compile MITM utilities as NodeNext ESM during prepublish, copy the CommonJS MITM server into the standalone artifact, and resolve MITM data paths without relying on Next.js aliases in packaged runtime.
- **fix(build):** Move the local `.tmp/wine32` Wine prefix out of the isolated Next.js build path so Windows Electron packaging artifacts cannot trigger `EACCES` scans during Node 24 builds.
- **fix(build):** Copy the `wreq-js` native runtime directory into the isolated Next.js standalone output so packaged Playwright/E2E starts can load the instrumentation hook on Linux.
- **fix(api):** Validate the Codex Responses websocket bridge and `/v1/batches` JSON payloads with Zod before use, keeping `request.json()` route validation green and returning explicit 400 responses for invalid bodies.
- **fix(providers):** Add explicit typing to provider alias and category helpers so the strict `typecheck:noimplicit:core` CI gate passes.
- **fix(ui):** Keep the upstream proxy provider detail page labeled with a fallback "Managed via Upstream Proxy Settings" management surface when translations are unavailable.
- **fix(electron):** Harden the production desktop CSP by removing `unsafe-eval` outside development and adding object, base URI, form action, frame ancestor, and worker restrictions.
- **fix(cli):** Replace shell-interpolated setup and privileged command execution paths with argument-based `spawn`/`execFile` helpers for database setup, Tailscale sudo commands, MITM DNS edits, and certificate install/uninstall flows.
- **fix(ui):** Keep provider icons resilient by using direct `@lobehub/icons` components first, then local PNG/SVG fallbacks, avoiding the `@lobehub/ui` peer runtime in the dashboard.

- **fix(kiro)**: Strip injected `model` field from request body — Kiro API rejects unknown top-level fields (#478, @prakersh)
- **fix(usage)**: Include cache read + cache creation tokens in usage history input totals for accurate analytics (#477, @prakersh)
- **fix(callLogs)**: Support Claude format usage fields (`input_tokens`/`output_tokens`) alongside OpenAI format, include all cache token variants (#476, @prakersh)

---

## [2.8.0] — 2026-03-19

> Sprint: Bailian Coding Plan provider with editable base URLs, plus community contributions for Alibaba Cloud and Kimi Coding.

### Funktionen

- **feat(providers)**: Added Bailian Coding Plan (`bailian-coding-plan`) — Alibaba Model Studio with Anthropic-compatible API. Static catalog of 8 models including Qwen3.5 Plus, Qwen3 Coder, MiniMax M2.5, GLM 5, and Kimi K2.5. Includes custom auth validation (400=valid, 401/403=invalid) (#467, @Mind-Dragon)
- **feat(admin)**: Editable default URL in Provider Admin create/edit flows — users can configure custom base URLs per connection. Persisted in `providerSpecificData.baseUrl` with Zod schema validation rejecting non-http(s) schemes (#467)

### 🧪 Tests

- Added 30+ unit tests and 2 e2e scenarios for Bailian Coding Plan provider covering auth validation, schema hardening, route-level behavior, and cross-layer integration

---

## [2.7.10] — 2026-03-19

> Sprint: Two new community-contributed providers (Alibaba Cloud Coding, Kimi Coding API-key) and Docker pino fix.

### Funktionen

- **feat(providers)**: Added Alibaba Cloud Coding Plan support with two OpenAI-compatible endpoints — `alicode` (China) and `alicode-intl` (International), each with 8 models (#465, @dtk1985)
- **feat(providers)**: Added dedicated `kimi-coding-apikey` provider path — API-key-based Kimi Coding access is no longer forced through OAuth-only `kimi-coding` route. Includes registry, constants, models API, config, and validation test (#463, @Mind-Dragon)

### 🐛 Bug Fixes

- **fix(mitm):** Compile MITM utilities as NodeNext ESM during prepublish, copy the CommonJS MITM server into the standalone artifact, and resolve MITM data paths without relying on Next.js aliases in packaged runtime.
- **fix(build):** Move the local `.tmp/wine32` Wine prefix out of the isolated Next.js build path so Windows Electron packaging artifacts cannot trigger `EACCES` scans during Node 24 builds.
- **fix(build):** Copy the `wreq-js` native runtime directory into the isolated Next.js standalone output so packaged Playwright/E2E starts can load the instrumentation hook on Linux.
- **fix(api):** Validate the Codex Responses websocket bridge and `/v1/batches` JSON payloads with Zod before use, keeping `request.json()` route validation green and returning explicit 400 responses for invalid bodies.
- **fix(providers):** Add explicit typing to provider alias and category helpers so the strict `typecheck:noimplicit:core` CI gate passes.
- **fix(ui):** Keep the upstream proxy provider detail page labeled with a fallback "Managed via Upstream Proxy Settings" management surface when translations are unavailable.
- **fix(electron):** Harden the production desktop CSP by removing `unsafe-eval` outside development and adding object, base URI, form action, frame ancestor, and worker restrictions.
- **fix(cli):** Replace shell-interpolated setup and privileged command execution paths with argument-based `spawn`/`execFile` helpers for database setup, Tailscale sudo commands, MITM DNS edits, and certificate install/uninstall flows.
- **fix(ui):** Keep provider icons resilient by using direct `@lobehub/icons` components first, then local PNG/SVG fallbacks, avoiding the `@lobehub/ui` peer runtime in the dashboard.

- **fix(docker)**: Added missing `split2` dependency to Docker image — `pino-abstract-transport` requires it at runtime but it was not being copied into the standalone container, causing `Cannot find module 'split2'` crashes (#459)

---

## [2.7.9] — 2026-03-18

> Sprint: Codex responses subpath passthrough natively supported, Windows MITM crash fixed, and Combos agent schemas adjusted.

### Funktionen

- **feat(codex)**: Native responses subpath passthrough for Codex — natively routes `POST /v1/responses/compact` to Codex upstream, maintaining Claude Code compatibility without stripping the `/compact` suffix (#457)

### 🐛 Bug Fixes

- **fix(mitm):** Compile MITM utilities as NodeNext ESM during prepublish, copy the CommonJS MITM server into the standalone artifact, and resolve MITM data paths without relying on Next.js aliases in packaged runtime.
- **fix(build):** Move the local `.tmp/wine32` Wine prefix out of the isolated Next.js build path so Windows Electron packaging artifacts cannot trigger `EACCES` scans during Node 24 builds.
- **fix(build):** Copy the `wreq-js` native runtime directory into the isolated Next.js standalone output so packaged Playwright/E2E starts can load the instrumentation hook on Linux.
- **fix(api):** Validate the Codex Responses websocket bridge and `/v1/batches` JSON payloads with Zod before use, keeping `request.json()` route validation green and returning explicit 400 responses for invalid bodies.
- **fix(providers):** Add explicit typing to provider alias and category helpers so the strict `typecheck:noimplicit:core` CI gate passes.
- **fix(ui):** Keep the upstream proxy provider detail page labeled with a fallback "Managed via Upstream Proxy Settings" management surface when translations are unavailable.
- **fix(electron):** Harden the production desktop CSP by removing `unsafe-eval` outside development and adding object, base URI, form action, frame ancestor, and worker restrictions.
- **fix(cli):** Replace shell-interpolated setup and privileged command execution paths with argument-based `spawn`/`execFile` helpers for database setup, Tailscale sudo commands, MITM DNS edits, and certificate install/uninstall flows.
- **fix(ui):** Keep provider icons resilient by using direct `@lobehub/icons` components first, then local PNG/SVG fallbacks, avoiding the `@lobehub/ui` peer runtime in the dashboard.

- **fix(combos)**: Zod schemas (`updateComboSchema` and `createComboSchema`) now include `system_message`, `tool_filter_regex`, and `context_cache_protection`. Fixes bug where agent-specific settings created via the dashboard were silently discarded by the backend validation layer (#458)
- **fix(mitm)**: Kiro MITM profile crash on Windows fixed — `node-machine-id` failed due to missing `REG.exe` env, and the fallback threw a fatal `crypto is not defined` error. Fallback now safely and correctly imports crypto (#456)

---

## [2.7.8] — 2026-03-18

> Sprint: Budget save bug + combo agent features UI + omniModel tag security fix.

### 🐛 Bug Fixes

- **fix(mitm):** Compile MITM utilities as NodeNext ESM during prepublish, copy the CommonJS MITM server into the standalone artifact, and resolve MITM data paths without relying on Next.js aliases in packaged runtime.
- **fix(build):** Move the local `.tmp/wine32` Wine prefix out of the isolated Next.js build path so Windows Electron packaging artifacts cannot trigger `EACCES` scans during Node 24 builds.
- **fix(build):** Copy the `wreq-js` native runtime directory into the isolated Next.js standalone output so packaged Playwright/E2E starts can load the instrumentation hook on Linux.
- **fix(api):** Validate the Codex Responses websocket bridge and `/v1/batches` JSON payloads with Zod before use, keeping `request.json()` route validation green and returning explicit 400 responses for invalid bodies.
- **fix(providers):** Add explicit typing to provider alias and category helpers so the strict `typecheck:noimplicit:core` CI gate passes.
- **fix(ui):** Keep the upstream proxy provider detail page labeled with a fallback "Managed via Upstream Proxy Settings" management surface when translations are unavailable.
- **fix(electron):** Harden the production desktop CSP by removing `unsafe-eval` outside development and adding object, base URI, form action, frame ancestor, and worker restrictions.
- **fix(cli):** Replace shell-interpolated setup and privileged command execution paths with argument-based `spawn`/`execFile` helpers for database setup, Tailscale sudo commands, MITM DNS edits, and certificate install/uninstall flows.
- **fix(ui):** Keep provider icons resilient by using direct `@lobehub/icons` components first, then local PNG/SVG fallbacks, avoiding the `@lobehub/ui` peer runtime in the dashboard.

- **fix(budget)**: "Save Limits" no longer returns 422 — `warningThreshold` is now correctly sent as fraction (0–1) instead of percentage (0–100) (#451)
- **fix(combos)**: `<omniModel>` internal cache tag is now stripped before forwarding requests to providers, preventing cache session breaks (#454)

### Funktionen

- **feat(combos)**: Agent Features section added to combo create/edit modal — expose `system_message` override, `tool_filter_regex`, and `context_cache_protection` directly from the dashboard (#454)

---

## [2.7.7] — 2026-03-18

> Sprint: Docker pino crash, Codex CLI responses worker fix, package-lock sync.

### 🐛 Bug Fixes

- **fix(mitm):** Compile MITM utilities as NodeNext ESM during prepublish, copy the CommonJS MITM server into the standalone artifact, and resolve MITM data paths without relying on Next.js aliases in packaged runtime.
- **fix(build):** Move the local `.tmp/wine32` Wine prefix out of the isolated Next.js build path so Windows Electron packaging artifacts cannot trigger `EACCES` scans during Node 24 builds.
- **fix(build):** Copy the `wreq-js` native runtime directory into the isolated Next.js standalone output so packaged Playwright/E2E starts can load the instrumentation hook on Linux.
- **fix(api):** Validate the Codex Responses websocket bridge and `/v1/batches` JSON payloads with Zod before use, keeping `request.json()` route validation green and returning explicit 400 responses for invalid bodies.
- **fix(providers):** Add explicit typing to provider alias and category helpers so the strict `typecheck:noimplicit:core` CI gate passes.
- **fix(ui):** Keep the upstream proxy provider detail page labeled with a fallback "Managed via Upstream Proxy Settings" management surface when translations are unavailable.
- **fix(electron):** Harden the production desktop CSP by removing `unsafe-eval` outside development and adding object, base URI, form action, frame ancestor, and worker restrictions.
- **fix(cli):** Replace shell-interpolated setup and privileged command execution paths with argument-based `spawn`/`execFile` helpers for database setup, Tailscale sudo commands, MITM DNS edits, and certificate install/uninstall flows.
- **fix(ui):** Keep provider icons resilient by using direct `@lobehub/icons` components first, then local PNG/SVG fallbacks, avoiding the `@lobehub/ui` peer runtime in the dashboard.

- **fix(docker)**: `pino-abstract-transport` and `pino-pretty` now explicitly copied in Docker runner stage — Next.js standalone trace misses these peer deps, causing `Cannot find module pino-abstract-transport` crash on startup (#449)
- **fix(responses)**: Remove `initTranslators()` from `/v1/responses` route — was crashing Next.js worker with `the worker has exited` uncaughtException on Codex CLI requests (#450)

### 🔧 Maintenance

- **chore(deps)**: `package-lock.json` now committed on every version bump to ensure Docker `npm ci` uses exact dependency versions

---

## [2.7.5] — 2026-03-18

> Sprint: UX improvements and Windows CLI healthcheck fix.

### 🐛 Bug Fixes

- **fix(mitm):** Compile MITM utilities as NodeNext ESM during prepublish, copy the CommonJS MITM server into the standalone artifact, and resolve MITM data paths without relying on Next.js aliases in packaged runtime.
- **fix(build):** Move the local `.tmp/wine32` Wine prefix out of the isolated Next.js build path so Windows Electron packaging artifacts cannot trigger `EACCES` scans during Node 24 builds.
- **fix(build):** Copy the `wreq-js` native runtime directory into the isolated Next.js standalone output so packaged Playwright/E2E starts can load the instrumentation hook on Linux.
- **fix(api):** Validate the Codex Responses websocket bridge and `/v1/batches` JSON payloads with Zod before use, keeping `request.json()` route validation green and returning explicit 400 responses for invalid bodies.
- **fix(providers):** Add explicit typing to provider alias and category helpers so the strict `typecheck:noimplicit:core` CI gate passes.
- **fix(ui):** Keep the upstream proxy provider detail page labeled with a fallback "Managed via Upstream Proxy Settings" management surface when translations are unavailable.
- **fix(electron):** Harden the production desktop CSP by removing `unsafe-eval` outside development and adding object, base URI, form action, frame ancestor, and worker restrictions.
- **fix(cli):** Replace shell-interpolated setup and privileged command execution paths with argument-based `spawn`/`execFile` helpers for database setup, Tailscale sudo commands, MITM DNS edits, and certificate install/uninstall flows.
- **fix(ui):** Keep provider icons resilient by using direct `@lobehub/icons` components first, then local PNG/SVG fallbacks, avoiding the `@lobehub/ui` peer runtime in the dashboard.

- **fix(ux)**: Show default password hint on login page — new users now see `"Default password: 123456"` below the password input (#437)
- **fix(cli)**: Claude CLI and other npm-installed tools now correctly detected as runnable on Windows — spawn uses `shell:true` to resolve `.cmd` wrappers via PATHEXT (#447)

---

## [2.7.4] — 2026-03-18

> Sprint: Search Tools dashboard, i18n fixes, Copilot limits, Serper validation fix.

### Funktionen

- **feat(search)**: Add Search Playground (10th endpoint), Search Tools page with Compare Providers/Rerank Pipeline/Search History, local rerank routing, auth guards on search API (#443 by @Regis-RCR)
  - New route: `/dashboard/search-tools`
  - Sidebar entry under Debug section
  - `GET /api/search/providers` and `GET /api/search/stats` with auth guards
  - Local provider_nodes routing for `/v1/rerank`
  - 30+ i18n keys in search namespace

### 🐛 Bug Fixes

- **fix(mitm):** Compile MITM utilities as NodeNext ESM during prepublish, copy the CommonJS MITM server into the standalone artifact, and resolve MITM data paths without relying on Next.js aliases in packaged runtime.
- **fix(build):** Move the local `.tmp/wine32` Wine prefix out of the isolated Next.js build path so Windows Electron packaging artifacts cannot trigger `EACCES` scans during Node 24 builds.
- **fix(build):** Copy the `wreq-js` native runtime directory into the isolated Next.js standalone output so packaged Playwright/E2E starts can load the instrumentation hook on Linux.
- **fix(api):** Validate the Codex Responses websocket bridge and `/v1/batches` JSON payloads with Zod before use, keeping `request.json()` route validation green and returning explicit 400 responses for invalid bodies.
- **fix(providers):** Add explicit typing to provider alias and category helpers so the strict `typecheck:noimplicit:core` CI gate passes.
- **fix(ui):** Keep the upstream proxy provider detail page labeled with a fallback "Managed via Upstream Proxy Settings" management surface when translations are unavailable.
- **fix(electron):** Harden the production desktop CSP by removing `unsafe-eval` outside development and adding object, base URI, form action, frame ancestor, and worker restrictions.
- **fix(cli):** Replace shell-interpolated setup and privileged command execution paths with argument-based `spawn`/`execFile` helpers for database setup, Tailscale sudo commands, MITM DNS edits, and certificate install/uninstall flows.
- **fix(ui):** Keep provider icons resilient by using direct `@lobehub/icons` components first, then local PNG/SVG fallbacks, avoiding the `@lobehub/ui` peer runtime in the dashboard.

- **fix(search)**: Fix Brave news normalizer (was returning 0 results), enforce max_results truncation post-normalization, fix Endpoints page fetch URL (#443 by @Regis-RCR)
- **fix(analytics)**: Localize analytics day/date labels — replace hardcoded Portuguese strings with `Intl.DateTimeFormat(locale)` (#444 by @hijak)
- **fix(copilot)**: Correct GitHub Copilot account type display, filter misleading unlimited quota rows from limits dashboard (#445 by @hijak)
- **fix(providers)**: Stop rejecting valid Serper API keys — treat non-4xx responses as valid authentication (#446 by @hijak)

---

## [2.7.3] — 2026-03-18

> Sprint: Codex direct API quota fallback fix.

### 🐛 Bug Fixes

- **fix(mitm):** Compile MITM utilities as NodeNext ESM during prepublish, copy the CommonJS MITM server into the standalone artifact, and resolve MITM data paths without relying on Next.js aliases in packaged runtime.
- **fix(build):** Move the local `.tmp/wine32` Wine prefix out of the isolated Next.js build path so Windows Electron packaging artifacts cannot trigger `EACCES` scans during Node 24 builds.
- **fix(build):** Copy the `wreq-js` native runtime directory into the isolated Next.js standalone output so packaged Playwright/E2E starts can load the instrumentation hook on Linux.
- **fix(api):** Validate the Codex Responses websocket bridge and `/v1/batches` JSON payloads with Zod before use, keeping `request.json()` route validation green and returning explicit 400 responses for invalid bodies.
- **fix(providers):** Add explicit typing to provider alias and category helpers so the strict `typecheck:noimplicit:core` CI gate passes.
- **fix(ui):** Keep the upstream proxy provider detail page labeled with a fallback "Managed via Upstream Proxy Settings" management surface when translations are unavailable.
- **fix(electron):** Harden the production desktop CSP by removing `unsafe-eval` outside development and adding object, base URI, form action, frame ancestor, and worker restrictions.
- **fix(cli):** Replace shell-interpolated setup and privileged command execution paths with argument-based `spawn`/`execFile` helpers for database setup, Tailscale sudo commands, MITM DNS edits, and certificate install/uninstall flows.
- **fix(ui):** Keep provider icons resilient by using direct `@lobehub/icons` components first, then local PNG/SVG fallbacks, avoiding the `@lobehub/ui` peer runtime in the dashboard.

- **fix(codex)**: Block weekly-exhausted accounts in direct API fallback (#440)
  - `resolveQuotaWindow()` prefix matching: `"weekly"` now matches `"weekly (7d)"` cache keys
  - `applyCodexWindowPolicy()` enforces `useWeekly`/`use5h` toggles correctly
  - 4 new regression tests (766 total)

---

## [2.7.2] — 2026-03-18

> Sprint: Light mode UI contrast fixes.

### 🐛 Bug Fixes

- **fix(mitm):** Compile MITM utilities as NodeNext ESM during prepublish, copy the CommonJS MITM server into the standalone artifact, and resolve MITM data paths without relying on Next.js aliases in packaged runtime.
- **fix(build):** Move the local `.tmp/wine32` Wine prefix out of the isolated Next.js build path so Windows Electron packaging artifacts cannot trigger `EACCES` scans during Node 24 builds.
- **fix(build):** Copy the `wreq-js` native runtime directory into the isolated Next.js standalone output so packaged Playwright/E2E starts can load the instrumentation hook on Linux.
- **fix(api):** Validate the Codex Responses websocket bridge and `/v1/batches` JSON payloads with Zod before use, keeping `request.json()` route validation green and returning explicit 400 responses for invalid bodies.
- **fix(providers):** Add explicit typing to provider alias and category helpers so the strict `typecheck:noimplicit:core` CI gate passes.
- **fix(ui):** Keep the upstream proxy provider detail page labeled with a fallback "Managed via Upstream Proxy Settings" management surface when translations are unavailable.
- **fix(electron):** Harden the production desktop CSP by removing `unsafe-eval` outside development and adding object, base URI, form action, frame ancestor, and worker restrictions.
- **fix(cli):** Replace shell-interpolated setup and privileged command execution paths with argument-based `spawn`/`execFile` helpers for database setup, Tailscale sudo commands, MITM DNS edits, and certificate install/uninstall flows.
- **fix(ui):** Keep provider icons resilient by using direct `@lobehub/icons` components first, then local PNG/SVG fallbacks, avoiding the `@lobehub/ui` peer runtime in the dashboard.

- **fix(logs)**: Fix light mode contrast in request logs filter buttons and combo badge (#378)
  - Error/Success/Combo filter buttons now readable in light mode
  - Combo row badge uses stronger violet in light mode

---

## [2.7.1] — 2026-03-17

> Sprint: Unified web search routing (POST /v1/search) with 5 providers + Next.js 16.1.7 security fixes (6 CVEs).

### ✨ New Features

- **feat(providers):** Implement Image Generation and Editing capabilities for ChatGPT Web, including in-band chat image generation and caching (#1606).
- **feat(ui):** Integrate OpenCode Zen/Go API tool logo SVG and polish API key copy-to-clipboard interactions (#1607).

- **feat(providers):** Integrate AgentRouter as a new OpenAI-compatible passthrough provider with $200 free credits via sign-up (Issue #1572).
- **feat(ui):** Implement on-demand per-model testing in the provider dashboard, allowing single-token diagnostic checks without triggering rate-limits (Issue #1532).

- **feat(search)**: Unified web search routing — `POST /v1/search` with 5 providers (Serper, Brave, Perplexity, Exa, Tavily)
  - Auto-failover across providers, 6,500+ free searches/month
  - In-memory cache with request coalescing (configurable TTL)
  - Dashboard: Search Analytics tab in `/dashboard/analytics` with provider breakdown, cache hit rate, cost tracking
  - New API: `GET /api/v1/search/analytics` for search request statistics
  - DB migration: `request_type` column on `call_logs` for non-chat request tracking
  - Zod validation (`v1SearchSchema`), auth-gated, cost recorded via `recordCost()`

### Sicherheit

- **deps**: Next.js 16.1.6 → 16.1.7 — fixes 6 CVEs:
  - **Critical**: CVE-2026-29057 (HTTP request smuggling via http-proxy)
  - **High**: CVE-2026-27977, CVE-2026-27978 (WebSocket + Server Actions)
  - **Medium**: CVE-2026-27979, CVE-2026-27980, CVE-2026-jcc7

### 📁 New Files

| File                                                             | Purpose                                    |
| ---------------------------------------------------------------- | ------------------------------------------ |
| `open-sse/handlers/search.ts`                                    | Search handler with 5-provider routing     |
| `open-sse/config/searchRegistry.ts`                              | Provider registry (auth, cost, quota, TTL) |
| `open-sse/services/searchCache.ts`                               | In-memory cache with request coalescing    |
| `src/app/api/v1/search/route.ts`                                 | Next.js route (POST + GET)                 |
| `src/app/api/v1/search/analytics/route.ts`                       | Search stats API                           |
| `src/app/(dashboard)/dashboard/analytics/SearchAnalyticsTab.tsx` | Analytics dashboard tab                    |
| `src/lib/db/migrations/007_search_request_type.sql`              | DB migration                               |
| `tests/unit/search-registry.test.mjs`                            | 277 lines of unit tests                    |

---

## [2.7.0] — 2026-03-17

> Sprint: ClawRouter-inspired features — toolCalling flag, multilingual intent detection, benchmark-driven fallback, request deduplication, pluggable RouterStrategy, Grok-4 Fast + GLM-5 + MiniMax M2.5 + Kimi K2.5 pricing.

### ✨ New Models & Pricing

- **feat(pricing)**: xAI Grok-4 Fast — `$0.20/$0.50 per 1M tokens`, 1143ms p50 latency, tool calling supported
- **feat(pricing)**: xAI Grok-4 (standard) — `$0.20/$1.50 per 1M tokens`, reasoning flagship
- **feat(pricing)**: GLM-5 via Z.AI — `$0.5/1M`, 128K output context
- **feat(pricing)**: MiniMax M2.5 — `$0.30/1M input`, reasoning + agentic tasks
- **feat(pricing)**: DeepSeek V3.2 — updated pricing `$0.27/$1.10 per 1M`
- **feat(pricing)**: Kimi K2.5 via Moonshot API — direct Moonshot API access
- **feat(providers)**: Z.AI provider added (`zai` alias) — GLM-5 family with 128K output

### 🧠 Routing Intelligence

- **feat(registry)**: `toolCalling` flag per model in provider registry — combos can now prefer/require tool-calling capable models
- **feat(scoring)**: Multilingual intent detection for AutoCombo scoring — PT/ZH/ES/AR script/language patterns influence model selection per request context
- **feat(fallback)**: Benchmark-driven fallback chains — real latency data (p50 from `comboMetrics`) used to re-order fallback priority dynamically
- **feat(dedup)**: Request deduplication via content-hash — 5-second idempotency window prevents duplicate provider calls from retrying clients
- **feat(router)**: Pluggable `RouterStrategy` interface in `autoCombo/routerStrategy.ts` — custom routing logic can be injected without modifying core

### 🔧 MCP Server Improvements

- **feat(mcp)**: 2 new advanced tool schemas: `omniroute_get_provider_metrics` (p50/p95/p99 per provider) and `omniroute_explain_route` (routing decision explanation)
- **feat(mcp)**: MCP tool auth scopes updated — `metrics:read` scope added for provider metrics tools
- **feat(mcp)**: `omniroute_best_combo_for_task` now accepts `languageHint` parameter for multilingual routing

### 📊 Observability

- **feat(metrics)**: `comboMetrics.ts` extended with real-time latency percentile tracking per provider/account
- **feat(health)**: Health API (`/api/monitoring/health`) now returns per-provider `p50Latency` and `errorRate` fields
- **feat(usage)**: Usage history migration for per-model latency tracking

### 🗄️ DB Migrations

- **feat(migrations)**: New column `latency_p50` in `combo_metrics` table — zero-breaking, safe for existing users

### 🐛 Bug Fixes / Closures

- **fix(mitm):** Compile MITM utilities as NodeNext ESM during prepublish, copy the CommonJS MITM server into the standalone artifact, and resolve MITM data paths without relying on Next.js aliases in packaged runtime.
- **fix(build):** Move the local `.tmp/wine32` Wine prefix out of the isolated Next.js build path so Windows Electron packaging artifacts cannot trigger `EACCES` scans during Node 24 builds.
- **fix(build):** Copy the `wreq-js` native runtime directory into the isolated Next.js standalone output so packaged Playwright/E2E starts can load the instrumentation hook on Linux.
- **fix(api):** Validate the Codex Responses websocket bridge and `/v1/batches` JSON payloads with Zod before use, keeping `request.json()` route validation green and returning explicit 400 responses for invalid bodies.
- **fix(providers):** Add explicit typing to provider alias and category helpers so the strict `typecheck:noimplicit:core` CI gate passes.
- **fix(ui):** Keep the upstream proxy provider detail page labeled with a fallback "Managed via Upstream Proxy Settings" management surface when translations are unavailable.
- **fix(electron):** Harden the production desktop CSP by removing `unsafe-eval` outside development and adding object, base URI, form action, frame ancestor, and worker restrictions.
- **fix(cli):** Replace shell-interpolated setup and privileged command execution paths with argument-based `spawn`/`execFile` helpers for database setup, Tailscale sudo commands, MITM DNS edits, and certificate install/uninstall flows.
- **fix(ui):** Keep provider icons resilient by using direct `@lobehub/icons` components first, then local PNG/SVG fallbacks, avoiding the `@lobehub/ui` peer runtime in the dashboard.

- **close(#411)**: better-sqlite3 hashed module resolution on Windows — fixed in v2.6.10 (f02c5b5)
- **close(#409)**: GitHub Copilot chat completions fail with Claude models when files attached — fixed in v2.6.9 (838f1d6)
- **close(#405)**: Duplicate of #411 — resolved

## [2.6.10] — 2026-03-17

> Windows fix: better-sqlite3 prebuilt download without node-gyp/Python/MSVC (#426).

### 🐛 Bug Fixes

- **fix(mitm):** Compile MITM utilities as NodeNext ESM during prepublish, copy the CommonJS MITM server into the standalone artifact, and resolve MITM data paths without relying on Next.js aliases in packaged runtime.
- **fix(build):** Move the local `.tmp/wine32` Wine prefix out of the isolated Next.js build path so Windows Electron packaging artifacts cannot trigger `EACCES` scans during Node 24 builds.
- **fix(build):** Copy the `wreq-js` native runtime directory into the isolated Next.js standalone output so packaged Playwright/E2E starts can load the instrumentation hook on Linux.
- **fix(api):** Validate the Codex Responses websocket bridge and `/v1/batches` JSON payloads with Zod before use, keeping `request.json()` route validation green and returning explicit 400 responses for invalid bodies.
- **fix(providers):** Add explicit typing to provider alias and category helpers so the strict `typecheck:noimplicit:core` CI gate passes.
- **fix(ui):** Keep the upstream proxy provider detail page labeled with a fallback "Managed via Upstream Proxy Settings" management surface when translations are unavailable.
- **fix(electron):** Harden the production desktop CSP by removing `unsafe-eval` outside development and adding object, base URI, form action, frame ancestor, and worker restrictions.
- **fix(cli):** Replace shell-interpolated setup and privileged command execution paths with argument-based `spawn`/`execFile` helpers for database setup, Tailscale sudo commands, MITM DNS edits, and certificate install/uninstall flows.
- **fix(ui):** Keep provider icons resilient by using direct `@lobehub/icons` components first, then local PNG/SVG fallbacks, avoiding the `@lobehub/ui` peer runtime in the dashboard.

- **fix(install/#426)**: On Windows, `npm install -g omniroute` used to fail with `better_sqlite3.node is not a valid Win32 application` because the bundled native binary was compiled for Linux. Adds **Strategy 1.5** to `scripts/postinstall.mjs`: uses `@mapbox/node-pre-gyp install --fallback-to-build=false` (bundled within `better-sqlite3`) to download the correct prebuilt binary for the current OS/arch without requiring any build tools (no node-gyp, no Python, no MSVC). Falls back to `npm rebuild` only if the download fails. Adds platform-specific error messages with clear manual fix instructions.

---

## [2.6.9] — 2026-03-17

> CI fixes (t11 any-budget), bug fix #409 (file attachments via Copilot+Claude), release workflow correction.

### 🐛 Bug Fixes

- **fix(mitm):** Compile MITM utilities as NodeNext ESM during prepublish, copy the CommonJS MITM server into the standalone artifact, and resolve MITM data paths without relying on Next.js aliases in packaged runtime.
- **fix(build):** Move the local `.tmp/wine32` Wine prefix out of the isolated Next.js build path so Windows Electron packaging artifacts cannot trigger `EACCES` scans during Node 24 builds.
- **fix(build):** Copy the `wreq-js` native runtime directory into the isolated Next.js standalone output so packaged Playwright/E2E starts can load the instrumentation hook on Linux.
- **fix(api):** Validate the Codex Responses websocket bridge and `/v1/batches` JSON payloads with Zod before use, keeping `request.json()` route validation green and returning explicit 400 responses for invalid bodies.
- **fix(providers):** Add explicit typing to provider alias and category helpers so the strict `typecheck:noimplicit:core` CI gate passes.
- **fix(ui):** Keep the upstream proxy provider detail page labeled with a fallback "Managed via Upstream Proxy Settings" management surface when translations are unavailable.
- **fix(electron):** Harden the production desktop CSP by removing `unsafe-eval` outside development and adding object, base URI, form action, frame ancestor, and worker restrictions.
- **fix(cli):** Replace shell-interpolated setup and privileged command execution paths with argument-based `spawn`/`execFile` helpers for database setup, Tailscale sudo commands, MITM DNS edits, and certificate install/uninstall flows.
- **fix(ui):** Keep provider icons resilient by using direct `@lobehub/icons` components first, then local PNG/SVG fallbacks, avoiding the `@lobehub/ui` peer runtime in the dashboard.

- **fix(ci)**: Remove word "any" from comments in `openai-responses.ts` and `chatCore.ts` that were failing the t11 `any` budget check (false positive from regex counting comments)
- **fix(chatCore)**: Normalize unsupported content part types before forwarding to providers (#409 — Cursor sends `{type:"file"}` when `.md` files are attached; Copilot and other OpenAI-compat providers reject with "type has to be either 'image_url' or 'text'"; fix converts `file`/`document` blocks to `text` and drops unknown types)

### 🔧 Workflow

- **chore(generate-release)**: Add ATOMIC COMMIT RULE — version bump (`npm version patch`) MUST happen before committing feature files to ensure tag always points to a commit containing all version changes together

---

## [2.6.8] — 2026-03-17

> Sprint: Combo as Agent (system prompt + tool filter), Context Caching Protection, Auto-Update, Detailed Logs, MITM Kiro IDE.

### 🗄️ DB Migrations (zero-breaking — safe for existing users)

- **005_combo_agent_fields.sql**: `ALTER TABLE combos ADD COLUMN system_message TEXT DEFAULT NULL`, `tool_filter_regex TEXT DEFAULT NULL`, `context_cache_protection INTEGER DEFAULT 0`
- **006_detailed_request_logs.sql**: New `request_detail_logs` table with 500-entry ring-buffer trigger, opt-in via settings toggle

### Funktionen

- **feat(combo)**: System Message Override per Combo (#399 — `system_message` field replaces or injects system prompt before forwarding to provider)
- **feat(combo)**: Tool Filter Regex per Combo (#399 — `tool_filter_regex` keeps only tools matching pattern; supports OpenAI + Anthropic formats)
- **feat(combo)**: Context Caching Protection (#401 — `context_cache_protection` tags responses with `<omniModel>provider/model</omniModel>` and pins model for session continuity)
- **feat(settings)**: Auto-Update via Settings (#320 — `GET /api/system/version` + `POST /api/system/update` — checks npm registry and updates in background with pm2 restart)
- **feat(logs)**: Detailed Request Logs (#378 — captures full pipeline bodies at 4 stages: client request, translated request, provider response, client response — opt-in toggle, 64KB trim, 500-entry ring-buffer)
- **feat(mitm)**: MITM Kiro IDE profile (#336 — `src/mitm/targets/kiro.ts` targets api.anthropic.com, reuses existing MITM infrastructure)

---

## [2.6.7] — 2026-03-17

> Sprint: SSE improvements, local provider_nodes extensions, proxy registry, Claude passthrough fixes.

### Funktionen

- **feat(health)**: Background health check for local `provider_nodes` with exponential backoff (30s→300s) and `Promise.allSettled` to avoid blocking (#423, @Regis-RCR)
- **feat(embeddings)**: Route `/v1/embeddings` to local `provider_nodes` — `buildDynamicEmbeddingProvider()` with hostname validation (#422, @Regis-RCR)
- **feat(audio)**: Route TTS/STT to local `provider_nodes` — `buildDynamicAudioProvider()` with SSRF protection (#416, @Regis-RCR)
- **feat(proxy)**: Proxy registry, management APIs, and quota-limit generalization (#429, @Regis-RCR)

### 🐛 Bug Fixes

- **fix(mitm):** Compile MITM utilities as NodeNext ESM during prepublish, copy the CommonJS MITM server into the standalone artifact, and resolve MITM data paths without relying on Next.js aliases in packaged runtime.
- **fix(build):** Move the local `.tmp/wine32` Wine prefix out of the isolated Next.js build path so Windows Electron packaging artifacts cannot trigger `EACCES` scans during Node 24 builds.
- **fix(build):** Copy the `wreq-js` native runtime directory into the isolated Next.js standalone output so packaged Playwright/E2E starts can load the instrumentation hook on Linux.
- **fix(api):** Validate the Codex Responses websocket bridge and `/v1/batches` JSON payloads with Zod before use, keeping `request.json()` route validation green and returning explicit 400 responses for invalid bodies.
- **fix(providers):** Add explicit typing to provider alias and category helpers so the strict `typecheck:noimplicit:core` CI gate passes.
- **fix(ui):** Keep the upstream proxy provider detail page labeled with a fallback "Managed via Upstream Proxy Settings" management surface when translations are unavailable.
- **fix(electron):** Harden the production desktop CSP by removing `unsafe-eval` outside development and adding object, base URI, form action, frame ancestor, and worker restrictions.
- **fix(cli):** Replace shell-interpolated setup and privileged command execution paths with argument-based `spawn`/`execFile` helpers for database setup, Tailscale sudo commands, MITM DNS edits, and certificate install/uninstall flows.
- **fix(ui):** Keep provider icons resilient by using direct `@lobehub/icons` components first, then local PNG/SVG fallbacks, avoiding the `@lobehub/ui` peer runtime in the dashboard.

- **fix(sse)**: Strip Claude-specific fields (`metadata`, `anthropic_version`) when target is OpenAI-compat (#421, @prakersh)
- **fix(sse)**: Extract Claude SSE usage (`input_tokens`, `output_tokens`, cache tokens) in passthrough stream mode (#420, @prakersh)
- **fix(sse)**: Generate fallback `call_id` for tool calls with missing/empty IDs (#419, @prakersh)
- **fix(sse)**: Claude-to-Claude passthrough — forward body completely untouched, no re-translation (#418, @prakersh)
- **fix(sse)**: Filter orphaned `tool_result` items after Claude Code context compaction to avoid 400 errors (#417, @prakersh)
- **fix(sse)**: Skip empty-name tool calls in Responses API translator to prevent `placeholder_tool` infinite loops (#415, @prakersh)
- **fix(sse)**: Strip empty text content blocks before translation (#427, @prakersh)
- **fix(api)**: Add `refreshable: true` to Claude OAuth test config (#428, @prakersh)

### 📦 Dependencies

- Bump `vitest`, `@vitest/*` and related devDependencies (#414, @dependabot)

---

## [2.6.6] — 2026-03-17

> Hotfix: Turbopack/Docker compatibility — remove `node:` protocol from all `src/` imports.

### 🐛 Bug Fixes

- **fix(mitm):** Compile MITM utilities as NodeNext ESM during prepublish, copy the CommonJS MITM server into the standalone artifact, and resolve MITM data paths without relying on Next.js aliases in packaged runtime.
- **fix(build):** Move the local `.tmp/wine32` Wine prefix out of the isolated Next.js build path so Windows Electron packaging artifacts cannot trigger `EACCES` scans during Node 24 builds.
- **fix(build):** Copy the `wreq-js` native runtime directory into the isolated Next.js standalone output so packaged Playwright/E2E starts can load the instrumentation hook on Linux.
- **fix(api):** Validate the Codex Responses websocket bridge and `/v1/batches` JSON payloads with Zod before use, keeping `request.json()` route validation green and returning explicit 400 responses for invalid bodies.
- **fix(providers):** Add explicit typing to provider alias and category helpers so the strict `typecheck:noimplicit:core` CI gate passes.
- **fix(ui):** Keep the upstream proxy provider detail page labeled with a fallback "Managed via Upstream Proxy Settings" management surface when translations are unavailable.
- **fix(electron):** Harden the production desktop CSP by removing `unsafe-eval` outside development and adding object, base URI, form action, frame ancestor, and worker restrictions.
- **fix(cli):** Replace shell-interpolated setup and privileged command execution paths with argument-based `spawn`/`execFile` helpers for database setup, Tailscale sudo commands, MITM DNS edits, and certificate install/uninstall flows.
- **fix(ui):** Keep provider icons resilient by using direct `@lobehub/icons` components first, then local PNG/SVG fallbacks, avoiding the `@lobehub/ui` peer runtime in the dashboard.

- **fix(build)**: Removed `node:` protocol prefix from `import` statements in 17 files under `src/`. The `node:fs`, `node:path`, `node:url`, `node:os` etc. imports caused `Ecmascript file had an error` on Turbopack builds (Next.js 15 Docker) and on upgrades from older npm global installs. Affected files: `migrationRunner.ts`, `core.ts`, `backup.ts`, `prompts.ts`, `dataPaths.ts`, and 12 others in `src/app/api/` and `src/lib/`.
- **chore(workflow)**: Updated `generate-release.md` to make Docker Hub sync and dual-VPS deploy **mandatory** steps in every release.

---

## [2.6.5] — 2026-03-17

> Sprint: reasoning model param filtering, local provider 404 fix, Kilo Gateway provider, dependency bumps.

### ✨ New Features

- **feat(providers):** Implement Image Generation and Editing capabilities for ChatGPT Web, including in-band chat image generation and caching (#1606).
- **feat(ui):** Integrate OpenCode Zen/Go API tool logo SVG and polish API key copy-to-clipboard interactions (#1607).

- **feat(providers):** Integrate AgentRouter as a new OpenAI-compatible passthrough provider with $200 free credits via sign-up (Issue #1572).
- **feat(ui):** Implement on-demand per-model testing in the provider dashboard, allowing single-token diagnostic checks without triggering rate-limits (Issue #1532).

- **feat(api)**: Added **Kilo Gateway** (`api.kilo.ai`) as a new API Key provider (alias `kg`) — 335+ models, 6 free models, 3 auto-routing models (`kilo-auto/frontier`, `kilo-auto/balanced`, `kilo-auto/free`). Passthrough models supported via `/api/gateway/models` endpoint. (PR #408 by @Regis-RCR)

### 🐛 Bug Fixes

- **fix(mitm):** Compile MITM utilities as NodeNext ESM during prepublish, copy the CommonJS MITM server into the standalone artifact, and resolve MITM data paths without relying on Next.js aliases in packaged runtime.
- **fix(build):** Move the local `.tmp/wine32` Wine prefix out of the isolated Next.js build path so Windows Electron packaging artifacts cannot trigger `EACCES` scans during Node 24 builds.
- **fix(build):** Copy the `wreq-js` native runtime directory into the isolated Next.js standalone output so packaged Playwright/E2E starts can load the instrumentation hook on Linux.
- **fix(api):** Validate the Codex Responses websocket bridge and `/v1/batches` JSON payloads with Zod before use, keeping `request.json()` route validation green and returning explicit 400 responses for invalid bodies.
- **fix(providers):** Add explicit typing to provider alias and category helpers so the strict `typecheck:noimplicit:core` CI gate passes.
- **fix(ui):** Keep the upstream proxy provider detail page labeled with a fallback "Managed via Upstream Proxy Settings" management surface when translations are unavailable.
- **fix(electron):** Harden the production desktop CSP by removing `unsafe-eval` outside development and adding object, base URI, form action, frame ancestor, and worker restrictions.
- **fix(cli):** Replace shell-interpolated setup and privileged command execution paths with argument-based `spawn`/`execFile` helpers for database setup, Tailscale sudo commands, MITM DNS edits, and certificate install/uninstall flows.
- **fix(ui):** Keep provider icons resilient by using direct `@lobehub/icons` components first, then local PNG/SVG fallbacks, avoiding the `@lobehub/ui` peer runtime in the dashboard.

- **fix(sse)**: Strip unsupported parameters for reasoning models (o1, o1-mini, o1-pro, o3, o3-mini). Models in the `o1`/`o3` family reject `temperature`, `top_p`, `frequency_penalty`, `presence_penalty`, `logprobs`, `top_logprobs`, and `n` with HTTP 400. Parameters are now stripped at the `chatCore` layer before forwarding. Uses a declarative `unsupportedParams` field per model and a precomputed O(1) Map for lookup. (PR #412 by @Regis-RCR)
- **fix(sse)**: Local provider 404 now results in a **model-only lockout (5 seconds)** instead of a connection-level lockout (2 minutes). When a local inference backend (Ollama, LM Studio, oMLX) returns 404 for an unknown model, the connection remains active and other models continue working immediately. Also fixes a pre-existing bug where `model` was not passed to `markAccountUnavailable()`. Local providers detected via hostname (`localhost`, `127.0.0.1`, `::1`, extensible via `LOCAL_HOSTNAMES` env var). (PR #410 by @Regis-RCR)

### 📦 Dependencies

- `better-sqlite3` 12.6.2 → 12.8.0
- `undici` 7.24.2 → 7.24.4
- `https-proxy-agent` 7 → 8
- `agent-base` 7 → 8

---

## [2.6.4] — 2026-03-17

### 🐛 Bug Fixes

- **fix(mitm):** Compile MITM utilities as NodeNext ESM during prepublish, copy the CommonJS MITM server into the standalone artifact, and resolve MITM data paths without relying on Next.js aliases in packaged runtime.
- **fix(build):** Move the local `.tmp/wine32` Wine prefix out of the isolated Next.js build path so Windows Electron packaging artifacts cannot trigger `EACCES` scans during Node 24 builds.
- **fix(build):** Copy the `wreq-js` native runtime directory into the isolated Next.js standalone output so packaged Playwright/E2E starts can load the instrumentation hook on Linux.
- **fix(api):** Validate the Codex Responses websocket bridge and `/v1/batches` JSON payloads with Zod before use, keeping `request.json()` route validation green and returning explicit 400 responses for invalid bodies.
- **fix(providers):** Add explicit typing to provider alias and category helpers so the strict `typecheck:noimplicit:core` CI gate passes.
- **fix(ui):** Keep the upstream proxy provider detail page labeled with a fallback "Managed via Upstream Proxy Settings" management surface when translations are unavailable.
- **fix(electron):** Harden the production desktop CSP by removing `unsafe-eval` outside development and adding object, base URI, form action, frame ancestor, and worker restrictions.
- **fix(cli):** Replace shell-interpolated setup and privileged command execution paths with argument-based `spawn`/`execFile` helpers for database setup, Tailscale sudo commands, MITM DNS edits, and certificate install/uninstall flows.
- **fix(ui):** Keep provider icons resilient by using direct `@lobehub/icons` components first, then local PNG/SVG fallbacks, avoiding the `@lobehub/ui` peer runtime in the dashboard.

- **fix(providers)**: Removed non-existent model names across 5 providers:
  - **gemini / gemini-cli**: removed `gemini-3.1-pro/flash` and `gemini-3-*-preview` (don't exist in Google API v1beta); replaced with `gemini-2.5-pro`, `gemini-2.5-flash`, `gemini-2.0-flash`, `gemini-1.5-pro/flash`
  - **antigravity**: removed `gemini-3.1-pro-high/low` and `gemini-3-flash` (invalid internal aliases); replaced with real 2.x models
  - **github (Copilot)**: removed `gemini-3-flash-preview` and `gemini-3-pro-preview`; replaced with `gemini-2.5-flash`
  - **nvidia**: corrected `nvidia/llama-3.3-70b-instruct` → `meta/llama-3.3-70b-instruct` (NVIDIA NIM uses `meta/` namespace for Meta models); added `nvidia/llama-3.1-70b-instruct` and `nvidia/llama-3.1-405b-instruct`
- **fix(db/combo)**: Updated `free-stack` combo on remote DB: removed `qw/qwen3-coder-plus` (expired refresh token), corrected `nvidia/llama-3.3-70b-instruct` → `nvidia/meta/llama-3.3-70b-instruct`, corrected `gemini/gemini-3.1-flash` → `gemini/gemini-2.5-flash`, added `if/deepseek-v3.2`

---

## [2.6.3] — 2026-03-16

> Sprint: zod/pino hash-strip baked into build pipeline, Synthetic provider added, VPS PM2 path corrected.

### 🐛 Bug Fixes

- **fix(mitm):** Compile MITM utilities as NodeNext ESM during prepublish, copy the CommonJS MITM server into the standalone artifact, and resolve MITM data paths without relying on Next.js aliases in packaged runtime.
- **fix(build):** Move the local `.tmp/wine32` Wine prefix out of the isolated Next.js build path so Windows Electron packaging artifacts cannot trigger `EACCES` scans during Node 24 builds.
- **fix(build):** Copy the `wreq-js` native runtime directory into the isolated Next.js standalone output so packaged Playwright/E2E starts can load the instrumentation hook on Linux.
- **fix(api):** Validate the Codex Responses websocket bridge and `/v1/batches` JSON payloads with Zod before use, keeping `request.json()` route validation green and returning explicit 400 responses for invalid bodies.
- **fix(providers):** Add explicit typing to provider alias and category helpers so the strict `typecheck:noimplicit:core` CI gate passes.
- **fix(ui):** Keep the upstream proxy provider detail page labeled with a fallback "Managed via Upstream Proxy Settings" management surface when translations are unavailable.
- **fix(electron):** Harden the production desktop CSP by removing `unsafe-eval` outside development and adding object, base URI, form action, frame ancestor, and worker restrictions.
- **fix(cli):** Replace shell-interpolated setup and privileged command execution paths with argument-based `spawn`/`execFile` helpers for database setup, Tailscale sudo commands, MITM DNS edits, and certificate install/uninstall flows.
- **fix(ui):** Keep provider icons resilient by using direct `@lobehub/icons` components first, then local PNG/SVG fallbacks, avoiding the `@lobehub/ui` peer runtime in the dashboard.

- **fix(build)**: Turbopack hash-strip now runs at **compile time** for ALL packages — not just `better-sqlite3`. Step 5.6 in `prepublish.mjs` walks every `.js` in `app/.next/server/` and strips the 16-char hex suffix from any hashed `require()`. Fixes `zod-dcb22c...`, `pino-...`, etc. MODULE_NOT_FOUND on global npm installs. Closes #398
- **fix(deploy)**: PM2 on both VPS was pointing to stale git-clone directories. Reconfigured to `app/server.js` in the npm global package. Updated `/deploy-vps` workflow to use `npm pack + scp` (npm registry rejects 299MB packages).

### Funktionen

- **feat(provider)**: Synthetic ([synthetic.new](https://synthetic.new)) — privacy-focused OpenAI-compatible inference. `passthroughModels: true` for dynamic HuggingFace model catalog. Initial models: Kimi K2.5, MiniMax M2.5, GLM 4.7, DeepSeek V3.2. (PR #404 by @Regis-RCR)

### 📋 Issues Closed

- **close #398**: npm hash regression — fixed by compile-time hash-strip in prepublish
- **triage #324**: Bug screenshot without steps — requested reproduction details

---

## [2.6.2] — 2026-03-16

> Sprint: module hashing fully fixed, 2 PRs merged (Anthropic tools filter + custom endpoint paths), Alibaba Cloud DashScope provider added, 3 stale issues closed.

### 🐛 Bug Fixes

- **fix(mitm):** Compile MITM utilities as NodeNext ESM during prepublish, copy the CommonJS MITM server into the standalone artifact, and resolve MITM data paths without relying on Next.js aliases in packaged runtime.
- **fix(build):** Move the local `.tmp/wine32` Wine prefix out of the isolated Next.js build path so Windows Electron packaging artifacts cannot trigger `EACCES` scans during Node 24 builds.
- **fix(build):** Copy the `wreq-js` native runtime directory into the isolated Next.js standalone output so packaged Playwright/E2E starts can load the instrumentation hook on Linux.
- **fix(api):** Validate the Codex Responses websocket bridge and `/v1/batches` JSON payloads with Zod before use, keeping `request.json()` route validation green and returning explicit 400 responses for invalid bodies.
- **fix(providers):** Add explicit typing to provider alias and category helpers so the strict `typecheck:noimplicit:core` CI gate passes.
- **fix(ui):** Keep the upstream proxy provider detail page labeled with a fallback "Managed via Upstream Proxy Settings" management surface when translations are unavailable.
- **fix(electron):** Harden the production desktop CSP by removing `unsafe-eval` outside development and adding object, base URI, form action, frame ancestor, and worker restrictions.
- **fix(cli):** Replace shell-interpolated setup and privileged command execution paths with argument-based `spawn`/`execFile` helpers for database setup, Tailscale sudo commands, MITM DNS edits, and certificate install/uninstall flows.
- **fix(ui):** Keep provider icons resilient by using direct `@lobehub/icons` components first, then local PNG/SVG fallbacks, avoiding the `@lobehub/ui` peer runtime in the dashboard.

- **fix(build)**: Extended webpack `externals` hash-strip to cover ALL `serverExternalPackages`, not just `better-sqlite3`. Next.js 16 Turbopack hashes `zod`, `pino`, and every other server-external package into names like `zod-dcb22c6336e0bc69` that don't exist in `node_modules` at runtime. A HASH_PATTERN regex catch-all now strips the 16-char suffix and falls back to the base package name. Also added `NEXT_PRIVATE_BUILD_WORKER=0` in `prepublish.mjs` to reinforce webpack mode, plus a post-build scan that reports any remaining hashed refs. (#396, #398, PR #403)
- **fix(chat)**: Anthropic-format tool names (`tool.name` without `.function` wrapper) were silently dropped by the empty-name filter introduced in #346. LiteLLM proxies requests with `anthropic/` prefix in Anthropic Messages API format, causing all tools to be filtered and Anthropic to return `400: tool_choice.any may only be specified while providing tools`. Fixed by falling back to `tool.name` when `tool.function.name` is absent. Added 8 regression unit tests. (PR #397)

### Funktionen

- **feat(api)**: Custom endpoint paths for OpenAI-compatible provider nodes — configure `chatPath` and `modelsPath` per node (e.g. `/v4/chat/completions`) in the provider connection UI. Includes a DB migration (`003_provider_node_custom_paths.sql`) and URL path sanitization (no `..` traversal, must start with `/`). (PR #400)
- **feat(provider)**: Alibaba Cloud DashScope added as OpenAI-compatible provider. International endpoint: `dashscope-intl.aliyuncs.com/compatible-mode/v1`. 12 models: `qwen-max`, `qwen-plus`, `qwen-turbo`, `qwen3-coder-plus/flash`, `qwq-plus`, `qwq-32b`, `qwen3-32b`, `qwen3-235b-a22b`. Auth: Bearer API key.

### 📋 Issues Closed

- **close #323**: Cline connection error `[object Object]` — fixed in v2.3.7; instructed user to upgrade from v2.2.9
- **close #337**: Kiro credit tracking — implemented in v2.5.5 (#381); pointed user to Dashboard → Usage
- **triage #402**: ARM64 macOS DMG damaged — requested macOS version, exact error, and advised `xattr -d com.apple.quarantine` workaround

---

## [2.6.1] — 2026-03-15

> Critical startup fix: v2.6.0 global npm installs crashed with a 500 error due to a Turbopack/webpack module-name hashing bug in the Next.js 16 instrumentation hook.

### 🐛 Bug Fixes

- **fix(mitm):** Compile MITM utilities as NodeNext ESM during prepublish, copy the CommonJS MITM server into the standalone artifact, and resolve MITM data paths without relying on Next.js aliases in packaged runtime.
- **fix(build):** Move the local `.tmp/wine32` Wine prefix out of the isolated Next.js build path so Windows Electron packaging artifacts cannot trigger `EACCES` scans during Node 24 builds.
- **fix(build):** Copy the `wreq-js` native runtime directory into the isolated Next.js standalone output so packaged Playwright/E2E starts can load the instrumentation hook on Linux.
- **fix(api):** Validate the Codex Responses websocket bridge and `/v1/batches` JSON payloads with Zod before use, keeping `request.json()` route validation green and returning explicit 400 responses for invalid bodies.
- **fix(providers):** Add explicit typing to provider alias and category helpers so the strict `typecheck:noimplicit:core` CI gate passes.
- **fix(ui):** Keep the upstream proxy provider detail page labeled with a fallback "Managed via Upstream Proxy Settings" management surface when translations are unavailable.
- **fix(electron):** Harden the production desktop CSP by removing `unsafe-eval` outside development and adding object, base URI, form action, frame ancestor, and worker restrictions.
- **fix(cli):** Replace shell-interpolated setup and privileged command execution paths with argument-based `spawn`/`execFile` helpers for database setup, Tailscale sudo commands, MITM DNS edits, and certificate install/uninstall flows.
- **fix(ui):** Keep provider icons resilient by using direct `@lobehub/icons` components first, then local PNG/SVG fallbacks, avoiding the `@lobehub/ui` peer runtime in the dashboard.

- **fix(build)**: Force `better-sqlite3` to always be required by its exact package name in the webpack server bundle. Next.js 16 compiled the instrumentation hook into a separate chunk and emitted `require('better-sqlite3-<hash>')` — a hashed module name that doesn't exist in `node_modules` — even though the package was listed in `serverExternalPackages`. Added an explicit `externals` function to the server webpack config so the bundler always emits `require('better-sqlite3')`, resolving the startup `500 Internal Server Error` on clean global installs. (#394, PR #395)

### 🔧 CI

- **ci**: Added `workflow_dispatch` to `npm-publish.yml` with version sync safeguard for manual triggers (#392)
- **ci**: Added `workflow_dispatch` to `docker-publish.yml`, updated GitHub Actions to latest versions (#392)

---

## [2.6.0] - 2026-03-15

> Issue resolution sprint: 4 bugs fixed, logs UX improved, Kiro credit tracking added.

### 🐛 Bug Fixes

- **fix(mitm):** Compile MITM utilities as NodeNext ESM during prepublish, copy the CommonJS MITM server into the standalone artifact, and resolve MITM data paths without relying on Next.js aliases in packaged runtime.
- **fix(build):** Move the local `.tmp/wine32` Wine prefix out of the isolated Next.js build path so Windows Electron packaging artifacts cannot trigger `EACCES` scans during Node 24 builds.
- **fix(build):** Copy the `wreq-js` native runtime directory into the isolated Next.js standalone output so packaged Playwright/E2E starts can load the instrumentation hook on Linux.
- **fix(api):** Validate the Codex Responses websocket bridge and `/v1/batches` JSON payloads with Zod before use, keeping `request.json()` route validation green and returning explicit 400 responses for invalid bodies.
- **fix(providers):** Add explicit typing to provider alias and category helpers so the strict `typecheck:noimplicit:core` CI gate passes.
- **fix(ui):** Keep the upstream proxy provider detail page labeled with a fallback "Managed via Upstream Proxy Settings" management surface when translations are unavailable.
- **fix(electron):** Harden the production desktop CSP by removing `unsafe-eval` outside development and adding object, base URI, form action, frame ancestor, and worker restrictions.
- **fix(cli):** Replace shell-interpolated setup and privileged command execution paths with argument-based `spawn`/`execFile` helpers for database setup, Tailscale sudo commands, MITM DNS edits, and certificate install/uninstall flows.
- **fix(ui):** Keep provider icons resilient by using direct `@lobehub/icons` components first, then local PNG/SVG fallbacks, avoiding the `@lobehub/ui` peer runtime in the dashboard.

- **fix(media)**: ComfyUI and SD WebUI no longer appear in the Media page provider list when unconfigured — fetches `/api/providers` on mount and hides local providers with no connections (#390)
- **fix(auth)**: Round-robin no longer re-selects rate-limited accounts immediately after cooldown — `backoffLevel` is now used as primary sort key in the LRU rotation (#340)
- **fix(oauth)**: Qoder (and other providers that redirect to their own UI) no longer leave the OAuth modal stuck at "Waiting for Authorization" — popup-closed detector auto-transitions to manual URL input mode (#344)
- **fix(logs)**: Request log table is now readable in light mode — status badges, token counts, and combo tags use adaptive `dark:` color classes (#378)

### Funktionen

- **feat(kiro)**: Kiro credit tracking added to usage fetcher — queries `getUserCredits` from AWS CodeWhisperer endpoint (#337)

### 🛠 Chores

- **chore(tests)**: Aligned `test:plan3`, `test:fixes`, `test:security` to use same `tsx/esm` loader as `npm test` — eliminates module resolution false negatives in targeted runs (PR #386)

---

## [2.5.9] - 2026-03-15

> Codex native passthrough fix + route body validation hardening.

### 🐛 Bug Fixes

- **fix(mitm):** Compile MITM utilities as NodeNext ESM during prepublish, copy the CommonJS MITM server into the standalone artifact, and resolve MITM data paths without relying on Next.js aliases in packaged runtime.
- **fix(build):** Move the local `.tmp/wine32` Wine prefix out of the isolated Next.js build path so Windows Electron packaging artifacts cannot trigger `EACCES` scans during Node 24 builds.
- **fix(build):** Copy the `wreq-js` native runtime directory into the isolated Next.js standalone output so packaged Playwright/E2E starts can load the instrumentation hook on Linux.
- **fix(api):** Validate the Codex Responses websocket bridge and `/v1/batches` JSON payloads with Zod before use, keeping `request.json()` route validation green and returning explicit 400 responses for invalid bodies.
- **fix(providers):** Add explicit typing to provider alias and category helpers so the strict `typecheck:noimplicit:core` CI gate passes.
- **fix(ui):** Keep the upstream proxy provider detail page labeled with a fallback "Managed via Upstream Proxy Settings" management surface when translations are unavailable.
- **fix(electron):** Harden the production desktop CSP by removing `unsafe-eval` outside development and adding object, base URI, form action, frame ancestor, and worker restrictions.
- **fix(cli):** Replace shell-interpolated setup and privileged command execution paths with argument-based `spawn`/`execFile` helpers for database setup, Tailscale sudo commands, MITM DNS edits, and certificate install/uninstall flows.
- **fix(ui):** Keep provider icons resilient by using direct `@lobehub/icons` components first, then local PNG/SVG fallbacks, avoiding the `@lobehub/ui` peer runtime in the dashboard.

- **fix(codex)**: Preserve native Responses API passthrough for Codex clients — avoids unnecessary translation mutations (PR #387)
- **fix(api)**: Validate request bodies on pricing/sync and task-routing routes — prevents crashes from malformed inputs (PR #388)
- **fix(auth)**: JWT secrets persist across restarts via `src/lib/db/secrets.ts` — eliminates 401 errors after pm2 restart (PR #388)

---

## [2.5.8] - 2026-03-15

> Build fix: restore VPS connectivity broken by v2.5.7 incomplete publish.

### 🐛 Bug Fixes

- **fix(mitm):** Compile MITM utilities as NodeNext ESM during prepublish, copy the CommonJS MITM server into the standalone artifact, and resolve MITM data paths without relying on Next.js aliases in packaged runtime.
- **fix(build):** Move the local `.tmp/wine32` Wine prefix out of the isolated Next.js build path so Windows Electron packaging artifacts cannot trigger `EACCES` scans during Node 24 builds.
- **fix(build):** Copy the `wreq-js` native runtime directory into the isolated Next.js standalone output so packaged Playwright/E2E starts can load the instrumentation hook on Linux.
- **fix(api):** Validate the Codex Responses websocket bridge and `/v1/batches` JSON payloads with Zod before use, keeping `request.json()` route validation green and returning explicit 400 responses for invalid bodies.
- **fix(providers):** Add explicit typing to provider alias and category helpers so the strict `typecheck:noimplicit:core` CI gate passes.
- **fix(ui):** Keep the upstream proxy provider detail page labeled with a fallback "Managed via Upstream Proxy Settings" management surface when translations are unavailable.
- **fix(electron):** Harden the production desktop CSP by removing `unsafe-eval` outside development and adding object, base URI, form action, frame ancestor, and worker restrictions.
- **fix(cli):** Replace shell-interpolated setup and privileged command execution paths with argument-based `spawn`/`execFile` helpers for database setup, Tailscale sudo commands, MITM DNS edits, and certificate install/uninstall flows.
- **fix(ui):** Keep provider icons resilient by using direct `@lobehub/icons` components first, then local PNG/SVG fallbacks, avoiding the `@lobehub/ui` peer runtime in the dashboard.

- **fix(build)**: `scripts/prepublish.mjs` still used deprecated `--webpack` flag causing Next.js standalone build to fail silently — npm publish completed without `app/server.js`, breaking VPS deployment

---

## [2.5.7] - 2026-03-15

> Media playground error handling fixes.

### 🐛 Bug Fixes

- **fix(mitm):** Compile MITM utilities as NodeNext ESM during prepublish, copy the CommonJS MITM server into the standalone artifact, and resolve MITM data paths without relying on Next.js aliases in packaged runtime.
- **fix(build):** Move the local `.tmp/wine32` Wine prefix out of the isolated Next.js build path so Windows Electron packaging artifacts cannot trigger `EACCES` scans during Node 24 builds.
- **fix(build):** Copy the `wreq-js` native runtime directory into the isolated Next.js standalone output so packaged Playwright/E2E starts can load the instrumentation hook on Linux.
- **fix(api):** Validate the Codex Responses websocket bridge and `/v1/batches` JSON payloads with Zod before use, keeping `request.json()` route validation green and returning explicit 400 responses for invalid bodies.
- **fix(providers):** Add explicit typing to provider alias and category helpers so the strict `typecheck:noimplicit:core` CI gate passes.
- **fix(ui):** Keep the upstream proxy provider detail page labeled with a fallback "Managed via Upstream Proxy Settings" management surface when translations are unavailable.
- **fix(electron):** Harden the production desktop CSP by removing `unsafe-eval` outside development and adding object, base URI, form action, frame ancestor, and worker restrictions.
- **fix(cli):** Replace shell-interpolated setup and privileged command execution paths with argument-based `spawn`/`execFile` helpers for database setup, Tailscale sudo commands, MITM DNS edits, and certificate install/uninstall flows.
- **fix(ui):** Keep provider icons resilient by using direct `@lobehub/icons` components first, then local PNG/SVG fallbacks, avoiding the `@lobehub/ui` peer runtime in the dashboard.

- **fix(media)**: Transcription "API Key Required" false positive when audio contains no speech (music, silence) — now shows "No speech detected" instead
- **fix(media)**: `upstreamErrorResponse` in `audioTranscription.ts` and `audioSpeech.ts` now returns proper JSON (`{error:{message}}`), enabling correct 401/403 credential error detection in the MediaPageClient
- **fix(media)**: `parseApiError` now handles Deepgram's `err_msg` field and detects `"api key"` in error messages for accurate credential error classification

---

## [2.5.6] - 2026-03-15

> Critical security/auth fixes: Antigravity OAuth broken + JWT sessions lost after restart.

### 🐛 Bug Fixes

- **fix(mitm):** Compile MITM utilities as NodeNext ESM during prepublish, copy the CommonJS MITM server into the standalone artifact, and resolve MITM data paths without relying on Next.js aliases in packaged runtime.
- **fix(build):** Move the local `.tmp/wine32` Wine prefix out of the isolated Next.js build path so Windows Electron packaging artifacts cannot trigger `EACCES` scans during Node 24 builds.
- **fix(build):** Copy the `wreq-js` native runtime directory into the isolated Next.js standalone output so packaged Playwright/E2E starts can load the instrumentation hook on Linux.
- **fix(api):** Validate the Codex Responses websocket bridge and `/v1/batches` JSON payloads with Zod before use, keeping `request.json()` route validation green and returning explicit 400 responses for invalid bodies.
- **fix(providers):** Add explicit typing to provider alias and category helpers so the strict `typecheck:noimplicit:core` CI gate passes.
- **fix(ui):** Keep the upstream proxy provider detail page labeled with a fallback "Managed via Upstream Proxy Settings" management surface when translations are unavailable.
- **fix(electron):** Harden the production desktop CSP by removing `unsafe-eval` outside development and adding object, base URI, form action, frame ancestor, and worker restrictions.
- **fix(cli):** Replace shell-interpolated setup and privileged command execution paths with argument-based `spawn`/`execFile` helpers for database setup, Tailscale sudo commands, MITM DNS edits, and certificate install/uninstall flows.
- **fix(ui):** Keep provider icons resilient by using direct `@lobehub/icons` components first, then local PNG/SVG fallbacks, avoiding the `@lobehub/ui` peer runtime in the dashboard.

- **fix(oauth) #384**: Antigravity Google OAuth now correctly sends `client_secret` to the token endpoint. The fallback for `ANTIGRAVITY_OAUTH_CLIENT_SECRET` was an empty string, which is falsy — so `client_secret` was never included in the request, causing `"client_secret is missing"` errors for all users without a custom env var. Closes #383.
- **fix(auth) #385**: `JWT_SECRET` is now persisted to SQLite (`namespace='secrets'`) on first generation and reloaded on subsequent starts. Previously, a new random secret was generated each process startup, invalidating all existing cookies/sessions after any restart or upgrade. Affects both `JWT_SECRET` and `API_KEY_SECRET`. Closes #382.

---

## [2.5.5] - 2026-03-15

> Model list dedup fix, Electron standalone build hardening, and Kiro credit tracking.

### 🐛 Bug Fixes

- **fix(mitm):** Compile MITM utilities as NodeNext ESM during prepublish, copy the CommonJS MITM server into the standalone artifact, and resolve MITM data paths without relying on Next.js aliases in packaged runtime.
- **fix(build):** Move the local `.tmp/wine32` Wine prefix out of the isolated Next.js build path so Windows Electron packaging artifacts cannot trigger `EACCES` scans during Node 24 builds.
- **fix(build):** Copy the `wreq-js` native runtime directory into the isolated Next.js standalone output so packaged Playwright/E2E starts can load the instrumentation hook on Linux.
- **fix(api):** Validate the Codex Responses websocket bridge and `/v1/batches` JSON payloads with Zod before use, keeping `request.json()` route validation green and returning explicit 400 responses for invalid bodies.
- **fix(providers):** Add explicit typing to provider alias and category helpers so the strict `typecheck:noimplicit:core` CI gate passes.
- **fix(ui):** Keep the upstream proxy provider detail page labeled with a fallback "Managed via Upstream Proxy Settings" management surface when translations are unavailable.
- **fix(electron):** Harden the production desktop CSP by removing `unsafe-eval` outside development and adding object, base URI, form action, frame ancestor, and worker restrictions.
- **fix(cli):** Replace shell-interpolated setup and privileged command execution paths with argument-based `spawn`/`execFile` helpers for database setup, Tailscale sudo commands, MITM DNS edits, and certificate install/uninstall flows.
- **fix(ui):** Keep provider icons resilient by using direct `@lobehub/icons` components first, then local PNG/SVG fallbacks, avoiding the `@lobehub/ui` peer runtime in the dashboard.

- **fix(models) #380**: `GET /api/models` now includes provider aliases when building the active-provider filter — models for `claude` (alias `cc`) and `github` (alias `gh`) were always shown regardless of whether a connection was configured, because `PROVIDER_MODELS` keys are aliases but DB connections are stored under provider IDs. Fixed by expanding each active provider ID to also include its alias via `PROVIDER_ID_TO_ALIAS`. Closes #353.
- **fix(electron) #379**: New `scripts/prepare-electron-standalone.mjs` stages a dedicated `/.next/electron-standalone` bundle before Electron packaging. Aborts with a clear error if `node_modules` is a symlink (electron-builder would ship a runtime dependency on the build machine). Cross-platform path sanitization via `path.basename`. By @kfiramar.

### ✨ New Features

- **feat(providers):** Implement Image Generation and Editing capabilities for ChatGPT Web, including in-band chat image generation and caching (#1606).
- **feat(ui):** Integrate OpenCode Zen/Go API tool logo SVG and polish API key copy-to-clipboard interactions (#1607).

- **feat(providers):** Integrate AgentRouter as a new OpenAI-compatible passthrough provider with $200 free credits via sign-up (Issue #1572).
- **feat(ui):** Implement on-demand per-model testing in the provider dashboard, allowing single-token diagnostic checks without triggering rate-limits (Issue #1532).

- **feat(kiro) #381**: Kiro credit balance tracking — usage endpoint now returns credit data for Kiro accounts by calling `codewhisperer.us-east-1.amazonaws.com/getUserCredits` (same endpoint Kiro IDE uses internally). Returns remaining credits, total allowance, renewal date, and subscription tier. Closes #337.

## [2.5.4] - 2026-03-15

> Logger startup fix, login bootstrap security fix, and dev HMR reliability improvement. CI infrastructure hardened.

### 🐛 Bug Fixes (PRs #374, #375, #376 by @kfiramar)

- **fix(mitm):** Compile MITM utilities as NodeNext ESM during prepublish, copy the CommonJS MITM server into the standalone artifact, and resolve MITM data paths without relying on Next.js aliases in packaged runtime.
- **fix(build):** Move the local `.tmp/wine32` Wine prefix out of the isolated Next.js build path so Windows Electron packaging artifacts cannot trigger `EACCES` scans during Node 24 builds.
- **fix(build):** Copy the `wreq-js` native runtime directory into the isolated Next.js standalone output so packaged Playwright/E2E starts can load the instrumentation hook on Linux.
- **fix(api):** Validate the Codex Responses websocket bridge and `/v1/batches` JSON payloads with Zod before use, keeping `request.json()` route validation green and returning explicit 400 responses for invalid bodies.
- **fix(providers):** Add explicit typing to provider alias and category helpers so the strict `typecheck:noimplicit:core` CI gate passes.
- **fix(ui):** Keep the upstream proxy provider detail page labeled with a fallback "Managed via Upstream Proxy Settings" management surface when translations are unavailable.
- **fix(electron):** Harden the production desktop CSP by removing `unsafe-eval` outside development and adding object, base URI, form action, frame ancestor, and worker restrictions.
- **fix(cli):** Replace shell-interpolated setup and privileged command execution paths with argument-based `spawn`/`execFile` helpers for database setup, Tailscale sudo commands, MITM DNS edits, and certificate install/uninstall flows.
- **fix(ui):** Keep provider icons resilient by using direct `@lobehub/icons` components first, then local PNG/SVG fallbacks, avoiding the `@lobehub/ui` peer runtime in the dashboard.

- **fix(logger) #376**: Restore pino transport logger path — `formatters.level` combined with `transport.targets` is rejected by pino. Transport-backed configs now strip the level formatter via `getTransportCompatibleConfig()`. Also corrects numeric level mapping in `/api/logs/console`: `30→info, 40→warn, 50→error` (was shifted by one).
- **fix(login) #375**: Login page now bootstraps from the public `/api/settings/require-login` endpoint instead of the protected `/api/settings`. In password-protected setups, the pre-auth page was receiving a 401 and falling back to safe defaults unnecessarily. The public route now returns all bootstrap metadata (`requireLogin`, `hasPassword`, `setupComplete`) with a conservative 200 fallback on error.
- **fix(dev) #374**: Add `localhost` and `127.0.0.1` to `allowedDevOrigins` in `next.config.mjs` — HMR websocket was blocked when accessing the app via loopback address, producing repeated cross-origin warnings.

### 🔧 CI & Infrastructure

- **ESLint OOM fix**: `eslint.config.mjs` now ignores `vscode-extension/**`, `electron/**`, `docs/**`, `app/.next/**`, and `clipr/**` — ESLint was crashing with a JS heap OOM by scanning VS Code binary blobs and compiled chunks.
- **Unit test fix**: Removed stale `ALTER TABLE provider_connections ADD COLUMN "group"` from 2 test files — column is now part of the base schema (added in #373), causing `SQLITE_ERROR: duplicate column name` on every CI run.
- **Pre-commit hook**: Added `npm run test:unit` to `.husky/pre-commit` — unit tests now block broken commits before they reach CI.

## [2.5.3] - 2026-03-14

> Critical bugfixes: DB schema migration, startup env loading, provider error state clearing, and i18n tooltip fix. Code quality improvements on top of each PR.

### 🐛 Bug Fixes (PRs #369, #371, #372, #373 by @kfiramar)

- **fix(mitm):** Compile MITM utilities as NodeNext ESM during prepublish, copy the CommonJS MITM server into the standalone artifact, and resolve MITM data paths without relying on Next.js aliases in packaged runtime.
- **fix(build):** Move the local `.tmp/wine32` Wine prefix out of the isolated Next.js build path so Windows Electron packaging artifacts cannot trigger `EACCES` scans during Node 24 builds.
- **fix(build):** Copy the `wreq-js` native runtime directory into the isolated Next.js standalone output so packaged Playwright/E2E starts can load the instrumentation hook on Linux.
- **fix(api):** Validate the Codex Responses websocket bridge and `/v1/batches` JSON payloads with Zod before use, keeping `request.json()` route validation green and returning explicit 400 responses for invalid bodies.
- **fix(providers):** Add explicit typing to provider alias and category helpers so the strict `typecheck:noimplicit:core` CI gate passes.
- **fix(ui):** Keep the upstream proxy provider detail page labeled with a fallback "Managed via Upstream Proxy Settings" management surface when translations are unavailable.
- **fix(electron):** Harden the production desktop CSP by removing `unsafe-eval` outside development and adding object, base URI, form action, frame ancestor, and worker restrictions.
- **fix(cli):** Replace shell-interpolated setup and privileged command execution paths with argument-based `spawn`/`execFile` helpers for database setup, Tailscale sudo commands, MITM DNS edits, and certificate install/uninstall flows.
- **fix(ui):** Keep provider icons resilient by using direct `@lobehub/icons` components first, then local PNG/SVG fallbacks, avoiding the `@lobehub/ui` peer runtime in the dashboard.

- **fix(db) #373**: Add `provider_connections.group` column to base schema + backfill migration for existing databases — column was used in all queries but missing from schema definition
- **fix(i18n) #371**: Replace non-existent `t("deleteConnection")` key with existing `providers.delete` key — fixes `MISSING_MESSAGE: providers.deleteConnection` runtime error on provider detail page
- **fix(auth) #372**: Clear stale error metadata (`errorCode`, `lastErrorType`, `lastErrorSource`) from provider accounts after genuine recovery — previously, recovered accounts kept appearing as failed
- **fix(startup) #369**: Unify env loading across `npm run start`, `run-standalone.mjs`, and Electron to respect `DATA_DIR/.env → ~/.omniroute/.env → ./.env` priority — prevents generating a new `STORAGE_ENCRYPTION_KEY` over an existing encrypted database

### 🔧 Code Quality

- Documented `result.success` vs `response?.ok` patterns in `auth.ts` (both intentional, now explained)
- Normalized `overridePath?.trim()` in `electron/main.js` to match `bootstrap-env.mjs`
- Added `preferredEnv` merge order comment in Electron startup

> Codex account quota policy with auto-rotation, fast tier toggle, gpt-5.4 model, and analytics label fix.

### ✨ New Features (PRs #366, #367, #368)

- **feat(providers):** Implement Image Generation and Editing capabilities for ChatGPT Web, including in-band chat image generation and caching (#1606).
- **feat(ui):** Integrate OpenCode Zen/Go API tool logo SVG and polish API key copy-to-clipboard interactions (#1607).

- **feat(providers):** Integrate AgentRouter as a new OpenAI-compatible passthrough provider with $200 free credits via sign-up (Issue #1572).
- **feat(ui):** Implement on-demand per-model testing in the provider dashboard, allowing single-token diagnostic checks without triggering rate-limits (Issue #1532).

- **Codex Quota Policy (PR #366)**: Per-account 5h/weekly quota window toggles in Provider dashboard. Accounts are automatically skipped when enabled windows reach 90% threshold and re-admitted after `resetAt`. Includes `quotaCache.ts` with side-effect free status getter.
- **Codex Fast Tier Toggle (PR #367)**: Dashboard → Settings → Codex Service Tier. Default-off toggle injects `service_tier: "flex"` only for Codex requests, reducing cost ~80%. Full stack: UI tab + API endpoint + executor + translator + startup restore.
- **gpt-5.4 Model (PR #368)**: Adds `cx/gpt-5.4` and `codex/gpt-5.4` to the Codex model registry. Regression test included.

### 🐛 Bug Fixes

- **fix(mitm):** Compile MITM utilities as NodeNext ESM during prepublish, copy the CommonJS MITM server into the standalone artifact, and resolve MITM data paths without relying on Next.js aliases in packaged runtime.
- **fix(build):** Move the local `.tmp/wine32` Wine prefix out of the isolated Next.js build path so Windows Electron packaging artifacts cannot trigger `EACCES` scans during Node 24 builds.
- **fix(build):** Copy the `wreq-js` native runtime directory into the isolated Next.js standalone output so packaged Playwright/E2E starts can load the instrumentation hook on Linux.
- **fix(api):** Validate the Codex Responses websocket bridge and `/v1/batches` JSON payloads with Zod before use, keeping `request.json()` route validation green and returning explicit 400 responses for invalid bodies.
- **fix(providers):** Add explicit typing to provider alias and category helpers so the strict `typecheck:noimplicit:core` CI gate passes.
- **fix(ui):** Keep the upstream proxy provider detail page labeled with a fallback "Managed via Upstream Proxy Settings" management surface when translations are unavailable.
- **fix(electron):** Harden the production desktop CSP by removing `unsafe-eval` outside development and adding object, base URI, form action, frame ancestor, and worker restrictions.
- **fix(cli):** Replace shell-interpolated setup and privileged command execution paths with argument-based `spawn`/`execFile` helpers for database setup, Tailscale sudo commands, MITM DNS edits, and certificate install/uninstall flows.
- **fix(ui):** Keep provider icons resilient by using direct `@lobehub/icons` components first, then local PNG/SVG fallbacks, avoiding the `@lobehub/ui` peer runtime in the dashboard.

- **fix #356**: Analytics charts (Top Provider, By Account, Provider Breakdown) now display human-readable provider names/labels instead of raw internal IDs for OpenAI-compatible providers.

> Major release: strict-random routing strategy, API key access controls, connection groups, external pricing sync, and critical bug fixes for thinking models, combo testing, and tool name validation.

### ✨ New Features (PRs #363 & #365)

- **feat(providers):** Implement Image Generation and Editing capabilities for ChatGPT Web, including in-band chat image generation and caching (#1606).
- **feat(ui):** Integrate OpenCode Zen/Go API tool logo SVG and polish API key copy-to-clipboard interactions (#1607).

- **feat(providers):** Integrate AgentRouter as a new OpenAI-compatible passthrough provider with $200 free credits via sign-up (Issue #1572).
- **feat(ui):** Implement on-demand per-model testing in the provider dashboard, allowing single-token diagnostic checks without triggering rate-limits (Issue #1532).

- **Strict-Random Routing Strategy**: Fisher-Yates shuffle deck with anti-repeat guarantee and mutex serialization for concurrent requests. Independent decks per combo and per provider.
- **API Key Access Controls**: `allowedConnections` (restrict which connections a key can use), `is_active` (enable/disable key with 403), `accessSchedule` (time-based access control), `autoResolve` toggle, rename keys via PATCH.
- **Connection Groups**: Group provider connections by environment. Accordion view in Limits page with localStorage persistence and smart auto-switch.
- **External Pricing Sync (LiteLLM)**: 3-tier pricing resolution (user overrides → synced → defaults). Opt-in via `PRICING_SYNC_ENABLED=true`. MCP tool `omniroute_sync_pricing`. 23 new tests.
- **i18n**: 30 languages updated with strict-random strategy, API key management strings. pt-BR fully translated.

### 🐛 Bug Fixes

- **fix(mitm):** Compile MITM utilities as NodeNext ESM during prepublish, copy the CommonJS MITM server into the standalone artifact, and resolve MITM data paths without relying on Next.js aliases in packaged runtime.
- **fix(build):** Move the local `.tmp/wine32` Wine prefix out of the isolated Next.js build path so Windows Electron packaging artifacts cannot trigger `EACCES` scans during Node 24 builds.
- **fix(build):** Copy the `wreq-js` native runtime directory into the isolated Next.js standalone output so packaged Playwright/E2E starts can load the instrumentation hook on Linux.
- **fix(api):** Validate the Codex Responses websocket bridge and `/v1/batches` JSON payloads with Zod before use, keeping `request.json()` route validation green and returning explicit 400 responses for invalid bodies.
- **fix(providers):** Add explicit typing to provider alias and category helpers so the strict `typecheck:noimplicit:core` CI gate passes.
- **fix(ui):** Keep the upstream proxy provider detail page labeled with a fallback "Managed via Upstream Proxy Settings" management surface when translations are unavailable.
- **fix(electron):** Harden the production desktop CSP by removing `unsafe-eval` outside development and adding object, base URI, form action, frame ancestor, and worker restrictions.
- **fix(cli):** Replace shell-interpolated setup and privileged command execution paths with argument-based `spawn`/`execFile` helpers for database setup, Tailscale sudo commands, MITM DNS edits, and certificate install/uninstall flows.
- **fix(ui):** Keep provider icons resilient by using direct `@lobehub/icons` components first, then local PNG/SVG fallbacks, avoiding the `@lobehub/ui` peer runtime in the dashboard.

- **fix #355**: Stream idle timeout increased from 60s to 300s — prevents aborting extended-thinking models (claude-opus-4-6, o3, etc.) during long reasoning phases. Configurable via `STREAM_IDLE_TIMEOUT_MS`.
- **fix #350**: Combo test now bypasses `REQUIRE_API_KEY=true` using internal header, and uses OpenAI-compatible format universally. Timeout extended from 15s to 20s.
- **fix #346**: Tools with empty `function.name` (forwarded by Claude Code) are now filtered before upstream providers receive them, preventing "Invalid input[N].name: empty string" errors.

### 🗑️ Closed Issues

- **#341**: Debug section removed — replacement is `/dashboard/logs` and `/dashboard/health`.

> API Key Round-Robin support for multi-key provider setups, and confirmation of wildcard routing and quota window rolling already in place.

### ✨ New Features

- **feat(providers):** Implement Image Generation and Editing capabilities for ChatGPT Web, including in-band chat image generation and caching (#1606).
- **feat(ui):** Integrate OpenCode Zen/Go API tool logo SVG and polish API key copy-to-clipboard interactions (#1607).

- **feat(providers):** Integrate AgentRouter as a new OpenAI-compatible passthrough provider with $200 free credits via sign-up (Issue #1572).
- **feat(ui):** Implement on-demand per-model testing in the provider dashboard, allowing single-token diagnostic checks without triggering rate-limits (Issue #1532).

- **API Key Round-Robin (T07)**: Provider connections can now hold multiple API keys (Edit Connection → Extra API Keys). Requests rotate round-robin between primary + extra keys via `providerSpecificData.extraApiKeys[]`. Keys are held in-memory indexed per connection — no DB schema changes required.

### 📝 Already Implemented (confirmed in audit)

- **Wildcard Model Routing (T13)**: `wildcardRouter.ts` with glob-style wildcard matching (`gpt*`, `claude-?-sonnet`, etc.) is already integrated into `model.ts` with specificity ranking.
- **Quota Window Rolling (T08)**: `accountFallback.ts:isModelLocked()` already auto-advances the window — if `Date.now() > entry.until`, lock is deleted immediately (no stale blocking).

> UI polish, routing strategy additions, and graceful error handling for usage limits.

### ✨ New Features

- **feat(providers):** Implement Image Generation and Editing capabilities for ChatGPT Web, including in-band chat image generation and caching (#1606).
- **feat(ui):** Integrate OpenCode Zen/Go API tool logo SVG and polish API key copy-to-clipboard interactions (#1607).

- **feat(providers):** Integrate AgentRouter as a new OpenAI-compatible passthrough provider with $200 free credits via sign-up (Issue #1572).
- **feat(ui):** Implement on-demand per-model testing in the provider dashboard, allowing single-token diagnostic checks without triggering rate-limits (Issue #1532).

- **Fill-First & P2C Routing Strategies**: Added `fill-first` (drain quota before moving on) and `p2c` (Power-of-Two-Choices low-latency selection) to combo strategy picker, with full guidance panels and color-coded badges.
- **Free Stack Preset Models**: Creating a combo with the Free Stack template now auto-fills 7 best-in-class free provider models (Gemini CLI, Kiro, Qoder×2, Qwen, NVIDIA NIM, Groq). Users just activate the providers and get a $0/month combo out-of-the-box.
- **Wider Combo Modal**: Create/Edit combo modal now uses `max-w-4xl` for comfortable editing of large combos.

### 🐛 Bug Fixes

- **fix(mitm):** Compile MITM utilities as NodeNext ESM during prepublish, copy the CommonJS MITM server into the standalone artifact, and resolve MITM data paths without relying on Next.js aliases in packaged runtime.
- **fix(build):** Move the local `.tmp/wine32` Wine prefix out of the isolated Next.js build path so Windows Electron packaging artifacts cannot trigger `EACCES` scans during Node 24 builds.
- **fix(build):** Copy the `wreq-js` native runtime directory into the isolated Next.js standalone output so packaged Playwright/E2E starts can load the instrumentation hook on Linux.
- **fix(api):** Validate the Codex Responses websocket bridge and `/v1/batches` JSON payloads with Zod before use, keeping `request.json()` route validation green and returning explicit 400 responses for invalid bodies.
- **fix(providers):** Add explicit typing to provider alias and category helpers so the strict `typecheck:noimplicit:core` CI gate passes.
- **fix(ui):** Keep the upstream proxy provider detail page labeled with a fallback "Managed via Upstream Proxy Settings" management surface when translations are unavailable.
- **fix(electron):** Harden the production desktop CSP by removing `unsafe-eval` outside development and adding object, base URI, form action, frame ancestor, and worker restrictions.
- **fix(cli):** Replace shell-interpolated setup and privileged command execution paths with argument-based `spawn`/`execFile` helpers for database setup, Tailscale sudo commands, MITM DNS edits, and certificate install/uninstall flows.
- **fix(ui):** Keep provider icons resilient by using direct `@lobehub/icons` components first, then local PNG/SVG fallbacks, avoiding the `@lobehub/ui` peer runtime in the dashboard.

- **Limits page HTTP 500 for Codex & GitHub**: `getCodexUsage()` and `getGitHubUsage()` now return a user-friendly message when the provider returns 401/403 (expired token), instead of throwing and causing a 500 error on the Limits page.
- **MaintenanceBanner false-positive**: Banner no longer shows "Server is unreachable" spuriously on page load. Fixed by calling `checkHealth()` immediately on mount and removing stale `show`-state closure.
- **Provider icon tooltips**: Edit (pencil) and delete icon buttons in the provider connection row now have native HTML tooltips — all 6 action icons are now self-documented.

> Multiple improvements from community issue analysis, new provider support, bug fixes for token tracking, model routing, and streaming reliability.

### ✨ New Features

- **feat(providers):** Implement Image Generation and Editing capabilities for ChatGPT Web, including in-band chat image generation and caching (#1606).
- **feat(ui):** Integrate OpenCode Zen/Go API tool logo SVG and polish API key copy-to-clipboard interactions (#1607).

- **feat(providers):** Integrate AgentRouter as a new OpenAI-compatible passthrough provider with $200 free credits via sign-up (Issue #1572).
- **feat(ui):** Implement on-demand per-model testing in the provider dashboard, allowing single-token diagnostic checks without triggering rate-limits (Issue #1532).

- **Task-Aware Smart Routing (T05)**: Automatic model selection based on request content type — coding → deepseek-chat, analysis → gemini-2.5-pro, vision → gpt-4o, summarization → gemini-2.5-flash. Configurable via Settings. New `GET/PUT/POST /api/settings/task-routing` API.
- **HuggingFace Provider**: Added HuggingFace Router as an OpenAI-compatible provider with Llama 3.1 70B/8B, Qwen 2.5 72B, Mistral 7B, Phi-3.5 Mini.
- **Vertex AI Provider**: Added Vertex AI (Google Cloud) provider with Gemini 2.5 Pro/Flash, Gemma 2 27B, Claude via Vertex.
- **Playground File Uploads**: Audio upload for transcription, image upload for vision models (auto-detect by model name), inline image rendering for image generation results.
- **Model Select Visual Feedback**: Already-added models in combo picker now show ✓ green badge — prevents duplicate confusion.
- **Qwen Compatibility (PR #352)**: Updated User-Agent and CLI fingerprint settings for Qwen provider compatibility.
- **Round-Robin State Management (PR #349)**: Enhanced round-robin logic to handle excluded accounts and maintain rotation state correctly.
- **Clipboard UX (PR #360)**: Hardened clipboard operations with fallback for non-secure contexts; Claude tool normalization improvements.

### 🐛 Bug Fixes

- **fix(mitm):** Compile MITM utilities as NodeNext ESM during prepublish, copy the CommonJS MITM server into the standalone artifact, and resolve MITM data paths without relying on Next.js aliases in packaged runtime.
- **fix(build):** Move the local `.tmp/wine32` Wine prefix out of the isolated Next.js build path so Windows Electron packaging artifacts cannot trigger `EACCES` scans during Node 24 builds.
- **fix(build):** Copy the `wreq-js` native runtime directory into the isolated Next.js standalone output so packaged Playwright/E2E starts can load the instrumentation hook on Linux.
- **fix(api):** Validate the Codex Responses websocket bridge and `/v1/batches` JSON payloads with Zod before use, keeping `request.json()` route validation green and returning explicit 400 responses for invalid bodies.
- **fix(providers):** Add explicit typing to provider alias and category helpers so the strict `typecheck:noimplicit:core` CI gate passes.
- **fix(ui):** Keep the upstream proxy provider detail page labeled with a fallback "Managed via Upstream Proxy Settings" management surface when translations are unavailable.
- **fix(electron):** Harden the production desktop CSP by removing `unsafe-eval` outside development and adding object, base URI, form action, frame ancestor, and worker restrictions.
- **fix(cli):** Replace shell-interpolated setup and privileged command execution paths with argument-based `spawn`/`execFile` helpers for database setup, Tailscale sudo commands, MITM DNS edits, and certificate install/uninstall flows.
- **fix(ui):** Keep provider icons resilient by using direct `@lobehub/icons` components first, then local PNG/SVG fallbacks, avoiding the `@lobehub/ui` peer runtime in the dashboard.

- **Fix #302 — OpenAI SDK stream=False drops tool_calls**: T01 Accept header negotiation no longer forces streaming when `body.stream` is explicitly `false`. Was causing tool_calls to be silently dropped when using the OpenAI Python SDK in non-streaming mode.
- **Fix #73 — Claude Haiku routed to OpenAI without provider prefix**: `claude-*` models sent without a provider prefix now correctly route to the `antigravity` (Anthropic) provider. Added `gemini-*`/`gemma-*` → `gemini` heuristic as well.
- **Fix #74 — Token counts always 0 for Antigravity/Claude streaming**: The `message_start` SSE event which carries `input_tokens` was not being parsed by `extractUsage()`, causing all input token counts to drop. Input/output token tracking now works correctly for streaming responses.
- **Fix #180 — Model import duplicates with no feedback**: `ModelSelectModal` now shows ✓ green highlight for models already in the combo, making it obvious they're already added.
- **Media page generation errors**: Image results now render as `<img>` tags instead of raw JSON. Transcription results shown as readable text. Credential errors show an amber banner instead of silent failure.
- **Token refresh button on provider page**: Manual token refresh UI added for OAuth providers.

### 🔧 Improvements

- **Provider Registry**: HuggingFace and Vertex AI added to `providerRegistry.ts` and `providers.ts` (frontend).
- **Read Cache**: New `src/lib/db/readCache.ts` for efficient DB read caching.
- **Quota Cache**: Improved quota cache with TTL-based eviction.

### 📦 Dependencies

- `dompurify` → 3.3.3 (PR #347)
- `undici` → 7.24.2 (PR #348, #361)
- `docker/setup-qemu-action` → v4 (PR #342)
- `docker/setup-buildx-action` → v4 (PR #343)

### 📁 New Files

| File                                          | Purpose                                 |
| --------------------------------------------- | --------------------------------------- |
| `open-sse/services/taskAwareRouter.ts`        | Task-aware routing logic (7 task types) |
| `src/app/api/settings/task-routing/route.ts`  | Task routing config API                 |
| `src/app/api/providers/[id]/refresh/route.ts` | Manual OAuth token refresh              |
| `src/lib/db/readCache.ts`                     | Efficient DB read cache                 |
| `src/shared/utils/clipboard.ts`               | Hardened clipboard with fallback        |

## [2.4.1] - 2026-03-13

### 🐛 Fix

- **Combos modal: Free Stack visible and prominent** — Free Stack template was hidden (4th in 3-column grid). Fixed: moved to position 1, switched to 2x2 grid so all 4 templates are visible, green border + FREE badge highlight.

## [2.4.0] - 2026-03-13

> **Major release** — Free Stack ecosystem, transcription playground overhaul, 44+ providers, comprehensive free tier documentation, and UI improvements across the board.

### Funktionen

- **Combos: Free Stack template** — New 4th template "Free Stack ($0)" using round-robin across Kiro + Qoder + Qwen + Gemini CLI. Suggests the pre-built zero-cost combo on first use.
- **Media/Transcription: Deepgram as default** — Deepgram (Nova 3, $200 free) is now the default transcription provider. AssemblyAI ($50 free) and Groq Whisper (free forever) shown with free credit badges.
- **README: "Start Free" section** — New early-README 5-step table showing how to set up zero-cost AI in minutes.
- **README: Free Transcription Combo** — New section with Deepgram/AssemblyAI/Groq combo suggestion and per-provider free credit details.
- **providers.ts: hasFree flag** — NVIDIA NIM, Cerebras, and Groq marked with hasFree badge and freeNote for the providers UI.
- **i18n: templateFreeStack keys** — Free Stack combo template translated and synced to all 30 languages.

## [2.3.16] - 2026-03-13

### Dokumentation

- **README: 44+ Providers** — Updated all 3 occurrences of "36+ providers" to "44+" reflecting the actual codebase count (44 providers in providers.ts)
- **README: New Section "🆓 Free Models — What You Actually Get"** — Added 7-provider table with per-model rate limits for: Kiro (Claude unlimited via AWS Builder ID), Qoder (5 models unlimited), Qwen (4 models unlimited), Gemini CLI (180K/mo), NVIDIA NIM (~40 RPM dev-forever), Cerebras (1M tok/day / 60K TPM), Groq (30 RPM / 14.4K RPD). Includes the \/usr/bin/bash Ultimate Free Stack combo recommendation.
- **README: Pricing Table Updated** — Added Cerebras to API KEY tier, fixed NVIDIA from "1000 credits" to "dev-forever free", updated Qoder/Qwen model counts and names
- **README: Qoder 8→5 models** (named: kimi-k2-thinking, qwen3-coder-plus, deepseek-r1, minimax-m2, kimi-k2)
- **README: Qwen 3→4 models** (named: qwen3-coder-plus, qwen3-coder-flash, qwen3-coder-next, vision-model)

## [2.3.15] - 2026-03-13

### Funktionen

- **Auto-Combo Dashboard (Tier Priority)**: Added `🏷️ Tier` as the 7th scoring factor label in the `/dashboard/auto-combo` factor breakdown display — all 7 Auto-Combo scoring factors are now visible.
- **i18n — autoCombo section**: Added 20 new translation keys for the Auto-Combo dashboard (`title`, `status`, `modePack`, `providerScores`, `factorTierPriority`, etc.) to all 30 language files.

## [2.3.14] - 2026-03-13

### 🐛 Bug Fixes

- **fix(mitm):** Compile MITM utilities as NodeNext ESM during prepublish, copy the CommonJS MITM server into the standalone artifact, and resolve MITM data paths without relying on Next.js aliases in packaged runtime.
- **fix(build):** Move the local `.tmp/wine32` Wine prefix out of the isolated Next.js build path so Windows Electron packaging artifacts cannot trigger `EACCES` scans during Node 24 builds.
- **fix(build):** Copy the `wreq-js` native runtime directory into the isolated Next.js standalone output so packaged Playwright/E2E starts can load the instrumentation hook on Linux.
- **fix(api):** Validate the Codex Responses websocket bridge and `/v1/batches` JSON payloads with Zod before use, keeping `request.json()` route validation green and returning explicit 400 responses for invalid bodies.
- **fix(providers):** Add explicit typing to provider alias and category helpers so the strict `typecheck:noimplicit:core` CI gate passes.
- **fix(ui):** Keep the upstream proxy provider detail page labeled with a fallback "Managed via Upstream Proxy Settings" management surface when translations are unavailable.
- **fix(electron):** Harden the production desktop CSP by removing `unsafe-eval` outside development and adding object, base URI, form action, frame ancestor, and worker restrictions.
- **fix(cli):** Replace shell-interpolated setup and privileged command execution paths with argument-based `spawn`/`execFile` helpers for database setup, Tailscale sudo commands, MITM DNS edits, and certificate install/uninstall flows.
- **fix(ui):** Keep provider icons resilient by using direct `@lobehub/icons` components first, then local PNG/SVG fallbacks, avoiding the `@lobehub/ui` peer runtime in the dashboard.

- **Qoder OAuth (#339)**: Restored the valid default `clientSecret` — was previously an empty string, causing "Bad client credentials" on every connect attempt. The public credential is now the default fallback (overridable via `QODER_OAUTH_CLIENT_SECRET` env var).
- **MITM server not found (#335)**: `prepublish.mjs` now compiles `src/mitm/*.ts` to JavaScript using `tsc` before copying to the npm bundle. Previously only raw `.ts` files were copied — meaning `server.js` never existed in npm/Volta global installs.
- **GeminiCLI missing projectId (#338)**: Instead of throwing a hard 500 error when `projectId` is missing from stored credentials (e.g. after Docker restart), OmniRoute now logs a warning and attempts the request — returning a meaningful provider-side error instead of an OmniRoute crash.
- **Electron version mismatch (#323)**: Synced `electron/package.json` version to `2.3.13` (was `2.0.13`) so the desktop binary version matches the npm package.

### ✨ New Models (#334)

- **Kiro**: `claude-sonnet-4`, `claude-opus-4.6`, `deepseek-v3.2`, `minimax-m2.1`, `qwen3-coder-next`, `auto`
- **Codex**: `gpt5.4`

### 🔧 Improvements

- **Tier Scoring (API + Validation)**: Added `tierPriority` (weight `0.05`) to the `ScoringWeights` Zod schema and the `combos/auto` API route — the 7th scoring factor is now fully accepted by the REST API and validated on input. `stability` weight adjusted from `0.10` to `0.05` to keep total sum = `1.0`.

### ✨ New Features

- **feat(providers):** Implement Image Generation and Editing capabilities for ChatGPT Web, including in-band chat image generation and caching (#1606).
- **feat(ui):** Integrate OpenCode Zen/Go API tool logo SVG and polish API key copy-to-clipboard interactions (#1607).

- **feat(providers):** Integrate AgentRouter as a new OpenAI-compatible passthrough provider with $200 free credits via sign-up (Issue #1572).
- **feat(ui):** Implement on-demand per-model testing in the provider dashboard, allowing single-token diagnostic checks without triggering rate-limits (Issue #1532).

- **Tiered Quota Scoring (Auto-Combo)**: Added `tierPriority` as a 7th scoring factor — accounts with Ultra/Pro tiers are now preferred over Free tiers when other factors are equal. New optional fields `accountTier` and `quotaResetIntervalSecs` on `ProviderCandidate`. All 4 mode packs updated (`ship-fast`, `cost-saver`, `quality-first`, `offline-friendly`).
- **Intra-Family Model Fallback (T5)**: When a model is unavailable (404/400/403), OmniRoute now automatically falls back to sibling models from the same family before returning an error (`modelFamilyFallback.ts`).
- **Configurable API Bridge Timeout**: `API_BRIDGE_PROXY_TIMEOUT_MS` env var lets operators tune the proxy timeout (default 30s). Fixes 504 errors on slow upstream responses. (#332)
- **Star History**: Replaced star-history.com widget with starchart.cc (`?variant=adaptive`) in all 30 READMEs — adapts to light/dark theme, real-time updates.

### 🐛 Bug Fixes

- **fix(mitm):** Compile MITM utilities as NodeNext ESM during prepublish, copy the CommonJS MITM server into the standalone artifact, and resolve MITM data paths without relying on Next.js aliases in packaged runtime.
- **fix(build):** Move the local `.tmp/wine32` Wine prefix out of the isolated Next.js build path so Windows Electron packaging artifacts cannot trigger `EACCES` scans during Node 24 builds.
- **fix(build):** Copy the `wreq-js` native runtime directory into the isolated Next.js standalone output so packaged Playwright/E2E starts can load the instrumentation hook on Linux.
- **fix(api):** Validate the Codex Responses websocket bridge and `/v1/batches` JSON payloads with Zod before use, keeping `request.json()` route validation green and returning explicit 400 responses for invalid bodies.
- **fix(providers):** Add explicit typing to provider alias and category helpers so the strict `typecheck:noimplicit:core` CI gate passes.
- **fix(ui):** Keep the upstream proxy provider detail page labeled with a fallback "Managed via Upstream Proxy Settings" management surface when translations are unavailable.
- **fix(electron):** Harden the production desktop CSP by removing `unsafe-eval` outside development and adding object, base URI, form action, frame ancestor, and worker restrictions.
- **fix(cli):** Replace shell-interpolated setup and privileged command execution paths with argument-based `spawn`/`execFile` helpers for database setup, Tailscale sudo commands, MITM DNS edits, and certificate install/uninstall flows.
- **fix(ui):** Keep provider icons resilient by using direct `@lobehub/icons` components first, then local PNG/SVG fallbacks, avoiding the `@lobehub/ui` peer runtime in the dashboard.

- **Auth — First-time password**: `INITIAL_PASSWORD` env var is now accepted when setting the first dashboard password. Uses `timingSafeEqual` for constant-time comparison, preventing timing attacks. (#333)
- **README Truncation**: Fixed a missing `</details>` closing tag in the Troubleshooting section that caused GitHub to stop rendering everything below it (Tech Stack, Docs, Roadmap, Contributors).
- **pnpm install**: Removed redundant `@swc/helpers` override from `package.json` that conflicted with the direct dependency, causing `EOVERRIDE` errors on pnpm. Added `pnpm.onlyBuiltDependencies` config.
- **CLI Path Injection (T12)**: Added `isSafePath()` validator in `cliRuntime.ts` to block path traversal and shell metacharacters in `CLI_*_BIN` env vars.
- **CI**: Regenerated `package-lock.json` after override removal to fix `npm ci` failures on GitHub Actions.

### 🔧 Improvements

- **Response Format (T1)**: `response_format` (json_schema/json_object) now injected as a system prompt for Claude, enabling structured output compatibility.
- **429 Retry (T2)**: Intra-URL retry for 429 responses (2× attempts with 2s delay) before falling back to next URL.
- **Gemini CLI Headers (T3)**: Added `User-Agent` and `X-Goog-Api-Client` fingerprint headers for Gemini CLI compatibility.
- **Pricing Catalog (T9)**: Added `deepseek-3.1`, `deepseek-3.2`, and `qwen3-coder-next` pricing entries.

### 📁 New Files

| File                                       | Purpose                                                  |
| ------------------------------------------ | -------------------------------------------------------- |
| `open-sse/services/modelFamilyFallback.ts` | Model family definitions and intra-family fallback logic |

### Fixed

- **KiloCode**: kilocode healthcheck timeout already fixed in v2.3.11
- **OpenCode**: Add opencode to cliRuntime registry with 15s healthcheck timeout
- **OpenClaw / Cursor**: Increase healthcheck timeout to 15s for slow-start variants
- **VPS**: Install droid and openclaw npm packages; activate CLI_EXTRA_PATHS for kiro-cli
- **cliRuntime**: Add opencode tool registration and increase timeout for continue

## [2.3.11] - 2026-03-12

### Fixed

- **KiloCode healthcheck**: Increase `healthcheckTimeoutMs` from 4000ms to 15000ms — kilocode renders an ASCII logo banner on startup causing false `healthcheck_failed` on slow/cold-start environments

## [2.3.10] - 2026-03-12

### Fixed

- **Lint**: Fix `check:any-budget:t11` failure — replace `as any` with `as Record<string, unknown>` in OAuthModal.tsx (3 occurrences)

### Docs

- **CLI-TOOLS.md**: Complete guide for all 11 CLI tools (claude, codex, gemini, opencode, cline, kilocode, continue, kiro-cli, cursor, droid, openclaw)
- **i18n**: CLI-TOOLS.md synced to 30 languages with translated title + intro

## [2.3.8] - 2026-03-12

## [2.3.9] - 2026-03-12

### Added

- **/v1/completions**: New legacy OpenAI completions endpoint — accepts both `prompt` string and `messages` array, normalizes to chat format automatically
- **EndpointPage**: Now shows all 3 OpenAI-compatible endpoint types: Chat Completions, Responses API, and Legacy Completions
- **i18n**: Added `completionsLegacy/completionsLegacyDesc` to 30 language files

### Fixed

- **OAuthModal**: Fix `[object Object]` displayed on all OAuth connection errors — properly extract `.message` from error response objects in all 3 `throw new Error(data.error)` calls (exchange, device-code, authorize)
- Affects Cline, Codex, GitHub, Qwen, Kiro, and all other OAuth providers

## [2.3.7] - 2026-03-12

### Fixed

- **Cline OAuth**: Add `decodeURIComponent` before base64 decode so URL-encoded auth codes from the callback URL are parsed correctly, fixing "invalid or expired authorization code" errors on remote (LAN IP) setups
- **Cline OAuth**: `mapTokens` now populates `name = firstName + lastName || email` so Cline accounts show real user names instead of "Account #ID"
- **OAuth account names**: All OAuth exchange flows (exchange, poll, poll-callback) now normalize `name = email` when name is missing, so every OAuth account shows its email as the display label in the Providers dashboard
- **OAuth account names**: Removed sequential "Account N" fallback in `db/providers.ts` — accounts with no email/name now use a stable ID-based label via `getAccountDisplayName()` instead of a sequential number that changes when accounts are deleted

## [2.3.6] - 2026-03-12

### Fixed

- **Provider test batch**: Fixed Zod schema to accept `providerId: null` (frontend sends null for non-provider modes); was incorrectly returning "Invalid request" for all batch tests
- **Provider test modal**: Fixed `[object Object]` display by normalizing API error objects to strings before rendering in `setTestResults` and `ProviderTestResultsView`
- **i18n**: Added missing keys `cliTools.toolDescriptions.opencode`, `cliTools.toolDescriptions.kiro`, `cliTools.guides.opencode`, `cliTools.guides.kiro` to `en.json`
- **i18n**: Synchronized 1111 missing keys across all 29 non-English language files using English values as fallbacks

## [2.3.5] - 2026-03-11

### Fixed

- **@swc/helpers**: Added permanent `postinstall` fix to copy `@swc/helpers` into the standalone app's `node_modules` — prevents MODULE_NOT_FOUND crash on global npm installs

## [2.3.4] - 2026-03-10

### Added

- Multiple provider integrations and dashboard improvements
