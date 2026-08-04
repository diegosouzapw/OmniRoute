import test from "node:test";
import assert from "node:assert/strict";

// Regression guard for the `zai` provider catalog (Anthropic-direct transport).
//
// GLM-5.2 shipped in v3.8.26 across the glm/glm-cn/glmt providers (via
// GLM_SHARED_MODELS) but the curated `zai` provider subset was not updated and
// still advertised only the GLM-5 line. This test pins the refreshed catalog and,
// crucially, documents WHY the effort-tier aliases must NOT appear here.
//
// The `zai` provider uses the DefaultExecutor, which sends the requested model ID
// verbatim. The effort tiers `glm-5.2-high` / `glm-5.2-max` are OmniRoute aliases
// that only the GlmExecutor knows how to resolve (parseGlm52Effort → base model
// "glm-5.2" + `effort` field + effort-2025-11-24 beta header). Listing them under
// `zai` would send unknown model IDs to z.ai's Anthropic endpoint, so they belong
// to the `glm` provider only.

const { getRegistryEntry } = await import("../../open-sse/config/providerRegistry.ts");

function modelIds(provider: string): string[] {
  const entry = getRegistryEntry(provider);
  assert.ok(entry, `provider "${provider}" should be registered`);
  return (entry.models ?? []).map((m) => m.id);
}

test("zai provider advertises GLM-5.2 and GLM-4.7 base models", () => {
  const ids = modelIds("zai");
  for (const expected of ["glm-5.2", "glm-4.7", "glm-4.7-flash"]) {
    assert.ok(ids.includes(expected), `zai should advertise ${expected}; got ${ids.join(", ")}`);
  }
});

test("zai provider keeps the existing GLM-5 line", () => {
  const ids = modelIds("zai");
  for (const kept of ["glm-5.1", "glm-5", "glm-5-turbo"]) {
    assert.ok(ids.includes(kept), `zai should still advertise ${kept}`);
  }
});

test("zai provider does NOT advertise effort-tier aliases (DefaultExecutor cannot resolve them)", () => {
  const ids = modelIds("zai");
  for (const alias of ["glm-5.2-high", "glm-5.2-max"]) {
    assert.ok(
      !ids.includes(alias),
      `zai must not list ${alias}: it is a GlmExecutor-only alias and would reach z.ai as an unknown model ID`
    );
  }
});

test("effort-tier aliases remain on the glm provider, where GlmExecutor resolves them", () => {
  const ids = modelIds("glm");
  for (const alias of ["glm-5.2", "glm-5.2-high", "glm-5.2-max"]) {
    assert.ok(ids.includes(alias), `glm provider should expose ${alias}`);
  }
});
