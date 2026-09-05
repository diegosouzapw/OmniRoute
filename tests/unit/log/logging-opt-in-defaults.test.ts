import assert from "node:assert/strict";
import test from "node:test";

import { POST } from "../../../src/app/api/v1/chat/completions/route.ts";
import { getCallLogPipelineCaptureStreamChunks } from "../../../src/lib/logEnv.ts";

const originalConsoleError = console.error;
const originalCaptureChunks = process.env.CALL_LOG_PIPELINE_CAPTURE_STREAM_CHUNKS;
const originalRequestShape = process.env.OMNIROUTE_LOG_REQUEST_SHAPE;

test.afterEach(() => {
  console.error = originalConsoleError;

  if (originalCaptureChunks === undefined) {
    delete process.env.CALL_LOG_PIPELINE_CAPTURE_STREAM_CHUNKS;
  } else {
    process.env.CALL_LOG_PIPELINE_CAPTURE_STREAM_CHUNKS = originalCaptureChunks;
  }

  if (originalRequestShape === undefined) {
    delete process.env.OMNIROUTE_LOG_REQUEST_SHAPE;
  } else {
    process.env.OMNIROUTE_LOG_REQUEST_SHAPE = originalRequestShape;
  }
});

test("stream-chunk pipeline capture is disabled by default and supports explicit opt-in", () => {
  delete process.env.CALL_LOG_PIPELINE_CAPTURE_STREAM_CHUNKS;
  assert.equal(getCallLogPipelineCaptureStreamChunks(), false);

  process.env.CALL_LOG_PIPELINE_CAPTURE_STREAM_CHUNKS = "true";
  assert.equal(getCallLogPipelineCaptureStreamChunks(), true);

  process.env.CALL_LOG_PIPELINE_CAPTURE_STREAM_CHUNKS = "false";
  assert.equal(getCallLogPipelineCaptureStreamChunks(), false);
});

async function requestShapeMarkers(value: string | undefined): Promise<string[]> {
  if (value === undefined) {
    delete process.env.OMNIROUTE_LOG_REQUEST_SHAPE;
  } else {
    process.env.OMNIROUTE_LOG_REQUEST_SHAPE = value;
  }

  const markers: string[] = [];
  console.error = (...args: unknown[]) => {
    const message = args.map(String).join(" ");
    if (message.includes("[CHAT-ROUTE] large body")) markers.push(message);
  };

  const body = JSON.stringify({
    messages: [{ role: "user", content: "x".repeat(300 * 1024) }],
  });
  const response = await POST(
    new Request("http://localhost/v1/chat/completions", {
      method: "POST",
      headers: {
        "content-length": String(Buffer.byteLength(body)),
        "content-type": "application/json",
      },
      body,
    })
  );
  await response.text();
  return markers;
}

test("large-request shape logging requires the exact opt-in value 1", async () => {
  assert.deepEqual(await requestShapeMarkers(undefined), []);
  assert.deepEqual(await requestShapeMarkers("true"), []);

  const enabledMarkers = await requestShapeMarkers("1");
  assert.equal(enabledMarkers.length, 1);
  assert.match(enabledMarkers[0], /content-length=3072\d\d/);
});
