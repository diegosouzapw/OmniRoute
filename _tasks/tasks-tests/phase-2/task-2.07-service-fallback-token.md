# Task 2.07 — Test: Account Fallback + Token Refresh

## Metadata
- **Phase**: 2
- **Source files**: `open-sse/services/accountFallback.ts` (771 LoC), `open-sse/services/tokenRefresh.ts`
- **Test files to create**: `tests/unit/account-fallback-service.test.mjs`, `tests/unit/token-refresh-service.test.mjs`
- **Estimated assertions**: ~25

## Pre-requisites
1. Read both source files
2. Read: `open-sse/services/accountSelector.ts`

## Test Scenarios

### accountFallback.ts (~15 tests)
```
1. Single account success → no fallback
2. First account fails → try next account
3. All accounts fail → propagate last error
4. Account marked as errored → skipped
5. Rate limited account → skip with retry-after
6. Account recovery after cool-down
7. Account exclusion (excludeConnectionId)
8. Account priority ordering
9. Max retry limit enforcement
10. Error type classification for retry decision
11. 429 → retry with backoff
12. 500+ → retry
13. 400 → don't retry (client error)
14. 401/403 → mark account as failed, try next
15. AbortSignal → stop all retries
```

### tokenRefresh.ts (~10 tests)
```
1. Valid refresh token → new access token
2. Expired refresh token → error
3. Deduplication: concurrent refresh for same connection → single call
4. Different connections → separate refresh calls
5. OAuth provider-specific refresh
6. Error during refresh → propagated
7. Refresh cache cleanup
8. Rate limit on token refresh endpoint
9. Refresh with provider-specific data
10. Null/missing refresh token → return null
```

## Acceptance Criteria
- [ ] All 25 assertions pass
- [ ] accountFallback coverage ≥ 75%
- [ ] tokenRefresh coverage ≥ 80%
