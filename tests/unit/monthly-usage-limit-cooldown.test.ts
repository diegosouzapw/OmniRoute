import { describe, it, expect } from "vitest";
import {
  parseRetryFromErrorText,
  classifyErrorText,
} from "@omniroute/open-sse/services/accountFallback";
import { matchErrorRuleByText } from "@omniroute/open-sse/config/errorConfig";

/**
 * Regression tests for issue #6060:
 * "Monthly usage limit reached. Resets in N days." was treated as a transient
 * 429 (~60s) instead of an N-day cooldown.
 *
 * Root causes:
 * 1. parseRetryFromErrorText only matched h/m/s — not "N days".
 * 2. "usage limit reached" was absent from ERROR_RULES, so apikey providers
 *    fell through to the generic status_429 backoff rule (rate_limit_exceeded).
 */

describe("parseRetryFromErrorText — days variant", () => {
  it('parses "Resets in 5 days" to 5 days in ms', () => {
    const result = parseRetryFromErrorText("Monthly usage limit reached. Resets in 5 days.");
    expect(result).toBe(5 * 24 * 60 * 60 * 1000);
  });

  it('parses "Resets in 1 day" (singular)', () => {
    const result = parseRetryFromErrorText("Usage limit reached. Resets in 1 day.");
    expect(result).toBe(1 * 24 * 60 * 60 * 1000);
  });

  it('parses "resets in 30 days" (case-insensitive)', () => {
    const result = parseRetryFromErrorText("usage limit reached. resets in 30 days.");
    expect(result).toBe(30 * 24 * 60 * 60 * 1000);
  });

  it("caps at MAX_PROVIDER_COOLDOWN_MS (30 days)", () => {
    const result = parseRetryFromErrorText("Resets in 999 days.");
    const cap = 30 * 24 * 60 * 60 * 1000;
    expect(result).toBe(cap);
  });

  it("does not match when no day count present", () => {
    const result = parseRetryFromErrorText("Monthly usage limit reached.");
    expect(result).toBeNull();
  });

  it("still parses h/m/s format from Antigravity (regression guard)", () => {
    const result = parseRetryFromErrorText("Resets in 164h27m24s");
    const expected = (164 * 3600 + 27 * 60 + 24) * 1000;
    expect(result).toBe(expected);
  });
});

describe("classifyErrorText — monthly limit", () => {
  it('classifies "Monthly usage limit reached" as quota_exhausted', () => {
    const result = classifyErrorText("Monthly usage limit reached. Resets in 5 days.");
    expect(result).toBe("quota_exhausted");
  });
});

describe("matchErrorRuleByText — usage_limit_reached rule", () => {
  it('matches "usage limit reached" text to quota_exhausted rule', () => {
    const rule = matchErrorRuleByText("Monthly usage limit reached. Resets in 5 days.");
    expect(rule).not.toBeNull();
    expect(rule?.reason).toBe("quota_exhausted");
    expect(rule?.id).toBe("usage_limit_reached");
  });

  it("has backoff: true so the error is retryable rather than permanent", () => {
    const rule = matchErrorRuleByText("usage limit reached");
    expect(rule?.backoff).toBe(true);
  });
});
