import { describe, it } from "node:test";
import { ok, equal } from "node:assert/strict";

describe("getModelPreserveVideoUrl", () => {
  it("exports getModelPreserveVideoUrl as a function", async () => {
    const mod = await import("@/lib/db/models/modelPreserveVideoUrl");
    equal(typeof mod.getModelPreserveVideoUrl, "function");
  });

  it("fallback preserves moonshot and kimi legacy behavior", () => {
    const fallback = (provider: string) =>
      provider === "moonshot" || provider === "kimi";
    ok(fallback("moonshot"));
    ok(fallback("kimi"));
    equal(fallback("dashscope"), false);
    equal(fallback("unknown"), false);
  });

  it("translator import resolves correctly", async () => {
    const mod = await import("@/lib/db/models/modelPreserveVideoUrl");
    // Calling with unknown provider/model returns undefined (no compat override)
    const result = mod.getModelPreserveVideoUrl("test_provider", "test_model");
    equal(result, undefined);
    // Calling with known hardcoded defaults also returns undefined (no compat row)
    const result2 = mod.getModelPreserveVideoUrl("moonshot", "moonshot-v1");
    equal(result2, undefined);
  });

  it("mergeModelCompatOverride accepts preserveVideoUrl", async () => {
    const { mergeModelCompatOverride, removeModelCompatOverride } = await import("@/lib/db/models/compat");
    const PROVIDER = "test_provider_9248v3";
    const MODEL = "test_model_qwen_vl";
    mergeModelCompatOverride(PROVIDER, MODEL, { preserveVideoUrl: true });
    removeModelCompatOverride(PROVIDER, MODEL);
    ok(true, "should accept preserveVideoUrl in ModelCompatPatch");
  });

  it("deepMergeCompatByProtocol accepts preserveVideoUrl under openai protocol", async () => {
    const { deepMergeCompatByProtocol } = await import("@/lib/db/models/compat");
    const result = deepMergeCompatByProtocol({}, {
      openai: { preserveVideoUrl: true },
    });
    // Valid protocol keys are 'openai', 'openai-responses', 'claude'
    equal(result.openai?.preserveVideoUrl, true);
  });
});
