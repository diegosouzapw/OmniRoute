import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

// #4264: When a provider key is imported and its models are synced, the synced
// model records dropped the vision capability — OpenRouter (and other catalogs)
// declare image input via `architecture.input_modalities` / `architecture.modality`,
// but `SyncedAvailableModel` never captured it, and the `/v1/models` catalog only
// derived vision from the OpenRouter live block, which is SKIPPED once a provider
// has synced models. So vision-capable models showed up as non-vision after import.

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-or-vision-4264-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = process.env.API_KEY_SECRET || "vision-4264-secret";

const core = await import("../../src/lib/db/core.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const apiKeysDb = await import("../../src/lib/db/apiKeys.ts");
const modelDiscovery = await import("../../src/lib/providerModels/modelDiscovery.ts");
const v1ModelsCatalog = await import("../../src/app/api/v1/models/catalog.ts");

async function resetStorage() {
  core.resetDbInstance();
  apiKeysDb.resetApiKeyState();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

test.beforeEach(async () => {
  await resetStorage();
});

test.after(async () => {
  core.resetDbInstance();
  apiKeysDb.resetApiKeyState();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

test("#4264 normalizeDiscoveredModels captures vision from OpenRouter architecture", () => {
  const out = modelDiscovery.normalizeDiscoveredModels([
    {
      id: "nex-agi/nex-n2-pro:free",
      name: "Nex N2 Pro (free)",
      architecture: { modality: "text+image->text", input_modalities: ["text", "image"] },
    },
    {
      // string-form modality only (no input_modalities array)
      id: "modality/string-only",
      name: "Str modality",
      architecture: { modality: "text+image->text" },
    },
    {
      id: "some/text-only",
      name: "Text Only",
      architecture: { modality: "text->text", input_modalities: ["text"] },
    },
    {
      // top-level input_modalities (no architecture wrapper)
      id: "toplevel/vision",
      name: "Top-level modalities",
      input_modalities: ["text", "image"],
    },
  ]);
  const byId = Object.fromEntries(out.map((m: any) => [m.id, m]));

  assert.equal(byId["nex-agi/nex-n2-pro:free"].supportsVision, true);
  assert.equal(byId["modality/string-only"].supportsVision, true);
  assert.equal(byId["toplevel/vision"].supportsVision, true);
  assert.equal(byId["some/text-only"].supportsVision, undefined);
});

test("#4264 synced OpenRouter vision model surfaces capabilities.vision in /v1/models", async () => {
  const connection = await providersDb.createProviderConnection({
    provider: "openrouter",
    authType: "apikey",
    name: "openrouter-test",
    apiKey: "sk-or-test",
    isActive: true,
    testStatus: "active",
    providerSpecificData: {},
  });

  // Simulate "import models": persist the raw OpenRouter /models entries (with
  // architecture) through the real discovery path. Having synced models makes the
  // catalog use the synced path (the OpenRouter live-enrichment block is skipped),
  // which is exactly the path that dropped vision before this fix.
  await modelDiscovery.persistDiscoveredModels("openrouter", connection.id, [
    {
      id: "nex-agi/nex-n2-pro:free",
      name: "Nex AGI: Nex-N2-Pro (free)",
      architecture: { modality: "text+image->text", input_modalities: ["text", "image"] },
      context_length: 262144,
    },
    {
      id: "some/text-only-model",
      name: "Text Only Model",
      architecture: { modality: "text->text", input_modalities: ["text"] },
      context_length: 32768,
    },
  ]);

  const response = await v1ModelsCatalog.getUnifiedModelsResponse(
    new Request("http://localhost/api/v1/models")
  );
  assert.equal(response.status, 200);
  const body = (await response.json()) as any;

  const visionModel = body.data.find((m: any) =>
    String(m.id).endsWith("nex-agi/nex-n2-pro:free")
  );
  assert.ok(visionModel, `expected the synced vision model in the catalog`);
  // RED before the fix: synced models carried no capabilities at all.
  assert.equal(visionModel.capabilities?.vision, true);

  const textModel = body.data.find((m: any) => String(m.id).endsWith("some/text-only-model"));
  assert.ok(textModel, `expected the synced text-only model in the catalog`);
  assert.ok(
    !textModel.capabilities || textModel.capabilities.vision !== true,
    `text-only model must not be marked vision-capable`
  );
});
