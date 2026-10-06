import test from "node:test";
import assert from "node:assert/strict";

import {
  AUDIO_SPEECH_PROVIDERS,
  getAllAudioModels,
  getSpeechProvider,
  parseSpeechModel,
} from "../../open-sse/config/audioRegistry.ts";
import { getRegistryMediaKinds } from "../../open-sse/config/mediaServiceKinds.ts";
import { handleAudioSpeech } from "../../open-sse/handlers/audioSpeech.ts";
import { toProviderModels } from "../../src/app/(dashboard)/dashboard/cache/media/mediaProviderModels.ts";

test("retired EdgeTTS is absent from every published speech catalog", () => {
  assert.equal(getSpeechProvider("edgetts"), null);
  assert.deepEqual(parseSpeechModel("edgetts/en-US-AriaNeural"), {
    provider: null,
    model: "edgetts/en-US-AriaNeural",
  });
  assert.equal(Object.hasOwn(AUDIO_SPEECH_PROVIDERS, "edgetts"), false);
  assert.equal(
    getAllAudioModels().some((model) => model.provider === "edgetts"),
    false
  );
  assert.deepEqual(getRegistryMediaKinds("edgetts"), []);
  assert.equal(
    toProviderModels(AUDIO_SPEECH_PROVIDERS).some((provider) => provider.id === "edgetts"),
    false
  );
});

test("speech requests no longer advertise or dispatch EdgeTTS", async () => {
  const response = await handleAudioSpeech({
    body: { model: "edgetts/en-US-AriaNeural", input: "hello" },
    credentials: null,
  });
  const payload = (await response.json()) as { error: { message: string } };

  assert.equal(response.status, 400);
  assert.match(payload.error.message, /No speech provider found/);
  const available = payload.error.message.split("Available:")[1] || "";
  assert.doesNotMatch(available, /edgetts/i);
  for (const control of ["elevenlabs", "aws-polly", "gtts"]) {
    assert.match(available, new RegExp(`\\b${control}\\b`));
  }
});

test("retiring EdgeTTS preserves the supported speech providers", () => {
  for (const control of ["gtts", "aws-polly", "elevenlabs"]) {
    assert.ok(getSpeechProvider(control), `${control} must remain registered`);
  }
});
