/**
 * Bulk Web-Session Import — Unit Tests (PR6 of issue #3368)
 *
 * Run: node --import tsx/esm --test tests/unit/bulk-web-session-import.test.ts
 */

import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { bulkWebSessionImportSchema } from "../../src/shared/validation/schemas.ts";
import {
  requiresWebSessionCredential,
  getWebSessionCredentialRequirement,
  hasUsableWebSessionCredential,
  resolveWebSessionImportApiKey,
} from "../../src/shared/providers/webSessionCredentials.ts";

describe("bulkWebSessionImportSchema", () => {
  it("accepts valid input with single entry", () => {
    const result = bulkWebSessionImportSchema.safeParse({
      provider: "chatgpt-web",
      entries: [{ name: "Account 1", credential: "__Secure-next-auth.session-token=abc123" }],
    });
    assert.equal(result.success, true);
  });

  it("accepts valid input with multiple entries", () => {
    const result = bulkWebSessionImportSchema.safeParse({
      provider: "grok-web",
      entries: [
        { name: "Account 1", credential: "sso=abc; sso-rw=def" },
        { name: "Account 2", credential: "sso=ghi; sso-rw=jkl" },
        { name: "Account 3", credential: "sso=mno; sso-rw=pqr" },
      ],
      priority: 5,
    });
    assert.equal(result.success, true);
  });

  it("accepts optional globalPriority as null", () => {
    const result = bulkWebSessionImportSchema.safeParse({
      provider: "claude-web",
      entries: [{ name: "A1", credential: "sessionKey=xyz" }],
      globalPriority: null,
    });
    assert.equal(result.success, true);
  });

  it("rejects empty entries array", () => {
    const result = bulkWebSessionImportSchema.safeParse({
      provider: "chatgpt-web",
      entries: [],
    });
    assert.equal(result.success, false);
  });

  it("rejects more than 50 entries", () => {
    const entries = Array.from({ length: 51 }, (_, i) => ({
      name: `Account ${i}`,
      credential: "cookie=value",
    }));
    const result = bulkWebSessionImportSchema.safeParse({
      provider: "chatgpt-web",
      entries,
    });
    assert.equal(result.success, false);
  });

  it("rejects entry with empty credential", () => {
    const result = bulkWebSessionImportSchema.safeParse({
      provider: "chatgpt-web",
      entries: [{ name: "Account 1", credential: "" }],
    });
    assert.equal(result.success, false);
  });

  it("rejects entry with empty name", () => {
    const result = bulkWebSessionImportSchema.safeParse({
      provider: "chatgpt-web",
      entries: [{ name: "", credential: "cookie=value" }],
    });
    assert.equal(result.success, false);
  });

  it("rejects missing provider", () => {
    const result = bulkWebSessionImportSchema.safeParse({
      entries: [{ name: "A1", credential: "cookie=value" }],
    });
    assert.equal(result.success, false);
  });

  it("rejects priority out of range", () => {
    const result = bulkWebSessionImportSchema.safeParse({
      provider: "chatgpt-web",
      entries: [{ name: "A1", credential: "cookie=value" }],
      priority: 0,
    });
    assert.equal(result.success, false);

    const result2 = bulkWebSessionImportSchema.safeParse({
      provider: "chatgpt-web",
      entries: [{ name: "A1", credential: "cookie=value" }],
      priority: 101,
    });
    assert.equal(result2.success, false);
  });

  it("accepts exactly 50 entries (boundary)", () => {
    const entries = Array.from({ length: 50 }, (_, i) => ({
      name: `Account ${i}`,
      credential: "cookie=value",
    }));
    const result = bulkWebSessionImportSchema.safeParse({
      provider: "chatgpt-web",
      entries,
    });
    assert.equal(result.success, true);
  });
});

