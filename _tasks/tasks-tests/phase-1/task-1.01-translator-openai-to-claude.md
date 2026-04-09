# Task 1.01 — Test: OpenAI → Claude Request Translator

## Metadata
- **Phase**: 1 (Translators + Executors)
- **Priority**: P0 — Critical path
- **Source file**: `open-sse/translator/request/openai-to-claude.ts` (566 LoC)
- **Test file to create**: `tests/unit/translator-openai-to-claude.test.mjs`
- **Framework**: Node.js `node:test` + `assert`
- **Current coverage**: ~45.88% (translator/request directory)
- **Estimated assertions**: ~40

## Pre-requisites
1. Read the source file: `open-sse/translator/request/openai-to-claude.ts`
2. Read the helper: `open-sse/translator/helpers/claudeHelper.ts`
3. Check existing test patterns: `tests/unit/openai-to-claude-strip-empty.test.mjs`
4. Understand the translator registry: `open-sse/translator/registry.ts`

## Context

This translator converts OpenAI Chat Completions API format into Anthropic Messages API format. It is invoked when a client sends OpenAI-format requests and the target provider is Claude/Anthropic.

Key transformations:
- `messages[].role` mapping (system → system block, user/assistant preserved)
- `messages[].content` array → Anthropic content blocks (text, image, tool_use, tool_result)
- `tools[]` → Anthropic tool definitions with `input_schema`
- `tool_calls` → `tool_use` content blocks
- `max_tokens` / `max_completion_tokens` normalization
- `temperature`, `top_p`, `stop` passthrough
- `stream` flag handling
- `cache_control` preservation (when enabled)
- `thinking` / `budget_tokens` mapping
- Developer role handling

## Test Scenarios

### Group 1: Basic Message Translation
```
1. Simple text message (user) → Anthropic format
2. System message extraction → top-level `system` field
3. Multi-turn conversation (user → assistant → user)
4. Empty content handling (should filter or convert)
5. String content vs array content normalization
```

### Group 2: Content Block Types
```
6. Text content block → { type: "text", text: "..." }
7. Image URL (base64) → { type: "image", source: { type: "base64", ... } }
8. Image URL (http) → { type: "image", source: { type: "url", url: "..." } }
9. Multiple content blocks in single message
10. Empty text blocks should be filtered (Anthropic rejects them)
```

### Group 3: Tool Handling
```
11. OpenAI tools[] → Anthropic tools[] with input_schema
12. Tool function name mapping (with proxy_ prefix when enabled)
13. Tool function name mapping (without prefix when _disableToolPrefix)
14. tool_calls in assistant message → tool_use content blocks
15. tool message → tool_result content blocks
16. Tool call ID preservation
17. Multiple tool calls in single message
```

### Group 4: Parameters
```
18. max_tokens passthrough
19. max_completion_tokens → max_tokens conversion
20. temperature passthrough
21. top_p passthrough  
22. stop sequences passthrough
23. stream flag passthrough
24. response_format handling
```

### Group 5: Advanced Features
```
25. cache_control preservation on messages (when preserveCacheControl=true)
26. cache_control stripping (when preserveCacheControl=false)
27. thinking/reasoning block handling
28. budget_tokens mapping
29. developer role → system message handling (when preserveDeveloperRole=true)
30. developer role → user message fallback (when preserveDeveloperRole=false)
```

### Group 6: Edge Cases
```
31. Empty messages array
32. Messages with name="" field (should strip)
33. Mixed content types in single message
34. Very large message array (performance)
35. Unknown content type handling (graceful degradation)
36. Anthropic beta header injection
37. _toolNameMap generation for response translation
38. Redacted thinking blocks (should be stripped)
39. null/undefined content handling
40. Tool with empty parameters schema
```

## Test Structure Template

```javascript
import { describe, it } from "node:test";
import assert from "node:assert/strict";

// Import the translator function directly
// Use dynamic import to handle ESM/CJS boundaries
const { translateOpenAIToClaude } = await import(
  "../../open-sse/translator/request/openai-to-claude.ts"
);

describe("OpenAI → Claude Request Translator", () => {
  describe("Basic Message Translation", () => {
    it("should convert simple user text message", () => {
      const input = {
        messages: [{ role: "user", content: "Hello" }],
        model: "claude-4-sonnet",
      };
      const result = translateOpenAIToClaude(input, "claude-4-sonnet", true);
      assert.ok(result.messages);
      assert.equal(result.messages[0].role, "user");
      // ... validate structure
    });
    // ... more tests
  });
});
```

## Acceptance Criteria
- [ ] All 40 assertions pass
- [ ] Test file runs: `node --import tsx/esm --test tests/unit/translator-openai-to-claude.test.mjs`
- [ ] No external API calls (pure unit test)
- [ ] Coverage of `openai-to-claude.ts` reaches ≥ 80% statements
- [ ] Test follows existing naming conventions in `tests/unit/`
