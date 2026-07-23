// @ts-nocheck
import test from "node:test";
import assert from "node:assert/strict";

// ─── Response JSON shapes (real types derived from OpenAI-compatible bodies) ─

interface PplxChatCompletionJson {
  id: string;
  object: string;
  choices: Array<{
    message: { role: string; content: string };
    finish_reason: string;
  }>;
  usage: { total_tokens: number };
}

interface PplxErrorJson {
  error: { message: string };
}

// ─── Import the executor and its dependencies ──────────────────────────────

const { PerplexityWebExecutor } = await import("../../open-sse/executors/perplexity-web.ts");
const { getExecutor, hasSpecializedExecutor } = await import("../../open-sse/executors/index.ts");
const { __setTlsFetchOverrideForTesting, TlsClientUnavailableError } =
  await import("../../open-sse/services/perplexityTlsClient.ts");

// #2459: the executor now routes through tlsFetchPerplexity (Firefox TLS) instead of
// global fetch. Install one persistent bridge so the tests below can keep stubbing
// globalThis.fetch (returning a Response) and have it surface as a TlsFetchResult.
__setTlsFetchOverrideForTesting(async (url, opts) => {
  const res = await (globalThis.fetch as typeof fetch)(url, opts);
  return {
    status: res.status,
    headers: res.headers,
    text: res.status === 200 ? null : await res.text(),
    body: res.status === 200 ? res.body : null,
  };
});

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

// ─── Helper: stub globalThis.fetch for testing ──────────────────────────────
// The persistent bridge above forwards tlsFetchPerplexity calls to globalThis.fetch,
// so stubbing fetch is still the way to mock Perplexity's upstream response.

