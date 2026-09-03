import test from "node:test";
import assert from "node:assert/strict";

import { APIKEY_PROVIDERS } from "../../../src/shared/constants/providers/apikey/index.ts";
import { getProviderById } from "../../../src/shared/constants/providers.ts";
import { FREE_MODEL_BUDGETS } from "../../../open-sse/config/freeModelCatalog.ts";
import { FREE_TIER_BUDGETS } from "../../../open-sse/config/freeTierCatalog.ts";
import { LEGACY_FREE_PROVIDERS } from "../../../open-sse/services/tierConfig.ts";
import { classifyTier, clearTierCache } from "../../../open-sse/services/tierResolver.ts";
import { PROVIDER_TIER } from "../../../open-sse/services/tierTypes.ts";

const CEREBRAS_MODELS = ["zai-glm-4.7", "gpt-oss-120b"] as const;

test("#11773 cerebras stays catalogued, but not as a recurring zero-cost tier", () => {
  const entry = APIKEY_PROVIDERS.cerebras;
  assert.ok(entry, "APIKEY_PROVIDERS.cerebras must remain registered");
  assert.equal(entry.hasFree, true);
  assert.equal(Object.hasOwn(FREE_TIER_BUDGETS, "cerebras"), false);
  assert.equal(LEGACY_FREE_PROVIDERS.includes("cerebras"), false);
});

test("#11773 cerebras freeNote describes the $5 card-gated signup credit", () => {
  const note = getProviderById("cerebras")?.freeNote ?? "";
  assert.match(note, /\$5/);
  assert.match(note, /30.?day|30 days/i);
  assert.match(note, /payment method|credit card/i);
  assert.equal(/1M tokens\/day|30K TPM/.test(note), false);
});

test("#11773 cerebras catalog rows are one-time signup credits, not a hard-stop free trial", () => {
  const rows = FREE_MODEL_BUDGETS.filter((row) => row.provider === "cerebras");
  assert.ok(rows.length >= CEREBRAS_MODELS.length, "catalog must keep the live Cerebras models");
  for (const modelId of CEREBRAS_MODELS) {
    const row = rows.find((entry) => entry.modelId === modelId);
    assert.ok(row, `missing catalog row for ${modelId}`);
    assert.equal(row.freeType, "one-time-initial");
    assert.equal(row.monthlyTokens, 0);
    assert.notEqual(row.hardStopGuaranteed, true);
  }
});

test("#11773 cerebras is not classified as the free routing tier", () => {
  clearTierCache();
  const result = classifyTier("cerebras", "zai-glm-4.7");
  assert.notEqual(result.tier, PROVIDER_TIER.FREE);
});
