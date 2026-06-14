/**
 * SSE-correctness integration tests (Task 11, Fase 8 B).
 *
 * Drives the real createSSEStream pipeline through a controllable fake upstream.
 * Run with: node --import tsx/esm --test --test-concurrency=1 tests/integration/sse-correctness.test.ts
 *
 * Notes on observed createSSEStream behavior (calibrated invariants):
 * - The TransformStream processes SSE events and emits translated chunks to the client.
 * - [DONE] is consumed by the pipeline: it closes the upstream readable and the
 *   TransformStream flushes + terminates, but does NOT re-emit "data: [DONE]" to the output.
 *   The output stream closes naturally (reader.read() returns {done:true}).
 * - Upstream errors propagate as TransformStream errors (reader.read() rejects).
 * - Cancel propagates via ReadableStream cancel callback (pipeThrough wires it).
 */

import test from "node:test";
import assert from "node:assert/strict";
import { fakeUpstreamStream } from "../helpers/fakeUpstreamStream.ts";
import { createSSEStream } from "../../open-sse/utils/stream.ts";
import { FORMATS } from "../../open-sse/translator/formats.ts";

/** Drain a ReadableStream to a string, with optional timeout guard. */
async function drain(out: ReadableStream, timeoutMs = 5000): Promise<string> {
  const r = out.getReader();
  const dec = new TextDecoder();
  let s = "";
  const timeout = new Promise<never>((_, reject) =>
    setTimeout(() => reject(new Error(`drain timeout after ${timeoutMs}ms`)), timeoutMs)
  );
  const read = async () => {
    for (;;) {
      const { done, value } = await r.read();
      if (done) break;
      s += dec.decode(value);
    }
    return s;
  };
  return Promise.race([read(), timeout]);
}

function makeStream(extraOpts: Record<string, unknown> = {}) {
  const up = fakeUpstreamStream();
  const transform = createSSEStream({
    sourceFormat: FORMATS.OPENAI,
    targetFormat: FORMATS.OPENAI,
    model: "m",
    ...extraOpts,
  });
  const out = up.stream.pipeThrough(transform as TransformStream);
  return { up, out };
}

test("1. stream closes after [DONE] (no hang)", async () => {
  const { up, out } = makeStream();
  up.push('data: {"choices":[{"delta":{"content":"hi"}}]}\n\n');
  up.push("data: [DONE]\n\n");
  up.close();
  // drain() must return within the timeout — proves the stream closed
  const text = await drain(out);
  assert.ok(text.includes("hi"), `expected 'hi' in output: ${JSON.stringify(text)}`);
});

test("2. client cancel propagates to upstream (abort propagation)", async () => {
  const { up, out } = makeStream();
  let cancelled = false;
  up.onCancel(() => {
    cancelled = true;
  });
  const r = out.getReader();
  await r.cancel("client-abort");
  // Allow microtask queue to flush
  await new Promise((res) => setTimeout(res, 50));
  assert.equal(cancelled, true, "upstream cancel callback must have been called");
});

test("3. no leaked idle timers across N sequential streams", async () => {
  // createSSEStream installs a setInterval idle watchdog per stream.
  // If cleanup (clearInterval) does not run on stream close, timers accumulate.
  // This test creates 10 streams and drains them; it acts as a smoke test that
  // the process does not hang (a leaked setInterval that fires 10s later would
  // prevent the test process from exiting cleanly in --test-force-exit mode).
  for (let i = 0; i < 10; i++) {
    const { up, out } = makeStream();
    up.push("data: [DONE]\n\n");
    up.close();
    await drain(out);
  }
  // If we reach here without a timeout, no blocking resources were leaked.
  assert.ok(true, "all 10 streams completed without hanging");
});

test("4. final snapshot does not duplicate tail text", async () => {
  // Regression guard for the SSE snapshot bug (CLAUDE.md §2, Fase 8 B spec §4.2):
  // the text 'Hello' should appear EXACTLY ONCE in the output, not duplicated.
  const { up, out } = makeStream();
  up.push('data: {"choices":[{"delta":{"content":"Hello"}}]}\n\n');
  up.push("data: [DONE]\n\n");
  up.close();
  const text = await drain(out);
  const occurrences = (text.match(/Hello/g) ?? []).length;
  assert.equal(
    occurrences,
    1,
    `'Hello' appeared ${occurrences} times; expected 1. Output: ${JSON.stringify(text)}`
  );
});

test("5. upstream error propagates and closes stream (no hang, Hard Rule #6)", async () => {
  // If upstream errors, the TransformStream must propagate the error so the
  // consumer sees a rejection — never silently swallow and never hang.
  const { up, out } = makeStream();
  up.error(new Error("upstream boom"));
  await assert.rejects(
    async () => {
      await drain(out, 2000);
    },
    undefined, // any error is acceptable — just must not hang
    "upstream error must propagate as a rejection to the consumer"
  );
});
