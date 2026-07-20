import test from "node:test";
import assert from "node:assert/strict";

const { handleAudioTranscription } = await import("../../open-sse/handlers/audioTranscription.ts");

function buildFile(contents, name, type) {
  return new File([Buffer.from(contents)], name, { type });
}

const OPENROUTER_TRANSCRIPTION_MODELS = [
  "deepgram/nova-3",
  "microsoft/mai-transcribe-1.5",
  "nvidia/parakeet-tdt-0.6b-v3",
  "mistralai/voxtral-mini-transcribe",
  "qwen/qwen3-asr-flash-2026-02-10",
  "google/chirp-3",
  "openai/gpt-4o-mini-transcribe",
  "openai/whisper-large-v3",
  "openai/whisper-large-v3-turbo",
  "openai/whisper-1",
  "openai/gpt-4o-transcribe",
];

test("OpenRouter transcription registry accepts every supported nested model id", async () => {
  const { parseTranscriptionModel } = await import("../../open-sse/config/audioRegistry.ts");
  for (const model of OPENROUTER_TRANSCRIPTION_MODELS) {
    assert.deepEqual(parseTranscriptionModel(`openrouter/${model}`), {
      provider: "openrouter",
      model,
    });
  }
});

test("OpenRouter transcription converts multipart audio to dedicated STT input_audio", async () => {
  const originalFetch = globalThis.fetch;
  let capturedUrl = "";
  let capturedInit;
  globalThis.fetch = async (url, init) => {
    capturedUrl = String(url);
    capturedInit = init;
    return Response.json({ text: "hello from MAI" });
  };

  try {
    const form = new FormData();
    form.set("file", buildFile([1, 2, 3], "sample.flac", "audio/flac"));
    form.set("model", "openrouter/microsoft/mai-transcribe-1.5");
    form.set("language", "pt");

    const response = await handleAudioTranscription({
      formData: form,
      credentials: { apiKey: "or-test-key" },
    });

    assert.equal(response.status, 200);
    assert.deepEqual(await response.json(), { text: "hello from MAI" });
    assert.equal(capturedUrl, "https://openrouter.ai/api/v1/audio/transcriptions");
    const headers = capturedInit?.headers as Record<string, string>;
    assert.equal(headers.Authorization, "Bearer or-test-key");
    assert.equal(headers["Content-Type"], "application/json");
    const body = JSON.parse(String(capturedInit?.body));
    assert.equal(body.model, "microsoft/mai-transcribe-1.5");
    assert.equal(body.input_audio.format, "flac");
    assert.equal(body.input_audio.data, "AQID");
    assert.equal(body.language, "pt");
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("OpenRouter transcription sends a string temperature as a JSON number", async () => {
  const originalFetch = globalThis.fetch;
  let capturedInit;
  globalThis.fetch = async (_url, init) => {
    capturedInit = init;
    return Response.json({ text: "ok" });
  };

  try {
    const form = new FormData();
    form.set("file", buildFile([1, 2, 3], "sample.flac", "audio/flac"));
    form.set("model", "openrouter/microsoft/mai-transcribe-1.5");
    form.set("temperature", "0.2");

    const response = await handleAudioTranscription({
      formData: form,
      credentials: { apiKey: "or-test-key" },
    });

    assert.equal(response.status, 200);
    const body = JSON.parse(String(capturedInit?.body));
    assert.strictEqual(body.temperature, 0.2);
    assert.strictEqual(typeof body.temperature, "number");
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("OpenRouter transcription forwards timestamp_granularities[] as a JSON array", async () => {
  const originalFetch = globalThis.fetch;
  let capturedInit;
  globalThis.fetch = async (_url, init) => {
    capturedInit = init;
    return Response.json({ text: "ok" });
  };

  try {
    const form = new FormData();
    form.set("file", buildFile([1, 2, 3], "sample.flac", "audio/flac"));
    form.set("model", "openrouter/microsoft/mai-transcribe-1.5");
    form.append("timestamp_granularities[]", "word");
    form.append("timestamp_granularities[]", "segment");

    const response = await handleAudioTranscription({
      formData: form,
      credentials: { apiKey: "or-test-key" },
    });

    assert.equal(response.status, 200);
    const body = JSON.parse(String(capturedInit?.body));
    assert.ok(Array.isArray(body.timestamp_granularities));
    assert.deepEqual(body.timestamp_granularities, ["word", "segment"]);
    // The bracketed multipart field name must not leak into the JSON payload.
    assert.equal(body["timestamp_granularities[]"], undefined);
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("OpenRouter transcription strips codec params from the MIME type when resolving format", async () => {
  const originalFetch = globalThis.fetch;
  let capturedInit;
  globalThis.fetch = async (_url, init) => {
    capturedInit = init;
    return Response.json({ text: "ok" });
  };

  try {
    const form = new FormData();
    // Browser-recorded blob: MIME carries codec params and the filename has no
    // recognisable extension, so resolution must fall through to the base MIME.
    form.set("file", buildFile([1, 2, 3], "recording", "audio/webm;codecs=opus"));
    form.set("model", "openrouter/microsoft/mai-transcribe-1.5");

    const response = await handleAudioTranscription({
      formData: form,
      credentials: { apiKey: "or-test-key" },
    });

    assert.equal(response.status, 200);
    const body = JSON.parse(String(capturedInit?.body));
    assert.equal(body.input_audio.format, "webm");
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("OpenRouter transcription routes a fully-qualified openrouter/<provider>/<model> id", async () => {
  // The SttExampleCard qualifies bare ids to `openrouter/<provider>/<model>`
  // before submitting. Confirm the handler resolves that shape to the
  // OpenRouter STT endpoint with the nested model id preserved.
  const originalFetch = globalThis.fetch;
  let capturedUrl = "";
  let capturedInit;
  globalThis.fetch = async (url, init) => {
    capturedUrl = String(url);
    capturedInit = init;
    return Response.json({ text: "routed" });
  };

  try {
    const form = new FormData();
    form.set("file", buildFile([1, 2, 3], "sample.flac", "audio/flac"));
    form.set("model", "openrouter/deepgram/nova-3");

    const response = await handleAudioTranscription({
      formData: form,
      credentials: { apiKey: "or-test-key" },
    });

    assert.equal(response.status, 200);
    assert.equal(capturedUrl, "https://openrouter.ai/api/v1/audio/transcriptions");
    const headers = capturedInit?.headers as Record<string, string>;
    assert.equal(headers["Content-Type"], "application/json");
    const body = JSON.parse(String(capturedInit?.body));
    assert.equal(body.model, "deepgram/nova-3");
  } finally {
    globalThis.fetch = originalFetch;
  }
});
