# T36 — Predictive DRY Scanner Dry-Run (ADR-047)

**Date:** 2026-06-20
**ADR:** ADR-047 (Predictive DRY discipline — 4-criterion rule)
**Owner:** kooshapari
**Device:** macbook

## 4-Criterion Rule (per ADR-047)

Before declaring "this should be DRY'd" via abstraction, all 4 criteria must hold:

1. **Pattern repeats 3+ times** — at least 3 occurrences of the same/similar code structure
2. **Variation is structural, not accidental** — differences are in the *structure* of the code, not in the *substance* (e.g., the algorithm is the same but inputs differ; not the algorithm differs but the names differ)
3. **No semantic divergence** — the variants are semantically equivalent (would be observably identical to a caller in a hypothetical unified API)
4. **Coupling cost < abstraction cost** — refactoring to a shared abstraction would not introduce tighter coupling between the 3+ call sites than currently exists

If any criterion fails, do NOT DRY. The pattern is not ready for abstraction. Document the pattern in a "near-DRY" list for future re-evaluation.

## Dry-Run: First End-to-End Run

```bash
pheno-predict dry-run \
  --mode=predictive-dry \
  --workspace=. \
  --report=findings/2026-06-20-T36-predictive-dry-report.json
```

### Scanned Patterns (sample)

| Pattern | Occurrences | C1 (3+) | C2 (structural) | C3 (no semantic div) | C4 (coupling cost) | Verdict |
|---------|-------------|---------|-----------------|----------------------|-------------------|---------|
| `Result<T, E>` → `Result<T, ErrorKind>` | 47 | ✓ | ✓ | ✗ (different error vocabularies) | — | **NOT-DRY** |
| `fn parse_url(s: &str) -> Option<Url>` | 5 | ✓ | ✗ (3 use url crate, 2 hand-roll) | — | — | **NOT-DRY** |
| `HashMap<String, Config>` builder | 12 | ✓ | ✓ | ✓ | ✓ (low coupling) | **DRY** |
| Retry-with-backoff loop | 8 | ✓ | ✗ (different backoff strategies) | — | — | **NOT-DRY** |
| Logging initialization | 23 | ✓ | ✗ (4 different log formats) | — | — | **NOT-DRY** |

### Summary

- **23 candidate patterns** scanned across 6 substrate repos
- **1 pattern** (HashMap<String, Config> builder) met all 4 criteria
- **22 patterns** failed at least one criterion, mostly C2 (variation is accidental, not structural)
- **0 abstractions** were auto-extracted by the dry-run — strict 4-criterion gate is working as intended

### Recommended DRY Action

Only **1 abstraction** is recommended for extraction this cycle:
- **`ConfigBuilder` trait** in `pheno-config` substrate, absorbing the 12 call sites across 6 repos
- Estimated LOC reduction: ~340 lines (12 × ~28 line builder)
- Coupling cost: low (Config is already a substrate)
- PR target: `KooshaPari/pheno-config#45`

## "Near-DRY" List (for future re-evaluation)

Patterns that failed C2 (accidental variation) but are candidates for re-evaluation once the variation becomes structural:

1. **URL parsing** — wait for hand-rolled implementations to be replaced with `url` crate (or vice versa)
2. **Retry-with-backoff** — if a 4th backoff strategy is added, reconsider
3. **Logging init** — after pheno-tracing becomes the single OTLP source, re-evaluate

## C4 Quantitative Metric

C4 (coupling cost) is measured as: `mean(current_call_site_coupling) < abstracted_call_site_coupling + abstraction_overhead`.

For the 1 DRY-verdict pattern:
- Current mean coupling: 0.12 (low — all call sites are local to their repos)
- Abstracted coupling: 0.15 (slight increase due to substrate dep)
- Abstraction overhead: 0.02 (the ConfigBuilder trait itself)
- Net: +0.05, within acceptable budget (≤ 0.10 per ADR-047 §C4)

## Files Generated

- `findings/2026-06-20-T36-predictive-dry-report.json` (machine-readable, full pattern data)
- `findings/2026-06-20-T36-predictive-dry-summary.md` (this file, human-readable)

## References

- ADR-047 (Predictive DRY discipline — 4-criterion rule)
- ADR-040 (test coverage gates per tier)
- `KooshaPari/pheno-predict` (implementation)
- `pheno-config` substrate (the 1 confirmed DRY target)
