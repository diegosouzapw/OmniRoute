import test from "node:test";
import assert from "node:assert/strict";

import { updateSettingsSchema } from "../../src/shared/validation/settingsSchemas.ts";

test("Vision Bridge settings are accepted by the settings PATCH schema", () => {
  const validation = updateSettingsSchema.safeParse({
    visionBridgeEnabled: true,
    visionBridgeModel: "openai/gpt-4o-mini",
    visionBridgePrompt: "Describe the image contents briefly.",
    visionBridgeTimeout: 45000,
    visionBridgeMaxImages: 6,
  });

  assert.equal(validation.success, true);
});

test("Vision Bridge settings keep numeric bounds enforced", () => {
  const validation = updateSettingsSchema.safeParse({
    visionBridgeTimeout: 999999,
    visionBridgeMaxImages: 0,
  });

  assert.equal(validation.success, false);
});
