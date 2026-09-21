// #13544 — successful /v1/audio/transcriptions requests are not recorded in
// call_logs (or proxy_logs), so they never appear in Dashboard -> Request Logs.
//
// open-sse/handlers/audioTranscription.ts and src/app/api/v1/audio/transcriptions/route.ts
// never import/call saveCallLog() (@/lib/usageDb), unlike every other proxied API
// surface (embeddings, images, video, rerank, search, music...). This test drives
// a real POST through the actual route (provider node resolution, enforceApiKeyPolicy,
// upstream dispatch) against a loopback OpenAI-compatible transcription provider and
// asserts a call_logs row is created — mirroring what every other successful proxied
// request produces. It also asserts the persisted row carries the provider/model/
// api_key_id identity fields, and that upstream `usage: {type:"duration", seconds}`
// is preserved on the row for future cost-pipeline consumption (Validation Plan
// steps 4 and 5).

import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omr-audio-tx-13544-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const { createProviderNode } = await import("../../src/lib/db/providers.ts");
const { getCallLogs, getCallLogById, waitForCallLogSaves } =
  await import("../../src/lib/usage/callLogs.ts");
const route = await import("../../src/app/api/v1/audio/transcriptions/route.ts");

const originalFetch = globalThis.fetch;
const CALL_LOG_SAVE_TIMEOUT_MS = 60_000;

test.after(async () => {
  globalThis.fetch = originalFetch;
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

/** Minimal but structurally valid WAV so nothing rejects the upload shape. */
function makeWav(): Blob {
  const dataLen = 1600;
  const b = Buffer.alloc(44 + dataLen);
  b.write("RIFF", 0, "ascii");
  b.writeUInt32LE(36 + dataLen, 4);
  b.write("WAVE", 8, "ascii");
  b.write("fmt ", 12, "ascii");
  b.writeUInt32LE(16, 16);
  b.writeUInt16LE(1, 20);
  b.writeUInt16LE(1, 22);
  b.writeUInt32LE(16000, 24);
  b.writeUInt32LE(32000, 28);
  b.writeUInt16LE(2, 32);
  b.writeUInt16LE(16, 34);
  b.write("data", 36, "ascii");
  b.writeUInt32LE(dataLen, 40);
  return new Blob([b], { type: "audio/wav" });
}

function transcriptionRequest(model: string) {
  const fd = new FormData();
  fd.set("model", model);
  fd.set("file", makeWav(), "test.mp3");
  fd.set("language", "es");
  return new Request("http://localhost/v1/audio/transcriptions", { method: "POST", body: fd });
}

test(
  "#13544: a successful transcription through an OpenAI-compatible provider node creates a call_logs entry",
  { timeout: 120_000 },
  async () => {
    await createProviderNode({
      id: "scw-whisper-node-13544",
      type: "openai-compatible",
      name: "Scaleway Whisper",
      prefix: "scwwhisper13544",
      apiType: "audio-transcriptions",
      baseUrl: "http://localhost:9544/v1",
    } as Parameters<typeof createProviderNode>[0]);

    const upstreamCalls: string[] = [];
    globalThis.fetch = (async (url: RequestInfo | URL) => {
      upstreamCalls.push(String(url));
      return new Response(
        JSON.stringify({
          text: " Prueba de transcripción con ScaleY",
          usage: { type: "duration", seconds: 3 },
        }),
        { status: 200, headers: { "Content-Type": "application/json" } }
      );
    }) as typeof fetch;

    const res = await route.POST(transcriptionRequest("scwwhisper13544/whisper-large-v3"));
    const body = await res.text();

    assert.equal(res.status, 200, `expected a successful transcription, got: ${body}`);
    assert.ok(
      upstreamCalls.some((u) => u.includes("/audio/transcriptions")),
      `expected the upstream provider to be dispatched, calls: ${JSON.stringify(upstreamCalls)}`
    );

    await waitForCallLogSaves(CALL_LOG_SAVE_TIMEOUT_MS);

    const logs = await getCallLogs({ provider: "scwwhisper13544", limit: 20 });
    assert.ok(
      logs.length > 0,
      "expected a call_logs row for the successful /v1/audio/transcriptions request " +
        "(none was created — the transcription path bypasses the normal call-log pipeline, #13544)"
    );

    const row = logs[0] as Record<string, unknown>;
    assert.equal(row.provider, "scwwhisper13544", "call_logs row must carry the provider");
    assert.equal(
      row.model,
      "scwwhisper13544/whisper-large-v3",
      "call_logs row must carry the resolved provider/model"
    );
    assert.equal(row.status, 200);
    assert.ok("apiKeyId" in row, "call_logs row must carry the apiKeyId field");

    const detail = await getCallLogById(row.id as string);
    const usage = (detail?.responseBody as { usage?: { type?: string; seconds?: number } } | null)
      ?.usage;
    assert.equal(
      usage?.type,
      "duration",
      `expected the upstream usage.type:"duration" to be preserved on the call_logs row, got responseBody=${JSON.stringify(
        detail?.responseBody
      )}`
    );
    assert.equal(usage?.seconds, 3, "expected the upstream usage.seconds:3 to be preserved");
  }
);

test(
  "#13544: a failed upstream transcription request also creates a call_logs entry",
  { timeout: 120_000 },
  async () => {
    await createProviderNode({
      id: "scw-whisper-node-13544-fail",
      type: "openai-compatible",
      name: "Scaleway Whisper (failing)",
      prefix: "scwwhisper13544fail",
      apiType: "audio-transcriptions",
      baseUrl: "http://localhost:9545/v1",
    } as Parameters<typeof createProviderNode>[0]);

    globalThis.fetch = (async () =>
      new Response(JSON.stringify({ error: { message: "boom" } }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      })) as typeof fetch;

    const res = await route.POST(transcriptionRequest("scwwhisper13544fail/whisper-large-v3"));
    assert.equal(res.status, 500);

    await waitForCallLogSaves(CALL_LOG_SAVE_TIMEOUT_MS);

    const logs = await getCallLogs({ provider: "scwwhisper13544fail", limit: 20 });
    assert.ok(
      logs.length > 0,
      "expected a call_logs row for the failed /v1/audio/transcriptions request too (#13544)"
    );
    assert.equal((logs[0] as Record<string, unknown>).status, 500);
  }
);
