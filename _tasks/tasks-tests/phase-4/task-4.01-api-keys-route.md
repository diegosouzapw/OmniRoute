# Task 4.01 — Test: API Keys Route

## Metadata
- **Phase**: 4 (API Routes)
- **Source files**: `src/app/api/keys/route.ts`, `src/app/api/keys/[id]/route.ts`, `src/app/api/keys/[id]/reveal/route.ts`
- **Test file to create**: `tests/integration/api-keys.test.mjs`
- **Framework**: Node.js `node:test` + `assert`
- **Current coverage**: 35.21%
- **Estimated assertions**: ~20

## Pre-requisites
1. Read each route file
2. Read: `src/lib/db/apiKeys.ts` (data layer)
3. Read: `src/lib/api/requireManagementAuth.ts` (auth middleware)
4. Check existing auth test patterns

## Test Scenarios

### CRUD Operations
```
1. POST /api/keys — create key with name → 201 with generated key
2. GET /api/keys — list all keys → 200 with array
3. GET /api/keys/[id] — get specific key → 200 (masked)
4. DELETE /api/keys/[id] — revoke key → 200
5. GET /api/keys/[id]/reveal — reveal full key → 200 (unmasked)
```

### Validation
```
6. POST without name → 400
7. GET invalid ID → 404
8. DELETE non-existent key → 404
```

### Auth
```
9. Unauthenticated request → 401
10. Invalid management token → 403
```

### noLog Feature
```
11. Create key with noLog=true → noLog flag persisted
12. Key with noLog → requests not logged
```

### Edge Cases
```
13. Duplicate key name (if enforced)
14. Very long key name → validation error
15. Special characters in name → handled
16. Pagination for key list
17. Rate limit on key creation
18. Key format validation
19. Expired key handling
20. Concurrent key operations
```

## Testing Approach

Use temp DB + direct route function calls (import the route handlers and invoke with mock Request objects) or use the integration test pattern with real HTTP calls to local server.

## Acceptance Criteria
- [ ] All 20 assertions pass
- [ ] /api/keys/ coverage reaches ≥ 70%
