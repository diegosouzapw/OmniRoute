// Gemini carries an `id` on functionCall / functionResponse parts only when the client sets
// one, and OmniRoute's own Gemini-format responses never emit it. A call without an id got a
// generated one while its response fell back to the function *name* as tool_call_id, so the
// two never matched: the tool-call normalization in translateRequest then inserted an empty
// result for the call and dropped the real output as an orphan. #11365 fixed the half where
// the client does send ids. The three Gemini-shaped converters now pair an id-less response
// with the oldest open call of the same name within the current round of calls.
import test from "node:test";
import assert from "node:assert/strict";

const { geminiToOpenAIRequest } =
  await import("../../open-sse/translator/request/gemini-to-openai.ts");
const { antigravityToOpenAIRequest } =
  await import("../../open-sse/translator/request/antigravity-to-openai.ts");
const { convertGeminiToInternal } =
  await import("../../src/app/api/v1beta/models/[...path]/convertGeminiToInternal.ts");
const { translateRequest } = await import("../../open-sse/translator/index.ts");
const { FORMATS } = await import("../../open-sse/translator/formats.ts");

type Message = {
  role: string;
  content?: unknown;
  tool_call_id?: string;
  tool_calls?: Array<{ id: string; function: { name: string; arguments: string } }>;
};

const call = (name: string, args: Record<string, unknown>) => ({ functionCall: { name, args } });
const reply = (name: string, result: unknown) => ({
  functionResponse: { name, response: { result } },
});

const singleCall = [
  { role: "user", parts: [{ text: "Weather in Tokyo?" }] },
  { role: "model", parts: [call("get_weather", { city: "Tokyo" })] },
  { role: "user", parts: [reply("get_weather", "22C sunny")] },
];

// The same function called twice in one turn; Gemini answers in call order.
const repeatedCall = [
  { role: "user", parts: [{ text: "Tokyo and Paris?" }] },
  {
    role: "model",
    parts: [call("get_weather", { city: "Tokyo" }), call("get_weather", { city: "Paris" })],
  },
  { role: "user", parts: [reply("get_weather", "22C sunny"), reply("get_weather", "14C rain")] },
];

function pairs(messages: Message[]) {
  const callIds = messages.flatMap((m) => m.tool_calls?.map((c) => c.id) ?? []);
  const results = messages
    .filter((m) => m.role === "tool")
    .map((m) => ({ id: m.tool_call_id, content: m.content }));
  return { callIds, results };
}

const converters: Array<[string, (contents: unknown[]) => Message[]]> = [
  [
    "gemini-to-openai",
    (contents) => geminiToOpenAIRequest("gpt-4o", { contents }, false).messages as Message[],
  ],
  [
    "antigravity-to-openai",
    (contents) =>
      antigravityToOpenAIRequest("gpt-4o", { request: { contents } }, false).messages as Message[],
  ],
  [
    "/v1beta convertGeminiToInternal",
    (contents) =>
      convertGeminiToInternal({ contents }, "openai/gpt-4o", false).messages as Message[],
  ],
];

// gemini-cli's usual shape: two parallel reads answered in one content, then a later read.
const parallelThenLater = [
  { role: "user", parts: [{ text: "Compare a and b, then read c" }] },
  { role: "model", parts: [call("read_file", { path: "a" }), call("read_file", { path: "b" })] },
  { role: "user", parts: [reply("read_file", "A-content"), reply("read_file", "B-content")] },
  { role: "model", parts: [call("read_file", { path: "c" })] },
  { role: "user", parts: [reply("read_file", "C-content")] },
];

// One model turn split by a thought-only content between its two calls.
const splitModelTurn = [
  { role: "user", parts: [{ text: "Read a and b" }] },
  { role: "model", parts: [call("read_file", { path: "a" })] },
  { role: "model", parts: [{ text: "Also b.", thought: true }] },
  { role: "model", parts: [call("read_file", { path: "b" })] },
  { role: "user", parts: [reply("read_file", "A-content"), reply("read_file", "B-content")] },
];

// A call the client never answered must not take a later call's response.
const unansweredThenRetried = [
  { role: "model", parts: [call("get_weather", { city: "Tokyo" })] },
  { role: "user", parts: [{ text: "Never mind, try Paris" }] },
  { role: "model", parts: [call("get_weather", { city: "Paris" })] },
  { role: "user", parts: [reply("get_weather", "14C rain")] },
];

