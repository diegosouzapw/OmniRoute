/**
 * bifrost-routing-core.test.ts
 *
 * TDD suite for the hexagonal RouterPort + BifrostAdapter + FakeRouterAdapter.
 * No live gateway required — all network calls are intercepted via globalThis.fetch mock.
 *
 * Coverage targets:
 *  1. RouterPort contract (FakeRouterAdapter)
 *     a. route() returns ok:true on success
 *     b. route() returns ok:false on failure
 *     c. empty queue returns config_error
 *     d. calls are recorded
 *     e. listAvailableProviders() returns injected list
 *     f. listModels() returns fake list
 *
 *  2. BifrostAdapter (fetch-intercepted)
 *     a. Happy path — 200 from bifrost → ok:true, correct fields
 *     b. Provider header propagated in request
 *     c. API key injected as Bearer when set
 *     d. bifrost 429 → rate_limit error, retriable
 *     e. bifrost 500 → provider_error, retriable
 *     f. Fallback: first provider 500, second succeeds → usedFallback=true
 *     g. fitnessTier override reorders provider list
 *     h. No fallback config: first failure returns immediately
 *     i. fetch throws (network error) → provider_error, retriable
 *     j. listAvailableProviders() — bifrost responds with provider list
 *     k. listAvailableProviders() — bifrost unreachable → returns config list
 *     l. listModels() — bifrost responds with model list
 *     m. listModels() — bifrost 404 → returns []
 *
 *  3. DEFAULT_ROUTER_CONFIG shape validation
 */

import test from "node:test";
import assert from "node:assert/strict";

import type { RouteRequest } from "../../src/domain/router/port.ts";
import {
  DEFAULT_ROUTER_CONFIG,
} from "../../src/domain/router/port.ts";
import { FakeRouterAdapter } from "../../src/lib/adapters/fakeRouterAdapter.ts";
import { BifrostAdapter } from "../../src/lib/adapters/bifrostAdapter.ts";

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function makeReq(overrides: Partial<RouteRequest> = {}): RouteRequest {
  return {
    model: "gpt-4o",
    messages: [{ role: "user", content: "hello" }],
    ...overrides,
  };
}

type FetchMock = (
  input: string | URL | Request,
  init?: RequestInit
) => Promise<Response>;

function withFetch(mock: FetchMock, fn: () => Promise<void>): Promise<void> {
  const orig = globalThis.fetch;
  globalThis.fetch = mock as typeof fetch;
  return fn().finally(() => {
    globalThis.fetch = orig;
  });
}

function jsonResponse(body: unknown, status = 200, headers: Record<string, string> = {}): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json", ...headers },
  });
}

// ---------------------------------------------------------------------------
// 1. FakeRouterAdapter (RouterPort contract)
// ---------------------------------------------------------------------------

test("FakeRouterAdapter: route() ok:true on success", async () => {
  const adapter = new FakeRouterAdapter([{ ok: true, text: "hi there", provider: "openai" }]);
  const result = await adapter.route(makeReq());
  assert.equal(result.ok, true);
  if (result.ok) {
    assert.equal(result.value.text, "hi there");
    assert.equal(result.value.provider, "openai");
    assert.equal(result.value.model, "gpt-4o");
    assert.equal(result.value.usedFallback, false);
  }
});

test("FakeRouterAdapter: route() ok:false on failure", async () => {
  const adapter = new FakeRouterAdapter([
    { ok: false, code: "rate_limit", message: "quota exceeded", retriable: true },
  ]);
  const result = await adapter.route(makeReq());
  assert.equal(result.ok, false);
  if (!result.ok) {
    assert.equal(result.error.code, "rate_limit");
    assert.equal(result.error.retriable, true);
  }
});

test("FakeRouterAdapter: empty queue returns config_error", async () => {
  const adapter = new FakeRouterAdapter([]);
  const result = await adapter.route(makeReq());
  assert.equal(result.ok, false);
  if (!result.ok) {
    assert.equal(result.error.code, "config_error");
  }
});

test("FakeRouterAdapter: calls are recorded", async () => {
  const adapter = new FakeRouterAdapter([{ ok: true }, { ok: true }]);
  const req1 = makeReq({ model: "model-a" });
  const req2 = makeReq({ model: "model-b" });
  await adapter.route(req1);
  await adapter.route(req2);
  assert.equal(adapter.calls.length, 2);
  assert.equal(adapter.calls[0]!.model, "model-a");
  assert.equal(adapter.calls[1]!.model, "model-b");
});

