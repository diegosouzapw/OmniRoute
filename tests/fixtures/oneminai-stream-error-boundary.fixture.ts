import assert from "node:assert/strict";
import test from "node:test";

assert.ok(process.env.DATA_DIR, "the parent harness must provide an isolated DATA_DIR");
assert.ok(
  process.env.OMNIROUTE_PLUGINS_DIR,
  "the parent harness must provide an isolated OMNIROUTE_PLUGINS_DIR"
);

const [
  { OneMinAiExecutor },
  { ensureStreamReadiness },
  dbCore,
  settingsDb,
  callLogs,
  usageHistory,
  accountSemaphore,
  readCache,
  { handleChatCore },
] = await Promise.all([
  import("../../open-sse/executors/oneminai.ts"),
  import("../../open-sse/utils/streamReadiness.ts"),
  import("../../src/lib/db/core.ts"),
  import("../../src/lib/db/settings.ts"),
  import("../../src/lib/usage/callLogs.ts"),
  import("../../src/lib/usage/usageHistory.ts"),
  import("../../open-sse/services/accountSemaphore.ts"),
  import("../../src/lib/db/readCache.ts"),
  import("../../open-sse/handlers/chatCore.ts"),
]);

const originalFetch = globalThis.fetch;
const encoder = new TextEncoder();
const STREAM_URL = "https://api.1min.ai/api/chat-with-ai?isStreaming=true";

type PersistenceIdentity = {
  model: string;
  connectionId: string;
};

const PRE_CONTENT_IDENTITY: PersistenceIdentity = {
  model: "gpt-4o-mini-onemin-pre-content-boundary",
  connectionId: "onemin-stream-pre-content-boundary",
};
const BATCHED_IDENTITY: PersistenceIdentity = {
  model: "gpt-4o-mini-onemin-batched-boundary",
  connectionId: "onemin-stream-batched-boundary",
};
const PARTIAL_IDENTITY: PersistenceIdentity = {
  model: "gpt-4o-mini-onemin-partial-boundary",
  connectionId: "onemin-stream-partial-boundary",
};

function installFetchFactory(responseFactory: () => Response): () => number {
  let calls = 0;
  globalThis.fetch = async (input, init = {}) => {
    calls += 1;
    assert.equal(String(input), STREAM_URL, "the test must never permit another network target");
    assert.equal(init.method, "POST");
    assert.equal((init.headers as Record<string, string>)["API-KEY"], "unit-test-key");

    return responseFactory();
  };
  return () => calls;
}

function createStreamingResponse(events: string[]): Response {
  return new Response(
    new ReadableStream<Uint8Array>({
      start(controller) {
        for (const event of events) controller.enqueue(encoder.encode(event));
        controller.close();
      },
    }),
    { status: 200, headers: { "Content-Type": "text/event-stream" } }
  );
}

function installStreamingFetch(events: string[]): () => number {
  return installFetchFactory(() => createStreamingResponse(events));
}

async function executeStreaming(events: string[]): Promise<Response> {
  const getCalls = installStreamingFetch(events);
  const result = await new OneMinAiExecutor().execute({
    model: "gpt-4o-mini",
    body: { messages: [{ role: "user", content: "hello" }] },
    stream: true,
    credentials: { apiKey: "unit-test-key" },
    signal: AbortSignal.timeout(10_000),
    log: null,
  });
  assert.equal(getCalls(), 1);
  return result.response;
}

function noopLog() {
  return { debug() {}, info() {}, warn() {}, error() {} };
}

