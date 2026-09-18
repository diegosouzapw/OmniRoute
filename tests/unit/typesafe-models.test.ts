import test from "node:test";
import assert from "node:assert/strict";

import { REGISTRY } from "../../open-sse/config/providerRegistry.ts";
import { getAllSystemoneModels } from "../../open-sse/config/systemoneRegistry.ts";
import {
  filterChatSelectableModels,
  getModelEndpointDecision,
  isChatSelectableModel,
} from "../../open-sse/services/modelEndpointPolicy.ts";
import { APIKEY_PROVIDERS } from "../../src/shared/constants/providers.ts";
import { getStaticModelsForProvider } from "../../src/lib/providers/staticModels.ts";
import { v1SystemoneSchema } from "../../src/shared/validation/schemas.ts";
import {
  isTypesafeJevModelId,
  JEV_ALIAS_MODELS,
  TYPESAFE_PROVIDER_ID,
} from "../../src/lib/providers/typesafe.ts";

test("typesafe is a registered API-key provider pointed at api.typesafe.ai", () => {
  const catalog = APIKEY_PROVIDERS.typesafe;
  assert.ok(catalog);
  assert.equal(catalog.id, TYPESAFE_PROVIDER_ID);
  assert.equal(catalog.alias, "typesafe");
  assert.deepEqual(catalog.serviceKinds, []);
  assert.match(catalog.authHint || "", /api\.typesafe\.ai/);

  const registry = REGISTRY.typesafe;
  assert.ok(registry);
  assert.equal(registry.baseUrl, "https://api.typesafe.ai/v1/systemone");
  assert.equal(registry.modelsUrl, "https://api.typesafe.ai/v1/models");
  assert.equal(registry.authHeader, "bearer");
  assert.notEqual(registry.passthroughModels, true);
  assert.deepEqual(
    registry.models.map((model) => model.id),
    ["jev-latest", "jev-preview"]
  );
});

test("GET /v1/models catalog builder includes typesafe/jev-latest and typesafe/jev-preview", () => {
  const listed = getAllSystemoneModels();
  const ids = listed.map((model) => model.id);
  assert.ok(ids.includes("typesafe/jev-latest"));
  assert.ok(ids.includes("typesafe/jev-preview"));
  assert.ok(listed.every((model) => model.provider === "typesafe"));

  const staticModels = getStaticModelsForProvider("typesafe") || [];
  for (const alias of JEV_ALIAS_MODELS) {
    const row = staticModels.find((model) => model.id === alias);
    assert.ok(row, `${alias} must be in the static specialty catalog`);
    assert.equal(row.apiFormat, "systemone");
    assert.deepEqual(row.supportedEndpoints, ["systemone"]);
  }
});

test("typesafe models are excluded from chat-selectable and combo-builder filters", () => {
  for (const modelId of ["jev-latest", "jev-preview", "jev-1.13.0"]) {
    assert.deepEqual(getModelEndpointDecision("typesafe", modelId), {
      kind: "non-chat",
      chatSelectable: false,
      reason: "provider-policy",
    });
    assert.equal(isChatSelectableModel("typesafe", { id: modelId }), false);
  }
  const kept = filterChatSelectableModels("typesafe", [
    { id: "jev-latest" },
    { id: "jev-preview" },
    { id: "jev-1.13.0" },
  ]);
  assert.deepEqual(kept, []);
});

test("systemone accepts versioned jev-* ids and does not treat them as unknown", () => {
  for (const model of ["jev-1.13.0", "typesafe/jev-1.13.0", "jev-latest", "jev-preview"]) {
    assert.equal(isTypesafeJevModelId(model), true, `${model} should be a Jev id`);
    const parsed = v1SystemoneSchema.safeParse({
      state: "classify this",
      model,
      questions: {
        intent: { type: "choice", instructions: "pick", criteria: { code: null } },
      },
    });
    assert.equal(parsed.success, true, `${model} must pass the systemone schema`);
  }
  assert.equal(isTypesafeJevModelId("gpt-4o"), false);
  const rejected = v1SystemoneSchema.safeParse({
    model: "jev-latest",
    questions: { intent: { type: "choice" } },
  });
  assert.equal(rejected.success, false);
});
