import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

process.env.DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-bgdeg-12424-"));

const { applyRuntimeSettings, resetRuntimeSettingsStateForTests } = await import(
  "../../../src/lib/config/runtimeSettings.ts"
);
const {
  getBackgroundDegradationConfig,
  getDefaultDegradationMap,
  getDefaultDetectionPatterns,
  setBackgroundDegradationConfig,
} = await import("../../../open-sse/services/backgroundTaskDetector.ts");

// Issue #12424: deleting a built-in background-degradation entry through the dashboard
// did not persist — the runtime loader merged defaults *under* the stored map, so a key
// the user removed (absent from the stored record) was indistinguishable from one never
// touched and always came back on the next apply/restart.
test("stored degradationMap that omits a default key does not resurrect it (#12424)", async () => {
  resetRuntimeSettingsStateForTests();
  setBackgroundDegradationConfig({
    enabled: false,
    degradationMap: getDefaultDegradationMap(),
    detectionPatterns: getDefaultDetectionPatterns(),
  });

  const defaults = getDefaultDegradationMap();
  const deletedKey = "gpt-5";
  const keptKey = "gpt-4o";
  assert.ok(
    defaults[deletedKey] && defaults[keptKey],
    "fixture assumes these default keys exist in DEFAULT_DEGRADATION_MAP"
  );

  // The stored map is every default except the one the user deleted.
  const stored: Record<string, string> = { ...defaults };
  delete stored[deletedKey];

  await applyRuntimeSettings(
    { backgroundDegradation: JSON.stringify({ enabled: true, degradationMap: stored }) },
    { force: true, source: "test" }
  );

  const applied = getBackgroundDegradationConfig().degradationMap;

  // The entries the user kept still apply…
  assert.equal(applied[keptKey], defaults[keptKey], "a kept default entry still applies");
  // …and the one they deleted stays deleted instead of being back-filled from defaults.
  assert.ok(
    !(deletedKey in applied),
    `deleted default '${deletedKey}' must not be re-added from defaults`
  );
});
