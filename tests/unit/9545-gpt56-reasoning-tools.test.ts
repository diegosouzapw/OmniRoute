import { describe, it } from "node:test";
import assert from "node:assert";

describe("Issue #9545 — GPT-5.6 URL routing + reasoning_effort with tools", () => {
  it("getModelTargetFormat should resolve gpt-5.6-luna with and without provider prefix", async () => {
    const { getModelTargetFormat } = await import("../../open-sse/config/providerModels.ts");
    assert.strictEqual(getModelTargetFormat("openai", "gpt-5.6-luna"), "openai-responses");
    assert.strictEqual(getModelTargetFormat("openai", "openai/gpt-5.6-luna"), "openai-responses");
  });

  it("getModelTargetFormat should resolve non-prefixed models unchanged", async () => {
    const { getModelTargetFormat } = await import("../../open-sse/config/providerModels.ts");
    assert.strictEqual(getModelTargetFormat("openai", "gpt-4o"), null);
    assert.strictEqual(getModelTargetFormat("openai", "gpt-5.5-pro"), "openai-responses");
    assert.strictEqual(getModelTargetFormat("openai", "openai/gpt-5.5-pro"), "openai-responses");
  });

  it("stripGpt5ReasoningWhenTools should not strip when targetFormat=openai-responses", async () => {
    const { stripGpt5ReasoningWhenTools } =
      await import("../../open-sse/services/gpt5SamplingGuard.ts");
    const body = {
      model: "gpt-5.6-luna",
      tools: [{ type: "function", function: { name: "test" } }],
      reasoning_effort: "high",
    };
    const r = stripGpt5ReasoningWhenTools(body, "openai", "gpt-5.6-luna", "openai-responses", null);
    assert.strictEqual(r.reasoning_effort, "high");
  });
});
