/**
 * #7784 — concurrent settings writers must not silently clobber map keys like
 * providerStrategies. Opt-in optimistic concurrency via expectedRevision / If-Match.
 */
import { describe, test, beforeEach, after } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { makeManagementSessionRequest } from "../helpers/managementSession.ts";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-settings-cas-7784-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.REQUIRE_API_KEY = "false";
if (!process.env.API_KEY_SECRET) {
  process.env.API_KEY_SECRET = "test-settings-cas-7784-" + Date.now();
}

const core = await import("../../src/lib/db/core.ts");
const settingsDb = await import("../../src/lib/db/settings.ts");
const settingsRoute = await import("../../src/app/api/settings/route.ts");

beforeEach(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
});

after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

describe("#7784 settings optimistic concurrency", () => {
  test("GET /api/settings exposes settingsRevision and ETag", async () => {
    const response = await settingsRoute.GET(
      await makeManagementSessionRequest("http://localhost/api/settings", { method: "GET" })
    );
    const body = (await response.json()) as Record<string, unknown>;

    assert.equal(response.status, 200);
    assert.equal(typeof body.settingsRevision, "number");
    assert.equal(response.headers.get("ETag"), String(body.settingsRevision));
  });

  test("G17: GET exposes RADAR_ADMIN_URL to the authenticated dashboard owner only", async () => {
    const original = process.env.RADAR_ADMIN_URL;
    process.env.RADAR_ADMIN_URL = "https://radar-admin.example.test/ops";

    try {
      const ownerResponse = await settingsRoute.GET(
        await makeManagementSessionRequest("http://localhost/api/settings", {
          method: "GET",
          headers: {
            "x-omniroute-auth-kind": "dashboard_session",
            "x-omniroute-auth-id": "dashboard",
          },
        })
      );
      const ownerBody = (await ownerResponse.json()) as Record<string, unknown>;
      assert.equal(ownerResponse.status, 200);
      assert.equal(ownerBody.radarAdminUrl, "https://radar-admin.example.test/ops");

      const anonymousResponse = await settingsRoute.GET(
        new Request("http://localhost/api/settings", { method: "GET" })
      );
      const anonymousBody = (await anonymousResponse.json()) as Record<string, unknown>;
      assert.equal(anonymousResponse.status, 200);
      assert.equal(anonymousBody.radarAdminUrl, null);

      const internalServiceUrl = await settingsRoute.resolveOwnerRadarAdminUrl(
        await makeManagementSessionRequest("http://localhost/api/settings", {
          headers: {
            "x-omniroute-auth-kind": "management_key",
            "x-omniroute-auth-id": "internal-service",
            "x-omniroute-peer-locality": "loopback",
          },
        })
      );
      assert.equal(internalServiceUrl, null);

      const cliUrl = await settingsRoute.resolveOwnerRadarAdminUrl(
        await makeManagementSessionRequest("http://localhost/api/settings", {
          headers: {
            "x-omniroute-auth-kind": "management_key",
            "x-omniroute-auth-id": "cli",
            "x-omniroute-peer-locality": "loopback",
          },
        })
      );
      assert.equal(cliUrl, null);

      const localBootstrapUrl = await settingsRoute.resolveOwnerRadarAdminUrl(
        new Request("http://localhost/api/settings", {
          headers: {
            "x-omniroute-auth-kind": "anonymous",
            "x-omniroute-auth-id": "anonymous",
            "x-omniroute-peer-locality": "loopback",
          },
        })
      );
      assert.equal(localBootstrapUrl, "https://radar-admin.example.test/ops");
    } finally {
      if (original === undefined) delete process.env.RADAR_ADMIN_URL;
      else process.env.RADAR_ADMIN_URL = original;
    }
  });

  test("concurrent providerStrategies writes with CAS: second writer gets 409, first change kept", async () => {
    const getRes = await settingsRoute.GET(
      await makeManagementSessionRequest("http://localhost/api/settings", { method: "GET" })
    );
    const snapshot = (await getRes.json()) as { settingsRevision: number };
    const baseRevision = snapshot.settingsRevision;

    const clientA = await settingsRoute.PATCH(
      await makeManagementSessionRequest("http://localhost/api/settings", {
        method: "PATCH",
        body: {
          expectedRevision: baseRevision,
          providerStrategies: {
            codex: { fallbackStrategy: "round-robin", stickyRoundRobinLimit: 3 },
          },
        },
      })
    );
    assert.equal(clientA.status, 200);

    const clientB = await settingsRoute.PATCH(
      await makeManagementSessionRequest("http://localhost/api/settings", {
        method: "PATCH",
        body: {
          expectedRevision: baseRevision,
          providerStrategies: {
            antigravity: { fallbackStrategy: "fill-first" },
          },
        },
      })
    );
    assert.equal(clientB.status, 409, "stale revision must reject with 409 Conflict");
    const conflictBody = (await clientB.json()) as {
      error: { code: string; currentRevision?: number };
    };
    assert.equal(conflictBody.error.code, "SETTINGS_REVISION_CONFLICT");

    const settings = await settingsDb.getSettings();
    const strategies = settings.providerStrategies as Record<string, unknown>;
    assert.ok(strategies.codex, "codex override from client A must survive");
    assert.equal(strategies.antigravity, undefined, "stale client B write must not apply");
  });

  test("If-Match header is accepted in place of expectedRevision body field", async () => {
    const getRes = await settingsRoute.GET(
      await makeManagementSessionRequest("http://localhost/api/settings", { method: "GET" })
    );
    const snapshot = (await getRes.json()) as { settingsRevision: number };

    const okRes = await settingsRoute.PATCH(
      await makeManagementSessionRequest("http://localhost/api/settings", {
        method: "PATCH",
        headers: { "If-Match": String(snapshot.settingsRevision) },
        body: {
          providerStrategies: {
            glm: { fallbackStrategy: "priority" },
          },
        },
      })
    );
    assert.equal(okRes.status, 200);

    const staleRes = await settingsRoute.PATCH(
      await makeManagementSessionRequest("http://localhost/api/settings", {
        method: "PATCH",
        headers: { "If-Match": String(snapshot.settingsRevision) },
        body: {
          providerStrategies: {
            openai: { fallbackStrategy: "random" },
          },
        },
      })
    );
    assert.equal(staleRes.status, 409);
  });

  test("PATCH without expectedRevision remains backward compatible", async () => {
    await settingsDb.updateSettings({
      providerStrategies: { codex: { fallbackStrategy: "round-robin" } },
    });

    const response = await settingsRoute.PATCH(
      await makeManagementSessionRequest("http://localhost/api/settings", {
        method: "PATCH",
        body: {
          providerStrategies: { antigravity: { fallbackStrategy: "fill-first" } },
        },
      })
    );

    assert.equal(response.status, 200);
    const settings = await settingsDb.getSettings();
    const strategies = settings.providerStrategies as Record<string, unknown>;
    assert.equal(strategies.codex, undefined, "legacy unconditional replace still overwrites");
    assert.ok(strategies.antigravity);
  });

  test("updateSettings throws SettingsRevisionConflictError on revision mismatch", async () => {
    await settingsDb.updateSettings({ debugMode: false });
    const revision = await settingsDb.getSettingsRevision();
    await settingsDb.updateSettings({ debugMode: true });

    await assert.rejects(
      () => settingsDb.updateSettings({ debugMode: false }, { expectedRevision: revision }),
      (err: unknown) => {
        assert.ok(err instanceof settingsDb.SettingsRevisionConflictError);
        assert.equal(
          (err as settingsDb.SettingsRevisionConflictError).currentRevision,
          revision + 1
        );
        return true;
      }
    );
  });
});
