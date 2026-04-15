import test from "node:test";
import assert from "node:assert/strict";

const { validateProviderApiKey, validateClaudeCodeCompatibleProvider } =
  await import("../../src/lib/providers/validation.ts");

const originalFetch = globalThis.fetch;

test.afterEach(() => {
  globalThis.fetch = originalFetch;
});

test("specialty provider validators cover Deepgram, AssemblyAI, NanoBanana, ElevenLabs and Inworld branches", async () => {
  globalThis.fetch = async (url, init = {}) => {
    const target = String(url);
    const headers = init.headers || {};

    if (target.match(/deepgram/i)) {
      assert.equal(headers.Authorization, "Token dg-key");
      return new Response(JSON.stringify({ ok: true }), { status: 200 });
    }
    if (target.match(/assemblyai/i)) {
      assert.equal(headers.Authorization, "aa-key");
      return new Response(JSON.stringify({ error: "unauthorized" }), { status: 403 });
    }
    if (target.match(/nanobanana/i)) {
      return new Response(JSON.stringify({ error: "unauthorized" }), { status: 401 });
    }
    if (target.match(/elevenlabs/i)) {
      return new Response(JSON.stringify({ voices: [] }), { status: 200 });
    }
    if (target.match(/inworld/i)) {
      return new Response(JSON.stringify({ error: "bad request" }), { status: 400 });
    }

    throw new Error(`unexpected fetch: ${target}`);
  };

  const deepgram = await validateProviderApiKey({ provider: "deepgram", apiKey: "dg-key" });
  const assembly = await validateProviderApiKey({ provider: "assemblyai", apiKey: "aa-key" });
  const banana = await validateProviderApiKey({ provider: "nanobanana", apiKey: "nb-key" });
  const eleven = await validateProviderApiKey({ provider: "elevenlabs", apiKey: "el-key" });
  const inworld = await validateProviderApiKey({ provider: "inworld", apiKey: "iw-key" });

  assert.equal(deepgram.valid, true);
  assert.equal(assembly.error, "Invalid API key");
  assert.equal(banana.error, "Invalid API key");
  assert.equal(eleven.valid, true);
  assert.equal(inworld.valid, true);
});

test("specialty providers surface network failures and non-auth upstream failures", async () => {
  globalThis.fetch = async (url) => {
    const target = String(url);
    if (target.match(/deepgram/i)) {
      throw new Error("deepgram offline");
    }
    if (target.match(/nanobanana/i)) {
      throw new Error("nanobanana offline");
    }
    if (target.match(/elevenlabs/i)) {
      return new Response(JSON.stringify({ error: "server" }), { status: 500 });
    }
    if (target.match(/inworld/i)) {
      return new Response(JSON.stringify({ error: "forbidden" }), { status: 403 });
    }
    if (target.match(/longcat/i)) {
      throw new Error("longcat offline");
    }
    throw new Error(`unexpected fetch: ${target}`);
  };

  const deepgram = await validateProviderApiKey({ provider: "deepgram", apiKey: "dg-key" });
  const banana = await validateProviderApiKey({ provider: "nanobanana", apiKey: "nb-key" });
  const eleven = await validateProviderApiKey({ provider: "elevenlabs", apiKey: "el-key" });
  const inworld = await validateProviderApiKey({ provider: "inworld", apiKey: "iw-key" });
  const longcat = await validateProviderApiKey({ provider: "longcat", apiKey: "lc-key" });

  assert.equal(deepgram.error, "deepgram offline");
  assert.equal(banana.error, "nanobanana offline");
  assert.equal(eleven.error, "Validation failed: 500");
  assert.equal(inworld.error, "Invalid API key");
  assert.equal(longcat.error, "longcat offline");
});

test("search provider validators cover success, client errors, server errors and custom user agent injection", async () => {
  const calls = [];
  globalThis.fetch = async (url, init = {}) => {
    calls.push({ url: String(url), init });
    const target = String(url);
    if (target.match(/search\.brave\.com/i)) {
      return new Response(JSON.stringify({ results: [] }), { status: 200 });
    }
    if (target.match(/api\.exa\.ai/i)) {
      return new Response(JSON.stringify({ error: "bad key" }), { status: 403 });
    }
    if (target.match(/api\.tavily\.com/i)) {
      return new Response(JSON.stringify({ error: "server" }), { status: 503 });
    }
    if (target.match(/api\.perplexity\.ai/i)) {
      throw new Error("perplexity offline");
    }
    throw new Error(`unexpected fetch: ${target}`);
  };

  const brave = await validateProviderApiKey({
    provider: "brave-search",
    apiKey: "brave-key",
    providerSpecificData: { customUserAgent: "SearchSuite/1.0" },
  });
  const exa = await validateProviderApiKey({ provider: "exa-search", apiKey: "exa-key" });
  const tavily = await validateProviderApiKey({ provider: "tavily-search", apiKey: "tv-key" });
  const perplexity = await validateProviderApiKey({
    provider: "perplexity-search",
    apiKey: "px-key",
  });

  assert.equal(brave.valid, true);
  assert.equal(exa.error, "Invalid API key");
  assert.equal(tavily.error, "Validation failed: 503");
  assert.equal(perplexity.error, "perplexity offline");
  assert.equal(calls[0].init.headers["User-Agent"], "SearchSuite/1.0");
});

