/**
 * Characterization + API-surface test: rateLimitManager.ts god-file decomposition.
 *
 * The pure rate-limit HEADER parsing block (STANDARD_HEADERS, ANTHROPIC_HEADERS,
 * parseResetTime, toPlainHeaders) was extracted verbatim from
 * open-sse/services/rateLimitManager.ts into the ZERO-IMPORT, self-contained
 * leaf open-sse/services/rateLimitManager/headers.ts. The stateful limiter
 * machinery (Bottleneck, watchdog timers, learned-limits Map) stays in the host.
 *
 * Verifies that:
 *   1. parseResetTime / toPlainHeaders behave correctly (pure, DB/timer-free).
 *   2. The host rateLimitManager.ts still exposes the FULL public API (17 names).
 *   3. The headers leaf exports its pieces directly.
 *
 * The host import is released in a test.after hook (watchdog timers) so the
 * native runner does not hang — mirrors the DB-handle teardown discipline.
 */

import test from "node:test";
import assert from "node:assert/strict";

import {
  STANDARD_HEADERS,
  ANTHROPIC_HEADERS,
  parseResetTime,
  toPlainHeaders,
} from "../../open-sse/services/rateLimitManager/headers.ts";

// ── 1. pure helpers ──────────────────────────────────────────────────────────

test("rateLimitManager/headers — parseResetTime: nullish → null", () => {
  assert.equal(parseResetTime(""), null);
  assert.equal(parseResetTime(null), null);
  assert.equal(parseResetTime("not-a-duration"), null);
});

test("rateLimitManager/headers — parseResetTime: duration strings → ms", () => {
  assert.equal(parseResetTime("30s"), 30_000);
  assert.equal(parseResetTime("500ms"), 500);
  assert.equal(parseResetTime("1m30s"), 90_000);
});

test("rateLimitManager/headers — parseResetTime: bare number → seconds*1000", () => {
  assert.equal(parseResetTime("5"), 5_000);
});

// anthropic-ratelimit-*-reset carries an RFC 3339 timestamp. parseFloat read its
// leading year, so a reset 30s away came back as 2026 * 1000 ms (~34 minutes).
test("rateLimitManager/headers — parseResetTime: RFC 3339 timestamp → ms until then", () => {
  const inThirtySeconds = new Date(Date.now() + 30_000);
  for (const value of [
    inThirtySeconds.toISOString(),
    inThirtySeconds.toISOString().replace(/\.\d{3}Z$/, "Z"),
  ]) {
    const ms = parseResetTime(value);
    assert.ok(ms > 28_000 && ms <= 30_000, `${value} → ${ms}`);
  }
  assert.equal(parseResetTime(new Date(Date.now() - 5_000).toISOString()), 0);
});

test("rateLimitManager/headers — parseResetTime: fractional seconds in a duration", () => {
  assert.equal(parseResetTime("2m59.56s"), 179_560);
  assert.equal(parseResetTime("1h2m3.5s"), 3_723_500);
  assert.equal(parseResetTime("7.66s"), 7_660);
});

test("rateLimitManager/headers — parseResetTime: Unix timestamp → ms until then", () => {
  const ms = parseResetTime(String(Math.floor(Date.now() / 1000) + 60));
  assert.ok(ms > 58_000 && ms <= 60_000, String(ms));
});

test("rateLimitManager/headers — toPlainHeaders normalizes to a string record", () => {
  const out = toPlainHeaders({ "X-RateLimit-Remaining": "10", "Content-Type": "application/json" });
  assert.equal(typeof out, "object");
  assert.ok(out !== null && !Array.isArray(out));
  // every value is a string
  for (const v of Object.values(out)) assert.equal(typeof v, "string");
});

test("rateLimitManager/headers — STANDARD/ANTHROPIC header maps are objects with string fields", () => {
  assert.equal(typeof STANDARD_HEADERS, "object");
  assert.equal(typeof ANTHROPIC_HEADERS, "object");
  assert.equal(typeof STANDARD_HEADERS.overLimit, "string");
});

// ── 2. host public API surface (17) ──────────────────────────────────────────

const host = await import("../../open-sse/services/rateLimitManager.ts");

test.after(async () => {
  // release watchdog timers / limiter state so the runner exits cleanly
  try {
    await host.__resetRateLimitManagerForTests?.();
  } catch {
    /* ignore */
  }
  host.stopRateLimitWatchdog?.();
});

test("rateLimitManager.ts public API surface (17 names)", () => {
  const expected = [
    "__flushLearnedLimitsForTests",
    "__getLimiterStateForTests",
    "__resetRateLimitManagerForTests",
    "applyRequestQueueSettings",
    "disableRateLimitProtection",
    "enableRateLimitProtection",
    "getAllRateLimitStatus",
    "getLearnedLimits",
    "getRateLimitStatus",
    "initializeRateLimits",
    "isRateLimitEnabled",
    "refreshConnectionRateLimits",
    "startRateLimitWatchdog",
    "stopRateLimitWatchdog",
    "updateFromHeaders",
    "updateFromResponseBody",
    "withRateLimit",
  ];
  const missing = expected.filter((n) => typeof host[n] !== "function");
  assert.deepEqual(missing, [], `missing public exports: ${missing.join(", ")}`);
});

// ── 3. leaf exports its pieces ───────────────────────────────────────────────

test("headers.ts exports its helpers directly", async () => {
  const h = await import("../../open-sse/services/rateLimitManager/headers.ts");
  assert.equal(typeof h.parseResetTime, "function");
  assert.equal(typeof h.toPlainHeaders, "function");
  assert.equal(typeof h.STANDARD_HEADERS, "object");
  assert.equal(typeof h.ANTHROPIC_HEADERS, "object");
});
