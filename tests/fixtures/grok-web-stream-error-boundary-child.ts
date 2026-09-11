import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";

// This file is executed only by the process-isolated unit-test wrapper. State
// mutations and repository imports must remain here, never in the parent test.
const originalDataDir = process.env.DATA_DIR;
const originalPluginsDir = process.env.OMNIROUTE_PLUGINS_DIR;
const originalFetch = globalThis.fetch;
const testRoot = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-grok-web-stream-error-"));

process.env.DATA_DIR = path.join(testRoot, "data");
process.env.OMNIROUTE_PLUGINS_DIR = path.join(testRoot, "plugins");
fs.mkdirSync(process.env.DATA_DIR, { recursive: true });
fs.mkdirSync(process.env.OMNIROUTE_PLUGINS_DIR, { recursive: true });
globalThis.fetch = async () => {
  throw new Error("Unexpected network request in Grok stream error boundary test");
};

const [
  { GrokWebExecutor },
  { __setTlsFetchOverrideForTesting },
  dbCore,
  settingsDb,
  callLogs,
  artifactWriter,
  { handleChatCore },
  usageHistory,
  accountSemaphore,
  requestDedup,
  accountFallback,
  loggerResource,
] = await Promise.all([
  import("../../open-sse/executors/grok-web.ts"),
  import("../../open-sse/services/grokTlsClient.ts"),
  import("../../src/lib/db/core.ts"),
  import("../../src/lib/db/settings.ts"),
  import("../../src/lib/usage/callLogs.ts"),
  import("../../src/lib/usage/callLogArtifactWriter.ts"),
  import("../../open-sse/handlers/chatCore.ts"),
  import("../../src/lib/usage/usageHistory.ts"),
  import("../../open-sse/services/accountSemaphore.ts"),
  import("../../open-sse/services/requestDedup.ts"),
  import("../../open-sse/services/accountFallback.ts"),
  import("../../src/shared/utils/loggerResource.ts"),
]);

function grokEventStream(events: unknown[]): ReadableStream<Uint8Array> {
  const encoder = new TextEncoder();
  return new ReadableStream({
    start(controller) {
      controller.enqueue(
        encoder.encode(`${events.map((event) => JSON.stringify(event)).join("\n")}\n`)
      );
      controller.close();
    },
  });
}

function stalledGrokEventStream(
  events: unknown[],
  onCancel: () => void
): ReadableStream<Uint8Array> {
  const encoder = new TextEncoder();
  return new ReadableStream({
    start(controller) {
      controller.enqueue(
        encoder.encode(`${events.map((event) => JSON.stringify(event)).join("\n")}\n`)
      );
    },
    pull() {
      return new Promise<void>(() => {});
    },
    cancel() {
      onCancel();
      return new Promise<void>(() => {});
    },
  });
}

type TestExecutorLog = {
  debug?: (tag: string, message: string) => void;
  info?: (tag: string, message: string) => void;
  warn?: (tag: string, message: string) => void;
  error?: (tag: string, message: string) => void;
};

async function executeStreamingBody(
  upstreamBody: ReadableStream<Uint8Array>,
  requestBody: Record<string, unknown> = {
    messages: [{ role: "user", content: "hello" }],
    stream: true,
  },
  options: { log?: TestExecutorLog | null; signal?: AbortSignal | null } = {}
): Promise<Response> {
  __setTlsFetchOverrideForTesting(async () => ({
    status: 200,
    headers: new Headers({ "Content-Type": "application/x-ndjson" }),
    text: null,
    body: upstreamBody,
  }));

  const result = await new GrokWebExecutor().execute({
    model: "grok-4.1-fast",
    body: requestBody,
    stream: true,
    credentials: { apiKey: "sso=test-only-cookie" },
    signal: options.signal ?? AbortSignal.timeout(10_000),
    log: options.log ?? null,
  });
  return result.response;
}

function executeStreaming(events: unknown[]): Promise<Response> {
  return executeStreamingBody(grokEventStream(events));
}

function parseSseData(text: string): unknown[] {
  return text
    .split(/\r?\n/)
    .filter((line) => line.startsWith("data: ") && line !== "data: [DONE]")
    .map((line) => JSON.parse(line.slice("data: ".length)) as unknown);
}

async function readUntilFailure(response: Response): Promise<{ text: string; error: unknown }> {
  assert.ok(response.body, "expected a streaming response body");
  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  let text = "";
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) return { text, error: null };
      text += decoder.decode(value, { stream: true });
    }
  } catch (error) {
    text += decoder.decode();
    return { text, error };
  }
}

