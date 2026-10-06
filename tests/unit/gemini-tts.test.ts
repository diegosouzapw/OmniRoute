import test from "node:test";
import assert from "node:assert/strict";
import { Buffer } from "node:buffer";

const { AUDIO_SPEECH_PROVIDERS, parseSpeechModel } =
  await import("../../open-sse/config/audioRegistry.ts");
const { geminiGenerateSpeech } = await import("../../open-sse/executors/geminiTts.ts");
const { handleAudioSpeech } = await import("../../open-sse/handlers/audioSpeech.ts");

test("Google Gemini TTS models parse publicly and remap to Gemini credentials", () => {
  assert.deepEqual(parseSpeechModel("google/gemini-2.5-flash-preview-tts"), {
    provider: "google",
    model: "gemini-2.5-flash-preview-tts",
  });
  assert.equal(AUDIO_SPEECH_PROVIDERS.google.credentialProviderId, "gemini");
  assert.deepEqual(
    AUDIO_SPEECH_PROVIDERS.google.models.map(({ id }) => id),
    ["gemini-3.1-flash-tts-preview", "gemini-2.5-flash-preview-tts", "gemini-2.5-pro-preview-tts"]
  );
});

test("geminiGenerateSpeech sends the exact AI Studio generateContent contract and wraps PCM", async () => {
  const originalFetch = globalThis.fetch;
  const pcm = Buffer.from([1, 2, 3, 4]);
  let captured: { url: string; init: RequestInit } | undefined;
  globalThis.fetch = async (input, init = {}) => {
    captured = { url: String(input), init };
    return Response.json({
      candidates: [
        {
          content: {
            parts: [
              {
                inlineData: {
                  data: pcm.toString("base64"),
                  mimeType: "audio/L16;codec=pcm;rate=16000",
                },
              },
            ],
          },
        },
      ],
    });
  };
  try {
    const wav = await geminiGenerateSpeech(
      { apiKey: "gemini-key" },
      { model: "gemini-2.5-flash-preview-tts", text: "Hello", voice: "Kore" }
    );
    assert.equal(
      captured?.url,
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-tts:generateContent"
    );
    assert.equal(
      (captured?.init.headers as Record<string, string>)["Content-Type"],
      "application/json"
    );
    assert.equal(
      (captured?.init.headers as Record<string, string>)["x-goog-api-key"],
      "gemini-key"
    );
    assert.equal((captured?.init.headers as Record<string, string>).Authorization, undefined);
    assert.deepEqual(JSON.parse(String(captured?.init.body)), {
      contents: [{ parts: [{ text: "Hello" }] }],
      generationConfig: {
        responseModalities: ["AUDIO"],
        speechConfig: {
          voiceConfig: { prebuiltVoiceConfig: { voiceName: "Kore" } },
        },
      },
    });
    assert.equal(wav.subarray(0, 4).toString("ascii"), "RIFF");
    assert.equal(wav.readUInt32LE(24), 16000);
    assert.deepEqual(wav.subarray(44), pcm);
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("handleAudioSpeech returns WAV and defaults the AI Studio voice to Kore", async () => {
  const originalFetch = globalThis.fetch;
  let payload: {
    generationConfig: {
      speechConfig: { voiceConfig: { prebuiltVoiceConfig: { voiceName: string } } };
    };
  };
  globalThis.fetch = async (_input, init = {}) => {
    payload = JSON.parse(String(init.body));
    return Response.json({
      candidates: [
        {
          content: {
            parts: [
              {
                inlineData: {
                  data: Buffer.from([5, 6]).toString("base64"),
                  mimeType: "audio/L16;rate=24000",
                },
              },
            ],
          },
        },
      ],
    });
  };
  try {
    const response = await handleAudioSpeech({
      body: {
        model: "google/gemini-2.5-pro-preview-tts",
        input: "Speak",
      },
      credentials: { apiKey: "gemini-key" },
    });
    assert.equal(response.status, 200);
    assert.equal(response.headers.get("content-type"), "audio/wav");
    assert.equal(
      payload.generationConfig.speechConfig.voiceConfig.prebuiltVoiceConfig.voiceName,
      "Kore"
    );
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("handleAudioSpeech rejects an AI Studio response without audio", async () => {
  const originalFetch = globalThis.fetch;
  globalThis.fetch = async () => Response.json({ candidates: [{ content: { parts: [] } }] });
  try {
    const response = await handleAudioSpeech({
      body: {
        model: "google/gemini-2.5-flash-preview-tts",
        input: "Silent",
      },
      credentials: { apiKey: "gemini-key" },
    });
    const payload = (await response.json()) as { error: { message: string } };
    assert.equal(response.status, 500);
    assert.equal(
      payload.error.message,
      "Speech request failed: Gemini TTS response did not contain audio data"
    );
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("handleAudioSpeech preserves AI Studio upstream errors", async () => {
  const originalFetch = globalThis.fetch;
  globalThis.fetch = async () =>
    Response.json({ error: { message: "quota exhausted" } }, { status: 429 });
  try {
    const response = await handleAudioSpeech({
      body: {
        model: "google/gemini-2.5-flash-preview-tts",
        input: "Limited",
      },
      credentials: { apiKey: "gemini-key" },
    });
    const payload = (await response.json()) as { error: { message: string } };
    assert.equal(response.status, 429);
    assert.equal(payload.error.message, "quota exhausted");
  } finally {
    globalThis.fetch = originalFetch;
  }
});
