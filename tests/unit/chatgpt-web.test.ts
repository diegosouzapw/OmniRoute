import test from "node:test";
import assert from "node:assert/strict";

const { ChatGptWebExecutor, __resetChatGptWebCachesForTesting } =
  await import("../../open-sse/executors/chatgpt-web.ts");
const { getExecutor, hasSpecializedExecutor } = await import("../../open-sse/executors/index.ts");
const { __setTlsFetchOverrideForTesting, looksLikeSse, TlsClientUnavailableError } =
  await import("../../open-sse/services/chatgptTlsClient.ts");

// ─── Helpers ────────────────────────────────────────────────────────────────

function mockChatGptStreamText(events) {
  const chunks = [];
  for (const evt of events) {
    chunks.push(`data: ${JSON.stringify(evt)}\r\n\r\n`);
  }
  chunks.push("data: [DONE]\r\n\r\n");
  return chunks.join("");
}

function makeHeaders(map = {}) {
  const h = new Headers();
  for (const [k, v] of Object.entries(map)) h.set(k, String(v));
  return h;
}

/** Dispatch the TLS-impersonating fetch by URL pathname.
 *  Default: session 200 with accessToken, sentinel 200 no PoW, conv 200 empty stream. */
function installMockFetch({ session, sentinel, conv, dpl, onSession, onSentinel, onConv } = {}) {
  const calls = {
    session: 0,
    dpl: 0,
    sentinel: 0,
    conv: 0,
    urls: [],
    headers: [],
    bodies: [],
  };

  __setTlsFetchOverrideForTesting(async (url, opts = {}) => {
    const u = String(url);
    calls.urls.push(u);
    calls.headers.push(opts.headers || {});
    calls.bodies.push(opts.body);

    // DPL warmup — GET https://chatgpt.com/ (root). Match before /api/auth/session.
    if (
      (u === "https://chatgpt.com/" || u === "https://chatgpt.com") &&
      (opts.method || "GET") === "GET"
    ) {
      calls.dpl++;
      const cfg = dpl ?? {
        status: 200,
        body: '<html data-build="prod-test123"><script src="https://cdn.oaistatic.com/_next/static/chunks/main-test.js"></script></html>',
      };
      return {
        status: cfg.status,
        headers: makeHeaders({ "Content-Type": "text/html" }),
        text: cfg.body,
        body: null,
      };
    }

    if (u.includes("/api/auth/session")) {
      calls.session++;
      if (onSession) onSession(opts);
      const cfg = session ?? {
        status: 200,
        body: {
          accessToken: "jwt-abc",
          expires: new Date(Date.now() + 3600_000).toISOString(),
          user: { id: "user-1" },
        },
      };
      const headers = makeHeaders({ "Content-Type": "application/json" });
      if (cfg.setCookie) headers.set("set-cookie", cfg.setCookie);
      return {
        status: cfg.status,
        headers,
        text: typeof cfg.body === "string" ? cfg.body : JSON.stringify(cfg.body || {}),
        body: null,
      };
    }

    if (u.includes("/sentinel/chat-requirements")) {
      calls.sentinel++;
      if (onSentinel) onSentinel(opts);
      const cfg = sentinel ?? {
        status: 200,
        body: { token: "req-token", proofofwork: { required: false } },
      };
      return {
        status: cfg.status,
        headers: makeHeaders({ "Content-Type": "application/json" }),
        text: JSON.stringify(cfg.body || {}),
        body: null,
      };
    }

    // Match only the exact conversation endpoint, not /conversations (plural — warmup).
    if (
      u.endsWith("/backend-api/f/conversation") ||
      u.endsWith("/backend-api/conversation") ||
      /\/backend-api\/(f\/)?conversation\?/.test(u)
    ) {
      calls.conv++;
      if (onConv) onConv(opts);
      const cfg = conv ?? {
        status: 200,
        events: [
          {
            conversation_id: "conv-1",
            message: {
              id: "msg-1",
              author: { role: "assistant" },
              content: { content_type: "text", parts: ["Hello, world!"] },
              status: "in_progress",
            },
          },
          {
            conversation_id: "conv-1",
            message: {
              id: "msg-1",
              author: { role: "assistant" },
              content: { content_type: "text", parts: ["Hello, world!"] },
              status: "finished_successfully",
            },
          },
        ],
      };
      if (cfg.error) {
        return {
          status: cfg.status,
          headers: makeHeaders({ "Content-Type": "application/json" }),
          text: JSON.stringify({ detail: cfg.error }),
          body: null,
        };
      }
      return {
        status: cfg.status,
        headers: makeHeaders({ "Content-Type": "text/event-stream" }),
        text: mockChatGptStreamText(cfg.events || []),
        body: null,
      };
    }

    return {
      status: 404,
      headers: makeHeaders(),
      text: "not mocked",
      body: null,
    };
  });

  return {
    calls,
    restore() {
      __setTlsFetchOverrideForTesting(null);
    },
  };
}

function reset() {
  __resetChatGptWebCachesForTesting();
}

// ─── Registration ───────────────────────────────────────────────────────────

