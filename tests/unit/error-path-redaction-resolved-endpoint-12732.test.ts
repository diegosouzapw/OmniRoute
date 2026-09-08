import test from "node:test";
import assert from "node:assert/strict";

import { redactErrorPaths } from "../../open-sse/utils/errorPathRedaction.ts";
import { sanitizeErrorMessage } from "../../open-sse/utils/errorSanitization.ts";

const SECRET = "sk-live-resolved-endpoint-secret-123456";

test("a resolved source extension ends the span even when prose follows (#12732)", () => {
  // Given
  const message =
    "Upstream failed at /srv/omniroute/private/provider.ts:42:9 rate limit exceeded, 30s remaining";

  // When
  const redacted = redactErrorPaths(message);

  // Then
  assert.equal(redacted, "Upstream failed at <path> rate limit exceeded, 30s remaining");
});

test("credential labels after a redacted path still reach the credential redactor (#12732)", () => {
  // Given
  const message =
    `Upstream failed at /srv/omniroute/private/provider.ts:42:9 Authorization: Bearer ${SECRET}` +
    "\n    at dispatch (/srv/omniroute/private/dispatcher.ts:88:3)";

  // When
  const sanitized = sanitizeErrorMessage(message);

  // Then
  assert.equal(sanitized, "Upstream failed at <path> Authorization: [REDACTED]");
  assert.doesNotMatch(sanitized, new RegExp(SECRET));
  assert.doesNotMatch(sanitized, /\/srv\/omniroute\/private|dispatcher\.ts/);
});

test("a Windows path with a resolved extension keeps its prose tail (#12732)", () => {
  assert.equal(
    redactErrorPaths("Upstream failed at C:\\srv\\app\\provider.ts:1:1 model not found"),
    "Upstream failed at <path> model not found"
  );
});

test("an extensionless filesystem prefix still fails closed over the rest of the line", () => {
  assert.equal(
    redactErrorPaths(`Upstream failed at /srv/omniroute/private Authorization: Bearer ${SECRET}`),
    "Upstream failed at <path>"
  );
});

test("a later separator-bearing token still extends the span past the extension", () => {
  assert.equal(
    redactErrorPaths("Upstream failed at /srv/app/x.ts wrote to backup/secret"),
    "Upstream failed at <path>"
  );
});
