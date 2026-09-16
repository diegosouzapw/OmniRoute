import { test } from "node:test";
import assert from "node:assert/strict";
import { openaiToClaudeRequest } from "../../open-sse/translator/request/openai-to-claude.ts";

// #13364 — zed-hosted/claude-haiku-4-5: extended thinking + tools inflates
// max_tokens to 163072 (> Anthropic's real 64000 cap for this model), causing
// Zed's proxy to reject the request in-stream with:
//   "max_tokens: 163072 > 64000, which is the maximum allowed number of
//    output tokens for claude-haiku-4-5-20251001"
//
// Root cause: zed-hosted's passthrough catalog exposes the short hyphenated id
// "claude-haiku-4-5", but modelSpecs' registered alias for that model is the
// dotted "claude-haiku-4.5" — a spelling mismatch (not a missing spec) means
// capMaxOutputTokens() resolves no cap for zed-hosted, so fitThinkingToMaxTokens
// adds the requested budget instead of fitting it under the model's real ceiling.
test("zed-hosted/claude-haiku-4-5 thinking+tools must not inflate max_tokens past the real 64000 output cap", () => {
  const body = {
    model: "claude-haiku-4-5",
    max_tokens: 16000,
    reasoning_effort: "high", // what claude-to-openai produces for the client's budget_tokens:15999
    tools: [
      {
        type: "function",
        function: { name: "read_file", parameters: { type: "object", properties: {} } },
      },
    ],
    messages: [{ role: "user", content: "hello" }],
  };
  const credentials = { _provider: "zed-hosted" };

  const result = openaiToClaudeRequest("claude-haiku-4-5", body, false, credentials);
  const claudeHaiku45OutputCap = 64000; // src/shared/constants/modelSpecs.ts "claude-haiku-4-5-20251001"

  assert.ok(
    (result.max_tokens as number) <= claudeHaiku45OutputCap,
    `max_tokens (${result.max_tokens}) must not exceed the model's real output cap ` +
      `(${claudeHaiku45OutputCap}) — Anthropic/Zed rejects the request otherwise`
  );
});
