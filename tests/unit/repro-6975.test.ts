import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-combo-embed-6975-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const modelsDb = await import("../../src/lib/db/models.ts");
const { getComboBuilderOptions } = await import("../../src/lib/combos/builderOptions.ts");

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

test("#6975 embeddings-only custom model must appear in the combo builder output", async () => {
  await modelsDb.addCustomModel("opencode", "zzz-embed-6975", "Embed Model 6975", "manual", "embeddings", [
    "embeddings",
  ]);
  const payload = await getComboBuilderOptions();
  const m = payload.providers.flatMap((p) => p.models).find((m) => m.id === "zzz-embed-6975");
  assert.ok(m, "embeddings-only custom model must appear in the combo builder output");
});

test("#6975 rerank-only custom model must appear in the combo builder output", async () => {
  await modelsDb.addCustomModel("opencode", "zzz-rerank-6975", "Rerank Model 6975", "manual", "rerank", [
    "rerank",
  ]);
  const payload = await getComboBuilderOptions();
  const m = payload.providers.flatMap((p) => p.models).find((m) => m.id === "zzz-rerank-6975");
  assert.ok(m, "rerank-only custom model must appear in the combo builder output");
});
