# Task 3.08 — Test: Prompt Injection Guard Middleware

## Metadata
- **Phase**: 3
- **Source file**: `src/middleware/promptInjectionGuard.ts` (118 LoC, 48.30% coverage)
- **Test file to create**: `tests/unit/prompt-injection-guard.test.mjs`
- **Framework**: Node.js `node:test` + `assert`
- **Estimated assertions**: ~15

## Pre-requisites
1. Read: `src/middleware/promptInjectionGuard.ts`
2. Understand: how this middleware is invoked in the request pipeline

## Context

This middleware inspects incoming request bodies for prompt injection patterns and blocks or flags suspicious content. It runs before the request reaches the chat handler.

## Test Scenarios

### Group 1: Detection
```
1. Clean input → passes through
2. Known injection pattern: "ignore your instructions" → blocked
3. Known injection pattern: "system: override" → blocked  
4. Known injection pattern: delimiter injection (```system) → blocked
5. Known injection pattern: "pretend you are" → blocked
6. Case-insensitive detection
7. Partial match (substring within valid text) → NOT blocked (avoid false positives)
```

### Group 2: Configuration
```
8. Guard enabled → active scanning
9. Guard disabled → passthrough everything
10. Custom patterns from settings
11. Threshold sensitivity configuration
```

### Group 3: Edge Cases
```
12. Empty body → pass
13. Non-string content (array, object) → handled gracefully
14. Very long input → performance within limits
15. Multi-language injection attempts (non-ASCII)
```

## Acceptance Criteria
- [ ] All 15 assertions pass
- [ ] middleware/ coverage reaches ≥ 80%
- [ ] Zero false positives on normal coding prompts
