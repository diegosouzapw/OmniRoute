import { describe, it } from "node:test";
import assert from "node:assert/strict";
import {
  createRecoverableStream,
  TruncatedStreamError,
  scanOpenAiSseText,
} from "../../../open-sse/services/streamRecovery.ts";

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
