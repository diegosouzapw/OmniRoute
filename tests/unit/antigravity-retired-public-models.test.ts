import assert from "node:assert/strict";
import test from "node:test";

import {
  getAntigravityModelFallbacks,
  ANTIGRAVITY_MODEL_ALIASES,
  ANTIGRAVITY_PUBLIC_MODELS,
  ANTIGRAVITY_REVERSE_MODEL_ALIASES,
  isUserCallableAntigravityModelId,
  resolveAntigravityModelId,
  toClientAntigravityModelId,
} from "../../open-sse/config/antigravityModelAliases.ts";
import { AGY_PUBLIC_MODELS, isUserCallableAgyModelId } from "../../open-sse/config/agyModels.ts";
import { FREE_MODEL_BUDGETS } from "../../open-sse/config/freeModelCatalog.data.ts";
import { getDefaultPricing } from "../../src/shared/constants/pricing.ts";
import { CLI_TOOLS } from "../../src/shared/constants/cliTools.ts";

const RETIRED_PUBLIC_MODELS = [
  "gemini-3-pro-preview",
  "gemini-3.1-pro-high",
  "gemini-2.5-pro",
  "gemini-2.5-computer-use-preview-10-2025",
] as const;

const EXPECTED_LEADING_MODEL_ORDER = [
  "gemini-3.6-flash-high",
  "gemini-3.6-flash-medium",
  "gemini-3.6-flash-low",
  "claude-opus-4-6-thinking",
  "claude-sonnet-4-6",
  "gemini-pro-agent",
  "gemini-3.1-pro-low",
  "gemini-3-flash-agent",
  "gemini-3.5-flash-low",
  "gemini-3.5-flash-extra-low",
] as const;

const ACTIVE_FLASH_MODEL_IDS = [
  "gemini-3-flash-agent",
  "gemini-3.5-flash-low",
  "gemini-3.5-flash-extra-low",
] as const;

const CURRENT_36_FLASH_MODEL_IDS = [
  "gemini-3.6-flash-high",
  "gemini-3.6-flash-medium",
  "gemini-3.6-flash-low",
] as const;

test("Antigravity and AGY place the live Gemini 3.6 default tiers first", () => {
  for (const [provider, models] of [
    ["antigravity", ANTIGRAVITY_PUBLIC_MODELS],
    ["agy", AGY_PUBLIC_MODELS],
  ] as const) {
    assert.deepEqual(
      models.slice(0, EXPECTED_LEADING_MODEL_ORDER.length).map((model) => model.id),
      EXPECTED_LEADING_MODEL_ORDER,
      `${provider} public catalog must place the live Gemini 3.6 default tiers first`
    );
  }
});

test("Antigravity excludes confirmed retired models from its public chat catalog", () => {
  const publicModelIds = new Set(ANTIGRAVITY_PUBLIC_MODELS.map((model) => model.id));

  for (const modelId of RETIRED_PUBLIC_MODELS) {
    assert.equal(publicModelIds.has(modelId), false, `${modelId} must not be public`);
    assert.equal(
      isUserCallableAntigravityModelId(modelId),
      false,
      `${modelId} must not be discovered as callable`
    );
  }
});

test("AGY free-model metadata excludes unavailable Gemini 2.5 Pro", () => {
  assert.equal(
    FREE_MODEL_BUDGETS.some(
      (model) => model.provider === "agy" && model.modelId === "gemini-2.5-pro"
    ),
    false
  );
});

test("Antigravity and AGY expose gemini-pro-agent as the only Gemini 3.1 Pro High id", () => {
  const antigravityModels = new Map(
    ANTIGRAVITY_PUBLIC_MODELS.map((model) => [model.id, model.name])
  );
  const agyModels = new Map(AGY_PUBLIC_MODELS.map((model) => [model.id, model.name]));
  const agyFreeModels = FREE_MODEL_BUDGETS.filter((model) => model.provider === "agy");

  assert.equal(antigravityModels.has("gemini-3.1-pro-high"), false);
  assert.equal(agyModels.has("gemini-3.1-pro-high"), false);
  assert.equal(isUserCallableAntigravityModelId("gemini-3.1-pro-high"), false);
  assert.equal(isUserCallableAgyModelId("gemini-3.1-pro-high"), false);
  assert.deepEqual(getAntigravityModelFallbacks("gemini-3.1-pro-high"), []);
  assert.equal(
    agyFreeModels.some((model) => model.modelId === "gemini-3.1-pro-high"),
    false
  );

  assert.equal(antigravityModels.get("gemini-pro-agent"), "Gemini 3.1 Pro (High)");
  assert.equal(agyModels.get("gemini-pro-agent"), "Gemini 3.1 Pro (High)");
  assert.equal(isUserCallableAntigravityModelId("gemini-pro-agent"), true);
  assert.equal(isUserCallableAgyModelId("gemini-pro-agent"), true);
  assert.equal(
    agyFreeModels.find((model) => model.modelId === "gemini-pro-agent")?.displayName,
    "Gemini 3.1 Pro (High)"
  );
});

