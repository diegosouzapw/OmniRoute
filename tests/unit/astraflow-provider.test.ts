import test from "node:test";
import assert from "node:assert/strict";

const { APIKEY_PROVIDERS } = await import("../../src/shared/constants/providers.ts");
const { PROVIDER_ENDPOINTS } = await import("../../src/shared/constants/config.ts");
const { REGISTRY: providerRegistry } = await import("../../open-sse/config/providerRegistry.ts");
const { isValidModel } = await import("../../src/shared/constants/models.ts");

const ASTRAFLOW_GLOBAL_URL = "https://api-us-ca.umodelverse.ai/v1/chat/completions";
const ASTRAFLOW_CN_URL = "https://api.modelverse.cn/v1/chat/completions";

test("Astraflow global + China metadata are registered as API-key providers", () => {
  const global = APIKEY_PROVIDERS.astraflow;
  const cn = APIKEY_PROVIDERS["astraflow-cn"];

  assert.ok(global, "APIKEY_PROVIDERS.astraflow must be defined");
  assert.ok(cn, "APIKEY_PROVIDERS['astraflow-cn'] must be defined");

  assert.equal(global.id, "astraflow");
  assert.equal(global.alias, "astraflow");
  assert.equal(global.name, "Astraflow");
  assert.equal(global.color, "#0052D9");
  assert.equal(global.website, "https://astraflow.ucloud-global.com");
  assert.equal(global.passthroughModels, true);

  assert.equal(cn.id, "astraflow-cn");
  assert.equal(cn.alias, "astraflow-cn");
  assert.equal(cn.name, "Astraflow (China)");
  assert.equal(cn.color, "#0052D9");
  assert.equal(cn.website, "https://astraflow.ucloud.cn");
  assert.equal(cn.passthroughModels, true);
});

test("Astraflow display endpoints point at the vendor inference domains", () => {
  assert.equal(PROVIDER_ENDPOINTS.astraflow, ASTRAFLOW_GLOBAL_URL);
  assert.equal(PROVIDER_ENDPOINTS["astraflow-cn"], ASTRAFLOW_CN_URL);
});

test("Astraflow registry entries resolve with OpenAI format + bearer API-key auth", () => {
  const global = providerRegistry.astraflow;
  const cn = providerRegistry["astraflow-cn"];

  assert.ok(global, "providerRegistry.astraflow must be defined");
  assert.ok(cn, "providerRegistry['astraflow-cn'] must be defined");

  for (const entry of [global, cn]) {
    assert.equal(entry.format, "openai");
    assert.equal(entry.executor, "default");
    assert.equal(entry.authType, "apikey");
    assert.equal(entry.authHeader, "bearer");
    assert.equal(entry.passthroughModels, true);
    assert.deepEqual(entry.models, [], "passthrough providers ship an empty seed list");
  }

  assert.equal(global.id, "astraflow");
  assert.equal(global.baseUrl, ASTRAFLOW_GLOBAL_URL);
  assert.equal(cn.id, "astraflow-cn");
  assert.equal(cn.baseUrl, ASTRAFLOW_CN_URL);
  assert.notEqual(global.baseUrl, cn.baseUrl, "global and CN endpoints must differ");
});

test("Astraflow accepts arbitrary catalog models via passthrough", () => {
  assert.equal(isValidModel("astraflow", "gpt-4o"), true);
  assert.equal(isValidModel("astraflow", "anthropic/claude-sonnet-4"), true);
  assert.equal(isValidModel("astraflow-cn", "gpt-4o"), true);
});

test("Astraflow / astraflow-cn mirror the minimax / minimax-cn global+CN pair structure", () => {
  const minimax = providerRegistry.minimax;
  const minimaxCn = providerRegistry["minimax-cn"];
  const astraflow = providerRegistry.astraflow;
  const astraflowCn = providerRegistry["astraflow-cn"];

  assert.ok(minimax && minimaxCn, "minimax pair must exist as the reference pattern");

  // Same shape: both pairs expose a global entry and a distinctly-aliased CN entry.
  assert.equal(minimaxCn.id, "minimax-cn");
  assert.equal(astraflowCn.id, "astraflow-cn");
  assert.notEqual(minimax.baseUrl, minimaxCn.baseUrl, "minimax pair uses distinct base URLs");
  assert.notEqual(
    astraflow.baseUrl,
    astraflowCn.baseUrl,
    "astraflow pair uses distinct base URLs, mirroring minimax/minimax-cn"
  );

  // Both members of a pair share the same protocol format and auth wiring.
  assert.equal(minimax.format, minimaxCn.format);
  assert.equal(minimax.authType, minimaxCn.authType);
  assert.equal(minimax.authHeader, minimaxCn.authHeader);
  assert.equal(astraflow.format, astraflowCn.format);
  assert.equal(astraflow.authType, astraflowCn.authType);
  assert.equal(astraflow.authHeader, astraflowCn.authHeader);

  // Gateway metadata pairs (APIKEY_PROVIDERS) also mirror the CN-suffix alias convention.
  const minimaxMeta = APIKEY_PROVIDERS.minimax;
  const minimaxCnMeta = APIKEY_PROVIDERS["minimax-cn"];
  const astraflowMeta = APIKEY_PROVIDERS.astraflow;
  const astraflowCnMeta = APIKEY_PROVIDERS["astraflow-cn"];
  assert.ok(minimaxMeta && minimaxCnMeta, "minimax gateway metadata pair must exist");
  assert.equal(minimaxCnMeta.alias, "minimax-cn");
  assert.equal(astraflowCnMeta.alias, "astraflow-cn");
  assert.equal(astraflowMeta.alias, "astraflow");
});
