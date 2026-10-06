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

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-runtime-unit-cap-"));
const ORIGINAL_DATA_DIR = process.env.DATA_DIR;
process.env.DATA_DIR = TEST_DATA_DIR;

const { acquire, buildAccountSemaphoreKey, resetAll } =
  await import("../../open-sse/services/accountSemaphore.ts");
const { isRuntimeUnitAtConcurrencyCap } =
  await import("../../open-sse/services/combo/runtimeUnitCapacity.ts");
const { handleComboChat } = await import("../../open-sse/services/combo.ts");
const { getDbInstance, resetDbInstance } = await import("../../src/lib/db/core.ts");
type ResolvedComboUnit = import("../../open-sse/services/combo/types.ts").ResolvedComboUnit;

const db = getDbInstance();
const databases = db.pragma("database_list") as Array<{ file?: string; name?: string }>;
const activeDbPath = databases.find((database) => database.name === "main")?.file;
assert.ok(activeDbPath, "test requires a file-backed main SQLite database");
assert.equal(
  fs.realpathSync(path.dirname(path.resolve(activeDbPath))),
  fs.realpathSync(path.resolve(TEST_DATA_DIR)),
  `active test database must be under TEST_DATA_DIR before inserts: ${activeDbPath}`
);

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
    `INSERT OR REPLACE INTO provider_connections
      (id, provider, auth_type, is_active, max_concurrent, created_at, updated_at)
     VALUES (?, ?, 'apikey', 1, ?, datetime('now'), datetime('now'))`
  ).run(id, provider, maxConcurrent);
}

