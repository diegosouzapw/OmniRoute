import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-db-combos-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const combosDb = await import("../../src/lib/db/combos.ts");

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

test("createCombo stores default strategy and supports lookup by id and name", async () => {
  const combo = await combosDb.createCombo({
    name: "Priority Combo",
    models: [{ provider: "openai", model: "gpt-4.1" }],
  });

  assert.equal(combo.version, 2);
  assert.equal(combo.strategy, "priority");
  assert.equal(combo.sortOrder, 1);
  assert.deepEqual(combo.models, [
    {
      id: "priority-combo-model-1-openai-gpt-4-1",
      kind: "model",
      providerId: "openai",
      model: "openai/gpt-4.1",
      weight: 0,
    },
  ]);
  assert.deepEqual(await combosDb.getComboById((combo as any).id), combo);
  assert.deepEqual(await combosDb.getComboByName("Priority Combo"), combo);
});

test("getCombos returns parsed combos in persisted sort order", async () => {
  await combosDb.createCombo({
    name: "Zulu",
    models: [{ provider: "openai", model: "gpt-4.1" }],
  });
  await combosDb.createCombo({
    name: "Alpha",
    models: [{ provider: "anthropic", model: "claude-3-7-sonnet" }],
  });

  const combos = await combosDb.getCombos();

  assert.deepEqual(
    combos.map((combo) => combo.name),
    ["Zulu", "Alpha"]
  );
  assert.deepEqual(
    combos.map((combo) => combo.sortOrder),
    [1, 2]
  );
});

test("updateCombo merges fields while preserving immutable data", async () => {
  const combo = await combosDb.createCombo({
    name: "Routing Combo",
    models: [{ provider: "openai", model: "gpt-4.1" }],
    config: { retries: 1 },
  });

  const updated = await combosDb.updateCombo((combo as any).id, {
    strategy: "round-robin",
    config: { retries: 3, timeoutMs: 2000 },
    isHidden: true,
  });

  assert.equal(updated.id, combo.id);
  assert.equal(updated.name, "Routing Combo");
  assert.deepEqual(updated.models, combo.models);
  assert.deepEqual(updated.config, { retries: 3, timeoutMs: 2000 });
  assert.equal(updated.strategy, "round-robin");
  assert.equal(updated.isHidden, true);
  assert.deepEqual(await combosDb.getComboById((combo as any).id), updated);
});

test("reorderCombos persists manual combo ordering in sqlite", async () => {
  const alpha = await combosDb.createCombo({
    name: "Alpha",
    models: [{ provider: "openai", model: "gpt-4.1" }],
  });
  const bravo = await combosDb.createCombo({
    name: "Bravo",
    models: [{ provider: "anthropic", model: "claude-3-7-sonnet" }],
  });
  const charlie = await combosDb.createCombo({
    name: "Charlie",
    models: [{ provider: "google", model: "gemini-2.5-pro" }],
  });

  const reordered = await combosDb.reorderCombos([charlie.id, alpha.id, bravo.id]);

  assert.deepEqual(
    reordered.map((combo) => combo.name),
    ["Charlie", "Alpha", "Bravo"]
  );
  assert.deepEqual(
    reordered.map((combo) => combo.sortOrder),
    [1, 2, 3]
  );
  assert.equal((await combosDb.getComboById((charlie as any).id))?.sortOrder, 1);
  assert.equal((await combosDb.getComboById((alpha as any).id))?.sortOrder, 2);
  assert.equal((await combosDb.getComboById((bravo as any).id))?.sortOrder, 3);
});

test("deleteCombo reports missing ids and removes existing rows", async () => {
  const combo = await combosDb.createCombo({
    name: "Delete Me",
    models: [{ provider: "openai", model: "gpt-4.1-mini" }],
  });

  assert.equal(await combosDb.deleteCombo("missing-combo"), false);
  assert.equal(await combosDb.deleteCombo((combo as any).id), true);
  assert.equal(await combosDb.getComboById((combo as any).id), null);
});

test("getCombos upgrades legacy persisted entries to version 2 and resolves combo refs", async () => {
  const db = core.getDbInstance();
  const now = new Date().toISOString();

  db.prepare(
    "INSERT INTO combos (id, name, data, sort_order, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?)"
  ).run(
    "combo-child",
    "child",
    JSON.stringify({
      id: "combo-child",
      name: "child",
      models: ["openai/gpt-4o-mini"],
      strategy: "priority",
      createdAt: now,
      updatedAt: now,
    }),
    1,
    now,
    now
  );

  db.prepare(
    "INSERT INTO combos (id, name, data, sort_order, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?)"
  ).run(
    "combo-parent",
    "parent",
    JSON.stringify({
      id: "combo-parent",
      name: "parent",
      models: ["child", { model: "anthropic/claude-sonnet-4", weight: 2 }],
      strategy: "priority",
      createdAt: now,
      updatedAt: now,
    }),
    2,
    now,
    now
  );

  const combos = await combosDb.getCombos();
  const parent = combos.find((combo) => combo.name === "parent");

  assert.ok(parent);
  assert.equal(parent.version, 2);
  assert.deepEqual(parent.models, [
    {
      id: "parent-ref-1-child",
      kind: "combo-ref",
      comboName: "child",
      weight: 0,
    },
    {
      id: "parent-model-2-anthropic-claude-sonnet-4",
      kind: "model",
      providerId: "anthropic",
      model: "anthropic/claude-sonnet-4",
      weight: 2,
    },
  ]);
});
