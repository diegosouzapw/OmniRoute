import test from "node:test";
import assert from "node:assert/strict";

import {
  getStripTypesForProviderModel,
  stripIncompatibleMessageContent,
} from "../../open-sse/services/modelStrip.ts";

test("model strip metadata is exposed for text-only models", () => {
  assert.deepEqual(getStripTypesForProviderModel("deepseek", "deepseek-chat"), ["image", "audio"]);
  assert.deepEqual(getStripTypesForProviderModel("bailian-coding-plan", "qwen3-coder-next"), [
    "image",
    "audio",
  ]);
  assert.deepEqual(getStripTypesForProviderModel("openai", "gpt-4o"), []);
});

test("stripIncompatibleMessageContent removes image and audio parts but preserves text", () => {
  const originalMessages = [
    {
      role: "user",
      content: [
        { type: "text", text: "Summarize this input." },
        { type: "image_url", image_url: { url: "https://example.com/image.png" } },
        { type: "input_audio", input_audio: { data: "abc", format: "wav" } },
      ],
    },
  ];

  const result = stripIncompatibleMessageContent(originalMessages, ["image", "audio"]);

  assert.equal(result.removedParts, 2);
  assert.deepEqual(result.messages, [
    {
      role: "user",
      content: [{ type: "text", text: "Summarize this input." }],
    },
  ]);
});

test("stripIncompatibleMessageContent leaves non-array content untouched", () => {
  const originalMessages = [{ role: "user", content: "hello" }];

  const result = stripIncompatibleMessageContent(originalMessages, ["image"]);

  assert.equal(result.removedParts, 0);
  assert.deepEqual(result.messages, originalMessages);
});
