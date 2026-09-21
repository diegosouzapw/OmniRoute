import test from "node:test";
import assert from "node:assert/strict";

const { APIKEY_PROVIDERS, AGGREGATOR_PROVIDER_IDS } = await import(
  "../../src/shared/constants/providers.ts"
);
const { PROVIDER_ENDPOINTS } = await import("../../src/shared/constants/config.ts");
const { REGISTRY: providerRegistry } = await import("../../open-sse/config/providerRegistry.ts");
const { isValidModel } = await import("../../src/shared/constants/models.ts");
const { DefaultExecutor, getExecutor } = await import("../../open-sse/executors/index.ts");

const SEEKAI_CHAT_URL = "https://seekai.cc/v1/chat/completions";
const SEEKAI_MODELS_URL = "https://seekai.cc/v1/models";

test("#11786 seekai is registered as an API-key gateway provider", () => {
  const entry = APIKEY_PROVIDERS.seekai;
  assert.ok(entry, "APIKEY_PROVIDERS.seekai must be defined");
  assert.equal(entry.id, "seekai");
  assert.equal(entry.alias, "ska");
  assert.equal(entry.name, "SeekAi");
  assert.equal(entry.website, "https://seekai.cc");
  assert.equal(entry.passthroughModels, true);
  assert.equal(entry.hasFree, true);
  assert.equal(typeof entry.authHint, "string");
  assert.ok((entry.authHint as string).length > 0);
  assert.equal(typeof entry.apiHint, "string");
  assert.ok((entry.apiHint as string).length > 0);
});

test("#11786 seekai website and hints carry no referral/aff query", () => {
  const entry = APIKEY_PROVIDERS.seekai;
  const haystack = [entry.website, entry.apiHint, entry.authHint, entry.freeNote]
    .filter((value): value is string => typeof value === "string")
    .join("\n");
  assert.equal(/[?&]aff=/.test(haystack), false);
  assert.equal(haystack.includes("qR5U"), false);
});

test("#11786 seekai registry entry uses OpenAI format with bearer API-key auth", () => {
  const entry = providerRegistry.seekai;
  assert.ok(entry, "providerRegistry.seekai must be defined");
  assert.equal(entry.id, "seekai");
  assert.equal(entry.alias, "ska");
  assert.equal(entry.format, "openai");
  assert.equal(entry.executor, "default");
  assert.equal(entry.authType, "apikey");
  assert.equal(entry.authHeader, "bearer");
  assert.equal(entry.baseUrl, SEEKAI_CHAT_URL);
  assert.equal(entry.modelsUrl, SEEKAI_MODELS_URL);
  assert.equal(entry.passthroughModels, true);
});

test("#11786 seekai discovers models live via passthrough (no static seed list)", () => {
  assert.deepEqual(providerRegistry.seekai.models, []);
  assert.equal(providerRegistry.seekai.passthroughModels, true);
});

test("#11786 seekai accepts any model id via passthrough", () => {
  assert.equal(isValidModel("seekai", "claude-sonnet-5"), true);
  assert.equal(isValidModel("ska", "gpt-5.6"), true);
});

test("#11786 seekai is on the aggregator list and display endpoint", async () => {
  assert.equal(AGGREGATOR_PROVIDER_IDS.has("seekai"), true);
  assert.equal(PROVIDER_ENDPOINTS.seekai, SEEKAI_CHAT_URL);
  assert.ok((await getExecutor("seekai")) instanceof DefaultExecutor);
});
