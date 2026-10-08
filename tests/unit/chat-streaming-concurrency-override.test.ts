import assert from "node:assert/strict";
import test from "node:test";

import { createChatPipelineHarness } from "../integration/_chatPipelineHarness.ts";

const originalDisconnectGrace = process.env.STREAM_DISCONNECT_GRACE_PERIOD_MS;
process.env.STREAM_DISCONNECT_GRACE_PERIOD_MS = "0";
const harness = await createChatPipelineHarness("streaming-concurrency-override");
const { buildRequest, callLogsDb, handleChat, resetStorage, waitFor } = harness;
const providersDb = await import("../../src/lib/db/providers.ts");
const readCache = await import("../../src/lib/db/readCache.ts");
const auth = await import("../../src/sse/services/auth.ts");
const proxyLogger = await import("../../src/lib/proxyLogger.ts");
const rateLimitManager = await import("../../open-sse/services/rateLimitManager.ts");
const accountSemaphore = await import("../../open-sse/services/accountSemaphore.ts");

const encoder = new TextEncoder();

type ControlledStream = {
  controller: ReadableStreamDefaultController<Uint8Array>;
  settled: boolean;
};

function initialChunk(index: number): Uint8Array {
  return encoder.encode(
    `data: ${JSON.stringify({
      id: `chatcmpl_synthetic_${index}`,
      object: "chat.completion.chunk",
      choices: [
        {
          index: 0,
          delta: { role: "assistant", content: `chunk-${index}` },
          finish_reason: null,
        },
      ],
    })}\n\n`
  );
}

function finishStream(stream: ControlledStream): void {
  if (stream.settled) return;
  stream.settled = true;
  stream.controller.enqueue(
    encoder.encode(
      `data: ${JSON.stringify({
        id: "chatcmpl_synthetic_done",
        object: "chat.completion.chunk",
        choices: [{ index: 0, delta: {}, finish_reason: "stop" }],
      })}\n\n`
    )
  );
  stream.controller.enqueue(encoder.encode("data: [DONE]\n\n"));
  stream.controller.close();
}

test.beforeEach(async () => {
  accountSemaphore.resetAll();
  await rateLimitManager.__resetRateLimitManagerForTests();
  await resetStorage();
});

test.after(async () => {
  proxyLogger.flushProxyLogsSync();
  accountSemaphore.resetAll();
  await rateLimitManager.__resetRateLimitManagerForTests();
  await harness.cleanup();
  if (originalDisconnectGrace === undefined) delete process.env.STREAM_DISCONNECT_GRACE_PERIOD_MS;
  else process.env.STREAM_DISCONNECT_GRACE_PERIOD_MS = originalDisconnectGrace;
});

