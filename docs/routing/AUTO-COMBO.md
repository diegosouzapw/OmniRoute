---
title: "OmniRoute Auto-Combo Engine"
version: 3.8.40
lastUpdated: 2026-06-28
---

# OmniRoute Auto-Combo Engine

> **For Users**: Looking for a quick start? See the [Auto-Combo User Guide](../getting-started/AUTO-COMBO-GUIDE.md) for simple explanations and examples.

> Self-managing model chains with adaptive scoring + zero-config auto-routing

## Zero-Config Auto-Routing (`auto/` prefix)

> **NEW:** No combo creation required. Use `auto/` prefix directly in any client.

### Quick Examples

| Model ID       | Variant | Behavior                                                                 |
| -------------- | ------- | ------------------------------------------------------------------------ |
| `auto`         | default | All connected providers, LKGP strategy, balanced weights                 |
| `auto/coding`  | coding  | Quality-first weights, suitable for code generation                      |
| `auto/fast`    | fast    | Low-latency weighted selection                                           |
| `auto/cheap`   | cheap   | Cost-optimized routing (lowest cost first)                               |
| `auto/offline` | offline | Favors providers with highest quota availability                         |
| `auto/smart`   | smart   | Quality-first + higher exploration rate (10%) for better model discovery |
| `auto/lkgp`    | lkgp    | Explicit LKGP (same as default `auto`)                                   |

### Category × Tier Composition (`auto/<category>:<tier>`)

