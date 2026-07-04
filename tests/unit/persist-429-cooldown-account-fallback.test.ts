/**
 * TDD regression tests for the per-connection 429 cascade DB persistence.
 *
 * Bug: before this fix, `applyErrorState` (open-sse/services/accountFallback.ts)
 * marked a connection rate-limited IN-MEMORY ONLY — the cooldown was forgotten
 * when the request ended and `isConnectionRateLimited` (the DB-backed read
 * helper) always returned false for non-Antigravity providers. Result: cascade
 * failures against a multi-key OpenCode-Go setup retried the same exhausted key
 * on the next request and the user saw no "kill for X days" behavior.
 *
 * After the fix:
 *   1. `applyErrorState` with a non-zero cooldown also writes
 *      `provider_connections.rate_limited_until` via
 *      `setConnectionRateLimitUntil` (best-effort, never crashes the request).
 *   2. `resetAccountState` with a DB id clears that column.
 *   3. The localDb re-exports `markConnectionRateLimitedUntil` and
 *      `clearConnectionRateLimit` for direct use by other consumers
 *      (e.g. provider-specific executors).
 *
 * These tests mirror the harness from `antigravity-429-quota-cooldown.test.ts`
 * so they share the same DATA_DIR sandbox and DB reset pattern.
 */

import { test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-fb-cascade-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const providersDb = await import("../../src/lib/db/providers.ts");

import {
  applyErrorState,
  resetAccountState,
} from "../../open-sse/services/accountFallback.ts";
import {
  markConnectionRateLimitedUntil,
  clearConnectionRateLimit,
} from "../../src/lib/localDb.ts";

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

// ── Helpers ────────────────────────────────────────────────────────────────

async function makeConnection(provider: string, name: string): Promise<string> {
  const conn = await providersDb.createProviderConnection({
    provider,
    authType: "api_key",
    name,
  });
  return (conn as any).id as string;
}

// ── applyErrorState persistence (Bug Fix A) ────────────────────────────────

test("applyErrorState: 429 cascade persists cooldown via setConnectionRateLimitUntil", async () => {
  const connId = await makeConnection("opencode-go", "OC-GO Cascade Test");

  assert.equal(
    providersDb.isConnectionRateLimited(connId),
    false,
    "should start as not rate-limited",
  );

  const before = Date.now();
  applyErrorState(
    { id: connId, backoffLevel: 0, status: "active" },
    429,
    "Monthly usage limit reached. Resets in 13 days.",
    "opencode-go",
  );

  assert.equal(
    providersDb.isConnectionRateLimited(connId),
    true,
    "should be rate-limited in the DB after applyErrorState with 429",
  );

  const limited = providersDb.getRateLimitedConnections("opencode-go");
  assert.ok(
    limited.some((c: any) => c.id === connId),
    "should appear in getRateLimitedConnections list for the provider",
  );

  // Sanity: the persisted timestamp is in the future (within reason).
  const row = limited.find((c: any) => c.id === connId) as any;
  if (row?.rate_limited_until) {
    const ts = Number(row.rate_limited_until);
    assert.ok(
      ts > before,
      `cooldown timestamp ${ts} must be > request start ${before}`,
    );
  }
});

test("applyErrorState: non-429 / non-rateLimit errors do NOT persist a cooldown", async () => {
  const connId = await makeConnection("opencode-go", "OC-GO Non-429");

  // 400 with no rate-limit signals should NOT set a DB cooldown.
  applyErrorState(
    { id: connId, backoffLevel: 0, status: "active" },
    400,
    "Invalid request body",
    "opencode-go",
  );

  assert.equal(
    providersDb.isConnectionRateLimited(connId),
    false,
    "non-rate-limit error should not persist a cooldown",
  );
});

test("applyErrorState: account with no `id` does not crash and does not persist", async () => {
  // No id field → DB write is skipped.
  const result = applyErrorState(
    { backoffLevel: 0, status: "active" } as any,
    429,
    "rate limit exceeded",
    "opencode-go",
  );

  assert.ok(result, "should return a new state object");
  assert.equal((result as any).status, "error");
  assert.ok((result as any).rateLimitedUntil, "in-memory rateLimitedUntil should be set");
});

// ── resetAccountState persistence (Bug Fix A) ──────────────────────────────

test("resetAccountState clears the persisted cooldown after a success", async () => {
  const connId = await makeConnection("opencode-go", "OC-GO Reset Test");

  // Force the connection into a cooled state.
  providersDb.setConnectionRateLimitUntil(connId, Date.now() + 60_000);
  assert.equal(
    providersDb.isConnectionRateLimited(connId),
    true,
    "precondition: should be rate-limited after explicit set",
  );

  resetAccountState({ id: connId, backoffLevel: 1, status: "error" });

  assert.equal(
    providersDb.isConnectionRateLimited(connId),
    false,
    "resetAccountState should clear the persisted cooldown",
  );
});

// ── localDb re-exports (Bug Fix F) ──────────────────────────────────────────

test("localDb.markConnectionRateLimitedUntil: writes cooldown; never throws on bad id", () => {
  const connId = "non-existent-id-xxxxx";
  // Must not throw even though the id doesn't exist — DB write failure
  // inside the wrapper must never crash the request path.
  assert.doesNotThrow(() =>
    markConnectionRateLimitedUntil(connId, 5_000),
  );
});

test("localDb.clearConnectionRateLimit: does not throw on bad id", () => {
  const connId = "non-existent-id-xxxxx";
  assert.doesNotThrow(() => clearConnectionRateLimit(connId));
});

test("localDb.markConnectionRateLimitedUntil + clearConnectionRateLimit round-trip", async () => {
  const connId = await makeConnection("opencode-go", "OC-GO RoundTrip");

  markConnectionRateLimitedUntil(connId, 60_000);
  assert.equal(
    providersDb.isConnectionRateLimited(connId),
    true,
    "after markConnectionRateLimitedUntil the connection should be limited",
  );

  clearConnectionRateLimit(connId);
  assert.equal(
    providersDb.isConnectionRateLimited(connId),
    false,
    "after clearConnectionRateLimit the connection should not be limited",
  );
});

// ── Multi-account scenario (the user's exact bug) ───────────────────────────

test("multi-key scenario: cooling one OpenCode-Go key does NOT poison other keys", async () => {
  const connA = await makeConnection("opencode-go", "OC-GO Key A");
  const connB = await makeConnection("opencode-go", "OC-GO Key B");

  // Account A hits the monthly quota envelope.
  applyErrorState(
    { id: connA, backoffLevel: 0, status: "active" },
    429,
    "Monthly usage limit reached. Resets in 13 days.",
    "opencode-go",
  );

  assert.equal(
    providersDb.isConnectionRateLimited(connA),
    true,
    "key A should be rate-limited after monthly envelope",
  );
  assert.equal(
    providersDb.isConnectionRateLimited(connB),
    false,
    "key B should remain available — scope is per-connection, not per-provider",
  );
});