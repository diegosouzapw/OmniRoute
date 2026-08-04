// gTTS (Google Translate TTS) audio-tts provider (#6667).
//
// The originally-proposed `/translate_tts` GET endpoint is deprecated;
// this covers the current `batchexecute` RPC mechanism: chunking to the
// 100-char limit, RPC body construction, response parsing, registry lookup,
// and the handler's dispatch + error path.
import test from "node:test";
import assert from "node:assert/strict";

import {
  GOOGLE_TTS_MAX_CHARS,
  GttsUpstreamError,
  buildGttsRpcBody,
  chunkGttsText,
  normalizeGttsLang,
  parseBatchExecuteResponse,
  synthesizeGtts,
} from "../../open-sse/executors/gtts.ts";
import { getSpeechProvider, parseSpeechModel } from "../../open-sse/config/audioRegistry.ts";
import { handleAudioSpeech } from "../../open-sse/handlers/audioSpeech.ts";

// ─── chunkGttsText ──────────────────────────────────────────────────────

test("chunkGttsText returns a single chunk for short input", () => {
  assert.deepEqual(chunkGttsText("hello world"), ["hello world"]);
});

test("chunkGttsText returns [] for empty/whitespace-only input", () => {
  assert.deepEqual(chunkGttsText(""), []);
  assert.deepEqual(chunkGttsText("   "), []);
  assert.deepEqual(chunkGttsText(undefined), []);
});

test("chunkGttsText splits long input on whitespace within the 100-char limit", () => {
  const text = Array.from({ length: 20 }, (_, i) => `word${i}`).join(" "); // > 100 chars
  const chunks = chunkGttsText(text);
  assert.ok(chunks.length > 1, "must split into multiple chunks");
  for (const chunk of chunks) {
    assert.ok(chunk.length <= GOOGLE_TTS_MAX_CHARS, `chunk exceeds limit: "${chunk}"`);
  }
  // Rejoining chunks must reconstruct the original words (no character loss).
  assert.equal(chunks.join(" "), text);
});

test("chunkGttsText hard-splits a single word longer than the limit", () => {
  const longWord = "a".repeat(250);
  const chunks = chunkGttsText(longWord, 100);
  assert.equal(chunks.length, 3);
  assert.equal(chunks.join(""), longWord);
  for (const chunk of chunks) {
    assert.ok(chunk.length <= 100);
  }
});

// ─── normalizeGttsLang ──────────────────────────────────────────────────

test("normalizeGttsLang accepts simple language codes and defaults to English", () => {
  assert.equal(normalizeGttsLang("pt-BR"), "pt-BR");
  assert.equal(normalizeGttsLang("es"), "es");
  assert.equal(normalizeGttsLang(""), "en");
  assert.equal(normalizeGttsLang(undefined), "en");
  assert.equal(normalizeGttsLang("<script>alert(1)</script>"), "en");
});

// ─── buildGttsRpcBody ───────────────────────────────────────────────────

test("buildGttsRpcBody wraps text/lang under the jQ1olc RPC id, urlencoded", () => {
  const body = buildGttsRpcBody("hello", "en");
  assert.match(body, /^f\.req=/);
  assert.ok(body.endsWith("&"));

  const encoded = body.slice("f.req=".length, -1);
  const envelope = JSON.parse(decodeURIComponent(encoded));
  assert.deepEqual(envelope, [[["jQ1olc", JSON.stringify(["hello", "en", true, "null"]), null, "generic"]]]);
});

// ─── parseBatchExecuteResponse ──────────────────────────────────────────

function buildBatchExecuteFixture(base64Audio: string): string {
  const inner = JSON.stringify([base64Audio, null, null, null, null, null, []]);
  const outer = JSON.stringify([["wrb.fr", "jQ1olc", inner, null, null, null, "generic"]]);
  return `)]}'\n\n${outer.length}\n${outer}\n`;
}

