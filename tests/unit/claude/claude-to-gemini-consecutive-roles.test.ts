import test from "node:test";
import assert from "node:assert/strict";

const { claudeToGeminiRequest } =
  await import("../../../open-sse/translator/request/claude-to-gemini.ts");

test("Claude -> Gemini merges consecutive user text turns into a single user turn", () => {
  const result = claudeToGeminiRequest(
    "gemini-2.5-flash",
    {
      messages: [
        { role: "user", content: "hello" },
        { role: "user", content: [{ type: "text", text: "world" }] },
      ],
    },
    false
  );

  assert.equal(result.contents.length, 1);
  assert.equal(result.contents[0].role, "user");
  assert.deepEqual(result.contents[0].parts, [{ text: "hello" }, { text: "world" }]);
});

test("Claude -> Gemini merges tool_result and subsequent user instruction into single user turn", () => {
  const result = claudeToGeminiRequest(
    "gemini-2.5-flash",
    {
      messages: [
        { role: "user", content: "Calculate 2+2" },
        {
          role: "assistant",
          content: [{ type: "text", text: "I will calculate that." }],
        },
        {
          role: "user",
          content: [
            {
              type: "tool_result",
              tool_use_id: "tool_call_1",
              content: "4",
            },
          ],
        },
        {
          role: "user",
          content: "Now add 10 to that result",
        },
      ],
    },
    false
  );

  // Contents must alternate properly and not have consecutive same-role turns
  for (let i = 1; i < result.contents.length; i++) {
    assert.notEqual(
      result.contents[i].role,
      result.contents[i - 1].role,
      `Consecutive same-role detected at index ${i - 1} and ${i}: ${result.contents[i].role}`
    );
  }

  // The last turn should be a merged user turn containing both the tool context and the text
  const lastTurn = result.contents[result.contents.length - 1];
  assert.equal(lastTurn.role, "user");
  assert.equal(lastTurn.parts.length, 2);
  assert.ok(
    typeof (lastTurn.parts[0] as { text: string }).text === "string" &&
      (lastTurn.parts[0] as { text: string }).text.includes("previous_tool_result_context")
  );
  assert.deepEqual(lastTurn.parts[1], { text: "Now add 10 to that result" });
});

test("Claude -> Gemini preserves alternating conversation turns without spurious merging", () => {
  const result = claudeToGeminiRequest(
    "gemini-2.5-flash",
    {
      messages: [
        { role: "user", content: "Hello" },
        { role: "assistant", content: "Hi! How can I help?" },
        { role: "user", content: "What is the capital of France?" },
      ],
    },
    false
  );

  assert.equal(result.contents.length, 3);
  assert.equal(result.contents[0].role, "user");
  assert.deepEqual(result.contents[0].parts, [{ text: "Hello" }]);
  assert.equal(result.contents[1].role, "model");
  assert.deepEqual(result.contents[1].parts, [{ text: "Hi! How can I help?" }]);
  assert.equal(result.contents[2].role, "user");
  assert.deepEqual(result.contents[2].parts, [{ text: "What is the capital of France?" }]);
});

test("Claude -> Gemini merges three or more consecutive user turns into a single user turn", () => {
  const result = claudeToGeminiRequest(
    "gemini-2.5-flash",
    {
      messages: [
        { role: "user", content: "part 1" },
        { role: "user", content: "part 2" },
        { role: "user", content: "part 3" },
      ],
    },
    false
  );

  assert.equal(result.contents.length, 1);
  assert.equal(result.contents[0].role, "user");
  assert.deepEqual(result.contents[0].parts, [
    { text: "part 1" },
    { text: "part 2" },
    { text: "part 3" },
  ]);
});

test("Claude -> Gemini handles empty messages array without error", () => {
  const result = claudeToGeminiRequest(
    "gemini-2.5-flash",
    {
      messages: [],
    },
    false
  );

  assert.deepEqual(result.contents, []);
});

test("Claude -> Gemini merges consecutive assistant turns into a single model turn", () => {
  const result = claudeToGeminiRequest(
    "gemini-2.5-flash",
    {
      messages: [
        { role: "user", content: "hello" },
        { role: "assistant", content: "response part 1" },
        { role: "assistant", content: [{ type: "text", text: "response part 2" }] },
      ],
    },
    false
  );

  assert.equal(result.contents.length, 2);
  assert.equal(result.contents[0].role, "user");
  assert.deepEqual(result.contents[0].parts, [{ text: "hello" }]);
  assert.equal(result.contents[1].role, "model");
  assert.deepEqual(result.contents[1].parts, [
    { text: "response part 1" },
    { text: "response part 2" },
  ]);
});