test("ChatGptWebExecutor is registered in executor index", () => {
  assert.ok(hasSpecializedExecutor("chatgpt-web"));
  assert.ok(hasSpecializedExecutor("cgpt-web"));
  const executor = getExecutor("chatgpt-web");
  assert.ok(executor instanceof ChatGptWebExecutor);
});

test("ChatGptWebExecutor alias resolves to same type", () => {
  const a = getExecutor("chatgpt-web");
  const b = getExecutor("cgpt-web");
  assert.ok(a instanceof ChatGptWebExecutor);
  assert.ok(b instanceof ChatGptWebExecutor);
});

test("ChatGptWebExecutor sets correct provider name", () => {
  const executor = new ChatGptWebExecutor();
  assert.equal(executor.getProvider(), "chatgpt-web");
});

// ─── Token exchange path ────────────────────────────────────────────────────

test("Token exchange: cookie sent to /api/auth/session, accessToken used as Bearer on later calls", async () => {
  reset();
  const m = installMockFetch();
  try {
    const executor = new ChatGptWebExecutor();
    await executor.execute({
      model: "gpt-5.3-instant",
      body: { messages: [{ role: "user", content: "hi" }] },
      stream: false,
      credentials: { apiKey: "my-cookie-value" },
      signal: AbortSignal.timeout(10_000),
      log: null,
    });

    assert.equal(m.calls.session, 1);
    assert.equal(m.calls.sentinel, 1);
    assert.equal(m.calls.conv, 1);

    // Find headers by call type instead of by index — call order is
    // session → dpl → sentinel → conv but indices shift if any call is cached.
    const sessionIdx = m.calls.urls.findIndex((u) => u.includes("/api/auth/session"));
    const sentinelIdx = m.calls.urls.findIndex((u) => u.includes("/sentinel/chat-requirements"));
    const convIdx = m.calls.urls.findIndex((u) => u.includes("/backend-api/f/conversation"));

    const sessionHeaders = m.calls.headers[sessionIdx];
    assert.equal(sessionHeaders.Cookie, "__Secure-next-auth.session-token=my-cookie-value");

    const sentinelHeaders = m.calls.headers[sentinelIdx];
    assert.equal(sentinelHeaders.Authorization, "Bearer jwt-abc");
    assert.equal(sentinelHeaders["chatgpt-account-id"], "user-1");

    const convHeaders = m.calls.headers[convIdx];
    assert.equal(convHeaders.Authorization, "Bearer jwt-abc");
  } finally {
    m.restore();
  }
});

test("Token cache: two calls within TTL only hit /api/auth/session once", async () => {
  reset();
  const m = installMockFetch();
  try {
    const executor = new ChatGptWebExecutor();
    const opts = {
      model: "gpt-5.3-instant",
      body: { messages: [{ role: "user", content: "hi" }] },
      stream: false,
      credentials: { apiKey: "cookie-v1" },
      signal: AbortSignal.timeout(10_000),
      log: null,
    };
    await executor.execute(opts);
    await executor.execute(opts);

    assert.equal(m.calls.session, 1, "session exchange should only happen once");
    assert.equal(m.calls.conv, 2);
  } finally {
    m.restore();
  }
});

test("Refreshed cookie: surfaced via onCredentialsRefreshed callback", async () => {
  reset();
  const m = installMockFetch({
    session: {
      status: 200,
      body: {
        accessToken: "jwt-abc",
        expires: new Date(Date.now() + 3600_000).toISOString(),
        user: { id: "user-1" },
      },
      setCookie: "__Secure-next-auth.session-token=ROTATED-VALUE; Path=/; HttpOnly; Secure",
    },
  });
  try {
    let refreshed = null;
    const executor = new ChatGptWebExecutor();
    await executor.execute({
      model: "gpt-5.3-instant",
      body: { messages: [{ role: "user", content: "hi" }] },
      stream: false,
      credentials: { apiKey: "old-cookie" },
      signal: AbortSignal.timeout(10_000),
      log: null,
      onCredentialsRefreshed: (creds) => {
        refreshed = creds;
      },
    });

    assert.ok(refreshed, "callback should have fired");
    // Refreshed cookie is stored as a full cookie line so it round-trips through
    // buildSessionCookieHeader on the next request (works for chunked tokens too).
    assert.equal(refreshed.apiKey, "__Secure-next-auth.session-token=ROTATED-VALUE");
  } finally {
    m.restore();
  }
});

// ─── Sentinel + PoW ─────────────────────────────────────────────────────────

test("Sentinel: chat-requirements is hit before /backend-api/conversation", async () => {
  reset();
  const order = [];
  const m = installMockFetch({
    onSession: () => order.push("session"),
    onSentinel: () => order.push("sentinel"),
    onConv: () => order.push("conv"),
  });
  try {
    const executor = new ChatGptWebExecutor();
    await executor.execute({
      model: "gpt-5.3-instant",
      body: { messages: [{ role: "user", content: "hi" }] },
      stream: false,
      credentials: { apiKey: "test" },
      signal: AbortSignal.timeout(10_000),
      log: null,
    });
    assert.deepEqual(order, ["session", "sentinel", "conv"]);
  } finally {
    m.restore();
  }
});

