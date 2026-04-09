# Task 2.03 — Test: usageExtractor + responsesHandler

## Metadata
- **Phase**: 2
- **Source files**: `open-sse/handlers/usageExtractor.ts`, `open-sse/handlers/responsesHandler.ts`
- **Test files to create**: `tests/unit/usage-extractor.test.mjs`, `tests/unit/responses-handler.test.mjs`
- **Estimated assertions**: ~25

## Pre-requisites
1. Read both source files
2. Read `open-sse/transformer/responsesTransformer.ts`
3. Check existing: `tests/unit/responses-translation-fixes.test.mjs`, `tests/unit/t19-codex-responses-empty-content.test.mjs`

## Test Scenarios

### usageExtractor.ts (~12 tests)
```
1. OpenAI usage format extraction (prompt_tokens, completion_tokens)
2. Claude usage format (input_tokens, output_tokens)
3. Gemini usageMetadata format
4. Streaming: accumulate usage from chunks
5. Non-streaming: single extraction
6. Missing usage field → defaults to 0
7. Cache usage (cache_creation_input_tokens, cache_read_input_tokens)
8. Thinking token usage
9. Total tokens calculation
10. Multiple providers format detection
11. Cost calculation from token counts
12. Edge: null/undefined usage
```

### responsesHandler.ts (~13 tests)
```
1. Basic Responses API request → Chat Completions transformation
2. Input items → messages conversion
3. instructions field → system message
4. Streaming mode delegation
5. Non-streaming mode delegation
6. Tool handling in Responses API format
7. Previous response context handling
8. Response format: output items construction
9. Error handling: invalid input
10. Model resolution
11. Store flag handling
12. Metadata passthrough
13. Edge: empty input array
```

## Acceptance Criteria
- [ ] Both test files pass
- [ ] ~25 assertions total
- [ ] usageExtractor coverage ≥ 80%
