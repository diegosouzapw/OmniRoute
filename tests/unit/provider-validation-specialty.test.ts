import test from "node:test";
import assert from "node:assert/strict";

const { validateProviderApiKey, validateClaudeCodeCompatibleProvider } =
  await import("../../src/lib/providers/validation.ts");

const originalFetch = globalThis.fetch;

test.afterEach(() => {
  globalThis.fetch = originalFetch;
});

function metaAiSseText(content: string, streamingState = "DONE") {
  return `event: next
data: ${JSON.stringify({
    data: {
      sendMessageStream: {
        __typename: "AssistantMessage",
        id: "meta-msg-1",
        content,
        streamingState,
        error:
          streamingState === "ERROR"
            ? { message: content, code: null, stack: "Error: " + content }
            : null,
        contentRenderer: { __typename: "TextContentRenderer", text: content },
      },
    },
  })}

event: complete
data:

`;
}

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

test("embedding and rerank specialty validators cover Voyage AI and Jina AI", async () => {
  globalThis.fetch = async (url, init = {}) => {
    const target = String(url);

    if (target === "https://api.voyageai.com/v1/embeddings") {
      assert.equal((init.headers as Record<string, string>).Authorization, "Bearer voyage-key");
      const body = JSON.parse(String(init.body));
      assert.equal(body.model, "voyage-4-large");
      return new Response(JSON.stringify({ data: [{ embedding: [0.1, 0.2] }] }), { status: 200 });
    }

    if (target === "https://api.jina.ai/v1/rerank") {
      assert.equal((init.headers as Record<string, string>).Authorization, "Bearer jina-key");
      const body = JSON.parse(String(init.body));
      assert.equal(body.model, "jina-reranker-v3");
      return new Response(JSON.stringify({ results: [{ index: 0, relevance_score: 0.99 }] }), {
        status: 200,
      });
    }

    throw new Error(`unexpected fetch: ${target}`);
  };

  const voyage = await validateProviderApiKey({ provider: "voyage-ai", apiKey: "voyage-key" });
  const jina = await validateProviderApiKey({ provider: "jina-ai", apiKey: "jina-key" });

  assert.equal(voyage.valid, true);
  assert.equal(jina.valid, true);
});

test("AWS Polly specialty validator signs DescribeVoices with SigV4", async () => {
  globalThis.fetch = async (url, init = {}) => {
    const target = String(url);
    const headers = init.headers as Record<string, string>;

    assert.equal(target, "https://polly.us-east-2.amazonaws.com/v1/voices?Engine=standard");
    assert.match(
      headers.Authorization,
      /^AWS4-HMAC-SHA256 Credential=AKIA_POLLY\/\d{8}\/us-east-2\/polly\/aws4_request,/
    );
    assert.equal(headers.host, "polly.us-east-2.amazonaws.com");
    assert.equal(headers["x-amz-content-sha256"].length, 64);
    return new Response(JSON.stringify({ Voices: [] }), { status: 200 });
  };

  const result = await validateProviderApiKey({
    provider: "aws-polly",
    apiKey: "aws-secret",
    providerSpecificData: {
      accessKeyId: "AKIA_POLLY",
      region: "us-east-2",
    },
  });

  assert.equal(result.valid, true);
});

test("AWS Polly specialty validator requires an access key id", async () => {
  const result = await validateProviderApiKey({
    provider: "aws-polly",
    apiKey: "aws-secret",
    providerSpecificData: {
      region: "us-east-2",
    },
  });

  assert.equal(result.error, "Missing AWS accessKeyId");
});

test("embedding and rerank specialty validators surface auth failures for Voyage AI and Jina AI", async () => {
  globalThis.fetch = async (url) => {
    const target = String(url);
    if (target === "https://api.voyageai.com/v1/embeddings") {
      return new Response(JSON.stringify({ error: "unauthorized" }), { status: 401 });
    }
    if (target === "https://api.jina.ai/v1/rerank") {
      return new Response(JSON.stringify({ error: "forbidden" }), { status: 403 });
    }
    throw new Error(`unexpected fetch: ${target}`);
  };

  const voyage = await validateProviderApiKey({ provider: "voyage-ai", apiKey: "voyage-key" });
  const jina = await validateProviderApiKey({ provider: "jina-ai", apiKey: "jina-key" });

  assert.equal(voyage.error, "Invalid API key");
  assert.equal(jina.error, "Invalid API key");
});

test("gitlab specialty validator accepts PAT auth on the direct access endpoint", async () => {
  globalThis.fetch = async (url, init = {}) => {
    assert.equal(String(url), "https://gitlab.com/api/v4/code_suggestions/direct_access");
    assert.equal((init.headers as Record<string, string>).Authorization, "Bearer glpat-test");
    return new Response(JSON.stringify({ token: "short-lived" }), { status: 200 });
  };

  const result = await validateProviderApiKey({ provider: "gitlab", apiKey: "glpat-test" });
  assert.equal(result.valid, true);
});

