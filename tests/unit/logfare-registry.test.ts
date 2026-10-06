import test from "node:test";
import assert from "node:assert/strict";

import { logfareProvider } from "../../open-sse/config/providers/registry/logfare/index.ts";

const { APIKEY_PROVIDERS } = await import(
  "../../src/shared/constants/providers.ts"
);
const { REGISTRY: providerRegistry } =
  await import("../../open-sse/config/providerRegistry.ts");
const { NAMED_OPENAI_STYLE_PROVIDERS, isNamedOpenAIStyleProvider } =
  await import(
    "../../src/app/api/providers/[id]/models/discovery/providerSets.ts"
  );

const SPEC = {
  id: "logfare",
  alias: "logfare",
  name: "Logfare",
  website: "https://logfare.ai",
  chatUrl: "https://logfare.ai/v1/chat/completions",
  modelsUrl: "https://logfare.ai/v1/models",
};

test("logfareProvider registry entry has correct configuration", () => {
  assert.equal(logfareProvider.id, "logfare");
  assert.equal(logfareProvider.alias, "logfare");
  assert.equal(logfareProvider.format, "openai");
  assert.equal(logfareProvider.executor, "default");
  assert.equal(logfareProvider.baseUrl, SPEC.chatUrl);
  assert.equal(logfareProvider.modelsUrl, SPEC.modelsUrl);
  assert.equal(logfareProvider.authType, "apikey");
  assert.equal(logfareProvider.authHeader, "bearer");
  // Catalog is discovered live from /v1/models; no hardcoded seed.
  assert.equal(logfareProvider.passthroughModels, true);
  assert.equal(logfareProvider.models.length, 0);
});

test("APIKEY_PROVIDERS.logfare is registered with the canonical identity", () => {
  const entry = APIKEY_PROVIDERS[SPEC.id];
  assert.ok(entry, `APIKEY_PROVIDERS.${SPEC.id} must be defined`);
  assert.equal(entry.id, SPEC.id);
  assert.equal(entry.alias, SPEC.alias);
  assert.equal(entry.name, SPEC.name);
  assert.equal(entry.website, SPEC.website);
  assert.equal(entry.hasFree, true);
  assert.equal(typeof entry.freeNote, "string");
  assert.equal(typeof entry.apiHint, "string");
  assert.match(entry.color, /^#[0-9A-Fa-f]{6}$/);
});

test("providerRegistry exposes the OpenAI-compatible chat completions URL", () => {
  assert.equal(providerRegistry[SPEC.id].baseUrl, SPEC.chatUrl);
  assert.equal(providerRegistry[SPEC.id].modelsUrl, SPEC.modelsUrl);
});

test("logfare is classified as a named OpenAI-style provider (live-fetch path)", () => {
  assert.ok(
    NAMED_OPENAI_STYLE_PROVIDERS.has(SPEC.id),
    "logfare must be in NAMED_OPENAI_STYLE_PROVIDERS for live /v1/models fetch"
  );
  assert.equal(isNamedOpenAIStyleProvider(SPEC.id), true);
});
