# DAG v12 — 71-Pillar P0 Remediation Wave (Org-Wide)

**Date authored:** 2026-06-20
**Status:** SPEC READY
**Supersedes:** v11 (102/102 WPs done, 100% saturation on melosviz scope)
**Extends:** v11 closure (`findings/forge-wave-2026-06-20/V11_CLOSURE_FINAL.md`) + 71-pillar cycle 1 (47 P0 gaps) + cycle 2 (8 substrate repos)

---

## 1. Executive Summary

v11 drained all 102 melosviz work packages to 100% saturation. v12 pivots to **org-wide 71-pillar P0 remediation**: address the 47 P0 gaps from cycle 1 across the 7 active focus repos (AgilePlus, pheno, dispatch-mcp, phenotype-ops, PhenoCompose, PlayCua, BytePort), starting with the top-10 most-common gaps.

**Scope**: 7 repos × 10 P0 actions = up to 70 PRs (some actions span multiple repos). v12 targets **closing ≥30 P0 gaps** in this wave (realistic 1-day wall with 20-wide parallel orchestrator).

---

## 2. Top-10 P0 Action List (from cycle 1, ADR-024 schema)

| # | Pillar | Description | Repos affected | v12 Track | Effort |
|---|---|---|---|---|---|
| 1 | **L47** | Secret scanning in CI (trufflehog/gitleaks) | AgilePlus, PhenoCompose, BytePort, dispatch-mcp | T12-A | ~2h |
| 2 | **L38** | Repo-level `AGENTS.md` | dispatch-mcp, PhenoCompose, BytePort, phenotype-ops | T12-B | ~1h |
| 3 | **L57** | Wire `pheno-tracing` to sub-apps | pheno, dispatch-mcp, PlayCua, AgilePlus | T12-C | ~3h |
| 4 | **L30** | `.devcontainer/` per pheno-flake template | dispatch-mcp, phenotype-ops, BytePort | T12-D | ~1h |
| 5 | **L4** | Hexagonal ports: `Port` trait + `Adapter` impl | dispatch-mcp, PhenoCompose, PlayCua, BytePort | T12-E | ~4h |
| 6 | **L46** | Branch protection rules consistent | pheno, dispatch-mcp, PlayCua, BytePort | T12-F | ~30min |
| 7 | **L56** | tracing-subscriber configured (structured logs) | dispatch-mcp, PhenoCompose, BytePort | T12-G | ~1h |
| 8 | **L29** | CI pipeline (min: cargo test + clippy + fmt) | PhenoCompose, BytePort, dispatch-mcp | T12-H | ~2h |
| 9 | **L13** | Latency budgets / SLO targets | dispatch-mcp, PhenoCompose, BytePort | T12-I | ~1h |
| 10 | **L71** | ADR cross-refs in repo-local ADRs | dispatch-mcp, phenotype-ops, BytePort | T12-J | ~1h |

---

## 3. DAG Structure (10 tracks × 6 stages = 60 tasks, expandable to 100)

### Stage 1: Stabilize (5 tracks, 20 tasks)
- **T12-A** L47 secret scanning (4 tasks: 1 per repo)
- **T12-B** L38 AGENTS.md (4 tasks: 1 per repo)
- **T12-C** L57 pheno-tracing wire (4 tasks: 1 per repo)
- **T12-D** L30 devcontainer (3 tasks: 1 per repo)
- **T12-F** L46 branch protection (4 tasks: 1 per repo, 1 admin pool task)

### Stage 2: Hexagonal core (2 tracks, 10 tasks)
- **T12-E** L4 ports (4 tasks: 1 per repo + 1 shared `phenotype-ports` crate task)
- **T12-G** L56 logging (3 tasks + 2 sub-tasks: shared `pheno-logging` setup, repo init)

### Stage 3: CI + latency (2 tracks, 8 tasks)
- **T12-H** L29 CI (3 tasks + 1 shared `pheno-ci-templates` task)
- **T12-I** L13 SLO (4 tasks: 1 per repo)

### Stage 4: Governance (1 track, 4 tasks)
- **T12-J** L71 ADR cross-refs (4 tasks: 1 per repo + 1 fleet-wide `ADR-001..074` index task)

### Side DAG (1 track, ~18 tasks for 100% width fill)
- **T12-Side** v11 fleet hygiene: clean 19 worktrees (`/tmp/melosviz-wt*`); recover lost branches (`wip/recovered-v10-025-stash-2026-06-20`); dedup findings/forge-wave-2026-06-20/; re-apply v11 final closure

