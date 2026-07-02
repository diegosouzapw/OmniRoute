import test from "node:test";
import assert from "node:assert/strict";

// Kimi K2.7 Code (released 2026-06-12) is Moonshot's coding-focused successor to
// K2.6: 1T MoE, 256K context, thinking-only (preserve_thinking forced), with a
// fixed sampling regime (temperature=1.0 / top_p=0.95). It must be advertised on
// both the OAuth coding endpoint (api.kimi.com/coding, Anthropic format — the
// path validated live on the test VPS) and the OpenAI endpoint
// (api.moonshot.ai/v1). Two ids: `kimi-k2.7-code` and `kimi-k2.7-code-highspeed`.
const { getRegistryEntry, getUnsupportedParams } = await import(
  "../../open-sse/config/providerRegistry.ts"
);
const { getResolvedModelCapabilities, supportsReasoning } = await import(
  "../../src/lib/modelCapabilities.ts"
);

const K27 = "kimi-k2.7-code";
const K27_HS = "kimi-k2.7-code-highspeed";

function modelIds(provider: string): string[] {
  const entry = getRegistryEntry(provider);
  assert.ok(entry, `${provider} registry entry must exist`);
  return (entry.models ?? []).map((m) => m.id);
}

test("kimi-coding (OAuth) advertises kimi-k2.7-code + highspeed", () => {
  const ids = modelIds("kimi-coding");
  assert.ok(ids.includes(K27), "kimi-coding must list kimi-k2.7-code");
  assert.ok(ids.includes(K27_HS), "kimi-coding must list kimi-k2.7-code-highspeed");
  assert.ok(ids.includes("kimi-k2.6"), "existing kimi-k2.6 stays listed");
});

test("kimi-coding-apikey advertises kimi-k2.7-code (shares KIMI_CODING_SHARED)", () => {
  const ids = modelIds("kimi-coding-apikey");
  assert.ok(ids.includes(K27), "kimi-coding-apikey must list kimi-k2.7-code");
  assert.ok(ids.includes(K27_HS), "kimi-coding-apikey must list kimi-k2.7-code-highspeed");
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

test("kimi-k2.7-code reports native 262144 context and is reasoning-capable", () => {
  const caps = getResolvedModelCapabilities({ provider: "kimi-coding", model: K27 });
  assert.equal(caps.contextWindow, 262144, "context window must be the native 256K (262144)");
  // thinking-only model: the thinking budget pipeline must not strip its thinking
  // config (applyThinkingBudget early-exits via supportsReasoning(model)).
  assert.equal(supportsReasoning(K27), true, "kimi-k2.7-code must be reasoning-capable");
});

test("kimi-k2.7-code strips client temperature/top_p (fixed sampling upstream)", () => {
  for (const provider of ["kimi-coding", "kimi-coding-apikey", "moonshot", "kimi"]) {
    const unsupported = getUnsupportedParams(provider, K27);
    assert.ok(unsupported.includes("temperature"), `${provider}: temperature must be stripped`);
    assert.ok(unsupported.includes("top_p"), `${provider}: top_p must be stripped`);
  }
});
