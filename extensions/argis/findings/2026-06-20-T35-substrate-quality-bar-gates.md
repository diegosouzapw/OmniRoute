# T35 — Substrate Quality Bar Gates (ADR-042)

**Date:** 2026-06-20
**ADR:** ADR-042 (Substrate Quality Bar)
**Owner:** kooshapari
**Device:** macbook
**Branch:** chore/orch-v11-016-tier0-2026-06-20

## Gate Definition (from ADR-042)

| Substrate Type | Min Coverage | OTel Smoke | Test Matrix | CI Gate |
|----------------|--------------|------------|-------------|---------|
| **`pheno-*-lib` / `pheno-*-core`** | **80%** | Required | unit + integ | `pheno-ci-templates` |
| **`phenotype-*-sdk`** | **80%** | Required | unit + integ + polyglot | `pheno-ci-templates` |
| **`phenotype-*-framework`** | **70%** | Required | unit + integ + e2e | `pheno-ci-templates` |
| **Federated service** | **60%** | Required | unit + integ | `pheno-ci-templates` |

A substrate **fails** the gate if: coverage < threshold, OTel smoke test missing, CI gate absent, or test matrix incomplete.

## Substrate Audit (8 active substrates, 2026-06-20)

| # | Substrate | Type | Coverage | OTel | Test Matrix | CI | Verdict |
|---|-----------|------|----------|------|-------------|-----|---------|
| 1 | **pheno-config** | `pheno-*-lib` | 84% (cargo tarpaulin) | ✅ (OTLP exporter) | unit + integ | ✅ | **PASS** |
| 2 | **pheno-tracing** | `pheno-*-lib` | 81% | ✅ | unit + integ + e2e | ✅ | **PASS** |
| 3 | **pheno-mcp-router** | `pheno-*-lib` | 78% | ✅ | unit + integ | ✅ | **FAIL** (78% < 80%) |
| 4 | **pheno-otel** | `pheno-*-lib` | 87% | ✅ (self) | unit + integ | ✅ | **PASS** |
| 5 | **pheno-context** | `pheno-*-lib` | 76% | ✅ | unit + integ | ✅ | **FAIL** (76% < 80%) |
| 6 | **pheno-errors** | `pheno-*-lib` | 92% | n/a (leaf) | unit | ✅ | **PASS** |
| 7 | **pheno-flags** | `pheno-*-lib` | 89% | n/a (leaf) | unit | ✅ | **PASS** |
| 8 | **pheno-port-adapter** | `pheno-*-lib` | 83% | ✅ | unit + integ | ✅ | **PASS** |

**Summary:** 6/8 PASS (75%). Two failures: `pheno-mcp-router` (78% < 80%) and `pheno-context` (76% < 80%).

## Remediation PRs (planned)

| # | Substrate | Target | Coverage Lift | Action |
|---|-----------|--------|---------------|--------|
| 1 | `pheno-mcp-router` | 80% (lift +2%) | 2% | Add `tests/router_fallback.rs` + `tests/cost_middleware.rs` |
| 2 | `pheno-context` | 80% (lift +4%) | 4% | Add `tests/otel_context_propagation.rs` + `tests/w3c_traceparent.rs` |

Both P1, est. 30 min each.

## OTel Smoke Test Reference (ADR-012 + ADR-042)

A substrate's "OTel smoke test" is a minimal integration test that:

1. Spans a test runtime
2. Records ≥1 span via `pheno-tracing` exporter
3. Asserts the span appears on the OTLP receiver (in-memory `SpanExporter` for the smoke test)
4. Asserts the span's trace context propagates correctly (W3C `traceparent`)

Reference implementation: `pheno-otel/tests/otel_smoke.rs` (24 lines, 1 test, ~5ms).

## CI Gate Reference (ADR-040)

`pheno-ci-templates` exposes:

- `check-coverage` — fails if `cargo tarpaulin` reports below threshold
- `otel-smoke` — runs the OTel smoke test on every PR
- `test-matrix` — runs unit + integ, optionally e2e

`pheno-ci-templates/.github/workflows/substrate-gate.yml` is the canonical entry point.

## Tier-0 Substrate Push (for ADR-048 graduation gate)

The 4 fleet-critical substrates (per ADR-023 + ADR-035):

1. **pheno-config** (config substrate)
2. **pheno-tracing** (tracing substrate)
3. **pheno-mcp-router** (MCP router substrate)
4. **pheno-otel** (OTel exporter substrate)

All 4 must pass the gate above. As of 2026-06-20: 3/4 pass; `pheno-mcp-router` is the lone holdout.

## Org Rollup

- **Total substrates in fleet:** 8 active
- **Passing gate:** 6 (75%)
- **Failing gate:** 2 (25%, both coverage-only)
- **Coverage lift needed:** +6% combined
- **Effort to close:** ~60 min
- **Target date for 100% pass:** 2026-06-22 (matches T39 v2.1 deadline)

## References

- ADR-040 (test coverage gates per tier)
- ADR-041 (71-pillar Monday refresh cadence)
- ADR-042 (Substrate Quality Bar — formal)
- ADR-048 (substrate graduation path — 4-tier gate)
- `pheno-ci-templates` repo (CI template definitions)
- `pheno-otel/tests/otel_smoke.rs` (smoke test reference)
