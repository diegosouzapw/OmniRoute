import test from "node:test";
import assert from "node:assert/strict";

const providers = await import("../../src/shared/constants/providers.ts");
const webSessionCredentials =
  await import("../../src/app/(dashboard)/dashboard/providers/[id]/webSessionCredentials.ts");

test("web session credential metadata covers every web-cookie provider", () => {
  for (const providerId of Object.keys(providers.WEB_COOKIE_PROVIDERS)) {
    assert.ok(
      webSessionCredentials.getWebSessionCredentialRequirement(providerId),
      `${providerId} should declare its required web-session credential`
    );
  }
});

test("web session credential metadata identifies cookie, token, and no-auth providers", () => {
  assert.deepEqual(webSessionCredentials.getWebSessionCredentialRequirement("grok-web"), {
    kind: "cookie",
    credentialName: "sso",
    placeholder: "sso=...",
    acceptsFullCookieHeader: true,
  });
  assert.deepEqual(webSessionCredentials.getWebSessionCredentialRequirement("copilot-web"), {
    kind: "token",
    credentialName: "access_token",
    placeholder: "access_token=... or a DevTools HAR export",
    acceptsFullCookieHeader: false,
  });
  assert.deepEqual(webSessionCredentials.getWebSessionCredentialRequirement("deepseek-web"), {
    kind: "token",
    credentialName: "userToken",
    placeholder: "userToken=... or paste raw userToken",
    acceptsFullCookieHeader: false,
  });
  assert.deepEqual(webSessionCredentials.getWebSessionCredentialRequirement("veoaifree-web"), {
    kind: "none",
    credentialName: "",
    placeholder: "",
    acceptsFullCookieHeader: false,
  });
  assert.deepEqual(webSessionCredentials.getWebSessionCredentialRequirement("t3-web"), {
    kind: "cookie",
    credentialName: "convex-session-id + Cookie header",
    placeholder: "convex-session-id=abc123...; Cookie: ...",
    acceptsFullCookieHeader: true,
  });
});

test("no-auth web providers can be saved without an API key", () => {
  assert.equal(providers.providerAllowsOptionalApiKey("veoaifree-web"), true);
  assert.equal(webSessionCredentials.requiresWebSessionCredential("veoaifree-web"), false);
  assert.equal(webSessionCredentials.requiresWebSessionCredential("chatgpt-web"), true);
});
