/**
 * TDD: setEngineInDefaultCombo + normalizePipeline (new engines).
 *
 * DB isolation pattern mirrors tests/unit/db/per-engine-analytics.test.ts:
 * - Temp DATA_DIR, resetDbInstance() before each test, cleanup in test.after().
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

// ─── isolated temp DB ─────────────────────────────────────────────────────────

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-default-combo-toggle-"));
const originalDataDir = process.env.DATA_DIR;

process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../../src/lib/db/core.ts");
core.resetDbInstance();

const { getDefaultCompressionCombo, setEngineInDefaultCombo, getCompressionCombo } =
  await import("../../../src/lib/db/compressionCombos.ts");

// ─── helpers ──────────────────────────────────────────────────────────────────

function resetDb(): void {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

// ─── lifecycle ────────────────────────────────────────────────────────────────

test.beforeEach(() => {
  resetDb();
});

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
  if (originalDataDir === undefined) delete process.env.DATA_DIR;
  else process.env.DATA_DIR = originalDataDir;
});

// ─── tests ────────────────────────────────────────────────────────────────────

test("Fix #1: normalizePipeline passes through new engine IDs (headroom, session-dedup, ccr, llmlingua)", () => {
  // The default combo is seeded with [rtk, caveman]. Directly update the DB
  // to include new engine IDs, then read back via getDefaultCompressionCombo
  // to verify normalizePipeline no longer strips them.
  const db = core.getDbInstance();

  // Ensure the table is created by triggering a read first.
  const combo = getDefaultCompressionCombo();
  assert.ok(combo, "default combo should exist after table init");

  const newPipeline = JSON.stringify([
    { engine: "session-dedup" },
    { engine: "ccr" },
    { engine: "headroom" },
    { engine: "caveman", intensity: "full" },
    { engine: "llmlingua" },
  ]);
  db.prepare("UPDATE compression_combos SET pipeline = ? WHERE id = ?").run(newPipeline, combo.id);

  const reloaded = getCompressionCombo(combo.id);
  assert.ok(reloaded, "should reload the combo");
  const engineIds = reloaded.pipeline.map((s) => s.engine);
  assert.ok(engineIds.includes("headroom"), `expected headroom in pipeline, got: ${engineIds}`);
  assert.ok(
    engineIds.includes("session-dedup"),
    `expected session-dedup in pipeline, got: ${engineIds}`
  );
  assert.ok(engineIds.includes("ccr"), `expected ccr in pipeline, got: ${engineIds}`);
  assert.ok(engineIds.includes("llmlingua"), `expected llmlingua in pipeline, got: ${engineIds}`);
  assert.equal(
    reloaded.pipeline.length,
    5,
    `expected 5 steps, got ${reloaded.pipeline.length}: ${engineIds}`
  );
});

test("enabling headroom adds it to the pipeline sorted by stackPriority", () => {
  // Default pipeline is [rtk(10), caveman(20)].
  // headroom has stackPriority=15 so it should be inserted between rtk and caveman.
  const result = setEngineInDefaultCombo("headroom", true);
  assert.ok(result, "should return the updated combo");

  const engineIds = result.pipeline.map((s) => s.engine);
  assert.ok(engineIds.includes("headroom"), "headroom should be in the pipeline");

  const rtkIdx = engineIds.indexOf("rtk");
  const headroomIdx = engineIds.indexOf("headroom");
  const cavemanIdx = engineIds.indexOf("caveman");

  assert.ok(rtkIdx >= 0, "rtk should be in the pipeline");
  assert.ok(headroomIdx >= 0, "headroom should be in the pipeline");
  assert.ok(cavemanIdx >= 0, "caveman should be in the pipeline");

  assert.ok(
    rtkIdx < headroomIdx,
    `rtk(10) should come before headroom(15), got order: ${engineIds}`
  );
  assert.ok(
    headroomIdx < cavemanIdx,
    `headroom(15) should come before caveman(20), got order: ${engineIds}`
  );
});

test("enabling an engine with config persists the config", () => {
  const customConfig = { minRows: 5 };
  const result = setEngineInDefaultCombo("headroom", true, customConfig);
  assert.ok(result, "should return the updated combo");

  const headroomStep = result.pipeline.find((s) => s.engine === "headroom");
  assert.ok(headroomStep, "headroom step should be present");
  assert.deepEqual(
    headroomStep.config,
    customConfig,
    "config should be persisted on the pipeline step"
  );
});

test("updating config on an already-present engine merges correctly", () => {
  // First enable headroom
  setEngineInDefaultCombo("headroom", true);
  // Then re-enable with a config — should update the existing step, not add a duplicate
  const result = setEngineInDefaultCombo("headroom", true, { minRows: 8 });
  assert.ok(result, "should return the updated combo");

  const headroomSteps = result.pipeline.filter((s) => s.engine === "headroom");
  assert.equal(headroomSteps.length, 1, "should not duplicate the headroom step");
  assert.deepEqual(headroomSteps[0].config, { minRows: 8 });
});

test("disabling an engine removes it from the pipeline", () => {
  setEngineInDefaultCombo("headroom", true);
  const before = getDefaultCompressionCombo();
  assert.ok(
    before?.pipeline.some((s) => s.engine === "headroom"),
    "headroom should be in pipeline before disabling"
  );

  const result = setEngineInDefaultCombo("headroom", false);
  assert.ok(result, "should return the updated combo");
  assert.ok(
    !result.pipeline.some((s) => s.engine === "headroom"),
    "headroom should be removed from pipeline"
  );
});

test("Fix #2: disabling last engine produces an empty pipeline (not silently reverted to default)", () => {
  // Start with a pipeline that only has one engine by disabling everything except headroom.
  // First set a pipeline with only one known engine via a raw DB update.
  const db = core.getDbInstance();
  const combo = getDefaultCompressionCombo();
  assert.ok(combo, "default combo must exist");

  db.prepare("UPDATE compression_combos SET pipeline = ? WHERE id = ?").run(
    JSON.stringify([{ engine: "headroom" }]),
    combo.id
  );

  // Now disable headroom — result should be empty pipeline, not a fallback.
  const result = setEngineInDefaultCombo("headroom", false);
  assert.ok(result, "should return the updated combo");
  assert.equal(
    result.pipeline.length,
    0,
    `expected empty pipeline after disabling last engine, got: ${JSON.stringify(result.pipeline)}`
  );
});
