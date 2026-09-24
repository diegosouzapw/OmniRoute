import { after, afterEach, describe, it } from "node:test";
import assert from "node:assert/strict";
import {
  createRecoverableStream,
  TruncatedStreamError,
  scanOpenAiSseText,
} from "../../open-sse/services/streamRecovery.ts";
import { STREAM_RECOVERY } from "../../open-sse/config/constants.ts";
import { resetDbInstance } from "../../src/lib/db/core.ts";

const enc = new TextEncoder();

// Deliver the SSE chunk on the first read, then error on the second read so the
// holdback window has committed (post-commit truncation) before the cut.
function makeStream(sse: string): ReadableStream<Uint8Array> {
  let n = 0;
  return new ReadableStream<Uint8Array>({
    pull(c) {
      n += 1;
      if (n === 1) {
        c.enqueue(enc.encode(sse));
        return;
      }
      c.error(new TruncatedStreamError());
    },
  });
}

// A clock that jumps past HOLDBACK_MS on the second read so the very first pushed
// chunk commits the holdback window immediately (post-commit truncation path).
function jumpingClock(): () => number {
  let t = 0;
  return () => (t += 1000);
}

describe("scanOpenAiSseText: terminal vs in-flight tool call", () => {
  it("tool_calls without finish_reason → inFlight true, terminal false", () => {
    const sse =
      'data: {"choices":[{"index":0,"delta":{"tool_calls":[{"id":"call_1","function":{"name":"lookup"}}]}}]}\n\n';
    const r = scanOpenAiSseText(sse);
    assert.equal(r.sawToolCall, true);
    assert.equal(r.sawToolCallInFlight, true);
    assert.equal(r.terminal, false);
  });

  it("complete tool_calls + finish_reason + [DONE] → terminal true, inFlight false", () => {
    const sse =
      'data: {"choices":[{"index":0,"delta":{"tool_calls":[{"id":"call_1","function":{"name":"lookup","arguments":"{}"}}]}}]}\n' +
      'data: {"choices":[{"index":0,"delta":{},"finish_reason":"tool_calls"}]}\n' +
      "data: [DONE]\n\n";
    const r = scanOpenAiSseText(sse);
    assert.equal(r.sawToolCall, true);
    assert.equal(r.terminal, true);
    assert.equal(r.sawToolCallInFlight, false);
  });

  it("plain text → no tool call", () => {
    const sse = 'data: {"choices":[{"index":0,"delta":{"content":"hello"}}]}\n\n';
    const r = scanOpenAiSseText(sse);
    assert.equal(r.sawToolCall, false);
    assert.equal(r.sawToolCallInFlight, false);
    assert.equal(r.terminal, false);
  });

  it("complete tool_calls WITHOUT [DONE] → terminal false, inFlight false (the actual fix)", () => {
    // This is the case the original plan promised to unblock: the tool call itself is
    // done (finish_reason: "tool_calls"), but the overall stream/turn has not sent its
    // own terminal marker yet — a truncation right here is recoverable.
    const sse =
      'data: {"choices":[{"index":0,"delta":{"tool_calls":[{"id":"call_1","function":{"name":"lookup","arguments":"{}"}}]}}]}\n' +
      'data: {"choices":[{"index":0,"delta":{},"finish_reason":"tool_calls"}]}\n\n';
    const r = scanOpenAiSseText(sse);
    assert.equal(r.sawToolCall, true);
    assert.equal(r.sawToolCallInFlight, false);
    assert.equal(r.terminal, false);
  });
});

