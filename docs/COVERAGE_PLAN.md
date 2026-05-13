# Test Coverage Plan

Last updated: 2026-05-13

> Status measured on 2026-05-13: lines 82.58%, statements 82.58%, functions 84.23%, branches 75.22%. Phases 1-5 are complete. Current focus is Phase 6 (>=85%) and Phase 7 (>=90%).

## Baseline

There are multiple coverage numbers depending on how the report is computed. For planning, only one of them is useful.

| Metric               | Scope                                                 | Statements / Lines | Branches | Functions | Notes                                               |
| -------------------- | ----------------------------------------------------- | -----------------: | -------: | --------: | --------------------------------------------------- |
| Legacy               | Old `npm run test:coverage`                           |             79.42% |   75.15% |    67.94% | Inflated: counts test files and excludes `open-sse` |
| Diagnostic           | Source-only, excluding tests and excluding `open-sse` |             68.16% |   63.55% |    64.06% | Useful only to isolate `src/**`                     |
| Recommended baseline | Source-only, excluding tests and including `open-sse` |             82.58% |   75.22% |    84.23% | This is the project-wide baseline to improve        |

The recommended baseline is the number to optimize against.

## Rules

- Coverage targets apply to source files, not to `tests/**`.
- `open-sse/**` is part of the product and must remain in scope.
- New code should not reduce coverage in touched areas.
- Prefer testing behavior and branch outcomes over implementation details.
- Prefer temp SQLite databases and small fixtures over broad mocks for `src/lib/db/**`.

## Current command set

- `npm run test:coverage`
  - Main source coverage gate for the unit test suite
  - Generates `text-summary`, `html`, `json-summary`, and `lcov`
- `npm run coverage:report`
  - Detailed file-by-file report from the latest run
- `npm run test:coverage:legacy`
  - Historical comparison only

## Milestones

| Phase   |                 Target | Focus                                             | Status     |
| ------- | ---------------------: | ------------------------------------------------- | ---------- |
| Phase 1 | 60% statements / lines | Quick wins and low-risk utility coverage          | ✅ Done    |
| Phase 2 | 65% statements / lines | DB and route foundations                          | ✅ Done    |
| Phase 3 | 70% statements / lines | Provider validation and usage analytics           | ✅ Done    |
| Phase 4 | 75% statements / lines | `open-sse` translators and helpers                | ✅ Done    |
| Phase 5 | 80% statements / lines | `open-sse` handlers and executor branches         | ✅ Done    |
| Phase 6 | 85% statements / lines | Harder edge cases, branch debt, regression suites | In progress |
| Phase 7 | 90% statements / lines | Final sweep, gap closure, strict ratchet          | Pending    |

Branches and functions should ratchet upward with each phase, but the primary hard target is statements / lines.

## Priority hotspots

These files have the lowest line coverage today (< 60%) and offer the best return for Phases 6-7. Generated from `coverage/coverage-summary.json` on 2026-05-13:

| #   | File                                                              | Lines % |
| --- | ----------------------------------------------------------------- | ------: |
| 1   | `open-sse/services/compression/validation.ts`                     |   7.87% |
| 2   | `src/app/api/v1/batches/route.ts`                                 |   9.67% |
| 3   | `src/app/docs/components/FeedbackWidget.tsx`                      |   9.80% |
| 4   | `open-sse/services/compression/toolResultCompressor.ts`           |  10.00% |
| 5   | `src/app/docs/components/DocCodeBlocks.tsx`                       |  10.63% |
| 6   | `open-sse/services/compression/engines/rtk/lineFilter.ts`         |  10.96% |
| 7   | `open-sse/services/specificityRules.ts`                           |  11.28% |
| 8   | `src/mitm/systemCommands.ts`                                      |  12.19% |
| 9   | `open-sse/services/compression/aggressive.ts`                     |  12.77% |
| 10  | `src/app/api/v1/batches/[id]/cancel/route.ts`                     |  12.98% |
| 11  | `open-sse/services/compression/progressiveAging.ts`               |  13.26% |
| 12  | `open-sse/services/compression/engines/rtk/smartTruncate.ts`      |  13.43% |
| 13  | `open-sse/services/compression/engines/rtk/deduplicator.ts`       |  13.51% |
| 14  | `src/lib/cloudAgent/agents/jules.ts`                              |  13.52% |
| 15  | `open-sse/services/compression/lite.ts`                           |  14.46% |
| 16  | `src/app/api/v1/rerank/route.ts`                                  |  14.94% |
| 17  | `open-sse/services/compression/preservation.ts`                   |  15.07% |
| 18  | `src/lib/cloudAgent/agents/codex.ts`                              |  15.54% |
| 19  | `open-sse/services/tierResolver.ts`                               |  16.66% |
| 20  | `src/app/docs/components/DocsLazyWrapper.tsx`                     |  16.66% |