test("Sentinel: chat-requirements token forwarded on conv request", async () => {
  reset();
  const m = installMockFetch({
    sentinel: { status: 200, body: { token: "REQ-TOKEN-XYZ", proofofwork: { required: false } } },
  });
  try {
    const executor = new ChatGptWebExecutor();
    await executor.execute({
      model: "gpt-5.3-instant",
      body: { messages: [{ role: "user", content: "hi" }] },
      stream: false,
      credentials: { apiKey: "test" },
      signal: AbortSignal.timeout(10_000),
      log: null,
    });
    const convIdx = m.calls.urls.findIndex((u) => u.endsWith("/backend-api/f/conversation"));
    const convHeaders = m.calls.headers[convIdx];
    assert.equal(convHeaders["openai-sentinel-chat-requirements-token"], "REQ-TOKEN-XYZ");
  } finally {
    m.restore();
  }
});

test("PoW: when required, proof token is sent with valid prefix", async () => {
  reset();
  const m = installMockFetch({
    sentinel: {
      status: 200,
      body: {
        token: "req-token",
        proofofwork: { required: true, seed: "deadbeef", difficulty: "00fff" },
      },
    },
  });
  try {
    const executor = new ChatGptWebExecutor();
    await executor.execute({
      model: "gpt-5.3-instant",
      body: { messages: [{ role: "user", content: "hi" }] },
      stream: false,
      credentials: { apiKey: "test" },
      signal: AbortSignal.timeout(15_000),
      log: null,
    });
    const convIdx = m.calls.urls.findIndex((u) => u.endsWith("/backend-api/f/conversation"));
    const convHeaders = m.calls.headers[convIdx];
    const proof = convHeaders["openai-sentinel-proof-token"];
    assert.ok(proof, "proof token should be present");
    assert.match(proof, /^[gw]AAAAAB/);
  } finally {
    m.restore();
  }
});

test("Turnstile: required flag does NOT block — conv endpoint accepts requests", async () => {
  // ChatGPT's Sentinel often reports turnstile.required: true even on requests
  // the conversation endpoint will accept without a Turnstile token. We pass
  // through and let /f/conversation decide.
  reset();
  const m = installMockFetch({
    sentinel: {
      status: 200,
      body: {
        token: "x",
        turnstile: { required: true, dx: "challenge-data" },
        proofofwork: { required: false },
      },
    },
  });
  try {
    const executor = new ChatGptWebExecutor();
    const result = await executor.execute({
      model: "gpt-5.3-instant",
      body: { messages: [{ role: "user", content: "hi" }] },
      stream: false,
      credentials: { apiKey: "test" },
      signal: AbortSignal.timeout(10_000),
      log: null,
    });
    assert.equal(result.response.status, 200);
    assert.equal(m.calls.conv, 1, "should reach conversation endpoint despite turnstile.required");
  } finally {
    m.restore();
  }
});

// ─── Streaming / non-streaming ──────────────────────────────────────────────

test("Non-streaming: returns OpenAI chat.completion JSON", async () => {
  reset();
  const m = installMockFetch();
  try {
    const executor = new ChatGptWebExecutor();
    const result = await executor.execute({
      model: "gpt-5.3-instant",
      body: { messages: [{ role: "user", content: "hi" }] },
      stream: false,
      credentials: { apiKey: "test" },
      signal: AbortSignal.timeout(10_000),
      log: null,
    });

    assert.equal(result.response.status, 200);
    const json = await result.response.json();
    assert.equal(json.object, "chat.completion");
    assert.equal(json.choices[0].message.role, "assistant");
    assert.equal(json.choices[0].message.content, "Hello, world!");
    assert.equal(json.choices[0].finish_reason, "stop");
    assert.ok(json.id.startsWith("chatcmpl-cgpt-"));
    assert.ok(json.usage.total_tokens > 0);
  } finally {
    m.restore();
  }
});

test("Streaming: produces valid SSE chunks ending with [DONE]", async () => {
  reset();
  const m = installMockFetch({
    conv: {
      status: 200,
      events: [
        {
          conversation_id: "c1",
          message: {
            id: "m1",
            author: { role: "assistant" },
            content: { content_type: "text", parts: ["Hello "] },
            status: "in_progress",
          },
        },
        {
          conversation_id: "c1",
          message: {
            id: "m1",
            author: { role: "assistant" },
            content: { content_type: "text", parts: ["Hello world!"] },
            status: "finished_successfully",
          },
        },
      ],
    },
  });
  try {
    const executor = new ChatGptWebExecutor();
    const result = await executor.execute({
      model: "gpt-5.3-instant",
      body: { messages: [{ role: "user", content: "hi" }], stream: true },
      stream: true,
      credentials: { apiKey: "test" },
      signal: AbortSignal.timeout(10_000),
      log: null,
    });

    assert.equal(result.response.status, 200);
    assert.equal(result.response.headers.get("Content-Type"), "text/event-stream");

    const text = await result.response.text();
    const lines = text.split("\n").filter((l) => l.startsWith("data: "));
    assert.ok(lines.length >= 3);

    const first = JSON.parse(lines[0].slice(6));
    assert.equal(first.choices[0].delta.role, "assistant");

    const lastLine = text.trim().split("\n").filter(Boolean).pop();
    assert.equal(lastLine, "data: [DONE]");
  } finally {
    m.restore();
  }
});

