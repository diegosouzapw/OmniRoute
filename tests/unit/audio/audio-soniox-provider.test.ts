import test from "node:test";
import assert from "node:assert/strict";

const { handleAudioTranscription } = await import("../../../open-sse/handlers/audioTranscription.ts");
const { handleAudioSpeech } = await import("../../../open-sse/handlers/audioSpeech.ts");
const { AUDIO_TRANSCRIPTION_PROVIDERS, AUDIO_SPEECH_PROVIDERS } =
  await import("../../../open-sse/config/audioRegistry.ts");
const { validateSonioxProvider } =
  await import("../../../src/lib/providers/validation/audioMiscProviders.ts");

type FetchInit = { method?: string; headers?: Record<string, string>; body?: unknown };
type ErrorPayload = { error: { message: string } };

function buildFile(contents: string, name: string, type: string) {
  return new File([Buffer.from(contents)], name, { type });
}

function immediateTimeout(callback, _ms, ...args) {
  if (typeof callback === "function") callback(...args);
  return 0;
}

function transcriptionFormData(model = "soniox/stt-async-v5") {
  const formData = new FormData();
  formData.append("model", model);
  formData.append("file", buildFile("abc", "clip.wav", "audio/wav"));
  return formData;
}

test("Soniox is registered for transcription and speech", () => {
  const stt = AUDIO_TRANSCRIPTION_PROVIDERS.soniox;
  assert.equal(stt.id, "soniox");
  assert.equal(stt.format, "soniox");
  assert.equal(stt.async, true);
  assert.equal(stt.authHeader, "bearer");
  assert.equal(stt.baseUrl, "https://api.soniox.com/v1/transcriptions");
  assert.deepEqual(
    stt.models.map((model) => model.id),
    ["stt-async-v5", "stt-async-v4"]
  );

  const tts = AUDIO_SPEECH_PROVIDERS.soniox;
  assert.equal(tts.id, "soniox");
  assert.equal(tts.format, "soniox-tts");
  assert.equal(tts.baseUrl, "https://tts-rt.soniox.com/tts");
  assert.deepEqual(
    tts.models.map((model) => model.id),
    ["tts-rt-v1"]
  );
});

test("handleAudioTranscription uploads, creates, polls and reads the Soniox transcript", async () => {
  const originalFetch = globalThis.fetch;
  const originalSetTimeout = globalThis.setTimeout;
  const calls: { url: string; method: string }[] = [];
  let uploadBody = "";

  globalThis.setTimeout = immediateTimeout;
  globalThis.fetch = async (url, options: FetchInit = {}) => {
    const stringUrl = String(url);
    calls.push({ url: stringUrl, method: options?.method || "GET" });

    if (stringUrl === "https://api.soniox.com/v1/files") {
      assert.ok(options.body instanceof Uint8Array);
      assert.match(options.headers["Content-Type"], /^multipart\/form-data; boundary=/);
      assert.equal(options.headers.Authorization, "Bearer soniox-key");
      uploadBody = new TextDecoder().decode(options.body);
      return Response.json({ id: "file-1" });
    }

    if (stringUrl === "https://api.soniox.com/v1/transcriptions") {
      assert.deepEqual(JSON.parse(String(options.body || "{}")), {
        model: "stt-async-v5",
        file_id: "file-1",
        enable_language_identification: true,
      });
      return Response.json({ id: "job-1", status: "queued" });
    }

    if (stringUrl === "https://api.soniox.com/v1/transcriptions/job-1") {
      return Response.json({ status: "completed" });
    }

    if (stringUrl === "https://api.soniox.com/v1/transcriptions/job-1/transcript") {
      return Response.json({ text: "soniox result" });
    }

    throw new Error(`Unexpected URL: ${stringUrl}`);
  };

  try {
    const response = await handleAudioTranscription({
      formData: transcriptionFormData(),
      credentials: { apiKey: "soniox-key" },
    });

    assert.equal(response.status, 200);
    assert.deepEqual(await response.json(), { text: "soniox result" });
    assert.ok(uploadBody.includes('name="file"; filename="clip.wav"'));
    assert.deepEqual(
      calls.map((entry) => entry.url),
      [
        "https://api.soniox.com/v1/files",
        "https://api.soniox.com/v1/transcriptions",
        "https://api.soniox.com/v1/transcriptions/job-1",
        "https://api.soniox.com/v1/transcriptions/job-1/transcript",
      ]
    );
  } finally {
    globalThis.fetch = originalFetch;
    globalThis.setTimeout = originalSetTimeout;
  }
});

