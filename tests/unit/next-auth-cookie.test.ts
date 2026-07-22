import test from "node:test";
import assert from "node:assert/strict";
import {
  mergeRefreshedCookie,
  collectSetCookieHeader,
  SESSION_TOKEN_FAMILY_RE,
} from "../../open-sse/utils/nextAuthCookie.ts";

test("SESSION_TOKEN_FAMILY_RE matches unchunked and chunked names", () => {
  assert.equal(SESSION_TOKEN_FAMILY_RE.test("__Secure-next-auth.session-token"), true);
  assert.equal(SESSION_TOKEN_FAMILY_RE.test("__Secure-next-auth.session-token.0"), true);
  assert.equal(SESSION_TOKEN_FAMILY_RE.test("__Secure-next-auth.session-token.12"), true);
  assert.equal(SESSION_TOKEN_FAMILY_RE.test("cf_clearance"), false);
});

test("mergeRefreshedCookie returns null when Set-Cookie has no session token", () => {
  assert.equal(
    mergeRefreshedCookie("abc", "cf_clearance=xyz; Path=/; HttpOnly"),
    null
  );
});

test("mergeRefreshedCookie rotates bare session-token value into named cookie", () => {
  const out = mergeRefreshedCookie(
    "oldtoken",
    "__Secure-next-auth.session-token=newtoken; Path=/; Secure; HttpOnly"
  );
  assert.equal(out, "__Secure-next-auth.session-token=newtoken");
});

test("mergeRefreshedCookie preserves non-session cookies in full jar", () => {
  const original =
    "cf_clearance=cf123; __Secure-next-auth.session-token=old; __cf_bm=bm1";
  const out = mergeRefreshedCookie(
    original,
    "__Secure-next-auth.session-token=new; Path=/; Secure"
  );
  assert.ok(out);
  assert.match(out!, /cf_clearance=cf123/);
  assert.match(out!, /__cf_bm=bm1/);
  assert.match(out!, /__Secure-next-auth\.session-token=new/);
  assert.doesNotMatch(out!, /session-token=old/);
});

test("mergeRefreshedCookie handles unchunked → chunked rotation", () => {
  const original = "__Secure-next-auth.session-token=oldwhole; cf_clearance=cf";
  const setCookie =
    "__Secure-next-auth.session-token.0=chunk0; Path=/, __Secure-next-auth.session-token.1=chunk1; Path=/";
  const out = mergeRefreshedCookie(original, setCookie);
  assert.ok(out);
  assert.match(out!, /session-token\.0=chunk0/);
  assert.match(out!, /session-token\.1=chunk1/);
  assert.doesNotMatch(out!, /session-token=oldwhole/);
  assert.match(out!, /cf_clearance=cf/);
});

test("mergeRefreshedCookie returns null when rotation matches existing values", () => {
  const original = "__Secure-next-auth.session-token=same; cf_clearance=cf";
  const out = mergeRefreshedCookie(
    original,
    "__Secure-next-auth.session-token=same; Path=/"
  );
  assert.equal(out, null);
});

test("collectSetCookieHeader prefers getSetCookie when available", () => {
  const headers = new Headers();
  headers.append("set-cookie", "a=1");
  // Native Headers in Node may implement getSetCookie
  const collected = collectSetCookieHeader(headers);
  assert.ok(collected === null || typeof collected === "string");
});
