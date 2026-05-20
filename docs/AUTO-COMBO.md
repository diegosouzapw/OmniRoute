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

The Auto-Combo Engine dynamically selects the best provider/model for each request using a **6-factor scoring function**:

| Factor     | Weight | Description                                     |
| :--------- | :----- | :---------------------------------------------- |
| Quota      | 0.20   | Remaining capacity [0..1]                       |
| Health     | 0.25   | Circuit breaker: CLOSED=1.0, HALF=0.5, OPEN=0.0 |
| CostInv    | 0.20   | Inverse cost (cheaper = higher score)           |
| LatencyInv | 0.15   | Inverse p95 latency (faster = higher)           |
| TaskFit    | 0.10   | Model × task type fitness score                 |
| Stability  | 0.10   | Low variance in latency/errors                  |

## Mode Packs

| Pack                    | Focus        | Key Weight       |
| :---------------------- | :----------- | :--------------- |
| 🚀 **Ship Fast**        | Speed        | latencyInv: 0.35 |
| 💰 **Cost Saver**       | Economy      | costInv: 0.40    |
| 🎯 **Quality First**    | Best model   | taskFit: 0.40    |
| 📡 **Offline Friendly** | Availability | quota: 0.40      |

## Self-Healing

- **Temporary exclusion**: Score < 0.2 → excluded for 5 min (progressive backoff, max 30 min)
- **Circuit breaker awareness**: OPEN → auto-excluded; HALF_OPEN → probe requests
- **Incident mode**: >50% OPEN → disable exploration, maximize stability
- **Cooldown recovery**: After exclusion, first request is a "probe" with reduced timeout

## Bandit Exploration

5% of requests (configurable) are routed to random providers for exploration. Disabled in incident mode.

## API

```bash
# Create auto-combo
curl -X POST http://localhost:20128/api/combos/auto \
  -H "Content-Type: application/json" \
  -d '{"id":"my-auto","name":"Auto Coder","candidatePool":["anthropic","google","openai"],"modePack":"ship-fast"}'

# List auto-combos
curl http://localhost:20128/api/combos/auto
```

## Task Fitness

30+ models scored across 6 task types (`coding`, `review`, `planning`, `analysis`, `debugging`, `documentation`). Supports wildcard patterns (e.g., `*-coder` → high coding score).

## Files

| File                                         | Purpose                               |
| :------------------------------------------- | :------------------------------------ |
| `open-sse/services/autoCombo/scoring.ts`     | Scoring function & pool normalization |
| `open-sse/services/autoCombo/taskFitness.ts` | Model × task fitness lookup           |
| `open-sse/services/autoCombo/engine.ts`      | Selection logic, bandit, budget cap   |
| `open-sse/services/autoCombo/selfHealing.ts` | Exclusion, probes, incident mode      |
| `open-sse/services/autoCombo/modePacks.ts`   | 4 weight profiles                     |
| `src/app/api/combos/auto/route.ts`           | REST API                              |