describe("web-session credential helpers", () => {
  it("requiresWebSessionCredential returns true for web-cookie providers", () => {
    assert.equal(requiresWebSessionCredential("chatgpt-web"), true);
    assert.equal(requiresWebSessionCredential("grok-web"), true);
    assert.equal(requiresWebSessionCredential("claude-web"), true);
    assert.equal(requiresWebSessionCredential("deepseek-web"), true);
  });

  it("requiresWebSessionCredential returns false for non-web providers", () => {
    assert.equal(requiresWebSessionCredential("openai"), false);
    assert.equal(requiresWebSessionCredential("anthropic"), false);
    assert.equal(requiresWebSessionCredential("nonexistent"), false);
  });

  it("getWebSessionCredentialRequirement returns correct kind for cookie providers", () => {
    const req = getWebSessionCredentialRequirement("chatgpt-web");
    assert.ok(req);
    assert.equal(req.kind, "cookie");
  });

  it("getWebSessionCredentialRequirement returns correct kind for token providers", () => {
    const req = getWebSessionCredentialRequirement("deepseek-web");
    assert.ok(req);
    assert.equal(req.kind, "token");
  });

  it("hasUsableWebSessionCredential validates cookie data correctly", () => {
    assert.equal(
      hasUsableWebSessionCredential("chatgpt-web", {
        cookie: "__Secure-next-auth.session-token=abc",
      }),
      true
    );
    assert.equal(hasUsableWebSessionCredential("chatgpt-web", { cookie: "" }), false);
    assert.equal(hasUsableWebSessionCredential("chatgpt-web", {}), false);
  });

  it("hasUsableWebSessionCredential validates token data correctly", () => {
    assert.equal(hasUsableWebSessionCredential("deepseek-web", { token: "my-token" }), true);
    assert.equal(hasUsableWebSessionCredential("deepseek-web", { token: "   " }), false);
  });
});

describe("resolveWebSessionImportApiKey (token-kind imports must populate apiKey)", () => {
  // Regression: the bulk web-session import stored token-kind credentials
  // (deepseek-web, copilot-web, t3-chat-web, …) only in providerSpecificData and
  // left apiKey null. Both the connection validator (validateDeepSeekWebProvider)
  // and the executor (extractUserToken → credentials.apiKey) read the token from
  // apiKey, so imported token-kind connections were never recognized. Token-kind
  // must resolve the credential into apiKey; cookie-kind keeps apiKey null (those
  // executors read providerSpecificData.cookie).
  it("returns the credential for a token-kind provider (deepseek-web)", () => {
    const req = getWebSessionCredentialRequirement("deepseek-web");
    assert.equal(
      resolveWebSessionImportApiKey(req, "j9CVFGvd8Y/deadbeeftoken"),
      "j9CVFGvd8Y/deadbeeftoken"
    );
  });

  it("preserves a JSON-wrapped userToken verbatim (extractUserToken unwraps it later)", () => {
    const req = getWebSessionCredentialRequirement("deepseek-web");
    const blob = '{"value":"abc123","__version":"0"}';
    assert.equal(resolveWebSessionImportApiKey(req, blob), blob);
  });

  it("returns null for cookie-kind providers (they read providerSpecificData.cookie)", () => {
    assert.equal(
      resolveWebSessionImportApiKey(
        getWebSessionCredentialRequirement("claude-web"),
        "sessionKey=abc"
      ),
      null
    );
    assert.equal(
      resolveWebSessionImportApiKey(
        getWebSessionCredentialRequirement("chatgpt-web"),
        "__Secure-next-auth.session-token=abc"
      ),
      null
    );
  });

  it("returns null for a whitespace-only or missing credential", () => {
    const req = getWebSessionCredentialRequirement("deepseek-web");
    assert.equal(resolveWebSessionImportApiKey(req, "   "), null);
    assert.equal(resolveWebSessionImportApiKey(null, "anything"), null);
  });

  it("trims surrounding whitespace from the stored token", () => {
    const req = getWebSessionCredentialRequirement("copilot-web");
    assert.equal(resolveWebSessionImportApiKey(req, "  tok-123  "), "tok-123");
  });
});
