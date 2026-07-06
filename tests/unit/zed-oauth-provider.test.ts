import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { PROVIDERS } from "../../src/lib/oauth/providers/index";
import { getProvider, generateAuthData } from "../../src/lib/oauth/providers";

// The import_token providers expose validateImportToken/mapTokens beyond the base
// OAuth provider shape; narrow to just what these assertions touch.
type ImportTokenProvider = {
  flowType: string;
  validateImportToken: (token: string) => { valid: boolean };
  mapTokens: (t: { accessToken: string }) => {
    accessToken: string;
    refreshToken: string | null;
    expiresIn: number | null;
  };
};
const asImportProvider = (id: string) => getProvider(id) as unknown as ImportTokenProvider;

/**
 * Guards fix for issue #6041:
 * GET /api/oauth/zed/[action] was throwing "Unknown provider: zed" because
 * "zed" was not registered in the PROVIDERS map. The fix registers a minimal
 * import_token entry so that getProvider("zed") returns cleanly and
 * generateAuthData returns { supported: false } instead of a 500.
 */
describe("Zed OAuth provider registration", () => {
  it("PROVIDERS map includes zed", () => {
    assert.ok("zed" in PROVIDERS, "PROVIDERS must include zed");
  });

  it("getProvider('zed') does not throw", () => {
    assert.doesNotThrow(() => getProvider("zed"));
  });

  it("zed provider has flowType import_token", () => {
    const provider = getProvider("zed");
    assert.equal(provider.flowType, "import_token");
  });

  it("generateAuthData returns supported:false for zed", () => {
    const authData = generateAuthData("zed", "http://localhost:8080/callback");
    assert.equal(authData.supported, false);
    assert.equal(authData.authUrl, undefined);
    assert.match(authData.error, /zed/i);
  });

  it("generateAuthData error message mentions the keychain import path", () => {
    const authData = generateAuthData("zed", "http://localhost:8080/callback");
    assert.ok(authData.error.includes("/api/providers/zed/import"));
  });

  it("zed validateImportToken rejects empty tokens", () => {
    const provider = asImportProvider("zed");
    assert.equal(provider.validateImportToken("").valid, false);
    assert.equal(provider.validateImportToken("   ").valid, false);
  });

  it("zed validateImportToken accepts valid tokens", () => {
    const provider = asImportProvider("zed");
    assert.equal(provider.validateImportToken("sk-ant-api03-abc123def456").valid, true);
  });

  it("zed mapTokens returns accessToken and null refresh/expiry", () => {
    const provider = asImportProvider("zed");
    const result = provider.mapTokens({ accessToken: "sk-ant-test" });
    assert.equal(result.accessToken, "sk-ant-test");
    assert.equal(result.refreshToken, null);
    assert.equal(result.expiresIn, null);
  });
});
