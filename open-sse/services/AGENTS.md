# open-sse/services/ — Routing Engine & Cross-Cutting Services

**Purpose**: 36+ service modules powering request routing, rate limiting, quota management, token refresh, fallback strategies, and runtime state. The combo routing engine (`combo.ts`) is the core; supporting services handle resilience, accounting, and decision-making.

---

## Key Services

### Combo Routing Engine

- **`combo.ts`** (800 LOC) — Entry point for multi-model routing. **`handleComboChat()`** iterates through targets in order until success or all fail. **`resolveComboTargets()`** expands combo config into ordered `ResolvedComboTarget[]` (provider + model + account + credentials). Enforces target retry, round-robin slot control, and provider-level resilience gates.
- **Strategies** (13 total): `priority` (ordered list), `weighted` (probabilistic), `fill-first` (fill quota first), `round-robin`, `P2C` (power of two choices), `random`, `least-used`, `cost-optimized`, `strict-random`, `auto`, `lkgp` (last known good provider), `context-optimized`, `context-relay`.
- **Provider Breaker Integration**: Combo targets respect the global provider circuit breaker and skip to the next target when a provider is already open.

### Quota & Rate Limiting

- **`rateLimitManager.ts`** — Enforces upstream rate limits (429, retry-after headers). Implements token bucket per API key + provider combo. Rejects requests exceeding limits before dispatch.
- **`usage.ts`** — Tracks per-request token/cost consumption. Syncs with `quotaSnapshots` table. Reports cumulative usage for analytics.
- **`quotaCache.ts`** — In-memory quota snapshots. Invalidated on write; pre-loaded at startup. Prevents DB thrashing on high-volume requests.

### Account & Token Management

- **`tokenRefresh.ts`** — Handles OAuth token expiration. Detects 401 responses, triggers refresh via provider OAuth endpoint, retries request with new token.
- **`accountFallback.ts`** — If account reaches quota/rate-limit, switches to alternate account (combo targets). Logs account switch event.
- **`sessionManager.ts`** — Manages request session state across retries. Tracks session ID, attempt count, fallback history.

### Request Routing & Intelligence

- **`wildcardRouter.ts`** — Matches wildcard routes in combo configs (e.g., `gpt-*` → all GPT models).
- **`intentClassifier.ts`** — Classifies request intent (chat, embedding, image, video, etc.) for intelligent routing.
- **`taskAwareRouter.ts`** — Routes based on task characteristics (reasoning-heavy → o1, code-gen → Cursor, long-context → Claude).
- **`thinkingBudget.ts`** — Allocates thinking tokens for o1/o3 models; enforces per-request budget.
  Provider-specific Cloud Code compatibility stripping belongs in executors, not in this service.
- **`contextManager.ts`** — Injects routing context (system prompts, memory) into requests.

### Model Lifecycle & Fallback

- **`modelDeprecation.ts`** — Detects deprecated models (gpt-3.5, claude-2, etc.). Routes to successor models automatically.
- **`modelFamilyFallback.ts`** — T5 intra-family fallback: if `gpt-4-turbo` unavailable, tries `gpt-4-1106-preview`, then `gpt-4`.
- **`emergencyFallback.ts`** — Last-resort fallback when all combo targets fail. Routes to stable free provider (Qwen Code, Gemini CLI fallback).

### State & Detection

- **`workflowFSM.ts`** — Finite state machine for multi-turn workflows (prompt engineering → execution → validation).
- **`backgroundTaskDetector.ts`** — Detects long-running background tasks; routes to batch APIs or defers execution.
- **`ipFilter.ts`** — IP-based routing rules (geographic or access control).
- **`signatureCache.ts`** — Caches request signatures for duplicate detection and deduplication.
- **`volumeDetector.ts`** — Detects request volume spikes; triggers rate-limit escalation or load-shedding.
- **`contextHandoff.ts`** — Serializes/restores session context for agent handoff (A2A protocol).

### Auto-Routing & Adaptive

- **`autoCombo/`** — Auto-generates combo configs based on historical performance, cost, and latency.
- **`modelFamilyFallback.ts`** — Automatic fallback within model families (T5, GPT-4, Claude).

