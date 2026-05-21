# Requirements: Auto-combo scoring ignores output token cost

> Feature Idea: [#1812](./1812-auto-combo-output-token-cost.md)
> Research Date: 2026-05-19
> Verdict: VIABLE

## Research Summary

The bug is confined to `buildAutoCandidates()` in `open-sse/services/combo.ts` (lines 1218–1227). The function calls `getPricingForModel(provider, model)` and reads `pricing?.input` but discards `pricing?.output`. The `getPricingForModel()` return value is a plain `JsonRecord` object; the `costCalculator.ts` at `src/lib/usage/costCalculator.ts` (lines 87–89) already reads both `.input` and `.output` from the same structure for invoice calculations. No library research needed — the fix is a straightforward arithmetic change within existing patterns.

## Reference Implementations

No external references required. Precedent is internal: `src/lib/usage/costCalculator.ts` already applies the correct pattern.

### Key Patterns Found

- `costCalculator.ts` lines 87–89: reads `pricing.input` and `pricing.output` separately, multiplies each by the respective token count
- `buildAutoCandidates()` lines 1218–1227: reads only `pricing?.input` into `costPer1MTokens`; `pricing?.output` is never accessed

## Proposed Solution Architecture

### Approach

Introduce a module-level constant `OUTPUT_TOKEN_RATIO = 0.4` in `combo.ts` (co-located with the other constants at lines 58–104). In `buildAutoCandidates()`, after reading `inputPrice`, also read `outputPrice = Number(pricing?.output)`. When both are finite and non-negative, compute:

```ts
costPer1MTokens = inputPrice * (1 - OUTPUT_TOKEN_RATIO) + outputPrice * OUTPUT_TOKEN_RATIO;
```

When `outputPrice` is absent or invalid, fall back to `inputPrice` alone (preserving current behavior for providers that only publish input pricing).

### New Files

None.

### Modified Files

| File | Changes |
| --- | --- |
| `open-sse/services/combo.ts` | Add `OUTPUT_TOKEN_RATIO` constant (~line 98); update `buildAutoCandidates()` cost block (~lines 1218–1227) to read `pricing?.output` and apply blended formula |
| `tests/unit/auto-combo-engine.test.ts` OR new `tests/unit/combo-cost-blending.test.ts` | Add test cases: (a) both prices present → blended cost, (b) output absent → input-only fallback, (c) reasoning model scenario from issue (o3-like: $3 input / $15 output → blended $9 vs flat-input $3) |

### Database Changes

None.

### API Changes

None. The change is internal to the scoring pipeline.

### UI Changes

None.

## Exact Code Location

**File**: `open-sse/services/combo.ts`

**New constant** (insert after line 98, alongside `MIN_HISTORY_SAMPLES`):

```ts
// Assumed fraction of tokens that are output when blending input+output prices
// for auto-combo cost scoring. 0.4 means 40% output, 60% input.
const OUTPUT_TOKEN_RATIO = 0.4;
```

**Replace** the cost block in `buildAutoCandidates()` (~lines 1218–1227):

```ts
// BEFORE (input-only):
let costPer1MTokens = 1;
try {
  const pricing = await getPricingForModel(provider, model);
  const inputPrice = Number(pricing?.input);
  if (Number.isFinite(inputPrice) && inputPrice >= 0) {
    costPer1MTokens = inputPrice;
  }
} catch {
  // keep default cost
}

// AFTER (blended input + output):
let costPer1MTokens = 1;
try {
  const pricing = await getPricingForModel(provider, model);
  const inputPrice = Number(pricing?.input);
  const outputPrice = Number(pricing?.output);
  if (Number.isFinite(inputPrice) && inputPrice >= 0) {
    if (Number.isFinite(outputPrice) && outputPrice >= 0) {
      costPer1MTokens =
        inputPrice * (1 - OUTPUT_TOKEN_RATIO) + outputPrice * OUTPUT_TOKEN_RATIO;
    } else {
      costPer1MTokens = inputPrice;
    }
  }
} catch {
  // keep default cost
}
```

## Implementation Effort

- **Estimated complexity**: Low
- **Estimated files changed**: ~2 (combo.ts + one test file)
- **Dependencies needed**: none
- **Breaking changes**: No — blended cost is only more accurate; existing behavior is preserved when `pricing.output` is absent
- **i18n impact**: 0 new translation keys
- **Test coverage needed**: unit tests for blended vs fallback behavior; scenario matching the issue's numerical example

## Open Questions

1. Should `OUTPUT_TOKEN_RATIO` be configurable per-combo or globally? Currently a module constant is sufficient. A per-combo override could be a follow-up.
2. Should reasoning tokens (e.g., `pricing.reasoning`) also be factored in for models that price them separately? Out of scope for this fix; can be tracked separately.
3. The `virtualFactory.ts` hardcodes `costPer1MTokens: 0` for all virtual auto-combo candidates (line 139), which bypasses cost scoring entirely for the `auto/` prefix path. That is a separate known limitation and should not be changed in this fix.

## External References

- `open-sse/services/combo.ts` lines 58–104 (constants), 1191–1282 (`buildAutoCandidates`)
- `src/lib/usage/costCalculator.ts` lines 87–89 (reference pattern for input+output pricing)
- `src/lib/db/settings.ts` lines 273–323 (`getPricingForModel` return shape: `JsonRecord` with `.input` and `.output` keys)
- GitHub issue: https://github.com/diegosouzapw/OmniRoute/issues/1812
