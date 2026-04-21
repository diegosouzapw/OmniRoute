import test from "node:test";
import assert from "node:assert/strict";

import { getModelStrip } from "../../open-sse/config/providerModels.ts";
import { stripIncompatibleContent } from "../../open-sse/services/modelContentStrip.ts";

test("T24: getModelStrip returns strip metadata for configured text-only models", () => {
  assert.deepEqual(getModelStrip("deepseek", "deepseek-chat"), ["image", "audio"]);
  assert.deepEqual(getModelStrip("alicode", "qwen3-coder-next"), ["image", "audio"]);
  assert.deepEqual(getModelStrip("synthetic", "hf:deepseek-ai/DeepSeek-V3.2"), ["image", "audio"]);
  assert.deepEqual(getModelStrip("deepseek", "unknown-model"), []);
});

test("T24: stripIncompatibleContent removes image and audio parts from messages and responses input", () => {
  const body = {
    messages: [
      {
        role: "user",
        content: [
          { type: "text", text: "hello" },
          { type: "image_url", image_url: { url: "https://example.com/cat.png" } },
          { type: "input_audio", input_audio: { data: "abc", format: "wav" } },
        ],
      },
      {
        role: "user",
        content: [{ type: "image_url", image_url: { url: "https://example.com/dog.png" } }],
      },
    ],
    input: [
      {
        type: "message",
        role: "user",
        content: [
          { type: "input_text", text: "hi" },
          { type: "input_image", image_url: "https://example.com/photo.png" },
        ],
      },
    ],
  };

  const result = stripIncompatibleContent(body, ["image", "audio"]);

  assert.notEqual(result.body, body);
  assert.equal(result.strippedCount, 4);
  assert.equal(result.body.messages[0].content, "hello");
  assert.equal(result.body.messages[1].content, "[content removed - unsupported format]");
  assert.deepEqual(result.body.input[0].content, [{ type: "input_text", text: "hi" }]);
});
