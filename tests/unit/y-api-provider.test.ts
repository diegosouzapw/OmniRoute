import assert from "node:assert/strict";
import test from "node:test";

import { yApiProvider } from "../../open-sse/config/providers/registry/y-api/index.ts";

const { REGISTRY } = await import("../../open-sse/config/providerRegistry.ts");
const { DefaultExecutor, getExecutor } = await import("../../open-sse/executors/index.ts");
const { PROVIDER_ENDPOINTS } = await import("../../src/shared/constants/config.ts");
const { isValidModel } = await import("../../src/shared/constants/models.ts");
const { APIKEY_PROVIDERS } = await import("../../src/shared/constants/providers/apikey/index.ts");
const { AGGREGATOR_PROVIDER_IDS } = await import("../../src/shared/constants/providers.ts");

const CHAT_URL = "https://api.y-api.bestvirtualgoods.com/v1/chat/completions";
const MODELS_URL = "https://api.y-api.bestvirtualgoods.com/v1/models";

test("y-api is an OpenAI-compatible Bearer registry entry", () => {
  assert.equal(yApiProvider.id, "y-api");
  assert.equal(yApiProvider.alias, "y-api");
  assert.equal(yApiProvider.format, "openai");
  assert.equal(yApiProvider.executor, "default");
  assert.equal(yApiProvider.authType, "apikey");
  assert.equal(yApiProvider.authHeader, "bearer");
  assert.equal(yApiProvider.baseUrl, CHAT_URL);
  assert.equal(yApiProvider.modelsUrl, MODELS_URL);
  assert.equal(yApiProvider.passthroughModels, true);
});

test("y-api leaves model discovery to the live upstream catalog", () => {
  // GET /v1/models answers 401 without a key, so the catalog can only be read
  // with the user's own credential. Nothing was seeded from the vendor's
  // build-time models.json: an empty list plus passthroughModels is the honest
  // shape, and a stale hardcoded list is the failure mode this avoids.
  assert.deepEqual(yApiProvider.models, []);
});

test("y-api is wired through registry, metadata, endpoint and default executor", async () => {
  assert.equal(REGISTRY["y-api"]?.baseUrl, CHAT_URL);
  assert.equal(PROVIDER_ENDPOINTS["y-api"], CHAT_URL);
  assert.equal(APIKEY_PROVIDERS["y-api"]?.id, "y-api");
  assert.equal(APIKEY_PROVIDERS["y-api"]?.alias, "y-api");
  assert.ok((await getExecutor("y-api")) instanceof DefaultExecutor);
});

test("y-api accepts any model name the upstream catalog returns", () => {
  // passthroughModels drives PASSTHROUGH_PROVIDERS, which is what isValidModel
  // consults -- vendor-prefixed ids like `deepseek/deepseek-v4-flash` are the
  // shape the catalog returns, and the slash must not be read as a namespace.
  assert.equal(isValidModel("y-api", "deepseek/deepseek-v4-flash"), true);
});

test("y-api is listed as an aggregator", () => {
  // Its own machine-readable catalog defines `vendor` as "who trained the model,
  // not who serves it" and states every model is served by the gateway: a router
  // over third-party upstreams behind one key, like EURouter (#13025) and unlike
  // GreenPT (#13024), which serves its own inference.
  assert.equal(AGGREGATOR_PROVIDER_IDS.has("y-api"), true);
});

test("y-api free badge states only what the publisher prices", () => {
  const note = String(APIKEY_PROVIDERS["y-api"]?.freeNote ?? "");
  assert.ok(note.length > 0, "a freeNote is required to carry the badge");
  assert.ok(note.includes("0 credit"), "the badge rests on models priced at zero");
  assert.ok(/\d{4}-\d{2}-\d{2}/.test(note), "the free set is a dated snapshot, not a tier");
  assert.ok(
    note.includes("https://y-api.bestvirtualgoods.com/pricing.json"),
    "the note points at the file a reader can re-check"
  );
  // The operator withdraws free models without notice, so nothing may read as
  // permanent, and the credit-to-cash conversion is promotional: a USD number
  // written here would be wrong within days.
  for (const claim of ["always", "permanent", "unlimited", "no card"]) {
    assert.ok(!note.toLowerCase().includes(claim), `freeNote must not imply "${claim}"`);
  }
  assert.ok(!/\$\s?\d/.test(note), "freeNote must not quote a cash price");
});

test("y-api copy describes routing, not authorship or verification", () => {
  const hint = String(APIKEY_PROVIDERS["y-api"]?.apiHint ?? "");
  assert.ok(hint.length > 0, "an apiHint is required to carry the caveat");
  assert.ok(hint.includes(CHAT_URL.replace("/chat/completions", "")), "apiHint carries base URL");
  assert.ok(
    hint.toLowerCase().includes("third-party upstream"),
    "apiHint must say the models come from third-party upstreams"
  );
  for (const claim of ["we trained", "self-hosted", "first-party", "utm_source", "ref="]) {
    assert.ok(
      !hint.toLowerCase().includes(claim.toLowerCase()),
      `apiHint must not claim "${claim}"`
    );
  }
});

test("y-api claims no capability that was not exercised", () => {
  // No API key was available, so neither the Anthropic Messages shape nor
  // streaming, tools or count_tokens were exercised against the live endpoint.
  // count_tokens in particular is not implemented upstream.
  const metadata = APIKEY_PROVIDERS["y-api"] as Record<string, unknown>;
  for (const key of [
    "supportsTools",
    "supportsVision",
    "supportsCountTokens",
    "countTokensUrl",
    "capabilities",
  ]) {
    assert.equal(metadata[key], undefined, `${key} must not be declared unverified`);
  }
});