OpenRouter-style suffixes separate **what kind of route** (category) from **how to optimize it** (tier), so you can compose them freely (#4235 Phase B, `open-sse/services/autoCombo/suffixComposition.ts`):

- **Categories** (filter the candidate pool by capability): `coding` · `reasoning` · `vision` · `chat` · `multimodal`. `vision`/`multimodal` keep vision-capable models; `reasoning` keeps reasoning/thinking models.
- **Tiers** (pick the scoring weights / pool filter): `fast` (ship-fast) · `cheap` (alias `floor`, cost-saver) · `reliable` (circuit-breaker health + latency stability) · `free` / `pro` (filter the pool by model tier via `classifyTier` — free-tier vs. premium).

| Example                | Resolves to                                             |
| ---------------------- | ------------------------------------------------------- |
| `auto/coding:fast`     | coding pool, low-latency weights                        |
| `auto/coding:cheap`    | coding pool, cost-optimized (alias `auto/coding:floor`) |
| `auto/reasoning:pro`   | reasoning/thinking models only, premium tier            |
| `auto/vision`          | vision-capable models (no tier → balanced weights)      |
| `auto/multimodal:free` | multimodal-capable models, free tier only               |

Any valid `auto/<category>[:<tier>]` resolves on demand; a curated subset is advertised in `/v1/models` and the dashboard (`AUTO_SUFFIX_VARIANTS` in `open-sse/services/autoCombo/builtinCatalog.ts`). Filtering is **fail-open** — if a constraint matches no connected models, the full pool is used so routing never breaks. The core scorer (`combo.ts`) is unchanged; the category/tier filter is applied in `buildAutoCandidates`.

> **Live model intelligence:** auto-routing fitness is informed by live **Arena ELO** rankings + **models.dev** tier data when the `ARENA_ELO_SYNC_ENABLED` flag is on (falls back to the static fitness map otherwise).

**How to use:**

```bash
# Any IDE or CLI tool that supports OpenAI format
Base URL: http://localhost:20128/v1
API Key:  <your-endpoint-key>

# In your code/config, set model to:
model: "auto"                 # balanced default
model: "auto/coding"          # best for coding tasks
model: "auto/fast"            # fastest available
model: "auto/cheap"           # cheapest per token
```

**What happens:**

1. OmniRoute detects `auto/` prefix in `src/sse/handlers/chat.ts`
2. Queries all **active provider connections** from the database
3. Filters to those with valid credentials (API key or OAuth token)
4. Determines the model per connection (`connection.defaultModel` or provider's first model)
5. Builds a **virtual combo** in-memory (not stored in DB)
6. Routes using the selected variant's weight profile + LKGP strategy

**Key properties:**

- ✅ **Always-on:** No toggle, no combo creation, no configuration needed
- ✅ **Dynamic:** Reflects current connected providers automatically
- ✅ **Session stickiness:** LKGP ensures last successful provider is prioritized
- ✅ **Multi-account aware:** Each provider connection becomes a separate candidate
- ✅ **No DB writes:** Virtual combo exists only for the request, zero persistence overhead

**Behind the scenes:**

```txt
Request: { model: "auto/coding" }
   ↓
src/sse/handlers/chat.ts detects prefix
   ↓
createVirtualAutoCombo('coding') → candidatePool from active connections
   ↓
handleComboChat (same engine as persisted combos)
   ↓
Auto-scoring selects best provider/model per request
```

**Implementation files:**

| File                                                      | Purpose                                   |
| --------------------------------------------------------- | ----------------------------------------- |
| `open-sse/services/autoCombo/autoPrefix.ts`               | Prefix parser (`parseAutoPrefix`)         |
| `open-sse/services/autoCombo/virtualFactory.ts`           | Creates virtual `AutoComboConfig` objects |
| `open-sse/services/autoCombo/providerRegistryAccessor.ts` | Test hook for mocking provider registry   |
| `src/sse/handlers/chat.ts`                                | Integration: auto prefix short-circuit    |
| `src/shared/constants/providers.ts`                       | `SYSTEM_PROVIDERS.auto` system entry      |

## How It Works (Persisted Auto-Combos)

The Auto-Combo Engine dynamically selects the best provider/model for each request using a **12-factor scoring function** (defined in `open-sse/services/autoCombo/scoring.ts` → `DEFAULT_WEIGHTS`). All weights sum to **1.0**.

![Auto-Combo scoring factors](../diagrams/exported/auto-combo-9factor.svg)

> Source: [diagrams/auto-combo-9factor.mmd](../diagrams/auto-combo-9factor.mmd) (diagram pending regeneration for the 12-factor set).

| Factor                | Default Weight | Description                                                                                        |
| :-------------------- | :------------- | :------------------------------------------------------------------------------------------------- |
| `health`              | 0.20           | Health score from circuit breaker (CLOSED=1.0, HALF_OPEN=0.5, OPEN=0.0)                            |
| `quota`               | 0.15           | Remaining quota / rate-limit headroom [0..1]                                                       |
| `costInv`             | 0.15           | Inverse **blended** cost (60% input + 40% output token price, normalized) — cheaper = higher score |
| `latencyInv`          | 0.12           | Inverse p95 latency normalized to pool — faster = higher score                                     |
| `taskFit`             | 0.08           | Task-type fitness (coding, review, planning, analysis, debugging, docs)                            |
| `stability`           | 0.05           | Variance-based stability (low latency stdDev / error rate)                                         |
| `tierPriority`        | 0.05           | Account-tier priority — Ultra=1.0, Pro=0.67, Standard=0.33, Free=0.0                               |
| `tierAffinity`        | 0.05           | Affinity between the candidate's tier and the manifest-recommended tier                            |
| `specificityMatch`    | 0.05           | Match between request specificity (manifest hint) and model tier                                   |
| `contextAffinity`     | 0.05           | Affinity between the request's context-window need and the model's context window                  |
| `connectionDensity`   | 0.05           | Spreads load across connections of the same provider (anti-concentration)                          |
| `resetWindowAffinity` | 0.00           | Bias toward connections whose quota reset window is favorable (disabled by default)                |

**Sum:** `0.20 + 0.15 + 0.15 + 0.12 + 0.08 + 0.05 + 0.05 + 0.05 + 0.05 + 0.05 + 0.05 + 0.00 = 1.0` (validated by `validateWeights()`).

## Mode Packs

Four pre-defined weight profiles in `open-sse/services/autoCombo/modePacks.ts`. Each pack overrides the default weights to bias selection toward a specific goal. Below are the **full weight tables per pack** (each row sums to 1.0).

| Factor       | ship-fast | cost-saver | quality-first | offline-friendly |
| :----------- | :-------- | :--------- | :------------ | :--------------- |
| quota        | 0.14      | 0.14       | 0.10          | **0.37**         |
| health       | 0.28      | 0.19       | 0.18          | 0.28             |
| costInv      | 0.05      | **0.37**   | 0.05          | 0.10             |
| latencyInv   | **0.32**  | 0.05       | 0.05          | 0.05             |
| taskFit      | 0.10      | 0.10       | **0.37**      | 0.00             |
| stability    | 0.00      | 0.05       | 0.15          | 0.10             |
| tierPriority | 0.05      | 0.05       | 0.05          | 0.05             |

Notes:

- `tierAffinity` and `specificityMatch` are not set in mode packs — `calculateScore()` treats them as `?? 0` when absent.
- Each pack's emphasis at a glance:
  - **ship-fast** → latencyInv 0.32 + health 0.28 (low-latency, healthy connections)
  - **cost-saver** → costInv 0.37 (cheapest tokens win)
  - **quality-first** → taskFit 0.37 + stability 0.15 (best model for the task, consistent)
  - **offline-friendly** → quota 0.37 + health 0.28 (max headroom regardless of speed/cost)

## All Routing Strategies

OmniRoute's combo engine supports **17 routing strategies** (declared in `src/shared/constants/routingStrategies.ts` → `ROUTING_STRATEGY_VALUES`). The Auto Combo engine itself is exposed under the `auto` strategy; the others are available for persisted combos.

| Strategy            | Description                                                                                  |
| :------------------ | :------------------------------------------------------------------------------------------- |
| `priority`          | First-target ordered list with explicit priority                                             |
| `weighted`          | Weighted random by per-target weight                                                         |
| `round-robin`       | Cycle through targets in order                                                               |
| `context-relay`     | Hand off context across targets (long conversations)                                         |
| `fill-first`        | Fill each target's quota before moving to next                                               |
| `p2c`               | Power-of-2-choices random load balancing                                                     |
| `random`            | Uniform random selection                                                                     |
| `least-used`        | Pick target with lowest current load                                                         |
| `cost-optimized`    | Minimize $ per request given catalog pricing                                                 |
| `reset-aware` ⭐    | Prioritize by quota reset time — short reset windows ranked higher                           |
| `reset-window`      | Prefer targets whose quota window resets soonest                                             |
| `headroom`          | Pick the target with the most remaining quota headroom                                       |
| `strict-random`     | Random without deduplication of repeats                                                      |
| `auto`              | Use Auto Combo scoring (9-factor) — **recommended**                                          |
| `lkgp`              | Last-Known-Good Path (sticky route to last successful target)                                |
| `context-optimized` | Pick target with best fit for current context size                                           |
| `fusion` 🧬         | Fan out to a panel of models in parallel, then synthesize one answer via a judge (see below) |

⭐ = New in v3.8.0 · 🧬 = New in v3.8.36

## Fusion Strategy

`fusion` is the one strategy that does **not** pick a single target. It fans the prompt
out to **every panel model in parallel**, then a configurable **judge model** synthesizes
a single final answer from all panel responses. Ported from upstream `decolua/9router`
(OpenRouter's Fusion design); implementation in `open-sse/services/fusion.ts`.

How it works:

1. **Fan-out** — the prompt is sent to every panel model at once, forced non-streaming
   with tools stripped (the judge needs complete prose to synthesize).
2. **Quorum-grace collection** — as soon as `minPanel` answers arrive, a short grace
   timer starts for the stragglers, then fusion proceeds with whatever was collected.
   This caps the slowest model's penalty on wall time, bounded by a hard timeout.
3. **Judge synthesis** — panel answers are anonymized (`Source 1`, `Source 2`, … — so
   the judge weighs substance, not model brand) and handed to the judge, which analyzes
   consensus / contradictions / partial coverage / unique insights / blind spots, then
   writes **one** authoritative answer. The judge call keeps the client's original
   `stream` flag + tools, so streaming and downstream tool use still work.
4. **Graceful degradation** — 0 panel answers → `503`; exactly 1 survivor → that answer
   is returned directly (nothing to fuse); a single-model panel answers directly.

### Configuration

Configured on the combo's `config` blob (no schema migration — it reuses the existing
`combos` table):

| Field                                    | Type     | Default           | Purpose                                                                                 |
| :--------------------------------------- | :------- | :---------------- | :-------------------------------------------------------------------------------------- |
| `config.judgeModel`                      | `string` | first panel model | Model that synthesizes the final answer                                                 |
| `config.fusionTuning.minPanel`           | `number` | `2`               | Successful answers required before the grace timer starts (clamped to `[2, panelSize]`) |
| `config.fusionTuning.stragglerGraceMs`   | `number` | `8000`            | How long to wait for laggards once quorum is reached                                    |
| `config.fusionTuning.panelHardTimeoutMs` | `number` | `90000`           | Absolute cap so one hung model can't stall the request                                  |

Defaults live in `FUSION_DEFAULTS` (`open-sse/services/fusion.ts`).

### Example

```bash
curl -X POST http://localhost:20128/api/combos \
  -H "Authorization: Bearer <key>" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "fusion-panel",
    "strategy": "fusion",
    "targets": [
      { "model": "cc/claude-opus-4-7" },
      { "model": "cx/gpt-5.5" },
      { "model": "glm/glm-5.1" }
    ],
    "config": {
      "judgeModel": "cc/claude-opus-4-7",
      "fusionTuning": { "minPanel": 2, "stragglerGraceMs": 8000, "panelHardTimeoutMs": 90000 }
    }
  }'
```

Then call it like any combo: `{"model":"fusion-panel","messages":[...]}`.

## Virtual Auto-Combo Factory

The Auto Combo engine doesn't require pre-defined combos. Instead, `open-sse/services/autoCombo/virtualFactory.ts` builds candidates on-the-fly:

1. Pulls `getProviderConnections({ isActive: true })` (all enabled connections)
2. Filters to those with valid credentials (API key or non-expired OAuth token via `hasUsableOAuthToken()`)
3. Cross-references with `getProviderRegistry()` for model availability + pricing
4. For each tuple `(provider, model, connection)`, builds a `VirtualAutoComboCandidate`
5. Picks `connection.defaultModel` (or the registry's first model) as the dispatch target
6. Scores each candidate using the 9-factor `scorePool()` and the variant's weight pack
7. Returns the resulting in-memory `AutoComboConfig` for `handleComboChat()` — never persisted to DB

This means **adding a new provider with `auto/*` enabled automatically expands the candidate pool** — no manual combo editing needed. The virtual combo is rebuilt per request, so newly-added or newly-healthy connections are picked up immediately.

## Self-Healing

- **Temporary exclusion**: Score < 0.2 → excluded for 5 min (progressive backoff, max 30 min)
- **Circuit breaker awareness**: OPEN → auto-excluded; HALF_OPEN → probe requests
- **Incident mode**: >50% OPEN → disable exploration, maximize stability
- **Cooldown recovery**: After exclusion, first request is a "probe" with reduced timeout

## Bandit Exploration

5% of requests (configurable) are routed to random providers for exploration. Disabled in incident mode.

## API

There is **no dedicated `POST /api/combos/auto` endpoint** — Auto-Combo is consumed in two ways:

1. **Zero-config (recommended):** Send any chat completion request with `model: "auto"` or `model: "auto/<variant>"`. The virtual factory builds the combo per request — no persistence, no API calls needed.

2. **Persisted combo with `strategy: "auto"`:** Create a regular combo via `POST /api/combos` and set `strategy: "auto"` plus `config.auto.weights` / `config.auto.candidatePool`. The same scoring engine is used; the combo is stored in `combos` and reusable by ID.

For discovery, `GET /api/combos/auto` lists every variant with its resolved candidate pool plus `context_length` / `max_output_tokens` — the MAX across the candidate pool's windows. Clients (e.g. the opencode plugin) must advertise these values instead of `0`: a zero context disables opencode's auto-compaction entirely, letting sessions grow until the gateway's history purge destroys context. MAX is safe to advertise because the auto-combo context pre-filter routes oversized requests to large-window candidates.

```bash
# Zero-config usage (no combo creation)
curl -X POST http://localhost:20128/v1/chat/completions \
  -H "Authorization: Bearer <key>" \
  -H "Content-Type: application/json" \
  -d '{"model":"auto/coding","messages":[{"role":"user","content":"Hello"}]}'

# Persisted auto combo via the regular combos endpoint
curl -X POST http://localhost:20128/api/combos \
  -H "Content-Type: application/json" \
  -d '{"id":"my-auto","name":"Auto Coder","strategy":"auto","config":{"auto":{"candidatePool":["anthropic","google","openai"],"weights":{"quota":0.15,"health":0.3,"costInv":0.05,"latencyInv":0.35,"taskFit":0.1,"stability":0,"tierPriority":0.05}}}}'
```

### Auto router strategies

Persisted `strategy: "auto"` combos can set `config.routerStrategy` (or legacy
`config.auto.routerStrategy`) to one of:

- `rules` — default weighted scoring
- `cost` / `eco` — cheapest healthy provider
- `latency` / `fast` — lowest p95 latency with reliability penalty
- `sla-aware` / `sla` — prefer candidates that satisfy p95 latency, error-rate, and optional
  cost SLOs
- `lkgp` — last known good provider first

### Router strategies in detail

The auto-combo engine exposes 5 pluggable **RouterStrategy** implementations that
you can swap via `config.routerStrategy` (or the legacy `config.auto.routerStrategy`).
Each strategy picks one provider from the candidate pool, given a `RoutingContext`
(task type, tool/vision hints, token estimate, optional SLA policy, optional
last-known-good provider).

#### 1. `rules` (default) — 6-factor weighted scoring

Wraps the existing scoring engine. Filters out `OPEN` circuit-breaker
candidates, then runs `scorePool()` with the current task type and `getTaskFitness()`,
picking the top-scoring provider.

```ts
class RulesStrategyImpl implements RouterStrategy {
  readonly name = "rules";
  readonly description =
    "6-factor weighted scoring: quota, health, cost, latency, taskFit, stability";

  select(pool, context) {
    const eligible = pool.filter((c) => c.circuitBreakerState !== "OPEN");
    const ranked = scorePool(
      eligible.length > 0 ? eligible : pool,
      context.taskType,
      undefined,
      getTaskFitness
    );
    return { provider: ranked[0].provider /* ... */ };
  }
}
```

**When to use**: Default. Use when you want a balanced trade-off across all signals.

**Alias**: `rules` (no alias)

---

#### 2. `cost` / `eco` — cheapest healthy provider

Sorts the candidate pool by `costPer1MTokens` (ascending) and picks the cheapest.
Filters out `OPEN` candidates first.

```ts
class CostStrategyImpl implements RouterStrategy {
  readonly name = "cost";
  readonly description = "Always selects cheapest available provider";

  select(pool, context) {
    const healthy = pool.filter((c) => c.circuitBreakerState !== "OPEN");
    const sorted = [...healthy].sort((a, b) => a.costPer1MTokens - b.costPer1MTokens);
    return { provider: sorted[0].provider /* ... */ };
  }
}
```

**When to use**: Cost-sensitive workloads, batch processing, or background jobs.

**Aliases**: `cost`, `eco`

---

#### 3. `latency` / `fast` — lowest p95 latency with reliability penalty

Sorts by `p95LatencyMs + (errorRate * 1000)`. The error-rate penalty ensures
unreliable providers are ranked lower even if their nominal latency is low.

```ts
class LatencyStrategyImpl implements RouterStrategy {
  readonly name = "latency";
  readonly description = "Prioritizes lowest p95 latency with reliability weighting";

  select(pool, context) {
    const healthy = pool.filter((c) => c.circuitBreakerState !== "OPEN");
    const sorted = [...healthy].sort(
      (a, b) => a.p95LatencyMs + a.errorRate * 1000 - (b.p95LatencyMs + b.errorRate * 1000)
    );
    return { provider: sorted[0].provider /* ... */ };
  }
}
```

**When to use**: Latency-sensitive workloads like real-time chat, autocomplete, or
interactive coding assistants.

**Aliases**: `latency`, `fast`

---

#### 4. `sla-aware` / `sla` — latency/error/cost SLO compliance

Scores each candidate by how well it satisfies the configured SLO policy:

| Factor          | Weight | Formula                                           |
| --------------- | ------ | ------------------------------------------------- |
| Latency score   | 35%    | `threshold / max(value, ε)`                       |
| Error score     | 35%    | `threshold / max(value, ε)`                       |
| Health score    | 15%    | `1.0` (CLOSED) / `0.5` (HALF_OPEN) / `0.0` (OPEN) |
| Cost score      | 10%    | `threshold / max(value, ε)` or inverse normalized |
| Stability score | 5%     | inverse normalized latency stddev                 |

When `hardConstraints: true`, candidates are sorted primarily by **violation score**
(how far they exceed any SLO), then by composite score. Otherwise it's just
the composite score.

```ts
class SLAStrategyImpl implements RouterStrategy {
  readonly name = "sla-aware";
  readonly description =
    "Selects the provider most likely to satisfy latency, error-rate, and cost SLOs";

  select(pool, context) {
    // ... scores each candidate against policy: { targetP95Ms, maxErrorRate, maxCostPer1MTokens, hardConstraints }
  }
}
```

**SLA fields** (set on the combo config):

```json
{
  "strategy": "auto",
  "config": {
    "routerStrategy": "sla-aware",
    "slaTargetP95Ms": 1500,
    "slaMaxErrorRate": 0.05,
    "slaMaxCostPer1MTokens": 5,
    "slaHardConstraints": true
  }
}
```

**When to use**: Production workloads with strict latency, error-rate, or cost budgets.

**Aliases**: `sla-aware`, `sla`

---

#### 5. `lkgp` — last known good provider first

Tries the **last known good provider** (if set) first, then falls back to the
`rules` strategy. Useful for session stickiness — the same provider handles
follow-up requests in a conversation.

```ts
class LKGPStrategyImpl implements RouterStrategy {
  readonly name = "lkgp";
  readonly description = "Tries last known good provider first, then falls back to rules";

  select(pool, context) {
    if (context.lkgpEnabled === false) {
      return getStrategy("rules").select(pool, context);
    }

    if (context.lastKnownGoodProvider) {
      const candidates = pool.filter(
        (c) => c.provider === context.lastKnownGoodProvider && c.circuitBreakerState !== "OPEN"
      );
      if (candidates.length > 0) {
        return { provider: candidates[0].provider /* ... */ };
      }
    }

    // Fallback to rules strategy
    return getStrategy("rules").select(pool, context);
  }
}
```

**When to use**: Multi-turn conversations where you want the same provider to handle
follow-up requests (e.g., for caching, context continuity, or pricing consistency).

**Alias**: `lkgp` (no alias)

---

### Custom router strategies

You can register your own `RouterStrategy` implementation via the public API:

```ts
import {
  registerStrategy,
  type RouterStrategy,
} from "@omniroute/open-sse/services/autoCombo/routerStrategy";

class MyCustomStrategy implements RouterStrategy {
  readonly name = "my-custom";
  readonly description = "My custom routing strategy";

  select(pool, context) {
    // Your routing logic here
    return {
      provider: pool[0].provider,
      model: pool[0].model,
      strategy: this.name,
      reason: "MyCustomStrategy: ...",
      candidatesConsidered: pool.length,
      finalScore: 1.0,
    };
  }
}

registerStrategy("my-custom", new MyCustomStrategy());
```

Then use it:

```json
{
  "strategy": "auto",
  "config": {
    "routerStrategy": "my-custom"
  }
}
```

---

### Router strategy selection guide

| Use case          | Strategy    | Reason                               |
| ----------------- | ----------- | ------------------------------------ |
| Balanced workload | `rules`     | Default — considers all factors      |
| Minimize cost     | `cost`      | Always picks cheapest                |
| Minimize latency  | `latency`   | Picks fastest reliable provider      |
| Strict SLOs       | `sla-aware` | Filters by p95/error/cost thresholds |
| Multi-turn chat   | `lkgp`      | Session stickiness                   |

SLA-aware fields:

```json
{
  "strategy": "auto",
  "config": {
    "routerStrategy": "sla-aware",
    "slaTargetP95Ms": 1500,
    "slaMaxErrorRate": 0.05,
    "slaMaxCostPer1MTokens": 5,
    "slaHardConstraints": true
  }
}
```

## Task Fitness

30+ models scored across 6 task types (`coding`, `review`, `planning`, `analysis`, `debugging`, `documentation`). Supports wildcard patterns (e.g., `*-coder` → high coding score).

## Auto Variants Recap

Including the bare `auto` (default) plus the 6 `AutoVariant` values declared in `autoPrefix.ts`, there are **7 invokable model IDs**:

`auto`, `auto/coding`, `auto/fast`, `auto/cheap`, `auto/offline`, `auto/smart`, `auto/lkgp`

(`AutoVariant` itself enumerates 6 values; the 7th option is "no variant" — bare `auto` — handled by `parseAutoPrefix()` as `variant: undefined`.)

## How tiers fit Auto-Combo

The 12-factor scoring function (`open-sse/services/autoCombo/scoring.ts`) treats tier
membership as two signals: `tierPriority` (0.05) and `tierAffinity` (0.05). See the
canonical [scoring factor table](#how-it-works-persisted-auto-combos) above for the full
`DEFAULT_WEIGHTS` set — the per-pack overrides (ship-fast/cost-saver/quality-first/
offline-friendly) are listed in the "Weight profiles per pack" table.

Tier alone does **not** force Tier 1 first — if Tier 1 latency is bad or
cost-vs-quality is suboptimal, Tier 2 wins. To force tier ordering, use combo
strategy `priority` and arrange providers by tier.

To strongly favor Tier 1 (subscription), increase `tierPriority` weight:

```json
{
  "strategy": "auto",
  "config": { "auto": { "weights": { "tierPriority": 0.3, "costInv": 0.05 } } }
}
```

See `docs/marketing/TIERS.md` for tier definitions and provider classification.

## Testing & Coverage

### Deterministic routing-decision matrix (`npm run test:combo:matrix`)

`tests/integration/combo-matrix/*.test.ts` proves the routing **decision** of all 17
public strategies end-to-end through the real combo pipeline with a mocked upstream.
Coverage includes:

- All 17 `ROUTING_STRATEGY_VALUES` strategies (ordered, weighted, cost, context, fusion, …).
- `quota-share` (internal) end-to-end: DRR fairness + saturation deprioritization via the
  real `selectQuotaShareTarget` seam (`registerQuotaFetcher` / `setLKGP` /
  `__setHeadroomSaturationFetcherForTests`).
- `context-relay` universal-handoff coverage across every target count.

This suite runs in CI (`test:integration` job) with `--test-concurrency=1` and
`--test-force-exit` so it is deterministic and does not require live credentials.

### Gated live smoke (NOT in CI — real providers)

| Command                                | What it does                                                                   |
| :------------------------------------- | :----------------------------------------------------------------------------- |
| `npm run test:combo:live`              | In-process real routing with `RUN_COMBO_LIVE=1`; snapshots a live OmniRoute DB |
| `npm run test:combo:live:vps`          | HTTP calls against a live OmniRoute server (set `COMBO_LIVE_BASE_URL`)         |
| `npm run test:combo:live:vps:failover` | Same, with deliberate failover scenarios                                       |

These smoke tests exercise the real wire path (combo → provider → completion). They are
intentionally excluded from CI because they require live credentials and VPS access.

---

## Files

| File                                                      | Purpose                                                                    |
| :-------------------------------------------------------- | :------------------------------------------------------------------------- |
| `open-sse/services/autoCombo/scoring.ts`                  | 9-factor scoring function, `DEFAULT_WEIGHTS`, pool norm                    |
| `open-sse/services/autoCombo/taskFitness.ts`              | Model × task fitness lookup                                                |
| `open-sse/services/autoCombo/engine.ts`                   | Selection logic, bandit, budget cap                                        |
| `open-sse/services/autoCombo/selfHealing.ts`              | Exclusion, probes, incident mode                                           |
| `open-sse/services/autoCombo/modePacks.ts`                | 4 weight profiles (ship-fast, cost-saver, quality-first, offline-friendly) |
| `open-sse/services/autoCombo/autoPrefix.ts`               | `auto/` prefix parser + 6 variants                                         |
| `open-sse/services/autoCombo/virtualFactory.ts`           | Builds in-memory `AutoComboConfig` from live connections                   |
| `open-sse/services/autoCombo/providerRegistryAccessor.ts` | Test hook for mocking provider registry                                    |
| `src/shared/constants/routingStrategies.ts`               | `ROUTING_STRATEGY_VALUES` (17 strategies)                                  |
| `src/sse/handlers/chat.ts`                                | Integration: auto-prefix short-circuit                                     |
