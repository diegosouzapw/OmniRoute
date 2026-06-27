import test from "node:test";
import assert from "node:assert/strict";

import {
  createDisconnectAwareStream,
  createNoopAbortWritable,
  createStreamController,
  pipeWithDisconnect,
} from "../../open-sse/utils/streamHandler.ts";
import { FORMATS } from "../../open-sse/translator/formats.ts";
import {
  clearPendingRequests,
  getPendingRequests,
  trackPendingRequest,
} from "../../src/lib/usage/usageHistory.ts";

const encoder = new TextEncoder();
const decoder = new TextDecoder();
const PENDING_REQUEST_CLEARED_MARKER = "__omniroutePendingRequestCleared";

async function readStreamText(stream) {
  const reader = stream.getReader();
  const chunks = [];

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    chunks.push(value);
  }

  return decoder.decode(
    chunks.length === 1 ? chunks[0] : Uint8Array.from(chunks.flatMap((chunk) => Array.from(chunk)))
  );
}

test("createDisconnectAwareStream converts upstream errors into SSE error chunks", async () => {
  const upstreamError = Object.assign(new Error("provider exploded"), { statusCode: 429 });
  const transformStream = {
    readable: new ReadableStream({
      start(controller) {
        controller.error(upstreamError);
      },
    }),
    writable: {
      getWriter() {
        return {
          abort() {},
        };
      },
    },
  };

  const stream = createDisconnectAwareStream(transformStream, createStreamController());
  const text = await readStreamText(stream);

  assert.match(text, /"finish_reason":"error"/);
  assert.match(text, /"message":"provider exploded"/);
  assert.match(text, /"code":"rate_limit_exceeded"/);
  assert.match(text, /\[DONE\]/);
});

test("createDisconnectAwareStream treats errors after OpenAI DONE as successful completion", async () => {
  let pullCount = 0;
  let errorHandled = false;
  const transformStream = {
    readable: new ReadableStream({
      pull(controller) {
        pullCount += 1;
        if (pullCount === 1) {
          controller.enqueue(encoder.encode("data: [DONE]\n\n"));
          return;
        }
        controller.error(new Error("terminated"));
      },
    }),
    writable: {
      getWriter() {
        return {
          abort() {},
        };
      },
    },
  };

  const stream = createDisconnectAwareStream(
    transformStream,
    createStreamController({
      onError() {
        errorHandled = true;
      },
    })
  );
  const text = await readStreamText(stream);

  assert.equal(text, "data: [DONE]\n\n");
  assert.equal(errorHandled, false);
  assert.doesNotMatch(text, /finish_reason/);
  assert.doesNotMatch(text, /terminated/);
});

