import test from "node:test";
import assert from "node:assert/strict";

const { handleAudioSpeech } = await import("../../open-sse/handlers/audioSpeech.ts");

test("handleAudioSpeech maps Fish S2.1 free model and validated provider options", async () => {
  const originalFetch = globalThis.fetch;
  let captured;

  globalThis.fetch = async (_url, options = {}) => {
    captured = {
      headers: options.headers,
      body: JSON.parse(String(options.body || "{}")),
    };
    return new Response(new Uint8Array([7, 8, 9]), {
      status: 200,
      headers: { "content-type": "audio/mpeg" },
    });
  };

  try {
    const response = await handleAudioSpeech({
      body: {
        model: "fishaudio/s2.1-pro-free",
        input: "Привіт",
        voice: "ref-123",
        response_format: "mp3",
        speed: 1.2,
        provider_options: {
          fishaudio: {
            temperature: 0.8,
            top_p: 0.6,
            chunk_length: 240,
            normalize: true,
            sample_rate: 44100,
            mp3_bitrate: 192,
            latency: "normal",
            max_new_tokens: 1024,
            repetition_penalty: 1.2,
            min_chunk_length: 50,
            condition_on_previous_chunks: true,
            early_stop_threshold: 0.9,
            features: ["quality-guard"],
            prosody: { volume: 3, normalize_loudness: true },
          },
        },
      },
      credentials: { apiKey: "fk" },
    });

    assert.equal(captured.headers.Authorization, "Bearer fk");
    assert.equal(captured.headers.model, "s2.1-pro-free");
    assert.deepEqual(captured.body, {
      text: "Привіт",
      format: "mp3",
      reference_id: "ref-123",
      temperature: 0.8,
      top_p: 0.6,
      chunk_length: 240,
      normalize: true,
      sample_rate: 44100,
      mp3_bitrate: 192,
      latency: "normal",
      max_new_tokens: 1024,
      repetition_penalty: 1.2,
      min_chunk_length: 50,
      condition_on_previous_chunks: true,
      early_stop_threshold: 0.9,
      features: ["quality-guard"],
      prosody: { speed: 1.2, volume: 3, normalize_loudness: true },
    });
    assert.equal(response.status, 200);
    assert.equal(response.headers.get("content-type"), "audio/mpeg");
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("handleAudioSpeech surfaces sanitized Fish Audio upstream errors (not a raw stack)", async () => {
  const originalFetch = globalThis.fetch;

  globalThis.fetch = async () =>
    new Response(JSON.stringify({ error: { message: "invalid reference_id" } }), {
      status: 400,
      headers: { "content-type": "application/json" },
    });

  try {
    const response = await handleAudioSpeech({
      body: {
        model: "fishaudio/s1",
        input: "hi",
        voice: "bad-ref",
      },
      credentials: { apiKey: "fk" },
    });
    const payload = (await response.json()) as { error: { message: string } };

    assert.equal(response.status, 400);
    assert.equal(payload.error.message, "invalid reference_id");
    assert.equal(payload.error.message.includes("at /"), false);
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("handleAudioSpeech requires credentials for Fish Audio", async () => {
  const response = await handleAudioSpeech({
    body: {
      model: "fishaudio/s1",
      input: "hi",
    },
    credentials: null,
  });
  const payload = (await response.json()) as { error: { message: string } };

  assert.equal(response.status, 401);
  assert.equal(payload.error.message, "No credentials for speech provider: fishaudio");
});


test("handleAudioSpeech rejects invalid Fish provider options before fetch", async () => {
  const originalFetch = globalThis.fetch;
  let called = false;
  globalThis.fetch = async () => {
    called = true;
    return new Response();
  };

  try {
    const response = await handleAudioSpeech({
      body: {
        model: "fishaudio/s2.1-pro-free",
        input: "hi",
        provider_options: { fishaudio: { temperature: 1.5 } },
      },
      credentials: { apiKey: "fk" },
    });
    const payload = (await response.json()) as { error: { message: string } };

    assert.equal(response.status, 400);
    assert.match(payload.error.message, /temperature must be <= 1/);
    assert.equal(called, false);
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("handleAudioSpeech explains that inline Fish references need MessagePack", async () => {
  const response = await handleAudioSpeech({
    body: {
      model: "fishaudio/s2.1-pro-free",
      input: "hi",
      provider_options: { fishaudio: { references: [{ audio: "ignored", text: "hi" }] } },
    },
    credentials: { apiKey: "fk" },
  });
  const payload = (await response.json()) as { error: { message: string } };

  assert.equal(response.status, 400);
  assert.match(payload.error.message, /Fish Audio MessagePack/);
  assert.match(payload.error.message, /persistent voice/i);
});
