# Task 1.04 — Test: Remaining Request Translators

## Metadata
- **Phase**: 1 (Translators + Executors)
- **Priority**: P1
- **Source files**:
  - `open-sse/translator/request/claude-to-gemini.ts`
  - `open-sse/translator/request/openai-to-cursor.ts`
  - `open-sse/translator/request/openai-to-kiro.ts`
  - `open-sse/translator/request/antigravity-to-openai.ts`
  - `open-sse/translator/request/openai-responses.ts`
  - `open-sse/translator/request/gemini-to-openai.ts`
- **Test files to create**:
  - `tests/unit/translator-claude-to-gemini.test.mjs`
  - `tests/unit/translator-openai-to-cursor.test.mjs`
  - `tests/unit/translator-openai-to-kiro.test.mjs`
  - `tests/unit/translator-antigravity-to-openai.test.mjs`
  - `tests/unit/translator-openai-responses-req.test.mjs`
  - `tests/unit/translator-gemini-to-openai.test.mjs`
- **Framework**: Node.js `node:test` + `assert`
- **Estimated assertions**: ~60 (10 per file)

## Pre-requisites
1. Read each source file listed above
2. Read `open-sse/translator/registry.ts` to understand how translators are registered
3. Read `open-sse/translator/formats.ts` for format constants

## Context

These are secondary translators that handle less-common format conversions. While individually less trafficked than the main OpenAI↔Claude↔Gemini triangle, they collectively represent significant uncovered code.

## Test Scenarios per File

### claude-to-gemini.ts (~10 tests)
```
1. Claude messages → Gemini contents
2. System block → systemInstruction
3. Image content → inlineData
4. Tool use → functionCall
5. Tool result → functionResponse
6. Max tokens mapping
7. Temperature/top_p mapping
8. Safety settings injection
9. Thinking blocks handling
10. Empty messages edge case
```

### openai-to-cursor.ts (~10 tests)
```
1. Basic message → Cursor protobuf-compatible format
2. Model name mapping
3. Tool calls preservation
4. Stream flag handling
5. System message handling
6. User-Agent header injection
7. Cursor-specific fields (checksum, machine-id)
8. Multi-part content blocks
9. Empty tools array handling
10. Response format passthrough
```

### openai-to-kiro.ts (~10 tests)
```
1. Basic message conversion to Kiro format
2. System message handling
3. Tool declarations mapping
4. Max tokens → Kiro format
5. Stream flag
6. Model name passthrough
7. Content array normalization
8. Image URL handling
9. Temperature/top_p
10. Edge case: empty messages
```

### antigravity-to-openai.ts (~10 tests)
```
1. Antigravity content blocks → OpenAI format
2. Image handling (Antigravity uses inline base64)
3. Tool use → tool_calls conversion
4. Thinking blocks extraction
5. System instruction → system message
6. Multi-turn conversation
7. Model name passthrough
8. Generation config → OpenAI params
9. Safety response handling
10. Request ID generation
```

### openai-responses.ts (~10 tests)
```
1. Responses API input → Chat Completions messages
2. input_text → user message
3. input_image → image_url content block
4. input_audio handling
5. previous_response_id handling
6. instructions → system message
7. tools mapping
8. Multiple input items
9. Conversation context building
10. Edge case: minimal input
```

### gemini-to-openai.ts (~10 tests)
```
1. Gemini contents → OpenAI messages
2. model role → assistant
3. inlineData → image_url
4. functionCall parts → tool_calls
5. functionResponse → tool message
6. systemInstruction → system message
7. Parts with only text
8. Multi-part content (text + image)
9. Safety ratings handling
10. Usage stats mapping
```

## Acceptance Criteria
- [ ] All 6 test files created and passing
- [ ] ~60 total assertions pass
- [ ] Each file runs independently with `node --import tsx/esm --test`
- [ ] No external API calls
- [ ] Combined translator/request coverage reaches ≥ 75%
