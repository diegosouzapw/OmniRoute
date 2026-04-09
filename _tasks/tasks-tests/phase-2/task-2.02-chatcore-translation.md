# Task 2.02 — Test: chatCore.ts — Translation Paths

## Metadata
- **Phase**: 2
- **Source file**: `open-sse/handlers/chatCore.ts` — lines 783-1004 (translation selection logic)
- **Test file to create**: `tests/unit/chatcore-translation-paths.test.mjs`
- **Framework**: Node.js `node:test` + `assert`
- **Estimated assertions**: ~25

## Pre-requisites
1. Read: chatCore.ts lines 783-1004
2. Read: `open-sse/services/claudeCodeCompatible.ts`
3. Read: `open-sse/utils/cacheControlPolicy.ts`

## Test Scenarios

### Translation Path Selection
```
1. nativeCodexPassthrough → body with _nativeCodexPassthrough flag
2. isClaudeCodeCompatible provider → buildClaudeCodeCompatibleRequest
3. Claude passthrough + preserveCacheControl → raw passthrough with _disableToolPrefix
4. Claude passthrough without cache preservation → double-translate (claude→openai→claude)
5. Default path → translateRequest(sourceFormat, targetFormat)
6. Claude target → _disableToolPrefix set
7. Empty text content stripping for Anthropic targets
```

### Post-Translation Processing
```
8. translatedBody.model set to effectiveModel
9. Unsupported params stripped for reasoning models (getUnsupportedParams)
10. Provider max_tokens cap applied (PROVIDER_MAX_TOKENS)
11. max_tokens exceeds provider cap → capped
12. max_completion_tokens exceeds provider cap → capped
13. _toolNameMap extraction and cleanup
14. _disableToolPrefix cleanup
```

### Translation Error Handling
```
15. Translation throws with statusCode → appropriate HTTP status
16. Translation throws with errorType → error response with type
17. Translation throws generic error → 500
```

### Executor Resolution
```
18. Default provider → native executor
19. Upstream proxy mode="cliproxyapi" → CLIProxyAPI executor
20. Upstream proxy mode="fallback" → wrapper with retry logic
21. Upstream proxy mode="native" → native unchanged
```

### Cache Control Policy
```
22. Cache control mode "auto" → context-dependent
23. Cache control mode "always" → always preserve
24. Claude Code user-agent → preserve cache
25. Non-Claude provider → strip cache_control
```

## Acceptance Criteria
- [ ] All 25 assertions pass
- [ ] Translation path selection fully covered
- [ ] Error handling branches covered
