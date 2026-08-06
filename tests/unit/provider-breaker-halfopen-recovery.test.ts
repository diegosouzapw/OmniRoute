/**
 * Tests for circuit breaker HALF_OPEN -> CLOSED recovery via recordProviderSuccess.
 *
 * Production scenario: provider breaker stuck in HALF_OPEN with 699 requests
 * at 98% success rate, never recovering. Root cause: combo.ts success path
 * calls recordProviderSuccess (cooldown-only) but never calls breaker._onSuccess().
 *
 * This test verifies that recordProviderSuccess in accountFallback.ts
 * transitions the breaker from HALF_OPEN to CLOSED and resets failure count.
 */
import { test } from "node:test";
import assert from "node:assert/strict";
import {
  getCircuitBreaker,
  resetAllCircuitBreakers,
} from "../../src/shared/utils/circuitBreaker.ts";
import {
  recordProviderFailure,
  recordProviderSuccess,
} from "../../open-sse/services/accountFallback.ts";
import {
  recordProviderCooldown,
  isProviderInCooldown,
  clearCooldownState,
} from "../../open-sse/services/providerCooldownTracker.ts";

const uniqueProvider = (suffix: string) =>
  `halfopen-test-${suffix}-${Date.now()}-${Math.floor(Math.random() * 1e6)}`;

test("recordProviderSuccess transitions breaker from HALF_OPEN to CLOSED and resets failureCount", async () => {
  const provider = uniqueProvider("recovery");

  // Step 1: Open the breaker (failureThreshold: 1 -> one failure opens it)
  recordProviderFailure(provider, undefined, undefined, {
    failureThreshold: 1,
    resetTimeoutMs: 150,
  });

  const breaker = getCircuitBreaker(provider);
  assert.equal(breaker.state, "OPEN", "breaker should be OPEN after failure");
  assert.equal(breaker.failureCount, 1, "failureCount should be 1");

  // Step 2: Wait past resetTimeout so _refreshOpenState transitions to HALF_OPEN
  await new Promise((r) => setTimeout(r, 200));
  breaker.canExecute(); // triggers _refreshOpenState -> HALF_OPEN
  assert.equal(breaker.state, "HALF_OPEN", "breaker should be HALF_OPEN after resetTimeout");

  // Step 3: recordProviderSuccess should close the breaker
  recordProviderSuccess(provider, undefined);

  assert.equal(breaker.state, "CLOSED", "breaker should be CLOSED after success");
  assert.equal(breaker.failureCount, 0, "failureCount should be reset to 0");
});

test("recordProviderSuccess does not prematurely close an OPEN breaker before resetTimeout", () => {
  const provider = uniqueProvider("no-premature-close");

  // Open the breaker
  recordProviderFailure(provider, undefined, undefined, {
    failureThreshold: 1,
    resetTimeoutMs: 60_000, // long timeout -- won't elapse during test
  });

  const breaker = getCircuitBreaker(provider);
  assert.equal(breaker.state, "OPEN");

  // Call success while still in OPEN (timeout hasn't elapsed)
  recordProviderSuccess(provider, undefined);

  // Breaker should stay OPEN -- we don't want to bypass the cooldown
  assert.equal(breaker.state, "OPEN", "breaker must stay OPEN when resetTimeout has not elapsed");
  assert.equal(breaker.failureCount, 1, "failureCount must not change while OPEN");
});

test("recordProviderSuccess does not reset cooldown when breaker is OPEN", () => {
  const provider = uniqueProvider("open-cooldown-guard");
  const connectionId = "conn-open";

  // Build up cooldown first
  for (let i = 0; i < 3; i++) {
    recordProviderCooldown(provider, connectionId);
  }
  assert.equal(isProviderInCooldown(provider, connectionId), true);

  // Open the breaker
  recordProviderFailure(provider, undefined, connectionId, {
    failureThreshold: 1,
    resetTimeoutMs: 60_000,
  });
  const breaker = getCircuitBreaker(provider);
  assert.equal(breaker.state, "OPEN");

  // Success while OPEN should NOT reset cooldown (early-return guard)
  recordProviderSuccess(provider, connectionId);

  assert.equal(breaker.state, "OPEN", "breaker stays OPEN");
  assert.equal(
    isProviderInCooldown(provider, connectionId),
    true,
    "cooldown must NOT be cleared while breaker is OPEN"
  );
});

test("recordProviderSuccess on CLOSED breaker decays failureCount (gradual recovery)", () => {
  const provider = uniqueProvider("closed-gradual");

  // Get a breaker in CLOSED state (no failures)
  const breaker = getCircuitBreaker(provider, {
    failureThreshold: 3,
    resetTimeoutMs: 30_000,
  });
  assert.equal(breaker.state, "CLOSED");

  // Add a failure via public API (but not enough to open: threshold=3)
  recordProviderFailure(provider, undefined, undefined, {
    failureThreshold: 3,
    resetTimeoutMs: 30_000,
  });
  assert.equal(breaker.failureCount, 1);
  assert.equal(breaker.state, "CLOSED"); // still closed (threshold=3)

  // recordProviderSuccess on CLOSED decays failureCount by 1 (matching execute())
  recordProviderSuccess(provider, undefined);

  assert.equal(breaker.failureCount, 0, "failureCount decremented by 1 (gradual recovery)");
  assert.equal(breaker.state, "CLOSED", "should stay CLOSED");
});

