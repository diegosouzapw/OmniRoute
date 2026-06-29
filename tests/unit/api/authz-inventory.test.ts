/**
 * T-013 — GET /api/settings/authz-inventory.
 *
 * Covers spec AC-1, AC-2, AC-12 (and AC-13 PATCH coverage continues to live
 * in `tests/unit/settings/authz-bypass.test.ts`; this file only asserts the
 * inventory endpoint itself).
 *
 *   - AC-1 response shape: 5 tiers, each with prefixes; bypassEnabled / bypassPrefixes / spawnCapablePrefixes present.
 *   - AC-2 bypass-state flags match getSettings() and update after PATCH.
 *   - AC-12 anonymous request → 401/403 (no inventory leak).
 */
import test from "node:test";
import assert from "node:assert/strict";
import { setupSettingsFixture } from "../_mocks/settings.ts";
import { makeManagementSessionRequest } from "../../helpers/managementSession.ts";

const fixture = setupSettingsFixture("authz-inventory");
process.env.OMNIROUTE_DISABLE_REDIS_AUTH_CACHE = "1";

const ORIGINAL_JWT_SECRET = process.env.JWT_SECRET;
const ORIGINAL_INITIAL_PASSWORD = process.env.INITIAL_PASSWORD;

const core = await import("../../../src/lib/db/core.ts");
const settingsDb = await import("../../../src/lib/db/settings.ts");
const runtime = await import("../../../src/lib/config/runtimeSettings.ts");
const inventoryRoute = await import("../../../src/app/api/settings/authz-inventory/route.ts");
const apiKeysDb = await import("../../../src/lib/db/apiKeys.ts");

test.beforeEach(async () => {
  await fixture.resetStorage();
  apiKeysDb.resetApiKeyState();
  runtime.resetRuntimeSettingsStateForTests();
});

test.after(() => {
  core.resetDbInstance();
  fixture.cleanup();
  if (ORIGINAL_JWT_SECRET === undefined) delete process.env.JWT_SECRET;
  else process.env.JWT_SECRET = ORIGINAL_JWT_SECRET;
  if (ORIGINAL_INITIAL_PASSWORD === undefined) delete process.env.INITIAL_PASSWORD;
  else process.env.INITIAL_PASSWORD = ORIGINAL_INITIAL_PASSWORD;
});

// ─── AC-1 — shape ─────────────────────────────────────────────────────────

test("AC-1: GET returns 5 tiers with prefixes + bypass state envelope", async () => {
  process.env.JWT_SECRET = "test-jwt-secret-authz-inventory";
  process.env.INITIAL_PASSWORD = "initial-pass-ac1";
  await settingsDb.updateSettings({ requireLogin: true });

  const request = await makeManagementSessionRequest(
    "http://localhost/api/settings/authz-inventory",
    { method: "GET" }
  );
  const response = await inventoryRoute.GET(request);
  assert.equal(response.status, 200);

  const body = (await response.json()) as {
    tiers: Array<{ name: string; prefixes: string[]; description: string; bypassable: boolean }>;
    bypassEnabled: boolean;
    bypassPrefixes: string[];
    spawnCapablePrefixes: string[];
  };

  assert.equal(body.tiers.length, 5);
  const names = body.tiers.map((t) => t.name).sort();
  assert.deepEqual(names, ["ALWAYS_PROTECTED", "CLIENT_API", "LOCAL_ONLY", "MANAGEMENT", "PUBLIC"]);

  const localOnly = body.tiers.find((t) => t.name === "LOCAL_ONLY");
  assert.ok(localOnly);
  assert.ok(localOnly!.prefixes.includes("/api/mcp/"));
  assert.ok(localOnly!.prefixes.includes("/api/cli-tools/runtime/"));
  assert.equal(localOnly!.bypassable, true);

  const alwaysProtected = body.tiers.find((t) => t.name === "ALWAYS_PROTECTED");
  assert.ok(alwaysProtected);
  assert.ok(alwaysProtected!.prefixes.includes("/api/shutdown"));
  assert.equal(alwaysProtected!.bypassable, false);

  const clientApi = body.tiers.find((t) => t.name === "CLIENT_API");
  assert.ok(clientApi);
  assert.ok(clientApi!.prefixes.includes("/v1/"));
  assert.ok(clientApi!.prefixes.includes("/api/v1/"));
  assert.ok(clientApi!.prefixes.includes("/v1beta/"));
  assert.ok(clientApi!.prefixes.includes("/api/v1beta/"));

  // Every tier carries a non-empty description.
  for (const tier of body.tiers) {
    assert.ok(tier.description.length > 0, `tier ${tier.name} missing description`);
  }

  assert.ok(body.spawnCapablePrefixes.includes("/api/cli-tools/runtime/"));
});

// ─── AC-2 — flags match getSettings() pre- and post-mutation ──────────────

