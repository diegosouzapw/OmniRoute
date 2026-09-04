import test from "node:test";
import assert from "node:assert/strict";
import { WEB_COOKIE_PROVIDERS } from "../../src/shared/constants/providers/web-cookie.ts";
import { chatplaygroundProvider } from "../../open-sse/config/providers/registry/chatplayground/index.ts";
import { getExecutor, hasSpecializedExecutor } from "../../open-sse/executors/index.ts";
import {
  ChatPlaygroundExecutor,
  chatplaygroundExecutor,
  stripChatId,
  buildChatPlaygroundPayload,
  toOpenAiCompletionEnvelope,
} from "../../open-sse/executors/chatplayground.ts";
import {
  decodeJwtPayload,
  extractSidFromSessionJwt,
  extractExpFromJwt,
  parseCookieString,
  parseChatPlaygroundAccount,
  resolveChatPlaygroundAuth,
  clearChatPlaygroundJwtCache,
} from "../../open-sse/services/chatplaygroundAuth.ts";
import {
  CHATPLAYGROUND_FALLBACK_MODELS,
  stripChatPlaygroundPrefix,
  resolveChatPlaygroundEndpoint,
  resolveChatPlaygroundModel,
  clearChatPlaygroundModelsCache,
} from "../../open-sse/services/chatplaygroundModels.ts";
import { getChatPlaygroundUsage } from "../../open-sse/services/usage/chatplayground.ts";

// Helper to create a dummy unsigned JWT with a JSON payload
function createMockJwt(payload: Record<string, unknown>): string {
  const header = Buffer.from(JSON.stringify({ alg: "HS256", typ: "JWT" })).toString("base64url");
  const body = Buffer.from(JSON.stringify(payload)).toString("base64url");
  return `${header}.${body}.mock_signature`;
}

test("ChatPlayground — provider registration & constants", () => {
  // Check WEB_COOKIE_PROVIDERS
  const cookieEntry = WEB_COOKIE_PROVIDERS.chatplayground;
  assert.ok(cookieEntry, "chatplayground should be registered in WEB_COOKIE_PROVIDERS");
  assert.equal(cookieEntry.id, "chatplayground");
  assert.equal(cookieEntry.alias, "cpl");
  assert.equal(cookieEntry.website, "https://web.chatplayground.ai");
  assert.equal(cookieEntry.subscriptionRisk, true);

  // Check registry entry
  assert.equal(chatplaygroundProvider.id, "chatplayground");
  assert.equal(chatplaygroundProvider.alias, "cpl");
  assert.equal(chatplaygroundProvider.executor, "chatplayground");
  assert.equal(chatplaygroundProvider.format, "openai");
  assert.ok(chatplaygroundProvider.models.length > 0, "should have registered fallback models");

  // Check lazy executor registration
  assert.ok(hasSpecializedExecutor("chatplayground"), "chatplayground executor should be registered");
  assert.ok(hasSpecializedExecutor("cpl"), "cpl executor alias should be registered");
});

test("ChatPlayground — executor instantiation & getExecutor dispatch", async () => {
  const exec1 = await getExecutor("chatplayground");
  assert.ok(exec1 instanceof ChatPlaygroundExecutor, "getExecutor(chatplayground) should return ChatPlaygroundExecutor");

  const exec2 = await getExecutor("cpl");
  assert.ok(exec2 instanceof ChatPlaygroundExecutor, "getExecutor(cpl) should return ChatPlaygroundExecutor");

  assert.ok(chatplaygroundExecutor instanceof ChatPlaygroundExecutor);
});

test("ChatPlayground — JWT claims decoding & cookie parsing", () => {
  const mockJwt = createMockJwt({ sid: "sess_1234567890", exp: 1800000000, sub: "user_abc" });

  const payload = decodeJwtPayload(mockJwt);
  assert.ok(payload);
  assert.equal(payload.sid, "sess_1234567890");
  assert.equal(payload.exp, 1800000000);

  assert.equal(extractSidFromSessionJwt(mockJwt), "sess_1234567890");
  assert.equal(extractExpFromJwt(mockJwt), 1800000000);
  assert.equal(extractSidFromSessionJwt("invalid.token"), "");
  assert.equal(extractExpFromJwt("invalid.token"), 0);

  const cookieHeader = `__client=client_token_xyz; __session=${mockJwt}; other=foo`;
  const parsedCookies = parseCookieString(cookieHeader);
  assert.equal(parsedCookies.__client, "client_token_xyz");
  assert.equal(parsedCookies.__session, mockJwt);
  assert.equal(parsedCookies.sid, "sess_1234567890");
});

