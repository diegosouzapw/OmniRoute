# OmniRoute Fork Audit -- Upstream Sync Analysis

> **Date**: 2026-09-12
> **Fork**: KooshaPari/OmniRoute @ main (3.8.49-koosha.0)
> **Upstream**: diegosouzapw/OmniRoute @ v3.8.51
> **Commits behind**: 4,606 (total) / 88 (since fork closeout June 24)

---

## 1. Upstream Releases Since Fork Point (v3.8.43)

| Release | Key Changes |
|---|---|
| v3.8.44 | Provider fixes, CI improvements |
| v3.8.45 | Release pipeline fixes |
| v3.8.46 | crypto.randomInt for proxy (CodeQL fix) |
| v3.8.47 | Release pipeline, Docker fixes |
| v3.8.49 | cliproxy provider exposure controls, adm-zip security bump |
| v3.8.50 | Major: 10 changelog fragments, install/upgrade schema convergence |
| v3.8.51 | Current upstream HEAD |

## 2. Security Changes (Already Applied in Fork)

| Dependency | Fork Version | Upstream Fix | Status |
|---|---|---|---|
| adm-zip | ^0.6.0 | >=0.6.0 | **ALREADY PATCHED** |
| nanoid | ^3.3.17 | ^3.3.17 | **ALREADY PATCHED** |
| dompurify | ^3.4.14 | ^3.4.13 | **ALREADY PATCHED** |

## 3. Security Changes NOT Yet Pulled

| Commit | Subject | Priority |
|---|---|---|
| `cba636b9f0` | crypto.randomUUID for ID generation | P1 -- savepoint names still use Math.random |
| `1eae976b28` | crypto.randomInt for proxy rotation | P1 -- CodeQL fix |
| `a3ca33fa64` | Claude mid-conversation system message fix | P2 |

## 4. Critical Bug Fixes NOT Yet Pulled

| Commit | Subject |
|---|---|
| `0ce21232db` | DB schema convergence (ENOSPC fix) |
| `65e81158ab` | Ollama routing by capability |
| `c68cda7dfb` | Shared passthrough providers |

## 5. Recommended Sync Strategy

1. **Phase 1 (This week)**: Cherry-pick 3-4 critical bug fixes
2. **Phase 2 (This month)**: Evaluate remaining 80+ commits for relevance
3. **Phase 3 (Ongoing)**: Establish monthly sync cadence

**Rule**: Cherry-pick selectively, NEVER merge or rebase.
