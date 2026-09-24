import { after, afterEach, test } from "node:test";
import assert from "node:assert/strict";

import {
  createRecoverableStream,
  hasTerminalMarker,
  makeContinuationBody,
  scanOpenAiSseText,
  TruncatedStreamError,
} from "../../open-sse/services/streamRecovery.ts";
import { openaiResponsesToOpenAIResponse } from "../../open-sse/translator/response/openai-responses.ts";
import { resetDbInstance } from "../../src/lib/db/core.ts";

const enc = new TextEncoder();
const dec = new TextDecoder();

const ORDER_FIX_FLAG = "STREAM_RECOVERY_TOOLCALL_ORDER_FIX";
const ORIGINAL_ORDER_FIX_FLAG = process.env[ORDER_FIX_FLAG];

function setOrderFix(on: boolean) {
  if (on) process.env[ORDER_FIX_FLAG] = "true";
  else delete process.env[ORDER_FIX_FLAG];
}

afterEach(() => {
  if (ORIGINAL_ORDER_FIX_FLAG === undefined) delete process.env[ORDER_FIX_FLAG];
  else process.env[ORDER_FIX_FLAG] = ORIGINAL_ORDER_FIX_FLAG;
});

after(() => {
  resetDbInstance();
});

/** Clock that jumps past the holdback window so the first chunk commits immediately. */
function jumpingClock(): () => number {
  let t = 0;
  return () => (t += 1000);
}

/** Emit each chunk on its own read, then cut with a retryable truncation. */
function streamFrom(chunks: string[]): ReadableStream<Uint8Array> {
  let i = 0;
  return new ReadableStream<Uint8Array>({
    pull(controller) {
      if (i < chunks.length) {
        controller.enqueue(enc.encode(chunks[i++]));
        return;
      }
      controller.error(new TruncatedStreamError());
    },
  });
}

function completedStream(sse: string): ReadableStream<Uint8Array> {
  return new ReadableStream<Uint8Array>({
    start(controller) {
      controller.enqueue(enc.encode(sse));
      controller.close();
    },
  });
}

async function collectText(stream: ReadableStream<Uint8Array>): Promise<string> {
  const reader = stream.getReader();
  try {
    let out = "";
    for (;;) {
      let read: ReadableStreamReadResult<Uint8Array>;
      try {
        read = await reader.read();
      } catch {
        // A refused continuation surfaces the original truncation error.
        break;
      }
      if (read.done) break;
      if (read.value) out += dec.decode(read.value, { stream: true });
    }
    return out;
  } finally {
    reader.releaseLock();
  }
}

const textDelta = (delta: string) =>
  `data: ${JSON.stringify({ type: "response.output_text.delta", output_index: 0, content_index: 0, delta })}\n\n`;
const textDone =
  'data: {"type":"response.output_text.done","output_index":0,"content_index":0}\n\n';
const completed = (status = "completed") =>
  `data: ${JSON.stringify({ type: "response.completed", response: { status, output: [] } })}\n\n`;
const summaryDelta = (delta: string) =>
  `data: ${JSON.stringify({ type: "response.reasoning_summary_text.delta", item_id: "rs_1", output_index: 0, summary_index: 0, delta })}\n\n`;
const fnArgsDelta = (itemId: string, outputIndex: number, delta: string) =>
  `data: ${JSON.stringify({ type: "response.function_call_arguments.delta", item_id: itemId, output_index: outputIndex, delta })}\n\n`;
const fnArgsDone = (itemId: string, outputIndex: number) =>
  `data: ${JSON.stringify({ type: "response.function_call_arguments.done", item_id: itemId, output_index: outputIndex })}\n\n`;
const fnAdded = (callId: string, name: string) =>
  `data: ${JSON.stringify({ type: "response.output_item.added", output_index: 0, item: { type: "function_call", id: "item_1", call_id: callId, name, arguments: "{}" } })}\n\n`;
