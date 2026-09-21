import test from "node:test";
import assert from "node:assert/strict";

import { buildKiroPayload } from "../../open-sse/translator/request/openai-to-kiro.ts";

// Issue #13652: `convertMessages()` in `openai-to-kiro.ts` is stateless per HTTP
// request. OpenAI-compatible clients resend the full growing message array on
// every turn, so the same tool-bearing first user message is re-scanned on
// every subsequent request and its relocated documentation (`toolDocs`)
// rebuilt from scratch. `buildKiroPayload()` then unconditionally prepends it
// onto whatever the *current* turn is, so the ~10KB+ doc block keeps landing
// on the newest user message instead of staying where it was first delivered.

const DOCS_HEADING = "# Tool Documentation";

function bigTool(length: number) {
  return [
    {
      type: "function",
      function: {
        name: "big_tool",
        description: "D".repeat(length),
        parameters: { type: "object", properties: {} },
      },
    },
  ];
}

test("issue #13652: relocated tool doc is not re-prepended to a later turn once already delivered", () => {
  const tools = bigTool(12000);

  // Turn 1: client sends only the first user message.
  const turn1Messages = [{ role: "user", content: "hello, please help" }];
  const payload1 = buildKiroPayload(
    "claude-sonnet-4.5",
    { messages: turn1Messages, tools },
    true,
    {}
  );
  const turn1Content = payload1.conversationState.currentMessage.userInputMessage.content;

  assert.ok(
    turn1Content.includes(DOCS_HEADING),
    "turn 1: the relocated tool documentation must reach the model at least once"
  );

  // Turn 2: the OpenAI-compatible client resends the FULL prior history plus
  // the assistant reply and a new user message. The client's own copy of turn
  // 1's user message does NOT contain the "# Tool Documentation" block, since
  // that was only ever prepended server-side to the outgoing Kiro payload.
  const turn2Messages = [
    { role: "user", content: "hello, please help" },
    { role: "assistant", content: "Sure, how can I help?" },
    { role: "user", content: "what is 2+2?" },
  ];
  const payload2 = buildKiroPayload(
    "claude-sonnet-4.5",
    { messages: turn2Messages, tools },
    true,
    {}
  );
  const turn2CurrentContent = payload2.conversationState.currentMessage.userInputMessage.content;

  assert.ok(
    !turn2CurrentContent.includes(DOCS_HEADING),
    "turn 2: the tool documentation must NOT be re-prepended to the newest turn's " +
      "content once it has already been delivered earlier in the conversation"
  );

  // The docs must not simply vanish — they must still reach the model exactly
  // once, anchored on the turn that originally carried the tools (now in history).
  const historyContents = payload2.conversationState.history
    .map((h: { userInputMessage?: { content?: string } }) => h.userInputMessage?.content || "")
    .join("\n");
  const occurrences = (historyContents.match(new RegExp(DOCS_HEADING, "g")) || []).length;

  assert.equal(
    occurrences,
    1,
    "turn 2: the tool documentation must still reach the model exactly once, anchored to " +
      "the turn that originally carried the tools"
  );
});
