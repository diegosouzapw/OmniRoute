import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const originalDataDir = process.env.DATA_DIR;
const testDataDir = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-auto-routing-analytics-"));
process.env.DATA_DIR = testDataDir;

const core = await import("../../src/lib/db/core.ts");
const usageLogs = await import("../../src/lib/db/usageLogs.ts");

test.before(() => {
  core.resetDbInstance();
});

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(testDataDir, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  if (originalDataDir === undefined) {
    delete process.env.DATA_DIR;
  } else {
    process.env.DATA_DIR = originalDataDir;
  }
});

test("auto-routing analytics use requested models from the runtime schema", () => {
  const db = core.getDbInstance();
  const insert = db.prepare(
    `INSERT INTO call_logs (id, model, requested_model, provider, timestamp)
     VALUES (?, ?, ?, ?, ?)`
  );
  const timestamp = new Date().toISOString();

  insert.run("auto-default", "claude-opus-5", "auto", "anthropic", timestamp);
  insert.run("auto-fast-1", "gpt-5.6-luna", "auto/fast", "openai", timestamp);
  insert.run("auto-fast-2", "gpt-5.6-terra", "auto/fast", "openai", timestamp);
  insert.run("direct", "gpt-4", "gpt-4", "openai", timestamp);

  assert.deepEqual(usageLogs.getAutoRoutingTotalCount(), { count: 3 });
  assert.deepEqual(usageLogs.getAutoRoutingVariantBreakdown(), [
    { variant: "fast", count: 2 },
    { variant: "default", count: 1 },
  ]);
  assert.deepEqual(usageLogs.getAutoRoutingTopProviders(), [
    { provider: "openai", count: 2 },
    { provider: "anthropic", count: 1 },
  ]);
});
