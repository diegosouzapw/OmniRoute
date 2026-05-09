import test from "node:test";
import assert from "node:assert/strict";

import { getExecutor } from "../../open-sse/executors/index.ts";
import { GlmExecutor } from "../../open-sse/executors/glm.ts";

function makeSseResponse(lines: string[]): Response {
  return new Response(lines.join("\n\n") + "\n\n", {
    headers: { "Content-Type": "text/event-stream" },
  });
}

test("GlmExecutor normalizes GLM coding and Anthropic URLs without duplicating endpoints", () => {
  const executor = new GlmExecutor("glm");

  assert.equal(
    executor.buildUrl("glm-5.1", true, 0, {
      providerSpecificData: { baseUrl: "https://api.z.ai/api/coding/paas/v4" },
    }),
    "https://api.z.ai/api/coding/paas/v4/chat/completions"
  );

  assert.equal(
    executor.buildUrl("glm-5.1", true, 0, {
      providerSpecificData: { baseUrl: "https://api.z.ai/api/coding/paas/v4/" },
    }),
    "https://api.z.ai/api/coding/paas/v4/chat/completions"
  );

  assert.equal(
    executor.buildUrl("glm-5.1", true, 0, {
      providerSpecificData: {
        baseUrl: "https://api.z.ai/api/coding/paas/v4/chat/completions",
      },
    }),
    "https://api.z.ai/api/coding/paas/v4/chat/completions"
  );

  assert.equal(
    executor.buildUrl("glm-5.1", true, 0, {
      providerSpecificData: {
        baseUrl: "https://proxy.example.com/api/coding/paas/v4/v1/messages",
      },
    }),
    "https://proxy.example.com/api/coding/paas/v4/chat/completions"
  );

  assert.equal(
    executor.buildUrl("glm-5.1", true, 0, {
      providerSpecificData: { baseUrl: "https://api.z.ai/api/anthropic" },
    }),
    "https://api.z.ai/api/anthropic/v1/messages?beta=true"
  );

  assert.equal(
    executor.buildUrl("glm-5.1", true, 0, {
      providerSpecificData: { baseUrl: "https://api.z.ai/api/anthropic/v1" },
    }),
    "https://api.z.ai/api/anthropic/v1/messages?beta=true"
  );

  assert.equal(
    new GlmExecutor("glm-cn").buildUrl("glm-5.1", true, 0, {
      providerSpecificData: {
        anthropicBaseUrl: "https://open.bigmodel.cn/api/anthropic/v1",
        primaryTransport: "anthropic",
      },
    }),
    "https://open.bigmodel.cn/api/anthropic/v1/messages?beta=true"
  );

  assert.equal(
    executor.buildUrl("glm-5.1", true, 1, {
      providerSpecificData: { baseUrl: "https://api.z.ai/api/anthropic" },
    }),
    "https://api.z.ai/api/coding/paas/v4/chat/completions"
  );

  assert.equal(
    executor.buildUrl("glm-5.1", true, 0, {
      providerSpecificData: { baseUrl: "https://api.z.ai/api/anthropic/v1/messages" },
    }),
    "https://api.z.ai/api/anthropic/v1/messages?beta=true"
  );

  assert.equal(
    executor.buildUrl("glm-5.1", true, 1, {
      providerSpecificData: { baseUrl: "https://api.z.ai/api/anthropic/v1/messages" },
    }),
    "https://api.z.ai/api/coding/paas/v4/chat/completions"
  );

  assert.equal(
    executor.buildUrl("glm-5.1", true, 0, {
      providerSpecificData: {
        baseUrl: "https://api.z.ai/api/anthropic/v1/messages?beta=true",
      },
    }),
    "https://api.z.ai/api/anthropic/v1/messages?beta=true"
  );

  assert.equal(
    executor.buildCountTokensUrl("glm-5.1", {
      providerSpecificData: {
        baseUrl: "https://proxy.example.com/api/anthropic/v1/messages/count_tokens",
      },
    }),
    "https://proxy.example.com/api/anthropic/v1/messages/count_tokens?beta=true"
  );

  assert.equal(
    executor.buildUrl("glm-5.1", true, 0, {
      providerSpecificData: {
        baseUrl:
          "https://proxy.example.com/api/coding/paas/v4/chat/completions?tenant=alpha&route=glm",
      },
    }),
    "https://proxy.example.com/api/coding/paas/v4/chat/completions?tenant=alpha&route=glm"
  );

  assert.equal(
    executor.buildCountTokensUrl("glm-5.1", {
      providerSpecificData: {
        anthropicBaseUrl:
          "https://proxy.example.com/api/anthropic/v1/messages/count_tokens?tenant=alpha&route=glm",
      },
    }),
    "https://proxy.example.com/api/anthropic/v1/messages/count_tokens?tenant=alpha&route=glm&beta=true"
  );
});