function mockFetch(status, streamEvents, bodyText) {
  const original = globalThis.fetch;
  globalThis.fetch = async () => {
    if (status === 200) {
      return new Response(mockPplxStream(streamEvents), {
        status,
        headers: { "Content-Type": "text/event-stream" },
      });
    }
    return new Response(bodyText ?? `{"error":"http ${status}"}`, {
      status,
      headers: { "Content-Type": "text/html" },
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
    const json = (await result.response.json()) as PplxChatCompletionJson;
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
      model: "pplx-sonar",
      body: { messages: [{ role: "user", content: "meaning of life" }], stream: false },
      stream: false,
      credentials: { apiKey: "test-cookie" },
      signal: AbortSignal.timeout(10000),
      log: null,
    });

    const json = (await result.response.json()) as PplxChatCompletionJson;
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

// ─── Test: Schematized diff_block streaming (use_schematized_api) ───────────

test("Schematized API: diff_block chunks reconstruct answer (non-streaming)", async () => {
  // Mirrors the live www.perplexity.ai schematized API: the answer streams as
  // RFC-6902 JSON-patch frames against markdown_block, a `final:true` flag
  // arrives on a still-PENDING frame, then a COMPLETED frame materializes the
  // full markdown_block. The parser must NOT stop on `final` and must apply
  // the diff patches.
  const pplxEvents = [
    {
      backend_uuid: "diff-uuid-1",
      status: "PENDING",
      blocks: [
        {
          intended_usage: "ask_text_0_markdown",
          diff_block: {
            field: "markdown_block",
            patches: [
              { op: "replace", path: "", value: { progress: "IN_PROGRESS", chunks: ["The "] } },
            ],
          },
        },
      ],
    },
    {
      status: "PENDING",
      blocks: [
        {
          intended_usage: "ask_text_0_markdown",
          diff_block: {
            field: "markdown_block",
            patches: [{ op: "add", path: "/chunks/1", value: "answer " }],
          },
        },
      ],
    },
    {
      status: "PENDING",
      final: true,
      blocks: [
        {
          intended_usage: "ask_text_0_markdown",
          diff_block: {
            field: "markdown_block",
            patches: [{ op: "add", path: "/chunks/2", value: "is 42." }],
          },
        },
      ],
    },
    {
      status: "COMPLETED",
      final: true,
      blocks: [
        {
          intended_usage: "ask_text_0_markdown",
          markdown_block: {
            progress: "DONE",
            chunks: ["The answer is 42."],
            answer: "The answer is 42.",
          },
        },
      ],
    },
  ];

  const restore = mockFetch(200, pplxEvents);
  try {
    const executor = new PerplexityWebExecutor();
    const result = await executor.execute({
      model: "pplx-auto",
      body: { messages: [{ role: "user", content: "what is the answer?" }], stream: false },
      stream: false,
      credentials: { apiKey: "test-cookie" },
      signal: AbortSignal.timeout(10000),
      log: null,
    });

    assert.equal(result.response.status, 200);
    const json = JSON.parse(await result.response.text());
    assert.equal(json.choices[0].message.content, "The answer is 42.");
  } finally {
    restore();
  }
});

test("Schematized API: diff_block streams incremental deltas", async () => {
  const pplxEvents = [
    {
      backend_uuid: "diff-uuid-2",
      status: "PENDING",
      blocks: [
        {
          intended_usage: "ask_text_0_markdown",
          diff_block: {
            field: "markdown_block",
            patches: [
              { op: "replace", path: "", value: { progress: "IN_PROGRESS", chunks: ["one, "] } },
            ],
          },
        },
      ],
    },
    {
      status: "PENDING",
      blocks: [
        {
          intended_usage: "ask_text_0_markdown",
          diff_block: {
            field: "markdown_block",
            patches: [{ op: "add", path: "/chunks/1", value: "two, " }],
          },
        },
      ],
    },
    {
      status: "COMPLETED",
      final: true,
      blocks: [
        {
          intended_usage: "ask_text_0_markdown",
          markdown_block: {
            progress: "DONE",
            chunks: ["one, two, three"],
            answer: "one, two, three",
          },
        },
      ],
    },
  ];

  const restore = mockFetch(200, pplxEvents);
  try {
    const executor = new PerplexityWebExecutor();
    const result = await executor.execute({
      model: "pplx-auto",
      body: { messages: [{ role: "user", content: "count" }], stream: true },
      stream: true,
      credentials: { apiKey: "test-cookie" },
      signal: AbortSignal.timeout(10000),
      log: null,
    });

    assert.equal(result.response.status, 200);
    const text = await result.response.text();
    let assembled = "";
    for (const line of text.split("\n")) {
      if (!line.startsWith("data: ")) continue;
      const d = line.slice(6).trim();
      if (d === "[DONE]") continue;
      const o = JSON.parse(d);
      const c = o.choices?.[0]?.delta?.content;
      if (c) assembled += c;
    }
    assert.equal(assembled, "one, two, three");
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
    const json = (await result.response.json()) as PplxErrorJson;
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
      model: "pplx-sonar",
      body: { messages: [{ role: "user", content: "hi" }] },
      stream: false,
      credentials: { apiKey: "test-cookie" },
      signal: AbortSignal.timeout(10000),
      log: null,
    });

    assert.equal(result.response.status, 429);
    const json = (await result.response.json()) as PplxErrorJson;
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
    const json = (await result.response.json()) as PplxErrorJson;
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
  const json = (await result.response.json()) as PplxErrorJson;
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
    const json = (await result.response.json()) as PplxErrorJson;
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

test("Model mapping: GPT-5.6 Terra sends its current internal preference", async () => {
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
      model: "pplx-gpt-5.6-terra",
      body: { messages: [{ role: "user", content: "test" }], stream: false },
      stream: false,
      credentials: { apiKey: "test" },
      signal: AbortSignal.timeout(10000),
      log: null,
    });

    assert.equal(capturedBody.params.model_preference, "gpt56_terra");
    assert.equal(capturedBody.params.mode, "search");
  } finally {
    globalThis.fetch = original;
  }
});

