# Task 6.09 — Final Gap Closure + Ratchet Plan

## Metadata
- **Phase**: 6 (90% push)
- **Target scope**:
  - Fresh `coverage/coverage-summary.json` after Tasks `6.01` → `6.08`
  - All remaining production files below 60% lines
  - Remaining large-miss files with `missingLines >= 100`
- **Validation commands**:
  - `npm run test:unit`
  - `npm run test:coverage`
  - targeted `node --import tsx/esm --test ...` commands for the last gap files
- **Estimated assertions**: variable

## Pre-requisites
1. Generate a fresh coverage report and sort by lowest line coverage plus missing lines
2. Treat uncovered regression bugs as blockers until encoded in automated tests
3. Avoid raising the CI threshold in `package.json` until the repo is comfortably above the next ratchet

## Focus Areas
- Final long-tail files still under 60% lines after the first eight tasks
- Missing regression tests for any production fix made during the 90% push
- Hard-to-reach branches that need integration coverage instead of more unit mocking
- Evidence package for the next ratchet step in CI

## Acceptance Criteria
- [ ] `npm run test:unit` passes
- [ ] `npm run test:coverage` passes
- [ ] Global coverage reaches 90%+ statements / lines
- [ ] Global coverage reaches 85%+ branches
- [ ] Global coverage reaches 88%+ functions
- [ ] A follow-up ratchet proposal is recorded for raising CI from 60% only after the 90% baseline is stable
