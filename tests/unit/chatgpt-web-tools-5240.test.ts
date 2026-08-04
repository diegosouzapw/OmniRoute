// Tool-call emulation for the ChatGPT Web executor (#5240).
//
// chatgpt-web was omitted from the #3259 prompt-emulation rollout: body.tools
// was never read and both response builders hardcoded finish_reason:"stop".
// These tests live in a dedicated file (chatgpt-web.test.ts is a frozen
// god-file at the file-size cap and cannot grow).

import test from "node:test";
import assert from "node:assert/strict";

const { ChatGptWebExecutor, __resetChatGptWebCachesForTesting } = await import(
  "../../open-sse/executors/chatgpt-web.ts"
);
const { __setTlsFetchOverrideForTesting } = await import(
  "../../open-sse/services/chatgptTlsClient.ts"
);

// ─── Minimal TLS-fetch mock ──────────────────────────────────────────────────
// Tailored to the tool-call flow (gpt-5.3-instant, non-thinking): root/DPL,
// session→accessToken, sentinel→token (no PoW), conv→SSE. Warmup GETs fall
// through to 404, which the executor tolerates.

function makeHeaders(map: Record<string, string> = {}) {
  const h = new Headers();
  for (const [k, v] of Object.entries(map)) h.set(k, String(v));
  return h;
}

function sseText(events: unknown[]): string {
  return events.map((e) => `data: ${JSON.stringify(e)}\r\n\r\n`).join("") + "data: [DONE]\r\n\r\n";
}

/** A single finished assistant turn whose text is `parts`. */
function convWithAssistantText(parts: string) {
  return [
    {
      conversation_id: "tc-1",
      message: {
        id: "tm-1",
        author: { role: "assistant" },
        content: { content_type: "text", parts: [parts] },
        status: "in_progress",
      },
    },
    {
      conversation_id: "tc-1",
      message: {
        id: "tm-1",
        author: { role: "assistant" },
        content: { content_type: "text", parts: [parts] },
        status: "finished_successfully",
      },
    },
  ];
}

function installMockFetch(convEvents: unknown[]) {
  const calls = { urls: [] as string[], bodies: [] as unknown[] };

  __setTlsFetchOverrideForTesting(async (url: string, opts: any = {}) => {
    const u = String(url);
    calls.urls.push(u);
    calls.bodies.push(opts.body);
    const json = (body: unknown, status = 200) => ({
      status,
      headers: makeHeaders({ "Content-Type": "application/json" }),
      text: JSON.stringify(body),
      body: null,
    });

    if ((u === "https://chatgpt.com/" || u === "https://chatgpt.com") && (opts.method || "GET") === "GET") {
      return {
        status: 200,
        headers: makeHeaders({ "Content-Type": "text/html" }),
        text: '<html data-build="prod-test123"><script src="https://cdn.oaistatic.com/_next/static/chunks/main-test.js"></script></html>',
        body: null,
      };
    }
    if (u.includes("/api/auth/session")) {
      return json({
        accessToken: "jwt-abc",
        expires: new Date(Date.now() + 3600_000).toISOString(),
        user: { id: "user-1" },
      });
    }
    if (u.includes("/sentinel/chat-requirements")) {
      return json({ token: "req-token", proofofwork: { required: false } });
    }
    if (
      u.endsWith("/backend-api/f/conversation") ||
      u.endsWith("/backend-api/conversation") ||
      /\/backend-api\/(f\/)?conversation\?/.test(u)
    ) {
      return {
        status: 200,
        headers: makeHeaders({ "Content-Type": "text/event-stream" }),
        text: sseText(convEvents),
        body: null,
      };
    }
    // Warmup (/me, /conversations, /models) — tolerated.
    return { status: 404, headers: makeHeaders(), text: "not mocked", body: null };
  });

  return {
    calls,
    restore() {
      __setTlsFetchOverrideForTesting(null);
    },
  };
}

const WEATHER_TOOL = {
  type: "function",
  function: {
    name: "get_weather",
    description: "Get the current weather for a location",
    parameters: {
      type: "object",
      properties: { location: { type: "string" } },
      required: ["location"],
    },
  },
};

const TOOL_CALL_TEXT = '<tool>{"name":"get_weather","arguments":{"location":"Tokyo"}}</tool>';

function baseOpts(extra: Record<string, unknown>) {
  return {
    model: "gpt-5.3-instant",
    credentials: { apiKey: "test" },
    signal: AbortSignal.timeout(10_000),
    log: null,
    ...extra,
  };
}

