import test from "node:test";
import assert from "node:assert/strict";

const {
  parseJsonCookiesToHeader,
  normalizeSessionCookieHeader,
} = await import("../../src/lib/providers/webCookieAuth.ts");

// parseJsonCookiesToHeader — unit tests
test("parseJsonCookiesToHeader: valid JSON array returns Cookie header string", () => {
  const json = `[{"name":"sso","value":"eyJ0eXAi.abc.def"}]`;
  assert.equal(parseJsonCookiesToHeader(json), "sso=eyJ0eXAi.abc.def");
});

test("parseJsonCookiesToHeader: multiple entries joined with ; ", () => {
  const json = `[
    {"name":"sso","value":"AAA.bbb"},
    {"name":"sso-rw","value":"CCC.ddd"},
    {"name":"cf_clearance","value":"zzz"}
  ]`;
  assert.equal(parseJsonCookiesToHeader(json), "sso=AAA.bbb; sso-rw=CCC.ddd; cf_clearance=zzz");
});

test("parseJsonCookiesToHeader: extra optional fields are ignored gracefully", () => {
  const json = `[{"name":"session","value":"abc","domain":".example.com","path":"/","httpOnly":true,"secure":true,"sameSite":"Lax"}]`;
  assert.equal(parseJsonCookiesToHeader(json), "session=abc");
});

test("parseJsonCookiesToHeader: missing name throws descriptive error at correct index", () => {
  const json = `[{"name":"a","value":"1"},{"value":"no-name"}]`;
  assert.throws(
    () => parseJsonCookiesToHeader(json),
    { message: "Invalid cookie JSON at index 1: missing required field 'name'" }
  );
});

test("parseJsonCookiesToHeader: missing value throws descriptive error at correct index", () => {
  const json = `[{"name":"a","value":"1"},{"name":"no-value"}]`;
  assert.throws(
    () => parseJsonCookiesToHeader(json),
    { message: "Invalid cookie JSON at index 1: missing required field 'value'" }
  );
});

test("parseJsonCookiesToHeader: empty array returns empty string", () => {
  assert.equal(parseJsonCookiesToHeader("[]"), "");
});

test("parseJsonCookiesToHeader: raw string (non-JSON) returns null (pass-through)", () => {
  assert.equal(parseJsonCookiesToHeader("sso=eyJ0eXAi.abc.def"), null);
  assert.equal(parseJsonCookiesToHeader("__Secure-authjs.session-token=abc"), null);
  assert.equal(parseJsonCookiesToHeader("bearer xyz"), null);
});

test("parseJsonCookiesToHeader: malformed JSON returns null (pass-through, no crash)", () => {
  assert.equal(parseJsonCookiesToHeader("[not valid json"), null);
  assert.equal(parseJsonCookiesToHeader("{invalid}"), null);
});

test("parseJsonCookiesToHeader: empty/whitespace input returns null", () => {
  assert.equal(parseJsonCookiesToHeader(""), null);
  assert.equal(parseJsonCookiesToHeader("   "), null);
});

test("parseJsonCookiesToHeader: parsed non-array JSON returns null", () => {
  assert.equal(parseJsonCookiesToHeader(`{"name":"test"}`), null);
});

test("parseJsonCookiesToHeader: entry with empty name throws error", () => {
  const json = `[{"name":"","value":"abc"}]`;
  assert.throws(
    () => parseJsonCookiesToHeader(json),
    { message: "Invalid cookie JSON at index 0: missing required field 'name'" }
  );
});

test("parseJsonCookiesToHeader: entry with empty value returns empty value in header", () => {
  const json = `[{"name":"session","value":""}]`;
  assert.equal(parseJsonCookiesToHeader(json), "session=");
});

// Integration tests via normalizeSessionCookieHeader
test("normalizeSessionCookieHeader: JSON input returns correct header", () => {
  const json = `[{"name":"__Secure-authjs.session-token","value":"abc"}]`;
  assert.equal(
    normalizeSessionCookieHeader(json, "__Secure-authjs.session-token"),
    "__Secure-authjs.session-token=abc"
  );
});

test("normalizeSessionCookieHeader: JSON input with prefix stripped works", () => {
  const json = `[{"name":"sso","value":"eyJ0eXAi.abc"}]`;
  assert.equal(
    normalizeSessionCookieHeader(`Cookie: ${json}`, "sso"),
    "sso=eyJ0eXAi.abc"
  );
});

test("normalizeSessionCookieHeader: raw string unchanged after JSON support added", () => {
  assert.equal(
    normalizeSessionCookieHeader("__Secure-authjs.session-token=abc", "__Secure-authjs.session-token"),
    "__Secure-authjs.session-token=abc"
  );
  assert.equal(
    normalizeSessionCookieHeader("bare-value", "__Secure-authjs.session-token"),
    "__Secure-authjs.session-token=bare-value"
  );
});
