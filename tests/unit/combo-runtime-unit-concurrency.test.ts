/**
 * @file combo-runtime-unit-concurrency.test.ts
 * @description Regression tests for execute-mode concurrency overflow (skip full units).
 *
 * @changes
 * - [2026-07-24] [Composer] - Initial execute-mode capacity overflow coverage
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import {
  acquire,
  buildAccountSemaphoreKey,
  resetAll,
} from "../../open-sse/services/accountSemaphore.ts";
import { isRuntimeUnitAtConcurrencyCap } from "../../open-sse/services/combo/runtimeUnitCapacity.ts";
import type { ResolvedComboUnit } from "../../open-sse/services/combo/types.ts";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-runtime-unit-cap-"));
const ORIGINAL_DATA_DIR = process.env.DATA_DIR;
process.env.DATA_DIR = TEST_DATA_DIR;

const { handleComboChat } = await import("../../open-sse/services/combo.ts");
const { getDbInstance, resetDbInstance } = await import("../../src/lib/db/core.ts");

function createLog() {
  return {
    info: () => {},
    warn: () => {},
    error: () => {},
    debug: () => {},
  };
}

function okResponse() {
  return new Response(JSON.stringify({ choices: [{ message: { content: "ok" } }] }), {
    status: 200,
    headers: { "content-type": "application/json" },
  });
}

function seedConnection(id: string, provider: string, maxConcurrent: number) {
  const db = getDbInstance();
  db.prepare(
    `INSERT INTO provider_connections
      (id, provider, auth_type, is_active, max_concurrent, created_at, updated_at)
     VALUES (?, ?, 'apikey', 1, ?, datetime('now'), datetime('now'))`
  ).run(id, provider, maxConcurrent);
}

test.after(() => {
  resetAll();
  resetDbInstance();
  if (ORIGINAL_DATA_DIR === undefined) delete process.env.DATA_DIR;
  else process.env.DATA_DIR = ORIGINAL_DATA_DIR;
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

test("isRuntimeUnitAtConcurrencyCap returns true for a model unit at cap", async () => {
  const connectionId = "conn-feather-cap";
  const provider = "featherless-ai";
  const key = buildAccountSemaphoreKey({ provider, accountKey: connectionId });
  const release1 = await acquire(key, { maxConcurrency: 2 });
  const release2 = await acquire(key, { maxConcurrency: 2 });

  const unit: ResolvedComboUnit = {
    kind: "model",
    stepId: "step-1",
    executionKey: "step-1",
    modelStr: "featherless-ai/deepseek-ai/DeepSeek-V4-Pro",
    provider,
    providerId: provider,
    connectionId,
    weight: 0,
    label: null,
  };

  assert.equal(
    await isRuntimeUnitAtConcurrencyCap(unit, [], async () => 2),
    true,
    "unit should be at cap when two slots are in use"
  );

  release1();
  assert.equal(
    await isRuntimeUnitAtConcurrencyCap(unit, [], async () => 2),
    false,
    "unit should have headroom after one slot frees"
  );
  release2();
});

test("execute fill-first overflows to the next unit when the first connection is at cap", async () => {
  const primaryConnectionId = "conn-primary-overflow";
  const backupConnectionId = "conn-backup-overflow";
  const provider = "featherless-ai";
  seedConnection(primaryConnectionId, provider, 2);
  seedConnection(backupConnectionId, "alibaba", 2);

  const key = buildAccountSemaphoreKey({ provider, accountKey: primaryConnectionId });
  const release1 = await acquire(key, { maxConcurrency: 2 });
  const release2 = await acquire(key, { maxConcurrency: 2 });

  const calls: string[] = [];
  const combo = {
    name: "overflow-execute",
    strategy: "fill-first",
    models: [
      {
        kind: "model",
        model: "featherless-ai/deepseek-ai/DeepSeek-V4-Pro",
        providerId: provider,
        connectionId: primaryConnectionId,
      },
      {
        kind: "model",
        model: "alibaba/qwen3.7-max-preview",
        providerId: "alibaba",
        connectionId: backupConnectionId,
      },
    ],
    config: { nestedComboMode: "execute", maxRetries: 0, retryDelayMs: 0 },
  };

  const result = await handleComboChat({
    body: {},
    combo,
    handleSingleModel: async (_body, modelStr) => {
      calls.push(modelStr);
      return okResponse();
    },
    isModelAvailable: async () => true,
    log: createLog(),
    settings: null,
    allCombos: [combo],
  });

  assert.equal(result.ok, true);
  assert.deepEqual(calls, ["alibaba/qwen3.7-max-preview"]);

  release1();
  release2();
});
