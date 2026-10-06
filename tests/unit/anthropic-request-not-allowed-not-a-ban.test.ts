/**
 * Anthropic OAuth 403 "Request not allowed" must never make the connection terminal.
 *
 * Reproduction of the incident behind this test: a single 403 with that body on
 * the only `claude` OAuth connection flipped it to `test_status = banned`
 * (chatCore FORBIDDEN → writeTerminalStatus), after which every request was
 * short-circuited with "All 1 connection(s) banned by upstream — please
 * reconnect in the dashboard" although the same token had returned 200 forty
 * seconds earlier and did so again once re-enabled.
 *
 * Two layers are pinned here:
 * 1. classifyProviderError() yields the non-terminal REQUEST_REJECTED type.
 * 2. resolveTerminalConnectionStatus() maps that type to `null` (no terminal
 *    state), even when the fallback analysis flags the failure `permanent`.
 */
import test from "node:test";
import assert from "node:assert/strict";

const { classifyProviderError, PROVIDER_ERROR_TYPES } =
  await import("../../open-sse/services/errorClassifier.ts");
const { resolveTerminalConnectionStatus } =
  await import("../../src/sse/services/authTerminalStatus.ts");

const ANTHROPIC_BODY = JSON.stringify({
  type: "error",
  error: { type: "permission_error", message: "Request not allowed" },
});

test("claude 403 'Request not allowed' → REQUEST_REJECTED → no terminal connection status", () => {
  const errorType = classifyProviderError(403, ANTHROPIC_BODY, "claude");
  assert.equal(errorType, PROVIDER_ERROR_TYPES.REQUEST_REJECTED);

  assert.equal(
    resolveTerminalConnectionStatus(403, { permanent: false }, errorType, "claude"),
    null,
    "a per-request refusal must not park the connection"
  );
  assert.equal(
    resolveTerminalConnectionStatus(403, { permanent: true }, errorType, "claude"),
    null,
    "non-terminal classification wins over a `permanent` fallback verdict"
  );
});

test("regression guard: a generic claude 403 still resolves to banned", () => {
  const errorType = classifyProviderError(
    403,
    JSON.stringify({ error: { message: "you do not have permission" } }),
    "claude"
  );
  assert.equal(errorType, PROVIDER_ERROR_TYPES.FORBIDDEN);
  assert.equal(
    resolveTerminalConnectionStatus(403, { permanent: false }, errorType, "claude"),
    "banned"
  );
});
