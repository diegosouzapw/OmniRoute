# Task 6.05 — DB Long Tail + Versioning

## Metadata
- **Phase**: 6 (90% push)
- **Target modules**:
  - `src/lib/db/registeredKeys.ts` (34.46% → 75%+)
  - `src/lib/db/versionManager.ts` (24.52% → 70%+)
  - `src/lib/db/quotaSnapshots.ts` (29.72% → 75%+)
  - `src/lib/db/providerLimits.ts` (33.07% → 75%+)
  - `src/lib/db/webhooks.ts` (33.33% → 70%+)
  - `src/lib/db/upstreamProxy.ts` (44.49% → 75%+)
- **Test files to extend/create**:
  - `tests/unit/db-registered-keys.test.mjs`
  - `tests/unit/db-version-manager.test.mjs`
  - `tests/unit/db-quota-snapshots.test.mjs`
  - `tests/unit/db-provider-limits.test.mjs`
  - `tests/unit/db-webhooks.test.mjs`
  - `tests/unit/db-upstream-proxy.test.mjs`
- **Estimated assertions**: ~36

## Pre-requisites
1. Use temp SQLite databases per suite
2. Read schema expectations from migrations before asserting persisted shapes
3. Prefer CRUD and error-path coverage over implementation-level mocking

## Focus Areas
- Insert/update/delete happy paths
- Upsert, duplicate-key, and missing-row behavior
- Transaction and version bookkeeping branches
- Serialization / deserialization of stored metadata
- Defensive returns on invalid input or empty state

## Acceptance Criteria
- [ ] All target DB modules have standalone unit coverage
- [ ] No raw SQL is added outside the DB layer
- [ ] `src/lib/db/` improves toward 82%+ lines overall
- [ ] Tests are isolated and deterministic with temp DB state

