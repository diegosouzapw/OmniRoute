// Mid-stream continuation log wiring: buildContinuationLogHooks (the exact hooks chatCore
// spreads into createRecoverableStream) driven through the real recoverable stream. Warn is
// reserved for the attempt line (release wording) and for a recovery that gives up; every
// other outcome is debug, and a healthy or tool-call stream adds no line at all.
import { after, test } from "node:test";
import assert from "node:assert/strict";

import {
  createRecoverableStream,
  TruncatedStreamError,
  type ContinuationOutcome,
} from "../../open-sse/services/streamRecovery.ts";
import {
  buildContinuationLogHooks,
  formatContinuationOutcome,
} from "../../open-sse/handlers/chatCore/recoveryTraceLogging.ts";
import { resetDbInstance } from "../../src/lib/db/core.ts";

after(() => {
  resetDbInstance();
});

const enc = new TextEncoder();

function steppingClock() {
  let t = 0;
  return () => (t += 1000);
}

function streamFrom(chunks: string[], truncate = false) {
  let i = 0;
  return new ReadableStream<Uint8Array>({
    pull(controller) {
      if (i < chunks.length) {
        controller.enqueue(enc.encode(chunks[i++]));
        return;
      }
      if (truncate) controller.error(new TruncatedStreamError());
      else controller.close();
    },
  });
}

async function drain(stream: ReadableStream<Uint8Array>): Promise<string> {
  const reader = stream.getReader();
  const dec = new TextDecoder();
  let out = "";
  try {
    for (;;) {
      const { done, value } = await reader.read();
      if (done) break;
      if (value) out += dec.decode(value, { stream: true });
    }
  } catch {
    // a refused continuation surfaces the original truncation
  }
  return out;
}

const ROLE = 'data: {"choices":[{"delta":{"role":"assistant"}}]}\n\n';
const DONE = "data: [DONE]\n\n";
const content = (s: string) => `data: {"choices":[{"delta":{"content":${JSON.stringify(s)}}}]}\n\n`;
const TOOL_CALL =
  'data: {"choices":[{"delta":{"tool_calls":[{"id":"c1","function":{"name":"f"}}]}}]}\n\n';
const FINISH_TOOL_CALLS = 'data: {"choices":[{"delta":{},"finish_reason":"tool_calls"}]}\n\n';

function capture() {
  const warn: string[] = [];
  const debug: string[] = [];
  const log = {
    warn: (tag: string, msg: string) => warn.push(`${tag} ${msg}`),
    debug: (tag: string, msg: string) => debug.push(`${tag} ${msg}`),
  };
  return { warn, debug, hooks: buildContinuationLogHooks(log) };
}

async function run(
  initial: ReadableStream<Uint8Array>,
  continueStream: () => Promise<ReadableStream<Uint8Array> | null>,
  hooks: ReturnType<typeof buildContinuationLogHooks>
) {
  return drain(
    createRecoverableStream(initial, async () => null, {
      finalize: () => {},
      now: steppingClock(),
      continueStream,
      ...hooks,
    })
  );
}

test("a stitched continuation warns once with the release attempt wording, outcome at debug", async () => {
  const { warn, debug, hooks } = capture();
  const out = await run(
    streamFrom([ROLE, content("Hello there world")]),
    async () => streamFrom([ROLE, content("there world, nice to meet you!"), DONE]),
    hooks
  );
  assert.match(out, /nice to meet you!/);
  assert.deepEqual(warn, ["STREAM_RECOVERY mid-stream continuation attempt 1/4"]);
  assert.deepEqual(debug, [
    "STREAM_RECOVERY mid-stream continuation attempt 1/4 outcome=suffix suffixChars=19",
  ]);
});

test("a streamed tool call that ends nominally logs nothing", async () => {
  const { warn, debug, hooks } = capture();
  await run(streamFrom([ROLE, TOOL_CALL, FINISH_TOOL_CALLS, DONE]), async () => null, hooks);
  assert.deepEqual(warn, []);
  assert.deepEqual(debug, []);
});

test("a cut refused because a tool call is in flight is debug only", async () => {
  const { warn, debug, hooks } = capture();
  let calls = 0;
  await run(
    streamFrom([ROLE, content("Let me check. "), TOOL_CALL], true),
    async () => {
      calls += 1;
      return null;
    },
    hooks
  );
  assert.equal(calls, 0);
  assert.deepEqual(warn, []);
  assert.deepEqual(debug, [
    "STREAM_RECOVERY mid-stream continuation attempt 0/4 outcome=refused reason=tool-call",
  ]);
});

test("a spent continuation budget warns that the recovery gave up", async () => {
  const { warn, debug, hooks } = capture();
  let calls = 0;
  await run(
    streamFrom([ROLE, content("Hello there world")], true),
    async () => {
      calls += 1;
      // Always overlaps and never terminates: every attempt truncates again.
      return streamFrom([ROLE, content("there world")]);
    },
    hooks
  );
  assert.equal(calls, 4);
  assert.deepEqual(warn, [
    "STREAM_RECOVERY mid-stream continuation attempt 1/4",
    "STREAM_RECOVERY mid-stream continuation attempt 2/4",
    "STREAM_RECOVERY mid-stream continuation attempt 3/4",
    "STREAM_RECOVERY mid-stream continuation attempt 4/4",
    "STREAM_RECOVERY mid-stream continuation attempt 4/4 outcome=refused reason=budget",
  ]);
  assert.deepEqual(debug, []);
});

test("a continuation request that returns no stream warns that the recovery gave up", async () => {
  const { warn, debug, hooks } = capture();
  await run(streamFrom([ROLE, content("Hello there world")], true), async () => null, hooks);
  assert.deepEqual(warn, [
    "STREAM_RECOVERY mid-stream continuation attempt 1/4",
    "STREAM_RECOVERY mid-stream continuation attempt 1/4 outcome=no-stream",
  ]);
  assert.deepEqual(debug, []);
});

test("a non-OpenAI body ending without an OpenAI terminal logs nothing", async () => {
  const { warn, debug, hooks } = capture();
  await run(
    streamFrom(['event: content_block_delta\ndata: {"type":"content_block_delta"}\n\n']),
    async () => null,
    hooks
  );
  assert.deepEqual(warn, []);
  assert.deepEqual(debug, []);
});

test("every outcome formats with the attempt token and no undefined fields", () => {
  const events: ContinuationOutcome[] = [
    { attempt: 2, outcome: "suffix", suffixChars: 7 },
    { attempt: 2, outcome: "overlap-reject", overlapChars: 3 },
    { attempt: 1, outcome: "terminal" },
    { attempt: 1, outcome: "empty" },
    { attempt: 1, outcome: "no-stream" },
    { attempt: 0, outcome: "refused", reason: "not-continuable" },
  ];
  for (const event of events) {
    const line = formatContinuationOutcome(event);
    assert.match(line, new RegExp(`^mid-stream continuation attempt ${event.attempt}/4 `));
    assert.doesNotMatch(line, /undefined|null/);
  }
});
