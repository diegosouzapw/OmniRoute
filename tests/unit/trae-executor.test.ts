import test from "node:test";
import assert from "node:assert/strict";

// Import the executor directly (not via executors/index.ts) — index pulls in
// the entire provider registry and DB layer which is slow and unnecessary for
// the unit-level behavior we want to exercise here.
const { TraeExecutor } = await import("../../open-sse/executors/trae.ts");

// ─── Helpers ────────────────────────────────────────────────────────────────

/** Build a Response whose body streams the given SSE frames (event/data pairs). */
function sseResponse(frames: Array<{ event: string; data: unknown }>): Response {
  const enc = new TextEncoder();
  const stream = new ReadableStream({
    start(controller) {
      for (const f of frames) {
        controller.enqueue(enc.encode(`event: ${f.event}\n`));
        controller.enqueue(enc.encode(`data: ${JSON.stringify(f.data)}\n\n`));
      }
      controller.close();
    },
  });
  return new Response(stream, {
    status: 200,
    headers: { "Content-Type": "text/event-stream" },
  });
}

function jsonResponse(obj: unknown, status = 200): Response {
  return new Response(JSON.stringify(obj), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

/**
 * Install a mock fetch dispatching by URL:
 *   POST /chat_sessions          → session create
 *   GET  /chat_sessions/{}/events → SSE frames
 * Returns { calls, restore }.
 */
function installMockFetch({
  sessionBody,
  frames,
  sessionStatus = 200,
}: {
  sessionBody?: unknown;
  frames?: Array<{ event: string; data: unknown }>;
  sessionStatus?: number;
} = {}) {
  const calls: { sessionBody?: any; sessionHeaders?: Record<string, string>; eventsUrl?: string } =
    {};
  const original = globalThis.fetch;
  globalThis.fetch = (async (input: any, init: any = {}) => {
    const url = typeof input === "string" ? input : input.url;
    if (url.includes("/chat_sessions") && url.includes("/events")) {
      calls.eventsUrl = url;
      return sseResponse(frames ?? [{ event: "done", data: { status: "completed" } }]);
    }
    if (url.endsWith("/chat_sessions")) {
      calls.sessionBody = init.body ? JSON.parse(init.body) : undefined;
      calls.sessionHeaders = init.headers;
      return jsonResponse(
        sessionBody ?? {
          code: 0,
          data: { chat_session_id: "sess1", status: 2, message_id: "msg1" },
          message: "success",
        },
        sessionStatus
      );
    }
    throw new Error(`unexpected fetch ${url}`);
  }) as typeof fetch;
  return { calls, restore: () => (globalThis.fetch = original) };
}

const CREDS = {
  accessToken: "JWT.test.token",
  providerSpecificData: {
    webId: "WID",
    bizUserId: "BUID",
    userUniqueId: "UUID",
    scope: "marscode-us",
    tenant: "marscode",
    region: "US-East",
  },
};

async function readAll(res: Response): Promise<string> {
  return await res.text();
}

// ─── Tests ──────────────────────────────────────────────────────────────────

// Registration (`getExecutor("trae")` returns a TraeExecutor) is covered by
// typecheck + a server-startup smoke test. Importing executors/index.ts here
// would pull in the DB layer and leave async handles open at process exit.

test("buildHeaders uses Cloud-IDE-JWT auth scheme + web client headers", () => {
  const ex = new TraeExecutor();
  const h = ex.buildHeaders(CREDS);
  assert.equal(h.Authorization, "Cloud-IDE-JWT JWT.test.token");
  assert.equal(h["X-Trae-Client-Type"], "web");
});

test("non-stream: accumulates plan_item.thought and maps usage", async () => {
  const { calls, restore } = installMockFetch({
    frames: [
      { event: "metadata", data: { message_id: "m" } },
      { event: "plan_item", data: { id: "p1", thought: "Па" } },
      { event: "plan_item", data: { id: "p1", thought: "Париж" } },
      // trailing finish plan_item with empty thought must NOT wipe accumulated text
      { event: "plan_item", data: { id: "p2", thought: "" } },
      {
        event: "token_usage",
        data: { prompt_tokens: 10, completion_tokens: 3, total_tokens: 13 },
      },
      { event: "done", data: { status: "completed" } },
    ],
  });
  try {
    const ex = new TraeExecutor();
    const { response } = await ex.execute({
      model: "auto",
      body: { messages: [{ role: "user", content: "столица Франции?" }] },
      stream: false,
      credentials: CREDS,
    });
    const json = JSON.parse(await readAll(response));
    assert.equal(json.choices[0].message.content, "Париж");
    assert.equal(json.choices[0].finish_reason, "stop");
    assert.deepEqual(json.usage, { prompt_tokens: 10, completion_tokens: 3, total_tokens: 13 });
    // query is JSON-encoded content blocks; model "auto" → auto strategy
    assert.equal(calls.sessionBody.initial_message.model_selection_strategy, "auto");
    assert.match(calls.sessionBody.initial_message.query, /столица Франции/);
  } finally {
    restore();
  }
});

test("manual model → manual strategy + model_name passed through", async () => {
  const { calls, restore } = installMockFetch({
    frames: [{ event: "done", data: { status: "completed" } }],
  });
  try {
    const ex = new TraeExecutor();
    await ex.execute({
      model: "gpt-5.2",
      body: { messages: [{ role: "user", content: "hi" }] },
      stream: false,
      credentials: CREDS,
    });
    assert.equal(calls.sessionBody.initial_message.model_selection_strategy, "manual");
    assert.equal(calls.sessionBody.initial_message.model_name, "gpt-5.2");
  } finally {
    restore();
  }
});

test('model "work" → work session mode, auto strategy, empty model_name', async () => {
  const { calls, restore } = installMockFetch({
    frames: [{ event: "done", data: { status: "completed" } }],
  });
  try {
    const ex = new TraeExecutor();
    await ex.execute({
      model: "work",
      body: { messages: [{ role: "user", content: "hi" }] },
      stream: false,
      credentials: CREDS,
    });
    const im = calls.sessionBody.initial_message;
    assert.equal(calls.sessionBody.mode, "work");
    assert.equal(im.model_selection_strategy, "auto");
    assert.equal(im.model_name, "");
    // common_params.solo_chat_mode must follow the session mode
    assert.equal(JSON.parse(im.common_params).solo_chat_mode, "work");
  } finally {
    restore();
  }
});

test('model "auto" stays in code mode (solo_chat_mode=code)', async () => {
  const { calls, restore } = installMockFetch({
    frames: [{ event: "done", data: { status: "completed" } }],
  });
  try {
    const ex = new TraeExecutor();
    await ex.execute({
      model: "auto",
      body: { messages: [{ role: "user", content: "hi" }] },
      stream: false,
      credentials: CREDS,
    });
    assert.equal(calls.sessionBody.mode, "code");
    assert.equal(
      JSON.parse(calls.sessionBody.initial_message.common_params).solo_chat_mode,
      "code"
    );
  } finally {
    restore();
  }
});

test("stream: emits OpenAI chunks with deltas, finish_reason stop and [DONE]", async () => {
  const { restore } = installMockFetch({
    frames: [
      { event: "plan_item", data: { id: "p1", thought: "крас" } },
      { event: "plan_item", data: { id: "p1", thought: "красный" } },
      { event: "done", data: { status: "completed" } },
    ],
  });
  try {
    const ex = new TraeExecutor();
    const { response } = await ex.execute({
      model: "auto",
      body: { messages: [{ role: "user", content: "цвет" }] },
      stream: true,
      credentials: CREDS,
    });
    const text = await readAll(response);
    // role chunk first, then content deltas, then finish, then DONE
    assert.match(text, /"delta":\{"role":"assistant"\}/);
    assert.match(text, /"content":"крас"/);
    assert.match(text, /"content":"ный"/); // incremental delta after "крас"
    assert.match(text, /"finish_reason":"stop"/);
    assert.match(text, /data: \[DONE\]/);
  } finally {
    restore();
  }
});

test("upstream error event surfaces as 502 (non-stream)", async () => {
  const { restore } = installMockFetch({
    frames: [{ event: "error", data: { code: 4001, message: "config item is empty" } }],
  });
  try {
    const ex = new TraeExecutor();
    const { response } = await ex.execute({
      model: "deepseek-v3.1",
      body: { messages: [{ role: "user", content: "hi" }] },
      stream: false,
      credentials: CREDS,
    });
    assert.equal(response.status, 502);
    const json = JSON.parse(await readAll(response));
    assert.match(json.error.message, /4001/);
    // error responses must not leak stack traces
    assert.ok(!json.error.message.includes("at /"));
  } finally {
    restore();
  }
});

test("session create failure returns 502", async () => {
  const { restore } = installMockFetch({ sessionBody: "nope", sessionStatus: 500 });
  try {
    const ex = new TraeExecutor();
    const { response } = await ex.execute({
      model: "auto",
      body: { messages: [{ role: "user", content: "hi" }] },
      stream: false,
      credentials: CREDS,
    });
    assert.equal(response.status, 502);
  } finally {
    restore();
  }
});

// ─── refreshCredentials ────────────────────────────────────────────────────

function installRefreshMock(opts: { result?: any; errorCode?: string; httpStatus?: number } = {}) {
  const calls: { url?: string; body?: any } = {};
  const original = globalThis.fetch;
  globalThis.fetch = (async (input: any, init: any = {}) => {
    const url = typeof input === "string" ? input : input.url;
    calls.url = url;
    calls.body = init.body ? JSON.parse(init.body) : undefined;
    const payload = opts.errorCode
      ? { ResponseMetadata: { Error: { Code: opts.errorCode, Message: "bad" } } }
      : { ResponseMetadata: {}, Result: opts.result };
    return new Response(JSON.stringify(payload), {
      status: opts.httpStatus ?? 200,
      headers: { "Content-Type": "application/json" },
    });
  }) as typeof fetch;
  return { calls, restore: () => (globalThis.fetch = original) };
}

test("refreshCredentials posts ExchangeToken with ClientID/RefreshToken and parses Result", async () => {
  const newToken = "NEW_TOKEN_eyJhbGc";
  const newRefresh = "NEW_REFRESH";
  const expMs = Date.UTC(2027, 0, 1, 12, 0, 0); // arbitrary future timestamp
  const { calls, restore } = installRefreshMock({
    result: { Token: newToken, RefreshToken: newRefresh, TokenExpireAt: expMs },
  });
  try {
    const ex = new TraeExecutor();
    const out = await ex.refreshCredentials({
      ...CREDS,
      refreshToken: "OLD_REFRESH",
      providerSpecificData: {
        ...CREDS.providerSpecificData,
        host: "https://api-us-east.trae.ai",
        clientId: "en1oxy7wnw8j9n",
      },
    });
    assert.equal(calls.url, "https://api-us-east.trae.ai/cloudide/api/v3/trae/oauth/ExchangeToken");
    assert.deepEqual(calls.body, {
      ClientID: "en1oxy7wnw8j9n",
      RefreshToken: "OLD_REFRESH",
      ClientSecret: "-",
      UserID: "",
    });
    assert.equal(out?.accessToken, newToken);
    assert.equal(out?.refreshToken, newRefresh);
    assert.equal(out?.expiresAt, new Date(expMs).toISOString());
  } finally {
    restore();
  }
});

test("refreshCredentials returns null when no refresh token is stored", async () => {
  // No fetch should happen; guard catches missing credential up front.
  const original = globalThis.fetch;
  let called = false;
  globalThis.fetch = (async () => {
    called = true;
    return new Response("{}");
  }) as typeof fetch;
  try {
    const ex = new TraeExecutor();
    const out = await ex.refreshCredentials({ ...CREDS, refreshToken: undefined });
    assert.equal(out, null);
    assert.equal(called, false);
  } finally {
    globalThis.fetch = original;
  }
});

test("refreshCredentials throws on RefreshTokenInvalid so the next call surfaces auth failure", async () => {
  const { restore } = installRefreshMock({ errorCode: "RefreshTokenInvalid" });
  try {
    const ex = new TraeExecutor();
    await assert.rejects(
      ex.refreshCredentials({ ...CREDS, refreshToken: "BAD" }),
      /RefreshTokenInvalid/
    );
  } finally {
    restore();
  }
});

test("refreshCredentials keeps the old refresh token when upstream omits a new one", async () => {
  // Trae occasionally returns just Token + TokenExpireAt without rotating
  // RefreshToken — we must preserve the existing one rather than null it out.
  const { restore } = installRefreshMock({
    result: { Token: "NEW", TokenExpireAt: Date.UTC(2027, 0, 1) },
  });
  try {
    const ex = new TraeExecutor();
    const out = await ex.refreshCredentials({ ...CREDS, refreshToken: "STAYS" });
    assert.equal(out?.refreshToken, "STAYS");
  } finally {
    restore();
  }
});

// ─── /authorize callback parser ────────────────────────────────────────────
//
// The HTTP route in src/app/authorize/route.ts is a thin wrapper: parser +
// createProviderConnection + HTML response. The parser is pure and is what we
// unit-test here — DB persistence and the HTML shell are exercised manually
// during the live OAuth flow.

const { parseTraeCallbackQuery } = await import("../../src/app/authorize/parseCallback.ts");

test("parseTraeCallbackQuery extracts the full credential bundle from the Trae callback", () => {
  const userJwt = JSON.stringify({
    ClientID: "en1oxy7wnw8j9n",
    Token: "ACCESS_TOKEN_eyJ",
    RefreshToken: "REFRESH",
    TokenExpireAt: Date.UTC(2026, 5, 6),
    RefreshExpireAt: Date.UTC(2026, 11, 19),
    TokenExpireDuration: 1209600000,
  });
  const userInfo = JSON.stringify({
    UserID: "76428",
    TenantID: "abc",
    Region: "US-East",
    AIRegion: "US",
    ScreenName: "tester",
    NonPlainTextEmail: "u***r@example.com",
  });
  const q = new URLSearchParams({
    isRedirect: "true",
    scope: "solo",
    loginTraceID: "trace-123",
    host: "https://api-us-east.trae.ai",
    userJwt,
    userInfo,
  });
  const result = parseTraeCallbackQuery(q);
  assert.equal(result.ok, true);
  if (!result.ok) return;
  const rec = result.record;
  assert.equal(rec.provider, "trae");
  assert.equal(rec.authType, "oauth");
  assert.equal(rec.accessToken, "ACCESS_TOKEN_eyJ");
  assert.equal(rec.refreshToken, "REFRESH");
  assert.equal(rec.email, "u***r@example.com");
  assert.equal(rec.expiresAt, new Date(Date.UTC(2026, 5, 6)).toISOString());
  assert.equal(rec.providerSpecificData.userId, "76428");
  assert.equal(rec.providerSpecificData.tenantId, "abc");
  assert.equal(rec.providerSpecificData.region, "US-East");
  assert.equal(rec.providerSpecificData.clientId, "en1oxy7wnw8j9n");
  assert.equal(rec.providerSpecificData.host, "https://api-us-east.trae.ai");
  assert.equal(rec.providerSpecificData.authMethod, "oauth_callback");
  // common_params identity must mirror UserID for all three id fields
  assert.equal(rec.providerSpecificData.bizUserId, "76428");
  assert.equal(rec.providerSpecificData.userUniqueId, "76428");
  assert.equal(rec.providerSpecificData.webId, "76428");
});

test("parseTraeCallbackQuery returns an error when userJwt is missing", () => {
  const result = parseTraeCallbackQuery(new URLSearchParams({ scope: "solo" }));
  assert.equal(result.ok, false);
  if (result.ok) return;
  assert.match(result.error, /Missing userJwt/);
});

test("parseTraeCallbackQuery returns an error when userJwt is not valid JSON", () => {
  const result = parseTraeCallbackQuery(new URLSearchParams({ userJwt: "not-json{{{" }));
  assert.equal(result.ok, false);
  if (result.ok) return;
  assert.match(result.error, /Malformed userJwt/);
});

test("parseTraeCallbackQuery falls back to flat refreshToken/refreshExpireAt when nested ones are absent", () => {
  // Real Trae callbacks always nest the bundle inside userJwt, but the spec also
  // exposes flat duplicates. Confirm we fall back cleanly if only the flat copies
  // are present (defensive — protects against schema drift).
  const userJwt = JSON.stringify({ ClientID: "en1oxy7wnw8j9n", Token: "T" });
  const q = new URLSearchParams({
    userJwt,
    refreshToken: "FLAT_REFRESH",
    refreshExpireAt: String(Date.UTC(2027, 0, 1)),
  });
  const result = parseTraeCallbackQuery(q);
  assert.equal(result.ok, true);
  if (!result.ok) return;
  assert.equal(result.record.refreshToken, "FLAT_REFRESH");
  assert.equal(result.record.providerSpecificData.refreshExpireAt, Date.UTC(2027, 0, 1));
});
