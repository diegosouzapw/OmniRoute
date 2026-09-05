/**
 * Verify that command-code registry models with `supportsVision: true` resolve
 * correctly via `getResolvedModelCapabilities`.
 *
 * Before the fix: the command-code registry had NO `supportsVision` flags.
 * The guardrail used `getResolvedModelCapabilities` → `resolveVisionCapability`,
 * which had no registry flag and no heuristic match, returning `null`/`false`.
 * This caused the Vision Bridge to incorrectly reroute to opencode-zen (401).
 *
 * After the fix: the registry declares `supportsVision: true` for CC
 * vision-capable models, so the guardrail sees native vision support and
 * passes through unmodified — EXCEPT the text-only codex variant
 * (`gpt-5.3-codex` via the Command Code gateway), which issue #10703 confirms
 * cannot see images and was previously mis-flagged as vision in the registry.
 * It follows the same `KNOWN_TEXT_ONLY_DESPITE_SYNC` hard-override path as
 * `mimo-v2.5-pro`. `gpt-5.4-mini` is intentionally left as vision-capable —
 * it's a real OpenAI multimodal model and the Command Code gateway forwards
 * images correctly for it.
 */
import test from "node:test";
import assert from "node:assert/strict";

import { getResolvedModelCapabilities } from "../../../src/lib/modelCapabilities.ts";

// ── Models that SHOULD have supportsVision: true ────────────────────────────

const CC_VISION: [string, string][] = [
  ["Claude Opus 4.7 (CC)", "command-code/claude-opus-4-7"],
  ["Claude Opus 4.6 (CC)", "command-code/claude-opus-4-6"],
  ["Claude Sonnet 4.6 (CC)", "command-code/claude-sonnet-4-6"],
  ["Claude Haiku 4.5 (CC)", "command-code/claude-haiku-4-5-20251001"],
  ["GPT-5.5 (CC)", "command-code/gpt-5.5"],
  ["GPT-5.4 (CC)", "command-code/gpt-5.4"],
  ["GPT-5.4 Mini (CC)", "command-code/gpt-5.4-mini"],
  ["Kimi K2.6 (CC)", "command-code/moonshotai/Kimi-K2.6"],
  ["Kimi K2.5 (CC)", "command-code/moonshotai/Kimi-K2.5"],
  ["Qwen 3.6 Plus (CC)", "command-code/Qwen/Qwen3.6-Plus"],
];

// ── Models that MUST NOT claim vision (text-only) ──────────────────────────

const CC_TEXT_ONLY: [string, string][] = [
  ["GPT-5.3 Codex (CC)", "command-code/gpt-5.3-codex"],
  ["DeepSeek V4 Pro (CC)", "command-code/deepseek/deepseek-v4-pro"],
  ["DeepSeek V4 Flash (CC)", "command-code/deepseek/deepseek-v4-flash"],
  ["GLM-5.1 (CC)", "command-code/zai-org/GLM-5.1"],
  ["GLM-5 (CC)", "command-code/zai-org/GLM-5"],
  ["MiniMax M2.7 (CC)", "command-code/MiniMaxAI/MiniMax-M2.7"],
  ["MiniMax M2.5 (CC)", "command-code/MiniMaxAI/MiniMax-M2.5"],
  ["Qwen 3.6 Max Preview (CC)", "command-code/Qwen/Qwen3.6-Max-Preview"],
];

for (const [name, modelId] of CC_VISION) {
  test(`${name} resolves supportsVision: true`, () => {
    const caps = getResolvedModelCapabilities(modelId);
    assert.equal(caps.supportsVision, true, `${modelId} must have supportsVision: true`);
    assert.equal(caps.provider, "command-code");
  });
}

for (const [name, modelId] of CC_TEXT_ONLY) {
  test(`${name} does not falsely claim vision`, () => {
    const caps = getResolvedModelCapabilities(modelId);
    assert.notEqual(
      caps.supportsVision,
      true,
      `${modelId} is text-only — must not have supportsVision: true`
    );
    assert.equal(caps.provider, "command-code");
  });
}

test("MiniMax M3 via command-code keeps existing vision capability (no regression)", () => {
  const caps = getResolvedModelCapabilities("command-code/MiniMaxAI/MiniMax-M3");
  assert.equal(caps.supportsVision, true);
});

test("command-code effort-suffixed variants resolve capabilities from their base model", async () => {
  // Effort variants (e.g. `-max`, `-xhigh`) are synthesized from the base's
  // supportedThinkingEfforts and have no registry/synced row of their own.
  // Without the base-model fallback they resolve NULL tool/vision/context,
  // which makes a tool-bearing combo request drop them behind confirmed
  // targets (observed: orchestrator tried opencode-go/mimo-v2.5-max at
  // position 2 while command-code deepseek sat unused at its declared
  // priority position 2).
  //
  // Seed the models.dev capability store (the source getResolvedModelCapabilities
  // reads for tool/vision/context) with the base models, then verify the
  // effort-suffixed variants inherit those capabilities via the base fallback.
  const modelsDevSync = await import("../../../src/lib/modelsDevSync.ts");
  modelsDevSync.saveModelsDevCapabilities({
    "command-code": {
      "deepseek/deepseek-v4-flash": {
        tool_call: true,
        reasoning: true,
        attachment: false,
        limit_context: 1000000,
        limit_input: 1000000,
        limit_output: 131072,
      },
      "meta/muse-spark-1.2-contributor": {
        tool_call: true,
        reasoning: true,
        attachment: true,
        limit_context: 1048576,
        limit_input: 1048576,
        limit_output: 1048576,
      },
    },
  });

  const cases: Array<[string, boolean]> = [
    ["command-code/deepseek/deepseek-v4-flash-max", false], // text-only base
    ["command-code/deepseek/deepseek-v4-flash-high", false],
    ["command-code/meta/muse-spark-1.2-contributor-xhigh", true], // vision base
    ["command-code/meta/muse-spark-1.2-contributor-high", true],
  ];
  for (const [modelId, vision] of cases) {
    const caps = getResolvedModelCapabilities(modelId);
    assert.equal(caps.provider, "command-code", `${modelId} provider`);
    assert.equal(caps.supportsTools, true, `${modelId} must inherit tool support from base`);
    assert.equal(caps.supportsVision, vision, `${modelId} must inherit vision from base`);
    assert.equal(typeof caps.contextWindow, "number", `${modelId} must inherit a context window`);
    assert.equal(caps.supportsThinking, true, `${modelId} must inherit reasoning from base`);
  }
});
