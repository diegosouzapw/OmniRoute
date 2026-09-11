import assert from "node:assert/strict";
import { isAbsolute, relative } from "node:path";
import { after, test } from "node:test";

function requiredEnv(name: string): string {
  const value = process.env[name];
  assert.ok(value, `${name} must be supplied by the isolated parent wrapper`);
  return value;
}

const testRoot = requiredEnv("OMNIROUTE_HUGGINGCHAT_TEST_ROOT");
const fixtureRunId = requiredEnv("OMNIROUTE_HUGGINGCHAT_TEST_RUN_ID");
const testDataDir = requiredEnv("DATA_DIR");
const testPluginsDir = requiredEnv("OMNIROUTE_PLUGINS_DIR");
const xdgConfigDir = requiredEnv("XDG_CONFIG_HOME");

for (const [name, candidate] of [
  ["DATA_DIR", testDataDir],
  ["OMNIROUTE_PLUGINS_DIR", testPluginsDir],
  ["XDG_CONFIG_HOME", xdgConfigDir],
] as const) {
  const fromRoot = relative(testRoot, candidate);
  assert.equal(
    isAbsolute(fromRoot) || fromRoot.startsWith(".."),
    false,
    `${name} escaped test root`
  );
}
assert.equal(
  process.env.NODE_TEST_CONTEXT,
  undefined,
  "nested node:test state must not be inherited"
);
assert.equal(process.env.HOME, undefined, "the child must not inherit the operator HOME");
assert.equal(process.env.CODEX_HOME, undefined, "the child must not inherit CODEX_HOME");
assert.match(requiredEnv("API_KEY_SECRET"), /^[0-9a-f]{64}$/);

const [
  { HuggingChatExecutor },
  { HuggingChatStreamError, streamJsonlToOpenAi },
  { createPassthroughStreamWithLogger },
  { createStreamController, pipeWithDisconnect },
  { createStreamFailureFinalizers, finalizeStreamRequestLog },
  { ensureStreamReadiness },
  { FORMATS },
  usageHistory,
  coreDb,
  callLogs,
  callLogArtifactWriter,
  loggerResource,
] = await Promise.all([
  import("../../../open-sse/executors/huggingchat.ts"),
  import("../../../open-sse/executors/huggingchat/jsonlStream.ts"),
  import("../../../open-sse/utils/stream.ts"),
  import("../../../open-sse/utils/streamHandler.ts"),
  import("../../../open-sse/utils/streamFailureFinalization.ts"),
  import("../../../open-sse/utils/streamReadiness.ts"),
  import("../../../open-sse/translator/formats.ts"),
  import("../../../src/lib/usage/usageHistory.ts"),
  import("../../../src/lib/db/core.ts"),
  import("../../../src/lib/usage/callLogs.ts"),
  import("../../../src/lib/usage/callLogArtifactWriter.ts"),
  import("../../../src/shared/utils/loggerResource.ts"),
]);

after(async () => {
  assert.equal(
    await callLogs.waitForCallLogSaves(10_000),
    true,
    "all asynchronous call-log writes must drain before DB teardown"
  );
  await callLogArtifactWriter.closeCallLogArtifactWriter();
  usageHistory.clearPendingRequests();
  await loggerResource.closeSharedLoggerResource();
  coreDb.resetDbInstance();
});

function jsonlBody(lines: string[], trailingNewline = true): ReadableStream<Uint8Array> {
  const encoded = new TextEncoder().encode(`${lines.join("\n")}${trailingNewline ? "\n" : ""}`);
  return new ReadableStream<Uint8Array>({
    start(controller) {
      controller.enqueue(encoded);
      controller.close();
    },
  });
}

async function collectStream(body: ReadableStream<Uint8Array>): Promise<string> {
  const chunks: string[] = [];
  for await (const chunk of streamJsonlToOpenAi(
    body,
    "test/huggingchat-model",
    "chatcmpl-huggingchat-test",
    1_725_000_000
  )) {
    chunks.push(chunk);
  }
  return chunks.join("");
}

