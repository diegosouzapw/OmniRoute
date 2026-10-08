import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { makeManagementSessionRequest } from "../helpers/managementSession.ts";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-paid-target-routes-6540-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const settingsDb = await import("../../src/lib/db/settings.ts");
const settingsRoute = await import("../../src/app/api/settings/route.ts");
const comboDefaultsRoute = await import("../../src/app/api/settings/combo-defaults/route.ts");
const backgroundDegradationRoute =
  await import("../../src/app/api/settings/background-degradation/route.ts");
const { isPaidModelTarget } = await import("../../src/shared/utils/freeModels.ts");

// A provider present in the free-model catalog (so providerHasFreeModels is
// true) but a model id that is NOT one of its documented free models. Gemini's
// free tier is recurring and excludes the Pro line; the previous Together target
// stopped classifying once its one-time signup credit left the catalog (#13407).
const PAID_TARGET = "gemini/gemini-3.1-pro-preview";
// A documented free model.
const FREE_TARGET = "openrouter/auto";
// No "/" or "," — a combo/alias name, fails open ("unknown").
const UNKNOWN_TARGET = "my-combo-alias";

async function resetStorage() {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

test.beforeEach(async () => {
  await resetStorage();
});

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("fixtures classify as intended against the current free-model catalog", () => {
  assert.equal(isPaidModelTarget(PAID_TARGET), "paid", "PAID_TARGET must stay a paid model");
  assert.equal(isPaidModelTarget(FREE_TARGET), "free", "FREE_TARGET must stay a free model");
  assert.equal(isPaidModelTarget(UNKNOWN_TARGET), "unknown");
});

// ── PATCH /api/settings — webSearchRouteModel ──────────────────────────────

test("PATCH /api/settings blocks a paid webSearchRouteModel when hidePaidModels is on", async () => {
  await settingsDb.updateSettings({ hidePaidModels: true });

  const response = await settingsRoute.PATCH(
    await makeManagementSessionRequest("http://localhost/api/settings", {
      method: "PATCH",
      body: { webSearchRouteModel: PAID_TARGET },
    })
  );

  assert.equal(response.status, 400);
  const body = await response.json();
  assert.equal(body.error.code, "PAID_MODEL_TARGET_BLOCKED");
});

test("PATCH /api/settings allows the same paid webSearchRouteModel when hidePaidModels is off", async () => {
  await settingsDb.updateSettings({ hidePaidModels: false });

  const response = await settingsRoute.PATCH(
    await makeManagementSessionRequest("http://localhost/api/settings", {
      method: "PATCH",
      body: { webSearchRouteModel: PAID_TARGET },
    })
  );

  assert.equal(response.status, 200);
});

test("PATCH /api/settings allows an unknown/alias webSearchRouteModel even when hidePaidModels is on (fail open)", async () => {
  await settingsDb.updateSettings({ hidePaidModels: true });

  const response = await settingsRoute.PATCH(
    await makeManagementSessionRequest("http://localhost/api/settings", {
      method: "PATCH",
      body: { webSearchRouteModel: UNKNOWN_TARGET },
    })
  );

  assert.equal(response.status, 200);
});

test("PATCH /api/settings allows a free webSearchRouteModel when hidePaidModels is on", async () => {
  await settingsDb.updateSettings({ hidePaidModels: true });

  const response = await settingsRoute.PATCH(
    await makeManagementSessionRequest("http://localhost/api/settings", {
      method: "PATCH",
      body: { webSearchRouteModel: FREE_TARGET },
    })
  );

  assert.equal(response.status, 200);
});

// ── PATCH /api/settings/combo-defaults — handoffModel ──────────────────────

test("PATCH /api/settings/combo-defaults blocks a paid handoffModel when hidePaidModels is on", async () => {
  await settingsDb.updateSettings({ hidePaidModels: true });

  const response = await comboDefaultsRoute.PATCH(
    await makeManagementSessionRequest("http://localhost/api/settings/combo-defaults", {
      method: "PATCH",
      body: { comboDefaults: { handoffModel: PAID_TARGET } },
    })
  );

  assert.equal(response.status, 400);
  const body = await response.json();
  assert.equal(body.error.code, "PAID_MODEL_TARGET_BLOCKED");
});

test("PATCH /api/settings/combo-defaults allows the same paid handoffModel when hidePaidModels is off", async () => {
  await settingsDb.updateSettings({ hidePaidModels: false });

  const response = await comboDefaultsRoute.PATCH(
    await makeManagementSessionRequest("http://localhost/api/settings/combo-defaults", {
      method: "PATCH",
      body: { comboDefaults: { handoffModel: PAID_TARGET } },
    })
  );

  assert.equal(response.status, 200);
});

test("PATCH /api/settings/combo-defaults allows an unknown/alias handoffModel even when hidePaidModels is on (fail open)", async () => {
  await settingsDb.updateSettings({ hidePaidModels: true });

  const response = await comboDefaultsRoute.PATCH(
    await makeManagementSessionRequest("http://localhost/api/settings/combo-defaults", {
      method: "PATCH",
      body: { comboDefaults: { handoffModel: UNKNOWN_TARGET } },
    })
  );

  assert.equal(response.status, 200);
});

// ── PUT /api/settings/background-degradation — degradationMap "to" values ──

test("PUT /api/settings/background-degradation blocks a paid degradationMap 'to' value when hidePaidModels is on", async () => {
  await settingsDb.updateSettings({ hidePaidModels: true });

  const response = await backgroundDegradationRoute.PUT(
    await makeManagementSessionRequest("http://localhost/api/settings/background-degradation", {
      method: "PUT",
      body: { degradationMap: { "premium-model": PAID_TARGET } },
    })
  );

  assert.equal(response.status, 400);
  const body = await response.json();
  assert.equal(body.error.code, "PAID_MODEL_TARGET_BLOCKED");
});

test("PUT /api/settings/background-degradation allows the same paid 'to' value when hidePaidModels is off", async () => {
  await settingsDb.updateSettings({ hidePaidModels: false });

  const response = await backgroundDegradationRoute.PUT(
    await makeManagementSessionRequest("http://localhost/api/settings/background-degradation", {
      method: "PUT",
      body: { degradationMap: { "premium-model": PAID_TARGET } },
    })
  );

  assert.equal(response.status, 200);
});

test("PUT /api/settings/background-degradation does NOT block a paid 'from' value (detection trigger, not invocation target)", async () => {
  await settingsDb.updateSettings({ hidePaidModels: true });

  const response = await backgroundDegradationRoute.PUT(
    await makeManagementSessionRequest("http://localhost/api/settings/background-degradation", {
      method: "PUT",
      body: { degradationMap: { [PAID_TARGET]: FREE_TARGET } },
    })
  );

  assert.equal(response.status, 200);
});
