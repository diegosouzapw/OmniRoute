/**
 * #5005 — Per-combo editable `description` field.
 *
 * The routing-combo API historically had NO `description` field: the Zod
 * `createComboSchema` / `updateComboSchema` stripped any `description` on save.
 * This proves the schema now ACCEPTS and PRESERVES `description`, and that the
 * value round-trips through the DB layer (persisted in the `data` JSON blob and
 * surfaced back by GET-style reads), with no new DB column.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-combo-desc-5005-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const { createComboSchema, updateComboSchema } = await import(
  "../../src/shared/validation/schemas.ts"
);
const core = await import("../../src/lib/db/core.ts");
const combosDb = await import("../../src/lib/db/combos.ts");

async function resetStorage() {
  core.resetDbInstance();
  if (fs.existsSync(TEST_DATA_DIR)) {
    fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
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

test("createComboSchema preserves description instead of stripping it", () => {
  const parsed = createComboSchema.parse({
    name: "Described Combo",
    models: [{ provider: "openai", model: "gpt-4.1" }],
    description: "Routes premium traffic to GPT-4.1",
  });
  assert.equal(parsed.description, "Routes premium traffic to GPT-4.1");
});

test("updateComboSchema preserves description instead of stripping it", () => {
  const parsed = updateComboSchema.parse({
    description: "Updated description text",
  });
  assert.equal(parsed.description, "Updated description text");
});

test("description round-trips through createCombo and getComboById/getComboByName", async () => {
  const created = await combosDb.createCombo({
    name: "Desc Combo",
    models: [{ provider: "openai", model: "gpt-4.1" }],
    description: "My human-friendly note",
  });
  assert.equal(created.description, "My human-friendly note");

  const byId = await combosDb.getComboById(created.id as string);
  assert.ok(byId, "combo should be retrievable by id");
  assert.equal(byId!.description, "My human-friendly note");

  const byName = await combosDb.getComboByName("Desc Combo");
  assert.ok(byName, "combo should be retrievable by name");
  assert.equal(byName!.description, "My human-friendly note");
});

test("description survives an updateCombo and is listed by getCombos", async () => {
  const created = await combosDb.createCombo({
    name: "Update Desc Combo",
    models: [{ provider: "openai", model: "gpt-4.1" }],
  });

  const updated = await combosDb.updateCombo(created.id as string, {
    description: "Added later via PUT",
  });
  assert.ok(updated);
  assert.equal(updated!.description, "Added later via PUT");

  const all = await combosDb.getCombos();
  const found = all.find((c) => c.id === created.id);
  assert.ok(found, "updated combo should appear in getCombos");
  assert.equal(found!.description, "Added later via PUT");
});
