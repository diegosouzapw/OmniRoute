import { test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omni-quota-sched-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const coreDb = await import("../../src/lib/db/core.ts");
const { canAffordRequest } = await import("../../src/lib/quota/quotaScheduler");
const { clearProviderQuota, getProviderQuota, recordProviderQuotaUsage } =
  await import("../../src/lib/quota/providerQuotaState");

async function resetStorage() {
  coreDb.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

test.beforeEach(async () => {
  await resetStorage();
});

test.after(() => {
  coreDb.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

const CONN = "test-conn-quota";
const MODEL = "test-model";

test("canAffordRequest: fails open when no budget configured", () => {
  clearProviderQuota(CONN);
  const decision = canAffordRequest(CONN, MODEL, { messages: [{ role: "user", content: "hi" }] });
  assert.equal(decision.affordable, true);
  assert.equal(decision.reason, "unconfigured");
});

test("canAffordRequest: skips exhausted budget", () => {
  clearProviderQuota(CONN);
  recordProviderQuotaUsage(CONN, MODEL, 10_000, { tokenLimit: 10_000, windowMs: 60_000 });
  const decision = canAffordRequest(CONN, MODEL, {
    messages: [{ role: "user", content: "hello world this is a request" }],
  });
  assert.equal(decision.affordable, false);
  assert.equal(decision.reason, "exhausted");
});

test("canAffordRequest: blocks when cost exceeds remaining", () => {
  clearProviderQuota(CONN);
  recordProviderQuotaUsage(CONN, MODEL, 9_000, { tokenLimit: 10_000, windowMs: 60_000 });
  const decision = canAffordRequest(CONN, MODEL, {
    messages: [{ role: "user", content: "x".repeat(4 * 800) }], // ~800 tokens
    max_tokens: 2000,
  });
  assert.equal(decision.affordable, false);
  assert.equal(decision.reason, "insufficient_budget");
});

test("canAffordRequest: allows within budget", () => {
  clearProviderQuota(CONN);
  recordProviderQuotaUsage(CONN, MODEL, 1_000, { tokenLimit: 10_000, windowMs: 60_000 });
  const decision = canAffordRequest(CONN, MODEL, { messages: [{ role: "user", content: "hi" }] });
  assert.equal(decision.affordable, true);
  assert.ok((decision.tokensRemaining ?? 0) > 0);
});

test("recordProviderQuotaUsage: seeds a row and accumulates", () => {
  clearProviderQuota(CONN);
  recordProviderQuotaUsage(CONN, MODEL, 100, { tokenLimit: 1_000, windowMs: 60_000 });
  recordProviderQuotaUsage(CONN, MODEL, 150, { tokenLimit: 1_000, windowMs: 60_000 });
  const snap = getProviderQuota(CONN, MODEL);
  assert.ok(snap);
  assert.equal(snap.tokensUsed, 250);
  assert.equal(snap.tokenLimit, 1_000);
  assert.equal(snap.tokensRemaining, 750);
});

test("getProviderQuota: returns null for unknown pair", () => {
  clearProviderQuota(CONN);
  assert.equal(getProviderQuota(CONN, "nope-model"), null);
});

test("getProviderQuota: ignores non-positive deltas", () => {
  clearProviderQuota(CONN);
  recordProviderQuotaUsage(CONN, MODEL, 0, { tokenLimit: 1_000 });
  assert.equal(getProviderQuota(CONN, MODEL), null);
});
