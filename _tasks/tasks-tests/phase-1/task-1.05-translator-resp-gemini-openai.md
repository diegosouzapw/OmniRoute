# Task 1.05 — Test: Gemini → OpenAI Response Translator

## Metadata
- **Phase**: 1 (Translators + Executors)
- **Priority**: P0 — Critical path
- **Source file**: `open-sse/translator/response/gemini-to-openai.ts` (281 LoC)
- **Test file to create**: `tests/unit/translator-resp-gemini-to-openai.test.mjs`
- **Framework**: Node.js `node:test` + `assert`
- **Current coverage**: ~47.21% (translator/response directory)
- **Estimated assertions**: ~25

## Pre-requisites
1. Read: `open-sse/translator/response/gemini-to-openai.ts`
2. Read: `open-sse/handlers/responseTranslator.ts` (how response translators are invoked)
3. Understand SSE streaming format: each chunk is `data: {...}\n\n`

## Context

Converts Gemini `generateContent` / `streamGenerateContent` responses into OpenAI Chat Completions format. Handles both streaming (SSE) and non-streaming responses.

Key transformations:
- `candidates[].content.parts[]` → `choices[].message.content` (non-stream) or `choices[].delta` (stream)
- `candidates[].finishReason` → `choices[].finish_reason` mapping
- `usageMetadata` → `usage { prompt_tokens, completion_tokens, total_tokens }`
- `functionCall` parts → `tool_calls`
- `inlineData` parts → `image_url` content blocks
- Thinking/thought parts handling

## Test Scenarios

### Group 1: Non-Streaming Response
```
1. Single candidate with text → choices[0].message.content
2. Multiple candidates → multiple choices
3. finishReason "STOP" → "stop"
4. finishReason "MAX_TOKENS" → "length"
5. finishReason "SAFETY" → "content_filter"
6. usageMetadata → usage object mapping
7. Empty candidates array
```

### Group 2: Streaming Response (SSE chunks)
```
8. First chunk with role → delta.role = "assistant"
9. Text delta → delta.content
10. Final chunk with finishReason → finish_reason set
11. Usage chunk at end of stream
12. Multiple sequential text chunks
13. Empty text delta handling
```

### Group 3: Tool Calls
```
14. functionCall part → tool_calls[0] { id, type: "function", function: { name, arguments } }
15. Multiple function calls in response
16. Function call in streaming mode (chunked arguments)
17. Function call name extraction
18. Arguments serialization (object → JSON string)
```

### Group 4: Multimodal Response
```
19. inlineData (image) → image_url content block with data URI
20. Mixed text + inlineData parts
21. Multiple images in response
```

### Group 5: Edge Cases
```
22. Gemini safety block (no candidates, promptFeedback)
23. Malformed response (missing parts)
24. Response with thinking/thought parts (strip or include based on config)
25. Response ID generation (chatcmpl-xxx format)
```

## Acceptance Criteria
- [ ] All 25 assertions pass
- [ ] `node --import tsx/esm --test tests/unit/translator-resp-gemini-to-openai.test.mjs`
- [ ] Covers both streaming and non-streaming paths
- [ ] Coverage of `gemini-to-openai.ts` (response) reaches ≥ 80%
