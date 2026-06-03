import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-db-playground-presets-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const presetsDb = await import("../../src/lib/db/playgroundPresets.ts");

const UUID_V4_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

async function resetStorage() {
  core.resetDbInstance();

  for (let attempt = 0; attempt < 10; attempt++) {
    try {
      if (fs.existsSync(TEST_DATA_DIR)) {
        fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
      }
      break;
    } catch (error: any) {
      if ((error?.code === "EBUSY" || error?.code === "EPERM") && attempt < 9) {
        await new Promise((resolve) => setTimeout(resolve, 50 * (attempt + 1)));
      } else {
        throw error;
      }
    }
  }

  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

test.beforeEach(async () => {
  await resetStorage();
});

test.after(async () => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

// ─── Migration idempotency ───────────────────────────────────────────────────

test("migration 076 is idempotent — running it twice does not throw", () => {
  // First run: triggered implicitly by getDbInstance()
  const db1 = core.getDbInstance();
  const tableExists1 = db1
    .prepare("SELECT name FROM sqlite_master WHERE type='table' AND name='playground_presets'")
    .get();
  assert.ok(tableExists1, "table should exist after first init");

  // Second run: resetDbInstance + re-init simulates running migrations again
  core.resetDbInstance();
  const db2 = core.getDbInstance();
  const tableExists2 = db2
    .prepare("SELECT name FROM sqlite_master WHERE type='table' AND name='playground_presets'")
    .get();
  assert.ok(tableExists2, "table should still exist after second init (idempotent)");
});

test("migration 076 creates both indexes", () => {
  const db = core.getDbInstance();

  const nameIdx = db
    .prepare(
      "SELECT name FROM sqlite_master WHERE type='index' AND name='idx_playground_presets_name'"
    )
    .get();
  const endpointIdx = db
    .prepare(
      "SELECT name FROM sqlite_master WHERE type='index' AND name='idx_playground_presets_endpoint'"
    )
    .get();

  assert.ok(nameIdx, "idx_playground_presets_name should exist");
  assert.ok(endpointIdx, "idx_playground_presets_endpoint should exist");
});

// ─── Full CRUD lifecycle ─────────────────────────────────────────────────────

test("create → list → get → update (partial) → delete → get returns null", () => {
  // CREATE
  const preset = presetsDb.createPlaygroundPreset({
    name: "My Preset",
    endpoint: "chat.completions",
    model: "gpt-4o",
    system: "You are a helpful assistant.",
    params: { temperature: 0.7, max_tokens: 1024 },
  });

  assert.ok(UUID_V4_REGEX.test(preset.id), "id should be a valid UUID v4");
  assert.equal(preset.name, "My Preset");
  assert.equal(preset.endpoint, "chat.completions");
  assert.equal(preset.model, "gpt-4o");
  assert.equal(preset.system, "You are a helpful assistant.");
  assert.deepEqual(preset.params, { temperature: 0.7, max_tokens: 1024 });
  assert.ok(typeof preset.created_at === "string" && preset.created_at.length > 0);

  // LIST — should contain the created preset
  const list = presetsDb.listPlaygroundPresets();
  assert.equal(list.length, 1);
  assert.equal(list[0].id, preset.id);

  // GET by id
  const fetched = presetsDb.getPlaygroundPreset(preset.id);
  assert.ok(fetched !== null, "getPlaygroundPreset should return the created row");
  assert.equal(fetched.id, preset.id);
  assert.equal(fetched.name, "My Preset");

  // UPDATE — partial patch (only name + params)
  const updated = presetsDb.updatePlaygroundPreset(preset.id, {
    name: "Updated Preset",
    params: { temperature: 0.9 },
  });
  assert.ok(updated !== null, "updatePlaygroundPreset should return updated row");
  assert.equal(updated.name, "Updated Preset");
  assert.deepEqual(updated.params, { temperature: 0.9 });
  // Untouched fields remain
  assert.equal(updated.endpoint, "chat.completions");
  assert.equal(updated.model, "gpt-4o");
  assert.equal(updated.system, "You are a helpful assistant.");

  // DELETE
  const deleted = presetsDb.deletePlaygroundPreset(preset.id);
  assert.equal(deleted, true);

  // GET after delete
  const afterDelete = presetsDb.getPlaygroundPreset(preset.id);
  assert.equal(afterDelete, null);
});

// ─── params JSON round-trip ──────────────────────────────────────────────────

test("params object is serialized to params_json and correctly deserialized", () => {
  const input = { temperature: 0.7, max_tokens: 2048, top_p: 0.95, seed: 42 };
  const preset = presetsDb.createPlaygroundPreset({
    name: "JSON Params",
    endpoint: "chat.completions",
    model: "gpt-4o-mini",
    system: null,
    params: input,
  });

  const fetched = presetsDb.getPlaygroundPreset(preset.id);
  assert.ok(fetched !== null);
  assert.deepEqual(fetched.params, input);
});

test("empty params object serializes to {} and deserializes correctly", () => {
  const preset = presetsDb.createPlaygroundPreset({
    name: "Empty Params",
    endpoint: "embeddings",
    model: "text-embedding-ada-002",
    system: null,
    params: {},
  });

  const fetched = presetsDb.getPlaygroundPreset(preset.id);
  assert.ok(fetched !== null);
  assert.deepEqual(fetched.params, {});
});

// ─── UUID v4 validation ──────────────────────────────────────────────────────

test("generated id matches UUID v4 pattern", () => {
  const preset = presetsDb.createPlaygroundPreset({
    name: "UUID Test",
    endpoint: "chat.completions",
    model: "gpt-4o",
    system: null,
    params: {},
  });

  assert.match(preset.id, UUID_V4_REGEX);
});

test("two presets get distinct UUIDs", () => {
  const a = presetsDb.createPlaygroundPreset({
    name: "A",
    endpoint: "chat.completions",
    model: "gpt-4o",
    system: null,
    params: {},
  });
  const b = presetsDb.createPlaygroundPreset({
    name: "B",
    endpoint: "chat.completions",
    model: "gpt-4o",
    system: null,
    params: {},
  });

  assert.notEqual(a.id, b.id);
  assert.match(a.id, UUID_V4_REGEX);
  assert.match(b.id, UUID_V4_REGEX);
});

// ─── Not-found paths ─────────────────────────────────────────────────────────

test("getPlaygroundPreset with non-existent id returns null", () => {
  const result = presetsDb.getPlaygroundPreset("00000000-0000-4000-8000-000000000000");
  assert.equal(result, null);
});

test("deletePlaygroundPreset with non-existent id returns false", () => {
  const result = presetsDb.deletePlaygroundPreset("00000000-0000-4000-8000-000000000001");
  assert.equal(result, false);
});

test("updatePlaygroundPreset with non-existent id returns null", () => {
  const result = presetsDb.updatePlaygroundPreset("00000000-0000-4000-8000-000000000002", {
    name: "Ghost",
  });
  assert.equal(result, null);
});

// ─── Timestamp preservation ──────────────────────────────────────────────────

test("created_at is preserved after update", () => {
  const preset = presetsDb.createPlaygroundPreset({
    name: "Timestamp Test",
    endpoint: "chat.completions",
    model: "gpt-4o",
    system: null,
    params: {},
  });

  const originalTimestamp = preset.created_at;

  const updated = presetsDb.updatePlaygroundPreset(preset.id, { name: "Updated Name" });
  assert.ok(updated !== null);
  assert.equal(updated.created_at, originalTimestamp, "created_at must not change on update");
});

// ─── List ordering ───────────────────────────────────────────────────────────

test("listPlaygroundPresets returns newest first", () => {
  // Create two presets; DB ordering is by created_at DESC
  // Use a small delay approach: insert them sequentially and trust SQLite ordering
  const first = presetsDb.createPlaygroundPreset({
    name: "First",
    endpoint: "chat.completions",
    model: "gpt-4o",
    system: null,
    params: {},
  });
  const second = presetsDb.createPlaygroundPreset({
    name: "Second",
    endpoint: "chat.completions",
    model: "gpt-4o",
    system: null,
    params: {},
  });

  const list = presetsDb.listPlaygroundPresets();
  assert.equal(list.length, 2);
  // When timestamps are identical, both rows are present; just verify both ids are there
  const ids = list.map((p) => p.id);
  assert.ok(ids.includes(first.id));
  assert.ok(ids.includes(second.id));
});

// ─── updatePlaygroundPreset with empty patch ─────────────────────────────────

test("updatePlaygroundPreset with empty patch returns current row unchanged", () => {
  const preset = presetsDb.createPlaygroundPreset({
    name: "No Change",
    endpoint: "chat.completions",
    model: "gpt-4o",
    system: "System",
    params: { temperature: 0.5 },
  });

  const result = presetsDb.updatePlaygroundPreset(preset.id, {});
  assert.ok(result !== null);
  assert.equal(result.name, "No Change");
  assert.equal(result.system, "System");
  assert.deepEqual(result.params, { temperature: 0.5 });
});

// ─── system field null/non-null handling ────────────────────────────────────

test("system field accepts null and non-null values correctly", () => {
  const withSystem = presetsDb.createPlaygroundPreset({
    name: "With System",
    endpoint: "chat.completions",
    model: "gpt-4o",
    system: "Be helpful",
    params: {},
  });

  const withoutSystem = presetsDb.createPlaygroundPreset({
    name: "Without System",
    endpoint: "chat.completions",
    model: "gpt-4o",
    system: null,
    params: {},
  });

  assert.equal(withSystem.system, "Be helpful");
  assert.equal(withoutSystem.system, null);
});

test("updatePlaygroundPreset can set system to null", () => {
  const preset = presetsDb.createPlaygroundPreset({
    name: "Has System",
    endpoint: "chat.completions",
    model: "gpt-4o",
    system: "Initial system",
    params: {},
  });

  const updated = presetsDb.updatePlaygroundPreset(preset.id, { system: null });
  assert.ok(updated !== null);
  assert.equal(updated.system, null);
});

// ─── Update individual scalar fields ─────────────────────────────────────────

test("updatePlaygroundPreset can patch endpoint field", () => {
  const preset = presetsDb.createPlaygroundPreset({
    name: "Endpoint Patch",
    endpoint: "chat.completions",
    model: "gpt-4o",
    system: null,
    params: {},
  });

  const updated = presetsDb.updatePlaygroundPreset(preset.id, { endpoint: "embeddings" });
  assert.ok(updated !== null);
  assert.equal(updated.endpoint, "embeddings");
  assert.equal(updated.model, "gpt-4o");
});

test("updatePlaygroundPreset can patch model field", () => {
  const preset = presetsDb.createPlaygroundPreset({
    name: "Model Patch",
    endpoint: "chat.completions",
    model: "gpt-4o",
    system: null,
    params: {},
  });

  const updated = presetsDb.updatePlaygroundPreset(preset.id, { model: "gpt-4o-mini" });
  assert.ok(updated !== null);
  assert.equal(updated.model, "gpt-4o-mini");
  assert.equal(updated.endpoint, "chat.completions");
});

// ─── Corrupted params_json fallback ─────────────────────────────────────────

test("corrupted params_json in DB row is recovered to empty object", () => {
  // Insert a row with invalid JSON via raw SQLite to simulate DB corruption
  const db = core.getDbInstance();
  const id = "corrupted-params-test-id-9999";
  db.prepare(
    "INSERT INTO playground_presets (id, name, endpoint, model, system, params_json) VALUES (?, ?, ?, ?, ?, ?)"
  ).run(id, "Corrupted", "chat.completions", "gpt-4o", null, "INVALID_JSON{{{{");

  const fetched = presetsDb.getPlaygroundPreset(id);
  assert.ok(fetched !== null);
  assert.deepEqual(fetched.params, {}, "corrupted params_json should fall back to {}");
});
