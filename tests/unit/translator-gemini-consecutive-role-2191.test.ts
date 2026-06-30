import test from "node:test";
import assert from "node:assert/strict";

// Regression for 9router#2191: the OpenAI->Gemini request translator must not
// emit two adjacent `contents[]` entries with the same role. Gemini-family APIs
// (incl. Antigravity / Vertex) reject those with
// 400 INVALID_ARGUMENT "Request contains consecutive messages with the same role".
// The translator had no consecutive-same-role merge pass (unlike the Kiro and
// Claude paths), so consecutive `user` turns — or a tool-result turn (role:user)
// immediately followed by a plain user turn — produced an invalid alternation.

const { openaiToGeminiRequest } = await import(
  "../../open-sse/translator/request/openai-to-gemini.ts"
);

type GeminiContent = { role: string; parts: Array<Record<string, unknown>> };
type GeminiReq = { contents: GeminiContent[] };

function assertNoConsecutiveSameRole(contents: GeminiContent[], label: string) {
  for (let i = 1; i < contents.length; i++) {
    assert.notStrictEqual(
      contents[i].role,
      contents[i - 1].role,
      `${label}: contents[${i - 1}] and contents[${i}] both have role "${contents[i].role}" ` +
        `(Gemini rejects consecutive same-role messages)`
    );
  }
}

test("OpenAI -> Gemini merges two consecutive user messages into one content block", () => {
  const body = {
    messages: [
      { role: "user", content: "Hello" },
      { role: "user", content: "Additional context" },
    ],
  };
  const result = openaiToGeminiRequest("gemini-2.5-pro", body, false) as GeminiReq;

  assertNoConsecutiveSameRole(result.contents, "two-user");
  // The two user turns collapse into a single user content carrying both parts.
  assert.equal(result.contents.length, 1, "expected the two user turns to merge into one");
  assert.equal(result.contents[0].role, "user");
  const texts = result.contents[0].parts.map((p) => p.text);
  assert.deepEqual(texts, ["Hello", "Additional context"]);
});

test("OpenAI -> Gemini does not emit a tool-result(user) turn adjacent to a user turn", () => {
  // Agentic history: user -> assistant(tool_call) -> tool(result) -> user.
  // The assistant block pushes model + user(toolResponse); the trailing plain
  // user turn would otherwise produce two adjacent role:"user" contents.
  const body = {
    messages: [
      { role: "user", content: "List files" },
      {
        role: "assistant",
        content: null,
        tool_calls: [
          {
            id: "call_1",
            type: "function",
            function: { name: "ls", arguments: '{"path":"."}' },
          },
        ],
      },
      { role: "tool", tool_call_id: "call_1", content: "a.ts\nb.ts" },
      { role: "user", content: "Now read a.ts" },
    ],
  };
  const result = openaiToGeminiRequest("gemini-2.5-pro", body, false) as GeminiReq;

  assertNoConsecutiveSameRole(result.contents, "tool-result-then-user");
  // Roles must strictly alternate: user, model, user (toolResp + "Now read a.ts" merged).
  assert.deepEqual(
    result.contents.map((c) => c.role),
    ["user", "model", "user"]
  );
});

test("OpenAI -> Gemini keeps a normally alternating conversation unchanged", () => {
  const body = {
    messages: [
      { role: "user", content: "Hi" },
      { role: "assistant", content: "Hello there" },
      { role: "user", content: "How are you?" },
    ],
  };
  const result = openaiToGeminiRequest("gemini-2.5-pro", body, false) as GeminiReq;

  assertNoConsecutiveSameRole(result.contents, "alternating");
  assert.deepEqual(
    result.contents.map((c) => c.role),
    ["user", "model", "user"]
  );
});
