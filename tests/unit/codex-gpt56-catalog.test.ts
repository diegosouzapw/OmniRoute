import test from "node:test";
import assert from "node:assert/strict";

import { getModelsByProviderId } from "../../open-sse/config/providerModels.ts";

test("Codex catalog exposes the GPT-5.6 lineup in configured priority order", () => {
  const models = getModelsByProviderId("codex");
  const expectedIds = [
    "gpt-5.6-sol",
    "gpt-5.6-sol-ultra",
    "gpt-5.6-sol-max",
    "gpt-5.6-sol-xhigh",
    "gpt-5.6-sol-high",
    "gpt-5.6-sol-medium",
    "gpt-5.6-sol-low",
    "gpt-5.6-terra",
    "gpt-5.6-terra-ultra",
    "gpt-5.6-terra-max",
    "gpt-5.6-terra-xhigh",
    "gpt-5.6-terra-high",
    "gpt-5.6-terra-medium",
    "gpt-5.6-terra-low",
    "gpt-5.6-luna",
    "gpt-5.6-luna-max",
    "gpt-5.6-luna-xhigh",
    "gpt-5.6-luna-high",
    "gpt-5.6-luna-medium",
    "gpt-5.6-luna-low",
  ];

  assert.deepEqual(
    models.slice(0, expectedIds.length).map((model) => model.id),
    expectedIds
  );

  for (const modelId of expectedIds) {
    const model = models.find((entry) => entry.id === modelId);
    assert.ok(model, `codex must expose ${modelId}`);
    assert.equal(model.contextLength, 372000);
    assert.equal(model.maxInputTokens, 372000);
    assert.equal(model.maxOutputTokens, 128000);
    assert.equal(model.targetFormat, "openai-responses");
    assert.equal(model.toolCalling, true);
    assert.equal(model.supportsReasoning, true);
    assert.equal(model.supportsVision, true);
    assert.equal(model.supportsXHighEffort, true);
  }

  assert.equal(
    models.some((model) => model.id === "gpt-5.6-luna-ultra"),
    false
  );
});

test("Codex catalog no longer exposes GPT-5.4 models", () => {
  const models = getModelsByProviderId("codex");

  assert.deepEqual(
    models.filter((model) => model.id.startsWith("gpt-5.4")).map((model) => model.id),
    []
  );
});
