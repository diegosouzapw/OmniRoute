/**
 * Curated GitHub Copilot GPT-4-family registry coverage.
 *
 * The final Copilot allowlist keeps `gpt-4-0125-preview` but intentionally drops
 * the older bare `gpt-4` alias. GPT-4 Turbo is a chat/completions model — it
 * must NOT use `openai-responses`.
 */
import test from "node:test";
import assert from "node:assert/strict";

const { REGISTRY } = await import("../../open-sse/config/providerRegistry.ts");
const { getModelsByProviderId, getProviderModel, isValidModel } =
  await import("../../open-sse/config/providerModels.ts");

type ModelEntry = { id: string; name?: string; targetFormat?: string; [k: string]: unknown };

function githubModel(id: string): ModelEntry | undefined {
  const provider = (REGISTRY as Record<string, { models?: ModelEntry[] }>)["github"];
  return provider?.models?.find((m) => m.id === id);
}

test("github/gpt-4-0125-preview is registered under the gh provider", () => {
  const model = githubModel("gpt-4-0125-preview");
  assert.ok(model, "gpt-4-0125-preview must be registered under the github (gh) provider");
  assert.equal(typeof model?.name, "string");
});

test("github/gpt-4-0125-preview routes via chat/completions (no openai-responses)", () => {
  const model = githubModel("gpt-4-0125-preview");
  assert.ok(model);
  assert.notEqual(
    model.targetFormat,
    "openai-responses",
    "GPT-4 Turbo on GitHub Copilot is a chat/completions model — Responses API would reject it"
  );
});

test("getModelsByProviderId(github) exposes gpt-4-0125-preview", () => {
  const models = getModelsByProviderId("github") as ModelEntry[];
  const gpt4 = models.find((m) => m.id === "gpt-4-0125-preview");
  assert.ok(gpt4, "gpt-4-0125-preview resolvable via getModelsByProviderId(github)");
});

test("gpt-4-0125-preview resolves through both the gh alias and the github id", () => {
  // getProviderModel keys on the public alias; isValidModel mirrors it.
  assert.ok(
    getProviderModel("gh", "gpt-4-0125-preview"),
    "getProviderModel('gh','gpt-4-0125-preview') must resolve"
  );
  assert.equal(
    isValidModel("gh", "gpt-4-0125-preview"),
    true,
    "isValidModel('gh','gpt-4-0125-preview') must be true"
  );
  // Raw provider id resolves to the same entry via the alias map.
  const viaId = getModelsByProviderId("github").find((m) => m.id === "gpt-4-0125-preview");
  assert.ok(viaId, "gpt-4-0125-preview resolvable via the raw 'github' provider id");
  assert.equal(isValidModel("gh", "gpt-4"), false, "bare gpt-4 is not in the curated list");
});
