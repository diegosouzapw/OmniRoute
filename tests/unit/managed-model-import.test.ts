import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-managed-model-import-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const modelsDb = await import("../../src/lib/db/models.ts");
const localDb = await import("../../src/lib/localDb.ts");
const { importManagedModels } = await import("../../src/lib/providerModels/managedModelImport.ts");

async function resetStorage() {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

test.beforeEach(async () => {
  await resetStorage();
});

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

test("sync mode builds aliases from provider-level synced available models", async () => {
  await modelsDb.replaceSyncedAvailableModelsForConnection("openrouter", "conn-a", [
    { id: "shared/model-a", name: "Model A", source: "imported" },
  ]);

  await importManagedModels({
    providerId: "openrouter",
    connectionId: "conn-b",
    mode: "sync",
    fetchedModels: [{ id: "shared/model-b", name: "Model B" }],
  });

  const aliases = await localDb.getModelAliases();

  assert.equal(aliases["model-a"], "openrouter/shared/model-a");
  assert.equal(aliases["model-b"], "openrouter/shared/model-b");
});

test("merge mode builds aliases from discovered models without pruning missing provider aliases", async () => {
  await modelsDb.replaceSyncedAvailableModelsForConnection("openrouter", "conn-a", [
    { id: "shared/model-a", name: "Model A", source: "imported" },
  ]);
  await localDb.setModelAlias("existing", "openrouter/shared/existing");

  await importManagedModels({
    providerId: "openrouter",
    connectionId: "conn-b",
    mode: "merge",
    fetchedModels: [{ id: "shared/model-b", name: "Model B" }],
  });

  const aliases = await localDb.getModelAliases();

  assert.equal(aliases.existing, "openrouter/shared/existing");
  assert.equal(aliases["model-a"], undefined);
  assert.equal(aliases["model-b"], "openrouter/shared/model-b");
});

test("provider-level synced model deletion removes only that provider", async () => {
  await modelsDb.replaceSyncedAvailableModelsForConnection("openrouter", "conn-a", [
    { id: "shared/model-a", name: "Model A", source: "imported" },
  ]);
  await modelsDb.replaceSyncedAvailableModelsForConnection("openrouter", "conn-b", [
    { id: "shared/model-b", name: "Model B", source: "imported" },
  ]);
  await modelsDb.replaceSyncedAvailableModelsForConnection("openai", "conn-a", [
    { id: "shared/model-c", name: "Model C", source: "imported" },
  ]);

  const removed = await modelsDb.deleteSyncedAvailableModelsForProvider("openrouter");

  assert.equal(removed, 2);
  assert.deepEqual(await modelsDb.getSyncedAvailableModels("openrouter"), []);
  assert.deepEqual(await modelsDb.getSyncedAvailableModels("openai"), [
    { id: "shared/model-c", name: "Model C", source: "imported" },
  ]);
});

test("pruning stale connection available models during import", async () => {
  const db = core.getDbInstance();
  // Insert connections
  db.prepare(
    "INSERT INTO provider_connections (id, provider, auth_type, name, is_active, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?)"
  ).run("conn-active", "openrouter", "apikey", "Active Connection", 1, "2026-05-29", "2026-05-29");

  db.prepare(
    "INSERT INTO provider_connections (id, provider, auth_type, name, is_active, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?)"
  ).run("conn-stale", "openrouter", "apikey", "Stale Connection", 0, "2026-05-29", "2026-05-29");

  // Create synced available models for both
  await modelsDb.replaceSyncedAvailableModelsForConnection("openrouter", "conn-active", [
    { id: "shared/model-active", name: "Model Active", source: "imported" },
  ]);
  await modelsDb.replaceSyncedAvailableModelsForConnection("openrouter", "conn-stale", [
    { id: "shared/model-stale", name: "Model Stale", source: "imported" },
  ]);

  // Import on conn-new
  await importManagedModels({
    providerId: "openrouter",
    connectionId: "conn-new",
    mode: "sync",
    fetchedModels: [{ id: "shared/model-new", name: "Model New" }],
  });

  // Check models for "openrouter"
  const allSyncedModels = await modelsDb.getSyncedAvailableModels("openrouter");

  // Stale connection should be pruned. Active connection and the new syncing connection should be kept.
  const ids = allSyncedModels.map((m) => m.id);
  assert.ok(ids.includes("shared/model-active"));
  assert.ok(ids.includes("shared/model-new"));
  assert.ok(!ids.includes("shared/model-stale"));
});

test("antigravity sync dynamically builds and saves mitmAlias mappings", async () => {
  const db = core.getDbInstance();
  // Create an antigravity connection
  db.prepare(
    "INSERT INTO provider_connections (id, provider, auth_type, name, is_active, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?)"
  ).run("antigravity-conn", "antigravity", "oauth", "Antigravity", 1, "2026-05-29", "2026-05-29");

  await importManagedModels({
    providerId: "antigravity",
    connectionId: "antigravity-conn",
    mode: "sync",
    fetchedModels: [
      { id: "gemini-3.5-flash", name: "Gemini 3.5 Flash" },
      { id: "custom-antigravity-model", name: "Custom Antigravity Model" },
    ],
  });

  const models = await modelsDb.getSyncedAvailableModels("antigravity");
  console.log("SYNCED MODELS IN TEST:", models);

  const mitmMappings = await modelsDb.getMitmAlias("antigravity");
  console.log("MITM MAPPINGS IN TEST:", mitmMappings);

  // Should contain standard mapping
  assert.equal(mitmMappings["gemini-3.5-flash"], "antigravity/gemini-3.5-flash");
  assert.equal(mitmMappings["custom-antigravity-model"], "antigravity/custom-antigravity-model");

  // Removed Antigravity 2.0 preview/agent aliases must not be reintroduced.
  assert.equal(mitmMappings["gemini-3.5-flash-preview"], undefined);
  assert.equal(mitmMappings["gemini-3-flash-agent"], undefined);
});
