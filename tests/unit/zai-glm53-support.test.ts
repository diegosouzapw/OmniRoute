import test from "node:test";
import assert from "node:assert/strict";

import { DefaultExecutor } from "../../open-sse/executors/default.ts";
import { GlmExecutor } from "../../open-sse/executors/glm.ts";
import { GLM_SHARED_MODELS } from "../../open-sse/config/glmProvider.ts";
import { getModelTargetFormat, getProviderModel } from "../../open-sse/config/providerModels.ts";

const CREDENTIALS = {
  apiKey: "test-key",
  providerSpecificData: { targetFormat: "openai" },
} as Record<string, unknown>;

function chatBody(extra: Record<string, unknown> = {}) {
  return {
    model: "glm-5.3-flash",
    messages: [{ role: "user", content: "hi" }],
    ...extra,
  };
}

test("shared GLM catalog includes GLM-5.3-Flash with native vision and effort tiers", () => {
  const flash = GLM_SHARED_MODELS.find((model) => model.id === "glm-5.3-flash");
  assert.ok(flash);
  assert.equal(flash.contextLength, 1000000);
  assert.equal(flash.maxOutputTokens, 131072);
  assert.equal(flash.toolCalling, true);
  assert.equal(flash.supportsReasoning, true);
  assert.equal(flash.supportsVision, true);
  assert.deepEqual(flash.supportedThinkingEfforts, ["low", "high", "max"]);

  for (const tier of ["low", "high", "max"] as const) {
    const variant = GLM_SHARED_MODELS.find((model) => model.id === `glm-5.3-flash-${tier}`);
    assert.ok(variant, `missing glm-5.3-flash-${tier}`);
    assert.deepEqual(variant.supportedThinkingEfforts, [tier]);
    assert.equal(variant.supportsVision, true);
  }
});

test("zai provider hardcodes GLM-5.3-family models onto the OpenAI Coding Plan endpoint", () => {
  const glm53 = getProviderModel("zai", "glm-5.3");
  const flash = getProviderModel("zai", "glm-5.3-flash");

  assert.equal(glm53?.targetFormat, "openai");
  assert.equal(flash?.targetFormat, "openai");
  assert.deepEqual(flash?.supportedThinkingEfforts, ["low", "high", "max"]);
  assert.equal(flash?.supportsVision, true);
  assert.equal(getModelTargetFormat("zai", "glm-5.3-flash"), "openai");
});

test("zai GLM-5.3-Flash OpenAI path defaults thinking, floors missing effort to low, and sets tool_stream", () => {
  const executor = new DefaultExecutor("zai");
  const out = executor.transformRequest(
    "glm-5.3-flash",
    chatBody({
      stream: true,
      tools: [{ type: "function", function: { name: "lookup", parameters: { type: "object" } } }],
    }),
    true,
    CREDENTIALS
  ) as Record<string, unknown>;

  assert.equal(out.model, "glm-5.3-flash");
  assert.equal(out.reasoning_effort, "low");
  assert.deepEqual(out.thinking, { type: "enabled", clear_thinking: false });
  assert.equal(out.tool_stream, true);
});

test("zai GLM-5.3-Flash -max alias forces max when the client sends no effort", () => {
  const executor = new DefaultExecutor("zai");
  const out = executor.transformRequest(
    "glm-5.3-flash-max",
    chatBody({ model: "glm-5.3-flash-max" }),
    false,
    CREDENTIALS
  ) as Record<string, unknown>;

  assert.equal(out.model, "glm-5.3-flash");
  assert.equal(out.reasoning_effort, "max");
  assert.deepEqual(out.thinking, { type: "enabled", clear_thinking: false });
});

test("zai GLM-5.3 OpenAI defaults preserve explicit reasoning_effort", () => {
  const executor = new DefaultExecutor("zai");
  const out = executor.transformRequest(
    "glm-5.3",
    chatBody({ model: "glm-5.3", reasoning_effort: "low" }),
    false,
    CREDENTIALS
  ) as Record<string, unknown>;

  assert.equal(out.reasoning_effort, "low");
  assert.deepEqual(out.thinking, { type: "enabled", clear_thinking: false });
});

test("zai GLM-5.3 effort aliases rewrite to base model and native effort", () => {
  const executor = new DefaultExecutor("zai");
  const out = executor.transformRequest(
    "glm-5.3-flash-low",
    chatBody({ model: "glm-5.3-flash-low" }),
    false,
    CREDENTIALS
  ) as Record<string, unknown>;

  assert.equal(out.model, "glm-5.3-flash");
  assert.equal(out.reasoning_effort, "low");
  assert.deepEqual(out.thinking, { type: "enabled", clear_thinking: false });
});

test("GlmExecutor resolves glm-5.3-flash effort aliases on the OpenAI coding transport", () => {
  const executor = new GlmExecutor("glm");

  for (const [alias, effort] of [
    ["glm-5.3-flash-high", "high"],
    ["glm-5.3-flash-low", "low"],
    ["glm-5.3-flash-max", "max"],
  ] as const) {
    const transformed = executor.transformForTransport(
      alias,
      { messages: [{ role: "user", content: "hi" }] },
      false,
      { apiKey: "glm-key" },
      "openai"
    ) as Record<string, unknown>;

    assert.equal(transformed.model, "glm-5.3-flash", alias);
    assert.equal(transformed.reasoning_effort, effort, alias);
    assert.equal((transformed.thinking as { type?: string } | undefined)?.type, "enabled", alias);
  }
});
