/**
 * Tests for callVisionModel helper function.
 */

import test from "node:test";
import assert from "node:assert/strict";
import { callVisionModel, type VisionModelConfig } from "@/lib/guardrails/visionBridgeHelpers";

// Store original fetch
const originalFetch = globalThis.fetch;

test("callVisionModel returns description on success", async () => {
  // Mock global fetch
  const mockResponse = {
    ok: true,
    json: async () => ({
      choices: [{ message: { content: "A beautiful sunset over the ocean" } }],
    }),
  };
  globalThis.fetch = async () => mockResponse as unknown as Response;

  try {
    const config: VisionModelConfig = {
      model: "openai/gpt-4o-mini",
      prompt: "Describe this image",
      timeoutMs: 30000,
      maxImages: 10,
    };

    const result = await callVisionModel(
      "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==",
      config
    );

    assert.strictEqual(result, "A beautiful sunset over the ocean");
  } finally {
    // Restore original fetch
    globalThis.fetch = originalFetch;
  }
});

test("callVisionModel throws on HTTP error", async () => {
  const mockResponse = {
    ok: false,
    status: 500,
    text: async () => "Internal Server Error",
  };
  globalThis.fetch = async () => mockResponse as unknown as Response;

  try {
    const config: VisionModelConfig = {
      model: "openai/gpt-4o-mini",
      prompt: "Describe this image",
      timeoutMs: 30000,
      maxImages: 10,
    };

    await assert.rejects(
      async () => await callVisionModel("data:image/png;base64,iVBORw0KGgo", config),
      /Vision API error 500/
    );
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("callVisionModel throws on API error response", async () => {
  const mockResponse = {
    ok: true,
    json: async () => ({
      error: { message: "Invalid API key" },
    }),
  };
  globalThis.fetch = async () => mockResponse as unknown as Response;

  try {
    const config: VisionModelConfig = {
      model: "openai/gpt-4o-mini",
      prompt: "Describe this image",
      timeoutMs: 30000,
      maxImages: 10,
    };

    await assert.rejects(
      async () => await callVisionModel("data:image/png;base64,iVBORw0KGgo", config),
      /Invalid API key/
    );
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("callVisionModel throws on empty response", async () => {
  const mockResponse = {
    ok: true,
    json: async () => ({
      choices: [{}],
    }),
  };
  globalThis.fetch = async () => mockResponse as unknown as Response;

  try {
    const config: VisionModelConfig = {
      model: "openai/gpt-4o-mini",
      prompt: "Describe this image",
      timeoutMs: 30000,
      maxImages: 10,
    };

    await assert.rejects(
      async () => await callVisionModel("data:image/png;base64,iVBORw0KGgo", config),
      /empty or invalid/
    );
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("callVisionModel trims whitespace from response", async () => {
  const mockResponse = {
    ok: true,
    json: async () => ({
      choices: [{ message: { content: "  A test description  " } }],
    }),
  };
  globalThis.fetch = async () => mockResponse as unknown as Response;

  try {
    const config: VisionModelConfig = {
      model: "openai/gpt-4o-mini",
      prompt: "Describe this image",
      timeoutMs: 30000,
      maxImages: 10,
    };

    const result = await callVisionModel("data:image/png;base64,iVBORw0KGgo", config);
    assert.strictEqual(result, "A test description");
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("callVisionModel passes custom API key", async () => {
  let capturedHeaders: Record<string, string> = {};

  const mockResponse = {
    ok: true,
    json: async () => ({
      choices: [{ message: { content: "Description" } }],
    }),
  };

  globalThis.fetch = async (url: URL | RequestInfo, init?: RequestInit) => {
    if (init?.headers) {
      capturedHeaders = init.headers as Record<string, string>;
    }
    return mockResponse as unknown as Response;
  };

  try {
    const config: VisionModelConfig = {
      model: "openai/gpt-4o-mini",
      prompt: "Describe this image",
      timeoutMs: 30000,
      maxImages: 10,
    };

    await callVisionModel("data:image/png;base64,iVBORw0KGgo", config, "sk-custom-key");

    assert.strictEqual(capturedHeaders["Authorization"], "Bearer sk-custom-key");
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("callVisionModel uses correct request body format", async () => {
  let capturedBody: Record<string, unknown> = {};

  const mockResponse = {
    ok: true,
    json: async () => ({
      choices: [{ message: { content: "Description" } }],
    }),
  };

  globalThis.fetch = async (url: URL | RequestInfo, init?: RequestInit) => {
    if (init?.body) {
      capturedBody = JSON.parse(init.body as string);
    }
    return mockResponse as unknown as Response;
  };

  try {
    const config: VisionModelConfig = {
      model: "openai/gpt-4o-mini",
      prompt: "What is in this image?",
      timeoutMs: 30000,
      maxImages: 10,
    };

    const imageUri = "data:image/png;base64,test123";
    await callVisionModel(imageUri, config);

    // Verify request structure
    assert.strictEqual(capturedBody.model, "gpt-4o-mini");
    assert.ok(Array.isArray(capturedBody.messages));
    assert.strictEqual((capturedBody.messages as unknown[]).length, 1);

    const message = (capturedBody.messages as Array<{ role: string; content: unknown[] }>)[0];
    assert.strictEqual(message.role, "user");
    assert.ok(Array.isArray(message.content));
    assert.strictEqual(message.content.length, 2);

    // First content is image_url
    const imagePart = message.content[0] as {
      type: string;
      image_url: { url: string; detail: string };
    };
    assert.strictEqual(imagePart.type, "image_url");
    assert.strictEqual(imagePart.image_url.url, imageUri);
    assert.strictEqual(imagePart.image_url.detail, "low");

    // Second content is text prompt
    const textPart = message.content[1] as { type: string; text: string };
    assert.strictEqual(textPart.type, "text");
    assert.strictEqual(textPart.text, "What is in this image?");
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("callVisionModel fetches remote images before Anthropic requests", async () => {
  const fetchCalls: Array<{ url: string; init?: RequestInit }> = [];

  globalThis.fetch = async (url: URL | RequestInfo, init?: RequestInit) => {
    const requestUrl = String(url);
    fetchCalls.push({ url: requestUrl, init });

    if (requestUrl === "https://cdn.example.com/cat.png") {
      return new Response(Buffer.from("cat-image-bytes"), {
        status: 200,
        headers: { "Content-Type": "image/png" },
      });
    }

    return new Response(
      JSON.stringify({
        content: [{ type: "text", text: "A cat sitting on a chair" }],
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  };

  try {
    const config: VisionModelConfig = {
      model: "anthropic/claude-3-haiku",
      prompt: "Describe this image",
      timeoutMs: 30000,
      maxImages: 10,
    };

    const result = await callVisionModel("https://cdn.example.com/cat.png", config, "sk-ant");

    assert.strictEqual(result, "A cat sitting on a chair");
    assert.strictEqual(fetchCalls.length, 2);
    assert.strictEqual(fetchCalls[0].url, "https://cdn.example.com/cat.png");
    assert.strictEqual(fetchCalls[1].url, "https://api.anthropic.com/v1/messages");

    const anthropicBody = JSON.parse(fetchCalls[1].init?.body as string);
    const imageSource = anthropicBody.messages[0].content[0].source;
    assert.strictEqual(imageSource.type, "base64");
    assert.strictEqual(imageSource.media_type, "image/png");
    assert.strictEqual(imageSource.data, Buffer.from("cat-image-bytes").toString("base64"));
  } finally {
    globalThis.fetch = originalFetch;
  }
});