test("FakeRouterAdapter: listAvailableProviders returns injected list", async () => {
  const adapter = new FakeRouterAdapter([], ["anthropic", "groq"]);
  const providers = await adapter.listAvailableProviders();
  assert.deepEqual(providers, ["anthropic", "groq"]);
});

test("FakeRouterAdapter: listModels returns fake list", async () => {
  const adapter = new FakeRouterAdapter();
  const models = await adapter.listModels();
  assert.ok(models.length > 0);
});

// ---------------------------------------------------------------------------
// 2. BifrostAdapter (fetch-intercepted)
// ---------------------------------------------------------------------------

const FAKE_BIFROST_RESPONSE = {
  id: "chat-123",
  choices: [{ message: { role: "assistant", content: "hello world" }, finish_reason: "stop" }],
  usage: { prompt_tokens: 10, completion_tokens: 5 },
  model: "gpt-4o",
};

test("BifrostAdapter: happy path 200 → ok:true with correct fields", async () => {
  const adapter = new BifrostAdapter({
    baseUrl: "http://bifrost-test",
    router: { providerPriority: ["openai"] },
  });

  await withFetch(async (_url, _init) => {
    return jsonResponse(FAKE_BIFROST_RESPONSE, 200, { "x-provider": "openai" });
  }, async () => {
    const result = await adapter.route(makeReq());
    assert.equal(result.ok, true);
    if (result.ok) {
      assert.equal(result.value.text, "hello world");
      assert.equal(result.value.provider, "openai");
      assert.equal(result.value.model, "gpt-4o");
      assert.equal(result.value.inputTokens, 10);
      assert.equal(result.value.outputTokens, 5);
      assert.equal(result.value.usedFallback, false);
    }
  });
});

test("BifrostAdapter: x-provider header propagated in request", async () => {
  const adapter = new BifrostAdapter({
    baseUrl: "http://bifrost-test",
    router: { providerPriority: ["anthropic"] },
  });

  let capturedProvider: string | null = null;
  await withFetch(async (_url, init) => {
    capturedProvider = (init?.headers as Record<string, string>)?.["x-provider"] ?? null;
    return jsonResponse(FAKE_BIFROST_RESPONSE);
  }, async () => {
    await adapter.route(makeReq());
    assert.equal(capturedProvider, "anthropic");
  });
});

test("BifrostAdapter: api key injected as Bearer when set", async () => {
  const adapter = new BifrostAdapter({
    baseUrl: "http://bifrost-test",
    apiKey: "test-key-abc",
    router: { providerPriority: ["openai"] },
  });

  let capturedAuth: string | null = null;
  await withFetch(async (_url, init) => {
    capturedAuth = (init?.headers as Record<string, string>)?.["Authorization"] ?? null;
    return jsonResponse(FAKE_BIFROST_RESPONSE);
  }, async () => {
    await adapter.route(makeReq());
    assert.equal(capturedAuth, "Bearer test-key-abc");
  });
});

test("BifrostAdapter: 429 → rate_limit error, retriable=true", async () => {
  const adapter = new BifrostAdapter({
    baseUrl: "http://bifrost-test",
    router: { providerPriority: ["openai"], enableFallback: false },
  });

  await withFetch(async () => {
    return new Response("rate limited", { status: 429 });
  }, async () => {
    const result = await adapter.route(makeReq());
    assert.equal(result.ok, false);
    if (!result.ok) {
      assert.equal(result.error.code, "rate_limit");
      assert.equal(result.error.retriable, true);
    }
  });
});

test("BifrostAdapter: 500 → provider_error, retriable=true", async () => {
  const adapter = new BifrostAdapter({
    baseUrl: "http://bifrost-test",
    router: { providerPriority: ["openai"], enableFallback: false },
  });

  await withFetch(async () => {
    return new Response("internal server error", { status: 500 });
  }, async () => {
    const result = await adapter.route(makeReq());
    assert.equal(result.ok, false);
    if (!result.ok) {
      assert.equal(result.error.code, "provider_error");
      assert.equal(result.error.retriable, true);
    }
  });
});

test("BifrostAdapter: fallback — first 500, second succeeds → usedFallback=true", async () => {
  const adapter = new BifrostAdapter({
    baseUrl: "http://bifrost-test",
    router: { providerPriority: ["openai", "anthropic"], enableFallback: true },
  });

  let callCount = 0;
  await withFetch(async (_url, init) => {
    callCount++;
    const provider = (init?.headers as Record<string, string>)?.["x-provider"];
    if (provider === "openai") {
      return new Response("overloaded", { status: 500 });
    }
    return jsonResponse(FAKE_BIFROST_RESPONSE, 200, { "x-provider": "anthropic" });
  }, async () => {
    const result = await adapter.route(makeReq());
    assert.equal(result.ok, true);
    if (result.ok) {
      assert.equal(result.value.usedFallback, true);
      assert.equal(result.value.provider, "anthropic");
    }
    assert.equal(callCount, 2);
  });
});

