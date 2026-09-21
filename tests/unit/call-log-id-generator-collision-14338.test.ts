/**
 * #14338 — `call_logs.id` must be collision-free across instances of the writer.
 *
 * `generateLogId()` was `${Date.now()}-${logIdCounter}` with a MODULE-level
 * counter, so any two module instances (worker threads, separate route bundles,
 * a second `import()` of the same file) that generate an id in the same
 * millisecond produce byte-identical ids and SQLite drops the second row with
 * `UNIQUE constraint failed: call_logs.id`. The catch around the insert only
 * logs, so the loss is silent and analytics undercount.
 *
 * This reproduces it the same way it happens in production: two independent
 * module instances, one shared SQLite file, the clock frozen inside the same
 * millisecond, both writing through the public `saveCallLog()`.
 *
 * Run: node --import tsx/esm --test tests/unit/call-log-id-generator-collision-14338.test.ts
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

import { useDecollidedMigrationsDir } from "./helpers/decollidedMigrationsDir.ts";

useDecollidedMigrationsDir();

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-14338-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.CALL_LOG_RETENTION_DAYS = "3650";

const core = await import("../../src/lib/db/core.ts");
// Two separate evaluations of the same module: each owns its own copy of the
// generator's per-instance state, exactly like two worker threads do.
const writerA = await import("../../src/lib/usage/callLogs.ts?instance=a");
const writerB = await import("../../src/lib/usage/callLogs.ts?instance=b");

const FROZEN_NOW = 1758470400000;
const realNow = Date.now;

function entry(marker: string) {
  return {
    provider: `provider-${marker}`,
    model: `model-${marker}`,
    requestedModel: `model-${marker}`,
    status: 200,
    method: "POST",
    path: `/v1/chat/completions`,
    durationMs: 5,
    tokens: { promptTokens: 1, completionTokens: 1, totalTokens: 2 },
  };
}

function readIds(): string[] {
  const db = core.getDbInstance();
  return (
    db.prepare("SELECT id FROM call_logs WHERE requested_model LIKE 'model-%'").all() as Array<{
      id: string;
    }>
  ).map((row) => row.id);
}

test.after(() => {
  Date.now = realNow;
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("#14338: two writer instances in the same millisecond both land a row", async () => {
  Date.now = () => FROZEN_NOW;
  try {
    await Promise.all([writerA.saveCallLog(entry("a")), writerB.saveCallLog(entry("b"))]);
    await writerA.waitForCallLogSaves(10_000);
  } finally {
    Date.now = realNow;
  }

  const ids = readIds();
  assert.equal(ids.length, 2, `both call logs must persist, got ${JSON.stringify(ids)}`);
  assert.equal(new Set(ids).size, 2, `ids must be distinct, got ${JSON.stringify(ids)}`);
});
