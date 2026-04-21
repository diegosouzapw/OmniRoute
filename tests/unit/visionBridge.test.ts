import test from "node:test";
import assert from "node:assert/strict";

import {
  interceptAndExtractVision,
  shouldApplyVisionBridge,
} from "../../open-sse/services/visionBridge.ts";

const originalFetch = globalThis.fetch;

test.afterEach(() => {
  globalThis.fetch = originalFetch;
});

test("Vision Bridge leaves text-only requests untouched", async () => {
  const body = {
    messages: [{ role: "user", content: "hello" }],
  };

  const result = await interceptAndExtractVision(body, "deepseek-chat", "deepseek");

  assert.equal(result, body);
});

test("Vision Bridge skips models that already support vision", () => {
  const body = {
    messages: [
      {
        role: "user",
        content: [{ type: "image_url", image_url: { url: "https://example.com/cat.png" } }],
      },
    ],
  };

  assert.equal(shouldApplyVisionBridge(body, "gpt-4o", "openai"), false);
});

test("Vision Bridge extracts images into text for text-only targets", async () => {
  const body = {
    messages: [
      {
        role: "user",
        content: [
          { type: "text", text: "What is in this image?" },
          { type: "image_url", image_url: { url: "https://example.com/cat.png" } },
        ],
      },
    ],
  };

  globalThis.fetch = async (url, init = {}) => {
    assert.match(String(url), /\/api\/v1\/chat\/completions$/);
    const parsed = JSON.parse(String(init.body));
    assert.equal(parsed.model, "gpt-4o-mini");
    return Response.json({
      choices: [{ message: { content: "A cat sleeping on a sofa." } }],
    });
  };

  const result = await interceptAndExtractVision(body, "deepseek-chat", "deepseek");

  assert.notEqual(result, body);
  assert.equal(
    result.messages[0].content,
    "What is in this image?\n\n[Image 1]: A cat sleeping on a sofa."
  );
  assert.equal(body.messages[0].content[1].image_url.url, "https://example.com/cat.png");
});

test("Vision Bridge fails open and returns the original request when extraction fails", async () => {
  const body = {
    messages: [
      {
        role: "user",
        content: [{ type: "image_url", image_url: { url: "https://example.com/cat.png" } }],
      },
    ],
  };

  globalThis.fetch = async () =>
    new Response(JSON.stringify({ error: "upstream down" }), { status: 502 });

  const result = await interceptAndExtractVision(body, "deepseek-chat", "deepseek");

  assert.equal(result, body);
});
