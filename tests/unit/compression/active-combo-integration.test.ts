import { test, after } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-active-combo-"));
const ORIGINAL = process.env.DATA_DIR;
process.env.DATA_DIR = TEST_DATA_DIR;

const { getDbInstance, resetDbInstance } = await import("../../../src/lib/db/core.ts");
const combosDb = await import("../../../src/lib/db/compressionCombos.ts");
const { updateCompressionSettings } = await import("../../../src/lib/db/compression.ts");
const { selectCompressionPlan } =
  await import("../../../open-sse/services/compression/strategySelector.ts");
const { DEFAULT_COMPRESSION_CONFIG } =
  await import("../../../open-sse/services/compression/types.ts");

after(() => {
  resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
  if (ORIGINAL === undefined) delete process.env.DATA_DIR;
  else process.env.DATA_DIR = ORIGINAL;
});

test("an active named combo's pipeline is what selectCompressionPlan resolves, fed from the DB combos map", async () => {
  resetDbInstance();
  getDbInstance();
  const created = combosDb.createCompressionCombo({
    name: "RTK only",
    pipeline: [{ engine: "rtk", intensity: "standard" }],
  });
  await updateCompressionSettings({ enabled: true, activeComboId: created.id });

  // Mirror chatCore's load: build the combos map from the DB.
  const combos = Object.fromEntries(
    combosDb.listCompressionCombos().map((c) => [c.id, c.pipeline])
  );
  const config = { ...DEFAULT_COMPRESSION_CONFIG, enabled: true, activeComboId: created.id };
  const plan = selectCompressionPlan(config, null, 5000, undefined, undefined, combos);
  assert.equal(plan.mode, "stacked");
  assert.deepEqual(plan.stackedPipeline, [{ engine: "rtk", intensity: "standard" }]);

  // Setting activeComboId did NOT change which combo is is_default (legacy untouched).
  const def = combosDb.getDefaultCompressionCombo();
  assert.notEqual(def?.id, created.id);
});
