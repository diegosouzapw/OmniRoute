# Task 6.08 — Route Edge Cases + Token Refresh

## Metadata
- **Phase**: 6 (90% push)
- **Target modules**:
  - `src/sse/services/tokenRefresh.ts` (30.19% → 75%+)
  - `src/app/api/keys/route.ts` (49.52% → 80%+)
  - `src/app/api/settings/proxy/route.ts` (51.27% → 80%+)
  - `src/app/api/v1/management/proxies/route.ts` (40.39% → 75%+)
- **Test files to extend/create**:
  - `tests/unit/token-refresh-route-service.test.mjs`
  - `tests/integration/api-keys.test.mjs`
  - `tests/integration/api-routes-critical.test.mjs`
  - `tests/unit/proxy-management-v1-route.test.mjs`
- **Estimated assertions**: ~26

## Pre-requisites
1. Read the target routes and `src/sse/services/tokenRefresh.ts`
2. Reuse existing request/response harnesses instead of building new route wrappers
3. Measure branch deltas after each route extension

## Focus Areas
- Refresh-required vs refresh-failed branches
- Validation failures, malformed query params, and missing body fields
- Auth denied vs auth missing distinctions
- Edge pagination, empty datasets, and write-path validation

## Acceptance Criteria
- [ ] `tokenRefresh.ts` no longer sits below 40% lines
- [ ] Critical route suites cover auth, validation, and empty-state branches
- [ ] `src/app/api/` improves toward 70%+ lines and 60%+ branches overall

