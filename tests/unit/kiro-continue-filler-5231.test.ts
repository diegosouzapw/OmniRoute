/**
 * Regression test for #5231 / #5303
 *
 * The synthesized trailing user turn must use a neutral filler ("...") instead
 * of the literal word "Continue" so the Kiro/CodeWhisperer model cannot treat
 * it as a real instruction.
 *
 * A conversation that ends on a tool-result turn is still promoted as-is (the
 * "(empty)" placeholder or the promoted turn stays unchanged).
 */
import test from "node:test";
import assert from "node:assert/strict";

const { buildKiroPayload } = await import("../../open-sse/translator/request/openai-to-kiro.ts");

// When a conversation ends on an assistant-text turn the translator must
// synthesize a trailing user turn whose content is "..." and must NOT be the
// literal word "Continue".
test("kiro-continue-filler #5231: synthesized trailing turn uses '...' not 'Continue' when ending on assistant-text", () => {
  const result = buildKiroPayload(
    "claude-sonnet-4",
    {
      messages: [
        { role: "user", content: "What is 2+2?" },
        { role: "assistant", content: "The answer is 4." },
      ],
    },
    false,
    null
  );

  const content = result.conversationState.currentMessage.userInputMessage.content as string;

  // Must end with "..." (the neutral filler)
  assert.match(
    content,
    /\.\.\.$/,
    `synthesized trailing turn must end with '...' but got: '${content}'`
  );

  // Must NOT contain the literal word "Continue"
  assert.doesNotMatch(
    content,
    /\bContinue\b/,
    `synthesized trailing turn must not contain 'Continue' but got: '${content}'`
  );
});

// When a conversation ends on a tool-result turn the last user history turn is
// promoted into currentMessage as-is. The promoted turn content should NOT be
// the neutral filler and should retain the original tool-result content (which
// collapses to the "(empty)" placeholder for empty tool results).
test("kiro-continue-filler #5231: tool-result-ending conversation promotes the turn unchanged", () => {
  const result = buildKiroPayload(
    "claude-sonnet-4",
    {
      messages: [
        { role: "user", content: "Run the tool" },
        {
          role: "assistant",
          content: [{ type: "tool_use", id: "call_tr", name: "bash", input: { cmd: "echo hi" } }],
        },
        {
          role: "user",
          content: [
            {
              type: "tool_result",
              tool_use_id: "call_tr",
              content: [],
            },
          ],
        },
      ],
    },
    false,
    null
  );

  const content = result.conversationState.currentMessage.userInputMessage.content as string;

  // The promoted tool-result user turn uses the "(empty)" placeholder because
  // the tool result content array was empty. It must NOT be the filler "...".
  assert.doesNotMatch(
    content,
    /^\[Context:.*\]\n\n\.\.\.$/,
    `promoted tool-result turn must not be replaced by the neutral filler, got: '${content}'`
  );

  // The turn content must contain the "(empty)" placeholder derived from the
  // empty tool-result content array (the actual user content is only
  // tool_result parts which collapse to "(empty)").
  assert.match(
    content,
    /\(empty\)/,
    `promoted tool-result turn for empty results must contain '(empty)', got: '${content}'`
  );
});
