/**
 * Regression test for #13194 — the 429 classifier was English-only.
 *
 * Every entry in `QUOTA_PATTERNS` matched English phrasing, so a CJK provider
 * returning an explicit, absolute quota-exhaustion message fell through to the
 * `"rate_limit"` default. The gateway then scheduled a 6-60s cooldown for a
 * window the upstream had declared as tens of minutes (or a whole day), and
 * retried a model that could not succeed — instead of failing over.
 *
 * The last test is the guard rail for the fix: the Chinese *transient* phrasing
 * ("too many requests, retry later") must keep classifying as a rate limit, so
 * the added patterns are held to phrases that name a cap or an exhausted
 * balance rather than any Chinese 429 body.
 */
import { test } from "node:test";
import assert from "node:assert/strict";
import { classify429, looksLikeQuotaExhausted } from "../../src/shared/utils/classify429.ts";

test("z.ai/GLM Chinese 5-hour window exhaustion is quota_exhausted (#13194)", () => {
  const body = "已达到 5 小时的使用上限。您的限额将在 2026-09-10 19:01:19 重置。";

  assert.equal(looksLikeQuotaExhausted(body), true);
  assert.equal(classify429({ status: 429, body }), "quota_exhausted");
});

test("the GLM body wrapped in error.message is still quota_exhausted (#13194)", () => {
  const body = {
    error: { message: "已达到 5 小时的使用上限。您的限额将在 2026-09-10 19:01:19 重置。" },
  };

  assert.equal(looksLikeQuotaExhausted(body), true);
  assert.equal(classify429({ status: 429, body }), "quota_exhausted");
});

test("Moonshot/Kimi Chinese balance exhaustion is quota_exhausted (#13194)", () => {
  const body = "您的账户额度已用尽，请充值后重试。";

  assert.equal(looksLikeQuotaExhausted(body), true);
  assert.equal(classify429({ status: 429, body }), "quota_exhausted");
});

test("DashScope/Qwen Chinese free-quota exhaustion is quota_exhausted (#13194)", () => {
  const body = "当前账户的免费额度已用完，请前往控制台充值。";

  assert.equal(looksLikeQuotaExhausted(body), true);
  assert.equal(classify429({ status: 429, body }), "quota_exhausted");
});

test("MiniMax Chinese daily call cap is quota_exhausted (#13194)", () => {
  const body = "已达到今日调用上限，请明日再试。";

  assert.equal(looksLikeQuotaExhausted(body), true);
  assert.equal(classify429({ status: 429, body }), "quota_exhausted");
});

test("the English control still classifies as quota_exhausted", () => {
  const body = {
    error: {
      message: "You exceeded your current quota, please check your plan and billing details.",
    },
  };

  assert.equal(classify429({ status: 429, body }), "quota_exhausted");
});

test("a Chinese transient throttle stays a rate_limit (#13194 guard rail)", () => {
  // "too many requests, please retry later" — transient per-minute throttling.
  // None of the added patterns may match it, or every Chinese rate limit would
  // be locked out for the long quota bucket.
  const body = "请求过于频繁，请稍后重试。";

  assert.equal(looksLikeQuotaExhausted(body), false);
  assert.equal(classify429({ status: 429, body }), "rate_limit");
});

test("a sub-hour upstream retry hint still downgrades a CJK quota body", () => {
  // The declared window stays authoritative over keywords (decision order in
  // classify429): if the upstream says the throttle clears in seconds, the long
  // quota bucket must not be applied even though a quota pattern matched.
  const body = {
    error: {
      message: "已达到 5 小时的使用上限。您的限额将在 2026-09-10 19:01:19 重置。",
      details: [
        {
          "@type": "type.googleapis.com/google.rpc.RetryInfo",
          retryDelay: "38s",
        },
      ],
    },
  };

  assert.equal(looksLikeQuotaExhausted(body), true);
  assert.equal(classify429({ status: 429, body }), "rate_limit");
});

test("non-CJK bodies are unaffected by the added patterns", () => {
  assert.equal(classify429({ status: 429, body: "Too many requests" }), "rate_limit");
  assert.equal(
    classify429({ status: 429, body: "Rate limit exceeded, retry in 30s" }),
    "rate_limit"
  );
});
