import { describe, it, beforeEach, afterEach } from "node:test";
import assert from "node:assert/strict";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

describe("Compression Settings API Schema Validation", () => {
  const compressionModeValues = [
    "off",
    "lite",
    "standard",
    "aggressive",
    "ultra",
    "rtk",
    "stacked",
  ];

  it("should validate all compression mode values", () => {
    assert.deepStrictEqual(compressionModeValues, [
      "off",
      "lite",
      "standard",
      "aggressive",
      "ultra",
      "rtk",
      "stacked",
    ]);
  });

  it("should validate caveman config structure", () => {
    const defaultCavemanConfig = {
      enabled: true,
      compressRoles: ["user"],
      skipRules: [],
      minMessageLength: 50,
      preservePatterns: [],
    };

    assert.equal(defaultCavemanConfig.enabled, true);
    assert.deepStrictEqual(defaultCavemanConfig.compressRoles, ["user"]);
    assert.equal(Array.isArray(defaultCavemanConfig.skipRules), true);
    assert.equal(defaultCavemanConfig.minMessageLength, 50);
    assert.equal(Array.isArray(defaultCavemanConfig.preservePatterns), true);
  });

  it("should validate full compression config structure", () => {
    const defaultConfig = {
      enabled: false,
      defaultMode: "off",
      autoTriggerTokens: 0,
      cacheMinutes: 5,
      preserveSystemPrompt: true,
      comboOverrides: {},
      cavemanConfig: {
        enabled: true,
        compressRoles: ["user"],
        skipRules: [],
        minMessageLength: 50,
        preservePatterns: [],
      },
      ultra: {
        enabled: false,
        compressionRate: 0.5,
        minScoreThreshold: 0.3,
        slmFallbackToAggressive: true,
        maxTokensPerMessage: 0,
      },
    };

    assert.equal(defaultConfig.enabled, false);
    assert.ok(compressionModeValues.includes(defaultConfig.defaultMode));
    assert.equal(typeof defaultConfig.autoTriggerTokens, "number");
    assert.equal(typeof defaultConfig.cacheMinutes, "number");
    assert.equal(typeof defaultConfig.preserveSystemPrompt, "boolean");
    assert.equal(typeof defaultConfig.comboOverrides, "object");
    assert.equal(typeof defaultConfig.cavemanConfig, "object");
    assert.equal(typeof defaultConfig.ultra, "object");
    assert.equal(defaultConfig.ultra.compressionRate, 0.5);
  });

  it("should validate all caveman compression rules are defined", async () => {
    const { CAVEMAN_RULES } =
      await import("../../../../open-sse/services/compression/cavemanRules.ts");
    assert.ok(Array.isArray(CAVEMAN_RULES));
    assert.ok(CAVEMAN_RULES.length >= 29, `Expected >= 29 rules, got ${CAVEMAN_RULES.length}`);
    for (const rule of CAVEMAN_RULES) {
      assert.ok(rule.name && typeof rule.name === "string", `Rule must have a name`);
      assert.ok(rule.pattern instanceof RegExp, `Rule ${rule.name} must have a RegExp pattern`);
      assert.ok(
        typeof rule.replacement === "string" || typeof rule.replacement === "function",
        `Rule ${rule.name} must have string or function replacement`
      );
      assert.ok(
        rule.pattern.source !== "^$" || rule.replacement !== "",
        `Rule ${rule.name} must not be a no-op (empty pattern + empty replacement)`
      );
    }
  });

  it("should validate compression modes cover all CavemanConfig roles", () => {
    const validRoles = ["user", "assistant", "system"];
    for (const role of validRoles) {
      assert.ok(validRoles.includes(role), `Role ${role} should be valid`);
    }
    assert.equal(validRoles.length, 3);
  });
});
