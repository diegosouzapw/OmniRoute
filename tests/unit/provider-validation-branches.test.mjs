import test from "node:test";
import assert from "node:assert/strict";

const { validateProviderApiKey } = await import("../../src/lib/providers/validation.ts");

const originalFetch = globalThis.fetch;

test.afterEach(() => {
  globalThis.fetch = originalFetch;
});

test("validateProviderApiKey rejects missing provider or API key", async () => {
  const result = await validateProviderApiKey({ provider: "", apiKey: "" });

  assert.equal(result.valid, false);
  assert.equal(result.error, "Provider and API key required");
  assert.equal(result.unsupported, false);
});

test("validateProviderApiKey returns unsupported for unknown providers", async () => {
  const result = await validateProviderApiKey({
    provider: "definitely-unknown-provider",
    apiKey: "sk-test",
  });

  assert.equal(result.valid, false);
  assert.equal(result.error, "Provider validation not supported");
  assert.equal(result.unsupported, true);
});

test("openai-compatible validation reports missing base URL", async () => {
  const result = await validateProviderApiKey({
    provider: "openai-compatible-missing-base",
    apiKey: "sk-test",
    providerSpecificData: {},
  });

  assert.equal(result.valid, false);
  assert.match(result.error, /No base URL configured/i);
});

test("openai-compatible validation accepts rate-limited /models responses", async () => {
  const calls = [];
  globalThis.fetch = async (url) => {
    calls.push(String(url));
    return new Response(JSON.stringify({ error: "rate limited" }), { status: 429 });
  };

  const result = await validateProviderApiKey({
    provider: "openai-compatible-rate-limit",
    apiKey: "sk-test",
    providerSpecificData: { baseUrl: "https://api.example.com/v1" },
  });

  assert.equal(result.valid, true);
  assert.equal(result.method, "models_endpoint");
  assert.match(result.warning, /Rate limited/i);
  assert.deepEqual(calls, ["https://api.example.com/v1/models"]);
});

test("openai-compatible validation treats chat 400 as authenticated fallback", async () => {
  const calls = [];
  globalThis.fetch = async (url) => {
    calls.push(String(url));
    if (String(url).endsWith("/models")) {
      return new Response(JSON.stringify({ error: "server error" }), { status: 500 });
    }

    return new Response(JSON.stringify({ error: "bad model" }), { status: 400 });
  };

  const result = await validateProviderApiKey({
    provider: "openai-compatible-fallback-chat",
    apiKey: "sk-test",
    providerSpecificData: {
      baseUrl: "https://api.example.com/v1",
      validationModelId: "custom-model",
    },
  });

  assert.equal(result.valid, true);
  assert.equal(result.method, "inference_available");
  assert.match(result.warning, /Model ID may be invalid/i);
  assert.deepEqual(calls, [
    "https://api.example.com/v1/models",
    "https://api.example.com/v1/chat/completions",
  ]);
});

test("openai-compatible validation returns actionable connection failure when probes fail", async () => {
  globalThis.fetch = async () => {
    throw new Error("socket hang up");
  };

  const result = await validateProviderApiKey({
    provider: "openai-compatible-network-error",
    apiKey: "sk-test",
    providerSpecificData: {
      baseUrl: "https://api.example.com/v1",
      validationModelId: "custom-model",
    },
  });

  assert.equal(result.valid, false);
  assert.equal(result.error, "Connection failed while testing /chat/completions");
});

test("anthropic-compatible validation requires a base URL", async () => {
  const result = await validateProviderApiKey({
    provider: "anthropic-compatible-no-base",
    apiKey: "sk-test",
    providerSpecificData: {},
  });

  assert.equal(result.valid, false);
  assert.match(result.error, /No base URL configured/i);
});

test("anthropic-compatible validation rejects invalid keys from /models", async () => {
  const calls = [];
  globalThis.fetch = async (url) => {
    calls.push(String(url));
    return new Response(JSON.stringify({ error: "forbidden" }), { status: 403 });
  };

  const result = await validateProviderApiKey({
    provider: "anthropic-compatible-bad-key",
    apiKey: "sk-test",
    providerSpecificData: { baseUrl: "https://api.example.com/v1/messages" },
  });

  assert.equal(result.valid, false);
  assert.equal(result.error, "Invalid API key");
  assert.deepEqual(calls, ["https://api.example.com/v1/models"]);
});

test("anthropic-compatible validation falls back to /messages and treats 400 as auth success", async () => {
  const calls = [];
  globalThis.fetch = async (url) => {
    calls.push(String(url));
    if (String(url).endsWith("/models")) {
      throw new Error("models endpoint unavailable");
    }

    return new Response(JSON.stringify({ error: "bad request" }), { status: 400 });
  };

  const result = await validateProviderApiKey({
    provider: "anthropic-compatible-fallback",
    apiKey: "sk-test",
    providerSpecificData: {
      baseUrl: "https://api.example.com/v1/messages",
      validationModelId: "claude-custom",
    },
  });

  assert.equal(result.valid, true);
  assert.equal(result.error, null);
  assert.deepEqual(calls, [
    "https://api.example.com/v1/models",
    "https://api.example.com/v1/messages",
  ]);
});

test("registry openai-like providers report unsupported validation endpoints on 404 chat probes", async () => {
  const calls = [];
  globalThis.fetch = async (url) => {
    calls.push(String(url));
    return new Response(JSON.stringify({ error: "not found" }), { status: 404 });
  };

  const result = await validateProviderApiKey({
    provider: "openai",
    apiKey: "sk-test",
  });

  assert.equal(result.valid, false);
  assert.equal(result.error, "Provider validation endpoint not supported");
  assert.deepEqual(calls, [
    "https://api.openai.com/v1/models",
    "https://api.openai.com/v1/chat/completions",
  ]);
});

test("gemini validation rejects invalid API keys", async () => {
  const calls = [];
  globalThis.fetch = async (url) => {
    calls.push(String(url));
    return new Response(JSON.stringify({ error: "unauthorized" }), { status: 401 });
  };

  const result = await validateProviderApiKey({
    provider: "gemini",
    apiKey: "bad-key",
  });

  assert.equal(result.valid, false);
  assert.equal(result.error, "Invalid API key");
  assert.equal(calls.length, 1);
  assert.match(calls[0], /generativelanguage\.googleapis\.com/);
  assert.match(calls[0], /key=bad-key/);
});
