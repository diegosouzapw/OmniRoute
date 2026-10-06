import test from "node:test";
import assert from "node:assert/strict";

const { normalizeSpeechResponseFormat, handleAudioSpeech } = await import(
  "../../open-sse/handlers/audioSpeech.ts"
);

test("normalizeSpeechResponseFormat aliases ogg to opus (#10587)", () => {
  assert.equal(normalizeSpeechResponseFormat("ogg"), "opus");
  assert.equal(normalizeSpeechResponseFormat("OGG"), "opus");
  assert.equal(normalizeSpeechResponseFormat("opus"), "opus");
  assert.equal(normalizeSpeechResponseFormat("mp3"), "mp3");
  assert.equal(normalizeSpeechResponseFormat(undefined), "mp3");
});

test("OpenAI-compat speech path remaps ogg to opus before upstream", async () => {
  const originalFetch = globalThis.fetch;
  let captured;
  globalThis.fetch = async (_url, options = {}) => {
    captured = JSON.parse(String(options.body || "{}"));
    return new Response(new Uint8Array([1, 2, 3]), {
      status: 200,
      headers: { "content-type": "audio/opus" },
    });
  };
  try {
    const response = await handleAudioSpeech({
      body: {
        model: "openai/tts-1",
        input: "format check",
        voice: "alloy",
        response_format: "ogg",
      },
      credentials: { apiKey: "openai-key" },
    });
    assert.equal(response.status, 200);
    assert.equal(captured.response_format, "opus");
    assert.equal(captured.model, "tts-1");
  } finally {
    globalThis.fetch = originalFetch;
  }
});
