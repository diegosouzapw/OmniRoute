# Task 6.06 — Skills Runtime + Cloud Sync

## Metadata
- **Phase**: 6 (90% push)
- **Target modules**:
  - `src/lib/skills/registry.ts` (19.65% → 70%+)
  - `src/lib/skills/executor.ts` (21.38% → 70%+)
  - `src/lib/skills/interception.ts` (12.66% → 70%+)
  - `src/lib/skills/injection.ts` (31.93% → 75%+)
  - `src/lib/cloudSync.ts` (20.00% → 65%+)
- **Test files to extend/create**:
  - `tests/unit/skills-registry.test.mjs`
  - `tests/unit/skills-executor.test.mjs`
  - `tests/unit/skills-interception.test.mjs`
  - `tests/unit/skills-injection.test.mjs`
  - `tests/unit/cloud-sync.test.mjs`
- **Estimated assertions**: ~32

## Pre-requisites
1. Read runtime contracts under `src/lib/skills/`
2. Reuse existing `src/lib/skills/__tests__/integration.test.ts` as behavioral reference only
3. Identify which functions require integration-style harnesses vs direct unit tests

## Focus Areas
- Skill registration and lookup failures
- Executor sandbox and argument validation branches
- Interception and injection behavior for tool calls, inline skills, and disabled skills
- Cloud sync happy path vs provider/network failure branches
- Null/empty configuration paths that currently bypass assertions

## Acceptance Criteria
- [ ] `src/lib/skills/` is no longer below 40% lines overall
- [ ] Interception / injection coverage includes both enabled and disabled flows
- [ ] `cloudSync.ts` has direct regression tests for error handling
- [ ] Global `npm run test:coverage` reaches at least 86% statements / lines and 78% branches after Tasks 6.04–6.06

