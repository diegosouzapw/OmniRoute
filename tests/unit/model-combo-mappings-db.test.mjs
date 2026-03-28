import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-model-combo-db-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const combosDb = await import("../../src/lib/db/combos.ts");
const mappingsDb = await import("../../src/lib/db/modelComboMappings.ts");

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

async function createCombo(name, model) {
  return combosDb.createCombo({
    name,
    models: [{ provider: "openai", model }],
    strategy: "priority",
    config: { temperature: 0 },
  });
}

test("model combo mappings CRUD joins combo names and preserves ordering", async () => {
  const comboA = await createCombo("alpha", "gpt-4o");
  const comboB = await createCombo("beta", "claude-sonnet-4");

  const first = await mappingsDb.createModelComboMapping({
    pattern: "gpt-*",
    comboId: comboA.id,
    priority: 20,
    description: "primary",
  });
  const second = await mappingsDb.createModelComboMapping({
    pattern: "claude-*",
    comboId: comboB.id,
    priority: 20,
    enabled: false,
  });

  const all = await mappingsDb.getModelComboMappings();

  assert.equal(all.length, 2);
  assert.equal(all[0].id, first.id);
  assert.equal(all[0].comboName, "alpha");
  assert.equal(all[0].enabled, true);
  assert.equal(all[0].description, "primary");
  assert.equal(all[1].id, second.id);
  assert.equal(all[1].comboName, "beta");
  assert.equal(all[1].enabled, false);

  const fetched = await mappingsDb.getModelComboMappingById(first.id);
  assert.equal(fetched?.pattern, "gpt-*");
  assert.equal(fetched?.comboName, "alpha");
  assert.equal(fetched?.priority, 20);
});

test("updateModelComboMapping merges fields and returns the refreshed mapping", async () => {
  const comboA = await createCombo("alpha", "gpt-4o");
  const comboB = await createCombo("beta", "claude-sonnet-4");

  const created = await mappingsDb.createModelComboMapping({
    pattern: "gpt-*",
    comboId: comboA.id,
    priority: 1,
  });

  await new Promise((r) => setTimeout(r, 10));

  const updated = await mappingsDb.updateModelComboMapping(created.id, {
    pattern: "claude-*",
    comboId: comboB.id,
    priority: 99,
    enabled: false,
    description: "rerouted",
  });

  assert.ok(updated);
  assert.equal(updated?.id, created.id);
  assert.equal(updated?.pattern, "claude-*");
  assert.equal(updated?.comboId, comboB.id);
  assert.equal(updated?.comboName, "beta");
  assert.equal(updated?.priority, 99);
  assert.equal(updated?.enabled, false);
  assert.equal(updated?.description, "rerouted");
  assert.notEqual(updated?.updatedAt, created.updatedAt);
});

test("updateModelComboMapping returns null for unknown ids", async () => {
  const updated = await mappingsDb.updateModelComboMapping("missing-id", {
    pattern: "gpt-*",
  });

  assert.equal(updated, null);
});

test("deleteModelComboMapping reports whether a row existed", async () => {
  const combo = await createCombo("alpha", "gpt-4o");
  const created = await mappingsDb.createModelComboMapping({
    pattern: "gpt-*",
    comboId: combo.id,
  });

  assert.equal(await mappingsDb.deleteModelComboMapping(created.id), true);
  assert.equal(await mappingsDb.deleteModelComboMapping(created.id), false);
  assert.equal(await mappingsDb.getModelComboMappingById(created.id), null);
});

test("resolveComboForModel returns the highest-priority enabled combo", async () => {
  const fallbackCombo = await createCombo("fallback", "gpt-4o-mini");
  const priorityCombo = await createCombo("priority", "gpt-4o");
  const disabledCombo = await createCombo("disabled", "gpt-4.1");

  await mappingsDb.createModelComboMapping({
    pattern: "*",
    comboId: fallbackCombo.id,
    priority: 1,
  });
  await mappingsDb.createModelComboMapping({
    pattern: "gpt-4*",
    comboId: priorityCombo.id,
    priority: 10,
  });
  await mappingsDb.createModelComboMapping({
    pattern: "gpt-*",
    comboId: disabledCombo.id,
    priority: 100,
    enabled: false,
  });

  const resolved = await mappingsDb.resolveComboForModel("gpt-4o");

  assert.ok(resolved);
  assert.equal(resolved.name, "priority");
  assert.deepEqual(resolved.models, [{ provider: "openai", model: "gpt-4o" }]);
});

test("resolveComboForModel skips corrupted combo payloads and keeps scanning", async () => {
  const brokenCombo = await createCombo("broken", "gpt-4o");
  const fallbackCombo = await createCombo("fallback", "gpt-4o-mini");

  await mappingsDb.createModelComboMapping({
    pattern: "gpt-4*",
    comboId: brokenCombo.id,
    priority: 10,
  });
  await mappingsDb.createModelComboMapping({
    pattern: "gpt-*",
    comboId: fallbackCombo.id,
    priority: 1,
  });

  const db = core.getDbInstance();
  db.prepare("UPDATE combos SET data = ? WHERE id = ?").run("{not-json", brokenCombo.id);

  const resolved = await mappingsDb.resolveComboForModel("gpt-4o");

  assert.ok(resolved);
  assert.equal(resolved.name, "fallback");
});

test("resolveComboForModel returns null when nothing matches", async () => {
  const combo = await createCombo("alpha", "gpt-4o");

  await mappingsDb.createModelComboMapping({
    pattern: "claude-*",
    comboId: combo.id,
    enabled: false,
  });

  const resolved = await mappingsDb.resolveComboForModel("gpt-4o");

  assert.equal(resolved, null);
});
