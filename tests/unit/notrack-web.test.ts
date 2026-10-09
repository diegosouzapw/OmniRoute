/**
 * Unit tests for the notrack-web executor.
 *
 * Coverage:
 *   - Registration (executor map + alias)
 *   - Cookie parsing (uid + si_usr_id + si_ses_id → clean Cookie)
 *   - Message formatting (single user, system+user, multi-turn, truncation)
 *   - Sampling-parameter prefix generation
 *   - SSE event parsing (chat_meta / user / thinking / delta / message / [DONE])
 *   - Streaming response shape (role, deltas, stop, optional usage)
 *   - Non-stream response shape (content, tool_calls, notrack metadata, usage)
 *   - Error responses (missing messages, missing cookie, encrypted creds,
 *     upstream non-200) — must NOT leak stack traces.
 *
 * Tests use mocked fetch. The upstream notrack.ai endpoint is mocked with
 * controlled SSE/JSON responses — no live network calls.
 */
import test from "node:test";
import assert from "node:assert/strict";

const { NotrackWebExecutor } = await import("../../open-sse/executors/notrack-web.ts");
const { getExecutor, hasSpecializedExecutor } = await import("../../open-sse/executors/index.ts");

// ── Helpers ────────────────────────────────────────────────────────────────

const NOTRACK_URL = "https://notrack.ai/api/dispatch";
const VALID_COOKIE = "uid=abc-123; si_usr_id=user-456; si_ses_id=session-789";

function makeCreds(overrides: { apiKey?: string } = {}) {
  return { apiKey: overrides.apiKey ?? VALID_COOKIE };
}

interface MockCall {
  url: string;
  method: string;
  headers: Record<string, string>;
  body: unknown;
  rawBody: string;
}

function mockFetchOnce(
  status: number,
  body: string | Uint8Array | null,
  contentType = "text/event-stream"
): { calls: MockCall[]; restore: () => void } {
  const original = globalThis.fetch;
  const calls: MockCall[] = [];
  globalThis.fetch = async (url, opts) => {
    const urlStr = typeof url === "string" ? url : url.toString();
    const headers = (opts?.headers as Record<string, string>) ?? {};
    const rawBody =
      typeof opts?.body === "string"
        ? (opts.body as string)
        : opts?.body instanceof Uint8Array
          ? new TextDecoder().decode(opts.body as Uint8Array)
          : "";
    let parsedBody: unknown = rawBody;
    try {
      parsedBody = JSON.parse(rawBody);
    } catch {
      /* keep rawBody */
    }
    calls.push({
      url: urlStr,
      method: opts?.method ?? "GET",
      headers,
      body: parsedBody,
      rawBody,
    });
    let payload: string | Uint8Array | null;
    if (body === null) {
      payload = null;
    } else if (typeof body === "string") {
      payload = body;
    } else {
      payload = new TextDecoder().decode(body);
    }
    return new Response(payload, {
      status,
      headers: { "Content-Type": contentType },
    });
  };
  return { calls, restore: () => (globalThis.fetch = original) };
}

function sseChunks(events: Array<Record<string, unknown> | string>): string {
  const lines = events.map((e) => {
    if (typeof e === "string") return e; // raw line like "[DONE]" already framed
    return `data: ${JSON.stringify(e)}\n`;
  });
  return lines.join("\n") + "\n";
}

async function collectStreamChunks(response: Response): Promise<unknown[]> {
  const text = await response.text();
  const chunks: unknown[] = [];
  for (const part of text.split("\n\n")) {
    const trimmed = part.trim();
    if (!trimmed || trimmed === "data: [DONE]") continue;
    const m = trimmed.match(/^data:\s*(\{.*\})$/s);
    if (!m) continue;
    try {
      chunks.push(JSON.parse(m[1]));
    } catch {
      /* skip non-JSON frames */
    }
  }
  return chunks;
}

// ── Registration ──────────────────────────────────────────────────────────

test("notrack-web: hasSpecializedExecutor + getExecutor for canonical id", async () => {
  assert.equal(hasSpecializedExecutor("notrack-web"), true);
  const exec = await getExecutor("notrack-web");
  assert.ok(exec instanceof NotrackWebExecutor);
});

test("notrack-web: getExecutor returns NotrackWebExecutor for ntw alias", async () => {
  assert.equal(hasSpecializedExecutor("ntw"), true);
  const exec = await getExecutor("ntw");
  assert.ok(exec instanceof NotrackWebExecutor);
});

test("notrack-web: getProvider() returns 'notrack-web'", () => {
  assert.equal(new NotrackWebExecutor().getProvider(), "notrack-web");
});

// ── Cookie parsing ────────────────────────────────────────────────────────

