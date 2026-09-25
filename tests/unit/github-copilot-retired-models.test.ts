import test, { after, before } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-copilot-retired-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.SQLITE_FILE = path.join(TEST_DATA_DIR, "storage.sqlite");

const core = await import("../../src/lib/db/core.ts");
const modelsDb = await import("../../src/lib/db/models.ts");
const providersDb = await import("../../src/lib/db/providers.ts");

before(() => {
  core.resetDbInstance();
});

after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("GitHub Copilot sync rejects retired Gemini models", async () => {
  await modelsDb.replaceSyncedAvailableModelsForConnection("github", "copilot-current", [
    { id: "gemini-2.5-pro", name: "Gemini 2.5 Pro" },
    { id: "gemini-3-flash", name: "Gemini 3 Flash" },
    { id: "gemini-3-flash-preview", name: "Gemini 3 Flash Preview" },
    { id: "gemini-3.8-flash", name: "Gemini 3.8 Flash" },
  ]);

  const ids = (await modelsDb.getSyncedAvailableModels("github")).map((model) => model.id);
  assert.deepEqual(ids, ["gemini-3.8-flash"]);
});

test("GitHub Copilot readers hide retired models from legacy synced caches", async () => {
  const db = core.getDbInstance();
  db.prepare(
    "INSERT INTO key_value (namespace, key, value) VALUES ('syncedAvailableModels', ?, ?)"
  ).run(
    "github:copilot-legacy",
    JSON.stringify([
      { id: "gemini-2.5-pro", name: "Gemini 2.5 Pro" },
      { id: "gemini-3-flash-preview", name: "Gemini 3 Flash" },
      { id: "gemini-3.8-flash", name: "Gemini 3.8 Flash" },
    ])
  );

  const connectionIds = (
    await modelsDb.getSyncedAvailableModelsForConnection("github", "copilot-legacy")
  ).map((model) => model.id);
  const providerIds = (await modelsDb.getSyncedAvailableModels("github")).map((model) => model.id);
  const allProviderIds = (await modelsDb.getAllSyncedAvailableModels()).github.map(
    (model) => model.id
  );

  assert.deepEqual(connectionIds, ["gemini-3.8-flash"]);
  assert.deepEqual(providerIds, ["gemini-3.8-flash"]);
  assert.deepEqual(allProviderIds, ["gemini-3.8-flash"]);
});

test("provider inference does not route retired Gemini models to GitHub Copilot", async () => {
  const connection = await providersDb.createProviderConnection({
    provider: "github",
    authType: "oauth",
    name: "copilot-retired-routing",
    accessToken: "github-test-token",
    isActive: true,
    testStatus: "active",
  });
  const db = core.getDbInstance();
  db.prepare(
    "INSERT INTO key_value (namespace, key, value) VALUES ('syncedAvailableModels', ?, ?)"
  ).run(
    `github:${connection.id}`,
    JSON.stringify([
      { id: "gemini-2.5-pro", name: "Gemini 2.5 Pro" },
      { id: "gemini-3.8-flash", name: "Gemini 3.8 Flash" },
    ])
  );

  assert.deepEqual(await modelsDb.getActiveProvidersWithSyncedModel("gemini-2.5-pro"), []);
  assert.deepEqual(await modelsDb.getActiveProvidersWithSyncedModel("gemini-3.8-flash"), [
    "github",
  ]);
});

test("retirement remains scoped to GitHub Copilot", async () => {
  await modelsDb.replaceSyncedAvailableModelsForConnection("gemini", "gemini-direct", [
    { id: "gemini-2.5-pro", name: "Gemini 2.5 Pro" },
    { id: "gemini-3-flash", name: "Gemini 3 Flash" },
  ]);

  const ids = (await modelsDb.getSyncedAvailableModels("gemini")).map((model) => model.id);
  assert.deepEqual(ids, ["gemini-2.5-pro", "gemini-3-flash"]);
});

test("locally removed Copilot models cannot return through cached or newly synced data", async () => {
  const rows = [
    "gpt-5.4",
    "gpt-5.5",
    "claude-fable-5",
    "claude-sonnet-4.6",
    "grok-4.5",
    "gemini-3.7-flash",
    "mai-code-1-flash",
    "kimi-k2.7-code",
    "gpt-6-astra",
  ].map((id) => ({ id, name: id }));
  const db = core.getDbInstance();
  db.prepare(
    "INSERT INTO key_value (namespace, key, value) VALUES ('syncedAvailableModels', ?, ?)"
  ).run("github:curated-legacy", JSON.stringify(rows));
  assert.deepEqual(
    (await modelsDb.getSyncedAvailableModelsForConnection("github", "curated-legacy")).map(
      (m) => m.id
    ),
    ["gpt-6-astra"]
  );
  await modelsDb.replaceSyncedAvailableModelsForConnection("github", "curated-new", rows);
  assert.deepEqual(
    (await modelsDb.getSyncedAvailableModelsForConnection("github", "curated-new")).map(
      (m) => m.id
    ),
    ["gpt-6-astra"]
  );
});
