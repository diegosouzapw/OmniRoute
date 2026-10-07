---
title: "Subscription-first routing"
version: 3.8.50
lastUpdated: 2026-08-22
---

# Subscription-first routing

> Two new `auto/*` ids — `auto/subscription` and `auto/thrifty`. Both are opt-in by being
> requested: nothing routes through them unless a caller asks for the id by name, and no
> existing pool, strategy, or default changes.

## Why this exists

OmniRoute already answers two cost questions, and neither is the one most operators ask.

| Existing mechanism                                       | Answers                             |
| -------------------------------------------------------- | ----------------------------------- |
| `hidePaidModels` (`autoCombo/paidModelFilter.ts`)        | "is this model catalogued free?"    |
| `freeAccessPolicy: "strict"` (`strictZeroCostFilter.ts`) | "can this connection ever bill me?" |
| `quotaPreflight` (`combo/quotaExhaustionCutoff.ts`)      | "is this connection near its wall?" |
| `budgetCap` / `budgetFallback` (`autoCombo/engine.ts`)   | "cap spend, degrade to cheapest"    |

Every free-only mechanism **fails closed** — an exhausted free pool is an empty pool, never a
step up to a paid option — and every paid-side mechanism is tier-agnostic. Neither answers:

> "Use the quota I already pay for. When it runs out, either stop, or step up one rung at a
> time through the cheapest paid options — and come back the moment it resets."

## Billing is a connection fact, not a model fact

`classifyTier()` (`open-sse/services/tierResolver.ts`) keys on `(provider, model)` and returns
`free | cheap | premium` from catalog pricing. But whether a request costs incremental money
depends on **which connection serves it**: the same model is plan-included through a Claude Code
OAuth connection and billed per token through an API-key connection.

`provider_connections.auth_type` is not a safe proxy in either direction — metered OAuth
connections exist, and plan-included API-key connections exist (a Copilot seat token is not a
metered API key). So billing class comes from a **curated catalog**,
`open-sse/config/connectionBillingCatalog.ts`, hand-set from each provider's published terms —
the same pattern `FreeModelBudget.hardStopGuaranteed` already established for free models.

```ts
type ConnectionBillingClass = "subscription" | "metered" | "keyless" | "unknown";
type ConnectionOverageBehavior = "hard-stop" | "meters-to-paid" | "unknown";
```

Resolution order (`autoCombo/connectionBilling.ts`): the synthetic no-auth sentinel →
`keyless`; a catalog entry matching provider **and** `authType`; a provider-wide entry;
otherwise `unknown`. **Uncurated is not free** — `unknown` is consumed as `metered`
everywhere, so a provider added tomorrow starts outside the subscription rung and has to be
curated in deliberately.

## The rung model

Five rungs in escalation order. They differ in more than price — each has its **own**
exhaustion signal, which is why this is not merely a sort.

| #   | Rung           | Membership                                         | Exhausted when                |
| --- | -------------- | -------------------------------------------------- | ----------------------------- |
| 0   | `subscription` | curated `billing: "subscription"`                  | quota window at/below cutoff  |
| 1   | `keyless`      | the synthetic no-auth path                         | connection cooldown / breaker |
| 2   | `free`         | metered connection, `classifyTier() === "free"`    | free allowance exhausted      |
| 3   | `cheap`        | metered connection, `classifyTier() === "cheap"`   | per-rung budget consumed      |
| 4   | `premium`      | metered connection, `classifyTier() === "premium"` | per-rung budget consumed      |

Rungs 0-2 exhaust on **quota**, which is observable and already tracked. Rungs 3-4 have no
quota — a paid connection serves forever — so their only sane exhaustion signal is a per-rung
**budget**. Without one, "escalate when cheap is exhausted" has no trigger.

## `auto/subscription` — fail closed

Pool = rung 0 only, restricted to connections whose overage is a documented `hard-stop`, each
verified live to have quota headroom. Everything ambiguous is excluded: an uncurated provider,
an unverifiable quota reading, a stale reading, or an overage that meters to paid.

An empty pool is the **intended** answer, not a defect — the caller's existing empty-pool path
turns it into a clear error rather than a silent, billable fallback. That is the whole promise
of the id.

`keyless` deliberately does **not** qualify: this grouping means "the plan I pay for", so a
no-auth backend does not belong in it. Use `auto/thrifty` (or `auto/best-free`) for that.

### Connection safety

A candidate is not always tied to one connection — a logical candidate carries an
`allowedConnectionIds` allowlist, and the account actually used is chosen later, at dispatch,
by `open-sse/services/combo/autoStrategy.ts`. Both groupings therefore verify **each connection
individually** and rewrite `allowedConnectionIds` down to exactly the surviving subset — never
the full original list, never one arbitrarily-chosen member. Because `autoStrategy.ts` already
enforces that array as a hard allowlist, rewriting it here makes "verified" and "actually used"
the same set by construction. This is the same invariant, and the same reasoning, as
[STRICT_ZERO_COST](./STRICT_ZERO_COST.md).