test("HuggingChat turns a pre-content JSONL generation error into a sanitized 502", async () => {
  const rawError =
    "generation failed at /srv/omniroute/providers/huggingchat.ts:44:9 api_key=super-secret\n" +
    "    at provider (/srv/omniroute/runtime.ts:1:1)";
  const realFetch = globalThis.fetch;
  let callCount = 0;
  const errorLogs: string[] = [];

  globalThis.fetch = (async () => {
    callCount += 1;
    if (callCount === 1) {
      return Response.json({ conversationId: "conversation-test" });
    }
    if (callCount === 2) {
      return Response.json({ rootMessageId: "root-message-test" });
    }
    if (callCount === 3) {
      return new Response(
        jsonlBody(
          [
            JSON.stringify({ type: "status", status: "started" }),
            JSON.stringify({ type: "status", status: "error", message: rawError }),
          ],
          false
        ),
        { status: 200, headers: { "Content-Type": "application/jsonl" } }
      );
    }
    throw new Error(`Unexpected fetch call ${callCount}`);
  }) as typeof globalThis.fetch;

  try {
    const result = await new HuggingChatExecutor().execute({
      model: "test/huggingchat-model",
      body: { messages: [{ role: "user", content: "hello" }] },
      stream: true,
      credentials: { apiKey: "hf-chat=fake-cookie" },
      signal: null,
      log: { error: (_tag, message) => errorLogs.push(message) },
    });

    assert.equal(callCount, 3, "the test must intercept every HuggingChat request");
    assert.equal(result.response.status, 502);
    assert.match(result.response.headers.get("content-type") || "", /application\/json/);

    const payload = (await result.response.json()) as {
      error: { message: string; type?: string; code?: string };
    };
    assert.equal(payload.error.type, "upstream_error");
    assert.equal(payload.error.code, "huggingchat_generation_error");
    assert.match(payload.error.message, /generation failed/);
    assert.doesNotMatch(payload.error.message, /\/srv\/omniroute/);
    assert.doesNotMatch(payload.error.message, /super-secret/);
    assert.doesNotMatch(payload.error.message, /\n\s*at /);
    assert.equal(errorLogs.length, 1);
    assert.doesNotMatch(errorLogs[0], /\/srv\/omniroute/);
    assert.doesNotMatch(errorLogs[0], /super-secret/);
    assert.doesNotMatch(errorLogs[0], /\n\s*at /);
  } finally {
    globalThis.fetch = realFetch;
  }
});

test("HuggingChat turns a terminal non-stream JSONL error into a sanitized 502", async () => {
  const rawError =
    "generation failed at /srv/omniroute/providers/huggingchat.ts:55:2 cookie=super-secret\n" +
    "    at provider (/srv/omniroute/runtime.ts:1:1)";
  const realFetch = globalThis.fetch;
  let callCount = 0;

  globalThis.fetch = (async () => {
    callCount += 1;
    if (callCount === 1) return Response.json({ conversationId: "conversation-test" });
    if (callCount === 2) return Response.json({ rootMessageId: "root-message-test" });
    if (callCount === 3) {
      return new Response(
        jsonlBody([JSON.stringify({ type: "status", status: "error", message: rawError })], false),
        { status: 200, headers: { "Content-Type": "application/jsonl" } }
      );
    }
    throw new Error(`Unexpected fetch call ${callCount}`);
  }) as typeof globalThis.fetch;

  try {
    const result = await new HuggingChatExecutor().execute({
      model: "test/huggingchat-model",
      body: { messages: [{ role: "user", content: "hello" }] },
      stream: false,
      credentials: { apiKey: "hf-chat=fake-cookie" },
      signal: null,
    });

    assert.equal(callCount, 3, "the test must intercept every HuggingChat request");
    assert.equal(result.response.status, 502);
    const payload = (await result.response.json()) as {
      error: { message: string; type?: string; code?: string };
    };
    assert.equal(payload.error.type, "upstream_error");
    assert.equal(payload.error.code, "huggingchat_generation_error");
    assert.doesNotMatch(payload.error.message, /\/srv\/omniroute/);
    assert.doesNotMatch(payload.error.message, /super-secret/);
    assert.doesNotMatch(payload.error.message, /\n\s*at /);
  } finally {
    globalThis.fetch = realFetch;
  }
});

test("HuggingChat rejects its JSONL generator after partial content instead of faking success", async () => {
  const rawError =
    "generation failed at /srv/omniroute/providers/huggingchat.ts:44:9 access_token=super-secret\n" +
    "    at provider (/srv/omniroute/runtime.ts:1:1)";
  const stream = streamJsonlToOpenAi(
    jsonlBody([
      JSON.stringify({ type: "stream", token: "partial answer" }),
      JSON.stringify({ type: "status", status: "error", message: rawError }),
    ]),
    "test/huggingchat-model",
    "chatcmpl-huggingchat-test",
    1_725_000_000
  );

  const roleChunk = await stream.next();
  const contentChunk = await stream.next();

  assert.equal(roleChunk.done, false);
  assert.match(roleChunk.value || "", /"role":"assistant"/);
  assert.equal(contentChunk.done, false);
  assert.match(contentChunk.value || "", /partial answer/);
  await assert.rejects(() => stream.next(), HuggingChatStreamError);
});

