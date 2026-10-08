/**
 * Google AI Studio rejects `thinkingBudget: 0` on Flash-Lite models
 * (gemini-flash-lite-latest, gemini-3.5-flash-lite) with a bare
 * 400 INVALID_ARGUMENT. The same request succeeds with
 * `thinkingConfig: { includeThoughts: false }` (no thinkingBudget), so the
 * Gemini request translators must omit a zero budget for Flash-Lite models
 * while preserving the explicit `thinkingBudget: 0` contract (#6813 / #6943)
 * for every other model.
 */
import test from "node:test";
import assert from "node:assert/strict";

const { openaiToGeminiRequest } =
  await import("../../open-sse/translator/request/openai-to-gemini.ts");
const { claudeToGeminiRequest } =
  await import("../../open-sse/translator/request/claude-to-gemini.ts");
const { isGeminiFlashLiteModel, buildGeminiThinkingConfig } =
  await import("../../open-sse/translator/helpers/geminiHelper.ts");

type ThinkingConfig = { thinkingBudget?: number; includeThoughts: boolean };
type GeminiResult = { generationConfig: { thinkingConfig?: ThinkingConfig } };

const FLASH_LITE_MODELS = ["gemini-flash-lite-latest", "gemini-3.5-flash-lite"];

function openai(model: string, extra: Record<string, unknown>): GeminiResult {
  return openaiToGeminiRequest(
    model,
    { messages: [{ role: "user", content: "hi" }], ...extra },
    false
  ) as GeminiResult;
}

function claude(model: string, extra: Record<string, unknown>): GeminiResult {
  return claudeToGeminiRequest(
    model,
    { messages: [{ role: "user", content: [{ type: "text", text: "hi" }] }], ...extra },
    false
  ) as GeminiResult;
}

test("isGeminiFlashLiteModel detects Flash-Lite ids only", () => {
  for (const id of [
    "gemini-flash-lite-latest",
    "gemini-3.5-flash-lite",
    "gemini-2.5-flash-lite",
    "gemini-3.1-flash-lite-preview",
    "gemini/gemini-3.5-flash-lite",
    "GEMINI-FLASH-LITE-LATEST",
  ]) {
    assert.equal(isGeminiFlashLiteModel(id), true, id);
  }
  for (const id of [
    "gemini-2.5-pro",
    "gemini-2.5-flash",
    "gemini-flash-latest",
    "gemini-3-flash-preview",
    "satellite-model",
    "",
    undefined,
  ]) {
    assert.equal(isGeminiFlashLiteModel(id), false, String(id));
  }
});

test("buildGeminiThinkingConfig only drops a zero budget for Flash-Lite", () => {
  assert.deepEqual(buildGeminiThinkingConfig("gemini-flash-lite-latest", 0, false), {
    includeThoughts: false,
  });
  assert.deepEqual(buildGeminiThinkingConfig("gemini-flash-lite-latest", 1024, true), {
    thinkingBudget: 1024,
    includeThoughts: true,
  });
  assert.deepEqual(buildGeminiThinkingConfig("gemini-2.5-pro", 0, false), {
    thinkingBudget: 0,
    includeThoughts: false,
  });
});

for (const model of FLASH_LITE_MODELS) {
  test(`openai -> gemini: ${model} with reasoning_effort none omits thinkingBudget 0`, () => {
    const result = openai(model, { reasoning_effort: "none" });
    assert.deepEqual(result.generationConfig.thinkingConfig, { includeThoughts: false });
    assert.equal("thinkingBudget" in (result.generationConfig.thinkingConfig ?? {}), false);
  });

  test(`openai -> gemini: ${model} with thinking.budget_tokens 0 omits thinkingBudget 0`, () => {
    const result = openai(model, { thinking: { type: "enabled", budget_tokens: 0 } });
    assert.deepEqual(result.generationConfig.thinkingConfig, { includeThoughts: false });
  });

  test(`openai -> gemini: ${model} with positive effort still sends thinkingBudget`, () => {
    for (const effort of ["low", "high"]) {
      const cfg = openai(model, { reasoning_effort: effort }).generationConfig.thinkingConfig;
      assert.equal(typeof cfg?.thinkingBudget, "number", effort);
      assert.ok((cfg?.thinkingBudget ?? 0) > 0, effort);
      assert.equal(cfg?.includeThoughts, true, effort);
    }
    assert.equal(
      openai(model, { reasoning_effort: "low" }).generationConfig.thinkingConfig?.thinkingBudget,
      1024
    );
  });

  test(`claude -> gemini: ${model} with thinking.budget_tokens 0 omits thinkingBudget 0`, () => {
    const result = claude(model, { thinking: { type: "enabled", budget_tokens: 0 } });
    // budget_tokens 0 on the Claude path is the dynamic-thinking sentinel (#6813):
    // includeThoughts stays true, only the rejected zero budget is dropped.
    assert.deepEqual(result.generationConfig.thinkingConfig, { includeThoughts: true });
  });

  test(`claude -> gemini: ${model} with positive budget_tokens still sends thinkingBudget`, () => {
    const result = claude(model, { thinking: { type: "enabled", budget_tokens: 2048 } });
    assert.deepEqual(result.generationConfig.thinkingConfig, {
      thinkingBudget: 2048,
      includeThoughts: true,
    });
  });

  test(`claude -> gemini: ${model} with output_config.effort none sends no thinkingBudget`, () => {
    const result = claude(model, { output_config: { effort: "none" } });
    assert.equal(result.generationConfig.thinkingConfig?.thinkingBudget, undefined);
  });

  test(`claude -> gemini: ${model} with output_config.effort low sends positive budget`, () => {
    const result = claude(model, { output_config: { effort: "low" } });
    assert.deepEqual(result.generationConfig.thinkingConfig, {
      thinkingBudget: 1024,
      includeThoughts: true,
    });
  });
}

test("openai -> gemini: non-Flash-Lite models keep thinkingBudget 0 (#6813/#6943)", () => {
  for (const model of ["gemini-2.5-pro", "gemini-2.5-flash"]) {
    assert.deepEqual(
      openai(model, { reasoning_effort: "none" }).generationConfig.thinkingConfig,
      { thinkingBudget: 0, includeThoughts: false },
      model
    );
    assert.deepEqual(
      openai(model, { thinking: { type: "enabled", budget_tokens: 0 } }).generationConfig
        .thinkingConfig,
      { thinkingBudget: 0, includeThoughts: false },
      model
    );
  }
});

test("claude -> gemini: non-Flash-Lite models keep thinkingBudget 0 (#6813)", () => {
  assert.deepEqual(
    claude("gemini-2.5-pro", { thinking: { type: "enabled", budget_tokens: 0 } }).generationConfig
      .thinkingConfig,
    { thinkingBudget: 0, includeThoughts: true }
  );
});
