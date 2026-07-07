import test from "node:test";
import assert from "node:assert/strict";

// Issue #6268 — "Add session cookie" modal now renders a one-click "Open <host> →"
// link built from WEB_COOKIE_PROVIDERS[id].website via getWebCookieProviderWebsite().
const webCookie = await import("../../src/shared/constants/providers/web-cookie.ts");

test("getWebCookieProviderWebsite returns the declared website for known -web providers", () => {
  assert.equal(webCookie.getWebCookieProviderWebsite("chatgpt-web"), "https://chatgpt.com");
  assert.equal(webCookie.getWebCookieProviderWebsite("gemini-web"), "https://gemini.google.com");
  assert.equal(webCookie.getWebCookieProviderWebsite("claude-web"), "https://claude.ai");
  assert.equal(webCookie.getWebCookieProviderWebsite("lmarena"), "https://lmarena.ai");
});

test("getWebCookieProviderWebsite returns null for unknown ids and falsy input", () => {
  assert.equal(webCookie.getWebCookieProviderWebsite("unknown-provider"), null);
  assert.equal(webCookie.getWebCookieProviderWebsite(""), null);
  assert.equal(webCookie.getWebCookieProviderWebsite(undefined), null);
});

test("every web-cookie provider declares a website URL that parses as a valid absolute URL", () => {
  for (const [id, entry] of Object.entries(webCookie.WEB_COOKIE_PROVIDERS)) {
    const website = (entry as { website?: string }).website;
    assert.ok(website, id + " should declare a website URL for the Open <host> modal link");
    // Round-trip through URL() to guarantee the modal never throws on new URL(website).host.
    const parsed = new URL(website as string);
    assert.ok(parsed.host.length > 0, id + " website should have a non-empty host");
    assert.ok(parsed.protocol === "https:", id + " website should be https");
  }
});
