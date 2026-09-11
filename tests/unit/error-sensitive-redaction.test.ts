import test from "node:test";
import assert from "node:assert/strict";
import {
  sanitizeErrorMessage,
  sanitizeUpstreamDetails,
} from "../../open-sse/utils/errorSanitization.ts";

test("sanitizeErrorMessage removes bearer credentials and image data URLs", () => {
  const raw =
    "upstream echoed Authorization: Bearer eyJ.secret.token and data:image/png;charset=utf-8;base64,iVBORw0KGgoAAAANSUhEUgAAAAE=";
  const safe = sanitizeErrorMessage(raw);

  assert.doesNotMatch(safe, /eyJ\.secret\.token/);
  assert.doesNotMatch(safe, /iVBORw0KGgo/);
  assert.match(safe, /\[REDACTED\]/);
  // Authorization labels are fail-closed: once a credential label is seen,
  // the sanitizer may discard the remaining untrusted tail instead of
  // preserving a marker for each later secret.
  assert.equal(safe, "upstream echoed Authorization: [REDACTED]");
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

test("sanitizeErrorMessage redacts URL credentials while preserving safe URLs", () => {
  const safeUrl = "https://example.com/docs/error?lang=en#recovery";
  const projected = sanitizeErrorMessage(
    "proxy failed https://svc-user:p4ss-opaque-9382@internal.example/v1 " +
      "then https://storage.example/blob?X-Amz-Credential=AKIAOPAQUE%2Fscope&" +
      "X-Amz-Signature=signature-secret&X-Amz-Expires=60 " +
      "and https://account.blob.core.windows.net/c?sv=2025-01-05&sig=sas-secret&se=soon " +
      "then https://vertex.example/predict?key=vertex-key-secret&mode=express " +
      "plus https://gateway.example/v1?api_key=query-api-secret&token=query-token-secret " +
      `see ${safeUrl}`
  );

  assert.doesNotMatch(
    projected,
    /svc-user|p4ss-opaque|AKIAOPAQUE|signature-secret|sas-secret|vertex-key-secret|query-api-secret|query-token-secret/i
  );
  assert.match(projected, /\[REDACTED\]/);
  assert.match(projected, /X-Amz-Expires=60/);
  assert.match(projected, /sv=2025-01-05/);
  assert.match(projected, /se=soon/);
  assert.match(projected, new RegExp(safeUrl.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
});

test("sanitizeErrorMessage redacts credentials hidden behind serialized whitespace", () => {
  const inputs = [
    String.raw`api_key\t=opaque-tab-secret-9382746`,
    String.raw`api_key\u0009=opaque-unicode-tab-9382746`,
    String.raw`Bearer\topaque-bearer-secret-9382746`,
    String.raw`api_key\\t=opaque-double-tab-secret-9382746`,
  ];

  for (const input of inputs) {
    const projected = sanitizeErrorMessage(input);
    assert.doesNotMatch(projected, /opaque-(?:tab|unicode-tab|bearer|double-tab)-secret/i);
    assert.match(projected, /\[REDACTED\]/);
  }
});

test("sanitizeErrorMessage redacts CLI credential flag values", () => {
  const inputs = [
    "spawn failed: helper --api-key opaque-cli-key-9382746 --mode check",
    'spawn failed: helper --token "opaque cli token 9382746" --mode check',
    "spawn failed: helper --password 'opaque-cli-password-9382746' --mode check",
  ];

  for (const input of inputs) {
    const projected = sanitizeErrorMessage(input);
    assert.doesNotMatch(projected, /opaque(?: cli|-cli)/i);
    assert.match(projected, /\[REDACTED\]/);
  }
});

test("sanitizeErrorMessage covers the canonical credential pattern catalog", () => {
  const credentials = [
    `AIza${"A".repeat(35)}`,
    `hf_${"A".repeat(34)}`,
    `r8_${"A".repeat(37)}`,
    `gho_${"A".repeat(36)}`,
    `ghu_${"A".repeat(36)}`,
    `ghs_${"A".repeat(36)}`,
    `ghr_${"A".repeat(36)}`,
    `lin_api_${"A".repeat(40)}`,
    `secret_${"A".repeat(43)}`,
    `npm_${"A".repeat(36)}`,
    `PMAK-1234abcd-${"a".repeat(32)}`,
    `rk_live_${"A".repeat(24)}`,
    `sq0atp-${"A".repeat(22)}`,
    `SK${"a".repeat(32)}`,
    `SG.${"A".repeat(22)}.${"B".repeat(43)}`,
    `key-${"a".repeat(32)}`,
    `M${"A".repeat(23)}.${"B".repeat(6)}.${"C".repeat(27)}`,
    "postgresql://db-user:db-password@db.internal.example/app",
  ];

  for (const credential of credentials) {
    const projected = sanitizeErrorMessage(`upstream echoed ${credential}`);
    assert.equal(projected.includes(credential), false, credential.slice(0, 16));
    assert.match(projected, /\[REDACTED(?::[^\]]+)?\]/);
  }
});

test("sanitizeErrorMessage redacts credentials that cross the public length boundary", () => {
  const credential = `hf_${"A".repeat(34)}`;
  const projected = sanitizeErrorMessage(`${"x".repeat(4088)}${credential}`);
  const escapedPrefixProjected = sanitizeErrorMessage(
    `${String.raw`\t`}${"x".repeat(4088)}${credential}`
  );

  for (const output of [projected, escapedPrefixProjected]) {
    assert.equal(output.includes("hf_"), false);
    assert.equal(output.includes(credential), false);
    assert.match(output, /\[REDACTED(?::[^\]]+)?\]$/);
    assert.ok(output.length <= 4096);
  }
});

test("sanitizeErrorMessage redacts closed and unterminated PGP private-key armor", () => {
  const closed = sanitizeErrorMessage(
    "provider returned -----BEGIN PGP PRIVATE KEY BLOCK-----\n" +
      "Version: test\n\npgp-private-material\n" +
      "-----END PGP PRIVATE KEY BLOCK----- after"
  );
  const unterminated = sanitizeErrorMessage(
    "provider returned -----BEGIN PGP PRIVATE KEY BLOCK-----\npgp-unterminated-material"
  );

  // Public exception messages fail closed at the first physical line; the
  // post-block suffix is intentionally not recovered from a multiline secret.
  assert.equal(closed, "provider returned [REDACTED]");
  assert.equal(unterminated, "provider returned [REDACTED]");
  assert.doesNotMatch(
    `${closed} ${unterminated}`,
    /pgp-private-material|pgp-unterminated-material/
  );
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
