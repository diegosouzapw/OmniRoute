# Task 1.07 — Test: Remaining Response Translators

## Metadata
- **Phase**: 1
- **Source files**:
  - `open-sse/translator/response/openai-to-claude.ts`
  - `open-sse/translator/response/gemini-to-claude.ts`
  - `open-sse/translator/response/cursor-to-openai.ts`
  - `open-sse/translator/response/kiro-to-openai.ts`
  - `open-sse/translator/response/openai-responses.ts`
  - `open-sse/translator/response/openai-to-antigravity.ts`
- **Test files to create**: One per source file in `tests/unit/`
- **Framework**: Node.js `node:test` + `assert`
- **Estimated assertions**: ~50 (8-10 per file)

## Pre-requisites
1. Read each source file
2. Understand the streaming SSE format used by each provider
3. Read `open-sse/translator/registry.ts` for response translator registration

## Test Scenarios per File

### openai-to-claude.ts (~8 tests)
```
1. OpenAI streaming delta → Claude content_block_delta
2. OpenAI finish_reason → Claude stop_reason
3. Tool calls → tool_use events
4. Usage → Claude usage format
5. Role mapping
6. Non-streaming conversion
7. Multiple choices handling
8. Error response passthrough
```

### gemini-to-claude.ts (~8 tests)
```
1. Gemini candidates → Claude message
2. Parts → content blocks
3. functionCall → tool_use
4. finishReason mapping
5. usageMetadata → usage
6. Safety block handling
7. Streaming conversion
8. Multi-part response
```

### cursor-to-openai.ts (~8 tests)
```
1. Cursor protobuf response → OpenAI format
2. Model name unmapping
3. Tool calls extraction
4. Streaming chunk handling
5. Content extraction from Cursor format
6. Usage mapping
7. Finish reason mapping
8. Error response handling
```

### kiro-to-openai.ts (~8 tests)
```
1. Kiro response → OpenAI format
2. Content extraction
3. Usage mapping
4. Finish reason mapping
5. Streaming chunk conversion
6. Tool calls handling
7. Model passthrough
8. Edge case: empty response
```

### openai-responses.ts (~10 tests)
```
1. Chat Completions response → Responses API format
2. Streaming: delta → response events
3. Tool calls → tool_use output items
4. Finish reason → status mapping
5. Usage → response usage format
6. response_id generation
7. Output items construction
8. Conversation item generation
9. Multiple choices → output items
10. Error response mapping
```

### openai-to-antigravity.ts (~8 tests)
```
1. OpenAI format → Antigravity response
2. Content → parts conversion
3. Tool calls → function call format
4. Usage → Antigravity usage
5. Streaming delta conversion
6. Finish reason mapping
7. Model passthrough
8. Edge cases
```

## Acceptance Criteria
- [ ] All 6 test files created
- [ ] ~50 total assertions pass
- [ ] translator/response coverage reaches ≥ 75%
