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
const {
  clearAllModelLockouts,
  getModelLockoutInfo,
  recordModelLockoutFailure,
  recordCoreOwnedAntigravityQuotaState,
  getProviderProfile,
  shouldDeferAntigravityQuotaStateToCaller,
} = await import("../../open-sse/services/accountFallback.ts");

import {
  classify429,
  decide429,
  FULL_QUOTA_COOLDOWN_MS,
} from "../../open-sse/services/antigravity429Engine.ts";
import {
  markConnectionQuotaExhausted,
  resolveAntigravityBodyRetryHint,
} from "../../open-sse/executors/antigravity.ts";

test.after(() => {
  clearAllModelLockouts();
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
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

test("classify429: exhausted capacity with reset after 0s is rate_limited", () => {
  const message = "You have exhausted your capacity on this model. Your quota will reset after 0s.";
  const category = classify429(message);
  assert.equal(category, "rate_limited");

  const decision = decide429(category, 2_000);
  assert.equal(decision.kind, "soft_retry");
  assert.equal(decision.retryAfterMs, 2_000);
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

test("direct Antigravity body prose preserves non-authoritative provenance", () => {
  const body = JSON.stringify({
    error: { message: "Individual quota reached. Resets in 131h." },
  });

  assert.deepEqual(
    resolveAntigravityBodyRetryHint(body, "Individual quota reached. Resets in 131h."),
    { retryMs: 131 * 60 * 60_000, source: "body" }
  );
});

test("direct Antigravity structured reset remains authoritative", () => {
  const body = JSON.stringify({
    error: {
      message: "Individual quota reached.",
      details: [{ "@type": "type.googleapis.com/google.rpc.RetryInfo", retryDelay: "2h" }],
    },
  });

  assert.deepEqual(resolveAntigravityBodyRetryHint(body, "Individual quota reached."), {
    retryMs: 2 * 60 * 60_000,
    source: "google_rpc_retry_info",
  });
});

test("direct Antigravity has one downstream model-lock owner and clamps body prose", () => {
  const chatCoreSource = fs.readFileSync(
    path.resolve(import.meta.dirname, "../../open-sse/handlers/chatCore.ts"),
    "utf8"
  );
  assert.match(
    chatCoreSource,
    /accountSemaphoreKey && !deferAntigravityQuotaStateToCaller/,
    "chatCore must not apply a prose-derived Antigravity semaphore TTL"
  );
  assert.match(
    chatCoreSource,
    /Dropped generic quota cache after 429/,
    "non-Codex 429 must leave a QUOTA debug breadcrumb"
  );
  assert.match(
    chatCoreSource,
    /if \(deferAntigravityQuotaStateToCaller\)[\s\S]{0,2000}else if \(kimiRateLimitResetAt\)/
  );
  assert.doesNotMatch(chatCoreSource, /lockExactModel/);

  clearAllModelLockouts();
  const maxCooldownMs = 30 * 60_000;
  recordModelLockoutFailure(
    "antigravity",
    "direct-connection",
    "direct-model",
    "quota_exhausted",
    429,
    3_000,
    null,
    {
      exactCooldownMs: 131 * 60 * 60_000,
      maxCooldownMs,
      scope: "exact",
      exactCooldownIsUpstreamReset: false,
    }
  );
  const info = getModelLockoutInfo("antigravity", "direct-connection", "direct-model");
  assert.ok(info);
  assert.equal(info.failureCount, 1);
  assert.ok(info.remainingMs > maxCooldownMs - 5_000 && info.remainingMs <= maxCooldownMs);
});

test("Antigravity quota state is deferred only when a caller owner exists", () => {
  assert.equal(shouldDeferAntigravityQuotaStateToCaller("antigravity", true), true);
  assert.equal(shouldDeferAntigravityQuotaStateToCaller("agy", true), true);
  assert.equal(shouldDeferAntigravityQuotaStateToCaller("antigravity", false), false);
  assert.equal(shouldDeferAntigravityQuotaStateToCaller("agy", false), false);
  assert.equal(shouldDeferAntigravityQuotaStateToCaller("gemini", true), false);
});

test("core-owned Antigravity quota state applies the same provenance-aware cap", async () => {
  clearAllModelLockouts();
  const maxCooldownMs = 30 * 60_000;
  const profile = { ...getProviderProfile("antigravity"), maxCooldownMs };
  const bodyResult = await recordCoreOwnedAntigravityQuotaState({
    provider: "agy",
    connectionId: "responses-body",
    model: "direct-model",
    status: 429,
    errorText: "Individual quota reached. Resets in 131h.",
    headers: null,
    profileOverride: profile,
  });
  assert.equal(bodyResult.failureCount, 1);
  assert.ok(
    bodyResult.cooldownMs > maxCooldownMs - 5_000 && bodyResult.cooldownMs <= maxCooldownMs
  );

  const headerResult = await recordCoreOwnedAntigravityQuotaState({
    provider: "antigravity",
    connectionId: "responses-header",
    model: "direct-model",
    status: 429,
    errorText: "Individual quota reached.",
    headers: new Headers({ "Retry-After": "7200" }),
    profileOverride: profile,
  });
  assert.equal(headerResult.failureCount, 1);
  assert.ok(headerResult.cooldownMs > 2 * 60 * 60_000 - 5_000);
});
