import test from "node:test";
import assert from "node:assert/strict";

const { REGISTRY } = await import("../../open-sse/config/providerRegistry.ts");
const { getStaticModelsForProvider } =
  await import("../../src/app/api/providers/[id]/models/route.ts");
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

test("T31: antigravity static catalog exposes client-visible Gemini preview IDs", () => {
  // Antigravity exposes preview aliases to clients even though the upstream
  // still accepts its internal model identifiers.
  const staticIds = (getStaticModelsForProvider("antigravity") || []).map((m) => m.id);
  assert.ok(staticIds.includes("gemini-3-pro-preview"));
  assert.ok(staticIds.includes("gemini-3.1-pro-low"));
  assert.ok(!staticIds.includes("gemini-claude-sonnet-4-5"));
  assert.ok(!staticIds.includes("gemini-claude-sonnet-4-5-thinking"));
  assert.ok(!staticIds.includes("gemini-claude-opus-4-5-thinking"));
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
  assert.equal(capMaxOutputTokens("gpt-5.5", 200000), 128000);
  assert.equal(capMaxOutputTokens("gpt-5.5-xhigh", 200000), 128000);
  assert.equal(capMaxOutputTokens("gemini-3-flash", 131072), 65536);
  assert.equal(capMaxOutputTokens("gemini-3-flash"), 65536);
  assert.equal(capMaxOutputTokens("gemini-3.1-pro-high", 131072), 65535);
  assert.equal(capMaxOutputTokens("claude-opus-4-7", 200000), 128000);
});

test("T38: modelSpecs exposes centralized helpers with alias and prefix lookup", () => {
  assert.equal(getModelSpec("gpt-5.5").contextWindow, 1050000);
  assert.equal(getModelSpec("gpt-5.5-high").maxOutputTokens, 128000);
  assert.equal(getModelSpec("gpt-5.5-mini").contextWindow, 400000);
  assert.equal(typeof MODEL_SPECS["gemini-3.1-pro-high"], "object");
  assert.equal(getModelSpec("gemini-3-pro-high").maxOutputTokens, 65535);
  assert.equal(getModelSpec("gemini-3-pro-preview").maxOutputTokens, 65535);
  assert.equal(getModelSpec("gemini-3-flash-preview").maxOutputTokens, 65536);
  assert.equal(getModelSpec("gemini-3.1-pro-preview").maxOutputTokens, 65535);
  assert.equal(getModelSpec("gemini-3.1-pro-preview-customtools").maxOutputTokens, 65535);
  assert.equal(getModelSpec("claude-opus-4-7").contextWindow, 1000000);
  assert.equal(getModelSpec("claude-opus-4.7").maxOutputTokens, 128000);
  assert.equal(resolveModelAlias("gemini-3-pro-low"), "gemini-3.1-pro-low");
  assert.equal(resolveModelAlias("gemini-3-pro-preview"), "gemini-3.1-pro-high");
  assert.equal(resolveModelAlias("gemini-3.1-pro-preview"), "gemini-3.1-pro-high");
  assert.equal(resolveModelAlias("gemini-3.1-pro-preview-customtools"), "gemini-3.1-pro-high");
  assert.equal(getDefaultThinkingBudget("gemini-3.1-pro-high"), 24576);
  assert.equal(capThinkingBudget("gemini-3.1-pro-low", 50000), 16000);
});
