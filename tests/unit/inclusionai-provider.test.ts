import test from "node:test";
import assert from "node:assert/strict";

import { FREE_MODEL_BUDGETS } from "../../open-sse/config/freeModelCatalog.ts";
import { FREE_TIER_BUDGETS } from "../../open-sse/config/freeTierCatalog.ts";
import { REGISTRY } from "../../open-sse/config/providerRegistry.ts";
import { APIKEY_PROVIDERS } from "../../src/shared/constants/providers/apikey/index.ts";

test("inclusionai is no longer registered as a first-party provider", () => {
  assert.equal(Object.hasOwn(REGISTRY, "inclusionai"), false);
  assert.equal(Object.hasOwn(APIKEY_PROVIDERS, "inclusionai"), false);
  assert.equal(Object.hasOwn(FREE_TIER_BUDGETS, "inclusionai"), false);
  assert.equal(
    FREE_MODEL_BUDGETS.some((entry) => entry.provider === "inclusionai"),
    false
  );
});
