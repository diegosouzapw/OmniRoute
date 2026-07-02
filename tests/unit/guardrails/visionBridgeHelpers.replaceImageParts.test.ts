/**
 * Tests for replaceImageParts helper function.
 */

import test from "node:test";
import assert from "node:assert/strict";
import { replaceImageParts } from "@/lib/guardrails/visionBridgeHelpers";

test("replaceImageParts replaces single image with description", () => {
  const body = {
    model: "minimax/minimax-01",
    messages: [
      {
        role: "user",
        content: [
          { type: "text", text: "What is in this image?" },
          { type: "image_url", image_url: { url: "https://example.com/image.png" } },
        ],
      },
    ],
  };

  const descriptions = ["[Image 1]: A beautiful sunset"];

  const result = replaceImageParts(body, descriptions);

  // Should have original text preserved
  const content = result.messages[0].content as Array<{ type: string; text?: string }>;
  assert.strictEqual(content[0].type, "text");
  assert.strictEqual(content[0].text, "What is in this image?");

  // Should have description instead of image
  assert.strictEqual(content[1].type, "text");
  assert.strictEqual(content[1].text, "[Image 1]: A beautiful sunset");
});

test("replaceImageParts replaces multiple images with descriptions", () => {
  const body = {
    model: "minimax/minimax-01",
    messages: [
      {
        role: "user",
        content: [
          { type: "text", text: "Compare these images" },
          { type: "image_url", image_url: { url: "https://example.com/A.png" } },
          { type: "image_url", image_url: { url: "https://example.com/B.png" } },
          { type: "image_url", image_url: { url: "https://example.com/C.png" } },
        ],
      },
    ],
  };

  const descriptions = ["[Image 1]: A cat", "[Image 2]: A dog", "[Image 3]: A bird"];

  const result = replaceImageParts(body, descriptions);

  const content = result.messages[0].content as Array<{ type: string; text?: string }>;
  assert.strictEqual(content[0].type, "text");
  assert.strictEqual(content[0].text, "Compare these images");
  assert.strictEqual(content[1].type, "text");
  assert.strictEqual(content[1].text, "[Image 1]: A cat");
  assert.strictEqual(content[2].type, "text");
  assert.strictEqual(content[2].text, "[Image 2]: A dog");
  assert.strictEqual(content[3].type, "text");
  assert.strictEqual(content[3].text, "[Image 3]: A bird");
});

test("replaceImageParts handles empty descriptions array", () => {
  const body = {
    model: "minimax/minimax-01",
    messages: [
      {
        role: "user",
        content: [
          { type: "text", text: "Hello" },
          { type: "image_url", image_url: { url: "https://example.com/image.png" } },
        ],
      },
    ],
  };

  const result = replaceImageParts(body, []);

  // Original should be unchanged
  const content = result.messages[0].content as Array<{ type: string }>;
  assert.strictEqual(content[1].type, "image_url");
});

test("replaceImageParts preserves non-image content", () => {
  const body = {
    model: "minimax/minimax-01",
    messages: [
      {
        role: "system",
        content: "You are a helpful assistant.",
      },
      {
        role: "user",
        content: [
          { type: "text", text: "Analyze this" },
          { type: "image_url", image_url: { url: "https://example.com/image.png" } },
        ],
      },
      {
        role: "assistant",
        content: "I can see the image shows a sunset.",
      },
    ],
  };

  const result = replaceImageParts(body, ["[Image 1]: A sunset over the ocean"]);

  // System message should be unchanged
  assert.strictEqual(result.messages[0].content, "You are a helpful assistant.");

  // Assistant message should be unchanged
  assert.strictEqual(result.messages[2].content, "I can see the image shows a sunset.");
});

test("replaceImageParts handles base64 images", () => {
  const body = {
    model: "minimax/minimax-01",
    messages: [
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
    ],
  };

  const descriptions = ["[Image 1]: A red circle"];

  const result = replaceImageParts(body, descriptions);

  const content = result.messages[0].content as Array<{ type: string; text?: string }>;
  assert.strictEqual(content[0].type, "text");
  assert.strictEqual(content[0].text, "[Image 1]: A red circle");
});

test("replaceImageParts handles undefined descriptions", () => {
  const body = {
    model: "test",
    messages: [
      {
        role: "user",
        content: [
          { type: "text", text: "Hello" },
          { type: "image_url", image_url: { url: "https://example.com/image.png" } },
        ],
      },
    ],
  };

  const result = replaceImageParts(body, undefined as unknown as string[]);

  // Should return original body when descriptions is undefined
  const content = result.messages[0].content as Array<{ type: string }>;
  assert.strictEqual(content[1].type, "image_url");
});

test("replaceImageParts handles empty messages array", () => {
  const body = {
    model: "test",
    messages: [],
  };

  const descriptions = ["[Image 1]: Description"];
  const result = replaceImageParts(body, descriptions);

  assert.deepStrictEqual(result.messages, []);
});

test("replaceImageParts handles messages without content array", () => {
  const body = {
    model: "test",
    messages: [
      { role: "user", content: "Just a text message" },
      {
        role: "user",
        content: [{ type: "image_url", image_url: { url: "https://example.com/image.png" } }],
      },
    ],
  };

  const descriptions = ["[Image 1]: Description"];
  const result = replaceImageParts(body, descriptions);

  // First message (string content) should be unchanged
  assert.strictEqual(result.messages[0].content, "Just a text message");

  // Second message should have image replaced
  const content = result.messages[1].content as Array<{ type: string; text?: string }>;
  assert.strictEqual(content[0].type, "text");
  assert.strictEqual(content[0].text, "[Image 1]: Description");
});

test("replaceImageParts does not modify original body", () => {
  const body = {
    model: "minimax/minimax-01",
    messages: [
      {
        role: "user",
        content: [
          { type: "text", text: "Original" },
          { type: "image_url", image_url: { url: "https://example.com/image.png" } },
        ],
      },
    ],
  };

  const descriptions = ["[Image 1]: Modified"];
  replaceImageParts(body, descriptions);

  // Original should be unchanged
  const content = body.messages[0].content as Array<{ type: string }>;
  assert.strictEqual(content[1].type, "image_url");
});

test("replaceImageParts handles mixed images and text", () => {
  const body = {
    model: "test",
    messages: [
      {
        role: "user",
        content: [
          { type: "image_url", image_url: { url: "https://example.com/first.png" } },
          { type: "text", text: "between images" },
          { type: "image_url", image_url: { url: "https://example.com/second.png" } },
        ],
      },
    ],
  };

  const descriptions = ["[Image 1]: First image", "[Image 2]: Second image"];
  const result = replaceImageParts(body, descriptions);

  const content = result.messages[0].content as Array<{ type: string; text?: string }>;
  assert.strictEqual(content[0].type, "text");
  assert.strictEqual(content[0].text, "[Image 1]: First image");
  assert.strictEqual(content[1].type, "text");
  assert.strictEqual(content[1].text, "between images");
  assert.strictEqual(content[2].type, "text");
  assert.strictEqual(content[2].text, "[Image 2]: Second image");
});