test("Antigravity support catalogs expose every live Gemini 3.6 Flash tier", () => {
  const antigravityModelIds = new Set(ANTIGRAVITY_PUBLIC_MODELS.map((model) => model.id));
  const agyModelIds = new Set(AGY_PUBLIC_MODELS.map((model) => model.id));
  const cliAliases = new Set(CLI_TOOLS.antigravity.modelAliases);
  const cliModelIds = new Set(CLI_TOOLS.antigravity.defaultModels.map((model) => model.id));
  const agyFreeModelIds = new Set(
    FREE_MODEL_BUDGETS.filter((model) => model.provider === "agy").map((model) => model.modelId)
  );

  for (const modelId of CURRENT_36_FLASH_MODEL_IDS) {
    assert.equal(antigravityModelIds.has(modelId), true, `${modelId} missing from Antigravity`);
    assert.equal(agyModelIds.has(modelId), true, `${modelId} missing from AGY`);
    assert.equal(cliAliases.has(modelId), true, `${modelId} missing from CLI aliases`);
    assert.equal(cliModelIds.has(modelId), true, `${modelId} missing from CLI defaults`);
    assert.equal(agyFreeModelIds.has(modelId), true, `${modelId} missing from AGY metadata`);
  }
});

test("Antigravity support catalogs no longer advertise or price the rejected High id", () => {
  const cliModelIds = CLI_TOOLS.antigravity.defaultModels.map((model) => model.id);
  const pricing = getDefaultPricing().ag;

  assert.equal(cliModelIds.includes("gemini-3.1-pro-high"), false);
  assert.equal(cliModelIds.includes("gemini-pro-agent"), true);
  assert.equal(pricing["gemini-3.1-pro-high"], undefined);
  assert.ok(pricing["gemini-pro-agent"]);
});

test("Antigravity and AGY support metadata excludes the retired Gemini 3 Flash id", () => {
  const cliAliases = CLI_TOOLS.antigravity.modelAliases;
  const cliModelIds = CLI_TOOLS.antigravity.defaultModels.map((model) => model.id);
  const agyFreeModelIds = FREE_MODEL_BUDGETS.filter((model) => model.provider === "agy").map(
    (model) => model.modelId
  );
  const pricing = getDefaultPricing().ag;

  assert.equal(cliAliases.includes("gemini-3-flash"), false);
  assert.equal(cliModelIds.includes("gemini-3-flash"), false);
  assert.equal(agyFreeModelIds.includes("gemini-3-flash"), false);
  assert.equal(pricing["gemini-3-flash"], undefined);

  for (const modelId of ACTIVE_FLASH_MODEL_IDS) {
    assert.equal(cliAliases.includes(modelId), true, `${modelId} must remain selectable`);
    assert.equal(cliModelIds.includes(modelId), true, `${modelId} must remain a CLI default`);
    assert.equal(agyFreeModelIds.includes(modelId), true, `${modelId} must remain in AGY metadata`);
    assert.ok(pricing[modelId], `${modelId} must retain Antigravity pricing`);
  }
});

test("Antigravity does not retain routing aliases for confirmed retired models", () => {
  assert.equal(Object.hasOwn(ANTIGRAVITY_MODEL_ALIASES, "gemini-3-pro-preview"), false);
  assert.equal(
    Object.hasOwn(ANTIGRAVITY_MODEL_ALIASES, "gemini-2.5-computer-use-preview-10-2025"),
    false
  );
  assert.equal(Object.hasOwn(ANTIGRAVITY_REVERSE_MODEL_ALIASES, "gemini-3.1-pro"), false);
  assert.equal(Object.hasOwn(ANTIGRAVITY_REVERSE_MODEL_ALIASES, "rev19-uic3-1p"), false);

  assert.equal(resolveAntigravityModelId("gemini-3-pro-preview"), "gemini-3-pro-preview");
  assert.equal(
    resolveAntigravityModelId("gemini-2.5-computer-use-preview-10-2025"),
    "gemini-2.5-computer-use-preview-10-2025"
  );
  assert.equal(toClientAntigravityModelId("gemini-3.1-pro"), "gemini-3.1-pro");
  assert.equal(toClientAntigravityModelId("rev19-uic3-1p"), "rev19-uic3-1p");
});
