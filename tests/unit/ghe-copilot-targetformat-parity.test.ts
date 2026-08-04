/**
 * Parity test for GHE Copilot targetFormat routing.
 *
 * Ensures that OpenAI-native models (gpt-5.4-mini, gpt-5.6-*, gpt-5.3-codex, etc.)
 * under `ghe-copilot` carry `targetFormat: "openai-responses"`, while Claude and
 * Gemini models do NOT.
 */
import test from "node:test";
import assert from "node:assert/strict";

const { gheCopilotProvider } = await import("../../open-sse/config/providers/registry/ghe-copilot/index.ts");
const { getModelsByProviderId } = await import("../../open-sse/config/providerModels.ts");

type ModelEntry = { id: string; targetFormat?: string; [k: string]: unknown };

function gheModel(id: string): ModelEntry | undefined {
  return gheCopilotProvider.models.find((m) => m.id === id);
}

// Claude/Gemini models that must NOT route through the Responses API.
const MUST_NOT_BE_RESPONSES = [
  "claude-fable-5",
  "claude-opus-5",
  "claude-opus-4.7",
  "claude-opus-4.8",
  "claude-opus-4.8-fast",
  "claude-opus-4.5",
  "claude-sonnet-4.6",
  "claude-sonnet-5",
  "claude-sonnet-4.5",
  "claude-haiku-4.5",
  "gemini-3.1-pro-preview",
  "gemini-3.5-flash",
];

for (const id of MUST_NOT_BE_RESPONSES) {
  test(`ghe-copilot/${id} must not use openai-responses targetFormat`, () => {
    const model = gheModel(id);
    assert.ok(model, `${id} must be registered under ghe-copilot`);
    assert.notEqual(
      model.targetFormat,
      "openai-responses",
      `ghe-copilot/${id} must route via chat/completions (Copilot Responses API rejects it)`
    );
  });
}

// OpenAI-native models that MUST use openai-responses targetFormat under ghe-copilot
const MUST_BE_RESPONSES = [
  "gpt-5.6-sol",
  "gpt-5.6-terra",
  "gpt-5.6-luna",
  "gpt-5.4",
  "gpt-5.4-mini",
  "gpt-5.3-codex",
  "gpt-5-mini",
  "mai-code-1-flash",
  "oswe-vscode-prime",
];

for (const id of MUST_BE_RESPONSES) {
  test(`ghe-copilot/${id} (OpenAI-native) uses openai-responses`, () => {
    const model = gheModel(id);
    assert.ok(model, `${id} must be registered under ghe-copilot`);
    assert.equal(
      model.targetFormat,
      "openai-responses",
      `ghe-copilot/${id} is OpenAI-native and must use the Responses API`
    );
  });
}

// Lookup-by-id helper resolves the same entries.
test("getModelsByProviderId(ghe-copilot) reflects the targetFormat settings", () => {
  const models = getModelsByProviderId("ghe-copilot") as ModelEntry[];
  const gpt54mini = models.find((m) => m.id === "gpt-5.4-mini");
  assert.ok(gpt54mini, "gpt-5.4-mini resolvable via getModelsByProviderId");
  assert.equal(gpt54mini.targetFormat, "openai-responses");
});
