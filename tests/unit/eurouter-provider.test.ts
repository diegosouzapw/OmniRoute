import assert from "node:assert/strict";
import test from "node:test";

import { eurouterProvider } from "../../open-sse/config/providers/registry/eurouter/index.ts";

const { REGISTRY } = await import("../../open-sse/config/providerRegistry.ts");
const { DefaultExecutor, getExecutor } = await import("../../open-sse/executors/index.ts");
const { PROVIDER_ENDPOINTS } = await import("../../src/shared/constants/config.ts");
const { isValidModel } = await import("../../src/shared/constants/models.ts");
const { APIKEY_PROVIDERS } = await import("../../src/shared/constants/providers/apikey/index.ts");
const { AGGREGATOR_PROVIDER_IDS } = await import("../../src/shared/constants/providers.ts");

const CHAT_URL = "https://api.eurouter.ai/v1/chat/completions";
const MODELS_URL = "https://api.eurouter.ai/v1/models";

test("eurouter is an OpenAI-compatible Bearer registry entry", () => {
  assert.equal(eurouterProvider.id, "eurouter");
  assert.equal(eurouterProvider.alias, "eurouter");
  assert.equal(eurouterProvider.format, "openai");
  assert.equal(eurouterProvider.executor, "default");
  assert.equal(eurouterProvider.authType, "apikey");
  assert.equal(eurouterProvider.authHeader, "bearer");
  assert.equal(eurouterProvider.baseUrl, CHAT_URL);
  assert.equal(eurouterProvider.modelsUrl, MODELS_URL);
  assert.equal(eurouterProvider.passthroughModels, true);
});

test("eurouter leaves its 147-model catalog to live discovery", () => {
  assert.deepEqual(eurouterProvider.models, []);
});

test("eurouter is wired through registry, metadata, endpoint and default executor", async () => {
  assert.equal(REGISTRY.eurouter?.baseUrl, CHAT_URL);
  assert.equal(PROVIDER_ENDPOINTS.eurouter, CHAT_URL);
  assert.equal(APIKEY_PROVIDERS.eurouter?.id, "eurouter");
  assert.equal(APIKEY_PROVIDERS.eurouter?.alias, "eurouter");
  assert.ok((await getExecutor("eurouter")) instanceof DefaultExecutor);
  assert.equal(isValidModel("eurouter", "future/live-catalog-model"), true);
});

test("eurouter is listed as an aggregator", () => {
  // It routes to third-party upstreams rather than serving its own inference,
  // which is what that set means -- the opposite call from GreenPT (#12986).
  assert.equal(AGGREGATOR_PROVIDER_IDS.has("eurouter"), true);
});

test("eurouter advertises no free allowance", () => {
  // A key was accepted (HTTP 402 Insufficient balance) but the account had no
  // credits, so no pricing tier was observed and none is claimed.
  assert.equal(APIKEY_PROVIDERS.eurouter?.hasFree, false);
  assert.equal(APIKEY_PROVIDERS.eurouter?.freeNote, undefined);
});

test("eurouter copy does not imply EU residency for inference", () => {
  // The name invites that reading and the catalog contradicts it: models are
  // served by upstreams such as AWS Bedrock. Being EU-based is a property of
  // the routing layer, not of where a model executes (#12985).
  const hint = String(APIKEY_PROVIDERS.eurouter?.apiHint ?? "");
  assert.ok(hint.length > 0, "an apiHint is required to carry the caveat");
  for (const claim of [
    "data residency",
    "residency",
    "stays in the EU",
    "EU-hosted",
    "sovereign",
  ]) {
    assert.ok(
      !hint.toLowerCase().includes(claim.toLowerCase()),
      `apiHint must not claim "${claim}"`
    );
  }
  assert.ok(
    hint.toLowerCase().includes("third-party upstream"),
    "apiHint must say the models are served by third-party upstreams"
  );
});

test("eurouter claims no capability that was not exercised", () => {
  // Streaming SSE conformance was not exercised -- the usual place these
  // gateways diverge, and a passthrough entry breaks there silently.
  const metadata = APIKEY_PROVIDERS.eurouter as Record<string, unknown>;
  for (const key of ["supportsTools", "supportsVision", "capabilities"]) {
    assert.equal(metadata[key], undefined, `${key} must not be declared unverified`);
  }
});
