/**
 * A model-specific failure must never invalidate a valid provider credential.
 *
 * Reproduction of the incident behind this test (measured 2026-09-21 against a
 * live OpenCode Go connection): a probe for a model the account is not entitled
 * to answered
 *
 *   401 "Model grok-4.6 is not supported for format oa-compat"
 *
 * classifyProviderError() correctly returned MODEL_NOT_FOUND — the connection row
 * even stored `lastErrorType: "model_not_found"` — but resolveTerminalConnectionStatus()
 * still saw the raw 401 and parked the whole connection as `expired`. Every OTHER
 * model on that same valid credential then became unreachable and traffic fell
 * through to an exhausted anonymous lane, surfacing an unrelated 402. Recovery
 * required a manual connection re-test.
 *
 * Two layers are pinned here:
 * 1. classifyProviderError() yields the non-terminal MODEL_NOT_FOUND type for a
 *    401 carrying model-unavailable phrasing (#7268 already handles this).
 * 2. resolveTerminalConnectionStatus() maps that type to `null`, so the semantic
 *    class wins over the raw status.
 *
 * The regression guards below keep genuine auth failures terminal.
 */
import test from "node:test";
import assert from "node:assert/strict";

const { classifyProviderError, PROVIDER_ERROR_TYPES } =
  await import("../../open-sse/services/errorClassifier.ts");
const { resolveTerminalConnectionStatus } =
  await import("../../src/sse/services/authTerminalStatus.ts");

const MODEL_UNSUPPORTED_BODY = JSON.stringify({
  type: "error",
  error: { message: "Model grok-4.6 is not supported for format oa-compat" },
});

test("401 with model-unavailable phrasing → MODEL_NOT_FOUND → no terminal connection status", () => {
  const errorType = classifyProviderError(401, MODEL_UNSUPPORTED_BODY, "opencode-go");
  assert.equal(errorType, PROVIDER_ERROR_TYPES.MODEL_NOT_FOUND);

  assert.equal(
    resolveTerminalConnectionStatus(401, { permanent: false }, errorType, "opencode-go"),
    null,
    "one unsupported model must not park a credential that serves other models"
  );
  assert.equal(
    resolveTerminalConnectionStatus(401, { permanent: true }, errorType, "opencode-go"),
    null,
    "non-terminal classification wins over a `permanent` fallback verdict"
  );
});

test("404 + MODEL_NOT_FOUND stays non-terminal too", () => {
  const errorType = classifyProviderError(404, JSON.stringify({ error: { message: "model not found" } }), "opencode-go");
  assert.equal(errorType, PROVIDER_ERROR_TYPES.MODEL_NOT_FOUND);
  assert.equal(
    resolveTerminalConnectionStatus(404, { permanent: false }, errorType, "opencode-go"),
    null
  );
});

test("regression guard: a genuine 401 still parks the connection as expired", () => {
  const errorType = classifyProviderError(
    401,
    JSON.stringify({ error: { message: "invalid api key" } }),
    "opencode-go"
  );
  assert.equal(errorType, PROVIDER_ERROR_TYPES.UNAUTHORIZED);
  assert.equal(
    resolveTerminalConnectionStatus(401, { permanent: false }, errorType, "opencode-go"),
    "expired",
    "real credential failures must still terminalize"
  );
});

test("regression guard: an unclassified 401 keeps the conservative auth behaviour", () => {
  assert.equal(
    resolveTerminalConnectionStatus(401, { permanent: false }, null, "opencode-go"),
    "expired",
    "absent a semantic class, the raw status remains the evidence of last resort"
  );
});

test("regression guard: FORBIDDEN still bans, and `permanent` still bans", () => {
  // Asserted on the terminal-status layer directly: whether a given 403 BODY is
  // classified FORBIDDEN is provider-specific and belongs to the classifier's own
  // tests. What must hold here is that this layer keeps banning when it is told to.
  assert.equal(
    resolveTerminalConnectionStatus(403, { permanent: false }, PROVIDER_ERROR_TYPES.FORBIDDEN, "opencode-go"),
    "banned"
  );
  assert.equal(
    resolveTerminalConnectionStatus(500, { permanent: true }, null, "opencode-go"),
    "banned",
    "a permanent fallback verdict still bans when no non-terminal class applies"
  );
});

test("402 on a passthrough gateway is per-model, not a dead credential", () => {
  // isPerModelQuotaProvider=true is what hasPerModelQuota() now returns for the
  // OpenCode gateways, since one credential fronts many upstream models (#12242).
  assert.equal(
    resolveTerminalConnectionStatus(402, {}, PROVIDER_ERROR_TYPES.QUOTA_EXHAUSTED, "opencode-go", true),
    null,
    "a model outside the plan must not park the whole connection"
  );
  assert.equal(
    resolveTerminalConnectionStatus(402, {}, PROVIDER_ERROR_TYPES.QUOTA_EXHAUSTED, "some-single-model-provider", false),
    "credits_exhausted",
    "a real account-wide credit exhaustion is still terminal"
  );
});