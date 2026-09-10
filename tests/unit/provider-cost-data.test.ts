import assert from "node:assert/strict";
import test from "node:test";

import { getModelPricing, KNOWN_MODEL_PRICING } from "../../open-sse/services/providerCostData.ts";

test("provider-specific pricing wins over a generic model fallback", () => {
  const genericKey = "provider-price-test-model";
  const providerKey = `devin-cli/${genericKey}`;
  const previousGeneric = KNOWN_MODEL_PRICING[genericKey];
  const previousProvider = KNOWN_MODEL_PRICING[providerKey];

  KNOWN_MODEL_PRICING[genericKey] = {
    inputCostPer1M: 9,
    outputCostPer1M: 90,
    isFree: false,
  };
  KNOWN_MODEL_PRICING[providerKey] = {
    inputCostPer1M: 1,
    outputCostPer1M: 10,
    isFree: false,
  };

  try {
    assert.deepEqual(getModelPricing("devin-cli", genericKey), {
      inputCostPer1M: 1,
      outputCostPer1M: 10,
      isFree: false,
    });
  } finally {
    if (previousGeneric) KNOWN_MODEL_PRICING[genericKey] = previousGeneric;
    else delete KNOWN_MODEL_PRICING[genericKey];
    if (previousProvider) KNOWN_MODEL_PRICING[providerKey] = previousProvider;
    else delete KNOWN_MODEL_PRICING[providerKey];
  }
});

test("tier pricing reads the exact Devin provider/model rate", () => {
  assert.deepEqual(getModelPricing("devin-cli", "gpt-5-6-luna-max"), {
    inputCostPer1M: 0.2,
    outputCostPer1M: 1.2,
    isFree: false,
  });
  assert.deepEqual(getModelPricing("devin-cli", "gpt-5-6-luna-max-priority"), {
    inputCostPer1M: 0.4,
    outputCostPer1M: 2.4,
    isFree: false,
  });
});
