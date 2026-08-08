import test from "node:test";
import assert from "node:assert/strict";

const { parseSpeechModel, parseTranscriptionModel, parseTranslationModel } = await import("../../open-sse/config/audioRegistry.ts");

test("parseSpeechModel resolves dynamic provider (audio-speech apiType) by prefix", () => {
  const dynamicProviders = [
    {
      id: "mytest9096",
      baseUrl: "http://localhost:9999/v1/audio/speech",
      authType: "none" as const,
      authHeader: "none" as const,
      models: [],
    },
  ];

  const result = parseSpeechModel("mytest9096/tts-1", dynamicProviders);
  assert.equal(result.provider, "mytest9096");
  assert.equal(result.model, "tts-1");
});

test("parseSpeechModel returns null for unknown dynamic provider prefix", () => {
  const dynamicProviders = [
    {
      id: "mytest9096",
      baseUrl: "http://localhost:9999/v1/audio/speech",
      authType: "none" as const,
      authHeader: "none" as const,
      models: [],
    },
  ];

  const result = parseSpeechModel("nonexistent/tts-1", dynamicProviders);
  assert.equal(result.provider, null);
});

test("parseTranscriptionModel resolves dynamic provider (audio-transcriptions apiType) by prefix", () => {
  const dynamicProviders = [
    {
      id: "mytest9096",
      baseUrl: "http://localhost:9999/v1/audio/transcriptions",
      authType: "none" as const,
      authHeader: "none" as const,
      models: [],
    },
  ];

  const result = parseTranscriptionModel("mytest9096/whisper-1", dynamicProviders);
  assert.equal(result.provider, "mytest9096");
  assert.equal(result.model, "whisper-1");
});

test("parseTranslationModel resolves dynamic provider (audio-transcriptions apiType) by prefix", () => {
  const dynamicProviders = [
    {
      id: "mytest9096",
      baseUrl: "http://localhost:9999/v1/audio/translations",
      authType: "none" as const,
      authHeader: "none" as const,
      models: [],
    },
  ];

  const result = parseTranslationModel("mytest9096/whisper-1", dynamicProviders);
  assert.equal(result.provider, "mytest9096");
  assert.equal(result.model, "whisper-1");
});