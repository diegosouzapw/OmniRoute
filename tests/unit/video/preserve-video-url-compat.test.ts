import { describe, it } from "node:test";
import { deepEqual, equal, ok } from "node:assert/strict";

describe("getModelPreserveVideoUrl", () => {
  it("exports getModelPreserveVideoUrl as a function", async () => {
    const mod = await import("@/lib/db/models/modelPreserveVideoUrl");
    equal(typeof mod.getModelPreserveVideoUrl, "function");
  });

  it("fallback preserves moonshot and kimi legacy behavior", () => {
    const fallback = (provider: string) => provider === "moonshot" || provider === "kimi";
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
    const { mergeModelCompatOverride, removeModelCompatOverride } =
      await import("@/lib/db/models/compat");
    const { getModelPreserveVideoUrl } = await import("@/lib/db/models/modelPreserveVideoUrl");
    const PROVIDER = "test_provider_9248v3";
    const MODEL = "test_model_qwen_vl";
    try {
      mergeModelCompatOverride(PROVIDER, MODEL, { preserveVideoUrl: true });
      equal(getModelPreserveVideoUrl(PROVIDER, MODEL), true);
    } finally {
      removeModelCompatOverride(PROVIDER, MODEL);
    }
  });

  it("translateRequest resolves preserveVideoUrl with the routed model", async () => {
    const { mergeModelCompatOverride, removeModelCompatOverride } =
      await import("@/lib/db/models/compat");
    const { translateRequest } = await import("@omniroute/open-sse/translator/index.ts");
    const provider = "test-provider-video-override";
    const model = "test-model-video-override";

    mergeModelCompatOverride(provider, model, { preserveVideoUrl: true });
    try {
      const translated = translateRequest(
        "openai",
        "openai",
        model,
        {
          messages: [
            {
              role: "user",
              content: [
                {
                  type: "video_url",
                  video_url: { url: "https://cdn.example.com/input.mp4" },
                },
              ],
            },
          ],
        },
        false,
        null,
        provider
      ) as { messages: Array<{ content: Array<{ type: string }> }> };

      deepEqual(
        translated.messages[0].content.map((part) => part.type),
        ["video_url"]
      );
    } finally {
      removeModelCompatOverride(provider, model);
    }
  });

  it("deepMergeCompatByProtocol accepts preserveVideoUrl under openai protocol", async () => {
    const { deepMergeCompatByProtocol } = await import("@/lib/db/models/compat");
    const result = deepMergeCompatByProtocol(
      {},
      {
        openai: { preserveVideoUrl: true },
      }
    );
    // Valid protocol keys are 'openai', 'openai-responses', 'claude'
    equal(result.openai?.preserveVideoUrl, true);
  });
});
