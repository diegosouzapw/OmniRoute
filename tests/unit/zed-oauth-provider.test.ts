import { describe, expect, it } from "vitest";
import { PROVIDERS } from "../../src/lib/oauth/providers/index";
import { getProvider, generateAuthData } from "../../src/lib/oauth/providers";

/**
 * Guards fix for issue #6041:
 * GET /api/oauth/zed/[action] was throwing "Unknown provider: zed" because
 * "zed" was not registered in the PROVIDERS map. The fix registers a minimal
 * import_token entry so that getProvider("zed") returns cleanly and
 * generateAuthData returns { supported: false } instead of a 500.
 */
describe("Zed OAuth provider registration", () => {
  it("PROVIDERS map includes zed", () => {
    expect(PROVIDERS).toHaveProperty("zed");
  });

  it("getProvider('zed') does not throw", () => {
    expect(() => getProvider("zed")).not.toThrow();
  });

  it("zed provider has flowType import_token", () => {
    const provider = getProvider("zed");
    expect(provider.flowType).toBe("import_token");
  });

  it("generateAuthData returns supported:false for zed", () => {
    const authData = generateAuthData("zed", "http://localhost:8080/callback");
    expect(authData.supported).toBe(false);
    expect(authData.authUrl).toBeUndefined();
    expect(authData.error).toMatch(/zed/i);
  });

  it("generateAuthData error message mentions the keychain import path", () => {
    const authData = generateAuthData("zed", "http://localhost:8080/callback");
    expect(authData.error).toContain("/api/providers/zed/import");
  });

  it("zed validateImportToken rejects empty tokens", () => {
    const provider = getProvider("zed") as any;
    expect(provider.validateImportToken("").valid).toBe(false);
    expect(provider.validateImportToken("   ").valid).toBe(false);
  });

  it("zed validateImportToken accepts valid tokens", () => {
    const provider = getProvider("zed") as any;
    expect(provider.validateImportToken("sk-ant-api03-abc123def456").valid).toBe(true);
  });

  it("zed mapTokens returns accessToken and null refresh/expiry", () => {
    const provider = getProvider("zed") as any;
    const result = provider.mapTokens({ accessToken: "sk-ant-test" });
    expect(result.accessToken).toBe("sk-ant-test");
    expect(result.refreshToken).toBeNull();
    expect(result.expiresIn).toBeNull();
  });
});