test("gitlab specialty validator treats 401 as invalid PAT", async () => {
  globalThis.fetch = async () =>
    new Response(JSON.stringify({ error: "unauthorized" }), { status: 401 });

  const result = await validateProviderApiKey({ provider: "gitlab", apiKey: "glpat-bad" });
  assert.equal(result.error, "Invalid API key");
});

test("web-cookie provider validators accept valid Grok, Perplexity, Blackbox and Muse Spark session cookies", async () => {
  const calls = [];
  globalThis.fetch = async (url, init = {}) => {
    const target = String(url);
    calls.push({ url: target, init });

    if (target.includes("grok.com/rest/app-chat/conversations/new")) {
      return new Response(JSON.stringify({ ok: true }), { status: 200 });
    }
    if (target.includes("perplexity.ai/rest/sse/perplexity_ask")) {
      return new Response(JSON.stringify({ ok: true }), { status: 200 });
    }
    if (target.includes("app.blackbox.ai/api/auth/session")) {
      return new Response(
        JSON.stringify({
          user: { id: "bb-user-1", email: "premium@example.com" },
        }),
        { status: 200 }
      );
    }
    if (target.includes("app.blackbox.ai/api/check-subscription")) {
      return new Response(
        JSON.stringify({
          hasActiveSubscription: true,
          isTrialSubscription: false,
          plan: "pro",
        }),
        { status: 200 }
      );
    }
    if (target.includes("meta.ai/api/graphql")) {
      return new Response(metaAiSseText("Muse Spark says hello"), {
        status: 200,
        headers: { "Content-Type": "text/event-stream" },
      });
    }

    throw new Error(`unexpected fetch: ${target}`);
  };

  const grok = await validateProviderApiKey({ provider: "grok-web", apiKey: "sso=grok-cookie" });
  const perplexity = await validateProviderApiKey({
    provider: "perplexity-web",
    apiKey: "__Secure-next-auth.session-token=pplx-cookie",
  });
  const blackbox = await validateProviderApiKey({
    provider: "blackbox-web",
    apiKey: "__Secure-authjs.session-token=bb-cookie",
  });
  const museSpark = await validateProviderApiKey({
    provider: "muse-spark-web",
    apiKey: "abra_sess=meta-cookie",
  });

  assert.equal(grok.valid, true);
  assert.equal(perplexity.valid, true);
  assert.equal(blackbox.valid, true);
  assert.equal(museSpark.valid, true);

  const grokCall = calls.find((call) =>
    call.url.includes("grok.com/rest/app-chat/conversations/new")
  );
  const perplexityCall = calls.find((call) =>
    call.url.includes("perplexity.ai/rest/sse/perplexity_ask")
  );
  const blackboxSessionCall = calls.find((call) =>
    call.url.includes("app.blackbox.ai/api/auth/session")
  );
  const blackboxSubscriptionCall = calls.find((call) =>
    call.url.includes("app.blackbox.ai/api/check-subscription")
  );
  const museSparkCall = calls.find((call) => call.url.includes("meta.ai/api/graphql"));

  assert.equal(grokCall?.init.headers.Cookie, "sso=grok-cookie");
  const grokBody = JSON.parse(String(grokCall?.init.body || "{}"));
  assert.equal(grokBody.modeId, "auto");
  assert.equal("modelName" in grokBody, false);
  assert.equal("modelMode" in grokBody, false);
  assert.equal(perplexityCall?.init.headers.Cookie, "__Secure-next-auth.session-token=pplx-cookie");
  assert.equal(blackboxSessionCall?.init.headers.Cookie, "__Secure-authjs.session-token=bb-cookie");
  assert.equal(
    blackboxSubscriptionCall?.init.headers.Cookie,
    "__Secure-authjs.session-token=bb-cookie"
  );
  assert.equal(museSparkCall?.init.headers.Cookie, "abra_sess=meta-cookie");
  assert.equal(museSparkCall?.init.headers["X-FB-Friendly-Name"], "useEctoSendMessageSubscription");
});

