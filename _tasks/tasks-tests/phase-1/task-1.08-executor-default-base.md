# Task 1.08 — Test: Default + Base Executors

## Metadata
- **Phase**: 1 (Translators + Executors)
- **Priority**: P0 — Every provider uses these
- **Source files**:
  - `open-sse/executors/base.ts` (core executor logic)
  - `open-sse/executors/default.ts` (extending base for most providers)
- **Test file to create**: `tests/unit/executor-default-base.test.mjs`
- **Framework**: Node.js `node:test` + `assert`
- **Current coverage**: ~40.76% (executors directory)
- **Estimated assertions**: ~40

## Pre-requisites
1. Read: `open-sse/executors/base.ts` — understand execute(), buildUrl(), buildHeaders(), transformRequest(), refreshCredentials()
2. Read: `open-sse/executors/default.ts` — understand overrides for each provider
3. Read: `open-sse/executors/index.ts` — executor factory/registry
4. Read: `open-sse/config/constants.ts` — PROVIDERS config objects

## Context

`BaseExecutor` is the abstract superclass for all provider executors. It handles the HTTP fetch call, streaming, error handling, retry logic, and credential refresh. `DefaultExecutor` extends it with provider-specific URL building and header construction.

Most providers (OpenAI, Claude, Gemini, Qwen, DashScope, HuggingFace, etc.) use `DefaultExecutor`. Only Cursor, Codex, GitHub, Vertex, etc. have custom executors.

## Test Scenarios

### Group 1: DefaultExecutor.buildUrl()
```
1. provider="gemini" → Gemini API URL with model and stream mode
2. provider="gemini" non-stream → `:generateContent`
3. provider="gemini" stream → `:streamGenerateContent?alt=sse`
4. provider="claude" → base URL with ?beta=true
5. provider="qwen" → portal.qwen.ai URL
6. provider="qwen" with custom resourceUrl → custom domain
7. provider starts with "openai-compatible-" → baseUrl + /chat/completions
8. provider "openai-compatible-" with custom chatPath → baseUrl + chatPath
9. provider "openai-compatible-responses" → /responses path
10. provider starts with "anthropic-compatible-" → baseUrl + /messages
11. provider "anthropic-compatible-" claude-code-compatible → CC URL
12. Default provider → config.baseUrl
```

### Group 2: DefaultExecutor.buildHeaders()
```
13. provider="gemini" with API key → x-goog-api-key header
14. provider="gemini" with OAuth → Authorization Bearer
15. provider="claude" with API key → x-api-key header
16. provider="claude" with OAuth → Authorization Bearer
17. provider="glm" → x-api-key
18. Default provider → Authorization Bearer
19. streaming=true → Accept: text/event-stream
20. anthropic-compatible → anthropic-version header
21. provider="qwen" with API key → strips X-Dashscope-* headers
22. provider="qwen" without API key (OAuth) → preserves X-Dashscope-* headers
23. Extra API keys rotation via getRotatingApiKey
24. Claude-code-compatible provider → CC headers
```

### Group 3: DefaultExecutor.transformRequest()
```
25. Default: passthrough body unchanged
26. Model name preservation (including "/" in model IDs)
```

### Group 4: DefaultExecutor.refreshCredentials()
```
27. With refresh token → calls getAccessToken
28. Without refresh token → returns null
29. Refresh error → returns null (logged, not thrown)
```

### Group 5: BaseExecutor.execute() Flow (mocked fetch)
```
30. Successful request → returns { response, url, headers, transformedBody }
31. Network error → throws with appropriate message
32. AbortSignal trigger → request aborted
33. Credential refresh on 401 → retry with new token
34. Upstream extra headers merged
35. Custom user-agent from credentials
```

### Group 6: Edge Cases
```
36. Provider with no config in PROVIDERS → fallback to openai config
37. Empty credentials object
38. Null API key and null accessToken
39. buildUrl with missing credentials
40. Headers with conflicting case (lowercase vs uppercase)
```

## Testing Approach

Since `execute()` calls `fetch()`, mock the global fetch:

```javascript
import { describe, it, beforeEach, afterEach, mock } from "node:test";
import assert from "node:assert/strict";

// Mock fetch at test level
let originalFetch;
beforeEach(() => {
  originalFetch = globalThis.fetch;
  globalThis.fetch = mock.fn(async () => new Response("ok", { status: 200 }));
});
afterEach(() => { globalThis.fetch = originalFetch; });
```

For `buildUrl` and `buildHeaders`, instantiate `DefaultExecutor` directly and call the methods with test credentials.

## Acceptance Criteria
- [ ] All 40 assertions pass
- [ ] `node --import tsx/esm --test tests/unit/executor-default-base.test.mjs`
- [ ] Uses fetch mocking (no real HTTP calls)
- [ ] Coverage of `default.ts` ≥ 85%, `base.ts` ≥ 70%