test("recordProviderSuccess with null/undefined provider is a safe no-op", () => {
  // Should not throw
  recordProviderSuccess(null, undefined);
  recordProviderSuccess(undefined, undefined);
  recordProviderSuccess("", undefined);
});

test("recordProviderSuccess is idempotent: multiple calls on HALF_OPEN are safe", async () => {
  const provider = uniqueProvider("idempotent");

  // Open the breaker
  recordProviderFailure(provider, undefined, undefined, {
    failureThreshold: 1,
    resetTimeoutMs: 100,
  });

  const breaker = getCircuitBreaker(provider);
  assert.equal(breaker.state, "OPEN");

  // Wait for HALF_OPEN
  await new Promise((r) => setTimeout(r, 150));
  breaker.canExecute();
  assert.equal(breaker.state, "HALF_OPEN");

  // First success closes the breaker
  recordProviderSuccess(provider, undefined);
  assert.equal(breaker.state, "CLOSED");
  assert.equal(breaker.failureCount, 0);

  // Second success is a no-op (state is CLOSED, not HALF_OPEN)
  recordProviderSuccess(provider, undefined);
  assert.equal(breaker.state, "CLOSED");
  assert.equal(breaker.failureCount, 0);
});

test("full lifecycle: CLOSED -> OPEN -> HALF_OPEN -> CLOSED via success", async () => {
  const provider = uniqueProvider("lifecycle");

  // Start CLOSED
  const breaker = getCircuitBreaker(provider, {
    failureThreshold: 1,
    resetTimeoutMs: 100,
  });
  assert.equal(breaker.state, "CLOSED");

  // Failure opens the breaker
  recordProviderFailure(provider, undefined, undefined, {
    failureThreshold: 1,
    resetTimeoutMs: 100,
  });
  assert.equal(breaker.state, "OPEN");
  assert.equal(breaker.failureCount, 1);

  // Still OPEN before timeout
  recordProviderSuccess(provider, undefined);
  assert.equal(breaker.state, "OPEN", "must not close before resetTimeout");

  // Wait for HALF_OPEN transition
  await new Promise((r) => setTimeout(r, 150));
  breaker.canExecute();
  assert.equal(breaker.state, "HALF_OPEN");

  // Success recovers to CLOSED
  recordProviderSuccess(provider, undefined);
  assert.equal(breaker.state, "CLOSED");
  assert.equal(breaker.failureCount, 0);

  // Subsequent failure re-opens (proves breaker is functional after recovery)
  recordProviderFailure(provider, undefined, undefined, {
    failureThreshold: 1,
    resetTimeoutMs: 100,
  });
  assert.equal(breaker.state, "OPEN");
  assert.equal(breaker.failureCount, 1);
});

test("recordProviderSuccess resets cooldown failureCount (exponential backoff)", () => {
  const provider = uniqueProvider("cooldown-reset");
  const connectionId = "conn-1";

  // Build up 4 failures -> cooldown with exponential backoff
  for (let i = 0; i < 4; i++) {
    recordProviderCooldown(provider, connectionId);
  }

  // Cooldown should be active (failureCount > 0)
  assert.equal(
    isProviderInCooldown(provider, connectionId),
    true,
    "provider should be in cooldown after 4 failures"
  );

  // Success should reset the cooldown
  recordProviderSuccess(provider, connectionId);

  assert.equal(
    isProviderInCooldown(provider, connectionId),
    false,
    "cooldown should be cleared after success (failureCount reset to 0)"
  );

  // Breaker should remain CLOSED (cooldown test does not open the breaker)
  const breaker = getCircuitBreaker(provider);
  assert.equal(breaker.state, "CLOSED", "breaker stays CLOSED (cooldown-only scenario)");
});

test("recordProviderSuccess with connectionId transitions breaker and resets cooldown", async () => {
  const provider = uniqueProvider("connid-breaker");
  const connectionId = "conn-abc";

  // Open the breaker
  recordProviderFailure(provider, undefined, connectionId, {
    failureThreshold: 1,
    resetTimeoutMs: 100,
  });

  const breaker = getCircuitBreaker(provider);
  assert.equal(breaker.state, "OPEN");

  // Build up cooldown with connectionId
  for (let i = 0; i < 3; i++) {
    recordProviderCooldown(provider, connectionId);
  }
  assert.equal(isProviderInCooldown(provider, connectionId), true);

  // Wait for HALF_OPEN
  await new Promise((r) => setTimeout(r, 150));
  breaker.canExecute();
  assert.equal(breaker.state, "HALF_OPEN");

  // Success with connectionId should close breaker AND reset cooldown
  recordProviderSuccess(provider, connectionId);

  assert.equal(breaker.state, "CLOSED", "breaker CLOSED after success with connectionId");
  assert.equal(breaker.failureCount, 0, "failureCount reset");
  assert.equal(isProviderInCooldown(provider, connectionId), false, "cooldown cleared");
});

test("resetAllCircuitBreakers cleans up test state", () => {
  // Verify cleanup works (prevents state leaking between tests)
  resetAllCircuitBreakers();
  clearCooldownState();
  const provider = uniqueProvider("cleanup");
  const breaker = getCircuitBreaker(provider);
  assert.equal(breaker.state, "CLOSED");
  assert.equal(breaker.failureCount, 0);
});
