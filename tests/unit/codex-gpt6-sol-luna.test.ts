import test from "node:test";
import assert from "node:assert/strict";

import { getModelsByProviderId } from "../../open-sse/config/providerModels.ts";
import { CodexExecutor } from "../../open-sse/executors/codex.ts";
import { openaiToOpenAIResponsesRequest } from "../../open-sse/translator/request/openai-responses/toResponses.ts";
import { getPricingForModel } from "../../src/shared/constants/pricing.ts";
import { getCodexFastCostMultiplier } from "../../src/lib/usage/costCalculator.ts";
import { extendCodexGpt56EffortValues } from "../../src/shared/reasoning/effortStandardization.ts";
import * as reasoningMetadata from "../../src/lib/vscode/reasoningMetadata.ts";

// The live Codex catalog (client 0.155.1) advertises Sol at low..ultra and Luna at
// low..max, mirroring the GPT-5.6 Sol/Luna split.
const FAMILIES = [
  { model: "gpt-6-sol", efforts: ["ultra", "max", "xhigh", "high", "medium", "low"] },
  { model: "gpt-6-luna", efforts: ["max", "xhigh", "high", "medium", "low"] },
] as const;

test.after(async () => {
  const { resetDbInstance } = await import("../../src/lib/db/core.ts");
  resetDbInstance();
});

function transform(model: string, body: Record<string, unknown>) {
  return new CodexExecutor().transformRequest(model, { model, input: [], ...body }, false, {
    requestEndpointPath: "/responses",
  });
}

test("Codex exposes GPT-6 Sol and Luna with their effort variants", () => {
  for (const provider of ["codex", "codex-app-server"]) {
    const models = getModelsByProviderId(provider);
    for (const { model, efforts } of FAMILIES) {
      const ids = [model, ...efforts.map((effort) => `${model}-${effort}`)];
      assert.deepEqual(
        models.filter((entry) => entry.id.startsWith(`${model}`)).map((entry) => entry.id),
        ids,
        `${provider}/${model}`
      );
      for (const id of ids) {
        const entry = models.find((candidate) => candidate.id === id);
        assert.ok(entry, `${provider}/${id}`);
        assert.equal(entry.contextLength, 872000);
        assert.equal(entry.maxOutputTokens, 128000);
        assert.equal(entry.targetFormat, "openai-responses");
        assert.equal(entry.supportsReasoning, true);
        assert.equal(entry.supportsVision, true);
        assert.equal(entry.supportsXHighEffort, true);
      }
    }
  }
});

test("GPT-6 Sol and Luna effort aliases reach Codex as the base model", () => {
  for (const { model, efforts } of FAMILIES) {
    for (const effort of efforts) {
      const result = transform(`${model}-${effort}`, {});
      assert.equal(result.model, model, `${model}-${effort}`);
      assert.equal(result.reasoning.effort, effort === "ultra" ? "max" : effort, effort);
    }
  }
});

test("Explicit max reasoning is not clamped to xhigh for GPT-6 Sol and Luna", () => {
  assert.equal(transform("gpt-6-sol", { reasoning: { effort: "max" } }).reasoning.effort, "max");
  assert.equal(transform("gpt-6-sol", { reasoning: { effort: "ultra" } }).reasoning.effort, "max");
  assert.equal(transform("gpt-6-luna", { reasoning: { effort: "max" } }).reasoning.effort, "max");
  // Luna tops out at max, like GPT-5.6 Luna.
  assert.equal(transform("gpt-6-luna", { reasoning: { effort: "ultra" } }).reasoning.effort, "max");
});

test("Luna has no ultra alias, so the suffix is not split off", () => {
  assert.equal(transform("gpt-6-luna-ultra", {}).model, "gpt-6-luna-ultra");
});

