import test from "node:test";
import assert from "node:assert/strict";

import { updateSettingsSchema } from "../../src/shared/validation/settingsSchemas.ts";

test("appearance widget visibility settings are accepted by the settings PATCH schema", () => {
  const validation = updateSettingsSchema.safeParse({
    pinProviderQuotaToHome: true,
    showQuickStartOnHome: false,
    showProviderTopologyOnHome: true,
    showTokenSaverOnEndpoint: false,
  });

  assert.equal(validation.success, true);
  if (!validation.success) return;
  assert.equal(validation.data.pinProviderQuotaToHome, true);
  assert.equal(validation.data.showQuickStartOnHome, false);
  assert.equal(validation.data.showProviderTopologyOnHome, true);
  assert.equal(validation.data.showTokenSaverOnEndpoint, false);
});

test("appearance widget visibility settings default to undefined when not provided", () => {
  const validation = updateSettingsSchema.safeParse({});

  assert.equal(validation.success, true);
  if (!validation.success) return;
  assert.equal(validation.data.pinProviderQuotaToHome, undefined);
  assert.equal(validation.data.showQuickStartOnHome, undefined);
  assert.equal(validation.data.showProviderTopologyOnHome, undefined);
  assert.equal(validation.data.showTokenSaverOnEndpoint, undefined);
});

test("appearance widget visibility settings reject non-boolean values", () => {
  const validation = updateSettingsSchema.safeParse({
    pinProviderQuotaToHome: "yes",
    showTokenSaverOnEndpoint: "no",
  });

  assert.equal(validation.success, false);
});

test("localOnlyManageScopeBypass settings are accepted by the settings PATCH schema", () => {
  // Only NON-spawn-capable prefixes are acceptable. This test previously asserted
  // that "/api/cli-tools/runtime/" was accepted — it was written against the buggy
  // schema (the BYPASS_PREFIX_NOT_ALLOWED layer-1 refine documented in routeGuard.ts
  // was missing) and consecrated the bug. The real contract (Hard Rules #15/#17 +
  // authz-bypass AC-8) is covered by the rejection test below.
  const validation = updateSettingsSchema.safeParse({
    localOnlyManageScopeBypassEnabled: true,
    localOnlyManageScopeBypassPrefixes: ["/api/mcp/"],
  });

  assert.equal(validation.success, true);
  if (!validation.success) return;
  assert.equal(validation.data.localOnlyManageScopeBypassEnabled, true);
  assert.deepEqual(validation.data.localOnlyManageScopeBypassPrefixes, ["/api/mcp/"]);
});

test("localOnlyManageScopeBypassPrefixes rejects spawn-capable prefixes (BYPASS_PREFIX_NOT_ALLOWED)", () => {
  const validation = updateSettingsSchema.safeParse({
    localOnlyManageScopeBypassEnabled: true,
    localOnlyManageScopeBypassPrefixes: ["/api/mcp/", "/api/cli-tools/runtime/"],
  });

  assert.equal(validation.success, false);
  if (validation.success) return;
  assert.ok(
    validation.error.issues.some((i) => i.message.includes("BYPASS_PREFIX_NOT_ALLOWED")),
    "expected a BYPASS_PREFIX_NOT_ALLOWED issue for the spawn-capable prefix"
  );
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
