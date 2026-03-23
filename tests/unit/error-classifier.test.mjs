import test from "node:test";
import assert from "node:assert/strict";

const { classifyProviderError, PROVIDER_ERROR_TYPES } =
  await import("../../open-sse/services/errorClassifier.ts");

test("classifyProviderError: 401 + account_deactivated => ACCOUNT_DEACTIVATED", () => {
  const body = JSON.stringify({
    error: { message: "account_deactivated: this account has been disabled" },
  });
  const result = classifyProviderError(401, body);
  assert.equal(result, PROVIDER_ERROR_TYPES.ACCOUNT_DEACTIVATED);
});

test("classifyProviderError: plain 401 => UNAUTHORIZED", () => {
  const result = classifyProviderError(401, { error: { message: "token expired" } });
  assert.equal(result, PROVIDER_ERROR_TYPES.UNAUTHORIZED);
});

test("classifyProviderError: 402 => QUOTA_EXHAUSTED", () => {
  const result = classifyProviderError(402, { error: { message: "payment required" } });
  assert.equal(result, PROVIDER_ERROR_TYPES.QUOTA_EXHAUSTED);
});

test("classifyProviderError: 400 + billing signal => QUOTA_EXHAUSTED", () => {
  const result = classifyProviderError(400, {
    error: { message: "insufficient_quota: exceeded your current quota" },
  });
  assert.equal(result, PROVIDER_ERROR_TYPES.QUOTA_EXHAUSTED);
});

test("classifyProviderError: 429 without billing signal => RATE_LIMITED", () => {
  const result = classifyProviderError(429, { error: { message: "too many requests" } });
  assert.equal(result, PROVIDER_ERROR_TYPES.RATE_LIMITED);
});