describe("stream recovery does not duplicate an in-flight tool call", () => {
  it("truncation with an in-flight tool call → no continuation", async () => {
    let continued = false;
    const sse =
      'data: {"choices":[{"index":0,"delta":{"tool_calls":[{"id":"c1","function":{"name":"f"}}]}}]}\n\n';
    const wrapped = createRecoverableStream(makeStream(sse), async () => null, {
      finalize: () => {},
      now: jumpingClock(),
      continueStream: async () => {
        continued = true;
        return null;
      },
    });
    const reader = wrapped.getReader();
    try {
      for (;;) {
        const r = await reader.read();
        if (r.done) break;
      }
    } catch {
      // the in-flight tool call makes the stream close without continuing
    }
    assert.equal(continued, false);
  });

  it("truncation right after a completed tool call → continuation attempted (the real 91% gain)", async () => {
    // Text was emitted, THEN the tool call completed (finish_reason: "tool_calls"), THEN
    // the connection drops before a [DONE]/other terminal marker. Before this fix, the
    // blunt `emittedToolCall` guard blocked recovery here even though the call itself is
    // done and only trailing prose was lost — this is the exact case the plan promised
    // to unblock and the pre-fix table proved was a no-op.
    let continued = false;
    const sse =
      'data: {"choices":[{"index":0,"delta":{"content":"Let me check that. "}}]}\n' +
      'data: {"choices":[{"index":0,"delta":{"tool_calls":[{"id":"c1","function":{"name":"f","arguments":"{}"}}]}}]}\n' +
      'data: {"choices":[{"index":0,"delta":{},"finish_reason":"tool_calls"}]}\n\n';
    const wrapped = createRecoverableStream(makeStream(sse), async () => null, {
      finalize: () => {},
      now: jumpingClock(),
      continueStream: async () => {
        continued = true;
        return null;
      },
    });
    const reader = wrapped.getReader();
    try {
      for (;;) {
        const r = await reader.read();
        if (r.done) break;
      }
    } catch {
      // no-op
    }
    assert.equal(continued, true);
  });

  it("truncation of plain text → continuation attempted", async () => {
    let continued = false;
    const sse = 'data: {"choices":[{"index":0,"delta":{"content":"hello "}}]}\n\n';
    const wrapped = createRecoverableStream(makeStream(sse), async () => null, {
      finalize: () => {},
      now: jumpingClock(),
      continueStream: async () => {
        continued = true;
        return null;
      },
    });
    const reader = wrapped.getReader();
    try {
      for (;;) {
        const r = await reader.read();
        if (r.done) break;
      }
    } catch {
      // no-op
    }
    assert.equal(continued, true);
  });

  it("naive removal of the tool-call guard would duplicate a partial tool call", () => {
    // The blunt `sawToolCall` flag is true for BOTH a complete tool call and a
    // partial (in-flight) one. The new `sawToolCallInFlight` flag is the only
    // signal that tells them apart: a naive guard keyed on `sawToolCall` would
    // block the complete call AND let the partial one through to the
    // continuation, where trimContinuationOverlap (text-only) cannot de-duplicate
    // the replayed tool_calls arguments.
    const ssePartial =
      'data: {"choices":[{"index":0,"delta":{"tool_calls":[{"id":"call_1","function":{"name":"lookup","arguments":"{\\"q\\""}}]}}]}\n\n';
    const sseFull =
      'data: {"choices":[{"index":0,"delta":{"tool_calls":[{"id":"call_1","function":{"name":"lookup","arguments":"{\\"q\\":\\"x\\"}"}}]}}]}\n' +
      'data: {"choices":[{"index":0,"delta":{},"finish_reason":"tool_calls"}]}\n\n';
    const scanPartial = scanOpenAiSseText(ssePartial);
    const scanFull = scanOpenAiSseText(sseFull);
    // The blunt flag cannot distinguish them.
    assert.equal(scanPartial.sawToolCall, true);
    assert.equal(scanFull.sawToolCall, true);
    // The in-flight flag can — and that is what keeps canContinue false only for
    // the partial tool call, so the continuation never replays it.
    assert.equal(scanPartial.sawToolCallInFlight, true);
    assert.equal(scanFull.sawToolCallInFlight, false);
  });
});

// ── STREAM_RECOVERY_TOOLCALL_ORDER_FIX (opt-in, default off) ──────────────────
// Both sides run through the real createRecoverableStream and the real feature-flag
// lookup (env source); the flag is read lazily inside the stream, so it is set before the
// stream is drained.

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

// Deliver each chunk on its own read, then cut with a retryable truncation.
function makeChunkedStream(chunks: string[]): ReadableStream<Uint8Array> {
  let n = 0;
  return new ReadableStream<Uint8Array>({
    pull(c) {
      if (n < chunks.length) {
        c.enqueue(enc.encode(chunks[n++]));
        return;
      }
      c.error(new TruncatedStreamError());
    },
  });
}

function streamOf(body: string): ReadableStream<Uint8Array> {
  return new ReadableStream<Uint8Array>({
    start(c) {
      c.enqueue(enc.encode(body));
      c.close();
    },
  });
}

async function drainAll(stream: ReadableStream<Uint8Array>): Promise<string> {
  const reader = stream.getReader();
  const decoder = new TextDecoder();
  let out = "";
  try {
    for (;;) {
      const r = await reader.read();
      if (r.done) break;
      if (r.value) out += decoder.decode(r.value, { stream: true });
    }
  } catch {
    // a refused continuation surfaces the original truncation error
  }
  return out;
}

async function countContinuations(
  chunks: string[],
  continuation: () => ReadableStream<Uint8Array> | null = () => null
): Promise<{ calls: number; out: string }> {
  let calls = 0;
  const wrapped = createRecoverableStream(makeChunkedStream(chunks), async () => null, {
    finalize: () => {},
    now: jumpingClock(),
    continueStream: async () => {
      calls += 1;
      return continuation();
    },
  });
  const out = await drainAll(wrapped);
  return { calls, out };
}

