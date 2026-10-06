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

import { looksLikeQuotaExhausted } from "../../src/shared/utils/classify429.ts";
import {
  isWeeklyUsageLimitText,
  buildWeeklyQuotaFallback,
} from "../../open-sse/services/quotaTextCooldowns.ts";
import {
  parseDayGranularityResetMs,
  parseIsoDateTimeResetMs,
  parseMonthDayResetMs,
  shouldPreserveQuotaSignals,
} from "../../open-sse/services/quotaResetParsing.ts";
import { RateLimitReason } from "../../open-sse/config/constants.ts";

const GLM_BODY =
  "[1310][Weekly/Monthly Limit Exhausted. Your current plan has run out of its weekly/monthly quota. " +
  "Your limit will reset at 2026-08-29 21:01:21]";
const MAX_MS = 30 * 24 * 60 * 60 * 1000; // MAX_WEEKLY_QUOTA_COOLDOWN_MS
const DAY_MS = 24 * 60 * 60 * 1000;
const NOW = Date.UTC(2026, 7, 23, 20, 30, 56); // 2026-08-23 20:30:56 UTC
// Z.AI server clock outputs Asia/Shanghai (UTC+8) time without timezone designator (Issue #14479).
// 2026-08-29 21:01:21 CST is 2026-08-29 13:01:21 UTC:
const RESET_CST = Date.UTC(2026, 7, 29, 13, 1, 21);
// Generic zone-less reset without provider or Z.AI error code defaults to UTC:
const RESET_UTC = Date.UTC(2026, 7, 29, 21, 1, 21);

// Issue #14479: live incident 5-hour quota exhaustion from Z.AI:
const GLM_5H_BODY =
  "[429]: [1308][Usage limit reached for 5 hour. Your limit will reset at 2026-09-22 16:25:56][20260922153033...]";
