// #14359 — the preflight cutoff reads the quota fetcher's window data
// independently of the quota cache, so a connection the healthy override has
// stood down (or whose park expired) was still skipped pre-dispatch when the
// console reported 0% remaining. evaluateQuotaCutoff must honour the same
// healthy override the dispatch-time predicates honour.
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omni-quota-preflight-14359-"));
process.env.DATA_DIR = TEST_DATA_DIR;

// Dynamic imports are required: DATA_DIR must be set before the db modules
// open SQLite (same pattern as tests/unit/quota-cache-hydrate-5015.test.ts).
const coreDb = await import("../../src/lib/db/core.ts");
const quotaCache = await import("../../src/domain/quotaCache.ts");
const { evaluateQuotaCutoff } = await import("../../open-sse/services/quotaPreflight.ts");

const FAR_RESET = new Date(Date.now() + 4 * 24 * 3600 * 1000).toISOString();

// qwen-style quota: only the weekly window, reported fully used.
const exhaustedQuota = {
  used: 40_000,
  total: 40_000,
  percentUsed: 1,
  resetAt: FAR_RESET,
  windows: { weekly: { percentUsed: 1, resetAt: FAR_RESET } },
  limitReached: true,
};

test.after(() => {
  coreDb.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("#14359 preflight cuts off a connection whose windows report 0% remaining", () => {
  quotaCache.__clearForTests();
  const decision = evaluateQuotaCutoff(exhaustedQuota, undefined, {
    provider: "qwen-cloud-token-plan",
    connectionId: "pf-14359",
  });
  assert.equal(decision.proceed, false, "0%-remaining windows must cut off");
});

test("#14359 preflight honours the healthy override", () => {
  quotaCache.__clearForTests();
  quotaCache.markQuotaHealthy("pf-healthy-14359");

  const decision = evaluateQuotaCutoff(exhaustedQuota, undefined, {
    provider: "qwen-cloud-token-plan",
    connectionId: "pf-healthy-14359",
  });
  assert.equal(
    decision.proceed,
    true,
    "a healthy-override connection must not be skipped pre-dispatch"
  );
});