test("GlmExecutor separates OpenAI-compatible coding headers from Anthropic headers", () => {
  assert.equal(getExecutor("glm") instanceof GlmExecutor, true);
  assert.equal(getExecutor("glm-cn") instanceof GlmExecutor, true);
  assert.equal(getExecutor("glmt") instanceof GlmExecutor, true);

  const executor = new GlmExecutor("glm");
  const codingHeaders = executor.buildHeaders(
    {
      apiKey: "glm-key",
      providerSpecificData: { baseUrl: "https://api.z.ai/api/coding/paas/v4" },
    },
    true
  );

  assert.equal(codingHeaders.Authorization, "Bearer glm-key");
  assert.equal(codingHeaders["x-api-key"], undefined);
  assert.equal(codingHeaders["anthropic-version"], undefined);
  assert.equal(codingHeaders["anthropic-beta"], undefined);
  assert.equal(codingHeaders["anthropic-dangerous-direct-browser-access"], undefined);
  assert.equal(codingHeaders.Accept, "text/event-stream");

  const countTokensHeaders = executor.buildHeaders(
    {
      apiKey: "glm-key",
      providerSpecificData: { baseUrl: "https://api.z.ai/api/coding/paas/v4" },
    },
    false,
    null,
    undefined,
    "anthropic"
  );
  assert.equal(countTokensHeaders["x-api-key"], "glm-key");
  assert.equal(countTokensHeaders.Authorization, undefined);
  assert.equal(countTokensHeaders["anthropic-version"], "2023-06-01");

  const anthropicHeaders = executor.buildHeaders(
    {
      apiKey: "glm-key",
      providerSpecificData: { baseUrl: "https://api.z.ai/api/anthropic/v1/messages" },
    },
    true,
    null,
    undefined,
    "anthropic"
  );

  assert.equal(anthropicHeaders["x-api-key"], "glm-key");
  assert.equal(anthropicHeaders.Authorization, undefined);
  assert.equal(anthropicHeaders.Accept, "text/event-stream");
  assert.equal(anthropicHeaders["anthropic-version"], "2023-06-01");
  assert.match(anthropicHeaders["anthropic-beta"], /claude-code-20250219/);
  assert.equal(anthropicHeaders["anthropic-dangerous-direct-browser-access"], "true");
  assert.match(anthropicHeaders["User-Agent"], /^claude-cli\/2\.1\.137 \(external, sdk-cli\)$/);
  assert.equal(anthropicHeaders["X-Stainless-Lang"], "js");
  assert.equal(anthropicHeaders["X-Stainless-Runtime"], "node");
});

test("GlmExecutor preserves extra API key rotation", () => {
  const executor = new GlmExecutor("glm");
  const headers = executor.buildHeaders(
    {
      apiKey: "primary-key",
      connectionId: "glm-rotation-test",
      providerSpecificData: {
        baseUrl: "https://api.z.ai/api/anthropic/v1/messages",
        extraApiKeys: ["extra-key"],
      },
    },
    true,
    null,
    undefined,
    "anthropic"
  );

  assert.ok(["primary-key", "extra-key"].includes(headers["x-api-key"]));
  assert.equal(headers.Authorization, undefined);
});

test("GlmExecutor applies GLMT adaptive thinking defaults without mutating caller body", () => {
  const executor = new GlmExecutor("glmt");
  const body = { messages: [{ role: "user", content: "hi" }] };

  const transformed = executor.transformRequest("glm-5.1", body, true, {
    apiKey: "glm-key",
  }) as any;

  assert.notEqual(transformed, body);
  assert.equal((body as any).max_tokens, undefined);
  assert.equal(transformed.max_tokens, 65_536);
  assert.equal(transformed.temperature, 0.2);
  assert.deepEqual(transformed.thinking, { type: "adaptive", budget_tokens: 24_576 });
});

