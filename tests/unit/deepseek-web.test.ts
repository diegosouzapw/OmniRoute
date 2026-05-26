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

test("execute returns 400 without apiKey (userToken)", async () => {
  const executor = new DeepSeekWebExecutor();
  const result = await executor.execute({
    model: "default",
    body: { messages: [{ role: "user", content: "hi" }] },
    stream: true,
    credentials: {},
    signal: AbortSignal.timeout(5000),
  });
  assert.equal(result.response.status, 400);
  const text = await result.response.text();
  assert.ok(text.includes("userToken"));
});

test("execute returns 400 with empty apiKey", async () => {
  const executor = new DeepSeekWebExecutor();
  const result = await executor.execute({
    model: "default",
    body: { messages: [{ role: "user", content: "hi" }] },
    stream: true,
    credentials: { apiKey: "" },
    signal: AbortSignal.timeout(5000),
  });
  assert.equal(result.response.status, 400);
});

// ─── Test connection ─────────────────────────────────────────────────────

test("testConnection returns false with empty credentials", async () => {
  const executor = new DeepSeekWebExecutor();
  assert.equal(await executor.testConnection({}), false);
});

test("testConnection returns false without apiKey", async () => {
  const executor = new DeepSeekWebExecutor();
  assert.equal(await executor.testConnection({ apiKey: "" }), false);
});

// ─── API flow (mocked) ──────────────────────────────────────────────────

