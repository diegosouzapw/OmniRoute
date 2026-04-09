# Task 5.02 — Branch Hardening: Services + Compliance + Providers

## Metadata
- **Phase**: 5
- **Target modules**:
  - `open-sse/services/` (branches: 69.84% → 85%)
  - `src/lib/compliance/` (branches: 55.55% → 80%)
  - `src/lib/providers/` (branches: 68.02% → 85%)
- **Estimated assertions**: ~35

## Pre-requisites
1. Run coverage report to identify exact uncovered branches
2. Read existing tests for each module

## Approach

### Step 1: Generate detailed per-file branch report
```bash
DISABLE_SQLITE_AUTO_BACKUP=true npx c8 --exclude='tests/**' --exclude='**/*.test.*' --reporter=text node --import tsx/esm --test tests/unit/*.test.mjs 2>&1 | grep -E '(services/|compliance|providers)'
```

### Step 2: For each file with < 85% branches, identify and test uncovered branches

### Target areas:

#### services/ (~20 additional branch tests)
- `rateLimitManager.ts` — 429 handling edge cases, header parsing variants
- `wildcardRouter.ts` — wildcard matching edge cases
- `intentClassifier.ts` — classification edge cases
- `taskAwareRouter.ts` — task type detection branches
- `modelDeprecation.ts` — deprecation status checks
- `sessionManager.ts` — session lifecycle edge cases
- `ipFilter.ts` — IP range matching edge cases

#### compliance/ (~8 additional tests)
- `index.ts` — policy evaluation edge cases, missing policies, override logic

#### providers/ (~7 additional tests)
- `validation.ts` — provider validation failure paths, edge credentials, provider-specific validation rules

## Acceptance Criteria
- [ ] All 35 assertions pass
- [ ] services/ branch coverage ≥ 80%
- [ ] compliance/ branch coverage ≥ 75%
- [ ] providers/ branch coverage ≥ 80%
