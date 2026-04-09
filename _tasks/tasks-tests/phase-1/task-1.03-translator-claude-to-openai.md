# Task 1.03 — Test: Claude → OpenAI Request Translator

## Metadata
- **Phase**: 1 (Translators + Executors)
- **Priority**: P0 — Critical path
- **Source file**: `open-sse/translator/request/claude-to-openai.ts`
- **Test file to create**: `tests/unit/translator-claude-to-openai.test.mjs`
- **Framework**: Node.js `node:test` + `assert`
- **Current coverage**: ~45.88% (translator/request directory)
- **Estimated assertions**: ~30

## Pre-requisites
1. Read: `open-sse/translator/request/claude-to-openai.ts`
2. Read: `open-sse/translator/helpers/openaiHelper.ts` (VALID_OPENAI_CONTENT_TYPES)
3. Check existing: `tests/unit/openai-to-claude-strip-empty.test.mjs`

## Context

This translator reverses the Claude Messages API format back to OpenAI Chat Completions. Used when Claude Code or Anthropic-native clients talk to OpenAI/Gemini providers through OmniRoute.

Key transformations:
- `system` (top-level string/blocks) → messages[0] with role "system"
- Content blocks (text, image, tool_use, tool_result) → OpenAI equivalents
- `tool_use` → `tool_calls` in assistant message
- `tool_result` → tool role message
- Anthropic `usage` → OpenAI `usage` mapping

## Test Scenarios

### Group 1: Message Mapping
```
1. User text block → messages[].content (string)
2. User multi-block → messages[].content (array)
3. Assistant text → assistant message
4. System string → system role message
5. System content blocks → system message text extraction
6. Multi-turn conversation preservation
```

### Group 2: Content Block Conversion
```
7. { type: "text" } → { type: "text", text: "..." }
8. { type: "image", source: { type: "base64" } } → { type: "image_url", image_url: { url: "data:..." } }
9. { type: "image", source: { type: "url" } } → { type: "image_url", image_url: { url: "..." } }
10. Multiple blocks in one message
11. cache_control preservation on text blocks
12. Thinking/redacted_thinking block handling
```

### Group 3: Tool Handling
```
13. tool_use blocks → tool_calls array on assistant message
14. tool_use id/name/input → tool_call id/function.name/function.arguments
15. tool_result blocks → tool role message
16. tool_result with multiple content blocks → text extraction
17. tool_result is_error flag handling
18. Nested tool_use/tool_result chain
```

### Group 4: Parameter Mapping
```
19. max_tokens → max_tokens passthrough
20. temperature → temperature passthrough
21. top_p → top_p passthrough
22. stop_sequences → stop conversion
23. stream passthrough
24. model passthrough
```

### Group 5: Edge Cases
```
25. Empty messages array
26. Message with empty content array
27. Unknown block types (graceful skip)
28. Messages with signature fields (strip)
29. Messages with cache_control (preserve vs strip based on config)
30. Tool with JSON string arguments (parse safety)
```

## Acceptance Criteria
- [ ] All 30 assertions pass
- [ ] `node --import tsx/esm --test tests/unit/translator-claude-to-openai.test.mjs`
- [ ] No external API calls
- [ ] Coverage of `claude-to-openai.ts` reaches ≥ 80%
