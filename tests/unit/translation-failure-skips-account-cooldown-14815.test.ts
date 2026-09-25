import assert from "node:assert/strict";
import test from "node:test";

/**
 * #14815: a request-translation failure must not cool down the account.
 *
 * Translation runs locally, before any upstream call, on the client's own body. When it
 * throws (the report: "Maximum call stack size exceeded" on one large image), chatCore
 * returned a bare 500. chat.ts then treated that 500 like an upstream failure and ran
 * markAccountUnavailable, so a single-account install went into cooldown and every later
 * request — including ones that would translate fine — got "all accounts rate limited".
 * The same body fails identically on every account, so rotating is pointless too.
 */

const { createTranslationFailureResult, TRANSLATION_FAILURE_CODE } =
  await import("../../open-sse/handlers/chatCore/translationFailure.ts");
const { shouldSkipConnDisable } = await import("../../open-sse/services/combo/comboPredicates.ts");

test("a translation failure is labelled as a local request failure", async () => {
  const result = createTranslationFailureResult(500, "Maximum call stack size exceeded", null);
  assert.equal(result.status, 500);
  assert.equal(result.errorCode, TRANSLATION_FAILURE_CODE);
  // The label is internal: the client body keeps its existing shape.
  const body = await result.response.json();
  assert.equal(body.error.message, "Maximum call stack size exceeded");
  assert.notEqual(body.error.code, TRANSLATION_FAILURE_CODE);
});

test("a classified translation failure keeps its type and still carries the label", async () => {
  const result = createTranslationFailureResult(400, "bad tool schema", "invalid_request_error");
  assert.equal(result.errorCode, TRANSLATION_FAILURE_CODE);
  assert.equal(result.errorType, "invalid_request_error");
  const body = await result.response.json();
  assert.equal(body.error.code, "invalid_request_error");
});

test("the account-cooldown gate skips a translation failure", () => {
  const result = createTranslationFailureResult(500, "Maximum call stack size exceeded", null);
  assert.equal(shouldSkipConnDisable(result, false, false, "claude"), true);
});

test("an ordinary upstream 500 still cools the account down", () => {
  assert.equal(shouldSkipConnDisable({ status: 500 }, false, false, "claude"), false);
});

test("a translation failure does not trip the provider-wide breaker", async () => {
  const { shouldTripProviderBreakerForResult } =
    await import("../../src/sse/handlers/chatPredicates.ts");
  const result = createTranslationFailureResult(500, "Maximum call stack size exceeded", null);
  assert.equal(shouldTripProviderBreakerForResult(result, false, false), false);
  // An upstream 500 still counts.
  assert.equal(shouldTripProviderBreakerForResult({ status: 500 }, false, false), true);
});