async function invokeStreamingChatCore(
  identity: PersistenceIdentity,
  onStreamFailure?: (failure: {
    status: number;
    message: string;
    code?: string;
    type?: string;
  }) => void,
  onRequestSuccess?: () => Promise<void> | void
) {
  await settingsDb.updateSettings({ call_log_pipeline_enabled: true });
  readCache.invalidateDbCache("settings");
  const body = {
    model: identity.model,
    stream: true,
    messages: [{ role: "user", content: "hello" }],
  };

  return handleChatCore({
    body: structuredClone(body),
    modelInfo: { provider: "oneminai", model: identity.model, extendedContext: false },
    credentials: {
      apiKey: "unit-test-key",
      connectionId: identity.connectionId,
      providerSpecificData: {},
    },
    connectionId: identity.connectionId,
    log: noopLog(),
    clientRawRequest: {
      endpoint: "/v1/chat/completions",
      body: structuredClone(body),
      headers: new Headers({
        accept: "text/event-stream",
        "x-omniroute-session-id": identity.connectionId,
      }),
    },
    userAgent: identity.connectionId,
    onRequestSuccess,
    onStreamFailure,
  } as never);
}

async function waitFor<T>(read: () => Promise<T | null>, timeoutMs = 5_000): Promise<T | null> {
  const deadline = Date.now() + timeoutMs;
  while (Date.now() < deadline) {
    const value = await read();
    if (value) return value;
    await new Promise((resolve) => setTimeout(resolve, 25));
  }
  return null;
}

async function getOneMinCallLog(identity: PersistenceIdentity) {
  assert.equal(
    await callLogs.waitForCallLogSaves(5_000),
    true,
    "call-log persistence must drain before inspection"
  );
  const rows = await callLogs.getCallLogs({
    provider: "oneminai",
    model: identity.model,
    limit: 20,
  });
  const row = Array.isArray(rows)
    ? rows.find(
        (candidate) =>
          candidate.connectionId === identity.connectionId &&
          (candidate.model === identity.model || candidate.requestedModel === identity.model)
      )
    : null;
  return row ? callLogs.getCallLogById(row.id) : null;
}

async function getOneMinUsage(identity: PersistenceIdentity) {
  const rows = await usageHistory.getUsageHistory({
    provider: "oneminai",
    model: identity.model,
  });
  return rows.find((row) => row.connectionId === identity.connectionId) ?? null;
}

async function assertUnusedPersistenceIdentity(identity: PersistenceIdentity) {
  assert.equal(
    await getOneMinCallLog(identity),
    null,
    `call-log identity must be unused before scenario: ${identity.connectionId}`
  );
  assert.equal(
    await getOneMinUsage(identity),
    null,
    `usage identity must be unused before scenario: ${identity.connectionId}`
  );
}

async function readUntil(
  reader: ReadableStreamDefaultReader<Uint8Array>,
  marker: string
): Promise<string> {
  const decoder = new TextDecoder();
  let text = "";
  while (!text.includes(marker)) {
    const { done, value } = await reader.read();
    assert.equal(done, false, `stream ended before ${marker}`);
    if (value) text += decoder.decode(value, { stream: true });
  }
  return text;
}

async function readRemaining(reader: ReadableStreamDefaultReader<Uint8Array>): Promise<string> {
  const decoder = new TextDecoder();
  let text = "";
  for (;;) {
    const { done, value } = await reader.read();
    if (done) return text + decoder.decode();
    if (value) text += decoder.decode(value, { stream: true });
  }
}

test.afterEach(async () => {
  const drained = await callLogs.waitForCallLogSaves(5_000);
  globalThis.fetch = originalFetch;
  usageHistory.clearPendingRequests();
  accountSemaphore.resetAll();
  assert.equal(drained, true, "all call-log saves must drain before the next test");
});

test.after(async () => {
  const drained = await callLogs.waitForCallLogSaves(5_000);
  try {
    await callLogs.closeCallLogSaves(5_000);
  } finally {
    globalThis.fetch = originalFetch;
    usageHistory.clearPendingRequests();
    accountSemaphore.resetAll();
    dbCore.resetDbInstance();
  }
  assert.equal(drained, true, "all call-log saves must drain before teardown");
});