test("OpenAI-compatible validator covers /responses mode and final ping fallback", async () => {
  const calls = [];
  globalThis.fetch = async (url, init = {}) => {
    calls.push({ url: String(url), method: init.method || "GET" });
    if (String(url).endsWith("/models")) {
      return new Response(JSON.stringify({ error: "no models" }), { status: 500 });
    }
    if (String(url).endsWith("/responses")) {
      return new Response(JSON.stringify({ id: "resp_123" }), { status: 200 });
    }
    if (String(url) === "https://openai-like.example.com/v1") {
      return new Response("ok", { status: 418 });
    }
    throw new Error(`unexpected fetch: ${url}`);
  };

  const responsesResult = await validateProviderApiKey({
    provider: "openai-compatible-responses",
    apiKey: "sk-test",
    providerSpecificData: {
      baseUrl: "https://openai-like.example.com/v1",
      apiType: "responses",
      validationModelId: "gpt-test",
    },
  });

  globalThis.fetch = async (url) => {
    if (String(url).endsWith("/models")) {
      return new Response(JSON.stringify({ error: "server" }), { status: 500 });
    }
    if (String(url).endsWith("/chat/completions")) {
      throw new Error("chat probe offline");
    }
    return new Response("teapot", { status: 418 });
  };

  const pingFallback = await validateProviderApiKey({
    provider: "openai-compatible-ping-fallback",
    apiKey: "sk-test",
    providerSpecificData: {
      baseUrl: "https://openai-like.example.com/v1",
      validationModelId: "gpt-test",
    },
  });

  assert.equal(responsesResult.valid, true);
  assert.equal(responsesResult.method, "chat_completions");
  assert.deepEqual(
    calls.map((call) => call.url),
    ["https://openai-like.example.com/v1/models", "https://openai-like.example.com/v1/responses"]
  );
  assert.equal(pingFallback.valid, true);
  assert.equal(pingFallback.error, null);
});

test("Anthropic-compatible and Claude Code compatible validators cover direct success and bridge fallbacks", async () => {
  globalThis.fetch = async (url, init = {}) => {
    const target = String(url);
    if (target.match(/anthropic-compatible\.example\.com/i) && init.method === "GET") {
      return new Response(JSON.stringify({ data: [] }), { status: 200 });
    }
    if (target.match(/cc-compatible\.example\.com/i) && init.method === "GET") {
      return new Response(JSON.stringify({ error: "bridge unavailable" }), { status: 500 });
    }
    if (target.match(/cc-compatible\.example\.com/i) && init.method === "POST") {
      return new Response(JSON.stringify({ error: "rate limited" }), { status: 429 });
    }
    throw new Error(`unexpected fetch: ${target}`);
  };

  const anthropic = await validateProviderApiKey({
    provider: "anthropic-compatible-direct",
    apiKey: "sk-anthropic",
    providerSpecificData: {
      baseUrl: "https://anthropic-compatible.example.com/v1/messages",
      modelsPath: "/custom-models",
    },
  });

  const ccRateLimited = await validateClaudeCodeCompatibleProvider({
    apiKey: "sk-cc",
    providerSpecificData: {
      baseUrl: "https://cc-compatible.example.com/v1/messages",
      validationModelId: "claude-bridge-test",
    },
  });

  globalThis.fetch = async (url, init = {}) => {
    if (init.method === "GET") {
      return new Response(JSON.stringify({ error: "bridge unavailable" }), { status: 500 });
    }
    return new Response(JSON.stringify({ error: "bad gateway" }), { status: 502 });
  };

  const ccFailure = await validateClaudeCodeCompatibleProvider({
    apiKey: "sk-cc",
    providerSpecificData: {
      baseUrl: "https://cc-compatible.example.com/v1/messages",
    },
  });

  assert.equal(anthropic.valid, true);
  assert.equal(ccRateLimited.valid, true);
  assert.equal(ccRateLimited.method, "cc_bridge_request");
  assert.match(ccRateLimited.warning, /Rate limited/i);
  assert.equal(ccFailure.valid, false);
  assert.equal(ccFailure.error, "Validation failed: 502");
});

