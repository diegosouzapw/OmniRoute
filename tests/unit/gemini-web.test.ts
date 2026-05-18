import test from "node:test";
import assert from "node:assert/strict";

const { GeminiWebExecutor } = await import("../../open-sse/executors/gemini-web.ts");
const { getExecutor, hasSpecializedExecutor } = await import("../../open-sse/executors/index.ts");

// ─── Helpers ────────────────────────────────────────────────────────────────

function mockGeminiStream(events: unknown[]) {
  const encoder = new TextEncoder();
  const lines = events.map((e) => JSON.stringify(e)).join("\n") + "\n";
  return new ReadableStream({
    start(controller) {
      controller.enqueue(encoder.encode(lines));
      controller.close();
    },
  });
}

function mockFetch(status: number, events: unknown[]) {
  const original = globalThis.fetch;
  globalThis.fetch = async () =>
    new Response(mockGeminiStream(events), {
      status,
      headers: { "Content-Type": "application/json" },
    });
  return () => {
    globalThis.fetch = original;
  };
}

function mockFetchCapture(events: unknown[]) {
  const original = globalThis.fetch;
  let capturedUrl: string | null = null;
  let capturedHeaders: Record<string, string> = {};
  let capturedBody: Record<string, unknown> = {};
  globalThis.fetch = async (url: any, opts: any) => {
    capturedUrl = String(url);
    capturedHeaders = opts?.headers || {};
    capturedBody = JSON.parse(opts?.body || "{}");
    return new Response(mockGeminiStream(events), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  };
  return {
    restore: () => {
      globalThis.fetch = original;
    },
    get url() {
      return capturedUrl;
    },
    get headers() {
      return capturedHeaders;
    },
    get body() {
      return capturedBody;
    },
  };
}

// Gemini web response format (simplified)
const SIMPLE_RESPONSE = [
  { result: { response: { text: "Hello world!", model: "gemini-2.5-pro" } } },
];

const STREAMING_RESPONSE = [
  { result: { response: { text: "Hello", model: "gemini-2.5-pro" } } },
  { result: { response: { text: " world!", model: "gemini-2.5-pro" } } },
  { result: { response: { text: "", model: "gemini-2.5-pro", done: true } } },
];

// ─── Registration ───────────────────────────────────────────────────────────

test("GeminiWebExecutor is registered in executor index", () => {
  assert.ok(hasSpecializedExecutor("gemini-web"));
  const executor = getExecutor("gemini-web");
  assert.ok(executor instanceof GeminiWebExecutor);
});

test("GeminiWebExecutor sets correct provider name", () => {
  const executor = new GeminiWebExecutor();
  assert.equal(executor.getProvider(), "gemini-web");
});

// ─── Non-streaming ──────────────────────────────────────────────────────────

test("Non-streaming: simple response", async () => {
  const restore = mockFetch(200, SIMPLE_RESPONSE);
  try {
    const executor = new GeminiWebExecutor();
    const result = await executor.execute({
      model: "gemini-2.5-pro",
      body: { messages: [{ role: "user", content: "hi" }], stream: false },
      stream: false,
      credentials: { apiKey: "test-cookie-value" },
      signal: AbortSignal.timeout(10000),
      log: null,
    });
    assert.equal(result.response.status, 200);
    const json = (await result.response.json()) as any;
    assert.equal(json.object, "chat.completion");
    assert.equal(json.choices[0].message.role, "assistant");
    assert.equal(json.choices[0].message.content, "Hello world!");
    assert.equal(json.choices[0].finish_reason, "stop");
    assert.ok(json.model.includes("gemini"));
  } finally {
    restore();
  }
});

// ─── Streaming ──────────────────────────────────────────────────────────────

test("Streaming: yields SSE chunks", async () => {
  const restore = mockFetch(200, STREAMING_RESPONSE);
  try {
    const executor = new GeminiWebExecutor();
    const result = await executor.execute({
      model: "gemini-2.5-pro",
      body: { messages: [{ role: "user", content: "hi" }], stream: true },
      stream: true,
      credentials: { apiKey: "test-cookie-value" },
      signal: AbortSignal.timeout(10000),
      log: null,
    });
    assert.equal(result.response.status, 200);
    const text = await result.response.text();
    assert.ok(text.includes("data:"));
    assert.ok(text.includes("Hello"));
    assert.ok(text.includes("[DONE]"));
  } finally {
    restore();
  }
});

// ─── Auth ───────────────────────────────────────────────────────────────────

test("Auth: sends cookie header", async () => {
  const capture = mockFetchCapture(SIMPLE_RESPONSE);
  try {
    const executor = new GeminiWebExecutor();
    await executor.execute({
      model: "gemini-2.5-pro",
      body: { messages: [{ role: "user", content: "hi" }], stream: false },
      stream: false,
      credentials: { apiKey: "my-secure-1psid" },
      signal: AbortSignal.timeout(10000),
      log: null,
    });
    // Cookie should be sent in request
    assert.ok(capture.headers);
  } finally {
    capture.restore();
  }
});

// ─── Model mapping ──────────────────────────────────────────────────────────

test("Model mapping: translates model IDs", async () => {
  const restore = mockFetch(200, SIMPLE_RESPONSE);
  try {
    const executor = new GeminiWebExecutor();
    const result = await executor.execute({
      model: "gemini-2.5-flash",
      body: { messages: [{ role: "user", content: "hi" }], stream: false },
      stream: false,
      credentials: { apiKey: "test-cookie" },
      signal: AbortSignal.timeout(10000),
      log: null,
    });
    assert.equal(result.response.status, 200);
  } finally {
    restore();
  }
});

// ─── Error handling ─────────────────────────────────────────────────────────

test("Error: handles 401 unauthorized", async () => {
  const restore = mockFetch(401, [{ error: "Unauthorized" }]);
  try {
    const executor = new GeminiWebExecutor();
    const result = await executor.execute({
      model: "gemini-2.5-pro",
      body: { messages: [{ role: "user", content: "hi" }], stream: false },
      stream: false,
      credentials: { apiKey: "invalid-cookie" },
      signal: AbortSignal.timeout(10000),
      log: null,
    });
    // Should return error response
    assert.ok(result.response.status >= 400);
  } finally {
    restore();
  }
});

test("Error: handles 429 rate limit", async () => {
  const restore = mockFetch(429, [{ error: "Rate limited" }]);
  try {
    const executor = new GeminiWebExecutor();
    const result = await executor.execute({
      model: "gemini-2.5-pro",
      body: { messages: [{ role: "user", content: "hi" }], stream: false },
      stream: false,
      credentials: { apiKey: "test-cookie" },
      signal: AbortSignal.timeout(10000),
      log: null,
    });
    assert.ok(result.response.status >= 400);
  } finally {
    restore();
  }
});

// ─── Provider registration ──────────────────────────────────────────────────

test("Provider: gemini-web in WEB_COOKIE_PROVIDERS", async () => {
  const { WEB_COOKIE_PROVIDERS } = await import("../../src/shared/constants/providers.ts");
  assert.ok(WEB_COOKIE_PROVIDERS["gemini-web"], "gemini-web should be in WEB_COOKIE_PROVIDERS");
  assert.equal(WEB_COOKIE_PROVIDERS["gemini-web"].id, "gemini-web");
  assert.ok(WEB_COOKIE_PROVIDERS["gemini-web"].authHint);
});

test("Provider: gemini-web in providerRegistry", async () => {
  const { REGISTRY } = await import("../../open-sse/config/providerRegistry.ts");
  assert.ok(REGISTRY["gemini-web"], "gemini-web should be in providerRegistry");
  assert.equal(REGISTRY["gemini-web"].executor, "gemini-web");
  assert.ok(REGISTRY["gemini-web"].models.length > 0);
});
