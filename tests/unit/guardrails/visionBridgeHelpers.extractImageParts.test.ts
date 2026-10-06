/**
 * Tests for extractImageParts helper function.
 */

import test from "node:test";
import assert from "node:assert/strict";
import { extractImageParts } from "@/lib/guardrails/visionBridgeHelpers";

interface RequestMessage {
  role?: string;
  content?: string | RequestContentPart[];
}

type RequestContentPart =
  | { type: "text"; text: string }
  | { type: "image_url"; image_url: { url: string; detail?: string } }
  | {
      type: "image";
      source: { type: "base64"; media_type: string; data: string } | { type: "url"; url: string };
    };

test("extractImageParts returns empty array for messages without images", () => {
  const messages: RequestMessage[] = [{ role: "user", content: "Hello, how are you?" }];
  const result = extractImageParts(messages);
  assert.deepStrictEqual(result, []);
});

test("extractImageParts detects image_url format", () => {
  const messages: RequestMessage[] = [
    {
      role: "user",
      content: [
        { type: "text", text: "What is in this image?" },
        { type: "image_url", image_url: { url: "https://example.com/image.png" } },
      ],
    },
  ];
  const result = extractImageParts(messages);
  assert.strictEqual(result.length, 1);
  assert.strictEqual(result[0].messageIndex, 0);
  assert.strictEqual(result[0].partIndex, 1);
  assert.strictEqual(result[0].imageUrl, "https://example.com/image.png");
  assert.strictEqual(result[0].imageType, "image_url");
});

test("extractImageParts detects base64 image format", () => {
  const messages: RequestMessage[] = [
    {
      role: "user",
      content: [
        {
          type: "image",
          source: {
            type: "base64",
            media_type: "image/png",
            data: "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==",
          },
        },
      ],
    },
  ];
  const result = extractImageParts(messages);
  assert.strictEqual(result.length, 1);
  assert.strictEqual(result[0].imageType, "image");
  assert.ok(result[0].imageUrl.startsWith("data:image/png;base64,"));
});

test("extractImageParts handles multiple images in single message", () => {
  const messages: RequestMessage[] = [
    {
      role: "user",
      content: [
        { type: "text", text: "Compare these images" },
        { type: "image_url", image_url: { url: "https://example.com/image1.png" } },
        { type: "image_url", image_url: { url: "https://example.com/image2.png" } },
      ],
    },
  ];
  const result = extractImageParts(messages);
  assert.strictEqual(result.length, 2);
  assert.strictEqual(result[0].partIndex, 1);
  assert.strictEqual(result[1].partIndex, 2);
});

test("extractImageParts handles images across multiple messages", () => {
  const messages: RequestMessage[] = [
    {
      role: "user",
      content: [{ type: "image_url", image_url: { url: "https://example.com/image1.png" } }],
    },
    { role: "assistant", content: "Here is analysis of the first image." },
    {
      role: "user",
      content: [{ type: "image_url", image_url: { url: "https://example.com/image2.png" } }],
    },
  ];
  const result = extractImageParts(messages);
  assert.strictEqual(result.length, 2);
  assert.strictEqual(result[0].messageIndex, 0);
  assert.strictEqual(result[1].messageIndex, 2);
});

test("extractImageParts handles empty messages array", () => {
  const result = extractImageParts([]);
  assert.deepStrictEqual(result, []);
});

test("extractImageParts handles messages with null/undefined content", () => {
  const messages: RequestMessage[] = [
    { role: "user", content: null as unknown as RequestContentPart[] },
    { role: "user", content: undefined as unknown as RequestContentPart[] },
  ];
  const result = extractImageParts(messages);
  assert.deepStrictEqual(result, []);
});

test("extractImageParts handles data URI image_url format", () => {
  const dataUri =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==";
  const messages: RequestMessage[] = [
    { role: "user", content: [{ type: "image_url", image_url: { url: dataUri } }] },
  ];
  const result = extractImageParts(messages);
  assert.strictEqual(result.length, 1);
  assert.strictEqual(result[0].imageUrl, dataUri);
});

