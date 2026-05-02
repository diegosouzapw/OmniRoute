# Task 18 - Restore Full Compression Unit Test Gate

> **Priority**: P1
> **Effort**: 45 min
> **Dependencies**: None
> **Branch**: `release/v3.7.9`

---

## Problem

The targeted Caveman tests pass, but the full compression unit gate is not green.

Command:

```bash
PATH=/home/diegosouzapw/.nvm/versions/node/v24.15.0/bin:$PATH \
node --import tsx/esm --test tests/unit/compression/*.test.ts
```

Observed result during audit:

- 305 tests total
- 303 pass
- 2 fail

Failures:

1. `tests/unit/compression/compressionAnalytics.test.ts`
   - Empty summary test expects `last24h: []`.
   - Runtime returns 24 zero-filled hourly buckets.
2. `tests/unit/compression/lite.test.ts`
   - Test calls `replaceImageUrls(body, "gpt-3.5-turbo")`.
   - Runtime now only replaces images when called with `{ supportsVision: false }`.

---

## Solution

Resolve the contract in each failing area.

For analytics:

- If 24 zero buckets are intended for dashboard chart stability, update the test.
- If empty table should return `[]`, change runtime and dashboard assumptions.
- Prefer keeping 24 buckets because chart consumers benefit from stable shape.

For `replaceImageUrls`:

- Either restore the string overload and infer known non-vision models, or update tests to
  the current explicit contract.
- Prefer explicit `{ supportsVision: false }` for correctness.
- Remove the string overload from the type if it is no longer supported.

---

## Files

- `tests/unit/compression/compressionAnalytics.test.ts`
- `tests/unit/compression/lite.test.ts`
- Possibly `open-sse/services/compression/lite.ts`
- Possibly `src/lib/db/compressionAnalytics.ts`

---

## Acceptance Criteria

This command passes:

```bash
PATH=/home/diegosouzapw/.nvm/versions/node/v24.15.0/bin:$PATH \
node --import tsx/esm --test tests/unit/compression/*.test.ts
```

No test is weakened without documenting the runtime contract it verifies.

---

## Rollback

Revert test/runtime changes if CI shows unrelated failures. Do not mark v3.7.9 complete
while the compression unit gate is red.
