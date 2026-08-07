import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

// Regression guard: the RADAR_ENABLED feature flag must default to OFF so that
// a vanilla OmniRoute install is byte-identical to today.  The Radar module
// (catalog feed screens and data sync) is a freemium add-on and must never
// activate without explicit operator opt-in.

// Isolate DB state so the resolution chain (DB override > env > default) reads
// a clean store and we exercise the definition default, not a leaked override.
const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-test-radar-default-"));
process.env.DATA_DIR = tmpDir;

const { FEATURE_FLAG_DEFINITIONS } = await import(
  "../../src/shared/constants/featureFlagDefinitions.ts"
);

test("RADAR_ENABLED feature flag defaults to OFF", async (t) => {
  const def = (key: string) => FEATURE_FLAG_DEFINITIONS.find((d) => d.key === key);

  await t.test("RADAR_ENABLED definition exists", () => {
    const d = def("RADAR_ENABLED");
    assert.ok(d, "RADAR_ENABLED definition must exist in FEATURE_FLAG_DEFINITIONS");
  });

  await t.test("RADAR_ENABLED default value is 'false'", () => {
    const d = def("RADAR_ENABLED");
    assert.strictEqual(
      d!.defaultValue,
      "false",
      "RADAR_ENABLED must default OFF — Radar is an opt-in add-on"
    );
  });

  await t.test("RADAR_ENABLED category is 'policies'", () => {
    const d = def("RADAR_ENABLED");
    assert.strictEqual(
      d!.category,
      "policies",
      "RADAR_ENABLED must be in the 'policies' category"
    );
  });

  await t.test("RADAR_ENABLED type is 'boolean'", () => {
    const d = def("RADAR_ENABLED");
    assert.strictEqual(d!.type, "boolean", "RADAR_ENABLED must be a boolean flag");
  });

  await t.test("effective runtime resolution is OFF with no override", async () => {
    delete process.env.RADAR_ENABLED;
    const { clearAllFeatureFlagOverrides } = await import("@/lib/db/featureFlags");
    clearAllFeatureFlagOverrides();

    const { isFeatureFlagEnabled } = await import("@/shared/utils/featureFlags");
    assert.strictEqual(isFeatureFlagEnabled("RADAR_ENABLED"), false);
  });
});
