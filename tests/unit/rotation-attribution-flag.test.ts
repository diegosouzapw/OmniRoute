// ROTATION_ATTRIBUTION flag: off by default, fail-safe off on unreadable store,
// override picked up on the next read (no restart). RED-first.
import test from "node:test";
import assert from "node:assert/strict";

import { FEATURE_FLAG_DEFINITIONS } from "../../src/shared/constants/featureFlagDefinitions.ts";
import { isRotationAttributionEnabled } from "../../src/shared/utils/featureFlags.ts";

test("ROTATION_ATTRIBUTION is defined as network boolean off by default, no restart", () => {
  const def = FEATURE_FLAG_DEFINITIONS.find((d) => d.key === "ROTATION_ATTRIBUTION");
  assert.ok(def, "ROTATION_ATTRIBUTION should exist");
  assert.equal(def!.category, "network");
  assert.equal(def!.type, "boolean");
  assert.equal(def!.defaultValue, "false");
  assert.equal(def!.requiresRestart, false);
});

test("isRotationAttributionEnabled is false by default", () => {
  assert.equal(isRotationAttributionEnabled(), false);
});
