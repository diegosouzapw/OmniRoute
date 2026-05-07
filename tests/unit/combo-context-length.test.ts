import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-combo-ctx-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const combosDb = await import("../../src/lib/db/combos.ts");
const schemas = await import("../../src/shared/validation/schemas.ts");

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

// ─── Zod Schema Validation (createComboSchema) ───

test("createComboSchema accepts valid context_length", () => {
  const result = schemas.createComboSchema.safeParse({
    name: "TestCombo",
    context_length: 128000,
  });
  assert.equal(result.success, true);
});

test("createComboSchema rejects context_length below minimum (1000)", () => {
  const result = schemas.createComboSchema.safeParse({
    name: "TestCombo",
    context_length: 999,
  });
  assert.equal(result.success, false);
});

test("createComboSchema rejects context_length above maximum (2000000)", () => {
  const result = schemas.createComboSchema.safeParse({
    name: "TestCombo",
    context_length: 2000001,
  });
  assert.equal(result.success, false);
});

test("createComboSchema accepts context_length at exact boundaries", () => {
  const min = schemas.createComboSchema.safeParse({
    name: "MinCombo",
    context_length: 1000,
  });
  assert.equal(min.success, true);

  const max = schemas.createComboSchema.safeParse({
    name: "MaxCombo",
    context_length: 2000000,
  });
  assert.equal(max.success, true);
});

test("createComboSchema rejects non-integer context_length", () => {
  const result = schemas.createComboSchema.safeParse({
    name: "TestCombo",
    context_length: 128000.5,
  });
  assert.equal(result.success, false);
});

test("createComboSchema accepts omitted context_length", () => {
  const result = schemas.createComboSchema.safeParse({
    name: "TestCombo",
  });
  assert.equal(result.success, true);
});

// ─── Zod Schema Validation (updateComboSchema) ───

test("updateComboSchema accepts valid context_length", () => {
  const result = schemas.updateComboSchema.safeParse({
    context_length: 256000,
  });
  assert.equal(result.success, true);
});

test("updateComboSchema accepts null context_length (for clearing)", () => {
  const result = schemas.updateComboSchema.safeParse({
    context_length: null,
  });
  assert.equal(result.success, true);
});

test("updateComboSchema rejects context_length below minimum", () => {
  const result = schemas.updateComboSchema.safeParse({
    context_length: 500,
  });
  assert.equal(result.success, false);
});

test("updateComboSchema rejects context_length above maximum", () => {
  const result = schemas.updateComboSchema.safeParse({
    context_length: 3000000,
  });
  assert.equal(result.success, false);
});

test("updateComboSchema rejects empty object (no fields)", () => {
  const result = schemas.updateComboSchema.safeParse({});
  assert.equal(result.success, false);
});

// ─── DB Operations ───

test("createCombo with context_length stores it correctly", async () => {
  const combo = await combosDb.createCombo({
    name: "CtxCombo",
    models: [{ provider: "openai", model: "gpt-4.1" }],
    context_length: 128000,
  });

  assert.equal(combo.context_length, 128000);

  const retrieved = await combosDb.getComboById(combo.id);
  assert.equal(retrieved?.context_length, 128000);
});

test("createCombo without context_length stores undefined", async () => {
  const combo = await combosDb.createCombo({
    name: "NoCtxCombo",
    models: [{ provider: "openai", model: "gpt-4.1" }],
  });

  assert.equal(combo.context_length, undefined);
});

test("updateCombo can set context_length", async () => {
  const combo = await combosDb.createCombo({
    name: "UpdateCtxCombo",
    models: [{ provider: "openai", model: "gpt-4.1" }],
  });

  assert.equal(combo.context_length, undefined);

  const updated = await combosDb.updateCombo(combo.id, { context_length: 256000 });
  assert.equal(updated?.context_length, 256000);

  const retrieved = await combosDb.getComboById(combo.id);
  assert.equal(retrieved?.context_length, 256000);
});

test("updateCombo can clear context_length with null", async () => {
  const combo = await combosDb.createCombo({
    name: "ClearCtxCombo",
    models: [{ provider: "openai", model: "gpt-4.1" }],
    context_length: 128000,
  });

  assert.equal(combo.context_length, 128000);

  const updated = await combosDb.updateCombo(combo.id, { context_length: null });
  assert.equal(updated?.context_length, undefined);

  const retrieved = await combosDb.getComboById(combo.id);
  assert.equal(retrieved?.context_length, undefined);
});

test("updateCombo preserves context_length when not included in update", async () => {
  const combo = await combosDb.createCombo({
    name: "PreserveCtxCombo",
    models: [{ provider: "openai", model: "gpt-4.1" }],
    context_length: 128000,
  });

  const updated = await combosDb.updateCombo(combo.id, { strategy: "round-robin" });
  assert.equal(updated?.context_length, 128000);
});

test("getCombos returns context_length for all combos", async () => {
  await combosDb.createCombo({
    name: "ComboA",
    models: [{ provider: "openai", model: "gpt-4.1" }],
    context_length: 64000,
  });
  await combosDb.createCombo({
    name: "ComboB",
    models: [{ provider: "anthropic", model: "claude-3-7-sonnet" }],
    context_length: 128000,
  });
  await combosDb.createCombo({
    name: "ComboC",
    models: [{ provider: "openai", model: "gpt-4o" }],
  });

  const combos = await combosDb.getCombos();
  const comboA = combos.find((c) => c.name === "ComboA");
  const comboB = combos.find((c) => c.name === "ComboB");
  const comboC = combos.find((c) => c.name === "ComboC");

  assert.equal(comboA?.context_length, 64000);
  assert.equal(comboB?.context_length, 128000);
  assert.equal(comboC?.context_length, undefined);
});

// ─── Edge Cases ───

test("context_length boundary value: exactly 1000", async () => {
  const combo = await combosDb.createCombo({
    name: "MinBoundary",
    models: [{ provider: "openai", model: "gpt-4.1" }],
    context_length: 1000,
  });
  assert.equal(combo.context_length, 1000);
});

test("context_length boundary value: exactly 2000000", async () => {
  const combo = await combosDb.createCombo({
    name: "MaxBoundary",
    models: [{ provider: "openai", model: "gpt-4.1" }],
    context_length: 2000000,
  });
  assert.equal(combo.context_length, 2000000);
});

test("updateCombo with context_length 0 is rejected by schema", () => {
  const result = schemas.updateComboSchema.safeParse({
    context_length: 0,
  });
  assert.equal(result.success, false);
});

test("updateCombo with negative context_length is rejected by schema", () => {
  const result = schemas.updateComboSchema.safeParse({
    context_length: -100,
  });
  assert.equal(result.success, false);
});

test("updateCombo with string context_length is rejected by schema", () => {
  const result = schemas.updateComboSchema.safeParse({
    context_length: "128000",
  } as any);
  assert.equal(result.success, false);
});
