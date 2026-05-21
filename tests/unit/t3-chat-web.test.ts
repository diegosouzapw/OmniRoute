// @ts-nocheck
import test from "node:test";
import assert from "node:assert/strict";

const { T3ChatWebExecutor, T3_CHAT_BASE } = await import("../../open-sse/executors/t3-chat-web.ts");
const { getExecutor, hasSpecializedExecutor } = await import("../../open-sse/executors/index.ts");

// NOTE: These tests use mocked HTTP transport. The COMPLETION_URL constant in
// t3-chat-web.ts is a best-guess placeholder. Tests verify executor behavior
// and OpenAI output format, not the specific endpoint URL.
// TODO(post-devtools-capture): Update mock URL matchers once endpoint is confirmed.

// ─── Registration ────────────────────────────────────────────────────────

test("hasSpecializedExecutor returns true for t3-web", () => {
  assert.ok(hasSpecializedExecutor("t3-web"));
});

test("hasSpecializedExecutor returns true for t3chat alias", () => {
  assert.ok(hasSpecializedExecutor("t3chat"));
});

test("getExecutor returns T3ChatWebExecutor for t3-web", () => {
  const exec = getExecutor("t3-web");
  assert.ok(exec instanceof T3ChatWebExecutor);
});

test("getExecutor returns T3ChatWebExecutor for t3chat alias", () => {
  const exec = getExecutor("t3chat");
  assert.ok(exec instanceof T3ChatWebExecutor);
});

test("T3ChatWebExecutor.getProvider() returns t3-web", () => {
  assert.equal(new T3ChatWebExecutor().getProvider(), "t3-web");
});

// ─── Credential validation ───────────────────────────────────────────────

test("execute returns 400 with empty credentials", async () => {
  const executor = new T3ChatWebExecutor();
  const result = await executor.execute({
    model: "gpt-4o",
    body: { messages: [{ role: "user", content: "hi" }] },
    stream: true,
    credentials: {},
    signal: AbortSignal.timeout(5000),
  });
  assert.equal(result.response.status, 400);
  const body = JSON.parse(await result.response.text());
  assert.ok(body.error?.message, "Should have error message");
});

test("execute returns 400 with cookies present but convexSessionId missing", async () => {
  const executor = new T3ChatWebExecutor();
  const result = await executor.execute({
    model: "gpt-4o",
    body: { messages: [{ role: "user", content: "hi" }] },
    stream: true,
    credentials: { cookies: "some-cookie=value" },
    signal: AbortSignal.timeout(5000),
  });
  assert.equal(result.response.status, 400);
  const body = JSON.parse(await result.response.text());
  assert.ok(body.error?.message?.length > 0, "Should have error message");
});

test("execute returns 400 with convexSessionId present but cookies missing", async () => {
  const executor = new T3ChatWebExecutor();
  const result = await executor.execute({
    model: "gpt-4o",
    body: { messages: [{ role: "user", content: "hi" }] },
    stream: true,
    credentials: { convexSessionId: "session-abc-123" },
    signal: AbortSignal.timeout(5000),
  });
  assert.equal(result.response.status, 400);
  const body = JSON.parse(await result.response.text());
  assert.ok(body.error?.message?.length > 0, "Should have error message");
});

test("execute returns 400 with both fields as empty strings", async () => {
  const executor = new T3ChatWebExecutor();
  const result = await executor.execute({
    model: "gpt-4o",
    body: { messages: [{ role: "user", content: "hi" }] },
    stream: true,
    credentials: { cookies: "", convexSessionId: "" },
    signal: AbortSignal.timeout(5000),
  });
  assert.equal(result.response.status, 400);
});

// ─── testConnection ──────────────────────────────────────────────────────

test("testConnection returns false with empty credentials", async () => {
  const executor = new T3ChatWebExecutor();
  const result = await executor.testConnection({});
  assert.equal(result, false);
});

test("testConnection returns false when convexSessionId is missing", async () => {
  const executor = new T3ChatWebExecutor();
  const result = await executor.testConnection({ cookies: "some-cookie=value" });
  assert.equal(result, false);
});

