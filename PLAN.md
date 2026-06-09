# OmniRoute — Plan

> Living plan. Updated as scope changes.
> Last updated: 2026-06-08

## Current Quarter (2026 Q2 → Q3)

### Completed
- [x] Next.js app with 6+ provider adapters
- [x] Streaming completion routing
- [x] Cost tracking + dashboards
- [x] AGENTS.md operating instructions
- [x] GitHub governance (CODEOWNERS, dependabot, scorecard)
- [x] i18n auto-translation pipeline (`scripts/i18n/`)

### In Progress
- [ ] **Coverage governance** — `.codecov.yml`, `vitest.config.ts` coverage, `coverage.yml` workflow
- [ ] **Test coverage floor (70%)** — see ADR-0003
- [ ] **ADRs** for test runner, coverage, decomposition, i18n
- [ ] **BDD feature files** for the router

### Backlog
- [ ] Extract `@omniroute/sdk` as standalone npm package
- [ ] Strip `open-sse/` vendor fork to keep only the diff from upstream
- [ ] Move `docs/` to a separate `omni-route-docs` repo
- [ ] Deprecate in-app conversation log → stream to external store
- [ ] Replace `open-sse` with upstream library when it stabilizes
- [ ] OpenTelemetry tracing in router layer

## Decomposition Roadmap

| Step | Effort | Impact |
|---|---|---|
| Add `.gitignore` for `docs/i18n/` (and the JSON sidecars) | 1 line | -682K MD LOC, -2.7GB on disk |
| Extract `@omniroute/sdk` → `packages/@omniroute/sdk/` as workspace pkg | 1 day | cleaner monorepo boundary |
| Slim `open-sse/` to only the divergence from upstream | 1 day | -56K LOC, easier upstream sync |
| Move `docs/` (EN only) to `docs-site/` repo | 2 days | cleaner OmniRoute, dedicated docs CI |
| Add coverage workflow + tarpaulin-like for vitest | 1 day | measurable coverage, fail-under 70% |
| Add SPEC/PLAN/ADRs to each extracted package | 2 days | governance carries through the split |

## Test & Coverage Roadmap

| Component | Current | Target |
|---|---|---|
| `src/lib/router.ts` | unknown | 90% |
| `src/lib/providers/openai.ts` | unknown | 80% |
| `src/lib/providers/anthropic.ts` | unknown | 80% |
| `src/lib/auth.ts` | unknown | 90% |
| `src/lib/quota.ts` | unknown | 85% |
| `src/components/` | unknown | 50% (UI is lower priority) |

## Governance Roadmap

| Item | Status | Notes |
|---|---|---|
| SPEC.md | ✅ this commit | multi-package decomposition captured |
| PLAN.md | ✅ this commit | Q3 2026 roadmap |
| AGENTS.md | ✅ existing | — |
| ADR template (0001) | ✅ existing | — |
| ADR-0002 test runner | ⏳ this commit | vitest over jest |
| ADR-0003 coverage floor | ⏳ this commit | 70% rationale |
| ADR-0004 decomposition | ⏳ this commit | the split |
| ADR-0005 i18n gitignore | ⏳ this commit | generated content policy |
| `.codecov.yml` | ⏳ next | — |
| Coverage workflow | ⏳ next | — |
| BDD .feature files | ⏳ future | godog or cucumber-js TBD |