test("HuggingChat partial failures reach stream finalization, persistence, and fallback", async () => {
  const model = `test/huggingchat-model-${fixtureRunId}`;
  const provider = "huggingchat";
  const connectionId = `huggingchat-stream-error-boundary-${fixtureRunId}`;
  const publicErrorMessage = "HuggingChat generation failed";
  const rawError =
    "generation failed at /srv/omniroute/providers/huggingchat.ts:44:9 access_token=super-secret\n" +
    "    at provider (/srv/omniroute/runtime.ts:1:1)";
  const realFetch = globalThis.fetch;
  let callCount = 0;
  const errorLogs: string[] = [];

  globalThis.fetch = (async () => {
    callCount += 1;
    if (callCount === 1) return Response.json({ conversationId: "conversation-test" });
    if (callCount === 2) return Response.json({ rootMessageId: "root-message-test" });
    if (callCount === 3) {
      return new Response(
        jsonlBody([
          JSON.stringify({ type: "stream", token: "partial answer" }),
          JSON.stringify({ type: "status", status: "error", message: rawError }),
        ]),
        { status: 200, headers: { "Content-Type": "application/jsonl" } }
      );
    }
    throw new Error(`Unexpected fetch call ${callCount}`);
  }) as typeof globalThis.fetch;

  usageHistory.clearPendingRequests();
  assert.equal(usageHistory.getPendingById().size, 0, "the child must start without pending state");
  assert.equal(
    usageHistory.getCompletedDetails().size,
    0,
    "the child must start without completed state"
  );
  const previousPersistence = coreDb
    .getDbInstance()
    .prepare("SELECT COUNT(*) AS count FROM call_logs WHERE connection_id = ? AND model = ?")
    .get(connectionId, model) as { count: number };
  assert.equal(previousPersistence.count, 0, "the child must not reuse a prior persisted identity");
  const requestId = usageHistory.trackPendingRequest(model, provider, connectionId, true);
  assert.ok(requestId, "the full-pipeline test must own a real pending request");

  type CompletionPayload = {
    status: number;
    usage: unknown;
    providerPayload?: unknown;
    clientPayload?: unknown;
    error?: string | null;
    errorCode?: string | null;
  };
  type FailurePayload = {
    status: number;
    message: string;
    code?: string;
    type?: string;
  };

  let completionPayload: CompletionPayload | null = null;
  let streamCompletionRecorded = false;
  let streamFailureCompletionRecorded = false;
  const persistedFailures: Array<{ status: number; errorCode?: string }> = [];
  const fallbackFailures: FailurePayload[] = [];

  const onStreamComplete = (payload: CompletionPayload) => {
    const normalizedStatus = payload.status || 200;
    if (streamCompletionRecorded) return;
    streamCompletionRecorded = true;
    if (normalizedStatus !== 200) {
      if (streamFailureCompletionRecorded) return;
      streamFailureCompletionRecorded = true;
    }
    completionPayload = payload;
    finalizeStreamRequestLog({
      pendingRequestId: requestId,
      model,
      provider,
      connectionId,
      providerResponse: payload.providerPayload,
      clientResponse: payload.clientPayload,
      status: normalizedStatus,
      error: payload.error,
      errorCode: payload.errorCode,
    });
  };

  const { handleStreamFailure, onPipelineStreamError } = createStreamFailureFinalizers({
    isFailureCompletionRecorded: () => streamFailureCompletionRecorded,
    isStreamCompletionRecorded: () => streamCompletionRecorded,
    onStreamComplete,
    persistFailureUsage: (status, errorCode) => {
      persistedFailures.push({ status, errorCode });
    },
    onStreamFailure: (failure) => {
      fallbackFailures.push(failure);
    },
  });

  try {
    const result = await new HuggingChatExecutor().execute({
      model,
      body: { messages: [{ role: "user", content: "hello" }] },
      stream: true,
      credentials: { apiKey: "hf-chat=fake-cookie" },
      signal: null,
      log: { error: (_tag, message) => errorLogs.push(message) },
    });

    assert.equal(callCount, 3, "the test must intercept every HuggingChat request");
    assert.equal(result.response.status, 200, "partial output has already committed HTTP 200");
    const readiness = await ensureStreamReadiness(result.response, {
      timeoutMs: 1_000,
      provider,
      model,
    });
    if (!readiness.ok) assert.fail(`unexpected readiness failure: ${readiness.reason}`);

    const transform = createPassthroughStreamWithLogger(
      provider,
      null,
      null,
      model,
      connectionId,
      { messages: [{ role: "user", content: "hello" }] },
      onStreamComplete,
      null,
      handleStreamFailure,
      FORMATS.OPENAI
    );
    const streamController = createStreamController({
      onError: onPipelineStreamError,
      provider,
      model,
      connectionId,
      clientResponseFormat: FORMATS.OPENAI,
    });
    const clientStream = pipeWithDisconnect(readiness.response, transform, streamController, {
      stallTimeoutMs: 0,
    });
    const wire = await new Response(clientStream).text();

    assert.match(wire, /partial answer/);
    assert.match(wire, /"finish_reason":"error"/);
    assert.match(wire, new RegExp(publicErrorMessage));
    assert.match(wire, /data: \[DONE\]/);
    assert.doesNotMatch(wire, /"finish_reason":"stop"/);
    assert.doesNotMatch(wire, /\/srv\/omniroute/);
    assert.doesNotMatch(wire, /super-secret/);
    assert.equal(errorLogs.length, 1);
    assert.doesNotMatch(errorLogs[0], /\/srv\/omniroute/);
    assert.doesNotMatch(errorLogs[0], /super-secret/);
    assert.doesNotMatch(errorLogs[0], /\n\s*at /);

    assert.ok(completionPayload, "the pipeline must record a terminal failure");
    assert.equal(completionPayload.status, 502);
    assert.equal(completionPayload.error, publicErrorMessage);
    assert.equal(completionPayload.errorCode, "stream_pipeline_error");
    assert.deepEqual(persistedFailures, [{ status: 502, errorCode: "stream_pipeline_error" }]);
    assert.deepEqual(fallbackFailures, [
      {
        status: 502,
        message: publicErrorMessage,
        code: "stream_pipeline_error",
        type: "stream_error",
      },
    ]);

    assert.equal(usageHistory.getPendingById().has(requestId), false);
    const completedDetail = usageHistory.getCompletedDetails().get(requestId);
    assert.ok(completedDetail, "failure finalization must persist the completed request detail");
    assert.equal(completedDetail.status, 502);
    assert.equal(completedDetail.error, publicErrorMessage);
    assert.equal(completedDetail.errorCode, "stream_pipeline_error");
    assert.doesNotMatch(JSON.stringify(completedDetail), /\/srv\/omniroute|super-secret/);
    assert.deepEqual(
      [...usageHistory.getCompletedDetails().keys()],
      [requestId],
      "only this child run may own completed usage state"
    );
  } finally {
    globalThis.fetch = realFetch;
    usageHistory.clearPendingRequests();
  }
});

