import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-combo-brackets-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const combosDb = await import("../../src/lib/db/combos.ts");
const schemas = await import("../../src/shared/validation/schemas.ts");
const sseModelService = await import("../../src/sse/services/model.ts");

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

test("combo schemas accept names with spaces and square brackets", () => {
  const createResult = schemas.createComboSchema.safeParse({
    name: "Claude [1m]",
  });
  const updateResult = schemas.updateComboSchema.safeParse({
    name: "Claude [1m]",
  });

  assert.equal(createResult.success, true);
  assert.equal(updateResult.success, true);
});

test("combo schemas still reject control characters and whitespace-only names", () => {
  assert.equal(schemas.createComboSchema.safeParse({ name: "Claude\n[1m]" }).success, false);
  assert.equal(schemas.updateComboSchema.safeParse({ name: "Claude\0[1m]" }).success, false);
  assert.equal(schemas.createComboSchema.safeParse({ name: "   " }).success, false);
});

test("getComboForModel treats an exact bracketed name as a combo before model suffix parsing", async () => {
  const exactCombo = await combosDb.createCombo({
    name: "Claude [1m]",
    models: [{ provider: "claude", model: "claude-sonnet-4-6" }],
  });

  await combosDb.createCombo({
    name: "Claude",
    models: [{ provider: "claude", model: "claude-opus-4-6" }],
  });

  const resolved = await sseModelService.getComboForModel("Claude [1m]");
  const parsedAsModel = sseModelService.parseModel("Claude [1m]");

  assert.equal(resolved?.id, exactCombo.id);
  assert.equal(resolved?.name, "Claude [1m]");
  assert.equal(parsedAsModel.extendedContext, true);
  assert.equal(parsedAsModel.model, "Claude");
});

test("getComboForModel does not strip bracket suffix when no exact bracketed combo exists", async () => {
  await combosDb.createCombo({
    name: "Claude",
    models: [{ provider: "claude", model: "claude-sonnet-4-6" }],
  });

  const resolved = await sseModelService.getComboForModel("Claude [1m]");
  const parsedAsModel = sseModelService.parseModel("Claude [1m]");

  assert.equal(resolved, null);
  assert.equal(parsedAsModel.extendedContext, true);
  assert.equal(parsedAsModel.model, "Claude");
});
