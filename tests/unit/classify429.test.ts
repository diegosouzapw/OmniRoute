import { test } from "node:test";
import assert from "node:assert/strict";
import {
  classify429,
  looksLikeQuotaExhausted,
  parseRetryAfter,
  retryAfterFromResponse,
  type FailureKind,
} from "../../src/shared/utils/classify429.ts";

test("classify429: non-429 status returns 'transient'", () => {
  const out: FailureKind = classify429({ status: 500 });
  assert.equal(out, "transient");
});

test("classify429: 429 with no body or hints returns 'rate_limit'", () => {
  assert.equal(classify429({ status: 429 }), "rate_limit");
  assert.equal(classify429({ status: 429, body: "" }), "rate_limit");
  assert.equal(classify429({ status: 429, body: undefined }), "rate_limit");
});

test("classify429: 429 with quota keyword in string body returns 'quota_exhausted'", () => {
  assert.equal(
    classify429({ status: 429, body: "You exceeded your daily limit." }),
    "quota_exhausted"
  );
  assert.equal(
    classify429({ status: 429, body: "Monthly quota reached. Resets on the 1st." }),
    "quota_exhausted"
  );
  assert.equal(
    classify429({ status: 429, body: "Out of credits — top up your account." }),
    "quota_exhausted"
  );
  assert.equal(classify429({ status: 429, body: "plan limit reached" }), "quota_exhausted");
});

test("classify429: Antigravity 'Individual quota reached' body returns 'quota_exhausted'", () => {
  const body =
    "Individual quota reached. Contact your administrator to enable overages. " +
    "Resets in 164h27m24s.";
  assert.equal(looksLikeQuotaExhausted(body), true);
  assert.equal(classify429({ status: 429, body }), "quota_exhausted");
  assert.equal(classify429({ status: 429, body: { error: { message: body } } }), "quota_exhausted");
});

test("classify429: Google RESOURCE_EXHAUSTED with a billing-period reset is quota exhausted", () => {
  const body = "Resource has been exhausted (e.g. check quota). (reset after 24h)";
  assert.equal(looksLikeQuotaExhausted(body), true);
  assert.equal(classify429({ status: 429, body }), "quota_exhausted");
  assert.equal(classify429({ status: 429, body: { error: { message: body } } }), "quota_exhausted");
});

test("classify429: Google RESOURCE_EXHAUSTED without a reset remains a rate limit", () => {
  const body = "Resource has been exhausted (e.g. check quota).";
  assert.equal(looksLikeQuotaExhausted(body), false);
  assert.equal(classify429({ status: 429, body }), "rate_limit");
});

test("classify429: Antigravity INSUFFICIENT_G1_CREDITS_BALANCE body returns 'quota_exhausted'", () => {
  const body = {
    error: {
      code: 429,
      message: "Resource has been exhausted (e.g. check quota).",
      status: "RESOURCE_EXHAUSTED",
      details: [
        {
          "@type": "type.googleapis.com/google.rpc.ErrorInfo",
          reason: "INSUFFICIENT_G1_CREDITS_BALANCE",
        },
      ],
    },
  };
  assert.equal(looksLikeQuotaExhausted(body), true);
  assert.equal(classify429({ status: 429, body }), "quota_exhausted");
});

test("classify429: Antigravity quota patterns do not over-match plain rate limits", () => {
  // The new 'quota reached' / 'enable overages' patterns must stay specific —
  // a per-minute rate limit must still classify as a transient rate_limit.
  assert.equal(
    classify429({ status: 429, body: "Too many requests, please slow down." }),
    "rate_limit"
  );
  assert.equal(
    classify429({ status: 429, body: "Rate limit exceeded. Try again in 30s." }),
    "rate_limit"
  );
  // A bare "quota reached" in a transient per-minute limit must NOT be locked as
  // quota_exhausted — only the specific "individual quota reached" wording is.
  assert.equal(
    classify429({ status: 429, body: "Request quota reached, retry in 60s." }),
    "rate_limit"
  );
});