const NOW_5H = Date.UTC(2026, 8, 22, 7, 30, 32); // 2026-09-22 07:30:32 UTC (15:30:32 CST)
// 16:25:56 CST is 08:25:56 UTC (remaining wait: ~55m24s):
const RESET_5H_CST = Date.UTC(2026, 8, 22, 8, 25, 56);
const WAIT_5H_CST = RESET_5H_CST - NOW_5H; // 3,324,000 ms (~55m 24s)

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

  it("parseIsoDateTimeResetMs reads a generic space-separated naive datetime as UTC", () => {
    assert.equal(
      parseIsoDateTimeResetMs("reset at 2026-08-29 21:01:21", MAX_MS, NOW),
      RESET_UTC - NOW
    );
    assert.equal(
      parseIsoDateTimeResetMs("reset at 2026-08-29 21:01:21", MAX_MS, NOW, "openai"),
      RESET_UTC - NOW
    );
    assert.equal(
      parseIsoDateTimeResetMs("reset at 2026-08-29 21:01:21", MAX_MS, NOW, "anthropic"),
      RESET_UTC - NOW
    );
  });

  it("parseIsoDateTimeResetMs reads Z.AI GLM naive datetime as Asia/Shanghai (UTC+8)", () => {
    assert.equal(parseIsoDateTimeResetMs(GLM_BODY, MAX_MS, NOW), RESET_CST - NOW);
    assert.equal(parseIsoDateTimeResetMs(GLM_BODY, MAX_MS, NOW, "zai"), RESET_CST - NOW);
    assert.equal(parseIsoDateTimeResetMs("reset at 2026-08-29 21:01:21", MAX_MS, NOW, "zai"), RESET_CST - NOW);
    assert.equal(parseIsoDateTimeResetMs("reset at 2026-08-29 21:01:21", MAX_MS, NOW, "glm"), RESET_CST - NOW);
    assert.equal(parseIsoDateTimeResetMs("reset at 2026-08-29 21:01:21", MAX_MS, NOW, "glm-cn"), RESET_CST - NOW);
    assert.equal(parseIsoDateTimeResetMs("reset at 2026-08-29 21:01:21", MAX_MS, NOW, "glmt"), RESET_CST - NOW);
    assert.equal(parseIsoDateTimeResetMs("reset at 2026-08-29 21:01:21", MAX_MS, NOW, "+08:00"), RESET_CST - NOW);
  });

  it("parseIsoDateTimeResetMs parses z.ai 5-hour quota reset ([1308]) as Asia/Shanghai (Issue #14479)", () => {
    assert.equal(parseIsoDateTimeResetMs(GLM_5H_BODY, MAX_MS, NOW_5H), WAIT_5H_CST);
    assert.equal(parseIsoDateTimeResetMs(GLM_5H_BODY, MAX_MS, NOW_5H, "zai"), WAIT_5H_CST);
  });

  it("parseIsoDateTimeResetMs accepts the T separator and an explicit Z", () => {
    assert.equal(
      parseIsoDateTimeResetMs("reset at 2026-08-29T21:01:21Z", MAX_MS, NOW),
      RESET_UTC - NOW
    );
  });

  it("parseIsoDateTimeResetMs honours an explicit UTC offset", () => {
    // 23:01:21+02:00 is the same instant as 21:01:21Z.
    assert.equal(
      parseIsoDateTimeResetMs("reset at 2026-08-29 23:01:21+02:00", MAX_MS, NOW),
      RESET_UTC - NOW
    );
    assert.equal(
      parseIsoDateTimeResetMs("reset at 2026-08-29 23:01:21+0200", MAX_MS, NOW),
      RESET_UTC - NOW
    );
  });

  it("parseIsoDateTimeResetMs returns null for a past reset and caps at maxMs", () => {
    assert.equal(parseIsoDateTimeResetMs("reset at 2026-08-22 10:00:00", MAX_MS, NOW), null);
    assert.equal(parseIsoDateTimeResetMs("reset at 2027-08-29 21:01:21", MAX_MS, NOW), MAX_MS);
  });

  it("parseDayGranularityResetMs returns the real reset in Asia/Shanghai, not the 24h cap", () => {
    const waitMs = parseDayGranularityResetMs(GLM_BODY, MAX_MS, NOW, "zai");
    assert.equal(waitMs, RESET_CST - NOW);
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
    const result = buildWeeklyQuotaFallback(GLM_BODY, NOW, "zai");
    assert.ok(result);
    assert.equal(result!.reason, RateLimitReason.QUOTA_EXHAUSTED);
    assert.equal(result!.usedUpstreamRetryHint, true);
    assert.equal(result!.cooldownMs, RESET_CST - NOW);
  });

  it("checkFallbackError classifies the GLM 429 as QUOTA_EXHAUSTED with the real wait", async () => {
    const { checkFallbackError, parseRetryFromErrorText } =
      await import("../../open-sse/services/accountFallback.ts");

    const realNow = Date.now;
    Date.now = () => NOW;
    try {
      const parsed = parseRetryFromErrorText(GLM_BODY, "zai");
      assert.equal(parsed, RESET_CST - NOW);

      const out = checkFallbackError(429, GLM_BODY, 0, "glm-5.3", "zai", null, null, null);
      assert.equal(out.shouldFallback, true);
      assert.equal(out.reason, RateLimitReason.QUOTA_EXHAUSTED);
      assert.equal(out.cooldownMs, RESET_CST - NOW);
    } finally {
      Date.now = realNow;
    }
  });

  it("checkFallbackError calculates 5h quota [1308] wait as ~55m instead of ~8.9h (Issue #14479)", async () => {
    const { checkFallbackError, parseRetryFromErrorText } =
      await import("../../open-sse/services/accountFallback.ts");

    const realNow = Date.now;
    Date.now = () => NOW_5H;
    try {
      const parsed = parseRetryFromErrorText(GLM_5H_BODY, "zai");
      assert.equal(parsed, WAIT_5H_CST);

      const out = checkFallbackError(429, GLM_5H_BODY, 0, "glm-5.3", "zai", null, null, null);
      assert.equal(out.shouldFallback, true);
      assert.equal(out.reason, RateLimitReason.QUOTA_EXHAUSTED);
      assert.equal(out.cooldownMs, WAIT_5H_CST);
    } finally {
      Date.now = realNow;
    }
  });
});
