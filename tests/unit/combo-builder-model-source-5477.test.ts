/**
 * #5477 — the combo builder's per-model option construction was extracted into a
 * shared `buildModelOptions` helper (one source of truth for the synced /
 * built-in / custom / fallback branches). This test drives the real builder and
 * locks the custom-model **source classification** branch: a custom model whose
 * stored `source` is one of api-sync/auto-sync/imported must surface as
 * `imported`, everything else as `custom`. A silent divergence in that mapping is
 * exactly what the extraction could introduce.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-combo-source-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const modelsDb = await import("../../src/lib/db/models.ts");
const { getComboBuilderOptions } = await import("../../src/lib/combos/builderOptions.ts");

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

test("#5477 buildModelOptions classifies custom-model source (manual -> custom, api-sync -> imported)", async () => {
  // Attach to a no-auth provider ("opencode") — it surfaces in the builder
  // without a configured connection, so the custom-model branch is exercised.
  await modelsDb.addCustomModel("opencode", "zzz-manual-5477", "Manual 5477", "manual");
  await modelsDb.addCustomModel("opencode", "zzz-apisync-5477", "ApiSync 5477", "api-sync");

  const payload = await getComboBuilderOptions();

  const allModels = payload.providers.flatMap((p) => p.models);
  const manual = allModels.find((m) => m.id === "zzz-manual-5477");
  const apiSync = allModels.find((m) => m.id === "zzz-apisync-5477");

  assert.ok(manual, "manual custom model must appear in the combo builder output");
  assert.ok(apiSync, "api-sync custom model must appear in the combo builder output");

  assert.equal(manual.source, "custom", "source=manual must classify as 'custom'");
  assert.equal(apiSync.source, "imported", "source=api-sync must classify as 'imported'");
});
