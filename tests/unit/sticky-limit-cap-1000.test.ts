import test from "node:test";
import assert from "node:assert/strict";

/**
 * Sticky round-robin limit caps — Settings → Routing inputs and the settings
 * schema must all accept up to 1000 (the previous caps of 10 / 100 silently
 * clamped operator intent for long-lived sessions).
 */

const { updateSettingsSchema } = await import("../../src/shared/validation/settingsSchemas.ts");

test("global stickyRoundRobinLimit accepts up to 1000", () => {
  const ok = updateSettingsSchema.safeParse({ stickyRoundRobinLimit: 1000 });
  assert.equal(ok.success, true);
  const tooHigh = updateSettingsSchema.safeParse({ stickyRoundRobinLimit: 1001 });
  assert.equal(tooHigh.success, false);
});

test("global comboStickyRoundRobinLimit accepts up to 1000 (was 100)", () => {
  const ok = updateSettingsSchema.safeParse({ comboStickyRoundRobinLimit: 1000 });
  assert.equal(ok.success, true);
  const tooHigh = updateSettingsSchema.safeParse({ comboStickyRoundRobinLimit: 1001 });
  assert.equal(tooHigh.success, false);
});

test("per-provider stickyRoundRobinLimit accepts up to 1000 (was 10)", () => {
  const ok = updateSettingsSchema.safeParse({
    providerStrategies: { "opencode-go": { fallbackStrategy: "round-robin", stickyRoundRobinLimit: 1000 } },
  });
  assert.equal(ok.success, true);
  const tooHigh = updateSettingsSchema.safeParse({
    providerStrategies: { "opencode-go": { stickyRoundRobinLimit: 1001 } },
  });
  assert.equal(tooHigh.success, false);
});
