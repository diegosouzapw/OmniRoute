# v8 Batch 11C — T13.z Report

**Date:** 2026-06-20
**Branch:** `wip-2026-06-19-v8-batch-11C-t13-z-audit`
**Track:** T13.z (71-pillar audit on 8 pheno-* substrates not yet at Tier 0)
**Subagent:** orch-v8-batch-11C-T13-z
**Auth:** gh = KooshaPari (keyring)

---

## What was done

1. **Per-repo 71-pillar audit (8 repos).** For each of pheno-llms-txt, pheno-mcp-router, pheno-scaffold-kit, pheno-vibecoding-guard, pheno-worklog-schema, pheno-profiling, pheno-secret-scan, pheno-ssot-template: scored all 9 domains, identified P0 gaps, top-5 missing pillars, recommended next action. See [findings/2026-06-19-T13-z-71-pillar-audit-8-more.md](findings/2026-06-19-T13-z-71-pillar-audit-8-more.md).
2. **Fleet rollup (cycle 2).** Cross-cutting P0 gap list (top 10), combined cycle 1 + cycle 2 org view (15 repos, mean 1.47), top 3 remediation tracks (R-1/R-2/R-3), one-line tier-upgrade plan per repo. See [findings/71-pillar-2026-06-20-weekly-2.md](findings/71-pillar-2026-06-20-weekly-2.md).
3. **Branch + commit + push.** Branch `wip-2026-06-19-v8-batch-11C-t13-z-audit` created; files committed; pushed to `origin` (KooshaPari/phenotype-apps) with `--no-recurse-submodules` per AGENTS.md §"Stale / warnings".

## Headline numbers

- **Fleet mean (cycle 2, 8 repos):** 1.50 / 3.00 (vs cycle 1 fleet mean 1.43 — substrates score higher than apps, as expected).
- **Repos below Tier 0 (mean < 1.00):** 2 — pheno-vibecoding-guard (0.78), pheno-worklog-schema (0.94). Both are **orphans** (repo exists on github.com/KooshaPari, but source not on this branch's sparse-checkout cone).
- **Repos in remediate-first list:** 2 — same 2 orphans.
- **P0 gaps (cycle 2 fleet):** 31 across 8 repos; fleet-wide top P0 is **L38 AGENTS.md** (4 repos) and **L29 CI pipeline** (5 repos).
- **Top unlock (fleet-wide, 4 repos):** wire `pheno-tracing` (ADR-012) → +0.30 mean on each.
- **Combined R-1 + R-2 + R-3 ROI:** ~6.5 h → org mean lifts 1.47 → 1.64.

## Constraint compliance

- No edits outside scope (only the 2 new files + 1 commit).
- `git push --no-recurse-submodules` used (per AGENTS.md §"Stale / warnings" LFS rule).
- All 8 repos audited within scope of T13.z brief.

## Status

**COMPLETE** — all 6 brief items done. Branch pushed. Awaiting orchestrator merge.
