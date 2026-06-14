---
title: "Quota Sharing Engine"
version: 3.8.6
lastUpdated: 2026-05-28
---

# Quota Sharing Engine

> **Doc reference**: `docs/routing/QUOTA_SHARE.md`
> Part of Group B (plans 16 + 22).

---

## Overview

The Quota Sharing Engine distributes a provider's time-based quota (e.g. Codex
5-hour window, Kimi 1500 req/h) fairly across multiple API keys that share the
same connection.

**Problem it solves:** OmniRoute proxies many API keys against the same upstream
provider account. Without sharing logic, a burst from key A can exhaust the
provider quota for the hour, leaving keys B and C blocked until the window resets.
The engine prevents this by:

1. Tracking each key's rolling consumption per dimension (%, requests, tokens, $).
2. Applying a work-conserving fair-share algorithm: a key may borrow from idle
   shares while the global pool is not saturated.
3. Enforcing the result in the hot path (`chatCore.ts`) before the request
   reaches the upstream executor.

---

## Algorithm: Fair-Share Work-Conserving

Implemented in `src/lib/quota/fairShare.ts`.

### Modes

| Condition | Mode | Behaviour |
|-----------|------|-----------|
| `globalUsedPercent < saturationThreshold` | **Generous** | Key may borrow up to global limit minus consumed-total |
| `globalUsedPercent >= saturationThreshold` | **Strict** | Enforce individual fair share strictly |

Default `saturationThreshold = 0.5` (env `QUOTA_SATURATION_THRESHOLD`).

### Per-dimension decision

For each active dimension in the pool, the engine computes:

```
fairShareAllowed = poolLimit × (allocationWeight / 100)
consumed        = current rolling value for this key (from QuotaStore.peek)
remaining       = fairShareAllowed - consumed
```

Then:

- **`policy = hard`**: if `consumed > fairShareAllowed` and mode is strict → **block**.
- **`policy = soft`**: if `consumed > fairShareAllowed` and mode is strict → **penalize** (deprioritize in combo; never hard-block).
- **`policy = burst`**: allow while global headroom exists regardless of fair share.

### Cap absoluto

`capValue` + `capUnit` on an allocation is a hard ceiling independent of mode or
policy. Any dimension where `consumed >= capValue` always **blocks** the request.

### Multi-dimension check

A request is blocked if **any** dimension in the pool would block it. Dimensions
are independent — a 5h% exhaustion does not affect the weekly% dimension.

### Borrowing

In generous mode, a key whose allocation is under-consumed can use surplus from
other keys' unallocated shares. The formula is:

```
maxAllowed = globalLimit - consumedByOtherKeys
```

where `consumedByOtherKeys = consumedTotal - consumedByThisKey`. The teto global
(pool `limit` for that dimension) is always the hard ceiling.

---

## Sliding Window Counter

Implemented in `src/lib/quota/sqliteQuotaStore.ts` and `redisQuotaStore.ts`.

Two buckets per `(apiKeyId, dimensionKey)`:

- `curr`: current bucket (`floor(nowMs / windowMs)`)
- `prev`: previous bucket (`curr - 1`)

Effective rolling value:

```
effectiveBucketIndex = floor(nowMs / windowMs)
bucketStartMs        = effectiveBucketIndex × windowMs
elapsed              = nowMs - bucketStartMs
weight               = 1 - elapsed / windowMs

effective = prev × weight + curr
```

**Precision**: ~99% accurate. The error is at most 1% of the window size at the
boundary between buckets (inherent to the 2-bucket approximation).

### Concurrency

SQLite driver: in-memory mutex per `(apiKeyId | dimensionKey)` key prevents the
read-modify-write race. Pattern mirrors `src/sse/services/auth.ts` anti-thundering-herd.

Redis driver: Lua EVAL script for atomic increment — runs as a single Redis command.

---

## Drivers

### SQLite (default, 0-install)

