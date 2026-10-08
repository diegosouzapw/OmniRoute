import test from "node:test";
import assert from "node:assert/strict";

import { getModelsByProviderId } from "../../open-sse/config/providerModels.ts";

const LIVE_FREE_BUCKET_IDS = [
  "cline-free/deepseek-v4.1-flash",
  "cline-free/mimo-v2.6-flash",
  "cline-free/muse-spark-1.3-contributor",
  "stealth/space-bunny-alpha",
];

test("#15136: static Cline catalog exposes the cline-free/* bucket ids", () => {
  const ids = new Set(getModelsByProviderId("cline").map((m) => m.id));
  for (const id of LIVE_FREE_BUCKET_IDS) {
    assert.ok(ids.has(id), `cline catalog must expose free-bucket id ${id}`);
  }
});

test("#15136: a paid vendor id is not labelled '(Free)' in the Cline catalog", () => {
  const models = getModelsByProviderId("cline");
  for (const id of ["deepseek/deepseek-v4-flash", "stepfun/step-3.7-flash", "minimax/minimax-m3"]) {
    const paid = models.find((m) => m.id === id);
    assert.ok(paid, `${id} must stay in the catalog (existing combos reference it)`);
    assert.ok(!/free/i.test(paid.name), `paid model mislabelled as free: ${paid.name}`);
  }
});

test("#15136: free-bucket ids are labelled '(Free)'", () => {
  const models = getModelsByProviderId("cline");
  for (const id of LIVE_FREE_BUCKET_IDS) {
    const m = models.find((x) => x.id === id);
    assert.ok(m && /\(free\)/i.test(m.name), `${id} should be labelled (Free)`);
  }
});