test("classify429: 429 with quota keyword in nested object body returns 'quota_exhausted'", () => {
  assert.equal(
    classify429({
      status: 429,
      body: { error: { message: "You have exceeded your monthly quota." } },
    }),
    "quota_exhausted"
  );
  assert.equal(
    classify429({
      status: 429,
      body: { error: { type: "insufficient_quota", message: "..." } },
    }),
    "quota_exhausted"
  );
});

test("classify429: 429 without quota keyword returns 'rate_limit'", () => {
  // Plain rate-limit message — keyword 'rate' alone is NOT in QUOTA_PATTERNS
  // so classifier should default to "rate_limit" for any 429.
  assert.equal(
    classify429({ status: 429, body: "Too many requests. Try again in 60s." }),
    "rate_limit"
  );
  assert.equal(
    classify429({
      status: 429,
      body: "Rate limit reached for requests. Please retry.",
    }),
    "rate_limit"
  );
  assert.equal(
    classify429({
      status: 429,
      body: "I am experiencing high traffic, please try again shortly.",
    }),
    "rate_limit"
  );
});

test("looksLikeQuotaExhausted: detects all known keyword variants", () => {
  for (const body of [
    "daily limit exceeded",
    "daily quota reached",
    "per-day limit reached",
    "monthly limit",
    "monthly quota",
    "per-month limit",
    "quota exceeded",
    "exceeded quota",
    "insufficient_quota",
    "billing cap reached",
    "credit exhausted",
    "out of credits",
    "hard limit",
    "hard-limit",
    "plan limit",
  ]) {
    assert.equal(looksLikeQuotaExhausted(body), true, `failed for: ${body}`);
  }
});

test("looksLikeQuotaExhausted: rejects empty / null / non-quota text", () => {
  assert.equal(looksLikeQuotaExhausted(undefined), false);
  assert.equal(looksLikeQuotaExhausted(null), false);
  assert.equal(looksLikeQuotaExhausted(""), false);
  assert.equal(looksLikeQuotaExhausted("rate limit, please retry in 60s"), false);
  assert.equal(looksLikeQuotaExhausted("server error 500"), false);
});

test("classify429: Modal-hosted endpoint 'usage limit reached' body returns 'quota_exhausted'", () => {
  // Real body observed from a self-hosted Modal OpenAI-compatible endpoint:
  // {"error":"usage limit reached"} - a bare string value, no "message"/
  // "daily"/"quota" wording, so none of the prior patterns matched and the
  // 429 fell through to a 60s rate_limit cooldown. Combo round-robin's
  // per-conversation session stickiness (#3825) then kept re-targeting the
  // same exhausted connection on every turn of a long-running session.
  const body = { error: "usage limit reached" };
  assert.equal(looksLikeQuotaExhausted(body), true);
  assert.equal(classify429({ status: 429, body }), "quota_exhausted");
  assert.equal(classify429({ status: 429, body: JSON.stringify(body) }), "quota_exhausted");
  // Case variation must also match.
  assert.equal(
    classify429({ status: 429, body: { error: "USAGE LIMIT REACHED" } }),
    "quota_exhausted"
  );
  // Whitespace around JSON object must also match (bodyToText does not trim).
  assert.equal(
    classify429({ status: 429, body: ' { "error" : "usage limit reached" } ' }),
    "quota_exhausted"
  );
  // Extra sibling fields must still match.
  assert.equal(
    classify429({
      status: 429,
      body: { error: "usage limit reached", code: "RESOURCE_EXHAUSTED" },
    }),
    "quota_exhausted"
  );
  // Trailing punctuation/whitespace must still match.
  assert.equal(classify429({ status: 429, body: { error: "usage limit reached." } }), "quota_exhausted");
  assert.equal(classify429({ status: 429, body: { error: "usage limit reached " } }), "quota_exhausted");
});

