import test from "node:test";
import assert from "node:assert/strict";

// Regression for 9router#2191: the OpenAI->Gemini request translator must not
// emit two adjacent `contents[]` entries with the same role. Gemini-family APIs
// (incl. Antigravity / Vertex) reject those with
// 400 INVALID_ARGUMENT "Request contains consecutive messages with the same role".
// The translator had no consecutive-same-role merge pass (unlike the Kiro and
// Claude paths), so consecutive `user` turns — or a tool-result turn (role:user)
// immediately followed by a plain user turn — produced an invalid alternation.

const {
  openaiToGeminiRequest,
  mergeConsecutiveSameRoleContents,
  ensureHistoryDoesNotOpenWithFunctionCall,
} = await import("../../open-sse/translator/request/openai-to-gemini.ts");

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

test("mergeConsecutiveSameRoleContents merges adjacent same-role entries without mutating the input", () => {
  const userPartsA = [{ text: "Hello" }];
  const userPartsB = [{ text: "Additional context" }];
  const input: GeminiContent[] = [
    { role: "user", parts: userPartsA },
    { role: "user", parts: userPartsB },
    { role: "model", parts: [{ text: "Hi" }] },
  ];

  const merged = mergeConsecutiveSameRoleContents(input) as GeminiContent[];

  // Merged output: one user block carrying both parts, then the model block.
  assert.deepEqual(
    merged.map((c) => c.role),
    ["user", "model"]
  );
  assert.deepEqual(
    merged[0].parts.map((p) => p.text),
    ["Hello", "Additional context"]
  );

  // The caller's input objects and their parts arrays must be untouched.
  assert.equal(input.length, 3, "input array must not be mutated");
  assert.equal(userPartsA.length, 1, "first input parts array must not be mutated");
  assert.equal(userPartsB.length, 1, "second input parts array must not be mutated");
  assert.notStrictEqual(merged[0].parts, userPartsA, "merged parts must be a fresh array");
});

// Regression: Gemini also rejects a functionCall-bearing "model" turn with no
// preceding turn at all -- 400 INVALID_ARGUMENT "Please ensure that function
// call turn comes immediately after a user turn or after a function response
// turn." Observed live when the true leading user turn was missing from the
// reconstructed history (e.g. a dropped/truncated earlier turn), leaving an
// assistant tool-call turn as contents[0].
test("ensureHistoryDoesNotOpenWithFunctionCall prepends a synthetic user turn when history opens with a functionCall", () => {
  const input: GeminiContent[] = [
    { role: "model", parts: [{ functionCall: { name: "ls", args: {} } }] },
    { role: "user", parts: [{ functionResponse: { name: "ls", response: { result: "a.ts" } } }] },
  ];

  const fixed = ensureHistoryDoesNotOpenWithFunctionCall(input) as GeminiContent[];

  assert.deepEqual(
    fixed.map((c) => c.role),
    ["user", "model", "user"]
  );
  assert.ok(fixed[0].parts[0].text, "the synthetic leading turn carries plain text, not a tool part");
  // Original array and its entries are untouched.
  assert.equal(input.length, 2);
});

test("ensureHistoryDoesNotOpenWithFunctionCall leaves a normal user-first history unchanged", () => {
  const input: GeminiContent[] = [
    { role: "user", parts: [{ text: "Hi" }] },
    { role: "model", parts: [{ functionCall: { name: "ls", args: {} } }] },
  ];

  const result = ensureHistoryDoesNotOpenWithFunctionCall(input);
  assert.strictEqual(result, input, "an already-valid history must be returned as-is");
});

test("ensureHistoryDoesNotOpenWithFunctionCall leaves a text-only leading model turn unchanged", () => {
  // Not the violation this guards: a leading "model" turn with no functionCall
  // part isn't the rule Gemini enforces here.
  const input: GeminiContent[] = [{ role: "model", parts: [{ text: "(no leading user turn)" }] }];
  const result = ensureHistoryDoesNotOpenWithFunctionCall(input);
  assert.strictEqual(result, input);
});

test("ensureHistoryDoesNotOpenWithFunctionCall handles an empty contents array", () => {
  const result = ensureHistoryDoesNotOpenWithFunctionCall([]);
  assert.deepEqual(result, []);
});

test("OpenAI -> Gemini: a reconstructed history whose leading user turn was lost still produces a valid, Gemini-acceptable alternation", () => {
  // Simulates the reported live failure shape directly through the full
  // translator: continuation/compression reconstruction can leave `messages`
  // starting with an assistant tool-call turn instead of the true first user
  // turn. The translator's own contents[] must still open with role:"user".
  const body = {
    messages: [
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
  const result = openaiToGeminiRequest("gemini-2.5-pro", body, false, null, {
    signaturelessToolCallMode: "context",
  }) as GeminiReq;

  assert.equal(result.contents[0].role, "user", "contents[] must never open with role:model");
  assertNoConsecutiveSameRole(result.contents, "reconstructed-history-missing-leading-user-turn");
});
