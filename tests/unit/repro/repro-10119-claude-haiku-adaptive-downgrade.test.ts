import { test } from "node:test";
import assert from "node:assert/strict";

import { openaiToClaudeRequest } from "../../../open-sse/translator/request/openai-to-claude.ts";

// Issue #10119: a request that already carries `thinking:{type:"adaptive"}` (the shape
// OmniRoute builds for an adaptive-only sibling like Opus 4.7+/Sonnet-5 in a combo) is
// forwarded verbatim when combo/fallback routing re-targets the SAME request to a model
// that only supports manual extended thinking (e.g. claude-haiku-4-5-20251001). Anthropic
// rejects `type:"adaptive"` on Haiku with "adaptive thinking is not supported on this
// model". The translator must downgrade `adaptive` -> `enabled` (with a safe budget) for
// any non-`isAdaptiveThinkingOnly` Claude model instead of forwarding an incompatible type.

function toClaude(model: string, thinking: Record<string, unknown>) {
  return openaiToClaudeRequest(
    model,
    { model, thinking, messages: [{ role: "user", content: "hi" }] },
    false,
    null
  );
}

test("downgrades client-supplied adaptive thinking to manual enabled for Haiku 4.5", () => {
  const out = toClaude("claude-haiku-4-5-20251001", { type: "adaptive" });
  assert.equal(out.thinking?.type, "enabled", "adaptive must not survive on a Haiku target");
  assert.ok(
    Number(out.thinking?.budget_tokens) >= 1024,
    "downgraded enabled thinking must carry a safe non-zero budget"
  );
});

test("downgrades adaptive thinking for any non-adaptive-only Claude model generically", () => {
  // claude-sonnet-4-5 is NOT adaptive-only (unlike Opus 4.7+/Sonnet-5), so the same
  // downgrade must apply — the guard is keyed on isAdaptiveThinkingOnly(), not the Haiku id.
  const out = toClaude("claude-sonnet-4-5", { type: "adaptive" });
  assert.equal(out.thinking?.type, "enabled", "non-adaptive-only models must not receive adaptive");
});

test("preserves adaptive thinking for an adaptive-only model (Opus 4.7+)", () => {
  const out = toClaude("claude-opus-4-7", { type: "adaptive" });
  assert.equal(out.thinking?.type, "adaptive", "adaptive-only models keep adaptive thinking");
});