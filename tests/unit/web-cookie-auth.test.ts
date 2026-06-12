import test from "node:test";
import assert from "node:assert/strict";

const {
  extractCookieValue,
  normalizeSessionCookieHeader,
  stripCookieInputPrefix,
  buildGrokCookieHeader,
  buildQwenCookieHeader,
  extractQwenToken,
} = await import("../../src/lib/providers/webCookieAuth.ts");

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

// #3063 — Grok now requires the paired `sso-rw` write cookie alongside `sso`.
test("buildGrokCookieHeader: bare sso value emits only sso (no phantom sso-rw)", () => {
  assert.equal(buildGrokCookieHeader("eyJ0eXAi.abc.def"), "sso=eyJ0eXAi.abc.def");
});

test("buildGrokCookieHeader: single sso= pair emits only sso", () => {
  assert.equal(buildGrokCookieHeader("sso=eyJ0eXAi.abc"), "sso=eyJ0eXAi.abc");
});

test("buildGrokCookieHeader: full cookie blob forwards both sso and sso-rw", () => {
  const blob = "cf_clearance=zzz; sso=AAA.bbb; sso-rw=CCC.ddd; other=1";
  assert.equal(buildGrokCookieHeader(blob), "sso=AAA.bbb; sso-rw=CCC.ddd");
});

test("buildGrokCookieHeader: order-independent — sso-rw before sso in the blob", () => {
  const blob = "sso-rw=CCC.ddd; sso=AAA.bbb";
  assert.equal(buildGrokCookieHeader(blob), "sso=AAA.bbb; sso-rw=CCC.ddd");
});

test("buildGrokCookieHeader: blob with sso but no sso-rw emits only sso", () => {
  assert.equal(buildGrokCookieHeader("foo=1; sso=AAA.bbb; bar=2"), "sso=AAA.bbb");
});

test("buildGrokCookieHeader: blob without sso returns empty string", () => {
  assert.equal(buildGrokCookieHeader("foo=1; sso-rw=CCC.ddd; bar=2"), "");
  assert.equal(buildGrokCookieHeader(""), "");
});

test("buildQwenCookieHeader: passes through a full DevTools cookie blob", () => {
  const blob = "cna=ABC; token=jwt.tok; ssxmod_itna=1-XYZ; ssxmod_itna2=1-QRS";
  assert.equal(buildQwenCookieHeader(blob), blob);
});

test("buildQwenCookieHeader: strips a leading 'Cookie:' prefix", () => {
  assert.equal(buildQwenCookieHeader("Cookie: cna=ABC; token=jwt"), "cna=ABC; token=jwt");
});

test("buildQwenCookieHeader: a bare token (no cookie pairs) yields no cookie header", () => {
  assert.equal(buildQwenCookieHeader("eyJ0eXAi.abc.def"), "");
  assert.equal(buildQwenCookieHeader(""), "");
});

test("extractQwenToken: pulls the token= value out of a cookie blob", () => {
  assert.equal(extractQwenToken("cna=ABC; token=jwt.tok; ssxmod_itna=1-XYZ"), "jwt.tok");
});

test("extractQwenToken: returns a bare token unchanged", () => {
  assert.equal(extractQwenToken("eyJ0eXAi.abc.def"), "eyJ0eXAi.abc.def");
});

test("extractQwenToken: a cookie blob without a token cookie yields empty string", () => {
  assert.equal(extractQwenToken("cna=ABC; ssxmod_itna=1-XYZ"), "");
});
