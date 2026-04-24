import test from "node:test";
import assert from "node:assert/strict";

// ─── Import the executor and its dependencies ──────────────────────────────

const { PerplexityWebExecutor } = await import("../../open-sse/executors/perplexity-web.ts");
const { getExecutor, hasSpecializedExecutor } = await import("../../open-sse/executors/index.ts");

// ─── Helper: Build a mock SSE stream from Perplexity events ─────────────────

function mockPplxStream(events) {
  const encoder = new TextEncoder();
  const chunks = [];
  for (const evt of events) {
    chunks.push(`event: message\r\ndata: ${JSON.stringify(evt)}\r\n\r\n`);
  }
  chunks.push("event: end_of_stream\r\n\r\n");
  const body = chunks.join("");
  return new ReadableStream({
    start(controller) {
      controller.enqueue(encoder.encode(body));
      controller.close();
    },
  });
}

// ─── Helper: Override global fetch for testing ──────────────────────────────

function mockFetch(status, streamEvents) {
  const original = globalThis.fetch;
  globalThis.fetch = async (url, opts) => {
    return new Response(mockPplxStream(streamEvents), {
      status,
      headers: { "Content-Type": "text/event-stream" },
    });
  };
  return () => {
    globalThis.fetch = original;
  };
}

function mockFetchError(error) {
  const original = globalThis.fetch;
  globalThis.fetch = async () => {
    throw error;
  };
  return () => {
    globalThis.fetch = original;
  };
}

// ─── Test: Executor registration ────────────────────────────────────────────

test("PerplexityWebExecutor is registered in executor index", () => {
  assert.ok(hasSpecializedExecutor("perplexity-web"));
  assert.ok(hasSpecializedExecutor("pplx-web"));
  const executor = getExecutor("perplexity-web");
  assert.ok(executor instanceof PerplexityWebExecutor);
});

test("PerplexityWebExecutor alias resolves to same type", () => {
  const a = getExecutor("perplexity-web");
  const b = getExecutor("pplx-web");
  assert.ok(a instanceof PerplexityWebExecutor);
  assert.ok(b instanceof PerplexityWebExecutor);
});

// ─── Test: Constructor ──────────────────────────────────────────────────────

test("PerplexityWebExecutor sets correct provider name", () => {
  const executor = new PerplexityWebExecutor();
  assert.equal(executor.getProvider(), "perplexity-web");
});

// ─── Test: Non-streaming response ───────────────────────────────────────────

