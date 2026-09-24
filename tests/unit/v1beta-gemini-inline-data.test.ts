// /v1beta/models/{m}:generateContent converted only `text`, `functionCall` and
// `functionResponse` parts, so an image, PDF or audio sent as `inlineData` never reached the
// provider, and an image-only turn became an empty user message. A content holding a
// `functionResponse` also returned the tool messages alone, dropping any part next to them.
// gemini-cli sends a binary file a tool read that way: the functionResponse, then the file as
// inlineData in the same content. The Gemini request translator handles both
// (`inlineData` -> `image_url` data URL, `splitCoLocatedFunctionResponses()`).
import test from "node:test";
import assert from "node:assert/strict";

const { convertGeminiToInternal } =
  await import("../../src/app/api/v1beta/models/[...path]/convertGeminiToInternal.ts");
const { geminiToOpenAIRequest } =
  await import("../../open-sse/translator/request/gemini-to-openai.ts");
const { translateRequest } = await import("../../open-sse/translator/index.ts");
const { FORMATS } = await import("../../open-sse/translator/formats.ts");

type Message = {
  role: string;
  content?: unknown;
  tool_call_id?: string;
  tool_calls?: Array<{ id: string; function: { name: string; arguments: string } }>;
};

const PNG =
  "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==";
const PDF = "JVBERi0xLjQKJcfsj6IKMSAwIG9iago8PD4+CmVuZG9iagp0cmFpbGVyCjw8Pj4KJSVFT0YK";

function convert(contents: unknown[]): Message[] {
  return convertGeminiToInternal({ contents } as never, "gemini/gemini-2.5-flash", false)
    .messages as Message[];
}

test("an inlineData image next to text reaches the message as an image_url part", () => {
  const contents = [
    {
      role: "user",
      parts: [
        { text: "What is in this picture?" },
        { inlineData: { mimeType: "image/png", data: PNG } },
      ],
    },
  ];
  const messages = convert(contents);
  assert.deepEqual(messages, [
    {
      role: "user",
      content: [
        { type: "text", text: "What is in this picture?" },
        { type: "image_url", image_url: { url: `data:image/png;base64,${PNG}` } },
      ],
    },
  ]);
  assert.deepEqual(messages, geminiToOpenAIRequest("gpt-4o", { contents }, false).messages);
});

test("an image-only turn is not an empty user message", () => {
  const messages = convert([
    { role: "user", parts: [{ inline_data: { mime_type: "application/pdf", data: PDF } }] },
  ]);
  assert.deepEqual(messages, [
    {
      role: "user",
      content: [{ type: "image_url", image_url: { url: `data:application/pdf;base64,${PDF}` } }],
    },
  ]);
});

test("a file a tool read, sent next to its functionResponse, follows the tool message", () => {
  const messages = convert([
    { role: "user", parts: [{ text: "Describe logo.png" }] },
    { role: "model", parts: [{ functionCall: { name: "read_file", args: { path: "logo.png" } } }] },
    {
      role: "user",
      parts: [
        {
          functionResponse: { name: "read_file", response: { output: "Binary content provided." } },
        },
        { inlineData: { mimeType: "image/png", data: PNG } },
      ],
    },
  ]);
  const callId = messages[1].tool_calls?.[0].id;
  assert.ok(callId);
  assert.deepEqual(messages.slice(2), [
    { role: "tool", tool_call_id: callId, content: '{"output":"Binary content provided."}' },
    {
      role: "user",
      content: [{ type: "image_url", image_url: { url: `data:image/png;base64,${PNG}` } }],
    },
  ]);
});

test("text next to a functionResponse follows the tool message as a user message", () => {
  const messages = convert([
    { role: "model", parts: [{ functionCall: { id: "call_a", name: "get_time", args: {} } }] },
    {
      role: "user",
      parts: [
        { functionResponse: { id: "call_a", name: "get_time", response: { result: "12:00" } } },
        { text: "Also convert it to UTC." },
      ],
    },
  ]);
  assert.deepEqual(messages.slice(1), [
    { role: "tool", tool_call_id: "call_a", content: '"12:00"' },
    { role: "user", content: "Also convert it to UTC." },
  ]);
});

test("a functionResponse alone still yields only its tool message", () => {
  const messages = convert([
    { role: "model", parts: [{ functionCall: { id: "call_a", name: "get_time", args: {} } }] },
    {
      role: "user",
      parts: [
        { functionResponse: { id: "call_a", name: "get_time", response: { result: "12:00" } } },
      ],
    },
  ]);
  assert.deepEqual(messages.slice(1), [
    { role: "tool", tool_call_id: "call_a", content: '"12:00"' },
  ]);
});

test("an image in a model turn is not sent as assistant image content", () => {
  const messages = convert([
    { role: "user", parts: [{ text: "Draw a cat" }] },
    {
      role: "model",
      parts: [{ text: "Here you go" }, { inlineData: { mimeType: "image/png", data: PNG } }],
    },
    { role: "user", parts: [{ text: "Make it blue" }] },
  ]);
  assert.deepEqual(messages[1], { role: "assistant", content: "Here you go" });
});

test("a response next to a call in the same content still answers the earlier call", () => {
  const messages = convert([
    { role: "model", parts: [{ functionCall: { name: "get_time", args: {} } }] },
    { role: "user", parts: [{ text: "hi" }] },
    {
      role: "user",
      parts: [
        { functionResponse: { name: "get_time", response: { result: "12:00" } } },
        { functionCall: { name: "get_date", args: {} } },
      ],
    },
  ]);
  const firstCallId = messages[0].tool_calls?.[0].id;
  assert.ok(firstCallId);
  assert.deepEqual(messages[2], { role: "tool", tool_call_id: firstCallId, content: '"12:00"' });
  assert.equal(messages[3].tool_calls?.[0].function.name, "get_date");
});

test("text-only contents keep a plain string content", () => {
  assert.deepEqual(convert([{ role: "user", parts: [{ text: "a" }, { text: "b" }] }]), [
    { role: "user", content: "a\nb" },
  ]);
});

test("the image reaches a Gemini upstream as inlineData after translation", () => {
  const body = convertGeminiToInternal(
    {
      contents: [
        {
          role: "user",
          parts: [{ text: "What is this?" }, { inlineData: { mimeType: "image/png", data: PNG } }],
        },
      ],
    } as never,
    "gemini/gemini-2.5-flash",
    false
  );
  const upstream = translateRequest(
    FORMATS.OPENAI,
    FORMATS.GEMINI,
    "gemini-2.5-flash",
    body,
    false
  );
  const parts = upstream.contents.flatMap((c: { parts: unknown[] }) => c.parts);
  assert.ok(
    parts.some(
      (p: { inlineData?: { mimeType: string; data: string } }) =>
        p.inlineData?.mimeType === "image/png" && p.inlineData.data === PNG
    )
  );
});