test("Streaming: cumulative parts are diffed into non-overlapping deltas", async () => {
  reset();
  const m = installMockFetch({
    conv: {
      status: 200,
      events: [
        {
          conversation_id: "c1",
          message: {
            id: "m1",
            author: { role: "assistant" },
            content: { content_type: "text", parts: ["Foo"] },
            status: "in_progress",
          },
        },
        {
          conversation_id: "c1",
          message: {
            id: "m1",
            author: { role: "assistant" },
            content: { content_type: "text", parts: ["Foo bar"] },
            status: "in_progress",
          },
        },
        {
          conversation_id: "c1",
          message: {
            id: "m1",
            author: { role: "assistant" },
            content: { content_type: "text", parts: ["Foo bar baz"] },
            status: "finished_successfully",
          },
        },
      ],
    },
  });
  try {
    const executor = new ChatGptWebExecutor();
    const result = await executor.execute({
      model: "gpt-5.3-instant",
      body: { messages: [{ role: "user", content: "hi" }], stream: true },
      stream: true,
      credentials: { apiKey: "test" },
      signal: AbortSignal.timeout(10_000),
      log: null,
    });

    const text = await result.response.text();
    const contentDeltas = text
      .split("\n")
      .filter((l) => l.startsWith("data: ") && l !== "data: [DONE]")
      .map((l) => {
        try {
          return JSON.parse(l.slice(6));
        } catch {
          return null;
        }
      })
      .filter((j) => j?.choices?.[0]?.delta?.content)
      .map((j) => j.choices[0].delta.content);

    assert.deepEqual(contentDeltas, ["Foo", " bar", " baz"]);
  } finally {
    m.restore();
  }
});

// ─── Errors ─────────────────────────────────────────────────────────────────

test("Error: 401 on /api/auth/session returns 401 with re-paste hint", async () => {
  reset();
  const m = installMockFetch({ session: { status: 401, body: {} } });
  try {
    const executor = new ChatGptWebExecutor();
    const result = await executor.execute({
      model: "gpt-5.3-instant",
      body: { messages: [{ role: "user", content: "hi" }] },
      stream: false,
      credentials: { apiKey: "expired-cookie" },
      signal: AbortSignal.timeout(10_000),
      log: null,
    });
    assert.equal(result.response.status, 401);
    const json = await result.response.json();
    assert.match(json.error.message, /session-token/);
  } finally {
    m.restore();
  }
});

test("Error: 200 with no accessToken returns 401", async () => {
  reset();
  const m = installMockFetch({ session: { status: 200, body: {} } });
  try {
    const executor = new ChatGptWebExecutor();
    const result = await executor.execute({
      model: "gpt-5.3-instant",
      body: { messages: [{ role: "user", content: "hi" }] },
      stream: false,
      credentials: { apiKey: "stale-cookie" },
      signal: AbortSignal.timeout(10_000),
      log: null,
    });
    assert.equal(result.response.status, 401);
    assert.equal(m.calls.sentinel, 0, "should not reach sentinel");
  } finally {
    m.restore();
  }
});

test("Error: 403 from sentinel returns 403 SENTINEL_BLOCKED", async () => {
  reset();
  const m = installMockFetch({ sentinel: { status: 403, body: { detail: "blocked" } } });
  try {
    const executor = new ChatGptWebExecutor();
    const result = await executor.execute({
      model: "gpt-5.3-instant",
      body: { messages: [{ role: "user", content: "hi" }] },
      stream: false,
      credentials: { apiKey: "test" },
      signal: AbortSignal.timeout(10_000),
      log: null,
    });
    assert.equal(result.response.status, 403);
    const json = await result.response.json();
    assert.equal(json.error.code, "SENTINEL_BLOCKED");
    assert.equal(m.calls.conv, 0);
  } finally {
    m.restore();
  }
});

test("Error: 429 from conversation returns 429 with rate-limit message", async () => {
  reset();
  const m = installMockFetch({ conv: { status: 429, error: "rate" } });
  try {
    const executor = new ChatGptWebExecutor();
    const result = await executor.execute({
      model: "gpt-5.3-instant",
      body: { messages: [{ role: "user", content: "hi" }] },
      stream: false,
      credentials: { apiKey: "test" },
      signal: AbortSignal.timeout(10_000),
      log: null,
    });
    assert.equal(result.response.status, 429);
    const json = await result.response.json();
    assert.match(json.error.message, /rate limited/);
  } finally {
    m.restore();
  }
});

test("Error: empty messages returns 400 without any fetch", async () => {
  reset();
  const m = installMockFetch();
  try {
    const executor = new ChatGptWebExecutor();
    const result = await executor.execute({
      model: "gpt-5.3-instant",
      body: { messages: [] },
      stream: false,
      credentials: { apiKey: "test" },
      signal: AbortSignal.timeout(10_000),
      log: null,
    });
    assert.equal(result.response.status, 400);
    assert.equal(m.calls.session, 0);
  } finally {
    m.restore();
  }
});

