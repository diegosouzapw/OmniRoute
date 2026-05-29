✅ **Review fixes applied** (commit: fix(auto): address PR #2131 review issues)

**Issue A — OAuth expiry for ISO strings**
- Fixed `virtualFactory.ts` to handle both timestamp numbers and ISO strings properly using `new Date().getTime()`.

**Issue B — Test file in wrong location**
- Moved `AutoRoutingBanner.test.tsx` from `src/shared/components/` → `tests/unit/shared/components/`
- Updated `vitest.config.ts` to include `tests/unit/**/*.test.tsx` pattern so the test runs.
- Fixed imports in test to use `@/shared/components/AutoRoutingBanner`.

**Issue C — Mock data in analytics**
- Removed `mockMetrics` from `/api/analytics/auto-routing` endpoint.
- Returns only real DB query results (totalRequests, variantBreakdown, topProviders).
- Error handler also returns zeros only for those fields.

**Issue D — Error handling in chat.ts**
- Changed condition from `autoVariant !== undefined && combo === null` to `isAutoRouting && combo === null`.
- Bare `auto` now routes correctly even if `parseAutoPrefix` fails or returns invalid.

All tests pass (4155/4155). TypeScript clean. Ready for re-review.
