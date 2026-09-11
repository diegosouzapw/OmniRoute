import test from "node:test";
import assert from "node:assert/strict";

import {
  createSSEStream,
  createSSETransformStreamWithLogger,
} from "../../open-sse/utils/stream.ts";
import { FORMATS } from "../../open-sse/translator/formats.ts";

// A TransformStream's writable queue starts with `desiredSize === highWaterMark`,
// so reading it off a fresh writer measures the queue budget the stream was
// actually built with rather than standing in for it.
// Each stream arms a 10s idle watchdog (setInterval in createSSEStream's start).
// Cancelling the readable runs the TransformStream's cancel handler, which clears
// it — without this the node:test runner never sees an empty event loop and the
// file hangs after the assertions have already passed.
const openStreams: TransformStream[] = [];

const writableBudget = (transform: TransformStream) => {
  openStreams.push(transform);
  return transform.writable.getWriter().desiredSize;
};

test.after(async () => {
  for (const transform of openStreams) {
    await transform.readable.cancel().catch(() => {});
  }
});

const DEFAULT = 16384;

test.describe("SSE stream buffer budget", () => {
  test("defaults to the 16 KB every provider used before it was configurable", () => {
    const transform = createSSEStream({
      targetFormat: FORMATS.CLAUDE,
      sourceFormat: FORMATS.OPENAI,
    });

    assert.equal(writableBudget(transform), DEFAULT);
  });

  test("createSSEStream honours an explicit budget", () => {
    const transform = createSSEStream({
      targetFormat: FORMATS.CLAUDE,
      sourceFormat: FORMATS.OPENAI,
      streamBufferBytes: 65536,
    });

    assert.equal(writableBudget(transform), 65536);
  });

  // The defect this pins: glm.ts has passed a 16th positional argument since
  // #12179, and the signature stopped at 15. It was a type error, and the value
  // was dropped — the 64 KB that call site asks for never reached the queue.
  // These are the exact 16 arguments glm.ts passes.
  test("the convenience wrapper carries a 16th positional budget through", () => {
    const transform = createSSETransformStreamWithLogger(
      FORMATS.CLAUDE,
      FORMATS.OPENAI,
      "zai",
      null,
      null,
      "glm-4.6",
      null,
      null,
      null,
      null,
      null,
      false,
      false,
      undefined,
      undefined,
      65536
    );

    assert.equal(writableBudget(transform), 65536);
  });

  test("the wrapper still defaults when no budget is given", () => {
    const transform = createSSETransformStreamWithLogger(FORMATS.CLAUDE, FORMATS.OPENAI);

    assert.equal(writableBudget(transform), DEFAULT);
  });

  test("a budget of 0 is honoured rather than treated as absent", () => {
    // `?? DEFAULT` and `|| DEFAULT` differ here, and 0 is a legitimate
    // highWaterMark: it makes the queue apply backpressure immediately.
    const transform = createSSEStream({
      targetFormat: FORMATS.CLAUDE,
      sourceFormat: FORMATS.OPENAI,
      streamBufferBytes: 0,
    });

    assert.equal(writableBudget(transform), 0);
  });
});