test("ChatPlayground — account parsing (native connection formats)", () => {
  const mockJwt = createMockJwt({ sid: "sess_one", exp: 1900000000 });

  // 1. Direct JWT
  const acct1 = parseChatPlaygroundAccount(mockJwt);
  assert.ok(acct1);
  assert.equal(acct1.type, "jwt");
  assert.equal(acct1.jwt, mockJwt);

  // 2. Cookie format with __client and __session
  const rawCookie = `__client=client_abc; __session=${mockJwt}`;
  const acct2 = parseChatPlaygroundAccount(rawCookie);
  assert.ok(acct2);
  assert.equal(acct2.type, "cookie");
  assert.equal(acct2.client, "client_abc");
  assert.equal(acct2.sid, "sess_one");

  // 3. Legacy user ID
  const acct3 = parseChatPlaygroundAccount("user_mock_test_123");
  assert.ok(acct3);
  assert.equal(acct3.type, "user_id");
  assert.equal(acct3.userId, "user_mock_test_123");

  // 4. Null on empty input
  assert.equal(parseChatPlaygroundAccount(""), null);
});

test("ChatPlayground — auth resolution with cached & minted tokens", async () => {
  clearChatPlaygroundJwtCache();

  // 1. Direct Bearer token
  const testJwt = createMockJwt({ exp: Math.floor(Date.now() / 1000) + 3600 });
  const auth1 = await resolveChatPlaygroundAuth({ apiKey: testJwt });
  assert.equal(auth1.headers.authorization, `Bearer ${testJwt}`);

  // 2. Cookie with mock minting via fetch override
  const sid = "sess_mock_test";
  const client = "client_mock_test";
  const mintedToken = createMockJwt({ sid, exp: Math.floor(Date.now() / 1000) + 120 });

  const originalFetch = globalThis.fetch;
  let mintCalled = false;

  globalThis.fetch = (async (url: string | URL | Request, init?: RequestInit) => {
    const urlStr = url.toString();
    if (urlStr.includes("clerk.chatplayground.ai/v1/client/sessions")) {
      mintCalled = true;
      return new Response(JSON.stringify({ jwt: mintedToken }), {
        status: 200,
        headers: { "content-type": "application/json" },
      });
    }
    return originalFetch(url, init);
  }) as typeof fetch;

  try {
    const auth2 = await resolveChatPlaygroundAuth({
      cookie: `__client=${client}; sid=${sid}`,
    });
    assert.ok(mintCalled, "mint endpoint should have been called");
    assert.equal(auth2.headers.authorization, `Bearer ${mintedToken}`);

    // Second call should hit the cache without re-minting
    mintCalled = false;
    const auth3 = await resolveChatPlaygroundAuth({
      cookie: `__client=${client}; sid=${sid}`,
    });
    assert.equal(mintCalled, false, "second call should hit cache");
    assert.equal(auth3.headers.authorization, `Bearer ${mintedToken}`);
  } finally {
    globalThis.fetch = originalFetch;
    clearChatPlaygroundJwtCache();
  }
});

test("ChatPlayground — model & endpoint resolution", () => {
  clearChatPlaygroundModelsCache();

  // Prefix stripping
  assert.equal(stripChatPlaygroundPrefix("chatplayground/gpt-5.6-sol"), "gpt-5.6-sol");
  assert.equal(stripChatPlaygroundPrefix("cpl/claude-sonnet-5"), "claude-sonnet-5");
  assert.equal(stripChatPlaygroundPrefix("cpl.kimi-k3"), "kimi-k3");
  assert.equal(stripChatPlaygroundPrefix("cp.perplexity-sonar-pro"), "perplexity-sonar-pro");

  // Endpoint routing resolution
  assert.equal(resolveChatPlaygroundEndpoint({ endpoint: "azure" }), "azure");
  assert.equal(resolveChatPlaygroundEndpoint({ endpoint: "lmsys" }), "lmsys");
  assert.equal(resolveChatPlaygroundEndpoint({ endpoint: "perplexity" }), "perplexity");
  assert.equal(resolveChatPlaygroundEndpoint("gpt-5.6-sol"), "azure");
  assert.equal(resolveChatPlaygroundEndpoint("claude-sonnet-5"), "azure");
  assert.equal(resolveChatPlaygroundEndpoint("kimi-k3"), "lmsys");
  assert.equal(resolveChatPlaygroundEndpoint("llama-4-scout"), "lmsys");
  assert.equal(resolveChatPlaygroundEndpoint("qwen3.8-max"), "lmsys");
  assert.equal(resolveChatPlaygroundEndpoint("grok-4.5"), "lmsys");
  assert.equal(resolveChatPlaygroundEndpoint("perplexity-sonar-pro"), "perplexity");
  assert.equal(resolveChatPlaygroundEndpoint("sonar-pro"), "perplexity");

  // Model resolution
  const m1 = resolveChatPlaygroundModel("cpl/gpt-5.6-sol");
  assert.ok(m1);
  assert.equal(m1.id, "gpt-5.6-sol");
  assert.equal(m1.endpoint, "azure");

  const m2 = resolveChatPlaygroundModel("kimi-k3");
  assert.ok(m2);
  assert.equal(m2.id, "kimi-k3");
  assert.equal(m2.endpoint, "lmsys");

  const m3 = resolveChatPlaygroundModel("sonar-pro");
  assert.ok(m3);
  assert.equal(m3.endpoint, "perplexity");
  assert.equal(m3.modelName, "sonar-pro");
});

