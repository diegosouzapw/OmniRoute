import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-combo-id-test-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const { getCombos, getComboById, getComboByName, deleteCombo } = await import(
  "../../src/lib/db/repositories/sqliteComboRepository.ts"
);

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("getCombos and getComboById prioritize SQLite table primary key over inner data JSON id", async () => {
  const db = core.getDbInstance();
  const rowId = "2dafe555-77d1-4e42-b795-1e5b99e2b649";
  const staleInnerId = "da8b4aad-52bc-423c-b9f5-74e2654bbd00";

  // Simulate a combo duplicated/imported where data JSON carries the template's stale id
  const dataPayload = JSON.stringify({
    id: staleInnerId,
    name: "test-mismatched-combo",
    description: "Combo with mismatched inner JSON id",
    models: [{ id: "step-1", model: "openai/gpt-4o" }],
    strategy: "priority",
  });

  db.prepare(
    `INSERT INTO combos (id, name, data, sort_order, created_at, updated_at)
     VALUES (?, ?, ?, 1, datetime('now'), datetime('now'))`
  ).run(rowId, "test-mismatched-combo", dataPayload);

  // 1. getCombos must return the authoritative table primary key
  const list = await getCombos();
  const found = list.find((c) => c.name === "test-mismatched-combo");
  assert.ok(found, "combo should be returned by getCombos");
  assert.equal(
    found.id,
    rowId,
    "getCombos must return the database row id so frontend operations target the real primary key"
  );

  // 2. getComboById querying by the rowId must return the combo with matching id
  const byId = await getComboById(rowId);
  assert.ok(byId, "combo should be found by primary key rowId");
  assert.equal(byId.id, rowId, "getComboById must normalize id to the table primary key");

  // 3. getComboByName must also normalize id to the table primary key
  const byName = await getComboByName("test-mismatched-combo");
  assert.ok(byName, "combo should be found by name");
  assert.equal(byName.id, rowId, "getComboByName must normalize id to the table primary key");

  // 4. deleteCombo using the id returned by getCombos must succeed
  const deleted = await deleteCombo(found.id as string);
  assert.equal(deleted, true, "deleteCombo with the id from getCombos must delete the row");
});
