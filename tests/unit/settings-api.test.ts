import { describe, test, beforeEach, afterEach, after } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

// --- Create harness function (similar to _chatPipelineHarness pattern) ---
async function createSettingsApiHarness() {
  const testDataDir = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-settings-api-"));
  process.env.DATA_DIR = testDataDir;
  process.env.REQUIRE_API_KEY = "false";
  if (!process.env.API_KEY_SECRET) {
    process.env.API_KEY_SECRET = "test-settings-api-secret-" + Date.now();
  }

  // --- Dynamic imports AFTER env setup ---
  const core = await import("../../src/lib/db/core.ts");
  const { getSettings, updateSettings } = await import("../../src/lib/db/settings.ts");
  const settingsRoute = await import("../../src/app/api/settings/route.ts");

  async function resetStorage() {
    core.resetDbInstance();
    fs.rmSync(testDataDir, { recursive: true, force: true });
    fs.mkdirSync(testDataDir, { recursive: true });
  }

  function cleanup() {
    core.resetDbInstance();
    fs.rmSync(testDataDir, { recursive: true, force: true });
  }

  return {
    testDataDir,
    core,
    getSettings,
    updateSettings,
    settingsRoute,
    resetStorage,
    cleanup,
  };
}

// --- Initialize harness ---
const harness = await createSettingsApiHarness();

// --- Static import for helper (doesn't depend on DB) ---
import { makeManagementSessionRequest } from "../helpers/managementSession.ts";

beforeEach(async () => {
  await harness.resetStorage();
});

afterEach(async () => {
  await harness.resetStorage();
});

after(() => {
  harness.cleanup();
});