const msgAdded = () =>
  'data: {"type":"response.output_item.added","output_index":0,"item":{"type":"message","id":"msg_1","status":"in_progress","role":"assistant","content":[]}}\n\n';

// ── scan: text deltas ─────────────────────────────────────────────────────────

test("scan accumulates Responses text deltas without flagging the chat format", () => {
  const r = scanOpenAiSseText(textDelta("Hello") + textDelta(" world"));
  assert.equal(r.text, "Hello world");
  assert.equal(r.parsedResponses, true);
  assert.equal(r.parsedOpenAi, false);
  assert.equal(r.sawToolCall, false);
  assert.equal(r.terminal, false);
});

test("scan ignores the named output_text.done lifecycle echo", () => {
  const r = scanOpenAiSseText(textDelta("hi") + textDone);
  assert.equal(r.text, "hi");
  assert.equal(r.parsedResponses, true);
  assert.equal(r.sawToolCall, false);
  assert.equal(r.terminal, false);
});

test("scan keeps reasoning summary text out of the visible text field", () => {
  const r = scanOpenAiSseText(summaryDelta("thinking...") + summaryDelta(" more"));
  assert.equal(r.reasoningText, "thinking... more");
  assert.equal(r.text, "");
  assert.equal(r.parsedResponses, true);
});

test("scan treats response.completed as terminal whatever the status", () => {
  const ok = scanOpenAiSseText(textDelta("hi") + completed("completed"));
  assert.equal(ok.text, "hi");
  assert.equal(ok.terminal, true);
  assert.equal(ok.parsedResponses, true);
  const failedStatus = scanOpenAiSseText(textDelta("hi") + completed("failed"));
  assert.equal(failedStatus.terminal, true);
});

test("scan treats response.failed and response.incomplete as terminal", () => {
  const failed = scanOpenAiSseText(
    'data: {"type":"response.failed","response":{"status":"failed"}}\n\n'
  );
  assert.equal(failed.terminal, true);
  assert.equal(failed.parsedResponses, true);
  const incomplete = scanOpenAiSseText(
    'data: {"type":"response.incomplete","response":{"status":"incomplete"}}\n\n'
  );
  assert.equal(incomplete.terminal, true);
  assert.equal(incomplete.parsedResponses, true);
});

// ── scan: tool-call signals ───────────────────────────────────────────────────

test("scan flags Responses function-call deltas as an in-flight tool call", () => {
  const r = scanOpenAiSseText(fnArgsDelta("item_1", 0, '{"q":1}'));
  assert.equal(r.sawToolCall, true);
  assert.equal(r.sawToolCallInFlight, true);
  assert.equal(r.parsedResponses, true);
});

test("scan closes the in-flight tool call on the matching done event", () => {
  const r = scanOpenAiSseText(fnArgsDelta("item_1", 0, '{"q":1}') + fnArgsDone("item_1", 0));
  assert.equal(r.sawToolCall, true);
  assert.equal(r.sawToolCallInFlight, false);
  assert.equal(r.finishReason, null);
});

test("scan only flags output_item events carrying a function_call item", () => {
  const message = scanOpenAiSseText(msgAdded());
  assert.equal(message.sawToolCall, false);
  const fn = scanOpenAiSseText(fnAdded("call_1", "lookup"));
  assert.equal(fn.sawToolCall, true);
  assert.equal(fn.sawToolCallInFlight, true);
  assert.equal(fn.parsedResponses, true);
});

test("scan ignores bare event lines without a data payload", () => {
  const r = scanOpenAiSseText("event: response.completed\n\n");
  assert.equal(r.terminal, false);
  assert.equal(r.parsedResponses, false);
});

// ── hasTerminalMarker ─────────────────────────────────────────────────────────

test("hasTerminalMarker recognizes Responses terminal events without [DONE]", () => {
  const withCompleted = enc.encode(textDelta("hi") + completed());
  assert.equal(hasTerminalMarker(withCompleted), true);
  const failedOnly = enc.encode(
    'data: {"type":"response.failed","response":{"status":"failed"}}\n\n'
  );
  assert.equal(hasTerminalMarker(failedOnly), true);
  const incompleteOnly = enc.encode(
    'data: {"type":"response.incomplete","response":{"status":"incomplete"}}\n\n'
  );
  assert.equal(hasTerminalMarker(incompleteOnly), true);
});