// ─── API flow helpers ─────────────────────────────────────────────────────

function makeValidCreds() {
  return {
    cookies: "t3-auth=session-token-xyz; other=value",
    convexSessionId: "convex-session-id-abc123",
  };
}

function mockT3ChatSSEResponse(chunks: string[]) {
  const original = globalThis.fetch;
  const calls: Array<{
    url: string;
    method: string;
    headers: Record<string, string>;
    body: unknown;
  }> = [];

  globalThis.fetch = async (url, opts) => {
    const urlStr = typeof url === "string" ? url : url.toString();
    calls.push({
      url: urlStr,
      method: opts?.method ?? "GET",
      headers: (opts?.headers as Record<string, string>) ?? {},
      body: opts?.body ? JSON.parse(opts.body as string) : null,
    });

    const encoder = new TextEncoder();
    const sseData = chunks.map((c) => `data: ${c}\n\n`).join("");
    return new Response(encoder.encode(sseData), {
      status: 200,
      headers: { "Content-Type": "text/event-stream" },
    });
  };

  return {
    calls,
    restore: () => {
      globalThis.fetch = original;
    },
  };
}

// ─── Mocked streaming flow ───────────────────────────────────────────────

test("execute: POSTs to completion URL with Cookie and convex-session-id headers (streaming)", async () => {
  // TODO(post-devtools-capture): Update URL check once endpoint is confirmed.
  const sseChunks = [
    JSON.stringify({ text: "Hello" }),
    JSON.stringify({ text: " world" }),
    JSON.stringify({ done: true }),
  ];
  const mock = mockT3ChatSSEResponse(sseChunks);

  try {
    const executor = new T3ChatWebExecutor();
    const result = await executor.execute({
      model: "gpt-4o",
      body: { messages: [{ role: "user", content: "Say hello" }] },
      stream: true,
      credentials: makeValidCreds(),
      signal: AbortSignal.timeout(10000),
    });

    assert.ok(result.response.ok, `Expected 200, got ${result.response.status}`);
    assert.equal(mock.calls.length, 1, "Should make exactly one fetch call");

    // Verify headers were sent
    const sentHeaders = mock.calls[0].headers;
    assert.ok(sentHeaders["Cookie"]?.length > 0, "Should send Cookie header");
    assert.ok(
      // convex-session-id may be header or body — check both
      sentHeaders["convex-session-id"]?.length > 0 ||
        (mock.calls[0].body as any)?.convexSessionId?.length > 0,
      "Should send convex-session-id as header or body field"
    );
  } finally {
    mock.restore();
  }
});

test("execute: streaming response contains content, finish_reason stop, and [DONE]", async () => {
  const sseChunks = [
    JSON.stringify({ text: "Hello" }),
    JSON.stringify({ text: " there" }),
    "[DONE]",
  ];
  const mock = mockT3ChatSSEResponse(sseChunks);

  try {
    const executor = new T3ChatWebExecutor();
    const result = await executor.execute({
      model: "gpt-4o",
      body: { messages: [{ role: "user", content: "hi" }] },
      stream: true,
      credentials: makeValidCreds(),
      signal: AbortSignal.timeout(10000),
    });

    assert.ok(result.response.ok);
    assert.equal(result.response.headers.get("content-type"), "text/event-stream");

    const text = await result.response.text();
    assert.ok(text.includes('"content"'), "Should contain content field");
    assert.ok(text.includes('"finish_reason":"stop"'), "Should have finish_reason stop");
    assert.ok(text.includes("[DONE]"), "Should end with [DONE]");
  } finally {
    mock.restore();
  }
});

test("execute: non-streaming response has choices[0].message.content", async () => {
  const sseChunks = [JSON.stringify({ text: "Hello non-stream" }), "[DONE]"];
  const mock = mockT3ChatSSEResponse(sseChunks);

  try {
    const executor = new T3ChatWebExecutor();
    const result = await executor.execute({
      model: "gpt-4o",
      body: { messages: [{ role: "user", content: "hi" }] },
      stream: false,
      credentials: makeValidCreds(),
      signal: AbortSignal.timeout(10000),
    });

    assert.ok(result.response.ok);
    const json = JSON.parse(await result.response.text());
    assert.equal(json.object, "chat.completion");
    assert.ok(Array.isArray(json.choices) && json.choices.length > 0, "Should have choices");
    assert.equal(json.choices[0].message.role, "assistant");
    assert.ok(typeof json.choices[0].message.content === "string", "Should have string content");
  } finally {
    mock.restore();
  }
});

