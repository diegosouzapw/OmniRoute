import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

// This file is executed only by the process-isolated unit-test wrapper. State
// mutations and repository imports must remain here, never in the parent test.
const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-zed-stream-data-"));
const TEST_PLUGINS_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-zed-stream-plugins-"));
const originalDataDir = process.env.DATA_DIR;
const originalPluginsDir = process.env.OMNIROUTE_PLUGINS_DIR;
const originalFetch = globalThis.fetch;
let networkCalls = 0;

process.env.DATA_DIR = TEST_DATA_DIR;
process.env.OMNIROUTE_PLUGINS_DIR = TEST_PLUGINS_DIR;
globalThis.fetch = async () => {
  networkCalls += 1;
  throw new Error("Unexpected network access in Zed stream boundary test");
};

const core = await import("../../src/lib/db/core.ts");
const loggerResource = await import("../../src/shared/utils/loggerResource.ts");
const { __test__ } = await import("../../open-sse/executors/zed-hosted.ts");
const { FORMATS } = await import("../../open-sse/translator/formats.ts");
const { assembleStreamingPipeline } =
  await import("../../open-sse/handlers/chatCore/streamingPipeline.ts");
const { createPassthroughStreamWithLogger } = await import("../../open-sse/utils/stream.ts");
const { createStreamFailureFinalizers } =
  await import("../../open-sse/utils/streamFailureFinalization.ts");
const { createStreamController } = await import("../../open-sse/utils/streamHandler.ts");
const { ensureStreamReadiness } = await import("../../open-sse/utils/streamReadiness.ts");
const { wrapZedCompletionStream } = __test__;

type StreamCompletionEvent = Parameters<
  Parameters<typeof createStreamFailureFinalizers>[0]["onStreamComplete"]
>[0];

const RAW_FAILURE = "Bearer TOP_SECRET /srv/omniroute/zed-handler.ts:42 api_key=zed-secret";
const TEST_MODEL = "grok-test-zed-stream-boundary";
const TEST_CONNECTION_ID = "zed-stream-boundary-partial-connection";

function failedStatusLine(): string {
  return JSON.stringify({ status: { failed: { message: RAW_FAILURE } } });
}

function nestedFailedStatusLine(): string {
  return JSON.stringify({
    status: {
      type: "failed",
      error: { message: `${RAW_FAILURE} ${"x".repeat(2_000)}` },
    },
  });
}

function wrapOpenNdjson(lines: unknown[]): Response {
  const encoder = new TextEncoder();
  const body = lines
    .map((line) => (typeof line === "string" ? line : JSON.stringify(line)))
    .join("\n");
  const stream = new ReadableStream<Uint8Array>({
    start(controller) {
      controller.enqueue(encoder.encode(`${body}\n`));
      // Keep the upstream open: status.failed must terminate the wrapped stream itself.
    },
    cancel() {},
  });
  return wrapZedCompletionStream(
    new Response(stream, {
      status: 200,
      headers: { "Content-Type": "application/x-ndjson" },
    }),
    "x_ai",
    TEST_MODEL
  );
}

function wrapOpenFailedNdjson(): Response {
  const encoder = new TextEncoder();
  const body = new ReadableStream<Uint8Array>({
    start(controller) {
      controller.enqueue(encoder.encode(`${failedStatusLine()}\n`));
      // Deliberately stay open: status.failed is terminal by itself and must not
      // depend on the upstream socket eventually reaching EOF.
    },
    cancel() {},
  });
  return wrapZedCompletionStream(
    new Response(body, {
      status: 200,
      headers: { "Content-Type": "application/x-ndjson" },
    }),
    "x_ai",
    TEST_MODEL
  );
}

function wrapStalledNdjson(onCancel: () => void): Response {
  const body = new ReadableStream<Uint8Array>({
    cancel() {
      onCancel();
      return new Promise<void>(() => {});
    },
  });
  return wrapZedCompletionStream(
    new Response(body, {
      status: 200,
      headers: { "Content-Type": "application/x-ndjson" },
    }),
    "x_ai",
    TEST_MODEL
  );
}

