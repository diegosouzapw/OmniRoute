import test from "node:test";
import assert from "node:assert/strict";

const { handleAudioSpeech } = await import("../../open-sse/handlers/audioSpeech.ts");

test("handleAudioSpeech requires model", async () => {
  const response = await handleAudioSpeech({
    body: { input: "hello" },
    credentials: { apiKey: "x" },
  });
  const payload = (await response.json()) as any;

  assert.equal(response.status, 400);
  assert.equal(payload.error.message, "model is required");
});

test("handleAudioSpeech requires input text", async () => {
  const response = await handleAudioSpeech({
    body: { model: "openai/tts-1" },
    credentials: { apiKey: "x" },
  });
  const payload = (await response.json()) as any;

  assert.equal(response.status, 400);
  assert.equal(payload.error.message, "input is required");
});

test("handleAudioSpeech proxies OpenAI-compatible providers with defaults", async () => {
  const originalFetch = globalThis.fetch;
  let captured;

  globalThis.fetch = async (url, options = {}) => {
    captured = {
      url: String(url),
      headers: options.headers,
      body: JSON.parse(String(options.body || "{}")),
    };

    return new Response(new Uint8Array([1, 2, 3]), {
      status: 200,
      headers: { "content-type": "audio/opus" },
    });
  };

  try {
    const response = await handleAudioSpeech({
      body: {
        model: "openai/tts-1",
        input: "hello world",
      },
      credentials: { apiKey: "openai-key" },
    });

    assert.equal(captured.url, "https://api.openai.com/v1/audio/speech");
    assert.equal(captured.headers.Authorization, "Bearer openai-key");
    assert.deepEqual(captured.body, {
      model: "tts-1",
      input: "hello world",
      voice: "alloy",
      response_format: "mp3",
      speed: 1,
    });
    assert.equal(response.status, 200);
    assert.equal(response.headers.get("content-type"), "audio/opus");
    assert.ok(response.headers.get("access-control-allow-origin"));
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("handleAudioSpeech routes Deepgram with Token auth and model query parameter", async () => {
  const originalFetch = globalThis.fetch;
  let capturedUrl;
  let capturedHeaders;

  globalThis.fetch = async (url, options = {}) => {
    capturedUrl = String(url);
    capturedHeaders = options.headers;
    const body = JSON.parse(String(options.body || "{}"));
    assert.deepEqual(body, { text: "deepgram text" });

    return new Response(new Uint8Array([9, 8, 7]), {
      status: 200,
      headers: { "content-type": "audio/mpeg" },
    });
  };

  try {
    const response = await handleAudioSpeech({
      body: {
        model: "deepgram/aura-asteria-en",
        input: "deepgram text",
      },
      credentials: { apiKey: "dg-key" },
    });

    const url = new URL(capturedUrl);
    assert.equal(url.origin + url.pathname, "https://api.deepgram.com/v1/speak");
    assert.equal(url.searchParams.get("model"), "aura-asteria-en");
    assert.equal(capturedHeaders.Authorization, "Token dg-key");
    assert.equal(response.status, 200);
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("handleAudioSpeech rejects invalid ElevenLabs voice identifiers", async () => {
  const originalFetch = globalThis.fetch;
  let called = false;
  globalThis.fetch = async () => {
    called = true;
    throw new Error("should not fetch");
  };

  try {
    const response = await handleAudioSpeech({
      body: {
        model: "elevenlabs/eleven_turbo_v2_5",
        input: "bad voice",
        voice: "../secret",
      },
      credentials: { apiKey: "xi-key" },
    });
    const payload = (await response.json()) as any;

    assert.equal(response.status, 400);
    assert.equal(payload.error.message, "Invalid voice ID");
    assert.equal(called, false);
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("handleAudioSpeech maps Cartesia voice and wav output settings", async () => {
  const originalFetch = globalThis.fetch;
  let captured;

  globalThis.fetch = async (_url, options = {}) => {
    captured = {
      headers: options.headers,
      body: JSON.parse(String(options.body || "{}")),
    };
    return new Response(new Uint8Array([4, 5, 6]), {
      status: 200,
      headers: { "content-type": "audio/wav" },
    });
  };

  try {
    const response = await handleAudioSpeech({
      body: {
        model: "cartesia/sonic-2",
        input: "cartesia text",
        voice: "voice-123",
        response_format: "wav",
      },
      credentials: { apiKey: "cartesia-key" },
    });

    assert.equal(captured.headers["X-API-Key"], "cartesia-key");
    assert.equal(captured.headers["Cartesia-Version"], "2024-06-10");
    assert.deepEqual(captured.body, {
      model_id: "sonic-2",
      transcript: "cartesia text",
      voice: { mode: "id", id: "voice-123" },
      output_format: { container: "wav", sample_rate: 44100 },
    });
    assert.equal(response.headers.get("content-type"), "audio/wav");
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("handleAudioSpeech maps PlayHT credentials, output format, and speed", async () => {
  const originalFetch = globalThis.fetch;
  let captured;

  globalThis.fetch = async (_url, options = {}) => {
    captured = {
      headers: options.headers,
      body: JSON.parse(String(options.body || "{}")),
    };
    return new Response(new Uint8Array([7, 7, 7]), {
      status: 200,
      headers: { "content-type": "audio/mpeg" },
    });
  };

  try {
    const response = await handleAudioSpeech({
      body: {
        model: "playht/Play3.0-mini",
        input: "playht text",
        response_format: "aac",
        speed: 1.25,
      },
      credentials: { apiKey: "user-1:api-key-1" },
    });

    assert.equal(captured.headers["X-USER-ID"], "user-1");
    assert.equal(captured.headers.Authorization, "Bearer api-key-1");
    assert.equal(captured.body.voice_engine, "Play3.0-mini");
    assert.equal(captured.body.output_format, "aac");
    assert.equal(captured.body.speed, 1.25);
    assert.equal(response.status, 200);
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("handleAudioSpeech requires credentials for authenticated providers", async () => {
  const response = await handleAudioSpeech({
    body: {
      model: "openai/tts-1",
      input: "hello world",
    },
    credentials: null,
  });
  const payload = (await response.json()) as any;

  assert.equal(response.status, 401);
  assert.equal(payload.error.message, "No credentials for speech provider: openai");
});

test("handleAudioSpeech decodes Hyperbolic base64 audio responses", async () => {
  const originalFetch = globalThis.fetch;
  let capturedBody;

  globalThis.fetch = async (_url, options = {}) => {
    capturedBody = JSON.parse(String(options.body || "{}"));

    return new Response(JSON.stringify({ audio: "AQID" }), {
      status: 200,
      headers: { "content-type": "application/json" },
    });
  };

  try {
    const response = await handleAudioSpeech({
      body: {
        model: "hyperbolic/melo-tts",
        input: "hyperbolic text",
      },
      credentials: { apiKey: "hyper-key" },
    });

    assert.deepEqual(capturedBody, { text: "hyperbolic text" });
    assert.equal(response.status, 200);
    assert.equal(response.headers.get("content-type"), "audio/mpeg");
    assert.deepEqual(Array.from(new Uint8Array(await response.arrayBuffer())), [1, 2, 3]);
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("handleAudioSpeech routes Nvidia TTS providers with default voice", async () => {
  const originalFetch = globalThis.fetch;
  let captured;

  globalThis.fetch = async (_url, options = {}) => {
    captured = {
      headers: options.headers,
      body: JSON.parse(String(options.body || "{}")),
    };

    return new Response(new Uint8Array([3, 2, 1]), {
      status: 200,
      headers: { "content-type": "audio/wav" },
    });
  };

  try {
    const response = await handleAudioSpeech({
      body: {
        model: "nvidia/nvidia/fastpitch",
        input: "nvidia text",
      },
      credentials: { apiKey: "nvidia-key" },
    });

    assert.equal(captured.headers.Authorization, "Bearer nvidia-key");
    assert.deepEqual(captured.body, {
      input: { text: "nvidia text" },
      voice: "default",
      model: "nvidia/fastpitch",
    });
    assert.equal(response.status, 200);
    assert.equal(response.headers.get("content-type"), "audio/wav");
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("handleAudioSpeech validates HuggingFace model identifiers", async () => {
  const response = await handleAudioSpeech({
    body: {
      model: "huggingface/../escape",
      input: "bad model",
    },
    credentials: { apiKey: "hf-key" },
  });
  const payload = (await response.json()) as any;

  assert.equal(response.status, 400);
  assert.equal(payload.error.message, "Invalid model ID");
});

test("handleAudioSpeech routes HuggingFace TTS providers to model-specific endpoints", async () => {
  const originalFetch = globalThis.fetch;
  let captured;

  globalThis.fetch = async (url, options = {}) => {
    captured = {
      url: String(url),
      headers: options.headers,
      body: JSON.parse(String(options.body || "{}")),
    };

    return new Response(new Uint8Array([6, 6, 6]), {
      status: 200,
      headers: { "content-type": "audio/wav" },
    });
  };

  try {
    const response = await handleAudioSpeech({
      body: {
        model: "huggingface/facebook/mms-tts-eng",
        input: "hf text",
      },
      credentials: { apiKey: "hf-key" },
    });

    assert.equal(captured.url, "https://api-inference.huggingface.co/models/facebook/mms-tts-eng");
    assert.equal(captured.headers.Authorization, "Bearer hf-key");
    assert.deepEqual(captured.body, { inputs: "hf text" });
    assert.equal(response.status, 200);
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("handleAudioSpeech maps Inworld requests to basic auth and wav output", async () => {
  const originalFetch = globalThis.fetch;
  let captured;

  globalThis.fetch = async (_url, options = {}) => {
    captured = {
      headers: options.headers,
      body: JSON.parse(String(options.body || "{}")),
    };

    return new Response(JSON.stringify({ audioContent: "AQIDBA==" }), {
      status: 200,
      headers: { "content-type": "application/json" },
    });
  };

  try {
    const response = await handleAudioSpeech({
      body: {
        model: "inworld/inworld-tts-1.5-max",
        input: "inworld text",
        voice: "voice-9",
        response_format: "wav",
      },
      credentials: { apiKey: "encoded-basic-token" },
    });

    assert.equal(captured.headers.Authorization, "Basic encoded-basic-token");
    assert.deepEqual(captured.body, {
      text: "inworld text",
      voiceId: "voice-9",
      modelId: "inworld-tts-1.5-max",
      audioConfig: { audioEncoding: "LINEAR16" },
    });
    assert.equal(response.headers.get("content-type"), "audio/wav");
    assert.deepEqual(Array.from(new Uint8Array(await response.arrayBuffer())), [1, 2, 3, 4]);
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("handleAudioSpeech supports local Coqui providers without credentials", async () => {
  const originalFetch = globalThis.fetch;
  let captured;

  globalThis.fetch = async (_url, options = {}) => {
    captured = JSON.parse(String(options.body || "{}"));
    return new Response(new Uint8Array([1, 1, 1]), {
      status: 200,
      headers: { "content-type": "audio/wav" },
    });
  };

  try {
    const response = await handleAudioSpeech({
      body: {
        model: "coqui/tts_models/en/ljspeech/tacotron2-DDC",
        input: "coqui text",
        voice: "speaker-a",
      },
      credentials: null,
    });

    assert.deepEqual(captured, { text: "coqui text", speaker_id: "speaker-a" });
    assert.equal(response.status, 200);
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("handleAudioSpeech supports local Tortoise providers with the default voice", async () => {
  const originalFetch = globalThis.fetch;
  let captured;

  globalThis.fetch = async (_url, options = {}) => {
    captured = JSON.parse(String(options.body || "{}"));
    return new Response(new Uint8Array([2, 2, 2]), {
      status: 200,
      headers: { "content-type": "audio/wav" },
    });
  };

  try {
    const response = await handleAudioSpeech({
      body: {
        model: "tortoise/tortoise-v2",
        input: "tortoise text",
      },
      credentials: null,
    });

    assert.deepEqual(captured, { text: "tortoise text", voice: "random" });
    assert.equal(response.status, 200);
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("handleAudioSpeech surfaces parsed upstream error messages", async () => {
  const originalFetch = globalThis.fetch;

  globalThis.fetch = async () =>
    new Response(JSON.stringify({ error: { message: "quota exceeded" } }), {
      status: 429,
      headers: { "content-type": "application/json" },
    });

  try {
    const response = await handleAudioSpeech({
      body: {
        model: "openai/tts-1",
        input: "limited text",
      },
      credentials: { apiKey: "openai-key" },
    });
    const payload = (await response.json()) as any;

    assert.equal(response.status, 429);
    assert.equal(payload.error.message, "quota exceeded");
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("handleAudioSpeech returns a 500 when the provider request throws", async () => {
  const originalFetch = globalThis.fetch;

  globalThis.fetch = async () => {
    throw new Error("socket hang up");
  };

  try {
    const response = await handleAudioSpeech({
      body: {
        model: "openai/tts-1",
        input: "broken request",
      },
      credentials: { apiKey: "openai-key" },
    });
    const payload = (await response.json()) as any;

    assert.equal(response.status, 500);
    assert.equal(payload.error.message, "Speech request failed: socket hang up");
  } finally {
    globalThis.fetch = originalFetch;
  }
});
