// @ts-nocheck
import test from "node:test";
import assert from "node:assert/strict";

const { DeepSeekWebExecutor, DEEPSEEK_WEB_BASE } =
  await import("../../open-sse/executors/deepseek-web.ts");
const { DeepSeekWebWithAutoRefreshExecutor } =
  await import("../../open-sse/executors/deepseek-web-with-auto-refresh.ts");
const { getExecutor, hasSpecializedExecutor } = await import("../../open-sse/executors/index.ts");

const COMPLETION_URL = `${DEEPSEEK_WEB_BASE}/api/v0/chat/completion`;

// ─── Registration ────────────────────────────────────────────────────────

test("DeepSeekWebExecutor registered as deepseek-web and ds-web", () => {
  assert.ok(hasSpecializedExecutor("deepseek-web"));
  assert.ok(hasSpecializedExecutor("ds-web"));
});

test("getExecutor returns DeepSeekWebWithAutoRefreshExecutor", () => {
  const exec = getExecutor("deepseek-web");
  assert.ok(exec instanceof DeepSeekWebWithAutoRefreshExecutor);
});

test("alias ds-web resolves same executor", () => {
  assert.ok(getExecutor("ds-web") instanceof DeepSeekWebWithAutoRefreshExecutor);
});

test("provider name is deepseek-web", () => {
  assert.equal(new DeepSeekWebExecutor().getProvider(), "deepseek-web");
});

// ─── Credential validation ───────────────────────────────────────────────

test("execute returns 400 without ds_session_id cookie", async () => {
  const executor = new DeepSeekWebExecutor();
  const result = await executor.execute({
    model: "default",
    body: { messages: [{ role: "user", content: "hi" }] },
    stream: true,
    credentials: { cookies: "foo=bar" },
    signal: AbortSignal.timeout(5000),
  });
  assert.equal(result.response.status, 400);
  const text = await result.response.text();
  assert.ok(text.includes("ds_session_id"));
});

test("execute returns 400 with empty credentials", async () => {
  const executor = new DeepSeekWebExecutor();
  const result = await executor.execute({
    model: "default",
    body: { messages: [{ role: "user", content: "hi" }] },
    stream: true,
    credentials: {},
    signal: AbortSignal.timeout(5000),
  });
  assert.equal(result.response.status, 400);
});

// ─── Test connection ─────────────────────────────────────────────────────

test("testConnection returns false with empty credentials", async () => {
  const executor = new DeepSeekWebExecutor();
  assert.equal(await executor.testConnection({}), false);
});

test("testConnection returns false without ds_session_id", async () => {
  const executor = new DeepSeekWebExecutor();
  assert.equal(await executor.testConnection({ cookies: "foo=bar" }), false);
});

// ─── API flow (mocked) ──────────────────────────────────────────────────

