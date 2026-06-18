# OmniRoute — Current State

> **Last refreshed**: 2026-06-18 (L5-109 fork-cleanup session)
> **Schema**: lives at monorepo root (`STATUS.md`); per-repo `STATUS.md` mirrors the current local state.
> **Ref**: monorepo `STATUS.md`, `SSOT.md`, `findings/71-pillar-2026-06-17*.md`

---

## Snapshot

| Item | Value |
|---|---|
| Repo | `KooshaPari/OmniRoute` (fork of `i-am-bee/omniroute`) |
| Version | v3.8.24 (per `SPEC.md`); v3.9.0 in active development |
| Default branch | `main` (local: `origin/main`) |
| Current work branch | `chore/l5-109-omniroute-fork-cleanup-2026-06-18` |
| Open PRs | 0 |
| Open issues | unknown — `gh issue list` |
| Last release | see CHANGELOG.md (no new release in this session) |
| Last commit (HEAD) | `72cee0d2e chore(build): expand Justfile with dev/coverage/typecheck/fmt recipes` |
| Last release-tag commit | `b3aef5a` (per CHANGELOG.md § v3.8.24) |

## Branch inventory

| Class | Count | Action |
|---|---|---|
| Local KP-branches (worktree-agent-*) | 8 | **Deleted** (this session) |
| Local KP-branches (chore/feat/etc, unique value) | 0 | merged into `chore/l5-109-...` via cherry-picks |
| Remote origin branches (stale, already in main) | ~12 | **Deleted** this session |
| Remote origin branches (unique value, ahead of main) | 6 | **Cherry-picked** into `chore/l5-109-...` this session |
| Remote upstream branches | 0 | (upstream = `i-am-bee/omniroute`, no fetch configured this session) |

## Cherry-picked work this session (L5-109)

| Group | Source branch | Commits | Net effect |
|---|---|---|---|
| A. Codeowners + dependabot + OpenSSF Scorecard | `chore/codeowners-default-reviewer` | 7 | `.github/CODEOWNERS`, `.github/dependabot.yml`, `.github/workflows/scorecard.yml` |
| B. Audit-ratchet workflow | `chore/audit-ratchet-2026-06-16` | 2 | `.github/workflows/audit-ratchet.yml`, vendored audit sheet |
| C. L5-L10 debt register scaffold | `chore/l5-l10-debt-register-2026-06-16` | 1 | OKR/COST/TECH_DEBT.md initial drafts |
| D. Audit-safe-workflows traceability | `chore/audit-safe-workflows-0605` | 1 | `docs/ops/journey-traceability.md` (canonical) |
| E. A2A agent-dispatch skill + docs | `feat/a2a-agent-dispatch-clean` | 3 | `src/lib/a2a/skills/dispatcher.ts`, `docs/frameworks/A2A-SERVER.md`, `.env.example` |
| F. Integration/consolidate traceability | `integration/consolidate` | 2 | `src/shared/utils/formatting.ts` + tests |
| G. Workflow hygiene | `chore/2nd-hygiene-2026-06-08` | 1 | expanded Justfile (additional dev/coverage/typecheck recipes) |
| H. Devcontainer + vscode | `chore/dx-2026-06-08` | 1 | `.devcontainer/devcontainer.json` |
| I. Worklog seed | `chore/worklog-seed-OmniRoute` | 1 | `worklogs/2026-06-05-fleet-readiness.md` (already present, reconciled) |

Total: **9 logical groups, ~20 cherry-picks applied** to `chore/l5-109-omniroute-fork-cleanup-2026-06-18`.

## Open work / next session

| Item | Owner | Priority | Target |
|---|---|---|---|
| `pheno-otel` integration in `routingLogger.ts` (DEBT-011) | @observability | P2 | 2026-06-30 |
| 9 a2a skill stub implementations (DEBT-006) | @a2a | P2 | 2026-07-15 |
| `package.json` at root or rewrite `.husky/pre-push` (DEBT-002) | @devops | P1 | 2026-06-25 |
| `webhook-ssrf-guard` IPv6 tests (DEBT-017) | @security | P3 | next refactor cycle |
| Open PR for `chore/l5-109-omniroute-fork-cleanup-2026-06-18` | @release | P0 | this session |

## Governance meta

- ADR count: 30 (per `ADR.md`; this turn: ADR-026 — Bifrost disambiguation)
- 30-pillar score: see `audit_scorecard.json` (last refreshed 2026-06-16)
- Open SSF Scorecard: see `.github/workflows/scorecard.yml` (cherry-picked this session)
- Codeowners: see `.github/CODEOWNERS` (cherry-picked this session; `@KooshaPari/core` proposed default reviewer)
- Dependabot: see `.github/dependabot.yml` (cherry-picked this session; weekly cadence)
- Branch protection: TBD on KooshaPari fork (upstream has stricter rules)

## How this STATUS is refreshed

1. After every PR merge to `main`.
2. After every cherry-pick batch (like this session).
3. Monthly on the first Monday of each month (sweeper checks staleness).

Refresh command (manual):
```bash
git log --oneline -1                       # HEAD SHA
git branch -r | grep -v "release/v" | wc -l # remote branch count
gh pr list --state open --json number,title
```

---

**Cross-references**:
- `SPEC.md` — v8 spec (v3.9.0 in flight)
- `PLAN.md` — v8/v9 roadmap
- `ADR.md` — 30 ADRs (incl. ADR-026 this session)
- `CHANGELOG.md` — release history
- `docs/ROUTING-CONVERGENCE-STATUS.md` — Bifrost disambiguation + canonical routing
- `docs/TECH_DEBT.md` — 20 tracked items (4 P1, 7 P2, 9 P3)
- `docs/OKR.md` — Q3 2026 OKRs
- `docs/COST.md` — cost attribution
- `audit_scorecard.json` — 30-pillar scorecard snapshot