test("hasTerminalMarker stays false on a truncated Responses stream", () => {
  const truncated = enc.encode(textDelta("partial answer"));
  assert.equal(hasTerminalMarker(truncated), false);
});

test("hasTerminalMarker covers a bare event line without a data payload", () => {
  assert.equal(hasTerminalMarker(enc.encode("event: response.completed\n\n")), true);
});

// ── makeContinuationBody ──────────────────────────────────────────────────────

test("makeContinuationBody replays received text as an assistant input item", () => {
  const body = { model: "m", input: [{ type: "message", role: "user", content: "hi" }] };
  const out = makeContinuationBody(body as never, "partial answer") as {
    input: unknown[];
    stream: unknown;
  };
  assert.equal(out.stream, true);
  assert.equal(out.input.length, 2);
  assert.deepEqual(out.input[1], {
    type: "message",
    role: "assistant",
    content: [{ type: "output_text", text: "partial answer" }],
    status: "completed",
  });
});

test("makeContinuationBody keeps messages priority over input", () => {
  const body = {
    model: "m",
    messages: [{ role: "user", content: "hi" }],
    input: [{ type: "message", role: "user", content: "hi" }],
  };
  const out = makeContinuationBody(body as never, "partial") as {
    messages: unknown[];
  } & Record<string, unknown>;
  assert.ok(Array.isArray(out.messages));
  assert.equal(out.messages.length, 2);
  assert.ok(!("input" in out) || out.input === body.input);
});

test("makeContinuationBody rejects empty or missing input like empty messages", () => {
  assert.equal(makeContinuationBody({ model: "m", input: [] } as never, "t"), null);
  assert.equal(makeContinuationBody({ model: "m" } as never, "t"), null);
});

test("makeContinuationBody re-sends input unchanged on an empty prefill", () => {
  const body = { model: "m", input: [{ type: "message", role: "user", content: "hi" }] };
  const out = makeContinuationBody(body as never, "") as { input: unknown[] };
  assert.equal(out.input.length, 1);
});

// ── trap 1: a short complete Responses stream is never resumed ────────────────

test("a short complete Responses stream is never resumed after serving", async () => {
  const sse = textDelta("Hello there") + completed();
  let continuations = 0;
  const stream = createRecoverableStream(completedStream(sse), async () => null, {
    finalize: () => {},
    now: jumpingClock(),
    continueStream: async () => {
      continuations += 1;
      return null;
    },
  });
  const out = await collectText(stream);
  assert.ok(out.includes("Hello there"));
  assert.equal(continuations, 0, "a served complete response must not be re-requested");
});

// ── cut after content resumes with a Responses envelope ───────────────────────

test("a cut after content resumes and stitches a Responses suffix", async () => {
  const initial = streamFrom([textDelta("Hello there world")]);
  let prefill = "";
  const stream = createRecoverableStream(initial, async () => null, {
    finalize: () => {},
    now: jumpingClock(),
    continueStream: async (soFar: string) => {
      prefill = soFar;
      return completedStream(textDelta("there world, nice to meet you!") + completed());
    },
  });
  const out = await collectText(stream);
  assert.equal(prefill, "Hello there world");
  const scan = scanOpenAiSseText(out);
  assert.equal(scan.parsedResponses, true);
  assert.ok(out.includes("response.output_text.delta"));
  assert.ok(out.includes("nice to meet you!"));
  assert.ok(out.includes("response.completed"));
});