test("Model mapping: pplx-sonar maps to turbo/copilot (live browser default)", async () => {
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
      model: "pplx-sonar",
      body: { messages: [{ role: "user", content: "hello" }], stream: false },
      stream: false,
      credentials: { apiKey: "test" },
      signal: AbortSignal.timeout(10000),
      log: null,
    });

    assert.equal(capturedBody.params.model_preference, "turbo");
    assert.equal(capturedBody.params.mode, "copilot");
    assert.equal(capturedBody.params.supports_tool_approval_modal, true);
    assert.ok(
      capturedBody.params.supported_block_use_cases.includes("workflow_widgets"),
      "payload must advertise workflow_widgets like the live browser"
    );
    assert.ok(
      capturedBody.params.supported_block_use_cases.includes("navigation_results"),
      "payload must advertise navigation_results like the live browser"
    );
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

    assert.equal(capturedBody.params.model_preference, "claude50sonnetthinking");
    // Thinking variants still go through mode "search" (THINKING_MAP path).
    assert.equal(capturedBody.params.mode, "search");
  } finally {
    globalThis.fetch = original;
  }
});

// ─── Test: Live multi-step stream (no COMPLETED; text_completed + diffs) ────

test("Live multi-step: reconstructs answer without status COMPLETED", async () => {
  // Mirrors Chrome 150 / copilot multi-step capture: PENDING frames with
  // ask_text + ask_text_0_markdown diff_block chunks, text_completed:true,
  // never status COMPLETED. Parser must still return the answer, and plan
  // goals delivered as RFC-6902 diff patches (not a materialized plan_block)
  // must still surface as reasoning_content.
  const pplxEvents = [
    {
      status: "PENDING",
      blocks: [
        {
          intended_usage: "plan",
          diff_block: {
            field: "plan_block",
            patches: [
              {
                op: "replace",
                path: "",
                value: {
                  progress: "IN_PROGRESS",
                  goals: [{ id: "0", description: "Greeting the user", final: false }],
                },
              },
            ],
          },
        },
      ],
    },
    {
      status: "PENDING",
      blocks: [
        {
          intended_usage: "ask_text_0_markdown",
          diff_block: {
            field: "markdown_block",
            patches: [
              { op: "replace", path: "", value: { progress: "IN_PROGRESS", chunks: ["Hello "] } },
            ],
          },
        },
        {
          intended_usage: "ask_text",
          diff_block: {
            field: "markdown_block",
            patches: [
              { op: "replace", path: "", value: { progress: "IN_PROGRESS", chunks: ["Hello "] } },
            ],
          },
        },
      ],
    },
    {
      status: "PENDING",
      text_completed: true,
      blocks: [
        {
          intended_usage: "ask_text_0_markdown",
          diff_block: {
            field: "markdown_block",
            patches: [{ op: "add", path: "/chunks/1", value: "there." }],
          },
        },
        {
          intended_usage: "ask_text",
          diff_block: {
            field: "markdown_block",
            patches: [{ op: "add", path: "/chunks/1", value: "there." }],
          },
        },
      ],
    },
    {
      status: "PENDING",
      final: true,
      text: '[{"step_type":"INITIAL_QUERY","content":{"query":"hello"}}]',
    },
  ];

  const restore = mockFetch(200, pplxEvents);
  try {
    const executor = new PerplexityWebExecutor();
    const result = await executor.execute({
      model: "pplx-opus",
      body: { messages: [{ role: "user", content: "hello" }], stream: false },
      stream: false,
      credentials: { apiKey: "test-cookie" },
      signal: AbortSignal.timeout(10000),
      log: null,
    });

    assert.equal(result.response.status, 200);
    const json = JSON.parse(await result.response.text());
    assert.equal(json.choices[0].message.content, "Hello there.");
    // Plan goals via diff_block should surface as reasoning_content
    assert.ok(
      String(json.choices[0].message.reasoning_content || "").includes("Greeting the user")
    );
  } finally {
    restore();
  }
});

