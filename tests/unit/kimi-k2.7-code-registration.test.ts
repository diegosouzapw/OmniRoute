import test from "node:test";
import assert from "node:assert/strict";

// Kimi K2.7 Code (released 2026-06-12) is Moonshot's coding-focused successor to
// K2.6: 1T MoE, 256K context, thinking-only (preserve_thinking forced), with a
// fixed sampling regime (temperature=1.0 / top_p=0.95). It must be advertised on
// the Moonshot OpenAI endpoint (api.moonshot.ai/v1). Kimi Code's coding endpoint
// publishes the public stable ids offline and refreshes account metadata from /coding/v1/models.
const { getRegistryEntry, getUnsupportedParams } =
  await import("../../open-sse/config/providerRegistry.ts");
const { getResolvedModelCapabilities, supportsReasoning } =
  await import("../../src/lib/modelCapabilities.ts");
const { getModelSpec } = await import("../../src/shared/constants/modelSpecs.ts");

const K27 = "kimi-k2.7-code";
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

test("Kimi Code stable ids do not inherit Moonshot API model capabilities", () => {
  assert.equal(getModelSpec("kimi-for-coding"), undefined);
  assert.equal(getModelSpec("kimi-for-coding-highspeed"), undefined);
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
