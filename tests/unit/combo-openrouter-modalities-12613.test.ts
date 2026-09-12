/**
 * #12613 — combo LCD must degrade unknown/empty-modality targets instead of
 * dropping the whole intersection. OpenRouter architecture.input_modalities
 * must also land in the canonical snapshot so a later combo walk can see them.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-12613-combo-modalities-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = process.env.API_KEY_SECRET || "catalog-12613-secret";

const core = await import("../../src/lib/db/core.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const combosDb = await import("../../src/lib/db/combos.ts");
const modelsDevSync = await import("../../src/lib/modelsDevSync.ts");
const catalog = await import("../../src/app/api/v1/models/catalog.ts");
const { intersectKnownStringArrays } =
  await import("../../src/app/api/v1/models/catalogHelpers.ts");
const { openRouterCapabilityEntry } =
  await import("../../src/app/api/v1/models/catalogOpenrouter.ts");

type CatalogEntry = {
  id: string;
  input_modalities?: string[];
  output_modalities?: string[];
};

async function resetStorage() {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
  catalog.__resetCatalogBuilderRunsForTest();
}

function capability(overrides: Record<string, unknown> = {}) {
  return {
    tool_call: null,
    reasoning: null,
    attachment: null,
    structured_output: null,
    temperature: null,
    modalities_input: JSON.stringify([]),
    modalities_output: JSON.stringify([]),
    knowledge_cutoff: null,
    release_date: null,
    last_updated: null,
    status: null,
    family: null,
    open_weights: null,
    limit_context: null,
    limit_input: null,
    limit_output: null,
    interleaved_field: null,
    ...overrides,
  };
}

test.beforeEach(async () => {
  await resetStorage();
});

test.after(async () => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("#12613 intersectKnownStringArrays ignores empty unknown arrays", () => {
  assert.deepEqual(intersectKnownStringArrays([["text", "image"], []]), ["text", "image"]);
  assert.deepEqual(intersectKnownStringArrays([["text", "image"], ["text"]]), ["text"]);
  assert.deepEqual(intersectKnownStringArrays([[], []]), []);
  assert.deepEqual(intersectKnownStringArrays([]), []);
});

test("#12613 combo with one unknown target keeps known vision modalities", async () => {
  await providersDb.createProviderConnection({
    provider: "openai",
    authType: "apikey",
    name: "openai-12613",
    apiKey: "sk-test-12613",
    isActive: true,
    testStatus: "active",
    providerSpecificData: {},
  });

  modelsDevSync.saveModelsDevCapabilities({
    openai: {
      "gpt-4o": capability({
        tool_call: true,
        reasoning: false,
        attachment: true,
        structured_output: true,
        temperature: true,
        modalities_input: JSON.stringify(["text", "image"]),
        modalities_output: JSON.stringify(["text"]),
        limit_context: 128000,
        limit_input: 128000,
        limit_output: 16384,
      }),
    },
  });

  await combosDb.createCombo({
    name: "vision-plus-unknown-12613",
    strategy: "priority",
    models: ["openai/gpt-4o", "openai/totally-unknown-model-12613"],
  });

  const response = await catalog.getUnifiedModelsResponse(
    new Request("http://localhost/api/v1/models")
  );
  if (response.status !== 200) {
    const errBody = await response.text();
    assert.fail(`catalog ${response.status}: ${errBody.slice(0, 500)}`);
  }
  const body = (await response.json()) as { data: CatalogEntry[] };
  const combo = body.data.find((m) => m.id === "vision-plus-unknown-12613");
  assert.ok(combo, "combo must be listed");
  assert.ok(
    Array.isArray(combo.input_modalities) && combo.input_modalities.includes("image"),
    `unknown target must not drop combo image modality, got ${JSON.stringify(combo.input_modalities)}`
  );
  assert.ok(
    Array.isArray(combo.output_modalities) && combo.output_modalities.includes("text"),
    `unknown target must not drop combo text output, got ${JSON.stringify(combo.output_modalities)}`
  );
});

test("#12613 upsertSyncedCapabilities writes OpenRouter modalities without wiping others", () => {
  modelsDevSync.saveModelsDevCapabilities({
    openai: {
      "gpt-4o": capability({
        modalities_input: JSON.stringify(["text", "image"]),
        modalities_output: JSON.stringify(["text"]),
      }),
    },
  });
  modelsDevSync.upsertSyncedCapabilities("openrouter", {
    "openai/gpt-4o": capability({
      tool_call: true,
      modalities_input: JSON.stringify(["text", "image"]),
      modalities_output: JSON.stringify(["text"]),
    }),
  });
  const caps = modelsDevSync.getSyncedCapabilities();
  assert.ok(caps.openai?.["gpt-4o"], "openai rows must survive upsert");
  assert.deepEqual(JSON.parse(caps.openrouter["openai/gpt-4o"].modalities_input), [
    "text",
    "image",
  ]);
});

test("#12613 openRouterCapabilityEntry rejects non-positive limits", () => {
  const entry = openRouterCapabilityEntry(
    { id: "x", context_length: -1, top_provider: { max_completion_tokens: Number.NaN } },
    ["text"],
    ["text"],
    { tool_calling: true }
  );
  assert.equal(entry?.limit_context, null);
  assert.equal(entry?.limit_output, null);
});

test("#12613 upsertSyncedCapabilities refreshes limit_output on conflict", async () => {
  modelsDevSync.upsertSyncedCapabilities("openrouter", {
    "openai/gpt-4o": {
      ...capability(),
      modalities_input: JSON.stringify(["text"]),
      modalities_output: JSON.stringify(["text"]),
      limit_output: 100,
    },
  });
  modelsDevSync.upsertSyncedCapabilities("openrouter", {
    "openai/gpt-4o": {
      ...capability(),
      modalities_input: JSON.stringify(["text", "image"]),
      modalities_output: JSON.stringify(["text"]),
      limit_output: 200,
    },
  });
  const caps = modelsDevSync.getSyncedCapabilities("openrouter", "openai/gpt-4o");
  assert.equal(caps.openrouter["openai/gpt-4o"].limit_output, 200);
  assert.deepEqual(JSON.parse(caps.openrouter["openai/gpt-4o"].modalities_input), [
    "text",
    "image",
  ]);
});
