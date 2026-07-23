import { test } from "node:test";
import assert from "node:assert/strict";

import { AntigravityExecutor } from "../../open-sse/executors/antigravity.ts";

type ChatCompletionPayload = {
  choices: Array<{
    message: { content: string };
    finish_reason: string;
  }>;
};

test("AntigravityExecutor.collectStreamToResponse normalizes prohibited content finish reasons", async () => {
  const executor = new AntigravityExecutor();
  const response = new Response(
    'data: {"response":{"candidates":[{"content":{"parts":[{"text":"partial text"}]},"finishReason":"PROHIBITED_CONTENT"}]}}\n\n',
    {
      status: 200,
      headers: { "Content-Type": "text/event-stream" },
    }
  );

  const result = await executor.collectStreamToResponse(
    response,
    "gemini-2.5-flash",
    "https://example.com",
    { Authorization: "Bearer ag-token" },
    { request: {} }
  );
  const payload = (await result.response.json()) as ChatCompletionPayload;

  assert.equal(payload.choices[0].message.content, "partial text");
  assert.equal(payload.choices[0].finish_reason, "content_filter");
});