test("an in-flight Responses tool call refuses the cut without a re-request", async () => {
  const initial = streamFrom([textDelta("partial") + fnArgsDelta("item_9", 0, '{"q":1}')]);
  let continuations = 0;
  const outcomes: unknown[] = [];
  const stream = createRecoverableStream(initial, async () => null, {
    finalize: () => {},
    now: jumpingClock(),
    continueStream: async () => {
      continuations += 1;
      return null;
    },
    onContinueOutcome: (event) => {
      outcomes.push(event);
    },
  });
  await collectText(stream);
  assert.equal(continuations, 0);
  assert.ok(
    outcomes.some(
      (event) =>
        (event as { outcome?: string }).outcome === "refused" &&
        (event as { reason?: string }).reason === "tool-call"
    )
  );
});

test("a finished tool call stays continuable when the order fix is off", async () => {
  setOrderFix(false);
  const initial = streamFrom([
    fnAdded("call_1", "lookup") + fnArgsDone("item_1", 0) + textDelta("trailing prose"),
  ]);
  let continuations = 0;
  const stream = createRecoverableStream(initial, async () => null, {
    finalize: () => {},
    now: jumpingClock(),
    continueStream: async () => {
      continuations += 1;
      return completedStream(textDelta("trailing prose plus more") + completed());
    },
  });
  const out = await collectText(stream);
  assert.equal(continuations, 1);
  assert.ok(out.includes("plus more"));
});

test("a finished tool call blocks continuation when the order fix is on", async () => {
  setOrderFix(true);
  const initial = streamFrom([
    fnAdded("call_1", "lookup") + fnArgsDone("item_1", 0) + textDelta("trailing prose"),
  ]);
  let continuations = 0;
  const stream = createRecoverableStream(initial, async () => null, {
    finalize: () => {},
    now: jumpingClock(),
    continueStream: async () => {
      continuations += 1;
      return null;
    },
  });
  await collectText(stream);
  assert.equal(continuations, 0);
});

// ── stitched envelope drives the downstream translator to a stop chunk ────────

test("the stitched Responses envelope closes through the downstream translator", () => {
  const state = {};
  const suffixChunk = openaiResponsesToOpenAIResponse(
    {
      type: "response.output_text.delta",
      output_index: 0,
      content_index: 0,
      delta: " world",
    },
    state
  ) as { choices?: Array<{ delta?: { content?: string } }> } | null;
  assert.ok(suffixChunk);
  assert.equal(suffixChunk?.choices?.[0]?.delta?.content, " world");
  const finalChunk = openaiResponsesToOpenAIResponse(
    { type: "response.completed", response: { status: "completed", output: [] } },
    state
  ) as { choices?: Array<{ finish_reason?: string }> } | null;
  assert.ok(finalChunk);
  assert.equal(finalChunk?.choices?.[0]?.finish_reason, "stop");
});

test("a completed snapshot carrying a function call closes as tool_calls", () => {
  const state = {};
  openaiResponsesToOpenAIResponse(
    {
      type: "response.output_item.added",
      output_index: 0,
      item: {
        type: "function_call",
        id: "item_1",
        call_id: "call_1",
        name: "lookup",
        arguments: "{}",
      },
    },
    state
  );
  const finalChunk = openaiResponsesToOpenAIResponse(
    {
      type: "response.completed",
      response: {
        status: "completed",
        output: [
          {
            type: "function_call",
            id: "item_1",
            call_id: "call_1",
            name: "lookup",
            arguments: "{}",
          },
        ],
      },
    },
    state
  );
  const chunks = Array.isArray(finalChunk) ? finalChunk : [finalChunk];
  const reasons = chunks.flatMap(
    (chunk) => (chunk as { choices?: Array<{ finish_reason?: string }> })?.choices ?? []
  );
  assert.ok(reasons.some((choice) => choice.finish_reason === "tool_calls"));
});

test("a synthetic completed after finish_reason was sent resolves to no chunk", () => {
  const state = {};
  const first = openaiResponsesToOpenAIResponse(
    { type: "response.completed", response: { status: "completed", output: [] } },
    state
  );
  assert.ok(first);
  const second = openaiResponsesToOpenAIResponse(
    { type: "response.completed", response: { status: "completed", output: [] } },
    state
  );
  assert.equal(second, null);
});
