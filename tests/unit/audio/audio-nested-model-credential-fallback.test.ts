import test from "node:test";
import assert from "node:assert/strict";

const {
  parseTranscriptionModel,
  AUDIO_TRANSCRIPTION_PROVIDERS,
  audioModelAliasCandidates,
  findAlternateAudioProvider,
  listAlternateAudioModelIds,
  missingAudioProviderCredentialsMessage,
} = await import("../../../open-sse/config/audioRegistry.ts");

test("parseTranscriptionModel prefix-matches native Deepgram for deepgram/nova-3", () => {
  assert.deepEqual(parseTranscriptionModel("deepgram/nova-3"), {
    provider: "deepgram",
    model: "nova-3",
  });
});

test("parseTranscriptionModel keeps OpenRouter when the id is qualified", () => {
  assert.deepEqual(parseTranscriptionModel("openrouter/deepgram/nova-3"), {
    provider: "openrouter",
    model: "deepgram/nova-3",
  });
});

test("findAlternateAudioProvider maps native Deepgram nova-3 to OpenRouter", () => {
  const candidates = audioModelAliasCandidates("deepgram/nova-3", "deepgram", "nova-3");
  const alternate = findAlternateAudioProvider(
    AUDIO_TRANSCRIPTION_PROVIDERS,
    "deepgram",
    candidates
  );
  assert.ok(alternate);
  assert.equal(alternate?.provider, "openrouter");
  assert.equal(alternate?.model, "deepgram/nova-3");
});

test("findAlternateAudioProvider maps bare whisper-1 to OpenRouter when OpenAI has no creds", () => {
  // Scoped to a 2-provider registry (rather than the live, growing
  // AUDIO_TRANSCRIPTION_PROVIDERS) so this stays a deterministic test of the
  // *qualified*-alias fallback branch (`${failedProvider}/${resolvedModel}`)
  // regardless of future providers that also list a bare "whisper-1" id
  // (e.g. nanogpt) and would otherwise intercept on the first candidate.
  const scopedRegistry = {
    openai: AUDIO_TRANSCRIPTION_PROVIDERS.openai,
    openrouter: AUDIO_TRANSCRIPTION_PROVIDERS.openrouter,
  };
  const candidates = audioModelAliasCandidates("whisper-1", "openai", "whisper-1");
  const alternate = findAlternateAudioProvider(scopedRegistry, "openai", candidates);
  assert.ok(alternate);
  assert.equal(alternate?.provider, "openrouter");
  assert.equal(alternate?.model, "openai/whisper-1");
});

test("findAlternateAudioProvider returns null when no other provider lists the model", () => {
  const alternate = findAlternateAudioProvider(AUDIO_TRANSCRIPTION_PROVIDERS, "assemblyai", [
    "universal-3-pro",
    "assemblyai/universal-3-pro",
  ]);
  assert.equal(alternate, null);
});

test("missing-credential error lists qualified catalog aliases", () => {
  const candidates = audioModelAliasCandidates("deepgram/nova-3", "deepgram", "nova-3");
  const ids = listAlternateAudioModelIds(AUDIO_TRANSCRIPTION_PROVIDERS, "deepgram", candidates);
  assert.ok(ids.includes("openrouter/deepgram/nova-3"));
  assert.match(
    missingAudioProviderCredentialsMessage("deepgram", ids),
    /No credentials for provider: deepgram.*openrouter\/deepgram\/nova-3/
  );
});
