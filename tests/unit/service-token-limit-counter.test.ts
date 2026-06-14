import { describe, it } from "node:test";
import assert from "node:assert/strict";

const mod = await import("../../open-sse/services/tokenLimitCounter.ts");

describe("tokenLimitCounter", () => {
  describe("cache management", () => {
    it("clearTokenLimitCache does not throw", () => {
      mod.clearTokenLimitCache();
    });

    it("syncCache does not throw", () => {
      mod.syncCache("test-limit-" + Date.now(), new Date().toISOString(), 100);
    });

    it("invalidateLimit does not throw", () => {
      mod.invalidateLimit("test-limit-" + Date.now());
    });
  });

  describe("recordTokenUsage", () => {
    it("does not throw for empty limits", () => {
      mod.recordTokenUsage([], { input: 10, output: 5, reasoning: 0 });
    });
  });
});
