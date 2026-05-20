# Requirements: (combo): provider-level exhaustion tracking to skip same-provider targets

> Feature Idea: [#1731](./1731-combo-provider-level-exhaustion-tracking-to-skip-same-provider-targets.md)
> Research Date: 2026-05-01
> Verdict: ✅ VIABLE

## 🔍 Research Summary

Implement provider-level 429 exhaustion tracking in the combo router so it skips remaining targets of a provider if a 429 quota exhaustion occurs.

## 📚 Reference Implementations

| #   | Repository       | Stars | Last Updated | Approach | Relevance    |
| --- | ---------------- | ----- | ------------ | -------- | ------------ |
| 1   | OmniRoute Source | -     | 2026-05-01   | Internal | High         |

## 📐 Proposed Solution Architecture

### Approach

Add a temporary exclusion set in `handleComboChat` that tracks providers that have returned a hard 429. Before evaluating the next target in the combo, check if its provider is in the exclusion set and skip it if true.

### Modified Files

| File | Changes |
|---|---|
| `open-sse/services/combo.ts` | Add logic to track provider failures and skip matching targets. |
| `open-sse/services/accountFallback.ts` | Properly bubble up the 429 status. |

## ⚙️ Implementation Effort

- **Estimated complexity**: Medium. Needs careful state tracking across the combo loop. No breaking changes.
- **Breaking changes**: No