test("notrack-web: rebuilds clean Cookie when all three named cookies are present", async () => {
  const mock = mockFetchOnce(200, sseChunks([{ type: "message", content: "ok", turn: 1 }]));
  try {
    const exec = new NotrackWebExecutor();
    await exec.execute({
      model: "notrack-c",
      body: { messages: [{ role: "user", content: "hi" }] },
      stream: false,
      credentials: makeCreds({
        apiKey: "uid=abc-123; some_other=value; si_usr_id=user-456; si_ses_id=session-789",
      }),
      signal: AbortSignal.timeout(5000),
    });
    const sent = mock.calls[0].headers;
    assert.equal(sent.cookie, "uid=abc-123; si_usr_id=user-456; si_ses_id=session-789");
    // Other cookies should NOT be forwarded.
    assert.ok(!sent.cookie.includes("some_other="));
  } finally {
    mock.restore();
  }
});

test("notrack-web: preserves nt_session auth token while dropping unrelated cookies", async () => {
  const mock = mockFetchOnce(200, sseChunks([{ type: "message", content: "ok", turn: 1 }]));
  try {
    const exec = new NotrackWebExecutor();
    await exec.execute({
      model: "notrack-c",
      body: { messages: [{ role: "user", content: "hi" }] },
      stream: false,
      credentials: makeCreds({
        apiKey:
          "uid=abc-123; si_usr_id=user-456; si_ses_id=session-789; " +
          "nt_session=ntk_liveToken9; _ga=GA1.2.xyz",
      }),
      signal: AbortSignal.timeout(5000),
    });
    const sent = mock.calls[0].headers;
    assert.equal(
      sent.cookie,
      "uid=abc-123; si_usr_id=user-456; si_ses_id=session-789; nt_session=ntk_liveToken9",
      "logged-in nt_session token must survive the rebuild"
    );
    assert.ok(!sent.cookie.includes("_ga="), "unrelated tracking cookies must be dropped");
  } finally {
    mock.restore();
  }
});

test("notrack-web: strips leading 'Cookie:' prefix before parsing", async () => {
  const mock = mockFetchOnce(200, sseChunks([{ type: "message", content: "ok", turn: 1 }]));
  try {
    const exec = new NotrackWebExecutor();
    await exec.execute({
      model: "notrack-c",
      body: { messages: [{ role: "user", content: "hi" }] },
      stream: false,
      credentials: makeCreds({ apiKey: `Cookie: ${VALID_COOKIE}` }),
      signal: AbortSignal.timeout(5000),
    });
    const sent = mock.calls[0].headers;
    assert.equal(sent.cookie, "uid=abc-123; si_usr_id=user-456; si_ses_id=session-789");
  } finally {
    mock.restore();
  }
});

test("notrack-web: forwards raw pasted cookie when named cookies are missing", async () => {
  const raw = "foo=bar; baz=qux";
  const mock = mockFetchOnce(200, sseChunks([{ type: "message", content: "ok", turn: 1 }]));
  try {
    const exec = new NotrackWebExecutor();
    await exec.execute({
      model: "notrack-c",
      body: { messages: [{ role: "user", content: "hi" }] },
      stream: false,
      credentials: makeCreds({ apiKey: raw }),
      signal: AbortSignal.timeout(5000),
    });
    const sent = mock.calls[0].headers;
    assert.equal(sent.cookie, raw);
  } finally {
    mock.restore();
  }
});

test("notrack-web: bulk-imported providerSpecificData.cookie authenticates when apiKey is null", async () => {
  const mock = mockFetchOnce(200, sseChunks([{ type: "message", content: "ok", turn: 1 }]));
  try {
    const exec = new NotrackWebExecutor();
    const result = await exec.execute({
      model: "notrack-c",
      body: { messages: [{ role: "user", content: "hi" }] },
      stream: false,
      credentials: {
        apiKey: "",
        providerSpecificData: { cookie: VALID_COOKIE },
      },
      signal: AbortSignal.timeout(5000),
    });
    assert.equal(result.response.status, 200);
    assert.equal(mock.calls[0].headers.cookie, VALID_COOKIE);
  } finally {
    mock.restore();
  }
});

// ── Missing-cookie / invalid-cookie errors ───────────────────────────────

test("notrack-web: missing cookie → 401 with instructive message", async () => {
  const exec = new NotrackWebExecutor();
  const result = await exec.execute({
    model: "notrack-c",
    body: { messages: [{ role: "user", content: "hi" }] },
    stream: false,
    credentials: { apiKey: "" },
    signal: AbortSignal.timeout(5000),
  });
  assert.equal(result.response.status, 401);
  const body = JSON.parse(await result.response.text());
  assert.match(body.error.message, /Notrack requires a session cookie/);
  // No stack-trace leak
  assert.ok(!body.error.message.includes("at /"));
});

test("notrack-web: encrypted credential blob → 401 with encryption hint", async () => {
  const exec = new NotrackWebExecutor();
  const result = await exec.execute({
    model: "notrack-c",
    body: { messages: [{ role: "user", content: "hi" }] },
    stream: false,
    credentials: { apiKey: "enc:v1:abcdef0123456789" },
    signal: AbortSignal.timeout(5000),
  });
  assert.equal(result.response.status, 401);
  const body = JSON.parse(await result.response.text());
  assert.match(body.error.message, /encrypted/);
  assert.ok(!body.error.message.includes("at /"));
});

