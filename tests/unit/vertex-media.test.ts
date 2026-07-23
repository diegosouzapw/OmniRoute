import test from "node:test";
import assert from "node:assert/strict";
import { Buffer } from "node:buffer";

import {
  pcmToWav,
  vertexGenerateSpeech,
  vertexTranscribe,
  vertexGenerateMusic,
  vertexGenerateVideo,
} from "../../open-sse/executors/vertexMedia.ts";

// Service Account credential with a pre-set accessToken so resolveVertexAuth never
// performs a real OAuth token exchange (getAccessToken is skipped when accessToken is present).
function saCredentials(region = "us-central1") {
  return {
    apiKey: JSON.stringify({ project_id: "proj-test", client_email: "svc@x.iam", private_key: "x" }),
    accessToken: "test-bearer-token",
    providerSpecificData: { region },
  };
}

function expressCredentials() {
  return { apiKey: "express-key-abc", accessToken: null, providerSpecificData: {} };
}

interface FetchCall {
  url: string;
  init: any;
}

function installFetch(responders: Array<(call: FetchCall) => unknown>) {
  const calls: FetchCall[] = [];
  let i = 0;
  (globalThis as any).fetch = async (url: string, init: any) => {
    const call = { url: String(url), init };
    calls.push(call);
    const payload = responders[Math.min(i, responders.length - 1)](call);
    i += 1;
    return {
      ok: true,
      status: 200,
      json: async () => payload,
      text: async () => JSON.stringify(payload),
    };
  };
  return calls;
}

test("pcmToWav writes a valid RIFF/WAVE header with correct sizes", () => {
  const pcm = Buffer.from([1, 2, 3, 4, 5, 6, 7, 8]);
  const wav = pcmToWav(pcm, 24000);
  assert.equal(wav.subarray(0, 4).toString("ascii"), "RIFF");
  assert.equal(wav.subarray(8, 12).toString("ascii"), "WAVE");
  assert.equal(wav.readUInt32LE(4), 36 + pcm.length); // RIFF chunk size
  assert.equal(wav.readUInt32LE(24), 24000); // sample rate
  assert.equal(wav.readUInt32LE(40), pcm.length); // data chunk size
  assert.equal(wav.length, 44 + pcm.length);
});

test("vertexGenerateSpeech posts generateContent with AUDIO modality and returns WAV", async () => {
  const pcmB64 = Buffer.from([10, 20, 30, 40]).toString("base64");
  const calls = installFetch([
    () => ({
      candidates: [
        { content: { parts: [{ inlineData: { data: pcmB64, mimeType: "audio/L16;codec=pcm;rate=24000" } }] } },
      ],
    }),
  ]);

  const { audio, contentType } = await vertexGenerateSpeech(saCredentials("europe-west4"), {
    model: "gemini-2.5-flash-preview-tts",
    input: "Hello world",
    voice: "Puck",
  });

  assert.equal(contentType, "audio/wav");
  assert.equal(audio.subarray(0, 4).toString("ascii"), "RIFF");
  assert.equal(
    calls[0].url,
    "https://europe-west4-aiplatform.googleapis.com/v1/projects/proj-test/locations/europe-west4/publishers/google/models/gemini-2.5-flash-preview-tts:generateContent"
  );
  const body = JSON.parse(calls[0].init.body);
  assert.deepEqual(body.generationConfig.responseModalities, ["AUDIO"]);
  assert.equal(body.generationConfig.speechConfig.voiceConfig.prebuiltVoiceConfig.voiceName, "Puck");
  assert.equal(calls[0].init.headers.Authorization, "Bearer test-bearer-token");
});

test("vertexGenerateSpeech defaults the voice to Kore", async () => {
  const pcmB64 = Buffer.from([1, 2]).toString("base64");
  const calls = installFetch([
    () => ({ candidates: [{ content: { parts: [{ inlineData: { data: pcmB64, mimeType: "audio/L16;rate=16000" } }] } }] }),
  ]);
  await vertexGenerateSpeech(saCredentials(), { model: "gemini-2.5-flash-preview-tts", input: "hi" });
  const body = JSON.parse(calls[0].init.body);
  assert.equal(body.generationConfig.speechConfig.voiceConfig.prebuiltVoiceConfig.voiceName, "Kore");
});

