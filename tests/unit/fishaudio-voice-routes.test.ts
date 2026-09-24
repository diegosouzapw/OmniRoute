import test from "node:test";
import assert from "node:assert/strict";

const { isFishAudioVoiceProvider, isSafeFishAudioVoiceId } = await import(
  "../../src/app/api/v1/_shared/fishAudioProxy.ts"
);

test("Fish Audio voice management only accepts the Fish provider", () => {
  assert.equal(isFishAudioVoiceProvider("fishaudio"), true);
  assert.equal(isFishAudioVoiceProvider("elevenlabs"), false);
  assert.equal(isFishAudioVoiceProvider("fishaudio/../evil"), false);
});

test("Fish Audio voice IDs reject traversal and URL-like input", () => {
  assert.equal(isSafeFishAudioVoiceId("abc_DEF-123"), true);
  assert.equal(isSafeFishAudioVoiceId("../secret"), false);
  assert.equal(isSafeFishAudioVoiceId("https://example.com"), false);
  assert.equal(isSafeFishAudioVoiceId("voice/id"), false);
});
