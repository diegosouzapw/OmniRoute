// tests/unit/chat-keepalive-correlation-functional.test.ts
// Route-level keepalive correlation (#14792, follow-up #14850).
//
// /v1/chat/completions passes its request id to withEarlyStreamKeepalive as
// `correlationId` (src/app/api/v1/chat/completions/route.ts). With it, every byte the
// wrapper writes straight to the client is buffered under that id
// (open-sse/utils/earlyKeepaliveByteBuffer.ts) so the handler can merge it into the
// call-log row. Without it, nothing is buffered.
//
// - The first test is the regression guard for that route line: it reads the real
//   buffer after the wrapper's first frame and fails when the route stops passing
//   `correlationId` (verified red with the line removed, green with it).
// - The second is an end-to-end check that the persisted row carries the keepalive
//   bytes. Neither test records bytes on the wrapper's behalf.
//
// The upstream is held open by a promise the test releases, instead of a fixed sleep.
// The only real wait is the route's own 1s keepalive threshold for openai/* models.
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const dataDir = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-chat-keepalive-func-"));
process.env.DATA_DIR = dataDir;
process.env.REQUIRE_API_KEY = "false";
// The attempt-logging merge runs only when detailed logging is enabled and a
// correlation id is present; chatCore reads the DB-backed setting, seeded per test.
process.env.CALL_LOG_PIPELINE_CAPTURE_STREAM_CHUNKS = "true";

const core = await import("../../src/lib/db/core.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const settingsDb = await import("../../src/lib/db/settings.ts");
const chatRoute = await import("../../src/app/api/v1/chat/completions/route.ts");
const { takeEarlyKeepaliveBytes } =
  await import("../../open-sse/utils/earlyKeepaliveByteBuffer.ts");

const originalFetch = globalThis.fetch;

const UPSTREAM_SSE =
  'data: {"id":"chatcmpl-keepalive-func","object":"chat.completion.chunk","created":1,"model":"gpt-4.1","choices":[{"index":0,"delta":{"content":"OK"},"finish_reason":null}]}\n\ndata: [DONE]\n\n';

async function flushBackgroundWork() {
  await new Promise((resolve) => setTimeout(resolve, 20));
  await new Promise((resolve) => setImmediate(resolve));
}

test.beforeEach(async () => {
  globalThis.fetch = originalFetch;
  core.resetDbInstance();
  fs.rmSync(dataDir, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(dataDir, { recursive: true });
  await core.ensureDbInitialized();
  await providersDb.createProviderConnection({
    provider: "openai",
    authType: "apikey",
    name: "openai-chat-keepalive-func",
    apiKey: "sk-chat-keepalive-func",
    isActive: true,
    testStatus: "active",
  });
});

test.afterEach(async () => {
  await flushBackgroundWork();
  globalThis.fetch = originalFetch;
});

test.after(async () => {
  await flushBackgroundWork();
  globalThis.fetch = originalFetch;
  core.resetDbInstance();
  fs.rmSync(dataDir, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

/** Upstream that answers only once the test calls `release()`. */
function holdUpstream(): { release: () => void } {
  let release: () => void = () => {};
  const released = new Promise<void>((resolve) => {
    release = resolve;
  });
  globalThis.fetch = (async () => {
    await released;
    return new Response(UPSTREAM_SSE, {
      status: 200,
      headers: { "Content-Type": "text/event-stream" },
    });
  }) as typeof fetch;
  return { release: () => release() };
}

function streamingRequest(correlationId: string): Request {
  return new Request("http://localhost/v1/chat/completions", {
    method: "POST",
    headers: { "Content-Type": "application/json", "X-Correlation-Id": correlationId },
    body: JSON.stringify({
      model: "openai/gpt-4.1",
      messages: [{ role: "user", content: "hi" }],
      stream: true,
    }),
  });
}

test("route buffers its keepalive bytes under the caller's X-Correlation-Id", async () => {
  const upstream = holdUpstream();
  const correlationId = `chat-keepalive-wiring-${Date.now()}`;

  const res = await chatRoute.POST(streamingRequest(correlationId));
  assert.equal(res.status, 200);
  assert.equal(res.headers.get("x-correlation-id"), correlationId);

  // The slow path has committed: the wrapper has written its startup frame to the wire.
  const reader = res.body!.getReader();
  const first = await reader.read();
  assert.match(new TextDecoder().decode(first.value), /chatcmpl-keepalive/);

  // Only the route's `correlationId: reqId` makes the wrapper buffer what it wrote.
  const buffered = takeEarlyKeepaliveBytes(correlationId).join("");
  assert.match(
    buffered,
    /chatcmpl-keepalive/,
    "withEarlyStreamKeepalive must receive the request's correlation id from the route"
  );

  upstream.release();
  await reader.cancel().catch(() => {});
});

test("slow streaming chat request persists keepalive bytes in the call-log row", async () => {
  await settingsDb.updateSettings({ call_log_pipeline_enabled: true });
  const upstream = holdUpstream();
  const correlationId = `chat-keepalive-func-${Date.now()}`;

  const res = await chatRoute.POST(streamingRequest(correlationId));
  assert.equal(res.status, 200);
  const reader = res.body!.getReader();
  const decoder = new TextDecoder();
  let wire = decoder.decode((await reader.read()).value);

  // Startup frame is on the wire; now let the upstream answer and drain the rest so
  // the handler finishes and persists the attempt log.
  upstream.release();
  for (;;) {
    const { done, value } = await reader.read();
    if (done) break;
    wire += decoder.decode(value);
  }
  assert.match(wire, /chatcmpl-keepalive/, "wire must carry the keepalive startup frame");
  assert.match(wire, /chatcmpl-keepalive-func/, "wire must carry the upstream chunk");

  // The journal row is keyed on an internal traceId, not the caller correlation id:
  // find the recent row carrying ours, then re-read it in full (summary rows lack
  // the pipeline payloads). Persistence is async, so poll briefly.
  const { getCallLogs, getCallLogById } = await import("../../src/lib/usage/callLogs.ts");
  const deadline = Date.now() + 5_000;
  let row: Record<string, unknown> | null = null;
  while (!row && Date.now() < deadline) {
    const recent = (await getCallLogs({ limit: 10 })) as Array<Record<string, unknown>>;
    const summary = recent.find((r) => JSON.stringify(r).includes(correlationId));
    if (summary?.id) {
      row = (await getCallLogById(summary.id as string)) as Record<string, unknown> | null;
    }
    if (!row) await new Promise((resolve) => setTimeout(resolve, 50));
  }
  assert.ok(row, "call log row should be persisted");
  const payload = (row.pipelinePayloads ?? row.pipeline ?? {}) as {
    streamChunks?: { client?: string[] };
  };
  const client = (payload.streamChunks?.client ?? []).join("");
  assert.match(
    client,
    /chatcmpl-keepalive/,
    "persisted streamChunks.client must contain the keepalive bytes written directly to the wire"
  );
});
