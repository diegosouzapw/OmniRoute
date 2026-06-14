import test from "node:test";
import assert from "node:assert/strict";

import {
  parseAndValidateAgyToken,
  AgyAuthFileError,
} from "../../src/lib/oauth/utils/agyAuthImport.ts";

// Fixture token values are deliberately generic (not `ya29.`/`1//` shaped) so secret
// scanners don't flag them — the parser only cares that they are non-empty strings.
const ACCESS = "agy-access-token-fixture";
const REFRESH = "agy-refresh-token-fixture";

test("parses the nested agy token-file shape (token.* with ISO expiry, no id_token)", () => {
  const parsed = parseAndValidateAgyToken({
    token: {
      access_token: ACCESS,
      token_type: "Bearer",
      refresh_token: REFRESH,
      expiry: "2026-05-29T06:16:24.338-03:00",
    },
    auth_method: "consumer",
  });
  assert.equal(parsed.accessToken, ACCESS);
  assert.equal(parsed.refreshToken, REFRESH);
  assert.equal(parsed.tokenType, "Bearer");
  assert.equal(parsed.authMethod, "consumer");
  assert.equal(parsed.expiresAt, new Date("2026-05-29T06:16:24.338-03:00").toISOString());
});

test("accepts a flat fallback shape (access_token/refresh_token at top level)", () => {
  const parsed = parseAndValidateAgyToken({
    access_token: ACCESS,
    refresh_token: REFRESH,
  });
  assert.equal(parsed.accessToken, ACCESS);
  assert.equal(parsed.refreshToken, REFRESH);
  assert.equal(parsed.tokenType, "Bearer"); // default
  assert.equal(parsed.expiresAt, null);
});

test("supports unix-ms expiry_date as an alternative to ISO expiry", () => {
  const ms = 1780038984000;
  const parsed = parseAndValidateAgyToken({
    token: { access_token: ACCESS, refresh_token: REFRESH, expiry_date: ms },
  });
  assert.equal(parsed.expiresAt, new Date(ms).toISOString());
});

test("rejects a token file missing access_token", () => {
  assert.throws(
    () => parseAndValidateAgyToken({ token: { refresh_token: REFRESH } }),
    (err) =>
      err instanceof AgyAuthFileError &&
      err.code === "missing_access_token" &&
      err.status === 400
  );
});

test("rejects a token file missing refresh_token", () => {
  assert.throws(
    () => parseAndValidateAgyToken({ token: { access_token: ACCESS } }),
    (err) => err instanceof AgyAuthFileError && err.code === "missing_refresh_token"
  );
});

test("invalid/garbage expiry becomes null rather than throwing", () => {
  const parsed = parseAndValidateAgyToken({
    token: { access_token: ACCESS, refresh_token: REFRESH, expiry: "not-a-date" },
  });
  assert.equal(parsed.expiresAt, null);
});
