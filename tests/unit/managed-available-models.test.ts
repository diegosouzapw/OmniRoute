import test from "node:test";
import assert from "node:assert/strict";

const { compatibleProviderSupportsModelImport, getCompatibleFallbackModels } =
  await import("../../src/lib/providers/managedAvailableModels.ts");
const { getModelsByProviderId } = await import("../../src/shared/constants/models.ts");

test("CC compatible fallback models mirror the OAuth Claude Code registry list", () => {
  assert.deepEqual(
    getCompatibleFallbackModels("anthropic-compatible-cc-demo"),
    getModelsByProviderId("claude")
  );
});

test("CC compatible providers disable remote model import", () => {
  assert.equal(compatibleProviderSupportsModelImport("anthropic-compatible-cc-demo"), false);
});

test("OpenRouter keeps imported fallback models as its managed list source", () => {
  const fallbackModels = [{ id: "openai/gpt-5" }, { id: "anthropic/claude-sonnet-4-6" }];
  assert.deepEqual(getCompatibleFallbackModels("openrouter", fallbackModels), fallbackModels);
});
