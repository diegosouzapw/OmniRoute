import { describe, it } from "node:test";
import assert from "node:assert";
import { validatePluginConfig, type ConfigField } from "../../src/lib/plugins/manifest.ts";

describe("validatePluginConfig", () => {
  const schema: Record<string, ConfigField> = {
    name: { type: "string", default: "test" },
    count: { type: "number", default: 10, min: 1, max: 100 },
    enabled: { type: "boolean", default: true },
    mode: { type: "select", enum: ["fast", "slow"], default: "fast" },
  };

  it("valid config passes", () => {
    const result = validatePluginConfig({ name: "hello", count: 5, enabled: true, mode: "fast" }, schema);
    assert.deepStrictEqual(result, { valid: true });
  });

  it("unknown key rejected", () => {
    const result = validatePluginConfig({ unknownKey: "value" }, schema);
    assert.strictEqual(result.valid, false);
    if (!result.valid) {
      assert.ok(result.errors[0].includes("Unknown config key"));
      assert.ok(result.errors[0].includes("unknownKey"));
    }
  });

  it("wrong type rejected", () => {
    const result = validatePluginConfig({ name: 123 }, schema);
    assert.strictEqual(result.valid, false);
    if (!result.valid) {
      assert.ok(result.errors[0].includes("must be a string"));
    }
  });

  it("number min/max enforced", () => {
    const result = validatePluginConfig({ count: 200 }, schema);
    assert.strictEqual(result.valid, false);
    if (!result.valid) {
      assert.ok(result.errors[0].includes("must be <= 100"));
    }
  });

  it("number min enforced", () => {
    const result = validatePluginConfig({ count: 0 }, schema);
    assert.strictEqual(result.valid, false);
    if (!result.valid) {
      assert.ok(result.errors[0].includes("must be >= 1"));
    }
  });

  it("select enum enforced", () => {
    const result = validatePluginConfig({ mode: "turbo" }, schema);
    assert.strictEqual(result.valid, false);
    if (!result.valid) {
      assert.ok(result.errors[0].includes("must be one of"));
    }
  });

  it("empty config passes", () => {
    const result = validatePluginConfig({}, schema);
    assert.deepStrictEqual(result, { valid: true });
  });

  it("empty schema allows anything", () => {
    const result = validatePluginConfig({ whatever: "value", count: 999 }, {});
    assert.deepStrictEqual(result, { valid: true });
  });

  it("partial config validates only provided fields", () => {
    const result = validatePluginConfig({ name: "partial" }, schema);
    assert.deepStrictEqual(result, { valid: true });
  });

  it("boolean type rejected for non-boolean", () => {
    const result = validatePluginConfig({ enabled: "yes" }, schema);
    assert.strictEqual(result.valid, false);
    if (!result.valid) {
      assert.ok(result.errors[0].includes("must be a boolean"));
    }
  });
});
