import test from "node:test";
import assert from "node:assert/strict";

const { ChatGptWebExecutor, __derivePublicBaseUrlForTesting, __resetChatGptWebCachesForTesting } =
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

async function withEnv(overrides, fn) {
  const keys = [
    "OMNIROUTE_PUBLIC_BASE_URL",
    "OMNIROUTE_BASE_URL",
    "NEXT_PUBLIC_BASE_URL",
    "BASE_URL",
    "PORT",
  ];
  const previous = new Map(keys.map((key) => [key, process.env[key]]));

  for (const key of keys) {
    if (Object.prototype.hasOwnProperty.call(overrides, key)) {
      const value = overrides[key];
      if (value == null) delete process.env[key];
      else process.env[key] = String(value);
    } else {
      delete process.env[key];
    }
  }

  try {
    return await fn();
  } finally {
    for (const [key, value] of previous) {
      if (value == null) delete process.env[key];
      else process.env[key] = value;
    }
  }
}

/** Dispatch the TLS-impersonating fetch by URL pathname.
 *  Default: session 200 with accessToken, sentinel 200 no PoW, conv 200 empty stream. */
function installMockFetch({
  session,
  sentinel,
  conv,
  dpl,
  fileDownload,
  attachmentDownload,
  signedDownload,
  userConfig,
  onSession,
  onSentinel,
  onConv,
  onFileDownload,
  onAttachmentDownload,
  onUserConfig,
}: any = {}) {
  const calls = {
    session: 0,
    dpl: 0,
    sentinel: 0,
    conv: 0,
    fileDownload: 0,
    attachmentDownload: 0,
    signedDownload: 0,
    userConfig: 0,
    userConfigUrls: [],
    userConfigMethods: [],
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

    // /backend-api/settings/user_last_used_model_config?model_slug=...&thinking_effort=...
    // Match before sentinel since /settings/* is its own surface.
    if (u.includes("/backend-api/settings/user_last_used_model_config")) {
      calls.userConfig++;
      calls.userConfigUrls.push(u);
      calls.userConfigMethods.push((opts.method || "GET").toUpperCase());
      if (onUserConfig) onUserConfig(opts, u);
      const cfg = userConfig ?? { status: 200, body: { is_disabled: false } };
      return {
        status: cfg.status,
        headers: makeHeaders({ "Content-Type": "application/json" }),
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

    // /backend-api/conversation/<conv_id>/attachment/<file_id>/download
    // Must match BEFORE the conversation-endpoint regex below since the
    // conv-prefix regex is broad.
    {
      const m1 = u.match(/\/backend-api\/conversation\/[^/]+\/attachment\/([^/]+)\/download/);
      if (m1) {
        calls.attachmentDownload++;
        if (onAttachmentDownload) onAttachmentDownload(opts, m1[1]);
        const cfg = attachmentDownload ?? {
          status: 200,
          body: { download_url: `https://files.oaiusercontent.com/${m1[1]}?sig=mock` },
        };
        return {
          status: cfg.status,
          headers: makeHeaders({ "Content-Type": "application/json" }),
          text: typeof cfg.body === "string" ? cfg.body : JSON.stringify(cfg.body || {}),
          body: null,
        };
      }
    }

    // /backend-api/files/<file_id>/download
    {
      const m1 = u.match(/\/backend-api\/files\/([^/]+)\/download/);
      if (m1) {
        calls.fileDownload++;
        if (onFileDownload) onFileDownload(opts, m1[1]);
        const cfg = fileDownload ?? {
          status: 200,
          body: { download_url: `https://files.oaiusercontent.com/${m1[1]}?sig=mock` },
        };
        return {
          status: cfg.status,
          headers: makeHeaders({ "Content-Type": "application/json" }),
          text: typeof cfg.body === "string" ? cfg.body : JSON.stringify(cfg.body || {}),
          body: null,
        };
      }
    }

    // The signed estuary URL the executor follows after fetching either
    // download endpoint. Mock returns a tiny PNG header so the executor's
    // `imageUrlToCachedImageUrl` decoder produces a valid Buffer and the
    // image makes it into the cache, surfaced as /v1/chatgpt-web/image/<id>.
    if (/^https:\/\/files\.oaiusercontent\.com\//.test(u)) {
      calls.signedDownload++;
      const cfg = signedDownload ?? { status: 200 };
      if (cfg.status >= 400) {
        return {
          status: cfg.status,
          headers: makeHeaders({ "Content-Type": "text/plain" }),
          text: cfg.body || "",
          body: null,
        };
      }
      const tinyPng = Buffer.from([
        0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a, 0x00, 0x00, 0x00, 0x0d, 0x49, 0x48, 0x44,
        0x52,
      ]);
      return {
        status: cfg.status,
        headers: makeHeaders({ "Content-Type": "image/png" }),
        // tls-client-node packages binary bodies as a data:<mime>;base64,...
        // string when isByteResponse is set; the mock mirrors that contract.
        text: `data:image/png;base64,${tinyPng.toString("base64")}`,
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

// ─── Public image URL derivation ────────────────────────────────────────────

test("Image URL base: OMNIROUTE_PUBLIC_BASE_URL wins and strips accidental /v1", async () => {
  await withEnv(
    {
      OMNIROUTE_PUBLIC_BASE_URL: " http://192.168.107.55:20128/v1/ ",
      NEXT_PUBLIC_BASE_URL: "http://localhost:20128",
    },
    async () => {
      assert.equal(
        __derivePublicBaseUrlForTesting({ host: "localhost:20128" }),
        "http://192.168.107.55:20128"
      );
    }
  );
});

test("Image URL base: local NEXT_PUBLIC_BASE_URL does not mask LAN Host header", async () => {
  await withEnv(
    {
      NEXT_PUBLIC_BASE_URL: "http://localhost:20128",
      BASE_URL: "http://localhost:20128",
    },
    async () => {
      assert.equal(
        __derivePublicBaseUrlForTesting({ host: "192.168.107.55:20128" }),
        "http://192.168.107.55:20128"
      );
    }
  );
});

test("Image URL base: forwarded headers override raw Host", async () => {
  await withEnv({}, async () => {
    assert.equal(
      __derivePublicBaseUrlForTesting({
        host: "localhost:20128",
        "x-forwarded-host": "omni.example.com",
        "x-forwarded-proto": "https",
      }),
      "https://omni.example.com"
    );
  });
});

test("Image URL base: non-local OMNIROUTE_BASE_URL remains a compatibility fallback", async () => {
  await withEnv({ OMNIROUTE_BASE_URL: "https://omni.example.com/v1" }, async () => {
    assert.equal(__derivePublicBaseUrlForTesting(null), "https://omni.example.com");
  });
});

test("Image URL base: falls back to localhost with PORT", async () => {
  await withEnv({ PORT: "20129" }, async () => {
    assert.equal(__derivePublicBaseUrlForTesting(null), "http://localhost:20129");
  });
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
    assert.equal(body.model, "gpt-5-3-instant");
    // Plain text request → Temporary Chat stays ON. We disable it only for
    // image-gen prompts (see "Image gen: image-intent prompts" tests below).
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

test("Provider registry: chatgpt-web exposes the current ChatGPT Web model catalog", async () => {
  const { getRegistryEntry } = await import("../../open-sse/config/providerRegistry.ts");
  const entry = getRegistryEntry("chatgpt-web");
  assert.ok(entry, "chatgpt-web should be in the registry");
  assert.equal(entry.executor, "chatgpt-web");
  assert.equal(entry.format, "openai");
  assert.equal(entry.authHeader, "cookie");

  const ids = (entry.models || []).map((m) => m.id);
  // Mirrors /backend-api/models for ChatGPT Web. Retired GPT-5/GPT-5.1
  // entries should stay out of this list.
  assert.deepEqual(ids, [
    "gpt-5.5-pro",
    "gpt-5.5-thinking",
    "gpt-5.5",
    "gpt-5.4-pro",
    "gpt-5.4-thinking",
    "gpt-5.4-thinking-mini",
    "gpt-5.3",
    "gpt-5.3-mini",
    "gpt-5.2-pro",
    "gpt-5.2-thinking",
    "gpt-5.2-instant",
    "o3",
    "gpt-4-5",
  ]);
});

test("Executor MODEL_MAP: dot-form OmniRoute IDs translate to dash-form ChatGPT slugs", async () => {
  reset();
  const m = installMockFetch();
  try {
    const cases: Array<[string, string]> = [
      ["gpt-5.3", "gpt-5-3"],
      ["gpt-5.5-thinking", "gpt-5-5-thinking"],
      ["gpt-5.4-thinking-mini", "gpt-5-4-t-mini"],
      ["gpt-5.2-thinking", "gpt-5-2-thinking"],
      ["o3", "o3"],
    ];
    for (const [omniId, expectedSlug] of cases) {
      m.calls.urls.length = 0;
      m.calls.bodies.length = 0;
      const executor = new ChatGptWebExecutor();
      await executor.execute({
        model: omniId,
        body: { messages: [{ role: "user", content: "hi" }] },
        stream: false,
        credentials: { apiKey: "test" },
        signal: AbortSignal.timeout(10_000),
        log: null,
      });
      const convIdx = m.calls.urls.findIndex((u) => u.endsWith("/backend-api/f/conversation"));
      const body = JSON.parse(m.calls.bodies[convIdx]);
      assert.equal(body.model, expectedSlug, `${omniId} should map to ${expectedSlug}`);
    }
  } finally {
    m.restore();
  }
});

// ─── thinking_effort PATCH user_last_used_model_config ─────────────────────

test("thinking_effort: high → PATCH user_last_used_model_config with extended", async () => {
  reset();
  const m = installMockFetch();
  try {
    const executor = new ChatGptWebExecutor();
    await executor.execute({
      model: "gpt-5.5-thinking",
      body: { messages: [{ role: "user", content: "hi" }], reasoning_effort: "high" },
      stream: false,
      credentials: { apiKey: "cookie-1" },
      signal: AbortSignal.timeout(10_000),
      log: null,
    });
    assert.equal(m.calls.userConfig, 1, "exactly one PATCH issued");
    assert.equal(m.calls.userConfigMethods[0], "PATCH");
    const u = m.calls.userConfigUrls[0];
    assert.match(u, /model_slug=gpt-5-5-thinking/);
    assert.match(u, /thinking_effort=extended/);
  } finally {
    m.restore();
  }
});

test("thinking_effort: low/medium → PATCH with standard", async () => {
  for (const effort of ["low", "medium", "minimal"]) {
    reset();
    const m = installMockFetch();
    try {
      const executor = new ChatGptWebExecutor();
      await executor.execute({
        model: "gpt-5.4-thinking",
        body: { messages: [{ role: "user", content: "hi" }], reasoning_effort: effort },
        stream: false,
        credentials: { apiKey: `cookie-${effort}` },
        signal: AbortSignal.timeout(10_000),
        log: null,
      });
      assert.equal(m.calls.userConfig, 1, `effort=${effort} should issue exactly one PATCH`);
      assert.match(m.calls.userConfigUrls[0], /thinking_effort=standard/, `${effort} → standard`);
      assert.match(m.calls.userConfigUrls[0], /model_slug=gpt-5-4-thinking/);
    } finally {
      m.restore();
    }
  }
});

test("thinking_effort: instant model never triggers PATCH even with reasoning_effort", async () => {
  reset();
  const m = installMockFetch();
  try {
    const executor = new ChatGptWebExecutor();
    await executor.execute({
      model: "gpt-5.3-instant",
      body: { messages: [{ role: "user", content: "hi" }], reasoning_effort: "high" },
      stream: false,
      credentials: { apiKey: "cookie-instant" },
      signal: AbortSignal.timeout(10_000),
      log: null,
    });
    assert.equal(m.calls.userConfig, 0, "instant slug must not PATCH thinking_effort");
  } finally {
    m.restore();
  }
});

test("thinking_effort: bare chatgpt.com slug (e.g. gpt-5-4-t-mini) passed as model still PATCHes", async () => {
  // Regression: the abbreviated dash-form slug "gpt-5-4-t-mini" doesn't
  // carry the literal "thinking" substring, and isn't a key in MODEL_MAP
  // (only its dot-form alias is), so a substring-only check would silently
  // skip the PATCH for callers that send the chatgpt.com slug directly.
  for (const bareSlug of ["gpt-5-4-t-mini", "gpt-5-5-thinking", "o3"]) {
    reset();
    const m = installMockFetch();
    try {
      const executor = new ChatGptWebExecutor();
      await executor.execute({
        model: bareSlug,
        body: { messages: [{ role: "user", content: "hi" }], reasoning_effort: "high" },
        stream: false,
        credentials: { apiKey: `cookie-bare-${bareSlug}` },
        signal: AbortSignal.timeout(10_000),
        log: null,
      });
      assert.equal(
        m.calls.userConfig,
        1,
        `bare slug ${bareSlug} must trigger thinking_effort PATCH`
      );
      assert.ok(
        m.calls.userConfigUrls[0].includes(`model_slug=${bareSlug}`),
        `URL should contain model_slug=${bareSlug}`
      );
    } finally {
      m.restore();
    }
  }
});

test("thinking_effort: thinking model without reasoning_effort skips PATCH", async () => {
  reset();
  const m = installMockFetch();
  try {
    const executor = new ChatGptWebExecutor();
    await executor.execute({
      model: "gpt-5.5-thinking",
      body: { messages: [{ role: "user", content: "hi" }] },
      stream: false,
      credentials: { apiKey: "cookie-noeffort" },
      signal: AbortSignal.timeout(10_000),
      log: null,
    });
    assert.equal(m.calls.userConfig, 0, "no effort requested → no PATCH");
  } finally {
    m.restore();
  }
});

test("thinking_effort: providerSpecificData.thinkingEffort=extended overrides body", async () => {
  reset();
  const m = installMockFetch();
  try {
    const executor = new ChatGptWebExecutor();
    await executor.execute({
      model: "gpt-5.4-thinking-mini",
      body: {
        messages: [{ role: "user", content: "hi" }],
        reasoning_effort: "low", // would normally map to standard
      },
      stream: false,
      credentials: {
        apiKey: "cookie-override",
        providerSpecificData: { thinkingEffort: "extended" },
      },
      signal: AbortSignal.timeout(10_000),
      log: null,
    });
    assert.equal(m.calls.userConfig, 1);
    assert.match(m.calls.userConfigUrls[0], /model_slug=gpt-5-4-t-mini/);
    assert.match(m.calls.userConfigUrls[0], /thinking_effort=extended/);
  } finally {
    m.restore();
  }
});

test("thinking_effort: nested body.reasoning.effort=high → extended", async () => {
  reset();
  const m = installMockFetch();
  try {
    const executor = new ChatGptWebExecutor();
    await executor.execute({
      model: "gpt-5.2-thinking",
      body: {
        messages: [{ role: "user", content: "hi" }],
        reasoning: { effort: "high" },
      },
      stream: false,
      credentials: { apiKey: "cookie-nested" },
      signal: AbortSignal.timeout(10_000),
      log: null,
    });
    assert.equal(m.calls.userConfig, 1);
    assert.match(m.calls.userConfigUrls[0], /model_slug=gpt-5-2-thinking/);
    assert.match(m.calls.userConfigUrls[0], /thinking_effort=extended/);
  } finally {
    m.restore();
  }
});

test("thinking_effort: cached per (cookie, slug, effort) — second identical call skips PATCH", async () => {
  reset();
  const m = installMockFetch();
  try {
    const executor = new ChatGptWebExecutor();
    const opts = {
      model: "gpt-5.5-thinking",
      body: { messages: [{ role: "user", content: "hi" }], reasoning_effort: "high" },
      stream: false,
      credentials: { apiKey: "cookie-cache" },
      signal: AbortSignal.timeout(10_000),
      log: null,
    };
    await executor.execute(opts);
    await executor.execute(opts);
    assert.equal(m.calls.userConfig, 1, "second identical request hits cache");
  } finally {
    m.restore();
  }
});

test("thinking_effort: switching effort within TTL triggers a fresh PATCH", async () => {
  reset();
  const m = installMockFetch();
  try {
    const executor = new ChatGptWebExecutor();
    const base = {
      model: "gpt-5.5-thinking",
      stream: false,
      credentials: { apiKey: "cookie-switch" },
      signal: AbortSignal.timeout(10_000),
      log: null,
    };
    await executor.execute({
      ...base,
      body: { messages: [{ role: "user", content: "hi" }], reasoning_effort: "high" },
    });
    await executor.execute({
      ...base,
      body: { messages: [{ role: "user", content: "hi" }], reasoning_effort: "low" },
    });
    assert.equal(m.calls.userConfig, 2, "different effort key bypasses cache");
    assert.match(m.calls.userConfigUrls[0], /thinking_effort=extended/);
    assert.match(m.calls.userConfigUrls[1], /thinking_effort=standard/);
  } finally {
    m.restore();
  }
});

test("thinking_effort: PATCH failure is non-fatal — conversation request still fires", async () => {
  reset();
  const m = installMockFetch({
    userConfig: { status: 500, body: { error: "boom" } },
  });
  try {
    const executor = new ChatGptWebExecutor();
    const result = await executor.execute({
      model: "gpt-5.5-thinking",
      body: { messages: [{ role: "user", content: "hi" }], reasoning_effort: "high" },
      stream: false,
      credentials: { apiKey: "cookie-fail" },
      signal: AbortSignal.timeout(10_000),
      log: null,
    });
    assert.equal(m.calls.userConfig, 1);
    assert.equal(m.calls.conv, 1, "conversation still issued despite settings PATCH 500");
    assert.equal(result.response.status, 200);
  } finally {
    m.restore();
  }
});

test("Image registry: cgpt-web/gpt-5.3-instant routes to ChatGPT Web image handler", async () => {
  const { parseImageModel, getImageProvider } =
    await import("../../open-sse/config/imageRegistry.ts");
  const parsed = parseImageModel("cgpt-web/gpt-5.3-instant");
  assert.equal(parsed.provider, "chatgpt-web");
  assert.equal(parsed.model, "gpt-5.3-instant");
  const provider = getImageProvider(parsed.provider);
  assert.equal(provider.format, "chatgpt-web");
  assert.equal(provider.authHeader, "cookie");
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

test("Cookie rotation: unchunked → chunked drops stale unchunked variant", async () => {
  // When the original was unchunked (< 4KB session token) and rotation
  // returns chunked (.0/.1), the stale unchunked entry must NOT survive in
  // the merged blob — otherwise both old and new session-token cookies are
  // sent on the next request and depending on parser precedence the server
  // could read the stale value.
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
        apiKey: "__Secure-next-auth.session-token=UNCHUNKED_OLD; cf_clearance=CFCLEAR",
      },
      signal: AbortSignal.timeout(10_000),
      log: null,
      onCredentialsRefreshed: (creds) => {
        refreshed = creds;
      },
    });
    assert.ok(refreshed);
    // Stale unchunked variant must NOT appear (whole or in part).
    assert.doesNotMatch(
      refreshed.apiKey,
      /__Secure-next-auth\.session-token=UNCHUNKED_OLD/,
      "stale unchunked session-token must be dropped"
    );
    // Non-session-token cookies preserved.
    assert.match(refreshed.apiKey, /cf_clearance=CFCLEAR/);
    // New chunks present.
    assert.match(refreshed.apiKey, /session-token\.0=NEW0/);
    assert.match(refreshed.apiKey, /session-token\.1=NEW1/);
  } finally {
    m.restore();
  }
});

test("Cookie rotation: chunked → unchunked drops stale chunks", async () => {
  // Reverse case: original is chunked, rotation goes back to unchunked.
  reset();
  const m = installMockFetch({
    session: {
      status: 200,
      body: {
        accessToken: "jwt-abc",
        expires: new Date(Date.now() + 3600_000).toISOString(),
        user: { id: "user-1" },
      },
      setCookie: "__Secure-next-auth.session-token=NEW_UNCHUNKED; Path=/; HttpOnly",
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
          "cf_clearance=CFCLEAR",
      },
      signal: AbortSignal.timeout(10_000),
      log: null,
      onCredentialsRefreshed: (creds) => {
        refreshed = creds;
      },
    });
    assert.ok(refreshed);
    assert.doesNotMatch(refreshed.apiKey, /OLD0/, "stale chunk .0 dropped");
    assert.doesNotMatch(refreshed.apiKey, /OLD1/, "stale chunk .1 dropped");
    assert.match(refreshed.apiKey, /session-token=NEW_UNCHUNKED/);
    assert.match(refreshed.apiKey, /cf_clearance=CFCLEAR/);
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

// ─── Image generation ──────────────────────────────────────────────────────

/** Build a SSE event stream that mimics ChatGPT's image-generation reply.
 *  Text turn first, then a finalized multimodal_text with one image_asset_pointer. */
function imageGenEvents({ pointer, text = "Here's your kitten:" }) {
  return [
    {
      conversation_id: "conv-img-1",
      message: {
        id: "msg-1",
        author: { role: "assistant" },
        content: { content_type: "text", parts: [text] },
        status: "in_progress",
      },
    },
    {
      conversation_id: "conv-img-1",
      message: {
        id: "msg-1",
        author: { role: "assistant" },
        content: {
          content_type: "multimodal_text",
          parts: [
            {
              content_type: "image_asset_pointer",
              asset_pointer: pointer,
              width: 1024,
              height: 1024,
            },
          ],
        },
        status: "finished_successfully",
      },
    },
  ];
}

test("Image gen: file-service:// pointer resolves to download URL and is appended as markdown (non-streaming)", async () => {
  reset();
  const m = installMockFetch({
    conv: { status: 200, events: imageGenEvents({ pointer: "file-service://file-kitten1" }) },
  });
  try {
    const executor = new ChatGptWebExecutor();
    const result = await executor.execute({
      model: "gpt-5.3-instant",
      body: { messages: [{ role: "user", content: "generate an image of a kitten" }] },
      stream: false,
      credentials: { apiKey: "test" },
      signal: AbortSignal.timeout(10_000),
      log: null,
    });
    assert.equal(result.response.status, 200);
    const json = await result.response.json();
    const content = json.choices[0].message.content;
    assert.match(content, /Here's your kitten:/);
    // The signed chatgpt.com URL is downloaded server-side and re-served
    // from the OmniRoute cache; clients see a stable /v1/chatgpt-web/image
    // path, never the session-signed estuary URL (which 403s anonymously).
    assert.match(content, /!\[image\]\([^)]*\/v1\/chatgpt-web\/image\/[a-f0-9]+\)/);
    assert.doesNotMatch(content, /files\.oaiusercontent\.com/);
    assert.equal(m.calls.fileDownload, 1, "fetched download URL once");
    assert.equal(m.calls.signedDownload, 1, "fetched signed bytes once");
  } finally {
    m.restore();
  }
});

test("Image gen: file-service:// pointer is appended in streaming SSE", async () => {
  reset();
  const m = installMockFetch({
    conv: {
      status: 200,
      events: imageGenEvents({ pointer: "file-service://file-kitten2", text: "ok:" }),
    },
  });
  try {
    const executor = new ChatGptWebExecutor();
    const result = await executor.execute({
      model: "gpt-5.3-instant",
      body: { messages: [{ role: "user", content: "draw a kitten" }] },
      stream: true,
      credentials: { apiKey: "test" },
      signal: AbortSignal.timeout(10_000),
      log: null,
    });
    assert.equal(result.response.status, 200);
    const reader = result.response.body.getReader();
    const decoder = new TextDecoder();
    let body = "";
    while (true) {
      const { value, done } = await reader.read();
      if (done) break;
      body += decoder.decode(value);
    }
    assert.match(body, /!\[image\]\([^)]*\/v1\/chatgpt-web\/image\/[a-f0-9]+\)/);
    assert.doesNotMatch(body, /files\.oaiusercontent\.com/);
    assert.match(body, /data: \[DONE\]/);
    assert.equal(m.calls.fileDownload, 1);
    assert.equal(m.calls.signedDownload, 1);
  } finally {
    m.restore();
  }
});

test("Image gen: sediment:// pointer prefers /files/<id>/download over /attachment", async () => {
  reset();
  const m = installMockFetch({
    conv: { status: 200, events: imageGenEvents({ pointer: "sediment://file-sed1" }) },
  });
  try {
    const executor = new ChatGptWebExecutor();
    const result = await executor.execute({
      model: "gpt-5.3-instant",
      body: { messages: [{ role: "user", content: "make a kitten" }] },
      stream: false,
      credentials: { apiKey: "test" },
      signal: AbortSignal.timeout(10_000),
      log: null,
    });
    assert.equal(result.response.status, 200);
    const json = await result.response.json();
    const content = json.choices[0].message.content;
    // The mock returns the signed URL via /files/<id>/download. We try
    // that path first (it's the same kind of estuary URL chatgpt.com
    // returns either way, and we care more about not hitting an extra
    // round-trip); the /attachment endpoint is a fallback for when the
    // primary 404s. The mock /files/ response also doubles as the image
    // bytes that are cached behind the emitted OmniRoute image URL.
    assert.match(
      content,
      /!\[image\]\([^)]*\/v1\/chatgpt-web\/image\/[a-f0-9]+\)/,
      "image rendered"
    );
    assert.doesNotMatch(content, /files\.oaiusercontent\.com/);
    assert.equal(m.calls.fileDownload, 1, "tried /files/ endpoint first");
    assert.equal(m.calls.attachmentDownload, 0, "did not need /attachment fallback");
    assert.equal(m.calls.signedDownload, 1, "fetched signed bytes once");
  } finally {
    m.restore();
  }
});

test("Image gen: failed download URL is dropped silently — no broken markdown", async () => {
  reset();
  // Both /files/<id>/download AND the /conversation/<cid>/attachment/<fid>/
  // download fallback have to fail for the resolver to give up. The fallback
  // is the path that recovers `file_00000000XXX` shaped IDs returned by
  // chatgpt.com for image-edit results, so the failure assertion has to
  // close BOTH doors.
  const m = installMockFetch({
    conv: { status: 200, events: imageGenEvents({ pointer: "file-service://file-broken" }) },
    fileDownload: { status: 500, body: { error: "boom" } },
    attachmentDownload: { status: 500, body: { error: "boom" } },
  });
  try {
    const executor = new ChatGptWebExecutor();
    const result = await executor.execute({
      model: "gpt-5.3-instant",
      body: { messages: [{ role: "user", content: "kitten" }] },
      stream: false,
      credentials: { apiKey: "test" },
      signal: AbortSignal.timeout(10_000),
      log: null,
    });
    assert.equal(result.response.status, 200);
    const json = await result.response.json();
    const content = json.choices[0].message.content;
    // Text retained, markdown placeholder NOT emitted (no broken ![image]() link).
    assert.match(content, /Here's your kitten:/);
    assert.doesNotMatch(content, /!\[image\]\(/);
  } finally {
    m.restore();
  }
});

test("Image gen: image-intent prompt disables Temporary Chat", async () => {
  reset();
  const m = installMockFetch();
  try {
    const executor = new ChatGptWebExecutor();
    await executor.execute({
      model: "gpt-5.3-instant",
      body: { messages: [{ role: "user", content: "generate an image of a kitten" }] },
      stream: false,
      credentials: { apiKey: "test" },
      signal: AbortSignal.timeout(10_000),
      log: null,
    });
    const convIdx = m.calls.urls.findIndex((u) => u.endsWith("/backend-api/f/conversation"));
    const body = JSON.parse(m.calls.bodies[convIdx]);
    assert.equal(body.history_and_training_disabled, false, "Temporary Chat OFF for image gen");
  } finally {
    m.restore();
  }
});

test("Image gen: text-only prompt keeps Temporary Chat ON", async () => {
  reset();
  const m = installMockFetch();
  try {
    const executor = new ChatGptWebExecutor();
    await executor.execute({
      model: "gpt-5.3-instant",
      body: { messages: [{ role: "user", content: "what is the capital of France?" }] },
      stream: false,
      credentials: { apiKey: "test" },
      signal: AbortSignal.timeout(10_000),
      log: null,
    });
    const convIdx = m.calls.urls.findIndex((u) => u.endsWith("/backend-api/f/conversation"));
    const body = JSON.parse(m.calls.bodies[convIdx]);
    assert.equal(body.history_and_training_disabled, true, "Temporary Chat ON for text request");
  } finally {
    m.restore();
  }
});

test("Image gen: Open WebUI follow-up/title/tag tool prompts do NOT trigger image gen", async () => {
  reset();
  const toolPrompts = [
    `### Task:\nSuggest 3-5 relevant follow-up questions...\n### Output:\nJSON format: { "follow_ups": ["Q1?", "Q2?", "Q3?"] }\n### Chat History:\n<chat_history>\nUSER: generate an image of a football game\nASSISTANT: _Generating image…_\n</chat_history>`,
    `### Task:\nGenerate a concise, 3-5 word title with an emoji summarizing the chat history.\n### Output:\nJSON format: { "title": "your concise title here" }\n### Chat History:\n<chat_history>\nUSER: draw an image of a kitten\n</chat_history>`,
    `### Task:\nGenerate 1-3 broad tags categorizing the main themes of the chat history\n### Output:\nJSON format: { "tags": ["tag1"] }\n### Chat History:\n<chat_history>\nUSER: render a logo for my startup\n</chat_history>`,
  ];
  for (const prompt of toolPrompts) {
    const m = installMockFetch();
    try {
      const executor = new ChatGptWebExecutor();
      await executor.execute({
        model: "gpt-5.3-instant",
        body: { messages: [{ role: "user", content: prompt }] },
        stream: false,
        credentials: { apiKey: "test" },
        signal: AbortSignal.timeout(10_000),
        log: null,
      });
      const convIdx = m.calls.urls.findIndex((u) => u.endsWith("/backend-api/f/conversation"));
      const body = JSON.parse(m.calls.bodies[convIdx]);
      assert.equal(
        body.history_and_training_disabled,
        true,
        `tool prompt should keep Temporary Chat ON: ${prompt.slice(0, 50)}...`
      );
    } finally {
      m.restore();
    }
  }
});

test("Image gen: Open WebUI image-generation context suppresses duplicate chat image gen", async () => {
  reset();
  const contexts = [
    "<context>The requested image has been created by the system successfully and is now being shown to the user. Let the user know that the image they requested has been generated and is now shown in the chat.</context>",
    "<context>The requested image has been edited and created and is now being shown to the user. Let them know that it has been generated.</context>",
    "<context>Image generation was attempted but failed because of an error. The system is currently unable to generate the image.</context>",
  ];

  for (const context of contexts) {
    const m = installMockFetch();
    try {
      const executor = new ChatGptWebExecutor();
      await executor.execute({
        model: "gpt-5.3-instant",
        body: {
          messages: [
            { role: "system", content: context },
            { role: "user", content: "draw an image of a tennis match at night" },
          ],
        },
        stream: false,
        credentials: { apiKey: "test" },
        signal: AbortSignal.timeout(10_000),
        log: null,
      });
      const convIdx = m.calls.urls.findIndex((u) => u.endsWith("/backend-api/f/conversation"));
      const body = JSON.parse(m.calls.bodies[convIdx]);
      assert.equal(
        body.history_and_training_disabled,
        true,
        "Open WebUI already handled image generation, so chat path should stay temporary"
      );
      assert.equal(body.conversation_id, null);
      assert.match(
        body.messages[body.messages.length - 1].content.parts[0],
        /Briefly acknowledge the image result/
      );
      assert.doesNotMatch(body.messages[body.messages.length - 1].content.parts[0], /tennis match/);
    } finally {
      m.restore();
    }
  }
});

test("Image gen: heuristic catches common phrasings", async () => {
  reset();
  const phrases = [
    "draw me a kitten",
    "create an image of a sunset",
    "make a picture of mountains",
    "render a logo for my startup",
    "show me an illustration of a dragon",
    "/imagine a futuristic city",
    "paint a portrait of Einstein",
    "produce a photo of a beach",
  ];
  for (const phrase of phrases) {
    const m = installMockFetch();
    try {
      const executor = new ChatGptWebExecutor();
      await executor.execute({
        model: "gpt-5.3-instant",
        body: { messages: [{ role: "user", content: phrase }] },
        stream: false,
        credentials: { apiKey: "test" },
        signal: AbortSignal.timeout(10_000),
        log: null,
      });
      const convIdx = m.calls.urls.findIndex((u) => u.endsWith("/backend-api/f/conversation"));
      const body = JSON.parse(m.calls.bodies[convIdx]);
      assert.equal(
        body.history_and_training_disabled,
        false,
        `Phrase ${JSON.stringify(phrase)} should classify as image-gen`
      );
    } finally {
      m.restore();
    }
  }
});

test("Image gen: signed URL bytes are cached and exposed via /v1/chatgpt-web/image URL", async () => {
  reset();
  // Real-world flow: /files/<id>/download returns a chatgpt.com estuary URL
  // signed for the user's session — that URL 403s for any anonymous client,
  // so we fetch the bytes, cache them locally, and emit an OmniRoute image URL.
  const pngBytes = Buffer.from([
    0x89,
    0x50,
    0x4e,
    0x47,
    0x0d,
    0x0a,
    0x1a,
    0x0a, // PNG magic
    0x00,
    0x00,
    0x00,
    0x0d,
    0x49,
    0x48,
    0x44,
    0x52, // IHDR chunk
  ]);
  const dataUriFromTlsClient = `data:image/png;base64,${pngBytes.toString("base64")}`;

  const tls = await import("../../open-sse/services/chatgptTlsClient.ts");
  __resetChatGptWebCachesForTesting();
  const downloadUrl = "https://chatgpt.com/backend-api/estuary/content?id=file-data1&sig=abc";
  const calls = { signed: 0, urls: [] };

  tls.__setTlsFetchOverrideForTesting(async (url, opts = {}) => {
    const u = String(url);
    calls.urls.push(u);
    if (u === "https://chatgpt.com/" && (opts.method || "GET") === "GET") {
      return {
        status: 200,
        headers: makeHeaders({ "Content-Type": "text/html" }),
        text: '<html data-build="prod-test"><script src="https://cdn.oaistatic.com/main.js"></script></html>',
        body: null,
      };
    }
    if (u.includes("/api/auth/session")) {
      return {
        status: 200,
        headers: makeHeaders({ "Content-Type": "application/json" }),
        text: JSON.stringify({
          accessToken: "jwt-x",
          expires: new Date(Date.now() + 3600_000).toISOString(),
          user: { id: "u1" },
        }),
        body: null,
      };
    }
    if (u.includes("/sentinel/chat-requirements")) {
      return {
        status: 200,
        headers: makeHeaders({ "Content-Type": "application/json" }),
        text: JSON.stringify({ token: "t", proofofwork: { required: false } }),
        body: null,
      };
    }
    if (u.match(/\/backend-api\/files\/[^/]+\/download/)) {
      return {
        status: 200,
        headers: makeHeaders({ "Content-Type": "application/json" }),
        text: JSON.stringify({ download_url: downloadUrl }),
        body: null,
      };
    }
    if (u.startsWith(downloadUrl)) {
      calls.signed++;
      // tls-client-node returns binary bodies as a "data:<mime>;base64,..."
      // string (see its response.js bytes() impl); the executor decodes it
      // back into bytes before putting the image in OmniRoute's cache.
      return {
        status: 200,
        headers: makeHeaders({ "Content-Type": "image/png" }),
        text: dataUriFromTlsClient,
        body: null,
      };
    }
    if (u.endsWith("/backend-api/f/conversation") || u.endsWith("/backend-api/conversation")) {
      return {
        status: 200,
        headers: makeHeaders({ "Content-Type": "text/event-stream" }),
        text: mockChatGptStreamText(imageGenEvents({ pointer: "file-service://file-data1" })),
        body: null,
      };
    }
    return { status: 404, headers: makeHeaders(), text: "not mocked", body: null };
  });

  await withEnv(
    {
      OMNIROUTE_PUBLIC_BASE_URL: "http://192.168.107.55:20128/v1",
      NEXT_PUBLIC_BASE_URL: "http://localhost:20128",
    },
    async () => {
      try {
        const executor = new ChatGptWebExecutor();
        const result = await executor.execute({
          model: "gpt-5.3-instant",
          body: { messages: [{ role: "user", content: "draw kitten" }] },
          stream: false,
          credentials: { apiKey: "test" },
          signal: AbortSignal.timeout(10_000),
          log: null,
        });
        assert.equal(result.response.status, 200);
        const json = await result.response.json();
        const content = json.choices[0].message.content;
        // The executor caches the bytes in memory and emits a URL pointing
        // at /v1/chatgpt-web/image/<uuid> instead of embedding a data URI —
        // see open-sse/services/chatgptImageCache.ts and the matching route
        // in src/app/api/v1/chatgpt-web/image/[id]/route.ts.
        const m = content.match(
          /!\[image\]\((http:\/\/192\.168\.107\.55:20128\/v1\/chatgpt-web\/image\/([a-f0-9]+))\)/
        );
        assert.ok(m, `expected URL-style markdown, got: ${content.slice(0, 200)}`);
        assert.equal(calls.signed, 1, "fetched signed URL once");

        // Verify the cached bytes match the PNG we fed in by going through
        // the cache module directly.
        const cacheMod = await import("../../open-sse/services/chatgptImageCache.ts");
        const entry = cacheMod.getChatGptImage(m[2]);
        assert.ok(entry, "cache entry exists for the emitted id");
        assert.equal(entry.mime, "image/png");
        assert.deepEqual(Array.from(entry.bytes), Array.from(pngBytes));
        assert.deepEqual(entry.context, {
          conversationId: "conv-img-1",
          parentMessageId: "msg-1",
        });
      } finally {
        tls.__setTlsFetchOverrideForTesting(null);
      }
    }
  );
});

test("Image gen: prior data: image URIs are stripped from history before upstream", async () => {
  // Open WebUI replays the full conversation each turn. After we generate an
  // image and emit ![image](data:image/png;base64,...), that 2-3MB string
  // comes back as the assistant message on the next turn. Sending it back
  // upstream blows past chatgpt.com's body limits → "empty response body" 502.
  reset();
  const m = installMockFetch();
  try {
    const huge = "iVBORw0KGgo" + "A".repeat(2_000_000); // ~2MB base64
    const assistantMsg = `Sure, here you go:\n\n![image](data:image/png;base64,${huge})\n`;
    const executor = new ChatGptWebExecutor();
    await executor.execute({
      model: "gpt-5.3-instant",
      body: {
        messages: [
          { role: "user", content: "draw a kitten" },
          { role: "assistant", content: assistantMsg },
          { role: "user", content: "now make it a puppy" },
        ],
      },
      stream: false,
      credentials: { apiKey: "test" },
      signal: AbortSignal.timeout(10_000),
      log: null,
    });
    const convIdx = m.calls.urls.findIndex((u) => u.endsWith("/backend-api/f/conversation"));
    assert.ok(convIdx >= 0, "conversation request was sent");
    const body = m.calls.bodies[convIdx];
    assert.ok(body.length < 50_000, `body should be small, got ${body.length}`);
    const parsed = JSON.parse(body);
    const allParts = JSON.stringify(parsed.messages);
    assert.doesNotMatch(allParts, /data:image/, "no data: URI in upstream body");
    assert.match(allParts, /generated image/, "placeholder is present");
  } finally {
    m.restore();
  }
});

test("Image edit: cached OmniRoute image URL continues the saved ChatGPT conversation", async () => {
  reset();
  const { storeChatGptImage } = await import("../../open-sse/services/chatgptImageCache.ts");
  const imageId = storeChatGptImage(Buffer.from([1, 2, 3]), "image/png", 30_000, {
    conversationId: "conv-image-1",
    parentMessageId: "msg-image-1",
  });
  const imageUrl = `http://192.168.107.55:20128/v1/chatgpt-web/image/${imageId}`;
  const m = installMockFetch();
  try {
    const executor = new ChatGptWebExecutor();
    await executor.execute({
      model: "gpt-5.3-instant",
      body: {
        messages: [
          { role: "user", content: "draw a kitten" },
          { role: "assistant", content: `Here it is:\n\n![image](${imageUrl})` },
          { role: "user", content: "make it nighttime with softer lighting" },
        ],
      },
      stream: false,
      credentials: { apiKey: "test" },
      signal: AbortSignal.timeout(10_000),
      log: null,
    });

    const convIdx = m.calls.urls.findIndex((u) => u.endsWith("/backend-api/f/conversation"));
    assert.ok(convIdx >= 0, "conversation request was sent");
    const body = JSON.parse(m.calls.bodies[convIdx]);
    assert.equal(body.conversation_id, "conv-image-1");
    assert.equal(body.parent_message_id, "msg-image-1");
    assert.equal(body.history_and_training_disabled, false);
    assert.equal(body.messages.length, 1, "saved ChatGPT conversation carries prior image state");
    assert.equal(body.messages[0].author.role, "user");
    assert.match(body.messages[0].content.parts[0], /nighttime/);
  } finally {
    m.restore();
  }
});

test("Image edit: Open WebUI image context suppresses duplicate edit continuation", async () => {
  reset();
  const { storeChatGptImage } = await import("../../open-sse/services/chatgptImageCache.ts");
  const imageId = storeChatGptImage(Buffer.from([1, 2, 3]), "image/png", 30_000, {
    conversationId: "conv-image-2",
    parentMessageId: "msg-image-2",
  });
  const imageUrl = `http://192.168.107.55:20128/v1/chatgpt-web/image/${imageId}`;
  const m = installMockFetch();
  try {
    const executor = new ChatGptWebExecutor();
    await executor.execute({
      model: "gpt-5.3-instant",
      body: {
        messages: [
          {
            role: "system",
            content:
              "<context>The requested image has been edited and created and is now being shown to the user. Let them know that it has been generated.</context>",
          },
          { role: "user", content: "draw a kitten" },
          { role: "assistant", content: `Here it is:\n\n![image](${imageUrl})` },
          { role: "user", content: "make it nighttime with softer lighting" },
        ],
      },
      stream: false,
      credentials: { apiKey: "test" },
      signal: AbortSignal.timeout(10_000),
      log: null,
    });

    const convIdx = m.calls.urls.findIndex((u) => u.endsWith("/backend-api/f/conversation"));
    const body = JSON.parse(m.calls.bodies[convIdx]);
    assert.equal(body.conversation_id, null);
    assert.notEqual(body.parent_message_id, "msg-image-2");
    assert.equal(body.history_and_training_disabled, true);
    assert.match(
      body.messages[body.messages.length - 1].content.parts[0],
      /Briefly acknowledge the image result/
    );
    assert.doesNotMatch(body.messages[body.messages.length - 1].content.parts[0], /nighttime/);
  } finally {
    m.restore();
  }
});

test("Image gen: dedupes the same pointer across in-progress + finished events", async () => {
  reset();
  // Repeat the same pointer in BOTH the in_progress event and the
  // finished_successfully event. The resolver should fetch the URL once.
  const events = [
    {
      conversation_id: "conv-d",
      message: {
        id: "msg-1",
        author: { role: "assistant" },
        content: {
          content_type: "multimodal_text",
          parts: [
            { content_type: "image_asset_pointer", asset_pointer: "file-service://file-dedupe" },
          ],
        },
        status: "in_progress",
      },
    },
    {
      conversation_id: "conv-d",
      message: {
        id: "msg-1",
        author: { role: "assistant" },
        content: {
          content_type: "multimodal_text",
          parts: [
            { content_type: "image_asset_pointer", asset_pointer: "file-service://file-dedupe" },
          ],
        },
        status: "finished_successfully",
      },
    },
  ];
  const m = installMockFetch({ conv: { status: 200, events } });
  try {
    const executor = new ChatGptWebExecutor();
    const result = await executor.execute({
      model: "gpt-5.3-instant",
      body: { messages: [{ role: "user", content: "kitten" }] },
      stream: false,
      credentials: { apiKey: "test" },
      signal: AbortSignal.timeout(10_000),
      log: null,
    });
    assert.equal(result.response.status, 200);
    const json = await result.response.json();
    // Markdown emitted exactly once (single image, not duplicated).
    const matches = json.choices[0].message.content.match(/!\[image\]\(/g) ?? [];
    assert.equal(matches.length, 1, "markdown emitted once");
    assert.equal(m.calls.fileDownload, 1, "download URL fetched once");
  } finally {
    m.restore();
  }
});

test("Image gen: bytes-fetch failure drops markdown (no signed-URL fallback)", async () => {
  // Memory principle #3: never hand back the chatgpt.com signed estuary URL.
  // It 403s for any anonymous client, so emitting it as markdown produces
  // broken images. The resolver returns null when the bytes fetch fails;
  // imageMarkdown skips empty URL lists, so no `![image](…)` appears.
  reset();
  const m = installMockFetch({
    conv: { status: 200, events: imageGenEvents({ pointer: "file-service://file-broken-bytes" }) },
    signedDownload: { status: 500, body: "boom" },
  });
  try {
    const executor = new ChatGptWebExecutor();
    const result = await executor.execute({
      model: "gpt-5.3-instant",
      body: { messages: [{ role: "user", content: "draw a kitten" }] },
      stream: false,
      credentials: { apiKey: "test" },
      signal: AbortSignal.timeout(10_000),
      log: null,
    });
    assert.equal(result.response.status, 200);
    const json = await result.response.json();
    const content = json.choices[0].message.content;
    assert.doesNotMatch(content, /!\[image\]/, "no markdown for failed bytes fetch");
    assert.doesNotMatch(
      content,
      /files\.oaiusercontent\.com/,
      "signed URL is never leaked to client"
    );
    assert.equal(m.calls.fileDownload, 1, "download URL was attempted");
    assert.equal(m.calls.signedDownload, 1, "signed-bytes fetch was attempted and failed");
  } finally {
    m.restore();
  }
});

test("Image cache: byte cap evicts oldest before count cap kicks in", async () => {
  reset();
  const cacheMod = await import("../../open-sse/services/chatgptImageCache.ts");
  // 4 MB images × 3 stores against a 10 MB byte cap: third store should
  // evict the first to fit. Verifies the byte budget bites BEFORE the
  // 200-entry count cap, which is the whole point of the byte budget.
  const original = process.env.OMNIROUTE_CGPT_WEB_IMAGE_CACHE_MAX_MB;
  process.env.OMNIROUTE_CGPT_WEB_IMAGE_CACHE_MAX_MB = "10";
  try {
    cacheMod.__resetChatGptImageCacheForTesting();
    const big = Buffer.alloc(4 * 1024 * 1024, 1);
    const id1 = cacheMod.storeChatGptImage(big, "image/png");
    const id2 = cacheMod.storeChatGptImage(big, "image/png");
    assert.ok(cacheMod.getChatGptImage(id1), "id1 still resident after id2");
    assert.ok(cacheMod.getChatGptImage(id2), "id2 resident");
    const id3 = cacheMod.storeChatGptImage(big, "image/png");
    assert.equal(cacheMod.getChatGptImage(id1), null, "id1 evicted to make room for id3");
    assert.ok(cacheMod.getChatGptImage(id2), "id2 still resident");
    assert.ok(cacheMod.getChatGptImage(id3), "id3 resident");
    // Total bytes never exceeds the cap once we've evicted.
    const bytes = cacheMod.__getChatGptImageCacheBytesForTesting();
    assert.ok(
      bytes <= 10 * 1024 * 1024,
      `cache bytes (${bytes}) should be within the configured 10 MB cap`
    );
  } finally {
    if (original == null) delete process.env.OMNIROUTE_CGPT_WEB_IMAGE_CACHE_MAX_MB;
    else process.env.OMNIROUTE_CGPT_WEB_IMAGE_CACHE_MAX_MB = original;
    cacheMod.__resetChatGptImageCacheForTesting();
  }
});

test("Image edit: file_0000XXXX (chatgpt-web edit result) falls back to /conversation/.../attachment/.../download", async () => {
  // The /files/<id>/download endpoint rejects the new `file_00000000XXX`
  // pointer shape that chatgpt.com returns for image-EDIT results — it
  // 422s. The pointer is conversation-scoped and only resolves through
  // /conversation/<cid>/attachment/<fid>/download. Without the fallback
  // we'd render a broken image link or no markdown at all.
  reset();
  const m = installMockFetch({
    conv: {
      status: 200,
      events: imageGenEvents({
        pointer: "file-service://file_00000000f1fc7246af3a3934a8c55b9c",
      }),
    },
    fileDownload: { status: 422, body: { detail: "edit-shape pointer not directly fetchable" } },
  });
  try {
    const executor = new ChatGptWebExecutor();
    const result = await executor.execute({
      model: "gpt-5.3-instant",
      body: { messages: [{ role: "user", content: "now make it nighttime" }] },
      stream: false,
      credentials: { apiKey: "test" },
      signal: AbortSignal.timeout(10_000),
      log: null,
    });
    assert.equal(result.response.status, 200);
    const json = await result.response.json();
    const content = json.choices[0].message.content;
    assert.match(
      content,
      /!\[image\]\([^)]*\/v1\/chatgpt-web\/image\/[a-f0-9]+\)/,
      "image rendered via fallback"
    );
    assert.equal(m.calls.fileDownload, 1, "tried /files/ first");
    assert.equal(
      m.calls.attachmentDownload,
      1,
      "fell back to /conversation/.../attachment/.../download"
    );
    assert.equal(m.calls.signedDownload, 1, "fetched signed bytes once");
  } finally {
    m.restore();
  }
});

test("Image gen: ChatGPT-internal tool_invoked metadata does NOT spuriously trigger image gen heartbeats", async () => {
  // Regression for: the executor used to set imageGenAsync = true on any
  // server_ste_metadata event with `tool_invoked: true`, but ChatGPT marks
  // *all* internal tool usage (reasoning, web search, calc, file_search)
  // with that flag. Plain text turns ended up emitting "Generating image…"
  // text and a 30s WebSocket wait. Specific image-gen signals only.
  reset();
  const events = [
    {
      type: "server_ste_metadata",
      metadata: { tool_invoked: true, turn_use_case: "default" },
    },
    {
      conversation_id: "conv-x",
      message: {
        id: "msg-x",
        author: { role: "assistant" },
        content: { content_type: "text", parts: ["GPT-4o-mini has weaker reasoning."] },
        status: "in_progress",
      },
    },
    {
      conversation_id: "conv-x",
      message: {
        id: "msg-x",
        author: { role: "assistant" },
        content: { content_type: "text", parts: ["GPT-4o-mini has weaker reasoning."] },
        status: "finished_successfully",
      },
    },
  ];
  const m = installMockFetch({ conv: { status: 200, events } });
  try {
    const executor = new ChatGptWebExecutor();
    const result = await executor.execute({
      model: "gpt-5.3-instant",
      body: { messages: [{ role: "user", content: "limitations of gpt-4o-mini?" }] },
      stream: true,
      credentials: { apiKey: "test" },
      signal: AbortSignal.timeout(10_000),
      log: null,
    });
    const reader = result.response.body.getReader();
    const decoder = new TextDecoder();
    let body = "";
    while (true) {
      const { value, done } = await reader.read();
      if (done) break;
      body += decoder.decode(value);
    }
    assert.doesNotMatch(body, /Generating image/, "no spurious image-gen placeholder text");
    assert.match(body, /weaker reasoning/, "actual answer streamed");
  } finally {
    m.restore();
  }
});

test("Image edit handler: bytes-hash match drives executor with cached conversation context", async () => {
  // The /v1/images/edits flow exists because Open WebUI's image-edit toggle
  // posts multipart bodies (prompt + uploaded image bytes) and would
  // otherwise trip Next.js's Server Action handler. We hash the uploaded
  // bytes, find the cached entry, and synthesize a chat thread that drives
  // the executor through its continuation path — same code paths as the
  // chat-message edit flow.
  reset();
  const cacheMod = await import("../../open-sse/services/chatgptImageCache.ts");
  cacheMod.__resetChatGptImageCacheForTesting();
  const sourceBytes = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a, 1, 2, 3]);
  cacheMod.storeChatGptImage(sourceBytes, "image/png", 60_000, {
    conversationId: "conv-edit-handler",
    parentMessageId: "msg-edit-handler",
  });

  const m = installMockFetch({
    // Conv response must include an image pointer so the handler sees
    // markdown in the assistant message and treats the edit as successful.
    conv: {
      status: 200,
      events: imageGenEvents({ pointer: "file-service://file-edited-day", text: "Done:" }),
    },
  });
  try {
    const { handleImageEdit } = await import("../../open-sse/handlers/imageGeneration.ts");
    const result = await handleImageEdit({
      provider: "chatgpt-web",
      model: "gpt-5.3-instant",
      body: { prompt: "turn it to day time" },
      imageBytes: sourceBytes,
      credentials: { apiKey: "test" },
      log: null,
    });
    assert.equal(result.success, true, `expected success, got error: ${(result as any).error}`);
    const convIdx = m.calls.urls.findIndex((u) => u.endsWith("/backend-api/f/conversation"));
    assert.ok(convIdx >= 0, "conversation request was sent");
    const sentBody = JSON.parse(m.calls.bodies[convIdx]);
    assert.equal(sentBody.conversation_id, "conv-edit-handler");
    assert.equal(sentBody.parent_message_id, "msg-edit-handler");
    assert.equal(sentBody.history_and_training_disabled, false);
    assert.match(sentBody.messages[sentBody.messages.length - 1].content.parts[0], /day time/);
  } finally {
    m.restore();
  }
});

test("Image edit handler: no cached match returns 400 (does not silently generate unrelated image)", async () => {
  // If the user uploads a foreign image (or the cache TTL elapsed), there's
  // no chatgpt.com conversation node to continue and chatgpt-web's image_gen
  // tool can't actually edit. Surface that with a clear, actionable error
  // instead of generating an unrelated image and confusing the user.
  reset();
  const cacheMod = await import("../../open-sse/services/chatgptImageCache.ts");
  cacheMod.__resetChatGptImageCacheForTesting();

  const m = installMockFetch();
  try {
    const { handleImageEdit } = await import("../../open-sse/handlers/imageGeneration.ts");
    const foreignBytes = Buffer.from([0xff, 0xd8, 0xff, 0xe0, 0xde, 0xad, 0xbe, 0xef]);
    const result = await handleImageEdit({
      provider: "chatgpt-web",
      model: "gpt-5.3-instant",
      body: { prompt: "turn it to day time" },
      imageBytes: foreignBytes,
      credentials: { apiKey: "test" },
      log: null,
    });
    assert.equal(result.success, false);
    assert.equal((result as any).status, 400);
    assert.match(String((result as any).error), /generated through this OmniRoute instance/);
    assert.equal(m.calls.session, 0, "no upstream calls were attempted");
    assert.equal(m.calls.conv, 0, "no chat-completion was attempted");
  } finally {
    m.restore();
  }
});

test("Image gen handler: n>4 is rejected before any upstream call", async () => {
  // Each chatgpt-web image is a separate ~30s chat turn. Without a clamp,
  // body.n=1000 would pin the executor for hours before HTTP timeout.
  // Verify the cap rejects at the boundary without burning a single upstream
  // request — important so a rogue client can't trivially DoS the worker.
  reset();
  const m = installMockFetch();
  try {
    const { handleImageGeneration } = await import("../../open-sse/handlers/imageGeneration.ts");
    const result = await handleImageGeneration({
      body: { prompt: "draw a kitten", n: 5, model: "cgpt-web/gpt-5.3-instant" },
      credentials: { apiKey: "test" },
      log: null,
    });
    assert.equal(result.success, false);
    assert.equal((result as any).status, 400);
    assert.match(String((result as any).error), /n=1\.\.4/);
    assert.equal(m.calls.session, 0, "no session exchange was attempted");
    assert.equal(m.calls.conv, 0, "no conversation request was attempted");
  } finally {
    m.restore();
  }
});

test("Image cache: deleting an entry decrements the byte counter", async () => {
  // Regression guard: an earlier draft tracked entry count but not bytes,
  // and TTL eviction removed the entry without crediting back its size —
  // the counter would only ever grow.
  reset();
  const cacheMod = await import("../../open-sse/services/chatgptImageCache.ts");
  cacheMod.__resetChatGptImageCacheForTesting();
  const id = cacheMod.storeChatGptImage(Buffer.alloc(1024, 7), "image/png", 10);
  assert.equal(cacheMod.__getChatGptImageCacheBytesForTesting(), 1024);
  // Wait past the 10 ms TTL, then trigger eviction by reading.
  await new Promise((r) => setTimeout(r, 25));
  assert.equal(cacheMod.getChatGptImage(id), null, "entry expired");
  assert.equal(
    cacheMod.__getChatGptImageCacheBytesForTesting(),
    0,
    "bytes credited back on TTL evict"
  );
});