test("extractImageParts preserves order of images", () => {
  const messages: RequestMessage[] = [
    {
      role: "user",
      content: [
        { type: "text", text: "First" },
        { type: "image_url", image_url: { url: "https://example.com/A.png" } },
        { type: "text", text: "Second" },
        { type: "image_url", image_url: { url: "https://example.com/B.png" } },
        { type: "image_url", image_url: { url: "https://example.com/C.png" } },
      ],
    },
  ];
  const result = extractImageParts(messages);
  assert.strictEqual(result.length, 3);
  assert.strictEqual(result[0].partIndex, 1);
  assert.strictEqual(result[1].partIndex, 3);
  assert.strictEqual(result[2].partIndex, 4);
});

test("extractImageParts detects Anthropic-style image source url", () => {
  // Zoo Code / Claude-Code-compatible clients can send
  // { type: "image", source: { type: "url", url } } to the OpenAI surface.
  const messages: RequestMessage[] = [
    {
      role: "user",
      content: [
        { type: "text", text: "What's in this?" },
        {
          type: "image",
          source: { type: "url", url: "https://example.com/photo.png" },
        },
      ],
    },
  ];
  const result = extractImageParts(messages);
  assert.strictEqual(result.length, 1);
  assert.strictEqual(result[0].imageUrl, "https://example.com/photo.png");
  assert.strictEqual(result[0].imageType, "url");
  assert.strictEqual(result[0].messageIndex, 0);
  assert.strictEqual(result[0].partIndex, 1);
});

test("extractImageParts ignores image source url when url is empty", () => {
  const messages: RequestMessage[] = [
    {
      role: "user",
      content: [
        { type: "image", source: { type: "url", url: "" } },
        { type: "text", text: "No image here" },
      ],
    },
  ];
  const result = extractImageParts(messages);
  assert.deepStrictEqual(result, []);
});

test("extractImageParts supports both base64 and url source blocks in one message", () => {
  const messages: RequestMessage[] = [
    {
      role: "user",
      content: [
        {
          type: "image",
          source: { type: "base64", media_type: "image/png", data: "AAA=" },
        },
        {
          type: "image",
          source: { type: "url", url: "https://example.com/B.png" },
        },
      ],
    },
  ];
  const result = extractImageParts(messages);
  assert.strictEqual(result.length, 2);
  assert.strictEqual(result[0].imageType, "image");
  assert.strictEqual(result[0].imageUrl, "data:image/png;base64,AAA=");
  assert.strictEqual(result[1].imageType, "url");
  assert.strictEqual(result[1].imageUrl, "https://example.com/B.png");
});

test("extractImageParts extracts a base64 image nested inside a tool_result content array", () => {
  // Claude Code sends tool-result images as {type:"image", source:{base64}}
  // inside the tool_result part's OWN content array (nested, not top-level).
  const messages = [
    {
      role: "user",
      content: [
        {
          type: "tool_result",
          tool_use_id: "toolu_01",
          content: [
            {
              type: "image",
              source: { type: "base64", media_type: "image/png", data: "AAA=" },
            },
          ],
        },
        { type: "text", text: "[Image description]" },
      ],
    },
  ] as unknown as RequestMessage[];

  const result = extractImageParts(messages);
  assert.strictEqual(result.length, 1);
  assert.strictEqual(result[0].messageIndex, 0);
  assert.strictEqual(result[0].partIndex, 0);
  assert.strictEqual(result[0].imageUrl, "data:image/png;base64,AAA=");
  assert.strictEqual(result[0].imageType, "image");
  assert.deepStrictEqual(result[0].path, ["content", 0]);
});

test("extractImageParts keeps document order when nested and top-level images mix", () => {
  const messages = [
    {
      role: "user",
      content: [
        {
          type: "tool_result",
          tool_use_id: "toolu_02",
          content: [{ type: "image_url", image_url: { url: "https://example.com/in.png" } }],
        },
        { type: "image_url", image_url: { url: "https://example.com/top.png" } },
      ],
    },
  ] as unknown as RequestMessage[];

  const result = extractImageParts(messages);
  assert.strictEqual(result.length, 2);
  // Nested hit first, with a path pointing into the tool_result content.
  assert.strictEqual(result[0].imageUrl, "https://example.com/in.png");
  assert.deepStrictEqual(result[0].path, ["content", 0]);
  // Top-level hit second, no path (plain partIndex splice).
  assert.strictEqual(result[1].imageUrl, "https://example.com/top.png");
  assert.strictEqual(result[1].path, undefined);
});
