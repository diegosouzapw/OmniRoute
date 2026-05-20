import test from "node:test";
import assert from "node:assert/strict";

import {
  createDisconnectAwareStream,
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
  assert.match(text, /"code":429/);
  assert.match(text, /\[DONE\]/);
});

test("createDisconnectAwareStream emits Responses API failure events for Responses clients", async () => {
  const upstreamError = Object.assign(new Error("responses stream died"), { statusCode: 503 });
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
  assert.match(text, /"message":"responses stream died"/);
  assert.match(text, /"type":"server_error"/);
  assert.match(text, /"code":"server_error"/);
  assert.doesNotMatch(text, /chat\.completion\.chunk/);
  assert.doesNotMatch(text, /"finish_reason":"error"/);
  assert.doesNotMatch(text, /\[DONE\]/);
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
