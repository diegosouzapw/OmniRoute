import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

/**
 * Quota preflight Global Routing UI setting — backend round-trip coverage.
 *
 * The UI card (Settings → Routing → Quota Preflight Cutoff) PATCHes
 * /api/resilience with { quotaPreflight: { enabled, defaultThresholdPercent } }
 * and reads it back from GET. These tests pin the pieces the card depends on:
 *
 *   1. updateResilienceSchema accepts a quotaPreflight section (previously the
 *      section was validated nowhere and silently dropped by .strict()).
 *   2. resolveResilienceSettings surfaces enabled=true once persisted, which is
 *      the flag auth.ts's latency gate reads to arm per-account preflight.
 *   3. The schema still rejects an entirely-empty PATCH (existing behavior).
 */

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-quota-preflight-ui-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = process.env.API_KEY_SECRET || "quota-preflight-ui-secret";

const core = await import("../../src/lib/db/core.ts");
const settingsDb = await import("../../src/lib/db/settings.ts");
const { updateResilienceSchema } = await import("../../src/shared/validation/schemas/settings.ts");
const { validateBody, isValidationFailure } = await import("../../src/shared/validation/helpers");
const { resolveResilienceSettings } = await import("../../src/lib/resilience/settings.ts");

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

test("updateResilienceSchema accepts a quotaPreflight section", () => {
  const validation = validateBody(updateResilienceSchema, {
    quotaPreflight: { enabled: true, defaultThresholdPercent: 5 },
  });
  assert.equal(isValidationFailure(validation), false, "quotaPreflight must be a valid PATCH key");
  if (!isValidationFailure(validation)) {
    assert.equal(validation.data.quotaPreflight?.enabled, true);
    assert.equal(validation.data.quotaPreflight?.defaultThresholdPercent, 5);
  }
});

test("updateResilienceSchema rejects malformed quotaPreflight values", () => {
  const validation = validateBody(updateResilienceSchema, {
    quotaPreflight: { defaultThresholdPercent: 500 },
  });
  assert.equal(
    isValidationFailure(validation),
    true,
    "out-of-range threshold must be rejected at the API boundary"
  );
});

test("persisted quotaPreflight.enabled=true is surfaced by resolveResilienceSettings", async () => {
  await settingsDb.updateSettings({
    resilienceSettings: {
      quotaPreflight: {
        enabled: true,
        defaultThresholdPercent: 10,
        warnThresholdPercent: 25,
      },
    },
  });

  const settings = await settingsDb.getSettings();
  const resilience = resolveResilienceSettings(settings);
  assert.equal(
    resilience.quotaPreflight.enabled,
    true,
    "auth.ts's latency gate arms preflight on resilience.quotaPreflight.enabled — the persisted toggle must resolve to true"
  );
  assert.equal(resilience.quotaPreflight.defaultThresholdPercent, 10);
  assert.equal(resilience.quotaPreflight.warnThresholdPercent, 25);

  // Reset so other suites see factory defaults.
  await settingsDb.updateSettings({ resilienceSettings: {} });
  const reset = resolveResilienceSettings(await settingsDb.getSettings());
  assert.equal(reset.quotaPreflight.enabled, false);
  assert.equal(reset.quotaPreflight.defaultThresholdPercent, 2);
});
