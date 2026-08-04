import test from "node:test";
import assert from "node:assert/strict";

const { buildKiroPayload } = await import("../../open-sse/translator/request/openai-to-kiro.ts");

// Regression guards for #5231: when an OpenAI->Kiro request ends on an
// assistant/tool turn, the translator must synthesize a *neutral* filler user
// turn ("...") rather than the literal word "Continue" — Kiro/CodeWhisperer can
// read "Continue" as a real user instruction and take unintended agent action.

test("#5231: assistant-text-ending request never leaks the literal 'Continue' filler", () => {
  const result = buildKiroPayload(
    "claude-sonnet-4",
    {
      messages: [
        { role: "user", content: "First user" },
        { role: "assistant", content: "Assistant answer" },
      ],
    },
    false,
    null
  );

  const synthesized = result.conversationState.currentMessage.userInputMessage.content;
  assert.match(synthesized, /\n\n\.\.\.$/, "synthesized trailing turn must end with the neutral filler");
  assert.ok(
    !/\bContinue\b/.test(synthesized),
    `synthesized trailing turn must not contain the literal "Continue", got: ${synthesized}`
  );
});

test("#5231: a trailing tool-result turn is promoted as-is, NOT replaced by the filler", () => {
  // Proves the change is scoped strictly to the assistant-text-ending case: a
  // conversation ending on a tool result already collapses to a real user turn
  // (carrying its toolResults), which is promoted into currentMessage unchanged.
  const result = buildKiroPayload(
    "claude-sonnet-4",
    {
      messages: [
        { role: "user", content: "Run the tool" },
        {
          role: "assistant",
          content: null,
          tool_calls: [
            { id: "call_1", type: "function", function: { name: "get_time", arguments: "{}" } },
          ],
        },
        { role: "tool", tool_call_id: "call_1", content: "12:00" },
      ],
    },
    false,
    null
  );

  const current = result.conversationState.currentMessage.userInputMessage;
  assert.ok(
    !/\.\.\.$/.test(current.content) && !/\bContinue\b/.test(current.content),
    `trailing tool-result turn must be promoted as-is, got synthesized filler: ${current.content}`
  );
  assert.ok(
    (current.userInputMessageContext?.toolResults?.length ?? 0) > 0,
    "promoted trailing turn must carry the tool results"
  );
});
