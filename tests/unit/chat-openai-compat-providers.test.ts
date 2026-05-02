import test from "node:test";
import assert from "node:assert/strict";

import { REGISTRY } from "../../open-sse/config/providerRegistry.ts";
import { getModelsByProviderId } from "../../src/shared/constants/models.ts";
import { APIKEY_PROVIDERS } from "../../src/shared/constants/providers.ts";

const CHAT_OPENAI_COMPAT_PROVIDER_IDS = [
  "deepinfra",
  "vercel-ai-gateway",
  "qianfan",
  "lambda-ai",
  "sambanova",
  "nscale",
  "ovhcloud",
  "baseten",
  "publicai",
  "moonshot",
  "meta-llama",
  "v0-vercel",
  "morph",
  "featherless-ai",
  "friendliai",
  "llamagate",
  "heroku",
  "galadriel",
  "databricks",
  "snowflake",
  "wandb",
  "volcengine",
  "ai21",
  "gigachat",
  "venice",
  "codestral",
  "upstage",
  "maritalk",
  "xiaomi-mimo",
  "inference-net",
  "nanogpt",
  "predibase",
  "bytez",
];

test("chat-openai-compat providers are registered across provider metadata, registry and local catalog", () => {
  for (const providerId of CHAT_OPENAI_COMPAT_PROVIDER_IDS) {
    assert.ok(APIKEY_PROVIDERS[providerId], `${providerId} missing from APIKEY_PROVIDERS`);
    assert.ok(REGISTRY[providerId], `${providerId} missing from REGISTRY`);

    const models = getModelsByProviderId(providerId);
    assert.ok(Array.isArray(models), `${providerId} models must be an array`);
    assert.ok(models.length > 0, `${providerId} models must not be empty`);
  }
});

test("upstage chat catalog does not include non-chat specialty models", () => {
  const modelIds = REGISTRY.upstage.models.map((model) => model.id);

  assert.ok(modelIds.includes("solar-pro3"));
  assert.ok(modelIds.includes("solar-mini"));
  assert.equal(modelIds.includes("document-parse"), false);
  assert.equal(modelIds.includes("embedding-query"), false);
  assert.equal(modelIds.includes("embedding-passage"), false);
});
