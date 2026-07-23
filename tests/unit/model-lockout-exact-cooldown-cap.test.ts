import { describe, it, before } from "node:test";
import assert from "node:assert/strict";

describe("recordModelLockoutFailure — exactCooldownMs cap against maxCooldownMs", () => {
  let accountFallback: typeof import("../../open-sse/services/accountFallback.ts");

  before(async () => {
    accountFallback = await import("../../open-sse/services/accountFallback.ts");
  });

  it("caps exactCooldownMs against maxCooldownMs when exact exceeds max", () => {
    accountFallback.clearAllModelLockouts();

    // Use exactCooldownMs=600000 (10min) but maxCooldownMs=300000 (5min)
    const result = accountFallback.recordModelLockoutFailure(
      "openai",
      "conn-1",
      "gpt-4",
      "quota_exhausted",
      429,
      120_000,
      null,
      { exactCooldownMs: 600_000, maxCooldownMs: 300_000 }
    );

    assert.ok(result.cooldownMs <= 300_000, `cooldownMs=${result.cooldownMs} should be <= 300000`);
  });

  it("keeps exactCooldownMs unchanged when it is below maxCooldownMs", () => {
    accountFallback.clearAllModelLockouts();

    const result = accountFallback.recordModelLockoutFailure(
      "openai",
      "conn-2",
      "gpt-4",
      "quota_exhausted",
      429,
      120_000,
      null,
      { exactCooldownMs: 30_000, maxCooldownMs: 300_000 }
    );

    assert.strictEqual(result.cooldownMs, 30_000);
  });

  it("caps exactCooldownMs for quota_exhausted with default midnight cooldown", () => {
    accountFallback.clearAllModelLockouts();

    // When exactCooldownMs is not set and reason is quota_exhausted,
    // it uses getMsUntilTomorrow() which could be very large.
    // With maxCooldownMs=300000 it should be capped.
    const result = accountFallback.recordModelLockoutFailure(
      "openai",
      "conn-3",
      "gpt-4",
      "quota_exhausted",
      429,
      120_000,
      null,
      { maxCooldownMs: 300_000 }
    );

    assert.ok(result.cooldownMs <= 300_000, `cooldownMs=${result.cooldownMs} should be <= 300000`);
  });

  it("uses BACKOFF_CONFIG.max as fallback when maxCooldownMs is not provided", () => {
    accountFallback.clearAllModelLockouts();

    const result = accountFallback.recordModelLockoutFailure(
      "openai",
      "conn-4",
      "gpt-4",
      "rate_limit_exceeded",
      429,
      120_000,
      null,
      { exactCooldownMs: 300_000 }
    );

    // When maxCooldownMs is not passed, exact cooldowns are not capped
    // so exactCooldownMs=300000 should be preserved as-is
    assert.strictEqual(result.cooldownMs, 300_000);
  });
});