test("createDisconnectAwareStream: Gemini 503 high-demand error becomes SSE error chunk with message preserved", async () => {
  const geminiMsg =
    "[503]: This model is currently experiencing high demand. Spikes in demand are usually temporary. Please try again later.";
  const upstreamError = Object.assign(new Error(geminiMsg), { statusCode: 503 });
  const transformStream = {
    readable: new ReadableStream({
      start(controller) {
        controller.error(upstreamError);
      },
    }),
    writable: {
      getWriter() {
        return {
          abort() {},
        };
      },
    },
  };

  const stream = createDisconnectAwareStream(transformStream, createStreamController());
  const text = await readStreamText(stream);

  assert.match(text, /"finish_reason":"error"/);
  assert.match(text, /"message":"\[503\]: This model is currently experiencing high demand/);
  assert.match(text, /"type":"server_error"/);
  assert.match(text, /"code":"server_error"/);
  assert.match(text, /\[DONE\]/);
});

test("createDisconnectAwareStream emits Responses API failure events for Responses clients", async () => {
  const upstreamError = Object.assign(new Error("responses stream\ndied"), { statusCode: 503 });
  const transformStream = {
    readable: new ReadableStream({
      start(controller) {
        controller.error(upstreamError);
      },
    }),
    writable: {
      getWriter() {
        return {
          abort() {},
        };
      },
    },
  };

  const stream = createDisconnectAwareStream(
    transformStream,
    createStreamController({ clientResponseFormat: FORMATS.OPENAI_RESPONSES })
  );
  const text = await readStreamText(stream);

  assert.match(text, /event: response\.failed/);
  assert.match(text, /"type":"response\.failed"/);
  assert.match(text, /"message":"responses stream\\ndied"/);
  assert.match(text, /"type":"server_error"/);
  assert.match(text, /"code":"server_error"/);
  assert.doesNotMatch(text, /chat\.completion\.chunk/);
  assert.doesNotMatch(text, /"finish_reason":"error"/);
  assert.doesNotMatch(text, /\[DONE\]/);
});

test("createDisconnectAwareStream keeps newlines escaped inside SSE data fields", async () => {
  const upstreamError = Object.assign(new Error("line one\nline two\rline three"), {
    statusCode: 400,
  });
  const transformStream = {
    readable: new ReadableStream({
      start(controller) {
        controller.error(upstreamError);
      },
    }),
    writable: {
      getWriter() {
        return {
          abort() {},
        };
      },
    },
  };

  const stream = createDisconnectAwareStream(
    transformStream,
    createStreamController({ clientResponseFormat: FORMATS.OPENAI_RESPONSES })
  );
  const text = await readStreamText(stream);

  assert.match(text, /^event: response\.failed\ndata: \{"type":"response\.failed"/);
  assert.match(text, /"message":"line one\\nline two\\rline three"/);
  assert.doesNotMatch(text, /^line two/m);
  assert.doesNotMatch(text, /^line three/m);
});

test("createDisconnectAwareStream treats legacy OpenAI response format alias as Responses", async () => {
  const upstreamError = Object.assign(new Error("legacy responses alias died"), {
    statusCode: 429,
  });
  const transformStream = {
    readable: new ReadableStream({
      start(controller) {
        controller.error(upstreamError);
      },
    }),
    writable: {
      getWriter() {
        return {
          abort() {},
        };
      },
    },
  };

  const stream = createDisconnectAwareStream(
    transformStream,
    createStreamController({ clientResponseFormat: FORMATS.OPENAI_RESPONSE })
  );
  const text = await readStreamText(stream);

  assert.match(text, /event: response\.failed/);
  assert.match(text, /"type":"rate_limit_error"/);
  assert.match(text, /"code":"rate_limit_exceeded"/);
  assert.doesNotMatch(text, /chat\.completion\.chunk/);
  assert.doesNotMatch(text, /\[DONE\]/);
});

test("createDisconnectAwareStream emits Claude SSE errors for Claude clients", async () => {
  const upstreamError = Object.assign(new Error("claude stream died"), { statusCode: 502 });
  const transformStream = {
    readable: new ReadableStream({
      start(controller) {
        controller.error(upstreamError);
      },
    }),
    writable: {
      getWriter() {
        return {
          abort() {},
        };
      },
    },
  };

  const stream = createDisconnectAwareStream(
    transformStream,
    createStreamController({ clientResponseFormat: FORMATS.CLAUDE })
  );
  const text = await readStreamText(stream);

  assert.match(text, /event: error/);
  assert.match(text, /"type":"error"/);
  assert.match(text, /"type":"api_error"/);
  assert.match(text, /"message":"claude stream died"/);
  assert.doesNotMatch(text, /"code"/);
  assert.doesNotMatch(text, /chat\.completion\.chunk/);
  assert.doesNotMatch(text, /"finish_reason":"error"/);
  assert.doesNotMatch(text, /\[DONE\]/);
});

test("createDisconnectAwareStream keeps newlines escaped for Claude SSE errors", async () => {
  const upstreamError = Object.assign(new Error("claude line one\nclaude line two"), {
    statusCode: 502,
  });
  const transformStream = {
    readable: new ReadableStream({
      start(controller) {
        controller.error(upstreamError);
      },
    }),
    writable: {
      getWriter() {
        return {
          abort() {},
        };
      },
    },
  };

  const stream = createDisconnectAwareStream(
    transformStream,
    createStreamController({ clientResponseFormat: FORMATS.CLAUDE })
  );
  const text = await readStreamText(stream);

  assert.match(text, /^event: error\ndata: \{"type":"error"/);
  assert.match(text, /"message":"claude line one\\nclaude line two"/);
  assert.doesNotMatch(text, /^claude line two/m);
});

test("createDisconnectAwareStream cancel propagates disconnect reason and aborts the writer", async () => {
  let aborted = false;
  let disconnectEvent = null;

  const transformStream = {
    readable: new ReadableStream({
      pull() {},
      cancel() {},
    }),
    writable: {
      getWriter() {
        return {
          abort() {
            aborted = true;
          },
        };
      },
    },
  };

  const controller = createStreamController({
    onDisconnect(event) {
      disconnectEvent = event;
    },
  });
  const stream = createDisconnectAwareStream(transformStream, controller);

  await stream.cancel("client-gone");

  await new Promise((resolve) => setTimeout(resolve, 2050));

  assert.equal(aborted, true);
  assert.equal(controller.isConnected(), false);
  assert.equal(disconnectEvent.reason, "client-gone");
  assert.ok(disconnectEvent.duration >= 0);
});

test("createNoopAbortWritable: getWriter().abort() returns a resolved Promise (matches WritableStreamDefaultWriter contract)", async () => {
  // The mock writable that pipeWithDisconnect hands to createDisconnectAwareStream
  // is consumed only via its writer's abort() hook (in the cancel() path). The
  // native WritableStreamDefaultWriter.abort() returns Promise<void>; the mock
  // must match that contract so cancel/error handling can await it instead of
  // receiving `undefined`. Ported from decolua/9router@6b624af4.
  const writable = createNoopAbortWritable();
  const writer = writable.getWriter();

  const aborted = writer.abort();

  assert.ok(aborted instanceof Promise, "abort() must return a Promise, not undefined");
  // Awaiting must resolve cleanly to undefined (Promise<void>), never reject.
  assert.equal(await aborted, undefined);
});

test("createNoopAbortWritable: cancelling a stream wired through it awaits the abort promise without throwing", async () => {
  // End-to-end seam: the noop writable is what pipeWithDisconnect injects. Wire
  // it into createDisconnectAwareStream exactly as production does and drive the
  // cancel() path. With abort() returning undefined (the pre-fix shape) this
  // still completes, but a thenable abort keeps the cancel/error path clean.
  const transformStream = {
    readable: new ReadableStream({
      pull() {},
      cancel() {},
    }),
    writable: createNoopAbortWritable(),
  };

  const stream = createDisconnectAwareStream(transformStream, createStreamController());

  await assert.doesNotReject(stream.cancel("client-gone"));
});

test("createDisconnectAwareStream uses the default cancel reason when none is provided", async () => {
  let disconnectEvent = null;

  const transformStream = {
    readable: new ReadableStream({
      cancel() {},
    }),
    writable: {
      getWriter() {
        return {
          abort() {},
        };
      },
    },
  };

  const controller = createStreamController({
    onDisconnect(event) {
      disconnectEvent = event;
    },
  });
  const stream = createDisconnectAwareStream(transformStream, controller);

  await stream.cancel();

  assert.equal(disconnectEvent.reason, "cancelled");
});

test("createDisconnectAwareStream closes immediately when the controller is already disconnected", async () => {
  const controller = createStreamController();
  controller.handleDisconnect("preclosed");

  const stream = createDisconnectAwareStream(
    {
      readable: new ReadableStream({
        pull(inner) {
          inner.enqueue(encoder.encode("ignored"));
        },
      }),
      writable: {
        getWriter() {
          return {
            abort() {},
          };
        },
      },
    },
    controller
  );
  const reader = stream.getReader();
  const first = await reader.read();

  assert.equal(first.done, true);
});

test("createStreamController aborts after delayed disconnect and tolerates abort/unknown errors", async () => {
  const controller = createStreamController();
  const errorOnlyController = createStreamController();

  controller.handleDisconnect();
  controller.handleDisconnect("ignored-repeat");
  errorOnlyController.handleError(new DOMException("aborted", "AbortError"));
  errorOnlyController.handleError({ statusCode: 418 });

  await new Promise((resolve) => setTimeout(resolve, 2050));

  assert.equal(controller.signal.aborted, true);
  assert.equal(controller.isConnected(), false);
  assert.equal(errorOnlyController.signal.aborted, false);
});

test("pipeWithDisconnect pipes transformed bytes and marks the controller complete", async () => {
  const source = new ReadableStream({
    start(controller) {
      controller.enqueue(encoder.encode("hello"));
      controller.close();
    },
  });
  const providerResponse = new Response(source);
  const controller = createStreamController();
  const stream = pipeWithDisconnect(providerResponse, new TransformStream(), controller);

  const text = await readStreamText(stream);

  assert.equal(text, "hello");
  assert.equal(controller.isConnected(), false);
});

test("pipeWithDisconnect clears pending requests when the upstream stream errors", async () => {
  clearPendingRequests();
  const provider = "openai";
  const model = "gpt-stream-error";
  const connectionId = "conn-stream-error";
  const modelKey = `${model} (${provider})`;

  trackPendingRequest(model, provider, connectionId, true);

  const source = new ReadableStream({
    start(controller) {
      controller.error(Object.assign(new Error("socket closed"), { statusCode: 502 }));
    },
  });
  const stream = pipeWithDisconnect(
    new Response(source),
    new TransformStream(),
    createStreamController({ provider, model, connectionId })
  );

  const text = await readStreamText(stream);
  const pending = getPendingRequests();

  assert.match(text, /"message":"socket closed"/);
  assert.equal(pending.byModel[modelKey], 0);
  assert.equal(pending.details[connectionId], undefined);
});

test("pipeWithDisconnect lets controller onError own pending cleanup", async () => {
  clearPendingRequests();
  const provider = "openai";
  const model = "gpt-stream-error-owned";
  const connectionId = "conn-stream-error-owned";
  const modelKey = `${model} (${provider})`;
  let errorEvent = null;

  trackPendingRequest(model, provider, connectionId, true);

  const source = new ReadableStream({
    start(controller) {
      controller.error(Object.assign(new Error("terminated"), { statusCode: 502 }));
    },
  });
  const stream = pipeWithDisconnect(
    new Response(source),
    new TransformStream(),
    createStreamController({
      provider,
      model,
      connectionId,
      onError(event) {
        errorEvent = event;
        return true;
      },
    })
  );

  const text = await readStreamText(stream);
  const pending = getPendingRequests();

  assert.match(text, /"message":"terminated"/);
  assert.equal(errorEvent?.statusCode, 502);
  assert.equal(pending.byModel[modelKey], 1);
  assert.equal(pending.byAccount[connectionId][modelKey], 1);
});

test("pipeWithDisconnect does not double-clear transform errors already accounted for", async () => {
  clearPendingRequests();
  const provider = "openai";
  const model = "gpt-marked-error";
  const connectionId = "conn-marked-error";
  const modelKey = `${model} (${provider})`;

  trackPendingRequest(model, provider, connectionId, true);
  trackPendingRequest(model, provider, connectionId, true);
  trackPendingRequest(model, provider, connectionId, false);

  const markedError = Object.assign(new Error("already cleared"), {
    [PENDING_REQUEST_CLEARED_MARKER]: true,
  });
  const source = new ReadableStream({
    start(controller) {
      controller.error(markedError);
    },
  });
  const stream = pipeWithDisconnect(
    new Response(source),
    new TransformStream(),
    createStreamController({ provider, model, connectionId })
  );

  await readStreamText(stream);
  const pending = getPendingRequests();

  assert.equal(pending.byModel[modelKey], 1);
  assert.equal(pending.byAccount[connectionId][modelKey], 1);
});

test("createDisconnectAwareStream ignores reader errors after client disconnect", async () => {
  let readableController!: ReadableStreamDefaultController;
  let onErrorCalled = false;
  const transformStream = {
    readable: new ReadableStream({
      start(controller) {
        readableController = controller;
      },
    }),
    writable: {
      getWriter() {
        return {
          abort() {},
        };
      },
    },
  };
  const streamController = createStreamController({
    onError() {
      onErrorCalled = true;
      return true;
    },
  });
  const stream = createDisconnectAwareStream(transformStream, streamController);
  const reader = stream.getReader();
  const readPromise = reader.read();

  streamController.handleDisconnect("ResponseAborted");
  readableController.error(new Error("Invalid state: Controller is already closed"));

  const result = await readPromise;

  assert.equal(result.done, true);
  assert.equal(onErrorCalled, false, "disconnect races must not be recorded as upstream errors");
});

// Stall detection: tied to RAW upstream byte activity, not transform output.
// Ports decolua/9router#1243 — reasoning models (Claude thinking, Kiro
// EventStream binary frames) can stream raw bytes for long stretches while
// the SSE transform produces zero output as it accumulates a frame. The
// stall watchdog must NOT fire on those slow-but-progressing streams.
test("pipeWithDisconnect does NOT flag a slow but progressing upstream as stalled (no false positive)", async () => {
  // Upstream emits 3 small chunks 30ms apart (90ms total). The transform
  // never forwards any output (simulates a translator buffering a frame
  // boundary that has not yet completed). The stall budget is 200ms — well
  // above the 30ms gap between upstream bytes, so a byte-activity watchdog
  // should never fire. A transform-output-activity watchdog would
  // false-stall here.
  const source = new ReadableStream({
    async start(controller) {
      controller.enqueue(encoder.encode("a"));
      await new Promise((r) => setTimeout(r, 30));
      controller.enqueue(encoder.encode("b"));
      await new Promise((r) => setTimeout(r, 30));
      controller.enqueue(encoder.encode("c"));
      await new Promise((r) => setTimeout(r, 30));
      controller.close();
    },
  });

  // Black-hole transform — consumes every byte, emits nothing until flush.
  const swallowingTransform = new TransformStream({
    transform() {
      /* drop chunk — output stream is silent */
    },
    flush(controller) {
      controller.enqueue(encoder.encode("done"));
    },
  });

  let onErrorCalled = false;
  const streamController = createStreamController({
    onError() {
      onErrorCalled = true;
      return true;
    },
  });

  const stream = pipeWithDisconnect(new Response(source), swallowingTransform, streamController, {
    stallTimeoutMs: 200,
  });

  const text = await readStreamText(stream);

  // No stall error — final flush output reaches the client cleanly.
  assert.equal(text, "done");
  assert.equal(
    onErrorCalled,
    false,
    "stall watchdog must NOT fire on a slow but progressing upstream"
  );
  assert.doesNotMatch(text, /stall/i);
  assert.doesNotMatch(text, /"finish_reason":"error"/);
});

test("pipeWithDisconnect flags a truly stalled upstream (no bytes for the full stall budget)", async () => {
  // Upstream emits one byte and then goes silent forever. Stall budget is
  // 80ms — the watchdog must fire and surface a stream-stall error.
  const source = new ReadableStream({
    start(controller) {
      controller.enqueue(encoder.encode("x"));
      // never enqueue again, never close — simulate a truly hung upstream
    },
    cancel() {
      // upstream cancel hook so the stall abort path can release the source
    },
  });

  let onErrorEvent = null;
  const streamController = createStreamController({
    onError(event) {
      onErrorEvent = event;
      return true;
    },
  });

  const stream = pipeWithDisconnect(new Response(source), new TransformStream(), streamController, {
    stallTimeoutMs: 80,
  });

  const text = await readStreamText(stream);

  assert.ok(onErrorEvent !== null, "stall watchdog must fire when upstream stops sending bytes");
  assert.match(onErrorEvent.message, /stall/i);
  assert.match(text, /stall/i);
  assert.match(text, /"finish_reason":"error"/);
});

test("pipeWithDisconnect stall watchdog does not fire after normal stream completion", async () => {
  // Upstream completes quickly. The stall timer must be cleared on
  // completion so a stale abort cannot fire after the request has ended.
  const source = new ReadableStream({
    start(controller) {
      controller.enqueue(encoder.encode("ok"));
      controller.close();
    },
  });

  let onErrorCalled = false;
  const streamController = createStreamController({
    onError() {
      onErrorCalled = true;
      return true;
    },
  });

  const stream = pipeWithDisconnect(new Response(source), new TransformStream(), streamController, {
    stallTimeoutMs: 50,
  });

  const text = await readStreamText(stream);

  // Wait past the stall budget — no late stall error must surface.
  await new Promise((r) => setTimeout(r, 120));

  assert.equal(text, "ok");
  assert.equal(onErrorCalled, false, "stall watchdog must be cleared on stream completion");
});
