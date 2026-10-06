/**
 * Regression test for #11759 — `/v1/models` dropped the vector width and the
 * `embedding` type from embedding models that `embeddingRegistry.ts` describes,
 * whenever a synced model existed for the same id.
 *
 * `embeddingRegistry.ts` is the only machine-readable source of two facts: a model's
 * vector width, and that it is an embedding model at all. No upstream provider
 * publishes either — OpenRouter's catalogue carries no `dimensions`, and OpenAI's
 * `/v1/models` returns ids with no capability information.
 *
 * Two paths lost them:
 *
 *  - Width. The registry loop skipped its entry outright when discovery had already
 *    produced the model (`hasEquivalentSpecialtyModel(...) continue`), so the surviving
 *    entry was the discovered one — typed, but with no `dimensions`.
 *
 *  - Type. Classification comes from `sm.supportedEndpoints`, which falls back to
 *    `["chat"]`. A provider that does not report endpoints therefore yielded
 *    `modelType === undefined` and the `type` key was omitted entirely, so an embedding
 *    model read as a chat model.
 *
 * A consumer that stores vectors needs both: collections are keyed on width, and an
 * untyped model cannot be identified as an embedding model. These tests assert the
 * merged `/v1/models` output, not the registry in isolation — the registry was always
 * correct; the loss happened in `catalog.ts`.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-11759-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const modelsDb = await import("../../src/lib/db/models.ts");
const v1ModelsCatalog = await import("../../src/app/api/v1/models/catalog.ts");
const embeddingRegistry = await import("../../open-sse/config/embeddingRegistry.ts");

/** Both are real registry entries, so the expected widths come from the registry itself. */
const OPENROUTER_MODEL = "qwen/qwen3-embedding-8b";
const OPENAI_MODEL = "text-embedding-3-small";

function registryWidth(providerId: string, modelId: string): number {
  const provider = embeddingRegistry.getEmbeddingProvider(providerId);
  assert.ok(provider, `embeddingRegistry has no provider "${providerId}"`);
  const model = provider!.models.find((m) => m.id === modelId);
  assert.ok(model, `embeddingRegistry has no model "${modelId}" on "${providerId}"`);
  const { dimensions } = model!;
  assert.equal(
    typeof dimensions,
    "number",
    `this test assumes a single advertised width for "${modelId}"`
  );
  return dimensions as number;
}

async function resetStorage() {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
  v1ModelsCatalog.__resetCatalogBuilderRunsForTest();
}

/** An active connection, which is what makes the provider's registry models eligible. */
async function connectProvider(provider: string) {
  return (await providersDb.createProviderConnection({
    provider,
    authType: "apikey",
    name: `${provider}-conn`,
    apiKey: "sk-test",
    isActive: true,
    testStatus: "active",
  })) as { id: string };
}

async function modelEntry(id: string) {
  const response = await v1ModelsCatalog.getUnifiedModelsResponse(
    new Request("http://localhost/api/v1/models")
  );
  assert.equal(response.status, 200);
  const body = (await response.json()) as { data: Array<Record<string, unknown>> };
  const entry = body.data.find((model) => model.id === id);
  assert.ok(
    entry,
    `expected "${id}" in /v1/models, got ${JSON.stringify(
      body.data.filter((m) => String(m.id).includes("embedding")).map((m) => m.id)
    )}`
  );
  return entry!;
}

test.beforeEach(async () => {
  await resetStorage();
});

test.after(async () => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

test("#11759: a synced embedding model keeps the width the registry states", async () => {
  const connection = await connectProvider("openrouter");

  // What discovery produces for OpenRouter: typed as an embedding model, and carrying no
  // width, because the upstream catalogue does not publish one.
  await modelsDb.replaceSyncedAvailableModelsForConnection("openrouter", connection.id, [
    {
      id: OPENROUTER_MODEL,
      name: "Qwen3 Embedding 8B",
      source: "imported",
      supportedEndpoints: ["embeddings"],
    },
  ]);

  const entry = await modelEntry(`openrouter/${OPENROUTER_MODEL}`);
  const expected = registryWidth("openrouter", OPENROUTER_MODEL);

  assert.equal(
    entry.dimensions,
    expected,
    `the registry states ${expected} for "${OPENROUTER_MODEL}"; the synced entry must not drop it — got ${JSON.stringify(entry.dimensions)}`
  );
  assert.equal(entry.type, "embedding", "a synced embedding model must stay typed as one");
});

test("#11759: a synced model the embedding registry names is typed as an embedding model", async () => {
  const connection = await connectProvider("openai");

  // What discovery produces for OpenAI: no `supportedEndpoints`, because `/v1/models`
  // returns ids with no capability information, so classification falls back to `["chat"]`
  // and the model is emitted with no `type` at all.
  await modelsDb.replaceSyncedAvailableModelsForConnection("openai", connection.id, [
    {
      id: OPENAI_MODEL,
      name: "Text Embedding 3 Small",
      source: "imported",
    },
  ]);

  const entry = await modelEntry(`openai/${OPENAI_MODEL}`);

  assert.equal(
    entry.type,
    "embedding",
    `"${OPENAI_MODEL}" is in the embedding registry, so it must not be published untyped — got ${JSON.stringify(entry.type)}`
  );
  assert.equal(
    entry.dimensions,
    registryWidth("openai", OPENAI_MODEL),
    "an embedding model published without its width cannot be indexed by a consumer"
  );
});
