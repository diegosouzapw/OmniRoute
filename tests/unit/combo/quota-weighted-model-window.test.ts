/**
 * A Gemini request must not inherit the minimum of every quota window on the
 * same Antigravity account. The live incident had gemini-3.8-flash-high at
 * 100% while claude_gpt_weekly was 0%; quota-weighted then emptied the pool.
 */
import test, { after, afterEach } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { randomUUID } from "node:crypto";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-qw-window-"));
const ORIGINAL_DATA_DIR = process.env.DATA_DIR;
process.env.DATA_DIR = TEST_DATA_DIR;

const dbCore = await import("../../../src/lib/db/core.ts");
const db = await import("../../../src/lib/db/providers.ts");
const quotaCache = await import("../../../src/domain/quotaCache.ts");
const { registerQuotaFetcher } = await import("../../../open-sse/services/quotaPreflight.ts");
const { orderTargetsByQuotaWeighted } =
  await import("../../../open-sse/services/combo/quotaStrategies.ts");
const { resetAllCircuitBreakers } = await import("../../../src/shared/utils/circuitBreaker.ts");
const { _clearInflightForTest } =
  await import("../../../open-sse/services/combo/quotaShareInflight.ts");

after(() => {
  dbCore.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  if (ORIGINAL_DATA_DIR === undefined) delete process.env.DATA_DIR;
  else process.env.DATA_DIR = ORIGINAL_DATA_DIR;
});

afterEach(() => {
  quotaCache.__clearForTests();
  resetAllCircuitBreakers();
  _clearInflightForTest();
});

const resetAt = new Date(Date.now() + 86_400_000).toISOString();

function makeTarget(connectionId: string) {
  return {
    kind: "model" as const,
    stepId: `step-${connectionId}`,
    executionKey: `agy/gemini-3.8-flash-high@${connectionId}`,
    modelStr: "agy/gemini-3.8-flash-high",
    provider: "agy",
    providerId: "agy",
    connectionId,
    weight: 1,
    label: null,
  };
}

test("gemini stays eligible when another window on the same account is empty", async () => {
  const id = await db
    .createProviderConnection({
      provider: "agy",
      name: `agy-${randomUUID()}`,
      isActive: true,
      testStatus: "active",
      authType: "apikey",
    })
    .then((row) => String(row.id));
  registerQuotaFetcher("agy", async () => ({
    used: 0,
    total: 100,
    percentUsed: 0,
    resetAt,
    limitReached: false,
  }));
  quotaCache.setQuotaCache(id, "agy", {
    "gemini-3.8-flash-high": { remainingPercentage: 100, resetAt },
    claude_gpt_weekly: { remainingPercentage: 0, resetAt },
  });

  const ordered = await orderTargetsByQuotaWeighted(
    [makeTarget(id)],
    "gemini-window",
    { quotaWeightedFloorPercent: 1 },
    { warn() {} },
    null
  );

  assert.deepEqual(
    ordered.map((target) => target.connectionId),
    [id]
  );
});

test("the model-scoped remaining percent ignores an unrelated empty window", () => {
  const id = `cache-${randomUUID()}`;
  quotaCache.setQuotaCache(id, "agy", {
    "gemini-3.8-flash-high": { remainingPercentage: 100, resetAt },
    claude_gpt_weekly: { remainingPercentage: 0, resetAt },
  });

  assert.equal(
    quotaCache.getQuotaWeightedRemainingPercent(id, "agy/gemini-3.8-flash-high"),
    100
  );
  assert.equal(quotaCache.getQuotaWeightedRemainingPercent(id), 0);
});

test("codex scoring ignores the spark sibling window on the same connection", () => {
  const id = `cache-${randomUUID()}`;
  quotaCache.setQuotaCache(id, "codex", {
    weekly: { remainingPercentage: 100, resetAt },
    gpt_5_3_codex_spark_weekly: { remainingPercentage: 0, resetAt },
  });

  assert.equal(
    quotaCache.getQuotaWeightedRemainingPercent(id, "codex/gpt-5.3-codex"),
    100
  );
  assert.equal(
    quotaCache.getQuotaWeightedRemainingPercent(id, "codex/gpt-5.3-codex-spark"),
    0
  );
});

test("a 429 mark still removes the account from quota-weighted ordering", async () => {
  const id = await db
    .createProviderConnection({
      provider: "agy",
      name: `blocked-${randomUUID()}`,
      isActive: true,
      testStatus: "active",
      authType: "apikey",
    })
    .then((row) => String(row.id));
  registerQuotaFetcher("agy", async () => ({
    used: 0,
    total: 100,
    percentUsed: 0,
    resetAt,
    limitReached: false,
  }));
  quotaCache.setQuotaCache(id, "agy", {
    "gemini-3.8-flash-high": { remainingPercentage: 100, resetAt },
  });
  quotaCache.markAccountExhaustedFrom429(id, "agy");

  const ordered = await orderTargetsByQuotaWeighted(
    [makeTarget(id)],
    "account-circuit",
    { quotaWeightedFloorPercent: 1 },
    { warn() {} },
    null
  );

  assert.deepEqual(ordered, []);
});