test("Advanced-model quota upsell with empty answer surfaces clear error", async () => {
  const pplxEvents = [
    {
      status: "PENDING",
      upsell_information: {
        name: "advanced_models_quota_low",
        upsell_type: "UPGRADE_TO_PRO",
        title: "No advanced model uses left this week",
        description: "Upgrade to Perplexity Max",
      },
      blocks: [
        {
          intended_usage: "plan",
          diff_block: {
            field: "plan_block",
            patches: [
              {
                op: "replace",
                path: "",
                value: { goals: [{ description: "Hello, how can I assist you?" }] },
              },
            ],
          },
        },
      ],
    },
    { status: "PENDING", final: true, text_completed: true },
  ];

  const restore = mockFetch(200, pplxEvents);
  try {
    const executor = new PerplexityWebExecutor();
    const result = await executor.execute({
      model: "pplx-opus",
      body: { messages: [{ role: "user", content: "hello" }], stream: false },
      stream: false,
      credentials: { apiKey: "test-cookie" },
      signal: AbortSignal.timeout(10000),
      log: null,
    });

    assert.equal(result.response.status, 429);
    const json = JSON.parse(await result.response.text());
    assert.match(String(json.error?.message || ""), /quota exhausted/i);
    assert.match(String(json.error?.message || ""), /No advanced model uses left/i);
    assert.match(String(json.error?.message || ""), /reset after/i);
    assert.equal(json.error?.code, "quota_exhausted");
    assert.equal(json.error?.type, "quota_exhausted");
    assert.ok(
      typeof json.error?.reset_seconds === "number" && json.error.reset_seconds >= 3600,
      "reset_seconds should be a multi-hour weekly-quota cooldown"
    );
    assert.equal(result.response.headers.get("Retry-After"), String(json.error.reset_seconds));
  } finally {
    restore();
  }
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

    const json = (await result.response.json()) as PplxChatCompletionJson;
    assert.ok(json.choices[0].message.content.includes("Fallback answer text"));
  } finally {
    restore();
  }
});

// Live COMPLETED frame carries the answer only in a double-encoded FINAL step
// blob (no markdown_block / diff_block). Without this fallback the executor
// returns empty content → chatCore 502 "Provider returned empty content".
test("Non-streaming: recovers answer from COMPLETED FINAL text step-blob", async () => {
  const answerObj = {
    answer: "Hi Bilal — nice to meet you! How can I help today?",
    chunks: ["Hi Bilal — ", "nice to meet ", "you! How can I ", "help to", "day?"],
    web_results: [],
  };
  const pplxEvents = [
    {
      status: "COMPLETED",
      final: true,
      final_sse_message: true,
      blocks: [],
      text: JSON.stringify([
        { step_type: "INITIAL_QUERY", content: { query: "hello" } },
        { step_type: "FINAL", content: { answer: JSON.stringify(answerObj) } },
      ]),
    },
  ];

  const restore = mockFetch(200, pplxEvents);
  try {
    const executor = new PerplexityWebExecutor();
    const result = await executor.execute({
      model: "pplx-sonar",
      body: { messages: [{ role: "user", content: "hello" }], stream: false },
      stream: false,
      credentials: { apiKey: "test-cookie" },
      signal: AbortSignal.timeout(10000),
      log: null,
    });

    assert.equal(result.response.status, 200);
    const json = (await result.response.json()) as {
      choices: Array<{ message: { content: string } }>;
    };
    assert.equal(
      json.choices[0].message.content,
      "Hi Bilal — nice to meet you! How can I help today?"
    );
  } finally {
    restore();
  }
});

