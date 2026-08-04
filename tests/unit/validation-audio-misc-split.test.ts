// Characterization of the validation.ts audio/misc split (god-file decomposition): the audio/speech +
// miscellaneous API-key validators (deepgram, assemblyai, elevenlabs, inworld, kie, aws-polly,
// bailian, reka, maritalk, nlpcloud, runwayml, nous-research, poe) moved into
// validation/audioMiscProviders.ts. Behavior-preserving move — the lock here is module surface; the
// runtime behavior stays covered by the provider-validation-specialty / branches suites.
import { test } from "node:test";
import assert from "node:assert/strict";

const M = await import("../../src/lib/providers/validation/audioMiscProviders.ts");
const HOST = await import("../../src/lib/providers/validation.ts");

test("audioMiscProviders exposes its thirteen validators", () => {
  for (const name of [
    "validateDeepgramProvider",
    "validateAssemblyAIProvider",
    "validateElevenLabsProvider",
    "validateInworldProvider",
    "validateKieProvider",
    "validateAwsPollyProvider",
    "validateBailianCodingPlanProvider",
    "validateRekaProvider",
    "validateMaritalkProvider",
    "validateNlpCloudProvider",
    "validateRunwayProvider",
    "validateNousResearchProvider",
    "validatePoeProvider",
  ]) {
    assert.equal(typeof (M as Record<string, unknown>)[name], "function", `missing ${name}`);
  }
});

test("host dispatcher surface stays intact after the move", () => {
  assert.equal(typeof (HOST as Record<string, unknown>).validateProviderApiKey, "function");
});