test("ChatPlayground — payload construction & CHAT_ID stripping", () => {
  // CHAT_ID stripping
  assert.equal(stripChatId("Hello world CHAT_ID:abc-123_xyz"), "Hello world");
  assert.equal(stripChatId("CHAT_ID:prefix_123 Hello world"), "Hello world");
  assert.equal(stripChatId("Hello CHAT_ID:mid_456 world"), "Hello  world");

  // Payload formatting
  const modelAzure = resolveChatPlaygroundModel("gpt-5.6-sol")!;
  const payloadAzure = buildChatPlaygroundPayload(
    {
      messages: [{ role: "user", content: "Hi" }],
      temperature: 0.5,
      max_tokens: 1024,
    },
    modelAzure
  );
  assert.equal(payloadAzure.botId, "gpt-5.6-sol");
  assert.equal(payloadAzure.model, "gpt-5.6-sol");
  assert.equal(payloadAzure.temperature, 0.5);
  assert.equal(payloadAzure.max_tokens, 1024);
  assert.equal(payloadAzure.noSave, true);

  const modelPplx = resolveChatPlaygroundModel("perplexity-sonar-pro")!;
  const payloadPplx = buildChatPlaygroundPayload(
    {
      messages: [{ role: "user", content: "Query" }],
    },
    modelPplx
  );
  assert.equal(payloadPplx.botId, "perplexity-sonar-pro");
  assert.equal(payloadPplx.modelName, "sonar-pro");
});