// Mirrors the Jul 2026 browser capture: dual ask_text + ask_text_0_markdown
// tracks stream the same chunks via diff_block; parser must not double-count
// and must assemble the full answer.
test("Schematized API: dual ask_text tracks do not double-count", async () => {
  const pplxEvents = [
    {
      status: "PENDING",
      blocks: [
        {
          intended_usage: "ask_text_0_markdown",
          diff_block: {
            field: "markdown_block",
            patches: [
              {
                op: "replace",
                path: "",
                value: { progress: "IN_PROGRESS", chunks: ["Hi Bilal — "] },
              },
            ],
          },
        },
        {
          intended_usage: "ask_text",
          diff_block: {
            field: "markdown_block",
            patches: [
              {
                op: "replace",
                path: "",
                value: { progress: "IN_PROGRESS", chunks: ["Hi Bilal — "] },
              },
            ],
          },
        },
      ],
    },
    {
      status: "PENDING",
      blocks: [
        {
          intended_usage: "ask_text_0_markdown",
          diff_block: {
            field: "markdown_block",
            patches: [{ op: "add", path: "/chunks/1", value: "nice to meet you!" }],
          },
        },
        {
          intended_usage: "ask_text",
          diff_block: {
            field: "markdown_block",
            patches: [{ op: "add", path: "/chunks/1", value: "nice to meet you!" }],
          },
        },
      ],
    },
    {
      status: "COMPLETED",
      final: true,
      blocks: [
        {
          intended_usage: "ask_text_0_markdown",
          markdown_block: {
            progress: "DONE",
            answer: "Hi Bilal — nice to meet you!",
            chunks: ["Hi Bilal — nice to meet you!"],
          },
        },
      ],
    },
  ];

  const restore = mockFetch(200, pplxEvents);
  try {
    const executor = new PerplexityWebExecutor();
    const result = await executor.execute({
      model: "pplx-sonar",
      body: { messages: [{ role: "user", content: "hello" }], stream: false },
      stream: false,
      credentials: { apiKey: "test-cookie" },
      signal: AbortSignal.timeout(10000),
      log: null,
    });

    assert.equal(result.response.status, 200);
    const json = (await result.response.json()) as {
      choices: Array<{ message: { content: string } }>;
    };
    assert.equal(json.choices[0].message.content, "Hi Bilal — nice to meet you!");
  } finally {
    restore();
  }
});

// Unit: extractAnswerFromFinalText pure helper
test("extractAnswerFromFinalText: double-encoded FINAL step blob", async () => {
  const { extractAnswerFromFinalText } = await import(
    "../../open-sse/executors/perplexity-web/protocol.ts"
  );
  const text = JSON.stringify([
    { step_type: "INITIAL_QUERY", content: { query: "hello" } },
    {
      step_type: "FINAL",
      content: {
        answer: JSON.stringify({
          answer: "Recovered from blob",
          chunks: ["Recovered ", "from blob"],
        }),
      },
    },
  ]);
  assert.equal(extractAnswerFromFinalText(text), "Recovered from blob");
  assert.equal(extractAnswerFromFinalText("plain text answer"), "plain text answer");
  assert.equal(extractAnswerFromFinalText(null), null);
  assert.equal(extractAnswerFromFinalText(""), null);
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
    assert.equal(
      capturedHeaders["x-perplexity-request-endpoint"],
      "https://www.perplexity.ai/rest/sse/perplexity_ask"
    );
    assert.equal(capturedHeaders["x-perplexity-request-reason"], "ask-query-state-provider");
    assert.ok(capturedHeaders["x-request-id"], "x-request-id header should be set");
    assert.equal(capturedHeaders["Accept"], "text/event-stream");
  } finally {
    globalThis.fetch = original;
  }
});

// ─── #2459: Cloudflare challenge vs genuine auth failure ─────────────────────

test("Error: Cloudflare 403 challenge returns a distinct (non-cookie) error", async () => {
  const restore = mockFetch(403, [], "<html><title>Just a moment...</title></html>");
  try {
    const executor = new PerplexityWebExecutor();
    const result = await executor.execute({
      model: "pplx-auto",
      body: { messages: [{ role: "user", content: "hi" }] },
      stream: false,
      credentials: { apiKey: "valid-cookie" },
      signal: AbortSignal.timeout(10000),
      log: null,
    });

    assert.equal(result.response.status, 403);
    const json = (await result.response.json()) as PplxErrorJson;
    assert.match(json.error.message, /Cloudflare/i);
    assert.ok(!/session-token/i.test(json.error.message), "must not blame the cookie");
  } finally {
    restore();
  }
});

test("Error: TlsClientUnavailableError returns 502 with install hint", async () => {
  const restore = mockFetchError(new TlsClientUnavailableError("native binary missing"));
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
    const json = (await result.response.json()) as PplxErrorJson;
    assert.match(json.error.message, /TLS client unavailable/i);
  } finally {
    restore();
  }
});