describe("Settings API - persisted preferences", () => {
  test("getSettings defaults Responses previous_response_id handling to auto", async () => {
    const settings = await harness.getSettings();
    assert.strictEqual(settings.responsesPreviousResponseIdMode, "auto");
  });

  describe("debugMode", () => {
    test("updateSettings with debugMode=true succeeds", async () => {
      const result = await harness.updateSettings({ debugMode: true });
      assert.ok(result, "updateSettings should return truthy result");

      const settings = await harness.getSettings();
      assert.strictEqual(settings.debugMode, true, "debugMode should be true");
    });

    test("updateSettings with debugMode=false succeeds", async () => {
      const result = await harness.updateSettings({ debugMode: false });
      assert.ok(result, "updateSettings should return truthy result");

      const settings = await harness.getSettings();
      assert.strictEqual(settings.debugMode, false, "debugMode should be false");
    });
  });

  describe("hiddenSidebarItems", () => {
    test("updateSettings with hiddenSidebarItems=['translator'] succeeds", async () => {
      const result = await harness.updateSettings({ hiddenSidebarItems: ["translator"] });
      assert.ok(result, "updateSettings should return truthy result");

      const settings = await harness.getSettings();
      assert.deepStrictEqual(
        settings.hiddenSidebarItems,
        ["translator"],
        "hiddenSidebarItems should contain translator"
      );
    });

    test("updateSettings with empty hiddenSidebarItems succeeds", async () => {
      const result = await harness.updateSettings({ hiddenSidebarItems: [] });
      assert.ok(result, "updateSettings should return truthy result");

      const settings = await harness.getSettings();
      assert.deepStrictEqual(
        settings.hiddenSidebarItems,
        [],
        "hiddenSidebarItems should be empty array"
      );
    });
  });

  describe("hiddenSidebarGroupLabels", () => {
    test("updateSettings with hiddenSidebarGroupLabels=['logs','audit'] succeeds", async () => {
      const result = await harness.updateSettings({ hiddenSidebarGroupLabels: ["logs", "audit"] });
      assert.ok(result, "updateSettings should return truthy result");

      const settings = await harness.getSettings();
      assert.deepStrictEqual(
        settings.hiddenSidebarGroupLabels,
        ["logs", "audit"],
        "hiddenSidebarGroupLabels should contain logs and audit"
      );
    });

    test("PATCH /api/settings persists hiddenSidebarGroupLabels", async () => {
      const response = await harness.settingsRoute.PATCH(
        await makeManagementSessionRequest("http://localhost/api/settings", {
          method: "PATCH",
          body: { hiddenSidebarGroupLabels: ["system"] },
        })
      );
      const body = (await response.json()) as Record<string, unknown>;

      assert.equal(response.status, 200);
      assert.deepEqual(body.hiddenSidebarGroupLabels, ["system"]);

      const settings = await harness.getSettings();
      assert.deepEqual(settings.hiddenSidebarGroupLabels, ["system"]);
    });
  });

  describe("combined updates", () => {
    test("updateSettings with both debugMode and hiddenSidebarItems succeeds", async () => {
      const result = await harness.updateSettings({
        debugMode: true,
        hiddenSidebarItems: ["translator"],
      });
      assert.ok(result, "updateSettings should return truthy result");

      const settings = await harness.getSettings();
      assert.strictEqual(settings.debugMode, true, "debugMode should be true");
      assert.deepStrictEqual(
        settings.hiddenSidebarItems,
        ["translator"],
        "hiddenSidebarItems should be updated"
      );
    });

    test("updateSettings persists antigravitySignatureCacheMode", async () => {
      const result = await harness.updateSettings({
        antigravitySignatureCacheMode: "bypass-strict",
      });
      assert.ok(result, "updateSettings should return truthy result");

      const settings = await harness.getSettings();
      assert.strictEqual(
        settings.antigravitySignatureCacheMode,
        "bypass-strict",
        "antigravitySignatureCacheMode should be updated"
      );
    });

    test("PATCH /api/settings persists endpoint tunnel visibility", async () => {
      const response = await harness.settingsRoute.PATCH(
        await makeManagementSessionRequest("http://localhost/api/settings", {
          method: "PATCH",
          body: {
            hideEndpointCloudflaredTunnel: true,
            hideEndpointTailscaleFunnel: true,
            hideEndpointNgrokTunnel: true,
          },
        })
      );
      const body = (await response.json()) as Record<string, unknown>;

      assert.equal(response.status, 200);
      assert.equal(body.hideEndpointCloudflaredTunnel, true);
      assert.equal(body.hideEndpointTailscaleFunnel, true);
      assert.equal(body.hideEndpointNgrokTunnel, true);

      const settings = await harness.getSettings();
      assert.equal(settings.hideEndpointCloudflaredTunnel, true);
      assert.equal(settings.hideEndpointTailscaleFunnel, true);
      assert.equal(settings.hideEndpointNgrokTunnel, true);
    });

    test("PATCH /api/settings persists Responses previous_response_id handling", async () => {
      const response = await harness.settingsRoute.PATCH(
        await makeManagementSessionRequest("http://localhost/api/settings", {
          method: "PATCH",
          body: { responsesPreviousResponseIdMode: "strip" },
        })
      );
      const body = (await response.json()) as Record<string, unknown>;

      assert.equal(response.status, 200);
      assert.equal(body.responsesPreviousResponseIdMode, "strip");

      const settings = await harness.getSettings();
      assert.equal(settings.responsesPreviousResponseIdMode, "strip");
    });

    test("GET /api/settings returns Cache-Control: no-store (ported from upstream #951)", async () => {
      const response = await harness.settingsRoute.GET(
        await makeManagementSessionRequest("http://localhost/api/settings", {
          method: "GET",
        })
      );
      assert.equal(response.status, 200);
      assert.equal(
        response.headers.get("Cache-Control"),
        "no-store",
        "GET /api/settings must return Cache-Control: no-store so persisted settings stay fresh after refresh/restart"
      );
    });

    test("PATCH /api/settings returns Cache-Control: no-store (ported from upstream #951)", async () => {
      const response = await harness.settingsRoute.PATCH(
        await makeManagementSessionRequest("http://localhost/api/settings", {
          method: "PATCH",
          body: { debugMode: true },
        })
      );
      assert.equal(response.status, 200);
      assert.equal(
        response.headers.get("Cache-Control"),
        "no-store",
        "PATCH /api/settings must return Cache-Control: no-store"
      );
    });

    test("PUT /api/settings reuses the PATCH update flow", async () => {
      const response = await harness.settingsRoute.PUT(
        await makeManagementSessionRequest("http://localhost/api/settings", {
          method: "PUT",
          body: { antigravitySignatureCacheMode: "bypass" },
        })
      );
      const body = (await response.json()) as Record<string, unknown>;

      assert.equal(response.status, 200);
      assert.equal(body.antigravitySignatureCacheMode, "bypass");
    });
  });
});
