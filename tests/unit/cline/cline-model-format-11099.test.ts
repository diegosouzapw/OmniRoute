import test from "node:test";
import assert from "node:assert/strict";

import { getModelsByProviderId } from "../../../open-sse/config/providerModels.ts";
import { parseClineRecommendedModels } from "../../../open-sse/services/clinepassModels.ts";

test("#11099: Cline provider catalog model IDs use valid modelType/model format", () => {
  const models = getModelsByProviderId("cline");
  assert.ok(models.length > 0, "cline provider must expose models");

  for (const model of models) {
    assert.match(
      model.id,
      /^[a-z0-9-]+-?[a-z0-9-]*\/[a-z0-9._:-]+$/i,
      `Model ID '${model.id}' must follow provider/model format`
    );
    assert.notEqual(
      model.id.split("/")[0],
      "zai",
      "Model ID must use 'z-ai' instead of invalid 'zai'"
    );
  }
});

test("#11099: parseClineRecommendedModels correctly extracts recommended/free models", () => {
  const mockPayload = {
    recommended: [
      { id: "moonshotai/kimi-k3", name: "kimi-k3" },
      { id: "x-ai/grok-4.5", name: "grok-4.5" },
    ],
    free: [{ id: "deepseek/deepseek-v4-flash", name: "deepseek-v4-flash" }],
  };

  const parsed = parseClineRecommendedModels(mockPayload);
  assert.equal(parsed.length, 3);
  assert.equal(parsed[0].id, "moonshotai/kimi-k3");
  assert.equal(parsed[1].id, "x-ai/grok-4.5");
  assert.equal(parsed[2].id, "deepseek/deepseek-v4-flash");
});
