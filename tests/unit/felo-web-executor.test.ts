import { describe, it, beforeEach, afterEach } from "node:test";
import assert from "node:assert/strict";
import type { ExecuteInput } from "../../open-sse/executors/base.ts";

const mod = await import("../../open-sse/executors/felo-web.ts");
const { REGISTRY } = await import("../../open-sse/config/providerRegistry.ts");
const { AI_PROVIDERS } = await import("../../src/shared/constants/providers.ts");

const {
  FeloWebExecutor,
  FELO_THREADS_URL,
  feloStreamUrl,
  normalizeFeloModel,
  resolveFeloCategory,
  extractFeloLastUserPrompt,
  buildFeloThreadPayload,
  parseFeloStreamLine,
  accumulateFeloStreamText,
} = mod;

type FetchCall = { url: string; init: RequestInit };

const realFetch = globalThis.fetch;
let calls: FetchCall[] = [];

function threadsResponse(streamKey = "sk-123", status = 200): Response {
  return new Response(JSON.stringify({ stream_key: streamKey }), {
    status,
    headers: { "content-type": "application/json" },
  });
}

/** Build a Felo-shaped `data:{...}` stream body from a list of answer snapshots. */
function feloStreamResponse(answerSnapshots: string[], includeSourcesEvent = false): Response {
  const encoder = new TextEncoder();
  const lines: string[] = [];
  for (const text of answerSnapshots) {
    const contentJson = { data: { type: "answer", data: { text } } };
    lines.push(`data:${JSON.stringify({ content: JSON.stringify(contentJson) })}`);
  }
  if (includeSourcesEvent) {
    const contentJson = {
      data: {
        type: "final_contexts",
        data: { sources: [{ link: "https://example.com", title: "Example" }] },
      },
    };
    lines.push(`data:${JSON.stringify({ content: JSON.stringify(contentJson) })}`);
  }
  const stream = new ReadableStream({
    start(controller) {
      controller.enqueue(encoder.encode(lines.join("\n") + "\n"));
      controller.close();
    },
  });
  return new Response(stream, { status: 200, headers: { "content-type": "text/event-stream" } });
}

function mockFetch(handler: (url: string, init: RequestInit) => Response | Promise<Response>): void {
  globalThis.fetch = (async (input: RequestInfo | URL, init: RequestInit = {}) => {
    const url = String(input);
    calls.push({ url, init });
    return handler(url, init);
  }) as typeof fetch;
}

function jsonBody(init: RequestInit): Record<string, unknown> {
  return JSON.parse(String(init.body)) as Record<string, unknown>;
}

function baseExecuteInput(overrides: Partial<ExecuteInput> = {}): ExecuteInput {
  return {
    model: "felo-chat",
    body: { messages: [{ role: "user", content: "hi" }] },
    stream: false,
    credentials: {},
    signal: null,
    ...overrides,
  };
}

beforeEach(() => {
  calls = [];
});

afterEach(() => {
  globalThis.fetch = realFetch;
});

describe("FeloWebExecutor — registry wiring", () => {
  it("is registered as a canonical noAuth provider (providers.ts)", () => {
    const provider = AI_PROVIDERS["felo-web"];
    assert.ok(provider, "felo-web should be a canonical provider");
    assert.equal(provider.noAuth, true);
  });

  it("is registered in the provider REGISTRY with the felo-web executor", () => {
    const entry = REGISTRY["felo-web"];
    assert.ok(entry, "felo-web should have a REGISTRY entry");
    assert.equal(entry.executor, "felo-web");
    assert.equal(entry.authType, "none");
    assert.ok(entry.models.some((m) => m.id === "felo-chat"));
  });
});