## `auto/thrifty` — escalate one rung at a time

Pool = all rungs, ordered by rung index, with exhausted candidates gated out. The `auto` engine
still scores **within** the surviving pool: the ladder decides which rungs are in play, scoring
decides which candidate wins inside them. Ordering is stable within a rung, so the scorer's own
ranking is never reshuffled by this overlay.

This is an ordering + gating overlay, **not** a new dispatcher: `combo.ts`'s speculative loop
already walks targets in order and falls through on failure, so a runtime exhaustion the
preflight did not catch still escalates to the next rung inside the same request.

Where `auto/subscription` fails closed, `auto/thrifty` fails **open**: a plan-included
connection with no usable quota reading is still tried first. Trying it costs nothing, and if
it turns out to be exhausted the fall-through reaches the next rung anyway — whereas refusing
to try it would send the request to a paid rung on missing telemetry, the exact outcome the
grouping exists to avoid.

## Returning to the plan after a reset

Three independent things must expire before routing returns to rung 0. Fixing only one leaves
the ladder stuck on paid rungs long after the plan refilled.

1. **The quota-state cache** — `freeAccessQuota.ts` caches per `(provider, connection)` with a
   180s TTL. A cached entry whose own `resetAt` has already passed describes a window that no
   longer exists, so it is now treated as stale **regardless of age** and forces a refresh.
   Without this, a plan that refilled at midnight keeps reading exhausted until the TTL happens
   to lapse.
2. **The ladder's own state** — there is none, by design. Rung eligibility is recomputed from
   live quota state on every pool build; no persisted "currently on rung 3" record exists that
   could outlive a reset and wedge routing.
3. **The connection cooldown** — the exhausting 429 sets `rateLimitedUntil` from exponential
   backoff, which for a plan connection can overshoot the real reset. `clampCooldownToReset()`
   (`subscriptionLadder.ts`) narrows a cooldown to the upstream's own reset instant and can
   never extend one. **It is implemented and tested but not yet wired**: the quota cache is
   invalidated in `src/sse/services/auth.ts` _before_ any cooldown is written, so `resetAt`
   must be captured earlier in that function — a change to the resilience hot path that
   belongs in its own reviewed PR. Until then, re-entry waits out the connection cooldown
   (which already prefers upstream `Retry-After` hints when the provider sends them).

### Anti-flap

A rung that just reset is re-admitted only above `reentryMinRemainingPercent` (default 5),
while a connection already in play only has to stay above `exitCutoffPercent` (default 2,
matching `quotaPreflight.defaultThresholdPercent`). The gap is the hysteresis band — without
it, a connection hovering at the cutoff oscillates between rungs on consecutive requests.

## Configuration

Tuning only. There is deliberately **no** `enabled` flag: a toggle able to switch these off
would leave `auto/subscription` quietly serving the full pool — paid models included — under a
name that promises the opposite.

```jsonc
{
  "subscriptionLadder": {
    "exitCutoffPercent": 2,
    "reentryMinRemainingPercent": 5,
    "rungBudgetUsd": { "cheap": 5.0, "premium": 0 }, // 0 disables a rung outright
  },
}
```

Budget gating is inert until a spend resolver is wired: with no accounting available a paid
rung is ordered but never gated. As of v3.8.51 the `rungBudgetUsd` setting is accepted by the
schema but NOT yet enforced — treat it as reserved configuration, not an active spend cap. Rung ordering, quota-based exhaustion, and reset re-entry all
work without it.

## Composition

`subscription` and `thrifty` are `AutoTier` values, so they compose with every category:
`auto/coding:thrifty`, `auto/reasoning:subscription`, and so on. The two flat ids
(`auto/subscription`, `auto/thrifty`) are advertised in `/v1/models` and the dashboard.

Neither id is paid-tier, so `isPaidTierAutoId()` returns `false` for both and
`auto/subscription` survives `hidePaidModels`.

## Where the code lives

| Concern                         | File                                                |
| ------------------------------- | --------------------------------------------------- |
| Curated billing facts           | `open-sse/config/connectionBillingCatalog.ts`       |
| Classifier                      | `open-sse/services/autoCombo/connectionBilling.ts`  |
| Rungs, both groupings, re-entry | `open-sse/services/autoCombo/subscriptionLadder.ts` |
| Wiring into the candidate pool  | `open-sse/services/autoCombo/virtualFactory.ts`     |
| Reset-aware cache staleness     | `open-sse/services/autoCombo/freeAccessQuota.ts`    |
| Tier surface                    | `open-sse/services/autoCombo/suffixComposition.ts`  |
| Advertised ids                  | `open-sse/services/autoCombo/builtinCatalog.ts`     |
| Tests                           | `tests/unit/autoCombo/subscription-ladder.test.ts`  |
