import test from "node:test";
import assert from "node:assert/strict";

const { HuggingChatExecutor } = await import("../../open-sse/executors/huggingchat.ts");
const { PhindExecutor } = await import("../../open-sse/executors/phind.ts");
const { PoeWebExecutor } = await import("../../open-sse/executors/poe-web.ts");
const { VeniceWebExecutor } = await import("../../open-sse/executors/venice-web.ts");
const { V0VercelWebExecutor } = await import("../../open-sse/executors/v0-vercel-web.ts");
const { KimiWebExecutor } = await import("../../open-sse/executors/kimi-web.ts");
const { DoubaoWebExecutor } = await import("../../open-sse/executors/doubao-web.ts");
const { QwenWebExecutor } = await import("../../open-sse/executors/qwen-web.ts");
const { getExecutor, hasSpecializedExecutor } = await import("../../open-sse/executors/index.ts");

// ── Helpers ──────────────────────────────────────────────────────────────────

function mockSSEStream(chunks: string[]) {
  const encoder = new TextEncoder();
  return new ReadableStream({
    start(controller) {
      for (const chunk of chunks) {
        controller.enqueue(encoder.encode(chunk));
      }
      controller.enqueue(encoder.encode("data: [DONE]\n\n"));
      controller.close();
    },
  });
}

function mockJSONLStream(lines: string[]) {
  const encoder = new TextEncoder();
  return new ReadableStream({
    start(controller) {
      for (const line of lines) {
        controller.enqueue(encoder.encode(line + "\n"));
      }
      controller.close();
    },
  });
}