describe("FeloWebExecutor — pure helpers", () => {
  it("normalizeFeloModel: strips the felo-web/ prefix and falls back to felo-chat", () => {
    assert.equal(normalizeFeloModel("felo-web/felo-search"), "felo-search");
    assert.equal(normalizeFeloModel("felo-scholar"), "felo-scholar");
    assert.equal(normalizeFeloModel("not-a-real-model"), "felo-chat");
    assert.equal(normalizeFeloModel(undefined), "felo-chat");
  });

  it("resolveFeloCategory: maps each model alias to its g4f category", () => {
    assert.equal(resolveFeloCategory("felo-chat"), "chat");
    assert.equal(resolveFeloCategory("felo-search"), "google");
    assert.equal(resolveFeloCategory("felo-scholar"), "scholar");
    assert.equal(resolveFeloCategory("felo-social"), "social");
    assert.equal(resolveFeloCategory("felo-document"), "document");
  });

  it("extractFeloLastUserPrompt: picks the last user message, string content", () => {
    const prompt = extractFeloLastUserPrompt([
      { role: "system", content: "be nice" },
      { role: "user", content: "first" },
      { role: "assistant", content: "reply" },
      { role: "user", content: "second" },
    ]);
    assert.equal(prompt, "second");
  });

  it("extractFeloLastUserPrompt: joins array-of-parts content", () => {
    const prompt = extractFeloLastUserPrompt([
      {
        role: "user",
        content: [
          { type: "text", text: "part one" },
          { type: "text", text: "part two" },
        ],
      },
    ]);
    assert.equal(prompt, "part one\npart two");
  });

  it("buildFeloThreadPayload: carries the query and resolved category", () => {
    const payload = buildFeloThreadPayload("felo-search", "hello world");
    assert.equal(payload.query, "hello world");
    assert.equal(payload.category, "google");
    assert.equal(payload.stream_protocol, "message_center_v1");
    assert.equal(typeof payload.search_uuid, "string");
    assert.ok((payload.search_uuid as string).length > 0);
  });

  it("parseFeloStreamLine: ignores non-data lines and malformed JSON", () => {
    assert.deepEqual(parseFeloStreamLine("", "prev"), { newText: null, nextPreviousText: "prev" });
    assert.deepEqual(parseFeloStreamLine("not-a-data-line", "prev"), {
      newText: null,
      nextPreviousText: "prev",
    });
    assert.deepEqual(parseFeloStreamLine("data:{not json", "prev"), {
      newText: null,
      nextPreviousText: "prev",
    });
  });

  it("parseFeloStreamLine: diffs incremental answer snapshots against the running text", () => {
    const line1 = `data:${JSON.stringify({
      content: JSON.stringify({ data: { type: "answer", data: { text: "Hel" } } }),
    })}`;
    const line2 = `data:${JSON.stringify({
      content: JSON.stringify({ data: { type: "answer", data: { text: "Hello" } } }),
    })}`;

    const first = parseFeloStreamLine(line1, "");
    assert.equal(first.newText, "Hel");
    assert.equal(first.nextPreviousText, "Hel");

    const second = parseFeloStreamLine(line2, first.nextPreviousText);
    assert.equal(second.newText, "lo");
    assert.equal(second.nextPreviousText, "Hello");
  });

  it("parseFeloStreamLine: ignores final_contexts events (no OpenAI-compatible slot)", () => {
    const line = `data:${JSON.stringify({
      content: JSON.stringify({
        data: { type: "final_contexts", data: { sources: [{ link: "https://x", title: "X" }] } },
      }),
    })}`;
    assert.deepEqual(parseFeloStreamLine(line, "prev"), { newText: null, nextPreviousText: "prev" });
  });

  it("accumulateFeloStreamText: replays a full stream body into the final text", () => {
    const raw = [
      `data:${JSON.stringify({ content: JSON.stringify({ data: { type: "answer", data: { text: "Hi" } } }) })}`,
      `data:${JSON.stringify({
        content: JSON.stringify({ data: { type: "answer", data: { text: "Hi there" } } }),
      })}`,
    ].join("\n");
    assert.equal(accumulateFeloStreamText(raw), "Hi there");
  });
});

describe("FeloWebExecutor — execute() input validation", () => {
  it("rejects an empty messages array with 400", async () => {
    const executor = new FeloWebExecutor();
    const response = await executor.execute(baseExecuteInput({ body: { messages: [] } }));

    assert.equal(response.status, 400);
    const responseBody = (await response.json()) as { error?: { message?: string } };
    assert.ok(responseBody.error?.message);
  });

  it("rejects messages with no extractable user prompt with 400", async () => {
    const executor = new FeloWebExecutor();
    const response = await executor.execute(
      baseExecuteInput({ body: { messages: [{ role: "system", content: "no user turn" }] } })
    );

    assert.equal(response.status, 400);
  });
});