test("Tools request-side: <tool> contract is serialized into the upstream system message (#5240)", async () => {
  __resetChatGptWebCachesForTesting();
  const m = installMockFetch(convWithAssistantText("ok"));
  try {
    const executor = new ChatGptWebExecutor();
    await executor.execute(
      baseOpts({
        body: {
          messages: [{ role: "user", content: "What is the weather in Tokyo?" }],
          tools: [WEATHER_TOOL],
        },
        stream: false,
      }) as any
    );

    const convIdx = m.calls.urls.findIndex((u) => u.endsWith("/backend-api/f/conversation"));
    assert.ok(convIdx >= 0, "conversation endpoint was hit");
    const convBody = JSON.parse(m.calls.bodies[convIdx] as string);
    const systemMsg = convBody.messages.find((mm: any) => mm.author.role === "system");
    assert.ok(systemMsg, "a system message carrying the tool contract was sent");
    const systemText = systemMsg.content.parts.join("");
    assert.match(systemText, /<tool>/, "system prompt instructs the model to emit <tool> blocks");
    assert.match(systemText, /get_weather/, "system prompt lists the requested tool");
  } finally {
    m.restore();
  }
});

test("Tools non-stream: <tool>{...}</tool> text becomes OpenAI tool_calls + finish_reason (#5240)", async () => {
  __resetChatGptWebCachesForTesting();
  const m = installMockFetch(convWithAssistantText(TOOL_CALL_TEXT));
  try {
    const executor = new ChatGptWebExecutor();
    const result = await executor.execute(
      baseOpts({
        body: {
          messages: [{ role: "user", content: "What is the weather in Tokyo?" }],
          tools: [WEATHER_TOOL],
        },
        stream: false,
      }) as any
    );

    assert.equal(result.response.status, 200);
    const json = await result.response.json();
    assert.equal(json.choices[0].finish_reason, "tool_calls");
    const tc = json.choices[0].message.tool_calls;
    assert.ok(Array.isArray(tc) && tc.length === 1, "exactly one tool_call");
    assert.equal(tc[0].type, "function");
    assert.equal(tc[0].function.name, "get_weather");
    assert.equal(typeof tc[0].function.arguments, "string", "arguments is a JSON string");
    assert.deepEqual(JSON.parse(tc[0].function.arguments), { location: "Tokyo" });
    assert.equal(json.choices[0].message.content, null);
  } finally {
    m.restore();
  }
});

test("Tools stream: terminal chunk carries delta.tool_calls + finish_reason tool_calls (#5240)", async () => {
  __resetChatGptWebCachesForTesting();
  const m = installMockFetch(convWithAssistantText(TOOL_CALL_TEXT));
  try {
    const executor = new ChatGptWebExecutor();
    const result = await executor.execute(
      baseOpts({
        body: {
          messages: [{ role: "user", content: "What is the weather in Tokyo?" }],
          tools: [WEATHER_TOOL],
          stream: true,
        },
        stream: true,
      }) as any
    );

    assert.equal(result.response.status, 200);
    assert.equal(result.response.headers.get("Content-Type"), "text/event-stream");

    const text = await result.response.text();
    const chunks = text
      .split("\n")
      .filter((l) => l.startsWith("data: ") && !l.includes("[DONE]"))
      .map((l) => JSON.parse(l.slice(6)));

    const toolChunk = chunks.find((c) => c.choices[0].delta && c.choices[0].delta.tool_calls);
    assert.ok(toolChunk, "a chunk carries delta.tool_calls");
    assert.equal(toolChunk.choices[0].finish_reason, "tool_calls");
    const tc = toolChunk.choices[0].delta.tool_calls;
    assert.equal(tc[0].function.name, "get_weather");
    assert.deepEqual(JSON.parse(tc[0].function.arguments), { location: "Tokyo" });

    const lastLine = text.trim().split("\n").filter(Boolean).pop();
    assert.equal(lastLine, "data: [DONE]");
  } finally {
    m.restore();
  }
});

test("Tools regression: no-tools request still streams plain content with finish_reason stop (#5240)", async () => {
  __resetChatGptWebCachesForTesting();
  const m = installMockFetch(convWithAssistantText("Just plain text, no tools."));
  try {
    const executor = new ChatGptWebExecutor();
    const result = await executor.execute(
      baseOpts({
        body: { messages: [{ role: "user", content: "hi" }], stream: true },
        stream: true,
      }) as any
    );

    const text = await result.response.text();
    const chunks = text
      .split("\n")
      .filter((l) => l.startsWith("data: ") && !l.includes("[DONE]"))
      .map((l) => JSON.parse(l.slice(6)));

    assert.ok(
      chunks.some(
        (c) => c.choices[0].delta && c.choices[0].delta.content === "Just plain text, no tools."
      ),
      "plain content is streamed"
    );
    assert.ok(
      chunks.every((c) => !(c.choices[0].delta && c.choices[0].delta.tool_calls)),
      "no tool_calls emitted without a tools array"
    );
    const finishChunk = chunks.find((c) => c.choices[0].finish_reason);
    assert.equal(finishChunk.choices[0].finish_reason, "stop");
  } finally {
    m.restore();
  }
});