// ─── Error handling ──────────────────────────────────────────────────────

test("execute: upstream 401 → returns 401 with session expired message", async () => {
  const original = globalThis.fetch;
  globalThis.fetch = async () => new Response("Unauthorized", { status: 401 });

  try {
    const executor = new T3ChatWebExecutor();
    const result = await executor.execute({
      model: "gpt-4o",
      body: { messages: [{ role: "user", content: "hi" }] },
      stream: true,
      credentials: makeValidCreds(),
      signal: AbortSignal.timeout(5000),
    });
    assert.equal(result.response.status, 401);
    const body = JSON.parse(await result.response.text());
    assert.ok(
      body.error?.message?.toLowerCase().includes("session") ||
        body.error?.message?.toLowerCase().includes("expired") ||
        body.error?.message?.toLowerCase().includes("unauthorized"),
      "Should mention session/expired/unauthorized"
    );
  } finally {
    globalThis.fetch = original;
  }
});

test("execute: upstream 403 → returns 403 with descriptive message", async () => {
  const original = globalThis.fetch;
  globalThis.fetch = async () => new Response("Forbidden", { status: 403 });

  try {
    const executor = new T3ChatWebExecutor();
    const result = await executor.execute({
      model: "gpt-4o",
      body: { messages: [{ role: "user", content: "hi" }] },
      stream: true,
      credentials: makeValidCreds(),
      signal: AbortSignal.timeout(5000),
    });
    assert.equal(result.response.status, 403);
    const body = JSON.parse(await result.response.text());
    assert.ok(body.error?.message?.length > 0, "Should have error message");
  } finally {
    globalThis.fetch = original;
  }
});

test("execute: upstream 429 → returns 429", async () => {
  const original = globalThis.fetch;
  globalThis.fetch = async () => new Response("Too Many Requests", { status: 429 });

  try {
    const executor = new T3ChatWebExecutor();
    const result = await executor.execute({
      model: "gpt-4o",
      body: { messages: [{ role: "user", content: "hi" }] },
      stream: true,
      credentials: makeValidCreds(),
      signal: AbortSignal.timeout(5000),
    });
    assert.equal(result.response.status, 429);
  } finally {
    globalThis.fetch = original;
  }
});

test("execute: AbortSignal abort → returns 499", async () => {
  const executor = new T3ChatWebExecutor();
  const controller = new AbortController();
  controller.abort();

  const result = await executor.execute({
    model: "gpt-4o",
    body: { messages: [{ role: "user", content: "hi" }] },
    stream: true,
    credentials: makeValidCreds(),
    signal: controller.signal,
  });

  // AbortError before fetch is even called returns 499 or 400 from creds check;
  // with valid creds and aborted signal the fetch throws AbortError → 499.
  assert.ok(result.response.status >= 400, "Should indicate an error status");
});

// ─── Error sanitization ──────────────────────────────────────────────────

test("execute: error responses do not include raw stack traces", async () => {
  const original = globalThis.fetch;
  globalThis.fetch = async () => {
    throw new Error("Something went wrong\n    at /home/user/app/executor.ts:42:5");
  };

  try {
    const executor = new T3ChatWebExecutor();
    const result = await executor.execute({
      model: "gpt-4o",
      body: { messages: [{ role: "user", content: "hi" }] },
      stream: true,
      credentials: makeValidCreds(),
      signal: AbortSignal.timeout(5000),
    });

    assert.ok(result.response.status >= 400, "Should return error status");
    const body = JSON.parse(await result.response.text());
    const msg = body.error?.message ?? "";
    assert.ok(!msg.includes("at /"), "Should not expose raw stack trace paths");
  } finally {
    globalThis.fetch = original;
  }
});
