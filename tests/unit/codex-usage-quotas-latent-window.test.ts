/**
 * Codex quota card accuracy (issue #8051).
 *
 * ChatGPT Codex's /backend-api/wham/usage advertises latent per-feature
 * rate-limit ceilings (e.g. the spark bucket, metered_feature "codex_bengalfox")
 * to accounts that have never used them. A never-used window reports
 * `used_percent: 0` with `reset_after_seconds == limit_window_seconds` (a
 * full window that never started counting down), so it recomputes its reset as
 * `now + full_window` on every fetch. It must not be rendered as a permanent
 * 100% quota row.
 *
 * Separately, the window display label must follow the real window duration
 * (`limit_window_seconds`) rather than assuming primary=session / secondary=
 * weekly by position — so a 7-day primary_window is labeled "Weekly", not
 * "Session". The internal `session`/`weekly` keys (routing semantics) are
 * unchanged; only the display label is corrected.
 */
import test from "node:test";
import assert from "node:assert/strict";

import { buildCodexUsageQuotas } from "../../open-sse/services/codexUsageQuotas.ts";
import {
  CODEX_SPARK_QUOTA_SESSION,
  CODEX_SPARK_DISPLAY_NAME,
} from "../../open-sse/config/codexQuotaScopes.ts";

const WEEK = 604800;

test("omits a latent, never-used spark window (used 0% + full-window reset)", () => {
  const { quotas } = buildCodexUsageQuotas({
    rate_limit: {
      primary_window: { used_percent: 4, limit_window_seconds: WEEK, reset_after_seconds: 590624 },
      secondary_window: null,
    },
    additional_rate_limits: [
      {
        limit_name: "GPT-5.3-Codex-Spark",
        metered_feature: "codex_bengalfox",
        rate_limit: {
          primary_window: {
            used_percent: 0,
            limit_window_seconds: WEEK,
            reset_after_seconds: WEEK, // never started
          },
          secondary_window: null,
        },
      },
    ],
  });
  assert.equal(quotas[CODEX_SPARK_QUOTA_SESSION], undefined, "latent spark window must be hidden");
  assert.ok(quotas.session, "the main session window is still present");
});

test("includes the spark window once it has actually been used", () => {
  const { quotas } = buildCodexUsageQuotas({
    rate_limit: {
      primary_window: { used_percent: 10, limit_window_seconds: WEEK, reset_after_seconds: 500000 },
    },
    additional_rate_limits: [
      {
        limit_name: "GPT-5.3-Codex-Spark",
        metered_feature: "codex_bengalfox",
        rate_limit: {
          primary_window: {
            used_percent: 12,
            limit_window_seconds: WEEK,
            reset_after_seconds: 400000, // anchored — real countdown
          },
        },
      },
    ],
  });
  assert.ok(quotas[CODEX_SPARK_QUOTA_SESSION], "used spark window must be shown");
  assert.equal(quotas[CODEX_SPARK_QUOTA_SESSION].used, 12);
});

test("spark display name comes from the payload limit_name, falling back to the constant", () => {
  const withName = buildCodexUsageQuotas({
    additional_rate_limits: [
      {
        limit_name: "GPT-9.9-Codex-Nova",
        metered_feature: "codex_bengalfox",
        rate_limit: {
          primary_window: { used_percent: 5, limit_window_seconds: WEEK, reset_after_seconds: 1000 },
        },
      },
    ],
  }).quotas[CODEX_SPARK_QUOTA_SESSION];
  assert.equal(withName?.displayName, "GPT-9.9-Codex-Nova", "uses payload limit_name");

  const withoutName = buildCodexUsageQuotas({
    additional_rate_limits: [
      {
        metered_feature: "codex_bengalfox",
        model: "codex-spark",
        rate_limit: {
          primary_window: { used_percent: 5, limit_window_seconds: WEEK, reset_after_seconds: 1000 },
        },
      },
    ],
  }).quotas[CODEX_SPARK_QUOTA_SESSION];
  assert.equal(withoutName?.displayName, CODEX_SPARK_DISPLAY_NAME, "falls back to constant");
});

test("labels a 7-day primary_window as Weekly, not Session", () => {
  const { quotas } = buildCodexUsageQuotas({
    rate_limit: {
      primary_window: { used_percent: 4, limit_window_seconds: WEEK, reset_after_seconds: 590624 },
      secondary_window: null,
    },
  });
  assert.ok(quotas.session, "primary window is keyed 'session' (routing semantics unchanged)");
  assert.equal(quotas.session.displayName, "Weekly", "but displayed as Weekly by real duration");
});

test("leaves a genuine 5h session window with the default label", () => {
  const { quotas } = buildCodexUsageQuotas({
    rate_limit: {
      primary_window: { used_percent: 20, limit_window_seconds: 18000, reset_after_seconds: 9000 },
      secondary_window: {
        used_percent: 3,
        limit_window_seconds: WEEK,
        reset_after_seconds: 500000,
      },
    },
  });
  assert.equal(quotas.session.displayName, undefined, "5h primary keeps default 'Session' label");
  assert.equal(quotas.weekly.displayName, undefined, "7d secondary keeps default 'Weekly' label");
});
