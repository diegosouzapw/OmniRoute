import test from "node:test";
import assert from "node:assert/strict";

// Kimi Coding now advertises Kimi K2.8 Preview on its stable wire ids. The
// provider catalog is authoritative for the OAuth coding endpoint; the shared
// model spec supplies the 1M context and vision/tool/thinking capabilities.
const { getRegistryEntry, getUnsupportedParams } =
  await import("../../open-sse/config/providerRegistry.ts");
const { getResolvedModelCapabilities, supportsReasoning } =
  await import("../../src/lib/modelCapabilities.ts");
const { getModelSpec } = await import("../../src/shared/constants/modelSpecs.ts");

const K27 = "kimi-k2.7-code";
const K28 = "kimi-for-coding";
const K28_HS = "kimi-for-coding-highspeed";
const K27_HS = "kimi-k2.7-code-highspeed";

function modelIds(provider: string): string[] {
  const entry = getRegistryEntry(provider);
  assert.ok(entry, `${provider} registry entry must exist`);
  return (entry.models ?? []).map((m) => m.id);
}

test("kimi-coding (OAuth) keeps the current stable offline aliases", () => {
  const ids = modelIds("kimi-coding");
  assert.deepEqual(ids, ["k3", "kimi-for-coding", "kimi-for-coding-highspeed"]);
});

test("legacy kimi-coding-apikey shares the current stable offline aliases", () => {
  const ids = modelIds("kimi-coding-apikey");
  assert.deepEqual(ids, ["k3", "kimi-for-coding", "kimi-for-coding-highspeed"]);
});

test("Kimi Code k3 fallback advertises the documented 1M context and thinking", () => {
  const caps = getResolvedModelCapabilities({ provider: "kimi-coding", model: "k3" });
  assert.equal(caps.contextWindow, 1048576);
  assert.equal(caps.supportsThinking, true);
});

test("Kimi Code k3 fallback leaves discovered capabilities unset", () => {
  const k3 = getRegistryEntry("kimi-coding")?.models?.find((model) => model.id === "k3");
  assert.ok(k3);
  assert.equal(k3.maxOutputTokens, undefined);
  assert.equal(k3.supportsVision, undefined);
  assert.equal(k3.toolCalling, undefined);
  assert.equal(k3.interleavedField, undefined);
  assert.equal(k3.unsupportedParams, undefined);
});

test("Kimi Coding K2.8 Preview resolves vision, tools, thinking, and 1M context", () => {
  const spec = getModelSpec(K28);
  assert.ok(spec);
  assert.equal(spec.contextWindow, 1048576);
  assert.equal(spec.supportsVision, true);
  assert.equal(spec.supportsTools, true);
  assert.equal(spec.supportsThinking, true);
});

test("Kimi Coding K2.8 Preview (highspeed variant) resolves vision, tools, thinking, and 1M context", () => {
  // #14003: the highspeed sibling id must share the same spec as the base
  // `kimi-for-coding` id, otherwise it silently falls back to the default
  // caps (no vision) and the Vision-Bridge reroute bug reappears for it.
  const spec = getModelSpec(K28_HS);
  assert.ok(spec, `${K28_HS} must resolve to a model spec`);
  assert.equal(spec.contextWindow, 1048576);
  assert.equal(spec.supportsVision, true);
  assert.equal(spec.supportsTools, true);
  assert.equal(spec.supportsThinking, true);
});

test("Kimi Coding registry advertises K2.8 Preview", () => {
  const models = getRegistryEntry("kimi-coding")?.models ?? [];
  const model = models.find((entry) => entry.id === K28);
  assert.ok(model);
  assert.equal(model.name, "Kimi K2.8 Preview");
  assert.equal(model.contextLength, 1048576);
  assert.equal(getRegistryEntry("kimi-coding")?.defaultContextLength, 1048576);
});

test("moonshot (OpenAI endpoint) advertises kimi-k2.7-code + highspeed", () => {
  const ids = modelIds("moonshot");
  assert.ok(ids.includes(K27), "moonshot must list kimi-k2.7-code");
  assert.ok(ids.includes(K27_HS), "moonshot must list kimi-k2.7-code-highspeed");
  assert.ok(ids.includes("kimi-k2.6"), "existing kimi-k2.6 stays listed");
});

test("kimi (OpenAI endpoint) advertises kimi-k2.7-code + highspeed", () => {
  const ids = modelIds("kimi");
  assert.ok(ids.includes(K27), "kimi must list kimi-k2.7-code");
  assert.ok(ids.includes(K27_HS), "kimi must list kimi-k2.7-code-highspeed");
});

test("Moonshot kimi-k2.7-code reports native 262144 context and is reasoning-capable", () => {
  const caps = getResolvedModelCapabilities({ provider: "moonshot", model: K27 });
  assert.equal(caps.contextWindow, 262144, "context window must be the native 256K (262144)");
  // thinking-only model: the thinking budget pipeline must not strip its thinking
  // config (applyThinkingBudget early-exits via supportsReasoning(model)).
  assert.equal(supportsReasoning(K27), true, "kimi-k2.7-code must be reasoning-capable");
});

test("kimi-k2.7-code strips client temperature/top_p (fixed sampling upstream)", () => {
  for (const provider of ["moonshot", "kimi"]) {
    const unsupported = getUnsupportedParams(provider, K27);
    assert.ok(unsupported.includes("temperature"), `${provider}: temperature must be stripped`);
    assert.ok(unsupported.includes("top_p"), `${provider}: top_p must be stripped`);
  }
});
