/**
 * TDD regression tests for #3707:
 * 1. `decide429("quota_exhausted")` → `full_quota_exhausted` verdict (engine contract)
 * 2. `markConnectionQuotaExhausted` persists the 24h cooldown in the DB so that
 *    cross-request and post-restart routing skips exhausted connections.
 *
 * Bug: before the fix the executor never called `setConnectionRateLimitUntil`,
 * so `isConnectionRateLimited` always returned false for AG connections that
 * had their daily quota exhausted — learned state was lost on restart.
 */

import { test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-ag-quota-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const providersDb = await import("../../src/lib/db/providers.ts");

import {
  classify429,
  decide429,
  FULL_QUOTA_COOLDOWN_MS,
} from "../../open-sse/services/antigravity429Engine.ts";
import { markConnectionQuotaExhausted } from "../../open-sse/executors/antigravity.ts";

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

// ── Engine contract (regression guard) ───────────────────────────────────────

test("decide429: quota_exhausted category → full_quota_exhausted kind with 24h cooldown", () => {
  const decision = decide429("quota_exhausted", null);
  assert.equal(decision.kind, "full_quota_exhausted");
  assert.equal(decision.retryAfterMs, FULL_QUOTA_COOLDOWN_MS);
  assert.equal(FULL_QUOTA_COOLDOWN_MS, 24 * 60 * 60 * 1000, "cooldown must be 24h");
});

test("decide429: quota_exhausted with explicit retryAfterMs preserves the provided value", () => {
  const twoDaysMs = 2 * 24 * 60 * 60 * 1000;
  const decision = decide429("quota_exhausted", twoDaysMs);
  assert.equal(decision.kind, "full_quota_exhausted");
  assert.equal(decision.retryAfterMs, twoDaysMs);
});

test("classify429: AG 'Individual quota reached' message → quota_exhausted", () => {
  const msg =
    "Individual quota reached. Contact your administrator to enable overages. Resets in 14h22m.";
  assert.equal(classify429(msg), "quota_exhausted");
});

test("classify429: AG G1 Credits Exhausted message → quota_exhausted", () => {
  assert.equal(classify429("insufficient_g1_credits_balance"), "quota_exhausted");
});

test("classify429: standard Gemini rate limit 'resource has been exhausted' -> rate_limited or unknown, not quota_exhausted", () => {
  const msg =
    "RESOURCE_EXHAUSTED: Resource has been exhausted (e.g. queries per minute limit was reached).";
  const result = classify429(msg);
  assert.notEqual(
    result,
    "quota_exhausted",
    "RESOURCE_EXHAUSTED rate limit should not be classified as quota_exhausted"
  );
});

// ── DB persistence (the missing wire — Bug #2) ───────────────────────────────

test("markConnectionQuotaExhausted persists 24h cooldown; isConnectionRateLimited returns true", async () => {
  const conn = await providersDb.createProviderConnection({
    provider: "antigravity",
    authType: "oauth",
    name: "AG Test Quota",
  });
  const connId = (conn as any).id;

  assert.equal(
    providersDb.isConnectionRateLimited(connId),
    false,
    "should start as not rate-limited"
  );

  markConnectionQuotaExhausted(connId, FULL_QUOTA_COOLDOWN_MS);

  assert.equal(
    providersDb.isConnectionRateLimited(connId),
    true,
    "should be rate-limited after marking quota exhausted"
  );
});

test("markConnectionQuotaExhausted: expired cooldown does not block the connection", async () => {
  const conn = await providersDb.createProviderConnection({
    provider: "antigravity",
    authType: "oauth",
    name: "AG Test Expired",
  });
  const connId = (conn as any).id;

  // Set cooldown in the past — simulates expired cooldown
  providersDb.setConnectionRateLimitUntil(connId, Date.now() - 1);
  assert.equal(
    providersDb.isConnectionRateLimited(connId),
    false,
    "expired cooldown should not block"
  );
});
