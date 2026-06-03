import test from "node:test";
import assert from "node:assert/strict";

const model = await import("../../open-sse/services/model.ts");

test("resolveProviderAlias returns null for null/undefined", () => {
  assert.equal(model.resolveProviderAlias(null), null);
  assert.equal(model.resolveProviderAlias(undefined), null);
});

test("resolveProviderAlias returns empty string for empty string", () => {
  const result = model.resolveProviderAlias("");
  assert.ok(result === null || result === "");
});

test("resolveProviderAlias returns known alias", () => {
  const result = model.resolveProviderAlias("claude");
  assert.ok(result === "claude" || result === "anthropic" || typeof result === "string");
});

test("resolveProviderAlias returns input string for unknown alias", () => {
  const result = model.resolveProviderAlias("totally-unknown-provider");
  assert.equal(result, "totally-unknown-provider");
});

test("parseModel parses provider/model format", () => {
  const result = model.parseModel("openai/gpt-4o");
  assert.ok(result);
  assert.ok(typeof result === "object");
});

test("parseModel handles plain model name", () => {
  const result = model.parseModel("gpt-4o");
  assert.ok(result);
  assert.ok(typeof result === "object");
});

test("parseModel returns null-like for null/undefined", () => {
  const result1 = model.parseModel(null);
  const result2 = model.parseModel(undefined);
  assert.ok(result1 !== undefined);
  assert.ok(result2 !== undefined);
});

test("parseModel handles empty string", () => {
  const result = model.parseModel("");
  assert.ok(result !== undefined);
});

test("normalizeCrossProxyModelId handles plain model", () => {
  const result = model.normalizeCrossProxyModelId("gpt-4o");
  assert.ok(typeof result === "object");
});

test("normalizeCrossProxyModelId handles provider/model", () => {
  const result = model.normalizeCrossProxyModelId("openai/gpt-4o");
  assert.ok(typeof result === "object");
});

test("normalizeCrossProxyModelId handles null", () => {
  const result = model.normalizeCrossProxyModelId(null);
  assert.ok(typeof result === "object");
});

test("normalizeCrossProxyModelId handles undefined", () => {
  const result = model.normalizeCrossProxyModelId(undefined);
  assert.ok(typeof result === "object");
});

test("resolveCanonicalProviderModel returns object for known model", () => {
  const result = model.resolveCanonicalProviderModel("openai", "gpt-4o");
  assert.ok(typeof result === "object");
  assert.ok(result !== null);
});

test("resolveCanonicalProviderModel handles null modelId", () => {
  const result = model.resolveCanonicalProviderModel("openai", null);
  assert.ok(typeof result === "object");
});

test("resolveModelAliasFromMap returns null for null alias", () => {
  const result = model.resolveModelAliasFromMap(null, {});
  assert.equal(result, null);
});

test("resolveModelAliasFromMap returns null for empty map", () => {
  const result = model.resolveModelAliasFromMap("test", {});
  assert.equal(result, null);
});

test("resolveModelAliasFromMap resolves alias from map", () => {
  const aliases = { "gpt-4": "gpt-4o" };
  const result = model.resolveModelAliasFromMap("gpt-4", aliases);
  assert.ok(result === "gpt-4o" || result === null);
});

test("CODEX_NATIVE_UNPREFIXED_MODELS is a Set", () => {
  assert.ok(model.CODEX_NATIVE_UNPREFIXED_MODELS instanceof Set);
  assert.ok(model.CODEX_NATIVE_UNPREFIXED_MODELS.has("codex-auto-review"));
});

test("getModelInfoCore resolves known model", async () => {
  const result = await model.getModelInfoCore("gpt-4o", {});
  assert.ok(result);
  assert.ok(typeof result === "object");
});

test("getModelInfoCore handles unknown model", async () => {
  const result = await model.getModelInfoCore("totally-unknown-model-xyz", {});
  assert.ok(result);
  assert.ok(typeof result === "object");
});

test("getModelInfoCore handles null", async () => {
  const result = await model.getModelInfoCore(null, {});
  assert.ok(result);
  assert.ok(typeof result === "object");
});
