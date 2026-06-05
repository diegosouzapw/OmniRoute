import test from "node:test";
import assert from "node:assert/strict";

import { updateSettingsSchema } from "../../src/shared/validation/settingsSchemas.ts";

test("home page pin settings are accepted by the settings PATCH schema", () => {
  const validation = updateSettingsSchema.safeParse({
    pinProviderQuotaToHome: true,
    showQuickStartOnHome: false,
    showProviderTopologyOnHome: true,
  });

  assert.equal(validation.success, true);
  if (!validation.success) return;
  assert.equal(validation.data.pinProviderQuotaToHome, true);
  assert.equal(validation.data.showQuickStartOnHome, false);
  assert.equal(validation.data.showProviderTopologyOnHome, true);
});

test("home page pin settings default to undefined when not provided", () => {
  const validation = updateSettingsSchema.safeParse({});

  assert.equal(validation.success, true);
  if (!validation.success) return;
  assert.equal(validation.data.pinProviderQuotaToHome, undefined);
  assert.equal(validation.data.showQuickStartOnHome, undefined);
  assert.equal(validation.data.showProviderTopologyOnHome, undefined);
});

test("home page pin settings reject non-boolean values", () => {
  const validation = updateSettingsSchema.safeParse({
    pinProviderQuotaToHome: "yes",
  });

  assert.equal(validation.success, false);
});

test("localOnlyManageScopeBypass settings are accepted by the settings PATCH schema", () => {
  const validation = updateSettingsSchema.safeParse({
    localOnlyManageScopeBypassEnabled: true,
    localOnlyManageScopeBypassPrefixes: ["/api/mcp/", "/api/cli-tools/runtime/"],
  });

  assert.equal(validation.success, true);
  if (!validation.success) return;
  assert.equal(validation.data.localOnlyManageScopeBypassEnabled, true);
  assert.deepEqual(validation.data.localOnlyManageScopeBypassPrefixes, [
    "/api/mcp/",
    "/api/cli-tools/runtime/",
  ]);
});

test("localOnlyManageScopeBypassEnabled rejects non-boolean values", () => {
  const validation = updateSettingsSchema.safeParse({
    localOnlyManageScopeBypassEnabled: "yes",
  });

  assert.equal(validation.success, false);
});

test("localOnlyManageScopeBypassPrefixes rejects non-array values", () => {
  const validation = updateSettingsSchema.safeParse({
    localOnlyManageScopeBypassPrefixes: "/api/mcp/",
  });

  assert.equal(validation.success, false);
});