describe("FeloWebExecutor — execute() happy path (mocked fetch)", () => {
  it("POSTs the thread payload, GETs the stream, and returns non-streaming OpenAI JSON", async () => {
    mockFetch((url) => {
      if (url === FELO_THREADS_URL) return threadsResponse("sk-abc");
      if (url === feloStreamUrl("sk-abc")) return feloStreamResponse(["Hel", "Hello", "Hello there"], true);
      throw new Error(`unexpected fetch: ${url}`);
    });

    const executor = new FeloWebExecutor();
    const response = await executor.execute(baseExecuteInput());

    assert.equal(calls.length, 2, "should call threads then stream exactly once each");
    assert.equal(calls[0].init.method, "POST");
    const threadPayload = jsonBody(calls[0].init);
    assert.equal(threadPayload.query, "hi");
    assert.equal(threadPayload.category, "chat");

    assert.equal(response.status, 200);
    const json = (await response.json()) as {
      choices: Array<{ message: { role: string; content: string }; finish_reason: string }>;
    };
    assert.equal(json.choices[0].message.content, "Hello there");
    assert.equal(json.choices[0].message.role, "assistant");
    assert.equal(json.choices[0].finish_reason, "stop");
  });

  it("streams OpenAI-compatible SSE chunks ending with [DONE]", async () => {
    mockFetch((url) => {
      if (url === FELO_THREADS_URL) return threadsResponse("sk-stream");
      if (url === feloStreamUrl("sk-stream")) return feloStreamResponse(["A", "AB", "ABC"]);
      throw new Error(`unexpected fetch: ${url}`);
    });

    const executor = new FeloWebExecutor();
    const response = await executor.execute(baseExecuteInput({ stream: true }));

    assert.equal(response.status, 200);
    assert.ok(response.body);
    const text = await response.text();
    assert.match(text, /"content":"A"/);
    assert.match(text, /"content":"B"/);
    assert.match(text, /"content":"C"/);
    assert.match(text, /data: \[DONE\]/);
  });
});

describe("FeloWebExecutor — error paths", () => {
  it("propagates a 5xx from thread creation as a sanitized 502", async () => {
    mockFetch((url) => {
      if (url === FELO_THREADS_URL) return new Response("upstream on fire", { status: 503 });
      throw new Error(`unexpected fetch: ${url}`);
    });

    const executor = new FeloWebExecutor();
    const response = await executor.execute(baseExecuteInput());

    assert.equal(response.status, 502);
    const responseBody = (await response.json()) as { error: { message: string } };
    assert.ok(responseBody.error.message.includes("HTTP 503"));
    assert.ok(!responseBody.error.message.includes("at /"), "must not leak a stack trace");
  });

  it("returns 502 when the threads response omits stream_key", async () => {
    mockFetch((url) => {
      if (url === FELO_THREADS_URL) {
        return new Response(JSON.stringify({}), {
          status: 200,
          headers: { "content-type": "application/json" },
        });
      }
      throw new Error(`unexpected fetch: ${url}`);
    });

    const executor = new FeloWebExecutor();
    const response = await executor.execute(baseExecuteInput());

    assert.equal(response.status, 502);
    const responseBody = (await response.json()) as { error: { message: string } };
    assert.match(responseBody.error.message, /stream_key/);
  });
});

describe("FeloWebExecutor — testConnection", () => {
  it("returns true when threads endpoint responds with a stream_key", async () => {
    mockFetch(() => threadsResponse("sk-health"));
    const executor = new FeloWebExecutor();
    assert.equal(await executor.testConnection({}), true);
  });

  it("returns false on a non-ok response", async () => {
    mockFetch(() => new Response("nope", { status: 500 }));
    const executor = new FeloWebExecutor();
    assert.equal(await executor.testConnection({}), false);
  });

  it("returns false on a network error", async () => {
    globalThis.fetch = (async () => {
      throw new Error("network down");
    }) as typeof fetch;
    const executor = new FeloWebExecutor();
    assert.equal(await executor.testConnection({}), false);
  });
});
