import test from "node:test";
import assert from "node:assert/strict";

import { CloudflareAIExecutor } from "../../open-sse/executors/cloudflare-ai.ts";

// Regression for #6390: the Workers AI /ai/v1/chat/completions endpoint only accepts a
// plain-string `content` field. transformRequest() used to flatten every non-text content
// part (e.g. image_url) to an empty string and silently join the rest — the image (or any
// other non-text attachment) vanished from the outgoing request with no error surfaced to
// the caller. transformRequest must now refuse the request instead of silently dropping data.
test("CloudflareAIExecutor.transformRequest throws a clear error on image_url content parts (#6390)", () => {
  const executor = new CloudflareAIExecutor();
  const body = {
    model: "@cf/meta/llama-3.3-70b-instruct",
    messages: [
      {
        role: "user",
        content: [
          { type: "text", text: "describe this image" },
          { type: "image_url", image_url: { url: "https://example.com/cat.png" } },
        ],
      },
    ],
  };

  assert.throws(
    () => executor.transformRequest("@cf/meta/llama-3.3-70b-instruct", body, false, null),
    /does not accept image|non-text content/i
  );
});

test("CloudflareAIExecutor.transformRequest still flattens plain text-part messages (#6390 no-regression)", () => {
  const executor = new CloudflareAIExecutor();
  const body = {
    model: "@cf/meta/llama-3.3-70b-instruct",
    messages: [
      {
        role: "user",
        content: [
          { type: "text", text: "hello " },
          { type: "text", text: "world" },
        ],
      },
      { role: "assistant", content: "plain stays plain" },
    ],
  };

  const out = executor.transformRequest("@cf/meta/llama-3.3-70b-instruct", body, false, null);
  const messages = out.messages as Array<{ content: unknown }>;

  assert.equal(messages[0].content, "hello world");
  assert.equal(messages[1].content, "plain stays plain");
});
