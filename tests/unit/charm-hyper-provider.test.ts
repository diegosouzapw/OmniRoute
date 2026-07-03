import test from "node:test";
import assert from "node:assert/strict";

const { APIKEY_PROVIDERS } = await import("../../src/shared/constants/providers.ts");
const { REGISTRY: providerRegistry } = await import("../../open-sse/config/providerRegistry.ts");

const CHARM_HYPER_CHAT_URL = "https://hyper.charm.land/v1/chat/completions";
const CHARM_HYPER_MODELS_URL = "https://hyper.charm.land/v1/models";

test("Charm Hyper is registered as a free API-key provider", () => {
  const entry = APIKEY_PROVIDERS["charm-hyper"];
  assert.ok(entry, "APIKEY_PROVIDERS['charm-hyper'] must be defined");
  assert.equal(entry.id, "charm-hyper");
  assert.equal(entry.alias, "charm-hyper");
  assert.equal(entry.name, "Charm Hyper");
  assert.equal(entry.website, "https://hyper.charm.land");
  assert.equal(entry.hasFree, true);
  assert.equal(entry.passthroughModels, true);
});

test("Charm Hyper registry entry uses OpenAI format with bearer API-key auth", () => {
  const entry = providerRegistry["charm-hyper"];
  assert.ok(entry, "providerRegistry['charm-hyper'] must be defined");
  assert.equal(entry.id, "charm-hyper");
  assert.equal(entry.alias, "charm-hyper");
  assert.equal(entry.format, "openai");
  assert.equal(entry.executor, "default");
  assert.equal(entry.authType, "apikey");
  assert.equal(entry.authHeader, "bearer");
  assert.equal(entry.baseUrl, CHARM_HYPER_CHAT_URL);
  assert.equal(entry.modelsUrl, CHARM_HYPER_MODELS_URL);
  assert.equal(entry.passthroughModels, true);
});