async function runResponsesLiteRequest(model: string): Promise<Record<string, unknown>> {
  const originalFetch = globalThis.fetch;
  const captured: Record<string, unknown>[] = [];
  globalThis.fetch = async (_url, init) => {
    captured.push(JSON.parse(String(init?.body || "{}")));
    return new Response(JSON.stringify({ id: "resp_lite", object: "response" }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  };
  try {
    await new CodexExecutor().execute({
      model,
      body: { _nativeCodexPassthrough: true, model, input: [], parallel_tool_calls: true },
      stream: true,
      credentials: { accessToken: "codex-token" },
      clientHeaders: { "X-OpenAI-Internal-Codex-Responses-Lite": "true" },
    });
  } finally {
    globalThis.fetch = originalFetch;
  }
  assert.equal(captured.length, 1);
  return captured[0];
}

test("Responses Lite keeps parallel tool calls only for Sol ultra delegation", async () => {
  // The live catalog describes only `ultra` as automatic task delegation.
  assert.equal((await runResponsesLiteRequest("gpt-6-sol-ultra")).parallel_tool_calls, true);
  assert.equal((await runResponsesLiteRequest("gpt-6-sol-max")).parallel_tool_calls, false);
  assert.equal((await runResponsesLiteRequest("gpt-6-luna-max")).parallel_tool_calls, false);
});

test("Catalog effort tiers follow the live Codex levels for GPT-6 models", () => {
  const base = ["none", "low", "medium", "high", "xhigh"];
  const withUltra = ["low", "medium", "high", "xhigh", "max", "ultra"];
  const withMax = ["low", "medium", "high", "xhigh", "max"];
  for (const provider of ["codex", "cx"]) {
    assert.deepEqual(extendCodexGpt56EffortValues(provider, "gpt-6-astra", base), withUltra);
    assert.deepEqual(extendCodexGpt56EffortValues(provider, "gpt-6-sol", base), withUltra);
    assert.deepEqual(extendCodexGpt56EffortValues(provider, "gpt-6-luna-max", base), withMax);
  }
  // Kiro's GPT-5.6 max extension does not reach models Kiro does not serve.
  assert.deepEqual(extendCodexGpt56EffortValues("kiro", "gpt-6-sol", base), base);
});

test("VS Code reasoning metadata knows GPT-6 Sol and Luna efforts and defaults", () => {
  const model = (id: string) => ({ id, owned_by: "codex", capabilities: { reasoning: true } });
  const sol = model("cx/gpt-6-sol");
  const luna = model("cx/gpt-6-luna");
  const solValues = reasoningMetadata.getReasoningEffortValues(sol);
  assert.deepEqual(solValues, ["low", "medium", "high", "xhigh", "max", "ultra"]);
  assert.deepEqual(reasoningMetadata.getReasoningEffortValues(luna), [
    "low",
    "medium",
    "high",
    "xhigh",
    "max",
  ]);
  // The live catalog's default_reasoning_level is medium for every GPT-6 model.
  for (const id of ["cx/gpt-6-astra", "cx/gpt-6-sol", "cx/gpt-6-luna"]) {
    assert.equal(reasoningMetadata.getDefaultReasoningEffort(model(id)), "medium", id);
  }
  assert.equal(
    reasoningMetadata.inferSelectedReasoningEffort(model("cx/gpt-6-sol-ultra"), solValues),
    "ultra"
  );
  assert.equal(
    reasoningMetadata.getReasoningVariantBaseModelId("cx/gpt-6-sol-max"),
    "cx/gpt-6-sol"
  );
  assert.equal(
    reasoningMetadata.getReasoningVariantBaseModelId("cx/gpt-6-luna-max"),
    "cx/gpt-6-luna"
  );
});

test("Parenthesized Sol and Luna effort overrides keep the reasoning summary", () => {
  for (const model of ["gpt-6-sol(ultra)", "gpt-6-sol(max)", "gpt-6-luna(max)"]) {
    const result = transform(model, { reasoning: { effort: "low", summary: "detailed" } });
    assert.equal(result.model, model.slice(0, model.indexOf("(")), model);
    assert.equal(result.reasoning.effort, "max", model);
    assert.equal(result.reasoning.summary, "detailed", model);
  }
});

test("Chat-to-Codex translation preserves max reasoning for GPT-6 Sol and Luna", () => {
  for (const { model } of FAMILIES) {
    const translated = openaiToOpenAIResponsesRequest(
      model,
      { model, messages: [{ role: "user", content: "test" }], reasoning_effort: "max" },
      true,
      {}
    );
    const result = new CodexExecutor().transformRequest(model, translated, true, {
      requestEndpointPath: "/chat/completions",
    });
    assert.equal(result.model, model);
    assert.equal(result.reasoning.effort, "max", model);
  }
});

test("GPT-6 Sol and Luna Codex pricing and Fast multiplier match the credit rate card", () => {
  // Codex Standard credits per MTok (input / cached / output), at 25 credits per USD:
  // Sol 50 / 5 / 250, Luna 2.5 / 0.25 / 12.5. Fast is 2.5x Standard for both.
  const expected = {
    "gpt-6-sol": { input: 2, cached: 0.2, output: 10 },
    "gpt-6-luna": { input: 0.1, cached: 0.01, output: 0.5 },
  };
  for (const { model, efforts } of FAMILIES) {
    for (const id of [model, ...efforts.map((effort) => `${model}-${effort}`)]) {
      const pricing = getPricingForModel("cx", id);
      assert.ok(pricing, id);
      assert.equal(pricing.input, expected[model].input, id);
      assert.equal(pricing.cached, expected[model].cached, id);
      assert.equal(pricing.output, expected[model].output, id);
      assert.equal(pricing.reasoning, expected[model].output, id);
      assert.equal(pricing.cache_creation, expected[model].input * 1.25, id);
      assert.equal(getCodexFastCostMultiplier("codex", id, "priority"), 2.5, id);
      assert.equal(getCodexFastCostMultiplier("cx", id, "fast"), 2.5, id);
      assert.equal(getCodexFastCostMultiplier("codex", id, "default"), 1, id);
    }
  }
});
