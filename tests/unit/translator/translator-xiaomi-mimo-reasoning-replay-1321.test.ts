import test from "node:test";
import assert from "node:assert/strict";

const { translateRequest } = await import("../../../open-sse/translator/index.ts");
const { FORMATS } = await import("../../../open-sse/translator/formats.ts");

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

// Scope guard for the #9573/#9610 <-> 9router#1321 conflict. #9610 removed the
// placeholder injection globally on the strength of ONE provider's behavior
// (deepseek-v4-flash was verified to accept an absent reasoning_content), which
// silently re-broke MiMo. The placeholder is now provider-scoped, so both halves
// need pinning: widening the scope back to DeepSeek re-opens #9573, narrowing it
// away from MiMo re-opens 9router#1321.
test("the reasoning_content placeholder stays scoped: MiMo keeps it, DeepSeek does not (#9573 vs 9router#1321)", () => {
  const plainHistory = () => ({
    messages: [
      { role: "user", content: "hi" },
      // Plain assistant turn whose reasoning_content the client stripped.
      { role: "assistant", content: "Hello! How can I help?" },
      { role: "user", content: "continue" },
    ],
  });

  const mimo = translateRequest(
    FORMATS.OPENAI,
    FORMATS.OPENAI,
    "mimo-v2.5-pro",
    plainHistory(),
    true,
    null,
    "xiaomi-mimo"
  );
  const mimoAssistant = mimo.messages.find((m) => m.role === "assistant");
  assert.equal(
    typeof mimoAssistant.reasoning_content === "string" &&
      mimoAssistant.reasoning_content.length > 0,
    true,
    "MiMo 400s on an absent reasoning_content — the placeholder must survive the cache miss"
  );

  const deepseek = translateRequest(
    FORMATS.OPENAI,
    FORMATS.OPENAI,
    "deepseek-v4-flash",
    plainHistory(),
    true,
    null,
    "deepseek"
  );
  const deepseekAssistant = deepseek.messages.find((m) => m.role === "assistant");
  assert.equal(
    deepseekAssistant.reasoning_content,
    undefined,
    "DeepSeek accepts an absent field; sending the placeholder there is the #9573 echo bug"
  );
});
