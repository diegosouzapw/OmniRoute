import test from "node:test";
import assert from "node:assert/strict";
import { getRegisteredEndpointAdapterStatuses } from "../../src/lib/providerModels/endpointAdapterAvailability.ts";

test("#16929: Gemini AI Studio transcription is tagged but has no local adapter", () => {
  const adapter = getRegisteredEndpointAdapterStatuses("gemini");
  assert.equal(adapter["audio-transcriptions"], "unavailable");
  assert.equal(adapter.music, "unavailable");
  assert.equal(getRegisteredEndpointAdapterStatuses("vertex").music, "available");
});

test("#16929: providers without registered handlers remain unknown, not falsely available", () => {
  const adapter = getRegisteredEndpointAdapterStatuses("unregistered-16929-provider");
  assert.equal(adapter["audio-transcriptions"], "unknown");
  assert.equal(adapter["audio-speech"], "unknown");
});
