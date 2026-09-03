/**
 * Unit tests for the per-connection credential health sweep interval (#8443).
 *
 * Mirrors the house pattern of credential-health-backoff-retry.test.ts: the
 * scheduler predicates are replicated here rather than imported, because the
 * scheduler module auto-initializes on import.
 *
 * Validates:
 * 1. getConnIntervalMs: null → global env interval; >0 → minutes × 60 000;
 *    <=0 → null (per-connection opt-out, never tested)
 * 2. isConnectionDue: success timing (lastAttemptAt + interval) is respected —
 *    not due before the interval, due at/after it
 * 3. Opt-out connections (intervalMs null) are excluded from the due filter
 */

import test from "node:test";
import assert from "node:assert/strict";

// ── Constants (mirrored from scheduler.ts) ────────────────────────────────

const DEFAULT_INTERVAL = 300_000; // 5 min

// ── Helper: replicated scheduler predicates ───────────────────────────────

function getConnIntervalMs(conn: { healthCheckInterval?: number | null }): number | null {
  const minutes = conn.healthCheckInterval;
  if (minutes === null || minutes === undefined) return DEFAULT_INTERVAL;
  if (minutes <= 0) return null;
  return minutes * 60_000;
}

function isConnectionDue(
  perConnTiming: Map<string, { lastAttemptAt: number; nextAttemptAt: number }>,
  connId: string,
  now: number,
  intervalMs: number | null
): boolean {
  // Per-connection opt-out: never tested.
  if (intervalMs === null) return false;
  const timing = perConnTiming.get(connId);
  // No timing entry = never tested since boot → due now
  if (!timing) return true;
  // Time-based: due when the current time has passed the next attempt time
  return now >= timing.nextAttemptAt;
}

// ── Tests ─────────────────────────────────────────────────────────────────

test("getConnIntervalMs: absent healthCheckInterval falls back to the global interval", () => {
  assert.equal(getConnIntervalMs({}), DEFAULT_INTERVAL);
  assert.equal(getConnIntervalMs({ healthCheckInterval: null }), DEFAULT_INTERVAL);
});

test("getConnIntervalMs: positive minutes override becomes milliseconds", () => {
  assert.equal(getConnIntervalMs({ healthCheckInterval: 1 }), 60_000);
  assert.equal(getConnIntervalMs({ healthCheckInterval: 5 }), 300_000);
  assert.equal(getConnIntervalMs({ healthCheckInterval: 60 }), 3_600_000);
});

test("getConnIntervalMs: zero or negative means opt-out (null)", () => {
  assert.equal(getConnIntervalMs({ healthCheckInterval: 0 }), null);
  assert.equal(getConnIntervalMs({ healthCheckInterval: -5 }), null);
});

test("opt-out connection (intervalMs null) is never due", () => {
  const perConnTiming = new Map<string, { lastAttemptAt: number; nextAttemptAt: number }>();
  const now = 1_000_000_000_000;
  assert.equal(isConnectionDue(perConnTiming, "conn-optout", now, null), false);
});

test("connection with success timing is due at the interval boundary, not before", () => {
  const perConnTiming = new Map<string, { lastAttemptAt: number; nextAttemptAt: number }>();
  const connId = "conn-healthy";
  const now = 1_000_000_000_000;
  const intervalMs = DEFAULT_INTERVAL;

  // Simulate a success: timing holds lastAttemptAt + interval
  perConnTiming.set(connId, { lastAttemptAt: now, nextAttemptAt: now + intervalMs });

  assert.equal(
    isConnectionDue(perConnTiming, connId, now + intervalMs - 1, intervalMs),
    false,
    "Not due before the per-connection interval elapses"
  );
  assert.equal(
    isConnectionDue(perConnTiming, connId, now + intervalMs, intervalMs),
    true,
    "Due at the interval boundary"
  );
  assert.equal(
    isConnectionDue(perConnTiming, connId, now + intervalMs + 1, intervalMs),
    true,
    "Due after the interval elapses"
  );
});

test("never-tested connection is always due (no perConnTiming entry)", () => {
  const perConnTiming = new Map<string, { lastAttemptAt: number; nextAttemptAt: number }>();
  assert.equal(isConnectionDue(perConnTiming, "conn-fresh", Date.now(), DEFAULT_INTERVAL), true);
});
