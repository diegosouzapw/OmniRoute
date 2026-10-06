import test from "node:test";
import assert from "node:assert/strict";

import { CloudflareAIExecutor } from "../../open-sse/executors/cloudflare-ai.ts";

// #2539 established that Workers AI rejects OpenAI content-part arrays with HTTP 400. That
// constraint is carried by the *model* schema, not by the endpoint: text-only models declare
// `content: string`, multimodal models declare `content: string | array`. Measured 2026-08-29
// against /accounts/{id}/ai/v1/chat/completions with an all-text part array:
//
//   @cf/mistralai/mistral-small-3.1-24b-instruct   200
//   @cf/meta/llama-4-scout-17b-16e-instruct        200
//   @cf/meta/llama-3.3-70b-instruct-fp8-fast       200
//   @cf/qwen/qwen2.5-coder-32b-instruct            400  (AiError … oneOf at '/' not met)
//
// So flattening all-text arrays stays correct — it is the one shape every model accepts —
// while refusing arrays that carry an image is not: only a multimodal model can use an image,
// and those accept the array. #6390's requirement (never silently drop an attachment) is
// preserved by passing the array through untouched rather than by throwing.
test("CloudflareAIExecutor.transformRequest passes image_url content parts through untouched (#6390)", () => {
  const executor = new CloudflareAIExecutor();
  const content = [
    { type: "text", text: "describe this image" },
    { type: "image_url", image_url: { url: "https://example.com/cat.png" } },
  ];
  const body = {
    model: "@cf/meta/llama-4-scout-17b-16e-instruct",
    messages: [{ role: "user", content }],
  };

  const out = executor.transformRequest(
    "@cf/meta/llama-4-scout-17b-16e-instruct",
    body,
    false,
    null
  );
  const messages = out.messages as Array<{ role: string; content: unknown }>;

  assert.deepEqual(messages[0].content, content);
});

test("CloudflareAIExecutor.transformRequest never silently drops a non-text part (#6390)", () => {
  const executor = new CloudflareAIExecutor();
  const body = {
    model: "@cf/meta/llama-4-scout-17b-16e-instruct",
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

  const out = executor.transformRequest(
    "@cf/meta/llama-4-scout-17b-16e-instruct",
    body,
    false,
    null
  );
  const serialised = JSON.stringify(out);

  assert.ok(
    serialised.includes("https://example.com/cat.png"),
    "the image URL must survive transformRequest — flattening it away is the #6390 defect"
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

// The witness that keeps this change honest: a text-only model, whose schema really does
// reject arrays, must keep receiving a flattened string.
test("CloudflareAIExecutor.transformRequest flattens all-text arrays for text-only models (#2539 no-regression)", () => {
  const executor = new CloudflareAIExecutor();
  const body = {
    model: "@cf/qwen/qwen2.5-coder-32b-instruct",
    messages: [
      {
        role: "user",
        content: [
          { type: "text", text: "Reply exactly: " },
          { type: "text", text: "OK" },
        ],
      },
    ],
  };

  const out = executor.transformRequest("@cf/qwen/qwen2.5-coder-32b-instruct", body, false, null);
  const messages = out.messages as Array<{ content: unknown }>;

  assert.equal(messages[0].content, "Reply exactly: OK");
});
