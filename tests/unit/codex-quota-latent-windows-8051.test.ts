import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { buildCodexUsageQuotas } from "../../open-sse/services/codexUsageQuotas.ts";

/**
 * #8051 — Two bugs in buildCodexUsageQuotas:
 *
 * 1. Latent per-feature windows (never-used, used_percent=0 +
 *    reset_after_seconds >= limit_window_seconds) are rendered as
 *    permanent 100% windows. They should be omitted until actually used.
 *
 * 2. Window labels ("session"/"weekly") are position-based
 *    (primary→session, secondary→weekly) instead of derived from
 *    limit_window_seconds. A 7-day primary window gets mislabeled "session".
 */
describe("#8051 latent per-feature windows omitted, window labels by duration", () => {
  // ── Issue 1: latent spark window suppression ──

  it("omits latent spark window when used_percent=0 and reset=full window", () => {
    const data = {
      rate_limit: {
        primary_window: {
          used_percent: 4,
          limit_window_seconds: 604800,
          reset_after_seconds: 590624,
        },
      },
      additional_rate_limits: [
        {
          limit_name: "GPT-5.3-Codex-Spark",
          metered_feature: "codex_bengalfox",
          rate_limit: {
            primary_window: {
              used_percent: 0,
              limit_window_seconds: 604800,
              reset_after_seconds: 604800, // full window — never started counting
            },
          },
        },
      ],
    };
    const { quotas } = buildCodexUsageQuotas(data);
    const sparkKeys = Object.keys(quotas).filter((k) => k.includes("spark"));
    assert.equal(sparkKeys.length, 0, "latent spark window should not appear");
  });

  it("includes spark window once actually used (used_percent > 0)", () => {
    const data = {
      rate_limit: {
        primary_window: {
          used_percent: 4,
          limit_window_seconds: 604800,
          reset_after_seconds: 590624,
        },
      },
      additional_rate_limits: [
        {
          limit_name: "GPT-5.3-Codex-Spark",
          metered_feature: "codex_bengalfox",
          rate_limit: {
            primary_window: {
              used_percent: 15,
              limit_window_seconds: 604800,
              reset_after_seconds: 400000, // < full — counting down
            },
          },
        },
      ],
    };
    const { quotas } = buildCodexUsageQuotas(data);
    const sparkKeys = Object.keys(quotas).filter((k) => k.includes("spark"));
    assert.ok(sparkKeys.length > 0, "active spark window should appear");
  });

  it("includes spark window when used_percent=0 but reset is anchored (< full window)", () => {
    // Edge: some plans report 0% used but an already-counting reset
    const data = {
      rate_limit: {
        primary_window: {
          used_percent: 4,
          limit_window_seconds: 604800,
          reset_after_seconds: 590624,
        },
      },
      additional_rate_limits: [
        {
          limit_name: "GPT-5.3-Codex-Spark",
          metered_feature: "codex_bengalfox",
          rate_limit: {
            primary_window: {
              used_percent: 0,
              limit_window_seconds: 604800,
              reset_after_seconds: 500000, // < 604800 — counting down
            },
          },
        },
      ],
    };
    const { quotas } = buildCodexUsageQuotas(data);
    const sparkKeys = Object.keys(quotas).filter((k) => k.includes("spark"));
    assert.ok(sparkKeys.length > 0, "spark window with anchored reset should appear");
  });

  // ── Issue 2: window labels derived from limit_window_seconds ──

  it("labels a 7-day primary window as weekly, not session", () => {
    const data = {
      rate_limit: {
        primary_window: {
          used_percent: 4,
          limit_window_seconds: 604800, // 7 days
          reset_after_seconds: 590624,
        },
      },
    };
    const { quotas } = buildCodexUsageQuotas(data);
    assert.ok("weekly" in quotas, "7-day primary window should be labeled 'weekly'");
    assert.ok(!("session" in quotas), "7-day window should NOT be labeled 'session'");
  });

  it("labels a short (~5h) primary window as session", () => {
    const data = {
      rate_limit: {
        primary_window: {
          used_percent: 30,
          limit_window_seconds: 18000, // ~5h
          reset_after_seconds: 12000,
        },
      },
    };
    const { quotas } = buildCodexUsageQuotas(data);
    assert.ok("session" in quotas, "~5h primary window should be labeled 'session'");
  });

  it("labels primary + secondary windows independently by duration", () => {
    const data = {
      rate_limit: {
        primary_window: {
          used_percent: 30,
          limit_window_seconds: 18000, // ~5h → session
          reset_after_seconds: 12000,
        },
        secondary_window: {
          used_percent: 10,
          limit_window_seconds: 604800, // 7d → weekly
          reset_after_seconds: 400000,
        },
      },
    };
    const { quotas } = buildCodexUsageQuotas(data);
    assert.ok("session" in quotas, "primary ~5h → session");
    assert.ok("weekly" in quotas, "secondary 7d → weekly");
  });

  // ── Regression: existing behavior preserved ──

  it("still shows core windows when no additional_rate_limits", () => {
    const data = {
      rate_limit: {
        primary_window: {
          used_percent: 50,
          limit_window_seconds: 18000,
          reset_after_seconds: 9000,
        },
      },
    };
    const { quotas } = buildCodexUsageQuotas(data);
    assert.ok(Object.keys(quotas).length > 0, "core window should always appear");
  });

  it("uses payload limit_name as displayName for spark window", () => {
    const data = {
      rate_limit: {
        primary_window: {
          used_percent: 4,
          limit_window_seconds: 604800,
          reset_after_seconds: 590624,
        },
      },
      additional_rate_limits: [
        {
          limit_name: "Custom-Spark-Label",
          metered_feature: "codex_bengalfox",
          rate_limit: {
            primary_window: {
              used_percent: 20,
              limit_window_seconds: 604800,
              reset_after_seconds: 400000,
            },
          },
        },
      ],
    };
    const { quotas } = buildCodexUsageQuotas(data);
    const sparkEntry = Object.values(quotas).find(
      (q) => q.displayName && q.displayName.includes("Spark")
    );
    assert.ok(sparkEntry, "spark window should be present");
    assert.equal(
      sparkEntry!.displayName,
      "Custom-Spark-Label",
      "displayName should come from payload limit_name"
    );
  });
});
