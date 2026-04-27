import test from "node:test";
import assert from "node:assert/strict";

import { transformChatCompletionSseToResponses } from "../../src/lib/translator/streamTransform.ts";

const SIMPLE_SSE = `data: {"id":"chatcmpl_demo","object":"chat.completion.chunk","created":1745366400,"model":"gpt-4o-mini","choices":[{"index":0,"delta":{"role":"assistant","content":"Hello"},"finish_reason":null}]}

data: {"id":"chatcmpl_demo","object":"chat.completion.chunk","created":1745366400,"model":"gpt-4o-mini","choices":[{"index":0,"delta":{"content":" world"},"finish_reason":null}]}

data: {"id":"chatcmpl_demo","object":"chat.completion.chunk","created":1745366400,"model":"gpt-4o-mini","choices":[{"index":0,"delta":{},"finish_reason":"stop"}],"usage":{"prompt_tokens":12,"completion_tokens":4,"total_tokens":16}}

data: [DONE]
`;

test("transformChatCompletionSseToResponses emits Responses API events", async () => {
  const transformed = await transformChatCompletionSseToResponses(SIMPLE_SSE);

  assert.match(transformed, /event: response\.output_item\.added/);
  assert.match(transformed, /event: response\.output_text\.delta/);
  assert.match(transformed, /event: response\.output_text\.done/);
  assert.match(transformed, /event: response\.completed/);
  assert.match(transformed, /data: \[DONE\]/);
});