async function resolvesWithin(promise: Promise<unknown>, timeoutMs: number): Promise<void> {
  let timeout: ReturnType<typeof setTimeout> | undefined;
  try {
    await Promise.race([
      promise,
      new Promise<never>((_, reject) => {
        timeout = setTimeout(
          () => reject(new Error(`operation exceeded ${timeoutMs}ms`)),
          timeoutMs
        );
      }),
    ]);
  } finally {
    if (timeout) clearTimeout(timeout);
  }
}

async function waitFor(predicate: () => boolean, timeoutMs: number): Promise<void> {
  const deadline = Date.now() + timeoutMs;
  while (!predicate() && Date.now() < deadline) {
    await new Promise((resolve) => setTimeout(resolve, 1));
  }
  assert.equal(predicate(), true, `condition was not met within ${timeoutMs}ms`);
}

function parseSsePayloads(text: string): Array<Record<string, unknown>> {
  return text
    .split(/\r?\n/)
    .filter((line) => line.startsWith("data: ") && line.slice(6) !== "[DONE]")
    .map((line) => JSON.parse(line.slice(6)) as Record<string, unknown>);
}

function assertNoSensitiveFailureText(text: string): void {
  assert.doesNotMatch(text, /TOP_SECRET|zed-secret|\/srv\/omniroute\/zed-handler\.ts/);
}

