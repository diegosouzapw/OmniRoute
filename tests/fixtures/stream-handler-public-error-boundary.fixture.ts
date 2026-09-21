// This suite owns process-wide DATA_DIR, plugin, logger, and DB state. It must run only inside
// the subprocess launched by tests/unit/stream-handler-public-error-boundary.test.ts.
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";

const originalDataDir = process.env.DATA_DIR;
const originalPluginsDir = process.env.OMNIROUTE_PLUGINS_DIR;
const testRoot = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-stream-public-error-"));
const TEST_DATA_DIR = path.join(testRoot, "data");
const TEST_PLUGINS_DIR = path.join(testRoot, "plugins");
fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
fs.mkdirSync(TEST_PLUGINS_DIR, { recursive: true });
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.OMNIROUTE_PLUGINS_DIR = TEST_PLUGINS_DIR;

const [core, callLogs, artifactWriter, loggerResource, streamHandler, { FORMATS }] =
  await Promise.all([
    import("../../src/lib/db/core.ts"),
    import("../../src/lib/usage/callLogs.ts"),
    import("../../src/lib/usage/callLogArtifactWriter.ts"),
    import("../../src/shared/utils/loggerResource.ts"),
    import("../../open-sse/utils/streamHandler.ts"),
    import("../../open-sse/translator/formats.ts"),
  ]);
const { createStreamController, pipeWithDisconnect } = streamHandler;

const SECRET = "sk-live-streamhandler-secret-123456";
const API_KEY = "provider-key-streamhandler-654321";
const PRIVATE_PATH = "/srv/omniroute/private/provider.ts:42:9";
const RAW_MESSAGE =
  `Upstream failed at ${PRIVATE_PATH} Authorization: Bearer ${SECRET} api_key=${API_KEY}` +
  `\n    at dispatch (/srv/omniroute/private/dispatcher.ts:88:3)`;

