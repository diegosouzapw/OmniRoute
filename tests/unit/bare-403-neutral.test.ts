import test from "node:test";
import assert from "node:assert/strict";

const { checkFallbackError } = await import(
  "../../open-sse/services/accountFallback.ts"
);

test("checkFallbackError: bare 403 on a non-apikey provider resolves unknown (status_403 neutral)", () => {
  const result = checkFallbackError(
    403,
    "not allowed for this key",
    0,
    null,
    "claude",
    null,
    null,
    null
  );
  assert.equal(result.reason, "unknown");
  assert.equal(result.cooldownMs, 0);
});

test("checkFallbackError: bare 403 on an apikey provider keeps the short auth cooldown", () => {
  const result = checkFallbackError(
    403,
    "not allowed for this key",
    0,
    null,
    "openai",
    null,
    null,
    null
  );
  assert.equal(result.reason, "auth_error");
});

test("checkFallbackError: 403 carrying a quota signal still resolves quota_exhausted", () => {
  const result = checkFallbackError(
    403,
    "hour quota exceeded for today",
    0,
    null,
    "openai",
    null,
    null,
    null
  );
  assert.equal(result.reason, "quota_exhausted");
});
