import test from "node:test";
import assert from "node:assert/strict";

const { openaiToClaudeRequest } =
  await import("../../open-sse/translator/request/openai-to-claude.ts");
const {
  extractOpenAiImageUrl,
  urlToClaudeImageBlock,
  openAiImagePartToClaudeBlock,
  normalizeToolResultImages,
} = await import("../../open-sse/translator/request/openai-to-claude/imageBlocks.ts");

const PNG_DATA_URL = "data:image/png;base64,iVBORw0KGgo=";

function findToolResult(translated: { messages: Array<{ content?: unknown[] }> }) {
  for (const msg of translated.messages) {
    if (!Array.isArray(msg.content)) continue;
    const toolResult = msg.content.find(
      (block) =>
        block && typeof block === "object" && (block as { type?: string }).type === "tool_result"
    );
    if (toolResult) return toolResult as { type: string; content: unknown };
  }
  return null;
}

test("extractOpenAiImageUrl accepts both {url} objects and bare strings", () => {
  assert.equal(extractOpenAiImageUrl({ url: PNG_DATA_URL }), PNG_DATA_URL);
  assert.equal(extractOpenAiImageUrl(PNG_DATA_URL), PNG_DATA_URL);
  assert.equal(extractOpenAiImageUrl({}), "");
  assert.equal(extractOpenAiImageUrl(null), "");
});

test("urlToClaudeImageBlock splits data URLs and keeps http(s) as url sources", () => {
  assert.deepEqual(urlToClaudeImageBlock(PNG_DATA_URL), {
    type: "image",
    source: { type: "base64", media_type: "image/png", data: "iVBORw0KGgo=" },
  });
  assert.deepEqual(urlToClaudeImageBlock("https://example.com/shot.png"), {
    type: "image",
    source: { type: "url", url: "https://example.com/shot.png" },
  });
  assert.equal(urlToClaudeImageBlock("   "), null);
});

test("openAiImagePartToClaudeBlock maps image_url and AI-SDK image parts", () => {
  assert.deepEqual(
    openAiImagePartToClaudeBlock({
      type: "image_url",
      image_url: { url: PNG_DATA_URL },
    }),
    {
      type: "image",
      source: { type: "base64", media_type: "image/png", data: "iVBORw0KGgo=" },
    }
  );
  assert.deepEqual(openAiImagePartToClaudeBlock({ type: "image", image: PNG_DATA_URL }), {
    type: "image",
    source: { type: "base64", media_type: "image/png", data: "iVBORw0KGgo=" },
  });
  assert.equal(openAiImagePartToClaudeBlock({ type: "text", text: "ok" }), null);
});

test("normalizeToolResultImages rewrites nested image_url inside tool_result content", () => {
  const out = normalizeToolResultImages([
    { type: "text", text: "caption" },
    { type: "image_url", image_url: { url: PNG_DATA_URL } },
    {
      type: "tool_result",
      content: [{ type: "image_url", image_url: "https://cdn.example/a.png" }],
    },
  ]);
  assert.deepEqual(out, [
    { type: "text", text: "caption" },
    {
      type: "image",
      source: { type: "base64", media_type: "image/png", data: "iVBORw0KGgo=" },
    },
    {
      type: "tool_result",
      content: [{ type: "image", source: { type: "url", url: "https://cdn.example/a.png" } }],
    },
  ]);
});

test("#9692: role=tool image_url content becomes a Claude image block, not a raw image_url", () => {
  const translated = openaiToClaudeRequest(
    "claude-sonnet-4",
    {
      messages: [
        { role: "user", content: "describe the screenshot" },
        {
          role: "assistant",
          content: "",
          tool_calls: [
            {
              id: "tool_123",
              type: "function",
              function: { name: "ReadMediaFile", arguments: '{"path":"shot.png"}' },
            },
          ],
        },
        {
          role: "tool",
          tool_call_id: "tool_123",
          content: [
            {
              type: "image_url",
              image_url: { url: PNG_DATA_URL },
            },
          ],
        },
      ],
    },
    false
  );

  const toolResult = findToolResult(translated);
  assert.ok(toolResult, "expected a translated tool_result");
  assert.ok(Array.isArray(toolResult.content), "tool_result.content must stay an array");
  assert.equal(
    (toolResult.content as Array<{ type?: string }>).some((block) => block.type === "image_url"),
    false,
    "OpenAI image_url must not leak into Claude tool_result content"
  );
  const image = (toolResult.content as Array<Record<string, unknown>>).find(
    (block) => block.type === "image"
  );
  assert.ok(image, "expected a Claude image block inside tool_result");
  assert.deepEqual(image.source, {
    type: "base64",
    media_type: "image/png",
    data: "iVBORw0KGgo=",
  });
});

test("#9692: mixed text + image_url in a tool result keeps text and converts the image", () => {
  const translated = openaiToClaudeRequest(
    "claude-sonnet-4",
    {
      messages: [
        { role: "user", content: "read it" },
        {
          role: "assistant",
          content: "",
          tool_calls: [
            {
              id: "call_1",
              type: "function",
              function: { name: "ReadMediaFile", arguments: "{}" },
            },
          ],
        },
        {
          role: "tool",
          tool_call_id: "call_1",
          content: [
            { type: "text", text: "file: shot.png" },
            { type: "image_url", image_url: PNG_DATA_URL },
          ],
        },
      ],
    },
    false
  );

  const toolResult = findToolResult(translated);
  assert.ok(toolResult);
  assert.deepEqual(toolResult.content, [
    { type: "text", text: "file: shot.png" },
    {
      type: "image",
      source: { type: "base64", media_type: "image/png", data: "iVBORw0KGgo=" },
    },
  ]);
});

test("#9692: nested tool_result image_url on a user message is converted the same way", () => {
  const translated = openaiToClaudeRequest(
    "claude-sonnet-4",
    {
      messages: [
        { role: "user", content: "describe" },
        {
          role: "assistant",
          content: "",
          tool_calls: [
            {
              id: "tool_123",
              type: "function",
              function: { name: "ReadMediaFile", arguments: "{}" },
            },
          ],
        },
        {
          role: "user",
          content: [
            {
              type: "tool_result",
              tool_use_id: "tool_123",
              content: [
                {
                  type: "image_url",
                  image_url: { url: PNG_DATA_URL },
                },
              ],
            },
          ],
        },
      ],
    },
    false
  );

  const toolResult = findToolResult(translated);
  assert.ok(toolResult);
  const image = (toolResult.content as Array<Record<string, unknown>>).find(
    (block) => block.type === "image"
  );
  assert.ok(image);
  assert.equal((image.source as { type?: string; media_type?: string }).media_type, "image/png");
});
