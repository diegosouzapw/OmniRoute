import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-compression-combos-"));
const ORIGINAL_DATA_DIR = process.env.DATA_DIR;
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../../src/lib/db/core.ts");
const combosDb = await import("../../../src/lib/db/compressionCombos.ts");

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
  if (ORIGINAL_DATA_DIR === undefined) {
    delete process.env.DATA_DIR;
  } else {
    process.env.DATA_DIR = ORIGINAL_DATA_DIR;
  }
});

test("creates default compression combo automatically", () => {
  const combos = combosDb.listCompressionCombos();
  const combo = combos.find((item) => item.id === "default-caveman");

  assert.equal(combo?.isDefault, true);
  assert.equal(combo?.description, "Default RTK + Caveman compression pipeline");
  assert.deepEqual(combo?.pipeline, [
    { engine: "rtk", intensity: "standard" },
    { engine: "caveman", intensity: "full" },
  ]);
});

test("upgrades the legacy seeded default compression combo pipeline", () => {
  const db = core.getDbInstance();
  db.prepare(
    `
    UPDATE compression_combos
    SET description = ?, pipeline = ?
    WHERE id = ?
  `
  ).run(
    "Default Caveman compression pipeline",
    JSON.stringify([{ engine: "caveman", intensity: "full" }]),
    "default-caveman"
  );

  const combo = combosDb.getDefaultCompressionCombo();
  assert.equal(combo?.id, "default-caveman");
  assert.equal(combo?.description, "Default RTK + Caveman compression pipeline");
  assert.deepEqual(combo?.pipeline, [
    { engine: "rtk", intensity: "standard" },
    { engine: "caveman", intensity: "full" },
  ]);
});

test("does not overwrite a customized default compression combo", () => {
  const db = core.getDbInstance();
  db.prepare(
    `
    UPDATE compression_combos
    SET name = ?, description = ?, pipeline = ?
    WHERE id = ?
  `
  ).run(
    "Custom Default",
    "User changed",
    JSON.stringify([{ engine: "caveman", intensity: "lite" }]),
    "default-caveman"
  );

  const combo = combosDb.getDefaultCompressionCombo();
  assert.equal(combo?.id, "default-caveman");
  assert.equal(combo?.name, "Custom Default");
  assert.equal(combo?.description, "User changed");
  assert.deepEqual(combo?.pipeline, [{ engine: "caveman", intensity: "lite" }]);
});

test("creates, updates and protects default compression combos", () => {
  const combo = combosDb.createCompressionCombo({
    name: "RTK first",
    pipeline: [{ engine: "rtk", intensity: "standard" }],
    languagePacks: ["en", "pt-BR"],
  });
  assert.equal(combo.name, "RTK first");
  assert.equal(combo.pipeline[0].engine, "rtk");

  const updated = combosDb.updateCompressionCombo(combo.id, {
    description: "Updated",
    isDefault: true,
  });
  assert.equal(updated?.description, "Updated");
  assert.equal(combosDb.getDefaultCompressionCombo()?.id, combo.id);

  assert.equal(combosDb.deleteCompressionCombo("default-caveman"), true);
  assert.equal(combosDb.deleteCompressionCombo(combo.id), false);
});

test("assigns routing combos to compression combos", () => {
  const combo = combosDb.createCompressionCombo({
    name: "Stacked",
    pipeline: [
      { engine: "rtk", intensity: "standard" },
      { engine: "caveman", intensity: "full" },
    ],
  });

  assert.equal(combosDb.assignRoutingCombo(combo.id, "routing-a"), true);
  assert.equal(combosDb.getCompressionComboForRoutingCombo("routing-a")?.id, combo.id);
  assert.deepEqual(
    combosDb
      .getAssignmentsForCompressionCombo(combo.id)
      .map((assignment) => assignment.routingComboId),
    ["routing-a"]
  );

  assert.equal(combosDb.updateAssignments(combo.id, ["routing-b", "routing-c"]), true);
  assert.equal(combosDb.getCompressionComboForRoutingCombo("routing-a"), null);
  assert.equal(combosDb.getCompressionComboForRoutingCombo("routing-b")?.id, combo.id);
});