// ── Missing / empty messages ─────────────────────────────────────────────

test("notrack-web: missing messages → 400", async () => {
  const exec = new NotrackWebExecutor();
  const result = await exec.execute({
    model: "notrack-c",
    body: {},
    stream: false,
    credentials: makeCreds(),
    signal: AbortSignal.timeout(5000),
  });
  assert.equal(result.response.status, 400);
  const body = JSON.parse(await result.response.text());
  assert.match(body.error.message, /Missing or empty messages array/);
  assert.ok(!body.error.message.includes("at /"));
});

test("notrack-web: empty messages array → 400", async () => {
  const exec = new NotrackWebExecutor();
  const result = await exec.execute({
    model: "notrack-c",
    body: { messages: [] },
    stream: false,
    credentials: makeCreds(),
    signal: AbortSignal.timeout(5000),
  });
  assert.equal(result.response.status, 400);
});

// ── Message formatting via dispatched body ───────────────────────────────

test("notrack-web: single user message → user_input is the verbatim text", async () => {
  const mock = mockFetchOnce(200, sseChunks([{ type: "message", content: "ok", turn: 1 }]));
  try {
    const exec = new NotrackWebExecutor();
    await exec.execute({
      model: "notrack-c",
      body: { messages: [{ role: "user", content: "Hello!" }] },
      stream: false,
      credentials: makeCreds(),
      signal: AbortSignal.timeout(5000),
    });
    const sent = mock.calls[0].body as Record<string, unknown>;
    assert.equal(sent.user_input, "Hello!");
  } finally {
    mock.restore();
  }
});

test("notrack-web: system + single user → soft-prefix system in user_input", async () => {
  const mock = mockFetchOnce(200, sseChunks([{ type: "message", content: "ok", turn: 1 }]));
  try {
    const exec = new NotrackWebExecutor();
    await exec.execute({
      model: "notrack-c",
      body: {
        messages: [
          { role: "system", content: "Be concise." },
          { role: "user", content: "Hi" },
        ],
      },
      stream: false,
      credentials: makeCreds(),
      signal: AbortSignal.timeout(5000),
    });
    const sent = mock.calls[0].body as Record<string, unknown>;
    assert.match(String(sent.user_input), /\(请遵循以下指引回答：Be concise\.\)/);
    assert.match(String(sent.user_input), /\n\nHi$/);
  } finally {
    mock.restore();
  }
});

test("notrack-web: multi-turn → [System]/[User]/[Assistant] inline labels", async () => {
  const mock = mockFetchOnce(200, sseChunks([{ type: "message", content: "ok", turn: 1 }]));
  try {
    const exec = new NotrackWebExecutor();
    await exec.execute({
      model: "notrack-c",
      body: {
        messages: [
          { role: "system", content: "Be helpful." },
          { role: "user", content: "Q1?" },
          { role: "assistant", content: "A1." },
          { role: "user", content: "Q2?" },
        ],
      },
      stream: false,
      credentials: makeCreds(),
      signal: AbortSignal.timeout(5000),
    });
    const sent = mock.calls[0].body as Record<string, unknown>;
    const userInput = String(sent.user_input);
    assert.match(userInput, /\[System\]\nBe helpful\./);
    assert.match(userInput, /\[User\]\nQ1\?/);
    assert.match(userInput, /\[Assistant\]\nA1\./);
    assert.match(userInput, /\[User\]\nQ2\?/);
  } finally {
    mock.restore();
  }
});

test("notrack-web: oversized multi-turn input → truncated via smart truncation", async () => {
  // Build a multi-turn conversation whose rendered text would exceed the
  // MAX_INPUT_CHARS (3800) budget, then assert that the dispatched
  // user_input is bounded.
  const longUserText = "x".repeat(3500);
  const mock = mockFetchOnce(200, sseChunks([{ type: "message", content: "ok", turn: 1 }]));
  try {
    const exec = new NotrackWebExecutor();
    await exec.execute({
      model: "notrack-c",
      body: {
        messages: [
          { role: "system", content: "system-prompt" },
          { role: "user", content: longUserText },
          { role: "user", content: "second" },
          { role: "user", content: "third" },
        ],
      },
      stream: false,
      credentials: makeCreds(),
      signal: AbortSignal.timeout(5000),
    });
    const sent = mock.calls[0].body as Record<string, unknown>;
    const userInput = String(sent.user_input);
    // Bounded above the cap (single-pass truncateMiddle adds ~20 char marker).
    assert.ok(userInput.length <= 4000, `length=${userInput.length}`);
    // System message preserved.
    assert.match(userInput, /\[System\]\nsystem-prompt/);
    // Latest user message preserved.
    assert.match(userInput, /\[User\]\nthird/);
  } finally {
    mock.restore();
  }
});

// ── Tools rendering ───────────────────────────────────────────────────────

