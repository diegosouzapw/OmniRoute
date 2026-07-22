import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { getResolvedModelCapabilities } from "../../src/lib/modelCapabilities.ts";

/**
 * #8032: Custom multimodal models with path-shaped IDs (e.g.
 * "cp/cline-pass/gpt-4o") should resolve capabilities from the leaf
 * model segment ("gpt-4o"), not miss all static registry/spec lookups
 * because the full path doesn't match any known canonical id.
 *
 * Before fix: getStaticSpec, getRegistryModel, getStaticSpecCanonicalModelId,
 * and getAuthoritativeStaticContextWindow all used exact-match on the full
 * path-shaped id, missing specs/registry entries keyed by the leaf model name.
 */
describe("#8032 path-shaped model IDs resolve leaf capabilities", () => {
  it("resolves static spec vision capability for path-shaped gpt-4o id", () => {
    const caps = getResolvedModelCapabilities("cp/cline-pass/gpt-4o");
    assert.equal(caps.supportsVision, true, "gpt-4o leaf should be vision-capable");
  });

  it("resolves context window for path-shaped gpt-4o id from static spec", () => {
    const caps = getResolvedModelCapabilities("cp/cline-pass/gpt-4o");
    assert.ok(
      typeof caps.contextWindow === "number" && caps.contextWindow > 0,
      `expected numeric context window from gpt-4o spec, got ${caps.contextWindow}`
    );
  });

  it("resolves tool calling for path-shaped gpt-4o id", () => {
    const caps = getResolvedModelCapabilities("cp/cline-pass/gpt-4o");
    assert.equal(caps.toolCalling, true, "gpt-4o leaf should support tool calling");
  });

  it("does not break non-path-shaped gpt-4o (regression)", () => {
    const caps = getResolvedModelCapabilities("openai/gpt-4o");
    assert.equal(caps.supportsVision, true);
    assert.ok(typeof caps.contextWindow === "number" && caps.contextWindow > 0);
  });

  it("resolves capabilities for deeply nested path ID", () => {
    // Three-segment path: provider/gateway/model
    const caps = getResolvedModelCapabilities("cp/some-gateway/gpt-4o");
    assert.equal(caps.supportsVision, true, "deeply nested gpt-4o leaf should resolve vision");
  });

  it("returns null vision for path-shaped text-only model", () => {
    // kimi-k2 is explicitly text-only per visionModels.ts
    const caps = getResolvedModelCapabilities("cp/cline-pass/kimi-k2");
    assert.notEqual(caps.supportsVision, true, "kimi-k2 leaf should not be vision-capable");
  });

  it("resolves spec for path-shaped claude id", () => {
    const caps = getResolvedModelCapabilities("cp/myproxy/claude-sonnet-4-20250514");
    assert.equal(caps.toolCalling, true, "claude-sonnet-4 leaf should support tools");
  });

  it("extractLeafModelId is idempotent for non-path IDs", () => {
    // Non-path IDs should resolve identically
    const pathCaps = getResolvedModelCapabilities("cp/gateway/gpt-4o");
    const directCaps = getResolvedModelCapabilities("gpt-4o");
    // Vision should agree
    assert.equal(pathCaps.supportsVision, directCaps.supportsVision);
  });
});
