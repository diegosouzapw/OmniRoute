import test from "node:test";
import assert from "node:assert/strict";

const { GrokWebExecutor } = await import("../../open-sse/executors/grok-web.ts");
const { getExecutor, hasSpecializedExecutor } = await import("../../open-sse/executors/index.ts");

// ─── Helpers ────────────────────────────────────────────────────────────────

function mockGrokStream(events: unknown[]) {
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
    new Response(mockGrokStream(events), {
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
    return new Response(mockGrokStream(events), {
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

const SIMPLE_RESPONSE = [
  { result: { response: { token: "Hello" } } },
  { result: { response: { token: " world!" } } },
  { result: { response: { modelResponse: { message: "Hello world!", responseId: "resp-123" } } } },
];

// ─── Registration ───────────────────────────────────────────────────────────

test("GrokWebExecutor is registered in executor index", () => {
  assert.ok(hasSpecializedExecutor("grok-web"));
  const executor = getExecutor("grok-web");
  assert.ok(executor instanceof GrokWebExecutor);
});

test("GrokWebExecutor sets correct provider name", () => {
  const executor = new GrokWebExecutor();
  assert.equal(executor.getProvider(), "grok-web");
});

// ─── Non-streaming ──────────────────────────────────────────────────────────

test("Non-streaming: simple response", async () => {
  const restore = mockFetch(200, SIMPLE_RESPONSE);
  try {
    const executor = new GrokWebExecutor();
    const result = await executor.execute({
      model: "grok-4.1-fast",
      body: { messages: [{ role: "user", content: "hi" }], stream: false },
      stream: false,
      credentials: { apiKey: "test-sso-token" },
      signal: AbortSignal.timeout(10000),
      log: null,
    });
    assert.equal(result.response.status, 200);
    const json = (await result.response.json()) as any;
    assert.equal(json.object, "chat.completion");
    assert.equal(json.choices[0].message.role, "assistant");
    assert.equal(json.choices[0].message.content, "Hello world!");
    assert.equal(json.choices[0].finish_reason, "stop");
    assert.ok(json.id.startsWith("chatcmpl-grok-"));
  } finally {
    restore();
  }
});

// ─── Streaming ──────────────────────────────────────────────────────────────

test("Streaming: produces valid SSE chunks", async () => {
  const restore = mockFetch(200, SIMPLE_RESPONSE);
  try {
    const executor = new GrokWebExecutor();
    const result = await executor.execute({
      model: "grok-4.1-fast",
      body: { messages: [{ role: "user", content: "hello" }], stream: true },
      stream: true,
      credentials: { apiKey: "test-sso" },
      signal: AbortSignal.timeout(10000),
      log: null,
    });
    assert.equal(result.response.status, 200);
    assert.equal(result.response.headers.get("Content-Type"), "text/event-stream");

    const text = await result.response.text();
    const lines = text.split("\n").filter((l: string) => l.startsWith("data: "));
    assert.ok(lines.length >= 3, `Expected at least 3 SSE data lines, got ${lines.length}`);

    // First chunk has role
    const first = JSON.parse(lines[0].slice(6));
    assert.equal(first.choices[0].delta.role, "assistant");

    // Last line is [DONE]
    const lastLine = text.trim().split("\n").filter(Boolean).pop();
    assert.equal(lastLine, "data: [DONE]");
  } finally {
    restore();
  }
});

// ─── Error handling ─────────────────────────────────────────────────────────

test("Error: 401 returns auth error", async () => {
  const restore = mockFetch(401, []);
  try {
    const executor = new GrokWebExecutor();
    const result = await executor.execute({
      model: "grok-4",
      body: { messages: [{ role: "user", content: "hi" }] },
      stream: false,
      credentials: { apiKey: "expired" },
      signal: AbortSignal.timeout(10000),
      log: null,
    });
    assert.equal(result.response.status, 401);
    const json = (await result.response.json()) as any;
    assert.ok(json.error.message.includes("auth failed"));
    assert.ok(json.error.message.includes("sso"));
  } finally {
    restore();
  }
});

test("Error: 429 returns rate limit message", async () => {
  const restore = mockFetch(429, []);
  try {
    const executor = new GrokWebExecutor();
    const result = await executor.execute({
      model: "grok-4",
      body: { messages: [{ role: "user", content: "hi" }] },
      stream: false,
      credentials: { apiKey: "test" },
      signal: AbortSignal.timeout(10000),
      log: null,
    });
    assert.equal(result.response.status, 429);
    const json = (await result.response.json()) as any;
    assert.ok(json.error.message.includes("rate limited"));
  } finally {
    restore();
  }
});

test("Error: empty messages returns 400", async () => {
  const executor = new GrokWebExecutor();
  const result = await executor.execute({
    model: "grok-4",
    body: { messages: [] },
    stream: false,
    credentials: { apiKey: "test" },
    signal: AbortSignal.timeout(10000),
    log: null,
  });
  assert.equal(result.response.status, 400);
});

test("Error: Grok stream error returns 502", async () => {
  const restore = mockFetch(200, [{ error: { message: "Internal error", code: "500" } }]);
  try {
    const executor = new GrokWebExecutor();
    const result = await executor.execute({
      model: "grok-4",
      body: { messages: [{ role: "user", content: "test" }], stream: false },
      stream: false,
      credentials: { apiKey: "test" },
      signal: AbortSignal.timeout(10000),
      log: null,
    });
    assert.equal(result.response.status, 502);
    const json = (await result.response.json()) as any;
    assert.ok(json.error.message.includes("Internal error"));
  } finally {
    restore();
  }
});

// ─── Auth headers ───────────────────────────────────────────────────────────

test("Auth: cookie sends sso= header", async () => {
  const cap = mockFetchCapture(SIMPLE_RESPONSE);
  try {
    const executor = new GrokWebExecutor();
    await executor.execute({
      model: "grok-4.1-fast",
      body: { messages: [{ role: "user", content: "test" }], stream: false },
      stream: false,
      credentials: { apiKey: "my-sso-token-value" },
      signal: AbortSignal.timeout(10000),
      log: null,
    });
    assert.equal(cap.headers["Cookie"], "sso=my-sso-token-value");
  } finally {
    cap.restore();
  }
});

test("Auth: strips sso= prefix if user included it", async () => {
  const cap = mockFetchCapture(SIMPLE_RESPONSE);
  try {
    const executor = new GrokWebExecutor();
    await executor.execute({
      model: "grok-4.1-fast",
      body: { messages: [{ role: "user", content: "test" }], stream: false },
      stream: false,
      credentials: { apiKey: "sso=my-token" },
      signal: AbortSignal.timeout(10000),
      log: null,
    });
    assert.equal(cap.headers["Cookie"], "sso=my-token");
    assert.ok(!cap.headers["Cookie"].includes("sso=sso="));
  } finally {
    cap.restore();
  }
});

// ─── Request format ─────────────────────────────────────────────────────────

test("Request: posts to correct Grok endpoint", async () => {
  const cap = mockFetchCapture(SIMPLE_RESPONSE);
  try {
    const executor = new GrokWebExecutor();
    await executor.execute({
      model: "grok-4.1-fast",
      body: { messages: [{ role: "user", content: "test" }], stream: false },
      stream: false,
      credentials: { apiKey: "test" },
      signal: AbortSignal.timeout(10000),
      log: null,
    });
    assert.equal(cap.url, "https://grok.com/rest/app-chat/conversations/new");
    assert.equal(cap.headers["Origin"], "https://grok.com");
    assert.ok(cap.headers["x-statsig-id"], "Should have x-statsig-id header");
    assert.ok(cap.headers["x-xai-request-id"], "Should have x-xai-request-id header");
    assert.ok(cap.headers["traceparent"]?.startsWith("00-"), "Should have W3C traceparent");
  } finally {
    cap.restore();
  }
});

test("Request: payload has correct model mapping", async () => {
  const cap = mockFetchCapture(SIMPLE_RESPONSE);
  try {
    const executor = new GrokWebExecutor();
    await executor.execute({
      model: "grok-4.1-expert",
      body: { messages: [{ role: "user", content: "test" }], stream: false },
      stream: false,
      credentials: { apiKey: "test" },
      signal: AbortSignal.timeout(10000),
      log: null,
    });
    assert.equal(cap.body.modeId, "expert");
    assert.equal("modelName" in cap.body, false);
    assert.equal("modelMode" in cap.body, false);
    assert.equal(cap.body.temporary, true);
  } finally {
    cap.restore();
  }
});

test("Request: grok-4-heavy maps to heavy mode", async () => {
  const cap = mockFetchCapture(SIMPLE_RESPONSE);
  try {
    const executor = new GrokWebExecutor();
    await executor.execute({
      model: "grok-4-heavy",
      body: { messages: [{ role: "user", content: "test" }], stream: false },
      stream: false,
      credentials: { apiKey: "test" },
      signal: AbortSignal.timeout(10000),
      log: null,
    });
    assert.equal(cap.body.modeId, "heavy");
    assert.equal("modelName" in cap.body, false);
    assert.equal("modelMode" in cap.body, false);
  } finally {
    cap.restore();
  }
});

// ─── Message parsing ────────────────────────────────────────────────────────

test("Message parsing: combines system + history + user", async () => {
  const cap = mockFetchCapture(SIMPLE_RESPONSE);
  try {
    const executor = new GrokWebExecutor();
    await executor.execute({
      model: "grok-4.1-fast",
      body: {
        messages: [
          { role: "system", content: "Be helpful" },
          { role: "user", content: "First question" },
          { role: "assistant", content: "First answer" },
          { role: "user", content: "Follow up" },
        ],
        stream: false,
      },
      stream: false,
      credentials: { apiKey: "test" },
      signal: AbortSignal.timeout(10000),
      log: null,
    });
    const msg = cap.body.message as string;
    assert.ok(msg.includes("Follow up"), "Should contain current user message");
    assert.ok(msg.includes("Be helpful"), "Should contain system message");
    assert.ok(msg.includes("First answer"), "Should contain assistant history");
  } finally {
    cap.restore();
  }
});

// ─── Provider registry ──────────────────────────────────────────────────────

test("Provider registry: grok-web has correct models", async () => {
  const { PROVIDER_MODELS } = await import("../../open-sse/config/providerModels.ts");
  const { getRegistryEntry } = await import("../../open-sse/config/providerRegistry.ts");
  const models = PROVIDER_MODELS["gw"];
  assert.ok(models, "gw should be in PROVIDER_MODELS");
  assert.equal(models.length, 5, `Expected 5 models, got ${models.length}`);
  const ids = models.map((m: any) => m.id);
  assert.ok(ids.includes("auto"));
  assert.ok(ids.includes("fast"));
  assert.ok(ids.includes("expert"));
  assert.ok(ids.includes("heavy"));
  assert.ok(ids.includes("grok-420-computer-use-sa"));
  assert.equal(getRegistryEntry("grok-web")?.passthroughModels, true);
});

// ─── Statsig header ─────────────────────────────────────────────────────────

test("Statsig: x-statsig-id is valid base64", async () => {
  const cap = mockFetchCapture(SIMPLE_RESPONSE);
  try {
    const executor = new GrokWebExecutor();
    await executor.execute({
      model: "grok-4.1-fast",
      body: { messages: [{ role: "user", content: "test" }], stream: false },
      stream: false,
      credentials: { apiKey: "test" },
      signal: AbortSignal.timeout(10000),
      log: null,
    });
    const statsig = cap.headers["x-statsig-id"];
    assert.ok(statsig, "Should have statsig header");
    const decoded = atob(statsig);
    assert.ok(
      decoded.startsWith("e:TypeError:"),
      `Decoded statsig should start with e:TypeError:, got: ${decoded}`
    );
  } finally {
    cap.restore();
  }
});
