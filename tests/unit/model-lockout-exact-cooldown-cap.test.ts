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

  // #6863 vs #7940 boundary: the same magnitude (~92.5h, the Antigravity reset
  // from #6863) against the same maxCooldownMs (~30min) must resolve two
  // different ways depending on provenance — a SYNTHETIC estimate stays capped
  // (#7940's contract), a caller-VERIFIED upstream reset passes through exactly
  // (#6863's contract). #7980 regressed this by capping both indiscriminately.
  const RESET_6863_MS = 332_848_000; // "Resets in 92h27m28s"
  const CAP_7940_MS = 1_800_000; // 30min operator-configured max

  it("still caps a SYNTHETIC exactCooldownMs even when it dwarfs maxCooldownMs (#7940)", () => {
    accountFallback.clearAllModelLockouts();

    const result = accountFallback.recordModelLockoutFailure(
      "antigravity",
      "conn-5",
      "claude-sonnet-4-6",
      "rate_limit",
      429,
      120_000,
      null,
      // No exactCooldownVerified flag — mirrors an un-provenanced/estimated exact
      // cooldown, which must still respect the operator's maxCooldownMs cap.
      { exactCooldownMs: RESET_6863_MS, maxCooldownMs: CAP_7940_MS }
    );

    assert.strictEqual(
      result.cooldownMs,
      CAP_7940_MS,
      `synthetic exactCooldownMs must stay capped at maxCooldownMs; got ${result.cooldownMs}`
    );
  });

  it("passes a VERIFIED exactCooldownMs through uncapped past maxCooldownMs (#6863)", () => {
    accountFallback.clearAllModelLockouts();

    const result = accountFallback.recordModelLockoutFailure(
      "antigravity",
      "conn-6",
      "claude-sonnet-4-6",
      "rate_limit",
      429,
      120_000,
      null,
      {
        exactCooldownMs: RESET_6863_MS,
        maxCooldownMs: CAP_7940_MS,
        exactCooldownVerified: true,
      }
    );

    assert.strictEqual(
      result.cooldownMs,
      RESET_6863_MS,
      `verified upstream exactCooldownMs must bypass maxCooldownMs entirely; got ${result.cooldownMs}`
    );
  });
});
