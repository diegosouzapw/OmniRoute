import test from "node:test";
import assert from "node:assert/strict";

const { APIKEY_PROVIDERS } = await import("../../src/shared/constants/providers.ts");
const { REGISTRY: providerRegistry } = await import("../../open-sse/config/providerRegistry.ts");

test("Nube.sh is registered as an API-key provider with the canonical identity", () => {
  const nube = APIKEY_PROVIDERS.nube;
  assert.ok(nube, "APIKEY_PROVIDERS.nube must be defined");
  assert.equal(nube.id, "nube");
  assert.equal(nube.alias, "nube");
  assert.equal(nube.name, "Nube.sh");
  assert.equal(nube.website, "https://nube.sh");
  assert.equal(typeof nube.textIcon, "string");
});

test("Nube.sh registry entry uses OpenAI format with bearer apikey auth", () => {
  const entry = providerRegistry.nube;
  assert.ok(entry, "providerRegistry.nube must be defined");
  assert.equal(entry.id, "nube");
  assert.equal(entry.format, "openai");
  assert.equal(entry.executor, "default");
  assert.equal(entry.authType, "apikey");
  assert.equal(entry.authHeader, "bearer");
  assert.equal(entry.baseUrl, "https://ai.nube.sh/api/v1/chat/completions");
});

test("Nube.sh ships no fabricated model IDs and relies on passthrough enumeration", () => {
  const entry = providerRegistry.nube;
  // The live catalog is only reachable with a valid key (401 unauthenticated), so we do
  // NOT hardcode unverifiable model IDs — models pass through and are enumerated live.
  assert.equal(entry.passthroughModels, true);
  assert.deepEqual(entry.models, []);
  assert.equal(entry.modelsUrl, "https://ai.nube.sh/api/v1/models");
});
