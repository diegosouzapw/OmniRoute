import { describe, it } from "node:test";
import assert from "node:assert/strict";
import {
  AUDIO_TRANSCRIPTION_PROVIDERS,
  AUDIO_SPEECH_PROVIDERS,
  getTranscriptionProvider,
  getSpeechProvider,
} from "../../open-sse/config/audioRegistry.ts";
import { VIDEO_PROVIDERS, getVideoProvider } from "../../open-sse/config/videoRegistry.ts";
import {
  EMBEDDING_PROVIDERS,
  getEmbeddingProvider,
} from "../../open-sse/config/embeddingRegistry.ts";
import { REGISTRY } from "../../open-sse/config/providerRegistry.ts";

describe("nanogpt endpoint surface (#9322)", () => {
  describe("audio transcription", () => {
    it("is registered in AUDIO_TRANSCRIPTION_PROVIDERS", () => {
      assert.ok(
        AUDIO_TRANSCRIPTION_PROVIDERS.nanogpt,
        "nanogpt should be in AUDIO_TRANSCRIPTION_PROVIDERS"
      );
    });

    it("resolves nanogpt transcription config", () => {
      const p = getTranscriptionProvider("nanogpt");
      assert.ok(p, "getTranscriptionProvider should resolve nanogpt");
      assert.equal(p.id, "nanogpt");
      assert.equal(p.baseUrl, "https://nano-gpt.com/api/v1/audio/transcriptions");
      assert.equal(p.authType, "apikey");
      assert.equal(p.authHeader, "bearer");
    });

    it("has at least one transcription model", () => {
      const p = getTranscriptionProvider("nanogpt");
      assert.ok(p.models.length >= 1, "Expected >= 1 transcription model");
    });
  });

  describe("audio speech", () => {
    it("is registered in AUDIO_SPEECH_PROVIDERS", () => {
      assert.ok(
        AUDIO_SPEECH_PROVIDERS.nanogpt,
        "nanogpt should be in AUDIO_SPEECH_PROVIDERS"
      );
    });

    it("resolves nanogpt speech config", () => {
      const p = getSpeechProvider("nanogpt");
      assert.ok(p, "getSpeechProvider should resolve nanogpt");
      assert.equal(p.id, "nanogpt");
      assert.equal(p.baseUrl, "https://nano-gpt.com/api/v1/audio/speech");
      assert.equal(p.authType, "apikey");
      assert.equal(p.authHeader, "bearer");
    });

    it("has at least one speech model", () => {
      const p = getSpeechProvider("nanogpt");
      assert.ok(p.models.length >= 1, "Expected >= 1 speech model");
    });
  });

  describe("video generation", () => {
    it("is registered in VIDEO_PROVIDERS", () => {
      assert.ok(
        VIDEO_PROVIDERS.nanogpt,
        "nanogpt should be in VIDEO_PROVIDERS"
      );
    });

    it("resolves nanogpt video config", () => {
      const p = getVideoProvider("nanogpt");
      assert.ok(p, "getVideoProvider should resolve nanogpt");
      assert.equal(p.id, "nanogpt");
      assert.equal(p.baseUrl, "https://nano-gpt.com/api/v1/video/generations");
      assert.equal(p.authType, "apikey");
      assert.equal(p.authHeader, "bearer");
    });

    it("has at least one video model", () => {
      const p = getVideoProvider("nanogpt");
      assert.ok(p.models.length >= 1, "Expected >= 1 video model");
    });
  });

  describe("embeddings", () => {
    it("is registered in EMBEDDING_PROVIDERS", () => {
      assert.ok(
        EMBEDDING_PROVIDERS.nanogpt,
        "nanogpt should be in EMBEDDING_PROVIDERS"
      );
    });

    it("resolves nanogpt embedding config", () => {
      const p = getEmbeddingProvider("nanogpt");
      assert.ok(p, "getEmbeddingProvider should resolve nanogpt");
      assert.equal(p.id, "nanogpt");
      assert.equal(p.baseUrl, "https://nano-gpt.com/v1/embeddings");
      assert.equal(p.authType, "apikey");
      assert.equal(p.authHeader, "bearer");
    });

    it("has at least one embedding model", () => {
      const p = getEmbeddingProvider("nanogpt");
      assert.ok(p.models.length >= 1, "Expected >= 1 embedding model");
    });
  });

  describe("registry entry", () => {
    it("has a registry entry with the canonical identity", () => {
      const entry = REGISTRY.nanogpt;
      assert.ok(entry, "REGISTRY.nanogpt should be defined");
      assert.equal(entry.id, "nanogpt");
      assert.equal(entry.format, "openai");
      assert.equal(entry.executor, "default");
    });

    it("has responsesBaseUrl for Responses API", () => {
      const entry = REGISTRY.nanogpt;
      assert.ok(entry, "REGISTRY.nanogpt should be defined");
      assert.ok(
        entry.responsesBaseUrl,
        "nanogpt registry entry should have responsesBaseUrl"
      );
      assert.equal(
        entry.responsesBaseUrl,
        "https://nano-gpt.com/api/v1/responses"
      );
    });
  });
});
