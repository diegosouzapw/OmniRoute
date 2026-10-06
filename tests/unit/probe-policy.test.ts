import { test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-probe-policy-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const settingsDb = await import("../../src/lib/db/settings.ts");
const { runAsProbe, shouldIsolateProbeFailures, isProbeContext } =
  await import("../../src/shared/utils/probeOrigin.ts");

test.after(() => {
  delete process.env.PROBE_CAN_DISABLE;
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("outside a probe context the decision is always false (real path)", async () => {
  await settingsDb.updateSettings({ probeCanDisable: true });
  assert.equal(await shouldIsolateProbeFailures(), false);
});

test("probe + default settings => isolation ON (probe never disables)", async () => {
  await settingsDb.updateSettings({ probeCanDisable: false });
  await runAsProbe(async () => {
    assert.equal(await shouldIsolateProbeFailures(), true);
  });
});

test("probe + opt-in setting probeCanDisable => isolation OFF (historical behavior)", async () => {
  await settingsDb.updateSettings({ probeCanDisable: true });
  await runAsProbe(async () => {
    assert.equal(await shouldIsolateProbeFailures(), false);
  });
});

test("probe + env feature flag PROBE_CAN_DISABLE=true => isolation OFF", async () => {
  process.env.PROBE_CAN_DISABLE = "true";
  await settingsDb.updateSettings({ probeCanDisable: false });
  await runAsProbe(async () => {
    assert.equal(await shouldIsolateProbeFailures(), false);
  });
});

test("probe + flag false + setting true => setting wins (flag must not re-enable isolation)", async () => {
  process.env.PROBE_CAN_DISABLE = "false";
  await settingsDb.updateSettings({ probeCanDisable: true });
  await runAsProbe(async () => {
    assert.equal(await shouldIsolateProbeFailures(), false);
  });
});

test("probe context propagation is still pinned (policy uses the same gate)", async () => {
  assert.equal(isProbeContext(), false);
  await runAsProbe(async () => {
    assert.equal(isProbeContext(), true);
  });
});