async function waitFor<T>(read: () => Promise<T | null>, timeoutMs = 3_000): Promise<T | null> {
  const startedAt = Date.now();
  while (Date.now() - startedAt < timeoutMs) {
    const value = await read();
    if (value) return value;
    await new Promise((resolve) => setTimeout(resolve, 25));
  }
  return null;
}

async function settlesWithin(promise: Promise<unknown>, timeoutMs = 500): Promise<boolean> {
  let timeout: ReturnType<typeof setTimeout> | undefined;
  const settled = await Promise.race([
    promise.then(() => true),
    new Promise<boolean>((resolve) => {
      timeout = setTimeout(() => resolve(false), timeoutMs);
    }),
  ]);
  if (timeout) clearTimeout(timeout);
  return settled;
}

test.afterEach(() => {
  __setTlsFetchOverrideForTesting(null);
  usageHistory.clearPendingRequests();
  accountSemaphore.resetAll();
  requestDedup.clearInflight();
  accountFallback.clearModelLock();
});

test.after(async () => {
  __setTlsFetchOverrideForTesting(null);
  assert.equal(await callLogs.waitForCallLogSaves(3_000), true);
  await artifactWriter.closeCallLogArtifactWriter();
  usageHistory.clearPendingRequests();
  accountSemaphore.resetAll();
  requestDedup.clearInflight();
  accountFallback.clearModelLock();
  dbCore.resetDbInstance();
  await loggerResource.closeSharedLoggerResource();
  globalThis.fetch = originalFetch;

  if (originalDataDir === undefined) delete process.env.DATA_DIR;
  else process.env.DATA_DIR = originalDataDir;
  if (originalPluginsDir === undefined) delete process.env.OMNIROUTE_PLUGINS_DIR;
  else process.env.OMNIROUTE_PLUGINS_DIR = originalPluginsDir;

  fs.rmSync(testRoot, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("Grok Web rejects an error-only upstream stream before advertising HTTP 200 success", async () => {
  const response = await executeStreaming([
    {
      error: {
        code: "UPSTREAM_PRIVATE_CODE",
        message:
          "UPSTREAM_PRIVATE_DETAIL Bearer top-secret-token /srv/grok/handler.ts:42\n" +
          "    at internal (/srv/grok/handler.ts:42:7)",
      },
    },
  ]);

  assert.equal(response.status, 502);
  assert.match(response.headers.get("Content-Type") ?? "", /application\/json/);

  const body = (await response.json()) as {
    error: { message: string; type?: string; code?: string };
    upstream_details?: { error?: { message?: string } };
  };
  assert.equal(body.error.code, "STREAM_EARLY_EOF");
  assert.equal(body.error.type, "stream_early_eof");
  assert.equal(body.upstream_details?.error?.message, "Grok upstream stream failed");

  const publicBody = JSON.stringify(body);
  assert.doesNotMatch(publicBody, /UPSTREAM_PRIVATE/);
  assert.doesNotMatch(publicBody, /top-secret-token/);
  assert.doesNotMatch(publicBody, /\/srv\/grok/);
  assert.doesNotMatch(publicBody, /\bat internal\b/);
});

test("Grok Web preserves partial content then rejects with a fixed public error", async () => {
  let upstreamCancelCalls = 0;
  const response = await executeStreamingBody(
    stalledGrokEventStream(
      [
        { result: { response: { token: "partial answer" } } },
        {
          error: {
            code: "UPSTREAM_PRIVATE_CODE",
            message: "UPSTREAM_PRIVATE_DETAIL secret=never-public /srv/grok/stream.ts:99",
          },
        },
      ],
      () => {
        upstreamCancelCalls += 1;
      }
    )
  );

  assert.equal(response.status, 200);
  const { text, error } = await readUntilFailure(response);
  assert.ok(error instanceof Error);
  assert.equal(error.message, "Grok upstream stream failed");
  const payloads = parseSseData(text) as Array<Record<string, unknown>>;
  const content = payloads.find((payload) => {
    const choices = payload.choices as Array<{ delta?: { content?: string } }> | undefined;
    return choices?.[0]?.delta?.content === "partial answer";
  });
  assert.ok(content, "the valid content preceding the upstream failure must be retained");

  assert.doesNotMatch(text, /UPSTREAM_PRIVATE/);
  assert.doesNotMatch(text, /never-public/);
  assert.doesNotMatch(text, /\/srv\/grok/);
  assert.doesNotMatch(text, /\[Error:/);
  assert.doesNotMatch(text, /"finish_reason":"stop"/);
  assert.equal(upstreamCancelCalls, 1);
});

test("Grok Web converts a reader failure after content into the same safe terminal error", async () => {
  const encoder = new TextEncoder();
  const upstreamBody = new ReadableStream<Uint8Array>({
    start(controller) {
      controller.enqueue(
        encoder.encode(`${JSON.stringify({ result: { response: { token: "kept" } } })}\n`)
      );
      setTimeout(() => {
        controller.error(
          new Error("READER_PRIVATE_DETAIL Bearer stream-token /srv/grok/reader.ts:12")
        );
      }, 0);
    },
  });

  const response = await executeStreamingBody(upstreamBody);
  assert.equal(response.status, 200);
  const { text, error } = await readUntilFailure(response);
  assert.ok(error instanceof Error);
  assert.equal(error.message, "Grok upstream stream failed");
  const payloads = parseSseData(text) as Array<Record<string, unknown>>;
  assert.ok(
    payloads.some((payload) => {
      const choices = payload.choices as Array<{ delta?: { content?: string } }> | undefined;
      return choices?.[0]?.delta?.content === "kept";
    })
  );
  assert.doesNotMatch(text, /READER_PRIVATE/);
  assert.doesNotMatch(text, /stream-token/);
  assert.doesNotMatch(text, /\/srv\/grok/);
  assert.doesNotMatch(text, /"finish_reason":"stop"/);
});

test("Grok Web propagates downstream cancellation once without awaiting a stuck upstream", async () => {
  const encoder = new TextEncoder();
  let upstreamCancelCalls = 0;
  const upstreamBody = new ReadableStream<Uint8Array>({
    start(controller) {
      controller.enqueue(
        encoder.encode(
          `${JSON.stringify({ result: { response: { token: "cancel-safe partial" } } })}\n`
        )
      );
    },
    pull() {
      return new Promise<void>(() => {});
    },
    cancel() {
      upstreamCancelCalls += 1;
      return new Promise<void>(() => {});
    },
  });
  const logMessages: string[] = [];
  const recordLog = (tag: string, message: string) => {
    logMessages.push(`${tag}: ${message}`);
  };

  const response = await executeStreamingBody(upstreamBody, undefined, {
    log: { debug: recordLog, info: recordLog, warn: recordLog, error: recordLog },
  });
  assert.equal(response.status, 200);
  assert.ok(response.body);

  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  let text = "";
  while (!text.includes("cancel-safe partial")) {
    const { done, value } = await reader.read();
    assert.equal(done, false);
    if (value) text += decoder.decode(value, { stream: true });
  }
  const logCountBeforeCancel = logMessages.length;

  assert.equal(await settlesWithin(reader.cancel("client stopped reading")), true);
  assert.equal(await settlesWithin(reader.cancel("duplicate cancel")), true);
  await new Promise<void>((resolve) => setImmediate(resolve));

  assert.equal(upstreamCancelCalls, 1);
  assert.doesNotMatch(text, /"finish_reason":"stop"|data: \[DONE\]/);
  assert.equal(logMessages.length, logCountBeforeCancel);
});

test("chatCore returns a pre-content Grok failure to the outer fallback contract", async () => {
  const streamFailures: Array<Record<string, unknown>> = [];
  let requestSucceeded = false;
  const requestBody = {
    model: "grok-4.1-fast",
    messages: [{ role: "user", content: "fallback proof" }],
    stream: true,
  };

  __setTlsFetchOverrideForTesting(async () => ({
    status: 200,
    headers: new Headers({ "Content-Type": "application/x-ndjson" }),
    text: null,
    body: grokEventStream([
      {
        error: {
          code: "FALLBACK_PRIVATE_CODE",
          message: "FALLBACK_PRIVATE_DETAIL secret=never-public /srv/grok/fallback.ts:5",
        },
      },
    ]),
  }));

  const result = await handleChatCore({
    body: structuredClone(requestBody),
    modelInfo: { provider: "grok-web", model: "grok-4.1-fast", extendedContext: false },
    credentials: { apiKey: "sso=test-only-cookie", providerSpecificData: {} },
    connectionId: "grok-stream-error-fallback",
    log: { debug() {}, info() {}, warn() {}, error() {} },
    clientRawRequest: {
      endpoint: "/v1/chat/completions",
      body: structuredClone(requestBody),
      headers: new Headers({ accept: "text/event-stream" }),
    },
    userAgent: "grok-stream-error-boundary-test",
    onRequestSuccess() {
      requestSucceeded = true;
    },
    onStreamFailure(failure: Record<string, unknown>) {
      streamFailures.push(failure);
    },
  } as never);

  assert.equal(result.success, false);
  assert.equal(result.status, 502);
  assert.equal(requestSucceeded, false);
  assert.deepEqual(streamFailures, []);

  const publicBody = await result.response.text();
  assert.match(publicBody, /Grok upstream stream failed/);
  assert.doesNotMatch(publicBody, /FALLBACK_PRIVATE|never-public|\/srv\/grok/);
  assert.doesNotMatch(publicBody, /"role":"assistant"|"finish_reason":"stop"/);
});

test("chatCore converts a Grok post-content failure into terminal wire error and failed persistence", async () => {
  await settingsDb.updateSettings({ call_log_pipeline_enabled: true });
  const streamFailures: Array<Record<string, unknown>> = [];
  const requestBody = {
    model: "grok-4.1-fast",
    messages: [{ role: "user", content: "pipeline proof" }],
    stream: true,
  };

  __setTlsFetchOverrideForTesting(async () => ({
    status: 200,
    headers: new Headers({ "Content-Type": "application/x-ndjson" }),
    text: null,
    body: grokEventStream([
      { result: { response: { token: "pipeline partial" } } },
      {
        error: {
          code: "PIPELINE_PRIVATE_CODE",
          message: "PIPELINE_PRIVATE_DETAIL secret=never-public /srv/grok/pipeline.ts:7",
        },
      },
    ]),
  }));

  const result = await handleChatCore({
    body: structuredClone(requestBody),
    modelInfo: { provider: "grok-web", model: "grok-4.1-fast", extendedContext: false },
    credentials: { apiKey: "sso=test-only-cookie", providerSpecificData: {} },
    connectionId: "grok-stream-error-boundary",
    log: { debug() {}, info() {}, warn() {}, error() {} },
    clientRawRequest: {
      endpoint: "/v1/chat/completions",
      body: structuredClone(requestBody),
      headers: new Headers({ accept: "text/event-stream" }),
    },
    userAgent: "grok-stream-error-boundary-test",
    onStreamFailure(failure: Record<string, unknown>) {
      streamFailures.push(failure);
    },
  } as never);

  assert.equal(result.success, true);
  const wire = await result.response.text();
  assert.match(wire, /"content":"pipeline partial"/);
  assert.match(wire, /"finish_reason":"error"/);
  assert.match(wire, /"message":"Grok upstream stream failed"/);
  assert.match(wire, /"type":"server_error"/);
  assert.match(wire, /"code":"server_error"/);
  assert.match(wire, /data: \[DONE\]/);
  assert.doesNotMatch(wire, /"finish_reason":"stop"/);
  assert.doesNotMatch(wire, /PIPELINE_PRIVATE|never-public|\/srv\/grok/);

  assert.equal(streamFailures.length, 1);
  assert.deepEqual(streamFailures[0], {
    status: 502,
    message: "Grok upstream stream failed",
    code: "stream_pipeline_error",
    type: "stream_error",
  });

  assert.equal(await callLogs.waitForCallLogSaves(3_000), true);
  const persisted = await waitFor(async () => {
    const rows = await callLogs.getCallLogs({ provider: "grok-web", status: "error", limit: 5 });
    return rows.find((row) => row.connectionId === "grok-stream-error-boundary") ?? null;
  });
  assert.ok(persisted, "expected the pipeline failure to be persisted");
  assert.equal(persisted.status, 502);
  assert.equal(persisted.error, "Grok upstream stream failed");

  const detail = await callLogs.getCallLogById(persisted.id);
  assert.ok(detail?.pipelinePayloads, "expected failed pipeline payloads in the call log");
  const persistedPayload = JSON.stringify(detail.pipelinePayloads);
  assert.match(persistedPayload, /Grok upstream stream failed/);
  assert.doesNotMatch(persistedPayload, /PIPELINE_PRIVATE|never-public|\/srv\/grok/);
});

test("Grok Web still emits streaming tool calls after delaying the assistant role", async () => {
  let upstreamCancelCalls = 0;
  const response = await executeStreamingBody(
    stalledGrokEventStream(
      [
        {
          result: {
            response: {
              modelResponse: {
                message:
                  '<tool_call>{"name":"memory_context_tool","arguments":{"query":"grok"}}</tool_call>',
              },
            },
          },
        },
      ],
      () => {
        upstreamCancelCalls += 1;
      }
    ),
    {
      messages: [{ role: "user", content: "search memory" }],
      stream: true,
      tools: [
        {
          type: "function",
          function: {
            name: "memory_context_tool",
            parameters: { type: "object", properties: { query: { type: "string" } } },
          },
        },
      ],
    }
  );

  assert.equal(response.status, 200);
  const text = await response.text();
  assert.match(text, /"role":"assistant"/);
  assert.match(text, /"tool_calls"/);
  assert.match(text, /"name":"memory_context_tool"/);
  assert.match(text, /"finish_reason":"tool_calls"/);
  assert.doesNotMatch(text, /"error"/);
  assert.equal(upstreamCancelCalls, 1);
});
