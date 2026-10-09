import test from "node:test";
import assert from "node:assert/strict";
import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

const testDataDir = mkdtempSync(join(tmpdir(), "omniroute-grok-media-"));
process.env.DATA_DIR = testDataDir;

const { IMAGE_PROVIDERS, parseImageModel } = await import("../../open-sse/config/imageRegistry.ts");
const { VIDEO_PROVIDERS, parseVideoModel } = await import("../../open-sse/config/videoRegistry.ts");
const { XAI_SUBSCRIPTION_IMAGE_PROVIDERS } =
  await import("../../open-sse/config/imageRegistryData.ts");
const {
  AUDIO_SPEECH_PROVIDERS,
  AUDIO_TRANSCRIPTION_PROVIDERS,
  parseSpeechModel,
  parseTranscriptionModel,
} = await import("../../open-sse/config/audioRegistry.ts");
const { handleImageGeneration } = await import("../../open-sse/handlers/imageGeneration.ts");
const { handleVideoGeneration } = await import("../../open-sse/handlers/videoGeneration.ts");
const { handleAudioSpeech } = await import("../../open-sse/handlers/audioSpeech.ts");
const { handleAudioTranscription } = await import("../../open-sse/handlers/audioTranscription.ts");
const { createProviderConnection, getProviderConnectionById } =
  await import("../../src/lib/db/providers.ts");
const { resetDbInstance } = await import("../../src/lib/db/core.ts");
const { closeCallLogSaves } = await import("../../src/lib/usage/callLogs.ts");

