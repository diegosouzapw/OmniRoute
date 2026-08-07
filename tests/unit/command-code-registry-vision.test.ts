/**
 * Verify that command-code registry models with `supportsVision: true` resolve
 * correctly via `getResolvedModelCapabilities`.
 *
 * Before the fix: the command-code registry had NO `supportsVision` flags.
 * The guardrail used `getResolvedModelCapabilities` → `resolveVisionCapability`,
 * which had no registry flag and no heuristic match, returning `null`/`false`.
 * This caused the Vision Bridge to incorrectly reroute to opencode-zen (401).
 *
 * After the fix: the registry declares `supportsVision: true` for all CC
 * vision-capable models, so the guardrail sees native vision support and
 * passes through unmodified.
 */
import test from "node:test";
import assert from "node:assert/strict";

import { getResolvedModelCapabilities } from "../../src/lib/modelCapabilities.ts";

// ── Models that SHOULD have supportsVision: true ────────────────────────────

const CC_VISION: [string, string][] = [
  ["Claude Opus 4.7 (CC)", "command-code/claude-opus-4-7"],
  ["Claude Opus 4.6 (CC)", "command-code/claude-opus-4-6"],
  ["Claude Sonnet 4.6 (CC)", "command-code/claude-sonnet-4-6"],
  ["Claude Haiku 4.5 (CC)", "command-code/claude-haiku-4-5-20251001"],
  ["GPT-5.5 (CC)", "command-code/gpt-5.5"],
  ["GPT-5.4 (CC)", "command-code/gpt-5.4"],
  ["GPT-5.3 Codex (CC)", "command-code/gpt-5.3-codex"],
  ["GPT-5.4 Mini (CC)", "command-code/gpt-5.4-mini"],
  ["Kimi K2.6 (CC)", "command-code/moonshotai/Kimi-K2.6"],
  ["Kimi K2.5 (CC)", "command-code/moonshotai/Kimi-K2.5"],
  ["Qwen 3.6 Plus (CC)", "command-code/Qwen/Qwen3.6-Plus"],
];

// ── Models that MUST NOT claim vision (text-only) ──────────────────────────

const CC_TEXT_ONLY: [string, string][] = [
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
