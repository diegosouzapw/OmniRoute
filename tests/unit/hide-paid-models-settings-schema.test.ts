import test from "node:test";
import assert from "node:assert/strict";

import { updateSettingsSchema } from "../../src/shared/validation/settingsSchemas.ts";

test("hidePaidModels is accepted and preserved by the settings PATCH schema", () => {
  for (const hidePaidModels of [true, false]) {
    const validation = updateSettingsSchema.safeParse({ hidePaidModels });

    assert.equal(validation.success, true);
    if (!validation.success) continue;
    assert.equal(validation.data.hidePaidModels, hidePaidModels);
  }
});

test("hidePaidModels defaults to undefined when not provided", () => {
  const validation = updateSettingsSchema.safeParse({});

  assert.equal(validation.success, true);
  if (!validation.success) return;
  assert.equal(validation.data.hidePaidModels, undefined);
});

test("hidePaidModels rejects non-boolean values", () => {
  const validation = updateSettingsSchema.safeParse({
    hidePaidModels: "true",
  });

  assert.equal(validation.success, false);
});
