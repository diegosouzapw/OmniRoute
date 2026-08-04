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

// Regression for the non-string-input crash class surfaced by #2463
// ("e.startsWith is not a function" during a connection test). A non-string
// apiKey / modelsUrl must never throw a TypeError mid-validation — it should
// return a clean { valid: boolean } result.

test("#2463 snowflake validation does not throw on non-string apiKey", async () => {
  globalThis.fetch = async () => new Response(JSON.stringify({ data: [] }), { status: 200 });
  const result = await validateProviderApiKey({
    provider: "snowflake",
    apiKey: 12345 as any, // simulates a corrupted / mis-typed credential
    providerSpecificData: { baseUrl: "https://acct.snowflakecomputing.com" },
  });
  assert.equal(typeof result.valid, "boolean");
});

test("#2463 gemini validation does not throw on non-string apiKey", async () => {
  globalThis.fetch = async () => new Response(JSON.stringify({ data: [] }), { status: 200 });
  const result = await validateProviderApiKey({
    provider: "gemini",
    apiKey: null as any,
    providerSpecificData: {},
  });
  assert.equal(typeof result.valid, "boolean");
});

test("#2463 openai-compatible validation does not throw on non-string modelsUrl", async () => {
  globalThis.fetch = async () => new Response(JSON.stringify({ data: [] }), { status: 200 });
  const result = await validateProviderApiKey({
    provider: "openai-compatible-nonstring-modelsurl",
    apiKey: "sk-test",
    providerSpecificData: { baseUrl: "https://compat.example.com/v1", modelsUrl: 999 as any },
  });
  assert.equal(typeof result.valid, "boolean");
});

// Regression for #2545: the default Gemini (AI Studio) base URL ends in /v1beta/models,
// so the validator must not append a second /models (which produced /models/models → 404).
test("#2545 gemini validation does not produce /models/models", async () => {
  const calls: string[] = [];
  globalThis.fetch = async (url: any) => {
    calls.push(String(url));
    return new Response(JSON.stringify({ models: [] }), { status: 200 });
  };
  const result = await validateProviderApiKey({
    provider: "gemini",
    apiKey: "AIzaTestKey",
    providerSpecificData: {},
  });
  assert.equal(typeof result.valid, "boolean");
  assert.ok(calls.length > 0, "validator must make a request");
  assert.ok(
    !calls.some((u) => u.includes("/models/models")),
    `outbound URL must not contain /models/models — got ${calls.join(", ")}`
  );
  assert.ok(
    calls.some((u) => /\/v1beta\/models(\?|$)/.test(u)),
    `outbound URL must hit a single /models segment — got ${calls.join(", ")}`
  );
});

test("qoder regular API key validates against dashscope, not the Cosy PAT endpoint (#3149)", async () => {
  const calls: string[] = [];
  globalThis.fetch = async (url: any, init: any) => {
    calls.push(String(url));
    const auth = new Headers(init?.headers as HeadersInit | undefined).get("authorization");
    assert.equal(auth, "Bearer sk-qoder-regular", "dashscope probe must forward the API key");
    return new Response(JSON.stringify({ data: [] }), { status: 200 });
  };

  const result = await validateProviderApiKey({
    provider: "qoder",
    apiKey: "sk-qoder-regular",
    providerSpecificData: {},
  });

  assert.equal(result.valid, true);
  assert.ok(
    calls.some((u) => u.includes("dashscope.aliyuncs.com/compatible-mode/v1/models")),
    `regular qoder key must validate against dashscope — got ${calls.join(", ")}`
  );
  assert.ok(
    !calls.some((u) => u.includes("api1.qoder.sh")),
    "regular (non-PAT) key must not hit the Cosy PAT endpoint"
  );
});

test("qoder regular API key surfaces an auth error when dashscope rejects it (#3149)", async () => {
  globalThis.fetch = async () =>
    new Response(JSON.stringify({ error: { message: "invalid api key" } }), { status: 401 });

  const result = await validateProviderApiKey({
    provider: "qoder",
    apiKey: "sk-qoder-bad",
    providerSpecificData: {},
  });

  assert.equal(result.valid, false);
  assert.match(result.error, /Qoder|Dashscope|API key/i);
});