function mockDeepSeekFlow() {
  const original = globalThis.fetch;
  const calls = [];

  globalThis.fetch = async (url, opts) => {
    const urlStr = typeof url === "string" ? url : url.toString();
    calls.push({ url: urlStr, method: opts?.method, body: opts?.body });

    // /users/current → return token
    if (urlStr.includes("/users/current")) {
      return new Response(
        JSON.stringify({
          code: 0,
          data: { biz_data: { token: "test-bearer-token-123", email: "test@test.com" } },
        }),
        { status: 200, headers: { "Content-Type": "application/json" } }
      );
    }

    // /chat_session/create → return session id
    if (urlStr.includes("/chat_session/create")) {
      return new Response(
        JSON.stringify({
          code: 0,
          data: { biz_data: { chat_session: { id: "session-abc-123" } } },
        }),
        { status: 200, headers: { "Content-Type": "application/json" } }
      );
    }

    // /create_pow_challenge → return challenge
    if (urlStr.includes("/create_pow_challenge")) {
      return new Response(
        JSON.stringify({
          code: 0,
          data: {
            biz_data: {
              challenge: {
                algorithm: "DeepSeekHashV1",
                challenge: "311b26ae1e0fe7375e242958ce46db5552a6c67fea3f96880dcd846c63a74286",
                salt: "1122334455667788",
                signature: "sig123",
                difficulty: 1000,
                expire_at: 1778891543095,
                expire_after: 300000,
                target_path: "/api/v0/chat/completion",
              },
            },
          },
        }),
        { status: 200, headers: { "Content-Type": "application/json" } }
      );
    }

    // /chat/completion → return SSE stream
    if (urlStr.includes("/chat/completion")) {
      const encoder = new TextEncoder();
      const sse = [
        "event: ready\n",
        'data: {"request_message_id":1,"response_message_id":2}\n',
        "\n",
        'data: {"v":{"response":{"message_id":2,"fragments":[{"id":1,"type":"RESPONSE","content":"Hello"}]}}}\n',
        "\n",
        'data: {"p":"response/status","o":"SET","v":"FINISHED"}\n',
        "\n",
        "event: close\n",
        'data: {"click_behavior":"none"}\n',
      ].join("");
      return new Response(encoder.encode(sse), {
        status: 200,
        headers: { "Content-Type": "text/event-stream" },
      });
    }

    return new Response("Not found", { status: 404 });
  };

  return {
    calls,
    restore: () => {
      globalThis.fetch = original;
    },
  };
}

test("execute: full flow with mocked API (streaming)", async () => {
  const mock = mockDeepSeekFlow();
  try {
    const executor = new DeepSeekWebExecutor();
    const result = await executor.execute({
      model: "default",
      body: { messages: [{ role: "user", content: "Say hello" }] },
      stream: true,
      credentials: { cookies: "ds_session_id=test-session-id-1234" },
      signal: AbortSignal.timeout(10000),
    });

    assert.ok(result.response.ok);
    assert.equal(result.response.headers.get("content-type"), "text/event-stream");

    // Read SSE stream
    const text = await result.response.text();
    assert.ok(text.includes('"content":"Hello"'), "Should contain Hello");
    assert.ok(text.includes('"finish_reason":"stop"'), "Should have stop");
    assert.ok(text.includes("[DONE]"), "Should have [DONE]");

    // Verify API call sequence
    assert.ok(
      mock.calls.some((c) => c.url.includes("/users/current")),
      "Called /users/current"
    );
    assert.ok(
      mock.calls.some((c) => c.url.includes("/chat_session/create")),
      "Created session"
    );
    assert.ok(
      mock.calls.some((c) => c.url.includes("/create_pow_challenge")),
      "Got PoW challenge"
    );
    assert.ok(
      mock.calls.some((c) => c.url.includes("/chat/completion")),
      "Called completion"
    );

    // Verify completion request had Bearer token
    const compCall = mock.calls.find((c) => c.url.includes("/chat/completion"));
    const body = JSON.parse(compCall.body);
    assert.equal(body.chat_session_id, "session-abc-123");
    assert.equal(body.prompt, "Say hello");
  } finally {
    mock.restore();
  }
});

test("execute: full flow with mocked API (non-streaming)", async () => {
  const mock = mockDeepSeekFlow();
  try {
    const executor = new DeepSeekWebExecutor();
    const result = await executor.execute({
      model: "default",
      body: { messages: [{ role: "user", content: "hi" }] },
      stream: false,
      credentials: { cookies: "ds_session_id=abc123" },
      signal: AbortSignal.timeout(10000),
    });

    assert.ok(result.response.ok);
    const json = JSON.parse(await result.response.text());
    assert.equal(json.object, "chat.completion");
    assert.equal(json.choices[0].message.role, "assistant");
    assert.equal(json.choices[0].message.content, "Hello");
    assert.equal(json.choices[0].finish_reason, "stop");
  } finally {
    mock.restore();
  }
});