test("Non-streaming: simple text response", async () => {
  const pplxEvents = [
    {
      backend_uuid: "test-uuid-123",
      blocks: [
        {
          intended_usage: "markdown",
          markdown_block: {
            chunks: ["Hello, world!"],
            progress: "DONE",
          },
        },
      ],
      status: "COMPLETED",
    },
  ];

  const restore = mockFetch(200, pplxEvents);
  try {
    const executor = new PerplexityWebExecutor();
    const result = await executor.execute({
      model: "pplx-auto",
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
    assert.equal(json.choices[0].message.content, "Hello, world!");
    assert.equal(json.choices[0].finish_reason, "stop");
    assert.ok(json.id.startsWith("chatcmpl-pplx-"));
    assert.ok(json.usage.total_tokens > 0);
  } finally {
    restore();
  }
});

test("Non-streaming: strips citations from response", async () => {
  const pplxEvents = [
    {
      blocks: [
        {
          intended_usage: "markdown",
          markdown_block: {
            chunks: ["The answer is 42[1] according to sources[2][3]."],
            progress: "DONE",
          },
        },
      ],
      status: "COMPLETED",
    },
  ];

  const restore = mockFetch(200, pplxEvents);
  try {
    const executor = new PerplexityWebExecutor();
    const result = await executor.execute({
      model: "pplx-gpt",
      body: { messages: [{ role: "user", content: "meaning of life" }], stream: false },
      stream: false,
      credentials: { apiKey: "test-cookie" },
      signal: AbortSignal.timeout(10000),
      log: null,
    });

    const json = (await result.response.json()) as any;
    assert.ok(!json.choices[0].message.content.includes("[1]"));
    assert.ok(!json.choices[0].message.content.includes("[2]"));
    assert.ok(!json.choices[0].message.content.includes("[3]"));
    assert.ok(json.choices[0].message.content.includes("The answer is 42"));
  } finally {
    restore();
  }
});

// ─── Test: Streaming response ───────────────────────────────────────────────

test("Streaming: produces valid SSE chunks", async () => {
  const pplxEvents = [
    {
      backend_uuid: "stream-uuid-456",
      blocks: [
        {
          intended_usage: "markdown",
          markdown_block: { chunks: ["Hello "], progress: "IN_PROGRESS" },
        },
      ],
    },
    {
      blocks: [
        {
          intended_usage: "markdown",
          markdown_block: { chunks: ["Hello world!"], progress: "DONE" },
        },
      ],
      status: "COMPLETED",
    },
  ];

  const restore = mockFetch(200, pplxEvents);
  try {
    const executor = new PerplexityWebExecutor();
    const result = await executor.execute({
      model: "pplx-sonnet",
      body: { messages: [{ role: "user", content: "hello" }], stream: true },
      stream: true,
      credentials: { apiKey: "test-cookie" },
      signal: AbortSignal.timeout(10000),
      log: null,
    });

    assert.equal(result.response.status, 200);
    assert.equal(result.response.headers.get("Content-Type"), "text/event-stream");

    // Read all SSE chunks
    const text = await result.response.text();
    const lines = text.split("\n").filter((l) => l.startsWith("data: "));
    assert.ok(lines.length >= 3, `Expected at least 3 SSE data lines, got ${lines.length}`);

    // First chunk should have role
    const first = JSON.parse(lines[0].slice(6));
    assert.equal(first.object, "chat.completion.chunk");
    assert.equal(first.choices[0].delta.role, "assistant");

    // Last data line should be [DONE]
    const lastLine = text.trim().split("\n").filter(Boolean).pop();
    assert.equal(lastLine, "data: [DONE]");

    // Second-to-last should have finish_reason: stop
    const stopLine = lines[lines.length - 1];
    if (stopLine !== "data: [DONE]") {
      const stop = JSON.parse(stopLine.slice(6));
      assert.equal(stop.choices[0].finish_reason, "stop");
    }
  } finally {
    restore();
  }
});

// ─── Test: Thinking/reasoning content ───────────────────────────────────────

test("Streaming: thinking content emitted as reasoning_content", async () => {
  const pplxEvents = [
    {
      blocks: [
        {
          intended_usage: "pro_search_steps",
          plan_block: {
            steps: [
              {
                step_type: "SEARCH_WEB",
                search_web_content: { queries: [{ query: "test query" }] },
              },
            ],
          },
        },
      ],
    },
    {
      blocks: [
        {
          intended_usage: "markdown",
          markdown_block: { chunks: ["The answer."], progress: "DONE" },
        },
      ],
      status: "COMPLETED",
    },
  ];

  const restore = mockFetch(200, pplxEvents);
  try {
    const executor = new PerplexityWebExecutor();
    const result = await executor.execute({
      model: "pplx-sonnet",
      body: { messages: [{ role: "user", content: "search test" }], stream: true },
      stream: true,
      credentials: { apiKey: "test-cookie" },
      signal: AbortSignal.timeout(10000),
      log: null,
    });

    const text = await result.response.text();
    const dataLines = text
      .split("\n")
      .filter((l) => l.startsWith("data: ") && l !== "data: [DONE]");

    // Should have a reasoning_content delta
    const hasReasoning = dataLines.some((l) => {
      const json = JSON.parse(l.slice(6));
      return json.choices?.[0]?.delta?.reasoning_content != null;
    });
    assert.ok(hasReasoning, "Should have reasoning_content delta for thinking steps");
  } finally {
    restore();
  }
});

// ─── Test: Error handling ───────────────────────────────────────────────────

test("Error: 401 returns auth error message", async () => {
  const restore = mockFetch(401, []);
  try {
    const executor = new PerplexityWebExecutor();
    const result = await executor.execute({
      model: "pplx-auto",
      body: { messages: [{ role: "user", content: "hi" }] },
      stream: false,
      credentials: { apiKey: "expired-cookie" },
      signal: AbortSignal.timeout(10000),
      log: null,
    });

    assert.equal(result.response.status, 401);
    const json = (await result.response.json()) as any;
    assert.ok(json.error.message.includes("auth failed"));
    assert.ok(json.error.message.includes("session-token"));
  } finally {
    restore();
  }
});

test("Error: 429 returns rate limit message", async () => {
  const restore = mockFetch(429, []);
  try {
    const executor = new PerplexityWebExecutor();
    const result = await executor.execute({
      model: "pplx-gpt",
      body: { messages: [{ role: "user", content: "hi" }] },
      stream: false,
      credentials: { apiKey: "test-cookie" },
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

test("Error: fetch failure returns 502", async () => {
  const restore = mockFetchError(new Error("ECONNREFUSED"));
  try {
    const executor = new PerplexityWebExecutor();
    const result = await executor.execute({
      model: "pplx-auto",
      body: { messages: [{ role: "user", content: "hi" }] },
      stream: false,
      credentials: { apiKey: "test-cookie" },
      signal: AbortSignal.timeout(10000),
      log: null,
    });

    assert.equal(result.response.status, 502);
    const json = (await result.response.json()) as any;
    assert.ok(json.error.message.includes("ECONNREFUSED"));
  } finally {
    restore();
  }
});

test("Error: empty messages returns 400", async () => {
  const executor = new PerplexityWebExecutor();
  const result = await executor.execute({
    model: "pplx-auto",
    body: { messages: [] },
    stream: false,
    credentials: { apiKey: "test-cookie" },
    signal: AbortSignal.timeout(10000),
    log: null,
  });

  assert.equal(result.response.status, 400);
  const json = (await result.response.json()) as any;
  assert.ok(json.error.message.includes("Missing or empty messages"));
});

test("Error: missing messages returns 400", async () => {
  const executor = new PerplexityWebExecutor();
  const result = await executor.execute({
    model: "pplx-auto",
    body: {},
    stream: false,
    credentials: { apiKey: "test-cookie" },
    signal: AbortSignal.timeout(10000),
    log: null,
  });

  assert.equal(result.response.status, 400);
});

// ─── Test: Perplexity SSE error in stream ───────────────────────────────────

test("Non-streaming: Perplexity stream error returns 502", async () => {
  const pplxEvents = [{ error_code: "RATE_LIMIT", error_message: "Too many requests" }];

  const restore = mockFetch(200, pplxEvents);
  try {
    const executor = new PerplexityWebExecutor();
    const result = await executor.execute({
      model: "pplx-auto",
      body: { messages: [{ role: "user", content: "test" }], stream: false },
      stream: false,
      credentials: { apiKey: "test-cookie" },
      signal: AbortSignal.timeout(10000),
      log: null,
    });

    assert.equal(result.response.status, 502);
    const json = (await result.response.json()) as any;
    assert.ok(json.error.message.includes("Too many requests"));
  } finally {
    restore();
  }
});

// ─── Test: Message parsing ──────────────────────────────────────────────────

test("Message parsing: system + user + assistant history", async () => {
  let capturedBody = null;
  const original = globalThis.fetch;
  globalThis.fetch = async (url, opts) => {
    capturedBody = JSON.parse(opts.body);
    return new Response(
      mockPplxStream([
        {
          blocks: [
            {
              intended_usage: "markdown",
              markdown_block: { chunks: ["response"], progress: "DONE" },
            },
          ],
          status: "COMPLETED",
        },
      ]),
      { status: 200, headers: { "Content-Type": "text/event-stream" } }
    );
  };

  try {
    const executor = new PerplexityWebExecutor();
    await executor.execute({
      model: "pplx-auto",
      body: {
        messages: [
          { role: "system", content: "You are helpful" },
          { role: "user", content: "First question" },
          { role: "assistant", content: "First answer" },
          { role: "user", content: "Follow up" },
        ],
        stream: false,
      },
      stream: false,
      credentials: { apiKey: "test-cookie" },
      signal: AbortSignal.timeout(10000),
      log: null,
    });

    // The query should contain the current message
    const query = capturedBody.query_str;
    assert.ok(query.includes("Follow up"), "Query should contain current user message");
    assert.ok(query.includes("You are helpful"), "Query should contain system message");
    assert.equal(capturedBody.params.search_focus, "internet");
    assert.equal(capturedBody.params.use_schematized_api, true);
  } finally {
    globalThis.fetch = original;
  }
});

test("Message parsing: developer role treated as system", async () => {
  let capturedBody = null;
  const original = globalThis.fetch;
  globalThis.fetch = async (url, opts) => {
    capturedBody = JSON.parse(opts.body);
    return new Response(
      mockPplxStream([
        {
          blocks: [
            {
              intended_usage: "markdown",
              markdown_block: { chunks: ["ok"], progress: "DONE" },
            },
          ],
          status: "COMPLETED",
        },
      ]),
      { status: 200, headers: { "Content-Type": "text/event-stream" } }
    );
  };

  try {
    const executor = new PerplexityWebExecutor();
    await executor.execute({
      model: "pplx-sonnet",
      body: {
        messages: [
          { role: "developer", content: "Be concise" },
          { role: "user", content: "hello" },
        ],
        stream: false,
      },
      stream: false,
      credentials: { apiKey: "test-cookie" },
      signal: AbortSignal.timeout(10000),
      log: null,
    });

    const query = capturedBody.query_str;
    assert.ok(query.includes("Be concise"), "Developer message should be treated as system");
  } finally {
    globalThis.fetch = original;
  }
});

// ─── Test: Auth header construction ─────────────────────────────────────────

test("Auth: cookie-based auth sends Cookie header", async () => {
  let capturedHeaders = null;
  const original = globalThis.fetch;
  globalThis.fetch = async (url, opts) => {
    capturedHeaders = opts.headers;
    return new Response(
      mockPplxStream([
        {
          blocks: [
            {
              intended_usage: "markdown",
              markdown_block: { chunks: ["ok"], progress: "DONE" },
            },
          ],
          status: "COMPLETED",
        },
      ]),
      { status: 200, headers: { "Content-Type": "text/event-stream" } }
    );
  };

  try {
    const executor = new PerplexityWebExecutor();
    await executor.execute({
      model: "pplx-auto",
      body: { messages: [{ role: "user", content: "test" }], stream: false },
      stream: false,
      credentials: { apiKey: "my-session-token-value" },
      signal: AbortSignal.timeout(10000),
      log: null,
    });

    assert.equal(
      capturedHeaders["Cookie"],
      "__Secure-next-auth.session-token=my-session-token-value"
    );
    assert.ok(
      !capturedHeaders["Authorization"],
      "Should not have Authorization header for cookie auth"
    );
  } finally {
    globalThis.fetch = original;
  }
});

test("Auth: JWT auth sends Authorization Bearer header", async () => {
  let capturedHeaders = null;
  const original = globalThis.fetch;
  globalThis.fetch = async (url, opts) => {
    capturedHeaders = opts.headers;
    return new Response(
      mockPplxStream([
        {
          blocks: [
            {
              intended_usage: "markdown",
              markdown_block: { chunks: ["ok"], progress: "DONE" },
            },
          ],
          status: "COMPLETED",
        },
      ]),
      { status: 200, headers: { "Content-Type": "text/event-stream" } }
    );
  };

  try {
    const executor = new PerplexityWebExecutor();
    await executor.execute({
      model: "pplx-auto",
      body: { messages: [{ role: "user", content: "test" }], stream: false },
      stream: false,
      credentials: { accessToken: "jwt-token-value" },
      signal: AbortSignal.timeout(10000),
      log: null,
    });

    assert.equal(capturedHeaders["Authorization"], "Bearer jwt-token-value");
    assert.ok(!capturedHeaders["Cookie"], "Should not have Cookie header for JWT auth");
  } finally {
    globalThis.fetch = original;
  }
});

// ─── Test: Model mapping ────────────────────────────────────────────────────

test("Model mapping: pplx-gpt sends correct internal preference", async () => {
  let capturedBody = null;
  const original = globalThis.fetch;
  globalThis.fetch = async (url, opts) => {
    capturedBody = JSON.parse(opts.body);
    return new Response(
      mockPplxStream([
        {
          blocks: [
            {
              intended_usage: "markdown",
              markdown_block: { chunks: ["ok"], progress: "DONE" },
            },
          ],
          status: "COMPLETED",
        },
      ]),
      { status: 200, headers: { "Content-Type": "text/event-stream" } }
    );
  };

  try {
    const executor = new PerplexityWebExecutor();
    await executor.execute({
      model: "pplx-gpt",
      body: { messages: [{ role: "user", content: "test" }], stream: false },
      stream: false,
      credentials: { apiKey: "test" },
      signal: AbortSignal.timeout(10000),
      log: null,
    });

    assert.equal(capturedBody.params.model_preference, "gpt54");
    assert.equal(capturedBody.params.mode, "copilot");
  } finally {
    globalThis.fetch = original;
  }
});

test("Model mapping: thinking mode uses thinking variant", async () => {
  let capturedBody = null;
  const original = globalThis.fetch;
  globalThis.fetch = async (url, opts) => {
    capturedBody = JSON.parse(opts.body);
    return new Response(
      mockPplxStream([
        {
          blocks: [
            {
              intended_usage: "markdown",
              markdown_block: { chunks: ["ok"], progress: "DONE" },
            },
          ],
          status: "COMPLETED",
        },
      ]),
      { status: 200, headers: { "Content-Type": "text/event-stream" } }
    );
  };

  try {
    const executor = new PerplexityWebExecutor();
    await executor.execute({
      model: "pplx-sonnet",
      body: {
        messages: [{ role: "user", content: "test" }],
        stream: false,
        thinking: true,
      },
      stream: false,
      credentials: { apiKey: "test" },
      signal: AbortSignal.timeout(10000),
      log: null,
    });

    assert.equal(capturedBody.params.model_preference, "claude46sonnetthinking");
  } finally {
    globalThis.fetch = original;
  }
});

// ─── Test: Provider registry ────────────────────────────────────────────────

test("Provider registry: perplexity-web is registered with correct models", async () => {
  const { PROVIDER_MODELS } = await import("../../open-sse/config/providerModels.ts");

  const models = PROVIDER_MODELS["pplx-web"];
  assert.ok(models, "pplx-web should be in PROVIDER_MODELS");
  assert.ok(models.length === 7, `Expected 7 models, got ${models.length}`);

  const modelIds = models.map((m) => m.id);
  assert.ok(modelIds.includes("pplx-auto"));
  assert.ok(modelIds.includes("pplx-gpt"));
  assert.ok(modelIds.includes("pplx-sonnet"));
  assert.ok(modelIds.includes("pplx-opus"));
  assert.ok(modelIds.includes("pplx-gemini"));
  assert.ok(modelIds.includes("pplx-nemotron"));
  assert.ok(modelIds.includes("pplx-sonar"));
});

// ─── Test: Fallback text field ──────────────────────────────────────────────

test("Non-streaming: falls back to text field when no blocks", async () => {
  const pplxEvents = [{ text: "Fallback answer text", status: "COMPLETED", final: true }];

  const restore = mockFetch(200, pplxEvents);
  try {
    const executor = new PerplexityWebExecutor();
    const result = await executor.execute({
      model: "pplx-auto",
      body: { messages: [{ role: "user", content: "test" }], stream: false },
      stream: false,
      credentials: { apiKey: "test-cookie" },
      signal: AbortSignal.timeout(10000),
      log: null,
    });

    const json = (await result.response.json()) as any;
    assert.ok(json.choices[0].message.content.includes("Fallback answer text"));
  } finally {
    restore();
  }
});

// ─── Test: Request URL and headers ──────────────────────────────────────────

test("Request: posts to correct Perplexity SSE endpoint", async () => {
  let capturedUrl = null;
  let capturedHeaders = null;
  const original = globalThis.fetch;
  globalThis.fetch = async (url, opts) => {
    capturedUrl = url;
    capturedHeaders = opts.headers;
    return new Response(
      mockPplxStream([
        {
          blocks: [
            { intended_usage: "markdown", markdown_block: { chunks: ["ok"], progress: "DONE" } },
          ],
          status: "COMPLETED",
        },
      ]),
      { status: 200, headers: { "Content-Type": "text/event-stream" } }
    );
  };

  try {
    const executor = new PerplexityWebExecutor();
    await executor.execute({
      model: "pplx-auto",
      body: { messages: [{ role: "user", content: "test" }], stream: false },
      stream: false,
      credentials: { apiKey: "test" },
      signal: AbortSignal.timeout(10000),
      log: null,
    });

    assert.equal(capturedUrl, "https://www.perplexity.ai/rest/sse/perplexity_ask");
    assert.equal(capturedHeaders["Origin"], "https://www.perplexity.ai");
    assert.equal(capturedHeaders["X-App-ApiVersion"], "2.18");
    assert.equal(capturedHeaders["Accept"], "text/event-stream");
  } finally {
    globalThis.fetch = original;
  }
});