async function mockDeepSeekFlow() {
  const original = globalThis.fetch;
  const calls = [];

  globalThis.fetch = async (url, opts) => {
    const urlStr = typeof url === "string" ? url : url.toString();
    calls.push({ url: urlStr, method: opts?.method, body: opts?.body, headers: opts?.headers });

    if (urlStr.includes("/users/current")) {
      return new Response(
        JSON.stringify({
          code: 0,
          data: { biz_data: { token: "test-access-token-123", email: "test@test.com" } },
        }),
        { status: 200, headers: { "Content-Type": "application/json" } }
      );
    }

    if (urlStr.includes("/chat_session/create")) {
      return new Response(
        JSON.stringify({
          code: 0,
          data: { biz_data: { chat_session: { id: "session-abc-123" } } },
        }),
        { status: 200, headers: { "Content-Type": "application/json" } }
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

    if (urlStr.includes("/chat_session/delete")) {
      return new Response(JSON.stringify({ code: 0 }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    }

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

  // Clear token/session caches between tests
  const dsMod = await import("../../open-sse/executors/deepseek-web.ts");
  if (dsMod.tokenCache) dsMod.tokenCache.clear();
  if (dsMod.sessionCache) dsMod.sessionCache.clear();

  return {
    calls,
    restore: () => {
      globalThis.fetch = original;
      if (dsMod.tokenCache) dsMod.tokenCache.clear();
      if (dsMod.sessionCache) dsMod.sessionCache.clear();
    },
  };
}

test("execute: full flow with mocked API (streaming)", async () => {
  const mock = await mockDeepSeekFlow();
  try {
    const executor = new DeepSeekWebExecutor();
    const result = await executor.execute({
      model: "default",
      body: { messages: [{ role: "user", content: "Say hello" }] },
      stream: true,
      credentials: { apiKey: "test-user-token-1234" },
      signal: AbortSignal.timeout(10000),
    });

    assert.ok(result.response.ok);
    assert.equal(result.response.headers.get("content-type"), "text/event-stream");

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

    // Verify /users/current used Bearer auth (userToken)
    const usersCall = mock.calls.find((c) => c.url.includes("/users/current"));
    assert.ok(
      usersCall.headers?.Authorization === "Bearer test-user-token-1234",
      "Should use userToken as Bearer for /users/current"
    );

    // Verify completion used the access token (not the userToken)
    const compCall = mock.calls.find((c) => c.url.includes("/chat/completion"));
    assert.ok(
      compCall.headers?.Authorization === "Bearer test-access-token-123",
      "Should use access token for /completion"
    );
    const body = JSON.parse(compCall.body);
    assert.equal(body.chat_session_id, "session-abc-123");
    assert.ok(body.prompt.includes("Say hello"), "Prompt should contain user message");
  } finally {
    mock.restore();
  }
});

test("execute: full flow with mocked API (non-streaming)", async () => {
  const mock = await mockDeepSeekFlow();
  try {
    const executor = new DeepSeekWebExecutor();
    const result = await executor.execute({
      model: "default",
      body: { messages: [{ role: "user", content: "hi" }] },
      stream: false,
      credentials: { apiKey: "test-user-token-ns" },
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
  const mock = await mockDeepSeekFlow();
  try {
    const executor = new DeepSeekWebExecutor();
    await executor.execute({
      model: "default",
      body: { messages: [{ role: "user", content: "hi" }] },
      stream: true,
      credentials: { apiKey: "test-user-token-pow" },
      signal: AbortSignal.timeout(10000),
    });

    const compCall = mock.calls.find((c) => c.url.includes("/chat/completion"));
    assert.ok(
      compCall.headers["Authorization"]?.startsWith("Bearer test-access-token"),
      "Has Bearer token"
    );
    assert.ok(compCall.headers["X-Ds-Pow-Response"], "Has PoW header");
    assert.ok(compCall.headers["X-App-Version"], "Has X-App-Version");
    assert.ok(compCall.headers["X-Client-Platform"] === "web", "Has X-Client-Platform");
  } finally {
    mock.restore();
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
  const dsMod1 = await import("../../open-sse/executors/deepseek-web.ts");
  if (dsMod1.tokenCache) dsMod1.tokenCache.clear();
  try {
    const executor = new DeepSeekWebExecutor();
    const result = await executor.execute({
      model: "default",
      body: { messages: [{ role: "user", content: "hi" }] },
      stream: true,
      credentials: { apiKey: "test-bad-token" },
      signal: AbortSignal.timeout(10000),
    });
    assert.ok(result.response.status >= 400, "Should return error status");
  } finally {
    globalThis.fetch = original;
    if (dsMod1.tokenCache) dsMod1.tokenCache.clear();
  }
});

test("execute: handles 401 from DeepSeek", async () => {
  const original = globalThis.fetch;
  const dsMod2 = await import("../../open-sse/executors/deepseek-web.ts");
  if (dsMod2.tokenCache) dsMod2.tokenCache.clear();
  if (dsMod2.sessionCache) dsMod2.sessionCache.clear();
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
      credentials: { apiKey: "test-expired-token" },
      signal: AbortSignal.timeout(10000),
    });
    assert.equal(result.response.status, 401);
  } finally {
    globalThis.fetch = original;
    if (dsMod2.tokenCache) dsMod2.tokenCache.clear();
    if (dsMod2.sessionCache) dsMod2.sessionCache.clear();
  }
});

test("execute: handles DeepSeek JSON error (40003 INVALID_TOKEN)", async () => {
  const original = globalThis.fetch;
  const dsMod3 = await import("../../open-sse/executors/deepseek-web.ts");
  if (dsMod3.tokenCache) dsMod3.tokenCache.clear();
  if (dsMod3.sessionCache) dsMod3.sessionCache.clear();
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
      credentials: { apiKey: "test-invalid-token" },
      signal: AbortSignal.timeout(10000),
    });
    assert.equal(result.response.status, 401);
    const text = await result.response.text();
    assert.ok(text.includes("40003"));
  } finally {
    globalThis.fetch = original;
    if (dsMod3.tokenCache) dsMod3.tokenCache.clear();
    if (dsMod3.sessionCache) dsMod3.sessionCache.clear();
  }
});

// ─── Model mapping ───────────────────────────────────────────────────────

test("execute: maps model to deepseek_r1 with thinking", async () => {
  const mock = await mockDeepSeekFlow();
  try {
    let capturedBody = null;
    const origFetch = globalThis.fetch;
    globalThis.fetch = async (url, opts) => {
      const resp = await origFetch(url, opts);
      if (url.toString().includes("/chat/completion")) {
        capturedBody = JSON.parse(opts.body);
      }
      return resp;
    };

    await new DeepSeekWebExecutor().execute({
      model: "deepseek-r1",
      body: { messages: [{ role: "user", content: "think" }] },
      stream: true,
      credentials: { apiKey: "test-user-token-r1" },
      signal: AbortSignal.timeout(10000),
    });
    assert.equal(capturedBody.model_type, "default");
    assert.equal(capturedBody.thinking_enabled, true);
  } finally {
    mock.restore();
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
  const dsMod4 = await import("../../open-sse/executors/deepseek-web.ts");
  if (dsMod4.tokenCache) dsMod4.tokenCache.clear();
  const executor = new DeepSeekWebExecutor();
  const controller = new AbortController();
  controller.abort();
  const result = await executor.execute({
    model: "default",
    body: { messages: [{ role: "user", content: "hi" }] },
    stream: true,
    credentials: { apiKey: "test-token-abort" },
    signal: controller.signal,
  });
  assert.ok(result.response, "Should return response");
  assert.ok(
    result.response.status >= 400 || result.response.status === 499,
    "Should indicate error or abort"
  );
});

// ─── Search enabled ──────────────────────────────────────────────────────

test("execute: passes search_enabled from body", async () => {
  const mock = await mockDeepSeekFlow();
  try {
    let capturedBody = null;
    const origFetch = globalThis.fetch;
    globalThis.fetch = async (url, opts) => {
      const resp = await origFetch(url, opts);
      if (url.toString().includes("/chat/completion")) {
        capturedBody = JSON.parse(opts.body);
      }
      return resp;
    };

    await new DeepSeekWebExecutor().execute({
      model: "default",
      body: { messages: [{ role: "user", content: "hi" }], search_enabled: true },
      stream: true,
      credentials: { apiKey: "test-token-search" },
      signal: AbortSignal.timeout(10000),
    });
    assert.equal(capturedBody.search_enabled, true);
  } finally {
    mock.restore();
  }
});

test("execute: search_enabled defaults to false", async () => {
  const mock = await mockDeepSeekFlow();
  try {
    let capturedBody = null;
    const origFetch = globalThis.fetch;
    globalThis.fetch = async (url, opts) => {
      const resp = await origFetch(url, opts);
      if (url.toString().includes("/chat/completion")) {
        capturedBody = JSON.parse(opts.body);
      }
      return resp;
    };

    await new DeepSeekWebExecutor().execute({
      model: "default",
      body: { messages: [{ role: "user", content: "hi" }] },
      stream: true,
      credentials: { apiKey: "test-token-nosearch" },
      signal: AbortSignal.timeout(10000),
    });
    assert.equal(capturedBody.search_enabled, false);
  } finally {
    mock.restore();
  }
});

// ─── Thinking enabled via body ───────────────────────────────────────────

test("execute: thinking_enabled from body overrides model mapping", async () => {
  const mock = await mockDeepSeekFlow();
  try {
    let capturedBody = null;
    const origFetch = globalThis.fetch;
    globalThis.fetch = async (url, opts) => {
      const resp = await origFetch(url, opts);
      if (url.toString().includes("/chat/completion")) {
        capturedBody = JSON.parse(opts.body);
      }
      return resp;
    };

    await new DeepSeekWebExecutor().execute({
      model: "default",
      body: { messages: [{ role: "user", content: "think" }], thinking_enabled: true },
      stream: true,
      credentials: { apiKey: "test-token-think" },
      signal: AbortSignal.timeout(10000),
    });
    assert.equal(capturedBody.thinking_enabled, true);
  } finally {
    mock.restore();
  }
});

// ─── File IDs ────────────────────────────────────────────────────────────

test("execute: passes ref_file_ids from body", async () => {
  const mock = await mockDeepSeekFlow();
  try {
    let capturedBody = null;
    const origFetch = globalThis.fetch;
    globalThis.fetch = async (url, opts) => {
      const resp = await origFetch(url, opts);
      if (url.toString().includes("/chat/completion")) {
        capturedBody = JSON.parse(opts.body);
      }
      return resp;
    };

    await new DeepSeekWebExecutor().execute({
      model: "default",
      body: {
        messages: [{ role: "user", content: "analyze this" }],
        ref_file_ids: ["file-abc-123", "file-def-456"],
      },
      stream: true,
      credentials: { apiKey: "test-token-files" },
      signal: AbortSignal.timeout(10000),
    });
    assert.deepEqual(capturedBody.ref_file_ids, ["file-abc-123", "file-def-456"]);
  } finally {
    mock.restore();
  }
});

// ─── Expert model ────────────────────────────────────────────────────────

test("execute: maps expert model with thinking", async () => {
  const mock = await mockDeepSeekFlow();
  try {
    let capturedBody = null;
    const origFetch = globalThis.fetch;
    globalThis.fetch = async (url, opts) => {
      const resp = await origFetch(url, opts);
      if (url.toString().includes("/chat/completion")) {
        capturedBody = JSON.parse(opts.body);
      }
      return resp;
    };

    await new DeepSeekWebExecutor().execute({
      model: "expert",
      body: { messages: [{ role: "user", content: "deep think" }] },
      stream: true,
      credentials: { apiKey: "test-token-expert" },
      signal: AbortSignal.timeout(10000),
    });
    assert.equal(capturedBody.model_type, "expert");
    assert.equal(capturedBody.thinking_enabled, false);
  } finally {
    mock.restore();
  }
});

// ─── JSON-wrapped userToken ──────────────────────────────────────────────

test("execute: handles JSON-wrapped userToken", async () => {
  const mock = await mockDeepSeekFlow();
  try {
    const executor = new DeepSeekWebExecutor();
    const result = await executor.execute({
      model: "default",
      body: { messages: [{ role: "user", content: "hi" }] },
      stream: true,
      credentials: { apiKey: JSON.stringify({ value: "test-json-wrapped-token" }) },
      signal: AbortSignal.timeout(10000),
    });

    assert.ok(result.response.ok, "Should succeed with JSON-wrapped token");

    const usersCall = mock.calls.find((c) => c.url.includes("/users/current"));
    assert.ok(
      usersCall.headers?.Authorization === "Bearer test-json-wrapped-token",
      "Should unwrap JSON and use inner value"
    );
  } finally {
    mock.restore();
  }
});

// ─── Session management ──────────────────────────────────────────────────

test("execute: always creates a new session per request (no caching)", async () => {
  const mock = await mockDeepSeekFlow();
  try {
    const executor = new DeepSeekWebExecutor();
    await executor.execute({
      model: "deepseek-v4-flash",
      body: { messages: [{ role: "user", content: "first" }] },
      stream: true,
      credentials: { apiKey: "test-session-fresh-key" },
      signal: AbortSignal.timeout(10000),
    });
    await executor.execute({
      model: "deepseek-v4-flash",
      body: { messages: [{ role: "user", content: "second" }] },
      stream: true,
      credentials: { apiKey: "test-session-fresh-key" },
      signal: AbortSignal.timeout(10000),
    });
    const sessionCalls = mock.calls.filter((c) => c.url.includes("/chat_session/create"));
    assert.equal(sessionCalls.length, 2, "Should create a fresh session for every request");
  } finally {
    mock.restore();
  }
});

test("execute: always deletes session after non-streaming response", async () => {
  const mock = await mockDeepSeekFlow();
  try {
    const executor = new DeepSeekWebExecutor();
    const result = await executor.execute({
      model: "deepseek-v4-flash",
      body: { messages: [{ role: "user", content: "hi" }] },
      stream: false,
      credentials: { apiKey: "test-delete-always-key" },
      signal: AbortSignal.timeout(10000),
    });
    assert.ok(result.response.ok, "Should succeed");
    await new Promise((r) => setTimeout(r, 100));
    const deleteCalls = mock.calls.filter((c) => c.url.includes("/chat_session/delete"));
    assert.equal(deleteCalls.length, 1, "Should always delete session after response");
  } finally {
    mock.restore();
  }
});

test("execute: always deletes session after streaming response completes", async () => {
  const mock = await mockDeepSeekFlow();
  try {
    const executor = new DeepSeekWebExecutor();
    const result = await executor.execute({
      model: "deepseek-v4-flash",
      body: { messages: [{ role: "user", content: "hi" }] },
      stream: true,
      credentials: { apiKey: "test-delete-stream-key" },
      signal: AbortSignal.timeout(10000),
    });
    assert.ok(result.response.ok, "Should succeed");
    await result.response.text();
    await new Promise((r) => setTimeout(r, 100));
    const deleteCalls = mock.calls.filter((c) => c.url.includes("/chat_session/delete"));
    assert.equal(deleteCalls.length, 1, "Should delete session after stream ends");
  } finally {
    mock.restore();
  }
});

// ─── Thinking content separation ─────────────────────────────────────────

test("execute: THINK fragments emit as reasoning_content, not content", async () => {
  const dsMod = await import("../../open-sse/executors/deepseek-web.ts");
  if (dsMod.tokenCache) dsMod.tokenCache.clear();

  const original = globalThis.fetch;
  globalThis.fetch = async (url, opts) => {
    const urlStr = typeof url === "string" ? url : url.toString();
    if (urlStr.includes("/users/current")) {
      return new Response(JSON.stringify({ code: 0, data: { biz_data: { token: "tok-think" } } }), {
        headers: { "Content-Type": "application/json" },
      });
    }
    if (urlStr.includes("/chat_session/create")) {
      return new Response(
        JSON.stringify({ code: 0, data: { biz_data: { chat_session: { id: "s-think" } } } }),
        { headers: { "Content-Type": "application/json" } }
      );
    }
    if (urlStr.includes("/chat_session/delete")) {
      return new Response(JSON.stringify({ code: 0 }), {
        headers: { "Content-Type": "application/json" },
      });
    }
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
        { headers: { "Content-Type": "application/json" } }
      );
    }
    if (urlStr.includes("/chat/completion")) {
      const enc = new TextEncoder();
      const sse = [
        'data: {"v":{"response":{"thinking_enabled":true,"fragments":[{"id":2,"type":"THINK","content":""}]}}}\n',
        "\n",
        'data: {"p":"response/fragments/-1/content","o":"APPEND","v":"I am thinking..."}\n',
        "\n",
        'data: {"p":"response/fragments","o":"APPEND","v":{"id":3,"type":"RESPONSE","content":""}}\n',
        "\n",
        'data: {"p":"response/fragments/-1/content","v":"Here is the answer."}\n',
        "\n",
        'data: {"p":"response/status","o":"SET","v":"FINISHED"}\n',
        "\n",
      ].join("");
      return new Response(enc.encode(sse), {
        status: 200,
        headers: { "Content-Type": "text/event-stream" },
      });
    }
    return new Response("", { status: 404 });
  };
  try {
    const executor = new DeepSeekWebExecutor();
    const result = await executor.execute({
      model: "deepseek-r1",
      body: { messages: [{ role: "user", content: "think about this" }] },
      stream: true,
      credentials: { apiKey: "test-think-key" },
      signal: AbortSignal.timeout(10000),
    });
    assert.ok(result.response.ok);
    const text = await result.response.text();
    assert.ok(
      text.includes('"reasoning_content":"I am thinking..."'),
      "Thinking should be reasoning_content"
    );
    assert.ok(text.includes('"content":"Here is the answer."'), "Response should be content");
    assert.ok(
      !text.includes('"content":"I am thinking..."'),
      "Thinking should NOT be in content field"
    );
  } finally {
    globalThis.fetch = original;
    if (dsMod.tokenCache) dsMod.tokenCache.clear();
  }
});

test("execute: search model converts citation tags and appends search results", async () => {
  const dsMod = await import("../../open-sse/executors/deepseek-web.ts");
  if (dsMod.tokenCache) dsMod.tokenCache.clear();

  const original = globalThis.fetch;
  globalThis.fetch = async (url) => {
    const urlStr = typeof url === "string" ? url : url.toString();
    if (urlStr.includes("/users/current")) {
      return new Response(
        JSON.stringify({ code: 0, data: { biz_data: { token: "tok-search" } } }),
        { headers: { "Content-Type": "application/json" } }
      );
    }
    if (urlStr.includes("/chat_session/create")) {
      return new Response(
        JSON.stringify({ code: 0, data: { biz_data: { chat_session: { id: "s-search" } } } }),
        { headers: { "Content-Type": "application/json" } }
      );
    }
    if (urlStr.includes("/chat_session/delete")) {
      return new Response(JSON.stringify({ code: 0 }), {
        headers: { "Content-Type": "application/json" },
      });
    }
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
        { headers: { "Content-Type": "application/json" } }
      );
    }
    if (urlStr.includes("/chat/completion")) {
      const enc = new TextEncoder();
      const sse = [
        'data: {"v":{"response":{"fragments":[{"id":1,"type":"RESPONSE","content":""}]}}}\n',
        "\n",
        'data: {"p":"response/fragments/-1/content","v":"Today is Monday [citation:10]."}\n',
        "\n",
        'data: {"p":"response/status","o":"SET","v":"FINISHED"}\n',
        "\n",
        'data: {"p":"response/search_results","v":[{"title":"Example","url":"https://example.com","cite_index":10}]}\n',
        "\n",
      ].join("");
      return new Response(enc.encode(sse), {
        status: 200,
        headers: { "Content-Type": "text/event-stream" },
      });
    }
    return new Response("", { status: 404 });
  };
  try {
    const executor = new DeepSeekWebExecutor();
    const result = await executor.execute({
      model: "deepseek-v4-flash-search",
      body: { messages: [{ role: "user", content: "what day is it" }] },
      stream: true,
      credentials: { apiKey: "test-search-key" },
      signal: AbortSignal.timeout(10000),
    });
    assert.ok(result.response.ok);
    const text = await result.response.text();
    assert.ok(
      text.includes('"model":"deepseek-v4-flash-search"'),
      "Should preserve client model id"
    );
    assert.ok(text.includes("Today is Monday [10]."), "Should convert citation tags");
    assert.ok(
      text.includes("[10]: [Example](https://example.com)"),
      "Should append search citations"
    );
    assert.ok(!text.includes("[citation:10]"), "Should not leak raw citation tags");
  } finally {
    globalThis.fetch = original;
    if (dsMod.tokenCache) dsMod.tokenCache.clear();
  }
});
