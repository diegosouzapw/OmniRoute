// Claude accepts an image block whose source is a URL, next to the base64 form.
// claude-to-openai.ts handled that in its `image` case but not in the `tool_result` branch
// right below it, so a tool that returned a URL image had the block JSON.stringify'd into the
// tool message. claude-to-gemini.ts had no URL branch at all: #13335 lifted base64 tool_result
// images there and noted that URL images were still flattened, leaving this half open. Gemini
// takes a remote image as `fileData: { fileUri }`, the mapping helpers/geminiHelper.ts uses for
// an OpenAI image_url that is a URL (#2807) — HTTPS only, the scheme the repo's own media-URL
// validator requires, so an empty, `http:`, `data:` or `file:` url stays dropped rather than
// reaching Gemini as a fileUri it will reject.
import test from "node:test";
import assert from "node:assert/strict";

const { claudeToOpenAIRequest } =
  await import("../../open-sse/translator/request/claude-to-openai.ts");
const { claudeToGeminiRequest } =
  await import("../../open-sse/translator/request/claude-to-gemini.ts");
const { buildGeminiThoughtSignatureKey, storeGeminiThoughtSignature } =
  await import("../../open-sse/services/geminiThoughtSignatureStore.ts");

type Part = Record<string, unknown>;
type Message = { role: string; content?: unknown; tool_call_id?: string };

const IMAGE_URL = "https://example.com/screenshot.png";
const urlImage = { type: "image", source: { type: "url", url: IMAGE_URL } };
const base64Image = {
  type: "image",
  source: { type: "base64", media_type: "image/png", data: "iVBORw0K" },
};

function toolCallHistory(resultContent: unknown[]) {
  return [
    {
      role: "assistant",
      content: [{ type: "tool_use", id: "tu_1", name: "screenshot", input: {} }],
    },
    {
      role: "user",
      content: [{ type: "tool_result", tool_use_id: "tu_1", content: resultContent }],
    },
  ];
}

function toOpenAI(messages: unknown[]): Message[] {
  return claudeToOpenAIRequest("gpt-4o", { messages }, false).messages as Message[];
}

let signatureSeq = 0;

function toGemini(messages: unknown[]): Part[] {
  const ns = `url-image-${++signatureSeq}`;
  storeGeminiThoughtSignature(buildGeminiThoughtSignatureKey(ns, "tu_1"), "SIG");
  const result = claudeToGeminiRequest("gemini-2.5-pro", { messages }, false, {
    _signatureNamespace: ns,
  });
  return result.contents.flatMap((c: { parts: Part[] }) => c.parts);
}

test("claude→openai lifts a URL image out of a tool_result", () => {
  const messages = toOpenAI(toolCallHistory([urlImage]));
  const toolMessage = messages.find((m) => m.role === "tool");
  assert.equal(toolMessage?.content, "[tool returned an image; see attached]");
  assert.deepEqual(messages.at(-1), {
    role: "user",
    content: [{ type: "image_url", image_url: { url: IMAGE_URL } }],
  });
});

test("claude→openai keeps tool_result text next to a URL image", () => {
  const messages = toOpenAI(toolCallHistory([{ type: "text", text: "done" }, urlImage]));
  assert.equal(messages.find((m) => m.role === "tool")?.content, "done");
  assert.deepEqual(messages.at(-1), {
    role: "user",
    content: [{ type: "image_url", image_url: { url: IMAGE_URL } }],
  });
});

test("claude→openai still lifts a base64 tool_result image", () => {
  const messages = toOpenAI(toolCallHistory([base64Image]));
  assert.deepEqual(messages.at(-1), {
    role: "user",
    content: [{ type: "image_url", image_url: { url: "data:image/png;base64,iVBORw0K" } }],
  });
});

test("claude→gemini sends a URL image as fileData", () => {
  const parts = toGemini([{ role: "user", content: [{ type: "text", text: "look" }, urlImage] }]);
  assert.deepEqual(parts, [
    { text: "look" },
    { fileData: { fileUri: IMAGE_URL, mimeType: "image/*" } },
  ]);
});

