import assert from "node:assert/strict";
import test from "node:test";

import { getStaticModelsForProvider } from "../../src/lib/providers/staticModels.ts";

test("speech-only static models advertise the speech operation", () => {
  const models = getStaticModelsForProvider("elevenlabs") || [];

  assert.ok(models.length > 0);
  assert.ok(models.every((model) => model.supportedEndpoints?.includes("audio-speech")));
  assert.ok(models.every((model) => !model.supportedEndpoints?.includes("audio")));
});

test("transcription-only static models advertise the transcription operation", () => {
  const models = getStaticModelsForProvider("gladia") || [];

  assert.ok(models.length > 0);
  assert.ok(models.every((model) => model.supportedEndpoints?.includes("audio-transcriptions")));
  assert.ok(models.every((model) => !model.supportedEndpoints?.includes("audio")));
});
