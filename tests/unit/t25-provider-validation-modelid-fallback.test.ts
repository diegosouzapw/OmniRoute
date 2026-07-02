import test from "node:test";
import assert from "node:assert/strict";

const { validateProviderApiKey } = await import("../../src/lib/providers/validation.ts");

test("T25: openai-compatible validation succeeds directly when /models works", async () => {
  const originalFetch = globalThis.fetch;
  const calls = [];

  globalThis.fetch = async (url) => {
    calls.push(String(url));
    return new Response(JSON.stringify({ data: [] }), { status: 200 });
  };

  try {
    const result = await validateProviderApiKey({
      provider: "openai-compatible-chat-t25-models-ok",
      apiKey: "sk-test",
      providerSpecificData: { baseUrl: "https://api.example.com/v1" },
    });

    assert.equal(result.valid, true);
    assert.equal(result.method, "models_endpoint");
    assert.equal(calls.length, 1);
    assert.equal(calls[0], "https://api.example.com/v1/models");
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("T25: /models unavailable without Model ID returns actionable guidance", async () => {
  const originalFetch = globalThis.fetch;
  let callCount = 0;

  globalThis.fetch = async () => {
    callCount += 1;
    return new Response(JSON.stringify({ error: "Not Found" }), { status: 404 });
  };

  try {
    const result = await validateProviderApiKey({
      provider: "openai-compatible-chat-t25-no-model-id",
      apiKey: "sk-test",
      providerSpecificData: { baseUrl: "https://api.example.com/v1" },
    });

    assert.equal(result.valid, false);
    assert.match(result.error, /Provide a Model ID/i);
    // Must stop after /models when no custom model was provided.
    assert.equal(callCount, 1);
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("T25: fallback chat probe detects invalid credentials with custom Model ID", async () => {
  const originalFetch = globalThis.fetch;
  const calls = [];

  globalThis.fetch = async (url) => {
    calls.push(String(url));
    if (String(url).endsWith("/models")) {
      return new Response(JSON.stringify({ error: "Not Found" }), { status: 404 });
    }
    return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
  };

  try {
    const result = await validateProviderApiKey({
      provider: "openai-compatible-chat-t25-auth",
      apiKey: "bad-key",
      providerSpecificData: {
        baseUrl: "https://api.example.com/v1",
        validationModelId: "grok-3",
      },
    });

    assert.equal(result.valid, false);
    assert.equal(result.error, "Invalid API key");
    assert.deepEqual(calls, [
      "https://api.example.com/v1/models",
      "https://api.example.com/v1/chat/completions",
    ]);
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("T25: fallback chat probe treats 429 as valid credentials with warning", async () => {
  const originalFetch = globalThis.fetch;

  globalThis.fetch = async (url) => {
    if (String(url).endsWith("/models")) {
      throw new Error("connect ECONNREFUSED");
    }
    return new Response(JSON.stringify({ error: "Rate limited" }), { status: 429 });
  };

  try {
    const result = await validateProviderApiKey({
      provider: "openai-compatible-chat-t25-rate-limit",
      apiKey: "sk-test",
      providerSpecificData: {
        baseUrl: "https://api.example.com/v1",
        validationModelId: "meta-llama/Llama-3.1-8B-Instruct",
      },
    });

    assert.equal(result.valid, true);
    assert.equal(result.error, null);
    assert.equal(result.method, "chat_completions");
    assert.match(result.warning, /Rate limited/i);
  } finally {
    globalThis.fetch = originalFetch;
  }
});
