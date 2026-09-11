// Regression test: /v1/audio/translations must resolve combo names.
//
// /v1/models advertises combos, and /v1/chat/completions, /v1/embeddings,
// /v1/audio/transcriptions (#9134), /v1/audio/speech and /v1/videos/generations
// (#10469) all resolve them — but the translation route still treated the model
// string as a literal `provider/model` id only. A combo name therefore came back as
// `400 Invalid translation model: <combo>. Use format: provider/model`, so any
// client populating a model picker from /v1/models offered an option the endpoint
// rejected, and callers had to hardcode the provider's internal model id.
//
// This asserts the combo is expanded to its target before dispatch (observed at the
// upstream fetch: URL and multipart `model`), that a literal provider/model id still
// dispatches directly, and that an unknown bare name keeps the format hint.

import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-audio-translations-combo-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const { createCombo } = await import("../../src/lib/db/combos.ts");
const { createProviderNode } = await import("../../src/lib/db/providers.ts");
const route = await import("../../src/app/api/v1/audio/translations/route.ts");

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

function translationRequest(model: string) {
  const fd = new FormData();
  fd.set("model", model);
  fd.set("file", makeWav(), "t.wav");
  return new Request("http://localhost/v1/audio/translations", { method: "POST", body: fd });
}

/** Capture every upstream call: URL plus the decoded multipart body the handler built. */
function captureUpstream(): Array<{ url: string; body: string }> {
  const calls: Array<{ url: string; body: string }> = [];
  globalThis.fetch = (async (url: RequestInfo | URL, init: RequestInit = {}) => {
    calls.push({
      url: String(url),
      body: new TextDecoder().decode(init.body as Uint8Array),
    });
    return new Response(JSON.stringify({ text: "ok" }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  }) as typeof fetch;
  return calls;
}

test.before(async () => {
  await createProviderNode({
    id: "openai-compatible-audio-translations-test",
    type: "openai-compatible",
    name: "Local STT",
    prefix: "localstt",
    apiType: "audio-transcriptions",
    baseUrl: "http://localhost:9000/v1",
  } as Parameters<typeof createProviderNode>[0]);

  await createCombo({
    name: "traducao",
    strategy: "priority",
    models: [{ provider: "localstt", model: "whisper-1" }],
  } as Parameters<typeof createCombo>[0]);
});

test("a combo name is expanded to its target instead of being rejected", async () => {
  const calls = captureUpstream();

  const res = await route.POST(translationRequest("traducao"));
  const body = await res.text();

  assert.equal(res.status, 200, `combo name must not be rejected — got: ${body}`);
  assert.deepEqual(JSON.parse(body), { text: "ok" });
  assert.equal(calls.length, 1, `expected exactly one upstream call, got ${calls.length}`);
  assert.equal(calls[0].url, "http://localhost:9000/v1/audio/translations");
  assert.match(calls[0].body, /name="model"\r\n\r\nwhisper-1\r\n/);
  assert.doesNotMatch(calls[0].body, /name="model"\r\n\r\ntraducao\r\n/);
});

test("a literal provider/model id still dispatches directly", async () => {
  const calls = captureUpstream();

  const res = await route.POST(translationRequest("localstt/whisper-1"));

  assert.equal(res.status, 200);
  assert.equal(calls.length, 1);
  assert.equal(calls[0].url, "http://localhost:9000/v1/audio/translations");
  assert.match(calls[0].body, /name="model"\r\n\r\nwhisper-1\r\n/);
});

test("an unknown bare name is still rejected with the format hint", async () => {
  const calls = captureUpstream();

  const res = await route.POST(translationRequest("definitely-not-a-combo-or-model"));
  const body = await res.text();

  assert.equal(res.status, 400);
  assert.match(body, /Invalid translation model/);
  assert.equal(calls.length, 0);
});
