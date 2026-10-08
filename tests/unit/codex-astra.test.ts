import test from "node:test";
import assert from "node:assert/strict";

import { getModelsByProviderId } from "../../open-sse/config/providerModels.ts";
import { CodexExecutor } from "../../open-sse/executors/codex.ts";
import { openaiToOpenAIResponsesRequest } from "../../open-sse/translator/request/openai-responses/toResponses.ts";
import { getModelSpec } from "../../src/shared/constants/modelSpecs.ts";
import { getPricingForModel } from "../../src/shared/constants/pricing.ts";
import { getCodexFastCostMultiplier } from "../../src/lib/usage/costCalculator.ts";

const MODEL = "gpt-6-astra";
const EFFORTS = ["ultra", "max", "xhigh", "high", "medium", "low"] as const;

test.after(async () => {
  const { resetDbInstance } = await import("../../src/lib/db/core.ts");
  resetDbInstance();
});

test("Codex exposes Astra and its effort variants with live OAuth limits", () => {
  const ids = [MODEL, ...EFFORTS.map((effort) => `${MODEL}-${effort}`)];
  for (const provider of ["codex", "codex-app-server"]) {
    const models = getModelsByProviderId(provider);
    assert.deepEqual(
      models.filter((model) => model.id.startsWith(MODEL)).map((model) => model.id),
      ids
    );
    for (const id of ids) {
      const model = models.find((entry) => entry.id === id);
      assert.ok(model, `${provider}/${id}`);
      assert.equal(model.contextLength, 872000);
      assert.equal(model.maxInputTokens, 872000);
      assert.equal(model.maxOutputTokens, 128000);
      assert.equal(model.targetFormat, "openai-responses");
      assert.equal(model.toolCalling, true);
      assert.equal(model.supportsReasoning, true);
      assert.equal(model.supportsVision, true);
      assert.equal(model.supportsXHighEffort, true);
    }
    assert.deepEqual(
      models.slice(0, ids.length).map((model) => model.id),
      ids
    );
  }
});

test("Astra specs retain the public context window separately from Codex limits", () => {
  const spec = getModelSpec(MODEL);
  assert.equal(spec?.contextWindow, 1050000);
  assert.equal(spec?.maxOutputTokens, 128000);
  assert.equal(spec?.supportsTools, true);
  assert.equal(spec?.supportsVision, true);
  assert.equal(spec?.supportsThinking, true);
});

test("Astra effort aliases reach Codex as the base model and supported wire effort", () => {
  const executor = new CodexExecutor();
  for (const effort of EFFORTS) {
    const model = `${MODEL}-${effort}`;
    const result = executor.transformRequest(model, { model, input: [] }, false, {
      requestEndpointPath: "/responses",
    });
    assert.equal(result.model, MODEL, effort);
    assert.equal(result.reasoning.effort, effort === "ultra" ? "max" : effort, effort);
  }
});

test("Chat-to-Codex translation preserves Astra max reasoning", () => {
  const translated = openaiToOpenAIResponsesRequest(
    MODEL,
    { model: MODEL, messages: [{ role: "user", content: "test" }], reasoning_effort: "max" },
    true,
    {}
  );
  const result = new CodexExecutor().transformRequest(MODEL, translated, true, {
    requestEndpointPath: "/chat/completions",
  });
  assert.equal(result.model, MODEL);
  assert.equal(result.reasoning.effort, "max");
});

test("Astra parenthesized effort overrides preserve the reasoning summary", () => {
  for (const effort of ["max", "ultra"]) {
    const model = `${MODEL}(${effort})`;
    const result = new CodexExecutor().transformRequest(
      model,
      { model, input: [], reasoning: { effort: "low", summary: "detailed" } },
      false,
      { requestEndpointPath: "/responses" }
    );
    assert.equal(result.model, MODEL);
    assert.equal(result.reasoning.effort, "max");
    assert.equal(result.reasoning.summary, "detailed");
  }
});

test("Astra Codex pricing and Fast multiplier match the Codex credit rate card", () => {
  for (const model of [MODEL, ...EFFORTS.map((effort) => `${MODEL}-${effort}`)]) {
    const pricing = getPricingForModel("cx", model);
    assert.ok(pricing, model);
    assert.equal(pricing.input, 10);
    assert.equal(pricing.cached, 1);
    assert.equal(pricing.output, 50);
    assert.equal(pricing.reasoning, 50);
    assert.equal(getCodexFastCostMultiplier("codex", model, "priority"), 2.5);
    assert.equal(getCodexFastCostMultiplier("cx", model, "fast"), 2.5);
    assert.equal(getCodexFastCostMultiplier("codex", model, "default"), 1);
  }
  assert.equal(getCodexFastCostMultiplier("openai", MODEL, "priority"), 1);
});
