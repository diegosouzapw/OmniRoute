import { describe, it, beforeEach } from "node:test";
import assert from "node:assert/strict";
import {
  checkLoginGuard,
  clearLoginAttempts,
  recordLoginFailure,
  resetLoginGuardForTests,
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
});
