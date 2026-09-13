# Upstream Sync Guide — OmniRoute

## Upstream
- Remote: `upstream` → https://github.com/diegosouzapw/OmniRoute
- Branch tracking: `upstream/main`
- Fork point: `v3.8.43`
- Current upstream: `v3.8.51`
- Commits behind: ~88 (since fork closeout) / ~4,606 (total)

## Sync Strategy: Cherry-Pick Selective (NEVER merge/rebase)

The fork has diverged ~11,796 files from upstream. Merging or rebasing would
create unresolvable conflicts. We cherry-pick individual commits that are
relevant to our fork.

## What to Backport from Upstream

### Always backport:
- Security patches (dependency bumps, CVE fixes)
- Critical bug fixes (DB schema, routing correctness)
- Provider fixes for providers we support

### Selectively backport:
- CI/CD improvements (if they apply to our workflow)
- New provider integrations (if they're in our 237-provider catalog)
- Documentation improvements

### Never backport:
- Routing algorithm changes (replaced by Bifrost)
- Load balancing logic (replaced by Bifrost policies)
- Retry/fallback logic (replaced by phenotype-retry + Bifrost)

## How to Sync

```bash
# 1. Fetch latest upstream
git fetch upstream

# 2. Find relevant commits
git log upstream/main --since="LAST_SYNC_DATE" --oneline

# 3. For each relevant commit, cherry-pick
git cherry-pick <sha>

# 4. If conflicts, resolve manually (prefer our version for logging/architecture)
# 5. If cherry-pick fails badly, abort and evaluate manually
git cherry-pick --abort
```

## Sync Cadence

- **Monthly**: First Monday of each month, check for new upstream releases
- **Security**: Within 48 hours of upstream security patches
- **After fork audit sessions**: Cherry-pick critical fixes identified during audits

## Current Sync State

| Last sync | 2026-06-21 (L5-123) |
|---|---|
| Upstream since | v3.8.25 → v3.8.51 (8 releases) |
| Security deps | Already patched in fork |
| Code fixes pending | 3-6 commits (see 02_UPSTREAM_SYNC_AUDIT.md) |

## Tracking

Document each sync session in `docs/sessions/<date>/` with:
- Commits cherry-picked (SHA + subject)
- Conflict resolution decisions
- Test results after sync