test("web-cookie provider validators surface auth and subscription failures", async () => {
  globalThis.fetch = async (url, init = {}) => {
    const target = String(url);
    if (target.includes("grok.com/rest/app-chat/conversations/new")) {
      return new Response(JSON.stringify({ error: "unauthorized" }), { status: 401 });
    }
    if (target.includes("perplexity.ai/rest/sse/perplexity_ask")) {
      return new Response(JSON.stringify({ error: "forbidden" }), { status: 403 });
    }
    if (target.includes("app.blackbox.ai/api/auth/session")) {
      const cookie = (init.headers as Record<string, string>)?.Cookie || "";
      if (cookie.includes("expired-cookie")) {
        return new Response("null", { status: 200 });
      }
      return new Response(
        JSON.stringify({
          user: { id: "bb-user-2", email: "free@example.com" },
        }),
        { status: 200 }
      );
    }
    if (target.includes("app.blackbox.ai/api/check-subscription")) {
      return new Response(
        JSON.stringify({
          hasActiveSubscription: false,
          isTrialSubscription: false,
          previouslySubscribed: true,
          plan: "free",
        }),
        { status: 200 }
      );
    }
    if (target.includes("meta.ai/api/graphql")) {
      return new Response(metaAiSseText("Authentication required to send messages", "ERROR"), {
        status: 200,
        headers: { "Content-Type": "text/event-stream" },
      });
    }

    throw new Error(`unexpected fetch: ${target}`);
  };

  const grok = await validateProviderApiKey({ provider: "grok-web", apiKey: "grok-cookie" });
  const perplexity = await validateProviderApiKey({
    provider: "perplexity-web",
    apiKey: "pplx-cookie",
  });
  const blackboxExpired = await validateProviderApiKey({
    provider: "blackbox-web",
    apiKey: "expired-cookie",
  });
  const blackboxNoSubscription = await validateProviderApiKey({
    provider: "blackbox-web",
    apiKey: "free-account-cookie",
  });
  const museSpark = await validateProviderApiKey({
    provider: "muse-spark-web",
    apiKey: "meta-cookie",
  });

  assert.match(grok.error || "", /Invalid SSO cookie/i);
  assert.match(perplexity.error || "", /Invalid Perplexity session cookie/i);
  assert.match(blackboxExpired.error || "", /Invalid Blackbox session cookie/i);
  assert.match(blackboxNoSubscription.error || "", /no active paid subscription/i);
  assert.match(museSpark.error || "", /Invalid Meta AI session cookie/i);
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

test("extended search provider validators cover Google PSE, Linkup, SearchAPI, You.com and SearXNG", async () => {
  const originalAllowPrivateProviderUrls = process.env.OMNIROUTE_ALLOW_PRIVATE_PROVIDER_URLS;
  process.env.OMNIROUTE_ALLOW_PRIVATE_PROVIDER_URLS = "true";
  const calls = [];
  try {
    globalThis.fetch = async (url, init = {}) => {
      calls.push({ url: String(url), init });
      const target = String(url);
      if (target.startsWith("https://www.googleapis.com/customsearch/v1")) {
        return new Response(JSON.stringify({ items: [] }), { status: 200 });
      }
      if (target.startsWith("https://api.linkup.so/v1/search")) {
        return new Response(JSON.stringify({ error: "bad request" }), { status: 400 });
      }
      if (target.startsWith("https://www.searchapi.io/api/v1/search")) {
        return new Response(JSON.stringify({ organic_results: [] }), { status: 200 });
      }
      if (target.startsWith("https://ydc-index.io/v1/search")) {
        return new Response(JSON.stringify({ results: { web: [] } }), { status: 200 });
      }
      if (target.startsWith("http://localhost:9999/search")) {
        return new Response(JSON.stringify({ results: [] }), { status: 200 });
      }
      throw new Error(`unexpected fetch: ${target}`);
    };

    const google = await validateProviderApiKey({
      provider: "google-pse-search",
      apiKey: "google-key",
      providerSpecificData: { cx: "engine-id" },
    });
    const linkup = await validateProviderApiKey({
      provider: "linkup-search",
      apiKey: "linkup-key",
    });
    const searchapi = await validateProviderApiKey({
      provider: "searchapi-search",
      apiKey: "searchapi-key",
    });
    const youcom = await validateProviderApiKey({
      provider: "youcom-search",
      apiKey: "you-key",
    });
    const searxng = await validateProviderApiKey({
      provider: "searxng-search",
      providerSpecificData: { baseUrl: "http://localhost:9999/search" },
    });

    assert.equal(google.valid, true);
    assert.equal(linkup.valid, true);
    assert.equal(searchapi.valid, true);
    assert.equal(youcom.valid, true);
    assert.equal(searxng.valid, true);
    assert.match(calls[0].url, /cx=engine-id/);
    assert.equal(calls[1].init.headers.Authorization, "Bearer linkup-key");
    assert.match(calls[2].url, /api_key=searchapi-key/);
    assert.equal(calls[3].init.headers["X-API-Key"], "you-key");
  } finally {
    if (originalAllowPrivateProviderUrls === undefined) {
      delete process.env.OMNIROUTE_ALLOW_PRIVATE_PROVIDER_URLS;
    } else {
      process.env.OMNIROUTE_ALLOW_PRIVATE_PROVIDER_URLS = originalAllowPrivateProviderUrls;
    }
  }
});

test("google PSE validator requires cx", async () => {
  const result = await validateProviderApiKey({
    provider: "google-pse-search",
    apiKey: "google-key",
  });

  assert.equal(result.valid, false);
  assert.equal(result.error, "Programmable Search Engine ID (cx) is required");
});

test("local OpenAI-style providers validate without sending Authorization when apiKey is blank", async () => {
  const originalAllowPrivateProviderUrls = process.env.OMNIROUTE_ALLOW_PRIVATE_PROVIDER_URLS;
  process.env.OMNIROUTE_ALLOW_PRIVATE_PROVIDER_URLS = "true";
  const calls = [];

  try {
    globalThis.fetch = async (url, init = {}) => {
      calls.push({ url: String(url), headers: init.headers || {} });
      return new Response(JSON.stringify({ data: [{ id: "local-model" }] }), { status: 200 });
    };

    const lmStudio = await validateProviderApiKey({
      provider: "lm-studio",
      providerSpecificData: { baseUrl: "http://localhost:1234/v1" },
    });
    const vllm = await validateProviderApiKey({
      provider: "vllm",
      providerSpecificData: { baseUrl: "http://localhost:8000/v1" },
    });
    const lemonade = await validateProviderApiKey({
      provider: "lemonade",
      providerSpecificData: { baseUrl: "http://localhost:13305/api/v1" },
    });

    assert.equal(lmStudio.valid, true);
    assert.equal(vllm.valid, true);
    assert.equal(lemonade.valid, true);
    assert.deepEqual(
      calls.map((call) => call.url),
      [
        "http://localhost:1234/v1/models",
        "http://localhost:8000/v1/models",
        "http://localhost:13305/api/v1/models",
      ]
    );
    assert.equal(calls[0].headers.Authorization, undefined);
    assert.equal(calls[1].headers.Authorization, undefined);
    assert.equal(calls[2].headers.Authorization, undefined);
  } finally {
    if (originalAllowPrivateProviderUrls === undefined) {
      delete process.env.OMNIROUTE_ALLOW_PRIVATE_PROVIDER_URLS;
    } else {
      process.env.OMNIROUTE_ALLOW_PRIVATE_PROVIDER_URLS = originalAllowPrivateProviderUrls;
    }
  }
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

test("specialty validator accepts DataRobot gateway and deployment credentials", async () => {
  globalThis.fetch = async (url, init = {}) => {
    const target = String(url);

    if (target === "https://app.datarobot.com/genai/llmgw/catalog/") {
      assert.equal((init.headers as Record<string, string>).Authorization, "Bearer dr-key");
      return new Response(
        JSON.stringify({
          data: [{ model: "azure/gpt-5-mini-2025-08-07", isActive: true }],
        }),
        { status: 200 }
      );
    }

    if (
      target ===
      "https://app.datarobot.com/api/v2/deployments/65f5b2b7c8f8c4b257e0d123/chat/completions"
    ) {
      assert.equal((init.headers as Record<string, string>).Authorization, "Bearer dr-deploy-key");
      const body = JSON.parse(String(init.body));
      assert.equal(body.model, "datarobot-deployed-llm");
      return new Response(JSON.stringify({ error: "bad request" }), { status: 400 });
    }

    throw new Error(`unexpected fetch: ${target}`);
  };

  const gateway = await validateProviderApiKey({
    provider: "datarobot",
    apiKey: "dr-key",
  });
  const deployment = await validateProviderApiKey({
    provider: "datarobot",
    apiKey: "dr-deploy-key",
    providerSpecificData: {
      baseUrl: "https://app.datarobot.com/api/v2/deployments/65f5b2b7c8f8c4b257e0d123",
    },
  });

  assert.equal(gateway.valid, true);
  assert.equal(deployment.valid, true);
});

test("specialty validator rejects invalid DataRobot credentials", async () => {
  globalThis.fetch = async (url) => {
    const target = String(url);

    if (target === "https://app.datarobot.com/genai/llmgw/catalog/") {
      return new Response(JSON.stringify({ error: "unauthorized" }), { status: 401 });
    }

    if (
      target ===
      "https://app.datarobot.com/api/v2/deployments/65f5b2b7c8f8c4b257e0d123/chat/completions"
    ) {
      return new Response(JSON.stringify({ error: "forbidden" }), { status: 403 });
    }

    throw new Error(`unexpected fetch: ${target}`);
  };

  const gateway = await validateProviderApiKey({
    provider: "datarobot",
    apiKey: "dr-key",
  });
  const deployment = await validateProviderApiKey({
    provider: "datarobot",
    apiKey: "dr-deploy-key",
    providerSpecificData: {
      baseUrl: "https://app.datarobot.com/api/v2/deployments/65f5b2b7c8f8c4b257e0d123",
    },
  });

  assert.equal(gateway.error, "Invalid API key");
  assert.equal(deployment.error, "Invalid API key");
});

test("specialty validators accept watsonx, OCI and SAP enterprise gateways", async () => {
  globalThis.fetch = async (url, init = {}) => {
    const target = String(url);

    if (target === "https://ca-tor.ml.cloud.ibm.com/ml/gateway/v1/models") {
      assert.equal((init.headers as Record<string, string>).Authorization, "Bearer watsonx-key");
      return new Response(JSON.stringify({ data: [] }), { status: 200 });
    }

    if (
      target === "https://inference.generativeai.us-chicago-1.oci.oraclecloud.com/openai/v1/models"
    ) {
      const headers = init.headers as Record<string, string>;
      assert.equal(headers.Authorization, "Bearer oci-key");
      assert.equal(headers["OpenAI-Project"], "ocid1.generativeaiproject.oc1.us-chicago-1.demo");
      return new Response(JSON.stringify({ data: [] }), { status: 200 });
    }

    if (target === "https://sap.example.com/v2/lm/scenarios/foundation-models/models") {
      const headers = init.headers as Record<string, string>;
      assert.equal(headers.Authorization, "Bearer sap-key");
      assert.equal(headers["AI-Resource-Group"], "shared");
      return new Response(JSON.stringify({ resources: [] }), { status: 200 });
    }

    throw new Error(`unexpected fetch: ${target}`);
  };

  const watsonx = await validateProviderApiKey({
    provider: "watsonx",
    apiKey: "watsonx-key",
    providerSpecificData: { baseUrl: "https://ca-tor.ml.cloud.ibm.com" },
  });
  const oci = await validateProviderApiKey({
    provider: "oci",
    apiKey: "oci-key",
    providerSpecificData: {
      baseUrl: "https://inference.generativeai.us-chicago-1.oci.oraclecloud.com",
      projectId: "ocid1.generativeaiproject.oc1.us-chicago-1.demo",
    },
  });
  const sap = await validateProviderApiKey({
    provider: "sap",
    apiKey: "sap-key",
    providerSpecificData: {
      baseUrl: "https://sap.example.com/v2/lm/deployments/demo-deployment",
      resourceGroup: "shared",
    },
  });

  assert.equal(watsonx.valid, true);
  assert.equal(watsonx.method, "watsonx_models");
  assert.equal(oci.valid, true);
  assert.equal(oci.method, "oci_models");
  assert.equal(sap.valid, true);
  assert.equal(sap.method, "sap_models");
});

test("specialty validator accepts Bedrock mantle discovery and runtime chat fallback", async () => {
  let runtimeChatProbed = false;

  globalThis.fetch = async (url, init = {}) => {
    const target = String(url);

    if (target === "https://bedrock-mantle.us-east-1.api.aws/v1/models") {
      assert.equal((init.headers as Record<string, string>).Authorization, "Bearer bedrock-key");
      return new Response(JSON.stringify({ data: [] }), { status: 200 });
    }

    if (target === "https://bedrock-runtime.us-east-1.amazonaws.com/openai/v1/models") {
      assert.equal((init.headers as Record<string, string>).Authorization, "Bearer runtime-key");
      return new Response(JSON.stringify({ error: "not found" }), { status: 404 });
    }

    if (target === "https://bedrock-runtime.us-east-1.amazonaws.com/openai/v1/chat/completions") {
      runtimeChatProbed = true;
      const body = JSON.parse(String(init.body || "{}"));
      assert.equal((init.headers as Record<string, string>).Authorization, "Bearer runtime-key");
      assert.equal(body.model, "openai.gpt-oss-120b-1:0");
      return new Response(JSON.stringify({ error: "bad request" }), { status: 400 });
    }

    throw new Error(`unexpected fetch: ${target}`);
  };

  const mantle = await validateProviderApiKey({
    provider: "bedrock",
    apiKey: "bedrock-key",
  });
  const runtime = await validateProviderApiKey({
    provider: "bedrock",
    apiKey: "runtime-key",
    providerSpecificData: {
      baseUrl: "https://bedrock-runtime.us-east-1.amazonaws.com",
    },
  });

  assert.equal(mantle.valid, true);
  assert.equal(runtime.valid, true);
  assert.equal(runtimeChatProbed, true);
});

test("specialty validator rejects invalid Bedrock credentials", async () => {
  globalThis.fetch = async (url, init = {}) => {
    const target = String(url);

    if (target === "https://bedrock-mantle.us-east-1.api.aws/v1/models") {
      assert.equal((init.headers as Record<string, string>).Authorization, "Bearer bedrock-key");
      return new Response(JSON.stringify({ error: "forbidden" }), { status: 403 });
    }

    throw new Error(`unexpected fetch: ${target}`);
  };

  const bedrock = await validateProviderApiKey({
    provider: "bedrock",
    apiKey: "bedrock-key",
  });

  assert.equal(bedrock.error, "Invalid API key");
});

test("specialty validators reject invalid watsonx, OCI and SAP credentials", async () => {
  globalThis.fetch = async (url) => {
    const target = String(url);

    if (target === "https://ca-tor.ml.cloud.ibm.com/ml/gateway/v1/models") {
      return new Response(JSON.stringify({ error: "unauthorized" }), { status: 401 });
    }

    if (
      target === "https://inference.generativeai.us-chicago-1.oci.oraclecloud.com/openai/v1/models"
    ) {
      return new Response(JSON.stringify({ error: "forbidden" }), { status: 403 });
    }

    if (target === "https://sap.example.com/v2/lm/scenarios/foundation-models/models") {
      return new Response(JSON.stringify({ error: "forbidden" }), { status: 403 });
    }

    throw new Error(`unexpected fetch: ${target}`);
  };

  const watsonx = await validateProviderApiKey({
    provider: "watsonx",
    apiKey: "watsonx-key",
    providerSpecificData: { baseUrl: "https://ca-tor.ml.cloud.ibm.com" },
  });
  const oci = await validateProviderApiKey({
    provider: "oci",
    apiKey: "oci-key",
    providerSpecificData: {
      baseUrl: "https://inference.generativeai.us-chicago-1.oci.oraclecloud.com",
    },
  });
  const sap = await validateProviderApiKey({
    provider: "sap",
    apiKey: "sap-key",
    providerSpecificData: {
      baseUrl: "https://sap.example.com/v2/lm/deployments/demo-deployment",
    },
  });

  assert.equal(watsonx.error, "Invalid API key");
  assert.equal(oci.error, "Invalid API key");
  assert.equal(sap.error, "Invalid API key");
});

test("specialty validator accepts Modal OpenAI-compatible deployments", async () => {
  globalThis.fetch = async (url, init = {}) => {
    const target = String(url);

    if (target === "https://alice--demo.modal.run/v1/models") {
      const headers = init.headers as Record<string, string>;
      assert.equal(headers.Authorization, "Bearer modal-key");
      return new Response(JSON.stringify({ data: [] }), { status: 200 });
    }

    throw new Error(`unexpected fetch: ${target}`);
  };

  const modal = await validateProviderApiKey({
    provider: "modal",
    apiKey: "modal-key",
    providerSpecificData: {
      baseUrl: "https://alice--demo.modal.run/v1",
    },
  });

  assert.equal(modal.valid, true);
});

test("specialty validator rejects invalid Modal credentials", async () => {
  globalThis.fetch = async (url) => {
    const target = String(url);

    if (target === "https://alice--demo.modal.run/v1/models") {
      return new Response(JSON.stringify({ error: "unauthorized" }), { status: 401 });
    }

    throw new Error(`unexpected fetch: ${target}`);
  };

  const modal = await validateProviderApiKey({
    provider: "modal",
    apiKey: "modal-key",
    providerSpecificData: {
      baseUrl: "https://alice--demo.modal.run/v1",
    },
  });

  assert.equal(modal.error, "Invalid API key");
});

test("specialty validator accepts Poe credentials on the current balance endpoint", async () => {
  globalThis.fetch = async (url, init = {}) => {
    const target = String(url);

    if (target === "https://api.poe.com/usage/current_balance") {
      const headers = init.headers as Record<string, string>;
      assert.equal(headers.Authorization, "Bearer poe-key");
      return new Response(JSON.stringify({ current_point_balance: 123456 }), { status: 200 });
    }

    throw new Error(`unexpected fetch: ${target}`);
  };

  const poe = await validateProviderApiKey({
    provider: "poe",
    apiKey: "poe-key",
  });

  assert.equal(poe.valid, true);
  assert.equal(poe.method, "poe_current_balance");
});

test("specialty validator accepts Nous Research credentials on chat completions", async () => {
  globalThis.fetch = async (url, init = {}) => {
    const target = String(url);

    if (target === "https://inference-api.nousresearch.com/v1/chat/completions") {
      const headers = init.headers as Record<string, string>;
      const body = JSON.parse(String(init.body));
      assert.equal(headers.Authorization, "Bearer nous-key");
      assert.equal(body.model, "nousresearch/hermes-4-70b");
      return new Response(
        JSON.stringify({
          id: "chatcmpl-nous",
          choices: [{ message: { role: "assistant", content: "ok" } }],
        }),
        { status: 200 }
      );
    }

    throw new Error(`unexpected fetch: ${target}`);
  };

  const nous = await validateProviderApiKey({
    provider: "nous-research",
    apiKey: "nous-key",
  });

  assert.equal(nous.valid, true);
  assert.equal(nous.method, "nous_chat_completions");
});

test("specialty validator rejects invalid Nous Research credentials", async () => {
  globalThis.fetch = async (url, init = {}) => {
    const target = String(url);

    if (target === "https://inference-api.nousresearch.com/v1/chat/completions") {
      const headers = init.headers as Record<string, string>;
      assert.equal(headers.Authorization, "Bearer nous-bad");
      return new Response(JSON.stringify({ message: "invalid" }), { status: 401 });
    }

    throw new Error(`unexpected fetch: ${target}`);
  };

  const nous = await validateProviderApiKey({
    provider: "nous-research",
    apiKey: "nous-bad",
  });

  assert.equal(nous.error, "Invalid API key");
});

test("specialty validator accepts the public Petals generate endpoint without an API key", async () => {
  globalThis.fetch = async (url, init = {}) => {
    const target = String(url);

    if (target === "https://chat.petals.dev/api/v1/generate") {
      const headers = init.headers as Record<string, string>;
      const body = new URLSearchParams(String(init.body));
      assert.equal(headers.Authorization, undefined);
      assert.equal(headers["Content-Type"], "application/x-www-form-urlencoded");
      assert.equal(body.get("model"), "stabilityai/StableBeluga2");
      assert.equal(body.get("inputs"), "test");
      assert.equal(body.get("max_new_tokens"), "1");
      return new Response(JSON.stringify({ ok: true, outputs: "hi" }), { status: 200 });
    }

    throw new Error(`unexpected fetch: ${target}`);
  };

  const petals = await validateProviderApiKey({
    provider: "petals",
    apiKey: "",
  });

  assert.equal(petals.valid, true);
  assert.equal(petals.method, "petals_generate");
});

test("specialty validator surfaces Petals upstream unavailability", async () => {
  globalThis.fetch = async (url, init = {}) => {
    const target = String(url);

    if (target === "https://chat.petals.dev/api/v1/generate") {
      const headers = init.headers as Record<string, string>;
      assert.equal(headers.Authorization, undefined);
      return new Response(JSON.stringify({ error: "unavailable" }), { status: 503 });
    }

    throw new Error(`unexpected fetch: ${target}`);
  };

  const petals = await validateProviderApiKey({
    provider: "petals",
    apiKey: "",
  });

  assert.equal(petals.error, "Provider unavailable (503)");
});

test("specialty validator rejects invalid Poe credentials", async () => {
  globalThis.fetch = async (url, init = {}) => {
    const target = String(url);

    if (target === "https://api.poe.com/usage/current_balance") {
      const headers = init.headers as Record<string, string>;
      assert.equal(headers.Authorization, "Bearer poe-bad");
      return new Response(JSON.stringify({ error: "unauthorized" }), { status: 401 });
    }

    throw new Error(`unexpected fetch: ${target}`);
  };

  const poe = await validateProviderApiKey({
    provider: "poe",
    apiKey: "poe-bad",
  });

  assert.equal(poe.error, "Invalid API key");
});

test("specialty validator accepts Clarifai credentials through the OpenAI-compatible models probe", async () => {
  globalThis.fetch = async (url, init = {}) => {
    const target = String(url);

    if (target === "https://api.clarifai.com/v2/ext/openai/v1/models") {
      const headers = init.headers as Record<string, string>;
      assert.equal(headers.Authorization, "Key clarifai-pat");
      return new Response(
        JSON.stringify({ data: [{ id: "openai/chat-completion/models/gpt-oss-120b" }] }),
        { status: 200 }
      );
    }

    throw new Error(`unexpected fetch: ${target}`);
  };

  const clarifai = await validateProviderApiKey({
    provider: "clarifai",
    apiKey: "clarifai-pat",
  });

  assert.equal(clarifai.valid, true);
  assert.equal(clarifai.method, "clarifai_models");
});

test("specialty validator rejects invalid Clarifai credentials", async () => {
  globalThis.fetch = async (url, init = {}) => {
    const target = String(url);

    if (target === "https://api.clarifai.com/v2/ext/openai/v1/models") {
      const headers = init.headers as Record<string, string>;
      assert.equal(headers.Authorization, "Key clarifai-bad");
      return new Response(JSON.stringify({ error: "unauthorized" }), { status: 401 });
    }

    throw new Error(`unexpected fetch: ${target}`);
  };

  const clarifai = await validateProviderApiKey({
    provider: "clarifai",
    apiKey: "clarifai-bad",
  });

  assert.equal(clarifai.error, "Invalid API key");
});

test("specialty validator accepts Reka credentials through the models probe with dual auth headers", async () => {
  globalThis.fetch = async (url, init = {}) => {
    const target = String(url);

    if (target === "https://api.reka.ai/v1/models") {
      const headers = init.headers as Record<string, string>;
      assert.equal(headers.Authorization, "Bearer reka-key");
      assert.equal(headers["X-Api-Key"], "reka-key");
      return new Response(JSON.stringify([{ id: "reka-core" }]), { status: 200 });
    }

    throw new Error(`unexpected fetch: ${target}`);
  };

  const reka = await validateProviderApiKey({
    provider: "reka",
    apiKey: "reka-key",
  });

  assert.equal(reka.valid, true);
  assert.equal(reka.method, "reka_models");
});

test("specialty validator rejects invalid Reka credentials", async () => {
  globalThis.fetch = async (url, init = {}) => {
    const target = String(url);

    if (target === "https://api.reka.ai/v1/models") {
      const headers = init.headers as Record<string, string>;
      assert.equal(headers.Authorization, "Bearer reka-bad");
      assert.equal(headers["X-Api-Key"], "reka-bad");
      return new Response(JSON.stringify({ error: "unauthorized" }), { status: 401 });
    }

    throw new Error(`unexpected fetch: ${target}`);
  };

  const reka = await validateProviderApiKey({
    provider: "reka",
    apiKey: "reka-bad",
  });

  assert.equal(reka.error, "Invalid API key");
});

test("specialty validator accepts NLP Cloud credentials on the chatbot endpoint", async () => {
  globalThis.fetch = async (url, init = {}) => {
    const target = String(url);

    if (target === "https://api.nlpcloud.io/v1/gpu/chatdolphin/chatbot") {
      const headers = init.headers as Record<string, string>;
      const body = JSON.parse(String(init.body));
      assert.equal(headers.Authorization, "Token nlpc-key");
      assert.equal(body.input, "test");
      return new Response(JSON.stringify({ response: "ok" }), { status: 200 });
    }

    throw new Error(`unexpected fetch: ${target}`);
  };

  const nlpCloud = await validateProviderApiKey({
    provider: "nlpcloud",
    apiKey: "nlpc-key",
  });

  assert.equal(nlpCloud.valid, true);
  assert.equal(nlpCloud.method, "nlpcloud_chatbot");
});

test("specialty validator rejects invalid NLP Cloud credentials", async () => {
  globalThis.fetch = async (url, init = {}) => {
    const target = String(url);

    if (target === "https://api.nlpcloud.io/v1/gpu/chatdolphin/chatbot") {
      const headers = init.headers as Record<string, string>;
      assert.equal(headers.Authorization, "Token nlpc-bad");
      return new Response(JSON.stringify({ detail: "forbidden" }), { status: 403 });
    }

    throw new Error(`unexpected fetch: ${target}`);
  };

  const nlpCloud = await validateProviderApiKey({
    provider: "nlpcloud",
    apiKey: "nlpc-bad",
  });

  assert.equal(nlpCloud.error, "Invalid API key");
});

test("specialty validator accepts Runway credentials on the organization endpoint", async () => {
  globalThis.fetch = async (url, init = {}) => {
    const target = String(url);

    if (target === "https://api.dev.runwayml.com/v1/organization") {
      const headers = init.headers as Record<string, string>;
      assert.equal(headers.Authorization, "Bearer runway-key");
      assert.equal(headers["X-Runway-Version"], "2024-11-06");
      return new Response(JSON.stringify({ id: "org_demo" }), { status: 200 });
    }

    throw new Error(`unexpected fetch: ${target}`);
  };

  const runway = await validateProviderApiKey({
    provider: "runwayml",
    apiKey: "runway-key",
  });

  assert.equal(runway.valid, true);
  assert.equal(runway.method, "runway_organization");
});

test("specialty validator rejects invalid Runway credentials", async () => {
  globalThis.fetch = async (url, init = {}) => {
    const target = String(url);

    if (target === "https://api.dev.runwayml.com/v1/organization") {
      const headers = init.headers as Record<string, string>;
      assert.equal(headers.Authorization, "Bearer runway-bad");
      assert.equal(headers["X-Runway-Version"], "2024-11-06");
      return new Response(JSON.stringify({ error: "unauthorized" }), { status: 401 });
    }

    throw new Error(`unexpected fetch: ${target}`);
  };

  const runway = await validateProviderApiKey({
    provider: "runwayml",
    apiKey: "runway-bad",
  });

  assert.equal(runway.error, "Invalid API key");
});