test("notrack-web: tools contract → tool system prompt + inline tool_call rendering", async () => {
  const mock = mockFetchOnce(200, sseChunks([{ type: "message", content: "ok", turn: 1 }]));
  try {
    const exec = new NotrackWebExecutor();
    await exec.execute({
      model: "notrack-c",
      body: {
        messages: [
          { role: "system", content: "You can call tools." },
          {
            role: "assistant",
            tool_calls: [
              {
                id: "x1",
                type: "function",
                function: { name: "get_weather", arguments: '{"city":"Tokyo"}' },
              },
            ],
          },
          {
            role: "tool",
            name: "get_weather",
            tool_call_id: "x1",
            content: '{"temp":72}',
          },
          { role: "user", content: "thanks" },
        ],
        tools: [
          {
            type: "function",
            function: {
              name: "get_weather",
              description: "Look up the weather",
              parameters: { type: "object", properties: { city: { type: "string" } } },
            },
          },
        ],
        tool_choice: "auto",
      },
      stream: false,
      credentials: makeCreds(),
      signal: AbortSignal.timeout(5000),
    });
    const sent = mock.calls[0].body as Record<string, unknown>;
    const userInput = String(sent.user_input);
    assert.match(userInput, /Available tools:/);
    assert.match(userInput, /- get_weather: Look up the weather/);
    assert.match(userInput, /\[Tool Result: get_weather\]\n\{"temp":72\}/);
    assert.match(
      userInput,
      /<\u200btool_call>\{"name":"get_weather","arguments":\{"city":"Tokyo"\}\}<\/\u200btool_call>/
    );
  } finally {
    mock.restore();
  }
});

test("notrack-web: tool_choice === 'none' disables tool rendering", async () => {
  const mock = mockFetchOnce(200, sseChunks([{ type: "message", content: "ok", turn: 1 }]));
  try {
    const exec = new NotrackWebExecutor();
    await exec.execute({
      model: "notrack-c",
      body: {
        messages: [
          {
            role: "assistant",
            tool_calls: [
              { id: "x", type: "function", function: { name: "noop", arguments: "{}" } },
            ],
          },
          { role: "user", content: "hi" },
        ],
        tools: [{ type: "function", function: { name: "noop" } }],
        tool_choice: "none",
      },
      stream: false,
      credentials: makeCreds(),
      signal: AbortSignal.timeout(5000),
    });
    const sent = mock.calls[0].body as Record<string, unknown>;
    const userInput = String(sent.user_input);
    // No tool system prompt and no tool_call envelope when tool_choice=none.
    assert.ok(!userInput.includes("Available tools:"));
    assert.ok(!userInput.includes("<tool_call>"));
  } finally {
    mock.restore();
  }
});

// ── Sampling-parameter prefix ────────────────────────────────────────────

test("notrack-web: sampling params (temperature/top_p/max_tokens/seed/response_format) prepend prefix", async () => {
  const mock = mockFetchOnce(200, sseChunks([{ type: "message", content: "ok", turn: 1 }]));
  try {
    const exec = new NotrackWebExecutor();
    await exec.execute({
      model: "notrack-c",
      body: {
        messages: [{ role: "user", content: "Hi" }],
        temperature: 0.2,
        top_p: 0.9,
        max_tokens: 256,
        seed: 42,
        response_format: { type: "json_object" },
        stop: ["END"],
      },
      stream: false,
      credentials: makeCreds(),
      signal: AbortSignal.timeout(5000),
    });
    const sent = mock.calls[0].body as Record<string, unknown>;
    const userInput = String(sent.user_input);
    assert.match(userInput, /\(temperature=0\.2: be focused and deterministic\)/);
    assert.match(userInput, /\(top_p=0\.9: consider diverse options\)/);
    assert.match(userInput, /\(max_tokens=256: keep response under ~256 tokens\)/);
    assert.match(userInput, /\(seed=42: be as deterministic as possible\)/);
    assert.match(
      userInput,
      /\(response_format=json_object: you MUST respond with ONLY valid JSON, no markdown, no explanation, just the JSON object\)/
    );
    assert.match(userInput, /\(stop: end your response before any of these sequences: END\)/);
  } finally {
    mock.restore();
  }
});

// ── Dispatch payload ─────────────────────────────────────────────────────

test("notrack-web: dispatch payload defaults to C/6/usual/normal/null/false", async () => {
  const mock = mockFetchOnce(200, sseChunks([{ type: "message", content: "ok", turn: 1 }]));
  try {
    const exec = new NotrackWebExecutor();
    await exec.execute({
      model: "notrack-c",
      body: { messages: [{ role: "user", content: "hi" }] },
      stream: false,
      credentials: makeCreds(),
      signal: AbortSignal.timeout(5000),
    });
    const sent = mock.calls[0].body as Record<string, unknown>;
    assert.equal(sent.model, "C");
    assert.equal(sent.persona, "normal");
    assert.equal(sent.mode, "usual");
    assert.equal(sent.max_turns, 6);
    assert.equal(sent.chat_id, null);
    assert.deepEqual(sent.attachments, []);
    assert.equal(sent.regenerate, false);
    assert.equal(sent.edit, false);
    assert.equal(sent.edit_mid, null);
  } finally {
    mock.restore();
  }
});

