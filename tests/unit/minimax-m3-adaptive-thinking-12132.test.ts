import { test } from "node:test";
import assert from "node:assert/strict";
import { isAdaptiveThinkingOnly } from "@/shared/constants/modelSpecs.ts";
import { normalizeClaudeAdaptiveThinking } from "@omniroute/open-sse/services/claudeAdaptiveThinking.ts";

// Issue #12132: MiniMax M3 rejects thinking.type:"enabled" with 400 (2013)
// ("invalid thinking.type: \"enabled\" (allowed: adaptive, disabled)"), but the
// modelSpecs entry for minimax-m3 was never given `adaptiveThinkingOnly: true`
// (the change #9155 proposed and claimed to have landed). Because every
// normalization site that would collapse `enabled` -> `adaptive` gates on
// `isAdaptiveThinkingOnly()`, a manual thinking.type:"enabled" request that
// resolves to MiniMax M3 (via either the `minimax` or `minimax-cn` provider,
// since both alias to the same spec entry) was forwarded unchanged and
// upstream 400s.

test("minimax-m3 is flagged adaptiveThinkingOnly so manual thinking.type is collapsed", () => {
  assert.equal(
    isAdaptiveThinkingOnly("minimax-m3"),
    true,
    "minimax-m3 modelSpec is missing adaptiveThinkingOnly: true"
  );
  assert.equal(
    isAdaptiveThinkingOnly("MiniMax-M3"),
    true,
    "MiniMax-M3 alias must resolve to the same adaptive-thinking-only spec"
  );
});

test("normalizeClaudeAdaptiveThinking collapses enabled->adaptive for MiniMax M3", () => {
  const body = {
    thinking: { type: "enabled", budget_tokens: 20000 },
    output_config: { effort: "max" },
  };

  const result = normalizeClaudeAdaptiveThinking(body, "MiniMax-M3");

  assert.equal(
    (result.thinking as Record<string, unknown>).type,
    "adaptive",
    "thinking.type:\"enabled\" must be collapsed to \"adaptive\" for MiniMax M3, " +
      "otherwise upstream rejects it with 400 (2013)"
  );
  assert.equal(
    (result.thinking as Record<string, unknown>).budget_tokens,
    undefined,
    "budget_tokens must be dropped once thinking is collapsed to adaptive"
  );
});