### Advanced Services

- **`promptInjectionGuard.ts`** (middleware) — Clones request, sanitizes user input, detects prompt injection patterns before dispatch
- **`costRules.ts`** (domain layer) — Cost-based routing decisions (cheapest-first, within budget)
- **`degradation.ts`** (domain layer) — Handles service degradation scenarios (provider down, quota exceeded)
- **`resilience.ts`** — Retry logic, exponential backoff, circuit breaker orchestration across all services

---

## Complexity Hotspots

| Module                   | Lines | Risk                                                       | Mitigation                                                                     |
| ------------------------ | ----- | ---------------------------------------------------------- | ------------------------------------------------------------------------------ |
| `combo.ts`               | ~800  | High — routing logic, strategy dispatch, fallback ordering | Unit tests for each strategy, integration tests for combo sequences            |
| `providerRegistry.ts`    | 3000+ | High — 100+ provider configs, executor dispatch            | Auto-validate via Zod at module load, split into provider-specific sub-modules |
| `rateLimitManager.ts`    | ~300  | Medium — token bucket state, concurrent requests           | Unit tests for bucket refill, edge cases (clock skew, parallel requests)       |
| `modelFamilyFallback.ts` | ~200  | Medium — fallback chains, family detection                 | Test all family chains, ensure no circular fallbacks                           |

---

## Testing Strategy

Each service requires unit and integration tests. For authoritative coverage requirements and test execution guidelines, see [`CONTRIBUTING.md#running-tests`](../../CONTRIBUTING.md#running-tests).

- **Unit tests** — Each service in isolation with mocked dependencies (combos, models, executors)
- **Integration tests** — Combo routing with real combo configs, verify target resolution and fallback behavior
- **E2E tests** — Full request flow: chat → combo routing → provider selection → response streaming
- **Chaos tests** — Simulate provider failures, rate limits, token expiration; verify graceful degradation
- **Benchmarks** — Measure routing latency, combo resolution time (target: <10ms for 50 targets)

---

## Performance Constraints

- **Combo resolution**: <10ms for typical configs (5–20 targets)
- **Rate limit checks**: <1ms (in-memory token bucket)
- **Model family fallback**: <5ms (cached family definitions)
- **Request routing dispatch**: <2ms (hot path, pre-computed strategy dispatch)
- **No blocking I/O** in routing hot path — all async, no awaits on DB queries outside context injection

---

## Anti-Patterns

- ❌ Synchronous DB calls in `combo.ts` hot path — pre-compute and cache
- ❌ Retry logic in handlers; use `retry()` from resilience service
- ❌ Direct provider config access; use `providerRegistry` getter functions
- ❌ Hardcoded fallback chains; define in `modelFamilyFallback.ts` instead
- ❌ State mutations across concurrent requests; use request-scoped context only

---

## Adding a New Service

1. Create `open-sse/services/[serviceName].ts` with clear responsibilities
2. Export main handler function and any constants
3. Add unit tests in `tests/unit/services/[serviceName].test.mjs`
4. Integrate into request pipeline in `handlers/chatCore.ts` (if routing-related) or expose via combo.ts
5. Update routing logic in `combo.ts` if service affects target selection or fallback
6. Document in this file (table, key decisions section)

---

## Key Decisions

- **Combo-first design**: All routing decisions go through combo engine; fallback strategies are combo targets, not ad-hoc logic
- **Service composition**: Small focused modules; combo.ts orchestrates them, not monolithic routing
- **Provider breaker is global**: Combo targets respect the shared provider circuit breaker; combo does not maintain a second target-local breaker
- **Caching everywhere**: Models, providers, quotas, family fallbacks all pre-cached; invalidated on write
- **13 strategies** over hardcoded logic: Strategy pattern allows new routing logic without touching combo.ts core

---

## Review Focus

- New services must not add blocking I/O to routing hot path
- Combo target resolution under 10ms (measure with benchmarks)
- Combo should not reintroduce a second breaker layer on top of the global provider breaker
- All fallback chains tested (no infinite loops)
- Coverage requirements: See [`CONTRIBUTING.md#running-tests`](../../CONTRIBUTING.md#running-tests) (60% gate enforced in CI)
