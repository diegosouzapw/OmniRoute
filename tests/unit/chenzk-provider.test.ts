import test from "node:test";
import assert from "node:assert/strict";

const { getRegistryEntry } = await import("../../open-sse/config/providerRegistry.ts");
const { APIKEY_PROVIDERS } = await import("../../src/shared/constants/providers/apikey/index.ts");
const { isNamedOpenAIStyleProvider } =
  await import("../../src/app/api/providers/[id]/models/discovery/providerSets.ts");

test("Chenzk API is registered as an OpenAI-compatible API-key provider", () => {
  const entry = getRegistryEntry("chenzk");

  assert.ok(entry, "Chenzk provider should be registered");
  assert.equal(entry.format, "openai");
  assert.equal(entry.executor, "default");
  assert.equal(entry.authType, "apikey");
  assert.equal(entry.authHeader, "bearer");
  assert.equal(entry.baseUrl, "https://chenzk.top/v1/chat/completions");
  assert.equal(entry.modelsUrl, "https://chenzk.top/v1/models");
  assert.equal(entry.passthroughModels, true);
  assert.ok(entry.models.some((model) => model.id === "gpt-5.5"));
  assert.ok(entry.models.some((model) => model.id === "claude-opus-4-8"));
});

test("Chenzk API appears in the API-key provider catalog and supports live model discovery", () => {
  const catalog = APIKEY_PROVIDERS.chenzk;

  assert.ok(catalog, "Chenzk catalog entry should be registered");
  assert.equal(catalog.name, "Chenzk API");
  assert.equal(catalog.website, "https://chenzk.top");
  assert.equal(catalog.passthroughModels, true);
  assert.equal(isNamedOpenAIStyleProvider("chenzk"), true);
});