test("BifrostAdapter: fitnessTier override reorders providers", async () => {
  const adapter = new BifrostAdapter({
    baseUrl: "http://bifrost-test",
    router: {
      providerPriority: ["openai", "anthropic"],
      tierOverrides: { "best-reasoning": "anthropic" },
      enableFallback: false,
    },
  });

  let firstProvider: string | null = null;
  await withFetch(async (_url, init) => {
    if (!firstProvider) {
      firstProvider = (init?.headers as Record<string, string>)?.["x-provider"] ?? null;
    }
    return jsonResponse(FAKE_BIFROST_RESPONSE, 200, { "x-provider": firstProvider ?? "" });
  }, async () => {
    await adapter.route(makeReq({ fitnessTier: "best-reasoning" }));
    assert.equal(firstProvider, "anthropic");
  });
});

test("BifrostAdapter: no fallback — first failure returns immediately", async () => {
  const adapter = new BifrostAdapter({
    baseUrl: "http://bifrost-test",
    router: { providerPriority: ["openai", "anthropic"], enableFallback: false },
  });

  let callCount = 0;
  await withFetch(async () => {
    callCount++;
    return new Response("err", { status: 500 });
  }, async () => {
    const result = await adapter.route(makeReq());
    assert.equal(result.ok, false);
    assert.equal(callCount, 1); // did NOT try anthropic
  });
});

test("BifrostAdapter: network error → provider_error retriable=true", async () => {
  const adapter = new BifrostAdapter({
    baseUrl: "http://bifrost-test",
    router: { providerPriority: ["openai"], enableFallback: false },
  });

  await withFetch(async () => {
    throw new TypeError("fetch failed");
  }, async () => {
    const result = await adapter.route(makeReq());
    assert.equal(result.ok, false);
    if (!result.ok) {
      assert.equal(result.error.code, "provider_error");
      assert.equal(result.error.retriable, true);
    }
  });
});

test("BifrostAdapter: listAvailableProviders — bifrost returns provider list", async () => {
  const adapter = new BifrostAdapter({
    baseUrl: "http://bifrost-test",
    router: { providerPriority: ["openai"] },
  });

  await withFetch(async () => {
    return jsonResponse({ providers: ["openai", "anthropic", "groq"] });
  }, async () => {
    const providers = await adapter.listAvailableProviders();
    assert.deepEqual(providers, ["openai", "anthropic", "groq"]);
  });
});

test("BifrostAdapter: listAvailableProviders — bifrost unreachable falls back to config", async () => {
  const adapter = new BifrostAdapter({
    baseUrl: "http://bifrost-test",
    router: { providerPriority: ["openai", "mistral"] },
  });

  await withFetch(async () => {
    throw new TypeError("network error");
  }, async () => {
    const providers = await adapter.listAvailableProviders();
    assert.deepEqual(providers, ["openai", "mistral"]);
  });
});

test("BifrostAdapter: listModels — bifrost returns model list", async () => {
  const adapter = new BifrostAdapter({ baseUrl: "http://bifrost-test" });

  await withFetch(async () => {
    return jsonResponse({ data: [{ id: "gpt-4o" }, { id: "gpt-4o-mini" }] });
  }, async () => {
    const models = await adapter.listModels("openai");
    assert.deepEqual(models, ["gpt-4o", "gpt-4o-mini"]);
  });
});

test("BifrostAdapter: listModels — non-200 returns empty array", async () => {
  const adapter = new BifrostAdapter({ baseUrl: "http://bifrost-test" });

  await withFetch(async () => {
    return new Response("not found", { status: 404 });
  }, async () => {
    const models = await adapter.listModels();
    assert.deepEqual(models, []);
  });
});

// ---------------------------------------------------------------------------
// 3. DEFAULT_ROUTER_CONFIG shape
// ---------------------------------------------------------------------------

test("DEFAULT_ROUTER_CONFIG has required shape", () => {
  assert.ok(Array.isArray(DEFAULT_ROUTER_CONFIG.providerPriority));
  assert.ok(DEFAULT_ROUTER_CONFIG.providerPriority.length > 0);
  assert.equal(typeof DEFAULT_ROUTER_CONFIG.timeoutMs, "number");
  assert.equal(DEFAULT_ROUTER_CONFIG.enableFallback, true);
});
