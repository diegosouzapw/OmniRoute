# Task 6.03 — SSE Auth, Chat Entry, and Model Routes

## Metadata
- **Phase**: 6 (90% push)
- **Target modules**:
  - `src/sse/services/auth.ts` (58.85% → 80%+)
  - `src/sse/handlers/chat.ts` (55.38% → 75%+)
  - `src/app/api/v1/models/catalog.ts` (52.45% → 75%+)
  - `src/app/api/providers/[id]/models/route.ts` (53.04% → 80%+)
- **Test files to extend/create**:
  - `tests/unit/sse-auth.test.mjs`
  - `tests/integration/chat-pipeline.test.mjs`
  - `tests/unit/models-catalog-route.test.mjs`
  - `tests/unit/provider-models-route.test.mjs`
- **Estimated assertions**: ~28

## Pre-requisites
1. Read `src/sse/services/auth.ts` and `src/sse/handlers/chat.ts`
2. Read both model-route modules and their schema/helpers
3. Reuse existing route harnesses from `tests/unit` when possible

## Focus Areas
- Missing or invalid auth headers, default combo usage, and no-log behavior
- Request parsing failure paths at the SSE entry layer
- Catalog filtering, unknown provider/model branches, and compatibility fallbacks
- Route-level validation errors and defensive returns

## Acceptance Criteria
- [ ] Auth tests cover valid key, invalid key, missing key, and local/default modes
- [ ] Chat handler tests prove 400 / 401 / 503 / 504 edges through the entry route
- [ ] Both model routes cover invalid inputs and fallback behavior
- [ ] Global `npm run test:coverage` reaches at least 82% statements / lines after Tasks 6.01–6.03

