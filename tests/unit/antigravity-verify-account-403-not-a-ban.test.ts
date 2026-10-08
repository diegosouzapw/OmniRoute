import test from "node:test";
import assert from "node:assert/strict";
import {
  classifyProviderError,
  isAccountVerificationRequired,
  PROVIDER_ERROR_TYPES,
} from "../../open-sse/services/errorClassifier.ts";
import {
  checkFallbackError,
  isAccountDeactivated,
} from "../../open-sse/services/accountFallback.ts";
import { resolveTerminalConnectionStatus } from "../../src/sse/services/authTerminalStatus.ts";

// Google Cloud Code / Antigravity answer `403 VALIDATION_REQUIRED` with
// "Verify your account to continue". That phrase was listed in
// ACCOUNT_DEACTIVATED_SIGNALS, so a SINGLE occurrence permanently banned the
// connection (`permanent: true`, 1-year cooldown, never auto-recovers).
//
// It is a TRANSIENT, operator-actionable prompt, not a ban. Measured on a live
// deployment (2026-09-25, `proxy_logs`): one Antigravity connection returned 33
// of these 403s inside 10 minutes and stayed `active`, while a sibling carrying
// 100 % of its quota on all 17 windows was banned by exactly ONE. The difference
// was only which attempt happened to be served — the phrase carries no
// information about account health.
//
// Keeping it in the terminal list also made the recoverable cloud-code 403
// branch in classifyProviderError unreachable for this wording, because
// `accountDeactivated` is evaluated first.

const LIVE_WIRE_TEXT = "[403]: Antigravity upstream error (403): Verify your account to continue.";

test("403 'Verify your account to continue' (antigravity) -> recoverable, NOT ACCOUNT_DEACTIVATED", () => {
  assert.equal(
    classifyProviderError(403, LIVE_WIRE_TEXT, "antigravity"),
    PROVIDER_ERROR_TYPES.PROJECT_ROUTE_ERROR
  );
});

test("403 verification prompt on a NON-cloud-code provider -> recoverable, not FORBIDDEN", () => {
  // Guards the generic 403 fall-through: dropping the phrase from the ban list
  // must not let any provider be banned permanently by it instead.
  assert.equal(
    classifyProviderError(403, "Verify your account to continue", "some-other-provider"),
    PROVIDER_ERROR_TYPES.PROJECT_ROUTE_ERROR
  );
});

test("403 verification prompt is matched mid-body and case-insensitively", () => {
  const body = {
    error: { code: 403, message: "VALIDATION_REQUIRED: VERIFY YOUR ACCOUNT TO CONTINUE" },
  };
  assert.equal(
    classifyProviderError(403, body, "antigravity"),
    PROVIDER_ERROR_TYPES.PROJECT_ROUTE_ERROR
  );
});

test("the phrase is no longer a deactivation signal at the predicate level", () => {
  assert.equal(isAccountDeactivated(LIVE_WIRE_TEXT), false);
  assert.equal(isAccountVerificationRequired(LIVE_WIRE_TEXT), true);
});

test("REGRESSION: a real Antigravity ban phrase still bans", () => {
  assert.equal(
    classifyProviderError(
      403,
      "This service has been disabled in this account for violation of policy.",
      "antigravity"
    ),
    PROVIDER_ERROR_TYPES.ACCOUNT_DEACTIVATED
  );
  assert.equal(
    classifyProviderError(403, "account_deactivated", "antigravity"),
    PROVIDER_ERROR_TYPES.ACCOUNT_DEACTIVATED
  );
});

test("REGRESSION: a real ban phrase wins over a co-occurring verification prompt", () => {
  const body =
    "Verify your account to continue. This service has been disabled in this account for violation.";
  assert.equal(
    classifyProviderError(403, body, "antigravity"),
    PROVIDER_ERROR_TYPES.ACCOUNT_DEACTIVATED
  );
});

test("checkFallbackError no longer returns a permanent 1-year lockout for the prompt", () => {
  const result = checkFallbackError(403, LIVE_WIRE_TEXT, 0, null, "antigravity");
  assert.notEqual(result.permanent, true);
  assert.ok(
    result.cooldownMs < 365 * 24 * 60 * 60 * 1000,
    `expected a transient cooldown, got ${result.cooldownMs}ms`
  );
});

test("checkFallbackError still returns a permanent lockout for a real ban", () => {
  const result = checkFallbackError(
    403,
    "This service has been disabled in this account for violation of policy.",
    0,
    null,
    "antigravity"
  );
  assert.equal(result.permanent, true);
});

test("END-TO-END: the live refusal chain no longer parks the connection as banned", () => {
  // Reproduces exactly what the live gateway did: classify the 403 body, run the
  // fallback policy, then resolve the terminal status the way auth.ts does.
  const errorType = classifyProviderError(403, LIVE_WIRE_TEXT, "antigravity");
  const fallback = checkFallbackError(403, LIVE_WIRE_TEXT, 0, null, "antigravity");
  const terminal = resolveTerminalConnectionStatus(
    403,
    { permanent: fallback.permanent },
    errorType,
    "antigravity",
    false,
    LIVE_WIRE_TEXT,
    "verify-account-test-connection"
  );
  assert.equal(terminal, null, `expected no terminal status, got ${terminal}`);
});

test("END-TO-END: a real ban still parks the connection as banned", () => {
  const banText = "This service has been disabled in this account for violation of policy.";
  const errorType = classifyProviderError(403, banText, "antigravity");
  const fallback = checkFallbackError(403, banText, 0, null, "antigravity");
  const terminal = resolveTerminalConnectionStatus(
    403,
    { permanent: fallback.permanent },
    errorType,
    "antigravity",
    false,
    banText,
    "real-ban-test-connection"
  );
  assert.equal(terminal, "banned");
});
