import test from "node:test";
import assert from "node:assert/strict";

const { REGISTRY } = await import("../../open-sse/config/providerRegistry.ts");
const { resolveModelAlias: resolveDeprecatedAlias } =
  await import("../../open-sse/services/modelDeprecation.ts");
const { normalizeThinkingLevel } = await import("../../open-sse/services/thinkingBudget.ts");
const {
  MODEL_SPECS,
  getModelSpec,
  capMaxOutputTokens,
  resolveModelAlias,
  getDefaultThinkingBudget,
  capThinkingBudget,
} = await import("../../src/shared/constants/modelSpecs.ts");

test("T31: registry exposes Gemini 3.1 Pro High/Low model IDs", () => {
  const geminiIds = REGISTRY.gemini.models.map((m) => m.id);
  assert.ok(geminiIds.includes("gemini-3.1-pro-high"));
  assert.ok(geminiIds.includes("gemini-3.1-pro-low"));
});

test("T31: legacy Gemini aliases resolve to Gemini 3.1 IDs", () => {
  assert.equal(resolveDeprecatedAlias("gemini-3-pro-high"), "gemini-3.1-pro-high");
  assert.equal(resolveDeprecatedAlias("gemini-3-pro-low"), "gemini-3.1-pro-low");
});

test("T33: thinkingLevel string is converted into numeric thinkingBudget", () => {
  const converted = normalizeThinkingLevel({
    model: "gemini-3.1-pro-high",
    generationConfig: {
      thinkingConfig: { thinkingLevel: "HIGH" },
    },
  });

  assert.equal(converted.generationConfig.thinkingConfig.thinkingBudget, 24576);
  assert.equal(converted.generationConfig.thinkingConfig.thinkingLevel, undefined);
});

test("T34: max output tokens are capped by model spec", () => {
  assert.equal(capMaxOutputTokens("gemini-3-flash", 131072), 65536);
  assert.equal(capMaxOutputTokens("gemini-3-flash"), 65536);
  assert.equal(capMaxOutputTokens("gemini-3.1-pro-high", 131072), 131072);
});

test("T38: modelSpecs exposes centralized helpers with alias and prefix lookup", () => {
  assert.equal(typeof MODEL_SPECS["gemini-3.1-pro-high"], "object");
  assert.equal(getModelSpec("gemini-3-pro-high").maxOutputTokens, 131072);
  assert.equal(getModelSpec("gemini-3-flash-preview").maxOutputTokens, 65536);
  assert.equal(getModelSpec("gemini-3.1-pro-preview").maxOutputTokens, 131072);
  assert.equal(getModelSpec("gemini-3.1-pro-preview-customtools").maxOutputTokens, 131072);
  assert.equal(resolveModelAlias("gemini-3-pro-low"), "gemini-3.1-pro-low");
  assert.equal(resolveModelAlias("gemini-3.1-pro-preview"), "gemini-3.1-pro-high");
  assert.equal(resolveModelAlias("gemini-3.1-pro-preview-customtools"), "gemini-3.1-pro-high");
  assert.equal(getDefaultThinkingBudget("gemini-3.1-pro-high"), 24576);
  assert.equal(capThinkingBudget("gemini-3.1-pro-low", 50000), 16000);
});
