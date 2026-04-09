# Task 6.07 — Shared Services + Platform Utilities

## Metadata
- **Phase**: 6 (90% push)
- **Target modules**:
  - `src/shared/services/modelSyncScheduler.ts` (39.15% → 70%+)
  - `src/shared/utils/machineId.ts` (20.12% → 70%+)
  - `src/shared/utils/api.ts` (29.23% → 75%+)
  - `src/shared/utils/apiKeyPolicy.ts` (33.33% → 75%+)
  - `src/lib/versionManager/processManager.ts` (29.67% → 70%+)
  - `src/lib/versionManager/index.ts` (44.51% → 75%+)
  - `next.config.mjs` (31.21% → 70%+)
  - `scripts/runtime-env.mjs` (40.67% → 80%+)
- **Test files to extend/create**:
  - `tests/unit/model-sync-scheduler.test.mjs`
  - `tests/unit/machine-id.test.mjs`
  - `tests/unit/shared-api-utils.test.mjs`
  - `tests/unit/api-key-policy.test.mjs`
  - `tests/unit/version-manager.test.mjs`
  - `tests/unit/next-config.test.mjs`
  - `tests/unit/runtime-env.test.mjs`
- **Estimated assertions**: ~34

## Pre-requisites
1. Snapshot current behavior before refactoring any helper under test
2. Prefer process/env isolation helpers to broad module resets
3. Keep config-file tests lightweight and deterministic

## Focus Areas
- Scheduler no-op vs scheduled execution branches
- Machine ID fallbacks across unsupported platforms and cached values
- API helper validation, normalization, and policy enforcement branches
- Version manager process spawn / stop / failure handling
- `NEXT_DIST_DIR` and runtime-env behavior under missing or overridden environment variables

## Acceptance Criteria
- [ ] Shared services group moves toward 70%+ lines
- [ ] Platform/config utilities gain explicit regression tests
- [ ] No test depends on a real machine identifier or live process manager side effects

