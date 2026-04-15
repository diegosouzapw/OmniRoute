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
  assert.equal(aliases["gemini-3-pro-high"], "antigravity/gemini-3.1-pro-high");
  assert.equal(aliases["gemini-3-pro-low"], "antigravity/gemini-3.1-pro-low");
  assert.equal(aliases["gemini-3.1-pro-preview"], "antigravity/gemini-3.1-pro-high");
  assert.equal(aliases["gemini-3-flash-preview"], "antigravity/gemini-3-flash");

  const routed = await sseModelService.getModelInfo("gemini-3-pro-high");
  assert.deepEqual(routed, {
    provider: "antigravity",
    model: "gemini-3.1-pro-high",
    extendedContext: false,
  });

  const second = await seedDefaultModelAliases();
  assert.equal(second.applied.length, 0);
  assert.equal(second.failed.length, 0);
  assert.equal(second.skipped.length, Object.keys(DEFAULT_MODEL_ALIAS_SEED).length);
});

test("default model alias seed preserves existing aliases and skips invalid entries", async () => {
  await modelsDb.setModelAlias("gemini-3-pro-high", "custom/provider-model");

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

  assert.equal(aliases["gemini-3-pro-high"], "custom/provider-model");
  assert.ok(result.skipped.includes("gemini-3-pro-high"));
  assert.ok(result.failed.includes("broken-entry"));
  assert.ok(warnings.some((message) => message.includes("broken-entry")));
});