test("ChatPlaygroundExecutor — execution flow: non-streaming & streaming", async () => {
  const executor = new ChatPlaygroundExecutor();
  const mockJwt = createMockJwt({ exp: Math.floor(Date.now() / 1000) + 3600 });
  const originalFetch = globalThis.fetch;

  // 1. Non-streaming execution test
  globalThis.fetch = (async (url: string | URL | Request) => {
    const urlStr = url.toString();
    if (urlStr.includes("/api/chat/azure")) {
      return new Response("ChatPlayground assistant response CHAT_ID:session_12345", {
        status: 200,
        headers: { "content-type": "text/plain" },
      });
    }
    return new Response("Not found", { status: 404 });
  }) as typeof fetch;

  try {
    const result = await executor.execute({
      model: "gpt-5.6-sol",
      body: {
        messages: [{ role: "user", content: "Hello" }],
        stream: false,
      },
      stream: false,
      credentials: { apiKey: mockJwt },
    });

    assert.ok(result instanceof Response);
    assert.equal(result.status, 200);
    const data = await result.json();
    assert.equal(data.object, "chat.completion");
    assert.equal(data.choices[0].message.content, "ChatPlayground assistant response");
  } finally {
    globalThis.fetch = originalFetch;
  }

  // 2. Streaming execution test
  globalThis.fetch = (async (url: string | URL | Request) => {
    const urlStr = url.toString();
    if (urlStr.includes("/api/chat/azure")) {
      const stream = new ReadableStream({
        start(controller) {
          controller.enqueue(new TextEncoder().encode("Chunk 1 "));
          controller.enqueue(new TextEncoder().encode("Chunk 2 CHAT_ID:end_token"));
          controller.close();
        },
      });
      return new Response(stream, {
        status: 200,
        headers: { "content-type": "text/plain" },
      });
    }
    return new Response("Not found", { status: 404 });
  }) as typeof fetch;

  try {
    const streamResult = await executor.execute({
      model: "gpt-5.6-sol",
      body: {
        messages: [{ role: "user", content: "Hello" }],
        stream: true,
      },
      stream: true,
      credentials: { apiKey: mockJwt },
    });

    assert.ok(streamResult instanceof Response);
    assert.equal(streamResult.status, 200);
    assert.equal(streamResult.headers.get("content-type"), "text/event-stream");

    const reader = streamResult.body!.getReader();
    const decoder = new TextDecoder();
    let accumulated = "";

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      accumulated += decoder.decode(value);
    }

    assert.ok(accumulated.includes("data: [DONE]"), "stream should terminate with data: [DONE]");
    assert.ok(accumulated.includes("Chunk 1"), "stream should include Chunk 1");
    assert.ok(accumulated.includes("Chunk 2"), "stream should include Chunk 2");
    assert.ok(!accumulated.includes("CHAT_ID"), "stream should have stripped CHAT_ID token");
  } finally {
    globalThis.fetch = originalFetch;
  }

  // 3. Error response handling test
  globalThis.fetch = (async () => {
    return new Response("Rate limit exceeded on upstream", {
      status: 429,
      headers: { "content-type": "text/plain" },
    });
  }) as typeof fetch;

  try {
    const errResult = await executor.execute({
      model: "gpt-5.6-sol",
      body: { messages: [{ role: "user", content: "Hello" }] },
      credentials: { apiKey: mockJwt },
    });

    assert.ok("response" in errResult);
    assert.equal(errResult.response.status, 429);
    const errJson = await errResult.response.json();
    assert.ok(errJson.error.message.includes("429"));
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("ChatPlayground — billing & daily quota parsing", async () => {
  const mockJwt = createMockJwt({ exp: Math.floor(Date.now() / 1000) + 3600 });
  const originalFetch = globalThis.fetch;

  globalThis.fetch = (async (url: string | URL | Request) => {
    const urlStr = url.toString();
    if (urlStr.includes("/api/user")) {
      return new Response(
        JSON.stringify({
          user: {
            name: "Test User",
            email: "test@example.com",
            dailyQueriesCount: 25,
            subscription: {
              name: "unlimited",
              fullName: "lifetime",
            },
          },
        }),
        { status: 200, headers: { "content-type": "application/json" } }
      );
    }
    return new Response("Not found", { status: 404 });
  }) as typeof fetch;

  try {
    const usage = await getChatPlaygroundUsage(mockJwt);
    assert.equal(usage.plan, "Lifetime Unlimited");
    assert.ok(usage.quotas?.daily);
    assert.equal(usage.quotas.daily.total, 300);
    assert.equal(usage.quotas.daily.used, 25);
    assert.equal(usage.quotas.daily.remaining, 275);
    assert.equal(usage.quotas.daily.remainingPercentage, 91.7);
    assert.ok(usage.quotas.daily.resetAt);
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("ChatPlayground — StackSocial Lifetime Basic & Pro quota parsing", async () => {
  const mockJwt = createMockJwt({ exp: Math.floor(Date.now() / 1000) + 3600 });
  const originalFetch = globalThis.fetch;

  // 1. StackSocial Pro Tier (2,000 queries/mo)
  globalThis.fetch = (async () => {
    return new Response(
      JSON.stringify({
        user: {
          name: "Pro User",
          proQueriesCount: 150,
          appsumoLicenseTier: "pro",
          subscription: {
            name: "pro",
            fullName: "lifetime pro",
            proMaxQueries: 2000,
          },
        },
      }),
      { status: 200, headers: { "content-type": "application/json" } }
    );
  }) as typeof fetch;

  try {
    const proUsage = await getChatPlaygroundUsage(mockJwt);
    assert.equal(proUsage.plan, "Lifetime Pro");
    assert.equal(proUsage.quotas?.monthly.total, 2000);
    assert.equal(proUsage.quotas?.monthly.used, 150);
    assert.equal(proUsage.quotas?.monthly.remaining, 1850);
    assert.ok(proUsage.quotas?.daily);
  } finally {
    globalThis.fetch = originalFetch;
  }

  // 2. StackSocial Basic Tier (500 queries/mo)
  globalThis.fetch = (async () => {
    return new Response(
      JSON.stringify({
        user: {
          name: "Basic User",
          proQueriesCount: 50,
          appsumoLicenseTier: "basic",
          subscription: {
            name: "basic",
            fullName: "lifetime basic",
            proMaxQueries: 500,
          },
        },
      }),
      { status: 200, headers: { "content-type": "application/json" } }
    );
  }) as typeof fetch;

  try {
    const basicUsage = await getChatPlaygroundUsage(mockJwt);
    assert.equal(basicUsage.plan, "Lifetime Basic");
    assert.equal(basicUsage.quotas?.monthly.total, 500);
    assert.equal(basicUsage.quotas?.monthly.used, 50);
    assert.equal(basicUsage.quotas?.monthly.remaining, 450);
    assert.ok(basicUsage.quotas?.daily);
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("ChatPlaygroundExecutor — 15,000 character limit per message validation", async () => {
  const executor = new ChatPlaygroundExecutor();
  const mockJwt = createMockJwt({ exp: Math.floor(Date.now() / 1000) + 3600 });

  const oversizedMessage = "A".repeat(15_001);
  const errResult = await executor.execute({
    model: "gpt-5.6-terra",
    body: {
      messages: [{ role: "user", content: oversizedMessage }],
    },
    credentials: { apiKey: mockJwt },
  });

  assert.ok("response" in errResult);
  assert.equal(errResult.response.status, 400);
  const data = await errResult.response.json();
  assert.ok(data.error.message.includes("15000-character limit") || data.error.message.includes("15,000"));
});