test("nested maxConcurrent holds a connection slot until each streaming body settles", async () => {
  const connection = await providersDb.createProviderConnection({
    provider: "openai",
    authType: "apikey",
    name: "synthetic-stream-cap",
    apiKey: "sk-synthetic-stream-cap",
    isActive: true,
    testStatus: "active",
    maxConcurrent: null,
    rateLimitProtection: true,
    rateLimitOverrides: { maxConcurrent: 2, minTime: 1, maxWaitMs: 10_000 },
  });
  readCache.invalidateDbCache("connections");
  await rateLimitManager.initializeRateLimits();

  const cappedCredentials = await auth.getProviderCredentials(
    "openai",
    null,
    null,
    "synthetic-stream-model",
    { forcedConnectionId: connection.id }
  );
  assert.equal(cappedCredentials?.rateLimitMaxConcurrent, 2);

  const uncappedConnection = await providersDb.createProviderConnection({
    provider: "openai",
    authType: "apikey",
    name: "synthetic-stream-uncapped",
    apiKey: "sk-synthetic-stream-uncapped",
    isActive: true,
    testStatus: "active",
    maxConcurrent: null,
    rateLimitProtection: true,
    rateLimitOverrides: null,
  });
  readCache.invalidateDbCache("connections");
  const uncappedCredentials = await auth.getProviderCredentials(
    "openai",
    null,
    null,
    "synthetic-stream-model",
    { forcedConnectionId: uncappedConnection.id }
  );
  assert.equal(uncappedCredentials?.rateLimitMaxConcurrent, null);
  const rotatedCredentials = { ...cappedCredentials } as Record<string, unknown>;
  Object.assign(rotatedCredentials, uncappedCredentials);
  assert.equal(rotatedCredentials.rateLimitMaxConcurrent, null, "rotation must clear a stale cap");
  await providersDb.deleteProviderConnection(uncappedConnection.id);
  readCache.invalidateDbCache("connections");

  const streams: ControlledStream[] = [];
  let dispatches = 0;
  globalThis.fetch = async () => {
    const index = dispatches++;
    let controlled!: ControlledStream;
    const body = new ReadableStream<Uint8Array>({
      start(controller) {
        controlled = { controller, settled: false };
        streams.push(controlled);
        controller.enqueue(initialChunk(index));
      },
      cancel() {
        controlled.settled = true;
      },
    });
    return new Response(body, {
      status: 200,
      headers: { "Content-Type": "text/event-stream" },
    });
  };

  const makeRequest = (index: number) =>
    handleChat(
      buildRequest({
        body: {
          model: "openai/synthetic-stream-model",
          stream: true,
          messages: [{ role: "user", content: `synthetic request ${index}` }],
        },
      })
    );
  const firstTwo = [makeRequest(0), makeRequest(1)];
  const [first, second] = await Promise.all(firstTwo);
  const thirdPending = makeRequest(2);
  const pending = [Promise.resolve(first), Promise.resolve(second), thirdPending];
  const semaphoreKey = accountSemaphore.buildAccountSemaphoreKey({
    provider: "openai",
    accountKey: connection.id,
  });

  try {
    assert.ok(await waitFor(() => dispatches >= 2), "first two requests did not dispatch");
    assert.ok(
      await waitFor(() => accountSemaphore.getStats()[semaphoreKey]?.queued === 1),
      "the third request did not reach the connection queue"
    );
    assert.equal(dispatches, 2, "the third request must wait while two response bodies are open");

    assert.deepEqual(accountSemaphore.getStats()[semaphoreKey], {
      running: 2,
      queued: 1,
      maxConcurrency: 2,
      blockedUntil: null,
    });

    await first.body?.cancel("synthetic client cancellation");
    assert.ok(
      await waitFor(() => dispatches === 3),
      "cancelling one stream did not release a slot"
    );

    const third = await thirdPending;
    await Promise.all([
      second.body?.cancel("synthetic cleanup"),
      third.body?.cancel("synthetic cleanup"),
    ]);
    assert.ok(
      await waitFor(() => accountSemaphore.getStats()[semaphoreKey] === undefined),
      "settled streams leaked the connection semaphore"
    );
    assert.ok(await waitFor(() => streams.every((stream) => stream.settled)));
    await new Promise((resolve) => setTimeout(resolve, 100));
    assert.equal(await callLogsDb.waitForCallLogSaves(10_000), true);
    proxyLogger.flushProxyLogsSync();
  } finally {
    for (const stream of streams) finishStream(stream);
    await Promise.allSettled(
      pending.map(async (responsePromise) => {
        const response = await responsePromise;
        await response.body?.cancel().catch(() => {});
      })
    );
  }
});

