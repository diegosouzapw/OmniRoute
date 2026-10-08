// #13848 — tool calls and responses must be paired per turn even when a client reuses
// the same tool_call_id across turns (cross-turn ID collision). Split out of
// translator-openai-to-gemini.test.ts, which sits at its frozen size cap.

import test from "node:test";
import assert from "node:assert/strict";

const { openaiToCloudCodeGeminiRequest, openaiToGeminiRequest } =
  await import("../../open-sse/translator/request/openai-to-gemini.ts");

// #13848 pairing tests: the minimal shape of the Gemini contents they inspect.
type PairedGeminiPart = {
  text?: string;
  functionCall?: { name?: string };
  functionResponse?: { name?: string; response?: { result?: unknown } };
};
type PairedGeminiContent = { role?: string; parts?: PairedGeminiPart[] };

test("OpenAI -> Gemini pairs tool calls and responses per turn without cross-turn ID collision mismatch", () => {
  const result = openaiToCloudCodeGeminiRequest(
    "gemini-3.8-flash-high",
    {
      messages: [
        { role: "user", content: "read file" },
        {
          role: "assistant",
          content: null,
          tool_calls: [
            {
              id: "call_collision_123",
              type: "function",
              function: { name: "read_file", arguments: '{"path":"a.txt"}' },
            },
          ],
        },
        {
          role: "tool",
          tool_call_id: "call_collision_123",
          content: "file content from turn 1",
        },
        { role: "user", content: "now run terminal command" },
        {
          role: "assistant",
          content: null,
          tool_calls: [
            {
              id: "call_collision_123",
              type: "function",
              function: { name: "run_terminal_command", arguments: '{"command":"ls"}' },
            },
          ],
        },
        {
          role: "tool",
          tool_call_id: "call_collision_123",
          content: "terminal output from turn 2",
        },
        { role: "user", content: "done" },
      ],
    },
    false
  ) as { contents: PairedGeminiContent[] };

  // Verify Turn 1 functionCall and functionResponse
  const turn1Model = result.contents.find((c) =>
    c.parts?.some((p) => p.functionCall?.name === "read_file")
  );
  assert.ok(turn1Model, "Turn 1 model functionCall must be read_file");

  const turn1User = result.contents.find((c) =>
    c.parts?.some(
      (p) =>
        p.functionResponse?.response?.result === "file content from turn 1" ||
        p.functionResponse?.name === "read_file"
    )
  );
  assert.ok(turn1User, "Turn 1 user functionResponse must exist");
  const turn1Resp = turn1User.parts.find((p) => p.functionResponse);
  assert.equal(
    turn1Resp.functionResponse.name,
    "read_file",
    "Turn 1 functionResponse name must match functionCall name, not be overwritten by turn 2"
  );
  assert.equal(
    turn1Resp.functionResponse.response.result,
    "file content from turn 1",
    "Turn 1 functionResponse must contain turn 1 output, not turn 2 output"
  );

  // Verify Turn 2 functionCall and functionResponse
  const turn2User = result.contents.find((c) =>
    c.parts?.some(
      (p) =>
        p.functionResponse?.response?.result === "terminal output from turn 2" ||
        p.functionResponse?.name === "run_terminal_command"
    )
  );
  assert.ok(turn2User, "Turn 2 user functionResponse must exist");
  const turn2Resp = turn2User.parts.find((p) => p.functionResponse);
  assert.equal(
    turn2Resp.functionResponse.name,
    "run_terminal_command",
    "Turn 2 functionResponse name must match functionCall name"
  );
  assert.equal(
    turn2Resp.functionResponse.response.result,
    "terminal output from turn 2",
    "Turn 2 functionResponse must contain turn 2 output"
  );
});

test("OpenAI -> Gemini pairs tool calls and responses in context mode without ID collision mismatch", () => {
  const result = openaiToGeminiRequest(
    "gemini-2.5-flash",
    {
      messages: [
        { role: "user", content: "read file" },
        {
          role: "assistant",
          content: null,
          tool_calls: [
            {
              id: "call_collision_999",
              type: "function",
              function: { name: "read_file", arguments: '{"path":"a.txt"}' },
            },
          ],
        },
        {
          role: "tool",
          tool_call_id: "call_collision_999",
          content: "file content from turn 1",
        },
        { role: "user", content: "now run terminal command" },
        {
          role: "assistant",
          content: null,
          tool_calls: [
            {
              id: "call_collision_999",
              type: "function",
              function: { name: "run_terminal_command", arguments: '{"command":"ls"}' },
            },
          ],
        },
        {
          role: "tool",
          tool_call_id: "call_collision_999",
          content: "terminal output from turn 2",
        },
        { role: "user", content: "done" },
      ],
    },
    false,
    null,
    { signaturelessToolCallMode: "context" }
  ) as { contents: PairedGeminiContent[] };

  // In context mode without thought signatures, tool responses are emitted as context text
  const textParts = result.contents.flatMap((c) =>
    (c.parts || []).filter((p) => typeof p.text === "string").map((p) => p.text)
  );
  assert.ok(
    textParts.some(
      (t: string) => t.includes("read_file") && t.includes("file content from turn 1")
    ),
    "Turn 1 context text must pair read_file with its own turn 1 output"
  );
  assert.ok(
    textParts.some(
      (t: string) => t.includes("run_terminal_command") && t.includes("terminal output from turn 2")
    ),
    "Turn 2 context text must pair run_terminal_command with its own turn 2 output"
  );
});
