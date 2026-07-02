import test from "node:test";
import assert from "node:assert/strict";
const { GithubExecutor } = await import("../../open-sse/executors/github.ts");
const { BaseExecutor } = await import("../../open-sse/executors/base.ts");

function streamFromChunks(chunks) {
  const encoder = new TextEncoder();
  return new ReadableStream({
    start(controller) {
      for (const chunk of chunks) {
        controller.enqueue(encoder.encode(chunk));
      }
      controller.close();
    },
  });
}

const originalFetch = globalThis.fetch;

test.afterEach(async () => {
  globalThis.fetch = originalFetch;
});

test.after(() => {
  globalThis.fetch = originalFetch;
});

test("T27: Claude + response_format=json_object injects system instruction and strips response_format field", () => {
  const executor = new GithubExecutor();
  const request = {
    messages: [{ role: "user", content: "return json" }],
    response_format: { type: "json_object" },
  };

  const transformed = executor.transformRequest("claude-sonnet-4.5", request, false, {});

  assert.equal(transformed.response_format, undefined);
  assert.equal(transformed.messages[0].role, "system");
  assert.match(
    transformed.messages[0].content,
    /Respond only with valid JSON\. Do not include any text/i
  );
});

test("T27: non-Claude models keep response_format untouched", () => {
  const executor = new GithubExecutor();
  const request = {
    messages: [{ role: "user", content: "hello" }],
    response_format: { type: "json_object" },
  };

  const transformed = executor.transformRequest("gpt-4o", request, false, {});
  assert.deepEqual(transformed.response_format, { type: "json_object" });
});

test("T27: GitHub executor preserves SSE frames and only materializes non-streaming bodies", async () => {
  const executor = new GithubExecutor();
  const originalExecute = BaseExecutor.prototype.execute;

  BaseExecutor.prototype.execute = async () => ({
    response: new Response(
      streamFromChunks(['data: {"delta":"hello"}\n\n', "data: [DONE]\n\n", "data: tail\n\n"]),
      {
        status: 200,
        headers: { "content-type": "text/event-stream" },
      }
    ),
    url: "https://api.githubcopilot.com/chat/completions",
    headers: {},
    transformedBody: {},
  });

  try {
    const streamingResult = await executor.execute({
      model: "claude-sonnet-4.5",
      body: { messages: [] },
      stream: true,
      credentials: { accessToken: "token" },
    });
    const streamingText = await streamingResult.response.text();
    assert.equal(streamingText.includes("data: [DONE]"), true);
    assert.equal(streamingText.includes("data: tail"), true);

    const nonStreamingResult = await executor.execute({
      model: "claude-sonnet-4.5",
      body: { messages: [] },
      stream: false,
      credentials: { accessToken: "token" },
    });
    const nonStreamingText = await nonStreamingResult.response.text();
    assert.equal(nonStreamingText.includes("data: [DONE]"), true);
  } finally {
    BaseExecutor.prototype.execute = originalExecute;
  }
});

test("T27: streaming error responses keep their original body readable", async () => {
  const executor = new GithubExecutor();
  const originalExecute = BaseExecutor.prototype.execute;

  BaseExecutor.prototype.execute = async () => ({
    response: new Response("IDE token expired: unauthorized: token expired\n", {
      status: 401,
      headers: { "content-type": "text/plain; charset=utf-8" },
    }),
    url: "https://api.githubcopilot.com/chat/completions",
    headers: {},
    transformedBody: {},
  });

  try {
    const result = await executor.execute({
      model: "claude-sonnet-4.5",
      body: { messages: [] },
      stream: true,
      credentials: { accessToken: "token" },
    });

    assert.equal(result.response.status, 401);
    assert.equal(await result.response.text(), "IDE token expired: unauthorized: token expired\n");
  } finally {
    BaseExecutor.prototype.execute = originalExecute;
  }
});

test("T27: requests use copilotToken from providerSpecificData when available", async () => {
  globalThis.fetch = async (_url, init: RequestInit = {}) => {
    assert.equal((init.headers as Record<string, string>).Authorization, "Bearer copilot_test");
    return new Response(
      JSON.stringify({
        choices: [
          { index: 0, message: { role: "assistant", content: "OK" }, finish_reason: "stop" },
        ],
      }),
      {
        status: 200,
        headers: { "content-type": "application/json" },
      }
    );
  };

  const executor = new GithubExecutor();
  const result = await executor.execute({
    model: "gemini-3.1-pro-preview",
    body: { messages: [{ role: "user", content: "Ping" }], stream: false },
    stream: false,
    credentials: {
      accessToken: "ghu_test",
      providerSpecificData: {
        copilotToken: "copilot_test",
      },
    },
  });

  assert.equal(result.response.status, 200);
  assert.match(await result.response.text(), /OK/);
});

test("T27: non-stream execute materializes provider responses before returning", async () => {
  const executor = new GithubExecutor();
  const originalExecute = BaseExecutor.prototype.execute;

  class WeirdResponse {
    _body: string;
    status: number;
    statusText: string;
    headers: Headers;
    bodyUsed: boolean;
    body: Record<string, unknown>;

    constructor(body: string, init: ResponseInit = {}) {
      this._body = body;
      this.status = init.status || 200;
      this.statusText = init.statusText || "OK";
      this.headers = new Headers(init.headers || {});
      this.bodyUsed = false;
      this.body = {};
    }

    async text() {
      if (this.bodyUsed) {
        throw new TypeError("Response body is already used");
      }
      this.bodyUsed = true;
      return this._body;
    }
  }

  BaseExecutor.prototype.execute = async () => ({
    response: new WeirdResponse(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { "content-type": "application/json" },
    }),
    url: "https://api.githubcopilot.com/chat/completions",
    headers: {},
    transformedBody: {},
  });

  try {
    const result = await executor.execute({
      model: "gemini-3.1-pro-preview",
      body: { messages: [{ role: "user", content: "Ping" }], stream: false },
      stream: false,
      credentials: {
        accessToken: "ghu_test",
        providerSpecificData: {
          copilotToken: "copilot_test",
        },
      },
    });

    assert.equal(result.response.constructor.name, "Response");
    assert.equal(await result.response.text(), JSON.stringify({ ok: true }));
  } finally {
    BaseExecutor.prototype.execute = originalExecute;
  }
});

test("T27: needsRefresh respects providerSpecificData copilot token metadata", () => {
  const executor = new GithubExecutor();
  const expiresAt = Math.floor(Date.now() / 1000) + 3600;

  assert.equal(
    executor.needsRefresh({
      accessToken: "ghu_test",
      providerSpecificData: {
        copilotToken: "copilot_test",
        copilotTokenExpiresAt: expiresAt,
      },
    }),
    false
  );
});
