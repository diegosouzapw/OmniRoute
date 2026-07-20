import test from "node:test";
import assert from "node:assert/strict";

const { buildClaudeCodeCompatibleRequest } = await import(
  "../../open-sse/services/claudeCodeCompatible.ts"
);

// #7777 — OpenAI-format clients (OpenCode/Kilo/Cline) reach the CC bridge
// untranslated: chatCore skips the OpenAI→Claude translator when
// sourceFormat === OPENAI, so `image_url` / AI-SDK `image` / `file` parts used
// to arrive at the upstream in OpenAI shape (silently ignored) or be dropped
// by the text-only extraction. These tests pin the bridge-level conversion.

type Block = Record<string, unknown>;

const PNG_DATA_URL = "data:image/png;base64,iVBORw0KGgoTESTPNG";
const JPEG_DATA_URL = "data:image/jpeg;base64,/9j/4AAQTESTJPEG";
const PDF_DATA_URL = "data:application/pdf;base64,JVBERi0xLjQKTESTPDF";

function buildRequest(messages: unknown[]) {
  const body = { model: "claude-opus-4-8", messages, max_tokens: 1024 };
  return buildClaudeCodeCompatibleRequest({
    sourceBody: body as unknown as Record<string, unknown>,
    normalizedBody: { ...body } as unknown as Record<string, unknown>,
    claudeBody: null,
    model: "claude-opus-4-8",
    stream: false,
    sessionId: "cc-bridge-7777-session",
  });
}

function allContentBlocks(request: { messages: unknown }): Block[] {
  const messages = Array.isArray(request.messages) ? request.messages : [];
  return messages.flatMap((message) => {
    const content = (message as { content?: unknown }).content;
    return Array.isArray(content) ? (content as Block[]) : [];
  });
}

function findImageBlocks(blocks: Block[]): Block[] {
  return blocks.filter((block) => block.type === "image");
}

const SYSTEM_MESSAGE = { role: "system", content: "You are a vision assistant." };

test("CC bridge converts OpenAI image_url data URLs to Claude base64 image blocks (system present, #7777)", () => {
  const request = buildRequest([
    SYSTEM_MESSAGE,
    {
      role: "user",
      content: [
        { type: "text", text: "Describe this image" },
        { type: "image_url", image_url: { url: PNG_DATA_URL } },
      ],
    },
  ]);

  const blocks = allContentBlocks(request);
  assert.equal(
    blocks.some((block) => block.type === "image_url"),
    false,
    "raw OpenAI image_url blocks must not reach the upstream payload"
  );
  const [image] = findImageBlocks(blocks);
  assert.ok(image, "expected a Claude image block in the upstream messages");
  assert.deepEqual(image.source, {
    type: "base64",
    media_type: "image/png",
    data: "iVBORw0KGgoTESTPNG",
  });
  assert.ok(
    blocks.some((block) => block.type === "text" && block.text === "Describe this image"),
    "the text part must survive alongside the image"
  );
});

test("CC bridge converts remote image_url references to Claude url image blocks (#7777)", () => {
  const request = buildRequest([
    SYSTEM_MESSAGE,
    {
      role: "user",
      content: [
        { type: "text", text: "What is in this picture?" },
        { type: "image_url", image_url: { url: "https://example.com/cat.png" } },
      ],
    },
  ]);

  const [image] = findImageBlocks(allContentBlocks(request));
  assert.ok(image, "expected a Claude image block in the upstream messages");
  assert.deepEqual(image.source, { type: "url", url: "https://example.com/cat.png" });
});

test("CC bridge preserves images when the request has no system message (#7777)", () => {
  const request = buildRequest([
    {
      role: "user",
      content: [
        { type: "text", text: "Describe this image" },
        { type: "image_url", image_url: { url: PNG_DATA_URL } },
      ],
    },
  ]);

  const blocks = allContentBlocks(request);
  const [image] = findImageBlocks(blocks);
  assert.ok(image, "expected a Claude image block on the no-system path");
  assert.deepEqual(image.source, {
    type: "base64",
    media_type: "image/png",
    data: "iVBORw0KGgoTESTPNG",
  });
  assert.ok(
    blocks.some((block) => block.type === "text" && block.text === "Describe this image"),
    "the text part must survive alongside the image"
  );
});

test("CC bridge converts AI SDK-style string image parts (#7777)", () => {
  const request = buildRequest([
    SYSTEM_MESSAGE,
    {
      role: "user",
      content: [
        { type: "text", text: "Inspect the attachment" },
        { type: "image", image: JPEG_DATA_URL },
      ],
    },
  ]);

  const [image] = findImageBlocks(allContentBlocks(request));
  assert.ok(image, "expected a Claude image block for the AI SDK image part");
  assert.deepEqual(image.source, {
    type: "base64",
    media_type: "image/jpeg",
    data: "/9j/4AAQTESTJPEG",
  });
});

test("CC bridge maps OpenAI file parts with PDF data to Claude document blocks (#7777)", () => {
  const request = buildRequest([
    SYSTEM_MESSAGE,
    {
      role: "user",
      content: [
        { type: "text", text: "Summarize the report" },
        { type: "file", file: { filename: "report.pdf", file_data: PDF_DATA_URL } },
      ],
    },
  ]);

  const blocks = allContentBlocks(request);
  const document = blocks.find((block) => block.type === "document");
  assert.ok(document, "expected a Claude document block for the PDF file part");
  assert.deepEqual(document.source, {
    type: "base64",
    media_type: "application/pdf",
    data: "JVBERi0xLjQKTESTPDF",
  });
  assert.equal(document.title, "report.pdf");
});

test("CC bridge keeps image-only user messages instead of dropping them (#7777)", () => {
  const request = buildRequest([
    SYSTEM_MESSAGE,
    {
      role: "user",
      content: [{ type: "image_url", image_url: { url: PNG_DATA_URL } }],
    },
  ]);

  const messages = Array.isArray(request.messages) ? request.messages : [];
  assert.ok(messages.length >= 1, "the image-only user message must not be dropped");
  const [image] = findImageBlocks(allContentBlocks(request));
  assert.ok(image, "expected the image block of an image-only message to survive");
  assert.deepEqual(image.source, {
    type: "base64",
    media_type: "image/png",
    data: "iVBORw0KGgoTESTPNG",
  });
});

test("CC bridge passes Claude-native image blocks through unchanged", () => {
  const nativeSource = { type: "base64", media_type: "image/png", data: "NATIVEDATA" };
  const request = buildRequest([
    SYSTEM_MESSAGE,
    {
      role: "user",
      content: [
        { type: "text", text: "Already Claude-shaped" },
        { type: "image", source: nativeSource },
      ],
    },
  ]);

  const [image] = findImageBlocks(allContentBlocks(request));
  assert.ok(image, "expected the Claude-native image block to be preserved");
  assert.deepEqual(image.source, nativeSource);
});

test("CC bridge keeps the legacy text-only wire image intact (regression guard)", () => {
  const request = buildRequest([
    { role: "user", content: "hello" },
    { role: "assistant", content: "hi there" },
    {
      role: "user",
      content: [
        { type: "text", text: "first" },
        { type: "text", text: "second" },
      ],
    },
  ]);

  const messages = Array.isArray(request.messages)
    ? (request.messages as Array<{ role: string; content: Block[] }>)
    : [];
  assert.equal(messages.length, 3);
  assert.deepEqual(messages[0].content, [{ type: "text", text: "hello" }]);
  assert.deepEqual(messages[1].content, [{ type: "text", text: "hi there" }]);
  assert.deepEqual(messages[2].content, [{ type: "text", text: "first\nsecond" }]);
});
