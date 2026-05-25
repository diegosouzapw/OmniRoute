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
const { getServiceModels, saveServiceModels } =
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

test("saveServiceModels + getServiceModels — round-trips a list", () => {
  const models = [
    { id: "9r/gemma-3n-e4b", name: "Gemma 3n", object: "model", owned_by: "google" },
    { id: "9r/llama-3.3-70b", name: "Llama 3.3 70B", object: "model", owned_by: "meta" },
  ];
  saveServiceModels("9router", models);
  const result = getServiceModels("9router");
  assert.deepEqual(result, models);
});

test("saveServiceModels — overwrites previous list", () => {
  saveServiceModels("9router", [{ id: "old-model" }]);
  saveServiceModels("9router", [{ id: "new-model" }]);
  const result = getServiceModels("9router");
  assert.equal(result.length, 1);
  assert.equal(result[0].id, "new-model");
});

test("saveServiceModels — empty list deletes the row", () => {
  saveServiceModels("9router", [{ id: "some-model" }]);
  saveServiceModels("9router", []);
  const result = getServiceModels("9router");
  assert.deepEqual(result, []);
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
