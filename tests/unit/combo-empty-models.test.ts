import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import assert from "node:assert/strict";
import test from "node:test";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-combo-empty-models-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const { createComboSchema, updateComboSchema } =
  await import("../../src/shared/validation/schemas/combo.ts");
const { getCopilotTool } = await import("../../src/lib/copilot/tools.ts");
const combosDb = await import("../../src/lib/db/combos.ts");
const core = await import("../../src/lib/db/core.ts");

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("an update cannot remove every model from a combo", () => {
  assert.equal(updateComboSchema.safeParse({ models: [] }).success, false);
  assert.equal(updateComboSchema.safeParse({ models: ["openai/gpt-4o-mini"] }).success, true);
  assert.equal(updateComboSchema.safeParse({ name: "renamed" }).success, true);
});

test("creating a combo without a model is refused at the boundary", () => {
  assert.equal(createComboSchema.safeParse({ name: "drafted", models: [] }).success, false);
  assert.equal(createComboSchema.safeParse({ name: "drafted" }).success, false);
});

test("the copilot createCombo tool stores targets where the router looks for them", async () => {
  const tool = getCopilotTool("createCombo");
  assert.ok(tool);

  await tool.handler({
    name: "copilot-stored",
    strategy: "priority",
    targets: JSON.stringify([{ provider: "openai", model: "gpt-4o-mini", weight: 100 }]),
  });

  const stored = (await combosDb.getComboByName("copilot-stored")) as { models?: unknown[] } | null;
  assert.ok(stored, "the combo should exist");
  assert.equal(stored.models?.length, 1);
});

test("the copilot combo list counts the targets the router will use", async () => {
  const list = getCopilotTool("listCombos");
  assert.ok(list);

  await combosDb.createCombo({
    name: "dashboard-made",
    strategy: "priority",
    models: ["openai/gpt-4o-mini", "openai/gpt-4o"],
  });

  const output = await list.handler({});
  assert.match(output, /\*\*dashboard-made\*\* — strategy: `priority` — 2 target\(s\)/);
});
