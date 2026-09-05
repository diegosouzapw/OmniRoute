import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { buildCodexUsageQuotas } from "../../../open-sse/services/codexUsageQuotas";

describe("Codex usage windows", () => {
  it("preserves upstream durations for session and weekly windows", () => {
    const { quotas } = buildCodexUsageQuotas({
      rate_limit: {
        primary_window: {
          used_percent: 7,
          limit_window_seconds: 18_000,
          reset_at: 1_785_623_016,
        },
        secondary_window: {
          used_percent: 19,
          limit_window_seconds: 604_800,
          reset_at: 1_785_678_428,
        },
      },
    });

    assert.deepEqual(quotas.session, {
      used: 7,
      total: 100,
      remaining: 93,
      resetAt: new Date(1_785_623_016_000).toISOString(),
      unlimited: false,
      windowSeconds: 18_000,
    });
    assert.deepEqual(quotas.weekly, {
      used: 19,
      total: 100,
      remaining: 81,
      resetAt: new Date(1_785_678_428_000).toISOString(),
      unlimited: false,
      windowSeconds: 604_800,
    });
  });

  it("accepts camelCase duration variants and nulls invalid values", () => {
    const { quotas } = buildCodexUsageQuotas({
      rateLimit: {
        primaryWindow: { usedPercent: 3, windowSeconds: "18000" },
        secondaryWindow: { usedPercent: 4, windowSeconds: "not-a-number" },
      },
    });

    assert.equal(quotas.session.windowSeconds, 18_000);
    assert.equal(quotas.weekly.windowSeconds, null);
  });
});
