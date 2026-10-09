import assert from "node:assert/strict";
import test from "node:test";

import {
  classifyModelSupportedEndpoints,
  MODEL_SUPPORTED_ENDPOINT_VALUES,
  normalizeModelSupportedEndpoints,
} from "../../src/shared/constants/modelSupportedEndpoints.ts";
import { providerModelMutationSchema } from "../../src/shared/validation/schemas/provider.ts";

test("normalizes legacy video and audio metadata to operation-specific endpoint ids", () => {
  assert.deepEqual(normalizeModelSupportedEndpoints(["chat", "video", "audio"]), [
    "chat",
    "videos",
    "audio-speech",
    "audio-transcriptions",
  ]);
});

test("deduplicates canonical endpoint ids while preserving order", () => {
  assert.deepEqual(
    normalizeModelSupportedEndpoints([
      "videos",
      "video",
      "audio-speech",
      "audio",
      "audio-transcriptions",
    ]),
    ["videos", "audio-speech", "audio-transcriptions"]
  );
});

test("exports operation-specific values accepted by model metadata", () => {
  assert.ok(MODEL_SUPPORTED_ENDPOINT_VALUES.includes("videos"));
  assert.ok(MODEL_SUPPORTED_ENDPOINT_VALUES.includes("audio-speech"));
  assert.ok(MODEL_SUPPORTED_ENDPOINT_VALUES.includes("audio-transcriptions"));
});

test("preserves endpoint ids introduced by external discovery", () => {
  assert.deepEqual(normalizeModelSupportedEndpoints(["responses", "video"]), [
    "responses",
    "videos",
  ]);
});

test("classifies operation-specific media endpoints for the model catalog", () => {
  assert.deepEqual(classifyModelSupportedEndpoints(["videos"]), { type: "video" });
  assert.deepEqual(classifyModelSupportedEndpoints(["audio-speech"]), {
    type: "audio",
    subtype: "speech",
  });
  assert.deepEqual(classifyModelSupportedEndpoints(["audio-transcriptions"]), {
    type: "audio",
    subtype: "transcription",
  });
  assert.deepEqual(classifyModelSupportedEndpoints(["audio-speech", "audio-transcriptions"]), {
    type: "audio",
  });
});

test("accepts the responses endpoint emitted by Codex discovery", () => {
  assert.ok(MODEL_SUPPORTED_ENDPOINT_VALUES.includes("responses"));
  assert.deepEqual(normalizeModelSupportedEndpoints(["responses"]), ["responses"]);
  // A responses-only model is a plain chat-type model: no media type override.
  assert.deepEqual(classifyModelSupportedEndpoints(["responses"]), {});

  const parsed = providerModelMutationSchema.safeParse({
    provider: "codex",
    modelId: "gpt-6-sol",
    supportedEndpoints: ["responses"],
  });
  assert.equal(parsed.success, true);
  assert.deepEqual(parsed.success && parsed.data.supportedEndpoints, ["responses"]);
});