test("vertexTranscribe posts audio inlineData and returns the joined text", async () => {
  const calls = installFetch([
    () => ({ candidates: [{ content: { parts: [{ text: "the quick brown fox" }] } }] }),
  ]);
  const text = await vertexTranscribe(saCredentials(), {
    model: "gemini-2.5-flash",
    audioBase64: "QUJD",
    mimeType: "audio/mpeg",
    prompt: "Transcribe please",
  });
  assert.equal(text, "the quick brown fox");
  const body = JSON.parse(calls[0].init.body);
  const parts = body.contents[0].parts;
  assert.equal(parts[0].text, "Transcribe please");
  assert.equal(parts[1].inlineData.mimeType, "audio/mpeg");
  assert.equal(parts[1].inlineData.data, "QUJD");
  assert.ok(calls[0].url.endsWith("/gemini-2.5-flash:generateContent"));
});

test("vertexGenerateMusic posts predict to lyria and returns base64 WAV", async () => {
  const calls = installFetch([() => ({ predictions: [{ bytesBase64Encoded: "TY9MUA==" }] })]);
  const { base64, format } = await vertexGenerateMusic(saCredentials(), {
    model: "lyria-002",
    prompt: "relaxing sax",
  });
  assert.equal(base64, "TY9MUA==");
  assert.equal(format, "wav");
  assert.ok(calls[0].url.endsWith("/lyria-002:predict"));
  const body = JSON.parse(calls[0].init.body);
  assert.equal(body.instances[0].prompt, "relaxing sax");
});

test("vertexGenerateVideo submits predictLongRunning then polls fetchPredictOperation", async () => {
  const calls = installFetch([
    () => ({ name: "projects/proj-test/.../operations/op-1" }), // submit
    () => ({ name: "projects/proj-test/.../operations/op-1" }), // poll #1 (not done)
    () => ({
      done: true,
      response: { videos: [{ bytesBase64Encoded: "TVA0VklERU8=" }] },
    }), // poll #2 (done)
  ]);

  const result = await vertexGenerateVideo(saCredentials(), {
    model: "veo-3.0-fast-generate-001",
    prompt: "a cat playing piano",
    aspectRatio: "16:9",
    durationSeconds: 4,
    pollIntervalMs: 1,
    maxWaitMs: 5000,
  });

  assert.equal(result.base64, "TVA0VklERU8=");
  assert.equal(result.format, "mp4");
  assert.ok(calls[0].url.endsWith("/veo-3.0-fast-generate-001:predictLongRunning"));
  assert.ok(calls[1].url.endsWith("/veo-3.0-fast-generate-001:fetchPredictOperation"));
  const submitBody = JSON.parse(calls[0].init.body);
  assert.equal(submitBody.parameters.aspectRatio, "16:9");
  assert.equal(submitBody.parameters.durationSeconds, 4);
  assert.equal(submitBody.instances[0].prompt, "a cat playing piano");
});

test("Express API key uses the project-less publisher endpoint with ?key=", async () => {
  const pcmB64 = Buffer.from([1]).toString("base64");
  const calls = installFetch([
    () => ({ candidates: [{ content: { parts: [{ inlineData: { data: pcmB64, mimeType: "audio/L16;rate=24000" } }] } }] }),
  ]);
  await vertexGenerateSpeech(expressCredentials(), { model: "gemini-2.5-flash-preview-tts", input: "hi" });
  assert.equal(
    calls[0].url,
    "https://aiplatform.googleapis.com/v1/publishers/google/models/gemini-2.5-flash-preview-tts:generateContent?key=express-key-abc"
  );
  assert.equal(calls[0].init.headers.Authorization, undefined);
});
