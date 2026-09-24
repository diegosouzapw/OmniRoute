// Integration guard for the reasoning-cache write path on a Responses-API target.
//
// tests/unit/chatcore-reasoning-cache-write-guard.test.ts proves the capture sites
// fire for a Chat-format upstream (xiaomi-mimo) and deliberately avoids DeepSeek
// because its wire format is openai-responses. This file covers exactly that lane:
// opencode-go/deepseek-v4-flash is dispatched to `/responses`, so the translated
// upstream body carries `input`, not `messages`, and the plain-turn cache key must
// be built from the pivot transcript `translateRequest` reports instead.
//
// Same convention as the sibling file: mock fetch, call the real handleChatCore,
// assert real behavior — here the observable behavior is the SECOND turn's upstream
// request body: a client that replays history without `reasoning_content` must
// still produce a `reasoning` input item ahead of the assistant message, or
// DeepSeek answers `400 The reasoning_text in the thinking mode must be passed back`.
import { test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(
  path.join(os.tmpdir(), "omniroute-chatcore-reasoning-cache-write-guard-responses-")
);
process.env.DATA_DIR = TEST_DATA_DIR;

const { handleChatCore } = await import("../../open-sse/handlers/chatCore.ts");
const { clearReasoningCacheAll } = await import("../../open-sse/services/reasoningCache.ts");
const core = await import("../../src/lib/db/core.ts");

type JsonRecord = Record<string, unknown>;

const PROVIDER = "opencode-go";
const MODEL = "deepseek-v4-flash";
const REASONING = "The user only wants a greeting, so no tool is needed.";
const TOOLS = [
  {
    type: "function",
    function: {
      name: "read_file",
      description: "Read a file",
      parameters: { type: "object", properties: { path: { type: "string" } } },
    },
  },
];

function noopLog() {
  return { debug() {}, info() {}, warn() {}, error() {} };
}

function completedResponse() {
  return {
    id: "resp_reasoning_guard",
    object: "response",
    status: "completed",
    model: MODEL,
    output: [
      {
        type: "reasoning",
        id: "rs_reasoning_guard",
        summary: [],
        content: [{ type: "reasoning_text", text: REASONING }],
      },
      {
        type: "message",
        id: "msg_reasoning_guard",
        role: "assistant",
        status: "completed",
        content: [{ type: "output_text", text: "Hi!", annotations: [] }],
      },
    ],
    usage: { input_tokens: 1, output_tokens: 1, total_tokens: 2 },
  };
}

function nonStreamingUpstreamResponse() {
  return new Response(JSON.stringify(completedResponse()), {
    status: 200,
    headers: { "content-type": "application/json" },
  });
}

function streamingUpstreamResponse() {
  const completed = completedResponse();
  const events: Array<[string, JsonRecord]> = [
    [
      "response.created",
      { type: "response.created", response: { ...completed, status: "in_progress", output: [] } },
    ],
    [
      "response.output_item.added",
      {
        type: "response.output_item.added",
        output_index: 0,
        item: { type: "reasoning", id: "rs_reasoning_guard", summary: [], content: [] },
      },
    ],
    [
      "response.reasoning_text.delta",
      {
        type: "response.reasoning_text.delta",
        item_id: "rs_reasoning_guard",
        output_index: 0,
        content_index: 0,
        delta: REASONING,
      },
    ],
    [
      "response.output_item.done",
      { type: "response.output_item.done", output_index: 0, item: completed.output[0] },
    ],
    [
      "response.output_item.added",
      {
        type: "response.output_item.added",
        output_index: 1,
        item: {
          type: "message",
          id: "msg_reasoning_guard",
          role: "assistant",
          status: "in_progress",
          content: [],
        },
      },
    ],
    [
      "response.output_text.delta",
      {
        type: "response.output_text.delta",
        item_id: "msg_reasoning_guard",
        output_index: 1,
        content_index: 0,
        delta: "Hi!",
      },
    ],
    [
      "response.output_item.done",
      { type: "response.output_item.done", output_index: 1, item: completed.output[1] },
    ],
    ["response.completed", { type: "response.completed", response: completed }],
  ];
  const sseBody = events
    .map(([event, data]) => `event: ${event}\ndata: ${JSON.stringify(data)}\n\n`)
    .join("");
  return new Response(sseBody, {
    status: 200,
    headers: { "content-type": "text/event-stream" },
  });
}

async function drain(result: { success?: boolean; response?: Response }) {
  if (!result.success || !result.response) return;
  if (result.response.body) {
    const reader = result.response.body.getReader();
    for (;;) {
      const { done } = await reader.read();
      if (done) break;
    }
  } else {
    try {
      await result.response.text();
    } catch {}
  }
  await new Promise((resolve) => setImmediate(resolve));
}

/**
 * Runs one client turn through the real handleChatCore against a mocked upstream and
 * returns the JSON body OmniRoute sent upstream.
 */
async function runTurn(
  session: string,
  messages: unknown[],
  stream: boolean,
  upstream: () => Response
): Promise<JsonRecord> {
  const originalFetch = globalThis.fetch;
  const sent: Array<{ url: string; body: JsonRecord }> = [];
  globalThis.fetch = (async (input: unknown, init?: { body?: unknown }) => {
    const url = String((input as { url?: unknown })?.url ?? input);
    if (typeof init?.body === "string") {
      sent.push({ url, body: JSON.parse(init.body) as JsonRecord });
    }
    return upstream();
  }) as typeof fetch;
  try {
    const body = { model: MODEL, messages, tools: TOOLS, stream };
    const result = await handleChatCore({
      body,
      modelInfo: { provider: PROVIDER, model: MODEL, extendedContext: false },
      credentials: { apiKey: "sk-test", providerSpecificData: {} },
      log: noopLog(),
      clientRawRequest: {
        endpoint: "/v1/chat/completions",
        body,
        headers: new Headers({ accept: stream ? "text/event-stream" : "application/json" }),
      },
      userAgent: "unit-test",
      sessionAffinityKey: session,
    } as never);
    await drain(result as { success?: boolean; response?: Response });
  } finally {
    globalThis.fetch = originalFetch;
  }
  // Select the Responses-lane dispatch by URL rather than "last fetch", so an
  // unrelated POST inside the handler window can neither satisfy nor break this.
  const responsesCalls = sent.filter((call) => /\/responses(\?|$)/.test(call.url));
  assert.equal(responsesCalls.length, 1, `exactly one /responses dispatch (saw ${sent.length})`);
  return responsesCalls[0].body;
}

function reasoningTexts(input: unknown): string[] {
  return (Array.isArray(input) ? input : [])
    .filter((item) => (item as JsonRecord)?.type === "reasoning")
    .map((item) =>
      ((item as JsonRecord).content as Array<{ text?: string }>)
        .map((part) => part.text ?? "")
        .join("")
    );
}

const TURN_1 = [
  { role: "system", content: "You are helpful." },
  { role: "user", content: "Say hi first, no tools." },
];
const TURN_2 = [
  ...TURN_1,
  // The client replays the plain assistant turn WITHOUT reasoning_content.
  { role: "assistant", content: "Hi!" },
  { role: "user", content: "Now read README.md" },
];

test.after(() => {
  try {
    core.resetDbInstance();
  } catch {}
  try {
    clearReasoningCacheAll();
  } catch {}
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("non-streaming: a plain turn captured from a Responses upstream is replayed on the next turn", async () => {
  clearReasoningCacheAll();
  const session = "reasoning-cache-write-guard-responses-nonstream";
  const first = await runTurn(session, TURN_1, false, nonStreamingUpstreamResponse);
  assert.ok(Array.isArray(first.input), "turn 1 went upstream as a Responses body");
  assert.equal(first.messages, undefined);

  const second = await runTurn(session, TURN_2, false, nonStreamingUpstreamResponse);
  const input = second.input as JsonRecord[];
  assert.deepEqual(reasoningTexts(input), [REASONING]);
  const reasoningIndex = input.findIndex((item) => item.type === "reasoning");
  const assistantIndex = input.findIndex(
    (item) => item.type === "message" && item.role === "assistant"
  );
  assert.ok(reasoningIndex >= 0 && reasoningIndex < assistantIndex);
});

test("streaming: a plain turn captured from a Responses SSE upstream is replayed on the next turn", async () => {
  clearReasoningCacheAll();
  const session = "reasoning-cache-write-guard-responses-stream";
  const first = await runTurn(session, TURN_1, true, streamingUpstreamResponse);
  assert.ok(Array.isArray(first.input), "turn 1 went upstream as a Responses body");
  assert.equal(first.messages, undefined);

  const second = await runTurn(session, TURN_2, false, nonStreamingUpstreamResponse);
  assert.deepEqual(reasoningTexts(second.input), [REASONING]);
});
