/**
 * Tests for src/lib/db/serviceModels.ts
 *
 * Uses an isolated in-memory DB via DATA_DIR override.
 */

import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-service-models-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.NODE_ENV = "test";
process.env.DISABLE_SQLITE_AUTO_BACKUP = "true";

const core = await import("../../../src/lib/db/core.ts");
const { getServiceModels, saveServiceModels, markAllUnavailable } =
  await import("../../../src/lib/db/serviceModels.ts");

function resetDb() {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

test.beforeEach(() => {
  resetDb();
});

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

test("getServiceModels — returns [] when no row exists", () => {
  const result = getServiceModels("9router");
  assert.deepEqual(result, []);
});

test("saveServiceModels + getServiceModels — round-trips a list (with available flag)", () => {
  const models = [
    { id: "9r/gemma-3n-e4b", name: "Gemma 3n", object: "model", owned_by: "google" },
    { id: "9r/llama-3.3-70b", name: "Llama 3.3 70B", object: "model", owned_by: "meta" },
  ];
  saveServiceModels("9router", models);
  const result = getServiceModels("9router");
  assert.equal(result.length, 2);
  // Models are enriched with available: true on save.
  assert.equal(result[0].id, "9r/gemma-3n-e4b");
  assert.equal(result[0].available, true);
  assert.equal(result[1].id, "9r/llama-3.3-70b");
  assert.equal(result[1].available, true);
});

test("saveServiceModels — incoming model replaces old; old model pruned to available=false", () => {
  saveServiceModels("9router", [{ id: "old-model" }]);
  saveServiceModels("9router", [{ id: "new-model" }]);
  const result = getServiceModels("9router");
  // Both old and new are present — old is pruned (available=false), new is active.
  const byId = Object.fromEntries(result.map((m) => [m.id, m]));
  assert.ok("old-model" in byId, "old-model should persist (soft delete)");
  assert.equal(byId["old-model"].available, false);
  assert.ok("new-model" in byId, "new-model should be present");
  assert.equal(byId["new-model"].available, true);
});

test("saveServiceModels — saving empty list marks previous models as unavailable (no hard delete)", () => {
  saveServiceModels("9router", [{ id: "some-model" }]);
  saveServiceModels("9router", []);
  const result = getServiceModels("9router");
  // Pruning keeps the model around as unavailable rather than deleting.
  assert.equal(result.length, 1);
  assert.equal(result[0].id, "some-model");
  assert.equal(result[0].available, false);
});

test("models are scoped by tool — different tools don't interfere", () => {
  saveServiceModels("9router", [{ id: "nr-model" }]);
  saveServiceModels("cliproxyapi", [{ id: "cli-model" }]);

  assert.equal(getServiceModels("9router")[0].id, "nr-model");
  assert.equal(getServiceModels("cliproxyapi")[0].id, "cli-model");
});

test("getServiceModels — tolerates corrupt JSON by returning []", () => {
  const db = core.getDbInstance();
  db.prepare("INSERT OR REPLACE INTO key_value (namespace, key, value) VALUES (?, ?, ?)").run(
    "serviceModels",
    "9router",
    "not-valid-json{"
  );

  const result = getServiceModels("9router");
  assert.deepEqual(result, []);
});

test("getServiceModels — returns [] when stored value is not an array", () => {
  const db = core.getDbInstance();
  db.prepare("INSERT OR REPLACE INTO key_value (namespace, key, value) VALUES (?, ?, ?)").run(
    "serviceModels",
    "9router",
    JSON.stringify({ id: "not-an-array" })
  );

  const result = getServiceModels("9router");
  assert.deepEqual(result, []);
});

test("saveServiceModels — pruning: models missing from new payload have available=false", () => {
  // Initial save with 3 models.
  saveServiceModels("9router", [
    { id: "9router/model-a" },
    { id: "9router/model-b" },
    { id: "9router/model-c" },
  ]);

  // Second save — model-b is missing (pruned), model-c stays, model-d is new.
  saveServiceModels("9router", [{ id: "9router/model-c" }, { id: "9router/model-d" }]);

  const result = getServiceModels("9router");

  const byId = Object.fromEntries(result.map((m) => [m.id, m]));

  // model-a was in first payload but not second, should be pruned
  assert.ok("9router/model-a" in byId, "pruned model-a should still exist (soft delete)");
  assert.equal(byId["9router/model-a"].available, false, "pruned model-a should be unavailable");

  // model-b was in first payload but not second, should be pruned
  assert.ok("9router/model-b" in byId, "pruned model-b should still exist (soft delete)");
  assert.equal(byId["9router/model-b"].available, false, "pruned model-b should be unavailable");

  // model-c was in both payloads — should be available
  assert.equal(byId["9router/model-c"].available, true, "model-c should be available");

  // model-d is new — should be available
  assert.equal(byId["9router/model-d"].available, true, "model-d should be available");
});

test("saveServiceModels — incoming models are marked available=true", () => {
  saveServiceModels("9router", [{ id: "9router/cx/gpt-5-mini", name: "GPT-5 mini" }]);
  const result = getServiceModels("9router");
  assert.equal(result.length, 1);
  assert.equal(result[0].available, true);
});

test("markAllUnavailable — flips all rows for the given tool to available=false", () => {
  saveServiceModels("9router", [{ id: "9router/model-x" }, { id: "9router/model-y" }]);

  markAllUnavailable("9router");

  const result = getServiceModels("9router");
  assert.equal(result.length, 2);
  for (const m of result) {
    assert.equal(m.available, false, `${m.id} should be unavailable after markAllUnavailable`);
  }
});

test("markAllUnavailable — does not affect other tools", () => {
  saveServiceModels("9router", [{ id: "9router/model-x" }]);
  saveServiceModels("cliproxy", [{ id: "cliproxy/model-z" }]);

  markAllUnavailable("9router");

  const cliproxyModels = getServiceModels("cliproxy");
  assert.equal(cliproxyModels.length, 1);
  // cliproxy models should not have been touched
  assert.notEqual(cliproxyModels[0].available, false, "cliproxy model should not be affected");
});

test("markAllUnavailable — is a no-op when no models stored", () => {
  assert.doesNotThrow(() => markAllUnavailable("9router"));
  const result = getServiceModels("9router");
  assert.deepEqual(result, []);
});

test("available field exists on ServiceModel interface (structural check)", () => {
  saveServiceModels("9router", [{ id: "9router/test-model", available: true }]);
  const result = getServiceModels("9router");
  assert.ok("available" in result[0], "available field should be present in stored model");
});
