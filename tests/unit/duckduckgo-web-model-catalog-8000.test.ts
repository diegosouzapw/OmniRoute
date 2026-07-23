import { test } from "node:test";
import assert from "node:assert/strict";

import {
  normalizeDuckDuckGoModel,
  DUCKDUCKGO_DEFAULT_MODEL,
} from "../../open-sse/executors/duckduckgo-web.ts";
import { duckduckgo_webProvider } from "../../open-sse/config/providers/registry/duckduckgo-web/index.ts";
import { FREE_MODEL_BUDGETS } from "../../open-sse/config/freeModelCatalog.data.ts";

// #8000 — the current free Duck.ai lineup, wire ids captured live from
// duckchat/v1/models (2026-07-22). A retired/unknown model id is rejected by
// duckchat/v1/chat with 400 ERR_BAD_REQUEST, which is the exact reported symptom.
const CURRENT_FREE_IDS = new Set([
  "gpt-5.4-mini",
  "gpt-5.4-nano",
  "claude-haiku-4-5",
  "mistral-small-2603",
  "tinfoil/gpt-oss-120b",
  "tinfoil/gemma4-31b",
]);

// Ids OmniRoute historically advertised that Duck.ai has since retired.
const RETIRED_IDS = [
  "gpt-4o-mini",
  "gpt-5-mini",
  "o3-mini",
  "llama-4-scout",
  "claude-3-5-haiku-20241022",
  "mistral-small-2501",
];

test("#8000: default model is a current free wire id, not retired gpt-4o-mini", () => {
  assert.equal(DUCKDUCKGO_DEFAULT_MODEL, "gpt-5.4-mini");
  assert.notEqual(normalizeDuckDuckGoModel(undefined), "gpt-4o-mini");
  assert.ok(CURRENT_FREE_IDS.has(normalizeDuckDuckGoModel(undefined)));
});

test("#8000: every retired id normalizes to a current wire id (never passes through)", () => {
  for (const retired of RETIRED_IDS) {
    const out = normalizeDuckDuckGoModel(retired);
    assert.ok(CURRENT_FREE_IDS.has(out), `${retired} → ${out} must be a current free id`);
    assert.notEqual(out, retired, `retired ${retired} must not reach the wire unchanged`);
  }
  // the `duckduckgo-web/` routing prefix is stripped before aliasing
  assert.ok(CURRENT_FREE_IDS.has(normalizeDuckDuckGoModel("duckduckgo-web/gpt-4o-mini")));
  assert.equal(normalizeDuckDuckGoModel("duckduckgo-web/gpt-5.4-nano"), "gpt-5.4-nano");
});

test("#8000: current wire ids pass through unchanged", () => {
  for (const id of CURRENT_FREE_IDS) {
    assert.equal(normalizeDuckDuckGoModel(id), id);
  }
});

test("#8000: provider registry advertises exactly the current wire ids", () => {
  const ids = duckduckgo_webProvider.models.map((m) => m.id);
  assert.deepEqual(new Set(ids), CURRENT_FREE_IDS);
  for (const retired of RETIRED_IDS) {
    assert.ok(!ids.includes(retired), `registry must drop retired id ${retired}`);
  }
});

test("#8000: free-model catalog advertises exactly the current wire ids", () => {
  const ids = FREE_MODEL_BUDGETS.filter((e) => e.provider === "duckduckgo-web").map(
    (e) => e.modelId
  );
  assert.deepEqual(new Set(ids), CURRENT_FREE_IDS);
  for (const retired of RETIRED_IDS) {
    assert.ok(!ids.includes(retired), `catalog must drop retired id ${retired}`);
  }
});
