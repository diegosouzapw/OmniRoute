/**
 * REPRO #8950 — Setting the first dashboard login password fails with HTTP 400
 * PASSWORD_REQUIRED, deadlocking every fresh install.
 *
 * Root cause: isColdBoot only fires while requireLogin===false, but the
 * Security tab forces requireLogin ON before the password form is reachable,
 * so the first newPassword write always demands a currentPassword that cannot
 * exist yet.
 *
 * Fix: add `|| Boolean(body.newPassword)` to the cold-boot condition so that
 * setting the first password is always treated as cold boot, regardless of
 * the current requireLogin state.
 *
 * Regression guard: once a password hash exists, the gate fires as before
 * (currentPassword required for security-impacting changes).
 */
import test from "node:test";
import assert from "node:assert/strict";
import { setupSettingsFixture, mockSettings } from "../_mocks/settings.ts";
import { makeManagementSessionRequest } from "../../helpers/managementSession.ts";

const fixture = setupSettingsFixture("probe-8950");

process.env.OMNIROUTE_DISABLE_REDIS_AUTH_CACHE = "1";

const core = await import("../../../src/lib/db/core.ts");
const settingsDb = await import("../../../src/lib/db/settings.ts");
const runtime = await import("../../../src/lib/config/runtimeSettings.ts");
const settingsRoute = await import("../../../src/app/api/settings/route.ts");
const managementPassword = await import("../../../src/lib/auth/managementPassword.ts");

test.beforeEach(async () => {
  await fixture.resetStorage();
  runtime.resetRuntimeSettingsStateForTests();
});

test.after(() => {
  core.resetDbInstance();
  fixture.cleanup();
});

test("REPRO #8950: setting first password after requireLogin enabled should succeed", async () => {
  // Simulate fresh install: no password hash, requireLogin is false.
  await mockSettings({ setupComplete: true, requireLogin: false });

  // Step 1: Enable requireLogin (what the Security tab does when you open it).
  const step1 = await settingsRoute.PATCH(
    await makeManagementSessionRequest("http://localhost/api/settings", {
      method: "PATCH",
      body: { requireLogin: true },
    })
  );
  assert.equal(
    step1.status,
    200,
    `Step 1: enabling requireLogin should succeed, got ${step1.status}`
  );

  // Step 2: Set the first password (no currentPassword because none exists yet).
  const step2 = await settingsRoute.PATCH(
    await makeManagementSessionRequest("http://localhost/api/settings", {
      method: "PATCH",
      body: { newPassword: "my-first-password" },
    })
  );

  // REPRO: this fails with 400 PASSWORD_REQUIRED because isColdBoot only
  // checks requireLogin===false, but the DB now has requireLogin=true.
  assert.equal(
    step2.status,
    200,
    `Step 2: first password write should succeed without currentPassword, got ${step2.status}`
  );
  const step2Body = (await step2.json()) as Record<string, unknown>;
  assert.equal(
    step2Body.error,
    undefined,
    `Step 2 response should not have an error: ${JSON.stringify(step2Body)}`
  );

  // Verify the password was actually stored.
  const configured = managementPassword.hasManagementPasswordConfigured(
    (await settingsDb.getSettings()) as Record<string, unknown>
  );
  assert.equal(configured, true, "management password should be configured after first write");
});
