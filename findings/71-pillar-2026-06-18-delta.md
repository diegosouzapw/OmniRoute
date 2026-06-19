# 71-pillar audit delta — OmniRoute (2026-06-18)

**Baseline established today.** OmniRoute was not scored in the 2026-06-17 org-wide audit (`findings/71-pillar-2026-06-17.md` covers AgilePlus, AuthKit, BytePort, dispatch-mcp, McpKit, phenodag, phenotype-config, PhenoMCP, PhenoObservability, PhenoVCS). The 2026-06-18 re-run is the **first scoring** of OmniRoute under the 71-pillar framework.

## Per-pillar deltas

- **N/A (no prior data)** — this audit is the baseline.
- **No regressions**: nothing to regress against.
- **No new pillars covered**: 2026-06-17's framework already had 71 pillars; this run is the first OmniRoute-specific data point.

## What was added to the org picture today

| Item | Value | Notes |
| --- | --- | --- |
| New repo scored | OmniRoute | 11th repo in the org 71-pillar corpus |
| Mean score | 1.89 / 3.00 | Below the org median of ~1.95 |
| Domains at 2.00+ | 5 of 9 (AX 2.00, Quality 2.12, DX 2.20, Docs 2.00, Gov 2.00) | |
| Domains below 2.00 | 4 of 9 (Perf 1.43, UX 1.75, Sec 1.90, Obs 1.50) | |
| Gate verdict | FAIL (1.89 < 2.00) | 0.11 below the org minimum |
| Strongest pillars (3/3) | L6, L22, L28, L29, L34, L65 | 6 pillars at SOTA |
| Weakest pillars (1/3) | L8, L13, L14, L15, L17, L30, L41, L43, L48, L58, L59, L61, L63 | 13 pillars — 18.3% of total |

## Recommended next audit (2026-06-25)

| Priority | Action | Expected mean delta |
| --- | --- | --- |
| 1 | Add OpenAPI spec + Redoc (L67 1/3 → 2/3) | +0.014 |
| 2 | Author threat model doc (L8 1/3 → 2/3) | +0.014 |
| 3 | Add OTel SDK to instrumentation.ts (L58 1/3 → 2/3) | +0.014 |
| 4 | Add per-tenant rate limits (L48 1/3 → 2/3) | +0.014 |
| 5 | Author PERF_BUDGETS.md with k6 gate (L13 1/3 → 2/3) | +0.014 |
| **5 fixes** | **All 1/3 → 2/3** | **+0.07 → projected 1.96** |
| 10 fixes | (continuing) | ~2.03 → would pass gate |

## Notes

- The 1.89 score is a **fork baseline**; the upstream `diegosouzapw/OmniRoute` was not scored.
- The KooshaPari fork (32 ADRs, audit-ratchet, fabricated-doc-check, knip, L5-109 cleanup) is the subject of this audit.
- The Bifrost Tier-1 router (ADR-031) is the next big architectural addition; its absorption is expected to move L1, L2, L19 from 2/3 → 3/3.
