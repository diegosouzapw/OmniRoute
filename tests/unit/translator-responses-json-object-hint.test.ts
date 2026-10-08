import test from "node:test";
import assert from "node:assert/strict";

import { CodexExecutor } from "../../open-sse/executors/codex.ts";

const { openaiToOpenAIResponsesRequest } =
  await import("../../open-sse/translator/request/openai-responses.ts");

// The Responses API only searches `input` for the word "json" when
// text.format is json_object — `instructions` does not count. The first system
// message is hoisted into `instructions`, so a client whose system prompt says
// "JSON" and whose user turn does not got 400 "Response input messages must
// contain the word 'json'".
const SYSTEM_PROMPT = "You are a reviewer. Reply with a single valid JSON object.";
const USER_TURN = "Layer: consistency. Review the document for internal contradictions.";

function inputMentionsJson(input: unknown): boolean {
  return /json/i.test(JSON.stringify(input));
}

test("Chat -> Responses keeps the word json in input when only the system prompt has it", () => {
  const result = openaiToOpenAIResponsesRequest(
    "gpt-5.5",
    {
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: USER_TURN },
      ],
      response_format: { type: "json_object" },
    },
    false,
    null
  ) as { instructions?: unknown; input: Array<Record<string, unknown>>; text?: unknown };

  assert.equal(result.instructions, SYSTEM_PROMPT);
  assert.deepEqual(result.text, { format: { type: "json_object" } });
  assert.ok(inputMentionsJson(result.input), "input must mention json for json_object");
  // The hint is a developer item ahead of the conversation, never a user turn.
  assert.equal(result.input[0].role, "developer");
  assert.equal(result.input[result.input.length - 1].role, "user");
});

test("Chat -> Responses adds no json hint when input already mentions json", () => {
  const result = openaiToOpenAIResponsesRequest(
    "gpt-5.5",
    {
      messages: [
        { role: "system", content: "Rules" },
        { role: "user", content: [{ type: "text", text: "Return the answer as Json" }] },
      ],
      response_format: { type: "json_object" },
    },
    false,
    null
  ) as { input: Array<Record<string, unknown>> };

  assert.equal(result.input.length, 1);
  assert.equal(result.input[0].role, "user");
});

test("Chat -> Responses adds no json hint without json_object", () => {
  for (const response_format of [
    undefined,
    { type: "text" },
    { type: "json_schema", json_schema: { name: "x", schema: { type: "object" } } },
  ]) {
    const result = openaiToOpenAIResponsesRequest(
      "gpt-5.5",
      { messages: [{ role: "user", content: "hello" }], response_format },
      false,
      null
    ) as { input: Array<Record<string, unknown>> };

    assert.equal(result.input.length, 1, `format ${JSON.stringify(response_format)}`);
    assert.equal(result.input[0].role, "user");
  }
});

// The hint must survive the Codex executor's input sanitizing, or Codex still
// answers 400 "Response input messages must contain the word 'json'".
test("CodexExecutor keeps the json_object input hint from a JSON-only system prompt", () => {
  const translated = openaiToOpenAIResponsesRequest(
    "gpt-5.5",
    {
      model: "gpt-5.5",
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: USER_TURN },
      ],
      response_format: { type: "json_object" },
      temperature: 0,
    },
    false,
    null
  ) as Record<string, unknown>;

  const result = new CodexExecutor().transformRequest("gpt-5.5", translated, false, {
    requestEndpointPath: "/responses",
  });

  assert.deepEqual(result.text?.format, { type: "json_object" });
  const inputMessageText = JSON.stringify(
    (result.input as Array<Record<string, unknown>>).filter((item) => item.type === "message")
  );
  assert.match(inputMessageText, /json/i);
});