test("1min.ai pre-content stream errors stay errors and permit readiness fallback", async () => {
  const rawMessage =
    "quota lookup failed at /srv/omniroute/open-sse/executors/oneminai.ts:170\n" +
    "    at translateSseStream (/srv/omniroute/open-sse/executors/oneminai.ts:99:5)";
  const response = await executeStreaming([
    `event: error\ndata: ${JSON.stringify({ error: { message: rawMessage } })}\n\n`,
  ]);
  const clientCopy = response.clone();

  const readiness = await ensureStreamReadiness(response, {
    timeoutMs: 2_000,
    provider: "oneminai",
    model: "gpt-4o-mini",
  });
  assert.equal(readiness.ok, false);
  if (readiness.ok) assert.fail("an error-only stream must not become ready");
  assert.equal(readiness.response.status, 502);
  const fallbackBody = await readiness.response.text();
  assert.match(fallbackBody, /STREAM_EARLY_EOF/);
  assert.doesNotMatch(fallbackBody, /\/srv\/omniroute/);
  assert.doesNotMatch(fallbackBody, /translateSseStream/);

  const clientText = await clientCopy.text();
  assert.match(clientText, /^data: \{"error":/);
  assert.match(clientText, /quota lookup failed at <path>/);
  assert.match(clientText, /data: \[DONE\]/);
  assert.doesNotMatch(clientText, /"role":"assistant"/);
  assert.doesNotMatch(clientText, /"finish_reason":"stop"/);
  assert.doesNotMatch(clientText, /\/srv\/omniroute/);
  assert.doesNotMatch(clientText, /translateSseStream/);
});

test("chatCore turns a pre-content 1min.ai stream error into persisted HTTP 502", async () => {
  await assertUnusedPersistenceIdentity(PRE_CONTENT_IDENTITY);
  installStreamingFetch([
    `event: error\ndata: ${JSON.stringify({
      error: {
        message:
          "quota lookup failed at /srv/omniroute/open-sse/executors/oneminai.ts:230 api_key=pre-content-secret\nstack tail",
      },
    })}\n\n`,
  ]);

  const result = await invokeStreamingChatCore(PRE_CONTENT_IDENTITY);
  assert.equal(result.success, false);
  if (result.success) assert.fail("a pre-content error must not commit HTTP 200");
  assert.equal(result.status, 502);
  assert.equal(result.response.status, 502);
  const clientBody = await result.response.text();
  assert.match(clientBody, /STREAM_EARLY_EOF/);
  assert.doesNotMatch(clientBody, /pre-content-secret/);
  assert.doesNotMatch(clientBody, /\/srv\/omniroute/);
  assert.doesNotMatch(clientBody, /stack tail/);

  const detail = await waitFor(() => getOneMinCallLog(PRE_CONTENT_IDENTITY));
  assert.ok(detail, "the failed pre-content attempt must be persisted");
  assert.equal(detail.status, 502);
  const persisted = JSON.stringify(detail);
  assert.doesNotMatch(persisted, /pre-content-secret/);
  assert.doesNotMatch(persisted, /\/srv\/omniroute/);
  assert.doesNotMatch(persisted, /stack tail/);

  const usage = await waitFor(() => getOneMinUsage(PRE_CONTENT_IDENTITY));
  assert.ok(usage, "the failed pre-content usage record must be persisted");
  assert.equal(usage.success, false);
  assert.equal(usage.status, "502");
  assert.equal(usage.errorCode, "STREAM_EARLY_EOF");
});

test("chatCore preserves batched 1min.ai content before its terminal stream error", async () => {
  await assertUnusedPersistenceIdentity(BATCHED_IDENTITY);
  installStreamingFetch([
    'event: content\ndata: {"content":"batched partial one"}\n\n' +
      'event: content\ndata: {"content":"batched partial two"}\n\n' +
      `event: error\ndata: ${JSON.stringify({
        message:
          "provider failed at /srv/omniroute/open-sse/executors/oneminai.ts:230 api_key=batched-secret",
      })}\n\n`,
  ]);
  const failures: Array<{
    status: number;
    message: string;
    code?: string;
    type?: string;
  }> = [];
  const requestSuccessPhases: string[] = [];

  const result = await invokeStreamingChatCore(
    BATCHED_IDENTITY,
    (failure) => failures.push(failure),
    async () => {
      requestSuccessPhases.push("started");
      await new Promise((resolve) => setTimeout(resolve, 30));
      requestSuccessPhases.push("finished");
    }
  );
  assert.equal(result.success, true, "batched real content must cross the readiness boundary");
  assert.deepEqual(requestSuccessPhases, ["started", "finished"]);
  assert.ok(result.response.body);
  const clientText = await result.response.text();
  const firstContentIndex = clientText.indexOf("batched partial one");
  const secondContentIndex = clientText.indexOf("batched partial two");
  const errorIndex = clientText.indexOf('"error":');
  const doneIndex = clientText.indexOf("data: [DONE]");

  assert.ok(firstContentIndex >= 0, "the first queued content delta must not be discarded");
  assert.ok(secondContentIndex >= 0, "the second queued content delta must not be discarded");
  assert.ok(firstContentIndex < secondContentIndex, "batched content must retain upstream order");
  assert.ok(secondContentIndex < errorIndex, "all batched content must precede its terminal error");
  assert.ok(
    errorIndex < doneIndex,
    `the terminal error must precede [DONE]: ${JSON.stringify(clientText)}`
  );
  assert.match(clientText, /"finish_reason":"error"/);
  assert.doesNotMatch(clientText, /"finish_reason":"stop"/);
  assert.doesNotMatch(clientText, /response\.failed/);
  assert.doesNotMatch(clientText, /batched-secret/);
  assert.doesNotMatch(clientText, /\/srv\/omniroute/);
  assert.deepEqual(failures, [
    {
      status: 502,
      message: "1min.ai upstream stream failed",
      code: "stream_pipeline_error",
      type: "stream_error",
    },
  ]);

  const pending = usageHistory.getPendingRequests();
  assert.deepEqual(Object.keys(pending.byModel), []);
  assert.deepEqual(Object.keys(pending.byAccount), []);

  const completed = [...usageHistory.getCompletedDetails().values()];
  assert.equal(completed.length, 1);
  assert.equal(completed[0].status, 502);
  assert.equal(completed[0].error, "1min.ai upstream stream failed");
  assert.equal(completed[0].errorCode, "stream_pipeline_error");

  const detail = await waitFor(() => getOneMinCallLog(BATCHED_IDENTITY));
  assert.ok(detail, "the batched terminal stream failure must be persisted");
  assert.equal(detail.status, 502);
  assert.equal(detail.error, "1min.ai upstream stream failed");
  const persisted = JSON.stringify(detail);
  assert.doesNotMatch(persisted, /batched-secret/);
  assert.doesNotMatch(persisted, /\/srv\/omniroute/);

  const usage = await waitFor(() => getOneMinUsage(BATCHED_IDENTITY));
  assert.ok(usage, "the batched terminal failure usage record must be persisted");
  assert.equal(usage.success, false);
  assert.equal(usage.status, "502");
  assert.equal(usage.errorCode, "stream_pipeline_error");
});

test("chatCore preserves partial 1min.ai content then finalizes and persists a stream failure", async () => {
  await assertUnusedPersistenceIdentity(PARTIAL_IDENTITY);
  let upstreamController: ReadableStreamDefaultController<Uint8Array> | null = null;
  let cancelCalls = 0;
  const getCalls = installFetchFactory(
    () =>
      new Response(
        new ReadableStream<Uint8Array>({
          start(controller) {
            upstreamController = controller;
            controller.enqueue(
              encoder.encode('event: content\ndata: {"content":"partial answer"}\n\n')
            );
          },
          cancel() {
            cancelCalls += 1;
          },
        }),
        { status: 200, headers: { "Content-Type": "text/event-stream" } }
      )
  );
  const failures: Array<{
    status: number;
    message: string;
    code?: string;
    type?: string;
  }> = [];

  const result = await invokeStreamingChatCore(PARTIAL_IDENTITY, (failure) =>
    failures.push(failure)
  );
  assert.equal(getCalls(), 1);
  assert.equal(result.success, true, "real content must cross the readiness boundary");
  assert.ok(result.response.body);
  const reader = result.response.body.getReader();
  let clientText = await readUntil(reader, "partial answer");

  assert.ok(upstreamController);
  upstreamController.enqueue(
    encoder.encode(
      `event: error\ndata: ${JSON.stringify({
        message:
          "provider failed at /srv/omniroute/open-sse/executors/oneminai.ts:230 api_key=post-content-secret\nstack tail",
      })}\n\n`
    )
  );
  clientText += await readRemaining(reader);

  const roleIndex = clientText.indexOf('"role":"assistant"');
  const contentIndex = clientText.indexOf("partial answer");
  const errorIndex = clientText.indexOf('"error":');
  const doneIndex = clientText.indexOf("data: [DONE]");

  assert.ok(roleIndex >= 0 && roleIndex < contentIndex, "the role must precede real content");
  assert.ok(contentIndex < errorIndex, "partial content must remain before the terminal error");
  assert.ok(errorIndex < doneIndex, "the pipeline error must precede [DONE]");
  assert.equal(clientText.match(/"role":"assistant"/g)?.length, 1);
  assert.match(clientText, /"finish_reason":"error"/);
  assert.match(clientText, /1min\.ai upstream stream failed/);
  assert.doesNotMatch(clientText, /"finish_reason":"stop"/);
  assert.doesNotMatch(clientText, /response\.failed/);
  assert.doesNotMatch(clientText, /post-content-secret/);
  assert.doesNotMatch(clientText, /\/srv\/omniroute/);
  assert.doesNotMatch(clientText, /stack tail/);

  assert.equal(cancelCalls, 1, "the upstream source must be cancelled after its terminal error");
  assert.equal(failures.length, 1);
  assert.deepEqual(failures[0], {
    status: 502,
    message: "1min.ai upstream stream failed",
    code: "stream_pipeline_error",
    type: "stream_error",
  });
  const pending = usageHistory.getPendingRequests();
  assert.deepEqual(Object.keys(pending.byModel), []);
  assert.deepEqual(Object.keys(pending.byAccount), []);

  const completed = [...usageHistory.getCompletedDetails().values()];
  assert.equal(completed.length, 1);
  assert.equal(completed[0].status, 502);
  assert.equal(completed[0].error, "1min.ai upstream stream failed");
  assert.equal(completed[0].errorCode, "stream_pipeline_error");

  const detail = await waitFor(() => getOneMinCallLog(PARTIAL_IDENTITY));
  assert.ok(detail, "the post-content stream failure must be persisted");
  assert.equal(detail.status, 502);
  assert.equal(detail.error, "1min.ai upstream stream failed");
  const persisted = JSON.stringify(detail);
  assert.match(persisted, /1min\.ai upstream stream failed/);
  assert.doesNotMatch(persisted, /post-content-secret/);
  assert.doesNotMatch(persisted, /\/srv\/omniroute/);
  assert.doesNotMatch(persisted, /stack tail/);

  const usage = await waitFor(() => getOneMinUsage(PARTIAL_IDENTITY));
  assert.ok(usage, "the post-content failure usage record must be persisted");
  assert.equal(usage.success, false);
  assert.equal(usage.status, "502");
  assert.equal(usage.errorCode, "stream_pipeline_error");
});

test("1min.ai error completion does not wait for an upstream cancel promise", async () => {
  let cancelCalls = 0;
  const getCalls = installFetchFactory(
    () =>
      new Response(
        new ReadableStream<Uint8Array>({
          start(controller) {
            controller.enqueue(
              encoder.encode('event: error\ndata: {"message":"capacity unavailable"}\n\n')
            );
          },
          cancel() {
            cancelCalls += 1;
            return new Promise<void>(() => {});
          },
        }),
        { status: 200, headers: { "Content-Type": "text/event-stream" } }
      )
  );

  const result = await new OneMinAiExecutor().execute({
    model: "gpt-4o-mini",
    body: { messages: [{ role: "user", content: "hello" }] },
    stream: true,
    credentials: { apiKey: "unit-test-key" },
    signal: AbortSignal.timeout(10_000),
    log: null,
  });
  const clientText = await Promise.race([
    result.response.text(),
    new Promise<never>((_resolve, reject) =>
      setTimeout(() => reject(new Error("translated stream stayed pending on cancel")), 500)
    ),
  ]);

  assert.equal(getCalls(), 1);
  assert.equal(cancelCalls, 1);
  assert.match(clientText, /capacity unavailable/);
  assert.match(clientText, /data: \[DONE\]/);
});

test("1min.ai propagates downstream cancellation without awaiting upstream cleanup", async () => {
  let upstreamController: ReadableStreamDefaultController<Uint8Array> | null = null;
  let cancelCalls = 0;
  let markPullStarted: (() => void) | null = null;
  const pullStarted = new Promise<void>((resolve) => {
    markPullStarted = resolve;
  });
  const getCalls = installFetchFactory(
    () =>
      new Response(
        new ReadableStream<Uint8Array>({
          start(controller) {
            upstreamController = controller;
            controller.enqueue(
              encoder.encode('event: content\ndata: {"content":"partial answer"}\n\n')
            );
          },
          pull() {
            markPullStarted?.();
            return new Promise<void>(() => {});
          },
          cancel() {
            cancelCalls += 1;
            return new Promise<void>(() => {});
          },
        }),
        { status: 200, headers: { "Content-Type": "text/event-stream" } }
      )
  );

  const result = await new OneMinAiExecutor().execute({
    model: "gpt-4o-mini",
    body: { messages: [{ role: "user", content: "hello" }] },
    stream: true,
    credentials: { apiKey: "unit-test-key" },
    signal: AbortSignal.timeout(10_000),
    log: null,
  });
  assert.ok(result.response.body);
  const reader = result.response.body.getReader();

  try {
    const clientText = await readUntil(reader, "partial answer");
    assert.match(clientText, /"role":"assistant"/);
    await pullStarted;
    await Promise.race([
      reader.cancel("client disconnected"),
      new Promise<never>((_resolve, reject) =>
        setTimeout(() => reject(new Error("downstream cancellation stayed pending")), 500)
      ),
    ]);

    assert.equal(getCalls(), 1);
    assert.equal(cancelCalls, 1, "downstream cancellation must reach the upstream reader once");
    assert.deepEqual(await reader.read(), { value: undefined, done: true });
  } finally {
    try {
      upstreamController?.close();
    } catch {
      // The fixed path has already cancelled and closed the upstream stream.
    }
  }
});

test("1min.ai accepts the bounded error-string shape without exposing a success chunk", async () => {
  const response = await executeStreaming([
    'event: error\ndata: {"error":"billing temporarily unavailable"}\n\n',
  ]);
  const clientText = await response.text();

  assert.match(clientText, /"error":\{"message":"billing temporarily unavailable"/);
  assert.doesNotMatch(clientText, /"role":"assistant"/);
  assert.doesNotMatch(clientText, /"finish_reason":"stop"/);
});

test("1min.ai replaces oversized stream-error payloads with a fixed public fallback", async () => {
  const oversizedMessage = `private-prefix-${"x".repeat(70 * 1024)}`;
  const response = await executeStreaming([
    `event: error\ndata: ${JSON.stringify({ message: oversizedMessage })}\n\n`,
  ]);
  const clientText = await response.text();

  assert.match(clientText, /1min\.ai upstream stream failed/);
  assert.ok(clientText.length < 1_024, "the oversized upstream payload must not be reflected");
  assert.doesNotMatch(clientText, /private-prefix/);
  assert.doesNotMatch(clientText, /"role":"assistant"/);
  assert.doesNotMatch(clientText, /"finish_reason":"stop"/);
});