test("nested maxConcurrent timeout returns 429 without an unhandled rejection", async () => {
  const generousOverrides = { maxConcurrent: 2, minTime: 1, maxWaitMs: 10_000 };
  const tightOverrides = { ...generousOverrides, maxWaitMs: 25 };
  const connection = await providersDb.createProviderConnection({
    provider: "openai",
    authType: "apikey",
    name: "synthetic-timeout-cap",
    apiKey: "sk-synthetic-timeout-cap",
    isActive: true,
    testStatus: "active",
    maxConcurrent: null,
    rateLimitProtection: true,
    // The two holders and the later request must be admitted on any machine, so they run
    // with a generous queue budget. Only the request that is meant to time out gets the
    // tight 25ms budget (applied below through the same refresh path the provider PUT
    // route uses). With 25ms for everyone, a CPU-starved runner let a holder's gate +
    // rate-limiter wait exceed the budget, the holder got a legitimate 503 and the test
    // failed with `dispatches` 1 (or 0) instead of 2 at the first assertion.
    rateLimitOverrides: generousOverrides,
  });
  readCache.invalidateDbCache("connections");
  await rateLimitManager.initializeRateLimits();

  const streams: ControlledStream[] = [];
  // Key each upstream stream by the holder index in its request body: the two holders are
  // sent concurrently, so dispatch order (streams[0] vs streams[1]) is not guaranteed to
  // match `first`/`second` on a loaded runner.
  const holderStreams = new Map<number, ControlledStream>();
  const holderStream = (holder: number): ControlledStream => {
    const stream = holderStreams.get(holder);
    assert.ok(stream, `holder ${holder} never reached the provider`);
    return stream;
  };
  let dispatches = 0;
  globalThis.fetch = async (_input: unknown, init?: RequestInit) => {
    const index = dispatches++;
    const requestBody =
      typeof init?.body === "string"
        ? init.body
        : init?.body instanceof Uint8Array
          ? new TextDecoder().decode(init.body)
          : "";
    const holder = /synthetic holder (\d+)/.exec(requestBody)?.[1];
    let controlled!: ControlledStream;
    const body = new ReadableStream<Uint8Array>({
      start(controller) {
        controlled = { controller, settled: false };
        streams.push(controlled);
        if (holder !== undefined) holderStreams.set(Number(holder), controlled);
        controller.enqueue(initialChunk(index));
      },
    });
    return new Response(body, {
      status: 200,
      headers: { "Content-Type": "text/event-stream" },
    });
  };

  const makeStreamingRequest = (index: number) =>
    handleChat(
      buildRequest({
        body: {
          model: "openai/synthetic-timeout-model",
          stream: true,
          messages: [{ role: "user", content: `synthetic holder ${index}` }],
        },
      })
    );
  const [first, second] = await Promise.all([makeStreamingRequest(0), makeStreamingRequest(1)]);
  const responses = [first, second];
  const semaphoreKey = accountSemaphore.buildAccountSemaphoreKey({
    provider: "openai",
    accountKey: connection.id,
  });
  const unhandled: unknown[] = [];
  const onUnhandled = (reason: unknown) => unhandled.push(reason);
  process.on("unhandledRejection", onUnhandled);

  try {
    assert.equal(dispatches, 2);
    rateLimitManager.refreshConnectionRateLimits(connection.id, tightOverrides);
    const rejected = await handleChat(
      buildRequest({
        body: {
          model: "openai/synthetic-timeout-model",
          stream: false,
          temperature: 0.1,
          messages: [{ role: "user", content: "synthetic queued request" }],
        },
      })
    );

    assert.equal(rejected.status, 429);
    assert.equal(dispatches, 2, "a timed-out request must not reach the provider");
    assert.equal(accountSemaphore.getStats()[semaphoreKey]?.queued, 0);
    assert.equal(accountSemaphore.getStats()[semaphoreKey]?.running, 2);
    assert.ok(
      streams.every((stream) => !stream.settled),
      "the admitted streams must stay alive"
    );
    await new Promise((resolve) => setImmediate(resolve));
    assert.deepEqual(unhandled, [], "a handled queue timeout must not escape the request");
    rateLimitManager.refreshConnectionRateLimits(connection.id, generousOverrides);

    finishStream(holderStream(0));
    await first.text();
    assert.ok(
      await waitFor(() => accountSemaphore.getStats()[semaphoreKey]?.running === 1),
      "finishing one stream did not release its slot"
    );

    const subsequent = await makeStreamingRequest(2);
    responses.push(subsequent);
    assert.equal(subsequent.status, 200);
    assert.equal(dispatches, 3, "a later request must dispatch after a stream releases its slot");

    finishStream(holderStream(1));
    finishStream(holderStream(2));
    await Promise.all([second.text(), subsequent.text()]);
    assert.ok(
      await waitFor(() => accountSemaphore.getStats()[semaphoreKey] === undefined),
      "completed streams leaked the connection semaphore"
    );
    await new Promise((resolve) => setTimeout(resolve, 100));
    assert.equal(await callLogsDb.waitForCallLogSaves(10_000), true);
    proxyLogger.flushProxyLogsSync();
  } finally {
    process.off("unhandledRejection", onUnhandled);
    for (const stream of streams) {
      // Cleanup only: a stream the pipeline already closed must not replace the real failure.
      try {
        finishStream(stream);
      } catch {}
    }
    await Promise.allSettled(responses.map((response) => response.text()));
    proxyLogger.flushProxyLogsSync();
  }
});
