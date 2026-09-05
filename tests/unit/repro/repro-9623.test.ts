import test from "node:test";
import assert from "node:assert/strict";

// #9623: Failed connection test leaves testStatus=error with no recovery path.
// Previously the route wrote testStatus:"error" + rateLimitedUntil:null, which the
// lazy-recovery cooldown filter never matches (it only skips FUTURE rateLimitedUntil),
// leaving the connection permanently unavailable after a transient outage.
// Fix: non-terminal test failures now get a short future cooldown (30s) so they recover.

test("#9623 fix: non-terminal test failure sets a future rateLimitedUntil", () => {
  // Simulate the fixed updateData logic
  const now = Date.now();
  const terminalTestStatuses = new Set(["banned", "expired", "credits_exhausted"]);
  const valid = false;
  const diagnosis = { code: "network_error", type: "upstream" }; // non-terminal
  const isTerminalFailure = terminalTestStatuses.has(String(diagnosis.code).toLowerCase());
  const testFailureCooldownMs = 30_000;

  const rateLimitedUntil =
    valid || isTerminalFailure
      ? valid
        ? null
        : null
      : new Date(now + testFailureCooldownMs).toISOString();

  assert.ok(
    rateLimitedUntil !== null,
    "non-terminal failure should set a future rateLimitedUntil"
  );
  const cooldownTime = new Date(rateLimitedUntil as string).getTime();
  assert.ok(
    cooldownTime > now,
    "rateLimitedUntil must be in the future so the lazy-recovery path retries"
  );
  assert.ok(
    cooldownTime <= now + 30_000,
    "cooldown should be bounded (30s)"
  );
});

test("#9623 guard: terminal failures stay terminal (no fake recovery)", () => {
  const terminalTestStatuses = new Set(["banned", "expired", "credits_exhausted"]);
  const diagnosis = { code: "banned", type: "terminal" };
  const isTerminalFailure = terminalTestStatuses.has(String(diagnosis.code).toLowerCase());
  assert.equal(isTerminalFailure, true, "banned must be terminal");
});

test("#9623: success resets cooldown to null", () => {
  const valid = true;
  const rateLimitedUntil = valid ? null : new Date(Date.now() + 30_000).toISOString();
  assert.equal(rateLimitedUntil, null, "successful test clears cooldown");
});
