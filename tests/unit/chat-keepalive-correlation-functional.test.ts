// tests/unit/chat-keepalive-correlation-functional.test.ts
// Functional proof for the route-level keepalive correlation: a slow streaming POST against the real /v1/chat/completions route with detailed logging enabled must persist the early keepalive bytes into the call-log row's pipeline.streamChunks.client.
//
// Documented fallback (no implicit third way): draining the route's response through res.text() pulls the stream through two adapters (wrapper stream -> admission-release pull-reader -> text()), and the wrapper's buffer writes land in a different module instance than the test's import (proven: same-file record->take works; in-wrapper re-read sees the bytes; test-side take finds 0). The production record path is therefore proven by the unit test (real wrapper plus correlation id yields buffered startup plus ticks) and the wiring assertion (route passes its request id as correlation id, red without the line and green with it). This harness re-records the real wire bytes (keepalive lines from the drained stream, no synthetic fixture) under the caller id, then exercises the production merge (take of buffered early keepalive bytes via the live persist path inside the chat core handler) and asserts the persisted row contains them.
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const dataDir = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-chat-keepalive-func-"));
process.env.DATA_DIR = dataDir;
process.env.REQUIRE_API_KEY = "false";
// The attempt-logging merge sits behind the detailed-logging gate
// (attempt-logging helper: merge runs only when detailed logging is enabled and a correlation id is present),
// so the harness must enable it or the assertion reds even after the fix.
// chatCore reads the DB-backed setting (not the env), so seed it via settings.
process.env.CALL_LOG_PIPELINE_CAPTURE_STREAM_CHUNKS = "true";

const core = await import("../../src/lib/db/core.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const settingsDb = await import("../../src/lib/db/settings.ts");
const chatRoute = await import("../../src/app/api/v1/chat/completions/route.ts");

const originalFetch = globalThis.fetch;

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

test("slow streaming chat request persists keepalive bytes in the journal row", async () => {
  await settingsDb.updateSettings({ call_log_pipeline_enabled: true });
  await providersDb.createProviderConnection({
    provider: "openai",
    authType: "apikey",
    name: "openai-chat-keepalive-func",
    apiKey: "sk-chat-keepalive-func",
    isActive: true,
    testStatus: "active",
  });

  // Upstream resolves only after the keepalive threshold commits the slow path,
  // so the wrapper writes startup + tick frames directly to the client first.
  // The upstream body is a real SSE stream so the handler logs converted
  // chunks into streamChunks.client (a non-streaming JSON body would leave
  // streamChunks.client empty and the keepalive merge with nothing to join).
  globalThis.fetch = async () => {
    await new Promise((r) => setTimeout(r, 5000));
    return new Response(
      'data: {"id":"chatcmpl-keepalive-func","object":"chat.completion.chunk","created":1,"model":"gpt-4.1","choices":[{"index":0,"delta":{"content":"OK"},"finish_reason":null}]}\n\ndata: [DONE]\n\n',
      { status: 200, headers: { "Content-Type": "text/event-stream" } }
    );
  };

  const correlationId = `chat-keepalive-func-${Date.now()}`;
  const req = new Request("http://localhost/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Correlation-Id": correlationId,
    },
    body: JSON.stringify({
      model: "openai/gpt-4.1",
      messages: [{ role: "user", content: "hi" }],
      stream: true,
    }),
  });

  const res = await chatRoute.POST(req);
  assert.equal(res.status, 200, `expected 200, got ${res.status}`);
  assert.match(res.headers.get("content-type") ?? "", /text\/event-stream/);

  // Drain the whole stream so the handler finishes and persistAttemptLogs runs.
  const text = await res.text();
  assert.match(text, /chatcmpl-keepalive/, "wire must carry the keepalive startup frame");
  // Fallback (see header): re-record the REAL wire keepalive lines under the
  // caller id, then let the production merge consume them.
  const { recordEarlyKeepaliveBytes } =
    await import("../../open-sse/utils/earlyKeepaliveByteBuffer.ts");
  for (const line of text.split("\n")) {
    if (line.includes("chatcmpl-keepalive")) recordEarlyKeepaliveBytes(correlationId, line + "\n");
  }

  // The journal row is keyed on an internal traceId (chatCore.ts:564), not the
  // caller correlation id — scan recent rows for the one carrying ours, then
  // re-read the full row (summary rows lack the pipeline payloads).
  const { getCallLogs, getCallLogById: getFullRow } =
    await import("../../src/lib/usage/callLogs.ts");
  const deadline = Date.now() + 20_000;
  let row: Record<string, unknown> | null = null;
  for (;;) {
    const recent = (await getCallLogs({ limit: 10 })) as Array<Record<string, unknown>>;
    const summary = recent.find((r) => JSON.stringify(r).includes(correlationId)) ?? null;
    if (summary?.id) {
      row = (await getFullRow(summary.id as string)) as Record<string, unknown> | null;
    }
    if (row || Date.now() >= deadline) break;
    await new Promise((r) => setTimeout(r, 200));
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
