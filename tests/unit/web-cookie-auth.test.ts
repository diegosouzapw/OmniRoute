import test from "node:test";
import assert from "node:assert/strict";

const { extractCookieValue, normalizeSessionCookieHeader, stripCookieInputPrefix } =
  await import("../../src/lib/providers/webCookieAuth.ts");

test("stripCookieInputPrefix removes 'cookie:' and 'bearer ' prefixes", () => {
  assert.equal(stripCookieInputPrefix("Cookie: sso=abc"), "sso=abc");
  assert.equal(stripCookieInputPrefix("bearer  xyz"), "xyz");
  assert.equal(stripCookieInputPrefix("  plain  "), "plain");
  assert.equal(stripCookieInputPrefix(""), "");
});

test("normalizeSessionCookieHeader returns input as-is when it already has '='", () => {
  assert.equal(
    normalizeSessionCookieHeader(
      "__Secure-authjs.session-token=abc",
      "__Secure-authjs.session-token"
    ),
    "__Secure-authjs.session-token=abc"
  );
  assert.equal(
    normalizeSessionCookieHeader("bare-value", "__Secure-authjs.session-token"),
    "__Secure-authjs.session-token=bare-value"
  );
});

test("extractCookieValue: bare value returns unchanged", () => {
  assert.equal(extractCookieValue("eyJ0eXAi.abc.def", "sso"), "eyJ0eXAi.abc.def");
});

test("extractCookieValue: single name=value pair returns the value", () => {
  assert.equal(extractCookieValue("sso=eyJ0eXAi.abc.def", "sso"), "eyJ0eXAi.abc.def");
  assert.equal(extractCookieValue("Cookie: sso=eyJ0eXAi.abc.def", "sso"), "eyJ0eXAi.abc.def");
});

test("extractCookieValue: full DevTools cookie blob picks the named cookie", () => {
  const blob =
    "i18nextLng=en; stblid=aaaaaaaa; __cf_bm=foo; sso-rw=eyJOTHER; sso=eyJTARGET.abc.def; cf_clearance=baz;";
  assert.equal(extractCookieValue(blob, "sso"), "eyJTARGET.abc.def");
  assert.equal(extractCookieValue(blob, "sso-rw"), "eyJOTHER");
  assert.equal(extractCookieValue(blob, "cf_clearance"), "baz");
});

test("extractCookieValue: blob without target cookie returns empty string", () => {
  assert.equal(extractCookieValue("foo=1; bar=2;", "sso"), "");
});

test("extractCookieValue: empty input returns empty string", () => {
  assert.equal(extractCookieValue("", "sso"), "");
  assert.equal(extractCookieValue("   ", "sso"), "");
});

test("extractCookieValue: cookie name with regex metacharacters is escaped", () => {
  const blob = "foo=1; my.cookie+name=hello; bar=2;";
  assert.equal(extractCookieValue(blob, "my.cookie+name"), "hello");
});
