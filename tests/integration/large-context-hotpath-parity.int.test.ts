/**
 * Large-context hot-path integration parity (PR: remove redundant request-path work).
 *
 * Drives the REAL handleChatCore pipeline with a ~1 MiB agent-shaped request
 * (long alternating history + large tool catalog) against a stubbed upstream and
 * asserts the request-path optimizations changed nothing user-visible:
 *
 * - the full history and every tool schema reach the upstream intact;
 * - a streamed response keeps SSE chunk order, tool-call names/arguments, and
 *   the [DONE] terminator;
 * - the estimate/serialization shortcuts never leak into the payload.
 *
 * Deterministic: fixtures come from scripts/perf/agentPayloadCorpus.ts (fixed
 * LCG seed), the upstream is a global fetch stub, DATA_DIR is isolated.
 */
import { test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-hotpath-int-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const { buildAgentPayload } = await import("../../scripts/perf/agentPayloadCorpus.ts");
const core = await import("../../src/lib/db/core.ts");
const { updateCompressionSettings } = await import("../../src/lib/db/compression.ts");
const { handleChatCore } = await import("../../open-sse/handlers/chatCore.ts");

const PROVIDER = "hotpath-int-prov";
const MODEL = "hotpath-int-model";
// The ~0.5 MiB fixture estimates ~131k tokens; give the fake provider a window
// big enough that the request passes the context guard (the point here is
// pipeline parity, not the guard itself).
const LIMIT_ENV = "CONTEXT_LENGTH_HOTPATH_INT_PROV";
const originalLimitEnv = process.env[LIMIT_ENV];
process.env[LIMIT_ENV] = "1000000";
// 200 messages / 30 tools ≈ 0.5 MiB wire — big enough to exercise the
// estimation and serialization paths, small enough to stay fast.
const BODY = buildAgentPayload(200, 30, 300);
const WIRE_BYTES = Buffer.byteLength(JSON.stringify(BODY), "utf8");

const originalFetch = globalThis.fetch;

test.after(() => {
  globalThis.fetch = originalFetch;
  if (originalLimitEnv === undefined) delete process.env[LIMIT_ENV];
  else process.env[LIMIT_ENV] = originalLimitEnv;
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

function chatArgs(stream: boolean) {
  return {
    body: structuredClone(BODY),
    modelInfo: { provider: PROVIDER, model: MODEL, extendedContext: false },
    credentials: {
      apiKey: "sk-hotpath-int",
      providerSpecificData: { baseUrl: "https://hotpath-int.example.test" },
    },
    clientRawRequest: {
      endpoint: "/v1/chat/completions",
      body: structuredClone(BODY),
      headers: new Headers({ accept: stream ? "text/event-stream" : "application/json" }),
    },
    userAgent: "integration-test",
    log: { debug() {}, info() {}, warn() {}, error() {} },
  };
}

test("large non-stream request: full history and tool catalog reach the upstream intact", async () => {
  let upstreamBody: Record<string, unknown> | null = null;
  globalThis.fetch = async (_url: string | URL | Request, init: RequestInit = {}) => {
    upstreamBody = JSON.parse(String(init.body));
    return new Response(
      JSON.stringify({
        choices: [{ message: { content: "stub ok" }, finish_reason: "stop" }],
        usage: { prompt_tokens: 10, completion_tokens: 2, total_tokens: 12 },
      }),
      { status: 200, headers: { "content-type": "application/json" } }
    );
  };

  const result = await handleChatCore(chatArgs(false));
  assert.equal(result.success, true, JSON.stringify((result as { error?: string }).error ?? ""));

  assert.ok(upstreamBody, "upstream fetch must have been called");
  const messages = upstreamBody.messages as Array<{ role: string; content: string }>;
  assert.equal(messages.length, 200, "every history message must survive the pipeline");
  assert.equal(
    messages[0].content,
    (BODY.messages as Array<{ content: string }>)[0].content,
    "message content must be byte-identical"
  );
  const tools = upstreamBody.tools as unknown[];
  assert.equal(tools.length, 30, "every tool schema must survive the pipeline");
  assert.ok(WIRE_BYTES > 400_000, `fixture must stay large (got ${WIRE_BYTES} bytes)`);
});

test("large streamed request: SSE order, tool call, and [DONE] survive", async () => {
  const chunk = (delta: unknown, extra: Record<string, unknown> = {}) =>
    `data: ${JSON.stringify({
      id: "c1",
      object: "chat.completion.chunk",
      created: 1,
      model: MODEL,
      choices: [{ index: 0, delta, finish_reason: null }],
      ...extra,
    })}\n\n`;

  globalThis.fetch = async () =>
    new Response(
      chunk({ role: "assistant", content: "" }) +
        chunk({ content: "partial answer" }) +
        chunk({
          tool_calls: [
            {
              index: 0,
              id: "call_hotpath_1",
              type: "function",
              function: { name: "tool_7", arguments: '{"query":"parity"}' },
            },
          ],
        }) +
        `data: ${JSON.stringify({
          id: "c1",
          object: "chat.completion.chunk",
          created: 1,
          model: MODEL,
          choices: [{ index: 0, delta: {}, finish_reason: "tool_calls" }],
          usage: { prompt_tokens: 10, completion_tokens: 3, total_tokens: 13 },
        })}\n\n` +
        "data: [DONE]\n\n",
      { status: 200, headers: { "content-type": "text/event-stream" } }
    );

  const result = await handleChatCore(chatArgs(true));
  assert.equal(result.success, true, JSON.stringify((result as { error?: string }).error ?? ""));

  const response = (result as { response: Response }).response;
  const text = await response.text();
  const frames = text
    .split("\n\n")
    .filter((line) => line.startsWith("data: "))
    .map((line) => line.slice("data: ".length));

  assert.equal(frames[frames.length - 1], "[DONE]", "stream must end with [DONE]");
  const toolFrame = frames.find((f) => f !== "[DONE]" && f.includes("call_hotpath_1"));
  assert.ok(toolFrame, "the tool_calls delta must be forwarded");
  const parsed = JSON.parse(toolFrame) as {
    choices: Array<{
      delta: { tool_calls: Array<{ function: { name: string; arguments: string } }> };
    }>;
  };
  const call = parsed.choices[0].delta.tool_calls[0];
  assert.equal(call.function.name, "tool_7");
  assert.equal(call.function.arguments, '{"query":"parity"}');
  // Order: role first, then content, then the tool call, then finish + DONE.
  const contentIdx = frames.findIndex((f) => f.includes("partial answer"));
  const toolIdx = frames.indexOf(toolFrame);
  const finishIdx = frames.findIndex((f) => f.includes('"finish_reason":"tool_calls"'));
  assert.ok(
    contentIdx !== -1 && toolIdx > contentIdx && finishIdx > toolIdx,
    "SSE order preserved"
  );
});

test("over-limit request passes the final guard only via a FRESH post-compaction breakdown", async () => {
  // Drives the last-resort compaction branch: the raw estimate (~131k tokens)
  // exceeds this limit, compaction shrinks the history under it, and the guard
  // must accept the request using numbers computed from the POST-compaction
  // body. A stale pre-compaction breakdown (the exact mis-wiring the
  // precomputedBreakdown parameter invites) would keep the estimate over the
  // limit and 400 here — success is the regression signal.
  const originalTight = process.env[LIMIT_ENV];
  process.env[LIMIT_ENV] = "20000";
  // Fresh DBs seed compression off; the last-resort compaction branch requires
  // the global switch on (same setup as combo-context-overflow-compression-probe).
  await updateCompressionSettings({ enabled: true });

  let upstreamMessageCount = -1;
  globalThis.fetch = async (_url: string | URL | Request, init: RequestInit = {}) => {
    upstreamMessageCount = (JSON.parse(String(init.body)).messages as unknown[]).length;
    return new Response(
      JSON.stringify({
        choices: [{ message: { content: "compacted ok" }, finish_reason: "stop" }],
        usage: { prompt_tokens: 10, completion_tokens: 2, total_tokens: 12 },
      }),
      { status: 200, headers: { "content-type": "application/json" } }
    );
  };

  try {
    const result = await handleChatCore(chatArgs(false));
    assert.equal(result.success, true, JSON.stringify((result as { error?: string }).error ?? ""));
    assert.ok(
      upstreamMessageCount > 0 && upstreamMessageCount < 200,
      `compaction must shrink the history upstream (got ${upstreamMessageCount}/200)`
    );
  } finally {
    if (originalTight === undefined) delete process.env[LIMIT_ENV];
    else process.env[LIMIT_ENV] = originalTight;
  }
});
