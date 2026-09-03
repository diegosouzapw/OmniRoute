// Poolside (inference.poolside.ai) — first-party Preview catalog.
//
// The registry entry shipped with an empty `models` list because the public
// matrix could only reach the unauthenticated endpoint (401 "No Authorization
// header provided"). An authenticated probe on 2026-08-07 (#9085) returned the
// live catalog, so the two Preview models are now static. These tests lock the
// exact IDs — the XS one is routinely mis-listed as `laguna-xs.2` — and the
// capability numbers the catalog reported, so a later sweep cannot quietly
// reintroduce the wrong form or drop the entries back to passthrough-only.
import { test } from "node:test";
import assert from "node:assert/strict";
import { poolsideProvider } from "../../../open-sse/config/providers/registry/poolside/index.ts";

test("#9085: poolside statically exposes the two probed Laguna Preview models", () => {
  assert.deepEqual(
    poolsideProvider.models.map((m) => m.id),
    ["poolside/laguna-xs-2.1", "poolside/laguna-s-2.1"]
  );
});

test("#9085: the XS id is the catalog form, not the third-party `laguna-xs.2`", () => {
  const ids = poolsideProvider.models.map((m) => m.id);
  assert.ok(
    ids.includes("poolside/laguna-xs-2.1"),
    "live /v1/models returns poolside/laguna-xs-2.1"
  );
  assert.ok(
    !ids.some((id) => id.includes("laguna-xs.2")),
    "laguna-xs.2 is a third-party/aggregator listing form and does not address this host"
  );
});

test("#9085: both Laguna models carry the probed capabilities", () => {
  for (const model of poolsideProvider.models) {
    assert.equal(model.contextLength, 262144, `${model.id} context window`);
    assert.equal(model.maxOutputTokens, 32768, `${model.id} max completion tokens`);
    assert.equal(model.toolCalling, true, `${model.id} advertises tools`);
    assert.equal(model.supportsReasoning, true, `${model.id} advertises reasoning`);
    // Text-only upstream: no vision/audio in supported_features.
    assert.notEqual(model.supportsVision, true, `${model.id} is text-only`);
    assert.notEqual(model.supportsAudio, true, `${model.id} is text-only`);
  }
});

test("#9085: live discovery still admits models the Preview adds later", () => {
  // The static list is what the catalog returned, not a ceiling — keep the
  // passthrough flag so a newly published Laguna does not need a release.
  assert.equal(poolsideProvider.passthroughModels, true);
  assert.equal(poolsideProvider.modelsUrl, "https://inference.poolside.ai/v1/models");
});