test("HuggingChat reports an authoritative error without waiting for transport cancellation", async () => {
  let cancelCalled = false;
  const encoded = new TextEncoder().encode(
    `${JSON.stringify({ type: "status", status: "error", message: "provider failed" })}\n`
  );
  const body = new ReadableStream<Uint8Array>({
    start(controller) {
      controller.enqueue(encoded);
    },
    cancel() {
      cancelCalled = true;
      return new Promise<void>(() => undefined);
    },
  });
  const stream = streamJsonlToOpenAi(
    body,
    "test/huggingchat-model",
    "chatcmpl-huggingchat-test",
    1_725_000_000
  );

  const outcome = await Promise.race([
    stream.next().then(
      () => ({ kind: "resolved" as const }),
      (error: unknown) => ({ kind: "rejected" as const, error })
    ),
    new Promise<{ kind: "hung" }>((resolve) => {
      setImmediate(() => resolve({ kind: "hung" }));
    }),
  ]);

  assert.equal(cancelCalled, true);
  assert.equal(outcome.kind, "rejected", "transport cleanup must not delay error delivery");
  assert.ok(
    outcome.kind === "rejected" && outcome.error instanceof HuggingChatStreamError,
    "the authoritative HuggingChat error must remain classifiable"
  );
});

test("HuggingChat cancellation suppresses final chunks after a pending JSONL read", async () => {
  let upstreamCancelCalled = false;
  let upstreamPullCount = 0;
  const cancellationController = new AbortController();
  const token = new TextEncoder().encode(
    `${JSON.stringify({ type: "stream", token: "partial answer" })}\n`
  );
  const body = new ReadableStream<Uint8Array>({
    pull(controller) {
      upstreamPullCount += 1;
      if (upstreamPullCount === 1) {
        controller.enqueue(token);
        return;
      }
      return new Promise<void>(() => undefined);
    },
    cancel() {
      upstreamCancelCalled = true;
      return new Promise<void>(() => undefined);
    },
  });
  const stream = streamJsonlToOpenAi(
    body,
    "test/huggingchat-model",
    "chatcmpl-huggingchat-test",
    1_725_000_000,
    null,
    cancellationController.signal
  );

  assert.match((await stream.next()).value || "", /"role":"assistant"/);
  assert.match((await stream.next()).value || "", /partial answer/);
  const pendingNext = stream.next();
  await new Promise<void>((resolve) => setImmediate(resolve));
  cancellationController.abort();

  const outcome = await Promise.race([
    pendingNext.then((result) => ({ kind: "settled" as const, result })),
    new Promise<{ kind: "hung" }>((resolve) => setImmediate(() => resolve({ kind: "hung" }))),
  ]);

  assert.equal(upstreamCancelCalled, true);
  assert.equal(outcome.kind, "settled", "cancellation must settle the pending generator read");
  assert.equal(
    outcome.kind === "settled" ? outcome.result.done : false,
    true,
    "a cancelled generator must not emit stop or [DONE]"
  );
  void stream.return(undefined).catch(() => undefined);
});

