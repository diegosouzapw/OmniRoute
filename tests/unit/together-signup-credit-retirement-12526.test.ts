import assert from "node:assert/strict";
import test from "node:test";

import { FREE_MODEL_BUDGETS } from "../../open-sse/config/freeModelCatalog.ts";
import { APIKEY_PROVIDERS_INFERENCE } from "../../src/shared/constants/providers/apikey/inference-hosts.ts";

test("#12526 prepaid Together does not contribute a signup-credit budget", () => {
  const together = APIKEY_PROVIDERS_INFERENCE.together;
  const togetherCredits = FREE_MODEL_BUDGETS.filter(
    (entry) => entry.provider === "together" && entry.creditTokens > 0
  );

  assert.equal(together.hasFree, false, "the provider metadata marks Together as billing-required");
  assert.deepEqual(
    togetherCredits,
    [],
    "a provider with no free trial must not inflate the first-month free-token total"
  );
});
