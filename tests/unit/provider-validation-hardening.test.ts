import test from "node:test";
import assert from "node:assert/strict";

const { validateProviderApiKey, validateClaudeCodeCompatibleProvider } =
  await import("../../src/lib/providers/validation.ts");

const originalFetch = globalThis.fetch;

test.afterEach(() => {
  globalThis.fetch = originalFetch;
});

test("openai-compatible validation covers chat 429 fallback after a failed /models probe", async () => {
  const calls = [];
  globalThis.fetch = async (url) => {
    calls.push(String(url));
    if (String(url).endsWith("/models")) {
      return new Response(JSON.stringify({ error: "server error" }), { status: 500 });
    }
    return new Response(JSON.stringify({ error: "rate limited" }), { status: 429 });
  };

  const result = await validateProviderApiKey({
    provider: "openai-compatible-chat-rate-limit",
    apiKey: "sk-test",
    providerSpecificData: {
      baseUrl: "https://compat.example.com/v1",
      validationModelId: "gpt-hardening",
    },
  });

  assert.equal(result.valid, true);
  assert.equal(result.method, "chat_completions");
  assert.match(result.warning, /Rate limited/i);
  assert.deepEqual(calls, [
    "https://compat.example.com/v1/models",
    "https://compat.example.com/v1/chat/completions",
  ]);
});

test("openai-compatible validation covers final ping fallback when chat probing fails", async () => {
  const calls = [];
  globalThis.fetch = async (url) => {
    calls.push(String(url));
    if (String(url).endsWith("/models")) {
      return new Response(JSON.stringify({ error: "server error" }), { status: 500 });
    }
    if (String(url).endsWith("/chat/completions")) {
      throw new Error("chat probe offline");
    }
    return new Response("gateway down", { status: 503 });
  };

  const result = await validateProviderApiKey({
    provider: "openai-compatible-ping-503",
    apiKey: "sk-test",
    providerSpecificData: {
      baseUrl: "https://compat.example.com/v1",
      validationModelId: "gpt-hardening",
    },
  });

  assert.equal(result.valid, false);
  assert.equal(result.error, "Provider unavailable (503)");
  assert.deepEqual(calls, [
    "https://compat.example.com/v1/models",
    "https://compat.example.com/v1/chat/completions",
    "https://compat.example.com/v1",
  ]);
});

test("gemini validation distinguishes non-auth 400 responses from auth failures and server errors", async () => {
  globalThis.fetch = async () =>
    new Response(
      JSON.stringify({
        error: {
          code: 400,
          message: "Model parameter is malformed",
          status: "INVALID_ARGUMENT",
          details: [],
        },
      }),
      { status: 400 }
    );

  const invalidRequest = await validateProviderApiKey({
    provider: "gemini",
    apiKey: "gem-key",
  });
  assert.equal(invalidRequest.valid, false);
  assert.equal(invalidRequest.error, "Validation failed: 400");

  globalThis.fetch = async () =>
    new Response(
      JSON.stringify({
        error: {
          code: 503,
          message: "Service unavailable",
          status: "UNAVAILABLE",
        },
      }),
      { status: 503 }
    );

  const unavailable = await validateProviderApiKey({
    provider: "gemini",
    apiKey: "gem-key",
  });
  assert.equal(unavailable.valid, false);
  assert.equal(unavailable.error, "Validation failed: 503");
});

test("Claude Code compatible validation surfaces bridge connection failures", async () => {
  globalThis.fetch = async (url, init = {}) => {
    if (init.method === "GET") {
      throw new Error("models endpoint offline");
    }
    throw new Error(`bridge failed for ${url}`);
  };

  const result = await validateClaudeCodeCompatibleProvider({
    apiKey: "sk-cc",
    providerSpecificData: {
      baseUrl: "https://cc-compat.example.com/v1/messages",
    },
  });

  assert.equal(result.valid, false);
  assert.match(result.error, /bridge failed/i);
});
