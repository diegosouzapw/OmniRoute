/**
 * #11481 — `modelVisibilityAllowlist`/`modelVisibilityDenylist` settings PATCH
 * schema validation. Mirrors hide-paid-models-settings-schema.test.ts.
 */
import test from "node:test";
import assert from "node:assert/strict";

import { updateSettingsSchema } from "../../src/shared/validation/settingsSchemas.ts";

test("modelVisibilityAllowlist/Denylist are accepted and preserved by the settings PATCH schema", () => {
  const validation = updateSettingsSchema.safeParse({
    modelVisibilityAllowlist: ["openai/gpt-4o-mini"],
    modelVisibilityDenylist: ["openai/gpt-4o", "anthropic/*"],
  });

  assert.equal(validation.success, true);
  if (!validation.success) return;
  assert.deepEqual(validation.data.modelVisibilityAllowlist, ["openai/gpt-4o-mini"]);
  assert.deepEqual(validation.data.modelVisibilityDenylist, ["openai/gpt-4o", "anthropic/*"]);
});

test("modelVisibilityAllowlist/Denylist default to undefined when not provided", () => {
  const validation = updateSettingsSchema.safeParse({});

  assert.equal(validation.success, true);
  if (!validation.success) return;
  assert.equal(validation.data.modelVisibilityAllowlist, undefined);
  assert.equal(validation.data.modelVisibilityDenylist, undefined);
});

test("empty arrays (explicit opt-out / reset) are accepted", () => {
  const validation = updateSettingsSchema.safeParse({
    modelVisibilityAllowlist: [],
    modelVisibilityDenylist: [],
  });

  assert.equal(validation.success, true);
});

test("rejects non-array values", () => {
  assert.equal(
    updateSettingsSchema.safeParse({ modelVisibilityDenylist: "openai/gpt-4o" }).success,
    false
  );
  assert.equal(
    updateSettingsSchema.safeParse({ modelVisibilityAllowlist: true }).success,
    false
  );
});

test("rejects a non-string array entry", () => {
  assert.equal(
    updateSettingsSchema.safeParse({ modelVisibilityDenylist: [123] }).success,
    false
  );
});

test("rejects an entry longer than the 200-char cap", () => {
  assert.equal(
    updateSettingsSchema.safeParse({ modelVisibilityDenylist: ["x".repeat(201)] }).success,
    false
  );
});