const TEXT = 'data: {"choices":[{"index":0,"delta":{"content":"Let me check that. "}}]}\n';
const CALL_COMPLETE =
  'data: {"choices":[{"index":0,"delta":{"tool_calls":[{"id":"c1","function":{"name":"f","arguments":"{}"}}]}}]}\n';
const CALL_PARTIAL =
  'data: {"choices":[{"index":0,"delta":{"tool_calls":[{"id":"c2","function":{"name":"f"}}]}}]}\n';
const FINISH_TOOL_CALLS =
  'data: {"choices":[{"index":0,"delta":{},"finish_reason":"tool_calls"}]}\n';

// The three tool-call shapes a cut can land on.
const COALESCED_FINISHED_CALL = [TEXT + CALL_COMPLETE + FINISH_TOOL_CALLS + "\n"];
const COALESCED_FINISHED_THEN_PARTIAL = [
  TEXT + CALL_COMPLETE + FINISH_TOOL_CALLS + CALL_PARTIAL + "\n",
];
const SPLIT_CALL_THEN_FINISH = [TEXT + CALL_PARTIAL + "\n", FINISH_TOOL_CALLS + "\n"];

// A reasoning-only "stop" (the hallucinatedEmptyStop recovery path) whose every
// continuation comes back empty and non-terminal.
const REASONING_ONLY_STOP = [
  'data: {"choices":[{"delta":{"role":"assistant"}}]}\n\n' +
    'data: {"choices":[{"delta":{"reasoning_content":"the model thinks it through"}}]}\n\n' +
    'data: {"choices":[{"delta":{},"finish_reason":"stop"}]}\n\n',
];
const emptyNonTerminal = () => streamOf('data: {"choices":[{"delta":{"role":"assistant"}}]}\n\n');

describe("STREAM_RECOVERY_TOOLCALL_ORDER_FIX off keeps the release behavior", () => {
  it("resumes after a coalesced finished call and after a finished call followed by a partial one", async () => {
    setOrderFix(false);
    assert.equal((await countContinuations(COALESCED_FINISHED_CALL)).calls, 1);
    assert.equal((await countContinuations(COALESCED_FINISHED_THEN_PARTIAL)).calls, 1);
  });

  it("stays latched when the call and its finish arrive in separate batches", async () => {
    setOrderFix(false);
    assert.equal((await countContinuations(SPLIT_CALL_THEN_FINISH)).calls, 0);
  });

  it("empty continuations still spend the whole continuation budget", async () => {
    setOrderFix(false);
    const { calls, out } = await countContinuations(REASONING_ONLY_STOP, emptyNonTerminal);
    assert.equal(calls, STREAM_RECOVERY.EARLY_RETRY_MAX);
    assert.match(out, /\[DONE\]/);
  });
});

describe("STREAM_RECOVERY_TOOLCALL_ORDER_FIX on makes continuation tool-call safe", () => {
  it("never resumes a finished call followed by a partial call in the same batch", async () => {
    setOrderFix(true);
    assert.equal((await countContinuations(COALESCED_FINISHED_THEN_PARTIAL)).calls, 0);
  });

  it("never resumes a turn that already finished with finish_reason tool_calls", async () => {
    setOrderFix(true);
    const coalesced = await countContinuations(COALESCED_FINISHED_CALL);
    assert.equal(coalesced.calls, 0);
    assert.doesNotMatch(coalesced.out, /"finish_reason":"stop"/);
    // The latch is never re-armed by a later finish: the split shape stays refused too.
    assert.equal((await countContinuations(SPLIT_CALL_THEN_FINISH)).calls, 0);
  });

  it("still resumes a plain-text truncation", async () => {
    setOrderFix(true);
    let calls = 0;
    const wrapped = createRecoverableStream(
      makeStream('data: {"choices":[{"index":0,"delta":{"content":"hello brave new "}}]}\n\n'),
      async () => null,
      {
        finalize: () => {},
        now: jumpingClock(),
        continueStream: async () => {
          calls += 1;
          return streamOf(
            'data: {"choices":[{"index":0,"delta":{"content":"hello brave new world"}}]}\n' +
              "data: [DONE]\n\n"
          );
        },
      }
    );
    const out = await drainAll(wrapped);
    assert.equal(calls, 1);
    assert.match(out, /world/);
  });

  it("stops after one empty continuation instead of spending the whole budget", async () => {
    setOrderFix(true);
    const { calls, out } = await countContinuations(REASONING_ONLY_STOP, emptyNonTerminal);
    assert.equal(calls, 1);
    assert.match(out, /\[DONE\]/, "the client still gets a clean terminal");
  });
});