- Table: `quota_consumption` (see migration `073_quota_pools.sql` / `074_quota_consumption.sql`).
- Best for single-instance deployments.
- All persistence is in the existing OmniRoute SQLite DB (`DATA_DIR/storage.sqlite`).

### Redis (optional, multi-instance)

- Requires `ioredis` npm package.
- Counters stored in Redis; metadata (pools/allocations) still in SQLite.
- Best for multi-replica deployments where counters must be shared.

### Switching drivers

Via settings UI (`/dashboard/settings` → Quota Store), or via env vars:

```bash
QUOTA_STORE_DRIVER=redis
QUOTA_STORE_REDIS_URL=redis://localhost:6379
```

DB setting has precedence over env. If `driver=redis` but URL is absent or
`ioredis` is not installed, the factory falls back to SQLite and logs a warning.

Driver selection order:
1. DB setting `quotaStore.driver`
2. Env `QUOTA_STORE_DRIVER`
3. Default: `sqlite`

---

## Multi-Dimension

A pool can have multiple dimensions. Each dimension is independent:

```ts
QuotaDimension {
  unit: "percent" | "requests" | "tokens" | "usd",
  window: "5h" | "hourly" | "daily" | "weekly" | "monthly",
  limit: number,  // global pool ceiling for this dimension
}
```

**Example: Codex plan** (5h% + weekly%):

```json
[
  { "unit": "percent", "window": "5h",    "limit": 100 },
  { "unit": "percent", "window": "weekly","limit": 100 }
]
```

A request must satisfy all dimensions to be allowed.

---

## Plan Resolver

Implemented in `src/lib/quota/planResolver.ts`.

Precedence (highest to lowest):

1. **Manual DB override** — `provider_plans` table, per `connectionId`.
2. **Known catalog** — `src/lib/quota/planRegistry.ts` (data-only).
3. **Empty plan** — no dimensions, manual configuration required.

### Known catalog

| Provider | Dimensions |
|----------|-----------|
| `codex` | `percent/5h/100`, `percent/weekly/100` |
| `glm` | `tokens/5h` (limit=0, unknown), `tokens/weekly` |
| `minimax` | `tokens/5h`, `tokens/weekly` |
| `bailian` | `percent/5h/100`, `percent/weekly/100`, `percent/monthly/100` |
| `kimi` | `requests/hourly/1500` |
| `alibaba` | `requests/monthly/90000` |
| `openai`, `anthropic` | No default — manual configuration required |

---

## Pipeline Integration

### PRE hook (`open-sse/handlers/chatCore.ts`)

Runs before the upstream executor, after auth and policy checks:

```
resolveComboTargets / handleSingleModel
  → enforceQuotaShare(apiKeyId, connectionId, provider, estimatedCost)
      → getQuotaStore().peek() per dimension
      → fairShare.decideFairShare()
      → if block → return 429 (buildErrorBody, Hard Rule #12)
      → if allow + deprioritize → set quotaSoftPenalty=true on candidate
  → executor.execute()
```

**Fail-open**: if `enforceQuotaShare` throws, the request is allowed through
with a `pino.warn` log. This prevents a quota-engine bug from blocking all
traffic.

### POST hook (record consumption)

After a successful response:

```
executor returns success
  → spendRecorder.recordConsumption(apiKeyId, connectionId, provider, actualCost)
      → getQuotaStore().consume() per dimension
      → fail-open: errors logged as pino.warn, never propagated to client
```

**Drift note**: if `consume` fails post-response, the rolling counter under-counts.
The saturation signal from the provider (e.g. `anthropic-ratelimit-unified-5h-utilization`)
corrects the global estimate on the next request.

### Combo soft penalty (`open-sse/services/combo.ts`)

When `decision.deprioritize === true`:

```ts
if (candidate.quotaSoftPenalty) {
  score *= QUOTA_SOFT_DEPRIORITIZE_FACTOR;  // default 0.7
}
```

The penalty is applied after all other scoring factors. It lowers the auto-combo
probability of selecting a saturated key without hard-blocking it.

---

## UI Walkthrough

### `/dashboard/costs/quota-share` — Main pools page