test("Error: missing apiKey returns 401 without any fetch", async () => {
  reset();
  const m = installMockFetch();
  try {
    const executor = new ChatGptWebExecutor();
    const result = await executor.execute({
      model: "gpt-5.3-instant",
      body: { messages: [{ role: "user", content: "hi" }] },
      stream: false,
      credentials: {},
      signal: AbortSignal.timeout(10_000),
      log: null,
    });
    assert.equal(result.response.status, 401);
    assert.equal(m.calls.session, 0);
  } finally {
    m.restore();
  }
});

// ─── Cookie prefix stripping ────────────────────────────────────────────────

test("Cookie: bare value gets prepended with cookie name", async () => {
  reset();
  const m = installMockFetch();
  try {
    const executor = new ChatGptWebExecutor();
    await executor.execute({
      model: "gpt-5.3-instant",
      body: { messages: [{ role: "user", content: "hi" }] },
      stream: false,
      credentials: { apiKey: "rawValue" },
      signal: AbortSignal.timeout(10_000),
      log: null,
    });
    assert.equal(m.calls.headers[0].Cookie, "__Secure-next-auth.session-token=rawValue");
  } finally {
    m.restore();
  }
});

test("Cookie: unchunked cookie line is passed through verbatim", async () => {
  reset();
  const m = installMockFetch();
  try {
    const executor = new ChatGptWebExecutor();
    await executor.execute({
      model: "gpt-5.3-instant",
      body: { messages: [{ role: "user", content: "hi" }] },
      stream: false,
      credentials: { apiKey: "__Secure-next-auth.session-token=actualvalue" },
      signal: AbortSignal.timeout(10_000),
      log: null,
    });
    assert.equal(m.calls.headers[0].Cookie, "__Secure-next-auth.session-token=actualvalue");
  } finally {
    m.restore();
  }
});

test("Cookie: chunked .0/.1 cookies are passed through verbatim (NextAuth reassembles)", async () => {
  reset();
  const m = installMockFetch();
  try {
    const executor = new ChatGptWebExecutor();
    await executor.execute({
      model: "gpt-5.3-instant",
      body: { messages: [{ role: "user", content: "hi" }] },
      stream: false,
      credentials: {
        apiKey:
          "__Secure-next-auth.session-token.0=partA; __Secure-next-auth.session-token.1=partB",
      },
      signal: AbortSignal.timeout(10_000),
      log: null,
    });
    assert.equal(
      m.calls.headers[0].Cookie,
      "__Secure-next-auth.session-token.0=partA; __Secure-next-auth.session-token.1=partB"
    );
  } finally {
    m.restore();
  }
});

test("Cookie: 'Cookie: ' DevTools prefix is stripped", async () => {
  reset();
  const m = installMockFetch();
  try {
    const executor = new ChatGptWebExecutor();
    await executor.execute({
      model: "gpt-5.3-instant",
      body: { messages: [{ role: "user", content: "hi" }] },
      stream: false,
      credentials: {
        apiKey:
          "Cookie: __Secure-next-auth.session-token.0=A; __Secure-next-auth.session-token.1=B",
      },
      signal: AbortSignal.timeout(10_000),
      log: null,
    });
    assert.equal(
      m.calls.headers[0].Cookie,
      "__Secure-next-auth.session-token.0=A; __Secure-next-auth.session-token.1=B"
    );
  } finally {
    m.restore();
  }
});

// ─── Session continuity ─────────────────────────────────────────────────────

test("Session continuity: each call starts a fresh conversation (Temporary Chat mode)", async () => {
  // Conversation continuity is intentionally disabled because the executor
  // uses history_and_training_disabled: true (Temporary Chat), whose
  // conversation_ids expire quickly upstream and 404 on re-use. Each call
  // sends the full history with conversation_id: null.
  reset();
  const m = installMockFetch();
  try {
    const executor = new ChatGptWebExecutor();
    await executor.execute({
      model: "gpt-5.3-instant",
      body: { messages: [{ role: "user", content: "First question" }] },
      stream: false,
      credentials: { apiKey: "test" },
      signal: AbortSignal.timeout(10_000),
      log: null,
    });
    await executor.execute({
      model: "gpt-5.3-instant",
      body: {
        messages: [
          { role: "user", content: "First question" },
          { role: "assistant", content: "Hello, world!" },
          { role: "user", content: "Follow-up" },
        ],
      },
      stream: false,
      credentials: { apiKey: "test" },
      signal: AbortSignal.timeout(10_000),
      log: null,
    });

    assert.equal(m.calls.conv, 2);
    const convIndices = m.calls.urls
      .map((u, i) => (u.endsWith("/backend-api/f/conversation") ? i : -1))
      .filter((i) => i >= 0);
    assert.equal(convIndices.length, 2);
    const secondBody = JSON.parse(m.calls.bodies[convIndices[1]]);
    assert.equal(secondBody.conversation_id, null, "should start a fresh conversation");
    // History is folded into the system message (so the model doesn't try to
    // continue prior assistant turns); only the latest user message is sent.
    const userMessages = secondBody.messages.filter((m) => m.author?.role === "user");
    assert.equal(userMessages.length, 1, "only the latest user message is in the messages array");
    assert.equal(userMessages[0].content.parts[0], "Follow-up");
    const systemMsg = secondBody.messages.find((m) => m.author?.role === "system");
    assert.ok(systemMsg, "history should be packaged in a system message");
    assert.match(systemMsg.content.parts[0], /First question/);
    assert.match(systemMsg.content.parts[0], /Hello, world!/);
  } finally {
    m.restore();
  }
});

