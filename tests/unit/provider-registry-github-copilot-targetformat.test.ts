/**
 * Issue #2911 — Built-in GitHub Copilot Claude Opus / Gemini models fail.
 *
 * The `github` provider has `format: "openai"` (baseUrl .../chat/completions)
 * and a separate `responsesBaseUrl` (.../responses). A model only routes to the
 * Responses API when it sets `targetFormat: "openai-responses"`.
 *
 * GitHub Copilot's Responses API does NOT serve the Claude/Gemini models, so
 * `claude-opus-4.7`, `claude-opus-4-5-20251101`, `gemini-3.1-pro-preview` and
 * `gemini-3-flash-preview` failed with a 400. The working `claude-opus-4.6`
 * carries no `targetFormat` and goes through chat/completions.
 *
 * Fix: drop `targetFormat: "openai-responses"` from the Claude/Gemini entries so
 * they use the provider default (chat/completions). The native OpenAI `gpt-*`
 * models legitimately keep the Responses API and must NOT be touched.
 */
import test from "node:test";
import assert from "node:assert/strict";

const { REGISTRY } = await import("../../open-sse/config/providerRegistry.ts");
const { getModelsByProviderId } = await import("../../open-sse/config/providerModels.ts");

type ModelEntry = { id: string; targetFormat?: string; [k: string]: unknown };

function githubModel(id: string): ModelEntry | undefined {
  const provider = (REGISTRY as Record<string, { models?: ModelEntry[] }>)["github"];
  return provider?.models?.find((m) => m.id === id);
}

// Claude/Gemini models that must NOT route through the Responses API.
const MUST_NOT_BE_RESPONSES = [
  "claude-opus-4.7",
  "claude-opus-4-5-20251101",
  "gemini-3.1-pro-preview",
  "gemini-3-flash-preview",
];

for (const id of MUST_NOT_BE_RESPONSES) {
  test(`#2911 github/${id} must not use openai-responses targetFormat`, () => {
    const model = githubModel(id);
    assert.ok(model, `${id} must be registered under github`);
    assert.notEqual(
      model.targetFormat,
      "openai-responses",
      `github/${id} must route via chat/completions (Copilot Responses API rejects it)`
    );
  });
}

test("#2911 github/claude-opus-4.6 baseline stays on chat/completions (no targetFormat)", () => {
  const model = githubModel("claude-opus-4.6");
  assert.ok(model, "claude-opus-4.6 must be registered");
  assert.notEqual(model.targetFormat, "openai-responses");
});

// Regression guard: native OpenAI models keep the Responses API.
for (const id of ["gpt-5.4", "gpt-5.4-mini"]) {
  test(`#2911 github/${id} (OpenAI-native) still uses openai-responses`, () => {
    const model = githubModel(id);
    assert.ok(model, `${id} must be registered`);
    assert.equal(
      model.targetFormat,
      "openai-responses",
      `github/${id} is OpenAI-native and must keep the Responses API`
    );
  });
}

// Sanity: lookup-by-id helper resolves the same entries.
test("#2911 getModelsByProviderId(github) reflects the targetFormat changes", () => {
  const models = getModelsByProviderId("github") as ModelEntry[];
  const opus47 = models.find((m) => m.id === "claude-opus-4.7");
  assert.ok(opus47, "claude-opus-4.7 resolvable via getModelsByProviderId");
  assert.notEqual(opus47.targetFormat, "openai-responses");
});
