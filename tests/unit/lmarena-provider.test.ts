/**
 * LMArena Provider — Unit Tests (Phase 2A of issue #3368)
 *
 * Run: node --import tsx/esm --test tests/unit/lmarena-provider.test.ts
 */

import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { WEB_COOKIE_PROVIDERS } from "../../src/shared/constants/providers.ts";
import {
  getWebSessionCredentialRequirement,
  requiresWebSessionCredential,
  hasUsableWebSessionCredential,
} from "../../src/shared/providers/webSessionCredentials.ts";
import {
  LMArenaExecutor,
  markLMArenaCatalogModelDead,
  normalizeLMArenaModelsForCatalog,
  parseArenaSSE,
  parseLMArenaInitialModels,
  pickLMArenaModelId,
} from "../../open-sse/executors/lmarena.ts";
import { clearLMArenaDeadCatalogModels } from "../../open-sse/executors/lmarena/models.ts";
import { __setTlsFetchOverrideForTesting } from "../../open-sse/services/lmarenaTlsClient.ts";

const TEST_ARENA_MODEL_ID = "019e080d-c29d-7d9a-aa54-faed41da0763";
const UUID_V7_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-7[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

/** Protected BaseExecutor methods exercised by unit tests without `any`. */
type LMArenaExecutorTestAccess = {
  provider: string;
  buildUrl: (model: string, credentials: unknown) => string;
  buildHeaders: (model: string, credentials: unknown, body: unknown) => Record<string, string>;
  transformRequest: (
    body: unknown,
    model: string,
    credentials?: unknown
  ) => {
    id: string;
    mode: string;
    modality: string;
    modelAId: string;
    modelBId?: string;
    userMessageId: string;
    modelAMessageId: string;
    modelBMessageId?: string;
    recaptchaV3Token: string | null;
    userMessage: {
      content: string;
      experimental_attachments: unknown[];
      metadata: Record<string, unknown>;
    };
  };
};

function access(executor: LMArenaExecutor): LMArenaExecutorTestAccess {
  return executor as unknown as LMArenaExecutorTestAccess;
}

describe("LMArena Provider Definition", () => {
  it("is registered in WEB_COOKIE_PROVIDERS", () => {
    assert.ok(WEB_COOKIE_PROVIDERS.lmarena, "lmarena should be in WEB_COOKIE_PROVIDERS");
    assert.equal(WEB_COOKIE_PROVIDERS.lmarena.id, "lmarena");
    assert.equal(WEB_COOKIE_PROVIDERS.lmarena.alias, "lma");
    assert.equal(WEB_COOKIE_PROVIDERS.lmarena.name, "Arena (Free)");
    assert.equal(WEB_COOKIE_PROVIDERS.lmarena.textIcon, "AR");
    assert.equal(WEB_COOKIE_PROVIDERS.lmarena.website, "https://arena.ai");
    assert.equal(WEB_COOKIE_PROVIDERS.lmarena.hasFree, true);
    assert.equal(WEB_COOKIE_PROVIDERS.lmarena.riskNoticeVariant, "webCookie");
  });

  it("has correct metadata", () => {
    const provider = WEB_COOKIE_PROVIDERS.lmarena;
    assert.ok(provider.freeNote, "Should have freeNote");
    assert.ok(provider.freeNote.includes("formerly LMArena"), "Should note rebrand");
    assert.ok(provider.authHint, "Should have authHint");
    assert.ok(provider.icon, "Should have icon");
    assert.ok(provider.color, "Should have color");
    assert.ok(provider.textIcon, "Should have textIcon");
  });
});

describe("LMArena Credential Requirements", () => {
  it("requires web session credential", () => {
    assert.equal(requiresWebSessionCredential("lmarena"), true);
  });

  it("has correct credential requirement", () => {
    const req = getWebSessionCredentialRequirement("lmarena");
    assert.ok(req, "Should have credential requirement");
    assert.equal(req.kind, "cookie");
    // #3810: arena.ai's real auth cookie is `arena-auth-prod-v1`, not `session`;
    // #4271: it is now split into Supabase SSR chunks.
    assert.ok(req.credentialName.includes("arena-auth-prod-v1.0"));
    assert.ok(req.credentialName.includes("arena-auth-prod-v1.1"));
    assert.ok(req.placeholder.includes("arena-auth-prod-v1"));
    assert.ok(req.placeholder.includes("arena.ai"));
    assert.equal(req.acceptsFullCookieHeader, true);
    assert.ok(req.storageKeys.includes("cookie"));
    assert.ok(req.storageKeys.includes("arena-auth-prod-v1"));
    // legacy `session` key retained for back-compat with already-saved credentials
    assert.ok(req.storageKeys.includes("session"));
  });

  it("validates usable credentials correctly", () => {
    assert.equal(hasUsableWebSessionCredential("lmarena", { cookie: "session=abc123" }), true);
    assert.equal(hasUsableWebSessionCredential("lmarena", { session: "abc123" }), true);
    assert.equal(hasUsableWebSessionCredential("lmarena", { cookie: "" }), false);
    assert.equal(hasUsableWebSessionCredential("lmarena", {}), false);
  });
});

describe("LMArena Executor", () => {
  it("can be instantiated", () => {
    const executor = new LMArenaExecutor();
    assert.ok(executor, "Executor should be instantiated");
  });

  it("has correct provider ID", () => {
    const executor = new LMArenaExecutor();
    assert.equal(access(executor).provider, "lmarena");
  });

  it("builds correct URL (arena.ai/nextjs-api/stream/create-evaluation)", () => {
    const executor = new LMArenaExecutor();
    const url = access(executor).buildUrl("gpt-4", {});
    assert.ok(url.includes("arena.ai"), "URL should include arena.ai");
    assert.ok(
      url.includes("/nextjs-api/stream/create-evaluation"),
      "URL should include /nextjs-api/stream/create-evaluation"
    );
  });

  it("builds headers with cookie", () => {
    const executor = new LMArenaExecutor();
    const headers = access(executor).buildHeaders("gpt-4", { cookie: "session=abc123" }, {});
    assert.ok(headers.Cookie, "Should have Cookie header");
    assert.equal(headers.Cookie, "session=abc123");
    assert.equal(headers["Content-Type"], "application/json");
    assert.equal(headers.Accept, "text/event-stream");
  });

  it("builds headers without cookie when not provided", () => {
    const executor = new LMArenaExecutor();
    const headers = access(executor).buildHeaders("gpt-4", {}, {});
    assert.ok(!headers.Cookie, "Should not have Cookie header when no cookie provided");
  });

  it("reads cookie from credentials correctly", () => {
    const executor = new LMArenaExecutor();
    const ex = access(executor);

    // Direct cookie field
    let headers = ex.buildHeaders("gpt-4", { cookie: "session=abc" }, {});
    assert.equal(headers.Cookie, "session=abc");

    // apiKey field (dashboard form)
    headers = ex.buildHeaders("gpt-4", { apiKey: "session=def" }, {});
    assert.equal(headers.Cookie, "session=def");

    // providerSpecificData.cookie
    headers = ex.buildHeaders("gpt-4", { providerSpecificData: { cookie: "session=ghi" } }, {});
    assert.equal(headers.Cookie, "session=ghi");

    // Priority: direct > apiKey > providerSpecificData
    headers = ex.buildHeaders("gpt-4", { cookie: "session=abc", apiKey: "session=def" }, {});
    assert.equal(headers.Cookie, "session=abc");
  });

  it("parses LMArena SSE text events (a0: prefix)", () => {
    const textEvent = 'a0:{"text":"Hello, world!"}';
    const result = parseArenaSSE(textEvent);

    assert.ok(result, "Should parse text event");
    assert.equal(result.type, "text");
    assert.equal(result.content, "Hello, world!");
  });

  it("parses bare AI SDK text events (0: prefix)", () => {
    const textEvent = '0:"Hello, world!"';
    const result = parseArenaSSE(textEvent);

    assert.ok(result, "Should parse text event");
    assert.equal(result.type, "text");
    assert.equal(result.content, "Hello, world!");
  });

  it("parses LMArena SSE thinking events (ag: prefix)", () => {
    const thinkingEvent = 'ag:{"thinking":"Let me analyze this..."}';
    const result = parseArenaSSE(thinkingEvent);

    assert.ok(result, "Should parse thinking event");
    assert.equal(result.type, "thinking");
    assert.equal(result.content, "Let me analyze this...");
  });

  it("parses bare AI SDK reasoning events (g: prefix)", () => {
    const thinkingEvent = 'g:"Let me analyze this..."';
    const result = parseArenaSSE(thinkingEvent);

    assert.ok(result, "Should parse reasoning event");
    assert.equal(result.type, "thinking");
    assert.equal(result.content, "Let me analyze this...");
  });

  it("parses LMArena SSE error events (a3: and ae: prefixes)", () => {
    const errorEvent1 = 'a3:{"error":"Rate limit exceeded"}';
    const result1 = parseArenaSSE(errorEvent1);
    assert.ok(result1, "Should parse a3: error event");
    assert.equal(result1.type, "error");
    assert.equal(result1.content, "Rate limit exceeded");

    const errorEvent2 = 'ae:{"error":"Invalid session"}';
    const result2 = parseArenaSSE(errorEvent2);
    assert.ok(result2, "Should parse ae: error event");
    assert.equal(result2.type, "error");
    assert.equal(result2.content, "Invalid session");
  });

  it("parses bare AI SDK error events (3: prefix)", () => {
    const errorEvent = '3:"Rate limit exceeded"';
    const result = parseArenaSSE(errorEvent);

    assert.ok(result, "Should parse error event");
    assert.equal(result.type, "error");
    assert.equal(result.content, "Rate limit exceeded");
  });

  it("parses LMArena SSE done event (ad: prefix)", () => {
    const doneEvent = "ad:{}";
    const result = parseArenaSSE(doneEvent);

    assert.ok(result, "Should parse done event");
    assert.equal(result.type, "done");
  });

  it("parses bare AI SDK finish events (d: prefix)", () => {
    const doneEvent = 'd:{"finishReason":"stop"}';
    const result = parseArenaSSE(doneEvent);

    assert.ok(result, "Should parse done event");
    assert.equal(result.type, "done");
  });

  it("handles malformed SSE events gracefully", () => {
    const malformedEvent = "invalid:data";
    const result = parseArenaSSE(malformedEvent);

    assert.equal(result, null, "Should return null for malformed events");
  });

  it("transforms OpenAI messages to LMArena create-evaluation format", () => {
    const executor = new LMArenaExecutor();
    const transformRequest = access(executor).transformRequest.bind(access(executor));

    const openaiBody = {
      messages: [
        { role: "system", content: "You are a helpful assistant." },
        { role: "user", content: "Hello!" },
        { role: "assistant", content: "Hi there!" },
        { role: "user", content: "How are you?" },
      ],
      model: "gpt-4",
      stream: true,
    };

    const arenaBody = transformRequest(openaiBody, "gpt-4");

    assert.ok(arenaBody, "Should transform request body");
    assert.match(arenaBody.id, UUID_V7_RE, "Should have UUIDv7 evaluation session id");
    assert.match(arenaBody.userMessageId, UUID_V7_RE, "Should have UUIDv7 user message id");
    assert.match(arenaBody.modelAMessageId, UUID_V7_RE, "Should have UUIDv7 model message id");
    assert.equal(arenaBody.mode, "direct-battle");
    assert.equal(arenaBody.modality, "chat");
    assert.equal(arenaBody.modelAId, "gpt-4", "Should set modelAId");
    assert.equal(arenaBody.modelBId, undefined, "Should not set modelBId for direct mode");
    assert.equal(arenaBody.modelBMessageId, undefined, "Should not set modelBMessageId");
    assert.equal(arenaBody.recaptchaV3Token, null);
    assert.deepEqual(arenaBody.userMessage.experimental_attachments, []);
    assert.deepEqual(arenaBody.userMessage.metadata, {});
    assert.ok(
      arenaBody.userMessage.content.includes("You are a helpful assistant."),
      "Should preserve system context in first prompt"
    );
    assert.ok(
      arenaBody.userMessage.content.includes("How are you?"),
      "Should preserve latest user prompt"
    );
  });

  it("handles null request bodies when transforming requests", () => {
    const executor = new LMArenaExecutor();
    const arenaBody = access(executor).transformRequest(null, "gpt-4");

    assert.equal(arenaBody.modelAId, "gpt-4");
    assert.equal(arenaBody.userMessage.content, "");
  });

  it("maps display model names to Arena internal model ids", () => {
    const models = [
      {
        id: "019e080d-c29d-7d9a-aa54-faed41da0763",
        publicName: "gemini-3.1-pro-preview",
        name: "gemini-3.1-pro-preview",
        displayName: "Gemini 3.1 Pro Preview",
        userSelectable: true,
        capabilities: {
          inputCapabilities: { text: true },
          outputCapabilities: { text: true },
        },
        rankByModality: { chat: 18 },
      },
    ];

    assert.equal(
      pickLMArenaModelId("gemini-3.1-pro-preview", models),
      "019e080d-c29d-7d9a-aa54-faed41da0763"
    );
    assert.equal(
      pickLMArenaModelId("lmarena/Gemini 3.1 Pro Preview", models),
      "019e080d-c29d-7d9a-aa54-faed41da0763"
    );
  });

  it("prefers chat-capable ranked variants when public names are duplicated", () => {
    const models = [
      {
        id: "aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee",
        publicName: "gemini-3.1-pro-preview",
        displayName: "gemini-3.1-pro-preview",
        userSelectable: true,
        capabilities: {
          inputCapabilities: { text: true },
          outputCapabilities: { web: true },
        },
        rankByModality: { webdev: 29 },
      },
      {
        id: "019e080d-c29d-7d9a-aa54-faed41da0763",
        publicName: "gemini-3.1-pro-preview",
        displayName: "gemini-3.1-pro-preview",
        userSelectable: true,
        capabilities: {
          inputCapabilities: { text: true, image: true },
          outputCapabilities: { text: true, web: true },
        },
        rankByModality: { chat: 18, webdev: 29 },
      },
    ];

    assert.equal(
      pickLMArenaModelId("gemini-3.1-pro-preview", models),
      "019e080d-c29d-7d9a-aa54-faed41da0763"
    );
  });

  it("drops unranked sentinel rows (huge chat rank) that usually 404 on probe", () => {
    const models = [
      {
        id: "aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee",
        publicName: "mimo-v2.5-pro",
        displayName: "mimo-v2.5-pro",
        userSelectable: true,
        capabilities: {
          inputCapabilities: { text: true },
          outputCapabilities: { text: true, web: true },
        },
        rankByModality: { chat: Number.MAX_SAFE_INTEGER },
      },
      {
        id: "11111111-2222-3333-4444-555555555555",
        name: "mimo-v2.5-pro",
        publicName: "mimo-v2.5-pro",
        displayName: "mimo-v2.5-pro",
        organization: "xiaomi",
        provider: "xiaomiV1",
        userSelectable: true,
        capabilities: {
          inputCapabilities: { text: true },
          outputCapabilities: { text: true, web: true },
        },
        rankByModality: { chat: 42 },
      },
    ];

    assert.equal(
      pickLMArenaModelId("mimo-v2.5-pro", models),
      "11111111-2222-3333-4444-555555555555"
    );
    assert.deepEqual(normalizeLMArenaModelsForCatalog(models), [
      {
        id: "mimo-v2.5-pro",
        name: "mimo-v2.5-pro",
        owned_by: "xiaomi",
        apiFormat: "chat-completions",
        supportedEndpoints: ["chat"],
      },
    ]);
  });

  it("normalizes live initialModels into unique chat catalog ids", () => {
    const models = [
      {
        id: "aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee",
        publicName: "gemini-3.1-pro-preview",
        displayName: "gemini-3.1-pro-preview",
        userSelectable: true,
        capabilities: {
          inputCapabilities: { text: true },
          outputCapabilities: { web: true },
        },
        rankByModality: { webdev: 29 },
      },
      {
        id: "019e080d-c29d-7d9a-aa54-faed41da0763",
        publicName: "gemini-3.1-pro-preview",
        displayName: "gemini-3.1-pro-preview",
        organization: "google",
        userSelectable: true,
        capabilities: {
          inputCapabilities: { text: true, image: true },
          outputCapabilities: { text: true, web: true },
        },
        rankByModality: { chat: 18, webdev: 29 },
      },
      {
        id: "99999999-9999-9999-9999-999999999999",
        publicName: "hidden-model",
        displayName: "Hidden Model",
        userSelectable: false,
        capabilities: {
          inputCapabilities: { text: true },
          outputCapabilities: { text: true },
        },
        rankByModality: { chat: 1 },
      },
    ];

    assert.deepEqual(normalizeLMArenaModelsForCatalog(models), [
      {
        id: "gemini-3.1-pro-preview",
        name: "gemini-3.1-pro-preview",
        owned_by: "google",
        supportsVision: true,
        apiFormat: "chat-completions",
        supportedEndpoints: ["chat"],
      },
    ]);
  });

  it("soft-excludes models marked dead after 404/502 probes", () => {
    clearLMArenaDeadCatalogModels();
    const models = [
      {
        id: "019e080d-c29d-7d9a-aa54-faed41da0763",
        publicName: "gemini-3.1-pro-preview",
        displayName: "gemini-3.1-pro-preview",
        organization: "google",
        userSelectable: true,
        capabilities: {
          inputCapabilities: { text: true, image: true },
          outputCapabilities: { text: true },
        },
        rankByModality: { chat: 18 },
      },
    ];
    assert.equal(normalizeLMArenaModelsForCatalog(models).length, 1);
    markLMArenaCatalogModelDead("gemini-3.1-pro-preview");
    assert.equal(normalizeLMArenaModelsForCatalog(models).length, 0);
    clearLMArenaDeadCatalogModels();
  });

  it("keeps raw Arena ids unchanged when no model mapping is needed", () => {
    assert.equal(pickLMArenaModelId(TEST_ARENA_MODEL_ID, []), TEST_ARENA_MODEL_ID);
  });

  it("resolves catalog public names via static Direct-chat allowlist (no arena.ai fetch)", async () => {
    const executor = new LMArenaExecutor();
    let arenaHomeFetches = 0;
    __setTlsFetchOverrideForTesting(async (url) => {
      if (url === "https://arena.ai/" || /arena\.ai\/?$/.test(url)) {
        arenaHomeFetches++;
        return { status: 200, headers: new Headers(), text: "<html></html>", body: null };
      }
      return {
        status: 200,
        headers: new Headers({ "Content-Type": "text/event-stream" }),
        text: '0:"ok"\nd:{"finishReason":"stop"}\n',
        body: null,
      };
    });

    try {
      const result = await executor.execute({
        model: "gemini-3.1-pro-preview",
        body: { messages: [{ role: "user", content: "Hello" }] },
        credentials: { cookie: "session=test" },
        signal: new AbortController().signal,
        log: console,
      });
      assert.equal(result.response.status, 200);
      // Model resolution must not scrape arena.ai home for initialModels.
      assert.equal(arenaHomeFetches, 0);
      // create-evaluation should receive the scraped Arena UUID, not the public name.
      const body = result.transformedBody as { modelAId?: string };
      assert.match(String(body.modelAId || ""), /^[0-9a-f-]{36}$/i);
    } finally {
      __setTlsFetchOverrideForTesting(null);
    }
  });

  it("returns an empty model list when initialModels end marker is before the array", () => {
    assert.deepEqual(
      parseLMArenaInitialModels('"initialModelAId"],"initialModels":[{"id":"bad"}]'),
      []
    );
  });

  it("returns 401 when cookie is missing", async () => {
    const executor = new LMArenaExecutor();

    const result = await executor.execute({
      model: "gpt-4",
      body: { messages: [{ role: "user", content: "Hello" }] },
      credentials: {},
      signal: new AbortController().signal,
      log: console,
    });

    assert.equal(result.response.status, 401, "Should return 401 for missing cookie");
    const errorBody = await result.response.json();
    assert.ok(errorBody.error, "Should have error object");
    assert.ok(errorBody.error.message.includes("cookie"), "Error should mention cookie");
  });

  it("handles streaming response correctly", async () => {
    const executor = new LMArenaExecutor();
    const mockSSE = [
      'data: a0:{"text":"Hello"}\n\n',
      'data: a0:{"text":", world!"}\n\n',
      "data: ad:{}\n\n",
    ].join("");

    __setTlsFetchOverrideForTesting(async () => ({
      status: 200,
      headers: new Headers({ "Content-Type": "text/event-stream" }),
      text: null,
      body: new ReadableStream({
        start(controller) {
          controller.enqueue(new TextEncoder().encode(mockSSE));
          controller.close();
        },
      }),
    }));

    try {
      const result = await executor.execute({
        model: TEST_ARENA_MODEL_ID,
        body: { messages: [{ role: "user", content: "Hello" }], stream: true },
        credentials: { cookie: "session=test" },
        signal: new AbortController().signal,
        log: console,
      });

      assert.equal(result.response.status, 200, "Should return 200 for successful streaming");
      assert.ok(result.response.body, "Should have response body for streaming");
    } finally {
      __setTlsFetchOverrideForTesting(null);
    }
  });

  it("handles error response from LMArena API", async () => {
    const executor = new LMArenaExecutor();
    __setTlsFetchOverrideForTesting(async () => ({
      status: 429,
      headers: new Headers({ "Content-Type": "application/json" }),
      text: JSON.stringify({ error: { message: "Rate limit exceeded" } }),
      body: null,
    }));

    try {
      const result = await executor.execute({
        model: TEST_ARENA_MODEL_ID,
        body: { messages: [{ role: "user", content: "Hello" }] },
        credentials: { cookie: "session=test" },
        signal: new AbortController().signal,
        log: console,
      });

      assert.equal(result.response.status, 429, "Should return 429 for rate limit");
      const errorBody = await result.response.json();
      assert.ok(errorBody.error, "Should have error object");
    } finally {
      __setTlsFetchOverrideForTesting(null);
    }
  });

  it("forwards optional browser reCAPTCHA token from credentials", () => {
    const executor = new LMArenaExecutor();
    const body = access(executor).transformRequest(
      { messages: [{ role: "user", content: "Hi" }] },
      "gpt-4",
      { cookie: "x=1", providerSpecificData: { recaptchaV3Token: "tok_abc" } }
    );
    assert.equal(body.recaptchaV3Token, "tok_abc");
  });

  it("surfaces Cloudflare challenge as bot-management error", async () => {
    const executor = new LMArenaExecutor();
    __setTlsFetchOverrideForTesting(async () => ({
      status: 403,
      headers: new Headers({ "Content-Type": "text/html" }),
      text: "<html>Just a moment... challenges.cloudflare.com</html>",
      body: null,
    }));

    try {
      const result = await executor.execute({
        model: TEST_ARENA_MODEL_ID,
        body: { messages: [{ role: "user", content: "Hello" }] },
        credentials: { cookie: "session=test" },
        signal: new AbortController().signal,
        log: console,
      });
      assert.equal(result.response.status, 403);
      const err = await result.response.json();
      assert.match(err.error.message, /Cloudflare|bot|recaptcha/i);
      assert.equal(err.error.code, "cloudflare_or_bot");
    } finally {
      __setTlsFetchOverrideForTesting(null);
    }
  });
});
