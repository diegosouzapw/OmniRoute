import test from "node:test";
import assert from "node:assert/strict";

import { modelscopeProvider } from "../../open-sse/config/providers/registry/modelscope/index.ts";
import { REGISTRY } from "../../open-sse/config/providerRegistry.ts";
import { APIKEY_PROVIDERS } from "../../src/shared/constants/providers/apikey/index.ts";
import { AI_PROVIDERS, getProviderById } from "../../src/shared/constants/providers.ts";

// Upstream 9router PR #1764 (@tn5052) ports ModelScope (Alibaba 魔搭) as an OpenAI-compatible
// BYOK free-tier provider. The upstream PR hardcoded `https://api-inference.modelscope.ai/...`
// (`.ai` TLD) — ModelScope's own docs confirm the real production domain is
// `api-inference.modelscope.cn` (`.cn` TLD). This suite locks in the verified domain and
// guards against a regression back to the unverified `.ai` domain.

test("providers-shape: modelscope is registered in APIKEY_PROVIDERS metadata", () => {
  assert.ok("modelscope" in APIKEY_PROVIDERS, "modelscope missing from APIKEY_PROVIDERS");
  const meta = (APIKEY_PROVIDERS as Record<string, Record<string, unknown>>).modelscope;
  assert.equal(meta.id, "modelscope");
  assert.equal(meta.alias, "ms");
  assert.equal(meta.name, "ModelScope");
  assert.equal(meta.website, "https://modelscope.cn");
  assert.equal(meta.hasFree, true);
});

test("providers-shape: modelscope is a canonical AI_PROVIDERS entry resolvable by id", () => {
  assert.ok("modelscope" in AI_PROVIDERS, "modelscope missing from AI_PROVIDERS");
  const provider = getProviderById("modelscope");
  assert.ok(provider, "getProviderById('modelscope') returned nothing");
  assert.equal(provider?.id, "modelscope");
});

test("registry resolution: modelscope resolves in the provider REGISTRY as OpenAI-compatible", () => {
  assert.ok("modelscope" in REGISTRY, "modelscope missing from REGISTRY");
  const entry = REGISTRY.modelscope;
  assert.equal(entry.format, "openai");
  assert.equal(entry.executor, "default");
  assert.equal(entry.authType, "apikey");
  assert.equal(entry.authHeader, "bearer");
  assert.equal(entry, modelscopeProvider);
});

test("registry resolution: modelscope uses passthrough models with an empty static seed list", () => {
  assert.equal(modelscopeProvider.passthroughModels, true);
  assert.deepEqual(modelscopeProvider.models, []);
  assert.equal(
    modelscopeProvider.modelsUrl,
    "https://api-inference.modelscope.cn/v1/models",
    "modelsUrl must point at the verified .cn domain"
  );
});

test("baseUrl guard: modelscope targets the verified api-inference.modelscope.cn domain (not .ai)", () => {
  assert.equal(
    modelscopeProvider.baseUrl,
    "https://api-inference.modelscope.cn/v1/chat/completions"
  );
  assert.ok(
    modelscopeProvider.baseUrl.includes("api-inference.modelscope.cn"),
    `baseUrl must use the verified .cn domain, got: ${modelscopeProvider.baseUrl}`
  );
  assert.ok(
    !modelscopeProvider.baseUrl.includes("modelscope.ai"),
    "baseUrl must not regress to the upstream PR's unverified .ai domain"
  );
});
