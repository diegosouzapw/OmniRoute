# open-sse/services/ — Routing Engine & Cross-Cutting Services

**Purpose**: 134 service modules (top-level) powering request routing, rate limiting, quota management, token refresh, fallback strategies, and runtime state. The combo routing engine (`combo.ts`) is the core; supporting services handle resilience, accounting, and decision-making.

Live count: `ls open-sse/services/*.ts | wc -l` (currently 134). More including sub-dirs like `autoCombo/` and `compression/`.

---

## Combo Routing Engine

- **`combo.ts`** — Entry point for multi-model routing. **`handleComboChat()`** iterates through targets in order until success or all fail. **`resolveComboTargets()`** expands combo config into ordered `ResolvedComboTarget[]` (provider + model + account + credentials).
- **Strategies** (17): `priority`, `weighted`, `fill-first`, `round-robin`, `P2C`, `random`, `least-used`, `reset-aware`, `reset-window`, `cost-optimized`, `strict-random`, `auto`, `lkgp`, `context-optimized`, `context-relay`, `headroom`, `fusion`. Source: `ROUTING_STRATEGY_VALUES` in `src/shared/constants/routingStrategies.ts`.
- Each target calls **`handleSingleModel()`** which wraps `handleChatCore()` with per-target error handling and circuit breaker checks.

## Key Services

### Quota & Rate Limiting

- **`rateLimitManager.ts`** — Token bucket per API key + provider combo. Rejects before dispatch.
- **`usage.ts`** — Per-request token/cost consumption tracking.
- **`quotaCache.ts`** — In-memory quota snapshots, pre-loaded at startup.

### Account & Token Management

- **`tokenRefresh.ts`** — OAuth token expiration detection and refresh.
- **`accountFallback.ts`** — Account switching on quota/rate-limit. Also houses model lockout.
- **`sessionManager.ts`** — Request session state across retries.

### Request Routing & Intelligence

- **`wildcardRouter.ts`** — Wildcard route matching in combo configs.
- **`intentClassifier.ts`** — Request intent classification for intelligent routing.
- **`taskAwareRouter.ts`** — Task-type-based routing (reasoning → o1, code-gen → Cursor).
- **`thinkingBudget.ts`** — Thinking token allocation for o1/o3 models.
- **`contextManager.ts`** — Routing context injection (system prompts, memory).

### Model Lifecycle & Fallback

- **`modelDeprecation.ts`** — Deprecated model detection and successor routing.
- **`modelFamilyFallback.ts`** — T5 intra-family fallback chains.
- **`emergencyFallback.ts`** — Last-resort fallback to stable free providers.

### State & Detection

- **`workflowFSM.ts`** — Multi-turn workflow state machine.
- **`backgroundTaskDetector.ts`** — Long-running task detection for batch routing.
- **`ipFilter.ts`** — IP-based routing rules.
- **`signatureCache.ts`** — Request signature caching for deduplication.
- **`volumeDetector.ts`** — Volume spike detection for rate-limit escalation.
- **`contextHandoff.ts`** — Session context serialization for A2A handoff.

### Prompt Compression Pipeline (`compression/`)

- **`strategySelector.ts`** — Compression mode selection (off/lite/standard/aggressive/ultra/rtk/stacked).
- **`lite.ts`** — 5 lite techniques (whitespace, dedup, tool results, redundant removal, image URLs).
- **`caveman.ts` / `cavemanRules.ts`** — Caveman-style semantic condensation with rule packs.
- **`engines/rtk/`** — RTK tool-output compression (command detection, JSON filters, dedup, truncation).
- **`engines/registry.ts`** — Engine registry for standalone and stacked pipelines.
- **`stats.ts`** — Per-request compression stats.
- **`types.ts`** — Shared types (`CompressionMode`, `CompressionConfig`, `CompressionStats`).

---

## Adding a New Service

1. Create `open-sse/services/[serviceName].ts`
2. Export main handler function
3. Add unit tests in `tests/unit/services/`
4. Integrate into `handlers/chatCore.ts` (if routing-related) or `combo.ts`
5. Document in this file

## Anti-Patterns

- Synchronous DB calls in `combo.ts` hot path — pre-compute and cache
- Retry logic in handlers — use `retry()` from resilience service
- Direct provider config access — use `providerRegistry` getter functions
- Hardcoded fallback chains — define in `modelFamilyFallback.ts`
- State mutations across concurrent requests — use request-scoped context only
