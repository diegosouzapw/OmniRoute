import { test } from "node:test";
import assert from "node:assert/strict";
import { detectVisionInput } from "@/lib/providerModels/modelDiscovery";

// #13918: Lemonade Server's GET /v1/models exposes capabilities only through a
// `labels[]` string array (chat, vision, reasoning, tool-calling, ...) -- it has
// no `architecture.input_modalities` / `input_modalities` / `modality` field, so
// detectVisionInput() never recognizes a vision-labelled Lemonade model.

test("detectVisionInput recognizes a Lemonade record whose labels[] includes vision", () => {
  const lemonadeRecord = {
    id: "Gemma-4-26B-A4B",
    object: "model",
    owned_by: "lemonade",
    checkpoint: "amd/gemma-4-26b-a4b",
    recipe: "llamacpp",
    size: 26000000000,
    max_context_window: 262144,
    context_length: 262144,
    downloaded: true,
    labels: ["chat", "vision", "reasoning", "tool-calling"],
  };

  assert.equal(
    detectVisionInput(lemonadeRecord),
    true,
    "expected a Lemonade record labelled `vision` to be detected as vision-capable"
  );
});

test("detectVisionInput stays false for a Lemonade record without the vision label", () => {
  const textOnly = {
    id: "Gemma-4-26B-A4B-text",
    owned_by: "lemonade",
    labels: ["chat", "tool-calling"],
  };

  assert.equal(detectVisionInput(textOnly), false);
});

test("detectVisionInput is case-insensitive and trims whitespace in labels[]", () => {
  const mixedCase = {
    id: "some-model",
    owned_by: "lemonade",
    labels: ["chat", " Vision "],
  };

  assert.equal(detectVisionInput(mixedCase), true);
});

test("detectVisionInput does not substring-match labels[] entries", () => {
  const notVision = {
    id: "some-model",
    owned_by: "lemonade",
    labels: ["chat", "revision-control"],
  };

  assert.equal(detectVisionInput(notVision), false);
});

test("detectVisionInput ignores non-array labels without throwing", () => {
  assert.doesNotThrow(() => detectVisionInput({ id: "x", labels: "vision" as unknown }));
  assert.equal(detectVisionInput({ id: "x", labels: "vision" as unknown }), false);
  assert.doesNotThrow(() => detectVisionInput({ id: "x", labels: undefined }));
  assert.equal(detectVisionInput({ id: "x", labels: {} as unknown }), false);
});

test("detectVisionInput leaves non-Lemonade shapes byte-identical (architecture.modality path)", () => {
  const openRouterRecord = {
    id: "some/vision-model",
    architecture: {
      modality: "text+image->text",
    },
  };

  assert.equal(detectVisionInput(openRouterRecord), true);

  const openRouterTextOnly = {
    id: "some/text-model",
    architecture: {
      modality: "text->text",
    },
  };

  assert.equal(detectVisionInput(openRouterTextOnly), false);
});
