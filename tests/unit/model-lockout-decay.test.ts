import { describe, it, before, after } from "node:test";
import assert from "node:assert/strict";

describe("decayModelFailureCount — /2 on success", () => {
  let accountFallback: typeof import("../../open-sse/services/accountFallback.ts");

  before(async () => {
    accountFallback = await import("../../open-sse/services/accountFallback.ts");
  });

  it("S1: halves failureCount when model is locked with failureCount=4", () => {
    accountFallback.clearAllModelLockouts();
    // Record a lockout with failureCount=4
    accountFallback.recordModelLockoutFailure(
      "openai",
      "conn-1",
      "gpt-4",
      "rate_limit_exceeded",
      429,
      120_000,
      null,
      { exactCooldownMs: 60_000 }
    );
    // Manually bump failureCount to 4 by calling it 3 more times
    for (let i = 0; i < 3; i++) {
      accountFallback.recordModelLockoutFailure(
        "openai",
        "conn-1",
        "gpt-4",
        "rate_limit_exceeded",
        429,
        120_000,
        null,
        { exactCooldownMs: 60_000 }
      );
    }

    const result = accountFallback.decayModelFailureCount("openai", "conn-1", "gpt-4");
    assert.equal(result.newFailureCount, 2, "failureCount=4 should halve to 2");
    assert.equal(result.cleared, false, "should not be cleared");
  });

  it("S2: clears lockout when failureCount reaches 0 (failureCount=1 → /2 = 0)", () => {
    accountFallback.clearAllModelLockouts();
    accountFallback.recordModelLockoutFailure(
      "openai",
      "conn-1",
      "gpt-4",
      "rate_limit_exceeded",
      429,
      120_000,
      null,
      { exactCooldownMs: 60_000 }
    );

    const result = accountFallback.decayModelFailureCount("openai", "conn-1", "gpt-4");
    assert.equal(result.newFailureCount, 0, "failureCount=1 should halve to 0 (floor(1/2))");
    assert.equal(result.cleared, true, "should be cleared when count reaches 0");
  });

  it("S3: no-op when model has no lockout or failure state", () => {
    accountFallback.clearAllModelLockouts();
    const result = accountFallback.decayModelFailureCount("openai", "conn-1", "gpt-4");
    assert.equal(result.newFailureCount, 0, "no state → 0");
    assert.equal(result.cleared, false, "no state → not cleared");
  });

  it("S4: no-op when model is null/undefined", () => {
    accountFallback.clearAllModelLockouts();
    const r1 = accountFallback.decayModelFailureCount("openai", "conn-1", null);
    assert.equal(r1.newFailureCount, 0, "null model → 0");
    assert.equal(r1.cleared, false, "null model → not cleared");

    const r2 = accountFallback.decayModelFailureCount("openai", "conn-1", undefined);
    assert.equal(r2.newFailureCount, 0, "undefined model → 0");
    assert.equal(r2.cleared, false, "undefined model → not cleared");
  });

  it("S5: Math.floor(3/2) = 1, then Math.floor(1/2) = 0 → cleared", () => {
    accountFallback.clearAllModelLockouts();
    // Start with failureCount=3
    for (let i = 0; i < 2; i++) {
      accountFallback.recordModelLockoutFailure(
        "openai",
        "conn-1",
        "gpt-4",
        "rate_limit_exceeded",
        429,
        120_000,
        null,
        { exactCooldownMs: 60_000 }
      );
    }
    // Should be failureCount=3
    const r1 = accountFallback.decayModelFailureCount("openai", "conn-1", "gpt-4");
    assert.equal(r1.newFailureCount, 1, "3/2=1.5 → floor=1");
    assert.equal(r1.cleared, false);

    // Second decay: 1/2=0.5 → floor=0 → cleared
    const r2 = accountFallback.decayModelFailureCount("openai", "conn-1", "gpt-4");
    assert.equal(r2.newFailureCount, 0, "1/2=0.5 → floor=0 → cleared");
    assert.equal(r2.cleared, true);
  });
});
