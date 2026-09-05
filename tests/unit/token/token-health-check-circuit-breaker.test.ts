/**
 * TDD — HealthCheck refresh circuit breaker.
 *
 * Production incident: claude/aa5dd5cf refreshed 1352× and kimi-coding 270×,
 * each retrying every 60s forever because a refresh that returns `null`
 * (network blip, dead proxy, or an unclassified error) leaves the connection
 * `active`, so the next sweep tries again immediately — no backoff.
 *
 * The circuit breaker tracks consecutive refresh failures in
 * providerSpecificData.refreshCircuit and computes an exponential backoff
 * window. While inside the window, checkConnection must SKIP the refresh
 * instead of hammering every tick. A successful refresh clears the circuit.
 *
 * These exercise the pure helpers (no DB/network needed).
 */
import test from "node:test";
import assert from "node:assert/strict";

const tokenHealthCheck = await import("../../../src/lib/tokenHealthCheck.ts");
const { buildRefreshFailureUpdate, isInRefreshBackoff, getRefreshBackoffUntil } =
  tokenHealthCheck as unknown as {
    buildRefreshFailureUpdate: (conn: any, now: string) => any;
    isInRefreshBackoff: (conn: any, nowMs: number) => boolean;
    getRefreshBackoffUntil: (streak: number, now: string) => string;
  };

const NOW = "2026-06-11T12:00:00.000Z";
const NOW_MS = new Date(NOW).getTime();

test("getRefreshBackoffUntil grows exponentially and caps", () => {
  const min = (iso: string) => Math.round((new Date(iso).getTime() - NOW_MS) / 60000);
  assert.equal(min(getRefreshBackoffUntil(1, NOW)), 5); // 5 * 2^0
  assert.equal(min(getRefreshBackoffUntil(2, NOW)), 10); // 5 * 2^1
  assert.equal(min(getRefreshBackoffUntil(3, NOW)), 20);
  assert.equal(min(getRefreshBackoffUntil(4, NOW)), 40);
  assert.ok(min(getRefreshBackoffUntil(20, NOW)) <= 240, "must cap at 4h");
});

test("buildRefreshFailureUpdate starts a circuit streak of 1 on first failure", () => {
  const update = buildRefreshFailureUpdate({ testStatus: "active" }, NOW);
  assert.equal(update.testStatus, "active", "first failure stays routable");
  assert.equal(update.providerSpecificData.refreshCircuit.streak, 1);
  assert.ok(
    new Date(update.providerSpecificData.refreshCircuit.until).getTime() > NOW_MS,
    "must set a future backoff window"
  );
});

test("buildRefreshFailureUpdate increments the streak across consecutive failures", () => {
  const update = buildRefreshFailureUpdate(
    { testStatus: "active", providerSpecificData: { refreshCircuit: { streak: 3 } } },
    NOW
  );
  assert.equal(update.providerSpecificData.refreshCircuit.streak, 4);
});

test("buildRefreshFailureUpdate preserves unrelated providerSpecificData", () => {
  const update = buildRefreshFailureUpdate(
    { testStatus: "active", providerSpecificData: { projectId: "p-123", copilotToken: "x" } },
    NOW
  );
  assert.equal(update.providerSpecificData.projectId, "p-123");
  assert.equal(update.providerSpecificData.copilotToken, "x");
  assert.equal(update.providerSpecificData.refreshCircuit.streak, 1);
});

test("isInRefreshBackoff true while within the window, false after", () => {
  const conn = {
    providerSpecificData: { refreshCircuit: { until: getRefreshBackoffUntil(2, NOW) } },
  };
  assert.equal(isInRefreshBackoff(conn, NOW_MS), true, "10min window, now → inside");
  assert.equal(isInRefreshBackoff(conn, NOW_MS + 11 * 60000), false, "after 11min → outside");
});

test("isInRefreshBackoff false when no circuit recorded", () => {
  assert.equal(isInRefreshBackoff({}, NOW_MS), false);
  assert.equal(isInRefreshBackoff({ providerSpecificData: {} }, NOW_MS), false);
  assert.equal(isInRefreshBackoff({ providerSpecificData: { refreshCircuit: {} } }, NOW_MS), false);
});

test("expired connections still track expiredRetryCount AND the circuit", () => {
  const update = buildRefreshFailureUpdate({ testStatus: "expired", expiredRetryCount: 1 }, NOW);
  assert.equal(update.testStatus, "expired");
  assert.equal(update.expiredRetryCount, 2);
  assert.equal(update.providerSpecificData.refreshCircuit.streak, 1);
});

// Cursor renewal plan, Task 3 Step 1: buildRefreshFailureUpdate() gained an
// optional 3rd `overrides` param so Cursor's failure path (which has no
// refresh_token by design) can use a distinct errorCode ("cursor_session_stale"
// instead of "refresh_failed") and force testStatus:"active" even when the
// connection's prior testStatus was already "expired" — without touching any
// other provider's error taxonomy or default behavior.
test("buildRefreshFailureUpdate applies overrides on top of the defaults, leaving every existing caller (which passes no 3rd arg) byte-identical", () => {
  const withOverrides = buildRefreshFailureUpdate(
    { testStatus: "expired", expiredRetryCount: 0 },
    NOW,
    {
      errorCode: "cursor_session_stale",
      lastErrorType: "cursor_session_stale",
      lastError: "Cursor session unchanged — no newer token found on this host.",
      testStatus: "active",
    }
  );
  assert.equal(withOverrides.errorCode, "cursor_session_stale");
  assert.equal(withOverrides.lastErrorType, "cursor_session_stale");
  assert.equal(
    withOverrides.lastError,
    "Cursor session unchanged — no newer token found on this host."
  );
  assert.equal(
    withOverrides.testStatus,
    "active",
    "the override must force non-terminal status even though wasExpired (prior testStatus) was true"
  );
  // wasExpired-derived bookkeeping (retry count, circuit streak) is untouched
  // by the testStatus override — only the persisted field itself is replaced.
  assert.equal(withOverrides.expiredRetryCount, 1);
  assert.equal(withOverrides.providerSpecificData.refreshCircuit.streak, 1);

  const withoutOverrides = buildRefreshFailureUpdate({ testStatus: "active" }, NOW);
  assert.equal(withoutOverrides.errorCode, "refresh_failed");
  assert.equal(withoutOverrides.lastErrorType, "token_refresh_failed");
  assert.equal(withoutOverrides.lastError, "Health check: token refresh failed");
  assert.equal(withoutOverrides.testStatus, "active");
});
