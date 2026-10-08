import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";

// Model sync discovers through the chat surface, so a speech / transcription /
// image model never comes back from it. Sync used to drop every imported row
// before re-adding what it discovered, which silently deleted every model a
// media-only provider (Soniox, ElevenLabs, …) had imported from its local catalog
// on the next sync cycle — every 6 h and on every restart. API keys with
// "Disable Non-Public Models" then answered 403 for those models again.

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-model-sync-media-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET ||= `test-model-sync-media-${Date.now()}`;

const core = await import("../../src/lib/db/core.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const modelsDb = await import("../../src/lib/db/models.ts");
const modelSyncRoute = await import("../../src/app/api/providers/[id]/sync-models/route.ts");
const providerModelsRoute = await import("../../src/app/api/providers/[id]/models/route.ts");
const scheduler = await import("../../src/shared/services/modelSyncScheduler.ts");
const { importManagedModels } = await import("../../src/lib/providerModels/managedModelImport.ts");
const { getStaticModelsForProvider } = await import("../../src/lib/providers/staticModels.ts");
const { expandAutoComboCandidatePool } =
  await import("../../open-sse/services/combo/autoStrategy.ts");
const { invalidateDbCache } = await import("../../src/lib/db/readCache.ts");

const originalFetch = globalThis.fetch;

type StoredModel = { id: string; source?: string; apiFormat?: string };

test.after(() => {
  globalThis.fetch = originalFetch;
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("model sync keeps the speech and transcription models a media-only provider imported", async () => {
  const connection = await providersDb.createProviderConnection({
    provider: "soniox",
    authType: "apikey",
    name: "Soniox media sync",
    apiKey: "soniox-test-key",
  });
  const catalog = getStaticModelsForProvider("soniox") || [];
  assert.ok(catalog.length > 0);
  for (const model of catalog) {
    await modelsDb.addCustomModel(
      "soniox",
      model.id,
      model.name,
      "imported",
      model.apiFormat,
      model.supportedEndpoints
    );
  }
  const importedIds = catalog.map((model) => model.id).sort();

  // Serve the self-fetch from the real /models route so the sync sees exactly
  // what production sees, including the chat-surface filter.
  globalThis.fetch = async (input, init) => {
    const url = new URL(String(input));
    if (url.pathname.includes("__readiness_probe__")) {
      return new Response(null, { status: 404 });
    }
    if (url.pathname === `/api/providers/${connection.id}/models`) {
      return providerModelsRoute.GET(new Request(url.href, { headers: init?.headers }), {
        params: Promise.resolve({ id: connection.id }),
      });
    }
    throw new Error(`Unexpected fetch in media sync test: ${url.href}`);
  };

  const response = await modelSyncRoute.POST(
    new Request(`http://localhost/api/providers/${connection.id}/sync-models?quiet=1`, {
      method: "POST",
      headers: scheduler.buildModelSyncInternalHeaders(),
    }),
    { params: { id: connection.id } }
  );

  assert.equal(response.status, 200);
  const stored = (await modelsDb.getCustomModels("soniox")) as StoredModel[];
  assert.deepEqual(stored.map((model) => model.id).sort(), importedIds);
});

test("sync still replaces imported chat rows with the discovered catalog", async () => {
  await modelsDb.addCustomModel("openai", "gpt-old-chat", "Old chat", "imported");
  await modelsDb.addCustomModel(
    "openai",
    "whisper-imported",
    "Whisper",
    "imported",
    "audio-transcriptions",
    ["audio-transcriptions"]
  );

  await importManagedModels({
    providerId: "openai",
    connectionId: "openai-media-sync-conn",
    mode: "sync",
    fetchedModels: [{ id: "gpt-5.6-sol", name: "GPT-5.6 Sol" }],
  });

  const stored = (await modelsDb.getCustomModels("openai")) as StoredModel[];
  assert.deepEqual(
    stored.map((model) => model.id),
    ["whisper-imported"]
  );
  assert.deepEqual(
    (await modelsDb.getSyncedAvailableModelsForConnection("openai", "openai-media-sync-conn")).map(
      (model) => model.id
    ),
    ["gpt-5.6-sol"]
  );
});

test("sync still replaces an imported row stored with the synthetic chat default", async () => {
  // OpenAI image rows imported before endpoint metadata existed carry ["chat"];
  // they keep the old replace-on-sync behaviour instead of becoming permanent.
  await modelsDb.addCustomModel("openai", "gpt-image-1", "GPT Image 1", "imported");

  await importManagedModels({
    providerId: "openai",
    connectionId: "openai-synthetic-chat-conn",
    mode: "sync",
    fetchedModels: [{ id: "gpt-5.6-sol", name: "GPT-5.6 Sol" }],
  });

  const stored = (await modelsDb.getCustomModels("openai")) as StoredModel[];
  assert.equal(
    stored.some((model) => model.id === "gpt-image-1"),
    false
  );
});

test("self-hosted providers keep replacing every imported row, since their discovery is unfiltered", async () => {
  await modelsDb.addCustomModel(
    "ollama-local",
    "nomic-embed-text",
    "Nomic Embed",
    "imported",
    "embeddings",
    ["embeddings"]
  );

  await importManagedModels({
    providerId: "ollama-local",
    connectionId: "ollama-local-conn",
    mode: "sync",
    fetchedModels: [{ id: "llama3.3", name: "Llama 3.3" }],
  });

  const stored = (await modelsDb.getCustomModels("ollama-local")) as StoredModel[];
  assert.deepEqual(stored, []);
});

test("a pure-auto combo does not expand imported speech models into chat targets", async () => {
  await providersDb.createProviderConnection({
    provider: "soniox",
    authType: "apikey",
    name: "Soniox auto pool",
    apiKey: "soniox-test-key",
  });
  invalidateDbCache();

  const targets = await expandAutoComboCandidatePool([], { config: {} });

  assert.deepEqual(
    targets.filter((target) => target.providerId === "soniox").map((target) => target.modelStr),
    []
  );
});
