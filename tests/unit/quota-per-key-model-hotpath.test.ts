/**
 * tests/unit/quota-per-key-model-hotpath.test.ts
 *
 * Integration test for the per-(key, model) cap END-TO-END through the actual
 * hot-path hooks (Fase 3 #7 plumbing). Unlike quota-per-key-model.test.ts (which
 * drives recordConsumption/enforceQuotaShare directly), this proves the `model`
 * field actually flows through:
 *
 *   scheduleQuotaShareConsumption(...)  ← non-streaming POST-hook (chatCore)
 *      → scheduleRecordConsumption → recordConsumption (model-scoped bucket)
 *   enforceQuotaShare({ ..., model })    ← PRE-hook the chatCore enforce site uses
 *
 * Scenario:
 *   - Configure a cap of N requests for (keyA, modelM).
 *   - Drive N consumptions through scheduleQuotaShareConsumption({ model: modelM }).
 *   - enforceQuotaShare({ model: modelM }) → block (the hook plumbed `model`).
 *   - enforceQuotaShare({ model: modelM2 }) → allow (cap is per-model, other model free).
 *
 * If the hot-path hook ever drops `model` again (feature goes inert), the block
 * assertion fails — guarding the plumbing this PR adds.
 *
 * Part of: Group B — Quota Sharing Engine, Fase 3 #7.
 */

import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

// ── Single isolated DATA_DIR (same reset pattern as db-quota-pools.test.ts) ───
const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-model-cap-hotpath-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const { createPool, upsertAllocations } = await import("../../src/lib/db/quotaPools.ts");
const { setModelCap } = await import("../../src/lib/db/quotaModelCaps.ts");
const { enforceQuotaShare } = await import("../../src/lib/quota/enforce.ts");
const { resetQuotaStoreSingleton } = await import("../../src/lib/quota/storeFactory.ts");
const { scheduleQuotaShareConsumption } = await import(
  "../../open-sse/handlers/chatCore/quotaShareConsumption.ts"
);

// ── Fixtures ──────────────────────────────────────────────────────────────────
const CONN_ID = "conn-model-cap-hotpath";
const PROVIDER = "kimi"; // kimi has {unit:"requests", window:"hourly", limit:1500} in planRegistry
const KEY_A = "key-model-cap-hotpath-a";
const MODEL_M = "kimi-k2";
const MODEL_M2 = "kimi-k2-lite";
const CAP_N = 3; // requests

async function resetStorage() {
  resetQuotaStoreSingleton();
  core.resetDbInstance();
  for (let attempt = 0; attempt < 10; attempt++) {
    try {
      if (fs.existsSync(TEST_DATA_DIR)) {
        fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
      }
      break;
    } catch (err: unknown) {
      const code = (err as NodeJS.ErrnoException)?.code;
      if ((code === "EBUSY" || code === "EPERM") && attempt < 9) {
        await new Promise((resolve) => setTimeout(resolve, 50 * (attempt + 1)));
      } else {
        throw err;
      }
    }
  }
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

test.beforeEach(async () => {
  await resetStorage();
});

test.after(async () => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

function makePool() {
  const pool = createPool({ connectionId: CONN_ID, name: "Model Cap Hotpath Pool" });
  upsertAllocations(pool.id, [{ apiKeyId: KEY_A, weight: 100, policy: "hard" }]);
  return pool;
}

/**
 * Drive ONE consumption through the real non-streaming hot-path hook.
 * scheduleQuotaShareConsumption → scheduleRecordConsumption (setImmediate) →
 * recordConsumption. We await a macrotask tick so the setImmediate fires.
 */
async function consumeViaHotPath(model: string, requests: number) {
  for (let i = 0; i < requests; i++) {
    await scheduleQuotaShareConsumption({
      apiKeyId: KEY_A,
      connectionId: CONN_ID,
      provider: PROVIDER,
      model,
      // usage with prompt+completion tokens so buildConsumptionCost computes tokens;
      // for a "requests" cap the requests:1 field is what matters.
      usage: { prompt_tokens: 5, completion_tokens: 5 },
      estimatedCost: 0,
    });
    // Let the setImmediate-scheduled recordConsumption run before the next iteration.
    await new Promise((r) => setImmediate(r));
    await new Promise((r) => setTimeout(r, 5));
  }
}

// ---------------------------------------------------------------------------
// End-to-end: cap blocks via the hot-path hook (proves `model` is plumbed)
// ---------------------------------------------------------------------------
test("hot-path: model cap blocks after N consumptions driven through scheduleQuotaShareConsumption", async () => {
  const pool = makePool();
  setModelCap({ poolId: pool.id, apiKeyId: KEY_A, model: MODEL_M, capValue: CAP_N, capUnit: "requests" });

  // Drive CAP_N consumptions through the REAL non-streaming hot-path hook.
  await consumeViaHotPath(MODEL_M, CAP_N);

  // The enforce PRE-hook (with model, as chatCore now calls it) must block on model M.
  const blocked = await enforceQuotaShare({
    apiKeyId: KEY_A,
    connectionId: CONN_ID,
    provider: PROVIDER,
    model: MODEL_M,
    estimatedCost: {},
  });
  assert.equal(blocked.kind, "block", "model M must be blocked after N hot-path consumptions");
  assert.ok(
    "reason" in blocked && blocked.reason.includes("model-cap"),
    `reason must mention model-cap; got: ${"reason" in blocked ? blocked.reason : "(no reason)"}`,
  );

  // A different model in the SAME pool (no cap) must still be allowed.
  const allowedOther = await enforceQuotaShare({
    apiKeyId: KEY_A,
    connectionId: CONN_ID,
    provider: PROVIDER,
    model: MODEL_M2,
    estimatedCost: {},
  });
  assert.equal(allowedOther.kind, "allow", "model M2 (no cap) must still be allowed");
});

// ---------------------------------------------------------------------------
// Regression guard: hot-path WITHOUT model on enforce → no model-cap block.
// (If a caller forgets to pass model, the cap simply does not fire — fail-open.)
// ---------------------------------------------------------------------------
test("hot-path: enforce WITHOUT model never triggers model-cap block (fail-safe)", async () => {
  const pool = makePool();
  setModelCap({ poolId: pool.id, apiKeyId: KEY_A, model: MODEL_M, capValue: 1, capUnit: "requests" });

  // Consume via hot path WITH model so the bucket fills.
  await consumeViaHotPath(MODEL_M, 2);

  // Enforce WITHOUT model: the model-cap pre-check is skipped entirely.
  // (Pool-level fair-share still runs; weight=100, well under fair-share → allow.)
  const noModel = await enforceQuotaShare({
    apiKeyId: KEY_A,
    connectionId: CONN_ID,
    provider: PROVIDER,
    estimatedCost: {},
  });
  assert.equal(noModel.kind, "allow", "enforce without model → no model-cap block");
});
