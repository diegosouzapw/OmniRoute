import test from "node:test";
import assert from "node:assert/strict";

const { classifyProviderError, PROVIDER_ERROR_TYPES } =
  await import("../../open-sse/services/errorClassifier.ts");
const { resolveTerminalConnectionStatus } =
  await import("../../src/sse/services/authTerminalStatus.ts");

// Verbatim xAI / grok-cli refusal observed in production when content is declined
// (e.g. cybersecurity inquiry on script analysis):
// HTTP 403 "[403]: I can't help with that request."
const GROK_REFUSAL_WRAPPED = "[403]: I can't help with that request.";
const GROK_REFUSAL_PLAIN = "I can't help with that request.";
const GROK_REFUSAL_JSON = JSON.stringify({
  error: { message: "I can't help with that request.", type: "invalid_request_error" },
});

test("grok-cli 403 'I can't help with that request' => REQUEST_REJECTED => no terminal connection status", () => {
  for (const body of [GROK_REFUSAL_WRAPPED, GROK_REFUSAL_PLAIN, GROK_REFUSAL_JSON]) {
    const errorType = classifyProviderError(403, body, "grok-cli");
    assert.equal(
      errorType,
      PROVIDER_ERROR_TYPES.REQUEST_REJECTED,
      `expected REQUEST_REJECTED for body: ${body}`
    );

    assert.equal(
      resolveTerminalConnectionStatus(403, { permanent: false }, errorType, "grok-cli"),
      null,
      "a per-request refusal on grok-cli must not park the connection"
    );
    assert.equal(
      resolveTerminalConnectionStatus(403, { permanent: true }, errorType, "grok-cli"),
      null,
      "non-terminal classification wins over a permanent fallback verdict"
    );
  }
});

test("regression guard: generic grok-cli 403 still resolves to banned", () => {
  const errorType = classifyProviderError(
    403,
    JSON.stringify({ error: { message: "Account suspended by administrator" } }),
    "grok-cli"
  );
  assert.equal(errorType, PROVIDER_ERROR_TYPES.FORBIDDEN);
  assert.equal(
    resolveTerminalConnectionStatus(403, { permanent: false }, errorType, "grok-cli"),
    "banned"
  );
});
