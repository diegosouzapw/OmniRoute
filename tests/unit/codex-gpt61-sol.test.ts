import test from "node:test";
import assert from "node:assert/strict";
import semver from "semver";

import { getModelsByProviderId } from "../../open-sse/config/providerModels.ts";
import { CODEX_NATIVE_UNPREFIXED_MODELS } from "../../open-sse/services/model.ts";
import { CodexExecutor } from "../../open-sse/executors/codex.ts";
import { getPricingForModel } from "../../src/shared/constants/pricing.ts";
import { getCodexFastCostMultiplier } from "../../src/lib/usage/costCalculator.ts";
import { DEFAULT_CODEX_CLIENT_VERSION } from "../../src/shared/constants/codexClient.ts";
import { parseUpstreamError } from "../../open-sse/utils/error.ts";
import { extendCodexGpt56EffortValues } from "../../src/shared/reasoning/effortStandardization.ts";
import * as reasoningMetadata from "../../src/lib/vscode/reasoningMetadata.ts";

const MODEL = "gpt-6.1-sol";
const EFFORTS = ["ultra", "max", "xhigh", "high", "medium", "low"] as const;
const SOL_UNSUPPORTED_MESSAGE =
  "The 'gpt-6.1-sol' model is not supported when using Codex with a ChatGPT account.";

test("Codex client version supports GPT-6.1 Sol", () => {
  assert.equal(DEFAULT_CODEX_CLIENT_VERSION, "0.159.2");
  assert.equal(semver.gte(DEFAULT_CODEX_CLIENT_VERSION, "0.159.0"), true);
});

test("Upstream detail errors expose the GPT-6.1 Sol unsupported message", async () => {
  const parsed = await parseUpstreamError(
    new Response(JSON.stringify({ detail: SOL_UNSUPPORTED_MESSAGE }), { status: 400 }),
    "codex"
  );

  assert.equal(parsed.message, SOL_UNSUPPORTED_MESSAGE);
});

test.after(async () => {
  const { resetDbInstance } = await import("../../src/lib/db/core.ts");
  resetDbInstance();
});

type TransformResult = {
  model?: string;
  reasoning?: {
    effort?: string;
    summary?: string;
  };
};

function transform(model: string, body: Record<string, unknown>): TransformResult {
  return new CodexExecutor().transformRequest(model, { model, input: [], ...body }, false, {
    requestEndpointPath: "/responses",
  }) as TransformResult;
}

async function runResponsesLiteRequest(model: string): Promise<Record<string, unknown>> {
  const originalFetch = globalThis.fetch;
  const captured: Record<string, unknown>[] = [];
  globalThis.fetch = async (_url: RequestInfo | URL, init?: RequestInit) => {
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

test("Codex exposes GPT-6.1 Sol with its effort variants", () => {
  for (const provider of ["codex", "codex-app-server"]) {
    const models = getModelsByProviderId(provider);
    const ids = [MODEL, ...EFFORTS.map((effort) => `${MODEL}-${effort}`)];
    assert.deepEqual(
      models.filter((entry) => entry.id.startsWith(MODEL)).map((entry) => entry.id),
      ids,
      `${provider}/${MODEL}`
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
});

test("GPT-6.1 Sol effort aliases reach Codex as the base model", () => {
  for (const effort of EFFORTS) {
    const result = transform(`${MODEL}-${effort}`, {});
    assert.equal(result.model, MODEL, `${MODEL}-${effort}`);
    assert.equal(result.reasoning.effort, effort === "ultra" ? "max" : effort, effort);
  }
});

test("Explicit max reasoning is not clamped to xhigh for GPT-6.1 Sol", () => {
  assert.equal(transform(MODEL, { reasoning: { effort: "max" } }).reasoning.effort, "max");
  assert.equal(transform(MODEL, { reasoning: { effort: "ultra" } }).reasoning.effort, "max");
});

test("Responses Lite keeps parallel tool calls for Sol ultra delegation", async () => {
  assert.equal((await runResponsesLiteRequest(`${MODEL}-ultra`)).parallel_tool_calls, true);
});

test("Catalog effort tiers follow the live Codex levels for GPT-6.1 Sol", () => {
  const base = ["none", "low", "medium", "high", "xhigh"];
  const withUltra = ["low", "medium", "high", "xhigh", "max", "ultra"];
  for (const provider of ["codex", "cx"]) {
    assert.deepEqual(extendCodexGpt56EffortValues(provider, MODEL, base), withUltra);
  }
});

test("VS Code reasoning metadata knows GPT-6.1 Sol efforts and defaults", () => {
  const model = { id: `cx/${MODEL}`, owned_by: "codex", capabilities: { reasoning: true } };
  const values = reasoningMetadata.getReasoningEffortValues(model);
  assert.deepEqual(values, ["low", "medium", "high", "xhigh", "max", "ultra"]);
  assert.equal(reasoningMetadata.getDefaultReasoningEffort(model), "medium");
});

test("Parenthesized Sol effort overrides keep the reasoning summary", () => {
  for (const override of ["ultra", "max"]) {
    const model = `${MODEL}(${override})`;
    const result = transform(model, { reasoning: { effort: "low", summary: "detailed" } });
    assert.equal(result.model, MODEL, model);
    assert.equal(result.reasoning.effort, "max", model);
    assert.equal(result.reasoning.summary, "detailed", model);
  }
});

test("GPT-6.1 Sol Codex pricing and existing Fast usage multiplier remain distinct", () => {
  const ids = [MODEL, ...EFFORTS.map((effort) => `${MODEL}-${effort}`)];
  for (const id of ids) {
    const pricing = getPricingForModel("cx", id);
    assert.ok(pricing, id);
    assert.equal(pricing.input, 2, id);
    assert.equal(pricing.cached, 0.1, id);
    assert.equal(pricing.output, 10, id);
    assert.equal(pricing.reasoning, 10, id);
    assert.equal(pricing.cache_creation, 2.5, id);
    assert.equal(getCodexFastCostMultiplier("codex", id, "priority"), 2.5, id);
    assert.equal(getCodexFastCostMultiplier("cx", id, "fast"), 2.5, id);
    assert.equal(getCodexFastCostMultiplier("codex", id, "default"), 1, id);
  }
});

test("GPT-6 Sol keeps its cached rate when GPT-6.1 Sol pricing changes", () => {
  const ids = ["gpt-6-sol", ...EFFORTS.map((effort) => `gpt-6-sol-${effort}`)];
  for (const id of ids) {
    const pricing = getPricingForModel("cx", id);
    assert.ok(pricing, id);
    assert.equal(pricing.input, 2, id);
    assert.equal(pricing.cached, 0.2, id);
    assert.equal(pricing.output, 10, id);
  }
});

test("Codex native unprefixed models include GPT-6.1 Sol", () => {
  assert.equal(CODEX_NATIVE_UNPREFIXED_MODELS.has(MODEL), true);
});
