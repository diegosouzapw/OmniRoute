# Quota Sharing Improvements Plan

**Branch**: `fix/quota-sharing-improvements` (from `upstream/release/v3.8.11`)
**Date**: 2026-06-06
**Scope**: Fix critical bugs and improve the Quota Sharing Engine

---

## Summary

The Quota Sharing Engine has solid architecture but several implementation gaps that make
the dashboard usage display non-functional and limit enforcement coverage. This plan
addresses 7 issues in priority order.

---

## Fix 1: poolUsage() Dead Code (HIGH)

**Problem**: `poolUsage()` on both `SqliteQuotaStore` and `RedisQuotaStore` returns empty
`dimensions[]` always. The richer `poolUsageWithDimensions()` exists on the concrete classes
but not on the `QuotaStore` interface. The REST route uses a dynamic type-narrowing hack.

**Solution**: Add `poolUsageWithDimensions()` to the `QuotaStore` interface.

**Files**:
- `src/lib/quota/types.ts` — add method to `QuotaStore` interface
- `src/lib/quota/QuotaStore.ts` — re-export updated type
- `src/lib/quota/sqliteQuotaStore.ts` — method already exists, no change needed
- `src/lib/quota/redisQuotaStore.ts` — method already exists, no change needed
- `src/app/api/quota/pools/[id]/usage/route.ts` — remove type-narrowing hack

**Verification**: `npm run typecheck:core`, existing tests pass.

---

## Fix 2: Burn Rate Broken (HIGH)

**Problem**: `poolUsageWithDimensions()` pushes only 1 sample (`{ ts: nowMs, consumed }`).
`computeBurnRate()` requires ≥2 samples → always returns `{ tokensPerSecond: 0, timeToExhaustionMs: null }`.

**Solution**: Derive burn rate from the sliding window itself. The window has a known duration
and the current consumption is known. Rate = consumedTotal / elapsedInWindow. This gives a
meaningful rate from a single snapshot.

**Files**:
- `src/lib/quota/burnRate.ts` — add `computeBurnRateFromWindow()` helper
- `src/lib/quota/sqliteQuotaStore.ts` — use new helper in `poolUsageWithDimensions()`
- `src/lib/quota/redisQuotaStore.ts` — use new helper in `poolUsageWithDimensions()`

**Verification**: Unit test for `computeBurnRateFromWindow()`, existing tests pass.

---

## Fix 3: Equal-Weight Fallback (MEDIUM)

**Problem**: When all allocations have `weight: 0`, `enforce.ts` computes `100 / allocCount`
per-request. This is fragile if allocations change mid-window.

**Solution**: Normalize weights at write time in `upsertAllocations()`. If all weights are 0,
distribute equally and persist the normalized weights.

**Files**:
- `src/lib/db/quotaPools.ts` — normalize in `upsertAllocations()`

**Verification**: Unit test for weight normalization, existing tests pass.

---

## Fix 4: Saturation Signal Coverage (MEDIUM)

**Problem**: Only 3 fetchers (Codex, Bailian, generic). Most providers return 0 (always generous).

**Solution**: Add Anthropic rate-limit header parsing (the most popular quota-limited provider).
Anthropic returns `anthropic-ratelimit-unified-5h-utilization` and similar headers. Also
improve the generic fallback to parse common `x-ratelimit-*` headers.

**Files**:
- `src/lib/quota/saturationSignals.ts` — add `fetchAnthropicSaturation()`, improve generic

**Verification**: Unit tests for new fetcher, existing tests pass.

---

## Fix 5: Webhook Integration (MEDIUM)

**Problem**: No webhook fired when quota sharing blocks a request.

**Solution**: Fire existing `quota.exceeded` event in `enforceQuotaShare()` when decision is `block`.

**Files**:
- `src/lib/quota/enforce.ts` — fire webhook on block decision

**Verification**: Unit test for webhook firing, existing tests pass.

---

## Fix 6: Non-Chat Enforcement (LOW)

**Problem**: Quota enforcement only in `chatCore.ts`. Embeddings/images bypass it.

**Solution**: Add `enforceQuotaShare()` + `scheduleRecordConsumption()` to embeddings handler.

**Files**:
- `open-sse/handlers/embeddings.ts` — add quota hooks

**Verification**: Existing tests pass.

---

## Fix 7: REST Route Cleanup (LOW)

**Problem**: Usage route uses `as unknown as { poolUsageWithDimensions?: ... }` type narrowing.

**Solution**: After Fix 1, the method is on the interface — call it directly.

**Files**:
- `src/app/api/quota/pools/[id]/usage/route.ts` — simplify

**Verification**: Existing tests pass.

---

## Execution Order

1. Fix 1 (interface) → Fix 7 (route cleanup) — these are coupled
2. Fix 2 (burn rate) — independent
3. Fix 3 (weight normalization) — independent
4. Fix 4 (saturation signals) — independent
5. Fix 5 (webhooks) — independent
6. Fix 6 (non-chat enforcement) — independent

---

## Verification

After all fixes:
```bash
npm run lint
npm run typecheck:core
node --import tsx/esm --test tests/unit/quota-*.test.ts
node --import tsx/esm --test tests/unit/db-quota-*.test.ts
```