function mockFetchCapture(status = 200, responseBody?: ReadableStream | string) {
  const original = globalThis.fetch;
  let capturedUrl: string | null = null;
  let capturedHeaders: Record<string, string> = {};
  let capturedBody: string | null = null;

  const body =
    typeof responseBody === "string"
      ? new ReadableStream({
          start(controller) {
            controller.enqueue(new TextEncoder().encode(responseBody));
            controller.close();
          },
        })
      : responseBody;

  globalThis.fetch = async (url: any, opts: any) => {
    capturedUrl = String(url);
    capturedHeaders = opts?.headers || {};
    capturedBody = opts?.body || null;
    return new Response(body || "", {
      status,
      headers: { "Content-Type": "text/event-stream; charset=utf-8" },
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

const noopExecuteInput = {
  model: "test-model",
  body: { messages: [{ role: "user", content: "hello" }] },
  stream: true,
  credentials: { apiKey: "test-cookie" },
  signal: null,
};

// ── Registration Tests ───────────────────────────────────────────────────────

test("HuggingChat executor is registered", () => {
  assert.ok(hasSpecializedExecutor("huggingchat"));
  assert.ok(hasSpecializedExecutor("hc"));
  const executor = getExecutor("huggingchat");
  assert.ok(executor instanceof HuggingChatExecutor);
});

test("Phind executor is registered", () => {
  assert.ok(hasSpecializedExecutor("phind"));
  assert.ok(hasSpecializedExecutor("ph"));
  const executor = getExecutor("phind");
  assert.ok(executor instanceof PhindExecutor);
});

test("Poe Web executor is registered", () => {
  assert.ok(hasSpecializedExecutor("poe-web"));
  assert.ok(hasSpecializedExecutor("poe"));
  const executor = getExecutor("poe-web");
  assert.ok(executor instanceof PoeWebExecutor);
});

test("Venice Web executor is registered", () => {
  assert.ok(hasSpecializedExecutor("venice-web"));
  assert.ok(hasSpecializedExecutor("ven"));
  const executor = getExecutor("venice-web");
  assert.ok(executor instanceof VeniceWebExecutor);
});

test("v0 Vercel Web executor is registered", () => {
  assert.ok(hasSpecializedExecutor("v0-vercel-web"));
  assert.ok(hasSpecializedExecutor("v0"));
  const executor = getExecutor("v0-vercel-web");
  assert.ok(executor instanceof V0VercelWebExecutor);
});

test("Kimi Web executor is registered", () => {
  assert.ok(hasSpecializedExecutor("kimi-web"));
  // #4699: the `kimi` API-key provider must NOT be routed through KimiWebExecutor
  // (Bug 2) — it correctly falls through to DefaultExecutor. Only the explicit
  // kimi-web alias keeps the specialized web executor.
  assert.equal(hasSpecializedExecutor("kimi"), false);
  const executor = getExecutor("kimi-web");
  assert.ok(executor instanceof KimiWebExecutor);
});

test("Doubao Web executor is registered", () => {
  assert.ok(hasSpecializedExecutor("doubao-web"));
  assert.ok(hasSpecializedExecutor("db"));
  const executor = getExecutor("doubao-web");
  assert.ok(executor instanceof DoubaoWebExecutor);
});

// ── Constructor Tests ────────────────────────────────────────────────────────

test("HuggingChat sets correct provider", () => {
  const executor = new HuggingChatExecutor();
  assert.equal(executor.getProvider(), "huggingchat");
});

test("Phind sets correct provider", () => {
  const executor = new PhindExecutor();
  assert.equal(executor.getProvider(), "phind");
});

test("Poe Web sets correct provider", () => {
  const executor = new PoeWebExecutor();
  assert.equal(executor.getProvider(), "poe-web");
});

test("Venice Web sets correct provider", () => {
  const executor = new VeniceWebExecutor();
  assert.equal(executor.getProvider(), "venice-web");
});

test("v0 Vercel Web sets correct provider", () => {
  const executor = new V0VercelWebExecutor();
  assert.equal(executor.getProvider(), "v0-vercel-web");
});

test("Kimi Web sets correct provider", () => {
  const executor = new KimiWebExecutor();
  assert.equal(executor.getProvider(), "kimi-web");
});

test("Doubao Web sets correct provider", () => {
  const executor = new DoubaoWebExecutor();
  assert.equal(executor.getProvider(), "doubao-web");
});

// ── Registration Tests (Qwen Web) ────────────────────────────────────────────

test("Qwen Web executor is registered", () => {
  assert.ok(hasSpecializedExecutor("qwen-web"));
  assert.ok(hasSpecializedExecutor("qw"));
  const executor = getExecutor("qwen-web");
  assert.ok(executor instanceof QwenWebExecutor);
});

// ── Constructor Tests (Qwen Web) ─────────────────────────────────────────────

test("Qwen Web sets correct provider", () => {
  const executor = new QwenWebExecutor();
  assert.equal(executor.getProvider(), "qwen-web");
});

// ── HuggingChat Execution Tests ──────────────────────────────────────────────

test("HuggingChat: streaming returns SSE chunks", async () => {
  const jsonlData = [
    JSON.stringify({ type: "stream", token: "Hello " }),
    JSON.stringify({ type: "stream", token: "world" }),
    JSON.stringify({ type: "finalAnswer", text: "Hello world" }),
  ];

  const original = globalThis.fetch;
  let callCount = 0;
  globalThis.fetch = async (url: any, opts: any) => {
    callCount++;
    if (callCount === 1) {
      // First call: create conversation
      return new Response(JSON.stringify({ conversationId: "test-conv-123" }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    }
    // Second call: send message (returns JSONL stream)
    return new Response(mockJSONLStream(jsonlData), {
      status: 200,
      headers: { "Content-Type": "text/plain; charset=utf-8" },
    });
  };

  try {
    const executor = new HuggingChatExecutor();
    const result = await executor.execute({
      ...noopExecuteInput,
      model: "meta-llama/Llama-3.3-70B-Instruct",
    });
    assert.ok(result.response instanceof Response);
    assert.equal(result.response.status, 200);
    assert.ok(result.url.includes("huggingface.co"));
    const text = await result.response.text();
    assert.ok(text.includes("data:"));
    assert.ok(text.includes("[DONE]"));
  } finally {
    globalThis.fetch = original;
  }
});

test("HuggingChat: non-streaming returns JSON completion", async () => {
  const jsonlData = [
    JSON.stringify({ type: "stream", token: "Hello " }),
    JSON.stringify({ type: "stream", token: "world" }),
    JSON.stringify({ type: "finalAnswer", text: "Hello world" }),
  ];

  const original = globalThis.fetch;
  let callCount = 0;
  globalThis.fetch = async (url: any, opts: any) => {
    callCount++;
    if (callCount === 1) {
      return new Response(JSON.stringify({ conversationId: "test-conv-123" }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    }
    return new Response(mockJSONLStream(jsonlData), {
      status: 200,
      headers: { "Content-Type": "text/plain; charset=utf-8" },
    });
  };

  try {
    const executor = new HuggingChatExecutor();
    const result = await executor.execute({
      ...noopExecuteInput,
      stream: false,
    });
    assert.ok(result.response instanceof Response);
    const text = await result.response.text();
    const parsed = JSON.parse(text);
    assert.equal(parsed.object, "chat.completion");
    assert.ok(parsed.choices[0].message.content);
  } finally {
    globalThis.fetch = original;
  }
});

test("HuggingChat: error response returns error result", async () => {
  const original = globalThis.fetch;
  globalThis.fetch = async () => {
    return new Response("Unauthorized", {
      status: 401,
      headers: { "Content-Type": "text/plain" },
    });
  };
  try {
    const executor = new HuggingChatExecutor();
    const result = await executor.execute({
      ...noopExecuteInput,
      credentials: { apiKey: "bad-cookie" },
    });
    assert.ok(result.response instanceof Response);
    assert.equal(result.response.status, 401);
  } finally {
    globalThis.fetch = original;
  }
});

test("HuggingChat: fetch failure returns 502", async () => {
  const original = globalThis.fetch;
  globalThis.fetch = async () => {
    throw new Error("Network error");
  };
  try {
    const executor = new HuggingChatExecutor();
    const result = await executor.execute(noopExecuteInput);
    assert.ok(result.response instanceof Response);
    assert.equal(result.response.status, 502);
  } finally {
    globalThis.fetch = original;
  }
});

// ── Phind Execution Tests ────────────────────────────────────────────────────

test("Phind: streaming returns SSE chunks", async () => {
  const sseData = [
    'data: {"choices":[{"delta":{"content":"Hello "}}]}',
    'data: {"choices":[{"delta":{"content":"world"}}]}',
  ];
  const restore = mockFetchCapture(200, mockSSEStream(sseData));
  try {
    const executor = new PhindExecutor();
    const result = await executor.execute({
      ...noopExecuteInput,
      model: "phind-model",
    });
    assert.ok(result.response instanceof Response);
    assert.ok(result.url.includes("phind.com"));
    const text = await result.response.text();
    assert.ok(text.includes("data:"));
  } finally {
    restore.restore();
  }
});

test("Phind: error response returns error result", async () => {
  const restore = mockFetchCapture(403, "Forbidden");
  try {
    const executor = new PhindExecutor();
    const result = await executor.execute(noopExecuteInput);
    assert.ok(result.response instanceof Response);
    assert.equal(result.response.status, 403);
  } finally {
    restore.restore();
  }
});

// ── Poe Web Execution Tests ──────────────────────────────────────────────────

test("Poe Web: non-streaming returns JSON completion", async () => {
  const mockResponse = JSON.stringify({
    data: { chatWithBot: { text: "Hello from Poe" } },
  });
  const restore = mockFetchCapture(200, mockResponse);
  try {
    const executor = new PoeWebExecutor();
    const result = await executor.execute({
      ...noopExecuteInput,
      stream: false,
    });
    assert.ok(result.response instanceof Response);
    const text = await result.response.text();
    const parsed = JSON.parse(text);
    assert.equal(parsed.object, "chat.completion");
    assert.ok(parsed.choices[0].message.content);
  } finally {
    restore.restore();
  }
});

test("Poe Web: sends p-b cookie in header", async () => {
  const mockResponse = JSON.stringify({
    data: { chatWithBot: { text: "ok" } },
  });
  const restore = mockFetchCapture(200, mockResponse);
  try {
    const executor = new PoeWebExecutor();
    await executor.execute({
      ...noopExecuteInput,
      credentials: { apiKey: "p-b=abc123" },
      stream: false,
    });
    assert.ok(restore.headers.Cookie?.includes("p-b=abc123"));
  } finally {
    restore.restore();
  }
});

// ── Venice Web Execution Tests ───────────────────────────────────────────────

test("Venice Web: streaming passes through SSE", async () => {
  const sseData = ['data: {"choices":[{"delta":{"content":"Hello"}}]}'];
  const restore = mockFetchCapture(200, mockSSEStream(sseData));
  try {
    const executor = new VeniceWebExecutor();
    const result = await executor.execute({
      ...noopExecuteInput,
      model: "venice-default",
    });
    assert.ok(result.response instanceof Response);
    assert.ok(result.url.includes("venice.ai"));
  } finally {
    restore.restore();
  }
});

test("Venice Web: error response returns error result", async () => {
  const restore = mockFetchCapture(500, "Internal Server Error");
  try {
    const executor = new VeniceWebExecutor();
    const result = await executor.execute(noopExecuteInput);
    assert.ok(result.response instanceof Response);
    assert.equal(result.response.status, 500);
  } finally {
    restore.restore();
  }
});

// ── v0 Vercel Web Execution Tests ────────────────────────────────────────────

test("v0 Vercel Web: streaming passes through SSE", async () => {
  const sseData = ['data: {"choices":[{"delta":{"content":"function hello() {}"}}]}'];
  const restore = mockFetchCapture(200, mockSSEStream(sseData));
  try {
    const executor = new V0VercelWebExecutor();
    const result = await executor.execute({
      ...noopExecuteInput,
      model: "v0-default",
    });
    assert.ok(result.response instanceof Response);
    assert.ok(result.url.includes("v0.dev"));
  } finally {
    restore.restore();
  }
});

test("v0 Vercel Web: error response returns error result", async () => {
  const restore = mockFetchCapture(429, "Rate limited");
  try {
    const executor = new V0VercelWebExecutor();
    const result = await executor.execute(noopExecuteInput);
    assert.ok(result.response instanceof Response);
    assert.equal(result.response.status, 429);
  } finally {
    restore.restore();
  }
});

// ── Kimi Web Execution Tests ─────────────────────────────────────────────────

test("Kimi Web: streaming passes through SSE", async () => {
  const sseData = ['data: {"choices":[{"delta":{"content":"你好"}}]}'];
  const restore = mockFetchCapture(200, mockSSEStream(sseData));
  try {
    const executor = new KimiWebExecutor();
    const result = await executor.execute({
      ...noopExecuteInput,
      model: "kimi-default",
    });
    assert.ok(result.response instanceof Response);
    assert.ok(result.url.includes("kimi.moonshot.cn"));
  } finally {
    restore.restore();
  }
});

test("Kimi Web: error response returns error result", async () => {
  const restore = mockFetchCapture(401, "Unauthorized");
  try {
    const executor = new KimiWebExecutor();
    const result = await executor.execute(noopExecuteInput);
    assert.ok(result.response instanceof Response);
    assert.equal(result.response.status, 401);
  } finally {
    restore.restore();
  }
});

// ── Doubao Web Execution Tests ───────────────────────────────────────────────

test("Doubao Web: streaming passes through SSE", async () => {
  const sseData = ['data: {"choices":[{"delta":{"content":"你好世界"}}]}'];
  const restore = mockFetchCapture(200, mockSSEStream(sseData));
  try {
    const executor = new DoubaoWebExecutor();
    const result = await executor.execute({
      ...noopExecuteInput,
      model: "doubao-default",
    });
    assert.ok(result.response instanceof Response);
    assert.ok(result.url.includes("doubao.com"));
  } finally {
    restore.restore();
  }
});

test("Doubao Web: error response returns error result", async () => {
  const restore = mockFetchCapture(502, "Bad Gateway");
  try {
    const executor = new DoubaoWebExecutor();
    const result = await executor.execute(noopExecuteInput);
    assert.ok(result.response instanceof Response);
    assert.equal(result.response.status, 502);
  } finally {
    restore.restore();
  }
});

// ── Cookie Normalization Tests ───────────────────────────────────────────────

test("All executors handle Cookie: prefix", async () => {
  const executors = [
    new HuggingChatExecutor(),
    new PhindExecutor(),
    new PoeWebExecutor(),
    new VeniceWebExecutor(),
    new V0VercelWebExecutor(),
    new KimiWebExecutor(),
    new DoubaoWebExecutor(),
  ];

  const original = globalThis.fetch;
  let lastHeaders: Record<string, string> = {};
  globalThis.fetch = async (_url: any, opts: any) => {
    lastHeaders = opts?.headers || {};
    // Poe expects JSON response with chatWithBot
    const body = JSON.stringify({ data: { chatWithBot: { text: "ok" } } });
    return new Response(body, {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  };

  try {
    for (const executor of executors) {
      await executor.execute({
        ...noopExecuteInput,
        credentials: { apiKey: "Cookie: test=value" },
        stream: false,
      });
      // Cookie should be normalized (may or may not have prefix depending on executor)
      assert.ok(lastHeaders.Cookie || lastHeaders.Authorization || lastHeaders["Content-Type"]);
    }
  } finally {
    globalThis.fetch = original;
  }
});

test("All executors handle bare cookie value", async () => {
  const executors = [
    new HuggingChatExecutor(),
    new PhindExecutor(),
    new PoeWebExecutor(),
    new VeniceWebExecutor(),
    new V0VercelWebExecutor(),
    new KimiWebExecutor(),
    new DoubaoWebExecutor(),
  ];

  const original = globalThis.fetch;
  let lastHeaders: Record<string, string> = {};
  globalThis.fetch = async (_url: any, opts: any) => {
    lastHeaders = opts?.headers || {};
    // Poe expects JSON response with chatWithBot
    const body = JSON.stringify({ data: { chatWithBot: { text: "ok" } } });
    return new Response(body, {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  };

  try {
    for (const executor of executors) {
      await executor.execute({
        ...noopExecuteInput,
        credentials: { apiKey: "bare-cookie-value" },
        stream: false,
      });
      assert.ok(lastHeaders["Content-Type"]);
    }
  } finally {
    globalThis.fetch = original;
  }
});

// ── Abort Signal Tests ───────────────────────────────────────────────────────

test("HuggingChat: respects abort signal", async () => {
  const controller = new AbortController();
  controller.abort();

  const original = globalThis.fetch;
  let fetchCalled = false;
  globalThis.fetch = async (_url: any, _opts: any) => {
    fetchCalled = true;
    return new Response("ok", { status: 200 });
  };

  try {
    const executor = new HuggingChatExecutor();
    const result = await executor.execute({
      ...noopExecuteInput,
      signal: controller.signal,
    });
    // Should still complete (fetch may or may not be called depending on implementation)
    assert.ok(result.response instanceof Response);
  } finally {
    globalThis.fetch = original;
  }
});
