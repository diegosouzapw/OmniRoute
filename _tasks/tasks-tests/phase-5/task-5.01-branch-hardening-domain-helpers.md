# Task 5.01 — Branch Hardening: Domain + Translator Helpers

## Metadata
- **Phase**: 5 (Hardening)
- **Target modules**:
  - `src/domain/` (branches: 72.55% → 85%)
  - `open-sse/translator/helpers/` (branches: 67.96% → 85%)
- **Test files to extend/create**: Extend existing tests + new edge case files
- **Estimated assertions**: ~30

## Pre-requisites
1. Run coverage with `--reporter=text` to see exact uncovered branches
2. Read uncovered branch lines in each file

## Approach

### Step 1: Identify uncovered branches
```bash
DISABLE_SQLITE_AUTO_BACKUP=true npx c8 --exclude='tests/**' --exclude='**/*.test.*' --reporter=text node --import tsx/esm --test tests/unit/*.test.mjs 2>&1 | grep -E '(domain|translator/helpers)' 
```

### Step 2: For each uncovered branch, create a test that exercises it

Common uncovered branch patterns:
- `if (x === null)` — test with null input
- `if (Array.isArray(x))` — test with array and non-array
- `try/catch` — test error paths
- `switch` default cases
- `typeof x === "undefined"` — test with undefined
- `x?.y?.z` — test with missing intermediate properties

### Target files in domain/:
- `policyEngine.ts` — error paths, edge decisions
- `comboResolver.ts` — resolution failure paths
- `quotaCache.ts` — cache miss, expiry
- `modelAvailability.ts` — unavailable model branches
- `providerExpiration.ts` — expired provider handling

### Target files in helpers/:
- `geminiHelper.ts` — schema cleaning edge cases, empty values
- `claudeHelper.ts` — content block edge cases
- `openaiHelper.ts` — validation edge cases
- `schemaCoercion.ts` — type coercion edge cases
- `maxTokensHelper.ts` — provider-specific limits

## Acceptance Criteria
- [ ] All 30 assertions pass
- [ ] domain/ branch coverage ≥ 85%
- [ ] translator/helpers/ branch coverage ≥ 80%
