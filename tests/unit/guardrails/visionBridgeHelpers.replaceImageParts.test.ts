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

test("replaceImageParts replaces an image nested inside tool_result content", () => {
  const body = {
    model: "deepseek-ai/DeepSeek-V4-Flash-0731",
    messages: [
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
    ],
  };

  const result = replaceImageParts(body, ["[Image 1]: A screenshot of the OmniRoute dashboard"]);

  const toolResult = result.messages[0].content[0] as {
    type: string;
    content: Array<{ type: string; text?: string }>;
  };
  assert.strictEqual(toolResult.type, "tool_result");
  assert.deepStrictEqual(toolResult.content, [
    { type: "text", text: "[Image 1]: A screenshot of the OmniRoute dashboard" },
  ]);
  // Sibling text preserved.
  assert.strictEqual(result.messages[0].content[1].type, "text");
  assert.strictEqual(result.messages[0].content[1].text, "[Image description]");
});

test("replaceImageParts consumes descriptions in document order for nested and top-level images", () => {
  const body = {
    model: "deepseek-ai/DeepSeek-V4-Flash-0731",
    messages: [
      {
        role: "user",
        content: [
          {
            type: "tool_result",
            tool_use_id: "a",
            content: [{ type: "image_url", image_url: { url: "https://x/a.png" } }],
          },
          { type: "image_url", image_url: { url: "https://x/b.png" } },
          {
            type: "tool_result",
            tool_use_id: "c",
            content: [{ type: "image_url", image_url: { url: "https://x/c.png" } }],
          },
        ],
      },
    ],
  };

  const result = replaceImageParts(body, ["DA", "DB", "DC"]);
  const content = result.messages[0].content as Array<{
    type: string;
    content?: Array<{ type: string; text?: string }>;
    text?: string;
  }>;
  // part[0] tool_result → nested a → DA
  assert.strictEqual(content[0].content?.[0].text, "DA");
  // part[1] top-level b → DB
  assert.strictEqual(content[1].text, "DB");
  // part[2] tool_result → nested c → DC
  assert.strictEqual(content[2].content?.[0].text, "DC");
});

test("replaceImageParts keeps a nested image when its description is null (#4012)", () => {
  const body = {
    model: "deepseek-ai/DeepSeek-V4-Flash-0731",
    messages: [
      {
        role: "user",
        content: [
          {
            type: "tool_result",
            tool_use_id: "a",
            content: [{ type: "image_url", image_url: { url: "https://x/a.png" } }],
          },
        ],
      },
    ],
  };

  const result = replaceImageParts(body, [null]);
  const toolResult = result.messages[0].content[0] as { content: Array<{ type: string }> };
  assert.strictEqual(toolResult.content[0].type, "image_url");
});
