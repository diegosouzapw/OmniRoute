// Unit tests for the Codex session-JSON normalizer (#6636).
//
// Reproduces the bug: pasting the full JSON object copied from
// `https://chatgpt.com/api/auth/session` (`{user, accessToken, expires}`)
// into the Codex OAuth modal used to fall through to the OAuth-code parser
// and error out — only a bare JWT (`/^eyJ/`) was recognized. These tests
// exercise the pure normalizer in isolation (no DB, no fetch).

import test from "node:test";
import assert from "node:assert/strict";
import {
  looksLikeCodexSessionJson,
  parseCodexSessionJson,
} from "../../src/lib/oauth/utils/codexSessionImport.ts";

function b64url(obj: unknown): string {
  return Buffer.from(JSON.stringify(obj))
    .toString("base64")
    .replace(/=+$/, "")
    .replace(/\+/g, "-")
    .replace(/\//g, "_");
}

function makeJwt(payload: Record<string, unknown>): string {
  const header = b64url({ alg: "RS256", typ: "JWT" });
  const body = b64url(payload);
  return `${header}.${body}.signature`;
}

test("parseCodexSessionJson: extracts accessToken from the exact chatgpt.com/api/auth/session shape", () => {
  const accessToken = makeJwt({ email: "session@example.com" });
  const result = parseCodexSessionJson({
    user: { email: "session@example.com" },
    accessToken,
    expires: new Date(Date.now() + 60_000).toISOString(),
  });
  assert.equal(result.ok, true);
  if (result.ok) {
    assert.equal(result.session.accessToken, accessToken);
    assert.equal(result.session.email, "session@example.com");
  }
});

test("parseCodexSessionJson: accepts access_token, sessionToken, and nested tokens.access_token aliases", () => {
  const jwt = makeJwt({});
  const snakeCase = parseCodexSessionJson({ access_token: jwt });
  assert.equal(snakeCase.ok, true);

  const sessionToken = parseCodexSessionJson({ sessionToken: jwt });
  assert.equal(sessionToken.ok, true);

  const nested = parseCodexSessionJson({ tokens: { access_token: jwt } });
  assert.equal(nested.ok, true);
  if (nested.ok) assert.equal(nested.session.accessToken, jwt);
});

test("parseCodexSessionJson: rejects malformed / non-object input with a typed error, not a throw", () => {
  assert.equal(parseCodexSessionJson(null).ok, false);
  assert.equal(parseCodexSessionJson("just a string").ok, false);
  assert.equal(parseCodexSessionJson(42).ok, false);
  assert.equal(parseCodexSessionJson([]).ok, false);

  const result = parseCodexSessionJson("just a string");
  assert.equal(result.ok, false);
  if (!result.ok) assert.match(result.error, /not a JSON object/i);
});

test("parseCodexSessionJson: rejects an object with no recognizable token field", () => {
  const result = parseCodexSessionJson({ user: { email: "no-token@example.com" } });
  assert.equal(result.ok, false);
  if (!result.ok) assert.match(result.error, /access token/i);
});

test("parseCodexSessionJson: rejects an expired session via the top-level `expires` field", () => {
  const accessToken = makeJwt({});
  const result = parseCodexSessionJson({
    accessToken,
    expires: new Date(Date.now() - 60_000).toISOString(),
  });
  assert.equal(result.ok, false);
  if (!result.ok) assert.match(result.error, /expired/i);
});

test("parseCodexSessionJson: rejects an expired session via the JWT `exp` claim", () => {
  const pastExpSeconds = Math.floor((Date.now() - 60_000) / 1000);
  const accessToken = makeJwt({ exp: pastExpSeconds });
  const result = parseCodexSessionJson({ accessToken });
  assert.equal(result.ok, false);
  if (!result.ok) assert.match(result.error, /expired/i);
});

test("parseCodexSessionJson: accepts a non-expired session with a future JWT `exp` claim", () => {
  const futureExpSeconds = Math.floor((Date.now() + 60_000) / 1000);
  const accessToken = makeJwt({ exp: futureExpSeconds });
  const result = parseCodexSessionJson({ accessToken });
  assert.equal(result.ok, true);
});

test("parseCodexSessionJson: rejects a token field that does not look like a JWT", () => {
  const result = parseCodexSessionJson({ accessToken: "not-a-jwt" });
  assert.equal(result.ok, false);
  if (!result.ok) assert.match(result.error, /JWT/i);
});

test("looksLikeCodexSessionJson: true for a JSON object string", () => {
  assert.equal(looksLikeCodexSessionJson('{"accessToken":"eyJ.eyJ.sig"}'), true);
  assert.equal(looksLikeCodexSessionJson('  {"user":{}}  '), true);
});

test("looksLikeCodexSessionJson: false for a bare JWT, an OAuth callback URL, and malformed JSON", () => {
  assert.equal(looksLikeCodexSessionJson("eyJhbGciOiJSUzI1NiJ9.eyJzdWIiOiIxIn0.sig"), false);
  assert.equal(
    looksLikeCodexSessionJson("https://example.com/callback?code=abc&state=xyz"),
    false
  );
  assert.equal(looksLikeCodexSessionJson("{not valid json"), false);
  assert.equal(looksLikeCodexSessionJson(""), false);
});
