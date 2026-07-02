import test from "node:test";
import assert from "node:assert/strict";

// Regression guard for #4184.
//
// The theoldllm provider (free OpenAI-compatible upstream) listed its models
// with NO contextLength, so getResolvedModelCapabilities resolved their context
// window to `null` and the dashboard/catalog reported no usable window. #4184
// adds an entry-level `defaultContextLength` plus per-model `contextLength`
// overrides reflecting each upstream model's real window. This test asserts both
// the registry data (source of truth) and the resolved context window for the
// models that carry an explicit override — the latter would resolve to `null`
// on the pre-#4184 registry, so it fails without the fix.
const { getRegistryEntry } = await import("../../open-sse/config/providerRegistry.ts");
const { getResolvedModelCapabilities } = await import("../../src/lib/modelCapabilities.ts");

function model(id: string) {
  const entry = getRegistryEntry("theoldllm");
  assert.ok(entry, "theoldllm registry entry must exist");
  return (entry.models ?? []).find((m) => m.id === id);
}

test("#4184 theoldllm entry declares a 200000 defaultContextLength", () => {
  const entry = getRegistryEntry("theoldllm");
  assert.ok(entry, "theoldllm registry entry must exist");
  assert.equal(entry.defaultContextLength, 200000);
});

test("#4184 per-model contextLength overrides match each upstream window", () => {
  assert.equal(model("GPT_5_4")?.contextLength, 400000, "GPT-5.4 window is 400K");
  assert.equal(model("gemini_3_flash")?.contextLength, 1000000, "Gemini 3 Flash window is 1M");
  assert.equal(model("gemini_3_pro")?.contextLength, 1000000, "Gemini 3 Pro window is 1M");
  for (const id of ["claude_opus_4", "claude_sonnet_4", "claude_haiku_3_5", "deepseek_v4"]) {
    assert.equal(model(id)?.contextLength, 200000, `${id} window is 200K`);
  }
});

test("#4184 GPT_4o carries no explicit contextLength (relies on defaultContextLength)", () => {
  // Intentionally left to the entry default — documents the fallback contract so a
  // later edit that removes defaultContextLength is caught by the assertion above.
  assert.equal(model("GPT_4o")?.contextLength, undefined);
});

test("#4184 resolved context window reflects the override (null before the fix)", () => {
  assert.equal(
    getResolvedModelCapabilities({ provider: "theoldllm", model: "GPT_5_4" }).contextWindow,
    400000
  );
  assert.equal(
    getResolvedModelCapabilities({ provider: "theoldllm", model: "gemini_3_pro" }).contextWindow,
    1000000
  );
  assert.equal(
    getResolvedModelCapabilities({ provider: "theoldllm", model: "claude_opus_4" }).contextWindow,
    200000
  );
});
