# Upstream Sync Audit

**Date:** 2026-09-12
**Fork:** KooshaPari/OmniRoute (main)
**Upstream:** diegosouzapw/OmniRoute
**Range:** v3.8.43 (fork base) -> v3.8.50 (latest upstream release)
**Commits:** 41 upstream commits, 48 fork commits
**Strategy:** Cherry-pick selective (no merge/rebase due to no common ancestor)

---

## Key Findings

### No Common Ancestor

The fork was re-uploaded (not forked via GitHub), so `git merge-base` finds nothing.
Cherry-pick is the only viable sync strategy.

### Tags Present

- v3.8.43 (fork base)
- v3.8.44 through v3.8.50 (upstream releases)
- v3.9.0 (latest upstream)
- No v3.8.51 exists

### Fork Divergence

The fork has 48 commits on main covering:
- Pluggable auth provider system
- Bifrost relay architecture
- CI pipeline customization
- Fork identity and branding
- Various custom fixes (compression, GLM tests, etc.)

---

## Commit Classification (v3.8.43 -> v3.8.50)

### Security Fixes (5 commits)

| Commit | Message | Action |
|--------|---------|--------|
| `1eae976b28` | crypto.randomInt for proxy rotation (CodeQL #698/#699) | **CHERRY-PICKED** (ecc525e) |
| `698b6eb00d` | adm-zip bump + exact host matching | DEFER to npm audit |
| `026e1cadaa` | nanoid, dompurify bump | DEFER to npm audit |
| `b090b601a5` | nanoid, dompurify bump (2nd) | DEFER to npm audit |
| `153f453b0b` | 13 Dependabot + audit cleanup | DEFER to npm audit |

### Critical Bug Fixes (3 commits)

| Commit | Message | Action |
|--------|---------|--------|
| `ca23eed77c` | memoize getModelsDevPricing | MANUAL ADAPTATION NEEDED |
| `5f0a394091` | Hide excluded models from catalog | ALREADY IN FORK |
| `65e81158ab` | ollama capability routing | SKIP (5094 files; squash) |

### Proxy/Transport (1 commit)

| Commit | Message | Action |
|--------|---------|--------|
| `9cd18bf9a1` | force CONNECT tunnel for proxy | MANUAL ADAPTATION NEEDED |

### Deps/Build/CI (8 commits)

| Commit | Message | Action |
|--------|---------|--------|
| Various | Dependabot bumps, electron bump, devDeps | DEFER / SKIP |

### Release/CI Infrastructure (11 commits)

| Commit | Message | Action |
|--------|---------|--------|
| Various | Release commits, Mergify, CI fixes | SKIP |

### Other (13 commits)

| Commit | Message | Action |
|--------|---------|--------|
| Various | Docs, tests, .gitignore hardening | DEFER / SKIP |

---

## Risk Assessment

### Low Risk (Safe to Cherry-Pick)

- `1eae976b28` - crypto.randomInt: Only 2 code files touched
- `5f0a394091` - catalog exclusion: 1 file, 17 lines (already in fork)

### Medium Risk (Manual Adaptation)

- `ca23eed77c` - memoize pricing: Fork has own caching; needs integration review
- `9cd18bf9a1` - proxy CONNECT: Fork has modified proxyDispatcher.ts

### High Risk (Skip or Defer)

- `65e81158ab` - ollama routing: 5094 files; entire codebase squash
- All release commits: Bundle many changes; apply individually instead
- All Dependabot commits: Handle via `npm audit fix`

---

## Execution Status

See `05_CHERRY_PICK_PLAN.md` for detailed execution tracking.

---

## Files in This Session

- `03_BRANCH_EVAL_REPORT.md` - Branch deletion safety evaluation
- `04_BIFROST_UPSTREAM_HEALTH.md` - Bifrost relay health assessment
- `05_CHERRY_PICK_PLAN.md` - Detailed cherry-pick execution plan
- `06_CI_DRIFT_AUDIT.md` - CI pipeline drift analysis
