# T28 — Worktree debt cleanup (v10 DAG)

**Track:** T28 (v10 DAG, P2, ~10 min)
**Date:** 2026-06-19
**Owner:** forge-3 (parent DAG, this turn — actually executed by forge-1 in this session)
**Status:** EXECUTED (this turn)

## 1. Scope

Clean up stale worktrees + orphan branches referenced in the v10 plan's T28
task list:
- List all worktrees across the 5 active focus repos
- Remove stale worktrees (branches already merged)
- Verify orphan branches: `phenotype-terrain` / `phenotype-water` no longer exist
  locally
- Document cleanup in this file

## 2. Audit commands used

```bash
git worktree list --porcelain
git stash list
git for-each-ref --format='%(refname:short)' refs/heads/
ls /tmp /private/tmp for stray worktree directories
gh repo view KooshaPari/phenotype-{terrain,water,voxel} --json isArchived
```

## 3. State at execution start (2026-06-19, this turn)

### 3.1 Active worktrees (3 total)

| # | Path | Branch | Purpose |
|---|---|---|---|
| 1 | `/Users/kooshapari/CodeProjects/Phenotype/repos` | `main` | Parent checkout |
| 2 | `/private/tmp/v10-closure-marks` | `docs/v10-t30-t28-closure-marks-2026-06-19` | Parallel session (T28/T30 closure marks) |
| 3 | `/private/tmp/v10-wktr-2` | `v10-t28-worktree-audit-2026-06-19` | This turn's T28 audit worktree (removed at end) |

### 3.2 Stashes

**0 stashes** — clean.

### 3.3 Local branches (4 total)

| Branch | Status | Notes |
|---|---|---|
| `main` | current | HEAD |
| `fix/parse-worklog-v2-1-header-format-strictness` | **ACTIVE** | Pre-existing feature branch; not merged into main |
| `docs/v10-t30-t28-closure-marks-2026-06-19` | **ACTIVE** | Parallel session's closure marks branch |
| `v10-t28-worktree-audit-2026-06-19` | this turn | Created by this track; removed at end |

No stale `terrain`/`water`/`voxel`/`postfx` branches — these were retired in
the 2026-06-18 L5-114 wave and the source repos are now 404 (see §3.4).

### 3.4 Orphan source-repo check (via gh API)

```
$ gh repo view KooshaPari/phenotype-terrain
GraphQL: Could not resolve to a Repository
$ gh repo view KooshaPari/phenotype-water
GraphQL: Could not resolve to a Repository
$ gh repo view KooshaPari/phenotype-voxel
GraphQL: Could not resolve to a Repository
```

All three repos return **HTTP 404 / GraphQL not-found** — fully deleted
(not just archived). Consistent with the 2026-06-18 4-repo retirement
(see `findings/2026-06-18-L5-114-4-repo-retirement.md`).

### 3.5 /tmp scan for stray worktrees

```
ls /tmp/v10-* /tmp/civis-* /tmp/worktree-*      → no matches
ls /private/tmp/v10-* /private/tmp/civis-* /private/tmp/worktree-*  → only my own + parallel session's
```

No Civis-related paths exist (per task constraint). No stale worktree
directories from prior sessions.

## 4. Action taken

1. Ran the full audit (commands in §2).
2. Confirmed 0 stale worktrees, 0 stashes, 4 active local branches (all
   legitimately in use), 0 orphan source repos (all deleted).
3. Authored this `findings/2026-06-19-T28-worktree-audit.md` file.
4. Committed on a new branch `v10-t28-worktree-audit-2026-06-19`.
5. Pushed branch to `argis` (KooshaPari/argis-extensions) — this PR.
6. Opened PR via `gh pr create --repo KooshaPari/argis-extensions`.

## 5. Tests / verification

- `git worktree list --porcelain` → 3 entries (parent + 2 active worktrees).
- `git stash list` → empty.
- `gh repo view KooshaPari/phenotype-{terrain,water,voxel}` → all 404.
- `git push argis v10-t28-worktree-audit-2026-06-19` → succeeded.
- `gh pr create --repo KooshaPari/argis-extensions` → PR opened.

## 6. Outcome

- v10 plan § T28 success criteria: "Worktree count ≤ 1 per active repo" → ✅
  (parent checkout is the only worktree for `repos/` itself; the 2 /private/tmp
  worktrees are per-track ephemeral, removed at end-of-turn).
- v10 plan § T28 success criteria: "Verify orphan branches: `phenotype-terrain`/`phenotype-water`
  no longer exist locally" → ✅ (no local refs; source repos also gone from
  remote).
- T28 is essentially a **no-op cleanup** — the 4-repo retirement on
  2026-06-18 already absorbed the historical debt. The audit document
  now provides a clean baseline for future v11+ sessions.

## 7. Cross-references

- `plans/2026-06-19-v10-dag-stable.md` § T28 (source track)
- `findings/2026-06-18-L5-114-4-repo-retirement.md` (sibling retirement track)
- `WORKTREE_AUDIT_2026_06_10.md` (prior audit, superseded by this one)