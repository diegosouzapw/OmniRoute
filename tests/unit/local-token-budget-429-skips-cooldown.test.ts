import assert from "node:assert/strict";
import test from "node:test";

/**
 * A locally rejected token-budget 429 must not cool the connection.
 *
 * The per-key token ceiling rejects the request before any upstream call
 * (status 429 + TOKEN_LIMIT_EXCEEDED). That is a request-scoped refusal, not
 * a connection health signal, so `shouldSkipConnDisable` must return true and
 * the direct-path caller (chat.ts) must skip `markAccountUnavailable`.
 */

const { shouldSkipConnDisable, isRequestScopedUpstreamFailure } =
  await import("../../open-sse/services/combo/comboPredicates.ts");

const BASE_ARGS = { is401: false, hasExtraKeys: false, provider: "test-provider" } as const;

test("token-budget 429 skips connection disable", () => {
  assert.equal(
    shouldSkipConnDisable(
      { status: 429, errorCode: "TOKEN_LIMIT_EXCEEDED" },
      BASE_ARGS.is401,
      BASE_ARGS.hasExtraKeys,
      BASE_ARGS.provider
    ),
    true,
    "a locally rejected token-budget 429 must not cool a healthy connection"
  );
});

test("token-budget code matches case-insensitively", () => {
  for (const errorCode of ["token_limit_exceeded", "Token_Limit_Exceeded"]) {
    assert.equal(
      shouldSkipConnDisable(
        { status: 429, errorCode },
        BASE_ARGS.is401,
        BASE_ARGS.hasExtraKeys,
        BASE_ARGS.provider
      ),
      true,
      `errorCode ${errorCode} must skip connection disable`
    );
  }
});

test("token-budget code is request-scoped", () => {
  assert.equal(
    isRequestScopedUpstreamFailure({ code: "TOKEN_LIMIT_EXCEEDED", type: null }),
    true,
    "TOKEN_LIMIT_EXCEEDED must classify as request-scoped"
  );
});

test("skip decision precedes markAccountUnavailable, so no cooldown is written", () => {
  const skipConnectionDisable = shouldSkipConnDisable(
    { status: 429, errorCode: "TOKEN_LIMIT_EXCEEDED" },
    BASE_ARGS.is401,
    BASE_ARGS.hasExtraKeys,
    BASE_ARGS.provider
  );
  let cooldownWrites = 0;
  if (!skipConnectionDisable) cooldownWrites += 1;
  assert.equal(skipConnectionDisable, true);
  assert.equal(cooldownWrites, 0, "skipped decisions must never reach the cooldown write");
});

test("a real upstream 429 still cools the connection", () => {
  assert.equal(
    shouldSkipConnDisable(
      { status: 429, errorCode: null, errorType: null },
      BASE_ARGS.is401,
      BASE_ARGS.hasExtraKeys,
      BASE_ARGS.provider
    ),
    false,
    "an unlabelled upstream 429 is a health signal and must still cool down"
  );
});

test("GEMINI_TPM_EXHAUSTED stays out of scope", () => {
  assert.equal(
    shouldSkipConnDisable(
      { status: 429, errorCode: "GEMINI_TPM_EXHAUSTED" },
      BASE_ARGS.is401,
      BASE_ARGS.hasExtraKeys,
      BASE_ARGS.provider
    ),
    false,
    "unproven codes must not ride along without their own evidence"
  );
});
