# Task 1.06 — Test: Claude → OpenAI Response Translator

## Metadata
- **Phase**: 1
- **Source file**: `open-sse/translator/response/claude-to-openai.ts`
- **Test file to create**: `tests/unit/translator-resp-claude-to-openai.test.mjs`
- **Framework**: Node.js `node:test` + `assert`
- **Estimated assertions**: ~25

## Pre-requisites
1. Read: `open-sse/translator/response/claude-to-openai.ts`
2. Understand Anthropic Messages API response format

## Context

Converts Anthropic streaming/non-streaming responses to OpenAI Chat Completions format. Handles the complex event-based streaming protocol of Claude (message_start, content_block_start, content_block_delta, message_delta, message_stop).

## Test Scenarios

### Group 1: Non-Streaming
```
1. Claude message response → OpenAI choices[0].message
2. Text content blocks → concatenated content string
3. stop_reason "end_turn" → finish_reason "stop"
4. stop_reason "max_tokens" → finish_reason "length"
5. Usage mapping (input_tokens, output_tokens)
6. Model name passthrough
```

### Group 2: Streaming Events
```
7. message_start event → initial chunk with role
8. content_block_start (text) → delta start
9. content_block_delta (text_delta) → delta.content
10. content_block_start (tool_use) → tool_calls chunk
11. content_block_delta (input_json_delta) → tool args streaming
12. content_block_stop → finalize block
13. message_delta (stop_reason) → finish_reason chunk
14. message_stop → [DONE] marker
```

### Group 3: Tool Calls
```
15. tool_use content block → tool_calls array
16. Multiple tool_use blocks → multiple tool_calls
17. Tool name reverse mapping (toolNameMap for proxy_ prefix)
18. Tool call ID preservation
19. Arguments object → JSON string serialization
```

### Group 4: Advanced
```
20. Thinking blocks → appropriate handling
21. Redacted thinking → strip from output
22. Cache usage in response (cache_creation/cache_read)
23. Token-level usage tracking
```

### Group 5: Edge Cases
```
24. Error response from Claude (error event type)
25. Empty content blocks
```

## Acceptance Criteria
- [ ] All 25 assertions pass
- [ ] Coverage of `claude-to-openai.ts` (response) ≥ 80%
