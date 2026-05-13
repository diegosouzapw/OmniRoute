# OmniRoute Auto-Combo Engine

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

The Auto-Combo Engine dynamically selects the best provider/model for each request using a **9-factor scoring function** (defined in `open-sse/services/autoCombo/scoring.ts` → `DEFAULT_WEIGHTS`). All weights sum to **1.0**.

| Factor             | Default Weight | Description                                                             |
| :----------------- | :------------- | :---------------------------------------------------------------------- |
| `health`           | 0.22           | Health score from circuit breaker (CLOSED=1.0, HALF_OPEN=0.5, OPEN=0.0) |
| `quota`            | 0.17           | Remaining quota / rate-limit headroom [0..1]                            |
| `costInv`          | 0.17           | Inverse cost normalized to pool — cheaper = higher score                |
| `latencyInv`       | 0.13           | Inverse p95 latency normalized to pool — faster = higher score          |
| `taskFit`          | 0.08           | Task-type fitness (coding, review, planning, analysis, debugging, docs) |
| `specificityMatch` | 0.08           | Match between request specificity (manifest hint) and model tier        |
| `stability`        | 0.05           | Variance-based stability (low latency stdDev / error rate)              |
| `tierPriority`     | 0.05           | Account-tier priority — Ultra=1.0, Pro=0.67, Standard=0.33, Free=0.0    |
| `tierAffinity`     | 0.05           | Affinity between the candidate's tier and the manifest-recommended tier |

**Sum:** `0.22 + 0.17 + 0.17 + 0.13 + 0.08 + 0.08 + 0.05 + 0.05 + 0.05 = 1.0` (validated by `validateWeights()`).

## Mode Packs

Four pre-defined weight profiles in `open-sse/services/autoCombo/modePacks.ts`. Each pack overrides the default weights to bias selection toward a specific goal. Below are the **full weight tables per pack** (each row sums to 1.0).

| Factor       | ship-fast | cost-saver | quality-first | offline-friendly |
| :----------- | :-------- | :--------- | :------------ | :--------------- |
| quota        | 0.15      | 0.15       | 0.10          | **0.40**         |
| health       | 0.30      | 0.20       | 0.20          | 0.30             |
| costInv      | 0.05      | **0.40**   | 0.05          | 0.10             |
| latencyInv   | **0.35**  | 0.05       | 0.05          | 0.05             |
| taskFit      | 0.10      | 0.10       | **0.40**      | 0.00             |
| stability    | 0.00      | 0.05       | 0.15          | 0.10             |
| tierPriority | 0.05      | 0.05       | 0.05          | 0.05             |

Notes:

- `tierAffinity` and `specificityMatch` are not set in mode packs — `calculateScore()` treats them as `?? 0` when absent.
- Each pack's emphasis at a glance:
  - **ship-fast** → latencyInv 0.35 + health 0.30 (low-latency, healthy connections)
  - **cost-saver** → costInv 0.40 (cheapest tokens win)
  - **quality-first** → taskFit 0.40 + stability 0.15 (best model for the task, consistent)
  - **offline-friendly** → quota 0.40 + health 0.30 (max headroom regardless of speed/cost)

## All Routing Strategies

OmniRoute's combo engine supports **14 routing strategies** (declared in `src/shared/constants/routingStrategies.ts` → `ROUTING_STRATEGY_VALUES`). The Auto Combo engine itself is exposed under the `auto` strategy; the others are available for persisted combos.

| Strategy            | Description                                                        |
| :------------------ | :----------------------------------------------------------------- |
| `priority`          | First-target ordered list with explicit priority                   |
| `weighted`          | Weighted random by per-target weight                               |
| `round-robin`       | Cycle through targets in order                                     |
| `context-relay`     | Hand off context across targets (long conversations)               |
| `fill-first`        | Fill each target's quota before moving to next                     |
| `p2c`               | Power-of-2-choices random load balancing                           |
| `random`            | Uniform random selection                                           |
| `least-used`        | Pick target with lowest current load                               |
| `cost-optimized`    | Minimize $ per request given catalog pricing                       |
| `reset-aware` ⭐    | Prioritize by quota reset time — short reset windows ranked higher |
| `strict-random`     | Random without deduplication of repeats                            |
| `auto`              | Use Auto Combo scoring (9-factor) — **recommended**                |
| `lkgp`              | Last-Known-Good Path (sticky route to last successful target)      |
| `context-optimized` | Pick target with best fit for current context size                 |

⭐ = New in v3.8.0

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

## Task Fitness

30+ models scored across 6 task types (`coding`, `review`, `planning`, `analysis`, `debugging`, `documentation`). Supports wildcard patterns (e.g., `*-coder` → high coding score).

## Auto Variants Recap

Including the bare `auto` (default) plus the 6 `AutoVariant` values declared in `autoPrefix.ts`, there are **7 invokable model IDs**:

`auto`, `auto/coding`, `auto/fast`, `auto/cheap`, `auto/offline`, `auto/smart`, `auto/lkgp`

(`AutoVariant` itself enumerates 6 values; the 7th option is "no variant" — bare `auto` — handled by `parseAutoPrefix()` as `variant: undefined`.)

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
| `src/shared/constants/routingStrategies.ts`               | `ROUTING_STRATEGY_VALUES` (14 strategies)                                  |
| `src/sse/handlers/chat.ts`                                | Integration: auto-prefix short-circuit                                     |