test("execute: sends PoW response header", async () => {
  const original = globalThis.fetch;
  const capturedHeaders = {};

  globalThis.fetch = async (url, opts) => {
    const urlStr = typeof url === "string" ? url : url.toString();
    if (urlStr.includes("/users/current")) {
      return new Response(JSON.stringify({ code: 0, data: { biz_data: { token: "tok" } } }), {
        headers: { "Content-Type": "application/json" },
      });
    }
    if (urlStr.includes("/chat_session/create")) {
      return new Response(
        JSON.stringify({ code: 0, data: { biz_data: { chat_session: { id: "s1" } } } }),
        { headers: { "Content-Type": "application/json" } }
      );
    }
    if (urlStr.includes("/create_pow_challenge")) {
      return new Response(
        JSON.stringify({
          code: 0,
          data: {
            biz_data: {
              challenge: {
                algorithm: "DeepSeekHashV1",
                challenge: "705e5d630f02d09a8179c6a0fcb0caf7265f08fb206fadca0301224f4422fc64",
                salt: "bb",
                signature: "s",
                difficulty: 1000,
                expire_at: 1778891543095,
                expire_after: 300000,
                target_path: "/api/v0/chat/completion",
              },
            },
          },
        }),
        { headers: { "Content-Type": "application/json" } }
      );
    }
    if (urlStr.includes("/chat/completion")) {
      Object.assign(capturedHeaders, opts.headers);
      const encoder = new TextEncoder();
      return new Response(encoder.encode("data: [DONE]\n\n"), {
        headers: { "Content-Type": "text/event-stream" },
      });
    }
    return new Response("", { status: 404 });
  };

  try {
    const executor = new DeepSeekWebExecutor();
    await executor.execute({
      model: "default",
      body: { messages: [{ role: "user", content: "hi" }] },
      stream: true,
      credentials: { cookies: "ds_session_id=x" },
      signal: AbortSignal.timeout(10000),
    });

    assert.ok(capturedHeaders["Authorization"]?.startsWith("Bearer tok"), "Has Bearer token");
    assert.ok(capturedHeaders["x-ds-pow-response"], "Has PoW header");
    assert.ok(capturedHeaders["x-app-version"] === "2.0.0", "Has x-app-version");
    assert.ok(capturedHeaders["x-client-platform"] === "web", "Has x-client-platform");
  } finally {
    globalThis.fetch = original;
  }
});

test("execute: handles API error (token fetch fails)", async () => {
  const original = globalThis.fetch;
  globalThis.fetch = async (url) => {
    if (url.includes("/users/current")) {
      return new Response(JSON.stringify({ code: 0, data: { biz_data: null } }), {
        headers: { "Content-Type": "application/json" },
      });
    }
    return new Response("", { status: 404 });
  };
  try {
    const executor = new DeepSeekWebExecutor();
    const result = await executor.execute({
      model: "default",
      body: { messages: [{ role: "user", content: "hi" }] },
      stream: true,
      credentials: { cookies: "ds_session_id=abc" },
      signal: AbortSignal.timeout(10000),
    });
    assert.ok(result.response.status >= 400, "Should return error status");
  } finally {
    globalThis.fetch = original;
  }
});

test("execute: handles 401 from DeepSeek", async () => {
  const original = globalThis.fetch;
  globalThis.fetch = async (url) => {
    if (url.includes("/users/current")) {
      return new Response(JSON.stringify({ code: 0, data: { biz_data: { token: "tok" } } }), {
        headers: { "Content-Type": "application/json" },
      });
    }
    if (url.includes("/chat_session/create")) {
      return new Response(
        JSON.stringify({ code: 0, data: { biz_data: { chat_session: { id: "s" } } } }),
        { headers: { "Content-Type": "application/json" } }
      );
    }
    if (url.includes("/create_pow_challenge")) {
      return new Response(
        JSON.stringify({
          code: 0,
          data: {
            biz_data: {
              challenge: {
                algorithm: "DeepSeekHashV1",
                challenge: "705e5d630f02d09a8179c6a0fcb0caf7265f08fb206fadca0301224f4422fc64",
                salt: "bb",
                signature: "s",
                difficulty: 1000,
                expire_at: 1778891543095,
                expire_after: 300000,
                target_path: "/api/v0/chat/completion",
              },
            },
          },
        }),
        { headers: { "Content-Type": "application/json" } }
      );
    }
    if (url.includes("/chat/completion")) {
      return new Response("Unauthorized", { status: 401 });
    }
    return new Response("", { status: 404 });
  };
  try {
    const executor = new DeepSeekWebExecutor();
    const result = await executor.execute({
      model: "default",
      body: { messages: [{ role: "user", content: "hi" }] },
      stream: true,
      credentials: { cookies: "ds_session_id=abc" },
      signal: AbortSignal.timeout(10000),
    });
    assert.equal(result.response.status, 401);
  } finally {
    globalThis.fetch = original;
  }
});

