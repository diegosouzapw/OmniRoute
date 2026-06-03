import { describe, it } from "node:test";
import assert from "node:assert/strict";

const mod = await import("../../open-sse/services/systemTransforms.ts");

describe("systemTransforms", () => {
  describe("config management", () => {
    it("getSystemTransformsConfig returns default config", () => {
      mod.resetSystemTransformsConfig();
      const config = mod.getSystemTransformsConfig();
      assert.equal(typeof config, "object");
      assert.notEqual(config, null);
      assert.equal(typeof config.providers, "object");
    });

    it("setSystemTransformsConfig updates config", () => {
      mod.resetSystemTransformsConfig();
      const before = mod.getSystemTransformsConfig();
      mod.setSystemTransformsConfig({ providers: { testProvider: { enabled: true, pipeline: [] } } });
      const after = mod.getSystemTransformsConfig();
      assert.notEqual(after.providers.testProvider, undefined);
      mod.resetSystemTransformsConfig();
    });

    it("resetSystemTransformsConfig restores defaults", () => {
      mod.setSystemTransformsConfig({ providers: { temp: { enabled: true, pipeline: [] } } });
      mod.resetSystemTransformsConfig();
      const config = mod.getSystemTransformsConfig();
      assert.equal(config.providers.temp, undefined);
    });
  });

  describe("applyTransformPipeline", () => {
    it("returns body unchanged for empty pipeline", () => {
      const body = { messages: [{ role: "user", content: "test" }] };
      const result = mod.applyTransformPipeline(body, []);
      assert.equal(result.body, body);
      assert.equal(result.appliedOpKinds.length, 0);
    });

    it("returns body unchanged for null body", () => {
      const result = mod.applyTransformPipeline(null as any, []);
      assert.equal(result.appliedOpKinds.length, 0);
    });

    it("returns body unchanged for non-array pipeline", () => {
      const body = { messages: [] };
      const result = mod.applyTransformPipeline(body, null as any);
      assert.equal(result.appliedOpKinds.length, 0);
    });
  });

  describe("applySystemTransformPipeline", () => {
    it("returns unchanged for unconfigured provider", () => {
      mod.resetSystemTransformsConfig();
      const body = { messages: [{ role: "user", content: "test" }] };
      const result = mod.applySystemTransformPipeline("nonexistent-provider", body);
      assert.equal(result.appliedOpKinds.length, 0);
    });

    it("returns unchanged for null body", () => {
      const result = mod.applySystemTransformPipeline("claude", null as any);
      assert.equal(result.appliedOpKinds.length, 0);
    });
  });

  describe("constants", () => {
    it("DEFAULT_OBFUSCATE_WORDS is array", () => {
      assert.ok(Array.isArray(mod.DEFAULT_OBFUSCATE_WORDS));
      assert.ok(mod.DEFAULT_OBFUSCATE_WORDS.length > 0);
    });

    it("PROVIDER_CLAUDE is claude", () => {
      assert.equal(mod.PROVIDER_CLAUDE, "claude");
    });

    it("PROVIDER_CC_BRIDGE is anthropic-compatible-cc", () => {
      assert.equal(mod.PROVIDER_CC_BRIDGE, "anthropic-compatible-cc");
    });

    it("DEFAULT_CLAUDE_PIPELINE is non-empty array", () => {
      assert.ok(Array.isArray(mod.DEFAULT_CLAUDE_PIPELINE));
      assert.ok(mod.DEFAULT_CLAUDE_PIPELINE.length > 0);
    });

    it("DEFAULT_SYSTEM_TRANSFORMS_CONFIG has providers", () => {
      assert.ok(typeof mod.DEFAULT_SYSTEM_TRANSFORMS_CONFIG.providers === "object");
    });
  });
});
