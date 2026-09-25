import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

// "Import from /models" on a media-only provider (Soniox, ElevenLabs, Topaz, …)
// posts every local-catalog row to POST /api/provider-models. The catalog tagged
// those rows with apiFormat "audio" / "images", which providerModelMutationSchema
// does not accept, so every POST answered 400 and nothing was imported — while the
// import dialog still reported success. The catalog must emit the same apiFormat
// values the custom-model form and the schema use.

const TEST_DATA_DIR = fs.mkdtempSync(
  path.join(os.tmpdir(), "omniroute-local-catalog-media-import-")
);
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const modelsDb = await import("../../src/lib/db/models.ts");
const providerModelsRoute = await import("../../src/app/api/provider-models/route.ts");
const { providerModelMutationSchema } = await import("../../src/shared/validation/schemas.ts");
const { getStaticModelsForProvider } = await import("../../src/lib/providers/staticModels.ts");
const { getAdobeModels } =
  await import("../../src/app/api/providers/[id]/models/adobeFireflyDiscovery.ts");
const { AUDIO_SPEECH_PROVIDERS, AUDIO_TRANSCRIPTION_PROVIDERS } =
  await import("../../open-sse/config/audioRegistry.ts");
const { IMAGE_PROVIDERS } = await import("../../open-sse/config/imageRegistry.ts");
const { VIDEO_PROVIDERS } = await import("../../open-sse/config/videoRegistry.ts");
const { EMBEDDING_PROVIDERS } = await import("../../open-sse/config/embeddingRegistry.ts");
const { RERANK_PROVIDERS } = await import("../../open-sse/config/rerankRegistry.ts");

type CatalogRow = {
  id: string;
  name?: string;
  apiFormat?: string;
  supportedEndpoints?: string[];
};

// Mirrors the body useModelImportHandlers.handleImportModels sends per model.
function importBody(provider: string, model: CatalogRow) {
  return {
    provider,
    modelId: model.id,
    modelName: model.name || model.id,
    source: "imported",
    ...(typeof model.apiFormat === "string" ? { apiFormat: model.apiFormat } : {}),
    ...(Array.isArray(model.supportedEndpoints)
      ? { supportedEndpoints: model.supportedEndpoints }
      : {}),
  };
}

function rejectedRows(provider: string, models: CatalogRow[]): string[] {
  return models
    .filter((model) => !providerModelMutationSchema.safeParse(importBody(provider, model)).success)
    .map((model) => `${provider}/${model.id} (apiFormat=${model.apiFormat})`);
}

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("every media-only local-catalog row is accepted by the provider-model schema", () => {
  const providers = new Set([
    ...Object.keys(AUDIO_SPEECH_PROVIDERS),
    ...Object.keys(AUDIO_TRANSCRIPTION_PROVIDERS),
    ...Object.keys(IMAGE_PROVIDERS),
    ...Object.keys(VIDEO_PROVIDERS),
    ...Object.keys(EMBEDDING_PROVIDERS),
    ...Object.keys(RERANK_PROVIDERS),
  ]);

  const rejected = [...providers].flatMap((provider) =>
    rejectedRows(provider, getStaticModelsForProvider(provider) || [])
  );

  assert.deepEqual(rejected, []);
});

test("Adobe Firefly catalog rows are accepted by the provider-model schema", async () => {
  const offline = (async () => {
    throw new Error("offline");
  }) as typeof fetch;
  const { models, source } = await getAdobeModels(undefined, undefined, {}, offline);

  assert.equal(source, "local_catalog");
  assert.ok(models.length > 0);
  assert.deepEqual(rejectedRows("adobe-firefly", models as CatalogRow[]), []);
});

test("importing the Soniox local catalog persists transcription and speech models", async () => {
  const catalog = getStaticModelsForProvider("soniox") || [];
  assert.ok(catalog.length > 0);

  for (const model of catalog) {
    const response = await providerModelsRoute.POST(
      new Request("http://localhost/api/provider-models", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(importBody("soniox", model)),
      })
    );
    assert.equal(response.status, 200, `import of soniox/${model.id} was rejected`);
  }

  const stored = (await modelsDb.getCustomModels("soniox")) as CatalogRow[];
  const byId = new Map(stored.map((model) => [model.id, model]));

  for (const { id } of AUDIO_TRANSCRIPTION_PROVIDERS.soniox.models) {
    assert.equal(byId.get(id)?.apiFormat, "audio-transcriptions", id);
    assert.deepEqual(byId.get(id)?.supportedEndpoints, ["audio-transcriptions"], id);
  }
  for (const { id } of AUDIO_SPEECH_PROVIDERS.soniox.models) {
    assert.equal(byId.get(id)?.apiFormat, "audio-speech", id);
    assert.deepEqual(byId.get(id)?.supportedEndpoints, ["audio-speech"], id);
  }
});
