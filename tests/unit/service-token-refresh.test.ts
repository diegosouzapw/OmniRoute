import { describe, it } from "node:test";
import assert from "node:assert/strict";

const mod = await import("../../open-sse/services/tokenRefresh.ts");

describe("tokenRefresh helpers", () => {
  describe("getRefreshLeadMs", () => {
    it("returns explicit lead time for known providers", () => {
      assert.equal(mod.getRefreshLeadMs("codex"), 5 * 60 * 1000);
      assert.equal(mod.getRefreshLeadMs("openai"), 5 * 60 * 1000);
      assert.equal(mod.getRefreshLeadMs("claude"), 5 * 60 * 1000);
      assert.equal(mod.getRefreshLeadMs("iflow"), 24 * 60 * 60 * 1000);
      assert.equal(mod.getRefreshLeadMs("gemini-cli"), 15 * 60 * 1000);
    });

    it("falls back to TOKEN_EXPIRY_BUFFER_MS for unknown providers", () => {
      assert.equal(mod.getRefreshLeadMs("unknown-provider"), mod.TOKEN_EXPIRY_BUFFER_MS);
      assert.equal(mod.getRefreshLeadMs(""), mod.TOKEN_EXPIRY_BUFFER_MS);
    });
  });

  describe("supportsTokenRefresh", () => {
    it("returns true for explicitly supported providers", () => {
      assert.equal(mod.supportsTokenRefresh("gemini"), true);
      assert.equal(mod.supportsTokenRefresh("claude"), true);
      assert.equal(mod.supportsTokenRefresh("codex"), true);
      assert.equal(mod.supportsTokenRefresh("github"), true);
      assert.equal(mod.supportsTokenRefresh("kiro"), true);
      assert.equal(mod.supportsTokenRefresh("cline"), true);
      assert.equal(mod.supportsTokenRefresh("windsurf"), true);
    });

    it("returns false for unknown providers without refreshUrl/tokenUrl", () => {
      assert.equal(mod.supportsTokenRefresh("nonexistent-provider"), false);
    });
  });

  describe("isUnrecoverableRefreshError", () => {
    it("returns true for unrecoverable error types", () => {
      assert.equal(mod.isUnrecoverableRefreshError({ error: "unrecoverable_refresh_error" }), true);
      assert.equal(mod.isUnrecoverableRefreshError({ error: "refresh_token_reused" }), true);
      assert.equal(mod.isUnrecoverableRefreshError({ error: "invalid_request" }), true);
      assert.equal(mod.isUnrecoverableRefreshError({ error: "invalid_grant" }), true);
    });

    it("returns false for recoverable errors", () => {
      assert.equal(mod.isUnrecoverableRefreshError({ error: "rate_limited" }), false);
      assert.equal(mod.isUnrecoverableRefreshError({ error: "server_error" }), false);
    });

    it("returns false for null/undefined/non-object", () => {
      assert.equal(mod.isUnrecoverableRefreshError(null) || false, false);
      assert.equal(mod.isUnrecoverableRefreshError(undefined) || false, false);
      assert.equal(mod.isUnrecoverableRefreshError("string") || false, false);
    });
  });

  describe("isProviderBlocked", () => {
    it("returns false for unknown provider", () => {
      assert.equal(mod.isProviderBlocked("nonexistent"), false);
    });
  });

  describe("diagnostic functions", () => {
    it("getConnectionRefreshMutexStatus returns object", () => {
      const status = mod.getConnectionRefreshMutexStatus();
      assert.equal(typeof status, "object");
      assert.notEqual(status, null);
    });

    it("getCircuitBreakerStatus returns object", () => {
      const status = mod.getCircuitBreakerStatus();
      assert.equal(typeof status, "object");
      assert.notEqual(status, null);
    });
  });

  describe("constants", () => {
    it("TOKEN_EXPIRY_BUFFER_MS is 5 minutes", () => {
      assert.equal(mod.TOKEN_EXPIRY_BUFFER_MS, 300000);
    });

    it("REFRESH_LEAD_MS is a record with expected keys", () => {
      assert.equal(typeof mod.REFRESH_LEAD_MS, "object");
      assert.equal(mod.REFRESH_LEAD_MS.codex, 5 * 60 * 1000);
    });
  });
});