test.after(async () => {
  await closeCallLogSaves();
  resetDbInstance();
  rmSync(testDataDir, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

const credentials = {
  accessToken: "oauth-access-fixture",
  apiKey: "must-not-use-api-key",
  expiresAt: new Date(Date.now() + 86400_000).toISOString(),
};
const proxy = "https://cli-chat-proxy.grok.com/v1";
const audioBase = "https://api.x.ai/v1";

function jsonResponse(body: unknown, status = 200) {
  return Response.json(body, { status });
}

test("Grok CLI media prefixes use the existing OAuth pool and leave xai API-key routes intact", () => {
  for (const prefix of ["grok-cli", "gc"]) {
    assert.deepEqual(parseImageModel(`${prefix}/grok-imagine-image`), {
      provider: "grok-cli",
      model: "grok-imagine-image",
    });
    assert.deepEqual(parseVideoModel(`${prefix}/grok-imagine-video`), {
      provider: "grok-cli",
      model: "grok-imagine-video",
    });
    assert.deepEqual(parseSpeechModel(`${prefix}/grok-tts`), {
      provider: "grok-cli",
      model: "grok-tts",
    });
    assert.deepEqual(parseTranscriptionModel(`${prefix}/grok-voice-transcribe-2.0`), {
      provider: "grok-cli",
      model: "grok-voice-transcribe-2.0",
    });
  }
  for (const registry of [
    IMAGE_PROVIDERS,
    VIDEO_PROVIDERS,
    AUDIO_SPEECH_PROVIDERS,
    AUDIO_TRANSCRIPTION_PROVIDERS,
  ]) {
    assert.equal(registry["grok-cli"].authType, "oauth");
  }
  assert.equal(IMAGE_PROVIDERS.xai.authType, "apikey");
  assert.equal(VIDEO_PROVIDERS.xai.authType, "apikey");
  assert.equal(parseImageModel("grok-imagine-image").provider, "xai");
  assert.equal(parseVideoModel("grok-imagine-video").provider, "xai");
});

test("the optional subscription image catalog keeps the Grok Build dispatch contract", () => {
  const direct = IMAGE_PROVIDERS["grok-cli"];
  const optional = XAI_SUBSCRIPTION_IMAGE_PROVIDERS["grok-cli"];
  assert.equal(direct.format, "grok-image");
  assert.equal(optional.format, direct.format);
  assert.equal(optional.baseUrl, `${proxy}/images/generations`);
  assert.equal(optional.authType, "oauth");
  assert.ok(optional.models.some((model) => model.id === "grok-imagine-image-2.0"));
});

test("Grok OAuth images translate square size, preserve base64 output, and never send the API key", async (t) => {
  let calls = 0;
  t.mock.method(globalThis, "fetch", async (url, init) => {
    calls++;
    assert.equal(String(url), `${proxy}/images/generations`);
    const headers = new Headers(init?.headers);
    assert.equal(headers.get("authorization"), "Bearer oauth-access-fixture");
    assert.equal(headers.get("x-xai-token-auth"), "xai-grok-cli");
    assert.deepEqual(JSON.parse(String(init?.body)), {
      model: "grok-imagine-image",
      prompt: "a blue cube",
      n: 1,
      response_format: "b64_json",
      aspect_ratio: "1:1",
      resolution: "2k",
    });
    return jsonResponse({ data: [{ b64_json: "aW1hZ2U=" }] });
  });
  const result = await handleImageGeneration({
    body: {
      model: "gc/grok-imagine-image",
      prompt: "a blue cube",
      size: "2048x2048",
      response_format: "b64_json",
    },
    credentials,
    log: null,
  });
  assert.equal(result.success, true);
  assert.equal(result.data.data[0].b64_json, "aW1hZ2U=");
  assert.equal(calls, 1);
});

for (const status of [401, 403, 429, 502]) {
  test(`Grok OAuth images retain upstream ${status} without blind resubmission`, async (t) => {
    let calls = 0;
    t.mock.method(globalThis, "fetch", async () => {
      calls++;
      return jsonResponse({ error: { message: "subscription unavailable" } }, status);
    });
    const result = await handleImageGeneration({
      body: { model: "grok-cli/grok-imagine-image", prompt: "a cube" },
      credentials,
      log: null,
    });
    assert.equal(result.success, false);
    assert.equal(result.status, status);
    assert.equal(calls, 1);
  });
}

test("Grok images reject invalid options before dispatch", async (t) => {
  t.mock.method(globalThis, "fetch", async () => {
    assert.fail("must not dispatch");
  });
  for (const options of [
    { n: 0 },
    { n: 11 },
    { n: 1.5 },
    { response_format: "jpeg" },
    { size: "1792x1024" },
  ]) {
    const result = await handleImageGeneration({
      body: { model: "gc/grok-imagine-image", prompt: "a cube", ...options },
      credentials,
      log: null,
    });
    assert.equal(result.status, 400);
  }
});

test("Grok images preserve explicit native options over square-size defaults", async (t) => {
  t.mock.method(globalThis, "fetch", async (_url, init) => {
    assert.deepEqual(JSON.parse(String(init?.body)), {
      model: "grok-imagine-image",
      prompt: "a cube",
      n: 2,
      response_format: "url",
      aspect_ratio: "16:9",
      resolution: "2k",
    });
    return jsonResponse({ data: [{ url: "https://example.com/image.png" }] });
  });
  const result = await handleImageGeneration({
    body: {
      model: "gc/grok-imagine-image",
      prompt: "a cube",
      n: 2,
      size: "1024x1024",
      aspect_ratio: "16:9",
      resolution: "2k",
    },
    credentials,
    log: null,
  });
  assert.equal(result.success, true);
});

test("Grok media refuses API-key-only credentials instead of changing billing identity", async (t) => {
  t.mock.method(globalThis, "fetch", async () => {
    throw new Error("must not dispatch");
  });
  const onlyApiKey = { apiKey: "paid-api-key" };
  const image = await handleImageGeneration({
    body: { model: "gc/grok-imagine-image", prompt: "x" },
    credentials: onlyApiKey,
    log: null,
  });
  const video = await handleVideoGeneration({
    body: { model: "gc/grok-imagine-video", prompt: "x" },
    credentials: onlyApiKey,
    log: null,
  });
  const speech = await handleAudioSpeech({
    body: { model: "gc/grok-tts", input: "hello" },
    credentials: onlyApiKey,
  });
  const formData = new FormData();
  formData.set("model", "gc/grok-voice-transcribe-2.0");
  formData.set("file", new File(["audio"], "note.ogg"));
  const stt = await handleAudioTranscription({ formData, credentials: onlyApiKey });
  assert.equal(image.status, 401);
  assert.equal(video.status, 401);
  assert.equal(speech.status, 401);
  assert.equal(stt.status, 401);
});

test("Grok OAuth video submits once and polls the creating account until completion", async (t) => {
  let submissions = 0;
  let polls = 0;
  t.mock.method(globalThis, "fetch", async (url, init) => {
    assert.equal(new Headers(init?.headers).get("authorization"), "Bearer oauth-access-fixture");
    if (String(url) === `${proxy}/videos/generations`) {
      submissions++;
      assert.equal(JSON.parse(await new Response(init?.body).text()).model, "grok-imagine-video");
      return jsonResponse({ request_id: "grok-job-1" });
    }
    assert.equal(String(url), `${proxy}/videos/grok-job-1`);
    polls++;
    return polls === 1
      ? jsonResponse({ status: "pending" })
      : jsonResponse({ status: "done", video: { url: "https://vidgen.x.ai/probe.mp4" } });
  });
  const result = await handleVideoGeneration({
    body: {
      model: "gc/grok-imagine-video",
      prompt: "a rotating cube",
      duration: 2,
      poll_interval_ms: 1000,
    },
    credentials,
    log: null,
  });
  assert.equal(result.success, true);
  assert.equal(result.data.data[0].format, "mp4");
  assert.equal(submissions, 1);
  assert.equal(polls, 2);
});

test("Grok video stops on a polling auth failure without submitting another job", async (t) => {
  let submissions = 0;
  t.mock.method(globalThis, "fetch", async (_url, init) => {
    if (init?.method === "POST") {
      submissions++;
      return jsonResponse({ request_id: "grok-job-2" });
    }
    return jsonResponse({ error: { message: "expired" } }, 401);
  });
  const result = await handleVideoGeneration({
    body: {
      model: "gc/grok-imagine-video",
      prompt: "x",
      poll_interval_ms: 1000,
      timeout_ms: 10000,
    },
    credentials,
    log: null,
  });
  assert.equal(result.success, false);
  assert.equal(result.status, 401);
  assert.equal(submissions, 1);
});

test("Grok video normalizes fractional timeout options before creating abort signals", async (t) => {
  let calls = 0;
  t.mock.method(globalThis, "fetch", async (_url, init) => {
    calls++;
    assert.ok(init?.signal instanceof AbortSignal);
    return init?.method === "POST"
      ? jsonResponse({ request_id: "fractional-timeout-job" })
      : jsonResponse({ status: "done", video: { url: "https://vidgen.x.ai/probe.mp4" } });
  });
  const result = await handleVideoGeneration({
    body: {
      model: "gc/grok-imagine-video",
      prompt: "x",
      timeout_ms: 10000.75,
      poll_interval_ms: 1000.25,
    },
    credentials,
    log: null,
  });
  assert.equal(result.success, true);
  assert.equal(calls, 2);
});

test("Grok video timeout errors sanitize provider-controlled job status", async (t) => {
  let now = Date.now();
  t.mock.method(Date, "now", () => now);
  t.mock.method(globalThis, "fetch", async (_url, init) => {
    if (init?.method === "POST") return jsonResponse({ request_id: "timeout-status-job" });
    now += 1000;
    return jsonResponse({ status: "pending Authorization: Bearer sensitive-fixture-access-token" });
  });
  const result = await handleVideoGeneration({
    body: { model: "gc/grok-imagine-video", prompt: "x", poll_interval_ms: 1000, timeout_ms: 3000 },
    credentials,
    log: null,
  });
  assert.equal(result.status, 504);
  assert.ok(!result.error.includes("sensitive-fixture-access-token"));
});

test("Grok video does not poll a rejected create response even if it contains a request_id", async (t) => {
  let calls = 0;
  t.mock.method(globalThis, "fetch", async () => {
    calls++;
    return jsonResponse({ request_id: "rejected-job", error: { message: "quota exhausted" } }, 429);
  });
  const result = await handleVideoGeneration({
    body: {
      model: "gc/grok-imagine-video",
      prompt: "x",
      poll_interval_ms: 1000,
      timeout_ms: 10000,
    },
    credentials,
    log: null,
  });
  assert.equal(result.success, false);
  assert.equal(result.status, 429);
  assert.equal(calls, 1);
});

test("Grok speech maps OpenAI input to native TTS and streams the upstream bytes", async (t) => {
  t.mock.method(globalThis, "fetch", async (url, init) => {
    assert.equal(String(url), `${audioBase}/tts`);
    assert.equal(new Headers(init?.headers).get("authorization"), "Bearer oauth-access-fixture");
    assert.deepEqual(JSON.parse(String(init?.body)), {
      text: "olá",
      voice_id: "eve",
      language: "pt-BR",
      output_format: { codec: "wav" },
      speed: 0.9,
    });
    return new Response(new Uint8Array([1, 2, 3]), { headers: { "content-type": "audio/wav" } });
  });
  const response = await handleAudioSpeech({
    body: {
      model: "gc/grok-tts",
      input: "olá",
      voice: "eve",
      language: "pt-BR",
      response_format: "wav",
      speed: 0.9,
    },
    credentials,
  });
  assert.equal(response.status, 200);
  assert.equal(response.headers.get("content-type"), "audio/wav");
  assert.deepEqual(new Uint8Array(await response.arrayBuffer()), new Uint8Array([1, 2, 3]));
});

test("Grok speech rejects unsupported codecs and speeds before dispatch", async (t) => {
  t.mock.method(globalThis, "fetch", async () => {
    throw new Error("must not dispatch");
  });
  for (const options of [
    { response_format: "opus" },
    { speed: 2 },
    { speed: 0.5 },
    { speed: NaN },
    { speed: Infinity },
    { speed: "1" },
  ]) {
    const response = await handleAudioSpeech({
      body: { model: "gc/grok-tts", input: "x", ...options },
      credentials,
    });
    assert.equal(response.status, 400);
  }
});

test("Grok speech preserves native format fields and response-format precedence", async (t) => {
  t.mock.method(globalThis, "fetch", async (_url, init) => {
    assert.deepEqual(JSON.parse(String(init?.body)), {
      text: "hello",
      voice_id: "rex",
      language: "auto",
      output_format: { codec: "wav", sample_rate: 24000 },
    });
    return new Response(new Uint8Array([1]), { headers: { "content-type": "audio/wav" } });
  });
  const response = await handleAudioSpeech({
    body: {
      model: "gc/grok-tts",
      input: "hello",
      voice: "eve",
      voice_id: "rex",
      output_format: { codec: "pcm", sample_rate: 24000 },
      response_format: "wav",
    },
    credentials,
  });
  assert.equal(response.status, 200);
  await response.arrayBuffer();
});

test("Grok speech ignores array output formats and retains default codec", async (t) => {
  t.mock.method(globalThis, "fetch", async (_url, init) => {
    assert.deepEqual(JSON.parse(String(init?.body)), {
      text: "hello",
      voice_id: "eve",
      language: "auto",
      output_format: { codec: "mp3" },
    });
    return new Response(new Uint8Array([1]), { headers: { "content-type": "audio/mpeg" } });
  });
  const response = await handleAudioSpeech({
    body: { model: "gc/grok-tts", input: "hello", output_format: [] },
    credentials,
  });
  assert.equal(response.status, 200);
  await response.arrayBuffer();
});

test("Grok media refreshes one expired connection, persists rotation, and shares it across concurrent callers", async (t) => {
  const stale = {
    accessToken: "stale-media-access",
    refreshToken: "media-refresh-fixture",
    expiresAt: new Date(Date.now() - 60000).toISOString(),
  };
  const connection = await createProviderConnection({
    provider: "grok-cli",
    authType: "oauth",
    name: "Media refresh test",
    ...stale,
  });
  let refreshes = 0;
  let generations = 0;
  t.mock.method(globalThis, "fetch", async (url, init) => {
    if (String(url) === "https://auth.x.ai/oauth2/token") {
      refreshes++;
      const fields = new URLSearchParams(String(init?.body));
      assert.equal(fields.get("grant_type"), "refresh_token");
      assert.equal(fields.get("refresh_token"), "media-refresh-fixture");
      return jsonResponse({
        access_token: "fresh-media-access",
        refresh_token: "rotated-media-refresh",
        expires_in: 3600,
      });
    }
    generations++;
    assert.equal(new Headers(init?.headers).get("authorization"), "Bearer fresh-media-access");
    return new Response(new Uint8Array([1, 2]), { headers: { "content-type": "audio/mpeg" } });
  });
  const input = {
    body: { model: "gc/grok-tts", input: "hello" },
    credentials: { ...stale, connectionId: String(connection.id) },
  };
  const results = await Promise.all([handleAudioSpeech(input), handleAudioSpeech(input)]);
  for (const response of results) assert.equal(response.status, 200);
  assert.equal(refreshes, 1);
  assert.equal(generations, 2);
  const saved = await getProviderConnectionById(String(connection.id));
  assert.equal(saved.accessToken, "fresh-media-access");
  assert.equal(saved.refreshToken, "rotated-media-refresh");
  assert.ok(Date.parse(String(saved.expiresAt)) > Date.now());
});

test("An expired unrenewable Grok token does not dispatch media", async (t) => {
  t.mock.method(globalThis, "fetch", async () => {
    throw new Error("must not dispatch");
  });
  const response = await handleAudioSpeech({
    body: { model: "gc/grok-tts", input: "x" },
    credentials: {
      accessToken: "expired-access",
      expiresAt: new Date(Date.now() - 60000).toISOString(),
    },
  });
  assert.equal(response.status, 401);
});

test("Ambiguous Grok video submission failures are sanitized and are not retried", async (t) => {
  let submissions = 0;
  t.mock.method(globalThis, "fetch", async () => {
    submissions++;
    throw new Error("connection closed: Authorization: Bearer sensitive-fixture-access-token");
  });
  const result = await handleVideoGeneration({
    body: { model: "gc/grok-imagine-video", prompt: "x" },
    credentials,
    log: null,
  });
  assert.equal(result.success, false);
  assert.equal(result.status, 502);
  assert.equal(submissions, 1);
  assert.ok(!result.error.includes("sensitive-fixture-access-token"));
});

test("Grok audio errors retain upstream status without exposing bearer tokens", async (t) => {
  t.mock.method(globalThis, "fetch", async () =>
    jsonResponse(
      { error: { message: "Authorization: Bearer sensitive-fixture-access-token" } },
      429
    )
  );
  const response = await handleAudioSpeech({
    body: { model: "gc/grok-tts", input: "x" },
    credentials,
  });
  assert.equal(response.status, 429);
  assert.ok(!(await response.text()).includes("sensitive-fixture-access-token"));
});

for (const format of ["json", "verbose_json", "text"]) {
  test(`Grok STT supports ${format}, preserves UTF-8 and puts options before the file`, async (t) => {
    t.mock.method(globalThis, "fetch", async (url, init) => {
      assert.equal(String(url), `${audioBase}/stt`);
      assert.equal(new Headers(init?.headers).get("authorization"), "Bearer oauth-access-fixture");
      const multipart = await new Response(init?.body, { headers: init?.headers }).formData();
      assert.deepEqual([...multipart.keys()], ["model", "language", "diarize", "file"]);
      assert.equal(multipart.get("model"), "grok-voice-transcribe-2.0");
      assert.equal(multipart.get("language"), "pt");
      assert.equal((multipart.get("file") as File).name, "note.ogg");
      assert.equal(await (multipart.get("file") as File).text(), "audio bytes");
      return jsonResponse({
        text: "é um teste de áudio",
        duration: 1,
        words: [{ text: "é", start: 0, end: 0.2 }],
      });
    });
    const formData = new FormData();
    formData.set("file", new File(["audio bytes"], "note.opus", { type: "audio/ogg" }));
    formData.set("model", "gc/grok-voice-transcribe-2.0");
    formData.set("language", "pt");
    formData.set("diarize", "true");
    formData.set("response_format", format);
    const response = await handleAudioTranscription({ formData, credentials });
    assert.equal(response.status, 200);
    if (format === "text") assert.equal(await response.text(), "é um teste de áudio");
    else {
      const payload = await response.json();
      assert.equal(payload.text, "é um teste de áudio");
      assert.equal(payload.words[0].text, "é");
    }
  });
}
