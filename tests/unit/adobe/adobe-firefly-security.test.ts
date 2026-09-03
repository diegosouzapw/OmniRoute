import assert from "node:assert/strict";
import test from "node:test";

import {
  decodeAdobeJwtPayload,
  extractAdobeCookieHeader,
  extractAdobeCredentialToken,
} from "../../../open-sse/services/adobeFireflyClient.ts";
import {
  isAdobeFireflyApiUrl,
  isAdobeLoginCookieDomain,
} from "../../../open-sse/services/adobeFireflySecurity.ts";

function adobeJwt(payload: Record<string, unknown>): string {
  const header = Buffer.from(JSON.stringify({ alg: "none", typ: "JWT" })).toString("base64url");
  const body = Buffer.from(JSON.stringify(payload)).toString("base64url");
  return `${header}.${body}.signature`;
}

test("Adobe JWT extraction accepts bounded tokens and strips them from cookie blobs", () => {
  const token = adobeJwt({ user_id: "account-1", exp: 4_102_444_800 });

  assert.equal(extractAdobeCredentialToken(`Authorization: Bearer ${token}`), token);
  assert.deepEqual(decodeAdobeJwtPayload(token), {
    user_id: "account-1",
    exp: 4_102_444_800,
  });
  assert.equal(
    extractAdobeCookieHeader(`session=live; ${token}; locale=en`),
    "session=live; locale=en"
  );
});

test("Adobe JWT parsing rejects adversarial unbounded segments", () => {
  const oversized = `eyJ${"a".repeat(5_000)}.${"b".repeat(5_000)}.${"c".repeat(5_000)}`;
  assert.equal(decodeAdobeJwtPayload(oversized), null);
});

test("Adobe CDP capture only trusts exact Adobe DNS suffixes", () => {
  assert.equal(isAdobeFireflyApiUrl("https://firefly-3p.ff.adobe.io/v1/jobs"), true);
  assert.equal(isAdobeFireflyApiUrl("https://edge.firefly-3p.ff.adobe.io/v1/jobs"), true);
  assert.equal(isAdobeFireflyApiUrl("https://firefly-3p.ff.adobe.io.attacker.test/v1"), false);
  assert.equal(isAdobeFireflyApiUrl("https://attacker.test/firefly-3p.ff.adobe.io"), false);
  assert.equal(isAdobeFireflyApiUrl("not a URL"), false);

  assert.equal(isAdobeLoginCookieDomain("adobelogin.com"), true);
  assert.equal(isAdobeLoginCookieDomain(".auth.adobelogin.com"), true);
  assert.equal(isAdobeLoginCookieDomain("evil-adobelogin.com"), false);
  assert.equal(isAdobeLoginCookieDomain("adobelogin.com.attacker.test"), false);
});