### Stage 5: Verify (1 track, 4 tasks)
- Re-run 71-pillar cycle 3 on the 7 repos
- Generate cycle 3 scorecard
- Compare cycle 1 → cycle 2 → cycle 3 deltas
- v12 wrap-up + ADR-076 "v12 closure"

### Stage 6: Forward (1 track, 4 tasks)
- v13 scope: 71-pillar P1 remediation (31 P1 gaps from cycle 1)
- v13 scope: cheap-llm-mcp absorption (L5-104 still incomplete per T15)
- v13 scope: HexaKit retarget (L5-110/111/112 EPILOGUE 3)
- v13 scope: 5-repository post-Cycle 3 audit (add nanovms, helios-router, helioscope, authvault, planify)

---

## 4. 20-Wide Parallel Orchestrator Pattern (v11-proven)

Per the worktree-isolation pattern proven in v11 (5 waves, 102/102 WPs drained):

1. **Pre-launch**: `git worktree add` for each of 20 worker tasks in `/private/tmp/melosviz-wt-v12/{wp-N-slug}/`
2. **Dispatch**: each worker scaffolds + commits in its own worktree
3. **Merge**: `git merge --no-ff -m "merge: wp/N-..." wp/N-...` from main branch
4. **Verify**: `git diff --cached --quiet` check before push
5. **Push**: `git push origin HEAD --force-with-lease` (idempotent)

**Throughput target**: 20 WPs in ~30 min wall (1.5min/WP amortized). v12 = 60 WPs / 3 batches = ~1.5h wall.

---

## 5. Pre-Conditions (v12 launch gate)

- [x] v11 closure complete (102/102 WPs done, PR #97 opened)
- [x] Cycle 1 71-pillar rollup published (47 P0 gaps identified)
- [x] Cycle 2 71-pillar audit complete (8 substrate repos, 5 DELETED/404 historical)
- [ ] Clean up 19 v11 worktrees in `/tmp/melosviz-wt*` (low priority, deferred to T12-Side)
- [ ] Verify no 71-pillar schema drift between cycle 1 and cycle 2
- [ ] Open v12 branch: `chore/v12-71-pillar-p0-remediation-2026-06-20`

---

## 6. Success Metrics (v12 closure gates)

| Metric | Target | Notes |
|---|---|---|
| P0 gaps closed | ≥ 30 of 47 | per cycle 3 re-audit |
| Repos with AGENTS.md | 7 / 7 | from 3/7 |
| Repos with secret scanning CI | 7 / 7 | from 3/7 |
| Repos with pheno-tracing | 7 / 7 | from 3/7 |
| Repos with hexagonal ports | 7 / 7 | from 3/7 (longer: T12-E) |
| Org mean (cycle 3) | ≥ 1.80 | from 1.43 |
| Org median (cycle 3) | ≥ 2.00 | from 1.55 |
| Repos PASS (mean ≥ 2.00) | ≥ 3 of 7 | from 0/7 |

**v12 closure**: when ≥ 3 repos hit PASS and org mean ≥ 1.80. Re-audit cadence resumes weekly per ADR-041.

---

## 7. Risk Register

| Risk | Mitigation |
|---|---|
| Fleet pivots branch context mid-wave (as in v11) | All work in dedicated `chore/v12-...` branch; force-push idempotent |
| Push target (`phenotype-apps`) gets archived | Use `argis-extensions` as de facto push target (per v11) |
| `/tmp/melosviz-wt*` symlink issues on macOS | Use `/private/tmp/melosviz-wt-v12` (real path) per v11 lesson |
| 71-pillar schema drift between cycles | Pin to ADR-024 schema verbatim; cycle 3 uses identical template |
| Cycle 3 results show no improvement (audit methodology broken) | Add control repos (pheno, AgilePlus) with known-good scores to validate |
| Cheap-llm-mcp L5-104 still incomplete | Out of v12 scope; v13 candidate |

---

## 8. T0 Pre-Launch (T0.0)

- Verify T0.0 retro: subagent dispatch healthy? Fleet processes alive? (Yes, 23 orch processes)
- Verify `gh auth status` (KooshaPari with `delete_repo` scope)
- Verify push target (`argis-extensions` per v11)
- Verify pre-commit hook working
- Verify no merge-blocker in 71-pillar cycle 1 PR chain

---

## 9. T0.5 Wrap-up (post-launch)

- Author v12 closure report (`findings/v12-71-pillar-p0-remediation-2026-06-20.md`)
- Author ADR-076 v12 closure
- Update `AGENTS.md` Wave Plan section
- Update `.agileplus/agileplus.db` with v12 WPs (if reused as substrate)
- Push to origin