// ─── Request inspection ─────────────────────────────────────────────────────

test("Request: conversation POST has correct browser-like headers", async () => {
  reset();
  const m = installMockFetch();
  try {
    const executor = new ChatGptWebExecutor();
    await executor.execute({
      model: "gpt-5.3-instant",
      body: { messages: [{ role: "user", content: "hi" }] },
      stream: false,
      credentials: { apiKey: "test" },
      signal: AbortSignal.timeout(10_000),
      log: null,
    });

    const convIdx = m.calls.urls.findIndex((u) => u.endsWith("/backend-api/f/conversation"));
    assert.equal(m.calls.urls[convIdx], "https://chatgpt.com/backend-api/f/conversation");
    const convHeaders = m.calls.headers[convIdx];
    assert.match(convHeaders["User-Agent"], /Mozilla/);
    assert.equal(convHeaders["Origin"], "https://chatgpt.com");
    assert.equal(convHeaders["Sec-Fetch-Site"], "same-origin");
    assert.equal(convHeaders["Accept"], "text/event-stream");
  } finally {
    m.restore();
  }
});

test("Request: payload has correct ChatGPT shape", async () => {
  reset();
  const m = installMockFetch();
  try {
    const executor = new ChatGptWebExecutor();
    await executor.execute({
      model: "gpt-5.3-instant",
      body: {
        messages: [
          { role: "system", content: "Be concise" },
          { role: "user", content: "What is 2+2?" },
        ],
      },
      stream: false,
      credentials: { apiKey: "test" },
      signal: AbortSignal.timeout(10_000),
      log: null,
    });
    const convIdx = m.calls.urls.findIndex((u) => u.endsWith("/backend-api/f/conversation"));
    const body = JSON.parse(m.calls.bodies[convIdx]);
    assert.equal(body.action, "next");
    assert.equal(body.model, "gpt-5-3");
    assert.equal(body.history_and_training_disabled, true);
    // System message preserves the user-supplied system prompt; the user
    // message is the latest query.
    assert.equal(body.messages[0].author.role, "system");
    assert.match(body.messages[0].content.parts[0], /Be concise/);
    assert.equal(body.messages[body.messages.length - 1].author.role, "user");
    assert.equal(body.messages[body.messages.length - 1].content.parts[0], "What is 2+2?");
  } finally {
    m.restore();
  }
});

// ─── Provider registry ──────────────────────────────────────────────────────

test("Provider registry: chatgpt-web is registered with gpt-5.3-instant model", async () => {
  const { getRegistryEntry } = await import("../../open-sse/config/providerRegistry.ts");
  const entry = getRegistryEntry("chatgpt-web");
  assert.ok(entry, "chatgpt-web should be in the registry");
  assert.equal(entry.executor, "chatgpt-web");
  assert.equal(entry.format, "openai");
  assert.equal(entry.authHeader, "cookie");
  assert.ok(entry.models.find((m) => m.id === "gpt-5.3-instant"));
});

// ─── Cookie rotation preserves Cloudflare cookies ───────────────────────────

test("Cookie rotation: full DevTools blob keeps cf_clearance/__cf_bm/_cfuvid", async () => {
  // When the user pastes the recommended full DevTools Cookie line and
  // NextAuth rotates the session-token chunks, only those chunks should
  // change — the Cloudflare cookies must be preserved or every subsequent
  // request gets cf-mitigated: challenge.
  reset();
  const m = installMockFetch({
    session: {
      status: 200,
      body: {
        accessToken: "jwt-abc",
        expires: new Date(Date.now() + 3600_000).toISOString(),
        user: { id: "user-1" },
      },
      setCookie:
        "__Secure-next-auth.session-token.0=NEW0; Path=/; HttpOnly, " +
        "__Secure-next-auth.session-token.1=NEW1; Path=/; HttpOnly",
    },
  });
  try {
    let refreshed = null;
    const executor = new ChatGptWebExecutor();
    await executor.execute({
      model: "gpt-5.3-instant",
      body: { messages: [{ role: "user", content: "hi" }] },
      stream: false,
      credentials: {
        apiKey:
          "__Secure-next-auth.session-token.0=OLD0; " +
          "__Secure-next-auth.session-token.1=OLD1; " +
          "cf_clearance=CFCLEAR; __cf_bm=CFBM; _cfuvid=CFUV; _puid=PUID",
      },
      signal: AbortSignal.timeout(10_000),
      log: null,
      onCredentialsRefreshed: (creds) => {
        refreshed = creds;
      },
    });

    assert.ok(refreshed, "callback should fire on rotation");
    assert.match(refreshed.apiKey, /session-token\.0=NEW0/, "session-token.0 rotated");
    assert.match(refreshed.apiKey, /session-token\.1=NEW1/, "session-token.1 rotated");
    assert.match(refreshed.apiKey, /cf_clearance=CFCLEAR/, "cf_clearance preserved");
    assert.match(refreshed.apiKey, /__cf_bm=CFBM/, "__cf_bm preserved");
    assert.match(refreshed.apiKey, /_cfuvid=CFUV/, "_cfuvid preserved");
    assert.match(refreshed.apiKey, /_puid=PUID/, "_puid preserved");
    // Old session-token values must NOT survive in the merged blob.
    assert.doesNotMatch(refreshed.apiKey, /OLD0/);
    assert.doesNotMatch(refreshed.apiKey, /OLD1/);
  } finally {
    m.restore();
  }
});