test("Claude Code compatible validator rejects missing base URL and bridge auth failures", async () => {
  const missingBase = await validateClaudeCodeCompatibleProvider({
    apiKey: "sk-cc",
    providerSpecificData: {},
  });

  globalThis.fetch = async (url, init = {}) => {
    if (init.method === "GET") {
      throw new Error("models offline");
    }
    return new Response(JSON.stringify({ error: "forbidden" }), { status: 403 });
  };

  const invalidKey = await validateClaudeCodeCompatibleProvider({
    apiKey: "sk-cc",
    providerSpecificData: {
      baseUrl: "https://cc-compatible.example.com/v1/messages",
    },
  });

  assert.equal(missingBase.error, "No base URL configured for CC Compatible provider");
  assert.equal(invalidKey.error, "Invalid API key");
});

test("registry providers cover remaining OpenAI-like and Claude-like validation branches", async () => {
  const calls = [];
  globalThis.fetch = async (url, init = {}) => {
    calls.push({ url: String(url), method: init.method || "GET", headers: init.headers || {} });
    const target = String(url);

    if (target === "https://api.openai.com/v1/models") {
      return new Response(JSON.stringify({ data: [{ id: "gpt-4o-mini" }] }), { status: 200 });
    }
    if (target === "https://api.anthropic.com/v1/messages?beta=true") {
      return new Response(JSON.stringify({ id: "msg_123" }), { status: 200 });
    }

    throw new Error(`unexpected fetch: ${target}`);
  };

  const openaiModels = await validateProviderApiKey({ provider: "openai", apiKey: "sk-openai" });
  const claudeSuccess = await validateProviderApiKey({ provider: "claude", apiKey: "sk-claude" });

  globalThis.fetch = async (url) => {
    if (String(url) === "https://api.openai.com/v1/models") {
      return new Response(JSON.stringify({ error: "server" }), { status: 500 });
    }
    if (String(url) === "https://api.openai.com/v1/chat/completions") {
      return new Response(JSON.stringify({ error: "method not allowed" }), { status: 405 });
    }
    throw new Error(`unexpected fetch: ${url}`);
  };
  const openaiUnsupported = await validateProviderApiKey({
    provider: "openai",
    apiKey: "sk-openai",
  });

  globalThis.fetch = async (url) => {
    if (String(url) === "https://api.openai.com/v1/models") {
      return new Response(JSON.stringify({ error: "server" }), { status: 500 });
    }
    if (String(url) === "https://api.openai.com/v1/chat/completions") {
      return new Response(JSON.stringify({ error: "unprocessable" }), { status: 422 });
    }
    throw new Error(`unexpected fetch: ${url}`);
  };
  const openaiInference = await validateProviderApiKey({ provider: "openai", apiKey: "sk-openai" });

  globalThis.fetch = async (url) => {
    if (String(url) === "https://api.openai.com/v1/models") {
      return new Response(JSON.stringify({ error: "server" }), { status: 500 });
    }
    if (String(url) === "https://api.openai.com/v1/chat/completions") {
      return new Response(JSON.stringify({ error: "server" }), { status: 502 });
    }
    throw new Error(`unexpected fetch: ${url}`);
  };
  const openaiUnavailable = await validateProviderApiKey({
    provider: "openai",
    apiKey: "sk-openai",
  });

  globalThis.fetch = async () =>
    new Response(JSON.stringify({ error: "unauthorized" }), { status: 401 });
  const claudeInvalid = await validateProviderApiKey({ provider: "claude", apiKey: "sk-claude" });

  globalThis.fetch = async () => {
    throw new Error("anthropic offline");
  };
  const claudeOffline = await validateProviderApiKey({ provider: "claude", apiKey: "sk-claude" });

  assert.equal(openaiModels.valid, true);
  assert.equal(openaiModels.error, null);
  assert.equal(claudeSuccess.valid, true);
  assert.equal(openaiUnsupported.error, "Provider validation endpoint not supported");
  assert.equal(openaiInference.valid, true);
  assert.equal(openaiInference.error, null);
  assert.equal(openaiUnavailable.error, "Provider unavailable (502)");
  assert.equal(claudeInvalid.error, "Invalid API key");
  assert.equal(claudeOffline.error, "anthropic offline");
  assert.equal(calls[1].headers["x-api-key"], "sk-claude");
});

