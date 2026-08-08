/**
 * Verify that the new VISION_MODEL_ID_FRAGMENTS additions correctly identify
 * Command Code vision-capable models via the last-resort heuristic.
 *
 * Before the fix: `gpt-5`, `kimi-k2.`, and `claude-fable` were absent from
 * VISION_MODEL_ID_FRAGMENTS. Without registry `supportsVision` flags either,
 * the last-resort heuristic returned `false` for these models, causing the
 * Vision Bridge guardrail to reroute image-bearing requests away from
 * command-code's own vision-capable upstream to opencode-zen — which then
 * failed with 401 "Missing API key."
 */
import { describe, it } from "node:test";
import assert from "node:assert/strict";

import { isVisionModelId } from "../../src/shared/constants/visionModels.ts";

// ── New fragments — MUST now be recognized as vision ────────────────────────

const NEWLY_VISION = [
  // gpt-5 fragment covers all GPT-5.x variants
  "gpt-5.5",
  "gpt-5.4",
  "gpt-5.3-codex",
  "gpt-5.4-mini",
  "gpt-5.6",
  "gpt-5.6-luna",
  // kimi-k2. fragment (with dot) — covers K2.5/K2.6/K2.7 but NOT bare "kimi-k2"
  "moonshotai/Kimi-K2.6",
  "kimi-k2.5",
  "kimi-k2.7-code",
  "moonshotai/Kimi-K2.7-Code",
  // claude-fable fragment
  "claude-fable-5",
];

// ── Models that must remain non-vision ──────────────────────────────────────

const STILL_NOT_VISION = [
  "kimi-k2", // bare kimi-k2 is text-only — must NOT match "kimi-k2."
  "deepseek/deepseek-v4-pro",
  "deepseek/deepseek-v4-flash",
  "zai-org/GLM-5.1",
  "zai-org/GLM-5",
  "MiniMaxAI/MiniMax-M2.7",
  "MiniMaxAI/MiniMax-M2.5",
  "mimo-v2.5-pro",
  "mimo-v2-pro",
  "gemma-2-9b",
  "ministral-14b-latest",
];

describe("VISION_MODEL_ID_FRAGMENTS — Command Code coverage", () => {
  for (const id of NEWLY_VISION) {
    it(`recognizes ${id} as vision via new fragments`, () => {
      assert.equal(isVisionModelId(id), true, `${id} must be recognized as vision-capable`);
    });
  }

  for (const id of STILL_NOT_VISION) {
    it(`keeps ${id} as non-vision (no false positive)`, () => {
      assert.equal(isVisionModelId(id), false, `${id} must remain non-vision`);
    });
  }

  it("existing fragments remain functional (no regression)", () => {
    const existing = [
      "minimax-m3",
      "MiniMaxAI/MiniMax-M3",
      "gpt-4o",
      "claude-opus-4-7",
      "claude-sonnet-4-6",
      "claude-haiku-4-5-20251001",
      "gemini-3-pro",
      "qwen3-vl-plus",
      "pixtral-12b",
      "mistral-medium-3",
    ];
    for (const id of existing) {
      assert.equal(isVisionModelId(id), true, `${id} must stay vision`);
    }
  });
});
