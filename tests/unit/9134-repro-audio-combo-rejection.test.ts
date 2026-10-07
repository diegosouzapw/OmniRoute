// Repro test for #9134 — /v1/audio/transcriptions rejects combo names.
//
// Run: node --import tsx/esm --test tests/unit/9134-repro-audio-combo-rejection.test.ts
// Expected to PASS once the fix is applied, RED before.

import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-9134-repro-"));
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

test("#9134 combo name is rejected instead of resolved", async () => {
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

  globalThis.fetch = (async () =>
    new Response(JSON.stringify({ text: "ok" }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    })) as typeof fetch;

  const res = await route.POST(transcriptionRequest("transcricao"));
  const body = await res.text();

  // The bug: the combo name "transcricao" is NOT resolved. The route returns 400
  // with "Invalid transcription model: transcricao. Use format: provider/model"
  // even though /v1/models advertises this combo and chat/embeddings resolve it.
  // Regression guard: combo names must be resolved before model parsing. This
  // was failing as `400 Invalid transcription model: transcricao` before the fix.
  assert.notEqual(
    res.status,
    400,
    `BUG #9134: combo name "transcricao" was rejected as invalid model — got status ${res.status}: ${body}`
  );
  assert.ok(
    !body.includes("Invalid transcription model"),
    `BUG #9134: combo name was not resolved — got: ${body}`
  );
});