Components (all in `src/app/(dashboard)/dashboard/costs/quota-share/`):

| Component | Purpose |
|-----------|---------|
| `QuotaConceptCard` | Introductory card explaining quota sharing to new users |
| `CreatePoolModal` | Create a new quota pool (connection + name + initial allocations) |
| `PoolCard` | Per-pool summary: name, connection, allocation count |
| `DimensionBar` | Per-dimension stacked bar: each key's share + global usage |
| `AllocationTable` | Table with consumed, fair share, deficit/surplus, borrowing flag |
| `BurnRateChart` | EMA burn-rate line chart (lazy Recharts via `dynamic()`) |
| `EditAllocationsModal` | Edit allocation weights, caps, and policies for a pool |

The page hooks:
- `usePools` — fetches `GET /api/quota/pools` every 30s.
- `usePoolUsage` — fetches `GET /api/quota/pools/[id]/usage` on demand.
- `useLocalStoragePoolMigration` — runs once on mount to migrate legacy LS data.

### `/dashboard/costs/quota-share/plans` — Provider plan config

- `ProviderPlanConfigClient.tsx`: dropdown to select a provider, view resolved
  plan (auto from catalog or manual override), and edit dimensions.
- Changes write to `PUT /api/quota/plans/[connectionId]`.
- Deletion reverts to catalog or empty plan.

---

## Environment Variables

| Variable | Default | Description |
|----------|---------|-------------|
| `QUOTA_STORE_DRIVER` | `sqlite` | Driver to use: `sqlite` or `redis` |
| `QUOTA_STORE_REDIS_URL` | _(empty)_ | Redis URL, e.g. `redis://localhost:6379` |
| `QUOTA_SATURATION_THRESHOLD` | `0.5` | 0..1; `>= threshold` activates strict mode |
| `QUOTA_SOFT_DEPRIORITIZE_FACTOR` | `0.7` | 0..1; multiplier for soft-policy combo score |
| `QUOTA_CONSUMPTION_RETENTION_DAYS` | `14` | Days before GC removes old `quota_consumption` buckets |

DB settings (`quotaStore.*`) override env vars.

---

## Troubleshooting

### Redis configured but not connecting

Check that `ioredis` is installed (`npm ls ioredis`) and `QUOTA_STORE_REDIS_URL`
is reachable. On connection failure the factory falls back to SQLite (logged at
`warn`).

### `peek` returns stale / fail-open

If `peek` throws, `enforceQuotaShare` treats the result as "allow" (fail-open).
Check `pino` logs for `quota:enforce` and `quota:factory` entries to identify
the root cause.

### Consumption counter drift

If the actual provider usage differs from the counters, it is expected — the
2-bucket sliding window has ~1% error at window boundaries, and `consume` is
fire-and-forget post-response. The saturation signal (`saturationSignals.ts`)
reads the real provider utilization with a 30s TTL and adjusts `globalUsedPercent`
accordingly.

### Pool shows "no data" for burn rate

`computeBurnRate` requires at least 2 historical samples. New pools without prior
`consume` calls will show `tokensPerSecond: 0` and `timeToExhaustionMs: null`.

---

## Migration from localStorage

When `/dashboard/costs/quota-share` first loads, the hook `useLocalStoragePoolMigration`
checks:

1. `localStorage.getItem("omniroute:quota-share:pools")` is non-empty.
2. `GET /api/quota/pools` returns `[]` (DB is empty).

If both are true, it posts each legacy pool to `POST /api/quota/pools` in batch,
then removes the localStorage key. The migration is idempotent: condition 2 prevents
re-migration.

---

## DB Schema Summary

Three tables added by migrations `073–075`:

- `quota_pools` + `quota_allocations` — pool definitions and per-key allocations.
- `quota_consumption` — rolling 2-bucket counters per `(apiKeyId, dimensionKey)`.
- `provider_plans` — manual provider plan overrides (dimensions JSON per connectionId).

All tables added via idempotent `CREATE TABLE IF NOT EXISTS` migrations.