test.after(async () => {
  assert.equal(await callLogs.waitForCallLogSaves(3_000), true);
  await artifactWriter.closeCallLogArtifactWriter();
  core.resetDbInstance();
  await loggerResource.closeSharedLoggerResource();

  if (originalDataDir === undefined) delete process.env.DATA_DIR;
  else process.env.DATA_DIR = originalDataDir;
  if (originalPluginsDir === undefined) delete process.env.OMNIROUTE_PLUGINS_DIR;
  else process.env.OMNIROUTE_PLUGINS_DIR = originalPluginsDir;

  fs.rmSync(testRoot, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("fixture binds all persistent state to its process-owned directories", () => {
  assert.equal(core.DATA_DIR, TEST_DATA_DIR);
  assert.equal(core.SQLITE_FILE, path.join(TEST_DATA_DIR, "storage.sqlite"));
  assert.equal(process.env.DATA_DIR, TEST_DATA_DIR);
  assert.equal(process.env.OMNIROUTE_PLUGINS_DIR, TEST_PLUGINS_DIR);
  assert.equal(fs.existsSync(TEST_DATA_DIR), true);
  assert.equal(fs.existsSync(TEST_PLUGINS_DIR), true);
});

test("OpenAI stream failures keep raw diagnostics internal and sanitize the public wire", async () => {
  const upstreamError = Object.assign(new Error(RAW_MESSAGE), { statusCode: 502 });
  const source = new ReadableStream<Uint8Array>({
    start(controller) {
      controller.error(upstreamError);
    },
  });
  let internalMessage = "";

  const stream = pipeWithDisconnect(
    new Response(source),
    new TransformStream<Uint8Array, Uint8Array>(),
    createStreamController({
      clientResponseFormat: FORMATS.OPENAI,
      onError(event) {
        internalMessage = event.message;
        return true;
      },
    }),
    { stallTimeoutMs: 0 }
  );
  const publicWire = await new Response(stream).text();

  assert.equal(internalMessage, RAW_MESSAGE, "failure classification must retain the raw message");
  assert.match(publicWire, /"finish_reason":"error"/);
  assert.match(publicWire, /"code":"server_error"/);
  assert.match(publicWire, /\[DONE\]/);
  assert.doesNotMatch(publicWire, new RegExp(SECRET));
  assert.doesNotMatch(publicWire, new RegExp(API_KEY));
  assert.doesNotMatch(publicWire, /\/srv\/omniroute\/private/);
  assert.doesNotMatch(publicWire, /dispatcher\.ts/);
  assert.match(publicWire, /Authorization: \[REDACTED\]/);
  assert.match(publicWire, /<path>/);
});

test("Responses stream failures preserve the failure event shape without leaking diagnostics", async () => {
  const upstreamError = Object.assign(new Error(RAW_MESSAGE), { statusCode: 429 });
  const source = new ReadableStream<Uint8Array>({
    start(controller) {
      controller.error(upstreamError);
    },
  });
  let internalError: unknown;

  const stream = pipeWithDisconnect(
    new Response(source),
    new TransformStream<Uint8Array, Uint8Array>(),
    createStreamController({
      clientResponseFormat: FORMATS.OPENAI_RESPONSES,
      onError(event) {
        internalError = event.error;
        return true;
      },
    }),
    { stallTimeoutMs: 0 }
  );
  const publicWire = await new Response(stream).text();

  assert.equal(internalError, upstreamError, "the original error object must reach classification");
  assert.match(publicWire, /event: response\.failed/);
  assert.match(publicWire, /"type":"response\.failed"/);
  assert.match(publicWire, /"type":"rate_limit_error"/);
  assert.match(publicWire, /"code":"rate_limit_exceeded"/);
  assert.doesNotMatch(publicWire, new RegExp(SECRET));
  assert.doesNotMatch(publicWire, new RegExp(API_KEY));
  assert.doesNotMatch(publicWire, /\/srv\/omniroute\/private/);
  assert.doesNotMatch(publicWire, /dispatcher\.ts/);
  assert.match(publicWire, /Authorization: \[REDACTED\]/);
  assert.match(publicWire, /<path>/);
});

test("Claude stream failures preserve error and stop events without leaking diagnostics", async () => {
  const upstreamError = Object.assign(new Error(RAW_MESSAGE), { statusCode: 403 });
  const source = new ReadableStream<Uint8Array>({
    start(controller) {
      controller.error(upstreamError);
    },
  });
  let internalStatusCode = 0;

  const stream = pipeWithDisconnect(
    new Response(source),
    new TransformStream<Uint8Array, Uint8Array>(),
    createStreamController({
      clientResponseFormat: FORMATS.CLAUDE,
      onError(event) {
        internalStatusCode = event.statusCode;
        return true;
      },
    }),
    { stallTimeoutMs: 0 }
  );
  const publicWire = await new Response(stream).text();

  assert.equal(internalStatusCode, 403);
  assert.match(publicWire, /event: error/);
  assert.match(publicWire, /"type":"permission_error"/);
  assert.match(publicWire, /event: message_stop/);
  assert.doesNotMatch(publicWire, new RegExp(SECRET));
  assert.doesNotMatch(publicWire, new RegExp(API_KEY));
  assert.doesNotMatch(publicWire, /\/srv\/omniroute\/private/);
  assert.doesNotMatch(publicWire, /dispatcher\.ts/);
  assert.match(publicWire, /Authorization: \[REDACTED\]/);
  assert.match(publicWire, /<path>/);
});

test("stream diagnostics sanitize logs while callbacks retain the original failure", () => {
  const upstreamError = Object.assign(new Error(RAW_MESSAGE), { statusCode: 502 });
  const originalLog = console.log;
  const logLines: string[] = [];
  let internalError: unknown;
  console.log = (...args: unknown[]) => {
    logLines.push(args.map(String).join(" "));
  };

  try {
    createStreamController({
      provider: "test-provider",
      model: "test-model",
      onError(event) {
        internalError = event.error;
        return true;
      },
    }).handleError(upstreamError);
  } finally {
    console.log = originalLog;
  }

  const logs = logLines.join("\n");
  assert.equal(internalError, upstreamError);
  assert.match(logs, /error: Upstream failed at <path>/);
  assert.match(logs, /Authorization: \[REDACTED\]/);
  assert.doesNotMatch(logs, new RegExp(SECRET));
  assert.doesNotMatch(logs, new RegExp(API_KEY));
  assert.doesNotMatch(logs, /\/srv\/omniroute\/private/);
  assert.doesNotMatch(logs, /dispatcher\.ts/);
});

test("client disconnects stay outside the provider-failure callback", () => {
  let providerFailureRecorded = false;
  const controller = createStreamController({
    onError() {
      providerFailureRecorded = true;
      return true;
    },
  });

  controller.handleError(new DOMException("request_signal_aborted", "AbortError"));

  assert.equal(providerFailureRecorded, false);
  assert.equal(controller.signal.aborted, false);
});
