# T40 — Registry Refresh + Bucket Drift Triage (ADR-043)

**Date:** 2026-06-20
**ADR:** ADR-043 (Registry refresh cadence)
**Owner:** kooshapari
**Device:** macbook

## Step 1: Registry Validation

```bash
phenotype-registry validate --index=registry/disposition-index.json
```

### Schema Conformance

| Check | Pass | Notes |
|-------|------|-------|
| Top-level `rows` array exists | ✓ | 42 rows |
| Each row has required fields (id, path, fsm) | ✓ | All 42 |
| `id` uniqueness | ✓ | No duplicates |
| `path` matches `KooshaPari/{name}` pattern | ✓ | All 42 |
| `fsm` ∈ {active, archived, done, planned, wip} | ✓ | All 42 |
| `bucket` ∈ {ACTIVE, CONDITIONAL, PAUSED, REPO, ARCHIVED} | ✓ | All 42 |

**Result:** ✓ VALID — schema conformance passes 6/6

## Step 2: Bi-Weekly Refresh

**Last refresh:** 2026-06-17 (T34 finding)
**This refresh:** 2026-06-20 (3 days late — under 7-day threshold)

### Deltas vs Prior Refresh

| Field | 2026-06-17 | 2026-06-20 | Δ |
|-------|------------|------------|---|
| Total rows | 38 | 42 | +4 |
| `fsm=active` | 18 | 19 | +1 |
| `fsm=archived` | 8 | 11 | +3 |
| `fsm=done` | 4 | 4 | 0 |
| `fsm=planned` | 5 | 5 | 0 |
| `fsm=wip` | 3 | 3 | 0 |

### New Rows Since Last Refresh

| ID | Path | fsm | Bucket | Source |
|----|------|-----|--------|--------|
| `repo-promptadapter` | KooshaPari/promptadapter | archived | ARCHIVED | V11-016 (services retirement) |
| `repo-researchintel` | KooshaPari/researchintel | archived | ARCHIVED | V11-016 (services retirement) |
| `repo-flowra` | KooshaPari/Flowra | active | ACTIVE | V10 closure (scaffolded from 1476-line PLAN.md) |
| `repo-seedloom` | KooshaPari/Seedloom | active | ACTIVE | V10 closure (scaffolded from 2788-line SPEC.md) |

## Step 3: Bucket Drift Triage (L6 Bucket-Drift Detector)

The L6 Bucket-Drift Detector cross-checks `bucket` declarations in the registry against observed activity (commits, PRs, releases) over the last 90 days.

### Drift Findings

| Repo | Declared Bucket | Observed Activity | Drift | Verdict |
|------|-----------------|-------------------|-------|---------|
| `Civis` | ACTIVE | 8 commits, 2 PRs merged | aligned | ✓ |
| `Dino` | PAUSED | 0 commits, 0 PRs | aligned | ✓ |
| `Configra` | ACTIVE | 13 commits, 13 PRs merged (T10 wave) | aligned | ✓ |
| `pheno-config` | ACTIVE | 6 commits, 4 PRs merged | aligned | ✓ |
| `phenotype-registry` | ACTIVE | 1 commit (this PR) | aligned | ✓ |
| `pheno-otel` | ACTIVE | 4 commits | aligned | ✓ |
| `pheno-context` | ACTIVE | 3 commits | aligned | ✓ |
| `pheno-tracing` | ACTIVE | 12 commits, 8 PRs merged | aligned | ✓ |
| `pheno-mcp-router` | ACTIVE | 5 commits, 3 PRs merged | aligned | ✓ |
| `pheno-port-adapter` | ACTIVE | 5 commits, 4 PRs merged | aligned | ✓ |
| `pheno-errors` | ACTIVE | 3 commits | aligned | ✓ |
| `pheno-flags` | ACTIVE | 2 commits, 2 PRs | aligned | ✓ |
| `PhenoKit` | ACTIVE | 8 commits, 5 PRs | aligned | ✓ |
| `flowra` | ACTIVE | 0 commits (scaffolded, not yet PRed) | **DRIFT** | ⚠ New scaffold, no PR yet — verify in next refresh |
| `seedloom` | ACTIVE | 0 commits (scaffolded, not yet PRed) | **DRIFT** | ⚠ New scaffold, no PR yet — verify in next refresh |
| `phenotype-journeys` | ACTIVE | 12 commits | aligned | ✓ |
| `HexaKit` | ACTIVE | 9 commits, 8 PRs merged | aligned | ✓ |
| `pheno-secret-scan` | ACTIVE | 1 commit | aligned | ✓ |
| `pheno-secret-scanner` | ACTIVE | 1 commit (duplicate name? verify) | **DRIFT** | ⚠ Possible duplicate; verify in next refresh |

### Bucket Mis-Classifications

| Repo | Declared Bucket | Recommended | Reason |
|------|-----------------|-------------|--------|
| `pheno-secret-scanner` | ACTIVE | investigate | Similar name to `pheno-secret-scan`; possible duplicate |
| `HwLedger` | CONDITIONAL | PAUSED | No activity in 90+ days; pheno-capacity already extracted (V9 wave) |
| `WSM` | CONDITIONAL | PAUSED | No local copy; never activated |
| `phenoPatch` | ACTIVE | RECLASSIFY | No local copy, no remote; truly lost — reclassify as `REPO` or remove |

### Action Items

1. **Open PR** on `phenotype-registry`:
   - Add 4 new rows (promptadapter, researchintel, flowra, seedloom)
   - Reclassify HwLedger → PAUSED, WSM → PAUSED, phenoPatch → REPO
   - Verify pheno-secret-scan vs pheno-secret-scanner (possible duplicate)
2. **Next refresh:** 2026-07-04 (14 days, per ADR-043)

## References

- ADR-043 (Registry refresh cadence — bi-weekly)
- ADR-029 (Dmouse92 → KooshaPari migration; phenoPatch disposition)
- ADR-035 (L5-105 HwLedger reclassification)
- `KooshaPari/phenotype-registry` (PR #275 — registry flip)
- L6 Bucket-Drift Detector: `pheno-drift-detector` v0.1.0 (ADR-049)