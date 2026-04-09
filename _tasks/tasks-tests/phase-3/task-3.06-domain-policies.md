# Task 3.06 — Test: Domain Policies

## Metadata
- **Phase**: 3
- **Source files**: `src/domain/fallbackPolicy.ts`, `src/domain/costRules.ts`, `src/domain/degradation.ts`, `src/domain/lockoutPolicy.ts`
- **Test files to create**: One per module in `tests/unit/`
- **Estimated assertions**: ~20

## Pre-requisites
1. Read each source file
2. Check existing: `tests/unit/policy-engine.test.mjs`
3. Read: `src/domain/types.ts` for shared types

## Test Scenarios

### fallbackPolicy.ts (~6): Policy decision tree; max retries evaluation; backoff calc; provider health threshold; per-provider rules; disabled fallback

### costRules.ts (~5): Budget evaluation; per-provider caps; cost per token calc; budget exceeded → reject; budget warning threshold

### degradation.ts (~5): Graceful degradation triggers; quality reduction levels; model downgrade path; feature disablement; recovery from degradation

### lockoutPolicy.ts (~4): Account lockout threshold; lockout duration; unlock after cooldown; permanent lockout conditions

## Acceptance Criteria
- [ ] All 20 assertions pass
- [ ] domain/ coverage reaches ≥ 88%
