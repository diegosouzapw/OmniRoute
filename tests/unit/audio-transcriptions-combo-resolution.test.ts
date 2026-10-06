// Regression test: /v1/audio/transcriptions must resolve combo names.
//
// /v1/models advertises combos, and both /v1/chat/completions and /v1/embeddings
// resolve them — but the transcription route treated the model string as a literal
// `provider/model` id only. A combo name therefore came back as
// `400 Invalid transcription model: <combo>. Use format: provider/model`, so any
// client populating a model picker from /v1/models offered an option the endpoint
// rejected, and callers had to hardcode the provider's internal model id.
//
// This asserts the combo is expanded to its target before dispatch, and that a
// literal provider/model string still bypasses combo lookup entirely.

import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-audio-combo-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const { createCombo } = await import("../../src/lib/db/combos.ts");
const { createProviderNode } = await import("../../src/lib/db/providers.ts");
const route = await import("../../src/app/api/v1/audio/transcriptions/route.ts");

const originalFetch = globalThis.fetch;

test.after(() => {
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
  fd.set("file", makeWav(), "t.wav");
  return new Request("http://localhost/v1/audio/transcriptions", { method: "POST", body: fd });
}

test("a combo name is expanded to its target instead of being rejected", async () => {
  await createProviderNode({
    id: "openai-compatible-audio-transcriptions-test",
    type: "openai-compatible",
    name: "Local STT",
    prefix: "localstt",
    apiType: "audio-transcriptions",
    baseUrl: "http://localhost:9000/v1",
  } as Parameters<typeof createProviderNode>[0]);

  await createCombo({
    name: "transcricao",
    strategy: "priority",
    models: [{ provider: "localstt", model: "whisper-1" }],
  } as Parameters<typeof createCombo>[0]);

  const upstreamCalls: string[] = [];
  globalThis.fetch = (async (url: RequestInfo | URL) => {
    upstreamCalls.push(String(url));
    return new Response(JSON.stringify({ text: "ok" }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  }) as typeof fetch;

  const res = await route.POST(transcriptionRequest("transcricao"));
  const body = await res.text();

  assert.notEqual(
    res.status,
    400,
    `combo name must not be rejected as an invalid model — got: ${body}`
  );
  assert.ok(
    !body.includes("Invalid transcription model"),
    `combo must be resolved before model parsing — got: ${body}`
  );
  assert.ok(
    upstreamCalls.some((u) => u.includes("/audio/transcriptions")),
    `expected the combo target to be dispatched, calls: ${JSON.stringify(upstreamCalls)}`
  );
});

test("an unknown bare name is still rejected with the format hint", async () => {
  globalThis.fetch = (async () => new Response("{}", { status: 200 })) as unknown as typeof fetch;

  const res = await route.POST(transcriptionRequest("definitely-not-a-combo-or-model"));
  const body = await res.text();

  assert.equal(res.status, 400);
  assert.match(body, /Invalid transcription model/);
});