test("handleAudioTranscription joins Soniox tokens when the transcript has no text field", async () => {
  const originalFetch = globalThis.fetch;
  const originalSetTimeout = globalThis.setTimeout;

  globalThis.setTimeout = immediateTimeout;
  globalThis.fetch = async (url) => {
    const stringUrl = String(url);
    if (stringUrl === "https://api.soniox.com/v1/files") return Response.json({ id: "file-1" });
    if (stringUrl === "https://api.soniox.com/v1/transcriptions")
      return Response.json({ id: "job-1" });
    if (stringUrl === "https://api.soniox.com/v1/transcriptions/job-1")
      return Response.json({ status: "completed" });
    return Response.json({ tokens: [{ text: "one " }, { text: "two" }] });
  };

  try {
    const response = await handleAudioTranscription({
      formData: transcriptionFormData(),
      credentials: { apiKey: "soniox-key" },
    });

    assert.deepEqual(await response.json(), { text: "one two" });
  } finally {
    globalThis.fetch = originalFetch;
    globalThis.setTimeout = originalSetTimeout;
  }
});

test("handleAudioTranscription surfaces a failed Soniox upload without leaking internals", async () => {
  const originalFetch = globalThis.fetch;

  globalThis.fetch = async () =>
    new Response(JSON.stringify({ error: { message: "invalid api key" } }), {
      status: 401,
      headers: { "content-type": "application/json" },
    });

  try {
    const response = await handleAudioTranscription({
      formData: transcriptionFormData(),
      credentials: { apiKey: "soniox-key" },
    });
    const payload = (await response.json()) as ErrorPayload;

    assert.equal(response.status, 401);
    assert.equal(payload.error.message, "invalid api key");
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("handleAudioTranscription reports a Soniox job that ends in error", async () => {
  const originalFetch = globalThis.fetch;
  const originalSetTimeout = globalThis.setTimeout;

  globalThis.setTimeout = immediateTimeout;
  globalThis.fetch = async (url) => {
    const stringUrl = String(url);
    if (stringUrl === "https://api.soniox.com/v1/files") return Response.json({ id: "file-1" });
    if (stringUrl === "https://api.soniox.com/v1/transcriptions")
      return Response.json({ id: "job-1" });
    return Response.json({ status: "error", error_message: "unsupported audio" });
  };

  try {
    const response = await handleAudioTranscription({
      formData: transcriptionFormData(),
      credentials: { apiKey: "soniox-key" },
    });
    const payload = (await response.json()) as ErrorPayload;

    assert.equal(response.status, 500);
    assert.equal(payload.error.message, "unsupported audio");
  } finally {
    globalThis.fetch = originalFetch;
    globalThis.setTimeout = originalSetTimeout;
  }
});

test("handleAudioSpeech maps the OpenAI speech body to Soniox and passes audio through", async () => {
  const originalFetch = globalThis.fetch;
  let captured: { url: string; headers: Record<string, string>; body: Record<string, unknown> };

  globalThis.fetch = async (url, options: FetchInit = {}) => {
    captured = {
      url: String(url),
      headers: options.headers,
      body: JSON.parse(String(options.body || "{}")),
    };
    return new Response(new Uint8Array([1, 2, 3]), { status: 200 });
  };

  try {
    const response = await handleAudioSpeech({
      body: {
        model: "soniox/tts-rt-v1",
        input: "hello",
        voice: "alloy",
        response_format: "wav",
      },
      credentials: { apiKey: "soniox-key" },
    });

    assert.equal(captured.url, "https://tts-rt.soniox.com/tts");
    assert.equal(captured.headers.Authorization, "Bearer soniox-key");
    assert.equal(captured.body.model, "tts-rt-v1");
    assert.equal(captured.body.text, "hello");
    assert.equal(captured.body.voice, "alloy");
    assert.equal(captured.body.audio_format, "wav");
    assert.equal(response.status, 200);
    assert.equal(response.headers.get("content-type"), "audio/wav");
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("handleAudioSpeech surfaces sanitized Soniox upstream errors", async () => {
  const originalFetch = globalThis.fetch;

  globalThis.fetch = async () =>
    new Response(JSON.stringify({ error: { message: "unknown voice" } }), {
      status: 400,
      headers: { "content-type": "application/json" },
    });

  try {
    const response = await handleAudioSpeech({
      body: { model: "soniox/tts-rt-v1", input: "hello" },
      credentials: { apiKey: "soniox-key" },
    });
    const payload = (await response.json()) as ErrorPayload;

    assert.equal(response.status, 400);
    assert.equal(payload.error.message, "unknown voice");
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("validateSonioxProvider accepts a working key and rejects an unauthorized one", async () => {
  const originalFetch = globalThis.fetch;
  let capturedUrl = "";
  let capturedHeaders: Record<string, string> = {};
  let status = 200;

  globalThis.fetch = async (url, options: FetchInit = {}) => {
    capturedUrl = String(url);
    capturedHeaders = options.headers;
    return new Response("{}", { status, headers: { "content-type": "application/json" } });
  };

  try {
    assert.deepEqual(await validateSonioxProvider({ apiKey: "soniox-key" }), {
      valid: true,
      error: null,
    });
    assert.equal(capturedUrl, "https://api.soniox.com/v1/transcriptions");
    assert.equal(capturedHeaders.Authorization, "Bearer soniox-key");

    status = 401;
    assert.deepEqual(await validateSonioxProvider({ apiKey: "bad" }), {
      valid: false,
      error: "Invalid API key",
    });
  } finally {
    globalThis.fetch = originalFetch;
  }
});
