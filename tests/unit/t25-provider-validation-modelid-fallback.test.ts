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

// decolua/9router#2032: OpenAI-compatible "Check" silently passed for ANY
// non-empty Model ID because a chat-probe 404 (model_not_found) fell through
// the generic "4xx other than auth" branch with no warning. The user only
// discovered the bad model id after a real request tripped the per-model
// lockout. A 404 must surface a warning at Check time instead of a bare pass.
test("T25 / #2032: fallback chat probe surfaces a warning on 404 model_not_found", async () => {
  const originalFetch = globalThis.fetch;

  globalThis.fetch = async (url) => {
    if (String(url).endsWith("/models")) {
      return new Response(JSON.stringify({ error: "Not Found" }), { status: 404 });
    }
    return new Response(
      JSON.stringify({
        error: {
          message: "The model glm-5.2 does not exist.",
          type: "invalid_request_error",
          param: null,
          code: "model_not_found",
        },
      }),
      { status: 404 }
    );
  };

  try {
    const result = await validateProviderApiKey({
      provider: "openai-compatible-chat-t25-model-not-found",
      apiKey: "sk-test",
      providerSpecificData: {
        baseUrl: "https://api.example.com/v1",
        validationModelId: "glm-5.2",
      },
    });

    // Credentials themselves are fine (404 is not an auth failure), so this
    // still resolves as valid — but MUST carry an actionable warning instead
    // of a silent pass, so the user learns about the bad model id at Check
    // time rather than after the first real request gets locked out.
    assert.equal(result.valid, true);
    assert.equal(result.method, "inference_available");
    assert.match(result.warning, /model.*(?:not found|does not exist|glm-5\.2)/i);
  } finally {
    globalThis.fetch = originalFetch;
  }
});
