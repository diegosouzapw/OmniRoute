/**
 * Regression: Z.AI (GLM) weekly quota was capped at a 24h cooldown instead of
 * the real ~6-day reset the upstream reported.
 *
 * Body from production (connection zai/glm-5.3):
 *   "[1310][Weekly/Monthly Limit Exhausted. Your limit will reset at 2026-08-29 21:01:21]"
 *
 * looksLikeQuotaExhausted() and isWeeklyUsageLimitText() both matched, so the
 * weekly branch was taken — but buildWeeklyQuotaFallback() calls
 * parseDayGranularityResetMs() FIRST and that only knew "reset in N days" and
 * the year-less "reset at MM-DD HH:MM:SS UTC" shape (#qwen). A full ISO
 * datetime parsed to null, so the weekly fallback used its
 * WEEKLY_QUOTA_COOLDOWN_MS default of 24h. The ISO matcher that DOES handle
 * this shape lives in parseRetryFromErrorText() and is never reached from the
 * weekly branch.
 *
 * Result: rate_limited_until was written 24h out instead of the true reset,
 * and the connection was dispatched into a real upstream 429 every day for
 * the rest of the week.
 */

import { describe, it } from "node:test";
import assert from "node:assert/strict";

import { looksLikeQuotaExhausted } from "../../../src/shared/utils/classify429.ts";
import {
  isWeeklyUsageLimitText,
  buildWeeklyQuotaFallback,
} from "../../../open-sse/services/quotaTextCooldowns.ts";
import {
  parseDayGranularityResetMs,
  parseIsoDateTimeResetMs,
  parseMonthDayResetMs,
  shouldPreserveQuotaSignals,
} from "../../../open-sse/services/quotaResetParsing.ts";
import { RateLimitReason } from "../../../open-sse/config/constants.ts";

const GLM_BODY =
  "[1310][Weekly/Monthly Limit Exhausted. Your current plan has run out of its weekly/monthly quota. " +
  "Your limit will reset at 2026-08-29 21:01:21]";
const MAX_MS = 30 * 24 * 60 * 60 * 1000; // MAX_WEEKLY_QUOTA_COOLDOWN_MS
const DAY_MS = 24 * 60 * 60 * 1000;
const NOW = Date.UTC(2026, 7, 23, 20, 30, 56); // 2026-08-23 20:30:56 UTC
const RESET = Date.UTC(2026, 7, 29, 21, 1, 21); // 2026-08-29 21:01:21 UTC

