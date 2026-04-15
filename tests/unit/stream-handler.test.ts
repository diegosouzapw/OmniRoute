import test from "node:test";
import assert from "node:assert/strict";

import {
  createDisconnectAwareStream,
  createStreamController,
  pipeWithDisconnect,
} from "../../open-sse/utils/streamHandler.ts";

const encoder = new TextEncoder();
const decoder = new TextDecoder();

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
  assert.match(text, /"code":429/);
  assert.match(text, /\[DONE\]/);
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

  assert.equal(aborted, true);
  assert.equal(controller.isConnected(), false);
  assert.equal(disconnectEvent.reason, "client-gone");
  assert.ok(disconnectEvent.duration >= 0);
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

  await new Promise((resolve) => setTimeout(resolve, 550));

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