test("notrack-web: dispatch payload honours notrack_* overrides", async () => {
  const mock = mockFetchOnce(200, sseChunks([{ type: "message", content: "ok", turn: 1 }]));
  try {
    const exec = new NotrackWebExecutor();
    await exec.execute({
      model: "notrack-c",
      body: {
        messages: [{ role: "user", content: "hi" }],
        notrack_mode: "research",
        notrack_max_turns: 12,
        notrack_chat_id: "chat-xyz",
        notrack_attachments: [{ kind: "image", id: "img-1" }],
        notrack_regenerate: true,
      },
      stream: false,
      credentials: makeCreds(),
      signal: AbortSignal.timeout(5000),
    });
    const sent = mock.calls[0].body as Record<string, unknown>;
    assert.equal(sent.mode, "research");
    assert.equal(sent.max_turns, 12);
    assert.equal(sent.chat_id, "chat-xyz");
    assert.deepEqual(sent.attachments, [{ kind: "image", id: "img-1" }]);
    assert.equal(sent.regenerate, true);
  } finally {
    mock.restore();
  }
});

// ── Headers + URL ────────────────────────────────────────────────────────

test("notrack-web: dispatches to https://notrack.ai/api/dispatch with required headers", async () => {
  const mock = mockFetchOnce(200, sseChunks([{ type: "message", content: "ok", turn: 1 }]));
  try {
    const exec = new NotrackWebExecutor();
    await exec.execute({
      model: "notrack-c",
      body: { messages: [{ role: "user", content: "hi" }] },
      stream: false,
      credentials: makeCreds(),
      signal: AbortSignal.timeout(5000),
    });
    assert.equal(mock.calls[0].url, NOTRACK_URL);
    const h = mock.calls[0].headers;
    assert.equal(h["content-type"], "application/json");
    assert.equal(h.accept, "*/*");
    assert.equal(h.origin, "https://notrack.ai");
    assert.equal(h.referer, "https://notrack.ai/zh-CN/chat");
    assert.match(h["user-agent"], /Chrome\/150/);
    assert.match(h["accept-language"], /zh-TW/);
    assert.match(h.cookie, /uid=abc-123/);
  } finally {
    mock.restore();
  }
});

test("notrack-web: upstreamExtraHeaders override same-named defaults", async () => {
  const mock = mockFetchOnce(200, sseChunks([{ type: "message", content: "ok", turn: 1 }]));
  try {
    const exec = new NotrackWebExecutor();
    await exec.execute({
      model: "notrack-c",
      body: { messages: [{ role: "user", content: "hi" }] },
      stream: false,
      credentials: makeCreds(),
      signal: AbortSignal.timeout(5000),
      upstreamExtraHeaders: { "user-agent": "MyBot/1.0", "x-custom": "yes" },
    });
    const h = mock.calls[0].headers;
    assert.equal(h["user-agent"], "MyBot/1.0");
    assert.equal(h["x-custom"], "yes");
  } finally {
    mock.restore();
  }
});

// ── Streaming response ────────────────────────────────────────────────────

test("notrack-web: streaming output emits role + content + stop + [DONE]", async () => {
  const upstreamSse = sseChunks([
    { type: "chat_meta", chat_id: "chat-1" },
    { type: "user", message_id: "msg-1" },
    { type: "thinking" },
    { type: "delta", chunk: "Hello " },
    { type: "delta", chunk: "world" },
    { type: "message", content: "ignored-after-delta" },
    "[DONE]",
  ]);
  const mock = mockFetchOnce(200, upstreamSse);
  try {
    const exec = new NotrackWebExecutor();
    const result = await exec.execute({
      model: "notrack-c",
      body: { messages: [{ role: "user", content: "hi" }] },
      stream: true,
      credentials: makeCreds(),
      signal: AbortSignal.timeout(5000),
    });
    assert.equal(result.response.status, 200);
    assert.equal(result.response.headers.get("content-type"), "text/event-stream");

    const chunks = await collectStreamChunks(result.response);
    // First chunk is the role chunk.
    const first = chunks[0] as { choices: Array<{ delta: Record<string, unknown> }> };
    assert.equal(first.choices[0].delta.role, "assistant");
    assert.equal(first.choices[0].delta.content, "");

    // Find thinking / delta / stop chunks.
    const types = chunks.map((c) => {
      const ch = (c as { choices: Array<{ delta: Record<string, unknown> }> }).choices[0];
      return ch.delta;
    });
    const sawThinking = types.some((d) => d.reasoning === "[thinking]");
    const sawContent1 = types.some((d) => d.content === "Hello ");
    const sawContent2 = types.some((d) => d.content === "world");
    const sawStop = chunks.some(
      (c) =>
        (c as { choices: Array<{ finish_reason: string | null }> }).choices[0]?.finish_reason ===
        "stop"
    );
    assert.ok(sawThinking, "expected thinking delta");
    assert.ok(sawContent1, "expected first content delta");
    assert.ok(sawContent2, "expected second content delta");
    assert.ok(sawStop, "expected stop chunk");

    // The fallback `message` event after a delta must NOT produce an extra chunk.
    const contentChunks = types.filter(
      (d) => typeof d.content === "string" && (d.content as string).length > 0
    );
    assert.equal(
      contentChunks.length,
      2,
      "fallback `message` event after delta must be suppressed"
    );
  } finally {
    mock.restore();
  }
});

