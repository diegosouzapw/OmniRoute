import test from "node:test";
import assert from "node:assert/strict";

import { APIKEY_PROVIDERS, AI_PROVIDERS } from "../../src/shared/constants/providers.ts";
import { REGISTRY } from "../../open-sse/config/providerRegistry.ts";
import { PROVIDERS as LEGACY_PROVIDERS } from "../../open-sse/config/constants.ts";

test("pioneer is registered as an API-key provider in the UI catalog", () => {
  const pioneer = APIKEY_PROVIDERS.pioneer;
  assert.ok(pioneer, "APIKEY_PROVIDERS.pioneer must exist");
  assert.equal(pioneer.id, "pioneer");
  assert.equal(pioneer.alias, "pn");
  assert.equal(pioneer.name, "Pioneer AI");
  assert.equal(pioneer.color, "#7C5CFF");
});

test("pioneer appears in AI_PROVIDERS (composed view)", () => {
  const pioneer = AI_PROVIDERS.pioneer;
  assert.ok(pioneer, "AI_PROVIDERS.pioneer must exist");
  assert.equal(pioneer.id, "pioneer");
});

test("pioneer registry entry is correct (format, auth, executor)", () => {
  const pioneer = REGISTRY.pioneer;
  assert.ok(pioneer, "REGISTRY.pioneer must exist");
  assert.equal(pioneer.format, "openai");
  assert.equal(pioneer.executor, "default");
  assert.equal(pioneer.authType, "apikey");
  // X-API-Key auth (not Bearer) — matches upstream preference
  assert.equal(pioneer.authHeader, "x-api-key");
  assert.equal(pioneer.baseUrl, "https://api.pioneer.ai/v1/chat/completions");
  assert.equal(pioneer.alias, "pn");
});

test("pioneer has open-tier models with supports_on_demand_inference", () => {
  const pioneer = REGISTRY.pioneer;
  const ids = pioneer.models.map((m) => m.id);
  // Qwen3 models
  assert.ok(ids.includes("Qwen/Qwen3-32B"), "must include Qwen3 32B");
  assert.ok(ids.includes("Qwen/Qwen3-8B"), "must include Qwen3 8B");
  // Llama models
  assert.ok(ids.includes("meta-llama/Llama-3.1-8B-Instruct"), "must include Llama 3.1 8B Instruct");
  assert.ok(ids.includes("meta-llama/Llama-3.2-1B-Instruct"), "must include Llama 3.2 1B Instruct");
  // At least 10 models total (open-tier catalog)
  assert.ok(pioneer.models.length >= 10, `expected >= 10 models, got ${pioneer.models.length}`);
  // Gated models (Claude/GPT/Gemini) must NOT appear — they require fine-tuning first
  assert.ok(
    !ids.some((id) => id.toLowerCase().includes("claude")),
    "gated Claude models must not be in catalog"
  );
  assert.ok(
    !ids.some((id) => id.toLowerCase().includes("gpt")),
    "gated GPT models must not be in catalog"
  );
  assert.ok(
    !ids.some((id) => id.toLowerCase().includes("gemini")),
    "gated Gemini models must not be in catalog"
  );
});

test("pioneer legacy PROVIDERS entry resolves from generated map", () => {
  const legacy = LEGACY_PROVIDERS.pioneer;
  assert.ok(legacy, "LEGACY_PROVIDERS.pioneer must exist (generated from REGISTRY)");
  assert.equal(legacy.format, "openai");
  // Should not have OAuth fields — pioneer is API-key only
  assert.equal(legacy.clientId, undefined);
  assert.equal(legacy.clientSecret, undefined);
  assert.equal(legacy.tokenUrl, undefined);
});

test("pioneer has hasFree flag and free signup notice", () => {
  const pioneer = APIKEY_PROVIDERS.pioneer;
  assert.equal(pioneer.hasFree, true, "pioneer should advertise free tier");
  assert.ok(pioneer.freeNote?.includes("$75"), "freeNote should mention $75 credits");
  assert.ok(
    pioneer.notice?.signupUrl?.includes("pioneer.ai"),
    "signupUrl should point to pioneer.ai"
  );
  assert.ok(
    pioneer.notice?.apiKeyUrl?.includes("pioneer.ai"),
    "apiKeyUrl should point to pioneer.ai"
  );
});
