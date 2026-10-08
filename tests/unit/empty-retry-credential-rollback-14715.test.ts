import test from "node:test";
import assert from "node:assert/strict";

const { runEmptyTurnRetryLoop } =
  await import("../../open-sse/handlers/chatCore/emptyTurnRetryLoop.ts");

function sseResponse(text: string, status = 200): Response {
  const body = new ReadableStream({
    start(controller) {
      controller.enqueue(new TextEncoder().encode(text));
      controller.close();
    },
  });
  return new Response(body, { status, headers: { "content-type": "text/event-stream" } });
}

function sse(...frames: string[]): string {
  return frames.map((f) => `data: ${f}\n\n`).join("") + "data: [DONE]\n\n";
}

const chatChunk = (delta: Record<string, unknown>, finish: string | null = null) =>
  JSON.stringify({
    id: "chatcmpl-probe",
    object: "chat.completion.chunk",
    model: "probe",
    choices: [{ delta, finish_reason: finish }],
  });

const EMPTY_TURN = sse(chatChunk({ reasoning_content: "only thinking" }), chatChunk({}, "stop"));
const USEFUL_TURN = sse(chatChunk({ content: "hello" }), chatChunk({}, "stop"));

test("#14715 a rejected retry restores the original connection id", async () => {
  const credentials: Record<string, unknown> = { connectionId: "conn-original" };
  let seenOnExecute: string | null = null;

  await runEmptyTurnRetryLoop({
    providerResponse: sseResponse(EMPTY_TURN),
    credentials,
    provider: "openai",
    currentModel: "gpt-6-sol",
    model: "gpt-6-sol",
    targetFormat: "openai",
    clientResponseFormat: "openai",
    isAborted: () => false,
    timeoutMs: 1000,
    maxTimeoutMs: 1000,
    maxRetries: 1,
    translatedBody: {},
    finalBody: {},
    providerUrl: "https://example.test",
    providerHeaders: {},
    correlationId: "c",
    traceId: "t",
    log: null,
    getProviderCredentials: async () => ({ connectionId: "conn-retry" }),
    executeProviderRequest: async () => {
      seenOnExecute = String(credentials.connectionId);
      return { response: sseResponse(EMPTY_TURN, 500) };
    },
    noteOutcome: () => {},
    logTargetRequest: () => {},
    captureBody: (body: unknown) => body,
  });

  assert.equal(seenOnExecute, "conn-retry");
  assert.equal(credentials.connectionId, "conn-original");
});

test("#14715 an accepted retry keeps the retry connection", async () => {
  const credentials: Record<string, unknown> = { connectionId: "conn-original" };

  const result = await runEmptyTurnRetryLoop({
    providerResponse: sseResponse(EMPTY_TURN),
    credentials,
    provider: "openai",
    currentModel: "gpt-6-sol",
    model: "gpt-6-sol",
    targetFormat: "openai",
    clientResponseFormat: "openai",
    isAborted: () => false,
    timeoutMs: 1000,
    maxTimeoutMs: 1000,
    maxRetries: 1,
    translatedBody: {},
    finalBody: {},
    providerUrl: "https://example.test",
    providerHeaders: {},
    correlationId: "c",
    traceId: "t",
    log: null,
    getProviderCredentials: async () => ({ connectionId: "conn-retry" }),
    executeProviderRequest: async () => ({ response: sseResponse(USEFUL_TURN) }),
    noteOutcome: () => {},
    logTargetRequest: () => {},
    captureBody: (body: unknown) => body,
  });

  assert.equal(credentials.connectionId, "conn-retry");
  assert.equal(result.providerResponse.ok, true);
});

// ── #14914 maintainer rework: regressions introduced by the loop extraction ──

type LoopDeps = Parameters<typeof runEmptyTurnRetryLoop>[0];

