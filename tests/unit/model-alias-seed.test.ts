import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-alias-seed-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const modelsDb = await import("../../src/lib/db/models.ts");
const sseModelService = await import("../../src/sse/services/model.ts");
const { DEFAULT_MODEL_ALIAS_SEED, seedDefaultModelAliases } =
  await import("../../src/lib/modelAliasSeed.ts");

async function resetStorage() {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

test.beforeEach(async () => {
  await resetStorage();
});

test.after(async () => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

test("default model alias seed writes missing aliases and is idempotent", async () => {
  const first = await seedDefaultModelAliases();
  const aliases = await modelsDb.getModelAliases();

  assert.deepEqual(first.failed, []);
  assert.equal(first.applied.length, Object.keys(DEFAULT_MODEL_ALIAS_SEED).length);
  assert.equal(aliases["gemini-3.1-pro"], "agy/gemini-pro-agent");
  assert.equal(aliases["gemini-3-pro-high"], undefined);
  assert.equal(aliases["gemini-3-pro-low"], undefined);
  assert.equal(aliases["gemini-3-pro-preview"], undefined);
  assert.equal(aliases["gemini-3.1-pro-preview"], undefined);
  assert.equal(aliases["gemini-3-flash-preview"], undefined);

  const routed = await sseModelService.getModelInfo("gemini-3.1-pro");
  assert.deepEqual(routed, {
    provider: "agy",
    model: "gemini-pro-agent",
    extendedContext: false,
  });

  const second = await seedDefaultModelAliases();
  assert.equal(second.applied.length, 0);
  assert.equal(second.failed.length, 0);
  assert.equal(second.skipped.length, Object.keys(DEFAULT_MODEL_ALIAS_SEED).length);
});

test("default model alias seed preserves existing aliases and skips invalid entries", async () => {
  await modelsDb.setModelAlias("gemini-3.1-pro", "custom/canonical-model");
  await modelsDb.setModelAlias("gemini-3-pro-low", "custom/legacy-model");

  const warnings = [];
  const result = await seedDefaultModelAliases({
    logger: {
      warn: (message) => warnings.push(String(message)),
    },
    seedMap: {
      ...DEFAULT_MODEL_ALIAS_SEED,
      "broken-entry": null,
    },
  });
  const aliases = await modelsDb.getModelAliases();

  assert.equal(aliases["gemini-3.1-pro"], "custom/canonical-model");
  assert.equal(aliases["gemini-3-pro-low"], "custom/legacy-model");
  assert.ok(result.skipped.includes("gemini-3.1-pro"));
  assert.equal(result.removed.includes("gemini-3-pro-low"), false);
  assert.ok(result.failed.includes("broken-entry"));
  assert.ok(warnings.some((message) => message.includes("broken-entry")));
});

test("default model alias seed replaces superseded Gemini Pro aliases with 3.1 Pro", async () => {
  await modelsDb.setModelAlias("gemini-3-pro-high", "agy/gemini-3.1-pro-high");
  await modelsDb.setModelAlias("gemini-3-pro-low", "agy/gemini-3.1-pro-low");
  await modelsDb.setModelAlias("gemini-3-pro-preview", "agy/gemini-pro-agent");
  await modelsDb.setModelAlias("gemini-3.1-pro-preview", "agy/gemini-pro-agent");

  const result = await seedDefaultModelAliases();
  const aliases = await modelsDb.getModelAliases();

  assert.deepEqual(result.removed.sort(), [
    "gemini-3-pro-high",
    "gemini-3-pro-low",
    "gemini-3-pro-preview",
    "gemini-3.1-pro-preview",
  ]);
  assert.ok(result.applied.includes("gemini-3.1-pro"));
  assert.equal(aliases["gemini-3.1-pro"], "agy/gemini-pro-agent");
  assert.equal(aliases["gemini-3-pro-high"], undefined);
  assert.equal(aliases["gemini-3-pro-low"], undefined);
  assert.equal(aliases["gemini-3-pro-preview"], undefined);
  assert.equal(aliases["gemini-3.1-pro-preview"], undefined);
});

test("default model alias seed removes the short-lived Pro High alias", async () => {
  await modelsDb.setModelAlias("gemini-3-pro-high", "agy/gemini-pro-agent");

  const result = await seedDefaultModelAliases();
  const aliases = await modelsDb.getModelAliases();

  assert.ok(result.removed.includes("gemini-3-pro-high"));
  assert.equal(aliases["gemini-3-pro-high"], undefined);
  assert.equal(aliases["gemini-3.1-pro"], "agy/gemini-pro-agent");
});

test("default model alias seed removes the retired Gemini Flash default alias", async () => {
  await modelsDb.setModelAlias("gemini-3-flash-preview", "agy/gemini-3.5-flash-medium");

  const result = await seedDefaultModelAliases();
  const aliases = await modelsDb.getModelAliases();

  assert.deepEqual(result.removed, ["gemini-3-flash-preview"]);
  assert.equal(aliases["gemini-3-flash-preview"], undefined);
});

test("default model alias seed preserves a customized retired alias", async () => {
  await modelsDb.setModelAlias("gemini-3-flash-preview", "custom/provider-model");

  const result = await seedDefaultModelAliases();
  const aliases = await modelsDb.getModelAliases();

  assert.deepEqual(result.removed, []);
  assert.equal(aliases["gemini-3-flash-preview"], "custom/provider-model");
});
