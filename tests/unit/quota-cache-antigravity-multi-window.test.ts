import { afterEach, test } from "node:test";
import assert from "node:assert/strict";

const quotaCache = await import("../../src/domain/quotaCache.ts");

afterEach(() => quotaCache.__clearForTests());

const futureReset = new Date(Date.now() + 60 * 60 * 1000).toISOString();

function setGeminiWindows(connectionId: string, session: number | null, weekly: number | null) {
  const quotas: Record<string, unknown> = {};
  if (session !== null) {
    quotas.gemini_session = {
      used: 100 - session,
      total: 100,
      remainingPercentage: session,
      resetAt: futureReset,
      unlimited: false,
      fractionReported: true,
    };
  }
  if (weekly !== null) {
    quotas.gemini_weekly = {
      used: 100 - weekly,
      total: 100,
      remainingPercentage: weekly,
      resetAt: futureReset,
      unlimited: false,
      fractionReported: true,
    };
  }
  quotaCache.setQuotaCache(connectionId, "antigravity", quotas);
}

test("Antigravity Gemini family blocks when weekly is exhausted despite 5h headroom", () => {
  setGeminiWindows("weekly-exhausted", 80, 0);
  assert.equal(
    quotaCache.isQuotaExhaustedForRequest(
      "weekly-exhausted",
      "antigravity",
      "gemini-3.8-flash-high"
    ),
    true
  );
});

test("Antigravity Gemini family blocks when 5h is exhausted despite weekly headroom", () => {
  setGeminiWindows("session-exhausted", 0, 70);
  assert.equal(
    quotaCache.isQuotaExhaustedForRequest(
      "session-exhausted",
      "antigravity",
      "gemini-3.8-flash-high"
    ),
    true
  );
});

test("Antigravity Gemini family is usable only when all reported windows have headroom", () => {
  setGeminiWindows("both-available", 80, 70);
  assert.equal(
    quotaCache.isQuotaExhaustedForRequest("both-available", "antigravity", "gemini-3.8-flash-high"),
    false
  );
});

test("missing weekly window falls back to the reported session rather than assuming weekly is full", () => {
  setGeminiWindows("summary-unavailable", 80, null);
  assert.equal(
    quotaCache.isQuotaExhaustedForRequest(
      "summary-unavailable",
      "antigravity",
      "gemini-3.8-flash-high"
    ),
    false
  );
});
