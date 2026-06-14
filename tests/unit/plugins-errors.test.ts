import { describe, it } from "node:test";
import assert from "node:assert";
import { PluginError, PluginErrorCode, isPluginError } from "../../src/lib/plugins/errors.ts";

describe("PluginError", () => {
  it("has correct code and message", () => {
    const err = new PluginError(PluginErrorCode.PLUGIN_NOT_FOUND, "not found");
    assert.strictEqual(err.code, "PLUGIN_NOT_FOUND");
    assert.strictEqual(err.message, "not found");
    assert.strictEqual(err.name, "PluginError");
  });

  it("stores details", () => {
    const err = new PluginError(PluginErrorCode.INSTALL_FAILED, "fail", { reason: "bad" });
    assert.deepStrictEqual(err.details, { reason: "bad" });
  });

  it("isPluginError returns true for PluginError", () => {
    const err = new PluginError(PluginErrorCode.RATE_LIMITED, "rate limited");
    assert.strictEqual(isPluginError(err), true);
  });

  it("isPluginError returns false for plain Error", () => {
    assert.strictEqual(isPluginError(new Error("plain")), false);
  });

  it("isPluginError returns false for non-error", () => {
    assert.strictEqual(isPluginError("string"), false);
  });

  it("all 14 error codes exist", () => {
    const codes = Object.values(PluginErrorCode);
    assert.strictEqual(codes.length, 14);
    assert.ok(codes.includes(PluginErrorCode.PLUGIN_NOT_FOUND));
    assert.ok(codes.includes(PluginErrorCode.ALREADY_INSTALLED));
    assert.ok(codes.includes(PluginErrorCode.DEPENDENCY_MISSING));
    assert.ok(codes.includes(PluginErrorCode.DEPENDENT_EXISTS));
    assert.ok(codes.includes(PluginErrorCode.RATE_LIMITED));
  });
});