test("AC-2: bypassEnabled + bypassPrefixes reflect getSettings() (defaults)", async () => {
  process.env.JWT_SECRET = "test-jwt-secret-authz-inventory";
  process.env.INITIAL_PASSWORD = "initial-pass-ac2a";
  await settingsDb.updateSettings({ requireLogin: true });

  const response = await inventoryRoute.GET(
    await makeManagementSessionRequest("http://localhost/api/settings/authz-inventory", {
      method: "GET",
    })
  );
  assert.equal(response.status, 200);
  const body = (await response.json()) as {
    bypassEnabled: boolean;
    bypassPrefixes: string[];
  };
  // Default snapshot: kill-switch ON, single prefix /api/mcp/.
  assert.equal(body.bypassEnabled, true);
  assert.deepEqual(body.bypassPrefixes, ["/api/mcp/"]);
});

test("AC-2: bypassEnabled flips after settings mutation", async () => {
  process.env.JWT_SECRET = "test-jwt-secret-authz-inventory";
  process.env.INITIAL_PASSWORD = "initial-pass-ac2b";
  await settingsDb.updateSettings({ requireLogin: true });

  // Mutate directly through the settings DB (bypasses the password gate —
  // we are not testing the gate here, only the inventory's reflection of
  // the persisted state).
  await settingsDb.updateSettings({ localOnlyManageScopeBypassEnabled: false });

  const response = await inventoryRoute.GET(
    await makeManagementSessionRequest("http://localhost/api/settings/authz-inventory", {
      method: "GET",
    })
  );
  assert.equal(response.status, 200);
  const body = (await response.json()) as { bypassEnabled: boolean };
  assert.equal(body.bypassEnabled, false);
});

test("AC-2: bypassPrefixes additions land in the inventory", async () => {
  process.env.JWT_SECRET = "test-jwt-secret-authz-inventory";
  process.env.INITIAL_PASSWORD = "initial-pass-ac2c";
  await settingsDb.updateSettings({ requireLogin: true });

  await settingsDb.updateSettings({
    localOnlyManageScopeBypassPrefixes: ["/api/mcp/", "/api/mcp/v2/"],
  });

  const response = await inventoryRoute.GET(
    await makeManagementSessionRequest("http://localhost/api/settings/authz-inventory", {
      method: "GET",
    })
  );
  assert.equal(response.status, 200);
  const body = (await response.json()) as { bypassPrefixes: string[] };
  assert.deepEqual(body.bypassPrefixes, ["/api/mcp/", "/api/mcp/v2/"]);
});

// ─── AC-12 — anonymous request rejected (no inventory leak) ───────────────

test("AC-12: anonymous request (no cookie, no Bearer) → 401", async () => {
  process.env.JWT_SECRET = "test-jwt-secret-authz-inventory";
  process.env.INITIAL_PASSWORD = "initial-pass-ac12";
  // Bootstrap a password so isAuthRequired() returns true even on loopback.
  await settingsDb.updateSettings({ requireLogin: true });
  const { ensurePersistentManagementPasswordHash } =
    await import("../../../src/lib/auth/managementPassword.ts");
  await ensurePersistentManagementPasswordHash({ source: "test.bootstrap" });

  const anonRequest = new Request("https://dashboard.example/api/settings/authz-inventory", {
    method: "GET",
  });
  const response = await inventoryRoute.GET(anonRequest);
  assert.ok(
    response.status === 401 || response.status === 403,
    `expected 401/403, got ${response.status}`
  );
  const body = (await response.json()) as { error?: { message?: string } };
  // Should NOT leak the inventory shape.
  assert.ok(!("tiers" in body));
});

test("AC-12: anonymous request with bogus Bearer → 403", async () => {
  process.env.JWT_SECRET = "test-jwt-secret-authz-inventory";
  process.env.INITIAL_PASSWORD = "initial-pass-ac12b";
  await settingsDb.updateSettings({ requireLogin: true });
  const { ensurePersistentManagementPasswordHash } =
    await import("../../../src/lib/auth/managementPassword.ts");
  await ensurePersistentManagementPasswordHash({ source: "test.bootstrap" });

  const bogus = new Request("https://dashboard.example/api/settings/authz-inventory", {
    method: "GET",
    headers: new Headers({ authorization: "Bearer not-a-real-key" }),
  });
  const response = await inventoryRoute.GET(bogus);
  assert.equal(response.status, 403);
});

// ─── OQ-5 — any valid API key (no manage scope required) → 200 ────────────

test("OQ-5: any valid API key (read-only scope) → 200 inventory", async () => {
  process.env.JWT_SECRET = "test-jwt-secret-authz-inventory";
  process.env.INITIAL_PASSWORD = "initial-pass-oq5";
  await settingsDb.updateSettings({ requireLogin: true });
  const { ensurePersistentManagementPasswordHash } =
    await import("../../../src/lib/auth/managementPassword.ts");
  await ensurePersistentManagementPasswordHash({ source: "test.bootstrap" });

  // Key with NO manage scope — would be rejected by /api/settings PATCH,
  // but the inventory read endpoint is intentionally one rung lower (OQ-5).
  const created = await apiKeysDb.createApiKey("oq5-read", "machine-oq5", []);
  const request = new Request("https://dashboard.example/api/settings/authz-inventory", {
    method: "GET",
    headers: new Headers({ authorization: `Bearer ${created.key}` }),
  });
  const response = await inventoryRoute.GET(request);
  assert.equal(response.status, 200);
  const body = (await response.json()) as { tiers: unknown[] };
  assert.equal(body.tiers.length, 5);
});