test("HuggingChat client cancellation reaches a blocked upstream reader without waiting", async () => {
  const realFetch = globalThis.fetch;
  let callCount = 0;
  let upstreamCancelCalled = false;
  let upstreamPullCount = 0;
  const errorLogs: string[] = [];
  const token = new TextEncoder().encode(
    `${JSON.stringify({ type: "stream", token: "partial answer" })}\n`
  );
  const blockedBody = new ReadableStream<Uint8Array>({
    pull(controller) {
      upstreamPullCount += 1;
      if (upstreamPullCount === 1) {
        controller.enqueue(token);
        return;
      }
      return new Promise<void>(() => undefined);
    },
    cancel() {
      upstreamCancelCalled = true;
      return new Promise<void>(() => undefined);
    },
  });

  globalThis.fetch = (async () => {
    callCount += 1;
    if (callCount === 1) return Response.json({ conversationId: "conversation-test" });
    if (callCount === 2) return Response.json({ rootMessageId: "root-message-test" });
    if (callCount === 3) {
      return new Response(blockedBody, {
        status: 200,
        headers: { "Content-Type": "application/jsonl" },
      });
    }
    throw new Error(`Unexpected fetch call ${callCount}`);
  }) as typeof globalThis.fetch;

  try {
    const result = await new HuggingChatExecutor().execute({
      model: "test/huggingchat-model",
      body: { messages: [{ role: "user", content: "hello" }] },
      stream: true,
      credentials: { apiKey: "hf-chat=fake-cookie" },
      signal: null,
      log: { error: (_tag, message) => errorLogs.push(message) },
    });

    assert.equal(callCount, 3, "the test must intercept every HuggingChat request");
    assert.ok(result.response.body);
    const reader = result.response.body.getReader();
    const roleChunk = await reader.read();
    const contentChunk = await reader.read();
    assert.match(new TextDecoder().decode(roleChunk.value), /"role":"assistant"/);
    assert.match(new TextDecoder().decode(contentChunk.value), /partial answer/);

    const blockedRead = reader.read();
    await new Promise<void>((resolve) => setImmediate(resolve));
    const cancelOutcome = await Promise.race([
      reader.cancel("client disconnected").then(() => "resolved" as const),
      new Promise<"hung">((resolve) => setImmediate(() => resolve("hung"))),
    ]);
    void blockedRead.catch(() => undefined);

    assert.equal(cancelOutcome, "resolved", "downstream cancellation must remain non-blocking");
    assert.equal(upstreamCancelCalled, true, "cancellation must reach the locked upstream reader");
    await new Promise<void>((resolve) => setImmediate(resolve));
    assert.deepEqual(errorLogs, [], "client cancellation must not log a provider stream failure");
  } finally {
    globalThis.fetch = realFetch;
  }
});

test("HuggingChat keeps the normal JSONL completion contract unchanged", async () => {
  const output = await collectStream(
    jsonlBody([
      JSON.stringify({ type: "stream", token: "complete answer" }),
      JSON.stringify({ type: "status", status: "finished" }),
    ])
  );

  assert.match(output, /"role":"assistant"/);
  assert.match(output, /complete answer/);
  assert.match(output, /"finish_reason":"stop"/);
  assert.match(output, /data: \[DONE\]/);
  assert.doesNotMatch(output, /"error":\{/);
});
