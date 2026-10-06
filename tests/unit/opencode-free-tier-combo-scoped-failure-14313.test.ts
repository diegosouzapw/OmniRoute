/**
 * #14313: an OpenCode free-tier refusal is request-scoped for combo routing.
 *
 * The refusal is the same verdict on every account for the same request shape, so
 * neither model lockout nor provider cooldown may fire from it. Combo's scoped-failure
 * gate currently only knows local limiter codes, context overflow, 404 resource-not-found
 * and a few status/type pairs — FreeTierError and the relayed sentence fall through,
 * so `scopedFailure` stays false and both lockout arms (priority + done-retrying) run.
 */
import test from "node:test";
import assert from "node:assert/strict";

const FREE_TIER_BODY = JSON.stringify({
  type: "error",
  error: {
    type: "FreeTierError",
    message:
      "Error from provider (Console): OpenCode's free tier can only be used from within OpenCode",
  },
});
const RELAYED_MESSAGE = "OpenCode's free tier can only be used from within OpenCode";
const PLAIN_AUTH_BODY = JSON.stringify({
  error: { message: "invalid api key", type: "auth_error" },
});

const { isComboRequestScopedFailure, isRequestScopedUpstreamFailure, shouldSkipConnDisable } =
  await import("../../open-sse/services/combo/comboPredicates.ts");

function refusalResponse(status = 403): Response {
  return new Response(FREE_TIER_BODY, {
    status,
    headers: { "content-type": "application/json" },
  });
}

test("a FreeTierError type is request-scoped upstream", () => {
  assert.equal(isRequestScopedUpstreamFailure({ type: "FreeTierError" }), true);
  assert.equal(isRequestScopedUpstreamFailure({ code: "FreeTierError" }), true);
});

test("a free-tier 403 body is a combo request-scoped failure", () => {
  assert.equal(
    isComboRequestScopedFailure(refusalResponse(), FREE_TIER_BODY, { type: "FreeTierError" }),
    true
  );
});

test("a relayed free-tier sentence without error.type is still request-scoped", () => {
  assert.equal(isComboRequestScopedFailure(refusalResponse(), RELAYED_MESSAGE, undefined), true);
});

test("class 451 free-tier refusal is request-scoped like 403", () => {
  assert.equal(isComboRequestScopedFailure(refusalResponse(451), FREE_TIER_BODY, undefined), true);
});

test("shouldSkipConnDisable never cools the connection for a free-tier refusal", () => {
  assert.equal(
    shouldSkipConnDisable(
      { status: 403, response: refusalResponse(), errorCode: null, errorType: "FreeTierError" },
      false,
      false,
      "opencode"
    ),
    true
  );
});

test("an ordinary auth 403 is NOT request-scoped (unchanged)", () => {
  const response = new Response(PLAIN_AUTH_BODY, {
    status: 403,
    headers: { "content-type": "application/json" },
  });
  assert.equal(
    isComboRequestScopedFailure(response, PLAIN_AUTH_BODY, { type: "auth_error" }),
    false
  );
});
