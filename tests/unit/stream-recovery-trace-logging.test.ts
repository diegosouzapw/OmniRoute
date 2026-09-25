// Mid-stream continuation log wiring: buildContinuationLogHooks (the exact hooks chatCore
// spreads into createRecoverableStream) driven through the real recoverable stream. Warn is
// reserved for the attempt line (release wording) and for a recovery that gives up; a cut
// refused because of a tool call stays debug; every other outcome is info, so a stitched
// recovery stays visible outside debug and a healthy stream adds no warn line at all.
// Every emitted line carries `correlationId=<id|none>` from the requesting call.
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

const CID = "cid-test";

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

function capture(correlationId: string | null = CID) {
  const warn: string[] = [];
  const debug: string[] = [];
  const info: string[] = [];
  const log = {
    warn: (tag: string, msg: string) => warn.push(`${tag} ${msg}`),
    debug: (tag: string, msg: string) => debug.push(`${tag} ${msg}`),
    info: (tag: string, msg: string) => info.push(`${tag} ${msg}`),
  };
  return { warn, debug, info, log, hooks: buildContinuationLogHooks(log, correlationId) };
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

test("a stitched continuation warns once with the release attempt wording, outcome at info", async () => {
  const { warn, debug, info, hooks } = capture();
  const out = await run(
    streamFrom([ROLE, content("Hello there world")]),
    async () => streamFrom([ROLE, content("there world, nice to meet you!"), DONE]),
    hooks
  );
  assert.match(out, /nice to meet you!/);
  assert.deepEqual(warn, [
    "STREAM_RECOVERY mid-stream continuation attempt 1/4 correlationId=cid-test",
  ]);
  assert.deepEqual(debug, []);
  assert.deepEqual(info, [
    "STREAM_RECOVERY mid-stream continuation attempt 1/4 outcome=suffix suffixChars=19 correlationId=cid-test",
  ]);
});

test("a streamed tool call that ends nominally logs nothing", async () => {
  const { warn, debug, info, hooks } = capture();
  await run(streamFrom([ROLE, TOOL_CALL, FINISH_TOOL_CALLS, DONE]), async () => null, hooks);
  assert.deepEqual(warn, []);
  assert.deepEqual(debug, []);
  assert.deepEqual(info, []);
});

test("a cut refused because a tool call is in flight is debug only", async () => {
  const { warn, debug, info, hooks } = capture();
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
  assert.deepEqual(info, []);
  assert.deepEqual(debug, [
    "STREAM_RECOVERY mid-stream continuation attempt 0/4 outcome=refused reason=tool-call correlationId=cid-test",
  ]);
});

test("a spent continuation budget warns that the recovery gave up", async () => {
  const { warn, debug, info, hooks } = capture();
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
    "STREAM_RECOVERY mid-stream continuation attempt 1/4 correlationId=cid-test",
    "STREAM_RECOVERY mid-stream continuation attempt 2/4 correlationId=cid-test",
    "STREAM_RECOVERY mid-stream continuation attempt 3/4 correlationId=cid-test",
    "STREAM_RECOVERY mid-stream continuation attempt 4/4 correlationId=cid-test",
    "STREAM_RECOVERY mid-stream continuation attempt 4/4 outcome=refused reason=budget correlationId=cid-test",
  ]);
  assert.deepEqual(debug, []);
  assert.deepEqual(info, []);
});

test("a continuation request that returns no stream warns that the recovery gave up", async () => {
  const { warn, debug, info, hooks } = capture();
  await run(streamFrom([ROLE, content("Hello there world")], true), async () => null, hooks);
  assert.deepEqual(warn, [
    "STREAM_RECOVERY mid-stream continuation attempt 1/4 correlationId=cid-test",
    "STREAM_RECOVERY mid-stream continuation attempt 1/4 outcome=no-stream correlationId=cid-test",
  ]);
  assert.deepEqual(debug, []);
  assert.deepEqual(info, []);
});

test("a non-OpenAI body ending without an OpenAI terminal logs nothing", async () => {
  const { warn, debug, info, hooks } = capture();
  await run(
    streamFrom(['event: content_block_delta\ndata: {"type":"content_block_delta"}\n\n']),
    async () => null,
    hooks
  );
  assert.deepEqual(warn, []);
  assert.deepEqual(debug, []);
  assert.deepEqual(info, []);
});

test("an absent or empty correlationId falls back to none, never undefined/null", async () => {
  const lines: string[] = [];
  for (const cid of [undefined, null, ""] as const) {
    const c = capture(CID);
    const hooks =
      cid === undefined ? buildContinuationLogHooks(c.log) : buildContinuationLogHooks(c.log, cid);
    await run(
      streamFrom([ROLE, content("Hello there world")]),
      async () => streamFrom([ROLE, content("there world, nice to meet you!"), DONE]),
      hooks
    );
    assert.deepEqual(c.warn, [
      "STREAM_RECOVERY mid-stream continuation attempt 1/4 correlationId=none",
    ]);
    assert.deepEqual(c.debug, []);
    assert.deepEqual(c.info, [
      "STREAM_RECOVERY mid-stream continuation attempt 1/4 outcome=suffix suffixChars=19 correlationId=none",
    ]);
    lines.push(...c.warn, ...c.debug, ...c.info);
  }
  for (const line of lines) assert.doesNotMatch(line, /undefined|null/);
});

test("a cut refused for a non-tool-call reason is info, not debug", () => {
  const { warn, debug, info, hooks } = capture();
  hooks.onContinueOutcome?.({ attempt: 0, outcome: "refused", reason: "not-continuable" });
  assert.deepEqual(warn, []);
  assert.deepEqual(debug, []);
  assert.deepEqual(info, [
    "STREAM_RECOVERY mid-stream continuation attempt 0/4 outcome=refused reason=not-continuable correlationId=cid-test",
  ]);
});

test("a log without info still handles a stitched outcome without throwing", () => {
  const warn: string[] = [];
  const debug: string[] = [];
  const legacy = {
    warn: (tag: string, msg: string) => warn.push(`${tag} ${msg}`),
    debug: (tag: string, msg: string) => debug.push(`${tag} ${msg}`),
  };
  const hooks = buildContinuationLogHooks(legacy, CID);
  assert.doesNotThrow(() =>
    hooks.onContinueOutcome?.({ attempt: 1, outcome: "suffix", suffixChars: 3 })
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
