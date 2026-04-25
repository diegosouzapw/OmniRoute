import test from "node:test";
import assert from "node:assert/strict";

const claudeExtraUsage = await import("../../src/lib/providers/claudeExtraUsage.ts");
const { normalizeProviderSpecificData } =
  await import("../../src/lib/providers/requestDefaults.ts");
const { updateProviderConnectionSchema } = await import("../../src/shared/validation/schemas.ts");

function futureIso(ms = 60_000) {
  return new Date(Date.now() + ms).toISOString();
}

test("Claude extra-usage blocking defaults to enabled and validates provider payloads", () => {
  assert.equal(claudeExtraUsage.isClaudeExtraUsageBlockEnabled("claude", {}), true);
  assert.equal(
    claudeExtraUsage.isClaudeExtraUsageBlockEnabled("claude", { blockExtraUsage: false }),
    false
  );
  assert.equal(
    claudeExtraUsage.isClaudeExtraUsageBlockEnabled("openai", { blockExtraUsage: false }),
    false
  );

  assert.deepEqual(normalizeProviderSpecificData("claude", { blockExtraUsage: "nope", tag: "x" }), {
    tag: "x",
  });

  const valid = updateProviderConnectionSchema.safeParse({
    providerSpecificData: { blockExtraUsage: false },
  });
  const invalid = updateProviderConnectionSchema.safeParse({
    providerSpecificData: { blockExtraUsage: "false" },
  });

  assert.equal(valid.success, true);
  assert.equal(invalid.success, false);
});

test("Claude extra-usage state builds an unavailable cooldown update from queued usage", () => {
  const sessionReset = futureIso(180_000);
  const weeklyReset = futureIso(360_000);

  const update = claudeExtraUsage.buildClaudeExtraUsageConnectionUpdate(
    {
      provider: "claude",
      providerSpecificData: { blockExtraUsage: true },
      backoffLevel: 0,
    },
    {
      extraUsage: { queued: true, billingAmount: 0.5 },
      quotas: {
        "session (5h)": { remainingPercentage: 0, resetAt: sessionReset },
        "weekly (7d)": { remainingPercentage: 62, resetAt: weeklyReset },
      },
    }
  );

  assert.equal(update?.testStatus, "unavailable");
  assert.equal(update?.lastErrorType, "quota_exhausted");
  assert.equal(update?.lastErrorSource, claudeExtraUsage.CLAUDE_EXTRA_USAGE_ERROR_SOURCE);
  assert.equal(update?.errorCode, 429);
  assert.equal(update?.rateLimitedUntil, sessionReset);
  assert.equal(update?.backoffLevel, 1);
});

test("Claude extra-usage state clears only when a trusted snapshot says queued usage ended", () => {
  const currentState = {
    provider: "claude",
    providerSpecificData: { blockExtraUsage: true },
    testStatus: "unavailable",
    lastError: claudeExtraUsage.CLAUDE_EXTRA_USAGE_ERROR_MESSAGE,
    lastErrorSource: claudeExtraUsage.CLAUDE_EXTRA_USAGE_ERROR_SOURCE,
    lastErrorType: "quota_exhausted",
    rateLimitedUntil: futureIso(180_000),
    backoffLevel: 1,
  };

  const cleared = claudeExtraUsage.buildClaudeExtraUsageConnectionUpdate(currentState, {
    extraUsage: null,
    quotas: {
      "session (5h)": { remainingPercentage: 42, resetAt: futureIso(120_000) },
    },
  });
  const unchanged = claudeExtraUsage.buildClaudeExtraUsageConnectionUpdate(currentState, {
    message: "Claude connected. Unable to fetch usage: timeout",
  });

  assert.equal(cleared?.testStatus, "active");
  assert.equal(cleared?.lastError, null);
  assert.equal(cleared?.lastErrorSource, null);
  assert.equal(cleared?.rateLimitedUntil, null);
  assert.equal(cleared?.backoffLevel, 0);
  assert.equal(unchanged, null);
});
