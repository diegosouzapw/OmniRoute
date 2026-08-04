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
  // Grok needs BOTH sso and sso-rw cookies (#3180). #7567 added the proactive
  // cf_clearance/User-Agent hint — assert its intent, don't freeze operator copy.
  {
    const req = webSessionCredentials.getWebSessionCredentialRequirement("grok-web");
    assert.ok(req && req.kind === "cookie");
    assert.equal(req.credentialName, "sso + sso-rw");
    assert.equal(req.placeholder, "sso=...; sso-rw=...");
    assert.equal(req.acceptsFullCookieHeader, true);
    assert.deepEqual(req.storageKeys, ["cookie", "sso", "sso-rw"]);
    assert.equal(req.hintKey, "grokWebCookieHint");
    assert.ok(typeof req.hintFallback === "string" && /cf_clearance/.test(req.hintFallback));
    assert.ok(/User-Agent/.test(req.hintFallback));
  }
  assert.deepEqual(webSessionCredentials.getWebSessionCredentialRequirement("copilot-web"), {
    kind: "token",
    credentialName: "access_token",
    placeholder: "access_token=... or a DevTools HAR export",
    acceptsFullCookieHeader: false,
    storageKeys: ["token", "access_token", "accessToken"],
  });
  assert.deepEqual(webSessionCredentials.getWebSessionCredentialRequirement("deepseek-web"), {
    kind: "token",
    credentialName: "userToken",
    placeholder: "userToken=... or paste raw userToken",
    acceptsFullCookieHeader: false,
    storageKeys: ["token", "userToken"],
  });
  // Arena (lmarena): assert contract/intent only — do not freeze UX copy.
  // #3810 chunk name, #4271 split SSR cookies, full Cookie header paste.
  {
    const req = webSessionCredentials.getWebSessionCredentialRequirement("lmarena");
    assert.ok(req && req.kind === "cookie");
    assert.equal(req.acceptsFullCookieHeader, true);
    assert.equal(req.hintKey, "lmarenaWebCookieHint");
    assert.ok(req.storageKeys.includes("cookie"));
    assert.ok(req.storageKeys.includes("arena-auth-prod-v1.0"));
    assert.ok(req.storageKeys.includes("arena-auth-prod-v1.1"));
    // legacy key retained for already-saved credentials
    assert.ok(req.storageKeys.includes("session"));
    assert.ok(/full cookie header/i.test(req.credentialName));
    assert.ok(/arena-auth-prod-v1/i.test(req.placeholder));
    // hintFallback is operator copy — may change with CF/reCAPTCHA notes; must still
    // steer users to a full header and away from the empty single base cookie.
    assert.ok(typeof req.hintFallback === "string" && req.hintFallback.length > 0);
    assert.ok(/full cookie header/i.test(req.hintFallback));
    assert.ok(/arena-auth-prod-v1/i.test(req.hintFallback));
    assert.ok(/empty/i.test(req.hintFallback));
  }
  assert.deepEqual(webSessionCredentials.getWebSessionCredentialRequirement("huggingchat"), {
    kind: "cookie",
    credentialName: "full Cookie header (hf-chat + token)",
    placeholder:
      "hf-chat=...; token=...; aws-waf-token=... (full Cookie header from huggingface.co)",
    acceptsFullCookieHeader: true,
    storageKeys: ["cookie", "hf-chat"],
  });
  // veoaifree-web is now a NOAUTH provider — not in WEB_SESSION_CREDENTIAL_REQUIREMENTS
  assert.equal(webSessionCredentials.getWebSessionCredentialRequirement("veoaifree-web"), null);
  assert.deepEqual(webSessionCredentials.getWebSessionCredentialRequirement("t3-web"), {
    kind: "cookie",
    credentialName: "convex-session-id + Cookie header",
    placeholder: "convex-session-id=abc123...; Cookie: ...",
    acceptsFullCookieHeader: true,
    storageKeys: ["cookie", "convex-session-id", "convexSessionId"],
    // #5465 — t3.chat ships a step-by-step DevTools copy hint (localStorage + Cookie header).
    hintKey: "t3ChatWebCookieHint",
  });
});

test("web session credential validator requires provider-specific non-empty values", () => {
  assert.equal(
    webSessionCredentials.hasUsableWebSessionCredential("qwen-web", { token: "qwen-token" }),
    true
  );
  assert.equal(
    webSessionCredentials.hasUsableWebSessionCredential("qwen-web", { token: "   " }),
    false
  );
  assert.equal(
    webSessionCredentials.hasUsableWebSessionCredential("qwen-web", { unrelated: "value" }),
    false
  );
  assert.equal(
    webSessionCredentials.hasUsableWebSessionCredential("chatgpt-web", {
      cookie: "__Secure-next-auth.session-token=session",
    }),
    true
  );
  assert.equal(
    webSessionCredentials.hasUsableWebSessionCredential("chatgpt-web", { unrelated: "value" }),
    false
  );
});

test("no-auth web providers can be saved without an API key", () => {
  assert.equal(providers.providerAllowsOptionalApiKey("veoaifree-web"), true);
  assert.equal(webSessionCredentials.requiresWebSessionCredential("veoaifree-web"), false);
  assert.equal(webSessionCredentials.requiresWebSessionCredential("chatgpt-web"), true);
});
