import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const testDataDir = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-tos-alias-15059-"));
process.env.DATA_DIR = testDataDir;
process.env.OMNIROUTE_PLUGINS_DIR = path.join(testDataDir, "plugins");
process.env.NODE_ENV = "test";
process.env.API_KEY_SECRET = "synthetic-tos-alias-15059-secret";

const { filterTosAvoidCandidates } =
  await import("../../open-sse/services/autoCombo/strictZeroCostFilter.ts");
const { FREE_MODEL_BUDGETS } = await import("../../open-sse/config/freeModelCatalog.ts");

test.after(() => {
  fs.rmSync(testDataDir, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("canonical Antigravity has the same ToS restriction as the separately registered agy ID", () => {
  const pool = [{ provider: "antigravity", model: "new-model", connectionId: "connection-a" }];
  assert.deepEqual(filterTosAvoidCandidates(pool, true, []), []);
  assert.deepEqual(filterTosAvoidCandidates([{ ...pool[0], provider: "agy" }], true, []), []);
});

test("an explicit opt-out also preserves the canonical Antigravity provider", () => {
  const pool = [{ provider: "antigravity", model: "new-model", connectionId: "connection-a" }];
  assert.equal(filterTosAvoidCandidates(pool, false, []), pool);
});

test("a specific model verdict retains precedence over the provider fallback", () => {
  const pool = [{ provider: "antigravity", model: "new-model", connectionId: "connection-a" }];
  const catalog = [
    {
      ...FREE_MODEL_BUDGETS[0],
      provider: "antigravity",
      modelId: "new-model",
      tos: "caution" as const,
    },
  ];
  assert.deepEqual(filterTosAvoidCandidates(pool, true, catalog), pool);
});
