# Task 2.05 — Test: Search, SSE Parser, Response Sanitizer

## Metadata
- **Phase**: 2
- **Source files**: `open-sse/handlers/search.ts`, `open-sse/handlers/sseParser.ts`, `open-sse/handlers/responseSanitizer.ts`
- **Test files to create**: `tests/unit/search-handler-extended.test.mjs`, `tests/unit/sse-parser.test.mjs`, `tests/unit/response-sanitizer.test.mjs`
- **Estimated assertions**: ~30

## Pre-requisites
1. Read each source file
2. Check existing: `tests/unit/search-provider-validation.test.mjs`, `tests/unit/search-registry.test.mjs`

## Test Scenarios

### search.ts (~12 tests)
```
1-4. Multi-provider dispatch (Perplexity, Serper, Brave, Exa, Tavily)
5. Result normalization to unified format
6. Query validation
7. Max results parameter
8. Image URL extraction
9. Source citation formatting
10. Error: no search provider configured
11. Usage tracking for search requests
12. Streaming search results
```

### sseParser.ts (~10 tests)
```
1. Parse single SSE event (data: {...})
2. Parse multiple events separated by double newline
3. Event with id field
4. Event with event field (type)
5. data: [DONE] marker detection
6. Chunked data across multiple buffers
7. Empty lines handling
8. UTF-8 multi-byte characters
9. Malformed SSE (missing data: prefix)
10. Edge: very large payload
```

### responseSanitizer.ts (~8 tests)
```
1. Clean response passthrough
2. Strip sensitive fields from response
3. Content filtering for safety
4. HTML sanitization in content
5. DOMPurify integration
6. Error response passthrough
7. Streaming chunk sanitization
8. Edge: empty content
```

## Acceptance Criteria
- [ ] All 30 assertions pass
- [ ] handlers/ coverage reaches ≥ 70%
