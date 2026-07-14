import test from "node:test";
import assert from "node:assert/strict";

import { IMAGE_PROVIDERS, parseImageModel } from "../../open-sse/config/imageRegistry.ts";

test("ChatGPT Web image catalog exposes GPT-5.5 Instant instead of GPT-5.3 Instant", () => {
  assert.deepEqual(IMAGE_PROVIDERS["chatgpt-web"].models, [
    { id: "gpt-5.5", name: "GPT-5.5 Instant (ChatGPT Web Image)" },
  ]);
  assert.deepEqual(parseImageModel("cgpt-web/gpt-5.5"), {
    provider: "chatgpt-web",
    model: "gpt-5.5",
  });
});

test("Codex image catalog exposes only the GPT-5.6 Sol, Terra, and Luna models", () => {
  assert.deepEqual(IMAGE_PROVIDERS.codex.models, [
    { id: "gpt-5.6-sol", name: "GPT 5.6 Sol (Codex Image)" },
    { id: "gpt-5.6-terra", name: "GPT 5.6 Terra (Codex Image)" },
    { id: "gpt-5.6-luna", name: "GPT 5.6 Luna (Codex Image)" },
  ]);

  for (const model of ["gpt-5.6-sol", "gpt-5.6-terra", "gpt-5.6-luna"]) {
    assert.deepEqual(parseImageModel(`cx/${model}`), { provider: "codex", model });
  }
});
