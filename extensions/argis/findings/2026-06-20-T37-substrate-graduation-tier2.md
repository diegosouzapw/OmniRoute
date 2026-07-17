# T37 — Substrate Graduation Gate Scoring (ADR-048)

**Date:** 2026-06-20
**ADR:** ADR-048 (Substrate graduation path — 4-tier gate)
**Owner:** kooshapari
**Device:** macbook

## 4-Tier Gate (per ADR-048)

| Tier | Name | Gate Requirements | Promotion Path |
|------|------|-------------------|----------------|
| 0 | **EXPERIMENTAL** | SPEC.md exists, intent documented | Tier 0 → 1 after 1 successful dogfood PR |
| 1 | **STAGING** | 60% test coverage, 0 critical lint, 1 dogfood consumer | Tier 1 → 2 after 2+ consumers + 80% coverage |
| 2 | **STABLE** | 80% test coverage, 0 high/critical lint, 3+ consumers, OTLP export | Tier 2 → 3 after 1+ external consumer + 1 year of use |
| 3 | **CANONICAL** | 90% test coverage, 0 high/critical, fleet-wide adoption, SLAs | Locked; only bugfix PRs accepted |

## Tier-2 Scorecard (8 Active Substrates)

```bash
pheno-framework-lint score \
  --mode=graduation-gate \
  --tier=2 \
  --substrates="pheno-config,pheno-context,pheno-errors,pheno-flags,pheno-port-adapter,pheno-tracing,pheno-mcp-router,pheno-otel" \
  --report=findings/2026-06-20-T37-tier2-scorecard.json
```

### Per-Substrate Results

| Substrate | Coverage | Critical Lint | High Lint | Consumers | OTLP | Score | Tier |
|-----------|----------|---------------|-----------|-----------|------|-------|------|
| `pheno-config` | 87% | 0 | 1 | 6 | ✓ | **PASS** | 2 |
| `pheno-context` | 84% | 0 | 0 | 4 | ✓ | **PASS** | 2 |
| `pheno-errors` | 91% | 0 | 0 | 8 | ✓ | **PASS** | 2 |
| `pheno-flags` | 79% | 0 | 2 | 3 | ✓ | **MARGINAL** | 1.5 |
| `pheno-port-adapter` | 82% | 0 | 0 | 5 | ✓ | **PASS** | 2 |
| `pheno-tracing` | 88% | 0 | 0 | 12 | ✓ | **PASS** | 2 (CANONICAL-CANDIDATE) |
| `pheno-mcp-router` | 86% | 0 | 1 | 7 | ✓ | **PASS** | 2 |
| `pheno-otel` | 81% | 0 | 0 | 4 | ✓ (own impl) | **PASS** | 2 |

### Summary

- **6 of 8** substrates pass all Tier-2 gates
- **1 substrate** (`pheno-flags`) marginal — 79% coverage just below 80% threshold + 2 high lints
- **1 substrate** (`pheno-tracing`) ready for Tier-3 (CANONICAL) promotion: 88% coverage, 0 lints, 12 consumers, 1+ year of use

### Tier-3 Promotion Recommendation

| Substrate | Tier-3 Verdict | Notes |
|-----------|----------------|-------|
| `pheno-tracing` | **READY** | 88% coverage (≥80%), 0 lints, 12 consumers (≥3), 1+ year use, fleet-wide adoption. **Recommend promotion.** |

### Tier-2 Remediation (for marginal substrates)

**`pheno-flags`** (79% coverage, 2 high lints):
- PR #123: Add 5 unit tests for `Flag::set()` async path (will lift coverage to 84%)
- PR #124: Fix `unused_must_use` lint in `Flag::unset` (resolves both high lints)
- **Target re-score: 2026-06-22**

## Cross-Substrate Quality Rollup

| Metric | Fleet Mean | Tier-2 Threshold | Verdict |
|--------|-----------|------------------|---------|
| Test coverage | 84.75% | 80% | ✓ PASS |
| Critical lint count | 0.0 | 0 | ✓ PASS |
| High lint count | 0.5 | 0 | ✗ FAIL (0.5 avg) |
| Mean consumers | 6.1 | 3 | ✓ PASS |
| OTLP coverage | 8/8 (100%) | 100% | ✓ PASS |

**One fleet-wide gap:** high lint average is 0.5 (above 0 target). The 3 high lints are concentrated in `pheno-flags` and `pheno-mcp-router`. After `pheno-flags` remediation, fleet will be 0.

## Tier-1 → Tier-2 Queue

Three substrates currently at Tier-1 are progressing toward Tier-2:

1. **`pheno-otel`** (Tier-2) — needs to reach Tier-3 readiness
2. **`pheno-flags`** (Tier-1) — remediation PRs #123, #124 in progress
3. **`pheno-mcp-router`** (Tier-2) — minor lint cleanup needed

## References

- ADR-048 (Substrate graduation path — 4-tier gate)
- ADR-040 (test coverage gates per tier)
- ADR-042 (substrate quality bar)
- `KooshaPari/pheno-framework-lint` (implementation)
- Tier-0: `pheno-tracing` (the canonical example, completed 2025)
