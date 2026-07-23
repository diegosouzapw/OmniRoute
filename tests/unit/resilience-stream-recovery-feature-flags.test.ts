import { test, after } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-stream-recovery-flags-"));
process.env.DATA_DIR = tmpDir;

const core = await import("../../src/lib/db/core.ts");
const { setFeatureFlagOverride, clearAllFeatureFlagOverrides } =
  await import("../../src/lib/db/featureFlags.ts");
const { resolveResilienceSettings } = await import("../../src/lib/resilience/settings.ts");

after(() => {
  core.resetDbInstance();
  fs.rmSync(tmpDir, { recursive: true, force: true });
});

test("stream recovery feature flags seed resilience defaults", () => {
  clearAllFeatureFlagOverrides();
  setFeatureFlagOverride("STREAM_RECOVERY_ENABLED", "true");
  setFeatureFlagOverride("STREAM_RECOVERY_MIDSTREAM_ENABLED", "true");

  const resolved = resolveResilienceSettings({});

  assert.equal(resolved.streamRecovery.enabled, true);
  assert.equal(resolved.streamRecovery.continueMidStream, true);
});

test("stored stream recovery settings override feature flag defaults", () => {
  clearAllFeatureFlagOverrides();
  setFeatureFlagOverride("STREAM_RECOVERY_ENABLED", "true");
  setFeatureFlagOverride("STREAM_RECOVERY_MIDSTREAM_ENABLED", "true");

  const resolved = resolveResilienceSettings({
    resilienceSettings: { streamRecovery: { enabled: false, continueMidStream: false } },
  });

  assert.equal(resolved.streamRecovery.enabled, false);
  assert.equal(resolved.streamRecovery.continueMidStream, false);
});
