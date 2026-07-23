import test from "node:test";
import assert from "node:assert/strict";
const { prepareClaudeRequest } = await import("../../open-sse/translator/helpers/claudeHelper.ts");
const { DEFAULT_THINKING_CLAUDE_SIGNATURE } = await import(
  "../../open-sse/config/defaultThinkingSignature.ts"
);
test("#6953: latest-assistant thinking block with EMPTY signature must not be forwarded verbatim to an Anthropic-native leg", () => {
  const body: Record<string, unknown> = {
    thinking: { type: "enabled", budget_tokens: 4096 },
    model: "claude-opus-4-8",
    messages: [
      { role: "user", content: [{ type: "text", text: "review this diff" }] },
      {
        role: "assistant",
        content: [
          { type: "thinking", thinking: "Reviewing Rust diff for compliance...", signature: "" },
          { type: "text", text: "Looks fine." },
        ],
      },
      { role: "user", content: [{ type: "text", text: "go ahead and commit" }] },
    ],
  };
  prepareClaudeRequest(body, "claude");
  const tb = body.messages[1].content[0];
  assert.notEqual(tb.signature, "", "empty/foreign thinking signature must not be forwarded verbatim");
  if (tb.type === "redacted_thinking") assert.equal(tb.data, DEFAULT_THINKING_CLAUDE_SIGNATURE);
});
