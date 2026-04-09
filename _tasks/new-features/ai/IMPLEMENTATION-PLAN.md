# 🆓 Free Providers Implementation Plan

## Goal

Add 5 new free AI providers to OmniRoute, update badges, overhaul the free section of the README, and sync all 29 i18n language files to reflect the new options.

## Providers Overview

| # | Provider | Alias | Free Quota | Priority |
|---|----------|-------|-----------|----------|
| 1 | LongCat AI | `lc/` | **50M tokens/day** | 🔴 HIGH |
| 2 | Pollinations AI | `pol/` | No key, unlimited (1 req/15s) | 🔴 HIGH |
| 3 | Cloudflare Workers AI | `cf/` | 10K Neurons/day (~150 LLM responses) | 🔴 HIGH |
| 4 | Scaleway | `scw/` | 1M free tokens new accounts | 🟡 MEDIUM |
| 5 | Together AI *(metadata only)* | `together/` | 3 always-free models + $25 | 🟡 MEDIUM |
| 6 | Gemini *(metadata only)* | `gemini/` | 1,500 req/day free | 🟡 MEDIUM |
| 7 | AI/ML API | `aiml/` | $0.025/day credits, 200+ models | 🟡 MEDIUM |
| 8 | Badges | — | Stars, CI, Node | 🟡 MEDIUM |
| 9 | README free section | — | Full overhaul | 🔴 HIGH |
| 10 | i18n sync | — | 29 languages | 🔴 HIGH |

## Architecture Summary

All new providers use the **existing `DefaultExecutor`** via standard Bearer auth — no new executor except:
- **Pollinations** → custom executor (optional auth, no key required)
- **Cloudflare** → custom executor (dynamic URL with `accountId`)

`providers.ts` is the main metadata file. `constants.ts` (open-sse) has the transport config.

## Execution Order

```
TASK-05 → Together AI metadata update (1 line change, instant)
TASK-06 → Gemini metadata update (1 line change, instant)
TASK-08 → README badges (3 lines)
TASK-01 → LongCat (providers.ts + constants.ts)
TASK-04 → Scaleway (providers.ts + constants.ts)
TASK-07 → AI/ML API (providers.ts + constants.ts)
TASK-02 → Pollinations (providers.ts + constants.ts + NEW executor)
TASK-03 → Cloudflare (providers.ts + constants.ts + NEW executor)
TASK-09 → README free section overhaul
TASK-10 → i18n sync (all 29 languages)
```

## Checklist

### Phase 1: Quick Metadata Fixes
- [ ] **TASK-05**: Together AI — add `hasFree: true` + `freeNote` to providers.ts
- [ ] **TASK-06**: Gemini — add `hasFree: true` + `freeNote` to providers.ts
- [ ] **TASK-08**: Add GitHub Stars + CI + Node badges to README.md

### Phase 2: New Providers (No Executor)
- [ ] **TASK-01**: LongCat AI — providers.ts + constants.ts
- [ ] **TASK-04**: Scaleway — providers.ts + constants.ts
- [ ] **TASK-07**: AI/ML API — providers.ts + constants.ts

### Phase 3: New Providers (Custom Executor)
- [ ] **TASK-02**: Pollinations AI — providers.ts + constants.ts + executor
- [ ] **TASK-03**: Cloudflare Workers AI — providers.ts + constants.ts + executor

### Phase 4: Documentation
- [ ] **TASK-09**: README free section overhaul (free combos, new provider sections)
- [ ] **TASK-10**: i18n sync — all 29 languages updated

### Phase 5: Testing & Release
- [ ] Run `npm test` — all 821+ tests must pass
- [ ] Test each new provider with curl via OmniRoute
- [ ] Commit: `feat(providers): add LongCat, Pollinations, Cloudflare AI, Scaleway, AI/ML API`
- [ ] Create release branch + PR + version bump (2.9.3)

## Files Changed

| File | Tasks |
|------|-------|
| `src/shared/constants/providers.ts` | TASK-01,02,03,04,05,06,07 |
| `open-sse/config/constants.ts` | TASK-01,02,03,04,07 |
| `open-sse/executors/pollinations.ts` | TASK-02 (NEW) |
| `open-sse/executors/cloudflare-ai.ts` | TASK-03 (NEW) |
| `open-sse/executors/index.ts` | TASK-02,03 |
| `README.md` | TASK-08,09 |
| `docs/i18n/*/README.md` (29 files) | TASK-10 |

## Task Spec Files

- [TASK-01-longcat.md](./TASK-01-longcat.md)
- [TASK-02-pollinations.md](./TASK-02-pollinations.md)
- [TASK-03-cloudflare.md](./TASK-03-cloudflare.md)
- [TASK-04-scaleway.md](./TASK-04-scaleway.md)
- [TASK-05-together-free.md](./TASK-05-together-free.md)
- [TASK-06-google-ai-studio.md](./TASK-06-google-ai-studio.md)
- [TASK-07-aiml-api.md](./TASK-07-aiml-api.md)
- [TASK-08-readme-badges.md](./TASK-08-readme-badges.md)
- [TASK-09-readme-free-section.md](./TASK-09-readme-free-section.md)
- [TASK-10-i18n-docs-sync.md](./TASK-10-i18n-docs-sync.md)
