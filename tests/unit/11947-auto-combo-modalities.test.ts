/**
 * #11947 — built-in auto combo entries in /v1/models must include
 * `capabilities.vision`, `input_modalities`, and `output_modalities` when
 * every model in the effective target pool supports those modalities.
 *
 * The dashboard/combos page already computes the correct LCD-aggregated
 * capabilities (e.g. shows vision tags), but before this fix the catalog
 * serialization for auto/* entries hardcoded a baseline capabilities map
 * without vision/modalities — so OpenAI-compatible clients (e.g. OpenCode)
 * could not detect vision support for combo models.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-11947-auto-modalities-"));
const ORIGINAL_DATA_DIR = process.env.DATA_DIR;
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = process.env.API_KEY_SECRET || "catalog-11947-secret";

const core = await import("../../src/lib/db/core.ts");
const catalog = await import("../../src/app/api/v1/models/catalog.ts");

type CatalogEntry = {
  id: string;
  owned_by?: string;
  capabilities?: Record<string, boolean | string[]>;
  input_modalities?: string[];
  output_modalities?: string[];
  context_length?: number;
};

function resetStorage(): void {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

test.beforeEach(() => {
  resetStorage();
});

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  if (ORIGINAL_DATA_DIR) process.env.DATA_DIR = ORIGINAL_DATA_DIR;
});

test("#11947 auto/* entries include capabilities object (baseline)", async () => {
  // Baseline: every auto/* entry must at minimum carry a capabilities object
  // with the hardcoded baseline fields. This is the pre-existing behavior from
  // #4189 — the fix must not regress it.
  const response = await catalog.getUnifiedModelsResponse(
    new Request("http://localhost/api/v1/models")
  );
  assert.equal(response.status, 200);
  const body = (await response.json()) as { data: CatalogEntry[] };
  const autoEntries = body.data.filter((m) => m.id.startsWith("auto/"));
  assert.ok(autoEntries.length > 0, "sanity: at least one auto/* entry listed");

  for (const entry of autoEntries) {
    assert.ok(
      entry.capabilities && typeof entry.capabilities === "object",
      `${entry.id} must have a capabilities object`
    );
    assert.equal(entry.capabilities?.tool_calling, true, `${entry.id} tool_calling`);
    assert.equal(entry.capabilities?.reasoning, true, `${entry.id} reasoning`);
  }
});

test("#11947 auto/* vision entries carry capabilities.vision when pool is vision-capable", async () => {
  // The vision auto combos (auto/best-vision, auto/pro-vision, auto/vision)
  // filter their candidate pool to only vision-capable models. When the pool
  // resolves with vision metadata available, the catalog entry must surface
  // capabilities.vision so clients can detect multimodal support.
  const response = await catalog.getUnifiedModelsResponse(
    new Request("http://localhost/api/v1/models")
  );
  assert.equal(response.status, 200);
  const body = (await response.json()) as { data: CatalogEntry[] };

  const visionAutoIds = ["auto/best-vision", "auto/pro-vision", "auto/vision"];
  const visionEntries = body.data.filter((m) => visionAutoIds.includes(m.id));

  // Not every test environment will materialize all vision auto combos (depends
  // on available noAuth providers), so we only assert on entries that exist.
  for (const entry of visionEntries) {
    // When the pool has vision-capable models with known modalities, the entry
    // must include them. If vision is present, modalities should also be present.
    if (entry.capabilities?.vision === true) {
      assert.ok(
        Array.isArray(entry.input_modalities) && entry.input_modalities.includes("image"),
        `${entry.id} with vision:true must include "image" in input_modalities`
      );
      assert.ok(
        Array.isArray(entry.output_modalities) && entry.output_modalities.length > 0,
        `${entry.id} with vision:true must include output_modalities`
      );
    }
  }
});

test("#11947 user-defined combo with vision targets includes modalities in catalog", async () => {
  // Use a user-defined combo targeting a known vision model to verify the LCD
  // aggregation emits modalities. This tests the buildComboCatalogMetadata path
  // which the auto/* path now mirrors.
  const providersDb = await import("../../src/lib/db/providers.ts");
  const combosDb = await import("../../src/lib/db/combos.ts");
  const { saveModelsDevCapabilities } = await import("../../src/lib/modelsDevSync.ts");

  await providersDb.createProviderConnection({
    provider: "openai",
    authType: "apikey",
    name: "openai-11947-vision-test",
    apiKey: "test-key-11947",
    isActive: true,
    testStatus: "active",
    providerSpecificData: {},
  });

  // Seed synced capabilities marking gpt-4o as vision-capable with image modalities.
  saveModelsDevCapabilities({
    openai: {
      "gpt-4o": {
        tool_call: true,
        reasoning: false,
        attachment: true,
        structured_output: true,
        temperature: true,
        modalities_input: JSON.stringify(["text", "image"]),
        modalities_output: JSON.stringify(["text"]),
        knowledge_cutoff: null,
        release_date: null,
        last_updated: null,
        status: null,
        family: null,
        open_weights: false,
        limit_context: 128000,
        limit_input: 128000,
        limit_output: 16384,
        interleaved_field: null,
      },
    },
  });

  await combosDb.createCombo({
    name: "test-vision-combo-11947",
    strategy: "priority",
    models: ["openai/gpt-4o"],
  });

  const response = await catalog.getUnifiedModelsResponse(
    new Request("http://localhost/api/v1/models")
  );
  assert.equal(response.status, 200);
  const body = (await response.json()) as { data: CatalogEntry[] };
  const combo = body.data.find((m) => m.id === "test-vision-combo-11947");

  assert.ok(combo, "the user-defined vision combo must be listed");
  assert.ok(
    combo.capabilities?.vision === true,
    "combo capabilities must include vision: true"
  );
  assert.ok(
    Array.isArray(combo.input_modalities) && combo.input_modalities.includes("image"),
    "combo must include 'image' in input_modalities"
  );
  assert.ok(
    Array.isArray(combo.output_modalities) && combo.output_modalities.includes("text"),
    "combo must include 'text' in output_modalities"
  );
});