function baseDeps(overrides: Partial<LoopDeps>): LoopDeps {
  return {
    providerResponse: sseResponse(EMPTY_TURN),
    credentials: { connectionId: "conn-original" },
    provider: "openai",
    currentModel: "gpt-6-sol",
    model: "gpt-6-sol",
    targetFormat: "openai",
    clientResponseFormat: "openai",
    isAborted: () => false,
    // 0 disables the stream-readiness wrapper, so the adopted response is the one
    // executeProviderRequest returned (lets the tests observe its body directly).
    timeoutMs: 0,
    maxTimeoutMs: 0,
    maxRetries: 1,
    translatedBody: { raw: "translated" },
    finalBody: { captured: "original" },
    providerUrl: "https://example.test",
    providerHeaders: {},
    correlationId: "c",
    traceId: "t",
    log: null,
    getProviderCredentials: async () => ({ connectionId: "conn-retry" }),
    executeProviderRequest: async () => ({ response: sseResponse(USEFUL_TURN) }),
    noteOutcome: () => {},
    logTargetRequest: () => {},
    captureBody: (body: unknown) => body,
    ...overrides,
  } as LoopDeps;
}

/** Counts cancel() calls on whatever stream currently backs `response.body` (clone() swaps it). */
function spyBodyCancels(response: Response): { count: number } {
  const counter = { count: 0 };
  const getter = Object.getOwnPropertyDescriptor(Response.prototype, "body")!.get!;
  Object.defineProperty(response, "body", {
    configurable: true,
    get() {
      const stream = getter.call(this) as ReadableStream | null;
      if (stream && !(stream as { __spied?: boolean }).__spied) {
        const cancel = stream.cancel.bind(stream);
        Object.assign(stream, {
          __spied: true,
          cancel: (reason?: unknown) => {
            counter.count++;
            return cancel(reason);
          },
        });
      }
      return stream;
    },
  });
  return counter;
}

test("#14914 no retry adopted: the captured finalBody comes back unchanged", async () => {
  const finalBody = { captured: "original" };
  const passed = await runEmptyTurnRetryLoop(
    baseDeps({ providerResponse: sseResponse(USEFUL_TURN), finalBody })
  );
  assert.equal(passed.adopted, false);
  assert.equal(passed.finalBody, finalBody);

  const rejected = await runEmptyTurnRetryLoop(
    baseDeps({
      finalBody,
      executeProviderRequest: async () => ({ response: sseResponse(EMPTY_TURN, 500) }),
    })
  );
  assert.equal(rejected.adopted, false);
  assert.equal(rejected.finalBody, finalBody);
});

test("#14914 an adopted retry replaces finalBody with the retry's captured body", async () => {
  const retryBody = { captured: "retry" };
  const result = await runEmptyTurnRetryLoop(
    baseDeps({
      executeProviderRequest: async () => ({
        response: sseResponse(USEFUL_TURN),
        transformedBody: retryBody,
      }),
    })
  );
  assert.equal(result.adopted, true);
  assert.equal(result.finalBody, retryBody);
});

test("#14914 a second retry cancels the previously adopted retry, not the original again", async () => {
  const original = sseResponse(EMPTY_TURN);
  const firstRetry = sseResponse(EMPTY_TURN);
  const originalCancels = spyBodyCancels(original);
  const firstRetryCancels = spyBodyCancels(firstRetry);
  const responses = [firstRetry, sseResponse(USEFUL_TURN)];

  const result = await runEmptyTurnRetryLoop(
    baseDeps({
      providerResponse: original,
      maxRetries: 2,
      executeProviderRequest: async () => ({ response: responses.shift() }),
    })
  );

  assert.equal(responses.length, 0, "both retries ran");
  assert.equal(result.adopted, true);
  assert.equal(originalCancels.count, 1, "the original is cancelled once, by the first retry");
  assert.equal(firstRetryCancels.count, 1, "the second retry releases the first retry's stream");
});

test("#14914 a client abort during the retries is observed on the next iteration", async () => {
  let executions = 0;
  const droppedStream = () =>
    new Response(
      new ReadableStream({
        start(controller) {
          controller.error(new Error("upstream dropped"));
        },
      }),
      { status: 200, headers: { "content-type": "text/event-stream" } }
    );

  await runEmptyTurnRetryLoop(
    baseDeps({
      maxRetries: 3,
      // The client goes away once the first retry has been dispatched.
      isAborted: () => executions >= 1,
      executeProviderRequest: async () => {
        executions++;
        return { response: droppedStream() };
      },
    })
  );

  assert.equal(executions, 1, "a dropped stream after the client left must not be retried");
});