test("specialty validators cover remaining status branches for Deepgram, AssemblyAI, NanoBanana, ElevenLabs, Inworld, Bailian and LongCat", async () => {
  globalThis.fetch = async (url) => {
    const target = String(url);
    if (target.match(/deepgram/i)) {
      return new Response(JSON.stringify({ error: "server" }), { status: 500 });
    }
    if (target.match(/assemblyai/i)) {
      return new Response(JSON.stringify({ transcripts: [] }), { status: 200 });
    }
    if (target.match(/nanobanana/i)) {
      return new Response(JSON.stringify({ error: "bad request" }), { status: 400 });
    }
    if (target.match(/elevenlabs/i)) {
      return new Response(JSON.stringify({ error: "forbidden" }), { status: 403 });
    }
    if (target.match(/inworld/i)) {
      throw new Error("inworld offline");
    }
    if (target.match(/dashscope\.aliyuncs\.com/i)) {
      return new Response(JSON.stringify({ error: "server" }), { status: 500 });
    }
    if (target.match(/longcat/i)) {
      return new Response(JSON.stringify({ error: "unauthorized" }), { status: 401 });
    }
    throw new Error(`unexpected fetch: ${target}`);
  };

  const deepgram = await validateProviderApiKey({ provider: "deepgram", apiKey: "dg-key" });
  const assembly = await validateProviderApiKey({ provider: "assemblyai", apiKey: "aa-key" });
  const banana = await validateProviderApiKey({ provider: "nanobanana", apiKey: "nb-key" });
  const eleven = await validateProviderApiKey({ provider: "elevenlabs", apiKey: "el-key" });
  const inworld = await validateProviderApiKey({ provider: "inworld", apiKey: "iw-key" });
  const bailian = await validateProviderApiKey({
    provider: "bailian-coding-plan",
    apiKey: "bailian-key",
    providerSpecificData: {
      baseUrl: "https://coding-intl.dashscope.aliyuncs.com/apps/anthropic/v1/messages",
    },
  });
  const longcatInvalid = await validateProviderApiKey({ provider: "longcat", apiKey: "lc-key" });

  globalThis.fetch = async (url) => {
    if (String(url).match(/elevenlabs/i)) {
      throw new Error("elevenlabs offline");
    }
    if (String(url).match(/longcat/i)) {
      return new Response(JSON.stringify({ error: "unprocessable" }), { status: 422 });
    }
    throw new Error(`unexpected fetch: ${url}`);
  };

  const elevenOffline = await validateProviderApiKey({ provider: "elevenlabs", apiKey: "el-key" });
  const longcatValid = await validateProviderApiKey({ provider: "longcat", apiKey: "lc-key" });

  assert.equal(deepgram.error, "Validation failed: 500");
  assert.equal(assembly.valid, true);
  assert.equal(banana.valid, true);
  assert.equal(eleven.error, "Invalid API key");
  assert.equal(inworld.error, "inworld offline");
  assert.equal(bailian.error, "Validation failed: 500");
  assert.equal(longcatInvalid.error, "Invalid API key");
  assert.equal(elevenOffline.error, "elevenlabs offline");
  assert.equal(longcatValid.valid, true);
});

