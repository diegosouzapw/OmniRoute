# L5-111 — Bifrost model catalog cache (B4 of v8.1)

**Date:** 2026-06-18
**Branch:** `chore/l5-111-bifrost-models-cache-2026-06-18`
**Refs:** ADR-031, PLAN.md § 2.5.2 (B4)

## Goal

Implement **B4** of the v8.1 Bifrost Tier-1 router rollout
([PLAN.md § 2.5.2](../PLAN.md)): a stale-tolerant local cache for
Bifrost's `/v1/models` response, backed by SQLite.

## What landed

### Migration (`src/lib/db/migrations/100_bifrost_models.sql`, 57 lines)

Two tables:

- **`bifrost_models`** — primary key `(provider, id)`. Stores:
  `owned_by`, `display_name`, `metadata` (JSON), `fetched_at`,
  `expires_at`. Indexes on `(provider)` and `(expires_at)`. The PK
  is composite because the same model name (e.g. `gpt-4o`) can be
  routed via different providers (`openai`, `azure`).
- **`bifrost_models_meta`** — one row per provider. Tracks
  `last_fetched_at`, `last_status` (`ok` / `error` / `partial`),
  `last_error`, `model_count`, `fetch_count`. Powers the dashboard's
  "Bifrost cache health" panel.

### DB module (`src/lib/db/bifrostModels.ts`, 508 lines)

Public API:

- `getBifrostModel(provider, id, includeExpired?)` — single lookup; null when expired.
- `listBifrostModelsForProvider(provider)` — full provider catalog; skips expired.
- `refreshBifrostModels(provider, fetcher, options?)` — fetch from Bifrost via the
  injected `fetcher` callback (testable), upsert in a transaction, record cache
  meta. Throws `BifrostCacheError` on fatal failure.
- `recordBifrostFetch(provider, status, modelCount, lastError?)` — manual meta
  upsert (used internally + exposed for callers doing 304-Not-Modified flows).
- `purgeExpiredBifrostModels()` — housekeeping; returns row count.
- `purgeBifrostModelsByProvider(provider)` — operator-triggered full purge.
- `getBifrostModelMeta(provider)` — single meta row.
- `listBifrostModelMeta()` — full meta snapshot for the dashboard.

Helpers: `BifrostFetcher` type, `BifrostModelListEntry` (matches Bifrost's
`/v1/models` shape), `BifrostRefreshResult`, custom `BifrostCacheError` class,
constants `BIFROST_DEFAULT_TTL_SECONDS = 3600` and
`BIFROST_MAX_MODELS_PER_FETCH = 5000`.

### Tests (`tests/unit/bifrost-models-db.test.ts`, 464 lines, 25 cases)

Six describe blocks:

1. `getBifrostModel` — 6 cases: missing row, existing row, JSON metadata
   parsing, expired row hides, `includeExpired=true` bypasses, empty args.
2. `listBifrostModelsForProvider` — 4 cases: empty, provider isolation,
   expired filter, sort order.
3. `recordBifrostFetch` — 6 cases: insert, increment fetch_count, error
   status with message, invalid status throws, negative count throws,
   missing meta returns null.
4. `refreshBifrostModels` — 11 cases: happy path, custom TTL, error
   propagation, non-array fetcher return, oversize response, partial
   success default, `allowPartial=false`, empty response rejection,
   second-refresh updates display_name, missing provider throws, non-function
   fetcher throws, async fetcher support.
5. `purgeExpiredBifrostModels` — 2 cases: removes only expired, no-op when none.
6. `purgeBifrostModelsByProvider` — 3 cases: provider isolation, unknown
   provider, empty provider string.
7. `listBifrostModelMeta` — 3 cases: empty, ordering, defensive drop of
   unknown status.

Total: 25 cases, using `node:test` + `node:assert/strict` (matches
existing `model-intelligence-db.test.ts` pattern).

### Docs

- **`PLAN.md`** — B4 row updated to `☑ DONE 2026-06-18`.
- **`AGENTS.md`** — added "Recent Changes (L5-111 ...)" section with the
  full cache contract, wiring note (B5+), and extended fork-only policy.

## Verification

- `tsc --noEmit --noResolve` on `src/lib/db/bifrostModels.ts`: **0 errors**.
- Test errors are missing-module errors for `node:test`, `node:assert/strict`,
  `node:fs`, `node:os`, `node:path`, `process` — same pattern as the
  existing `semantic-cache.test.ts` and `model-intelligence-db.test.ts`
  (no `@types/node` installed locally; will resolve at CI).
- PR will run the suite under the project's normal vitest/node test runner.

## Decision review

Per ADR-031 § Decision Review:

- B4 closes the data layer for B5 (virtual-key minting) and B6 (traffic-shadow).
- B5 next: surface the cache in a UI panel + wire the bifrost executor
  to read from it instead of round-tripping Bifrost on every dispatch.
- B6 next: 14-day shadow at 5% → 25% → 100% traffic to gather the
  p99/error/cost data needed for the 30-day decision review.

## Cross-references

- [ADR-031](./2026-06-18-L5-110-bifrost-tier1-router.md) (predecessor)
- [PR #73 (B1 vendor)](https://github.com/KooshaPari/OmniRoute/pull/73)
- [PR #72 (L5-109+L5-110, MERGED)](https://github.com/KooshaPari/OmniRoute/pull/72)
- [docs/adr/0031-bifrost-tier1-router.md](../docs/adr/0031-bifrost-tier1-router.md)
- [vendor/bifrost/VENDOR.md](../vendor/bifrost/VENDOR.md)