test("notrack-web: streaming usage chunk emitted when include_usage=true", async () => {
  const upstreamSse = sseChunks([
    { type: "delta", chunk: "Hi" },
    { type: "delta", chunk: " there" },
    "[DONE]",
  ]);
  const mock = mockFetchOnce(200, upstreamSse);
  try {
    const exec = new NotrackWebExecutor();
    const result = await exec.execute({
      model: "notrack-c",
      body: {
        messages: [{ role: "user", content: "hi" }],
        stream_options: { include_usage: true },
      },
      stream: true,
      credentials: makeCreds(),
      signal: AbortSignal.timeout(5000),
    });
    const chunks = await collectStreamChunks(result.response);
    const usageChunk = chunks.find((c) => (c as { usage?: unknown }).usage !== undefined) as
      { usage: Record<string, number> } | undefined;
    assert.ok(usageChunk, "expected a usage chunk");
    assert.ok(typeof usageChunk.usage.prompt_tokens === "number");
    assert.ok(typeof usageChunk.usage.completion_tokens === "number");
    assert.ok(typeof usageChunk.usage.total_tokens === "number");
    assert.equal(
      usageChunk.usage.total_tokens,
      usageChunk.usage.prompt_tokens + usageChunk.usage.completion_tokens
    );
  } finally {
    mock.restore();
  }
});

test("notrack-web: streaming flushes a final data line with no trailing newline", async () => {
  const upstreamSse = `data: ${JSON.stringify({ type: "delta", chunk: "tail" })}`;
  const mock = mockFetchOnce(200, upstreamSse);
  try {
    const exec = new NotrackWebExecutor();
    const result = await exec.execute({
      model: "notrack-c",
      body: { messages: [{ role: "user", content: "hi" }] },
      stream: true,
      credentials: makeCreds(),
      signal: AbortSignal.timeout(5000),
    });
    const chunks = await collectStreamChunks(result.response);
    const text = chunks
      .map(
        (c) => (c as { choices: Array<{ delta: { content?: string } }> }).choices[0]?.delta?.content
      )
      .filter((s): s is string => typeof s === "string")
      .join("");
    assert.ok(text.includes("tail"), `final unterminated data line was dropped: "${text}"`);
  } finally {
    mock.restore();
  }
});

test("notrack-web: non-stream flushes a final message event with no trailing newline", async () => {
  const upstreamSse = `data: ${JSON.stringify({ type: "message", content: "snap-no-newline", turn: 2 })}`;
  const mock = mockFetchOnce(200, upstreamSse);
  try {
    const exec = new NotrackWebExecutor();
    const result = await exec.execute({
      model: "notrack-c",
      body: { messages: [{ role: "user", content: "hi" }] },
      stream: false,
      credentials: makeCreds(),
      signal: AbortSignal.timeout(5000),
    });
    const json = JSON.parse(await result.response.text());
    assert.equal(json.choices[0].message.content, "snap-no-newline");
    assert.equal(json.notrack.assistant_turn, 2);
  } finally {
    mock.restore();
  }
});

test("notrack-web: streaming handles CRLF line endings and partial chunks", async () => {
  // Send events split across two enqueues to exercise the buffer + CRLF strip.
  const encoder = new TextEncoder();
  const original = globalThis.fetch;
  const calls: Array<{ headers: Record<string, string> }> = [];
  globalThis.fetch = async (_url, opts) => {
    calls.push({ headers: (opts?.headers as Record<string, string>) ?? {} });
    const stream = new ReadableStream({
      start(controller) {
        controller.enqueue(encoder.encode('data: {"type":"delta","chunk":"Hel'));
        controller.enqueue(
          encoder.encode(
            'lo"}\r\ndata: {"type":"delta","chunk":" world"}\r\n\r\ndata: [DONE]\r\n\r\n'
          )
        );
        controller.close();
      },
    });
    return new Response(stream, { status: 200, headers: { "Content-Type": "text/event-stream" } });
  };

  try {
    const exec = new NotrackWebExecutor();
    const result = await exec.execute({
      model: "notrack-c",
      body: { messages: [{ role: "user", content: "hi" }] },
      stream: true,
      credentials: makeCreds(),
      signal: AbortSignal.timeout(5000),
    });
    const chunks = await collectStreamChunks(result.response);
    const text = chunks
      .map(
        (c) => (c as { choices: Array<{ delta: { content?: string } }> }).choices[0]?.delta?.content
      )
      .filter((s): s is string => typeof s === "string")
      .join("");
    assert.equal(text, "Hello world");
  } finally {
    globalThis.fetch = original;
  }
});

// ── Non-streaming response ───────────────────────────────────────────────

