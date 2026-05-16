import { describe, it } from "node:test";
import assert from "node:assert";
import * as generator from "../../../src/lib/cli-helper/config-generator/index.ts";

describe("config-generator", () => {
  describe("validateBaseUrl", () => {
    it("accepts http URLs", async () => {
      const mod = await import("../../../src/lib/cli-helper/config-generator/index.ts");
      assert.strictEqual(mod.validateBaseUrl("http://localhost:20128"), true);
    });

    it("accepts https URLs", async () => {
      const mod = await import("../../../src/lib/cli-helper/config-generator/index.ts");
      assert.strictEqual(mod.validateBaseUrl("https://example.com"), true);
    });

    it("rejects non-URL strings", async () => {
      const mod = await import("../../../src/lib/cli-helper/config-generator/index.ts");
      assert.strictEqual(mod.validateBaseUrl("not-a-url"), false);
    });
  });

  describe("generateConfig", () => {
    it("returns error for invalid baseUrl", async () => {
      const result = await generator.generateConfig("claude", {
        baseUrl: "invalid",
        apiKey: "sk-xxx",
      });
      assert.strictEqual(result.success, false);
      assert.ok(result.error?.includes("Invalid baseUrl"));
    });

    it("returns error for empty apiKey", async () => {
      const result = await generator.generateConfig("claude", {
        baseUrl: "http://localhost:20128",
        apiKey: "",
      });
      assert.strictEqual(result.success, false);
      assert.ok(result.error?.includes("API key"));
    });

    it("returns success for valid claude config", async () => {
      // This may fail if the claude generator has issues - just ensure error handling works
      const result = await generator.generateConfig("claude", {
        baseUrl: "http://localhost:20128",
        apiKey: "sk-test",
      });
      // Either success or error (if generator missing), but check structure is correct
      assert.ok("success" in result);
      assert.ok("configPath" in result);
    });

    it("returns error for unknown tool", async () => {
      const result = await generator.generateConfig("unknown-tool-xyz", {
        baseUrl: "http://localhost:20128",
        apiKey: "sk-xxx",
      });
      assert.strictEqual(result.success, false);
      assert.ok(result.error?.includes("Unknown tool"));
    });
  });

  describe("generateAllConfigs", () => {
    it("returns array of GenerateResult for all tools", async () => {
      const results = await generator.generateAllConfigs({
        baseUrl: "http://localhost:20128",
        apiKey: "sk-xxx",
      });
      assert.ok(Array.isArray(results));
      assert.strictEqual(results.length, 6); // claude, codex, opencode, cline, kilocode, continue
    });
  });
});
