import { describe, it, beforeEach } from "node:test";
import assert from "node:assert/strict";
import { mock } from "node:test";
import {
  checkLoginGuard,
  clearLoginAttempts,
  recordLoginFailure,
  resetLoginGuardForTests,
  getLoginGuardSizeForTests,
  LOGIN_GUARD_TUNABLES,
} from "../../../src/server/auth/loginGuard";

describe("loginGuard", () => {
  beforeEach(() => {
    resetLoginGuardForTests();
  });

  it("is a no-op when bruteForceProtection is disabled", () => {
    for (let i = 0; i < 20; i++) {
      const decision = recordLoginFailure("1.2.3.4", { enabled: false });
      assert.equal(decision.allowed, true);
    }
    assert.equal(checkLoginGuard("1.2.3.4", { enabled: false }).allowed, true);
  });

  it("allows the first attempts up to threshold-1, locks on the threshold hit", () => {
    const ip = "10.0.0.1";
    for (let i = 0; i < LOGIN_GUARD_TUNABLES.FAILURE_THRESHOLD - 1; i++) {
      const dec = recordLoginFailure(ip, { enabled: true });
      assert.equal(dec.allowed, true, `attempt #${i + 1} should still be allowed`);
    }
    const lockingHit = recordLoginFailure(ip, { enabled: true });
    assert.equal(lockingHit.allowed, false);
    assert.ok((lockingHit.retryAfterSeconds || 0) > 0);

    const subsequent = checkLoginGuard(ip, { enabled: true });
    assert.equal(subsequent.allowed, false);
    assert.ok((subsequent.retryAfterSeconds || 0) > 0);
  });

  it("scopes lockouts per IP", () => {
    const ipA = "10.0.0.1";
    const ipB = "10.0.0.2";
    for (let i = 0; i < LOGIN_GUARD_TUNABLES.FAILURE_THRESHOLD; i++) {
      recordLoginFailure(ipA, { enabled: true });
    }
    assert.equal(checkLoginGuard(ipA, { enabled: true }).allowed, false);
    assert.equal(checkLoginGuard(ipB, { enabled: true }).allowed, true);
  });

  it("clearLoginAttempts releases the lock for that IP only", () => {
    const ip = "10.0.0.7";
    for (let i = 0; i < LOGIN_GUARD_TUNABLES.FAILURE_THRESHOLD; i++) {
      recordLoginFailure(ip, { enabled: true });
    }
    assert.equal(checkLoginGuard(ip, { enabled: true }).allowed, false);
    clearLoginAttempts(ip);
    assert.equal(checkLoginGuard(ip, { enabled: true }).allowed, true);
  });

  it("treats null/undefined ip as a single bucket", () => {
    for (let i = 0; i < LOGIN_GUARD_TUNABLES.FAILURE_THRESHOLD; i++) {
      recordLoginFailure(null, { enabled: true });
    }
    assert.equal(checkLoginGuard(undefined, { enabled: true }).allowed, false);
  });

  it("prunes expired, unlocked entries so the attempts map does not grow without bound", () => {
    mock.timers.enable({ apis: ["Date"] });
    try {
      // Many distinct IPs each fail once (single, unlocked attempts).
      for (let i = 0; i < 300; i++) {
        recordLoginFailure(`9.${Math.floor(i / 256)}.${i % 256}.1`, { enabled: true });
      }
      assert.ok(getLoginGuardSizeForTests() > 256, "entries should accumulate before pruning");

      // Advance past the sliding window so all those entries are expired + unlocked.
      mock.timers.tick(LOGIN_GUARD_TUNABLES.WINDOW_MS + 1000);

      // The next failure (map size > threshold) triggers the opportunistic prune.
      recordLoginFailure("1.1.1.1", { enabled: true });

      // Only the fresh entry should remain; the stale ones were reaped.
      assert.equal(getLoginGuardSizeForTests(), 1);
    } finally {
      mock.timers.reset();
    }
  });

  it("never prunes a still-locked entry", () => {
    mock.timers.enable({ apis: ["Date"] });
    try {
      const lockedIp = "5.5.5.5";
      for (let i = 0; i < LOGIN_GUARD_TUNABLES.FAILURE_THRESHOLD; i++) {
        recordLoginFailure(lockedIp, { enabled: true });
      }
      assert.equal(checkLoginGuard(lockedIp, { enabled: true }).allowed, false);

      // Fill past the prune threshold with unlocked entries, then trigger a prune
      // while still inside the lockout window.
      for (let i = 0; i < 300; i++) {
        recordLoginFailure(`8.${Math.floor(i / 256)}.${i % 256}.1`, { enabled: true });
      }
      recordLoginFailure("2.2.2.2", { enabled: true });

      // The locked IP must still be locked (not reaped).
      assert.equal(checkLoginGuard(lockedIp, { enabled: true }).allowed, false);
    } finally {
      mock.timers.reset();
    }
  });
});
