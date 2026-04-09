# Task 5.03 — Fix Existing Test Failures

## Metadata
- **Phase**: 5
- **Priority**: P0 — Must fix before coverage gate
- **Failing tests**: 7 failures out of 1,440
- **Files to fix**:
  - `tests/unit/context-manager.test.mjs` (2 failures)
  - `tests/unit/qoder-executor.test.mjs` (5 failures)
- **Framework**: Node.js `node:test` + `assert`

## Pre-requisites
1. Run the failing tests individually to see exact errors:
   ```bash
   DISABLE_SQLITE_AUTO_BACKUP=true node --import tsx/esm --test tests/unit/context-manager.test.mjs
   DISABLE_SQLITE_AUTO_BACKUP=true node --import tsx/esm --test tests/unit/qoder-executor.test.mjs
   ```
2. Read the source files being tested:
   - `open-sse/services/contextManager.ts`
   - `open-sse/executors/qoder.ts`

## Context

### context-manager.test.mjs (2 failures)
These failures are likely caused by recent changes to the context manager API or dependencies. Need to:
1. Read the test assertions that fail
2. Compare with current `contextManager.ts` API
3. Update test expectations OR fix the source if it's a regression

### qoder-executor.test.mjs (5 failures)
These failures are related to our v3.5.3 changes to the Qoder executor (COSY auth, portal.qwen.ai migration). The tests assume the old API. Need to:
1. Read each failing assertion
2. Update test mocks and expectations to match current executor behavior
3. Ensure the new `X-Dashscope-*` header logic (OAuth vs API key) is correctly tested
4. Update URL expectations if the executor now uses a different endpoint

## Approach

### Step 1: Diagnose
```bash
DISABLE_SQLITE_AUTO_BACKUP=true node --import tsx/esm --test tests/unit/context-manager.test.mjs 2>&1 | tail -50
DISABLE_SQLITE_AUTO_BACKUP=true node --import tsx/esm --test tests/unit/qoder-executor.test.mjs 2>&1 | tail -80
```

### Step 2: For each failure
1. Read the failing test assertion
2. Read the current source code implementation
3. Determine if the test or the source is wrong
4. Fix the appropriate file
5. Re-run the test to confirm it passes

### Step 3: Validate all tests
```bash
npm run test:unit
```
Must show 0 failures.

## Acceptance Criteria
- [ ] `context-manager.test.mjs` — 0 failures
- [ ] `qoder-executor.test.mjs` — 0 failures
- [ ] Full test suite: 0 failures (was 7)
- [ ] No regressions in other test files
- [ ] Run `npm run test:unit` — 1440+ tests pass, 0 fail