test("specialty validators cover Heroku, Databricks, Snowflake and GigaChat success paths", async () => {
  const seen = [];
  globalThis.fetch = async (url, init = {}) => {
    const target = String(url);
    seen.push({ url: target, headers: init.headers || {} });

    if (target === "https://ngw.devices.sberbank.ru:9443/api/v2/oauth") {
      assert.equal(init.headers.Authorization, "Basic gigachat-basic-creds");
      return new Response(
        JSON.stringify({
          tok: "gigachat-access-token",
          exp: Date.now() + 60 * 60 * 1000,
        }),
        { status: 200 }
      );
    }
    if (target === "https://us.inference.heroku.com/v1/chat/completions") {
      assert.equal(init.headers.Authorization, "Bearer heroku-key");
      return new Response(JSON.stringify({ error: "bad request" }), { status: 400 });
    }
    if (
      target ===
      "https://adb-1234567890123456.7.azuredatabricks.net/serving-endpoints/chat/completions"
    ) {
      assert.equal(init.headers.Authorization, "Bearer databricks-key");
      return new Response(JSON.stringify({ error: "unprocessable" }), { status: 422 });
    }
    if (target === "https://account.snowflakecomputing.com/api/v2/cortex/inference:complete") {
      assert.equal(init.headers.Authorization, "Bearer snowflake-token");
      assert.equal(
        init.headers["X-Snowflake-Authorization-Token-Type"],
        "PROGRAMMATIC_ACCESS_TOKEN"
      );
      return new Response(JSON.stringify({ error: "bad request" }), { status: 400 });
    }
    if (target === "https://gigachat.devices.sberbank.ru/api/v1/chat/completions") {
      assert.equal(init.headers.Authorization, "Bearer gigachat-access-token");
      return new Response(JSON.stringify({ error: "bad request" }), { status: 400 });
    }

    throw new Error(`unexpected fetch: ${target}`);
  };

  const heroku = await validateProviderApiKey({
    provider: "heroku",
    apiKey: "heroku-key",
    providerSpecificData: { baseUrl: "https://us.inference.heroku.com" },
  });
  const databricks = await validateProviderApiKey({
    provider: "databricks",
    apiKey: "databricks-key",
    providerSpecificData: {
      baseUrl: "https://adb-1234567890123456.7.azuredatabricks.net/serving-endpoints",
    },
  });
  const snowflake = await validateProviderApiKey({
    provider: "snowflake",
    apiKey: "pat/snowflake-token",
    providerSpecificData: { baseUrl: "https://account.snowflakecomputing.com" },
  });
  const gigachat = await validateProviderApiKey({
    provider: "gigachat",
    apiKey: "gigachat-basic-creds",
  });

  assert.equal(heroku.valid, true);
  assert.equal(databricks.valid, true);
  assert.equal(snowflake.valid, true);
  assert.equal(gigachat.valid, true);
  assert.equal(
    seen.some((call) => call.url === "https://ngw.devices.sberbank.ru:9443/api/v2/oauth"),
    true
  );
});

test("specialty validators surface missing base URLs and invalid auth for Heroku, Databricks, Snowflake and GigaChat", async () => {
  const missingHerokuBase = await validateProviderApiKey({
    provider: "heroku",
    apiKey: "heroku-key",
    providerSpecificData: {},
  });
  const missingDatabricksBase = await validateProviderApiKey({
    provider: "databricks",
    apiKey: "databricks-key",
    providerSpecificData: {},
  });
  const missingSnowflakeBase = await validateProviderApiKey({
    provider: "snowflake",
    apiKey: "snowflake-key",
    providerSpecificData: {},
  });

  globalThis.fetch = async (url) => {
    const target = String(url);
    if (target === "https://ngw.devices.sberbank.ru:9443/api/v2/oauth") {
      return new Response(JSON.stringify({ error: "unauthorized" }), { status: 401 });
    }
    if (target === "https://us.inference.heroku.com/v1/chat/completions") {
      return new Response(JSON.stringify({ error: "unauthorized" }), { status: 401 });
    }
    if (
      target ===
      "https://adb-1234567890123456.7.azuredatabricks.net/serving-endpoints/chat/completions"
    ) {
      return new Response(JSON.stringify({ error: "forbidden" }), { status: 403 });
    }
    if (target === "https://account.snowflakecomputing.com/api/v2/cortex/inference:complete") {
      return new Response(JSON.stringify({ error: "unauthorized" }), { status: 401 });
    }
    throw new Error(`unexpected fetch: ${target}`);
  };

  const herokuInvalid = await validateProviderApiKey({
    provider: "heroku",
    apiKey: "heroku-key",
    providerSpecificData: { baseUrl: "https://us.inference.heroku.com" },
  });
  const databricksInvalid = await validateProviderApiKey({
    provider: "databricks",
    apiKey: "databricks-key",
    providerSpecificData: {
      baseUrl: "https://adb-1234567890123456.7.azuredatabricks.net/serving-endpoints",
    },
  });
  const snowflakeInvalid = await validateProviderApiKey({
    provider: "snowflake",
    apiKey: "snowflake-key",
    providerSpecificData: { baseUrl: "https://account.snowflakecomputing.com" },
  });
  const gigachatInvalid = await validateProviderApiKey({
    provider: "gigachat",
    apiKey: "gigachat-basic-creds-invalid",
  });

  assert.equal(missingHerokuBase.error, "Missing base URL");
  assert.equal(missingDatabricksBase.error, "Missing base URL");
  assert.equal(missingSnowflakeBase.error, "Missing base URL");
  assert.equal(herokuInvalid.error, "Invalid API key");
  assert.equal(databricksInvalid.error, "Invalid API key");
  assert.equal(snowflakeInvalid.error, "Invalid API key");
  assert.equal(gigachatInvalid.error, "Invalid API key");
});
