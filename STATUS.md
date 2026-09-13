# OmniRoute — Current State

> **Last refreshed**: 2026-09-12 (fork audit session)
> **Schema**: lives at monorepo root (`STATUS.md`); per-repo `STATUS.md` mirrors the current local state.

---

## Snapshot

| Item | Value |
|---|---|
| Repo | `KooshaPari/OmniRoute` (fork of `diegosouzapw/OmniRoute`) |
| Fork version | `3.8.49-koosha.0` (`.fork-identity.json`) |
| Upstream | `diegosouzapw/OmniRoute` @ `v3.8.51` |
| Fork point | `v3.8.43` |
| Default branch | `main` |
| HEAD | `366ed9ef9f fix(tests): relax GLM arity assertion (#13319)` |
| Commits on main | 46 |
| Commits behind upstream | **4,606** (total) / **88** (since fork closeout June 24) |
| Diverged files | 11,796 files changed, ~602K insertions, ~958K deletions |
| Local branches | **5** (cleaned from 103) |

## Live Counts

| Metric | Count |
|---|---|
| TypeScript source files | 3,204 |
| Test files | 4,136 |
| DB modules | 124 |
| DB migrations | 159 |
| MCP tools | 104 |
| Providers | 237 |
| i18n locales | 43 |

## Bifrost Integration — 9/9 COMPLETE

All Bifrost Tier-1 router tasks are shipped. Architecture: supervised Go sidecar
via relay route with cooldown, kill switch, and full lifecycle management.

**Decision deadline**: 2026-09-17. See `docs/sessions/20260912-omniroute-fork-audit/01_BIFROST_DECISION_BRIEF.md`.

## Upstream Sync Status

- Last sync: 2026-06-21
- Security deps: **Already patched** (adm-zip, nanoid, dompurify)
- Code fixes pending: 3-6 commits
- See `docs/sessions/20260912-omniroute-fork-audit/02_UPSTREAM_SYNC_AUDIT.md`

## Branch Cleanup (DONE)

Reduced from 103 local branches to 5. Remaining branches have unique work:
- `feat/omniroute-macos-signing-infisical-20260901T2228Z` (macOS signing)
- `feat/docs-site-4-quadrant-20260902` (docs site)
- `chore/merge-homebrew-tap-into-omniroute-20260903` (homebrew)
- `fix/dispatch-union-custommodels-synced` (custom models)
- `feat/use-pheno-otel-v0.1.0-20260910` (pheno-otel, worktree-bound)

## Open Actions

| Item | Priority | Status |
|---|---|---|
| Bifrost decision (commit/revert/defer) | P0 | Decision brief written, due Sept 17 |
| Upstream security sync | P0 | Deps patched; code fixes pending |
| STATUS/PLAN refresh | P0 | This document |
| Branch cleanup | P1 | DONE (103 -> 5) |
| Upstream sync cadence | P1 | Documented in UPSTREAM_SYNC.md |