Themes for Phases 6-7:

- `open-sse/services/compression/**` is the densest cluster of low coverage and dominates the remaining gap.
- Batch and rerank API routes (`src/app/api/v1/batches/**`, `src/app/api/v1/rerank/route.ts`) need handler-level tests.
- Cloud agent adapters (`src/lib/cloudAgent/agents/jules.ts`, `codex.ts`) and `tierResolver.ts` need scenario tests.
- Docs UI components and `src/mitm/systemCommands.ts` are lower priority but cheap branch wins.

## Execution checklist

### Phase 1: 56.95% -> 60%

- [x] Fix coverage metric so it reflects source code instead of test files
- [x] Keep a legacy coverage script for comparison
- [x] Record the baseline and hotspots in-repo
- [ ] Add focused tests for low-risk utilities:
  - `src/shared/utils/upstreamError.ts`
  - `src/shared/utils/fetchTimeout.ts`
  - `src/lib/api/errorResponse.ts`
  - `src/shared/utils/apiAuth.ts`
  - `src/lib/display/names.ts`
- [ ] Add route tests for:
  - `src/app/api/settings/require-login/route.ts`
  - `src/app/api/providers/[id]/models/route.ts`

### Phase 2: 60% -> 65%

- [ ] Add DB-backed tests for:
  - `src/lib/db/modelComboMappings.ts`
  - `src/lib/db/settings.ts`
  - `src/lib/db/registeredKeys.ts`
- [ ] Cover branch behavior in:
  - `src/lib/providers/validation.ts`
  - `src/app/api/v1/embeddings/route.ts`
  - `src/app/api/v1/moderations/route.ts`

### Phase 3: 65% -> 70%

- [ ] Add usage analytics tests for:
  - `src/lib/usage/usageHistory.ts`
  - `src/lib/usage/usageStats.ts`
  - `src/lib/usage/costCalculator.ts`
- [ ] Expand route coverage for proxy management and settings branches

### Phase 4: 70% -> 75%

- [ ] Cover translator helpers and central translation paths:
  - `open-sse/translator/index.ts`
  - `open-sse/translator/helpers/*`
  - `open-sse/translator/request/*`
  - `open-sse/translator/response/*`

### Phase 5: 75% -> 80%

- [ ] Add handler-level tests for:
  - `open-sse/handlers/chatCore.ts`
  - `open-sse/handlers/responsesHandler.js`
  - `open-sse/handlers/imageGeneration.js`
  - `open-sse/handlers/embeddings.js`
- [ ] Add executor branch coverage for provider-specific auth, retries, and endpoint overrides

### Phase 6: 80% -> 85%

- [ ] Merge more edge-case suites into the main coverage path
- [ ] Increase function coverage for DB modules with weak constructor/helper coverage
- [ ] Close branch gaps in `settings.ts`, `registeredKeys.ts`, `validation.ts`, and translator helpers

### Phase 7: 85% -> 90%

- [ ] Treat the remaining low-coverage files as blockers
- [ ] Add regression tests for every uncovered production bug fixed during the push to 90%
- [ ] Raise the coverage gate in CI only after the local baseline is stable for at least two consecutive runs

## Ratchet policy

Update `npm run test:coverage` thresholds only after the project actually exceeds the next milestone with a comfortable buffer.

**Current gate (as of 2026-05-13):** `npm run test:coverage` enforces **75 statements / 75 lines / 75 functions / 70 branches**. This is the conservative ratchet against the measured baseline (82.58% / 82.58% / 84.23% / 75.22%) and preserves headroom for transient flakiness.

For ad-hoc threshold checks against the latest report use:

```bash
node scripts/test-report-summary.mjs --threshold 75
```

Recommended ratchet sequence (order is `statements-lines / branches / functions`):

1. 55/60/55
2. 60/62/58
3. 65/64/62
4. 70/66/66
5. 75/70/72  <-- current gate (75/70/75)
6. 80/75/78
7. 85/80/84
8. 90/85/88

Next ratchet target is `80/75/78` once branch coverage holds above 78% for two consecutive runs.

## Known gap

The current coverage command measures the main Node unit suite and includes source reached from it, including `open-sse`. It does not yet merge Vitest coverage into a single unified report. That merge is worth doing later, but it is not a blocker for starting the 60% -> 80% climb.