test("notrack-web: non-stream response carries content + notrack metadata + usage", async () => {
  const mock = mockFetchOnce(
    200,
    sseChunks([
      { type: "chat_meta", chat_id: "chat-abc" },
      { type: "user", message_id: "msg-xyz" },
      { type: "delta", chunk: "Hello ", turn: 3 },
      { type: "delta", chunk: "world" },
    ])
  );
  try {
    const exec = new NotrackWebExecutor();
    const result = await exec.execute({
      model: "notrack-c",
      body: { messages: [{ role: "user", content: "hi" }] },
      stream: false,
      credentials: makeCreds(),
      signal: AbortSignal.timeout(5000),
    });
    assert.equal(result.response.status, 200);
    const json = JSON.parse(await result.response.text());
    assert.equal(json.object, "chat.completion");
    assert.equal(json.model, "notrack-c");
    assert.equal(json.choices[0].message.role, "assistant");
    assert.equal(json.choices[0].message.content, "Hello world");
    assert.equal(json.choices[0].finish_reason, "stop");
    assert.equal(json.notrack.chat_id, "chat-abc");
    assert.equal(json.notrack.user_message_id, "msg-xyz");
    assert.equal(json.notrack.assistant_turn, 3);
    assert.ok(json.usage.prompt_tokens > 0);
    assert.ok(json.usage.completion_tokens > 0);
    assert.equal(json.usage.total_tokens, json.usage.prompt_tokens + json.usage.completion_tokens);
  } finally {
    mock.restore();
  }
});

test("notrack-web: non-stream falls back to `message` event when no delta received", async () => {
  const mock = mockFetchOnce(
    200,
    sseChunks([
      { type: "chat_meta", chat_id: "chat-fb" },
      { type: "message", content: "snapshot answer", turn: 1 },
    ])
  );
  try {
    const exec = new NotrackWebExecutor();
    const result = await exec.execute({
      model: "notrack-c",
      body: { messages: [{ role: "user", content: "hi" }] },
      stream: false,
      credentials: makeCreds(),
      signal: AbortSignal.timeout(5000),
    });
    const json = JSON.parse(await result.response.text());
    assert.equal(json.choices[0].message.content, "snapshot answer");
    assert.equal(json.notrack.chat_id, "chat-fb");
  } finally {
    mock.restore();
  }
});

test("notrack-web: non-stream with tools → parses <tool_call> blocks", async () => {
  const toolEnvelope = `<\u200btool_call>{"name":"get_weather","arguments":{"city":"SF"}}</\u200btool_call>`;
  const mock = mockFetchOnce(
    200,
    sseChunks([
      { type: "delta", chunk: "calling tool...\n" },
      { type: "delta", chunk: toolEnvelope },
    ])
  );
  try {
    const exec = new NotrackWebExecutor();
    const result = await exec.execute({
      model: "notrack-c",
      body: {
        messages: [{ role: "user", content: "weather in SF?" }],
        tools: [{ type: "function", function: { name: "get_weather" } }],
        tool_choice: "auto",
      },
      stream: false,
      credentials: makeCreds(),
      signal: AbortSignal.timeout(5000),
    });
    const json = JSON.parse(await result.response.text());
    assert.equal(json.choices[0].finish_reason, "tool_calls");
    const calls = json.choices[0].message.tool_calls as Array<{
      id: string;
      type: string;
      function: { name: string; arguments: string };
    }>;
    assert.equal(calls.length, 1);
    assert.equal(calls[0].function.name, "get_weather");
    assert.equal(calls[0].function.arguments, '{"city":"SF"}');
    // Text content (with envelope stripped) is preserved in message.content.
    assert.match(json.choices[0].message.content, /calling tool/);
    assert.ok(!json.choices[0].message.content.includes("<tool_call>"));
  } finally {
    mock.restore();
  }
});

test("notrack-web: response_format=json_object → extracts first JSON object from reply", async () => {
  const replyText = 'Sure! Here is the JSON you asked for: {"answer": 42, "ok": true}';
  const mock = mockFetchOnce(200, sseChunks([{ type: "delta", chunk: replyText }]));
  try {
    const exec = new NotrackWebExecutor();
    const result = await exec.execute({
      model: "notrack-c",
      body: {
        messages: [{ role: "user", content: "give me json" }],
        response_format: { type: "json_object" },
      },
      stream: false,
      credentials: makeCreds(),
      signal: AbortSignal.timeout(5000),
    });
    const json = JSON.parse(await result.response.text());
    const content = json.choices[0].message.content;
    assert.ok(typeof content === "string");
    const parsed = JSON.parse(content);
    assert.deepEqual(parsed, { answer: 42, ok: true });
  } finally {
    mock.restore();
  }
});

