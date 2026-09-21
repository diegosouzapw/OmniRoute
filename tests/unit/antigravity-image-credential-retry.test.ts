import test from "node:test";
import assert from "node:assert/strict";

import { isAntigravityImageQuotaExhausted } from "../../src/sse/services/imageCredentialRetry.ts";

test("Antigravity image quota-exhausted 429 is the only 429 eligible for account rotation", () => {
  assert.equal(
    isAntigravityImageQuotaExhausted("antigravity", {
      success: false,
      status: 429,
      error: { error: { message: "Individual quota reached" } },
    }),
    true
  );
});

test("ordinary Hermes-shaped 429 does not create a rotation/cooldown signal", () => {
  assert.equal(
    isAntigravityImageQuotaExhausted("antigravity", {
      success: false,
      status: 429,
      error: { error: { message: "RESOURCE_EXHAUSTED: malformed system payload" } },
    }),
    false
  );
});

test("ordinary image rate-limit 429 does not create a rotation/cooldown signal", () => {
  assert.equal(
    isAntigravityImageQuotaExhausted("antigravity", {
      success: false,
      status: 429,
      error: { error: { message: "too many requests; retry later" } },
    }),
    false
  );
});

test("non-Antigravity 429 is not eligible for Antigravity account rotation", () => {
  assert.equal(
    isAntigravityImageQuotaExhausted("openai", {
      success: false,
      status: 429,
      error: { error: { message: "Individual quota reached" } },
    }),
    false
  );
});
