import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(
  path.join(os.tmpdir(), "omniroute-context-reconcile-runtime-")
);
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const models = await import("../../src/lib/db/models.ts");
const overrides = await import("../../src/lib/db/modelContextOverrides.ts");
const { runContextWindowReconcile } = await import("../../src/lib/contextWindowResolver.ts");

test.beforeEach(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
});

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("runContextWindowReconcile retains an auto override across repeated synced discovery", async () => {
  // gpt-4o's static catalog window is 128K; discovery reports a real 372K.
  // This uses the live DB discovery and resolver seams, not injected pure deps.
  await models.replaceSyncedAvailableModelsForConnection("openai", "reconcile-test", [
    { id: "gpt-4o", inputTokenLimit: 372000 },
  ]);

  const first = await runContextWindowReconcile();
  assert.deepEqual(first, { scanned: 1, written: 1, removed: 0, skippedManual: 0 });
  assert.deepEqual(
    (() => {
      const record = overrides.getModelContextOverrideRecord("openai", "gpt-4o");
      return record && { realContext: record.realContext, source: record.source };
    })(),
    { realContext: 372000, source: "auto:discovery" }
  );

  const second = await runContextWindowReconcile();
  assert.deepEqual(second, { scanned: 1, written: 1, removed: 0, skippedManual: 0 });
  assert.deepEqual(
    (() => {
      const record = overrides.getModelContextOverrideRecord("openai", "gpt-4o");
      return record && { realContext: record.realContext, source: record.source };
    })(),
    { realContext: 372000, source: "auto:discovery" },
    "the persisted auto override remains rather than being removed after its first write"
  );
});
