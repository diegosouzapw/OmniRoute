import test from "node:test";
import assert from "node:assert/strict";

import { isVolcengineCookieDomain } from "../../open-sse/services/volcengineConsoleAutoLogin.ts";

// CodeQL js/incomplete-url-substring-sanitization (#860, #861). The console
// auto-login harvested `digest`/`AccountID`/`csrfToken`/`userInfo` from any
// cookie whose domain merely *contained* "volcengine.com", so a cookie set by
// `volcengine.com.attacker.tld` (or `notvolcengine.com`) was accepted as an
// operator credential and persisted as a provider connection. Match the domain
// the way a cookie domain has to be matched: exact host or a dot-boundary
// suffix. Mirrors isAdobeCookieDomain in adobeFireflyBrowserLogin.ts.

test("accepts the real console cookie domains", () => {
  for (const domain of [
    "volcengine.com",
    ".volcengine.com",
    "console.volcengine.com",
    ".console.volcengine.com",
    "CONSOLE.VOLCENGINE.COM",
    "  .volcengine.com  ",
  ]) {
    assert.equal(isVolcengineCookieDomain(domain), true, domain);
  }
});

test("rejects look-alike domains that merely contain the string", () => {
  for (const domain of [
    "volcengine.com.attacker.tld",
    ".volcengine.com.evil.example",
    "notvolcengine.com",
    "myvolcengine.com",
    "volcengine.com.br",
    "evil.tld/volcengine.com",
    "volcengine.company",
  ]) {
    assert.equal(isVolcengineCookieDomain(domain), false, domain);
  }
});

test("rejects empty / missing domains instead of throwing", () => {
  assert.equal(isVolcengineCookieDomain(undefined), false);
  assert.equal(isVolcengineCookieDomain(""), false);
  assert.equal(isVolcengineCookieDomain("   "), false);
});

// The same class exists in inAppLoginService's cookie capture, where the
// expected domain comes from TOKEN_EXTRACTION_CONFIGS instead of a literal —
// which is why CodeQL did not flag it. Same helper, same guarantees.

test("matchesCookieDomain handles a config-supplied expected domain", async () => {
  const { matchesCookieDomain } = await import("../../open-sse/utils/cookieDomain.ts");

  assert.equal(matchesCookieDomain("app.example.com", "example.com"), true);
  assert.equal(matchesCookieDomain(".example.com", ".example.com"), true);
  assert.equal(matchesCookieDomain("example.com", ".example.com"), true);

  assert.equal(matchesCookieDomain("example.com.attacker.tld", "example.com"), false);
  assert.equal(matchesCookieDomain("notexample.com", "example.com"), false);
  assert.equal(matchesCookieDomain("example.com", "app.example.com"), false);
});

test("matchesCookieDomain fails closed on a missing expected domain", async () => {
  const { matchesCookieDomain } = await import("../../open-sse/utils/cookieDomain.ts");

  assert.equal(matchesCookieDomain("example.com", undefined), false);
  assert.equal(matchesCookieDomain("example.com", ""), false);
  assert.equal(matchesCookieDomain("example.com", "."), false);
});
