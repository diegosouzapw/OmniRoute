import test from "node:test";
import assert from "node:assert/strict";

import { qwen_cloud_token_planProvider } from "../../open-sse/config/providers/registry/qwen-cloud-token-plan/index.ts";
import { deriveConfigFromRegistryModelsUrl } from "../../src/app/api/providers/[id]/models/discoveryConfig.ts";

const SPEC_MODELS_URL =
  "https://token-plan.ap-southeast-1.maas.aliyuncs.com/compatible-mode/v1/models";

test("qwen-cloud-token-plan registry entry exposes the live /v1/models URL", () => {
  assert.equal(qwen_cloud_token_planProvider.id, "qwen-cloud-token-plan");
  // Without modelsUrl, deriveConfigFromRegistryModelsUrl() returns undefined and
  // model discovery falls back to the local catalog
  // ("API unavailable — using local catalog", issue #13506).
  assert.equal(qwen_cloud_token_planProvider.modelsUrl, SPEC_MODELS_URL);
});

test("deriveConfigFromRegistryModelsUrl covers qwen-cloud-token-plan", () => {
  const config = deriveConfigFromRegistryModelsUrl("qwen-cloud-token-plan");
  assert.ok(config, "expected a discovery config derived from the registry modelsUrl");
  assert.equal(config.url, SPEC_MODELS_URL);
  assert.equal(config.method, "GET");
  assert.equal(config.authHeader, "Authorization");
  assert.equal(config.authPrefix, "Bearer ");
});

test("derived config parses the token-plan OpenAI-style list response", () => {
  const config = deriveConfigFromRegistryModelsUrl("qwen-cloud-token-plan");
  assert.ok(config);
  // Shape verified manually against the live endpoint in issue #13506.
  const live = {
    first_id: "model-id-0",
    data: [
      { created: 1785722409, owned_by: "system", id: "qwen3.8-max", object: "model" },
      { created: 1787731683, owned_by: "system", id: "qwen3.8-flash", object: "model" },
    ],
    last_id: "model-id-11",
    has_more: false,
    object: "list",
  };
  const models = config.parseResponse(live) as Array<{ id: string }>;
  assert.equal(models.length, 2);
  assert.deepEqual(
    models.map((m) => m.id),
    ["qwen3.8-max", "qwen3.8-flash"]
  );
});
