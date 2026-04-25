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
  | { type: "image"; source: { type: "base64"; media_type: string; data: string } };

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
