# OmniRoute Fork Audit -- Bifrost Decision Brief

> **Date**: 2026-09-12
> **Decision deadline**: 2026-09-17 (90-day post-B6 review per ADR-031)
> **Fork version**: 3.8.49-koosha.0
> **Upstream**: diegosouzapw/OmniRoute @ v3.8.51

---

## 1. Current Bifrost Integration State

The Bifrost integration has been **substantially rearchitected** since the original
worklogs (L5-110 through L5-115). The original executor-based approach
(`open-sse/executors/bifrost.ts`) has been replaced with a supervised sidecar
service pattern.

### Architecture (current)

```
Client --> /api/v1/relay/chat/completions/bifrost (Next.js route)
  --> Auth + Rate Limit + Injection Guard (stays in TS)
  --> HTTP relay to Go Bifrost sidecar (127.0.0.1:8080)
  --> Response back to client
  --> On failure: X-Bifrost-Fallback header signals TS fallback path
```

### What shipped (ALL 9/9 NOW COMPLETE)

| Task | Status | Evidence |
|---|---|---|
| B1: Pick canonical Bifrost copy | Done | ADR-031, `KooshaPari/bifrost` |
| B2-B3: Relay route + provider map | Done | `bifrost/route.ts` (382 LOC), `routingBackend.ts` |
| B4: DB migration 115 | Done | `115_bifrost_service.sql` seeds version_manager |
| B5: Virtual-key minting UI | Done | PR #90 merged |
| B6: Traffic-shadow dispatcher | Done | PR #89 merged |
| B7: Migration playbook | Done | `docs/operations/bifrost-migration.md` |
| B8: MCP client integration | **DEFERRED** | Substrate MCP took priority |
| B9: Kill switch + cooldown | Done | `bifrostCooldown.ts` + `BIFROST_ENABLED` env |
| B9.1: Kill switch executor wiring | **DONE** | PR #98 merged 2026-07-02 |

**Decision deadline**: 2026-09-17 (90-day post-B6 review per ADR-031).

## 2. Decision Options

### Option A: COMMIT (keep Bifrost as Tier-1 router)

**Pros**: ~1,800 LOC production code, full lifecycle management, 800 LOC tests, Go perf benefit.
**Cons**: No production metrics, upstream maintenance unknown, operational complexity.
**Recommendation**: COMMIT with conditions (verify upstream health, run benchmarks, shadow deploy).

### Option B: REVERT (remove Bifrost, keep TS-only path)

**Pros**: Simpler architecture, no Go dependency, battle-tested TS path.
**Cons**: Loses ~2,600 LOC of work, loses Go perf benefit.

### Option C: DEFER (keep code, delay decision 90 more days)

**Pros**: No code changes, time to gather metrics.
**Cons**: Technical debt, decision keeps getting pushed.

## 3. Recommendation

**Option A: COMMIT** -- but with conditions:
1. Verify `maximhq/bifrost` upstream health (last commit, open issues)
2. Run local benchmark comparing Bifrost relay vs TS path
3. Deploy Bifrost in shadow mode (5% traffic) and collect metrics
4. By Oct 17: make final commit/revert decision with real data