test("Cookie rotation: returns null when Set-Cookie has no session-token", async () => {
  // When NextAuth doesn't rotate (Set-Cookie sets only unrelated cookies, or
  // returns the same session-token value), the callback shouldn't fire.
  reset();
  const m = installMockFetch({
    session: {
      status: 200,
      body: {
        accessToken: "jwt-abc",
        expires: new Date(Date.now() + 3600_000).toISOString(),
        user: { id: "user-1" },
      },
      setCookie: "some-other-cookie=value; Path=/",
    },
  });
  try {
    let refreshed = null;
    const executor = new ChatGptWebExecutor();
    await executor.execute({
      model: "gpt-5.3-instant",
      body: { messages: [{ role: "user", content: "hi" }] },
      stream: false,
      credentials: { apiKey: "cookie-v1" },
      signal: AbortSignal.timeout(10_000),
      log: null,
      onCredentialsRefreshed: (creds) => {
        refreshed = creds;
      },
    });
    assert.equal(refreshed, null, "no rotation should not fire callback");
  } finally {
    m.restore();
  }
});

// ─── Echo suppression in extractContent ─────────────────────────────────────

test("Stream parser: echoed prior assistant turn is suppressed (streaming)", async () => {
  // chatgpt.com sometimes echoes prior assistant turns at the start of the
  // stream with status: finished_successfully BEFORE the new generation
  // starts. The parser must not emit echoed bytes — otherwise the SSE
  // consumer sees old content prepended to the new answer.
  reset();
  const m = installMockFetch({
    conv: {
      status: 200,
      events: [
        // Echo of a prior assistant turn — full content, finished, never
        // transitions through in_progress.
        {
          conversation_id: "c1",
          message: {
            id: "echo-1",
            author: { role: "assistant" },
            content: { content_type: "text", parts: ["OLD ECHO ANSWER"] },
            status: "finished_successfully",
          },
        },
        // The real new turn — streams as in_progress, then finishes.
        {
          conversation_id: "c1",
          message: {
            id: "new-1",
            author: { role: "assistant" },
            content: { content_type: "text", parts: ["Hello"] },
            status: "in_progress",
          },
        },
        {
          conversation_id: "c1",
          message: {
            id: "new-1",
            author: { role: "assistant" },
            content: { content_type: "text", parts: ["Hello world"] },
            status: "finished_successfully",
          },
        },
      ],
    },
  });
  try {
    const executor = new ChatGptWebExecutor();
    const result = await executor.execute({
      model: "gpt-5.3-instant",
      body: { messages: [{ role: "user", content: "hi" }], stream: true },
      stream: true,
      credentials: { apiKey: "test" },
      signal: AbortSignal.timeout(10_000),
      log: null,
    });

    const text = await result.response.text();
    const contentDeltas = text
      .split("\n")
      .filter((l) => l.startsWith("data: ") && l !== "data: [DONE]")
      .map((l) => {
        try {
          return JSON.parse(l.slice(6));
        } catch {
          return null;
        }
      })
      .filter((j) => j?.choices?.[0]?.delta?.content)
      .map((j) => j.choices[0].delta.content);

    const joined = contentDeltas.join("");
    assert.equal(joined, "Hello world", "only the new turn is emitted");
    assert.doesNotMatch(joined, /OLD ECHO/, "echoed content must not appear in stream");
  } finally {
    m.restore();
  }
});

test("Stream parser: echoed prior assistant turn is suppressed (non-streaming)", async () => {
  reset();
  const m = installMockFetch({
    conv: {
      status: 200,
      events: [
        {
          conversation_id: "c1",
          message: {
            id: "echo-1",
            author: { role: "assistant" },
            content: { content_type: "text", parts: ["OLD ECHO ANSWER"] },
            status: "finished_successfully",
          },
        },
        {
          conversation_id: "c1",
          message: {
            id: "new-1",
            author: { role: "assistant" },
            content: { content_type: "text", parts: ["Hello world"] },
            status: "in_progress",
          },
        },
      ],
    },
  });
  try {
    const executor = new ChatGptWebExecutor();
    const result = await executor.execute({
      model: "gpt-5.3-instant",
      body: { messages: [{ role: "user", content: "hi" }] },
      stream: false,
      credentials: { apiKey: "test" },
      signal: AbortSignal.timeout(10_000),
      log: null,
    });
    const json = await result.response.json();
    assert.equal(json.choices[0].message.content, "Hello world");
  } finally {
    m.restore();
  }
});