test("GlmExecutor applies conservative GLM defaults without mutating caller body", () => {
  const executor = new GlmExecutor("glm");
  const body = { messages: [{ role: "user", content: "hi" }] };

  const transformed = executor.transformRequest("glm-5.1", body, false, {
    apiKey: "glm-key",
  }) as any;

  assert.notEqual(transformed, body);
  assert.equal((body as any).max_tokens, undefined);
  assert.equal(transformed.max_tokens, 16_384);
  assert.equal(transformed.temperature, undefined);
  assert.equal(transformed.thinking, undefined);
});

test("GlmExecutor preserves caller max token settings over GLM defaults", () => {
  const executor = new GlmExecutor("glm");
  const body = {
    messages: [{ role: "user", content: "hi" }],
    max_output_tokens: 512,
  };

  const transformed = executor.transformRequest("glm-5.1", body, false, {
    apiKey: "glm-key",
  }) as any;

  assert.deepEqual(transformed, body);
  assert.equal((transformed as any).max_tokens, undefined);
  assert.equal((transformed as any).max_output_tokens, 512);
});

test("GlmExecutor count_tokens is best-effort and timeout bounded", async () => {
  const executor = new GlmExecutor("glm");

  assert.equal(
    executor.buildCountTokensUrl("glm-5.1", {
      providerSpecificData: { baseUrl: "https://api.z.ai/api/coding/paas/v4" },
    }),
    "https://api.z.ai/api/anthropic/v1/messages/count_tokens?beta=true"
  );
  assert.equal(executor.getCountTokensTimeoutMs(), 3_000);

  const originalFetch = globalThis.fetch;
  let captured: { url: string; body: any; headers: any } | null = null;
  globalThis.fetch = async (url, init: RequestInit = {}) => {
    captured = {
      url: String(url),
      body: JSON.parse(String(init.body || "{}")),
      headers: init.headers,
    };
    return Response.json({ input_tokens: 42 });
  };

  try {
    const result = await executor.countTokens({
      model: "glm-5.1",
      body: { messages: [{ role: "user", content: "hello" }] },
      credentials: {
        apiKey: "glm-key",
        providerSpecificData: { baseUrl: "https://api.z.ai/api/coding/paas/v4" },
      },
    });

    assert.equal(result?.input_tokens, 42);
    assert.ok(captured);
    assert.equal(captured.url, "https://api.z.ai/api/anthropic/v1/messages/count_tokens?beta=true");
    assert.equal(captured.body.model, "glm-5.1");
    assert.equal(captured.headers["x-api-key"], "glm-key");
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("GlmExecutor translates Anthropic streaming fallback to OpenAI SSE", async () => {
  const executor = new GlmExecutor("glm");
  const originalFetch = globalThis.fetch;

  globalThis.fetch = async () => {
    return new Response(
      'event: message_start\ndata: {"type":"message_start","message":{"id":"msg_1","type":"message","role":"assistant","model":"glm-5.1","content":[],"stop_reason":null,"usage":{"input_tokens":1,"output_tokens":0}}}\n\nevent: content_block_delta\ndata: {"type":"content_block_delta","index":0,"delta":{"type":"text_delta","text":"hi"}}\n\nevent: message_stop\ndata: {"type":"message_stop"}\n\n',
      {
        headers: { "Content-Type": "text/event-stream" },
      }
    );
  };

  try {
    const result = await executor.execute({
      model: "glm-5.1",
      body: { messages: [{ role: "user", content: "hello" }] },
      stream: true,
      credentials: {
        apiKey: "glm-key",
        providerSpecificData: {
          baseUrl: "https://api.z.ai/api/anthropic/v1/messages",
          primaryTransport: "anthropic",
        },
      },
    });

    assert.equal(result.targetFormat, "openai");
    assert.equal(result.response.headers.get("content-type"), "text/event-stream");
    const text = await result.response.text();
    assert.match(text, /chat\.completion\.chunk/);
    assert.doesNotMatch(text, /message_start/);
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("GlmExecutor sends OpenAI coding payload first and enables streaming tool chunks", async () => {
  const executor = new GlmExecutor("glm");
  const originalFetch = globalThis.fetch;
  let captured: { url: string; body: any; headers: any } | null = null;

  globalThis.fetch = async (url, init: RequestInit = {}) => {
    captured = {
      url: String(url),
      body: JSON.parse(String(init.body || "{}")),
      headers: init.headers,
    };
    return makeSseResponse([
      'data: {"id":"chatcmpl-glm","object":"chat.completion.chunk","choices":[{"index":0,"delta":{"role":"assistant","content":"ok"}}]}',
      "data: [DONE]",
    ]);
  };

  try {
    const result = await executor.execute({
      model: "glm-5.1",
      body: {
        messages: [{ role: "user", content: "weather" }],
        tools: [
          {
            type: "function",
            function: {
              name: "get_weather",
              parameters: { type: "object", properties: {} },
            },
          },
        ],
      },
      stream: true,
      credentials: {
        apiKey: "glm-key",
        providerSpecificData: { baseUrl: "https://api.z.ai/api/coding/paas/v4" },
      },
    });

    assert.equal(result.response.status, 200);
    assert.equal(captured?.url, "https://api.z.ai/api/coding/paas/v4/chat/completions");
    assert.equal(captured?.headers.Authorization, "Bearer glm-key");
    assert.equal(captured?.headers["x-api-key"], undefined);
    assert.equal(captured?.headers["anthropic-version"], undefined);
    assert.equal(captured?.body.tool_stream, true);
    assert.equal(captured?.body.tools[0].function.name, "get_weather");
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("GlmExecutor falls back internally to Anthropic transport and returns OpenAI JSON", async () => {
  const executor = new GlmExecutor("glm");
  const originalFetch = globalThis.fetch;
  const calls: Array<{ url: string; body: any; headers: any }> = [];

  globalThis.fetch = async (url, init: RequestInit = {}) => {
    calls.push({
      url: String(url),
      body: JSON.parse(String(init.body || "{}")),
      headers: init.headers,
    });

    if (calls.length === 1) {
      return new Response(JSON.stringify({ error: "not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    return Response.json({
      id: "msg_glm",
      type: "message",
      role: "assistant",
      model: "glm-5.1",
      content: [{ type: "text", text: "fallback ok" }],
      stop_reason: "end_turn",
      usage: { input_tokens: 3, output_tokens: 2 },
    });
  };

  try {
    const result = await executor.execute({
      model: "glm-5.1",
      body: { messages: [{ role: "user", content: "hello" }] },
      stream: false,
      credentials: {
        apiKey: "glm-key",
        providerSpecificData: { baseUrl: "https://api.z.ai/api/coding/paas/v4" },
      },
    });

    assert.equal(calls.length, 2);
    assert.equal(calls[0].url, "https://api.z.ai/api/coding/paas/v4/chat/completions");
    assert.equal(calls[0].headers.Authorization, "Bearer glm-key");
    assert.equal(calls[1].url, "https://api.z.ai/api/anthropic/v1/messages?beta=true");
    assert.equal(calls[1].headers["x-api-key"], "glm-key");
    assert.equal(calls[1].headers.Authorization, undefined);
    assert.equal(calls[1].body.messages[0].role, "user");
    assert.equal(calls[1].body._disableToolPrefix, undefined);
    assert.equal(result.targetFormat, "openai");

    const json = await result.response.json();
    assert.equal(json.object, "chat.completion");
    assert.equal(json.choices[0].message.content, "fallback ok");
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("GlmExecutor falls back when primary stream ends before useful content", async () => {
  const executor = new GlmExecutor("glm");
  const originalFetch = globalThis.fetch;
  const calls: string[] = [];

  globalThis.fetch = async (url) => {
    calls.push(String(url));
    if (calls.length === 1) {
      return makeSseResponse(["event: ping", "data: {}"]);
    }
    return makeSseResponse([
      'event: message_start\ndata: {"type":"message_start","message":{"id":"msg_1","type":"message","role":"assistant","model":"glm-5.1","content":[],"stop_reason":null,"usage":{"input_tokens":1,"output_tokens":0}}}',
      'event: content_block_delta\ndata: {"type":"content_block_delta","index":0,"delta":{"type":"text_delta","text":"fallback stream ok"}}',
      'event: message_stop\ndata: {"type":"message_stop"}',
    ]);
  };

  try {
    const result = await executor.execute({
      model: "glm-5.1",
      body: { messages: [{ role: "user", content: "hello" }] },
      stream: true,
      credentials: {
        apiKey: "glm-key",
        providerSpecificData: { baseUrl: "https://api.z.ai/api/coding/paas/v4" },
      },
    });

    assert.deepEqual(calls, [
      "https://api.z.ai/api/coding/paas/v4/chat/completions",
      "https://api.z.ai/api/anthropic/v1/messages?beta=true",
    ]);
    assert.equal(result.response.status, 200);
    assert.equal(result.targetFormat, "openai");
    const text = await result.response.text();
    assert.match(text, /chat\.completion\.chunk/);
    assert.match(text, /fallback stream ok/);
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("GlmExecutor preserves non-OK streaming upstream status before readiness", async () => {
  const executor = new GlmExecutor("glm");
  const originalFetch = globalThis.fetch;
  const calls: string[] = [];

  globalThis.fetch = async (url) => {
    calls.push(String(url));
    return new Response(JSON.stringify({ error: "invalid api key" }), {
      status: 401,
      headers: { "Content-Type": "application/json" },
    });
  };

  try {
    const result = await executor.execute({
      model: "glm-5.1",
      body: { messages: [{ role: "user", content: "hello" }] },
      stream: true,
      credentials: {
        apiKey: "bad-key",
        providerSpecificData: { baseUrl: "https://api.z.ai/api/coding/paas/v4" },
      },
    });

    assert.deepEqual(calls, ["https://api.z.ai/api/coding/paas/v4/chat/completions"]);
    assert.equal(result.response.status, 401);
    assert.match(await result.response.text(), /invalid api key/);
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("GlmExecutor translates Anthropic JSON errors to OpenAI-shaped fallback responses", async () => {
  const executor = new GlmExecutor("glm");
  const originalFetch = globalThis.fetch;

  globalThis.fetch = async () => {
    return new Response(
      JSON.stringify({
        type: "error",
        error: { type: "invalid_request_error", message: "bad anthropic fallback" },
      }),
      {
        status: 400,
        headers: { "Content-Type": "application/json" },
      }
    );
  };

  try {
    const result = await executor.execute({
      model: "glm-5.1",
      body: { messages: [{ role: "user", content: "hello" }] },
      stream: false,
      credentials: {
        apiKey: "glm-key",
        providerSpecificData: {
          baseUrl: "https://api.z.ai/api/anthropic/v1/messages",
          primaryTransport: "anthropic",
        },
      },
    });

    assert.equal(result.targetFormat, "openai");
    assert.equal(result.response.status, 400);
    const json = await result.response.json();
    assert.equal(json.error.message, "bad anthropic fallback");
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("GlmExecutor Anthropic fallback keeps tool names unprefixed", async () => {
  const executor = new GlmExecutor("glm");
  const originalFetch = globalThis.fetch;
  const calls: Array<{ url: string; body: any; headers: any }> = [];

  globalThis.fetch = async (url, init: RequestInit = {}) => {
    calls.push({
      url: String(url),
      body: JSON.parse(String(init.body || "{}")),
      headers: init.headers,
    });
    if (calls.length === 1) return new Response("upstream down", { status: 502 });
    return Response.json({
      id: "msg_tool",
      type: "message",
      role: "assistant",
      model: "glm-5.1",
      content: [
        { type: "tool_use", id: "toolu_1", name: "get_weather", input: { location: "Madrid" } },
      ],
      stop_reason: "tool_use",
      usage: { input_tokens: 4, output_tokens: 1 },
    });
  };

  try {
    const result = await executor.execute({
      model: "glm-5.1",
      body: {
        messages: [{ role: "user", content: "weather" }],
        tools: [
          {
            type: "function",
            function: {
              name: "get_weather",
              parameters: { type: "object", properties: {} },
            },
          },
        ],
      },
      stream: false,
      credentials: {
        apiKey: "glm-key",
        providerSpecificData: { baseUrl: "https://api.z.ai/api/coding/paas/v4" },
      },
    });

    assert.equal(calls.length, 2);
    assert.equal(calls[1].body.tools[0].name, "get_weather");
    assert.equal(calls[1].body.tools[0].name.startsWith("proxy_"), false);
    assert.equal(calls[1].body._disableToolPrefix, undefined);

    const json = await result.response.json();
    assert.equal(json.choices[0].finish_reason, "tool_calls");
    assert.equal(json.choices[0].message.tool_calls[0].function.name, "get_weather");
  } finally {
    globalThis.fetch = originalFetch;
  }
});
