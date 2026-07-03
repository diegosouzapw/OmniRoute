import assert from "node:assert/strict";
import { test } from "node:test";

import { redactSecrets } from "../../../../src/lib/issueAgent/redaction.ts";

test("redaction removes bearer tokens, api keys, and passwords", () => {
  const input = [
    "Authorization: Bearer test-bearer-token",
    "api_key=test-api-key-value",
    "x-api-key: header-secret",
    "password=password-value",
    '{"token":"json-secret","password":"json-password"}',
  ].join("\n");

  const redacted = redactSecrets(input);

  assert.match(redacted, /Bearer \[REDACTED\]/);
  assert.match(redacted, /api_key=\[REDACTED\]/);
  assert.match(redacted, /x-api-key:\[REDACTED\]/);
  assert.match(redacted, /password=\[REDACTED\]/);
  assert.match(redacted, /"token":"\[REDACTED\]"/);
  assert.match(redacted, /"password":"\[REDACTED\]"/);
  assert.doesNotMatch(
    redacted,
    /test-bearer-token|test-api-key-value|header-secret|password-value|json-secret|json-password/
  );
});
