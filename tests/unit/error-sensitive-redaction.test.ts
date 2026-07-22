import test from "node:test";
import assert from "node:assert/strict";
import { sanitizeErrorMessage, sanitizeUpstreamDetails } from "../../open-sse/utils/error.ts";

test("sanitizeErrorMessage redacts bearer credentials and image data URLs", () => {
  const raw =
    "upstream echoed Authorization: Bearer eyJ.secret.token and data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAE=";
  const safe = sanitizeErrorMessage(raw);

  assert.doesNotMatch(safe, /eyJ\.secret\.token/);
  assert.doesNotMatch(safe, /iVBORw0KGgo/);
  assert.match(safe, /\[REDACTED\]/);
  assert.match(safe, /\[REDACTED_DATA_URL\]/);
});

test("sanitizeErrorMessage redacts common JSON credential fields", () => {
  const safe = sanitizeErrorMessage(
    '{"api_key":"sk-sensitive","access_token":"oauth-sensitive","cookie":"session=sensitive"}'
  );

  assert.doesNotMatch(safe, /sk-sensitive|oauth-sensitive|session=sensitive/);
  assert.match(safe, /\[REDACTED\]/);
});

test("sanitizeUpstreamDetails redacts credentials and data URLs in allowed fields", () => {
  const safe = sanitizeUpstreamDetails({
    authorization: "Bearer sensitive",
    error: "failed for data:image/webp;base64,UklGRgAAAAA=",
  }) as Record<string, unknown>;

  assert.doesNotMatch(String(safe.authorization), /sensitive/);
  assert.equal(safe.error, "failed for [REDACTED_DATA_URL]");
});
