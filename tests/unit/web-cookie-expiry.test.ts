import { describe, it } from "node:test";
import assert from "node:assert/strict";
import {
  decodeJwtPayloadExp,
  deriveCookieExpiryIso,
  readCookieExpiresAt,
  withDerivedCookieExpiry,
} from "../../src/shared/utils/webCookieExpiry.ts";

function jwt(payload: object): string {
  const enc = (obj: object) =>
    Buffer.from(JSON.stringify(obj)).toString("base64url");
  return `${enc({ alg: "HS256", typ: "JWT" })}.${enc(payload)}.sig`;
}

const EXP_AT = 1_800_000_000_000; // 2027-01-15T06:40:00.000Z

describe("web-cookie expiry derivation (#11497)", () => {
  it("decodes a standard JWT exp into epoch ms", () => {
    assert.equal(decodeJwtPayloadExp(jwt({ exp: EXP_AT / 1000 })), EXP_AT);
  });

  it("accepts url-safe base64 without padding", () => {
    const seg = Buffer.from(JSON.stringify({ exp: 1234567890 }))
      .toString("base64")
      .replace(/\+/g, "-")
      .replace(/\//g, "_")
      .replace(/=+$/, "");
    const token = `aaa.${seg}.bbb`;
    assert.equal(decodeJwtPayloadExp(token), 1234567890000);
  });

  it("scans cookie-pair values of a pasted Cookie header", () => {
    const header = `cf_clearance=x.y.z; __Secure-next-auth.session-token=${jwt({
      exp: EXP_AT / 1000,
    })}; other=1`;
    assert.equal(deriveCookieExpiryIso(header), new Date(EXP_AT).toISOString());
  });

  it("returns null for opaque cookies (claude sessionKey, grok sso)", () => {
    assert.equal(decodeJwtPayloadExp("sk-ant-sid01-abcdef"), null);
    assert.equal(
      deriveCookieExpiryIso("sso=eyJhbGciOiJIUzUxMiJ9.notjson.sig; sso-rw=1"),
      null
    );
  });

  it("returns null for malformed or non-positive payloads", () => {
    assert.equal(decodeJwtPayloadExp("a.b"), null);
    assert.equal(decodeJwtPayloadExp("a.b.c"), null);
    assert.equal(decodeJwtPayloadExp(jwt({})), null);
    assert.equal(decodeJwtPayloadExp(jwt({ exp: 0 })), null);
    assert.equal(decodeJwtPayloadExp(jwt({ exp: -5 })), null);
    assert.equal(decodeJwtPayloadExp(`a.${Buffer.from("[1]").toString("base64url")}.c`), null);
    assert.equal(decodeJwtPayloadExp(`a.${Buffer.from("null").toString("base64url")}.c`), null);
    assert.equal(decodeJwtPayloadExp(null), null);
    assert.equal(decodeJwtPayloadExp(42), null);
  });

  it("readCookieExpiresAt only accepts non-empty strings", () => {
    assert.equal(readCookieExpiresAt({ cookieExpiresAt: "2027-01-01T00:00:00.000Z" }), "2027-01-01T00:00:00.000Z");
    assert.equal(readCookieExpiresAt({ cookieExpiresAt: "" }), null);
    assert.equal(readCookieExpiresAt({}), null);
    assert.equal(readCookieExpiresAt(null), null);
    assert.equal(readCookieExpiresAt("str"), null);
  });

  it("withDerivedCookieExpiry sets the date and preserves sibling keys", () => {
    const out = withDerivedCookieExpiry(
      { spaceId: "s1" },
      jwt({ exp: EXP_AT / 1000 })
    );
    assert.equal(out.cookieExpiresAt, new Date(EXP_AT).toISOString());
    assert.equal(out.spaceId, "s1");
  });

  it("withDerivedCookieExpiry drops the stale date when replaced by an opaque cookie", () => {
    const out = withDerivedCookieExpiry(
      { cookieExpiresAt: "2020-01-01T00:00:00.000Z", spaceId: "s1" },
      "sk-ant-sid01-new-opaque"
    );
    assert.equal("cookieExpiresAt" in out, false);
    assert.equal(out.spaceId, "s1");
  });

  it("withDerivedCookieExpiry leaves data untouched when no credential is present", () => {
    const original = { cookieExpiresAt: "2020-01-01T00:00:00.000Z" };
    const out = withDerivedCookieExpiry(original, "");
    assert.deepEqual(out, original);
  });
});