test("parseBatchExecuteResponse extracts the base64 audio payload", () => {
  const raw = buildBatchExecuteFixture("aGVsbG8=");
  assert.equal(parseBatchExecuteResponse(raw), "aGVsbG8=");
});

test("parseBatchExecuteResponse throws GttsUpstreamError when no payload is found", () => {
  assert.throws(() => parseBatchExecuteResponse(")]}'\n\nnot json at all"), GttsUpstreamError);
});

// ─── synthesizeGtts (network via injectable fetch) ───────────────────────

test("synthesizeGtts concatenates decoded audio across multiple chunks", async () => {
  const text = Array.from({ length: 20 }, (_, i) => `word${i}`).join(" ");
  const expectedChunks = chunkGttsText(text);
  assert.ok(expectedChunks.length > 1);

  const calls: string[] = [];
  const fetchImpl = async (url: string, init: RequestInit) => {
    calls.push(String(init.body));
    return new Response(buildBatchExecuteFixture(Buffer.from("chunk-audio").toString("base64")), {
      status: 200,
      headers: { "content-type": "text/plain" },
    });
  };

  const audio = await synthesizeGtts({ text, lang: "en" }, fetchImpl);
  assert.equal(calls.length, expectedChunks.length);
  assert.equal(audio.toString(), "chunk-audio".repeat(expectedChunks.length));
});

test("synthesizeGtts throws GttsUpstreamError with the upstream status on a non-ok response", async () => {
  const fetchImpl = async () =>
    new Response("rate limited", { status: 429 });

  await assert.rejects(
    () => synthesizeGtts({ text: "hi", lang: "en" }, fetchImpl),
    (err: unknown) => err instanceof GttsUpstreamError && err.status === 429
  );
});

// ─── registry lookup ──────────────────────────────────────────────────

test("gtts is registered as a no-auth speech provider", () => {
  const provider = getSpeechProvider("gtts");
  assert.ok(provider);
  assert.equal(provider?.authType, "none");
  assert.equal(provider?.format, "gtts");

  const parsed = parseSpeechModel("gtts/default");
  assert.equal(parsed.provider, "gtts");
  assert.equal(parsed.model, "default");
});

// ─── handleAudioSpeech dispatch ─────────────────────────────────────────

test("handleAudioSpeech routes gtts requests without requiring credentials", async () => {
  const originalFetch = globalThis.fetch;
  globalThis.fetch = (async (_url: string, init: RequestInit) => {
    assert.match(String(init.body), /^f\.req=/);
    return new Response(buildBatchExecuteFixture(Buffer.from("hi-audio").toString("base64")), {
      status: 200,
      headers: { "content-type": "text/plain" },
    });
  }) as typeof fetch;

  try {
    const providerConfig = getSpeechProvider("gtts");
    const response = await handleAudioSpeech({
      body: { model: "gtts/default", input: "hi there", voice: "en" },
      credentials: null,
      resolvedProvider: providerConfig,
      resolvedModel: "default",
    });

    assert.equal(response.status, 200);
    assert.equal(response.headers.get("content-type"), "audio/mpeg");
    const buf = Buffer.from(await response.arrayBuffer());
    assert.equal(buf.toString(), "hi-audio");
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("handleAudioSpeech surfaces gtts upstream errors without leaking a stack trace", async () => {
  const originalFetch = globalThis.fetch;
  globalThis.fetch = (async () => new Response("blocked", { status: 429 })) as typeof fetch;

  try {
    const providerConfig = getSpeechProvider("gtts");
    const response = await handleAudioSpeech({
      body: { model: "gtts/default", input: "hi there" },
      credentials: null,
      resolvedProvider: providerConfig,
      resolvedModel: "default",
    });
    const payload = (await response.json()) as { error: { message: string } };

    assert.equal(response.status, 429);
    assert.ok(!payload.error.message.includes("at /"), "error body must not leak a stack trace");
  } finally {
    globalThis.fetch = originalFetch;
  }
});
