import test from "node:test";
import assert from "node:assert/strict";

const { handleAudioTranslation } = await import("../../open-sse/handlers/audioTranslation.ts");

function buildFile(contents, name, type) {
  return new File([Buffer.from(contents)], name, { type });
}

test("handleAudioTranslation requires model", async () => {
  const formData = new FormData();
  formData.append("file", buildFile("abc", "audio.wav", "audio/wav"));

  const response = await handleAudioTranslation({ formData, credentials: { apiKey: "x" } });
  const payload = (await response.json()) as any;

  assert.equal(response.status, 400);
  assert.equal(payload.error.message, "model is required");
});

test("handleAudioTranslation requires a file upload", async () => {
  const formData = new FormData();
  formData.append("model", "openai/whisper-1");

  const response = await handleAudioTranslation({ formData, credentials: { apiKey: "x" } });
  const payload = (await response.json()) as any;

  assert.equal(response.status, 400);
  assert.equal(payload.error.message, "file is required");
});

test("handleAudioTranslation requires credentials for authenticated providers", async () => {
  const formData = new FormData();
  formData.append("model", "openai/whisper-1");
  formData.append("file", buildFile("abc", "clip.wav", "audio/wav"));

  const response = await handleAudioTranslation({ formData, credentials: null });
  const payload = (await response.json()) as any;

  assert.equal(response.status, 401);
  assert.equal(payload.error.message, "No credentials for translation provider: openai");
});

test("handleAudioTranslation rejects unsupported providers", async () => {
  const formData = new FormData();
  formData.append("model", "unknown/provider");
  formData.append("file", buildFile("abc", "clip.wav", "audio/wav"));

  const response = await handleAudioTranslation({
    formData,
    credentials: { apiKey: "x" },
  });
  const payload = (await response.json()) as any;

  assert.equal(response.status, 400);
  assert.match(payload.error.message, /No translation provider found for model "unknown\/provider"/);
});

test("handleAudioTranslation dispatches OpenAI-compatible multipart requests and returns { text }", async () => {
  const originalFetch = globalThis.fetch;
  let captured;

  globalThis.fetch = async (url, options = {}) => {
    captured = {
      url: String(url),
      headers: options.headers,
      body: options.body,
    };

    return new Response(JSON.stringify({ text: "hello world" }), {
      status: 200,
      headers: { "content-type": "application/json" },
    });
  };

  try {
    const formData = new FormData();
    formData.append("model", "openai/whisper-1");
    formData.append("file", buildFile("abc", "clip.webm", "audio/webm"));
    formData.append("prompt", "greeting");
    formData.append("response_format", "json");
    formData.append("temperature", "0.2");
    // Translation always outputs English — a caller-supplied `language` must
    // NOT be forwarded upstream (differs from /v1/audio/transcriptions).
    formData.append("language", "pt");

    const response = await handleAudioTranslation({
      formData,
      credentials: { apiKey: "openai-key" },
    });

    assert.equal(response.status, 200);
    assert.equal(captured.url, "https://api.openai.com/v1/audio/translations");
    assert.equal(captured.headers.Authorization, "Bearer openai-key");
    assert.match(captured.headers["Content-Type"], /^multipart\/form-data; boundary=/);

    const bodyText = new TextDecoder().decode(captured.body);
    assert.ok(bodyText.includes('name="model"'));
    assert.ok(bodyText.includes("whisper-1"));
    assert.ok(bodyText.includes('name="prompt"'));
    assert.ok(bodyText.includes("greeting"));
    assert.ok(bodyText.includes('name="response_format"'));
    assert.ok(bodyText.includes('name="temperature"'));
    assert.ok(bodyText.includes("0.2"));
    assert.ok(bodyText.includes('name="file"'));
    assert.ok(bodyText.includes('filename="clip.webm"'));
    assert.ok(!bodyText.includes('name="language"'));

    assert.deepEqual(await response.json(), { text: "hello world" });
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("handleAudioTranslation dispatches Groq-compatible multipart requests", async () => {
  const originalFetch = globalThis.fetch;
  let captured;

  globalThis.fetch = async (url, options = {}) => {
    captured = { url: String(url), headers: options.headers };
    return new Response(JSON.stringify({ text: "bonjour" }), {
      status: 200,
      headers: { "content-type": "application/json" },
    });
  };

  try {
    const formData = new FormData();
    formData.append("model", "groq/whisper-large-v3");
    formData.append("file", buildFile("abc", "clip.wav", "audio/wav"));

    const response = await handleAudioTranslation({
      formData,
      credentials: { apiKey: "groq-key" },
    });

    assert.equal(response.status, 200);
    assert.equal(captured.url, "https://api.groq.com/openai/v1/audio/translations");
    assert.equal(captured.headers.Authorization, "Bearer groq-key");
    assert.deepEqual(await response.json(), { text: "bonjour" });
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("handleAudioTranslation surfaces parsed upstream errors without leaking internals", async () => {
  const originalFetch = globalThis.fetch;

  globalThis.fetch = async () =>
    new Response(JSON.stringify({ error: { message: "too many requests" } }), {
      status: 429,
      headers: { "content-type": "application/json" },
    });

  try {
    const formData = new FormData();
    formData.append("model", "openai/whisper-1");
    formData.append("file", buildFile("abc", "clip.wav", "audio/wav"));

    const response = await handleAudioTranslation({
      formData,
      credentials: { apiKey: "openai-key" },
    });
    const payload = (await response.json()) as any;

    assert.equal(response.status, 429);
    assert.equal(payload.error.message, "too many requests");
    assert.ok(!payload.error.message.includes("at /"));
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("handleAudioTranslation sanitizes stack-trace-shaped messages on fetch failure", async () => {
  const originalFetch = globalThis.fetch;

  globalThis.fetch = async () => {
    throw new Error("Fetch failed at /home/user/project/src/secure.ts:10:5");
  };

  try {
    const formData = new FormData();
    formData.append("model", "openai/whisper-1");
    formData.append("file", buildFile("abc", "clip.wav", "audio/wav"));

    const response = await handleAudioTranslation({
      formData,
      credentials: { apiKey: "openai-key" },
    });
    const payload = (await response.json()) as any;

    assert.equal(response.status, 500);
    // Rule: error responses must never leak absolute source paths / stack traces.
    assert.ok(!payload.error.message.includes("at /"));
    assert.ok(!payload.error.message.includes("secure.ts"));
  } finally {
    globalThis.fetch = originalFetch;
  }
});
