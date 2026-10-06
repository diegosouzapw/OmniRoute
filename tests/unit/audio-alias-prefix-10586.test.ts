import test from "node:test";
import assert from "node:assert/strict";

test("parseSpeechModel resolves the elevenlabs short-alias prefix advertised by /v1/models", async () => {
  const { parseSpeechModel } = await import("../../open-sse/config/audioRegistry.ts");

  const canonical = parseSpeechModel("elevenlabs/eleven_multilingual_v2");
  assert.deepEqual(canonical, { provider: "elevenlabs", model: "eleven_multilingual_v2" });

  // This is the id /v1/models actually advertises in default "dual" prefix mode
  // (REGISTRY["elevenlabs"].alias === "el"). It currently fails to parse.
  const aliased = parseSpeechModel("el/eleven_multilingual_v2");
  assert.deepEqual(
    aliased,
    { provider: "elevenlabs", model: "eleven_multilingual_v2" },
    `expected "el/eleven_multilingual_v2" to resolve to the elevenlabs provider like its canonical twin does, but got ${JSON.stringify(aliased)}`
  );
});

test("parseSpeechModel resolves every alias registered for an AUDIO_SPEECH_PROVIDERS entry", async () => {
  const { parseSpeechModel, AUDIO_SPEECH_PROVIDERS } = await import(
    "../../open-sse/config/audioRegistry.ts"
  );
  const { getProviderAlias } = await import("../../src/shared/constants/providers.ts");

  for (const providerId of Object.keys(AUDIO_SPEECH_PROVIDERS)) {
    const alias = getProviderAlias(providerId);
    if (!alias || alias === providerId) continue;
    const canonical = parseSpeechModel(`${providerId}/sample-model`);
    assert.deepEqual(canonical, { provider: providerId, model: "sample-model" });
    const aliased = parseSpeechModel(`${alias}/sample-model`);
    assert.deepEqual(
      aliased,
      { provider: providerId, model: "sample-model" },
      `expected "${alias}/sample-model" to resolve to ${providerId} but got ${JSON.stringify(aliased)}`
    );
  }
});

test("parseTranscriptionModel resolves every alias registered for an AUDIO_TRANSCRIPTION_PROVIDERS entry", async () => {
  const { parseTranscriptionModel, AUDIO_TRANSCRIPTION_PROVIDERS } = await import(
    "../../open-sse/config/audioRegistry.ts"
  );
  const { getProviderAlias } = await import("../../src/shared/constants/providers.ts");

  for (const providerId of Object.keys(AUDIO_TRANSCRIPTION_PROVIDERS)) {
    const alias = getProviderAlias(providerId);
    if (!alias || alias === providerId) continue;
    const canonical = parseTranscriptionModel(`${providerId}/sample-model`);
    assert.deepEqual(canonical, { provider: providerId, model: "sample-model" });
    const aliased = parseTranscriptionModel(`${alias}/sample-model`);
    assert.deepEqual(
      aliased,
      { provider: providerId, model: "sample-model" },
      `expected "${alias}/sample-model" to resolve to ${providerId} but got ${JSON.stringify(aliased)}`
    );
  }
});

test("parseTranslationModel resolves every alias registered for an AUDIO_TRANSLATION_PROVIDERS entry", async () => {
  const { parseTranslationModel, AUDIO_TRANSLATION_PROVIDERS } = await import(
    "../../open-sse/config/audioRegistry.ts"
  );
  const { getProviderAlias } = await import("../../src/shared/constants/providers.ts");

  for (const providerId of Object.keys(AUDIO_TRANSLATION_PROVIDERS)) {
    const alias = getProviderAlias(providerId);
    if (!alias || alias === providerId) continue;
    const canonical = parseTranslationModel(`${providerId}/sample-model`);
    assert.deepEqual(canonical, { provider: providerId, model: "sample-model" });
    const aliased = parseTranslationModel(`${alias}/sample-model`);
    assert.deepEqual(
      aliased,
      { provider: providerId, model: "sample-model" },
      `expected "${alias}/sample-model" to resolve to ${providerId} but got ${JSON.stringify(aliased)}`
    );
  }
});
