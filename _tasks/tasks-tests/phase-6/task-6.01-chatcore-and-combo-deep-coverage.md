# Task 6.01 — ChatCore + Combo Deep Coverage

## Metadata
- **Phase**: 6 (90% push)
- **Target modules**:
  - `open-sse/handlers/chatCore.ts` (lines: 67.22% → 80%+)
  - `open-sse/services/combo.ts` (lines: 56.89% → 75%+)
- **Test files to extend/create**:
  - `tests/unit/chatcore-translation-paths.test.mjs`
  - `tests/unit/combo-routing-engine.test.mjs`
  - `tests/integration/chat-pipeline.test.mjs`
- **Estimated assertions**: ~35

## Pre-requisites
1. Read `open-sse/handlers/chatCore.ts`
2. Read `open-sse/services/combo.ts`
3. Export a fresh text report scoped to both files

## Focus Areas
- Translation fallback branches that only execute on mixed provider/model combinations
- Request dedup resolution and replay behavior
- Timeout, upstream error, and retry classification paths
- Combo selection branches involving unavailable models, override headers, and fallback accounts
- Early-return and invalid-configuration paths that currently escape integration coverage

## Acceptance Criteria
- [ ] New tests exercise both success and failure branches in `chatCore.ts`
- [ ] Combo routing assertions cover fallback, lockout, and unavailable-target paths
- [ ] `chatCore.ts` reaches 80%+ lines
- [ ] `combo.ts` reaches 75%+ lines
- [ ] Global `npm run test:coverage` reaches at least 82% statements / lines after Tasks 6.01–6.03

