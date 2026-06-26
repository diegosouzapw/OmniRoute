/**
 * Port: add GPT-4 to the GitHub Copilot (`github`/alias `gh`) provider.
 *
 * Copilot still serves the original `gpt-4` chat model via its chat/completions
 * endpoint, alongside `gpt-4o` and the GPT-5.x family. The OmniRoute registry
 * shipped GPT-4o + GPT-5.x but not plain `gpt-4`, so apps that explicitly request
 * `gpt-4` against the `gh` alias got an "unknown model" error. Adding the entry
 * restores parity with the upstream Copilot catalog without disturbing the
 * GPT-4o / GPT-5.x / Claude / Gemini lineups already curated.
 *
 * GPT-4 is a chat/completions model — it must NOT use `openai-responses`.
 */
import test from "node:test";
import assert from "node:assert/strict";

const { REGISTRY } = await import("../../open-sse/config/providerRegistry.ts");
const { getModelsByProviderId, getProviderModel, isValidModel } = await import(
  "../../open-sse/config/providerModels.ts"
);

type ModelEntry = { id: string; name?: string; targetFormat?: string; [k: string]: unknown };

function githubModel(id: string): ModelEntry | undefined {
  const provider = (REGISTRY as Record<string, { models?: ModelEntry[] }>)["github"];
  return provider?.models?.find((m) => m.id === id);
}

test("github/gpt-4 is registered under the gh provider", () => {
  const model = githubModel("gpt-4");
  assert.ok(model, "gpt-4 must be registered under the github (gh) provider");
  assert.equal(typeof model?.name, "string");
});

test("github/gpt-4 routes via chat/completions (no openai-responses)", () => {
  const model = githubModel("gpt-4");
  assert.ok(model);
  assert.notEqual(
    model.targetFormat,
    "openai-responses",
    "GPT-4 on GitHub Copilot is a chat/completions model — Responses API would reject it"
  );
});

test("getModelsByProviderId(github) exposes gpt-4", () => {
  const models = getModelsByProviderId("github") as ModelEntry[];
  const gpt4 = models.find((m) => m.id === "gpt-4");
  assert.ok(gpt4, "gpt-4 resolvable via getModelsByProviderId(github)");
});

test("gpt-4 resolves through both the gh alias and the github id", () => {
  // getProviderModel keys on the public alias; isValidModel mirrors it.
  assert.ok(getProviderModel("gh", "gpt-4"), "getProviderModel('gh','gpt-4') must resolve");
  assert.equal(isValidModel("gh", "gpt-4"), true, "isValidModel('gh','gpt-4') must be true");
  // Raw provider id resolves to the same entry via the alias map.
  const viaId = getModelsByProviderId("github").find((m) => m.id === "gpt-4");
  assert.ok(viaId, "gpt-4 resolvable via the raw 'github' provider id");
});
