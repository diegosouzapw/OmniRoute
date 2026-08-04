import assert from "node:assert/strict";
import test from "node:test";

import {
  ANTIGRAVITY_PUBLIC_MODELS,
  isUserCallableAntigravityModelId,
} from "../../open-sse/config/antigravityModelAliases.ts";
import { AGY_PUBLIC_MODELS, isUserCallableAgyModelId } from "../../open-sse/config/agyModels.ts";
import { FREE_MODEL_BUDGETS } from "../../open-sse/config/freeModelCatalog.data.ts";
import { getImageProvider } from "../../open-sse/config/imageRegistry.ts";

test("Antigravity and AGY chat catalogs exclude image-generation-only models", () => {
  const chatModelIds = new Set(ANTIGRAVITY_PUBLIC_MODELS.map((model) => model.id));
  const agyChatModelIds = new Set(AGY_PUBLIC_MODELS.map((model) => model.id));

  assert.equal(chatModelIds.has("gemini-3.1-flash-image"), false);
  assert.equal(chatModelIds.has("gemini-3-pro-image-preview"), false);
  assert.equal(isUserCallableAntigravityModelId("gemini-3.1-flash-image"), false);
  assert.equal(isUserCallableAntigravityModelId("gemini-3-pro-image-preview"), false);
  assert.equal(agyChatModelIds.has("gemini-3.1-flash-image"), false);
  assert.equal(isUserCallableAgyModelId("gemini-3.1-flash-image"), false);
  assert.equal(
    FREE_MODEL_BUDGETS.some(
      (model) => model.provider === "agy" && model.modelId === "gemini-3.1-flash-image"
    ),
    false
  );

  const imageProvider = getImageProvider("antigravity");
  assert.ok(imageProvider);
  assert.equal(
    imageProvider.models.some((model) => model.id === "gemini-3.1-flash-image"),
    true
  );
});