test("claude→gemini sends a URL image from a tool_result after the tool response", () => {
  const parts = toGemini(toolCallHistory([urlImage]));
  const fileDataIndex = parts.findIndex((p) => p.fileData);
  const responseIndex = parts.findIndex((p) => p.functionResponse);
  assert.notEqual(fileDataIndex, -1, "the image must survive");
  assert.ok(fileDataIndex > responseIndex, "the image follows the tool response");
  assert.deepEqual(parts[fileDataIndex], {
    fileData: { fileUri: IMAGE_URL, mimeType: "image/*" },
  });
  assert.deepEqual(
    (parts[responseIndex].functionResponse as { response: { result: unknown } }).response.result,
    "[tool returned an image; see attached]"
  );
});

test("claude→gemini still sends a base64 image as inlineData", () => {
  const parts = toGemini([{ role: "user", content: [base64Image] }]);
  assert.deepEqual(parts, [{ inlineData: { mimeType: "image/png", data: "iVBORw0K" } }]);
});

test("claude→gemini keeps both tool_result images in order, after the response and before the text that follows", () => {
  // The trailing text is the shape #13335 was about: Claude Code appends a reminder after the
  // tool result, and the images have to land between the response and that text.
  const parts = toGemini([
    {
      role: "assistant",
      content: [{ type: "tool_use", id: "tu_1", name: "screenshot", input: {} }],
    },
    {
      role: "user",
      content: [
        { type: "tool_result", tool_use_id: "tu_1", content: [base64Image, urlImage] },
        { type: "text", text: "keep going" },
      ],
    },
  ]);
  const responseIndex = parts.findIndex((p) => p.functionResponse);
  assert.deepEqual(parts.slice(responseIndex + 1), [
    { inlineData: { mimeType: "image/png", data: "iVBORw0K" } },
    { fileData: { fileUri: IMAGE_URL, mimeType: "image/*" } },
    { text: "keep going" },
  ]);
});

test("claude→gemini sends a URL image from a signature-less tool result too", () => {
  // Without a stored thought signature the tool result becomes context text (#8979 / #3688);
  // the image still follows it, as the base64 half does.
  const result = claudeToGeminiRequest(
    "gemini-2.5-pro",
    { messages: toolCallHistory([urlImage]) },
    false,
    {
      _signatureNamespace: "url-image-unsigned",
    }
  );
  const parts = result.contents.flatMap((c: { parts: Part[] }) => c.parts);
  const contextIndex = parts.findIndex(
    (p) => typeof p.text === "string" && p.text.includes("previous_tool_result_context")
  );
  assert.notEqual(contextIndex, -1, "an unsigned tool result becomes context text");
  assert.deepEqual(parts[contextIndex + 1], {
    fileData: { fileUri: IMAGE_URL, mimeType: "image/*" },
  });
});

test("a url source that Gemini cannot fetch is dropped, not forwarded", () => {
  // Before: these were dropped silently. Forwarding them as a fileUri would turn a request
  // that worked without the image into a 400 from Gemini.
  for (const url of [
    "",
    "http://example.com/a.png",
    "data:image/png;base64,iVBORw0K",
    "file:///etc/passwd",
  ]) {
    const block = { type: "image", source: { type: "url", url } };
    assert.deepEqual(
      toGemini([{ role: "user", content: [{ type: "text", text: "hi" }, block] }]),
      [{ text: "hi" }],
      `expected ${JSON.stringify(url)} to be dropped`
    );
  }
});

test("an image block with neither source shape is left alone", () => {
  const odd = { type: "image", source: { type: "file", file_id: "file_123" } };
  assert.deepEqual(toGemini([{ role: "user", content: [{ type: "text", text: "hi" }, odd] }]), [
    { text: "hi" },
  ]);
  const messages = toOpenAI(toolCallHistory([odd]));
  assert.equal(
    messages.find((m) => m.role === "tool")?.content,
    JSON.stringify([odd]),
    "unknown source shapes keep the old JSON fallback"
  );
});
