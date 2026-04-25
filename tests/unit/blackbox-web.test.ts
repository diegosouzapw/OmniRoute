import test from "node:test";
import assert from "node:assert/strict";

const { BlackboxWebExecutor, normalizeBlackboxCookieHeader } =
  await import("../../open-sse/executors/blackbox-web.ts");
const { getExecutor, hasSpecializedExecutor } = await import("../../open-sse/executors/index.ts");

function mockTextStream(text: string) {
  const encoder = new TextEncoder();
  return new ReadableStream({
    start(controller) {
      controller.enqueue(encoder.encode(text));
      controller.close();
    },
  });
}

function mockFetch(status: number, text: string) {
  const original = globalThis.fetch;
  globalThis.fetch = async () =>
    new Response(mockTextStream(text), {
      status,
      headers: { "Content-Type": "text/plain; charset=utf-8" },
    });
  return () => {
    globalThis.fetch = original;
  };
}

function mockFetchCapture(status = 200, text = "Hello from Blackbox") {
  const original = globalThis.fetch;
  let capturedUrl: string | null = null;
  let capturedHeaders: Record<string, string> = {};
  let capturedBody: Record<string, unknown> = {};

  globalThis.fetch = async (url: any, opts: any) => {
    capturedUrl = String(url);
    capturedHeaders = opts?.headers || {};
    capturedBody = JSON.parse(opts?.body || "{}");
    return new Response(mockTextStream(text), {
      status,
      headers: { "Content-Type": "text/plain; charset=utf-8" },
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

test("BlackboxWebExecutor is registered in executor index", () => {
  assert.ok(hasSpecializedExecutor("blackbox-web"));
  assert.ok(hasSpecializedExecutor("bb-web"));
  const executor = getExecutor("blackbox-web");
  const alias = getExecutor("bb-web");
  assert.ok(executor instanceof BlackboxWebExecutor);
  assert.ok(alias instanceof BlackboxWebExecutor);
});

test("BlackboxWebExecutor sets correct provider name", () => {
  const executor = new BlackboxWebExecutor();
  assert.equal(executor.getProvider(), "blackbox-web");
});

test("Non-streaming: plain text response becomes OpenAI completion", async () => {
  const restore = mockFetch(200, "Hello from Blackbox");
  try {
    const executor = new BlackboxWebExecutor();
    const result = await executor.execute({
      model: "openai/gpt-5.4",
      body: { messages: [{ role: "user", content: "hi" }], stream: false },
      stream: false,
      credentials: { apiKey: "bb-session-token" },
      signal: AbortSignal.timeout(10000),
      log: null,
    });

    assert.equal(result.response.status, 200);
    const json = (await result.response.json()) as any;
    assert.equal(json.object, "chat.completion");
    assert.equal(json.choices[0].message.role, "assistant");
    assert.equal(json.choices[0].message.content, "Hello from Blackbox");
    assert.equal(json.choices[0].finish_reason, "stop");
    assert.ok(json.id.startsWith("chatcmpl-blackbox-"));
    assert.ok(json.usage.total_tokens > 0);
  } finally {
    restore();
  }
});

test("Streaming: produces valid SSE chunks", async () => {
  const restore = mockFetch(200, "streamed answer");
  try {
    const executor = new BlackboxWebExecutor();
    const result = await executor.execute({
      model: "openai/gpt-5.4",
      body: { messages: [{ role: "user", content: "hello" }], stream: true },
      stream: true,
      credentials: { apiKey: "bb-session-token" },
      signal: AbortSignal.timeout(10000),
      log: null,
    });

    assert.equal(result.response.status, 200);
    assert.equal(result.response.headers.get("Content-Type"), "text/event-stream");

    const text = await result.response.text();
    const lines = text.split("\n").filter((line) => line.startsWith("data: "));
    assert.ok(lines.length >= 3, `Expected at least 3 SSE data lines, got ${lines.length}`);

    const first = JSON.parse(lines[0].slice(6));
    assert.equal(first.choices[0].delta.role, "assistant");

    const second = JSON.parse(lines[1].slice(6));
    assert.equal(second.choices[0].delta.content, "streamed answer");

    const lastLine = text.trim().split("\n").filter(Boolean).pop();
    assert.equal(lastLine, "data: [DONE]");
  } finally {
    restore();
  }
});

test("Error: 401 returns auth error", async () => {
  const restore = mockFetch(401, "unauthorized");
  try {
    const executor = new BlackboxWebExecutor();
    const result = await executor.execute({
      model: "openai/gpt-5.4",
      body: { messages: [{ role: "user", content: "hi" }] },
      stream: false,
      credentials: { apiKey: "expired-cookie" },
      signal: AbortSignal.timeout(10000),
      log: null,
    });

    assert.equal(result.response.status, 401);
    const json = (await result.response.json()) as any;
    assert.match(json.error.message, /auth failed/i);
    assert.match(json.error.message, /session cookie/i);
  } finally {
    restore();
  }
});

test("Error: 429 returns rate limit message", async () => {
  const restore = mockFetch(429, "rate limited");
  try {
    const executor = new BlackboxWebExecutor();
    const result = await executor.execute({
      model: "openai/gpt-5.4",
      body: { messages: [{ role: "user", content: "hi" }] },
      stream: false,
      credentials: { apiKey: "bb-session-token" },
      signal: AbortSignal.timeout(10000),
      log: null,
    });

    assert.equal(result.response.status, 429);
    const json = (await result.response.json()) as any;
    assert.match(json.error.message, /rate limited/i);
  } finally {
    restore();
  }
});

test("Error: empty messages returns 400", async () => {
  const executor = new BlackboxWebExecutor();
  const result = await executor.execute({
    model: "openai/gpt-5.4",
    body: { messages: [] },
    stream: false,
    credentials: { apiKey: "bb-session-token" },
    signal: AbortSignal.timeout(10000),
    log: null,
  });

  assert.equal(result.response.status, 400);
});

test("Cookie normalization supports raw tokens, prefixed tokens and full headers", () => {
  assert.equal(
    normalizeBlackboxCookieHeader("raw-session-token"),
    "__Secure-authjs.session-token=raw-session-token"
  );
  assert.equal(
    normalizeBlackboxCookieHeader("cookie:raw-session-token"),
    "__Secure-authjs.session-token=raw-session-token"
  );
  assert.equal(
    normalizeBlackboxCookieHeader("__Secure-authjs.session-token=token; other=value"),
    "__Secure-authjs.session-token=token; other=value"
  );
});

test("Request: posts to correct Blackbox endpoint with normalized cookie", async () => {
  const cap = mockFetchCapture();
  try {
    const executor = new BlackboxWebExecutor();
    await executor.execute({
      model: "openai/gpt-5.4",
      body: { messages: [{ role: "user", content: "test" }], stream: false },
      stream: false,
      credentials: { apiKey: "raw-session-token" },
      signal: AbortSignal.timeout(10000),
      log: null,
    });

    assert.equal(cap.url, "https://app.blackbox.ai/api/chat");
    assert.equal(cap.headers.Cookie, "__Secure-authjs.session-token=raw-session-token");
    assert.equal(cap.headers.Origin, "https://app.blackbox.ai");
    assert.match(String(cap.headers.Referer), /^https:\/\/app\.blackbox\.ai\/chat\//);
  } finally {
    cap.restore();
  }
});

test("Request: payload carries model selection and web app defaults", async () => {
  const cap = mockFetchCapture();
  try {
    const executor = new BlackboxWebExecutor();
    await executor.execute({
      model: "anthropic/claude-opus-4.7",
      body: {
        messages: [
          { role: "system", content: "Be concise" },
          { role: "user", content: "Implement this" },
        ],
        max_tokens: 2048,
        stream: false,
      },
      stream: false,
      credentials: { apiKey: "__Secure-authjs.session-token=token" },
      signal: AbortSignal.timeout(10000),
      log: null,
    });

    assert.equal(cap.body.userSelectedModel, "anthropic/claude-opus-4.7");
    assert.equal(cap.body.userSelectedAgent, "VscodeAgent");
    assert.equal(cap.body.codeModelMode, true);
    assert.equal(cap.body.maxTokens, 2048);
    assert.equal(Array.isArray(cap.body.messages), true);
    assert.match(String((cap.body.messages as any[])[0].content), /System instructions:/);
  } finally {
    cap.restore();
  }
});

test("Provider registry: blackbox-web models are exposed", async () => {
  const { getModelsByProviderId, PROVIDER_ID_TO_ALIAS } =
    await import("../../open-sse/config/providerModels.ts");
  const models = getModelsByProviderId("blackbox-web");
  assert.ok(models, "blackbox-web should exist in PROVIDER_MODELS");
  assert.equal(PROVIDER_ID_TO_ALIAS["blackbox-web"], "bb-web");
  const ids = models.map((model: any) => model.id);
  assert.ok(ids.includes("openai/gpt-5.4"));
  assert.ok(ids.includes("anthropic/claude-opus-4.7"));
  assert.ok(ids.includes("moonshotai/kimi-k2.6"));
  assert.ok(ids.includes("blackbox/encrypted"));
});
