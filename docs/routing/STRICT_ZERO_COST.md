---
title: "STRICT_ZERO_COST"
version: 3.8.50
lastUpdated: 2026-08-20
---

# STRICT_ZERO_COST

> Opt-in, off by default (`settings.freeAccessPolicy !== "strict"` leaves every `auto/*`
> candidate pool byte-identical). A stricter sibling of `hidePaidModels`
> (`open-sse/services/autoCombo/paidModelFilter.ts`, #6512) for operators who need a hard
> guarantee against ANY incremental monetary spend, not just "documented as free".

## Why this exists, and why `hidePaidModels` alone isn't enough

`hidePaidModels` answers "is this model classified free in `FREE_MODEL_BUDGETS` right now?" —
a point-in-time catalog fact, checked via `isFreeModel()`/`providerHasFreeModels()`
(`src/shared/utils/freeModels.ts`). It says nothing about two real risks:

1. A `recurring-*`/`one-time-initial` free tier's allowance can be **exhausted** — the catalog
   still lists the model as free, but the account behind it has no headroom left.
2. Exceeding a free tier is not always a hard stop. Some providers document explicitly that no
   payment method can ever be attached ("no credit card required"); others don't say, and a
   handful bill automatically past the free allowance.

`hidePaidModels` cannot distinguish these — it was never meant to. STRICT_ZERO_COST adds exactly
these two checks, evaluated per candidate, **before** category/tier ranking and **before**
dispatch — never after a request has already gone out.

## Candidate classification

For every candidate in the pool (`open-sse/services/autoCombo/virtualFactory.ts::buildPreparedPool`,
right after `filterPaidOnlyCandidates`):

1. **Not in `FREE_MODEL_BUDGETS` at all** → excluded. This covers genuinely paid models and any
   provider/model OmniRoute hasn't classified yet — new candidates start excluded, not included.
2. **`freeType: "keyless"`** → passes immediately, **but only for a candidate that genuinely
   arrived via the no-auth path** (`connectionId === SYNTHETIC_NOAUTH_CONNECTION_ID`,
   `open-sse/services/autoCombo/resilienceCandidateFilter.ts`). No credential exists for that
   candidate, so no request against it can ever be billed — no runtime check is needed or
   possible. The same catalogued `keyless` provider/model reached through a **real** DB
   connection (`connectionId` is an actual connection id, or the candidate carries
   `allowedConnectionIds`) does **not** get this shortcut — `keyless` metadata describes the
   no-auth path specifically, not the provider in general, and never authorizes a real,
   credentialed account. Such a candidate falls through to check 3 like any other, where it is
   excluded unless the catalog entry separately carries `hardStopGuaranteed: true` (real
   `keyless` entries never do — the shortcut was their only path to safety).
3. **Any other `freeType`** (`recurring-daily`, `recurring-monthly`, `recurring-credit`,
   `recurring-uncapped`, `one-time-initial`, and any future type this module doesn't
   special-case) → passes only if **all** of the following hold:
   - `hardStopGuaranteed: true` is set on the catalog entry (`FreeModelBudget.hardStopGuaranteed`,
     `open-sse/config/freeModelCatalog.ts`) — a **curated, hand-set fact** about the provider's
     own published terms (e.g. an explicit "no credit card required" claim), never derived from
     `freeType` or from a live API response. Unset (`undefined`) and `false` are both treated as
     "not guaranteed".
   - A usage adapter exists for the provider in `USAGE_FETCHER_PROVIDERS`
     (`open-sse/services/usage.ts`) — the same registry that already backs the quota dashboard and
     `getUsageForProvider()`. No adapter → excluded, permanently, until one is added.
   - The live, cached `FreeAccessState` for **the specific connection actually being
     evaluated** is `status: "SAFE"`, was checked within
     `settings.autoRefreshProviderQuotaInterval` (default 180s — the existing setting, not a new
     number), and reports `remainingFreeAllowance` above a small safety margin.
4. **`freeType: "discontinued"`** → always excluded.

## Connection safety (per-connection verification, never per-candidate)

A candidate in the auto-combo pool is not always tied to one connection. A "logical" candidate
(`connectionId: null`) carries an `allowedConnectionIds` allowlist — one or more actual
provider connections/accounts any of which could serve the request — and the account actually
used is decided later, at dispatch time, by `open-sse/services/combo/autoStrategy.ts`
(intersecting `allowedConnectionIds` against its own connection-selection logic, ~line 315-331).

STRICT_ZERO_COST verifies the free-access state of **each connection in that allowlist
individually** (`evaluateCandidateConnections()` in `strictZeroCostFilter.ts`) and rewrites
`allowedConnectionIds` down to exactly the subset that came back `SAFE` — never the full
original list, and never a single arbitrarily-chosen member. Concretely:

- Account A `SAFE`, account B `UNKNOWN`/exhausted/billable → only A remains selectable.
- All accounts `UNKNOWN` → the candidate is dropped entirely (empty safe set).
- A single-connection candidate (`connectionId` set directly, no allowlist) that fails is
  dropped outright, never returned with an empty `allowedConnectionIds`.

Because `autoStrategy.ts` already enforces `allowedConnectionIds` as a hard allowlist before
selecting a connection to dispatch to, rewriting it to the verified-SAFE subset is sufficient to
guarantee the connection actually used at dispatch is always one this filter itself verified —
never a different, unverified account on the same candidate. See
`tests/unit/autoCombo/strict-zero-cost-connection-safety.test.ts` for the regression proof
(keyless-bypass cases A/B/C, multi-account cases 1-5).

`discovered automatically`: a provider/model shipped tomorrow with the right metadata (in the
catalog, with a usage adapter, `hardStopGuaranteed: true`) is usable the moment OmniRoute knows
about it — no code change, no whitelist entry, nothing to edit in this module. One removed from
the catalog disappears the same way. See
`tests/unit/autoCombo/strict-zero-cost-autodiscovery.test.ts` for the regression proof (via
injectable fixtures, not by mutating the real catalog).

## Quota caching (`open-sse/services/autoCombo/freeAccessQuota.ts`)

Reuses `getUsageForProvider()` — no second quota system. A short, in-memory,
process-lifetime cache sits in front of it (TTL equal to the default
`autoRefreshProviderQuotaInterval`) so a Telegram-scale request rate never triggers a live
billing-API call per candidate per request. Reads are synchronous: a cache miss returns
`undefined` (→ excluded, fail-closed) and kicks off a background refresh for the _next_ read —
nothing in the candidate-pool build path ever awaits a network call.

`invalidateFreeAccessState(provider, connectionId)` is called from
`src/sse/services/auth.ts::markAccountUnavailable()` the moment a connection fails for any
reason, so the very next pool build reads a clean cache miss instead of a stale `SAFE` entry —
no waiting out the TTL after a 402/403/quota-exhausted response.

## ToS guard (independent of economic safety)

`excludeTosAvoid` (default `false`) drops any candidate whose curated `tos` verdict
(`FreeModelBudget.tos`) is `"avoid"` — reuses the same field `hidePaidModels`'s sibling docs
(`docs/reference/FREE_TIERS.md`) already populate. Deliberately separate from
`freeAccessPolicy`: a candidate can be economically `SAFE` and still excluded here for
contractual reasons, or left in when this guard is off even with `freeAccessPolicy: "strict"` on.

## Seeing what the guard excludes

`GET /v1/auto-combo/{channel}/candidates` lists every candidate, including the ones this guard
would keep out of dispatch, and each carries `freeAccessExclusion` — `null` when the guard is
satisfied, otherwise the reason. The listing reports; it never enforces. Turning the policy off
leaves the field `null` everywhere and costs nothing.

| `freeAccessExclusion`  | What it means                                                                                                 | What to do about it                                                                                                                 |
| :--------------------- | :------------------------------------------------------------------------------------------------------------ | :---------------------------------------------------------------------------------------------------------------------------------- |
| `not-in-catalog`       | The provider/model pair is absent from `FREE_MODEL_BUDGETS`.                                                  | Add a curated entry, or accept that new pairs start excluded — that is the design.                                                  |
| `regime-not-free`      | Catalogued, but its `freeType` is not one that grants free access (a discontinued tier, for instance).        | Nothing to fix. The model costs money.                                                                                              |
| `no-hard-stop`         | Free regime, but `hardStopGuaranteed` is not `true`, so exceeding the allowance might silently start billing. | Verify the provider's terms and set the flag with the source in a comment — never to grow the catalog.                              |
| `contradictory-noauth` | A no-auth candidate whose catalog entry is not `keyless`. Fail-closed on inconsistent metadata.               | Fix the catalog entry; the two facts disagree.                                                                                      |
| `exhausted`            | A fresh reading says the allowance is used up.                                                                | Wait for the reset. This one resolves itself.                                                                                       |
| `state-unknown`        | No quota reading, or one too old to trust.                                                                    | Go look: the provider may have no usage adapter registered, or the quota fetch is failing.                                          |
| `no-connection`        | The candidate carries no account to check at all.                                                             | Not a quota problem: the candidate was built without a connection, so nothing was ever looked up. Check how the pool was assembled. |

The last two are the pair worth separating. An exhausted allowance resets on its own; a reading
that never arrives means the lookup itself is broken, and until now both looked identical from
outside — the candidate simply vanished.

**One gap remains, and it is deliberate.** `excludeTosAvoid` still removes candidates before the
listing is built, so a model curated `tos: "avoid"` is absent with no reason given — the same
invisibility this section just closed for the zero-cost guard. Closing it too means deciding what
a ToS exclusion should report, which is a separate question from economic safety; this page names
the gap rather than pretending it is not there.

For an offline before/after, `npx tsx scripts/ad-hoc/dry-run-strict-zero-cost.ts` still works
against a live instance's candidates output; it reads each candidate's real `connectionId`, so it
also exercises the connection-safety path. Keyless candidates must arrive with the synthetic
no-auth `connectionId`, never a real connection. The current built-in keyless auto path is OpenCode Free; exact candidate counts
still depend on live model discovery and should be measured on the target deployment instead of
copied from an older run. A `recurring-*` candidate passes only when it has both a registered
usage adapter and `hardStopGuaranteed: true`; incomplete metadata remains fail-closed.

With `excludeTosAvoid: true`, every candidate curated as `tos: "avoid"` is removed. OpenCode Free
currently carries that verdict, so enabling the guard can empty a deployment's remaining keyless
pool. This is an expected trade-off of turning the ToS guard on, not a bug: the guard is `false`
by default for exactly this reason (see "ToS guard" above).

## Enabling

```json
PUT /api/settings
{ "freeAccessPolicy": "strict", "excludeTosAvoid": false }
```

Both new settings default to their pre-feature values (`"off"` / `false`) — enabling neither
changes any existing `auto/*` routing behavior.