test.after(async () => {
  core.resetDbInstance();
  await loggerResource.closeSharedLoggerResource();
  globalThis.fetch = originalFetch;
  if (originalDataDir === undefined) delete process.env.DATA_DIR;
  else process.env.DATA_DIR = originalDataDir;
  if (originalPluginsDir === undefined) delete process.env.OMNIROUTE_PLUGINS_DIR;
  else process.env.OMNIROUTE_PLUGINS_DIR = originalPluginsDir;
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.rmSync(TEST_PLUGINS_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("zed-hosted pre-content status.failed becomes a sanitized 502 readiness failure", async () => {
  const readiness = await ensureStreamReadiness(wrapOpenFailedNdjson(), {
    timeoutMs: 100,
    provider: "zed-hosted",
    model: TEST_MODEL,
  });

  assert.equal(readiness.ok, false, "the structured error must remain eligible for fallback");
  if (readiness.ok) assert.fail("pre-content Zed failure must not make the stream ready");
  assert.equal(readiness.response.status, 502);
  assert.equal(readiness.code, "STREAM_EARLY_EOF");

  const bodyText = await readiness.response.text();
  const body = JSON.parse(bodyText) as {
    error: { message: string; type: string; code: string };
    upstream_details?: { error?: { message?: string } };
  };
  assert.equal(body.error.type, "stream_early_eof");
  assert.equal(body.error.code, "STREAM_EARLY_EOF");
  assert.match(body.upstream_details?.error?.message ?? "", /Zed stream failed/i);
  assertNoSensitiveFailureText(bodyText);
  assert.equal(networkCalls, 0);
});

test("zed-hosted partial failure reaches stream finalization and persistence as 502", async () => {
  const roleChunk = {
    event: {
      id: "chatcmpl-zed-partial",
      object: "chat.completion.chunk",
      choices: [{ index: 0, delta: { role: "assistant" }, finish_reason: null }],
    },
  };
  const contentChunk = {
    event: {
      id: "chatcmpl-zed-partial",
      object: "chat.completion.chunk",
      choices: [{ index: 0, delta: { content: "partial answer" }, finish_reason: null }],
    },
  };
  const readiness = await ensureStreamReadiness(
    wrapOpenNdjson([
      roleChunk,
      contentChunk,
      nestedFailedStatusLine(),
      { event: { ignored: "after failure" } },
    ]),
    {
      timeoutMs: 100,
      provider: "zed-hosted",
      model: TEST_MODEL,
    }
  );

  assert.equal(readiness.ok, true, "partial model output must remain deliverable");
  const completionEvents: StreamCompletionEvent[] = [];
  const persistedFailures: Array<{
    connectionId: string;
    model: string;
    status: number;
    code?: string;
  }> = [];
  const streamFailures: Array<{ status: number; message: string; code?: string; type?: string }> =
    [];
  const pipelineErrors: Array<{ message: string; statusCode: number }> = [];
  let streamCompletionRecorded = false;
  let failureCompletionRecorded = false;

  const recordCompletion = (payload: StreamCompletionEvent): void => {
    if (streamCompletionRecorded) return;
    streamCompletionRecorded = true;
    if (payload.status !== 200) failureCompletionRecorded = true;
    completionEvents.push(payload);
  };
  const finalizers = createStreamFailureFinalizers({
    isFailureCompletionRecorded: () => failureCompletionRecorded,
    isStreamCompletionRecorded: () => streamCompletionRecorded,
    onStreamComplete: recordCompletion,
    persistFailureUsage: (status, code) =>
      persistedFailures.push({
        connectionId: TEST_CONNECTION_ID,
        model: TEST_MODEL,
        status,
        code,
      }),
    onStreamFailure: (failure) => streamFailures.push(failure),
  });
  const streamController = createStreamController({
    onError: (event) => {
      pipelineErrors.push({ message: event.message, statusCode: event.statusCode });
      return finalizers.onPipelineStreamError(event);
    },
    provider: "zed-hosted",
    model: TEST_MODEL,
    connectionId: TEST_CONNECTION_ID,
    clientResponseFormat: FORMATS.OPENAI,
  });
  const transformStream = createPassthroughStreamWithLogger(
    "zed-hosted",
    null,
    null,
    TEST_MODEL,
    TEST_CONNECTION_ID,
    { messages: [{ role: "user", content: "test" }] },
    recordCompletion,
    null,
    finalizers.handleStreamFailure,
    FORMATS.OPENAI
  );
  const responseHeaders: Record<string, string> = {};
  const finalStream = assembleStreamingPipeline({
    providerResponse: readiness.response,
    transformStream,
    streamController,
    createPiiTransform: null,
    clientRawRequestHeaders: null,
    clientResponseFormat: FORMATS.OPENAI,
    echoModel: null,
    responseHeaders,
  });
  const text = await new Response(finalStream, { headers: responseHeaders }).text();
  const payloads = parseSsePayloads(text);
  const errorPayload = payloads.find((payload) => "error" in payload) as
    { error: { message: string; type: string; code: string } } | undefined;

  assert.match(text, /partial answer/);
  assert.ok(errorPayload, "the stream handler must emit its format-safe terminal error");
  assert.equal(errorPayload.error.type, "server_error");
  assert.equal(errorPayload.error.code, "server_error");
  assert.equal(errorPayload.error.message, "Zed upstream stream failed");
  assert.match(text, /"finish_reason":"error"/);
  assert.doesNotMatch(text, /\[Zed error\]|"finish_reason":"stop"|response\.failed/);
  assert.doesNotMatch(text, /"ignored":"after failure"/);
  assertNoSensitiveFailureText(text);

  assert.equal(completionEvents.length, 1, "the failure must finalize exactly once");
  assert.equal(completionEvents[0].status, 502);
  assert.equal(completionEvents[0].error, "Zed upstream stream failed");
  assert.equal(completionEvents[0].errorCode, "stream_pipeline_error");
  assert.deepEqual(persistedFailures, [
    {
      connectionId: TEST_CONNECTION_ID,
      model: TEST_MODEL,
      status: 502,
      code: "stream_pipeline_error",
    },
  ]);
  assert.deepEqual(streamFailures, [
    {
      status: 502,
      message: "Zed upstream stream failed",
      code: "stream_pipeline_error",
      type: "stream_error",
    },
  ]);
  assert.deepEqual(pipelineErrors, [{ message: "Zed upstream stream failed", statusCode: 502 }]);
  assertNoSensitiveFailureText(JSON.stringify(completionEvents));
  assert.equal(networkCalls, 0);
});

test("zed-hosted client cancellation does not await a stalled upstream cancel hook", async () => {
  let upstreamCancelCalls = 0;
  const response = wrapStalledNdjson(() => {
    upstreamCancelCalls += 1;
  });
  assert.ok(response.body);

  const reader = response.body.getReader();
  const pendingRead = reader.read();
  await resolvesWithin(reader.cancel("client disconnected"), 100);
  const readResult = await pendingRead;
  assert.equal(readResult.done, true);
  await waitFor(() => upstreamCancelCalls === 1, 100);

  await resolvesWithin(reader.cancel("duplicate cancel"), 100);
  await new Promise((resolve) => setTimeout(resolve, 10));
  assert.equal(upstreamCancelCalls, 1, "the upstream cancel hook must be requested exactly once");
  assert.equal(networkCalls, 0);
});
