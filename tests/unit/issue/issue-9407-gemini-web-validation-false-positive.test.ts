import { describe, it } from "node:test";
import assert from "node:assert/strict";

/**
 * #9407 — gemini-web connection test false-positives
 *
 * Validates:
 * 1. validateGeminiWebProvider detects ServiceLogin redirect (expired session)
 * 2. GeminiWebExecutor has testConnection() for cookie format validation
 * 3. Queue timeout is reasonable for browser automation lifecycle
 */

describe("validateGeminiWebProvider — ServiceLogin detection (#9407)", () => {
  it("source references ServiceLogin and returns valid:false for expired sessions", async () => {
    const { validateGeminiWebProvider } = await import(
      "@/lib/providers/validation/webProvidersB"
    );
    const fnStr = validateGeminiWebProvider.toString();
    // Regex literal in source: /accounts\.google\.com\/
    assert.ok(
      fnStr.includes("ServiceLogin"),
      "Must detect ServiceLogin specifically"
    );
    assert.ok(
      fnStr.includes('valid:false'),
      "ServiceLogin redirect must be classified as invalid"
    );
    assert.ok(
      fnStr.includes('valid:true') && fnStr.includes('warning'),
      "Ambiguous redirect must have valid:true with warning"
    );
  });

  it("returns valid:false for missing cookie (early return, no network call)", async () => {
    const { validateGeminiWebProvider } = await import(
      "@/lib/providers/validation/webProvidersB"
    );
    const result = await validateGeminiWebProvider({ apiKey: "" });
    assert.equal(result.valid, false);
    assert.ok(result.error?.includes("Paste your __Secure-1PSID"));
  });
});

describe("GeminiWebExecutor — testConnection", () => {
  it("has a testConnection method", async () => {
    const { GeminiWebExecutor } = await import(
      "@omniroute/open-sse/executors/gemini-web.ts"
    );
    const executor = new GeminiWebExecutor();
    assert.equal(typeof executor.testConnection, "function");
  });

  it("returns false for empty credentials", async () => {
    const { GeminiWebExecutor } = await import(
      "@omniroute/open-sse/executors/gemini-web.ts"
    );
    assert.equal(await new GeminiWebExecutor().testConnection({}), false);
  });

  it("returns false for missing apiKey", async () => {
    const { GeminiWebExecutor } = await import(
      "@omniroute/open-sse/executors/gemini-web.ts"
    );
    assert.equal(
      await new GeminiWebExecutor().testConnection({ apiKey: "" }),
      false
    );
  });

  it("returns false for empty cookie value", async () => {
    const { GeminiWebExecutor } = await import(
      "@omniroute/open-sse/executors/gemini-web.ts"
    );
    assert.equal(
      await new GeminiWebExecutor().testConnection({
        apiKey: "__Secure-1PSID=",
      }),
      false
    );
  });

  it("returns true for well-formed cookie", async () => {
    const { GeminiWebExecutor } = await import(
      "@omniroute/open-sse/executors/gemini-web.ts"
    );
    assert.equal(
      await new GeminiWebExecutor().testConnection({
        apiKey: "__Secure-1PSID=abc123.def456.ghi789",
      }),
      true
    );
  });

  it("accepts bare cookie value (without prefix)", async () => {
    const { GeminiWebExecutor } = await import(
      "@omniroute/open-sse/executors/gemini-web.ts"
    );
    assert.equal(
      await new GeminiWebExecutor().testConnection({
        apiKey: "abc123.def456.ghi789",
      }),
      true
    );
  });

  it("handles providerSpecificData.cookie", async () => {
    const { GeminiWebExecutor } = await import(
      "@omniroute/open-sse/executors/gemini-web.ts"
    );
    assert.equal(
      await new GeminiWebExecutor().testConnection({
        providerSpecificData: { cookie: "__Secure-1PSID=xyz.789" },
      }),
      true
    );
  });
});

describe("gemini-web queue timeout", () => {
  it("default queueTimeoutMs is at least 30s", async () => {
    const { getDefaultComboConfig } = await import(
      "@omniroute/open-sse/services/comboConfig.ts"
    );
    const config = getDefaultComboConfig();
    assert.ok(
      config.queueTimeoutMs >= 30000,
      `queueTimeoutMs should be at least 30s (got ${config.queueTimeoutMs}ms)`
    );
  });
});
