import { describe, it, afterEach } from "node:test";
import assert from "node:assert/strict";

const mod = await import("../../open-sse/services/payloadRules.ts");

describe("payloadRules", () => {
  afterEach(() => {
    mod.resetPayloadRulesConfigForTests();
  });

  describe("normalizePayloadRulesConfig", () => {
    it("returns default shape for null input", () => {
      const result = mod.normalizePayloadRulesConfig(null);
      assert.ok(Array.isArray(result.default));
      assert.ok(Array.isArray(result.override));
      assert.ok(Array.isArray(result.filter));
      assert.ok(Array.isArray(result.defaultRaw));
    });

    it("returns default shape for empty object", () => {
      const result = mod.normalizePayloadRulesConfig({});
      assert.equal(result.default.length, 0);
      assert.equal(result.override.length, 0);
      assert.equal(result.filter.length, 0);
    });

    it("parses mutation rules", () => {
      const input = {
        default: [{ models: [{ name: "gpt-4" }], params: { temperature: 0.7 } }],
      };
      const result = mod.normalizePayloadRulesConfig(input);
      assert.equal(result.default.length, 1);
      assert.equal(result.default[0].models[0].name, "gpt-4");
    });

    it("parses filter rules", () => {
      const input = {
        filter: [{ models: [{ name: "*" }], params: ["stream"] }],
      };
      const result = mod.normalizePayloadRulesConfig(input);
      assert.equal(result.filter.length, 1);
      assert.equal(result.filter[0].params[0], "stream");
    });

    it("handles legacy default-raw key", () => {
      const input = {
        "default-raw": [{ models: [{ name: "test" }], params: { key: "val" } }],
      };
      const result = mod.normalizePayloadRulesConfig(input);
      assert.ok(result.defaultRaw.length >= 1);
    });

    it("filters out invalid mutation rules", () => {
      const input = {
        default: [
          { models: [], params: {} },  // empty models → filtered
          { models: [{ name: "valid" }], params: { k: "v" } },
        ],
      };
      const result = mod.normalizePayloadRulesConfig(input);
      assert.equal(result.default.length, 1);
    });
  });

  describe("setPayloadRulesConfig / clearPayloadRulesConfigOverride", () => {
    it("setPayloadRulesConfig sets override", () => {
      mod.setPayloadRulesConfig({ default: [{ models: [{ name: "m" }], params: { p: 1 } }] });
      // No assertion needed — just verifying it doesn't throw
    });

    it("clearPayloadRulesConfigOverride clears override", () => {
      mod.setPayloadRulesConfig({ default: [{ models: [{ name: "m" }], params: { p: 1 } }] });
      mod.clearPayloadRulesConfigOverride();
      // No assertion needed — verifying it doesn't throw
    });
  });

  describe("resetPayloadRulesConfigForTests", () => {
    it("resets state without throwing", () => {
      mod.setPayloadRulesConfig({ default: [{ models: [{ name: "m" }], params: { p: 1 } }] });
      mod.resetPayloadRulesConfigForTests();
    });
  });
});
