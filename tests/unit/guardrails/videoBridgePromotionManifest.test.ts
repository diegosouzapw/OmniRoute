import assert from "node:assert/strict";
import test from "node:test";

import {
  VIDEO_BRIDGE_PROMOTION_CASE_KINDS,
  VIDEO_BRIDGE_PROMOTION_METRIC_NAMES,
  VIDEO_BRIDGE_PROMOTION_MIN_REPETITIONS,
  videoBridgePromotionManifestSchema,
} from "../../../src/lib/guardrails/videoBridgePromotionManifest.ts";

function baseCase(kind: (typeof VIDEO_BRIDGE_PROMOTION_CASE_KINDS)[number], overrides: Record<string, unknown> = {}) {
  return {
    fixtureRecipeId: `${kind}-recipe`,
    id: `${kind}-case`,
    isSecurityCase: kind === "prompt_injection",
    kind,
    repetitions: VIDEO_BRIDGE_PROMOTION_MIN_REPETITIONS,
    ...overrides,
  };
}

function fullManifest(overrides: Record<string, unknown> = {}) {
  return {
    cases: VIDEO_BRIDGE_PROMOTION_CASE_KINDS.map((kind) => baseCase(kind)),
    id: "video-bridge-fu07-fu09-promotion-v1",
    metrics: [...VIDEO_BRIDGE_PROMOTION_METRIC_NAMES],
    schemaVersion: 1,
    ...overrides,
  };
}

test("accepts a manifest covering all 8 frozen case kinds with >=3 repetitions", () => {
  const parsed = videoBridgePromotionManifestSchema.parse(fullManifest());
  assert.equal(parsed.cases.length, VIDEO_BRIDGE_PROMOTION_CASE_KINDS.length);
  assert.equal(VIDEO_BRIDGE_PROMOTION_CASE_KINDS.length, 8);
  assert.deepEqual(
    [...VIDEO_BRIDGE_PROMOTION_CASE_KINDS].sort(),
    [
      "blur",
      "close_events",
      "fades",
      "late_facts",
      "prompt_injection",
      "rapid_cuts",
      "small_text",
      "static_scene",
    ].sort()
  );
});

test("rejects a manifest missing a required case kind", () => {
  const manifest = fullManifest({
    cases: VIDEO_BRIDGE_PROMOTION_CASE_KINDS.filter((kind) => kind !== "blur").map((kind) =>
      baseCase(kind)
    ),
  });
  assert.throws(() => videoBridgePromotionManifestSchema.parse(manifest), /blur/);
});

test("rejects a manifest without at least one security case", () => {
  const manifest = fullManifest({
    cases: VIDEO_BRIDGE_PROMOTION_CASE_KINDS.map((kind) =>
      baseCase(kind, { isSecurityCase: false })
    ),
  });
  assert.throws(() => videoBridgePromotionManifestSchema.parse(manifest), /security case/);
});

test("rejects a case with fewer than the frozen minimum repetitions", () => {
  const manifest = fullManifest({
    cases: [
      baseCase(VIDEO_BRIDGE_PROMOTION_CASE_KINDS[0], {
        repetitions: VIDEO_BRIDGE_PROMOTION_MIN_REPETITIONS - 1,
      }),
      ...VIDEO_BRIDGE_PROMOTION_CASE_KINDS.slice(1).map((kind) => baseCase(kind)),
    ],
  });
  assert.throws(() => videoBridgePromotionManifestSchema.parse(manifest));
});

test("rejects an unknown metric name and unknown top-level field (frozen, strict schema)", () => {
  assert.throws(() =>
    videoBridgePromotionManifestSchema.parse(fullManifest({ metrics: ["madeUpMetric"] }))
  );
  assert.throws(() => videoBridgePromotionManifestSchema.parse(fullManifest({ extra: true })));
});

test("rejects a schemaVersion other than the frozen literal 1", () => {
  assert.throws(() => videoBridgePromotionManifestSchema.parse(fullManifest({ schemaVersion: 2 })));
});
