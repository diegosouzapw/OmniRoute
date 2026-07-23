// #3368 PR6 — unit coverage for the pure web-session dedup helpers extracted
// from providers.ts (src/lib/db/webSessionDedup.ts).
import test from "node:test";
import assert from "node:assert/strict";

const { webSessionCredentialKey, parseProviderSpecificData } = await import(
  "../../src/lib/db/webSessionDedup.ts"
);

test("webSessionCredentialKey prefers the cookie field", () => {
  assert.equal(
    webSessionCredentialKey({ cookie: "session=ABC", note: "x" }),
    "session=ABC"
  );
});

test("webSessionCredentialKey falls back to token-kind keys", () => {
  assert.equal(webSessionCredentialKey({ token: "TOK", userToken: "TOK" }), "TOK");
});

test("webSessionCredentialKey trims and ignores empty/non-string values", () => {
  assert.equal(webSessionCredentialKey({ cookie: "  v=1  " }), "v=1");
  assert.equal(webSessionCredentialKey({ cookie: "   ", sso: "real" }), "real");
  assert.equal(webSessionCredentialKey({}), null);
  assert.equal(webSessionCredentialKey(null), null);
  assert.equal(webSessionCredentialKey("not-an-object"), null);
});

test("webSessionCredentialKey is deterministic for arbitrary keys", () => {
  const a = webSessionCredentialKey({ zeta: "z", alpha: "a" });
  const b = webSessionCredentialKey({ alpha: "a", zeta: "z" });
  assert.equal(a, b);
  assert.equal(a, "a"); // sorted key order → "alpha" wins
});

test("parseProviderSpecificData handles JSON strings, objects, and junk", () => {
  assert.deepEqual(parseProviderSpecificData('{"cookie":"x"}'), { cookie: "x" });
  assert.deepEqual(parseProviderSpecificData({ cookie: "x" }), { cookie: "x" });
  assert.equal(parseProviderSpecificData("not json"), null);
  assert.equal(parseProviderSpecificData(null), null);
  assert.equal(parseProviderSpecificData(""), null);
});
