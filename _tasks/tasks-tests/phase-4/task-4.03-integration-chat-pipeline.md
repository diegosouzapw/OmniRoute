# Task 4.03 — Test: Chat Pipeline Integration

## Metadata
- **Phase**: 4 (Integration)
- **Test file to create**: `tests/integration/chat-pipeline.test.mjs`
- **Framework**: Node.js `node:test` + `assert`
- **Estimated assertions**: ~20

## Pre-requisites
1. Read: `src/sse/handlers/chat.ts` (entry point)
2. Read: `open-sse/handlers/chatCore.ts` (core processing)
3. Read: `open-sse/executors/base.ts`, `open-sse/executors/default.ts`
4. Read: `open-sse/translator/registry.ts`
5. Check existing: `tests/integration/proxy-pipeline.test.mjs`

## Context

This tests the full chat completion pipeline end-to-end with mocked upstream providers. The flow is:

```
Request → Parse → Auth → Format Detection → Translation → Execution → Response Translation → Response
```

## Test Scenarios

### Happy Path
```
1. OpenAI format → OpenAI provider (passthrough): request in, response out
2. OpenAI format → Claude provider: request translated, response translated back  
3. OpenAI format → Gemini provider: full round-trip translation
4. Claude format → OpenAI provider: reverse translation
5. Streaming request → streaming response with correct SSE format
6. Non-streaming request → JSON response
```

### Auth Pipeline
```
7. Valid API key → request proceeds
8. Invalid API key → 401
9. No auth header → use default combo
10. Registered key with noLog → no DB logging
```

### Error Handling
```
11. Upstream 429 → rate limit response with retry-after
12. Upstream 500 → error response
13. Upstream timeout → 504
14. Invalid request body → 400
15. No available provider → 503
```

### Feature Integration
```
16. Memory injection (mocked) → messages augmented
17. Skills interception (mocked) → skill response
18. Combo routing → provider selected per strategy
19. Account fallback on first failure → second account success
20. Request dedup → concurrent identical requests deduplicated
```

## Testing Approach

Mock `globalThis.fetch` to simulate upstream provider responses. Use temp DB for auth/combo state. Import `handleChat` directly and call with constructed Request objects.

## Acceptance Criteria
- [ ] All 20 assertions pass
- [ ] Full pipeline exercised without real HTTP calls
- [ ] Memory and skills paths tested (mocked)
