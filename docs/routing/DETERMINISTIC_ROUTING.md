---
title: "Deterministic Routing Strategies"
---

# Deterministic routing strategies

OmniRoute's self-hosted gateway entry (`/v1/chat/completions`, RIC-738) routes to a
single provider by default. When you configure a `strategy:` block, the route decision
becomes a **deterministic, explainable policy** — the OmniRoute differentiator vs
NotDiamond/Martian "predict" black-box routing.

Every decision is:

- **Deterministic** — the same config + same runtime state yields the same provider.
- **Config-expressed** — one rule per line; no "一体化智能体", no learned model.
- **Explainable** — every response carries `x-omniroute-route-decision`, a one-line
  answer to "why this model?" (and "why NOT that one").

This is M2 of the RIC-697 differentiation (D3 可审计路由). There is **no predictive /
ML dependency** — the strategies are pure rules over observable signals
(consecutive failures, declared cost, measured latency).

## Enable

Add a `strategy:` block to the same YAML document as `providers:`, or point
`OMNIROUTE_SELF_HOSTED_STRATEGY` (inline YAML) / `OMNIROUTE_SELF_HOSTED_STRATEGY_FILE`
(a file) at a standalone `strategy:` document. An explicit env strategy merges over
the inline block per-key.

```yaml
# providers.yaml
providers:
  - id: cheap
    kind: openai
    baseUrl: http://127.0.0.1:11434/v1
    model: llama3
    costPer1MInput: 0.2 # USD per 1M input tokens — used by cost-priority
  - id: fast
    kind: openai
    baseUrl: http://127.0.0.1:8080/v1
    model: gpt-4o-mini
    costPer1MInput: 0.6
  - id: premium
    kind: anthropic
    baseUrl: http://127.0.0.1:8081
    model: claude-sonnet
    costPer1MInput: 3.0

strategy:
  blacklist: [] # provider ids never used
  whitelist: [cheap, fast, premium] # when non-empty, ONLY these are used
  costPriority: true # cheapest eligible candidate first
  latencyAware:
    enabled: true # fastest recent-average candidate first
  cooldown:
    consecutiveFailures: 2 # breaker trips after this many in a row
    cooldownMs: 30000 # …and the provider stays excluded this long
  fallbackChain: [cheap, fast, premium] # explicit fallback order
```

## The five strategies

| Strategy         | Config                                        | Effect                                                                                                 |
| ---------------- | --------------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| Blacklist        | `blacklist: [id, ...]`                        | Listed providers are never candidates.                                                                 |
| Whitelist        | `whitelist: [id, ...]`                        | Non-empty → only listed providers are candidates.                                                      |
| Cooldown/breaker | `cooldown: {consecutiveFailures, cooldownMs}` | After N consecutive failures a provider is excluded for the window. A success resets the counter.      |
| Cost-priority    | `costPriority: true`                          | Eligible candidates sorted by `costPer1MInput` ascending (declared, never fabricated).                 |
| Latency-aware    | `latencyAware.enabled: true`                  | Eligible candidates sorted by recent average request latency ascending. Unsampled providers sort last. |
| Fallback chain   | `fallbackChain: [id, ...]`                    | Explicit primary→backup order. Wins over cost/latency ordering.                                        |

Filters (blacklist / whitelist / cooldown) run first and remove candidates. Then the
ordering stage sorts the survivors: explicit `fallbackChain` wins; otherwise
`costPriority` then `latencyAware` apply in that order.

## Pinned providers

The `x-omniroute-provider` header and the `provider/model` model-prefix are **explicit
pins**, not preferences. If a pinned provider is excluded by a hard filter (blacklist /
whitelist / active cooldown), the request fails with `400` and the pin reason — the
gateway never silently re-routes a client who asked for a specific provider. If the pin
survives the filters it is the first candidate, and the remaining candidates serve as
its fallback chain.

## Fallback on failure

The ordered candidate list is the fallback chain. When the first provider fails
(network unreachable, connection refused, DNS/TLS, or any non-2xx), the gateway walks
the next candidate, and so on. Each failure is recorded into the cooldown breaker and
each attempt is latency-sampled — so a broken primary also cools down for _subsequent_
requests. When every candidate fails, the last normalized error (OpenAI shape) is
returned. When no candidate is eligible at all, a `503` with the full explainable
decision is returned.

## Explainability

Every response routed through the strategy engine carries:

```
x-omniroute-route-decision: cheap(cost-priority: cheap #1) -> fast(cost-priority: fast #2); premium excluded: blacklist: premium forbidden
```

The value is the ordered candidate list plus every exclusion reason — the audit trail
for "why this model, why not that one".

## Failure contract (unchanged from RIC-738)

- Upstream non-2xx body is normalized through `parseUpstreamError` + `buildErrorBody`
  into the standard OpenAI `error` shape (Hard Rule #12).
- Network-level failures return a normalized `502`; after the whole chain is exhausted,
  the last normalized error is surfaced.
- Credential / session headers echoed upstream are stripped from every response.
- Provider config with a malformed `strategy:` block returns `500` — a misconfigured
  policy never silently becomes a no-op.

## Tests

- `tests/unit/routing-strategies.test.ts` — 25 unit tests over the pure strategy engine:
  parse, blacklist/whitelist, cooldown breaker, cost-priority, latency-aware, fallback
  chain, combined pipeline, explainability.
- `tests/unit/self-hosted-entry.test.ts` — fault injection over real HTTP: primary down
  → fallback succeeds; all-down → last error; pinned-blacklisted → 400; cooldown
  excludes a failing provider on the next request; no-eligible → 503 with explainable
  decision.
