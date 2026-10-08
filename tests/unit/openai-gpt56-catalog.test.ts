import test from "node:test";
import assert from "node:assert/strict";

import { getModelsByProviderId } from "../../open-sse/config/providerModels.ts";
import { getModelSpec } from "../../src/shared/constants/modelSpecs.ts";
import { getPricingForModel } from "../../src/shared/constants/pricing.ts";
import { getUnsupportedParams } from "../../open-sse/config/providerRegistry.ts";
import { DefaultExecutor } from "../../open-sse/executors/default.ts";
import { resolveChatCoreTargetFormat } from "../../open-sse/handlers/chatCore/targetFormat.ts";
import { openaiToOpenAIResponsesRequest } from "../../open-sse/translator/request/openai-responses/toResponses.ts";

// Full GPT-6/5.6 family that the OpenAI public-API registry must expose in order.
// gpt-6-sol and gpt-6-luna were added by #15023 (they were missing and fell back to
// the 128k default, corrupting combo context windows).
const EXPECTED_MODELS = [
  "gpt-6-astra",
  "gpt-6-sol",
  "gpt-6-luna",
  "gpt-5.6",
  "gpt-5.6-sol",
  "gpt-5.6-terra",
  "gpt-5.6-luna",
];

// #15023: gpt-6-sol and gpt-6-luna were absent from the OpenAI registry; imported
// instances fell back to defaultContextLength (128k). These must now appear with the
// correct 1,050,000 context window, matching the rest of the GPT-6 / GPT-5.6 family.
const GPT6_SIBLINGS = ["gpt-6-sol", "gpt-6-luna"] as const;

test("OpenAI API catalog exposes gpt-6-sol and gpt-6-luna with 1050000 context (#15023)", () => {
  const models = getModelsByProviderId("openai");

  for (const modelId of GPT6_SIBLINGS) {
    const model = models.find((entry) => entry.id === modelId);
    assert.ok(model, `openai registry must include ${modelId} (was missing — fell back to 128k)`);
    assert.equal(
      model!.contextLength,
      1050000,
      `${modelId} contextLength must be 1050000, not the 128k import fallback`
    );
    assert.equal(model!.maxInputTokens, 922000, `${modelId} maxInputTokens`);
    assert.equal(model!.maxOutputTokens, 128000, `${modelId} maxOutputTokens`);
    assert.equal(model!.toolCalling, true, `${modelId} toolCalling`);
    assert.equal(model!.supportsReasoning, true, `${modelId} supportsReasoning`);
    assert.equal(model!.supportsVision, true, `${modelId} supportsVision`);

    const spec = getModelSpec(modelId);
    assert.ok(spec, `MODEL_SPECS must include ${modelId}`);
    assert.equal(spec!.contextWindow, 1050000, `${modelId} spec contextWindow`);
    assert.equal(spec!.maxOutputTokens, 128000, `${modelId} spec maxOutputTokens`);
  }
});

test("OpenAI API catalog puts Astra/Sol/Luna before GPT-5.6 family and keeps GPT-5.4", () => {
  const models = getModelsByProviderId("openai");

  assert.deepEqual(
    models.slice(0, EXPECTED_MODELS.length).map((model) => model.id),
    EXPECTED_MODELS
  );

  for (const modelId of EXPECTED_MODELS) {
    const model = models.find((entry) => entry.id === modelId);
    assert.ok(model, `openai must expose ${modelId}`);
    assert.equal(model.contextLength, 1050000);
    assert.equal(model.maxInputTokens, 922000);
    assert.equal(model.maxOutputTokens, 128000);
    assert.equal(model.toolCalling, true);
    assert.equal(model.supportsReasoning, true);
    assert.equal(model.supportsVision, true);

    const spec = getModelSpec(modelId);
    assert.equal(spec?.contextWindow, 1050000);
    assert.equal(spec?.maxOutputTokens, 128000);
  }

  for (const retainedModelId of ["gpt-5.4", "gpt-5.4-pro", "gpt-5.4-mini", "gpt-5.4-nano"]) {
    assert.ok(
      models.some((model) => model.id === retainedModelId),
      `${retainedModelId} must remain`
    );
  }
});

test("OpenAI API Astra and GPT-5.6 pricing matches the published standard tier", () => {
  const expectedPricing = {
    "gpt-6-astra": { input: 10, cached: 1, cache_creation: 12.5, output: 50 },
    "gpt-5.6": { input: 5, cached: 0.5, cache_creation: 6.25, output: 30 },
    "gpt-5.6-sol": { input: 5, cached: 0.5, cache_creation: 6.25, output: 30 },
    "gpt-5.6-terra": { input: 2.5, cached: 0.25, cache_creation: 3.125, output: 15 },
    "gpt-5.6-luna": { input: 1, cached: 0.1, cache_creation: 1.25, output: 6 },
  };

  for (const [modelId, expected] of Object.entries(expectedPricing)) {
    const pricing = getPricingForModel("openai", modelId);
    assert.ok(pricing, `missing openai pricing for ${modelId}`);
    assert.equal(pricing.input, expected.input, `${modelId} input`);
    assert.equal(pricing.cached, expected.cached, `${modelId} cached`);
    assert.equal(pricing.cache_creation, expected.cache_creation, `${modelId} cache creation`);
    assert.equal(pricing.output, expected.output, `${modelId} output`);
  }
});

test("OpenAI Astra declares unsupported sampling parameters for the chat pipeline", () => {
  assert.deepEqual(getUnsupportedParams("openai", "gpt-6-astra"), [
    "temperature",
    "top_p",
    "top_logprobs",
    "logprobs",
  ]);
});

test("OpenAI Astra tool requests use Responses and retain each supported reasoning effort", async () => {
  const model = "gpt-6-astra";
  assert.equal(
    resolveChatCoreTargetFormat({
      provider: "openai",
      resolvedModel: model,
      apiFormat: undefined,
      customModelTargetFormat: undefined,
      providerSpecificData: null,
    }).targetFormat,
    "openai-responses"
  );
  const originalFetch = globalThis.fetch;
  const captured: Array<{ url: string; body: Record<string, unknown> }> = [];
  globalThis.fetch = async (url, init) => {
    captured.push({ url: String(url), body: JSON.parse(String(init?.body || "{}")) });
    return new Response(JSON.stringify({ id: "resp_astra", object: "response", output: [] }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  };
  try {
    for (const effort of ["low", "medium", "high", "xhigh", "max", "none", "minimal"]) {
      const body = openaiToOpenAIResponsesRequest(
        model,
        {
          model,
          messages: [{ role: "user", content: "Call the test tool." }],
          reasoning_effort: effort,
          tools: [
            {
              type: "function",
              function: { name: "test_tool", parameters: { type: "object", properties: {} } },
            },
          ],
        },
        false,
        {}
      );
      await new DefaultExecutor("openai").execute({
        model,
        body,
        stream: false,
        credentials: { apiKey: "test-openai-key" },
      });
      const request = captured.at(-1)!;
      assert.equal(request.url, "https://api.openai.com/v1/responses");
      assert.equal(request.body.model, model);
      assert.equal(
        (request.body.reasoning as { effort: string }).effort,
        effort === "none" || effort === "minimal" ? "low" : effort
      );
      assert.ok(Array.isArray(request.body.input));
      assert.equal((request.body.tools as Array<{ name: string }>)[0].name, "test_tool");
    }
  } finally {
    globalThis.fetch = originalFetch;
  }
});
