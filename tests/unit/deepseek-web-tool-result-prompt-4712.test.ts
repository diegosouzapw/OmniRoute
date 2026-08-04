// #4712 — deepseek-web drops role:"tool" messages. The web API takes a single `prompt`
// string, so tool results must be folded into the transcript. The agentic path
// (buildToolConversationPrompt) already does this, but messagesToPrompt — used whenever
// the follow-up request no longer carries a `tools[]` array (hasTools=false) — silently
// discarded role:"tool" messages, so the model never saw the tool output and either
// re-called the tool endlessly or answered "I don't have that information".
import test from "node:test";
import assert from "node:assert/strict";

const { messagesToPrompt } = await import("../../open-sse/executors/deepseek-web.ts");

const CONVO = [
  { role: "system", content: "You are helpful." },
  { role: "user", content: "what is the weather in Tokyo?" },
  {
    role: "assistant",
    content: "",
    tool_calls: [
      { id: "call_1", function: { name: "get_weather", arguments: '{"city":"Tokyo"}' } },
    ],
  },
  {
    role: "tool",
    tool_call_id: "call_1",
    name: "get_weather",
    content: '{"temp":22,"conditions":"Sunny"}',
  },
  { role: "user", content: "should I bring an umbrella?" },
];

test("messagesToPrompt includes role:tool results in the rolling-window transcript (#4712)", () => {
  const prompt = messagesToPrompt(CONVO, 50);
  // The tool output must reach the model — this is the regression guard.
  assert.match(prompt, /22/);
  assert.match(prompt, /Sunny/);
  // It should be labelled as a tool result, not silently merged into a user turn.
  assert.match(prompt, /Tool result/i);
  // Tool name is preserved for context when available.
  assert.match(prompt, /get_weather/);
});

test("messagesToPrompt tags the tool name from tool_call_id when no explicit name (#4712)", () => {
  const convo = [
    { role: "user", content: "q" },
    {
      role: "assistant",
      content: "",
      tool_calls: [{ id: "c9", function: { name: "lookup", arguments: "{}" } }],
    },
    { role: "tool", tool_call_id: "c9", content: "RESULT_PAYLOAD" },
  ];
  const prompt = messagesToPrompt(convo, 50);
  assert.match(prompt, /RESULT_PAYLOAD/);
  assert.match(prompt, /lookup/);
});

test("messagesToPrompt still drops empty tool results without crashing (#4712)", () => {
  const convo = [
    { role: "user", content: "hello" },
    { role: "tool", tool_call_id: "x", content: "" },
    { role: "user", content: "world" },
  ];
  const prompt = messagesToPrompt(convo, 50);
  assert.match(prompt, /hello/);
  assert.match(prompt, /world/);
});
