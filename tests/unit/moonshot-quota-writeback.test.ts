import test from "node:test";
import assert from "node:assert/strict";
import { classify429 } from "../../src/shared/utils/classify429.ts";
import { checkFallbackError } from "../../open-sse/services/accountFallback.ts";
import { registerMoonshotFetchersForNodes } from "../../open-sse/services/moonshotQuotaFetcher.ts";
import { getQuotaFetcher } from "../../open-sse/services/quotaPreflight.ts";

const MOONSHOT_TPD =
  "Your account org-73b383ab6d45484eb2ef72161074495c / proj-30863601b47548bdbbabc42ff4c72eee <ak-test> request reached organization TPD rate limit, current: 1537190, limit: 1500000";
const MOONSHOT_BROKE = "insufficient balance";
const COMPAT = "openai-compatible-chat-e2971611-bc02-4c37-8fc5-39b8e3906fdf";

test("classify429 maps Moonshot TPD to quota_exhausted so combo persist stays on", () => {
  assert.equal(classify429({ status: 429, body: MOONSHOT_TPD }), "quota_exhausted");
});

test("checkFallbackError TPD with node clock returns future cooldown, not host midnight", () => {
  const now = Date.parse("2026-09-02T07:30:00Z");
  const result = checkFallbackError(
    429,
    MOONSHOT_TPD,
    0,
    "kimi-k2.5",
    COMPAT,
    null,
    null,
    null,
    null,
    { timezone: "Asia/Shanghai", hour: 0, nowMs: now },
  );
  assert.equal(result.shouldFallback, true);
  assert.equal(result.dailyQuotaExhausted, true);
  assert.ok(result.cooldownMs > 8 * 3600_000);
  const until = now + result.cooldownMs;
  assert.ok(Math.abs(until - Date.parse("2026-09-02T16:00:00Z")) < 60_000);
});

test("checkFallbackError insufficient balance on compatible node is creditsExhausted", () => {
  const result = checkFallbackError(429, MOONSHOT_BROKE, 0, "kimi-k2.5", COMPAT);
  assert.equal(result.creditsExhausted, true);
  assert.equal(result.shouldFallback, true);
});

test("registerMoonshotFetchersForNodes wires uuid and prefix after startup scan", () => {
  registerMoonshotFetchersForNodes([
    { id: COMPAT, prefix: "mnative", baseUrl: "https://api.moonshot.cn/v1" },
  ]);
  assert.equal(typeof getQuotaFetcher(COMPAT), "function");
  assert.equal(typeof getQuotaFetcher("mnative"), "function");
});
