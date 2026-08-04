// Regression for #4004: liveServer's cookie parser used an UNTAGGED template literal
// `(?:^|;\s*)` — \s collapsed to a literal "s", so auth_token only matched when it was
// the FIRST cookie. Browsers serialize "a=1; auth_token=…", so the same-origin
// reverse-proxy dashboard auth silently failed whenever any cookie preceded auth_token.
// Keep the server from auto-starting on import.
process.env.OMNIROUTE_ENABLE_LIVE_WS = "0";

import test from "node:test";
import assert from "node:assert/strict";
import { getCookieValueFromHeader } from "@/server/ws/liveServer";

test("getCookieValueFromHeader reads auth_token when it is the only cookie", () => {
  assert.equal(getCookieValueFromHeader({ cookie: "auth_token=abc123" }, "auth_token"), "abc123");
});

test("getCookieValueFromHeader reads auth_token when preceded by other cookies (#4004)", () => {
  // The standard browser "; " separator — the case the \s-vs-\\s bug broke.
  assert.equal(
    getCookieValueFromHeader({ cookie: "omni_pref=dark; auth_token=abc123" }, "auth_token"),
    "abc123"
  );
  assert.equal(
    getCookieValueFromHeader({ cookie: "a=1; b=2; auth_token=xyz" }, "auth_token"),
    "xyz"
  );
});

test("getCookieValueFromHeader handles a no-space separator too", () => {
  assert.equal(getCookieValueFromHeader({ cookie: "a=1;auth_token=tok" }, "auth_token"), "tok");
});

test("getCookieValueFromHeader returns null when the cookie is absent", () => {
  assert.equal(getCookieValueFromHeader({ cookie: "other=1; foo=2" }, "auth_token"), null);
  assert.equal(getCookieValueFromHeader({}, "auth_token"), null);
});

test("getCookieValueFromHeader URL-decodes the value", () => {
  assert.equal(
    getCookieValueFromHeader({ cookie: "x=1; auth_token=a%20b" }, "auth_token"),
    "a b"
  );
});
