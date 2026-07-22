import test from "node:test";
import assert from "node:assert/strict";
import { sanitizeErrorMessage, sanitizeUpstreamDetails } from "../../open-sse/utils/error.ts";

test("sanitizeErrorMessage redacts bearer credentials and image data URLs", () => {
  const raw =
    "upstream echoed Authorization: Bearer eyJ.secret.token and data:image/png;charset=utf-8;base64,iVBORw0KGgoAAAANSUhEUgAAAAE=";
  const safe = sanitizeErrorMessage(raw);

  assert.doesNotMatch(safe, /eyJ\.secret\.token/);
  assert.doesNotMatch(safe, /iVBORw0KGgo/);
  assert.match(safe, /\[REDACTED\]/);
  assert.match(safe, /\[REDACTED_DATA_URL\]/);
});

test("sanitizeErrorMessage redacts common JSON credential fields", () => {
  const safe = sanitizeErrorMessage(
    '{"api_key":"sk-sensitive","access_token":"oauth-sensitive","cookie":"session=sensitive; secondary=also-sensitive","authorization":"Basic dXNlcjpwYXNz"}'
  );

  assert.doesNotMatch(
    safe,
    /sk-sensitive|oauth-sensitive|session=sensitive|also-sensitive|dXNlcjpwYXNz/
  );
  assert.match(safe, /\[REDACTED\]/);
});

test("sanitizeUpstreamDetails drops credential headers and redacts data URLs", () => {
  const safe = sanitizeUpstreamDetails({
    authorization: "Bearer sensitive",
    cookie: "session=sensitive; refresh=also-sensitive",
    "set-cookie": "session=sensitive",
    error: "failed for data:image/webp;base64,UklGRgAAAAA=",
  }) as Record<string, unknown>;

  assert.equal("authorization" in safe, false);
  assert.equal("cookie" in safe, false);
  assert.equal("set-cookie" in safe, false);
  assert.equal(safe.error, "failed for [REDACTED_DATA_URL]");
});
