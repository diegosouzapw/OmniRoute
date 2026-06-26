import test from "node:test";
import assert from "node:assert/strict";

const { translateRequest } = await import("../../open-sse/translator/index.ts");
const { FORMATS } = await import("../../open-sse/translator/formats.ts");

// Regression for upstream issue 9router#1321 (and the #1337 echo-rules port):
// Xiaomi MiMo thinking models enforce the same contract as DeepSeek V4 —
// "Param Incorrect: The reasoning_content in the thinking mode must be passed
// back to the API." — even on PLAIN (non-tool-call) assistant turns. The
// xiaomi-mimo provider was already in REASONING_REPLAY_PROVIDERS so tool-call
// turns got reasoning_content replayed, but the reasoning-ONLY replay path for
// plain turns was gated by a DeepSeek-only predicate, so a multi-turn text
// conversation whose reasoning_content the client stripped was forwarded
// without the field and rejected with 400.
test("translateRequest replays reasoning_content on plain xiaomi-mimo assistant turns (9router#1321)", () => {
  const body = {
    model: "mimo-v2.5-pro",
    messages: [
      { role: "user", content: "hi" },
      // A plain assistant turn (no tool calls) whose reasoning_content the client dropped.
      { role: "assistant", content: "Hello! How can I help?" },
      { role: "user", content: "continue" },
    ],
  };

  const result = translateRequest(
    FORMATS.OPENAI,
    FORMATS.OPENAI,
    "mimo-v2.5-pro",
    body,
    true,
    null,
    "xiaomi-mimo"
  );

  const assistant = result.messages.find((m) => m.role === "assistant");
  assert.ok(assistant, "assistant message present");
  assert.equal(
    typeof assistant.reasoning_content === "string" && assistant.reasoning_content.length > 0,
    true,
    "plain xiaomi-mimo assistant turn must carry a non-empty reasoning_content"
  );
});
