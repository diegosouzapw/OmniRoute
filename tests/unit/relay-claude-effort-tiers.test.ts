import test from "node:test";
import assert from "node:assert/strict";

import { getRegistryModelThinkingEfforts } from "../../open-sse/config/providerRegistry.ts";

/**
 * Effort arrays for relay/third-party Claude surfaces.
 *
 * Source of truth (retrieved 2026-09-18):
 * - Anthropic effort docs: https://platform.claude.com/docs/en/build-with-claude/effort
 *   max: Fable 5.1/5, Mythos 5.1/5/Preview, Opus 5/4.8/4.7/4.6, Sonnet 5/4.6
 *   xhigh: Fable 5.1/5, Mythos 5.1/5, Opus 5/4.8/4.7, Sonnet 5
 *   low/medium/high: every effort-capable adaptive model
 * - Kiro: https://kiro.dev/docs/models/effort/ (Opus 5/4.8/4.7 five-tier; Opus 4.6 and Sonnet 4.6 four-tier no xhigh).
 *   Kiro's live catalog only exposes sonnet-5 / sonnet-4.5 / haiku-4.5 among Claude ids
 *   (#6112). sonnet-5 follows Anthropic's five-tier table. sonnet-4.5 and haiku-4.5
 *   are extended-thinking-only (budget_tokens), so they stay without an effort array.
 * - AWS Bedrock adaptive thinking: https://docs.aws.amazon.com/bedrock/latest/userguide/claude-messages-adaptive-thinking.html
 *   Bedrock's effort table is a subset (xhigh listed for Opus 5 / 4.8 / 4.7, not 4.6).
 *   This registry follows Anthropic's per-model table so a suffixed combo id folds
 *   the same way as the first-party claude/anthropic entries. Relays that speak
 *   Anthropic Messages (agentrouter, tabitoken, uc-direct, poe, cline, orcarouter,
 *   gitlab-duo, dit, kie, blackbox, freebuff, freeaiapikey, zenmux, tinycms) inherit
 *   the same mapping. Claude 3.7 / 3.5 / opus-4 (t3-web, coze, api-airforce,
 *   token-kiosk) stay without an array: they only accept budget_tokens.
 */

const FIVE = ["low", "medium", "high", "xhigh", "max"] as const;
const FOUR = ["low", "medium", "high", "max"] as const;

const FIVE_TIER: Array<[string, string]> = [
  ["agentrouter", "claude-opus-4-8"],
  ["agentrouter", "claude-opus-5"],
  ["blackbox", "claude-fable-5"],
  ["cline", "anthropic/claude-opus-4.8"],
  ["freebuff", "anthropic/claude-fable-5"],
  ["kie", "claude-fable-5"],
  ["kiro", "claude-sonnet-5"],
  ["orcarouter", "anthropic/claude-opus-4.8"],
  ["poe", "claude-opus-4.8"],
  ["tabitoken", "claude-opus-5"],
  ["tinycms-web", "claude-fable-5"],
  ["uc-direct", "claude-opus-5"],
  ["bedrock", "anthropic.claude-opus-4-7"],
];

const FOUR_TIER: Array<[string, string]> = [
  ["bedrock", "anthropic.claude-sonnet-4-6"],
  ["bedrock", "anthropic.claude-opus-4-6"],
  ["freeaiapikey", "anthropic/claude-opus-4.6"],
  ["freeaiapikey", "anthropic/claude-sonnet-4.6"],
  ["gitlab-duo", "claude-sonnet-4-6"],
  ["dit", "claude-sonnet-4-6"],
];

const NO_EFFORT: Array<[string, string]> = [
  ["api-airforce", "anthropic/claude-3.7-sonnet"],
  ["bedrock", "anthropic.claude-sonnet-4-5"],
  ["bedrock", "anthropic.claude-haiku-4-5"],
  ["coze", "claude-3-7-sonnet-20250514"],
  ["kiro", "claude-sonnet-4.5"],
  ["kiro", "claude-haiku-4.5"],
  ["t3-web", "claude-opus-4"],
  ["token-kiosk", "claude-3-5-sonnet"],
  ["zenmux", "anthropic/claude-sonnet-4.5"],
  ["zenmux", "anthropic/claude-opus-4.5"],
];

test("relay Claude models that speak adaptive effort declare the official tier list", () => {
  for (const [provider, modelId] of FIVE_TIER) {
    assert.deepEqual(
      getRegistryModelThinkingEfforts(provider, modelId),
      [...FIVE],
      `${provider}/${modelId} five-tier`
    );
  }
  for (const [provider, modelId] of FOUR_TIER) {
    assert.deepEqual(
      getRegistryModelThinkingEfforts(provider, modelId),
      [...FOUR],
      `${provider}/${modelId} four-tier`
    );
  }
});

test("extended-thinking-only and pre-effort Claude ids stay without an effort array", () => {
  for (const [provider, modelId] of NO_EFFORT) {
    assert.equal(
      getRegistryModelThinkingEfforts(provider, modelId),
      undefined,
      `${provider}/${modelId} must not invent effort suffixes`
    );
  }
});
