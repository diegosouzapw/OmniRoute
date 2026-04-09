# Task 2.01 — Test: chatCore.ts — Input Sanitization

## Metadata
- **Phase**: 2 (Handlers + Services)
- **Priority**: P0
- **Source file**: `open-sse/handlers/chatCore.ts` (2,249 LoC) — lines 716-990 (sanitization block)
- **Test file to create**: `tests/unit/chatcore-sanitization.test.mjs`
- **Framework**: Node.js `node:test` + `assert`
- **Current coverage**: 50.97%
- **Estimated assertions**: ~35

## Pre-requisites
1. Read: `open-sse/handlers/chatCore.ts` lines 716-990
2. Check existing tests: `tests/unit/empty-tool-name-loop.test.mjs`, `tests/unit/tool-request-sanitization.test.mjs`

## Context

chatCore.ts is the central request handler (2,249 lines). The sanitization block runs BEFORE translation and applies to ALL request paths. This task covers the input sanitization logic only.

## Test Scenarios

### Group 1: max_output_tokens Normalization (#994)
```
1. max_output_tokens present, max_tokens absent → copy to max_tokens, delete original
2. max_output_tokens present, max_tokens already set → keep max_tokens, delete max_output_tokens
3. Neither present → no change
4. max_output_tokens = 0 → still copies (valid value)
```

### Group 2: Empty Name Stripping (#291)
```
5. messages[].name === "" → name field removed
6. messages[].name === "valid" → preserved
7. input[].name === "" → name field removed
8. No name field → unchanged
```

### Group 3: Empty Tool Name Filtering (#346/#637)
```
9. tools[] with empty function.name → filtered out
10. tools[] with valid function.name → preserved
11. tools[] with whitespace-only name → filtered out
12. Empty tools array → empty array preserved
13. No tools field → unchanged
```

### Group 4: Content Block Normalization (#409)
```
14. type="text" → passed through
15. type="image_url" → passed through
16. type="image" → passed through
17. type="file_url" with data URL → passed through for translator
18. type="file" with text content only → extracted to text block
19. type="file" with data URL → passed through
20. type="document" with data URL → passed through
21. type="document" with text only → extracted to text block
22. type="tool_result" → converted to text block (#527)
23. Unknown type → dropped with warning
```

### Group 5: Empty Text Block Stripping
```
24. { type: "text", text: "" } → filtered out
25. { type: "text", text: "valid" } → preserved
26. Array with mixed empty/valid → only empty removed
```

### Group 6: Stream Flag Resolution
```
27. stream: true → true
28. stream: false → false
29. stream: undefined + Accept: text/event-stream → true
30. stream: undefined + Accept: application/json → false
```

### Group 7: Memory Injection
```
31. Memory enabled + memories found → injected into body
32. Memory disabled → no injection
33. Memory retrieval error → gracefully skipped
34. No API key info → skip memory
35. shouldInjectMemory returns false → skip
```

## Testing Approach

Import and call `handleChatCore` with mocked dependencies (credentials, log, etc.). Use `mock.fn()` for database calls and memory functions.

## Acceptance Criteria
- [ ] All 35 assertions pass
- [ ] chatCore.ts sanitization section reaches ≥ 85% coverage
- [ ] No external calls
