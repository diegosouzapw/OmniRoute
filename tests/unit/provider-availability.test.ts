/**
 * Typed provider availability resolver (OmniRoute deep review, 2026-09-29, Section 2).
 *
 * A pure classifier maps a connection's stored fields to an explicit discriminated
 * state so the UI/clients can tell "the credential exists but quota is exhausted,
 * last confirmed at X" from "no credential at all" — instead of collapsing both into
 * "No active credentials". Core invariant: an old or unverifiable terminal state
 * resolves to STALE_TERMINAL (re-verify with evidence), NEVER silently to AVAILABLE.
 */
import test from "node:test";
import assert from "node:assert/strict";
import {
  resolveProviderAvailability,
  describeProviderAvailability,
} from "../../src/lib/providerAvailability.ts";

const DAY_MS = 24 * 60 * 60 * 1000;
const NOW = Date.UTC(2026, 9, 8, 12, 0, 0);
const iso = (ms: number) => new Date(ms).toISOString();

test("no credential -> NO_CREDENTIAL", () => {
  const a = resolveProviderAvailability({ hasCredential: false, isActive: true }, NOW);
  assert.equal(a.state, "NO_CREDENTIAL");
});

test("operator-disabled connection -> DISABLED", () => {
  const a = resolveProviderAvailability({ isActive: false, testStatus: "active" }, NOW);
  assert.equal(a.state, "DISABLED");
});

test("active and clean -> AVAILABLE", () => {
  const a = resolveProviderAvailability({ isActive: true, testStatus: "active" }, NOW);
  assert.equal(a.state, "AVAILABLE");
});

test("fresh expired -> AUTH_EXPIRED with REAUTHENTICATE", () => {
  const a = resolveProviderAvailability(
    { isActive: true, testStatus: "expired", lastErrorAt: iso(NOW - 60_000) },
    NOW
  );
  assert.equal(a.state, "AUTH_EXPIRED");
  if (a.state === "AUTH_EXPIRED") assert.equal(a.action, "REAUTHENTICATE");
});

test("fresh credits_exhausted -> QUOTA_EXHAUSTED with nextEligibleRecheckAt", () => {
  const until = NOW + 2 * 60 * 60 * 1000;
  const a = resolveProviderAvailability(
    {
      isActive: true,
      testStatus: "credits_exhausted",
      lastErrorAt: iso(NOW - 60_000),
      rateLimitedUntil: iso(until),
    },
    NOW
  );
  assert.equal(a.state, "QUOTA_EXHAUSTED");
  if (a.state === "QUOTA_EXHAUSTED") assert.equal(a.nextEligibleRecheckAt, iso(until));
});

test("fresh banned -> DISABLED", () => {
  const a = resolveProviderAvailability(
    { isActive: true, testStatus: "banned", lastErrorAt: iso(NOW - 60_000) },
    NOW
  );
  assert.equal(a.state, "DISABLED");
});

test("old terminal -> STALE_TERMINAL, never AVAILABLE (never auto-clear on time)", () => {
  const a = resolveProviderAvailability(
    { isActive: true, testStatus: "credits_exhausted", lastErrorAt: iso(NOW - 3 * DAY_MS) },
    NOW
  );
  assert.equal(a.state, "STALE_TERMINAL");
  if (a.state === "STALE_TERMINAL") assert.equal(a.previousState, "credits_exhausted");
  assert.notEqual(a.state, "AVAILABLE");
});

test("terminal with no confirmation timestamp -> STALE_TERMINAL (cannot verify freshness)", () => {
  const a = resolveProviderAvailability({ isActive: true, testStatus: "expired" }, NOW);
  assert.equal(a.state, "STALE_TERMINAL");
});

test("transient rate-limit cooldown -> UNHEALTHY retryable", () => {
  const a = resolveProviderAvailability(
    { isActive: true, testStatus: "active", rateLimitedUntil: iso(NOW + 30_000) },
    NOW
  );
  assert.equal(a.state, "UNHEALTHY");
  if (a.state === "UNHEALTHY") assert.equal(a.retryable, true);
});

test("recoverable error without a terminal status -> UNHEALTHY retryable", () => {
  const a = resolveProviderAvailability(
    { isActive: true, testStatus: "error", lastErrorType: "server_error" },
    NOW
  );
  assert.equal(a.state, "UNHEALTHY");
});

test("expired cooldown in the past does not make a clean connection unhealthy", () => {
  const a = resolveProviderAvailability(
    { isActive: true, testStatus: "active", rateLimitedUntil: iso(NOW - 30_000) },
    NOW
  );
  assert.equal(a.state, "AVAILABLE");
});

test("describeProviderAvailability: honest human label for every state", () => {
  assert.equal(describeProviderAvailability({ state: "AVAILABLE" }), "Available");
  assert.equal(describeProviderAvailability({ state: "NO_CREDENTIAL" }), "No credential");
  assert.equal(
    describeProviderAvailability({ state: "AUTH_EXPIRED", action: "REAUTHENTICATE" }),
    "Reauthentication required"
  );
  assert.match(
    describeProviderAvailability({ state: "QUOTA_EXHAUSTED", nextEligibleRecheckAt: iso(NOW) }),
    /Quota exhausted · rechecks /
  );
  assert.equal(describeProviderAvailability({ state: "QUOTA_EXHAUSTED" }), "Quota exhausted");
  assert.equal(describeProviderAvailability({ state: "DISABLED" }), "Disabled");
  assert.match(
    describeProviderAvailability({ state: "STALE_TERMINAL", previousState: "credits_exhausted" }),
    /Stale lock \(was credits_exhausted\)/
  );
  assert.equal(
    describeProviderAvailability({ state: "UNHEALTHY", retryable: true }),
    "Unhealthy (retryable)"
  );
});
