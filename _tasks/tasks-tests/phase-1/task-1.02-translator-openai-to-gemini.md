# Task 1.02 — Test: OpenAI → Gemini Request Translator

## Metadata
- **Phase**: 1 (Translators + Executors)
- **Priority**: P0 — Critical path
- **Source file**: `open-sse/translator/request/openai-to-gemini.ts` (584 LoC)
- **Test file to create**: `tests/unit/translator-openai-to-gemini.test.mjs`
- **Framework**: Node.js `node:test` + `assert`
- **Current coverage**: ~45.88% (translator/request directory)
- **Estimated assertions**: ~45

## Pre-requisites
1. Read: `open-sse/translator/request/openai-to-gemini.ts`
2. Read: `open-sse/translator/helpers/geminiHelper.ts` (convertOpenAIContentToParts, cleanJSONSchemaForAntigravity, DEFAULT_SAFETY_SETTINGS)
3. Read: `open-sse/translator/helpers/maxTokensHelper.ts`
4. Check existing tests: `tests/unit/t16-gemini-enum-type-string.test.mjs`, `tests/unit/t43-gemini-tool-call-no-thought-signature.test.mjs`

## Context

This translator converts OpenAI Chat Completions API format into Google Gemini API format (`generateContent`/`streamGenerateContent`). Key differences from OpenAI:
- Messages become `contents[]` with `parts[]`
- System message → `systemInstruction`
- Tools → `tools[].functionDeclarations[]` with Gemini-compatible JSON Schema
- Images become `inlineData` with `mimeType` + base64 `data`
- PDF/files also become `inlineData` (fix from issue #993)
- Safety settings injection
- Response format → `generationConfig.responseMimeType`

## Test Scenarios

### Group 1: Message Conversion
```
1. Simple user text → contents[0].parts[0].text
2. System message → systemInstruction.parts[0].text
3. Multi-turn user/model mapping (assistant → model role)
4. Multiple system messages merged into single systemInstruction
5. Empty message content handling
6. String vs array content normalization
```

### Group 2: Multimodal Content (Images + Files)
```
7. Image base64 data URL → inlineData { mimeType: "image/png", data: "..." }
8. Image JPEG base64 → correct mimeType extraction
9. PDF base64 data URL → inlineData { mimeType: "application/pdf", data: "..." }
10. file_url type with data URL → inlineData conversion
11. document type with data URL → inlineData conversion
12. Mixed text + image content → multiple parts
13. HTTP image URL handling (non-base64)
14. Invalid data URL format (graceful degradation)
```

### Group 3: Tool Declarations
```
15. OpenAI tools[] → Gemini functionDeclarations[]
16. Tool parameter schema cleaning (remove unsupported keywords)
17. anyOf/oneOf flattening in tool schemas
18. allOf merging in tool schemas
19. Enum values converted to strings
20. Integer enum removal (Gemini doesn't support)
21. Empty object schema → placeholder property
22. const → enum conversion
23. Type array flattening (["string", "null"] → "string")
24. Nested schema cleaning (recursive)
```

### Group 4: Generation Config
```
25. temperature passthrough → generationConfig.temperature
26. top_p passthrough → generationConfig.topP
27. max_tokens → generationConfig.maxOutputTokens
28. max_completion_tokens → generationConfig.maxOutputTokens
29. stop sequences → generationConfig.stopSequences
30. response_format "json_object" → responseMimeType "application/json"
31. response_format "json_schema" → responseMimeType + responseSchema
32. response_format schema cleaning for Gemini API
```

### Group 5: Safety Settings
```
33. Default safety settings injection (all categories → OFF)
34. Custom safety settings preservation if provided
35. Safety settings structure validation
```

### Group 6: Advanced Features
```
36. Tool results (tool role) → functionResponse parts
37. tool_call_id mapping in function responses
38. thinking/reasoning blocks handling
39. Gemini thinking config (thinkingConfig.thinkingBudget)
40. Request ID generation
```

### Group 7: Edge Cases
```
41. Empty messages array → valid Gemini request
42. Messages with only system → valid systemInstruction
43. Very large base64 data handling
44. Unicode text in messages
45. Null parts/content values (defensive)
```

## Acceptance Criteria
- [ ] All 45 assertions pass
- [ ] Test file runs: `node --import tsx/esm --test tests/unit/translator-openai-to-gemini.test.mjs`
- [ ] No external API calls
- [ ] Coverage of `openai-to-gemini.ts` reaches ≥ 80% statements
- [ ] Also exercises `geminiHelper.ts` functions (convertOpenAIContentToParts, cleanJSONSchemaForAntigravity)
