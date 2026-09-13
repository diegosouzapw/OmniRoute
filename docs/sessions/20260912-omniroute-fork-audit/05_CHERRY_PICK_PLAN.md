# Cherry-Pick Execution Plan

**Date:** 2026-09-12
**Scope:** Upstream v3.8.43 -> v3.8.50 (41 commits)
**Strategy:** Cherry-pick selective (manual adaptation for fork-modified files)

---

## Context

- Fork: KooshaPari/OmniRoute at main (48 fork-specific commits)
- Upstream: diegosouzapw/OmniRoute v3.8.50 (41 commits ahead of v3.8.43)
- No common merge-base (fork was re-uploaded, not forked via GitHub)
- Cherry-pick is the only viable sync strategy

## Commits Between v3.8.43 and v3.8.50

### Category: Security Fixes (5 commits)

| Commit | Message | Cherry-Pick? | Notes |
|--------|---------|:------------:|-------|
| `1eae976b28` | fix(release): proxy random via crypto.randomInt (CodeQL #698/#699) | **YES** | 2 code files; 44 docs/changelog files will conflict |
| `698b6eb00d` | fix(security): bump adm-zip >=0.6.0 + exact host matching | **DEFER** | package.json/lock conflict; need lock file regen |
| `026e1cadaa` | fix(deps): bump nanoid, dompurify (Dependabot) | **DEFER** | Deps only; handle via `npm audit fix` |
| `b090b601a5` | fix(deps): bump nanoid, dompurify (Dependabot) | **DEFER** | Deps only; handle via `npm audit fix` |
| `153f453b0b` | fix(deps): bump deps for 13 Dependabot + audit cleanup | **DEFER** | Deps only; handle via `npm audit fix` |

### Category: Critical Bug Fixes (3 commits)

| Commit | Message | Cherry-Pick? | Notes |
|--------|---------|:------------:|-------|
| `ca23eed77c` | fix(models): memoize getModelsDevPricing (event loop / healthz) | **MANUAL** | Fork has own caching; needs adaptation |
| `5f0a394091` | Hide health-check excluded models from /v1/models catalog | **SKIP** | Already present in fork (isExcludedByProviderConnections) |
| `65e81158ab` | fix(ollama): route models by advertised capability | **SKIP** | 5094 files changed; squash commit, not cherry-pickable |

### Category: Proxy / Transport (1 commit)

| Commit | Message | Cherry-Pick? | Notes |
|--------|---------|:------------:|-------|
| `9cd18bf9a1` | fix(proxy): force CONNECT tunnel for HTTP proxied requests | **MANUAL** | Fork has modified proxyDispatcher.ts; needs careful merge |

### Category: Deps / Build / CI (8 commits)

| Commit | Message | Cherry-Pick? | Notes |
|--------|---------|:------------:|-------|
| `51087675ca` | chore(deps): resolve 3 Dependabot alerts | **DEFER** | npm audit |
| `95c9325679` | chore(deps): resolve 7 Dependabot alerts | **DEFER** | npm audit |
| `026e1cadaa` | fix(deps): bump nanoid, dompurify | **DEFER** | npm audit |
| `b090b601a5` | fix(deps): bump nanoid, dompurify | **DEFER** | npm audit |
| `153f453b0b` | fix(deps): bump deps for 13 Dependabot | **DEFER** | npm audit |
| `9233a9483c` | fix(deps): bump transitive deps for 6 Dependabot | **DEFER** | npm audit |
| `5712364134` | fix(electron): bump electron 42 -> 43 | **SKIP** | Electron-specific; low priority for fork |
| `44d501ae6a` | deps: bump development group | **SKIP** | DevDeps only |

### Category: Release / CI Infrastructure (11 commits)

| Commit | Message | Cherry-Pick? | Notes |
|--------|---------|:------------:|-------|
| `1bda6c15dc` | Release v3.8.44 | **SKIP** | Release commit; content already picked individually |
| `3ddcee6369` | Release v3.8.45 | **SKIP** | Release commit |
| `92715c8f2c` | Release v3.8.46 | **SKIP** | Release commit |
| `e8950ded39` | Release v3.8.47 | **SKIP** | Release commit |
| `c9d4a45f18` | Release v3.8.49 | **SKIP** | Release commit |
| `b4ec7807ab` | Release v3.8.50 | **SKIP** | Release commit |
| `5458026c21` | docs(changelog): aggregate fragments | **SKIP** | Changelog only |
| `e6523da2a1` - various | CI fixes (Mergify, npm publish, ESLint) | **SKIP** | CI infra; fork has own CI |

### Category: Other (13 commits)

| Commit | Message | Cherry-Pick? | Notes |
|--------|---------|:------------:|-------|
| `918fba5e39` | fix(repo): harden .gitignore | **DEFER** | Minor; handle manually later |
| `698b6eb00d` | fix(security): bump adm-zip + mitm test | **DEFER** | See security section |
| `8e383f5c02` | test(ci): static body in codex e2e | **SKIP** | Test-only |
| `66c56ece9e` | cliproxy provider exposure controls | **SKIP** | Koosha's own commit already in fork |
| `0065f1b7f0` | test(ci): selfref guard | **SKIP** | CI test |
| `7ee5bbc64d` | fix(build): v3.8.48 hotfix | **SKIP** | Build infra |
| `9cd18bf9a1` | fix(proxy): force CONNECT tunnel | **MANUAL** | See proxy section |
| `0c7f756f92` etc. | GitHub Actions bumps | **SKIP** | CI version bumps |
| `604afeacf4` | Revert ws externalization | **SKIP** | Already reverted upstream |
| `e61b75f007` | fix(config): externalize ws | **SKIP** | Already reverted |
| `5bc11f4d0e` | test(security): CodeQL #689 | **SKIP** | Test-only |
| `ddd6d09cd1` | chore(quality): tighten coverage baseline | **SKIP** | CI infra |
| `4ed014469a` | docs(readme): local SVG flags | **SKIP** | Docs only |

---

## Execution Plan

### Batch 1: Immediate (Code-only, clean)

**`1eae976b28` - crypto.randomInt (CodeQL security fix)**
- **Risk:** LOW
- **Conflict probability:** LOW (only 2 code files, both apply cleanly)
- **Approach:** Manual cherry-pick of code files only (skip 44 CHANGELOG/i18n files)
- **Files:**
  - `src/lib/db/proxies.ts` (import + 1 line change)
  - `tests/unit/proxy-pool-rotation-6365.test.ts` (add variation assertion)
- **Status:** TESTED - dry-run confirmed clean apply on code files

### Batch 2: Manual Adaptation Required

**`ca23eed77c` - memoize getModelsDevPricing**
- **Risk:** MEDIUM
- **Conflict probability:** HIGH (fork has own caching layer in modelsDevSync.ts)
- **Approach:** Review fork's existing caching vs upstream's memoization; manually adapt
- **Files to adapt:**
  - `src/lib/modelsDevSync.ts` (memoize getModelsDevPricing specifically)
  - `tests/unit/modelsDevSync-extended.test.ts` (new test file; can add)

**`9cd18bf9a1` - proxy CONNECT tunnel fix**
- **Risk:** MEDIUM
- **Conflict probability:** HIGH (fork has modified proxyDispatcher.ts)
- **Approach:** Review fork's proxyDispatcher changes; apply CONNECT tunnel fix manually
- **Files to adapt:**
  - `open-sse/utils/proxyDispatcher.ts` (add `proxyTunnel: true`)
  - `tests/unit/proxy-dispatcher-family.test.ts` (add regression test)

### Batch 3: Dependency Updates (Deferred)

**Security dep bumps** - Handle via:
```bash
npm audit fix
npm audit --omit=dev
```
Commits: `698b6eb00d`, `026e1cadaa`, `b090b601a5`, `153f453b0b`, `9233a9483c`, `51087675ca`, `95c9325679`

---

## Status

| Batch | Commit | Status |
|-------|--------|--------|
| 1 | `1eae976b28` crypto.randomInt | **IN PROGRESS** |
| 2 | `ca23eed77c` memoize pricing | PENDING |
| 2 | `9cd18bf9a1` proxy CONNECT tunnel | PENDING |
| 3 | dep bumps (7 commits) | DEFERRED |

## Already Addressed in Fork

- `5f0a394091` - `isExcludedByProviderConnections` already present in catalog.ts
- `66c56ece9e` - Koosha's own commit, already in fork
- `604afeacf4` / `e61b75f007` - ws externalization already reverted in fork
