/**
 * Issue #2900 — OpenCode `big-pickle` fails DeepSeek thinking-mode
 * reasoning_content replay.
 *
 * `big-pickle` (OpenCode free / Zen, endpoint https://opencode.ai/zen/v1) is
 * backed by DeepSeek thinking mode upstream, so follow-up/tool-use turns must
 * replay `reasoning_content` or DeepSeek returns:
 *   [400]: The reasoning_content in the thinking mode must be passed back to the API.
 *
 * Unlike `deepseek-v4-flash-free`, the model id `big-pickle` gives no signal to
 * the replay detector, and `requiresReasoningReplay` (with allowLegacyFallback:false,
 * as the translator calls it) only triggers on:
 *   - interleavedField === "reasoning_content"  (models.dev signal), or
 *   - isDeepSeekReasoningModel() pattern match.
 *
 * Note: `supportsReasoning` is NOT consumed by `requiresReasoningReplay`, so
 * marking the model `supportsReasoning: true` alone does NOT enable replay.
 * The real trigger is an explicit `interleavedField: "reasoning_content"` on the
 * registry entry, surfaced by getResolvedModelCapabilities.
 *
 * This test asserts the end-to-end wiring for both OpenCode registrations
 * (`opencode`/alias `oc` and `opencode-zen`).
 */
import test from "node:test";
import assert from "node:assert/strict";

const { REGISTRY } = await import("../../open-sse/config/providerRegistry.ts");
const { getResolvedModelCapabilities } = await import("../../src/lib/modelCapabilities.ts");
const { requiresReasoningReplay } = await import("../../open-sse/services/reasoningCache.ts");

type ModelEntry = {
  id: string;
  supportsReasoning?: boolean;
  interleavedField?: string;
  [key: string]: unknown;
};

function getModel(providerId: string, modelId: string): ModelEntry | undefined {
  const provider = (REGISTRY as Record<string, { models?: ModelEntry[] }>)[providerId];
  return provider?.models?.find((m) => m.id === modelId);
}

for (const providerId of ["opencode", "opencode-zen"]) {
  test(`#2900 ${providerId}/big-pickle registry declares interleavedField reasoning_content`, () => {
    const model = getModel(providerId, "big-pickle");
    assert.ok(model, `big-pickle must be registered in ${providerId}`);
    assert.strictEqual(
      model.interleavedField,
      "reasoning_content",
      `${providerId}/big-pickle must declare interleavedField:"reasoning_content" to trigger replay`
    );
  });

  test(`#2900 ${providerId}/big-pickle resolves interleavedField via capabilities`, () => {
    const caps = getResolvedModelCapabilities({ provider: providerId, model: "big-pickle" });
    assert.strictEqual(
      caps.interleavedField,
      "reasoning_content",
      `getResolvedModelCapabilities must surface the registry interleavedField for ${providerId}/big-pickle`
    );
  });

  test(`#2900 ${providerId}/big-pickle triggers reasoning replay`, () => {
    const caps = getResolvedModelCapabilities({ provider: providerId, model: "big-pickle" });
    const isReasoner = requiresReasoningReplay({
      provider: providerId,
      model: "big-pickle",
      thinkingEnabled: false,
      supportsReasoning: caps.reasoning,
      interleavedField: caps.interleavedField,
      allowLegacyFallback: false,
    });
    assert.strictEqual(
      isReasoner,
      true,
      `${providerId}/big-pickle must require reasoning replay (matching deepseek-v4-flash-free behavior)`
    );
  });
}