test("classify429: qualified transient 'usage limit reached' messages stay rate_limit", () => {
  // The Modal pattern requires the "error" JSON key with exactly "usage
  // limit reached" as its value - anything else is a transient rate limit
  // and must NOT be locked out long-term.
  assert.equal(
    classify429({ status: 429, body: "Per-minute usage limit reached, retry in 60s." }),
    "rate_limit"
  );
  assert.equal(
    classify429({ status: 429, body: { error: { message: "RPM usage limit reached" } } }),
    "rate_limit"
  );
  // Bare string body (no JSON "error" key) must NOT match.
  assert.equal(classify429({ status: 429, body: "usage limit reached" }), "rate_limit");
  // Different JSON key (not "error") must NOT match.
  assert.equal(classify429({ status: 429, body: { detail: "usage limit reached" } }), "rate_limit");
  // Qualified value under the "error" key must NOT match.
  assert.equal(
    classify429({ status: 429, body: { error: "Per-minute usage limit reached" } }),
    "rate_limit"
  );
});

test("ambiguous 'daily rate limit' messages classify as quota_exhausted (intentional)", () => {
  // Codex audit LOW: messages combining 'daily' or 'monthly' with 'limit'
  // match the quota regex even when paired with 'rate'. This is intentional
  // because daily/monthly caps semantically warrant a long cooldown — even
  // when the upstream calls them "rate limits". Locking it down here so a
  // future regex tweak doesn't silently change the behavior.
  assert.equal(classify429({ status: 429, body: "daily rate limit exceeded" }), "quota_exhausted");
  assert.equal(
    classify429({ status: 429, body: "monthly rate limit exceeded" }),
    "quota_exhausted"
  );
});

test("parseRetryAfter: integer seconds", () => {
  assert.equal(parseRetryAfter("60"), 60);
  assert.equal(parseRetryAfter("3600"), 3600);
  assert.equal(parseRetryAfter("0"), 0);
});

test("parseRetryAfter: Groq-style relative units", () => {
  // Regression for the parseInt-trap: parseInt("5m", 10) returns 5,
  // which would be wrong (5s instead of 300s). The relative-unit
  // pattern must be checked BEFORE plain integer parse.
  assert.equal(parseRetryAfter("60s"), 60);
  assert.equal(parseRetryAfter("5m"), 300);
  assert.equal(parseRetryAfter("2h"), 7200);
  assert.equal(parseRetryAfter("1H"), 3600);
});

test("parseRetryAfter: HTTP-date in the future", () => {
  const future = new Date(Date.now() + 60_000).toUTCString();
  const secs = parseRetryAfter(future);
  assert.ok(secs !== null);
  assert.ok(secs! >= 50 && secs! <= 65, `expected ~60, got ${secs}`);
});

test("parseRetryAfter: HTTP-date in the past clamps to 0", () => {
  const past = new Date(Date.now() - 5 * 60_000).toUTCString();
  assert.equal(parseRetryAfter(past), 0);
});

test("parseRetryAfter: unparseable returns null", () => {
  assert.equal(parseRetryAfter(undefined), null);
  assert.equal(parseRetryAfter(""), null);
  assert.equal(parseRetryAfter("   "), null);
  assert.equal(parseRetryAfter("not-a-date"), null);
  assert.equal(parseRetryAfter("60xyz"), null);
});

test("retryAfterFromResponse: case-insensitive header lookup", () => {
  assert.equal(retryAfterFromResponse({ headers: { "Retry-After": "30" } }), 30);
  assert.equal(retryAfterFromResponse({ headers: { "retry-after": "45" } }), 45);
  assert.equal(retryAfterFromResponse({ headers: { "RETRY-AFTER": "60s" } }), 60);
  assert.equal(retryAfterFromResponse({ headers: {} }), null);
  assert.equal(retryAfterFromResponse({}), null);
});