for (const [label, convert] of converters) {
  test(`${label}: an id-less functionResponse answers the generated call id`, () => {
    const { callIds, results } = pairs(convert(structuredClone(singleCall)));
    assert.equal(callIds.length, 1);
    assert.deepEqual(results, [{ id: callIds[0], content: '"22C sunny"' }]);
  });
}

for (const [label, convert] of converters) {
  test(`${label}: repeated calls to one function are answered in order`, () => {
    const { callIds, results } = pairs(convert(structuredClone(repeatedCall)));
    assert.equal(callIds.length, 2);
    assert.deepEqual(results, [
      { id: callIds[0], content: '"22C sunny"' },
      { id: callIds[1], content: '"14C rain"' },
    ]);
  });

  test(`${label}: parallel calls, then a later call to the same function`, () => {
    const { callIds, results } = pairs(convert(structuredClone(parallelThenLater)));
    assert.equal(callIds.length, 3);
    assert.deepEqual(results, [
      { id: callIds[0], content: '"A-content"' },
      { id: callIds[1], content: '"B-content"' },
      { id: callIds[2], content: '"C-content"' },
    ]);
  });

  test(`${label}: a thought between two calls of one turn does not split the round`, () => {
    const messages = convert(structuredClone(splitModelTurn));
    const idFor = (path: string) =>
      messages
        .flatMap((m) => m.tool_calls ?? [])
        .find((c) => JSON.parse(c.function.arguments).path === path)?.id;
    assert.deepEqual(pairs(messages).results, [
      { id: idFor("a"), content: '"A-content"' },
      { id: idFor("b"), content: '"B-content"' },
    ]);
  });

  test(`${label}: an unanswered call does not take a later call's response`, () => {
    const messages = convert(structuredClone(unansweredThenRetried));
    // antigravity's fixToolPairs drops the unanswered call; the others keep it.
    const parisCall = messages
      .flatMap((m) => m.tool_calls ?? [])
      .find((c) => JSON.parse(c.function.arguments).city === "Paris");
    assert.ok(parisCall);
    assert.deepEqual(pairs(messages).results, [{ id: parisCall.id, content: '"14C rain"' }]);
  });
}

test("the tool output survives translateRequest's tool-call normalization", () => {
  const body = {
    contents: structuredClone(singleCall),
    tools: [{ functionDeclarations: [{ name: "get_weather", parameters: { type: "object" } }] }],
  };
  const viaTranslator = translateRequest(FORMATS.GEMINI, FORMATS.OPENAI, "gpt-4o", body, false);
  const viaV1beta = translateRequest(
    FORMATS.OPENAI,
    FORMATS.OPENAI,
    "gpt-4o",
    convertGeminiToInternal(structuredClone(body), "openai/gpt-4o", false),
    false
  );
  for (const out of [viaTranslator, viaV1beta]) {
    const { callIds, results } = pairs(out.messages as Message[]);
    assert.deepEqual(results, [{ id: callIds[0], content: '"22C sunny"' }]);
  }
});

test("an id-less response does not take a call whose id the client chose", () => {
  const messages = geminiToOpenAIRequest(
    "gpt-4o",
    {
      contents: [
        {
          role: "model",
          parts: [
            { functionCall: { id: "call_x", name: "get_weather", args: { city: "Tokyo" } } },
            call("get_weather", { city: "Paris" }),
          ],
        },
        {
          role: "user",
          parts: [
            reply("get_weather", "14C rain"),
            {
              functionResponse: { id: "call_x", name: "get_weather", response: { result: "22C" } },
            },
          ],
        },
      ],
    },
    false
  ).messages as Message[];
  const { callIds, results } = pairs(messages);
  assert.equal(callIds[0], "call_x");
  assert.deepEqual(results, [
    { id: callIds[1], content: '"14C rain"' },
    { id: "call_x", content: '"22C"' },
  ]);
});

test("a response with an id keeps it, and an id-less one takes the remaining call", () => {
  const messages = geminiToOpenAIRequest(
    "gpt-4o",
    {
      contents: [
        {
          role: "model",
          parts: [{ functionCall: { id: "call_a", name: "get_weather", args: {} } }],
        },
        { role: "model", parts: [call("get_weather", { city: "Paris" })] },
        {
          role: "user",
          parts: [{ functionResponse: { id: "call_a", name: "get_weather", response: {} } }],
        },
        { role: "user", parts: [reply("get_weather", "14C rain")] },
      ],
    },
    false
  ).messages as Message[];
  const { callIds, results } = pairs(messages);
  assert.equal(callIds[0], "call_a");
  assert.deepEqual(
    results.map((r) => r.id),
    ["call_a", callIds[1]]
  );
});