test("Stream parser: instant single-event reply still surfaces via fallback", async () => {
  // Edge case: a real reply that arrives in a single event with status
  // already finished_successfully (cached/instant). End-of-stream fallback
  // should emit it; otherwise streaming consumers would get nothing.
  reset();
  const m = installMockFetch({
    conv: {
      status: 200,
      events: [
        {
          conversation_id: "c1",
          message: {
            id: "instant-1",
            author: { role: "assistant" },
            content: { content_type: "text", parts: ["instant reply"] },
            status: "finished_successfully",
          },
        },
      ],
    },
  });
  try {
    const executor = new ChatGptWebExecutor();
    const result = await executor.execute({
      model: "gpt-5.3-instant",
      body: { messages: [{ role: "user", content: "hi" }] },
      stream: false,
      credentials: { apiKey: "test" },
      signal: AbortSignal.timeout(10_000),
      log: null,
    });
    const json = await result.response.json();
    assert.equal(json.choices[0].message.content, "instant reply");
  } finally {
    m.restore();
  }
});

// ─── TLS client unavailable ─────────────────────────────────────────────────

test("Error: TlsClientUnavailableError returns 502 with TLS_UNAVAILABLE code", async () => {
  reset();
  // Make the override throw TlsClientUnavailableError on the conversation
  // call (after a successful session/sentinel/dpl pass). The executor catches
  // the error and surfaces TLS_UNAVAILABLE so operators can identify missing
  // native binary issues quickly.
  let convAttempted = false;
  __setTlsFetchOverrideForTesting(async (url) => {
    if (url === "https://chatgpt.com/" || url === "https://chatgpt.com") {
      return {
        status: 200,
        headers: makeHeaders({ "Content-Type": "text/html" }),
        text: '<html data-build="prod-test"></html>',
        body: null,
      };
    }
    if (url.includes("/api/auth/session")) {
      return {
        status: 200,
        headers: makeHeaders({ "Content-Type": "application/json" }),
        text: JSON.stringify({
          accessToken: "jwt",
          expires: new Date(Date.now() + 3600_000).toISOString(),
          user: { id: "u" },
        }),
        body: null,
      };
    }
    if (url.includes("/sentinel/chat-requirements")) {
      return {
        status: 200,
        headers: makeHeaders({ "Content-Type": "application/json" }),
        text: JSON.stringify({ token: "t", proofofwork: { required: false } }),
        body: null,
      };
    }
    if (url.endsWith("/backend-api/f/conversation")) {
      convAttempted = true;
      throw new TlsClientUnavailableError("native binary not loaded");
    }
    return {
      status: 200,
      headers: makeHeaders(),
      text: "",
      body: null,
    };
  });
  try {
    const executor = new ChatGptWebExecutor();
    const result = await executor.execute({
      model: "gpt-5.3-instant",
      body: { messages: [{ role: "user", content: "hi" }] },
      stream: false,
      credentials: { apiKey: "test" },
      signal: AbortSignal.timeout(10_000),
      log: null,
    });
    assert.ok(convAttempted);
    assert.equal(result.response.status, 502);
    const json = await result.response.json();
    assert.equal(json.error.code, "TLS_UNAVAILABLE");
  } finally {
    __setTlsFetchOverrideForTesting(null);
  }
});

// ─── looksLikeSse heuristic ─────────────────────────────────────────────────

test("looksLikeSse: detects SSE bodies", () => {
  assert.equal(looksLikeSse('data: {"v":"hi"}\n\n'), true);
  assert.equal(looksLikeSse("\r\n\r\ndata: foo"), true, "leading blank lines OK");
  assert.equal(looksLikeSse("event: end\ndata: []"), true);
  assert.equal(looksLikeSse("id: 42\ndata: x"), true);
  assert.equal(looksLikeSse(": comment\ndata: x"), true, "SSE comment lines start with :");
  assert.equal(looksLikeSse("retry: 3000\n"), true);
});

test("looksLikeSse: rejects non-SSE bodies that previously passed as 200", () => {
  // The original peek heuristic only looked for `{` to detect JSON errors,
  // letting Cloudflare HTML challenge pages and plain-text 4xx bodies
  // masquerade as 200 SSE responses. looksLikeSse must reject these.
  assert.equal(looksLikeSse('{"detail":"rate limited"}'), false, "JSON error");
  assert.equal(looksLikeSse("<!DOCTYPE html>\n<html>"), false, "HTML doctype");
  assert.equal(looksLikeSse("<html><head>"), false, "HTML page");
  assert.equal(looksLikeSse("Just a moment..."), false, "Cloudflare plain-text challenge");
  assert.equal(looksLikeSse("Attention Required! | Cloudflare"), false);
  assert.equal(looksLikeSse(""), false, "empty body");
  assert.equal(looksLikeSse("   \n\n"), false, "whitespace only");
  assert.equal(looksLikeSse("error: rate limit"), false, "non-SSE field name");
});
