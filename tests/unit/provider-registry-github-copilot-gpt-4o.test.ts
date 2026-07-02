/**
 * Port of 9router PR #98 — add GPT-4o to GitHub Copilot (`github`/alias `gh`).
 *
 * Copilot still serves the original `gpt-4o` chat model via its chat/completions
 * endpoint. The OmniRoute registry only ships the GPT-5.x family, so apps that
 * explicitly request `gpt-4o` against the `gh` alias get an "unknown model"
 * error. Adding the entry restores parity with the upstream Copilot catalog
 * without disturbing the GPT-5.x / Claude / Gemini lineups already curated.
 *
 * GPT-4o is a chat/completions model — it must NOT use `openai-responses`.
 */
import test from "node:test";
import assert from "node:assert/strict";

const { REGISTRY } = await import("../../open-sse/config/providerRegistry.ts");
const { getModelsByProviderId } = await import("../../open-sse/config/providerModels.ts");

type ModelEntry = { id: string; name?: string; targetFormat?: string; [k: string]: unknown };

function githubModel(id: string): ModelEntry | undefined {
  const provider = (REGISTRY as Record<string, { models?: ModelEntry[] }>)["github"];
  return provider?.models?.find((m) => m.id === id);
}

test("9router#98 github/gpt-4o is registered under the gh provider", () => {
  const model = githubModel("gpt-4o");
  assert.ok(model, "gpt-4o must be registered under the github (gh) provider");
  assert.equal(typeof model?.name, "string");
});

test("9router#98 github/gpt-4o routes via chat/completions (no openai-responses)", () => {
  const model = githubModel("gpt-4o");
  assert.ok(model);
  assert.notEqual(
    model.targetFormat,
    "openai-responses",
    "GPT-4o on GitHub Copilot is a chat/completions model — Responses API would reject it"
  );
});

test("9router#98 getModelsByProviderId(github) exposes gpt-4o", () => {
  const models = getModelsByProviderId("github") as ModelEntry[];
  const gpt4o = models.find((m) => m.id === "gpt-4o");
  assert.ok(gpt4o, "gpt-4o resolvable via getModelsByProviderId(github)");
});