test("execute: handles DeepSeek JSON error (40003 INVALID_TOKEN)", async () => {
  const original = globalThis.fetch;
  globalThis.fetch = async (url) => {
    if (url.includes("/users/current")) {
      return new Response(JSON.stringify({ code: 0, data: { biz_data: { token: "tok" } } }), {
        headers: { "Content-Type": "application/json" },
      });
    }
    if (url.includes("/chat_session/create")) {
      return new Response(
        JSON.stringify({ code: 0, data: { biz_data: { chat_session: { id: "s" } } } }),
        { headers: { "Content-Type": "application/json" } }
      );
    }
    if (url.includes("/create_pow_challenge")) {
      return new Response(
        JSON.stringify({
          code: 0,
          data: {
            biz_data: {
              challenge: {
                algorithm: "DeepSeekHashV1",
                challenge: "705e5d630f02d09a8179c6a0fcb0caf7265f08fb206fadca0301224f4422fc64",
                salt: "bb",
                signature: "s",
                difficulty: 1000,
                expire_at: 1778891543095,
                expire_after: 300000,
                target_path: "/api/v0/chat/completion",
              },
            },
          },
        }),
        { headers: { "Content-Type": "application/json" } }
      );
    }
    if (url.includes("/chat/completion")) {
      return new Response(JSON.stringify({ code: 40003, msg: "INVALID_TOKEN", data: null }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    }
    return new Response("", { status: 404 });
  };
  try {
    const executor = new DeepSeekWebExecutor();
    const result = await executor.execute({
      model: "default",
      body: { messages: [{ role: "user", content: "hi" }] },
      stream: true,
      credentials: { cookies: "ds_session_id=abc" },
      signal: AbortSignal.timeout(10000),
    });
    assert.equal(result.response.status, 401);
    const text = await result.response.text();
    assert.ok(text.includes("40003"));
  } finally {
    globalThis.fetch = original;
  }
});

// ─── Model mapping ───────────────────────────────────────────────────────

test("execute: maps model to deepseek_r1 with thinking", async () => {
  const original = globalThis.fetch;
  let capturedBody = null;
  globalThis.fetch = async (url, opts) => {
    if (url.includes("/users/current"))
      return new Response(JSON.stringify({ code: 0, data: { biz_data: { token: "t" } } }), {
        headers: { "Content-Type": "application/json" },
      });
    if (url.includes("/chat_session/create"))
      return new Response(
        JSON.stringify({ code: 0, data: { biz_data: { chat_session: { id: "s" } } } }),
        { headers: { "Content-Type": "application/json" } }
      );
    if (url.includes("/create_pow_challenge"))
      return new Response(
        JSON.stringify({
          code: 0,
          data: {
            biz_data: {
              challenge: {
                algorithm: "DeepSeekHashV1",
                challenge: "705e5d630f02d09a8179c6a0fcb0caf7265f08fb206fadca0301224f4422fc64",
                salt: "bb",
                signature: "s",
                difficulty: 1000,
                expire_at: 1778891543095,
                expire_after: 300000,
                target_path: "/api/v0/chat/completion",
              },
            },
          },
        }),
        { headers: { "Content-Type": "application/json" } }
      );
    if (url.includes("/chat/completion")) {
      capturedBody = JSON.parse(opts.body);
      const enc = new TextEncoder();
      return new Response(enc.encode("data: [DONE]\n\n"), {
        headers: { "Content-Type": "text/event-stream" },
      });
    }
    return new Response("", { status: 404 });
  };
  try {
    await new DeepSeekWebExecutor().execute({
      model: "deepseek-r1",
      body: { messages: [{ role: "user", content: "think" }] },
      stream: true,
      credentials: { cookies: "ds_session_id=x" },
      signal: AbortSignal.timeout(10000),
    });
    assert.equal(capturedBody.model_type, "deepseek_r1");
    assert.equal(capturedBody.thinking_enabled, true);
  } finally {
    globalThis.fetch = original;
  }
});

// ─── Auto-refresh executor ───────────────────────────────────────────────

test("DeepSeekWebWithAutoRefresh extends DeepSeekWebExecutor", () => {
  const exec = new DeepSeekWebWithAutoRefreshExecutor({ autoRefresh: false });
  assert.ok(exec instanceof DeepSeekWebExecutor);
});

test("isSessionValid starts false", () => {
  const exec = new DeepSeekWebWithAutoRefreshExecutor({ autoRefresh: false });
  assert.equal(exec.isSessionValid(), false);
});

// ─── Abort handling ──────────────────────────────────────────────────────

test("execute: handles abort signal gracefully", async () => {
  const executor = new DeepSeekWebExecutor();
  const controller = new AbortController();
  controller.abort();
  const result = await executor.execute({
    model: "default",
    body: { messages: [{ role: "user", content: "hi" }] },
    stream: true,
    credentials: { cookies: "ds_session_id=test" },
    signal: controller.signal,
  });
  assert.ok(result.response, "Should return response");
  assert.ok(result.response.status >= 400, "Should indicate error");
});

// ─── Search enabled ──────────────────────────────────────────────────────

test("execute: passes search_enabled from body", async () => {
  const original = globalThis.fetch;
  let capturedBody = null;
  globalThis.fetch = async (url, opts) => {
    if (url.includes("/users/current"))
      return new Response(JSON.stringify({ code: 0, data: { biz_data: { token: "t" } } }), {
        headers: { "Content-Type": "application/json" },
      });
    if (url.includes("/chat_session/create"))
      return new Response(
        JSON.stringify({ code: 0, data: { biz_data: { chat_session: { id: "s1" } } } }),
        { headers: { "Content-Type": "application/json" } }
      );
    if (url.includes("/create_pow_challenge"))
      return new Response(
        JSON.stringify({
          code: 0,
          data: {
            biz_data: {
              challenge: {
                algorithm: "DeepSeekHashV1",
                challenge: "705e5d630f02d09a8179c6a0fcb0caf7265f08fb206fadca0301224f4422fc64",
                salt: "bb",
                signature: "s",
                difficulty: 1000,
                expire_at: 1778891543095,
                expire_after: 300000,
                target_path: "/api/v0/chat/completion",
              },
            },
          },
        }),
        { headers: { "Content-Type": "application/json" } }
      );
    if (url.includes("/chat/completion")) {
      capturedBody = JSON.parse(opts.body);
      return new Response(new TextEncoder().encode("data: [DONE]\n\n"), {
        headers: { "Content-Type": "text/event-stream" },
      });
    }
    return new Response("", { status: 404 });
  };
  try {
    await new DeepSeekWebExecutor().execute({
      model: "default",
      body: { messages: [{ role: "user", content: "hi" }], search_enabled: true },
      stream: true,
      credentials: { cookies: "ds_session_id=x" },
      signal: AbortSignal.timeout(10000),
    });
    assert.equal(capturedBody.search_enabled, true);
  } finally {
    globalThis.fetch = original;
  }
});

test("execute: search_enabled defaults to false", async () => {
  const original = globalThis.fetch;
  let capturedBody = null;
  globalThis.fetch = async (url, opts) => {
    if (url.includes("/users/current"))
      return new Response(JSON.stringify({ code: 0, data: { biz_data: { token: "t" } } }), {
        headers: { "Content-Type": "application/json" },
      });
    if (url.includes("/chat_session/create"))
      return new Response(
        JSON.stringify({ code: 0, data: { biz_data: { chat_session: { id: "s1" } } } }),
        { headers: { "Content-Type": "application/json" } }
      );
    if (url.includes("/create_pow_challenge"))
      return new Response(
        JSON.stringify({
          code: 0,
          data: {
            biz_data: {
              challenge: {
                algorithm: "DeepSeekHashV1",
                challenge: "705e5d630f02d09a8179c6a0fcb0caf7265f08fb206fadca0301224f4422fc64",
                salt: "bb",
                signature: "s",
                difficulty: 1000,
                expire_at: 1778891543095,
                expire_after: 300000,
                target_path: "/api/v0/chat/completion",
              },
            },
          },
        }),
        { headers: { "Content-Type": "application/json" } }
      );
    if (url.includes("/chat/completion")) {
      capturedBody = JSON.parse(opts.body);
      return new Response(new TextEncoder().encode("data: [DONE]\n\n"), {
        headers: { "Content-Type": "text/event-stream" },
      });
    }
    return new Response("", { status: 404 });
  };
  try {
    await new DeepSeekWebExecutor().execute({
      model: "default",
      body: { messages: [{ role: "user", content: "hi" }] },
      stream: true,
      credentials: { cookies: "ds_session_id=x" },
      signal: AbortSignal.timeout(10000),
    });
    assert.equal(capturedBody.search_enabled, false);
  } finally {
    globalThis.fetch = original;
  }
});

// ─── Thinking enabled via body ───────────────────────────────────────────

test("execute: thinking_enabled from body overrides model mapping", async () => {
  const original = globalThis.fetch;
  let capturedBody = null;
  let capturedHeaders = null;
  globalThis.fetch = async (url, opts) => {
    if (url.includes("/users/current"))
      return new Response(JSON.stringify({ code: 0, data: { biz_data: { token: "t" } } }), {
        headers: { "Content-Type": "application/json" },
      });
    if (url.includes("/chat_session/create"))
      return new Response(
        JSON.stringify({ code: 0, data: { biz_data: { chat_session: { id: "s1" } } } }),
        { headers: { "Content-Type": "application/json" } }
      );
    if (url.includes("/create_pow_challenge"))
      return new Response(
        JSON.stringify({
          code: 0,
          data: {
            biz_data: {
              challenge: {
                algorithm: "DeepSeekHashV1",
                challenge: "705e5d630f02d09a8179c6a0fcb0caf7265f08fb206fadca0301224f4422fc64",
                salt: "bb",
                signature: "s",
                difficulty: 1000,
                expire_at: 1778891543095,
                expire_after: 300000,
                target_path: "/api/v0/chat/completion",
              },
            },
          },
        }),
        { headers: { "Content-Type": "application/json" } }
      );
    if (url.includes("/chat/completion")) {
      capturedBody = JSON.parse(opts.body);
      capturedHeaders = opts.headers;
      return new Response(new TextEncoder().encode("data: [DONE]\n\n"), {
        headers: { "Content-Type": "text/event-stream" },
      });
    }
    return new Response("", { status: 404 });
  };
  try {
    await new DeepSeekWebExecutor().execute({
      model: "default", // not r1/expert
      body: { messages: [{ role: "user", content: "think" }], thinking_enabled: true },
      stream: true,
      credentials: { cookies: "ds_session_id=x" },
      signal: AbortSignal.timeout(10000),
    });
    assert.equal(capturedBody.thinking_enabled, true);
    assert.equal(capturedHeaders["x-thinking-enabled"], "1");
  } finally {
    globalThis.fetch = original;
  }
});

// ─── File IDs ────────────────────────────────────────────────────────────

test("execute: passes ref_file_ids from body", async () => {
  const original = globalThis.fetch;
  let capturedBody = null;
  globalThis.fetch = async (url, opts) => {
    if (url.includes("/users/current"))
      return new Response(JSON.stringify({ code: 0, data: { biz_data: { token: "t" } } }), {
        headers: { "Content-Type": "application/json" },
      });
    if (url.includes("/chat_session/create"))
      return new Response(
        JSON.stringify({ code: 0, data: { biz_data: { chat_session: { id: "s1" } } } }),
        { headers: { "Content-Type": "application/json" } }
      );
    if (url.includes("/create_pow_challenge"))
      return new Response(
        JSON.stringify({
          code: 0,
          data: {
            biz_data: {
              challenge: {
                algorithm: "DeepSeekHashV1",
                challenge: "705e5d630f02d09a8179c6a0fcb0caf7265f08fb206fadca0301224f4422fc64",
                salt: "bb",
                signature: "s",
                difficulty: 1000,
                expire_at: 1778891543095,
                expire_after: 300000,
                target_path: "/api/v0/chat/completion",
              },
            },
          },
        }),
        { headers: { "Content-Type": "application/json" } }
      );
    if (url.includes("/chat/completion")) {
      capturedBody = JSON.parse(opts.body);
      return new Response(new TextEncoder().encode("data: [DONE]\n\n"), {
        headers: { "Content-Type": "text/event-stream" },
      });
    }
    return new Response("", { status: 404 });
  };
  try {
    await new DeepSeekWebExecutor().execute({
      model: "default",
      body: {
        messages: [{ role: "user", content: "analyze this" }],
        ref_file_ids: ["file-abc-123", "file-def-456"],
      },
      stream: true,
      credentials: { cookies: "ds_session_id=x" },
      signal: AbortSignal.timeout(10000),
    });
    assert.deepEqual(capturedBody.ref_file_ids, ["file-abc-123", "file-def-456"]);
  } finally {
    globalThis.fetch = original;
  }
});

// ─── Expert model ────────────────────────────────────────────────────────

test("execute: maps expert model with thinking", async () => {
  const original = globalThis.fetch;
  let capturedBody = null;
  globalThis.fetch = async (url, opts) => {
    if (url.includes("/users/current"))
      return new Response(JSON.stringify({ code: 0, data: { biz_data: { token: "t" } } }), {
        headers: { "Content-Type": "application/json" },
      });
    if (url.includes("/chat_session/create"))
      return new Response(
        JSON.stringify({ code: 0, data: { biz_data: { chat_session: { id: "s1" } } } }),
        { headers: { "Content-Type": "application/json" } }
      );
    if (url.includes("/create_pow_challenge"))
      return new Response(
        JSON.stringify({
          code: 0,
          data: {
            biz_data: {
              challenge: {
                algorithm: "DeepSeekHashV1",
                challenge: "705e5d630f02d09a8179c6a0fcb0caf7265f08fb206fadca0301224f4422fc64",
                salt: "bb",
                signature: "s",
                difficulty: 1000,
                expire_at: 1778891543095,
                expire_after: 300000,
                target_path: "/api/v0/chat/completion",
              },
            },
          },
        }),
        { headers: { "Content-Type": "application/json" } }
      );
    if (url.includes("/chat/completion")) {
      capturedBody = JSON.parse(opts.body);
      return new Response(new TextEncoder().encode("data: [DONE]\n\n"), {
        headers: { "Content-Type": "text/event-stream" },
      });
    }
    return new Response("", { status: 404 });
  };
  try {
    await new DeepSeekWebExecutor().execute({
      model: "expert",
      body: { messages: [{ role: "user", content: "deep think" }] },
      stream: true,
      credentials: { cookies: "ds_session_id=x" },
      signal: AbortSignal.timeout(10000),
    });
    assert.equal(capturedBody.model_type, "expert");
    assert.equal(capturedBody.thinking_enabled, true);
  } finally {
    globalThis.fetch = original;
  }
});