test("notrack-web: response_format=json_schema keeps reply as text when no JSON found", async () => {
  const replyText = "I cannot comply.";
  const mock = mockFetchOnce(200, sseChunks([{ type: "delta", chunk: replyText }]));
  try {
    const exec = new NotrackWebExecutor();
    const result = await exec.execute({
      model: "notrack-c",
      body: {
        messages: [{ role: "user", content: "hi" }],
        response_format: { type: "json_schema", json_schema: { schema: {} } },
      },
      stream: false,
      credentials: makeCreds(),
      signal: AbortSignal.timeout(5000),
    });
    const json = JSON.parse(await result.response.text());
    assert.equal(json.choices[0].message.content, replyText);
  } finally {
    mock.restore();
  }
});

// ── Upstream error handling ─────────────────────────────────────────────

test("notrack-web: upstream 401 → 401 with auth-failure hint", async () => {
  const mock = mockFetchOnce(401, "Unauthorized", "text/plain");
  try {
    const exec = new NotrackWebExecutor();
    const result = await exec.execute({
      model: "notrack-c",
      body: { messages: [{ role: "user", content: "hi" }] },
      stream: false,
      credentials: makeCreds(),
      signal: AbortSignal.timeout(5000),
    });
    assert.equal(result.response.status, 401);
    const body = JSON.parse(await result.response.text());
    assert.match(body.error.message, /Notrack auth failed/);
    assert.match(body.error.message, /uid/);
    assert.ok(!body.error.message.includes("at /"));
  } finally {
    mock.restore();
  }
});

test("notrack-web: upstream 429 → 429 with rate-limit hint", async () => {
  const mock = mockFetchOnce(429, "rate limited", "text/plain");
  try {
    const exec = new NotrackWebExecutor();
    const result = await exec.execute({
      model: "notrack-c",
      body: { messages: [{ role: "user", content: "hi" }] },
      stream: false,
      credentials: makeCreds(),
      signal: AbortSignal.timeout(5000),
    });
    assert.equal(result.response.status, 429);
    const body = JSON.parse(await result.response.text());
    assert.match(body.error.message, /rate limited/i);
    assert.ok(!body.error.message.includes("at /"));
  } finally {
    mock.restore();
  }
});

test("notrack-web: upstream 500 → 502 (sanitized body)", async () => {
  const mock = mockFetchOnce(500, "boom\n    at /usr/src/app/x.ts:42:5", "text/plain");
  try {
    const exec = new NotrackWebExecutor();
    const result = await exec.execute({
      model: "notrack-c",
      body: { messages: [{ role: "user", content: "hi" }] },
      stream: false,
      credentials: makeCreds(),
      signal: AbortSignal.timeout(5000),
    });
    assert.equal(result.response.status, 502);
    const body = JSON.parse(await result.response.text());
    // No raw stack-trace path leaked into the message.
    assert.ok(!body.error.message.includes("at /"));
    assert.ok(!body.error.message.includes("/usr/src/app/x.ts"));
  } finally {
    mock.restore();
  }
});

test("notrack-web: fetch throws with stack → error response does not leak the stack", async () => {
  const original = globalThis.fetch;
  globalThis.fetch = async () => {
    throw new Error("Socket closed\n    at /Users/me/proj/executor.ts:123:5");
  };
  try {
    const exec = new NotrackWebExecutor();
    const result = await exec.execute({
      model: "notrack-c",
      body: { messages: [{ role: "user", content: "hi" }] },
      stream: false,
      credentials: makeCreds(),
      signal: AbortSignal.timeout(5000),
    });
    assert.ok(result.response.status >= 400);
    const body = JSON.parse(await result.response.text());
    const msg = body.error?.message ?? "";
    assert.ok(!msg.includes("at /"), `stack trace leaked: ${msg}`);
    assert.ok(!msg.includes("/Users/me/proj/executor.ts"));
  } finally {
    globalThis.fetch = original;
  }
});

test("notrack-web: null upstream body → 502", async () => {
  const mock = mockFetchOnce(200, null as unknown as string);
  try {
    const exec = new NotrackWebExecutor();
    const result = await exec.execute({
      model: "notrack-c",
      body: { messages: [{ role: "user", content: "hi" }] },
      stream: false,
      credentials: makeCreds(),
      signal: AbortSignal.timeout(5000),
    });
    assert.equal(result.response.status, 502);
    const body = JSON.parse(await result.response.text());
    assert.match(body.error.message, /empty response body/);
    assert.ok(!body.error.message.includes("at /"));
  } finally {
    mock.restore();
  }
});

// ── Alias normalization in response ──────────────────────────────────────

test("notrack-web: response.model canonicalizes ntw/C/notrack aliases to notrack-c", async () => {
  for (const alias of ["ntw", "C", "notrack"]) {
    const mock = mockFetchOnce(200, sseChunks([{ type: "message", content: "ok", turn: 1 }]));
    try {
      const exec = new NotrackWebExecutor();
      const result = await exec.execute({
        model: alias,
        body: { messages: [{ role: "user", content: "hi" }] },
        stream: false,
        credentials: makeCreds(),
        signal: AbortSignal.timeout(5000),
      });
      const json = JSON.parse(await result.response.text());
      assert.equal(json.model, "notrack-c", `alias=${alias}`);
    } finally {
      mock.restore();
    }
  }
});