test.after(() => {
  resetAll();
  resetDbInstance();
  if (ORIGINAL_DATA_DIR === undefined) delete process.env.DATA_DIR;
  else process.env.DATA_DIR = ORIGINAL_DATA_DIR;
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("isRuntimeUnitAtConcurrencyCap returns true for a model unit at cap", async () => {
  const connectionId = "conn-feather-cap";
  const provider = "featherless-ai";
  const key = buildAccountSemaphoreKey({ provider, accountKey: connectionId });
  let release1 = await acquire(key, { maxConcurrency: 2 });
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

  try {
    assert.equal(
      await isRuntimeUnitAtConcurrencyCap(unit, [], async () => 2),
      true,
      "unit should be at cap when two slots are in use"
    );

    release1();
    release1 = () => {};
    assert.equal(
      await isRuntimeUnitAtConcurrencyCap(unit, [], async () => 2),
      false,
      "unit should have headroom after one slot frees"
    );
  } finally {
    release1();
    release2();
  }
});

test("protected priority model stops at local capacity", async () => {
  const primaryConnectionId = "conn-protected-capacity";
  const provider = "featherless-ai";
  seedConnection(primaryConnectionId, provider, 1);
  const release = await acquire(
    buildAccountSemaphoreKey({ provider, accountKey: primaryConnectionId }),
    {
      maxConcurrency: 1,
    }
  );
  try {
    const calls: string[] = [];
    const combo = {
      name: "protected-model-capacity",
      strategy: "priority",
      models: [
        {
          kind: "model",
          model: "featherless-ai/deepseek-ai/DeepSeek-V4-Pro",
          providerId: provider,
          connectionId: primaryConnectionId,
          fallbackOnlyOnQuotaExhaustion: true,
        },
        { kind: "model", model: "alibaba/backup", providerId: "alibaba" },
      ],
      config: { nestedComboMode: "execute", maxRetries: 0 },
    };
    const result = await handleComboChat({
      body: {},
      combo,
      allCombos: [combo],
      log: createLog(),
      settings: null,
      isModelAvailable: async () => true,
      handleSingleModel: async (_body, modelStr) => {
        calls.push(modelStr);
        return okResponse();
      },
    });
    assert.equal(result.status, 503);
    assert.deepEqual(calls, []);
  } finally {
    release();
  }
});

test("protected priority combo-ref stops when its child is at local capacity", async () => {
  const connectionId = "conn-protected-child-capacity";
  const provider = "featherless-ai";
  seedConnection(connectionId, provider, 1);
  const release = await acquire(buildAccountSemaphoreKey({ provider, accountKey: connectionId }), {
    maxConcurrency: 1,
  });
  try {
    const child = {
      name: "protected-capacity-child",
      strategy: "priority",
      models: [
        { kind: "model", model: "featherless-ai/child", providerId: provider, connectionId },
      ],
      config: { maxRetries: 0 },
    };
    const outer = {
      name: "protected-capacity-outer",
      strategy: "priority",
      models: [
        { kind: "combo-ref", comboName: child.name, fallbackOnlyOnQuotaExhaustion: true },
        { kind: "model", model: "alibaba/backup", providerId: "alibaba" },
      ],
      config: { nestedComboMode: "execute", maxRetries: 0 },
    };
    const calls: string[] = [];
    const result = await handleComboChat({
      body: {},
      combo: outer,
      allCombos: [outer, child],
      log: createLog(),
      settings: null,
      isModelAvailable: async () => true,
      handleSingleModel: async (_body, modelStr) => {
        calls.push(modelStr);
        return okResponse();
      },
    });
    assert.equal(result.status, 503);
    assert.deepEqual(calls, []);
  } finally {
    release();
  }
});

test("protected priority unit keeps non-quota failure trust across retries", async () => {
  const primary = "runtime-retry-provider/primary";
  const paidBackup = "anthropic/paid-backup";
  const paidCombo = {
    name: "runtime-retry-paid-combo",
    strategy: "priority",
    models: [{ kind: "model", model: paidBackup, providerId: "anthropic" }],
    config: { maxRetries: 0, retryDelayMs: 0 },
  };
  const outer = {
    name: "runtime-retry-protected-outer",
    strategy: "priority",
    models: [
      {
        kind: "model",
        model: primary,
        providerId: "runtime-retry-provider",
        fallbackOnlyOnQuotaExhaustion: true,
      },
      { kind: "combo-ref", comboName: paidCombo.name },
    ],
    config: { nestedComboMode: "execute", maxRetries: 1, retryDelayMs: 0 },
  };
  const calls: string[] = [];
  const result = await handleComboChat({
    body: {},
    combo: outer,
    allCombos: [outer, paidCombo],
    log: createLog(),
    settings: null,
    isModelAvailable: async () => true,
    handleSingleModel: async (_body, modelStr) => {
      calls.push(modelStr);
      if (modelStr === paidBackup) return okResponse();
      if (calls.length === 1)
        return Response.json({ error: "Service unavailable" }, { status: 503 });
      return Response.json(
        { error: { message: "Payment required", code: "insufficient_quota" } },
        { status: 429 }
      );
    },
  });

  assert.equal(result.status, 429);
  assert.deepEqual(calls, [primary, primary]);
});

test("protected priority unit returns a successful later retry", async () => {
  const primary = "runtime-success-retry-provider/primary";
  const paidCombo = {
    name: "runtime-success-retry-paid-combo",
    strategy: "priority",
    models: [{ kind: "model", model: "anthropic/unused", providerId: "anthropic" }],
    config: { maxRetries: 0, retryDelayMs: 0 },
  };
  const outer = {
    name: "runtime-success-retry-protected-outer",
    strategy: "priority",
    models: [
      {
        kind: "model",
        model: primary,
        providerId: "runtime-success-retry-provider",
        fallbackOnlyOnQuotaExhaustion: true,
      },
      { kind: "combo-ref", comboName: paidCombo.name },
    ],
    config: { nestedComboMode: "execute", maxRetries: 1, retryDelayMs: 0 },
  };
  const calls: string[] = [];
  const result = await handleComboChat({
    body: {},
    combo: outer,
    allCombos: [outer, paidCombo],
    log: createLog(),
    settings: null,
    isModelAvailable: async () => true,
    handleSingleModel: async (_body, modelStr) => {
      calls.push(modelStr);
      return calls.length === 1
        ? Response.json({ error: "Service unavailable" }, { status: 503 })
        : okResponse();
    },
  });

  assert.equal(result.ok, true);
  assert.deepEqual(calls, [primary, primary]);
});

test("protected priority unit advances when every retry is explicit quota exhaustion", async () => {
  const primary = "runtime-quota-retry-provider/primary";
  const paidBackup = "anthropic/quota-paid-backup";
  const paidCombo = {
    name: "runtime-quota-retry-paid-combo",
    strategy: "priority",
    models: [{ kind: "model", model: paidBackup, providerId: "anthropic" }],
    config: { maxRetries: 0, retryDelayMs: 0 },
  };
  const outer = {
    name: "runtime-quota-retry-protected-outer",
    strategy: "priority",
    models: [
      {
        kind: "model",
        model: primary,
        providerId: "runtime-quota-retry-provider",
        fallbackOnlyOnQuotaExhaustion: true,
      },
      { kind: "combo-ref", comboName: paidCombo.name },
    ],
    config: { nestedComboMode: "execute", maxRetries: 1, retryDelayMs: 0 },
  };
  const calls: string[] = [];
  const result = await handleComboChat({
    body: {},
    combo: outer,
    allCombos: [outer, paidCombo],
    log: createLog(),
    settings: null,
    isModelAvailable: async () => true,
    handleSingleModel: async (_body, modelStr) => {
      calls.push(modelStr);
      if (modelStr === paidBackup) return okResponse();
      return Response.json(
        { error: { message: "Payment required", code: "insufficient_quota" } },
        { status: 429 }
      );
    },
  });

  assert.equal(result.ok, true);
  assert.deepEqual(calls, [primary, primary, paidBackup]);
});

test("nested child aggregate prevents protected parent fallback after any non-quota failure", async () => {
  const transientModel = "runtime-nested-transient/primary";
  const quotaModel = "runtime-nested-quota/primary";
  const paidBackup = "anthropic/nested-paid-backup";
  const quotaLeaf = {
    name: "runtime-nested-quota-leaf",
    strategy: "priority",
    models: [{ kind: "model", model: quotaModel, providerId: "runtime-nested-quota" }],
    config: { maxRetries: 0, retryDelayMs: 0 },
  };
  const child = {
    name: "runtime-nested-mixed-child",
    strategy: "priority",
    models: [
      { kind: "model", model: transientModel, providerId: "runtime-nested-transient" },
      { kind: "combo-ref", comboName: quotaLeaf.name },
    ],
    config: { nestedComboMode: "execute", maxRetries: 0, retryDelayMs: 0 },
  };
  const parent = {
    name: "runtime-nested-mixed-parent",
    strategy: "priority",
    models: [
      { kind: "combo-ref", comboName: child.name, fallbackOnlyOnQuotaExhaustion: true },
      { kind: "model", model: paidBackup, providerId: "anthropic" },
    ],
    config: { nestedComboMode: "execute", maxRetries: 0, retryDelayMs: 0 },
  };
  const calls: string[] = [];
  const result = await handleComboChat({
    body: {},
    combo: parent,
    allCombos: [parent, child, quotaLeaf],
    log: createLog(),
    settings: null,
    isModelAvailable: async () => true,
    handleSingleModel: async (_body, modelStr) => {
      calls.push(modelStr);
      if (modelStr === transientModel) {
        return Response.json({ error: "Service unavailable" }, { status: 503 });
      }
      if (modelStr === quotaModel) {
        return Response.json(
          { error: { message: "Payment required", code: "insufficient_quota" } },
          { status: 429 }
        );
      }
      return okResponse();
    },
  });

  assert.equal(result.status, 429);
  assert.deepEqual(calls, [transientModel, quotaModel]);
});

test("nested child aggregate treats local quality rejection as non-quota evidence", async () => {
  const invalidModel = "runtime-nested-quality/primary";
  const quotaModel = "runtime-nested-quality-quota/primary";
  const paidBackup = "anthropic/nested-quality-paid-backup";
  const quotaLeaf = {
    name: "runtime-nested-quality-quota-leaf",
    strategy: "priority",
    models: [{ kind: "model", model: quotaModel, providerId: "runtime-nested-quality-quota" }],
    config: { maxRetries: 0, retryDelayMs: 0 },
  };
  const child = {
    name: "runtime-nested-quality-child",
    strategy: "priority",
    models: [
      { kind: "model", model: invalidModel, providerId: "runtime-nested-quality" },
      { kind: "combo-ref", comboName: quotaLeaf.name },
    ],
    config: { nestedComboMode: "execute", maxRetries: 0, retryDelayMs: 0 },
  };
  const parent = {
    name: "runtime-nested-quality-parent",
    strategy: "priority",
    models: [
      { kind: "combo-ref", comboName: child.name, fallbackOnlyOnQuotaExhaustion: true },
      { kind: "model", model: paidBackup, providerId: "anthropic" },
    ],
    config: { nestedComboMode: "execute", maxRetries: 0, retryDelayMs: 0 },
  };
  const calls: string[] = [];
  const result = await handleComboChat({
    body: {},
    combo: parent,
    allCombos: [parent, child, quotaLeaf],
    log: createLog(),
    settings: null,
    isModelAvailable: async () => true,
    handleSingleModel: async (_body, modelStr) => {
      calls.push(modelStr);
      if (modelStr === invalidModel) {
        return Response.json({ choices: [{ message: {} }] }, { status: 200 });
      }
      if (modelStr === quotaModel) {
        return Response.json(
          { error: { message: "Payment required", code: "insufficient_quota" } },
          { status: 429 }
        );
      }
      return okResponse();
    },
  });

  assert.equal(result.status, 429);
  assert.deepEqual(calls, [invalidModel, quotaModel]);
});

test("nested child aggregate allows protected parent fallback when every failure is quota", async () => {
  const firstQuotaModel = "runtime-nested-quota/first";
  const secondQuotaModel = "runtime-nested-quota/second";
  const paidBackup = "anthropic/nested-all-quota-backup";
  const quotaLeaf = {
    name: "runtime-nested-all-quota-leaf",
    strategy: "priority",
    models: [{ kind: "model", model: secondQuotaModel, providerId: "runtime-nested-quota" }],
    config: { maxRetries: 0, retryDelayMs: 0 },
  };
  const child = {
    name: "runtime-nested-all-quota-child",
    strategy: "priority",
    models: [
      { kind: "model", model: firstQuotaModel, providerId: "runtime-nested-quota" },
      { kind: "combo-ref", comboName: quotaLeaf.name },
    ],
    config: { nestedComboMode: "execute", maxRetries: 0, retryDelayMs: 0 },
  };
  const parent = {
    name: "runtime-nested-all-quota-parent",
    strategy: "priority",
    models: [
      { kind: "combo-ref", comboName: child.name, fallbackOnlyOnQuotaExhaustion: true },
      { kind: "model", model: paidBackup, providerId: "anthropic" },
    ],
    config: { nestedComboMode: "execute", maxRetries: 0, retryDelayMs: 0 },
  };
  const calls: string[] = [];
  const result = await handleComboChat({
    body: {},
    combo: parent,
    allCombos: [parent, child, quotaLeaf],
    log: createLog(),
    settings: null,
    isModelAvailable: async () => true,
    handleSingleModel: async (_body, modelStr) => {
      calls.push(modelStr);
      if (modelStr === paidBackup) return okResponse();
      return Response.json(
        { error: { message: "Payment required", code: "insufficient_quota" } },
        { status: 429 }
      );
    },
  });

  assert.equal(result.ok, true);
  assert.deepEqual(calls, [firstQuotaModel, secondQuotaModel, paidBackup]);
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

  try {
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
  } finally {
    release1();
    release2();
  }
});
