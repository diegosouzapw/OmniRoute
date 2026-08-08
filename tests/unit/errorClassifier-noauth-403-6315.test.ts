import test from "node:test";
import assert from "node:assert/strict";
import {
  classifyProviderError,
  PROVIDER_ERROR_TYPES,
} from "../../open-sse/services/errorClassifier.ts";

// #6315 / #6345 — a single generic upstream 403 on a no-credential ("authType:
// none") provider like mimocode or theoldllm was permanently banning the whole
// connection (classified as FORBIDDEN, a terminal type). These providers are
// free/stateless — there is no real account/credential to revoke, so a bare
// 403 should be RECOVERABLE (null) and handled by the existing connection
// cooldown/retry layer, same as apikey providers already are.

test("#6315: mimocode 'high-frequency non-compliant' 403 -> recoverable (null), not FORBIDDEN", () => {
  const body = { error: "Detected high-frequency non-compliant requests, please slow down." };
  assert.equal(classifyProviderError(403, body, "mimocode"), null);
});

test("#6345: theoldllm 'Request blocked'/access_denied 403 -> recoverable (null), not FORBIDDEN", () => {
  const body = { error: "Request blocked", type: "access_denied" };
  assert.equal(classifyProviderError(403, body, "theoldllm"), null);
});

test("control: apikey-provider bare 403 still recoverable (null) — no regression", () => {
  assert.equal(classifyProviderError(403, "forbidden", "openai"), null);
});

test("#8813: chatgpt-web SENTINEL_BLOCKED 403 with 'Sentinel/Turnstile required' → FORBIDDEN (terminal)", () => {
  // The executor returns error code "SENTINEL_BLOCKED" in the JSON body.
  // This is a TERMINAL state — retrying the same blocked session will keep 403ing.
  // Must be classified as FORBIDDEN so the circuit breaker marks the connection
  // as banned and combo routing falls back to other providers.
  const body = JSON.stringify({
    error: {
      message:
        "ChatGPT blocked the request (Sentinel/Turnstile required). Try again later or open chatgpt.com in a browser to refresh state.",
      type: "upstream_error",
      code: "SENTINEL_BLOCKED",
    },
  });
  assert.equal(
    classifyProviderError(403, body, "chatgpt-web"),
    PROVIDER_ERROR_TYPES.FORBIDDEN
  );
});

test("#8813: chatgpt-web SENTINEL_BLOCKED 403 with raw 'Sentinel blocked' text → FORBIDDEN (terminal)", () => {
  // Edge case: when the raw text includes "Sentinel" and 403, classify as terminal.
  assert.equal(
    classifyProviderError(403, "Sentinel blocked the request", "chatgpt-web"),
    PROVIDER_ERROR_TYPES.FORBIDDEN
  );
});

test("control: recognized ban phrase on a no-credential provider still terminal (ACCOUNT_DEACTIVATED)", () => {
  const body = "This service has been disabled in this account for violation of policy.";
  assert.equal(classifyProviderError(403, body, "mimocode"), PROVIDER_ERROR_TYPES.ACCOUNT_DEACTIVATED);
});
