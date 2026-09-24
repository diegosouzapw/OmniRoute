import assert from "node:assert/strict";
import test from "node:test";

const { sanitizeErrorMessage } = await import("../../open-sse/utils/error.ts");

test("sanitizeErrorMessage must not expose an unknown-root filesystem path followed by prose", () => {
  const message = sanitizeErrorMessage("Provider failed at /custom/internal secret directory");

  assert.doesNotMatch(
    message,
    /\/custom\/internal|secret directory/,
    `expected the unknown-root path to be redacted, got: ${message}`
  );
});

test("sanitizeErrorMessage does not regress #13144 (trailing prose after a route survives)", () => {
  const message = sanitizeErrorMessage(
    "on /v1/chat/completions. Use POST /v1/images/generations instead."
  );

  assert.match(message, /Use POST \/v1\/images\/generations instead\.$/);
});