describe("Z.AI GLM weekly quota — absolute ISO reset", () => {
  it("looksLikeQuotaExhausted matches the [1310] weekly/monthly body", () => {
    assert.equal(looksLikeQuotaExhausted(GLM_BODY), true);
  });

  it("shouldPreserveQuotaSignals is true for zai with this body", () => {
    assert.equal(shouldPreserveQuotaSignals("zai", GLM_BODY), true);
  });

  it("isWeeklyUsageLimitText matches weekly/monthly limit wording", () => {
    assert.equal(isWeeklyUsageLimitText(GLM_BODY.toLowerCase()), true);
  });

  it("parseIsoDateTimeResetMs reads a space-separated naive datetime as UTC", () => {
    assert.equal(parseIsoDateTimeResetMs(GLM_BODY, MAX_MS, NOW), RESET - NOW);
  });

  it("parseIsoDateTimeResetMs accepts the T separator and an explicit Z", () => {
    assert.equal(
      parseIsoDateTimeResetMs("reset at 2026-08-29T21:01:21Z", MAX_MS, NOW),
      RESET - NOW
    );
  });

  it("parseIsoDateTimeResetMs honours an explicit UTC offset", () => {
    // 23:01:21+02:00 is the same instant as 21:01:21Z.
    assert.equal(
      parseIsoDateTimeResetMs("reset at 2026-08-29 23:01:21+02:00", MAX_MS, NOW),
      RESET - NOW
    );
    assert.equal(
      parseIsoDateTimeResetMs("reset at 2026-08-29 23:01:21+0200", MAX_MS, NOW),
      RESET - NOW
    );
  });

  it("parseIsoDateTimeResetMs returns null for a past reset and caps at maxMs", () => {
    assert.equal(parseIsoDateTimeResetMs("reset at 2026-08-22 10:00:00", MAX_MS, NOW), null);
    assert.equal(parseIsoDateTimeResetMs("reset at 2027-08-29 21:01:21", MAX_MS, NOW), MAX_MS);
  });

  it("parseDayGranularityResetMs returns the real reset, not the 24h cap", () => {
    const waitMs = parseDayGranularityResetMs(GLM_BODY, MAX_MS, NOW);
    assert.equal(waitMs, RESET - NOW);
    assert.ok(waitMs! > DAY_MS, `expected more than 24h, got ${waitMs}`);
  });

  it("keeps the Qwen year-less MM-DD parser working", () => {
    const qwenBody =
      "Your token-plan 1-week quota has been exhausted. The quota will reset at 08-29 15:29:00 UTC.";
    const expected = Date.UTC(2026, 7, 29, 15, 29, 0) - NOW;
    assert.equal(parseMonthDayResetMs(qwenBody, MAX_MS, NOW), expected);
    assert.equal(parseDayGranularityResetMs(qwenBody, MAX_MS, NOW), expected);
  });

  it("keeps the 'reset in N days' parser winning over the ISO branch", () => {
    assert.equal(parseDayGranularityResetMs("quota will reset in 3 days", MAX_MS, NOW), 3 * DAY_MS);
  });

  it("buildWeeklyQuotaFallback uses the parsed ISO reset, not the 24h default", () => {
    // nowMs is injected: the fixture pins the reset to a fixed calendar date,
    // so wall-clock evaluation would time-bomb once real time drifts past
    // 5 days before it (exactly what happened in CI on 2026-08-25).
    const result = buildWeeklyQuotaFallback(GLM_BODY, NOW);
    assert.ok(result);
    assert.equal(result!.reason, RateLimitReason.QUOTA_EXHAUSTED);
    assert.equal(result!.usedUpstreamRetryHint, true);
    assert.ok(
      result!.cooldownMs > 5 * DAY_MS,
      `expected a multi-day cooldown, got ${result!.cooldownMs}`
    );
    assert.ok(result!.cooldownMs <= MAX_MS);
    assert.ok(
      result!.cooldownMs !== DAY_MS,
      "must not fall back to WEEKLY_QUOTA_COOLDOWN_MS (24h)"
    );
  });

  it("checkFallbackError classifies the GLM 429 as QUOTA_EXHAUSTED with the real wait", async () => {
    const { checkFallbackError, parseRetryFromErrorText } =
      await import("../../../open-sse/services/accountFallback.ts");

    // Pin the clock to the fixture's NOW: the fixture's reset is a fixed
    // calendar date, and wall-clock evaluation fails once real time drifts
    // within 5 days of it (CI time-bomb on 2026-08-25).
    const realNow = Date.now;
    Date.now = () => NOW;
    try {
      const parsed = parseRetryFromErrorText(GLM_BODY);
      assert.ok(parsed && parsed > 5 * DAY_MS, `parsed reset was ${parsed}`);

      const out = checkFallbackError(429, GLM_BODY, 0, "glm-5.3", "zai", null, null, null);
      assert.equal(out.shouldFallback, true);
      assert.equal(out.reason, RateLimitReason.QUOTA_EXHAUSTED);
      assert.ok(
        (out.cooldownMs ?? 0) > 5 * DAY_MS,
        `expected a multi-day cooldown, got ${out.cooldownMs}`
      );
      assert.ok((out.cooldownMs ?? 0) !== DAY_MS, "must not land on the 24h weekly default");
    } finally {
      Date.now = realNow;
    }
  });
});
